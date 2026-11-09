const SPESSORE = 0.3;
export const ALTEZZA_SOFFITTO = 3.2;
export const ATMOSFERA = Object.freeze({ buio: 0x06080b, cielo: 0x0b1322, nebbiaDentro: 24, nebbiaFuori: 40, nebbiaVicino: 3 });

export const ZONE = Object.freeze([
  Object.freeze({ id: 'atrio', nome: 'Atrio', x0: -8, z0: -6, x1: 8, z1: 6, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'corridoio', nome: 'Corridoio', x0: -2, z0: 6, x1: 2, z1: 22, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'palestra', nome: 'Palestra', x0: 8, z0: -8, x1: 24, z1: 8, pavimento: 'parquet' }),
  Object.freeze({ id: 'mensa', nome: 'Mensa', x0: -16, z0: 10, x1: -2, z1: 24, pavimento: 'linoleum' }),
  Object.freeze({ id: 'laboratorio', nome: 'Laboratorio', x0: -2, z0: 22, x1: 8, z1: 32, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'caldaia', nome: 'Caldaia', x0: 18, z0: -16, x1: 26, z1: -8, pavimento: 'cemento' }),
  Object.freeze({ id: 'cortile', nome: 'Cortile', x0: 8, z0: 8, x1: 26, z1: 30, pavimento: 'asfalto', aperto: true }),
  Object.freeze({ id: 'androne', nome: 'Androne', x0: -2, z0: -22, x1: 2, z1: -6, pavimento: 'linoleum' }),
  Object.freeze({ id: 'aula', nome: 'Aula magna', x0: -12, z0: -38, x1: 12, z1: -22, pavimento: 'parquet' }),
  Object.freeze({ id: 'biblioteca', nome: 'Biblioteca', x0: -26, z0: -38, x1: -12, z1: -24, pavimento: 'parquet' }),
  Object.freeze({ id: 'campo', nome: 'Campo sportivo', x0: 12, z0: -42, x1: 32, z1: -22, pavimento: 'terra', aperto: true }),
  Object.freeze({ id: 'rifugio', nome: 'Rifugio antiaereo', x0: -12, z0: -54, x1: 12, z1: -38, pavimento: 'cemento' }),
  Object.freeze({ id: 'sala', nome: "Sala d'attesa", x0: -48, z0: -5, x1: -28, z1: 5, pavimento: 'parquet', sala: true }),
]);

export const SALA = Object.freeze({ x0: -48, z0: -5, x1: -28, z1: 5 });

export const LIMITI = Object.freeze({ x0: -27, z0: -55, x1: 33, z1: 34 });

const orizzontale = (z, x0, x1) => ({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 });
const verticale = (x, z0, z1) => ({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 });

export const MURI = Object.freeze([
  orizzontale(-6, -8, -5), orizzontale(-6, -3, -1), orizzontale(-6, 1, 3), orizzontale(-6, 5, 8),
  verticale(-8, -6, -1), verticale(-8, 1, 6),
  orizzontale(6, -8, -1), orizzontale(6, 1, 8),
  verticale(8, -8, -1), verticale(8, 1, 8),
  verticale(-2, 6, 13), verticale(-2, 15, 22),
  verticale(2, 6, 13), verticale(2, 15, 22),
  orizzontale(22, -2, -1), orizzontale(22, 1, 8),
  orizzontale(-8, 8, 15), orizzontale(-8, 17, 20), orizzontale(-8, 22, 24),
  verticale(24, -8, -4), verticale(24, -2, 3), verticale(24, 5, 8),
  orizzontale(8, 8, 10), orizzontale(8, 12, 24),
  orizzontale(10, -16, -12), orizzontale(10, -10, -2),
  verticale(-16, 10, 15), verticale(-16, 17, 24),
  orizzontale(24, -16, -10), orizzontale(24, -8, -2),
  verticale(-2, 22, 24),
  verticale(-2, 24, 27), verticale(-2, 29, 32),
  verticale(8, 22, 32),
  orizzontale(32, -2, 0), orizzontale(32, 2, 8),
  verticale(18, -16, -8), orizzontale(-8, 24, 26),
  verticale(26, -16, -13), verticale(26, -11, -8),
  orizzontale(-16, 18, 21), orizzontale(-16, 23, 26),
  orizzontale(-5, -48, -28), orizzontale(5, -48, -28), verticale(-48, -5, 5), verticale(-28, -5, 5),
  verticale(-2, -22, -16), verticale(-2, -14, -6), verticale(2, -22, -6),
  orizzontale(-22, -12, -8), orizzontale(-22, -6, -1), orizzontale(-22, 1, 6), orizzontale(-22, 8, 12),
  verticale(-12, -38, -31), verticale(-12, -29, -22), verticale(12, -38, -31), verticale(12, -29, -22),
  orizzontale(-38, -12, -1.5), orizzontale(-38, 1.5, 12),
  orizzontale(-24, -26, -20), orizzontale(-24, -18, -12), verticale(-26, -38, -33), verticale(-26, -31, -24), orizzontale(-38, -26, -12),
  verticale(-12, -54, -48), verticale(-12, -46, -38), verticale(12, -54, -48), verticale(12, -46, -38), orizzontale(-54, -12, 12),
].map(Object.freeze));

