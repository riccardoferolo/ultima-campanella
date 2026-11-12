import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SANTUARIO, COLONNE_SANTUARIO, STATUE, BRACIERI, OGGETTI, ACQUISTI, FINESTRE } from '../../mappe/abisso.js';
import { ARMI } from '../../regole.js';
import { modelloArma } from '../armi3d.js';
import { creaMeraviglia } from './armi3d.js';
import { conCaustiche, CAUSTICHE_GLSL } from './kit.js';

const SETTORE = 'gamma';
const F = SANTUARIO.fondo;
const CZ = (SANTUARIO.z0 + SANTUARIO.z1) / 2;
const VOLTA = Object.freeze({ fuori: 0.55, angolo: 3.2, base: -2.6, muro: 5.5, cima: 17, rx: 10.5, rz: 8 });
const SCUDO = Object.freeze({ y: 17.4, rx: 12.4, rz: 9.8, abbassa: 1.4 });
const CIELO_Y = 34;
const CORRIDOIO = Object.freeze({ x0: 21.5, x1: 28.2, z: -44, mezzo: 1.6, nicchia: 2.5, n0: 23, n1: 26.6, muro: 4, colmo: 5.5 });
const SCALA_STATUA = 0.95;
const BUCHI = Object.freeze([
  Object.freeze({ lato: 'sud', da: -1.75, a: 1.75, alto: 3.55 }),
  Object.freeze({ lato: 'est', da: -45.75, a: -42.25, alto: 3.85 }),
  Object.freeze({ lato: 'est', da: -53.2, a: -50.8, alto: 0.5 }),
  Object.freeze({ lato: 'ovest', da: -41.2, a: -38.8, alto: 0.5 }),
]);
const STELE = Object.freeze(ACQUISTI.filter(a => a.zona === 'santuario' && (a.tipo === 'arma' || a.tipo === 'bevanda')).map(a => Object.freeze({ x: a.posizione.x, z: a.posizione.z })));
const TANE = Object.freeze(FINESTRE.filter(f => f.tana && f.zona === 'santuario').map(f => f.centro));
const FINESTRE_ROCCIA = Object.freeze(FINESTRE.filter(f => f.zona === 'santuario' && !f.tana));
const POTENZIATORE = ACQUISTI.find(a => a.tipo === 'potenziatore').posizione;
const ALTARE = OGGETTI.ALTARE_NUCLEO;
const CONCHIGLIA = OGGETTI.CONCHIGLIA;
const TURBINA = Object.freeze({ x: -19.2, z: -44 });
const CIANO = 0x2fd0ff;

export const RUMORE_GLSL = `
vec3 rmMod(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 rmMod(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 rmPermuta(vec4 x) { return rmMod(((x * 34.0) + 10.0) * x); }
vec4 rmInv(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float rumoreAb(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = rmMod(i);
  vec4 p = rmPermuta(rmPermuta(rmPermuta(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  vec3 ns = 0.142857142857 * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 xa = floor(j * ns.z);
  vec4 ya = floor(j - 7.0 * xa);
  vec4 xb = xa * ns.x + ns.yyyy;
  vec4 yb = ya * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(xb) - abs(yb);
  vec4 b0 = vec4(xb.xy, yb.xy);
  vec4 b1 = vec4(xb.zw, yb.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norma = rmInv(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norma.x; p1 *= norma.y; p2 *= norma.z; p3 *= norma.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const USCITA_GLSL = `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`;

export const liscia = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export const tra = (a, b, t) => a + (b - a) * t;
const differenzaAngolo = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

export function generatore(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function matrice(x, y, z, { rx = 0, ry = 0, rz = 0, s = 1, sx = s, sy = s, sz = s } = {}) {
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), new THREE.Vector3(sx, sy, sz));
}

export function verso(g, da, a) {
  const d = new THREE.Vector3().subVectors(a, da);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()));
  return g.translate(da.x, da.y, da.z);
}

export function capsula(da, a, r, radiali = 16) {
  const l = da.distanceTo(a);
  return verso(new THREE.CapsuleGeometry(r, l, 5, radiali).translate(0, l / 2, 0), da, a);
}

export function cilindro(da, a, r0, r1 = r0, radiali = 16, aperto = false) {
  const l = da.distanceTo(a);
  return verso(new THREE.CylinderGeometry(r1, r0, l, radiali, 1, aperto).translate(0, l / 2, 0), da, a);
}

export function scatola(xa, ya, za, xb, yb, zb) {
  const [x0, x1] = [Math.min(xa, xb), Math.max(xa, xb)];
  const [y0, y1] = [Math.min(ya, yb), Math.max(ya, yb)];
  const [z0, z1] = [Math.min(za, zb), Math.max(za, zb)];
  return new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
}

export function soloPosizione(g) {
  const base = g.index ? g.toNonIndexed() : g;
  const s = new THREE.BufferGeometry();
  s.setAttribute('position', base.attributes.position.clone());
  return s;
}

export function unisci(parti) {
  return mergeVertices(mergeGeometries(parti.map(soloPosizione)), 1e-3);
}

export function uniscinative(parti) {
  return mergeGeometries(parti.map(p => {
    const n = p.index ? p.toNonIndexed() : p.clone();
    for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) n.deleteAttribute(nome);
    if (!n.attributes.normal) n.computeVertexNormals();
    if (!n.attributes.uv) n.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
    return n;
  }));
}

export function modella(g, fn) {
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    fn(v.fromBufferAttribute(p, i));
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

export function colora(g, fn) {
  const p = g.attributes.position;
  const c = new Float32Array(p.count * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    const [r, gg, b] = fn(v.fromBufferAttribute(p, i), i);
    c[i * 3] = r;
    c[i * 3 + 1] = gg;
    c[i * 3 + 2] = b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return g;
}

export function scalaUV(g, su, sv = su) {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  return g;
}

export function torno(punti, segmenti = 64, fitto = 3) {
  const curva = new THREE.SplineCurve(punti.map(([r, y]) => new THREE.Vector2(r, y)));
  return new THREE.LatheGeometry(curva.getPoints((punti.length - 1) * fitto), segmenti);
}

export function tubo(punti, raggio, { segmenti = 48, radiali = 12, tappi = true } = {}) {
  const curva = new THREE.CatmullRomCurve3(punti);
  const cornici = curva.computeFrenetFrames(segmenti, false);
  const pos = [];
  const indici = [];
  for (let i = 0; i <= segmenti; i++) {
    const t = i / segmenti;
    const c = curva.getPointAt(t);
    const r = typeof raggio === 'function' ? raggio(t) : raggio;
    const n = cornici.normals[i];
    const b = cornici.binormals[i];
    for (let j = 0; j < radiali; j++) {
      const a = (j / radiali) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      pos.push(c.x + (n.x * ca + b.x * sa) * r, c.y + (n.y * ca + b.y * sa) * r, c.z + (n.z * ca + b.z * sa) * r);
    }
  }
  for (let i = 0; i < segmenti; i++) {
    for (let j = 0; j < radiali; j++) {
      const j1 = (j + 1) % radiali;
      const a = i * radiali + j;
      const b = i * radiali + j1;
      const c = (i + 1) * radiali + j;
      const d = (i + 1) * radiali + j1;
      indici.push(a, b, d, a, d, c);
    }
  }
  if (tappi) {
    const inizio = curva.getPointAt(0);
    const fine = curva.getPointAt(1);
    const c0 = pos.length / 3;
    pos.push(inizio.x, inizio.y, inizio.z);
    const c1 = c0 + 1;
    pos.push(fine.x, fine.y, fine.z);
    const ultimo = segmenti * radiali;
    for (let j = 0; j < radiali; j++) {
      const j1 = (j + 1) % radiali;
      indici.push(c0, j1, j, c1, ultimo + j, ultimo + j1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

const FACCE = Object.freeze([[4, 5, 6, 7], [1, 0, 3, 2], [5, 1, 2, 6], [0, 4, 7, 3], [7, 6, 2, 3], [0, 1, 5, 4]]);

export function esaedro(c) {
  const pos = [];
  for (const [a, b, d, e] of FACCE) for (const k of [a, b, d, a, d, e]) pos.push(c[k].x, c[k].y, c[k].z);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

export function arcoAcuto(da, a, { alzata, spessore = 0.7, profondita = 1, conci = 17, fino = conci, fuga = 0.004, chiave = 0.25 }) {
  const dir = new THREE.Vector3(a.x - da.x, 0, a.z - da.z);
  const D = dir.length();
  dir.normalize();
  const su = new THREE.Vector3(0, 1, 0);
  const lato = new THREE.Vector3().crossVectors(dir, su);
  const R = (D * D / 4 + alzata * alzata) / D;
  const apice = Math.atan2(alzata, D / 2 - R);
  const apiceFuori = Math.atan2(Math.sqrt((R + spessore) ** 2 - (D / 2 - R) ** 2), D / 2 - R);
  const punto = (s, fuori, extra = 0) => {
    const sx = s <= 0.5 ? s : 1 - s;
    const r = R + (fuori ? spessore + extra : 0);
    const ang = Math.PI + ((fuori ? apiceFuori : apice) - Math.PI) * (sx / 0.5);
    const x = R + Math.cos(ang) * r;
    return [s > 0.5 ? D - x : x, Math.sin(ang) * r];
  };
  const mondo = ([x, y], w) => new THREE.Vector3(da.x + dir.x * x + lato.x * w, da.y + y, da.z + dir.z * x + lato.z * w);
  const parti = [];
  const meta = (conci - 1) / 2;
  for (let i = 0; i < Math.min(fino, conci); i++) {
    const s0 = i / conci + fuga;
    const s1 = (i + 1) / conci - fuga;
    const extra = i === meta ? chiave : 0;
    const i0 = punto(s0, false);
    const i1 = punto(s1, false);
    const e0 = punto(s0, true, extra);
    const e1 = punto(s1, true, extra);
    const w = profondita / 2 + (i === meta ? 0.06 : 0);
    parti.push(esaedro([mondo(i0, -w), mondo(i1, -w), mondo(e1, -w), mondo(e0, -w), mondo(i0, w), mondo(i1, w), mondo(e1, w), mondo(e0, w)]));
  }
  return mergeGeometries(parti);
}

export function fusto(rumore, r0, r1, h, { rotta = false, seme = 0, scanalature = 16, radiali = 80 } = {}) {
  const g = new THREE.CylinderGeometry(r1, r0, h, radiali, Math.max(3, Math.round(h / 0.8)), false);
  g.translate(0, h / 2, 0);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 1e-4) {
      if (rotta && y > h - 0.01) p.setY(i, h - 0.35 + rumore.fbm(seme, 0.3, 0.7, 2) * 0.3);
      continue;
    }
    const a = Math.atan2(z, x);
    const u = ((((a / (Math.PI * 2)) * scanalature) % 1) + 1) % 1;
    const canale = Math.sqrt(Math.max(0, 1 - ((u - 0.5) / 0.4) ** 2));
    const usura = rumore.fbm(x * 1.6 + seme, y * 1.3, z * 1.6, 3) * 0.03;
    const nr = r * (1 - 0.075 * canale) + usura;
    const ny = rotta && y > h - 1.1 ? Math.min(y, h - 0.15 - Math.abs(rumore.fbm(x * 1.4 + seme, 0.5, z * 1.4, 3)) * 1.1) : y;
    p.setXYZ(i, (x / r) * nr, ny, (z / r) * nr);
    uv.setXY(i, uv.getX(i) * Math.PI * 2 * r0, ny);
  }
  g.computeVertexNormals();
  return g;
}

export function trame(kit, chiave, ripeti) {
  const set = {};
  for (const [canale, t] of Object.entries(kit.tex?.[chiave] ?? {})) {
    const c = t.clone();
    c.repeat.set(ripeti, ripeti);
    c.needsUpdate = true;
    set[canale] = c;
  }
  return set;
}

export function conEmissivo(materiale, kit, { chiave, glsl, dichiara = '', uniformi = {}, peso = 1 }) {
  materiale.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniformi);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${RUMORE_GLSL}\n${dichiara}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n{\n${glsl}\n}`);
  };
  materiale.customProgramCacheKey = () => `abisso-${chiave}`;
  return conCaustiche(materiale, kit.uniformi, { peso, chiave: `e-${chiave}` });
}

export function materialeCorallo(kit, chiave, forza) {
  return conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'fondale', 0.6), color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0 }), kit, {
    chiave,
    dichiara: 'uniform float uCorallo;',
    uniformi: { uCorallo: forza },
    glsl: `
      float massimo = max(vColor.r, max(vColor.g, vColor.b));
      float battito = 0.65 + 0.35 * sin(uTempo * 1.7 + vMondo.x * 2.3 + vMondo.z * 1.9);
      totalEmissiveRadiance += vColor * smoothstep(0.82, 0.97, massimo) * uCorallo * battito;
    `,
    peso: 0.6,
  });
}

export function ramoCorallo(caso, base, dir, lungo, raggio, livello, parti, { punta = [1, 0.35, 0.85], corpo = [0.42, 0.1, 0.28] } = {}) {
  const fine = base.clone().addScaledVector(dir, lungo);
  const g = cilindro(base, fine, raggio, raggio * 0.72, 6, true);
  const ultimo = livello >= 3;
  colora(g, v => {
    const t = Math.min(1, Math.max(0, v.clone().sub(base).dot(dir) / lungo));
    const k = ultimo ? t * t : 0;
    return [tra(corpo[0], punta[0], k), tra(corpo[1], punta[1], k), tra(corpo[2], punta[2], k)];
  });
  parti.push(g);
  if (ultimo) {
    parti.push(colora(new THREE.SphereGeometry(raggio * 1.25, 5, 3).translate(fine.x, fine.y, fine.z), () => punta));
    return;
  }
  const figli = caso() < 0.3 ? 3 : 2;
  for (let k = 0; k < figli; k++) {
    const nuova = dir.clone().add(new THREE.Vector3((caso() - 0.5) * 1.3, caso() * 0.5, (caso() - 0.5) * 1.3)).normalize();
    ramoCorallo(caso, fine, nuova, lungo * (0.62 + caso() * 0.2), raggio * 0.7, livello + 1, parti, { punta, corpo });
  }
}

export function specchia(g) {
  const s = g.index ? g.toNonIndexed() : g.clone();
  s.scale(-1, 1, 1);
  for (const nome of Object.keys(s.attributes)) {
    const a = s.attributes[nome];
    const k = a.itemSize;
    for (let i = 0; i < a.count; i += 3) {
      for (let c = 0; c < k; c++) {
        const t = a.array[(i + 1) * k + c];
        a.array[(i + 1) * k + c] = a.array[(i + 2) * k + c];
        a.array[(i + 2) * k + c] = t;
      }
    }
  }
  return s;
}

