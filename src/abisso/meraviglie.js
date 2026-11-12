import { R, ARMI, vitaZombie } from '../regole.js';
import { quota, tetto, ostacoliPerGiocatori, ALTEZZA_SOFFITTO } from '../mappa.js';
import { muoviCerchio, vistaLibera, indiceScatole, scatoleIntorno } from '../fisica.js';
import { direzioneDa, primoMuro } from '../colpi.js';
import { NODI, CANNE, PILONI } from '../mappe/abisso.js';
import { A } from './costanti.js';
import { r2, distanza, vivi, nuovoId, attesa, imposta } from './stato.js';
import { suReale } from './acqua.js';

const MARGINE = 0.08;
const STATI_LIBERI = new Set(['dentro', 'attacco']);
const RAGGIO_FERMO_ZOMBIE = 0.9;
const ALTEZZA_SCHERMO = 1.5;

export const armaMeraviglia = (g, tipo) => {
  const arma = ARMI[g.armaAttiva];
  return arma?.meraviglia === tipo ? arma : null;
};

export function urta(x, y, z, ostacoli) {
  for (const s of ostacoli) {
    if (x > s.x0 - MARGINE && x < s.x1 + MARGINE && z > s.z0 - MARGINE && z < s.z1 + MARGINE
      && y > (s.base ?? 0) - MARGINE && y < (s.base ?? 0) + (s.altezza ?? ALTEZZA_SOFFITTO)) return s;
  }
  return null;
}

const occhi = (ab, g) => ({ x: g.x, y: quota(g.x, g.z) + suReale(ab, g) + R.ALTEZZA_OCCHI - 0.12, z: g.z });
const schermiDi = ostacoli => ostacoli.filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= ALTEZZA_SCHERMO);
const raggioZombie = (S, z) => (S.tipoDi(z).boss ? (z.tipo === 'leviatano' ? 3.6 : 0.75) : RAGGIO_FERMO_ZOMBIE);

export function sparaGlobo(stato, ab, g, azione, eventi) {
  const arma = armaMeraviglia(g, 'cariddi');
  if (!arma || attesa(ab, g.id, 'globo') > stato.tempo) return;
  imposta(ab, g.id, 'globo', stato.tempo + A.GLOBO_CADENZA);
  const d = direzioneDa(Number(azione.yaw) || 0, Math.max(-1.3, Math.min(1.3, Number(azione.pitch) || 0)));
  const o = occhi(ab, g);
  const potente = !!arma.potenziata;
  ab.globi.push({
    id: nuovoId(ab), x: o.x + d.x * 0.6, y: o.y + d.y * 0.6, z: o.z + d.z * 0.6, vx: d.x * A.GLOBO_VELOCITA, vy: d.y * A.GLOBO_VELOCITA, vz: d.z * A.GLOBO_VELOCITA,
    volo: A.GLOBO_VOLO, fermo: false, timer: A.GLOBO_DURATA * (potente ? 1.35 : 1), raggio: A.GLOBO_RAGGIO * (potente ? 1.25 : 1), da: g.id, potente,
  });
  eventi.push({ k: 'globoSparato', a: g.id });
}

function fermaGlobo(globo, eventi) {
  if (globo.fermo) return;
  globo.fermo = true;
  globo.vx = globo.vy = globo.vz = 0;
  eventi.push({ k: 'globoFermo', id: globo.id, x: r2(globo.x), y: r2(globo.y), z: r2(globo.z) });
}

function voloGlobo(stato, globo, dt, ostacoli, S, eventi) {
  globo.volo -= dt;
  const x = globo.x + globo.vx * dt;
  const y = globo.y + globo.vy * dt;
  const z = globo.z + globo.vz * dt;
  const suolo = quota(x, z);
  const contro = urta(x, y, z, ostacoli) || y < suolo + 0.7 || y > tetto(x, z, { cielo: false }) - 0.5
    || stato.zombie.some(v => v.stato !== 'morto' && Math.hypot(v.x - x, v.z - z) < raggioZombie(S, v) && y > quota(v.x, v.z) - 0.5 && y < quota(v.x, v.z) + (v.tipo === 'leviatano' ? 16 : 2.4));
  if (contro || globo.volo <= 0) {
    fermaGlobo(globo, eventi);
    return;
  }
  Object.assign(globo, { x, y, z });
}