export const RECINZIONI = Object.freeze([
  verticale(8, 8, 22),
  orizzontale(30, 8, 16), orizzontale(30, 18, 26),
  verticale(26, 8, 18), verticale(26, 20, 30),
  orizzontale(8, 24, 26),
  orizzontale(-22, 12, 32),
  verticale(32, -42, -34), verticale(32, -32, -22),
  orizzontale(-42, 12, 21), orizzontale(-42, 23, 32),
].map(Object.freeze));
export const ALTEZZA_RECINZIONE = 2.6;

export const OSTACOLI = Object.freeze([
  Object.freeze({ x0: 18, z0: 5.2, x1: 22.5, z1: 7.8, altezza: 1.2, tipo: 'tribuna' }),
  Object.freeze({ x0: 11.5, z0: -3, x1: 13, z1: -2, altezza: 0.9, tipo: 'cavallina' }),
  Object.freeze({ x0: -6.5, z0: 1.5, x1: -4.5, z1: 2.5, altezza: 0.8, tipo: 'banco' }),
  Object.freeze({ x0: -14, z0: 12.5, x1: -10, z1: 13.5, altezza: 0.75, tipo: 'tavolo' }),
  Object.freeze({ x0: -8, z0: 12.5, x1: -4, z1: 13.5, altezza: 0.75, tipo: 'tavolo' }),
  Object.freeze({ x0: -14, z0: 16.5, x1: -10, z1: 17.5, altezza: 0.75, tipo: 'tavolo' }),
  Object.freeze({ x0: -8, z0: 16.5, x1: -4, z1: 17.5, altezza: 0.75, tipo: 'tavolo' }),
  Object.freeze({ x0: -14, z0: 20.5, x1: -10, z1: 21.5, altezza: 0.75, tipo: 'tavolo' }),
  Object.freeze({ x0: -15.6, z0: 22.6, x1: -11, z1: 23.6, altezza: 1.1, tipo: 'bancone' }),
  Object.freeze({ x0: 0, z0: 25, x1: 2.5, z1: 26, altezza: 0.95, tipo: 'bancone' }),
  Object.freeze({ x0: 4, z0: 25, x1: 6.5, z1: 26, altezza: 0.95, tipo: 'bancone' }),
  Object.freeze({ x0: 0, z0: 29, x1: 2.5, z1: 30, altezza: 0.95, tipo: 'bancone' }),
  Object.freeze({ x0: 18.9, z0: -14, x1: 21.2, z1: -11.8, altezza: 2.6, tipo: 'caldaia' }),
  Object.freeze({ x0: 19, z0: 22, x1: 24.5, z1: 24.6, altezza: 2.8, tipo: 'pulmino' }),
  Object.freeze({ x0: 11.2, z0: 16.2, x1: 11.8, z1: 16.8, altezza: 4, tipo: 'albero' }),
  Object.freeze({ x0: 21.7, z0: 13.2, x1: 22.3, z1: 13.8, altezza: 4, tipo: 'albero' }),
  Object.freeze({ x0: 12.2, z0: 26.2, x1: 12.8, z1: 26.8, altezza: 4, tipo: 'albero' }),
  Object.freeze({ x0: 15, z0: 11.6, x1: 17.5, z1: 12.1, altezza: 0.5, tipo: 'panchina' }),
  Object.freeze({ x0: 9.2, z0: 20, x1: 9.7, z1: 22.5, altezza: 0.5, tipo: 'panchina' }),
  Object.freeze({ x0: 16.85, z0: 19.85, x1: 17.15, z1: 20.15, altezza: 3, tipo: 'lampione' }),
  Object.freeze({ x0: 10.35, z0: 27.35, x1: 10.65, z1: 27.65, altezza: 3, tipo: 'lampione' }),
  Object.freeze({ x0: -23, z0: -28.3, x1: -16, z1: -27.7, altezza: 2.2, tipo: 'scaffale' }),
  Object.freeze({ x0: -23, z0: -32.3, x1: -16, z1: -31.7, altezza: 2.2, tipo: 'scaffale' }),
  Object.freeze({ x0: -23, z0: -36.3, x1: -16, z1: -35.7, altezza: 2.2, tipo: 'scaffale' }),
  Object.freeze({ x0: -15, z0: -26.5, x1: -13, z1: -25.5, altezza: 0.8, tipo: 'banco' }),
  ...[-27, -30, -33].flatMap(z => [
    Object.freeze({ x0: -9.5, z0: z - 0.3, x1: -2.5, z1: z + 0.3, altezza: 0.9, tipo: 'fila' }),
    Object.freeze({ x0: 2.5, z0: z - 0.3, x1: 9.5, z1: z + 0.3, altezza: 0.9, tipo: 'fila' }),
  ]),
  ...[[-5, -43], [5, -43], [-5, -49], [5, -49]].map(([x, z]) => Object.freeze({ x0: x - 0.4, z0: z - 0.4, x1: x + 0.4, z1: z + 0.4, altezza: ALTEZZA_SOFFITTO, tipo: 'pilastro' })),
  Object.freeze({ x0: 23.2, z0: -35, x1: 24.8, z1: -33.8, altezza: 1.3, tipo: 'generatore' }),
  Object.freeze({ x0: 14, z0: -24.6, x1: 20, z1: -22.3, altezza: 1.2, tipo: 'tribuna' }),
  Object.freeze({ x0: 22.85, z0: -26.15, x1: 23.15, z1: -25.85, altezza: 3, tipo: 'lampione' }),
]);

