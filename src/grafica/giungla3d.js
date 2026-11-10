import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ARMI } from '../regole.js';
import { ALTEZZA_SOFFITTO, ZONE, MURI, OSTACOLI, FINESTRE, PORTE, ACQUISTI, CARTELLO_PRONTI } from '../mappa.js';
import { OGGETTI, INTERNE } from '../mappe/giungla.js';
import { ID_ASSI, ID_SCHEGGIA_GROTTA, ID_MASCHERA, RELIQUIE } from '../giungla.js';
import { RUNE, SIMBOLI_RUNE } from '../storia.js';
import { texturaTesto } from './texture.js';
import { modelloArma } from './armi3d.js';
import { creaCaso } from './caso-grafica.js';
import { blocco, piano, scatolaUV, orientamento } from './scuola3d.js';
import { creaMacchine } from './macchine3d.js';
import { costruisciBordi } from './bordiGiungla.js';
import { istanzeACelle } from './celle.js';

const H = ALTEZZA_SOFFITTO;
const ALTEZZA_SIEPE = 4.2;
const URL_GIUNGLA = './modelli/giungla.glb';
const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.4;
const SFONDO_LUCI = Object.freeze([
  { x: 0, z: 3, colore: 0xff8a3a, intensita: 18, portata: 16, fuoco: true },
  { x: 0, z: -22, colore: 0xff9a4a, intensita: 16, portata: 15, fuoco: true },
  { x: -36, z: -2, colore: 0x6fe0c8, intensita: 12, portata: 16 },
  { x: -10, z: 48, colore: 0xffa040, intensita: 14, portata: 14, fuoco: true },
  { x: 10, z: 48, colore: 0xffa040, intensita: 14, portata: 14, fuoco: true },
  { x: 0, z: 65, colore: 0x8fe0a4, intensita: 12, portata: 15 },
  { x: 0, z: 84, colore: 0xff3a2a, intensita: 16, portata: 18 },
  { x: 77, z: 0, colore: 0xffd9a0, intensita: 12, portata: 12 },
]);

export async function caricaGiungla() {
  const gltf = await new GLTFLoader().loadAsync(URL_GIUNGLA);
  const modelli = new Map();
  for (const figlio of [...gltf.scene.children]) modelli.set(figlio.name, figlio);
  return modelli;
}

