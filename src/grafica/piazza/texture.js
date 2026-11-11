import * as THREE from 'three';
import { creaCaso } from '../caso-grafica.js';

export function tela(l, a, pittore, ripeti = true, seme = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  const ctx = canvas.getContext('2d');
  pittore(ctx, l, a, creaCaso(l * 13 + a * 7 + seme));
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

const tinta = (r, g, b, v = 0) => `rgb(${Math.round(r + v)},${Math.round(g + v)},${Math.round(b + v)})`;

export const texturaPorfido = () => tela(512, 512, (ctx, l, a, caso) => {
  ctx.fillStyle = '#2a2624';
  ctx.fillRect(0, 0, l, a);
  const passo = 12;
  for (let riga = -1; riga < a / (passo * 2.6) + 2; riga++) {
    for (let col = -1; col < l / (passo * 9) + 2; col++) {
      const cx = col * passo * 9 + (riga % 2) * passo * 4.5;
      const cy = riga * passo * 2.6;
      for (let anello = 1; anello <= 4; anello++) {
        const r = anello * passo * 1.05;
        const quanti = 3 + anello * 3;
        for (let k = 0; k <= quanti; k++) {
          const ang = Math.PI * (k / quanti);
          const x = cx + Math.cos(ang) * r * 1.15;
          const y = cy + Math.sin(ang) * r * 0.58;
          const v = caso();
          ctx.fillStyle = v < 0.4 ? tinta(96, 84, 82, caso() * 26) : v < 0.75 ? tinta(112, 92, 90, caso() * 22) : tinta(84, 80, 86, caso() * 24);
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang + Math.PI / 2 + (caso() - 0.5) * 0.25);
          ctx.fillRect(-passo * 0.46, -passo * 0.42, passo * 0.92, passo * 0.84);
          ctx.restore();
        }
      }
    }
  }
  for (let i = 0; i < 2200; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,240,230,0.06)' : 'rgba(0,0,0,0.09)';
    ctx.fillRect(caso() * l, caso() * a, 1 + caso() * 2, 1 + caso() * 2);
  }
});

export const texturaCiottoli = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#3c3936';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 900; i++) {
    const x = caso() * l;
    const y = caso() * a;
    const r = 3 + caso() * 4;
    const v = caso();
    ctx.fillStyle = v < 0.55 ? tinta(196, 192, 182, caso() * 30 - 15) : v < 0.85 ? tinta(150, 146, 138, caso() * 20) : tinta(110, 104, 98, caso() * 16);
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.55 + caso() * 0.3), caso() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = 'rgba(70,64,58,0.9)';
  ctx.lineWidth = 7;
  ctx.strokeRect(0, 0, l, a);
});

export const texturaLastre = () => tela(256, 256, (ctx, l, a, caso) => {
  const n = 4;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ctx.fillStyle = tinta(164, 158, 148, caso() * 22 - 11);
      ctx.fillRect((i * l) / n, (j * a) / n, l / n, a / n);
    }
  }
  for (let i = 0; i < 1500; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
  ctx.strokeStyle = '#6e6860';
  ctx.lineWidth = 2;
  for (let i = 0; i <= n; i++) {
    ctx.beginPath(); ctx.moveTo((i * l) / n, 0); ctx.lineTo((i * l) / n, a); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, (i * a) / n); ctx.lineTo(l, (i * a) / n); ctx.stroke();
  }
});

export const texturaMattoni = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#6d5d50';
  ctx.fillRect(0, 0, l, a);
  const alto = 16;
  const lungo = 52;
  for (let r = 0; r < a / alto; r++) {
    for (let c = -1; c < l / lungo + 1; c++) {
      const x = c * lungo + (r % 2 ? lungo / 2 : 0);
      ctx.fillStyle = tinta(150, 72, 48, caso() * 34 - 17);
      ctx.fillRect(x + 2, r * alto + 2, lungo - 4, alto - 4);
    }
  }
  for (let i = 0; i < 1800; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,220,200,0.07)' : 'rgba(20,10,5,0.12)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
});

