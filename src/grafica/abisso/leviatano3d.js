import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DELTA, quotaDelta } from '../../mappe/abisso.js';
import { A } from '../../abisso/costanti.js';
import { creaRumore } from './rumore.js';
import { conCaustiche, uvMetri } from './kit.js';

const LUNGO = 46;
const OSSA = 26;
const PASSO = LUNGO / (OSSA - 1);
const LUNGO_TENTACOLO = 24;
const OSSA_TENTACOLO = 20;
const PASSO_TENTACOLO = LUNGO_TENTACOLO / (OSSA_TENTACOLO - 1);
const TENTACOLI = 4;
const RAGGIO_NUOTO = 34.5;
const QUOTA_NUOTO = 6;
const TUFFO = 1.7;
const SOMMERSO = 18.5;
const CERNIERA = Object.freeze({ y: -0.12, z: -0.35 });
const CENTRO_TESTA = Object.freeze({ x: 0, y: 0.45, z: 2.3 });
const BOCCA = Object.freeze({ x: 0, y: -0.15, z: 4.4 });
const CUORE = Object.freeze({ x: 0, y: -0.38, z: -0.05 });
const CUPOLA = Object.freeze({ y: -3.72, raggio: 25.72, spicchio: Math.PI / 12, fasce: Object.freeze([0.1, 0.35, 0.7, 1.0, 1.2]) });
const PANNELLI_CREPATI = Object.freeze([[2, 1], [5, 2], [9, 1], [13, 2], [16, 0], [20, 2], [22, 3], [7, 3]]);
const COLORE_CIANO = new THREE.Color(0x5ff2ff);
const COLORE_ARANCIO = new THREE.Color(0xff9a3a);
const COLORE_ACIDO = new THREE.Color(0x8dff3a);
const COLORE_SCHIUMA = new THREE.Color(0xd8f4ff);
const COLORE_ACQUA = new THREE.Color(0x9fd8e8);
const SU = new THREE.Vector3(0, 1, 0);
const vuotoMixer = () => ({ timeScale: 1, update() {}, stopAllAction() {}, uncacheRoot() {} });

const v3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const limita = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const liscio = (a, b, x) => {
  const t = limita((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;
const avvicina = (a, b, k) => a + (b - a) * Math.min(1, k);
const angoloVerso = (a, b, k) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * Math.min(1, k);
const polare = (a, r, y) => v3(DELTA.x + Math.cos(a) * r, y, DELTA.z + Math.sin(a) * r);
const quotaAnello = r => quotaDelta(DELTA.x + r, DELTA.z);
const livelloVasca = lev => Math.max(DELTA.acqua, DELTA.fondo + (DELTA.marea - DELTA.fondo) * (lev?.marea ?? 0));

function tabella(punti, t) {
  if (t <= punti[0][0]) return punti[0][1];
  for (let i = 1; i < punti.length; i++) {
    if (t <= punti[i][0]) {
      const [t0, a] = punti[i - 1];
      const [t1, b] = punti[i];
      const f = (t - t0) / (t1 - t0);
      return mix(a, b, f * f * (3 - 2 * f));
    }
  }
  return punti[punti.length - 1][1];
}

function generatore(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tela(l, a, pittore) {
  const c = document.createElement('canvas');
  c.width = l;
  c.height = a;
  pittore(c.getContext('2d'), l, a);
  return c;
}

function texturaTela(c, { srgb = true, ripeti = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function lampoRamificato(ctx, x, y, angolo, passi, passo, caso, rami) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < passi; i++) {
    angolo += (caso() - 0.5) * 1.1;
    x += Math.cos(angolo) * passo;
    y += Math.sin(angolo) * passo;
    ctx.lineTo(x, y);
    if (rami > 0 && caso() < 0.16) {
      ctx.stroke();
      const larghezza = ctx.lineWidth;
      ctx.lineWidth = larghezza * 0.6;
      lampoRamificato(ctx, x, y, angolo + (caso() < 0.5 ? 0.9 : -0.9), Math.floor(passi * 0.5), passo * 0.8, caso, rami - 1);
      ctx.lineWidth = larghezza;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }
  ctx.stroke();
}

function texturaLuciCorpo() {
  const caso = generatore(71);
  return texturaTela(tela(512, 2048, (ctx, l, a) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, a);
    const y = s => (1 - s / LUNGO) * a;
    const x = th => ((th + Math.PI) / (Math.PI * 2)) * l;
    ctx.globalCompositeOperation = 'lighter';
    for (const lato of [-1, 1]) {
      for (const [th, passo, raggio, colore] of [[1.62, 0.55, 5, '#5ff2ff'], [2.05, 0.8, 3.6, '#41b8ff'], [0.95, 1.1, 3, '#ffb35a']]) {
        for (let s = 1.2; s < 34; s += passo) {
          const px = x(lato * (th + Math.sin(s * 0.7) * 0.05));
          const py = y(s);
          const g = ctx.createRadialGradient(px, py, 0, px, py, raggio * 3.2);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(0.22, colore);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fillRect(px - raggio * 3.2, py - raggio * 3.2, raggio * 6.4, raggio * 6.4);
        }
      }
    }
    ctx.strokeStyle = 'rgba(80, 220, 255, 0.85)';
    ctx.lineWidth = 2;
    for (let s = 1; s < 30; s += 1.45) {
      ctx.beginPath();
      ctx.moveTo(x(-0.42), y(s));
      ctx.lineTo(x(-0.18), y(s + 0.6));
      ctx.moveTo(x(0.42), y(s));
      ctx.lineTo(x(0.18), y(s + 0.6));
      ctx.stroke();
    }
    ctx.shadowColor = '#7ff0ff';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#d8fbff';
    for (const [s, th] of [[4.5, 1.3], [7.5, -1.7], [12.5, -1.1], [15.5, 0.9], [19, 2.2], [9.5, 2.5], [23, -2.0], [2.6, -0.8]]) {
      ctx.lineWidth = 3;
      for (let k = 0; k < 4; k++) lampoRamificato(ctx, x(th), y(s), caso() * Math.PI * 2, 12, 9, caso, 2);
    }
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, a - 24, 24, 24);
  }));
}

function texturaLuciTesta() {
  const caso = generatore(72);
  return texturaTela(tela(256, 512, (ctx, l, a) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, a);
    const px = xx => (0.5 + xx / 4.6) * l;
    const py = zz => (1 - (zz + 1.5) / 7) * a;
    ctx.globalCompositeOperation = 'lighter';
    for (const s of [-1, 1]) {
      for (let zz = -0.6; zz < 4.6; zz += 0.32) {
        const w = 1.78 - Math.max(0, zz - 1) * 0.2;
        for (const [k, colore, r] of [[0, '#5ff2ff', 4], [-0.32, '#ffae4a', 2.6]]) {
          const cx = px(s * (w + k));
          const cy = py(zz);
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.6);
          g.addColorStop(0, '#fff');
          g.addColorStop(0.3, colore);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6);
        }
      }
    }
    ctx.shadowColor = '#7ff0ff';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = '#d8fbff';
    ctx.lineWidth = 2.4;
    for (const [xx, zz] of [[0.4, 1.4], [-0.9, 0.6], [0.2, 3.4], [-0.3, 2.2]]) for (let k = 0; k < 3; k++) lampoRamificato(ctx, px(xx), py(zz), caso() * 6.28, 9, 7, caso, 2);
  }));
}

function texturaTentacolo() {
  return texturaTela(tela(64, 1024, (ctx, l, a) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, a);
    ctx.globalCompositeOperation = 'lighter';
    for (let y = 8; y < a; y += 22) {
      const g = ctx.createLinearGradient(0, 0, l, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(0.5, y > a * 0.6 ? 'rgba(255,150,80,0.9)' : 'rgba(80,230,255,0.75)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, y, l, 3);
    }
    const g = ctx.createLinearGradient(0, 0, 0, a);
    g.addColorStop(0, 'rgba(120,240,255,0.0)');
    g.addColorStop(0.85, 'rgba(120,240,255,0.15)');
    g.addColorStop(1, 'rgba(180,250,255,0.9)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  }));
}

function texturaOcchio() {
  return texturaTela(tela(256, 128, (ctx, l, a) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, a);
    const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 60);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.25, '#f8f8f8');
    g.addColorStop(0.7, '#9a9a9a');
    g.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(64, 64, 5, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
      const ang = (i / 40) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(64 + Math.cos(ang) * 14, 64 + Math.sin(ang) * 14);
      ctx.lineTo(64 + Math.cos(ang) * 56, 64 + Math.sin(ang) * 56);
      ctx.stroke();
    }
  }));
}

function texturaGola() {
  return texturaTela(tela(256, 32, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, l, 0);
    g.addColorStop(0, '#000000');
    g.addColorStop(0.45, '#3a0804');
    g.addColorStop(0.8, '#ff5a14');
    g.addColorStop(1, '#ffd08a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  }));
}

function texturaMorbida() {
  return texturaTela(tela(64, 64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }));
}

function texturaPericolo() {
  return texturaTela(tela(256, 128, (ctx, l, a) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#ffffff';
    for (let x = -a; x < l + a; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 28, 0);
      ctx.lineTo(x + 28 + a / 2, a / 2);
      ctx.lineTo(x + 28, a);
      ctx.lineTo(x, a);
      ctx.lineTo(x + a / 2, a / 2);
      ctx.closePath();
      ctx.globalAlpha = 0.55;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const g = ctx.createLinearGradient(0, 0, 0, a);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.08, 'rgba(255,255,255,0)');
    g.addColorStop(0.92, 'rgba(255,255,255,0)');
    g.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  }), { srgb: true, ripeti: true });
}

