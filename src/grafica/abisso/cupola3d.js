import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { conCaustiche } from './kit.js';
import { ALPHA, BOCCAPORTI_ALPHA, LARGO_BOCCAPORTO, VALVOLE, NODI, PARTI_SCUDO, ACQUISTI, DELTA, quota } from '../../mappe/abisso.js';

export const SU = Object.freeze(new THREE.Vector3(0, 1, 0));
const R = ALPHA.raggio;
const R_DENTRO = R - 0.25;
const R_FUORI = R + 0.25;
const ALTO_PARETE = 2.5;
const ALTO_CUPOLA = ALPHA.altezza - ALTO_PARETE;
const R_CORONA = 2.2;
const T_CORONA = Math.acos(R_CORONA / R);
const COSTOLONI = 16;
const P = (Math.PI * 2) / COSTOLONI;
const GIRO = 128;
const ALTO_BOCCAPORTO = 2.4;
const ALTO_PORTALE = 3.4;
const CIMA_PORTALE = 3.75;
const MEZZO_PORTALE = 1.6;
const PORTALI = Object.freeze([0, -Math.PI / 2]);
const Y_OBLO = 1.55;
const R_OBLO = 0.3;
const LATO_OBLO = 0.42;
const SCOSTA_OBLO = 1.9;
const FONDO_TECNICO = -0.9;
const R_PEDANA = 2.1;
const R_CORSIA = 11.4;
const Y_TUBI = Object.freeze([2.98, 3.26]);
const Y_ANELLI = Object.freeze([7.0, 9.4]);
const Y_ARCHI = 6.75;
const LAMPADE = Object.freeze([1, 4, 6, -7, -5, -3]);
const LAMPADE_OMBRA = Object.freeze([-7, -3]);
const AMBRA = 0xffb060;
const ALLARME = 0xff2a1a;
const VERDE = 0x3dff7a;
const CIANO = 0x5fe8ff;
const MAGENTA = 0xff2fb0;
const VERDE_NODO = 0x6dff8a;
const TUNNEL = Object.freeze({ x0: 13.3, x1: 23.85, y: 1, r: 2.2, anelli: [15.4, 16.9, 18.4, 19.9, 21.4, 22.9], collari: [13.65, 23.45], porta: [13.95, 14.85], lampade: [16.9, 21.4] });
const GALLERIA = Object.freeze({ z0: -12.9, zEsterno: -13.2, zStrappo: -21.6, z1: -26.3, porta: [-15.0, -14.2], telai: [-13.75, -15.75, -17.1, -18.6, -20.1, -21.3], lampade: [-16.85, -19.85], oblo: [-16.35, -19.35] });
const PROFILO_GALLERIA = Object.freeze([[-1.45, -0.6], [-1.45, 2.6], [-0.95, 3.4], [0.95, 3.4], [1.45, 2.6], [1.45, -0.6]]);
const PROFILO_ESTERNO = Object.freeze([[-1.85, -0.8], [-1.85, 2.75], [-1.15, 3.8], [1.15, 3.8], [1.85, 2.75], [1.85, -0.8]]);
const LAMPO_INDIZIO = 0.8;
const PAUSA_INDIZIO = 1.5;
const AGO_MINIMO = -2.15;
const INSEGNE = Object.freeze(['TUNNEL DI CRISTALLO  -  SETTORE BETA', 'GALLERIA DEL CONSORZIO  -  SETTORE GAMMA', 'ABYSSUS-9  -  CUPOLA ALPHA  -  CONSORZIO TALASSA 1953', 'SPECIMEN N.7  -  MELANOCETUS ABYSSI']);
const PEZZI_MURO = Object.freeze(ACQUISTI.filter(a => a.zona === 'cupola' && ['arma', 'bevanda', 'valvola'].includes(a.tipo)).map(a => ({
  a: Math.atan2(a.posizione.z - ALPHA.z, a.posizione.x - ALPHA.x), mezzo: a.tipo === 'arma' ? 0.75 : a.tipo === 'bevanda' ? 0.55 : 0.45,
})));

export const v3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const radiale = a => v3(Math.cos(a), 0, Math.sin(a));
const tangenteGiro = a => v3(-Math.sin(a), 0, Math.cos(a));
const vicino = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const sulCerchio = (a, r, y) => v3(Math.cos(a) * r, y, Math.sin(a) * r);
const angoloCostolone = k => (k + 0.5) * P;
export const rettangolo = (u0, u1, v0, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
const profilo = t => ({ r: R * Math.cos(t), y: ALTO_PARETE + ALTO_CUPOLA * Math.sin(t) });
const tDaY = y => Math.asin(THREE.MathUtils.clamp((y - ALTO_PARETE) / ALTO_CUPOLA, 0, 1));

function normaleProfilo(t) {
  const nr = Math.cos(t) / R;
  const ny = Math.sin(t) / ALTO_CUPOLA;
  const l = Math.hypot(nr, ny);
  return { r: nr / l, y: ny / l };
}

const normaleGuscio = (t, a) => {
  const n = normaleProfilo(t);
  return v3(Math.cos(a) * n.r, n.y, Math.sin(a) * n.r);
};

const sulGuscio = (t, a, scosta = 0) => {
  const p = profilo(t);
  const n = normaleProfilo(t);
  const r = p.r + n.r * scosta;
  return v3(Math.cos(a) * r, p.y + n.y * scosta, Math.sin(a) * r);
};

const tangenteMeridiano = (t, a) => v3(-R * Math.sin(t) * Math.cos(a), ALTO_CUPOLA * Math.cos(t), -R * Math.sin(t) * Math.sin(a)).normalize();

export function casuale(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function matrice(x, y, z, ry = 0, rx = 0, rz = 0, scala = 1) {
  const s = typeof scala === 'number' ? v3(scala, scala, scala) : scala;
  return new THREE.Matrix4().compose(v3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), s);
}

export function orienta(posizione, asse, scala = 1, da = SU) {
  const q = new THREE.Quaternion().setFromUnitVectors(da, asse.clone().normalize());
  const s = typeof scala === 'number' ? v3(scala, scala, scala) : scala;
  return new THREE.Matrix4().compose(posizione, q, s);
}

export function base(x, y, z, posizione) {
  return new THREE.Matrix4().makeBasis(x, y, z).setPosition(posizione);
}

export function geometria(posizioni, normali = null, uv = null, colori = null) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(posizioni, 3));
  if (uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  if (colori) g.setAttribute('color', new THREE.Float32BufferAttribute(colori, 3));
  if (normali) g.setAttribute('normal', new THREE.Float32BufferAttribute(normali, 3));
  else g.computeVertexNormals();
  return g;
}

export function rovescia(originale) {
  const g = originale.index ? originale.toNonIndexed() : originale.clone();
  for (const nome of Object.keys(g.attributes)) {
    const { itemSize: k, array: arr, count } = g.attributes[nome];
    for (let i = 0; i < count; i += 3) for (let j = 0; j < k; j++) {
      const t = arr[(i + 1) * k + j];
      arr[(i + 1) * k + j] = arr[(i + 2) * k + j];
      arr[(i + 2) * k + j] = t;
    }
  }
  const n = g.attributes.normal;
  if (n) for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  return g;
}

export function fuso(g) {
  g.deleteAttribute('uv');
  g.deleteAttribute('normal');
  return mergeVertices(g);
}

export function telaio(p, tangente, u) {
  const t = tangente.clone().normalize();
  const uu = u.clone().addScaledVector(t, -u.dot(t)).normalize();
  return { p: p.clone(), u: uu, v: t.clone().cross(uu) };
}

export function spazza(sezione, telai, { tappi = true } = {}) {
  const pos = [];
  const punto = (f, [a, b]) => f.p.clone().addScaledVector(f.u, a).addScaledVector(f.v, b);
  const spingi = (...ps) => { for (const p of ps) pos.push(p.x, p.y, p.z); };
  for (let i = 0; i < telai.length - 1; i++) {
    for (let j = 0; j < sezione.length; j++) {
      const k = (j + 1) % sezione.length;
      const a = punto(telai[i], sezione[j]);
      const b = punto(telai[i], sezione[k]);
      const c = punto(telai[i + 1], sezione[k]);
      const d = punto(telai[i + 1], sezione[j]);
      spingi(a, b, c, a, c, d);
    }
  }
  if (tappi) {
    const primo = sezione.map(s => punto(telai[0], s));
    const ultimo = sezione.map(s => punto(telai[telai.length - 1], s));
    for (let j = 1; j < sezione.length - 1; j++) {
      spingi(primo[0], primo[j + 1], primo[j]);
      spingi(ultimo[0], ultimo[j], ultimo[j + 1]);
    }
  }
  return geometria(pos);
}

export function pareteConBuchi({ punto, normale, s0, s1, y0, y1, buchi = [], passo = 0.5 }) {
  const tagli = new Set([s0, s1]);
  const n = Math.max(1, Math.ceil((s1 - s0) / passo));
  for (let i = 1; i < n; i++) tagli.add(s0 + ((s1 - s0) * i) / n);
  for (const b of buchi) for (const s of [b.s0, b.s1]) if (s > s0 && s < s1) tagli.add(s);
  const ss = [...tagli].sort((a, b) => a - b);
  const pos = [];
  const nor = [];
  const uv = [];
  const vertice = (s, y) => {
    const p = punto(s, y);
    const q = normale(s, y);
    pos.push(p.x, p.y, p.z);
    nor.push(q.x, q.y, q.z);
    uv.push(s, y);
  };
  for (let i = 0; i < ss.length - 1; i++) {
    const a = ss[i];
    const b = ss[i + 1];
    if (b - a < 1e-5) continue;
    const m = (a + b) / 2;
    let pieni = [[y0, y1]];
    for (const h of buchi) {
      if (m <= h.s0 || m >= h.s1) continue;
      pieni = pieni.flatMap(([p, q]) => [[p, Math.min(q, h.y0)], [Math.max(p, h.y1), q]]).filter(([p, q]) => q - p > 1e-5);
    }
    for (const [ya, yb] of pieni) {
      const pa = punto(a, ya);
      const giusto = punto(b, ya).sub(pa).cross(punto(a, yb).sub(pa)).dot(normale(m, (ya + yb) / 2)) >= 0;
      const ordine = giusto ? [[a, ya], [b, ya], [b, yb], [a, ya], [b, yb], [a, yb]] : [[a, ya], [b, yb], [b, ya], [a, ya], [a, yb], [b, yb]];
      for (const [s, y] of ordine) vertice(s, y);
    }
  }
  return geometria(pos, nor, uv);
}

export function superficie(punto, normale, u0, u1, v0, v1, nu, nv, { scalaUv = [1, 1], salta = null } = {}) {
  const pos = [];
  const nor = [];
  const uv = [];
  for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
    const a = u0 + ((u1 - u0) * i) / nu;
    const b = u0 + ((u1 - u0) * (i + 1)) / nu;
    const c = v0 + ((v1 - v0) * j) / nv;
    const d = v0 + ((v1 - v0) * (j + 1)) / nv;
    if (salta?.((a + b) / 2, (c + d) / 2, j)) continue;
    const angoli = [[a, c], [b, c], [b, d], [a, d]];
    const p = angoli.map(([u, v]) => punto(u, v));
    const lato = p[1].clone().sub(p[0]).lengthSq() > 1e-10 ? p[1].clone().sub(p[0]) : p[2].clone().sub(p[3]);
    const giusto = lato.cross(p[3].clone().sub(p[0])).dot(normale((a + b) / 2, (c + d) / 2)) >= 0;
    for (const k of giusto ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2]) {
      const [u, v] = angoli[k];
      const n = normale(u, v);
      pos.push(p[k].x, p[k].y, p[k].z);
      nor.push(n.x, n.y, n.z);
      uv.push(u * scalaUv[0], v * scalaUv[1]);
    }
  }
  return geometria(pos, nor, uv);
}