function trattieni(stato, globo, dt, indice, S) {
  const catturati = [];
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || S.tipoDi(z).boss) continue;
    if (z.cariddi && z.cariddi !== globo.id) continue;
    const d = distanza(z, globo);
    const preso = z.cariddi === globo.id;
    if (!preso && (!STATI_LIBERI.has(z.stato) || d > globo.raggio || Math.abs(quota(z.x, z.z) + 1 - globo.y) > A.GLOBO_CATTURA_ALTEZZA)) continue;
    z.cariddi = globo.id;
    z.stato = 'dentro';
    z.trattenuto = 0.25;
    catturati.push(z.id);
    const voluto = A.GLOBO_ORBITA + (z.id % 5) * 0.42;
    const angolo = Math.atan2(z.z - globo.z, z.x - globo.x) + A.GLOBO_GIRO * dt * (1 + (z.id % 3) * 0.25);
    const raggio = d + (voluto - d) * Math.min(1, dt * 2.2);
    const dx = globo.x + Math.cos(angolo) * raggio - z.x;
    const dz = globo.z + Math.sin(angolo) * raggio - z.z;
    const nuova = muoviCerchio(z, dx, dz, R.RAGGIO_ZOMBIE, scatoleIntorno(indice, z, R.RAGGIO_ZOMBIE, dx, dz));
    z.x = nuova.x;
    z.z = nuova.z;
    z.yaw = angolo + Math.PI / 2;
  }
  globo.catturati = catturati;
}

function libera(stato, globo) {
  for (const z of stato.zombie) if (z.cariddi === globo.id) z.cariddi = 0;
}

export function aggiornaGlobi(stato, ab, dt, eventi, S) {
  if (ab.globi.length === 0) return;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  const indice = indiceScatole(ostacoli);
  ab.globi = ab.globi.filter(globo => {
    if (!globo.fermo) voloGlobo(stato, globo, dt, ostacoli, S, eventi);
    if (!globo.fermo) return true;
    globo.timer -= dt;
    trattieni(stato, globo, dt, indice, S);
    if (globo.timer > 0) return true;
    collassa(stato, ab, globo, eventi, S, false);
    return false;
  });
}

export function richiestaCollasso(stato, ab, g, azione, eventi, S) {
  const voluto = Number(azione.id);
  const globo = Number.isFinite(voluto) && voluto > 0
    ? ab.globi.find(q => q.id === voluto && distanza(q, g) < 60 && (q.fermo || q.da === g.id))
    : [...ab.globi].reverse().find(q => q.da === g.id);
  if (!globo) return;
  ab.globi = ab.globi.filter(q => q !== globo);
  collassa(stato, ab, globo, eventi, S, true);
}

function collassa(stato, ab, globo, eventi, S, voluto) {
  const tiratore = stato.giocatori.find(g => g.id === globo.da) ?? stato.giocatori[0];
  const forza = globo.potente ? 1.6 : 1;
  const uccisi = [];
  libera(stato, globo);
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || !tiratore) continue;
    const d = distanza(z, globo);
    if (z.tipo === 'leviatano') {
      if (d < globo.raggio + 5) S.ferisciZombie(stato, tiratore, z, A.GLOBO_DANNO_LEVIATANO * forza, { cariddi: true }, eventi);
      continue;
    }
    if (d > globo.raggio * (voluto ? 1 : 0.6) || Math.abs(quota(z.x, z.z) + 1 - globo.y) > A.GLOBO_CATTURA_ALTEZZA + 1) continue;
    if (S.tipoDi(z).boss) {
      S.ferisciZombie(stato, tiratore, z, A.GLOBO_DANNO_BOSS * forza, { cariddi: true }, eventi);
      continue;
    }
    const danno = voluto ? z.vita : Math.round(vitaZombie(Math.max(1, stato.round)) * 0.6 * forza);
    S.ferisciZombie(stato, tiratore, z, danno, { cariddi: true, smembra: true }, eventi);
    if (z.stato === 'morto') uccisi.push(z.id);
  }
  if (ab.protocollo) {
    NODI.forEach((n, i) => {
      if (ab.nodi[i] !== 0 || Math.hypot(n.fuori.x - globo.x, n.fuori.z - globo.z) > A.GLOBO_NODO) return;
      ab.nodi[i] = 1;
      eventi.push({ k: 'nodoCaduto', indice: i });
    });
  }
  if (voluto) {
    for (let i = 0; i < A.GLOBO_SFERE; i++) {
      const a = (i / A.GLOBO_SFERE) * Math.PI * 2 + globo.id;
      const x = globo.x + Math.cos(a) * 1.4;
      const z = globo.z + Math.sin(a) * 1.4;
      ab.sfere.push({ id: nuovoId(ab), x: r2(x), z: r2(z), y: r2(Math.max(quota(x, z) + 0.9, globo.y - 0.6)), timer: A.SFERA_DURATA });
    }
  }
  eventi.push({ k: 'implosioneCariddi', id: globo.id, x: r2(globo.x), y: r2(globo.y), z: r2(globo.z), uccisi, potente: globo.potente, voluto });
}