function finestra(id, zona, asse, posizione, da, a, versoFuori, recinzione = false) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const scatola = asse === 'z' ? orizzontale(posizione, da, a) : verticale(posizione, da, a);
  const fuori = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  return Object.freeze({
    id, zona, asse, centro: Object.freeze(centro), scatola: Object.freeze(scatola),
    esterno: Object.freeze({ x: centro.x + fuori.x * 1.1, z: centro.z + fuori.z * 1.1 }),
    interno: Object.freeze({ x: centro.x - fuori.x * 1.1, z: centro.z - fuori.z * 1.1 }),
    comparsa: Object.freeze({ x: centro.x + fuori.x * 4, z: centro.z + fuori.z * 4 }),
    fuori: Object.freeze(fuori),
    recinzione,
  });
}

export const FINESTRE = Object.freeze([
  finestra('a1', 'atrio', 'z', -6, -5, -3, -1),
  finestra('a2', 'atrio', 'z', -6, 3, 5, -1),
  finestra('a3', 'atrio', 'x', -8, -1, 1, -1),
  finestra('c2', 'corridoio', 'x', 2, 13, 15, 1),
  finestra('p1', 'palestra', 'z', -8, 15, 17, -1),
  finestra('p2', 'palestra', 'x', 24, -4, -2, 1),
  finestra('p3', 'palestra', 'x', 24, 3, 5, 1),
  finestra('m1', 'mensa', 'x', -16, 15, 17, -1),
  finestra('m2', 'mensa', 'z', 24, -10, -8, 1),
  finestra('m3', 'mensa', 'z', 10, -12, -10, -1),
  finestra('l1', 'laboratorio', 'z', 32, 0, 2, 1),
  finestra('l2', 'laboratorio', 'x', -2, 27, 29, -1),
  finestra('g1', 'cortile', 'z', 30, 16, 18, 1, true),
  finestra('g2', 'cortile', 'x', 26, 18, 20, 1, true),
  finestra('k1', 'caldaia', 'z', -16, 21, 23, -1),
  finestra('k2', 'caldaia', 'x', 26, -13, -11, 1),
  finestra('n1', 'androne', 'x', -2, -16, -14, -1),
  finestra('u1', 'aula', 'z', -22, -8, -6, 1),
  finestra('u2', 'aula', 'z', -22, 6, 8, 1),
  finestra('b1', 'biblioteca', 'x', -26, -33, -31, -1),
  finestra('b2', 'biblioteca', 'z', -24, -20, -18, 1),
  finestra('s1', 'campo', 'z', -42, 21, 23, -1, true),
  finestra('s2', 'campo', 'x', 32, -34, -32, 1, true),
  finestra('r1', 'rifugio', 'x', -12, -48, -46, -1),
  finestra('r2', 'rifugio', 'x', 12, -48, -46, 1),
]);