export function griglia(punto, u0, u1, v0, v1, nu, nv, verso) {
  const pos = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
    const p = punto(u0 + ((u1 - u0) * i) / nu, v0 + ((v1 - v0) * j) / nv);
    pos.push(p.x, p.y, p.z);
  }
  const indici = [];
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i;
    indici.push(a, a + 1, a + nu + 2, a, a + nu + 2, a + nu + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const im = Math.floor(nu / 2);
  const jm = Math.floor(nv / 2);
  const a = punto(u0 + ((u1 - u0) * im) / nu, v0 + ((v1 - v0) * jm) / nv);
  const b = punto(u0 + ((u1 - u0) * (im + 1)) / nu, v0 + ((v1 - v0) * jm) / nv);
  const d = punto(u0 + ((u1 - u0) * (im + 1)) / nu, v0 + ((v1 - v0) * (jm + 1)) / nv);
  const dritto = b.clone().sub(a).cross(d.clone().sub(a)).dot(verso(u0 + ((u1 - u0) * (im + 0.5)) / nu, v0 + ((v1 - v0) * (jm + 0.5)) / nv)) >= 0;
  if (!dritto) for (let i = 0; i < indici.length; i += 3) [indici[i + 1], indici[i + 2]] = [indici[i + 2], indici[i + 1]];
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

export function quad(a, b, c, d, verso = null) {
  const n = b.clone().sub(a).cross(d.clone().sub(a));
  const [p0, p1, p2, p3] = !verso || n.dot(verso) >= 0 ? [a, b, c, d] : [a, d, c, b];
  const lu = p1.distanceTo(p0);
  const lv = p3.distanceTo(p0);
  const pos = [p0, p1, p2, p0, p2, p3].flatMap(p => [p.x, p.y, p.z]);
  return geometria(pos, null, [0, 0, lu, 0, lu, lv, 0, 0, lu, lv, 0, lv]);
}

export function rivetti(lista, raggio = 0.022, alto = 0.016) {
  const lati = 6;
  const pos = new Float32Array(lista.length * lati * 9);
  const nor = new Float32Array(lista.length * lati * 9);
  const e1 = v3();
  const e2 = v3();
  const cima = v3();
  const a = v3();
  const b = v3();
  const na = v3();
  const nb = v3();
  let o = 0;
  const scrivi = (p, n) => {
    pos[o] = p.x; pos[o + 1] = p.y; pos[o + 2] = p.z;
    nor[o] = n.x; nor[o + 1] = n.y; nor[o + 2] = n.z;
    o += 3;
  };
  for (const { p, n } of lista) {
    e1.set(Math.abs(n.y) < 0.9 ? 0 : 1, Math.abs(n.y) < 0.9 ? 1 : 0, 0).cross(n).normalize();
    e2.copy(n).cross(e1);
    cima.copy(p).addScaledVector(n, alto);
    for (let i = 0; i < lati; i++) {
      const t0 = (i / lati) * Math.PI * 2;
      const t1 = ((i + 1) / lati) * Math.PI * 2;
      a.copy(p).addScaledVector(e1, Math.cos(t0) * raggio).addScaledVector(e2, Math.sin(t0) * raggio);
      b.copy(p).addScaledVector(e1, Math.cos(t1) * raggio).addScaledVector(e2, Math.sin(t1) * raggio);
      na.copy(e1).multiplyScalar(Math.cos(t0)).addScaledVector(e2, Math.sin(t0)).add(n).normalize();
      nb.copy(e1).multiplyScalar(Math.cos(t1)).addScaledVector(e2, Math.sin(t1)).add(n).normalize();
      scrivi(a, na);
      scrivi(b, nb);
      scrivi(cima, n);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  return g;
}

export function percorso(punti, smusso = 0.25) {
  const curva = new THREE.CurvePath();
  let prima = punti[0].clone();
  for (let i = 1; i < punti.length - 1; i++) {
    const p = punti[i];
    const da = punti[i - 1].clone().sub(p);
    const a = punti[i + 1].clone().sub(p);
    const d = Math.min(smusso, da.length() / 2, a.length() / 2);
    const p0 = p.clone().addScaledVector(da.normalize(), d);
    const p1 = p.clone().addScaledVector(a.normalize(), d);
    if (p0.distanceTo(prima) > 1e-4) curva.add(new THREE.LineCurve3(prima, p0));
    curva.add(new THREE.QuadraticBezierCurve3(p0, p.clone(), p1));
    prima = p1;
  }
  curva.add(new THREE.LineCurve3(prima, punti[punti.length - 1].clone()));
  return curva;
}

export function tubo(punti, raggio, { smusso = 0.25, radiali = 8, perMetro = 3 } = {}) {
  const curva = punti instanceof THREE.Curve ? punti : percorso(punti, smusso);
  const lungo = curva.getLength();
  const g = new THREE.TubeGeometry(curva, Math.max(2, Math.ceil(lungo * perMetro)), raggio, radiali, false);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * lungo, uv.getY(i) * raggio * Math.PI * 2);
  return g;
}

export function affusolato(curva, r0, r1, segmenti = 12, radiali = 6) {
  const { normals, binormals } = curva.computeFrenetFrames(segmenti, false);
  const pos = [];
  const onde = [];
  const lungo = curva.getLength();
  for (let i = 0; i <= segmenti; i++) {
    const f = i / segmenti;
    const c = curva.getPointAt(f);
    const r = r0 + (r1 - r0) * Math.pow(f, 0.8);
    for (let j = 0; j <= radiali; j++) {
      const a = (j / radiali) * Math.PI * 2;
      const p = c.clone().addScaledVector(normals[i], Math.cos(a) * r).addScaledVector(binormals[i], Math.sin(a) * r);
      pos.push(p.x, p.y, p.z);
      onde.push(f * lungo);
    }
  }
  const indici = [];
  for (let i = 0; i < segmenti; i++) for (let j = 0; j < radiali; j++) {
    const a = i * (radiali + 1) + j;
    const b = a + radiali + 1;
    indici.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aOnda', new THREE.Float32BufferAttribute(onde, 1));
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

export function cono(apice, direzione, lungo, raggio, colore, { lati = 16, anelli = 4, inizio = 0.05 } = {}) {
  const d = direzione.clone().normalize();
  const e1 = (Math.abs(d.y) < 0.95 ? v3(0, 1, 0) : v3(1, 0, 0)).cross(d).normalize();
  const e2 = d.clone().cross(e1);
  const c = new THREE.Color(colore);
  const pos = [];
  const nor = [];
  const uv = [];
  const col = [];
  const vertice = (f, a) => {
    const r = inizio + (raggio - inizio) * f;
    const rad = e1.clone().multiplyScalar(Math.cos(a)).addScaledVector(e2, Math.sin(a));
    const p = apice.clone().addScaledVector(d, lungo * f).addScaledVector(rad, r);
    const n = rad.clone().multiplyScalar(lungo).addScaledVector(d, -(raggio - inizio)).normalize();
    pos.push(p.x, p.y, p.z);
    nor.push(n.x, n.y, n.z);
    uv.push(f, a / (Math.PI * 2));
    col.push(c.r, c.g, c.b);
  };
  for (let i = 0; i < anelli; i++) for (let j = 0; j < lati; j++) {
    const f0 = i / anelli;
    const f1 = (i + 1) / anelli;
    const a0 = (j / lati) * Math.PI * 2;
    const a1 = ((j + 1) / lati) * Math.PI * 2;
    vertice(f0, a0); vertice(f1, a0); vertice(f1, a1);
    vertice(f0, a0); vertice(f1, a1); vertice(f0, a1);
  }
  return geometria(pos, nor, uv, col);
}

export function materialeConi(uTempo, forza = 1) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTempo, uAllarme: { value: 0 }, uForza: { value: forza }, uRosso: { value: new THREE.Color(ALLARME) } }]),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: true,
    vertexShader: `
      varying vec3 vColore;
      varying float vLungo;
      varying vec3 vN;
      varying vec3 vVista;
      varying vec3 vMondo;
      varying float vProf;
      void main() {
        vColore = color;
        vLungo = uv.x;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vMondo = w.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vVista = cameraPosition - w.xyz;
        vec4 mv = viewMatrix * w;
        vProf = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float uAllarme;
      uniform float uForza;
      uniform vec3 uRosso;
      uniform float fogNear;
      uniform float fogFar;
      varying vec3 vColore;
      varying float vLungo;
      varying vec3 vN;
      varying vec3 vVista;
      varying vec3 vMondo;
      varying float vProf;
      void main() {
        float bordo = pow(abs(dot(normalize(vN), normalize(vVista))), 1.4);
        float lungo = pow(max(0.0, 1.0 - vLungo), 1.7) * smoothstep(0.0, 0.1, vLungo);
        float polvere = 0.78 + 0.22 * sin(vMondo.y * 2.1 + uTempo * 0.55 + vMondo.x * 1.3) * sin(vMondo.z * 1.7 - uTempo * 0.4);
        float nebbia = 1.0 - smoothstep(fogNear, fogFar * 1.15, vProf);
        vec3 c = mix(vColore, uRosso * dot(vColore, vec3(0.45)), uAllarme);
        gl_FragColor = vec4(c * bordo * lungo * polvere * uForza * nebbia, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

function tela(largo, alto, pittore) {
  const c = document.createElement('canvas');
  c.width = largo;
  c.height = alto;
  pittore(c.getContext('2d'), largo, alto);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function macchie(g, l, a, seme, quante, colore) {
  const caso = casuale(seme);
  for (let i = 0; i < quante; i++) {
    g.fillStyle = `rgba(${colore},${caso() * 0.16})`;
    g.beginPath();
    g.arc(caso() * l, caso() * a, 2 + caso() * 16, 0, Math.PI * 2);
    g.fill();
  }
}

function texturaQuadrante() {
  return tela(256, 256, (g, l) => {
    const m = l / 2;
    const fondo = g.createRadialGradient(m, m, 8, m, m, m);
    fondo.addColorStop(0, '#f6efd9');
    fondo.addColorStop(0.8, '#e0d3b0');
    fondo.addColorStop(1, '#6e5634');
    g.fillStyle = fondo;
    g.fillRect(0, 0, l, l);
    g.lineCap = 'round';
    g.lineWidth = 12;
    g.strokeStyle = '#b5281e';
    g.beginPath();
    g.arc(m, m, 92, -Math.PI / 2 + 1.2, -Math.PI / 2 + 2.2);
    g.stroke();
    g.strokeStyle = '#2f8a3c';
    g.beginPath();
    g.arc(m, m, 92, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5);
    g.stroke();
    g.strokeStyle = '#1c140c';
    for (let i = 0; i <= 40; i++) {
      const a = -2.25 + (4.5 * i) / 40;
      const lungo = i % 5 === 0 ? 22 : 11;
      g.lineWidth = i % 5 === 0 ? 4 : 2;
      g.beginPath();
      g.moveTo(m + Math.sin(a) * 106, m - Math.cos(a) * 106);
      g.lineTo(m + Math.sin(a) * (106 - lungo), m - Math.cos(a) * (106 - lungo));
      g.stroke();
    }
    g.fillStyle = '#1c140c';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = 'bold 19px serif';
    for (let i = 0; i <= 8; i++) {
      const a = -2.25 + (4.5 * i) / 8;
      g.fillText(String(i * 25), m + Math.sin(a) * 66, m - Math.cos(a) * 66);
    }
    g.font = 'bold 16px serif';
    g.fillText('TALASSA', m, m + 42);
    g.font = '13px serif';
    g.fillText('ATM x 10', m, m - 28);
    macchie(g, l, l, 11, 40, '90,60,20');
  });
}

function texturaStrisce() {
  const t = tela(128, 128, (g, l) => {
    g.fillStyle = '#d4a01c';
    g.fillRect(0, 0, l, l);
    g.fillStyle = '#16120c';
    for (let k = -2; k < 4; k++) {
      g.beginPath();
      g.moveTo(k * 64, 0);
      g.lineTo(k * 64 + 32, 0);
      g.lineTo(k * 64 + 32 + l, l);
      g.lineTo(k * 64 + l, l);
      g.fill();
    }
    macchie(g, l, l, 5, 60, '70,40,10');
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

function texturaInsegne() {
  return tela(1024, 512, (g, l) => {
    INSEGNE.forEach((testo, i) => {
      const y = i * 128;
      const fondo = g.createLinearGradient(0, y, 0, y + 128);
      fondo.addColorStop(0, '#12384a');
      fondo.addColorStop(1, '#0a2230');
      g.fillStyle = fondo;
      g.fillRect(0, y, l, 128);
      g.strokeStyle = '#d9b26a';
      g.lineWidth = 6;
      g.strokeRect(10, y + 10, l - 20, 108);
      g.fillStyle = '#d9b26a';
      for (const x of [26, l - 26]) for (const yy of [y + 26, y + 102]) {
        g.beginPath();
        g.arc(x, yy, 6, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = '#f2e9d0';
      g.font = 'bold 46px serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(testo, l / 2, y + 66, l - 90);
    });
    macchie(g, l, 512, 23, 90, '110,70,30');
  });
}

function texturaCarte() {
  const t = tela(256, 256, (g, l) => {
    g.fillStyle = '#ddd2b4';
    g.fillRect(0, 0, l, l);
    g.strokeStyle = 'rgba(40,50,80,0.75)';
    g.lineWidth = 1.2;
    const caso = casuale(9);
    for (let y = 22; y < l - 20; y += 11) {
      g.beginPath();
      g.moveTo(14, y);
      let x = 14;
      while (x < l - 20 - caso() * 60) {
        x += 4 + caso() * 9;
        g.lineTo(x, y + (caso() - 0.5) * 2);
      }
      g.stroke();
    }
    g.strokeStyle = 'rgba(20,30,60,0.9)';
    g.lineWidth = 2;
    g.beginPath();
    g.ellipse(170, 170, 54, 22, -0.2, 0, Math.PI * 2);
    g.moveTo(120, 180);
    g.quadraticCurveTo(80, 220, 40, 200);
    g.stroke();
    macchie(g, l, l, 4, 30, '120,80,30');
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  return t;
}

function texturaAlone() {
  return tela(64, 64, (g, l) => {
    const r = g.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    r.addColorStop(0, 'rgba(255,255,255,1)');
    r.addColorStop(0.35, 'rgba(255,255,255,0.45)');
    r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, l, l);
  });
}

function materialeQuadranti() {
  const t = texturaQuadrante();
  const m = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, roughness: 0.3, metalness: 0.05 });
  m.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aAccesa;\nvarying vec3 vAccesa;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvAccesa = aAccesa;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vAccesa;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= vAccesa;');
  };
  m.customProgramCacheKey = () => 'quadrantiAlpha';
  return m;
}

function materialeNodo(uTempo) {
  const m = new THREE.MeshStandardMaterial({ color: 0x3a1030, roughness: 0.3, metalness: 0.05, vertexColors: true });
  m.onBeforeCompile = shader => {
    shader.uniforms.uTempo = uTempo;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTempo;\nattribute float aOnda;\nvarying float vOnda;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvOnda = aOnda;\ntransformed += objectNormal * sin(uTempo * 2.1 - aOnda * 3.2) * 0.035 * min(aOnda, 1.5);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uTempo;\nvarying float vOnda;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\nfloat battito = 0.5 + 0.5 * sin(uTempo * 2.1 - vOnda * 3.2);\ntotalEmissiveRadiance += vColor.rgb * (0.3 + 1.7 * battito * battito);');
  };
  m.customProgramCacheKey = () => 'nodoParassita';
  return m;
}

function materialeCreatura(kit) {
  const set = kit.tex.pelle ?? {};
  const m = new THREE.MeshStandardMaterial({ map: set.map ?? null, normalMap: set.normalMap ?? null, color: 0x9a7a88, roughness: 0.42, metalness: 0.05 });
  m.onBeforeCompile = shader => {
    shader.uniforms.uTempo = kit.uniformi.uTempo;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aLuce;\nvarying vec3 vLuce;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLuce = aLuce;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uTempo;\nvarying vec3 vLuce;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vLuce * (1.4 + 0.9 * sin(uTempo * 1.7));');
  };
  m.customProgramCacheKey = () => 'creaturaTeca';
  return m;
}

function materiali(kit) {
  const mat = kit.mat;
  const vetro = mat.vetro.clone();
  vetro.depthWrite = false;
  const emissivo = (colore, intensita, fondo = 0x111111) => new THREE.MeshStandardMaterial({ color: fondo, emissive: colore, emissiveIntensity: intensita, roughness: 0.4 });
  const insegne = texturaInsegne();
  return {
    ...mat,
    vetro,
    strisce: conCaustiche(new THREE.MeshStandardMaterial({ map: texturaStrisce(), roughness: 0.78, metalness: 0.3 }), kit.uniformi, { chiave: 'strisceAlpha' }),
    insegne: new THREE.MeshStandardMaterial({ map: insegne, emissiveMap: insegne, emissive: 0xffffff, emissiveIntensity: 0.45, roughness: 0.35, metalness: 0.3 }),
    carta: conCaustiche(new THREE.MeshStandardMaterial({ map: texturaCarte(), roughness: 0.95 }), kit.uniformi, { chiave: 'carteAlpha', peso: 0.4 }),
    lampade: emissivo(AMBRA, 3.2, 0x2a1a08),
    lampadario: emissivo(0xbfeeff, 2.2, 0x0c1a20),
    spia: emissivo(ALLARME, 4, 0x200404),
    cuoreTurbina: emissivo(0x3fd8ff, 0, 0x041418),
    liquidoViola: emissivo(0xc04dff, 2.2, 0x1a0628),
    vetroLab: new THREE.MeshPhysicalMaterial({ color: 0xd8f4f8, roughness: 0.04, transparent: true, opacity: 0.2, depthWrite: false, clearcoat: 1, side: THREE.DoubleSide }),
    formalina: new THREE.MeshBasicMaterial({ color: 0x5fd83a, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }),
    lancette: new THREE.MeshStandardMaterial({ color: 0x1a0e0a, roughness: 0.5, metalness: 0.6 }),
    coni: materialeConi(kit.uniformi.uTempo),
    quadranti: materialeQuadranti(),
    nodo: materialeNodo(kit.uniformi.uTempo),
    creatura: materialeCreatura(kit),
    alone: new THREE.SpriteMaterial({ map: texturaAlone(), color: CIANO, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }),
  };
}

const tornio = (punti, lati = 24) => new THREE.LatheGeometry(punti.map(([r, y]) => new THREE.Vector2(r, y)), lati);
const scatola = (l, a, p) => new THREE.BoxGeometry(l, a, p);
const cilindro = (r0, r1, h, lati = 16, aperto = false, da = 0, arco = Math.PI * 2) => new THREE.CylinderGeometry(r0, r1, h, lati, 1, aperto, da, arco);
const anello = (r, spessore, lati = 32) => new THREE.TorusGeometry(r, spessore, 8, lati);

function insegna(indice, largo, alto) {
  const g = new THREE.PlaneGeometry(largo, alto);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - (indice + 1) / 4 + uv.getY(i) / 4);
  return g;
}

function officina(c, gruppo) {
  return (materiale, g, x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, ombra = false) => c.metti(materiale, g, { matrice: gruppo.clone().multiply(matrice(x, y, z, ry, rx, rz)), ombra });
}

function obloDellaBaia(centro) {
  return [-1, 1].map(s => centro + (s * SCOSTA_OBLO) / R_DENTRO)
    .filter(a => PEZZI_MURO.every(p => vicino(a, p.a) * R_DENTRO > p.mezzo + LATO_OBLO + 0.1));
}

function pareteBaie(c) {
  for (let k = 0; k < COSTOLONI; k++) {
    const centro = k * P;
    const portale = PORTALI.some(a => vicino(a, centro) < 0.01);
    const boccaporto = BOCCAPORTI_ALPHA.some(a => vicino(a, centro) < 0.01);
    const alto = portale ? CIMA_PORTALE : ALTO_PARETE;
    const fori = portale ? [] : obloDellaBaia(centro);
    for (const [r, verso, materiale, fondo] of [[R_DENTRO, -1, c.m.paratia, FONDO_TECNICO], [R_FUORI, 1, c.m.lamiera, -1.3]]) {
      const buchi = fori.map(a => ({ s0: a * r - LATO_OBLO, s1: a * r + LATO_OBLO, y0: Y_OBLO - LATO_OBLO, y1: Y_OBLO + LATO_OBLO }));
      if (portale || boccaporto) {
        const mezzo = Math.asin((portale ? MEZZO_PORTALE : LARGO_BOCCAPORTO / 2) / r) * r;
        buchi.push({ s0: centro * r - mezzo, s1: centro * r + mezzo, y0: 0, y1: portale ? ALTO_PORTALE : ALTO_BOCCAPORTO });
      }
      c.metti(materiale, pareteConBuchi({
        punto: (s, y) => sulCerchio(s / r, r, y), normale: s => radiale(s / r).multiplyScalar(verso),
        s0: (centro - P / 2) * r, s1: (centro + P / 2) * r, y0: fondo, y1: alto, buchi, passo: 0.42,
      }), { uv: false });
    }
    if (portale) {
      const tappo = new THREE.RingGeometry(R_DENTRO, R_FUORI, 12, 1, -(centro + P / 2), P).rotateX(-Math.PI / 2).translate(0, CIMA_PORTALE, 0);
      c.metti(c.m.lamieraScura, tappo);
      portaleAlpha(c, centro);
    }
    c.oblo.push(...fori);
  }
  for (const a of c.oblo) oblo(c, a);
}

function oblo(c, a) {
  const { m } = c;
  const rad = radiale(a);
  const tan = tangenteGiro(a);
  const forma = new THREE.Shape([new THREE.Vector2(-LATO_OBLO, -LATO_OBLO), new THREE.Vector2(LATO_OBLO, -LATO_OBLO), new THREE.Vector2(LATO_OBLO, LATO_OBLO), new THREE.Vector2(-LATO_OBLO, LATO_OBLO)]);
  forma.holes.push(new THREE.Path().absarc(0, 0, R_OBLO, 0, Math.PI * 2, true));
  const piastra = new THREE.ShapeGeometry(forma, 16);
  const centro = r => rad.clone().multiplyScalar(r).setY(Y_OBLO);
  c.metti(m.paratia, piastra, { matrice: base(tan, SU, rad.clone().negate(), centro(R_DENTRO)) });
  c.metti(m.lamiera, piastra, { matrice: base(tan.clone().negate(), SU, rad, centro(R_FUORI)) });
  c.metti(m.lamieraScura, rovescia(cilindro(R_OBLO, R_OBLO, R_FUORI - R_DENTRO, 20, true)), { matrice: orienta(centro(R), rad) });
  for (const [r, verso] of [[R_DENTRO - 0.03, -1], [R_FUORI + 0.03, 1]]) {
    c.metti(m.ottone, anello(R_OBLO + 0.05, 0.05, 28), { matrice: orienta(centro(r), rad, 1, v3(0, 0, 1)) });
    c.chioda(m.ottone, Array.from({ length: 10 }, (_, i) => {
      const t = (i / 10) * Math.PI * 2;
      return { p: centro(r + verso * 0.04).addScaledVector(tan, Math.cos(t) * (R_OBLO + 0.05)).add(v3(0, Math.sin(t) * (R_OBLO + 0.05), 0)), n: rad.clone().multiplyScalar(verso) };
    }));
  }
  c.metti(m.vetro, new THREE.CircleGeometry(R_OBLO, 24), { matrice: orienta(centro(R - 0.05), rad, 1, v3(0, 0, 1)) });
}

function portaleAlpha(c, a) {
  const { m } = c;
  const rad = radiale(a);
  const tan = tangenteGiro(a);
  const asse = r => rad.clone().multiplyScalar(r);
  const bordo = (s, r, y) => asse(Math.sqrt(r * r - MEZZO_PORTALE ** 2)).addScaledVector(tan, s * MEZZO_PORTALE).setY(y);
  const verso = base(tan.clone().negate(), SU, rad, v3());
  const piazza = (materiale, g, p) => c.metti(materiale, g, { matrice: verso.clone().setPosition(p) });
  for (const s of [-1, 1]) {
    c.metti(m.paratia, quad(bordo(s, R_DENTRO, 0), bordo(s, R_FUORI, 0), bordo(s, R_FUORI, ALTO_PORTALE), bordo(s, R_DENTRO, ALTO_PORTALE), tan.clone().multiplyScalar(-s)));
    piazza(m.acciaio, scatola(0.28, CIMA_PORTALE + 0.1, 0.34), bordo(s, R_DENTRO - 0.15, (CIMA_PORTALE + 0.1) / 2).addScaledVector(tan, s * 0.14));
    piazza(m.acciaio, scatola(0.24, CIMA_PORTALE + 1.4, 0.2), bordo(s, R_FUORI + 0.1, (CIMA_PORTALE + 0.1) / 2 - 0.65).addScaledVector(tan, s * 0.12));
    piazza(m.strisce, scatola(0.26, 1.3, 0.012), bordo(s, R_DENTRO - 0.325, 0.7).addScaledVector(tan, s * 0.14));
    c.chioda(m.acciaio, Array.from({ length: 12 }, (_, i) => ({ p: bordo(s, R_DENTRO - 0.32, 1.45 + i * 0.2).addScaledVector(tan, s * 0.14), n: rad.clone().negate() })));
  }
  c.metti(m.paratia, quad(bordo(-1, R_DENTRO, ALTO_PORTALE), bordo(1, R_DENTRO, ALTO_PORTALE), bordo(1, R_FUORI, ALTO_PORTALE), bordo(-1, R_FUORI, ALTO_PORTALE), v3(0, -1, 0)));
  piazza(m.acciaio, scatola(2 * MEZZO_PORTALE + 0.56, 0.42, 0.34), asse(R_DENTRO - 0.15).setY(3.58));
  piazza(m.acciaio, scatola(2 * MEZZO_PORTALE + 0.48, 0.42, 0.2), asse(R_FUORI + 0.1).setY(3.58));
  piazza(m.lamieraScura, scatola(2 * MEZZO_PORTALE, 0.05, R_FUORI - R_DENTRO + 0.1), asse(R).setY(-0.025));
  const indice = vicino(a, 0) < 0.1 ? 0 : 1;
  c.metti(m.insegne, insegna(indice, 2.6, 0.33), { matrice: base(tan, SU, rad.clone().negate(), asse(R_DENTRO - 0.33).setY(3.58)) });
  c.chioda(m.acciaio, Array.from({ length: 16 }, (_, i) => ({ p: asse(R_DENTRO - 0.32).setY(i % 2 ? 3.43 : 3.73).addScaledVector(tan, -1.9 + ((i >> 1) / 7) * 3.8), n: rad.clone().negate() })));
}

function guscio(c) {
  const { m } = c;
  const tP = tDaY(CIMA_PORTALE);
  const passi = 18;
  const ts = [0, tP, ...Array.from({ length: passi }, (_, i) => tP + ((T_CORONA - tP) * (i + 1)) / passi)];
  const pos = [];
  const nor = [];
  const uv = [];
  const punto = (t, a) => {
    const q = sulGuscio(t, a);
    const n = normaleGuscio(t, a);
    pos.push(q.x, q.y, q.z);
    nor.push(n.x, n.y, n.z);
    uv.push(a * R, q.y);
  };
  for (let i = 0; i < GIRO; i++) {
    const a0 = (i / GIRO) * Math.PI * 2 - Math.PI;
    const a1 = ((i + 1) / GIRO) * Math.PI * 2 - Math.PI;
    const nelPortale = PORTALI.some(ap => vicino((a0 + a1) / 2, ap) < P / 2);
    for (let j = 0; j < ts.length - 1; j++) {
      if (nelPortale && j === 0) continue;
      punto(ts[j], a0); punto(ts[j], a1); punto(ts[j + 1], a1);
      punto(ts[j], a0); punto(ts[j + 1], a1); punto(ts[j + 1], a0);
    }
  }
  c.metti(m.vetro, geometria(pos, nor, uv), { uv: false });

  const sezioni = [rettangolo(-0.36, 0.02, -0.045, 0.045), rettangolo(-0.42, -0.36, -0.16, 0.16), rettangolo(0.02, 0.1, -0.12, 0.12)];
  for (let k = 0; k < COSTOLONI; k++) {
    const a = angoloCostolone(k);
    const telai = Array.from({ length: 31 }, (_, i) => {
      const t = (T_CORONA * i) / 30;
      return telaio(sulGuscio(t, a), tangenteMeridiano(t, a), normaleGuscio(t, a));
    });
    for (const s of sezioni) c.metti(m.acciaio, spazza(s, telai));
    const lista = [];
    for (let i = 2; i < 58; i++) {
      const t = (T_CORONA * i) / 60;
      const f = telaio(sulGuscio(t, a), tangenteMeridiano(t, a), normaleGuscio(t, a));
      for (const s of [-0.11, 0.11]) lista.push({ p: f.p.clone().addScaledVector(f.u, -0.42).addScaledVector(f.v, s), n: f.u.clone().negate() });
    }
    c.chioda(m.acciaio, lista);
    const pilastro = [telaio(v3(0, 0, 0), SU, radiale(a)), telaio(v3(0, 2.42, 0), SU, radiale(a))];
    c.metti(m.acciaio, spazza(rettangolo(R_DENTRO - 0.3, R_DENTRO + 0.02, -0.17, 0.17), pilastro));
    c.metti(m.acciaio, spazza(rettangolo(R_DENTRO - 0.36, R_DENTRO - 0.3, -0.21, 0.21), pilastro));
    c.metti(m.lamieraScura, spazza(rettangolo(R_FUORI - 0.02, R_FUORI + 0.14, -0.15, 0.15), [telaio(v3(0, -1.2, 0), SU, radiale(a)), telaio(v3(0, 2.42, 0), SU, radiale(a))]));
    c.chioda(m.acciaio, Array.from({ length: 16 }, (_, i) => ({ p: sulCerchio(a, R_DENTRO - 0.36, 0.2 + (i >> 1) * 0.3).addScaledVector(tangenteGiro(a), i % 2 ? 0.15 : -0.15), n: radiale(a).negate() })));
  }

  const giro = (t, sezione, materiale) => {
    const telai = Array.from({ length: GIRO + 1 }, (_, i) => {
      const a = (i / GIRO) * Math.PI * 2;
      return telaio(sulGuscio(t, a), tangenteGiro(a), normaleGuscio(t, a));
    });
    c.metti(materiale, spazza(sezione, telai, { tappi: false }));
  };
  for (const y of Y_ANELLI) giro(tDaY(y), rettangolo(-0.4, 0.1, -0.13, 0.13), m.acciaio);
  giro(tDaY(8.2), rettangolo(-0.08, 0.02, -0.03, 0.03), m.acciaio);
  giro(T_CORONA, rettangolo(-0.58, 0.25, -0.35, 0.35), m.lamieraScura);
  giro(T_CORONA - 0.02, rettangolo(-0.62, -0.56, -0.42, 0.42), m.ottone);

  const piano = (r0, r1, y0, y1, a0, a1, materiale, tappi = true) => {
    const n = Math.max(2, Math.ceil((a1 - a0) / 0.05));
    const telai = Array.from({ length: n + 1 }, (_, i) => {
      const a = a0 + ((a1 - a0) * i) / n;
      return telaio(v3(), tangenteGiro(a), radiale(a));
    });
    c.metti(materiale, spazza(rettangolo(r0, r1, y0, y1), telai, { tappi }));
  };
  const mezzo = Math.asin(MEZZO_PORTALE / R_DENTRO) + 0.28 / R_DENTRO;
  for (const [a0, a1] of [[mezzo, Math.PI * 1.5 - mezzo], [-Math.PI / 2 + mezzo, -mezzo]]) {
    piano(R_DENTRO - 0.33, R_FUORI + 0.12, 2.38, 2.75, a0, a1, m.acciaio);
    const lista = [];
    for (let a = a0 + 0.01; a < a1; a += 0.02) for (const y of [2.45, 2.68]) lista.push({ p: sulCerchio(a, R_DENTRO - 0.33, y), n: radiale(a).negate() });
    c.chioda(m.acciaio, lista);
  }
  const lista = [];
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    lista.push({ p: sulGuscio(T_CORONA, a, -0.58), n: normaleGuscio(T_CORONA, a).negate() });
  }
  c.chioda(m.ottone, lista);

  for (let k = 0; k < COSTOLONI; k++) {
    const centro = k * P;
    const portale = PORTALI.some(a => vicino(a, centro) < 0.01);
    const y0 = portale ? CIMA_PORTALE + 0.05 : 2.75;
    const w = P / 2 - 0.18 / R;
    const rami = [-1, 1].map(s => Array.from({ length: 15 }, (_, i) => {
      const f = Math.min((i / 14) * (Math.PI / 3), Math.PI / 3);
      const off = s * (w - 2 * w * (1 - Math.cos(f)));
      const y = y0 + ((Y_ARCHI - y0) * Math.sin(f)) / Math.sin(Math.PI / 3);
      const t = tDaY(y);
      return sulGuscio(t, centro + off, -0.05);
    }));
    for (const punti of [...rami, [sulGuscio(tDaY(y0), centro, -0.05), sulGuscio(tDaY(Y_ARCHI - 0.02), centro, -0.05)]]) {
      const telai = punti.map((p, i) => {
        const q = punti[Math.min(i + 1, punti.length - 1)];
        const o = punti[Math.max(i - 1, 0)];
        const n = p.clone().setY(0).normalize().multiplyScalar(0.8).add(v3(0, 0.25, 0)).normalize();
        return telaio(p, q.clone().sub(o), n);
      });
      c.metti(m.acciaio, spazza(rettangolo(-0.05, 0.02, -0.035, 0.035), telai));
    }
  }

  c.metti(m.lamieraScura, tornio([[0.26, 11.72], [0.9, 11.66], [1.6, 11.52], [2.1, 11.28], [2.42, 10.95]].reverse(), 48));
  c.metti(m.lamieraScura, tornio([[0.26, 11.62], [0.9, 11.56], [1.6, 11.42], [2.05, 11.2], [2.3, 10.9]], 48));
}

function pavimento(c) {
  const { m } = c;
  const grata = new THREE.RingGeometry(R_PEDANA, R_CORSIA, 128, 4).rotateX(-Math.PI / 2);
  const uvG = grata.attributes.uv;
  const pG = grata.attributes.position;
  for (let i = 0; i < uvG.count; i++) uvG.setXY(i, pG.getX(i) * 2, pG.getZ(i) * 2);
  c.metti(m.grata, grata, { uv: false });
  c.metti(m.lamieraScura, new THREE.RingGeometry(R_CORSIA, R_DENTRO + 0.02, 128, 1).rotateX(-Math.PI / 2));
  c.metti(m.lamieraScura, new THREE.CircleGeometry(R_PEDANA, 48).rotateX(-Math.PI / 2).translate(0, 0.004, 0));
  c.metti(m.strisce, new THREE.RingGeometry(1.84, 2.06, 64).rotateX(-Math.PI / 2).translate(0, 0.008, 0));
  c.metti(m.lamieraScura, new THREE.CircleGeometry(R_DENTRO, 64).rotateX(-Math.PI / 2).translate(0, FONDO_TECNICO, 0));
  const piano = (r0, r1, y0, y1, materiale) => {
    const telai = Array.from({ length: GIRO + 1 }, (_, i) => {
      const a = (i / GIRO) * Math.PI * 2;
      return telaio(v3(), tangenteGiro(a), radiale(a));
    });
    c.metti(materiale, spazza(rettangolo(r0, r1, y0, y1), telai, { tappi: false }));
  };
  piano(R_CORSIA - 0.05, R_CORSIA + 0.05, -0.3, 0.014, m.acciaio);
  piano(R_PEDANA - 0.05, R_PEDANA + 0.05, -0.3, 0.014, m.acciaio);
  piano(6.76, 6.84, -0.3, -0.004, m.acciaio);
  const lista = [];
  for (let i = 0; i < 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    lista.push({ p: sulCerchio(a, R_CORSIA + 0.18, 0), n: SU }, { p: sulCerchio(a, R_DENTRO - 0.12, 0), n: SU });
  }
  for (let k = 0; k < COSTOLONI; k++) {
    const a = angoloCostolone(k);
    const lungo = R_DENTRO - R_PEDANA;
    const mezzo = (R_DENTRO + R_PEDANA) / 2;
    c.metti(m.acciaio, scatola(lungo, 0.26, 0.05), { matrice: matrice(Math.cos(a) * mezzo, -0.16, Math.sin(a) * mezzo, -a) });
    c.metti(m.acciaio, scatola(lungo, 0.025, 0.16), { matrice: matrice(Math.cos(a) * mezzo, -0.018, Math.sin(a) * mezzo, -a) });
    for (let r = R_CORSIA + 0.4; r < R_DENTRO - 0.2; r += 0.25) lista.push({ p: sulCerchio(a + 0.06 / r, r, 0), n: SU }, { p: sulCerchio(a - 0.06 / r, r, 0), n: SU });
  }
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    lista.push({ p: sulCerchio(a, 1.95, 0.012), n: SU });
  }
  c.chioda(m.acciaio, lista);
  const tubi = [
    [m.rame, 0.2, [sulCerchio(-2.4, 12.5, -0.62), sulCerchio(-2.4, 11.6, -0.62), sulCerchio(0.75, 11.6, -0.62), sulCerchio(0.75, 12.5, -0.62)]],
    [m.lamiera, 0.13, [sulCerchio(2.0, 12.6, -0.45), sulCerchio(2.0, 11.8, -0.45), sulCerchio(-0.9, 11.8, -0.45), sulCerchio(-0.9, 12.6, -0.45)]],
    [m.lamieraScura, 0.11, Array.from({ length: 49 }, (_, i) => sulCerchio((i / 48) * Math.PI * 2, 8.7, -0.72))],
    ...[0.4, 1.9, 3.5, 5.1].map(a => [m.rame, 0.075, [sulCerchio(a, 8.7, -0.72), sulCerchio(a, 12.2, -0.72), sulCerchio(a, 12.7, -0.3)]]),
  ];
  for (const [materiale, raggio, punti] of tubi) c.metti(materiale, tubo(punti, raggio, { smusso: 0.4 }), { uv: false });
  const caso = casuale(17);
  for (let i = 0; i < 14; i++) {
    const a = caso() * Math.PI * 2;
    const r = 3 + caso() * 7.8;
    c.metti(m.luceFredda, cilindro(0.08, 0.11, 0.05, 12), { matrice: matrice(Math.cos(a) * r, FONDO_TECNICO + 0.025, Math.sin(a) * r) });
  }
  for (const a of [0.4, 1.9, 3.5, 5.1, 2.7, -1.7]) {
    c.volantini.push({ p: sulCerchio(a + 0.04, 8.7, -0.42), dir: SU.clone(), raggio: 0.6, chiave: null });
    c.metti(m.ottone, cilindro(0.05, 0.05, 0.3, 10), { matrice: matrice(Math.cos(a + 0.04) * 8.7, -0.57, Math.sin(a + 0.04) * 8.7) });
  }
}

function periscopio(c) {
  const { m } = c;
  const o = (materiale, g, matrix = null) => c.metti(materiale, g, { matrice: matrix, ombra: true });
  o(m.acciaio, tornio([[0, 0], [1.0, 0], [1.0, 0.13], [0.93, 0.17], [0.86, 0.36], [0.74, 0.55], [0.62, 0.6]], 48));
  o(m.acciaio, cilindro(0.62, 0.62, 8.5, 40, true).translate(0, 4.8, 0));
  const manica = cilindro(0.7, 0.7, 1.7, 120, true);
  const p = manica.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const a = Math.atan2(p.getZ(i), p.getX(i));
    const r = 0.69 + 0.028 * THREE.MathUtils.smoothstep(0.5 + 0.5 * Math.cos(a * 24), 0.25, 0.75);
    p.setXYZ(i, Math.cos(a) * r, p.getY(i), Math.sin(a) * r);
  }
  manica.computeVertexNormals();
  o(m.ottone, manica.translate(0, 1.8, 0));
  for (const [y, r, s] of [[0.95, 0.715, 0.05], [2.65, 0.715, 0.05], [4.5, 0.64, 0.045], [6.5, 0.64, 0.045], [8.6, 0.64, 0.045]]) o(m.ottone, anello(r, s, 48).rotateX(Math.PI / 2).translate(0, y, 0));
  o(m.acciaio, cilindro(0.74, 0.74, 0.16, 48).translate(0, 5.5, 0));
  c.chioda(m.acciaio, Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2;
    return { p: sulCerchio(a, 0.74, 5.5), n: radiale(a) };
  }));
  c.chioda(m.acciaio, Array.from({ length: 28 }, (_, i) => ({ p: sulCerchio((i / 28) * Math.PI * 2, 0.96, 0.13), n: SU })));
  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + (k * Math.PI) / 2;
    const x = Math.cos(a) * 0.82;
    const z = Math.sin(a) * 0.82;
    o(m.acciaio, cilindro(0.075, 0.075, 3.7, 14).translate(x, 2.45, z));
    o(m.ottone, cilindro(0.042, 0.042, 1.2, 10).translate(x, 4.85, z));
    for (const y of [0.7, 4.28]) o(m.ottone, anello(0.085, 0.022, 14).rotateX(Math.PI / 2).translate(x, y, z));
  }
  o(m.lamieraScura, scatola(0.56, 0.46, 0.34).translate(0, 1.68, 0.83));
  o(m.ottone, scatola(0.6, 0.05, 0.38).translate(0, 1.93, 0.83));
  for (const s of [-1, 1]) {
    o(m.acciaio, tubo([v3(s * 0.28, 1.6, 0.86), v3(s * 0.5, 1.6, 0.86)], 0.028));
    o(m.gomma, cilindro(0.042, 0.042, 0.16, 10).rotateZ(Math.PI / 2).translate(s * 0.46, 1.6, 0.86));
  }
  o(m.gomma, cilindro(0.075, 0.06, 0.1, 14).rotateX(Math.PI / 2).translate(0, 1.76, 1.04));
  o(m.ottone, anello(0.07, 0.015, 16).translate(0, 1.76, 1.0));
  for (const s of [-1, 1]) {
    c.quadranti.push({ p: v3(s * 0.745, 2.15, 0), dir: v3(s, 0, 0), su: SU.clone(), raggio: 0.85, chiave: 'fisso' });
    o(m.ottone, anello(0.135, 0.02, 24), base(v3(0, 0, -s), SU, v3(s, 0, 0), v3(s * 0.735, 2.15, 0)));
  }
  const fascia = cilindro(0.635, 0.635, 0.13, 40, true, -0.7, 1.4);
  const uvF = fascia.attributes.uv;
  for (let i = 0; i < uvF.count; i++) uvF.setY(i, 0.25 + uvF.getY(i) / 4);
  c.metti(m.insegne, fascia.translate(0, 3.2, 0), { uv: false });
  o(m.ottone, tornio([[0.62, 8.85], [0.8, 9.0], [0.82, 9.12], [0.7, 9.22], [0.42, 9.36], [0.24, 9.42]], 40));
  o(m.acciaio, cilindro(0.24, 0.24, 3.45, 24, true).translate(0, 11.1, 0));
  for (const y of [9.9, 10.6, 12.1]) o(m.ottone, anello(0.255, 0.03, 24).rotateX(Math.PI / 2).translate(0, y, 0));
  o(m.lamieraScura, scatola(0.46, 0.56, 0.62).translate(0, 13.05, 0));
  o(m.lamieraScura, scatola(0.52, 0.06, 0.68).translate(0, 13.36, 0));
  c.metti(m.luceFredda, new THREE.CircleGeometry(0.12, 20).translate(0, 13.08, 0.315));
}

function lampadeEmergenza(c) {
  const { m, kit } = c;
  for (const k of LAMPADE) {
    const a = angoloCostolone(k);
    const rad = radiale(a);
    const attacco = rad.clone().multiplyScalar(R_DENTRO - 0.36).setY(2.2);
    const testa = rad.clone().multiplyScalar(R_DENTRO - 0.7).setY(2.06);
    const mira = rad.clone().multiplyScalar(R_DENTRO - 5.4).setY(0);
    const dir = mira.clone().sub(testa).normalize();
    c.metti(m.acciaio, scatola(0.24, 0.32, 0.05), { matrice: base(tangenteGiro(a).negate(), SU, rad, attacco.clone().addScaledVector(rad, 0.02)) });
    c.metti(m.acciaio, tubo([attacco, attacco.clone().addScaledVector(rad, -0.16).add(v3(0, 0.06, 0)), testa.clone().addScaledVector(dir, -0.1)], 0.026));
    c.metti(m.lamieraScura, cilindro(0.12, 0.135, 0.16, 18), { matrice: orienta(testa.clone().addScaledVector(dir, -0.05), dir) });
    c.metti(m.lampade, new THREE.SphereGeometry(0.105, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), { matrice: orienta(testa.clone().addScaledVector(dir, 0.03), dir) });
    c.metti(m.acciaio, anello(0.125, 0.013, 20), { matrice: orienta(testa.clone().addScaledVector(dir, 0.1), dir, 1, v3(0, 0, 1)) });
    for (let i = 0; i < 4; i++) {
      const g = tubo([v3(Math.cos((i * Math.PI) / 2) * 0.12, 0.03, Math.sin((i * Math.PI) / 2) * 0.12), v3(Math.cos((i * Math.PI) / 2) * 0.05, 0.16, Math.sin((i * Math.PI) / 2) * 0.05)], 0.01, { radiali: 4 });
      c.metti(m.acciaio, g, { matrice: orienta(testa, dir), uv: false });
    }
    c.metti(m.coni, cono(testa.clone().addScaledVector(dir, 0.1), dir, 4.1, 1.7, new THREE.Color(AMBRA).multiplyScalar(0.12)), { uv: false });
    const fase = a * 3.1;
    kit.luce({
      x: testa.x, y: testa.y, z: testa.z, colore: AMBRA, intensita: 10, portata: 12, ombra: LAMPADE_OMBRA.includes(k), mira: { x: mira.x, y: 0, z: mira.z },
      forza: (v, t) => (protocolloDi(v) ? 3 + 11 * Math.max(0, Math.sin(t * 3.2 + fase)) : 10 * (0.93 + 0.04 * Math.sin(t * 9 + fase) + 0.03 * Math.sin(t * 23 + fase * 2))),
      colorePer: v => (protocolloDi(v) ? ALLARME : AMBRA),
    });
  }
  c.metti(m.lampadario, anello(1.45, 0.055, 64).rotateX(Math.PI / 2).translate(0, 10.32, 0));
  c.metti(m.acciaio, anello(1.45, 0.03, 64).rotateX(Math.PI / 2).translate(0, 10.42, 0));
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    c.metti(m.acciaio, tubo([sulCerchio(a, 1.45, 10.42), sulCerchio(a, 1.95, 10.62)], 0.022, { radiali: 5 }), { uv: false });
    c.metti(m.lampadario, new THREE.SphereGeometry(0.07, 10, 8).translate(Math.cos(a + 0.39) * 1.45, 10.26, Math.sin(a + 0.39) * 1.45));
  }
  c.metti(m.coni, cono(v3(0, 10.3, 0), v3(0, -1, 0), 10.2, 4.8, new THREE.Color(0x7fd4ff).multiplyScalar(0.05), { inizio: 1.45, lati: 32 }), { uv: false });
  kit.luce({
    x: 1.45, y: 10.1, z: 0, colore: 0x9fdcff, intensita: 14, portata: 24,
    forza: (v, t) => (protocolloDi(v) ? 6 + 10 * Math.max(0, Math.sin(t * 3.2)) : v.corrente ? 18 : 10),
    colorePer: v => (protocolloDi(v) ? ALLARME : 0x9fdcff),
  });
}

function protocolloDi(v) {
  return !!v?.abisso?.protocollo && !v.abisso.completata;
}

function tubature(c) {
  const { m } = c;
  const archi = [[0.32, Math.PI * 1.5 - 0.32], [-Math.PI / 2 + 0.32, -0.32]];
  for (const [y, r, raggio, materiale, scarto] of [[Y_TUBI[0], 12.52, 0.11, m.rame, 0], [Y_TUBI[1], 12.48, 0.075, m.lamiera, 0.05]]) {
    for (const [a0, a1] of archi) {
      const b0 = a0 + scarto;
      const b1 = a1 - scarto;
      const n = Math.ceil((b1 - b0) / 0.06);
      const punti = [sulCerchio(b0, r, -0.6), ...Array.from({ length: n + 1 }, (_, i) => sulCerchio(b0 + ((b1 - b0) * i) / n, r, y)), sulCerchio(b1, r, -0.6)];
      c.metti(materiale, tubo(punti, raggio, { smusso: 0.35, radiali: 10, perMetro: 2.5 }), { uv: false });
      for (let k = -8; k < 8; k++) {
        const a = angoloCostolone(k);
        const dentro = [a, a + Math.PI * 2, a - Math.PI * 2].some(x => x > b0 + 0.02 && x < b1 - 0.02);
        if (!dentro) continue;
        c.metti(m.acciaio, anello(raggio + 0.02, 0.018, 14), { matrice: orienta(sulCerchio(a, r, y), tangenteGiro(a), 1, v3(0, 0, 1)) });
        c.metti(m.acciaio, scatola(0.05, 0.05, 12.82 - r), { matrice: base(tangenteGiro(a).negate(), SU, radiale(a), sulCerchio(a, (r + 12.82) / 2, y)) });
      }
    }
  }
  for (const k of [2, 9, 13]) {
    const a = angoloCostolone(k) + 0.012;
    const punti = [sulCerchio(a, 12.48, Y_TUBI[1]), ...Array.from({ length: 18 }, (_, i) => sulGuscio(tDaY(3.7) + ((T_CORONA - 0.02 - tDaY(3.7)) * i) / 17, a, -0.62))];
    c.metti(m.rame, tubo(punti, 0.07, { smusso: 0.3, radiali: 8, perMetro: 2 }), { uv: false });
  }
  for (let k = 0; k < COSTOLONI; k++) {
    const centro = k * P;
    const t = tDaY(Y_ANELLI[0]);
    const p0 = sulGuscio(t, centro - P / 2 + 0.012, -0.5);
    const p1 = sulGuscio(t, centro + P / 2 - 0.012, -0.5);
    for (const [cala, alza] of [[0.55, 0], [0.95, -0.06]]) {
      const punti = Array.from({ length: 13 }, (_, i) => {
        const f = i / 12;
        return p0.clone().lerp(p1, f).add(v3(0, alza - cala * 4 * f * (1 - f), 0));
      });
      c.metti(m.gomma, tubo(new THREE.CatmullRomCurve3(punti), 0.022, { radiali: 5, perMetro: 2.4 }), { uv: false });
    }
  }
  for (const a of [1.5, 2.95, -2.75, -1.0]) {
    c.volantini.push({ p: sulCerchio(a, 12.3, Y_TUBI[0]), dir: radiale(a).negate(), raggio: 0.55, chiave: null });
    c.metti(m.ottone, new THREE.SphereGeometry(0.15, 14, 10).scale(1, 0.85, 1), { matrice: matrice(Math.cos(a) * 12.52, Y_TUBI[0], Math.sin(a) * 12.52) });
    c.metti(m.ottone, tubo([sulCerchio(a, 12.5, Y_TUBI[0]), sulCerchio(a, 12.32, Y_TUBI[0])], 0.03), { uv: false });
  }
}

function valvole(c) {
  const { m } = c;
  VALVOLE.forEach((v, i) => {
    const a = Math.atan2(v.z - ALPHA.z, v.x - ALPHA.x);
    const rad = radiale(a);
    const su = r => rad.clone().multiplyScalar(r);
    c.metti(m.rame, tubo([su(12.8).setY(-0.7), su(12.8).setY(2.4)], 0.085), { uv: false });
    c.metti(m.ottone, new THREE.SphereGeometry(0.17, 18, 12).scale(1, 0.8, 1), { matrice: matrice(rad.x * 12.8, 1.25, rad.z * 12.8) });
    for (const y of [1.08, 1.42]) c.metti(m.ottone, cilindro(0.14, 0.14, 0.05, 18), { matrice: matrice(rad.x * 12.8, y, rad.z * 12.8) });
    c.metti(m.ottone, tubo([su(12.74).setY(1.25), su(12.45).setY(1.25)], 0.05), { uv: false });
    c.metti(m.ottone, cilindro(0.078, 0.078, 0.08, 6), { matrice: orienta(su(12.58).setY(1.25), rad) });
    c.volantini.push({ p: su(12.42).setY(1.25), dir: rad.clone().negate(), raggio: 1, chiave: i });
    c.metti(m.rame, tubo([su(12.8).setY(1.45), su(12.8).setY(1.68), su(12.66).setY(1.85)], 0.028, { smusso: 0.1 }), { uv: false });
    c.metti(m.ottone, cilindro(0.19, 0.19, 0.09, 28), { matrice: orienta(su(12.64).setY(1.95), rad) });
    c.metti(m.ottone, anello(0.168, 0.022, 28), { matrice: orienta(su(12.592).setY(1.95), rad, 1, v3(0, 0, 1)) });
    c.quadranti.push({ p: su(12.594).setY(1.95), dir: rad.clone().negate(), su: SU.clone(), raggio: 1, chiave: i });
    c.chioda(m.ottone, Array.from({ length: 8 }, (_, j) => ({ p: sulCerchio(a, 12.8, 1.08).addScaledVector(radiale((j / 8) * Math.PI * 2), 0.115).setY(1.11), n: SU })));
  });
}

function strumenti(c) {
  const { m, kit } = c;
  const n = c.quadranti.length;
  const facce = new THREE.CircleGeometry(0.155, 32);
  const accese = new THREE.InstancedBufferAttribute(new Float32Array(n * 3), 3);
  facce.setAttribute('aAccesa', accese);
  const quadranti = new THREE.InstancedMesh(facce, m.quadranti, n);
  const ago = mergeGeometries([scatola(0.012, 0.12, 0.006).translate(0, 0.045, 0), cilindro(0.016, 0.016, 0.01, 10).rotateX(Math.PI / 2)]);
  const lancette = new THREE.InstancedMesh(ago, m.lancette, n);
  const basi = c.quadranti.map(q => base(q.su.clone().cross(q.dir), q.su, q.dir, q.p).multiply(new THREE.Matrix4().makeScale(q.raggio, q.raggio, q.raggio)));
  basi.forEach((b, i) => quadranti.setMatrixAt(i, b));
  const ruote = mergeGeometries([
    anello(0.28, 0.026, 36),
    scatola(0.54, 0.03, 0.025),
    scatola(0.03, 0.54, 0.025),
    cilindro(0.05, 0.05, 0.09, 12).rotateX(Math.PI / 2),
    cilindro(0.022, 0.022, 0.12, 8).rotateX(Math.PI / 2).translate(0.28, 0, 0.06),
  ]);
  const volantini = new THREE.InstancedMesh(ruote, m.ottone, c.volantini.length);
  const basiRuote = c.volantini.map(w => {
    const su = Math.abs(w.dir.y) > 0.9 ? v3(1, 0, 0) : SU.clone();
    return base(su.clone().cross(w.dir), su, w.dir, w.p).multiply(new THREE.Matrix4().makeScale(w.raggio, w.raggio, w.raggio));
  });
  basiRuote.forEach((b, i) => volantini.setMatrixAt(i, b));
  for (const mesh of [quadranti, lancette, volantini]) {
    mesh.frustumCulled = false;
    kit.scena.add(mesh);
  }
  const ruota = new THREE.Matrix4();
  const spinta = new THREE.Matrix4().makeTranslation(0, 0, 0.007);
  return {
    accesa(i, r, g, b) { accese.setXYZ(i, r, g, b); },
    ago(i, angolo) { lancette.setMatrixAt(i, ruota.copy(basi[i]).multiply(spinta).multiply(new THREE.Matrix4().makeRotationZ(-angolo))); },
    ruota(i, angolo) { volantini.setMatrixAt(i, ruota.copy(basiRuote[i]).multiply(new THREE.Matrix4().makeRotationZ(angolo))); },
    aggiorna() {
      accese.needsUpdate = true;
      lancette.instanceMatrix.needsUpdate = true;
      volantini.instanceMatrix.needsUpdate = true;
    },
  };
}

function turbina(c) {
  const { m, kit } = c;
  const M = matrice(-8.5, 0, -4.6);
  const o = officina(c, M);
  for (const z of [-1.0, 1.0]) o(m.acciaio, scatola(2.3, 0.18, 0.16), 0, 0.09, z, 0, 0, 0, true);
  for (const x of [-1.05, 1.05]) o(m.acciaio, scatola(0.16, 0.18, 2.1), x, 0.09, 0);
  o(m.strisce, scatola(2.3, 0.18, 0.012), 0, 0.09, 1.086);
  for (const z of [-0.6, 0.5]) o(m.lamieraScura, scatola(1.7, 0.42, 0.26), 0, 0.39, z);
  const corpo = cilindro(1.05, 1.05, 2.0, 48, true).rotateX(Math.PI / 2);
  o(m.paratia, corpo, 0, 1.48, -0.05, 0, 0, 0, true);
  o(m.lamieraScura, rovescia(cilindro(1.0, 1.0, 1.9, 40, true).rotateX(Math.PI / 2)), 0, 1.48, 0.0);
  o(m.lamieraScura, new THREE.CircleGeometry(1.05, 40).rotateY(Math.PI), 0, 1.48, -1.05);
  for (const z of [0.95, -1.05]) {
    o(m.acciaio, anello(1.08, 0.065, 48), 0, 1.48, z);
    c.chioda(m.acciaio, Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return { p: v3(Math.cos(a) * 1.08 - 8.5, 1.48 + Math.sin(a) * 1.08, z - 4.6 + 0.065 * Math.sign(z)), n: v3(0, 0, Math.sign(z)) };
    }));
  }
  o(m.ottone, anello(0.97, 0.1, 48), 0, 1.48, 1.02);
  for (const r of [0.35, 0.62, 0.88]) o(m.acciaio, anello(r, 0.018, 40), 0, 1.48, 1.09);
  for (let i = 0; i < 12; i++) o(m.acciaio, scatola(0.025, 0.9, 0.025).translate(0, 0.53, 0), 0, 1.48, 1.09, 0, 0, (i / 12) * Math.PI * 2);
  o(m.acciaio, new THREE.SphereGeometry(0.14, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2), 0, 1.48, 1.09);
  o(m.cuoreTurbina, new THREE.CircleGeometry(0.98, 40), 0, 1.48, 0.25);
  o(m.lamieraScura, cilindro(0.85, 0.85, 0.32, 40).rotateX(Math.PI / 2), 0, 1.48, -1.2);
  for (let i = 0; i < 9; i++) o(m.acciaio, scatola(1.5, 0.36, 0.03), 0, 2.66, -0.85 + i * 0.2);
  o(m.lamieraScura, tubo([v3(0.55, 2.4, -0.6), v3(0.55, 3.9, -0.6)], 0.16), 0, 0, 0);
  o(m.lamieraScura, new THREE.ConeGeometry(0.32, 0.25, 16).translate(0, 4.05, 0), 0.55, 0, -0.6);
  o(m.paratia, scatola(0.2, 2.0, 0.2), 1.08, 1.0, 1.05);
  o(m.acciaio, anello(0.1, 0.012, 16).rotateX(Math.PI / 2), 1.08, 2.13, 1.05);
  for (let i = 0; i < 4; i++) o(m.acciaio, scatola(0.012, 0.2, 0.012), 1.08 + Math.cos((i * Math.PI) / 2) * 0.1, 2.18, 1.05 + Math.sin((i * Math.PI) / 2) * 0.1);
  o(m.spia, new THREE.SphereGeometry(0.085, 16, 12), 1.08, 2.15, 1.05);
  o(m.ottone, anello(0.135, 0.02, 24), 1.08, 1.55, 1.155);
  c.quadranti.push({ p: v3(1.08 - 8.5, 1.55, 1.158 - 4.6), dir: v3(0, 0, 1), su: SU.clone(), raggio: 0.8, chiave: 'turbina' });
  o(m.acciaio, tubo([v3(1.08, 1.2, 1.16), v3(1.08, 1.32, 1.4)], 0.02), 0, 0, 0);
  o(m.gomma, new THREE.SphereGeometry(0.04, 10, 8), 1.08, 1.32, 1.42);
  const pale = [cilindro(0.18, 0.18, 0.4, 20).rotateX(Math.PI / 2), new THREE.ConeGeometry(0.18, 0.3, 20).rotateX(Math.PI / 2).translate(0, 0, 0.35)];
  for (let i = 0; i < 9; i++) pale.push(scatola(0.74, 0.2, 0.025).translate(0.53, 0, 0).applyMatrix4(new THREE.Matrix4().makeRotationX(0.45)).applyMatrix4(new THREE.Matrix4().makeRotationZ((i / 9) * Math.PI * 2)));
  const rotore = new THREE.Mesh(kit.uvMetri(mergeGeometries(pale.map(g => g.index ? g.toNonIndexed() : g)), 1), m.acciaio);
  rotore.position.set(-8.5, 1.48, -4.6 + 0.6);
  kit.ombra(rotore);
  kit.scena.add(rotore);
  const spia = { x: 1.08 - 8.5, y: 2.15, z: 1.05 - 4.6 };
  const statoT = v => v.abisso?.turbine?.[0] ?? 0;
  kit.luce({
    ...spia, colore: ALLARME, intensita: 2.5, portata: 4.5,
    forza: (v, t) => (statoT(v) >= 1 ? 3 : statoT(v) > 0 ? (Math.sin(t * 10) > 0 ? 3.5 : 0.3) : 1.4),
    colorePer: v => (statoT(v) >= 1 ? VERDE : ALLARME),
  });
  const cavi = [[-7.35, -4.2], [-7.35, -4.35], [-7.35, -4.5]].map(([x, z], i) => [v3(x, 0.4, z), v3(x + 0.3, 0.05, z + 0.2), v3(-4.5, 0.05, -2.6 + i * 0.12), v3(-1.0, 0.05, -0.9 + i * 0.12), v3(-0.8, 0.2, -0.6 + i * 0.1)]);
  for (const punti of cavi) c.metti(m.gomma, tubo(new THREE.CatmullRomCurve3(punti), 0.035, { radiali: 6 }), { uv: false });
  return { rotore, angolo: 0 };
}

function bancone(c, matrix, lungo, profondo, oggetti) {
  const { m } = c;
  const o = officina(c, matrix);
  o(m.lamieraScura, scatola(lungo - 0.1, 0.08, profondo - 0.16), 0, 0.04, -0.03);
  o(m.paratia, scatola(lungo - 0.06, 0.85, profondo - 0.1), 0, 0.505, 0, 0, 0, 0, true);
  const cassetti = Math.floor(lungo / 0.8);
  for (let i = 0; i < cassetti; i++) {
    const x = -lungo / 2 + (lungo / cassetti) * (i + 0.5);
    o(m.paratia, scatola(lungo / cassetti - 0.06, 0.22, 0.02), x, 0.8, profondo / 2 - 0.04);
    o(m.paratia, scatola(lungo / cassetti - 0.06, 0.5, 0.02), x, 0.38, profondo / 2 - 0.04);
    o(m.ottone, cilindro(0.012, 0.012, 0.16, 8).rotateZ(Math.PI / 2), x, 0.8, profondo / 2 - 0.005);
    o(m.ottone, cilindro(0.012, 0.012, 0.1, 8), x + lungo / cassetti / 2 - 0.12, 0.4, profondo / 2 - 0.005);
  }
  o(m.lamieraScura, scatola(lungo, 0.07, profondo), 0, 0.965, 0, 0, 0, 0, true);
  o(m.paratia, scatola(lungo - 0.1, 0.9, 0.04), 0, 1.45, -profondo / 2 + 0.04);
  o(m.acciaio, scatola(lungo - 0.1, 0.03, 0.26), 0, 1.55, -profondo / 2 + 0.17);
  for (const x of [-lungo / 2 + 0.2, 0, lungo / 2 - 0.2]) o(m.acciaio, scatola(0.03, 0.14, 0.2), x, 1.47, -profondo / 2 + 0.15);
  for (const [tipo, x, z, ry] of oggetti) oggettoLab(c, o, tipo, x, z, ry, profondo);
}

function oggettoLab(c, o, tipo, x, z, ry, profondo) {
  const { m } = c;
  const piano = 1.0;
  if (tipo === 'beuta' || tipo === 'beutaViola') {
    o(m.vetroLab, tornio([[0, 0], [0.07, 0], [0.075, 0.01], [0.07, 0.05], [0.03, 0.14], [0.022, 0.16], [0.022, 0.2], [0.026, 0.205]], 16), x, piano, z, ry);
    o(tipo === 'beuta' ? m.oricalco : m.liquidoViola, tornio([[0, 0.006], [0.064, 0.006], [0.061, 0.05], [0.045, 0.08], [0, 0.08]], 14), x, piano, z, ry);
  } else if (tipo === 'becher') {
    o(m.vetroLab, cilindro(0.05, 0.05, 0.12, 14, true), x, piano + 0.06, z);
    o(m.luceCalda, cilindro(0.046, 0.046, 0.05, 14), x, piano + 0.026, z);
  } else if (tipo === 'microscopio') {
    o(m.ottone, scatola(0.16, 0.03, 0.22), x, piano + 0.015, z, ry);
    o(m.ottone, cilindro(0.02, 0.02, 0.2, 10), x, piano + 0.12, z - 0.07 * Math.cos(ry), ry);
    o(m.ottone, tubo([v3(0, 0.2, -0.07), v3(0, 0.3, -0.06), v3(0, 0.32, 0.02)], 0.018), x, piano, z, ry);
    o(m.acciaio, cilindro(0.026, 0.022, 0.2, 14), x, piano + 0.28, z + 0.02, ry, -0.35);
    o(m.acciaio, scatola(0.12, 0.012, 0.1), x, piano + 0.12, z + 0.02, ry);
  } else if (tipo === 'vasetto') {
    const y = 1.565;
    const zz = -profondo / 2 + 0.17;
    o(m.vetroLab, cilindro(0.06, 0.06, 0.16, 14, true), x, y + 0.08, zz);
    o(m.formalina, cilindro(0.056, 0.056, 0.13, 14), x, y + 0.068, zz);
    o(m.ottone, cilindro(0.064, 0.064, 0.025, 14), x, y + 0.172, zz);
    o(m.liquidoViola, c.kit.deforma(new THREE.SphereGeometry(0.035, 10, 8).scale(1, 0.7, 1.6), { ampiezza: 0.01, frequenza: 30 }), x, y + 0.07, zz, ry);
  } else if (tipo === 'lampada') {
    o(m.acciaio, cilindro(0.08, 0.09, 0.03, 14), x, piano + 0.015, z);
    o(m.acciaio, tubo([v3(0, 0.03, 0), v3(0, 0.35, 0.02), v3(0.18, 0.45, 0.06)], 0.012), x, piano, z, ry);
    o(m.lamieraScura, new THREE.ConeGeometry(0.09, 0.12, 16, 1, true), x + 0.18 * Math.cos(ry), piano + 0.42, z - 0.18 * Math.sin(ry), ry, 0, 0.6);
    o(m.luceCalda, new THREE.SphereGeometry(0.035, 10, 8), x + 0.18 * Math.cos(ry), piano + 0.4, z - 0.18 * Math.sin(ry));
  } else if (tipo === 'radio') {
    o(m.lamieraScura, scatola(0.5, 0.32, 0.28), x, piano + 0.16, z, ry);
    for (let i = 0; i < 5; i++) o(m.acciaio, scatola(0.2, 0.012, 0.005), x - 0.12, piano + 0.1 + i * 0.03, z + 0.142, ry);
    for (let i = 0; i < 3; i++) o(m.gomma, cilindro(0.025, 0.025, 0.03, 10).rotateX(Math.PI / 2), x + 0.06 + i * 0.07, piano + 0.07, z + 0.15, ry);
    c.quadranti.push({ p: v3(), dir: v3(0, 0, 1), su: SU.clone(), raggio: 0.5, chiave: 'radio', locale: { x: x + 0.13, y: piano + 0.21, z: z + 0.143 } });
  } else if (tipo === 'carte') {
    for (let i = 0; i < 3; i++) o(m.carta, scatola(0.3, 0.003, 0.22), x + i * 0.05, piano + 0.002 + i * 0.003, z + i * 0.03, ry + i * 0.3);
  }
}

function banconi(c) {
  const voci1 = [['microscopio', -1.8, 0.05, 0.3], ['beuta', -1.2, 0.2, 0], ['beutaViola', -1.05, 0.05, 0], ['becher', -0.85, 0.25, 0], ['carte', -0.3, 0.15, 0.2], ['lampada', 0.4, -0.25, -0.8], ['radio', 1.4, -0.15, 0], ...[-2.0, -1.6, -1.2, -0.4, 0.0, 0.8, 1.9].map(x => ['vasetto', x, 0, 0])];
  const voci2 = [['radio', -1.5, -0.1, 0], ['beuta', -0.7, 0.2, 0], ['beutaViola', -0.45, 0.15, 0], ['becher', -0.2, 0.3, 0], ['carte', 0.5, 0.1, -0.4], ['microscopio', 1.5, 0.05, -0.3], ...[-1.9, -1.0, 0.2, 0.9, 1.8].map(x => ['vasetto', x, 0, 0])];
  const m1 = matrice(6.0, 0, -7.6, 0);
  const m2 = matrice(-7.3, 0, 7.2, Math.PI);
  for (const [matrix, lungo, voci] of [[m1, 4.8, voci1], [m2, 4.6, voci2]]) {
    const prima = c.quadranti.length;
    bancone(c, matrix, lungo, 1.2, voci);
    for (let i = prima; i < c.quadranti.length; i++) {
      const q = c.quadranti[i];
      if (!q.locale) continue;
      q.p = v3(q.locale.x, q.locale.y, q.locale.z).applyMatrix4(matrix);
      q.dir = v3(0, 0, 1).transformDirection(matrix);
    }
  }
}

function teca(c) {
  const { m, kit } = c;
  const M = matrice(-2.6, 0, 9.4, 0.4);
  const o = officina(c, M);
  o(m.paratia, cilindro(0.72, 0.78, 0.75, 8), 0, 0.375, 0, Math.PI / 8, 0, 0, true);
  o(m.ottone, anello(0.7, 0.03, 8).rotateX(Math.PI / 2), 0, 0.75, 0, Math.PI / 8);
  o(m.ottone, anello(0.77, 0.03, 8).rotateX(Math.PI / 2), 0, 0.04, 0, Math.PI / 8);
  o(m.ottone, tornio([[0.72, 0.75], [0.7, 0.8], [0.64, 0.84], [0.62, 0.9]], 32));
  o(m.vetroLab, cilindro(0.6, 0.6, 1.1, 40, true), 0, 1.43, 0);
  o(m.formalina, cilindro(0.58, 0.58, 1.0, 32), 0, 1.4, 0);
  o(m.ottone, tornio([[0.63, 1.96], [0.66, 2.0], [0.62, 2.08], [0.44, 2.16], [0.12, 2.2], [0, 2.21]], 32));
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    o(m.ottone, cilindro(0.025, 0.025, 1.12, 8), Math.cos(a) * 0.63, 1.43, Math.sin(a) * 0.63);
  }
  o(m.rame, tubo([v3(0.25, 2.12, 0.1), v3(0.5, 2.4, 0.2), v3(0.95, 2.1, 0.3), v3(1.0, 0.0, 0.3)], 0.035, { smusso: 0.25 }));
  o(m.ottone, cilindro(0.04, 0.04, 0.12, 10), 0, 2.26, 0);
  c.volantini.push({ p: v3(0, 2.33, 0).applyMatrix4(M), dir: SU.clone(), raggio: 0.4, chiave: null });
  c.metti(m.insegne, insegna(3, 0.9, 0.11), { matrice: M.clone().multiply(base(v3(1, 0, 0), SU, v3(0, 0, 1), v3(0, 0.55, 0.76))) });
  c.chioda(m.ottone, Array.from({ length: 20 }, (_, i) => {
    const a = (i / 20) * Math.PI * 2;
    return { p: v3(Math.cos(a) * 0.645, 1.99, Math.sin(a) * 0.645).applyMatrix4(M), n: SU };
  }));
  const creatura = new THREE.Mesh(geometriaCreatura(kit), m.creatura);
  creatura.position.set(-2.6, 1.42, 9.4);
  kit.scena.add(creatura);
  kit.luce({ x: -2.6, y: 1.5, z: 9.4, colore: 0x7dffb0, intensita: 3.2, portata: 5, forza: (v, t) => 2.6 + Math.sin(t * 1.7) * 0.8 });
  return creatura;
}

function geometriaCreatura(kit) {
  const parti = [];
  const aggiungi = (g, luce = [0, 0, 0]) => {
    const h = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(h.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) h.deleteAttribute(nome);
    if (!h.attributes.uv) h.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(h.attributes.position.count * 2), 2));
    h.setAttribute('aLuce', new THREE.BufferAttribute(new Float32Array(h.attributes.position.count * 3).map((_, i) => luce[i % 3]), 3));
    parti.push(h);
  };
  const corpo = kit.deforma(fuso(new THREE.SphereGeometry(0.2, 28, 20).scale(0.95, 0.85, 1.3)), { ampiezza: 0.025, frequenza: 9, seme: 5 });
  corpo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(corpo.attributes.position.count * 2), 2));
  aggiungi(corpo);
  aggiungi(kit.deforma(new THREE.SphereGeometry(0.15, 20, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).scale(1.05, 0.7, 1.2).translate(0, -0.05, 0.12), { ampiezza: 0.015, frequenza: 12, seme: 8 }));
  const caso = casuale(31);
  for (let i = 0; i < 16; i++) {
    const a = -1.3 + (2.6 * i) / 15;
    const dente = new THREE.ConeGeometry(0.009, 0.05 + caso() * 0.04, 6).translate(0, 0.025, 0);
    dente.applyMatrix4(matrice(Math.sin(a) * 0.14, -0.06, 0.12 + Math.cos(a) * 0.12, 0, i % 2 ? 0.25 : -0.2));
    aggiungi(dente, [0.12, 0.12, 0.1]);
  }
  aggiungi(new THREE.SphereGeometry(0.15, 6, 4, 0, Math.PI, 0, Math.PI).scale(0.05, 1, 1.5).translate(0, 0.14, -0.15));
  for (const s of [-1, 1]) aggiungi(new THREE.SphereGeometry(0.08, 10, 6).scale(0.12, 0.8, 1.4).translate(s * 0.19, -0.03, -0.02).applyMatrix4(new THREE.Matrix4().makeRotationZ(s * 0.5)));
  aggiungi(new THREE.SphereGeometry(0.12, 10, 6).scale(0.1, 1.2, 0.9).translate(0, 0.0, -0.33));
  const canna = new THREE.CatmullRomCurve3([v3(0, 0.15, 0.05), v3(0, 0.3, 0.12), v3(0, 0.32, 0.3), v3(0, 0.22, 0.4)]);
  aggiungi(new THREE.TubeGeometry(canna, 12, 0.006, 5));
  aggiungi(new THREE.SphereGeometry(0.03, 12, 10).translate(0, 0.2, 0.41), [0.6, 1.4, 1.0]);
  for (let i = 0; i < 10; i++) {
    const s = i % 2 ? 1 : -1;
    const z = -0.2 + (i >> 1) * 0.08;
    aggiungi(new THREE.SphereGeometry(0.011, 6, 4).translate(s * (0.17 - Math.abs(z) * 0.15), -0.04 + (i % 3) * 0.02, z), [0.2, 0.9, 1.0]);
  }
  for (const s of [-1, 1]) aggiungi(new THREE.SphereGeometry(0.022, 10, 8).translate(s * 0.1, 0.07, 0.17), [0.25, 0.5, 0.18]);
  return mergeGeometries(parti);
}

function bancoLavoro(c) {
  const { m } = c;
  const M = matrice(7.5, 0, 4.9);
  const o = officina(c, M);
  o(m.lamieraScura, scatola(2.2, 0.08, 1.0), 0, 0.96, 0, 0, 0, 0, true);
  for (const x of [-1.02, 1.02]) for (const z of [-0.42, 0.42]) o(m.acciaio, scatola(0.08, 0.92, 0.08), x, 0.46, z, 0, 0, 0, true);
  o(m.acciaio, scatola(2.0, 0.03, 0.8), 0, 0.25, 0);
  o(m.paratia, scatola(2.1, 1.05, 0.03), 0, 1.53, -0.47);
  o(m.acciaio, scatola(2.16, 0.06, 0.06), 0, 2.07, -0.47);
  for (let i = 0; i < 6; i++) {
    const x = -0.85 + i * 0.3;
    o(i % 2 ? m.ottone : m.acciaio, scatola(0.035, 0.22 + (i % 3) * 0.05, 0.012), x, 1.6, -0.45);
    o(i % 2 ? m.ottone : m.acciaio, anello(0.03, 0.01, 10), x, 1.73 + (i % 3) * 0.025, -0.45);
  }
  o(m.acciaio, scatola(0.22, 0.14, 0.18), -0.9, 1.07, 0.38);
  o(m.acciaio, scatola(0.22, 0.1, 0.05), -0.9, 1.1, 0.5);
  o(m.acciaio, cilindro(0.015, 0.015, 0.3, 8).rotateZ(Math.PI / 2), -0.9, 1.1, 0.55);
  o(m.acciaio, scatola(0.26, 0.015, 0.035), -0.35, 1.008, 0.2, 0.4);
  o(m.acciaio, anello(0.025, 0.01, 10).rotateX(Math.PI / 2), -0.22, 1.008, 0.25);
  o(m.lamieraScura, cilindro(0.016, 0.016, 0.3, 8).rotateZ(Math.PI / 2), 0.1, 1.016, 0.3, -0.3);
  o(m.acciaio, scatola(0.06, 0.05, 0.11), 0.24, 1.025, 0.22, -0.3);
  o(m.rame, anello(0.09, 0.025, 20).rotateX(Math.PI / 2), 0.6, 1.025, -0.15);
  o(m.rame, anello(0.06, 0.02, 20).rotateX(Math.PI / 2), 0.6, 1.07, -0.15);
  o(m.gomma, cilindro(0.018, 0.018, 0.12, 8).rotateZ(Math.PI / 2), 0.85, 1.02, 0.25, 0.5);
  o(m.acciaio, cilindro(0.006, 0.006, 0.12, 6).rotateZ(Math.PI / 2), 0.96, 1.02, 0.31, 0.5);
  o(m.carta, scatola(0.42, 0.003, 0.3), -0.2, 1.002, -0.18, 0.1);
}

function geometrieScudo(kit) {
  const lastra = [];
  const telai = Array.from({ length: 17 }, (_, i) => {
    const a = -0.55 + (1.1 * i) / 16;
    const rad = v3(Math.sin(a), 0, Math.cos(a));
    return telaio(rad.clone().multiplyScalar(0.75).add(v3(0, 0, -0.75)), v3(Math.cos(a), 0, -Math.sin(a)), rad);
  });
  lastra.push(spazza(rettangolo(-0.03, 0, -0.45, 0.45), telai));
  for (const y of [0.43, -0.43]) lastra.push(spazza(rettangolo(-0.04, 0.014, y - 0.025, y + 0.025), telai));
  lastra.push(new THREE.SphereGeometry(0.11, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2));
  const chiodi = [];
  for (let i = 1; i < 16; i++) for (const y of [0.4, -0.4]) chiodi.push({ p: telai[i].p.clone().add(v3(0, y, 0)).addScaledVector(telai[i].u, 0.002), n: telai[i].u.clone() });
  lastra.push(rivetti(chiodi, 0.014, 0.01));
  const parabola = tornio(Array.from({ length: 9 }, (_, i) => [i * 0.035, i * i * 0.035 * 0.035 * 2.2]), 28).rotateX(Math.PI / 2);
  const emettitore = { ottone: [parabola, rovescia(parabola), cilindro(0.05, 0.06, 0.12, 14).rotateX(Math.PI / 2).translate(0, 0, -0.04)], rame: [], oricalco: [new THREE.SphereGeometry(0.035, 14, 10).translate(0, 0, 0.2)] };
  emettitore.ottone.push(cilindro(0.014, 0.014, 0.2, 8).rotateX(Math.PI / 2).translate(0, 0, 0.1));
  for (let i = 0; i < 3; i++) emettitore.rame.push(anello(0.03, 0.009, 14).translate(0, 0, 0.06 + i * 0.04));
  const cinghie = { gomma: [], acciaio: [] };
  for (const y of [0.18, -0.18]) {
    cinghie.gomma.push(anello(0.24, 0.03, 32).scale(1, 0.35, 0.25).translate(0, y, 0));
    cinghie.acciaio.push(scatola(0.06, 0.05, 0.03).translate(0.22, y, 0.0));
  }
  const unisci = lista => mergeGeometries(lista.map(g => {
    const h = g.index ? g.toNonIndexed() : g.clone();
    for (const nome of Object.keys(h.attributes)) if (!['position', 'normal'].includes(nome)) h.deleteAttribute(nome);
    return kit.uvMetri(h, 2);
  }));
  return [
    { ottone: unisci(lastra) },
    { ottone: unisci(emettitore.ottone), rame: unisci(emettitore.rame), oricalco: unisci(emettitore.oricalco) },
    { gomma: unisci(cinghie.gomma), acciaio: unisci(cinghie.acciaio) },
  ];
}

function scudo(c) {
  const { m, kit } = c;
  const pezzi = geometrieScudo(kit);
  const gruppo = parti => {
    const g = new THREE.Group();
    for (const [nome, geo] of Object.entries(parti)) g.add(new THREE.Mesh(geo, m[nome]));
    return g;
  };
  const posa = [
    new THREE.Matrix4().makeRotationX(-Math.PI / 2).premultiply(new THREE.Matrix4().makeTranslation(0, 0.13, 0)),
    new THREE.Matrix4().makeRotationX(-0.9).premultiply(new THREE.Matrix4().makeTranslation(0, 0.18, 0)),
    new THREE.Matrix4().makeRotationX(-Math.PI / 2).premultiply(new THREE.Matrix4().makeTranslation(0, 0.035, 0)),
  ];
  const sparsi = pezzi.map((parti, i) => {
    const radice = new THREE.Group();
    const corpo = gruppo(parti);
    corpo.applyMatrix4(posa[i]);
    radice.add(corpo);
    const alone = new THREE.Sprite(m.alone.clone());
    alone.scale.setScalar(1.5);
    alone.position.y = 0.35;
    radice.add(alone);
    radice.visible = false;
    kit.scena.add(radice);
    return { radice, alone, posti: PARTI_SCUDO[i].map((p, j) => ({ x: p.x, z: p.z, y: quota(p.x, p.z), ry: i * 2.1 + j * 1.3 })) };
  });
  sparsi.forEach((s, i) => s.posti.forEach((p, j) => kit.luce({
    x: p.x, y: p.y + 0.6, z: p.z, colore: CIANO, intensita: 2.2, portata: 4,
    attiva: v => !!v.abisso && v.abisso.scudo.posti[i] === j && !v.abisso.scudo.prese[i] && !v.abisso.scudo.costruito,
  })));
  const montato = new THREE.Group();
  const lastra = gruppo(pezzi[0]);
  const emettitore = gruppo(pezzi[1]);
  emettitore.position.set(0, 0.04, 0.06);
  emettitore.scale.setScalar(0.85);
  const cinghie = gruppo(pezzi[2]);
  cinghie.position.set(0, 0, -0.16);
  cinghie.scale.set(0.8, 1.4, 1);
  montato.add(lastra, emettitore, cinghie);
  montato.position.set(7.5, 1.47, 4.75);
  montato.rotation.x = -0.32;
  montato.visible = false;
  kit.scena.add(montato);
  return { sparsi, montato };
}

function geometriaEscrescenza(kit, grande) {
  const caso = casuale(grande ? 71 : 37);
  const s = grande ? 1 : 0.5;
  const parti = [];
  const magenta = new THREE.Color(MAGENTA);
  const verde = new THREE.Color(VERDE_NODO);
  const prepara = (g, colore, onda, lungo = 0) => {
    const h = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(h.attributes)) if (!['position', 'normal', 'aOnda'].includes(nome)) h.deleteAttribute(nome);
    const n = h.attributes.position.count;
    if (!h.attributes.aOnda) h.setAttribute('aOnda', new THREE.BufferAttribute(new Float32Array(n).fill(onda), 1));
    const onde = h.attributes.aOnda;
    const col = new Float32Array(n * 3);
    const tinta = new THREE.Color();
    for (let i = 0; i < n; i++) {
      tinta.copy(colore);
      if (lungo) tinta.lerp(verde, Math.min(1, onde.getX(i) / lungo));
      col[i * 3] = tinta.r;
      col[i * 3 + 1] = tinta.g;
      col[i * 3 + 2] = tinta.b;
    }
    h.setAttribute('color', new THREE.BufferAttribute(col, 3));
    parti.push(h);
  };
  prepara(kit.deforma(new THREE.SphereGeometry(0.42 * s, 24, 18).scale(1, 1.15, 0.8).translate(0, 0, 0.3 * s), { ampiezza: 0.1 * s, frequenza: 3.2 / s, seme: 3 }), magenta, 0);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + caso();
    const r = (0.07 + caso() * 0.09) * s;
    prepara(kit.deforma(new THREE.SphereGeometry(r, 12, 10).translate(Math.cos(a) * 0.36 * s, Math.sin(a) * 0.4 * s, (0.35 + caso() * 0.25) * s), { ampiezza: r * 0.25, frequenza: 8 / s, seme: i }), verde, 0.4);
  }
  const quanti = grande ? 8 : 6;
  for (let i = 0; i < quanti; i++) {
    const a = (i / quanti) * Math.PI * 2 + caso() * 0.5;
    const lungo = (1.1 + caso() * 1.0) * s * (grande ? 1 : 1.6);
    const curva = (d, ang, cala) => {
      const x = Math.cos(ang) * d;
      const y = Math.sin(ang) * d - cala;
      return v3(x, y, grande ? 0.04 * s - (x * x + y * y) / 26 + (d < 0.4 ? 0.2 : 0) : 0.05 + Math.sin(d * 4 + i) * 0.12);
    };
    const punti = [curva(0.28 * s, a, 0), curva(lungo * 0.45, a + 0.25, 0.1 * s), curva(lungo * 0.8, a - 0.2, 0.25 * s), curva(lungo, a + 0.1, 0.4 * s)];
    prepara(affusolato(new THREE.CatmullRomCurve3(punti), 0.11 * s, 0.012, 16, 7), magenta, 0, lungo);
  }
  return mergeGeometries(parti);
}

function nodi(c) {
  const { m, kit } = c;
  const fuori = new THREE.InstancedMesh(geometriaEscrescenza(kit, true), m.nodo, NODI.length);
  const terra = new THREE.InstancedMesh(geometriaEscrescenza(kit, false), m.nodo, NODI.length);
  const basi = NODI.map(nodo => {
    const alpha = nodo.zona === 'cupola';
    const centro = alpha ? ALPHA : DELTA;
    const a = Math.atan2(nodo.fuori.z - centro.z, nodo.fuori.x - centro.x);
    if (alpha) {
      const t = tDaY(3.55);
      const z = normaleGuscio(t, a);
      const y = tangenteMeridiano(t, a);
      return { m: base(y.clone().cross(z), y, z, sulGuscio(t, a, 0.06)), luce: sulCerchio(a, 12.2, 3.3), cima: sulGuscio(t, a, 0.5) };
    }
    const rad = radiale(a);
    const p = v3(centro.x + rad.x * 24.5, 2.6, centro.z + rad.z * 24.5);
    return { m: base(SU.clone().cross(rad), SU, rad, p), luce: v3(centro.x + rad.x * 23.2, 3.0, centro.z + rad.z * 23.2), cima: p.clone().addScaledVector(rad, 0.5) };
  });
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  for (let i = 0; i < NODI.length; i++) {
    fuori.setMatrixAt(i, zero);
    terra.setMatrixAt(i, zero);
    const b = basi[i];
    const d = NODI[i].dentro;
    kit.luce({ x: b.luce.x, y: b.luce.y, z: b.luce.z, colore: MAGENTA, intensita: 4.5, portata: 7, attiva: v => !!v.abisso?.protocollo && v.abisso.nodi[i] === 0 });
    kit.luce({ x: d.x, y: quota(d.x, d.z) + 0.5, z: d.z, colore: MAGENTA, intensita: 4, portata: 5, attiva: v => v.abisso?.nodi?.[i] === 1 });
  }
  for (const mesh of [fuori, terra]) {
    mesh.frustumCulled = false;
    kit.scena.add(mesh);
  }
  return { fuori, terra, basi, caduta: NODI.map(() => 0), zero };
}

function tunnel(c) {
  const { m, kit } = c;
  const { y: yc, r } = TUNNEL;
  const th0 = -Math.asin(yc / r);
  const th1 = Math.PI - th0;
  const punto = (x, th, rr = r) => v3(x, yc + Math.sin(th) * rr, Math.cos(th) * rr);
  const fuori = (x, th) => v3(0, Math.sin(th), Math.cos(th));
  const dentro = (x, th) => fuori(x, th).negate();
  const tratti = [[TUNNEL.x0, TUNNEL.porta[0]], [TUNNEL.porta[1], TUNNEL.x1]];
  for (const [x0, x1] of tratti) {
    const n = Math.max(2, Math.round((x1 - x0) / 0.6));
    c.metti(m.vetro, superficie((x, th) => punto(x, th), fuori, x0, x1, th0, th1, n, 36, { scalaUv: [1, r] }), { uv: false });
  }
  const nk = Math.round((TUNNEL.x1 - TUNNEL.x0) / 0.6);
  c.metti(m.lamiera, superficie((x, th) => punto(x, th, r + 0.02), fuori, TUNNEL.x0, TUNNEL.x1, th1, th0 + Math.PI * 2, nk, 14, { scalaUv: [1, r] }), { uv: false });
  c.metti(m.lamieraScura, superficie((x, th) => punto(x, th, r - 0.04), dentro, TUNNEL.x0, TUNNEL.x1, th1, th0 + Math.PI * 2, nk, 14, { scalaUv: [1, r] }), { uv: false });
  const [p0, p1] = TUNNEL.porta;
  c.metti(m.paratia, superficie((x, th) => punto(x, th, r - 0.01), dentro, p0, p1, th0, th1, 2, 30, { scalaUv: [1, r] }), { uv: false });
  const forma = new THREE.Shape([new THREE.Vector2(-2.5, -1.3), new THREE.Vector2(2.5, -1.3), new THREE.Vector2(2.5, 6.8), new THREE.Vector2(-2.5, 6.8)]);
  forma.holes.push(new THREE.Path().absarc(0, yc, r, 0, Math.PI * 2, true));
  const faccia = new THREE.ShapeGeometry(forma, 32);
  c.metti(m.lamieraScura, faccia, { matrice: base(v3(0, 0, 1), SU, v3(-1, 0, 0), v3(p0, 0, 0)) });
  c.metti(m.lamieraScura, faccia, { matrice: base(v3(0, 0, -1), SU, v3(1, 0, 0), v3(p1, 0, 0)) });
  for (const [centro, dim, verso] of [[v3((p0 + p1) / 2, 2.75, 2.5), [p1 - p0, 8.1], v3(0, 0, 1)], [v3((p0 + p1) / 2, 2.75, -2.5), [p1 - p0, 8.1], v3(0, 0, -1)]]) {
    c.metti(m.lamieraScura, new THREE.PlaneGeometry(dim[0], dim[1]), { matrice: base(v3(verso.z, 0, 0), SU, verso, centro) });
  }
  c.metti(m.lamieraScura, new THREE.PlaneGeometry(p1 - p0, 5).rotateX(-Math.PI / 2), { matrice: matrice((p0 + p1) / 2, 6.8, 0) });
  c.chioda(m.acciaio, [...Array.from({ length: 30 }, (_, i) => ({ p: v3(p0 - 0.005, -1.0 + (i % 10) * 0.8, (i < 10 ? -2.3 : i < 20 ? 2.3 : 0)), n: v3(-1, 0, 0) })).filter(q => Math.hypot(q.p.z, q.p.y - yc) > r + 0.1)]);
  const grata = new THREE.PlaneGeometry(TUNNEL.x1 - TUNNEL.x0, 3.92).rotateX(-Math.PI / 2).translate((TUNNEL.x0 + TUNNEL.x1) / 2, 0, 0);
  const uvG = grata.attributes.uv;
  for (let i = 0; i < uvG.count; i++) uvG.setXY(i, grata.attributes.position.getX(i) * 2, grata.attributes.position.getZ(i) * 2);
  c.metti(m.grata, grata, { uv: false });
  for (const x of TUNNEL.anelli) {
    c.metti(m.ottone, anello(r + 0.05, 0.07, 56).rotateY(Math.PI / 2).translate(x, yc, 0));
    c.metti(m.acciaio, cilindro(r + 0.09, r + 0.09, 0.16, 56, true).rotateZ(Math.PI / 2).translate(x, yc, 0));
    c.metti(m.acciaio, rovescia(cilindro(r - 0.08, r - 0.08, 0.12, 56, true).rotateZ(Math.PI / 2).translate(x, yc, 0)));
    for (const z of [-1.5, 1.5]) c.metti(m.ottone, cilindro(0.025, 0.025, 1.0, 8).translate(x, 0.5, z));
  }
  for (const x of TUNNEL.collari) {
    c.metti(m.acciaio, cilindro(r + 0.42, r + 0.42, 0.4, 56, true).rotateZ(Math.PI / 2).translate(x, yc, 0));
    c.metti(m.acciaio, rovescia(cilindro(r - 0.08, r - 0.08, 0.4, 56, true).rotateZ(Math.PI / 2).translate(x, yc, 0)));
    for (const s of [-1, 1]) c.metti(m.acciaio, new THREE.RingGeometry(r - 0.08, r + 0.42, 56).rotateY(s * Math.PI / 2).translate(x + s * 0.2, yc, 0));
    c.chioda(m.acciaio, Array.from({ length: 64 }, (_, i) => {
      const a = (i / 32) * Math.PI * 2;
      const s = i < 32 ? -1 : 1;
      return { p: v3(x + s * 0.2, yc + Math.sin(a) * (r + 0.28), Math.cos(a) * (r + 0.28)), n: v3(s, 0, 0) };
    }));
  }
  for (const z of [-1.5, 1.5]) for (const [x0, x1] of [[13.55, p0 - 0.05], [p1 + 0.05, 23.7]]) c.metti(m.ottone, tubo([v3(x0, 1.0, z), v3(x1, 1.0, z)], 0.03), { uv: false });
  for (const s of [-1, 1]) {
    c.metti(m.rame, tubo([v3(13.4, 0.16, s * 1.72), v3(23.8, 0.16, s * 1.72)], 0.11, { perMetro: 1 }), { uv: false });
    c.metti(m.lamiera, tubo([v3(13.4, 0.42, s * 1.62), v3(23.8, 0.42, s * 1.62)], 0.07, { perMetro: 1 }), { uv: false });
    c.metti(m.lamieraScura, tubo([v3(13.4, -0.7, s * 0.8), v3(23.8, -0.7, s * 0.8)], 0.12, { perMetro: 1 }), { uv: false });
    for (const [x0, x1] of [[13.6, p0 - 0.1], [p1 + 0.1, 23.6]]) c.metti(m.luceFredda, scatola(x1 - x0, 0.012, 0.04).translate((x0 + x1) / 2, 0.006, s * 1.36));
  }
  for (const x of TUNNEL.lampade) {
    c.metti(m.lamieraScura, scatola(0.34, 0.12, 0.34).translate(x, 3.1, 0));
    c.metti(m.lampade, scatola(0.26, 0.02, 0.26).translate(x, 3.035, 0));
    c.metti(m.coni, cono(v3(x, 3.02, 0), v3(0, -1, 0), 3.0, 1.35, new THREE.Color(AMBRA).multiplyScalar(0.1), { inizio: 0.15 }), { uv: false });
    kit.luce({
      x, y: 2.85, z: 0, colore: AMBRA, intensita: 7, portata: 9,
      forza: (v, t) => (protocolloDi(v) ? 2 + 8 * Math.max(0, Math.sin(t * 3.2 + x)) : 7 * (0.94 + 0.06 * Math.sin(t * 11 + x))),
      colorePer: v => (protocolloDi(v) ? ALLARME : AMBRA),
    });
  }
}

function galleria(c) {
  const { m, kit } = c;
  const segmenti = profilo2d => profilo2d.slice(0, -1).map((p, j) => {
    const q = profilo2d[j + 1];
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const lungo = Math.hypot(dx, dy);
    return { a: p, dx: dx / lungo, dy: dy / lungo, lungo, j };
  });
  for (const [profilo2d, verso, materiale, z1, rasoio] of [[PROFILO_GALLERIA, -1, m.paratia, GALLERIA.z0, 0], [PROFILO_ESTERNO, 1, m.lamiera, GALLERIA.zEsterno, 1]]) {
    for (const s of segmenti(profilo2d)) {
      const dentro = v3(-s.dy, s.dx, 0);
      const versoCentro = v3(-s.a[0], 1.4 - s.a[1], 0);
      const n = dentro.dot(versoCentro) * -verso > 0 ? dentro : dentro.clone().negate();
      const punto = (z, l) => v3(s.a[0] + s.dx * l, s.a[1] + s.dy * l, z);
      const buchi = [];
      if (s.j === 0 || s.j === 4) {
        const l0 = (Y_OBLO - LATO_OBLO - s.a[1]) / s.dy;
        const l1 = (Y_OBLO + LATO_OBLO - s.a[1]) / s.dy;
        for (const z of GALLERIA.oblo) buchi.push({ s0: z - LATO_OBLO, s1: z + LATO_OBLO, y0: Math.min(l0, l1), y1: Math.max(l0, l1) });
      }
      c.metti(materiale, pareteConBuchi({ punto, normale: () => n, s0: GALLERIA.zStrappo, s1: z1, y0: 0, y1: s.lungo, buchi, passo: 0.75 }), { uv: false });
      const pezzi = 8;
      for (let i = 0; i < pezzi; i++) {
        const l0 = (s.lungo * i) / pezzi;
        const l1 = (s.lungo * (i + 1)) / pezzi;
        const strappo = l => GALLERIA.zStrappo - 0.15 - 0.55 * (0.5 + 0.5 * Math.sin(l * 5.3 + s.j * 2.1 + rasoio * 1.7) * Math.cos(l * 2.1 + s.j));
        c.metti(materiale, quad(punto(GALLERIA.zStrappo, l0), punto(GALLERIA.zStrappo, l1), punto(strappo(l1), l1), punto(strappo(l0), l0), n));
      }
    }
  }
  for (const z of GALLERIA.oblo) for (const sx of [-1, 1]) {
    const forma = new THREE.Shape([new THREE.Vector2(-LATO_OBLO, -LATO_OBLO), new THREE.Vector2(LATO_OBLO, -LATO_OBLO), new THREE.Vector2(LATO_OBLO, LATO_OBLO), new THREE.Vector2(-LATO_OBLO, LATO_OBLO)]);
    forma.holes.push(new THREE.Path().absarc(0, 0, R_OBLO, 0, Math.PI * 2, true));
    const piastra = new THREE.ShapeGeometry(forma, 16);
    const x = v3(sx, 0, 0);
    c.metti(m.paratia, piastra, { matrice: base(v3(0, 0, sx), SU, x.clone().negate(), v3(sx * 1.45, Y_OBLO, z)) });
    c.metti(m.lamiera, piastra, { matrice: base(v3(0, 0, -sx), SU, x, v3(sx * 1.85, Y_OBLO, z)) });
    c.metti(m.lamieraScura, rovescia(cilindro(R_OBLO, R_OBLO, 0.4, 20, true)), { matrice: orienta(v3(sx * 1.65, Y_OBLO, z), x) });
    for (const xx of [1.42, 1.88]) c.metti(m.ottone, anello(R_OBLO + 0.05, 0.05, 28), { matrice: orienta(v3(sx * xx, Y_OBLO, z), x, 1, v3(0, 0, 1)) });
    c.metti(m.vetro, new THREE.CircleGeometry(R_OBLO, 24), { matrice: orienta(v3(sx * 1.65, Y_OBLO, z), x, 1, v3(0, 0, 1)) });
  }
  const lungo = GALLERIA.z0 - GALLERIA.zStrappo - 0.4;
  const grata = new THREE.PlaneGeometry(2.9, lungo).rotateX(-Math.PI / 2).translate(0, 0, GALLERIA.z0 - lungo / 2);
  const uvG = grata.attributes.uv;
  for (let i = 0; i < uvG.count; i++) uvG.setXY(i, grata.attributes.position.getX(i) * 2, grata.attributes.position.getZ(i) * 2);
  c.metti(m.grata, grata, { uv: false });
  c.metti(m.lamieraScura, new THREE.PlaneGeometry(2.9, lungo + 0.2).rotateX(-Math.PI / 2).translate(0, -0.6, GALLERIA.z0 - lungo / 2 - 0.1));
  c.metti(m.lamieraScura, quad(v3(-1.45, -0.6, -22.1), v3(1.45, -0.6, -22.1), v3(1.45, 0, -22.1), v3(-1.45, 0, -22.1), v3(0, 0, 1)));
  for (const [x, y, rr, mat] of [[-0.7, -0.35, 0.12, m.rame], [0.7, -0.35, 0.12, m.rame], [0, -0.45, 0.09, m.lamiera]]) c.metti(mat, tubo([v3(x, y, -12.9), v3(x, y, -22.0)], rr, { perMetro: 1 }), { uv: false });
  for (const z of GALLERIA.telai) {
    for (const [profilo2d, spinta, mat] of [[PROFILO_GALLERIA, -0.05, m.acciaio], [PROFILO_ESTERNO, 0.08, m.lamieraScura]]) {
      for (const s of segmenti(profilo2d)) {
        const zero = Math.abs(s.dy) > 1e-6 ? -s.a[1] / s.dy : -1;
        const l0 = s.dy > 1e-6 ? Math.max(0, zero) : 0;
        const l1 = s.dy < -1e-6 ? Math.min(s.lungo, zero) : s.a[1] >= 0 || s.dy > 1e-6 ? s.lungo : 0;
        if (l1 - l0 < 0.05) continue;
        const centroL = (l0 + l1) / 2;
        const n2 = v3(-s.dy, s.dx, 0);
        const dentro = n2.dot(v3(-s.a[0], 1.4 - s.a[1], 0)) > 0 ? n2 : n2.clone().negate();
        const pc = v3(s.a[0] + s.dx * centroL, s.a[1] + s.dy * centroL, z).addScaledVector(dentro, spinta < 0 ? 0.05 : -0.08);
        c.metti(mat, scatola(l1 - l0 + 0.1, 0.1, 0.16), { matrice: matrice(pc.x, pc.y, pc.z, 0, 0, Math.atan2(s.dy, s.dx)) });
      }
    }
  }
  for (const [pts, rr, mat] of [
    [[v3(-1.22, 2.95, -12.9), v3(-1.22, 2.95, -21.75), v3(-1.1, 2.4, -22.15)], 0.07, m.rame],
    [[v3(-1.02, 3.18, -12.9), v3(-1.02, 3.18, -21.9)], 0.05, m.lamiera],
    [[v3(1.25, 2.8, -12.9), v3(1.25, 2.8, -21.8)], 0.06, m.lamieraScura],
  ]) c.metti(mat, tubo(pts, rr, { smusso: 0.3, perMetro: 1 }), { uv: false });
  c.metti(m.acciaio, scatola(0.24, 0.02, 9).translate(1.05, 3.02, -17.35));
  for (let i = 0; i < 3; i++) c.metti(m.gomma, tubo([v3(0.97 + i * 0.06, 3.05, -12.9), v3(0.97 + i * 0.06, 3.05, -21.8), v3(0.9 + i * 0.1, 2.2 - i * 0.3, -22.3)], 0.022, { radiali: 5, perMetro: 1 }), { uv: false });
  for (const z of GALLERIA.lampade) {
    c.metti(m.lamieraScura, scatola(0.3, 0.08, 0.5).translate(0, 3.36, z));
    c.metti(m.lampade, cilindro(0.1, 0.1, 0.36, 14).rotateX(Math.PI / 2).translate(0, 3.22, z));
    for (let i = 0; i < 5; i++) c.metti(m.acciaio, anello(0.13, 0.008, 12).translate(0, 3.22, z - 0.16 + i * 0.08));
    c.metti(m.coni, cono(v3(0, 3.12, z), v3(0, -1, 0), 3.0, 1.3, new THREE.Color(AMBRA).multiplyScalar(0.11), { inizio: 0.15 }), { uv: false });
    kit.luce({
      x: 0, y: 3.0, z, colore: AMBRA, intensita: 7, portata: 9,
      forza: (v, t) => (protocolloDi(v) ? 2 + 8 * Math.max(0, Math.sin(t * 3.2 + z)) : 7 * (0.94 + 0.06 * Math.sin(t * 13 + z))),
      colorePer: v => (protocolloDi(v) ? ALLARME : AMBRA),
    });
  }
  c.metti(m.lamieraScura, scatola(4.1, 3.3, 0.8).translate(0, 5.4, -14.6));
  c.chioda(m.acciaio, Array.from({ length: 22 }, (_, i) => ({ p: v3(-1.9 + (i % 11) * 0.38, i < 11 ? 4.0 : 6.9, -14.19), n: v3(0, 0, 1) })));
  const rumore = kit.rumore;
  const roccia = griglia((zz, th) => {
    const ex = Math.cos(th) * 2.05;
    const ey = 1.15 + Math.sin(th) * 2.25;
    const d = 1 + 0.06 + 0.1 * rumore.fbm(ex * 0.8, ey * 0.8, zz * 0.8, 4) + 0.05 * rumore.fbm(ex * 3, ey * 3, zz * 3, 2);
    return v3(ex * d, 1.15 + (ey - 1.15) * d, zz);
  }, -21.4, GALLERIA.z1, -0.58, Math.PI + 0.58, 16, 30, (zz, th) => v3(-Math.cos(th), -Math.sin(th), 0));
  c.metti(m.roccia, roccia);
  c.metti(m.roccia, griglia((x, zz) => v3(x, 0.012 * (1 + rumore.fbm(x * 4, 0, zz * 4, 2)), zz), -1.9, 1.9, -22.0, GALLERIA.z1, 8, 12, () => SU));
  for (const [x, y, z, r] of [[-1.75, 3.0, -21.7, 0.9], [1.85, 2.7, -21.3, 0.8], [1.35, 3.55, -22.6, 0.75], [-1.5, 3.4, -24.4, 0.7]]) {
    c.metti(m.roccia, kit.deforma(fuso(new THREE.IcosahedronGeometry(r, 3)), { ampiezza: r * 0.35, frequenza: 1.6 / r, seme: x * 3 + z }), { matrice: matrice(x, y, z) });
  }
  for (const [x, z, ry] of [[-0.4, -22.5, 0.3], [0.6, -23.1, -0.5]]) {
    const pezzo = new THREE.PlaneGeometry(1.1, 0.7).rotateX(-Math.PI / 2);
    const uvP = pezzo.attributes.uv;
    for (let i = 0; i < uvP.count; i++) uvP.setXY(i, pezzo.attributes.position.getX(i) * 2, pezzo.attributes.position.getZ(i) * 2);
    c.metti(m.grata, pezzo, { uv: false, matrice: matrice(x, 0.08, z, ry, 0.12, 0.08) });
  }
  const filo = [v3(0.3, 3.45, -23.5), v3(0.25, 3.0, -23.55), v3(0.15, 2.55, -23.7)];
  c.metti(m.gomma, tubo(new THREE.CatmullRomCurve3(filo), 0.015, { radiali: 4 }), { uv: false });
  const dir = v3(0.25, -1, -0.15).normalize();
  c.metti(m.lamieraScura, cilindro(0.1, 0.12, 0.16, 14), { matrice: orienta(v3(0.15, 2.48, -23.7), dir) });
  c.metti(m.lampade, new THREE.SphereGeometry(0.09, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), { matrice: orienta(v3(0.15 + dir.x * 0.08, 2.48 + dir.y * 0.08, -23.7 + dir.z * 0.08), dir) });
  c.metti(m.coni, cono(v3(0.15, 2.38, -23.72), dir, 2.6, 1.0, new THREE.Color(AMBRA).multiplyScalar(0.12), { inizio: 0.1 }), { uv: false });
  kit.luce({
    x: 0.15, y: 2.3, z: -23.75, colore: AMBRA, intensita: 5, portata: 7,
    forza: (v, t) => (Math.sin(t * 13.1) + Math.sin(t * 7.3) + Math.sin(t * 2.1) > 1.6 ? 0.4 : protocolloDi(v) ? 3 + 4 * Math.max(0, Math.sin(t * 3.2)) : 5),
    colorePer: v => (protocolloDi(v) ? ALLARME : AMBRA),
  });
}

export function creaCupola(kit) {
  const m = materiali(kit);
  const metti = (materiale, g, { uv = true, matrice: matrix = null, ombra = false, settore = 'alpha' } = {}) => kit.lotto(materiale, settore).aggiungi(uv ? kit.uvMetri(g, 1) : g, matrix, { ombra });
  const chiodi = new Map();
  const c = {
    kit, m, metti, quadranti: [], volantini: [], oblo: [],
    chioda(materiale, lista) {
      if (!chiodi.has(materiale)) chiodi.set(materiale, []);
      chiodi.get(materiale).push(...lista);
    },
  };
  pareteBaie(c);
  guscio(c);
  pavimento(c);
  periscopio(c);
  lampadeEmergenza(c);
  tubature(c);
  valvole(c);
  const motore = turbina(c);
  banconi(c);
  const creatura = teca(c);
  bancoLavoro(c);
  tunnel(c);
  galleria(c);
  for (const [materiale, lista] of chiodi) metti(materiale, rivetti(lista), { uv: false });
  const quadri = strumenti(c);
  const pezzi = scudo(c);
  const parassiti = nodi(c);
  const stato = { valvole: VALVOLE.map(() => ({ giro: 0, spinta: 0, vapore: 0, lampo: 0, errore: 0, rosso: 0, sbuffo: 0 })), aghi: c.quadranti.map(() => AGO_MINIMO) };
  const dialValvola = VALVOLE.map((_, i) => c.quadranti.findIndex(q => q.chiave === i));
  const colore = new THREE.Color();
  const corpoValvola = i => {
    const v = VALVOLE[i];
    const a = Math.atan2(v.z, v.x);
    return { corpo: sulCerchio(a, 12.6, 1.3), quadrante: sulCerchio(a, 12.5, 1.95), dentro: radiale(a).negate() };
  };

  kit.suEvento(e => {
    if (e.k === 'valvola' && stato.valvole[e.indice]) {
      const s = stato.valvole[e.indice];
      const { quadrante } = corpoValvola(e.indice);
      if (e.giusta) {
        s.spinta = 1;
        s.lampo = 1;
        kit.effetti?.esplosione?.(quadrante, 'energia', VERDE);
      } else {
        s.errore = 1.4;
        s.rosso = 1;
      }
    } else if (e.k === 'valvoleScadute') {
      for (const s of stato.valvole) s.rosso = 1;
    } else if (e.k === 'nodoCaduto' && parassiti.basi[e.indice]) {
      const cima = parassiti.basi[e.indice].cima;
      kit.effetti?.risucchio?.(cima, 2.6, 12);
      kit.effetti?.esplosione?.(cima, 'energia', MAGENTA);
      parassiti.caduta[e.indice] = 1;
    } else if (e.k === 'nodoRaccolto' && NODI[e.indice]) {
      const d = NODI[e.indice].dentro;
      kit.effetti?.risucchio?.(v3(d.x, quota(d.x, d.z) + 0.4, d.z), 1.2, 8);
    } else if (e.k === 'turbina' && e.indice === 0 && e.accesa) {
      kit.effetti?.scarica?.(v3(-7.42, 2.15, -3.55));
    } else if (e.k === 'parteScudo' && pezzi.sparsi[e.indice]) {
      const r = pezzi.sparsi[e.indice].radice.position;
      kit.effetti?.esplosione?.(v3(r.x, r.y + 0.3, r.z), 'energia', CIANO);
    } else if (e.k === 'scudoCostruito') {
      kit.effetti?.esplosione?.(v3(7.5, 1.4, 4.9), 'energia', CIANO);
    }
  });

  const matriceNodo = new THREE.Matrix4();
  kit.ogniFotogramma((vista, dt, tempo) => {
    const ab = vista.abisso;
    const protocollo = protocolloDi(vista);
    const battito = 0.5 + 0.5 * Math.sin(tempo * 3.2);
    m.lampade.emissive.setHex(protocollo ? ALLARME : AMBRA);
    m.lampade.emissiveIntensity = protocollo ? 0.8 + 4 * battito : 3.2 * (0.94 + 0.06 * Math.sin(tempo * 9));
    m.lampadario.emissive.setHex(protocollo ? ALLARME : 0xbfeeff);
    m.lampadario.emissiveIntensity = protocollo ? 1 + 3 * battito : vista.corrente ? 3.2 : 1.6;
    m.coni.uniforms.uAllarme.value = protocollo ? 1 : 0;
    m.coni.uniforms.uForza.value = protocollo ? 0.4 + 1.2 * battito : 1;

    const turbinaStato = ab?.turbine?.[0] ?? 0;
    const giri = turbinaStato >= 1 ? 9 : turbinaStato > 0 ? 9 * turbinaStato * turbinaStato : 0;
    motore.angolo += giri * dt;
    motore.rotore.rotation.z = motore.angolo + (turbinaStato > 0 && turbinaStato < 1 ? Math.sin(tempo * 40) * 0.02 : 0);
    m.spia.emissive.setHex(turbinaStato >= 1 ? VERDE : ALLARME);
    m.spia.emissiveIntensity = turbinaStato >= 1 ? 4 : turbinaStato > 0 ? (Math.sin(tempo * 10) > 0 ? 5 : 0.4) : 2;
    m.cuoreTurbina.emissiveIntensity = turbinaStato * (2.2 + 0.4 * Math.sin(tempo * 7));

    const ordine = ab?.valvole?.ordine ?? [];
    const premute = ab?.valvole?.premute ?? 0;
    const girate = new Set(ordine.slice(0, premute));
    const ciclo = LAMPO_INDIZIO * ordine.length + PAUSA_INDIZIO;
    const fase = ordine.length ? tempo % ciclo : ciclo;
    const turno = Math.floor(fase / LAMPO_INDIZIO);
    const illuminata = turno < ordine.length ? ordine[turno] : -1;
    const dentroLampo = Math.sin(Math.PI * ((fase % LAMPO_INDIZIO) / LAMPO_INDIZIO));
    stato.valvole.forEach((s, i) => {
      const { corpo, dentro } = corpoValvola(i);
      s.spinta = Math.max(0, s.spinta - dt * 0.9);
      s.lampo = Math.max(0, s.lampo - dt * 1.6);
      s.rosso = Math.max(0, s.rosso - dt * 1.2);
      s.giro += dt * (s.spinta * 9 + (s.errore > 0 ? Math.sin(tempo * 40) * 3 : 0));
      if (s.errore > 0) {
        s.errore -= dt;
        s.sbuffo -= dt;
        if (s.sbuffo <= 0) {
          s.sbuffo = 0.05;
          kit.effetti?.brina?.(corpo, dentro.clone().multiplyScalar(0.6).add(v3(0, 0.8, 0)).normalize());
        }
      }
      let bersaglio = AGO_MINIMO;
      if (protocollo) {
        colore.setHex(ALLARME).multiplyScalar(0.9 + 0.8 * battito);
        bersaglio = 1.9 + Math.sin(tempo * 31 + i) * 0.12;
      } else if (girate.has(i)) {
        colore.setHex(VERDE).multiplyScalar(1.2);
        bersaglio = 0.4;
      } else if (vista.corrente && illuminata === i) {
        colore.setRGB(1.9, 1.35, 0.7).multiplyScalar(Math.sqrt(Math.max(0, dentroLampo)));
        bersaglio = -0.8 + 2.3 * dentroLampo;
      } else if (vista.corrente) {
        colore.setRGB(0.07, 0.05, 0.03);
        bersaglio = -1.4;
      } else colore.setRGB(0, 0, 0);
      colore.r += s.rosso * 2.4;
      colore.g += s.lampo * 3;
      colore.b += s.lampo * 0.8;
      const q = dialValvola[i];
      quadri.accesa(q, colore.r, colore.g, colore.b);
      stato.aghi[q] += (bersaglio - stato.aghi[q]) * Math.min(1, dt * 6);
      quadri.ago(q, stato.aghi[q]);
    });
    c.quadranti.forEach((q, i) => {
      if (typeof q.chiave === 'number') return;
      const acceso = q.chiave === 'turbina' ? turbinaStato : vista.corrente ? 1 : 0;
      quadri.accesa(i, 0.5 * acceso, 0.32 * acceso, 0.14 * acceso);
      const bersaglio = acceso ? 0.3 + Math.sin(tempo * 1.3 + i * 2) * 0.25 + Math.sin(tempo * 17 + i) * 0.03 : AGO_MINIMO;
      stato.aghi[i] += (bersaglio - stato.aghi[i]) * Math.min(1, dt * 3);
      quadri.ago(i, stato.aghi[i]);
    });
    c.volantini.forEach((w, i) => {
      if (typeof w.chiave === 'number') quadri.ruota(i, stato.valvole[w.chiave].giro);
    });
    quadri.aggiorna();

    creatura.position.y = 1.42 + Math.sin(tempo * 0.6) * 0.04;
    creatura.rotation.y = 0.4 + Math.sin(tempo * 0.21) * 0.7;
    creatura.rotation.z = Math.sin(tempo * 0.37) * 0.06;

    const scudoAb = ab?.scudo;
    pezzi.sparsi.forEach((s, i) => {
      const j = scudoAb?.posti?.[i] ?? -1;
      const visibile = !!scudoAb && !scudoAb.prese[i] && !scudoAb.costruito && j >= 0;
      s.radice.visible = visibile;
      if (!visibile) return;
      const p = s.posti[j];
      s.radice.position.set(p.x, p.y, p.z);
      s.radice.rotation.y = p.ry;
      s.alone.material.opacity = 0.32 + 0.22 * Math.sin(tempo * 2.4 + i);
    });
    pezzi.montato.visible = !!scudoAb?.costruito;

    parassiti.basi.forEach((b, i) => {
      const stadio = ab?.nodi?.[i] ?? 0;
      parassiti.caduta[i] = Math.max(0, parassiti.caduta[i] - dt * 1.6);
      const cresce = !!ab?.protocollo && stadio === 0;
      const svanisce = parassiti.caduta[i] > 0;
      if (cresce || svanisce) {
        const s = cresce ? 1 + Math.sin(tempo * 2.1 + i) * 0.03 : parassiti.caduta[i];
        parassiti.fuori.setMatrixAt(i, matriceNodo.copy(b.m).multiply(new THREE.Matrix4().makeScale(s, s, s)));
      } else parassiti.fuori.setMatrixAt(i, parassiti.zero);
      if (stadio === 1) {
        const d = NODI[i].dentro;
        const y = quota(d.x, d.z) + 0.16 + Math.sin(tempo * 1.8 + i) * 0.03;
        const giro = tempo * 0.4 + i;
        parassiti.terra.setMatrixAt(i, matriceNodo.copy(base(v3(Math.cos(giro), 0, Math.sin(giro)), v3(Math.sin(giro), 0, -Math.cos(giro)), SU, v3(d.x, y, d.z))));
      } else parassiti.terra.setMatrixAt(i, parassiti.zero);
    });
    parassiti.fuori.instanceMatrix.needsUpdate = true;
    parassiti.terra.instanceMatrix.needsUpdate = true;
  });
}
