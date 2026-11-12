import { creaRumore } from '../grafica/abisso/rumore.js';

const SPESSORE = 0.4;
const BASE_MURO = -9;
const ALTEZZA_MURO = 40;
const PASSO_ARCO = 0.7;
export const ALTEZZA_SOFFITTO = 4;
export const ALTEZZA_RECINZIONE = 1.1;
export const ATMOSFERA = Object.freeze({ buio: 0x03141c, cielo: 0x052230, nebbiaDentro: 46, nebbiaFuori: 70, nebbiaVicino: 3 });

export const ALPHA = Object.freeze({ x: 0, z: 0, raggio: 13.2, altezza: 11 });
export const REATTORE = Object.freeze({ x: 38, z: 0, pozzo: 9.15, nucleo: 3, rampa: 6.3, fondo: -4, allagato: -1 });
export const DELTA = Object.freeze({ x: 52, z: -44, raggio: 24.2, vasca: 9.6, platea: 12.5, gradone: 1.25, alzata: 0.375, fondo: -3, marea: -1.6, acqua: -3.6, altezza: 22 });
export const SANTUARIO = Object.freeze({ x0: -22, z0: -60, x1: 22, z1: -26, fondo: -2, scala: 5 });
export const PIANO_GALLERIA = 0;

const fermo = (min, max, v) => Math.min(max, Math.max(min, v));
const punto = (x, z) => Object.freeze({ x, z });
const polare = (centro, r, angolo) => punto(centro.x + Math.cos(angolo) * r, centro.z + Math.sin(angolo) * r);
const nelleAperture = (angolo, aperture) => aperture.some(([a, b]) => {
  const t = Math.atan2(Math.sin(angolo - (a + b) / 2), Math.cos(angolo - (a + b) / 2));
  return Math.abs(t) <= (b - a) / 2;
});
const apertura = (angolo, largo, r) => {
  const mezzo = Math.asin(Math.min(1, largo / 2 / r));
  return [angolo - mezzo, angolo + mezzo];
};

export function arco(centro, r, spessore, aperture = [], extra = {}) {
  const pezzi = Math.ceil((Math.PI * 2 * r) / PASSO_ARCO);
  const scatole = [];
  for (let i = 0; i < pezzi; i++) {
    const a0 = (i / pezzi) * Math.PI * 2 - Math.PI;
    const a1 = ((i + 1) / pezzi) * Math.PI * 2 - Math.PI;
    if (nelleAperture((a0 + a1) / 2, aperture)) continue;
    const xs = [];
    const zs = [];
    for (const a of [a0, a1]) for (const rr of [r - spessore / 2, r + spessore / 2]) {
      xs.push(centro.x + Math.cos(a) * rr);
      zs.push(centro.z + Math.sin(a) * rr);
    }
    scatole.push(Object.freeze({ x0: Math.min(...xs), z0: Math.min(...zs), x1: Math.max(...xs), z1: Math.max(...zs), base: BASE_MURO, altezza: ALTEZZA_MURO, ...extra }));
  }
  return scatole;
}

function settore(centro, r, spessore, da, a, extra) {
  const pezzi = Math.max(1, Math.ceil(((a - da) * r) / PASSO_ARCO));
  return Array.from({ length: pezzi }, (_, i) => {
    const a0 = da + ((a - da) * i) / pezzi;
    const a1 = da + ((a - da) * (i + 1)) / pezzi;
    const xs = [];
    const zs = [];
    for (const t of [a0, a1]) for (const rr of [r - spessore / 2, r + spessore / 2]) {
      xs.push(centro.x + Math.cos(t) * rr);
      zs.push(centro.z + Math.sin(t) * rr);
    }
    return Object.freeze({ x0: Math.min(...xs), z0: Math.min(...zs), x1: Math.max(...xs), z1: Math.max(...zs), ...extra });
  });
}

function disco(centro, r, base, altezza, extra = {}) {
  const passo = 0.6;
  const scatole = [];
  for (let z = -r; z < r; z += passo) {
    const z1 = Math.min(r, z + passo);
    const vicino = z < 0 && z1 > 0 ? 0 : Math.min(Math.abs(z), Math.abs(z1));
    const largo = Math.sqrt(Math.max(0, r * r - vicino * vicino));
    scatole.push(Object.freeze({ x0: centro.x - largo, z0: centro.z + z, x1: centro.x + largo, z1: centro.z + z1, base, altezza, ...extra }));
  }
  return scatole;
}

