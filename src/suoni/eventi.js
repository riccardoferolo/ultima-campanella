import {
  caso, campioni, vuoto, bianco, rosa, lento, bassa, alta, filtra, inviluppa, percussione, gonfia, normalizza, mescola,
  finisci, finisciStereo, stereoVuoto, aggiungiStereo, panorama, impulsi, tono, satura, scegli,
} from './dsp.js';
import { voce } from './voce.js';
import { fendente, modale, fuoco, clicMetallo, tonfo, crepitio, rombo, scricchiolio, rumoreAria, vetro } from './materiali.js';

function radio(sr) {
  const durata = 1.5;
  const n = campioni(durata, sr);
  const statico = normalizza(filtra(bianco(n), sr, 'banda', 1400, 0.6), 1);
  mescola(statico, crepitio(sr, durata, { densita: 90, centro: 2000, q: 0.8 }), sr, 0, 0.6);
  for (let i = 0; i < n; i++) statico[i] *= 0.25 + 0.2 * Math.sin(i / sr * 37);
  const out = vuoto(durata, sr);
  mescola(out, clicMetallo(sr, { f: 2200, durata: 0.05, tau: 0.006 }), sr, 0, 0.8);
  mescola(out, statico, sr, 0.03, 0.7);
  tono(out, sr, 0.15, { f: 2200, fFine: 700, glissando: 0.18, tau: 0.25, attacco: 0.02, ampiezza: 0.25 });
  for (let k = 0; k < 3; k++) {
    const parola = voce(sr, caso(0.15, 0.3), { altezza: caso(110, 150), tappe: [[scegli(['a', 'e', 'o', 'i']), 0], [scegli(['a', 'e', 'u']), 1]], respiro: 0.2, forma: x => Math.sin(Math.PI * x) });
    mescola(out, satura(filtra(parola, sr, 'banda', 1200, 0.7), 3), sr, 0.45 + k * caso(0.22, 0.3), 0.5);
  }
  return finisci(filtra(out, sr, 'alta', 250), sr, 0.9, 0.15);
}

function anima(sr) {
  const durata = 1.4;
  const out = vuoto(durata, sr);
  mescola(out, voce(sr, 1.1, { sonoro: 0.15, altezza: x => 300 + 700 * x, respiro: 1, tappe: [['o', 0], ['u', 0.6], ['i', 1]], forma: gonfia(0.2, 1, 0.3) }), sr, 0, 0.8);
  mescola(out, rumoreAria(sr, 1.1, { centro: 1400, q: 1.2, forma: t => (t / 1.1) ** 2 }), sr, 0, 0.5);
  mescola(out, tonfo(sr, 85, 0.08), sr, 1.05, 0.9);
  mescola(out, vetro(sr, 1320, 0.8), sr, 1.05, 0.2);
  return finisci(out, sr, 0.9, 0.2);
}

function pietra(sr) {
  const durata = 1.8;
  const n = campioni(durata, sr);
  const grattata = normalizza(bassa(filtra(bianco(n), sr, 'banda', 380, 0.9), sr, 1500), 1);
  const scatti = lento(n, sr, 18);
  for (let i = 0; i < n; i++) grattata[i] *= (0.3 + 0.7 * scatti[i] ** 2) * gonfia(0.1, durata, 0.3)(i / sr);
  const out = vuoto(durata + 0.5, sr);
  mescola(out, grattata, sr, 0, 0.8);
  mescola(out, scricchiolio(sr, durata, { da: 10, a: 22, risonanza: 160, q: 6 }), sr, 0, 0.5);
  mescola(out, rombo(sr, durata, { taglio: 110, attacco: 0.2, tau: 0.8 }), sr, 0, 0.6);
  mescola(out, tonfo(sr, 60, 0.12), sr, durata - 0.05, 1);
  return finisci(out, sr, 0.9, 0.2);
}

function evocazione(sr) {
  const durata = 2;
  const out = vuoto(durata, sr);
  mescola(out, voce(sr, 1.7, { altezza: x => 70 + 6 * Math.sin(x * 12), tappe: [['u', 0], ['o', 0.4], ['a', 0.7], ['u', 1]], tratto: 0.8, larghezza: 0.5, respiro: 0.15, ruvidita: 0.3, forma: gonfia(0.2, 1, 0.3) }), sr, 0, 0.7);
  mescola(out, rombo(sr, durata, { taglio: 160, attacco: 0.6, tau: 0.9, rotolio: 0.6 }), sr, 0, 0.9);
  mescola(out, crepitio(sr, 1.4, { densita: t => 40 + 80 * t, centro: 900, q: 0.9 }), sr, 0.5, 0.35);
  mescola(out, rumoreAria(sr, 1.6, { centro: 500, q: 0.8, forma: t => (t / 1.6) ** 1.5 }), sr, 0.3, 0.4);
  return finisci(out, sr, 0.9, 0.3);
}

function turbine(sr) {
  const out = stereoVuoto(1.5, sr);
  for (let k = 0; k < 6; k++) {
    const colpo = fendente(sr, { durata: 0.3, da: 600, vertice: caso(1800, 2600), a: 800, q: 1.6, fischio: 0.3 });
    aggiungiStereo(out, panorama(colpo, k % 2 ? 0.7 : -0.7), sr, k * 0.18, 0.8);
  }
  const vortice = rumoreAria(sr, 1.4, { centro: 900, q: 0.6, forma: gonfia(0.2, 1.4, 0.5) });
  aggiungiStereo(out, [vortice, vortice], sr, 0, 0.5);
  const giada = modale(sr, 2800, 1.2, [[1, 1, 1], [1.48, 0.7, 0.5], [2.13, 0.5, 0.3]], { durezza: 0.0003 });
  aggiungiStereo(out, [giada, giada], sr, 0, 0.15);
  return finisciStereo(out, sr, 0.9, 0.2);
}