function texturaAcido() {
  const caso = generatore(91);
  return texturaTela(tela(256, 256, (ctx, l) => {
    const fondo = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    fondo.addColorStop(0, 'rgba(160,255,90,0.95)');
    fondo.addColorStop(0.65, 'rgba(90,220,40,0.7)');
    fondo.addColorStop(0.9, 'rgba(40,120,10,0.35)');
    fondo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, l, l);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 60; i++) {
      const a = caso() * Math.PI * 2;
      const r = Math.sqrt(caso()) * l * 0.4;
      const x = l / 2 + Math.cos(a) * r;
      const y = l / 2 + Math.sin(a) * r;
      const rr = 3 + caso() * 12;
      ctx.strokeStyle = `rgba(220,255,170,${0.4 + caso() * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, rr, 0, Math.PI * 2);
      ctx.stroke();
    }
  }));
}

function texturaAnello() {
  return texturaTela(tela(128, 128, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.15)');
    g.addColorStop(0.7, 'rgba(255,255,255,0.25)');
    g.addColorStop(0.86, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }));
}

function texturaCuore() {
  const caso = generatore(93);
  return texturaTela(tela(256, 256, (ctx, l) => {
    ctx.fillStyle = '#7fe8ff';
    ctx.fillRect(0, 0, l, l);
    ctx.strokeStyle = '#fff6c8';
    ctx.lineWidth = 3;
    for (let i = 0; i < 18; i++) lampoRamificato(ctx, caso() * l, caso() * l, caso() * 6.28, 10, 9, caso, 1);
  }));
}

function raggioCorpo(s) {
  if (s < 0) return 1.72 * Math.sqrt(Math.max(0, 1 - (s / 1.3) ** 2));
  return (1.72 + 0.32 * liscio(0, 9, s) + 0.45 * liscio(9, 20, s)) * (1 - liscio(24, LUNGO, s) * 0.86);
}

function scultura(rumore) {
  return (s, th, cx, cy, cz) => {
    const dorso = Math.cos(th);
    const colonna = Math.floor((th + Math.PI) / 0.5);
    const fc = (th + Math.PI) / 0.5 - colonna;
    const fp = s / 1.45 + (colonna % 2) * 0.5 - Math.floor(s / 1.45 + (colonna % 2) * 0.5);
    const solchi = Math.exp(-(fc * fc) / 0.004) + Math.exp(-((1 - fc) ** 2) / 0.004);
    const piastre = liscio(-0.55, -0.25, dorso) * (0.085 * fp ** 1.7 - 0.03 * solchi);
    const fs = s / 0.55 - Math.floor(s / 0.55);
    const scuti = liscio(-0.45, -0.75, dorso) * 0.04 * fs * fs;
    const cresta = 0.17 * Math.exp(-(th * th) / 0.025);
    const f1 = rumore.fbm(cx * 0.42, cy * 0.42, cz * 0.42, 4);
    const f2 = rumore.fbm(cx * 1.9 + 7, cy * 1.9, cz * 1.9, 3);
    const macchia = liscio(0.12, 0.42, rumore.fbm(cx * 0.16 + 3, cy * 0.16, cz * 0.16, 2));
    const [d1] = rumore.cellule(cx * 1.8, cy * 1.8, cz * 1.8);
    const cirr = macchia * Math.max(0, 0.3 - d1) * 0.55;
    return { spinta: piastre + scuti + cresta + f1 * 0.08 + f2 * 0.022 + cirr, dorso, fp, macchia, cirr, f1 };
  };
}

function pesiOssa(g, passo, ossa, lungoDi = p => -p) {
  const p = g.attributes.position;
  const indici = new Uint16Array(p.count * 4);
  const pesi = new Float32Array(p.count * 4);
  for (let i = 0; i < p.count; i++) {
    const s = limita(lungoDi(p.getY(i)), 0, (ossa - 1) * passo - 1e-4);
    const f = s / passo;
    const k = Math.floor(f);
    const w = f - k;
    indici[i * 4] = k;
    indici[i * 4 + 1] = Math.min(ossa - 1, k + 1);
    pesi[i * 4] = 1 - w;
    pesi[i * 4 + 1] = w;
  }
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(indici, 4));
  g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(pesi, 4));
  return g;
}

function griglia(nu, nv, fn) {
  const pos = new Float32Array((nu + 1) * (nv + 1) * 3);
  const uv = new Float32Array((nu + 1) * (nv + 1) * 2);
  const p = v3();
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      const k = j * (nu + 1) + i;
      fn(i / nu, j / nv, p);
      pos[k * 3] = p.x;
      pos[k * 3 + 1] = p.y;
      pos[k * 3 + 2] = p.z;
      uv[k * 2] = i / nu;
      uv[k * 2 + 1] = j / nv;
    }
  }
  const indici = [];
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i;
      indici.push(a, a + 1, a + nu + 1, a + 1, a + nu + 2, a + nu + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

function uniformaAttributi(lista, colore) {
  return lista.map(g => {
    const q = g.index ? g.toNonIndexed() : g;
    const n = q.attributes.position.count;
    if (!q.attributes.normal) q.computeVertexNormals();
    if (!q.attributes.uv) q.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
    if (!q.attributes.uv1) q.setAttribute('uv1', new THREE.BufferAttribute(new Float32Array(n * 2).fill(0.004), 2));
    if (!q.attributes.color) q.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3).map((_, i) => colore[i % 3]), 3));
    for (const nome of Object.keys(q.attributes)) if (!['position', 'normal', 'uv', 'uv1', 'color'].includes(nome)) q.deleteAttribute(nome);
    return q;
  });
}

function sfumaColore(g, fn) {
  const p = g.attributes.position;
  const c = new Float32Array(p.count * 3);
  const col = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    fn(p.getX(i), p.getY(i), p.getZ(i), col, i);
    c[i * 3] = col.r;
    c[i * 3 + 1] = col.g;
    c[i * 3 + 2] = col.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return g;
}

function cono(raggio, lungo, piega, lati = 8, livelli = 6) {
  const g = new THREE.ConeGeometry(raggio, lungo, lati, livelli).translate(0, lungo / 2, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = p.getY(i) / lungo;
    p.setZ(i, p.getZ(i) + t * t * lungo * piega);
  }
  g.computeVertexNormals();
  return g;
}

function orienta(g, posizione, direzione, giro = 0, scala = 1) {
  const q = new THREE.Quaternion().setFromUnitVectors(SU, direzione.clone().normalize());
  q.multiply(new THREE.Quaternion().setFromAxisAngle(SU, giro));
  return g.applyMatrix4(new THREE.Matrix4().compose(posizione, q, v3(scala, scala, scala)));
}

function geometriaCorpo(rumore) {
  const caso = generatore(11);
  const sc = scultura(rumore);
  const radiali = 88;
  const anelli = [];
  for (let s = -1.3; s < 0; s += 0.13) anelli.push(s);
  for (let s = 0; s < 16; s += 0.15) anelli.push(s);
  for (let s = 16; s < 28; s += 0.3) anelli.push(s);
  for (let s = 28; s < LUNGO; s += 0.5) anelli.push(s);
  anelli.push(LUNGO);
  const nu = radiali;
  const nv = anelli.length - 1;
  const pos = new Float32Array((nu + 1) * (nv + 1) * 3);
  const uv = new Float32Array((nu + 1) * (nv + 1) * 2);
  const uv1 = new Float32Array((nu + 1) * (nv + 1) * 2);
  const col = new Float32Array((nu + 1) * (nv + 1) * 3);
  const c = new THREE.Color();
  const scuro = new THREE.Color(0.2, 0.28, 0.32);
  const fianco = new THREE.Color(0.36, 0.42, 0.42);
  const ventre = new THREE.Color(0.72, 0.66, 0.54);
  const conchiglia = new THREE.Color(0.86, 0.84, 0.76);
  for (let j = 0; j <= nv; j++) {
    const s = anelli[j];
    const R = raggioCorpo(s);
    for (let i = 0; i <= nu; i++) {
      const th = -Math.PI + (i / nu) * Math.PI * 2;
      const sx = Math.sin(th);
      const sz = -Math.cos(th);
      const d = sc(Math.max(0, s), th, sx * R, -s, sz * R);
      const smorza = s < 0 ? liscio(-1.3, 0, s) : 1 - liscio(30, LUNGO, s) * 0.7;
      const r = R * (1 + d.spinta * smorza);
      const k = j * (nu + 1) + i;
      pos[k * 3] = sx * r;
      pos[k * 3 + 1] = -s;
      pos[k * 3 + 2] = sz * r;
      uv[k * 2] = th * 2.3;
      uv[k * 2 + 1] = s;
      uv1[k * 2] = i / nu;
      uv1[k * 2 + 1] = 1 - Math.max(0, s) / LUNGO;
      c.copy(fianco).lerp(scuro, liscio(0.1, 0.9, d.dorso)).lerp(ventre, liscio(-0.35, -0.8, d.dorso));
      c.multiplyScalar(0.78 + d.fp * 0.3 + d.f1 * 1.6).lerp(conchiglia, limita(d.cirr * 7));
      col[k * 3] = c.r;
      col[k * 3 + 1] = c.g;
      col[k * 3 + 2] = c.b;
    }
  }
  const indici = [];
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i;
      indici.push(a, a + 1, a + nu + 1, a + 1, a + nu + 2, a + nu + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setIndex(indici);
  g.computeVertexNormals();
  const n = g.attributes.normal;
  for (let j = 0; j <= nv; j++) {
    const a = j * (nu + 1);
    const b = a + nu;
    const x = (n.getX(a) + n.getX(b)) / 2;
    const y = (n.getY(a) + n.getY(b)) / 2;
    const z = (n.getZ(a) + n.getZ(b)) / 2;
    const l = Math.hypot(x, y, z) || 1;
    n.setXYZ(a, x / l, y / l, z / l);
    n.setXYZ(b, x / l, y / l, z / l);
  }
  const extra = [];
  const superficie = (s, th, fuori = 0) => {
    const R = raggioCorpo(s);
    const d = sc(s, th, Math.sin(th) * R, -s, -Math.cos(th) * R);
    const r = R * (1 + d.spinta) + fuori;
    return v3(Math.sin(th) * r, -s, -Math.cos(th) * r);
  };
  for (let s = 0.8; s < 33; s += 1.45) {
    const alto = 0.25 + 1.15 * (1 - s / 36) * (0.75 + caso() * 0.5);
    const base = superficie(s, 0, -0.05);
    const spina = orienta(cono(alto * 0.26, alto, 0.35 + caso() * 0.2, 9, 6), base, v3(0, -0.55, -1), 0);
    sfumaColore(spina, (x, y, z, cc) => {
      const t = limita(base.distanceTo(v3(x, y, z)) / alto);
      cc.setRGB(mix(0.24, 0.86, t), mix(0.24, 0.8, t), mix(0.22, 0.68, t));
    });
    extra.push(spina);
    for (const lato of [-1, 1]) {
      if (s > 24) continue;
      const th = lato * (0.62 + caso() * 0.12);
      const piccola = orienta(cono(alto * 0.12, alto * 0.42, 0.4, 7, 3), superficie(s + 0.5, th, -0.03), v3(Math.sin(th), -0.6, -Math.cos(th)), 0);
      sfumaColore(piccola, (x, y, z, cc) => cc.setRGB(0.42, 0.4, 0.34));
      extra.push(piccola);
    }
  }
  const lathe = new THREE.LatheGeometry([new THREE.Vector2(1, 0), new THREE.Vector2(0.86, 0.38), new THREE.Vector2(0.56, 0.82), new THREE.Vector2(0.42, 0.78), new THREE.Vector2(0.28, 0.25)], 6);
  let posti = 0;
  for (let tentativi = 0; posti < 190 && tentativi < 5000; tentativi++) {
    const s = 0.5 + caso() * 26;
    const th = (caso() - 0.5) * Math.PI * 2;
    const R = raggioCorpo(s);
    const d = sc(s, th, Math.sin(th) * R, -s, -Math.cos(th) * R);
    if (d.macchia < 0.55 || d.dorso < -0.5) continue;
    posti++;
    const r = 0.05 + caso() ** 2 * 0.16;
    const g2 = lathe.clone().scale(r, r * (0.7 + caso() * 0.7), r);
    orienta(g2, superficie(s, th, -r * 0.2), v3(Math.sin(th), (caso() - 0.5) * 0.4, -Math.cos(th)), caso() * 6);
    sfumaColore(g2, (x, y, z, cc, i) => {
      const alto = g2.attributes.uv.getY(i);
      cc.setRGB(alto > 0.8 ? 0.2 : 0.86, alto > 0.8 ? 0.18 : 0.82, alto > 0.8 ? 0.16 : 0.74);
    });
    extra.push(g2);
  }
  const pezzi = uniformaAttributi(extra, [0.8, 0.78, 0.7]);
  for (const p of pezzi) {
    const a = p.attributes.position;
    const u = p.attributes.uv;
    for (let i = 0; i < a.count; i++) u.setXY(i, a.getX(i) + a.getZ(i), -a.getY(i));
  }
  const tutto = mergeGeometries([g.toNonIndexed(), ...pezzi], false);
  return { geometria: pesiOssa(tutto, PASSO, OSSA), superficie };
}

function tuboLungo(punti, raggio, lati, segmenti) {
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), segmenti, raggio, lati, false);
}

function geometriaInnesti(superficie) {
  const caso = generatore(13);
  const metallo = [];
  const luci = [];
  const fascia = (s, larghezza, spessore, th0, th1) => {
    const parti = [];
    const lati = [
      (u, v, p) => p.copy(superficie(s - larghezza / 2 + v * larghezza, mix(th0, th1, u), 0.06 + spessore)),
      (u, v, p) => p.copy(superficie(s - larghezza / 2, mix(th0, th1, u), 0.02 + v * spessore)),
      (u, v, p) => p.copy(superficie(s + larghezza / 2, mix(th0, th1, u), 0.06 + spessore - v * spessore)),
    ];
    for (const fn of lati) parti.push(griglia(60, 3, fn));
    for (let th = th0 + 0.15; th < th1 - 0.1; th += 0.32) {
      for (const k of [-1, 1]) {
        const p = superficie(s + k * larghezza * 0.32, th, 0.06 + spessore);
        parti.push(orienta(new THREE.CylinderGeometry(0.055, 0.055, 0.07, 6), p, v3(Math.sin(th), 0, -Math.cos(th))));
      }
    }
    for (let th = th0 + 0.5; th < th1 - 0.3; th += 1.1) {
      const p = superficie(s, th, 0.06 + spessore + 0.02);
      luci.push(orienta(new THREE.CylinderGeometry(0.1, 0.12, 0.12, 8), p, v3(Math.sin(th), 0, -Math.cos(th))));
    }
    return parti;
  };
  for (const [s, l, sp, a, b] of [[3.3, 0.42, 0.13, -2.3, 2.3], [6.9, 0.36, 0.11, -2.0, 2.4], [10.6, 0.5, 0.15, -2.5, 2.1], [16.2, 0.6, 0.16, -Math.PI, Math.PI]]) metallo.push(...fascia(s, l, sp, a, b));
  for (const [th, r, s0, s1] of [[0.95, 0.08, 0.6, 21], [-0.95, 0.07, 0.8, 19], [1.7, 0.1, 1.2, 24], [-1.75, 0.09, 0.5, 22], [2.35, 0.06, 2, 17]]) {
    const punti = [];
    for (let s = s0; s <= s1; s += 0.5) {
      const fase = s / 3 - Math.floor(s / 3);
      punti.push(superficie(s, th + Math.sin(s * 0.4) * 0.08, r + 0.08 + Math.sin(fase * Math.PI) * 0.25));
    }
    metallo.push(tuboLungo(punti, r, 6, punti.length * 2));
    for (let s = s0 + 3; s < s1; s += 3) metallo.push(orienta(new THREE.BoxGeometry(0.32, 0.12, 0.32), superficie(s, th, 0.1), v3(Math.sin(th), 0, -Math.cos(th))));
  }
  const tubo = [];
  for (let s = 1.6; s <= 13.5; s += 0.5) tubo.push(superficie(s, 1.28, 0.28));
  metallo.push(tuboLungo(tubo, 0.17, 10, 60));
  for (let s = 2.2; s < 13; s += 2) {
    const p = superficie(s, 1.28, 0.28);
    const q = superficie(s + 0.1, 1.28, 0.28);
    metallo.push(orienta(new THREE.CylinderGeometry(0.27, 0.27, 0.12, 12), p, q.clone().sub(p)));
  }
  for (const [s, th, n] of [[5, 1.95, 8], [12.3, -1.45, 9], [17.4, 0.62, 7], [8.6, -2.45, 6], [1.8, -1.1, 5], [21, 2.1, 6]]) {
    const base = superficie(s, th, -0.1);
    const fuori = v3(Math.sin(th), 0, -Math.cos(th));
    for (let i = 0; i < n; i++) {
      const dir = fuori.clone().add(v3(caso() - 0.5, (caso() - 0.5) * 0.8, caso() - 0.5).multiplyScalar(1.3)).normalize();
      const alto = 0.25 + caso() * 0.65;
      const r = 0.06 + caso() * 0.1;
      const prisma = new THREE.CylinderGeometry(r, r, alto, 6).translate(0, alto / 2, 0);
      const punta = new THREE.ConeGeometry(r, r * 2.2, 6).translate(0, alto + r * 1.1, 0);
      luci.push(orienta(mergeGeometries([prisma.toNonIndexed(), punta.toNonIndexed()]), base.clone().addScaledVector(dir, 0.05), dir, caso() * 6));
    }
  }
  const met = mergeGeometries(metallo.map(g => uvMetri(g.index ? g.toNonIndexed() : g, 1)).map(g => {
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    return g;
  }), false);
  const luc = mergeGeometries(luci.map(g => {
    const q = g.index ? g.toNonIndexed() : g;
    for (const k of Object.keys(q.attributes)) if (!['position', 'normal', 'uv'].includes(k)) q.deleteAttribute(k);
    if (!q.attributes.uv) q.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(q.attributes.position.count * 2), 2));
    return q;
  }), false);
  return { metallo: pesiOssa(met, PASSO, OSSA), luci: pesiOssa(luc, PASSO, OSSA) };
}

const PROFILO_TESTA = Object.freeze({
  z: [-1.45, 5.45],
  w: [[0, 0.2], [0.05, 1.25], [0.12, 1.9], [0.25, 2.05], [0.4, 1.85], [0.55, 1.6], [0.7, 1.38], [0.85, 1.1], [0.95, 0.78], [1, 0.05]],
  h: [[0, 0.25], [0.05, 1.2], [0.12, 1.75], [0.25, 1.7], [0.4, 1.42], [0.55, 1.18], [0.7, 0.98], [0.85, 0.78], [0.95, 0.55], [1, 0.08]],
  y0: [[0, -0.2], [0.12, -0.16], [0.25, -0.1], [0.5, -0.02], [0.75, 0.06], [1, 0.14]],
});
const PROFILO_MASCELLA = Object.freeze({
  z: [-0.6, 5.0],
  w: [[0, 0.5], [0.06, 1.35], [0.16, 1.72], [0.4, 1.58], [0.7, 1.2], [0.9, 0.82], [1, 0.05]],
  d: [[0, 0.45], [0.08, 0.95], [0.18, 1.08], [0.4, 0.95], [0.7, 0.72], [0.9, 0.52], [1, 0.05]],
});
const OCCHI = Object.freeze([[0.58, 0.5, 0.27, 0], [0.47, 0.78, 0.2, 1], [0.37, 0.6, 0.17, 0], [0.665, 0.33, 0.14, 1]]);

function puntoTesta(t, alfa, scarto = 0) {
  const P = PROFILO_TESTA;
  const w = tabella(P.w, t) + scarto;
  const h = tabella(P.h, t) + scarto;
  const y0 = tabella(P.y0, t);
  const c = Math.cos(alfa);
  const s = Math.max(0, Math.sin(alfa));
  return v3(w * Math.sign(c) * Math.abs(c) ** 0.8, y0 + h * s ** 0.72, mix(P.z[0], P.z[1], t));
}

function geometriaCranio(rumore) {
  const caso = generatore(17);
  const occhi = [];
  for (const [t, a, r, colore] of OCCHI) for (const lato of [0, 1]) occhi.push({ p: puntoTesta(t, lato ? Math.PI - a : a), r, colore });
  const g = griglia(96, 128, (u, v, p) => p.copy(puntoTesta(v, u * Math.PI)));
  const pos = g.attributes.position;
  const nor = g.attributes.normal;
  const q = v3();
  for (let i = 0; i < pos.count; i++) {
    q.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    const t = (q.z - PROFILO_TESTA.z[0]) / (PROFILO_TESTA.z[1] - PROFILO_TESTA.z[0]);
    let d = 0.14 * Math.exp(-(q.x * q.x) / 0.06) * liscio(1, 0.7, t) * liscio(0.02, 0.15, t);
    for (const s of [-1, 1]) {
      const bx = q.x - s * mix(1.45, 0.9, liscio(0.32, 0.5, t));
      const by = q.y - 1.2;
      d += 0.2 * Math.exp(-(bx * bx) / 0.08 - (by * by) / 0.05) * liscio(0.28, 0.36, t) * liscio(0.56, 0.46, t);
      const nx = q.x - s * 0.34;
      const nz = q.z - 4.95;
      d -= 0.14 * Math.exp(-(nx * nx + nz * nz) / 0.012);
    }
    for (const o of occhi) {
      const dd = q.distanceTo(o.p) / o.r;
      d += -0.55 * o.r * Math.exp(-dd * dd * 0.9) + 0.18 * o.r * Math.exp(-((dd - 1.45) ** 2) * 5);
    }
    const [d1, d2] = rumore.cellule(q.x * 1.25 + 4, q.y * 1.25, q.z * 1.25);
    const placca = Math.min(1, (d2 - d1) * 9);
    d += (placca - 1) * 0.045 + (d2 - d1) * 0.05 * (q.y > 0.3 ? 1 : 0.4);
    d += rumore.fbm(q.x * 0.9, q.y * 0.9, q.z * 0.9, 4) * 0.07 + rumore.fbm(q.x * 3.5, q.y * 3.5, q.z * 3.5, 2) * 0.018;
    const bordo = liscio(-0.05, 0.25, q.y - tabella(PROFILO_TESTA.y0, t));
    d *= bordo;
    pos.setXYZ(i, q.x + nor.getX(i) * d, q.y + nor.getY(i) * d, q.z + nor.getZ(i) * d);
  }
  g.computeVertexNormals();
  const uv1 = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv1[i * 2] = 0.5 + pos.getX(i) / 4.6;
    uv1[i * 2 + 1] = (pos.getZ(i) + 1.5) / 7;
  }
  g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
  sfumaColore(g, (x, y, z, c) => {
    const alto = liscio(0, 1.5, y);
    const f = rumore.fbm(x * 0.7 + 9, y * 0.7, z * 0.7, 3);
    c.setRGB(mix(0.5, 0.24, alto) * (0.85 + f * 1.4), mix(0.5, 0.31, alto) * (0.85 + f * 1.4), mix(0.44, 0.35, alto) * (0.85 + f * 1.4));
  });
  const nonIndicizzata = uvMetri(g.toNonIndexed(), 1);
  const corna = [];
  for (let i = 0; i < 7; i++) {
    const alfa = 0.45 + (i / 6) * (Math.PI - 0.9);
    const t = 0.1 + Math.abs(i - 3) * 0.02;
    const base = puntoTesta(t, alfa, -0.08);
    const lungo = 1.0 + (3 - Math.abs(i - 3)) * 0.42 + caso() * 0.3;
    const dir = v3(Math.cos(alfa) * 0.8, 0.55 + Math.sin(alfa) * 0.3, -1.1);
    const corno = orienta(cono(0.2 + lungo * 0.06, lungo, -0.35, 10, 7), base, dir, 0);
    corna.push(corno);
  }
  const cirr = [];
  const lathe = new THREE.LatheGeometry([new THREE.Vector2(1, 0), new THREE.Vector2(0.86, 0.38), new THREE.Vector2(0.56, 0.82), new THREE.Vector2(0.42, 0.78), new THREE.Vector2(0.28, 0.25)], 6);
  for (let i = 0; i < 40; i++) {
    const t = 0.1 + caso() * 0.5;
    const a = 0.9 + caso() * 1.3;
    const r = 0.04 + caso() ** 2 * 0.1;
    const p = puntoTesta(t, a, -r * 0.3);
    cirr.push(orienta(lathe.clone().scale(r, r, r), p, p.clone().sub(v3(0, 0.2, p.z)), caso() * 6));
  }
  const pezzi = uniformaAttributi([...cirr.map(c => uvMetri(c.toNonIndexed(), 1))], [0.82, 0.8, 0.72]);
  return { cranio: mergeGeometries([nonIndicizzata, ...pezzi], false), corna, occhi };
}

function puntoMascella(t, alfa) {
  const P = PROFILO_MASCELLA;
  const w = tabella(P.w, t);
  const d = tabella(P.d, t);
  const c = Math.cos(alfa);
  const s = Math.min(0, Math.sin(alfa));
  return v3(w * Math.sign(c) * Math.abs(c) ** 0.85, CERNIERA.y - d * Math.abs(s) ** 0.8, mix(P.z[0], P.z[1], t));
}

function geometriaMascella(rumore) {
  const g = griglia(72, 96, (u, v, p) => p.copy(puntoMascella(v, Math.PI + u * Math.PI)));
  const pos = g.attributes.position;
  const nor = g.attributes.normal;
  const q = v3();
  for (let i = 0; i < pos.count; i++) {
    q.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    const sotto = liscio(-0.2, -0.6, q.y);
    const fz = q.z / 0.42 - Math.floor(q.z / 0.42);
    let d = sotto * 0.05 * fz * fz;
    const [d1, d2] = rumore.cellule(q.x * 1.4 + 2, q.y * 1.4, q.z * 1.4);
    d += (Math.min(1, (d2 - d1) * 9) - 1) * 0.04 * (1 - sotto);
    d += rumore.fbm(q.x * 0.9 + 3, q.y * 0.9, q.z * 0.9, 4) * 0.06;
    d *= liscio(-0.02, -0.25, q.y - CERNIERA.y);
    pos.setXYZ(i, q.x + nor.getX(i) * d, q.y + nor.getY(i) * d, q.z + nor.getZ(i) * d);
  }
  g.computeVertexNormals();
  const uv1 = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv1[i * 2] = 0.5 + pos.getX(i) / 4.6;
    uv1[i * 2 + 1] = (pos.getZ(i) + 1.5) / 7;
  }
  g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
  sfumaColore(g, (x, y, z, c) => {
    const ventre = liscio(-0.3, -0.9, y);
    c.setRGB(mix(0.34, 0.68, ventre), mix(0.38, 0.62, ventre), mix(0.38, 0.5, ventre));
  });
  return uvMetri(g.toNonIndexed(), 1);
}

function geometriaBocca() {
  const palato = griglia(28, 56, (u, v, p) => {
    const t = mix(0.12, 0.985, v);
    const w = tabella(PROFILO_TESTA.w, t) * 0.92;
    const y0 = tabella(PROFILO_TESTA.y0, t);
    const h = tabella(PROFILO_TESTA.h, t);
    p.set(mix(w, -w, u), y0 + 0.02 + Math.sin(u * Math.PI) * h * 0.42, mix(PROFILO_TESTA.z[0], PROFILO_TESTA.z[1], t));
  });
  const gola = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([v3(0, -0.1, 1.2), v3(0, -0.2, 0.3), v3(0, -0.45, -0.7), v3(0, -0.8, -1.8)]), 24, 0.95, 20, false);
  const pg = gola.attributes.position;
  const ug = gola.attributes.uv;
  for (let i = 0; i < pg.count; i++) ug.setXY(i, limita(1 - Math.abs(ug.getX(i) - 0.38) * 1.6, 0.05, 1), ug.getY(i));
  const lingua = griglia(24, 50, (u, v, p) => {
    const t = mix(0.1, 0.97, v);
    const w = tabella(PROFILO_MASCELLA.w, t) * 0.9;
    const d = tabella(PROFILO_MASCELLA.d, t);
    p.set(mix(-w, w, u), CERNIERA.y - Math.sin(u * Math.PI) * d * 0.45, mix(PROFILO_MASCELLA.z[0], PROFILO_MASCELLA.z[1], t));
  });
  const ombra = (g, fn) => {
    const uvA = g.attributes.uv;
    const p = g.attributes.position;
    for (let i = 0; i < uvA.count; i++) uvA.setXY(i, fn(p.getZ(i)), 0.5);
    return g;
  };
  ombra(palato, z => limita(0.7 - z * 0.12, 0.05, 0.75));
  ombra(lingua, z => limita(0.7 - z * 0.12, 0.05, 0.75));
  const pulisci = g => {
    const q = g.index ? g.toNonIndexed() : g;
    for (const k of Object.keys(q.attributes)) if (!['position', 'normal', 'uv'].includes(k)) q.deleteAttribute(k);
    return q;
  };
  return { alto: mergeGeometries([pulisci(palato), pulisci(rovesciaFacce(gola))], false), basso: pulisci(rovesciaFacce(lingua)) };
}

function rovesciaFacce(g) {
  const q = g.index ? g.toNonIndexed() : g.clone();
  for (const nome of Object.keys(q.attributes)) {
    const a = q.attributes[nome];
    for (let i = 0; i < a.count; i += 3) {
      for (let k = 0; k < a.itemSize; k++) {
        const x = a.array[(i + 1) * a.itemSize + k];
        a.array[(i + 1) * a.itemSize + k] = a.array[(i + 2) * a.itemSize + k];
        a.array[(i + 2) * a.itemSize + k] = x;
      }
    }
  }
  const n = q.attributes.normal;
  for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  return q;
}

function geometriaDenti() {
  const caso = generatore(19);
  const alto = [];
  const basso = [];
  const dente = (lungo, raggio, piega) => cono(raggio, lungo, piega, 7, 5);
  for (const lato of [-1, 1]) {
    for (let i = 0; i < 17; i++) {
      const t = 0.16 + (i / 16) * 0.81;
      const zanna = Math.exp(-((t - 0.86) ** 2) / 0.0012);
      const lungo = 0.3 + 0.18 * Math.sin(i * 1.7) ** 2 + zanna * 0.65 + caso() * 0.08;
      const p = puntoTesta(t, lato > 0 ? 0.04 : Math.PI - 0.04, -0.1);
      alto.push(orienta(dente(lungo, lungo * 0.16, -0.25), p, v3(-lato * 0.18, -1, -0.12)));
    }
    for (let i = 0; i < 12; i++) {
      const t = 0.22 + (i / 11) * 0.66;
      const p = puntoTesta(t, lato > 0 ? 0.04 : Math.PI - 0.04, -0.42);
      const lungo = 0.18 + caso() * 0.12;
      alto.push(orienta(dente(lungo, lungo * 0.17, -0.3), p, v3(-lato * 0.3, -1, -0.3)));
    }
    for (let i = 0; i < 15; i++) {
      const t = 0.14 + (i / 14) * 0.82;
      const zanna = Math.exp(-((t - 0.78) ** 2) / 0.0015);
      const lungo = 0.26 + 0.14 * Math.sin(i * 2.3) ** 2 + zanna * 0.55 + caso() * 0.06;
      const p = puntoMascella(t, lato > 0 ? -0.05 : Math.PI + 0.05);
      p.x -= lato * 0.08;
      basso.push(orienta(dente(lungo, lungo * 0.16, -0.22), p, v3(-lato * 0.12, 1, -0.1)));
    }
  }
  const colora = lista => lista.map(g => sfumaColore(g, (x, y, z, c, i) => {
    const t = g.attributes.uv.getY(i);
    c.setRGB(mix(0.45, 0.95, t), mix(0.38, 0.91, t), mix(0.26, 0.82, t));
  }));
  return { alto: colora(alto), basso: colora(basso) };
}

function geometriaTentacolini() {
  const caso = generatore(23);
  const pezzi = [];
  for (let i = 0; i < 10; i++) {
    const lato = i % 2 ? 1 : -1;
    const t = 0.18 + Math.floor(i / 2) * 0.1;
    const base = puntoMascella(t, Math.PI * 1.5 + lato * 0.55);
    base.y += 0.1;
    const lungo = 1.6 + caso() * 1.3;
    const punti = [];
    for (let k = 0; k <= 8; k++) {
      const f = k / 8;
      punti.push(base.clone().add(v3(lato * f * 0.35, -f * lungo, -f * lungo * 0.45 + Math.sin(f * 3 + i) * 0.25 * f)));
    }
    const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), 24, 1, 7, false);
    const p = g.attributes.position;
    const uv = g.attributes.uv;
    const curva = new THREE.CatmullRomCurve3(punti);
    const asse = v3();
    for (let k = 0; k < p.count; k++) {
      const f = uv.getX(k);
      curva.getPointAt(f, asse);
      const r = mix(0.17, 0.025, f);
      p.setXYZ(k, asse.x + (p.getX(k) - asse.x) * r, asse.y + (p.getY(k) - asse.y) * r, asse.z + (p.getZ(k) - asse.z) * r);
    }
    g.computeVertexNormals();
    const onda = new Float32Array(p.count * 2);
    for (let k = 0; k < p.count; k++) {
      onda[k * 2] = uv.getX(k);
      onda[k * 2 + 1] = i * 1.37;
    }
    const q = g.toNonIndexed();
    const o = new Float32Array(q.attributes.position.count * 2);
    const idx = g.index.array;
    for (let k = 0; k < idx.length; k++) {
      o[k * 2] = onda[idx[k] * 2];
      o[k * 2 + 1] = onda[idx[k] * 2 + 1];
    }
    q.setAttribute('onda', new THREE.BufferAttribute(o, 2));
    const n = q.attributes.position.count;
    const colori = new Float32Array(n * 3);
    const uv1 = new Float32Array(n * 2);
    for (let k = 0; k < n; k++) {
      const f = o[k * 2];
      colori.set([mix(0.3, 0.7, f), mix(0.36, 0.5, f), mix(0.38, 0.46, f)], k * 3);
      uv1[k * 2] = 0.5;
      uv1[k * 2 + 1] = f;
    }
    q.setAttribute('color', new THREE.BufferAttribute(colori, 3));
    q.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
    pezzi.push(q);
  }
  return mergeGeometries(pezzi, false);
}

function geometriaCuore() {
  const pezzi = [new THREE.IcosahedronGeometry(0.5, 1)];
  const caso = generatore(29);
  for (let i = 0; i < 9; i++) {
    const dir = v3(caso() - 0.5, caso() - 0.5, caso() - 0.5).normalize();
    const alto = 0.35 + caso() * 0.35;
    const r = 0.08 + caso() * 0.07;
    const prisma = new THREE.CylinderGeometry(r, r, alto, 6).translate(0, alto / 2, 0);
    const punta = new THREE.ConeGeometry(r, r * 2.4, 6).translate(0, alto + r * 1.2, 0);
    pezzi.push(orienta(mergeGeometries([prisma.toNonIndexed(), punta.toNonIndexed()]), dir.clone().multiplyScalar(0.3), dir));
  }
  const g = mergeGeometries(pezzi.map(p => {
    for (const k of Object.keys(p.attributes)) if (!['position', 'normal', 'uv'].includes(k)) p.deleteAttribute(k);
    return p;
  }), false);
  g.computeVertexNormals();
  return g;
}

function geometriaInnestiTesta() {
  const metallo = [];
  const luci = [];
  const placca = griglia(16, 14, (u, v, p) => p.copy(puntoTesta(mix(0.22, 0.44, v), mix(1.05, 1.62, u), 0.09)));
  metallo.push(placca);
  for (let i = 0; i < 9; i++) {
    for (const v of [0.24, 0.42]) {
      const p = puntoTesta(v, 1.08 + i * 0.065, 0.11);
      metallo.push(orienta(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 6), p, p.clone().sub(v3(0, 0.1, p.z))));
    }
  }
  const fascia = griglia(40, 3, (u, v, p) => p.copy(puntoTesta(0.78 + v * 0.025, u * Math.PI, 0.06)));
  metallo.push(fascia);
  const tubo = [puntoTesta(0.3, 1.3, 0.12), puntoTesta(0.18, 1.35, 0.25), puntoTesta(0.05, 1.4, 0.2), v3(-0.3, 0.5, -1.9)];
  metallo.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(tubo), 20, 0.09, 8, false));
  metallo.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([puntoTesta(0.33, 1.45, 0.12), puntoTesta(0.2, 1.55, 0.2), v3(0.2, 0.9, -1.6)]), 20, 0.06, 6, false));
  const caso = generatore(31);
  for (const [t, a, n] of [[0.42, 0.95, 6], [0.4, Math.PI - 0.95, 5], [0.62, 1.57, 4]]) {
    const base = puntoTesta(t, a, -0.05);
    const fuori = base.clone().sub(v3(0, 0.3, base.z)).normalize();
    for (let i = 0; i < n; i++) {
      const dir = fuori.clone().add(v3(caso() - 0.5, caso() - 0.5, caso() - 0.5)).normalize();
      const alto = 0.2 + caso() * 0.45;
      const r = 0.05 + caso() * 0.07;
      const prisma = new THREE.CylinderGeometry(r, r, alto, 6).translate(0, alto / 2, 0);
      const punta = new THREE.ConeGeometry(r, r * 2.2, 6).translate(0, alto + r * 1.1, 0);
      luci.push(orienta(mergeGeometries([prisma.toNonIndexed(), punta.toNonIndexed()]), base, dir, caso() * 6));
    }
  }
  const pulisci = g => {
    const q = uvMetri(g.index ? g.toNonIndexed() : g, 1);
    for (const k of Object.keys(q.attributes)) if (!['position', 'normal', 'uv'].includes(k)) q.deleteAttribute(k);
    return q;
  };
  return { metallo: mergeGeometries(metallo.map(pulisci), false), luci: mergeGeometries(luci.map(pulisci), false) };
}

function geometriaTentacolo(rumore) {
  const caso = generatore(37);
  const nu = 30;
  const anelli = [];
  for (let s = -0.6; s <= LUNGO_TENTACOLO; s += 0.16) anelli.push(s);
  const raggio = s => (s < 0 ? 1.25 : 0.07 + 1.18 * Math.max(0, 1 - s / LUNGO_TENTACOLO) ** 0.9);
  const g = griglia(nu, anelli.length - 1, (u, v, p) => {
    const s = anelli[Math.round(v * (anelli.length - 1))];
    const th = -Math.PI + u * Math.PI * 2;
    const r0 = raggio(s);
    const ventre = Math.max(0, -Math.cos(th));
    const r = r0 * (1 - 0.2 * ventre * ventre + 0.06 * Math.exp(-(th * th) / 0.05)) + rumore.fbm(Math.sin(th) * 2, s * 0.6, Math.cos(th) * 2, 3) * 0.05 * r0;
    const punta = s > LUNGO_TENTACOLO - 0.2 ? 0 : 1;
    p.set(Math.sin(th) * r * punta, -s, -Math.cos(th) * r * punta);
  });
  const uv1 = new Float32Array(g.attributes.position.count * 2);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    uv1[i * 2] = 0.5;
    uv1[i * 2 + 1] = 1 - limita(-pos.getY(i) / LUNGO_TENTACOLO);
  }
  g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 4, -pos.getY(i));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3));
  const col = g.attributes.color;
  for (let i = 0; i < pos.count; i++) {
    const r = Math.hypot(pos.getX(i), pos.getZ(i)) || 1;
    const ventre = liscio(0.1, 0.7, pos.getZ(i) / r);
    col.setXYZ(i, mix(0.24, 0.78, ventre), mix(0.3, 0.6, ventre), mix(0.34, 0.52, ventre));
  }
  const ventose = [];
  const coppa = new THREE.LatheGeometry([new THREE.Vector2(0.55, -0.1), new THREE.Vector2(1, 0.15), new THREE.Vector2(0.95, 0.4), new THREE.Vector2(0.62, 0.32), new THREE.Vector2(0.3, 0.08)], 8);
  for (let s = 1.2; s < LUNGO_TENTACOLO - 0.6; s += 0.18 + raggio(s) * 0.42) {
    for (const lato of [-1, 1]) {
      const th = Math.PI - lato * 0.42;
      const r0 = raggio(s);
      const rr = r0 * 0.24;
      const p = v3(Math.sin(th) * r0 * 0.9, -s, -Math.cos(th) * r0 * 0.88);
      const v = orienta(coppa.clone().scale(rr, rr, rr), p, v3(Math.sin(th), 0, -Math.cos(th)), caso());
      const n = v.attributes.position.count;
      v.setAttribute('uv1', new THREE.BufferAttribute(new Float32Array(n * 2).map((_, k) => (k % 2 ? 1 - s / LUNGO_TENTACOLO : 0.5)), 2));
      sfumaColore(v, (x, y, z, c, i) => {
        const bordo = v.attributes.uv.getY(i);
        c.setRGB(mix(0.85, 0.5, bordo), mix(0.62, 0.3, bordo), mix(0.58, 0.32, bordo));
      });
      ventose.push(v);
    }
  }
  const pulisci = q => {
    const r = q.index ? q.toNonIndexed() : q;
    for (const k of Object.keys(r.attributes)) if (!['position', 'normal', 'uv', 'uv1', 'color'].includes(k)) r.deleteAttribute(k);
    return r;
  };
  const tutto = mergeGeometries([pulisci(g), ...ventose.map(pulisci)], false);
  return pesiOssa(tutto, PASSO_TENTACOLO, OSSA_TENTACOLO);
}

let geometrie = null;
function geometrieLeviatano() {
  if (geometrie) return geometrie;
  const rumore = creaRumore(777);
  const corpo = geometriaCorpo(rumore);
  const innesti = geometriaInnesti(corpo.superficie);
  const cranio = geometriaCranio(rumore);
  const denti = geometriaDenti();
  const colori = lista => uniformaAttributi(lista, [0.9, 0.86, 0.76]);
  geometrie = {
    corpo: corpo.geometria,
    metallo: innesti.metallo,
    luci: innesti.luci,
    cranio: cranio.cranio,
    occhi: cranio.occhi,
    avorioAlto: mergeGeometries(colori([...denti.alto, ...cranio.corna.map(c => sfumaColore(c, (x, y, z, cc, i) => {
      const t = c.attributes.uv.getY(i);
      cc.setRGB(mix(0.2, 0.82, t), mix(0.22, 0.78, t), mix(0.22, 0.68, t));
    }))]), false),
    avorioBasso: mergeGeometries(colori(denti.basso), false),
    mascella: geometriaMascella(rumore),
    bocca: geometriaBocca(),
    tentacolini: geometriaTentacolini(),
    cuore: geometriaCuore(),
    sferaOcchio: new THREE.SphereGeometry(1, 16, 12),
    innestiTesta: geometriaInnestiTesta(),
    tentacolo: geometriaTentacolo(rumore),
  };
  for (const g of Object.values(geometrie)) if (g?.isBufferGeometry) g.computeBoundingSphere();
  return geometrie;
}

function copiaTex(t, ripeti) {
  if (!t) return null;
  const c = t.clone();
  c.wrapS = c.wrapT = THREE.RepeatWrapping;
  c.repeat.set(ripeti, ripeti);
  c.needsUpdate = true;
  return c;
}

const materialiPer = new WeakMap();
function materialiLeviatano(kit) {
  const chiave = kit ?? materialiPer;
  if (materialiPer.has(chiave)) return materialiPer.get(chiave);
  const pelleTex = kit?.tex?.pelle ?? {};
  const luciCorpo = texturaLuciCorpo();
  luciCorpo.channel = 1;
  const luciTesta = texturaLuciTesta();
  luciTesta.channel = 1;
  const luciTentacolo = texturaTentacolo();
  luciTentacolo.channel = 1;
  const pelle = (emissiveMap, intensita) => {
    const m = new THREE.MeshStandardMaterial({
      map: copiaTex(pelleTex.map, 0.42), normalMap: copiaTex(pelleTex.normalMap, 0.42), roughnessMap: copiaTex(pelleTex.roughnessMap, 0.42),
      vertexColors: true, color: 0xffffff, roughness: 0.82, metalness: 0.12, emissive: 0xffffff, emissiveMap, emissiveIntensity: intensita, envMapIntensity: 1.1,
    });
    if (m.normalMap) m.normalScale = new THREE.Vector2(1.4, 1.4);
    return kit ? conCaustiche(m, kit.uniformi, { peso: 0.55, chiave: `leviatano${intensita}` }) : m;
  };
  const occhio = colore => new THREE.MeshStandardMaterial({ color: 0x050607, emissive: colore, emissiveMap: texturaOcchio(), emissiveIntensity: 4, roughness: 0.12, metalness: 0.1 });
  const tentacolini = pelle(luciTentacolo, 1.4);
  const uniformiOnda = { uOnda: { value: 0 } };
  const prima = tentacolini.onBeforeCompile;
  tentacolini.onBeforeCompile = (shader, renderer) => {
    prima?.call(tentacolini, shader, renderer);
    shader.uniforms.uOnda = uniformiOnda.uOnda;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec2 onda;\nuniform float uOnda;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
  float ampio = pow(onda.x, 1.6);
  transformed.x += sin(uOnda * 1.7 + onda.y + onda.x * 4.0) * 0.45 * ampio;
  transformed.z += cos(uOnda * 1.3 + onda.y * 1.7 + onda.x * 3.0) * 0.35 * ampio;`);
  };
  const chiavePrima = tentacolini.customProgramCacheKey;
  tentacolini.customProgramCacheKey = () => `tentacolini|${chiavePrima.call(tentacolini)}`;
  const m = {
    pelle: pelle(luciCorpo, 1.5),
    pelleTesta: pelle(luciTesta, 1.4),
    pelleTentacolo: pelle(luciTentacolo, 1.2),
    tentacolini,
    uniformiOnda,
    metallo: kit?.mat?.lamiera ?? new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.8, metalness: 0.5 }),
    luci: (kit?.mat?.oricalco ?? new THREE.MeshStandardMaterial({ color: 0x0a2a38, emissive: 0x2fd0ff, emissiveIntensity: 2.4, roughness: 0.25, metalness: 0.2 })).clone(),
    avorio: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.36, metalness: 0.05, emissive: 0x000000 }),
    carne: new THREE.MeshStandardMaterial({ color: 0x4a1012, roughness: 0.26, metalness: 0.05, emissive: 0xffffff, emissiveMap: texturaGola(), emissiveIntensity: 1.6, side: THREE.DoubleSide }),
    occhioCiano: occhio(0x5ff2ff),
    occhioArancio: occhio(0xff9a3a),
    cuore: new THREE.MeshStandardMaterial({ color: 0x0c3848, emissive: 0xffffff, emissiveMap: texturaCuore(), emissiveIntensity: 4, roughness: 0.1, metalness: 0.4 }),
    alone: new THREE.SpriteMaterial({ map: texturaMorbida(), color: 0x7ff4ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 }),
    aloneArancio: new THREE.SpriteMaterial({ map: texturaMorbida(), color: 0xffa84a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 }),
    aloneCuore: new THREE.SpriteMaterial({ map: texturaMorbida(), color: 0x9ff8ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 1 }),
  };
  materialiPer.set(chiave, m);
  return m;
}

