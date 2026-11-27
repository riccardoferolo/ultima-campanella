import { OGGETTI, PENSILINA, TANICHE } from './mappe/stazione.js';
import { R, ARMI, BEVANDE } from './regole.js';
import { nomeBevanda } from './mappa.js';
import { dentroScatola } from './fisica.js';

export const COSTO_INCENDIO = 1500;
export const DURATA_INCENDIO = 15;
export const RICARICA_INCENDIO = 60;
export const DURATA_GRUPPO = 60;
export const ATTESA_CAMIONISTA = 9;
export const FERITA_INCENDIO = 12;
export const PUNTI_TANICA = 100;

export const GRUPPO = Object.freeze({ VUOTO: 0, PIENO: 1, ACCESO: 2, FARO: 3, CAMIONISTA: 4, FINITO: 5 });

const OGNI_FERITA_INCENDIO = 0.25;
const STATI_COLPIBILI = Object.freeze(new Set(['dentro', 'attacco']));
const r2 = n => Math.round(n * 100) / 100;
const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function statoIniziale() {
  return {
    taniche: Array.from({ length: TANICHE }, () => 0),
    inMano: 0,
    versate: 0,
    gruppo: GRUPPO.VUOTO,
    progresso: 0,
    arrivo: 0,
    incendio: { attiva: 0, ricarica: 0, colpo: 0, da: null },
  };
}

export const difesaAttiva = stato => stato.stazione.gruppo === GRUPPO.ACCESO;
export const sottoPensilina = p => dentroScatola(p.x, p.z, PENSILINA);

function prendiTanica(stato, giocatore, acquisto, eventi, S) {
  const s = stato.stazione;
  if (s.taniche[acquisto.tanica]) return;
  s.taniche[acquisto.tanica] = 1;
  s.inMano += 1;
  S.aggiungiPunti(stato, giocatore, PUNTI_TANICA);
  eventi.push({ k: 'tanica', a: giocatore.id, n: acquisto.tanica, trovate: s.taniche.reduce((a, b) => a + b, 0), totale: TANICHE });
}

function usaGruppo(stato, giocatore, eventi) {
  const s = stato.stazione;
  if (s.gruppo === GRUPPO.VUOTO && s.inMano > 0) {
    s.versate = Math.min(TANICHE, s.versate + s.inMano);
    s.inMano = 0;
    eventi.push({ k: 'tanicheVersate', a: giocatore.id, versate: s.versate, totale: TANICHE });
    if (s.versate >= TANICHE) {
      s.gruppo = GRUPPO.PIENO;
      eventi.push({ k: 'gruppoPieno' });
    }
    return;
  }
  if (s.gruppo !== GRUPPO.PIENO || stato.fase !== 'gioco') return;
  s.gruppo = GRUPPO.ACCESO;
  s.progresso = 0;
  eventi.push({ k: 'gruppoAcceso', a: giocatore.id });
}

function accendiIncendio(stato, giocatore, eventi) {
  const i = stato.stazione.incendio;
  if (!stato.corrente || stato.fase === 'attesa' || i.attiva > 0 || i.ricarica > 0 || giocatore.punti < COSTO_INCENDIO) return;
  giocatore.punti -= COSTO_INCENDIO;
  Object.assign(i, { attiva: DURATA_INCENDIO, colpo: 0, da: giocatore.id });
  eventi.push({ k: 'incendio', da: giocatore.id, secondi: DURATA_INCENDIO });
}

export function compra(stato, giocatore, acquisto, eventi, S) {
  switch (acquisto.tipo) {
    case 'bevanda':
      return !stato.corrente;
    case 'tanica':
      prendiTanica(stato, giocatore, acquisto, eventi, S);
      return true;
    case 'gruppo':
      usaGruppo(stato, giocatore, eventi);
      return true;
    case 'emergenza':
      accendiIncendio(stato, giocatore, eventi);
      return true;
    default:
      return false;
  }
}

