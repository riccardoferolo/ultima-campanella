import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DELTA, CANNE, COLONNE_SIMBOLI, PILONI, BOCCAPORTI_DELTA, FINESTRE, quotaDelta } from '../../mappe/abisso.js';
import { PASSO } from '../../abisso/costanti.js';
import { CAUSTICHE_GLSL } from './kit.js';
import {
  RUMORE_GLSL, USCITA_GLSL, conEmissivo, trame, generatore, matrice, unisci, unisciPiatte, colora, torno, tubo, scatola,
  liscia, tra, creaFasci, materialeAcqua, creaArchi, creaParticelle, texturaSimboli, texturaFregio, materialeCorallo, ramoCorallo, fusto,
} from './santuario3d.js';

const SETTORE = 'delta';
const CX = DELTA.x;
const CZ = DELTA.z;
const BASE_CUPOLA = 5;
const RAGGIO_SFERA = (DELTA.raggio ** 2 + (DELTA.altezza - BASE_CUPOLA) ** 2) / (2 * (DELTA.altezza - BASE_CUPOLA));
const CENTRO_SFERA_Y = DELTA.altezza - RAGGIO_SFERA;
const THETA_BASE = Math.asin(DELTA.raggio / RAGGIO_SFERA);
const MURO = Object.freeze({ r0: DELTA.raggio - 0.25, r1: DELTA.raggio + 0.25, y0: -0.5, y1: 4.6 });
const PASSAGGIO = Object.freeze({ a: Math.PI, mezzo: 0.07 });
const BOCCAPORTI = Object.freeze(BOCCAPORTI_DELTA.map(a => Object.freeze({ a, mezzo: 0.047, alto: 2.45 })));
const ALTEZZE_CANNE = Object.freeze([18, 21.5, 25, 21.5, 18]);
const RAGGIO_CANNA = 0.72;
const TANE_VASCA = Object.freeze(FINESTRE.filter(f => f.vasca).map(f => f.centro));
const ANGOLI_MURALI = Object.freeze([2.95, -2.95, 1.45, 1.18]);
const ORGANO = Object.freeze({ da: -Math.PI / 2 - 0.58, a: -Math.PI / 2 + 0.58 });
const TENTACOLI = Object.freeze([
  Object.freeze({ muro: 0.9, vasca: 1.15, onda: 1, seme: 3 }),
  Object.freeze({ muro: 2.72, vasca: 2.6, onda: -1, seme: 7 }),
]);
const RADICI = Object.freeze([0.32, 0.72, 1.64, 2.1, 2.5, -0.2, -0.58, -2.3, -2.72]);
const CICLO_NOTA = 1.1;
const PAUSA_INNO = 2.5;
const SLOT = Object.freeze({ canne: 0, colonne: 5, retro: 10, spie: 15, totale: 20 });
const LUCI_BAGLIORI = 9;
const CIANO = 0x2fd0ff;
const SU = new THREE.Vector3(0, 1, 0);
const GIU = new THREE.Vector3(0, -1, 0);

const polare = (r, a, y = 0) => new THREE.Vector3(CX + Math.cos(a) * r, y, CZ + Math.sin(a) * r);
const angoloDi = p => Math.atan2(p.z - CZ, p.x - CX);
const differenza = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const versoCentro = p => new THREE.Vector3(CX - p.x, 0, CZ - p.z).normalize();
const radiale = a => new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
const tangente = a => new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));

function costruttore() {
  const pos = [];
  const col = [];
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const n = new THREE.Vector3();
  return {
    quad(punti, atteso, colori = null) {
      ab.subVectors(punti[1], punti[0]);
      ac.subVectors(punti[2], punti[0]);
      n.crossVectors(ab, ac);
      if (n.lengthSq() < 1e-12) {
        ac.subVectors(punti[3], punti[0]);
        n.crossVectors(ab, ac);
      }
      const ordine = n.dot(atteso) >= 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
      for (const k of ordine) {
        pos.push(punti[k].x, punti[k].y, punti[k].z);
        const c = colori ? colori[k] : [1, 1, 1];
        col.push(c[0], c[1], c[2]);
      }
    },
    vuoto: () => pos.length === 0,
    geometria(colorata = true) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      if (colorata) g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      return g;
    },
  };
}

function nastro(r, a0, a1, y0, y1, versoDentro, metri = 2.4) {
  const passi = Math.max(2, Math.ceil(((a1 - a0) * r) / 0.6));
  const pos = [];
  const uv = [];
  const lunghezza = (a1 - a0) * r;
  for (let i = 0; i < passi; i++) {
    const u0 = tra(a0, a1, i / passi);
    const u1 = tra(a0, a1, (i + 1) / passi);
    const p = [polare(r, u0, y0), polare(r, u1, y0), polare(r, u1, y1), polare(r, u0, y1)];
    const t = [[(i / passi) * lunghezza / metri, 0], [((i + 1) / passi) * lunghezza / metri, 0], [((i + 1) / passi) * lunghezza / metri, 1], [(i / passi) * lunghezza / metri, 1]];
    const ordine = versoDentro ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
    for (const k of ordine) {
      pos.push(p[k].x, p[k].y, p[k].z);
      uv.push(t[k][0], t[k][1]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

function anelloSolido(b, { r0, r1, a0, a1, y0, y1, sopra = true, sotto = false, dentro = true, fuori = true, lati = false, colore = null }) {
  const passi = Math.max(2, Math.ceil(((a1 - a0) * r1) / 0.6));
  for (let i = 0; i < passi; i++) {
    const u0 = tra(a0, a1, i / passi);
    const u1 = tra(a0, a1, (i + 1) / passi);
    const um = (u0 + u1) / 2;
    const c = colore ? [colore, colore, colore, colore] : null;
    if (sopra) b.quad([polare(r0, u0, y1), polare(r0, u1, y1), polare(r1, u1, y1), polare(r1, u0, y1)], SU, c);
    if (sotto) b.quad([polare(r0, u0, y0), polare(r0, u1, y0), polare(r1, u1, y0), polare(r1, u0, y0)], GIU, c);
    if (dentro) b.quad([polare(r0, u0, y0), polare(r0, u1, y0), polare(r0, u1, y1), polare(r0, u0, y1)], radiale(um).negate(), c);
    if (fuori) b.quad([polare(r1, u0, y0), polare(r1, u1, y0), polare(r1, u1, y1), polare(r1, u0, y1)], radiale(um), c);
  }
  if (lati) {
    const c = colore ? [colore, colore, colore, colore] : null;
    b.quad([polare(r0, a0, y0), polare(r1, a0, y0), polare(r1, a0, y1), polare(r0, a0, y1)], tangente(a0).negate(), c);
    b.quad([polare(r0, a1, y0), polare(r1, a1, y0), polare(r1, a1, y1), polare(r0, a1, y1)], tangente(a1), c);
  }
}

function materiali(kit) {
  const intarsi = { value: 0.7 };
  const fregio = texturaFregio();
  const crepe = texturaCrepe();
  const ripeti = t => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(12, 3);
    return t;
  };
  return {
    intarsi,
    gradoni: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'marmo', 0.42), vertexColors: true, roughness: 0.66, envMapIntensity: 1.1 }), kit, { chiave: 'gradoniDelta', glsl: 'totalEmissiveRadiance += vec3(0.0);', peso: 0.85 }),
    oroIntarsio: conEmissivo(new THREE.MeshStandardMaterial({ color: 0xe0b050, metalness: 0.55, roughness: 0.32 }), kit, {
      chiave: 'oroIntarsioDelta',
      glsl: 'totalEmissiveRadiance += vec3(0.16, 0.1, 0.02);',
      peso: 0.4,
    }),
    intarsio: conEmissivo(new THREE.MeshStandardMaterial({ color: 0x0a2632, roughness: 0.3, metalness: 0.5 }), kit, {
      chiave: 'intarsioDelta',
      dichiara: 'uniform float uIntarsi;',
      uniformi: { uIntarsi: intarsi },
      glsl: `
        float dc = length(vMondo.xz - vec2(${CX.toFixed(1)}, ${CZ.toFixed(1)}));
        float onda = 0.3 + 0.7 * pow(0.5 + 0.5 * sin(dc * 0.9 - uTempo * 1.6), 3.0);
        totalEmissiveRadiance += vec3(0.18, 0.82, 1.0) * onda * uIntarsi * 2.2;
      `,
    }),
    fregio: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'marmo', 0.5), color: 0x8e8a82, roughness: 0.8, emissiveMap: fregio, emissive: CIANO, emissiveIntensity: 0.85 }), kit, {
      chiave: 'fregioDelta',
      dichiara: 'uniform float uIntarsi;',
      uniformi: { uIntarsi: intarsi },
      glsl: 'totalEmissiveRadiance *= 0.4 + 0.6 * uIntarsi;',
    }),
    vetro: new THREE.MeshPhysicalMaterial({
      color: 0x9fd8e6, metalness: 0, roughness: 0.05, transparent: true, opacity: 1, alphaMap: ripeti(crepe.alfa), normalMap: ripeti(crepe.normali), normalScale: new THREE.Vector2(0.9, 0.9),
      emissive: CIANO, emissiveMap: ripeti(crepe.luce), emissiveIntensity: 0.32, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2.4, side: THREE.DoubleSide, depthWrite: false,
    }),
    cristallo: new THREE.MeshPhysicalMaterial({ color: 0xb8ecff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.24, clearcoat: 1, envMapIntensity: 2, side: THREE.DoubleSide, depthWrite: false }),
    ceramica: new THREE.MeshStandardMaterial({ color: 0xe6ddc8, roughness: 0.32, metalness: 0 }),
    tastiBianchi: new THREE.MeshStandardMaterial({ color: 0xefe8d6, roughness: 0.3 }),
    tastiNeri: new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.25, metalness: 0.2 }),
    corallo: materialeCorallo(kit, 'coralloDelta', { value: 1.6 }),
  };
}