export function aggiornaSfere(stato, ab, dt, eventi) {
  if (ab.sfere.length === 0) return;
  ab.sfere = ab.sfere.filter(s => {
    s.timer -= dt;
    const preso = vivi(stato).find(g => distanza(g, s) <= A.SFERA_PRESA);
    if (preso) {
      ab.ossigeno[preso.id] = 1;
      ab.bolle[preso.id] = { colpi: A.BOLLA_COLPI, timer: A.BOLLA_DURATA };
      eventi.push({ k: 'sferaPresa', a: preso.id, x: s.x, z: s.z });
      return false;
    }
    return s.timer > 0;
  });
  for (const [id, b] of Object.entries(ab.bolle)) {
    b.timer -= dt;
    if (b.timer <= 0 || b.colpi <= 0) delete ab.bolle[id];
  }
}

export function onda(stato, ab, g, azione, eventi, S) {
  const arma = armaMeraviglia(g, 'tridente');
  if (!arma || attesa(ab, g.id, 'onda') > stato.tempo) return;
  const potente = !!arma.potenziata;
  imposta(ab, g.id, 'onda', stato.tempo + A.ONDA_ATTESA * (potente ? 0.75 : 1));
  const yaw = Number(azione.yaw) || 0;
  const d = direzioneDa(yaw, 0);
  const o = occhi(ab, g);
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  const lungo = Math.min(A.ONDA_PORTATA * (potente ? 1.3 : 1), primoMuro({ x: o.x, y: o.y - 0.5, z: o.z }, d, ostacoli.filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= ALTEZZA_SCHERMO)));
  const largo = A.ONDA_LARGO * (potente ? 1.5 : 1);
  const colpiti = [];
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || z.stato === 'emerge') continue;
    const dx = z.x - g.x;
    const dz = z.z - g.z;
    const avanti = dx * d.x + dz * d.z;
    const fianco = Math.abs(dx * d.z - dz * d.x);
    if (avanti < 0 || avanti > lungo || fianco > largo + (z.tipo === 'leviatano' ? 3.5 : R.RAGGIO_ZOMBIE)) continue;
    if (Math.abs(quota(z.x, z.z) - quota(g.x, g.z)) > 3.2 && z.tipo !== 'leviatano') continue;
    const boss = S.tipoDi(z).boss;
    const danno = boss ? A.ONDA_DANNO_BOSS * (potente ? 2 : 1) : Math.max(A.ONDA_DANNO_MINIMO, vitaZombie(Math.max(1, stato.round)) * A.ONDA_VITE) * (potente ? 2 : 1);
    S.ferisciZombie(stato, g, z, Math.round(danno), { tridente: true, smembra: !boss }, eventi);
    colpiti.push(z.id);
  }
  eventi.push({ k: 'ondaTridente', a: g.id, x: r2(g.x), z: r2(g.z), y: r2(o.y - 0.5), yaw: r2(yaw), lungo: r2(lungo), potente, colpiti });
}

export function lanciaDardo(stato, ab, g, azione, eventi) {
  const arma = armaMeraviglia(g, 'tridente');
  if (!arma || attesa(ab, g.id, 'dardo') > stato.tempo) return;
  const potente = !!arma.potenziata;
  imposta(ab, g.id, 'dardo', stato.tempo + A.DARDO_ATTESA * (potente ? 0.7 : 1));
  const d = direzioneDa(Number(azione.yaw) || 0, Math.max(-1.4, Math.min(1.4, Number(azione.pitch) || 0)));
  const o = occhi(ab, g);
  ab.dardi.push({ id: nuovoId(ab), x: o.x + d.x * 0.5, y: o.y + d.y * 0.5, z: o.z + d.z * 0.5, vx: d.x * A.DARDO_VELOCITA, vy: d.y * A.DARDO_VELOCITA, vz: d.z * A.DARDO_VELOCITA, volo: A.DARDO_VOLO, da: g.id, potente });
  eventi.push({ k: 'dardoLanciato', a: g.id });
}

