const SPESSORE = 0.3;
const BASE_MURO = -12;
const ALTEZZA_MURO = 60;
export const ALTEZZA_SOFFITTO = 4.2;
export const ALTEZZA_RECINZIONE = 2;
export const PAVIMENTO_CHIESA = 0.3;
export const PAVIMENTO_PRESBITERIO = 0.9;
export const PAVIMENTO_SAGRATO = 0.15;
export const PIANO_CONSIGLIO = 4.5;
export const PIANO_CELLA = 31;
export const ALTEZZA_CAMPANILE = 45;
export const ATMOSFERA = Object.freeze({ buio: 0x0a0e18, cielo: 0x131b2c, nebbiaDentro: 60, nebbiaFuori: 96, nebbiaVicino: 6 });

const zona = (id, nome, x0, z0, x1, z1, pavimento, tetto, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, tetto, ...extra });

export const ZONE = Object.freeze([
  zona('piazza', 'Piazza Crespi', -27.2, -19.7, 0, 35.5, 'porfido', undefined, { aperto: true }),
  zona('piazzaOvest', 'Piazza Crespi, angolo del bar', -48, 2.6, -27.2, 36.2, 'porfido', undefined, { aperto: true, sempre: true }),
  zona('sagratoSud', 'Fianco della chiesa', 0, 11.4, 17.7, 33, 'pietra', undefined, { aperto: true, sempre: true }),
  zona('latoNord', 'Lato del Municipio', 0, -19.7, 42.6, -11.35, 'porfido', undefined, { aperto: true }),
  zona('vicoloSud', 'Via Beato Pacifico', 17.7, 25, 38.35, 30.6, 'porfido', undefined, { aperto: true }),
  zona('navata', 'Navata della Natività', 0, -10.35, 30, 10.4, 'marmo', 15),
  zona('crociera', 'Crociera sotto la cupola', 30, -10.35, 42, 10.4, 'marmo', 24),
  zona('presbiterio', 'Presbiterio', 42, -5.2, 56.3, 5.2, 'marmo', 16.7),
  zona('sacrestia', 'Sacrestia', 42.6, -19.1, 51.8, -5.2, 'legno', 5),
  zona('tempietto', 'Tempietto del Beato Pacifico', 17.7, 10.4, 31, 25, 'marmo', 12),
  zona('cella', 'Cella campanaria', 31.6, 13, 36.4, 17.8, 'mattoni', PIANO_CELLA + 4.6, { sempre: true, aperto: true }),
  zona('municipio', 'Municipio, piano terra', -11.5, -27.2, 17.5, -19.7, 'graniglia', 4.2),
  zona('scala', 'Scalone del Municipio', 5.5, -36, 8.5, -27.2, 'pietra', PIANO_CONSIGLIO + 4),
  zona('consiglio', 'Sala del Consiglio comunale', 1.5, -47.5, 15.5, -36, 'parquet', PIANO_CONSIGLIO + 5),
  zona('sala', 'Sala Crespi', 120, -5, 134, 5, 'parquet', 4.2, { sala: true }),
]);

export const SALA = Object.freeze({ x0: 120, z0: -5, x1: 134, z1: 5 });
export const LIMITI = Object.freeze({ x0: -60, z0: -56, x1: 62, z1: 42 });

const fermo = (min, max, v) => Math.min(max, Math.max(min, v));
const regione = (x0, z0, x1, z1, q) => Object.freeze({ x0, z0, x1, z1, q: typeof q === 'function' ? q : () => q });
export const RAGGIO_SAGRATO = 10.9;