function texturaCrepe() {
  const caso = generatore(4411);
  const L = 1024;
  const A = 512;
  const tela = document.createElement('canvas');
  tela.width = L;
  tela.height = A;
  const c = tela.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0, 0, L, A);
  c.strokeStyle = '#fff';
  c.lineCap = 'round';
  c.lineJoin = 'round';
  const spezzata = (x, y, angolo, lungo, spessore) => {
    c.lineWidth = spessore;
    c.beginPath();
    c.moveTo(x, y);
    let a = angolo;
    const passi = 6 + Math.floor(caso() * 8);
    for (let k = 0; k < passi; k++) {
      a += (caso() - 0.5) * 0.7;
      x += Math.cos(a) * (lungo / passi);
      y += Math.sin(a) * (lungo / passi);
      c.lineTo(x, y);
    }
    c.stroke();
    return [x, y];
  };
  for (let k = 0; k < 6; k++) {
    const cx = caso() * L;
    const cy = caso() * A;
    const raggi = 8 + Math.floor(caso() * 7);
    for (let i = 0; i < raggi; i++) {
      const a = (i / raggi) * Math.PI * 2 + caso() * 0.4;
      const [fx, fy] = spezzata(cx, cy, a, 50 + caso() * 170, 1.4 + caso() * 1.8);
      if (caso() < 0.5) spezzata(fx, fy, a + (caso() - 0.5) * 1.6, 30 + caso() * 60, 1);
    }
    for (const r of [14 + caso() * 10, 36 + caso() * 20]) {
      c.lineWidth = 1.2;
      c.beginPath();
      for (let i = 0; i <= 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        const rr = r * (0.8 + caso() * 0.4);
        if (i === 0) c.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        else c.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
      c.stroke();
    }
  }
  for (let k = 0; k < 5; k++) spezzata(caso() * L, caso() * A, caso() * Math.PI * 2, 300 + caso() * 300, 1.6);
  const dati = c.getImageData(0, 0, L, A).data;
  const alfa = document.createElement('canvas');
  alfa.width = L;
  alfa.height = A;
  const ca = alfa.getContext('2d');
  ca.fillStyle = 'rgb(52,52,52)';
  ca.fillRect(0, 0, L, A);
  ca.globalCompositeOperation = 'lighter';
  ca.drawImage(tela, 0, 0);
  const normali = document.createElement('canvas');
  normali.width = L;
  normali.height = A;
  const cn = normali.getContext('2d');
  const img = cn.createImageData(L, A);
  const h = (x, y) => dati[(((y + A) % A) * L + ((x + L) % L)) * 4] / 255;
  for (let y = 0; y < A; y++) {
    for (let x = 0; x < L; x++) {
      const dx = (h(x + 1, y) - h(x - 1, y)) * 2.5;
      const dy = (h(x, y + 1) - h(x, y - 1)) * 2.5;
      const l = Math.hypot(dx, dy, 1);
      const o = (y * L + x) * 4;
      img.data[o] = (-dx / l * 0.5 + 0.5) * 255;
      img.data[o + 1] = (-dy / l * 0.5 + 0.5) * 255;
      img.data[o + 2] = (1 / l * 0.5 + 0.5) * 255;
      img.data[o + 3] = 255;
    }
  }
  cn.putImageData(img, 0, 0);
  return { alfa: new THREE.CanvasTexture(alfa), normali: new THREE.CanvasTexture(normali), luce: new THREE.CanvasTexture(tela) };
}