let kitAttivo = null;
let istanza = null;
let superstite = null;

function frameOssa(ossa, curva, iniziale, respiro) {
  const lungo = curva.getLength();
  const p = v3();
  const T = v3();
  const fine = curva.getPointAt(1);
  const coda = curva.getTangentAt(1);
  const V = iniziale.clone();
  const X = v3();
  const Y = v3();
  const m = new THREE.Matrix4();
  for (let i = 0; i < ossa.length; i++) {
    const s = i * PASSO;
    if (s <= lungo) {
      curva.getPointAt(s / lungo, p);
      curva.getTangentAt(s / lungo, T);
    } else {
      p.copy(fine).addScaledVector(coda, s - lungo);
      T.copy(coda);
    }
    Y.copy(T).negate();
    V.addScaledVector(Y, -Y.dot(V));
    if (V.lengthSq() < 1e-6) V.set(0, 0, 1).addScaledVector(Y, -Y.z);
    V.normalize();
    X.crossVectors(Y, V).normalize();
    m.makeBasis(X, Y, V);
    const osso = ossa[i];
    osso.position.copy(p);
    osso.quaternion.setFromRotationMatrix(m);
    const gonfio = 1 + respiro * Math.exp(-((i - 4) ** 2) / 8);
    osso.scale.set(gonfio, 1, gonfio);
  }
}

