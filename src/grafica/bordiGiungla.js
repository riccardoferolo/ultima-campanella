import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { istanzeACelle } from './celle.js';

const PASSO_CIUFFI = 1;
const PASSO_CIME = 1.6;
const PASSO_ALBERI = 6.5;
const DISTANZA_ACQUISTI = 1.9;
const DISTANZA_PORTE = 2.4;
const TINTE_FOGLIE = Object.freeze([0x9fbf7a, 0x7fa86a, 0xb5c98a, 0x86b08f, 0xa7b46a, 0x6f9a6a]);
const TINTE_CHIOME = Object.freeze([0x5d7a4a, 0x4f6e46, 0x6a7f4a, 0x48664f]);

function tela(l, a, pittore, ripeti) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function foglia(ctx, x, y, angolo, lungo, largo, colore) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angolo);
  ctx.fillStyle = colore;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(largo, -lungo * 0.25, largo * 0.8, -lungo * 0.8, 0, -lungo);
  ctx.bezierCurveTo(-largo * 0.8, -lungo * 0.8, -largo, -lungo * 0.25, 0, 0);
  ctx.fill();
  ctx.strokeStyle = 'rgba(20,35,15,0.55)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -lungo * 0.95);
  ctx.stroke();
  ctx.restore();
}

function verde(caso, chiaro = 0) {
  const g = 70 + Math.floor(caso() * 70) + chiaro;
  return `rgb(${20 + Math.floor(caso() * 35)},${g},${18 + Math.floor(caso() * 30)})`;
}

function texturaCiuffo(caso) {
  return tela(256, 256, (ctx, l, a) => {
    ctx.clearRect(0, 0, l, a);
    for (let i = 0; i < 46; i++) {
      const angolo = (caso() - 0.5) * 2.4;
      const lungo = 70 + caso() * 120;
      foglia(ctx, l / 2 + (caso() - 0.5) * 40, a - 4, angolo, lungo, 14 + caso() * 22, verde(caso));
    }
    for (let i = 0; i < 30; i++) {
      foglia(ctx, 20 + caso() * (l - 40), 60 + caso() * (a - 80), (caso() - 0.5) * 3, 28 + caso() * 40, 8 + caso() * 12, verde(caso, 20));
    }
  }, false);
}

function texturaChioma(caso) {
  return tela(256, 256, (ctx, l, a) => {
    ctx.fillStyle = '#16260f';
    ctx.fillRect(0, 0, l, a);
    for (let i = 0; i < 520; i++) {
      foglia(ctx, caso() * l, caso() * a, caso() * Math.PI * 2, 14 + caso() * 22, 5 + caso() * 8, verde(caso, -10));
    }
  }, true);
}

function geometriaCiuffo() {
  const piani = [];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.PlaneGeometry(1.9, 2.2, 2, 4).translate(0, 1.1, 0);
    const p = g.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const y = p.getY(k);
      p.setZ(k, 0.09 * y * y * Math.sign(p.getX(k) || 1) * 0.5);
    }
    g.rotateY((i / 3) * Math.PI);
    piani.push(g);
  }
  const unita = new THREE.BufferGeometry();
  const posizioni = [];
  const uv = [];
  const indici = [];
  let base = 0;
  for (const g of piani) {
    posizioni.push(...g.attributes.position.array);
    uv.push(...g.attributes.uv.array);
    indici.push(...g.index.array.map(v => v + base));
    base += g.attributes.position.count;
  }
  unita.setAttribute('position', new THREE.Float32BufferAttribute(posizioni, 3));
  unita.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  unita.setIndex(indici);
  unita.computeVertexNormals();
  const n = unita.attributes.normal;
  for (let k = 0; k < n.count; k++) n.setXYZ(k, n.getX(k) * 0.4, 1, n.getZ(k) * 0.4);
  n.needsUpdate = true;
  return unita;
}