const QUOTE = Object.freeze([
  regione(31.2, 12.6, 36.8, 18.2, PIANO_CELLA),
  regione(1, -53.5, 16, -36.3, PIANO_CONSIGLIO),
  regione(5, -36.3, 9, -27.4, (x, z) => PIANO_CONSIGLIO * fermo(0, 1, (-28.2 - z) / 7) || 0),
  regione(42, -5.2, 56.3, 5.2, x => (x >= 43.5 ? PAVIMENTO_PRESBITERIO : PAVIMENTO_CHIESA + (PAVIMENTO_PRESBITERIO - PAVIMENTO_CHIESA) * fermo(0, 1, (x - 42.3) / 1.2))),
  regione(0, -11.35, 57.3, 11.4, PAVIMENTO_CHIESA),
  regione(42.6, -19.1, 51.8, -11.35, PAVIMENTO_CHIESA),
  regione(17.7, 11.4, 31, 25, PAVIMENTO_CHIESA),
  regione(-2.7, -2.9, 0, 2.9, PAVIMENTO_CHIESA),
  regione(-RAGGIO_SAGRATO, -RAGGIO_SAGRATO, 0, RAGGIO_SAGRATO, (x, z) => (x * x + z * z <= RAGGIO_SAGRATO * RAGGIO_SAGRATO ? PAVIMENTO_SAGRATO : 0)),
]);

export function quota(x, z) {
  for (const r of QUOTE) if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return r.q(x, z);
  return 0;
}

const parete = (x0, z0, x1, z1, y0, y1, extra = {}) => Object.freeze({ x0, z0, x1, z1, base: BASE_MURO, altezza: ALTEZZA_MURO, y0, y1, ...extra });
const oz = (z, x0, x1, y0, y1, extra) => parete(x0, z - SPESSORE / 2, x1, z + SPESSORE / 2, y0, y1, extra);
const vx = (x, z0, z1, y0, y1, extra) => parete(x - SPESSORE / 2, z0, x + SPESSORE / 2, z1, y0, y1, extra);