const SOTTOPASSI = 3;

export function aggiornaDardi(stato, ab, dt, eventi, S, suImpatto) {
  if (ab.dardi.length === 0) return;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  ab.dardi = ab.dardi.filter(dardo => {
    dardo.volo -= dt;
    for (let i = 0; i < SOTTOPASSI; i++) {
      const passo = dt / SOTTOPASSI;
      const x = dardo.x + dardo.vx * passo;
      const y = dardo.y + dardo.vy * passo;
      const z = dardo.z + dardo.vz * passo;
      const zombie = stato.zombie.find(v => v.stato !== 'morto' && v.stato !== 'emerge' && Math.hypot(v.x - x, v.z - z) < raggioZombie(S, v) - 0.3 && y > quota(v.x, v.z) - 0.2 && y < quota(v.x, v.z) + (v.tipo === 'leviatano' ? 16 : 2.2));
      if (zombie || urta(x, y, z, ostacoli) || y < quota(x, z) + 0.05 || y > tetto(x, z, { cielo: false }) - 0.05 || dardo.volo <= 0) {
        fulmine(stato, ab, { x: dardo.x, y: dardo.y, z: dardo.z }, zombie, dardo, eventi, S, suImpatto);
        return false;
      }
      Object.assign(dardo, { x, y, z });
    }
    return true;
  });
}

function fulmine(stato, ab, punto, primo, dardo, eventi, S, suImpatto) {
  const tiratore = stato.giocatori.find(g => g.id === dardo.da);
  const catena = [];
  const toccati = new Set();
  let ultimo = primo ?? null;
  if (!ultimo) {
    ultimo = stato.zombie
      .filter(z => z.stato !== 'morto' && z.stato !== 'emerge' && distanza(z, punto) <= A.FULMINE_SALTO * 0.6)
      .sort((a, b) => distanza(a, punto) - distanza(b, punto))[0] ?? null;
  }
  let danno = Math.max(A.FULMINE_DANNO_MINIMO, vitaZombie(Math.max(1, stato.round))) * (dardo.potente ? 1.8 : 1);
  while (ultimo && toccati.size < A.FULMINE_SALTI && tiratore) {
    toccati.add(ultimo.id);
    catena.push(r2(ultimo.x), r2(ultimo.z));
    const boss = S.tipoDi(ultimo).boss;
    if (!boss) ultimo.scossa = Math.max(ultimo.scossa ?? 0, 0.9);
    S.ferisciZombie(stato, tiratore, ultimo, Math.round(boss ? A.FULMINE_DANNO_BOSS * (dardo.potente ? 1.8 : 1) : danno), { tridente: true }, eventi);
    danno *= A.FULMINE_CALO;
    const da = ultimo;
    ultimo = stato.zombie
      .filter(z => z.stato !== 'morto' && z.stato !== 'emerge' && !toccati.has(z.id) && distanza(z, da) <= A.FULMINE_SALTO)
      .sort((a, b) => distanza(a, da) - distanza(b, da))[0] ?? null;
  }
  const suolo = quota(punto.x, punto.z);
  ab.pozze.push({ id: nuovoId(ab), x: r2(punto.x), z: r2(punto.z), y: r2(suolo), timer: A.POZZA_DURATA, raggio: A.POZZA_RAGGIO * (dardo.potente ? 1.35 : 1), ogni: 0, da: dardo.da, potente: dardo.potente, tipo: 'elettrica' });
  const canna = CANNE.findIndex(c => Math.hypot(c.x - punto.x, c.z - punto.z) < A.BERSAGLIO_CANNA);
  const pilone = PILONI.findIndex(p => Math.hypot(p.x - punto.x, p.z - punto.z) < A.BERSAGLIO_CANNA);
  eventi.push({ k: 'fulmineTridente', a: dardo.da, x: r2(punto.x), y: r2(punto.y), z: r2(punto.z), catena, potente: dardo.potente, canna, pilone });
  suImpatto?.({ canna, pilone, punto, da: dardo.da });
}

