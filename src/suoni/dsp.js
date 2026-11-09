export const DUE_PI = Math.PI * 2;
const BLOCCO = 32;
const NYQUIST_UTILE = 0.45;

export const caso = (a, b) => a + Math.random() * (b - a);
export const intero = (a, b) => Math.floor(caso(a, b + 1));
export const scegli = elenco => elenco[Math.floor(Math.random() * elenco.length)];
export const campioni = (secondi, sr) => Math.max(1, Math.round(secondi * sr));
export const vuoto = (secondi, sr) => new Float32Array(campioni(secondi, sr));
export const liscia = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
export const limita = (x, a, b) => Math.min(b, Math.max(a, x));
const valore = (v, t) => (typeof v === 'function' ? v(t) : v);

export function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) * 1.41;
}

export function bianco(n) {
  const d = new Float32Array(n);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return d;
}

export function rosa(n) {
  const d = new Float32Array(n);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + w * 0.099046;
    b1 = 0.963 * b1 + w * 0.2965164;
    b2 = 0.57 * b2 + w * 1.0526913;
    d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.22;
  }
  return d;
}

export function marrone(n) {
  const d = new Float32Array(n);
  let b = 0;
  for (let i = 0; i < n; i++) {
    b = (b + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    d[i] = b * 3.5;
  }
  return d;
}

export function lento(n, sr, frequenza) {
  const d = new Float32Array(n);
  const passo = Math.max(2, Math.round(sr / frequenza));
  let a = Math.random();
  let b = Math.random();
  for (let i = 0; i < n; i++) {
    const k = i % passo;
    if (k === 0 && i > 0) {
      a = b;
      b = Math.random();
    }
    d[i] = a + (b - a) * liscia(k / passo);
  }
  return d;
}

export function bassa(d, sr, taglio, passaggi = 1) {
  for (let p = 0; p < passaggi; p++) {
    let y = 0;
    let a = 0;
    for (let i = 0; i < d.length; i++) {
      if (i % BLOCCO === 0) a = 1 - Math.exp((-DUE_PI * Math.min(valore(taglio, i / sr), sr * NYQUIST_UTILE)) / sr);
      y += a * (d[i] - y);
      d[i] = y;
    }
  }
  return d;
}

export function alta(d, sr, taglio) {
  let y = 0;
  let a = 0;
  for (let i = 0; i < d.length; i++) {
    if (i % BLOCCO === 0) a = 1 - Math.exp((-DUE_PI * Math.min(valore(taglio, i / sr), sr * NYQUIST_UTILE)) / sr);
    y += a * (d[i] - y);
    d[i] -= y;
  }
  return d;
}

function coefficienti(tipo, f, q, sr) {
  const w = (DUE_PI * limita(f, 10, sr * NYQUIST_UTILE)) / sr;
  const cos = Math.cos(w);
  const alfa = Math.sin(w) / (2 * Math.max(0.1, q));
  const a0 = 1 + alfa;
  if (tipo === 'banda') return [alfa / a0, 0, -alfa / a0, (-2 * cos) / a0, (1 - alfa) / a0];
  if (tipo === 'bassa') return [(1 - cos) / 2 / a0, (1 - cos) / a0, (1 - cos) / 2 / a0, (-2 * cos) / a0, (1 - alfa) / a0];
  return [(1 + cos) / 2 / a0, -(1 + cos) / a0, (1 + cos) / 2 / a0, (-2 * cos) / a0, (1 - alfa) / a0];
}

export function filtra(d, sr, tipo, frequenza, q = 0.707) {
  const varia = typeof frequenza === 'function' || typeof q === 'function';
  let c = coefficienti(tipo, valore(frequenza, 0), valore(q, 0), sr);
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let i = 0; i < d.length; i++) {
    if (varia && i % BLOCCO === 0) c = coefficienti(tipo, valore(frequenza, i / sr), valore(q, i / sr), sr);
    const x = d[i];
    const y = c[0] * x + c[1] * x1 + c[2] * x2 - c[3] * y1 - c[4] * y2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
    d[i] = y;
  }
  return d;
}

export function inviluppa(d, sr, forma) {
  for (let i = 0; i < d.length; i++) d[i] *= forma(i / sr);
  return d;
}

