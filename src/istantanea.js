import { FINESTRE } from './mappa.js';

export const STATI_ZOMBIE = Object.freeze(['arriva', 'assi', 'scavalca', 'dentro', 'attacco', 'morto']);
export const STATI_GIOCATORE = Object.freeze(['vivo', 'terra', 'morto']);
export const FASI = Object.freeze(['intervallo', 'gioco', 'fine']);

const r2 = n => Math.round(n * 100) / 100;

export function faiIstantanea(stato) {
  return {
    t: Math.round(stato.tempo * 1000) / 1000,
    f: FASI.indexOf(stato.fase),
    r: stato.round,
    tf: r2(Math.max(0, stato.timerFase)),
    z: stato.zombie.map(z => [z.id, r2(z.x), r2(z.z), r2(z.yaw), STATI_ZOMBIE.indexOf(z.stato), z.corre ? 1 : 0, z.variante, Math.max(0, Math.round((z.vita / z.vitaMax) * 100))]),
    w: FINESTRE.map(f => stato.finestre[f.id]),
    p: [...stato.porte],
    g: stato.giocatori.map(g => ({
      id: g.id, n: g.nome, x: r2(g.x), z: r2(g.z), y: r2(g.yaw), p: r2(g.pitch),
      s: STATI_GIOCATORE.indexOf(g.stato), v: Math.round(g.vita), vm: g.vitaMax, pt: g.punti,
      a: g.armaAttiva, ar: [...g.armi], b: [...g.bevande], c: g.colpi, tt: r2(g.timerTerra),
      pr: r2(g.progressoRianimazione), ri: g.rianimando ? 1 : 0, u: g.uccisioni, tp: g.teletrasporto,
    })),
    c: [stato.cassa.stato === 'aperta' ? 1 : 0, stato.cassa.arma ?? '', stato.cassa.per ?? '', r2(stato.cassa.timer)],
  };
}

export function espandi(ist) {
  return {
    tempo: ist.t,
    fase: FASI[ist.f],
    round: ist.r,
    timerFase: ist.tf,
    zombie: ist.z.map(([id, x, z, yaw, s, corre, variante, vita]) => ({ id, x, z, yaw, stato: STATI_ZOMBIE[s], corre: !!corre, variante, vita })),
    finestre: Object.fromEntries(FINESTRE.map((f, i) => [f.id, ist.w[i]])),
    porte: new Set(ist.p),
    giocatori: ist.g.map(g => ({
      id: g.id, nome: g.n, x: g.x, z: g.z, yaw: g.y, pitch: g.p, stato: STATI_GIOCATORE[g.s], vita: g.v, vitaMax: g.vm,
      punti: g.pt, armaAttiva: g.a, armi: g.ar, bevande: g.b, colpi: g.c, timerTerra: g.tt, progressoRianimazione: g.pr,
      rianimando: !!g.ri, uccisioni: g.u, teletrasporto: g.tp,
    })),
    cassa: { stato: ist.c[0] ? 'aperta' : 'chiusa', arma: ist.c[1] || null, per: ist.c[2] || null, timer: ist.c[3] },
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

export function interpola(a, b, f) {
  const t = Math.min(1, Math.max(0, f));
  return {
    ...b,
    tempo: lineare(a.tempo, b.tempo, t),
    zombie: interpolaElenco(a.zombie, b.zombie, t, false),
    giocatori: interpolaElenco(a.giocatori, b.giocatori, t, true),
  };
}
