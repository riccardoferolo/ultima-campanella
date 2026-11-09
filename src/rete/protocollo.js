import { ARMI, BEVANDE } from '../regole.js';
import { ELENCO_MAPPE } from '../mappa.js';
import { LUNGHEZZA_STATO } from '../giungla.js';
import { LUNGHEZZA_MISSIONE } from '../palude.js';

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
    && [g.x, g.z, g.y, g.p, g.s, g.v, g.vm, g.pt, g.c, g.tt, g.pr, g.ri, g.u, g.tp, g.gn, g.rc].every(numero)
    && arma(g.a) && Array.isArray(g.ar) && g.ar.every(arma) && arma(g.ps) && numero(g.as) && (g.an === undefined || numero(g.an))
    && Array.isArray(g.b) && g.b.every(b => Object.hasOwn(BEVANDE, b));
}

function eIstantanea(ist) {
  return !!ist && typeof ist === 'object'
    && [ist.t, ist.f, ist.r, ist.tf].every(numero)
    && elencoNumeri(ist.z, 10)
    && Array.isArray(ist.w) && ist.w.every(numero)
    && Array.isArray(ist.p) && ist.p.every(p => testo(p))
    && Array.isArray(ist.g) && ist.g.every(eGiocatore)
    && Array.isArray(ist.c) && ist.c.length === 4
    && numero(ist.e) && Array.isArray(ist.k) && ist.k.length === 4 && [0, 1, 2].includes(ist.k[0]) && numero(ist.k[3])
    && (ist.k[1] === '' || arma(ist.k[1]))
    && elencoNumeri(ist.b, 5)
    && Array.isArray(ist.x) && ist.x.every(numero)
    && Array.isArray(ist.fr) && ist.fr.every(numero)
    && numero(ist.cp) && numero(ist.co)
    && elencoNumeri(ist.gr, 4)
    && Array.isArray(ist.m) && ist.m.length === 5 && ist.m.every(numero)
    && elencoNumeri(ist.fo, 4)
    && elencoNumeri(ist.pj, 4)
    && elencoNumeri(ist.bh, 6)
    && numero(ist.mp) && numero(ist.ms)
    && Array.isArray(ist.gq) && (ist.gq.length === 0 || ist.gq.length === LUNGHEZZA_STATO) && ist.gq.every(numero)
    && elencoNumeri(ist.go, 4) && elencoNumeri(ist.nb, 5) && elencoNumeri(ist.pt, 4)
    && (ist.pl === undefined || (Array.isArray(ist.pl) && ist.pl.every(numero)))
    && (ist.pe === undefined || (Array.isArray(ist.pe) && ist.pe.length <= 4 && ist.pe.every(e => Array.isArray(e) && e.length === 4 && typeof e[0] === 'string' && e[0].length <= ID_MASSIMO && e.slice(1).every(numero))))
    && (ist.pf === undefined || elencoNumeri(ist.pf, 4))
    && (ist.pa === undefined || (Array.isArray(ist.pa) && ist.pa.every(numero)))
    && (ist.pm === undefined || (Array.isArray(ist.pm) && ist.pm.length === LUNGHEZZA_MISSIONE && ist.pm.every(numero)))
    && (ist.pc === undefined || elencoNumeri(ist.pc, 6))
    && (ist.pp === undefined || elencoNumeri(ist.pp, 5))
    && (ist.pv === undefined || (Array.isArray(ist.pv) && ist.pv.length <= 4 && ist.pv.every(v => Array.isArray(v) && v.length === 2 && testo(v[0]) && numero(v[1]))));
}

function eAzione(a) {
  if (!a || typeof a !== 'object') return false;
  if (a.tipo === 'colpo') return numero(a.zombie) && numero(a.danno) && (a.gelo === undefined || numero(a.gelo)) && (a.arma === undefined || arma(a.arma));
  if (a.tipo === 'scegli') return ['pistola', 'aspetto', 'mappa'].includes(a.cosa) && (typeof a.valore === 'string' || numero(a.valore));
  if (a.tipo === 'speciale') return numero(a.yaw) && numero(a.pitch);
  if (a.tipo === 'teschio') return numero(a.zombie) || testo(a.oggetto, 16);
  if (a.tipo === 'sparo') return numero(a.yaw) && numero(a.pitch) && (a.arma === undefined || arma(a.arma));
  if (a.tipo === 'catena') return Array.isArray(a.zombie) && a.zombie.length > 0 && a.zombie.length <= 13 && a.zombie.every(numero) && (a.arma === undefined || arma(a.arma));
  if (a.tipo === 'compra') return testo(a.acquisto) && (a.arma === undefined || arma(a.arma));
  if (a.tipo === 'assa') return testo(a.finestra);
  if (a.tipo === 'rianima' || a.tipo === 'pronto') return typeof a.attivo === 'boolean';
  if (a.tipo === 'frammento') return numero(a.id);
  if (a.tipo === 'granata') return numero(a.yaw) && numero(a.pitch);
  return false;
}

const CONTROLLI = {
  ciao: m => pulisciNome(m.nome) !== null && testo(m.id),
  lobby: m => pulisciNome(m.nomeHost) !== null && (m.mappa === undefined || ELENCO_MAPPE.includes(m.mappa)) && (m.giocatori === undefined || (Array.isArray(m.giocatori) && m.giocatori.length <= 4 && m.giocatori.every(n => typeof n === 'string'))),
  inizia: m => numero(m.seme) && (m.mappa === undefined || ELENCO_MAPPE.includes(m.mappa)),
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
