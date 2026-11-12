import { ALTEZZA_SOFFITTO, ostacoliPerGiocatori, quota, stessoPiano } from '../mappa.js';
import { vistaLibera } from '../fisica.js';
import { A, PASSO } from './costanti.js';
import { r2, distanza, vivi, nuovoId, dialogo } from './stato.js';

const ATTIVI = new Set(['dentro', 'attacco']);

export const palombariVivi = stato => stato.zombie.filter(z => z.tipo === 'palombaro' && z.stato !== 'morto');

export function programma(stato, ab, S) {
  if (stato.round >= A.PALOMBARO_DAL_ROUND && stato.round >= ab.prossimoPalombaro) {
    ab.palombaroTra = A.PALOMBARO_DOPO;
    ab.prossimoPalombaro = stato.round + A.PALOMBARO_OGNI[S.caso(stato) < 0.5 ? 0 : 1];
    return;
  }
  if (ab.passo === PASSO.AUTOPSIA && palombariVivi(stato).length === 0) ab.palombaroTra = A.PALOMBARO_DOPO;
}

export function dannoPalombaro(zombie, danno, opzioni, giocatore) {
  if (opzioni.cariddi || opzioni.tridente || opzioni.coltello || opzioni.frantumato || opzioni.decompressione || !giocatore) return danno;
  const fx = Math.sin(zombie.yaw);
  const fz = Math.cos(zombie.yaw);
  const dx = giocatore.x - zombie.x;
  const dz = giocatore.z - zombie.z;
  const d = Math.hypot(dx, dz) || 1;
  return Math.round(danno * ((fx * dx + fz * dz) / d < -0.3 ? A.BOMBOLE : A.CORAZZA_FRONTE));
}

function schermi(stato) {
  return ostacoliPerGiocatori(new Set(stato.porte)).filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= 1.5);
}

function arpione(stato, ab, z, dt, eventi, S, muri) {
  z.arpioneTra = (z.arpioneTra ?? A.ARPIONE_OGNI * 0.5) - dt;
  if (z.mira) {
    z.mira.t -= dt;
    z.trattenuto = Math.max(z.trattenuto ?? 0, 0.1);
    z.stato = 'dentro';
    const preda = vivi(stato).find(g => g.id === z.mira.a);
    if (preda) z.yaw = Math.atan2(preda.x - z.x, preda.z - z.z);
    if (z.mira.t > 0) return;
    const colpita = preda && distanza(preda, z) < A.ARPIONE_MASSIMO + 2 && vistaLibera(z, preda, muri);
    z.mira = null;
    z.arpioneTra = A.ARPIONE_OGNI;
    if (!colpita) {
      eventi.push({ k: 'arpioneMancato', zombie: z.id });
      return;
    }
    const d = distanza(preda, z) || 1;
    const meta = { x: z.x + ((preda.x - z.x) / d) * 1.7, z: z.z + ((preda.z - z.z) / d) * 1.7 };
    S.ferisciGiocatore(stato, preda, eventi, A.ARPIONE_DANNO);
    z.trattenuto = A.ARPIONE_TIRO + 0.5;
    eventi.push({ k: 'arpione', zombie: z.id, a: preda.id, x: r2(meta.x), z: r2(meta.z), dx: r2(z.x), dz: r2(z.z) });
    return;
  }
  if (z.arpioneTra > 0 || !ATTIVI.has(z.stato)) return;
  const preda = vivi(stato)
    .map(g => ({ g, d: distanza(g, z) }))
    .filter(p => p.d >= A.ARPIONE_MINIMO && p.d <= A.ARPIONE_MASSIMO && stessoPiano(p.g, z) && vistaLibera(z, p.g, muri))
    .sort((a, b) => a.d - b.d)[0];
  if (!preda) return;
  z.mira = { a: preda.g.id, t: A.ARPIONE_MIRA };
  eventi.push({ k: 'arpioneMira', zombie: z.id, a: preda.g.id });
}

function vapore(stato, ab, z, dt, eventi) {
  z.vaporeTra = (z.vaporeTra ?? A.VAPORE_OGNI * 0.6) - dt;
  if (z.vaporeTra > 0 || !vivi(stato).some(g => distanza(g, z) < A.VAPORE_VICINO)) return;
  z.vaporeTra = A.VAPORE_OGNI;
  ab.nubi.push({ id: nuovoId(ab), x: r2(z.x), z: r2(z.z), y: r2(quota(z.x, z.z)), timer: A.VAPORE_DURATA, raggio: A.VAPORE_RAGGIO, colpo: 0 });
  eventi.push({ k: 'vapore', zombie: z.id, x: r2(z.x), z: r2(z.z) });
}

function aggiornaNubi(stato, ab, dt, eventi, S) {
  ab.nubi = ab.nubi.filter(n => {
    n.timer -= dt;
    n.colpo -= dt;
    if (n.colpo <= 0) {
      n.colpo = A.VAPORE_COLPO;
      for (const g of vivi(stato)) {
        if (distanza(g, n) > n.raggio || Math.abs(quota(g.x, g.z) - n.y) > 2) continue;
        eventi.push({ k: 'scottato', a: g.id });
        S.ferisciGiocatore(stato, g, eventi, A.VAPORE_DANNO);
      }
    }
    return n.timer > 0;
  });
}

export function aggiornaPalombari(stato, ab, dt, eventi, S) {
  if (ab.passo === PASSO.AUTOPSIA && ab.nucleo === 0 && ab.palombaroTra === null && stato.fase === 'gioco' && palombariVivi(stato).length === 0) ab.palombaroTra = A.PALOMBARO_DOPO * 3;
  if (ab.palombaroTra !== null && stato.fase === 'gioco') {
    ab.palombaroTra -= dt;
    if (ab.palombaroTra <= 0) {
      ab.palombaroTra = null;
      S.generaZombie(stato, { tipo: 'palombaro' });
      eventi.push({ k: 'boss', tipo: 'palombaro' });
      dialogo(ab, 'palombaro', eventi);
    }
  }
  const palombari = palombariVivi(stato);
  if (palombari.length) {
    const muri = schermi(stato);
    for (const z of palombari) {
      if (z.stato === 'emerge' || z.stato === 'arriva' || z.stato === 'assi' || z.stato === 'scavalca') continue;
      arpione(stato, ab, z, dt, eventi, S, muri);
      vapore(stato, ab, z, dt, eventi);
    }
  }
  if (ab.nubi.length) aggiornaNubi(stato, ab, dt, eventi, S);
}
