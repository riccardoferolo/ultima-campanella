import { vitaZombie, pesiZombie } from './regole.js';
import { OGGETTI } from './mappe/teatro.js';
import { MURI, zonaDi, stessoPiano } from './mappa.js';
import { vistaLibera, dentroScatola } from './fisica.js';

export const DURATA_SIPARIO = 6;
export const COSTO_BOTOLA = 750;
export const TEMPO_SOTTO = 40;
export const COSTO_SENTINELLA = 1500;
export const DURATA_SENTINELLA = 30;
export const RICARICA_SENTINELLA = 45;
export const COSTO_TRAPPOLA = 1000;
export const DURATA_TRAPPOLA = 20;
export const RICARICA_TRAPPOLA = 40;
export const PRIMA_ECLISSI = 5;
export const RAGGIO_LAMPADARIO = 3.4;
export const RAGGIO_GAS = 2.8;
export const GAS_SUL_GIOCATORE = 3;
export const RALLENTA_GAS = 0.6;
export const ROUND_TOSSICI = 4;
export const TRAPPOLE = Object.freeze(Object.keys(OGGETTI.TRAPPOLE));

const CADENZA_SENTINELLA = 0.12;
const PORTATA_SENTINELLA = 26;
const ZONE_SENTINELLA = Object.freeze(new Set(['platea', 'palco']));
const FERITA_TRAPPOLA = 15;
const OGNI_FERITA_TRAPPOLA = 0.25;
const CADUTA_LAMPADARIO = 0.9;
const DANNO_LAMPADARIO = 50;
const SOTTO_LAMPADARIO = 1.8;
const ZONE_LAMPADARIO = Object.freeze(new Set(['atrio', 'passaggio']));
const RAGGIO_FIAMMATA = 2.2;
const DANNO_FIAMMATA = 25;
const VICINO_GAS = 3.5;
const DURATA_NUBE = 5;
const QUOTA_ECLISSI = 0.75;
const STATI_COLPIBILI = Object.freeze(new Set(['dentro', 'attacco']));

const distanza = (a, b) => (stessoPiano(a, b) ? Math.hypot(a.x - b.x, a.z - b.z) : Infinity);
const r2 = n => Math.round(n * 100) / 100;
const dispositivo = () => ({ attiva: 0, ricarica: 0, da: null, colpo: 0 });

export function statoIniziale(seme) {
  return {
    sipario: 0,
    alzata: 0,
    lampadario: 0,
    caduta: 0,
    lampadarioDa: null,
    trappole: Object.fromEntries(TRAPPOLE.map(t => [t, dispositivo()])),
    sentinella: { ...dispositivo(), bersaglio: null },
    eclissi: false,
    prossimaEclissi: PRIMA_ECLISSI + ((seme >>> 0) % 2),
    nubi: [],
    prossimaNube: 1,
    sotto: {},
    gas: {},
  };
}

export function tipoZombie(stato, estratto) {
  const t = stato.teatro;
  if (t.eclissi) return 'ardente';
  const pesi = { ...pesiZombie(stato.round), tossico: stato.round >= ROUND_TOSSICI ? 0.15 + Math.min(0.15, (stato.round - ROUND_TOSSICI) * 0.02) : 0 };
  const voci = Object.entries(pesi).filter(([, p]) => p > 0);
  let soglia = estratto * voci.reduce((somma, [, p]) => somma + p, 0);
  for (const [tipo, p] of voci) {
    soglia -= p;
    if (soglia < 0) return tipo;
  }
  return voci[voci.length - 1][0];
}

function sposta(giocatore, punto, scarto = 0) {
  Object.assign(giocatore, { x: punto.x + scarto, z: punto.z, rianimando: false, teletrasporto: giocatore.teletrasporto + 1 });
}

function risali(stato, giocatore, eventi) {
  delete stato.teatro.sotto[giocatore.id];
  const scarto = (Object.keys(stato.teatro.sotto).length % 3 - 1) * 1.2;
  sposta(giocatore, OGGETTI.RISALITA, scarto);
  eventi.push({ k: 'risalita', a: giocatore.id });
}

