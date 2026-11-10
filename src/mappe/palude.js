const SPESSORE = 0.4;
export const ALTEZZA_SOFFITTO = 3.6;
export const ALTEZZA_RECINZIONE = 2.6;
export const FONDO_TEMPIO = -2.4;
export const TETTO_TEMPIO = 6.2;
export const ELEMENTI_RELIQUIE = Object.freeze(['ghiaccio', 'fuoco', 'vuoto', 'vento']);
export const ATMOSFERA = Object.freeze({ buio: 0x0d1710, cielo: 0x1b2d22, nebbiaDentro: 34, nebbiaFuori: 58, nebbiaVicino: 7 });

const zona = (id, nome, x0, z0, x1, z1, pavimento, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, ...extra });
const fuori = { aperto: true };

export const ZONE = Object.freeze([
  zona('imbarcadero', 'Imbarcadero', -12, 48, 12, 66, 'assiVecchie', fuori),
  zona('passerella', 'Passerella del canneto', -2, 18, 2, 48, 'assiVecchie', { ...fuori, passerella: true }),
  zona('pontileOvest', 'Pontile dei relitti', -28, 54, -12, 58, 'assiVecchie', { ...fuori, passerella: true }),
  zona('cimitero', 'Cimitero dei relitti', -70, 26, -28, 66, 'fango', fuori),
  zona('pontileEst', 'Pontile delle baracche', 12, 54, 28, 58, 'assiVecchie', { ...fuori, passerella: true }),
  zona('cortile', 'Cortile delle baracche', 28, 40, 70, 66, 'fango', fuori),
  zona('baracche', 'Baracche dei guardiani', 28, 26, 70, 40, 'legno'),
  zona('passerellaBaracche', 'Passerella della distilleria', 42, 18, 46, 26, 'assiVecchie', { ...fuori, passerella: true }),
  zona('piazzale', 'Piazzale della segheria', -20, 2, 20, 18, 'fango', fuori),
  zona('segheria', 'Segheria', -20, -22, 20, 2, 'legno'),
  zona('scala', 'Discesa al tempio', -28, -12, -20, -8, 'pietra', { tempio: true }),
  zona('laboratorio', 'Tempio di Malakor', -64, -22, -28, 14, 'pietra', { tempio: true, tetto: TETTO_TEMPIO }),
  zona('pontePiazzale', 'Ponte della distilleria', 20, 8, 28, 12, 'assiVecchie', { ...fuori, passerella: true }),
  zona('aia', 'Aia della distilleria', 28, 4, 70, 18, 'fango', fuori),
  zona('distilleria', 'Distilleria', 28, -22, 48, 4, 'legno'),
  zona('torre', 'Torre radio', 48, -22, 70, 4, 'fango', fuori),
  zona('guado', 'Guado delle rapide', 56, -30, 60, -22, 'assiVecchie', { ...fuori, passerella: true }),
  zona('rapide', 'Rapide di Fangoso', 28, -70, 70, -30, 'fango', fuori),
  zona('passerellaNord', 'Passerella nord', -2, -30, 2, -22, 'assiVecchie', { ...fuori, passerella: true }),
  zona('cuore', 'Cuore della palude', -20, -70, 20, -30, 'fango', fuori),
  zona('ponteMangrovie', 'Ponte delle mangrovie', -28, -52, -20, -48, 'assiVecchie', { ...fuori, passerella: true }),
  zona('ponteRapide', 'Ponte delle rapide', 20, -52, 28, -48, 'assiVecchie', { ...fuori, passerella: true }),
  zona('passerellaSciamano', 'Passerella dello sciamano', -48, -30, -44, -22, 'assiVecchie', { ...fuori, passerella: true }),
  zona('isola', 'Isola dello sciamano', -66, -66, -28, -30, 'fango', fuori),
  zona('sala', 'Capanno dei cacciatori', -120, -8, -100, 8, 'assiVecchie', { sala: true }),
  zona('tana', 'Tana di Arachne', -24, -146, 24, -98, 'roccia', { grotta: true, tetto: 12 }),
]);

export const SALA = Object.freeze({ x0: -120, z0: -8, x1: -100, z1: 8 });
export const LIMITI = Object.freeze({ x0: -71, z0: -147, x1: 71, z1: 67 });
export const INTERNE = Object.freeze(new Set(['baracche', 'segheria', 'scala', 'laboratorio', 'distilleria', 'sala']));

const orizzontale = (z, x0, x1, extra = {}) => Object.freeze({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2, ...extra });
const verticale = (x, z0, z1, extra = {}) => Object.freeze({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1, ...extra });
const TUTTO = Object.freeze([[-1e9, 1e9]]);

function lato(costruisci, fisso, da, a, aperture, extra) {
  const segmenti = [];
  let inizio = da;
  for (const [x0, x1] of [...aperture].sort((p, q) => p[0] - q[0])) {
    if (x0 > inizio) segmenti.push(costruisci(fisso, inizio, Math.min(x0, a), extra));
    inizio = Math.max(inizio, x1);
  }
  if (inizio < a) segmenti.push(costruisci(fisso, inizio, a, extra));
  return segmenti;
}

function recinto(id, { n = [], s = [], e = [], w = [] } = {}, extra = {}, tipoLato = {}) {
  const z = ZONE.find(q => q.id === id);
  const con = l => ({ ...extra, ...(tipoLato[l] ? { tipo: tipoLato[l].tipo, altezza: tipoLato[l].altezza } : {}) });
  return [
    ...lato(orizzontale, z.z1, z.x0, z.x1, n, con('n')),
    ...lato(orizzontale, z.z0, z.x0, z.x1, s, con('s')),
    ...lato(verticale, z.x1, z.z0, z.z1, e, con('e')),
    ...lato(verticale, z.x0, z.z0, z.z1, w, con('w')),
  ];
}

const LEGNO = Object.freeze({ tipo: 'assi' });
const CEMENTO = Object.freeze({ tipo: 'cemento' });
const RIVA = Object.freeze({ tipo: 'riva', altezza: 0.5 });
const PARAPETTO = Object.freeze({ tipo: 'parapetto', altezza: 1.05 });
const STACCIONATA = Object.freeze({ tipo: 'staccionata', altezza: 1.3 });
const GROTTA = Object.freeze({ tipo: 'grotta', altezza: 12 });
const TEMPIO = Object.freeze({ tipo: 'tempio', base: FONDO_TEMPIO, altezza: TETTO_TEMPIO - FONDO_TEMPIO });
const SPONDA_SCALA = Object.freeze({ tipo: 'spondaTempio', base: FONDO_TEMPIO, altezza: 3.4 });

