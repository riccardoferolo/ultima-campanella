import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { creaCaso } from './caso-grafica.js';

const VERDE = 0x6dff8a;
const SCALA_IN_MANO = 0.72;
const MISURA = 0.09;
const LATO_TEXTURE = 512;
const ORBITE = Object.freeze([{ x: -0.3, y: -0.08, z: -0.62 }, { x: 0.3, y: -0.08, z: -0.62 }]);
const CENTRO_RAGGI = Object.freeze({ x: 0, y: -0.05, z: -0.05 });
const PASSO_RAGGIO = 0.02;
const RAGGIO_MASSIMO = 1.7;

const cranii = new Map();
const occhi = new Map();
let risorse = null;

function valore(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function rumore(x, y, z) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const fx = x - xi;
  const fy = y - yi;
  const fz = z - zi;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const w = fz * fz * (3 - 2 * fz);
  const l = (a, b, t) => a + (b - a) * t;
  const c = (dx, dy, dz) => valore(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}

const frattale = (x, y, z) => rumore(x * 3, y * 3, z * 3) * 0.6 + rumore(x * 7, y * 7, z * 7) * 0.3 + rumore(x * 15, y * 15, z * 15) * 0.1;
const campana = (d, r) => (d >= r ? 0 : (1 - (d / r) ** 2) ** 2);
const dist = (p, c, sx = 1, sy = 1, sz = 1) => Math.hypot((p.x - c.x) / sx, (p.y - c.y) / sy, (p.z - c.z) / sz);

function tela(pittore, colore = true) {
  const canvas = document.createElement('canvas');
  canvas.width = LATO_TEXTURE;
  canvas.height = LATO_TEXTURE / 2;
  pittore(canvas.getContext('2d'), canvas.width, canvas.height, creaCaso(4711));
  const t = new THREE.CanvasTexture(canvas);
  if (colore) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function crepe(c, l, a, caso, quante, spessore) {
  for (let i = 0; i < quante; i++) {
    let x = caso() * l;
    let y = a * (0.08 + caso() * 0.7);
    let ang = caso() * Math.PI * 2;
    c.lineWidth = spessore * (0.6 + caso() * 0.8);
    c.beginPath();
    c.moveTo(x, y);
    for (let k = 0; k < 9 + caso() * 10; k++) {
      ang += (caso() - 0.5) * 1.1;
      x += Math.cos(ang) * (5 + caso() * 9);
      y += Math.sin(ang) * (3 + caso() * 6);
      c.lineTo(x, y);
    }
    c.stroke();
  }
}

function glifo(c, x, y, s, caso) {
  c.beginPath();
  const tipo = Math.floor(caso() * 4);
  if (tipo === 0) {
    for (let k = 0; k < 18; k++) {
      const t = k / 17;
      const r = s * (0.15 + t * 0.85);
      const g = t * Math.PI * 3.2;
      if (k === 0) c.moveTo(x + Math.cos(g) * r, y + Math.sin(g) * r);
      else c.lineTo(x + Math.cos(g) * r, y + Math.sin(g) * r);
    }
  } else if (tipo === 1) {
    c.moveTo(x - s, y + s);
    c.lineTo(x, y - s);
    c.lineTo(x + s, y + s);
    c.moveTo(x - s * 0.5, y + s * 0.1);
    c.lineTo(x + s * 0.5, y + s * 0.1);
  } else if (tipo === 2) {
    for (let k = -1; k <= 1; k++) {
      c.moveTo(x + k * s * 0.6, y - s);
      c.lineTo(x + k * s * 0.6, y + s * (k === 0 ? 0.4 : 1));
    }
    c.moveTo(x - s, y - s);
    c.lineTo(x + s, y - s);
  } else {
    c.moveTo(x, y - s);
    c.lineTo(x + s, y);
    c.lineTo(x, y + s);
    c.lineTo(x - s, y);
    c.closePath();
    c.moveTo(x, y - s * 0.4);
    c.lineTo(x, y + s * 0.4);
  }
  c.stroke();
}

function suture(c, l, a) {
  c.beginPath();
  for (let x = l * 0.52; x <= l * 0.98; x += 2) {
    const y = a * 0.13 + Math.sin(x * 0.7) * 2.2 + Math.sin(x * 0.13) * 4;
    if (x === l * 0.52) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
  c.beginPath();
  for (let x = l * 0.02; x <= l * 0.48; x += 2) {
    const y = a * 0.09 + Math.sin(x * 0.8) * 2 + Math.sin(x * 0.11) * 3;
    if (x === l * 0.02) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
}

function incisioni(c, l, a, caso) {
  c.lineCap = 'round';
  c.lineJoin = 'round';
  const fronte = l * 0.75;
  for (let i = 0; i < 9; i++) glifo(c, fronte + (i - 4) * 15, a * 0.3 + Math.sin(i * 1.7) * 6, 6 + caso() * 2, caso);
  c.beginPath();
  for (let x = l * 0.55; x <= l * 0.97; x += 3) {
    const y = a * 0.17 + Math.sin(x * 0.09) * 5 + Math.sin(x * 0.031) * 7;
    if (x === l * 0.55) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
  for (let i = 0; i < 6; i++) glifo(c, l * 0.6 + i * 26, a * 0.11 + (i % 2) * 6, 5, caso);
  for (const centro of [l * 0.5, l * 0.02, l * 0.98]) {
    for (let k = 0; k < 3; k++) glifo(c, centro + (k - 1) * 13, a * 0.44 + k * 4, 5.5, caso);
  }
  c.beginPath();
  c.moveTo(fronte - 8, a * 0.02);
  for (let k = 0; k < 14; k++) c.lineTo(fronte - 8 + Math.sin(k * 1.3) * 7 + k * 1.2, a * 0.02 + k * 5.2);
  c.stroke();
}

function creaRisorse() {
  const mappa = tela((c, l, a, caso) => {
    const fondo = c.createLinearGradient(0, 0, 0, a);
    fondo.addColorStop(0, '#dcc596');
    fondo.addColorStop(0.5, '#c39a62');
    fondo.addColorStop(1, '#7a5530');
    c.fillStyle = fondo;
    c.fillRect(0, 0, l, a);
    for (let i = 0; i < 2400; i++) {
      const toni = [[120, 78, 40], [214, 196, 158], [90, 58, 34], [170, 120, 70]][Math.floor(caso() * 4)];
      c.fillStyle = `rgba(${toni[0]}, ${toni[1]}, ${toni[2]}, ${0.05 + caso() * 0.12})`;
      c.beginPath();
      c.ellipse(caso() * l, caso() * a, 2 + caso() * 14, 1 + caso() * 6, caso() * 3, 0, Math.PI * 2);
      c.fill();
    }
    c.strokeStyle = 'rgba(70, 44, 24, 0.35)';
    for (let i = 0; i < 260; i++) {
      const x = caso() * l;
      const y = caso() * a;
      c.lineWidth = 0.6 + caso();
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + (caso() - 0.5) * 30, y + (caso() - 0.5) * 4);
      c.stroke();
    }
    c.strokeStyle = 'rgba(40, 24, 12, 0.85)';
    crepe(c, l, a, caso, 26, 1.4);
    c.lineWidth = 1.3;
    c.strokeStyle = 'rgba(60, 38, 20, 0.7)';
    suture(c, l, a);
    c.strokeStyle = 'rgba(52, 32, 18, 0.9)';
    c.lineWidth = 3.2;
    incisioni(c, l, a, creaCaso(99));
  });
  const rilievo = tela((c, l, a, caso) => {
    c.fillStyle = '#9a9a9a';
    c.fillRect(0, 0, l, a);
    for (let i = 0; i < 900; i++) {
      const v = Math.floor(110 + caso() * 90);
      c.fillStyle = `rgba(${v}, ${v}, ${v}, 0.18)`;
      c.beginPath();
      c.arc(caso() * l, caso() * a, 1 + caso() * 7, 0, Math.PI * 2);
      c.fill();
    }
    c.strokeStyle = '#1a1a1a';
    crepe(c, l, a, caso, 26, 1.6);
    c.lineWidth = 1.5;
    suture(c, l, a);
    c.strokeStyle = '#000000';
    c.lineWidth = 4;
    incisioni(c, l, a, creaCaso(99));
  }, false);
  const bagliore = tela((c, l, a) => {
    c.fillStyle = '#000000';
    c.fillRect(0, 0, l, a);
    c.strokeStyle = '#ffffff';
    c.shadowColor = '#ffffff';
    c.shadowBlur = 6;
    c.lineWidth = 2.2;
    incisioni(c, l, a, creaCaso(99));
    c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(l * 0.66, a * 0.06);
    let x = l * 0.66;
    let y = a * 0.06;
    for (let k = 0; k < 16; k++) {
      x += 6 + Math.sin(k * 2.3) * 5;
      y += Math.sin(k * 1.7) * 4;
      c.lineTo(x, y);
    }
    c.stroke();
  }, false);
  return {
    mappa, rilievo, bagliore,
    osso: new THREE.MeshStandardMaterial({ map: mappa, bumpMap: rilievo, bumpScale: 1.6, color: 0xc49a68, roughness: 0.6, metalness: 0.02 }),
    dente: new THREE.MeshStandardMaterial({ color: 0xc9b07a, roughness: 0.5 }),
    cranio: geometriaCranio(),
    mandibola: geometriaMandibola(),
    denti: geometriaDenti(),
  };
}

const ellissoide = (p, cx, cy, cz, rx, ry, rz) => (Math.hypot((p.x - cx) / rx, (p.y - cy) / ry, (p.z - cz) / rz) - 1) * Math.min(rx, ry, rz);
const unisci = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};
const scava = (a, b, k) => -unisci(-a, b, k);

function formaCranio(p) {
  let d = ellissoide(p, 0, 0.15, 0.1, 0.72, 0.78, 0.95);
  d = unisci(d, ellissoide(p, 0, -0.28, -0.5, 0.5, 0.42, 0.42), 0.16);
  for (const s of [-1, 1]) {
    d = unisci(d, ellissoide(p, s * 0.46, -0.2, -0.56, 0.2, 0.13, 0.26), 0.08);
    d = unisci(d, ellissoide(p, s * 0.55, -0.22, -0.22, 0.09, 0.07, 0.3), 0.06);
  }
  d = unisci(d, ellissoide(p, 0, 0.03, -0.7, 0.6, 0.12, 0.2), 0.1);
  d = unisci(d, ellissoide(p, 0, -0.56, -0.55, 0.32, 0.12, 0.24), 0.1);
  for (const s of [-1, 1]) d = scava(d, ellissoide(p, s * 0.3, -0.08, -0.98, 0.21, 0.19, 0.44), 0.04);
  d = scava(d, ellissoide(p, 0, -0.33, -0.86, 0.085, 0.15, 0.2), 0.04);
  for (const s of [-1, 1]) d = scava(d, ellissoide(p, s * 0.88, -0.05, -0.28, 0.22, 0.26, 0.3), 0.12);
  return scava(d, 0.7 + p.y, 0.08) ;
}

function bordo(direzione, p) {
  let t = 0.05;
  for (; t < RAGGIO_MASSIMO; t += PASSO_RAGGIO) {
    p.set(CENTRO_RAGGI.x + direzione.x * t, CENTRO_RAGGI.y + direzione.y * t, CENTRO_RAGGI.z + direzione.z * t);
    if (formaCranio(p) > 0) break;
  }
  let dentro = t - PASSO_RAGGIO;
  let fuori = t;
  for (let k = 0; k < 14; k++) {
    const m = (dentro + fuori) / 2;
    p.set(CENTRO_RAGGI.x + direzione.x * m, CENTRO_RAGGI.y + direzione.y * m, CENTRO_RAGGI.z + direzione.z * m);
    if (formaCranio(p) > 0) fuori = m;
    else dentro = m;
  }
  return p.set(CENTRO_RAGGI.x + direzione.x * dentro, CENTRO_RAGGI.y + direzione.y * dentro, CENTRO_RAGGI.z + direzione.z * dentro);
}

function normaleForma(p, esito) {
  const e = 0.004;
  const q = new THREE.Vector3();
  const f = (dx, dy, dz) => formaCranio(q.set(p.x + dx, p.y + dy, p.z + dz));
  return esito.set(f(e, 0, 0) - f(-e, 0, 0), f(0, e, 0) - f(0, -e, 0), f(0, 0, e) - f(0, 0, -e)).normalize();
}

function occlusione(p, n) {
  const q = new THREE.Vector3();
  let occ = 0;
  for (let i = 1; i <= 5; i++) {
    const h = 0.035 * i;
    occ += (h - formaCranio(q.copy(p).addScaledVector(n, h))) / 2 ** i;
  }
  return Math.min(1, Math.max(0.05, 1 - occ * 7.5));
}

const CAVITA = Object.freeze([
  { x: -0.3, y: -0.08, z: -0.98, rx: 0.21, ry: 0.19, rz: 0.44 },
  { x: 0.3, y: -0.08, z: -0.98, rx: 0.21, ry: 0.19, rz: 0.44 },
  { x: 0, y: -0.33, z: -0.86, rx: 0.085, ry: 0.15, rz: 0.2 },
]);

function buioCavita(p) {
  let minimo = Infinity;
  for (const c of CAVITA) minimo = Math.min(minimo, Math.hypot((p.x - c.x) / c.rx, (p.y - c.y) / c.ry, (p.z - c.z) / c.rz));
  return 0.1 + 0.9 * Math.min(1, Math.max(0, (minimo - 0.92) / 0.3));
}

function geometriaCranio() {
  const g = new THREE.SphereGeometry(1, 96, 72);
  const pos = g.attributes.position;
  const colori = new Float32Array(pos.count * 3);
  const d = new THREE.Vector3();
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    d.fromBufferAttribute(pos, i).normalize();
    bordo(d, p);
    normaleForma(p, n);
    const luce = occlusione(p, n) * buioCavita(p) * (0.78 + frattale(p.x + 3, p.y + 1, p.z) * 0.36) * (p.y < -0.45 ? 0.8 : 1);
    p.addScaledVector(n, (frattale(p.x * 2 + 5, p.y * 2, p.z * 2) - 0.5) * 0.02);
    pos.setXYZ(i, p.x * MISURA, p.y * MISURA, p.z * MISURA);
    colori.set([luce, luce * 0.96, luce * 0.9], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(colori, 3));
  g.computeVertexNormals();
  return g;
}

function geometriaMandibola() {
  const lato = s => [new THREE.Vector3(s * 0.5, -0.3, -0.12), new THREE.Vector3(s * 0.45, -0.68, -0.16), new THREE.Vector3(s * 0.3, -0.83, -0.45)];
  const arco = new THREE.CatmullRomCurve3([...lato(-1), new THREE.Vector3(0, -0.87, -0.64), ...lato(1).reverse()]);
  const corpo = new THREE.TubeGeometry(arco, 64, 0.078, 12, false);
  const mento = new THREE.SphereGeometry(0.09, 16, 10).scale(1.4, 0.85, 0.8).translate(0, -0.9, -0.66);
  const unita = mergeGeometries([corpo.toNonIndexed(), mento.toNonIndexed()]);
  unita.scale(MISURA, MISURA, MISURA);
  unita.computeVertexNormals();
  return unita;
}

function geometriaDenti() {
  const pezzi = [];
  const fila = (y, giu, raggioX, raggioZ, centroZ, quanti) => {
    for (let k = 0; k < quanti; k++) {
      const t = (k + 0.5) / quanti;
      const a = Math.PI * (0.14 + t * 0.72);
      const x = Math.cos(a) * raggioX;
      const z = centroZ - Math.sin(a) * raggioZ;
      const zanna = k === 2 || k === quanti - 3;
      const lungo = zanna ? 0.17 : 0.07 + ((k * 7) % 4) * 0.012;
      const dente = zanna
        ? new THREE.ConeGeometry(0.03, lungo, 6).rotateX(giu ? Math.PI : 0)
        : new THREE.CylinderGeometry(0.028, 0.022, lungo, 6);
      dente.translate(x, y + (giu ? -lungo / 2 : lungo / 2), z);
      pezzi.push(dente.toNonIndexed());
    }
  };
  fila(-0.63, true, 0.27, 0.26, -0.5, 14);
  fila(-0.86, false, 0.25, 0.24, -0.5, 12);
  const g = mergeGeometries(pezzi);
  g.scale(MISURA, MISURA, MISURA);
  g.computeVertexNormals();
  return g;
}

const materialeCranio = colore => {
  if (!cranii.has(colore)) {
    cranii.set(colore, new THREE.MeshStandardMaterial({
      map: risorse.mappa, bumpMap: risorse.rilievo, bumpScale: 1.6, vertexColors: true, color: 0xd2a874, roughness: 0.58, metalness: 0.02,
      emissive: colore, emissiveMap: risorse.bagliore, emissiveIntensity: 1.1,
    }));
  }
  return cranii.get(colore);
};

const materialeOcchio = colore => {
  if (!occhi.has(colore)) occhi.set(colore, new THREE.MeshBasicMaterial({ color: colore, toneMapped: false }));
  return occhi.get(colore);
};

export function creaTeschio(dati) {
  risorse ??= creaRisorse();
  const colore = dati.colore ?? VERDE;
  const gruppo = new THREE.Group();
  const cranio = new THREE.Mesh(risorse.cranio, materialeCranio(colore));
  const mandibola = new THREE.Mesh(risorse.mandibola, risorse.osso);
  mandibola.rotation.x = 0.06;
  const denti = new THREE.Mesh(risorse.denti, risorse.dente);
  gruppo.add(cranio, mandibola, denti);
  const alone = new THREE.MeshBasicMaterial({ color: colore, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  for (const o of ORBITE) {
    const luce = new THREE.Mesh(new THREE.SphereGeometry(0.034 * MISURA, 10, 8), materialeOcchio(colore));
    luce.position.set(o.x * MISURA, o.y * MISURA, o.z * MISURA);
    const velo = new THREE.Mesh(new THREE.SphereGeometry(0.075 * MISURA, 10, 8), alone);
    velo.position.copy(luce.position);
    gruppo.add(luce, velo);
  }
  gruppo.rotation.set(-0.12, 0.9, 0.05);
  gruppo.scale.setScalar(SCALA_IN_MANO);
  gruppo.position.set(0.005, 0.0, -0.03);
  const contenitore = new THREE.Group();
  contenitore.add(gruppo);
  return { gruppo: contenitore, bocca: new THREE.Vector3(0, 0, -0.08), presa: null, lunghezza: 0.12, colore };
}

export function illuminaTeschio(carica) {
  for (const m of cranii.values()) m.emissiveIntensity = 1.1 + carica * 3.4;
  for (const [colore, m] of occhi) m.color.setHex(carica >= 1 ? 0xffffff : colore);
}