function onda(sr) {
  const durata = 1.5;
  const out = vuoto(durata, sr);
  mescola(out, fuoco(sr, durata, { taglio: 1400, scoppiettii: 80 }), sr, 0, 1);
  for (let i = 0; i < out.length; i++) out[i] *= gonfia(0.08, durata, 0.7)(i / sr);
  mescola(out, tonfo(sr, 55, 0.2), sr, 0, 0.8);
  mescola(out, fendente(sr, { durata: 0.6, da: 300, vertice: 1600, a: 400, q: 0.9 }), sr, 0, 0.6);
  return finisci(out, sr, 0.9, 0.3);
}

function veleno(sr) {
  const durata = 1.7;
  const out = vuoto(durata, sr);
  mescola(out, rumoreAria(sr, 1.2, { centro: 4800, q: 1.2, colore: 'bianco', forma: percussione(0.05, 0.4) }), sr, 0, 0.8);
  mescola(out, rumoreAria(sr, durata, { centro: 400, q: 0.7, forma: gonfia(0.3, durata, 0.8) }), sr, 0, 0.7);
  for (let k = 0; k < 18; k++) tono(out, sr, caso(0.2, 1.4), { f: caso(150, 300), fFine: caso(350, 600), glissando: 0.02, tau: 0.02, ampiezza: 0.2 });
  return finisci(out, sr, 0.9, 0.3);
}

function scatto(sr) {
  const out = vuoto(0.12, sr);
  mescola(out, clicMetallo(sr, { f: caso(1800, 2200), durata: 0.05, tau: 0.006, morbidezza: 6000 }), sr, 0, 0.8);
  mescola(out, clicMetallo(sr, { f: caso(1200, 1500), durata: 0.06, tau: 0.008, morbidezza: 5000 }), sr, 0.035, 0.6);
  return finisci(out, sr, 0.9, 0.02);
}

function carica(sr) {
  const out = vuoto(1, sr);
  for (let k = 0; k < 4; k++) mescola(out, tonfo(sr, caso(55, 70), 0.06), sr, k * 0.2, 0.9);
  mescola(out, voce(sr, 0.9, { altezza: 80, tappe: [['a', 0], ['r', 1]], tratto: 0.75, ruvidita: 0.9, respiro: 0.5, satura: 3, forma: gonfia(0.1, 1, 0.3) }), sr, 0.05, 0.6);
  mescola(out, fendente(sr, { durata: 0.8, da: 200, vertice: 900, a: 300, q: 0.8 }), sr, 0.1, 0.4);
  return finisci(out, sr, 0.9, 0.2);
}

function impulsoRiverbero(sr, { durata, tau, chiaro, scuro, primi, primiFino, ritardo }) {
  const coppia = stereoVuoto(durata, sr);
  for (const d of coppia) {
    const coda = bianco(d.length);
    for (let i = 0; i < d.length; i++) {
      const t = i / sr;
      coda[i] *= t < ritardo ? 0 : Math.exp(-(t - ritardo) / tau) * Math.min(1, (t - ritardo) / 0.02);
    }
    mescola(d, coda, sr, 0, 1);
    for (let k = 0; k < primi; k++) d[Math.floor(caso(ritardo, primiFino) * sr)] += caso(-1, 1) * 1.5;
    bassa(d, sr, t => scuro + (chiaro - scuro) * Math.exp(-t / (tau * 0.7)));
  }
  return coppia;
}

const AMBIENTI = Object.freeze({
  ir_stanza: { durata: 1.6, tau: 0.18, chiaro: 6500, scuro: 1800, primi: 16, primiFino: 0.06, ritardo: 0.006 },
  ir_cortile: { durata: 1.3, tau: 0.13, chiaro: 5000, scuro: 1500, primi: 4, primiFino: 0.28, ritardo: 0.012 },
  ir_giungla: { durata: 2.2, tau: 0.24, chiaro: 3800, scuro: 900, primi: 0, primiFino: 0, ritardo: 0.02 },
  ir_grotta: { durata: 3.4, tau: 0.45, chiaro: 2600, scuro: 400, primi: 24, primiFino: 0.12, ritardo: 0.012 },
});

const ricetta = (rendi, varianti = 1, sr = 'alto') => ({ rendi, varianti, sr });

export const RICETTE_EVENTI = Object.freeze({
  e_radio: ricetta(radio, 2, 'medio'),
  e_anima: ricetta(anima, 2, 'medio'),
  e_pietra: ricetta(pietra, 2, 'medio'),
  e_evocazione: ricetta(evocazione, 2, 'medio'),
  e_turbine: ricetta(turbine, 1),
  e_onda: ricetta(onda, 1),
  e_veleno: ricetta(veleno, 1),
  e_scatto: ricetta(scatto, 3),
  e_carica: ricetta(carica, 2, 'medio'),
  ...Object.fromEntries(Object.entries(AMBIENTI).map(([k, p]) => [k, ricetta(sr => impulsoRiverbero(sr, p), 1, 'contesto')])),
});
