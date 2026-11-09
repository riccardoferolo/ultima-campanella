import { RICETTE_ARMI } from './armi.js';
import { RICETTE_ZOMBI } from './zombi.js';
import { RICETTE_EVENTI } from './eventi.js';
import { RICETTE_AMBIENTE } from './ambiente.js';

export const RICETTE = Object.freeze({ ...RICETTE_ARMI, ...RICETTE_ZOMBI, ...RICETTE_EVENTI, ...RICETTE_AMBIENTE });

export function rendi(ricette, chiave, sr) {
  const dati = ricette[chiave].rendi(sr);
  return dati instanceof Float32Array ? [dati] : dati;
}