export const texturaTegole = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#5a2f22';
  ctx.fillRect(0, 0, l, a);
  const passo = 21;
  for (let y = 0; y < a; y += 14) {
    for (let x = (y / 14) % 2 ? -passo / 2 : 0; x < l; x += passo) {
      const g = ctx.createLinearGradient(x, 0, x + passo, 0);
      const base = 128 + caso() * 30;
      g.addColorStop(0, tinta(base * 0.62, base * 0.3, base * 0.2));
      g.addColorStop(0.5, tinta(base, base * 0.5, base * 0.33));
      g.addColorStop(1, tinta(base * 0.62, base * 0.3, base * 0.2));
      ctx.fillStyle = g;
      ctx.fillRect(x + 1, y, passo - 2, 15);
    }
  }
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = caso() < 0.6 ? 'rgba(30,25,20,0.18)' : 'rgba(120,130,90,0.12)';
    ctx.fillRect(caso() * l, caso() * a, 3, 2);
  }
});

export const texturaMarmoChiesa = () => tela(512, 512, (ctx, l, a, caso) => {
  const n = 4;
  const lato = l / n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const chiaro = (i + j) % 2 === 0;
      ctx.fillStyle = chiaro ? tinta(222, 214, 202, caso() * 10) : tinta(112, 98, 92, caso() * 12);
      ctx.fillRect(i * lato, j * lato, lato, lato);
      ctx.strokeStyle = chiaro ? 'rgba(150,140,130,0.35)' : 'rgba(200,180,170,0.2)';
      for (let k = 0; k < 4; k++) {
        ctx.lineWidth = 0.5 + caso();
        ctx.beginPath();
        ctx.moveTo(i * lato + caso() * lato, j * lato);
        ctx.bezierCurveTo(i * lato + caso() * lato, j * lato + lato * 0.3, i * lato + caso() * lato, j * lato + lato * 0.7, i * lato + caso() * lato, j * lato + lato);
        ctx.stroke();
      }
    }
  }
  ctx.strokeStyle = 'rgba(146,58,52,0.85)';
  ctx.lineWidth = 6;
  for (let i = 0; i < n; i += 2) {
    for (let j = 0; j < n; j += 2) {
      ctx.beginPath();
      ctx.moveTo(i * lato + lato, j * lato + lato * 0.5);
      ctx.lineTo(i * lato + lato * 1.5, j * lato + lato);
      ctx.lineTo(i * lato + lato, j * lato + lato * 1.5);
      ctx.lineTo(i * lato + lato * 0.5, j * lato + lato);
      ctx.closePath();
      ctx.stroke();
    }
  }
});

