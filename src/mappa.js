const SPESSORE = 0.3;
export const ALTEZZA_SOFFITTO = 3.2;

export const ZONE = Object.freeze([
  Object.freeze({ id: 'atrio', nome: 'Atrio', x0: -8, z0: -6, x1: 8, z1: 6, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'corridoio', nome: 'Corridoio', x0: -2, z0: 6, x1: 2, z1: 22, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'palestra', nome: 'Palestra', x0: 8, z0: -8, x1: 24, z1: 8, pavimento: 'parquet' }),
  Object.freeze({ id: 'mensa', nome: 'Mensa', x0: -16, z0: 10, x1: -2, z1: 24, pavimento: 'linoleum' }),
  Object.freeze({ id: 'laboratorio', nome: 'Laboratorio', x0: -2, z0: 22, x1: 8, z1: 32, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'caldaia', nome: 'Caldaia', x0: 18, z0: -16, x1: 26, z1: -8, pavimento: 'cemento' }),
  Object.freeze({ id: 'cortile', nome: 'Cortile', x0: 8, z0: 8, x1: 26, z1: 30, pavimento: 'asfalto', aperto: true }),
]);

export const LIMITI = Object.freeze({ x0: -18, z0: -18, x1: 28, z1: 34 });

const orizzontale = (z, x0, x1) => ({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 });
const verticale = (x, z0, z1) => ({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 });

export const MURI = Object.freeze([
  orizzontale(-6, -8, -5), orizzontale(-6, -3, 3), orizzontale(-6, 5, 8),
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
].map(Object.freeze));

export const RECINZIONI = Object.freeze([
  verticale(8, 8, 22),
  orizzontale(30, 8, 16), orizzontale(30, 18, 26),
  verticale(26, 8, 18), verticale(26, 20, 30),
  orizzontale(8, 24, 26),
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
]);

function porta(id, nome, costo, zone, scatola) {
  return Object.freeze({
    id, nome, costo, zone: Object.freeze(zone), scatola: Object.freeze(scatola),
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
]);

export function scatolaAcquisto(acquisto) {
  if (acquisto.tipo === 'arma' || acquisto.tipo === 'interruttore') return null;
  const { x, z } = acquisto.posizione;
  const lungo = acquisto.tipo === 'potenziatore' ? 0.8 : 0.5;
  const largo = acquisto.tipo === 'potenziatore' ? 0.6 : 0.35;
  return acquisto.verso.x !== 0
    ? { x0: x - largo, z0: z - lungo, x1: x + largo, z1: z + lungo }
    : { x0: x - lungo, z0: z - largo, x1: x + lungo, z1: z + largo };
}

export const PARTENZE = Object.freeze([Object.freeze({ x: -1.5, z: 0 }), Object.freeze({ x: 1.5, z: 0 })]);

export function zonaDi(x, z) {
  return ZONE.find(zona => x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1)?.id ?? null;
}

export function zoneAperte(porteAperte) {
  const aperte = new Set(['atrio']);
  for (const porta of PORTE) if (porteAperte.has(porta.id)) porta.zone.forEach(z => aperte.add(z));
  return aperte;
}

export function ostacoliPerGiocatori(porteAperte) {
  return [
    ...MURI,
    ...RECINZIONI,
    ...OSTACOLI,
    ...FINESTRE.map(f => f.scatola),
    ...PORTE.filter(p => !porteAperte.has(p.id)).map(p => p.scatola),
    ...ACQUISTI.map(scatolaAcquisto).filter(Boolean),
  ];
}
