import {
  DUE_PI, caso, intero, campioni, vuoto, bianco, rosa, marrone, lento, bassa, alta, filtra, inviluppa, percussione, gonfia,
  satura, normalizza, mescola, finisci, finisciStereo, stereoVuoto, aggiungiStereo, panorama, impulsi, tono, scintilla,
} from './dsp.js';
import { voce } from './voce.js';
import { fendente, modale, fuoco, clicMetallo, tonfo, cocci, crepitio, rombo, ronzio } from './materiali.js';

const PROFILI = Object.freeze({
  pistola: { durata: 0.5, crepa: 0.7, taglio: 7000, scoppio: 0.016, coda: 0.1, livelloCoda: 0.28, corpo: 160, tauCorpo: 0.028, livelloCorpo: 0.75, rimbombo: 0.12, spinta: 2.4 },
  revolver: { durata: 0.85, crepa: 0.9, taglio: 5600, scoppio: 0.03, coda: 0.24, livelloCoda: 0.38, corpo: 95, tauCorpo: 0.055, livelloCorpo: 0.95, rimbombo: 0.32, spinta: 3 },
  mitra: { durata: 0.3, crepa: 0.6, taglio: 6500, scoppio: 0.012, coda: 0.06, livelloCoda: 0.22, corpo: 175, tauCorpo: 0.02, livelloCorpo: 0.6, rimbombo: 0.06, spinta: 2 },
  assalto: { durata: 0.42, crepa: 1, taglio: 8000, scoppio: 0.016, coda: 0.1, livelloCoda: 0.3, corpo: 125, tauCorpo: 0.032, livelloCorpo: 0.75, rimbombo: 0.16, spinta: 2.6 },
  battaglia: { durata: 0.55, crepa: 1, taglio: 7200, scoppio: 0.022, coda: 0.15, livelloCoda: 0.36, corpo: 100, tauCorpo: 0.042, livelloCorpo: 0.85, rimbombo: 0.24, spinta: 2.8 },
  mitragliatrice: { durata: 0.5, crepa: 0.85, taglio: 6000, scoppio: 0.02, coda: 0.13, livelloCoda: 0.34, corpo: 88, tauCorpo: 0.04, livelloCorpo: 0.9, rimbombo: 0.22, spinta: 3 },
  precisione: { durata: 1.3, crepa: 1.25, taglio: 9500, scoppio: 0.03, coda: 0.32, livelloCoda: 0.42, corpo: 76, tauCorpo: 0.065, livelloCorpo: 1, rimbombo: 0.45, spinta: 3.2, schiocco: 1 },
});
const PROFILI_FUCILE = Object.freeze({
  pompa: { durata: 1.6, crepa: 1.4, taglioCrepa: 5600, vampata: 1.35, fiammata: 0.02, taglio: 3800, scoppio: 0.05, picco: 125, fondo: 52, tauCorpo: 0.13, livelloCorpo: 1.1, pressione: 0.7, pallini: 1700, sparpaglio: 0.2, coda: 0.42, livelloCoda: 0.55, rimbombo: 0.65, spinta: 3 },
  caccia: { durata: 1.9, crepa: 1.2, taglioCrepa: 5000, vampata: 1.2, fiammata: 0.017, taglio: 3200, scoppio: 0.055, picco: 112, fondo: 46, tauCorpo: 0.16, livelloCorpo: 1.15, pressione: 0.8, pallini: 1400, sparpaglio: 0.15, coda: 0.5, livelloCoda: 0.6, rimbombo: 0.75, spinta: 2.8 },
  doppietta: { durata: 1.45, crepa: 1.6, taglioCrepa: 6400, vampata: 1.45, fiammata: 0.022, taglio: 4600, scoppio: 0.042, picco: 140, fondo: 58, tauCorpo: 0.11, livelloCorpo: 1.1, pressione: 0.75, pallini: 2600, sparpaglio: 0.3, coda: 0.36, livelloCoda: 0.5, rimbombo: 0.55, spinta: 3.2 },
  aa12: { durata: 0.8, crepa: 1.3, taglioCrepa: 5600, vampata: 1.25, fiammata: 0.016, taglio: 3600, scoppio: 0.034, picco: 120, fondo: 60, tauCorpo: 0.09, livelloCorpo: 1.2, pressione: 0.5, pallini: 1500, sparpaglio: 0.18, coda: 0.2, livelloCoda: 0.45, rimbombo: 0.3, spinta: 3 },
});
const DURATA_PALLINI = 0.06;
const TAU_PALLINI = 0.014;
const VARIAZIONE_PROFILO = 0.08;
const VARIANTI_SPARO = 4;

