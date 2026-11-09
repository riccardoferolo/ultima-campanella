import { R, ARMI, TIPI_ZOMBIE, vitaZombie, pesiZombie } from './regole.js';
import { OSTACOLI, ACQUISTI, ZONE, zonaDi, ostacoliPerGiocatori } from './mappa.js';
import { MISSIONE } from './mappe/palude.js';
import { muoviCerchio } from './fisica.js';
import { TIPI_COLPO, statoColpi, aggiornaColpi } from './palude/colpi.js';
import {
  TOTEM, BOMBOLE, VALVOLE, AMULETO, statoSigilli, totemSpezzati, difesaSigilli, colpisciBombola, compraSigilli, aggiornaSigilli, descriviSigilli, obiettivoSigilli,
} from './palude/sigilli.js';
import {
  AZIONI, VARCO, statoTana, compraVarco, colpisciBozzolo, colpoSulSoffitto, dannoArachne, aggiornaFinale as aggiornaTana, descriviVarco, obiettivoTana,
} from './palude/tana.js';

export { sulleRocce, DURATA_CALA, DURATA_SALITA } from './palude/tana.js';
export { TOTEM, AMULETO, VARCO };

export const GRATA_LABORATORIO = 'pLaboratorio';
export const RADICI = 'pRadici';
export const TESCHIO = 'teschio';
export const ELEMENTI = Object.freeze(['ghiaccio', 'fuoco', 'vuoto', 'vento']);
export const ARMA_ELEMENTO = Object.freeze({ ghiaccio: 'teschioGhiaccio', fuoco: 'teschioFuoco', vuoto: 'teschioVuoto', vento: 'teschioVento' });
export const PASSO = Object.freeze({ OGGETTI: 0, ANIME: 1, PRONTO: 2, FATTO: 3 });
export const PROVE = Object.freeze({
  ghiaccio: Object.freeze({ nome: 'Ghiaccio', luogo: 'nel laboratorio', oggetto: 'la ghiacciaia', verbo: 'gelare', oggetti: 'gela col Teschio le tre ghiacciaie (laboratorio, baracche, segheria)', anime: 'uccidete zombie dentro il laboratorio' }),
  fuoco: Object.freeze({ nome: 'Fuoco', luogo: 'nella distilleria', oggetto: 'il braciere', verbo: 'accendere', oggetti: 'accendi col Teschio i tre bracieri (aia, piazzale, cortile)', anime: 'uccidete zombie vicino ai bracieri' }),
  vuoto: Object.freeze({ nome: 'Vuoto', luogo: 'al mausoleo del cimitero', oggetto: 'la lapide che sussurra', verbo: 'ascoltare', oggetti: 'ascolta col Teschio le tre lapidi che sussurrano nel cimitero', anime: 'uccidete zombie vicino al mausoleo' }),
  vento: Object.freeze({ nome: 'Vento', luogo: 'sotto la torre radio', oggetto: 'la girandola', verbo: 'far girare', oggetti: 'fai girare col Teschio le tre girandole sulle passerelle', anime: 'uccidete zombie stando su una passerella' }),
});

const OGGETTI_PER_PROVA = 3;
const TOLLERANZA = 0.8;
const VICINO_BRACIERE = 6;
const VICINO_MAUSOLEO = 8;
const ZONE_FREDDE = Object.freeze(['laboratorio', 'scala']);

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const centro = o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 });
export const posizioneAltare = () => centro(OSTACOLI.find(o => o.tipo === 'altare'));
export const haTeschio = giocatore => giocatore.armi.some(a => ARMI[a]?.teschio);
const tieneTeschio = giocatore => !!ARMI[giocatore.armaAttiva]?.teschio;
const sullaPasserella = (x, z) => { const id = zonaDi(x, z); return id === 'imbarcadero' || !!ZONE.find(q => q.id === id)?.passerella; };
const arrotonda = v => Math.round(v * 100) / 100;

