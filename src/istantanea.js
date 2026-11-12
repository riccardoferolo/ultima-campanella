import { FINESTRE, ELENCO_MAPPE } from './mappa.js';
import { istantanea as istantaneaGiungla, espandi as espandiGiungla } from './giungla.js';
import { istantanea as istantaneaTeatro, espandi as espandiTeatro } from './teatro.js';
import { istantanea as istantaneaPiazza, espandi as espandiPiazza } from './piazza.js';
import { istantanea as istantaneaPalude, espandi as espandiPalude } from './palude.js';
import { istantanea as istantaneaAbisso, espandi as espandiAbisso } from './abisso.js';
import { ELENCO_TIPI_ZOMBIE, ELENCO_BONUS, BONUS_A_TEMPO } from './regole.js';

export const STATI_ZOMBIE = Object.freeze(['arriva', 'assi', 'scavalca', 'dentro', 'attacco', 'morto', 'emerge']);
export const STATI_GIOCATORE = Object.freeze(['vivo', 'terra', 'morto']);
export const FASI = Object.freeze(['intervallo', 'gioco', 'fine', 'attesa', 'finale', 'vinta', 'fuga']);
export const STATI_GENERATORE = Object.freeze(['fermo', 'acceso', 'finito']);
export const STATI_POTENZIATORE = Object.freeze(['libero', 'lavora', 'pronta']);

const r2 = n => Math.round(n * 100) / 100;

export function faiIstantanea(stato) {
  return {
    t: Math.round(stato.tempo * 1000) / 1000,
    f: FASI.indexOf(stato.fase),
    r: stato.round,
    tf: r2(Math.max(0, stato.timerFase)),
    z: stato.zombie.map(z => [z.id, r2(z.x), r2(z.z), r2(z.yaw), STATI_ZOMBIE.indexOf(z.stato), z.corre ? 1 : 0, z.variante, Math.max(0, Math.round((z.vita / z.vitaMax) * 100)), Math.max(0, ELENCO_TIPI_ZOMBIE.indexOf(z.tipo ?? 'normale')), z.gelato > 0 ? 100 : Math.round(Math.min(1, z.gelo ?? 0) * 100)]),
    w: FINESTRE.map(f => stato.finestre[f.id]),
    p: [...stato.porte],
    g: stato.giocatori.map(g => ({
      id: g.id, n: g.nome, x: r2(g.x), z: r2(g.z), y: r2(g.yaw), p: r2(g.pitch),
      s: STATI_GIOCATORE.indexOf(g.stato), v: Math.round(g.vita), vm: g.vitaMax, pt: g.punti,
      a: g.armaAttiva, ar: [...g.armi], b: [...g.bevande], c: g.colpi, tt: r2(g.timerTerra),
      pr: r2(g.progressoRianimazione), ri: g.rianimando ? 1 : 0, u: g.uccisioni, tp: g.teletrasporto, ok: g.pronto ? 1 : 0, gn: g.granate ?? 0, rc: Math.round((g.carica ?? 0) * 100), ps: g.pistola ?? 'pistola', as: g.aspetto ?? 0, an: g.anime ?? 0,
    })),
    c: [stato.cassa.stato === 'aperta' ? 1 : 0, stato.cassa.arma ?? '', stato.cassa.per ?? '', r2(stato.cassa.timer)],
    e: stato.corrente ? 1 : 0,
    k: [STATI_POTENZIATORE.indexOf(stato.potenziatore.stato), stato.potenziatore.arma ?? '', stato.potenziatore.per ?? '', r2(stato.potenziatore.timer)],
    b: (stato.bonus ?? []).map(b => [b.id, ELENCO_BONUS.indexOf(b.tipo), r2(b.x), r2(b.z), r2(b.timer)]),
    x: BONUS_A_TEMPO.map(t => r2(stato.effetti?.[t] ?? 0)),
    fr: [...(stato.frammenti ?? [])],
    cp: stato.campanella ? 1 : 0,
    co: stato.conto === null || stato.conto === undefined ? -1 : r2(stato.conto),
    gr: (stato.granate ?? []).map(gr => (gr.ragnatela ? [gr.id, r2(gr.x), r2(gr.y), r2(gr.z), 1] : [gr.id, r2(gr.x), r2(gr.y), r2(gr.z)])),
    rg: stato.zombie.filter(z => z.ragnatela > 0 && z.stato !== 'morto').map(z => z.id),
    pj: (stato.proiettili ?? []).map(p => [p.id, r2(p.x), r2(p.y), r2(p.z)]),
    bh: (stato.buchi ?? []).map(b => [b.id, r2(b.x), r2(b.y), r2(b.z), r2(Math.max(0, b.timer)), r2(b.raggio)]),
    m: stato.missione
      ? [stato.missione.fusibili, stato.missione.messi, Math.max(0, STATI_GENERATORE.indexOf(stato.missione.generatore)), Math.round(stato.missione.progresso * 100), stato.missione.presideFusibile ? 1 : 0]
      : [0, 0, 0, 0, 1],
    fo: (stato.missione?.aTerra ?? []).map(f => [f.id, r2(f.x), r2(f.z), r2(f.y)]),
    mp: Math.max(0, ELENCO_MAPPE.indexOf(stato.mappa ?? 'scuola')),
    ms: Math.max(0, ELENCO_MAPPE.indexOf(stato.mappaScelta ?? stato.mappa ?? 'scuola')),
    ...istantaneaGiungla(stato),
    ...istantaneaTeatro(stato),
    ...istantaneaPalude(stato),
    ...istantaneaPiazza(stato),
    ...istantaneaAbisso(stato),
  };
}

