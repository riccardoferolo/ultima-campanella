import { R, moltiplicatoreBoss } from '../regole.js';
import { zonaDi } from '../mappa.js';
import { DELTA, OGGETTI, PILONI } from '../mappe/abisso.js';
import { A } from './costanti.js';
import { r2, distanza, vivi, dialogo } from './stato.js';
import { suReale } from './acqua.js';

export const FASI_LEVIATANO = Object.freeze(['risveglio', 'emerso', 'immerso', 'riemersione', 'stordito', 'morte']);
const TANE_VASCA = Object.freeze(['v2', 'v3', 'v4', 'v5']);
const BOCCAPORTI = Object.freeze(['d1', 'd2', 'd3', 'd4']);
const RINFORZI_OGNI = Object.freeze([6, 4.5, 3.6]);
const RINFORZI_MAX = 12;

const inArena = g => zonaDi(g.x, g.z) === 'anfiteatro';
const angoloDi = p => Math.atan2(p.z - DELTA.z, p.x - DELTA.x);
const differenza = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

export function inizia(stato, ab, eventi, S) {
  for (const z of stato.zombie) {
    if (z.stato === 'morto') continue;
    z.stato = 'morto';
    z.timer = 4;
    eventi.push({ k: 'ucciso', zombie: z.id, testa: false, da: null, x: z.x, z: z.z, bomba: true });
  }
  const vita = Math.round(A.VITA_LEVIATANO * moltiplicatoreBoss(stato.giocatori.length));
  const id = stato.prossimoId++;
  stato.zombie.push({ id, x: DELTA.x, z: DELTA.z, yaw: Math.PI, stato: 'dentro', finestra: TANE_VASCA[0], vita, vitaMax: vita, tipo: 'leviatano', corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null, faseBoss: 1 });
  stato.fase = 'finale';
  stato.daGenerare = 0;
  stato.finale = { tempo: 0, rinforzi: 8 };
  ab.leviatano = {
    id, fase: 'risveglio', timer: A.RISVEGLIO, faseVita: 1, angolo: OGGETTI.ORBITA_LEVIATANO.da, prossimoAttacco: 4, prossimaImmersione: A.IMMERSIONE_DOPO[0],
    azioni: [], acidi: [], piloni: [0, 0, 0, 0], marea: 0, stordimenti: 0,
  };
  eventi.push({ k: 'leviatanoRisveglio', id });
  dialogo(ab, 'leviatano', eventi);
}

export function dannoLeviatano(ab, danno, opzioni) {
  const l = ab.leviatano;
  if (!l) return danno;
  if (l.fase === 'stordito') return Math.round(danno * A.CUORE_ESPOSTO * (opzioni.cariddi ? 2 : 1));
  if (l.fase !== 'emerso') return 0;
  return Math.round(danno * A.CORAZZA_LEVIATANO[l.faseVita - 1]);
}

export function caricaPilone(stato, ab, indice, eventi) {
  const l = ab.leviatano;
  if (!l || indice < 0 || indice >= PILONI.length || l.fase === 'morte' || l.fase === 'risveglio' || l.fase === 'stordito') return;
  l.piloni[indice] = A.PILONE_DURATA;
  eventi.push({ k: 'pilone', indice });
  if (l.piloni.some(t => t <= 0) || l.fase !== 'emerso') return;
  l.fase = 'stordito';
  l.timer = A.STORDIMENTO;
  l.stordimenti += 1;
  l.piloni = [0, 0, 0, 0];
  l.azioni = [];
  eventi.push({ k: 'leviatanoStordito' });
}

function spazzata(stato, l, eventi, S) {
  const prede = vivi(stato).filter(inArena);
  const centro = prede.length ? angoloDi(prede[Math.floor(S.caso(stato) * prede.length)]) : S.caso(stato) * Math.PI * 2;
  const giro = (S.caso(stato) - 0.5) * 0.5;
  const azione = { id: l.prossimoId = (l.prossimoId ?? 0) + 1, tipo: 'spazzata', t: A.SPAZZATA_MIRA * (l.faseVita === 3 ? 0.85 : 1), a0: centro - A.SPAZZATA_ARCO + giro, a1: centro + A.SPAZZATA_ARCO + giro, tentacolo: Math.floor(S.caso(stato) * 4), punti: [] };
  l.azioni.push(azione);
  eventi.push({ k: 'spazzata', id: azione.id, tentacolo: azione.tentacolo, a0: r2(azione.a0), a1: r2(azione.a1), t: r2(azione.t) });
}

