import { caso, vuoto, tono, mescola, finisci, gonfia } from './dsp.js';
import { voce } from './voce.js';

const lamento = sr => {
  const durata = caso(1.2, 2.1);
  const base = caso(75, 105);
  return voce(sr, durata, {
    altezza: x => base * (1 + 0.15 * Math.sin(Math.PI * x)) * (1 - 0.25 * x),
    tappe: [['u', 0], [Math.random() < 0.5 ? 'o' : 'a', 0.45], ['e', 1]], tratto: 0.85, larghezza: 1.3,
    tremolio: 0.06, scintillio: 0.25, respiro: 0.35, ruvidita: 0.35, frittura: x => (x > 0.75 ? 0.6 : 0.05),
    forma: gonfia(caso(0.1, 0.2), 1, 0.3),
  });
};

const rantolo = sr => voce(sr, caso(0.5, 0.9), {
  altezza: caso(45, 60), tappe: [['e', 0], ['r', 1]], tratto: 0.85, larghezza: 1.4,
  tremolio: 0.08, scintillio: 0.35, respiro: 0.6, ruvidita: 0.6, frittura: 0.85, forma: gonfia(0.1, 1, 0.4),
});

const ringhio = sr => {
  const base = caso(115, 155);
  return voce(sr, caso(0.6, 1.1), {
    altezza: x => base * (1 - 0.3 * x), tappe: [['a', 0], ['e', 1]], tratto: 0.82,
    tremolio: 0.05, scintillio: 0.2, respiro: 0.25, ruvidita: 0.9, frittura: 0.08, satura: 3, forma: gonfia(0.06, 1, 0.35),
  });
};

function gorgoglio(sr) {
  const durata = caso(0.6, 1);
  const out = voce(sr, durata, { altezza: 62, tappe: [['o', 0], ['u', 1]], tratto: 0.8, respiro: 0.4, ruvidita: 0.5, frittura: 0.5, forma: gonfia(0.1, 1, 0.3) });
  for (let k = 0; k < 14; k++) tono(out, sr, caso(0.05, durata - 0.1), { f: caso(280, 500), fFine: caso(600, 900), glissando: 0.015, tau: 0.012, ampiezza: 0.25 });
  return finisci(out, sr);
}

const inspiro = sr => voce(sr, caso(0.5, 0.8), {
  sonoro: 0, respiro: 1, tappe: [['u', 0], ['e', 1]], tratto: 0.9, forma: gonfia(0.3, 1, 0.2),
});

function urlo(sr) {
  const durata = caso(1.3, 1.6);
  const out = vuoto(durata, sr);
  for (const base of [72, 86, 101]) {
    mescola(out, voce(sr, durata, {
      altezza: x => base * (1 + 0.2 * Math.sin(Math.PI * x)), tappe: [['a', 0], ['o', 0.6], ['u', 1]], tratto: 0.75,
      tremolio: 0.05, respiro: 0.4, ruvidita: 1, satura: 4, forma: gonfia(0.08, 1, 0.4),
    }), sr, caso(0, 0.03), 1);
  }
  return finisci(out, sr, 0.9, 0.2);
}

const ricetta = (rendi, varianti) => ({ rendi, varianti, sr: 'medio' });

export const RICETTE_ZOMBI = Object.freeze({
  z_lamento: ricetta(lamento, 5),
  z_rantolo: ricetta(rantolo, 3),
  z_ringhio: ricetta(ringhio, 3),
  z_gorgoglio: ricetta(gorgoglio, 2),
  z_inspiro: ricetta(inspiro, 2),
  z_urlo: ricetta(urlo, 2),
});

export const TIPI_LAMENTO = Object.freeze([
  ['z_lamento', 0.4, 0.5], ['z_rantolo', 0.25, 0.45], ['z_ringhio', 0.15, 0.4], ['z_gorgoglio', 0.12, 0.45], ['z_inspiro', 0.08, 0.3],
]);