function accendi(stato, giocatore, dispositivoDaAccendere, costo, durata) {
  if (!stato.corrente || dispositivoDaAccendere.attiva > 0 || dispositivoDaAccendere.ricarica > 0 || giocatore.punti < costo) return false;
  giocatore.punti -= costo;
  Object.assign(dispositivoDaAccendere, { attiva: durata, da: giocatore.id, colpo: 0 });
  return true;
}

export function compra(stato, giocatore, acquisto, eventi) {
  const t = stato.teatro;
  switch (acquisto.tipo) {
    case 'bevanda':
      return !stato.corrente;
    case 'leva':
      if (stato.corrente) return true;
      stato.corrente = true;
      Object.assign(t, { sipario: 1, alzata: DURATA_SIPARIO });
      eventi.push({ k: 'corrente', da: giocatore.id }, { k: 'sipario' });
      return true;
    case 'botola':
      if (!stato.corrente || t.sotto[giocatore.id] || giocatore.punti < COSTO_BOTOLA) return true;
      giocatore.punti -= COSTO_BOTOLA;
      t.sotto[giocatore.id] = TEMPO_SOTTO;
      sposta(giocatore, OGGETTI.ARRIVO_SOTTO, (Object.keys(t.sotto).length % 3 - 1) * 1.2);
      eventi.push({ k: 'botola', a: giocatore.id, secondi: TEMPO_SOTTO });
      return true;
    case 'montacarichi':
      if (t.sotto[giocatore.id]) risali(stato, giocatore, eventi);
      return true;
    case 'sentinella':
      if (accendi(stato, giocatore, t.sentinella, COSTO_SENTINELLA, DURATA_SENTINELLA)) eventi.push({ k: 'sentinella', da: giocatore.id, secondi: DURATA_SENTINELLA });
      return true;
    case 'trappola':
      if (accendi(stato, giocatore, t.trappole[acquisto.trappola], COSTO_TRAPPOLA, DURATA_TRAPPOLA)) eventi.push({ k: 'trappola', trappola: acquisto.trappola, da: giocatore.id });
      return true;
    default:
      return false;
  }
}

export function lampadario(stato, giocatore, eventi) {
  const t = stato.teatro;
  if (t.lampadario !== 0 || stato.fase === 'attesa' || !ZONE_LAMPADARIO.has(zonaDi(giocatore.x, giocatore.z))) return;
  Object.assign(t, { lampadario: 1, caduta: CADUTA_LAMPADARIO, lampadarioDa: giocatore.id });
  eventi.push({ k: 'lampadario', da: giocatore.id });
}

const autore = (stato, id) => stato.giocatori.find(g => g.id === id && g.stato === 'vivo') ?? stato.giocatori.find(g => g.stato === 'vivo') ?? null;

function crollo(stato, eventi, S) {
  const t = stato.teatro;
  t.lampadario = 2;
  const chi = autore(stato, t.lampadarioDa);
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || S.tipoDi(z).boss || distanza(z, OGGETTI.LAMPADARIO) > RAGGIO_LAMPADARIO) continue;
    if (chi) S.ferisciZombie(stato, chi, z, z.vita + 1, {}, eventi);
  }
  for (const g of S.vivi(stato)) if (distanza(g, OGGETTI.LAMPADARIO) <= SOTTO_LAMPADARIO) S.ferisciGiocatore(stato, g, eventi, DANNO_LAMPADARIO);
  eventi.push({ k: 'lampadarioCrollato', x: OGGETTI.LAMPADARIO.x, z: OGGETTI.LAMPADARIO.z });
}