export const texturaVolta = () => tela(512, 512, (ctx, l, a, caso) => {
  const g = ctx.createRadialGradient(l / 2, a / 2, 20, l / 2, a / 2, l * 0.7);
  g.addColorStop(0, '#9fb3cc');
  g.addColorStop(0.7, '#7890ae');
  g.addColorStop(1, '#5c7290');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, a);
  ctx.strokeStyle = 'rgba(214,170,120,0.85)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 26; i++) {
    const x = caso() * l;
    const y = caso() * a;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let k = 0; k < 4; k++) ctx.quadraticCurveTo(x + (caso() - 0.5) * 120, y + (caso() - 0.5) * 120, x + (caso() - 0.5) * 140, y + (caso() - 0.5) * 140);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(200,128,116,0.6)';
  ctx.lineWidth = 6;
  for (let i = 0; i < 12; i++) {
    const x = caso() * l;
    const y = caso() * a;
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.bezierCurveTo(x - 10, y - 30, x + 10, y + 30, x + 30, y);
    ctx.stroke();
  }
  ctx.strokeStyle = '#c9a25a';
  ctx.lineWidth = 10;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(l, a); ctx.moveTo(l, 0); ctx.lineTo(0, a); ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#7a3a30';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(l, a); ctx.moveTo(l, 0); ctx.lineTo(0, a); ctx.stroke();
  for (const [x, y] of [[l / 2, a * 0.2], [l / 2, a * 0.8], [l * 0.2, a / 2], [l * 0.8, a / 2]]) {
    ctx.fillStyle = '#f0e2c2';
    ctx.beginPath(); ctx.ellipse(x, y, 40, 50, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#c0913e'; ctx.lineWidth = 7; ctx.stroke();
    ctx.fillStyle = 'rgba(255,214,120,0.6)';
    ctx.beginPath(); ctx.arc(x, y - 16, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d9b48e';
    ctx.beginPath(); ctx.arc(x, y - 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#b2584a';
    ctx.beginPath(); ctx.moveTo(x - 20, y + 38); ctx.quadraticCurveTo(x - 4, y - 8, x + 20, y + 38); ctx.fill();
  }
  ctx.fillStyle = '#c9a25a';
  ctx.beginPath(); ctx.arc(l / 2, a / 2, 16, 0, Math.PI * 2); ctx.fill();
});

export const texturaCupola = () => tela(512, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#e8dcc2';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 8; i++) {
    const x = (i * l) / 8;
    ctx.fillStyle = 'rgba(214,170,96,0.9)';
    ctx.fillRect(x - 6, 0, 12, a);
    ctx.fillStyle = 'rgba(160,120,70,0.6)';
    ctx.fillRect(x - 2, 0, 4, a);
    ctx.strokeStyle = 'rgba(190,140,80,0.8)';
    ctx.lineWidth = 3;
    for (let k = 1; k < 4; k++) {
      ctx.beginPath();
      ctx.ellipse(x + l / 16, (k * a) / 4, 22, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  for (let i = 0; i < 1200; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(120,90,50,0.08)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
});

const COLORI_VETRO = ['#b0242c', '#2a4fa8', '#e2b23a', '#2f8a4a', '#7a3c9a', '#d8661e'];

export function texturaVetrata(seme, figura = true) {
  return tela(128, 256, (ctx, l, a, caso) => {
    ctx.fillStyle = '#100c08';
    ctx.fillRect(0, 0, l, a);
    const n = 6;
    for (let i = 0; i < n * 2; i++) {
      for (let j = 0; j < n * 4; j++) {
        ctx.fillStyle = COLORI_VETRO[Math.floor(caso() * COLORI_VETRO.length)];
        ctx.globalAlpha = 0.55 + caso() * 0.45;
        ctx.fillRect((i * l) / (n * 2) + 1, (j * a) / (n * 4) + 1, l / (n * 2) - 2, a / (n * 4) - 2);
      }
    }
    ctx.globalAlpha = 1;
    if (figura) {
      ctx.fillStyle = caso() < 0.5 ? '#c43a2a' : '#2f6fb8';
      ctx.beginPath();
      ctx.moveTo(l * 0.5, a * 0.3);
      ctx.lineTo(l * 0.78, a * 0.92);
      ctx.lineTo(l * 0.22, a * 0.92);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f0d8b0';
      ctx.beginPath(); ctx.arc(l * 0.5, a * 0.24, l * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ffd860';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(l * 0.5, a * 0.24, l * 0.18, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.strokeStyle = '#1a140e';
    ctx.lineWidth = 3;
    for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(0, (k * a) / 5); ctx.lineTo(l, (k * a) / 5); ctx.stroke(); }
  }, false, seme);
}

export const texturaFacciataCasa = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#f2ece2';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 2500; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(80,60,40,0.07)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
  const fx = l * 0.36;
  const fy = a * 0.24;
  const fl = l * 0.28;
  const fa = a * 0.5;
  ctx.fillStyle = '#d6d0c4';
  ctx.fillRect(fx - 8, fy - 10, fl + 16, fa + 18);
  ctx.fillStyle = '#1b1d24';
  ctx.fillRect(fx, fy, fl, fa);
  ctx.fillStyle = '#4a3a2c';
  ctx.fillRect(fx + fl / 2 - 2, fy, 4, fa);
  ctx.fillStyle = '#3c5a3a';
  ctx.fillRect(fx - fl * 0.42, fy, fl * 0.4, fa);
  ctx.fillRect(fx + fl + 2, fy, fl * 0.4, fa);
  ctx.strokeStyle = 'rgba(20,30,20,0.6)';
  for (let k = 0; k < 10; k++) {
    const y = fy + (k * fa) / 10;
    ctx.beginPath(); ctx.moveTo(fx - fl * 0.42, y); ctx.lineTo(fx - 2, y); ctx.moveTo(fx + fl + 2, y); ctx.lineTo(fx + fl * 1.4 + 2, y); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(120,110,100,0.5)';
  ctx.fillRect(0, a - 6, l, 6);
});

export const texturaMunicipio = () => tela(256, 1024, (ctx, l, a, caso) => {
  const m = a / 9.4;
  ctx.fillStyle = '#e6d478';
  ctx.fillRect(0, 0, l, a - 4.5 * m);
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,230,0.14)' : 'rgba(120,100,40,0.06)';
    ctx.fillRect(caso() * l, caso() * (a - 4.5 * m), 2, 2);
  }
  ctx.fillStyle = '#d9d6d0';
  ctx.fillRect(0, a - 4.5 * m, l, 4.5 * m);
  ctx.fillStyle = 'rgba(120,120,120,0.55)';
  for (let k = 1; k < 8; k++) ctx.fillRect(0, a - 0.6 * m - k * 0.5 * m, l, 3);
  ctx.fillStyle = '#9a9894';
  ctx.fillRect(0, a - 0.6 * m, l, 0.6 * m);
  ctx.fillStyle = '#c8c6c0';
  ctx.fillRect(0, a - 4.55 * m, l, 0.32 * m);
  ctx.fillStyle = '#b8b6b0';
  ctx.fillRect(0, 0, l, 0.45 * m);
  const finestra = (y0, alta) => {
    const x0 = l * 0.3;
    const x1 = l * 0.7;
    ctx.fillStyle = '#c4c2bc';
    ctx.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, alta + 22);
    ctx.fillStyle = '#5a3a24';
    ctx.fillRect(x0, y0, x1 - x0, alta);
    ctx.fillStyle = '#1c2230';
    ctx.fillRect(x0 + 6, y0 + 6, (x1 - x0) / 2 - 9, alta * 0.62);
    ctx.fillRect(l / 2 + 3, y0 + 6, (x1 - x0) / 2 - 9, alta * 0.62);
    ctx.fillRect(x0 + 6, y0 + alta * 0.68, (x1 - x0) / 2 - 9, alta * 0.28);
    ctx.fillRect(l / 2 + 3, y0 + alta * 0.68, (x1 - x0) / 2 - 9, alta * 0.28);
  };
  finestra(1.5 * m, 2 * m);
  ctx.fillStyle = '#c4c2bc';
  ctx.fillRect(l * 0.3 - 18, 1.5 * m - 24, l * 0.4 + 36, 12);
  finestra(a - 3.9 * m, 2.2 * m);
});

