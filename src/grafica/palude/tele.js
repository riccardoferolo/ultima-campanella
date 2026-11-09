import * as THREE from 'three';
import { creaCaso } from '../caso-grafica.js';

export function tela(l, a, pittore, { ripeti = true, colore = true } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a, creaCaso(l * 13 + a));
  const t = new THREE.CanvasTexture(canvas);
  if (colore) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export const texturaSeta = () => tela(256, 256, (c, l, a, caso) => {
  c.clearRect(0, 0, l, a);
  c.strokeStyle = 'rgba(235, 240, 230, 0.75)';
  c.lineWidth = 1.2;
  for (let i = 0; i < 90; i++) {
    c.beginPath();
    const x = caso() * l;
    const y = caso() * a;
    c.moveTo(x, y);
    c.bezierCurveTo(x + (caso() - 0.5) * 120, y + (caso() - 0.5) * 120, x + (caso() - 0.5) * 160, y + (caso() - 0.5) * 160, x + (caso() - 0.5) * 220, y + (caso() - 0.5) * 220);
    c.stroke();
  }
});

export const texturaRagnatela = () => tela(256, 256, (c, l, a) => {
  c.clearRect(0, 0, l, a);
  c.strokeStyle = 'rgba(230, 236, 225, 0.8)';
  c.lineWidth = 1.3;
  const cx = l / 2;
  const cy = a / 2;
  const raggi = 14;
  for (let i = 0; i < raggi; i++) {
    const ang = (i / raggi) * Math.PI * 2;
    c.beginPath();
    c.moveTo(cx, cy);
    c.lineTo(cx + Math.cos(ang) * l * 0.5, cy + Math.sin(ang) * a * 0.5);
    c.stroke();
  }
  for (let r = 10; r < l * 0.48; r += 9 + r * 0.08) {
    c.beginPath();
    for (let i = 0; i <= raggi; i++) {
      const ang = (i / raggi) * Math.PI * 2;
      const rr = r * (0.92 + ((i * 7) % 5) * 0.03);
      const x = cx + Math.cos(ang) * rr;
      const y = cy + Math.sin(ang) * rr;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.stroke();
  }
}, { ripeti: false });

export const texturaRune = () => tela(256, 128, (c, l, a, caso) => {
  c.clearRect(0, 0, l, a);
  c.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  c.lineWidth = 2;
  for (let i = 0; i < 26; i++) {
    const x = 6 + caso() * (l - 12);
    const y = 6 + caso() * (a - 12);
    c.beginPath();
    c.moveTo(x, y);
    for (let k = 0; k < 3; k++) c.lineTo(x + (caso() - 0.5) * 16, y + (caso() - 0.5) * 16);
    c.stroke();
  }
  c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  for (let y = 0; y < a; y += 16) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(l, y + 8);
    c.stroke();
  }
});

export const texturaPericolo = () => tela(128, 16, (c, l, a) => {
  c.fillStyle = '#d8b02a';
  c.fillRect(0, 0, l, a);
  c.fillStyle = '#151210';
  for (let x = -a; x < l; x += 16) {
    c.beginPath();
    c.moveTo(x, a);
    c.lineTo(x + 8, a);
    c.lineTo(x + 8 + a, 0);
    c.lineTo(x + a, 0);
    c.fill();
  }
});
