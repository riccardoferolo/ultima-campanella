import { OGGETTI } from './mappe/piazza.js';

export const COSTO_CAMPANILE = 750;
export const TEMPO_CELLA = 40;
export const COSTO_CAMPANE = 1500;
export const RICARICA_CAMPANE = 75;
export const STORDIMENTO_CAMPANE = 7;

const STATI_IMMUNI = Object.freeze(new Set(['morto', 'emerge', 'scavalca']));
const r2 = n => Math.round(n * 100) / 100;

export function statoIniziale() {
  return { sopra: {}, campane: 0, rintocchi: 0 };
}

function sposta(giocatore, punto, scarto = 0) {
  Object.assign(giocatore, { x: punto.x + scarto, z: punto.z, rianimando: false, teletrasporto: giocatore.teletrasporto + 1 });
}

const nellaCella = g => g.x >= OGGETTI.CAMPANILE.x0 && g.x <= OGGETTI.CAMPANILE.x1 && g.z >= OGGETTI.CAMPANILE.z0 && g.z <= OGGETTI.CAMPANILE.z1;

function scendi(stato, giocatore, eventi) {
  delete stato.piazza.sopra[giocatore.id];
  sposta(giocatore, OGGETTI.USCITA_CAMPANILE, 0);
  giocatore.z += ((Object.keys(stato.piazza.sopra).length % 3) - 1) * 1.1;
  eventi.push({ k: 'discesaCampanile', a: giocatore.id });
}

function suonaCampane(stato, giocatore, eventi, S) {
  const p = stato.piazza;
  if (stato.fase === 'attesa' || !stato.corrente || p.campane > 0 || giocatore.punti < COSTO_CAMPANE) return;
  giocatore.punti -= COSTO_CAMPANE;
  p.campane = RICARICA_CAMPANE;
  p.rintocchi += 1;
  let storditi = 0;
  for (const z of stato.zombie) {
    if (STATI_IMMUNI.has(z.stato) || S.tipoDi(z).boss) continue;
    z.scossa = Math.max(z.scossa ?? 0, STORDIMENTO_CAMPANE);
    if (z.stato === 'attacco') z.stato = 'dentro';
    storditi += 1;
  }
  eventi.push({ k: 'campane', da: giocatore.id, storditi, secondi: STORDIMENTO_CAMPANE });
}

export function compra(stato, giocatore, acquisto, eventi, S) {
  const p = stato.piazza;
  switch (acquisto.tipo) {
    case 'bevanda':
      return !stato.corrente;
    case 'campanile':
      if (!stato.corrente || p.sopra[giocatore.id] || giocatore.punti < COSTO_CAMPANILE) return true;
      giocatore.punti -= COSTO_CAMPANILE;
      p.sopra[giocatore.id] = TEMPO_CELLA;
      sposta(giocatore, OGGETTI.ARRIVO_CELLA, ((Object.keys(p.sopra).length % 3) - 1) * 0.9);
      eventi.push({ k: 'campanile', a: giocatore.id, secondi: TEMPO_CELLA });
      return true;
    case 'discesa':
      if (p.sopra[giocatore.id] || nellaCella(giocatore)) scendi(stato, giocatore, eventi);
      return true;
    case 'campane':
      suonaCampane(stato, giocatore, eventi, S);
      return true;
    default:
      return false;
  }
}

export function aggiorna(stato, dt, eventi) {
  const p = stato.piazza;
  if (stato.fase === 'attesa') return;
  if (p.campane > 0) {
    p.campane = Math.max(0, p.campane - dt);
    if (p.campane === 0) eventi.push({ k: 'campanePronte' });
  }
  for (const id of Object.keys(p.sopra)) {
    const giocatore = stato.giocatori.find(g => g.id === id);
    if (!giocatore) {
      delete p.sopra[id];
      continue;
    }
    if (giocatore.stato !== 'vivo') {
      scendi(stato, giocatore, eventi);
      continue;
    }
    p.sopra[id] -= dt;
    if (p.sopra[id] <= 0) scendi(stato, giocatore, eventi);
  }
}

export function istantanea(stato) {
  const p = stato.piazza;
  if (!p) return {};
  return {
    cq: [r2(p.campane), p.rintocchi],
    cs: Object.entries(p.sopra).map(([id, s]) => [id, r2(s)]),
  };
}

export function espandi(ist) {
  if (!ist.cq?.length) return null;
  return { campane: ist.cq[0], rintocchi: ist.cq[1], sopra: Object.fromEntries(ist.cs ?? []) };
}