export const texturaIntonacoInterno = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#e9e1d2';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 1600; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,255,0.12)' : 'rgba(90,70,50,0.05)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
});

export const texturaOrologio = () => tela(256, 256, (ctx, l, a) => {
  ctx.fillStyle = '#efe6cf';
  ctx.fillRect(0, 0, l, a);
  ctx.strokeStyle = '#2a2018';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(l / 2, a / 2, l * 0.46, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(l / 2, a / 2, l * 0.36, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#2a2018';
  ctx.font = 'bold 26px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const numeri = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  numeri.forEach((n, i) => {
    const ang = (i / 12) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(l / 2 + Math.cos(ang) * l * 0.41, a / 2 + Math.sin(ang) * a * 0.41);
    ctx.rotate(ang + Math.PI / 2);
    ctx.fillText(n, 0, 0);
    ctx.restore();
  });
}, false);

export const texturaUltimaCena = () => tela(512, 256, (ctx, l, a, caso) => {
  const g = ctx.createLinearGradient(0, 0, 0, a);
  g.addColorStop(0, '#1e140d');
  g.addColorStop(1, '#3a2616');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = 'rgba(120,90,60,0.35)';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.arc(l * (0.25 + i * 0.25), a * 0.32, l * 0.1, Math.PI, 0); ctx.lineTo(l * (0.35 + i * 0.25), a * 0.62); ctx.lineTo(l * (0.15 + i * 0.25), a * 0.62); ctx.fill();
  }
  const luce = ctx.createRadialGradient(l / 2, a * 0.45, 4, l / 2, a * 0.45, l * 0.35);
  luce.addColorStop(0, 'rgba(255,214,150,0.45)');
  luce.addColorStop(1, 'rgba(255,214,150,0)');
  ctx.fillStyle = luce;
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#d8ccb4';
  ctx.fillRect(l * 0.06, a * 0.62, l * 0.88, a * 0.12);
  ctx.fillStyle = '#5c4430';
  ctx.fillRect(l * 0.06, a * 0.74, l * 0.88, a * 0.2);
  const vesti = ['#7a2a22', '#2c3e6a', '#6a5a2a', '#3e5a34', '#7a4a22', '#4a2a4a'];
  for (let i = 0; i < 13; i++) {
    const x = l * (0.1 + (i * 0.8) / 12);
    const centro = i === 6;
    ctx.fillStyle = centro ? '#9a2420' : vesti[Math.floor(caso() * vesti.length)];
    ctx.beginPath();
    ctx.moveTo(x - 15, a * 0.64);
    ctx.quadraticCurveTo(x, a * (0.36 + caso() * 0.05), x + 15, a * 0.64);
    ctx.fill();
    ctx.fillStyle = '#c89a78';
    ctx.beginPath(); ctx.arc(x + (caso() - 0.5) * 6, a * (0.36 + caso() * 0.04), 8, 0, Math.PI * 2); ctx.fill();
    if (centro) {
      ctx.strokeStyle = '#ffd880';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x, a * 0.37, 15, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  for (let i = 0; i < 1600; i++) ctx.fillRect(caso() * l, caso() * a, 2, 2);
}, false);

export function disegnaStemma(ctx, x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = '#c9c2b4';
  ctx.beginPath();
  for (let i = 0; i < 5; i++) ctx.rect(-40 + i * 18, -78, 10, 14);
  ctx.rect(-42, -66, 84, 10);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-40, -52);
  ctx.lineTo(40, -52);
  ctx.lineTo(40, 10);
  ctx.quadraticCurveTo(40, 52, 0, 64);
  ctx.quadraticCurveTo(-40, 52, -40, 10);
  ctx.closePath();
  ctx.fillStyle = '#b3202a';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#d8b04a';
  ctx.stroke();
  ctx.fillStyle = '#f4f1ea';
  ctx.fillRect(-7, -52, 14, 112);
  ctx.fillRect(-40, -2, 80, 14);
  for (const [cx, cy] of [[-21, -28], [21, 34]]) {
    ctx.fillStyle = '#5a3a22';
    ctx.fillRect(cx - 2, cy, 4, 12);
    ctx.fillStyle = '#2f7a34';
    ctx.beginPath(); ctx.arc(cx, cy - 2, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 6, cy + 3, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 6, cy + 3, 6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

export const texturaStemma = () => tela(256, 320, (ctx, l, a) => {
  disegnaStemma(ctx, l / 2, a * 0.52, 2.1);
}, false);

export const texturaGonfalone = () => tela(256, 384, (ctx, l, a) => {
  ctx.fillStyle = '#f2efe8';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#b3202a';
  ctx.beginPath(); ctx.moveTo(l, 0); ctx.lineTo(l, a); ctx.lineTo(0, a); ctx.closePath(); ctx.fill();
  disegnaStemma(ctx, l / 2, a * 0.5, 1.5);
  ctx.fillStyle = '#d8b04a';
  ctx.font = 'bold 26px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('COMUNE DI CERANO', l / 2, a * 0.12);
}, false);

export const texturaBandieraItalia = () => tela(96, 64, (ctx, l, a) => {
  ['#1a8a46', '#f4f2ec', '#cf2734'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect((i * l) / 3, 0, l / 3 + 1, a); });
}, false);

export const texturaBandieraEuropa = () => tela(96, 64, (ctx, l, a) => {
  ctx.fillStyle = '#1f3f94';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#f7d43a';
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2;
    ctx.beginPath(); ctx.arc(l / 2 + Math.cos(ang) * 18, a / 2 + Math.sin(ang) * 18, 2.4, 0, Math.PI * 2); ctx.fill();
  }
}, false);

export const texturaLapide = testo => tela(128, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#8c857a';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
  ctx.strokeStyle = '#4c463e';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, l - 16, a - 16);
  ctx.fillStyle = '#3a342c';
  ctx.font = 'bold 15px Georgia, serif';
  ctx.textAlign = 'center';
  testo.forEach((riga, i) => ctx.fillText(riga, l / 2, 60 + i * 26));
  ctx.beginPath(); ctx.moveTo(l / 2, a - 70); ctx.lineTo(l / 2, a - 30); ctx.moveTo(l / 2 - 14, a - 56); ctx.lineTo(l / 2 + 14, a - 56); ctx.stroke();
}, false);