export const percussione = (attacco, tau) => t => (t < attacco ? t / attacco : Math.exp(-(t - attacco) / tau));
export const gonfia = (attacco, durata, rilascio) => t => {
  if (t < attacco) return liscia(t / attacco);
  if (t > durata - rilascio) return liscia((durata - t) / rilascio);
  return 1;
};
export const campanaGauss = (centro, larghezza) => t => Math.exp(-(((t - centro) / larghezza) ** 2));

export function satura(d, spinta) {
  const k = Math.tanh(spinta);
  for (let i = 0; i < d.length; i++) d[i] = Math.tanh(d[i] * spinta) / k;
  return d;
}

export function picco(d) {
  let m = 0;
  for (let i = 0; i < d.length; i++) m = Math.max(m, Math.abs(d[i]));
  return m;
}

export function normalizza(d, obiettivo = 0.9) {
  const m = picco(d);
  if (m > 0) for (let i = 0; i < d.length; i++) d[i] *= obiettivo / m;
  return d;
}

export function rms(d) {
  let s = 0;
  for (let i = 0; i < d.length; i++) s += d[i] * d[i];
  return Math.sqrt(s / d.length);
}

export function normalizzaRms(d, obiettivo) {
  const r = rms(d);
  if (r > 0) for (let i = 0; i < d.length; i++) d[i] *= obiettivo / r;
  return d;
}

export function sfuma(d, sr, entrata = 0.001, uscita = 0.01) {
  const ne = Math.min(d.length, campioni(entrata, sr));
  const nu = Math.min(d.length, campioni(uscita, sr));
  for (let i = 0; i < ne; i++) d[i] *= i / ne;
  for (let i = 0; i < nu; i++) d[d.length - 1 - i] *= i / nu;
  return d;
}

export function mescola(destinazione, sorgente, sr, inizio = 0, guadagno = 1) {
  const o = Math.round(inizio * sr);
  const fine = Math.min(sorgente.length, destinazione.length - o);
  for (let i = Math.max(0, -o); i < fine; i++) destinazione[o + i] += sorgente[i] * guadagno;
  return destinazione;
}

export function scintilla(sr, tau, taglio = 0) {
  const d = bianco(campioni(tau * 5, sr));
  if (taglio > 0) bassa(d, sr, taglio);
  return inviluppa(d, sr, t => Math.exp(-t / tau));
}

export function risuona(eccitazione, sr, modi, secondi) {
  const n = campioni(secondi, sr);
  const out = new Float32Array(n);
  for (const [f, tau, a] of modi) {
    if (f >= sr * NYQUIST_UTILE || f <= 0) continue;
    const w = (DUE_PI * f) / sr;
    const r = Math.exp(-1 / (tau * sr));
    const c1 = 2 * r * Math.cos(w);
    const c2 = r * r;
    const g = a * Math.sin(w);
    const lunghezza = Math.min(n, eccitazione.length + Math.ceil(tau * sr * 7));
    let y1 = 0;
    let y2 = 0;
    for (let i = 0; i < lunghezza; i++) {
      const y = (i < eccitazione.length ? eccitazione[i] * g : 0) + c1 * y1 - c2 * y2;
      y2 = y1;
      y1 = y;
      out[i] += y;
    }
  }
  return out;
}

export function tono(destinazione, sr, inizio, { f, fFine = f, glissando = 0.02, tau = 0.05, attacco = 0.001, ampiezza = 1, durata = tau * 7, armonica = 0 }) {
  const o = Math.round(inizio * sr);
  const n = Math.min(campioni(durata, sr), destinazione.length - o);
  let fase = Math.random() * DUE_PI;
  for (let i = Math.max(0, -o); i < n; i++) {
    const t = i / sr;
    const freq = fFine + (f - fFine) * Math.exp(-t / glissando);
    fase += (DUE_PI * freq) / sr;
    const inv = t < attacco ? t / attacco : Math.exp(-(t - attacco) / tau);
    destinazione[o + i] += ampiezza * inv * (Math.sin(fase) + armonica * Math.sin(2 * fase));
  }
  return destinazione;
}

