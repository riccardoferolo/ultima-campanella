const SPESSORE = 0.4;
export const ALTEZZA_SOFFITTO = 3.2;
export const ALTEZZA_RECINZIONE = 2.6;
export const ATMOSFERA = Object.freeze({ buio: 0x0a120c, cielo: 0x0d1a14, nebbiaDentro: 20, nebbiaFuori: 30, nebbiaVicino: 2 });

const zona = (id, nome, x0, z0, x1, z1, pavimento, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, ...extra });

export const ZONE = Object.freeze([
  zona('campo', 'Accampamento', -10, -10, 10, 10, 'suoloGiungla', { aperto: true }),
  zona('pista', "Pista d'atterraggio", 10, -9, 52, 9, 'fango', { aperto: true }),
  zona('sentiero', 'Sentiero', -24, -4, -10, 4, 'foglieTerra', { aperto: true }),
  zona('grotta', 'Grotta', -46, -12, -24, 8, 'roccia'),
  zona('villaggio', 'Villaggio', -24, -42, 24, -10, 'suoloGiungla', { aperto: true }),
  zona('rivaSud', 'Riva sud', -40, 10, 40, 22, 'fango', { aperto: true }),
  zona('ponte', 'Ponte di corda', -2, 22, 2, 28, 'assiVecchie', { aperto: true }),
  zona('rivaNord', 'Riva nord', -20, 28, 40, 40, 'fango', { aperto: true }),
  zona('cascata', 'Cascata', -42, 28, -20, 46, 'foglieTerra', { aperto: true }),
  zona('scalinata', 'Scalinata del tempio', -14, 40, 14, 56, 'pietraTempio', { aperto: true }),
  zona('tempio', 'Tempio', -12, 56, 12, 74, 'pietraMuschio'),
  zona('cuore', 'Camera del cuore', -16, 74, 16, 94, 'pietraTempio'),
  zona('sala', 'Tenda del comando', 70, -5, 84, 5, 'assiVecchie', { sala: true }),
]);

export const SALA = Object.freeze({ x0: 70, z0: -5, x1: 84, z1: 5 });
export const LIMITI = Object.freeze({ x0: -48, z0: -44, x1: 54, z1: 96 });

const orizzontale = (z, x0, x1) => Object.freeze({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 });
const verticale = (x, z0, z1) => Object.freeze({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 });

function lato(costruisci, fisso, da, a, aperture) {
  const segmenti = [];
  let inizio = da;
  for (const [x0, x1] of [...aperture].sort((p, q) => p[0] - q[0])) {
    if (x0 > inizio) segmenti.push(costruisci(fisso, inizio, x0));
    inizio = Math.max(inizio, x1);
  }
  if (inizio < a) segmenti.push(costruisci(fisso, inizio, a));
  return segmenti;
}

function recinto(id, { n = [], s = [], e = [], w = [] } = {}) {
  const z = ZONE.find(q => q.id === id);
  return [
    ...lato(orizzontale, z.z1, z.x0, z.x1, n),
    ...lato(orizzontale, z.z0, z.x0, z.x1, s),
    ...lato(verticale, z.x1, z.z0, z.z1, e),
    ...lato(verticale, z.x0, z.z0, z.z1, w),
  ];
}

const VARCO = [[-2, 2]];
export const MURI = Object.freeze([
  ...recinto('campo', { n: VARCO, s: VARCO, e: VARCO, w: VARCO }),
  ...recinto('pista', { w: VARCO }),
  ...recinto('sentiero', { e: VARCO, w: VARCO }),
  ...recinto('grotta', { e: VARCO }),
  ...recinto('villaggio', { n: VARCO }),
  ...recinto('rivaSud', { s: VARCO, n: VARCO }),
  ...recinto('ponte', { s: [[-2, 2]], n: [[-2, 2]] }),
  ...recinto('rivaNord', { s: VARCO, w: [[32, 36]], n: [[-3, 3]] }),
  ...recinto('cascata', { e: [[32, 36]] }),
  ...recinto('scalinata', { s: [[-3, 3]], n: VARCO }),
  ...recinto('tempio', { s: VARCO, n: VARCO }),
  ...recinto('cuore', { s: VARCO }),
  ...recinto('sala'),
]);

export const RECINZIONI = Object.freeze([]);
export const INTERNE = Object.freeze(new Set(['grotta', 'tempio', 'cuore', 'sala']));

const ostacolo = (tipo, x, z, l, p, altezza = 1.2, extra = {}) => Object.freeze({ x0: x - l / 2, z0: z - p / 2, x1: x + l / 2, z1: z + p / 2, altezza, tipo, ...extra });

