import { FASI_LEVIATANO } from './leviatano.js';
import { r2 } from './stato.js';

export const LUNGHEZZA_STATO = 47;
const ID_MASSIMO = 64;
const AZIONI = Object.freeze(new Set(['globo', 'collassa', 'onda', 'dardo', 'sonica']));

const numero = x => typeof x === 'number' && Number.isFinite(x);
const testo = x => typeof x === 'string' && x.length > 0 && x.length <= ID_MASSIMO;
const righe = (x, n) => x === undefined || (Array.isArray(x) && x.length <= 400 && x.every(e => Array.isArray(e) && e.length === n && e.every(numero)));
const bit = b => (b ? 1 : 0);

export function istantanea(stato) {
  const ab = stato.abisso;
  if (!ab) return {};
  const s = ab;
  const base = [
    s.passo, bit(s.protocollo), ...s.turbine.map(r2), s.valvole.premute.length, r2(Math.max(0, s.valvole.tempo)),
    r2(s.allagamento.livello), s.allagamento.verso, ...s.barre.map(bit), bit(s.fucina), ...s.nodi,
    bit(s.stagna.chiusa), r2(Math.max(0, s.stagna.decompressione)), r2(Math.max(0, s.stagna.riapertura)), s.nucleo, bit(s.tridenti),
    s.inno.progresso, s.inno.errori, ...s.inno.sequenza, ...s.inno.canne, ...s.scudo.posti, ...s.scudo.prese.map(bit), bit(s.scudo.costruito),
    ...s.valvole.ordine, bit(s.completata), r2(Math.max(0, s.inizioLeviatano ?? 0)),
  ];
  const l = s.leviatano;
  return {
    ab: base,
    apo: s.portatore ?? '',
    ao: stato.giocatori.map(g => {
      const viaggio = s.condotti[g.id];
      return [g.id, Math.round((s.ossigeno[g.id] ?? 1) * 100), Math.round(s.scudi[g.id] ?? 0), s.bolle[g.id]?.colpi ?? 0, viaggio?.verso ?? 0, r2(viaggio?.t ?? 0), s.autoRianimazioni[g.id] ?? 0, bit(s.perkaholic.includes(g.id)), r2(g.su ?? 0)];
    }),
    ag: s.globi.map(q => [q.id, r2(q.x), r2(q.y), r2(q.z), r2(Math.max(0, q.timer)), r2(q.raggio), bit(q.fermo), bit(q.potente)]),
    ad: s.dardi.map(q => [q.id, r2(q.x), r2(q.y), r2(q.z)]),
    ap: s.pozze.map(q => [q.id, q.x, q.y, q.z, r2(Math.max(0, q.timer)), r2(q.raggio), bit(q.potente)]),
    as: s.sfere.map(q => [q.id, q.x, q.y, q.z]),
    an: s.nubi.map(q => [q.id, q.x, q.y, q.z, r2(Math.max(0, q.timer)), q.raggio]),
    ac: stato.zombie.filter(z => z.cariddi && z.stato !== 'morto').map(z => [z.id, z.cariddi]),
    ...(l ? {
      al: [FASI_LEVIATANO.indexOf(l.fase), r2(Math.max(0, l.timer)), l.faseVita, r2(l.angolo), r2(l.marea), ...l.piloni.map(r2), l.id],
      aa: l.azioni.map(q => [q.id, q.tipo === 'spazzata' ? 0 : 1, r2(Math.max(0, q.t)), r2(q.a0), r2(q.a1), q.tentacolo, ...q.punti.flat()]),
      aq: l.acidi.map(q => [q.x, q.z, r2(q.timer)]),
    } : {}),
  };
}