function creaGlifi(kit) {
  const parti = [];
  const simbolo = { value: new Array(SLOT.totale).fill(0) };
  const luce = { value: new Array(SLOT.totale).fill(0.15) };
  const colore = { value: Array.from({ length: SLOT.totale }, () => new THREE.Vector3(0.25, 0.9, 1.2)) };
  return {
    simbolo,
    luce,
    colore,
    aggiungi(centro, normale, lato, slot) {
      const g = new THREE.PlaneGeometry(lato, lato);
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normale.clone().normalize()));
      g.translate(centro.x, centro.y, centro.z);
      g.setAttribute('aSlot', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(slot), 1));
      g.deleteAttribute('normal');
      parti.push(g);
    },
    chiudi() {
      const mesh = new THREE.Mesh(mergeGeometries(parti), new THREE.ShaderMaterial({
        uniforms: { uAtlante: { value: texturaSimboli() }, uSimbolo: simbolo, uLuce: luce, uColore: colore },
        vertexShader: `
          attribute float aSlot;
          uniform float uSimbolo[${SLOT.totale}];
          uniform float uLuce[${SLOT.totale}];
          uniform vec3 uColore[${SLOT.totale}];
          varying vec2 vUv;
          varying float vLuce;
          varying vec3 vColore;
          void main() {
            int i = int(aSlot + 0.5);
            vUv = vec2((uSimbolo[i] + uv.x) / 6.0, uv.y);
            vLuce = uLuce[i];
            vColore = uColore[i];
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform sampler2D uAtlante;
          varying vec2 vUv;
          varying float vLuce;
          varying vec3 vColore;
          void main() {
            float t = texture2D(uAtlante, vUv).r;
            gl_FragColor = vec4(vColore * t * (0.12 + vLuce * 2.4), 1.0);
            ${USCITA_GLSL}
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      kit.scena.add(mesh);
      return mesh;
    },
  };
}

function creaBagliori(kit) {
  const parti = [];
  const luce = { value: new Array(LUCI_BAGLIORI).fill(0.1) };
  const colore = { value: Array.from({ length: LUCI_BAGLIORI }, () => new THREE.Vector3(0.2, 0.85, 1.25)) };
  return {
    luce,
    colore,
    aggiungi(g, slot) {
      const n = g.index ? g.toNonIndexed() : g.clone();
      for (const nome of Object.keys(n.attributes)) if (nome !== 'position' && nome !== 'normal') n.deleteAttribute(nome);
      if (!n.attributes.normal) n.computeVertexNormals();
      n.setAttribute('aSlot', new THREE.BufferAttribute(new Float32Array(n.attributes.position.count).fill(slot), 1));
      parti.push(n);
    },
    chiudi() {
      const mesh = new THREE.Mesh(mergeGeometries(parti), new THREE.ShaderMaterial({
        uniforms: { uLuce: luce, uColore: colore, uTempo: kit.uniformi.uTempo },
        vertexShader: `
          attribute float aSlot;
          uniform float uLuce[${LUCI_BAGLIORI}];
          uniform vec3 uColore[${LUCI_BAGLIORI}];
          varying vec3 vN;
          varying vec3 vV;
          varying float vLuce;
          varying vec3 vColore;
          varying vec3 vPos;
          void main() {
            int i = int(aSlot + 0.5);
            vLuce = uLuce[i];
            vColore = uColore[i];
            vec4 mondo = modelMatrix * vec4(position, 1.0);
            vPos = mondo.xyz;
            vN = normalize(mat3(modelMatrix) * normal);
            vV = cameraPosition - mondo.xyz;
            gl_Position = projectionMatrix * viewMatrix * mondo;
          }`,
        fragmentShader: `
          uniform float uTempo;
          varying vec3 vN;
          varying vec3 vV;
          varying float vLuce;
          varying vec3 vColore;
          varying vec3 vPos;
          void main() {
            float fres = pow(max(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0), 2.0);
            float guizzo = 0.85 + 0.15 * sin(uTempo * 23.0 + vPos.y * 9.0);
            vec3 col = vColore * (0.06 + vLuce * 2.3 * guizzo) * (0.55 + 0.9 * fres) + vec3(0.01, 0.02, 0.025);
            gl_FragColor = vec4(col, 1.0);
            ${USCITA_GLSL}
          }`,
      }));
      kit.scena.add(mesh);
      return mesh;
    },
  };
}

function costruisciGradoni(kit, m, caso) {
  const b = costruttore();
  const usura = (x, z) => Math.max(0, kit.rumore.fbm(x * 1.1, 0.5, z * 1.1, 3)) * 0.05;
  const anelli = [{ r0: DELTA.vasca, r1: DELTA.platea, y: DELTA.fondo, alzata: 0 }];
  for (let k = 1; k <= 8; k++) anelli.push({ r0: DELTA.platea + (k - 1) * DELTA.gradone, r1: k < 8 ? DELTA.platea + k * DELTA.gradone : MURO.r1, y: Math.min(0, DELTA.fondo + k * DELTA.alzata), alzata: DELTA.alzata });
  for (const a of anelli) {
    const rm = (a.r0 + a.r1) / 2;
    const blocchi = Math.max(12, Math.round((Math.PI * 2 * rm) / (a.alzata ? 2.3 : 1.7)));
    const fuga = 0.012 / rm;
    for (let i = 0; i < blocchi; i++) {
      const a0 = (i / blocchi) * Math.PI * 2 + fuga;
      const a1 = ((i + 1) / blocchi) * Math.PI * 2 - fuga;
      const passi = Math.max(2, Math.ceil(((a1 - a0) * a.r1) / 0.7));
      const t = 0.76 + caso() * 0.26;
      const tinta = [t + 0.04, t, t - 0.06];
      const scura = tinta.map(v => v * 0.42);
      const yTop = a.y + (caso() - 0.5) * 0.006;
      const yBase = a.y - a.alzata - 0.15;
      const bordo = ang => {
        const p = polare(a.r0, ang, 0);
        p.y = yTop - (a.alzata ? usura(p.x, p.z) : 0);
        return p;
      };
      for (let s = 0; s < passi; s++) {
        const u0 = tra(a0, a1, s / passi);
        const u1 = tra(a0, a1, (s + 1) / passi);
        const e0 = bordo(u0);
        const e1 = bordo(u1);
        b.quad([e0, e1, polare(a.r1, u1, yTop), polare(a.r1, u0, yTop)], SU, [tinta, tinta, tinta, tinta]);
        if (a.alzata) b.quad([polare(a.r0, u0, yBase), polare(a.r0, u1, yBase), e1.clone(), e0.clone()], radiale((u0 + u1) / 2).negate(), [scura, scura, tinta, tinta]);
      }
      const buio = [0.12, 0.12, 0.13];
      b.quad([polare(a.r0, a0, yBase), polare(a.r1, a0, yBase), polare(a.r1, a0, yTop), bordo(a0)], tangente(a0).negate(), [buio, buio, buio, buio]);
      b.quad([polare(a.r0, a1, yBase), polare(a.r1, a1, yBase), polare(a.r1, a1, yTop), bordo(a1)], tangente(a1), [buio, buio, buio, buio]);
    }
  }
  kit.lotto(m.gradoni, SETTORE).aggiungi(kit.uvMetri(b.geometria(), 1));
  const oro = [];
  const luce = [];
  const anello = (r0, r1, y, lista) => lista.push(new THREE.RingGeometry(r0, r1, 160, 1).rotateX(-Math.PI / 2).translate(CX, y, CZ));
  const yA = DELTA.fondo + 0.006;
  anello(10.15, 10.3, yA, oro);
  anello(12.18, 12.33, yA, oro);
  anello(10.72, 10.77, yA + 0.003, luce);
  anello(11.72, 11.77, yA + 0.003, luce);
  anello(21.9, 22.0, 0.006, oro);
  anello(22.3, 22.34, 0.009, luce);
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    const g = new THREE.BoxGeometry(1.85, 0.02, k % 2 ? 0.05 : 0.09).translate(11.25, yA, 0).rotateY(-a).translate(CX, 0, CZ);
    (k % 2 ? luce : oro).push(g);
  }
  kit.lotto(m.oroIntarsio, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(m.intarsio, SETTORE).aggiungi(unisciPiatte(luce));
}

function costruisciVasca(kit, m, caso) {
  const b = costruttore();
  const rotture = TANE_VASCA.map(angoloDi);
  const N = 180;
  const yTop = DELTA.fondo + 1 - 0.15;
  const stato = [];
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2;
    const a1 = ((i + 1) / N) * Math.PI * 2;
    const am = (a0 + a1) / 2;
    const rotto = rotture.some(r => Math.abs(differenza(am, r)) < 0.085);
    const vicino = rotture.some(r => Math.abs(differenza(am, r)) < 0.2);
    const t = vicino ? 0.45 : 0.78 + caso() * 0.08;
    const c = [t, t, t * 0.98];
    const alto = rotto ? DELTA.fondo + 0.35 + caso() * 0.25 : yTop;
    stato.push({ a0, a1, rotto, alto, c });
    anelloSolido(b, { r0: 9.0, r1: DELTA.vasca, a0, a1, y0: -4.3, y1: alto, colore: c });
  }
  stato.forEach((s, i) => {
    const prossimo = stato[(i + 1) % N];
    if (s.rotto === prossimo.rotto) return;
    const basso = Math.min(s.alto, prossimo.alto);
    const alto = Math.max(s.alto, prossimo.alto);
    b.quad([polare(9.0, s.a1, basso), polare(DELTA.vasca, s.a1, basso), polare(DELTA.vasca, s.a1, alto), polare(9.0, s.a1, alto)], tangente(s.a1).multiplyScalar(s.alto > prossimo.alto ? 1 : -1), [s.c, s.c, s.c, s.c]);
  });
  const cornice = costruttore();
  stato.forEach(s => {
    if (s.rotto) return;
    anelloSolido(cornice, { r0: 8.88, r1: DELTA.vasca + 0.12, a0: s.a0, a1: s.a1, y0: yTop, y1: yTop + 0.15, sotto: true });
  });
  kit.lotto(m.gradoni, SETTORE).aggiungi(kit.uvMetri(b.geometria(), 1));
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(cornice.geometria(false), 1));
  const oro = [];
  stato.forEach(s => {
    if (s.rotto) return;
    oro.push(nastro(DELTA.vasca + 0.006, s.a0, s.a1, DELTA.fondo + 0.42, DELTA.fondo + 0.48, false));
  });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(oro), 1));
  const macerie = [];
  for (const r of rotture) {
    for (let k = 0; k < 6; k++) {
      const s = 0.12 + caso() * 0.2;
      const p = polare(tra(9.7, 10.4, caso()), r + (caso() - 0.5) * 0.25, DELTA.fondo + s * 0.4);
      macerie.push(new THREE.DodecahedronGeometry(s, 0).translate(p.x, p.y, p.z));
    }
  }
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(macerie), 1));
  const pozzo = new THREE.CylinderGeometry(9.0, 7.0, 26, 72, 10, true).scale(-1, 1, 1).translate(CX, -4.1 - 13, CZ);
  pozzo.computeVertexNormals();
  kit.lotto(kit.mat.roccia, SETTORE).aggiungi(kit.uvMetri(kit.deforma(unisci([pozzo]), { ampiezza: 0.35, frequenza: 0.5, ottave: 4, seme: 31, lungo: (x, y) => liscia(-5, -8, y) }), 0.6));
  const anelliLuce = [-7.5, -11.5, -16.5, -22.5].map(y => {
    const r = 9.0 - ((-4.1 - y) / 26) * 2 - 0.35;
    return new THREE.TorusGeometry(r, 0.08, 6, 128).rotateX(Math.PI / 2).translate(CX, y, CZ);
  });
  kit.lotto(kit.mat.oricalco, SETTORE).aggiungi(unisciPiatte(anelliLuce));
  const forzaFondo = { value: 1 };
  const fondo = new THREE.Mesh(new THREE.CylinderGeometry(6.6, 6.9, 24, 48, 1, true), new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uForza: forzaFondo },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uForza;
      varying vec2 vUv;
      varying vec3 vPos;
      ${RUMORE_GLSL}
      void main() {
        float n = rumoreAb(vec3(vPos.x * 0.3, vPos.y * 0.15 + uTempo * 0.25, vPos.z * 0.3));
        float i = pow(max(1.0 - vUv.y, 0.0), 2.4) * (0.55 + 0.45 * n);
        gl_FragColor = vec4(vec3(0.1, 0.55, 0.9) * i * 0.45 * uForza, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }));
  fondo.position.set(CX, -4.6 - 12, CZ);
  kit.scena.add(fondo);
  const disco = new THREE.Mesh(new THREE.CircleGeometry(7.0, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 1.1, 1.6), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  disco.position.set(CX, -29.5, CZ);
  kit.scena.add(disco);
  const acqua = materialeAcqua(kit, { chiave: 'vascaDelta', colore: 0x03303c, opacita: 0.7, forzaLuce: 0.55, onde: 0.3, centro: [CX, 0, CZ], raggioLuce: 9 });
  const superficie = new THREE.Mesh(new THREE.CircleGeometry(9.05, 96).rotateX(-Math.PI / 2), acqua.materiale);
  superficie.position.set(CX, DELTA.acqua, CZ);
  kit.scena.add(superficie);
  const marea = materialeAcqua(kit, { chiave: 'mareaDelta', colore: 0x05303e, opacita: 0.8, forzaLuce: 0.18, onde: 0.45, centro: [CX, 0, CZ], raggioLuce: 22 });
  const piena = new THREE.Mesh(new THREE.CircleGeometry(22.9, 160).rotateX(-Math.PI / 2), marea.materiale);
  piena.position.set(CX, DELTA.fondo, CZ);
  piena.visible = false;
  kit.scena.add(piena);
  kit.luce({ x: CX, y: DELTA.fondo + 1.2, z: CZ, colore: CIANO, intensita: 14, portata: 17 });
  return { acqua, marea, piena, forzaFondo };
}

function costruisciMuro(kit, m, caso) {
  const b = costruttore();
  const inizio = PASSAGGIO.a + PASSAGGIO.mezzo;
  const fine = PASSAGGIO.a + Math.PI * 2 - PASSAGGIO.mezzo;
  const boc = BOCCAPORTI.map(o => ({ ...o, c: o.a < inizio ? o.a + Math.PI * 2 : o.a })).sort((p, q) => p.c - q.c);
  const pieni = [];
  const architravi = [];
  let cursore = inizio;
  for (const o of boc) {
    pieni.push([cursore, o.c - o.mezzo]);
    architravi.push([o.c - o.mezzo, o.c + o.mezzo, o.alto]);
    cursore = o.c + o.mezzo;
  }
  pieni.push([cursore, fine]);
  for (const [a0, a1] of pieni) anelloSolido(b, { r0: MURO.r0, r1: MURO.r1, a0, a1, y0: MURO.y0, y1: MURO.y1, sopra: false, lati: true });
  for (const [a0, a1, alto] of architravi) anelloSolido(b, { r0: MURO.r0, r1: MURO.r1, a0, a1, y0: alto, y1: MURO.y1, sopra: false, sotto: true });
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(b.geometria(false), 0.9));
  const trave = costruttore();
  anelloSolido(trave, { r0: MURO.r0 - 0.15, r1: MURO.r1 + 0.12, a0: 0, a1: Math.PI * 2, y0: MURO.y1, y1: BASE_CUPOLA, sotto: true });
  anelloSolido(trave, { r0: MURO.r0 - 0.02, r1: MURO.r0, a0: inizio, a1: fine, y0: -0.05, y1: 0.18, sopra: true, fuori: false });
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(trave.geometria(false), 1.2));
  const fregi = [];
  for (const [a0, a1] of [...pieni, ...architravi.map(([a, c]) => [a, c])]) fregi.push(nastro(MURO.r0 - 0.012, a0, a1, 3.3, 3.78, true));
  kit.lotto(m.fregio, SETTORE).aggiungi(mergeGeometries(fregi));
  const marmo = [];
  const oro = [];
  const evita = [PASSAGGIO.a, ...BOCCAPORTI.map(o => o.a), ...ANGOLI_MURALI, ...TENTACOLI.map(t => t.muro)];
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2 + Math.PI / 24;
    if (evita.some(e => Math.abs(differenza(a, e)) < 0.13)) continue;
    if (differenza(a, ORGANO.da) > -0.05 && differenza(a, ORGANO.a) < 0.05) continue;
    const r = MURO.r0 - 0.11;
    const posa = g => g.translate(r, 0, 0).rotateY(-a).translate(CX, 0, CZ);
    marmo.push(posa(new THREE.BoxGeometry(0.24, 4.1, 0.5).translate(0, 0.05 + 2.05, 0)));
    marmo.push(posa(new THREE.BoxGeometry(0.3, 0.3, 0.62).translate(-0.03, 0.15, 0)));
    marmo.push(posa(new THREE.BoxGeometry(0.32, 0.28, 0.66).translate(-0.04, 4.3, 0)));
    oro.push(posa(new THREE.BoxGeometry(0.26, 0.04, 0.54).translate(0, 4.14, 0)));
  }
  for (const s of [-1, 1]) {
    const a = PASSAGGIO.a + s * (PASSAGGIO.mezzo + 0.022);
    const posa = g => g.translate(MURO.r0 - 0.2, 0, 0).rotateY(-a).translate(CX, 0, CZ);
    marmo.push(posa(new THREE.BoxGeometry(0.45, MURO.y1, 1.0).translate(0, MURO.y1 / 2, 0)));
    oro.push(posa(new THREE.BoxGeometry(0.47, 0.06, 1.02).translate(0, MURO.y1 - 0.4, 0)));
  }
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(marmo), 0.9));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  const lampade = [];
  for (const a of [0.42, 2.05, -0.4, -2.62]) {
    const p = polare(MURO.r0 - 0.3, a, 3.0);
    lampade.push(new THREE.SphereGeometry(0.11, 12, 8).translate(p.x, p.y, p.z));
    kit.luce({ x: p.x, y: p.y, z: p.z, colore: 0xffb060, intensita: 4, portata: 8, tremola: true });
  }
  kit.lotto(kit.mat.luceCalda, SETTORE).aggiungi(unisciPiatte(lampade));
  kit.luce({ x: CX - 22.6, y: 3.6, z: CZ, colore: 0x5fd8ff, intensita: 5, portata: 8 });
}

function costruisciCupola(kit, m) {
  const sfera = new THREE.SphereGeometry(RAGGIO_SFERA, 128, 44, 0, Math.PI * 2, 0, THETA_BASE).translate(CX, CENTRO_SFERA_Y, CZ);
  const vetro = new THREE.Mesh(sfera, m.vetro);
  vetro.renderOrder = 2;
  kit.scena.add(vetro);
  const S = (theta, a, r) => new THREE.Vector3(CX + Math.sin(theta) * Math.cos(a) * r, CENTRO_SFERA_Y + Math.cos(theta) * r, CZ + Math.sin(theta) * Math.sin(a) * r);
  const b = costruttore();
  const passi = 30;
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    const t = tangente(a).multiplyScalar(0.15);
    for (let i = 0; i < passi; i++) {
      const th0 = tra(0.1, THETA_BASE, i / passi);
      const th1 = tra(0.1, THETA_BASE, (i + 1) / passi);
      const o0 = S(th0, a, RAGGIO_SFERA + 0.04);
      const o1 = S(th1, a, RAGGIO_SFERA + 0.04);
      const d0 = S(th0, a, RAGGIO_SFERA - 0.45);
      const d1 = S(th1, a, RAGGIO_SFERA - 0.45);
      const centro = new THREE.Vector3(CX, CENTRO_SFERA_Y, CZ);
      const dentro = centro.clone().sub(d0);
      b.quad([d0.clone().sub(t), d1.clone().sub(t), d1.clone().add(t), d0.clone().add(t)], dentro);
      b.quad([o0.clone().sub(t), o1.clone().sub(t), o1.clone().add(t), o0.clone().add(t)], dentro.clone().negate());
      b.quad([o0.clone().sub(t), o1.clone().sub(t), d1.clone().sub(t), d0.clone().sub(t)], t.clone().negate());
      b.quad([o0.clone().add(t), o1.clone().add(t), d1.clone().add(t), d0.clone().add(t)], t);
    }
  }
  const anelli = [];
  for (const th of [0.35, 0.7, 1.0]) {
    const r = RAGGIO_SFERA - 0.22;
    anelli.push(new THREE.TorusGeometry(Math.sin(th) * r, 0.22, 6, 128).rotateX(Math.PI / 2).translate(CX, CENTRO_SFERA_Y + Math.cos(th) * r, CZ));
  }
  anelli.push(new THREE.TorusGeometry(Math.sin(0.1) * RAGGIO_SFERA, 0.32, 10, 64).rotateX(Math.PI / 2).translate(CX, CENTRO_SFERA_Y + Math.cos(0.1) * RAGGIO_SFERA, CZ));
  anelli.push(new THREE.SphereGeometry(2.6, 32, 10, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 1).translate(CX, DELTA.altezza - 0.1, CZ));
  anelli.push(new THREE.ConeGeometry(0.22, 2.6, 10).translate(CX, DELTA.altezza + 2.6, CZ));
  anelli.push(new THREE.SphereGeometry(0.4, 16, 12).translate(CX, DELTA.altezza + 1.45, CZ));
  for (const c of CANNE) {
    const rh = Math.hypot(c.x - CX, c.z - CZ);
    const y = CENTRO_SFERA_Y + Math.sqrt(RAGGIO_SFERA ** 2 - rh ** 2);
    const n = new THREE.Vector3(c.x - CX, y - CENTRO_SFERA_Y, c.z - CZ).normalize();
    const collare = new THREE.TorusGeometry(RAGGIO_CANNA + 0.18, 0.13, 8, 40);
    collare.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n));
    anelli.push(collare.translate(c.x, y, c.z));
  }
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(unisciPiatte([b.geometria(false), ...anelli]), 1), null, { ombra: true });
  const oceano = new THREE.Mesh(new THREE.CircleGeometry(42, 64).rotateX(Math.PI / 2).translate(CX, 46, CZ), new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uCaustica: kit.uniformi.uCaustica, uForzaCaustica: kit.uniformi.uForzaCaustica },
    vertexShader: `
      varying vec3 vMondo;
      void main() {
        vec4 mondo = modelMatrix * vec4(position, 1.0);
        vMondo = mondo.xyz;
        gl_Position = projectionMatrix * viewMatrix * mondo;
      }`,
    fragmentShader: `
      ${CAUSTICHE_GLSL}
      void main() {
        float r = length(vMondo.xz - vec2(${CX.toFixed(1)}, ${CZ.toFixed(1)})) / 42.0;
        float bordo = 1.0 - smoothstep(0.3, 1.0, r);
        float c = causticaAbisso(vMondo.xz * 0.045 * 6.2831, uTempo * 0.28) * 0.7 + causticaAbisso(vMondo.xz * 0.1 + 2.0, uTempo * 0.2) * 0.3;
        vec3 col = (uCaustica * 0.7 + vec3(0.04, 0.1, 0.12)) * min(c, 1.0) * 0.18 * bordo + vec3(0.003, 0.02, 0.032) * bordo;
        gl_FragColor = vec4(col, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  kit.scena.add(oceano);
  kit.luce({ x: CX, y: 17, z: CZ + 1, colore: 0xa8ecff, intensita: 24, portata: 34, ombra: true, mira: { x: CX, y: DELTA.fondo, z: CZ } });
  return { vetro };
}

function materialeCanne(kit) {
  const impulsi = { value: new Array(5).fill(-100) };
  const rossi = { value: new Array(5).fill(-100) };
  const attivo = { value: 0.4 };
  const materiale = new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uImpulsi: impulsi, uRossi: rossi, uAttivo: attivo },
    vertexShader: `
      attribute float aCanna;
      uniform float uTempo;
      uniform float uImpulsi[5];
      uniform float uRossi[5];
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vImpulso;
      varying float vRosso;
      varying float vDecoro;
      void main() {
        int i = int(max(aCanna, 0.0) + 0.5);
        vDecoro = aCanna < 0.0 ? 1.0 : 0.0;
        vImpulso = aCanna < 0.0 ? 100.0 : uTempo - uImpulsi[i];
        vRosso = aCanna < 0.0 ? 100.0 : uTempo - uRossi[i];
        vec4 mondo = modelMatrix * vec4(position, 1.0);
        vPos = mondo.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = cameraPosition - mondo.xyz;
        gl_Position = projectionMatrix * viewMatrix * mondo;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uAttivo;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vImpulso;
      varying float vRosso;
      varying float vDecoro;
      ${RUMORE_GLSL}
      void main() {
        float bolle = smoothstep(0.5, 0.85, rumoreAb(vec3(vPos.x * 5.0, vPos.y * 2.2 - uTempo * 2.6, vPos.z * 5.0)));
        float bolle2 = smoothstep(0.55, 0.9, rumoreAb(vec3(vPos.x * 9.0 + 3.0, vPos.y * 4.0 - uTempo * 4.2, vPos.z * 9.0)));
        float onde = 0.5 + 0.5 * sin(vPos.y * 0.9 - uTempo * 1.4 + rumoreAb(vPos * 0.3) * 2.0);
        float fres = pow(max(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0), 1.5);
        vec3 col = vec3(0.02, 0.14, 0.2) + vec3(0.1, 0.55, 0.75) * (0.25 + 0.75 * onde) * uAttivo * (1.0 - vDecoro * 0.45);
        col += vec3(0.45, 1.0, 1.25) * (bolle * 0.6 + bolle2 * 0.45) * (0.35 + uAttivo);
        float t = vImpulso;
        if (t >= 0.0 && t < 3.0) {
          float banda = exp(-pow(vPos.y - (1.0 + t * 11.0), 2.0) * 0.12);
          col += vec3(0.6, 1.8, 2.4) * (banda * 2.6 + exp(-t * 2.5) * 1.2) * (1.0 - t / 3.0);
        }
        float r = vRosso;
        if (r >= 0.0 && r < 1.5) col = mix(col, vec3(2.4, 0.15, 0.1) * (0.6 + 0.4 * sin(uTempo * 60.0)), 1.0 - r / 1.5);
        col *= 0.75 + 0.55 * fres;
        gl_FragColor = vec4(col, 1.0);
        ${USCITA_GLSL}
      }`,
  });
  return { materiale, impulsi, rossi, attivo };
}

function costruisciOrgano(kit, m, glifi) {
  const ottone = [];
  const cristallo = [];
  const acqua = [];
  const scuro = [];
  const oro = [];
  const caldo = [];
  const conCanna = (g, k) => {
    const n = g.index ? g.toNonIndexed() : g;
    n.setAttribute('aCanna', new THREE.BufferAttribute(new Float32Array(n.attributes.position.count).fill(k), 1));
    for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'aCanna'].includes(nome)) n.deleteAttribute(nome);
    return n;
  };
  const tuboCanna = (x, z, base, alto, r, k) => {
    cristallo.push(new THREE.CylinderGeometry(r, r, alto - base, 32, 1, true).translate(x, (base + alto) / 2, z));
    acqua.push(conCanna(new THREE.CylinderGeometry(r * 0.84, r * 0.84, alto - base - 0.3, 20, 1, false).translate(x, (base + alto - 0.3) / 2 + 0.1, z), k));
  };
  CANNE.forEach((c, k) => {
    const H = ALTEZZE_CANNE[k];
    const verso = versoCentro(c);
    const giro = Math.atan2(verso.x, verso.z);
    ottone.push(new THREE.CylinderGeometry(0.84, 0.86, 0.35, 32).translate(c.x, 0.175, c.z));
    ottone.push(new THREE.TorusGeometry(0.84, 0.06, 8, 40).rotateX(Math.PI / 2).translate(c.x, 0.35, c.z));
    ottone.push(torno([[0.3, 0.35], [0.36, 0.9], [0.5, 1.6], [0.66, 2.1], [0.75, 2.3]], 32, 3).translate(c.x, 0, c.z));
    const posa = (g, avanti, y) => g.rotateY(giro).translate(c.x + verso.x * avanti, y, c.z + verso.z * avanti);
    scuro.push(posa(new THREE.BoxGeometry(0.62, 0.5, 0.08), 0.69, 2.62));
    ottone.push(posa(new THREE.BoxGeometry(0.8, 0.09, 0.2), 0.7, 2.93));
    tuboCanna(c.x, c.z, 2.3, H, RAGGIO_CANNA, k);
    for (let y = 3.6; y < H - 0.9; y += 2.4) ottone.push(new THREE.TorusGeometry(RAGGIO_CANNA + 0.03, 0.065, 6, 24).rotateX(Math.PI / 2).translate(c.x, y, c.z));
    for (const y of [2.32, H - 0.3]) ottone.push(new THREE.TorusGeometry(RAGGIO_CANNA + 0.05, 0.11, 6, 28).rotateX(Math.PI / 2).translate(c.x, y, c.z));
    ottone.push(torno([[0.72, 0], [0.8, 0.25], [0.95, 0.55], [1.0, 0.68], [0.93, 0.66], [0.76, 0.42]], 32, 2).translate(c.x, H, c.z));
    for (let q = 0; q < 6; q++) {
      const a = (q / 6) * Math.PI * 2;
      oro.push(new THREE.ConeGeometry(0.07, 0.55, 6).translate(c.x + Math.cos(a) * 0.95, H + 0.95, c.z + Math.sin(a) * 0.95));
    }
    ottone.push(posa(new THREE.CylinderGeometry(0.6, 0.6, 0.08, 40).rotateX(Math.PI / 2), 0.98, 3.75));
    ottone.push(posa(new THREE.BoxGeometry(0.16, 0.16, 0.3), 0.82, 3.75));
    oro.push(posa(new THREE.TorusGeometry(0.6, 0.04, 6, 40), 1.02, 3.75));
    glifi.aggiungi(new THREE.Vector3(c.x + verso.x * 1.035, 3.75, c.z + verso.z * 1.035), verso, 0.98, SLOT.canne + k);
  });
  const decoro = (r, a, alto, raggio) => {
    const p = polare(r, a, 0);
    ottone.push(new THREE.CylinderGeometry(raggio, 0.07, 0.8, 16).translate(p.x, 0.4, p.z));
    tuboCanna(p.x, p.z, 0.8, alto, raggio, -1);
    ottone.push(new THREE.TorusGeometry(raggio + 0.02, 0.035, 4, 14).rotateX(Math.PI / 2).translate(p.x, alto, p.z));
    ottone.push(new THREE.TorusGeometry(raggio + 0.02, 0.03, 4, 14).rotateX(Math.PI / 2).translate(p.x, tra(0.8, alto, 0.5), p.z));
  };
  for (let a = ORGANO.da + 0.06; a <= ORGANO.a - 0.06 + 1e-6; a += 0.05) {
    const s = Math.abs(a + Math.PI / 2) / 0.58;
    decoro(23.3, a, 3.2 + 3.6 * Math.cos(s * Math.PI * 0.5) ** 1.5, 0.15 + 0.13 * (1 - s));
  }
  for (const lato of [-1, 1]) {
    for (let q = 0; q < 5; q++) {
      const a = -Math.PI / 2 + lato * (0.37 + q * 0.05);
      decoro(22.75, a, 7.4 - q * 0.6, 0.3 - q * 0.025);
    }
  }
  const da = -Math.PI / 2 - 0.33;
  const lunghezza = 0.66;
  for (const y of [6.4, 11.4]) {
    ottone.push(new THREE.TorusGeometry(21.7 + RAGGIO_CANNA + 0.1, 0.1, 5, 64, lunghezza).rotateX(Math.PI / 2).rotateY(-da).translate(CX, y, CZ));
    ottone.push(new THREE.TorusGeometry(21.7 + RAGGIO_CANNA + 0.1, 0.06, 4, 64, lunghezza).rotateX(Math.PI / 2).rotateY(-da).translate(CX, y + 0.32, CZ));
  }
  const cassa = costruttore();
  anelloSolido(cassa, { r0: 22.55, r1: 23.9, a0: ORGANO.da, a1: ORGANO.a, y0: -0.05, y1: 0.95, fuori: false, lati: true });
  ottone.push(cassa.geometria(false));
  for (const a of [-Math.PI / 2 - 0.2, -Math.PI / 2, -Math.PI / 2 + 0.2]) {
    const p = polare(22.53, a, 0.55);
    const verso = versoCentro(p);
    const giro = Math.atan2(verso.x, verso.z);
    ottone.push(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 20).rotateX(Math.PI / 2).rotateY(giro).translate(p.x, p.y, p.z));
    caldo.push(new THREE.CircleGeometry(0.13, 16).rotateY(giro).translate(p.x + verso.x * 0.045, p.y, p.z + verso.z * 0.045));
  }
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(ottone), 1.2), null, { ombra: true });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(kit.mat.gomma, SETTORE).aggiungi(unisciPiatte(scuro));
  kit.lotto(kit.mat.luceCalda, SETTORE).aggiungi(unisciPiatte(caldo));
  kit.lotto(m.cristallo, SETTORE).aggiungi(unisciPiatte(cristallo));
  const canne = materialeCanne(kit);
  const mesh = new THREE.Mesh(mergeGeometries(acqua), canne.materiale);
  kit.scena.add(mesh);
  const stato = { forza: 3 };
  kit.luce({ x: CX, y: 5, z: CZ - 19.5, colore: 0x5fe0ff, intensita: 10, portata: 16, forza: () => stato.forza });
  return { canne, stato };
}