function variato(base) {
  const p = {};
  for (const [k, v] of Object.entries(base)) p[k] = k === 'durata' ? v : v * caso(1 - VARIAZIONE_PROFILO, 1 + VARIAZIONE_PROFILO);
  return p;
}

const crepa = sr => normalizza(inviluppa(alta(bianco(campioni(0.012, sr)), sr, 2500), sr, percussione(0.00008, 0.0012)), 1);
const scoppio = (sr, p, n) => normalizza(inviluppa(bassa(bianco(n), sr, t => 220 + p.taglio * Math.exp(-t / (p.scoppio * 2.5)), 2), sr, percussione(0.0005, p.scoppio)), 1);
const coda = (sr, p, n) => normalizza(inviluppa(bassa(rosa(n), sr, t => 260 + 2600 * Math.exp(-t / p.coda), 2), sr, percussione(0.006, p.coda)), 1);
const rimbombo = (sr, p, n) => normalizza(inviluppa(bassa(marrone(n), sr, 170, 2), sr, percussione(0.025, p.coda * 1.8)), 1);

function corpo(sr, p, n) {
  const d = new Float32Array(n);
  const forma = percussione(0.0015, p.tauCorpo);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    fase += (DUE_PI * p.corpo * (0.55 + 0.9 * Math.exp(-t / 0.012))) / sr;
    d[i] = Math.sin(fase) * forma(t);
  }
  const spinta = inviluppa(normalizza(bassa(marrone(n), sr, 320, 2), 1), sr, percussione(0.002, p.tauCorpo * 1.4));
  return normalizza(mescola(d, spinta, sr, 0, 0.7), 1);
}

function sparo(sr, base) {
  const p = variato(base);
  const n = campioni(p.durata, sr);
  const out = new Float32Array(n);
  mescola(out, crepa(sr), sr, 0, p.crepa);
  if (p.schiocco) mescola(out, crepa(sr), sr, caso(0.0015, 0.003), p.crepa * 0.8);
  mescola(out, scoppio(sr, p, n), sr, 0.0003, 1);
  mescola(out, corpo(sr, p, n), sr, 0, p.livelloCorpo);
  mescola(out, coda(sr, p, n), sr, 0.003, p.livelloCoda);
  mescola(out, rimbombo(sr, p, n), sr, 0.006, p.rimbombo);
  satura(normalizza(out, 1), p.spinta);
  return finisci(out, sr, 0.92, p.durata * 0.3);
}

function botto(sr, p, n) {
  const d = new Float32Array(n);
  const forma = percussione(0.0015, p.tauCorpo);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    fase += (DUE_PI * (p.fondo + (p.picco - p.fondo) * Math.exp(-t / 0.03))) / sr;
    d[i] = (Math.sin(fase) + 0.25 * Math.sin(2 * fase)) * forma(t);
  }
  const pressione = inviluppa(normalizza(bassa(marrone(n), sr, 160, 2), 1), sr, percussione(0.003, p.tauCorpo * 1.8));
  return normalizza(mescola(normalizza(d, 1), pressione, sr, 0, p.pressione), 1);
}

function pallini(sr, p) {
  const d = impulsi(campioni(DURATA_PALLINI, sr), sr, t => p.pallini * Math.exp(-t / TAU_PALLINI), [0.3, 1]);
  return normalizza(bassa(filtra(d, sr, 'banda', caso(2600, 3600), 0.9), sr, 7000), 1);
}

