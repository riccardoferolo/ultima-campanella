import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { creaRumore } from './rumore.js';

const CELLA = 256;
const LATO = CELLA * 4;
const BORDO = 6;
const FORZA_RILIEVO = 7;
const C = Object.freeze({
  OTTONE: 0, PIASTRA: 1, RAME: 2, PIOMBO: 3, ACCIAIO: 4, RUGGINE: 5, CIRRIPEDI: 6, ALGA: 7,
  GOMMA: 8, VETRO: 9, SPINA: 10, CORALLO_CIANO: 11, CORALLO_GIALLO: 12, LUCE_ROSSA: 13, CAMPIONI: 14, FERRO: 15,
});
const CAMPIONE = Object.freeze({ CIANO: 0, GIALLO: 1, AMBRA: 2, LAMPO: 3 });
const UNITA_ZOMBIE = 0.01;
const UNITA_MAGRO = 0.25;
const ARCHI_OGNI = 0.05;
const PUNTI_ARCO = 10;
const RAGGIO_ARCHI = 400;
const SU = new THREE.Vector3(0, 1, 0);

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const m4 = (x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = sx, sz = sx) => new THREE.Matrix4().compose(v3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), v3(sx, sy, sz));

function verso(p, direzione, s = 1, giro = 0, sy = s) {
  const q = new THREE.Quaternion().setFromUnitVectors(SU, direzione.clone().normalize());
  q.multiply(new THREE.Quaternion().setFromAxisAngle(SU, giro));
  return new THREE.Matrix4().compose(p, q, v3(s, sy, s));
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

const morbido = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function campoPeriodico(rumore, frequenza, ottave) {
  const v = new Float32Array(CELLA * CELLA);
  for (let y = 0; y < CELLA; y++) {
    for (let x = 0; x < CELLA; x++) {
      const u = (x / CELLA) * Math.PI * 2;
      const w = (y / CELLA) * Math.PI * 2;
      v[y * CELLA + x] = rumore.fbm(Math.cos(u) * frequenza, Math.sin(u) * frequenza + Math.cos(w) * frequenza, Math.sin(w) * frequenza, ottave);
    }
  }
  return v;
}

function bozzo(arr, cx, cy, raggio, altezza) {
  const x0 = Math.max(0, Math.floor(cx - raggio));
  const x1 = Math.min(CELLA - 1, Math.ceil(cx + raggio));
  const y0 = Math.max(0, Math.floor(cy - raggio));
  const y1 = Math.min(CELLA - 1, Math.ceil(cy + raggio));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d = Math.hypot(x - cx, y - cy) / raggio;
      if (d < 1) arr[y * CELLA + x] += altezza * (1 - d * d) ** 0.8;
    }
  }
}

function solco(arr, ax, ay, bx, by, larghezza, valore) {
  const x0 = Math.max(0, Math.floor(Math.min(ax, bx) - larghezza));
  const x1 = Math.min(CELLA - 1, Math.ceil(Math.max(ax, bx) + larghezza));
  const y0 = Math.max(0, Math.floor(Math.min(ay, by) - larghezza));
  const y1 = Math.min(CELLA - 1, Math.ceil(Math.max(ay, by) + larghezza));
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy || 1;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const t = Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / l2));
      const d = Math.hypot(x - ax - dx * t, y - ay - dy * t);
      if (d < larghezza) arr[y * CELLA + x] += valore * (1 - d / larghezza);
    }
  }
}

function crepa(arr, x, y, angolo, passi, larghezza, valore, caso, rami = 2) {
  let px = x;
  let py = y;
  for (let i = 0; i < passi; i++) {
    angolo += (caso() - 0.5) * 0.9;
    const nx = px + Math.cos(angolo) * 5;
    const ny = py + Math.sin(angolo) * 5;
    solco(arr, px, py, nx, ny, larghezza, valore);
    if (rami > 0 && caso() < 0.12) crepa(arr, nx, ny, angolo + (caso() < 0.5 ? 0.8 : -0.8), Math.floor(passi * 0.5), larghezza * 0.7, valore, caso, rami - 1);
    px = nx;
    py = ny;
  }
}

function nuovaCella() {
  const n = CELLA * CELLA;
  return { h: new Float32Array(n), k: new Float32Array(n), c: new Float32Array(n * 3), r: new Float32Array(n).fill(0.6), m: new Float32Array(n), e: new Float32Array(n * 3) };
}

function ogni(cella, campi, spostamento, fn) {
  const { grosso, fine } = campi;
  for (let y = 0; y < CELLA; y++) {
    for (let x = 0; x < CELLA; x++) {
      const i = y * CELLA + x;
      const j = ((y + spostamento * 37) & 255) * CELLA + ((x + spostamento * 71) & 255);
      fn(i, x, y, grosso[j], fine[j]);
    }
  }
}

const tinta = (cella, i, r, g, b) => {
  cella.c[i * 3] = r;
  cella.c[i * 3 + 1] = g;
  cella.c[i * 3 + 2] = b;
};
const luce = (cella, i, r, g, b) => {
  cella.e[i * 3] = r;
  cella.e[i * 3 + 1] = g;
  cella.e[i * 3 + 2] = b;
};
const mescola = (a, b, t) => a + (b - a) * t;

function metalloMartellato(cella, campi, caso, seme, base, patina, { ammaccature = 70, graffi = 40, verderame = 0.6, rivetti = null } = {}) {
  for (let i = 0; i < ammaccature; i++) bozzo(cella.h, caso() * CELLA, caso() * CELLA, 5 + caso() * 12, -0.18 - caso() * 0.12);
  for (let i = 0; i < graffi; i++) {
    const x = caso() * CELLA;
    const y = caso() * CELLA;
    const a = caso() * Math.PI;
    const l = 8 + caso() * 40;
    solco(cella.h, x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, 0.9, -0.12);
    solco(cella.k, x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, 0.9, 1);
  }
  if (rivetti) rivetti(cella);
  ogni(cella, campi, seme, (i, x, y, g, f) => {
    cella.h[i] += g * 0.45 + f * 0.12;
    const p = morbido(-0.05, -0.4, g + f * 0.25 + cella.h[i] * 0.3) * verderame;
    const lucido = Math.min(1, cella.k[i]);
    const chiaro = 0.86 + f * 0.25;
    tinta(cella, i, mescola(mescola(base[0] * chiaro, patina[0], p), 0.98, lucido * 0.45), mescola(mescola(base[1] * chiaro, patina[1], p), 0.86, lucido * 0.45), mescola(mescola(base[2] * chiaro, patina[2], p), 0.62, lucido * 0.45));
    cella.r[i] = 0.3 + p * 0.5 + (1 - f) * 0.08 - lucido * 0.12;
    cella.m[i] = 1 - p * 0.75;
  });
}

function filaRivetti(cella, x0, y0, x1, y1, passo, raggio) {
  const l = Math.hypot(x1 - x0, y1 - y0);
  const n = Math.max(1, Math.floor(l / passo));
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = y0 + ((y1 - y0) * i) / n;
    bozzo(cella.h, x, y, raggio, 0.9);
    bozzo(cella.k, x, y, raggio * 0.7, 1.4);
  }
}

