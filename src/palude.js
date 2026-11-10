import { R, ARMI, TIPI_ZOMBIE, vitaZombie, pesiZombie } from './regole.js';
import { OSTACOLI } from './mappa.js';
import { MISSIONE } from './mappe/palude.js';
import { TIPI_COLPO, statoColpi, aggiornaColpi } from './palude/colpi.js';
import {
  TOTEM, BOMBOLE, VALVOLE, AMULETO, statoSigilli, totemSpezzati, difesaSigilli, colpisciBombola, compraSigilli, aggiornaSigilli, descriviSigilli, obiettivoSigilli,
} from './palude/sigilli.js';
import {
  AZIONI, VARCO, MISSIONE_COMPIUTA, statoTana, compraVarco, colpisciBozzolo, colpoSulSoffitto, dannoArachne, aggiornaFinale as aggiornaTana, descriviVarco, obiettivoTana,
} from './palude/tana.js';
import { statoCariche, raggio, avviaCarica, fermaCarica, aggiornaCariche, istantaneaLevitati, espandiLevitati } from './palude/teschio.js';
import {
  ELEMENTI, ARMA_ELEMENTO, PASSO, PROVE, statoReliquie, elementoDi, armaDallAltare, compraReliquie, uccisioneReliquie, difesaReliquieAttiva, aggiornaReliquie,
  istantaneaReliquie, espandiReliquie, descriviReliquie, obiettivoReliquia,
} from './palude/reliquie.js';

export { sulleRocce, DURATA_CALA, DURATA_SALITA } from './palude/tana.js';
export { TOTEM, AMULETO, VARCO, ELEMENTI, ARMA_ELEMENTO, PASSO, PROVE, elementoDi };

export const GRATA_LABORATORIO = 'pLaboratorio';
export const RADICI = 'pRadici';
export const TESCHIO = 'teschio';

const TOLLERANZA = 0.8;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const centro = o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 });
export const posizioneAltare = () => centro(OSTACOLI.find(o => o.tipo === 'altare'));
export const haTeschio = giocatore => giocatore.armi.some(a => ARMI[a]?.teschio);
const tieneTeschio = giocatore => !!ARMI[giocatore.armaAttiva]?.teschio;
const arrotonda = v => Math.round(v * 100) / 100;

export function statoIniziale() {
  return {
    altare: 0, elementi: statoReliquie(), fuochi: [], prossimoFuoco: 1,
    sigilli: statoSigilli(), tana: statoTana(), ...statoColpi(), ...statoCariche(),
  };
}

const PESO_RAGNI = 0.1;
const PESO_RAGNI_PER_TOTEM = 0.08;
const PESO_BRUTI = 0.05;
const ROUND_BRUTI = 12;

export function pesiPalude(stato) {
  const spezzati = totemSpezzati(stato.palude.sigilli);
  return {
    ...pesiZombie(stato.round),
    ragno: spezzati ? PESO_RAGNI + PESO_RAGNI_PER_TOTEM * spezzati : 0,
    bruto: spezzati >= 2 || stato.round >= ROUND_BRUTI ? PESO_BRUTI : 0,
  };
}

export function tipoZombie(stato, estratto) {
  const pesi = Object.entries(pesiPalude(stato)).filter(([, p]) => p > 0);
  let soglia = estratto * pesi.reduce((somma, [, p]) => somma + p, 0);
  for (const [tipo, p] of pesi) {
    soglia -= p;
    if (soglia < 0) return tipo;
  }
  return pesi[pesi.length - 1][0];
}

export const difesaAttiva = stato => difesaSigilli(stato.palude.sigilli) || difesaReliquieAttiva(stato.palude);

export function dannoEffettivo(stato, zombie, danno, opzioni) {
  if (zombie.tipo === 'arachne') return dannoArachne(stato, zombie, danno, opzioni);
  const corazza = TIPI_ZOMBIE[zombie.tipo]?.corazza;
  if (!corazza || opzioni.testa || opzioni.coltello || opzioni.teschio || opzioni.frantumato || stato.effetti?.secco > 0) return danno;
  return danno * corazza;
}

