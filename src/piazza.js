import { OGGETTI, ZONE, MURI, OSTACOLI, quota } from './mappe/piazza.js';
import { R, ELENCO_BONUS } from './regole.js';
import { raggioScatola, raggioSfera, direzioneDa } from './colpi.js';

export const COSTO_CAMPANILE = 750;
export const TEMPO_CELLA = 40;
export const COSTO_CAMPANE = 1500;
export const RICARICA_CAMPANE = 75;
export const RICARICA_BENEDETTA = 30;
export const STORDIMENTO_CAMPANE = 7;

export const VOTO = Object.freeze({ STATUE: 0, LIBRO: 1, OROLOGIO: 2, CARRO: 3, VEGLIA: 4, CAPITANO: 5, PACE: 6 });
export const ORE_DEL_BEATO = Object.freeze([4, 6, 1, 4, 8, 2]);
export const ANIME_VEGLIA = 20;
export const VELOCITA_CARRO = 0.7;
export const RAGGIO_SCORTA = 4;
export const RAGGIO_BLOCCO = 2.4;
export const PUNTI_PACE = 2500;
export const RAGGIO_DONI = 1.6;

const RAGGIO_ORA = 0.24;
const RAGGIO_NUMERI = 0.82;
const STACCO_QUADRANTE = 0.1;
const STATI_IMMUNI = Object.freeze(new Set(['morto', 'emerge', 'scavalca']));
const NON_BLOCCANO = Object.freeze(new Set(['morto', 'emerge', 'arriva', 'assi', 'scavalca']));
const TEMPIETTO = ZONE.find(z => z.id === 'tempietto');
const r2 = n => Math.round(n * 100) / 100;
const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

const TRATTI = (() => {
  const tratti = [];
  let s = 0;
  const p = OGGETTI.PERCORSO_CARRO;
  for (let i = 1; i < p.length; i++) {
    const lungo = distanza(p[i - 1], p[i]);
    tratti.push({ a: p[i - 1], b: p[i], s0: s, lungo });
    s += lungo;
  }
  return Object.freeze(tratti);
})();
export const LUNGHEZZA_CARRO = TRATTI.reduce((s, t) => s + t.lungo, 0);

export function puntoCarro(s) {
  const t = TRATTI.find(q => s <= q.s0 + q.lungo) ?? TRATTI[TRATTI.length - 1];
  const f = Math.min(1, Math.max(0, (s - t.s0) / t.lungo));
  return { x: t.a.x + (t.b.x - t.a.x) * f, z: t.a.z + (t.b.z - t.a.z) * f, yaw: Math.atan2(t.b.x - t.a.x, t.b.z - t.a.z) };
}

export function portaCheFerma(porte, s) {
  const t = TRATTI.find(q => q.a.porta && !porte.includes(q.a.porta));
  return t && s >= t.s0 - 0.01 ? t.a.porta : null;
}

function limiteCarro(porte) {
  const t = TRATTI.find(q => q.a.porta && !porte.includes(q.a.porta));
  return t ? t.s0 : LUNGHEZZA_CARRO;
}

export const carroBloccato = (zombie, punto) => zombie.some(z => !NON_BLOCCANO.has(z.stato) && distanza(z, punto) <= RAGGIO_BLOCCO);

const FACCE_OROLOGIO = (() => {
  const c = OGGETTI.CAMPANILE;
  const cx = (c.x0 + c.x1) / 2;
  const cz = (c.z0 + c.z1) / 2;
  return [
    { x: cx, z: c.z1 + STACCO_QUADRANTE, n: { x: 0, z: 1 } },
    { x: cx, z: c.z0 - STACCO_QUADRANTE, n: { x: 0, z: -1 } },
    { x: c.x1 + STACCO_QUADRANTE, z: cz, n: { x: 1, z: 0 } },
    { x: c.x0 - STACCO_QUADRANTE, z: cz, n: { x: -1, z: 0 } },
  ];
})();

export const NUMERI_OROLOGIO = Object.freeze(FACCE_OROLOGIO.flatMap((f, faccia) => Array.from({ length: 12 }, (_, i) => {
  const ora = i === 0 ? 12 : i;
  const angolo = (i / 12) * Math.PI * 2;
  const destra = Math.sin(angolo) * RAGGIO_NUMERI * OGGETTI.RAGGIO_QUADRANTE;
  const su = Math.cos(angolo) * RAGGIO_NUMERI * OGGETTI.RAGGIO_QUADRANTE;
  return Object.freeze({ ora, faccia, x: f.x + f.n.z * destra, y: OGGETTI.OROLOGIO + su, z: f.z - f.n.x * destra, n: f.n });
})));

const SCHERMI_OROLOGIO = Object.freeze([
  ...MURI.map(m => ({ ...m, base: m.y0 ?? 0, altezza: (m.y1 ?? m.altezza) - (m.y0 ?? 0) })),
  ...OSTACOLI,
]);