const SIMBOLI_DISEGNO = Object.freeze({
  tridente(c) {
    c.moveTo(0, 0.88);
    c.lineTo(0, -0.8);
    c.moveTo(-0.5, -0.62);
    c.lineTo(-0.5, -0.2);
    c.quadraticCurveTo(-0.5, 0.12, 0, 0.12);
    c.quadraticCurveTo(0.5, 0.12, 0.5, -0.2);
    c.lineTo(0.5, -0.62);
    for (const [x, y] of [[-0.5, -0.62], [0.5, -0.62], [0, -0.8]]) {
      c.moveTo(x - 0.14, y + 0.16);
      c.lineTo(x, y - 0.06);
      c.lineTo(x + 0.14, y + 0.16);
    }
    c.moveTo(-0.22, 0.5);
    c.lineTo(0.22, 0.5);
  },
  conchiglia(c) {
    const cerniera = [0, 0.62];
    const n = 7;
    const ang = k => -Math.PI * 0.86 + (k / (n - 1)) * Math.PI * 0.72;
    for (let k = 0; k < n; k++) {
      c.moveTo(cerniera[0], cerniera[1]);
      c.lineTo(Math.cos(ang(k)) * 0.86, cerniera[1] + Math.sin(ang(k)) * 1.25);
    }
    c.moveTo(Math.cos(ang(0)) * 0.86, cerniera[1] + Math.sin(ang(0)) * 1.25);
    for (let k = 1; k < n; k++) {
      const a0 = ang(k - 1);
      const a1 = ang(k);
      const am = (a0 + a1) / 2;
      c.quadraticCurveTo(Math.cos(am) * 1.02, cerniera[1] + Math.sin(am) * 1.42, Math.cos(a1) * 0.86, cerniera[1] + Math.sin(a1) * 1.25);
    }
    c.moveTo(-0.3, 0.62);
    c.lineTo(-0.3, 0.82);
    c.lineTo(0.3, 0.82);
    c.lineTo(0.3, 0.62);
  },
  onda(c) {
    c.moveTo(-0.85, 0.55);
    c.bezierCurveTo(-0.75, -0.2, -0.1, -0.78, 0.45, -0.5);
    c.bezierCurveTo(0.85, -0.28, 0.7, 0.2, 0.3, 0.12);
    c.bezierCurveTo(0.02, 0.06, 0.08, -0.25, 0.32, -0.18);
    c.moveTo(-0.9, 0.72);
    for (let k = 0; k <= 6; k++) c.quadraticCurveTo(-0.9 + (k + 0.5) * 0.3, k % 2 ? 0.86 : 0.58, -0.9 + (k + 1) * 0.3, 0.72);
  },
  occhio(c) {
    c.moveTo(-0.9, 0.05);
    c.quadraticCurveTo(0, -0.7, 0.9, 0.05);
    c.quadraticCurveTo(0, 0.8, -0.9, 0.05);
    c.moveTo(0.3, 0.05);
    c.arc(0, 0.05, 0.3, 0, Math.PI * 2);
    for (let k = 0; k < 5; k++) {
      const a = -Math.PI * 0.8 + k * Math.PI * 0.15;
      c.moveTo(Math.cos(a) * 0.62, Math.sin(a) * 0.62 - 0.1);
      c.lineTo(Math.cos(a) * 0.9, Math.sin(a) * 0.9 - 0.12);
    }
  },
  spirale(c) {
    for (let k = 0; k <= 160; k++) {
      const t = (k / 160) * Math.PI * 2 * 3.1;
      const r = 0.05 + (t / (Math.PI * 2 * 3.1)) * 0.82;
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r;
      if (k === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
  },
});

export function disegnaSimbolo(c, nome, cx, cy, r, spessore) {
  c.save();
  c.translate(cx, cy);
  c.scale(r, r);
  c.lineWidth = spessore / r;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  if (nome === 'punto') {
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 0.9);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.7)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(-1, -1, 2, 2);
  } else {
    c.beginPath();
    SIMBOLI_DISEGNO[nome](c);
    c.stroke();
    if (nome === 'occhio') {
      c.beginPath();
      c.arc(0, 0.05, 0.12, 0, Math.PI * 2);
      c.fill();
    }
  }
  c.restore();
}

export const ORDINE_SIMBOLI = Object.freeze(['tridente', 'conchiglia', 'onda', 'occhio', 'spirale', 'punto']);
let atlanteSimboli = null;

export function texturaSimboli() {
  if (atlanteSimboli) return atlanteSimboli;
  const lato = 256;
  const tela = document.createElement('canvas');
  tela.width = lato * ORDINE_SIMBOLI.length;
  tela.height = lato;
  const c = tela.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0, 0, tela.width, tela.height);
  c.strokeStyle = '#fff';
  c.fillStyle = '#fff';
  ORDINE_SIMBOLI.forEach((nome, i) => {
    const cx = i * lato + lato / 2;
    const cy = lato / 2;
    for (const [sfoca, alfa] of [[18, 0.55], [0, 1]]) {
      c.shadowColor = '#fff';
      c.shadowBlur = sfoca;
      c.globalAlpha = alfa;
      if (nome !== 'punto') {
        c.lineWidth = 5;
        c.beginPath();
        c.arc(cx, cy, 112, 0, Math.PI * 2);
        c.stroke();
        for (let k = 0; k < 24; k++) {
          const a = (k / 24) * Math.PI * 2;
          c.beginPath();
          c.arc(cx + Math.cos(a) * 100, cy + Math.sin(a) * 100, k % 2 ? 2.5 : 4, 0, Math.PI * 2);
          c.fill();
        }
      }
      disegnaSimbolo(c, nome, cx, cy, nome === 'punto' ? 120 : 72, 11);
    }
  });
  c.globalAlpha = 1;
  c.shadowBlur = 0;
  atlanteSimboli = new THREE.CanvasTexture(tela);
  atlanteSimboli.anisotropy = 4;
  return atlanteSimboli;
}

export function texturaFregio() {
  const tela = document.createElement('canvas');
  tela.width = 1024;
  tela.height = 128;
  const c = tela.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0, 0, 1024, 128);
  c.strokeStyle = '#fff';
  c.fillStyle = '#fff';
  c.shadowColor = '#fff';
  c.shadowBlur = 8;
  c.lineWidth = 4;
  for (const y of [10, 118]) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(1024, y);
    c.stroke();
  }
  c.lineWidth = 3;
  c.beginPath();
  for (let x = 0; x < 1024; x += 32) {
    c.moveTo(x, 22);
    c.lineTo(x + 16, 22);
    c.lineTo(x + 16, 30);
    c.lineTo(x + 8, 30);
    c.moveTo(x, 106);
    c.lineTo(x + 16, 106);
    c.lineTo(x + 16, 98);
    c.lineTo(x + 8, 98);
  }
  c.stroke();
  for (let k = 0; k < 8; k++) disegnaSimbolo(c, ORDINE_SIMBOLI[k % 5], 64 + k * 128, 64, 30, 6);
  const t = new THREE.CanvasTexture(tela);
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

export function creaFasci(kit, fasci, { settore, forza = 0.16 }) {
  const parti = fasci.map((f, i) => {
    const da = new THREE.Vector3(...f.da);
    const a = new THREE.Vector3(...f.a);
    const l = da.distanceTo(a);
    const g = new THREE.CylinderGeometry(f.r0, f.r1, l, 20, 6, true);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), da.clone().sub(a).normalize()));
    g.translate((da.x + a.x) / 2, (da.y + a.y) / 2, (da.z + a.z) / 2);
    g.setAttribute('aSeme', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(i * 1.37 + 0.2), 1));
    return g;
  });
  const geometria = mergeGeometries(parti);
  const colore = { value: new THREE.Color(0xbfefff) };
  const intensita = { value: forza };
  const materiale = new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uColore: colore, uForza: intensita },
    vertexShader: `
      attribute float aSeme;
      varying vec2 vUv;
      varying float vSeme;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vDist;
      void main() {
        vUv = uv;
        vSeme = aSeme;
        vec4 mondo = modelMatrix * vec4(position, 1.0);
        vPos = mondo.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = cameraPosition - mondo.xyz;
        vec4 mv = viewMatrix * mondo;
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform vec3 uColore;
      uniform float uForza;
      varying vec2 vUv;
      varying float vSeme;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vDist;
      ${RUMORE_GLSL}
      void main() {
        float bordo = pow(abs(dot(normalize(vN), normalize(vV))), 2.4);
        float estremi = smoothstep(0.0, 0.22, vUv.y) * (1.0 - smoothstep(0.78, 1.0, vUv.y));
        float n = rumoreAb(vec3(vPos.x * 0.45 + vSeme * 7.0, vPos.y * 0.04 + uTempo * 0.1, vPos.z * 0.45));
        float n2 = rumoreAb(vec3(vPos.xz * 1.3, uTempo * 0.3 + vSeme));
        float raggi = clamp(0.55 + 0.5 * n + 0.25 * n2, 0.0, 1.5);
        float vicino = smoothstep(0.6, 4.0, vDist) * (1.0 - smoothstep(45.0, 85.0, vDist));
        gl_FragColor = vec4(uColore * bordo * estremi * raggi * vicino * uForza, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometria, materiale);
  mesh.name = `fasci-${settore}`;
  kit.scena.add(mesh);
  return { mesh, colore, intensita };
}

export function materialeAcqua(kit, { chiave, colore = 0x05222c, opacita = 0.84, luce = CIANO, forzaLuce = 0.25, onde = 0.35, centro = [0, 0, 0], raggioLuce = 10, vortici = false }) {
  const uniformi = {
    uTempo: kit.uniformi.uTempo,
    uAnelli: { value: Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0)) },
    uVortici: { value: [new THREE.Vector4(0, 0, 1, 0), new THREE.Vector4(0, 0, 1, 0)] },
    uLuceFondo: { value: new THREE.Color(luce) },
    uForzaLuce: { value: forzaLuce },
    uOnde: { value: onde },
    uCentro: { value: new THREE.Vector3(...centro) },
    uRaggioLuce: { value: raggioLuce },
  };
  const m = new THREE.MeshStandardMaterial({ color: colore, roughness: 0.06, metalness: 0.15, transparent: true, opacity: opacita, depthWrite: false, envMapIntensity: 1.4 });
  m.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniformi);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosAcqua;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvPosAcqua = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vPosAcqua;
        uniform float uTempo;
        uniform vec4 uAnelli[4];
        uniform vec4 uVortici[2];
        uniform vec3 uLuceFondo;
        uniform float uForzaLuce;
        uniform float uOnde;
        uniform vec3 uCentro;
        uniform float uRaggioLuce;
        ${RUMORE_GLSL}
        float creste = 0.0;
        float altezzaAcqua(vec2 p) {
          float h = rumoreAb(vec3(p * 0.32, uTempo * 0.22)) * 0.5 + rumoreAb(vec3(p * 0.95 + 3.1, uTempo * 0.42)) * 0.22 + rumoreAb(vec3(p * 2.6 - 1.7, uTempo * 0.8)) * 0.07;
          for (int i = 0; i < 4; i++) {
            vec4 a = uAnelli[i];
            float eta = uTempo - a.z;
            if (eta < 0.0 || eta > 6.0) continue;
            float d = length(p - a.xy) - eta * 5.5;
            float onda = sin(d * 2.6) * exp(-d * d * 0.18) * exp(-eta * 0.55) * a.w;
            h += onda;
            creste += max(onda, 0.0);
          }
          ${vortici ? `for (int i = 0; i < 2; i++) {
            vec4 v = uVortici[i];
            vec2 q = p - v.xy;
            float r = length(q);
            float ang = atan(q.y, q.x);
            float dentro = 1.0 - smoothstep(0.0, v.z, r);
            h += sin(ang * 3.0 + r * 6.0 - uTempo * (2.0 + 4.0 * v.w)) * dentro * (0.25 + v.w);
            h -= dentro * dentro * v.w * 1.2;
          }` : ''}
          return h;
        }`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        {
          vec2 pA = vPosAcqua.xz;
          float e = 0.07;
          float h0 = altezzaAcqua(pA);
          float hx = altezzaAcqua(pA + vec2(e, 0.0));
          float hz = altezzaAcqua(pA + vec2(0.0, e));
          vec3 nA = normalize(vec3(-(hx - h0) / e * uOnde, 1.0, -(hz - h0) / e * uOnde));
          normal = normalize((viewMatrix * vec4(nA, 0.0)).xyz);
        }`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        {
          float dc = length(vPosAcqua.xz - uCentro.xz);
          float vicinoCentro = 1.0 - smoothstep(0.0, uRaggioLuce, dc);
          float tremolio = 0.6 + 0.4 * rumoreAb(vec3(vPosAcqua.xz * 0.5, uTempo * 0.35));
          totalEmissiveRadiance += uLuceFondo * uForzaLuce * (0.25 + vicinoCentro * vicinoCentro * 1.5) * tremolio;
          totalEmissiveRadiance += vec3(0.5, 0.95, 1.0) * min(creste * 0.35, 0.8);
        }`);
  };
  m.customProgramCacheKey = () => `acqua-${chiave}-${vortici}`;
  return { materiale: m, uniformi };
}

export function creaArchi(kit, massimo = 420) {
  const vertici = massimo * 6;
  const pos = new Float32Array(vertici * 3);
  const col = new Float32Array(vertici * 3);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  g.setDrawRange(0, 0);
  const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false, fog: false }));
  mesh.frustumCulled = false;
  kit.scena.add(mesh);
  let n = 0;
  const camera = new THREE.Vector3();
  const d = new THREE.Vector3();
  const v = new THREE.Vector3();
  const lato = new THREE.Vector3();
  const colore = new THREE.Color();
  function segmento(a, b, largo, c) {
    if (n >= massimo) return;
    d.subVectors(b, a);
    v.subVectors(camera, a);
    lato.crossVectors(d, v);
    const l = lato.length();
    if (l < 1e-6) return;
    lato.multiplyScalar(largo / 2 / l);
    const o = n * 18;
    const angoli = [[a, -1], [b, -1], [b, 1], [a, -1], [b, 1], [a, 1]];
    angoli.forEach(([p, s], k) => {
      pos[o + k * 3] = p.x + lato.x * s;
      pos[o + k * 3 + 1] = p.y + lato.y * s;
      pos[o + k * 3 + 2] = p.z + lato.z * s;
      col[o + k * 3] = c.r;
      col[o + k * 3 + 1] = c.g;
      col[o + k * 3 + 2] = c.b;
    });
    n++;
  }
  const punti = [];
  return {
    mesh,
    inizia(p) {
      n = 0;
      camera.copy(p);
    },
    fulmine(da, a, { colore: tinta = 0x9cf0ff, largo = 0.05, pezzi = 9, scarto = 0.22, forza = 1 } = {}) {
      punti.length = 0;
      const lunghezza = da.distanceTo(a);
      for (let i = 0; i <= pezzi; i++) {
        const t = i / pezzi;
        const p = new THREE.Vector3().lerpVectors(da, a, t);
        if (i > 0 && i < pezzi) p.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(scarto * Math.min(1, lunghezza / 2) * 2));
        punti.push(p);
      }
      colore.setHex(tinta).multiplyScalar(0.45 * forza);
      for (let i = 0; i < punti.length - 1; i++) segmento(punti[i], punti[i + 1], largo * 3.2, colore);
      colore.setHex(tinta).lerp(new THREE.Color(1, 1, 1), 0.6).multiplyScalar(forza);
      for (let i = 0; i < punti.length - 1; i++) segmento(punti[i], punti[i + 1], largo, colore);
    },
    chiudi() {
      g.setDrawRange(0, n * 6);
      g.attributes.position.needsUpdate = true;
      g.attributes.color.needsUpdate = true;
    },
  };
}