function costruisciConsolle(kit, m, glifi) {
  const yb = quotaDelta(52, -63.9);
  const marmo = [scatola(49.3, yb - 0.1, -64.7, 54.7, yb + 0.3, -63.1)];
  const ottone = [scatola(49.45, yb + 0.3, -64.6, 54.55, yb + 1.0, -63.35)];
  const scuro = [scatola(49.75, yb + 0.4, -63.37, 54.25, yb + 0.92, -63.33)];
  const oro = [scatola(49.42, yb + 0.98, -64.62, 54.58, yb + 1.02, -63.33), scatola(49.42, yb + 0.28, -64.62, 54.58, yb + 0.32, -63.33)];
  const bianchi = [];
  const neri = [];
  for (let q = 0; q < 3; q++) {
    const zf = -63.32 - q * 0.24;
    const y = yb + 1.02 + q * 0.1;
    scuro.push(scatola(49.95, y - 0.06, zf - 0.3, 54.05, y, zf));
    for (let k = 0; k < 36; k++) {
      const x = 50.0 + k * 0.111;
      bianchi.push(scatola(x + 0.004, y, zf - 0.25, x + 0.107, y + 0.022, zf));
      if ([0, 1, 3, 4, 5].includes(k % 7) && k < 35) neri.push(scatola(x + 0.08, y + 0.022, zf - 0.25, x + 0.142, y + 0.05, zf - 0.1));
    }
  }
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? 49.45 : 54.1;
    ottone.push(scatola(x0, yb + 1.0, -64.6, x0 + 0.45, yb + 1.75, -63.55));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = x0 + 0.1 + c * 0.125;
        const y = yb + 1.15 + r * 0.2;
        marmo.push(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10).rotateX(Math.PI / 2).translate(x, y, -63.52));
      }
    }
  }
  ottone.push(scatola(50.3, yb + 1.25, -64.6, 53.7, yb + 2.05, -64.5));
  oro.push(scatola(50.25, yb + 2.03, -64.62, 53.75, yb + 2.08, -64.48));
  for (const x of [51.0, 52.0, 53.0]) ottone.push(tubo([new THREE.Vector3(x, yb + 0.25, -64.6), new THREE.Vector3(x, 0.15, -65.4), new THREE.Vector3(x, 0.3, -66.6)], 0.07, { segmenti: 12, radiali: 8 }));
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(marmo), 1));
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(ottone), 1.2), null, { ombra: true });
  kit.lotto(kit.mat.gomma, SETTORE).aggiungi(unisciPiatte(scuro));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(m.tastiBianchi, SETTORE).aggiungi(unisciPiatte(bianchi));
  kit.lotto(m.tastiNeri, SETTORE).aggiungi(unisciPiatte(neri));
  for (let q = 0; q < 5; q++) glifi.aggiungi(new THREE.Vector3(50.9 + q * 0.55, yb + 1.68, -64.48), new THREE.Vector3(0, 0, 1), 0.42, SLOT.spie + q);
  kit.luce({ x: 52, y: yb + 2.2, z: -62.6, colore: 0xffb060, intensita: 4, portata: 7 });
}