const PITTORI = [
  (cella, campi, caso) => metalloMartellato(cella, campi, caso, 1, [0.7, 0.53, 0.3], [0.2, 0.22, 0.14], { verderame: 0.75 }),
  (cella, campi, caso) => metalloMartellato(cella, campi, caso, 2, [0.68, 0.51, 0.29], [0.22, 0.23, 0.15], {
    ammaccature: 30, verderame: 0.4,
    rivetti: c => {
      for (const t of [6, 128, 250]) {
        solco(c.h, 0, t, CELLA, t, 2.2, -0.5);
        solco(c.h, t, 0, t, CELLA, 2.2, -0.5);
      }
      for (const t of [16, 112, 144, 240]) {
        filaRivetti(c, 4, t, CELLA - 4, t, 16, 4.2);
        filaRivetti(c, t, 4, t, CELLA - 4, 16, 4.2);
      }
    },
  }),
  (cella, campi, caso) => metalloMartellato(cella, campi, caso, 3, [0.66, 0.36, 0.22], [0.2, 0.36, 0.3], { verderame: 0.4, ammaccature: 50 }),
  (cella, campi, caso) => {
    for (let i = 0; i < 26; i++) bozzo(cella.h, caso() * CELLA, caso() * CELLA, 10 + caso() * 22, -0.35);
    ogni(cella, campi, 4, (i, x, y, g, f) => {
      cella.h[i] += g * 0.5 + f * 0.1;
      const ossido = morbido(0.35, 0.65, f + g * 0.3) * 0.6;
      const chiaro = 0.85 + g * 0.3;
      tinta(cella, i, mescola(0.25 * chiaro, 0.46, ossido), mescola(0.26 * chiaro, 0.46, ossido), mescola(0.28 * chiaro, 0.44, ossido));
      cella.r[i] = 0.62 + ossido * 0.25;
      cella.m[i] = 0.75 - ossido * 0.5;
    });
  },
  (cella, campi, caso) => {
    for (let i = 0; i < 160; i++) {
      const y = caso() * CELLA;
      const x = caso() * CELLA;
      solco(cella.k, x, y, x + 20 + caso() * 80, y + (caso() - 0.5) * 2, 0.7, 0.35);
    }
    for (let i = 0; i < 30; i++) {
      const x = caso() * CELLA;
      const y = caso() * CELLA;
      const a = caso() * Math.PI;
      solco(cella.h, x, y, x + Math.cos(a) * 30, y + Math.sin(a) * 30, 1, -0.2);
      solco(cella.k, x, y, x + Math.cos(a) * 30, y + Math.sin(a) * 30, 1, 1);
    }
    ogni(cella, campi, 5, (i, x, y, g, f) => {
      cella.h[i] += f * 0.08 + g * 0.1;
      const ruggine = morbido(0.2, 0.5, g + f * 0.5) * 0.7;
      const lucido = Math.min(1, cella.k[i]);
      tinta(cella, i, mescola(0.2 + lucido * 0.35, 0.36, ruggine), mescola(0.21 + lucido * 0.35, 0.18, ruggine), mescola(0.23 + lucido * 0.35, 0.09, ruggine));
      cella.r[i] = 0.38 + ruggine * 0.45 - lucido * 0.1;
      cella.m[i] = 0.92 - ruggine * 0.5;
    });
  },
  (cella, campi, caso) => {
    filaRivetti(cella, 8, 14, CELLA - 8, 14, 22, 5);
    filaRivetti(cella, 8, CELLA - 14, CELLA - 8, CELLA - 14, 22, 5);
    for (let i = 0; i < 40; i++) {
      const x = caso() * CELLA;
      const y = caso() * CELLA * 0.6;
      solco(cella.k, x, y, x + (caso() - 0.5) * 6, y + 30 + caso() * 90, 2 + caso() * 3, 0.6);
    }
    ogni(cella, campi, 6, (i, x, y, g, f) => {
      const vernice = morbido(-0.08, 0.12, g + f * 0.35 - cella.k[i] * 0.35);
      cella.h[i] += vernice * 0.35 + (1 - vernice) * f * 0.5 + g * 0.2;
      const rug = 0.75 + f * 0.4;
      tinta(cella, i, mescola(0.42 * rug, 0.2 + f * 0.04, vernice), mescola(0.2 * rug, 0.26 + f * 0.04, vernice), mescola(0.09 * rug, 0.33 + f * 0.04, vernice));
      cella.r[i] = mescola(0.92, 0.62, vernice);
      cella.m[i] = mescola(0.45, 0.25, vernice);
    });
  },
  (cella, campi, caso) => {
    for (let i = 0; i < 90; i++) {
      const x = caso() * CELLA;
      const y = caso() * CELLA;
      const r = 6 + caso() * 12;
      bozzo(cella.h, x, y, r, 0.9);
      bozzo(cella.h, x, y, r * 0.38, -1.6);
      bozzo(cella.k, x, y, r * 0.38, 1.4);
    }
    ogni(cella, campi, 7, (i, x, y, g, f) => {
      cella.h[i] += f * 0.25;
      const buco = Math.min(1, cella.k[i]);
      const muschio = morbido(0.15, 0.45, g) * 0.6;
      const chiaro = 0.78 + f * 0.3;
      tinta(cella, i, mescola(mescola(0.8 * chiaro, 0.3, muschio), 0.12, buco), mescola(mescola(0.77 * chiaro, 0.36, muschio), 0.1, buco), mescola(mescola(0.68 * chiaro, 0.22, muschio), 0.08, buco));
      cella.r[i] = 0.82;
      cella.m[i] = 0;
    });
  },
  (cella, campi) => {
    ogni(cella, campi, 8, (i, x, y, g, f) => {
      const nervatura = Math.max(0, 1 - Math.abs(x - CELLA / 2) / 6);
      cella.h[i] = Math.sin(x * 0.35 + g * 4) * 0.12 + f * 0.25 + nervatura * 0.4;
      const t = morbido(-0.3, 0.4, f + g * 0.5);
      tinta(cella, i, mescola(0.16, 0.42, t) + nervatura * 0.1, mescola(0.24, 0.38, t) + nervatura * 0.08, mescola(0.07, 0.1, t));
      cella.r[i] = 0.32 + f * 0.1;
      cella.m[i] = 0;
      luce(cella, i, 0, nervatura * 0.05, nervatura * 0.04);
    });
  },
  (cella, campi, caso) => {
    for (let i = 0; i < 14; i++) crepa(cella.k, caso() * CELLA, caso() * CELLA, caso() * 6.28, 10, 1.2, 1, caso, 1);
    ogni(cella, campi, 9, (i, x, y, g, f) => {
      const maglia = Math.sin(x * 1.5) * Math.sin(y * 1.5);
      const consumo = morbido(0.15, 0.45, g + f * 0.3);
      const crepe = Math.min(1, cella.k[i]);
      cella.h[i] = maglia * 0.05 * (1 - consumo) + f * 0.12 - crepe * 0.4;
      const v = mescola(0.07, 0.17, consumo) + maglia * 0.01;
      tinta(cella, i, v + crepe * 0.08, v + crepe * 0.07, v * 1.08 + crepe * 0.06);
      cella.r[i] = 0.62 + consumo * 0.15;
      cella.m[i] = 0;
    });
  },
  (cella, campi, caso) => {
    const cx = CELLA * 0.6;
    const cy = CELLA * 0.4;
    for (let i = 0; i < 9; i++) crepa(cella.k, cx, cy, (i / 9) * Math.PI * 2 + caso() * 0.4, 14, 1.3, 1, caso, 2);
    for (let i = 0; i < 4; i++) {
      const r = 10 + i * 9 + caso() * 6;
      for (let a = 0; a < Math.PI * 2; a += 0.3) solco(cella.k, cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(a + 0.32) * r, cy + Math.sin(a + 0.32) * r, 0.9, caso() < 0.6 ? 0.8 : 0);
    }
    ogni(cella, campi, 10, (i, x, y, g, f) => {
      const crepe = Math.min(1, cella.k[i]);
      const sporco = morbido(0.1, 0.5, g) * 0.5;
      cella.h[i] = -crepe * 0.3 + g * 0.05;
      tinta(cella, i, mescola(0.03 + crepe * 0.5, 0.2, sporco), mescola(0.06 + crepe * 0.55, 0.17, sporco), mescola(0.08 + crepe * 0.55, 0.1, sporco));
      cella.r[i] = 0.05 + crepe * 0.5 + sporco * 0.6;
      cella.m[i] = 0.4;
    });
  },
  (cella, campi, caso) => {
    for (let i = 0; i < 260; i++) {
      const x = caso() * CELLA;
      const y = caso() * CELLA;
      bozzo(cella.h, x, y, 2 + caso() * 4, -0.9);
      bozzo(cella.k, x, y, 2 + caso() * 3, 1);
    }
    ogni(cella, campi, 11, (i, x, y, g, f) => {
      cella.h[i] += g * 0.4 + f * 0.3;
      const poro = Math.min(1, cella.k[i]);
      const t = morbido(-0.3, 0.4, g + f * 0.4);
      tinta(cella, i, mescola(0.72, 0.92, t) * (1 - poro * 0.55), mescola(0.26, 0.5, t) * (1 - poro * 0.6), mescola(0.15, 0.32, t) * (1 - poro * 0.6));
      cella.r[i] = 0.78;
      cella.m[i] = 0;
    });
  },
  (cella, campi, caso) => corallo(cella, campi, caso, 12, [0.3, 0.95, 1]),
  (cella, campi, caso) => corallo(cella, campi, caso, 13, [1, 0.78, 0.22]),
  (cella, campi, caso) => {
    for (let i = 0; i < 10; i++) {
      const x = caso() * CELLA;
      solco(cella.k, x, 0, x + (caso() - 0.5) * 30, CELLA, 3 + caso() * 6, 0.5);
    }
    ogni(cella, campi, 14, (i, x, y, g, f) => {
      const d = Math.hypot(x - CELLA / 2, y - CELLA / 2) / (CELLA / 2);
      const sporco = Math.min(1, cella.k[i]) * 0.6 + morbido(0.2, 0.5, g) * 0.3;
      const nucleo = Math.max(0, 1 - d / 0.22);
      const corpo = Math.max(0, 1 - d / 0.62) ** 1.4;
      const bordo = Math.max(0, 1 - d) ** 2;
      const k = 1 - sporco;
      luce(cella, i, (nucleo * 0.9 + corpo * 1.2 + bordo * 0.3) * k, (nucleo * 0.75 + corpo * 0.12 + bordo * 0.01) * k, (nucleo * 0.55 + corpo * 0.06) * k);
      tinta(cella, i, 0.2 + corpo * 0.3, 0.04, 0.03);
      cella.h[i] = g * 0.04 - sporco * 0.1;
      cella.r[i] = 0.06 + sporco * 0.4;
      cella.m[i] = 0.2;
    });
  },
  (cella) => {
    const colori = [[0.45, 1, 1], [1, 0.9, 0.25], [1, 0.62, 0.18], [0.75, 0.92, 1]];
    for (let y = 0; y < CELLA; y++) {
      for (let x = 0; x < CELLA; x++) {
        const i = y * CELLA + x;
        const s = (y < CELLA / 2 ? 0 : 2) + (x < CELLA / 2 ? 0 : 1);
        const d = Math.hypot((x % 128) - 64, (y % 128) - 64) / 64;
        const col = colori[s];
        const k = 1 + Math.max(0, 1 - d * 2.2) * 0.8;
        luce(cella, i, Math.min(1, col[0] * k), Math.min(1, col[1] * k), Math.min(1, col[2] * k));
        tinta(cella, i, col[0] * 0.4, col[1] * 0.4, col[2] * 0.4);
        cella.r[i] = 0.2;
        cella.m[i] = 0;
      }
    }
  },
  (cella, campi, caso) => metalloMartellato(cella, campi, caso, 15, [0.2, 0.18, 0.17], [0.46, 0.22, 0.1], { verderame: 0.9, graffi: 20 }),
];

function corallo(cella, campi, caso, seme, colore) {
  for (let i = 0; i < 170; i++) {
    const x = caso() * CELLA;
    const y = caso() * CELLA;
    const r = 3 + caso() * 5;
    bozzo(cella.h, x, y, r, 0.8);
    bozzo(cella.k, x, y, r * 0.7, 1.2);
  }
  ogni(cella, campi, seme, (i, x, y, g, f) => {
    cella.h[i] += g * 0.3 + f * 0.2;
    const polipo = Math.min(1, cella.k[i]);
    tinta(cella, i, 0.05 + colore[0] * polipo * 0.3, 0.14 + colore[1] * polipo * 0.3, 0.16 + colore[2] * polipo * 0.3);
    const k = polipo * 0.95 + 0.12 + Math.max(0, f) * 0.1;
    luce(cella, i, colore[0] * k, colore[1] * k, colore[2] * k);
    cella.r[i] = 0.45;
    cella.m[i] = 0;
  });
}

