import { R } from './regole.js';
import { A } from './abisso/costanti.js';
import { PORTE_INIZIALI } from './mappe/abisso.js';
import { statoIniziale as nuovoStato, dialogo } from './abisso/stato.js';
import { aggiornaAllagamento, aggiornaOssigeno } from './abisso/acqua.js';
import { sparaGlobo, richiestaCollasso, aggiornaGlobi, aggiornaSfere, onda, lanciaDardo, aggiornaDardi, aggiornaPozze, sonica, para as paraColpo } from './abisso/meraviglie.js';
import { programma, aggiornaPalombari, dannoPalombaro } from './abisso/palombaro.js';
import { aggiornaLeviatano, dannoLeviatano, caricaPilone } from './abisso/leviatano.js';
import { compra as compraMissione, aggiornaMissione, nota, completaMissione } from './abisso/missione.js';

export { istantanea, espandi, valida, validaAzione } from './abisso/rete.js';
export { descrivi, obiettivo, inventario, DIALOGHI } from './abisso/testi.js';
export { livelloAcqua, sottAcqua } from './abisso/acqua.js';
export { PASSO, A, ELENCO_BEVANDE, ARMI_MERAVIGLIA } from './abisso/costanti.js';
export { PORTE_INIZIALI };

export const statoIniziale = seme => nuovoStato(seme);

export function compra(stato, giocatore, acquisto, eventi, S) {
  return compraMissione(stato, stato.abisso, giocatore, acquisto, eventi, S);
}

export function azione(stato, giocatore, a, eventi, S) {
  const ab = stato.abisso;
  if (a.cosa === 'globo') sparaGlobo(stato, ab, giocatore, a, eventi);
  else if (a.cosa === 'collassa') richiestaCollasso(stato, ab, giocatore, a, eventi, S);
  else if (a.cosa === 'onda') onda(stato, ab, giocatore, a, eventi, S);
  else if (a.cosa === 'dardo') lanciaDardo(stato, ab, giocatore, a, eventi);
  else if (a.cosa === 'sonica') sonica(stato, ab, giocatore, a, eventi, S);
}

export function dannoEffettivo(stato, zombie, danno, opzioni, giocatore) {
  if (zombie.tipo === 'palombaro') return dannoPalombaro(zombie, danno, opzioni, giocatore);
  if (zombie.tipo === 'leviatano') return dannoLeviatano(stato.abisso, danno, opzioni);
  return danno;
}

export function suUccisione(stato, zombie, opzioni, eventi) {
  if (opzioni.smembra || opzioni.cariddi) eventi.push({ k: 'smembra', zombie: zombie.id, x: zombie.x, z: zombie.z });
}

export function inizioRound(stato, eventi, S) {
  const ab = stato.abisso;
  if (stato.round === 1) dialogo(ab, 'intro', eventi);
  programma(stato, ab, S);
}

export const bossInAttesa = stato => stato.abisso.palombaroTra !== null;

export const rialzoInArrivo = stato => stato.giocatori.length === 1 && stato.giocatori.some(g => g.stato === 'terra' && stato.abisso.avevaRitorno[g.id] && (stato.abisso.autoRianimazioni[g.id] ?? 0) < A.AUTORIANIMAZIONI);

export const para = (stato, giocatore, zombie, eventi) => paraColpo(stato, stato.abisso, giocatore, zombie, eventi);

export function tipoZombie(stato, estratto) {
  const r = stato.round;
  const pesi = [
    ['anfibio', 1],
    ['sommozzatore', r > R.ROUND_TRANQUILLI ? 0.25 + Math.min(0.35, (r - R.ROUND_TRANQUILLI - 1) * 0.04) : 0],
    ['elettrico', stato.abisso.protocollo && r > 5 ? 0.12 : 0],
  ].filter(([, p]) => p > 0);
  let soglia = estratto * pesi.reduce((s, [, p]) => s + p, 0);
  for (const [tipo, p] of pesi) {
    soglia -= p;
    if (soglia < 0) return tipo;
  }
  return pesi[pesi.length - 1][0];
}

export function aggiorna(stato, dt, eventi, S) {
  const ab = stato.abisso;
  aggiornaMissione(stato, ab, dt, eventi, S);
  aggiornaAllagamento(ab, dt, eventi);
  aggiornaOssigeno(stato, ab, dt, eventi, S);
  aggiornaGlobi(stato, ab, dt, eventi, S);
  aggiornaSfere(stato, ab, dt, eventi);
  aggiornaDardi(stato, ab, dt, eventi, S, ({ canna, pilone }) => {
    if (canna >= 0) nota(stato, ab, canna, eventi, S);
    if (pilone >= 0) caricaPilone(stato, ab, pilone, eventi);
  });
  aggiornaPozze(stato, ab, dt, eventi, S);
  aggiornaPalombari(stato, ab, dt, eventi, S);
}

export function aggiornaFinale(stato, dt, eventi, S) {
  const ab = stato.abisso;
  if (!ab.leviatano) {
    stato.fase = 'intervallo';
    stato.timerFase = R.INTERVALLO;
    stato.finale = null;
    return;
  }
  aggiornaLeviatano(stato, ab, dt, eventi, S, () => completaMissione(stato, ab, eventi, S));
}
