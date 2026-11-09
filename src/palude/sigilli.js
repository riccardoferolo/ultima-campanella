import { R, ARMI, vitaZombie } from '../regole.js';
import { MISSIONE } from '../mappe/palude.js';
import { zonaDi } from '../mappa.js';
import { aggiungiColpo, svuotaColpi } from './colpi.js';

export const TOTEM = Object.freeze(['capanna', 'cimitero', 'rapide']);
export const BOMBOLE = MISSIONE.BOMBOLE.length;
export const VALVOLE = MISSIONE.VALVOLE.length;
export const AMULETO = Object.freeze({ NASCOSTO: 0, LIBERO: 1, PRESO: 2, MESSO: 3 });
export const DURATA_VALVOLE = 40;

const BIT = Object.freeze({ capanna: 1, cimitero: 2, rapide: 4 });
const DANNO_MIASMA = 4;
const OGNI_MIASMA = 0.5;
const RAGGIO_BOMBOLA = 4.5;
const DANNO_BOMBOLA = 2.5;
const DURATA_RITUALE = 60;
const RAGGIO_RITUALE = 9;
const RAGGIO_ASSEDIO = 2.6;
const CALO_ASSEDIO = 0.012;
const ASSEDIANTI_MAX = 4;
const TOMBA_OGNI = 2.2;
const VITA_LENTI = 1.6;
const RICARICA_VALVOLE = 8;
const SCARICA_OGNI = 2.6;
const PREAVVISO_SCARICA = 1.2;
const RAGGIO_SCARICA = 1.6;
const SCARTO_SCARICA = 1.4;
const DANNO_SCOSSA = 40;
const PUNTI_TOTEM = 500;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function statoSigilli() {
  return {
    bombole: Array(BOMBOLE).fill(false), amuleto: AMULETO.NASCOSTO, portatore: '', miasma: OGNI_MIASMA,
    rituale: 0, progresso: 0, assedio: 0, attesaTomba: 0, tombaLenta: false,
    sequenza: 0, valvole: Array(VALVOLE).fill(false), tempoValvole: 0, ricarica: 0, attesaScarica: 0,
    totem: 0,
  };
}

export const totemSpezzato = (sigilli, nome) => (sigilli.totem & BIT[nome]) !== 0;
export const totemSpezzati = sigilli => TOTEM.filter(t => totemSpezzato(sigilli, t)).length;
export const difesaSigilli = sigilli => sigilli.rituale === 1 || sigilli.sequenza === 1;

function spezza(stato, nome, eventi, S) {
  const palude = stato.palude;
  const sigilli = palude.sigilli;
  if (totemSpezzato(sigilli, nome)) return;
  sigilli.totem |= BIT[nome];
  const rimasti = TOTEM.length - totemSpezzati(sigilli);
  const punto = MISSIONE.TOTEM[nome];
  for (const g of S.vivi(stato)) S.aggiungiPunti(stato, g, PUNTI_TOTEM);
  eventi.push({ k: 'totemSpezzato', totem: nome, rimasti, x: punto.x, z: punto.z });
  if (rimasti > 0) return;
  palude.tana.varco = 1;
  eventi.push({ k: 'barrieraCaduta' });
}

function zombieVivi(stato) {
  let n = 0;
  for (const z of stato.zombie) if (z.stato !== 'morto') n++;
  return n;
}

export function colpisciBombola(stato, giocatore, indice, eventi, S) {
  const sigilli = stato.palude.sigilli;
  if (sigilli.bombole[indice] !== false) return false;
  sigilli.bombole[indice] = true;
  const punto = MISSIONE.BOMBOLE[indice];
  eventi.push({ k: 'bombola', da: giocatore.id, indice, x: punto.x, z: punto.z });
  const base = vitaZombie(Math.max(1, stato.round)) * DANNO_BOMBOLA;
  for (const z of stato.zombie) {
    if (z.stato === 'morto') continue;
    const d = distanza(z, punto);
    if (d <= RAGGIO_BOMBOLA) S.ferisciZombie(stato, giocatore, z, Math.round(base * (1 - (0.5 * d) / RAGGIO_BOMBOLA)), {}, eventi);
  }
  if (!sigilli.bombole.every(Boolean)) return true;
  sigilli.amuleto = AMULETO.LIBERO;
  eventi.push({ k: 'miasmaSvanito' });
  return true;
}

