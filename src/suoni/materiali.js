import {
  DUE_PI, caso, campioni, vuoto, bianco, rosa, marrone, lento, bassa, alta, filtra, inviluppa, percussione, gonfia,
  normalizza, mescola, scintilla, risuona, seghetta, pizzica, impulsi, tono, satura, liscia, picco,
} from './dsp.js';
import { voce } from './voce.js';

const PARZIALI_CAMPANA = Object.freeze([[0.5, 1, 0.45], [1, 0.8, 1], [1.19, 0.6, 0.5], [1.5, 0.45, 0.3], [2, 0.38, 0.65], [2.51, 0.25, 0.28], [2.66, 0.22, 0.2], [3.01, 0.18, 0.16], [4.16, 0.12, 0.09], [5.43, 0.08, 0.06]]);
const PARZIALI_CARILLON = Object.freeze([[1, 1, 1], [6.27, 0.14, 0.2], [17.55, 0.05, 0.06]]);
const PARZIALI_KALIMBA = Object.freeze([[1, 1, 1], [3.9, 0.14, 0.14], [9.1, 0.05, 0.05]]);
const PARZIALI_VETRO = Object.freeze([[1, 1, 1], [2.32, 0.55, 0.35], [4.25, 0.32, 0.18], [6.63, 0.2, 0.08]]);
const PARZIALI_LEGNO = Object.freeze([[1, 1, 1], [2.57, 0.55, 0.45], [4.4, 0.35, 0.2]]);
const FRAZIONE_TAU = 1 / 3;

export function modale(sr, f, durata, parziali, { durezza = 0.0006, battito = 0, tau = durata * FRAZIONE_TAU, morbidezza = 0 } = {}) {
  const modi = [];
  for (const [rapporto, frazione, ampiezza] of parziali) {
    modi.push([f * rapporto, tau * frazione, ampiezza]);
    if (battito > 0) modi.push([f * rapporto + caso(0.4, 1.6) * battito, tau * frazione, ampiezza * 0.6]);
  }
  return normalizza(risuona(scintilla(sr, durezza, morbidezza), sr, modi, durata), 0.9);
}

export const campana = (sr, f, durata) => modale(sr, f, durata, PARZIALI_CAMPANA, { battito: 1, durezza: 0.0009 });
export const carillon = (sr, f, durata) => modale(sr, f, durata, PARZIALI_CARILLON, { durezza: 0.0003 });
export const kalimba = (sr, f, durata) => modale(sr, f, durata, PARZIALI_KALIMBA, { durezza: 0.0012, morbidezza: 4000 });
export const vetro = (sr, f, durata) => modale(sr, f, durata, PARZIALI_VETRO, { battito: 0.8, durezza: 0.0002 });
export const legno = (sr, f, durata) => modale(sr, f, durata, PARZIALI_LEGNO, { durezza: 0.0005, tau: 0.04 });
export const arpa = (sr, f, durata) => normalizza(pizzica(sr, f, durata, { brillantezza: 0.45, smorzamento: 0.997 }), 0.9);
export const chitarra = (sr, f, durata) => normalizza(pizzica(sr, f, durata, { brillantezza: 0.7, smorzamento: 0.995 }), 0.9);

export function arpeggio(sr, note, { passo = 0.1, durata = 1, strumento = arpa, volume = 1, inizio = 0 } = {}) {
  const out = vuoto(inizio + passo * note.length + durata, sr);
  note.forEach((f, i) => mescola(out, strumento(sr, f, durata), sr, inizio + i * passo * caso(0.97, 1.03), volume * caso(0.85, 1)));
  return out;
}

export function archi(sr, f, durata, { attacco = 0.3, rilascio = 0.5, voci = 3, luminosita = 1800 } = {}) {
  const n = campioni(durata, sr);
  const out = new Float32Array(n);
  for (let v = 0; v < voci; v++) {
    const stonatura = 1 + caso(-0.005, 0.005);
    const velocita = caso(4.6, 5.8);
    const fase = Math.random() * DUE_PI;
    const s = seghetta(n, sr, t => f * stonatura * (1 + 0.004 * Math.sin(fase + DUE_PI * velocita * t) * liscia(t / 0.4)));
    for (let i = 0; i < n; i++) out[i] += s[i];
  }
  bassa(out, sr, luminosita, 2);
  const corpo = filtra(out.slice(), sr, 'banda', 420, 1.5);
  mescola(out, corpo, sr, 0, 0.8);
  inviluppa(out, sr, gonfia(attacco, durata, rilascio));
  return normalizza(out, 0.9);
}