const PALME = Object.freeze([
  [-8, -8.4], [8.6, 8.2], [-3, -8.6], [14, 7.6], [26, -7.5], [48, -7], [-14, -2.8], [-21, 2.6],
  [-20, -38], [-6, -40], [10, -39], [21, -30], [-21, -22], [12, -14], [-35, 12.5], [-25, 19.5],
  [12, 20.5], [33, 13], [36, 20.4], [-17, 30], [8, 37.8], [24, 29.5], [38, 37], [-38, 30], [-24, 41],
  [-12.6, 42], [12.6, 42], [50, 7.6], [-30, 20.6], [28, 20.4],
]);

export const OSTACOLI = Object.freeze([
  ostacolo('tenda', -5, 3, 3.2, 2.4, 2.2),
  ostacolo('tenda', 5, -3, 3.2, 2.4, 2.2),
  ostacolo('casse', -4, -5, 1.6, 1.2, 1.1),
  ostacolo('tavolo', 6.5, 9.2, 1.6, 0.8, 0.85),
  ostacolo('generatoreG', -7.5, 8.1, 1.6, 1, 1.3),
  ostacolo('generatoreG', 44, 8.1, 1.6, 1, 1.3),
  ostacolo('fusoliera', 37, 0, 14, 2.6, 2.8),
  ostacolo('ala', 36, -4.6, 3, 6.4, 1.6),
  ostacolo('ala', 36, 4.6, 3, 6.4, 1.6),
  ostacolo('coda', 29.5, 0, 1.4, 1.4, 3),
  ostacolo('capanna', -14, -18, 5, 4.5, 3),
  ostacolo('capanna', 14, -18, 5, 4.5, 3),
  ostacolo('capanna', -14, -33, 5, 4.5, 3),
  ostacolo('capanna', 14, -33, 5, 4.5, 3),
  ostacolo('altare', 0, -26.8, 2.2, 1.4, 1.1),
  ostacolo('idolo', -36, -10.3, 1.3, 1.3, 2.2, { idolo: 0 }),
  ostacolo('idolo', -18.5, -27, 1.3, 1.3, 2.2, { idolo: 1 }),
  ostacolo('idolo', 35, 31.2, 1.3, 1.3, 2.2, { idolo: 2 }),
  ostacolo('idolo', 24, -7.8, 1.3, 1.3, 2.2, { idolo: 3 }),
  ostacolo('pietraSole', -8, 46.9, 1.1, 1.1, 1.3),
  ostacolo('pietraSole', 0, 44.9, 1.1, 1.1, 1.3),
  ostacolo('pietraSole', 8, 46.9, 1.1, 1.1, 1.3),
  ostacolo('pilastroRuna', -7, 60, 1, 1, ALTEZZA_SOFFITTO, { runa: 0 }),
  ostacolo('pilastroRuna', 7, 60, 1, 1, ALTEZZA_SOFFITTO, { runa: 1 }),
  ostacolo('pilastroRuna', -7, 69, 1, 1, ALTEZZA_SOFFITTO, { runa: 2 }),
  ostacolo('pilastroRuna', 7, 69, 1, 1, ALTEZZA_SOFFITTO, { runa: 3 }),
  ostacolo('altareCuore', 0, 93.1, 3, 1.2, 1.2),
  ostacolo('roccia', -33, -2, 2.4, 2, 1.8),
  ostacolo('roccia', -40, -6, 1.8, 1.6, 1.5),
  ostacolo('roccia', -28, 3, 1.6, 1.6, 1.4),
  ostacolo('roccia', -33, 36, 2.6, 2.2, 1.6),
  ostacolo('roccia', 20, 33, 2, 1.6, 1.4),
  ostacolo('pilastro', -9, 80, 1.2, 1.2, ALTEZZA_SOFFITTO),
  ostacolo('pilastro', 9, 80, 1.2, 1.2, ALTEZZA_SOFFITTO),
  ostacolo('pilastro', -9, 88, 1.2, 1.2, ALTEZZA_SOFFITTO),
  ostacolo('pilastro', 9, 88, 1.2, 1.2, ALTEZZA_SOFFITTO),
  ...PALME.map(([x, z]) => ostacolo('palma', x, z, 0.6, 0.6, 6)),
]);

function tana(id, zonaId, x, z) {
  const punto = Object.freeze({ x, z });
  return Object.freeze({ id, zona: zonaId, tana: true, asse: 'z', centro: punto, scatola: null, esterno: punto, interno: punto, comparsa: punto, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false });
}