export const FINESTRE_RIFUGIO = Object.freeze(['r1', 'r2']);

function porta(id, nome, costo, zone, scatola, chiusa = false) {
  return Object.freeze({
    id, nome, costo, chiusa, zone: Object.freeze(zone), scatola: Object.freeze(scatola),
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }),
  });
}

export const PORTE = Object.freeze([
  porta('corridoio', 'Porta del corridoio', 750, ['atrio', 'corridoio'], orizzontale(6, -1, 1)),
  porta('palestra', 'Porta della palestra', 1000, ['atrio', 'palestra'], verticale(8, -1, 1)),
  porta('mensa', 'Porta della mensa', 1250, ['corridoio', 'mensa'], verticale(-2, 13, 15)),
  porta('laboratorio', 'Porta del laboratorio', 1500, ['corridoio', 'laboratorio'], orizzontale(22, -1, 1)),
  porta('caldaia', 'Porta della caldaia', 1000, ['palestra', 'caldaia'], orizzontale(-8, 20, 22)),
  porta('cortile', 'Porta del cortile', 1250, ['palestra', 'cortile'], orizzontale(8, 10, 12)),
  porta('androne', "Porta dell'androne", 1500, ['atrio', 'androne'], orizzontale(-6, -1, 1)),
  porta('aula', "Porta dell'aula magna", 1250, ['androne', 'aula'], orizzontale(-22, -1, 1)),
  porta('biblioteca', 'Porta della biblioteca', 1000, ['aula', 'biblioteca'], verticale(-12, -31, -29)),
  porta('campo', 'Porta del campo sportivo', 1250, ['aula', 'campo'], verticale(12, -31, -29)),
  porta('rifugio', 'Cancello del rifugio', 0, ['aula', 'rifugio'], orizzontale(-38, -1.5, 1.5), true),
]);