function elica(punti, partenza, fase) {
  for (let k = 0; k < 6; k++) {
    const a = fase + k * 1.15;
    punti.push(v3(Math.cos(a) * 4.3, partenza - 3.5 - k * 2.6, Math.sin(a) * 4.3));
  }
  return punti;
}

function direzione(beccheggio, imbardata = 0) {
  return v3(Math.sin(imbardata) * Math.cos(beccheggio), Math.sin(beccheggio), Math.cos(imbardata) * Math.cos(beccheggio));
}

function posaVasca({ testa, avanti, h, fase, collo = null }) {
  const punti = [testa.clone()];
  const dietro = testa.clone().addScaledVector(avanti, -2.3).add(v3(0, -1.3, 0));
  punti.push(dietro);
  if (collo) punti.push(...collo.map(p => p.clone()));
  else punti.push(v3(testa.x * 0.6, mix(testa.y, 0, 0.42), mix(testa.z, -0.8, 0.7)), v3(testa.x * 0.25, mix(testa.y, 0, 0.82), -0.4));
  punti.push(v3(0, -4, 0.3));
  elica(punti, -4, fase);
  const giu = (1 - h) * SOMMERSO;
  for (const p of punti) p.y -= giu;
  return punti;
}

function costruisciLeviatano(z, radice, scena) {
  const geo = geometrieLeviatano();
  const mat = materialiLeviatano(kitAttivo);
  const corpo = new THREE.Group();
  corpo.name = 'leviatano';
  radice.add(corpo);
  const ossa = Array.from({ length: OSSA }, (_, i) => {
    const osso = new THREE.Bone();
    osso.position.set(0, -i * PASSO, 0);
    corpo.add(osso);
    return osso;
  });
  const scheletro = new THREE.Skeleton(ossa, ossa.map((_, i) => new THREE.Matrix4().makeTranslation(0, i * PASSO, 0)));
  const pellicola = (g, m) => {
    const s = new THREE.SkinnedMesh(g, m);
    s.bind(scheletro, new THREE.Matrix4());
    s.frustumCulled = false;
    corpo.add(s);
    return s;
  };
  pellicola(geo.corpo, mat.pelle);
  pellicola(geo.metallo, mat.metallo);
  pellicola(geo.luci, mat.luci);
  const capo = new THREE.Group();
  corpo.add(capo);
  const mesh = (g, m, padre = capo) => {
    const o = new THREE.Mesh(g, m);
    padre.add(o);
    return o;
  };
  mesh(geo.cranio, mat.pelleTesta);
  mesh(geo.avorioAlto, mat.avorio);
  mesh(geo.bocca.alto, mat.carne);
  mesh(geo.innestiTesta.metallo, mat.metallo);
  mesh(geo.innestiTesta.luci, mat.luci);
  const mascella = new THREE.Group();
  mascella.position.set(0, CERNIERA.y, CERNIERA.z);
  capo.add(mascella);
  const perno = new THREE.Matrix4().makeTranslation(0, -CERNIERA.y, -CERNIERA.z);
  for (const [g, m] of [[geo.mascella, mat.pelleTesta], [geo.avorioBasso, mat.avorio], [geo.bocca.basso, mat.carne], [geo.tentacolini, mat.tentacolini]]) {
    const o = mesh(g, m, mascella);
    o.matrixAutoUpdate = false;
    o.matrix.copy(perno);
  }
  const occhi = geo.occhi.map(o => {
    const sfera = new THREE.Mesh(geo.sferaOcchio, o.colore ? mat.occhioArancio : mat.occhioCiano);
    sfera.scale.setScalar(o.r);
    const fuori = v3(o.p.x, o.p.y - 0.25, 0).normalize();
    sfera.position.copy(o.p).addScaledVector(fuori, -o.r * 0.3);
    sfera.quaternion.setFromUnitVectors(v3(0, 0, 1), fuori.clone().add(v3(0, 0, 0.35)).normalize());
    capo.add(sfera);
    const alone = new THREE.Sprite(o.colore ? mat.aloneArancio : mat.alone);
    alone.position.copy(o.p).addScaledVector(fuori, o.r * 0.6);
    alone.scale.setScalar(o.r * 5);
    capo.add(alone);
    return { sfera, alone, base: o.r * 5 };
  });
  const cuore = mesh(geo.cuore, mat.cuore);
  cuore.position.set(CUORE.x, CUORE.y, CUORE.z);
  const aloneCuore = new THREE.Sprite(mat.aloneCuore);
  aloneCuore.position.copy(cuore.position).add(v3(0, 0, 0.5));
  capo.add(aloneCuore);
  const testa = new THREE.Object3D();
  testa.position.set(CENTRO_TESTA.x, CENTRO_TESTA.y, CENTRO_TESTA.z);
  capo.add(testa);
  const bocca = new THREE.Object3D();
  bocca.position.set(BOCCA.x, BOCCA.y, BOCCA.z);
  capo.add(bocca);

  const stato = {
    fase: null, tempoFase: 0, tempo: Math.random() * 50, yaw: z.yaw, ruggito: 0, sputo: 0, viste: new Set(), puntiPrima: null, transizione: 1,
    sguardo: -0.28, bagnato: 1, luce: 1, mondo: false, ultimoLev: null, z,
  };
  const temp = { m: new THREE.Matrix4(), inversa: new THREE.Matrix4(), q: new THREE.Quaternion(), s: v3(1, 1, 1), p: v3(), x: v3(), y: v3() };
  const curva = new THREE.CatmullRomCurve3([v3(), v3(0, -1, 0)], false, 'centripetal');

  function ruggisci(durata = 1.4) {
    stato.ruggito = Math.max(stato.ruggito, durata);
  }

  function sguardoVerso(vista, quotaTesta) {
    let migliore = null;
    for (const g of vista?.giocatori ?? []) {
      const d = Math.hypot(g.x - DELTA.x, g.z - DELTA.z);
      if (d > DELTA.raggio) continue;
      if (!migliore || d < migliore.d) migliore = { d, y: quotaDelta(g.x, g.z) + 1.5 };
    }
    if (!migliore) return -0.3;
    return limita(Math.atan2(migliore.y - quotaTesta, Math.max(3, migliore.d - 3)), -0.75, 0.15);
  }

  function posa(lev) {
    const t = stato.tempo;
    const fase = lev?.fase ?? 'emerso';
    const tf = stato.tempoFase;
    const marea = (livelloVasca(lev) - DELTA.fondo);
    const ondeggia = Math.sin(t * 0.45) * 0.9 + Math.sin(t * 0.23 + 1) * 0.5;
    const respiro = Math.sin(t * 0.9);
    const ruggito = liscio(0, 0.25, stato.ruggito) * liscio(0, 0.5, stato.ruggito);
    const sputo = liscio(0, 0.2, stato.sputo);
    let testa;
    let avanti;
    let h = 1;
    let mascella = 0.08 + respiro * 0.03;
    let collo = null;
    let tremore = 0;
    const faseElica = t * 0.05;
    const emersa = () => {
      const beccheggio = stato.sguardo + ruggito * 0.75 + sputo * 0.15;
      testa = v3(ondeggia * 0.9, 10.2 + respiro * 0.25 + ruggito * 0.9 + marea * 0.5, 2.0 - ruggito * 0.9);
      avanti = direzione(beccheggio, ondeggia * 0.08);
      mascella = Math.max(mascella, ruggito * 0.95, sputo * 0.75);
    };
    if (fase === 'risveglio') {
      const p = 1 - limita((lev?.timer ?? 0) / A.RISVEGLIO);
      h = liscio(0.1, 0.95, p);
      testa = v3(0, 10.4, 1.2);
      avanti = direzione(mix(0.75, -0.05, liscio(0.82, 1, p)));
      mascella = liscio(0.7, 0.85, p) * (1 - liscio(0.97, 1, p)) * 1.05;
      tremore = (1 - liscio(0.85, 1, p)) * 0.08;
    } else if (fase === 'immerso') {
      if (tf < TUFFO) {
        const k = liscio(0, TUFFO, tf);
        testa = v3(0, mix(10.2, 3.5, k), mix(2.0, 7.0, k));
        avanti = direzione(mix(stato.sguardo, -1.35, liscio(0, 0.8, tf)));
        h = 1 - liscio(0.35, TUFFO, tf);
        mascella = 0.3 * (1 - k);
      } else return null;
    } else if (fase === 'riemersione') {
      const k = tf / A.RIEMERSIONE;
      h = Math.min(1.12, liscio(0, 0.32, k) * 1.12) - liscio(0.45, 1, k) * 0.12;
      testa = v3(0, 10.6, 1.6);
      avanti = direzione(mix(0.7, stato.sguardo, liscio(0.55, 1, k)));
      mascella = liscio(0.1, 0.25, k) * (1 - liscio(0.6, 0.8, k)) * 1.1;
      tremore = 0.05;
    } else if (fase === 'stordito') {
      const k = liscio(0, 1.2, tf);
      const spasmo = Math.max(0, Math.sin(t * 7.3)) ** 8 * 0.25;
      testa = v3(Math.sin(t * 0.8) * 0.3 * k, mix(10.2, 2.9, k) + spasmo, mix(2.0, 6.8, k));
      avanti = direzione(mix(stato.sguardo, 0.3, k), Math.sin(t * 0.6) * 0.06);
      collo = [v3(0, mix(6.2, 4.6, k), mix(-0.9, 3.4, k)), v3(0, mix(1.8, 2.6, k), mix(-0.4, 0.6, k))];
      mascella = mix(mascella, 0.68 + Math.sin(t * 2.1) * 0.04, k);
      tremore = 0.02 + spasmo * 0.2;
    } else if (fase === 'morte') {
      const urlo = 1 - liscio(1.8, 2.6, tf);
      const cade = liscio(2.2, 4.8, tf);
      h = 1 - liscio(4.6, 8.6, tf) * 1.45;
      testa = v3(mix(0, 1.2, cade), mix(11.6, 1.5, cade), mix(0.9, -6.2, cade));
      avanti = direzione(mix(0.8, 1.35, cade), cade * 0.3);
      collo = [v3(0.4 * cade, mix(6.5, 7.2, cade), mix(-0.6, 1.6, cade)), v3(0.2 * cade, mix(2, 3.5, cade), mix(-0.4, 1.4, cade))];
      mascella = mix(1.15, 0.5, cade) * (urlo * 0.9 + 0.1 + cade * 0.4);
      tremore = urlo * 0.12;
    } else emersa();
    if (tremore) testa.add(v3((Math.random() - 0.5) * tremore, (Math.random() - 0.5) * tremore, (Math.random() - 0.5) * tremore));
    if (!avanti) emersa();
    return { punti: posaVasca({ testa, avanti, h, fase: faseElica, collo }), avanti, mascella };
  }

  function posaNuoto() {
    const ang = Math.atan2(stato.z.z - DELTA.z, stato.z.x - DELTA.x);
    const t = stato.tempo;
    const punti = [];
    for (let k = 0; k <= 12; k++) {
      const s = k * 4;
      const a = ang - s / RAGGIO_NUOTO;
      const r = RAGGIO_NUOTO + Math.sin(s * 0.28 - t * 2.4) * 1.8 * liscio(0, 8, s);
      punti.push(v3(Math.cos(a) * r, QUOTA_NUOTO + Math.sin(s * 0.17 - t * 1.3) * 1.1, Math.sin(a) * r));
    }
    const avanti = punti[0].clone().sub(punti[1]).normalize();
    return { punti, avanti, mascella: 0.15 + Math.sin(t * 1.1) * 0.1 };
  }

  function piazzaCorpo(posizione, yaw) {
    radice.updateMatrixWorld();
    temp.q.setFromAxisAngle(SU, yaw);
    temp.m.compose(posizione, temp.q, temp.s.set(1, 1, 1));
    temp.m.premultiply(temp.inversa.copy(radice.matrixWorld).invert());
    temp.m.decompose(corpo.position, corpo.quaternion, corpo.scale);
  }

  function posizionaTesta(punti, avanti, apertura) {
    const su = temp.y.copy(SU).addScaledVector(avanti, -avanti.y);
    if (su.lengthSq() < 1e-4) su.set(0, 0, -1);
    su.normalize();
    const destra = temp.x.crossVectors(su, avanti).normalize();
    su.crossVectors(avanti, destra).normalize();
    temp.m.makeBasis(destra, su, avanti);
    capo.position.copy(punti[0]);
    capo.quaternion.setFromRotationMatrix(temp.m);
    mascella.rotation.x = apertura;
    return su;
  }

  function anima(zz, dt, vista) {
    const lev = vista?.abisso?.leviatano ?? null;
    stato.ultimoLev = lev;
    stato.z = zz;
    stato.tempo += dt;
    const fase = lev?.fase ?? 'emerso';
    if (fase !== stato.fase) {
      if (stato.fase !== null && !(fase === 'immerso' || stato.fase === 'immerso')) {
        stato.puntiPrima = curva.points.map(p => p.clone());
        stato.transizione = 0;
      }
      if (fase === 'riemersione' || fase === 'emerso') ruggisci(fase === 'riemersione' ? 1.8 : 1.3);
      if (fase === 'riemersione' || fase === 'risveglio') stato.bagnato = 1;
      stato.fase = fase;
      stato.tempoFase = 0;
    }
    stato.tempoFase += dt;
    for (const azione of lev?.azioni ?? []) {
      if (stato.viste.has(azione.id)) continue;
      stato.viste.add(azione.id);
      if (azione.tipo === 'acido') stato.sputo = A.ACIDO_MIRA + 0.2;
      ruggisci(azione.tipo === 'acido' ? 0.9 : 1.4);
    }
    stato.ruggito = Math.max(0, stato.ruggito - dt);
    stato.sputo = Math.max(0, stato.sputo - dt);
    stato.bagnato = Math.max(0, stato.bagnato - dt / 25);
    if (fase === 'emerso' || fase === 'riemersione') stato.yaw = angoloVerso(stato.yaw, zz.yaw, dt * 1.4);
    const quotaTesta = DELTA.fondo + 10.5;
    stato.sguardo = avvicina(stato.sguardo, sguardoVerso(vista, quotaTesta), dt * 1.5);
    let pose = posa(lev);
    stato.mondo = !pose;
    if (stato.mondo) {
      pose = posaNuoto();
      piazzaCorpo(temp.p.set(DELTA.x, 0, DELTA.z), 0);
    } else piazzaCorpo(temp.p.set(DELTA.x, DELTA.fondo, DELTA.z), stato.yaw);
    if (stato.puntiPrima && stato.transizione < 1 && !stato.mondo) {
      stato.transizione = Math.min(1, stato.transizione + dt / 0.7);
      const k = liscio(0, 1, stato.transizione);
      pose.punti.forEach((p, i) => stato.puntiPrima[i] && p.lerp(stato.puntiPrima[i], 1 - k));
    }
    curva.points = pose.punti;
    curva.updateArcLengths();
    const avanti = pose.avanti.clone().normalize();
    const su = posizionaTesta(pose.punti, avanti, pose.mascella);
    frameOssa(ossa, curva, su.clone().negate(), 0.035 * Math.sin(stato.tempo * 0.9));
    const pulsazione = 0.5 + 0.5 * Math.sin(stato.tempo * (fase === 'stordito' ? 7.5 : 2.4));
    const morente = fase === 'morte' ? 1 - liscio(1.5, 9, stato.tempoFase) : 1;
    stato.luce = avvicina(stato.luce, morente, dt * 3);
    const lampeggio = fase === 'morte' && stato.tempoFase < 2.4 ? (Math.random() < 0.3 ? 1.6 : 0.8) : 1;
    const forteCuore = fase === 'stordito' ? 1 : liscio(0.05, 0.5, pose.mascella);
    cuore.scale.setScalar(1 + pulsazione * (fase === 'stordito' ? 0.28 : 0.08));
    mat.cuore.emissiveIntensity = (3 + pulsazione * 4 + forteCuore * 6) * stato.luce * lampeggio;
    aloneCuore.scale.setScalar((1.6 + forteCuore * 3.5 + pulsazione * forteCuore * 2.5) * stato.luce);
    aloneCuore.material.opacity = 0.35 + forteCuore * 0.65;
    mat.carne.emissiveIntensity = (1 + forteCuore * 2.2 + pulsazione * forteCuore) * stato.luce;
    const occhiLuce = (fase === 'stordito' ? 0.35 + Math.random() * 0.3 : 1) * stato.luce * lampeggio;
    mat.occhioCiano.emissiveIntensity = mat.occhioArancio.emissiveIntensity = 4.2 * occhiLuce;
    occhi.forEach((o, i) => {
      const spento = fase === 'morte' && stato.tempoFase > 2.5 + i * 0.6;
      o.alone.visible = !spento;
      o.alone.scale.setScalar(o.base * (0.8 + occhiLuce * 0.4));
      o.sfera.visible = true;
    });
    mat.pelle.emissiveIntensity = mat.pelleTesta.emissiveIntensity = (1.25 + Math.sin(stato.tempo * 1.6) * 0.35) * stato.luce * lampeggio;
    mat.luci.emissiveIntensity = (2.2 + pulsazione * 1.2) * stato.luce;
    mat.pelle.roughness = mat.pelleTesta.roughness = mix(0.82, 0.35, stato.bagnato);
    mat.uniformiOnda.uOnda.value = stato.tempo;
    radice.updateMatrixWorld(true);
  }

  const controllo = {
    corpo, ossa, capo, stato,
    bocca: (esito = v3()) => bocca.getWorldPosition(esito),
    cuore: (esito = v3()) => cuore.getWorldPosition(esito),
    testa: (esito = v3()) => testa.getWorldPosition(esito),
    raggioOsso: i => raggioCorpo(i * PASSO),
    anima,
  };
  istanza = controllo;

  return {
    corpo, testa, mixer: vuotoMixer(),
    anima,
    chiudi: () => {
      if (istanza === controllo) istanza = null;
      if (stato.ultimoLev?.fase === 'morte' && stato.tempoFase < 9 && scena) {
        scena.add(radice);
        superstite = { controllo, radice };
        return;
      }
      corpo.removeFromParent();
    },
  };
}

