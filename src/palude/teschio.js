import { R, ARMI, vitaZombie } from '../regole.js';
import { ostacoliPerGiocatori, ALTEZZA_SOFFITTO } from '../mappa.js';
import { muoviCerchio, vistaLibera } from '../fisica.js';

export const ELEMENTI_TESCHIO = Object.freeze(['', 'ghiaccio', 'fuoco', 'vuoto', 'vento']);

const SCHERMO = 1.6;
const SOLLEVA_DA = Object.freeze(['dentro', 'attacco']);
const PATCH_FUOCO_MASSIME = 3;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const arrotonda = v => Math.round(v * 100) / 100;
const elementoIn = giocatore => ARMI[giocatore.armaAttiva]?.elemento ?? '';
const tieneTeschio = giocatore => !!ARMI[giocatore.armaAttiva]?.teschio;
const cacheSchermi = new WeakMap();
function schermi(stato) {
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  if (!cacheSchermi.has(ostacoli)) cacheSchermi.set(ostacoli, ostacoli.filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= SCHERMO));
  return cacheSchermi.get(ostacoli);
}
const vivo = z => z.stato !== 'morto';

export const statoCariche = () => ({ cariche: {} });

function vicini(stato, punto, raggio, escluso = null) {
  return stato.zombie.filter(z => z !== escluso && vivo(z) && distanza(z, punto) <= raggio);
}

function nelCono(giocatore, z) {
  const dx = z.x - giocatore.x;
  const dz = z.z - giocatore.z;
  const d = Math.hypot(dx, dz);
  if (d > R.TESCHIO_CONO_PORTATA) return false;
  if (d < 1.2) return true;
  const coseno = (dx * Math.sin(giocatore.yaw) + dz * Math.cos(giocatore.yaw)) / d;
  return coseno >= Math.cos(R.TESCHIO_CONO);
}

function puntoVuoto(stato, giocatore) {
  const muri = schermi(stato);
  const sx = Math.sin(giocatore.yaw);
  const sz = Math.cos(giocatore.yaw);
  let passo = R.VUOTO_DISTANZA;
  while (passo > 1.5) {
    const p = { x: giocatore.x + sx * passo, z: giocatore.z + sz * passo };
    if (vistaLibera(giocatore, p, muri)) return p;
    passo -= 0.75;
  }
  return { x: giocatore.x + sx * 1.5, z: giocatore.z + sz * 1.5 };
}

function ghiaccioAttorno(stato, giocatore, punto, raggio, escluso, eventi, S) {
  const muri = schermi(stato);
  for (const z of vicini(stato, punto, raggio, escluso)) {
    if (!vistaLibera(punto, z, muri)) continue;
    if (S.tipoDi(z).boss) {
      z.gelo = Math.max(z.gelo ?? 0, R.GELO_BOSS_MAX);
      continue;
    }
    Object.assign(z, { gelo: 1, gelato: R.GELO_DURATA, geloDa: giocatore.id, levita: 0 });
    if (z.stato === 'attacco') z.stato = 'dentro';
    eventi.push({ k: 'congelato', zombie: z.id, x: z.x, z: z.z });
  }
}

function fuocoAttorno(stato, giocatore, punto, raggio, escluso, eventi, S, chiazza = true) {
  const base = vitaZombie(Math.max(1, stato.round)) * R.FUOCO_DANNO_AREA;
  const muri = schermi(stato);
  for (const z of vicini(stato, punto, raggio, escluso)) {
    if (!vistaLibera(punto, z, muri)) continue;
    S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? base * 0.5 : base * (1 - (0.4 * distanza(z, punto)) / raggio)), {}, eventi);
    if (vivo(z)) Object.assign(z, { ardore: R.FUOCO_ARDORE, ardoreDa: giocatore.id });
  }
  if (chiazza) stato.palude.fuochi.push({ id: stato.palude.prossimoFuoco++, x: punto.x, z: punto.z, timer: R.FUOCO_CHIAZZA, da: giocatore.id });
}

function ventoAttorno(stato, giocatore, punto, raggio, escluso, eventi, S, danno = R.VENTO_DANNO_AREA) {
  const base = vitaZombie(Math.max(1, stato.round)) * danno;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  const muri = schermi(stato);
  for (const z of vicini(stato, punto, raggio, escluso)) {
    if (!vistaLibera(punto, z, muri)) continue;
    const d = distanza(z, punto) || 0.01;
    S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? base * 0.4 : base * (1 - (0.5 * d) / raggio)), {}, eventi);
    if (!vivo(z) || S.tipoDi(z).boss || !SOLLEVA_DA.includes(z.stato)) continue;
    const spinta = R.VENTO_SPINTA * (1 - (0.4 * d) / raggio);
    const nuova = muoviCerchio(z, ((z.x - punto.x) / d) * spinta, ((z.z - punto.z) / d) * spinta, R.RAGGIO_ZOMBIE, ostacoli);
    Object.assign(z, { x: nuova.x, z: nuova.z, stato: 'dentro', scossa: R.VENTO_STORDIMENTO });
  }
}