export const texturaViaCrucis = n => tela(64, 80, (ctx, l, a, caso) => {
  ctx.fillStyle = '#5a4026';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#8c6a44';
  ctx.fillRect(6, 6, l - 12, a - 22);
  ctx.fillStyle = '#5a4026';
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(16 + i * 16, 30 + caso() * 10, 6, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillRect(28, 18, 6, 34);
  ctx.fillStyle = '#e8d8b0';
  ctx.font = 'bold 11px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'][n % 14], l / 2, a - 6);
}, false, n);

export const texturaCanne = () => tela(256, 256, (ctx, l, a) => {
  ctx.fillStyle = '#2a1c12';
  ctx.fillRect(0, 0, l, a);
  const n = 24;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (l / n);
    const alto = a * (0.45 + 0.45 * Math.abs(Math.sin((i / n) * Math.PI)));
    const g = ctx.createLinearGradient(x - 4, 0, x + 4, 0);
    g.addColorStop(0, '#7a7a80');
    g.addColorStop(0.5, '#e6e6ee');
    g.addColorStop(1, '#6a6a70');
    ctx.fillStyle = g;
    ctx.fillRect(x - 4, a - alto, 8, alto);
    ctx.fillStyle = '#1a1210';
    ctx.fillRect(x - 3, a - alto * 0.18, 6, 4);
  }
}, false);