function costruisciColonne(kit, m, glifi, bagliori) {
  const marmo = [];
  const scuro = [];
  const oro = [];
  COLONNE_SIMBOLI.forEach((c, j) => {
    const yb = quotaDelta(c.x, c.z);
    const verso = versoCentro(c);
    const giro = Math.atan2(verso.x, verso.z);
    const M = matrice(c.x, 0, c.z, { ry: giro });
    const posa = g => g.applyMatrix4(M);
    scuro.push(posa(scatola(-0.65, yb - 0.1, -0.65, 0.65, yb + 0.7, 0.65)));
    oro.push(posa(scatola(-0.6, yb + 0.68, -0.6, 0.6, yb + 0.74, 0.6)));
    marmo.push(posa(new THREE.TorusGeometry(0.46, 0.075, 8, 32).rotateX(Math.PI / 2).translate(0, yb + 0.82, 0)));
    marmo.push(posa(fusto(kit.rumore, 0.42, 0.37, 3.3, { radiali: 64, scanalature: 12, seme: j * 4.1 }).translate(0, yb + 0.8, 0)));
    bagliori.aggiungi(posa(new THREE.CylinderGeometry(0.43, 0.43, 0.1, 32).translate(0, yb + 2.4, 0)), j);
    marmo.push(posa(torno([[0.37, 0], [0.42, 0.08], [0.55, 0.22], [0.62, 0.3], [0.0, 0.31]], 32, 2).translate(0, yb + 4.1, 0)));
    scuro.push(posa(scatola(-0.62, yb + 4.4, -0.62, 0.62, yb + 4.58, 0.62)));
    scuro.push(posa(scatola(-0.12, yb + 4.58, -0.08, 0.12, yb + 4.75, 0.08)));
    marmo.push(posa(new THREE.CylinderGeometry(0.6, 0.6, 0.16, 40).rotateX(Math.PI / 2).translate(0, yb + 5.35, 0)));
    oro.push(posa(new THREE.TorusGeometry(0.6, 0.055, 8, 40).translate(0, yb + 5.35, 0)));
    bagliori.aggiungi(posa(new THREE.OctahedronGeometry(0.17, 0).scale(1, 2.1, 1).translate(0, yb + 6.3, 0)), j);
    oro.push(posa(new THREE.CylinderGeometry(0.05, 0.08, 0.3, 8).translate(0, yb + 5.98, 0)));
    const centro = new THREE.Vector3(0, yb + 5.35, 0.088).applyMatrix4(M);
    const retro = new THREE.Vector3(0, yb + 5.35, -0.088).applyMatrix4(M);
    glifi.aggiungi(centro, verso, 1.0, SLOT.colonne + j);
    glifi.aggiungi(retro, verso.clone().negate(), 1.0, SLOT.retro + j);
    kit.luce({ x: c.x + verso.x * 1.4, y: yb + 4.8, z: c.z + verso.z * 1.4, colore: CIANO, intensita: 9, portata: 9, attiva: () => statoColonne[j] > 0.05, forza: () => statoColonne[j] * 9 });
  });
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(marmo), 0.9), null, { ombra: true });
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(scuro), 1));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
}

