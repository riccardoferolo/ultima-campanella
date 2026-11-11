import * as THREE from 'three';
import { OSTACOLI } from '../../mappe/piazza.js';
import { creaCaso } from '../caso-grafica.js';

const CENTRO_PIAZZA = Object.freeze({ x: -12, z: 10 });
const BACHECA = Object.freeze({ x: 11, y: 1.75, z: -11.37, largo: 2.2, alto: 1.3 });
const COLORI_BICI = Object.freeze([0x8a1c1c, 0x1c4a8a]);

function tela(l, a, pittore) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

const CARTELLI = Object.freeze({
  sensoUnico: () => tela(128, 64, (c, l, a) => {
    c.fillStyle = '#1d4fa0'; c.fillRect(0, 0, l, a);
    c.strokeStyle = '#fff'; c.lineWidth = 4; c.strokeRect(4, 4, l - 8, a - 8);
    c.fillStyle = '#fff';
    c.beginPath(); c.moveTo(18, 26); c.lineTo(84, 26); c.lineTo(84, 14); c.lineTo(112, 32); c.lineTo(84, 50); c.lineTo(84, 38); c.lineTo(18, 38); c.fill();
  }),
  divieto: () => tela(128, 128, (c, l) => {
    c.fillStyle = '#c8202a'; c.beginPath(); c.arc(l / 2, l / 2, l / 2 - 2, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1d4fa0'; c.beginPath(); c.arc(l / 2, l / 2, l / 2 - 16, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#c8202a'; c.lineWidth = 14;
    c.beginPath(); c.moveTo(30, 30); c.lineTo(98, 98); c.stroke();
  }),
  precedenza: () => tela(128, 128, (c, l) => {
    c.fillStyle = '#c8202a';
    c.beginPath(); c.moveTo(4, 12); c.lineTo(l - 4, 12); c.lineTo(l / 2, l - 6); c.fill();
    c.fillStyle = '#f4f4f0';
    c.beginPath(); c.moveTo(26, 24); c.lineTo(l - 26, 24); c.lineTo(l / 2, l - 34); c.fill();
  }),
});

function retroCartello(tipo, largo, alto) {
  if (tipo === 'divieto') return new THREE.CylinderGeometry(largo * 0.47, largo * 0.47, 0.02, 24).rotateX(Math.PI / 2);
  if (tipo === 'precedenza') {
    const forma = new THREE.Shape([new THREE.Vector2(-largo * 0.44, alto * 0.4), new THREE.Vector2(largo * 0.44, alto * 0.4), new THREE.Vector2(0, -alto * 0.42)]);
    return new THREE.ExtrudeGeometry(forma, { depth: 0.02, bevelEnabled: false }).translate(0, 0, -0.01);
  }
  return new THREE.BoxGeometry(largo * 0.9, alto * 0.9, 0.02);
}

function texturaBacheca() {
  const caso = creaCaso(1923);
  return tela(512, 300, (c, l, a) => {
    c.fillStyle = '#2e3a2c';
    c.fillRect(0, 0, l, a);
    for (let i = 0; i < 6; i++) {
      const x = 14 + (i % 3) * 166 + (caso() - 0.5) * 8;
      const y = 14 + Math.floor(i / 3) * 142 + (caso() - 0.5) * 8;
      c.save();
      c.translate(x + 75, y + 62);
      c.rotate((caso() - 0.5) * 0.06);
      c.fillStyle = caso() < 0.3 ? '#e8e0cc' : '#f4f1ea';
      c.fillRect(-75, -62, 150, 124);
      c.strokeStyle = '#111';
      c.lineWidth = 4;
      c.strokeRect(-70, -57, 140, 114);
      c.fillStyle = '#111';
      c.fillRect(-2, -50, 4, 18);
      c.fillRect(-7, -44, 14, 4);
      c.font = 'bold 13px Georgia, serif';
      c.textAlign = 'center';
      c.fillText('È mancato', 0, -14);
      c.fillStyle = 'rgba(20,20,20,0.75)';
      for (let r = 0; r < 4; r++) c.fillRect(-52 + (r % 2) * 6, -2 + r * 12, 104 - (r % 2) * 20, 3);
      c.fillStyle = 'rgba(90,60,30,0.18)';
      c.fillRect(-75, 30, 150, 32);
      c.restore();
    }
  });
}

export function costruisciArredo({ statico, mat, box, cil, sfera }) {
  const caso = creaCaso(1474);
  const telaio = (chiave, x0, y0, z0, x1, y1, z1) => box(chiave, Math.min(x0, x1), y0, Math.min(z0, z1), Math.max(x0, x1), y1, Math.max(z0, z1));

  const panchina = o => {
    const asseX = o.x1 - o.x0 >= o.z1 - o.z0;
    const lungo = asseX ? o.x1 - o.x0 : o.z1 - o.z0;
    const verso = o.schiena?.endsWith('0') ? -1 : 1;
    const lato = (a0, a1, w0, w1, y0, y1, chiave) => {
      if (asseX) {
        const zb = verso < 0 ? o.z0 : o.z1;
        telaio(chiave, o.x0 + a0, y0, zb - verso * w0, o.x0 + a1, y1, zb - verso * w1);
      } else {
        const xb = verso < 0 ? o.x0 : o.x1;
        telaio(chiave, xb - verso * w0, y0, o.z0 + a0, xb - verso * w1, y1, o.z0 + a1);
      }
    };
    for (const a of [0.15, lungo - 0.21]) {
      lato(a, a + 0.06, 0.02, 0.55, 0.36, 0.42, 'ferro');
      lato(a, a + 0.06, 0.08, 0.14, 0, 0.42, 'ferro');
      lato(a, a + 0.06, 0.46, 0.52, 0, 0.42, 'ferro');
      lato(a, a + 0.06, 0.02, 0.08, 0.42, 0.85, 'ferro');
    }
    for (let k = 0; k < 4; k++) lato(0, lungo, 0.1 + k * 0.11, 0.18 + k * 0.11, 0.42, 0.46, 'legno');
    for (let k = 0; k < 3; k++) lato(0, lungo, 0.03, 0.06, 0.52 + k * 0.11, 0.6 + k * 0.11, 'legno');
  };

  const fioriera = o => {
    box('cemento', o.x0, 0, o.z0, o.x1, o.altezza, o.z1, 1);
    box('terra', o.x0 + 0.06, o.altezza - 0.05, o.z0 + 0.06, o.x1 - 0.06, o.altezza - 0.02, o.z1 - 0.06, 1);
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    for (const d of [-0.25, 0, 0.25]) sfera('chioma', cx + d, o.altezza + 0.22 + caso() * 0.1, cz + (caso() - 0.5) * 0.15, 0.26 + caso() * 0.08, 8);
  };

  const rastrelliera = o => {
    const n = 5;
    const zc = (o.z0 + o.z1) / 2;
    for (let i = 0; i < n; i++) {
      const x = o.x0 + 0.2 + (i * (o.x1 - o.x0 - 0.4)) / (n - 1);
      statico.aggiungi('zincato', new THREE.TorusGeometry(0.38, 0.022, 6, 14, Math.PI), x, 0.38, zc, Math.PI / 2);
      for (const dz of [-0.38, 0.38]) cil('zincato', x, 0, zc + dz, 0.022, 0.38, 6);
    }
    COLORI_BICI.forEach((colore, i) => {
      const chiave = `bici${colore.toString(16)}`;
      mat[chiave] ??= new THREE.MeshStandardMaterial({ color: colore, metalness: 0.5, roughness: 0.4 });
      const x = o.x0 + 0.55 + i * 1.05;
      const z = (o.z0 + o.z1) / 2;
      for (const dz of [-0.52, 0.52]) statico.aggiungi('nero', new THREE.TorusGeometry(0.33, 0.03, 6, 20), x, 0.34, z + dz, Math.PI / 2);
      statico.aggiungi(chiave, new THREE.BoxGeometry(0.03, 0.03, 0.95), x, 0.55, z, 0, 0.12);
      statico.aggiungi(chiave, new THREE.BoxGeometry(0.03, 0.5, 0.03), x, 0.55, z - 0.12, 0, 0.3);
      statico.aggiungi(chiave, new THREE.BoxGeometry(0.03, 0.45, 0.03), x, 0.6, z + 0.38, 0, -0.35);
      box('nero', x - 0.06, 0.82, z - 0.3, x + 0.06, 0.86, z - 0.12, 1);
      box('ferro', x - 0.24, 0.92, z + 0.44, x + 0.24, 0.95, z + 0.47, 1);
    });
  };

  const segnale = o => {
    const x = (o.x0 + o.x1) / 2;
    const z = (o.z0 + o.z1) / 2;
    cil('zincato', x, 0, z, 0.035, 2.45, 8);
    const ry = Math.atan2(CENTRO_PIAZZA.x - x, CENTRO_PIAZZA.z - z);
    const chiave = `cartello${o.cartello}`;
    mat[chiave] ??= new THREE.MeshStandardMaterial({ map: CARTELLI[o.cartello](), roughness: 0.5, transparent: o.cartello !== 'sensoUnico', alphaTest: 0.5 });
    const largo = o.cartello === 'sensoUnico' ? 0.8 : 0.6;
    const alto = o.cartello === 'sensoUnico' ? 0.4 : 0.6;
    const dx = Math.sin(ry) * 0.05;
    const dz = Math.cos(ry) * 0.05;
    statico.aggiungi(chiave, new THREE.PlaneGeometry(largo, alto), x + dx, 2.2, z + dz, ry);
    statico.aggiungi('zincato', retroCartello(o.cartello, largo, alto), x + dx * 0.4, 2.2, z + dz * 0.4, ry);
  };

  const disegna = { panchina, fioriera, rastrelliera, segnale };
  for (const o of OSTACOLI) disegna[o.tipo]?.(o);

  mat.bacheca = new THREE.MeshStandardMaterial({ map: texturaBacheca(), roughness: 0.85 });
  const b = BACHECA;
  box('legnoScuro', b.x - b.largo / 2 - 0.08, b.y - b.alto / 2 - 0.08, b.z - 0.06, b.x + b.largo / 2 + 0.08, b.y + b.alto / 2 + 0.08, b.z, 1);
  statico.aggiungi('bacheca', new THREE.PlaneGeometry(b.largo, b.alto), b.x, b.y, b.z - 0.065, Math.PI);
  box('legnoScuro', b.x - b.largo / 2 - 0.16, b.y + b.alto / 2 + 0.08, b.z - 0.2, b.x + b.largo / 2 + 0.16, b.y + b.alto / 2 + 0.14, b.z, 1);
  for (const dx of [-b.largo / 2, b.largo / 2]) cil('legnoScuro', b.x + dx, 0, b.z - 0.1, 0.04, b.y - b.alto / 2, 6);
}