export function impulsi(n, sr, densita, ampiezza = [0.3, 1]) {
  const d = new Float32Array(n);
  let t = 0;
  while (true) {
    const rate = Math.max(1e-3, valore(densita, t));
    t += -Math.log(1 - Math.random()) / rate;
    const i = Math.floor(t * sr);
    if (i >= n) return d;
    d[i] += caso(ampiezza[0], ampiezza[1]) * (Math.random() < 0.5 ? -1 : 1);
  }
}

export function seghetta(n, sr, frequenza) {
  const d = new Float32Array(n);
  let fase = Math.random();
  for (let i = 0; i < n; i++) {
    const dt = Math.min(0.5, valore(frequenza, i / sr) / sr);
    fase += dt;
    if (fase >= 1) fase -= 1;
    let v = 2 * fase - 1;
    if (fase < dt) {
      const x = fase / dt;
      v -= x + x - x * x - 1;
    } else if (fase > 1 - dt) {
      const x = (fase - 1) / dt;
      v -= x * x + x + x + 1;
    }
    d[i] = v;
  }
  return d;
}

export function pizzica(sr, f, secondi, { brillantezza = 0.5, smorzamento = 0.996 } = {}) {
  const n = campioni(secondi, sr);
  const out = new Float32Array(n);
  const periodo = sr / f;
  const lunghezza = Math.max(2, Math.floor(periodo - 0.5));
  const frazione = periodo - 0.5 - lunghezza;
  const c = (1 - frazione) / (1 + frazione);
  const linea = bianco(lunghezza);
  let y = 0;
  for (let i = 0; i < lunghezza; i++) {
    y += brillantezza * (linea[i] - y);
    linea[i] = y;
  }
  let indice = 0;
  let precedente = 0;
  let apX = 0;
  let apY = 0;
  for (let i = 0; i < n; i++) {
    const s = linea[indice];
    const media = smorzamento * 0.5 * (s + precedente);
    precedente = s;
    const ap = c * media + apX - c * apY;
    apX = media;
    apY = ap;
    linea[indice] = ap;
    indice = (indice + 1) % lunghezza;
    out[i] = s;
  }
  return sfuma(out, sr, 0.0005, 0.05);
}

export function cicla(d, sr, sovrapposizione) {
  const k = Math.min(Math.floor(d.length / 3), campioni(sovrapposizione, sr));
  const n = d.length - k;
  const out = d.slice(0, n);
  for (let i = 0; i < k; i++) {
    const x = i / k;
    out[i] = d[i] * Math.sin((x * Math.PI) / 2) + d[n + i] * Math.cos((x * Math.PI) / 2);
  }
  return out;
}

export function panorama(mono, posizione) {
  const angolo = ((limita(posizione, -1, 1) + 1) * Math.PI) / 4;
  const sinistra = new Float32Array(mono.length);
  const destra = new Float32Array(mono.length);
  const gs = Math.cos(angolo);
  const gd = Math.sin(angolo);
  for (let i = 0; i < mono.length; i++) {
    sinistra[i] = mono[i] * gs;
    destra[i] = mono[i] * gd;
  }
  return [sinistra, destra];
}

export function aggiungiStereo(destinazione, sorgente, sr, inizio = 0, guadagno = 1) {
  mescola(destinazione[0], sorgente[0], sr, inizio, guadagno);
  mescola(destinazione[1], sorgente[1], sr, inizio, guadagno);
  return destinazione;
}

export function stereoVuoto(secondi, sr) {
  return [vuoto(secondi, sr), vuoto(secondi, sr)];
}

export function finisci(d, sr, obiettivo = 0.9, uscita = 0.02) {
  alta(d, sr, 25);
  sfuma(d, sr, 0.0005, uscita);
  return normalizza(d, obiettivo);
}

export function finisciStereo(coppia, sr, obiettivo = 0.9, uscita = 0.05) {
  for (const d of coppia) {
    alta(d, sr, 25);
    sfuma(d, sr, 0.0005, uscita);
  }
  const m = Math.max(picco(coppia[0]), picco(coppia[1]));
  if (m > 0) for (const d of coppia) for (let i = 0; i < d.length; i++) d[i] *= obiettivo / m;
  return coppia;
}