export const FINESTRE = Object.freeze([
  tana('t-campo-1', 'campo', -8.4, 6.2), tana('t-campo-2', 'campo', 8.6, -8.2),
  tana('t-pista-1', 'pista', 30, 7.8), tana('t-pista-2', 'pista', 46, -7.6), tana('t-pista-3', 'pista', 50.6, 4),
  tana('t-sentiero', 'sentiero', -17, 3),
  tana('t-grotta-1', 'grotta', -44.6, -10.4), tana('t-grotta-2', 'grotta', -40, 6.6), tana('t-grotta-3', 'grotta', -27, -10.6),
  tana('t-villaggio-1', 'villaggio', -22.4, -40.4), tana('t-villaggio-2', 'villaggio', 22.4, -40.4), tana('t-villaggio-3', 'villaggio', -22.4, -12), tana('t-villaggio-4', 'villaggio', 22.4, -22),
  tana('t-sud-1', 'rivaSud', -38.4, 12), tana('t-sud-2', 'rivaSud', 38.4, 12), tana('t-sud-3', 'rivaSud', -20, 20.4), tana('t-sud-4', 'rivaSud', 25, 12),
  tana('t-nord-1', 'rivaNord', -18.4, 38.4), tana('t-nord-2', 'rivaNord', 38.4, 30), tana('t-nord-3', 'rivaNord', 20, 38.4),
  tana('t-cascata-1', 'cascata', -40.4, 44), tana('t-cascata-2', 'cascata', -22, 44.4),
  tana('t-scalinata-1', 'scalinata', -12.4, 54), tana('t-scalinata-2', 'scalinata', 12.4, 54),
  tana('t-tempio-1', 'tempio', -10.4, 72.4), tana('t-tempio-2', 'tempio', 10.4, 57.6),
  tana('t-cuore-1', 'cuore', -14.4, 92.4), tana('t-cuore-2', 'cuore', 14.4, 92.4), tana('t-cuore-3', 'cuore', -14.4, 75.6), tana('t-cuore-4', 'cuore', 14.4, 75.6),
]);

export const TANE_CUORE = Object.freeze(['t-cuore-1', 't-cuore-2', 't-cuore-3', 't-cuore-4']);

function porta(id, nome, costo, zone, scatola, chiusa = false) {
  return Object.freeze({
    id, nome, costo, chiusa, zone: Object.freeze(zone), scatola,
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }),
  });
}

export const PORTE = Object.freeze([
  porta('pista', 'Liane verso la pista', 1000, ['campo', 'pista'], verticale(10, -2, 2)),
  porta('sentiero', 'Liane verso il sentiero', 750, ['campo', 'sentiero'], verticale(-10, -2, 2)),
  porta('grotta', 'Massi della grotta', 1250, ['sentiero', 'grotta'], verticale(-24, -2, 2)),
  porta('villaggio', 'Palizzata del villaggio', 1500, ['campo', 'villaggio'], orizzontale(-10, -2, 2)),
  porta('riva', 'Liane verso il fiume', 750, ['campo', 'rivaSud'], orizzontale(10, -2, 2)),
  porta('ponte', 'Ponte di corda', 0, ['rivaSud', 'ponte', 'rivaNord'], orizzontale(22, -2, 2), true),
  porta('cascata', 'Liane della cascata', 1250, ['rivaNord', 'cascata'], verticale(-20, 32, 36)),
  porta('scalinata', 'Rovi della scalinata', 1000, ['rivaNord', 'scalinata'], orizzontale(40, -3, 3)),
  porta('tempio', 'Porta del tempio', 0, ['scalinata', 'tempio'], orizzontale(56, -2, 2), true),
  porta('sigillo', 'Sigillo del cuore', 0, ['tempio', 'cuore'], orizzontale(74, -2, 2), true),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, munizioni, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });

export const ACQUISTI = Object.freeze([
  muro('pompa', 800, 400, 'campo', -9.6, -5, [1, 0]),
  muro('mitra', 1200, 600, 'campo', 9.6, 5, [-1, 0]),
  muro('carabina', 1600, 800, 'rivaSud', 20, 10.4, [0, 1]),
  muro('assalto', 1500, 750, 'pista', 30, -8.6, [0, 1]),
  muro('precisione', 1750, 900, 'villaggio', 0, -41.6, [0, 1]),
  muro('vettore', 1300, 650, 'sentiero', -16, -3.6, [0, 1]),
  muro('raffica', 900, 450, 'grotta', -45.6, 0, [1, 0]),
  muro('mitragliatrice', 2500, 1250, 'tempio', -11.6, 64, [1, 0]),
  muro('doppietta', 1000, 500, 'cascata', -41.6, 38, [1, 0]),
  muro('dsv', 1800, 900, 'rivaNord', 30, 39.6, [0, -1]),
  bibita('ferro', 'campo', -2, 9.2, [0, -1]),
  bibita('lampo', 'pista', 20, 8.2, [0, -1]),
  bibita('ritorno', 'villaggio', 23.2, -25, [-1, 0]),
  bibita('raffica', 'rivaNord', 10, 39.2, [0, -1]),
  bibita('scatto', 'sentiero', -12, 3.2, [0, -1]),
  bibita('tasca', 'grotta', -32, 7.2, [0, -1]),
  acquisto('cassa', 'cassa', 'campo', 2, -9.2, [0, 1]),
  acquisto('potenziatore', 'potenziatore', 'grotta', -45.2, -5, [1, 0]),
  acquisto('generatore1', 'generatoreG', 'campo', -7.5, 7.3, [0, -1], { generatore: 0 }),
  acquisto('generatore2', 'generatoreG', 'pista', 44, 7.3, [0, -1], { generatore: 1 }),
  acquisto('radio', 'radio', 'campo', 6.5, 8.6, [0, -1]),
  acquisto('cantiere', 'cantiere', 'rivaSud', 3.6, 21.2, [0, -1]),
  acquisto('altare', 'altare', 'villaggio', 0, -26, [0, 1]),
  acquisto('cabina', 'cabina', 'pista', 44.6, 0, [1, 0]),
  acquisto('pietra0', 'pietraSole', 'scalinata', -8, 46.2, [0, -1], { pietra: 0 }),
  acquisto('pietra1', 'pietraSole', 'scalinata', 0, 44.2, [0, -1], { pietra: 1 }),
  acquisto('pietra2', 'pietraSole', 'scalinata', 8, 46.2, [0, -1], { pietra: 2 }),
  acquisto('portaTempio', 'portaTempio', 'scalinata', 3.4, 55.4, [0, -1]),
  acquisto('runa0', 'runa', 'tempio', -6.3, 60, [1, 0], { runa: 0 }),
  acquisto('runa1', 'runa', 'tempio', 6.3, 60, [-1, 0], { runa: 1 }),
  acquisto('runa2', 'runa', 'tempio', -6.3, 69, [1, 0], { runa: 2 }),
  acquisto('runa3', 'runa', 'tempio', 6.3, 69, [-1, 0], { runa: 3 }),
  acquisto('cuoreAltare', 'cuoreAltare', 'cuore', 0, 92.3, [0, -1]),
  acquisto('idolo0', 'idolo', 'grotta', -36, -9.4, [0, 1], { idolo: 0 }),
  acquisto('idolo1', 'idolo', 'villaggio', -17.6, -27, [1, 0], { idolo: 1 }),
  acquisto('idolo2', 'idolo', 'rivaNord', 35, 32.1, [0, 1], { idolo: 2 }),
  acquisto('idolo3', 'idolo', 'pista', 24, -6.9, [0, 1], { idolo: 3 }),
]);

export const MURALI = Object.freeze(new Set(['arma', 'generatoreG', 'radio', 'cantiere', 'altare', 'cabina', 'pietraSole', 'portaTempio', 'runa', 'cuoreAltare', 'idolo']));

export const PARTENZE = Object.freeze([[-1.5, 0], [1.5, 0], [-1.5, -2.2], [1.5, -2.2]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[73, -1.2], [73, 1.2], [71.6, -1.2], [71.6, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: 83.8, z: 0, verso: punto(-1, 0) });
export const FRAMMENTI = Object.freeze([]);
export const ARREDI = Object.freeze([]);

export const OGGETTI = Object.freeze({
  ASSI: Object.freeze([punto(-18, -15.5), punto(18, -36.5), punto(-10, -38.5)]),
  SCHEGGIA_GROTTA: Object.freeze({ x: -42.6, z: 4.6, y: 0.95 }),
  BASTONE: Object.freeze({ x: -31, z: 42.5, y: 0.5 }),
  SPADA: Object.freeze({ x: 0, z: 49, y: 0.5 }),
  ALTARE: Object.freeze({ x: 0, z: -26.8, y: 1.2 }),
  CASSA_FIUME: Object.freeze({ z: 25, x0: -36, x1: 36, velocita: 1.6 }),
  IDOLI: Object.freeze([punto(-36, -10.3), punto(-18.5, -27), punto(35, 31.2), punto(24, -7.8)]),
  GENERATORI: Object.freeze([punto(-7.5, 8.1), punto(44, 8.1)]),
  PONTE: punto(0, 21),
  PORTA_TEMPIO: punto(0, 55),
  SIGILLO: punto(0, 73.6),
  CUORE: punto(0, 84),
  COMPARSA_SCIAMANO: punto(0, -36),
  COMPARSA_GUARDIANO: punto(0, 52),
  COMPARSA_DIVORATORE: punto(0, 77),
  AEREO: punto(40, 0),
  SOGLIA_CUORE: 75,
});