const zona = (id, nome, x0, z0, x1, z1, pavimento, tetto, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, tetto, ...extra });

export const ZONE = Object.freeze([
  zona('cupola', "Cupola d'Ingresso", -13.4, -13.4, 13.4, 13.4, 'grata', 11),
  zona('tunnel', 'Tunnel di cristallo', 13.4, -1.6, 24, 1.6, 'grata', 3.4),
  zona('reattore', "Sala del Reattore a Oricalco", 24, -14, 52.5, 14, 'grata', 10),
  zona('stagna', 'Camera Stagna', 52.5, -3, 58.5, 3, 'grata', 3.6),
  zona('servizio', 'Corridoio di servizio', 54.2, 3, 56.8, 14, 'grata', 3.2),
  zona('servizioSud', 'Corridoio delle pompe', 44.2, 14, 56.8, 16.6, 'grata', 3.2),
  zona('galleria', 'Galleria del Consorzio', -1.6, -26, 1.6, -13.4, 'grata', 3.4),
  zona('santuario', 'Santuario di Atlantide', -22, -60, 22, -26, 'marmo', 18),
  zona('passaggio', 'Passaggio di Poseidone', 22, -45.6, 28.4, -42.4, 'marmo', 5),
  zona('anfiteatro', 'Anfiteatro Abissale', 27.8, -68.2, 76.2, -19.8, 'marmo', 22),
  zona('sala', 'Batiscafo di discesa', 120, -5, 134, 5, 'grata', 3.4, { sala: true }),
]);

export const SALA = Object.freeze({ x0: 120, z0: -5, x1: 134, z1: 5 });
export const LIMITI = Object.freeze({ x0: -30, z0: -78, x1: 86, z1: 24 });

const rumoreFondale = creaRumore(9);
const DISTANZA_PIANA = 7;

function distanzaStrutture(x, z) {
  const dAlpha = Math.hypot(x - ALPHA.x, z - ALPHA.z) - ALPHA.raggio;
  const dDelta = Math.hypot(x - DELTA.x, z - DELTA.z) - DELTA.raggio;
  const rettangolo = (x0, z0, x1, z1) => Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(z0 - z, 0, z - z1));
  return Math.min(dAlpha, dDelta, rettangolo(13, -1.8, 24, 1.8), rettangolo(24, -14.2, 58.6, 16.8), rettangolo(-1.8, -26, 1.8, -13), rettangolo(-22.4, -60.4, 22.4, -25.6), rettangolo(22, -46, 28.4, -42));
}

export function fondale(x, z) {
  const lontano = fermo(0, 1, (distanzaStrutture(x, z) - DISTANZA_PIANA) / 26);
  if (lontano <= 0) return -0.15;
  const dolce = lontano * lontano * (3 - 2 * lontano);
  const colline = rumoreFondale.fbm(x * 0.018, 0.3, z * 0.018, 5) * 9;
  const canyon = -Math.pow(Math.max(0, rumoreFondale.creste(x * 0.011 + 3.1, 1.7, z * 0.011 - 2.3, 4) - 0.38), 1.4) * 34;
  const rugosita = rumoreFondale.fbm(x * 0.09, 2.1, z * 0.09, 3) * 1.1;
  return -0.15 + dolce * (colline + canyon + rugosita - 1.5);
}

function quotaReattore(x, z) {
  const dx = x - REATTORE.x;
  const dz = z - REATTORE.z;
  const r = Math.hypot(dx, dz);
  if (r >= REATTORE.pozzo) return 0;
  if (r < REATTORE.rampa || dx < 0) return REATTORE.fondo;
  const angolo = Math.atan2(dz, dx);
  return REATTORE.fondo * fermo(0, 1, (angolo + Math.PI / 2) / Math.PI);
}

export function quotaDelta(x, z) {
  const r = Math.hypot(x - DELTA.x, z - DELTA.z);
  if (r < DELTA.platea) return DELTA.fondo;
  const gradino = Math.floor((r - DELTA.platea) / DELTA.gradone) + 1;
  return Math.min(0, DELTA.fondo + gradino * DELTA.alzata);
}

function quotaSantuario(z) {
  const sceso = (SANTUARIO.z1 - z) / 1;
  if (sceso <= 0) return 0;
  return Math.max(SANTUARIO.fondo, -0.4 * Math.ceil(Math.min(sceso, SANTUARIO.scala)));
}

const RAMPE_SANTUARIO = Object.freeze([[-22, -1, -41.2, -38.8], [22, 1, -53.2, -50.8]]);

