const SPESSORE = 0.3;
const BASE_MURO = -12;
const ALTEZZA_MURO = 40;
export const ALTEZZA_SOFFITTO = 3.6;
export const ALTEZZA_RECINZIONE = 3.4;
export const PIANO_ALTO = 4.5;
export const FONDO_PLATEA = -1.5;
export const FONDO_CALDAIA = -3.5;
export const FONDO_SOTTOPALCO = -4;
export const ATMOSFERA = Object.freeze({ buio: 0x0a0807, cielo: 0x0e0d16, nebbiaDentro: 40, nebbiaFuori: 42, nebbiaVicino: 2 });

const zona = (id, nome, x0, z0, x1, z1, pavimento, tetto, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, tetto, ...extra });

const ZONE_P = Object.freeze([
  zona('atrio', 'Atrio di Velluto', -12, -14, 12, 4, 'marmo', 11),
  zona('passaggio', 'Pianerottolo', -14, 1.4, -12, 3.6, 'moquette', 8.6),
  zona('salone', 'Salone dei Ricevimenti', -28, -6, -14, 10, 'parquet', 8.6),
  zona('corridoio', 'Corridoio dei camerini', -24, 10, -20.5, 26, 'moquette', 7.9),
  zona('guardaroba', 'Guardaroba degli Attori', -30, 26, -18, 42, 'legno', 8.4),
  zona('balcone', 'Balconcino antincendio', -18, 33.5, -14.6, 36.5, 'grata', 15),
  zona('palco', 'Palcoscenico', -16, 27, 16, 45, 'palco', 15),
  zona('platea', 'Platea', -14, 4, 14, 27, 'moquette', 11),
  zona('vicoloIngresso', 'Uscita di servizio', 12, -11, 20, -6.5, 'asfalto', undefined, { aperto: true }),
  zona('vicolo', 'Vicolo', 20, -12, 28, 24, 'asfalto', undefined, { aperto: true }),
  zona('scalaCaldaia', 'Scala della caldaia', 24, 24, 27, 30, 'metallo', 3.4),
  zona('rampa', 'Rampa metallica', 16, 41.8, 18, 44.7, 'metallo', 3.4),
  zona('caldaia', 'Sotterranei della Caldaia', 18, 30, 36, 46, 'cemento', -0.3),
  zona('sottopalco', 'Sottopalco', 40, 30, 50, 40, 'legno', -0.8, { sempre: true }),
  zona('sala', 'Sala prove', 60, -5, 74, 5, 'parquet', 3.6, { sala: true }),
]);

const SALA_P = Object.freeze({ x0: 60, z0: -5, x1: 74, z1: 5 });
const LIMITI_P = Object.freeze({ x0: -36, z0: -16, x1: 54, z1: 52 });

const fermo = (min, max, v) => Math.min(max, Math.max(min, v));

function piedePlatea(x, z) {
  if (z >= 26) return 0;
  const laterale = Math.abs(x);
  if (laterale >= 10 && laterale <= 13.9 && z >= 23) return FONDO_PLATEA + (-FONDO_PLATEA * (z - 23)) / 3;
  return FONDO_PLATEA * fermo(0, 1, (z - 6) / 16) || 0;
}

const regione = (x0, z0, x1, z1, q) => Object.freeze({ x0, z0, x1, z1, q: typeof q === 'function' ? q : () => q });

const QUOTE = Object.freeze([
  regione(-11.6, -6, -9, 1, (x, z) => PIANO_ALTO * fermo(0, 1, (z + 6) / 7)),
  regione(-12.05, 1, -7, 4, PIANO_ALTO),
  regione(-34, -11.5, -12.05, 10, PIANO_ALTO),
  regione(-36, 10, -20.2, 26, PIANO_ALTO),
  regione(-36, 26, -17.8, 48, PIANO_ALTO),
  regione(-18, 33.3, -14.6, 36.7, PIANO_ALTO),
  regione(-20, 4, 20, 27, piedePlatea),
  regione(24, 24, 27, 30, (x, z) => FONDO_CALDAIA * fermo(0, 1, (z - 24) / 6) || 0),
  regione(16, 41.8, 23, 44.7, x => FONDO_CALDAIA * fermo(0, 1, (x - 16) / 7) || 0),
  regione(17.8, 30, 40, 52, FONDO_CALDAIA),
  regione(27.2, 24.5, 32, 30, FONDO_CALDAIA),
  regione(39, 29, 51, 41, FONDO_SOTTOPALCO),
]);