export const ACQUISTI = Object.freeze([
  Object.freeze({ id: 'muro-pompa', tipo: 'arma', arma: 'pompa', costo: 800, munizioni: 400, zona: 'atrio', posizione: Object.freeze({ x: -5, z: 5.84 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'muro-mitra', tipo: 'arma', arma: 'mitra', costo: 1200, munizioni: 600, zona: 'corridoio', posizione: Object.freeze({ x: -1.84, z: 10 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'muro-assalto', tipo: 'arma', arma: 'assalto', costo: 1500, munizioni: 750, zona: 'palestra', posizione: Object.freeze({ x: 14, z: 7.84 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'muro-precisione', tipo: 'arma', arma: 'precisione', costo: 1750, munizioni: 900, zona: 'mensa', posizione: Object.freeze({ x: -15.84, z: 20 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'bibita-ferro', tipo: 'bevanda', bevanda: 'ferro', zona: 'atrio', posizione: Object.freeze({ x: 7, z: 4.8 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'bibita-lampo', tipo: 'bevanda', bevanda: 'lampo', zona: 'corridoio', posizione: Object.freeze({ x: 1.45, z: 19.5 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'bibita-ritorno', tipo: 'bevanda', bevanda: 'ritorno', zona: 'palestra', posizione: Object.freeze({ x: 23, z: -6.8 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'cassa', tipo: 'cassa', zona: 'palestra', posizione: Object.freeze({ x: 16, z: 7.2 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'interruttore', tipo: 'interruttore', zona: 'caldaia', posizione: Object.freeze({ x: 25.7, z: -9.5 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'potenziatore', tipo: 'potenziatore', zona: 'laboratorio', posizione: Object.freeze({ x: 6.6, z: 30.6 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'muro-raffica', tipo: 'arma', arma: 'raffica', costo: 900, munizioni: 450, zona: 'laboratorio', posizione: Object.freeze({ x: 7.84, z: 24.2 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'muro-carabina', tipo: 'arma', arma: 'carabina', costo: 1600, munizioni: 800, zona: 'cortile', posizione: Object.freeze({ x: 18, z: 8.16 }), verso: Object.freeze({ x: 0, z: 1 }) }),
  Object.freeze({ id: 'muro-doppietta', tipo: 'arma', arma: 'doppietta', costo: 1000, munizioni: 500, zona: 'caldaia', posizione: Object.freeze({ x: 18.16, z: -9.6 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'campanella', tipo: 'campanella', zona: 'atrio', posizione: Object.freeze({ x: -3, z: 5.84 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'muro-vettore', tipo: 'arma', arma: 'vettore', costo: 1300, munizioni: 650, zona: 'androne', posizione: Object.freeze({ x: -1.84, z: -10 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'muro-bullpup', tipo: 'arma', arma: 'bullpup', costo: 1500, munizioni: 750, zona: 'aula', posizione: Object.freeze({ x: 11.84, z: -25 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'muro-dsv', tipo: 'arma', arma: 'dsv', costo: 1800, munizioni: 900, zona: 'biblioteca', posizione: Object.freeze({ x: -15, z: -24.16 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'muro-caccia', tipo: 'arma', arma: 'caccia', costo: 1000, munizioni: 500, zona: 'campo', posizione: Object.freeze({ x: 12.16, z: -35 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'muro-mitragliatrice', tipo: 'arma', arma: 'mitragliatrice', costo: 2500, munizioni: 1250, zona: 'rifugio', posizione: Object.freeze({ x: -11.84, z: -42 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'bibita-raffica', tipo: 'bevanda', bevanda: 'raffica', zona: 'aula', posizione: Object.freeze({ x: -11.2, z: -25 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'bibita-scatto', tipo: 'bevanda', bevanda: 'scatto', zona: 'campo', posizione: Object.freeze({ x: 31, z: -26 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'bibita-tasca', tipo: 'bevanda', bevanda: 'tasca', zona: 'biblioteca', posizione: Object.freeze({ x: -25.2, z: -27 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'quadro', tipo: 'quadro', zona: 'aula', posizione: Object.freeze({ x: 3.5, z: -37.84 }), verso: Object.freeze({ x: 0, z: 1 }) }),
  Object.freeze({ id: 'generatore', tipo: 'generatore', zona: 'campo', posizione: Object.freeze({ x: 24, z: -33.2 }), verso: Object.freeze({ x: 0, z: 1 }) }),
  Object.freeze({ id: 'allarme', tipo: 'allarme', zona: 'rifugio', posizione: Object.freeze({ x: 0, z: -53.84 }), verso: Object.freeze({ x: 0, z: 1 }) }),
]);

export const MURALI = Object.freeze(new Set(['arma', 'interruttore', 'campanella', 'quadro', 'generatore', 'allarme']));


export const PARTENZE = Object.freeze([{ x: -1.5, z: 0 }, { x: 1.5, z: 0 }, { x: -1.5, z: -2.2 }, { x: 1.5, z: -2.2 }].map(Object.freeze));
export const PARTENZE_SALA = Object.freeze([{ x: -45, z: -1.2 }, { x: -45, z: 1.2 }, { x: -46.6, z: -1.2 }, { x: -46.6, z: 1.2 }].map(Object.freeze));

export const CARTELLO_PRONTI = Object.freeze({ x: -28.16, z: 0, verso: Object.freeze({ x: -1, z: 0 }) });

export const POSTI_FUSIBILE = Object.freeze([
  Object.freeze({ x: -21, z: -27.6, y: 1.2 }),
  Object.freeze({ x: -17.5, z: -31.6, y: 0.62 }),
  Object.freeze({ x: -22, z: -36.4, y: 1.62 }),
]);
export const FUSIBILE_GENERATORE = Object.freeze({ x: 24, z: -32.3, y: 0.3 });
export const GENERATORE = Object.freeze({ x: 24, z: -34.4 });
export const COMPARSA_CUSTODE = Object.freeze({ x: 0, z: -40.6 });
export const SOGLIA_RIFUGIO = -38.6;

export const FRAMMENTI = Object.freeze([
  Object.freeze({ id: 0, x: 19.6, z: -15.3, y: 0.25 }),
  Object.freeze({ id: 1, x: -13.4, z: 13, y: 0.86 }),
  Object.freeze({ id: 2, x: 12.5, z: 27.7, y: 0.25 }),
]);

const solido = (x, z, l, p) => Object.freeze({ x0: x - l / 2, z0: z - p / 2, x1: x + l / 2, z1: z + p / 2, altezza: 1 });
export const ARREDI = Object.freeze([
  { modello: 'covered_car', x: 30.5, z: 13.5, rot: 0.15 },
  { modello: 'covered_car', x: 31.2, z: 25.5, rot: -0.2 },
  { modello: 'covered_car', x: 2.5, z: 36.5, rot: Math.PI / 2 + 0.1 },
  { modello: 'barrel_03', x: 25.2, z: 9, rot: 0.3, solido: solido(25.2, 9, 0.65, 0.65) },
  { modello: 'barrel_03', x: 24.4, z: 9.3, rot: 1.2, solido: solido(24.4, 9.3, 0.65, 0.65) },
  { modello: 'old_military_crate', x: 9.5, z: 14.5, rot: Math.PI / 2, solido: solido(9.5, 14.5, 1, 1.85) },
  { modello: 'metal_trash_can', x: 22, z: 28.9, rot: Math.PI, solido: solido(22, 28.9, 1.9, 0.6) },
  { modello: 'trashbag', x: 25.3, z: 28.9, rot: 0 },
  { modello: 'trashbag', x: 24.6, z: 29.2, rot: 2 },
  { modello: 'wooden_crate_01', x: 25.2, z: 26.4, rot: 0.2 },
  { modello: 'wooden_crate_01', x: 24.9, z: 11.4, rot: 1.4 },
  { modello: 'barrel_03', x: 18.5, z: 25.2, rot: 0, solido: solido(18.5, 25.2, 0.65, 0.65) },
  { modello: 'trashbag', x: 9, z: 9.1, rot: 0.8 },
  { modello: 'wooden_crate_01', x: 18.6, z: -12.9, rot: Math.PI / 2 },
  { modello: 'wooden_crate_01', x: 25.3, z: -15.2, rot: 0.3 },
  { modello: 'trashbag', x: -10.2, z: 23.3, rot: 0 },
  { modello: 'barrel_03', x: 7.3, z: 23.1, rot: 0, solido: solido(7.3, 23.1, 0.65, 0.65) },
  { modello: 'old_military_crate', x: 10.2, z: -7.3, rot: 0, solido: solido(10.2, -7.3, 1.85, 1) },
  { modello: 'metal_office_desk', x: -5.5, z: 2, rot: 0 },
  { modello: 'painted_wooden_chair_01', x: -5.5, z: 2.75, rot: Math.PI },
  { modello: 'sofa_02', x: -44.5, z: 4.3, rot: Math.PI, solido: solido(-44.5, 4.3, 1.85, 0.85) },
  { modello: 'sofa_02', x: -40, z: 4.3, rot: Math.PI, solido: solido(-40, 4.3, 1.85, 0.85) },
  { modello: 'painted_wooden_chair_01', x: -36, z: -4.4, rot: 0 },
  { modello: 'painted_wooden_chair_01', x: -35, z: -4.4, rot: 0.2 },
  { modello: 'barrel_03', x: -29, z: -4, rot: 0, solido: solido(-29, -4, 0.65, 0.65) },
  { modello: 'barrel_03', x: -29, z: 4, rot: 1, solido: solido(-29, 4, 0.65, 0.65) },
  { modello: 'metal_office_desk', x: -14, z: -26, rot: 0 },
  { modello: 'painted_wooden_chair_01', x: -14, z: -25.25, rot: Math.PI },
  { modello: 'sofa_02', x: -14.6, z: -37.3, rot: 0, solido: solido(-14.6, -37.3, 1.85, 0.85) },
  { modello: 'barrel_03', x: 14, z: -40.6, rot: 0.4, solido: solido(14, -40.6, 0.65, 0.65) },
  { modello: 'barrel_03', x: 14.8, z: -41.1, rot: 1.3, solido: solido(14.8, -41.1, 0.65, 0.65) },
  { modello: 'wooden_crate_01', x: 31, z: -41, rot: 0.3 },
  { modello: 'wooden_crate_01', x: 31.1, z: -23, rot: 1.1 },
  { modello: 'trashbag', x: 25.5, z: -22.6, rot: 0.5 },
  { modello: 'barrel_03', x: -11.2, z: -53.2, rot: 0.2, solido: solido(-11.2, -53.2, 0.65, 0.65) },
  { modello: 'barrel_03', x: 11.2, z: -53.3, rot: 2.1, solido: solido(11.2, -53.3, 0.65, 0.65) },
  { modello: 'old_military_crate', x: 9.8, z: -39.2, rot: 0, solido: solido(9.8, -39.2, 1.85, 1) },
  { modello: 'old_military_crate', x: -9.6, z: -52.9, rot: 0, solido: solido(-9.6, -52.9, 1.85, 1) },
  { modello: 'wooden_crate_01', x: 10.8, z: -50.4, rot: 0.5 },
].map(Object.freeze));