export function quota(x, z) {
  if (x >= 24 && x <= 52.6 && z >= -14 && z <= 14) return quotaReattore(x, z);
  if (x >= 27.8 && x <= 76.2 && z >= -68.2 && z <= -19.8 && Math.hypot(x - DELTA.x, z - DELTA.z) <= DELTA.raggio + 0.4) return quotaDelta(x, z);
  if (x >= 22 && x <= 28.4 && z >= -45.6 && z <= -42.4) return SANTUARIO.fondo * fermo(0, 1, (27.6 - x) / 5.2);
  if (x >= SANTUARIO.x0 && x <= SANTUARIO.x1 && z >= SANTUARIO.z0 && z <= SANTUARIO.z1) return quotaSantuario(z);
  if (x >= 120 && x <= 134 && z >= -5 && z <= 5) return 0;
  if (Math.hypot(x - ALPHA.x, z - ALPHA.z) <= ALPHA.raggio + 0.4) return 0;
  if (x >= 13 && x <= 24 && z >= -1.8 && z <= 1.8) return 0;
  if (x >= -1.8 && x <= 1.8 && z >= -26 && z <= -13) return 0;
  if (x >= 52.4 && x <= 58.6 && z >= -3.2 && z <= 16.8) return 0;
  if (x >= 44 && x <= 58.6 && z >= 13.8 && z <= 16.8) return 0;
  for (const [x0, verso, za, zb] of RAMPE_SANTUARIO) {
    const d = (x - x0) * verso;
    if (d >= 0 && d <= 4.5 && z >= za && z <= zb) return SANTUARIO.fondo + (fondale(x, z) - SANTUARIO.fondo) * Math.min(1, d / 4.5);
  }
  return fondale(x, z);
}

const parete = (x0, z0, x1, z1, extra = {}) => Object.freeze({ x0, z0, x1, z1, base: BASE_MURO, altezza: ALTEZZA_MURO, ...extra });

function lato(asse, fisso, da, a, buchi = [], extra = {}) {
  const tratti = [];
  let inizio = da;
  for (const [b0, b1] of [...buchi].sort((p, q) => p[0] - q[0])) {
    if (b0 > inizio) tratti.push([inizio, b0]);
    inizio = Math.max(inizio, b1);
  }
  if (inizio < a) tratti.push([inizio, a]);
  return tratti.map(([t0, t1]) => (asse === 'x'
    ? parete(fisso - SPESSORE / 2, t0, fisso + SPESSORE / 2, t1, extra)
    : parete(t0, fisso - SPESSORE / 2, t1, fisso + SPESSORE / 2, extra)));
}

export const BOCCAPORTI_ALPHA = Object.freeze([Math.PI, (3 * Math.PI) / 4, Math.PI / 2, Math.PI / 4]);
export const BOCCAPORTI_DELTA = Object.freeze([0.55, 2.3, -2.45, -0.75]);
export const LARGO_BOCCAPORTO = 2;

const APERTURE_ALPHA = Object.freeze([
  apertura(0, 3.2, ALPHA.raggio),
  apertura(-Math.PI / 2, 3.2, ALPHA.raggio),
  ...BOCCAPORTI_ALPHA.map(a => apertura(a, LARGO_BOCCAPORTO, ALPHA.raggio)),
]);
const APERTURE_DELTA = Object.freeze([
  apertura(Math.PI, 3.2, DELTA.raggio),
  ...BOCCAPORTI_DELTA.map(a => apertura(a, LARGO_BOCCAPORTO, DELTA.raggio)),
]);
const RAMPA_CIMA = Object.freeze([-Math.PI / 2 + 0.02, -Math.PI / 2 + 0.31]);