export function creaFiamme(kit, fiamme, { cuore = [0.55, 1.5, 1.9], corpo = [0.05, 0.62, 1.35], punta = [0.04, 0.16, 0.8] } = {}) {
  const n = fiamme.length;
  const pos = new Float32Array(n * 12);
  const angolo = new Float32Array(n * 8);
  const dati = new Float32Array(n * 12);
  const indici = [];
  fiamme.forEach((f, i) => {
    [[-0.5, 0], [0.5, 0], [0.5, 1], [-0.5, 1]].forEach(([ax, ay], k) => {
      const v = i * 4 + k;
      pos.set([f.x, f.y, f.z], v * 3);
      angolo.set([ax, ay], v * 2);
      dati.set([f.l, f.a, f.seme], v * 3);
    });
    indici.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aAngolo', new THREE.BufferAttribute(angolo, 2));
  g.setAttribute('aDati', new THREE.BufferAttribute(dati, 3));
  g.setIndex(indici);
  const forza = { value: 1 };
  const materiale = new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uForza: forza, uCuore: { value: new THREE.Vector3(...cuore) }, uCorpo: { value: new THREE.Vector3(...corpo) }, uPunta: { value: new THREE.Vector3(...punta) } },
    vertexShader: `
      attribute vec2 aAngolo;
      attribute vec3 aDati;
      varying vec2 vUv;
      varying float vSeme;
      void main() {
        vec3 centro = (modelMatrix * vec4(position, 1.0)).xyz;
        vec3 versoCamera = cameraPosition - centro;
        versoCamera.y = 0.0;
        vec3 destra = normalize(cross(vec3(0.0, 1.0, 0.0), normalize(versoCamera + vec3(0.0001, 0.0, 0.0))));
        vec3 p = centro + destra * aAngolo.x * aDati.x + vec3(0.0, 1.0, 0.0) * aAngolo.y * aDati.y;
        vUv = aAngolo + vec2(0.5, 0.0);
        vSeme = aDati.z;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uForza;
      uniform vec3 uCuore;
      uniform vec3 uCorpo;
      uniform vec3 uPunta;
      varying vec2 vUv;
      varying float vSeme;
      ${RUMORE_GLSL}
      void main() {
        float t = uTempo * 1.25 + vSeme * 17.0;
        float n1 = rumoreAb(vec3(vUv.x * 2.6, vUv.y * 2.1 - t * 1.6, vSeme * 5.0));
        float n2 = rumoreAb(vec3(vUv.x * 5.5, vUv.y * 4.6 - t * 2.7, vSeme * 9.0 + 3.0));
        float x = (vUv.x - 0.5) * 2.0 + (n1 * 0.38 + n2 * 0.16) * vUv.y;
        float larghezza = mix(0.7, 0.04, pow(vUv.y, 0.75));
        float corpo = 1.0 - smoothstep(larghezza * 0.45, larghezza, abs(x));
        float base = smoothstep(0.0, 0.1, vUv.y);
        float cima = 1.0 - smoothstep(0.4 + n1 * 0.25, 1.0, vUv.y);
        float a = corpo * base * cima;
        float cuore = (1.0 - smoothstep(0.0, larghezza * 0.4, abs(x))) * (1.0 - smoothstep(0.05, 0.32, vUv.y));
        vec3 col = mix(uCorpo, uPunta, smoothstep(0.15, 0.85, vUv.y));
        col = mix(col, uCuore, cuore);
        gl_FragColor = vec4(col * a * uForza, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(g, materiale);
  mesh.frustumCulled = false;
  kit.scena.add(mesh);
  return { mesh, forza };
}

export const PARTICELLA = Object.freeze({ BRACE: 0, BOLLA: 1, PULVISCOLO: 2, NEVE: 3, SPIRALE: 4 });

export function creaParticelle(kit, voci, { colori = [[0.5, 1.6, 2.2], [0.55, 0.95, 1.1], [0.55, 0.85, 1.0], [0.45, 0.7, 0.75], [0.6, 1.5, 2.0]] } = {}) {
  const n = voci.length;
  const pos = new Float32Array(n * 3);
  const moto = new Float32Array(n * 4);
  const gruppo = new Float32Array(n);
  voci.forEach((p, i) => {
    pos.set([p.x, p.y, p.z], i * 3);
    moto.set([p.tipo, p.alto, p.vita, p.seme], i * 4);
    gruppo[i] = p.gruppo ?? 0;
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aMoto', new THREE.BufferAttribute(moto, 4));
  g.setAttribute('aGruppo', new THREE.BufferAttribute(gruppo, 1));
  const gruppi = { value: [1, 1, 1, 1, 1, 1] };
  const materiale = new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uGruppi: gruppi, uColori: { value: colori.map(c => new THREE.Vector3(...c)) } },
    vertexShader: `
      attribute vec4 aMoto;
      attribute float aGruppo;
      uniform float uTempo;
      uniform float uGruppi[6];
      uniform vec3 uColori[5];
      varying float vAlfa;
      varying float vTipo;
      varying vec3 vColore;
      void main() {
        float tipo = aMoto.x;
        float alto = aMoto.y;
        float vita = aMoto.z;
        float seme = aMoto.w;
        float fase = fract(uTempo / vita + seme);
        vec3 p = position;
        float dimensione = 0.06;
        if (tipo < 0.5) {
          p.y += fase * alto;
          p.x += sin(fase * 9.0 + seme * 30.0) * 0.14 * fase;
          p.z += cos(fase * 7.0 + seme * 20.0) * 0.14 * fase;
          vAlfa = sin(fase * 3.14159);
          dimensione = 0.08;
        } else if (tipo < 1.5) {
          p.y += fase * alto;
          p.x += sin(uTempo * 3.0 + seme * 50.0) * 0.05;
          p.z += cos(uTempo * 2.6 + seme * 40.0) * 0.05;
          vAlfa = smoothstep(0.0, 0.08, fase) * (1.0 - smoothstep(0.85, 1.0, fase));
          dimensione = 0.035 + fract(seme * 13.0) * 0.045;
        } else if (tipo < 2.5) {
          p += vec3(sin(uTempo * 0.21 + seme * 17.0), sin(uTempo * 0.13 + seme * 23.0) * 0.6, cos(uTempo * 0.17 + seme * 11.0)) * alto;
          vAlfa = 0.45 + 0.55 * sin(uTempo * 1.3 + seme * 60.0);
          dimensione = 0.045;
        } else if (tipo < 3.5) {
          p.y -= fase * alto;
          p.x += sin(fase * 5.0 + seme * 9.0) * 0.5;
          p.z += cos(fase * 4.0 + seme * 7.0) * 0.5;
          vAlfa = smoothstep(0.0, 0.15, fase) * (1.0 - smoothstep(0.8, 1.0, fase));
          dimensione = 0.06;
        } else {
          float ang = seme * 6.2831 + fase * 14.0;
          float r = 0.2 + fase * 1.2;
          p += vec3(cos(ang) * r, fase * alto, sin(ang) * r);
          vAlfa = sin(fase * 3.14159);
          dimensione = 0.07;
        }
        int gi = int(aGruppo + 0.5);
        vAlfa *= uGruppi[gi];
        vTipo = tipo;
        vColore = uColori[int(tipo + 0.5)];
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = dimensione * 720.0 / max(0.5, -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying float vAlfa;
      varying float vTipo;
      varying vec3 vColore;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = (vTipo > 0.5 && vTipo < 1.5) ? smoothstep(0.5, 0.4, d) * (0.25 + smoothstep(0.22, 0.42, d)) : smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColore * a * vAlfa, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const punti = new THREE.Points(g, materiale);
  punti.frustumCulled = false;
  kit.scena.add(punti);
  return { punti, gruppi };
}

function materiali(kit) {
  const bagliore = { value: 1 };
  const vene = { value: 1.6 };
  const coloreVene = { value: new THREE.Color(0x30d8ff) };
  const intarsi = { value: 0.6 };
  const bordo = new THREE.MeshStandardMaterial({ color: 0x06202a, emissive: CIANO, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.2 });
  const cristalliAltare = new THREE.MeshStandardMaterial({ color: 0x06202a, emissive: CIANO, emissiveIntensity: 0.3, roughness: 0.2, metalness: 0.1 });
  const fregio = texturaFregio();
  return {
    bagliore, vene, coloreVene, intarsi, bordo, cristalliAltare,
    roccia: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'roccia', 0.3), color: 0xd4d0d8, roughness: 1, normalScale: new THREE.Vector2(1.5, 1.5) }), kit, {
      chiave: 'rocciaSantuario',
      dichiara: 'uniform float uBagliore;',
      uniformi: { uBagliore: bagliore },
      glsl: `
        vec3 pv = vMondo * 0.32;
        float cresta = 1.0 - abs(rumoreAb(pv + vec3(0.0, 3.1, 0.0)));
        float vena = smoothstep(0.986, 0.998, cresta) * smoothstep(0.25, 0.6, rumoreAb(vMondo * 0.05));
        float licheni = smoothstep(0.7, 0.88, rumoreAb(vMondo * 1.7)) * smoothstep(0.3, 0.7, rumoreAb(vMondo * 0.11 + 7.0));
        float pulsa = 0.7 + 0.3 * sin(uTempo * 1.2 + vMondo.y * 0.35 + vMondo.x * 0.1);
        float alto = smoothstep(-2.0, 16.0, vMondo.y);
        totalEmissiveRadiance += diffuseColor.rgb * mix(vec3(0.07, 0.16, 0.2), vec3(0.1, 0.24, 0.3), alto) * uBagliore;
        totalEmissiveRadiance += (vec3(0.15, 0.75, 1.0) * vena * 1.4 * pulsa + vec3(0.5, 0.18, 1.0) * licheni * 0.22) * uBagliore;
      `,
    }),
    rocciaDoppia: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'roccia', 0.3), color: 0xd4d0d8, roughness: 1, side: THREE.DoubleSide }), kit, {
      chiave: 'rocciaDoppia',
      glsl: 'totalEmissiveRadiance += diffuseColor.rgb * vec3(0.06, 0.14, 0.18);',
    }),
    oroIntarsio: conEmissivo(new THREE.MeshStandardMaterial({ color: 0xe0b050, metalness: 0.55, roughness: 0.32 }), kit, {
      chiave: 'oroIntarsio',
      glsl: 'totalEmissiveRadiance += vec3(0.16, 0.1, 0.02);',
      peso: 0.4,
    }),
    cristallo: new THREE.MeshStandardMaterial({ color: 0x0a2a38, emissive: CIANO, emissiveIntensity: 1.1, roughness: 0.2, metalness: 0.2 }),
    pavimento: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'marmo', 0.42), vertexColors: true, roughness: 0.62, envMapIntensity: 1.1 }), kit, { chiave: 'pavimentoSantuario', glsl: 'totalEmissiveRadiance += vec3(0.0);', peso: 0.85 }),
    statua: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'marmo', 0.55), color: 0xe4e0d6, roughness: 0.7 }), kit, {
      chiave: 'statuaPoseidone',
      dichiara: 'uniform float uVene;\nuniform vec3 uColoreVene;',
      uniformi: { uVene: vene, uColoreVene: coloreVene },
      glsl: `
        vec3 pv = vMondo * vec3(0.55, 0.2, 0.55);
        float c1 = 1.0 - abs(rumoreAb(pv));
        float c2 = 1.0 - abs(rumoreAb(pv * 2.3 + 11.0));
        float vena = smoothstep(0.935, 0.988, c1) + smoothstep(0.962, 0.994, c2) * 0.6;
        float flusso = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(vMondo.y * 0.8 - uTempo * 1.5 + rumoreAb(vMondo * 0.25) * 4.0), 2.0);
        totalEmissiveRadiance += uColoreVene * vena * flusso * uVene;
      `,
    }),
    intarsio: conEmissivo(new THREE.MeshStandardMaterial({ color: 0x0a2632, roughness: 0.3, metalness: 0.5 }), kit, {
      chiave: 'intarsioSantuario',
      dichiara: 'uniform float uIntarsi;',
      uniformi: { uIntarsi: intarsi },
      glsl: `
        float onda = 0.3 + 0.7 * pow(0.5 + 0.5 * sin(vMondo.z * 0.55 + vMondo.x * 0.2 + uTempo * 1.4), 3.0);
        totalEmissiveRadiance += vec3(0.18, 0.82, 1.0) * onda * uIntarsi * 2.2;
      `,
    }),
    fregio: conEmissivo(new THREE.MeshStandardMaterial({ ...trame(kit, 'marmo', 0.5), color: 0x9a968c, roughness: 0.8, emissiveMap: fregio, emissive: 0x2fd0ff, emissiveIntensity: 0.9 }), kit, {
      chiave: 'fregioSantuario',
      dichiara: 'uniform float uIntarsi;',
      uniformi: { uIntarsi: intarsi },
      glsl: 'totalEmissiveRadiance *= 0.4 + 0.6 * uIntarsi;',
    }),
    brace: conEmissivo(new THREE.MeshStandardMaterial({ color: 0x041018, roughness: 1 }), kit, {
      chiave: 'braceAzzurra',
      glsl: `
        float n = rumoreAb(vec3(vMondo.xz * 7.0, uTempo * 0.9));
        totalEmissiveRadiance += vec3(0.1, 0.75, 1.4) * smoothstep(0.0, 0.7, n) * 1.8;
      `,
    }),
    corallo: materialeCorallo(kit, 'coralloSantuario', { value: 1.4 }),
    fregioTex: fregio,
  };
}