const CONDIZIONI_ANIME = Object.freeze({
  ghiaccio: (giocatore, zombie) => ZONE_FREDDE.includes(zonaDi(zombie.x, zombie.z)),
  fuoco: (giocatore, zombie) => ACQUISTI.some(a => a.tipo === 'oggettoElemento' && a.elemento === 'fuoco' && distanza(a.posizione, zombie) <= VICINO_BRACIERE),
  vuoto: (giocatore, zombie) => distanza(zombie, centro(OSTACOLI.find(o => o.tipo === 'mausoleo'))) <= VICINO_MAUSOLEO,
  vento: giocatore => sullaPasserella(giocatore.x, giocatore.z),
});

const elementoLibero = () => ({ da: '', passo: PASSO.OGGETTI, contatore: 0, oggetti: Array(OGGETTI_PER_PROVA).fill(false) });

export function statoIniziale() {
  return {
    altare: 0, elementi: Object.fromEntries(ELEMENTI.map(e => [e, elementoLibero()])), fuochi: [], prossimoFuoco: 1,
    sigilli: statoSigilli(), tana: statoTana(), ...statoColpi(),
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

export const difesaAttiva = stato => difesaSigilli(stato.palude.sigilli);

export function dannoEffettivo(stato, zombie, danno, opzioni) {
  if (zombie.tipo === 'arachne') return dannoArachne(stato, zombie, danno, opzioni);
  const corazza = TIPI_ZOMBIE[zombie.tipo]?.corazza;
  if (!corazza || opzioni.testa || opzioni.coltello || opzioni.teschio || opzioni.frantumato || stato.effetti?.secco > 0) return danno;
  return danno * corazza;
}

export const aggiornaFinale = aggiornaTana;

export const altarePronto = palude => palude.altare >= R.ANIME_ALTARE;
export const elementoDi = (palude, id) => ELEMENTI.find(e => palude.elementi[e].da === id) ?? null;

function armaDallAltare(palude, giocatore) {
  const e = elementoDi(palude, giocatore.id);
  return e && palude.elementi[e].passo === PASSO.FATTO ? ARMA_ELEMENTO[e] : TESCHIO;
}

function santuario(stato, giocatore, acquisto, eventi) {
  const el = stato.palude.elementi[acquisto.elemento];
  if (!haTeschio(giocatore)) return;
  if (!el.da) {
    if (elementoDi(stato.palude, giocatore.id)) return;
    el.da = giocatore.id;
    eventi.push({ k: 'elementoScelto', a: giocatore.id, elemento: acquisto.elemento });
    return;
  }
  if (el.da !== giocatore.id || el.passo !== PASSO.PRONTO || !tieneTeschio(giocatore)) return;
  const arma = ARMA_ELEMENTO[acquisto.elemento];
  giocatore.armi[giocatore.armi.findIndex(a => ARMI[a]?.teschio)] = arma;
  giocatore.armaAttiva = arma;
  el.passo = PASSO.FATTO;
  eventi.push({ k: 'acquisto', a: giocatore.id, arma, armi: [...giocatore.armi], potenziata: true });
  eventi.push({ k: 'elementoInfuso', a: giocatore.id, elemento: acquisto.elemento });
}

function oggettoProva(stato, giocatore, acquisto, eventi) {
  const el = stato.palude.elementi[acquisto.elemento];
  if (el.da !== giocatore.id || el.passo !== PASSO.OGGETTI || el.oggetti[acquisto.indice]) return;
  if (!tieneTeschio(giocatore) || (giocatore.anime ?? 0) < R.ELEMENTO_COSTO_OGGETTO) return;
  giocatore.anime -= R.ELEMENTO_COSTO_OGGETTO;
  el.oggetti[acquisto.indice] = true;
  const fatti = el.oggetti.filter(Boolean).length;
  eventi.push({ k: 'oggettoElemento', a: giocatore.id, elemento: acquisto.elemento, fatti });
  if (fatti < OGGETTI_PER_PROVA) return;
  el.passo = PASSO.ANIME;
  eventi.push({ k: 'provaElemento', a: giocatore.id, elemento: acquisto.elemento, passo: el.passo });
}

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
    case 'santuario':
      santuario(stato, giocatore, acquisto, eventi);
      return true;
    case 'oggettoElemento':
      oggettoProva(stato, giocatore, acquisto, eventi);
      return true;
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
  const e = elementoDi(palude, giocatore.id);
  const el = e ? palude.elementi[e] : null;
  if (!el || el.passo !== PASSO.ANIME || !CONDIZIONI_ANIME[e](giocatore, zombie)) return;
  el.contatore += 1;
  if (el.contatore < R.ELEMENTO_UCCISIONI) return;
  el.passo = PASSO.PRONTO;
  eventi.push({ k: 'provaElemento', a: giocatore.id, elemento: e, passo: el.passo });
}

function nelRaggio(stato, punto, raggio, escluso) {
  return stato.zombie.filter(z => z !== escluso && z.stato !== 'morto' && distanza(z, punto) <= raggio);
}

function ghiaccio(stato, giocatore, punto, bersaglio, eventi, S) {
  for (const z of nelRaggio(stato, punto, R.GHIACCIO_RAGGIO, bersaglio)) {
    if (S.tipoDi(z).boss) {
      z.gelo = Math.max(z.gelo ?? 0, R.GELO_BOSS_MAX);
      continue;
    }
    Object.assign(z, { gelo: 1, gelato: R.GELO_DURATA, geloDa: giocatore.id });
    if (z.stato === 'attacco') z.stato = 'dentro';
    eventi.push({ k: 'congelato', zombie: z.id, x: z.x, z: z.z });
  }
}

function fuoco(stato, giocatore, punto, bersaglio, eventi, S) {
  const base = vitaZombie(Math.max(1, stato.round)) * R.FUOCO_DANNO_AREA;
  for (const z of nelRaggio(stato, punto, R.FUOCO_RAGGIO, bersaglio)) {
    S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? base * 0.5 : base * (1 - (0.5 * distanza(z, punto)) / R.FUOCO_RAGGIO)), {}, eventi);
    if (z.stato !== 'morto') Object.assign(z, { ardore: R.FUOCO_ARDORE, ardoreDa: giocatore.id });
  }
  stato.palude.fuochi.push({ id: stato.palude.prossimoFuoco++, x: punto.x, z: punto.z, timer: R.FUOCO_CHIAZZA, da: giocatore.id });
}