export const texturaBeato = () => tela(256, 128, (ctx, l, a) => {
  ctx.fillStyle = '#26180e';
  ctx.fillRect(0, 0, l, a);
  ctx.fillStyle = '#5a4630';
  ctx.beginPath();
  ctx.ellipse(l * 0.55, a * 0.62, l * 0.34, a * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d8c0a0';
  ctx.beginPath(); ctx.arc(l * 0.2, a * 0.55, 13, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd86a';
  ctx.globalAlpha = 0.35;
  ctx.beginPath(); ctx.arc(l * 0.2, a * 0.55, 24, 0, Math.PI * 2); ctx.fill();
}, false);

export function texturaAlone(colore) {
  return tela(64, 64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, colore);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }, false);
}

export const texturaScrittaArco = (testo, colore = '#2a2a2a') => tela(512, 160, (ctx, l, a) => {
  ctx.fillStyle = colore;
  ctx.font = 'bold 44px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lettere = [...testo];
  const arco = Math.PI * 0.62;
  lettere.forEach((c, i) => {
    const ang = -Math.PI / 2 - arco / 2 + (arco * (i + 0.5)) / lettere.length;
    ctx.save();
    ctx.translate(l / 2 + Math.cos(ang) * 230, a + 70 + Math.sin(ang) * 230);
    ctx.rotate(ang + Math.PI / 2);
    ctx.fillText(c, 0, 0);
    ctx.restore();
  });
}, false);

export const texturaIntonacoOcra = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#efc57e';
  ctx.fillRect(0, 0, l, a);
  for (let i = 0; i < 30; i++) {
    const g = ctx.createRadialGradient(caso() * l, caso() * a, 0, caso() * l, caso() * a, 20 + caso() * 50);
    g.addColorStop(0, caso() < 0.5 ? 'rgba(255,236,190,0.09)' : 'rgba(196,140,70,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  }
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = caso() < 0.5 ? 'rgba(255,250,230,0.12)' : 'rgba(150,100,40,0.08)';
    ctx.fillRect(caso() * l, caso() * a, 2, 2);
  }
});

export const texturaGraniglia = () => tela(256, 256, (ctx, l, a, caso) => {
  ctx.fillStyle = '#cfc8bb';
  ctx.fillRect(0, 0, l, a);
  const colori = ['#8a8278', '#e9e4da', '#a25a44', '#5c5650', '#d8c7a0'];
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = colori[Math.floor(caso() * colori.length)];
    const r = 0.6 + caso() * 2.2;
    ctx.beginPath();
    ctx.arc(caso() * l, caso() * a, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = 'rgba(80,70,60,0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, l, a);
});