const statoColonne = [0, 0, 0, 0, 0];
const statoPiloni = [0, 0, 0, 0];

function costruisciPiloni(kit, m, bagliori) {
  const ottone = [];
  const rame = [];
  const ceramica = [];
  const cime = [];
  PILONI.forEach((p, k) => {
    const yb = quotaDelta(p.x, p.z);
    ottone.push(new THREE.CylinderGeometry(0.5, 0.55, 0.5, 28).translate(p.x, yb + 0.25, p.z));
    ottone.push(new THREE.TorusGeometry(0.52, 0.05, 8, 32).rotateX(Math.PI / 2).translate(p.x, yb + 0.5, p.z));
    for (let q = 0; q < 10; q++) {
      const a = (q / 10) * Math.PI * 2;
      ottone.push(new THREE.SphereGeometry(0.035, 6, 4).translate(p.x + Math.cos(a) * 0.53, yb + 0.15, p.z + Math.sin(a) * 0.53));
    }
    rame.push(new THREE.CylinderGeometry(0.27, 0.27, 2.25, 24).translate(p.x, yb + 0.5 + 1.125, p.z));
    const elica = [];
    const giri = 13;
    for (let q = 0; q <= giri * 12; q++) {
      const a = (q / 12) * Math.PI * 2;
      elica.push(new THREE.Vector3(p.x + Math.cos(a) * 0.32, yb + 0.62 + (q / (giri * 12)) * 2.0, p.z + Math.sin(a) * 0.32));
    }
    rame.push(tubo(elica, 0.03, { segmenti: giri * 12, radiali: 4, tappi: false }));
    for (let q = 0; q < 4; q++) ceramica.push(torno([[0.1, 0], [0.34, 0.05], [0.38, 0.11], [0.32, 0.16], [0.1, 0.2]], 28, 2).translate(p.x, yb + 2.75 + q * 0.2, p.z));
    ottone.push(new THREE.CylinderGeometry(0.1, 0.12, 0.5, 12).translate(p.x, yb + 3.8, p.z));
    ottone.push(new THREE.TorusGeometry(0.6, 0.19, 10, 32).rotateX(Math.PI / 2).translate(p.x, yb + 3.85, p.z));
    bagliori.aggiungi(new THREE.TorusGeometry(0.38, 0.045, 8, 32).rotateX(Math.PI / 2).translate(p.x, yb + 3.85, p.z), 5 + k);
    bagliori.aggiungi(new THREE.SphereGeometry(0.24, 20, 14).translate(p.x, yb + 4.28, p.z), 5 + k);
    for (let q = 0; q < 4; q++) {
      const a = (q / 4) * Math.PI * 2 + Math.PI / 4;
      bagliori.aggiungi(new THREE.BoxGeometry(0.04, 1.9, 0.04).translate(p.x + Math.cos(a) * 0.37, yb + 1.65, p.z + Math.sin(a) * 0.37), 5 + k);
    }
    cime.push({ sfera: new THREE.Vector3(p.x, yb + 4.28, p.z), anello: yb + 3.85, base: yb, p });
    kit.luce({ x: p.x, y: yb + 4.6, z: p.z, colore: 0x7fe8ff, intensita: 7, portata: 9, attiva: () => statoPiloni[k] > 0.05, forza: (v, t) => statoPiloni[k] * (6 + Math.sin(t * 31 + k) * 2) });
  });
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(ottone), 1.2), null, { ombra: true });
  kit.lotto(kit.mat.rame, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(rame), 1.5));
  kit.lotto(m.ceramica, SETTORE).aggiungi(unisciPiatte(ceramica));
  return cime;
}