export function coro(sr, f, durata, { vocale = 'a', voci = 3, attacco = 0.4, rilascio = 0.6 } = {}) {
  const out = vuoto(durata, sr);
  for (let v = 0; v < voci; v++) {
    const stonatura = 1 + caso(-0.006, 0.006);
    const velocita = caso(4.8, 5.8);
    const fase = Math.random() * DUE_PI;
    const canto = voce(sr, durata, {
      altezza: x => f * stonatura * (1 + 0.01 * Math.sin(fase + DUE_PI * velocita * x * durata)),
      tappe: [[vocale, 0], [vocale === 'a' ? 'o' : 'a', 1]], tremolio: 0.004, scintillio: 0.03, respiro: 0.12, tratto: f > 300 ? 1.12 : 1,
      forma: gonfia(attacco / durata, 1, rilascio / durata),
    });
    mescola(out, canto, sr, 0, 1);
  }
  return normalizza(out, 0.9);
}

export function tonfo(sr, f = 70, tau = 0.12, durata = tau * 6) {
  const n = campioni(durata, sr);
  const out = new Float32Array(n);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    fase += (DUE_PI * f * (0.6 + 0.8 * Math.exp(-t / 0.02))) / sr;
    out[i] = Math.sin(fase) * percussione(0.002, tau)(t);
  }
  const terra = bassa(marrone(n), sr, 260, 2);
  inviluppa(normalizza(terra, 1), sr, percussione(0.003, tau * 0.8));
  mescola(out, terra, sr, 0, 0.6);
  return normalizza(out, 0.9);
}

export function fendente(sr, { durata = 0.3, da = 500, vertice = 2200, a = 700, q = 1.6, fischio = 0, centro = 0.45 } = {}) {
  const n = campioni(durata, sr);
  const curva = t => {
    const x = t / durata;
    return x < centro ? da + (vertice - da) * liscia(x / centro) : vertice + (a - vertice) * liscia((x - centro) / (1 - centro));
  };
  const aria = filtra(rosa(n), sr, 'banda', curva, q);
  const forma = t => Math.exp(-(((t / durata - centro) / 0.2) ** 2));
  inviluppa(normalizza(aria, 1), sr, forma);
  if (fischio > 0) {
    const lama = filtra(bianco(n), sr, 'banda', t => curva(t) * 2.2, 9);
    inviluppa(normalizza(lama, 1), sr, forma);
    mescola(aria, lama, sr, 0, fischio);
  }
  return normalizza(aria, 0.9);
}

export function scricchiolio(sr, durata, { da = 18, a = 60, risonanza = 450, q = 10 } = {}) {
  const n = campioni(durata, sr);
  const out = new Float32Array(n);
  let t = 0;
  while (t < durata) {
    const x = t / durata;
    const rate = da + (a - da) * x;
    out[Math.floor(t * sr)] += caso(0.4, 1) * Math.sin(Math.PI * x) ** 0.5;
    t += (1 / rate) * caso(0.75, 1.3);
  }
  const primo = filtra(out.slice(), sr, 'banda', risonanza, q);
  const secondo = filtra(out.slice(), sr, 'banda', risonanza * caso(2.1, 2.8), q * 0.8);
  const ruvido = filtra(out.slice(), sr, 'banda', risonanza * 5, 2);
  const somma = new Float32Array(n);
  mescola(somma, primo, sr, 0, 1);
  mescola(somma, secondo, sr, 0, 0.5);
  mescola(somma, ruvido, sr, 0, 0.25);
  return normalizza(somma, 0.9);
}

export function crepitio(sr, durata, { densita = 60, centro = 2500, q = 1.2, ampiezza = [0.2, 1] } = {}) {
  const d = impulsi(campioni(durata, sr), sr, densita, ampiezza);
  return normalizza(filtra(d, sr, 'banda', centro, q), 0.9);
}

