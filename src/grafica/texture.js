import * as THREE from 'three';
import { creaCaso } from './caso-grafica.js';

const LATO = 64;

function disegna(larghezza, altezza, pittore, ripeti = true) {
  const canvas = document.createElement('canvas');
  canvas.width = larghezza;
  canvas.height = altezza;
  const ctx = canvas.getContext('2d');
  pittore(ctx, larghezza, altezza, creaCaso(larghezza * 31 + altezza));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (ripeti) texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

const REALI = Object.freeze(['muro', 'piastrelle', 'parquet', 'soffitto', 'legno', 'legnoChiaro', 'porta', 'terra', 'linoleum', 'cemento', 'asfalto', 'metallo']);

export const TEXTURE_SCUOLA = REALI;
export const TEXTURE_TEATRO = Object.freeze(['muro', 'parquet', 'soffitto', 'legno', 'porta', 'cemento', 'asfalto', 'metallo', 'assiVecchie']);
export const TEXTURE_PALUDE = Object.freeze(['fango', 'assiVecchie', 'corteccia', 'pietraMuschio', 'roccia', 'legno', 'metallo', 'cemento', 'paglia']);
export const TEXTURE_GIUNGLA = Object.freeze(['suoloGiungla', 'foglieTerra', 'pietraMuschio', 'pietraTempio', 'roccia', 'paglia', 'assiVecchie', 'fango', 'cortecciaPalma', 'corteccia', 'metallo', 'legno']);

export async function caricaTextureReali(chiavi = REALI, { piene = true, base = './texture/' } = {}) {
  const loader = new THREE.TextureLoader();
  const carica = async (nome, colore) => {
    const t = await loader.loadAsync(`${base}${nome}.jpg`);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    if (colore) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const voci = await Promise.all(chiavi.map(async chiave => {
    const [map, normalMap, roughnessMap] = await Promise.all([carica(`${chiave}_diff`, true), piene ? carica(`${chiave}_nor`, false) : null, piene ? carica(`${chiave}_rough`, false) : null]);
    return [chiave, { map, normalMap, roughnessMap }];
  }));
  return Object.fromEntries(voci);
}

function rumore(ctx, l, a, caso, colori, quanti) {
  for (let i = 0; i < quanti; i++) {
    ctx.fillStyle = colori[Math.floor(caso() * colori.length)];
    ctx.fillRect(Math.floor(caso() * l), Math.floor(caso() * a), 1 + Math.floor(caso() * 2), 1 + Math.floor(caso() * 2));
  }
}

function macchie(ctx, l, a, caso, colore, quante) {
  for (let i = 0; i < quante; i++) {
    ctx.fillStyle = colore;
    const x = caso() * l;
    const y = caso() * a;
    for (let j = 0; j < 14; j++) ctx.fillRect(Math.floor(x + (caso() - 0.5) * 10), Math.floor(y + (caso() - 0.5) * 10), 2, 2);
  }
}

export function creaTexture() {
  const muro = disegna(LATO, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#b9ae8e';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#a99f80', '#c5bb9c', '#9c9274'], 500);
    ctx.fillStyle = '#3f5b48';
    ctx.fillRect(0, Math.floor(a * 0.62), l, Math.ceil(a * 0.38));
    for (let x = 0; x < l; x += 8) for (let y = Math.floor(a * 0.62); y < a; y += 8) {
      ctx.fillStyle = (x + y) % 16 ? '#466751' : '#3a5443';
      ctx.fillRect(x, y, 7, 7);
    }
    ctx.fillStyle = '#2c2a22';
    ctx.fillRect(0, Math.floor(a * 0.6), l, 2);
    macchie(ctx, l, a * 0.6, caso, 'rgba(70,55,30,0.35)', 5);
  });
  const piastrelle = disegna(LATO, LATO, (ctx, l, a, caso) => {
    for (let x = 0; x < l; x += 16) for (let y = 0; y < a; y += 16) {
      ctx.fillStyle = ((x + y) / 16) % 2 ? '#8d8a80' : '#5f5d57';
      ctx.fillRect(x, y, 16, 16);
    }
    rumore(ctx, l, a, caso, ['#4b4943', '#9b988e', '#3a3934'], 400);
    ctx.fillStyle = '#2a2925';
    for (let i = 0; i < l; i += 16) {
      ctx.fillRect(i, 0, 1, a);
      ctx.fillRect(0, i, l, 1);
    }
  });
  const parquet = disegna(LATO, LATO, (ctx, l, a, caso) => {
    for (let y = 0; y < a; y += 8) {
      const scarto = (y / 8) % 2 ? 0 : 16;
      for (let x = -scarto; x < l; x += 32) {
        const tono = 120 + Math.floor(caso() * 30);
        ctx.fillStyle = `rgb(${tono},${Math.floor(tono * 0.68)},${Math.floor(tono * 0.4)})`;
        ctx.fillRect(x, y, 31, 7);
      }
    }
    rumore(ctx, l, a, caso, ['#5e3d22', '#8e6238'], 300);
    ctx.fillStyle = '#d8d0b0';
    ctx.fillRect(0, 30, l, 1);
  });
  const soffitto = disegna(LATO, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#8f8b7c';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#7e7a6c', '#a19d8d', '#6a675b'], 600);
    ctx.fillStyle = '#4f4c43';
    for (let i = 0; i < l; i += 32) {
      ctx.fillRect(i, 0, 2, a);
      ctx.fillRect(0, i, l, 2);
    }
    macchie(ctx, l, a, caso, 'rgba(90,70,30,0.4)', 3);
  });
  const legno = disegna(LATO, 16, (ctx, l, a, caso) => {
    ctx.fillStyle = '#6b4a2b';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#5a3d22', '#7d5834', '#4a311b'], 200);
    ctx.fillStyle = '#3a2614';
    ctx.fillRect(0, 0, l, 1);
    ctx.fillRect(0, a - 1, l, 1);
    ctx.fillStyle = '#9a9a9a';
    ctx.fillRect(4, 6, 2, 2);
    ctx.fillRect(l - 6, 7, 2, 2);
  });
  const porta = disegna(LATO, LATO, (ctx, l, a, caso) => {
    for (let x = 0; x < l; x += 8) {
      const tono = 70 + Math.floor(caso() * 25);
      ctx.fillStyle = `rgb(${tono},${Math.floor(tono * 0.72)},${Math.floor(tono * 0.45)})`;
      ctx.fillRect(x, 0, 7, a);
    }
    rumore(ctx, l, a, caso, ['#3b2817', '#56391f'], 200);
    ctx.strokeStyle = '#8f8f8f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(l, 46);
    ctx.moveTo(l, 18);
    ctx.lineTo(0, 46);
    ctx.stroke();
  });
  const armadietti = disegna(LATO, LATO, (ctx, l, a, caso) => {
    for (let x = 0; x < l; x += 16) {
      ctx.fillStyle = '#4b6a7f';
      ctx.fillRect(x, 0, 15, a);
      ctx.fillStyle = '#2d4150';
      for (let y = 6; y < 20; y += 3) ctx.fillRect(x + 4, y, 8, 1);
      ctx.fillStyle = '#c0c0c0';
      ctx.fillRect(x + 12, 30, 2, 5);
    }
    rumore(ctx, l, a, caso, ['#6b5a3a', '#3a4d5a'], 300);
  }, true);
  const libri = disegna(256, 256, (ctx, l, a, caso) => {
    const COLORI = ['#5a1f1b', '#1f3a5a', '#2f4a2a', '#6b5233', '#3d2b4a', '#7a6a4a', '#2a2a2a', '#4a3020', '#8a7a5a', '#244040'];
    ctx.fillStyle = '#2a1b10';
    ctx.fillRect(0, 0, l, a);
    const ripiano = a / 4;
    for (let r = 0; r < 4; r++) {
      const base = (r + 1) * ripiano - 6;
      let x = 2;
      while (x < l - 4) {
        const larghezza = 5 + Math.floor(caso() * 9);
        const alto = ripiano * (0.55 + caso() * 0.32);
        const vuoto = caso() < 0.06;
        if (!vuoto) {
          const inclinato = caso() < 0.05;
          ctx.save();
          ctx.translate(x, base);
          if (inclinato) ctx.rotate(-0.18);
          ctx.fillStyle = COLORI[Math.floor(caso() * COLORI.length)];
          ctx.fillRect(0, -alto, larghezza, alto);
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.fillRect(larghezza - 1, -alto, 1, alto);
          ctx.fillStyle = 'rgba(210,180,110,0.55)';
          if (larghezza > 7) {
            ctx.fillRect(1, -alto + 6, larghezza - 2, 1);
            ctx.fillRect(1, -10, larghezza - 2, 1);
          }
          ctx.restore();
        }
        x += larghezza + (vuoto ? 6 : 0);
      }
      ctx.fillStyle = '#4a3220';
      ctx.fillRect(0, base, l, 6);
      ctx.fillStyle = '#1a1009';
      ctx.fillRect(0, base + 5, l, 1);
    }
    rumore(ctx, l, a, caso, ['rgba(120,110,90,0.25)', 'rgba(0,0,0,0.25)'], 1200);
  });
  const terra = disegna(LATO, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#2b2a1e';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#3a3824', '#22301a', '#1d1c14', '#34452a'], 900);
  });
  const lavagna = disegna(LATO * 2, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#5b4026';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#1f3327';
    ctx.fillRect(4, 4, l - 8, a - 8);
    rumore(ctx, l, a, caso, ['#2a4434', '#18281e'], 300);
    ctx.fillStyle = 'rgba(230,230,220,0.85)';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('NON USCITE', 14, 26);
    ctx.fillText('DI NOTTE', 22, 44);
    ctx.fillStyle = 'rgba(120,10,10,0.8)';
    ctx.fillRect(90, 46, 20, 2);
  }, false);
  const metallo = disegna(32, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#3a3d40';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#2b2d30', '#4a4e52', '#55493a'], 120);
  });
  const legnoChiaro = disegna(32, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#8a6a44';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#6e5333', '#9e7c52'], 150);
    for (let y = 0; y < a; y += 8) {
      ctx.fillStyle = '#5a4126';
      ctx.fillRect(0, y, l, 1);
    }
  });
  const linoleum = disegna(LATO, LATO, (ctx, l, a, caso) => {
    for (let x = 0; x < l; x += 32) for (let y = 0; y < a; y += 32) {
      ctx.fillStyle = ((x + y) / 32) % 2 ? '#b8ad86' : '#6f8a6a';
      ctx.fillRect(x, y, 32, 32);
    }
    rumore(ctx, l, a, caso, ['#9a916e', '#5c7358', '#c9bf9a', '#4a4536'], 500);
    macchie(ctx, l, a, caso, 'rgba(60,45,25,0.35)', 3);
  });
  const cemento = disegna(LATO, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#5d5c58';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#4e4d49', '#6b6a65', '#3f3e3a', '#74706a'], 900);
    ctx.strokeStyle = '#2f2e2b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4, 10);
    ctx.lineTo(22, 26);
    ctx.lineTo(30, 24);
    ctx.lineTo(50, 44);
    ctx.stroke();
    macchie(ctx, l, a, caso, 'rgba(40,30,15,0.5)', 4);
  });
  const asfalto = disegna(LATO, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#2f3032';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#3a3b3d', '#262729', '#45464a', '#1f2022'], 1100);
    ctx.fillStyle = 'rgba(210,200,160,0.55)';
    ctx.fillRect(0, 31, l, 2);
    macchie(ctx, l, a, caso, 'rgba(20,20,20,0.6)', 3);
  });
  const rete = disegna(32, 32, (ctx, l, a) => {
    ctx.clearRect(0, 0, l, a);
    ctx.strokeStyle = '#8d9499';
    ctx.lineWidth = 1;
    for (let i = -32; i < 64; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 32, 32);
      ctx.moveTo(i + 32, 0);
      ctx.lineTo(i, 32);
      ctx.stroke();
    }
  });
  const pulmino = disegna(LATO * 2, LATO, (ctx, l, a, caso) => {
    ctx.fillStyle = '#d9a21b';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#b9861a', '#e5b43a', '#6b4a1a'], 700);
    ctx.fillStyle = '#1b2228';
    for (let x = 6; x < l - 10; x += 20) ctx.fillRect(x, 10, 15, 16);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 34, l, 4);
    ctx.font = 'bold 10px monospace';
    ctx.fillText('SCUOLABUS', 30, 50);
    macchie(ctx, l, a, caso, 'rgba(90,50,20,0.6)', 5);
  });
  const corteccia = disegna(16, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#3b2c1e';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#2a1f15', '#4a3828'], 120);
  });
  const fogliame = disegna(32, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#1f3a1e';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#15281a', '#2b4d24', '#183020'], 300);
  });
  const mimetica = disegna(32, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#4b5237';
    ctx.fillRect(0, 0, l, a);
    macchie(ctx, l, a, caso, 'rgba(35,40,25,0.9)', 7);
    macchie(ctx, l, a, caso, 'rgba(110,98,66,0.8)', 5);
    rumore(ctx, l, a, caso, ['#3c4230', '#585f40'], 160);
  });
  const pannello = disegna(64, 32, (ctx, l, a, caso) => {
    ctx.fillStyle = '#5b4632';
    ctx.fillRect(0, 0, l, a);
    rumore(ctx, l, a, caso, ['#4a3828', '#6b5440'], 260);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    for (let x = 4; x < l; x += 8) for (let y = 4; y < a; y += 8) ctx.fillRect(x, y, 2, 2);
  });
  return { muro, piastrelle, parquet, soffitto, legno, porta, armadietti, terra, lavagna, metallo, legnoChiaro, linoleum, cemento, asfalto, rete, pulmino, corteccia, fogliame, mimetica, pannello, libri };
}

export function texturaTesto(righe, { larghezza = 128, altezza = 64, sfondo = null, colore = '#f2efe6', font = 'bold 14px monospace', bordo = null } = {}) {
  return disegna(larghezza, altezza, ctx => {
    if (sfondo) {
      ctx.fillStyle = sfondo;
      ctx.fillRect(0, 0, larghezza, altezza);
    }
    if (bordo) {
      ctx.strokeStyle = bordo;
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, larghezza - 4, altezza - 4);
    }
    ctx.fillStyle = colore;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    righe.forEach((riga, i) => ctx.fillText(riga, larghezza / 2, ((i + 1) * altezza) / (righe.length + 1)));
  }, false);
}

export function texturaGesso(sagoma, righe) {
  return disegna(128, 64, ctx => {
    ctx.strokeStyle = 'rgba(235,235,225,0.9)';
    ctx.fillStyle = 'rgba(235,235,225,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    sagoma(ctx);
    ctx.stroke();
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    righe.forEach((riga, i) => ctx.fillText(riga, 64, 50 + i * 11));
  }, false);
}