function aggiornaTrappole(stato, dt, eventi, S) {
  for (const [nome, trappola] of Object.entries(stato.teatro.trappole)) {
    if (trappola.ricarica > 0) trappola.ricarica = Math.max(0, trappola.ricarica - dt);
    if (trappola.attiva <= 0) continue;
    const area = OGGETTI.TRAPPOLE[nome];
    const chi = autore(stato, trappola.da);
    for (const z of stato.zombie) {
      if (!STATI_COLPIBILI.has(z.stato) || S.tipoDi(z).boss || !dentroScatola(z.x, z.z, area)) continue;
      if (chi) S.ferisciZombie(stato, chi, z, z.vita + 1, {}, eventi);
    }
    trappola.colpo -= dt;
    if (trappola.colpo <= 0) {
      trappola.colpo += OGNI_FERITA_TRAPPOLA;
      for (const g of S.vivi(stato)) if (dentroScatola(g.x, g.z, area)) S.ferisciGiocatore(stato, g, eventi, FERITA_TRAPPOLA);
    }
    trappola.attiva -= dt;
    if (trappola.attiva > 0) continue;
    Object.assign(trappola, { attiva: 0, ricarica: RICARICA_TRAPPOLA, colpo: 0 });
    eventi.push({ k: 'trappolaSpenta', trappola: nome });
  }
}

function bersaglioSentinella(stato) {
  let migliore = null;
  for (const z of stato.zombie) {
    if (!STATI_COLPIBILI.has(z.stato) || !ZONE_SENTINELLA.has(zonaDi(z.x, z.z))) continue;
    const d = distanza(z, OGGETTI.SENTINELLA);
    if (d > PORTATA_SENTINELLA || (migliore && d >= migliore.d) || !vistaLibera(OGGETTI.SENTINELLA, z, MURI)) continue;
    migliore = { z, d };
  }
  return migliore?.z ?? null;
}

function aggiornaSentinella(stato, dt, eventi, S) {
  const s = stato.teatro.sentinella;
  if (s.ricarica > 0) s.ricarica = Math.max(0, s.ricarica - dt);
  if (s.attiva <= 0) return;
  s.attiva -= dt;
  s.colpo -= dt;
  if (s.attiva <= 0) {
    Object.assign(s, { attiva: 0, ricarica: RICARICA_SENTINELLA, colpo: 0, bersaglio: null });
    eventi.push({ k: 'sentinellaSpenta' });
    return;
  }
  if (s.colpo > 0) return;
  s.colpo += CADENZA_SENTINELLA;
  const z = bersaglioSentinella(stato);
  s.bersaglio = z?.id ?? null;
  const chi = autore(stato, s.da);
  if (z && chi) S.ferisciZombie(stato, chi, z, Math.max(80, Math.round(vitaZombie(Math.max(1, stato.round)) * 0.22)), {}, eventi);
}

function aggiornaGas(stato, dt, S) {
  const t = stato.teatro;
  for (const id of Object.keys(t.gas)) {
    t.gas[id] -= dt;
    if (t.gas[id] <= 0) delete t.gas[id];
  }
  t.nubi = t.nubi.filter(n => {
    n.timer -= dt;
    for (const g of S.vivi(stato)) if (distanza(g, n) <= n.raggio) t.gas[g.id] = GAS_SUL_GIOCATORE;
    return n.timer > 0;
  });
}

function aggiornaSotto(stato, dt, eventi) {
  const t = stato.teatro;
  for (const id of Object.keys(t.sotto)) {
    const giocatore = stato.giocatori.find(g => g.id === id);
    if (!giocatore || giocatore.stato !== 'vivo') {
      delete t.sotto[id];
      continue;
    }
    t.sotto[id] -= dt;
    if (t.sotto[id] <= 0) risali(stato, giocatore, eventi);
  }
}

export function aggiorna(stato, dt, eventi, S) {
  const t = stato.teatro;
  if (stato.fase === 'attesa') return;
  if (t.sipario === 1) {
    t.alzata = Math.max(0, t.alzata - dt);
    if (t.alzata === 0) {
      t.sipario = 2;
      for (const id of ['sipario', 'centrali']) if (!stato.porte.includes(id)) stato.porte.push(id);
      eventi.push({ k: 'siparioAlzato' });
    }
  }
  if (t.lampadario === 1) {
    t.caduta -= dt;
    if (t.caduta <= 0) crollo(stato, eventi, S);
  }
  aggiornaTrappole(stato, dt, eventi, S);
  aggiornaSentinella(stato, dt, eventi, S);
  aggiornaGas(stato, dt, S);
  aggiornaSotto(stato, dt, eventi);
}