export function compraSigilli(stato, giocatore, acquisto, eventi, S) {
  const sigilli = stato.palude.sigilli;
  const inGioco = stato.fase === 'gioco';
  switch (acquisto.tipo) {
    case 'bombola':
      return true;
    case 'amuleto':
      if (sigilli.amuleto !== AMULETO.LIBERO) return true;
      sigilli.amuleto = AMULETO.PRESO;
      sigilli.portatore = giocatore.id;
      eventi.push({ k: 'amuletoPreso', a: giocatore.id });
      return true;
    case 'totem':
      if (acquisto.totem !== 'capanna' || sigilli.amuleto !== AMULETO.PRESO || sigilli.portatore !== giocatore.id) return true;
      sigilli.amuleto = AMULETO.MESSO;
      sigilli.portatore = '';
      eventi.push({ k: 'amuletoMesso', a: giocatore.id });
      spezza(stato, 'capanna', eventi, S);
      return true;
    case 'purificatore':
      if (sigilli.rituale !== 0 || !stato.corrente || !inGioco) return true;
      Object.assign(sigilli, { rituale: 1, progresso: 0, attesaTomba: 1 });
      eventi.push({ k: 'rituale', da: giocatore.id });
      return true;
    case 'generatoreRapide':
      if (sigilli.sequenza !== 0 || sigilli.ricarica > 0 || !inGioco) return true;
      Object.assign(sigilli, { sequenza: 1, tempoValvole: DURATA_VALVOLE, valvole: Array(VALVOLE).fill(false), attesaScarica: SCARICA_OGNI });
      S.generaZombie(stato, { tipo: 'bruto', finestre: MISSIONE.TANE_RAPIDE });
      eventi.push({ k: 'valvoleVia', da: giocatore.id, secondi: DURATA_VALVOLE });
      return true;
    case 'valvola': {
      if (sigilli.sequenza !== 1 || sigilli.valvole[acquisto.indice]) return true;
      sigilli.valvole[acquisto.indice] = true;
      const chiuse = sigilli.valvole.filter(Boolean).length;
      eventi.push({ k: 'valvola', da: giocatore.id, indice: acquisto.indice, chiuse });
      if (chiuse < VALVOLE) {
        S.generaZombie(stato, { tipo: 'bruto', finestre: MISSIONE.TANE_RAPIDE });
        return true;
      }
      sigilli.sequenza = 2;
      svuotaColpi(stato.palude, 'scarica');
      spezza(stato, 'rapide', eventi, S);
      return true;
    }
    default:
      return false;
  }
}

function aggiornaRituale(stato, dt, eventi, S) {
  const sigilli = stato.palude.sigilli;
  const centro = MISSIONE.PURIFICATORE;
  let assedio = 0;
  for (const z of stato.zombie) if ((z.stato === 'dentro' || z.stato === 'attacco') && distanza(z, centro) <= RAGGIO_ASSEDIO) assedio++;
  sigilli.assedio = assedio;
  const presidiato = S.vivi(stato).some(g => distanza(g, centro) <= RAGGIO_RITUALE);
  if (assedio > 0) sigilli.progresso = Math.max(0, sigilli.progresso - dt * CALO_ASSEDIO * Math.min(ASSEDIANTI_MAX, assedio));
  else if (presidiato) sigilli.progresso = Math.min(1, sigilli.progresso + dt / DURATA_RITUALE);
  if (sigilli.progresso >= 1) {
    sigilli.rituale = 2;
    eventi.push({ k: 'ritualeFinito' });
    spezza(stato, 'cimitero', eventi, S);
    return;
  }
  sigilli.attesaTomba -= dt;
  if (sigilli.attesaTomba > 0 || !presidiato) return;
  sigilli.attesaTomba = TOMBA_OGNI;
  if (zombieVivi(stato) >= R.ZOMBIE_VIVI_MAX) return;
  const tomba = MISSIONE.TOMBE[Math.floor(S.caso(stato) * MISSIONE.TOMBE.length)];
  sigilli.tombaLenta = !sigilli.tombaLenta;
  if (sigilli.tombaLenta) S.generaZombie(stato, { tipo: 'normale', punto: tomba, corre: false, vita: Math.round(vitaZombie(Math.max(1, stato.round)) * VITA_LENTI) });
  else S.generaZombie(stato, { tipo: 'magro', punto: tomba, corre: true });
  eventi.push({ k: 'tomba', x: tomba.x, z: tomba.z });
}