function vuoto(stato, giocatore, punto, eventi) {
  stato.buchi.push({
    id: stato.prossimoProiettile++, x: punto.x, y: 1.2, z: punto.z, da: giocatore.id, colpi: 0.25,
    timer: R.BUCO_DURATA, raggio: R.VUOTO_RAGGIO, implosione: R.BUCO_IMPLOSIONE * 1.2, potente: false,
  });
  eventi.push({ k: 'buco', x: punto.x, y: 1.2, z: punto.z });
}

function vento(stato, giocatore, punto, bersaglio, eventi, S) {
  const base = vitaZombie(Math.max(1, stato.round)) * R.VENTO_DANNO_AREA;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  for (const z of nelRaggio(stato, punto, R.VENTO_RAGGIO, bersaglio)) {
    const d = distanza(z, punto) || 0.01;
    S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? base * 0.4 : base * (1 - (0.5 * d) / R.VENTO_RAGGIO)), {}, eventi);
    if (z.stato === 'morto' || S.tipoDi(z).boss || (z.stato !== 'dentro' && z.stato !== 'attacco')) continue;
    const spinta = R.VENTO_SPINTA * (1 - (0.4 * d) / R.VENTO_RAGGIO);
    const nuova = muoviCerchio(z, ((z.x - punto.x) / d) * spinta, ((z.z - punto.z) / d) * spinta, R.RAGGIO_ZOMBIE, ostacoli);
    Object.assign(z, { x: nuova.x, z: nuova.z, stato: 'dentro', scossa: R.VENTO_STORDIMENTO });
  }
}