function anelloPerimetro(n) {
  const hx = SANTUARIO.x1 + VOLTA.fuori;
  const hz = (SANTUARIO.z1 - SANTUARIO.z0) / 2 + VOLTA.fuori;
  const r = VOLTA.angolo;
  const denso = [];
  const tratto = (x0, z0, x1, z1) => {
    const k = Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 0.05);
    for (let i = 0; i < k; i++) denso.push([tra(x0, x1, i / k), tra(z0, z1, i / k)]);
  };
  const curva = (cx, cz, a0, a1) => {
    for (let i = 0; i < 64; i++) {
      const a = tra(a0, a1, i / 64);
      denso.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
    }
  };
  tratto(0, hz, hx - r, hz);
  curva(hx - r, hz - r, Math.PI / 2, 0);
  tratto(hx, hz - r, hx, -(hz - r));
  curva(hx - r, -(hz - r), 0, -Math.PI / 2);
  tratto(hx - r, -hz, -(hx - r), -hz);
  curva(-(hx - r), -(hz - r), -Math.PI / 2, -Math.PI);
  tratto(-hx, -(hz - r), -hx, hz - r);
  curva(-(hx - r), hz - r, Math.PI, Math.PI / 2);
  tratto(-(hx - r), hz, 0, hz);
  const cumulata = [0];
  for (let i = 1; i <= denso.length; i++) {
    const a = denso[i - 1];
    const b = denso[i % denso.length];
    cumulata.push(cumulata[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  const totale = cumulata[denso.length];
  const punti = [];
  let k = 0;
  for (let i = 0; i < n; i++) {
    const s = (i / n) * totale;
    while (cumulata[k + 1] < s) k++;
    const a = denso[k];
    const b = denso[(k + 1) % denso.length];
    const t = (s - cumulata[k]) / Math.max(1e-6, cumulata[k + 1] - cumulata[k]);
    punti.push([tra(a[0], b[0], t), tra(a[1], b[1], t)]);
  }
  return punti.map((p, i) => {
    const prima = punti[(i - 1 + n) % n];
    const dopo = punti[(i + 1) % n];
    const tx = dopo[0] - prima[0];
    const tz = dopo[1] - prima[1];
    const l = Math.hypot(tx, tz);
    return { x: p[0], z: CZ + p[1], nx: -tz / l, nz: tx / l };
  });
}

const ZONE_CALME = Object.freeze([
  { x0: -1.75, x1: 1.75, y0: -3, y1: 3.55, z0: -26.6, z1: -24.4 },
  { x0: 21.4, x1: 23.6, y0: -3, y1: 3.85, z0: -45.75, z1: -42.25 },
  { x0: 21.4, x1: 23.6, y0: -3, y1: 0.5, z0: -53.2, z1: -50.8 },
  { x0: -23.6, x1: -21.4, y0: -3, y1: 0.5, z0: -41.2, z1: -38.8 },
  ...STELE.map(s => ({ x0: Math.sign(s.x) * 21.3 - 1, x1: Math.sign(s.x) * 21.3 + 1, y0: -3, y1: 1.6, z0: s.z - 1.35, z1: s.z + 1.35 })),
]);

function calma(x, y, z) {
  let k = 1;
  for (const c of ZONE_CALME) {
    const d = Math.hypot(Math.max(c.x0 - x, 0, x - c.x1), Math.max(c.y0 - y, 0, y - c.y1), Math.max(c.z0 - z, 0, z - c.z1));
    k = Math.min(k, 0.22 + 0.78 * liscia(0, 1.8, d));
  }
  return k;
}

function nelBuco(b0, b1, y) {
  const x = (b0.x + b1.x) / 2;
  const z = (b0.z + b1.z) / 2;
  return BUCHI.some(h => {
    if (y > h.alto) return false;
    if (h.lato === 'sud') return b0.nz > 0.7 && x > h.da && x < h.a;
    if (h.lato === 'est') return b0.nx > 0.7 && z > h.da && z < h.a;
    return b0.nx < -0.7 && z > h.da && z < h.a;
  });
}

function costruisciGrotta(kit, m) {
  const NU = 340;
  const bordo = anelloPerimetro(NU);
  const righe = [];
  const NM = 18;
  const NV = 40;
  for (let j = 0; j <= NM; j++) righe.push([0, tra(VOLTA.base, VOLTA.muro, j / NM)]);
  for (let j = 1; j <= NV; j++) {
    const t = (j / NV) * (Math.PI / 2);
    righe.push([1 - Math.cos(t), VOLTA.muro + (VOLTA.cima - VOLTA.muro) * Math.sin(t)]);
  }
  for (let j = 1; j <= 4; j++) righe.push([1 - j * 0.045, VOLTA.cima + j * 0.6]);
  const cime = bordo.map(b => {
    const dx = b.x;
    const dz = b.z - CZ;
    const d = Math.hypot(dx, dz);
    const ux = dx / d;
    const uz = dz / d;
    const te = 1 / Math.sqrt((ux / VOLTA.rx) ** 2 + (uz / VOLTA.rz) ** 2);
    return { x: ux * te, z: CZ + uz * te };
  });
  const pos = new Float32Array(NU * righe.length * 3);
  righe.forEach(([f, y], j) => bordo.forEach((b, i) => {
    const o = (j * NU + i) * 3;
    pos[o] = tra(b.x, cime[i].x, f);
    pos[o + 1] = y;
    pos[o + 2] = tra(b.z, cime[i].z, f);
  }));
  const indici = [];
  for (let j = 0; j < righe.length - 1; j++) {
    for (let i = 0; i < NU; i++) {
      const i1 = (i + 1) % NU;
      if (righe[j + 1][0] === 0 && nelBuco(bordo[i], bordo[i1], (righe[j][1] + righe[j + 1][1]) / 2)) continue;
      const a = j * NU + i;
      const b = j * NU + i1;
      const c = (j + 1) * NU + i;
      const d = (j + 1) * NU + i1;
      indici.push(a, d, b, a, c, d);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(indici);
  g = kit.deforma(g, { ampiezza: 2.6, frequenza: 0.075, ottave: 2, seme: 3.1, lungo: (x, y) => liscia(6, 11, y) * (1 - 0.65 * liscia(14.5, 17, y)) });
  g = kit.deforma(g, { ampiezza: 0.8, frequenza: 0.32, ottave: 5, seme: 9.7, lungo: (x, y, z) => (y < 4.5 ? 0.62 : 0.62 + Math.min(0.9, (y - 4.5) * 0.12)) * calma(x, y, z) });
  const p = g.attributes.position;
  const volta = [];
  for (let i = 0; i < p.count; i++) if (p.getY(i) > 8) volta.push(p.getX(i), p.getY(i), p.getZ(i));
  const soffitto = (x, z) => {
    let migliore = Infinity;
    let y = VOLTA.cima;
    for (let k = 0; k < volta.length; k += 3) {
      const d = (volta[k] - x) ** 2 + (volta[k + 2] - z) ** 2;
      if (d < migliore) {
        migliore = d;
        y = volta[k + 1];
      }
    }
    return y;
  };
  kit.lotto(m.roccia, SETTORE).aggiungi(kit.uvMetri(g, 0.55));
  return { soffitto };
}

function stalattiti(kit, m, caso, soffitto) {
  const parti = [];
  let messe = 0;
  for (let tentativo = 0; tentativo < 400 && messe < 46; tentativo++) {
    const x = tra(-20.5, 20.5, caso());
    const z = tra(-58.5, -27.5, caso());
    if ((x / (VOLTA.rx + 1.2)) ** 2 + ((z - CZ) / (VOLTA.rz + 1.2)) ** 2 < 1) continue;
    if (Math.abs(Math.abs(x) - 12) < 2.2) continue;
    if (STATUE.some(s => Math.hypot(s.x - x, s.z - z) < 5)) continue;
    const cima = soffitto(x, z);
    if (cima < 9) continue;
    const lungo = 0.9 + caso() * caso() * 3.2;
    const r = 0.22 + lungo * 0.12 + caso() * 0.15;
    const cono = new THREE.ConeGeometry(r, lungo + 0.8, 9, 6).rotateX(Math.PI).translate(x, cima + 0.4 - (lungo + 0.8) / 2, z);
    parti.push(cono);
    messe++;
    for (let k = 0; k < 2; k++) {
      const dx = (caso() - 0.5) * 1.6;
      const dz = (caso() - 0.5) * 1.6;
      const l2 = 0.4 + caso() * lungo * 0.5;
      parti.push(new THREE.ConeGeometry(r * 0.5, l2 + 0.6, 7, 3).rotateX(Math.PI).translate(x + dx, soffitto(x + dx, z + dz) + 0.3 - (l2 + 0.6) / 2, z + dz));
    }
  }
  const g = kit.deforma(unisci(parti), { ampiezza: 0.14, frequenza: 1.3, ottave: 3, seme: 4.4 });
  kit.lotto(m.roccia, SETTORE).aggiungi(kit.uvMetri(g, 0.6));
}

function cristalli(kit, m, caso, soffitto) {
  const prisma = new THREE.CylinderGeometry(0.06, 0.1, 0.7, 6).translate(0, 0.35, 0);
  const punta = new THREE.ConeGeometry(0.06, 0.24, 6).translate(0, 0.82, 0);
  const geometria = mergeGeometries([prisma.toNonIndexed(), punta.toNonIndexed()].map(g => {
    for (const nome of Object.keys(g.attributes)) if (nome !== 'position' && nome !== 'normal') g.deleteAttribute(nome);
    return g;
  }));
  const matrici = [];
  const ciuffo = (x, y, z, giu, quanti, scala) => {
    for (let k = 0; k < quanti; k++) {
      const s = scala * (0.5 + caso() * 0.9);
      const inclina = (caso() - 0.5) * 1.2;
      const gira = caso() * Math.PI * 2;
      matrici.push(matrice(x + (caso() - 0.5) * 0.5, y, z + (caso() - 0.5) * 0.5, { rx: (giu ? Math.PI : 0) + inclina, ry: gira, rz: (caso() - 0.5) * 0.8, s }));
    }
  };
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * Math.PI * 2 + caso() * 0.2;
    const x = Math.cos(a) * (VOLTA.rx + 0.9);
    const z = CZ + Math.sin(a) * (VOLTA.rz + 0.9);
    ciuffo(x, soffitto(x, z) + 0.1, z, true, 3, 0.9);
  }
  const base = [[-21.7, -29], [-21.7, -45.5], [-21.7, -56], [21.7, -29.5], [21.7, -38], [21.7, -48], [21.7, -57], [-15, -59.7], [-6, -59.7], [6, -59.7], [15, -59.7], [-19, -26.5], [19, -26.5], [-21.2, -59.2], [21.2, -59.2]];
  for (const [x, z] of base) ciuffo(x, F - 0.05, z, false, 6, 1.1);
  const mesh = new THREE.InstancedMesh(geometria, m.cristallo, matrici.length);
  matrici.forEach((mm, i) => mesh.setMatrixAt(i, mm));
  mesh.userData.pieni = matrici.length;
  mesh.computeBoundingSphere();
  kit.scena.add(mesh);
}

function costruisciPavimento(kit, m, caso) {
  const L = kit.lotto(m.pavimento, SETTORE);
  const parti = [];
  const tinta = scuro => {
    const t = (scuro ? 0.42 : 0.8) + caso() * (scuro ? 0.12 : 0.2);
    const caldo = 0.04 + (caso() - 0.5) * 0.05;
    return [t + caldo, t, t - caldo * 2];
  };
  const lastra = (x0, z0, x1, z1, scuro) => {
    const [r, g, b] = tinta(scuro);
    const h = (caso() - 0.5) * 0.006;
    const blocco = scatola(x0 + 0.018, F - 0.3, z0 + 0.018, x1 - 0.018, F + h, z1 - 0.018);
    parti.push(colora(blocco, v => (v.y < F - 0.04 ? [r * 0.3, g * 0.3, b * 0.3] : [r, g, b])));
  };
  const pozza = (x0, z0, x1, z1) => TANE.some(t => Math.hypot(Math.max(x0 - t.x, 0, t.x - x1), Math.max(z0 - t.z, 0, t.z - z1)) < 1.45);
  for (let x = -23; x < 23; x += 2) {
    for (let z = -30; z > -62; z -= 2) {
      const x1 = x + 2;
      const z0 = z - 2;
      if (pozza(x, z0, x1, z)) continue;
      const via = x >= -3 && x1 <= 3 && z0 >= -56;
      if (!via) {
        lastra(x, z0, x1, z, false);
        continue;
      }
      for (const [a, b] of [[x, z0], [x + 1, z0], [x, z0 + 1], [x + 1, z0 + 1]]) lastra(a, b, a + 1, b + 1, true);
    }
  }
  parti.push(colora(scatola(-23, F - 0.32, -62, 23, F - 0.06, -30), () => [0.08, 0.08, 0.09]));
  const gradini = [[0, -26, -25.3]];
  for (let k = 1; k <= 4; k++) gradini.push([-0.4 * k, -26 - k, -25 - k]);
  gradini.forEach(([y, z0, z1], k) => {
    for (let x = -23; x < 23; x += 2.3) {
      const [r, g, b] = tinta(false);
      const blocco = scatola(x + 0.015, F - 0.3, z0, Math.min(23, x + 2.3) - 0.015, y, z1 - (k === 0 ? 0 : 0.01));
      parti.push(colora(blocco, v => (v.y < y - 0.32 ? [r * 0.35, g * 0.35, b * 0.35] : [r, g, b])));
    }
  });
  L.aggiungi(kit.uvMetri(mergeGeometries(parti.map(p => p.toNonIndexed())), 1));
  const fregi = [];
  gradini.forEach(([y, z0]) => {
    const piano = new THREE.PlaneGeometry(46, 0.26).rotateY(Math.PI).translate(0, y - 0.2, z0 - 0.004);
    fregi.push(scalaUV(piano, 46 / 3.2, 1));
  });
  kit.lotto(m.fregio, SETTORE).aggiungi(mergeGeometries(fregi));
  for (const t of TANE) {
    const zc = Math.round((t.z - 0.5) / 2) * 2;
    const forma = new THREE.Shape([[-2, -2], [2, -2], [2, 2], [-2, 2]].map(([a, b]) => new THREE.Vector2(a, b)));
    const buco = new THREE.Path();
    buco.absarc(0, zc - t.z, 1.4, 0, Math.PI * 2, true);
    forma.holes.push(buco);
    const lastraPozza = new THREE.ExtrudeGeometry(forma, { depth: 0.3, bevelEnabled: false, curveSegments: 32 }).rotateX(-Math.PI / 2).translate(t.x, F - 0.3, zc);
    L.aggiungi(kit.uvMetri(colora(lastraPozza, () => [0.62, 0.6, 0.58]), 1));
    const conca = new THREE.CylinderGeometry(1.4, 1.1, 1.3, 40, 2, true).translate(t.x, F - 0.65, t.z);
    kit.lotto(m.rocciaDoppia, SETTORE).aggiungi(kit.uvMetri(conca, 0.8));
    const pietre = [];
    for (let k = 0; k < 14; k++) {
      if (caso() < 0.18) continue;
      const a0 = (k / 14) * Math.PI * 2 + 0.03;
      const a1 = ((k + 1) / 14) * Math.PI * 2 - 0.03;
      const alto = 0.08 + caso() * 0.1;
      const c = [];
      for (const [r, y] of [[1.38, F], [1.78, F], [1.78, F + alto], [1.38, F + alto]]) c.push(r, y);
      const ang = [a0, a1];
      const v = (a, r, y) => new THREE.Vector3(t.x + Math.cos(a) * r, y, t.z + Math.sin(a) * r);
      pietre.push(esaedro([v(ang[0], 1.38, F - 0.05), v(ang[1], 1.38, F - 0.05), v(ang[1], 1.38, F + alto), v(ang[0], 1.38, F + alto), v(ang[0], 1.8, F - 0.05), v(ang[1], 1.8, F - 0.05), v(ang[1], 1.8, F + alto * 0.7), v(ang[0], 1.8, F + alto * 0.7)]));
    }
    kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(pietre), 1));
  }
}

function costruisciIntarsi(kit, m) {
  const oro = [];
  const luce = [];
  const Y = F + 0.004;
  const striscia = (x0, z0, x1, z1, lista, alto = 0.012) => lista.push(scatola(x0, F - 0.01, z0, x1, Y + alto, z1));
  const anello = (cx, cz, r0, r1, lista, quota = Y + 0.008) => lista.push(new THREE.RingGeometry(r0, r1, 96, 1).rotateX(-Math.PI / 2).translate(cx, quota, cz));
  for (const s of [-1, 1]) {
    striscia(s * 3.08 - 0.08, -56, s * 3.08 + 0.08, -30.05, oro);
    striscia(s * 2.78 - 0.03, -55.7, s * 2.78 + 0.03, -30.05, luce, 0.014);
  }
  for (let z = -32; z > -55; z -= 4) {
    if (Math.abs(z - ALTARE.z) < 4.5) continue;
    striscia(-2.7, z - 0.07, 2.7, z + 0.07, oro);
    striscia(-2.4, z - 0.6, 2.4, z - 0.56, luce, 0.014);
  }
  anello(ALTARE.x, ALTARE.z, 2.2, 2.34, oro);
  anello(ALTARE.x, ALTARE.z, 2.95, 3.1, oro);
  anello(ALTARE.x, ALTARE.z, 2.58, 2.64, luce, Y + 0.012);
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const r0 = 3.15;
    const r1 = k % 2 ? 3.9 : 4.6;
    const g = new THREE.BoxGeometry(r1 - r0, 0.02, k % 2 ? 0.05 : 0.09).translate((r0 + r1) / 2, Y, 0).rotateY(-a).translate(ALTARE.x, 0, ALTARE.z);
    (k % 2 ? luce : oro).push(g);
  }
  anello(POTENZIATORE.x, POTENZIATORE.z - 0.35, 1.3, 1.36, luce, Y + 0.012);
  anello(POTENZIATORE.x, POTENZIATORE.z - 0.35, 1.5, 1.62, oro);
  const stella = new THREE.Shape();
  for (let k = 0; k <= 16; k++) {
    const a = (k / 16) * Math.PI * 2 - Math.PI / 2;
    const r = k % 2 ? 0.7 : 1.9;
    if (k === 0) stella.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else stella.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const vuoto = new THREE.Path();
  vuoto.absarc(0, 0, 0.55, 0, Math.PI * 2, true);
  stella.holes.push(vuoto);
  oro.push(new THREE.ShapeGeometry(stella, 8).rotateX(-Math.PI / 2).translate(0, Y + 0.006, -33.6));
  anello(0, -33.6, 0.3, 0.42, luce, Y + 0.012);
  kit.lotto(m.oroIntarsio, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(oro.map(g => g.index ? g.toNonIndexed() : g)), 1));
  kit.lotto(m.intarsio, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(luce.map(g => g.index ? g.toNonIndexed() : g)), 1));
}

function costruisciColonne(kit, m, caso) {
  const marmo = [];
  const scuro = [];
  const oro = [];
  const luce = [];
  for (const [i, c] of COLONNE_SANTUARIO.entries()) {
    const cima = F + c.alta;
    scuro.push(scatola(c.x - 0.875, F, c.z - 0.875, c.x + 0.875, F + 0.35, c.z + 0.875));
    scuro.push(scatola(c.x - 0.78, F + 0.35, c.z - 0.78, c.x + 0.78, F + 0.6, c.z + 0.78));
    oro.push(scatola(c.x - 0.8, F + 0.33, c.z - 0.8, c.x + 0.8, F + 0.37, c.z + 0.8));
    marmo.push(new THREE.TorusGeometry(0.68, 0.11, 10, 48).rotateX(Math.PI / 2).translate(c.x, F + 0.71, c.z));
    marmo.push(new THREE.TorusGeometry(0.63, 0.07, 8, 48).rotateX(Math.PI / 2).translate(c.x, F + 0.87, c.z));
    const da = F + 0.82;
    const alto = c.rotta ? cima - da : 10.6 - da;
    marmo.push(fusto(kit.rumore, 0.62, c.rotta ? tra(0.62, 0.55, alto / (10.6 - da)) : 0.55, alto, { rotta: c.rotta, seme: i * 3.7 }).translate(c.x, da, c.z));
    luce.push(new THREE.CylinderGeometry(0.64, 0.645, 0.12, 48).translate(c.x, F + 1.3, c.z));
    if (c.rotta) {
      const verso = Math.sign(c.x);
      const tamburo = fusto(kit.rumore, 0.6, 0.6, 1.1, { seme: i * 5.1 + 2, radiali: 64 });
      marmo.push(tamburo.translate(0, -0.55, 0).rotateZ(Math.PI / 2 + (caso() - 0.5) * 0.2).rotateY(caso() * 0.6 - 0.3).translate(c.x + verso * 2.3, F + 0.12, c.z + (caso() - 0.5) * 1.5));
      for (let k = 0; k < 5; k++) {
        const s = 0.18 + caso() * 0.25;
        scuro.push(new THREE.DodecahedronGeometry(s, 0).translate(c.x + (caso() - 0.5) * 2.6, F + s * 0.4, c.z + (caso() - 0.5) * 2.6));
      }
      continue;
    }
    luce.push(new THREE.CylinderGeometry(0.58, 0.58, 0.13, 48).translate(c.x, 10.66, c.z));
    marmo.push(torno([[0.57, 0], [0.6, 0.06], [0.7, 0.2], [0.86, 0.38], [0.98, 0.54], [1.03, 0.64], [1.0, 0.7], [0.0, 0.71]], 48, 2).translate(c.x, 10.72, c.z));
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      marmo.push(new THREE.TorusGeometry(0.2, 0.075, 8, 20, Math.PI * 1.6).rotateY(-a + Math.PI / 2).translate(c.x + Math.cos(a) * 0.86, 11.18, c.z + Math.sin(a) * 0.86));
    }
    scuro.push(scatola(c.x - 1.0, 11.4, c.z - 1.0, c.x + 1.0, 11.7, c.z + 1.0));
    oro.push(scatola(c.x - 1.03, 11.67, c.z - 1.03, c.x + 1.03, 11.71, c.z + 1.03));
    marmo.push(scatola(c.x - 1.08, 11.7, c.z - 1.08, c.x + 1.08, 12.0, c.z + 1.08));
  }
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(marmo.map(g => g.index ? g.toNonIndexed() : g).map(g => {
    for (const nome of Object.keys(g.attributes)) if (nome !== 'position' && nome !== 'normal') g.deleteAttribute(nome);
    return g;
  })), 0.8), null, { ombra: true });
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(scuro), 1), null, { ombra: true });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(kit.mat.oricalco, SETTORE).aggiungi(unisciPiatte(luce));
}

export function unisciPiatte(parti) {
  return mergeGeometries(parti.map(g => {
    const n = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(n.attributes)) if (nome !== 'position' && nome !== 'normal') n.deleteAttribute(nome);
    if (!n.attributes.normal) n.computeVertexNormals();
    return n;
  }));
}