export const MURI = Object.freeze([
  ...recinto('baracche', { n: [[47.5, 50.5]], s: [[42, 46], [32, 34], [58, 60]], e: [[32, 34]], w: [[32, 34]] }, LEGNO),
  verticale(40, 26, 30, LEGNO), verticale(40, 33, 40, LEGNO), verticale(56, 26, 31, LEGNO), verticale(56, 34, 40, LEGNO),
  ...recinto('segheria', { n: [[-2, 2]], s: [[-2, 2], [-14, -12], [12, 14]], w: [[-12, -8], [-18, -16]], e: [[-6, -4]] }, LEGNO),
  ...recinto('scala', { e: TUTTO, w: TUTTO }, TEMPIO),
  ...recinto('laboratorio', { e: [[-12, -8]], s: [[-48, -44]] }, TEMPIO),
  verticale(-48.2, -22, -15, SPONDA_SCALA), verticale(-43.8, -22, -15, SPONDA_SCALA),
  ...recinto('distilleria', { n: [[36.5, 39.5]], e: [[-12, -9]], w: [[-14, -12]], s: [[36, 38]] }, LEGNO),
  orizzontale(-54, -52, -42, { tipo: 'capanna' }), orizzontale(-46, -52, -49, { tipo: 'capanna' }), orizzontale(-46, -45, -42, { tipo: 'capanna' }),
  verticale(-52, -54, -46, { tipo: 'capanna' }), verticale(-42, -54, -46, { tipo: 'capanna' }),
  ...recinto('sala', {}, LEGNO),
  ...recinto('tana', {}, GROTTA),
]);

export const RECINZIONI = Object.freeze([
  ...recinto('imbarcadero', { s: [[-2, 2]], w: [[54, 58]], e: [[54, 58]] }, PARAPETTO),
  ...recinto('passerella', { n: TUTTO, s: TUTTO }, PARAPETTO),
  ...recinto('pontileOvest', { w: TUTTO, e: TUTTO }, PARAPETTO),
  ...recinto('cimitero', { e: [[54, 58]] }, RIVA),
  ...recinto('pontileEst', { w: TUTTO, e: TUTTO }, PARAPETTO),
  ...recinto('cortile', { w: [[54, 58]], s: TUTTO }, RIVA),
  ...recinto('passerellaBaracche', { n: TUTTO, s: TUTTO }, PARAPETTO),
  ...recinto('piazzale', { n: [[-2, 2]], s: TUTTO, e: [[8, 12]] }, RIVA),
  ...recinto('pontePiazzale', { w: TUTTO, e: TUTTO }, PARAPETTO),
  ...recinto('aia', { w: [[8, 12]], n: [[42, 46]], s: TUTTO }, RIVA),
  ...recinto('torre', { n: [[57, 61]], w: TUTTO, s: [[56, 60]] }, RIVA, { n: STACCIONATA }),
  ...recinto('guado', { n: TUTTO, s: TUTTO }, PARAPETTO),
  ...recinto('rapide', { n: [[56, 60]], w: [[-52, -48]] }, RIVA),
  ...recinto('passerellaNord', { n: TUTTO, s: TUTTO }, PARAPETTO),
  ...recinto('cuore', { n: [[-2, 2]], w: [[-52, -48]], e: [[-52, -48]] }, RIVA),
  ...recinto('ponteMangrovie', { w: TUTTO, e: TUTTO }, PARAPETTO),
  ...recinto('ponteRapide', { w: TUTTO, e: TUTTO }, PARAPETTO),
  ...recinto('passerellaSciamano', { n: TUTTO, s: TUTTO }, PARAPETTO),
  ...recinto('isola', { n: [[-48, -44]], e: [[-52, -48]] }, RIVA),
]);

const ostacolo = (tipo, x, z, l, p, altezza = 1.2, extra = {}) => Object.freeze({ x0: x - l / 2, z0: z - p / 2, x1: x + l / 2, z1: z + p / 2, altezza, tipo, ...extra });
const cipresso = (x, z) => ostacolo('cipresso', x, z, 0.9, 0.9, 9);

const LAPIDI = Object.freeze([
  [-64, 58], [-61, 58], [-58, 58], [-64, 54], [-61, 54], [-58, 54], [-38, 46], [-35, 46], [-38, 42], [-35, 42], [-44, 31], [-41, 31],
]);