export const aggiornaFinale = aggiornaTana;

export const altarePronto = palude => palude.altare >= R.ANIME_ALTARE;

export function compra(stato, giocatore, acquisto, eventi, S) {
  switch (acquisto.tipo) {
    case 'motoreSegheria':
      if (stato.corrente) return true;
      stato.corrente = true;
      eventi.push({ k: 'corrente', da: giocatore.id });
      if (!stato.porte.includes(GRATA_LABORATORIO)) {
        stato.porte.push(GRATA_LABORATORIO);
        eventi.push({ k: 'porta', id: GRATA_LABORATORIO, da: giocatore.id });
      }
      return true;
    case 'altareTeschio':
      if (!altarePronto(stato.palude) || haTeschio(giocatore)) return true;
      giocatore.anime ??= R.TESCHIO_ANIME_INIZIALI;
      S.prendiArma(stato, giocatore, armaDallAltare(stato.palude, giocatore), eventi);
      eventi.push({ k: 'teschio', a: giocatore.id });
      return true;
    case 'radici':
      if (stato.porte.includes(RADICI) || !tieneTeschio(giocatore) || (giocatore.anime ?? 0) < R.TESCHIO_COSTO_RADICI) return true;
      giocatore.anime -= R.TESCHIO_COSTO_RADICI;
      stato.porte.push(RADICI);
      eventi.push({ k: 'radiciBruciate', da: giocatore.id });
      return true;
    case 'reliquia':
    case 'oggettoElemento':
    case 'difesaReliquia':
      return compraReliquie(stato, giocatore, acquisto, eventi, S);
    case 'munizioni':
      return tieneTeschio(giocatore);
    case 'varco':
      compraVarco(stato, giocatore, eventi);
      return true;
    default:
      return compraSigilli(stato, giocatore, acquisto, eventi, S);
  }
}

export function suUccisione(stato, zombie, giocatore, eventi) {
  if (!giocatore) return;
  const palude = stato.palude;
  if (stato.corrente && !altarePronto(palude) && distanza(zombie, posizioneAltare()) <= R.RAGGIO_ALTARE) {
    palude.altare += 1;
    eventi.push({ k: 'animaAltare', x: zombie.x, z: zombie.z, anime: palude.altare });
    if (altarePronto(palude)) eventi.push({ k: 'altarePronto' });
  }
  if (haTeschio(giocatore)) giocatore.anime = Math.min(R.TESCHIO_ANIME_MAX, (giocatore.anime ?? 0) + 1);
  uccisioneReliquie(stato, zombie, giocatore, eventi);
}

const nelRaggio = (stato, punto, raggio) => stato.zombie.filter(z => z.stato !== 'morto' && distanza(z, punto) <= raggio);

const OGGETTI_TESCHIO = Object.freeze({ bombola: MISSIONE.BOMBOLE, bozzolo: MISSIONE.BOZZOLI });

function colpisciOggetto(stato, giocatore, id, eventi, S) {
  const [tipo, numero] = id.split('-');
  const indice = Number(numero);
  const punto = Number.isInteger(indice) ? OGGETTI_TESCHIO[tipo]?.[indice] : null;
  if (!punto || (giocatore.anime ?? 0) < R.TESCHIO_COSTO_RAGGIO || distanza(giocatore, punto) > R.TESCHIO_PORTATA + TOLLERANZA) return;
  const colpito = tipo === 'bombola' ? colpisciBombola(stato, giocatore, indice, eventi, S) : colpisciBozzolo(stato, giocatore, indice, eventi, S);
  if (colpito) giocatore.anime -= R.TESCHIO_COSTO_RAGGIO;
}

