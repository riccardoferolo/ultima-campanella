const SPESSORE = 0.3;
const BASE_MURO = -12;
const ALTEZZA_MURO = 60;
export const ALTEZZA_SOFFITTO = 3.6;
export const ALTEZZA_RECINZIONE = 2;
export const ALTEZZA_MARKET = 3.6;
export const ALTEZZA_OFFICINA = 5;
export const ALTEZZA_PENSILINA = 5.4;
export const ATMOSFERA = Object.freeze({ buio: 0x0a0c12, cielo: 0x141924, nebbiaDentro: 34, nebbiaFuori: 58, nebbiaVicino: 3 });

const zona = (id, nome, x0, z0, x1, z1, pavimento, tetto, extra = {}) => Object.freeze({ id, nome, x0, z0, x1, z1, pavimento, tetto, ...extra });

export const ZONE = Object.freeze([
  zona('piazzale', 'Piazzale delle pompe', -22, -20, 26, 6, 'asfalto', undefined, { aperto: true }),
  zona('market', 'Market e bar', -16, 6, 6, 20, 'piastrelle', ALTEZZA_MARKET),
  zona('officina', 'Officina', 6, 6, 24, 20, 'cemento', ALTEZZA_OFFICINA),
  zona('retro', 'Parcheggio dei camion', -16, 20, 24, 38, 'asfalto', undefined, { aperto: true }),
  zona('sala', 'Saletta degli autisti', 120, -5, 134, 5, 'linoleum', 3.4, { sala: true }),
]);

export const SALA = Object.freeze({ x0: 120, z0: -5, x1: 134, z1: 5 });
export const LIMITI = Object.freeze({ x0: -32, z0: -32, x1: 36, z1: 48 });

const parete = (x0, z0, x1, z1, y1, extra = {}) => Object.freeze({ x0, z0, x1, z1, base: BASE_MURO, altezza: ALTEZZA_MURO, y0: 0, y1, ...extra });
const oz = (z, x0, x1, y1, extra) => parete(x0, z - SPESSORE / 2, x1, z + SPESSORE / 2, y1, extra);
const vx = (x, z0, z1, y1, extra) => parete(x - SPESSORE / 2, z0, x + SPESSORE / 2, z1, y1, extra);

const MURO_MARKET = ALTEZZA_MARKET + 0.9;
const MURO_OFFICINA = ALTEZZA_OFFICINA + 0.6;

export const MURI = Object.freeze([
  oz(6, -16.15, -6, MURO_MARKET, { parte: 'vetrina' }), oz(6, -3, 6, MURO_MARKET, { parte: 'vetrina' }),
  oz(6, 6, 10, MURO_OFFICINA, { parte: 'officina' }), oz(6, 16, 24.15, MURO_OFFICINA, { parte: 'officina' }),
  vx(-16, 6, 9, MURO_MARKET, { parte: 'market' }), vx(-16, 11, 14, MURO_MARKET, { parte: 'market' }), vx(-16, 16, 20, MURO_MARKET, { parte: 'market' }),
  vx(24, 6, 9, MURO_OFFICINA, { parte: 'officina' }), vx(24, 11, 14, MURO_OFFICINA, { parte: 'officina' }), vx(24, 16, 20, MURO_OFFICINA, { parte: 'officina' }),
  vx(6, 6, 15, MURO_OFFICINA, { parte: 'interno' }), vx(6, 17, 20, MURO_OFFICINA, { parte: 'interno' }),
  oz(20, -16.15, -12, MURO_MARKET, { parte: 'market' }), oz(20, -10, 6, MURO_MARKET, { parte: 'market' }),
  oz(20, 6, 8, MURO_OFFICINA, { parte: 'officina' }), oz(20, 10, 24.15, MURO_OFFICINA, { parte: 'officina' }),

  parete(119.8, -5.2, 134.2, -5, 3.4), parete(119.8, 5, 134.2, 5.2, 3.4),
  parete(119.8, -5, 120, 5, 3.4), parete(134, -5, 134.2, 5, 3.4),
]);

const rete = (x0, z0, x1, z1, parte) => Object.freeze({ x0, z0, x1, z1, base: 0, altezza: ALTEZZA_RECINZIONE, parte });
const reteZ = (z, x0, x1, parte) => rete(x0, z - 0.15, x1, z + 0.15, parte);
const reteX = (x, z0, z1, parte) => rete(x - 0.15, z0, x + 0.15, z1, parte);