function fucilata(sr, base) {
  const p = variato(base);
  const n = campioni(p.durata, sr);
  const out = new Float32Array(n);
  const schiocco = bassa(alta(bianco(campioni(0.02, sr)), sr, 700), sr, p.taglioCrepa, 2);
  mescola(out, normalizza(inviluppa(schiocco, sr, percussione(0.0002, 0.0028)), 1), sr, 0, p.crepa);
  const vampata = bassa(bianco(campioni(0.4, sr)), sr, t => 260 + p.taglio * Math.exp(-t / p.fiammata), 2);
  mescola(out, normalizza(inviluppa(vampata, sr, percussione(0.0006, p.scoppio)), 1), sr, 0.0003, p.vampata);
  mescola(out, botto(sr, p, n), sr, 0, p.livelloCorpo);
  mescola(out, pallini(sr, p), sr, caso(0.003, 0.006), p.sparpaglio);
  mescola(out, coda(sr, p, n), sr, 0.004, p.livelloCoda);
  mescola(out, rimbombo(sr, p, n), sr, 0.008, p.rimbombo);
  satura(normalizza(out, 1), p.spinta);
  return finisci(out, sr, 0.92, p.durata * 0.3);
}

function ecoFucile(sr) {
  const out = stereoVuoto(3.6, sr);
  let t = caso(0.12, 0.25);
  for (let k = 0; k < 8; k++) {
    const n = campioni(0.7, sr);
    const colpo = inviluppa(normalizza(bassa(rosa(n), sr, 800 * 0.8 ** k, 2), 1), sr, percussione(0.015, 0.09 + 0.06 * k));
    aggiungiStereo(out, panorama(colpo, caso(-0.85, 0.85)), sr, t, 0.82 ** k * caso(0.6, 1));
    t += caso(0.18, 0.4);
  }
  aggiungiStereo(out, panorama(rombo(sr, 3.2, { taglio: 160, attacco: 0.15, tau: 0.9, rotolio: 0.6 }), caso(-0.3, 0.3)), sr, 0.08, 0.3);
  return finisciStereo(out, sr, 0.9, 0.5);
}

function eco(sr) {
  const out = stereoVuoto(2.6, sr);
  let t = caso(0.15, 0.3);
  for (let k = 0; k < 6; k++) {
    const n = campioni(0.5, sr);
    const colpo = inviluppa(normalizza(bassa(rosa(n), sr, 1100 * 0.75 ** k, 2), 1), sr, percussione(0.012, 0.07 + 0.05 * k));
    aggiungiStereo(out, panorama(colpo, caso(-0.8, 0.8)), sr, t, 0.8 ** k * caso(0.6, 1));
    t += caso(0.16, 0.34);
  }
  return finisciStereo(out, sr, 0.9, 0.3);
}

function buco(sr) {
  const durata = 1.2;
  const n = campioni(durata, sr);
  const out = new Float32Array(n);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    fase += (DUE_PI * (30 + 70 * Math.exp(-t / 0.25))) / sr;
    out[i] = Math.sin(fase) * percussione(0.03, 0.4)(t);
  }
  const soffio = voce(sr, durata, { sonoro: 0, respiro: 1, tappe: [['o', 0], ['u', 1]], tratto: 0.6, forma: gonfia(0.05, 1, 0.6) });
  mescola(out, soffio, sr, 0, 0.7);
  for (let k = 0; k < 9; k++) tono(out, sr, caso(0.05, 0.8), { f: caso(180, 320), fFine: caso(400, 650), glissando: 0.03, tau: 0.02, ampiezza: 0.12 });
  return finisci(out, sr, 0.9, 0.3);
}

function gelo(sr) {
  const durata = 0.24;
  const n = campioni(durata, sr);
  const getto = filtra(bianco(n), sr, 'banda', t => 7200 - 14000 * t, 0.8);
  inviluppa(normalizza(getto, 1), sr, percussione(0.004, 0.05));
  mescola(getto, cocci(sr, durata, { quanti: 5, da: 5000, a: 9500, tau: [0.002, 0.01] }), sr, 0.01, 0.3);
  mescola(getto, tonfo(sr, 150, 0.012, 0.08), sr, 0, 0.35);
  return finisci(getto, sr, 0.9, 0.05);
}

function arco(sr) {
  const durata = 0.42;
  const n = campioni(durata, sr);
  const scintille = normalizza(filtra(impulsi(n, sr, t => 3500 * Math.exp(-t / 0.1)), sr, 'banda', 3200, 0.7), 1);
  const brusio = ronzio(sr, durata, 120, [1, 0.7, 0.55, 0.45, 0.35, 0.25, 0.2, 0.15]);
  const tremito = lento(n, sr, 60);
  for (let i = 0; i < n; i++) brusio[i] *= tremito[i] * percussione(0.002, 0.08)(i / sr);
  const out = normalizza(brusio, 1);
  mescola(out, scintille, sr, 0, 0.9);
  mescola(out, crepa(sr), sr, 0, 1);
  satura(normalizza(out, 1), 2);
  return finisci(out, sr, 0.9, 0.08);
}