export function espandi(ist) {
  if (!Array.isArray(ist.ab) || ist.ab.length !== LUNGHEZZA_STATO) return null;
  const v = ist.ab;
  const giocatori = Object.fromEntries((ist.ao ?? []).map(([id, ossigeno, scudo, bolla, verso, t, rianimazioni, perkaholic, su]) => [id, {
    ossigeno: ossigeno / 100, scudo, bolla, condotto: verso ? { verso: verso === 1 ? 'delta' : 'beta', t } : null, rianimazioni, perkaholic: !!perkaholic, su: su ?? 0,
  }]));
  return {
    passo: v[0], protocollo: !!v[1], turbine: v.slice(2, 5),
    valvole: { premute: v[5], tempo: v[6], ordine: v.slice(41, 45) },
    allagamento: { livello: v[7], verso: v[8] }, barre: v.slice(9, 12).map(Boolean), fucina: !!v[12], nodi: v.slice(13, 17),
    stagna: { chiusa: !!v[17], decompressione: v[18], riapertura: v[19] }, nucleo: v[20], portatore: ist.apo || null, tridenti: !!v[21],
    inno: { progresso: v[22], errori: v[23], sequenza: v.slice(24, 29), canne: v.slice(29, 34) },
    scudo: { posti: v.slice(34, 37), prese: v.slice(37, 40).map(Boolean), costruito: !!v[40] },
    completata: !!v[45], inizioLeviatano: v[46],
    giocatori,
    globi: (ist.ag ?? []).map(([id, x, y, z, timer, raggio, fermo, potente]) => ({ id, x, y, z, timer, raggio, fermo: !!fermo, potente: !!potente })),
    dardi: (ist.ad ?? []).map(([id, x, y, z]) => ({ id, x, y, z })),
    pozze: (ist.ap ?? []).map(([id, x, y, z, timer, raggio, potente]) => ({ id, x, y, z, timer, raggio, potente: !!potente })),
    sfere: (ist.as ?? []).map(([id, x, y, z]) => ({ id, x, y, z })),
    nubi: (ist.an ?? []).map(([id, x, y, z, timer, raggio]) => ({ id, x, y, z, timer, raggio })),
    catturati: Object.fromEntries(ist.ac ?? []),
    leviatano: Array.isArray(ist.al) ? {
      fase: FASI_LEVIATANO[ist.al[0]] ?? 'emerso', timer: ist.al[1], faseVita: ist.al[2], angolo: ist.al[3], marea: ist.al[4], piloni: ist.al.slice(5, 9), id: ist.al[9],
      azioni: (ist.aa ?? []).map(([id, tipo, t, a0, a1, tentacolo, ...resto]) => ({
        id, tipo: tipo === 0 ? 'spazzata' : 'acido', t, a0, a1, tentacolo, punti: Array.from({ length: Math.floor(resto.length / 2) }, (_, i) => [resto[i * 2], resto[i * 2 + 1]]),
      })),
      acidi: (ist.aq ?? []).map(([x, z, timer]) => ({ x, z, timer })),
    } : null,
  };
}

export function valida(ist) {
  if (ist.ab === undefined) return ['apo', 'ao', 'ag', 'ad', 'ap', 'as', 'an', 'ac', 'al', 'aa', 'aq'].every(k => ist[k] === undefined);
  return Array.isArray(ist.ab) && ist.ab.length === LUNGHEZZA_STATO && ist.ab.every(numero)
    && (ist.apo === undefined || (typeof ist.apo === 'string' && ist.apo.length <= ID_MASSIMO))
    && Array.isArray(ist.ao) && ist.ao.length <= 8 && ist.ao.every(e => Array.isArray(e) && e.length === 9 && testo(e[0]) && e.slice(1).every(numero))
    && righe(ist.ag, 8) && righe(ist.ad, 4) && righe(ist.ap, 7) && righe(ist.as, 4) && righe(ist.an, 6) && righe(ist.ac, 2) && righe(ist.aq, 3)
    && (ist.al === undefined || (Array.isArray(ist.al) && ist.al.length === 10 && ist.al.every(numero)))
    && (ist.aa === undefined || (Array.isArray(ist.aa) && ist.aa.length <= 16 && ist.aa.every(e => Array.isArray(e) && e.length >= 6 && e.length <= 40 && e.every(numero))));
}

export function validaAzione(a) {
  if (!AZIONI.has(a.cosa)) return false;
  return [a.yaw, a.pitch, a.id].every(x => x === undefined || numero(x));
}
