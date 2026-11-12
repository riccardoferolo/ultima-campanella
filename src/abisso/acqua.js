import { R } from '../regole.js';
import { quota } from '../mappa.js';
import { REATTORE, DELTA } from '../mappe/abisso.js';
import { A } from './costanti.js';

const ALTEZZA_MAREA = DELTA.marea - DELTA.fondo;
const RAGGIO_MAREA = DELTA.raggio - 1.2;

export function livelloReattore(livello) {
  return REATTORE.fondo + (REATTORE.allagato - REATTORE.fondo) * livello;
}

export function livelloMarea(marea) {
  return DELTA.fondo + ALTEZZA_MAREA * marea;
}

export function livelloAcqua(ab, x, z) {
  if (!ab) return -Infinity;
  let livello = -Infinity;
  if (ab.allagamento.livello > 0 && Math.hypot(x - REATTORE.x, z - REATTORE.z) < REATTORE.pozzo) livello = livelloReattore(ab.allagamento.livello);
  const marea = ab.leviatano?.marea ?? 0;
  if (marea > 0 && Math.hypot(x - DELTA.x, z - DELTA.z) < RAGGIO_MAREA) livello = Math.max(livello, livelloMarea(marea));
  return livello;
}

const SALTO_MASSIMO = 0.8;
const MARGINE_TESTA = 1.45;

export function suReale(ab, g) {
  const nuoto = livelloAcqua(ab, g.x, g.z) - quota(g.x, g.z) - MARGINE_TESTA + 0.1;
  return Math.min(Math.max(0, g.su ?? 0), Math.max(SALTO_MASSIMO, nuoto));
}

export const altezzaOcchi = (ab, g) => quota(g.x, g.z) + suReale(ab, g) + R.ALTEZZA_OCCHI;
export const sottAcqua = (ab, g) => altezzaOcchi(ab, g) < livelloAcqua(ab, g.x, g.z) - 0.05;

export function aggiornaAllagamento(ab, dt, eventi) {
  const a = ab.allagamento;
  if (a.verso > 0) {
    a.livello = Math.min(1, a.livello + dt / A.ALLAGA_IN);
    a.durata += dt;
    if (a.livello >= 1 && a.durata > A.ALLAGAMENTO_MASSIMO) svuota(ab, eventi);
  } else if (a.verso < 0) {
    a.livello = Math.max(0, a.livello - dt / A.SVUOTA_IN);
    if (a.livello <= 0) a.verso = 0;
  }
}

export function allaga(ab, eventi) {
  ab.allagamento.verso = 1;
  ab.allagamento.durata = 0;
  eventi.push({ k: 'allagamento', verso: 1 });
}

export function svuota(ab, eventi) {
  if (ab.allagamento.verso < 0 || ab.allagamento.livello <= 0) return;
  ab.allagamento.verso = -1;
  eventi.push({ k: 'allagamento', verso: -1 });
}

export function aggiornaOssigeno(stato, ab, dt, eventi, S) {
  for (const g of stato.giocatori) {
    const pieno = ab.ossigeno[g.id] ?? 1;
    if (g.stato !== 'vivo') {
      ab.ossigeno[g.id] = 1;
      continue;
    }
    if (!sottAcqua(ab, g)) {
      ab.ossigeno[g.id] = Math.min(1, pieno + dt / A.RESPIRO);
      ab.annega[g.id] = 0;
      continue;
    }
    const durata = g.bevande.includes('scatto') ? A.OSSIGENO_PINNA : A.OSSIGENO;
    ab.ossigeno[g.id] = Math.max(0, pieno - dt / durata);
    if (ab.ossigeno[g.id] > 0) continue;
    ab.annega[g.id] = (ab.annega[g.id] ?? 0) + dt;
    if (ab.annega[g.id] < A.ANNEGA_OGNI) continue;
    ab.annega[g.id] = 0;
    eventi.push({ k: 'annega', a: g.id });
    S.ferisciGiocatore(stato, g, eventi, A.ANNEGA_DANNO);
  }
}