function costruisciTentacoli(kit, m, caso) {
  const corpo = [];
  const ventose = [];
  const coralli = [];
  for (const t of TENTACOLI) {
    const chiave = [[25.8, 2.4], [24.3, 4.7], [22.2, 7.2], [19.2, 9.1], [16.1, 9.5], [13.3, 8.0], [11.1, 4.8], [9.75, 0.9], [9.1, -2.6], [8.8, -6.2]];
    const punti = chiave.map(([r, y], i) => {
      const f = i / (chiave.length - 1);
      const a = tra(t.muro, t.vasca, liscia(0, 1, f)) + Math.sin(f * Math.PI * 2) * 0.05 * t.onda;
      return polare(r, a, y);
    });
    const raggio = s => 0.22 + 1.08 * Math.pow(1 - s, 0.85);
    corpo.push(tubo(punti, s => raggio(s) * (1 + 0.05 * Math.sin(s * 95)), { segmenti: 120, radiali: 24 }));
    const curva = new THREE.CatmullRomCurve3(punti);
    for (let s = 0.06; s < 0.93; s += 0.028) {
      const c = curva.getPointAt(s);
      const tan = curva.getTangentAt(s);
      const rif = versoCentro(c).multiplyScalar(0.6).add(GIU).normalize();
      const sotto = rif.sub(tan.clone().multiplyScalar(rif.dot(tan))).normalize();
      const fianco = new THREE.Vector3().crossVectors(tan, sotto).normalize();
      for (const lato of [-1, 1]) {
        const dir = sotto.clone().multiplyScalar(Math.cos(0.55)).addScaledVector(fianco, Math.sin(0.55) * lato).normalize();
        const r = raggio(s);
        const rs = r * 0.27;
        const pos = c.clone().addScaledVector(dir, r * 0.93);
        const anello = new THREE.TorusGeometry(rs, rs * 0.38, 4, 10);
        anello.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir));
        ventose.push(anello.translate(pos.x, pos.y, pos.z));
      }
    }
    for (let q = 0; q < 4; q++) {
      const s = 0.12 + q * 0.16 + caso() * 0.05;
      const c = curva.getPointAt(s);
      const base = c.clone().add(new THREE.Vector3(0, raggio(s) * 0.85, 0));
      const rami = [];
      ramoCorallo(caso, base, new THREE.Vector3((caso() - 0.5) * 0.5, 1, (caso() - 0.5) * 0.5).normalize(), 0.3 + caso() * 0.2, 0.06, 0, rami, q % 2 ? {} : { punta: [0.3, 1, 1], corpo: [0.16, 0.2, 0.3] });
      coralli.push(...rami);
    }
  }
  const g = kit.deforma(unisci(corpo), { ampiezza: 0.11, frequenza: 0.85, ottave: 4, seme: 17 });
  kit.lotto(kit.mat.roccia, SETTORE).aggiungi(kit.uvMetri(g, 0.7), null, { ombra: true });
  kit.lotto(kit.mat.pietra, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(ventose), 1.5));
  return coralli;
}

function costruisciRadici(kit, m, caso, coralli) {
  const radici = [];
  for (const a0 of RADICI) {
    const vicinoPilone = PILONI.some(p => Math.abs(differenza(angoloDi(p), a0)) < 0.3);
    const fine = vicinoPilone ? 16.9 : 13.2 + caso() * 2.5;
    const deriva = (caso() - 0.5) * 0.02;
    const seme = caso() * 10;
    const punti = [];
    for (let r = 23.9; r > fine; r -= 0.3) {
      const a = a0 + Math.sin(r * 0.45 + seme) * 0.05 + (23.9 - r) * deriva;
      const p = polare(r, a, 0);
      const s = (23.9 - r) / (23.9 - fine);
      p.y = quotaDelta(p.x, p.z) + (0.17 * (1 - s) + 0.04) * 0.4;
      punti.push(p);
    }
    if (punti.length < 4) continue;
    const g = tubo(punti, s => 0.17 * (1 - s) + 0.04, { segmenti: punti.length * 3, radiali: 7 });
    const colorata = colora(g, v => {
      const r = Math.hypot(v.x - CX, v.z - CZ);
      return r < fine + 0.7 ? [0.35, 1, 1] : [0.38, 0.1, 0.26];
    });
    radici.push(colorata);
    for (const f of [0.3, 0.6]) {
      const i = Math.floor(punti.length * f);
      const da = punti[i];
      const lato = tangente(angoloDi(da)).multiplyScalar(caso() < 0.5 ? -1 : 1);
      const ramo = [da.clone()];
      for (let q = 1; q <= 4; q++) {
        const p = da.clone().addScaledVector(lato, q * 0.35).add(new THREE.Vector3((caso() - 0.5) * 0.2, 0, (caso() - 0.5) * 0.2));
        p.y = quotaDelta(p.x, p.z) + 0.03;
        ramo.push(p);
      }
      radici.push(colora(tubo(ramo, s => 0.08 * (1 - s) + 0.025, { segmenti: 12, radiali: 6 }), (v, n) => (n > 50 ? [1, 0.35, 0.85] : [0.38, 0.1, 0.26])));
    }
    const base = polare(23.5, a0, 0.05);
    for (let q = 0; q < 1; q++) {
      const rami = [];
      ramoCorallo(caso, base.clone().add(new THREE.Vector3((caso() - 0.5) * 0.6, 0, (caso() - 0.5) * 0.6)), new THREE.Vector3((caso() - 0.5) * 0.4, 1, (caso() - 0.5) * 0.4).normalize(), 0.35 + caso() * 0.25, 0.07, 0, rami, q ? {} : { punta: [0.3, 1, 1], corpo: [0.16, 0.2, 0.3] });
      coralli.push(...rami);
    }
  }
  const tutti = [...radici, ...coralli].map(g => {
    const n = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'color'].includes(nome)) n.deleteAttribute(nome);
    if (!n.attributes.normal) n.computeVertexNormals();
    return n;
  });
  kit.lotto(m.corallo, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(tutti), 1));
}

function costruisciParticelle(kit, caso) {
  const d = kit.qualita?.densita ?? 1;
  const quante = n => Math.max(1, Math.round(n * d));
  const voci = [];
  for (let k = 0; k < quante(560); k++) {
    const a = caso() * Math.PI * 2;
    const r = Math.sqrt(caso()) * 21.5;
    voci.push({ x: CX + Math.cos(a) * r, y: tra(-1.5, 16, caso()), z: CZ + Math.sin(a) * r, tipo: 2, alto: 0.5 + caso() * 0.9, vita: 10, seme: caso() });
  }
  for (let k = 0; k < quante(60); k++) {
    const a = caso() * Math.PI * 2;
    const r = Math.sqrt(caso()) * 7.5;
    voci.push({ x: CX + Math.cos(a) * r, y: -12 - caso() * 6, z: CZ + Math.sin(a) * r, tipo: 1, alto: 8.4 + caso() * 6, vita: 4 + caso() * 4, seme: caso(), gruppo: 1 });
  }
  TANE_VASCA.forEach((t, i) => {
    const a = angoloDi(t);
    for (let k = 0; k < quante(14); k++) {
      const p = polare(8.6 + caso() * 0.5, a + (caso() - 0.5) * 0.12, DELTA.acqua);
      voci.push({ x: p.x, y: p.y, z: p.z, tipo: 1, alto: 0.4 + caso() * 1.2, vita: 0.9 + caso() * 0.9, seme: caso(), gruppo: 2 + i });
    }
  });
  for (let k = 0; k < quante(180); k++) {
    const a = caso() * Math.PI * 2;
    const r = Math.sqrt(caso()) * 30;
    voci.push({ x: CX + Math.cos(a) * r, y: tra(26, 44, caso()), z: CZ + Math.sin(a) * r, tipo: 3, alto: 10 + caso() * 6, vita: 16 + caso() * 12, seme: caso() });
  }
  return creaParticelle(kit, voci, { colori: [[0.5, 1.6, 2.2], [0.5, 0.9, 1.05], [0.4, 0.95, 0.85], [0.45, 0.7, 0.75], [0.6, 1.5, 2.0]] });
}