export function inizioRound(stato, eventi, S) {
  const t = stato.teatro;
  if (stato.round < t.prossimaEclissi) return;
  t.eclissi = true;
  t.prossimaEclissi = stato.round + 5 + (S.caso(stato) < 0.5 ? 0 : 1);
  stato.daGenerare = Math.max(4, Math.round(stato.daGenerare * QUOTA_ECLISSI));
  eventi.push({ k: 'eclissi', round: stato.round });
}

export function fineRound(stato, eventi) {
  const t = stato.teatro;
  if (!t.eclissi) return;
  t.eclissi = false;
  eventi.push({ k: 'eclissiFinita' });
}

export function suUccisione(stato, zombie, eventi, S) {
  const t = stato.teatro;
  if (zombie.tipo === 'ardente') {
    for (const g of S.vivi(stato)) if (distanza(g, zombie) <= RAGGIO_FIAMMATA) S.ferisciGiocatore(stato, g, eventi, DANNO_FIAMMATA);
    eventi.push({ k: 'fiammata', x: r2(zombie.x), z: r2(zombie.z) });
    return;
  }
  if (zombie.tipo !== 'tossico' || !S.vivi(stato).some(g => distanza(g, zombie) <= VICINO_GAS)) return;
  t.nubi.push({ id: t.prossimaNube++, x: zombie.x, z: zombie.z, raggio: RAGGIO_GAS, timer: DURATA_NUBE });
  eventi.push({ k: 'gas', x: r2(zombie.x), z: r2(zombie.z) });
}

export function rallentamento(vistaTeatro, id) {
  return (vistaTeatro?.gas?.[id] ?? 0) > 0 ? RALLENTA_GAS : 1;
}

const CHIAVI = Object.freeze([
  'sipario', 'alzata', 'lampadario', 'eclissi', 'sentinella', 'sentinellaRicarica', 'bersaglio',
  ...TRAPPOLE.flatMap(n => [`${n}Attiva`, `${n}Ricarica`]),
]);

export function istantanea(stato) {
  const t = stato.teatro;
  if (!t) return {};
  const valori = {
    sipario: t.sipario, alzata: r2(t.alzata), lampadario: t.lampadario, eclissi: t.eclissi ? 1 : 0,
    sentinella: r2(t.sentinella.attiva), sentinellaRicarica: r2(t.sentinella.ricarica), bersaglio: t.sentinella.bersaglio ?? -1,
    ...Object.fromEntries(TRAPPOLE.flatMap(n => [[`${n}Attiva`, r2(t.trappole[n].attiva)], [`${n}Ricarica`, r2(t.trappole[n].ricarica)]])),
  };
  return {
    tq: CHIAVI.map(k => valori[k]),
    tn: t.nubi.map(n => [n.id, r2(n.x), r2(n.z), n.raggio, r2(n.timer)]),
    ts: Object.entries(t.sotto).map(([id, s]) => [id, r2(s)]),
    tg: Object.entries(t.gas).map(([id, s]) => [id, r2(s)]),
  };
}

export function espandi(ist) {
  if (!ist.tq?.length) return null;
  const v = Object.fromEntries(CHIAVI.map((k, i) => [k, ist.tq[i]]));
  return {
    sipario: v.sipario,
    alzata: v.alzata,
    lampadario: v.lampadario,
    eclissi: !!v.eclissi,
    sentinella: { attiva: v.sentinella, ricarica: v.sentinellaRicarica, bersaglio: v.bersaglio >= 0 ? v.bersaglio : null },
    trappole: Object.fromEntries(TRAPPOLE.map(n => [n, { attiva: v[`${n}Attiva`], ricarica: v[`${n}Ricarica`] }])),
    nubi: (ist.tn ?? []).map(([id, x, z, raggio, timer]) => ({ id, x, z, raggio, timer })),
    sotto: Object.fromEntries(ist.ts ?? []),
    gas: Object.fromEntries(ist.tg ?? []),
  };
}

