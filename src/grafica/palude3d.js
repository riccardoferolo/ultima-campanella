import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ALTEZZA_SOFFITTO, ZONE, MURI, RECINZIONI, OSTACOLI, FINESTRE, PORTE, ACQUISTI, CARTELLO_PRONTI } from '../mappa.js';
import { INTERNE } from '../mappe/palude.js';
import { R } from '../regole.js';
import { texturaTesto } from './texture.js';
import { creaCaso } from './caso-grafica.js';
import { scatolaUV, orientamento } from './scuola3d.js';
import { creaMacchine } from './macchine3d.js';
import { creaTeschio } from './teschio3d.js';
import { istanzeACelle } from './celle.js';
import { creaMissione } from './palude/missione3d.js';
import { creaTana } from './palude/tana3d.js';
import { preparaRagni } from './palude/ragni3d.js';

const BLOCCO = 48;
const LATO_VEGETAZIONE = 64;
const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.4;
const LIVELLO_ACQUA = -0.35;
const ALTEZZA_PORTA = 2.4;
const ALTEZZA_PORTONE = 2.9;
const ALTEZZA_RADICI = 3.2;
const DAVANZALE = 0.9;
const ARCHITRAVE = 2.3;
const ALBERI_SFONDO = 170;
const NINFEE = 260;
const LUCCIOLE = 280;
const SCIE_ANIME = 12;
const DURATA_SCIA = 0.9;
const LUCI = Object.freeze([
  { x: 0, z: 57, y: 2.6, colore: 0xffb066, intensita: 14, portata: 18, tremola: true },
  { x: -50, z: 50, y: 2.4, colore: 0x7dffb0, intensita: 10, portata: 20 },
  { x: 0, z: 10, y: 2.6, colore: 0xffa95a, intensita: 10, portata: 18, tremola: true },
  { x: 49, z: 33, y: 3.2, colore: 0xffc27a, intensita: 12, portata: 18, tremola: true },
  { x: 0, z: -10, y: 3.3, colore: 0xffd29a, intensita: 6, portata: 24, segheria: true },
  { x: -46, z: -4, y: 3.3, colore: 0x6dffb0, intensita: 13, portata: 26 },
  { x: 38, z: -9, y: 3.2, colore: 0xff9a4a, intensita: 12, portata: 18 },
  { x: 0, z: -50, y: 4.5, colore: 0x9fd8c0, intensita: 12, portata: 26 },
  { x: -47, z: -50, y: 2.4, colore: 0xb07cff, intensita: 11, portata: 20 },
  { x: 49, z: -48, y: 3, colore: 0x8fc4ff, intensita: 9, portata: 22 },
  { x: -110, z: 0, y: 3.2, colore: 0xffe2b0, intensita: 14, portata: 16 },
  { x: -65, z: 49, y: 3.6, colore: 0xb07cff, intensita: 8, portata: 14 },
  { x: 0, z: -104, y: 5, colore: 0xbfd8c0, intensita: 26, portata: 30 },
  { x: 0, z: -122, y: 9, colore: 0xcfe8d0, intensita: 40, portata: 36 },
  { x: -19.5, z: -122, y: 1.2, colore: 0x6dff3a, intensita: 14, portata: 16, tremola: true },
  { x: 19.5, z: -122, y: 1.2, colore: 0x6dff3a, intensita: 14, portata: 16, tremola: true },
  { x: 0, z: -140, y: 5, colore: 0xd0302a, intensita: 18, portata: 26 },
]);
const CARTELLI = Object.freeze([
  { righe: ['BAYOU VERMILLION'], x: 0, y: 2.6, z: 48.25, verso: { x: 0, z: 1 }, l: 2.8 },
  { righe: ['SEGHERIA'], x: 0, y: 3.15, z: 2.25, verso: { x: 0, z: 1 }, l: 2 },
  { righe: ['DISTILLERIA'], x: 38, y: 3.15, z: 4.25, verso: { x: 0, z: 1 }, l: 2.2 },
  { righe: ['BARACCHE'], x: 49, y: 3.15, z: 40.25, verso: { x: 0, z: 1 }, l: 2 },
  { righe: ['LABORATORIO', 'ACCESSO RISERVATO'], x: -19.75, y: 2.85, z: -10, verso: { x: 1, z: 0 }, l: 2, a: 0.6 },
  { righe: ['TORRE RADIO'], x: 59, y: 2.1, z: 4.3, verso: { x: 0, z: 1 }, l: 2 },
  { righe: ['NON ENTRARE'], x: -46, y: 2.6, z: -21.75, verso: { x: 0, z: -1 }, l: 1.6 },
]);

function tela(l, a, pittore, ripeti = true) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a, creaCaso(l * 7 + a));
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