function geometriaChioma(caso) {
  const sfera = new THREE.IcosahedronGeometry(1, 2);
  sfera.deleteAttribute('normal');
  const g = mergeVertices(sfera);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  const spostamenti = new Map();
  for (let k = 0; k < p.count; k++) {
    v.fromBufferAttribute(p, k);
    const chiave = `${v.x.toFixed(3)}|${v.y.toFixed(3)}|${v.z.toFixed(3)}`;
    if (!spostamenti.has(chiave)) spostamenti.set(chiave, 0.78 + caso() * 0.42);
    v.multiplyScalar(spostamenti.get(chiave));
    v.y *= 0.72;
    p.setXYZ(k, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function liberoDa(x, z, acquisti, porte) {
  return !acquisti.some(a => Math.hypot(a.posizione.x - x, a.posizione.z - z) < DISTANZA_ACQUISTI)
    && !porte.some(p => Math.hypot(p.centro.x - x, p.centro.z - z) < DISTANZA_PORTE);
}

export function costruisciBordi(scena, { muri, zone, acquisti, porte, altezzaSiepe, corteccia, caso }) {
  const dentroZona = (x, z) => zone.some(q => x > q.x0 && x < q.x1 && z > q.z0 && z < q.z1);
  const matriceCiuffo = [];
  const tinteCiuffo = [];
  const alberi = [];
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const pos = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const ciuffo = (x, y, z, scala, inclina = 0) => {
    e.set((caso() - 0.5) * 0.25 + inclina, caso() * Math.PI * 2, (caso() - 0.5) * 0.25);
    q.setFromEuler(e);
    pos.set(x, y, z);
    sc.set(scala * (0.8 + caso() * 0.5), scala, scala * (0.8 + caso() * 0.5));
    matriceCiuffo.push(m.compose(pos, q, sc).clone());
    tinteCiuffo.push(TINTE_FOGLIE[Math.floor(caso() * TINTE_FOGLIE.length)]);
  };

  for (const muro of muri) {
    const orizz = muro.x1 - muro.x0 > muro.z1 - muro.z0;
    const lungo = orizz ? muro.x1 - muro.x0 : muro.z1 - muro.z0;
    const cx = (muro.x0 + muro.x1) / 2;
    const cz = (muro.z0 + muro.z1) / 2;
    const punto = (t, lato) => (orizz ? [muro.x0 + t, cz + lato] : [cx + lato, muro.z0 + t]);
    for (let t = caso() * PASSO_CIUFFI; t < lungo; t += PASSO_CIUFFI * (0.7 + caso() * 0.6)) {
      for (const verso of [-1, 1]) {
        const [x, z] = punto(t, verso * (0.3 + caso() * 0.55));
        if (!liberoDa(x, z, acquisti, porte)) continue;
        ciuffo(x, 0, z, 0.75 + caso() * 0.85);
        if (caso() < 0.25) {
          const [x2, z2] = punto(t + 0.3, verso * (0.6 + caso() * 0.6));
          if (liberoDa(x2, z2, acquisti, porte)) ciuffo(x2, 0, z2, 0.45 + caso() * 0.35);
        }
      }
    }
    for (let t = caso() * PASSO_CIME; t < lungo; t += PASSO_CIME * (0.7 + caso() * 0.6)) {
      const [x, z] = punto(t, (caso() - 0.5) * 0.4);
      ciuffo(x, altezzaSiepe - 1.1 - caso() * 0.6, z, 1.1 + caso() * 0.9);
    }
    for (let t = caso() * PASSO_ALBERI; t < lungo; t += PASSO_ALBERI * (0.7 + caso() * 0.7)) {
      const scostamento = 1.6 + caso() * 2.6;
      const fuori = [1, -1].find(v => {
        const [x, z] = punto(t, v * scostamento);
        return !dentroZona(x, z);
      });
      const [x, z] = punto(t, fuori === undefined ? 0 : fuori * scostamento);
      if (!liberoDa(x, z, acquisti, porte)) continue;
      alberi.push({ x, z, alto: 7 + caso() * 6, raggio: 2.4 + caso() * 2.2 });
    }
  }

  const caduche = new THREE.MeshLambertMaterial({ map: texturaCiuffo(caso), alphaTest: 0.5, side: THREE.DoubleSide });
  istanzeACelle(scena, geometriaCiuffo(), caduche, matriceCiuffo.map((matrice, i) => ({ matrice, colore: tinteCiuffo[i] })));

  const mappaChioma = texturaChioma(caso);
  mappaChioma.repeat.set(2, 2);
  const vociChiome = [];
  const vociTronchi = [];
  alberi.forEach(a => {
    e.set((caso() - 0.5) * 0.1, caso() * Math.PI * 2, (caso() - 0.5) * 0.1);
    vociTronchi.push({ matrice: m.compose(pos.set(a.x, 0, a.z), q.setFromEuler(e), sc.set(1 + a.raggio * 0.08, a.alto, 1 + a.raggio * 0.08)).clone() });
    for (let b = 0; b < 3; b++) {
      const angolo = caso() * Math.PI * 2;
      const d = b === 0 ? 0 : a.raggio * (0.45 + caso() * 0.3);
      const r = a.raggio * (b === 0 ? 1 : 0.65 + caso() * 0.2);
      e.set(0, caso() * Math.PI * 2, 0);
      vociChiome.push({
        matrice: m.compose(pos.set(a.x + Math.cos(angolo) * d, a.alto - 0.3 + (caso() - 0.3) * 1.4, a.z + Math.sin(angolo) * d), q.setFromEuler(e), sc.set(r, r, r)).clone(),
        colore: TINTE_CHIOME[Math.floor(caso() * TINTE_CHIOME.length)],
      });
    }
  });
  istanzeACelle(scena, new THREE.CylinderGeometry(0.22, 0.42, 1, 7, 1).translate(0, 0.5, 0), corteccia, vociTronchi);
  istanzeACelle(scena, geometriaChioma(caso), new THREE.MeshLambertMaterial({ map: mappaChioma }), vociChiome);
  return { ciuffi: matriceCiuffo.length, alberi: alberi.length };
}