const OGGETTI_TESCHIO = Object.freeze({ bombola: MISSIONE.BOMBOLE, bozzolo: MISSIONE.BOZZOLI });

function colpisciOggetto(stato, giocatore, id, eventi, S) {
  const [tipo, numero] = id.split('-');
  const indice = Number(numero);
  const punto = Number.isInteger(indice) ? OGGETTI_TESCHIO[tipo]?.[indice] : null;
  if (!punto || (giocatore.anime ?? 0) < R.TESCHIO_COSTO || distanza(giocatore, punto) > R.TESCHIO_PORTATA + TOLLERANZA) return;
  const colpito = tipo === 'bombola' ? colpisciBombola(stato, giocatore, indice, eventi, S) : colpisciBozzolo(stato, giocatore, indice, eventi, S);
  if (colpito) giocatore.anime -= R.TESCHIO_COSTO;
}

export function implodi(stato, giocatore, azione, eventi, S) {
  if (!tieneTeschio(giocatore)) return;
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
  if ((giocatore.anime ?? 0) < R.TESCHIO_COSTO) return;
  giocatore.anime -= R.TESCHIO_COSTO;
  const punto = { x: bersaglio.x, z: bersaglio.z };
  const elemento = ARMI[giocatore.armaAttiva].elemento ?? null;
  S.ferisciZombie(stato, giocatore, bersaglio, S.tipoDi(bersaglio).boss ? R.TESCHIO_DANNO_BOSS : bersaglio.vita, { teschio: true }, eventi);
  eventi.push({ k: 'implosioneTeschio', da: giocatore.id, zombie: bersaglio.id, imploso: bersaglio.stato === 'morto', elemento, x: arrotonda(punto.x), z: arrotonda(punto.z) });
  if (elemento === 'ghiaccio') ghiaccio(stato, giocatore, punto, bersaglio, eventi, S);
  else if (elemento === 'fuoco') fuoco(stato, giocatore, punto, bersaglio, eventi, S);
  else if (elemento === 'vuoto') vuoto(stato, giocatore, punto, eventi);
  else if (elemento === 'vento') vento(stato, giocatore, punto, bersaglio, eventi, S);
  else {
    const base = vitaZombie(Math.max(1, stato.round)) * R.TESCHIO_DANNO_AREA;
    for (const z of nelRaggio(stato, punto, R.TESCHIO_RAGGIO, bersaglio)) {
      S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? base * 0.5 : base * (1 - (0.5 * distanza(z, punto)) / R.TESCHIO_RAGGIO)), {}, eventi);
    }
  }
}