export function implodi(stato, giocatore, azione, eventi, S) {
  const teschio = giocatore.armi.find(a => ARMI[a]?.teschio);
  if (!teschio) return;
  if (azione.carica === true) giocatore.armaAttiva = teschio;
  if (typeof azione.carica === 'boolean') {
    if (!azione.carica) fermaCarica(stato, giocatore, eventi);
    else avviaCarica(stato, giocatore, eventi);
    return;
  }
  if (typeof azione.oggetto === 'string') {
    colpisciOggetto(stato, giocatore, azione.oggetto, eventi, S);
    return;
  }
  const bersaglio = stato.zombie.find(z => z.id === azione.zombie && z.stato !== 'morto');
  if (!bersaglio || distanza(giocatore, bersaglio) > R.TESCHIO_PORTATA + TOLLERANZA) return;
  if (bersaglio.tipo === 'arachne' && stato.palude.tana.fase === 3) {
    colpoSulSoffitto(stato, giocatore, bersaglio, eventi, S);
    return;
  }
  raggio(stato, giocatore, bersaglio, eventi, S, teschio);
}

export function aggiorna(stato, dt, eventi, S) {
  const palude = stato.palude;
  aggiornaReliquie(stato, dt, eventi, S);
  palude.fuochi = palude.fuochi.filter(f => {
    f.timer -= dt;
    for (const z of nelRaggio(stato, f, R.FUOCO_CHIAZZA_RAGGIO)) {
      if (S.tipoDi(z).boss) continue;
      z.ardore = Math.max(z.ardore ?? 0, R.FUOCO_ARDORE / 2);
      z.ardoreDa ??= f.da;
    }
    return f.timer > 0;
  });
  const danno = Math.round(vitaZombie(Math.max(1, stato.round)) * R.FUOCO_DANNO_ARDORE);
  for (const z of stato.zombie) {
    if (!(z.ardore > 0) || z.stato === 'morto') continue;
    z.ardore -= dt;
    z.ardoreTick = (z.ardoreTick ?? R.FUOCO_OGNI) - dt;
    if (z.ardoreTick > 0) continue;
    z.ardoreTick += R.FUOCO_OGNI;
    const giocatore = stato.giocatori.find(g => g.id === z.ardoreDa) ?? stato.giocatori[0];
    if (giocatore) S.ferisciZombie(stato, giocatore, z, danno, {}, eventi);
  }
  aggiornaCariche(stato, dt, eventi, S);
  if (stato.fase !== 'finale') aggiornaSigilli(stato, dt, eventi, S);
  aggiornaColpi(stato, dt, eventi, S, stato.fase === 'finale' ? MISSIONE.POZZE_ACIDO : []);
}

const CHIAVI_MISSIONE = Object.freeze([
  'bombole', 'amuleto', 'portatore', 'rituale', 'progresso', 'assedio', 'sequenza', 'valvole', 'tempoValvole', 'ricarica',
  'totem', 'varco', 'fase', 'azione', 'timer', 'vulnerabile', 'acqua', 'bozzoli', 'pieniFatti', 'pieniServono',
]);
export const LUNGHEZZA_MISSIONE = CHIAVI_MISSIONE.length;
const maschera = elenco => elenco.reduce((m, si, i) => m | (si ? 1 << i : 0), 0);
const daMaschera = (m, n) => Array.from({ length: n }, (_, i) => !!(m & (1 << i)));

function istantaneaMissione(stato) {
  const { sigilli: s, tana: t } = stato.palude;
  const valori = {
    bombole: maschera(s.bombole), amuleto: s.amuleto, portatore: stato.giocatori.findIndex(g => g.id === s.portatore), rituale: s.rituale,
    progresso: Math.round(s.progresso * 1000) / 10, assedio: s.assedio, sequenza: s.sequenza, valvole: maschera(s.valvole),
    tempoValvole: arrotonda(Math.max(0, s.tempoValvole)), ricarica: arrotonda(s.ricarica), totem: s.totem, varco: t.varco, fase: t.fase,
    azione: Math.max(0, AZIONI.indexOf(t.azione)), timer: arrotonda(Math.max(0, t.timer)), vulnerabile: arrotonda(t.vulnerabile),
    acqua: Math.round(t.acqua * 100), bozzoli: maschera(t.bozzoli.map(b => b === 0)), pieniFatti: t.pieniFatti, pieniServono: t.pieniServono,
  };
  return CHIAVI_MISSIONE.map(k => valori[k]);
}