function scriviCella(indice, cella, immagini) {
  const ox = (indice % 4) * CELLA;
  const oy = Math.floor(indice / 4) * CELLA;
  const { colore, normali, orm, emissivo } = immagini;
  const h = cella.h;
  const a = (x, y) => h[Math.min(CELLA - 1, Math.max(0, y)) * CELLA + Math.min(CELLA - 1, Math.max(0, x))];
  const n = new THREE.Vector3();
  const byte = v => Math.round(Math.min(1, Math.max(0, v)) * 255);
  for (let y = 0; y < CELLA; y++) {
    for (let x = 0; x < CELLA; x++) {
      const i = y * CELLA + x;
      const o = ((oy + y) * LATO + ox + x) * 4;
      n.set(-(a(x + 1, y) - a(x - 1, y)) * FORZA_RILIEVO, (a(x, y + 1) - a(x, y - 1)) * FORZA_RILIEVO, 1).normalize();
      normali[o] = byte(n.x * 0.5 + 0.5);
      normali[o + 1] = byte(n.y * 0.5 + 0.5);
      normali[o + 2] = byte(n.z * 0.5 + 0.5);
      normali[o + 3] = 255;
      for (let k = 0; k < 3; k++) {
        colore[o + k] = byte(cella.c[i * 3 + k]);
        emissivo[o + k] = byte(cella.e[i * 3 + k]);
      }
      colore[o + 3] = emissivo[o + 3] = 255;
      orm[o] = 255;
      orm[o + 1] = byte(cella.r[i]);
      orm[o + 2] = byte(cella.m[i]);
      orm[o + 3] = 255;
    }
  }
}

function texturaDa(dati, srgb) {
  const tela = document.createElement('canvas');
  tela.width = tela.height = LATO;
  const ctx = tela.getContext('2d');
  ctx.putImageData(new ImageData(dati, LATO, LATO), 0, 0);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 4;
  return t;
}

let atlante = null;
function atlanteCreature() {
  if (atlante) return atlante;
  const rumore = creaRumore(5151);
  const campi = { grosso: campoPeriodico(rumore, 1.4, 4), fine: campoPeriodico(rumore, 4.6, 3) };
  const n = LATO * LATO * 4;
  const immagini = { colore: new Uint8ClampedArray(n), normali: new Uint8ClampedArray(n), orm: new Uint8ClampedArray(n), emissivo: new Uint8ClampedArray(n) };
  PITTORI.forEach((pittore, indice) => {
    const cella = nuovaCella();
    pittore(cella, campi, generatore(indice * 7919 + 13));
    scriviCella(indice, cella, immagini);
  });
  atlante = {
    map: texturaDa(immagini.colore, true),
    normalMap: texturaDa(immagini.normali, false),
    orm: texturaDa(immagini.orm, false),
    emissiveMap: texturaDa(immagini.emissivo, true),
  };
  return atlante;
}

function materialeAtlante(emissivo) {
  const a = atlanteCreature();
  return new THREE.MeshStandardMaterial({
    map: a.map, normalMap: a.normalMap, roughnessMap: a.orm, metalnessMap: a.orm, emissiveMap: a.emissiveMap,
    emissive: 0xffffff, emissiveIntensity: emissivo, roughness: 1, metalness: 1, envMapIntensity: 1.2,
  });
}

let materiali = null;
function materialiCreature() {
  if (materiali) return materiali;
  materiali = {
    anfibio: materialeAtlante(2.2),
    sommozzatore: materialeAtlante(2.4),
    elettrico: materialeAtlante(2.6),
    palombaro: materialeAtlante(2.4),
    archi: new THREE.MeshLambertMaterial({ color: 0x000000, emissive: 0x8fe6ff, emissiveIntensity: 5, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    vene: new THREE.MeshLambertMaterial({
      color: 0x000000, emissive: 0x4fc8ff, emissiveIntensity: 1.8, emissiveMap: texturaVene(), transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    }),
  };
  return materiali;
}

function inCella(g, cella, sotto = -1) {
  const col = cella % 4;
  const riga = Math.floor(cella / 4);
  let x0 = col * CELLA + BORDO;
  let y0 = riga * CELLA + BORDO;
  let lato = CELLA - 2 * BORDO;
  if (sotto >= 0) {
    lato = CELLA / 2 - 2 * BORDO;
    x0 = col * CELLA + (sotto % 2) * (CELLA / 2) + BORDO;
    y0 = riga * CELLA + Math.floor(sotto / 2) * (CELLA / 2) + BORDO;
  }
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    const u = Math.min(1, Math.max(0, uv.getX(i)));
    const v = Math.min(1, Math.max(0, uv.getY(i)));
    uv.setXY(i, (x0 + u * lato) / LATO, 1 - (y0 + (1 - v) * lato) / LATO);
  }
}

function pezzo(g, cella, m = null, sotto = -1) {
  const q = g.index ? g.toNonIndexed() : g.clone();
  for (const nome of Object.keys(q.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) q.deleteAttribute(nome);
  if (!q.attributes.uv) q.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(q.attributes.position.count * 2), 2));
  if (!q.attributes.normal) q.computeVertexNormals();
  inCella(q, cella, sotto);
  if (m) q.applyMatrix4(m);
  return q;
}

function rovescia(g) {
  const q = g.clone();
  for (const nome of ['position', 'normal', 'uv']) {
    const a = q.attributes[nome];
    for (let i = 0; i < a.count; i += 3) {
      for (let k = 0; k < a.itemSize; k++) {
        const t = a.array[(i + 1) * a.itemSize + k];
        a.array[(i + 1) * a.itemSize + k] = a.array[(i + 2) * a.itemSize + k];
        a.array[(i + 2) * a.itemSize + k] = t;
      }
    }
  }
  const n = q.attributes.normal;
  for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  return q;
}

const dueFacce = g => [g, rovescia(g)];

function specchiaX(g) {
  const q = g.clone().applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
  const r = rovescia(q);
  const n = r.attributes.normal;
  for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  return r;
}

const unisci = pezzi => {
  const g = mergeGeometries(pezzi, false);
  pezzi.forEach(p => p.dispose());
  g.computeBoundingSphere();
  return g;
};

function matriceOsso(corpo, osso, unita) {
  corpo.updateWorldMatrix(true, true);
  return osso.matrixWorld.clone().invert().multiply(corpo.matrixWorld).multiply(new THREE.Matrix4().makeScale(1 / unita, 1 / unita, 1 / unita));
}

function trovaOsso(corpo, re) {
  let trovato = null;
  corpo.traverse(o => {
    if (!trovato && o.isBone && re.test(o.name)) trovato = o;
  });
  return trovato;
}

function attacca(osso, geometria, materiale) {
  if (!osso || !geometria) return null;
  const mesh = new THREE.Mesh(geometria, materiale);
  mesh.name = 'decorazioneAbisso';
  osso.add(mesh);
  return mesh;
}

function nelloSpazioOsso(pezzi, matrice) {
  const g = unisci(pezzi);
  g.applyMatrix4(matrice);
  g.computeBoundingSphere();
  return g;
}

const geoCirripede = (() => {
  let g = null;
  return () => g ??= new THREE.LatheGeometry([new THREE.Vector2(1, 0), new THREE.Vector2(0.86, 0.38), new THREE.Vector2(0.56, 0.82), new THREE.Vector2(0.44, 0.78), new THREE.Vector2(0.3, 0.3)], 7);
})();

function cirripedi(pezzi, centro, raggio, direzione, apertura, quanti, rMin, rMax, caso) {
  for (let i = 0; i < quanti; i++) {
    const d = direzione.clone().normalize().add(v3(caso() - 0.5, caso() - 0.5, caso() - 0.5).multiplyScalar(apertura * 2)).normalize();
    const r = rMin + (rMax - rMin) * caso() ** 1.6;
    const p = centro.clone().addScaledVector(d, raggio - r * 0.15);
    pezzi.push(pezzo(geoCirripede(), C.CIRRIPEDI, verso(p, d, r, caso() * 6, r * (0.8 + caso() * 0.7))));
  }
}

function coralloRamificato(pezzi, base, direzione, lungo, cella, caso, livelli = 2) {
  const ramo = (da, dir, l, spessore, livello) => {
    const a = da.clone().addScaledVector(dir, l);
    pezzi.push(pezzo(new THREE.CylinderGeometry(spessore * 0.62, spessore, l, 5, 2).translate(0, l / 2, 0), cella, verso(da, dir)));
    if (livello === 0) {
      pezzi.push(pezzo(new THREE.SphereGeometry(spessore * 1.15, 6, 4), C.CAMPIONI, m4(a.x, a.y, a.z), cella === C.CORALLO_GIALLO ? CAMPIONE.GIALLO : CAMPIONE.CIANO));
      return;
    }
    const n = 2 + (caso() < 0.5 ? 1 : 0);
    for (let k = 0; k < n; k++) {
      const nd = dir.clone().add(v3(caso() - 0.5, caso() * 0.4, caso() - 0.5).multiplyScalar(1.5)).normalize();
      ramo(a, nd, l * (0.62 + caso() * 0.2), spessore * 0.68, livello - 1);
    }
  };
  ramo(base, direzione.clone().normalize(), lungo, lungo * 0.2, livelli);
}