function vuotoAttorno(stato, giocatore, punto, raggio, escluso, eventi, S, quota = 0.75) {
  const base = vitaZombie(Math.max(1, stato.round)) * quota;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  const muri = schermi(stato);
  for (const z of vicini(stato, punto, raggio, escluso)) {
    if (!vistaLibera(punto, z, muri)) continue;
    S.ferisciZombie(stato, giocatore, z, Math.round(S.tipoDi(z).boss ? R.BUCO_DANNO_BOSS * 0.5 : base), {}, eventi);
    if (!vivo(z) || S.tipoDi(z).boss || !SOLLEVA_DA.includes(z.stato)) continue;
    const d = distanza(z, punto) || 0.01;
    const tira = Math.min(d - 0.4, 1.6);
    if (tira <= 0) continue;
    const nuova = muoviCerchio(z, ((punto.x - z.x) / d) * tira, ((punto.z - z.z) / d) * tira, R.RAGGIO_ZOMBIE, ostacoli);
    Object.assign(z, { x: nuova.x, z: nuova.z, stato: 'dentro', scossa: 0.8 });
  }
}

export function raggio(stato, giocatore, bersaglio, eventi, S, arma = giocatore.armaAttiva) {
  if ((giocatore.attesaTeschio ?? 0) > 0 || (giocatore.anime ?? 0) < R.TESCHIO_COSTO_RAGGIO) return;
  giocatore.anime -= R.TESCHIO_COSTO_RAGGIO;
  giocatore.attesaTeschio = R.TESCHIO_ATTESA_RAGGIO;
  const elemento = ARMI[arma]?.elemento ?? '';
  const punto = { x: bersaglio.x, z: bersaglio.z };
  const boss = S.tipoDi(bersaglio).boss;
  S.ferisciZombie(stato, giocatore, bersaglio, boss ? R.TESCHIO_DANNO_BOSS : bersaglio.vita, { teschio: true }, eventi);
  eventi.push({ k: 'raggioTeschio', da: giocatore.id, zombie: bersaglio.id, ucciso: !vivo(bersaglio), elemento, x: arrotonda(punto.x), z: arrotonda(punto.z) });
  if (elemento === 'ghiaccio') ghiaccioAttorno(stato, giocatore, punto, R.RAGGIO_ELEMENTO, bersaglio, eventi, S);
  else if (elemento === 'fuoco') fuocoAttorno(stato, giocatore, punto, R.RAGGIO_ELEMENTO, bersaglio, eventi, S);
  else if (elemento === 'vuoto') vuotoAttorno(stato, giocatore, punto, R.RAGGIO_ELEMENTO + 0.5, bersaglio, eventi, S, 0.6);
  else if (elemento === 'vento') ventoAttorno(stato, giocatore, punto, R.RAGGIO_ELEMENTO + 1, bersaglio, eventi, S);
}

export function avviaCarica(stato, giocatore, eventi) {
  const cariche = stato.palude.cariche;
  if (cariche[giocatore.id] || (giocatore.anime ?? 0) < R.TESCHIO_COSTO) return;
  giocatore.anime -= R.TESCHIO_COSTO;
  const elemento = elementoIn(giocatore);
  const carica = { tempo: 0, elemento, levitati: [], buco: null, punto: null };
  if (elemento === 'vuoto') {
    carica.punto = puntoVuoto(stato, giocatore);
    carica.buco = stato.prossimoProiettile++;
    stato.buchi.push({ id: carica.buco, x: carica.punto.x, y: 1.3, z: carica.punto.z, da: giocatore.id, colpi: 99, timer: 99, raggio: R.VUOTO_RAGGIO, implosione: 0, potente: true });
  }
  cariche[giocatore.id] = carica;
  eventi.push({ k: 'caricaTeschio', da: giocatore.id, elemento });
}

function lascia(stato, carica) {
  const stordisce = carica.tempo >= R.TESCHIO_DURATA_CARICA * 0.5;
  for (const z of stato.zombie) {
    if (!carica.levitati.includes(z.id)) continue;
    z.levita = 0;
    if (stordisce && vivo(z) && !z.gelato) z.scossa = Math.max(z.scossa ?? 0, 0.6);
  }
  if (carica.buco !== null) stato.buchi = stato.buchi.filter(b => b.id !== carica.buco);
}

export function fermaCarica(stato, giocatore, eventi) {
  const carica = stato.palude.cariche[giocatore.id];
  if (!carica) return;
  lascia(stato, carica);
  delete stato.palude.cariche[giocatore.id];
  eventi.push({ k: 'caricaPersa', da: giocatore.id });
}