function modelloSemplice() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(2, 2.4, 13, 12), new THREE.MeshStandardMaterial({ color: 0x2a3a40 })));
  return g;
}

export const PROCEDURALI_ABISSO = Object.freeze({
  leviatano: {
    dati: Object.freeze({ alto: 13, raggio: 3.4, raggioTesta: 2.6, procedurale: true, reazione: 0.1 }),
    get modello() { return modelloSemplice(); },
    costruisci: costruisciLeviatano,
  },
});

const VERT_PARTICELLE = `
attribute vec2 angolo;
attribute vec3 dati;
attribute vec3 colore;
varying vec2 vAngolo;
varying vec4 vColore;
varying float vAnello;
#include <fog_pars_vertex>
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float c = cos(dati.z);
  float s = sin(dati.z);
  mvPosition.xy += vec2(c * angolo.x - s * angolo.y, s * angolo.x + c * angolo.y) * abs(dati.x);
  gl_Position = projectionMatrix * mvPosition;
  vAngolo = angolo;
  vColore = vec4(colore, dati.y);
  vAnello = dati.x < 0.0 ? 1.0 : 0.0;
  #include <fog_vertex>
}`;
const FRAG_PARTICELLE = `
varying vec2 vAngolo;
varying vec4 vColore;
varying float vAnello;
#include <fog_pars_fragment>
void main() {
  float d = length(vAngolo);
  if (d > 1.0) discard;
  float morbido = pow(max(1.0 - d, 0.0), 1.7);
  float bolla = smoothstep(1.0, 0.84, d) * (0.15 + 0.85 * smoothstep(0.55, 0.92, d)) + smoothstep(0.32, 0.0, length(vAngolo - vec2(-0.32, 0.32))) * 0.7;
  gl_FragColor = vec4(vColore.rgb, mix(morbido, bolla, vAnello) * vColore.a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

function creaNuvola(scena, massimo, additiva) {
  const geometria = new THREE.BufferGeometry();
  const posizioni = new Float32Array(massimo * 12);
  const angoli = new Float32Array(massimo * 8);
  const dati = new Float32Array(massimo * 12);
  const colori = new Float32Array(massimo * 12);
  const indici = new Uint32Array(massimo * 6);
  for (let i = 0; i < massimo; i++) {
    angoli.set([-1, -1, 1, -1, 1, 1, -1, 1], i * 8);
    indici.set([i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3], i * 6);
  }
  geometria.setAttribute('position', new THREE.BufferAttribute(posizioni, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setAttribute('angolo', new THREE.BufferAttribute(angoli, 2));
  geometria.setAttribute('dati', new THREE.BufferAttribute(dati, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setAttribute('colore', new THREE.BufferAttribute(colori, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setIndex(new THREE.BufferAttribute(indici, 1));
  geometria.setDrawRange(0, 0);
  const materiale = new THREE.ShaderMaterial({
    vertexShader: VERT_PARTICELLE, fragmentShader: FRAG_PARTICELLE, uniforms: THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
    transparent: true, depthWrite: false, fog: true, blending: additiva ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const mesh = new THREE.Mesh(geometria, materiale);
  mesh.frustumCulled = false;
  mesh.renderOrder = additiva ? 6 : 5;
  scena.add(mesh);
  const P = { x: new Float32Array(massimo), y: new Float32Array(massimo), z: new Float32Array(massimo), vx: new Float32Array(massimo), vy: new Float32Array(massimo), vz: new Float32Array(massimo), vita: new Float32Array(massimo), durata: new Float32Array(massimo), d0: new Float32Array(massimo), d1: new Float32Array(massimo), r: new Float32Array(massimo), g: new Float32Array(massimo), b: new Float32Array(massimo), a: new Float32Array(massimo), gravita: new Float32Array(massimo), attrito: new Float32Array(massimo), rot: new Float32Array(massimo), anello: new Uint8Array(massimo), suolo: new Float32Array(massimo) };
  let vivi = 0;
  const chiavi = Object.keys(P);
  return {
    emetti(x, y, z, vx, vy, vz, { durata = 1, d0 = 0.3, d1 = 0.6, colore = COLORE_SCHIUMA, alfa = 1, gravita = 0, attrito = 0, anello = false, suolo = -1e9 } = {}) {
      if (vivi >= massimo) return;
      const i = vivi++;
      P.x[i] = x;
      P.y[i] = y;
      P.z[i] = z;
      P.vx[i] = vx;
      P.vy[i] = vy;
      P.vz[i] = vz;
      P.vita[i] = 0;
      P.durata[i] = durata;
      P.d0[i] = d0;
      P.d1[i] = d1;
      P.r[i] = colore.r;
      P.g[i] = colore.g;
      P.b[i] = colore.b;
      P.a[i] = alfa;
      P.gravita[i] = gravita;
      P.attrito[i] = attrito;
      P.rot[i] = Math.random() * 6.28;
      P.anello[i] = anello ? 1 : 0;
      P.suolo[i] = suolo;
    },
    aggiorna(dt) {
      for (let i = 0; i < vivi; i++) {
        P.vita[i] += dt;
        if (P.vita[i] >= P.durata[i] || P.y[i] < P.suolo[i]) {
          vivi--;
          for (const k of chiavi) P[k][i] = P[k][vivi];
          i--;
          continue;
        }
        const smorza = Math.max(0, 1 - P.attrito[i] * dt);
        P.vx[i] *= smorza;
        P.vy[i] = P.vy[i] * smorza - P.gravita[i] * dt;
        P.vz[i] *= smorza;
        P.x[i] += P.vx[i] * dt;
        P.y[i] += P.vy[i] * dt;
        P.z[i] += P.vz[i] * dt;
      }
      for (let i = 0; i < vivi; i++) {
        const f = P.vita[i] / P.durata[i];
        const dim = (P.d0[i] + (P.d1[i] - P.d0[i]) * f) * (P.anello[i] ? -1 : 1);
        const alfa = P.a[i] * Math.min(1, f * 8) * (1 - f) ** 1.2;
        for (let k = 0; k < 4; k++) {
          const o = (i * 4 + k) * 3;
          posizioni[o] = P.x[i];
          posizioni[o + 1] = P.y[i];
          posizioni[o + 2] = P.z[i];
          dati[o] = dim;
          dati[o + 1] = alfa;
          dati[o + 2] = P.rot[i];
          colori[o] = P.r[i];
          colori[o + 1] = P.g[i];
          colori[o + 2] = P.b[i];
        }
      }
      geometria.setDrawRange(0, vivi * 6);
      for (const nome of ['position', 'dati', 'colore']) {
        const a = geometria.attributes[nome];
        a.clearUpdateRanges();
        a.addUpdateRange(0, vivi * 12);
        a.needsUpdate = true;
      }
    },
    svuota() {
      vivi = 0;
      geometria.setDrawRange(0, 0);
    },
    get vivi() { return vivi; },
  };
}

function geometriaSettore(ampiezza, r0, r1) {
  const raggi = [];
  for (let r = r0; r <= r1 + 1e-6; r += 0.5) raggi.push([r, quotaAnello(r)]);
  for (let k = 0; k < 12; k++) {
    const rb = DELTA.platea + k * DELTA.gradone;
    if (rb > r0 && rb < r1) raggi.push([rb - 0.001, quotaAnello(rb - 0.01)], [rb + 0.001, quotaAnello(rb + 0.01)]);
  }
  raggi.sort((a, b) => a[0] - b[0]);
  const na = Math.max(8, Math.ceil(ampiezza * 24));
  return griglia(na, raggi.length - 1, (u, v, p) => {
    const [r, y] = raggi[Math.round(v * (raggi.length - 1))];
    const a = u * ampiezza;
    p.set(Math.cos(a) * r, y + 0.05, Math.sin(a) * r);
  });
}

function aggiornaDisco(g, x, z, raggio) {
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i) - 0.5;
    const w = uv.getY(i) - 0.5;
    const px = x + u * 2 * raggio;
    const pz = z + w * 2 * raggio;
    p.setXYZ(i, px, quotaDelta(px, pz) + 0.06, pz);
  }
  p.needsUpdate = true;
  g.computeBoundingSphere();
}

function creaDecalchi(scena, quanti, materialeBase) {
  const liberi = [];
  const tutti = [];
  for (let i = 0; i < quanti; i++) {
    const g = new THREE.PlaneGeometry(1, 1, 14, 14).rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, materialeBase.clone());
    m.material.map = materialeBase.map.clone();
    m.visible = false;
    m.renderOrder = 4;
    scena.add(m);
    liberi.push(m);
    tutti.push(m);
  }
  return {
    prendi(x, z, raggio) {
      const m = liberi.pop();
      if (!m) return null;
      aggiornaDisco(m.geometry, x, z, raggio);
      m.scale.set(1, 1, 1);
      m.position.set(0, 0, 0);
      m.visible = true;
      return m;
    },
    rendi(m) {
      if (!m) return;
      m.visible = false;
      liberi.push(m);
    },
    tutti,
  };
}

function creaCrepeCupola(scena) {
  const caso = generatore(53);
  const nastri = [];
  const centro = v3(DELTA.x, CUPOLA.y, DELTA.z);
  const sullaCupola = (az, th, dentro = 0.985) => centro.clone().add(v3(Math.sin(th) * Math.cos(az), Math.cos(th), Math.sin(th) * Math.sin(az)).multiplyScalar(CUPOLA.raggio * dentro));
  const sorgenti = [];
  for (const [k, fascia] of PANNELLI_CREPATI) {
    const az0 = k * CUPOLA.spicchio + 0.03;
    const az1 = (k + 1) * CUPOLA.spicchio - 0.03;
    const th0 = CUPOLA.fasce[fascia] + 0.025;
    const th1 = CUPOLA.fasce[fascia + 1] - 0.025;
    const az = mix(az0, az1, 0.3 + caso() * 0.4);
    const th = mix(th0, th1, 0.3 + caso() * 0.4);
    sorgenti.push(sullaCupola(az, th, 0.97));
    const linea = (a, t, ang, passi, larghezza, rami) => {
      const punti = [sullaCupola(a, t)];
      for (let i = 0; i < passi; i++) {
        ang += (caso() - 0.5) * 0.9;
        const na = a + (Math.cos(ang) * 0.42) / (CUPOLA.raggio * Math.max(0.15, Math.sin(t)));
        const nt = t + (Math.sin(ang) * 0.42) / CUPOLA.raggio;
        if (na < az0 || na > az1 || nt < th0 || nt > th1) break;
        a = na;
        t = nt;
        punti.push(sullaCupola(a, t));
        if (rami > 0 && caso() < 0.2) linea(a, t, ang + (caso() < 0.5 ? 1 : -1), Math.floor(passi * 0.55), larghezza * 0.6, rami - 1);
      }
      if (punti.length > 1) nastri.push({ punti, larghezza });
    };
    for (let i = 0; i < 8; i++) linea(az, th, (i / 8) * Math.PI * 2 + caso() * 0.3, 16 + Math.floor(caso() * 14), 0.1 + caso() * 0.05, 2);
    const anello = [];
    for (let i = 0; i <= 14; i++) {
      const g = (i / 14) * Math.PI * 2;
      const r = 0.6 + caso() * 0.25;
      anello.push(sullaCupola(az + (Math.cos(g) * r) / (CUPOLA.raggio * Math.sin(th)), th + (Math.sin(g) * r) / CUPOLA.raggio));
    }
    nastri.push({ punti: anello, larghezza: 0.08 });
  }
  const pos = [];
  const ind = [];
  for (const { punti, larghezza } of nastri) {
    const base = pos.length / 3;
    punti.forEach((p, k) => {
      const prossimo = punti[Math.min(punti.length - 1, k + 1)];
      const prima = punti[Math.max(0, k - 1)];
      const t = prossimo.clone().sub(prima).normalize();
      const n = p.clone().sub(centro).normalize();
      const lato = t.clone().cross(n).normalize().multiplyScalar(larghezza * (1 - (k / punti.length) * 0.75));
      pos.push(p.x + lato.x, p.y + lato.y, p.z + lato.z, p.x - lato.x, p.y - lato.y, p.z - lato.z);
      if (k < punti.length - 1) ind.push(base + k * 2, base + k * 2 + 1, base + k * 2 + 2, base + k * 2 + 1, base + k * 2 + 3, base + k * 2 + 2);
    });
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(ind);
  g.computeBoundingSphere();
  const materiale = new THREE.MeshBasicMaterial({ color: 0xbff6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
  const mesh = new THREE.Mesh(g, materiale);
  mesh.visible = false;
  mesh.renderOrder = 7;
  scena.add(mesh);
  return { mesh, sorgenti };
}

function creaSchermoLampo(camera) {
  if (!camera) return null;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0xdff8ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, fog: false }));
  m.position.set(0, 0, -0.35);
  m.renderOrder = 999;
  m.visible = false;
  m.frustumCulled = false;
  camera.add(m);
  return m;
}

export function creaScenaLeviatano(kit) {
  kitAttivo = kit;
  const scena = kit.scena;
  const prova = new THREE.Group();
  prova.visible = false;
  prova.userData.soloPrecompila = true;
  scena.add(prova);
  costruisciLeviatano({ yaw: 0 }, prova, null);
  istanza = null;
  const geo = geometrieLeviatano();
  const mat = materialiLeviatano(kit);
  const densita = kit.qualita?.densita ?? 1;
  const normale = creaNuvola(scena, Math.round(1600 * Math.max(0.5, densita)), false);
  const additiva = creaNuvola(scena, Math.round(1000 * Math.max(0.5, densita)), true);
  const emissione = densita < 1 ? 0.6 : 1;

  const tentacoli = Array.from({ length: TENTACOLI }, (_, k) => {
    const gruppo = new THREE.Group();
    const ossa = Array.from({ length: OSSA_TENTACOLO }, (_, i) => {
      const o = new THREE.Bone();
      o.position.set(0, -i * PASSO_TENTACOLO, 0);
      gruppo.add(o);
      return o;
    });
    const scheletro = new THREE.Skeleton(ossa, ossa.map((_, i) => new THREE.Matrix4().makeTranslation(0, i * PASSO_TENTACOLO, 0)));
    const mesh = new THREE.SkinnedMesh(geo.tentacolo, mat.pelleTentacolo);
    mesh.bind(scheletro, new THREE.Matrix4());
    mesh.frustumCulled = false;
    kit.ombra(mesh, true, true);
    gruppo.add(mesh);
    gruppo.visible = false;
    scena.add(gruppo);
    const base = Math.PI / 4 + k * (Math.PI / 2);
    return { gruppo, ossa, base, angolo: base, punti: posaOzio(base, 0, k).map(p => p.clone()), azione: null, curva: new THREE.CatmullRomCurve3(posaOzio(base, 0, k), false, 'centripetal'), visibile: 0 };
  });

  function posaOzio(a, t, k) {
    const w = Math.sin(t * 0.8 + k * 1.7);
    const w2 = Math.sin(t * 1.3 + k * 2.3);
    return [polare(a, 3.0, -12), polare(a, 4.0, -7), polare(a + 0.04, 5.0, -2.6 + w * 0.5), polare(a + 0.08 + w2 * 0.03, 6.0, 1.0 + w * 1.6), polare(a + 0.12, 7.1, -0.3 + w2 * 0.8), polare(a + 0.16, 7.9, -4.5), polare(a + 0.3, 7.3, -9), polare(a + 0.5, 6.2, -13)];
  }
  const posaAlzata = (a, t, tremore) => {
    const q = Math.sin(t * 23) * tremore;
    return [polare(a, 3.0, -12), polare(a, 5.0, -6), polare(a, 7.0, -0.8), polare(a + q * 0.01, 7.8, 5), polare(a + q * 0.02, 7.4 + q * 0.1, 10.5), polare(a + q * 0.03, 6.0, 13.6), polare(a, 4.4, 13.8 + q * 0.2), polare(a - 0.05, 3.6, 11.5)];
  };
  const posaColpo = a => [polare(a, 4.4, -10), polare(a, 6.6, -5), polare(a, 8.5, -1.3), polare(a, 10.2, -1.75), polare(a, 13, -2.0), polare(a, 16, -1.3), polare(a, 19, -0.45), polare(a, 23, 0.1)];
  const posaStordita = (a, t, k) => {
    const s = Math.max(0, Math.sin(t * 5 + k * 2)) ** 6 * 0.4;
    return [polare(a, 4.4, -10), polare(a, 6.6, -5), polare(a, 8.6, -1.3), polare(a + 0.03, 10, -2.1 + s), polare(a + 0.06, 12, -2.45 + s * 0.6), polare(a + 0.16, 14, -2.2), polare(a + 0.3, 15.5, -1.75), polare(a + 0.5, 16.5, -1.55)];
  };
  const sommergi = (punti, quanto) => punti.map(p => p.clone().add(v3(0, -quanto, 0)));

  const decalco = new THREE.MeshBasicMaterial({ map: texturaPericolo(), color: 0xff4a1a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
  const settori = Array.from({ length: 3 }, () => {
    const m = new THREE.Mesh(geometriaSettore(A.SPAZZATA_ARCO * 2, A.SPAZZATA_RAGGI[0], A.SPAZZATA_RAGGI[1]), decalco.clone());
    m.material.map = decalco.map.clone();
    m.material.map.repeat.set(Math.round(A.SPAZZATA_ARCO * 2 * 14.5 / 2.4), 1);
    m.material.map.needsUpdate = true;
    m.position.set(DELTA.x, 0, DELTA.z);
    m.visible = false;
    m.renderOrder = 4;
    scena.add(m);
    return { mesh: m, id: null };
  });

  const segni = creaDecalchi(scena, 24, new THREE.MeshBasicMaterial({ map: texturaAnello(), color: 0x9dff4a, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
  const pozze = creaDecalchi(scena, 30, new THREE.MeshBasicMaterial({ map: texturaAcido(), color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }));
  const MASSIMO_SFERE = 40;
  const sfere = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.42, 2), new THREE.MeshStandardMaterial({ color: 0x1a4a08, emissive: 0x8dff3a, emissiveIntensity: 3.2, roughness: 0.2 }), MASSIMO_SFERE);
  const aloniSfere = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.9, 1), new THREE.MeshBasicMaterial({ color: 0x5aff2a, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }), MASSIMO_SFERE);
  for (const m of [sfere, aloniSfere]) {
    m.count = 0;
    m.frustumCulled = false;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scena.add(m);
  }
  const crepe = creaCrepeCupola(scena);
  for (const sorgente of crepe.sorgenti) sorgente.suolo = quotaAnello(Math.hypot(sorgente.x - DELTA.x, sorgente.z - DELTA.z)) - 1;
  const schermo = creaSchermoLampo(kit.camera);

  const S = {
    lev: null, tempo: 0, lampo: 0, schermo: 0, crepe: 0, crepeAttive: false, getti: 0, morte: -1, bolle: 0, ribolle: 0,
    spazzate: new Map(), acidi: new Map(), pozze: new Map(), visto: false, faseUltima: null, x: DELTA.x, z: DELTA.z,
  };

  kit.luce({
    x: DELTA.x, y: 7, z: DELTA.z, colore: 0x6fe8ff, intensita: 0, portata: 34,
    attiva: v => !!v?.abisso?.leviatano,
    forza: () => {
      const lev = S.lev;
      if (!lev) return 0;
      const base = lev.fase === 'stordito' ? 26 : lev.fase === 'immerso' ? 4 : lev.fase === 'morte' ? 14 * (1 - liscio(2, 9, S.tempo - S.morte)) : 10;
      return base + S.lampo * 160;
    },
    colorePer: () => (S.lampo > 0.08 ? 0xe8fbff : S.lev?.fase === 'stordito' ? 0x7ff6ff : 0x4fd4ff),
  });

  const tmp = { a: v3(), b: v3(), c: v3(), m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: v3(1, 1, 1) };
  const caso = Math.random;

  function spruzzo(centro, quanti, { forza = 6, alto = 9, raggio = 1, colore = COLORE_ACQUA, durata = 1.6, dimensione = 0.5 } = {}) {
    const n = Math.round(quanti * emissione);
    for (let i = 0; i < n; i++) {
      const a = caso() * Math.PI * 2;
      const r = Math.sqrt(caso()) * raggio;
      const v = forza * (0.4 + caso() * 0.6);
      normale.emetti(centro.x + Math.cos(a) * r, centro.y, centro.z + Math.sin(a) * r, Math.cos(a) * v * 0.5, alto * (0.5 + caso() * 0.7), Math.sin(a) * v * 0.5, {
        durata: durata * (0.6 + caso() * 0.6), d0: dimensione * 0.5, d1: dimensione * (1.5 + caso()), colore, alfa: 0.75, gravita: 9.8, attrito: 0.4, suolo: DELTA.acqua - 0.5,
      });
    }
    for (let i = 0; i < n * 0.4; i++) {
      const a = caso() * Math.PI * 2;
      normale.emetti(centro.x + Math.cos(a) * raggio, centro.y + caso() * 2, centro.z + Math.sin(a) * raggio, Math.cos(a) * forza * 0.3, 0.5 + caso(), Math.sin(a) * forza * 0.3, {
        durata: 2.5 + caso() * 1.5, d0: dimensione * 2, d1: dimensione * 6, colore: COLORE_SCHIUMA, alfa: 0.22, gravita: -0.2, attrito: 0.8,
      });
    }
  }

  function bollicine(x, y, z, quante, colore = COLORE_SCHIUMA, alfa = 0.6) {
    for (let i = 0; i < quante * emissione; i++) {
      normale.emetti(x + (caso() - 0.5) * 2, y, z + (caso() - 0.5) * 2, (caso() - 0.5) * 0.4, 0.6 + caso() * 0.8, (caso() - 0.5) * 0.4, { durata: 0.6 + caso() * 0.6, d0: 0.08, d1: 0.22, colore, alfa, anello: true });
    }
  }

  function lampeggia(forza, schermoForza = 0) {
    S.lampo = Math.max(S.lampo, forza);
    S.schermo = Math.max(S.schermo, schermoForza);
  }

  function puntoBocca() {
    return istanza ? istanza.bocca(tmp.c) : tmp.c.set(DELTA.x, DELTA.fondo + 10.5, DELTA.z + 3);
  }

  function aggiornaTentacolo(tt, k, dt, lev) {
    const t = S.tempo;
    let voluta;
    let rapidita = 2.2;
    const az = tt.azione;
    if (!lev) voluta = sommergi(posaOzio(tt.base, t, k), 16);
    else if (az) {
      const c = S.tempo - az.impatto;
      if (c < 0) {
        voluta = posaAlzata(az.a0, t, liscio(-1.2, 0, c));
        rapidita = 3.2;
      } else if (c < 0.12) {
        voluta = posaColpo(az.a0);
        rapidita = 28;
      } else if (c < 0.52) {
        voluta = posaColpo(mix(az.a0, az.a1, liscio(0.12, 0.52, c)));
        rapidita = 40;
      } else if (c < 1.6) {
        voluta = sommergi(posaColpo(az.a1), liscio(0.6, 1.6, c) * 12);
        rapidita = 3;
      } else {
        tt.azione = null;
        voluta = posaOzio(tt.base, t, k);
      }
    } else if (lev.fase === 'stordito') {
      voluta = posaStordita(tt.base, t, k);
      rapidita = 1.6;
    } else if (lev.fase === 'immerso') voluta = sommergi(posaOzio(tt.base, t, k), 16);
    else if (lev.fase === 'risveglio') voluta = sommergi(posaOzio(tt.base, t, k), 16 * (1 - liscio(0.55, 1, 1 - lev.timer / A.RISVEGLIO)));
    else if (lev.fase === 'morte') {
      const m = S.tempo - S.morte;
      voluta = sommergi(posaOzio(tt.base + Math.sin(t * 6 + k) * 0.25, t * 4, k), liscio(1.5, 6, m) * 18);
      rapidita = 4;
    } else voluta = posaOzio(tt.base, t, k);
    for (let i = 0; i < tt.punti.length; i++) tt.punti[i].lerp(voluta[i], Math.min(1, dt * rapidita));
    tt.visibile = tt.punti.some(p => p.y > DELTA.acqua - 3);
    tt.gruppo.visible = !!lev && tt.visibile;
    if (!tt.gruppo.visible) return;
    tt.curva.points = tt.punti;
    tt.curva.updateArcLengths();
    const lungo = tt.curva.getLength();
    const fine = tt.curva.getPointAt(1);
    const coda = tt.curva.getTangentAt(1);
    const verso = tt.punti[2].clone().sub(polare(tt.base, 0, 0)).setY(0).normalize();
    const V = verso.clone();
    const Y = v3();
    const X = v3();
    const p = v3();
    const T = v3();
    for (let i = 0; i < tt.ossa.length; i++) {
      const s = i * PASSO_TENTACOLO;
      if (s <= lungo) {
        tt.curva.getPointAt(s / lungo, p);
        tt.curva.getTangentAt(s / lungo, T);
      } else {
        p.copy(fine).addScaledVector(coda, s - lungo);
        T.copy(coda);
      }
      Y.copy(T).negate();
      V.addScaledVector(Y, -Y.dot(V));
      if (V.lengthSq() < 1e-6) V.copy(SU).addScaledVector(Y, -Y.y);
      V.normalize();
      X.crossVectors(Y, V).normalize();
      tmp.m.makeBasis(X, Y, V);
      tt.ossa[i].position.copy(p);
      tt.ossa[i].quaternion.setFromRotationMatrix(tmp.m);
    }
  }

  function scegliTentacolo(preferito) {
    for (let k = 0; k < TENTACOLI; k++) {
      const tt = tentacoli[(preferito + k) % TENTACOLI];
      if (!tt.azione) return tt;
    }
    return tentacoli[preferito % TENTACOLI];
  }

  function aggiornaAzioni(lev, dt) {
    const presenti = new Set();
    for (const az of lev?.azioni ?? []) {
      presenti.add(az.id);
      if (az.tipo === 'spazzata') {
        let reg = S.spazzate.get(az.id);
        if (!reg) {
          const tt = scegliTentacolo(az.tentacolo ?? 0);
          reg = { a0: az.a0, a1: az.a1, impatto: S.tempo + az.t, tentacolo: tt, settore: settori.find(s => s.id === null) ?? null, fatto: false };
          if (reg.settore) reg.settore.id = az.id;
          tt.azione = reg;
          S.spazzate.set(az.id, reg);
        }
        reg.impatto = S.tempo + az.t;
      } else {
        let reg = S.acidi.get(az.id);
        if (!reg) {
          reg = { punti: az.punti.map(([x, z]) => ({ x, z, segno: segni.prendi(x, z, A.ACIDO_RAGGIO) })), t: az.t, da: puntoBocca().clone() };
          S.acidi.set(az.id, reg);
        }
        reg.t = az.t;
      }
    }
    for (const [id, reg] of S.spazzate) {
      const c = S.tempo - reg.impatto;
      if (!presenti.has(id) && !reg.fatto && c > -0.05) {
        reg.fatto = true;
        const tt = reg.tentacolo;
        for (let i = 0; i < 26 * emissione; i++) {
          const r = A.SPAZZATA_RAGGI[0] + caso() * (A.SPAZZATA_RAGGI[1] - A.SPAZZATA_RAGGI[0]);
          const p = polare(reg.a0 + (caso() - 0.5) * 0.2, r, quotaAnello(r) + 0.2);
          normale.emetti(p.x, p.y, p.z, (caso() - 0.5) * 3, 2 + caso() * 3, (caso() - 0.5) * 3, { durata: 1 + caso(), d0: 0.4, d1: 1.6, colore: COLORE_SCHIUMA, alfa: 0.45, gravita: 4, attrito: 1 });
        }
        lampeggia(0.12);
        if (tt) tt.colpito = S.tempo;
      }
      if (reg.settore) {
        const m = reg.settore.mesh;
        const prima = c < 0;
        m.visible = prima || c < 0.5;
        m.rotation.y = -reg.a0;
        const urgenza = liscio(-A.SPAZZATA_MIRA, 0, c);
        m.material.opacity = prima ? (0.35 + urgenza * 0.65) * (0.75 + 0.25 * Math.sin(S.tempo * (8 + urgenza * 20))) : 1 - liscio(0, 0.5, c);
        m.material.color.setHex(prima ? 0xff4a1a : 0xffd0a0);
        m.material.map.offset.x -= dt * (1 + urgenza * 3) * Math.sign(reg.a1 - reg.a0 || 1);
      }
      if (c > 1.8) {
        if (reg.settore) {
          reg.settore.id = null;
          reg.settore.mesh.visible = false;
        }
        if (reg.tentacolo?.azione === reg) reg.tentacolo.azione = null;
        S.spazzate.delete(id);
      }
    }
    let n = 0;
    const bocca = puntoBocca();
    for (const [id, reg] of S.acidi) {
      if (!presenti.has(id)) {
        for (const p of reg.punti) {
          const y = quotaDelta(p.x, p.z) + 0.1;
          for (let i = 0; i < 16 * emissione; i++) {
            const a = caso() * Math.PI * 2;
            const v = 1.5 + caso() * 3.5;
            additiva.emetti(p.x, y + 0.1, p.z, Math.cos(a) * v, 2 + caso() * 4, Math.sin(a) * v, { durata: 0.5 + caso() * 0.5, d0: 0.15, d1: 0.05, colore: COLORE_ACIDO, alfa: 1, gravita: 12 });
          }
          normale.emetti(p.x, y + 0.4, p.z, 0, 0.8, 0, { durata: 1.6, d0: 1, d1: 3.4, colore: new THREE.Color(0x6aa83a), alfa: 0.35, attrito: 1 });
          segni.rendi(p.segno);
        }
        kit.effetti?.esplosione?.(v3(reg.punti[0].x, quotaDelta(reg.punti[0].x, reg.punti[0].z) + 0.5, reg.punti[0].z), 'energia', 0x8dff3a);
        S.acidi.delete(id);
        continue;
      }
      const f = limita(1 - reg.t / A.ACIDO_MIRA);
      reg.da.lerp(bocca, 0.2 * (1 - f));
      for (const p of reg.punti) {
        if (p.segno) {
          const k = 0.35 + f * 0.65;
          p.segno.scale.set(k, 1, k);
          p.segno.position.set(p.x * (1 - k), 0, p.z * (1 - k));
          p.segno.material.opacity = 0.4 + f * 0.6 * (0.7 + 0.3 * Math.sin(S.tempo * 20));
        }
        if (n >= MASSIMO_SFERE) continue;
        const y1 = quotaDelta(p.x, p.z) + 0.3;
        const apice = Math.max(reg.da.y, y1) + 4;
        const x = mix(reg.da.x, p.x, f);
        const z = mix(reg.da.z, p.z, f);
        const y = (1 - f) * (1 - f) * reg.da.y + 2 * (1 - f) * f * (2 * apice - (reg.da.y + y1) / 2) + f * f * y1;
        const s = 0.85 + Math.sin(S.tempo * 18 + n) * 0.15;
        tmp.m.compose(tmp.a.set(x, y, z), tmp.q.identity(), tmp.s.set(s, s, s));
        sfere.setMatrixAt(n, tmp.m);
        aloniSfere.setMatrixAt(n, tmp.m);
        if (caso() < 0.7 * emissione) additiva.emetti(x, y, z, (caso() - 0.5) * 0.6, (caso() - 0.5) * 0.6, (caso() - 0.5) * 0.6, { durata: 0.45, d0: 0.5, d1: 0.1, colore: COLORE_ACIDO, alfa: 0.7 });
        n++;
      }
    }
    sfere.count = aloniSfere.count = n;
    sfere.instanceMatrix.needsUpdate = aloniSfere.instanceMatrix.needsUpdate = true;
  }

  function aggiornaPozze(lev) {
    const chiavi = new Set();
    for (const p of lev?.acidi ?? []) {
      const chiave = `${p.x},${p.z}`;
      chiavi.add(chiave);
      let reg = S.pozze.get(chiave);
      if (!reg) {
        const mesh = pozze.prendi(p.x, p.z, A.ACIDO_RAGGIO * 1.05);
        if (!mesh) continue;
        reg = { mesh, x: p.x, z: p.z, fase: caso() * 6 };
        S.pozze.set(chiave, reg);
      }
      const nasce = liscio(A.ACIDO_POZZA, A.ACIDO_POZZA - 0.35, p.timer);
      const svanisce = liscio(0, 1.2, p.timer);
      reg.mesh.material.opacity = 0.95 * nasce * svanisce * (0.85 + 0.15 * Math.sin(S.tempo * 3 + reg.fase));
      reg.mesh.material.map.rotation = S.tempo * 0.15 + reg.fase;
      reg.mesh.material.map.center.set(0.5, 0.5);
      if (caso() < 0.45 * emissione * svanisce) {
        const a = caso() * Math.PI * 2;
        const r = Math.sqrt(caso()) * A.ACIDO_RAGGIO * 0.8;
        const x = p.x + Math.cos(a) * r;
        const z = p.z + Math.sin(a) * r;
        additiva.emetti(x, quotaDelta(x, z) + 0.08, z, 0, 0.35 + caso() * 0.4, 0, { durata: 0.5 + caso() * 0.6, d0: 0.05, d1: 0.22 + caso() * 0.15, colore: COLORE_ACIDO, alfa: 0.8, anello: true });
        if (caso() < 0.3) normale.emetti(x, quotaDelta(x, z) + 0.2, z, 0, 0.5, 0, { durata: 1.4, d0: 0.4, d1: 1.4, colore: new THREE.Color(0x7ab84a), alfa: 0.18, attrito: 1 });
      }
    }
    for (const [chiave, reg] of S.pozze) {
      if (chiavi.has(chiave)) continue;
      reg.mesh.material.map.rotation = 0;
      pozze.rendi(reg.mesh);
      S.pozze.delete(chiave);
    }
  }

  function aggiornaCrepe(dt) {
    if (!S.crepeAttive) return;
    const vecchiaia = S.tempo - S.crepe;
    crepe.mesh.visible = true;
    crepe.mesh.material.opacity = 0.25 + Math.max(0, 1 - vecchiaia / 1.5) * 0.75 + Math.sin(S.tempo * 2.3) * 0.05;
    const getto = Math.max(0.15, 1 - vecchiaia / 12);
    for (const sorgente of crepe.sorgenti) {
      if (caso() > getto * 0.9 * emissione) continue;
      const verso = tmp.a.set(DELTA.x - sorgente.x, 0, DELTA.z - sorgente.z).normalize();
      normale.emetti(sorgente.x, sorgente.y, sorgente.z, verso.x * (1 + caso() * 2) * getto, -1 - caso() * 2, verso.z * (1 + caso() * 2) * getto, {
        durata: 3, d0: 0.15, d1: 0.5, colore: COLORE_ACQUA, alfa: 0.55, gravita: 9.8, suolo: sorgente.suolo,
      });
      if (caso() < 0.3) normale.emetti(sorgente.x, sorgente.y - 0.5, sorgente.z, verso.x * 0.6, -0.4, verso.z * 0.6, { durata: 3, d0: 0.8, d1: 2.5, colore: COLORE_SCHIUMA, alfa: 0.12, attrito: 0.5 });
    }
  }

  function aggiornaAcquaCorpo(lev) {
    if (!istanza || !lev) return;
    const st = istanza.stato;
    const acqua = livelloVasca(lev);
    const ossa = istanza.ossa;
    const p0 = tmp.a;
    const p1 = tmp.b;
    for (let i = 0; i < ossa.length - 1; i++) {
      ossa[i].getWorldPosition(p0);
      ossa[i + 1].getWorldPosition(p1);
      if ((p0.y - acqua) * (p1.y - acqua) > 0) continue;
      const f = (acqua - p0.y) / (p1.y - p0.y || 1);
      const x = mix(p0.x, p1.x, f);
      const z = mix(p0.z, p1.z, f);
      if (Math.hypot(x - DELTA.x, z - DELTA.z) > 8.5) continue;
      const r = istanza.raggioOsso(i + f) + 0.25;
      const moto = st.fase === 'risveglio' || st.fase === 'riemersione' || (st.fase === 'immerso' && !st.mondo) || st.fase === 'morte' ? 3 : 1;
      for (let k = 0; k < 2 * moto * emissione; k++) {
        const a = caso() * Math.PI * 2;
        normale.emetti(x + Math.cos(a) * r, acqua + 0.1, z + Math.sin(a) * r, Math.cos(a) * (0.6 + caso()), 0.2 + caso() * 0.6 * moto, Math.sin(a) * (0.6 + caso()), { durata: 1.4 + caso(), d0: 0.4, d1: 1.4, colore: COLORE_SCHIUMA, alfa: 0.4, attrito: 1.2 });
      }
      break;
    }
    if (st.bagnato > 0.05 && !st.mondo) {
      for (let k = 0; k < 6 * st.bagnato * emissione; k++) {
        const i = Math.floor(caso() * 9);
        ossa[i].getWorldPosition(p0);
        if (p0.y < acqua + 1) continue;
        const r = istanza.raggioOsso(i);
        const a = caso() * Math.PI * 2;
        normale.emetti(p0.x + Math.cos(a) * r, p0.y + (caso() - 0.5), p0.z + Math.sin(a) * r, Math.cos(a) * 0.4, -0.5, Math.sin(a) * 0.4, { durata: 1.6, d0: 0.08, d1: 0.16, colore: COLORE_ACQUA, alfa: 0.65, gravita: 9.8, suolo: acqua });
      }
    }
  }

  function aggiornaMorte(dt) {
    if (S.morte < 0) return;
    const m = S.tempo - S.morte;
    if (m > 10) {
      S.morte = -1;
      return;
    }
    const forza = 1 - liscio(6, 10, m);
    for (let i = 0; i < 10 * forza * emissione; i++) {
      const a = caso() * Math.PI * 2;
      const r = Math.sqrt(caso()) * 5;
      additiva.emetti(DELTA.x + Math.cos(a) * r, DELTA.acqua - 6 + caso() * 3, DELTA.z + Math.sin(a) * r, (caso() - 0.5) * 0.6, 3 + caso() * 4, (caso() - 0.5) * 0.6, {
        durata: 2.6 + caso() * 2, d0: 0.15, d1: 0.5 + caso() * 0.5, colore: caso() < 0.8 ? COLORE_CIANO : COLORE_ARANCIO, alfa: 0.85, anello: true, attrito: 0.15,
      });
    }
    if (caso() < forza * 0.6) bollicine(DELTA.x + (caso() - 0.5) * 8, livelloVasca(S.lev) + 0.05, DELTA.z + (caso() - 0.5) * 8, 6, COLORE_SCHIUMA, 0.7);
  }

  function aggiornaSuperstite(dt) {
    if (!superstite) return;
    const { controllo } = superstite;
    controllo.anima({ x: DELTA.x, z: DELTA.z, yaw: controllo.stato.yaw, stato: 'morto' }, dt, { abisso: { leviatano: { fase: 'morte', timer: 0, azioni: [], acidi: [], marea: S.lev?.marea ?? 0 } }, giocatori: [] });
    if (controllo.stato.tempoFase > 9.5 || !S.lev) {
      superstite.radice.removeFromParent();
      superstite = null;
    }
  }

  kit.ogniFotogramma((vista, dt) => {
    const lev = vista?.abisso?.leviatano ?? null;
    S.lev = lev;
    S.tempo += dt;
    S.lampo = Math.max(0, S.lampo - dt * 1.6);
    S.schermo = Math.max(0, S.schermo - dt * 1.4);
    if (schermo) {
      schermo.visible = S.schermo > 0.01;
      schermo.material.opacity = S.schermo * 0.85;
    }
    if (lev && S.faseUltima !== lev.fase) {
      if (lev.fase === 'risveglio' && !S.crepeAttive) avviaRisveglio();
      S.faseUltima = lev.fase;
    }
    if (!lev) {
      S.faseUltima = null;
      S.crepeAttive = false;
      crepe.mesh.visible = false;
      for (const s of settori) {
        s.mesh.visible = false;
        s.id = null;
      }
      for (const reg of S.acidi.values()) for (const p of reg.punti) segni.rendi(p.segno);
      S.acidi.clear();
      S.spazzate.clear();
      for (const reg of S.pozze.values()) pozze.rendi(reg.mesh);
      S.pozze.clear();
      sfere.count = aloniSfere.count = 0;
      for (const tt of tentacoli) {
        tt.azione = null;
        tt.gruppo.visible = false;
      }
    } else {
      tentacoli.forEach((tt, k) => aggiornaTentacolo(tt, k, dt, lev));
      aggiornaAzioni(lev, dt);
      aggiornaPozze(lev);
      aggiornaCrepe(dt);
      aggiornaAcquaCorpo(lev);
      if (lev.fase === 'risveglio') {
        const p = 1 - lev.timer / A.RISVEGLIO;
        if (caso() < 0.8) bollicine(DELTA.x + (caso() - 0.5) * 12, livelloVasca(lev) + 0.05, DELTA.z + (caso() - 0.5) * 12, 3 + p * 6, COLORE_SCHIUMA, 0.65);
      }
    }
    aggiornaSuperstite(dt);
    aggiornaMorte(dt);
    normale.aggiorna(dt);
    additiva.aggiorna(dt);
  });

  function avviaRisveglio() {
    S.crepeAttive = true;
    S.crepe = S.tempo;
    lampeggia(1, 0.9);
    for (const sorgente of crepe.sorgenti) {
      for (let i = 0; i < 40 * emissione; i++) {
        const verso = v3(DELTA.x - sorgente.x, 0, DELTA.z - sorgente.z).normalize();
        normale.emetti(sorgente.x, sorgente.y, sorgente.z, verso.x * (2 + caso() * 5) + (caso() - 0.5) * 3, -1 + caso() * 2, verso.z * (2 + caso() * 5) + (caso() - 0.5) * 3, {
          durata: 3 + caso(), d0: 0.12, d1: 0.08, colore: new THREE.Color(0xcfe8ee), alfa: 0.95, gravita: 9.8, suolo: sorgente.suolo,
        });
        if (i % 3 === 0) additiva.emetti(sorgente.x, sorgente.y, sorgente.z, (caso() - 0.5) * 6, (caso() - 0.5) * 6, (caso() - 0.5) * 6, { durata: 0.6, d0: 0.4, d1: 0.1, colore: COLORE_CIANO, alfa: 1 });
      }
    }
  }

  kit.suEvento((e, vista) => {
    const lev = vista?.abisso?.leviatano ?? S.lev;
    const acqua = livelloVasca(lev);
    if (e.k === 'leviatanoRisveglio') avviaRisveglio();
    else if (e.k === 'leviatanoRiemerge') {
      lampeggia(0.5, 0.25);
      spruzzo(v3(DELTA.x, acqua, DELTA.z), 260, { forza: 10, alto: 16, raggio: 4, durata: 2.4, dimensione: 0.7 });
      for (let i = 0; i < 80 * emissione; i++) {
        const a = (i / 80) * Math.PI * 2;
        normale.emetti(DELTA.x + Math.cos(a) * 5, acqua + 0.2, DELTA.z + Math.sin(a) * 5, Math.cos(a) * 6, 1 + caso() * 2, Math.sin(a) * 6, { durata: 1.6, d0: 0.6, d1: 2.2, colore: COLORE_SCHIUMA, alfa: 0.5, attrito: 1.4, gravita: 2 });
      }
    } else if (e.k === 'leviatanoImmerso') spruzzo(v3(DELTA.x, acqua, DELTA.z + 3), 160, { forza: 7, alto: 11, raggio: 3.5, durata: 2 });
    else if (e.k === 'leviatanoStordito') {
      const p = istanza ? istanza.testa(v3()) : v3(DELTA.x, DELTA.fondo, DELTA.z);
      spruzzo(v3(p.x, acqua, p.z), 120, { forza: 6, alto: 8, raggio: 3, durata: 1.8 });
      lampeggia(0.3);
    } else if (e.k === 'leviatanoMorte') {
      S.morte = S.tempo;
      lampeggia(1, 1);
      const p = istanza ? istanza.cuore(v3()) : v3(DELTA.x, DELTA.fondo + 9, DELTA.z);
      for (let i = 0; i < 160 * emissione; i++) {
        const d = v3(caso() - 0.5, caso() - 0.3, caso() - 0.5).normalize().multiplyScalar(6 + caso() * 14);
        additiva.emetti(p.x, p.y, p.z, d.x, d.y, d.z, { durata: 1 + caso() * 1.2, d0: 0.6, d1: 0.15, colore: caso() < 0.7 ? COLORE_CIANO : COLORE_ARANCIO, alfa: 1, gravita: 3, attrito: 0.8 });
      }
      for (let i = 0; i < 12; i++) additiva.emetti(p.x, p.y, p.z, 0, 0, 0, { durata: 0.8 + i * 0.08, d0: 2 + i, d1: 10 + i * 2, colore: COLORE_CIANO, alfa: 0.5 });
      kit.effetti?.esplosione?.(p, 'energia', 0x9ff8ff);
    }
  });

  kit.suSvuota(() => {
    normale.svuota();
    additiva.svuota();
    S.crepeAttive = false;
    S.morte = -1;
    if (superstite) {
      superstite.radice.removeFromParent();
      superstite = null;
    }
  });
}