function quotaProgetto(x, z) {
  for (const r of QUOTE) if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return r.q(x, z);
  return 0;
}

const parete = (s, y0, y1, extra = {}) => Object.freeze({ ...s, base: BASE_MURO, altezza: ALTEZZA_MURO, y0, y1, ...extra });
const oz = (z, x0, x1, y0, y1, extra) => parete({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 }, y0, y1, extra);
const vx = (x, z0, z1, y0, y1, extra) => parete({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 }, y0, y1, extra);
const NASCOSTO = Object.freeze({ visibile: false });

const MURI_P = Object.freeze([
  oz(-14, -12, -8, 0, 11), oz(-14, -6, 6, 0, 11), oz(-14, 8, 12, 0, 11),
  vx(-12, -14, -13.6, 0, 11), vx(-12, -12, 1.5, 0, 11), vx(-12, 3.5, 4, 0, 11),
  oz(4, -14, -2.5, -1.5, 11), oz(4, 2.5, 14, -1.5, 11),
  vx(12, -14, -13.6, 0, 11), vx(12, -12, -10, 0, 11), vx(12, -7.5, 4, 0, 11),
  vx(-9, -5.4, 1, 0, 5.6, NASCOSTO), oz(1, -9, -7, 0, 5.6, NASCOSTO), vx(-7, 1, 4, 0, 5.6, NASCOSTO),
  oz(1.4, -14, -12, 0, 8.6), oz(3.6, -14, -12, 0, 8.6),

  oz(-6, -28, -24, 0, 8.6), oz(-6, -22, -14, 0, 8.6),
  vx(-28, -6, 2, 0, 8.6), vx(-28, 4, 10, 0, 8.6),
  oz(10, -28, -23.5, 0, 8.6), oz(10, -21, -14, 0, 8.6),
  vx(-14, -6, 1.4, 0, 8.6),

  vx(-24, 10, 26, 0, 7.9), vx(-20.5, 10, 26, 0, 7.9),

  oz(26, -30, -24, 0, 8.4), oz(26, -20.5, -18, 0, 8.4),
  vx(-30, 26, 30, 0, 8.4), vx(-30, 32, 37, 0, 8.4), vx(-30, 39, 42, 0, 8.4),
  oz(42, -30, -25, 0, 8.4), oz(42, -23, -18, 0, 8.4),
  vx(-18, 26, 33.5, 0, 8.4), vx(-18, 36.5, 42, 0, 8.4),
  oz(33.5, -18, -14.6, 0, 5.6, NASCOSTO), oz(36.5, -18, -14.6, 0, 5.6, NASCOSTO),

  oz(27, -16, -12, 0, 15), oz(27, 12, 16, 0, 15),
  vx(-16, 27, 33.5, 0, 15), vx(-16, 36.5, 45, 0, 15),
  oz(45, -16, -10, 0, 15), oz(45, -8, 8, 0, 15), oz(45, 10, 16, 0, 15),
  vx(16, 27, 42, 0, 15), vx(16, 44.5, 45, 0, 15),

  vx(-14, 3.6, 12, -1.5, 11), vx(-14, 14, 27, -1.5, 11),
  vx(14, 4, 12, -1.5, 11), vx(14, 14, 27, -1.5, 11),
  vx(-10, 23.4, 26, -1.5, 0.9, NASCOSTO), vx(10, 23.4, 26, -1.5, 0.9, NASCOSTO),

  oz(-11, 12, 20, 0, 9), oz(-6.5, 12, 20, 0, 4),
  vx(20, -12, -11, 0, 9), vx(28, -12, 24, 0, 12),
  oz(24, 20, 24, 0, 9), oz(24, 27, 28, 0, 9),

  vx(24, 24, 30, -3.5, 3.4), vx(27, 24, 30, -3.5, 3.4),
  oz(30, 18, 24, -3.5, 0), oz(30, 27, 27.4, -3.5, 0), oz(30, 28.6, 36, -3.5, 0),
  vx(18, 30, 41.8, -3.5, 0), vx(18, 44.7, 46, -3.5, 0),
  oz(46, 18, 28, -3.5, 0), oz(46, 30, 36, -3.5, 0),
  vx(36, 30, 46, -3.5, 0),
  oz(41.8, 16, 23, -3.5, 3.4), oz(44.7, 16, 23, -3.5, 3.4),

  oz(30, 40, 50, -4, -0.8), oz(40, 40, 50, -4, -0.8), vx(40, 30, 40, -4, -0.8), vx(50, 30, 40, -4, -0.8),

  oz(-5, 60, 74, 0, 3.6), oz(5, 60, 74, 0, 3.6), vx(60, -5, 5, 0, 3.6), vx(74, -5, 5, 0, 3.6),
]);