const OSTACOLI_FISSI = Object.freeze([
  ostacolo('casse', -9, 52, 1.6, 1.2, 1.1),
  ostacolo('bitta', -11.2, 60, 0.4, 0.4, 0.6),
  ostacolo('bitta', 11.2, 50, 0.4, 0.4, 0.6),
  ostacolo('relitto', -60, 44, 6, 2.2, 1.6),
  ostacolo('relitto', -44, 58, 2.2, 6, 1.6),
  ostacolo('relitto', -36, 36, 6, 2.2, 1.6),
  ostacolo('relitto', -56, 31, 2.2, 5, 1.4),
  ostacolo('mausoleo', -50, 46, 4, 4, 3.4),
  ...LAPIDI.map(([x, z]) => ostacolo('lapide', x, z, 0.8, 0.3, 1)),
  cipresso(-66, 62), cipresso(-33, 62), cipresso(-66, 30), cipresso(-31, 50), cipresso(-47, 37),
  ostacolo('legnaia', 60, 45, 4, 1.2, 1.6),
  ostacolo('pozzo', 48, 56, 1.6, 1.6, 1),
  ostacolo('tavolo', 36, 48, 1.6, 0.8, 0.85),
  ostacolo('relitto', 56, 61, 5, 2, 1.2),
  cipresso(31, 63), cipresso(67, 43), cipresso(40, 63),
  ostacolo('branda', 31, 28, 2, 0.9, 0.6), ostacolo('branda', 31, 38.6, 2, 0.9, 0.6), ostacolo('branda', 37, 38.6, 2, 0.9, 0.6),
  ostacolo('branda', 62, 28, 2, 0.9, 0.6), ostacolo('branda', 66, 28, 2, 0.9, 0.6), ostacolo('branda', 62, 38.6, 2, 0.9, 0.6),
  ostacolo('tavolo', 48, 32, 1.6, 0.8, 0.85),
  ostacolo('stufa', 53, 38.6, 0.8, 0.8, 1.2),
  ostacolo('tronchi', -11, 8, 5, 1.6, 1.4),
  ostacolo('tronchi', 8, 6, 5, 1.6, 1.4),
  ostacolo('carro', 14, 14, 2.6, 1.4, 1.5),
  ostacolo('sega', -10, -8, 4.5, 1.4, 1),
  ostacolo('sega', 8, -8, 4.5, 1.4, 1),
  ostacolo('cataste', -12, -16, 3, 1.4, 1.3),
  ostacolo('cataste', 12, -16, 3, 1.4, 1.3),
  ostacolo('cataste', 14, -2, 3, 1.4, 1.3),
  ostacolo('motore', -6, -20.1, 2.4, 1.4, 1.6),
  ostacolo('pilastro', -5, -3.5, 0.5, 0.5, ALTEZZA_SOFFITTO), ostacolo('pilastro', 5, -3.5, 0.5, 0.5, ALTEZZA_SOFFITTO),
  ostacolo('pilastro', -5, -13, 0.5, 0.5, ALTEZZA_SOFFITTO), ostacolo('pilastro', 5, -13, 0.5, 0.5, ALTEZZA_SOFFITTO),
  ...[-15, -8, -1, 6].flatMap(z => [-55, -37].map(x => ostacolo('colonna', x, z, 1.3, 1.3, TETTO_TEMPIO - FONDO_TEMPIO, { base: FONDO_TEMPIO }))),
  ostacolo('altare', -46, -4, 2.4, 2.4, 1, { base: FONDO_TEMPIO }),
  ...[[-51, -9], [-41, -9], [-51, 1], [-41, 1]].map(([x, z]) => ostacolo('braciereTempio', x, z, 0.8, 0.8, 1.1, { base: FONDO_TEMPIO })),
  ...ELEMENTI_RELIQUIE.map((elemento, i) => ostacolo('statua', [-58, -50.5, -41.5, -34][i], 12.6, 3.2, 2.4, 7.6, { base: FONDO_TEMPIO, elemento })),
  ...ELEMENTI_RELIQUIE.map((elemento, i) => ostacolo('piedistalloReliquia', [-58, -50.5, -41.5, -34][i], 8.6, 1, 1, 1.2, { base: FONDO_TEMPIO, elemento })),
  ostacolo('ghiacciaia', 30.8, -19.6, 0.9, 0.7, 1.2),
  ostacolo('botte', 32, 7, 1, 1, 1.2), ostacolo('botte', 33.2, 7, 1, 1, 1.2), ostacolo('botte', 64, 15.6, 1, 1, 1.2),
  ostacolo('carro', 52, 10, 2.6, 1.4, 1.5),
  cipresso(68.5, 5.5),
  ostacolo('alambicco', 34, -10, 2, 2, 2.6),
  ostacolo('alambicco', 42, -16, 2, 2, 2.6),
  ostacolo('botte', 31, 1.4, 1, 1, 1.2), ostacolo('botte', 32.2, 1.4, 1, 1, 1.2), ostacolo('botte', 46.6, -3, 1, 1, 1.2),
  ostacolo('bancone', 40, -2, 3, 1, 1),
  ostacolo('traliccio', 60, -10, 3, 3, 14),
  ostacolo('capanno', 52, -18, 4, 3, 2.6),
  ostacolo('alberoMorto', 0, -50, 4, 4, 14),
  ostacolo('roccia', -12, -42, 2.4, 2, 1.6), ostacolo('roccia', 12, -58, 2.4, 2, 1.6), ostacolo('roccia', -8, -63, 2, 1.6, 1.4), ostacolo('roccia', 10, -40, 2, 1.6, 1.4),
  cipresso(-17, -45), cipresso(17, -63),
  ostacolo('paloTeschio', -56, -40, 0.3, 0.3, 2.2), ostacolo('paloTeschio', -38, -40, 0.3, 0.3, 2.2),
  ostacolo('paloTeschio', -56, -58, 0.3, 0.3, 2.2), ostacolo('paloTeschio', -38, -58, 0.3, 0.3, 2.2),
  cipresso(-62, -34), cipresso(-32, -62), cipresso(-62, -62), cipresso(-34, -34),
  ostacolo('canale', 39, -45, 22, 2, 0.3), ostacolo('canale', 62, -45, 16, 2, 0.3),
  ostacolo('canale', 33, -59, 10, 2, 0.3), ostacolo('canale', 56, -59, 28, 2, 0.3),
  ostacolo('roccia', 34, -37, 2, 1.6, 1.4), ostacolo('roccia', 64, -52, 2.2, 1.8, 1.5),
  ostacolo('braciere', 40, 12, 0.8, 0.8, 1), ostacolo('braciere', -2, 9, 0.8, 0.8, 1), ostacolo('braciere', 52, 50, 0.8, 0.8, 1),
  ostacolo('ghiacciaia', 52, 27.2, 0.9, 0.7, 1.2), ostacolo('ghiacciaia', -16, -20.6, 0.9, 0.7, 1.2),
  ostacolo('totem', -47, -41, 1.2, 1.2, 3.6, { totem: 'capanna' }),
  ostacolo('piedistallo', -50, -53.3, 0.6, 0.6, 1),
  ostacolo('bombola', -61, -47, 1, 1, 1.6, { indice: 0 }),
  ostacolo('bombola', -40, -62, 1, 1, 1.6, { indice: 1 }),
  ostacolo('bombola', -33, -49, 1, 1, 1.6, { indice: 2 }),
  ostacolo('totem', -65, 49, 1.2, 1.2, 3.6, { totem: 'cimitero' }),
  ostacolo('purificatore', -60.5, 49.6, 1.4, 1.4, 1.6),
  ostacolo('totem', 48, -52, 1.2, 1.2, 3.6, { totem: 'rapide' }),
  ostacolo('generatoreRapide', 34, -54.6, 2, 1.2, 1.5),
  ostacolo('valvola', 40, -35.2, 0.5, 0.5, 1.2, { indice: 0 }),
  ostacolo('valvola', 58, -55.8, 0.5, 0.5, 1.2, { indice: 1 }),
  ostacolo('valvola', 52, -66.8, 0.5, 0.5, 1.2, { indice: 2 }),
  ostacolo('pareteGrotta', -20, -142, 8, 8, 12), ostacolo('pareteGrotta', 20, -142, 8, 8, 12),
  ostacolo('pareteGrotta', -20, -102, 8, 8, 12), ostacolo('pareteGrotta', 20, -102, 8, 8, 12),
]);

