import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { R } from '../regole.js';
import {
  ZONE, MURI, RECINZIONI, OSTACOLI, CASE, FINESTRE, PORTE, ACQUISTI, CARTELLO_PRONTI, FRAMMENTI, OGGETTI, quota,
  PAVIMENTO_CHIESA, PAVIMENTO_PRESBITERIO, PAVIMENTO_SAGRATO, PIANO_CONSIGLIO, PIANO_CELLA, ALTEZZA_RECINZIONE, RAGGIO_SAGRATO,
} from '../mappe/piazza.js';
import { texturaTesto } from './texture.js';
import { creaCaso } from './caso-grafica.js';
import { scatolaUV, orientamento } from './scuola3d.js';
import { creaMacchine } from './macchine3d.js';
import * as T from './piazza/texture.js';
import { costruisciAssedio, creaVoto } from './piazza/assedio3d.js';
import { costruisciFacciate } from './piazza/case3d.js';
import { costruisciArredo } from './piazza/arredo3d.js';
import { creaAtmosfera } from './piazza/atmosfera3d.js';
import { superficiePorfido, superficieCiottoli, superficieLastre, superficieIntonaco } from './piazza/superfici.js';

const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.4;
const DAVANZALE = 0.9;
const ARCHITRAVE = 2.3;
const ALTEZZA_PORTA = 2.5;
const AVVOLTO_VOLTA = 13;
const CHIAVE_VOLTA = 15.8;
const MURI_SPECIALI = Object.freeze(new Set(['facciata', 'campanile', 'tempiettoFronte', 'municipioFronte']));
const INTERNI = Object.freeze({
  navata: 'stucco', crociera: 'stucco', presbiterio: 'stucco', tempietto: 'stucco', sacrestia: 'intonaco',
  municipio: 'intonaco', scala: 'intonaco', consiglio: 'intonaco', cella: 'mattoni', sala: 'intonaco',
});
const ESTERNI = Object.freeze({
  fiancoNord: 'ocra', fiancoSud: 'ocra', abside: 'ocra', interno: 'ocra', tempietto: 'ocra', sacrestia: 'ocra',
  municipio: 'municipio', scala: 'municipio', cinta: 'intonacoGrezzo', uffici: 'intonaco',
});

const zonaDi = (x, z) => ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1) ?? null;

function creaStatico() {
  const pezzi = new Map();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();
  return {
    aggiungi(chiave, geometria, x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0) {
      const g = geometria.index ? geometria.toNonIndexed() : geometria.clone();
      g.deleteAttribute('uv1');
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      g.applyMatrix4(m.compose(p.set(x, y, z), q.setFromEuler(e.set(rx, ry, rz, 'YXZ')), s.set(1, 1, 1)));
      if (!pezzi.has(chiave)) pezzi.set(chiave, []);
      pezzi.get(chiave).push(g);
    },
    finisci(scena, materiali) {
      for (const [chiave, elenco] of pezzi) {
        const mesh = new THREE.Mesh(mergeGeometries(elenco, false), materiali[chiave]);
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scena.add(mesh);
      }
    },
  };
}

function pianoUV(larghezza, profondita, metri, rivolto = 'su') {
  const g = new THREE.PlaneGeometry(larghezza, profondita).rotateX(rivolto === 'su' ? -Math.PI / 2 : Math.PI / 2);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * larghezza) / metri, (uv.getY(i) * profondita) / metri);
  return g;
}

function facciaUV(larghezza, altezza, metriU, partenza, metriV = metriU) {
  const g = new THREE.PlaneGeometry(larghezza, altezza);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * larghezza) / metriU, (uv.getY(i) * altezza + partenza) / metriV);
  return g;
}

function scalaUV(g, su, sv = su) {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  return g;
}

function sagomaArco(x0, x1, y0, imposta) {
  const r = (x1 - x0) / 2;
  const s = new THREE.Path();
  s.moveTo(x0, y0);
  s.lineTo(x1, y0);
  s.lineTo(x1, imposta);
  s.absarc((x0 + x1) / 2, imposta, r, 0, Math.PI, false);
  s.lineTo(x0, y0);
  return s;
}

function muroConArchi(x0, x1, y0, y1, archi, spessore, metri = 3) {
  const forma = new THREE.Shape();
  forma.moveTo(x0, y0);
  forma.lineTo(x1, y0);
  forma.lineTo(x1, y1);
  forma.lineTo(x0, y1);
  forma.lineTo(x0, y0);
  for (const [a0, a1, b0, imposta] of archi) forma.holes.push(sagomaArco(a0, a1, b0, imposta));
  return scalaUV(new THREE.ExtrudeGeometry(forma, { depth: spessore, bevelEnabled: false, curveSegments: 14 }), 1 / metri);
}

function tettoPadiglione(x0, z0, x1, z1, gronda, colmo) {
  const lx = x1 - x0;
  const lz = z1 - z0;
  const lungoX = lx >= lz;
  const meta = (lungoX ? lz : lx) / 2;
  const c = lungoX ? [x0 + meta, (z0 + z1) / 2, x1 - meta, (z0 + z1) / 2] : [(x0 + x1) / 2, z0 + meta, (x0 + x1) / 2, z1 - meta];
  const A = [x0, gronda, z0];
  const B = [x1, gronda, z0];
  const C = [x1, gronda, z1];
  const D = [x0, gronda, z1];
  const P = [c[0], colmo, c[1]];
  const Q = [c[2], colmo, c[3]];
  const tri = lungoX
    ? [[A, P, Q], [A, Q, B], [B, Q, C], [C, Q, P], [C, P, D], [D, P, A]]
    : [[A, P, B], [B, P, Q], [B, Q, C], [C, Q, D], [D, Q, P], [D, P, A]];
  const pos = [];
  const uv = [];
  for (const t of tri) for (const v of t) { pos.push(...v); uv.push(v[0] / 2.4, v[2] / 2.4 + v[1] / 2.4); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

function quadVerticale(ax, az, bx, bz, y0, y1, metri = 3) {
  const l = Math.hypot(bx - ax, bz - az);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([ax, y0, az, bx, y0, bz, bx, y1, bz, ax, y0, az, bx, y1, bz, ax, y1, az], 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute([0, y0 / metri, l / metri, y0 / metri, l / metri, y1 / metri, 0, y0 / metri, l / metri, y1 / metri, 0, y1 / metri], 2));
  g.computeVertexNormals();
  return g;
}

function semianello(esterno, interno) {
  const forma = new THREE.Shape();
  forma.absarc(0, 0, esterno, 0, Math.PI, false);
  forma.lineTo(-interno, 0);
  forma.absarc(0, 0, interno, Math.PI, 0, true);
  forma.lineTo(esterno, 0);
  return forma;
}

function falda(x0, z0, x1, z1, y0, y1, asse) {
  const g = new THREE.BufferGeometry();
  const v = asse === 'z'
    ? [[x0, y0, z0], [x1, y0, z0], [x1, y1, z1], [x0, y1, z1]]
    : [[x0, y0, z0], [x1, y1, z0], [x1, y1, z1], [x0, y0, z1]];
  const pos = [];
  const uv = [];
  for (const i of [0, 2, 1, 0, 3, 2]) { pos.push(...v[i]); uv.push(v[i][0] / 2.4, v[i][2] / 2.4); }
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  if (g.attributes.normal.getY(0) < 0) {
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i += 3) {
      const t = [p.getX(i + 1), p.getY(i + 1), p.getZ(i + 1)];
      p.setXYZ(i + 1, p.getX(i + 2), p.getY(i + 2), p.getZ(i + 2));
      p.setXYZ(i + 2, ...t);
    }
    g.computeVertexNormals();
  }
  return g;
}

function voltaACrociera(lx, lz, y0, alto, segmenti = 14) {
  const g = new THREE.PlaneGeometry(lx, lz, segmenti, segmenti).rotateX(Math.PI / 2);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const u = (p.getX(i) / lx) * 2;
    const w = (p.getZ(i) / lz) * 2;
    const h = Math.max(Math.sqrt(Math.max(0, 1 - u * u)), Math.sqrt(Math.max(0, 1 - w * w)));
    p.setY(i, y0 + alto * h);
    uv.setXY(i, u / 2 + 0.5, w / 2 + 0.5);
  }
  g.computeVertexNormals();
  return g;
}

function voltaABotte(lx, lz, y0, alto, segmenti = 16) {
  const g = new THREE.PlaneGeometry(lx, lz, 2, segmenti).rotateX(Math.PI / 2);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const w = (p.getZ(i) / lz) * 2;
    p.setY(i, y0 + alto * Math.sqrt(Math.max(0, 1 - w * w)));
    uv.setXY(i, p.getX(i) / 4, w / 2 + 0.5);
  }
  g.computeVertexNormals();
  return g;
}