export const MURI = Object.freeze([
  ...arco(ALPHA, ALPHA.raggio, 0.5, APERTURE_ALPHA, { parte: 'cupola' }),
  ...lato('z', -1.6, 12.9, 24.2, [], { parte: 'tunnel' }), ...lato('z', 1.6, 12.9, 24.2, [], { parte: 'tunnel' }),
  ...lato('x', 24, -14.2, 14.2, [[-1.6, 1.6]], { parte: 'reattore' }),
  ...lato('z', -14, 24, 52.7, [[29, 31], [44, 46]], { parte: 'reattore' }),
  ...lato('z', 14, 24, 54.2, [[29, 31], [44.2, 47.2]], { parte: 'reattore' }),
  ...lato('x', 52.5, -14.2, 14, [[-1.3, 1.3]], { parte: 'reattore' }),
  ...lato('z', -3, 52.5, 58.7, [], { parte: 'stagna' }), ...lato('z', 3, 52.5, 58.7, [[54.2, 56.8]], { parte: 'stagna' }),
  ...lato('x', 58.5, -3, 3, [], { parte: 'stagna', portellone: true }),
  ...lato('x', 54.2, 3, 14, [], { parte: 'servizio' }), ...lato('x', 56.8, 3, 16.8, [], { parte: 'servizio' }),
  ...lato('z', 16.6, 44, 56.8, [[49, 51]], { parte: 'servizio' }), ...lato('x', 44.2, 14, 16.8, [], { parte: 'servizio' }),
  ...lato('x', -1.6, -26.2, -12.9, [], { parte: 'galleria' }), ...lato('x', 1.6, -26.2, -12.9, [], { parte: 'galleria' }),
  ...lato('z', -26, -22.2, 22.2, [[-1.6, 1.6]], { parte: 'santuario' }),
  ...lato('x', -22, -60.2, -25.8, [[-41, -39]], { parte: 'santuario' }),
  ...lato('z', -60, -22.2, 22.2, [], { parte: 'santuario' }),
  ...lato('x', 22, -60.2, -25.8, [[-45.6, -42.4], [-53, -51]], { parte: 'santuario' }),
  ...lato('z', -45.6, 22, 28.6, [], { parte: 'passaggio' }), ...lato('z', -42.4, 22, 28.6, [], { parte: 'passaggio' }),
  ...arco(DELTA, DELTA.raggio, 0.5, APERTURE_DELTA, { parte: 'anfiteatro' }),
  parete(119.8, -5.2, 134.2, -5), parete(119.8, 5, 134.2, 5.2), parete(119.8, -5, 120, 5), parete(134, -5, 134.2, 5),
]);

export const RECINZIONI = Object.freeze([
  ...settore(REATTORE, REATTORE.pozzo, 0.3, -Math.PI / 2 + 0.31, Math.PI * 1.5 + 0.02, { base: REATTORE.fondo, altezza: -REATTORE.fondo + ALTEZZA_RECINZIONE, parte: 'parapetto' }),
  ...settore(REATTORE, REATTORE.rampa, 0.25, -Math.PI / 2, Math.PI / 3, { base: REATTORE.fondo, altezza: -REATTORE.fondo + ALTEZZA_RECINZIONE, parte: 'parapettoRampa' }),
  Object.freeze({ x0: 37.55, z0: -9.3, x1: 37.85, z1: -6.15, base: REATTORE.fondo, altezza: -REATTORE.fondo + ALTEZZA_RECINZIONE, parte: 'parapettoRampa' }),
]);

const ostacolo = (tipo, x0, z0, x1, z1, base, altezza, extra = {}) => Object.freeze({ x0, z0, x1, z1, base, altezza, tipo, ...extra });
const quadro = (tipo, x, z, lato2, base, altezza, extra) => ostacolo(tipo, x - lato2 / 2, z - lato2 / 2, x + lato2 / 2, z + lato2 / 2, base, altezza, extra);

export const COLONNE_SANTUARIO = Object.freeze([-34, -40, -46, -52].flatMap((z, i) => [
  Object.freeze({ x: -12, z, rotta: i % 2 === 1, alta: i % 2 ? 3.2 + i : 14 }),
  Object.freeze({ x: 12, z, rotta: i === 2, alta: i === 2 ? 5.5 : 14 }),
]));
export const STATUE = Object.freeze([
  Object.freeze({ x: -9.5, z: -53.5, verso: 0.35 }),
  Object.freeze({ x: 9.5, z: -53.5, verso: -0.35 }),
]);
export const BRACIERI = Object.freeze([punto(-5, -36), punto(5, -36), punto(-5, -49), punto(5, -49)]);
export const CANNE = Object.freeze([-2, -1, 0, 1, 2].map(k => polare(DELTA, 21.7, -Math.PI / 2 + k * 0.135)));
export const COLONNE_SIMBOLI = Object.freeze([2.62, 1.88, 0.92, 0.18, -0.42].map(a => polare(DELTA, 18.7, a)));
export const PILONI = Object.freeze([-3, -1, 1, 3].map(k => polare(DELTA, 15.6, (k * Math.PI) / 4)));
export const SIMBOLI = Object.freeze(['tridente', 'conchiglia', 'onda', 'occhio', 'spirale']);