function finestra(id, zonaId, asse, posizione, da, a, versoFuori) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const verso = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  const sposta = d => Object.freeze({ x: centro.x + verso.x * d, z: centro.z + verso.z * d });
  return Object.freeze({
    id, zona: zonaId, asse, centro: Object.freeze(centro), scatola: asse === 'z' ? orizzontale(posizione, da, a) : verticale(posizione, da, a),
    esterno: sposta(1.1), interno: sposta(-1.1), comparsa: sposta(4), fuori: Object.freeze(verso), recinzione: false,
  });
}

function tana(id, zonaId, x, z, acqua = true) {
  const punto = Object.freeze({ x, z });
  return Object.freeze({ id, zona: zonaId, tana: true, acqua, asse: 'z', centro: punto, scatola: null, esterno: punto, interno: punto, comparsa: punto, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false });
}

export const FINESTRE = Object.freeze([
  finestra('f-baracche-1', 'baracche', 'z', 26, 32, 34, -1), finestra('f-baracche-2', 'baracche', 'z', 26, 58, 60, -1),
  finestra('f-baracche-3', 'baracche', 'x', 70, 32, 34, 1), finestra('f-baracche-4', 'baracche', 'x', 28, 32, 34, -1),
  finestra('f-segheria-1', 'segheria', 'x', 20, -6, -4, 1), finestra('f-segheria-2', 'segheria', 'z', -22, -14, -12, -1),
  finestra('f-segheria-3', 'segheria', 'z', -22, 12, 14, -1), finestra('f-segheria-4', 'segheria', 'x', -20, -18, -16, -1),
  tana('t-tempio-1', 'laboratorio', -62, -19.5, false), tana('t-tempio-2', 'laboratorio', -62, -1, false),
  tana('t-tempio-3', 'laboratorio', -30, 3.5, false), tana('t-tempio-4', 'laboratorio', -38, -20, false),
  finestra('f-distilleria-1', 'distilleria', 'x', 28, -14, -12, -1), finestra('f-distilleria-2', 'distilleria', 'z', -22, 36, 38, -1),
  tana('t-imbarcadero-1', 'imbarcadero', -7.5, 64.5), tana('t-imbarcadero-2', 'imbarcadero', 10, 64), tana('t-imbarcadero-3', 'imbarcadero', -10, 50),
  tana('t-passerella', 'passerella', 0, 33),
  tana('t-cimitero-1', 'cimitero', -67.5, 36), tana('t-cimitero-2', 'cimitero', -67.5, 50), tana('t-cimitero-3', 'cimitero', -54, 63.5),
  tana('t-cimitero-4', 'cimitero', -48, 28.5), tana('t-cimitero-5', 'cimitero', -30.5, 32),
  tana('t-cortile-1', 'cortile', 45, 63.5), tana('t-cortile-2', 'cortile', 67.5, 52), tana('t-cortile-3', 'cortile', 30.5, 44), tana('t-cortile-4', 'cortile', 61, 63.5),
  tana('t-piazzale-1', 'piazzale', -14, 15.5), tana('t-piazzale-2', 'piazzale', 7, 15.5), tana('t-piazzale-3', 'piazzale', -17.5, 4.5),
  tana('t-aia-1', 'aia', 35, 15.5), tana('t-aia-2', 'aia', 67.5, 11), tana('t-aia-3', 'aia', 59, 15.5),
  tana('t-torre-1', 'torre', 67.5, -6), tana('t-torre-2', 'torre', 65, -19.5),
  tana('t-cuore-1', 'cuore', -9, -67.5), tana('t-cuore-2', 'cuore', 6, -67.5), tana('t-cuore-3', 'cuore', -17.5, -61), tana('t-cuore-4', 'cuore', 17.5, -40), tana('t-cuore-5', 'cuore', -11, -32.5),
  tana('t-isola-1', 'isola', -63.5, -49), tana('t-isola-2', 'isola', -47, -63.5), tana('t-isola-3', 'isola', -59, -32.5), tana('t-isola-4', 'isola', -30.5, -39),
  tana('t-rapide-1', 'rapide', 41, -67.5), tana('t-rapide-2', 'rapide', 67.5, -55), tana('t-rapide-3', 'rapide', 37, -32.5), tana('t-rapide-4', 'rapide', 59, -67.5),
  tana('t-tana-1', 'tana', -21.5, -114), tana('t-tana-2', 'tana', 21.5, -114), tana('t-tana-3', 'tana', -21.5, -130), tana('t-tana-4', 'tana', 21.5, -130),
  tana('t-tana-5', 'tana', -9, -144), tana('t-tana-6', 'tana', 9, -144), tana('t-tana-7', 'tana', -12, -100), tana('t-tana-8', 'tana', 12, -100),
]);

function porta(id, nome, costo, zone, scatola, tipo, { chiusa = false } = {}) {
  return Object.freeze({
    id, nome, costo, chiusa, tipo, zone: Object.freeze(zone), scatola,
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }),
  });
}

