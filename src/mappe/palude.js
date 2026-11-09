const SPESSORE = 0.4;
export const ALTEZZA_SOFFITTO = 3.6;
export const ALTEZZA_RECINZIONE = 2.6;
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
  zona('scala', 'Scala del laboratorio', -28, -12, -20, -8, 'cemento'),
  zona('laboratorio', 'Laboratorio sommerso', -64, -22, -28, 14, 'cemento'),
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

export const MURI = Object.freeze([
  ...recinto('baracche', { n: [[47.5, 50.5]], s: [[42, 46], [32, 34], [58, 60]], e: [[32, 34]], w: [[32, 34]] }, LEGNO),
  verticale(40, 26, 30, LEGNO), verticale(40, 33, 40, LEGNO), verticale(56, 26, 31, LEGNO), verticale(56, 34, 40, LEGNO),
  ...recinto('segheria', { n: [[-2, 2]], s: [[-2, 2], [-14, -12], [12, 14]], w: [[-12, -8], [-18, -16]], e: [[-6, -4]] }, LEGNO),
  ...recinto('scala', { e: TUTTO, w: TUTTO }, CEMENTO),
  ...recinto('laboratorio', { e: [[-12, -8], [4, 6]], s: [[-48, -44], [-58, -56]], w: [[4, 6]], n: [[-50, -48]] }, CEMENTO),
  verticale(-42, -22, -6, CEMENTO), verticale(-42, -2, 14, CEMENTO), orizzontale(-4, -64, -56, CEMENTO), orizzontale(-4, -52, -42, CEMENTO),
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

export const OSTACOLI = Object.freeze([
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
  ostacolo('altare', -53, -13, 2, 1.2, 1.1),
  ostacolo('vasca', -35, 7, 2.4, 2.4, 1.3),
  ostacolo('vasca', -35, -17, 2.4, 2.4, 1.3),
  ostacolo('bancone', -58, 9, 3, 1, 0.95),
  ostacolo('bancone', -50, 1, 3, 1, 0.95),
  ostacolo('gabbia', -31, -2, 1.6, 1.6, 2.2),
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
  ostacolo('santuario', 30.8, -19.6, 1, 1, 1.1, { elemento: 'fuoco' }),
  ostacolo('santuario', -44, 12.6, 1, 1, 1.1, { elemento: 'ghiaccio' }),
  ostacolo('santuario', -50, 49.6, 1, 1, 1.1, { elemento: 'vuoto' }),
  ostacolo('santuario', 60, -7, 1, 1, 1.1, { elemento: 'vento' }),
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

function tana(id, zonaId, x, z) {
  const punto = Object.freeze({ x, z });
  return Object.freeze({ id, zona: zonaId, tana: true, acqua: true, asse: 'z', centro: punto, scatola: null, esterno: punto, interno: punto, comparsa: punto, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false });
}

export const FINESTRE = Object.freeze([
  finestra('f-baracche-1', 'baracche', 'z', 26, 32, 34, -1), finestra('f-baracche-2', 'baracche', 'z', 26, 58, 60, -1),
  finestra('f-baracche-3', 'baracche', 'x', 70, 32, 34, 1), finestra('f-baracche-4', 'baracche', 'x', 28, 32, 34, -1),
  finestra('f-segheria-1', 'segheria', 'x', 20, -6, -4, 1), finestra('f-segheria-2', 'segheria', 'z', -22, -14, -12, -1),
  finestra('f-segheria-3', 'segheria', 'z', -22, 12, 14, -1), finestra('f-segheria-4', 'segheria', 'x', -20, -18, -16, -1),
  finestra('f-lab-1', 'laboratorio', 'x', -64, 4, 6, -1), finestra('f-lab-2', 'laboratorio', 'z', 14, -50, -48, 1),
  finestra('f-lab-3', 'laboratorio', 'z', -22, -58, -56, -1), finestra('f-lab-4', 'laboratorio', 'x', -28, 4, 6, 1),
  finestra('f-distilleria-1', 'distilleria', 'x', 28, -14, -12, -1), finestra('f-distilleria-2', 'distilleria', 'z', -22, 36, 38, -1),
  tana('t-imbarcadero-1', 'imbarcadero', -10, 64), tana('t-imbarcadero-2', 'imbarcadero', 10, 64), tana('t-imbarcadero-3', 'imbarcadero', -10, 50),
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
  porta('pCanneto', 'Cancello della passerella', 750, ['imbarcadero', 'passerella', 'piazzale'], orizzontale(48, -2, 2), 'cancello'),
  porta('pRelitti', 'Pontile dei relitti', 1000, ['imbarcadero', 'pontileOvest', 'cimitero'], verticale(-12, 54, 58), 'cancello'),
  porta('pBaraccheEst', 'Pontile delle baracche', 1000, ['imbarcadero', 'pontileEst', 'cortile'], verticale(12, 54, 58), 'cancello'),
  porta('pBaracche', 'Porta delle baracche', 1250, ['cortile', 'baracche'], orizzontale(40, 47.5, 50.5), 'porta'),
  porta('pUscitaBaracche', 'Uscita nord delle baracche', 1000, ['baracche', 'passerellaBaracche', 'aia'], orizzontale(26, 42, 46), 'porta'),
  porta('pSegheria', 'Portone della segheria', 1500, ['piazzale', 'segheria'], orizzontale(2, -2, 2), 'portone'),
  porta('pDistilleriaPonte', 'Ponte della distilleria', 1250, ['piazzale', 'pontePiazzale', 'aia'], verticale(20, 8, 12), 'cancello'),
  porta('pDistilleria', 'Porta della distilleria', 1000, ['aia', 'distilleria'], orizzontale(4, 36.5, 39.5), 'porta'),
  porta('pTorre', 'Recinto della torre radio', 1500, ['aia', 'torre'], orizzontale(4, 57, 61), 'cancello'),
  porta('pRetro', 'Retro della distilleria', 1000, ['distilleria', 'torre'], verticale(48, -12, -9), 'porta'),
  porta('pGuado', 'Guado delle rapide', 1250, ['torre', 'guado', 'rapide'], orizzontale(-22, 56, 60), 'cancello'),
  porta('pNord', 'Uscita nord della segheria', 1500, ['segheria', 'passerellaNord', 'cuore'], orizzontale(-22, -2, 2), 'portone'),
  porta('pLaboratorio', 'Grata del laboratorio', 0, ['segheria', 'scala', 'laboratorio'], verticale(-20, -12, -8), 'grata', { chiusa: true }),
  porta('pMangrovie', 'Ponte delle mangrovie', 1250, ['cuore', 'ponteMangrovie', 'isola'], verticale(-20, -52, -48), 'cancello'),
  porta('pRapide', 'Ponte delle rapide', 1250, ['cuore', 'ponteRapide', 'rapide'], verticale(20, -52, -48), 'cancello'),
  porta('pRadici', 'Radici corrotte', 0, ['laboratorio', 'passerellaSciamano', 'isola'], orizzontale(-22, -48, -44), 'radici', { chiusa: true }),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni: costo / 2 });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });
const munizioni = (n, zonaId, x, z, verso) => acquisto(`munizioni-${n}`, 'munizioni', zonaId, x, z, verso);
const santuario = (elemento, zonaId, x, z, verso) => acquisto(`santuario-${elemento}`, 'santuario', zonaId, x, z, verso, { elemento });
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
  acquisto('cassa', 'cassa', 'piazzale', -6, 15.4, [0, -1]),
  acquisto('motoreSegheria', 'motoreSegheria', 'segheria', -6, -18.9, [0, 1]),
  acquisto('potenziatore', 'potenziatore', 'torre', 66, -16, [-1, 0]),
  acquisto('altareTeschio', 'altareTeschio', 'laboratorio', -53, -12, [0, 1]),
  acquisto('radiciSciamano', 'radici', 'laboratorio', -46, -21.2, [0, 1]),
  santuario('fuoco', 'distilleria', 30.8, -18.7, [0, 1]),
  santuario('ghiaccio', 'laboratorio', -44, 11.7, [0, -1]),
  santuario('vuoto', 'cimitero', -50, 50.5, [0, 1]),
  santuario('vento', 'torre', 60, -6.1, [0, 1]),
  prova('fuoco', 0, 'aia', 40, 12.9, [0, 1]), prova('fuoco', 1, 'piazzale', -2, 9.9, [0, 1]), prova('fuoco', 2, 'cortile', 52, 50.9, [0, 1]),
  prova('ghiaccio', 0, 'laboratorio', -35, 8.6, [0, 1]), prova('ghiaccio', 1, 'baracche', 52, 28.2, [0, 1]), prova('ghiaccio', 2, 'segheria', -16, -19.6, [0, 1]),
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

export const MURALI = Object.freeze(new Set(['arma', 'motoreSegheria', 'altareTeschio', 'radici', 'santuario', 'oggettoElemento', 'totem', 'amuleto', 'bombola', 'purificatore', 'generatoreRapide', 'valvola', 'varco']));

export const PARTENZE = Object.freeze([[-1.5, 58], [1.5, 58], [-1.5, 60.2], [1.5, 60.2]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[-117, -1.2], [-117, 1.2], [-118.4, -1.2], [-118.4, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: -100.2, z: 0, verso: punto(-1, 0) });
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
  PARTENZE_TANA: Object.freeze([[-1.5, -101.5], [1.5, -101.5], [-1.5, -103.5], [1.5, -103.5]].map(([x, z]) => punto(x, z))),
  TANE_ARENA: Object.freeze(FINESTRE.filter(f => f.zona === 'tana').map(f => f.id)),
  BOZZOLI,
  GIRO: Object.freeze(BOZZOLI.map(b => punto(ARENA.x + (b.x - ARENA.x) * 0.85, ARENA.z + (b.z - ARENA.z) * 0.85))),
  PARETI: Object.freeze([[-21, -118], [21, -118], [21, -128], [-21, -128], [-8, -143], [8, -143], [-8, -101], [8, -101]].map(([x, z]) => punto(x, z))),
  ISOLE,
  PONTI: Object.freeze([[0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [6, 3], [6, 4]].map(([a, b]) => Object.freeze({ da: ISOLE[a], a: ISOLE[b], largo: 1 }))),
  POZZE_ACIDO: Object.freeze([cerchio(-19.5, -122, 2.4), cerchio(19.5, -122, 2.4)]),
});