function alga(pezzi, attacco, lungo, largo, giro, curva) {
  const g = new THREE.PlaneGeometry(largo, lungo, 1, 12).translate(0, -lungo / 2, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = -p.getY(i) / lungo;
    p.setX(i, p.getX(i) * (1 - t * 0.55) + Math.sin(t * 5 + giro) * largo * 0.5);
    p.setZ(i, Math.sin(t * 3.4 + giro) * curva * t + t * t * curva * 0.6);
  }
  g.computeVertexNormals();
  pezzi.push(...dueFacce(pezzo(g, C.ALGA, m4(attacco.x, attacco.y, attacco.z, 0, giro, 0))));
}

function spina(pezzi, base, direzione, lungo, spessore, caso) {
  const g = new THREE.ConeGeometry(spessore, lungo, 6, 3).translate(0, lungo / 2, 0);
  const p = g.attributes.position;
  const piega = (caso() - 0.5) * 0.5;
  for (let i = 0; i < p.count; i++) {
    const t = p.getY(i) / lungo;
    p.setX(i, p.getX(i) + t * t * lungo * piega);
  }
  g.computeVertexNormals();
  pezzi.push(pezzo(g, C.SPINA, verso(base, direzione, 1, caso() * 6)));
}

function occhi(pezzi, punti, raggio, campione) {
  for (const p of punti) pezzi.push(pezzo(new THREE.SphereGeometry(raggio, 10, 8), C.CAMPIONI, m4(p.x, p.y, p.z), campione));
}

function tubo(pezzi, punti, raggio, cella, { segmenti = 24, lati = 8, corrugato = 0 } = {}) {
  const curva = new THREE.CatmullRomCurve3(punti);
  const g = new THREE.TubeGeometry(curva, segmenti, raggio, lati, false);
  if (corrugato) {
    const p = g.attributes.position;
    const n = g.attributes.normal;
    const uv = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      const k = Math.sin(uv.getX(i) * segmenti * Math.PI * 2) * corrugato;
      p.setXYZ(i, p.getX(i) + n.getX(i) * k, p.getY(i) + n.getY(i) * k, p.getZ(i) + n.getZ(i) * k);
    }
    g.computeVertexNormals();
  }
  pezzi.push(pezzo(g, cella));
}

function anello(pezzi, centro, normale, raggio, spessore, cella, scala = v3(1, 1, 1), lati = 28) {
  const g = new THREE.TorusGeometry(raggio, spessore, 8, lati).rotateX(Math.PI / 2).scale(scala.x, scala.y, scala.z);
  pezzi.push(pezzo(g, cella, verso(centro, normale)));
}

function borchie(pezzi, centro, raggio, quante, raggioBorchia, cella, { scala = v3(1, 1, 1), normale = SU } = {}) {
  const n = normale.clone().normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(SU, n);
  for (let i = 0; i < quante; i++) {
    const a = (i / quante) * Math.PI * 2;
    const p = v3(Math.cos(a) * raggio * scala.x, 0, Math.sin(a) * raggio * scala.z).applyQuaternion(q).add(centro);
    pezzi.push(pezzo(new THREE.SphereGeometry(raggioBorchia, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2), cella, verso(p, n)));
  }
}

const TESTA_ZOMBIE = Object.freeze({ centro: v3(0, 1.665, 0.02), raggio: 0.1, occhi: [v3(0.033, 1.67, 0.112), v3(-0.033, 1.67, 0.112)] });
const BUSTO_ZOMBIE = Object.freeze({ spallaS: v3(0.17, 1.43, -0.02), spallaD: v3(-0.17, 1.43, -0.02), petto: v3(0, 1.3, 0.12), schiena: v3(0, 1.32, -0.13) });

function geometrieAnfibio(corpo, testa, busto) {
  const caso = generatore(101);
  const t = [];
  cirripedi(t, TESTA_ZOMBIE.centro, TESTA_ZOMBIE.raggio * 0.98, v3(0.55, 0.7, -0.45), 0.5, 16, 0.007, 0.017, caso);
  cirripedi(t, TESTA_ZOMBIE.centro, TESTA_ZOMBIE.raggio * 0.96, v3(-0.75, 0.2, -0.3), 0.3, 7, 0.006, 0.012, caso);
  coralloRamificato(t, v3(-0.05, 1.75, 0.0), v3(-0.5, 1, 0.1), 0.032, C.CORALLO_CIANO, caso);
  coralloRamificato(t, v3(0.02, 1.76, -0.06), v3(0.3, 1, -0.5), 0.026, C.CORALLO_GIALLO, caso);
  coralloRamificato(t, v3(0.07, 1.72, -0.05), v3(0.9, 0.6, -0.2), 0.022, C.CORALLO_CIANO, caso, 1);
  occhi(t, TESTA_ZOMBIE.occhi, 0.0125, CAMPIONE.CIANO);
  alga(t, v3(0.085, 1.7, -0.02), 0.24, 0.022, 0.4, 0.05);
  alga(t, v3(-0.06, 1.74, -0.07), 0.2, 0.018, 2.1, -0.04);

  const b = [];
  const { spallaS, spallaD } = BUSTO_ZOMBIE;
  for (let k = 0; k < 3; k++) {
    const r = 0.1 + k * 0.009;
    const lama = new THREE.SphereGeometry(r, 22, 6, 0, Math.PI * 2, k * 0.36, 0.5);
    const m = m4(spallaS.x - 0.02, spallaS.y - 0.04 - k * 0.006, spallaS.z, 0, 0, -0.72, 1, 0.82, 1.15);
    b.push(...dueFacce(pezzo(lama, C.RUGGINE, m)));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const th = k * 0.36 + 0.46;
      const p = v3(Math.sin(th) * Math.cos(a) * r, Math.cos(th) * r, Math.sin(th) * Math.sin(a) * r).applyMatrix4(m);
      b.push(pezzo(new THREE.SphereGeometry(0.0045, 6, 4), C.FERRO, m4(p.x, p.y, p.z)));
    }
  }
  cirripedi(b, spallaD.clone().add(v3(0.03, -0.03, 0)), 0.075, v3(-0.45, 0.9, 0.05), 0.6, 20, 0.008, 0.02, caso);
  cirripedi(b, v3(0, 1.3, 0), 0.135, v3(0.25, 0.25, -1), 0.45, 14, 0.008, 0.018, caso);
  cirripedi(b, v3(0, 1.28, 0), 0.12, v3(-0.4, 0.1, 1), 0.3, 6, 0.006, 0.012, caso);
  coralloRamificato(b, spallaD.clone().add(v3(0, 0.05, -0.02)), v3(-0.4, 1, -0.1), 0.05, C.CORALLO_CIANO, caso);
  coralloRamificato(b, v3(-0.06, 1.42, -0.12), v3(-0.2, 0.7, -0.8), 0.045, C.CORALLO_GIALLO, caso);
  coralloRamificato(b, v3(0.07, 1.36, -0.14), v3(0.3, 0.4, -1), 0.04, C.CORALLO_CIANO, caso);
  coralloRamificato(b, v3(-0.08, 1.36, 0.1), v3(-0.3, 0.5, 1), 0.03, C.CORALLO_GIALLO, caso, 1);
  for (const [x, y, z, l, g] of [[0.2, 1.39, 0.03, 0.34, 0.3], [0.21, 1.39, -0.06, 0.28, 2.2], [-0.12, 1.42, 0.07, 0.42, 1.2], [-0.2, 1.38, -0.04, 0.3, 4], [0.05, 1.4, -0.13, 0.48, 3.3], [-0.06, 1.35, 0.12, 0.36, 5.1]]) alga(b, v3(x, y, z), l, 0.026, g, 0.06);
  return {
    testa: nelloSpazioOsso(t, matriceOsso(corpo, testa, UNITA_ZOMBIE)),
    busto: nelloSpazioOsso(b, matriceOsso(corpo, busto, UNITA_ZOMBIE)),
  };
}

const TESTA_MAGRO = Object.freeze({ centro: v3(0, 1.94, 0.04), occhi: [v3(0.04, 1.958, 0.198), v3(-0.04, 1.958, 0.198)] });