function anello(sr, f, durata, rapporti) {
  return modale(sr, f, durata, rapporti, { durezza: 0.0003 });
}

function machete(sr) {
  const lama = fendente(sr, { durata: caso(0.24, 0.29), da: 700, vertice: caso(2300, 2900), a: 900, q: 1.8, fischio: 0.35 });
  mescola(lama, anello(sr, caso(2600, 3000), 0.5, [[1, 1, 1], [1.48, 0.7, 0.5], [2.13, 0.5, 0.3]]), sr, 0.1, 0.12);
  return finisci(lama, sr, 0.9, 0.1);
}

function spada(sr) {
  const lama = fendente(sr, { durata: caso(0.32, 0.38), da: 450, vertice: caso(1700, 2100), a: 600, q: 1.5, fischio: 0.45 });
  mescola(lama, anello(sr, caso(1700, 2000), 0.7, [[1, 1, 1], [2.76, 0.6, 0.5], [5.4, 0.4, 0.25], [8.9, 0.3, 0.12]]), sr, 0.14, 0.1);
  mescola(lama, fuoco(sr, 0.36), sr, 0.02, 0.14);
  return finisci(lama, sr, 0.9, 0.12);
}

function bastone(sr) {
  const durata = caso(0.38, 0.44);
  const aria = fendente(sr, { durata, da: 220, vertice: caso(800, 1000), a: 280, q: 1 });
  const n = campioni(durata, sr);
  const sonaglio = filtra(bianco(n), sr, 'banda', 6200, 1.4);
  const battito = caso(48, 62);
  for (let i = 0; i < n; i++) sonaglio[i] *= Math.sin((Math.PI * battito * i) / sr) ** 8 * gonfia(0.05, durata, 0.15)(i / sr);
  mescola(aria, normalizza(sonaglio, 1), sr, 0, 0.22);
  return finisci(aria, sr, 0.9, 0.1);
}

const coltello = sr => finisci(fendente(sr, { durata: caso(0.12, 0.16), da: 1400, vertice: caso(4600, 5600), a: 2000, q: 2.2, fischio: 0.25, centro: 0.4 }), sr, 0.9, 0.03);

function scivolo(sr, { durata = caso(0.07, 0.13), centro = caso(2500, 4500) } = {}) {
  const n = campioni(durata, sr);
  const attrito = filtra(bianco(n), sr, 'banda', centro, 1.2);
  const grana = lento(n, sr, caso(150, 300));
  for (let i = 0; i < n; i++) attrito[i] *= (0.35 + 0.65 * grana[i]) * gonfia(0.01, durata, 0.02)(i / sr);
  return normalizza(attrito, 0.9);
}

const clic = sr => clicMetallo(sr, { f: caso(2400, 3400), durata: 0.05, tau: 0.008 });
const clac = sr => clicMetallo(sr, { f: caso(1100, 1600), durata: 0.14, tau: 0.02, corpo: 180, rapporti: [1, 1.7, 2.6, 3.9, 5.1] });
const slitta = sr => clicMetallo(sr, { f: caso(1800, 2400), durata: 0.16, tau: 0.03, corpo: 140 });

function bossolo(sr) {
  const out = vuoto(0.42, sr);
  const f = caso(3600, 4300);
  let t = 0;
  [1, 0.5, 0.26, 0.12].forEach((a, k) => {
    mescola(out, clicMetallo(sr, { f: f * caso(0.98, 1.02), durata: 0.2, tau: 0.05 / (1 + k * 0.4), rapporti: [1, 1.46, 2.3, 3.1] }), sr, t, a);
    t += caso(0.04, 0.1) / (1 + k * 0.5);
  });
  return finisci(out, sr, 0.9, 0.05);
}

function guscio(sr) {
  const out = vuoto(0.2, sr);
  mescola(out, scivolo(sr, { durata: 0.05, centro: 1800 }), sr, 0, 0.35);
  mescola(out, tonfo(sr, caso(220, 300), 0.018, 0.1), sr, 0.04, 1);
  mescola(out, clicMetallo(sr, { f: caso(1500, 2000), durata: 0.05, tau: 0.006 }), sr, 0.055, 0.45);
  return finisci(out, sr, 0.9, 0.03);
}