const texturaAcqua = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#1b2a1c';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 220; i++) {
    ctx.strokeStyle = `rgba(150,190,140,${0.04 + caso() * 0.1})`;
    ctx.lineWidth = 1 + caso() * 2;
    const x = caso() * l;
    const y = caso() * a;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 10, y + (caso() - 0.5) * 6, x + 18 + caso() * 22, y);
    ctx.stroke();
  }
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(${70 + caso() * 40},${100 + caso() * 50},${40 + caso() * 20},${0.25 + caso() * 0.4})`;
    ctx.fillRect(caso() * l, caso() * a, 1 + caso() * 2, 1 + caso() * 2);
  }
});

const texturaCorrente = () => tela(128, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = 'rgba(40,70,60,0.85)';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 120; i++) {
    ctx.strokeStyle = `rgba(210,235,215,${0.1 + caso() * 0.35})`;
    ctx.lineWidth = 1 + caso() * 3;
    const x = caso() * l;
    const y = caso() * a;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (caso() - 0.5) * 6, y + 12 + caso() * 30);
    ctx.stroke();
  }
});

const texturaCanne = () => tela(128, 256, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  for (let i = 0; i < 16; i++) {
    const x = 8 + caso() * (l - 16);
    const alto = a * (0.45 + caso() * 0.5);
    const piega = (caso() - 0.5) * 30;
    ctx.strokeStyle = `rgb(${60 + caso() * 30},${80 + caso() * 40},${35 + caso() * 15})`;
    ctx.lineWidth = 2 + caso() * 3;
    ctx.beginPath();
    ctx.moveTo(x, a);
    ctx.quadraticCurveTo(x + piega * 0.3, a - alto * 0.5, x + piega, a - alto);
    ctx.stroke();
    if (caso() < 0.3) {
      ctx.fillStyle = '#4a2e1a';
      ctx.beginPath();
      ctx.ellipse(x + piega * 0.9, a - alto + 18, 4, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}, false);

const texturaFelce = () => tela(128, 256, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  ctx.strokeStyle = '#3d4a22';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(l / 2, a);
  ctx.lineTo(l / 2, 4);
  ctx.stroke();
  for (let y = 12; y < a - 6; y += 8) {
    const f = 1 - y / a;
    const lungo = (l / 2 - 4) * Math.sin(Math.PI * Math.min(1, f * 1.1));
    for (const verso of [-1, 1]) {
      ctx.fillStyle = `rgb(${32 + caso() * 22},${70 + caso() * 45},${28 + caso() * 18})`;
      ctx.beginPath();
      ctx.moveTo(l / 2, y);
      ctx.quadraticCurveTo(l / 2 + verso * lungo * 0.6, y - 8, l / 2 + verso * lungo, y + 10);
      ctx.quadraticCurveTo(l / 2 + verso * lungo * 0.5, y + 5, l / 2, y + 5);
      ctx.fill();
    }
  }
}, false);

const texturaCespuglio = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  for (let i = 0; i < 420; i++) {
    const x = l / 2 + (caso() - 0.5) * l * 0.9 * Math.sqrt(caso());
    const y = a - caso() * a * 0.95;
    const verde = 50 + Math.floor(caso() * 60);
    ctx.fillStyle = `rgba(${18 + Math.floor(caso() * 25)},${verde},${18 + Math.floor(caso() * 20)},0.95)`;
    ctx.beginPath();
    ctx.ellipse(x, y, 5 + caso() * 9, 2 + caso() * 4, caso() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}, false);

const texturaErba = () => tela(128, 128, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  for (let i = 0; i < 40; i++) {
    const x = 4 + caso() * (l - 8);
    const alto = a * (0.35 + caso() * 0.6);
    ctx.strokeStyle = `rgb(${55 + caso() * 30},${85 + caso() * 40},${30 + caso() * 15})`;
    ctx.lineWidth = 1.5 + caso() * 2;
    ctx.beginPath();
    ctx.moveTo(x, a);
    ctx.quadraticCurveTo(x + (caso() - 0.5) * 10, a - alto * 0.6, x + (caso() - 0.5) * 22, a - alto);
    ctx.stroke();
  }
}, false);

const texturaMuschio = () => tela(64, 256, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  for (let i = 0; i < 40; i++) {
    const x = caso() * l;
    const lungo = a * (0.3 + caso() * 0.7);
    ctx.strokeStyle = `rgba(${150 + caso() * 40},${165 + caso() * 30},${130 + caso() * 30},${0.6 + caso() * 0.4})`;
    ctx.lineWidth = 1 + caso() * 2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    let px = x;
    for (let y = 0; y < lungo; y += 16) {
      px += (caso() - 0.5) * 6;
      ctx.lineTo(px, y);
    }
    ctx.stroke();
  }
}, false);

const texturaNebbia = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.clearRect(0, 0, l, a);
  for (let i = 0; i < 60; i++) {
    const x = caso() * l;
    const y = caso() * a;
    const r = 20 + caso() * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    for (const [dx, dy] of [[0, 0], [l, 0], [-l, 0], [0, a], [0, -a]]) {
      ctx.save();
      ctx.translate(dx, dy);
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();
    }
  }
});

const texturaNinfea = () => tela(64, 64, ctx => {
  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = '#3f6a2e';
  ctx.beginPath();
  ctx.moveTo(32, 32);
  ctx.arc(32, 32, 30, 0.35, Math.PI * 2 - 0.1);
  ctx.fill();
  ctx.strokeStyle = '#2b4a20';
  ctx.lineWidth = 2;
  for (let k = 0; k < 7; k++) {
    ctx.beginPath();
    ctx.moveTo(32, 32);
    ctx.lineTo(32 + Math.cos(0.5 + k * 0.85) * 28, 32 + Math.sin(0.5 + k * 0.85) * 28);
    ctx.stroke();
  }
}, false);

const texturaAlone = () => tela(64, 64, (ctx, l) => {
  const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.4)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, l);
}, false);

function creaStatico() {
  const gruppi = new Map();
  const centro = new THREE.Vector3();
  function prepara(g) {
    const n = g.index ? g.toNonIndexed() : g;
    if (n !== g) g.dispose();
    for (const nome of Object.keys(n.attributes)) if (nome !== 'position' && nome !== 'normal' && nome !== 'uv') n.deleteAttribute(nome);
    if (!n.attributes.normal) n.computeVertexNormals();
    if (!n.attributes.uv) n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
    return n;
  }
  return {
    aggiungi(materiale, geometria) {
      geometria.computeBoundingBox();
      geometria.boundingBox.getCenter(centro);
      const chiave = `${materiale.uuid}|${Math.floor(centro.x / BLOCCO)}|${Math.floor(centro.z / BLOCCO)}`;
      if (!gruppi.has(chiave)) gruppi.set(chiave, { materiale, geometrie: [] });
      gruppi.get(chiave).geometrie.push(prepara(geometria));
    },
    chiudi(scena) {
      for (const { materiale, geometrie } of gruppi.values()) {
        const mesh = new THREE.Mesh(mergeGeometries(geometrie), materiale);
        geometrie.forEach(g => g.dispose());
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scena.add(mesh);
      }
      gruppi.clear();
    },
  };
}

const matrice = (x, y, z, rot = 0, sx = 1, sy = sx, sz = sx, inclina = 0) => new THREE.Matrix4().compose(
  new THREE.Vector3(x, y, z),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(inclina, rot, inclina * 0.7)),
  new THREE.Vector3(sx, sy, sz),
);

const diradabili = (scena, geometria, materiale, matrici) => istanzeACelle(scena, geometria, materiale, matrici.map(m => ({ matrice: m })), { lato: LATO_VEGETAZIONE, diradabile: true });

function istanze(scena, geometria, materiale, matrici) {
  if (matrici.length === 0) return null;
  const mesh = new THREE.InstancedMesh(geometria, materiale, matrici.length);
  matrici.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.computeBoundingSphere();
  scena.add(mesh);
  return mesh;
}

function geometriaScafo(lungo, largo, alto) {
  const g = new THREE.BoxGeometry(lungo, alto, largo, 8, 2, 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = p.getX(i) / (lungo / 2);
    const y = p.getY(i);
    let z = p.getZ(i);
    if (t > 0.35) z *= 1 - ((t - 0.35) / 0.65) * 0.92;
    if (t < -0.8) z *= 0.85;
    if (y < 0) z *= 0.55;
    p.setZ(i, z);
    p.setY(i, y + t * t * 0.18);
  }
  g.computeVertexNormals();
  return g;
}

function geometriaTetto(lungo, largo, alto, sporgenza = 0.4) {
  const forma = new THREE.Shape([
    new THREE.Vector2(-largo / 2 - sporgenza, 0), new THREE.Vector2(largo / 2 + sporgenza, 0), new THREE.Vector2(0, alto),
  ]);
  const g = new THREE.ExtrudeGeometry(forma, { depth: lungo + sporgenza * 2, bevelEnabled: false });
  g.translate(0, 0, -(lungo + sporgenza * 2) / 2);
  return g;
}

function geometriaRoccia(caso) {
  const g = new THREE.IcosahedronGeometry(1, 1);
  const p = g.attributes.position;
  const scarti = new Map();
  for (let i = 0; i < p.count; i++) {
    const chiave = `${p.getX(i).toFixed(3)}|${p.getY(i).toFixed(3)}|${p.getZ(i).toFixed(3)}`;
    if (!scarti.has(chiave)) scarti.set(chiave, 0.75 + caso() * 0.45);
    const s = scarti.get(chiave);
    p.setXYZ(i, p.getX(i) * s, Math.max(-0.2, p.getY(i)) * s, p.getZ(i) * s);
  }
  g.computeVertexNormals();
  return g;
}

function geometrieCipresso() {
  const tronco = new THREE.CylinderGeometry(0.28, 0.75, 9, 10, 6, true).translate(0, 4.5, 0);
  const p = tronco.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y > 1.4) continue;
    const allarga = 1 + (1.4 - y) * 0.55;
    p.setX(i, p.getX(i) * allarga);
    p.setZ(i, p.getZ(i) * allarga);
  }
  tronco.computeVertexNormals();
  const chiome = [];
  for (const [x, y, z, s] of [[0, 8.6, 0, 1.9], [1.1, 7.6, 0.4, 1.5], [-1, 7.9, -0.6, 1.6], [0.3, 6.9, -1.1, 1.3], [-0.5, 9.4, 0.6, 1.2]]) {
    chiome.push(new THREE.IcosahedronGeometry(1, 1).scale(s * 1.35, s * 0.55, s * 1.35).translate(x, y, z));
  }
  const chioma = mergeGeometries(chiome);
  const fili = [];
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2;
    fili.push(new THREE.PlaneGeometry(0.9, 2.6).translate(0, -1.3, 0).rotateY(a).translate(Math.cos(a) * 1.6, 7.4 + (k % 3) * 0.5, Math.sin(a) * 1.6));
  }
  const barba = mergeGeometries(fili);
  return { tronco, chioma, barba };
}

function geometriaCanne(largo = 1.3, alto = 1.7) {
  const piani = [0, Math.PI / 3, (Math.PI * 2) / 3].map(r => new THREE.PlaneGeometry(largo, alto).translate(0, alto / 2, 0).rotateY(r));
  return mergeGeometries(piani);
}

function geometriaFelce() {
  const fronde = [];
  for (let k = 0; k < 7; k++) fronde.push(new THREE.PlaneGeometry(0.32, 0.9).translate(0, 0.45, 0).rotateX(-0.45 - (k % 3) * 0.15).rotateY((k / 7) * Math.PI * 2));
  return mergeGeometries(fronde);
}

export function costruisciPalude(scena, { reali, materialiArmi, oggetti, modelli, luciAccese = 3 }) {
  const H = ALTEZZA_SOFFITTO;
  const caso = creaCaso(4242);
  const statico = creaStatico();
  const pbr = (chiave, extra = {}) => new THREE.MeshStandardMaterial({ ...reali[chiave], metalness: 0, ...extra });
  const alone = texturaAlone();
  const mat = {
    fango: pbr('fango', { color: 0x8a8f78 }),
    assi: pbr('assiVecchie'),
    legno: pbr('legno'),
    corteccia: pbr('corteccia', { color: 0x8a8070 }),
    muschio: pbr('pietraMuschio'),
    roccia: pbr('roccia', { color: 0x8a9080 }),
    cemento: pbr('cemento', { color: 0x9aa39a }),
    paglia: pbr('paglia'),
    metallo: pbr('metallo', { metalness: 0.6, color: 0x8a8f8a }),
    lamiera: pbr('metallo', { metalness: 0.15, roughness: 0.9, color: 0x4a3a30, side: THREE.DoubleSide }),
    foglie: new THREE.MeshStandardMaterial({ color: 0x26331f, roughness: 1, flatShading: true }),
    barba: new THREE.MeshStandardMaterial({ map: texturaMuschio(), alphaTest: 0.35, side: THREE.DoubleSide, roughness: 1, color: 0xa3ad92 }),
    canne: new THREE.MeshStandardMaterial({ map: texturaCanne(), alphaTest: 0.4, side: THREE.DoubleSide, roughness: 1 }),
    ninfea: new THREE.MeshStandardMaterial({ map: texturaNinfea(), alphaTest: 0.5, roughness: 0.7 }),
    acqua: new THREE.MeshStandardMaterial({ map: texturaAcqua(), color: 0x5d7a5e, roughness: 0.12, metalness: 0.15 }),
    corrente: new THREE.MeshStandardMaterial({ map: texturaCorrente(), transparent: true, opacity: 0.9, roughness: 0.1, metalness: 0.1, depthWrite: false }),
    rame: new THREE.MeshStandardMaterial({ color: 0xb06a3a, metalness: 0.85, roughness: 0.35 }),
    osso: new THREE.MeshStandardMaterial({ color: 0xd8cbb0, roughness: 0.6 }),
    nero: new THREE.MeshBasicMaterial({ color: 0x050505 }),
    telo: new THREE.MeshStandardMaterial({ color: 0x5b5640, roughness: 0.95 }),
    candela: new THREE.MeshStandardMaterial({ color: 0x1a1410, emissive: 0xffa040, emissiveIntensity: 1.2 }),
    liquido: new THREE.MeshStandardMaterial({ color: 0x0f3a24, emissive: 0x3dff8a, emissiveIntensity: 0.9, transparent: true, opacity: 0.8 }),
    vetro: new THREE.MeshStandardMaterial({ color: 0x9fd8c0, transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.2, depthWrite: false }),
    radici: new THREE.MeshStandardMaterial({ map: reali.corteccia.map, normalMap: reali.corteccia.normalMap, color: 0x3a2a30, emissive: 0x5a1a7a, emissiveIntensity: 0.35, roughness: 0.9 }),
    lanterna: new THREE.MeshStandardMaterial({ color: 0x2a2018, emissive: 0xffa040, emissiveIntensity: 0.8, roughness: 0.6 }),
  };
  mat.acqua.map.repeat.set(48, 40);
  const pozza = mat.acqua.clone();
  pozza.map = mat.acqua.map;
  pozza.polygonOffset = true;
  pozza.polygonOffsetFactor = -2;

  const cubo = (m, x0, y0, z0, x1, y1, z1, metri = 2) => statico.aggiungi(m, scatolaUV(x1 - x0, y1 - y0, z1 - z0, metri, y0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));
  const pezzo = (m, g, x, y, z, rot = 0, sx = 1, sy = sx, sz = sx, inclina = 0) => statico.aggiungi(m, g.applyMatrix4(matrice(x, y, z, rot, sx, sy, sz, inclina)));
  const pianoUV = (m, x0, z0, x1, z1, y, metri, sotto = false) => {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(sotto ? Math.PI / 2 : -Math.PI / 2);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * (x1 - x0)) / metri, (uv.getY(i) * (z1 - z0)) / metri);
    statico.aggiungi(m, g.translate((x0 + x1) / 2, y, (z0 + z1) / 2));
  };
  const inZona = (x, z, margine = 0) => ZONE.some(q => x >= q.x0 - margine && x <= q.x1 + margine && z >= q.z0 - margine && z <= q.z1 + margine);
  const zonaDi = (x, z) => ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1) ?? null;
  const materialeEdificio = id => (id === 'laboratorio' || id === 'scala' ? mat.cemento : mat.assi);

  const acqua = new THREE.Mesh(new THREE.PlaneGeometry(260, 230).rotateX(-Math.PI / 2), mat.acqua);
  acqua.position.set(-15, LIVELLO_ACQUA, -5);
  scena.add(acqua);

  const pali = [];
  const paletti = [];
  for (const zona of ZONE) {
    if (zona.grotta) continue;
    const interna = INTERNE.has(zona.id);
    if (interna) {
      const pavimento = zona.pavimento === 'cemento' ? mat.cemento : zona.sala ? mat.assi : mat.legno;
      cubo(pavimento, zona.x0, -0.14, zona.z0, zona.x1, 0, zona.z1, 2);
      pianoUV(materialeEdificio(zona.id), zona.x0, zona.z0, zona.x1, zona.z1, H, 2, true);
      const lungoX = zona.x1 - zona.x0 >= zona.z1 - zona.z0;
      const lungo = lungoX ? zona.x1 - zona.x0 : zona.z1 - zona.z0;
      const largo = lungoX ? zona.z1 - zona.z0 : zona.x1 - zona.x0;
      if (zona.pavimento === 'cemento') cubo(mat.muschio, zona.x0 - 0.3, H, zona.z0 - 0.3, zona.x1 + 0.3, H + 0.45, zona.z1 + 0.3, 3);
      else pezzo(mat.lamiera, geometriaTetto(lungo, largo, Math.min(3.2, largo * 0.22)), (zona.x0 + zona.x1) / 2, H, (zona.z0 + zona.z1) / 2, lungoX ? Math.PI / 2 : 0);
      continue;
    }
    if (zona.pavimento === 'assiVecchie') {
      cubo(mat.assi, zona.x0, -0.16, zona.z0, zona.x1, 0.02, zona.z1, 1.6);
      const lungoX = zona.x1 - zona.x0 >= zona.z1 - zona.z0;
      const lungo = lungoX ? zona.x1 - zona.x0 : zona.z1 - zona.z0;
      for (let t = 0.6; t < lungo; t += 2.4) {
        for (const lato of [0.25, (lungoX ? zona.z1 - zona.z0 : zona.x1 - zona.x0) - 0.25]) {
          const x = lungoX ? zona.x0 + t : zona.x0 + lato;
          const z = lungoX ? zona.z0 + lato : zona.z0 + t;
          pali.push(matrice(x, -0.9, z, caso() * 3, 1, 1, 1, (caso() - 0.5) * 0.08));
        }
      }
      continue;
    }
    pianoUV(mat.fango, zona.x0, zona.z0, zona.x1, zona.z1, 0, 4);
  }

  const canne = [];
  for (const s of RECINZIONI) {
    const orizz = s.x1 - s.x0 >= s.z1 - s.z0;
    const lungo = orizz ? s.x1 - s.x0 : s.z1 - s.z0;
    const cx = (s.x0 + s.x1) / 2;
    const cz = (s.z0 + s.z1) / 2;
    if (s.tipo === 'riva') {
      cubo(mat.fango, s.x0, -0.7, s.z0, s.x1, 0.03, s.z1, 3);
      const fuoriX = orizz ? 0 : (inZona(cx + 0.8, cz) ? -1 : 1);
      const fuoriZ = orizz ? (inZona(cx, cz + 0.8) ? -1 : 1) : 0;
      for (let t = caso() * 0.6; t < lungo; t += 0.7 + caso() * 0.5) {
        const x = orizz ? s.x0 + t : cx + fuoriX * (0.3 + caso() * 0.9);
        const z = orizz ? cz + fuoriZ * (0.3 + caso() * 0.9) : s.z0 + t;
        canne.push(matrice(x, LIVELLO_ACQUA, z, caso() * Math.PI, 0.8 + caso() * 0.6, 0.8 + caso() * 0.7, 0.8 + caso() * 0.6));
      }
      continue;
    }
    const alto = s.altezza ?? 1;
    for (let t = 0; t <= lungo + 0.01; t += 2) paletti.push(matrice(orizz ? s.x0 + Math.min(t, lungo) : cx, alto / 2, orizz ? cz : s.z0 + Math.min(t, lungo), 0, 1, alto, 1));
    const spessore = 0.08;
    const traverse = s.tipo === 'staccionata' ? [0.35, 0.75, 1.15] : [0.5, alto - 0.06];
    for (const y of traverse) {
      if (orizz) cubo(mat.legno, s.x0, y - 0.05, cz - spessore / 2, s.x1, y + 0.05, cz + spessore / 2, 2);
      else cubo(mat.legno, cx - spessore / 2, y - 0.05, s.z0, cx + spessore / 2, y + 0.05, s.z1, 2);
    }
  }

  const tipoMuro = s => (s.tipo === 'cemento' ? mat.cemento : mat.assi);
  for (const s of MURI) {
    if (s.tipo === 'grotta') continue;
    const alto = s.tipo === 'capanna' ? 2.6 : H;
    cubo(tipoMuro(s), s.x0, 0, s.z0, s.x1, alto, s.z1, 2);
    if (s.tipo === 'cemento') continue;
    const orizz = s.x1 - s.x0 >= s.z1 - s.z0;
    for (const [x, z] of orizz ? [[s.x0, (s.z0 + s.z1) / 2], [s.x1, (s.z0 + s.z1) / 2]] : [[(s.x0 + s.x1) / 2, s.z0], [(s.x0 + s.x1) / 2, s.z1]]) {
      cubo(mat.legno, x - 0.22, 0, z - 0.22, x + 0.22, alto + 0.05, z + 0.22, 2);
    }
  }
  pezzo(mat.paglia, geometriaTetto(10, 8, 2.2, 0.6), -47, 2.6, -50, Math.PI / 2);

  const assiFinestre = [];
  const finestre = new Map();
  for (const f of FINESTRE) {
    if (!f.scatola) continue;
    const s = f.scatola;
    const m = materialeEdificio(f.zona);
    cubo(m, s.x0, 0, s.z0, s.x1, DAVANZALE, s.z1, 2);
    cubo(m, s.x0, ARCHITRAVE, s.z0, s.x1, H, s.z1, 2);
    const lungo = f.asse === 'z' ? s.x1 - s.x0 : s.z1 - s.z0;
    const indici = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const y = DAVANZALE + 0.15 + (i * (ARCHITRAVE - DAVANZALE - 0.3)) / (R.ASSE_PER_FINESTRA - 1);
      const asse = new THREE.Matrix4().compose(
        new THREE.Vector3(f.centro.x + f.fuori.x * 0.25, y, f.centro.z + f.fuori.z * 0.25),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, f.asse === 'z' ? 0 : Math.PI / 2, (caso() - 0.5) * 0.5)),
        new THREE.Vector3(lungo + 0.35, 1, 1),
      );
      indici.push(assiFinestre.length);
      assiFinestre.push(asse);
    }
    finestre.set(f.id, { indici, mostrate: R.ASSE_PER_FINESTRA });
  }
  const assiMesh = istanze(scena, new THREE.BoxGeometry(1, 0.17, 0.05), mat.assi, assiFinestre);
  const nascosta = new THREE.Matrix4().makeScale(0, 0, 0);

  const pozze = FINESTRE.filter(f => f.tana).map(f => matrice(f.interno.x, 0.025, f.interno.z, caso() * 6, 0.8 + caso() * 0.3));
  istanze(scena, new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2), pozza, pozze);

  const porte = new Map();
  for (const p of PORTE) {
    const s = p.scatola;
    const orizz = s.x1 - s.x0 >= s.z1 - s.z0;
    const lungo = orizz ? s.x1 - s.x0 : s.z1 - s.z0;
    const zonaMuro = p.zone.find(z => INTERNE.has(z));
    const alto = p.tipo === 'portone' ? ALTEZZA_PORTONE : p.tipo === 'radici' ? ALTEZZA_RADICI : ALTEZZA_PORTA;
    if (zonaMuro) cubo(materialeEdificio(zonaMuro), s.x0, alto, s.z0, s.x1, H, s.z1, 2);
    const gruppo = new THREE.Group();
    gruppo.position.set(p.centro.x, 0, p.centro.z);
    gruppo.rotation.y = orizz ? 0 : Math.PI / 2;
    if (p.tipo === 'cancello') {
      const anta = new THREE.Group();
      anta.position.x = -lungo / 2;
      for (let x = 0.2; x < lungo; x += 0.36) {
        const asse = new THREE.Mesh(scatolaUV(0.3, 1.5, 0.06, 1.5), mat.assi);
        asse.position.set(x, 0.85, 0);
        anta.add(asse);
      }
      for (const y of [0.4, 1.3]) {
        const trave = new THREE.Mesh(scatolaUV(lungo - 0.1, 0.12, 0.08, 1.5), mat.legno);
        trave.position.set(lungo / 2, y, 0.06);
        anta.add(trave);
      }
      const diagonale = new THREE.Mesh(scatolaUV(Math.hypot(lungo, 0.9), 0.1, 0.06, 1.5), mat.legno);
      diagonale.position.set(lungo / 2, 0.85, 0.08);
      diagonale.rotation.z = Math.atan2(0.9, lungo);
      anta.add(diagonale);
      gruppo.add(anta);
      for (const x of [-lungo / 2, lungo / 2]) cubo(mat.legno, p.centro.x + (orizz ? x : 0) - 0.12, 0, p.centro.z + (orizz ? 0 : x) - 0.12, p.centro.x + (orizz ? x : 0) + 0.12, 1.9, p.centro.z + (orizz ? 0 : x) + 0.12, 2);
      porte.set(p.id, { tipo: p.tipo, gruppo, anta, apertura: 0 });
    } else if (p.tipo === 'radici') {
      for (let i = 0; i < 11; i++) {
        const radice = new THREE.Mesh(new THREE.CylinderGeometry(0.06 + caso() * 0.06, 0.16 + caso() * 0.1, 3.4, 7), mat.radici);
        radice.position.set((caso() - 0.5) * lungo, 1.5, (caso() - 0.5) * 0.4);
        radice.rotation.set((caso() - 0.5) * 0.5, caso() * 3, (caso() - 0.5) * 1.4);
        gruppo.add(radice);
      }
      porte.set(p.id, { tipo: p.tipo, gruppo, apertura: 0 });
    } else if (p.tipo === 'grata') {
      for (let x = -lungo / 2 + 0.1; x <= lungo / 2 - 0.05; x += 0.22) {
        const sbarra = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, alto, 6), mat.metallo);
        sbarra.position.set(x, alto / 2, 0);
        gruppo.add(sbarra);
      }
      for (const y of [0.3, alto / 2, alto - 0.15]) {
        const trave = new THREE.Mesh(new THREE.BoxGeometry(lungo, 0.08, 0.08), mat.metallo);
        trave.position.y = y;
        gruppo.add(trave);
      }
      porte.set(p.id, { tipo: p.tipo, gruppo, apertura: 0, alto });
    } else {
      const anta = new THREE.Mesh(scatolaUV(lungo + 0.06, alto, 0.12, alto), p.tipo === 'portone' ? mat.legno : mat.assi);
      anta.position.y = alto / 2;
      gruppo.add(anta);
      if (p.tipo === 'portone') {
        for (const r of [1, -1]) {
          const croce = new THREE.Mesh(scatolaUV(Math.hypot(lungo, alto) - 0.3, 0.14, 0.05, 2), mat.assi);
          croce.position.set(0, alto / 2, 0.08);
          croce.rotation.z = r * Math.atan2(alto, lungo);
          gruppo.add(croce);
        }
      }
      porte.set(p.id, { tipo: p.tipo, gruppo, apertura: 0, alto });
    }
    scena.add(gruppo);
  }

  const posa = (nome, sorgente, x, z, rot = 0, scala = 1, y = 0) => {
    const m = sorgente.get(nome)?.clone();
    if (!m) return null;
    m.position.set(x, y, z);
    m.rotation.y = rot;
    m.scale.setScalar(scala);
    scena.add(m);
    return m;
  };

  const { tronco, chioma, barba } = geometrieCipresso();
  const alberi = [];
  const rocce = [];
  const pietra = geometriaRoccia(caso);
  const lapidi = [];
  let motore = null;
  const vasche = [];
  let faro = null;
  let altare = null;
  for (const o of OSTACOLI) {
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const l = o.x1 - o.x0;
    const p = o.z1 - o.z0;
    const lungoX = l >= p;
    switch (o.tipo) {
      case 'cipresso':
        alberi.push(matrice(cx, 0, cz, caso() * 6, 0.9 + caso() * 0.35));
        break;
      case 'casse':
        posa('wooden_military_crate', modelli, cx, cz, 0.3, 1.1);
        posa('wooden_military_crate', modelli, cx + 0.2, cz + 0.1, 1.2, 1, 0.48);
        break;
      case 'bitta':
        pezzo(mat.metallo, new THREE.CylinderGeometry(0.16, 0.2, 0.6, 10), cx, 0.3, cz);
        break;
      case 'relitto':
        pezzo(mat.assi, geometriaScafo(Math.max(l, p), Math.min(l, p) * 0.9, o.altezza * 0.8), cx, o.altezza * 0.25, cz, lungoX ? caso() * 0.2 : Math.PI / 2 + caso() * 0.2, 1, 1, 1, 0.35);
        break;
      case 'mausoleo':
        cubo(mat.muschio, o.x0, 0, o.z0, o.x1, 2.7, o.z1, 2);
        pezzo(mat.muschio, geometriaTetto(p, l, 1, 0.2), cx, 2.7, cz, 0);
        pezzo(mat.nero, new THREE.PlaneGeometry(1.2, 2), cx, 1, o.z1 + 0.01, 0);
        cubo(mat.muschio, cx - 0.08, 3.7, cz - 0.08, cx + 0.08, 4.6, cz + 0.08, 1);
        cubo(mat.muschio, cx - 0.35, 4.2, cz - 0.08, cx + 0.35, 4.36, cz + 0.08, 1);
        break;
      case 'lapide':
        lapidi.push(matrice(cx, 0.4, cz, (caso() - 0.5) * 0.4, 1, 1, 1, (caso() - 0.5) * 0.25));
        break;
      case 'legnaia':
        for (let fila = 0; fila < 3; fila++) {
          for (let k = 0; k < 6 - fila; k++) pezzo(mat.corteccia, new THREE.CylinderGeometry(0.2, 0.2, l, 8).rotateZ(Math.PI / 2), cx, 0.2 + fila * 0.36, o.z0 + 0.2 + k * 0.38 * (p / 1.2) * 0.5 + fila * 0.18);
        }
        break;
      case 'pozzo':
        pezzo(mat.muschio, new THREE.CylinderGeometry(0.8, 0.85, 0.9, 16, 1, true), cx, 0.45, cz);
        pezzo(mat.muschio, new THREE.TorusGeometry(0.82, 0.1, 6, 16).rotateX(Math.PI / 2), cx, 0.9, cz);
        pezzo(pozza, new THREE.CircleGeometry(0.75, 16).rotateX(-Math.PI / 2), cx, 0.5, cz);
        for (const dx of [-0.85, 0.85]) cubo(mat.legno, cx + dx - 0.07, 0, cz - 0.07, cx + dx + 0.07, 2, cz + 0.07, 2);
        cubo(mat.legno, cx - 0.95, 1.9, cz - 0.06, cx + 0.95, 2.02, cz + 0.06, 2);
        break;
      case 'tavolo':
      case 'bancone': {
        const m = o.tipo === 'bancone' ? mat.metallo : mat.legno;
        cubo(m, o.x0, o.altezza - 0.07, o.z0, o.x1, o.altezza, o.z1, 1);
        for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
          const x = cx + dx * (l / 2 - 0.08);
          const z = cz + dz * (p / 2 - 0.08);
          cubo(m, x - 0.04, 0, z - 0.04, x + 0.04, o.altezza - 0.07, z + 0.04, 1);
        }
        break;
      }
      case 'branda':
        cubo(mat.legno, o.x0, 0.3, o.z0, o.x1, 0.4, o.z1, 1);
        cubo(mat.telo, o.x0 + 0.05, 0.4, o.z0 + 0.05, o.x1 - 0.05, 0.55, o.z1 - 0.05, 1);
        break;
      case 'stufa':
        pezzo(mat.metallo, new THREE.CylinderGeometry(0.34, 0.4, 1.1, 12), cx, 0.55, cz);
        pezzo(mat.metallo, new THREE.CylinderGeometry(0.07, 0.07, H - 1.1, 8), cx, 1.1 + (H - 1.1) / 2, cz);
        break;
      case 'tronchi':
        for (let fila = 0; fila < 3; fila++) {
          for (let k = 0; k < 3 - fila; k++) pezzo(mat.corteccia, new THREE.CylinderGeometry(0.28, 0.3, l, 10).rotateZ(Math.PI / 2), cx + (caso() - 0.5) * 0.3, 0.3 + fila * 0.5, o.z0 + 0.3 + k * 0.52 + fila * 0.26);
        }
        break;
      case 'carro':
        cubo(mat.legno, o.x0, 0.6, o.z0, o.x1, 0.9, o.z1, 1.5);
        for (const dz of [-1, 1]) pezzo(mat.legno, new THREE.CylinderGeometry(0.55, 0.55, 0.1, 14).rotateX(Math.PI / 2), cx, 0.55, cz + dz * (p / 2 + 0.05));
        cubo(mat.legno, o.x1, 0.5, cz - 0.05, o.x1 + 1.6, 0.6, cz + 0.05, 1);
        break;
      case 'sega':
        cubo(mat.legno, o.x0, 0, o.z0, o.x1, 0.85, o.z1, 1.5);
        pezzo(mat.metallo, new THREE.CylinderGeometry(0.62, 0.62, 0.03, 28).rotateX(Math.PI / 2), cx, 0.9, cz);
        break;
      case 'cataste':
        for (let k = 0; k < 6; k++) cubo(mat.legno, o.x0 + (k % 2) * 0.1, k * 0.2, o.z0, o.x1 - ((k + 1) % 2) * 0.1, k * 0.2 + 0.18, o.z1, 2);
        break;
      case 'motore': {
        const g = new THREE.Group();
        const corpo = new THREE.Mesh(new THREE.BoxGeometry(l * 0.8, 1, p * 0.9), new THREE.MeshStandardMaterial({ color: 0x3f4a33, metalness: 0.55, roughness: 0.55 }));
        corpo.position.set(-l * 0.1, 0.55, 0);
        const volano = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.14, 20).rotateZ(Math.PI / 2), mat.metallo);
        volano.position.set(l * 0.38, 0.75, 0);
        const scarico = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), mat.metallo);
        scarico.position.set(-l * 0.3, 1.6, -p * 0.25);
        const spia = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xb8241b, emissiveIntensity: 1.8 }));
        spia.position.set(-l * 0.2, 1.08, p * 0.46);
        const targa = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), new THREE.MeshBasicMaterial({ map: texturaTesto(['MOTORE 1938'], { larghezza: 128, altezza: 32, sfondo: '#1d2418', colore: '#d8d2b0', font: 'bold 15px monospace' }) }));
        targa.position.set(-l * 0.1, 0.7, p * 0.451);
        g.add(corpo, volano, scarico, spia, targa);
        g.position.set(cx, 0, cz);
        scena.add(g);
        motore = { gruppo: g, volano, spia };
        break;
      }
      case 'braciere':
        pezzo(mat.metallo, new THREE.CylinderGeometry(0.42, 0.26, 0.32, 12, 1, true), cx, 0.86, cz);
        pezzo(mat.metallo, new THREE.TorusGeometry(0.42, 0.03, 6, 16).rotateX(Math.PI / 2), cx, 1.02, cz);
        pezzo(mat.nero, new THREE.CircleGeometry(0.38, 12).rotateX(-Math.PI / 2), cx, 0.96, cz);
        for (let k = 0; k < 3; k++) {
          const a = (k / 3) * Math.PI * 2;
          pezzo(mat.metallo, new THREE.CylinderGeometry(0.025, 0.03, 0.8, 5), cx + Math.cos(a) * 0.25, 0.4, cz + Math.sin(a) * 0.25, 0, 1, 1, 1, 0.2);
        }
        break;
      case 'ghiacciaia':
        cubo(mat.metallo, o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 1);
        cubo(mat.metallo, o.x0 - 0.03, o.altezza, o.z0 - 0.03, o.x1 + 0.03, o.altezza + 0.06, o.z1 + 0.03, 1);
        break;
      case 'santuario':
        cubo(mat.muschio, o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 1);
        cubo(mat.muschio, o.x0 - 0.12, o.altezza - 0.1, o.z0 - 0.12, o.x1 + 0.12, o.altezza, o.z1 + 0.12, 1);
        break;
      case 'pilastro':
        cubo(mat.legno, o.x0, 0, o.z0, o.x1, H, o.z1, 2);
        break;
      case 'altare':
        cubo(mat.muschio, o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 1);
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          const x = cx + Math.cos(a) * (l / 2 + 0.25);
          const z = cz + Math.sin(a) * (p / 2 + 0.25);
          pezzo(mat.nero, new THREE.CylinderGeometry(0.04, 0.05, 0.4 + caso() * 0.3, 8), x, 0.25, z);
          pezzo(mat.candela, new THREE.SphereGeometry(0.035, 6, 4), x, 0.5 + caso() * 0.12, z);
        }
        {
          const { gruppo } = creaTeschio({});
          gruppo.scale.setScalar(4.4);
          const quota = o.altezza + 0.2;
          gruppo.position.set(cx, quota, cz);
          gruppo.rotation.y = Math.PI;
          const bagliore = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: 0x6dff8a, transparent: true, opacity: 0.15, depthWrite: false, blending: THREE.AdditiveBlending }));
          bagliore.position.set(cx, quota, cz);
          scena.add(gruppo, bagliore);
          const materialeScia = new THREE.SpriteMaterial({ map: alone, color: 0x9dffb0, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
          const scie = Array.from({ length: SCIE_ANIME }, () => {
            const sprite = new THREE.Sprite(materialeScia.clone());
            sprite.visible = false;
            sprite.scale.setScalar(0.45);
            scena.add(sprite);
            return { sprite, t: 1, da: new THREE.Vector3() };
          });
          altare = { gruppo, bagliore, scie, quota, centro: new THREE.Vector3(cx, quota, cz), anime: 0 };
        }
        break;
      case 'vasca': {
        const g = new THREE.Group();
        const vetro = new THREE.Mesh(new THREE.CylinderGeometry(l / 2 - 0.1, l / 2 - 0.1, o.altezza, 18, 1, true), mat.vetro);
        vetro.position.y = o.altezza / 2;
        const liquido = new THREE.Mesh(new THREE.CylinderGeometry(l / 2 - 0.16, l / 2 - 0.16, o.altezza * 0.8, 18), mat.liquido);
        liquido.position.y = o.altezza * 0.4;
        g.add(vetro, liquido);
        g.position.set(cx, 0, cz);
        scena.add(g);
        for (const y of [0.05, o.altezza]) pezzo(mat.metallo, new THREE.TorusGeometry(l / 2 - 0.08, 0.06, 6, 20).rotateX(Math.PI / 2), cx, y, cz);
        vasche.push(g);
        break;
      }
      case 'gabbia':
        cubo(mat.metallo, o.x0, 0, o.z0, o.x1, 0.1, o.z1, 1);
        cubo(mat.metallo, o.x0, o.altezza - 0.08, o.z0, o.x1, o.altezza, o.z1, 1);
        for (let k = 0; k <= 6; k++) {
          for (const [x, z] of [[o.x0 + (l * k) / 6, o.z0], [o.x0 + (l * k) / 6, o.z1], [o.x0, o.z0 + (p * k) / 6], [o.x1, o.z0 + (p * k) / 6]]) {
            pezzo(mat.metallo, new THREE.CylinderGeometry(0.02, 0.02, o.altezza, 5), x, o.altezza / 2, z);
          }
        }
        break;
      case 'botte':
        posa('barrel_03', oggetti, cx, cz, caso() * 6);
        break;
      case 'alambicco':
        pezzo(mat.rame, new THREE.CylinderGeometry(l * 0.42, l * 0.45, 1.3, 18), cx, 0.65, cz);
        pezzo(mat.rame, new THREE.SphereGeometry(l * 0.42, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), cx, 1.3, cz);
        pezzo(mat.rame, new THREE.CylinderGeometry(0.08, 0.14, 1, 10), cx, 2.1, cz);
        pezzo(mat.rame, new THREE.TorusGeometry(0.35, 0.05, 6, 16), cx + l * 0.5, 1.2, cz, 0, 1, 1, 1, Math.PI / 2);
        pezzo(mat.rame, new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6).rotateZ(Math.PI / 3), cx + l * 0.3, 2.2, cz);
        break;
      case 'traliccio': {
        const metallo = mat.metallo;
        for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
          const g = new THREE.CylinderGeometry(0.06, 0.08, o.altezza, 6);
          const a = Math.atan2(1.1, o.altezza);
          g.rotateZ(-sx * a).rotateX(sz * a).translate(cx + sx * 0.85, o.altezza / 2, cz + sz * 0.85);
          statico.aggiungi(metallo, g);
        }
        for (let y = 1; y < o.altezza; y += 1.6) {
          const r = 1.45 - (y / o.altezza) * 1.1;
          for (const [dx, dz, rot] of [[0, -r, 0], [0, r, 0], [-r, 0, Math.PI / 2], [r, 0, Math.PI / 2]]) {
            pezzo(metallo, new THREE.BoxGeometry(r * 2, 0.05, 0.05), cx + dx, y, cz + dz, rot);
          }
        }
        faro = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: 0xff2a1a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
        faro.position.set(cx, o.altezza + 0.3, cz);
        faro.scale.setScalar(2.2);
        scena.add(faro);
        break;
      }
      case 'capanno':
        cubo(mat.assi, o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 2);
        pezzo(mat.lamiera, geometriaTetto(l, p, 0.8, 0.25), cx, o.altezza, cz, Math.PI / 2);
        break;
      case 'alberoMorto':
        break;
      case 'roccia':
        rocce.push(matrice(cx, 0.1, cz, caso() * 6, l * 0.55, o.altezza * 0.7, p * 0.55));
        break;
      case 'paloTeschio':
        pezzo(mat.legno, new THREE.CylinderGeometry(0.05, 0.07, 2, 6), cx, 1, cz);
        pezzo(mat.osso, new THREE.SphereGeometry(0.16, 10, 8), cx, 2.12, cz, 0, 1, 1.1, 1);
        for (const dx of [-0.06, 0.06]) pezzo(mat.nero, new THREE.SphereGeometry(0.04, 6, 4), cx + dx, 2.15, cz + 0.13);
        break;
      case 'canale': {
        const g = new THREE.PlaneGeometry(l, p).rotateX(-Math.PI / 2).rotateY(lungoX ? Math.PI / 2 : 0);
        const uv = g.attributes.uv;
        for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * (p / 2), uv.getY(i) * (l / 3));
        const corrente = new THREE.Mesh(g, mat.corrente);
        corrente.position.set(cx, 0.04, cz);
        scena.add(corrente);
        for (let t = 0.5; t < Math.max(l, p); t += 0.8) {
          for (const lato of [-1, 1]) rocce.push(matrice(lungoX ? o.x0 + t : cx + lato * (l / 2), 0.05, lungoX ? cz + lato * (p / 2) : o.z0 + t, caso() * 6, 0.25 + caso() * 0.15, 0.15, 0.25 + caso() * 0.15));
        }
        break;
      }
      default:
    }
  }
  istanze(scena, new THREE.BoxGeometry(0.7, 0.9, 0.16), mat.muschio, lapidi);
  istanze(scena, pietra, mat.roccia, rocce);

  for (let i = 0; i < ALBERI_SFONDO; i++) {
    const x = -100 + caso() * 195;
    const z = -100 + caso() * 190;
    if (inZona(x, z, 2.5) || (x < -92 && Math.abs(z) < 16)) continue;
    alberi.push(matrice(x, LIVELLO_ACQUA, z, caso() * 6, 0.9 + caso() * 0.6));
  }
  istanze(scena, tronco, mat.corteccia, alberi);
  istanze(scena, chioma, mat.foglie, alberi);
  istanze(scena, barba, mat.barba, alberi);
  diradabili(scena, geometriaCanne(), mat.canne, canne);
  istanze(scena, new THREE.CylinderGeometry(0.12, 0.14, 1.8, 6), mat.legno, pali);
  istanze(scena, new THREE.BoxGeometry(0.12, 1, 0.12), mat.legno, paletti);

  const ninfee = [];
  for (let i = 0; i < NINFEE * 3 && ninfee.length < NINFEE; i++) {
    const x = -90 + caso() * 180;
    const z = -90 + caso() * 175;
    if (inZona(x, z, 0.8)) continue;
    ninfee.push(matrice(x, LIVELLO_ACQUA + 0.02, z, caso() * 6, 0.5 + caso() * 0.6));
  }
  diradabili(scena, new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), mat.ninfea, ninfee);

  const vegetazione = { felci: [], cespugli: [], erba: [] };
  const occupato = (x, z) => OSTACOLI.some(o => x > o.x0 - 0.6 && x < o.x1 + 0.6 && z > o.z0 - 0.6 && z < o.z1 + 0.6)
    || ACQUISTI.some(a => Math.hypot(a.posizione.x - x, a.posizione.z - z) < 1.8)
    || PORTE.some(p => Math.hypot(p.centro.x - x, p.centro.z - z) < 3)
    || FINESTRE.some(f => Math.hypot(f.interno.x - x, f.interno.z - z) < 1.5);
  for (const zona of ZONE.filter(q => q.aperto && q.pavimento === 'fango')) {
    const area = (zona.x1 - zona.x0) * (zona.z1 - zona.z0);
    for (let i = 0; i < area / 10; i++) {
      const x = zona.x0 + 0.6 + caso() * (zona.x1 - zona.x0 - 1.2);
      const z = zona.z0 + 0.6 + caso() * (zona.z1 - zona.z0 - 1.2);
      const bordo = Math.min(x - zona.x0, zona.x1 - x, z - zona.z0, zona.z1 - z) < 2.2;
      if (occupato(x, z) || (!bordo && caso() < 0.75)) continue;
      const scelta = caso();
      (scelta < 0.45 ? vegetazione.felci : scelta < 0.7 ? vegetazione.cespugli : vegetazione.erba).push(matrice(x, 0, z, caso() * 6, 0.7 + caso() * 0.6));
    }
  }
  const pianta = mappa => new THREE.MeshStandardMaterial({ map: mappa, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.9 });
  diradabili(scena, geometriaFelce(), pianta(texturaFelce()), vegetazione.felci);
  diradabili(scena, geometriaCanne(1.6, 1.3), pianta(texturaCespuglio()), vegetazione.cespugli);
  diradabili(scena, geometriaCanne(0.9, 0.55), pianta(texturaErba()), vegetazione.erba);

  const glowPos = [];
  const glowCol = [];
  const aggiungiAlone = (x, y, z, colore) => {
    glowPos.push(x, y, z);
    const c = new THREE.Color(colore);
    glowCol.push(c.r, c.g, c.b);
  };
  for (const zona of ZONE.filter(q => q.passerella)) {
    const lungoX = zona.x1 - zona.x0 >= zona.z1 - zona.z0;
    const lungo = lungoX ? zona.x1 - zona.x0 : zona.z1 - zona.z0;
    for (let t = 3; t < lungo - 1; t += 9) {
      const x = lungoX ? zona.x0 + t : zona.x1 + 0.05;
      const z = lungoX ? zona.z1 + 0.05 : zona.z0 + t;
      cubo(mat.legno, x - 0.06, 0, z - 0.06, x + 0.06, 1.9, z + 0.06, 2);
      pezzo(mat.lanterna, new THREE.BoxGeometry(0.18, 0.26, 0.18), x, 2.05, z);
      aggiungiAlone(x, 2.05, z, 0xffa040);
    }
  }
  for (const l of LUCI) aggiungiAlone(l.x, l.y + 0.1, l.z, l.colore);
  const aloni = new THREE.BufferGeometry();
  aloni.setAttribute('position', new THREE.Float32BufferAttribute(glowPos, 3));
  aloni.setAttribute('color', new THREE.Float32BufferAttribute(glowCol, 3));
  const materialeAloni = new THREE.PointsMaterial({ map: alone, size: 1, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  scena.add(new THREE.Points(aloni, materialeAloni));

  const lucciole = new THREE.BufferGeometry();
  const basi = new Float32Array(LUCCIOLE * 3);
  const zoneAperte = ZONE.filter(q => q.aperto);
  for (let i = 0; i < LUCCIOLE; i++) {
    const q = zoneAperte[Math.floor(caso() * zoneAperte.length)];
    basi[i * 3] = q.x0 - 3 + caso() * (q.x1 - q.x0 + 6);
    basi[i * 3 + 1] = 0.6 + caso() * 2.6;
    basi[i * 3 + 2] = q.z0 - 3 + caso() * (q.z1 - q.z0 + 6);
  }
  const posLucciole = new Float32Array(basi);
  lucciole.setAttribute('position', new THREE.BufferAttribute(posLucciole, 3));
  scena.add(new THREE.Points(lucciole, new THREE.PointsMaterial({ map: alone, size: 0.22, color: 0xd8ff7a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));

  const nebbia = texturaNebbia();
  nebbia.repeat.set(9, 9);
  const velo = new THREE.MeshBasicMaterial({ map: nebbia, color: 0x9fbf98, transparent: true, opacity: 0.17, depthWrite: false });
  const foschia = new THREE.Mesh(new THREE.PlaneGeometry(240, 190).rotateX(-Math.PI / 2), velo);
  foschia.position.set(-15, 0.45, 10);
  foschia.renderOrder = 2;
  scena.add(foschia);

  const luna = new THREE.Mesh(new THREE.CircleGeometry(7, 24), new THREE.MeshBasicMaterial({ color: 0xe0ecd8, fog: false }));
  luna.position.set(-80, 75, -150);
  luna.lookAt(0, 0, 0);
  scena.add(luna);

  for (const a of ACQUISTI.filter(q => q.tipo === 'arma' && !INTERNE.has(q.zona))) {
    const lat = { x: a.verso.z, z: -a.verso.x };
    const bx = a.posizione.x - a.verso.x * 0.06;
    const bz = a.posizione.z - a.verso.z * 0.06;
    pezzo(mat.assi, scatolaUV(1.5, 1.1, 0.06, 1.5), bx, 1.5, bz, Math.atan2(a.verso.x, a.verso.z));
    for (const s of [-0.7, 0.7]) cubo(mat.legno, bx + lat.x * s - 0.06, 0, bz + lat.z * s - 0.06, bx + lat.x * s + 0.06, 2.05, bz + lat.z * s + 0.06, 2);
  }
  for (const a of ACQUISTI.filter(q => q.tipo === 'munizioni')) {
    const cassa = oggetti.get('old_military_crate')?.clone();
    if (cassa) {
      cassa.scale.setScalar(0.55);
      cassa.position.set(a.posizione.x, 0, a.posizione.z);
      orientamento(cassa, a.verso);
      scena.add(cassa);
    }
    const scritta = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.2), new THREE.MeshBasicMaterial({ map: texturaTesto(['MUNIZIONI'], { larghezza: 128, altezza: 32, sfondo: '#2a3320', colore: '#e8e0a0', font: 'bold 18px monospace' }) }));
    scritta.position.set(a.posizione.x + a.verso.x * 0.36, 0.95, a.posizione.z + a.verso.z * 0.36);
    orientamento(scritta, a.verso);
    scena.add(scritta);
  }
  const COLORI_ELEMENTI = Object.freeze({ ghiaccio: 0x7fd8ff, fuoco: 0xff7a2a, vuoto: 0xb06cff, vento: 0xc8ffd8 });
  const QUOTE_SEGNALE = Object.freeze({ ghiaccio: 1.5, fuoco: 1.2, vuoto: 1.3, vento: 2.5 });
  const fiamma = colore => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: colore, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scena.add(sprite);
    return sprite;
  };
  const vicinoA = (a, tipi) => OSTACOLI.filter(o => tipi.includes(o.tipo)).map(o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 })).find(c => Math.hypot(c.x - a.posizione.x, c.z - a.posizione.z) < 2.2);
  const segnali = ACQUISTI.filter(a => a.tipo === 'oggettoElemento').map(a => {
    const colore = COLORI_ELEMENTI[a.elemento];
    const punto = vicinoA(a, ['braciere', 'ghiacciaia', 'vasca', 'lapide']) ?? { x: a.posizione.x - a.verso.x * 0.55, z: a.posizione.z - a.verso.z * 0.55 };
    const bagliore = fiamma(colore);
    bagliore.position.set(punto.x, QUOTE_SEGNALE[a.elemento], punto.z);
    const segnale = { a, bagliore, fiamme: [], rotore: null };
    if (a.elemento === 'fuoco') {
      segnale.fiamme = [0, 1, 2, 3].map(k => {
        const sprite = fiamma(k % 2 ? 0xffc060 : 0xff6a1a);
        sprite.position.set(punto.x + (k - 1.5) * 0.12, 1.15, punto.z + (k % 2 ? 0.1 : -0.1));
        return sprite;
      });
    }
    if (a.elemento === 'vento') {
      cubo(mat.legno, punto.x - 0.05, 0, punto.z - 0.05, punto.x + 0.05, 2.4, punto.z + 0.05, 2);
      const rotore = new THREE.Group();
      for (let k = 0; k < 4; k++) {
        const pala = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.02).translate(0, 0.3, 0), mat.assi);
        pala.rotation.z = (k / 4) * Math.PI * 2;
        rotore.add(pala);
      }
      rotore.position.set(punto.x, 2.45, punto.z);
      rotore.rotation.y = Math.atan2(a.verso.x, a.verso.z);
      scena.add(rotore);
      segnale.rotore = rotore;
    }
    return segnale;
  });
  const santuari = OSTACOLI.filter(o => o.tipo === 'santuario').map(o => {
    const colore = COLORI_ELEMENTI[o.elemento];
    const cristallo = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshStandardMaterial({ color: 0x101010, emissive: colore, emissiveIntensity: 0.6, roughness: 0.2, flatShading: true }));
    cristallo.scale.set(1, 1.6, 1);
    cristallo.position.set((o.x0 + o.x1) / 2, o.altezza + 0.6, (o.z0 + o.z1) / 2);
    scena.add(cristallo);
    const bagliore = fiamma(colore);
    bagliore.position.copy(cristallo.position);
    return { elemento: o.elemento, cristallo, bagliore };
  });
  const chiazze = Array.from({ length: 8 }, () => {
    const gruppo = new THREE.Group();
    for (let k = 0; k < 6; k++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: k % 2 ? 0xffb040 : 0xff5a10, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      const a = (k / 6) * Math.PI * 2;
      sprite.position.set(Math.cos(a) * 1.3, 0.35, Math.sin(a) * 1.3);
      sprite.scale.setScalar(1.1);
      gruppo.add(sprite);
    }
    gruppo.visible = false;
    scena.add(gruppo);
    return gruppo;
  });
  const fiammeZombie = Array.from({ length: 24 }, () => {
    const sprite = fiamma(0xff7a2a);
    sprite.visible = false;
    return sprite;
  });
  const macchine = creaMacchine(scena, { materialiArmi, oggetti, metallo: mat.metallo, legno: mat.legno });

  const stile = { larghezza: 384, altezza: 96, sfondo: '#2a2016', colore: '#e9dfc4', font: 'bold 34px serif', bordo: '#6b5233' };
  for (const c of CARTELLI) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(c.l, c.a ?? 0.45), new THREE.MeshBasicMaterial({ map: texturaTesto(c.righe, { ...stile, altezza: c.righe.length > 1 ? 128 : 96 }) }));
    mesh.position.set(c.x, c.y, c.z);
    orientamento(mesh, c.verso);
    scena.add(mesh);
  }
  const cartello = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), new THREE.MeshBasicMaterial({ map: texturaTesto(['CAPANNO DEI CACCIATORI', '', 'ASPETTATE I COMPAGNI', '', 'INVIO: SONO PRONTO'], { larghezza: 512, altezza: 320, sfondo: '#14100b', colore: '#efe4c8', font: 'bold 30px sans-serif', bordo: '#8fd08c' }) }));
  cartello.position.set(CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z);
  orientamento(cartello, CARTELLO_PRONTI.verso);
  scena.add(cartello);

  const luci = Array.from({ length: luciAccese }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.4);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  let attesaLuci = 0;
  const vicinanza = (punto, f) => (f.x - punto.x) ** 2 + (f.z - punto.z) ** 2;
  function aggiornaLuci(vista, dt, tempo, punto) {
    attesaLuci -= dt;
    if (punto && attesaLuci <= 0) {
      attesaLuci = SCEGLI_LUCI_OGNI_S;
      const vicine = [...LUCI].sort((a, b) => vicinanza(punto, a) - vicinanza(punto, b)).slice(0, luciAccese);
      const libere = luci.filter(l => !vicine.includes(l.fonte));
      for (const f of vicine) {
        if (luci.some(l => l.fonte === f)) continue;
        const l = libere.shift();
        l.fonte = f;
        l.accensione = 0;
        l.luce.color.setHex(f.colore);
        l.luce.distance = f.portata;
        l.luce.position.set(f.x, f.y, f.z);
      }
    }
    for (const l of luci) {
      const f = l.fonte;
      if (!f) continue;
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const forza = f.segheria
        ? (vista.corrente ? 16 : 4 + (Math.sin(tempo * 13.7) > 0.9 ? 0 : 2))
        : f.intensita * (f.tremola ? 0.85 + Math.sin(tempo * 9 + f.x) * 0.08 + Math.sin(tempo * 23 + f.z) * 0.06 : 1);
      l.luce.intensity = forza * l.accensione;
    }
  }

  function aggiornaElementi(vista, dt, tempo) {
    const elementi = vista.palude?.elementi;
    for (const sg of segnali) {
      const el = elementi?.[sg.a.elemento];
      const attivo = !!el?.oggetti[sg.a.indice];
      const scelto = !!el?.da;
      sg.bagliore.material.opacity = attivo ? 0.85 + Math.sin(tempo * 5 + sg.a.indice) * 0.1 : scelto ? 0.2 + Math.sin(tempo * 2.5) * 0.15 : 0;
      sg.bagliore.scale.setScalar(attivo ? 1.4 : 0.9);
      sg.bagliore.visible = attivo || scelto;
      sg.fiamme.forEach((sprite, k) => {
        sprite.visible = attivo;
        sprite.scale.set(0.45 + Math.sin(tempo * 13 + k * 2) * 0.1, 0.8 + Math.sin(tempo * 9 + k) * 0.2, 1);
      });
      if (sg.rotore) sg.rotore.rotation.z += dt * (attivo ? 9 : 0.6);
    }
    for (const sa of santuari) {
      const el = elementi?.[sa.elemento];
      const forza = el?.passo === 3 ? 2.6 : el?.da ? 1.4 : 0.5;
      sa.cristallo.material.emissiveIntensity = forza + Math.sin(tempo * 2 + forza) * 0.2;
      sa.cristallo.rotation.y += dt * (0.4 + forza * 0.3);
      sa.cristallo.position.y = 1.7 + Math.sin(tempo * 1.4) * 0.05;
      sa.bagliore.material.opacity = 0.2 + forza * 0.25;
      sa.bagliore.scale.setScalar(0.8 + forza * 0.6);
    }
    const fuochi = vista.palude?.fuochi ?? [];
    chiazze.forEach((g, i) => {
      const f = fuochi[i];
      g.visible = !!f;
      if (!f) return;
      g.position.set(f.x, 0, f.z);
      g.scale.setScalar(Math.min(1, f.timer / 2 + 0.3));
      g.children.forEach((sprite, k) => { sprite.scale.set(1, 1.2 + Math.sin(tempo * 11 + k) * 0.35, 1); });
    });
    const ardenti = new Set(vista.palude?.ardenti ?? []);
    let n = 0;
    for (const z of vista.zombie) {
      if (n >= fiammeZombie.length || !ardenti.has(z.id) || z.stato === 'morto') continue;
      const sprite = fiammeZombie[n++];
      sprite.visible = true;
      sprite.position.set(z.x + Math.sin(tempo * 7 + z.id) * 0.08, 1.1 + Math.sin(tempo * 11 + z.id) * 0.1, z.z);
      sprite.scale.set(0.9, 1.6 + Math.sin(tempo * 13 + z.id) * 0.3, 1);
    }
    for (; n < fiammeZombie.length; n++) fiammeZombie[n].visible = false;
  }

  function aggiornaAltare(anime, dt, tempo) {
    const pieno = Math.min(1, anime / R.ANIME_ALTARE);
    altare.bagliore.material.opacity = 0.15 + pieno * 0.7;
    altare.bagliore.scale.setScalar(0.6 + pieno * 1.8 + (pieno >= 1 ? Math.sin(tempo * 4) * 0.2 : 0));
    altare.gruppo.position.y = altare.quota + (pieno >= 1 ? 0.35 + Math.sin(tempo * 2) * 0.06 : 0);
    altare.gruppo.rotation.y = Math.PI + (pieno >= 1 ? tempo * 0.8 : 0);
    for (let n = Math.min(4, anime - altare.anime); n > 0; n--) {
      const libera = altare.scie.find(s => s.t >= 1);
      if (!libera) break;
      const angolo = caso() * Math.PI * 2;
      libera.da.set(altare.centro.x + Math.cos(angolo) * (1.5 + caso() * 2), 0.9, altare.centro.z + Math.sin(angolo) * (1.5 + caso() * 2));
      libera.t = 0;
      libera.sprite.visible = true;
    }
    altare.anime = anime;
    for (const s of altare.scie) {
      if (s.t >= 1) continue;
      s.t = Math.min(1, s.t + dt / DURATA_SCIA);
      s.sprite.position.lerpVectors(s.da, altare.gruppo.position, s.t * s.t);
      s.sprite.material.opacity = Math.sin(s.t * Math.PI);
      s.sprite.visible = s.t < 1;
    }
  }

  const missione = creaMissione(scena, { mat, alone, pezzo, cubo });
  const tana = creaTana(scena, { mat, alone, pezzo, cubo, statico });
  preparaRagni(scena);

  statico.chiudi(scena);

  return {
    aggiorna(vista, dt, tempo, punto) {
      macchine.aggiorna(vista, dt, tempo);
      mat.acqua.map.offset.x = (mat.acqua.map.offset.x + dt * 0.006) % 1;
      mat.acqua.map.offset.y = (mat.acqua.map.offset.y + dt * 0.004) % 1;
      mat.corrente.map.offset.y = (mat.corrente.map.offset.y - dt * 0.9) % 1;
      nebbia.offset.x = (nebbia.offset.x + dt * 0.004) % 1;
      nebbia.offset.y = (nebbia.offset.y + dt * 0.003) % 1;
      materialeAloni.opacity = 0.75 + Math.sin(tempo * 7) * 0.05 + Math.sin(tempo * 17) * 0.04;
      mat.candela.emissiveIntensity = 1 + Math.sin(tempo * 11) * 0.25 + Math.sin(tempo * 23) * 0.15;
      mat.liquido.emissiveIntensity = 0.75 + Math.sin(tempo * 1.6) * 0.25;
      if (faro) faro.visible = Math.sin(tempo * 3) > -0.2;
      for (let i = 0; i < LUCCIOLE; i++) {
        const k = i * 3;
        posLucciole[k] = basi[k] + Math.sin(tempo * 0.6 + i) * 1.2;
        posLucciole[k + 1] = basi[k + 1] + Math.sin(tempo * 1.3 + i * 1.7) * 0.35;
        posLucciole[k + 2] = basi[k + 2] + Math.cos(tempo * 0.5 + i * 0.7) * 1.2;
      }
      lucciole.attributes.position.needsUpdate = true;
      aggiornaLuci(vista, dt, tempo, punto);
      if (altare) aggiornaAltare(vista.palude?.altare ?? 0, dt, tempo);
      aggiornaElementi(vista, dt, tempo);
      missione.aggiorna(vista, dt, tempo);
      tana.aggiorna(vista, dt, tempo);
      missione.calma(dt);
      const scossa = Math.max(missione.scossa(), tana.scossa());
      if (punto && scossa > 0) {
        punto.x += (Math.random() - 0.5) * scossa * 0.35;
        punto.y += (Math.random() - 0.5) * scossa * 0.35;
        punto.z += (Math.random() - 0.5) * scossa * 0.35;
      }
      if (motore) {
        motore.spia.material.emissive.setHex(vista.corrente ? 0x3cff6a : 0xb8241b);
        if (vista.corrente) {
          motore.volano.rotation.x += dt * 14;
          motore.gruppo.position.y = Math.sin(tempo * 55) * 0.005;
        }
      }
      let assiCambiate = false;
      for (const [id, f] of finestre) {
        const voluto = vista.finestre[id] ?? R.ASSE_PER_FINESTRA;
        if (voluto === f.mostrate) continue;
        f.mostrate = voluto;
        f.indici.forEach((indice, i) => assiMesh.setMatrixAt(indice, i < voluto ? assiFinestre[indice] : nascosta));
        assiCambiate = true;
      }
      if (assiCambiate) assiMesh.instanceMatrix.needsUpdate = true;
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        const aperta = vista.porte.has(p.id);
        porta.apertura = aperta ? Math.min(1, porta.apertura + dt * (porta.tipo === 'radici' ? 0.5 : 1.4)) : Math.max(0, porta.apertura - dt * 2.5);
        if (porta.tipo === 'cancello') porta.anta.rotation.y = porta.apertura * 1.75;
        else if (porta.tipo === 'radici') {
          porta.gruppo.scale.set(1, Math.max(0.001, 1 - porta.apertura), 1);
          porta.gruppo.visible = porta.apertura < 1;
        } else {
          porta.gruppo.position.y = porta.apertura * (porta.alto + 0.2);
          porta.gruppo.visible = porta.apertura < 1;
        }
      }
    },
  };
}