function costruisciArchi(kit, m, caso, soffitto) {
  const pezzi = [];
  const mensole = [];
  const integra = c => c && !c.rotta;
  const Y = 12;
  const mensola = (x, z) => {
    const cima = soffitto(x, z);
    mensole.push(scatola(x - 0.7, Y - 1.1, z - 0.7, x + 0.7, Math.max(Y + 0.6, cima + 0.6), z + 0.7));
  };
  for (const x of [-12, 12]) {
    const fila = COLONNE_SANTUARIO.filter(c => c.x === x).sort((a, b) => b.z - a.z);
    const prima = fila[0];
    const ultima = fila[fila.length - 1];
    if (integra(prima)) {
      pezzi.push(arcoAcuto(new THREE.Vector3(x, Y, prima.z), new THREE.Vector3(x, Y, -28.2), { alzata: 3.6, profondita: 1.15 }));
      mensola(x, -28.2);
    }
    if (integra(ultima)) {
      pezzi.push(arcoAcuto(new THREE.Vector3(x, Y, ultima.z), new THREE.Vector3(x, Y, -57.8), { alzata: 3.6, profondita: 1.15 }));
      mensola(x, -57.8);
    }
    for (let k = 0; k < fila.length - 1; k++) {
      const a = fila[k];
      const b = fila[k + 1];
      if (integra(a) && integra(b)) {
        pezzi.push(arcoAcuto(new THREE.Vector3(x, Y, a.z), new THREE.Vector3(x, Y, b.z), { alzata: 4, profondita: 1.15 }));
        continue;
      }
      const sana = integra(a) ? a : integra(b) ? b : null;
      if (!sana) continue;
      const altra = sana === a ? b : a;
      pezzi.push(arcoAcuto(new THREE.Vector3(x, Y, sana.z), new THREE.Vector3(x, Y, altra.z), { alzata: 4, profondita: 1.15, fino: 6 + Math.floor(caso() * 2) }));
      const zc = tra(sana.z, altra.z, 0.6);
      pezzi.push(new THREE.BoxGeometry(1.1, 0.7, 0.55).rotateX(0.4).rotateZ((caso() - 0.5) * 0.6).translate(x + (caso() - 0.5) * 1.2, F + 0.2, zc));
    }
    for (const c of fila) {
      if (!integra(c)) continue;
      const verso = Math.sign(x);
      pezzi.push(arcoAcuto(new THREE.Vector3(x, Y, c.z), new THREE.Vector3(x + verso * 6.5, Y, c.z), { alzata: 3.4, profondita: 1.0, spessore: 0.62 }));
      mensola(x + verso * 6.5, c.z);
    }
  }
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(pezzi), 0.8), null, { ombra: true });
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(kit.deforma(unisci(mensole), { ampiezza: 0.12, frequenza: 1.1, ottave: 3, seme: 8 }), 0.8));
}

function geometriaStatua(kit) {
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const corpo = [];
  const riccioli = [];
  const oro = [];
  const lampi = [];
  corpo.push(modella(torno([[1.6, 0], [1.58, 0.12], [1.5, 0.5], [1.4, 1.2], [1.3, 2.0], [1.2, 2.9], [1.12, 3.8], [1.06, 4.7], [1.02, 5.5], [1.0, 6.1], [0.97, 6.35]], 72, 3), v => {
    const a = Math.atan2(v.x, v.z);
    const r = Math.hypot(v.x, v.z);
    const pieghe = 0.06 * Math.sin(a * 11 + v.y * 0.45 + Math.sin(a * 3) * 1.5) * (1 - liscia(4.5, 6.3, v.y));
    const ginocchio = 0.16 * Math.exp(-(differenzaAngolo(a, -0.42) ** 2) / 0.09 - ((v.y - 3.5) ** 2) / 0.7);
    const orlo = v.y < 0.4 ? 0.04 * Math.sin(a * 23) : 0;
    const nr = r * (1 + pieghe + orlo) + ginocchio;
    v.set(Math.sin(a) * nr, v.y, Math.cos(a) * nr * 0.8);
  }));
  corpo.push(modella(torno([[0.97, 6.0], [1.0, 6.4], [1.05, 6.9], [1.1, 7.4], [1.2, 7.95], [1.33, 8.5], [1.45, 9.05], [1.5, 9.5], [1.45, 9.85], [1.25, 10.15], [0.9, 10.38], [0.55, 10.5], [0.45, 10.6]], 72, 3), v => {
    const a = Math.atan2(v.x, v.z);
    const r = Math.hypot(v.x, v.z);
    let extra = 0;
    if (Math.abs(a) < 1.4) extra += 0.17 * Math.exp(-((Math.abs(a) - 0.5) ** 2) / 0.07 - ((v.y - 9.05) ** 2) / 0.16);
    for (const riga of [7.05, 7.6, 8.15]) for (const col of [-0.17, 0.17]) extra += 0.045 * Math.exp(-(differenzaAngolo(a, col) ** 2) / 0.012 - ((v.y - riga) ** 2) / 0.04);
    extra -= 0.05 * Math.exp(-(differenzaAngolo(a, Math.PI) ** 2) / 0.03);
    const nr = r + extra;
    v.set(Math.sin(a) * nr, v.y, Math.cos(a) * nr * 0.7);
  }));
  for (const s of [-1, 1]) corpo.push(new THREE.SphereGeometry(0.6, 22, 14).scale(1, 0.92, 0.98).translate(s * 1.48, 9.92, 0));
  corpo.push(new THREE.CylinderGeometry(0.4, 0.48, 0.9, 28).translate(0, 10.8, -0.02));
  corpo.push(modella(new THREE.SphereGeometry(0.7, 36, 26), v => {
    if (v.y < 0) {
      const k = 1 - 0.2 * (-v.y / 0.7);
      v.x *= k;
    }
    v.set(v.x * 0.82, v.y, v.z * 0.92);
  }).translate(0, 11.72, 0.06));
  corpo.push(new THREE.BoxGeometry(0.15, 0.34, 0.2).rotateX(0.32).translate(0, 11.7, 0.66));
  corpo.push(capsula(V(-0.22, 11.93, 0.6), V(0.22, 11.93, 0.6), 0.07, 10));
  for (const s of [-1, 1]) corpo.push(new THREE.SphereGeometry(0.14, 12, 8).translate(s * 0.3, 11.66, 0.5));
  for (const s of [-1, 1]) riccioli.push(capsula(V(s * 0.04, 11.55, 0.68), V(s * 0.3, 11.42, 0.6), 0.055, 8));
  riccioli.push(modella(new THREE.SphereGeometry(0.55, 26, 18), v => {
    if (v.y < 0) {
      const k = 1 + (v.y / 0.55) * 0.55;
      v.x *= k;
      v.z *= k;
    }
    const a = Math.atan2(v.x, v.z);
    const r = Math.hypot(v.x, v.z);
    const nr = r + 0.035 * Math.sin(a * 14 + v.y * 3);
    v.set(Math.sin(a) * nr, v.y * 1.6, Math.cos(a) * nr * 0.62);
  }).translate(0, 11.05, 0.42));
  riccioli.push(new THREE.SphereGeometry(0.76, 26, 18).scale(1.04, 1.08, 0.98).translate(0, 11.92, -0.1));
  for (const [x0, x1, r] of [[0.55, 0.95, 0.17], [-0.55, -0.95, 0.17], [0, 0, 0.2], [0.3, 0.45, 0.16], [-0.3, -0.45, 0.16]]) {
    riccioli.push(capsula(V(x0, 11.6, -0.4), V(x1, 10.15, -0.6), r, 12));
  }
  oro.push(new THREE.CylinderGeometry(0.79, 0.77, 0.3, 40, 1, true).translate(0, 12.42, -0.06));
  for (let k = 0; k < 9; k++) {
    const a = -2.1 + (k / 8) * 4.2;
    const h = 0.5 + 0.38 * Math.cos(a * 0.8);
    oro.push(new THREE.ConeGeometry(0.085, h, 8).translate(0, h / 2, 0).rotateX(0.18).rotateY(a).translate(Math.sin(a) * 0.8, 12.55, Math.cos(a) * 0.8 - 0.06));
  }
  for (let k = 0; k < 5; k++) {
    const a = -0.9 + (k / 4) * 1.8;
    lampi.push(new THREE.SphereGeometry(0.055, 10, 8).translate(Math.sin(a) * 0.81, 12.42, Math.cos(a) * 0.81 - 0.06));
  }
  for (const s of [-1, 1]) lampi.push(new THREE.SphereGeometry(0.065, 12, 10).translate(s * 0.21, 11.8, 0.6));
  const spallaA = V(1.5, 9.9, 0);
  const gomitoA = V(2.42, 10.8, 0.3);
  const manoA = V(2.72, 12.1, 0.45);
  corpo.push(capsula(spallaA, gomitoA, 0.4, 16), capsula(gomitoA, manoA, 0.33, 16));
  corpo.push(new THREE.SphereGeometry(0.34, 20, 14).translate(tra(1.5, 2.42, 0.45), tra(9.9, 10.8, 0.45) + 0.08, 0.2));
  corpo.push(new THREE.SphereGeometry(0.34, 20, 14).scale(1, 1.2, 1).translate(manoA.x, manoA.y, manoA.z));
  const spallaB = V(-1.5, 9.9, 0);
  const gomitoB = V(-2.02, 8.35, 0.6);
  const manoB = V(-1.92, 7.75, 1.7);
  corpo.push(capsula(spallaB, gomitoB, 0.4, 16), capsula(gomitoB, manoB, 0.32, 16));
  corpo.push(new THREE.SphereGeometry(0.28, 18, 12).scale(1.15, 0.45, 1.3).translate(manoB.x, manoB.y + 0.02, manoB.z + 0.1));
  for (let k = 0; k < 4; k++) {
    const x = -2.12 + k * 0.13;
    corpo.push(capsula(V(x, 7.78, 1.98), V(x, 7.92, 2.22), 0.058, 8));
  }
  corpo.push(capsula(V(-1.66, 7.8, 1.75), V(-1.6, 7.98, 1.98), 0.065, 8));
  lampi.push(new THREE.SphereGeometry(0.4, 28, 20).translate(-1.92, 8.2, 1.85));
  corpo.push(tubo([V(-1.32, 10.05, 0.42), V(-0.75, 9.5, 0.92), V(-0.05, 8.6, 1.02), V(0.6, 7.55, 0.92), V(0.98, 6.6, 0.7), V(1.08, 6.1, 0.45)], 0.2, { segmenti: 40, radiali: 10 }));
  oro.push(new THREE.TorusGeometry(1.0, 0.1, 10, 72).rotateX(Math.PI / 2).scale(1, 1, 0.74).translate(0, 6.18, 0));
  for (const [s, e] of [[spallaA, gomitoA], [spallaB, gomitoB]]) {
    const centro = s.clone().lerp(e, 0.3);
    const g = new THREE.TorusGeometry(0.42, 0.06, 8, 28);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), e.clone().sub(s).normalize()));
    oro.push(g.translate(centro.x, centro.y, centro.z));
  }
  const asta = [2.76, 0.46];
  oro.push(new THREE.CylinderGeometry(0.12, 0.12, 9.5, 16).translate(asta[0], 4.2 + 4.75, asta[1]));
  for (const y of [4.3, 7.0, 9.8, 13.4]) oro.push(new THREE.TorusGeometry(0.16, 0.045, 8, 20).rotateX(Math.PI / 2).translate(asta[0], y, asta[1]));
  oro.push(capsula(V(asta[0] - 0.62, 13.7, asta[1]), V(asta[0] + 0.62, 13.7, asta[1]), 0.1, 10));
  for (const s of [-1, 1]) {
    oro.push(tubo([V(asta[0] + s * 0.58, 13.7, asta[1]), V(asta[0] + s * 0.7, 14.2, asta[1]), V(asta[0] + s * 0.62, 14.75, asta[1])], 0.08, { segmenti: 12, radiali: 8 }));
    lampi.push(new THREE.ConeGeometry(0.15, 0.45, 8).translate(asta[0] + s * 0.62, 14.97, asta[1]));
    lampi.push(new THREE.ConeGeometry(0.06, 0.2, 6).rotateZ(-s * 2.6).translate(asta[0] + s * 0.72, 14.8, asta[1]));
  }
  oro.push(new THREE.CylinderGeometry(0.09, 0.1, 1.3, 10).translate(asta[0], 14.35, asta[1]));
  lampi.push(new THREE.ConeGeometry(0.16, 0.5, 8).translate(asta[0], 15.25, asta[1]));
  return {
    corpo: kit.uvMetri(kit.deforma(unisci(corpo), { ampiezza: 0.032, frequenza: 1.8, ottave: 4, seme: 2 }), 0.6),
    riccioli: kit.uvMetri(kit.deforma(unisci(riccioli), { ampiezza: 0.075, frequenza: 5.5, ottave: 3, seme: 6 }), 0.6),
    oro: kit.uvMetri(uniscinative(oro), 1),
    lampi: uniscinative(lampi),
  };
}

function costruisciStatue(kit, m) {
  const base = geometriaStatua(kit);
  const specchiata = Object.fromEntries(Object.entries(base).map(([k, g]) => [k, specchia(g)]));
  const fregi = [];
  const scuro = [];
  const oro = [];
  for (const s of STATUE) {
    const g = s.x < 0 ? specchiata : base;
    const mm = matrice(s.x, F + 2.5, s.z, { ry: s.verso, s: SCALA_STATUA });
    kit.lotto(m.statua, SETTORE).aggiungi(g.corpo, mm, { ombra: true });
    kit.lotto(m.statua, SETTORE).aggiungi(g.riccioli, mm, { ombra: true });
    kit.lotto(kit.mat.oro, SETTORE).aggiungi(g.oro, mm, { ombra: true });
    kit.lotto(kit.mat.oricalco, SETTORE).aggiungi(g.lampi, mm);
    const piedistallo = matrice(s.x, 0, s.z, { ry: s.verso });
    const pezzi = [scatola(-1.8, F, -1.8, 1.8, F + 0.6, 1.8), scatola(-1.6, F + 0.6, -1.6, 1.6, F + 2.2, 1.6), scatola(-1.72, F + 2.2, -1.72, 1.72, F + 2.5, 1.72)];
    for (const p of pezzi) scuro.push(p.applyMatrix4(piedistallo));
    for (const y of [F + 0.6, F + 2.2]) oro.push(scatola(-1.66, y - 0.03, -1.66, 1.66, y + 0.03, 1.66).applyMatrix4(piedistallo));
    for (let k = 0; k < 4; k++) {
      const f = scalaUV(new THREE.PlaneGeometry(3.0, 0.42), 1, 1).translate(0, F + 1.45, 1.605).rotateY((k * Math.PI) / 2);
      fregi.push(f.applyMatrix4(piedistallo));
    }
  }
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(scuro), 0.8), null, { ombra: true });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(m.fregio, SETTORE).aggiungi(mergeGeometries(fregi));
}

function geometriaBraciere() {
  const corpo = torno([[0.44, 0], [0.44, 0.07], [0.36, 0.11], [0.2, 0.2], [0.13, 0.32], [0.11, 0.5], [0.12, 0.72], [0.17, 0.78], [0.12, 0.84], [0.14, 0.9], [0.28, 0.96], [0.44, 1.04], [0.54, 1.14], [0.6, 1.24], [0.6, 1.29], [0.55, 1.3], [0.47, 1.2], [0.3, 1.14], [0.0, 1.13]], 28, 2);
  const parti = [corpo];
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    const p = (r, y) => new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    parti.push(tubo([p(0.42, 1.04), p(0.6, 0.7), p(0.55, 0.3), p(0.42, 0.06)], 0.045, { segmenti: 16, radiali: 6 }));
    const b = a + Math.PI / 3;
    parti.push(new THREE.TorusGeometry(0.11, 0.03, 6, 14, Math.PI * 1.3).rotateY(-b).translate(Math.cos(b) * 0.66, 1.2, Math.sin(b) * 0.66));
  }
  return uniscinative(parti);
}

function costruisciBracieri(kit, m) {
  const g = geometriaBraciere();
  const fiamme = [];
  const braci = [];
  for (const [i, b] of BRACIERI.entries()) {
    kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(g.clone().translate(b.x, F, b.z), 1.5), null, { ombra: true });
    braci.push(new THREE.CircleGeometry(0.5, 24).rotateX(-Math.PI / 2).translate(b.x, F + 1.17, b.z));
    const y = F + 1.13;
    fiamme.push({ x: b.x, y, z: b.z, l: 1.0, a: 1.85, seme: i * 1.7 + 0.1 });
    fiamme.push({ x: b.x + 0.14, y, z: b.z + 0.08, l: 0.7, a: 1.3, seme: i * 1.7 + 0.5 });
    fiamme.push({ x: b.x - 0.12, y, z: b.z - 0.1, l: 0.62, a: 1.15, seme: i * 1.7 + 0.9 });
    fiamme.push({ x: b.x, y: y + 0.02, z: b.z, l: 0.42, a: 0.8, seme: i * 1.7 + 1.3 });
    kit.luce({ x: b.x, y: F + 2.1, z: b.z, colore: 0x3fd6ff, intensita: 9, portata: 11, tremola: true });
  }
  kit.lotto(m.brace, SETTORE).aggiungi(mergeGeometries(braci));
  return creaFiamme(kit, fiamme);
}

