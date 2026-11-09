import * as scuola from './mappe/scuola.js';
import * as giungla from './mappe/giungla.js';
import * as teatro from './mappe/teatro.js';

export const MAPPE = Object.freeze({ scuola, giungla, teatro });
export const ELENCO_MAPPE = Object.freeze(Object.keys(MAPPE));
export const NOMI_MAPPE = Object.freeze({ scuola: 'La scuola', giungla: 'Il tempio nella giungla', teatro: "Il Teatro dell'Eclissi" });
const PIANO = () => 0;
const NESSUN_NOME = Object.freeze({});

export let mappaAttiva = 'scuola';
export let ALTEZZA_SOFFITTO;
export let ALTEZZA_RECINZIONE;
export let ATMOSFERA;
export let ZONE;
export let SALA;
export let LIMITI;
export let MURI;
export let RECINZIONI;
export let OSTACOLI;
export let FINESTRE;
export let PORTE;
export let ACQUISTI;
export let MURALI;
export let PARTENZE;
export let PARTENZE_SALA;
export let CARTELLO_PRONTI;
export let FRAMMENTI;
export let ARREDI;
export let NOMI = NESSUN_NOME;
export let quota = PIANO;

export function usaMappa(id) {
  const scelta = Object.hasOwn(MAPPE, id) ? id : 'scuola';
  const m = MAPPE[scelta];
  mappaAttiva = scelta;
  ({ ALTEZZA_SOFFITTO, ALTEZZA_RECINZIONE, ATMOSFERA, ZONE, SALA, LIMITI, MURI, OSTACOLI, FINESTRE, PORTE, ACQUISTI, MURALI, PARTENZE, PARTENZE_SALA, CARTELLO_PRONTI } = m);
  RECINZIONI = m.RECINZIONI ?? [];
  FRAMMENTI = m.FRAMMENTI ?? [];
  ARREDI = m.ARREDI ?? [];
  NOMI = m.NOMI ?? NESSUN_NOME;
  quota = m.quota ?? PIANO;
  return scelta;
}

usaMappa('scuola');

export { POSTI_FUSIBILE, FUSIBILE_GENERATORE, GENERATORE, COMPARSA_CUSTODE, SOGLIA_RIFUGIO, FINESTRE_RIFUGIO } from './mappe/scuola.js';

export function scatolaAcquisto(acquisto) {
  if (MURALI.has(acquisto.tipo)) return null;
  const { x, z } = acquisto.posizione;
  const lungo = acquisto.tipo === 'potenziatore' ? 0.8 : 0.5;
  const largo = acquisto.tipo === 'potenziatore' ? 0.6 : 0.35;
  return acquisto.verso.x !== 0
    ? { x0: x - largo, z0: z - lungo, x1: x + largo, z1: z + lungo }
    : { x0: x - lungo, z0: z - largo, x1: x + lungo, z1: z + largo };
}

export function zonaDi(x, z) {
  return ZONE.find(zona => x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1)?.id ?? null;
}

export function zoneAperte(porteAperte) {
  const aperte = new Set([ZONE[0].id, ...ZONE.filter(z => z.sempre).map(z => z.id)]);
  for (const porta of PORTE) if (porteAperte.has(porta.id)) porta.zone.forEach(z => aperte.add(z));
  return aperte;
}

export function ostacoliPerGiocatori(porteAperte) {
  return [
    ...MURI,
    ...RECINZIONI,
    ...OSTACOLI,
    ...FINESTRE.map(f => f.scatola).filter(Boolean),
    ...PORTE.filter(p => !porteAperte.has(p.id)).map(p => p.scatola),
    ...ACQUISTI.map(scatolaAcquisto).filter(Boolean),
    ...ARREDI.filter(a => a.solido).map(a => a.solido),
  ];
}

export const sottoCielo = (x, z) => ZONE.some(zona => zona.aperto && x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1);

export function tetto(x, z, { cielo = true } = {}) {
  const zona = ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1);
  if (Number.isFinite(zona?.tetto)) return zona.tetto;
  return cielo && sottoCielo(x, z) ? Infinity : quota(x, z) + ALTEZZA_SOFFITTO;
}

export const stessoPiano = (a, b, scarto = 2.5) => Math.abs(quota(a.x, a.z) - quota(b.x, b.z)) < scarto;

export const nomeBevanda = (id, bevande) => NOMI.bevande?.[id] ?? bevande[id]?.nome ?? id;

export const dentroSala = (x, z) => x >= SALA.x0 && x <= SALA.x1 && z >= SALA.z0 && z <= SALA.z1;