function geometrieSommozzatore(corpo, testa, petto) {
  const caso = generatore(202);
  const t = [];
  const maschera = m4(0, 1.952, 0.192, -0.12, 0, 0, 1.55, 1, 1);
  const vetro = new THREE.SphereGeometry(0.07, 20, 10, 0, Math.PI * 2, 0, 0.62).rotateX(Math.PI / 2).translate(0, 0, -0.06);
  t.push(pezzo(vetro, C.VETRO, maschera));
  t.push(pezzo(new THREE.TorusGeometry(0.043, 0.011, 8, 28), C.GOMMA, maschera));
  t.push(pezzo(new THREE.TorusGeometry(0.047, 0.005, 6, 28), C.ACCIAIO, maschera.clone().multiply(m4(0, 0, 0.006))));
  t.push(...dueFacce(pezzo(new THREE.CylinderGeometry(0.128, 0.128, 0.022, 26, 1, true).rotateX(-0.18), C.GOMMA, m4(0, 1.955, 0.035, 0, 0, 0, 1.02, 1, 1.27))));
  occhi(t, TESTA_MAGRO.occhi, 0.011, CAMPIONE.GIALLO);
  t.push(pezzo(new THREE.CylinderGeometry(0.022, 0.026, 0.05, 12).rotateX(Math.PI / 2), C.GOMMA, m4(0, 1.84, 0.2)));
  t.push(pezzo(new THREE.CylinderGeometry(0.016, 0.016, 0.02, 10).rotateX(Math.PI / 2), C.ACCIAIO, m4(0, 1.84, 0.23)));
  tubo(t, [v3(0, 1.84, 0.2), v3(-0.05, 1.82, 0.19), v3(-0.1, 1.79, 0.13), v3(-0.13, 1.76, 0.04)], 0.014, C.GOMMA, { corrugato: 0.0035, segmenti: 30 });
  spina(t, v3(0.03, 2.03, -0.06), v3(0.2, 0.8, -0.6), 0.09, 0.012, caso);
  spina(t, v3(-0.05, 2.0, -0.08), v3(-0.4, 0.6, -0.7), 0.07, 0.01, caso);
  spina(t, v3(0.08, 1.97, -0.07), v3(0.8, 0.5, -0.5), 0.06, 0.009, caso);

  const b = [];
  const brandello = (y, alto, rx, rz, da, ampiezza, cz) => {
    const g = new THREE.CylinderGeometry(1, 1, alto, 24, 4, true, da, ampiezza);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const sotto = p.getY(i) < -alto * 0.49;
      const sopra = p.getY(i) > alto * 0.49;
      const strappo = (sotto ? caso() * 0.7 : 0) + (sopra ? -caso() * 0.25 : 0);
      p.setY(i, p.getY(i) + strappo * alto);
    }
    g.computeVertexNormals();
    b.push(...dueFacce(pezzo(g, C.GOMMA, m4(0, y, cz, 0.28, 0, 0, rx, 1, rz))));
  };
  brandello(1.6, 0.16, 0.17, 0.2, -0.4, 2.6, -0.06);
  brandello(1.5, 0.12, 0.16, 0.19, 2.5, 2.4, -0.04);
  brandello(1.42, 0.1, 0.15, 0.17, 0.8, 1.9, -0.03);
  const bombola = m4(0, 1.55, -0.33, 0.3, 0, 0);
  b.push(pezzo(new THREE.CylinderGeometry(0.075, 0.075, 0.36, 18, 2), C.RUGGINE, bombola));
  b.push(pezzo(new THREE.SphereGeometry(0.075, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.RUGGINE, bombola.clone().multiply(m4(0, 0.18, 0))));
  b.push(pezzo(new THREE.SphereGeometry(0.075, 18, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), C.RUGGINE, bombola.clone().multiply(m4(0, -0.18, 0))));
  b.push(pezzo(new THREE.CylinderGeometry(0.02, 0.024, 0.05, 10), C.ACCIAIO, bombola.clone().multiply(m4(0, 0.27, 0))));
  b.push(pezzo(new THREE.TorusGeometry(0.03, 0.006, 6, 14).rotateX(Math.PI / 2), C.ACCIAIO, bombola.clone().multiply(m4(0, 0.3, 0))));
  for (const y of [-0.1, 0.1]) b.push(pezzo(new THREE.TorusGeometry(0.078, 0.007, 6, 22).rotateX(Math.PI / 2), C.GOMMA, bombola.clone().multiply(m4(0, y, 0))));
  for (const s of [-1, 1]) tubo(b, [v3(s * 0.05, 1.68, -0.36), v3(s * 0.13, 1.74, -0.2), v3(s * 0.17, 1.72, 0.0), v3(s * 0.15, 1.6, 0.1), v3(s * 0.08, 1.48, 0.12)], 0.009, C.GOMMA, { lati: 6 });
  tubo(b, [v3(0, 1.8, -0.25), v3(-0.08, 1.84, -0.2), v3(-0.14, 1.81, -0.08), v3(-0.13, 1.76, 0.03)], 0.014, C.GOMMA, { corrugato: 0.0035, segmenti: 30 });
  for (const [x, y, z, dx, dy, dz, l] of [[0.1, 1.68, -0.25, 0.4, 0.7, -0.6, 0.12], [-0.12, 1.66, -0.24, -0.5, 0.6, -0.6, 0.1], [0.04, 1.58, -0.29, 0.2, 0.3, -1, 0.09], [-0.06, 1.48, -0.27, -0.2, -0.1, -1, 0.08], [0.17, 1.72, -0.12, 0.7, 0.7, -0.1, 0.08], [-0.18, 1.72, -0.12, -0.7, 0.7, -0.1, 0.09], [0.13, 1.52, -0.21, 0.8, 0.1, -0.6, 0.07]]) spina(b, v3(x, y, z), v3(dx, dy, dz), l, l * 0.14, caso);
  return {
    testa: nelloSpazioOsso(t, matriceOsso(corpo, testa, UNITA_MAGRO)),
    busto: nelloSpazioOsso(b, matriceOsso(corpo, petto, UNITA_MAGRO)),
  };
}

function geometrieElettrico(corpo, testa, busto) {
  const caso = generatore(303);
  const t = [];
  occhi(t, TESTA_ZOMBIE.occhi, 0.013, CAMPIONE.CIANO);
  for (const [a, b] of [[0.3, 0.9], [2.2, 0.6]]) {
    const punti = [];
    for (let k = 0; k <= 8; k++) {
      const f = k / 8;
      const ang = a + f * 2.2;
      punti.push(v3(Math.cos(ang) * 0.098, 1.7 + Math.sin(f * Math.PI) * 0.05 * b, Math.sin(ang) * 0.098 * 0.9 + 0.01));
    }
    tubo(t, punti, 0.0035, C.RAME, { segmenti: 20, lati: 5 });
  }
  const b = [];
  for (let k = 0; k < 3; k++) {
    const punti = [];
    for (let i = 0; i <= 26; i++) {
      const a = (i / 26) * Math.PI * 2 + k;
      punti.push(v3(Math.cos(a) * (0.165 + caso() * 0.006), 1.22 + k * 0.07 + Math.sin(a * 2 + k) * 0.025, Math.sin(a) * 0.15 - 0.005));
    }
    tubo(b, punti, 0.006, C.RAME, { segmenti: 60, lati: 6 });
  }
  for (const [x, y, z] of [[0.17, 1.24, 0.03], [-0.16, 1.36, -0.06], [0.02, 1.37, 0.15]]) {
    b.push(pezzo(new THREE.SphereGeometry(0.012, 8, 6), C.CAMPIONI, m4(x, y, z), CAMPIONE.LAMPO));
  }
  const scatola = m4(0.02, 1.3, -0.165, 0.12, 0, 0.1);
  b.push(pezzo(new THREE.BoxGeometry(0.15, 0.11, 0.05, 2, 2, 1), C.RUGGINE, scatola));
  b.push(pezzo(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 8).rotateX(Math.PI / 2), C.CAMPIONI, scatola.clone().multiply(m4(-0.04, 0.02, -0.03)), CAMPIONE.LAMPO));
  b.push(pezzo(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 8).rotateX(Math.PI / 2), C.CAMPIONI, scatola.clone().multiply(m4(0.03, 0.02, -0.03)), CAMPIONE.LAMPO));
  b.push(pezzo(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 6), C.ACCIAIO, scatola.clone().multiply(m4(0.05, 0.08, 0))));
  return {
    testa: nelloSpazioOsso(t, matriceOsso(corpo, testa, UNITA_ZOMBIE)),
    busto: nelloSpazioOsso(b, matriceOsso(corpo, busto, UNITA_ZOMBIE)),
  };
}

const ELMO = Object.freeze({ centro: v3(0, 1.672, 0.012), raggio: 0.168 });