const rete = (s, extra = {}) => Object.freeze({ ...s, base: 0, altezza: ALTEZZA_RECINZIONE, ...extra });
const RECINZIONI_P = Object.freeze([
  rete({ x0: 19.85, z0: -6.5, x1: 20.15, z1: 6 }), rete({ x0: 19.85, z0: 8, x1: 20.15, z1: 15 }), rete({ x0: 19.85, z0: 17, x1: 20.15, z1: 24 }),
  rete({ x0: 20, z0: -12.15, x1: 23, z1: -11.85 }), rete({ x0: 25, z0: -12.15, x1: 28, z1: -11.85 }),
]);

const ostacolo = (tipo, x0, z0, x1, z1, base, altezza, extra = {}) => Object.freeze({ x0, z0, x1, z1, base, altezza, tipo, ...extra });
const colonna = (x, z, base, altezza) => ostacolo('colonna', x - 0.45, z - 0.45, x + 0.45, z + 0.45, base, altezza);

const OSTACOLI_P = Object.freeze([
  ostacolo('scalaCrollata', 8.8, -6, 12, 4, 0, 6),
  ostacolo('biglietteria', -11.8, -10, -10, -7, 0, 2.6),
  colonna(-4.5, -12.6, 0, 11), colonna(4.5, -12.6, 0, 11), colonna(-5.5, 2.4, 0, 11), colonna(5.5, 2.4, 0, 11),

  ostacolo('bancone', -26, 7.2, -17.5, 8.4, PIANO_ALTO, 1.15),
  ostacolo('tavoloRovesciato', -24.6, -1.6, -23.4, -0.4, PIANO_ALTO, 0.85),
  ostacolo('tavoloRovesciato', -19.6, 1.4, -18.4, 2.6, PIANO_ALTO, 0.85),
  ostacolo('tavoloRovesciato', -22.6, 3.9, -21.4, 5.1, PIANO_ALTO, 0.85),
  ostacolo('tavoloRovesciato', -17.6, -2.6, -16.4, -1.4, PIANO_ALTO, 0.85),

  ostacolo('specchiera', -29.5, 41.3, -27, 41.85, PIANO_ALTO, 1.9),
  ostacolo('specchiera', -21.5, 41.3, -19, 41.85, PIANO_ALTO, 1.9),
  ostacolo('specchiera', -29.85, 34, -29.3, 36.5, PIANO_ALTO, 1.9),
  ostacolo('manichino', -26.3, 31.7, -25.7, 32.3, PIANO_ALTO, 1.8),
  ostacolo('manichino', -23.8, 36.2, -23.2, 36.8, PIANO_ALTO, 1.8),
  ostacolo('manichino', -21.3, 30.7, -20.7, 31.3, PIANO_ALTO, 1.8),
  ostacolo('manichino', -26.8, 38.7, -26.2, 39.3, PIANO_ALTO, 1.8),
  ostacolo('stender', -24.5, 39.2, -21, 39.7, PIANO_ALTO, 1.75),
  ostacolo('stender', -28.6, 34.6, -25.6, 35.1, PIANO_ALTO, 1.75),
  ostacolo('baule', -19.6, 27, -18.4, 27.7, PIANO_ALTO, 0.7),

  ostacolo('casseScena', -16, 33.5, -14.6, 36.5, 0, 4.4, { soloSotto: 3 }),
  ostacolo('generatore', -1.6, 43.8, 1.6, 44.85, 0, 2.3),
  ostacolo('quinta', -15, 30, -13.6, 32, 0, 5),
  ostacolo('quinta', 13.6, 38, 15, 40, 0, 5),
  ostacolo('casse', 10, 42, 12.4, 44.4, 0, 1.4),
  ostacolo('pianoforte', -12.4, 39, -10, 41.2, 0, 1.1),

  ostacolo('ribalta', -10, 25.85, 10, 26.15, FONDO_PLATEA, 1.8),
  ostacolo('poltrone', -8, 9, 8, 13, -0.66, 1.33),
  ostacolo('poltrone', -8, 13, 8, 17, -1.03, 1.32),
  ostacolo('poltrone', -8, 17, 8, 21, -1.41, 1.33),

  ostacolo('cassonetto', 26.5, 8, 27.9, 10, 0, 1.4),
  ostacolo('auto', 20.6, -10.4, 22.5, -5.8, 0, 1.6),

  ostacolo('fornace', 25, 35.5, 31, 41.5, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 18, 30, 23.8, 34, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 28.8, 30, 36, 33, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 18, 34, 22.8, 41.8, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 33.2, 33, 36, 46, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 25, 43.7, 28, 46, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 30, 43.7, 33.2, 46, FONDO_CALDAIA, 3.2),
  ostacolo('tubi', 18, 44.7, 23, 46, FONDO_CALDAIA, 3.2),

  ostacolo('macchinaScena', 46.5, 30.5, 49.5, 32.5, FONDO_SOTTOPALCO, 2.4),
]);