function espandiMissione(pm, giocatori) {
  const v = Object.fromEntries(CHIAVI_MISSIONE.map((k, i) => [k, pm?.[i] ?? 0]));
  return {
    sigilli: {
      bombole: daMaschera(v.bombole, BOMBOLE), amuleto: v.amuleto, portatore: giocatori?.[v.portatore]?.id ?? '', rituale: v.rituale,
      progresso: v.progresso / 100, assedio: v.assedio, sequenza: v.sequenza, valvole: daMaschera(v.valvole, VALVOLE),
      tempoValvole: v.tempoValvole, ricarica: v.ricarica, totem: v.totem,
    },
    tana: {
      varco: v.varco, fase: v.fase, azione: AZIONI[v.azione] ?? '', timer: v.timer, vulnerabile: v.vulnerabile, acqua: v.acqua / 100,
      bozzoli: daMaschera(v.bozzoli, MISSIONE.BOZZOLI.length), pieniFatti: v.pieniFatti, pieniServono: v.pieniServono,
    },
  };
}

export function istantanea(stato) {
  const palude = stato.palude;
  if (!palude) return { pl: [] };
  return {
    pl: [palude.altare],
    pe: istantaneaReliquie(palude),
    pf: palude.fuochi.map(f => [f.id, arrotonda(f.x), arrotonda(f.z), arrotonda(Math.max(0, f.timer))]),
    pa: stato.zombie.filter(z => z.ardore > 0 && z.stato !== 'morto').map(z => z.id),
    pm: istantaneaMissione(stato),
    pc: palude.colpi.map(c => [c.id, arrotonda(c.x), arrotonda(c.z), arrotonda(Math.max(0, c.timer)), TIPI_COLPO.indexOf(c.tipo), c.raggio]),
    pp: palude.pozze.map(p => [p.id, arrotonda(p.x), arrotonda(p.z), arrotonda(Math.max(0, p.timer)), p.raggio]),
    pv: Object.entries(palude.invischiati).map(([id, t]) => [id, arrotonda(t)]),
    pz: istantaneaLevitati(stato),
  };
}

export function espandi(ist) {
  if (!ist.pl?.length) return null;
  return {
    altare: ist.pl[0],
    elementi: espandiReliquie(ist.pe),
    fuochi: (ist.pf ?? []).map(([id, x, z, timer]) => ({ id, x, z, timer })),
    ardenti: ist.pa ?? [],
    ...espandiMissione(ist.pm, ist.g),
    colpi: (ist.pc ?? []).map(([id, x, z, timer, tipo, raggio]) => ({ id, x, z, timer, tipo: TIPI_COLPO[tipo] ?? 'acido', raggio })),
    pozze: (ist.pp ?? []).map(([id, x, z, timer, raggio]) => ({ id, x, z, timer, raggio })),
    invischiati: Object.fromEntries(ist.pv ?? []),
    levitati: espandiLevitati(ist.pz),
  };
}

export const invischiato = (vista, id) => (vista?.palude?.invischiati?.[id] ?? 0) > 0;

const BOMBOLA = Object.freeze({ alto: 1.6, raggio: 0.55, quota: 0.9, raggioTesta: 0.5 });
const BOZZOLO = Object.freeze({ alto: 3.4, raggio: 0.7, quota: 2.5, raggioTesta: 0.8 });
const bersaglio = (id, p, forma) => ({ id, x: p.x, z: p.z, alto: forma.alto, raggio: forma.raggio, raggioTesta: forma.raggioTesta, testa: { x: p.x, y: forma.quota, z: p.z } });

export function bersagliPalude(vista) {
  const palude = vista.palude;
  if (!palude?.sigilli) return [];
  const elenco = [];
  palude.sigilli.bombole.forEach((fatta, i) => { if (!fatta) elenco.push(bersaglio(`bombola-${i}`, MISSIONE.BOMBOLE[i], BOMBOLA)); });
  const fase = palude.tana.fase;
  if (fase >= 1 && fase <= 3) palude.tana.bozzoli.forEach((pieno, i) => { if (pieno) elenco.push(bersaglio(`bozzolo-${i}`, MISSIONE.BOZZOLI[i], BOZZOLO)); });
  return elenco;
}