export const PORTE = Object.freeze([
  porta('pCanneto', 'Cancello della passerella', 750, ['imbarcadero', 'passerella', 'piazzale'], orizzontale(48, -2, 2), 'macerie'),
  porta('pRelitti', 'Pontile dei relitti', 1000, ['imbarcadero', 'pontileOvest', 'cimitero'], verticale(-12, 54, 58), 'macerie'),
  porta('pBaraccheEst', 'Pontile delle baracche', 1000, ['imbarcadero', 'pontileEst', 'cortile'], verticale(12, 54, 58), 'macerie'),
  porta('pBaracche', 'Porta delle baracche', 1250, ['cortile', 'baracche'], orizzontale(40, 47.5, 50.5), 'porta'),
  porta('pUscitaBaracche', 'Uscita nord delle baracche', 1000, ['baracche', 'passerellaBaracche', 'aia'], orizzontale(26, 42, 46), 'porta'),
  porta('pSegheria', 'Portone della segheria', 1500, ['piazzale', 'segheria'], orizzontale(2, -2, 2), 'portone'),
  porta('pDistilleriaPonte', 'Ponte della distilleria', 1250, ['piazzale', 'pontePiazzale', 'aia'], verticale(20, 8, 12), 'macerie'),
  porta('pDistilleria', 'Porta della distilleria', 1000, ['aia', 'distilleria'], orizzontale(4, 36.5, 39.5), 'porta'),
  porta('pTorre', 'Recinto della torre radio', 1500, ['aia', 'torre'], orizzontale(4, 57, 61), 'cancello'),
  porta('pRetro', 'Retro della distilleria', 1000, ['distilleria', 'torre'], verticale(48, -12, -9), 'porta'),
  porta('pGuado', 'Guado delle rapide', 1250, ['torre', 'guado', 'rapide'], orizzontale(-22, 56, 60), 'macerie'),
  porta('pNord', 'Uscita nord della segheria', 1500, ['segheria', 'passerellaNord', 'cuore'], orizzontale(-22, -2, 2), 'portone'),
  porta('pLaboratorio', 'Grata del laboratorio', 0, ['segheria', 'scala', 'laboratorio'], verticale(-20, -12, -8), 'grata', { chiusa: true }),
  porta('pMangrovie', 'Ponte delle mangrovie', 1250, ['cuore', 'ponteMangrovie', 'isola'], verticale(-20, -52, -48), 'macerie'),
  porta('pRapide', 'Ponte delle rapide', 1250, ['cuore', 'ponteRapide', 'rapide'], verticale(20, -52, -48), 'macerie'),
  porta('pRadici', 'Radici corrotte', 0, ['laboratorio', 'passerellaSciamano', 'isola'], orizzontale(-22, -48, -44), 'radici', { chiusa: true }),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni: costo / 2 });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });
const munizioni = (n, zonaId, x, z, verso) => acquisto(`munizioni-${n}`, 'munizioni', zonaId, x, z, verso);
const prova = (elemento, indice, zonaId, x, z, verso) => acquisto(`prova-${elemento}-${indice}`, 'oggettoElemento', zonaId, x, z, verso, { elemento, indice });
const totem = (nome, zonaId, x, z, verso) => acquisto(`totem-${nome}`, 'totem', zonaId, x, z, verso, { totem: nome });
const indicato = (tipo, indice, zonaId, x, z, verso) => acquisto(`${tipo}-${indice}`, tipo, zonaId, x, z, verso, { indice });

export const ACQUISTI = Object.freeze([
  muro('pompa', 800, 'imbarcadero', 11.6, 62, [-1, 0]),
  muro('raffica', 900, 'passerella', -1.6, 40, [1, 0]),
  muro('doppietta', 1000, 'cimitero', -69.6, 45, [1, 0]),
  muro('caccia', 1000, 'cimitero', -40, 65.6, [0, -1]),
  muro('aquila', 1100, 'aia', 52, 17.6, [0, -1]),
  muro('magnum', 1100, 'isola', -65.6, -40, [1, 0]),
  muro('vettore', 1300, 'piazzale', -12, 2.4, [0, 1]),
  muro('assalto', 1500, 'baracche', 69.6, 37, [-1, 0]),
  muro('bullpup', 1500, 'distilleria', 28.4, -4, [1, 0]),
  muro('carabina', 1600, 'cortile', 36, 40.4, [0, 1]),
  muro('battaglia', 1700, 'segheria', 19.6, -14, [-1, 0]),
  muro('precisione', 1750, 'torre', 69.6, 0, [-1, 0]),
  muro('dsv', 1800, 'laboratorio', -63.6, -14, [1, 0]),
  muro('tiratore', 1900, 'rapide', 46, -30.4, [0, -1]),
  muro('mitragliatrice', 2500, 'cuore', 0, -69.6, [0, 1]),
  bibita('ritorno', 'imbarcadero', -10.8, 63, [1, 0]),
  bibita('lampo', 'baracche', 29, 35.5, [1, 0]),
  bibita('ferro', 'segheria', -19, -3, [1, 0]),
  bibita('raffica', 'distilleria', 44, -20.8, [0, 1]),
  bibita('scatto', 'cimitero', -60, 27.2, [0, 1]),
  bibita('tasca', 'laboratorio', -63, 10, [1, 0]),
  bibita('vedova', 'isola', -65.6, -56, [1, 0]),
  acquisto('cassa', 'cassa', 'piazzale', -6, 15.4, [0, -1]),
  acquisto('motoreSegheria', 'motoreSegheria', 'segheria', -6, -18.9, [0, 1]),
  acquisto('potenziatore', 'potenziatore', 'torre', 66, -16, [-1, 0]),
  acquisto('altareTeschio', 'altareTeschio', 'laboratorio', -46, -5.4, [0, -1]),
  ...ELEMENTI_RELIQUIE.map((elemento, i) => acquisto(`reliquia-${elemento}`, 'reliquia', 'laboratorio', [-58, -50.5, -41.5, -34][i], 8, [0, -1], { elemento })),
  acquisto('difesa-ghiaccio', 'difesaReliquia', 'rapide', 62, -37, [0, 1], { elemento: 'ghiaccio' }),
  acquisto('difesa-fuoco', 'difesaReliquia', 'distilleria', 38, -12, [0, 1], { elemento: 'fuoco' }),
  acquisto('difesa-vuoto', 'difesaReliquia', 'cuore', -12, -64, [0, 1], { elemento: 'vuoto' }),
  acquisto('difesa-vento', 'difesaReliquia', 'torre', 56, -4, [0, 1], { elemento: 'vento' }),
  acquisto('radiciSciamano', 'radici', 'laboratorio', -46, -21.2, [0, 1]),
  prova('fuoco', 0, 'aia', 40, 12.9, [0, 1]), prova('fuoco', 1, 'piazzale', -2, 9.9, [0, 1]), prova('fuoco', 2, 'cortile', 52, 50.9, [0, 1]),
  prova('ghiaccio', 0, 'distilleria', 30.8, -18.7, [0, 1]), prova('ghiaccio', 1, 'baracche', 52, 28.2, [0, 1]), prova('ghiaccio', 2, 'segheria', -16, -19.6, [0, 1]),
  prova('vuoto', 0, 'cimitero', -61, 58.6, [0, 1]), prova('vuoto', 1, 'cimitero', -38, 42.6, [0, 1]), prova('vuoto', 2, 'cimitero', -44, 31.6, [0, 1]),
  prova('vento', 0, 'passerella', 1.5, 25, [-1, 0]), prova('vento', 1, 'pontileEst', 20, 57.5, [0, -1]), prova('vento', 2, 'guado', 59.5, -26, [-1, 0]),
  munizioni(1, 'cimitero', -30.6, 44, [-1, 0]),
  munizioni(2, 'piazzale', 16, 3, [0, 1]),
  munizioni(3, 'aia', 66.8, 7, [-1, 0]),
  munizioni(4, 'cuore', 16.8, -34, [-1, 0]),
  munizioni(5, 'isola', -30.8, -58, [-1, 0]),
  munizioni(6, 'rapide', 66.8, -40, [-1, 0]),
  munizioni(7, 'laboratorio', -29.2, -18, [-1, 0]),
  totem('capanna', 'isola', -47, -40, [0, 1]),
  totem('cimitero', 'cimitero', -65, 50.1, [0, 1]),
  totem('rapide', 'rapide', 48, -51, [0, 1]),
  acquisto('amuleto', 'amuleto', 'isola', -50, -52.6, [0, 1]),
  indicato('bombola', 0, 'isola', -61, -46.1, [0, 1]), indicato('bombola', 1, 'isola', -40, -61.1, [0, 1]), indicato('bombola', 2, 'isola', -33, -48.1, [0, 1]),
  acquisto('purificatore', 'purificatore', 'cimitero', -60.5, 48.5, [0, -1]),
  acquisto('generatoreRapide', 'generatoreRapide', 'rapide', 34, -53.6, [0, 1]),
  indicato('valvola', 0, 'rapide', 40, -35.9, [0, -1]), indicato('valvola', 1, 'rapide', 58, -55.1, [0, 1]), indicato('valvola', 2, 'rapide', 52, -66.1, [0, 1]),
  acquisto('varco', 'varco', 'cuore', 0, -47.4, [0, 1]),
]);