export const OSTACOLI = Object.freeze([
  quadro('periscopio', 0, 0, 2, 0, 9),
  ostacolo('bancone', 3.6, -8.2, 8.4, -7, 0, 1),
  ostacolo('bancone', -9.6, 6.6, -5, 7.8, 0, 1),
  ostacolo('teca', -3.4, 8.6, -1.8, 10.2, 0, 2.2),
  quadro('turbina', -8.5, -4.6, 2.4, 0, 3.4),
  ostacolo('banco', 6.4, 4.4, 8.6, 5.4, 0, 1),
  ...disco(REATTORE, REATTORE.nucleo, REATTORE.fondo, 18, { tipo: 'nucleo' }),
  quadro('turbina', 30.8, 0, 2, REATTORE.fondo, 3.2),
  ostacolo('pannello', 25.2, -6.6, 25.9, -4.6, 0, 1.8),
  ostacolo('fucina', 25.2, 7.4, 26.4, 9.6, 0, 1.4),
  ostacolo('casse', 46.5, 10.2, 49.6, 12.8, 0, 1.6),
  ostacolo('casse', 26, -12.8, 28.4, -10.8, 0, 1.4),
  ostacolo('quadroStagna', 51.4, 3.4, 52.3, 4.6, 0, 1.8),
  ...COLONNE_SANTUARIO.map(c => quadro('colonnaAtlantidea', c.x, c.z, 1.7, SANTUARIO.fondo, c.alta)),
  ...STATUE.map(s => quadro('statua', s.x, s.z, 3.6, SANTUARIO.fondo, 16)),
  ...BRACIERI.map(b => quadro('braciere', b.x, b.z, 0.9, SANTUARIO.fondo, 1.3)),
  ostacolo('altareNucleo', -1.2, -42.7, 1.2, -41.3, SANTUARIO.fondo, 1.1),
  ostacolo('conchiglia', -3.4, -58.6, 3.4, -55.4, SANTUARIO.fondo, 5),
  quadro('turbina', -19.2, -44, 2.2, SANTUARIO.fondo, 3.2),
  ...disco(DELTA, DELTA.vasca, DELTA.fondo - 3, 4, { tipo: 'vasca' }),
  ...CANNE.map(c => quadro('canna', c.x, c.z, 1.7, 0, 30)),
  ostacolo('consolle', 49.4, -64.6, 54.6, -63.2, quotaDelta(52, -63.9), 1.4),
  ...COLONNE_SIMBOLI.map(c => quadro('colonnaSimbolo', c.x, c.z, 1.3, quotaDelta(c.x, c.z), 6)),
  ...PILONI.map(p => quadro('pilone', p.x, p.z, 1.1, quotaDelta(p.x, p.z), 4.5)),
]);

function finestra(id, zonaId, asse, posizione, da, a, versoFuori, { spessore = SPESSORE } = {}) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const scatola = asse === 'z' ? { x0: da, z0: posizione - spessore / 2, x1: a, z1: posizione + spessore / 2 } : { x0: posizione - spessore / 2, z0: da, x1: posizione + spessore / 2, z1: a };
  const fuori = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  const passo = spessore / 2 + 0.95;
  return Object.freeze({
    id, zona: zonaId, asse, centro: Object.freeze(centro), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    esterno: punto(centro.x + fuori.x * passo, centro.z + fuori.z * passo),
    interno: punto(centro.x - fuori.x * passo, centro.z - fuori.z * passo),
    comparsa: punto(centro.x + fuori.x * 4.5, centro.z + fuori.z * 4.5),
    fuori: Object.freeze(fuori), recinzione: false, spessore, boccaporto: true,
  });
}

function boccaporto(id, zonaId, centro, r, angolo) {
  const fuori = { x: Math.cos(angolo), z: Math.sin(angolo) };
  const c = polare(centro, r, angolo);
  const tangente = { x: -fuori.z, z: fuori.x };
  const xs = [];
  const zs = [];
  for (const t of [-LARGO_BOCCAPORTO * 0.43, LARGO_BOCCAPORTO * 0.43]) for (const n of [-0.15, 0.15]) {
    xs.push(c.x + tangente.x * t + fuori.x * n);
    zs.push(c.z + tangente.z * t + fuori.z * n);
  }
  const passo = 1.7;
  return Object.freeze({
    id, zona: zonaId, asse: Math.abs(fuori.x) > Math.abs(fuori.z) ? 'x' : 'z', centro: c, angolo,
    scatola: Object.freeze({ x0: Math.min(...xs), z0: Math.min(...zs), x1: Math.max(...xs), z1: Math.max(...zs), base: BASE_MURO, altezza: ALTEZZA_MURO }),
    esterno: punto(c.x + fuori.x * passo, c.z + fuori.z * passo),
    interno: punto(c.x - fuori.x * passo, c.z - fuori.z * passo),
    comparsa: punto(c.x + fuori.x * 5, c.z + fuori.z * 5),
    fuori: Object.freeze(fuori), recinzione: false, spessore: 0.5, boccaporto: true, curvo: true,
  });
}