export function aggiorna(stato, dt, eventi, S) {
  const palude = stato.palude;
  const presenti = new Set(stato.giocatori.map(g => g.id));
  for (const e of ELEMENTI) if (palude.elementi[e].da && !presenti.has(palude.elementi[e].da)) palude.elementi[e] = elementoLibero();
  palude.fuochi = palude.fuochi.filter(f => {
    f.timer -= dt;
    for (const z of nelRaggio(stato, f, R.FUOCO_CHIAZZA_RAGGIO, null)) {
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
    pe: ELEMENTI.map(e => {
      const el = palude.elementi[e];
      return [el.da, el.passo, el.contatore, el.oggetti.reduce((m, fatto, i) => m | (fatto ? 1 << i : 0), 0)];
    }),
    pf: palude.fuochi.map(f => [f.id, arrotonda(f.x), arrotonda(f.z), arrotonda(Math.max(0, f.timer))]),
    pa: stato.zombie.filter(z => z.ardore > 0 && z.stato !== 'morto').map(z => z.id),
    pm: istantaneaMissione(stato),
    pc: palude.colpi.map(c => [c.id, arrotonda(c.x), arrotonda(c.z), arrotonda(Math.max(0, c.timer)), TIPI_COLPO.indexOf(c.tipo), c.raggio]),
    pp: palude.pozze.map(p => [p.id, arrotonda(p.x), arrotonda(p.z), arrotonda(Math.max(0, p.timer)), p.raggio]),
    pv: Object.entries(palude.invischiati).map(([id, t]) => [id, arrotonda(t)]),
  };
}

export function espandi(ist) {
  if (!ist.pl?.length) return null;
  return {
    altare: ist.pl[0],
    elementi: Object.fromEntries(ELEMENTI.map((e, i) => {
      const [da, passo, contatore, maschera] = ist.pe?.[i] ?? ['', PASSO.OGGETTI, 0, 0];
      return [e, { da, passo, contatore, oggetti: Array.from({ length: OGGETTI_PER_PROVA }, (_, k) => !!(maschera & (1 << k))) }];
    })),
    fuochi: (ist.pf ?? []).map(([id, x, z, timer]) => ({ id, x, z, timer })),
    ardenti: ist.pa ?? [],
    ...espandiMissione(ist.pm, ist.g),
    colpi: (ist.pc ?? []).map(([id, x, z, timer, tipo, raggio]) => ({ id, x, z, timer, tipo: TIPI_COLPO[tipo] ?? 'acido', raggio })),
    pozze: (ist.pp ?? []).map(([id, x, z, timer, raggio]) => ({ id, x, z, timer, raggio })),
    invischiati: Object.fromEntries(ist.pv ?? []),
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

function descriviSantuario(a, io, vista) {
  const prova = PROVE[a.elemento];
  const el = vista.palude.elementi[a.elemento];
  const mio = elementoDi(vista.palude, io.id);
  if (!io.armi.some(x => ARMI[x]?.teschio)) return nessuno(`Santuario del ${prova.nome}: serve il Teschio di Malakor`);
  if (!el.da) return mio ? nessuno(`Hai già legato il Teschio al ${PROVE[mio].nome}`) : { costo: 0, testo: `Premi F per legare il Teschio al ${prova.nome} (un elemento a testa)` };
  if (el.da !== io.id) return nessuno(`Il ${prova.nome} ha già scelto ${vista.giocatori.find(g => g.id === el.da)?.nome ?? 'un altro'}`);
  if (el.passo === PASSO.OGGETTI) return nessuno(`${prova.nome}: ${prova.oggetti} (${el.oggetti.filter(Boolean).length}/${OGGETTI_PER_PROVA})`);
  if (el.passo === PASSO.ANIME) return nessuno(`${prova.nome}: ${prova.anime} ${el.contatore}/${R.ELEMENTO_UCCISIONI}`);
  if (el.passo === PASSO.PRONTO) return ARMI[io.armaAttiva]?.teschio ? { costo: 0, testo: `Premi F per infondere il ${prova.nome} nel Teschio` } : nessuno('Prendi in mano il Teschio per infondergli l’elemento');
  return nessuno(`Il tuo Teschio porta il ${prova.nome}`);
}

function descriviOggetto(a, io, vista) {
  const prova = PROVE[a.elemento];
  const el = vista.palude.elementi[a.elemento];
  const nome = prova.oggetto[0].toUpperCase() + prova.oggetto.slice(1);
  if (el.da !== io.id) return nessuno(`${nome} risponde solo a chi ha scelto il ${prova.nome}`);
  if (el.oggetti[a.indice]) return nessuno(`${nome} è già sveglio`);
  if (el.passo !== PASSO.OGGETTI) return nessuno(`${nome} ha già dato quello che poteva`);
  if (!ARMI[io.armaAttiva]?.teschio) return nessuno(`Serve il Teschio in mano per ${prova.verbo} ${prova.oggetto}`);
  return { costo: 0, testo: `Premi F per ${prova.verbo} ${prova.oggetto} [${R.ELEMENTO_COSTO_OGGETTO} anima]` };
}

function descriviAltare(io, vista) {
  const anime = vista.palude.altare;
  if (anime < R.ANIME_ALTARE) return nessuno(`Altare del Teschio: anime ${anime}/${R.ANIME_ALTARE} — uccidete gli zombie qui sopra`);
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
    case 'santuario': return descriviSantuario(a, io, vista);
    case 'oggettoElemento': return descriviOggetto(a, io, vista);
    case 'munizioni': return ARMI[io.armaAttiva]?.teschio ? nessuno('Il Teschio non usa munizioni: si nutre delle anime dei nemici') : null;
    case 'potenziatore': return ARMI[io.armaAttiva]?.teschio ? nessuno('Il Teschio non si potenzia con le macchine: cercate i santuari') : null;
    case 'varco': return descriviVarco(io, vista, totemSpezzati(vista.palude.sigilli), TOTEM.length);
    default: return descriviSigilli(a, io, vista);
  }
}


function obiettivoElemento(vista, mioId) {
  const palude = vista.palude;
  const mio = elementoDi(palude, mioId);
  if (!mio) {
    const liberi = ELEMENTI.filter(e => !palude.elementi[e].da);
    if (!liberi.length) return '';
    return `Scegli un elemento per il tuo Teschio: ${liberi.map(e => `${PROVE[e].nome} ${PROVE[e].luogo}`).join(', ')}`;
  }
  const el = palude.elementi[mio];
  const prova = PROVE[mio];
  if (el.passo === PASSO.OGGETTI) return `${prova.nome}: ${prova.oggetti} (${el.oggetti.filter(Boolean).length}/${OGGETTI_PER_PROVA})`;
  if (el.passo === PASSO.ANIME) return `${prova.nome}: ${prova.anime} ${el.contatore}/${R.ELEMENTO_UCCISIONI}`;
  if (el.passo === PASSO.PRONTO) return `Tornate al santuario ${prova.luogo} per infondere il ${prova.nome} nel Teschio`;
  return '';
}

export function obiettivo(vista, mioId) {
  const palude = vista.palude;
  if (!palude || vista.fase === 'attesa') return '';
  if (palude.tana.fase > 0) return obiettivoTana(vista, mioId);
  if (vista.round === 0) return '';
  if (!vista.corrente) return 'Riavviate il motore della segheria per aprire il laboratorio';
  if (palude.altare < R.ANIME_ALTARE) return `Uccidete gli zombie sopra l'altare del laboratorio: anime ${palude.altare}/${R.ANIME_ALTARE}`;
  const io = vista.giocatori.find(g => g.id === mioId);
  if (io && io.stato !== 'morto' && !io.armi.some(a => ARMI[a]?.teschio)) return "Prendi il Teschio di Malakor dall'altare";
  if (palude.tana.varco === VARCO.APERTO) return 'Preparatevi, poi saltate tutti insieme nella tana di Arachne, al cuore della palude';
  if (palude.tana.varco === VARCO.MEMBRANA) return 'La barriera è caduta: bruciate col Teschio la membrana sul varco al cuore della palude';
  if (!vista.porte.has(RADICI)) return 'Bruciate col Teschio le radici che sbarrano la passerella dello sciamano';
  return obiettivoSigilli(vista, mioId);
}

export function secondario(vista, mioId) {
  const palude = vista.palude;
  if (!palude || vista.fase === 'attesa' || vista.round === 0 || palude.tana.fase > 0) return '';
  const io = vista.giocatori.find(g => g.id === mioId);
  if (!io?.armi.some(a => ARMI[a]?.teschio)) return '';
  return obiettivoElemento(vista, mioId);
}