export function rombo(sr, durata, { taglio = 140, attacco = 0.05, tau = durata / 3, rotolio = 0 } = {}) {
  const n = campioni(durata, sr);
  const d = normalizza(bassa(marrone(n), sr, taglio, 2), 1);
  const onde = rotolio > 0 ? lento(n, sr, 5) : null;
  for (let i = 0; i < n; i++) d[i] *= percussione(attacco, tau)(i / sr) * (onde ? 1 - rotolio + rotolio * onde[i] : 1);
  return normalizza(d, 0.9);
}

export function fuoco(sr, durata, { taglio = 900, scoppiettii = 40 } = {}) {
  const n = campioni(durata, sr);
  const ruggito = normalizza(bassa(rosa(n), sr, taglio, 2), 1);
  const fiamma = lento(n, sr, 9);
  for (let i = 0; i < n; i++) ruggito[i] *= 0.55 + 0.45 * fiamma[i];
  mescola(ruggito, crepitio(sr, durata, { densita: scoppiettii, centro: 3200, q: 0.9 }), sr, 0, 0.35);
  return normalizza(ruggito, 0.9);
}

export function ronzio(sr, durata, f0, armoniche) {
  const n = campioni(durata, sr);
  const out = new Float32Array(n);
  armoniche.forEach((ampiezza, k) => {
    const fase = Math.random() * DUE_PI;
    const w = (DUE_PI * f0 * (k + 1)) / sr;
    if (f0 * (k + 1) < sr * 0.45) for (let i = 0; i < n; i++) out[i] += ampiezza * Math.sin(fase + w * i);
  });
  return out;
}

export function clicMetallo(sr, { f = 3000, durata = 0.06, tau = 0.012, morbidezza = 0, corpo = 0, rapporti = [1, 1.52, 2.31, 3.17] } = {}) {
  const modi = rapporti.map((r, k) => [f * r * caso(0.96, 1.04), tau / (1 + k * 0.5), 1 / (1 + k * 0.6)]);
  const out = risuona(scintilla(sr, 0.0002, morbidezza), sr, modi, durata);
  const colpo = alta(scintilla(sr, 0.0004), sr, 1500);
  mescola(out, colpo, sr, 0, 0.5 * Math.max(1e-6, picco(out)));
  if (corpo > 0) mescola(out, tonfo(sr, corpo, 0.012, durata), sr, 0, corpo / 200);
  return normalizza(out, 0.9);
}

export function goccia(sr, f = caso(700, 1600)) {
  const out = vuoto(0.2, sr);
  tono(out, sr, 0.002, { f, fFine: f * caso(1.5, 2.2), glissando: caso(0.008, 0.02), tau: caso(0.012, 0.035), attacco: 0.0008, ampiezza: 1 });
  mescola(out, alta(scintilla(sr, 0.0003), sr, 2000), sr, 0, 0.3);
  return normalizza(out, 0.9);
}

export function cocci(sr, durata, { quanti = 30, da = 2200, a = 7000, tau = [0.004, 0.03] } = {}) {
  const out = vuoto(durata, sr);
  for (let i = 0; i < quanti; i++) {
    const t = durata * 0.85 * Math.random() ** 2;
    const f = caso(da, a);
    tono(out, sr, t, { f, fFine: f * caso(0.98, 1.02), tau: caso(tau[0], tau[1]), attacco: 0.0003, ampiezza: caso(0.2, 1) * (1 - t / durata) });
  }
  return normalizza(out, 0.9);
}

export function saturato(d, spinta) {
  return normalizza(satura(normalizza(d, 1), spinta), 0.9);
}

export function rumoreAria(sr, durata, { centro = 800, q = 0.7, forma = () => 1, colore = 'rosa' } = {}) {
  const n = campioni(durata, sr);
  const base = colore === 'bianco' ? bianco(n) : colore === 'marrone' ? marrone(n) : rosa(n);
  const d = normalizza(filtra(base, sr, 'banda', centro, q), 1);
  return normalizza(inviluppa(d, sr, forma), 0.9);
}