function aggiornaValvole(stato, dt, eventi, S) {
  const sigilli = stato.palude.sigilli;
  const nelleRapide = S.vivi(stato).filter(g => zonaDi(g.x, g.z) === 'rapide');
  sigilli.tempoValvole -= dt;
  if (sigilli.tempoValvole <= 0) {
    Object.assign(sigilli, { sequenza: 0, ricarica: RICARICA_VALVOLE, tempoValvole: 0, valvole: Array(VALVOLE).fill(false) });
    svuotaColpi(stato.palude, 'scarica');
    for (const g of nelleRapide) S.ferisciGiocatore(stato, g, eventi, DANNO_SCOSSA);
    eventi.push({ k: 'scossa' });
    return;
  }
  sigilli.attesaScarica -= dt;
  if (sigilli.attesaScarica > 0) return;
  sigilli.attesaScarica = SCARICA_OGNI;
  for (const g of nelleRapide) {
    aggiungiColpo(stato.palude, 'scarica', g.x + (S.caso(stato) - 0.5) * SCARTO_SCARICA, g.z + (S.caso(stato) - 0.5) * SCARTO_SCARICA, PREAVVISO_SCARICA, RAGGIO_SCARICA);
  }
}

export function aggiornaSigilli(stato, dt, eventi, S) {
  const sigilli = stato.palude.sigilli;
  if (sigilli.amuleto === AMULETO.PRESO) {
    const portatore = stato.giocatori.find(g => g.id === sigilli.portatore);
    if (!portatore || portatore.stato === 'morto') {
      sigilli.amuleto = AMULETO.LIBERO;
      sigilli.portatore = '';
      eventi.push({ k: 'amuletoTornato' });
    }
  }
  if (!sigilli.bombole.every(Boolean)) {
    sigilli.miasma -= dt;
    if (sigilli.miasma <= 0) {
      sigilli.miasma += OGNI_MIASMA;
      for (const g of S.vivi(stato)) if (distanza(g, MISSIONE.MIASMA) <= MISSIONE.MIASMA.raggio) S.ferisciGiocatore(stato, g, eventi, DANNO_MIASMA);
    }
  }
  if (sigilli.rituale === 1) aggiornaRituale(stato, dt, eventi, S);
  if (sigilli.ricarica > 0) sigilli.ricarica = Math.max(0, sigilli.ricarica - dt);
  if (sigilli.sequenza === 1) aggiornaValvole(stato, dt, eventi, S);
}

const nessuno = testo => ({ costo: Infinity, testo });
const pronto = testo => ({ costo: 0, testo });
const tieneTeschio = io => !!ARMI[io.armaAttiva]?.teschio;

function descriviTotem(a, io, vista) {
  const sigilli = vista.palude.sigilli;
  if (totemSpezzato(sigilli, a.totem)) return nessuno('Il totem è spezzato: la sua luce non arriva più alla barriera');
  if (a.totem === 'cimitero') return nessuno('Totem della Corruzione: purificate le lapidi col dispositivo qui accanto');
  if (a.totem === 'rapide') return nessuno('Totem della Corruzione: staccate il generatore sabotato e chiudete le tre valvole in tempo');
  if (sigilli.amuleto === AMULETO.PRESO && sigilli.portatore === io.id) return pronto("Premi F per incastrare l'amuleto nel totem");
  if (sigilli.amuleto === AMULETO.NASCOSTO) return nessuno('Totem della Corruzione avvolto dal miasma: fate esplodere col Teschio le tre bombole di gas');
  return nessuno("Totem della Corruzione: serve l'amuleto antico nascosto nella capanna");
}

function descriviAmuleto(io, vista) {
  const sigilli = vista.palude.sigilli;
  if (sigilli.amuleto === AMULETO.NASCOSTO) return nessuno(`Un amuleto antico, soffocato dal miasma: fate esplodere le bombole (${sigilli.bombole.filter(Boolean).length}/${BOMBOLE})`);
  if (sigilli.amuleto === AMULETO.LIBERO) return pronto("Premi F per prendere l'amuleto antico");
  if (sigilli.amuleto === AMULETO.PRESO) return nessuno(sigilli.portatore === io.id ? "Hai l'amuleto: incastralo nel totem davanti alla capanna" : "Qualcuno ha già preso l'amuleto");
  return nessuno('Il piedistallo è vuoto');
}