function aggiornaIncendio(stato, dt, eventi, S) {
  const i = stato.stazione.incendio;
  if (i.ricarica > 0) i.ricarica = Math.max(0, i.ricarica - dt);
  if (i.attiva <= 0) return;
  const chi = stato.giocatori.find(g => g.id === i.da && g.stato !== 'morto') ?? S.vivi(stato)[0];
  for (const z of stato.zombie) {
    if (!STATI_COLPIBILI.has(z.stato) || S.tipoDi(z).boss || !sottoPensilina(z)) continue;
    if (chi) S.ferisciZombie(stato, chi, z, z.vita + 1, {}, eventi);
  }
  i.colpo -= dt;
  if (i.colpo <= 0) {
    i.colpo += OGNI_FERITA_INCENDIO;
    for (const g of S.vivi(stato)) if (sottoPensilina(g)) S.ferisciGiocatore(stato, g, eventi, FERITA_INCENDIO);
  }
  i.attiva -= dt;
  if (i.attiva > 0) return;
  Object.assign(i, { attiva: 0, ricarica: RICARICA_INCENDIO, colpo: 0, da: null });
  eventi.push({ k: 'incendioSpento' });
}

function aggiornaGruppo(stato, dt, eventi, S) {
  const s = stato.stazione;
  if (s.gruppo === GRUPPO.ACCESO) {
    if (S.vivi(stato).some(g => distanza(g, OGGETTI.GRUPPO) <= OGGETTI.RAGGIO_GRUPPO)) s.progresso = Math.min(1, s.progresso + dt / DURATA_GRUPPO);
    if (s.progresso < 1) return;
    s.gruppo = GRUPPO.FARO;
    s.arrivo = ATTESA_CAMIONISTA;
    eventi.push({ k: 'faro' });
    return;
  }
  if (s.gruppo !== GRUPPO.FARO) return;
  s.arrivo = Math.max(0, s.arrivo - dt);
  if (s.arrivo > 0) return;
  s.gruppo = GRUPPO.CAMIONISTA;
  S.generaZombie(stato, { tipo: 'camionista', punto: OGGETTI.ARRIVO_CAMION });
  eventi.push({ k: 'schianto', x: OGGETTI.ARRIVO_CAMION.x, z: OGGETTI.ARRIVO_CAMION.z });
  eventi.push({ k: 'boss', tipo: 'camionista' });
}

export function aggiorna(stato, dt, eventi, S) {
  if (stato.fase === 'attesa' || stato.fase === 'vinta' || stato.fase === 'fine') return;
  aggiornaIncendio(stato, dt, eventi, S);
  aggiornaGruppo(stato, dt, eventi, S);
}

export function suUccisione(stato, zombie, eventi, S) {
  const s = stato.stazione;
  if (zombie.tipo !== 'camionista' || s.gruppo !== GRUPPO.CAMIONISTA) return;
  s.gruppo = GRUPPO.FINITO;
  eventi.push({ k: 'camionistaUcciso' });
  S.vittoria(stato, eventi);
}

export function istantanea(stato) {
  const s = stato.stazione;
  if (!s) return {};
  return {
    sz: [
      ...s.taniche, s.inMano, s.versate, s.gruppo, Math.round(s.progresso * 100), r2(s.arrivo),
      r2(s.incendio.attiva), r2(s.incendio.ricarica),
    ],
  };
}

export const LUNGHEZZA_STAZIONE = TANICHE + 7;

export function espandi(ist) {
  const v = ist.sz;
  if (!Array.isArray(v) || v.length !== LUNGHEZZA_STAZIONE) return null;
  const [inMano, versate, gruppo, progresso, arrivo, attiva, ricarica] = v.slice(TANICHE);
  return {
    taniche: v.slice(0, TANICHE),
    inMano, versate, gruppo, progresso: progresso / 100, arrivo,
    incendio: { attiva, ricarica },
  };
}

export const valida = ist => ist.sz === undefined || (Array.isArray(ist.sz) && ist.sz.length === LUNGHEZZA_STAZIONE && ist.sz.every(n => typeof n === 'number' && Number.isFinite(n)));

const nessuno = testo => ({ costo: Infinity, testo });