function geometrieElmo() {
  const t = [];
  const { centro, raggio } = ELMO;
  const cupola = new THREE.SphereGeometry(raggio, 56, 36, 0, Math.PI * 2, 0, Math.PI * 0.8);
  t.push(...dueFacce(pezzo(cupola, C.OTTONE, m4(centro.x, centro.y, centro.z, 0, 0, 0, 1, 1.03, 1.06))));
  const sulla = (dir, extra = 0) => {
    const d = dir.clone().normalize();
    return centro.clone().add(v3(d.x * (raggio + extra), d.y * (raggio + extra) * 1.03, d.z * (raggio + extra) * 1.06));
  };
  const oblo = (dir, r, cella, sotto, grata) => {
    const d = dir.clone().normalize();
    const p = sulla(d, 0.004);
    const piu = (k) => p.clone().addScaledVector(d, k);
    t.push(pezzo(new THREE.CylinderGeometry(r * 1.18, r * 1.32, 0.03, 32, 1, true), C.OTTONE, verso(piu(0.01), d)));
    anello(t, piu(0.027), d, r * 1.08, r * 0.2, C.OTTONE, v3(1, 1, 1), 36);
    anello(t, piu(0.016), d, r * 1.3, r * 0.1, C.OTTONE, v3(1, 1, 1), 36);
    t.push(pezzo(new THREE.CircleGeometry(r, 32).rotateX(-Math.PI / 2), cella, verso(piu(0.018), d), sotto));
    borchie(t, piu(0.03), r * 1.08, 8, r * 0.13, C.OTTONE, { normale: d });
    if (!grata) return;
    const q = new THREE.Quaternion().setFromUnitVectors(SU, d);
    for (const k of [-0.5, 0, 0.5]) {
      const barra = new THREE.CylinderGeometry(r * 0.07, r * 0.07, 2 * r * Math.sqrt(1 - k * k) * 1.04, 8);
      const m = new THREE.Matrix4().compose(piu(0.034).add(v3(k * r, 0, 0).applyQuaternion(q)), q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))), v3(1, 1, 1));
      t.push(pezzo(barra, C.OTTONE, m));
    }
    const traverso = new THREE.CylinderGeometry(r * 0.06, r * 0.06, 2 * r * 1.02, 8);
    t.push(pezzo(traverso, C.OTTONE, new THREE.Matrix4().compose(piu(0.036), q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2))), v3(1, 1, 1))));
  };
  oblo(v3(0, 0.05, 1), 0.075, C.LUCE_ROSSA, -1, false);
  oblo(v3(1, 0.06, 0.18), 0.052, C.LUCE_ROSSA, -1, true);
  oblo(v3(-1, 0.06, 0.18), 0.052, C.LUCE_ROSSA, -1, true);
  oblo(v3(0, 1, 0.75), 0.04, C.VETRO, -1, false);
  const fronte = sulla(v3(0, 0.05, 1), 0.04);
  t.push(pezzo(new THREE.CylinderGeometry(0.012, 0.012, 0.05, 10), C.OTTONE, m4(fronte.x + 0.095, fronte.y, fronte.z - 0.02)));
  t.push(pezzo(new THREE.BoxGeometry(0.03, 0.012, 0.03), C.OTTONE, m4(fronte.x - 0.1, fronte.y, fronte.z - 0.015)));
  t.push(pezzo(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 6).rotateZ(Math.PI / 2), C.ACCIAIO, m4(fronte.x - 0.1, fronte.y + 0.012, fronte.z - 0.015)));
  for (let fila = 0; fila < 2; fila++) {
    const y = centro.y - raggio * (0.62 - fila * 0.22);
    const rr = Math.sqrt(1 - ((y - centro.y) / (raggio * 1.03)) ** 2) * raggio;
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + fila * 0.1;
      const d = v3(Math.cos(a), (y - centro.y) / raggio, Math.sin(a) * 1.06);
      const p = v3(centro.x + Math.cos(a) * rr, y, centro.z + Math.sin(a) * rr * 1.06);
      t.push(pezzo(new THREE.SphereGeometry(0.0065, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), C.OTTONE, verso(p, d)));
    }
  }
  for (let i = 1; i < 14; i++) {
    const a = -0.35 + (i / 14) * Math.PI * 0.95;
    const d = v3(0, Math.sin(a), -Math.cos(a));
    t.push(pezzo(new THREE.SphereGeometry(0.0065, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), C.OTTONE, verso(sulla(d), d)));
  }
  const base = centro.y - raggio * 0.83;
  anello(t, v3(centro.x, base, centro.z), SU, raggio * 0.6, 0.02, C.OTTONE, v3(1, 1.4, 1.08), 40);
  borchie(t, v3(centro.x, base + 0.012, centro.z), raggio * 0.6, 12, 0.012, C.OTTONE, { scala: v3(1, 1, 1.08) });
  const collo = sulla(v3(-0.25, 0.25, -1), 0);
  tubo(t, [collo, collo.clone().add(v3(-0.01, 0.02, -0.05)), collo.clone().add(v3(-0.02, -0.02, -0.1)), collo.clone().add(v3(-0.02, -0.07, -0.11))], 0.02, C.OTTONE, { segmenti: 16, lati: 12 });
  t.push(pezzo(new THREE.CylinderGeometry(0.026, 0.026, 0.024, 6), C.OTTONE, m4(collo.x - 0.02, collo.y - 0.075, collo.z - 0.11)));
  const valvola = sulla(v3(-0.82, -0.25, 0.5), 0);
  t.push(pezzo(new THREE.CylinderGeometry(0.018, 0.022, 0.05, 12).rotateZ(Math.PI / 2), C.OTTONE, m4(valvola.x - 0.02, valvola.y, valvola.z)));
  t.push(pezzo(new THREE.CylinderGeometry(0.026, 0.026, 0.012, 14).rotateZ(Math.PI / 2), C.OTTONE, m4(valvola.x - 0.045, valvola.y, valvola.z)));
  anello(t, sulla(v3(0, 1, -0.15), 0.012), v3(0, 0.2, -1), 0.02, 0.006, C.OTTONE);
  t.push(pezzo(new THREE.SphereGeometry(raggio * 0.995, 24, 12, 0, Math.PI * 2, Math.PI * 0.79, Math.PI * 0.2), C.FERRO, m4(centro.x, centro.y, centro.z, 0, 0, 0, 1, 1.03, 1.06)));
  return t;
}

function geometrieCorsaletto() {
  const caso = generatore(505);
  const b = [];
  const profilo = [];
  for (let i = 0; i <= 14; i++) {
    const f = i / 14;
    profilo.push(new THREE.Vector2(0.115 + f * 0.135, 0.08 - f * 0.06 - f * f * 0.16));
  }
  const corsaletto = m4(0, 1.47, -0.005, 0, 0, 0, 1.14, 1, 0.92);
  b.push(...dueFacce(pezzo(new THREE.LatheGeometry(profilo, 48), C.PIASTRA, corsaletto)));
  const orlo = profilo[profilo.length - 1];
  b.push(pezzo(new THREE.TorusGeometry(orlo.x, 0.012, 8, 56).rotateX(Math.PI / 2), C.OTTONE, corsaletto.clone().multiply(m4(0, orlo.y, 0))));
  b.push(pezzo(new THREE.TorusGeometry(0.118, 0.014, 8, 40).rotateX(Math.PI / 2), C.OTTONE, corsaletto.clone().multiply(m4(0, 0.08, 0))));
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r = orlo.x - 0.02;
    const p = v3(Math.cos(a) * r, orlo.y + 0.018, Math.sin(a) * r).applyMatrix4(corsaletto);
    const n = v3(Math.cos(a) * 0.5, 0.85, Math.sin(a) * 0.5);
    b.push(pezzo(new THREE.SphereGeometry(0.009, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2), C.OTTONE, verso(p, n)));
  }
  for (const a of [0.5, Math.PI - 0.5, Math.PI + 0.5, -0.5]) {
    const p = v3(Math.cos(a) * 0.2, 0.05, Math.sin(a) * 0.2).applyMatrix4(corsaletto);
    b.push(pezzo(new THREE.CylinderGeometry(0.006, 0.006, 0.05, 6), C.ACCIAIO, m4(p.x, p.y + 0.02, p.z)));
    b.push(pezzo(new THREE.BoxGeometry(0.05, 0.016, 0.008), C.OTTONE, m4(p.x, p.y + 0.045, p.z, 0, a, 0)));
  }
  const piastra = (z, segno) => {
    const g = new THREE.BoxGeometry(0.24, 0.17, 0.04, 4, 4, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      p.setZ(i, p.getZ(i) - (x * x) * 1.6 * segno + caso() * 0.002);
      if (y < 0) p.setX(i, x * (1 - (-y / 0.085) * 0.25));
    }
    g.computeVertexNormals();
    b.push(pezzo(g, C.PIOMBO, m4(0, 1.23, z, segno * 0.12, 0, 0)));
    for (const x of [-0.08, 0.08]) b.push(pezzo(new THREE.CylinderGeometry(0.007, 0.007, 0.14, 6), C.FERRO, m4(x, 1.35, z - segno * 0.005, segno * 0.15, 0, 0)));
  };
  piastra(0.17, 1);
  b.push(pezzo(new THREE.TorusGeometry(0.168, 0.016, 8, 40).rotateX(Math.PI / 2), C.GOMMA, m4(0, 1.02, -0.005, 0, 0, 0, 1, 1, 0.82)));
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * 0.12 + (i / 8) * Math.PI * 0.76;
    b.push(pezzo(new THREE.BoxGeometry(0.06, 0.06, 0.035, 2, 2, 1), C.PIOMBO, m4(Math.cos(a) * 0.175, 1.02, Math.sin(a) * 0.15 - 0.005, 0, Math.PI / 2 - a, 0)));
  }
  for (const s of [-1, 1]) {
    const bombola = m4(s * 0.095, 1.21, -0.3, -0.06, 0, s * 0.04);
    b.push(pezzo(new THREE.CylinderGeometry(0.082, 0.082, 0.46, 28, 3), C.RAME, bombola));
    b.push(pezzo(new THREE.SphereGeometry(0.082, 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), C.RAME, bombola.clone().multiply(m4(0, 0.23, 0))));
    b.push(pezzo(new THREE.SphereGeometry(0.082, 28, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), C.RAME, bombola.clone().multiply(m4(0, -0.23, 0))));
    for (const y of [-0.15, 0.12]) b.push(pezzo(new THREE.TorusGeometry(0.085, 0.008, 6, 30).rotateX(Math.PI / 2), C.OTTONE, bombola.clone().multiply(m4(0, y, 0))));
    b.push(pezzo(new THREE.CylinderGeometry(0.02, 0.026, 0.05, 12), C.OTTONE, bombola.clone().multiply(m4(0, 0.33, 0))));
    b.push(pezzo(new THREE.TorusGeometry(0.032, 0.006, 6, 16).rotateX(Math.PI / 2), C.OTTONE, bombola.clone().multiply(m4(0, 0.36, 0))));
    b.push(pezzo(new THREE.CylinderGeometry(0.024, 0.024, 0.016, 16).rotateX(Math.PI / 2), C.OTTONE, bombola.clone().multiply(m4(0, 0.31, -0.03))));
    b.push(pezzo(new THREE.CircleGeometry(0.019, 16), C.CAMPIONI, bombola.clone().multiply(m4(0, 0.31, -0.0385, 0, Math.PI, 0)), CAMPIONE.AMBRA));
    b.push(pezzo(new THREE.SphereGeometry(0.011, 8, 6), C.CAMPIONI, bombola.clone().multiply(m4(s * 0.035, 0.34, 0)), CAMPIONE.AMBRA));
  }
  b.push(pezzo(new THREE.CylinderGeometry(0.014, 0.014, 0.2, 10).rotateZ(Math.PI / 2), C.OTTONE, m4(0, 1.535, -0.31)));
  tubo(b, [v3(0, 1.535, -0.31), v3(-0.05, 1.6, -0.3), v3(-0.07, 1.66, -0.24), v3(-0.065, 1.64, -0.19)], 0.024, C.GOMMA, { corrugato: 0.005, segmenti: 30, lati: 10 });
  for (const s of [-1, 1]) {
    tubo(b, [v3(s * 0.12, 1.43, 0.13), v3(s * 0.16, 1.47, 0.0), v3(s * 0.13, 1.43, -0.18), v3(s * 0.1, 1.33, -0.24)], 0.008, C.GOMMA, { lati: 5, segmenti: 16 });
    tubo(b, [v3(s * 0.155, 1.12, -0.28), v3(s * 0.17, 1.12, -0.1), v3(s * 0.1, 1.12, 0.12)], 0.007, C.GOMMA, { lati: 5, segmenti: 14 });
  }
  return b;
}

