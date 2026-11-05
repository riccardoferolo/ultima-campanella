const SPESSORE = 0.3;
export const ALTEZZA_SOFFITTO = 3.2;

export const ZONE = Object.freeze([
  Object.freeze({ id: 'atrio', nome: 'Atrio', x0: -8, z0: -6, x1: 8, z1: 6, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'corridoio', nome: 'Corridoio', x0: -2, z0: 6, x1: 2, z1: 22, pavimento: 'piastrelle' }),
  Object.freeze({ id: 'palestra', nome: 'Palestra', x0: 8, z0: -8, x1: 24, z1: 8, pavimento: 'parquet' }),
]);

export const LIMITI = Object.freeze({ x0: -10, z0: -10, x1: 26, z1: 24 });

const orizzontale = (z, x0, x1) => ({ x0, z0: z - SPESSORE / 2, x1, z1: z + SPESSORE / 2 });
const verticale = (x, z0, z1) => ({ x0: x - SPESSORE / 2, z0, x1: x + SPESSORE / 2, z1 });

export const MURI = Object.freeze([
  orizzontale(-6, -8, -5), orizzontale(-6, -3, 3), orizzontale(-6, 5, 8),
  verticale(-8, -6, -1), verticale(-8, 1, 6),
  orizzontale(6, -8, -1), orizzontale(6, 1, 8),
  verticale(8, -8, -1), verticale(8, 1, 8),
  verticale(-2, 6, 17), verticale(-2, 19, 22),
  verticale(2, 6, 13), verticale(2, 15, 22),
  orizzontale(22, -2, 2),
  orizzontale(-8, 8, 15), orizzontale(-8, 17, 24),
  verticale(24, -8, -4), verticale(24, -2, 3), verticale(24, 5, 8),
  orizzontale(8, 8, 24),
].map(Object.freeze));

export const OSTACOLI = Object.freeze([
  Object.freeze({ x0: 18, z0: 5.2, x1: 22.5, z1: 7.8, altezza: 1.2, tipo: 'tribuna' }),
  Object.freeze({ x0: 11.5, z0: -3, x1: 13, z1: -2, altezza: 0.9, tipo: 'cavallina' }),
  Object.freeze({ x0: -6.5, z0: 1.5, x1: -4.5, z1: 2.5, altezza: 0.8, tipo: 'banco' }),
]);

function finestra(id, zona, asse, posizione, da, a, versoFuori) {
  const centro = asse === 'z' ? { x: (da + a) / 2, z: posizione } : { x: posizione, z: (da + a) / 2 };
  const scatola = asse === 'z' ? orizzontale(posizione, da, a) : verticale(posizione, da, a);
  const fuori = asse === 'z' ? { x: 0, z: versoFuori } : { x: versoFuori, z: 0 };
  return Object.freeze({
    id, zona, asse, centro: Object.freeze(centro), scatola: Object.freeze(scatola),
    esterno: Object.freeze({ x: centro.x + fuori.x * 1.1, z: centro.z + fuori.z * 1.1 }),
    interno: Object.freeze({ x: centro.x - fuori.x * 1.1, z: centro.z - fuori.z * 1.1 }),
    comparsa: Object.freeze({ x: centro.x + fuori.x * 4, z: centro.z + fuori.z * 4 }),
    fuori: Object.freeze(fuori),
  });
}

export const FINESTRE = Object.freeze([
  finestra('a1', 'atrio', 'z', -6, -5, -3, -1),
  finestra('a2', 'atrio', 'z', -6, 3, 5, -1),
  finestra('a3', 'atrio', 'x', -8, -1, 1, -1),
  finestra('c1', 'corridoio', 'x', -2, 17, 19, -1),
  finestra('c2', 'corridoio', 'x', 2, 13, 15, 1),
  finestra('p1', 'palestra', 'z', -8, 15, 17, -1),
  finestra('p2', 'palestra', 'x', 24, -4, -2, 1),
  finestra('p3', 'palestra', 'x', 24, 3, 5, 1),
]);

export const PORTE = Object.freeze([
  Object.freeze({ id: 'corridoio', nome: 'Porta del corridoio', costo: 750, zone: Object.freeze(['atrio', 'corridoio']), scatola: Object.freeze(orizzontale(6, -1, 1)), centro: Object.freeze({ x: 0, z: 6 }) }),
  Object.freeze({ id: 'palestra', nome: 'Porta della palestra', costo: 1000, zone: Object.freeze(['atrio', 'palestra']), scatola: Object.freeze(verticale(8, -1, 1)), centro: Object.freeze({ x: 8, z: 0 }) }),
]);

export const ACQUISTI = Object.freeze([
  Object.freeze({ id: 'muro-pompa', tipo: 'arma', arma: 'pompa', costo: 800, munizioni: 400, zona: 'atrio', posizione: Object.freeze({ x: -5, z: 5.84 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'muro-mitra', tipo: 'arma', arma: 'mitra', costo: 1200, munizioni: 600, zona: 'corridoio', posizione: Object.freeze({ x: -1.84, z: 10 }), verso: Object.freeze({ x: 1, z: 0 }) }),
  Object.freeze({ id: 'muro-assalto', tipo: 'arma', arma: 'assalto', costo: 1500, munizioni: 750, zona: 'palestra', posizione: Object.freeze({ x: 14, z: 7.84 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'bibita-ferro', tipo: 'bevanda', bevanda: 'ferro', zona: 'atrio', posizione: Object.freeze({ x: 7, z: 4.8 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'bibita-lampo', tipo: 'bevanda', bevanda: 'lampo', zona: 'corridoio', posizione: Object.freeze({ x: 0, z: 21.2 }), verso: Object.freeze({ x: 0, z: -1 }) }),
  Object.freeze({ id: 'bibita-ritorno', tipo: 'bevanda', bevanda: 'ritorno', zona: 'palestra', posizione: Object.freeze({ x: 23, z: -6.8 }), verso: Object.freeze({ x: -1, z: 0 }) }),
  Object.freeze({ id: 'cassa', tipo: 'cassa', zona: 'palestra', posizione: Object.freeze({ x: 16, z: 7.2 }), verso: Object.freeze({ x: 0, z: -1 }) }),
]);

export function scatolaAcquisto(acquisto) {
  if (acquisto.tipo === 'arma') return null;
  const { x, z } = acquisto.posizione;
  const lungo = 0.5;
  const largo = 0.35;
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
    ...OSTACOLI,
    ...FINESTRE.map(f => f.scatola),
    ...PORTE.filter(p => !porteAperte.has(p.id)).map(p => p.scatola),
    ...ACQUISTI.map(scatolaAcquisto).filter(Boolean),
  ];
}