function descriviPurificatore(vista) {
  const sigilli = vista.palude.sigilli;
  if (sigilli.rituale === 2) return nessuno('Il dispositivo ha purificato le lapidi');
  if (sigilli.rituale === 1) return nessuno(`Purificazione ${Math.round(sigilli.progresso * 100)}%${sigilli.assedio ? ': il dispositivo è assediato, liberatelo!' : ': restate vicini'}`);
  if (!vista.corrente) return nessuno('Il dispositivo di purificazione è senza corrente: riavviate il motore della segheria');
  if (vista.fase !== 'gioco') return nessuno('La purificazione si avvia solo durante un round');
  return pronto('Premi F per avviare la purificazione (dovrete difendere il dispositivo)');
}

function descriviGeneratore(vista) {
  const sigilli = vista.palude.sigilli;
  if (sigilli.sequenza === 2) return nessuno('Il generatore sabotato è spento');
  if (sigilli.sequenza === 1) return nessuno(`Chiudete le valvole: ${sigilli.valvole.filter(Boolean).length}/${VALVOLE}, ${Math.ceil(sigilli.tempoValvole)} s`);
  if (sigilli.ricarica > 0) return nessuno(`Il generatore si riarma: ${Math.ceil(sigilli.ricarica)} s`);
  if (vista.fase !== 'gioco') return nessuno('Il generatore si stacca solo durante un round');
  return pronto(`Premi F per staccare il generatore: poi chiudete le tre valvole entro ${DURATA_VALVOLE} secondi`);
}

function descriviValvola(a, vista) {
  const sigilli = vista.palude.sigilli;
  if (sigilli.sequenza === 2) return nessuno('La valvola è chiusa: l’acqua non scotta più');
  if (sigilli.sequenza === 0) return nessuno('Valvola a pressione: prima staccate il generatore sabotato');
  if (sigilli.valvole[a.indice]) return nessuno('Valvola chiusa: correte alle altre!');
  return pronto('Premi F per chiudere la valvola');
}

export function descriviSigilli(a, io, vista) {
  const sigilli = vista.palude.sigilli;
  switch (a.tipo) {
    case 'totem': return descriviTotem(a, io, vista);
    case 'amuleto': return descriviAmuleto(io, vista);
    case 'bombola':
      if (sigilli.bombole[a.indice]) return nessuno('Della bombola resta solo lamiera annerita');
      return nessuno(tieneTeschio(io) ? 'Bombola di gas: allontanati, carica il Teschio e scaglialo qui' : 'Bombola di gas del miasma: si fa esplodere col Teschio di Malakor');
    case 'purificatore': return descriviPurificatore(vista);
    case 'generatoreRapide': return descriviGeneratore(vista);
    case 'valvola': return descriviValvola(a, vista);
    default: return null;
  }
}

const NOMI_TOTEM = Object.freeze({ capanna: 'capanna dello sciamano', cimitero: 'cimitero dei relitti', rapide: 'rapide di Fangoso' });

function passoTotem(sigilli, nome) {
  if (nome === 'capanna') {
    if (sigilli.amuleto === AMULETO.NASCOSTO) return `bombole di gas ${sigilli.bombole.filter(Boolean).length}/${BOMBOLE} col Teschio`;
    if (sigilli.amuleto === AMULETO.LIBERO) return "prendete l'amuleto nella capanna";
    return "l'amuleto nel totem";
  }
  if (nome === 'cimitero') return 'avviate la purificazione';
  return 'staccate il generatore';
}

export function obiettivoSigilli(vista, mioId) {
  const sigilli = vista.palude.sigilli;
  if (sigilli.rituale === 1) return `Difendete il dispositivo del cimitero: ${Math.round(sigilli.progresso * 100)}%${sigilli.assedio ? ' — è assediato!' : ''}`;
  if (sigilli.sequenza === 1) return `Chiudete le valvole delle rapide: ${sigilli.valvole.filter(Boolean).length}/${VALVOLE}, ${Math.ceil(sigilli.tempoValvole)} s`;
  const io = vista.giocatori.find(g => g.id === mioId) ?? { x: 0, z: 0 };
  const restanti = TOTEM.filter(t => !totemSpezzato(sigilli, t));
  const vicino = restanti.reduce((a, b) => (distanza(io, MISSIONE.TOTEM[a]) <= distanza(io, MISSIONE.TOTEM[b]) ? a : b));
  return `Totem spezzati ${TOTEM.length - restanti.length}/${TOTEM.length} · ${NOMI_TOTEM[vicino]}: ${passoTotem(sigilli, vicino)}`;
}