export function costruisciPiazza(scena, { reali, texture, materialiArmi, oggetti, luciAccese = 3 }) {
  const caso = creaCaso(1595);
  const pbr = (chiave, extra = {}) => new THREE.MeshStandardMaterial({ ...reali[chiave], metalness: 0, ...extra });
  const conMappa = (map, extra = {}) => new THREE.MeshStandardMaterial({ map, roughness: 0.9, metalness: 0, ...extra });
  const facciataCasa = superficieIntonaco();
  const porfido = superficiePorfido();
  const ciottoli = superficieCiottoli();
  const lastre = superficieLastre();
  const rilievo = forza => new THREE.Vector2(forza, forza);
  const ocraTex = T.texturaIntonacoOcra();
  const faro = (map, colore, extra = {}) => new THREE.MeshStandardMaterial({ map, color: colore, roughness: 0.88, metalness: 0, emissive: 0x2a1c0c, emissiveMap: map, emissiveIntensity: 1, normalMap: facciataCasa.normalMap, normalScale: rilievo(0.8), ...extra });
  const mat = {
    porfido: conMappa(porfido.map, { normalMap: porfido.normalMap, normalScale: rilievo(1.1), roughness: 0.78 }),
    ciottoli: conMappa(ciottoli.map, { normalMap: ciottoli.normalMap, normalScale: rilievo(1.2), roughness: 0.82, color: 0x9c968c }),
    lastre: conMappa(lastre.map, { normalMap: lastre.normalMap, normalScale: rilievo(0.9), roughness: 0.72, color: 0xb8b2a8 }),
    asfalto: pbr('asfalto', { color: 0x5e6066, roughness: 0.6 }),
    granito: pbr('cemento', { color: 0x8f8d89, roughness: 0.55 }),
    cemento: pbr('cemento', { color: 0x8a8580 }),
    erba: new THREE.MeshStandardMaterial({ color: 0x2f4a26, roughness: 1 }),
    ocra: faro(ocraTex, 0xffffff),
    ocraScuro: faro(ocraTex, 0xe8c48c),
    crema: faro(ocraTex, 0xfff4dc),
    cotto: new THREE.MeshStandardMaterial({ color: 0xc0683e, roughness: 0.82, emissive: 0x2a1006 }),
    statua: new THREE.MeshStandardMaterial({ color: 0xb46a42, roughness: 0.88, emissive: 0x2a1006 }),
    pietraBianca: new THREE.MeshStandardMaterial({ color: 0xdcd7cc, roughness: 0.65 }),
    mattoni: faro(T.texturaMattoni(), 0xffffff, { roughness: 0.92, emissiveIntensity: 0.6 }),
    tegole: conMappa(T.texturaTegole(), { roughness: 0.95, side: THREE.DoubleSide }),
    piombo: new THREE.MeshStandardMaterial({ color: 0x56756c, roughness: 0.5, metalness: 0.35, emissive: 0x0c1614 }),
    municipio: conMappa(T.texturaMunicipio(), { roughness: 0.88 }),
    intonacoGrezzo: pbr('muro', { color: 0xa8a39a }),
    intonaco: conMappa(T.texturaIntonacoInterno(), { roughness: 0.92 }),
    stucco: conMappa(T.texturaIntonacoInterno(), { color: 0xe8c8b2, roughness: 0.85 }),
    stuccoGrigio: pbr('muro', { color: 0x9c968e }),
    marmo: conMappa(T.texturaMarmoChiesa(), { roughness: 0.22 }),
    marmoRosa: new THREE.MeshStandardMaterial({ color: 0xc89a8c, roughness: 0.3 }),
    volta: conMappa(T.texturaVolta(), { roughness: 0.9, side: THREE.DoubleSide }),
    cupola: conMappa(T.texturaCupola(), { roughness: 0.9, side: THREE.BackSide }),
    oro: new THREE.MeshStandardMaterial({ color: 0xc09a48, metalness: 0.85, roughness: 0.32 }),
    bronzo: new THREE.MeshStandardMaterial({ color: 0x8a6436, metalness: 0.9, roughness: 0.38 }),
    legno: pbr('legno', { color: 0x7a5638 }),
    legnoScuro: pbr('legno', { color: 0x4a3222 }),
    porta: pbr('porta', { color: 0x6a4428 }),
    parquet: pbr('parquet'),
    graniglia: conMappa(T.texturaGraniglia(), { roughness: 0.32 }),
    ferro: new THREE.MeshStandardMaterial({ color: 0x25272b, metalness: 0.7, roughness: 0.45 }),
    zincato: new THREE.MeshStandardMaterial({ color: 0xb7bcc1, metalness: 0.75, roughness: 0.35 }),
    rete: new THREE.MeshStandardMaterial({ map: texture.rete, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5 }),
    vetroScuro: new THREE.MeshStandardMaterial({ color: 0x141a24, roughness: 0.12, metalness: 0.4 }),
    nero: new THREE.MeshStandardMaterial({ color: 0x15130f, roughness: 0.9 }),
    bianco: new THREE.MeshStandardMaterial({ color: 0xe9e4d8, roughness: 0.7 }),
    rosso: new THREE.MeshStandardMaterial({ color: 0x8a1c22, roughness: 0.8 }),
    velluto: new THREE.MeshStandardMaterial({ color: 0x7a1420, roughness: 0.95, side: THREE.DoubleSide }),
    tovaglia: new THREE.MeshStandardMaterial({ color: 0xf2efe6, roughness: 0.85 }),
    gialloDae: new THREE.MeshStandardMaterial({ color: 0xe8c020, roughness: 0.5 }),
    verdeBacheca: new THREE.MeshStandardMaterial({ color: 0x24402e, roughness: 0.6, metalness: 0.3 }),
    ombrellone: new THREE.MeshStandardMaterial({ color: 0xece6d6, roughness: 0.9, side: THREE.DoubleSide }),
    chioma: new THREE.MeshStandardMaterial({ color: 0x24381c, roughness: 1 }),
    corteccia: pbr('legno', { color: 0x3a2a1c }),
  };
  const coloriCase = new Map();
  const chiaveCasa = colore => {
    const chiave = `casa${colore.toString(16)}`;
    if (!coloriCase.has(chiave)) coloriCase.set(chiave, conMappa(facciataCasa.map, { normalMap: facciataCasa.normalMap, normalScale: rilievo(0.7), color: colore, roughness: 0.92 }));
    return chiave;
  };

  const statico = creaStatico();
  const box = (chiave, x0, y0, z0, x1, y1, z1, metri = 1) => statico.aggiungi(chiave, scatolaUV(x1 - x0, y1 - y0, z1 - z0, metri, y0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  const cil = (chiave, x, y0, z, r, h, lati = 12, rSotto = r) => statico.aggiungi(chiave, new THREE.CylinderGeometry(r, rSotto, h, lati), x, y0 + h / 2, z);
  const sfera = (chiave, x, y, z, r, lati = 10) => statico.aggiungi(chiave, new THREE.SphereGeometry(r, lati, Math.max(6, lati - 2)), x, y, z);
  const pavimento = (chiave, x0, z0, x1, z1, y, metri = 2) => statico.aggiungi(chiave, pianoUV(x1 - x0, z1 - z0, metri), (x0 + x1) / 2, y, (z0 + z1) / 2);
  const soffitto = (chiave, x0, z0, x1, z1, y, metri = 3) => statico.aggiungi(chiave, pianoUV(x1 - x0, z1 - z0, metri, 'giu'), (x0 + x1) / 2, y, (z0 + z1) / 2);
  const faccia = (chiave, l, h, x, y, z, ry, metri = 3, partenza = 0) => statico.aggiungi(chiave, facciaUV(l, h, metri, partenza), x, y, z, ry);
  const pannello = (materiale, l, h, x, y, z, verso, extra = {}) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(l, h), materiale);
    mesh.position.set(x, y, z);
    orientamento(mesh, verso);
    Object.assign(mesh.rotation, extra);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scena.add(mesh);
    return mesh;
  };
  const cartello = (righe, x, y, z, verso, l, h, opzioni) => pannello(new THREE.MeshBasicMaterial({ map: texturaTesto(righe, opzioni), transparent: true }), l, h, x, y, z, verso);
  const quadro = (mappa, x, y, z, verso, l, h, emissivo = 0) => pannello(new THREE.MeshStandardMaterial({ map: mappa, roughness: 0.85, emissive: emissivo ? 0xffffff : 0x000000, emissiveMap: emissivo ? mappa : null, emissiveIntensity: emissivo }), l, h, x, y, z, verso);

  const statua = (chiave, x, y, z, scala = 1, ry = 0, tipo = 'santo') => {
    const s = scala;
    cil(chiave, x, y, z, 0.32 * s, 0.25 * s, 8);
    statico.aggiungi(chiave, new THREE.CylinderGeometry(0.2 * s, 0.34 * s, 1.15 * s, 9), x, y + 0.25 * s + 0.575 * s, z, ry);
    statico.aggiungi(chiave, new THREE.CylinderGeometry(0.17 * s, 0.21 * s, 0.42 * s, 9), x, y + 1.6 * s, z, ry);
    sfera(chiave, x, y + 1.95 * s, z, 0.13 * s, 8);
    const dx = Math.cos(ry) * 0.2 * s;
    const dz = -Math.sin(ry) * 0.2 * s;
    statico.aggiungi(chiave, new THREE.CylinderGeometry(0.05 * s, 0.06 * s, 0.6 * s, 6), x + dx, y + 1.62 * s, z + dz, ry, 0, 0.5);
    statico.aggiungi(chiave, new THREE.CylinderGeometry(0.05 * s, 0.06 * s, 0.6 * s, 6), x - dx, y + 1.7 * s, z - dz, ry, 0, -1.2);
    if (tipo === 'angelo') {
      statico.aggiungi(chiave, new THREE.BoxGeometry(0.05 * s, 0.7 * s, 0.45 * s), x - Math.sin(ry) * 0.18 * s + dx * 0.4, y + 1.6 * s, z - Math.cos(ry) * 0.18 * s + dz * 0.4, ry, 0.3);
      statico.aggiungi(chiave, new THREE.BoxGeometry(0.05 * s, 0.7 * s, 0.45 * s), x - Math.sin(ry) * 0.18 * s - dx * 0.4, y + 1.6 * s, z - Math.cos(ry) * 0.18 * s - dz * 0.4, ry, 0.3);
    }
  };

  const balaustra = (chiave, x0, z0, x1, z1, y, alto = 0.95, passo = 0.32) => {
    const l = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(2, Math.round(l / passo));
    const profilo = [[0.04, 0], [0.09, 0.08], [0.06, 0.2], [0.1, 0.42], [0.06, 0.62], [0.08, 0.7], [0.05, 0.74]].map(([r, h]) => new THREE.Vector2(r, h * alto / 0.74));
    const balaustro = new THREE.LatheGeometry(profilo, 6);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      statico.aggiungi(chiave, balaustro, x0 + (x1 - x0) * t, y + 0.12, z0 + (z1 - z0) * t);
    }
    const lungoX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    const sp = 0.3;
    if (lungoX) {
      box(chiave, Math.min(x0, x1), y, z0 - sp / 2, Math.max(x0, x1), y + 0.12, z0 + sp / 2);
      box(chiave, Math.min(x0, x1), y + alto + 0.1, z0 - sp / 2, Math.max(x0, x1), y + alto + 0.24, z0 + sp / 2);
    } else {
      box(chiave, x0 - sp / 2, y, Math.min(z0, z1), x0 + sp / 2, y + 0.12, Math.max(z0, z1));
      box(chiave, x0 - sp / 2, y + alto + 0.1, Math.min(z0, z1), x0 + sp / 2, y + alto + 0.24, Math.max(z0, z1));
    }
  };

  const capitello = (chiave, x, y, z, l, p, alto = 0.6) => {
    box(chiave, x - l / 2, y, z - p / 2, x + l / 2, y + alto * 0.7, z + p / 2);
    box(chiave, x - l / 2 - 0.08, y + alto * 0.7, z - p / 2 - 0.08, x + l / 2 + 0.08, y + alto, z + p / 2 + 0.08);
  };

  pavimento('porfido', -60, -56, 62, 45, -0.004, 4);
  pavimento('lastre', -16.1, -19.7, -13.3, 33, 0.002, 1.4);
  pavimento('lastre', 0.5, 12.2, 17.2, 30.4, 0.002, 2.2);
  pavimento('asfalto', 18, 25, 60, 30.6, 0.003, 4);
  pavimento('erba', -12, -43, 1, -27.7, 0.01, 3);
  pavimento('cemento', 18, -45, 42.4, -20.2, 0.01, 4);

  const sagrato = new THREE.CircleGeometry(RAGGIO_SAGRATO, 56, Math.PI / 2, Math.PI).rotateX(-Math.PI / 2);
  const uvS = sagrato.attributes.uv;
  const posS = sagrato.attributes.position;
  for (let i = 0; i < uvS.count; i++) uvS.setXY(i, posS.getX(i) / 2, posS.getZ(i) / 2);
  statico.aggiungi('ciottoli', sagrato, 0, PAVIMENTO_SAGRATO, 0);
  statico.aggiungi('granito', new THREE.CylinderGeometry(RAGGIO_SAGRATO, RAGGIO_SAGRATO, PAVIMENTO_SAGRATO, 56, 1, true, Math.PI, Math.PI), 0, PAVIMENTO_SAGRATO / 2, 0);
  statico.aggiungi('granito', new THREE.RingGeometry(RAGGIO_SAGRATO - 0.3, RAGGIO_SAGRATO, 56, 1, Math.PI / 2, Math.PI).rotateX(-Math.PI / 2), 0, PAVIMENTO_SAGRATO + 0.004, 0);
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI / 2 + (Math.PI * i) / 16;
    const bx = Math.cos(a) * (RAGGIO_SAGRATO + 0.35);
    const bz = -Math.sin(a) * (RAGGIO_SAGRATO + 0.35);
    if (Math.abs(bz) < 1.2) continue;
    cil('pietraBianca', bx, 0, bz, 0.13, 0.62, 8, 0.15);
    sfera('pietraBianca', bx, 0.62, bz, 0.13, 8);
  }
  box('granito', -2.7, 0, -2.9, 0, PAVIMENTO_CHIESA, 2.9, 1);
  box('granito', -3.1, 0, -2.4, -2.7, PAVIMENTO_SAGRATO + 0.08, 2.4, 1);

  pavimento('marmo', 1, -10.35, 42.3, 10.4, PAVIMENTO_CHIESA + 0.002, 2);
  pavimento('marmo', 43.2, -5.2, 56.3, 5.2, PAVIMENTO_PRESBITERIO + 0.002, 2);
  for (let i = 0; i < 3; i++) box('marmoRosa', 42.2 + i * 0.35, PAVIMENTO_CHIESA, -5.2, 43.2, PAVIMENTO_CHIESA + 0.2 * (i + 1), 5.2, 1);
  pavimento('marmo', 18.2, 11.4, 30.5, 24.5, PAVIMENTO_CHIESA + 0.002, 2);
  pavimento('parquet', 43.1, -18.6, 51.3, -5.7, PAVIMENTO_CHIESA + 0.002, 2);
  pavimento('graniglia', -11.5, -27.2, 17.5, -20.2, 0.012, 1.2);
  pavimento('parquet', 1.5, -47.5, 15.5, -36.3, PIANO_CONSIGLIO + 0.002, 2);
  pavimento('cemento', 1.5, -53.5, 16, -48, PIANO_CONSIGLIO - 0.02, 3);
  box('cemento', 1, 0, -53.5, 16, PIANO_CONSIGLIO - 0.03, -48, 3);
  box('intonacoGrezzo', 1, PIANO_CONSIGLIO - 0.03, -53.7, 16, PIANO_CONSIGLIO + 0.6, -53.5, 3);
  for (let i = 0; i < 20; i++) {
    const za = -28.2 - i * 0.35;
    box('granito', 5.5, 0, za - 0.35, 8.5, (PIANO_CONSIGLIO * (i + 1)) / 20, za, 1);
  }
  box('granito', 5.5, 0, -36.3, 8.5, PIANO_CONSIGLIO, -35.2, 1);
  pavimento('legno', 31.6, 13, 36.4, 17.8, PIANO_CELLA + 0.002, 1.2);
  pavimento('parquet', 120, -5, 134, 5, 0.01, 2);

  soffitto('intonaco', -11.5, -27.2, 17.5, -20.2, 4.2, 3);
  soffitto('intonaco', 1.5, -47.5, 15.5, -36, PIANO_CONSIGLIO + 5, 3);
  soffitto('intonaco', 5.5, -36, 8.5, -27.7, PIANO_CONSIGLIO + 5, 3);
  soffitto('intonaco', 43.1, -18.6, 51.3, -5.7, 5, 3);
  soffitto('intonaco', 120, -5, 134, 5, 4.2, 3);
  box('legno', 31.6, PIANO_CELLA - 0.25, 13, 36.4, PIANO_CELLA, 17.8, 1);
  soffitto('legno', 31.6, 13, 36.4, 17.8, PIANO_CELLA + 5.2, 1.2);

  for (const s of MURI) {
    if (MURI_SPECIALI.has(s.parte)) continue;
    const cx = (s.x0 + s.x1) / 2;
    const cz = (s.z0 + s.z1) / 2;
    const h = s.y1 - s.y0;
    const cy = (s.y0 + s.y1) / 2;
    const lati = [
      { l: s.x1 - s.x0, x: cx, z: s.z0, ry: Math.PI, px: cx, pz: s.z0 - 0.4 },
      { l: s.x1 - s.x0, x: cx, z: s.z1, ry: 0, px: cx, pz: s.z1 + 0.4 },
      { l: s.z1 - s.z0, x: s.x0, z: cz, ry: -Math.PI / 2, px: s.x0 - 0.4, pz: cz },
      { l: s.z1 - s.z0, x: s.x1, z: cz, ry: Math.PI / 2, px: s.x1 + 0.4, pz: cz },
    ];
    for (const lato of lati) {
      if (lato.l < 0.02) continue;
      const lungoX = lato.ry === 0 || lato.ry === Math.PI;
      const passi = Math.max(1, Math.ceil(lato.l / 1.5));
      const segmenti = [];
      for (let i = 0; i < passi; i++) {
        const t = (i + 0.5) / passi;
        const z = zonaDi(lungoX ? s.x0 + (s.x1 - s.x0) * t : lato.px, lungoX ? lato.pz : s.z0 + (s.z1 - s.z0) * t);
        const chiave = z && !z.aperto ? INTERNI[z.id] ?? 'intonaco' : ESTERNI[s.parte] ?? 'intonaco';
        const ultimo = segmenti[segmenti.length - 1];
        if (ultimo?.chiave === chiave) ultimo.fine = i + 1;
        else segmenti.push({ chiave, inizio: i, fine: i + 1 });
      }
      for (const seg of segmenti) {
        const centro = (seg.inizio + seg.fine) / 2 / passi;
        const lunghezza = (lato.l * (seg.fine - seg.inizio)) / passi;
        const metriU = seg.chiave === 'municipio' ? 2.7 : 3;
        const metriV = seg.chiave === 'municipio' ? 9.4 : 3;
        const x = lungoX ? s.x0 + (s.x1 - s.x0) * centro : lato.x;
        const zc = lungoX ? lato.z : s.z0 + (s.z1 - s.z0) * centro;
        statico.aggiungi(seg.chiave, facciaUV(lunghezza, h, metriU, s.y0, metriV), x, cy, zc, lato.ry);
      }
    }
    statico.aggiungi(ESTERNI[s.parte] === 'municipio' ? 'intonacoGrezzo' : ESTERNI[s.parte] ?? 'intonaco', pianoUV(s.x1 - s.x0, s.z1 - s.z0, 3), cx, s.y1, cz);
    if (s.parte === 'fiancoNord' || s.parte === 'fiancoSud') {
      const fuori = s.parte === 'fiancoNord' ? s.z0 - 0.02 : s.z1 + 0.02;
      const zf = s.parte === 'fiancoNord' ? s.z0 : s.z1;
      box('granito', s.x0, 0, Math.min(zf, fuori) - 0.12, s.x1, 0.65, Math.max(zf, fuori) + 0.12, 1);
      box('cotto', s.x0, s.y1 - 0.55, Math.min(zf, fuori) - 0.28, s.x1, s.y1, Math.max(zf, fuori) + 0.28, 1);
    }
  }

  for (const [zf, segno] of [[-11.35, -1], [11.4, 1]]) {
    for (const xc of [3.75, 9.5, 15.5, 21.5, 27.25]) {
      if (segno > 0 && xc > 17) continue;
      const finestraEsterna = new THREE.Shape();
      finestraEsterna.moveTo(-0.8, 0);
      finestraEsterna.lineTo(0.8, 0);
      finestraEsterna.lineTo(0.8, 4.2);
      finestraEsterna.absarc(0, 4.2, 0.8, 0, Math.PI, false);
      finestraEsterna.lineTo(-0.8, 0);
      const vetro = new THREE.ShapeGeometry(finestraEsterna, 10);
      statico.aggiungi('vetroScuro', vetro, xc, 4, zf + segno * 0.03, segno > 0 ? 0 : Math.PI);
      statico.aggiungi('cotto', new THREE.TorusGeometry(0.95, 0.1, 5, 14, Math.PI), xc, 8.2, zf + segno * 0.04, segno > 0 ? 0 : Math.PI);
      statico.aggiungi('vetroScuro', new THREE.CircleGeometry(0.55, 16), xc, 11.2, zf + segno * 0.03, segno > 0 ? 0 : Math.PI);
      statico.aggiungi('cotto', new THREE.TorusGeometry(0.62, 0.08, 5, 18), xc, 11.2, zf + segno * 0.04, segno > 0 ? 0 : Math.PI);
    }
    for (const xp of [0.5, 6.6, 12.4, 18.5, 24.4, 30.1]) {
      if (segno > 0 && xp > 18) continue;
      box('ocraScuro', xp - 0.45, 0.65, zf + (segno > 0 ? 0 : -0.16), xp + 0.45, 12.45, zf + (segno > 0 ? 0.16 : 0), 1);
    }
  }

  const vetrateInterne = [];
  for (const [zf, segno] of [[-10.35, 1], [10.4, -1]]) {
    for (const [i, xc] of [3.75, 9.5, 15.5, 21.5, 27.25].entries()) {
      if (segno < 0 && xc > 17 && xc < 26) continue;
      const tex = T.texturaVetrata(i * 7 + (segno > 0 ? 1 : 2));
      vetrateInterne.push(quadro(tex, xc, 6.3, zf + segno * 0.03, { x: 0, z: segno }, 1.6, 4.6, 0.5));
    }
  }

  const archiNavata = [[1, 6], [7, 12], [13, 18], [19, 24], [25, 30]].map(([a, b]) => [a, b, PAVIMENTO_CHIESA, 8.6]);
  for (const z0 of [-6.2, 5.2]) statico.aggiungi('stucco', muroConArchi(1, 30, 0, AVVOLTO_VOLTA, archiNavata, 1, 3), 0, 0, z0);
  for (const zf of [-5.2, 5.2]) {
    const verso = zf < 0 ? 1 : -1;
    for (const xp of [6.5, 12.5, 18.5, 24.5]) {
      const zfaccia = zf;
      box('marmoRosa', xp - 0.42, PAVIMENTO_CHIESA, zfaccia - (verso < 0 ? 0.12 : 0), xp + 0.42, 11.6, zfaccia + (verso > 0 ? 0.12 : 0), 1);
      capitello('oro', xp, 11.6, zfaccia + verso * 0.06, 0.9, 0.24, 0.7);
      quadro(T.texturaViaCrucis(Math.round(xp) + (zf < 0 ? 0 : 7)), xp, 2.7, zfaccia + verso * 0.14, { x: 0, z: verso }, 0.5, 0.62);
    }
    box('stuccoGrigio', 1, 12.3, zf - 0.3, 30, 12.9, zf + 0.3, 1);
    for (const [a, b] of [[1, 6], [7, 12], [13, 18], [19, 24], [25, 30]]) {
      statico.aggiungi('oro', new THREE.TorusGeometry((b - a) / 2, 0.07, 5, 18, Math.PI), (a + b) / 2, 8.6, zf + verso * 0.03);
    }
  }
  for (const [a, b] of [[1, 6.5], [6.5, 12.5], [12.5, 18.5], [18.5, 24.5], [24.5, 30]]) {
    statico.aggiungi('volta', voltaACrociera(b - a, 10.4, AVVOLTO_VOLTA, CHIAVE_VOLTA - AVVOLTO_VOLTA), (a + b) / 2, 0, 0);
    for (const z0 of [-10.35, 6.2]) statico.aggiungi('volta', voltaACrociera(b - a, 4.15, 8.8, 1.6), (a + b) / 2, 0, z0 + 2.075);
  }
  for (const zp of [-10.35, 10.4]) {
    for (const xp of [6.5, 12.5, 18.5, 24.5]) box('stucco', xp - 0.4, PAVIMENTO_CHIESA, zp - 0.1, xp + 0.4, 8.6, zp + 0.1, 1);
    for (const [a, b] of zp > 0 ? [[1, 23], [25, 42]] : [[1, 42]]) box('stuccoGrigio', a, PAVIMENTO_CHIESA, zp - 0.06, b, 1.4, zp + 0.06, 1);
  }
  for (const xp of [3.75, 9.5, 15.5, 21.5, 27.25]) {
    for (const [z, v] of [[-5.18, 1], [5.18, -1]]) vetrateInterne.push(quadro(T.texturaVetrata(Math.round(xp * 3) + (v > 0 ? 50 : 60), false), xp, 14.7, z, { x: 0, z: v }, 1.1, 1.5, 0.5));
  }

  for (const o of OSTACOLI.filter(q => q.tipo === 'pilastroCupola')) box('stucco', o.x0, PAVIMENTO_CHIESA, o.z0, o.x1, 10.4, o.z1, 1);
  for (const x0 of [30, 40.6]) statico.aggiungi('stucco', muroConArchi(-6.6, 6.6, 10.3, 17, [[-5.2, 5.2, 10.4, 11.5]], 1.4, 3), x0, 0, 0, Math.PI / 2);
  box('stucco', 31.4, 10.4, -6.6, 40.6, 17, -5.2, 1);
  box('stucco', 31.4, 10.4, 5.2, 40.6, 17, 6.6, 1);
  for (const [x, z] of [[30.7, -5.9], [30.7, 5.9], [41.3, -5.9], [41.3, 5.9]]) capitello('oro', x, 12.4, z, 1.5, 1.5, 0.6);
  for (const z0 of [-10.35, 6.6]) statico.aggiungi('volta', voltaACrociera(10.6, 3.75, 8.8, 1.6), 36, 0, z0 + 1.875);
  const anelloCupola = new THREE.RingGeometry(5.6, 8.6, 32, 1).rotateX(Math.PI / 2);
  statico.aggiungi('stucco', anelloCupola, 36, 17, 0);
  statico.aggiungi('cupola', new THREE.CylinderGeometry(5.6, 5.6, 3.6, 32, 1, true), 36, 18.8, 0);
  statico.aggiungi('cupola', new THREE.SphereGeometry(5.6, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), 36, 20.6, 0);
  const finestreTamburo = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.8), new THREE.MeshBasicMaterial({ color: 0x8aa0c8, side: THREE.DoubleSide }));
    m.position.set(36 + Math.cos(a) * 5.55, 18.8, Math.sin(a) * 5.55);
    m.lookAt(36, 18.8, 0);
    scena.add(m);
    finestreTamburo.push(m);
  }
  const lucernario = new THREE.Mesh(new THREE.CircleGeometry(0.9, 16).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xb8c8ea }));
  lucernario.position.set(36, 26.15, 0);
  scena.add(lucernario);

  statico.aggiungi('volta', voltaABotte(14, 10.4, 11.5, 5.2), 49.15, 0, 0);
  box('stuccoGrigio', 42.3, 11, -5.2, 56.3, 11.5, -4.9, 1);
  box('stuccoGrigio', 42.3, 11, 4.9, 56.3, 11.5, 5.2, 1);
  faccia('stucco', 10.4, 3.7, 56.28, 14.85, 0, -Math.PI / 2, 3, 13);
  for (const xp of [43.6, 47.2, 50.8]) {
    for (const [zf, v] of [[-5.2, 1], [5.2, -1]]) {
      box('marmoRosa', xp - 0.35, PAVIMENTO_PRESBITERIO, Math.min(zf, zf + v * 0.12), xp + 0.35, 10.5, Math.max(zf, zf + v * 0.12), 1);
      capitello('oro', xp, 10.5, zf + v * 0.06, 0.8, 0.24, 0.5);
    }
  }
  statico.aggiungi('stucco', quadVerticale(54.2, -5.2, 56.3, -3.3, PAVIMENTO_PRESBITERIO, 16.7), 0, 0, 0);
  statico.aggiungi('stucco', quadVerticale(56.3, 3.3, 54.2, 5.2, PAVIMENTO_PRESBITERIO, 16.7), 0, 0, 0);
  [[56.25, 0, 1.3], [56.25, -2.2, 1.1], [56.25, 2.2, 1.1]].forEach(([x, z, l], i) => vetrateInterne.push(quadro(T.texturaVetrata(40 + i), x, PAVIMENTO_PRESBITERIO + 5.2, z, { x: -1, z: 0 }, l, 3.6, 0.6)));

  box('marmoRosa', 50.6, PAVIMENTO_PRESBITERIO, -1.4, 52.4, PAVIMENTO_PRESBITERIO + 1.05, 1.4, 1);
  box('pietraBianca', 50.5, PAVIMENTO_PRESBITERIO + 1.05, -1.5, 52.5, PAVIMENTO_PRESBITERIO + 1.12, 1.5, 1);
  box('tovaglia', 50.55, PAVIMENTO_PRESBITERIO + 0.75, -1.45, 52.45, PAVIMENTO_PRESBITERIO + 1.13, 1.45, 1);
  box('legnoScuro', 53.2, PAVIMENTO_PRESBITERIO, -1.1, 54.6, PAVIMENTO_PRESBITERIO + 1.6, 1.1, 1);
  for (const [dx, dz] of [[-0.55, -0.85], [0.55, -0.85], [-0.55, 0.85], [0.55, 0.85]]) cil('oro', 53.9 + dx, PAVIMENTO_PRESBITERIO + 1.6, dz, 0.07, 1.8, 8);
  box('legnoScuro', 53.15, PAVIMENTO_PRESBITERIO + 3.4, -1.15, 54.65, PAVIMENTO_PRESBITERIO + 3.75, 1.15, 1);
  statico.aggiungi('oro', new THREE.SphereGeometry(0.7, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), 53.9, PAVIMENTO_PRESBITERIO + 3.75, 0);
  statua('pietraBianca', 53.9, PAVIMENTO_PRESBITERIO + 4.45, 0, 0.35, -Math.PI / 2);
  for (const dz of [-1.1, -0.4, 0.4, 1.1]) {
    cil('oro', 51.5, PAVIMENTO_PRESBITERIO + 1.12, dz, 0.035, 0.45, 6);
    cil('bianco', 51.5, PAVIMENTO_PRESBITERIO + 1.57, dz, 0.025, 0.22, 6);
  }
  for (const zs of [-4.7, 4.7]) box('legno', 46, PAVIMENTO_PRESBITERIO, zs - 0.25, 53, PAVIMENTO_PRESBITERIO + 1.1, zs + 0.25, 1);
  balaustra('pietraBianca', 42.15, -5.1, 42.15, -1.2, PAVIMENTO_CHIESA, 0.8, 0.28);
  balaustra('pietraBianca', 42.15, 1.2, 42.15, 5.1, PAVIMENTO_CHIESA, 0.8, 0.28);

  const crocifisso = new THREE.Group();
  const legnoCroce = mat.legnoScuro;
  const asta = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.4, 0.14), legnoCroce);
  const braccio = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.22, 0.14), legnoCroce);
  braccio.position.y = 0.95;
  const corpoCristo = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.09, 1.25, 8), mat.oro);
  corpoCristo.position.set(0, 0.25, 0.1);
  const bracciCristo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.08), mat.oro);
  bracciCristo.position.set(0, 0.9, 0.1);
  const testaCristo = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), mat.oro);
  testaCristo.position.set(0, 1.02, 0.12);
  crocifisso.add(asta, braccio, corpoCristo, bracciCristo, testaCristo);
  crocifisso.position.set(43.2, 9.4, 0);
  crocifisso.rotation.y = -Math.PI / 2;
  scena.add(crocifisso);
  for (const dz of [-0.9, 0.9]) cil('ferro', 43.2, 11.05, dz, 0.01, 4.5, 4);

  box('legnoScuro', 1, 5.4, -4.2, 3.6, 5.7, 4.2, 1);
  balaustra('legnoScuro', 3.5, -4.1, 3.5, 4.1, 5.7, 0.85, 0.3);
  box('oro', 3.45, 5.55, -4.2, 3.7, 5.75, 4.2, 1);
  for (const dz of [-3.9, 3.9]) box('stuccoGrigio', 1, 4.9, dz - 0.25, 2.2, 5.4, dz + 0.25, 1);
  box('legnoScuro', 1, 6.6, -2.6, 2.1, 11.2, 2.6, 1);
  quadro(T.texturaCanne(), 2.12, 8.8, 0, { x: 1, z: 0 }, 5, 4.2);
  box('oro', 2.1, 11.1, -2.7, 2.3, 11.45, 2.7, 1);

  quadro(T.texturaUltimaCena(), 36, 3.9, -10.22, { x: 0, z: 1 }, 3.6, 1.8, 0.04);
  box('oro', 34, 2.85, -10.35, 38, 3, -10.18, 1);
  box('oro', 34, 4.8, -10.35, 38, 4.95, -10.18, 1);
  box('oro', 34, 2.85, -10.35, 34.15, 4.95, -10.18, 1);
  box('oro', 37.85, 2.85, -10.35, 38, 4.95, -10.18, 1);
  cartello(['G.B. CRESPI detto IL CERANO', 'ULTIMA CENA - 1595'], 36, 2.62, -10.2, { x: 0, z: 1 }, 1.7, 0.32, { larghezza: 256, altezza: 48, sfondo: '#1a120a', colore: '#d8c08a', font: 'bold 13px Georgia, serif' });
  box('marmoRosa', 34, PAVIMENTO_CHIESA, -10.35, 38, PAVIMENTO_CHIESA + 1.1, -9.4, 1);
  box('marmoRosa', 34, PAVIMENTO_CHIESA, 9.45, 38, PAVIMENTO_CHIESA + 1.1, 10.4, 1);
  box('legnoScuro', 35.2, PAVIMENTO_CHIESA + 1.1, 9.9, 36.8, PAVIMENTO_CHIESA + 4.6, 10.4, 1);
  statua('legno', 36, PAVIMENTO_CHIESA + 1.3, 9.9, 0.9, Math.PI);
  cartello(['ECCE HOMO', 'statua lignea del Cerano'], 36, PAVIMENTO_CHIESA + 0.75, 9.43, { x: 0, z: -1 }, 1.5, 0.3, { larghezza: 256, altezza: 48, sfondo: '#1a120a', colore: '#d8c08a', font: 'bold 13px Georgia, serif' });

  const banco = (x, z0, z1) => {
    box('legnoScuro', x - 0.22, PAVIMENTO_CHIESA + 0.42, z0, x + 0.22, PAVIMENTO_CHIESA + 0.48, z1, 1);
    box('legnoScuro', x + 0.18, PAVIMENTO_CHIESA + 0.48, z0, x + 0.24, PAVIMENTO_CHIESA + 0.95, z1, 1);
    box('legnoScuro', x - 0.45, PAVIMENTO_CHIESA + 0.1, z0, x - 0.36, PAVIMENTO_CHIESA + 0.2, z1, 1);
    for (const ze of [z0, z1 - 0.06]) box('legnoScuro', x - 0.5, PAVIMENTO_CHIESA, ze, x + 0.25, PAVIMENTO_CHIESA + 0.95, ze + 0.06, 1);
  };
  for (let x = 5.5; x <= 26.6; x += 0.96) {
    banco(x, -4.55, -0.95);
    banco(x, 0.95, 4.55);
  }

  for (const f of FINESTRE.filter(q => q.tana && q.zona !== 'piazza')) {
    const lapide = new THREE.MeshStandardMaterial({ map: T.texturaLapide(['HIC IACET', `MDC${['XII', 'XXX', 'XLV'][Number(f.id.slice(1)) - 1] ?? 'X'}`, 'R.I.P.']), roughness: 0.6 });
    pannello(lapide, 1, 2, f.centro.x, PAVIMENTO_CHIESA + 0.006, f.centro.z, { x: 0, z: 1 }, { x: -Math.PI / 2 });
  }

  box('marmoRosa', 18.2, PAVIMENTO_CHIESA, 16.6, 19.4, PAVIMENTO_CHIESA + 1.2, 19.8, 1);
  box('oro', 18.35, PAVIMENTO_CHIESA + 1.2, 16.9, 19.3, PAVIMENTO_CHIESA + 1.26, 19.5, 1);
  const urna = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 2.4), new THREE.MeshPhysicalMaterial({ color: 0xd8e8f0, transparent: true, opacity: 0.25, roughness: 0.05 }));
  urna.position.set(18.85, PAVIMENTO_CHIESA + 1.6, 18.2);
  scena.add(urna);
  for (const [dx, dz] of [[-0.4, -1.2], [0.4, -1.2], [-0.4, 1.2], [0.4, 1.2]]) box('oro', 18.85 + dx - 0.03, PAVIMENTO_CHIESA + 1.26, 18.2 + dz - 0.03, 18.85 + dx + 0.03, PAVIMENTO_CHIESA + 1.92, 18.2 + dz + 0.03, 1);
  box('oro', 18.43, PAVIMENTO_CHIESA + 1.9, 16.98, 19.27, PAVIMENTO_CHIESA + 1.96, 19.42, 1);
  statico.aggiungi('legno', new THREE.CylinderGeometry(0.16, 0.2, 1.7, 8).rotateX(Math.PI / 2), 18.85, PAVIMENTO_CHIESA + 1.45, 18.3);
  sfera('pietraBianca', 18.85, PAVIMENTO_CHIESA + 1.52, 17.35, 0.13, 8);
  quadro(T.texturaBeato(), 18.22, 4.6, 18.2, { x: 1, z: 0 }, 3, 1.6, 0.08);
  cartello(['BEATO PACIFICO', 'da Cerano (1424-1482)'], 18.24, 3.4, 18.2, { x: 1, z: 0 }, 1.9, 0.38, { larghezza: 256, altezza: 52, sfondo: '#1a120a', colore: '#e8d29a', font: 'bold 14px Georgia, serif' });
  for (const dz of [-1.6, 1.6]) {
    cil('oro', 19.6, PAVIMENTO_CHIESA, 18.2 + dz, 0.05, 1.2, 6);
    cil('bianco', 19.6, PAVIMENTO_CHIESA + 1.2, 18.2 + dz, 0.035, 0.3, 6);
  }
  const volticella = new THREE.Shape([new THREE.Vector2(18.2, 11.4), new THREE.Vector2(30.5, 11.4), new THREE.Vector2(30.5, 24.5), new THREE.Vector2(18.2, 24.5)]);
  volticella.holes.push(new THREE.Path().absarc(24.35, 17.95, 4.4, 0, Math.PI * 2, false));
  statico.aggiungi('stucco', scalaUV(new THREE.ShapeGeometry(volticella, 24), 1 / 3).rotateX(Math.PI / 2), 0, 9, 0);
  statico.aggiungi('cupola', new THREE.SphereGeometry(4.4, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), 24.35, 9, 17.95);
  const portaTorre = ACQUISTI.find(a => a.id === 'campanile');
  box('porta', 30.4, PAVIMENTO_CHIESA, portaTorre.posizione.z - 0.65, 30.5, PAVIMENTO_CHIESA + 2.3, portaTorre.posizione.z + 0.65, 1);
  for (const dy of [0.5, 1.2, 1.9]) box('ferro', 30.36, PAVIMENTO_CHIESA + dy, portaTorre.posizione.z - 0.65, 30.4, PAVIMENTO_CHIESA + dy + 0.06, portaTorre.posizione.z + 0.65, 1);
  cartello(['CAMPANILE', '45 m'], 30.38, 2.95, portaTorre.posizione.z, { x: -1, z: 0 }, 0.9, 0.36, { larghezza: 128, altezza: 52, sfondo: '#2a1c12', colore: '#e8d29a', font: 'bold 14px Georgia, serif' });

  const corpoCentrale = 5.3;
  const facciataCentrale = muroConArchi(-corpoCentrale, corpoCentrale, 0, 17.2, [[-1.3, 1.3, PAVIMENTO_CHIESA, 4.7]], 1, 3);
  statico.aggiungi('ocra', facciataCentrale, 0, 0, 0, Math.PI / 2);
  const controfacciata = new THREE.Shape([new THREE.Vector2(-10.35, 0), new THREE.Vector2(10.4, 0), new THREE.Vector2(10.4, CHIAVE_VOLTA), new THREE.Vector2(-10.35, CHIAVE_VOLTA)]);
  controfacciata.holes.push(sagomaArco(-1.3, 1.3, PAVIMENTO_CHIESA, 4.7));
  statico.aggiungi('stucco', scalaUV(new THREE.ShapeGeometry(controfacciata, 12), 1 / 3), 1.004, 0, 0, Math.PI / 2);
  for (const zc of [-8.35, 8.35]) {
    const ala = muroConArchi(zc - 3.05, zc + 3.05, 0, 11.5, [[zc - 0.95, zc + 0.95, PAVIMENTO_CHIESA, 3.5]], 1, 3);
    statico.aggiungi('ocra', ala, 0, 0, 0, Math.PI / 2);
    box('porta', 0.45, 0, zc - 0.95, 0.55, 4.45, zc + 0.95, 1);
    statico.aggiungi('cotto', new THREE.TorusGeometry(1.05, 0.11, 5, 16, Math.PI), -0.04, 3.5, zc, Math.PI / 2);
    statico.aggiungi('vetroScuro', new THREE.CircleGeometry(0.7, 14, 0, Math.PI), -0.03, 5.6, zc, -Math.PI / 2);
    statico.aggiungi('cotto', new THREE.TorusGeometry(0.78, 0.08, 5, 14, Math.PI), -0.05, 5.6, zc, Math.PI / 2);
    statico.aggiungi('cotto', new THREE.TorusGeometry(1.75, 0.16, 5, 18, Math.PI), -0.06, 5.6, zc, Math.PI / 2);
    box('cotto', -0.22, 0, zc - 1.92, 0, 5.6, zc - 1.58, 1);
    box('cotto', -0.22, 0, zc + 1.58, 0, 5.6, zc + 1.92, 1);
  }
  for (const zp of [-11.2, -corpoCentrale - 0.15, corpoCentrale + 0.15, 11.25]) {
    box('ocraScuro', -0.3, 0, zp - 0.45, 0, 10.4, zp + 0.45, 1);
    capitello('cotto', -0.15, 10.4, zp, 0.3, 1.0, 0.5);
  }
  for (const zp of [-3.2, 3.2]) {
    box('ocraScuro', -0.3, 0, zp - 0.4, 0, 10.4, zp + 0.4, 1);
    capitello('cotto', -0.15, 10.4, zp, 0.3, 0.9, 0.5);
  }
  box('cotto', -0.45, 10.9, -11.5, 0, 11.5, 11.55, 1);
  box('ocraScuro', -0.25, 10.4, -11.4, 0, 10.9, 11.45, 1);
  for (const [z0, z1] of [[-11.3, -corpoCentrale - 0.2], [corpoCentrale + 0.2, 11.35]]) balaustra('cotto', -0.2, z0, -0.2, z1, 11.5, 0.85, 0.34);
  for (const [z, angelo] of [[-11.1, true], [-6, false], [6, false], [11.15, true]]) statua('statua', -0.25, 12.6, z, 0.95, -Math.PI / 2, angelo ? 'angelo' : 'santo');
  for (const zp of [-corpoCentrale + 0.4, -2.2, 2.2, corpoCentrale - 0.4]) {
    box('ocraScuro', -0.25, 11.5, zp - 0.35, 0, 16, zp + 0.35, 1);
    capitello('cotto', -0.12, 16, zp, 0.25, 0.8, 0.4);
  }
  statico.aggiungi('vetroScuro', new THREE.CircleGeometry(1.05, 20), -0.03, 13.9, 0, -Math.PI / 2);
  statico.aggiungi('cotto', new THREE.TorusGeometry(1.15, 0.14, 6, 22), -0.05, 13.9, 0, Math.PI / 2);
  box('cotto', -0.4, 16.4, -corpoCentrale - 0.1, 0, 16.9, corpoCentrale + 0.1, 1);
  balaustra('cotto', -0.2, -corpoCentrale + 0.1, -0.2, corpoCentrale - 0.1, 16.9, 0.8, 0.36);
  for (const [z, ang] of [[-4.6, true], [-1.5, false], [1.5, false], [4.6, true]]) statua('statua', -0.2, 17.95, z, 1, -Math.PI / 2, ang ? 'angelo' : 'santo');
  box('cotto', -0.3, 17.95, -0.25, 0.1, 18.4, 0.25, 1);
  box('ferro', -0.12, 18.4, -0.04, -0.04, 20.1, 0.04, 1);
  box('ferro', -0.12, 19.45, -0.45, -0.04, 19.55, 0.45, 1);

  for (const zc of [-2.3, 2.3]) {
    cil('marmoRosa', -2.15, PAVIMENTO_CHIESA, zc, 0.28, 6.9, 14, 0.3);
    capitello('cotto', -2.15, 7.2, zc, 0.75, 0.75, 0.45);
    box('cotto', -2.5, PAVIMENTO_CHIESA, zc - 0.36, -1.8, PAVIMENTO_CHIESA + 0.3, zc + 0.36, 1);
  }
  const arcoG = scalaUV(new THREE.ExtrudeGeometry(semianello(2.9, 2.3), { depth: 0.8, bevelEnabled: false, curveSegments: 16 }), 1 / 2);
  statico.aggiungi('ocra', arcoG, -2.6, 7.65, 0, Math.PI / 2);
  box('ocra', -2.6, 7.65, -2.95, -1.8, 10.6, -2.3, 1);
  box('ocra', -2.6, 7.65, 2.3, -1.8, 10.6, 2.95, 1);
  box('cotto', -2.8, 10.2, -3.05, 0, 10.7, 3.05, 1);
  soffitto('crema', -2.6, -2.9, 0, 2.9, 9.95, 2);
  const frontone = new THREE.Shape();
  frontone.absarc(0, 0, 3.05, 0, Math.PI, false);
  frontone.lineTo(-3.05, 0);
  statico.aggiungi('cotto', scalaUV(new THREE.ExtrudeGeometry(frontone, { depth: 0.5, bevelEnabled: false, curveSegments: 18 }), 0.5), -2.75, 10.7, 0, Math.PI / 2);
  const timpano = new THREE.Shape();
  timpano.absarc(0, 0, 2.6, 0, Math.PI, false);
  timpano.lineTo(-2.6, 0);
  statico.aggiungi('ocra', new THREE.ShapeGeometry(timpano, 16), -2.79, 10.75, 0, -Math.PI / 2);
  statico.aggiungi('cotto', new THREE.CircleGeometry(0.85, 18), -2.81, 11.75, 0, -Math.PI / 2);
  statua('statua', -2.9, 11.25, 0, 0.55, -Math.PI / 2);
  for (const zc of [-2.9, 2.9]) statua('statua', -2.6, 10.7, zc, 0.75, -Math.PI / 2, 'angelo');

  for (const [zEst, zInt, ry] of [[-5.7, -5.2, Math.PI], [5.7, 5.2, 0]]) {
    faccia('ocra', 29, 4.6, 15.5, 15.3, zEst, ry, 3, 13);
    faccia('stucco', 29, 4.6, 15.5, 15.3, zInt, ry + Math.PI, 3, 13);
    box('ocra', 1, 17.55, Math.min(zEst, zInt), 30, 17.6, Math.max(zEst, zInt), 3);
  }
  for (const xc of [3.75, 9.5, 15.5, 21.5, 27.25]) {
    for (const [z, ry] of [[-5.73, Math.PI], [5.73, 0]]) {
      statico.aggiungi('vetroScuro', new THREE.CircleGeometry(0.75, 16), xc, 15.2, z, ry);
      statico.aggiungi('cotto', new THREE.TorusGeometry(0.85, 0.09, 5, 16), xc, 15.2, z + (z < 0 ? -0.01 : 0.01), ry);
    }
  }
  box('cotto', 0.6, 17.6, -6, 30.3, 18, 6, 1);
  statico.aggiungi('tegole', falda(0.4, -6.2, 30.5, 0, 17.9, 20.4, 'z'), 0, 0, 0);
  statico.aggiungi('tegole', falda(0.4, 6.2, 30.5, 0, 17.9, 20.4, 'z'), 0, 0, 0);
  const timpanoFacciata = new THREE.Shape([new THREE.Vector2(-6, 0), new THREE.Vector2(6, 0), new THREE.Vector2(0, 2.5)]);
  statico.aggiungi('ocra', new THREE.ShapeGeometry(timpanoFacciata), 0.45, 17.9, 0, -Math.PI / 2);
  for (const [za, zb] of [[-11.6, -5.6], [11.6, 5.6]]) {
    statico.aggiungi('tegole', falda(0.6, za, 30.4, zb, 13, 14.2, 'z'), 0, 0, 0);
  }
  box('ocra', 30, 13, -11.35, 42, 14.2, -6.4, 3);
  box('ocra', 30, 13, 6.4, 42, 14.2, 11.4, 3);
  statico.aggiungi('tegole', falda(29.6, -11.6, 42.4, -6.4, 14.1, 14.6, 'z'), 0, 0, 0);
  statico.aggiungi('tegole', falda(29.6, 11.6, 42.4, 6.4, 14.1, 14.6, 'z'), 0, 0, 0);
  box('ocra', 30, 14.2, -6.4, 42, 19.2, -5.8, 3);
  box('ocra', 30, 14.2, 5.8, 42, 19.2, 6.4, 3);
  box('ocra', 30, 14.2, -5.8, 30.6, 19.2, 5.8, 3);
  box('ocra', 41.4, 14.2, -5.8, 42, 19.2, 5.8, 3);
  box('cotto', 29.8, 19.2, -6.6, 42.2, 19.6, -5.8, 1);
  box('cotto', 29.8, 19.2, 5.8, 42.2, 19.6, 6.6, 1);
  box('cotto', 29.8, 19.2, -5.8, 30.6, 19.6, 5.8, 1);
  box('cotto', 41.4, 19.2, -5.8, 42.2, 19.6, 5.8, 1);
  statico.aggiungi('crema', new THREE.CylinderGeometry(6.2, 6.2, 4.6, 32, 1, true), 36, 21.9, 0);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const x = 36 + Math.cos(a) * 6.22;
    const z = Math.sin(a) * 6.22;
    if (i % 2) box('cotto', x - 0.15, 19.6, z - 0.15, x + 0.15, 24.2, z + 0.15, 1);
    else {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.8), mat.vetroScuro);
      f.position.set(36 + Math.cos(a) * 6.25, 21.9, Math.sin(a) * 6.25);
      f.lookAt(36 + Math.cos(a) * 10, 21.9, Math.sin(a) * 10);
      scena.add(f);
    }
  }
  statico.aggiungi('cotto', new THREE.CylinderGeometry(6.45, 6.45, 0.4, 32, 1, true), 36, 24.4, 0);
  statico.aggiungi('piombo', new THREE.SphereGeometry(6.3, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), 36, 24.6, 0);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    statico.aggiungi('piombo', new THREE.TorusGeometry(6.32, 0.08, 4, 20, Math.PI / 2), 36, 24.6, 0, a, 0, Math.PI / 2);
  }
  cil('crema', 36, 30.8, 0, 1.15, 2.2, 12);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    box('nero', 36 + Math.cos(a) * 1.14 - 0.12, 31.3, Math.sin(a) * 1.14 - 0.12, 36 + Math.cos(a) * 1.14 + 0.12, 32.5, Math.sin(a) * 1.14 + 0.12, 1);
  }
  statico.aggiungi('piombo', new THREE.SphereGeometry(1.25, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2), 36, 33, 0);
  box('ferro', 35.96, 34.2, -0.04, 36.04, 36, 0.04, 1);
  box('ferro', 35.96, 35.2, -0.45, 36.04, 35.3, 0.45, 1);

  box('ocra', 42, 13, -11.35, 57.3, 13.5, -5.7, 3);
  box('ocra', 42, 13, 5.7, 57.3, 13.5, 11.4, 3);
  statico.aggiungi('tegole', falda(42, -6, 57.5, 0, 14.6, 17.4, 'z'), 0, 0, 0);
  statico.aggiungi('tegole', falda(42, 6, 57.5, 0, 14.6, 17.4, 'z'), 0, 0, 0);
  box('ocra', 42.3, 11.5, -5.7, 57.3, 14.6, -5.2, 3);
  box('ocra', 42.3, 11.5, 5.2, 57.3, 14.6, 5.7, 3);
  box('ocra', 56.3, 13, -5.2, 57.3, 14.6, 5.2, 3);
  statico.aggiungi('ocra', new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(-6, 0), new THREE.Vector2(6, 0), new THREE.Vector2(0, 2.8)])), 57.31, 14.6, 0, Math.PI / 2);
  statico.aggiungi('tegole', falda(42, -11.6, 57.5, -5.6, 13.3, 14, 'z'), 0, 0, 0);
  statico.aggiungi('tegole', falda(42, 11.6, 57.5, 5.6, 13.3, 14, 'z'), 0, 0, 0);
  for (const z of [-2.2, 0, 2.2]) statico.aggiungi('vetroScuro', new THREE.PlaneGeometry(1.1, 3.6), 57.32, PAVIMENTO_PRESBITERIO + 5.2, z, Math.PI / 2);

  box('ocra', 42.6, 6, -19.1, 51.8, 6.4, -11.35, 3);
  statico.aggiungi('tegole', tettoPadiglione(42.3, -19.4, 52.1, -11.2, 6.4, 8.4), 0, 0, 0);
  for (const xc of [44.6, 49.6]) {
    statico.aggiungi('vetroScuro', new THREE.PlaneGeometry(1, 1.6), xc, 3.6, -19.12, Math.PI);
  }

  const fronteTempietto = muroConArchi(17.7, 31, 0, 10.5, [[19.6, 22.4, PAVIMENTO_CHIESA, 5.8], [26.3, 29.1, PAVIMENTO_CHIESA, 5.8]], 0.5, 3);
  statico.aggiungi('ocra', fronteTempietto, 0, 0, 24.5);
  const fronteInterno = new THREE.Shape([new THREE.Vector2(-30.5, 0), new THREE.Vector2(-18.2, 0), new THREE.Vector2(-18.2, 9), new THREE.Vector2(-30.5, 9)]);
  fronteInterno.holes.push(sagomaArco(-22.4, -19.6, PAVIMENTO_CHIESA, 5.8), sagomaArco(-29.1, -26.3, PAVIMENTO_CHIESA, 5.8));
  statico.aggiungi('stucco', scalaUV(new THREE.ShapeGeometry(fronteInterno, 12), 1 / 3), 0, 0, 24.49, Math.PI);
  for (const xp of [17.95, 22.65, 26.05, 30.75]) {
    box('ocraScuro', xp - 0.32, 0, 25, xp + 0.32, 8.6, 25.2, 1);
    capitello('cotto', xp, 8.6, 25.1, 0.75, 0.3, 0.45);
  }
  for (const xc of [21, 27.7]) statico.aggiungi('cotto', new THREE.TorusGeometry(1.5, 0.12, 5, 16, Math.PI), xc, 5.8, 25.06);
  box('cotto', 17.6, 9.05, 24.4, 31.1, 9.7, 25.35, 1);
  balaustra('cotto', 17.9, 25.15, 22.2, 25.15, 9.7, 0.8, 0.34);
  balaustra('cotto', 26.5, 25.15, 30.8, 25.15, 9.7, 0.8, 0.34);
  const curvo = new THREE.Shape();
  curvo.absarc(0, 0, 2, 0, Math.PI, false);
  curvo.lineTo(-2, 0);
  statico.aggiungi('cotto', new THREE.ExtrudeGeometry(curvo, { depth: 0.4, bevelEnabled: false, curveSegments: 14 }), 24.35, 9.7, 24.9);
  statico.aggiungi('ocra', new THREE.CircleGeometry(0.75, 16), 24.35, 10.6, 25.32);
  statua('statua', 24.35, 11.7, 25, 0.95, 0);
  for (const xu of [18.2, 30.5]) {
    box('cotto', xu - 0.25, 10.5, 24.9, xu + 0.25, 10.8, 25.4, 1);
    statico.aggiungi('cotto', new THREE.SphereGeometry(0.28, 10, 8), xu, 11.1, 25.15);
  }
  statico.aggiungi('tegole', tettoPadiglione(17.4, 11.2, 31.2, 24.6, 10.4, 14.6), 0, 0, 0);
  cil('crema', 30.1, 10.4, 23.9, 0.8, 1.8, 8);
  statico.aggiungi('piombo', new THREE.SphereGeometry(0.85, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), 30.1, 12.2, 23.9);
  box('ferro', 30.06, 13, 23.86, 30.14, 13.8, 23.94, 1);
  statico.aggiungi('tegole', tettoPadiglione(30.8, 11.2, 52.8, 25.2, 10.2, 12.8), 0, 0, 0);
  box('ocra', 31, 0, 18.4, 37, 10.2, 25, 3);
  box('ocra', 37, 0, 11.4, 52.6, 10.2, 25, 3);
  box('cotto', 30.9, 9.7, 24.95, 52.7, 10.2, 25.3, 1);
  box('granito', 31, 0, 24.95, 52.6, 0.6, 25.1, 1);
  for (let x = 32.4; x < 52; x += 3) {
    if (x > 34 && x < 40.6) continue;
    for (const y of [2.2, 6]) {
      statico.aggiungi('vetroScuro', new THREE.PlaneGeometry(1.1, 1.7), x, y + 0.85, 25.02);
      box('cotto', x - 0.68, y - 0.12, 25, x + 0.68, y, 25.12, 1);
      box('cotto', x - 0.68, y + 1.7, 25, x + 0.68, y + 1.86, 25.12, 1);
    }
  }
  for (const zp of [11.65, 18.2, 24.75]) {
    box('ocraScuro', 17.52, 0, zp - 0.4, 17.7, 8.6, zp + 0.4, 1);
    capitello('cotto', 17.61, 8.6, zp, 0.2, 0.9, 0.4);
  }
  box('cotto', 17.4, 9, 11.4, 17.7, 9.7, 25.1, 1);
  statico.aggiungi('nero', new THREE.ShapeGeometry(new THREE.Shape().moveTo(-0.75, 0).lineTo(0.75, 0).lineTo(0.75, 2.6).absarc(0, 2.6, 0.75, 0, Math.PI, false).lineTo(-0.75, 0), 10), 17.68, 2.2, 15, -Math.PI / 2);
  statico.aggiungi('nero', new THREE.ShapeGeometry(new THREE.Shape().moveTo(-0.75, 0).lineTo(0.75, 0).lineTo(0.75, 2.6).absarc(0, 2.6, 0.75, 0, Math.PI, false).lineTo(-0.75, 0), 10), 17.68, 2.2, 21.4, -Math.PI / 2);
  statua('statua', 17.35, 2.2, 15, 0.7, -Math.PI / 2);
  statua('statua', 17.35, 2.2, 21.4, 0.7, -Math.PI / 2);

  const cancelli = [];
  for (const xc of [21, 27.7]) {
    const anta = new THREE.Group();
    anta.position.set(xc - 1.4, PAVIMENTO_CHIESA, 24.75);
    for (let i = 0; i <= 10; i++) {
      const sbarra = new THREE.Mesh(new THREE.BoxGeometry(0.035, 5.4, 0.035), mat.ferro);
      sbarra.position.set(0.12 + i * 0.26, 2.7, 0);
      anta.add(sbarra);
    }
    for (const y of [0.2, 2.6, 5.3]) {
      const traversa = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.06, 0.05), mat.ferro);
      traversa.position.set(1.4, y, 0);
      anta.add(traversa);
    }
    scena.add(anta);
    cancelli.push(anta);
    const tendaggio = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 5.4), mat.velluto);
    tendaggio.position.set(xc, PAVIMENTO_CHIESA + 2.9, 24.55);
    scena.add(tendaggio);
    cancelli.push(tendaggio);
  }

  const campanile = OGGETTI.CAMPANILE;
  const cx = (campanile.x0 + campanile.x1) / 2;
  const czc = (campanile.z0 + campanile.z1) / 2;
  const lato = campanile.x1 - campanile.x0;
  box('mattoni', campanile.x0, 10.2, campanile.z0, campanile.x1, 24, campanile.z1, 2);
  box('crema', campanile.x0 - 0.05, 24, campanile.z0 - 0.05, campanile.x1 + 0.05, 28.7, campanile.z1 + 0.05, 2);
  box('cotto', campanile.x0 - 0.2, 28.7, campanile.z0 - 0.2, campanile.x1 + 0.2, 29.2, campanile.z1 + 0.2, 1);
  box('cotto', campanile.x0 - 0.15, 23.7, campanile.z0 - 0.15, campanile.x1 + 0.15, 24, campanile.z1 + 0.15, 1);
  const archiBifora = [[-2.05, -0.2, PIANO_CELLA + 0.5, PIANO_CELLA + 2.85], [0.2, 2.05, PIANO_CELLA + 0.5, PIANO_CELLA + 2.85]];
  for (const [rx, ox, oz] of [[0, 0, campanile.z1 - 0.6], [Math.PI, 0, campanile.z0 + 0.6], [Math.PI / 2, campanile.x1 - 0.6, 0], [-Math.PI / 2, campanile.x0 + 0.6, 0]]) {
    const cella = muroConArchi(-lato / 2, lato / 2, 29.2, 36.1, archiBifora, 0.6, 2);
    const mesh = new THREE.Mesh(cella, mat.mattoni);
    if (rx === 0) mesh.position.set(cx, 0, oz);
    else if (rx === Math.PI) { mesh.position.set(cx, 0, oz); mesh.rotation.y = Math.PI; }
    else { mesh.position.set(ox, 0, czc); mesh.rotation.y = rx; }
    mesh.updateMatrix();
    statico.aggiungi('mattoni', cella.clone().applyMatrix4(mesh.matrix), 0, 0, 0);
  }
  for (const [x, z] of [[cx, campanile.z0 + 0.3], [cx, campanile.z1 - 0.3], [campanile.x0 + 0.3, czc], [campanile.x1 - 0.3, czc]]) cil('pietraBianca', x, PIANO_CELLA + 0.5, z, 0.11, 2.35, 8);
  box('cotto', campanile.x0 - 0.25, 36.1, campanile.z0 - 0.25, campanile.x1 + 0.25, 36.7, campanile.z1 + 0.25, 1);
  box('mattoni', campanile.x0 + 0.3, 36.7, campanile.z0 + 0.3, campanile.x1 - 0.3, 37.4, campanile.z1 - 0.3, 1);
  cil('mattoni', cx, 37.4, czc, 2.55, 0.9, 16);
  statico.aggiungi('mattoni', new THREE.ConeGeometry(2.55, 7.2, 16, 1), cx, 41.9, czc);
  sfera('bronzo', cx, 45.7, czc, 0.24, 10);
  box('ferro', cx - 0.04, 45.9, czc - 0.04, cx + 0.04, 47.4, czc + 0.04, 1);
  box('ferro', cx - 0.04, 46.9, czc - 0.42, cx + 0.04, 47, czc + 0.42, 1);
  for (const [px, pz] of [[campanile.x0 + 0.25, campanile.z0 + 0.25], [campanile.x1 - 0.25, campanile.z0 + 0.25], [campanile.x0 + 0.25, campanile.z1 - 0.25], [campanile.x1 - 0.25, campanile.z1 - 0.25]]) {
    cil('cotto', px, 36.7, pz, 0.22, 0.6, 6);
    statico.aggiungi('cotto', new THREE.ConeGeometry(0.22, 0.6, 6), px, 37.6, pz);
  }
  const lancette = [];
  const quadranteMat = new THREE.MeshStandardMaterial({ map: T.texturaOrologio(), roughness: 0.6, emissive: 0xfff2d0, emissiveMap: T.texturaOrologio(), emissiveIntensity: 0.25 });
  for (const [x, z, verso] of [[cx, campanile.z1 + 0.07, { x: 0, z: 1 }], [cx, campanile.z0 - 0.07, { x: 0, z: -1 }], [campanile.x1 + 0.07, czc, { x: 1, z: 0 }], [campanile.x0 - 0.07, czc, { x: -1, z: 0 }]]) {
    const q = new THREE.Mesh(new THREE.CircleGeometry(1.25, 32), quadranteMat);
    q.position.set(x, OGGETTI.OROLOGIO, z);
    orientamento(q, verso);
    scena.add(q);
    const ore = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.7, 0.03).translate(0, 0.3, 0), mat.ferro);
    const minuti = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.0, 0.03).translate(0, 0.45, 0), mat.ferro);
    for (const l of [ore, minuti]) {
      l.position.set(x + verso.x * 0.03, OGGETTI.OROLOGIO, z + verso.z * 0.03);
      orientamento(l, verso);
      scena.add(l);
    }
    lancette.push({ ore, minuti });
  }
  const campane = [[34, 14.6, 0.62], [32.9, 16.4, 0.48], [35.2, 16.6, 0.42]].map(([x, z, r]) => {
    const perno = new THREE.Group();
    perno.position.set(x, PIANO_CELLA + 3.75, z);
    const profilo = [[0.02, 0], [0.32, 0.04], [0.42, 0.25], [0.5, 0.65], [0.72, 0.95], [0.78, 1.02], [0, 1.02]].map(([a, b]) => new THREE.Vector2(a * r / 0.78, -b * r * 1.3));
    const corpo = new THREE.Mesh(new THREE.LatheGeometry(profilo, 18), mat.bronzo);
    corpo.material.side = THREE.DoubleSide;
    const batacchio = new THREE.Mesh(new THREE.SphereGeometry(r * 0.16, 8, 6), mat.ferro);
    batacchio.position.y = -r * 1.15;
    perno.add(corpo, batacchio);
    scena.add(perno);
    return { perno, fase: caso() * 6 };
  });
  for (const z of [14.6, 16.5]) box('legnoScuro', campanile.x0 + 0.6, PIANO_CELLA + 3.75, z - 0.12, campanile.x1 - 0.6, PIANO_CELLA + 4, z + 0.12, 1);
  for (const [x, z] of [[31.72, 14.6], [36.28, 14.6], [31.72, 16.5], [36.28, 16.5]]) box('legnoScuro', x - 0.1, PIANO_CELLA, z - 0.1, x + 0.1, PIANO_CELLA + 3.75, z + 0.1, 1);
  const corda = ACQUISTI.find(a => a.id === 'campane');
  cil('legno', corda.posizione.x + 0.05, PIANO_CELLA + 0.6, corda.posizione.z, 0.025, 3.3, 5);
  statico.aggiungi('rosso', new THREE.CylinderGeometry(0.05, 0.05, 0.45, 8), corda.posizione.x + 0.05, PIANO_CELLA + 1.1, corda.posizione.z);
  const discesa = ACQUISTI.find(a => a.id === 'discesa');
  box('legnoScuro', discesa.posizione.x - 0.12, PIANO_CELLA + 0.002, discesa.posizione.z - 0.6, discesa.posizione.x + 0.12, PIANO_CELLA + 0.02, discesa.posizione.z + 0.6, 1);
  for (const dz of [-0.35, 0.35]) box('legno', discesa.posizione.x - 0.04, PIANO_CELLA, discesa.posizione.z + dz - 0.03, discesa.posizione.x + 0.02, PIANO_CELLA + 1.1, discesa.posizione.z + dz + 0.03, 1);
  const crogiolo = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.3, 0.5, 12), mat.ferro);
  crogiolo.position.set(35.6, PIANO_CELLA + 0.25, 14.2);
  scena.add(crogiolo);
  const bronzoFuso = new THREE.Mesh(new THREE.CircleGeometry(0.36, 14).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xff8a2a }));
  bronzoFuso.position.set(35.6, PIANO_CELLA + 0.49, 14.2);
  scena.add(bronzoFuso);

  const municipioFronte = muroConArchi(-12, 18, 0, 9.4, [[-6.3, -3.7, 0.02, 2.5]], 0.5, 1);
  const uvM = municipioFronte.attributes.uv;
  const posM = municipioFronte.attributes.position;
  for (let i = 0; i < uvM.count; i++) uvM.setXY(i, (posM.getX(i) + 12) / 2.7, posM.getY(i) / 9.4);
  statico.aggiungi('municipio', municipioFronte, 0, 0, -20.2);
  const androneFronte = new THREE.Shape([new THREE.Vector2(-17.5, 0), new THREE.Vector2(11.5, 0), new THREE.Vector2(11.5, 4.2), new THREE.Vector2(-17.5, 4.2)]);
  androneFronte.holes.push(sagomaArco(3.7, 6.3, 0.02, 2.5));
  statico.aggiungi('intonaco', scalaUV(new THREE.ShapeGeometry(androneFronte, 12), 1 / 3), 0, 0, -20.205, Math.PI);
  box('granito', -12.05, 0, -19.75, 18.05, 0.6, -19.6, 1);
  box('crema', -12.1, 4.2, -19.8, 18.1, 4.5, -19.55, 1);
  box('crema', -12.6, 9.4, -20.8, 18.6, 9.65, -19.1, 1);
  statico.aggiungi('tegole', tettoPadiglione(-12.6, -28.3, 18.6, -19.1, 9.6, 11.9), 0, 0, 0);
  statico.aggiungi('tegole', tettoPadiglione(0.5, -48.6, 16.5, -27.6, 9.6, 11.9), 0, 0, 0);
  statico.aggiungi('granito', new THREE.TorusGeometry(1.42, 0.14, 6, 18, Math.PI), -5, 2.5, -19.62);
  box('granito', -6.6, 0, -19.75, -6.3, 2.5, -19.55, 1);
  box('granito', -3.7, 0, -19.75, -3.4, 2.5, -19.55, 1);
  const anteMunicipio = [-1, 1].map(s => {
    const perno = new THREE.Group();
    perno.position.set(-5 + s * 1.3, 0, -20.05);
    const anta = new THREE.Mesh(scatolaUV(1.3, 2.5, 0.1, 1.3), mat.porta);
    anta.position.set(-s * 0.65, 1.25, 0);
    perno.add(anta);
    scena.add(perno);
    return { perno, s };
  });
  box('porta', -6.3, 2.5, -20.05, -3.7, 3.85, -19.95, 1);
  pannello(new THREE.MeshBasicMaterial({ map: T.texturaScrittaArco('MUNICIPIO', '#3a3a3a'), transparent: true }), 3.4, 1, -5, 3.95, -19.55, { x: 0, z: 1 });
  box('pietraBianca', -6.6, 4.45, -19.7, -3.4, 4.62, -18.75, 1);
  balaustra('pietraBianca', -6.5, -18.85, -3.5, -18.85, 4.62, 0.85, 0.26);
  balaustra('pietraBianca', -6.5, -19.6, -6.5, -18.85, 4.62, 0.85, 0.26);
  balaustra('pietraBianca', -3.5, -19.6, -3.5, -18.85, 4.62, 0.85, 0.26);
  box('porta', -5.6, 4.62, -19.72, -4.4, 7.1, -19.66, 1);
  box('pietraBianca', 14.2, 4.45, -19.7, 16.4, 4.6, -19.05, 1);
  balaustra('ferro', 14.25, -19.12, 16.35, -19.12, 4.6, 0.9, 0.18);
  const bandiere = [[T.texturaBandieraEuropa(), -5.6], [T.texturaBandieraItalia(), -5], [T.texturaGonfalone(), -4.4]].map(([tex, x], i) => {
    const asta = new THREE.Group();
    asta.position.set(x, 5.4, -18.95);
    asta.rotation.x = 0.75;
    const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.4, 6), mat.oro);
    palo.position.y = 1.2;
    const telo = new THREE.Mesh(new THREE.PlaneGeometry(i === 2 ? 0.7 : 1.05, i === 2 ? 1.05 : 0.7, 8, 1), new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.9 }));
    telo.position.set(0, 1.85, 0.02);
    telo.rotation.set(-0.75, 0, 0);
    telo.position.y = 1.75;
    asta.add(palo, telo);
    scena.add(asta);
    return telo;
  });
  quadro(T.texturaStemma(), -5, 6.1, -19.58, { x: 0, z: 1 }, 0.8, 1, 0.05);
  box('gialloDae', -8.1, 1.2, -19.75, -7.7, 1.75, -19.6, 1);
  box('verdeBacheca', -2.7, 0.9, -19.78, -1.5, 2.3, -19.6, 1);
  box('ferro', 2.8, 0, -19.75, 3.6, 1.5, -19.5, 1);
  for (const x of [-9.5, 0.5]) {
    box('ferro', x - 0.05, 3.3, -19.75, x + 0.05, 3.7, -19.3, 1);
    statico.aggiungi('ferro', new THREE.CylinderGeometry(0.12, 0.2, 0.32, 8), x, 3.4, -19.3);
  }
  cartello(['COMUNE DI CERANO'], -5, 3.55, -19.54, { x: 0, z: 1 }, 1.6, 0.22, { larghezza: 256, altezza: 36, sfondo: '#e8e4da', colore: '#333', font: 'bold 18px Georgia, serif' });

  for (const c of CASE) {
    const chiave = chiaveCasa(c.colore);
    const h = c.altezza;
    for (const [l, x, z, ry] of [[c.x1 - c.x0, (c.x0 + c.x1) / 2, c.z0, Math.PI], [c.x1 - c.x0, (c.x0 + c.x1) / 2, c.z1, 0], [c.z1 - c.z0, c.x0, (c.z0 + c.z1) / 2, -Math.PI / 2], [c.z1 - c.z0, c.x1, (c.z0 + c.z1) / 2, Math.PI / 2]]) {
      statico.aggiungi(chiave, facciaUV(l, h, 3, 0, 3.2), x, h / 2, z, ry);
    }
    statico.aggiungi('tegole', tettoPadiglione(c.x0 - 0.5, c.z0 - 0.5, c.x1 + 0.5, c.z1 + 0.5, h, h + Math.min(3, Math.min(c.x1 - c.x0, c.z1 - c.z0) * 0.3)), 0, 0, 0);
    box('crema', c.x0 - 0.5, h - 0.2, c.z0 - 0.5, c.x1 + 0.5, h + 0.02, c.z1 + 0.5, 1);
    box('granito', c.x0 - 0.04, 0, c.z0 - 0.04, c.x1 + 0.04, 0.85, c.z1 + 0.04, 1);
    box('granito', c.x0 - 0.07, 0.85, c.z0 - 0.07, c.x1 + 0.07, 0.92, c.z1 + 0.07, 1);
    if (c.portici) {
      for (let x = c.x0 + 1.8; x < c.x1 - 1.5; x += 3.4) {
        statico.aggiungi('nero', new THREE.ShapeGeometry(new THREE.Shape().moveTo(-1.3, 0).lineTo(1.3, 0).lineTo(1.3, 2.3).absarc(0, 2.3, 1.3, 0, Math.PI, false).lineTo(-1.3, 0), 10), x, 0, c.z1 + 0.02);
      }
    }
    if (c.bovindo) {
      for (const x of [c.x0 + 2.2, c.x1 - 2.2]) for (const y of [3.6, 6.8]) {
        box(chiave, x - 1.1, y, c.z0 - 0.7, x + 1.1, y + 2.6, c.z0, 1);
        statico.aggiungi('vetroScuro', new THREE.PlaneGeometry(1.6, 1.7), x, y + 1.35, c.z0 - 0.71, Math.PI);
      }
    }
    if (c.bar) {
      box('rosso', c.x1, 2.6, 19.5, c.x1 + 1.6, 2.75, 24.5, 1);
      cartello(['BAR'], c.x1 + 0.02, 3.25, 22, { x: 1, z: 0 }, 1.8, 0.5, { larghezza: 128, altezza: 36, sfondo: '#1a0e08', colore: '#ffcf6a', font: 'bold 26px Georgia, serif' });
    }
  }

  const { lanterne: lanterneMuro } = costruisciFacciate({ statico, mat, box, cil, sfera, cartello });

  const tunnel = muroConArchi(-30.6, -25, 0, 10, [[-30.35, -25.25, 0.02, 2.9]], 5.5, 3);
  statico.aggiungi('ocraScuro', tunnel, 34.6, 0, 0, Math.PI / 2);
  statico.aggiungi('tegole', tettoPadiglione(34.3, 24.8, 40.4, 30.8, 10, 11.6), 0, 0, 0);
  box('ocraScuro', 36.6, 11.1, 27.2, 38.1, 13.2, 28.4, 1);
  statico.aggiungi('tegole', tettoPadiglione(36.4, 27, 38.3, 28.6, 13.2, 13.9), 0, 0, 0);
  box('nero', 37.05, 11.6, 27.15, 37.65, 12.7, 28.45, 1);

  for (const s of RECINZIONI) {
    box('rete', s.x0, 0.12, s.z0, s.x1, ALTEZZA_RECINZIONE, s.z1, 1);
    const lungoX = s.x1 - s.x0 > s.z1 - s.z0;
    const l = Math.max(s.x1 - s.x0, s.z1 - s.z0);
    for (let t = 0; t <= l + 0.01; t += Math.max(0.5, l / Math.ceil(l / 1.8))) {
      const x = lungoX ? s.x0 + t : (s.x0 + s.x1) / 2;
      const z = lungoX ? (s.z0 + s.z1) / 2 : s.z0 + t;
      cil('zincato', x, 0, z, 0.025, ALTEZZA_RECINZIONE, 6);
      box('cemento', x - 0.2, 0, z - 0.2, x + 0.2, 0.14, z + 0.2, 1);
    }
  }

  const finestre = new Map();
  for (const f of FINESTRE) {
    if (f.tana) continue;
    const base = quota(f.interno.x, f.interno.z);
    const lungo = f.asse === 'z' ? f.scatola.x1 - f.scatola.x0 : f.scatola.z1 - f.scatola.z0;
    let basso;
    let alto;
    if (f.recinzione) {
      basso = 0.15;
      alto = ALTEZZA_RECINZIONE - 0.2;
      box('rete', f.scatola.x0, 0.12, f.scatola.z0, f.scatola.x1, ALTEZZA_RECINZIONE, f.scatola.z1, 1);
    } else {
      basso = base + DAVANZALE;
      alto = base + ARCHITRAVE;
      const muro = MURI.find(m => m.x0 <= f.scatola.x1 + 0.05 && m.x1 >= f.scatola.x0 - 0.05 && m.z0 <= f.scatola.z1 + 0.05 && m.z1 >= f.scatola.z0 - 0.05);
      const top = muro?.y1 ?? base + 4;
      const lato = zonaDi(f.interno.x, f.interno.z);
      const dentro = INTERNI[lato?.id] ?? 'intonaco';
      const fuori = ESTERNI[muro?.parte] ?? 'intonaco';
      for (const [y0, y1] of [[0, basso], [alto, top]]) {
        box(fuori, f.scatola.x0, y0, f.scatola.z0, f.scatola.x1, y1, f.scatola.z1, 3);
        const g = facciaUV(lungo, y1 - y0, 3, y0);
        const ry = f.asse === 'z' ? (f.fuori.z > 0 ? Math.PI : 0) : (f.fuori.x > 0 ? -Math.PI / 2 : Math.PI / 2);
        statico.aggiungi(dentro, g, f.centro.x - f.fuori.x * (f.spessore / 2 + 0.01), (y0 + y1) / 2, f.centro.z - f.fuori.z * (f.spessore / 2 + 0.01), ry);
      }
      if (base > 1) box('cemento', f.centro.x + f.fuori.x * 1.2 - (f.asse === 'z' ? 2.5 : 1.6), base - 0.04, f.centro.z + f.fuori.z * 1.2 - (f.asse === 'z' ? 1.6 : 2.5), f.centro.x + f.fuori.x * 1.2 + (f.asse === 'z' ? 2.5 : 1.6), base - 0.02, f.centro.z + f.fuori.z * 1.2 + (f.asse === 'z' ? 1.6 : 2.5), 3);
    }
    const assi = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const asse = new THREE.Mesh(scatolaUV(lungo + 0.35, 0.17, 0.05, 1), mat.legno);
      const y = basso + 0.15 + (i * (alto - basso - 0.3)) / (R.ASSE_PER_FINESTRA - 1);
      asse.position.set(f.centro.x + f.fuori.x * (f.spessore / 2 + 0.06), y, f.centro.z + f.fuori.z * (f.spessore / 2 + 0.06));
      asse.rotation.y = f.asse === 'z' ? 0 : Math.PI / 2;
      asse.rotation.z = (caso() - 0.5) * 0.5;
      scena.add(asse);
      assi.push(asse);
    }
    finestre.set(f.id, assi);
  }

  const porte = new Map();
  const transenna = (gruppo, x0, z0, x1, z1) => {
    const l = Math.hypot(x1 - x0, z1 - z0);
    const pezzi = Math.max(1, Math.round(l / 2));
    for (let i = 0; i < pezzi; i++) {
      const t0 = i / pezzi;
      const t1 = (i + 1) / pezzi;
      const ax = x0 + (x1 - x0) * t0;
      const az = z0 + (z1 - z0) * t0;
      const bx = x0 + (x1 - x0) * t1;
      const bz = z0 + (z1 - z0) * t1;
      const lp = Math.hypot(bx - ax, bz - az) - 0.08;
      const ang = Math.atan2(bz - az, bx - ax);
      const pannelloT = new THREE.Group();
      pannelloT.position.set((ax + bx) / 2, 0, (az + bz) / 2);
      pannelloT.rotation.y = -ang;
      for (const y of [0.25, 1.1]) {
        const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, lp, 6).rotateZ(Math.PI / 2), mat.zincato);
        tubo.position.y = y;
        pannelloT.add(tubo);
      }
      for (let k = 0; k <= 12; k++) {
        const s = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.85, 4), mat.zincato);
        s.position.set(-lp / 2 + (k * lp) / 12, 0.675, 0);
        pannelloT.add(s);
      }
      for (const dx of [-lp / 2 + 0.05, lp / 2 - 0.05]) {
        const piede = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.6), mat.zincato);
        piede.position.set(dx, 0.02, 0);
        pannelloT.add(piede);
      }
      gruppo.add(pannelloT);
    }
  };
  for (const p of PORTE) {
    const s = p.scatola;
    const base = quota(p.centro.x, p.centro.z);
    if (p.tipo === 'transenne') {
      const g = new THREE.Group();
      const lungoX = s.x1 - s.x0 > s.z1 - s.z0;
      transenna(g, lungoX ? s.x0 : p.centro.x, lungoX ? p.centro.z : s.z0, lungoX ? s.x1 : p.centro.x, lungoX ? p.centro.z : s.z1);
      scena.add(g);
      porte.set(p.id, { gruppo: g, apertura: 0, tipo: p.tipo });
      continue;
    }
    if (p.tipo === 'cancelli') {
      porte.set(p.id, { cancelli, apertura: 0, tipo: p.tipo });
      continue;
    }
    if (p.tipo === 'portone') {
      porte.set(p.id, { ante: anteMunicipio, apertura: 0, tipo: p.tipo });
      continue;
    }
    if (p.tipo === 'portaleChiesa') {
      const ante = [-1, 1].map(lato => {
        const perno = new THREE.Group();
        perno.position.set(0.55, PAVIMENTO_CHIESA, lato * 1.3);
        const anta = new THREE.Mesh(scatolaUV(0.12, 4.4, 1.3, 1.5), mat.porta);
        anta.position.set(0, 2.2, -lato * 0.65);
        const borchie = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 1.1), mat.bronzo);
        borchie.position.set(0, 2.2, -lato * 0.65);
        perno.add(anta, borchie);
        scena.add(perno);
        return { perno, s: lato };
      });
      box('porta', 0.49, PAVIMENTO_CHIESA + 4.4, -1.3, 0.61, 6, 1.3, 1);
      porte.set(p.id, { ante, apertura: 0, tipo: p.tipo, asse: 'x' });
      continue;
    }
    const muriVicini = MURI.filter(m => m.x0 <= s.x1 + 0.05 && m.x1 >= s.x0 - 0.05 && m.z0 <= s.z1 + 0.05 && m.z1 >= s.z0 - 0.05);
    const top = Math.max(...muriVicini.map(m => m.y1), base + 3);
    const lato = zonaDi(p.centro.x + (s.x1 - s.x0 < 1 ? 0.8 : 0), p.centro.z + (s.x1 - s.x0 < 1 ? 0 : 0.8));
    box(INTERNI[lato?.id] ?? 'ocra', s.x0, base + ALTEZZA_PORTA, s.z0, s.x1, top, s.z1, 3);
    const lungoX = s.x1 - s.x0 > s.z1 - s.z0;
    const perno = new THREE.Group();
    perno.position.set(lungoX ? s.x0 : p.centro.x, base, lungoX ? p.centro.z : s.z0);
    const larghezza = lungoX ? s.x1 - s.x0 : s.z1 - s.z0;
    const anta = new THREE.Mesh(lungoX ? scatolaUV(larghezza, ALTEZZA_PORTA, 0.08, ALTEZZA_PORTA) : scatolaUV(0.08, ALTEZZA_PORTA, larghezza, ALTEZZA_PORTA), mat.porta);
    anta.position.set(lungoX ? larghezza / 2 : 0, ALTEZZA_PORTA / 2, lungoX ? 0 : larghezza / 2);
    perno.add(anta);
    scena.add(perno);
    porte.set(p.id, { perno, apertura: 0, tipo: 'porta' });
  }

  const fontana = OGGETTI.FONTANA;
  box('pietraBianca', fontana.x - 1.35, 0, fontana.z - 1.35, fontana.x + 1.35, 0.25, fontana.z + 1.35, 1);
  box('pietraBianca', fontana.x - 0.85, 0.25, fontana.z - 0.85, fontana.x + 0.85, 1.25, fontana.z + 0.85, 1);
  for (const [dx, dz, rx] of [[0.95, 0, 0], [-0.95, 0, 0], [0, 0.95, 1], [0, -0.95, 1]]) {
    statico.aggiungi('pietraBianca', new THREE.SphereGeometry(0.28, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), fontana.x + dx, 0.75, fontana.z + dz, rx ? Math.PI / 2 : 0);
  }
  statico.aggiungi('pietraBianca', new THREE.CylinderGeometry(1.15, 0.75, 0.32, 20), fontana.x, 1.41, fontana.z);
  cil('pietraBianca', fontana.x, 1.57, fontana.z, 0.32, 1.2, 12, 0.36);
  quadro(texturaTesto(['BEATO PACIFICO'], { larghezza: 128, altezza: 24, sfondo: '#d8d2c6', colore: '#3a342c', font: 'bold 12px Georgia, serif' }), fontana.x + 0.37, 2.15, fontana.z, { x: 1, z: 0 }, 0.6, 0.12);
  statico.aggiungi('pietraBianca', new THREE.CylinderGeometry(0.58, 0.32, 0.25, 16), fontana.x, 2.9, fontana.z);
  statua('pietraBianca', fontana.x, 3.02, fontana.z, 0.92, Math.PI / 2);
  const acqua = new THREE.Mesh(new THREE.CircleGeometry(1.02, 24).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2a4a5a, roughness: 0.05, metalness: 0.6 }));
  acqua.position.set(fontana.x, 1.52, fontana.z);
  scena.add(acqua);

  const lampioni = OSTACOLI.filter(o => o.tipo === 'lampione').map(o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 }));
  const lanterne = [];
  for (const l of lampioni) {
    cil('ferro', l.x, 0, l.z, 0.12, 0.5, 8, 0.18);
    cil('ferro', l.x, 0.5, l.z, 0.06, 3.7, 8, 0.08);
    statico.aggiungi('ferro', new THREE.ConeGeometry(0.34, 0.3, 4), l.x, 4.85, l.z, Math.PI / 4);
    const vetro = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.18, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xffc070 }));
    vetro.position.set(l.x, 4.45, l.z);
    vetro.rotation.y = Math.PI / 4;
    scena.add(vetro);
    lanterne.push(vetro);
  }

  for (const o of OSTACOLI) {
    const ox = (o.x0 + o.x1) / 2;
    const oz = (o.z0 + o.z1) / 2;
    if (o.tipo === 'tavolino') {
      cil('ferro', ox, 0, oz, 0.03, 0.72, 6);
      cil('bianco', ox, 0.72, oz, 0.4, 0.04, 12);
      for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) box('ferro', ox + Math.cos(a) * 0.65 - 0.2, 0.42, oz + Math.sin(a) * 0.65 - 0.2, ox + Math.cos(a) * 0.65 + 0.2, 0.47, oz + Math.sin(a) * 0.65 + 0.2, 1);
      cil('legno', ox, 0.76, oz, 0.03, 1.7, 6);
      statico.aggiungi('ombrellone', new THREE.ConeGeometry(1.4, 0.5, 8, 1, true), ox, 2.65, oz);
    } else if (o.tipo === 'scrivania') {
      box('legno', o.x0, 0.72, o.z0, o.x1, 0.78, o.z1, 1);
      box('legnoScuro', o.x0, 0, o.z0, o.x1, 0.72, o.z0 + 0.05, 1);
      box('nero', ox - 0.25, 0.78, oz - 0.05, ox + 0.25, 1.15, oz + 0.02, 1);
      box('ferro', ox - 0.25, 0, o.z1 + 0.2, ox + 0.25, 0.48, o.z1 + 0.65, 1);
    } else if (o.tipo === 'presidenza' || o.tipo === 'bancoConsiglio') {
      box('legnoScuro', o.x0, o.base, o.z0, o.x1, o.base + o.altezza, o.z1, 1);
      box('velluto', o.x0 + 0.02, o.base + o.altezza, o.z0 + 0.02, o.x1 - 0.02, o.base + o.altezza + 0.02, o.z1 - 0.02, 1);
    } else if (o.tipo === 'bancone') {
      box('legnoScuro', o.x0, o.base, o.z0, o.x1, o.base + o.altezza, o.z1, 1);
      box('legno', o.x0 - 0.03, o.base + o.altezza, o.z0 - 0.03, o.x1 + 0.03, o.base + o.altezza + 0.05, o.z1 + 0.03, 1);
    }
  }

  cil('corteccia', -6, 0, -36, 0.25, 3.2, 8);
  sfera('chioma', -6, 4.6, -36, 2.6, 12);
  sfera('chioma', -4.8, 3.9, -35, 1.8, 10);
  for (const [x, z] of [[-12, 38], [-17, 40], [-8, 41]]) {
    cil('corteccia', x, 0, z, 0.22, 3, 8);
    sfera('chioma', x, 4.2, z, 2.2, 10);
  }
  box('cemento', 42.4, 4, -45, 60, 4.2, -20, 4);
  for (let x = 44; x < 60; x += 4) for (const z of [-21, -44]) cil('ferro', x, 0, z, 0.08, 4, 6);

  quadro(T.texturaStemma(), -1.92, 2.6, -25.9, { x: -1, z: 0 }, 1, 1.25, 0.05);
  for (const [testo, x, verso] of [['ANAGRAFE', -7.88, { x: 1, z: 0 }], ['PROTOCOLLO', -1.92, { x: -1, z: 0 }], ['UFFICIO TECNICO', -1.58, { x: 1, z: 0 }], ['SEGRETERIA', 8.98, { x: -1, z: 0 }]]) {
    cartello([testo], x, 2.85, -23.7, verso, 1.3, 0.24, { larghezza: 256, altezza: 44, sfondo: '#f4f2ec', colore: '#2a2a2a', font: 'bold 20px Arial, sans-serif', bordo: '#7a7a7a' });
  }
  box('ferro', -11.5, 0, -25.6, -11.1, 2, -23, 1);
  for (const xp of [-8.05, -1.75, 9.15]) box('intonaco', xp - 0.15, ALTEZZA_PORTA, -24.6, xp + 0.15, 4.2, -22.8, 2);
  box('ferro', 9.32, 0, -27.1, 9.75, 2, -25, 1);
  quadro(T.texturaStemma(), 15.48, PIANO_CONSIGLIO + 3.4, -41.75, { x: -1, z: 0 }, 1.6, 2, 0.05);
  for (const [tex, z] of [[T.texturaBandieraItalia(), -40], [T.texturaBandieraEuropa(), -43.5]]) {
    cil('oro', 15.1, PIANO_CONSIGLIO, z, 0.025, 2.6, 6);
    const telo = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.9, 1, 6), new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.9 }));
    telo.position.set(15.1, PIANO_CONSIGLIO + 2, z + 0.32);
    telo.rotation.y = Math.PI / 2;
    scena.add(telo);
  }
  quadro(T.texturaGonfalone(), 15.45, PIANO_CONSIGLIO + 1.8, -38.2, { x: -1, z: 0 }, 0.9, 1.35, 0.03);
  for (const z of [-44.6, -41.75, -38.9]) box('legno', 15.05, PIANO_CONSIGLIO, z - 0.3, 15.45, PIANO_CONSIGLIO + 1.05, z + 0.3, 1);
  for (let x = 6.4; x < 10; x += 0.8) for (const z of [-43, -38.2]) box('legnoScuro', x - 0.22, PIANO_CONSIGLIO, z - 0.05, x + 0.22, PIANO_CONSIGLIO + 0.95, z + 0.4, 1);
  cartello(['SALA DEL CONSIGLIO'], 7, PIANO_CONSIGLIO + 3.2, -35.96, { x: 0, z: 1 }, 2.2, 0.3, { larghezza: 256, altezza: 36, sfondo: '#f4f2ec', colore: '#2a2a2a', font: 'bold 18px Georgia, serif' });

  const quadroElettrico = ACQUISTI.find(a => a.tipo === 'interruttore');
  box('zincato', quadroElettrico.posizione.x - 0.02, PAVIMENTO_CHIESA + 1.1, quadroElettrico.posizione.z - 0.4, quadroElettrico.posizione.x + 0.16, PAVIMENTO_CHIESA + 2.1, quadroElettrico.posizione.z + 0.4, 1);
  const leva = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.05).translate(0, 0.18, 0), new THREE.MeshStandardMaterial({ color: 0xb8241b, roughness: 0.4 }));
  leva.position.set(quadroElettrico.posizione.x - 0.06, PAVIMENTO_CHIESA + 1.6, quadroElettrico.posizione.z);
  scena.add(leva);
  const spia = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), new THREE.MeshBasicMaterial({ color: 0xb8241b }));
  spia.position.set(quadroElettrico.posizione.x - 0.04, PAVIMENTO_CHIESA + 1.95, quadroElettrico.posizione.z + 0.25);
  scena.add(spia);
  cartello(['QUADRO GENERALE'], quadroElettrico.posizione.x - 0.03, PAVIMENTO_CHIESA + 2.3, quadroElettrico.posizione.z, { x: -1, z: 0 }, 0.9, 0.18, { larghezza: 192, altezza: 36, sfondo: '#e8c020', colore: '#1a1a1a', font: 'bold 18px Arial, sans-serif' });
  box('legnoScuro', 43.2, PAVIMENTO_CHIESA, -11.8, 44.2, PAVIMENTO_CHIESA + 2.4, -11.4, 1);

  const statuette = FRAMMENTI.map((f, i) => {
    const g = new THREE.Group();
    const terracotta = new THREE.MeshStandardMaterial({ color: 0xb8683e, roughness: 0.7, emissive: 0x6a2a10, emissiveIntensity: 0.6 });
    const corpo = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.22, 8), terracotta);
    corpo.position.y = 0.11;
    const testa = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), terracotta);
    testa.position.y = 0.26;
    const alone = new THREE.Sprite(new THREE.SpriteMaterial({ map: T.texturaAlone('rgba(255,190,120,0.85)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    alone.scale.setScalar(0.7);
    alone.position.y = 0.16;
    g.add(corpo, testa, alone);
    g.position.set(f.x, f.y - 0.05, f.z);
    g.userData.fase = i * 1.3;
    scena.add(g);
    return g;
  });

  cartello(['SALA CRESPI', '', 'ASPETTATE I VOSTRI AMICI', '', 'INVIO: SONO PRONTO'], CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z, CARTELLO_PRONTI.verso, 3.6, 2.2, { larghezza: 512, altezza: 320, sfondo: '#14100a', colore: '#f2e2c0', font: 'bold 30px Georgia, serif', bordo: '#c09a48' });
  for (let x = 125; x < 132; x += 1.1) for (const z of [-3, -1.8, 1.8, 3]) box('legnoScuro', x - 0.22, 0, z - 0.22, x + 0.22, 0.85, z + 0.22, 1);
  quadro(T.texturaStemma(), 120.05, 2.4, 0, { x: 1, z: 0 }, 1.1, 1.4, 0.05);

  const esterne = ZONE.filter(z => z.aperto && !z.sala && z.id !== 'cella');
  const areaEsterna = esterne.reduce((t, z) => t + (z.x1 - z.x0) * (z.z1 - z.z0), 0);
  const liberi = estrai => {
    let resto = estrai() * areaEsterna;
    const zona = esterne.find(z => (resto -= (z.x1 - z.x0) * (z.z1 - z.z0)) <= 0) ?? esterne[0];
    const x = zona.x0 + estrai() * (zona.x1 - zona.x0);
    const z = zona.z0 + estrai() * (zona.z1 - zona.z0);
    return OSTACOLI.some(o => x > o.x0 - 0.7 && x < o.x1 + 0.7 && z > o.z0 - 0.7 && z < o.z1 + 0.7) ? null : { x, z };
  };
  const atmosfera = creaAtmosfera(scena, { lampioni, lanterne: lanterneMuro, quota, liberi });

  const assedio = costruisciAssedio({ scena, statico, mat, box, cil, cartello });
  costruisciArredo({ statico, mat, box, cil, sfera });
  const voto = creaVoto(scena, { mat, statico, box, cil, quadrante: quadranteMat });
  statico.finisci(scena, { ...mat, ...Object.fromEntries(coloriCase) });
  const macchine = creaMacchine(scena, { materialiArmi, oggetti, metallo: mat.ferro, legno: mat.legnoScuro, serveCorrente: true });

  const lampadari = [[9.5, 8.4, 0], [15.5, 8.4, 0], [21.5, 8.4, 0], [27, 8.4, 0], [36, 12.5, 0], [48, 9, 0], [8.5, PIANO_CONSIGLIO + 3.6, -41.5], [-5, 3.4, -23.7], [6, 3.4, -23.7]];
  const lampadine = new THREE.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.1 });
  for (const [x, y, z] of lampadari) {
    const anello = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.035, 6, 20).rotateX(Math.PI / 2), mat.oro);
    anello.position.set(x, y, z);
    scena.add(anello);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), lampadine);
      b.position.set(x + Math.cos(a) * 0.55, y + 0.1, z + Math.sin(a) * 0.55);
      scena.add(b);
    }
    const catena = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 2.4, 4), mat.oro);
    catena.position.set(x, y + 1.2, z);
    scena.add(catena);
  }

  const fonti = [
    ...lampioni.map(l => ({ x: l.x, y: 4.3, z: l.z, colore: 0xffb466, prima: 22, dopo: 22, portata: 18 })),
    { x: -7, y: 1.2, z: -5, colore: 0xffd8a0, prima: 26, dopo: 26, portata: 20 },
    { x: -7, y: 1.2, z: 5, colore: 0xffd8a0, prima: 26, dopo: 26, portata: 20 },
    { x: -4.2, y: 3.4, z: -18.6, colore: 0xffe2b8, prima: 10, dopo: 10, portata: 10 },
    { x: 34, y: 23, z: 20.5, colore: 0xfff0d0, prima: 14, dopo: 14, portata: 16 },
    { x: -41, y: 3.2, z: 22, colore: 0xffc070, prima: 12, dopo: 12, portata: 12 },
    { x: 38, y: 4.2, z: 27.8, colore: 0xffb466, prima: 10, dopo: 10, portata: 12 },
    { x: 9.5, y: 8, z: 0, colore: 0xffd9a0, prima: 0, dopo: 26, portata: 18 },
    { x: 21.5, y: 8, z: 0, colore: 0xffd9a0, prima: 0, dopo: 26, portata: 18 },
    { x: 36, y: 11.5, z: 0, colore: 0xffd9a0, prima: 4, dopo: 30, portata: 20 },
    { x: 48, y: 8, z: 0, colore: 0xffd9a0, prima: 0, dopo: 22, portata: 16 },
    { x: 51.5, y: 2.2, z: 0, colore: 0xffb050, prima: 7, dopo: 7, portata: 8, fuoco: true },
    { x: 20.2, y: 2, z: 18.2, colore: 0xffb050, prima: 9, dopo: 9, portata: 10, fuoco: true },
    { x: 26, y: 6, z: 17.5, colore: 0xffd9a0, prima: 0, dopo: 14, portata: 14 },
    { x: 47, y: 4.2, z: -15, colore: 0xfff0d0, prima: 3, dopo: 14, portata: 12, tremola: true },
    { x: 47, y: 4.2, z: -8, colore: 0xfff0d0, prima: 0, dopo: 10, portata: 9 },
    { x: -5, y: 3.6, z: -23.7, colore: 0xf4f8ff, prima: 2, dopo: 16, portata: 12 },
    { x: 6, y: 3.6, z: -23.7, colore: 0xf4f8ff, prima: 2, dopo: 16, portata: 12 },
    { x: 14, y: 3.6, z: -23.7, colore: 0xf4f8ff, prima: 0, dopo: 12, portata: 10 },
    { x: 7, y: PIANO_CONSIGLIO + 3, z: -32, colore: 0xffe2b8, prima: 0, dopo: 10, portata: 10 },
    { x: 8.5, y: PIANO_CONSIGLIO + 3.4, z: -41.5, colore: 0xffd9a0, prima: 0, dopo: 22, portata: 16 },
    { x: 35.6, y: PIANO_CELLA + 1, z: 14.4, colore: 0xff8a2a, prima: 6, dopo: 14, portata: 9, fuoco: true },
    { x: 34, y: PIANO_CELLA + 2.6, z: 16.8, colore: 0xb8c8ff, prima: 6, dopo: 6, portata: 8 },
    { x: 127, y: 3.4, z: 0, colore: 0xffe2b0, prima: 16, dopo: 16, portata: 18 },
    voto.fonte,
  ];
  const luci = Array.from({ length: luciAccese }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.4);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  let attesaLuci = 0;
  const intensita = (f, vista) => (vista.corrente ? f.dopo : f.prima);
  function aggiornaLuci(vista, dt, tempo, punto) {
    attesaLuci -= dt;
    if (punto && attesaLuci <= 0) {
      attesaLuci = SCEGLI_LUCI_OGNI_S;
      const peso = f => Math.hypot(f.x - punto.x, (f.y - punto.y) * 1.5, f.z - punto.z);
      const vicine = fonti.filter(f => intensita(f, vista) > 0).sort((a, b) => peso(a) - peso(b)).slice(0, luciAccese);
      for (const l of luci) if (l.fonte && !vicine.includes(l.fonte)) l.fonte = null;
      for (const f of vicine) {
        if (luci.some(l => l.fonte === f)) continue;
        const l = luci.find(x => !x.fonte);
        if (!l) break;
        Object.assign(l, { fonte: f, accensione: 0 });
        l.luce.color.setHex(f.colore);
        l.luce.distance = f.portata;
        l.luce.position.set(f.x, f.y, f.z);
      }
    }
    for (const l of luci) {
      if (!l.fonte) {
        l.luce.intensity = 0;
        continue;
      }
      const f = l.fonte;
      if (f.mobile) l.luce.position.set(f.x, f.y, f.z);
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const tremolio = f.fuoco ? 0.8 + Math.sin(tempo * 9 + f.x) * 0.12 + Math.sin(tempo * 23 + f.z) * 0.08 : f.tremola && Math.sin(tempo * 13.7 + f.x) > 0.9 ? 0.15 : 1;
      l.luce.intensity = intensita(f, vista) * l.accensione * tremolio;
    }
  }

  let oscillazione = 0;
  let rintocchiVisti = null;
  let attesaOrologio = 0;
  const aggiornaOrologio = () => {
    const ora = new Date();
    const minuti = ora.getMinutes() + ora.getSeconds() / 60;
    const ore = (ora.getHours() % 12) + minuti / 60;
    for (const { ore: o, minuti: m } of lancette) {
      o.rotation.z = -(ore / 12) * Math.PI * 2;
      m.rotation.z = -(minuti / 60) * Math.PI * 2;
    }
  };
  aggiornaOrologio();

  return {
    svuota() {
      for (const porta of porte.values()) porta.apertura = 0;
      oscillazione = 0;
      rintocchiVisti = null;
    },
    campane() {
      oscillazione = 1;
    },
    aggiorna(vista, dt, tempo, punto) {
      macchine.aggiorna(vista, dt, tempo);
      voto.aggiorna(vista, dt, tempo);
      assedio.aggiorna(tempo);
      aggiornaLuci(vista, dt, tempo, punto);
      const corrente = vista.corrente;
      for (const f of FINESTRE) {
        const assi = finestre.get(f.id);
        if (assi) assi.forEach((asse, i) => { asse.visible = i < vista.finestre[f.id]; });
      }
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        if (!porta) continue;
        const aperta = vista.porte.has(p.id);
        porta.apertura = aperta ? Math.min(1, porta.apertura + dt * 1.2) : Math.max(0, porta.apertura - dt * 2.5);
        const a = porta.apertura;
        if (porta.tipo === 'transenne') {
          porta.gruppo.visible = a < 0.999;
          porta.gruppo.position.y = -a * 1.3;
        } else if (porta.tipo === 'cancelli') {
          porta.cancelli.forEach(c => {
            if (c.isGroup) c.rotation.y = -a * 1.7;
            else c.visible = a < 0.5;
          });
        } else if (porta.ante) {
          porta.ante.forEach(({ perno, s }) => { perno.rotation.y = porta.asse === 'x' ? s * a * 1.5 : -s * a * 1.5; });
        } else if (porta.perno) {
          porta.perno.rotation.y = a * 1.55;
        }
      }
      const p = vista.piazza;
      if (p) {
        if (rintocchiVisti !== null && p.rintocchi > rintocchiVisti) oscillazione = 1;
        rintocchiVisti = p.rintocchi;
      }
      oscillazione = Math.max(0, oscillazione - dt / 9);
      for (const c of campane) c.perno.rotation.z = Math.sin(tempo * 2.4 + c.fase) * 0.75 * oscillazione;
      attesaOrologio -= dt;
      if (attesaOrologio <= 0) {
        attesaOrologio = 1;
        aggiornaOrologio();
      }
      lampadine.emissiveIntensity = corrente ? 1.6 : 0.06;
      for (const v of vetrateInterne) v.material.emissiveIntensity = corrente ? 0.55 : 0.25;
      leva.rotation.z = THREE.MathUtils.lerp(leva.rotation.z, corrente ? -2.4 : 0, Math.min(1, dt * 5));
      spia.material.color.setHex(corrente ? 0x3cff6a : Math.sin(tempo * 3) > 0.6 ? 0xb8241b : 0x3a0a0a);
      bronzoFuso.material.color.setHex(corrente ? (Math.sin(tempo * 7) > 0 ? 0xffa040 : 0xff7a20) : 0x5a2a10);
      for (const l of lanterne) l.material.color.setHex(Math.sin(tempo * 5.1 + l.position.x) > 0.985 ? 0x6a4a20 : 0xffc070);
      const trovati = new Set(vista.frammenti ?? []);
      statuette.forEach((s, i) => {
        s.visible = vista.fase !== 'attesa' && !trovati.has(FRAMMENTI[i].id);
        s.rotation.y = tempo * 0.8 + s.userData.fase;
      });
      bandiere.forEach((b, i) => { b.rotation.y = Math.sin(tempo * 1.7 + i) * 0.18; });
      acqua.material.roughness = 0.05 + Math.sin(tempo * 3) * 0.02;
      for (const f of finestreTamburo) f.material.color.setHex(corrente ? 0xc8d4f0 : 0x6a7898);
      lucernario.material.color.setHex(corrente ? 0xd8e2ff : 0x8a9ac0);
      atmosfera.aggiorna(punto);
    },
    nebbia() {
      return null;
    },
  };
}