const nessuno = testo => ({ costo: Infinity, testo });

function descriviAltare(io, vista) {
  const anime = vista.palude.altare;
  if (anime < R.ANIME_ALTARE) return nessuno(`Altare del Teschio: anime ${anime}/${R.ANIME_ALTARE} — uccidete gli zombie intorno all'altare`);
  if (io.armi.some(x => ARMI[x]?.teschio)) return nessuno('Il Teschio di Malakor è già con te');
  return { costo: 0, testo: 'Premi F per prendere il Teschio di Malakor' };
}

function descriviRadici(io, vista) {
  if (vista.porte.has(RADICI)) return nessuno('Delle radici resta solo cenere');
  if (!ARMI[io.armaAttiva]?.teschio) return nessuno('Radici corrotte: serve il Teschio di Malakor in mano');
  if ((vista.giocatori.find(g => g.id === io.id)?.anime ?? 0) < R.TESCHIO_COSTO_RADICI) return nessuno(`Il Teschio ha fame: servono ${R.TESCHIO_COSTO_RADICI} anime`);
  return { costo: 0, testo: `Premi F per bruciare le radici col Teschio [${R.TESCHIO_COSTO_RADICI} anime]` };
}

export function descrivi(a, io, vista) {
  switch (a.tipo) {
    case 'motoreSegheria': return vista.corrente ? nessuno('Il motore della segheria gira: la corrente è accesa') : { costo: 0, testo: 'Premi F per riavviare il motore della segheria' };
    case 'altareTeschio': return descriviAltare(io, vista);
    case 'radici': return descriviRadici(io, vista);
    case 'reliquia':
    case 'oggettoElemento':
    case 'difesaReliquia':
      return descriviReliquie(a, io, vista);
    case 'munizioni': return ARMI[io.armaAttiva]?.teschio ? nessuno('Il Teschio non usa munizioni: si nutre delle anime dei nemici') : null;
    case 'potenziatore': return ARMI[io.armaAttiva]?.teschio ? nessuno('Il Teschio non si potenzia con le macchine: le statue del tempio lo infondono') : null;
    case 'varco': return descriviVarco(io, vista, totemSpezzati(vista.palude.sigilli), TOTEM.length);
    default: return descriviSigilli(a, io, vista);
  }
}


export function obiettivo(vista, mioId) {
  const palude = vista.palude;
  if (!palude || vista.fase === 'attesa') return '';
  if (palude.tana.fase > 0) return obiettivoTana(vista, mioId);
  if (vista.round === 0) return '';
  if (!vista.corrente) return 'Riavviate il motore della segheria per aprire la discesa al tempio';
  if (palude.altare < R.ANIME_ALTARE) return `Uccidete gli zombie intorno all'altare del tempio di Malakor: anime ${palude.altare}/${R.ANIME_ALTARE}`;
  const io = vista.giocatori.find(g => g.id === mioId);
  if (io && io.stato !== 'morto' && !io.armi.some(a => ARMI[a]?.teschio)) return "Prendi il Teschio di Malakor dall'altare";
  if (palude.tana.varco === VARCO.APERTO) return 'Preparatevi, poi saltate tutti insieme nella tana di Arachne, al cuore della palude';
  if (palude.tana.varco === VARCO.MEMBRANA) return 'La barriera è caduta: bruciate col Teschio la membrana sul varco al cuore della palude';
  if (!vista.porte.has(RADICI)) return 'Bruciate col Teschio le radici che sbarrano la passerella dello sciamano';
  return obiettivoSigilli(vista, mioId);
}

export function secondario(vista, mioId) {
  const palude = vista.palude;
  if (!palude || vista.fase === 'attesa' || vista.round === 0 || (palude.tana.fase > 0 && palude.tana.fase < MISSIONE_COMPIUTA)) return '';
  const io = vista.giocatori.find(g => g.id === mioId);
  if (!io?.armi.some(a => ARMI[a]?.teschio)) return '';
  return obiettivoReliquia(vista, mioId);
}
