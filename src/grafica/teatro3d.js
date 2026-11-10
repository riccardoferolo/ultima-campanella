import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { R } from '../regole.js';
import { quota as quotaMondo } from '../mappa.js';
import { PROGETTO, ALTEZZA_RECINZIONE, PIANO_ALTO, FONDO_PLATEA, FONDO_CALDAIA, FONDO_SOTTOPALCO } from '../mappe/teatro.js';
import { DURATA_SIPARIO, TRAPPOLE } from '../teatro.js';
import { texturaTesto } from './texture.js';
import { creaCaso } from './caso-grafica.js';
import { scatolaUV, orientamento } from './scuola3d.js';
import { creaMacchine } from './macchine3d.js';

const { ZONE, MURI, RECINZIONI, OSTACOLI, FINESTRE, PORTE, ACQUISTI, CARTELLO_PRONTI, ARREDI, OGGETTI, quota } = PROGETTO;
const zonaDi = (x, z) => ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1)?.id ?? null;
const DAVANZALE = 0.9;
const ARCHITRAVE = 2.3;
const ALTEZZA_PORTA = 2.5;
const SALITA_SIPARIO = 10.5;
const ALTEZZA_SIPARIO = 9.6;
const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.4;
const GOCCE = 900;
const PIOGGIA = Object.freeze({ x0: 12, x1: 28, z0: -12, z1: 24, alto: 14, velocita: 15, vicino: 30 });
const AREE_PIOGGIA = Object.freeze([
  Object.freeze({ x0: 20, x1: 28, z0: -12, z1: 24 }),
  Object.freeze({ x0: 14.3, x1: 20, z0: -6.4, z1: 24 }),
  Object.freeze({ x0: 12.2, x1: 20, z0: -11, z1: -6.5 }),
]);
const GRAVITA_LAMPADARIO = 9.8;

const MATERIALE_PAVIMENTO = Object.freeze({ marmo: 'marmo', moquette: 'moquette', parquet: 'parquet', legno: 'legnoScuro', grata: 'grata', palco: 'palco', asfalto: 'asfalto', metallo: 'metallo', cemento: 'cemento' });
const MATERIALE_ZONA = Object.freeze({
  atrio: 'damasco', passaggio: 'damasco', salone: 'damasco', platea: 'damasco', corridoio: 'intonaco', guardaroba: 'intonaco',
  balcone: 'nero', palco: 'nero', vicoloIngresso: 'mattoni', vicolo: 'mattoni', scalaCaldaia: 'cemento', rampa: 'cemento', caldaia: 'cemento', sottopalco: 'assi', sala: 'intonaco',
});
const SOFFITTI_ORNATI = Object.freeze(new Set(['atrio', 'platea', 'palco', 'salone']));

function tela(l, a, pittore, ripeti = true) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  const ctx = canvas.getContext('2d');
  pittore(ctx, l, a, creaCaso(l * 13 + a * 7));
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function puntini(ctx, l, a, caso, colori, quanti, grandezza = 2) {
  for (let i = 0; i < quanti; i++) {
    ctx.fillStyle = colori[Math.floor(caso() * colori.length)];
    ctx.fillRect(caso() * l, caso() * a, 1 + caso() * grandezza, 1 + caso() * grandezza);
  }
}

const texturaVelluto = () => tela(256, 256, (ctx, l, a, caso) => {
  for (let x = 0; x < l; x++) {
    const piega = Math.sin((x / l) * Math.PI * 8) ** 2;
    const luce = Math.round(40 + 70 * piega);
    ctx.fillStyle = `rgb(${luce + 30},${Math.round(luce * 0.12)},${Math.round(luce * 0.16)})`;
    ctx.fillRect(x, 0, 1, a);
  }
  puntini(ctx, l, a, caso, ['rgba(0,0,0,0.18)', 'rgba(255,200,200,0.06)'], 2500, 1);
});

const texturaMarmo = () => tela(512, 512, (ctx, l, a, caso) => {
  const lato = l / 2;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    ctx.fillStyle = (i + j) % 2 ? '#1f2421' : '#d8cfbd';
    ctx.fillRect(i * lato, j * lato, lato, lato);
  }
  for (let k = 0; k < 26; k++) {
    ctx.strokeStyle = k % 2 ? 'rgba(90,85,78,0.35)' : 'rgba(230,225,210,0.18)';
    ctx.lineWidth = 0.6 + caso() * 1.8;
    ctx.beginPath();
    let x = caso() * l;
    let y = caso() * a;
    ctx.moveTo(x, y);
    for (let s = 0; s < 6; s++) {
      x += (caso() - 0.3) * 120;
      y += (caso() - 0.5) * 90;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(20,16,12,0.8)';
  ctx.fillRect(0, 0, l, 2);
  ctx.fillRect(0, lato - 1, l, 2);
  ctx.fillRect(0, 0, 2, a);
  ctx.fillRect(lato - 1, 0, 2, a);
  puntini(ctx, l, a, caso, ['rgba(0,0,0,0.25)', 'rgba(60,40,20,0.2)'], 900, 3);
});

const texturaMoquette = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#4e0c13';
  ctx.fillRect(0, 0, l, a);
  ctx.strokeStyle = 'rgba(176,138,58,0.45)';
  ctx.lineWidth = 3;
  for (let x = 0; x <= l; x += 64) for (let y = 0; y <= a; y += 64) {
    ctx.beginPath();
    ctx.moveTo(x, y - 22);
    ctx.lineTo(x + 22, y);
    ctx.lineTo(x, y + 22);
    ctx.lineTo(x - 22, y);
    ctx.closePath();
    ctx.stroke();
  }
  puntini(ctx, l, a, caso, ['rgba(0,0,0,0.25)', 'rgba(120,40,40,0.25)', 'rgba(30,10,5,0.3)'], 3000, 2);
});