function finestra(id, zonaId, asse, posizione, da, a, versoFuori, recinzione = false) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const scatola = asse === 'z' ? { x0: da, z0: posizione - SPESSORE / 2, x1: a, z1: posizione + SPESSORE / 2 } : { x0: posizione - SPESSORE / 2, z0: da, x1: posizione + SPESSORE / 2, z1: a };
  const fuori = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  return Object.freeze({
    id, zona: zonaId, asse, centro: Object.freeze(centro), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    esterno: Object.freeze({ x: centro.x + fuori.x * 1.1, z: centro.z + fuori.z * 1.1 }),
    interno: Object.freeze({ x: centro.x - fuori.x * 1.1, z: centro.z - fuori.z * 1.1 }),
    comparsa: Object.freeze({ x: centro.x + fuori.x * 4, z: centro.z + fuori.z * 4 }),
    fuori: Object.freeze(fuori),
    recinzione,
  });
}

const FINESTRE_P = Object.freeze([
  finestra('a1', 'atrio', 'z', -14, -8, -6, -1),
  finestra('a2', 'atrio', 'z', -14, 6, 8, -1),
  finestra('a3', 'atrio', 'x', -12, -13.6, -12, -1),
  finestra('a4', 'atrio', 'x', 12, -13.6, -12, 1),
  finestra('s1', 'salone', 'z', -6, -24, -22, -1),
  finestra('s2', 'salone', 'x', -28, 2, 4, -1),
  finestra('g1', 'guardaroba', 'x', -30, 30, 32, -1),
  finestra('g2', 'guardaroba', 'x', -30, 37, 39, -1),
  finestra('g3', 'guardaroba', 'z', 42, -25, -23, 1),
  finestra('p1', 'palco', 'z', 45, -10, -8, 1),
  finestra('p2', 'palco', 'z', 45, 8, 10, 1),
  finestra('l1', 'platea', 'x', -14, 12, 14, -1),
  finestra('l2', 'platea', 'x', 14, 12, 14, 1),
  finestra('v1', 'vicolo', 'x', 20, 6, 8, -1, true),
  finestra('v2', 'vicolo', 'x', 20, 15, 17, -1, true),
  finestra('v3', 'vicolo', 'z', -12, 23, 25, -1, true),
  finestra('k1', 'caldaia', 'z', 30, 27.4, 28.6, -1),
  finestra('k2', 'caldaia', 'z', 46, 28, 30, 1),
]);