function geometrieArpione() {
  const b = [];
  const asse = (x0, x1, y, z, r, cella, lati = 16) => {
    b.push(pezzo(new THREE.CylinderGeometry(r, r, Math.abs(x1 - x0), lati, 2).rotateZ(Math.PI / 2), cella, m4((x0 + x1) / 2, y, z)));
  };
  const y = 1.505;
  const z = -0.07;
  asse(-0.5, -1.0, y, z, 0.021, C.ACCIAIO);
  asse(-0.52, -0.8, y - 0.04, z, 0.026, C.OTTONE);
  b.push(pezzo(new THREE.SphereGeometry(0.026, 14, 8), C.OTTONE, m4(-0.8, y - 0.04, z)));
  b.push(pezzo(new THREE.BoxGeometry(0.2, 0.05, 0.07, 3, 1, 2), C.ACCIAIO, m4(-0.6, y - 0.02, z)));
  for (const x of [-0.53, -0.66]) b.push(pezzo(new THREE.TorusGeometry(0.06, 0.011, 8, 20).rotateY(Math.PI / 2), C.FERRO, m4(x, 1.434, -0.076, 0, 0, 0, 1, 1.15, 1)));
  for (const x of [-0.98, -0.92]) b.push(pezzo(new THREE.TorusGeometry(0.025, 0.006, 6, 16).rotateY(Math.PI / 2), C.OTTONE, m4(x, y, z)));
  asse(-1.0, -1.1, y, z, 0.007, C.ACCIAIO, 8);
  b.push(pezzo(new THREE.ConeGeometry(0.018, 0.08, 10).rotateZ(Math.PI / 2), C.ACCIAIO, m4(-1.14, y, z)));
  for (const a of [0, 2.1, 4.2]) b.push(pezzo(new THREE.ConeGeometry(0.008, 0.05, 5).rotateZ(-Math.PI / 2 + 0.6), C.ACCIAIO, m4(-1.1, y + Math.cos(a) * 0.012, z + Math.sin(a) * 0.012, a, 0, 0)));
  b.push(pezzo(new THREE.BoxGeometry(0.03, 0.06, 0.02), C.ACCIAIO, m4(-0.62, y - 0.06, z + 0.03)));
  const catena = [];
  for (let i = 0; i <= 18; i++) {
    const f = i / 18;
    catena.push(v3(-0.97 + f * 0.42, y - 0.02 - Math.sin(f * Math.PI) * 0.17, z + 0.035 + Math.sin(f * Math.PI) * 0.02));
  }
  for (let i = 0; i < catena.length - 1; i++) {
    const a = catena[i];
    const c = catena[i + 1];
    const centro = a.clone().add(c).multiplyScalar(0.5);
    const d = c.clone().sub(a);
    const m = verso(centro, d, 1, i % 2 ? Math.PI / 2 : 0);
    b.push(pezzo(new THREE.TorusGeometry(0.012, 0.0035, 5, 10).scale(0.7, 1.35, 1), C.FERRO, m));
  }
  return b;
}

function geometrieStivale() {
  const b = [];
  const suola = new THREE.BoxGeometry(0.15, 0.05, 0.36, 3, 1, 6);
  const p = suola.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const z = p.getZ(i);
    const punta = Math.max(0, (z - 0.1) / 0.08);
    p.setX(i, p.getX(i) * (1 - punta * 0.25));
    if (p.getY(i) > 0) p.setY(i, p.getY(i) + punta * 0.006);
  }
  suola.computeVertexNormals();
  b.push(pezzo(suola, C.PIOMBO, m4(0.1, 0.025, 0.025)));
  b.push(pezzo(new THREE.SphereGeometry(0.068, 18, 10, 0, Math.PI, 0, Math.PI / 2), C.OTTONE, m4(0.1, 0.05, 0.11, 0, 0, 0, 1, 0.95, 1.25)));
  b.push(pezzo(new THREE.CylinderGeometry(0.066, 0.07, 0.16, 20, 2), C.GOMMA, m4(0.1, 0.12, -0.04, 0.05, 0, 0, 1, 1, 1.1)));
  b.push(pezzo(new THREE.BoxGeometry(0.13, 0.07, 0.17, 2, 2, 2), C.GOMMA, m4(0.1, 0.075, 0.04)));
  for (const y of [0.08, 0.15]) b.push(pezzo(new THREE.TorusGeometry(0.071, 0.009, 6, 22).rotateX(Math.PI / 2), C.FERRO, m4(0.1, y, -0.04, 0.05, 0, 0, 1, 1, 1.1)));
  b.push(pezzo(new THREE.BoxGeometry(0.03, 0.025, 0.012), C.OTTONE, m4(0.17, 0.115, -0.03)));
  return b;
}

function geometriePalombaro(corpo, testa, busto) {
  const avambraccio = trovaOsso(corpo, /RightForeArm$/i);
  const piedeS = trovaOsso(corpo, /LeftFoot$/i);
  const piedeD = trovaOsso(corpo, /RightFoot$/i);
  const stivale = geometrieStivale();
  const destro = stivale.map(g => specchiaX(g));
  return {
    testa: nelloSpazioOsso(geometrieElmo(), matriceOsso(corpo, testa, UNITA_ZOMBIE)),
    busto: nelloSpazioOsso(geometrieCorsaletto(), matriceOsso(corpo, busto, UNITA_ZOMBIE)),
    arpione: avambraccio ? nelloSpazioOsso(geometrieArpione(), matriceOsso(corpo, avambraccio, UNITA_ZOMBIE)) : null,
    piedeS: piedeS ? nelloSpazioOsso(stivale, matriceOsso(corpo, piedeS, UNITA_ZOMBIE)) : null,
    piedeD: piedeD ? nelloSpazioOsso(destro, matriceOsso(corpo, piedeD, UNITA_ZOMBIE)) : null,
  };
}