function acido(stato, l, eventi, S) {
  const prede = vivi(stato).filter(inArena);
  const quanti = 4 + l.faseVita * 2;
  const punti = [];
  for (let i = 0; i < quanti; i++) {
    const g = prede.length ? prede[Math.floor(S.caso(stato) * prede.length)] : null;
    const a = S.caso(stato) * Math.PI * 2;
    const r = S.caso(stato) * 3;
    const base = g ?? { x: DELTA.x + Math.cos(a) * 16, z: DELTA.z + Math.sin(a) * 16 };
    punti.push([r2(base.x + Math.cos(a) * r), r2(base.z + Math.sin(a) * r)]);
  }
  const azione = { id: l.prossimoId = (l.prossimoId ?? 0) + 1, tipo: 'acido', t: A.ACIDO_MIRA, a0: 0, a1: 0, tentacolo: 0, punti };
  l.azioni.push(azione);
  eventi.push({ k: 'acido', id: azione.id, punti, t: azione.t });
}

function risolvi(stato, l, azione, eventi, S) {
  if (azione.tipo === 'spazzata') {
    for (const g of vivi(stato)) {
      const r = Math.hypot(g.x - DELTA.x, g.z - DELTA.z);
      if (!inArena(g) || r < A.SPAZZATA_RAGGI[0] || r > A.SPAZZATA_RAGGI[1]) continue;
      const a = angoloDi(g);
      const meta = (azione.a0 + azione.a1) / 2;
      if (Math.abs(differenza(a, meta)) > (azione.a1 - azione.a0) / 2) continue;
      if (suReale(stato.abisso, g) >= A.SALTO_SCHIVA) {
        eventi.push({ k: 'schivata', a: g.id });
        continue;
      }
      eventi.push({ k: 'colpoTentacolo', a: g.id, verso: r2(a) });
      S.ferisciGiocatore(stato, g, eventi, A.SPAZZATA_DANNO);
    }
    eventi.push({ k: 'spazzataColpisce', id: azione.id });
    return;
  }
  for (const [x, z] of azione.punti) {
    l.acidi.push({ x, z, timer: A.ACIDO_POZZA, colpo: 0.5 });
    for (const g of vivi(stato)) {
      if (Math.hypot(g.x - x, g.z - z) > A.ACIDO_RAGGIO) continue;
      eventi.push({ k: 'acidoColpisce', a: g.id });
      S.ferisciGiocatore(stato, g, eventi, A.ACIDO_DANNO);
    }
  }
  eventi.push({ k: 'acidoCade', id: azione.id });
}

function aggiornaAzioni(stato, l, dt, eventi, S) {
  l.azioni = l.azioni.filter(azione => {
    azione.t -= dt;
    if (azione.t > 0) return true;
    risolvi(stato, l, azione, eventi, S);
    return false;
  });
  l.acidi = l.acidi.filter(p => {
    p.timer -= dt;
    p.colpo -= dt;
    if (p.colpo <= 0) {
      p.colpo = 0.5;
      for (const g of vivi(stato)) if (Math.hypot(g.x - p.x, g.z - p.z) < A.ACIDO_RAGGIO * 0.8) S.ferisciGiocatore(stato, g, eventi, A.ACIDO_POZZA_DANNO / 2);
    }
    return p.timer > 0;
  });
}

function rinforzi(stato, l, dt, S) {
  stato.finale.rinforzi -= dt;
  if (stato.finale.rinforzi > 0) return;
  stato.finale.rinforzi = RINFORZI_OGNI[l.faseVita - 1];
  if (stato.zombie.filter(z => z.stato !== 'morto').length > RINFORZI_MAX) return;
  S.generaZombie(stato, { finestre: S.caso(stato) < 0.5 ? TANE_VASCA : BOCCAPORTI, corre: l.faseVita >= 2 ? true : undefined });
}

function ondata(stato, l, S) {
  for (let i = 0; i < A.ONDATA_IMMERSIONE + l.faseVita; i++) {
    if (stato.zombie.filter(z => z.stato !== 'morto').length >= R.ZOMBIE_VIVI_MAX) break;
    S.generaZombie(stato, { finestre: TANE_VASCA, corre: true, tipo: S.caso(stato) < 0.25 ? 'elettrico' : undefined });
  }
}