function prendi(stato, giocatore, carica, S) {
  if (carica.levitati.length >= R.TESCHIO_LEVITATI_MAX) return;
  const muri = schermi(stato);
  const candidati = carica.elemento === 'vuoto'
    ? stato.zombie.filter(z => distanza(z, carica.punto) <= R.VUOTO_RAGGIO)
    : stato.zombie.filter(z => nelCono(giocatore, z) && vistaLibera(giocatore, z, muri));
  for (const z of candidati.sort((a, b) => distanza(a, giocatore) - distanza(b, giocatore))) {
    if (carica.levitati.length >= R.TESCHIO_LEVITATI_MAX) return;
    if (!vivo(z) || !SOLLEVA_DA.includes(z.stato) || z.gelato > 0 || carica.levitati.includes(z.id)) continue;
    if (S.tipoDi(z).boss) {
      carica.boss ??= z.id;
      continue;
    }
    if (Object.values(stato.palude.cariche).some(c => c !== carica && c.levitati.includes(z.id))) continue;
    carica.levitati.push(z.id);
  }
}

function tieni(stato, carica, progresso) {
  const indice = ELEMENTI_TESCHIO.indexOf(carica.elemento);
  carica.levitati = carica.levitati.filter(id => {
    const z = stato.zombie.find(q => q.id === id);
    if (!z || !vivo(z)) return false;
    Object.assign(z, { levita: progresso, levitaE: indice, trattenuto: 0.25 });
    if (z.stato === 'attacco') z.stato = 'dentro';
    if (carica.elemento === 'ghiaccio') z.gelo = Math.max(z.gelo ?? 0, Math.min(0.95, progresso));
    return true;
  });
}

function scoppia(stato, giocatore, carica, eventi, S) {
  const colpiti = carica.levitati.map(id => stato.zombie.find(z => z.id === id)).filter(z => z && vivo(z));
  const punti = colpiti.map(z => ({ x: z.x, z: z.z }));
  const tagliato = carica.boss !== undefined ? stato.zombie.find(z => z.id === carica.boss && vivo(z)) : null;
  const boss = tagliato && (carica.elemento === 'vuoto' ? distanza(tagliato, carica.punto) <= R.VUOTO_RAGGIO + 2 : nelCono(giocatore, tagliato) && vistaLibera(giocatore, tagliato, schermi(stato))) ? tagliato : null;
  if (carica.buco !== null) stato.buchi = stato.buchi.filter(b => b.id !== carica.buco);
  eventi.push({
    k: 'esplosioneTeschio', da: giocatore.id, elemento: carica.elemento, centro: carica.punto ? [arrotonda(carica.punto.x), arrotonda(carica.punto.z)] : null,
    punti: punti.map(p => [arrotonda(p.x), arrotonda(p.z)]),
  });
  for (const z of colpiti) {
    z.levita = 0;
    S.ferisciZombie(stato, giocatore, z, z.vita, { teschio: true }, eventi);
  }
  if (boss) S.ferisciZombie(stato, giocatore, boss, R.TESCHIO_DANNO_BOSS * R.TESCHIO_BOSS_CARICA, { teschio: true }, eventi);
  if (carica.elemento === 'ghiaccio') for (const p of punti) ghiaccioAttorno(stato, giocatore, p, R.GHIACCIO_RAGGIO, null, eventi, S);
  else if (carica.elemento === 'fuoco') punti.forEach((p, i) => fuocoAttorno(stato, giocatore, p, R.FUOCO_RAGGIO, null, eventi, S, i < PATCH_FUOCO_MASSIME));
  else if (carica.elemento === 'vuoto') vuotoAttorno(stato, giocatore, carica.punto, R.VUOTO_RAGGIO, null, eventi, S, 1.2);
  else if (carica.elemento === 'vento') {
    const centro = punti.length ? { x: punti.reduce((s, p) => s + p.x, 0) / punti.length, z: punti.reduce((s, p) => s + p.z, 0) / punti.length } : giocatore;
    ventoAttorno(stato, giocatore, centro, R.VENTO_RAGGIO + 2, null, eventi, S, R.VENTO_DANNO_AREA * 1.4);
  }
}

export function aggiornaCariche(stato, dt, eventi, S) {
  for (const g of stato.giocatori) if (g.attesaTeschio > 0) g.attesaTeschio = Math.max(0, g.attesaTeschio - dt);
  const cariche = stato.palude.cariche;
  for (const [id, carica] of Object.entries(cariche)) {
    const giocatore = stato.giocatori.find(g => g.id === id);
    if (!giocatore || giocatore.stato !== 'vivo' || !tieneTeschio(giocatore) || elementoIn(giocatore) !== carica.elemento) {
      lascia(stato, carica);
      delete cariche[id];
      continue;
    }
    carica.tempo += dt;
    const progresso = Math.min(1, carica.tempo / R.TESCHIO_DURATA_CARICA);
    if (progresso < 1) prendi(stato, giocatore, carica, S);
    tieni(stato, carica, progresso);
    if (progresso < 1) continue;
    scoppia(stato, giocatore, carica, eventi, S);
    delete cariche[id];
  }
}

export function istantaneaLevitati(stato) {
  return stato.zombie.filter(z => z.levita > 0 && vivo(z)).map(z => [z.id, Math.round(z.levita * 100), z.levitaE ?? 0]);
}

export function espandiLevitati(pt) {
  return Object.fromEntries((pt ?? []).map(([id, p, e]) => [id, { p: p / 100, e: ELEMENTI_TESCHIO[e] ?? '' }]));
}
