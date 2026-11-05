import { R } from './regole.js';
import { LIMITI, ZONE, ostacoliPerGiocatori } from './mappa.js';
import { dentroScatola } from './fisica.js';

export const CELLA = 0.5;
const COLONNE = Math.ceil((LIMITI.x1 - LIMITI.x0) / CELLA);
const RIGHE = Math.ceil((LIMITI.z1 - LIMITI.z0) / CELLA);
const VICINI = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
const cacheGriglie = new Map();

const indice = (c, r) => r * COLONNE + c;
const cellaDi = (x, z) => [Math.floor((x - LIMITI.x0) / CELLA), Math.floor((z - LIMITI.z0) / CELLA)];
const centroCella = (c, r) => [LIMITI.x0 + (c + 0.5) * CELLA, LIMITI.z0 + (r + 0.5) * CELLA];
const dentro = (c, r) => c >= 0 && r >= 0 && c < COLONNE && r < RIGHE;

export function griglia(porteAperte) {
  const chiave = [...porteAperte].sort().join(',');
  if (cacheGriglie.has(chiave)) return cacheGriglie.get(chiave);
  const ostacoli = ostacoliPerGiocatori(porteAperte);
  const libera = new Uint8Array(COLONNE * RIGHE);
  for (let r = 0; r < RIGHE; r++) {
    for (let c = 0; c < COLONNE; c++) {
      const [x, z] = centroCella(c, r);
      const inZona = ZONE.some(zona => dentroScatola(x, z, zona));
      const bloccata = ostacoli.some(s => dentroScatola(x, z, s, R.RAGGIO_ZOMBIE));
      libera[indice(c, r)] = inZona && !bloccata ? 1 : 0;
    }
  }
  const risultato = { libera };
  cacheGriglie.set(chiave, risultato);
  return risultato;
}

export function campoVerso(grigliaLibera, bersagli) {
  const distanze = new Float32Array(COLONNE * RIGHE).fill(Infinity);
  const coda = [];
  for (const { x, z } of bersagli) {
    const [c, r] = cellaDi(x, z);
    if (!dentro(c, r)) continue;
    distanze[indice(c, r)] = 0;
    coda.push([c, r]);
  }
  for (let testa = 0; testa < coda.length; testa++) {
    const [c, r] = coda[testa];
    const base = distanze[indice(c, r)];
    for (const [dc, dr, costo] of VICINI) {
      const nc = c + dc;
      const nr = r + dr;
      if (!dentro(nc, nr) || !grigliaLibera.libera[indice(nc, nr)]) continue;
      if (dc && dr && (!grigliaLibera.libera[indice(c + dc, r)] || !grigliaLibera.libera[indice(c, r + dr)])) continue;
      const nuova = base + costo;
      if (nuova >= distanze[indice(nc, nr)]) continue;
      distanze[indice(nc, nr)] = nuova;
      coda.push([nc, nr]);
    }
  }
  return { distanze, libera: grigliaLibera.libera };
}

export function direzione(campo, x, z) {
  const [c, r] = cellaDi(x, z);
  if (!dentro(c, r)) return null;
  let migliore = campo.distanze[indice(c, r)];
  let scelta = null;
  for (const [dc, dr] of VICINI) {
    const nc = c + dc;
    const nr = r + dr;
    if (!dentro(nc, nr)) continue;
    if (dc && dr && (!campo.libera[indice(c + dc, r)] || !campo.libera[indice(c, r + dr)])) continue;
    const d = campo.distanze[indice(nc, nr)];
    if (d < migliore) {
      migliore = d;
      scelta = [nc, nr];
    }
  }
  if (!scelta) return null;
  const [tx, tz] = centroCella(scelta[0], scelta[1]);
  const lunghezza = Math.hypot(tx - x, tz - z) || 1;
  return { x: (tx - x) / lunghezza, z: (tz - z) / lunghezza };
}

export function distanzaCampo(campo, x, z) {
  const [c, r] = cellaDi(x, z);
  return dentro(c, r) ? campo.distanze[indice(c, r)] : Infinity;
}