export function aggiornaLeviatano(stato, ab, dt, eventi, S, completa) {
  const l = ab.leviatano;
  if (!l) return;
  stato.finale.tempo += dt;
  const z = stato.zombie.find(q => q.id === l.id);
  for (let i = 0; i < l.piloni.length; i++) l.piloni[i] = Math.max(0, l.piloni[i] - dt);
  if (l.marea > 0 || l.faseVita >= 3) l.marea = Math.min(1, l.marea + dt / A.MAREA_SALITA);
  aggiornaAzioni(stato, l, dt, eventi, S);
  if (l.fase === 'morte') {
    l.timer -= dt;
    l.marea = Math.max(0, l.marea - dt / A.MAREA_SALITA);
    if (l.timer <= 0) completa();
    return;
  }
  if (!z || z.stato === 'morto') {
    l.fase = 'morte';
    l.timer = A.MORTE_LEVIATANO;
    if (z) z.timer = A.MORTE_LEVIATANO + 2;
    l.azioni = [];
    eventi.push({ k: 'leviatanoMorte', x: r2(z?.x ?? DELTA.x), z: r2(z?.z ?? DELTA.z) });
    dialogo(ab, 'vittoria', eventi);
    for (const q of stato.zombie) {
      if (q.stato === 'morto') continue;
      q.stato = 'morto';
      q.timer = 4;
      eventi.push({ k: 'ucciso', zombie: q.id, testa: false, da: null, x: q.x, z: q.z, bomba: true });
    }
    return;
  }
  const fase = z.faseBoss ?? 1;
  if (fase !== l.faseVita) {
    l.faseVita = fase;
    if (fase === 3) {
      eventi.push({ k: 'marea' });
      dialogo(ab, 'marea', eventi);
    }
  }
  rinforzi(stato, l, dt, S);
  l.timer -= dt;
  if (l.fase === 'risveglio') {
    if (l.timer <= 0) {
      l.fase = 'emerso';
      eventi.push({ k: 'leviatanoEmerso' });
    }
    return;
  }
  if (l.fase === 'immerso') {
    const orbita = OGGETTI.ORBITA_LEVIATANO;
    const f = 1 - Math.max(0, l.timer) / A.IMMERSIONE_DURATA;
    l.angolo = orbita.da + (orbita.a - orbita.da) * f;
    z.x = DELTA.x + Math.cos(l.angolo) * orbita.raggio;
    z.z = DELTA.z + Math.sin(l.angolo) * orbita.raggio;
    z.yaw = l.angolo + Math.PI;
    if (l.timer > 0) return;
    l.fase = 'riemersione';
    l.timer = A.RIEMERSIONE;
    z.x = DELTA.x;
    z.z = DELTA.z;
    eventi.push({ k: 'leviatanoRiemerge' });
    return;
  }
  if (l.fase === 'riemersione' || l.fase === 'stordito') {
    if (l.timer > 0) return;
    const eraStordito = l.fase === 'stordito';
    l.fase = 'emerso';
    l.prossimoAttacco = 2;
    eventi.push({ k: eraStordito ? 'leviatanoRiprende' : 'leviatanoEmerso' });
    return;
  }
  const preda = vivi(stato).filter(inArena).sort((a, b) => distanza(a, z) - distanza(b, z))[0];
  if (preda) z.yaw = Math.atan2(preda.x - z.x, preda.z - z.z);
  z.x = DELTA.x;
  z.z = DELTA.z;
  l.prossimaImmersione -= dt;
  if (l.prossimaImmersione <= 0 && l.azioni.length === 0) {
    l.fase = 'immerso';
    l.timer = A.IMMERSIONE_DURATA;
    l.prossimaImmersione = A.IMMERSIONE_DOPO[l.faseVita - 1];
    eventi.push({ k: 'leviatanoImmerso' });
    ondata(stato, l, S);
    return;
  }
  l.prossimoAttacco -= dt;
  if (l.prossimoAttacco > 0) return;
  l.prossimoAttacco = A.ATTACCO_OGNI[l.faseVita - 1];
  if (S.caso(stato) < 0.55) spazzata(stato, l, eventi, S);
  else acido(stato, l, eventi, S);
  if (l.faseVita >= 2 && S.caso(stato) < 0.35) spazzata(stato, l, eventi, S);
}