export const MURI = Object.freeze([
  parete(0, -11.35, 1, -1.3, 0, 21, { parte: 'facciata' }), parete(0, 1.3, 1, 11.4, 0, 21, { parte: 'facciata' }),
  parete(0, -11.35, 42, -10.35, 0, 13, { parte: 'fiancoNord' }),
  parete(42, -11.35, 46, -10.35, 0, 13, { parte: 'fiancoNord' }), parete(48, -11.35, 57.3, -10.35, 0, 13, { parte: 'fiancoNord' }),
  parete(0, 10.4, 23, 11.4, 0, 13, { parte: 'fiancoSud' }), parete(25, 10.4, 57.3, 11.4, 0, 13, { parte: 'fiancoSud' }),
  parete(56.3, -10.35, 57.3, 10.4, 0, 13, { parte: 'abside' }),
  parete(41.7, -10.35, 42.6, -5.2, 0, 10.4, { parte: 'interno' }), parete(41.7, 5.2, 42.3, 10.4, 0, 10.4, { parte: 'interno' }),
  parete(42, -5.7, 44, -5.2, 0, 11.5, { parte: 'interno' }), parete(46, -5.7, 56.3, -5.2, 0, 11.5, { parte: 'interno' }),
  parete(42, 5.2, 56.3, 5.7, 0, 11.5, { parte: 'interno' }),
  parete(51.8, -10.35, 52.3, -5.7, 0, 5, { parte: 'interno' }),

  parete(42.6, -19.1, 43.1, -16.5, 0, 6, { parte: 'sacrestia' }), parete(42.6, -14.3, 43.1, -11.35, 0, 6, { parte: 'sacrestia' }),
  parete(43.1, -19.1, 46, -18.6, 0, 6, { parte: 'sacrestia' }), parete(48, -19.1, 51.8, -18.6, 0, 6, { parte: 'sacrestia' }),
  parete(51.3, -18.6, 51.8, -11.35, 0, 6, { parte: 'sacrestia' }),
  parete(42.6, -19.7, 43.1, -19.1, 0, 6, { parte: 'sacrestia' }),

  parete(17.7, 11.4, 18.2, 25, 0, 10.5, { parte: 'tempietto' }), parete(30.5, 11.4, 31, 25, 0, 10.5, { parte: 'tempietto' }),
  parete(17.7, 24.5, 19.6, 25, 0, 10.5, { parte: 'tempiettoFronte' }), parete(22.4, 24.5, 26.3, 25, 0, 10.5, { parte: 'tempiettoFronte' }),
  parete(29.1, 24.5, 31, 25, 0, 10.5, { parte: 'tempiettoFronte' }),

  parete(31, 12.4, 31.6, 18.4, 0, ALTEZZA_CAMPANILE, { parte: 'campanile' }), parete(36.4, 12.4, 37, 18.4, 0, ALTEZZA_CAMPANILE, { parte: 'campanile' }),
  parete(31.6, 12.4, 36.4, 13, 0, ALTEZZA_CAMPANILE, { parte: 'campanile' }), parete(31.6, 17.8, 36.4, 18.4, 0, ALTEZZA_CAMPANILE, { parte: 'campanile' }),

  parete(-12, -20.2, -6.3, -19.7, 0, 9.4, { parte: 'municipioFronte' }), parete(-3.7, -20.2, 18, -19.7, 0, 9.4, { parte: 'municipioFronte' }),
  parete(-12, -27.7, -10, -27.2, 0, 9.4, { parte: 'municipio' }), parete(-8, -27.7, -4, -27.2, 0, 9.4, { parte: 'municipio' }),
  parete(-2, -27.7, 5.5, -27.2, 0, 9.4, { parte: 'municipio' }), parete(8.5, -27.7, 18, -27.2, 0, 9.4, { parte: 'municipio' }),
  parete(-12, -27.2, -11.5, -20.2, 0, 9.4, { parte: 'municipio' }), parete(17.5, -27.2, 18, -20.2, 0, 9.4, { parte: 'municipio' }),
  vx(-8.05, -27.2, -24.6, 0, 4.2, { parte: 'uffici' }), vx(-8.05, -22.8, -20.2, 0, 4.2, { parte: 'uffici' }),
  vx(-1.75, -27.2, -24.6, 0, 4.2, { parte: 'uffici' }), vx(-1.75, -22.8, -20.2, 0, 4.2, { parte: 'uffici' }),
  vx(9.15, -27.2, -24.6, 0, 4.2, { parte: 'uffici' }), vx(9.15, -22.8, -20.2, 0, 4.2, { parte: 'uffici' }),
  parete(1, -48, 1.5, -27.7, 0, 9.4, { parte: 'municipio' }), parete(15.5, -48, 16, -27.7, 0, 9.4, { parte: 'municipio' }),
  parete(1.5, -48, 4, -47.5, 0, 9.4, { parte: 'municipio' }), parete(6, -48, 10.5, -47.5, 0, 9.4, { parte: 'municipio' }),
  parete(12.5, -48, 15.5, -47.5, 0, 9.4, { parte: 'municipio' }),
  parete(5, -36.3, 5.5, -27.7, 0, 9.4, { parte: 'scala' }), parete(8.5, -36.3, 9, -27.7, 0, 9.4, { parte: 'scala' }),
  parete(1.5, -36.3, 5, -36, PIANO_CONSIGLIO, 9.4, { parte: 'scala' }), parete(9, -36.3, 15.5, -36, PIANO_CONSIGLIO, 9.4, { parte: 'scala' }),

  oz(-19.85, 18, 34, 0, 2.8, { parte: 'cinta' }), oz(-19.85, 36, 42.6, 0, 2.8, { parte: 'cinta' }),
  oz(35.15, -22, -15.7, 0, 2.6, { parte: 'cinta' }), oz(35.15, -13.7, -4.5, 0, 2.6, { parte: 'cinta' }),

  parete(119.8, -5.2, 134.2, -5, 0, 4.2),
  parete(119.8, 5, 134.2, 5.2, 0, 4.2), parete(119.8, -5, 120, 5, 0, 4.2), parete(134, -5, 134.2, 5, 0, 4.2),
]);

const rete = (x0, z0, x1, z1) => Object.freeze({ x0, z0, x1, z1, base: 0, altezza: ALTEZZA_RECINZIONE });
export const RECINZIONI = Object.freeze([
  rete(-15.8, -20.15, -14.9, -19.85), rete(-12.9, -20.15, -12, -19.85),
  rete(-27.55, -17, -27.25, -15.5), rete(-27.55, -13.5, -27.25, -12),
  rete(-47.95, 26, -47.65, 30), rete(-47.95, 32, -47.65, 36.2),
  rete(38.35, 25, 38.65, 26.5), rete(38.35, 28.5, 38.65, 30.6),
]);