export function oraColpita(origine, d) {
  let muro = Infinity;
  for (const s of SCHERMI_OROLOGIO) muro = Math.min(muro, raggioScatola(origine, d, s, s.base, s.base + s.altezza));
  let migliore = null;
  for (const n of NUMERI_OROLOGIO) {
    const t = raggioSfera(origine, d, n, RAGGIO_ORA);
    if (t < muro && (!migliore || t < migliore.t)) migliore = { t, ora: n.ora };
  }
  return migliore?.ora ?? null;
}

export function statoIniziale() {
  return { sopra: {}, campane: 0, rintocchi: 0, voto: { fase: VOTO.STATUE, ore: 0, carro: 0, anime: 0 } };
}

export const difesaAttiva = stato => stato.piazza.voto.fase === VOTO.CARRO || stato.piazza.voto.fase === VOTO.VEGLIA;
export const campaneBenedette = piazza => piazza?.voto?.fase === VOTO.PACE;

function sposta(giocatore, punto, scarto = 0) {
  Object.assign(giocatore, { x: punto.x + scarto, z: punto.z, rianimando: false, teletrasporto: giocatore.teletrasporto + 1 });
}

const nellaCella = g => g.x >= OGGETTI.CAMPANILE.x0 && g.x <= OGGETTI.CAMPANILE.x1 && g.z >= OGGETTI.CAMPANILE.z0 && g.z <= OGGETTI.CAMPANILE.z1;
const nelTempietto = z => z.x >= TEMPIETTO.x0 && z.x <= TEMPIETTO.x1 && z.z >= TEMPIETTO.z0 && z.z <= TEMPIETTO.z1;

function scendi(stato, giocatore, eventi) {
  delete stato.piazza.sopra[giocatore.id];
  sposta(giocatore, OGGETTI.USCITA_CAMPANILE, 0);
  giocatore.z += ((Object.keys(stato.piazza.sopra).length % 3) - 1) * 1.1;
  eventi.push({ k: 'discesaCampanile', a: giocatore.id });
}

function suonaCampane(stato, giocatore, eventi, S) {
  const p = stato.piazza;
  const benedette = campaneBenedette(p);
  const costo = benedette ? 0 : COSTO_CAMPANE;
  if (stato.fase === 'attesa' || !stato.corrente || p.campane > 0 || giocatore.punti < costo) return;
  giocatore.punti -= costo;
  p.campane = benedette ? RICARICA_BENEDETTA : RICARICA_CAMPANE;
  p.rintocchi += 1;
  let storditi = 0;
  for (const z of stato.zombie) {
    if (STATI_IMMUNI.has(z.stato) || S.tipoDi(z).boss) continue;
    z.scossa = Math.max(z.scossa ?? 0, STORDIMENTO_CAMPANE);
    if (z.stato === 'attacco') z.stato = 'dentro';
    storditi += 1;
  }
  eventi.push({ k: 'campane', da: giocatore.id, storditi, secondi: STORDIMENTO_CAMPANE });
}

function leggi(stato, giocatore, eventi) {
  const v = stato.piazza.voto;
  if (v.fase < VOTO.LIBRO) return;
  const prima = v.fase === VOTO.LIBRO;
  if (prima) v.fase = VOTO.OROLOGIO;
  eventi.push({ k: 'summa', a: giocatore.id, prima });
}

export function compra(stato, giocatore, acquisto, eventi, S) {
  const p = stato.piazza;
  switch (acquisto.tipo) {
    case 'bevanda':
      return !stato.corrente;
    case 'campanile':
      if (!stato.corrente || p.sopra[giocatore.id] || giocatore.punti < COSTO_CAMPANILE) return true;
      giocatore.punti -= COSTO_CAMPANILE;
      p.sopra[giocatore.id] = TEMPO_CELLA;
      sposta(giocatore, OGGETTI.ARRIVO_CELLA, ((Object.keys(p.sopra).length % 3) - 1) * 0.9);
      eventi.push({ k: 'campanile', a: giocatore.id, secondi: TEMPO_CELLA });
      return true;
    case 'discesa':
      if (p.sopra[giocatore.id] || nellaCella(giocatore)) scendi(stato, giocatore, eventi);
      return true;
    case 'campane':
      suonaCampane(stato, giocatore, eventi, S);
      return true;
    case 'libro':
      leggi(stato, giocatore, eventi);
      return true;
    default:
      return false;
  }
}

export const occhiDi = g => ({ x: g.x, y: quota(g.x, g.z) + R.ALTEZZA_OCCHI, z: g.z });

