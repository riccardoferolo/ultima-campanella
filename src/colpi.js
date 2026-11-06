import { ALTEZZA_SOFFITTO } from './mappa.js';

export const CORPO = Object.freeze({ raggio: 0.32, basso: 0, alto: 1.45 });
export const TESTA = Object.freeze({ raggio: 0.17, altezza: 1.62 });

export function raggioScatola(o, d, s, y0 = 0, y1 = ALTEZZA_SOFFITTO) {
  let entrata = 0;
  let uscita = Infinity;
  for (const [origine, verso, min, max] of [[o.x, d.x, s.x0, s.x1], [o.y, d.y, y0, y1], [o.z, d.z, s.z0, s.z1]]) {
    if (Math.abs(verso) < 1e-9) {
      if (origine < min || origine > max) return Infinity;
      continue;
    }
    let t1 = (min - origine) / verso;
    let t2 = (max - origine) / verso;
    if (t1 > t2) [t1, t2] = [t2, t1];
    entrata = Math.max(entrata, t1);
    uscita = Math.min(uscita, t2);
    if (entrata > uscita) return Infinity;
  }
  return entrata;
}

export function raggioSfera(o, d, c, raggio) {
  const ox = o.x - c.x;
  const oy = o.y - c.y;
  const oz = o.z - c.z;
  const b = ox * d.x + oy * d.y + oz * d.z;
  const cc = ox * ox + oy * oy + oz * oz - raggio * raggio;
  const delta = b * b - cc;
  if (delta < 0) return Infinity;
  const t = -b - Math.sqrt(delta);
  return t >= 0 ? t : Infinity;
}

export function raggioCilindro(o, d, cx, cz, raggio, y0, y1) {
  const ox = o.x - cx;
  const oz = o.z - cz;
  const a = d.x * d.x + d.z * d.z;
  if (a < 1e-12) return Infinity;
  const b = ox * d.x + oz * d.z;
  const c = ox * ox + oz * oz - raggio * raggio;
  const delta = b * b - a * c;
  if (delta < 0) return Infinity;
  const t = (-b - Math.sqrt(delta)) / a;
  if (t < 0) return Infinity;
  const y = o.y + d.y * t;
  return y >= y0 && y <= y1 ? t : Infinity;
}

export function primoMuro(o, d, scatole) {
  let minimo = Infinity;
  for (const s of scatole) minimo = Math.min(minimo, raggioScatola(o, d, s, 0, s.altezza ?? ALTEZZA_SOFFITTO));
  return minimo;
}

export function colpisciZombie(o, d, bersagli, scatole, portata = Infinity) {
  const muro = Math.min(portata, primoMuro(o, d, scatole));
  let migliore = null;
  for (const b of bersagli) {
    const testa = raggioSfera(o, d, b.testa ?? { x: b.x, y: TESTA.altezza, z: b.z }, TESTA.raggio);
    const corpo = raggioCilindro(o, d, b.x, b.z, b.raggio ?? CORPO.raggio, CORPO.basso, b.alto ?? CORPO.alto);
    const t = Math.min(testa, corpo);
    if (t >= muro || (migliore && t >= migliore.t)) continue;
    migliore = { id: b.id, t, testa: testa <= corpo };
  }
  return migliore ?? { id: null, t: muro, testa: false };
}

export function esplosione(punto, bersagli, raggio) {
  const colpiti = [];
  for (const b of bersagli) {
    const d = Math.hypot(b.x - punto.x, CORPO.alto / 2 - punto.y, b.z - punto.z);
    if (d < raggio) colpiti.push({ id: b.id, fattore: 1 - d / raggio });
  }
  return colpiti;
}

export function direzioneDa(yaw, pitch) {
  const c = Math.cos(pitch);
  return { x: Math.sin(yaw) * c, y: Math.sin(pitch), z: Math.cos(yaw) * c };
}

export function disperdi(d, ampiezza, caso) {
  if (ampiezza <= 0) return d;
  const x = d.x + (caso() - 0.5) * 2 * ampiezza;
  const y = d.y + (caso() - 0.5) * 2 * ampiezza;
  const z = d.z + (caso() - 0.5) * 2 * ampiezza;
  const l = Math.hypot(x, y, z);
  return { x: x / l, y: y / l, z: z / l };
}