export const MURALI = Object.freeze(new Set(['arma', 'motoreSegheria', 'altareTeschio', 'radici', 'reliquia', 'difesaReliquia', 'oggettoElemento', 'totem', 'amuleto', 'bombola', 'purificatore', 'generatoreRapide', 'valvola', 'varco']));

export const COLLINE = Object.freeze(new Set(['cimitero', 'cortile', 'piazzale', 'aia', 'torre', 'rapide', 'cuore', 'isola']));
const PASSO_ALBERI = 7.5;
const LIBERO_DA_ALBERI = Object.freeze({ ostacolo: 3.2, acquisto: 4.5, finestra: 4, porta: 6.5, partenza: 6, bordo: 2.6 });

function alberiSparsi() {
  const alberi = [];
  const scatola = (o, x, z) => Math.hypot(Math.max(o.x0 - x, 0, x - o.x1), Math.max(o.z0 - z, 0, z - o.z1));
  const libero = (x, z) => OSTACOLI_FISSI.every(o => scatola(o, x, z) >= (o.tipo === 'alberoMorto' ? 11 : LIBERO_DA_ALBERI.ostacolo))
    && ACQUISTI.every(a => Math.hypot(a.posizione.x - x, a.posizione.z - z) >= LIBERO_DA_ALBERI.acquisto)
    && FINESTRE.every(f => [f.interno, f.comparsa].every(p => Math.hypot(p.x - x, p.z - z) >= LIBERO_DA_ALBERI.finestra))
    && PORTE.every(p => Math.hypot(p.centro.x - x, p.centro.z - z) >= LIBERO_DA_ALBERI.porta)
    && PARTENZE.every(p => Math.hypot(p.x - x, p.z - z) >= LIBERO_DA_ALBERI.partenza)
    && alberi.every(a => Math.hypot((a.x0 + a.x1) / 2 - x, (a.z0 + a.z1) / 2 - z) >= PASSO_ALBERI * 0.8);
  let seme = 0;
  for (const zona of ZONE.filter(q => COLLINE.has(q.id))) {
    for (let x = zona.x0 + LIBERO_DA_ALBERI.bordo + 1; x < zona.x1 - LIBERO_DA_ALBERI.bordo; x += PASSO_ALBERI) {
      for (let z = zona.z0 + LIBERO_DA_ALBERI.bordo + 1; z < zona.z1 - LIBERO_DA_ALBERI.bordo; z += PASSO_ALBERI) {
        seme += 1;
        const caso = Math.abs(Math.sin(seme * 12.9898) * 43758.5453) % 1;
        const caso2 = Math.abs(Math.sin(seme * 78.233) * 12543.123) % 1;
        const px = Math.min(zona.x1 - LIBERO_DA_ALBERI.bordo, x + (caso - 0.5) * PASSO_ALBERI * 0.7);
        const pz = Math.min(zona.z1 - LIBERO_DA_ALBERI.bordo, z + (caso2 - 0.5) * PASSO_ALBERI * 0.7);
        if (caso * caso2 > 0.42 || !libero(px, pz)) continue;
        alberi.push(caso2 < 0.45 ? ostacolo('quercia', px, pz, 1.1, 1.1, 10) : cipresso(px, pz));
      }
    }
  }
  return alberi;
}