export function aggiornaPozze(stato, ab, dt, eventi, S) {
  if (ab.pozze.length === 0) return;
  ab.pozze = ab.pozze.filter(p => {
    p.timer -= dt;
    p.ogni -= dt;
    if (p.ogni <= 0) {
      p.ogni += A.POZZA_OGNI;
      const tiratore = stato.giocatori.find(g => g.id === p.da) ?? stato.giocatori[0];
      for (const z of stato.zombie) {
        if (z.stato === 'morto' || z.stato === 'emerge' || S.tipoDi(z).boss || distanza(z, p) > p.raggio || Math.abs(quota(z.x, z.z) - p.y) > 1.5) continue;
        z.scossa = Math.max(z.scossa ?? 0, A.POZZA_SCOSSA);
        if (tiratore) S.ferisciZombie(stato, tiratore, z, Math.round(vitaZombie(Math.max(1, stato.round)) * A.POZZA_VITE * (p.potente ? 1.5 : 1)), { tridente: true }, eventi);
      }
    }
    return p.timer > 0;
  });
}

export function sonica(stato, ab, g, azione, eventi, S) {
  if (!(ab.scudi[g.id] > 0) || attesa(ab, g.id, 'sonica') > stato.tempo) return;
  imposta(ab, g.id, 'sonica', stato.tempo + A.SONICA_ATTESA);
  ab.scudi[g.id] = Math.max(1, ab.scudi[g.id] - A.SONICA_COSTO);
  const yaw = Number(azione.yaw) || 0;
  const d = direzioneDa(yaw, 0);
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  const schermi = schermiDi(ostacoli);
  const indice = indiceScatole(ostacoli);
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || z.stato === 'emerge') continue;
    const dx = z.x - g.x;
    const dz = z.z - g.z;
    const dist = Math.hypot(dx, dz);
    if (dist > A.SONICA_PORTATA || dist < 0.01 || (dx * d.x + dz * d.z) / dist < Math.cos(A.SONICA_ARCO) || !vistaLibera(g, z, schermi)) continue;
    const boss = S.tipoDi(z).boss;
    S.ferisciZombie(stato, g, z, Math.round(boss ? 500 : vitaZombie(Math.max(1, stato.round)) * A.SONICA_VITE), { sonica: true }, eventi);
    if (boss || z.stato === 'morto') continue;
    z.scossa = Math.max(z.scossa ?? 0, A.SONICA_SCOSSA);
    if (z.stato === 'attacco') z.stato = 'dentro';
    const px = (dx / dist) * 2;
    const pz = (dz / dist) * 2;
    const nuova = muoviCerchio(z, px, pz, R.RAGGIO_ZOMBIE, scatoleIntorno(indice, z, R.RAGGIO_ZOMBIE, px, pz));
    z.x = nuova.x;
    z.z = nuova.z;
  }
  eventi.push({ k: 'ondaSonica', a: g.id, x: r2(g.x), z: r2(g.z), yaw: r2(yaw) });
}

export function para(stato, ab, giocatore, zombie, eventi) {
  const bolla = ab.bolle[giocatore.id];
  if (bolla?.colpi > 0) {
    bolla.colpi -= 1;
    eventi.push({ k: 'bollaColpita', a: giocatore.id });
    return true;
  }
  if (!(ab.scudi[giocatore.id] > 0)) return false;
  const d = direzioneDa(giocatore.yaw ?? 0, 0);
  const dx = zombie.x - giocatore.x;
  const dz = zombie.z - giocatore.z;
  const dist = Math.hypot(dx, dz) || 1;
  if ((dx * d.x + dz * d.z) / dist > Math.cos(A.SCUDO_RETRO)) return false;
  ab.scudi[giocatore.id] -= R.DANNO_ZOMBIE * A.SCUDO_COLPO;
  if (ab.scudi[giocatore.id] <= 0) {
    delete ab.scudi[giocatore.id];
    ab.attesaScudo[giocatore.id] = stato.tempo + A.SCUDO_ATTESA;
    eventi.push({ k: 'scudoRotto', a: giocatore.id });
  } else eventi.push({ k: 'scudoColpito', a: giocatore.id });
  return true;
}