export const RECINZIONI = Object.freeze([
  reteZ(-20, -22.15, -14, 'guardrail'), reteZ(-20, -12, 0, 'guardrail'), reteZ(-20, 2, 14, 'guardrail'), reteZ(-20, 16, 26.15, 'guardrail'),
  reteX(-22, -20, -10, 'campo'), reteX(-22, -8, -2, 'campo'), reteX(-22, 0, 6.15, 'campo'),
  reteX(26, -20, -14, 'campo'), reteX(26, -12, 6.15, 'campo'),
  reteZ(6, -22.15, -16.15, 'campo'), reteZ(6, 24.15, 26.15, 'campo'),
  reteX(-16, 20, 28, 'retro'), reteX(-16, 30, 38, 'retro'),
  reteX(24, 20, 30, 'retro'), reteX(24, 32, 38, 'retro'),
  reteZ(38, -16.15, -8, 'retro'), reteZ(38, -6, 8, 'retro'), reteZ(38, 10, 24.15, 'retro'),
]);

const ostacolo = (tipo, x0, z0, x1, z1, base, altezza, extra = {}) => Object.freeze({ x0, z0, x1, z1, base, altezza, tipo, ...extra });

export const PENSILINA = Object.freeze({ x0: -12, z0: -12.5, x1: 12, z1: -1.5 });
export const ISOLE = Object.freeze([-8, 0, 8].map((x, i) => Object.freeze({ id: i, x, z0: -9.6, z1: -4.4 })));