function costruisciConchiglia(kit, m) {
  const NU = 72;
  const NV = 34;
  const fmax = 1.22;
  const rx = 3.25;
  const ry = 4.3;
  const nervature = 14;
  const punto = (i, j, dietro) => {
    const phi = -fmax + (i / NU) * fmax * 2;
    const rho = 0.12 + (j / NV) * 0.88;
    const k = phi / fmax;
    const c = Math.cos(k * Math.PI * nervature);
    const rr = rho * (1 + 0.035 * c);
    const costa = 0.17 * rr * Math.pow(0.5 + 0.5 * c, 1.5);
    let z = -1.35 * rr * (1 - rr * 0.6) * (1 - 0.4 * k * k) + 0.55 * rr * rr * k * k + costa + 0.012 * Math.sin(rr * 55);
    if (dietro) z -= 0.25 + 0.35 * rr * (1 - rr * 0.5) + costa * 0.6;
    return new THREE.Vector3(rr * rx * Math.sin(phi), rr * ry * Math.cos(phi), z);
  };
  const griglia = dietro => {
    const pos = [];
    for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) {
      const p = punto(i, j, dietro);
      pos.push(p.x, p.y, p.z);
    }
    return pos;
  };
  const id = (i, j) => j * (NU + 1) + i;
  const fronte = new THREE.BufferGeometry();
  fronte.setAttribute('position', new THREE.Float32BufferAttribute(griglia(false), 3));
  const indiciF = [];
  for (let j = 0; j < NV; j++) for (let i = 0; i < NU; i++) indiciF.push(id(i, j), id(i + 1, j), id(i + 1, j + 1), id(i, j), id(i + 1, j + 1), id(i, j + 1));
  fronte.setIndex(indiciF);
  fronte.computeVertexNormals();
  const davanti = griglia(false);
  const dietro = griglia(true);
  const n = (NU + 1) * (NV + 1);
  const retro = new THREE.BufferGeometry();
  retro.setAttribute('position', new THREE.Float32BufferAttribute([...dietro, ...davanti], 3));
  const indiciR = [];
  for (let j = 0; j < NV; j++) for (let i = 0; i < NU; i++) indiciR.push(id(i, j), id(i + 1, j + 1), id(i + 1, j), id(i, j), id(i, j + 1), id(i + 1, j + 1));
  const cuci = (a0, a1, b0, b1) => indiciR.push(a0, a1, b1, a0, b1, b0);
  for (let i = 0; i < NU; i++) {
    cuci(n + id(i, NV), n + id(i + 1, NV), id(i, NV), id(i + 1, NV));
    cuci(id(i, 0), id(i + 1, 0), n + id(i, 0), n + id(i + 1, 0));
  }
  for (let j = 0; j < NV; j++) {
    cuci(n + id(0, j), n + id(0, j + 1), id(0, j), id(0, j + 1));
    cuci(id(NU, j), id(NU, j + 1), n + id(NU, j), n + id(NU, j + 1));
  }
  retro.setIndex(indiciR);
  retro.computeVertexNormals();
  const posa = matrice(CONCHIGLIA.x, F + 1.02, CONCHIGLIA.z + 0.2, { rx: -0.12 });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(fronte, 0.9), posa, { ombra: true });
  const pietra = [retro];
  for (const s of [-1, 1]) {
    const orecchio = new THREE.Shape([[0, 0], [1.15, 0.12], [1.05, 0.8], [0, 0.62]].map(([a, b]) => new THREE.Vector2(a, b)));
    pietra.push(new THREE.ExtrudeGeometry(orecchio, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 }).scale(s, 1, 1).translate(0, 0.02, -0.65));
  }
  kit.lotto(kit.mat.pietra, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(pietra), 0.9), posa, { ombra: true });
  const linee = [];
  const orlo = [];
  for (let i = 0; i <= NU; i += 1) orlo.push(punto(i, NV, false).add(new THREE.Vector3(0, 0, 0.04)));
  linee.push(tubo(orlo, 0.075, { segmenti: 140, radiali: 8 }));
  for (let r = -7; r <= 7; r++) {
    const i = Math.round(((r / 7 + 1) / 2) * NU);
    const tratto = [];
    for (let j = 3; j <= NV - 1; j += 3) tratto.push(punto(i, j, false).add(new THREE.Vector3(0, 0, 0.03)));
    linee.push(tubo(tratto, 0.028, { segmenti: 24, radiali: 5 }));
  }
  kit.lotto(m.bordo, SETTORE).aggiungi(unisciPiatte(linee), posa);
  const base = [scatola(-3.4, F, -58.6, 3.4, F + 0.5, -55.6), scatola(-3.0, F + 0.5, -58.3, 3.0, F + 0.95, -55.9)];
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(base), 0.9), null, { ombra: true });
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte([scatola(-3.04, F + 0.93, -58.34, 3.04, F + 0.98, -55.86), scatola(-3.44, F + 0.48, -58.64, 3.44, F + 0.52, -55.56)]), 1));
  const p = POTENZIATORE;
  const pz = p.z - 0.35;
  const piede = [
    new THREE.CylinderGeometry(0.62, 0.68, 0.16, 32).translate(p.x, F + 0.08, pz),
    fusto(kit.rumore, 0.3, 0.26, 0.72, { radiali: 48, scanalature: 12, seme: 9 }).translate(p.x, F + 0.16, pz),
    torno([[0.12, 0], [0.28, 0.06], [0.5, 0.16], [0.56, 0.22], [0.5, 0.24], [0.3, 0.17], [0.0, 0.15]], 32, 2).translate(p.x, F + 0.86, pz),
  ];
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(piede), 1));
  const vortice = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 0.22, 3.6, 40, 8, true), new THREE.ShaderMaterial({
    uniforms: { uTempo: kit.uniformi.uTempo, uForza: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float a = uv.y * 4.0;
        p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uForza;
      varying vec2 vUv;
      ${RUMORE_GLSL}
      void main() {
        float spire = sin(vUv.x * 6.2831 * 4.0 + vUv.y * 16.0 - uTempo * 10.0);
        float strisce = smoothstep(0.1, 1.0, spire);
        float n = rumoreAb(vec3(vUv.x * 9.0, vUv.y * 5.0 - uTempo * 3.0, 1.0));
        float fade = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));
        vec3 col = vec3(0.25, 0.85, 1.4) * (strisce * 0.8 + 0.15 + n * 0.3) * fade * uForza;
        gl_FragColor = vec4(col, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }));
  vortice.position.set(p.x, F + 1.2 + 1.8, pz);
  vortice.visible = false;
  kit.scena.add(vortice);
  const vetrina = new THREE.Group();
  vetrina.position.set(p.x, F + 1.55, pz);
  kit.scena.add(vetrina);
  return { vortice, vetrina, alone: kit.luce({ x: p.x, y: F + 2.2, z: p.z + 0.6, colore: 0x5fe0ff, intensita: 10, portata: 12, forza: () => statoConchiglia.luce }) };
}

const statoConchiglia = { luce: 4 };

function creaVetrina(kit, contenitore, scala) {
  const modelli = new Map();
  let mostrata = null;
  return arma => {
    if (mostrata !== arma) {
      modelli.forEach(g => { g.visible = false; });
      mostrata = arma;
      if (arma && !modelli.has(arma)) {
        const { gruppo } = modelloArma(arma, kit.materialiArmi);
        gruppo.scale.setScalar(scala);
        contenitore.add(gruppo);
        modelli.set(arma, gruppo);
      }
      if (arma) modelli.get(arma).visible = true;
    }
    return arma ? modelli.get(arma) : null;
  };
}

function costruisciAltare(kit, m) {
  const { x, z } = ALTARE;
  const marmo = [];
  const scuro = [scatola(x - 1.35, F, z - 0.85, x + 1.35, F + 0.2, z + 0.85)];
  const oro = [];
  marmo.push(scatola(x - 1.1, F + 0.2, z - 0.6, x + 1.1, F + 0.92, z + 0.6));
  for (const sz of [-1, 1]) {
    for (const sx of [-1, 1]) {
      marmo.push(new THREE.CylinderGeometry(0.11, 0.13, 0.72, 16).translate(x + sx * 1.1, F + 0.56, z + sz * 0.6));
      marmo.push(new THREE.TorusGeometry(0.12, 0.05, 8, 16, Math.PI * 1.5).rotateY(sx > 0 ? 0 : Math.PI).translate(x + sx * 1.15, F + 0.86, z + sz * 0.62));
    }
    oro.push(scatola(x - 0.95, F + 0.3, z + sz * 0.61 - 0.015, x + 0.95, F + 0.34, z + sz * 0.61 + 0.015));
    oro.push(scatola(x - 0.95, F + 0.82, z + sz * 0.61 - 0.015, x + 0.95, F + 0.86, z + sz * 0.61 + 0.015));
  }
  const piano = new THREE.Shape([[-1.25, -0.75], [1.25, -0.75], [1.25, 0.75], [-1.25, 0.75]].map(([a, b]) => new THREE.Vector2(a, b)));
  const incavo = new THREE.Path();
  incavo.absarc(0, 0, 0.34, 0, Math.PI * 2, true);
  piano.holes.push(incavo);
  marmo.push(new THREE.ExtrudeGeometry(piano, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 32 }).rotateX(-Math.PI / 2).translate(x, F + 0.92, z));
  const conca = new THREE.SphereGeometry(0.34, 28, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).scale(-1, 0.7, 1).translate(x, F + 1.1, z);
  conca.computeVertexNormals();
  marmo.push(conca);
  oro.push(new THREE.TorusGeometry(0.36, 0.035, 8, 40).rotateX(Math.PI / 2).translate(x, F + 1.12, z));
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(marmo), 1), null, { ombra: true });
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(scuro), 1));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  const fregi = [];
  for (const sz of [-1, 1]) fregi.push(scalaUV(new THREE.PlaneGeometry(1.9, 0.36), 0.6, 1).rotateY(sz > 0 ? 0 : Math.PI).translate(x, F + 0.58, z + sz * 0.605));
  kit.lotto(m.fregio, SETTORE).aggiungi(mergeGeometries(fregi));
  const cristalli = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) cristalli.push(new THREE.OctahedronGeometry(0.11, 0).scale(1, 2, 1).translate(x + sx * 1.1, F + 1.26, z + sz * 0.6));
  kit.lotto(m.cristalliAltare, SETTORE).aggiungi(unisciPiatte(cristalli));
  const nucleo = new THREE.Group();
  const nucleoMat = new THREE.MeshStandardMaterial({ color: 0x0a3040, emissive: CIANO, emissiveIntensity: 3.2, roughness: 0.15, metalness: 0.3 });
  nucleo.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), nucleoMat));
  const anelli = [0.4, -0.7].map(inclina => {
    const a = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.02, 6, 32), kit.mat.oro);
    a.rotation.set(Math.PI / 2 + inclina, 0, inclina);
    nucleo.add(a);
    return a;
  });
  nucleo.position.set(x, F + 1.08, z);
  nucleo.visible = false;
  kit.scena.add(nucleo);
  const tridente = new THREE.Group();
  const perno = new THREE.Group();
  const { gruppo, bocca } = creaMeraviglia('tridente', ARMI.tridente);
  const asse = new THREE.Group();
  if (bocca && bocca.lengthSq() > 1e-6) asse.quaternion.setFromUnitVectors(bocca.clone().normalize(), new THREE.Vector3(0, 1, 0));
  else asse.rotation.x = Math.PI / 2;
  gruppo.scale.setScalar(2.2);
  asse.add(gruppo);
  perno.add(asse);
  tridente.add(perno);
  tridente.position.set(x, F + 2.9, z);
  tridente.visible = false;
  kit.scena.add(tridente);
  const luce = kit.luce({ x, y: F + 2.2, z: z + 0.8, colore: CIANO, intensita: 8, portata: 10, forza: () => statoAltare.luce });
  return { nucleo, anelli, nucleoMat, tridente, perno, luce };
}

const statoAltare = { luce: 0.6 };

function costruisciTurbina(kit, m, caso) {
  const { x, z } = TURBINA;
  const y = F + 1.4;
  const lamiera = [scatola(x - 1.1, F, z - 1.1, x + 1.1, F + 0.35, z + 1.1)];
  lamiera.push(new THREE.CylinderGeometry(0.95, 0.95, 1.6, 40).rotateZ(Math.PI / 2).translate(x - 0.1, y, z));
  lamiera.push(new THREE.CylinderGeometry(0.62, 0.95, 0.5, 40, 1, true).rotateZ(Math.PI / 2).translate(x - 1.15, y, z));
  for (const s of [-1, 1]) lamiera.push(scatola(x - 0.7, F + 0.35, z + s * 0.75 - 0.12, x + 0.5, y - 0.4, z + s * 0.75 + 0.12));
  const ottone = [];
  for (const dx of [-0.88, 0.72]) ottone.push(new THREE.TorusGeometry(0.98, 0.07, 8, 48).rotateY(Math.PI / 2).translate(x + dx, y, z));
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    ottone.push(new THREE.SphereGeometry(0.045, 6, 4).translate(x + 0.77, y + Math.cos(a) * 0.98, z + Math.sin(a) * 0.98));
  }
  ottone.push(new THREE.TorusGeometry(0.8, 0.05, 6, 40).rotateY(Math.PI / 2).translate(x + 0.82, y, z));
  const acciaio = [];
  for (let k = 0; k < 8; k++) acciaio.push(new THREE.BoxGeometry(0.04, 1.6, 0.06).rotateX((k / 8) * Math.PI).translate(x + 0.84, y, z));
  const condotto = tubo([new THREE.Vector3(x - 0.3, y + 0.8, z), new THREE.Vector3(x - 0.5, y + 2.0, z + 0.2), new THREE.Vector3(x - 1.4, y + 3.0, z + 0.3), new THREE.Vector3(-22.8, y + 3.8, z + 0.4)], 0.28, { segmenti: 30, radiali: 14 });
  const rame = [tubo([new THREE.Vector3(x - 0.6, F + 0.75, z - 0.7), new THREE.Vector3(x - 1.4, F + 0.75, z - 0.75), new THREE.Vector3(-22.8, F + 0.9, z - 0.8)], 0.11, { segmenti: 16, radiali: 10 })];
  rame.push(tubo([new THREE.Vector3(x - 0.6, F + 1.05, z + 0.7), new THREE.Vector3(x - 1.5, F + 1.1, z + 0.75), new THREE.Vector3(-22.8, F + 1.4, z + 0.6)], 0.09, { segmenti: 16, radiali: 10 }));
  const pannello = [scatola(x + 0.75, F + 0.35, z + 0.95, x + 1.05, F + 1.75, z + 1.08), scatola(x + 0.78, F + 0.9, z + 0.62, x + 1.08, F + 1.65, z + 1.08)];
  kit.lotto(kit.mat.lamiera, SETTORE).aggiungi(kit.uvMetri(unisciPiatte([...lamiera, condotto]), 1.2), null, { ombra: true });
  kit.lotto(kit.mat.ottone, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(ottone), 1.5));
  kit.lotto(kit.mat.acciaio, SETTORE).aggiungi(kit.uvMetri(unisciPiatte([...acciaio, ...pannello]), 1.5));
  kit.lotto(kit.mat.rame, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(rame), 1.5));
  const corallo = [];
  const masse = [[x - 1.0, y + 0.6, z - 0.4, 0.75], [x - 0.5, y + 0.85, z + 0.35, 0.6], [x - 1.3, F + 0.6, z + 0.7, 0.7], [x - 0.2, y + 0.95, z - 0.5, 0.45], [x - 1.5, y + 0.2, z - 0.9, 0.55], [x - 1.9, F + 1.2, z, 0.9]];
  const blob = masse.map(([a, b, c, r]) => new THREE.IcosahedronGeometry(r, 2).scale(1, 0.75, 1).translate(a, b, c));
  const masseCorallo = kit.deforma(unisci(blob), { ampiezza: 0.16, frequenza: 5.5, ottave: 4, seme: 12 });
  corallo.push(kit.uvMetri(colora(masseCorallo, v => {
    const n = kit.rumore.fbm(v.x * 3, v.y * 3, v.z * 3, 2);
    return n > 0.32 ? [0.95, 0.4, 0.9] : [0.46, 0.16, 0.34];
  }), 1));
  for (let k = 0; k < 9; k++) {
    const rami = [];
    const sorg = masse[k % masse.length];
    const base = new THREE.Vector3(sorg[0] + (caso() - 0.5) * sorg[3], sorg[1] + sorg[3] * 0.5, sorg[2] + (caso() - 0.5) * sorg[3]);
    ramoCorallo(caso, base, new THREE.Vector3((caso() - 0.5) * 0.6, 1, (caso() - 0.5) * 0.6).normalize(), 0.35 + caso() * 0.25, 0.07, 0, rami, k % 3 ? {} : { punta: [0.3, 1, 1], corpo: [0.18, 0.2, 0.3] });
    corallo.push(kit.uvMetri(mergeGeometries(rami.map(g => {
      const n = g.index ? g.toNonIndexed() : g;
      for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'color'].includes(nome)) n.deleteAttribute(nome);
      return n;
    })), 1));
  }
  for (const g of corallo) kit.lotto(m.corallo, SETTORE).aggiungi(g);
  const rotore = new THREE.Group();
  const pale = [new THREE.SphereGeometry(0.16, 16, 10).scale(0.6, 1, 1)];
  for (let k = 0; k < 9; k++) pale.push(new THREE.BoxGeometry(0.03, 0.7, 0.16).translate(0, 0.42, 0).rotateY(0.5).rotateX((k / 9) * Math.PI * 2));
  rotore.add(new THREE.Mesh(uniscinative(pale), kit.mat.ottone));
  rotore.position.set(x + 0.62, y, z);
  kit.scena.add(rotore);
  const lampadaMat = new THREE.MeshStandardMaterial({ color: 0x201004, emissive: 0xff9a30, emissiveIntensity: 2 });
  const lampada = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), lampadaMat);
  lampada.position.set(x + 1.08, F + 1.55, z + 0.8);
  kit.scena.add(lampada);
  const quadrante = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), new THREE.MeshBasicMaterial({ color: 0xd8d0b0 }));
  quadrante.rotation.y = Math.PI / 2;
  quadrante.position.set(x + 1.085, F + 1.25, z + 0.8);
  kit.scena.add(quadrante);
  const lancetta = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.012).translate(0, 0.05, 0), new THREE.MeshBasicMaterial({ color: 0x401010 }));
  lancetta.rotation.y = Math.PI / 2;
  lancetta.position.set(x + 1.095, F + 1.25, z + 0.8);
  kit.scena.add(lancetta);
  const leva = new THREE.Group();
  leva.add(new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8).translate(0, 0.25, 0), kit.mat.acciaio));
  const pomo = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), kit.mat.luceRossa);
  pomo.position.y = 0.5;
  leva.add(pomo);
  leva.position.set(x + 1.1, F + 1.0, z + 0.9);
  kit.scena.add(leva);
  const colore = { valore: 0xff9a30 };
  kit.luce({ x: x + 1.4, y: F + 2.4, z, colore: 0xff9a30, intensita: 5, portata: 8, colorePer: () => colore.valore, forza: () => statoTurbina.luce });
  return { rotore, lampadaMat, lancetta, leva, colore, y };
}