function porta(id, nome, costo, zone, scatola, chiusa = false) {
  return Object.freeze({
    id, nome, costo, chiusa, zone: Object.freeze(zone), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }),
  });
}
const pz = (z, x0, x1) => ({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 });
const px = (x, z0, z1) => ({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 });

const PORTE_P = Object.freeze([
  porta('scalone', 'Porta in cima allo scalone', 750, ['atrio', 'passaggio', 'salone'], px(-12, 1.5, 3.5)),
  porta('servizio', 'Uscita di servizio', 750, ['atrio', 'vicoloIngresso', 'vicolo'], px(12, -10, -7.5)),
  porta('guardaroba', 'Porta dei camerini', 1000, ['salone', 'corridoio', 'guardaroba'], pz(10, -23.5, -21)),
  porta('balcone', 'Porta del balconcino', 1250, ['guardaroba', 'balcone', 'palco'], px(-18, 33.5, 36.5)),
  porta('caldaia', 'Porta della caldaia', 1000, ['vicolo', 'scalaCaldaia', 'caldaia', 'rampa'], pz(24, 24, 27)),
  porta('rampa', 'Botola della rampa', 1250, ['rampa', 'palco'], px(16, 42, 44.5)),
  porta('sipario', 'Sipario', 0, ['palco', 'platea'], pz(27, -12, 12), true),
  porta('centrali', 'Doppie porte della platea', 0, ['atrio', 'platea'], pz(4, -2.5, 2.5), true),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, munizioni, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });

const ACQUISTI_P = Object.freeze([
  muro('pompa', 800, 400, 'atrio', -3, -13.84, [0, 1]),
  bibita('ritorno', 'atrio', 0, -2.4, [0, -1]),
  muro('mitra', 1200, 600, 'salone', -19, -5.84, [0, 1]),
  acquisto('cassa', 'cassa', 'salone', -27.2, 0.5, [1, 0]),
  bibita('lampo', 'guardaroba', -29.2, 28.6, [1, 0]),
  muro('assalto', 1500, 750, 'guardaroba', -18.16, 29.5, [-1, 0]),
  acquisto('trappola-corridoio', 'trappola', 'corridoio', -20.66, 14.4, [-1, 0], { trappola: 'corridoio' }),
  bibita('raffica', 'vicolo', 27.2, 3.5, [-1, 0]),
  muro('carabina', 1600, 800, 'vicolo', 27.84, 14, [-1, 0]),
  muro('doppietta', 1000, 500, 'caldaia', 31.5, 33.16, [0, 1]),
  bibita('ferro', 'palco', 15.2, 31.5, [-1, 0]),
  muro('battaglia', 1700, 850, 'palco', -15.84, 42.4, [1, 0]),
  acquisto('leva', 'leva', 'palco', 0, 43.62, [0, -1]),
  acquisto('botola', 'botola', 'palco', 0, 34, [0, -1]),
  muro('precisione', 1750, 900, 'platea', -13.84, 7, [1, 0]),
  acquisto('sentinella', 'sentinella', 'platea', 0, 8.78, [0, -1]),
  acquisto('trappola-sinistra', 'trappola', 'platea', -13.84, 21.4, [1, 0], { trappola: 'sinistra' }),
  acquisto('trappola-destra', 'trappola', 'platea', 13.84, 21.4, [-1, 0], { trappola: 'destra' }),
  acquisto('potenziatore', 'potenziatore', 'sottopalco', 45, 39.2, [0, -1]),
  acquisto('montacarichi', 'montacarichi', 'sottopalco', 40.2, 35, [1, 0]),
]);

