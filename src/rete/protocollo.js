import { ARMI, BEVANDE } from '../regole.js';

const LETTERE = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const NOME_MASSIMO = 16;
const ID_MASSIMO = 64;

export function codiceStanza(caso = Math.random) {
  return Array.from({ length: 4 }, () => LETTERE[Math.floor(caso() * LETTERE.length)]).join('');
}

export function normalizzaCodice(testo) {
  const codice = String(testo ?? '').trim().toUpperCase();
  return /^[A-HJ-NP-Z]{4}$/.test(codice) ? codice : null;
}

export function pulisciNome(testo) {
  const nome = String(testo ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, NOME_MASSIMO);
  return nome || null;
}

const numero = x => typeof x === 'number' && Number.isFinite(x);
const testo = (x, massimo = ID_MASSIMO) => typeof x === 'string' && x.length > 0 && x.length <= massimo;
const arma = x => typeof x === 'string' && Object.hasOwn(ARMI, x);
const elencoNumeri = (x, lunghezza) => Array.isArray(x) && x.every(e => Array.isArray(e) && e.length === lunghezza && e.every(numero));

function eGiocatore(g) {
  return !!g && typeof g === 'object' && testo(g.id) && typeof g.n === 'string'
    && [g.x, g.z, g.y, g.p, g.s, g.v, g.vm, g.pt, g.c, g.tt, g.pr, g.ri, g.u, g.tp].every(numero)
    && arma(g.a) && Array.isArray(g.ar) && g.ar.every(arma)
    && Array.isArray(g.b) && g.b.every(b => Object.hasOwn(BEVANDE, b));
}

function eIstantanea(ist) {
  return !!ist && typeof ist === 'object'
    && [ist.t, ist.f, ist.r, ist.tf].every(numero)
    && elencoNumeri(ist.z, 9)
    && Array.isArray(ist.w) && ist.w.every(numero)
    && Array.isArray(ist.p) && ist.p.every(p => testo(p))
    && Array.isArray(ist.g) && ist.g.every(eGiocatore)
    && Array.isArray(ist.c) && ist.c.length === 4
    && numero(ist.e) && Array.isArray(ist.k) && ist.k.length === 4 && [0, 1, 2].includes(ist.k[0]) && numero(ist.k[3])
    && (ist.k[1] === '' || arma(ist.k[1]))
    && elencoNumeri(ist.b, 5)
    && Array.isArray(ist.x) && ist.x.every(numero)
    && Array.isArray(ist.fr) && ist.fr.every(numero)
    && numero(ist.cp) && numero(ist.co);
}

function eAzione(a) {
  if (!a || typeof a !== 'object') return false;
  if (a.tipo === 'colpo') return numero(a.zombie) && numero(a.danno);
  if (a.tipo === 'compra') return testo(a.acquisto) && (a.arma === undefined || arma(a.arma));
  if (a.tipo === 'assa') return testo(a.finestra);
  if (a.tipo === 'rianima' || a.tipo === 'pronto') return typeof a.attivo === 'boolean';
  if (a.tipo === 'frammento') return numero(a.id);
  return false;
}

const CONTROLLI = {
  ciao: m => pulisciNome(m.nome) !== null && testo(m.id),
  lobby: m => pulisciNome(m.nomeHost) !== null,
  inizia: m => numero(m.seme),
  g: m => [m.x, m.z, m.yaw, m.pitch, m.colpi, m.tp].every(numero) && arma(m.arma),
  az: m => eAzione(m.a),
  st: m => numero(m.g) && eIstantanea(m.ist),
  ev: m => Array.isArray(m.eventi) && m.eventi.every(e => e && typeof e.k === 'string'),
  ping: m => numero(m.n),
  pong: m => numero(m.n),
};

export function valida(messaggio) {
  if (!messaggio || typeof messaggio !== 'object' || typeof messaggio.t !== 'string') return null;
  const controllo = CONTROLLI[messaggio.t];
  return controllo && controllo(messaggio) ? messaggio : null;
}