const statoTurbina = { luce: 3 };

function costruisciCorridoio(kit, m, caso) {
  const { x0, x1, z, mezzo, nicchia, n0, n1, muro, colmo } = CORRIDOIO;
  const rampa = x => F * Math.min(1, Math.max(0, (27.6 - x) / 5.2));
  const pav = [];
  const xs = [x0, 22.4, 23, 24.2, 25.4, 26.6, 27.6, x1];
  for (let k = 0; k < xs.length - 1; k++) {
    const a = xs[k];
    const b = xs[k + 1];
    const largo = a >= n0 - 0.01 && b <= n1 + 0.01 ? nicchia : mezzo;
    const ya = rampa(a);
    const yb = rampa(b);
    const g = new THREE.BufferGeometry();
    const v = [a, ya, z - largo, b, yb, z - largo, b, yb, z + largo, a, ya, z - largo, b, yb, z + largo, a, ya, z + largo];
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
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
    pav.push(g);
  }
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(mergeGeometries(pav), 1));
  const luce = [];
  for (let x = 22.6; x < 27.8; x += 0.9) {
    const y = rampa(x) + 0.01;
    luce.push(new THREE.BoxGeometry(0.5, 0.012, 0.04).rotateZ(Math.atan2(-F, 5.2)).translate(x, y + 0.004, z));
  }
  kit.lotto(m.intarsio, SETTORE).aggiungi(unisciPiatte(luce));
  const pietra = [];
  const blocchi = (xa, xb, faccia, verso) => {
    let riga = 0;
    for (let y = F - 0.3; y < muro; y += 0.62, riga++) {
      const y1 = Math.min(muro, y + 0.6);
      let x = xa - (riga % 2 ? 0.6 : 0);
      while (x < xb) {
        const a = Math.max(xa, x);
        const b = Math.min(xb, x + 1.2);
        if (b - a > 0.05) {
          const sporge = caso() * 0.03;
          const za = faccia - verso * sporge;
          const zb = faccia + verso * 0.4;
          pietra.push(scatola(a + 0.01, y + 0.01, Math.min(za, zb), b - 0.01, y1 - 0.01, Math.max(za, zb)));
        }
        x += 1.2;
      }
    }
  };
  for (const s of [-1, 1]) {
    blocchi(x0, n0, z + s * mezzo, s);
    blocchi(n1, x1, z + s * mezzo, s);
    blocchi(n0, n1, z + s * nicchia, s);
    for (const xr of [n0, n1]) pietra.push(scatola(xr - 0.2, F - 0.3, Math.min(z + s * mezzo, z + s * nicchia), xr + 0.2, muro, Math.max(z + s * mezzo, z + s * nicchia)));
  }
  kit.lotto(kit.mat.pietra, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(pietra), 0.9));
  const marmo = [];
  const oro = [];
  const fregi = [];
  for (const s of [-1, 1]) {
    for (const xp of [21.9, 22.9, 26.9, 27.9]) {
      marmo.push(scatola(xp - 0.18, F - 0.3, z + s * (mezzo - 0.12) - 0.01, xp + 0.18, muro - 0.4, z + s * (mezzo + 0.05)));
      marmo.push(scatola(xp - 0.24, muro - 0.4, z + s * (mezzo - 0.16) - 0.01, xp + 0.24, muro - 0.25, z + s * (mezzo + 0.05)));
    }
    marmo.push(scatola(x0, muro, Math.min(z + s * 1.45, z + s * (nicchia + 0.2)), x1, muro + 0.25, Math.max(z + s * 1.45, z + s * (nicchia + 0.2))));
    oro.push(scatola(x0, muro - 0.03, z + s * 1.44 - 0.02, x1, muro + 0.02, z + s * 1.44 + 0.02));
    for (const [a, b, d] of [[x0, n0, mezzo], [n1, x1, mezzo], [n0, n1, nicchia]]) {
      const f = scalaUV(new THREE.PlaneGeometry(b - a, 0.4), (b - a) / 2.4, 1).rotateY(s > 0 ? Math.PI : 0).translate((a + b) / 2, muro - 0.75, z + s * (d - 0.012));
      fregi.push(f);
    }
  }
  const volta = [];
  const NZ = 16;
  const sezione = t => {
    const lz = (t - 0.5) * 2 * (nicchia + 0.2);
    const apertura = Math.abs(lz) / (nicchia + 0.2);
    return [z + lz, muro + 0.25 + (colmo - muro - 0.25) * Math.sqrt(Math.max(0, 1 - apertura ** 1.6))];
  };
  const posV = [];
  const indV = [];
  const NX = 10;
  for (let i = 0; i <= NX; i++) {
    const x = tra(x0, x1, i / NX);
    for (let j = 0; j <= NZ; j++) {
      const [zz, yy] = sezione(j / NZ);
      posV.push(x, yy, zz);
    }
  }
  for (let i = 0; i < NX; i++) for (let j = 0; j < NZ; j++) {
    const a = i * (NZ + 1) + j;
    const b = (i + 1) * (NZ + 1) + j;
    indV.push(a, a + 1, b + 1, a, b + 1, b);
  }
  const gv = new THREE.BufferGeometry();
  gv.setAttribute('position', new THREE.Float32BufferAttribute(posV, 3));
  gv.setIndex(indV);
  gv.computeVertexNormals();
  if (gv.attributes.normal.getY(Math.floor(NZ / 2)) > 0) gv.setIndex(indV.map((_, i) => indV[i - (i % 3) + [0, 2, 1][i % 3]]));
  gv.computeVertexNormals();
  volta.push(gv);
  const costoloni = [];
  for (let x = 22.2; x < x1; x += 1.4) {
    const punti = [];
    for (let j = 0; j <= 12; j++) {
      const [zz, yy] = sezione(j / 12);
      punti.push(new THREE.Vector3(x, yy - 0.06, zz));
    }
    costoloni.push(tubo(punti, 0.13, { segmenti: 24, radiali: 6 }));
  }
  kit.lotto(kit.mat.pietra, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(volta), 0.9));
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(costoloni), 0.9));
  const portale = [];
  for (const s of [-1, 1]) {
    portale.push(scatola(21.3, F, z + s * 1.6 - (s < 0 ? 1.0 : 0), 22.5, 3.8, z + s * 1.6 + (s > 0 ? 1.0 : 0)));
    oro.push(scatola(21.27, 3.0, z + s * 2.1 - 0.12, 21.31, 3.2, z + s * 2.1 + 0.12));
  }
  portale.push(scatola(21.2, 3.8, z - 2.75, 22.6, 4.2, z + 2.75));
  portale.push(arcoAcuto(new THREE.Vector3(21.9, 4.2, z + 2.1), new THREE.Vector3(21.9, 4.2, z - 2.1), { alzata: 2.4, spessore: 0.55, profondita: 1.25, conci: 13 }));
  const timpano = new THREE.Shape();
  const R = (4.2 * 4.2 / 4 + 2.4 * 2.4) / 4.2;
  for (let k = 0; k <= 24; k++) {
    const s = k / 24;
    const sx = s <= 0.5 ? s : 1 - s;
    const ap = Math.atan2(2.4, 2.1 - R);
    const ang = Math.PI + (ap - Math.PI) * (sx / 0.5);
    let px = R + Math.cos(ang) * R;
    if (s > 0.5) px = 4.2 - px;
    if (k === 0) timpano.moveTo(px - 2.1, Math.sin(ang) * R);
    else timpano.lineTo(px - 2.1, Math.sin(ang) * R);
  }
  timpano.lineTo(-2.1, 0);
  portale.push(new THREE.ShapeGeometry(timpano, 4).translate(0, 0, 0).rotateY(-Math.PI / 2).translate(21.5, 4.2, z));
  portale.push(new THREE.ShapeGeometry(timpano, 4).rotateY(Math.PI / 2).translate(22.3, 4.2, z));
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte([...marmo, ...portale]), 0.9), null, { ombra: true });
  const emblema = [new THREE.CylinderGeometry(0.06, 0.06, 1.5, 8).translate(0, 0.75, 0)];
  emblema.push(new THREE.TorusGeometry(0.36, 0.05, 6, 20, Math.PI).rotateZ(Math.PI).translate(0, 1.3, 0));
  for (const s of [-1, 0, 1]) emblema.push(new THREE.ConeGeometry(0.08, 0.3, 6).translate(s * 0.36, s === 0 ? 1.65 : 1.45, 0));
  for (const g of emblema) g.rotateY(-Math.PI / 2).translate(21.46, 4.25, z);
  oro.push(...emblema);
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
  kit.lotto(m.fregio, SETTORE).aggiungi(mergeGeometries(fregi));
  kit.luce({ x: 25.2, y: 3.3, z, colore: 0x5fd8ff, intensita: 6, portata: 9 });
  const portaleSud = [];
  for (const s of [-1, 1]) portaleSud.push(scatola(s * 1.6 - (s < 0 ? 1.0 : 0), -0.4, -26.7, s * 1.6 + (s > 0 ? 1.0 : 0), 3.55, -25.4));
  portaleSud.push(scatola(-2.75, 3.55, -26.8, 2.75, 3.95, -25.3));
  portaleSud.push(arcoAcuto(new THREE.Vector3(-2.1, 3.95, -26.05), new THREE.Vector3(2.1, 3.95, -26.05), { alzata: 2.4, spessore: 0.55, profondita: 1.3, conci: 13 }));
  portaleSud.push(new THREE.ShapeGeometry(timpano, 4).rotateY(Math.PI).translate(0, 3.95, -26.55));
  kit.lotto(kit.mat.marmo, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(portaleSud), 0.9), null, { ombra: true });
  const emblemaSud = [new THREE.CylinderGeometry(0.06, 0.06, 1.5, 8).translate(0, 0.75, 0), new THREE.TorusGeometry(0.36, 0.05, 6, 20, Math.PI).rotateZ(Math.PI).translate(0, 1.3, 0)];
  for (const s of [-1, 0, 1]) emblemaSud.push(new THREE.ConeGeometry(0.08, 0.3, 6).translate(s * 0.36, s === 0 ? 1.65 : 1.45, 0));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(emblemaSud.map(g => g.translate(0, 4.0, -26.6))), 1));
}

function costruisciAperture(kit, m) {
  const parti = [];
  for (const f of FINESTRE_ROCCIA) {
    const s = Math.sign(f.fuori.x);
    const x0 = f.centro.x + s * 0.25;
    const punti = [0, 1, 2, 3].map(k => new THREE.Vector3(x0 + s * k * 1.0, -0.8 + k * 0.25, f.centro.z));
    parti.push(tubo(punti, t => 2.05 + t * 0.3, { segmenti: 10, radiali: 20, tappi: false }));
  }
  const g = kit.deforma(unisci(parti), { ampiezza: 0.22, frequenza: 0.9, ottave: 3, seme: 21 });
  kit.lotto(m.rocciaDoppia, SETTORE).aggiungi(kit.uvMetri(g, 0.6));
  const stele = [];
  const oro = [];
  for (const s of STELE) {
    const lato = Math.sign(s.x);
    const xf = lato * 21.97;
    stele.push(scatola(Math.min(xf, xf + lato * 0.3), F, s.z - 1.25, Math.max(xf, xf + lato * 0.3), F + 3.3, s.z + 1.25));
    stele.push(scatola(Math.min(xf - lato * 0.08, xf + lato * 0.3), F + 3.3, s.z - 1.4, Math.max(xf - lato * 0.08, xf + lato * 0.3), F + 3.6, s.z + 1.4));
    oro.push(scatola(Math.min(xf - lato * 0.01, xf), F + 3.25, s.z - 1.2, Math.max(xf - lato * 0.01, xf), F + 3.29, s.z + 1.2));
  }
  kit.lotto(kit.mat.marmoScuro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(stele), 0.9));
  kit.lotto(kit.mat.oro, SETTORE).aggiungi(kit.uvMetri(unisciPiatte(oro), 1));
}

