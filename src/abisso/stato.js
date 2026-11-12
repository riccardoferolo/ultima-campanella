import { passoCaso } from '../caso.js';
import { PASSO } from './costanti.js';
import { PARTI_SCUDO, SIMBOLI } from '../mappe/abisso.js';

function generatore(seme) {
  let s = (seme ^ 0x2545f491) >>> 0;
  return () => {
    const [v, nuovo] = passoCaso(s);
    s = nuovo;
    return v;
  };
}

function mescola(elenco, caso) {
  const copia = [...elenco];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(caso() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function statoIniziale(seme = 1) {
  const caso = generatore(seme >>> 0);
  return {
    passo: PASSO.PROTOCOLLO,
    protocollo: false,
    turbine: [0, 0, 0],
    valvole: { ordine: mescola([0, 1, 2, 3], caso), premute: [], tempo: 0 },
    allagamento: { livello: 0, verso: 0, durata: 0 },
    barre: [false, false, false],
    fucina: false,
    nodi: [0, 0, 0, 0],
    stagna: { chiusa: false, decompressione: 0, riapertura: 0, attesa: 0 },
    nucleo: 0,
    portatore: null,
    tridenti: false,
    inno: { sequenza: mescola([0, 1, 2, 3, 4], caso), canne: mescola(SIMBOLI.map((_, i) => i), caso), progresso: 0, attesa: 0, errori: 0 },
    scudo: { posti: PARTI_SCUDO.map(posti => Math.floor(caso() * posti.length)), prese: [false, false, false], costruito: false },
    scudi: {},
    attesaScudo: {},
    bolle: {},
    ossigeno: {},
    annega: {},
    condotti: {},
    attesaCondotto: {},
    attese: {},
    globi: [],
    dardi: [],
    pozze: [],
    sfere: [],
    nubi: [],
    arpioni: [],
    prossimoId: 1,
    prossimoPalombaro: 8,
    palombaroTra: null,
    autoRianimazioni: {},
    rianimaTra: {},
    avevaRitorno: {},
    perkaholic: [],
    leviatano: null,
    completata: false,
    dialoghi: [],
  };
}

export const r2 = n => Math.round(n * 100) / 100;
export const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export const vivi = stato => stato.giocatori.filter(g => g.stato === 'vivo');
export const nuovoId = ab => ab.prossimoId++;

export function attesa(ab, id, chiave) {
  return ab.attese[id]?.[chiave] ?? 0;
}

export function imposta(ab, id, chiave, valore) {
  ab.attese[id] ??= {};
  ab.attese[id][chiave] = valore;
}

export function dialogo(ab, chiave, eventi) {
  if (ab.dialoghi.includes(chiave)) return;
  ab.dialoghi.push(chiave);
  eventi.push({ k: 'radioAbisso', chiave });
}
