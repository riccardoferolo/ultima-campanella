import { bianco, campioni, filtra, gauss, caso, liscia, satura, alta, normalizza, sfuma } from './dsp.js';

export const VOCALI = Object.freeze({
  u: [320, 800, 2300, 3100],
  o: [470, 840, 2500, 3200],
  a: [720, 1100, 2450, 3400],
  e: [560, 1250, 2400, 3300],
  ae: [660, 1700, 2400, 3300],
  i: [300, 2200, 2950, 3600],
  r: [480, 1300, 1650, 3000],
});
const LARGHEZZE = Object.freeze([90, 120, 180, 260]);
const PESI = Object.freeze([1, 0.55, 0.3, 0.16]);
const APERTURA = 0.42;
const CHIUSURA = 0.16;
const SCALA_DERIVATA = 0.3;
const PERIODO_MINIMO = 6;
const valore = (v, x) => (typeof v === 'function' ? v(x) : v);

function formante(tappe, x, k) {
  if (x <= tappe[0][1]) return VOCALI[tappe[0][0]][k];
  for (let j = 1; j < tappe.length; j++) {
    if (x > tappe[j][1]) continue;
    const s = liscia((x - tappe[j - 1][1]) / Math.max(1e-6, tappe[j][1] - tappe[j - 1][1]));
    return VOCALI[tappe[j - 1][0]][k] * (1 - s) + VOCALI[tappe[j][0]][k] * s;
  }
  return VOCALI[tappe[tappe.length - 1][0]][k];
}

function flussoGlottale(fase) {
  if (fase < APERTURA) return 0.5 - 0.5 * Math.cos((Math.PI * fase) / APERTURA);
  if (fase < APERTURA + CHIUSURA) return Math.cos(((Math.PI / 2) * (fase - APERTURA)) / CHIUSURA);
  return 0;
}

function sorgente(n, sr, o) {
  const derivata = new Float32Array(n);
  const flusso = new Float32Array(n);
  let i = 0;
  let ciclo = 0;
  while (i < n) {
    const x = i / n;
    const frigge = Math.random() < valore(o.frittura, x);
    let f = valore(o.altezza, x) * (1 + o.tremolio * gauss());
    if (frigge) f *= caso(0.3, 0.55);
    const periodo = Math.max(PERIODO_MINIMO, Math.round(sr / Math.max(20, f)));
    let ampiezza = Math.max(0.05, 1 + o.scintillio * gauss());
    if (o.ruvidita > 0 && ciclo % 2 === 1) ampiezza *= 1 - o.ruvidita * caso(0.35, 0.8);
    if (frigge) ampiezza *= caso(0.5, 1.4);
    let prima = 0;
    for (let k = 0; k < periodo && i < n; k++, i++) {
      const v = ampiezza * flussoGlottale(k / periodo);
      flusso[i] = v;
      derivata[i] = (v - prima) * periodo * SCALA_DERIVATA;
      prima = v;
    }
    ciclo += 1;
  }
  return { derivata, flusso };
}

function eccitazione(n, o, s) {
  const e = new Float32Array(n);
  const sonoro = o.sonoro;
  for (let i = 0; i < n; i++) {
    const soffio = (Math.random() * 2 - 1) * o.respiro * (0.25 + s.flusso[i]);
    e[i] = sonoro * s.derivata[i] + soffio;
  }
  return e;
}

function rasp(n, sr, o, s) {
  const r = filtra(bianco(n), sr, 'banda', caso(1600, 2600), 1.2);
  for (let i = 0; i < n; i++) r[i] *= s.flusso[i] * o.ruvidita * 0.8;
  return r;
}

function tratto(n, sr, e, o, durata) {
  const out = new Float32Array(n);
  for (let k = 0; k < 4; k++) {
    const copia = e.slice();
    const freq = t => formante(o.tappe, t / durata, k) * o.tratto;
    filtra(copia, sr, 'banda', freq, t => freq(t) / (LARGHEZZE[k] * o.larghezza));
    const peso = PESI[k] * (k === 0 ? 1 : o.chiarezza);
    for (let i = 0; i < n; i++) out[i] += copia[i] * peso;
  }
  return out;
}

export function voce(sr, durata, opzioni) {
  const o = {
    altezza: 110, tappe: [['e', 0]], tratto: 1, larghezza: 1, chiarezza: 1, tremolio: 0.02, scintillio: 0.1,
    respiro: 0.2, ruvidita: 0, frittura: 0, sonoro: 1, satura: 0, forma: () => 1, ...opzioni,
  };
  const n = campioni(durata, sr);
  const s = sorgente(n, sr, o);
  const out = tratto(n, sr, eccitazione(n, o, s), o, durata);
  if (o.ruvidita > 0) {
    const r = rasp(n, sr, o, s);
    for (let i = 0; i < n; i++) out[i] += r[i];
  }
  for (let i = 0; i < n; i++) out[i] *= o.forma(i / n);
  if (o.satura > 0) satura(normalizza(out, 1), o.satura);
  alta(out, sr, 50);
  sfuma(out, sr, 0.003, 0.03);
  return normalizza(out, 0.9);
}

export const vibrato = (base, velocita, profondita) => {
  const fase = Math.random() * Math.PI * 2;
  return durata => x => base * (1 + profondita * Math.sin(fase + Math.PI * 2 * velocita * x * durata));
};