function costruisciCielo(kit) {
  const NR = 22;
  const NA = 96;
  const pos = [];
  const raggio = [];
  for (let j = 0; j <= NR; j++) {
    const r = j / NR;
    for (let i = 0; i < NA; i++) {
      const a = (i / NA) * Math.PI * 2;
      pos.push(Math.cos(a) * r * SCUDO.rx, SCUDO.y - SCUDO.abbassa * (1 - r * r), CZ + Math.sin(a) * r * SCUDO.rz);
      raggio.push(r);
    }
  }
  const indici = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NA; i++) {
    const i1 = (i + 1) % NA;
    indici.push(j * NA + i, (j + 1) * NA + i, (j + 1) * NA + i1, j * NA + i, (j + 1) * NA + i1, j * NA + i1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aRaggio', new THREE.Float32BufferAttribute(raggio, 1));
  g.setIndex(indici);
  g.computeVertexNormals();
  const uScudo = { uTempo: kit.uniformi.uTempo, uAllarme: { value: 0 }, uForza: { value: 1 }, uImpatto: { value: new THREE.Vector4(0, CZ, -100, 0) } };
  const scudo = new THREE.Mesh(g, new THREE.ShaderMaterial({
    uniforms: uScudo,
    vertexShader: `
      attribute float aRaggio;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vR;
      varying float vDist;
      void main() {
        vec4 mondo = modelMatrix * vec4(position, 1.0);
        vPos = mondo.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = cameraPosition - mondo.xyz;
        vR = aRaggio;
        vec4 mv = viewMatrix * mondo;
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uAllarme;
      uniform float uForza;
      uniform vec4 uImpatto;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      varying float vR;
      varying float vDist;
      ${RUMORE_GLSL}
      float esagono(vec2 p) { p = abs(p); return max(dot(p, vec2(0.5, 0.8660254)), p.x); }
      void main() {
        vec2 q = vPos.xz * 0.85 + rumoreAb(vec3(vPos.xz * 0.07, uTempo * 0.08)) * 0.5;
        vec2 r = vec2(1.0, 1.7320508);
        vec2 h = r * 0.5;
        vec2 a = mod(q, r) - h;
        vec2 b = mod(q - h, r) - h;
        vec2 g = dot(a, a) < dot(b, b) ? a : b;
        vec2 cella = q - g;
        float d = esagono(g);
        float bordo = smoothstep(0.41, 0.5, d);
        float caso = fract(sin(dot(cella, vec2(12.9898, 78.233))) * 43758.5453);
        float lampeggio = pow(0.5 + 0.5 * sin(uTempo * (0.5 + caso * 1.3) + caso * 30.0), 8.0);
        float dc = length(vPos.xz - vec2(0.0, ${CZ.toFixed(1)}));
        float onde = pow(0.5 + 0.5 * sin(dc * 1.3 - uTempo * 2.0 + rumoreAb(vec3(vPos.xz * 0.15, uTempo * 0.2)) * 3.0), 5.0);
        float eta = uTempo - uImpatto.z;
        float colpo = eta > 0.0 && eta < 3.0 ? exp(-pow(length(vPos.xz - uImpatto.xy) - eta * 6.0, 2.0) * 0.6) * (1.0 - eta / 3.0) : 0.0;
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 3.0);
        float tono = fract(fres * 0.8 + caso * 0.18 + uTempo * 0.035 + dc * 0.025);
        vec3 iride = 0.5 + 0.5 * cos(6.2831853 * (tono + vec3(0.0, 0.33, 0.67)));
        vec3 base = mix(vec3(0.12, 0.72, 1.0), iride, 0.45);
        base = mix(base, vec3(1.0, 0.12, 0.4), uAllarme * (0.55 + 0.45 * sin(uTempo * 6.0)));
        float contorno = smoothstep(0.84, 1.0, vR);
        float intensita = 0.008 + bordo * (0.07 + 0.35 * lampeggio) + onde * 0.03 + fres * 0.22 + contorno * 0.4 + lampeggio * (1.0 - bordo) * 0.02 + colpo * 0.9;
        float lontano = 1.0 - smoothstep(60.0, 95.0, vDist);
        gl_FragColor = vec4(base * intensita * uForza * lontano, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }));
  kit.scena.add(scudo);
  const oceano = new THREE.Mesh(new THREE.CircleGeometry(28, 64).rotateX(Math.PI / 2).translate(0, CIELO_Y, CZ), new THREE.ShaderMaterial({
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
        float r = length(vMondo.xz - vec2(0.0, ${CZ.toFixed(1)})) / 28.0;
        float bordo = 1.0 - smoothstep(0.35, 1.0, r);
        float c = causticaAbisso(vMondo.xz * 0.05 * 6.2831, uTempo * 0.3) * 0.7 + causticaAbisso(vMondo.xz * 0.11 + 2.0, uTempo * 0.22) * 0.3;
        vec3 col = (uCaustica * 0.7 + vec3(0.04, 0.1, 0.12)) * min(c, 1.0) * 0.18 * bordo + vec3(0.003, 0.02, 0.032) * bordo;
        gl_FragColor = vec4(col, 1.0);
        ${USCITA_GLSL}
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  kit.scena.add(oceano);
  const attraverso = (bersaglio, passa, r0, r1) => {
    const [bx, by, bz] = bersaglio;
    const [px, pz] = passa;
    const t = (CIELO_Y - SCUDO.y) / (SCUDO.y - by);
    return { da: [px + (px - bx) * t, CIELO_Y, pz + (pz - bz) * t], a: bersaglio, r0, r1 };
  };
  const fasci = creaFasci(kit, [
    attraverso([0.5, F, -46], [1.2, -44], 1.6, 2.7),
    attraverso([0, F + 2.2, -56.6], [0, -49.5], 1.3, 2.3),
    attraverso([-9.5, 7, -53.5], [-6.3, -48.6], 1.0, 1.9),
    attraverso([9.5, 7, -53.5], [6.3, -48.6], 1.0, 1.9),
    attraverso([-6, F, -35.5], [-3.5, -38.5], 0.9, 1.7),
    attraverso([7.5, F, -38.5], [5, -41], 0.8, 1.5),
    attraverso([0, F + 1, -42], [0, -43], 0.6, 1.1),
  ], { settore: SETTORE, forza: 0.17 });
  kit.luce({ x: 0, y: 15.5, z: -45, colore: 0xa8ecff, intensita: 26, portata: 30, ombra: true, mira: { x: 0, y: F, z: -46 } });
  return { uScudo, fasci };
}

function costruisciParticelle(kit, caso) {
  const d = kit.qualita?.densita ?? 1;
  const voci = [];
  const quante = n => Math.max(1, Math.round(n * d));
  for (const b of BRACIERI) {
    for (let k = 0; k < quante(18); k++) voci.push({ x: b.x + (caso() - 0.5) * 0.5, y: F + 1.3, z: b.z + (caso() - 0.5) * 0.5, tipo: 0, alto: 2.2 + caso() * 1.5, vita: 1.6 + caso() * 1.4, seme: caso() });
  }
  TANE.forEach((t, i) => {
    for (let k = 0; k < quante(16); k++) {
      const a = caso() * Math.PI * 2;
      const r = Math.sqrt(caso()) * 1.2;
      voci.push({ x: t.x + Math.cos(a) * r, y: F - 0.1, z: t.z + Math.sin(a) * r, tipo: 1, alto: 0.6 + caso() * 1.6, vita: 1.2 + caso() * 1.6, seme: caso(), gruppo: 1 + i });
    }
  });
  for (let k = 0; k < quante(140); k++) voci.push({ x: tra(-9, 9, caso()), y: tra(F + 0.5, 14, caso()), z: tra(-56, -32, caso()), tipo: 2, alto: 0.4 + caso() * 0.8, vita: 10, seme: caso() });
  for (let k = 0; k < quante(160); k++) voci.push({ x: tra(-11, 11, caso()), y: tra(24, 34, caso()), z: tra(-52, -34, caso()), tipo: 3, alto: 8 + caso() * 4, vita: 14 + caso() * 10, seme: caso() });
  for (let k = 0; k < quante(48); k++) voci.push({ x: POTENZIATORE.x, y: F + 1.1, z: POTENZIATORE.z - 0.35, tipo: 4, alto: 3.4, vita: 1.4 + caso() * 0.8, seme: caso(), gruppo: 3 });
  return creaParticelle(kit, voci);
}

function costruisciTane(kit) {
  const { materiale, uniformi } = materialeAcqua(kit, { chiave: 'taneSantuario', colore: 0x021218, opacita: 0.92, forzaLuce: 0.12, onde: 0.5, vortici: true, centro: [0, 0, -100], raggioLuce: 1 });
  const dischi = TANE.map(t => new THREE.CircleGeometry(1.42, 40).rotateX(-Math.PI / 2).translate(t.x, F - 0.13, t.z));
  const mesh = new THREE.Mesh(mergeGeometries(dischi), materiale);
  kit.scena.add(mesh);
  const fondo = new THREE.Mesh(mergeGeometries(TANE.map(t => new THREE.CircleGeometry(1.15, 24).rotateX(-Math.PI / 2).translate(t.x, F - 1.25, t.z))), new THREE.MeshBasicMaterial({ color: 0x00080c }));
  kit.scena.add(fondo);
  TANE.forEach((t, i) => uniformi.uVortici.value[i].set(t.x, t.z, 1.35, 0.15));
  return uniformi;
}

export function creaSantuario(kit) {
  const caso = generatore(7151);
  const m = materiali(kit);
  const { soffitto } = costruisciGrotta(kit, m);
  stalattiti(kit, m, caso, soffitto);
  cristalli(kit, m, caso, soffitto);
  costruisciPavimento(kit, m, caso);
  costruisciIntarsi(kit, m);
  costruisciColonne(kit, m, caso);
  costruisciArchi(kit, m, caso, soffitto);
  costruisciStatue(kit, m);
  const fiamme = costruisciBracieri(kit, m);
  const conchiglia = costruisciConchiglia(kit, m);
  const vetrina = creaVetrina(kit, conchiglia.vetrina, 1.35);
  const altare = costruisciAltare(kit, m);
  const turbina = costruisciTurbina(kit, m, caso);
  costruisciCorridoio(kit, m, caso);
  costruisciAperture(kit, m);
  const cielo = costruisciCielo(kit);
  const particelle = costruisciParticelle(kit, caso);
  const tane = costruisciTane(kit);
  const archi = creaArchi(kit, 160);
  for (const s of STATUE) kit.luce({ x: s.x + Math.sin(s.verso) * 3, y: F + 1.2, z: s.z + Math.cos(s.verso) * 3, colore: 0x3fd8ff, intensita: 11, portata: 13 });

  const stato = { allarme: 0, corrente: 0, lavora: 0, pronta: 0, nucleo: 0, tridente: 0, turbina: 0, tane: [0.15, 0.15], tempo: 0, lampo: 0 };
  const sopra = new THREE.Vector3();
  const punta = new THREE.Vector3();
  const bersaglio = new THREE.Vector3();
  const VIOLA = new THREE.Color(0xb050ff);
  const AZZURRO = new THREE.Color(0x30d8ff);
  const BIANCO = new THREE.Color(0xffffff);

  kit.suEvento(e => {
    if (e.k === 'nucleoIncastonato') {
      stato.lampo = 1;
      kit.effetti?.esplosione(new THREE.Vector3(ALTARE.x, F + 1.3, ALTARE.z), 'energia', CIANO);
    } else if (e.k === 'turbina' && e.indice === 2 && e.accesa) {
      kit.effetti?.esplosione(new THREE.Vector3(TURBINA.x + 0.9, turbina.y, TURBINA.z), 'energia', 0x9cf0ff);
    } else if (e.k === 'protocolloAbisso') {
      cielo.uScudo.uImpatto.value.set(0, CZ, stato.tempo, 1);
    }
  });

  kit.ogniFotogramma((vista, dt, tempo) => {
    stato.tempo = tempo;
    const ab = vista.abisso;
    const k = Math.min(1, dt * 2.5);
    const protocollo = ab?.protocollo && !ab?.completata ? 1 : 0;
    stato.allarme += (protocollo - stato.allarme) * Math.min(1, dt);
    stato.corrente += ((vista.corrente ? 1 : 0) - stato.corrente) * k;
    const pot = vista.potenziatore ?? { stato: 'libero', arma: null };
    stato.lavora += ((pot.stato === 'lavora' ? 1 : 0) - stato.lavora) * k;
    stato.pronta += ((pot.stato === 'pronta' ? 1 : 0) - stato.pronta) * k;
    stato.nucleo += ((ab?.nucleo === 3 ? 1 : 0) - stato.nucleo) * k;
    stato.tridente += ((ab?.tridenti ? 1 : 0) - stato.tridente) * Math.min(1, dt);
    stato.lampo = Math.max(0, stato.lampo - dt * 0.8);

    cielo.uScudo.uAllarme.value = stato.allarme;
    cielo.uScudo.uForza.value = 0.85 + 0.15 * Math.sin(tempo * 0.7) + stato.lavora * 0.2;
    cielo.fasci.colore.value.copy(BIANCO).lerp(kit.uniformi.uCaustica.value, 0.55);
    m.vene.value = 1.3 + stato.corrente * 0.9 + stato.allarme * 0.6;
    m.coloreVene.value.copy(AZZURRO).lerp(VIOLA, stato.allarme);
    m.intarsi.value = 0.35 + stato.corrente * 0.65 + stato.lavora * 0.5;
    m.bagliore.value = 0.75 + stato.corrente * 0.35;

    m.bordo.emissiveIntensity = 0.2 + stato.corrente * (0.8 + 0.3 * Math.sin(tempo * 1.4)) + stato.lavora * (1.2 + Math.sin(tempo * 17) * 0.35) + stato.pronta * 0.8;
    statoConchiglia.luce = 2 + stato.corrente * 4 + stato.lavora * (7 + Math.sin(tempo * 21) * 2) + stato.pronta * 4;
    conchiglia.vortice.visible = stato.lavora > 0.02;
    conchiglia.vortice.material.uniforms.uForza.value = stato.lavora * 1.5;
    conchiglia.vortice.rotation.y = tempo * 2.2;
    particelle.gruppi.value[3] = stato.lavora;
    const arma = pot.stato === 'pronta' ? pot.arma : null;
    const modello = vetrina(arma);
    if (modello) {
      modello.position.set(0, Math.sin(tempo * 2) * 0.06, 0);
      modello.rotation.y = tempo * 1.4;
    }

    altare.nucleo.visible = stato.nucleo > 0.02;
    altare.nucleo.scale.setScalar(0.4 + stato.nucleo * 0.6);
    altare.nucleo.rotation.y = tempo * 0.9;
    altare.anelli[0].rotation.z = tempo * 1.7;
    altare.anelli[1].rotation.x = tempo * 1.3;
    altare.nucleoMat.emissiveIntensity = 2.6 + Math.sin(tempo * 3) * 0.6 + stato.lampo * 6;
    m.cristalliAltare.emissiveIntensity = 0.25 + stato.nucleo * 2.2 + stato.lampo * 4;
    statoAltare.luce = 0.8 + stato.nucleo * 7 + stato.tridente * 5 + stato.lampo * 20;
    altare.tridente.visible = stato.tridente > 0.02;
    altare.tridente.position.y = F + 2.9 + Math.sin(tempo * 1.3) * 0.12 - (1 - stato.tridente) * 0.8;
    altare.perno.rotation.y = tempo * 0.45;
    altare.tridente.scale.setScalar(Math.max(0.01, stato.tridente));

    const t = ab?.turbine?.[2] ?? 0;
    stato.turbina += (t - stato.turbina) * k;
    turbina.rotore.rotation.x += dt * (t >= 1 ? 15 : t * 9);
    const accesa = t >= 1;
    const avvio = t > 0 && t < 1;
    const lampeggio = accesa ? 1 : (Math.sin(tempo * (avvio ? 14 : 3)) > 0 ? 1 : 0.15);
    turbina.lampadaMat.emissive.setHex(accesa ? 0x40ff8a : avvio ? 0xffb030 : 0xff3a1a);
    turbina.lampadaMat.emissiveIntensity = 2.5 * lampeggio;
    turbina.colore.valore = accesa ? 0x40ff8a : 0xff9a30;
    statoTurbina.luce = accesa ? 5 : 2 + lampeggio * 2;
    turbina.lancetta.rotation.x = -2.2 + stato.turbina * 3.6 + Math.sin(tempo * 13) * 0.04 * stato.turbina;
    turbina.leva.rotation.z = t > 0 ? 0.9 : -0.6;

    TANE.forEach((c, i) => {
      const emerge = vista.zombie?.some(z => z.stato === 'emerge' && Math.hypot(z.x - c.x, z.z - c.z) < 2.4) ? 1 : 0;
      stato.tane[i] += ((emerge ? 1 : 0.12) - stato.tane[i]) * Math.min(1, dt * 1.8);
      tane.uVortici.value[i].w = stato.tane[i];
      particelle.gruppi.value[1 + i] = 0.25 + stato.tane[i] * 1.6;
    });

    archi.inizia(kit.camera?.position ?? sopra.set(0, 0, 0));
    if (stato.tridente > 0.5) {
      for (let q = 0; q < 3; q++) {
        punta.set(ALTARE.x + (Math.random() - 0.5) * 0.6, altare.tridente.position.y + 0.4 + Math.random() * 1.6, ALTARE.z + (Math.random() - 0.5) * 0.6);
        bersaglio.set(ALTARE.x + (Math.random() < 0.5 ? -1.1 : 1.1), F + 1.3, ALTARE.z + (Math.random() < 0.5 ? -0.6 : 0.6));
        archi.fulmine(punta, bersaglio, { colore: 0x5fd8ff, largo: 0.018, pezzi: 10, scarto: 0.2, forza: 0.75 });
      }
    }
    if (avvio && Math.random() < 0.5) {
      punta.set(TURBINA.x + 0.72, turbina.y + (Math.random() - 0.5) * 1.6, TURBINA.z + (Math.random() - 0.5) * 1.6);
      bersaglio.set(TURBINA.x - 0.88, turbina.y + (Math.random() - 0.5) * 1.6, TURBINA.z + (Math.random() - 0.5) * 1.6);
      archi.fulmine(punta, bersaglio, { colore: 0x9cf0ff, largo: 0.025, pezzi: 7, scarto: 0.2 });
    }
    archi.chiudi();
    fiamme.forza.value = 1 + stato.allarme * 0.25 * Math.sin(tempo * 9);
  });
}
