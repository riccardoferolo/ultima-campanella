import { R } from './regole.js';
import { LIMITI, ZONE, mappaAttiva, ostacoliPerGiocatori } from './mappa.js';

export const CELLA = 0.5;
const VICINI = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
const DC = Int8Array.from(VICINI, v => v[0]);
const DR = Int8Array.from(VICINI, v => v[1]);
const COSTI = Float32Array.from(VICINI, v => v[2]);
const cacheGriglie = new Map();

function riempiScatola(g, s, valore, margine = 0) {
  const c0 = Math.max(0, Math.ceil((s.x0 - margine - g.x0) / CELLA - 0.5));
  const c1 = Math.min(g.colonne - 1, Math.floor((s.x1 + margine - g.x0) / CELLA - 0.5));
  const r0 = Math.max(0, Math.ceil((s.z0 - margine - g.z0) / CELLA - 0.5));
  const r1 = Math.min(g.righe - 1, Math.floor((s.z1 + margine - g.z0) / CELLA - 0.5));
  for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) g.libera[r * g.colonne + c] = valore;
}

export function griglia(porteAperte) {
  const chiave = `${mappaAttiva}|${[...porteAperte].sort().join(',')}`;
  if (cacheGriglie.has(chiave)) return cacheGriglie.get(chiave);
  const colonne = Math.ceil((LIMITI.x1 - LIMITI.x0) / CELLA);
  const righe = Math.ceil((LIMITI.z1 - LIMITI.z0) / CELLA);
  const g = { x0: LIMITI.x0, z0: LIMITI.z0, colonne, righe, libera: new Uint8Array(colonne * righe) };
  for (const zona of ZONE) riempiScatola(g, zona, 1);
  for (const s of ostacoliPerGiocatori(porteAperte)) riempiScatola(g, s, 0, R.RAGGIO_ZOMBIE);
  cacheGriglie.set(chiave, g);
  return g;
}

const cellaDi = (g, x, z) => [Math.floor((x - g.x0) / CELLA), Math.floor((z - g.z0) / CELLA)];
const centroCella = (g, c, r) => [g.x0 + (c + 0.5) * CELLA, g.z0 + (r + 0.5) * CELLA];
const dentro = (g, c, r) => c >= 0 && r >= 0 && c < g.colonne && r < g.righe;

export function campoVerso(g, bersagli) {
  const totale = g.colonne * g.righe;
  const distanze = new Float32Array(totale).fill(Infinity);
  const coda = new Int32Array(totale * 2);
  let fine = 0;
  for (const { x, z } of bersagli) {
    const [c, r] = cellaDi(g, x, z);
    if (!dentro(g, c, r)) continue;
    distanze[r * g.colonne + c] = 0;
    coda[fine++] = r * g.colonne + c;
  }
  const { colonne, righe, libera } = g;
  for (let testa = 0; testa < fine; testa++) {
    const i = coda[testa];
    const c = i % colonne;
    const r = (i - c) / colonne;
    const base = distanze[i];
    for (let k = 0; k < 8; k++) {
      const dc = DC[k];
      const dr = DR[k];
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= colonne || nr >= righe) continue;
      const j = nr * colonne + nc;
      if (!libera[j]) continue;
      if (dc && dr && (!libera[i + dc] || !libera[i + dr * colonne])) continue;
      const nuova = base + COSTI[k];
      if (nuova >= distanze[j]) continue;
      distanze[j] = nuova;
      if (fine < coda.length) coda[fine++] = j;
    }
  }
  return { ...g, distanze };
}

export function direzione(campo, x, z) {
  const [c, r] = cellaDi(campo, x, z);
  if (!dentro(campo, c, r)) return null;
  let migliore = campo.distanze[r * campo.colonne + c];
  let scelta = null;
  for (const [dc, dr] of VICINI) {
    const nc = c + dc;
    const nr = r + dr;
    if (!dentro(campo, nc, nr)) continue;
    if (dc && dr && (!campo.libera[r * campo.colonne + c + dc] || !campo.libera[(r + dr) * campo.colonne + c])) continue;
    const d = campo.distanze[nr * campo.colonne + nc];
    if (d < migliore) {
      migliore = d;
      scelta = [nc, nr];
    }
  }
  if (!scelta) return null;
  const [tx, tz] = centroCella(campo, scelta[0], scelta[1]);
  const lunghezza = Math.hypot(tx - x, tz - z) || 1;
  return { x: (tx - x) / lunghezza, z: (tz - z) / lunghezza };
}

export function distanzaCampo(campo, x, z) {
  const [c, r] = cellaDi(campo, x, z);
  return dentro(campo, c, r) ? campo.distanze[r * campo.colonne + c] : Infinity;
}