function tana(id, zonaId, x, z, extra = {}) {
  const p = punto(x, z);
  return Object.freeze({ id, zona: zonaId, tana: true, acqua: true, asse: 'z', centro: p, scatola: null, esterno: p, interno: p, comparsa: p, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false, ...extra });
}

export const FINESTRE = Object.freeze([
  ...BOCCAPORTI_ALPHA.map((a, i) => boccaporto(`a${i + 1}`, 'cupola', ALPHA, ALPHA.raggio, a)),
  finestra('b1', 'reattore', 'z', -14, 29, 31, -1),
  finestra('b2', 'reattore', 'z', -14, 44, 46, -1),
  finestra('b3', 'reattore', 'z', 14, 29, 31, 1),
  finestra('v1', 'servizioSud', 'z', 16.6, 49, 51, 1),
  finestra('g1', 'santuario', 'x', -22, -41, -39, -1),
  finestra('g2', 'santuario', 'x', 22, -53, -51, 1),
  tana('t1', 'santuario', -15, -31.5),
  tana('t2', 'santuario', 15, -31.5),
  ...BOCCAPORTI_DELTA.map((a, i) => boccaporto(`d${i + 1}`, 'anfiteatro', DELTA, DELTA.raggio, a)),
  ...[0.2, 1.75, -2.9, -1.2].map((a, i) => {
    const p = polare(DELTA, DELTA.vasca + 0.9, a);
    return tana(`v${i + 2}`, 'anfiteatro', p.x, p.z, { vasca: true });
  }),
]);

function porta(id, nome, costo, zone, scatola, extra = {}) {
  return Object.freeze({
    id, nome, costo, chiusa: false, zone: Object.freeze(zone), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }), ...extra,
  });
}

export const PORTE_INIZIALI = Object.freeze(['stagnaA', 'stagnaB']);

export const PORTE = Object.freeze([
  porta('paratiaBeta', 'Paratia del tunnel di cristallo', 750, ['tunnel', 'reattore', 'stagna', 'servizio', 'servizioSud'], { x0: 14.2, z0: -1.6, x1: 14.6, z1: 1.6 }, { tipo: 'paratia' }),
  porta('paratiaGamma', 'Paratia della Galleria del Consorzio', 1000, ['galleria', 'santuario'], { x0: -1.6, z0: -14.8, x1: 1.6, z1: -14.4 }, { tipo: 'paratia' }),
  porta('portaleDelta', 'Portale di Poseidone', 1250, ['passaggio', 'anfiteatro'], { x0: 24.6, z0: -45.6, x1: 25, z1: -42.4 }, { tipo: 'portale' }),
  porta('stagnaA', 'Portello stagno della sala', Infinity, [], { x0: 52.3, z0: -1.3, x1: 52.7, z1: 1.3 }, { tipo: 'stagna', chiusa: true }),
  porta('stagnaB', 'Portello stagno di servizio', Infinity, [], { x0: 54.2, z0: 2.8, x1: 56.8, z1: 3.2 }, { tipo: 'stagna', chiusa: true }),
  porta('condotti', 'Condotti di propulsione', Infinity, ['anfiteatro'], { x0: 300, z0: 300, x1: 300.1, z1: 300.1 }, { tipo: 'invisibile', chiusa: true }),
]);

const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, munizioni, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });
const sulMuro = (centro, r, angolo) => {
  const p = polare(centro, r, angolo);
  return [p.x, p.z, [-Math.cos(angolo), -Math.sin(angolo)]];
};
const dentroAlpha = angolo => sulMuro(ALPHA, ALPHA.raggio - 0.42, angolo);
const dentroDelta = angolo => sulMuro(DELTA, DELTA.raggio - 0.42, angolo);
const MUSO_DELTA = polare(DELTA, 22.6, 1.18);
const ARRIVO_DELTA = polare(DELTA, 21.2, 1.18);