const ostacolo = (tipo, x0, z0, x1, z1, base, altezza, extra = {}) => Object.freeze({ x0, z0, x1, z1, base, altezza, tipo, ...extra });
const pilastro = (x, z, lato = 1, alto = 15) => ostacolo('pilastro', x - lato / 2, z - lato / 2, x + lato / 2, z + lato / 2, PAVIMENTO_CHIESA, alto);
const casa = (nome, x0, z0, x1, z1, altezza, extra = {}) => ostacolo('casa', x0, z0, x1, z1, 0, altezza, { nome, ...extra });

export const CASE = Object.freeze([
  casa('portici', -31.2, -28.4, -15.8, -17, 10.5, { colore: 0xd8a35c, portici: true, faccia: 'sud' }),
  casa('so1', -42.9, -12, -27.2, 2.6, 7.4, { colore: 0xd9c9a8, faccia: 'est' }),
  casa('so2a', -46, -2.6, -40.5, 9, 9.8, { colore: 0xc98c5a, faccia: 'est' }),
  casa('so2b', -52, 9, -43.5, 17, 9.8, { colore: 0xc98c5a, faccia: 'est' }),
  casa('so3', -58.6, 17, -46.5, 26, 9, { colore: 0xe0c27a, faccia: 'est', bar: true }),
  casa('sw1', -51.1, 36.2, -40.9, 49.3, 8.6, { colore: 0xd6b48a, faccia: 'nord' }),
  casa('sw2', -41.8, 35.3, -29.3, 52, 10.4, { colore: 0xcf8a62, faccia: 'nord' }),
  casa('sw3', -29.3, 35, -22, 44, 9.2, { colore: 0xe4d2a8, faccia: 'nord' }),
  casa('s1', -4.5, 33, 6, 45, 10.6, { colore: 0xd47a4e, faccia: 'nord', bovindo: true }),
  casa('s2', 6, 31.8, 23.5, 40, 9.8, { colore: 0xe2b98a, faccia: 'nord' }),
  casa('s3', 23.5, 30.6, 42.5, 39, 10.2, { colore: 0xd9a070, faccia: 'nord', arco: true }),
  casa('se', 42.5, 28.8, 57.4, 43.4, 9.6, { colore: 0xe6cfa0, faccia: 'ovest' }),
  casa('dietroMunicipio1', 18, -42, 28.4, -20, 10.2, { colore: 0xdab07a, faccia: 'sud' }),
  casa('dietroMunicipio2', 28.4, -42.9, 33.3, -25.9, 9, { colore: 0xe8c690, faccia: 'sud' }),
  casa('cinema', 61.6, -8.4, 85.3, 2, 9, { colore: 0xcfc6b4, faccia: 'ovest' }),
  casa('oratorio', 59.4, 0.5, 84.7, 21.5, 8, { colore: 0xd4b088, faccia: 'ovest' }),
]);