export function orologio(stato, giocatore, azione, eventi) {
  const v = stato.piazza.voto;
  if (v.fase !== VOTO.OROLOGIO || !Number.isFinite(azione.yaw) || !Number.isFinite(azione.pitch)) return;
  const ora = oraColpita(occhiDi(giocatore), direzioneDa(azione.yaw, azione.pitch));
  if (!ora) return;
  if (v.ore > 0 && ora === ORE_DEL_BEATO[v.ore - 1]) return;
  if (ora === ORE_DEL_BEATO[v.ore]) {
    v.ore += 1;
    eventi.push({ k: 'oraDelBeato', ora, n: v.ore, da: giocatore.id });
    if (v.ore < ORE_DEL_BEATO.length) return;
    v.fase = VOTO.CARRO;
    v.carro = 0;
    stato.piazza.rintocchi += 1;
    eventi.push({ k: 'ritornoBeato' });
    return;
  }
  v.ore = ora === ORE_DEL_BEATO[0] ? 1 : 0;
  eventi.push({ k: 'oraSbagliata', ora, da: giocatore.id });
}

export const CENTRO_DONI = Object.freeze({ x: (TEMPIETTO.x0 + TEMPIETTO.x1) / 2 + 0.6, z: (TEMPIETTO.z0 + TEMPIETTO.z1) / 2 - 2 });

function pace(stato, eventi, S) {
  const p = stato.piazza;
  p.voto.fase = VOTO.PACE;
  p.rintocchi += 1;
  if (p.campane > 0) {
    p.campane = 0;
    eventi.push({ k: 'campanePronte' });
  }
  for (const g of S.vivi(stato)) S.aggiungiPunti(stato, g, PUNTI_PACE);
  ELENCO_BONUS.forEach((b, i) => {
    const angolo = (i / ELENCO_BONUS.length) * Math.PI * 2;
    S.creaBonus(stato, CENTRO_DONI.x + Math.cos(angolo) * RAGGIO_DONI, CENTRO_DONI.z + Math.sin(angolo) * RAGGIO_DONI, b, eventi);
  });
  eventi.push({ k: 'paceCerano' });
}

export function suUccisione(stato, zombie, eventi, S) {
  const v = stato.piazza.voto;
  if (zombie.tipo === 'capitano') {
    if (v.fase === VOTO.CAPITANO) pace(stato, eventi, S);
    return;
  }
  if (v.fase !== VOTO.VEGLIA || !nelTempietto(zombie)) return;
  v.anime += 1;
  eventi.push({ k: 'animaBeato', anime: v.anime, x: zombie.x, z: zombie.z });
  if (v.anime < ANIME_VEGLIA) return;
  v.fase = VOTO.CAPITANO;
  S.generaZombie(stato, { tipo: 'capitano', punto: OGGETTI.CAPITANO });
  eventi.push({ k: 'boss', tipo: 'capitano' });
}

function aggiornaVoto(stato, dt, eventi) {
  const v = stato.piazza.voto;
  if (v.fase === VOTO.STATUE && stato.segreto) {
    v.fase = VOTO.LIBRO;
    eventi.push({ k: 'libroBeato' });
  }
  if (v.fase !== VOTO.CARRO || stato.fase !== 'gioco') return;
  const qui = puntoCarro(v.carro);
  if (!stato.giocatori.some(g => g.stato === 'vivo' && distanza(g, qui) <= RAGGIO_SCORTA) || carroBloccato(stato.zombie, qui)) return;
  v.carro = Math.min(limiteCarro(stato.porte), v.carro + VELOCITA_CARRO * dt);
  if (v.carro < LUNGHEZZA_CARRO) return;
  v.fase = VOTO.VEGLIA;
  v.anime = 0;
  eventi.push({ k: 'arrivoBeato' });
}

export function aggiorna(stato, dt, eventi) {
  const p = stato.piazza;
  if (stato.fase === 'attesa') return;
  aggiornaVoto(stato, dt, eventi);
  if (p.campane > 0) {
    p.campane = Math.max(0, p.campane - dt);
    if (p.campane === 0) eventi.push({ k: 'campanePronte' });
  }
  for (const id of Object.keys(p.sopra)) {
    const giocatore = stato.giocatori.find(g => g.id === id);
    if (!giocatore) {
      delete p.sopra[id];
      continue;
    }
    if (giocatore.stato !== 'vivo') {
      scendi(stato, giocatore, eventi);
      continue;
    }
    p.sopra[id] -= dt;
    if (p.sopra[id] <= 0) scendi(stato, giocatore, eventi);
  }
}

export function istantanea(stato) {
  const p = stato.piazza;
  if (!p) return {};
  return {
    cq: [r2(p.campane), p.rintocchi],
    cs: Object.entries(p.sopra).map(([id, s]) => [id, r2(s)]),
    cv: [p.voto.fase, p.voto.ore, r2(p.voto.carro), p.voto.anime],
  };
}

export function espandi(ist) {
  if (!ist.cq?.length) return null;
  const [fase = 0, ore = 0, carro = 0, anime = 0] = ist.cv ?? [];
  return { campane: ist.cq[0], rintocchi: ist.cq[1], sopra: Object.fromEntries(ist.cs ?? []), voto: { fase, ore, carro, anime } };
}