function pompata(sr, { scala = 1, avanti = [0.14, 0.17] } = {}) {
  const corsa = caso(...avanti);
  const out = vuoto(corsa + 0.27, sr);
  mescola(out, scivolo(sr, { durata: 0.07, centro: 1300 * scala }), sr, 0, 0.5);
  mescola(out, clicMetallo(sr, { f: caso(850, 1100) * scala, durata: 0.16, tau: 0.024, corpo: 160, rapporti: [1, 1.62, 2.45, 3.7, 5.2] }), sr, 0.055, 0.85);
  mescola(out, tonfo(sr, 125 * scala, 0.02, 0.12), sr, 0.055, 0.4);
  mescola(out, scivolo(sr, { durata: 0.06, centro: 1600 * scala }), sr, corsa, 0.45);
  mescola(out, clicMetallo(sr, { f: caso(1150, 1450) * scala, durata: 0.2, tau: 0.03, corpo: 180, rapporti: [1, 1.55, 2.3, 3.4, 4.9] }), sr, corsa + 0.05, 1);
  mescola(out, tonfo(sr, 140 * scala, 0.022, 0.13), sr, corsa + 0.05, 0.5);
  return finisci(out, sr, 0.9, 0.05);
}

function ciclo(sr) {
  const out = vuoto(0.16, sr);
  mescola(out, clicMetallo(sr, { f: caso(1300, 1650), durata: 0.07, tau: 0.012, corpo: 130 }), sr, 0, 0.8);
  mescola(out, scivolo(sr, { durata: 0.03, centro: 2100 }), sr, 0.01, 0.35);
  mescola(out, clicMetallo(sr, { f: caso(1750, 2150), durata: 0.07, tau: 0.01, corpo: 110 }), sr, caso(0.035, 0.045), 1);
  return finisci(out, sr, 0.9, 0.03);
}

function canne(sr) {
  const out = vuoto(0.16, sr);
  mescola(out, clicMetallo(sr, { f: caso(2100, 2600), durata: 0.04, tau: 0.005 }), sr, 0, 0.7);
  mescola(out, clicMetallo(sr, { f: caso(1400, 1800), durata: 0.06, tau: 0.008, corpo: 90 }), sr, caso(0.04, 0.06), 1);
  return finisci(out, sr, 0.9, 0.03);
}

function otturatore(sr) {
  const out = vuoto(0.6, sr);
  mescola(out, clic(sr), sr, 0, 0.7);
  mescola(out, scivolo(sr, { durata: 0.08 }), sr, 0.07, 0.5);
  mescola(out, clic(sr), sr, 0.16, 0.5);
  mescola(out, scivolo(sr, { durata: 0.07 }), sr, 0.24, 0.5);
  mescola(out, clac(sr), sr, 0.31, 0.9);
  mescola(out, clic(sr), sr, 0.39, 0.8);
  return finisci(out, sr, 0.9, 0.05);
}

function cricchetto(sr) {
  const out = vuoto(0.18, sr);
  for (let k = 0; k < intero(3, 4); k++) mescola(out, clicMetallo(sr, { f: caso(3000, 3600), durata: 0.03, tau: 0.004 }), sr, k * caso(0.022, 0.03), 0.6 + 0.1 * k);
  return finisci(out, sr, 0.9, 0.02);
}

function sibilo(sr) {
  const durata = 0.45;
  const getto = filtra(bianco(campioni(durata, sr)), sr, 'banda', t => 5200 - 3000 * t, 0.8);
  return finisci(inviluppa(normalizza(getto, 1), sr, gonfia(0.02, durata, 0.25)), sr, 0.9, 0.05);
}

function risucchio(sr) {
  const out = vuoto(0.3, sr);
  tono(out, sr, 0, { f: caso(160, 200), fFine: caso(480, 560), glissando: 0.03, tau: 0.045, attacco: 0.004, ampiezza: 1 });
  mescola(out, voce(sr, 0.14, { sonoro: 0, respiro: 1, tappe: [['u', 0], ['a', 1]], tratto: 0.8, forma: x => Math.sin(Math.PI * x) }), sr, 0, 0.6);
  mescola(out, bassa(scintilla(sr, 0.004), sr, 900), sr, 0.002, 0.5);
  return finisci(out, sr, 0.9, 0.05);
}