export const OSTACOLI = Object.freeze([
  ...CASE,
  ostacolo('annesso', 37, 11.4, 52.6, 25, 0, 14),
  ostacolo('annesso', 31, 18.4, 37, 25, 0, 14),
  ostacolo('annesso', 31, 11.4, 37, 12.4, 0, 14),
  ostacolo('fontana', -26, -0.2, -23.6, 2.2, 0, 1.25),
  ostacolo('colonna', -2.45, -2.6, -1.85, -2, PAVIMENTO_CHIESA, 7.6),
  ostacolo('colonna', -2.45, 2, -1.85, 2.6, PAVIMENTO_CHIESA, 7.6),
  ...[6.5, 12.5, 18.5, 24.5].flatMap(x => [pilastro(x, -5.7), pilastro(x, 5.7)]),
  ostacolo('pilastroCupola', 30, -6.6, 31.4, -5.2, PAVIMENTO_CHIESA, 15), ostacolo('pilastroCupola', 30, 5.2, 31.4, 6.6, PAVIMENTO_CHIESA, 15),
  ostacolo('pilastroCupola', 40.6, -6.6, 42, -5.2, PAVIMENTO_CHIESA, 15), ostacolo('pilastroCupola', 40.6, 5.2, 42, 6.6, PAVIMENTO_CHIESA, 15),
  ostacolo('banchi', 5, -4.6, 27, -0.9, PAVIMENTO_CHIESA, 0.95),
  ostacolo('banchi', 5, 0.9, 27, 4.6, PAVIMENTO_CHIESA, 0.95),
  ostacolo('altare', 50.6, -1.4, 52.4, 1.4, PAVIMENTO_PRESBITERIO, 1.05),
  ostacolo('tabernacolo', 53.2, -1.1, 54.6, 1.1, PAVIMENTO_PRESBITERIO, 4.2),
  ostacolo('abside', 54.2, -5.2, 56.3, -3.3, PAVIMENTO_PRESBITERIO, 15), ostacolo('abside', 54.2, 3.3, 56.3, 5.2, PAVIMENTO_PRESBITERIO, 15),
  ostacolo('altareLaterale', 34, -10.35, 38, -9.4, PAVIMENTO_CHIESA, 1.1, { pala: 'ultimaCena' }),
  ostacolo('altareLaterale', 34, 9.45, 38, 10.4, PAVIMENTO_CHIESA, 1.1, { pala: 'eccoHomo' }),
  ostacolo('altareLaterale', 18.2, 16.6, 19.4, 19.8, PAVIMENTO_CHIESA, 1.2, { pala: 'beato' }),
  ostacolo('bancone', 48.4, -18.6, 51.1, -17.9, PAVIMENTO_CHIESA, 1),
  ostacolo('scrivania', -11.3, -22.2, -10.3, -20.6, 0, 0.8),
  ostacolo('scrivania', -1.2, -26.9, 1.2, -25.9, 0, 0.8),
  ostacolo('scrivania', 11.5, -26.9, 14, -25.9, 0, 0.8),
  ostacolo('presidenza', 13.9, -45, 15, -38.5, PIANO_CONSIGLIO, 0.95),
  ostacolo('bancoConsiglio', 6, -45.2, 10, -43.2, PIANO_CONSIGLIO, 0.8),
  ostacolo('bancoConsiglio', 6, -40.4, 10, -38.4, PIANO_CONSIGLIO, 0.8),
  ostacolo('auto', 8.2, -19.5, 12.6, -17.6, 0, 1.5),
  ostacolo('auto', 13.2, -19.5, 17.6, -17.6, 0, 1.5),
  ostacolo('tavolino', -43.6, 21.6, -42.8, 22.4, 0, 0.75), ostacolo('tavolino', -41.4, 23.6, -40.6, 24.4, 0, 0.75),
  ostacolo('tavolino', -42.6, 19.1, -41.8, 19.9, 0, 0.75), ostacolo('tavolino', -39.6, 20.6, -38.8, 21.4, 0, 0.75),
  ostacolo('lampione', -20.15, -11.15, -19.85, -10.85, 0, 4.6), ostacolo('lampione', -20.15, 14.85, -19.85, 15.15, 0, 4.6),
  ostacolo('lampione', -8.15, 28.85, -7.85, 29.15, 0, 4.6), ostacolo('lampione', 10.85, 28.85, 11.15, 29.15, 0, 4.6),
  ostacolo('lampione', 20.85, -13.15, 21.15, -12.85, 0, 4.6), ostacolo('lampione', -35.15, 28.85, -34.85, 29.15, 0, 4.6),

  ostacolo('pullman', -18.9, 15.6, -16.3, 27.4, 0, 3.2),
  ostacolo('bancarella', -25.2, -10, -21.8, -7.6, 0, 2.5, { tenda: 0xb8323a }),
  ostacolo('bancarella', -18.4, -10, -15, -7.6, 0, 2.5, { tenda: 0x2f6aa8 }),
  ostacolo('bancarella', -11.6, -10, -8.2, -7.6, 0, 2.5, { tenda: 0xd8a020 }),
  ostacolo('auto', -23.8, -17.2, -21.9, -12.8, 0, 1.5, { colore: 0x8a1e1e, incidentata: true }),
  ostacolo('auto', -9.6, -14.6, -5.2, -12.7, 0, 1.5, { colore: 0x26466e, incidentata: true }),
  ostacolo('ambulanza', -8.4, 15, -6, 20.8, 0, 2.7),
  ostacolo('jersey', -27.2, 12, -22.8, 12.6, 0, 0.9),
  ostacolo('jersey', -14.2, 12, -10.2, 12.6, 0, 0.9),
  ostacolo('sacchi', -4.6, 22.6, -1.2, 23.6, 0, 1.1),
  ostacolo('cantiere', -25.6, 22, -21.2, 27.2, 0, 2),
  ostacolo('furgone', 5.6, 15.5, 7.8, 21, 0, 2.5),
  ostacolo('cassonetti', 12.6, 12.6, 16.4, 13.8, 0, 1.4),
  ostacolo('auto', -37.5, 9.6, -33.1, 11.5, 0, 1.5, { colore: 0x5a5e62, incidentata: true, ribaltata: true }),
  ostacolo('cassonetti', -32.5, 34, -29.5, 35.2, 0, 1.4),
  ostacolo('panchina', -27.15, -4.6, -26.55, -2.8, 0, 0.85, { schiena: 'x0' }),
  ostacolo('panchina', -20.5, -16.6, -18.7, -16.05, 0, 0.85, { schiena: 'z0' }),
  ostacolo('panchina', 3, 11.6, 4.8, 12.15, 0, 0.85, { schiena: 'z0' }),
  ostacolo('fioriera', -7.8, -19.65, -6.8, -19.05, 0, 0.6),
  ostacolo('fioriera', -3.2, -19.65, -2.2, -19.05, 0, 0.6),
  ostacolo('rastrelliera', 18.6, -19.95, 20.8, -17.85, 0, 0.9),
  ostacolo('segnale', -0.68, 12.42, -0.52, 12.58, 0, 2.6, { cartello: 'sensoUnico' }),
  ostacolo('segnale', 17.12, 24.12, 17.28, 24.28, 0, 2.6, { cartello: 'divieto' }),
  ostacolo('segnale', -26.88, 33.72, -26.72, 33.88, 0, 2.6, { cartello: 'precedenza' }),
]);