export const MURALI = Object.freeze(new Set(['arma', 'leva', 'botola', 'montacarichi', 'sentinella', 'trappola']));

const PARTENZE_P = Object.freeze([[-1.5, 1.2], [1.5, 1.2], [-1.5, -0.6], [1.5, -0.6]].map(([x, z]) => punto(x, z)));
const PARTENZE_SALA_P = Object.freeze([[63, -1.2], [63, 1.2], [61.6, -1.2], [61.6, 1.2]].map(([x, z]) => punto(x, z)));
const CARTELLO_PRONTI_P = Object.freeze({ x: 73.84, z: 0, verso: punto(-1, 0) });
export const FRAMMENTI = Object.freeze([]);

const solido = (x, z, l, p, base = 0) => Object.freeze({ x0: x - l / 2, z0: z - p / 2, x1: x + l / 2, z1: z + p / 2, base, altezza: 1.1 });
const ARREDI_P = Object.freeze([
  { modello: 'barrel_03', x: 27.2, z: -3.2, rot: 0.3, solido: solido(27.2, -3.2, 0.65, 0.65) },
  { modello: 'barrel_03', x: 27.3, z: -2.3, rot: 1.4, solido: solido(27.3, -2.3, 0.65, 0.65) },
  { modello: 'metal_trash_can', x: 27.3, z: 19, rot: -Math.PI / 2, solido: solido(27.3, 19, 0.6, 1.9) },
  { modello: 'trashbag', x: 26.9, z: 11, rot: 0.4 },
  { modello: 'trashbag', x: 27.4, z: 11.6, rot: 2.1 },
  { modello: 'trashbag', x: 26.6, z: 20.8, rot: 1 },
  { modello: 'wooden_crate_01', x: 27.2, z: 22.8, rot: 0.2 },
  { modello: 'wooden_crate_01', x: 11.2, z: 41.2, rot: 0.6 },
  { modello: 'wooden_crate_01', x: -14.8, z: 43.8, rot: 1.1 },
  { modello: 'sofa_02', x: -26.6, z: -4.6, rot: Math.PI / 2 + 0.3, solido: solido(-26.6, -4.6, 0.85, 1.85, PIANO_ALTO) },
  { modello: 'painted_wooden_chair_01', x: -23, z: -2.4, rot: 1.2 },
  { modello: 'painted_wooden_chair_01', x: -18.2, z: 3.4, rot: 2.6 },
  { modello: 'painted_wooden_chair_01', x: -20.6, z: 6, rot: -0.5 },
  { modello: 'sofa_02', x: 66, z: 4.3, rot: Math.PI, solido: solido(66, 4.3, 1.85, 0.85) },
  { modello: 'painted_wooden_chair_01', x: 70, z: -4.3, rot: 0 },
  { modello: 'painted_wooden_chair_01', x: 71, z: -4.3, rot: 0.25 },
].map(Object.freeze));

export const NOMI = Object.freeze({
  bevande: Object.freeze({
    ritorno: 'Siero del Risveglio',
    lampo: 'Siero della Ricarica Rapida',
    raffica: 'Siero del Fuoco Rapido',
    ferro: 'Siero della Robustezza',
  }),
  marchi: Object.freeze({
    ritorno: Object.freeze({ nome: 'RISVEGLIO', slogan: 'Torna in piedi, sempre' }),
    lampo: Object.freeze({ nome: 'RICARICA', slogan: 'Mani più svelte del buio' }),
    raffica: Object.freeze({ nome: 'FUOCO RAPIDO', slogan: 'Più colpi, meno paura' }),
    ferro: Object.freeze({ nome: 'ROBUSTEZZA', slogan: 'Cuore di ferro in scena' }),
  }),
  cassa: 'Scrigno del Fato',
  potenziatore: 'Forgia Arcana',
  nemici: 'i Corrotti',
});