export function creaAnfiteatro(kit) {
  const caso = generatore(9931);
  const m = materiali(kit);
  const glifi = creaGlifi(kit);
  const bagliori = creaBagliori(kit);
  costruisciGradoni(kit, m, caso);
  const vasca = costruisciVasca(kit, m, caso);
  costruisciMuro(kit, m, caso);
  const cupola = costruisciCupola(kit, m);
  const organo = costruisciOrgano(kit, m, glifi);
  costruisciConsolle(kit, m, glifi);
  costruisciColonne(kit, m, glifi, bagliori);
  const piloni = costruisciPiloni(kit, m, bagliori);
  const coralli = costruisciTentacoli(kit, m, caso);
  costruisciRadici(kit, m, caso, coralli);
  glifi.chiudi();
  bagliori.chiudi();
  const fasci = creaFasci(kit, [
    { da: [CX + 3, 44, CZ - 4], a: [CX, DELTA.acqua, CZ], r0: 2.2, r1: 3.8 },
    { da: [CX - 7, 44, CZ + 2], a: [CX - 14, -1.9, CZ + 6], r0: 1.3, r1: 2.5 },
    { da: [CX + 9, 44, CZ + 6], a: [CX + 15, -1.5, CZ + 9], r0: 1.2, r1: 2.3 },
    { da: [CX + 2, 44, CZ - 11], a: [CX, 3, CZ - 20.5], r0: 1.5, r1: 3.0 },
    { da: [CX - 9, 44, CZ - 6], a: [CX - 17, -0.5, CZ - 9], r0: 1.1, r1: 2.1 },
    { da: [CX + 6, 44, CZ + 13], a: [CX + 8, -0.4, CZ + 19], r0: 1.1, r1: 2.1 },
  ], { settore: SETTORE, forza: 0.15 });
  const particelle = costruisciParticelle(kit, caso);
  const archi = creaArchi(kit, 360);

  const stato = { tempo: 0, allarme: 0, compiuto: 0, flash: [0, 0, 0, 0, 0], rossi: [0, 0, 0, 0, 0], lampi: [0, 0, 0, 0], anello: 0, tane: [0, 0, 0, 0], viste: new Set() };
  const BIANCO = new THREE.Color(0xffffff);
  const ROSSO = new THREE.Color(0xff2a1a);
  const AZZURRO = new THREE.Color(CIANO);
  const coloreCiano = new THREE.Vector3(0.25, 0.9, 1.25);
  const coloreRosso = new THREE.Vector3(1.6, 0.12, 0.08);
  const coloreOro = new THREE.Vector3(1.3, 0.95, 0.35);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  const anelloAcqua = (x, z, forza) => {
    for (const u of [vasca.acqua.uniformi, vasca.marea.uniformi]) u.uAnelli.value[stato.anello % 4].set(x, z, stato.tempo, forza);
    stato.anello++;
  };

  kit.suEvento(e => {
    if (e.k === 'notaOrgano' && e.canna >= 0 && e.canna < 5) {
      const c = CANNE[e.canna];
      if (e.giusta) {
        organo.canne.impulsi.value[e.canna] = stato.tempo;
        stato.flash[e.canna] = 1;
        anelloAcqua(CX, CZ, 0.9);
      } else {
        organo.canne.rossi.value[e.canna] = stato.tempo;
        stato.rossi[e.canna] = 1;
        kit.effetti?.fulmine([new THREE.Vector3(c.x, ALTEZZE_CANNE[e.canna] - 1, c.z), new THREE.Vector3(c.x + 0.4, 9, c.z), new THREE.Vector3(c.x - 0.3, 3.5, c.z), new THREE.Vector3(c.x, 0.4, c.z)], 0xff3020);
      }
    } else if (e.k === 'innoCompiuto') {
      stato.compiuto = 1;
      anelloAcqua(CX, CZ, 1.4);
    } else if (e.k === 'pilone' && piloni[e.indice]) {
      stato.lampi[e.indice] = 1;
      kit.effetti?.esplosione(piloni[e.indice].sfera.clone(), 'energia', 0x7fe8ff);
    }
  });

  kit.ogniFotogramma((vista, dt, tempo) => {
    stato.tempo = tempo;
    const ab = vista.abisso;
    const inno = ab?.inno;
    const attivo = ab?.passo === PASSO.INNO;
    const protocollo = ab?.protocollo && !ab?.completata ? 1 : 0;
    stato.allarme += (protocollo - stato.allarme) * Math.min(1, dt);
    stato.compiuto = Math.max(0, stato.compiuto - dt * 0.35);
    for (let k = 0; k < 5; k++) {
      stato.flash[k] = Math.max(0, stato.flash[k] - dt * 1.4);
      stato.rossi[k] = Math.max(0, stato.rossi[k] - dt * 1.2);
    }
    for (let k = 0; k < 4; k++) stato.lampi[k] = Math.max(0, stato.lampi[k] - dt * 1.6);

    const accese = [0, 0, 0, 0, 0];
    if (attivo && inno?.sequenza?.length === 5) {
      const ciclo = 5 * CICLO_NOTA + PAUSA_INNO;
      const t = tempo % ciclo;
      if (t < 5 * CICLO_NOTA) {
        const i = Math.floor(t / CICLO_NOTA);
        const fase = (t - i * CICLO_NOTA) / CICLO_NOTA;
        accese[inno.sequenza[i]] = liscia(0, 0.12, fase) * (1 - liscia(0.8, 1, fase));
      }
      for (let q = 0; q < Math.min(5, inno.progresso ?? 0); q++) accese[inno.sequenza[q]] = 1;
    }
    for (let j = 0; j < 5; j++) {
      const voluto = Math.max(accese[j], stato.compiuto);
      statoColonne[j] += (voluto - statoColonne[j]) * Math.min(1, dt * 12);
      const l = 0.12 + statoColonne[j] * 1.1;
      glifi.luce.value[SLOT.colonne + j] = l;
      glifi.luce.value[SLOT.retro + j] = l;
      glifi.simbolo.value[SLOT.colonne + j] = j;
      glifi.simbolo.value[SLOT.retro + j] = j;
      bagliori.luce.value[j] = 0.08 + statoColonne[j];
    }
    for (let k = 0; k < 5; k++) {
      glifi.simbolo.value[SLOT.canne + k] = inno?.canne?.[k] ?? k;
      glifi.luce.value[SLOT.canne + k] = (attivo ? 0.5 : 0.2) + stato.flash[k] * 1.4 + stato.rossi[k] * 1.4 + stato.compiuto;
      glifi.colore.value[SLOT.canne + k].copy(stato.rossi[k] > 0.05 ? coloreRosso : coloreCiano);
    }
    const progresso = inno?.progresso ?? 0;
    const fatto = (ab?.passo ?? 0) > PASSO.INNO;
    for (let q = 0; q < 5; q++) {
      glifi.simbolo.value[SLOT.spie + q] = 5;
      glifi.luce.value[SLOT.spie + q] = fatto ? 0.9 : q < progresso ? 1 : attivo ? 0.12 + 0.08 * Math.sin(tempo * 3 + q) : 0.04;
      glifi.colore.value[SLOT.spie + q].copy(fatto ? coloreOro : coloreCiano);
    }
    organo.canne.attivo.value = (attivo ? 0.75 : 0.4) + stato.compiuto * 0.6;
    organo.stato.forza = 2.5 + (attivo ? 2 : 0) + stato.flash.reduce((s, v) => s + v, 0) * 7 + stato.compiuto * 8;

    const lev = ab?.leviatano;
    for (let k = 0; k < 4; k++) {
      const carico = (lev?.piloni?.[k] ?? 0) > 0 ? 1 : 0;
      statoPiloni[k] += (Math.max(carico, stato.lampi[k]) - statoPiloni[k]) * Math.min(1, dt * 6);
      bagliori.luce.value[5 + k] = 0.06 + statoPiloni[k] * (0.85 + Math.sin(tempo * 37 + k) * 0.15) + stato.lampi[k] * 1.5;
    }
    const marea = lev?.marea ?? 0;
    vasca.piena.visible = marea > 0.002;
    vasca.piena.position.y = DELTA.fondo + (DELTA.marea - DELTA.fondo) * marea;
    vasca.forzaFondo.value = 0.85 + 0.15 * Math.sin(tempo * 0.8) + stato.compiuto;

    if (stato.viste.size > 400) stato.viste.clear();
    for (const z of vista.zombie ?? []) {
      if (z.stato !== 'emerge' || stato.viste.has(z.id)) continue;
      stato.viste.add(z.id);
      const i = TANE_VASCA.findIndex(t => Math.hypot(t.x - z.x, t.z - z.z) < 2.6);
      if (i < 0) continue;
      stato.tane[i] = 1;
      const ang = angoloDi(TANE_VASCA[i]);
      const p = polare(9.3, ang, DELTA.fondo + 1.1);
      kit.effetti?.ghiaccio(p);
      const w = polare(8.4, ang, 0);
      anelloAcqua(w.x, w.z, 0.7);
    }
    for (let i = 0; i < 4; i++) {
      stato.tane[i] = Math.max(0, stato.tane[i] - dt * 0.6);
      particelle.gruppi.value[2 + i] = 0.2 + stato.tane[i] * 2;
    }

    m.vetro.emissive.copy(AZZURRO).lerp(ROSSO, stato.allarme * (0.6 + 0.4 * Math.sin(tempo * 3.2)));
    m.vetro.emissiveIntensity = 0.3 + stato.allarme * 0.35;
    m.intarsi.value = 0.35 + (vista.corrente ? 0.65 : 0) + stato.compiuto;
    fasci.colore.value.copy(BIANCO).lerp(kit.uniformi.uCaustica.value, 0.55);

    archi.inizia(kit.camera?.position ?? a.set(CX, 0, CZ));
    piloni.forEach((c, k) => {
      const f = statoPiloni[k];
      if (f < 0.3) return;
      const quanti = stato.lampi[k] > 0.2 ? 4 : 2;
      for (let q = 0; q < quanti; q++) {
        const ang = Math.random() * Math.PI * 2;
        a.copy(c.sfera);
        b.set(c.p.x + Math.cos(ang) * 0.6, c.anello + (Math.random() - 0.5) * 0.2, c.p.z + Math.sin(ang) * 0.6);
        archi.fulmine(a, b, { colore: 0x8fe8ff, largo: 0.035, pezzi: 7, scarto: 0.22, forza: f });
      }
      if (Math.random() < 0.15 * f + stato.lampi[k]) {
        const ang = Math.random() * Math.PI * 2;
        a.set(c.p.x + Math.cos(ang) * 0.8, c.anello, c.p.z + Math.sin(ang) * 0.8);
        b.set(c.p.x + Math.cos(ang) * 1.6, c.base + 0.02, c.p.z + Math.sin(ang) * 1.6);
        archi.fulmine(a, b, { colore: 0x8fe8ff, largo: 0.04, pezzi: 9, scarto: 0.35, forza: f });
      }
    });
    CANNE.forEach((c, k) => {
      if (stato.rossi[k] < 0.05) return;
      for (let q = 0; q < 3; q++) {
        const y0 = 2.5 + Math.random() * 10;
        const ang = Math.random() * Math.PI * 2;
        a.set(c.x + Math.cos(ang) * 0.8, y0, c.z + Math.sin(ang) * 0.8);
        b.set(c.x + Math.cos(ang + 1.5) * 0.8, y0 + (Math.random() - 0.5) * 3, c.z + Math.sin(ang + 1.5) * 0.8);
        archi.fulmine(a, b, { colore: 0xff3a20, largo: 0.05, pezzi: 8, scarto: 0.4, forza: stato.rossi[k] });
      }
    });
    archi.chiudi();
  });
}