function texturaVene() {
  const tela = document.createElement('canvas');
  tela.width = tela.height = 512;
  const ctx = tela.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#fff';
  ctx.lineCap = 'round';
  ctx.shadowColor = '#9fe8ff';
  ctx.shadowBlur = 3;
  for (const tratto of tracciatiVene()) {
    ctx.lineWidth = tratto.spessore;
    ctx.beginPath();
    tratto.punti.forEach(([u, v], i) => (i ? ctx.lineTo(u * 512, (1 - v) * 512) : ctx.moveTo(u * 512, (1 - v) * 512)));
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

let tracciati = null;
function tracciatiVene() {
  if (tracciati) return tracciati;
  const caso = generatore(606);
  tracciati = [];
  const ramo = (u, v, angolo, passi, spessore, livello) => {
    const punti = [[u, v]];
    for (let i = 0; i < passi; i++) {
      angolo += (caso() - 0.5) * 1.1;
      u += Math.cos(angolo) * 0.012;
      v += Math.sin(angolo) * 0.012;
      if (u < 0 || u > 1 || v < 0 || v > 1) break;
      punti.push([u, v]);
      if (livello > 0 && caso() < 0.14) ramo(u, v, angolo + (caso() < 0.5 ? 0.9 : -0.9), Math.floor(passi * 0.5), spessore * 0.65, livello - 1);
    }
    tracciati.push({ punti, spessore });
  };
  for (let i = 0; i < 30; i++) ramo(caso(), caso(), caso() * Math.PI * 2, 8 + Math.floor(caso() * 12), 1.6, 2);
  return tracciati;
}

const geometrieVene = new WeakMap();
function sottoinsiemeVene(geometria) {
  if (geometrieVene.has(geometria)) return geometrieVene.get(geometria);
  const griglia = 96;
  const pieno = new Uint8Array(griglia * griglia);
  for (const { punti } of tracciatiVene()) {
    for (let i = 0; i < punti.length; i++) {
      const [u, v] = punti[i];
      const gx = Math.floor(u * griglia);
      const gy = Math.floor(v * griglia);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const x = gx + dx;
        const y = gy + dy;
        if (x >= 0 && y >= 0 && x < griglia && y < griglia) pieno[y * griglia + x] = 1;
      }
    }
  }
  const uv = geometria.attributes.uv;
  const indice = geometria.index;
  const conta = indice ? indice.count : geometria.attributes.position.count;
  const tenuti = [];
  const prendi = k => (indice ? indice.getX(k) : k);
  for (let t = 0; t < conta; t += 3) {
    const a = prendi(t);
    const b = prendi(t + 1);
    const c = prendi(t + 2);
    const u0 = Math.min(uv.getX(a), uv.getX(b), uv.getX(c));
    const u1 = Math.max(uv.getX(a), uv.getX(b), uv.getX(c));
    const v0 = Math.min(uv.getY(a), uv.getY(b), uv.getY(c));
    const v1 = Math.max(uv.getY(a), uv.getY(b), uv.getY(c));
    let si = false;
    for (let y = Math.max(0, Math.floor(v0 * griglia)); !si && y <= Math.min(griglia - 1, Math.floor(v1 * griglia)); y++) {
      for (let x = Math.max(0, Math.floor(u0 * griglia)); x <= Math.min(griglia - 1, Math.floor(u1 * griglia)); x++) {
        if (pieno[y * griglia + x]) {
          si = true;
          break;
        }
      }
    }
    if (si) tenuti.push(a, b, c);
  }
  const g = new THREE.BufferGeometry();
  for (const [nome, attributo] of Object.entries(geometria.attributes)) g.setAttribute(nome, attributo);
  g.setIndex(tenuti);
  g.boundingSphere = geometria.boundingSphere?.clone() ?? null;
  geometrieVene.set(geometria, g);
  return g;
}

function aggiungiVene(corpo) {
  let pelle = null;
  let migliore = 0;
  corpo.traverse(o => {
    if (!o.isSkinnedMesh || o.name === 'veneAbisso') return;
    const n = o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count;
    const corpoPelle = /body/i.test([].concat(o.material)[0]?.name ?? '');
    const punteggio = n * (corpoPelle ? 4 : 1);
    if (punteggio > migliore) {
      migliore = punteggio;
      pelle = o;
    }
  });
  if (!pelle?.geometry.attributes.uv) return;
  const overlay = new THREE.SkinnedMesh(sottoinsiemeVene(pelle.geometry), materialiCreature().vene);
  overlay.name = 'veneAbisso';
  overlay.position.copy(pelle.position);
  overlay.quaternion.copy(pelle.quaternion);
  overlay.scale.copy(pelle.scale);
  overlay.bind(pelle.skeleton, pelle.bindMatrix);
  overlay.boundingSphere = pelle.boundingSphere?.clone() ?? null;
  overlay.frustumCulled = pelle.frustumCulled;
  overlay.renderOrder = 2;
  pelle.parent.add(overlay);
}

function creaGruppoArchi(definizioni) {
  const archi = definizioni.length;
  const vertici = archi * PUNTI_ARCO * 4;
  const posizioni = new Float32Array(vertici * 3);
  const indici = [];
  for (let a = 0; a < archi; a++) {
    for (let nastro = 0; nastro < 2; nastro++) {
      for (let k = 0; k < PUNTI_ARCO - 1; k++) {
        const o = a * PUNTI_ARCO * 4 + nastro * 2 + k * 4;
        indici.push(o, o + 1, o + 4, o + 1, o + 5, o + 4);
      }
    }
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(posizioni, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(vertici * 3).fill(0.577), 3));
  geometria.setIndex(indici);
  return { geometria, definizioni, matrice: null };
}

const archi = {
  testa: creaGruppoArchi(Array.from({ length: 4 }, (_, i) => ({ centro: TESTA_ZOMBIE.centro, raggio: 0.115, quota: 0.02 - i * 0.025, salto: 1.1 + i * 0.3, larghezza: 0.0035 }))),
  busto: creaGruppoArchi(Array.from({ length: 8 }, (_, i) => ({ centro: v3(0, 1.3, 0), raggio: 0.19, quota: -0.12 + (i % 4) * 0.07, salto: 1.3 + (i % 3) * 0.45, larghezza: 0.005 }))),
  braccio: creaGruppoArchi(Array.from({ length: 3 }, (_, i) => ({ asse: true, raggio: 5.2, da: 2 + i * 6, a: 12 + i * 6, salto: 1.4 + i * 0.5, larghezza: 0.45 }))),
};

const temp = { a: v3(0, 0, 0), b: v3(0, 0, 0), t: v3(0, 0, 0), s: v3(0, 0, 0), u: v3(0, 0, 0), p: v3(0, 0, 0), punti: Array.from({ length: PUNTI_ARCO }, () => v3(0, 0, 0)) };

function rigeneraArchi(gruppo, caso) {
  if (!gruppo.matrice && !gruppo.definizioni[0].asse) return;
  const pos = gruppo.geometria.attributes.position.array;
  const { punti } = temp;
  gruppo.definizioni.forEach((d, indice) => {
    const spento = caso() < 0.3;
    const a0 = caso() * Math.PI * 2;
    const a1 = a0 + (caso() < 0.5 ? -1 : 1) * d.salto;
    for (let k = 0; k < PUNTI_ARCO; k++) {
      const f = k / (PUNTI_ARCO - 1);
      const gonfio = Math.sin(f * Math.PI);
      const scarto = (caso() - 0.5) * gonfio;
      if (d.asse) {
        const ang = a0 + (a1 - a0) * f;
        const r = d.raggio * (1 + gonfio * 0.5 + scarto * 0.6);
        punti[k].set(Math.cos(ang) * r, d.da + (d.a - d.da) * f + scarto * 3, Math.sin(ang) * r);
      } else {
        const ang = a0 + (a1 - a0) * f;
        const r = d.raggio * (1 + gonfio * 0.28 + scarto * 0.35);
        punti[k].set(d.centro.x + Math.cos(ang) * r, d.centro.y + d.quota + scarto * 0.06 + gonfio * (caso() - 0.5) * 0.05, d.centro.z + Math.sin(ang) * r * 0.85);
        punti[k].applyMatrix4(gruppo.matrice);
      }
      if (spento) punti[k].copy(punti[0]);
    }
    const scala = d.asse ? 1 : gruppo.scala;
    for (let k = 0; k < PUNTI_ARCO; k++) {
      const prima = punti[Math.max(0, k - 1)];
      const dopo = punti[Math.min(PUNTI_ARCO - 1, k + 1)];
      temp.t.subVectors(dopo, prima).normalize();
      temp.s.crossVectors(temp.t, Math.abs(temp.t.y) < 0.9 ? SU : temp.a.set(1, 0, 0)).normalize();
      temp.u.crossVectors(temp.t, temp.s).normalize();
      const largo = d.larghezza * scala * (0.35 + Math.sin((k / (PUNTI_ARCO - 1)) * Math.PI) * 0.65);
      const o = (indice * PUNTI_ARCO * 4 + k * 4) * 3;
      for (const [j, lato, segno] of [[0, temp.s, 1], [1, temp.s, -1], [2, temp.u, 1], [3, temp.u, -1]]) {
        pos[o + j * 3] = punti[k].x + lato.x * largo * segno;
        pos[o + j * 3 + 1] = punti[k].y + lato.y * largo * segno;
        pos[o + j * 3 + 2] = punti[k].z + lato.z * largo * segno;
      }
    }
  });
  gruppo.geometria.attributes.position.needsUpdate = true;
}

function preparaArchi(corpo, testa, busto) {
  const scala = 1 / UNITA_ZOMBIE;
  if (!archi.testa.matrice) Object.assign(archi.testa, { matrice: matriceOsso(corpo, testa, UNITA_ZOMBIE), scala });
  if (!archi.busto.matrice) Object.assign(archi.busto, { matrice: matriceOsso(corpo, busto, UNITA_ZOMBIE), scala });
  const caso = Math.random;
  for (const g of Object.values(archi)) {
    rigeneraArchi(g, caso);
    g.geometria.boundingSphere = new THREE.Sphere(new THREE.Vector3(), RAGGIO_ARCHI);
  }
}

const geometrie = new Map();
function geometrieDi(tipo, fabbrica) {
  if (!geometrie.has(tipo)) geometrie.set(tipo, fabbrica());
  return geometrie.get(tipo);
}

export function decoraAnfibio(corpo, { testa, busto }) {
  if (!testa || !busto) return;
  const g = geometrieDi('anfibio', () => geometrieAnfibio(corpo, testa, busto));
  const m = materialiCreature().anfibio;
  attacca(testa, g.testa, m);
  attacca(busto, g.busto, m);
}

export function decoraSommozzatore(corpo, { testa, busto }) {
  if (!testa || !busto) return;
  const petto = trovaOsso(corpo, /^ribs$/i) ?? busto;
  const g = geometrieDi('sommozzatore', () => geometrieSommozzatore(corpo, testa, petto));
  const m = materialiCreature().sommozzatore;
  attacca(testa, g.testa, m);
  attacca(petto, g.busto, m);
}

export function decoraElettrico(corpo, { testa, busto }) {
  if (!testa || !busto) return;
  const g = geometrieDi('elettrico', () => geometrieElettrico(corpo, testa, busto));
  const mat = materialiCreature();
  attacca(testa, g.testa, mat.elettrico);
  attacca(busto, g.busto, mat.elettrico);
  if (!archi.testa.matrice) preparaArchi(corpo, testa, busto);
  attacca(testa, archi.testa.geometria, mat.archi).renderOrder = 3;
  attacca(busto, archi.busto.geometria, mat.archi).renderOrder = 3;
  for (const re of [/LeftForeArm$/i, /RightForeArm$/i]) {
    const osso = trovaOsso(corpo, re);
    if (osso) attacca(osso, archi.braccio.geometria, mat.archi).renderOrder = 3;
  }
  aggiungiVene(corpo);
}

export function decoraPalombaro(corpo, { testa, busto }) {
  if (!testa || !busto) return;
  const g = geometrieDi('palombaro', () => geometriePalombaro(corpo, testa, busto));
  const m = materialiCreature().palombaro;
  attacca(testa, g.testa, m);
  attacca(busto, g.busto, m);
  attacca(trovaOsso(corpo, /RightForeArm$/i), g.arpione, m);
  attacca(trovaOsso(corpo, /LeftFoot$/i), g.piedeS, m);
  attacca(trovaOsso(corpo, /RightFoot$/i), g.piedeD, m);
}

let ultimoArco = 0;
export function animaCreature(tempo, vista) {
  if (!materiali) return;
  const allarme = vista?.abisso?.protocollo && !vista.abisso.completata ? 1 : 0;
  const m = materiali;
  m.anfibio.emissiveIntensity = 1.7 + Math.sin(tempo * 1.9) * 0.55 + Math.sin(tempo * 5.3) * 0.15 + allarme * 0.5;
  m.sommozzatore.emissiveIntensity = 2.2 + Math.sin(tempo * 7.1) * 0.25 + (Math.sin(tempo * 23) > 0.96 ? -1.2 : 0);
  m.palombaro.emissiveIntensity = 2.1 + Math.sin(tempo * 1.4) * 0.6 + Math.max(0, Math.sin(tempo * 9.7)) * 0.25 + allarme * 0.6;
  const scatto = Math.random();
  m.elettrico.emissiveIntensity = 2.2 + scatto * 0.9;
  m.vene.emissiveIntensity = 1.1 + Math.sin(tempo * 13) * 0.35 + (scatto > 0.85 ? 1.2 : 0);
  m.archi.emissiveIntensity = 3.5 + scatto * 4;
  m.archi.opacity = 0.65 + scatto * 0.35;
  if (tempo - ultimoArco < ARCHI_OGNI && tempo >= ultimoArco) return;
  ultimoArco = tempo;
  if (!archi.testa.matrice) return;
  for (const g of Object.values(archi)) rigeneraArchi(g, Math.random);
}