export const OSTACOLI = Object.freeze([
  ...ISOLE.map(i => ostacolo('isola', i.x - 0.6, i.z0, i.x + 0.6, i.z1, 0, 1.6, { isola: i.id })),
  ostacolo('auto', -6.6, -9.4, -4.8, -4.9, 0, 1.5, { colore: 0x6a1d22, ruota: 0.2 }),
  ostacolo('auto', 9.9, -10.6, 11.9, -6.1, 0, 1.5, { colore: 0xb8bcc0, ruota: -0.15, portiera: true }),
  ostacolo('auto', 15.6, -17.4, 19.8, -15.5, 0, 1.5, { colore: 0x23385a, incidentata: true, ruota: 1.35 }),
  ostacolo('totem', 20.6, -15.8, 22, -15.1, 0, 8.5),
  ostacolo('compressore', 22.6, -5.6, 23.6, -4.6, 0, 1.5),
  ostacolo('ghiaccio', -1.6, 4.5, 0.8, 5.6, 0, 1.1),
  ostacolo('jersey', -20, -13, -16, -12.4, 0, 0.9),
  ostacolo('jersey', 4, 0.6, 8, 1.2, 0, 0.9, { ruota: 0.4 }),
  ostacolo('bidoni', -19.6, 2.6, -18, 4.6, 0, 1),
  ostacolo('cartello', 13.9, 1.9, 14.3, 2.3, 0, 2.6),

  ostacolo('bancone', -14.4, 16.6, -6.6, 17.6, 0, 1.1),
  ostacolo('scaffale', -11.5, 9.7, -5.5, 10.5, 0, 1.9),
  ostacolo('scaffale', -11.5, 12.7, -5.5, 13.5, 0, 1.9),
  ostacolo('frigo', 5, 7.2, 5.85, 13.6, 0, 2.2),
  ostacolo('cassaNegozio', -2.6, 8.4, 0.6, 9.4, 0, 1.05),
  ostacolo('tavolino', -1.6, 14.2, -0.6, 15.2, 0, 0.75),
  ostacolo('tavolino', 1.6, 14.2, 2.6, 15.2, 0, 0.75),
  ostacolo('tavolino', 0, 17.2, 1, 18.2, 0, 0.75),

  ...[[11, 9], [15, 9], [11, 15], [15, 15]].map(([x, z]) => ostacolo('colonnaPonte', x - 0.2, z - 0.2, x + 0.2, z + 0.2, 0, 3.4)),
  ostacolo('banco', 11, 18.9, 17.4, 19.85, 0, 1),
  ostacolo('gomme', 21.6, 6.3, 23.7, 8.2, 0, 1.4),
  ostacolo('fusti', 6.3, 18, 7.9, 19.7, 0, 1),
  ostacolo('carrello', 18.6, 12.2, 19.6, 13, 0, 1),

  ostacolo('cisterna', -11.6, 30.2, 0.6, 32.8, 0, 3.6),
  ostacolo('trattore', 0.6, 30, 4.4, 33, 0, 3.4),
  ostacolo('rimorchio', 9.4, 23.6, 21.6, 26.2, 0, 4),
  ostacolo('cassonetti', -15.6, 21.4, -11.2, 22.8, 0, 1.4),
  ostacolo('bancali', -6, 22.4, -4, 24, 0, 1.2),
  ostacolo('torre', 7.4, 31.4, 8.6, 32.6, 0, 9),
  ostacolo('container', 13.8, 35.2, 23.6, 37.6, 0, 2.6),
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

function chiusino(id, zonaId, x, z) {
  const punto = Object.freeze({ x, z });
  return Object.freeze({ id, zona: zonaId, tana: true, acqua: false, asse: 'z', centro: punto, scatola: null, esterno: punto, interno: punto, comparsa: punto, fuori: Object.freeze({ x: 0, z: 1 }), recinzione: false });
}

const RETE = Object.freeze({ recinzione: true });

export const FINESTRE = Object.freeze([
  finestra('a1', 'piazzale', 'z', -20, -14, -12, -1, RETE),
  finestra('a2', 'piazzale', 'z', -20, 0, 2, -1, RETE),
  finestra('a3', 'piazzale', 'z', -20, 14, 16, -1, RETE),
  finestra('c1', 'piazzale', 'x', -22, -10, -8, -1, RETE),
  finestra('c2', 'piazzale', 'x', -22, -2, 0, -1, RETE),
  finestra('c3', 'piazzale', 'x', 26, -14, -12, 1, RETE),
  finestra('m1', 'market', 'x', -16, 9, 11, -1),
  finestra('m2', 'market', 'x', -16, 14, 16, -1),
  finestra('o1', 'officina', 'x', 24, 9, 11, 1),
  finestra('o2', 'officina', 'x', 24, 14, 16, 1),
  finestra('r1', 'retro', 'x', -16, 28, 30, -1, RETE),
  finestra('r2', 'retro', 'x', 24, 30, 32, 1, RETE),
  finestra('r3', 'retro', 'z', 38, -8, -6, 1, RETE),
  finestra('r4', 'retro', 'z', 38, 8, 10, 1, RETE),
  chiusino('t1', 'piazzale', -2.5, -15.5),
  chiusino('t2', 'piazzale', 17, -6.5),
]);

function porta(id, nome, costo, zone, scatola, extra = {}) {
  return Object.freeze({
    id, nome, costo, chiusa: false, zone: Object.freeze(zone), scatola: Object.freeze({ ...scatola, base: BASE_MURO, altezza: ALTEZZA_MURO }),
    centro: Object.freeze({ x: (scatola.x0 + scatola.x1) / 2, z: (scatola.z0 + scatola.z1) / 2 }), ...extra,
  });
}

export const PORTE = Object.freeze([
  porta('ingresso', 'Porte scorrevoli del market', 750, ['market'], { x0: -6, z0: 5.85, x1: -3, z1: 6.15 }, { tipo: 'scorrevole' }),
  porta('serranda', "Serranda dell'officina", 1000, ['officina'], { x0: 10, z0: 5.85, x1: 16, z1: 6.15 }, { tipo: 'serranda' }),
  porta('interna', 'Porta tra market e officina', 750, ['market', 'officina'], { x0: 5.85, z0: 15, x1: 6.15, z1: 17 }, { tipo: 'porta' }),
  porta('magazzino', 'Porta del magazzino sul retro', 1000, ['retro'], { x0: -12, z0: 19.85, x1: -10, z1: 20.15 }, { tipo: 'porta' }),
  porta('retroOfficina', "Porta sul retro dell'officina", 1000, ['retro'], { x0: 8, z0: 19.85, x1: 10, z1: 20.15 }, { tipo: 'porta' }),
]);

const punto = (x, z) => Object.freeze({ x, z });
const acquisto = (id, tipo, zonaId, x, z, verso, extra = {}) => Object.freeze({ id, tipo, zona: zonaId, posizione: punto(x, z), verso: punto(...verso), ...extra });
const muro = (arma, costo, munizioni, zonaId, x, z, verso) => acquisto(`muro-${arma}`, 'arma', zonaId, x, z, verso, { arma, costo, munizioni });
const bibita = (bevanda, zonaId, x, z, verso) => acquisto(`bibita-${bevanda}`, 'bevanda', zonaId, x, z, verso, { bevanda });
const tanica = (n, zonaId, x, z, verso) => acquisto(`tanica-${n}`, 'tanica', zonaId, x, z, verso, { tanica: n });

export const TANICHE = 3;

export const ACQUISTI = Object.freeze([
  muro('pompa', 800, 400, 'piazzale', -14, 5.84, [0, -1]),
  acquisto('emergenza', 'emergenza', 'piazzale', 2, 5.84, [0, -1]),
  acquisto('aria', 'munizioni', 'piazzale', 22.4, -5.1, [-1, 0]),
  bibita('scatto', 'piazzale', 23.5, 3.2, [-1, 0]),
  muro('mitra', 1200, 600, 'market', -10, 6.16, [0, 1]),
  bibita('lampo', 'market', -15.84, 12.5, [1, 0]),
  acquisto('cassa', 'cassa', 'market', -2, 19.4, [0, -1]),
  muro('doppietta', 1000, 500, 'market', 5.84, 18.5, [-1, 0]),
  acquisto('interruttore', 'interruttore', 'officina', 6.16, 9, [1, 0]),
  muro('carabina', 1600, 800, 'officina', 19, 6.16, [0, 1]),
  bibita('ferro', 'officina', 23.84, 12.5, [-1, 0]),
  acquisto('potenziatore', 'potenziatore', 'officina', 21.5, 18.9, [0, -1]),
  bibita('ritorno', 'retro', -4, 20.6, [0, 1]),
  muro('assalto', 1500, 750, 'retro', 14, 20.16, [0, 1]),
  muro('precisione', 1750, 900, 'retro', -15.84, 34, [1, 0]),
  acquisto('gruppo', 'gruppo', 'retro', 6, 28.2, [0, -1]),
  tanica(0, 'market', -14.4, 19, [1, 0]),
  tanica(1, 'officina', 22.6, 16.8, [-1, 0]),
  tanica(2, 'retro', 5.2, 34.4, [0, 1]),
]);

export const MURALI = Object.freeze(new Set(['arma', 'munizioni', 'interruttore', 'emergenza', 'tanica']));

export const PARTENZE = Object.freeze([[-9, 3.4], [-9, 0.8], [-11.6, 3.4], [-11.6, 0.8]].map(([x, z]) => punto(x, z)));
export const PARTENZE_SALA = Object.freeze([[123, -1.2], [123, 1.2], [121.6, -1.2], [121.6, 1.2]].map(([x, z]) => punto(x, z)));
export const CARTELLO_PRONTI = Object.freeze({ x: 133.84, z: 0, verso: punto(-1, 0) });

export const FRAMMENTI = Object.freeze([
  Object.freeze({ id: 0, x: -1.6, z: 8.9, y: 1.1, santo: 'Doppia Fortuna' }),
  Object.freeze({ id: 1, x: 12.4, z: 19.35, y: 1.05, santo: 'Sette e Mezzo' }),
  Object.freeze({ id: 2, x: -13.4, z: 22.1, y: 1.5, santo: 'Il Turbo Milionario' }),
]);

export const ARREDI = Object.freeze([]);

export const NOMI = Object.freeze({
  cassa: 'Scaffale delle Offerte',
  potenziatore: 'Banco di Rettifica',
  nemici: 'gli Automobilisti Perduti',
  frammento: 'Gratta e vinci',
  raccogli: 'Premi F per prendere il gratta e vinci',
  segreto: 'Tre gratta e vinci vincenti, tutti insieme: avete l\'Orizzonte degli Eventi!',
});

export const OGGETTI = Object.freeze({
  GRUPPO: punto(6, 28.2),
  TORRE: punto(8, 32),
  RAGGIO_GRUPPO: 6,
  ARRIVO_CAMION: punto(15, 33.5),
  SCHIANTO: Object.freeze({ x0: 10, z0: 37.8, x1: 13.8, z1: 38.2 }),
  CAMION_DA: punto(30, 44),
});