export function espandi(ist) {
  return {
    tempo: ist.t,
    fase: FASI[ist.f],
    round: ist.r,
    timerFase: ist.tf,
    zombie: ist.z.map(([id, x, z, yaw, s, corre, variante, vita, tipo, gelo]) => ({ id, x, z, yaw, stato: STATI_ZOMBIE[s], corre: !!corre, variante, vita, tipo: ELENCO_TIPI_ZOMBIE[tipo] ?? 'normale', gelo: (gelo ?? 0) / 100 })),
    finestre: Object.fromEntries(FINESTRE.map((f, i) => [f.id, ist.w[i]])),
    porte: new Set(ist.p),
    giocatori: ist.g.map(g => ({
      id: g.id, nome: g.n, x: g.x, z: g.z, yaw: g.y, pitch: g.p, stato: STATI_GIOCATORE[g.s], vita: g.v, vitaMax: g.vm,
      punti: g.pt, armaAttiva: g.a, armi: g.ar, bevande: g.b, colpi: g.c, timerTerra: g.tt, progressoRianimazione: g.pr,
      rianimando: !!g.ri, uccisioni: g.u, teletrasporto: g.tp, pronto: !!g.ok, granate: g.gn ?? 0, carica: (g.rc ?? 0) / 100, pistola: g.ps ?? 'pistola', aspetto: g.as ?? 0, anime: g.an ?? 0,
    })),
    cassa: { stato: ist.c[0] ? 'aperta' : 'chiusa', arma: ist.c[1] || null, per: ist.c[2] || null, timer: ist.c[3] },
    corrente: !!ist.e,
    potenziatore: { stato: STATI_POTENZIATORE[ist.k[0]], arma: ist.k[1] || null, per: ist.k[2] || null, timer: ist.k[3] },
    bonus: (ist.b ?? []).map(([id, tipo, x, z, timer]) => ({ id, tipo: ELENCO_BONUS[tipo], x, z, timer })),
    effetti: Object.fromEntries(BONUS_A_TEMPO.map((t, i) => [t, ist.x?.[i] ?? 0])),
    frammenti: ist.fr ?? [],
    campanella: !!ist.cp,
    conto: ist.co === undefined || ist.co < 0 ? null : ist.co,
    mappa: ELENCO_MAPPE[ist.mp ?? 0] ?? 'scuola',
    mappaScelta: ELENCO_MAPPE[ist.ms ?? ist.mp ?? 0] ?? 'scuola',
    giungla: espandiGiungla(ist),
    teatro: espandiTeatro(ist),
    palude: espandiPalude(ist),
    piazza: espandiPiazza(ist),
    abisso: espandiAbisso(ist),
    granate: (ist.gr ?? []).map(([id, x, y, z, ragnatela]) => ({ id, x, y, z, ragnatela: !!ragnatela })),
    ragnatele: new Set(ist.rg ?? []),
    proiettili: (ist.pj ?? []).map(([id, x, y, z]) => ({ id, x, y, z })),
    buchi: (ist.bh ?? []).map(([id, x, y, z, timer, raggio]) => ({ id, x, y, z, timer, raggio })),
    missione: {
      fusibili: ist.m?.[0] ?? 0,
      messi: ist.m?.[1] ?? 0,
      generatore: STATI_GENERATORE[ist.m?.[2] ?? 0],
      progresso: (ist.m?.[3] ?? 0) / 100,
      presideFusibile: !!(ist.m?.[4] ?? 1),
      aTerra: (ist.fo ?? []).map(([id, x, z, y]) => ({ id, x, z, y })),
    },
  };
}

const lineare = (a, b, f) => a + (b - a) * f;

export function interpolaAngolo(a, b, f) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * f;
}

function interpolaElenco(elencoA, elencoB, f, conPitch) {
  const vecchi = new Map(elencoA.map(e => [e.id, e]));
  return elencoB.map(nuovo => {
    const vecchio = vecchi.get(nuovo.id);
    if (!vecchio || vecchio.teletrasporto !== nuovo.teletrasporto) return nuovo;
    const risultato = { ...nuovo, x: lineare(vecchio.x, nuovo.x, f), z: lineare(vecchio.z, nuovo.z, f), yaw: interpolaAngolo(vecchio.yaw, nuovo.yaw, f) };
    if (conPitch) risultato.pitch = lineare(vecchio.pitch, nuovo.pitch, f);
    return risultato;
  });
}

function interpolaGranate(prima, dopo, t) {
  const vecchie = new Map(prima.map(g => [g.id, g]));
  return dopo.map(g => {
    const v = vecchie.get(g.id);
    return v ? { ...g, x: lineare(v.x, g.x, t), y: lineare(v.y, g.y, t), z: lineare(v.z, g.z, t) } : g;
  });
}

export function interpola(a, b, f) {
  const t = Math.min(1, Math.max(0, f));
  return {
    ...b,
    tempo: lineare(a.tempo, b.tempo, t),
    zombie: interpolaElenco(a.zombie, b.zombie, t, false),
    giocatori: interpolaElenco(a.giocatori, b.giocatori, t, true),
    granate: interpolaGranate(a.granate ?? [], b.granate ?? [], t),
    proiettili: interpolaGranate(a.proiettili ?? [], b.proiettili ?? [], t),
  };
}