function descriviGruppo(vista) {
  const s = vista.stazione;
  switch (s.gruppo) {
    case GRUPPO.VUOTO:
      if (s.inMano > 0) return { costo: 0, testo: `Premi F per versare ${s.inMano === 1 ? 'la tanica' : `${s.inMano} taniche`} nel gruppo elettrogeno (${s.versate + s.inMano}/${TANICHE})` };
      return nessuno(`Gruppo elettrogeno a secco: taniche ${s.versate}/${TANICHE}, cercatele nella stazione`);
    case GRUPPO.PIENO:
      return vista.fase === 'gioco' ? { costo: 0, testo: 'Premi F per avviare il gruppo elettrogeno e accendere la torre faro (dovrete difenderlo)' } : nessuno('Il gruppo elettrogeno si avvia solo durante un round');
    case GRUPPO.ACCESO:
      return nessuno(`Gruppo elettrogeno ${Math.round(s.progresso * 100)}%: restategli vicini!`);
    default:
      return nessuno('Il gruppo elettrogeno gira da solo: la torre faro è accesa');
  }
}

function descriviIncendio(vista) {
  const i = vista.stazione.incendio;
  if (!vista.corrente) return nessuno("Il pulsante d'emergenza degli erogatori non ha corrente");
  if (i.attiva > 0) return nessuno(`Benzina in fiamme sotto la pensilina: ${Math.ceil(i.attiva)} s`);
  if (i.ricarica > 0) return nessuno(`Gli erogatori si ricaricano: ${Math.ceil(i.ricarica)} s`);
  return { costo: COSTO_INCENDIO, testo: `Premi F per allagare di benzina la pensilina e darle fuoco, ${DURATA_INCENDIO} s [${COSTO_INCENDIO}]` };
}

export function descrivi(a, io, vista) {
  const s = vista.stazione;
  if (!s) return null;
  switch (a.tipo) {
    case 'bevanda':
      return vista.corrente ? null : nessuno(`${nomeBevanda(a.bevanda, BEVANDE)}: spenta, serve la corrente del quadro in officina`);
    case 'interruttore':
      return vista.corrente ? nessuno("Il quadro dell'officina è acceso") : { costo: 0, testo: "Premi F per riattivare il quadro elettrico dell'officina" };
    case 'munizioni': {
      const costo = ARMI[io.armaAttiva]?.potenziata ? R.COSTO_MUNIZIONI_POTENZIATE : R.COSTO_MUNIZIONI;
      return { costo, testo: `Premi F alla colonnina aria e acqua: munizioni per ${ARMI[io.armaAttiva]?.nome ?? 'l\'arma'} [${costo}]` };
    }
    case 'tanica':
      if (s.taniche[a.tanica]) return { nascosto: true, costo: Infinity, testo: '' };
      return { costo: 0, testo: 'Premi F per prendere la tanica di benzina' };
    case 'gruppo':
      return descriviGruppo(vista);
    case 'emergenza':
      return descriviIncendio(vista);
    default:
      return null;
  }
}

export function obiettivo(vista) {
  const s = vista.stazione;
  if (!s || vista.fase === 'attesa' || vista.round === 0) return '';
  if (s.incendio.attiva > 0) return `La pensilina brucia ancora ${Math.ceil(s.incendio.attiva)} s: state fuori dal fuoco`;
  switch (s.gruppo) {
    case GRUPPO.VUOTO: {
      const trovate = s.taniche.reduce((a, b) => a + b, 0);
      const parti = [`Taniche ${s.versate + s.inMano}/${TANICHE}`];
      if (s.inMano > 0) parti.push('portatele al gruppo elettrogeno nel parcheggio dei camion');
      else if (trovate < TANICHE) parti.push('cercatele tra market, officina e parcheggio');
      if (!vista.corrente) parti.push("e riaccendete il quadro dell'officina");
      return parti.join(' · ');
    }
    case GRUPPO.PIENO:
      return 'Il gruppo elettrogeno è pieno: avviatelo durante un round e difendetelo';
    case GRUPPO.ACCESO:
      return `Difendete il gruppo elettrogeno: torre faro ${Math.round(s.progresso * 100)}%`;
    case GRUPPO.FARO:
      return `La torre faro è accesa… qualcosa arriva dall'autostrada (${Math.ceil(s.arrivo)} s)`;
    case GRUPPO.CAMIONISTA:
      return 'Abbattete il Camionista';
    default:
      return '';
  }
}