function finestra(id, zonaId, asse, posizione, da, a, versoFuori, { recinzione = false, spessore = SPESSORE } = {}) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const scatola = asse === 'z' ? { x0: da, z0: posizione - spessore / 2, x1: a, z1: posizione + spessore / 2 } : { x0: posizione - spessore / 2, z0: da, x1: posizione + spessore / 2, z1: a };
  const fuori = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  const passo = spessore / 2 + 0.95;
  return Object.freeze({
    id, zona: zonaId, asse, centro: Object.freeze(centro), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    esterno: Object.freeze({ x: centro.x + fuori.x * passo, z: centro.z + fuori.z * passo }),
    interno: Object.freeze({ x: centro.x - fuori.x * passo, z: centro.z - fuori.z * passo }),
    comparsa: Object.freeze({ x: centro.x + fuori.x * 4, z: centro.z + fuori.z * 4 }),
    fuori: Object.freeze(fuori),
    recinzione,
    spessore,
  });
}

function tomba(id, zonaId, x, z) {
  const punto = Object.freeze({ x, z });
  return Object.freeze({ id, zona: zonaId, tana: true, acqua: false, asse: 'z', centro: punto, scatola: null, esterno: punto, interno: punto, comparsa: punto, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false });
}

const RETE = Object.freeze({ recinzione: true });