export const PARTENZE = Object.freeze([[-1.5, 58], [1.5, 58], [-1.5, 60.2], [1.5, 60.2]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[-117, -1.2], [-117, 1.2], [-118.4, -1.2], [-118.4, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: -100.2, z: 0, verso: punto(-1, 0) });
export const OSTACOLI = Object.freeze([...OSTACOLI_FISSI, ...alberiSparsi()]);
export const FRAMMENTI = Object.freeze([]);
export const ARREDI = Object.freeze([]);

const centroDi = o => punto((o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2);
const ARENA = punto(0, -122);
const PURIFICATORE = centroDi(OSTACOLI.find(o => o.tipo === 'purificatore'));
const cerchio = (x, z, raggio) => Object.freeze({ x, z, raggio });
const ISOLE = Object.freeze([
  cerchio(0, -122, 5.5), cerchio(-13, -112, 3.6), cerchio(13, -112, 3.6), cerchio(-13, -132, 3.6), cerchio(13, -132, 3.6), cerchio(0, -104, 4), cerchio(0, -140, 3.6),
]);
const BOZZOLI = Object.freeze([punto(-17, -110), punto(17, -110), punto(17, -134), punto(-17, -134)]);

export const MISSIONE = Object.freeze({
  TOTEM: Object.freeze(Object.fromEntries(OSTACOLI.filter(o => o.tipo === 'totem').map(o => [o.totem, centroDi(o)]))),
  MIASMA: Object.freeze({ x: -47, z: -44, raggio: 8 }),
  BOMBOLE: Object.freeze(OSTACOLI.filter(o => o.tipo === 'bombola').sort((a, b) => a.indice - b.indice).map(centroDi)),
  PIEDISTALLO: centroDi(OSTACOLI.find(o => o.tipo === 'piedistallo')),
  PURIFICATORE,
  TOMBE: Object.freeze(OSTACOLI.filter(o => o.tipo === 'lapide').map(centroDi).filter(c => Math.hypot(c.x - PURIFICATORE.x, c.z - PURIFICATORE.z) <= 14).map(c => punto(c.x, c.z - 1))),
  GENERATORE_RAPIDE: centroDi(OSTACOLI.find(o => o.tipo === 'generatoreRapide')),
  VALVOLE: Object.freeze(OSTACOLI.filter(o => o.tipo === 'valvola').sort((a, b) => a.indice - b.indice).map(centroDi)),
  TANE_RAPIDE: Object.freeze(FINESTRE.filter(f => f.zona === 'rapide').map(f => f.id)),
  BARRIERA: Object.freeze({ x: 0, z: -50, raggio: 7 }),
  ARENA,
  PARTENZE_RITORNO: Object.freeze([[-2, -40], [2, -40], [-2, -37], [2, -37]].map(([x, z]) => punto(x, z))),
  PARTENZE_TANA: Object.freeze([[-1.5, -101.5], [1.5, -101.5], [-1.5, -103.5], [1.5, -103.5]].map(([x, z]) => punto(x, z))),
  TANE_ARENA: Object.freeze(FINESTRE.filter(f => f.zona === 'tana').map(f => f.id)),
  BOZZOLI,
  GIRO: Object.freeze(BOZZOLI.map(b => punto(ARENA.x + (b.x - ARENA.x) * 0.85, ARENA.z + (b.z - ARENA.z) * 0.85))),
  PARETI: Object.freeze([[-21, -118], [21, -118], [21, -128], [-21, -128], [-8, -143], [8, -143], [-8, -101], [8, -101]].map(([x, z]) => punto(x, z))),
  ISOLE,
  PONTI: Object.freeze([[0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [6, 3], [6, 4]].map(([a, b]) => Object.freeze({ da: ISOLE[a], a: ISOLE[b], largo: 1 }))),
  POZZE_ACIDO: Object.freeze([cerchio(-19.5, -122, 2.4), cerchio(19.5, -122, 2.4)]),
});

const PASSO_QUOTA = 0.5;
const MARGINE_QUOTA = 14;
const ACQUA_BASSA = -0.12;
const FONDO_PALUDE = -0.9;
const COLLINA_MASSIMA = 2.8;
const SPIANA_DA = 1.4;
const SPIANA_A = 4.6;
const RIVA_LARGA = 5;
const SCALA_TEMPIO = Object.freeze({ x0: -48, x1: -44, z0: -22, z1: -15 });

const hash = (i, j, s) => {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(s, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
const morbido = v => v * v * (3 - 2 * v);
const gradino = (a, b, v) => morbido(Math.min(1, Math.max(0, (v - a) / (b - a))));
function valore(x, z, s) {
  const i = Math.floor(x);
  const j = Math.floor(z);
  const fx = morbido(x - i);
  const fz = morbido(z - j);
  const a = hash(i, j, s);
  const b = hash(i + 1, j, s);
  const c = hash(i, j + 1, s);
  const d = hash(i + 1, j + 1, s);
  return a + (b - a) * fx + (c - a) * fz + (a - b - c + d) * fx * fz;
}
export const rumorePalude = (x, z, s = 1) => valore(x / 19, z / 19, s) * 0.68 + valore(x / 7.5, z / 7.5, s + 7) * 0.32;

function distanza(maschera, colonne, righe) {
  const d = new Float32Array(maschera.length);
  for (let i = 0; i < d.length; i++) d[i] = maschera[i] ? 0 : 1e9;
  const D = Math.SQRT2;
  for (let r = 0; r < righe; r++) {
    for (let c = 0; c < colonne; c++) {
      const i = r * colonne + c;
      if (c > 0) d[i] = Math.min(d[i], d[i - 1] + 1);
      if (r > 0) {
        d[i] = Math.min(d[i], d[i - colonne] + 1);
        if (c > 0) d[i] = Math.min(d[i], d[i - colonne - 1] + D);
        if (c < colonne - 1) d[i] = Math.min(d[i], d[i - colonne + 1] + D);
      }
    }
  }
  for (let r = righe - 1; r >= 0; r--) {
    for (let c = colonne - 1; c >= 0; c--) {
      const i = r * colonne + c;
      if (c < colonne - 1) d[i] = Math.min(d[i], d[i + 1] + 1);
      if (r < righe - 1) {
        d[i] = Math.min(d[i], d[i + colonne] + 1);
        if (c < colonne - 1) d[i] = Math.min(d[i], d[i + colonne + 1] + D);
        if (c > 0) d[i] = Math.min(d[i], d[i + colonne - 1] + D);
      }
    }
  }
  for (let i = 0; i < d.length; i++) d[i] *= PASSO_QUOTA;
  return d;
}

function costruisciQuote() {
  const x0 = LIMITI.x0 - MARGINE_QUOTA;
  const z0 = LIMITI.z0 - MARGINE_QUOTA;
  const colonne = Math.ceil((LIMITI.x1 + MARGINE_QUOTA - x0) / PASSO_QUOTA) + 1;
  const righe = Math.ceil((LIMITI.z1 + MARGINE_QUOTA - z0) / PASSO_QUOTA) + 1;
  const zone = ZONE.filter(q => q.id !== 'tana' && q.id !== 'sala');
  const zonaCella = new Int16Array(colonne * righe).fill(-1);
  const calpestabile = new Uint8Array(colonne * righe);
  const punti = new Uint8Array(colonne * righe);
  const segna = (bx0, bz0, bx1, bz1) => {
    const c0 = Math.max(0, Math.floor((bx0 - x0) / PASSO_QUOTA));
    const c1 = Math.min(colonne - 1, Math.ceil((bx1 - x0) / PASSO_QUOTA));
    const r0 = Math.max(0, Math.floor((bz0 - z0) / PASSO_QUOTA));
    const r1 = Math.min(righe - 1, Math.ceil((bz1 - z0) / PASSO_QUOTA));
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) punti[r * colonne + c] = 1;
  };
  for (let r = 0; r < righe; r++) {
    for (let c = 0; c < colonne; c++) {
      const x = x0 + c * PASSO_QUOTA;
      const z = z0 + r * PASSO_QUOTA;
      const k = zone.findIndex(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1);
      zonaCella[r * colonne + c] = k;
      calpestabile[r * colonne + c] = k >= 0 ? 1 : 0;
    }
  }
  for (const o of OSTACOLI) if (o.base === undefined && o.tipo !== 'cipresso' && o.tipo !== 'quercia') segna(o.x0, o.z0, o.x1, o.z1);
  for (const p of PORTE) segna(p.scatola.x0 - 1, p.scatola.z0 - 1, p.scatola.x1 + 1, p.scatola.z1 + 1);
  for (const q of ZONE) if (q.passerella || (q.id !== 'tana' && !COLLINE.has(q.id) && q.aperto)) segna(q.x0, q.z0, q.x1, q.z1);
  for (const q of ZONE) if (INTERNE.has(q.id) && !q.tempio) segna(q.x0, q.z0, q.x1, q.z1);
  const vicino = (p, r) => segna(p.x - r, p.z - r, p.x + r, p.z + r);
  for (const a of ACQUISTI) vicino(a.posizione, 0.6);
  for (const f of FINESTRE) [f.interno, f.esterno, f.comparsa].forEach(p => vicino(p, 0.5));
  [...PARTENZE, ...Object.values(MISSIONE.TOTEM), ...MISSIONE.BOMBOLE, ...MISSIONE.VALVOLE, MISSIONE.PIEDISTALLO, MISSIONE.PURIFICATORE, MISSIONE.GENERATORE_RAPIDE, ...MISSIONE.TOMBE].forEach(p => vicino(p, 0.8));
  vicino(MISSIONE.BARRIERA, MISSIONE.BARRIERA.raggio);
  const dentro = distanza(calpestabile.map(v => 1 - v), colonne, righe);
  const fuori = distanza(calpestabile, colonne, righe);
  const spiana = distanza(punti, colonne, righe);
  const quote = new Float32Array(colonne * righe);
  for (let r = 0; r < righe; r++) {
    for (let c = 0; c < colonne; c++) {
      const i = r * colonne + c;
      const x = x0 + c * PASSO_QUOTA;
      const z = z0 + r * PASSO_QUOTA;
      const piano = gradino(SPIANA_DA, SPIANA_A, spiana[i]);
      const zona = zone[zonaCella[i]];
      if (zona && !COLLINE.has(zona.id)) {
        quote[i] = 0;
        continue;
      }
      if (zona) {
        const collina = COLLINA_MASSIMA * Math.max(0, (rumorePalude(x, z) - 0.26) / 0.74) ** 1.15;
        const riva = ACQUA_BASSA + (collina - ACQUA_BASSA) * gradino(0.3, RIVA_LARGA, dentro[i]);
        quote[i] = riva * piano;
        continue;
      }
      const fondo = FONDO_PALUDE + 0.95 * Math.max(0, rumorePalude(x, z, 3) - 0.45);
      const sponda = ACQUA_BASSA + (fondo - ACQUA_BASSA) * gradino(0, 4, fuori[i]);
      quote[i] = Math.max(FONDO_PALUDE, ACQUA_BASSA + (sponda - ACQUA_BASSA) * Math.max(piano, gradino(0, 2.5, fuori[i])));
    }
  }
  return { x0, z0, colonne, righe, quote, zone, zonaCella };
}

let campoQuote = null;
export const campoTerreno = () => (campoQuote ??= costruisciQuote());

function quotaTempio(zona, x, z) {
  if (zona.id === 'scala') return FONDO_TEMPIO * Math.min(1, Math.max(0, (-20 - x) / 8));
  if (x >= SCALA_TEMPIO.x0 && x <= SCALA_TEMPIO.x1 && z >= SCALA_TEMPIO.z0 && z <= SCALA_TEMPIO.z1) return FONDO_TEMPIO * ((z - SCALA_TEMPIO.z0) / (SCALA_TEMPIO.z1 - SCALA_TEMPIO.z0));
  return FONDO_TEMPIO;
}

const ALTEZZA_ISOLE = 0.35;
const BORDO_ISOLE = 0.35;

function quotaTana(x, z) {
  let h = 0;
  for (const i of MISSIONE.ISOLE) h = Math.max(h, ALTEZZA_ISOLE * Math.min(1, Math.max(0, (i.raggio + BORDO_ISOLE - Math.hypot(x - i.x, z - i.z)) / BORDO_ISOLE)));
  for (const { da, a, largo } of MISSIONE.PONTI) {
    const vx = a.x - da.x;
    const vz = a.z - da.z;
    const t = Math.max(0, Math.min(1, ((x - da.x) * vx + (z - da.z) * vz) / (vx * vx + vz * vz)));
    if (Math.hypot(x - (da.x + vx * t), z - (da.z + vz * t)) <= largo) h = Math.max(h, ALTEZZA_ISOLE * 0.85);
  }
  return h;
}

export function quota(x, z) {
  const campo = campoTerreno();
  const fc = (x - campo.x0) / PASSO_QUOTA;
  const fr = (z - campo.z0) / PASSO_QUOTA;
  const c = Math.floor(fc);
  const r = Math.floor(fr);
  if (c < 0 || r < 0 || c >= campo.colonne - 1 || r >= campo.righe - 1) return ZONE.some(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1) ? 0 : FONDO_PALUDE;
  const zona = campo.zone[campo.zonaCella[Math.round(fr) * campo.colonne + Math.round(fc)]];
  const esatta = zona && x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1 ? zona : ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1);
  if (esatta?.tempio) return quotaTempio(esatta, x, z);
  if (esatta?.grotta) return quotaTana(x, z);
  if (esatta && !COLLINE.has(esatta.id)) return 0;
  const tx = fc - c;
  const tz = fr - r;
  const q = campo.quote;
  const i = r * campo.colonne + c;
  return (q[i] * (1 - tx) + q[i + 1] * tx) * (1 - tz) + (q[i + campo.colonne] * (1 - tx) + q[i + campo.colonne + 1] * tx) * tz;
}