export const VALVOLE = Object.freeze([-2.3, -0.85, 1.18, 2.75].map(a => polare(ALPHA, ALPHA.raggio - 0.42, a)));
export const NODI = Object.freeze([
  Object.freeze({ fuori: polare(ALPHA, ALPHA.raggio + 1.1, -2.75), dentro: polare(ALPHA, ALPHA.raggio - 2, -2.75), zona: 'cupola' }),
  Object.freeze({ fuori: polare(ALPHA, ALPHA.raggio + 1.1, -1.2), dentro: polare(ALPHA, ALPHA.raggio - 2, -1.2), zona: 'cupola' }),
  Object.freeze({ fuori: polare(DELTA, DELTA.raggio + 1.1, 1.95), dentro: polare(DELTA, DELTA.raggio - 2.2, 1.95), zona: 'anfiteatro' }),
  Object.freeze({ fuori: polare(DELTA, DELTA.raggio + 1.1, 0.15), dentro: polare(DELTA, DELTA.raggio - 2.2, 0.15), zona: 'anfiteatro' }),
]);
export const BARRE = Object.freeze([
  Object.freeze({ ...polare(REATTORE, 4.4, 2.1), y: -3.2 }),
  Object.freeze({ ...polare(REATTORE, 4.4, -2.6), y: -2.4 }),
  Object.freeze({ ...polare(REATTORE, 4.4, 3.05), y: -1.5 }),
]);
export const PARTI_SCUDO = Object.freeze([
  Object.freeze([punto(18.6, 0.9), punto(-0.9, -21.5)]),
  Object.freeze([punto(33.4, -5.6), punto(55.5, 9.2)]),
  Object.freeze([punto(-17.8, -55.8), polare(DELTA, 20.6, 2.35)]),
]);
export const ZONE_PARTI = Object.freeze([['tunnel', 'galleria'], ['reattore', 'servizio'], ['santuario', 'anfiteatro']]);

export const ACQUISTI = Object.freeze([
  bibita('ritorno', 'cupola', ...dentroAlpha(2.0)),
  bibita('scatto', 'cupola', ...dentroAlpha(-0.4)),
  muro('mitra', 1200, 600, 'cupola', ...dentroAlpha(-2.05)),
  muro('pompa', 800, 400, 'cupola', ...dentroAlpha(0.42)),
  acquisto('turbina-0', 'turbina', 'cupola', -8.5, -3.0, [0, 1], { indice: 0 }),
  acquisto('banco', 'banco', 'cupola', 7.5, 5.95, [0, 1]),
  ...VALVOLE.map((v, i) => acquisto(`valvola-${i}`, 'valvola', 'cupola', v.x, v.z, [-(v.x - ALPHA.x) / (ALPHA.raggio - 0.42), -(v.z - ALPHA.z) / (ALPHA.raggio - 0.42)], { indice: i })),
  ...NODI.map((n, i) => acquisto(`nodo-${i}`, 'nodo', n.zona, n.dentro.x, n.dentro.z, [0, 0], { indice: i })),
  ...PARTI_SCUDO.flatMap((posti, i) => posti.map((p, j) => acquisto(`parte-${i}-${j}`, 'parteScudo', ZONE_PARTI[i][j], p.x, p.z, [0, 0], { indice: i, posto: j }))),
  muro('assalto', 1500, 750, 'reattore', 24.24, 4, [1, 0]),
  muro('carabina', 1600, 800, 'reattore', 40, -13.76, [0, 1]),
  bibita('ferro', 'reattore', 52.26, -9, [-1, 0]),
  acquisto('cassa', 'cassa', 'reattore', 35, -13.4, [0, 1]),
  acquisto('turbina-1', 'turbina', 'reattore', 32.2, 0, [1, 0], { indice: 1 }),
  acquisto('pannello', 'pannello', 'reattore', 26.4, -5.6, [1, 0]),
  acquisto('fucina', 'fucina', 'reattore', 27, 8.5, [1, 0]),
  ...BARRE.map((b, i) => acquisto(`barra-${i}`, 'barra', 'reattore', b.x, b.z, [0, 0], { indice: i })),
  acquisto('quadroStagna', 'quadroStagna', 'reattore', 51.2, 4, [-1, 0]),
  acquisto('nucleo', 'nucleo', 'stagna', 56.2, 0, [0, 0]),
  acquisto('condotto-beta', 'condotto', 'reattore', 49.6, -11.6, [0, 0], { meta: 'delta' }),
  bibita('lampo', 'santuario', -21.76, -34, [1, 0]),
  muro('battaglia', 1700, 850, 'santuario', 21.76, -34, [-1, 0]),
  muro('doppietta', 1000, 500, 'santuario', -21.76, -50, [1, 0]),
  acquisto('turbina-2', 'turbina', 'santuario', -17.6, -44, [1, 0], { indice: 2 }),
  acquisto('altareNucleo', 'altareNucleo', 'santuario', 0, -40.6, [0, 1]),
  acquisto('potenziatore', 'potenziatore', 'santuario', 0, -54.6, [0, 1]),
  bibita('raffica', 'anfiteatro', ...dentroDelta(2.95)),
  muro('precisione', 1750, 900, 'anfiteatro', ...dentroDelta(-2.95)),
  muro('tiratore', 1800, 900, 'anfiteatro', ...dentroDelta(1.45)),
  acquisto('condotto-delta', 'condotto', 'anfiteatro', MUSO_DELTA.x, MUSO_DELTA.z, [0, 0], { meta: 'beta' }),
  acquisto('consolle', 'consolle', 'anfiteatro', 52, -62.6, [0, 1]),
]);