export const FINESTRE = Object.freeze([
  finestra('p1', 'piazza', 'z', -20, -14.9, -12.9, -1, RETE),
  finestra('p2', 'piazza', 'x', -27.4, -15.5, -13.5, -1, RETE),
  finestra('p3', 'piazzaOvest', 'x', -47.8, 30, 32, -1, RETE),
  finestra('p4', 'piazza', 'z', 35.15, -15.7, -13.7, 1, RETE),
  finestra('n1', 'latoNord', 'z', -19.85, 34, 36, -1, RETE),
  finestra('s1', 'vicoloSud', 'x', 38.5, 26.5, 28.5, 1, RETE),
  finestra('m1', 'municipio', 'z', -27.45, -10, -8, -1, { spessore: 0.5 }),
  finestra('m2', 'municipio', 'z', -27.45, -4, -2, -1, { spessore: 0.5 }),
  finestra('k1', 'consiglio', 'z', -47.75, 4, 6, -1, { spessore: 0.5 }),
  finestra('k2', 'consiglio', 'z', -47.75, 10.5, 12.5, -1, { spessore: 0.5 }),
  finestra('r1', 'sacrestia', 'z', -18.85, 46, 48, -1, { spessore: 0.5 }),
  tomba('t1', 'navata', 9.5, -8.3),
  tomba('t2', 'navata', 21.5, 8.3),
  tomba('t3', 'crociera', 36, -7.6),
  tomba('g1', 'piazza', -20.6, 4.4),
  tomba('g2', 'piazza', -4.2, 27),
  tomba('g3', 'piazza', -17.6, -3.6),
]);

function porta(id, nome, costo, zone, scatola, extra = {}) {
  return Object.freeze({
    id, nome, costo, chiusa: false, zone: Object.freeze(zone), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }), ...extra,
  });
}

export const PORTE = Object.freeze([
  porta('municipio', 'Portone del Municipio', 750, ['municipio'], { x0: -6.3, z0: -20.2, x1: -3.7, z1: -19.7 }, { tipo: 'portone' }),
  porta('transenneNord', 'Transenne del lato nord', 750, ['latoNord'], { x0: 0.2, z0: -19.7, x1: 0.8, z1: -11.35 }, { tipo: 'transenne' }),
  porta('transenneSud', 'Transenne di via Beato Pacifico', 750, ['vicoloSud'], { x0: 17.5, z0: 25, x1: 18.1, z1: 31.8 }, { tipo: 'transenne' }),
  porta('portone', 'Portone della chiesa', 1000, ['navata', 'crociera', 'presbiterio'], { x0: 0, z0: -1.3, x1: 1, z1: 1.3 }, { tipo: 'portaleChiesa' }),
  porta('scalone', 'Scalone del Municipio', 1000, ['scala', 'consiglio'], { x0: 5.5, z0: -27.7, x1: 8.5, z1: -27.2 }, { tipo: 'porta' }),
  porta('sacrestia', 'Porta della sacrestia', 1000, ['sacrestia'], { x0: 42.6, z0: -16.5, x1: 43.1, z1: -14.3 }, { tipo: 'porta' }),
  porta('sacrestiaChiesa', 'Porta della sacrestia dal presbiterio', 750, ['sacrestia'], { x0: 44, z0: -5.7, x1: 46, z1: -5.2 }, { tipo: 'porta' }),
  porta('tempietto', 'Cancelli del Tempietto', 1000, ['tempietto'], { x0: 19.6, z0: 24.5, x1: 29.1, z1: 25 }, { tipo: 'cancelli' }),
  porta('tempiettoChiesa', 'Porta del Tempietto dalla navata', 1000, ['tempietto'], { x0: 23, z0: 10.4, x1: 25, z1: 11.4 }, { tipo: 'porta' }),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, munizioni, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });

export const ACQUISTI = Object.freeze([
  muro('pompa', 800, 400, 'piazza', -27.04, -6, [1, 0]),
  acquisto('fontana', 'munizioni', 'piazza', -22.9, 1, [1, 0]),
  bibita('ritorno', 'piazzaOvest', -40.05, 6, [1, 0]),
  muro('mitra', 1200, 600, 'municipio', -6.6, -27.04, [0, 1]),
  bibita('lampo', 'municipio', 15.6, -26.5, [0, 1]),
  muro('precisione', 1750, 900, 'consiglio', 1.66, -41, [1, 0]),
  muro('carabina', 1600, 800, 'latoNord', 24, -19.54, [0, 1]),
  bibita('raffica', 'latoNord', 39.5, -19.05, [0, 1]),
  muro('assalto', 1500, 750, 'vicoloSud', 29, 30.44, [0, -1]),
  acquisto('cassa', 'cassa', 'navata', 15.5, -9.75, [0, 1]),
  muro('battaglia', 1700, 850, 'navata', 9.5, 10.24, [0, -1]),
  bibita('ferro', 'crociera', 32.2, 9.75, [0, -1]),
  acquisto('interruttore', 'interruttore', 'sacrestia', 51.14, -14, [-1, 0]),
  muro('doppietta', 1000, 500, 'sacrestia', 44.6, -18.44, [0, 1]),
  acquisto('campanile', 'campanile', 'tempietto', 30.2, 15.4, [-1, 0]),
  acquisto('potenziatore', 'potenziatore', 'cella', 34, 13.75, [0, 1]),
  acquisto('campane', 'campane', 'cella', 31.76, 15.6, [1, 0]),
  acquisto('discesa', 'discesa', 'cella', 36.24, 16.6, [-1, 0]),
  acquisto('libro', 'libro', 'sacrestia', 47.5, -16.4, [0, 1]),
]);

export const MURALI = Object.freeze(new Set(['arma', 'munizioni', 'interruttore', 'campanile', 'campane', 'discesa']));

export const PARTENZE = Object.freeze([[-11, 3.2], [-11, 6.2], [-13.6, 3.2], [-13.6, 6.2]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[123, -1.2], [123, 1.2], [121.6, -1.2], [121.6, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: 133.84, z: 0, verso: punto(-1, 0) });

export const FRAMMENTI = Object.freeze([
  Object.freeze({ id: 0, x: -24.8, z: 2.35, y: 1.42, santo: 'il Beato Pacifico' }),
  Object.freeze({ id: 1, x: -10.6, z: -26.4, y: 0.95, santo: 'San Rocco' }),
  Object.freeze({ id: 2, x: 2.2, z: 9.6, y: 1.25, santo: 'San Giuseppe' }),
  Object.freeze({ id: 3, x: 18.8, z: 13.2, y: 1.05, santo: 'San Giovanni' }),
  Object.freeze({ id: 4, x: 36, z: 17.35, y: PIANO_CELLA + 0.95, santo: 'la Madonna' }),
]);

export const ARREDI = Object.freeze([]);

export const NOMI = Object.freeze({
  cassa: 'Scrigno delle Offerte',
  potenziatore: 'Fonderia',
  nemici: 'i Dannati di Cerano',
  frammento: 'Statuetta in cotto',
  raccogli: 'Premi F per raccogliere la statuetta in cotto',
  segreto: 'Le cinque statue della facciata si risvegliano: avete l\'Orizzonte degli Eventi!',
});

export const OGGETTI = Object.freeze({
  ARRIVO_CELLA: punto(34, 16.3),
  USCITA_CAMPANILE: punto(29.1, 15.4),
  CAMPANILE: Object.freeze({ x0: 31, z0: 12.4, x1: 37, z1: 18.4 }),
  CUPOLA: Object.freeze({ x: 36, z: 0, raggio: 5.9 }),
  FONTANA: punto(-24.8, 1),
  OROLOGIO: 26.5,
  RAGGIO_QUADRANTE: 1.25,
  PERCORSO_CARRO: Object.freeze([
    Object.freeze({ x: -41, z: 31 }),
    Object.freeze({ x: -12, z: 31.5 }),
    Object.freeze({ x: 4, z: 30.4 }),
    Object.freeze({ x: 16.3, z: 30.4, porta: 'transenneSud' }),
    Object.freeze({ x: 21, z: 28.4, porta: 'tempietto' }),
    Object.freeze({ x: 21, z: 22 }),
    Object.freeze({ x: 22.3, z: 18.2 }),
  ]),
  CAPITANO: punto(8, 24),
});