function tela(l, a, pittore, ripeti = true) {
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

function texturaFronda() {
  return tela(128, 512, (ctx, l, a) => {
    ctx.clearRect(0, 0, l, a);
    ctx.strokeStyle = '#4a5a24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(l / 2, a);
    ctx.lineTo(l / 2, 0);
    ctx.stroke();
    for (let y = 18; y < a - 8; y += 9) {
      const f = 1 - y / a;
      const lungo = (l / 2 - 4) * Math.sin(Math.PI * Math.min(1, f * 1.15)) * 0.98;
      for (const verso of [-1, 1]) {
        const g = 70 + Math.floor(Math.random() * 50);
        ctx.fillStyle = `rgb(${30 + Math.floor(Math.random() * 25)},${g + 30},${25 + Math.floor(Math.random() * 20)})`;
        ctx.beginPath();
        ctx.moveTo(l / 2, y);
        ctx.quadraticCurveTo(l / 2 + verso * lungo * 0.6, y - 10, l / 2 + verso * lungo, y + 14);
        ctx.quadraticCurveTo(l / 2 + verso * lungo * 0.5, y + 6, l / 2, y + 6);
        ctx.fill();
      }
    }
  }, false);
}

function texturaSiepe() {
  return tela(256, 256, (ctx, l, a) => {
    ctx.fillStyle = '#0d1a0f';
    ctx.fillRect(0, 0, l, a);
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * l;
      const y = Math.random() * a;
      const g = 40 + Math.floor(Math.random() * 70);
      ctx.fillStyle = `rgba(${12 + Math.floor(Math.random() * 25)},${g},${15 + Math.floor(Math.random() * 20)},0.9)`;
      ctx.beginPath();
      ctx.ellipse(x, y, 4 + Math.random() * 10, 2 + Math.random() * 4, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function texturaAcqua() {
  return tela(256, 256, (ctx, l, a) => {
    ctx.fillStyle = '#123028';
    ctx.fillRect(0, 0, l, a);
    for (let i = 0; i < 260; i++) {
      ctx.strokeStyle = `rgba(160,210,190,${0.05 + Math.random() * 0.12})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      const x = Math.random() * l;
      const y = Math.random() * a;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 10, y + (Math.random() - 0.5) * 6, x + 20 + Math.random() * 20, y);
      ctx.stroke();
    }
  });
}

function texturaAlone() {
  return tela(64, 64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }, false);
}

function texturaCascata() {
  return tela(128, 256, (ctx, l, a) => {
    ctx.fillStyle = 'rgba(120,170,170,0.35)';
    ctx.fillRect(0, 0, l, a);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * l;
      const y = Math.random() * a;
      const lungo = 20 + Math.random() * 90;
      const sfumato = ctx.createLinearGradient(0, y, 0, y + lungo);
      sfumato.addColorStop(0, 'rgba(230,250,245,0)');
      sfumato.addColorStop(0.5, `rgba(230,250,245,${0.15 + Math.random() * 0.35})`);
      sfumato.addColorStop(1, 'rgba(230,250,245,0)');
      ctx.strokeStyle = sfumato;
      ctx.lineWidth = 0.6 + Math.random() * 2.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 3, y + lungo);
      ctx.stroke();
    }
  });
}

function texturaSchiuma() {
  return tela(128, 128, (ctx, l, a) => {
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * l;
      const y = Math.random() * a;
      const r = 1 + Math.random() * 6;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(235,250,248,${0.25 + Math.random() * 0.4})`);
      g.addColorStop(1, 'rgba(235,250,248,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  });
}

function veloCurvo(larghezza, altezza) {
  const g = new THREE.PlaneGeometry(larghezza, altezza, 12, 10);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) + altezza / 2) / altezza;
    p.setZ(i, -Math.pow(t, 3) * 0.9 + Math.sin(p.getX(i) * 1.3) * 0.08);
  }
  g.computeVertexNormals();
  return g;
}

function texturaGlifo(simbolo, colore, sfondo = 'rgba(0,0,0,0)') {
  return tela(128, 128, (ctx, l, a) => {
    ctx.fillStyle = sfondo;
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = colore;
    ctx.font = 'bold 84px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(simbolo, l / 2, a / 2 + 4);
  }, false);
}

function texturaFreccia() {
  return tela(128, 128, (ctx, l, a) => {
    ctx.fillStyle = '#5b5040';
    ctx.fillRect(0, 0, l, a);
    ctx.strokeStyle = '#2d261c';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(l / 2, a / 2, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#f5c75a';
    ctx.beginPath();
    ctx.moveTo(l / 2, 18);
    ctx.lineTo(l / 2 + 22, 58);
    ctx.lineTo(l / 2 + 8, 58);
    ctx.lineTo(l / 2 + 8, 100);
    ctx.lineTo(l / 2 - 8, 100);
    ctx.lineTo(l / 2 - 8, 58);
    ctx.lineTo(l / 2 - 22, 58);
    ctx.closePath();
    ctx.fill();
  }, false);
}

function geometriaPalma() {
  const tronco = new THREE.CylinderGeometry(0.13, 0.24, 1, 8, 6, true).translate(0, 0.5, 0);
  const pos = tronco.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    pos.setX(i, pos.getX(i) + Math.sin(y * 2.2) * 0.12 * y);
  }
  tronco.computeVertexNormals();
  const fronde = [];
  for (let i = 0; i < 9; i++) {
    const g = new THREE.PlaneGeometry(0.7, 3.2, 1, 8).translate(0, 1.6, 0);
    const p = g.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const y = p.getY(k);
      p.setZ(k, -0.12 * y * y);
    }
    g.rotateX(-1.15 + (i % 3) * 0.18);
    g.rotateY((i / 9) * Math.PI * 2);
    g.translate(0.12 * Math.sin(2.2) * 1, 1, 0);
    fronde.push(g);
  }
  const chioma = mergeGeometries(fronde);
  chioma.computeVertexNormals();
  return { tronco, chioma };
}

function geometriaFelce() {
  const fronde = [];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.PlaneGeometry(0.42, 1.25, 1, 5).translate(0, 0.62, 0);
    const p = g.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const y = p.getY(k);
      p.setZ(k, -0.38 * y * y);
    }
    g.rotateX(-0.45 - (i % 2) * 0.3);
    g.rotateY((i / 7) * Math.PI * 2 + (i % 2) * 0.35);
    fronde.push(g);
  }
  const felce = mergeGeometries(fronde);
  const n = felce.attributes.normal;
  for (let k = 0; k < n.count; k++) n.setXYZ(k, n.getX(k) * 0.3, 1, n.getZ(k) * 0.3);
  return felce;
}

function geometriaRoccia(caso) {
  const sfera = new THREE.IcosahedronGeometry(1, 2);
  sfera.deleteAttribute('normal');
  const g = mergeVertices(sfera);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let k = 0; k < p.count; k++) {
    v.fromBufferAttribute(p, k);
    const scarto = 0.78 + caso() * 0.3 + Math.sin(v.x * 3.1 + v.z * 2.3) * 0.08;
    v.multiplyScalar(scarto);
    if (v.y < 0) v.y *= 0.25;
    p.setXYZ(k, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

const TINTE_FELCI = Object.freeze([0xb8d49a, 0x9cc28a, 0xc9d79a, 0x8fb592, 0xa9c47e]);

const matrice = (x, y, z, rot = 0, scala = 1, inclina = 0) => new THREE.Matrix4().compose(
  new THREE.Vector3(x, y, z),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(inclina, rot, inclina * 0.6)),
  new THREE.Vector3(scala, scala, scala),
);

function dentroAlgo(x, z, margine) {
  return OSTACOLI.some(o => x > o.x0 - margine && x < o.x1 + margine && z > o.z0 - margine && z < o.z1 + margine)
    || ACQUISTI.some(a => Math.hypot(a.posizione.x - x, a.posizione.z - z) < 1.6 + margine)
    || PORTE.some(p => Math.hypot(p.centro.x - x, p.centro.z - z) < 3)
    || FINESTRE.some(f => Math.hypot(f.interno.x - x, f.interno.z - z) < 1.4);
}

export function costruisciGiungla(scena, { reali, materialiArmi, oggetti, modelli, luciAccese = 3 }) {
  const caso = creaCaso(1337);
  const alone = texturaAlone();
  const pbr = (chiave, extra = {}) => new THREE.MeshStandardMaterial({ ...reali[chiave], metalness: 0, ...extra });
  const mat = {
    suoloGiungla: pbr('suoloGiungla'),
    foglieTerra: pbr('foglieTerra'),
    fango: pbr('fango'),
    roccia: pbr('roccia'),
    pietraTempio: pbr('pietraTempio'),
    pietraMuschio: pbr('pietraMuschio'),
    paglia: pbr('paglia'),
    assiVecchie: pbr('assiVecchie'),
    corteccia: pbr('corteccia'),
    cortecciaPalma: pbr('cortecciaPalma'),
    metallo: pbr('metallo', { metalness: 0.6, color: 0x9aa0a0 }),
    legno: pbr('legno'),
    siepe: new THREE.MeshLambertMaterial({ map: texturaSiepe(), color: 0x4f5e48 }),
    fronda: new THREE.MeshLambertMaterial({ map: texturaFronda(), alphaTest: 0.45, side: THREE.DoubleSide }),
    telo: new THREE.MeshStandardMaterial({ color: 0x5a5a3a, roughness: 0.95, side: THREE.DoubleSide }),
    giada: new THREE.MeshStandardMaterial({ color: 0x1d6b44, emissive: 0x2fd884, emissiveIntensity: 0.9, roughness: 0.25 }),
    osso: new THREE.MeshStandardMaterial({ color: 0xd8cbb0, roughness: 0.6 }),
    nero: new THREE.MeshBasicMaterial({ color: 0x050505 }),
  };

  piano(scena, mat.suoloGiungla, -70, -70, 100, 22, -0.02, 6);
  piano(scena, mat.suoloGiungla, -70, 28, 100, 110, -0.02, 6);
  piano(scena, mat.fango, -70, 22, 100, 28, -0.9, 4);
  for (const zona of ZONE) {
    piano(scena, mat[zona.pavimento] ?? mat.suoloGiungla, zona.x0, zona.z0, zona.x1, zona.z1, 0, zona.id === 'ponte' ? 1 : 4);
    if (INTERNE.has(zona.id)) piano(scena, zona.id === 'grotta' ? mat.roccia : mat.pietraTempio, zona.x0, zona.z0, zona.x1, zona.z1, H, 3, true);
  }

  const acqua = new THREE.MeshStandardMaterial({ map: texturaAcqua(), color: 0x6fa090, roughness: 0.12, metalness: 0.2, transparent: true, opacity: 0.88 });
  acqua.map.repeat.set(20, 2);
  const fiume = new THREE.Mesh(new THREE.PlaneGeometry(170, 6).rotateX(-Math.PI / 2), acqua);
  fiume.position.set(15, -0.35, 25);
  scena.add(fiume);

  const muroDi = s => {
    const cx = (s.x0 + s.x1) / 2;
    const cz = (s.z0 + s.z1) / 2;
    const zona = ZONE.find(z => cx >= z.x0 - 0.3 && cx <= z.x1 + 0.3 && cz >= z.z0 - 0.3 && cz <= z.z1 + 0.3);
    return zona && INTERNE.has(zona.id) ? (zona.id === 'grotta' ? mat.roccia : mat.pietraTempio) : mat.siepe;
  };
  for (const muro of MURI) {
    const m = muroDi(muro);
    blocco(scena, m, muro, 0, m === mat.siepe ? ALTEZZA_SIEPE : H, m === mat.siepe ? 4 : H);
  }
  costruisciBordi(scena, {
    muri: MURI.filter(m => muroDi(m) === mat.siepe), zone: ZONE, acquisti: ACQUISTI, porte: PORTE,
    altezzaSiepe: ALTEZZA_SIEPE, corteccia: mat.corteccia, caso,
  });

  const { tronco, chioma } = geometriaPalma();
  const palme = [];
  for (const o of OSTACOLI.filter(q => q.tipo === 'palma')) palme.push([(o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2, 5.5 + caso() * 3]);
  for (let i = 0; i < 260; i++) {
    const x = -66 + caso() * 160;
    const z = -60 + caso() * 160;
    if (ZONE.some(q => x > q.x0 - 1 && x < q.x1 + 1 && z > q.z0 - 1 && z < q.z1 + 1) || (z > 21 && z < 29)) continue;
    palme.push([x, z, 6 + caso() * 5]);
  }
  const vociTronchi = [];
  const vociChiome = [];
  palme.forEach(([x, z, alto]) => {
    const rot = caso() * Math.PI * 2;
    const incl = (caso() - 0.5) * 0.12;
    vociTronchi.push({ matrice: new THREE.Matrix4().compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(incl, rot, 0)), new THREE.Vector3(1, alto, 1)) });
    vociChiome.push({ matrice: matrice(x + Math.sin(alto * 2.2) * 0.12 * alto * 0.4, alto - 1, z, rot, 0.9 + caso() * 0.4) });
  });
  const tronchi = istanzeACelle(scena, tronco, mat.cortecciaPalma, vociTronchi);
  istanzeACelle(scena, chioma, mat.fronda, vociChiome);
  tronchi.forEach(t => { t.name = 'tronchiPalme'; });

  const felci = [];
  const erba = [];
  for (const zona of ZONE.filter(q => q.aperto)) {
    const area = (zona.x1 - zona.x0) * (zona.z1 - zona.z0);
    for (let i = 0; i < area / 9; i++) {
      const x = zona.x0 + 0.6 + caso() * (zona.x1 - zona.x0 - 1.2);
      const z = zona.z0 + 0.6 + caso() * (zona.z1 - zona.z0 - 1.2);
      const bordo = Math.min(x - zona.x0, zona.x1 - x, z - zona.z0, zona.z1 - z) < 2.5;
      if (dentroAlgo(x, z, 0.5) || (!bordo && caso() < 0.65)) continue;
      (caso() < 0.6 ? felci : erba).push(matrice(x, 0, z, caso() * Math.PI * 2, 0.8 + caso() * 0.7, (caso() - 0.5) * 0.2));
    }
  }
  const tintaFelce = () => TINTE_FELCI[Math.floor(caso() * TINTE_FELCI.length)];
  istanzeACelle(scena, geometriaFelce(), mat.fronda, [
    ...felci.map(matrice => ({ matrice, colore: tintaFelce() })),
    ...erba.map(m => ({ matrice: m.multiply(new THREE.Matrix4().makeScale(0.55, 0.6, 0.55)), colore: tintaFelce() })),
  ], { diradabile: true });

  const sasso = geometriaRoccia(caso);
  const roccia = (materiale, x, z, larghezza, altezza, profondita, rot = caso() * Math.PI * 2) => {
    const r = new THREE.Mesh(sasso, materiale);
    r.position.set(x, 0, z);
    r.scale.set(larghezza / 2, altezza, profondita / 2);
    r.rotation.y = rot;
    scena.add(r);
    return r;
  };
  const cassa = (x, z, rot, scala = 1, y = 0) => {
    const c = new THREE.Mesh(new THREE.BoxGeometry(1.05 * scala, 0.55 * scala, 0.6 * scala).translate(0, 0.275 * scala, 0), mat.assiVecchie);
    c.position.set(x, y, z);
    c.rotation.y = rot;
    scena.add(c);
  };
  const ceppo = (x, z, scala) => {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.42 * scala, 0.55 * scala, 0.6 * scala, 10).translate(0, 0.3 * scala, 0), mat.corteccia);
    c.position.set(x, 0, z);
    scena.add(c);
  };
  const posa = (nome, x, z, rot = 0, scala = 1, y = 0) => {
    const m = modelli.get(nome)?.clone();
    if (!m) return null;
    m.position.set(x, y, z);
    m.rotation.y = rot;
    m.scale.setScalar(scala);
    scena.add(m);
    return m;
  };

  const generatori = [];
  for (const o of OSTACOLI) {
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const l = o.x1 - o.x0;
    const p = o.z1 - o.z0;
    switch (o.tipo) {
      case 'tenda': {
        const forma = new THREE.Shape([new THREE.Vector2(-l / 2, 0), new THREE.Vector2(l / 2, 0), new THREE.Vector2(0, o.altezza)]);
        const tenda = new THREE.Mesh(new THREE.ExtrudeGeometry(forma, { depth: p, bevelEnabled: false }), mat.telo);
        tenda.position.set(cx, 0, cz - p / 2);
        scena.add(tenda);
        break;
      }
      case 'casse':
        cassa(cx, cz, 0.3, 1.1);
        cassa(cx + 0.2, cz + 0.1, 1.2, 1, 0.6);
        break;
      case 'tavolo': {
        blocco(scena, mat.legno, { x0: o.x0, x1: o.x1, z0: o.z0, z1: o.z1 }, 0.75, 0.82, 1);
        for (const [dx, dz] of [[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.3], [0.7, 0.3]]) blocco(scena, mat.legno, { x0: cx + dx - 0.04, x1: cx + dx + 0.04, z0: cz + dz - 0.04, z1: cz + dz + 0.04 }, 0, 0.75, 1);
        break;
      }
      case 'generatoreG': {
        const g = new THREE.Group();
        const corpo = new THREE.Mesh(new THREE.BoxGeometry(l, 0.95, p), new THREE.MeshStandardMaterial({ color: 0x4a5236, metalness: 0.5, roughness: 0.55 }));
        corpo.position.y = 0.55;
        const serbatoio = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, l * 0.8, 12).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x7a3a20, metalness: 0.5, roughness: 0.5 }));
        serbatoio.position.y = 1.2;
        const spia = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xb8241b, emissiveIntensity: 1.6 }));
        spia.position.set(-l * 0.35, 0.85, -p / 2 - 0.02);
        const targa = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), new THREE.MeshBasicMaterial({ map: texturaTesto(['GENERATORE'], { larghezza: 128, altezza: 32, sfondo: '#1d2418', colore: '#d8d2b0', font: 'bold 16px monospace' }) }));
        targa.position.set(0, 0.75, -p / 2 - 0.005);
        targa.rotation.y = Math.PI;
        g.add(corpo, serbatoio, spia, targa);
        g.position.set(cx, 0, cz);
        scena.add(g);
        blocco(scena, new THREE.MeshStandardMaterial({ color: 0x8a2a1a, roughness: 0.6, metalness: 0.3 }), { x0: cx + l / 2 + 0.15, x1: cx + l / 2 + 0.5, z0: cz - 0.1, z1: cz + 0.1 }, 0, 0.45, 1);
        generatori.push({ gruppo: g, spia });
        break;
      }
      case 'fusoliera': {
        const fusoliera = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.1, l, 14, 1, false).rotateZ(Math.PI / 2), mat.metallo);
        fusoliera.position.set(cx, 1.3, cz);
        fusoliera.rotation.x = 0.05;
        const muso = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 10, 0, Math.PI), mat.metallo);
        muso.rotation.y = -Math.PI / 2;
        muso.position.set(o.x1, 1.3, cz);
        const vetri = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 1.4), new THREE.MeshStandardMaterial({ color: 0x0b1215, metalness: 0.4, roughness: 0.1 }));
        vetri.position.set(o.x1 - 0.2, 2.1, cz);
        scena.add(fusoliera, muso, vetri);
        break;
      }
      case 'ala':
        blocco(scena, mat.metallo, o, 0.9, 1.1, 2);
        break;
      case 'coda': {
        const deriva = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.6, 0.15), mat.metallo);
        deriva.position.set(cx, 2.4, cz);
        deriva.rotation.z = 0.25;
        scena.add(deriva);
        break;
      }
      case 'capanna': {
        blocco(scena, mat.assiVecchie, o, 0, 2.3, 2);
        const tetto = new THREE.Mesh(new THREE.ConeGeometry(Math.max(l, p) * 0.78, 1.8, 4, 1), mat.paglia);
        tetto.rotation.y = Math.PI / 4;
        tetto.position.set(cx, 3.2, cz);
        const porta = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.8), mat.nero);
        porta.position.set(cx, 0.9, o.z1 + 0.01);
        scena.add(tetto, porta);
        break;
      }
      case 'altare':
      case 'altareCuore':
        blocco(scena, mat.pietraMuschio, o, 0, o.altezza, 1.5);
        break;
      case 'idolo': {
        const statua = posa('gothic_statue', cx, cz, o.idolo * 1.7, 1.25);
        if (statua) statua.traverse(m => { if (m.isMesh) m.material = m.material.clone(); });
        break;
      }
      case 'pietraSole':
        blocco(scena, mat.pietraTempio, o, 0, o.altezza, 1.3);
        break;
      case 'pilastroRuna':
      case 'pilastro':
        blocco(scena, o.tipo === 'pilastro' ? mat.pietraTempio : mat.pietraMuschio, o, 0, H, H);
        break;
      case 'roccia': {
        roccia(mat.roccia, cx, cz, l * 1.05, o.altezza ?? 1.6, p * 1.05, 0);
        break;
      }
      default:
    }
  }
  posa('stone_fire_pit', 0, 3, 0, 1.1);
  posa('stone_fire_pit', 0, -22, 0.6, 1.2);
  roccia(mat.pietraMuschio, -33, 13, 2.2, 1, 1.6);
  roccia(mat.pietraMuschio, 30, 37, 1.8, 0.8, 1.4);
  ceppo(-14, 33, 1.2);
  ceppo(44, -6, 1.1);
  for (const [x, z] of [[-9.4, 9.4], [9.4, -9.4], [-23, -40.5], [23, -11.5], [-12.6, 55.4], [12.6, 55.4]]) posa('wooden_lantern_01', x, z, 0, 1.4);

  for (const f of FINESTRE) {
    const tumulo = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.35, 1), mat.fango);
    tumulo.position.set(f.interno.x, 0, f.interno.z);
    const buco = new THREE.Mesh(new THREE.CircleGeometry(0.45, 12).rotateX(-Math.PI / 2), mat.nero);
    buco.position.set(f.interno.x, 0.33, f.interno.z);
    scena.add(tumulo, buco);
  }

  const porte = new Map();
  for (const p of PORTE) {
    const s = p.scatola;
    if (p.id === 'ponte') {
      porte.set(p.id, { tipo: 'ponte' });
      continue;
    }
    const mesh = p.id === 'sigillo'
      ? new THREE.Mesh(new THREE.CircleGeometry(1.9, 32), new THREE.MeshStandardMaterial({ map: texturaGlifo('◎', '#ffcf6a', '#2a1e12'), emissive: 0x6a3a10, emissiveIntensity: 0.9, side: THREE.DoubleSide }))
      : new THREE.Mesh(scatolaUV(s.x1 - s.x0 + 0.1, 2.8, s.z1 - s.z0 + 0.1, 2.8), p.id === 'tempio' ? mat.pietraTempio : mat.corteccia);
    if (p.id === 'sigillo') mesh.position.set(p.centro.x, 1.6, p.centro.z - 0.25);
    else mesh.position.set(p.centro.x, 1.4, p.centro.z);
    scena.add(mesh);
    if (!p.chiusa) {
      for (let i = 0; i < 6; i++) {
        const liana = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.2, 5), mat.fronda);
        liana.position.set(p.centro.x + (caso() - 0.5) * (s.x1 - s.x0 + 0.4), 1.6, p.centro.z + (caso() - 0.5) * (s.z1 - s.z0 + 0.4));
        liana.rotation.z = (caso() - 0.5) * 0.4;
        mesh.attach(liana);
      }
    }
    porte.set(p.id, { tipo: p.id, mesh, apertura: 0 });
  }

  const ponte = new THREE.Group();
  const assi = [];
  for (let z = 21.7; z <= 28.3; z += 0.38) {
    const asse = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.3), mat.assiVecchie);
    asse.position.set(0, -0.04 + Math.sin(((z - 21.7) / 6.6) * Math.PI) * -0.18, z);
    asse.rotation.y = (caso() - 0.5) * 0.06;
    ponte.add(asse);
    assi.push(asse);
  }
  for (const x of [-1.85, 1.85]) {
    const corda = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 6.8, 5).rotateX(Math.PI / 2), mat.corteccia);
    corda.position.set(x, 0.95, 25);
    ponte.add(corda);
    for (const z of [21.8, 28.2]) blocco(ponte, mat.corteccia, { x0: x - 0.1, x1: x + 0.1, z0: z - 0.1, z1: z + 0.1 }, 0, 1.2, 1);
  }
  scena.add(ponte);
  const cantiere = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const a = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.28), mat.assiVecchie);
    a.position.set(3.6 + (i % 2) * 0.1, 0.04 + Math.floor(i / 2) * 0.09, 20.4 - (i % 3) * 0.3);
    cantiere.add(a);
  }
  scena.add(cantiere);

  const cascata = new THREE.MeshBasicMaterial({ map: texturaCascata(), color: 0x6d9a9c, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, fog: true });
  const cascataVeloce = new THREE.MeshBasicMaterial({ map: texturaCascata(), color: 0x2f5257, transparent: true, opacity: 1, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  cascataVeloce.map.repeat.set(1.6, 0.7);
  const velo = new THREE.Mesh(veloCurvo(9, 7), cascata);
  velo.position.set(-31, 3.2, 45.7);
  const veloDavanti = new THREE.Mesh(veloCurvo(8.6, 7), cascataVeloce);
  veloDavanti.position.set(-31, 3.2, 45.55);
  const schiuma = new THREE.MeshBasicMaterial({ map: texturaSchiuma(), color: 0x86b4b2, transparent: true, opacity: 0.75, depthWrite: false });
  const anelloSchiuma = new THREE.Mesh(new THREE.RingGeometry(0.6, 4.2, 32, 2).rotateX(-Math.PI / 2), schiuma);
  anelloSchiuma.position.set(-31, 0.05, 44.2);
  anelloSchiuma.scale.set(1.15, 1, 0.55);
  const pozza = new THREE.Mesh(new THREE.CircleGeometry(4.5, 24).rotateX(-Math.PI / 2), acqua);
  pozza.position.set(-31, 0.02, 42.5);
  blocco(scena, mat.roccia, { x0: -37, x1: -25, z0: 45.9, z1: 47 }, 0, 7, 3);
  scena.add(velo, veloDavanti, anelloSchiuma, pozza);

  const murale = new THREE.Group();
  const lastra = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshStandardMaterial({ color: 0x6b5a44, roughness: 0.95 }));
  murale.add(lastra);
  const freccia = texturaFreccia();
  const frecce = [0, 1, 2].map(i => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ map: freccia }));
    m.position.set(-1.3 + i * 1.3, 0.05, 0.01);
    murale.add(m);
    return m;
  });
  murale.position.set(-38, 1.7, 7.75);
  murale.rotation.y = Math.PI;
  scena.add(murale);

  const pietre = OSTACOLI.filter(o => o.tipo === 'pietraSole').map(o => {
    const disco = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: freccia, emissive: 0x3a2a00, emissiveIntensity: 0.4 }));
    disco.position.set((o.x0 + o.x1) / 2, o.altezza + 0.01, (o.z0 + o.z1) / 2);
    scena.add(disco);
    return disco;
  });

  const rune = OSTACOLI.filter(o => o.tipo === 'pilastroRuna').map(o => {
    const materiale = new THREE.MeshStandardMaterial({ map: texturaGlifo(SIMBOLI_RUNE[o.runa], '#d9f2df'), transparent: true, emissive: 0x1a6a3a, emissiveIntensity: 0.15 });
    const faccia = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), materiale);
    const cx = (o.x0 + o.x1) / 2;
    const verso = cx < 0 ? 1 : -1;
    faccia.position.set(cx + verso * 0.51, 1.6, (o.z0 + o.z1) / 2);
    faccia.rotation.y = verso * Math.PI / 2;
    const nome = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), new THREE.MeshBasicMaterial({ map: texturaTesto([RUNE[o.runa].toUpperCase()], { larghezza: 128, altezza: 32, colore: '#cfe8d4', font: 'bold 18px serif' }), transparent: true }));
    nome.position.set(cx + verso * 0.51, 0.95, (o.z0 + o.z1) / 2);
    nome.rotation.y = verso * Math.PI / 2;
    scena.add(faccia, nome);
    return materiale;
  });

  const altareGiada = [-0.5, 0, 0.5].map(dx => {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), mat.giada.clone());
    m.position.set(OGGETTI.ALTARE.x + dx, 1.2, OGGETTI.ALTARE.z);
    m.visible = false;
    scena.add(m);
    return m;
  });

  const cartello = (righe, x, y, z, verso, larghezza, altezza, opzioni) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza, altezza), new THREE.MeshBasicMaterial({ map: texturaTesto(righe, opzioni), transparent: true }));
    mesh.position.set(x, y, z);
    orientamento(mesh, verso);
    scena.add(mesh);
  };
  const stileCartello = { larghezza: 512, altezza: 320, sfondo: '#14100b', colore: '#efe4c8', font: 'bold 30px sans-serif', bordo: '#6fd08c' };
  cartello(['TENDA DEL COMANDO', '', 'ASPETTATE I COMPAGNI', '', 'INVIO: SONO PRONTO'], CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z, CARTELLO_PRONTI.verso, 3.6, 2.2, stileCartello);
  cartello(['CAMPO BASE DELTA'], 0, 2.5, -9.6, { x: 0, z: 1 }, 2.4, 0.4, { larghezza: 384, altezza: 64, sfondo: '#2a2016', colore: '#e9dfc4', font: 'bold 30px serif' });

  const oggettiVisibili = new Map();
  function creaOggetto(id) {
    const g = new THREE.Group();
    if (ID_ASSI.includes(id)) {
      for (let i = 0; i < 4; i++) {
        const a = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.07, 0.24), mat.assiVecchie);
        a.position.set(0, i * 0.075, (i % 2) * 0.12);
        g.add(a);
      }
    } else if (id === ID_SCHEGGIA_GROTTA) {
      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), mat.giada));
    } else if (id === ID_MASCHERA) {
      const volto = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10, 0, Math.PI), mat.osso);
      for (const dx of [-0.07, 0.07]) {
        const occhio = new THREE.Mesh(new THREE.CircleGeometry(0.04, 8), mat.nero);
        occhio.position.set(dx, 0.04, 0.2);
        g.add(occhio);
      }
      g.add(volto);
    } else {
      const reliquia = Object.entries(RELIQUIE).find(([, n]) => n === id)?.[0];
      if (reliquia) {
        const { gruppo } = modelloArma(reliquia, materialiArmi);
        gruppo.rotation.x = -Math.PI / 2;
        gruppo.scale.setScalar(1.3);
        g.add(gruppo);
        const luce = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: ARMI[reliquia].colore, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
        luce.scale.setScalar(1.6);
        g.add(luce);
      }
    }
    scena.add(g);
    return g;
  }

  const cassaFiume = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 0.5).translate(0, 0.22, 0), mat.assiVecchie);
  cassaFiume.position.set(0, -0.15, 25);
  scena.add(cassaFiume);
  const nubi = new Map();
  const pietreCadenti = new Map();
  const materialeNube = new THREE.SpriteMaterial({ map: alone, color: 0x7dff6a, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
  const materialeSegno = new THREE.MeshBasicMaterial({ color: 0xff3a2a, transparent: true, opacity: 0.6, depthWrite: false });
  const geoSegno = new THREE.RingGeometry(1.6, 2.2, 32).rotateX(-Math.PI / 2);

  const luci = Array.from({ length: luciAccese }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.4);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  let attesaLuci = 0;
  const distanzaDa = (punto, f) => Math.hypot(f.x - punto.x, f.z - punto.z);
  function aggiornaLuci(dt, tempo, punto) {
    attesaLuci -= dt;
    if (punto && attesaLuci <= 0) {
      attesaLuci = SCEGLI_LUCI_OGNI_S;
      const vicine = [...SFONDO_LUCI].sort((a, b) => distanzaDa(punto, a) - distanzaDa(punto, b)).slice(0, luciAccese);
      const libere = luci.filter(l => !vicine.includes(l.fonte));
      for (const f of vicine) {
        if (luci.some(l => l.fonte === f)) continue;
        const l = libere.shift();
        l.fonte = f;
        l.accensione = 0;
        l.luce.color.setHex(f.colore);
        l.luce.distance = f.portata;
        l.luce.position.set(f.x, f.fuoco ? 1.2 : H - 0.5, f.z);
      }
    }
    for (const l of luci) {
      if (!l.fonte) continue;
      const f = l.fonte;
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const tremolio = f.fuoco ? 0.82 + Math.sin(tempo * 9 + f.x) * 0.1 + Math.sin(tempo * 23 + f.z) * 0.08 : 1;
      l.luce.intensity = f.intensita * l.accensione * tremolio;
    }
  }

  const macchine = creaMacchine(scena, { materialiArmi, oggetti, metallo: mat.metallo, legno: mat.legno });
  const sincronizza = (elenco, mappa, crea) => {
    const presenti = new Set();
    for (const e of elenco) {
      presenti.add(e.id);
      if (!mappa.has(e.id)) mappa.set(e.id, crea(e));
    }
    for (const [id, o] of mappa) {
      if (presenti.has(id)) continue;
      scena.remove(o);
      mappa.delete(id);
    }
  };

  return {
    svuota() {
      for (const porta of porte.values()) porta.apertura = 0;
    },
    aggiorna(vista, dt, tempo, punto) {
      macchine.aggiorna(vista, dt, tempo);
      aggiornaLuci(dt, tempo, punto);
      acqua.map.offset.x = (acqua.map.offset.x + dt * 0.05) % 1;
      cascata.map.offset.y = (cascata.map.offset.y + dt * 0.9) % 1;
      cascataVeloce.map.offset.y = (cascataVeloce.map.offset.y + dt * 1.7) % 1;
      schiuma.map.offset.x = (schiuma.map.offset.x + dt * 0.12) % 1;
      anelloSchiuma.rotation.y = Math.sin(tempo * 0.7) * 0.05;
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        if (porta.tipo === 'ponte') {
          const fatto = vista.porte.has('ponte');
          const g = vista.giungla;
          const quota = fatto ? 1 : g ? g.progressoPonte * 0.7 + (g.assiPortate / 3) * 0.2 : 0;
          assi.forEach((a, i) => { a.visible = i / assi.length < Math.max(0.25, quota) || i % 4 === 0; });
          continue;
        }
        if (vista.porte.has(p.id)) porta.apertura = Math.min(1, porta.apertura + dt * (p.id === 'tempio' ? 0.6 : 1.5));
        else porta.apertura = Math.max(0, porta.apertura - dt * 2.5);
        const quotaPorta = p.id === 'tempio' && vista.giungla?.porta === 1 ? vista.giungla.progressoPorta * 0.6 : 0;
        porta.mesh.position.y = (p.id === 'sigillo' ? 1.6 : 1.4) + Math.max(porta.apertura, quotaPorta) * 2.9;
        porta.mesh.visible = porta.apertura < 1;
        if (p.id === 'sigillo') porta.mesh.rotation.z += dt * (vista.giungla?.rune ? 1.5 : 0.2);
      }
      const g = vista.giungla;
      if (!g) return;
      g.generatori.forEach((gen, i) => {
        const gg = generatori[i];
        if (!gg) return;
        gg.spia.material.emissive.setHex(gen.stato === 1 ? (Math.sin(tempo * 10) > 0 ? 0xffc020 : 0x3a2a00) : gen.stato === 2 ? 0x3cff6a : 0xb8241b);
        gg.gruppo.position.y = gen.stato >= 1 ? Math.sin(tempo * 60) * 0.006 : 0;
      });
      cantiere.visible = g.ponte === 0;
      altareGiada.forEach((m, i) => {
        m.visible = i < g.scheggeAltare && g.altare < 3;
        m.rotation.y = tempo * (g.altare === 1 ? 4 : 1);
        m.material.emissiveIntensity = g.altare === 1 ? 1.5 + Math.sin(tempo * 8) : 0.9;
      });
      frecce.forEach((m, i) => { m.rotation.z = -g.soluzione[i] * Math.PI / 2; });
      pietre.forEach((m, i) => {
        m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, -g.pietre[i] * Math.PI / 2, Math.min(1, dt * 6));
        m.material.emissiveIntensity = g.sole >= 1 ? 1.2 : 0.4;
      });
      rune.forEach((materiale, i) => {
        const accesa = g.rune === 1 || g.ordine.slice(0, g.runeToccate).includes(i);
        materiale.emissiveIntensity = THREE.MathUtils.lerp(materiale.emissiveIntensity, accesa ? 2 : 0.15, Math.min(1, dt * 4));
      });
      cassaFiume.visible = !g.scheggiaFiume;
      cassaFiume.position.set(g.cassaFiume.x, -0.12 + Math.sin(tempo * 1.7) * 0.05, g.cassaFiume.z);
      cassaFiume.rotation.y = tempo * 0.3;
      sincronizza(g.oggetti, oggettiVisibili, o => creaOggetto(o.id));
      for (const o of g.oggetti) {
        const m = oggettiVisibili.get(o.id);
        m.position.set(o.x, o.y + (ID_ASSI.includes(o.id) ? 0 : Math.sin(tempo * 2 + o.id) * 0.06), o.z);
        if (!ID_ASSI.includes(o.id)) m.rotation.y = tempo * 1.2;
      }
      sincronizza(g.nubi, nubi, () => {
        const nube = new THREE.Group();
        for (let i = 0; i < 14; i++) {
          const s = new THREE.Sprite(materialeNube);
          s.position.set((Math.random() - 0.5) * 7, 0.4 + Math.random() * 1.6, (Math.random() - 0.5) * 7);
          s.scale.setScalar(1.6 + Math.random() * 1.8);
          nube.add(s);
        }
        scena.add(nube);
        return nube;
      });
      for (const n of g.nubi) {
        const m = nubi.get(n.id);
        m.position.set(n.x, 0, n.z);
        m.rotation.y += dt * 0.3;
        m.scale.setScalar(Math.min(1, n.timer));
      }
      sincronizza(g.pietreCadenti, pietreCadenti, () => {
        const segno = new THREE.Mesh(geoSegno, materialeSegno);
        scena.add(segno);
        return segno;
      });
      for (const p of g.pietreCadenti) {
        const m = pietreCadenti.get(p.id);
        m.position.set(p.x, 0.05, p.z);
        m.scale.setScalar(0.4 + (1 - p.timer / 1.6) * 0.6);
      }
    },
  };
}