const texturaDamasco = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#3b1016';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = 'rgba(150,110,50,0.32)';
  for (const [cx, cy] of [[64, 64], [192, 192], [192, -64], [64, 320], [-64, 192], [320, 64]]) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 26, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    for (const lato of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(cx + lato * 34, cy - 10, 10, 24, lato * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  for (let x = 0; x < l; x += 32) ctx.fillRect(x, 0, 2, a);
  for (let i = 0; i < 7; i++) {
    const g = ctx.createRadialGradient(caso() * l, caso() * a, 4, caso() * l, caso() * a, 30 + caso() * 50);
    g.addColorStop(0, 'rgba(20,10,0,0.35)');
    g.addColorStop(1, 'rgba(20,10,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  }
  puntini(ctx, l, a, caso, ['rgba(0,0,0,0.2)'], 1200, 2);
});

const texturaMattoni = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#2a2420';
  ctx.fillRect(0, 0, l, a);
  for (let riga = 0; riga < 16; riga++) {
    const scarto = riga % 2 ? 16 : 0;
    for (let x = -scarto; x < l; x += 32) {
      const r = 80 + caso() * 40;
      ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(r * 0.45)},${Math.round(r * 0.36)})`;
      ctx.fillRect(x + 1, riga * 16 + 1, 30, 14);
    }
  }
  puntini(ctx, l, a, caso, ['rgba(0,0,0,0.3)', 'rgba(255,255,255,0.05)'], 1800, 2);
});

const texturaGrata = () => tela(64, 64, ctx => {
  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = '#6d6f72';
  for (let i = 0; i < 64; i += 8) {
    ctx.fillRect(i, 0, 3, 64);
    ctx.fillRect(0, i, 64, 2);
  }
});

const texturaTetto = () => tela(128, 128, (ctx, l, a, caso) => {
  ctx.fillStyle = '#1b1a1c';
  ctx.fillRect(0, 0, l, a);
  puntini(ctx, l, a, caso, ['#262428', '#121113', '#2e2b26'], 2000, 3);
});

const texturaFondale = () => tela(1024, 512, (ctx, l, a, caso) => {
  const cielo = ctx.createLinearGradient(0, 0, 0, a);
  cielo.addColorStop(0, '#05070f');
  cielo.addColorStop(0.7, '#14203a');
  cielo.addColorStop(1, '#2c1a1a');
  ctx.fillStyle = cielo;
  ctx.fillRect(0, 0, l, a);
  puntini(ctx, l, a * 0.7, caso, ['rgba(255,255,255,0.7)', 'rgba(200,210,255,0.5)'], 260, 2);
  const corona = ctx.createRadialGradient(l / 2, a * 0.36, 60, l / 2, a * 0.36, 190);
  corona.addColorStop(0, 'rgba(255,190,120,1)');
  corona.addColorStop(0.25, 'rgba(255,120,40,0.6)');
  corona.addColorStop(1, 'rgba(120,30,10,0)');
  ctx.fillStyle = corona;
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#020203';
  ctx.beginPath();
  ctx.arc(l / 2, a * 0.36, 66, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0b0a0c';
  for (let x = 0; x < l; x += 40) {
    const h = 60 + caso() * 110;
    ctx.fillRect(x, a - h, 34 + caso() * 20, h);
  }
  ctx.strokeStyle = 'rgba(255,220,160,0.25)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, l - 6, a - 6);
});

const texturaManifesto = (titolo, sotto, colore) => tela(256, 384, (ctx, l, a, caso) => {
  ctx.fillStyle = '#e6d9b8';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = colore;
  ctx.fillRect(14, 14, l - 28, a * 0.55);
  ctx.fillStyle = '#0b0b0b';
  ctx.beginPath();
  ctx.arc(l / 2, a * 0.3, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,210,140,0.9)';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#1b1010';
  ctx.textAlign = 'center';
  ctx.font = 'bold 30px Georgia, serif';
  ctx.fillText(titolo, l / 2, a * 0.7);
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillText(sotto, l / 2, a * 0.79);
  ctx.font = 'bold 16px Georgia, serif';
  ctx.fillText("TEATRO DELL'ECLISSI · 1966", l / 2, a * 0.9);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = `rgba(80,60,30,${0.15 + caso() * 0.2})`;
    ctx.fillRect(caso() * l, caso() * a, 10 + caso() * 60, 4 + caso() * 30);
  }
}, false);

const texturaQuinta = () => tela(256, 512, (ctx, l, a, caso) => {
  ctx.fillStyle = '#1a2230';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#0b1009';
  for (let i = 0; i < 6; i++) {
    const x = caso() * l;
    ctx.beginPath();
    ctx.moveTo(x - 50, a);
    ctx.lineTo(x, a * (0.15 + caso() * 0.3));
    ctx.lineTo(x + 50, a);
    ctx.fill();
  }
  ctx.strokeStyle = '#3a2a1a';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, l - 10, a - 10);
}, false);

function texturaAlone(colore) {
  return tela(64, 64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, colore);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }, false);
}

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
      g.applyMatrix4(m.compose(p.set(x, y, z), q.setFromEuler(e.set(rx, ry, rz, 'YXZ')), s.set(1, 1, 1)));
      if (!pezzi.has(chiave)) pezzi.set(chiave, []);
      pezzi.get(chiave).push(g);
    },
    finisci(scena, materiali) {
      for (const [chiave, elenco] of pezzi) {
        const mesh = new THREE.Mesh(mergeGeometries(elenco, false), materiali[chiave]);
        mesh.matrixAutoUpdate = false;
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

function facciaUV(larghezza, altezza, metri, partenza) {
  const g = new THREE.PlaneGeometry(larghezza, altezza);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * larghezza) / metri, (uv.getY(i) * altezza + partenza) / metri);
  return g;
}

function terrenoUV(x0, z0, x1, z1, passo, metri) {
  const nx = Math.max(1, Math.round((x1 - x0) / passo));
  const nz = Math.max(1, Math.round((z1 - z0) / passo));
  const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, nx, nz).rotateX(-Math.PI / 2);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + cx;
    const z = pos.getZ(i) + cz;
    pos.setY(i, quota(Math.min(x1 - 0.01, Math.max(x0 + 0.01, x)), Math.min(z1 - 0.01, Math.max(z0 + 0.01, z))));
    uv.setXY(i, x / metri, z / metri);
  }
  g.computeVertexNormals();
  return { g, cx, cz };
}

const materialeLato = (x, z) => MATERIALE_ZONA[zonaDi(x, z)] ?? 'esterno';

function muriVicini(s) {
  return MURI.filter(m => m.x0 <= s.x1 + 0.05 && m.x1 >= s.x0 - 0.05 && m.z0 <= s.z1 + 0.05 && m.z1 >= s.z0 - 0.05);
}

export function costruisciTeatro(scenaMondo, { reali, texture, materialiArmi, oggetti, luciAccese = 3 }) {
  const scena = new THREE.Group();
  scena.scale.x = -1;
  scenaMondo.add(scena);
  const caso = creaCaso(1966);
  const pbr = (chiave, extra = {}) => new THREE.MeshStandardMaterial({ ...reali[chiave], metalness: 0, ...extra });
  const conMappa = (map, extra = {}) => new THREE.MeshStandardMaterial({ map, roughness: 0.9, metalness: 0, ...extra });
  const mat = {
    marmo: conMappa(texturaMarmo(), { roughness: 0.22 }),
    moquette: conMappa(texturaMoquette(), { roughness: 1 }),
    velluto: conMappa(texturaVelluto(), { roughness: 0.95, side: THREE.DoubleSide }),
    vellutoSedute: conMappa(texturaVelluto(), { roughness: 0.95 }),
    damasco: conMappa(texturaDamasco(), { roughness: 0.85 }),
    mattoni: conMappa(texturaMattoni(), { roughness: 0.95 }),
    esterno: conMappa(texturaMattoni(), { roughness: 0.95, color: 0x7a7470 }),
    tetto: conMappa(texturaTetto(), { roughness: 1 }),
    grata: conMappa(texturaGrata(), { transparent: false, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5 }),
    intonaco: pbr('muro', { color: 0xc9bca6 }),
    nero: pbr('muro', { color: 0x2c2724 }),
    parquet: pbr('parquet'),
    legnoScuro: pbr('legno', { color: 0x7a5a42 }),
    palco: pbr('legno', { color: 0x8c6c4c }),
    legno: pbr('legno'),
    assi: pbr('assiVecchie'),
    porta: pbr('porta', { color: 0x8a5a40 }),
    cemento: pbr('cemento', { color: 0x8a8580 }),
    asfalto: pbr('asfalto', { color: 0x6e7076, roughness: 0.45 }),
    metallo: pbr('metallo', { metalness: 0.6 }),
    ruggine: pbr('metallo', { color: 0x9a6040, metalness: 0.45 }),
    soffitto: pbr('soffitto', { color: 0x7a6e62 }),
    soffittoOrnato: pbr('soffitto', { color: 0x3a2c26 }),
    oro: new THREE.MeshStandardMaterial({ color: 0xb08a3a, metalness: 0.9, roughness: 0.35 }),
    ottone: new THREE.MeshStandardMaterial({ color: 0x8c6a2c, metalness: 0.85, roughness: 0.4 }),
    ferro: new THREE.MeshStandardMaterial({ color: 0x2b2d30, metalness: 0.7, roughness: 0.45 }),
    nerolucido: new THREE.MeshStandardMaterial({ color: 0x0e0d0f, metalness: 0.2, roughness: 0.3 }),
    specchio: new THREE.MeshStandardMaterial({ color: 0xd9e2ea, metalness: 1, roughness: 0.07 }),
    stoffa: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, side: THREE.DoubleSide }),
    rete: new THREE.MeshStandardMaterial({ map: texture.rete, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5 }),
    pietra: new THREE.MeshStandardMaterial({ color: 0x2a2630, roughness: 0.8 }),
    bianco: new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 0.7 }),
    verdeScuro: new THREE.MeshStandardMaterial({ color: 0x23402f, metalness: 0.4, roughness: 0.6 }),
  };
  const lampadine = new THREE.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.1 });
  const cristallo = new THREE.MeshStandardMaterial({ color: 0xfff1d8, emissive: 0xffd28a, emissiveIntensity: 0.15, metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.85 });
  const emergenza = new THREE.MeshBasicMaterial({ color: 0xff3020 });
  const abiti = [0x7a1a2a, 0x1a3a6a, 0xc8a040, 0x2a5a3a, 0x5a2a6a, 0x222222].map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.9, side: THREE.DoubleSide }));
  const drappoNero = new THREE.MeshStandardMaterial({ color: 0x141214, roughness: 1, side: THREE.DoubleSide });
  const statico = creaStatico();
  const box = (chiave, x0, y0, z0, x1, y1, z1, metri = 1) => statico.aggiungi(chiave, scatolaUV(x1 - x0, y1 - y0, z1 - z0, metri, y0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  const cilindro = (chiave, x, y0, z, raggio, altezza, lati = 12, raggioSotto = raggio) => statico.aggiungi(chiave, new THREE.CylinderGeometry(raggio, raggioSotto, altezza, lati), x, y0 + altezza / 2, z);
  const tubo = (chiave, x0, y, z0, x1, z1, raggio) => {
    const l = Math.hypot(x1 - x0, z1 - z0);
    statico.aggiungi(chiave, new THREE.CylinderGeometry(raggio, raggio, l, 8).rotateZ(Math.PI / 2), (x0 + x1) / 2, y, (z0 + z1) / 2, -Math.atan2(z1 - z0, x1 - x0));
  };
  const cartello = (righe, x, y, z, verso, larghezza, altezza, opzioni) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza, altezza), new THREE.MeshBasicMaterial({ map: texturaTesto(righe, opzioni), transparent: true }));
    mesh.position.set(x, y, z);
    mesh.scale.x = -1;
    orientamento(mesh, verso);
    scena.add(mesh);
    return mesh;
  };
  const quadro = (mappa, x, y, z, verso, larghezza, altezza) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza, altezza), new THREE.MeshStandardMaterial({ map: mappa, roughness: 0.9 }));
    mesh.position.set(x, y, z);
    mesh.scale.x = -1;
    orientamento(mesh, verso);
    scena.add(mesh);
    return mesh;
  };

  for (const zona of ZONE) {
    const chiave = MATERIALE_PAVIMENTO[zona.pavimento] ?? 'cemento';
    const cx = (zona.x0 + zona.x1) / 2;
    const cz = (zona.z0 + zona.z1) / 2;
    const metri = zona.pavimento === 'marmo' ? 3 : zona.aperto ? 4 : 2;
    if (zona.id === 'platea') {
      const { g, cx: x, cz: z } = terrenoUV(zona.x0, zona.z0, zona.x1, zona.z1, 0.5, metri);
      statico.aggiungi(chiave, g, x, 0, z);
    } else if (zona.id !== 'rampa' && zona.id !== 'scalaCaldaia' && zona.id !== 'balcone') {
      statico.aggiungi(chiave, pianoUV(zona.x1 - zona.x0, zona.z1 - zona.z0, metri), cx, quota(cx, cz), cz);
    }
    if (zona.aperto || !Number.isFinite(zona.tetto) || zona.id === 'balcone') continue;
    statico.aggiungi(SOFFITTI_ORNATI.has(zona.id) ? 'soffittoOrnato' : 'soffitto', pianoUV(zona.x1 - zona.x0, zona.z1 - zona.z0, 3, 'giu'), cx, zona.tetto, cz);
  }
  const rampa = terrenoUV(16, 41.8, 23, 44.7, 0.5, 1.5);
  statico.aggiungi('grata', rampa.g, rampa.cx, 0.02, rampa.cz);
  statico.aggiungi('metallo', rampa.g, rampa.cx, -0.03, rampa.cz);
  statico.aggiungi('grata', pianoUV(3.4, 3, 1.5), -16.3, PIANO_ALTO + 0.01, 35);
  for (const z of [33.55, 36.45]) {
    tubo('ferro', -18, PIANO_ALTO + 1.05, z, -14.6, z, 0.03);
    tubo('ferro', -18, PIANO_ALTO + 0.5, z, -14.6, z, 0.02);
    for (let x = -18; x <= -14.55; x += 0.85) cilindro('ferro', x, PIANO_ALTO, z, 0.025, 1.05, 6);
  }
  box('ferro', -18, PIANO_ALTO - 0.12, 33.5, -14.6, PIANO_ALTO, 36.5, 1);
  box('cemento', 17.85, -0.3, 41.8, 18.15, 3.4, 44.7, 2);

  for (const s of MURI) {
    if (s.visibile === false) continue;
    const lungoX = s.x1 - s.x0 > s.z1 - s.z0;
    const cx = (s.x0 + s.x1) / 2;
    const cz = (s.z0 + s.z1) / 2;
    const h = s.y1 - s.y0;
    const cy = (s.y0 + s.y1) / 2;
    if (lungoX) {
      const l = s.x1 - s.x0;
      statico.aggiungi(materialeLato(cx, s.z0 - 0.5), facciaUV(l, h, 3, s.y0), cx, cy, s.z0, Math.PI);
      statico.aggiungi(materialeLato(cx, s.z1 + 0.5), facciaUV(l, h, 3, s.y0), cx, cy, s.z1, 0);
      statico.aggiungi(materialeLato(cx, s.z1 + 0.5), facciaUV(s.z1 - s.z0, h, 3, s.y0), s.x0, cy, cz, -Math.PI / 2);
      statico.aggiungi(materialeLato(cx, s.z1 + 0.5), facciaUV(s.z1 - s.z0, h, 3, s.y0), s.x1, cy, cz, Math.PI / 2);
    } else {
      const l = s.z1 - s.z0;
      statico.aggiungi(materialeLato(s.x0 - 0.5, cz), facciaUV(l, h, 3, s.y0), s.x0, cy, cz, -Math.PI / 2);
      statico.aggiungi(materialeLato(s.x1 + 0.5, cz), facciaUV(l, h, 3, s.y0), s.x1, cy, cz, Math.PI / 2);
      statico.aggiungi(materialeLato(s.x1 + 0.5, cz), facciaUV(s.x1 - s.x0, h, 3, s.y0), cx, cy, s.z0, Math.PI);
      statico.aggiungi(materialeLato(s.x1 + 0.5, cz), facciaUV(s.x1 - s.x0, h, 3, s.y0), cx, cy, s.z1, 0);
    }
    statico.aggiungi('nero', pianoUV(s.x1 - s.x0, s.z1 - s.z0, 3), cx, s.y1, cz);
  }

  const limitiVarco = scatola => {
    const vicini = muriVicini(scatola);
    return { y0: Math.min(...vicini.map(m => m.y0), 0), y1: Math.max(...vicini.map(m => m.y1), 3) };
  };

  for (const r of RECINZIONI) {
    box('rete', r.x0, 0, r.z0, r.x1, ALTEZZA_RECINZIONE, r.z1, 1);
    const lungo = Math.max(r.x1 - r.x0, r.z1 - r.z0);
    for (let t = 0; t <= lungo + 0.01; t += 2.5) {
      const lungoX = r.x1 - r.x0 > r.z1 - r.z0;
      cilindro('ferro', lungoX ? r.x0 + t : (r.x0 + r.x1) / 2, 0, lungoX ? (r.z0 + r.z1) / 2 : r.z0 + t, 0.05, ALTEZZA_RECINZIONE + 0.2, 6);
    }
  }

  const finestre = new Map();
  for (const f of FINESTRE) {
    const base = quota(f.interno.x, f.interno.z);
    const { y0, y1 } = limitiVarco(f.scatola);
    const basso = f.recinzione ? 0.15 : base + DAVANZALE;
    const alto = f.recinzione ? ALTEZZA_RECINZIONE - 0.2 : base + ARCHITRAVE;
    if (!f.recinzione) {
      const chiave = materialeLato(f.interno.x, f.interno.z);
      box(chiave, f.scatola.x0, y0, f.scatola.z0, f.scatola.x1, basso, f.scatola.z1, 3);
      box(chiave, f.scatola.x0, alto, f.scatola.z0, f.scatola.x1, y1, f.scatola.z1, 3);
    }
    const lungo = f.asse === 'z' ? f.scatola.x1 - f.scatola.x0 : f.scatola.z1 - f.scatola.z0;
    const assi = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const asse = new THREE.Mesh(scatolaUV(lungo + 0.35, 0.17, 0.05, 1), mat.legno);
      const y = basso + 0.15 + (i * (alto - basso - 0.3)) / (R.ASSE_PER_FINESTRA - 1);
      asse.position.set(f.centro.x + f.fuori.x * 0.2, y, f.centro.z + f.fuori.z * 0.2);
      asse.rotation.y = f.asse === 'z' ? 0 : Math.PI / 2;
      asse.rotation.z = (caso() - 0.5) * 0.5;
      scena.add(asse);
      assi.push(asse);
    }
    finestre.set(f.id, assi);
    if (!f.recinzione && base > 1) {
      const ex = f.centro.x + f.fuori.x * 3;
      const ez = f.centro.z + f.fuori.z * 3;
      const lx = f.asse === 'z' ? 5 : 6;
      const lz = f.asse === 'z' ? 6 : 5;
      statico.aggiungi('tetto', pianoUV(lx, lz, 3), ex, base - 0.02, ez);
    }
  }

  const porte = new Map();
  for (const p of PORTE) {
    const base = quota(p.centro.x, p.centro.z);
    const { y1 } = limitiVarco(p.scatola);
    const s = p.scatola;
    if (p.id === 'sipario') continue;
    box(materialeLato(p.centro.x + (s.x1 - s.x0 < 1 ? 0.6 : 0), p.centro.z + (s.x1 - s.x0 < 1 ? 0 : -0.6)), s.x0, base + ALTEZZA_PORTA, s.z0, s.x1, y1, s.z1, 3);
    if (p.id === 'centrali') {
      const ante = [-1, 1].map(lato => {
        const perno = new THREE.Group();
        perno.position.set(p.centro.x + lato * 2.5, base, p.centro.z);
        const anta = new THREE.Mesh(scatolaUV(2.5, ALTEZZA_PORTA, 0.12, 2.5), mat.porta);
        anta.position.set(-lato * 1.25, ALTEZZA_PORTA / 2, 0);
        const maniglia = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), mat.oro);
        maniglia.position.set(-lato * 2.3, 1.15, -0.1);
        perno.add(anta, maniglia);
        scena.add(perno);
        return { perno, lato };
      });
      porte.set(p.id, { ante, apertura: 0, base });
      continue;
    }
    const metallica = p.id === 'balcone' || p.id === 'caldaia' || p.id === 'rampa';
    const anta = new THREE.Mesh(scatolaUV(s.x1 - s.x0, ALTEZZA_PORTA, s.z1 - s.z0, ALTEZZA_PORTA), metallica ? mat.ruggine : mat.porta);
    anta.position.set(p.centro.x, base + ALTEZZA_PORTA / 2, p.centro.z);
    scena.add(anta);
    porte.set(p.id, { anta, apertura: 0, base });
  }

  const sipario = new THREE.Group();
  const pieghe = new THREE.PlaneGeometry(24, ALTEZZA_SIPARIO, 96, 1);
  const pos = pieghe.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 2.2) * 0.18);
  pieghe.computeVertexNormals();
  const telo = new THREE.Mesh(pieghe, mat.velluto);
  telo.position.set(0, ALTEZZA_SIPARIO / 2, 0);
  const frangia = new THREE.Mesh(new THREE.BoxGeometry(24, 0.18, 0.12), mat.oro);
  frangia.position.y = 0.09;
  sipario.add(telo, frangia);
  sipario.position.set(0, 0, 27.05);
  scena.add(sipario);
  box('oro', -12.6, 0, 26.75, -12, 10.4, 27.25);
  box('oro', 12, 0, 26.75, 12.6, 10.4, 27.25);
  box('oro', -12.6, 9.6, 26.75, 12.6, 10.4, 27.25);
  box('damasco', -16, 10.4, 26.85, 16, 15, 27.15, 3);
  const mantovana = new THREE.Mesh(new THREE.PlaneGeometry(24, 1.4, 48, 1), mat.velluto);
  const pm = mantovana.geometry.attributes.position;
  for (let i = 0; i < pm.count; i++) pm.setZ(i, Math.sin(pm.getX(i) * 1.3) * 0.12);
  mantovana.geometry.computeVertexNormals();
  mantovana.position.set(0, 8.9, 26.7);
  scena.add(mantovana);
  for (const lato of [-1, 1]) {
    const drappo = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 10, 12, 1), mat.velluto);
    const pd = drappo.geometry.attributes.position;
    for (let i = 0; i < pd.count; i++) pd.setZ(i, Math.sin(pd.getX(i) * 4) * 0.12);
    drappo.geometry.computeVertexNormals();
    drappo.position.set(lato * 13.1, 5, 26.68);
    scena.add(drappo);
  }

  const passiScala = (x0, x1, z0, z1, y0, y1, gradini, chiaveGradino, chiavePassatoia = null) => {
    for (let i = 0; i < gradini; i++) {
      const za = z0 + ((z1 - z0) * i) / gradini;
      const zb = z0 + ((z1 - z0) * (i + 1)) / gradini;
      const top = y0 + ((y1 - y0) * (i + 1)) / gradini;
      box(chiaveGradino, x0, Math.min(y0, y1), Math.min(za, zb), x1, top, Math.max(za, zb), 1);
      if (chiavePassatoia) box(chiavePassatoia, x0 + 0.5, top, Math.min(za, zb), x1 - 0.5, top + 0.01, Math.max(za, zb), 1);
    }
  };
  passiScala(-11.6, -9, -6, 1, 0, PIANO_ALTO, 20, 'marmo', 'moquette');
  box('marmo', -12, PIANO_ALTO - 0.3, 1, -7, PIANO_ALTO, 4, 3);
  box('moquette', -11.6, PIANO_ALTO, 1.2, -7.2, PIANO_ALTO + 0.01, 3.8, 2);
  for (let i = 0; i < 20; i++) box('damasco', -9.15, 0, -6 + i * 0.35, -8.85, (PIANO_ALTO * (i + 1)) / 20 + 0.12, -6 + (i + 1) * 0.35, 3);
  box('damasco', -9, 0, 0.85, -7, PIANO_ALTO - 0.3, 1.15, 3);
  box('damasco', -7.15, 0, 1, -6.85, PIANO_ALTO - 0.3, 4, 3);
  const balaustra = (x0, z0, x1, z1, y0, y1) => {
    const l = Math.hypot(x1 - x0, z1 - z0);
    const passi = Math.max(2, Math.round(l / 0.35));
    for (let i = 0; i <= passi; i++) {
      const t = i / passi;
      cilindro('oro', x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, z0 + (z1 - z0) * t, 0.035, 0.95, 6);
    }
    const lx = x1 - x0;
    const lz = z1 - z0;
    const lungh = Math.hypot(lx, lz, y1 - y0);
    const corrimano = new THREE.CylinderGeometry(0.05, 0.05, lungh, 8);
    const dir = new THREE.Vector3(lx, y1 - y0, lz).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    corrimano.applyQuaternion(q);
    statico.aggiungi('oro', corrimano, (x0 + x1) / 2, (y0 + y1) / 2 + 0.95, (z0 + z1) / 2);
  };
  balaustra(-9, -5.4, -9, 1, 0.3, PIANO_ALTO);
  balaustra(-9, 1, -7, 1, PIANO_ALTO, PIANO_ALTO);
  balaustra(-7, 1, -7, 4, PIANO_ALTO, PIANO_ALTO);
  passiScala(9, 11.6, -6, -2.2, 0, 2.4, 11, 'marmo', 'moquette');
  box('marmo', 7, PIANO_ALTO - 0.3, 1, 12, PIANO_ALTO, 4, 3);
  for (let i = 0; i < 11; i++) box('damasco', 8.8, 0, -6 + i * 0.345, 9.1, (2.4 * (i + 1)) / 11 + 0.12, -6 + (i + 1) * 0.345, 3);
  box('damasco', 8.8, 0, -2.2, 9.1, 1.4, 1, 3);
  box('damasco', 7, 0, 0.85, 9, PIANO_ALTO - 0.3, 1.15, 3);
  box('damasco', 6.85, 0, 1, 7.15, PIANO_ALTO - 0.3, 4, 3);
  balaustra(7, 1, 12, 1, PIANO_ALTO, PIANO_ALTO);
  for (let i = 0; i < 26; i++) {
    const x = 9 + caso() * 3;
    const z = -2.4 + caso() * 3.6;
    const g = new THREE.BoxGeometry(0.3 + caso() * 0.8, 0.2 + caso() * 0.5, 0.3 + caso() * 0.8);
    statico.aggiungi(i % 3 ? 'marmo' : 'cemento', g, x, quota(x, z) + caso() * 2.2, z, caso() * 3, caso(), caso());
  }
  for (const [x0, x1, punta] of [[-7, -3.6, -3.1], [3.6, 7, 3.1]]) {
    box('marmo', x0, PIANO_ALTO - 0.3, 1.4, x1, PIANO_ALTO, 3.6, 3);
    statico.aggiungi('cemento', new THREE.BoxGeometry(0.8, 0.3, 1.6), punta, PIANO_ALTO - 0.4, 2.5, 0, 0, punta < 0 ? -0.5 : 0.5);
  }

  box('legnoScuro', -11.8, 0, -10, -10, 1.1, -7, 1);
  box('vetro', -10.05, 1.1, -9.8, -10, 2.2, -7.2, 1);
  box('legnoScuro', -11.8, 2.2, -10, -10, 2.6, -7, 1);
  cartello(['BIGLIETTERIA'], -9.98, 2.4, -8.5, { x: 1, z: 0 }, 1.6, 0.3, { larghezza: 256, altezza: 48, sfondo: '#1a0c0a', colore: '#e8c98a', font: 'bold 26px Georgia, serif' });
  for (const [x, z] of [[-4.5, -12.6], [4.5, -12.6], [-5.5, 2.4], [5.5, 2.4]]) {
    cilindro('marmo', x, 0, z, 0.42, 11, 16);
    cilindro('oro', x, 0, z, 0.55, 0.4, 16);
    cilindro('oro', x, 10.4, z, 0.6, 0.6, 16, 0.42);
  }
  box('porta', -3, 0, -13.86, 3, 3.6, -13.8, 2);
  for (let i = 0; i < 7; i++) {
    statico.aggiungi('legno', scatolaUV(6.4, 0.2, 0.06, 1), 0, 0.4 + i * 0.5, -13.74, 0, 0, (caso() - 0.5) * 0.3);
  }
  cartello(["TEATRO DELL'ECLISSI"], 0, 5.4, -13.8, { x: 0, z: 1 }, 7, 1.1, { larghezza: 1024, altezza: 160, sfondo: '#140808', colore: '#d9b56a', font: 'bold 92px Georgia, serif', bordo: '#7a5a2a' });
  quadro(texturaManifesto('LA NOTTE', 'senza sole', '#5a1a1a'), -9.5, 2.6, -13.82, { x: 0, z: 1 }, 1.6, 2.4);
  quadro(texturaManifesto('IL VELO', 'ultima replica', '#1a2a4a'), 9.5, 2.6, -13.82, { x: 0, z: 1 }, 1.6, 2.4);
  quadro(texturaManifesto('LA CORONA', 'prima assoluta', '#3a2a10'), 11.82, 2.6, -2, { x: -1, z: 0 }, 1.6, 2.4);
  box('moquette', -1.6, 0, -13.5, 1.6, 0.01, 3.6, 2);
  for (const [x, z, verso] of [[-11.8, -4, { x: 1, z: 0 }], [11.8, -4, { x: -1, z: 0 }]]) {
    const applique = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), lampadine);
    applique.position.set(x + verso.x * 0.2, 3.2, z);
    scena.add(applique);
  }

  const lampadario = new THREE.Group();
  const anelli = [[1.6, 0], [1.1, -0.5], [0.6, -1]];
  for (const [r, y] of anelli) {
    const anello = new THREE.Mesh(new THREE.TorusGeometry(r, 0.04, 6, 32).rotateX(Math.PI / 2), mat.ottone);
    anello.position.y = y;
    lampadario.add(anello);
  }
  const prismi = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.09).scale(0.6, 1.6, 0.6), cristallo, 90);
  const mm = new THREE.Matrix4();
  let n = 0;
  for (const [r, y] of anelli) {
    const quanti = Math.round(r * 18);
    for (let i = 0; i < quanti && n < 90; i++, n++) {
      const a = (i / quanti) * Math.PI * 2;
      prismi.setMatrixAt(n, mm.makeTranslation(Math.cos(a) * r, y - 0.25, Math.sin(a) * r));
    }
  }
  prismi.count = n;
  const catena = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.6, 6), mat.ottone);
  catena.position.y = 1.8;
  const fusto = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.25, 1.4, 10), mat.ottone);
  fusto.position.y = -0.4;
  lampadario.add(prismi, catena, fusto);
  lampadario.position.set(OGGETTI.LAMPADARIO.x, OGGETTI.LAMPADARIO.y, OGGETTI.LAMPADARIO.z);
  scena.add(lampadario);
  const statoLampadario = { caduta: 0, velocita: 0, visto: 0 };

  box('legnoScuro', -26, PIANO_ALTO, 7.2, -17.5, PIANO_ALTO + 1.1, 8.4, 1);
  box('marmo', -26.1, PIANO_ALTO + 1.1, 7.1, -17.4, PIANO_ALTO + 1.18, 8.5, 2);
  statico.aggiungi('legnoScuro', new THREE.CylinderGeometry(0.6, 0.6, 1.1, 16, 1, false, 0, Math.PI), -17.5, PIANO_ALTO + 0.55, 7.8, Math.PI / 2);
  for (const y of [1.4, 2.1, 2.8]) box('legnoScuro', -27, PIANO_ALTO + y, 9.45, -16.5, PIANO_ALTO + y + 0.05, 9.85, 1);
  box('specchio', -26, PIANO_ALTO + 1.3, 9.83, -17.5, PIANO_ALTO + 3.2, 9.84, 1);
  const bottiglie = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.045, 0.05, 0.3, 8), new THREE.MeshStandardMaterial({ color: 0x3a6a3a, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.8 }), 60);
  let nb = 0;
  for (const y of [1.45, 2.15, 2.85]) for (let x = -26.6; x < -16.8 && nb < 60; x += 0.5) {
    if (caso() < 0.25) continue;
    bottiglie.setMatrixAt(nb++, mm.makeTranslation(x, PIANO_ALTO + y + 0.18, 9.65));
  }
  bottiglie.count = nb;
  scena.add(bottiglie);
  for (const o of OSTACOLI.filter(q => q.tipo === 'tavoloRovesciato')) {
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const giro = caso() * Math.PI;
    statico.aggiungi('legnoScuro', new THREE.CylinderGeometry(0.55, 0.55, 0.05, 18).rotateX(Math.PI / 2), cx, PIANO_ALTO + 0.55, cz, giro);
    statico.aggiungi('ottone', new THREE.CylinderGeometry(0.04, 0.04, 0.7, 6).rotateX(Math.PI / 2), cx + Math.sin(giro) * 0.35, PIANO_ALTO + 0.55, cz + Math.cos(giro) * 0.35, giro);
  }
  const lampadarioSalone = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 6, 24).rotateX(Math.PI / 2), mat.ottone);
  lampadarioSalone.position.set(-21, 7.9, 2);
  scena.add(lampadarioSalone);
  quadro(texturaManifesto('MASCHERE', 'ballo di gala', '#2a1a3a'), -27.82, PIANO_ALTO + 1.8, -2, { x: 1, z: 0 }, 1.4, 2.1);

  box('moquette', -23, PIANO_ALTO, 10, -21.5, PIANO_ALTO + 0.01, 26, 2);
  for (let z = 12; z < 26; z += 3.5) quadro(texturaManifesto('ATTO ' + ['I', 'II', 'III', 'IV'][Math.round((z - 12) / 3.5) % 4], 'replica', '#2a2a2a'), -23.83, PIANO_ALTO + 1.7, z, { x: 1, z: 0 }, 0.7, 1);
  const ugelli = [];
  for (const nome of TRAPPOLE) {
    const a = OGGETTI.TRAPPOLE[nome];
    const base = quota((a.x0 + a.x1) / 2, (a.z0 + a.z1) / 2);
    const lungoX = a.x1 - a.x0 > a.z1 - a.z0;
    for (const lato of [0, 1]) {
      if (lungoX) tubo('ferro', a.x0, base + 0.08, lato ? a.z1 : a.z0, a.x1, lato ? a.z1 : a.z0, 0.05);
      else tubo('ferro', lato ? a.x1 : a.x0, base + 0.08, a.z0, lato ? a.x1 : a.x0, a.z1, 0.05);
    }
    ugelli.push({ nome, area: a, base });
  }

  for (const o of OSTACOLI) {
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const l = o.x1 - o.x0;
    const p = o.z1 - o.z0;
    if (o.tipo === 'specchiera') {
      const lungoX = l > p;
      box('legnoScuro', o.x0, o.base, o.z0, o.x1, o.base + 0.8, o.z1, 1);
      const sx = lungoX ? o.x0 + 0.1 : o.x0 < -29 ? o.x0 + 0.02 : o.x1 - 0.04;
      const ex = lungoX ? o.x1 - 0.1 : sx + 0.02;
      const sz = lungoX ? o.z1 - 0.06 : o.z0 + 0.1;
      const ez = lungoX ? sz + 0.02 : o.z1 - 0.1;
      box('specchio', sx, o.base + 0.9, sz, ex, o.base + 1.85, ez, 1);
      for (let t = 0; t <= 1.001; t += 0.2) {
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), lampadine);
        lamp.position.set(lungoX ? sx + (ex - sx) * t : sx, o.base + 1.9, lungoX ? sz : sz + (ez - sz) * t);
        scena.add(lamp);
      }
    } else if (o.tipo === 'manichino') {
      cilindro('ferro', cx, o.base, cz, 0.18, 0.04, 10);
      cilindro('ferro', cx, o.base, cz, 0.02, 1.1, 6);
      const busto = new THREE.LatheGeometry([[0, 0], [0.16, 0], [0.2, 0.18], [0.15, 0.4], [0.19, 0.6], [0.06, 0.72], [0, 0.74]].map(([x, y]) => new THREE.Vector2(x, y)), 14);
      statico.aggiungi(caso() < 0.5 ? 'bianco' : 'stoffa', busto, cx, o.base + 1.05, cz);
    } else if (o.tipo === 'stender') {
      const lungoX = l > p;
      for (const t of [0, 1]) cilindro('ferro', lungoX ? o.x0 + t * l : cx, o.base, lungoX ? cz : o.z0 + t * p, 0.025, 1.75, 6);
      if (lungoX) tubo('ferro', o.x0, o.base + 1.72, cz, o.x1, cz, 0.02);
      else tubo('ferro', cx, o.base + 1.72, o.z0, cx, o.z1, 0.02);
      for (let t = 0.1; t < 0.95; t += 0.16) {
        const abito = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.2), abiti[Math.floor(caso() * abiti.length)]);
        abito.position.set(lungoX ? o.x0 + t * l : cx, o.base + 1.1, lungoX ? cz : o.z0 + t * p);
        abito.rotation.y = (lungoX ? Math.PI / 2 : 0) + (caso() - 0.5) * 0.4;
        scena.add(abito);
      }
    } else if (o.tipo === 'baule') {
      box('legnoScuro', o.x0, o.base, o.z0, o.x1, o.base + o.altezza, o.z1, 1);
      for (const t of [0.2, 0.8]) box('ottone', o.x0 + l * t - 0.03, o.base, o.z0 - 0.01, o.x0 + l * t + 0.03, o.base + o.altezza + 0.01, o.z1 + 0.01, 1);
    } else if (o.tipo === 'casseScena') {
      for (let y = 0; y < 4.4; y += 1.1) box(y % 2.2 ? 'legno' : 'assi', o.x0 + 0.05, y, o.z0 + 0.05, o.x1 - 0.05, y + 1.05, o.z1 - 0.05, 1);
      quadro(texturaQuinta(), o.x1 + 0.02, 2.2, cz, { x: 1, z: 0 }, 2.8, 4.2);
    } else if (o.tipo === 'quinta') {
      box('legno', o.x0, 0, cz - 0.05, o.x1, o.altezza, cz + 0.05, 2);
      quadro(texturaQuinta(), cx, o.altezza / 2, cz + 0.06, { x: 0, z: 1 }, l, o.altezza);
      quadro(texturaQuinta(), cx, o.altezza / 2, cz - 0.06, { x: 0, z: -1 }, l, o.altezza);
    } else if (o.tipo === 'casse') {
      box('legno', o.x0, 0, o.z0, o.x1, 0.9, o.z1, 1);
      box('assi', o.x0 + 0.3, 0.9, o.z0 + 0.3, o.x1 - 0.5, 1.4, o.z1 - 0.4, 1);
    } else if (o.tipo === 'pianoforte') {
      box('nerolucido', o.x0, 0.7, o.z0, o.x1, 1.05, o.z1, 1);
      for (const [x, z] of [[o.x0 + 0.2, o.z0 + 0.2], [o.x1 - 0.2, o.z0 + 0.2], [cx, o.z1 - 0.2]]) cilindro('nerolucido', x, 0, z, 0.06, 0.7, 8);
      statico.aggiungi('nerolucido', new THREE.BoxGeometry(l, 0.03, p), cx, 1.6, cz, 0, 0, 0.6);
    } else if (o.tipo === 'ribalta') {
      box('legnoScuro', o.x0, FONDO_PLATEA, o.z0, o.x1, 0, o.z1, 1);
      box('oro', o.x0, 0, o.z0 - 0.02, o.x1, 0.06, o.z1, 1);
      for (let x = o.x0 + 0.5; x < o.x1; x += 1) {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), lampadine);
        b.position.set(x, 0.12, o.z0 + 0.1);
        scena.add(b);
      }
    } else if (o.tipo === 'cassonetto') {
      box('verdeScuro', o.x0, 0.15, o.z0, o.x1, o.altezza, o.z1, 1);
      statico.aggiungi('verdeScuro', new THREE.BoxGeometry(l + 0.05, 0.06, p + 0.05), cx, o.altezza + 0.1, cz, 0, 0, 0.25);
    } else if (o.tipo === 'auto') {
      const auto = oggetti.get('covered_car')?.clone();
      if (auto) {
        auto.position.set(cx, 0, cz);
        auto.rotation.y = Math.PI / 2 + 0.05;
        scena.add(auto);
      }
    } else if (o.tipo === 'fornace') {
      const r = Math.min(l, p) / 2;
      cilindro('ruggine', cx, o.base, cz, r, o.altezza, 20);
      cilindro('ferro', cx, o.base + o.altezza, cz, 0.5, -o.base - o.altezza + 0.2, 10);
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) tubo('ferro', cx + Math.cos(a) * r, o.base + 0.6, cz + Math.sin(a) * r, cx + Math.cos(a) * (r + 0.05), cz + Math.sin(a) * (r + 0.05), 0.05);
    } else if (o.tipo === 'tubi') {
      box('cemento', o.x0, o.base, o.z0, o.x1, o.base + o.altezza, o.z1, 2);
      const lungoX = l > p;
      for (let k = 0; k < 4; k++) {
        const y = o.base + 0.5 + k * 0.62;
        const r = 0.09 + caso() * 0.1;
        if (lungoX) for (const z of [o.z0 - r, o.z1 + r]) tubo(k % 2 ? 'ruggine' : 'metallo', o.x0, y, z, o.x1, z, r);
        else for (const x of [o.x0 - r, o.x1 + r]) tubo(k % 2 ? 'ruggine' : 'metallo', x, y, o.z0, x, o.z1, r);
      }
    } else if (o.tipo === 'macchinaScena') {
      box('legno', o.x0, o.base, o.z0, o.x1, o.base + 0.3, o.z1, 1);
      for (const [x, r] of [[o.x0 + 0.8, 0.7], [o.x1 - 0.9, 0.55]]) statico.aggiungi('ferro', new THREE.CylinderGeometry(r, r, 0.12, 16).rotateX(Math.PI / 2), x, o.base + 1.2, cz);
    } else if (o.tipo === 'generatore') {
      box('verdeScuro', o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 1);
      box('ferro', o.x0 - 0.05, o.altezza, o.z0 - 0.05, o.x1 + 0.05, o.altezza + 0.08, o.z1 + 0.05, 1);
    } else if (o.tipo === 'biglietteria' || o.tipo === 'scalaCrollata' || o.tipo === 'colonna' || o.tipo === 'bancone' || o.tipo === 'tavoloRovesciato' || o.tipo === 'poltrone') {
      continue;
    } else {
      box('legno', o.x0, o.base, o.z0, o.x1, o.base + o.altezza, o.z1, 1);
    }
  }

  const sedute = [];
  for (let z = 9.4; z < 20.8; z += 0.9) for (let x = -7.7; x <= 7.71; x += 0.56) {
    if (caso() < 0.05) continue;
    sedute.push({ x, z, piega: caso() < 0.08 ? 0.6 + caso() * 0.4 : (caso() - 0.5) * 0.08 });
  }
  const schienali = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.75, 0.08), mat.vellutoSedute, sedute.length);
  const cuscini = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.12, 0.45), mat.vellutoSedute, sedute.length);
  const telai = new THREE.InstancedMesh(new THREE.BoxGeometry(0.04, 0.5, 0.5), mat.ferro, sedute.length);
  const tq = new THREE.Quaternion();
  const te = new THREE.Euler();
  const ts = new THREE.Vector3(1, 1, 1);
  const tp = new THREE.Vector3();
  sedute.forEach((s, i) => {
    const y = quota(s.x, s.z);
    schienali.setMatrixAt(i, mm.compose(tp.set(s.x, y + 0.75, s.z - 0.2), tq.setFromEuler(te.set(-0.15 - s.piega, 0, 0)), ts));
    cuscini.setMatrixAt(i, mm.compose(tp.set(s.x, y + 0.42, s.z + 0.02), tq.setFromEuler(te.set(s.piega > 0.3 ? 1.2 : 0, 0, 0)), ts));
    telai.setMatrixAt(i, mm.compose(tp.set(s.x - 0.27, y + 0.25, s.z), tq.identity(), ts));
  });
  for (const im of [schienali, cuscini, telai]) {
    im.computeBoundingSphere();
    scena.add(im);
  }
  box('legnoScuro', -1.2, quota(0, 9), 8.5, 1.2, quota(0, 9) + 1.05, 9.2, 1);
  for (const lato of [-1, 1]) for (const [y0, y1] of [[3.4, 4.2], [6.4, 7.2]]) {
    const x = lato * 13.6;
    box('damasco', lato < 0 ? -14 : x, y0, 6, lato < 0 ? x : 14, y1, 22, 2);
    box('oro', lato < 0 ? x - 0.03 : x, y1 - 0.08, 6, lato < 0 ? x : x + 0.03, y1, 22, 1);
  }
  for (const lato of [-1, 1]) {
    for (let k = 0; k < 6; k++) {
      const z = 23 + k * 0.5;
      const top = quota(lato * 11.9, Math.min(26, z + 0.5));
      box('legnoScuro', lato < 0 ? -13.85 : 10.15, FONDO_PLATEA, z, lato < 0 ? -10.15 : 13.85, top, z + 0.5, 1);
    }
    box('legnoScuro', lato * 10 - 0.12, FONDO_PLATEA, 23.4, lato * 10 + 0.12, 0.9, 26, 1);
  }
  const rosone = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.12, 8, 40).rotateX(Math.PI / 2), mat.oro);
  rosone.position.set(0, 10.9, 15);
  scena.add(rosone);
  cartello(['USCITA'], 0, 3.1, 4.17, { x: 0, z: 1 }, 1, 0.3, { larghezza: 128, altezza: 40, sfondo: '#3a0606', colore: '#ff5a4a', font: 'bold 26px sans-serif' });

  const fondale = quadro(texturaFondale(), 0, 7, 44.8, { x: 0, z: -1 }, 30, 13);
  fondale.material.roughness = 1;
  for (let k = 0; k < 4; k++) {
    tubo('ferro', -15, 11 + k * 0.6, 30 + k * 3.5, 15, 30 + k * 3.5, 0.05);
    for (let x = -12; x <= 12; x += 4) cilindro('nerolucido', x, 10.5 + k * 0.6, 30 + k * 3.5, 0.18, 0.4, 10, 0.12);
  }
  for (let z = 28; z < 45; z += 1.2) cilindro('legno', 15.6, 0, z, 0.02, 12, 4);
  for (const lato of [-1, 1]) {
    const quinta = new THREE.Mesh(new THREE.PlaneGeometry(3, 12, 10, 1), drappoNero);
    const pq = quinta.geometry.attributes.position;
    for (let i = 0; i < pq.count; i++) pq.setZ(i, Math.sin(pq.getX(i) * 4) * 0.1);
    quinta.geometry.computeVertexNormals();
    quinta.position.set(lato * 13.5, 6, 36);
    quinta.rotation.y = Math.PI / 2;
    scena.add(quinta);
  }
  const botola = new THREE.Group();
  const anta = new THREE.Mesh(scatolaUV(1.6, 0.04, 1.6, 1.6), mat.assi);
  const cornice = new THREE.Mesh(new THREE.TorusGeometry(1.13, 0.04, 4, 4).rotateX(Math.PI / 2).rotateY(Math.PI / 4), mat.ferro);
  const bagliore = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.03, 4, 4).rotateX(Math.PI / 2).rotateY(Math.PI / 4), new THREE.MeshBasicMaterial({ color: 0x8a4dff, transparent: true, opacity: 0 }));
  botola.add(anta, cornice, bagliore);
  botola.position.set(0, 0.02, 34);
  scena.add(botola);
  const lucePalco = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), lampadine);
  lucePalco.position.set(3, 2.2, 31);
  cilindro('ferro', 3, 0, 31, 0.03, 2.1, 6);
  cilindro('ferro', 3, 0, 31, 0.3, 0.05, 10);
  scena.add(lucePalco);
  const leva = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0xb8241b, roughness: 0.4 }));
  leva.position.set(0, 1.35, 43.7);
  leva.geometry.translate(0, 0.4, 0);
  const spieGeneratore = [-1.1, -0.5, 0.5, 1.1].map(x => {
    const spia = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: 0x5a0a0a }));
    spia.position.set(x, 1.9, 43.76);
    scena.add(spia);
    return spia;
  });
  scena.add(leva);
  cartello(['GENERATORE CENTRALE'], 0, 2.15, 43.76, { x: 0, z: -1 }, 2.6, 0.3, { larghezza: 512, altezza: 56, sfondo: '#1d2418', colore: '#e8dfb8', font: 'bold 30px monospace' });

  const sentinella = new THREE.Group();
  const corpoS = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.6, 14), mat.ferro);
  const canna = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.1, 8).rotateX(Math.PI / 2), mat.nerolucido);
  canna.position.set(0, -0.15, 0.6);
  const fiammata = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,210,120,1)'), color: 0xffc070, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  fiammata.position.set(0, -0.15, 1.2);
  fiammata.scale.setScalar(0.6);
  const spiaS = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0x3a0a0a }));
  spiaS.position.set(0, 0.1, 0.42);
  sentinella.add(corpoS, canna, fiammata, spiaS);
  sentinella.position.set(OGGETTI.SENTINELLA.x, OGGETTI.SENTINELLA.y, OGGETTI.SENTINELLA.z);
  cilindro('ferro', OGGETTI.SENTINELLA.x, OGGETTI.SENTINELLA.y + 0.3, OGGETTI.SENTINELLA.z, 0.08, 1.3, 8);
  scena.add(sentinella);
  const tracciante = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: 0xffd28a, transparent: true, opacity: 0.8 }));
  tracciante.frustumCulled = false;
  scenaMondo.add(tracciante);

  const materialeFuoco = new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,170,60,1)'), color: 0xff8a3a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const fuochi = ugelli.map(u => {
    const gruppo = new THREE.Group();
    const fiamme = [];
    for (let i = 0; i < 18; i++) {
      const s = new THREE.Sprite(materialeFuoco);
      const x = u.area.x0 + caso() * (u.area.x1 - u.area.x0);
      const z = u.area.z0 + caso() * (u.area.z1 - u.area.z0);
      s.position.set(x, quota(x, z) + 0.6, z);
      s.userData.fase = caso() * 10;
      gruppo.add(s);
      fiamme.push(s);
    }
    gruppo.visible = false;
    scena.add(gruppo);
    return { nome: u.nome, gruppo, fiamme };
  });

  const gocce = new Float32Array(GOCCE * 6);
  const superfici = AREE_PIOGGIA.map(a => (a.x1 - a.x0) * (a.z1 - a.z0));
  const totale = superfici.reduce((a, b) => a + b, 0);
  for (let i = 0; i < GOCCE; i++) {
    let scelta = caso() * totale;
    const area = AREE_PIOGGIA.find((a, k) => (scelta -= superfici[k]) < 0) ?? AREE_PIOGGIA[0];
    const x = area.x0 + caso() * (area.x1 - area.x0);
    const z = area.z0 + caso() * (area.z1 - area.z0);
    const y = caso() * PIOGGIA.alto;
    gocce.set([x, y, z, x + 0.02, y - 0.45, z], i * 6);
  }
  const geometriaPioggia = new THREE.BufferGeometry();
  geometriaPioggia.setAttribute('position', new THREE.BufferAttribute(gocce, 3));
  const pioggia = new THREE.LineSegments(geometriaPioggia, new THREE.LineBasicMaterial({ color: 0x9fb2cc, transparent: true, opacity: 0.35 }));
  pioggia.frustumCulled = false;
  scena.add(pioggia);
  const acquaFerma = new THREE.MeshStandardMaterial({ color: 0x2a2f38, metalness: 0.5, roughness: 0.04, transparent: true, opacity: 0.5, depthWrite: false });
  for (let i = 0; i < 7; i++) {
    const x = 21 + caso() * 6;
    const z = -10 + caso() * 32;
    const pozza = new THREE.Mesh(new THREE.CircleGeometry(0.6 + caso() * 1.2, 20).rotateX(-Math.PI / 2), acquaFerma);
    pozza.scale.set(1, 1, 0.5 + caso() * 0.6);
    pozza.position.set(x, 0.01, z);
    scena.add(pozza);
  }
  cilindro('ferro', 27.6, 0, 0.5, 0.08, 5, 8);
  tubo('ferro', 27.6, 5, 0.5, 26.6, 0.5, 0.05);
  const lampione = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.3), new THREE.MeshBasicMaterial({ color: 0xffb060 }));
  lampione.position.set(26.5, 4.9, 0.5);
  scena.add(lampione);
  for (let y = 3; y < 11; y += 2.8) {
    box('ferro', 27.6, y, 9, 27.95, y + 0.06, 13, 1);
    for (let z = 9; z <= 13; z += 1) cilindro('ferro', 27.9, y, z, 0.02, 1, 4);
  }
  cartello(['INGRESSO ARTISTI'], 25.5, 3.2, 23.83, { x: 0, z: -1 }, 2.2, 0.32, { larghezza: 384, altezza: 56, sfondo: '#101010', colore: '#d0b070', font: 'bold 28px Georgia, serif' });

  passiScala(24.1, 26.9, 24, 30, 0, FONDO_CALDAIA, 16, 'metallo');
  for (const o of OSTACOLI.filter(q => q.tipo === 'tubi')) {
    const l = o.x1 - o.x0;
    const p = o.z1 - o.z0;
    if (l > 2 && p > 2) for (let k = 0; k < 3; k++) {
      const v = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 6, 12), mat.ottone);
      const lungoX = l > p;
      const fuoriX = (o.x0 + o.x1) / 2 < 27 ? o.x1 + 0.28 : o.x0 - 0.28;
      const fuoriZ = (o.z0 + o.z1) / 2 < 38 ? o.z1 + 0.28 : o.z0 - 0.28;
      v.position.set(lungoX ? o.x0 + caso() * l : fuoriX, o.base + 1.2 + caso() * 1.2, lungoX ? fuoriZ : o.z0 + caso() * p);
      v.rotation.y = lungoX ? 0 : Math.PI / 2;
      scena.add(v);
    }
  }
  const boccaFornace = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), new THREE.MeshBasicMaterial({ map: texturaAlone('rgba(255,150,40,1)'), color: 0xffffff, toneMapped: false }));
  const braceFornace = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,120,30,0.9)'), color: 0xff7a2a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  braceFornace.position.set(28, FONDO_CALDAIA + 0.9, 35.2);
  braceFornace.scale.setScalar(2.6);
  scena.add(braceFornace);
  boccaFornace.position.set(28, FONDO_CALDAIA + 0.9, 35.48);
  boccaFornace.rotation.y = Math.PI;
  scena.add(boccaFornace);
  for (const [x, z, verso] of [[22.82, 37, { x: 1, z: 0 }], [33.18, 40, { x: -1, z: 0 }]]) {
    const manometro = new THREE.Mesh(new THREE.CircleGeometry(0.18, 16), new THREE.MeshBasicMaterial({ color: 0xe8e0c8 }));
    manometro.position.set(x, FONDO_CALDAIA + 1.6, z);
    orientamento(manometro, verso);
    scena.add(manometro);
  }

  for (let x = 41; x < 50; x += 2.2) box('legno', x, FONDO_SOTTOPALCO, 31.5, x + 0.25, -0.8, 31.75, 1);
  for (let z = 31; z < 40; z += 2) box('legno', 40, -1.1, z, 50, -0.85, z + 0.25, 1);
  box('ferro', 40.15, FONDO_SOTTOPALCO, 33.6, 40.5, -0.8, 36.4, 1);
  cartello(['MONTACARICHI', 'AL PALCO'], 40.53, -1.9, 35, { x: 1, z: 0 }, 1.2, 0.5, { larghezza: 256, altezza: 100, sfondo: '#141414', colore: '#e0c080', font: 'bold 26px monospace' });
  const forgia = new THREE.Group();
  const anelliForgia = [1.3, 1, 0.75].map((r, i) => {
    const a = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 8, 48), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffc870 : 0xb07cff, transparent: true, opacity: 0.85 }));
    a.position.y = 2.8;
    forgia.add(a);
    return a;
  });
  const cristalli = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.12).scale(0.7, 1.8, 0.7), new THREE.MeshStandardMaterial({ color: 0xc8a0ff, emissive: 0x7a3cff, emissiveIntensity: 1.2, roughness: 0.1 }), 6);
  for (let i = 0; i < 6; i++) cristalli.setMatrixAt(i, mm.makeTranslation(Math.cos((i / 6) * Math.PI * 2) * 1.5, 1.4, Math.sin((i / 6) * Math.PI * 2) * 1.5));
  forgia.add(cristalli);
  const potenziatoreDati = ACQUISTI.find(a => a.tipo === 'potenziatore');
  forgia.position.set(potenziatoreDati.posizione.x, FONDO_SOTTOPALCO, potenziatoreDati.posizione.z - 0.2);
  scena.add(forgia);
  cilindro('pietra', potenziatoreDati.posizione.x, FONDO_SOTTOPALCO, potenziatoreDati.posizione.z - 0.2, 1.7, 0.18, 24);

  cartello(['SALA PROVE', '', 'ASPETTATE I VOSTRI AMICI', '', 'INVIO: SONO PRONTO'], CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z, CARTELLO_PRONTI.verso, 3.6, 2.2, { larghezza: 512, altezza: 320, sfondo: '#140a08', colore: '#f2e2c0', font: 'bold 30px Georgia, serif', bordo: '#b08a3a' });
  box('specchio', 60.17, 0.4, -4, 60.2, 2.6, 4, 1);
  box('legnoScuro', 60.25, 1, -4, 60.4, 1.06, 4, 1);
  quadro(texturaManifesto("L'ECLISSI", 'stasera in scena', '#4a1010'), 67, 1.9, 4.83, { x: 0, z: -1 }, 1.4, 2.1);

  for (const a of ARREDI) {
    const modello = oggetti.get(a.modello)?.clone();
    if (!modello) continue;
    modello.position.set(a.x, quota(a.x, a.z), a.z);
    modello.rotation.y = a.rot;
    scena.add(modello);
  }

  const corona = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,170,90,0.9)'), color: 0xffb070, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
  corona.position.set(OGGETTI.CORONA.x, OGGETTI.CORONA.y, OGGETTI.CORONA.z);
  corona.scale.setScalar(26);
  const disco = new THREE.Mesh(new THREE.CircleGeometry(4.2, 32), new THREE.MeshBasicMaterial({ color: 0x010102, fog: false }));
  disco.position.copy(corona.position);
  disco.lookAt(24, 1.6, 6);
  scena.add(corona, disco);

  statico.finisci(scena, { ...mat, vetro: new THREE.MeshPhysicalMaterial({ color: 0xbfd8e8, transparent: true, opacity: 0.2, roughness: 0.05 }) });
  const macchine = creaMacchine(scenaMondo, { materialiArmi, oggetti, metallo: mat.ferro, legno: mat.legnoScuro, serveCorrente: true });

  const fonti = [
    { x: 0, y: 3, z: 3.4, colore: 0xff3a24, prima: 7, dopo: 0, portata: 12 },
    { x: 0, y: 6.4, z: -5.5, colore: 0xffd9a0, prima: 0, dopo: 34, portata: 20, lampadario: true },
    { x: -11, y: 3.4, z: -4, colore: 0xffc890, prima: 0, dopo: 9, portata: 10 },
    { x: 11, y: 3.4, z: -4, colore: 0xffc890, prima: 0, dopo: 9, portata: 10 },
    { x: -21, y: 7.5, z: 2, colore: 0xffd6a0, prima: 3, dopo: 20, portata: 15 },
    { x: -22.25, y: 7, z: 18, colore: 0xff3a24, prima: 5, dopo: 10, portata: 11, tremola: true },
    { x: -24, y: 7, z: 35, colore: 0xffe0b0, prima: 3, dopo: 18, portata: 13 },
    { x: 3, y: 2.4, z: 31, colore: 0xfff0d0, prima: 12, dopo: 6, portata: 12 },
    { x: 0, y: 11, z: 36, colore: 0xfff2dc, prima: 0, dopo: 40, portata: 24 },
    { x: 0, y: 10, z: 10, colore: 0xffd9a8, prima: 0, dopo: 42, portata: 28 },
    { x: 0, y: 10, z: 21, colore: 0xffd9a8, prima: 0, dopo: 42, portata: 28 },
    { x: 0, y: 3, z: 5, colore: 0xff3a24, prima: 5, dopo: 4, portata: 9 },
    { x: 26.4, y: 4.8, z: 0.5, colore: 0xffa04a, prima: 22, dopo: 22, portata: 18 },
    { x: 24, y: 4.6, z: 18, colore: 0xbfd0ff, prima: 10, dopo: 10, portata: 14, tremola: true },
    { x: 25.5, y: 2.6, z: 25.5, colore: 0xffd0a0, prima: 6, dopo: 8, portata: 9 },
    { x: 28, y: FONDO_CALDAIA + 1.2, z: 34.2, colore: 0xff6a20, prima: 22, dopo: 22, portata: 14, fuoco: true },
    { x: 23.5, y: -1, z: 43, colore: 0xff3a24, prima: 6, dopo: 7, portata: 9 },
    { x: 45, y: -1.6, z: 37.6, colore: 0xa46cff, prima: 8, dopo: 16, portata: 11, forgia: true },
    { x: 42.5, y: -1.2, z: 33, colore: 0xffd8a8, prima: 6, dopo: 8, portata: 8 },
    { x: 67, y: 3.2, z: 0, colore: 0xffe2b0, prima: 16, dopo: 16, portata: 18 },
    ...ugelli.map(u => ({ x: (u.area.x0 + u.area.x1) / 2, y: u.base + 1, z: (u.area.z0 + u.area.z1) / 2, colore: 0xff7a2a, prima: 0, dopo: 0, portata: 10, trappola: u.nome, fuoco: true })),
  ];
  const luci = Array.from({ length: luciAccese }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.4);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  let attesaLuci = 0;
  const intensita = (f, vista) => {
    if (f.trappola) return (vista.teatro?.trappole?.[f.trappola]?.attiva ?? 0) > 0 ? 22 : 0;
    if (f.lampadario && (vista.teatro?.lampadario ?? 0) > 0) return 0;
    return vista.corrente ? f.dopo : f.prima;
  };
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
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const tremolio = f.fuoco ? 0.8 + Math.sin(tempo * 9 + f.x) * 0.12 + Math.sin(tempo * 23 + f.z) * 0.08 : f.tremola && Math.sin(tempo * 13.7 + f.x) > 0.9 ? 0.15 : 1;
      const eclissi = vista.teatro?.eclissi && !f.trappola ? 0.55 : 1;
      l.luce.intensity = intensita(f, vista) * l.accensione * tremolio * eclissi;
    }
  }

  const nubi = new Map();
  const materialeNube = new THREE.SpriteMaterial({ map: texturaAlone('rgba(150,230,110,0.9)'), color: 0x9be15d, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false });
  const occhio = new THREE.Vector3();
  const versoBersaglio = new THREE.Vector3();

  return {
    svuota() {
      for (const porta of porte.values()) porta.apertura = 0;
      sipario.position.y = 0;
    },
    aggiorna(vista, dt, tempo, puntoMondo) {
      macchine.aggiorna(vista, dt, tempo);
      const punto = puntoMondo ? { x: -puntoMondo.x, y: puntoMondo.y, z: puntoMondo.z } : null;
      aggiornaLuci(vista, dt, tempo, punto);
      const t = vista.teatro;
      const corrente = vista.corrente;
      for (const f of FINESTRE) finestre.get(f.id).forEach((asse, i) => { asse.visible = i < vista.finestre[f.id]; });
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        if (!porta) continue;
        porta.apertura = vista.porte.has(p.id) ? Math.min(1, porta.apertura + dt * (p.id === 'centrali' ? 0.8 : 1.5)) : Math.max(0, porta.apertura - dt * 2.5);
        if (porta.ante) porta.ante.forEach(({ perno, lato }) => { perno.rotation.y = lato * porta.apertura * 1.6; });
        else {
          porta.anta.position.y = porta.base + ALTEZZA_PORTA / 2 + porta.apertura * ALTEZZA_PORTA;
          porta.anta.visible = porta.apertura < 1;
        }
      }
      const salita = !t ? 0 : t.sipario === 2 ? 1 : t.sipario === 1 ? 1 - t.alzata / DURATA_SIPARIO : 0;
      sipario.position.y = THREE.MathUtils.lerp(sipario.position.y, salita * SALITA_SIPARIO, Math.min(1, dt * 4));
      lampadine.emissiveIntensity = corrente ? 1.6 : 0.08;
      cristallo.emissiveIntensity = corrente && (t?.lampadario ?? 0) === 0 ? 1.4 : 0.1;
      leva.rotation.x = THREE.MathUtils.lerp(leva.rotation.x, corrente ? -2.2 : 0, Math.min(1, dt * 5));
      spieGeneratore.forEach((s, i) => s.material.color.setHex(corrente ? (i % 2 ? 0x3cff6a : 0xffc020) : Math.sin(tempo * 3 + i) > 0.6 ? 0xb8241b : 0x3a0a0a));
      bagliore.material.opacity = corrente ? 0.35 + Math.sin(tempo * 3) * 0.2 : 0;
      braceFornace.material.opacity = 0.75 + Math.sin(tempo * 11) * 0.15;
      lampione.material.color.setHex(Math.sin(tempo * 7.3) > 0.97 ? 0x302010 : 0xffb060);
      const lavora = vista.potenziatore?.stato === 'lavora';
      anelliForgia.forEach((a, i) => {
        a.rotation.x = tempo * (0.6 + i * 0.4) * (lavora ? 4 : 1);
        a.rotation.y = tempo * (0.4 + i * 0.3);
        a.material.opacity = corrente ? 0.9 : 0.35;
      });
      cristalli.rotation.y = tempo * 0.5;
      if (t) {
        const stato = t.lampadario;
        if (stato === 0) {
          lampadario.position.y = OGGETTI.LAMPADARIO.y;
          lampadario.rotation.set(0, Math.sin(tempo * 0.4) * 0.03, 0);
          Object.assign(statoLampadario, { caduta: 0, velocita: 0 });
        } else {
          statoLampadario.velocita += GRAVITA_LAMPADARIO * dt;
          lampadario.position.y = Math.max(1.05, lampadario.position.y - statoLampadario.velocita * dt);
          if (stato === 2 || lampadario.position.y <= 1.05) {
            lampadario.position.y = 1.05;
            lampadario.rotation.set(0.35, 0.6, -0.25);
          }
        }
        const s = t.sentinella;
        spiaS.material.color.setHex(s.attiva > 0 ? 0xff2a1a : s.ricarica > 0 ? 0xffa020 : corrente ? 0x3cff6a : 0x3a0a0a);
        const bersaglio = s.attiva > 0 && s.bersaglio !== null ? vista.zombie.find(z => z.id === s.bersaglio) : null;
        if (bersaglio) {
          occhio.set(-bersaglio.x, quota(-bersaglio.x, bersaglio.z) + 1.2, bersaglio.z);
          versoBersaglio.copy(occhio).sub(sentinella.position);
          sentinella.rotation.y = Math.atan2(versoBersaglio.x, versoBersaglio.z);
          canna.rotation.x = -Math.atan2(versoBersaglio.y, Math.hypot(versoBersaglio.x, versoBersaglio.z)) * 0.8;
          const acceso = Math.sin(tempo * 55) > 0;
          fiammata.visible = acceso;
          tracciante.visible = acceso;
          const pos = tracciante.geometry.attributes.position;
          const bocca = canna.getWorldPosition(versoBersaglio);
          pos.setXYZ(0, bocca.x, bocca.y, bocca.z);
          pos.setXYZ(1, bersaglio.x, quotaMondo(bersaglio.x, bersaglio.z) + 1.2, bersaglio.z);
          pos.needsUpdate = true;
        } else {
          sentinella.rotation.y += dt * (s.attiva > 0 ? 1.5 : 0.1);
          fiammata.visible = false;
          tracciante.visible = false;
        }
        for (const f of fuochi) {
          const attiva = (t.trappole?.[f.nome]?.attiva ?? 0) > 0;
          f.gruppo.visible = attiva;
          if (!attiva) continue;
          for (const s2 of f.fiamme) {
            const v = Math.sin(tempo * 12 + s2.userData.fase);
            s2.scale.set(0.7 + v * 0.15, 1.3 + v * 0.4, 1);
          }
        }
        const presenti = new Set();
        for (const nube of t.nubi) {
          presenti.add(nube.id);
          if (!nubi.has(nube.id)) {
            const g = new THREE.Group();
            for (let i = 0; i < 12; i++) {
              const sp = new THREE.Sprite(materialeNube);
              sp.position.set((Math.random() - 0.5) * nube.raggio * 1.6, 0.3 + Math.random() * 1.6, (Math.random() - 0.5) * nube.raggio * 1.6);
              sp.scale.setScalar(1.4 + Math.random() * 1.4);
              g.add(sp);
            }
            scena.add(g);
            nubi.set(nube.id, g);
          }
          const g = nubi.get(nube.id);
          g.position.set(-nube.x, quota(-nube.x, nube.z), nube.z);
          g.rotation.y += dt * 0.3;
          g.scale.setScalar(Math.min(1, nube.timer));
        }
        for (const [id, g] of nubi) {
          if (presenti.has(id)) continue;
          scena.remove(g);
          nubi.delete(id);
        }
      }
      const vicinoPioggia = punto && punto.x > PIOGGIA.x0 - PIOGGIA.vicino && punto.x < PIOGGIA.x1 + PIOGGIA.vicino && punto.z > PIOGGIA.z0 - PIOGGIA.vicino && punto.z < PIOGGIA.z1 + PIOGGIA.vicino && punto.y > -1;
      pioggia.visible = !!vicinoPioggia;
      if (vicinoPioggia) {
        const passo = PIOGGIA.velocita * dt;
        for (let i = 0; i < GOCCE; i++) {
          const k = i * 6;
          let y = gocce[k + 1] - passo;
          if (y < 0) y += PIOGGIA.alto;
          gocce[k + 1] = y;
          gocce[k + 4] = y - 0.45;
        }
        geometriaPioggia.attributes.position.needsUpdate = true;
      }
    },
    nebbia(vista) {
      return vista.teatro?.eclissi ? { fattore: 0.5, colore: 0x2a0806 } : null;
    },
  };
}