const OGGETTI_P = Object.freeze({
  LAMPADARIO: Object.freeze({ x: 0, z: -5.5, y: 7.4 }),
  ARRIVO_SOTTO: punto(45, 33.4),
  RISALITA: punto(0, 35.8),
  SENTINELLA: Object.freeze({ x: 0, z: 15, y: 9.4 }),
  TRAPPOLE: Object.freeze({
    sinistra: Object.freeze({ x0: -13.8, z0: 23, x1: -10.15, z1: 26.8 }),
    destra: Object.freeze({ x0: 10.15, z0: 23, x1: 13.8, z1: 26.8 }),
    corridoio: Object.freeze({ x0: -23.85, z0: 16, x1: -20.65, z1: 18.6 }),
  }),
  CORONA: Object.freeze({ x: 44, y: 26, z: 22 }),
});

const sx = x => (x === 0 ? 0 : -x);
const rettangolo = r => Object.freeze({ ...r, x0: sx(r.x1), x1: sx(r.x0) });
const verso = p => Object.freeze({ ...p, x: sx(p.x) });

export const PROGETTO = Object.freeze({
  ZONE: ZONE_P, SALA: SALA_P, MURI: MURI_P, RECINZIONI: RECINZIONI_P, OSTACOLI: OSTACOLI_P, FINESTRE: FINESTRE_P, PORTE: PORTE_P,
  ACQUISTI: ACQUISTI_P, CARTELLO_PRONTI: CARTELLO_PRONTI_P, ARREDI: ARREDI_P, OGGETTI: OGGETTI_P, quota: quotaProgetto,
});

export const quota = (x, z) => quotaProgetto(sx(x), z);
export const ZONE = Object.freeze(ZONE_P.map(rettangolo));
export const SALA = rettangolo(SALA_P);
export const LIMITI = rettangolo(LIMITI_P);
export const MURI = Object.freeze(MURI_P.map(rettangolo));
export const RECINZIONI = Object.freeze(RECINZIONI_P.map(rettangolo));
export const OSTACOLI = Object.freeze(OSTACOLI_P.map(rettangolo));
export const FINESTRE = Object.freeze(FINESTRE_P.map(f => Object.freeze({
  ...f, centro: verso(f.centro), scatola: rettangolo(f.scatola), esterno: verso(f.esterno), interno: verso(f.interno), comparsa: verso(f.comparsa), fuori: verso(f.fuori),
})));
export const PORTE = Object.freeze(PORTE_P.map(p => Object.freeze({ ...p, scatola: rettangolo(p.scatola), centro: verso(p.centro) })));
export const ACQUISTI = Object.freeze(ACQUISTI_P.map(a => Object.freeze({ ...a, posizione: verso(a.posizione), verso: verso(a.verso) })));
export const PARTENZE = Object.freeze(PARTENZE_P.map(verso));
export const PARTENZE_SALA = Object.freeze(PARTENZE_SALA_P.map(verso));
export const CARTELLO_PRONTI = Object.freeze({ ...CARTELLO_PRONTI_P, x: sx(CARTELLO_PRONTI_P.x), verso: verso(CARTELLO_PRONTI_P.verso) });
export const ARREDI = Object.freeze(ARREDI_P.map(a => Object.freeze({ ...a, x: sx(a.x), rot: -a.rot, ...(a.solido ? { solido: rettangolo(a.solido) } : {}) })));
export const OGGETTI = Object.freeze({
  ...OGGETTI_P,
  LAMPADARIO: verso(OGGETTI_P.LAMPADARIO),
  ARRIVO_SOTTO: verso(OGGETTI_P.ARRIVO_SOTTO),
  RISALITA: verso(OGGETTI_P.RISALITA),
  SENTINELLA: verso(OGGETTI_P.SENTINELLA),
  CORONA: verso(OGGETTI_P.CORONA),
  TRAPPOLE: Object.freeze(Object.fromEntries(Object.entries(OGGETTI_P.TRAPPOLE).map(([n, r]) => [n, rettangolo(r)]))),
});