function esplosione(sr, grande) {
  const durata = grande ? 3.6 : 2.6;
  const out = vuoto(durata, sr);
  const n0 = campioni(0.4, sr);
  mescola(out, normalizza(inviluppa(bassa(bianco(n0), sr, t => 200 + 9000 * Math.exp(-t / 0.03), 2), sr, percussione(0.0008, 0.06)), 1), sr, 0, 1);
  const boom = vuoto(1.6, sr);
  let fase = 0;
  for (let i = 0; i < boom.length; i++) {
    const t = i / sr;
    fase += (DUE_PI * 55 * (0.45 + 0.9 * Math.exp(-t / 0.06))) / sr;
    boom[i] = Math.sin(fase) * percussione(0.004, grande ? 0.5 : 0.32)(t);
  }
  mescola(out, boom, sr, 0, 1.1);
  mescola(out, rombo(sr, durata, { taglio: 220, attacco: 0.04, tau: grande ? 1.1 : 0.7, rotolio: 0.5 }), sr, 0.01, 0.8);
  mescola(out, normalizza(inviluppa(bassa(rosa(campioni(1, sr)), sr, 1200, 2), sr, percussione(0.003, 0.18)), 1), sr, 0, 0.6);
  mescola(out, cocci(sr, durata - 0.3, { quanti: grande ? 60 : 40, da: 900, a: 5000, tau: [0.003, 0.02] }), sr, 0.12, 0.18);
  mescola(out, crepitio(sr, 1.6, { densita: t => 140 * Math.exp(-t / 0.5), centro: 2200 }), sr, 0.1, 0.15);
  for (let k = 0; k < 3; k++) mescola(out, tonfo(sr, caso(140, 240), 0.03), sr, caso(0.3, 1.1), 0.22);
  satura(normalizza(out, 1), 2.2);
  return finisci(out, sr, 0.95, 0.5);
}

const ricetta = (rendi, varianti = 3, sr = 'alto') => ({ rendi, varianti, sr });

export const RICETTE_ARMI = Object.freeze({
  ...Object.fromEntries(Object.entries(PROFILI).map(([famiglia, p]) => [`sparo_${famiglia}`, ricetta(sr => sparo(sr, p), VARIANTI_SPARO)])),
  ...Object.fromEntries(Object.entries(PROFILI_FUCILE).map(([modello, p]) => [`sparo_${modello}`, ricetta(sr => fucilata(sr, p), VARIANTI_SPARO)])),
  sparo_eco: ricetta(eco, 3, 'medio'),
  sparo_eco_fucile: ricetta(ecoFucile, 3, 'medio'),
  sparo_buco: ricetta(buco, 2),
  sparo_gelo: ricetta(gelo, 4),
  sparo_arco: ricetta(arco, 3),
  fendente_giada: ricetta(machete, 4),
  fendente_sole: ricetta(spada, 4),
  fendente_serpente: ricetta(bastone, 4),
  fendente_coltello: ricetta(coltello, 4),
  m_clic: ricetta(clic, 4),
  m_clac: ricetta(clac, 3),
  m_slitta: ricetta(slitta, 3),
  m_scivolo: ricetta(sr => scivolo(sr), 4),
  m_bossolo: ricetta(bossolo, 4),
  m_guscio: ricetta(guscio, 3),
  m_pompa: ricetta(sr => pompata(sr), 3),
  m_pompa_caccia: ricetta(sr => pompata(sr, { scala: 0.86, avanti: [0.17, 0.2] }), 3),
  m_ciclo: ricetta(ciclo, 3),
  m_canne: ricetta(canne, 3),
  m_otturatore: ricetta(otturatore, 2),
  m_cricchetto: ricetta(cricchetto, 2),
  m_sibilo: ricetta(sibilo, 2),
  m_risucchio: ricetta(risucchio, 3),
  m_tonfo: ricetta(sr => finisci(tonfo(sr, caso(110, 140), 0.03, 0.2), sr), 2),
  esplosione: ricetta(sr => esplosione(sr, false), 3),
  esplosione_grande: ricetta(sr => esplosione(sr, true), 1),
});

export const FAMIGLIE_SPARO = Object.freeze(Object.keys(PROFILI));
export const MODELLI_FUCILE = Object.freeze(Object.keys(PROFILI_FUCILE));