export const MURALI = Object.freeze(new Set(['arma', 'valvola', 'nodo', 'parteScudo', 'barra', 'nucleo', 'condotto', 'consolle', 'turbina', 'pannello', 'fucina', 'banco', 'quadroStagna', 'altareNucleo', 'potenziatore']));

export const PARTENZE = Object.freeze([[-2.4, 4.4], [2.4, 4.4], [-2.4, 7], [2.4, 7]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[123, -1.2], [123, 1.2], [121.6, -1.2], [121.6, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: 133.84, z: 0, verso: punto(-1, 0) });
export const PARTENZE_RITORNO = Object.freeze([polare(DELTA, 20, Math.PI - 0.25), polare(DELTA, 20, Math.PI + 0.25), polare(DELTA, 21.5, Math.PI - 0.12), polare(DELTA, 21.5, Math.PI + 0.12)]);

export const POTENZIAMENTO = Object.freeze({ caricatore: 4 / 3, danno: 1.5 });

export const FRAMMENTI = Object.freeze([]);
export const ARREDI = Object.freeze([]);

export const NOMI = Object.freeze({
  cassa: 'Scrigno degli Abissi',
  potenziatore: 'Conchiglia di Oricalco',
  nemici: 'gli Annegati',
  bevande: Object.freeze({
    ferro: 'Corazza di Corallo',
    lampo: 'Risacca',
    raffica: 'Doppia Marea',
    scatto: 'Pinna Rapida',
    ritorno: 'Ultimo Respiro',
  }),
  marchi: Object.freeze({
    ferro: Object.freeze({ nome: 'CORAZZA', slogan: 'Scaglie di corallo vivo' }),
    lampo: Object.freeze({ nome: 'RISACCA', slogan: 'Ricarichi come la marea' }),
    raffica: Object.freeze({ nome: 'DOPPIA MAREA', slogan: 'Ogni colpo vale due' }),
    scatto: Object.freeze({ nome: 'PINNA', slogan: 'Corri e nuoti come un pesce' }),
    ritorno: Object.freeze({ nome: 'ULTIMO RESPIRO', slogan: 'Da solo ti rialzi tre volte' }),
  }),
});

export const CONDOTTI = Object.freeze({
  beta: Object.freeze({ da: punto(49.6, -11.6), a: ARRIVO_DELTA, percorso: Object.freeze([[49.6, -1, -11.6], [54, -6, -15], [60, -9, -17], [63, -7, -21], [61.5, -2.5, -23.6], [ARRIVO_DELTA.x, 0.8, ARRIVO_DELTA.z]]) }),
  delta: Object.freeze({ da: MUSO_DELTA, a: punto(48.4, -10.4), percorso: Object.freeze([[MUSO_DELTA.x, -1, MUSO_DELTA.z], [61.5, -6, -23.6], [63, -9, -21], [60, -9, -17], [54, -6, -15], [48.4, 0.8, -10.4]]) }),
});

export const OGGETTI = Object.freeze({
  RAMPA_CIMA,
  PALOMBARO: punto(46, 6),
  ORBITA_LEVIATANO: Object.freeze({ raggio: 31, da: -2.7, a: 1 }),
  STAGNA: Object.freeze({ x0: 52.7, z0: -2.8, x1: 58.3, z1: 2.8 }),
  ALTARE_NUCLEO: punto(0, -42),
  CONCHIGLIA: punto(0, -57),
});
