export const R = Object.freeze({
  PASSO: 1 / 60,
  ALTEZZA_OCCHI: 1.6,
  RAGGIO_GIOCATORE: 0.35,
  RAGGIO_ZOMBIE: 0.35,
  VELOCITA: 4.2,
  VELOCITA_CORSA: 6.2,

  PUNTI_INIZIALI: 500,
  PUNTI_COLPO: 10,
  PUNTI_UCCISIONE: 60,
  PUNTI_TESTA: 100,
  PUNTI_COLTELLO: 130,
  PUNTI_ASSA: 10,

  VITA: 100,
  VITA_FERRO: 250,
  RIGENERA_DOPO: 4,
  RIGENERA_AL_SECONDO: 60,
  DANNO_ZOMBIE: 45,
  PORTATA_ZOMBIE: 1.15,
  ATTESA_ATTACCO: 1.4,
  TEMPO_A_TERRA: 30,
  RIANIMA_IN: 4,
  RIANIMA_RAPIDO: 1.5,
  RIANIMA_DISTANZA: 1.8,

  ASSE_PER_FINESTRA: 6,
  ROMPI_ASSE_OGNI: 1.5,
  RICOSTRUISCI_OGNI: 0.8,
  DISTANZA_FINESTRA: 2.2,
  SCAVALCA: 0.9,
  ZOMBIE_VIVI_MAX: 20,
  INTERVALLO: 10,
  VELOCITA_CAMMINA: 1.1,
  VELOCITA_CORRE: 3.6,
  DISTANZA_ACQUISTO: 2,
  DISTANZA_PROVA: 1.3,

  COSTO_CASSA: 950,
  DURATA_CASSA: 8,
  COSTO_POTENZIA: 5000,
  DURATA_POTENZIA: 3,
  ATTESA_RITIRO: 10,

  CONTO_ALLA_ROVESCIA: 5,
  PRIMO_ROUND_TRA: 3,
  VITA_MANICHINO: 3000,
  RINASCITA_MANICHINO: 3,

  PROBABILITA_BONUS: 0.035,
  BONUS_PER_ROUND: 4,
  DURATA_BONUS_A_TERRA: 25,
  DISTANZA_BONUS: 1.3,
  PUNTI_BOMBA: 400,
  PUNTI_CARPENTIERE: 200,
  COSTO_CASSA_SALDI: 10,
  DISTANZA_FRAMMENTO: 1.6,
  PUNTI_SEGRETO: 1000,
});

const arma = dati => Object.freeze({ pallini: 1, dispersione: 0.02, automatica: false, ...dati });
const esplode = (raggio, danno, tipo, colore = null) => Object.freeze({ raggio, danno, tipo, colore });
const aliena = dati => arma({ famiglia: 'aliena', aliena: true, ...dati });

const ARMI_BASE = Object.freeze({
  pistola: arma({ nome: 'Pistola P9', famiglia: 'pistola', modello: 'Pistol_1', danno: 40, cadenza: 0.22, caricatore: 8, riserva: 48, ricarica: 1.4, dispersione: 0.004 }),
  pistolaAuto: arma({ nome: 'Pistola automatica R-18', famiglia: 'pistola', modello: 'Pistol_2', danno: 34, cadenza: 0.06, automatica: true, caricatore: 20, riserva: 120, ricarica: 1.8, dispersione: 0.03 }),
  tattica: arma({ nome: 'Pistola tattica T-40', famiglia: 'pistola', modello: 'Pistol_3', danno: 55, cadenza: 0.18, caricatore: 12, riserva: 72, ricarica: 1.5, dispersione: 0.005 }),
  raffica: arma({ nome: 'Pistola a raffica R-93', famiglia: 'pistola', modello: 'Pistol_4', danno: 38, cadenza: 0.05, automatica: true, caricatore: 30, riserva: 150, ricarica: 2, dispersione: 0.035 }),
  pesante: arma({ nome: 'Pistola pesante .45', famiglia: 'pistola', modello: 'Pistol_5', danno: 80, cadenza: 0.25, caricatore: 8, riserva: 56, ricarica: 1.6, dispersione: 0.006 }),
  aquila: arma({ nome: 'Pistola Aquila .50', famiglia: 'pistola', modello: 'Pistol_6', danno: 140, cadenza: 0.35, caricatore: 7, riserva: 42, ricarica: 2.2, dispersione: 0.008 }),
  magnum: arma({ nome: 'Revolver .357', famiglia: 'revolver', modello: 'Revolver_1', danno: 160, cadenza: 0.45, caricatore: 6, riserva: 36, ricarica: 3, dispersione: 0.006 }),
  ufficiale: arma({ nome: "Revolver d'ordinanza", famiglia: 'revolver', modello: 'Revolver_2', danno: 130, cadenza: 0.4, caricatore: 6, riserva: 42, ricarica: 2.8, dispersione: 0.007 }),
  cannaLunga: arma({ nome: 'Revolver canna lunga', famiglia: 'revolver', modello: 'Revolver_3', danno: 210, cadenza: 0.55, caricatore: 6, riserva: 36, ricarica: 3.1, dispersione: 0.004 }),
  toro: arma({ nome: 'Revolver Toro .500', famiglia: 'revolver', modello: 'Revolver_4', danno: 260, cadenza: 0.6, caricatore: 5, riserva: 30, ricarica: 3.2, dispersione: 0.008 }),
  sceriffo: arma({ nome: 'Revolver dello sceriffo', famiglia: 'revolver', modello: 'Revolver_5', danno: 120, cadenza: 0.3, caricatore: 6, riserva: 48, ricarica: 2.6, dispersione: 0.009 }),
  mitra: arma({ nome: 'Mitra MK-5', famiglia: 'mitra', modello: 'SubmachineGun_1', danno: 32, cadenza: 0.075, automatica: true, caricatore: 30, riserva: 150, ricarica: 2.2, dispersione: 0.03 }),
  scorpione: arma({ nome: 'Mitra Scorpione', famiglia: 'mitra', modello: 'SubmachineGun_2', danno: 26, cadenza: 0.05, automatica: true, caricatore: 20, riserva: 140, ricarica: 1.7, dispersione: 0.045 }),
  vettore: arma({ nome: 'Mitra Vettore', famiglia: 'mitra', modello: 'SubmachineGun_3', danno: 30, cadenza: 0.05, automatica: true, caricatore: 25, riserva: 150, ricarica: 2.1, dispersione: 0.025 }),
  mitraglietta: arma({ nome: 'Mitraglietta U-9', famiglia: 'mitra', modello: 'SubmachineGun_4', danno: 28, cadenza: 0.055, automatica: true, caricatore: 32, riserva: 160, ricarica: 2, dispersione: 0.04 }),
  p50: arma({ nome: 'Mitra P-50', famiglia: 'mitra', modello: 'SubmachineGun_5', danno: 34, cadenza: 0.065, automatica: true, caricatore: 50, riserva: 200, ricarica: 3, dispersione: 0.028 }),
  assalto: arma({ nome: "Fucile d'assalto KV-47", famiglia: 'assalto', modello: 'AssaultRifle_2', danno: 60, cadenza: 0.1, automatica: true, caricatore: 30, riserva: 150, ricarica: 2.4, dispersione: 0.018 }),
  kvCorto: arma({ nome: 'KV-47 corto', famiglia: 'assalto', modello: 'AssaultRifle_1', danno: 52, cadenza: 0.085, automatica: true, caricatore: 30, riserva: 150, ricarica: 2.1, dispersione: 0.026 }),
  galil: arma({ nome: 'Fucile G-35', famiglia: 'assalto', modello: 'AssaultRifle_3', danno: 58, cadenza: 0.09, automatica: true, caricatore: 35, riserva: 175, ricarica: 2.6, dispersione: 0.02 }),
  battaglia: arma({ nome: 'Fucile da battaglia S-17', famiglia: 'battaglia', modello: 'AssaultRifle_4', danno: 85, cadenza: 0.12, automatica: true, caricatore: 20, riserva: 120, ricarica: 2.5, dispersione: 0.016 }),
  kv74: arma({ nome: 'Fucile KV-74', famiglia: 'assalto', modello: 'AssaultRifle_5', danno: 55, cadenza: 0.08, automatica: true, caricatore: 30, riserva: 180, ricarica: 2.3, dispersione: 0.015 }),
  carabina: arma({ nome: 'Carabina M-4', famiglia: 'assalto', modello: 'AssaultRifle2_1', danno: 50, cadenza: 0.08, automatica: true, caricatore: 30, riserva: 180, ricarica: 2.2, dispersione: 0.014 }),
  tiratore: arma({ nome: 'Fucile da tiratore MR-16', famiglia: 'battaglia', modello: 'AssaultRifle2_2', danno: 120, cadenza: 0.18, caricatore: 20, riserva: 120, ricarica: 2.4, dispersione: 0.006 }),
  commando: arma({ nome: 'Carabina Commando', famiglia: 'assalto', modello: 'AssaultRifle2_3', danno: 46, cadenza: 0.07, automatica: true, caricatore: 30, riserva: 180, ricarica: 2, dispersione: 0.022 }),
  m4corta: arma({ nome: 'Carabina corta M-4C', famiglia: 'assalto', modello: 'AssaultRifle2_4', danno: 48, cadenza: 0.075, automatica: true, caricatore: 30, riserva: 180, ricarica: 2.1, dispersione: 0.018 }),
  bullpup: arma({ nome: 'Fucile bullpup F-2000', famiglia: 'assalto', modello: 'Bullpup_1', danno: 48, cadenza: 0.07, automatica: true, caricatore: 30, riserva: 180, ricarica: 2.5, dispersione: 0.016 }),
  fam3: arma({ nome: 'Fucile Fam-3', famiglia: 'assalto', modello: 'Bullpup_2', danno: 45, cadenza: 0.06, automatica: true, caricatore: 25, riserva: 175, ricarica: 2.4, dispersione: 0.02 }),
  mitragliatrice: arma({ nome: 'Mitragliatrice HM-6', famiglia: 'mitragliatrice', modello: 'Bullpup_3', danno: 55, cadenza: 0.07, automatica: true, caricatore: 100, riserva: 300, ricarica: 4, dispersione: 0.035 }),
  pompa: arma({ nome: 'Fucile a pompa 870', famiglia: 'pompa', modello: 'Shotgun_1', danno: 35, cadenza: 0.85, caricatore: 6, riserva: 36, ricarica: 3, pallini: 8, dispersione: 0.07 }),
  sp12: arma({ nome: 'Fucile SP-12', famiglia: 'pompa', modello: 'Shotgun_2', danno: 32, cadenza: 0.3, caricatore: 8, riserva: 48, ricarica: 3.2, pallini: 8, dispersione: 0.075 }),
  aa12: arma({ nome: 'Fucile automatico AA-12', famiglia: 'pompa', modello: 'Shotgun_3', danno: 28, cadenza: 0.2, automatica: true, caricatore: 20, riserva: 80, ricarica: 3.5, pallini: 6, dispersione: 0.08 }),
  caccia: arma({ nome: 'Fucile da caccia', famiglia: 'pompa', modello: 'Shotgun_4', danno: 38, cadenza: 0.6, caricatore: 7, riserva: 42, ricarica: 2.8, pallini: 7, dispersione: 0.06 }),
  doppietta: arma({ nome: 'Doppietta a canne mozze', famiglia: 'pompa', modello: 'Shotgun_SawedOff', danno: 40, cadenza: 0.25, caricatore: 2, riserva: 40, ricarica: 2.2, pallini: 10, dispersione: 0.1 }),
  sfondamento: arma({ nome: 'Pompa da sfondamento', famiglia: 'pompa', modello: 'Shotgun_ShortStock', danno: 42, cadenza: 0.7, caricatore: 5, riserva: 35, ricarica: 2.6, pallini: 8, dispersione: 0.09 }),
  precisione: arma({ nome: 'Precisione L-96', famiglia: 'precisione', modello: 'SniperRifle_1', danno: 500, cadenza: 1.2, caricatore: 5, riserva: 30, ricarica: 3, dispersione: 0, mirino: true }),
  dsv: arma({ nome: 'Precisione semiauto D-SV', famiglia: 'precisione', modello: 'SniperRifle_2', danno: 300, cadenza: 0.4, caricatore: 10, riserva: 50, ricarica: 2.8, dispersione: 0, mirino: true }),
  anticarro: arma({ nome: 'Anticarro .50 B-82', famiglia: 'precisione', modello: 'SniperRifle_3', danno: 900, cadenza: 1, caricatore: 10, riserva: 40, ricarica: 3.6, dispersione: 0, mirino: true }),
  notturno: arma({ nome: 'Precisione notturna N-7', famiglia: 'precisione', modello: 'SniperRifle_4', danno: 420, cadenza: 0.9, caricatore: 6, riserva: 36, ricarica: 2.9, dispersione: 0, mirino: true }),
  bipiede: arma({ nome: 'Precisione col bipiede M-24', famiglia: 'precisione', modello: 'SniperRifle_5', danno: 650, cadenza: 1.3, caricatore: 5, riserva: 30, ricarica: 3.2, dispersione: 0, mirino: true }),
  cacciatore: arma({ nome: 'Carabina del cacciatore', famiglia: 'precisione', modello: 'SniperRifle_6', danno: 360, cadenza: 0.8, caricatore: 5, riserva: 40, ricarica: 2.6, dispersione: 0, mirino: true }),
  raggi: aliena({ nome: 'Pistola a raggi', modello: 'Gun_Pistol', colore: 0x48e5ff, danno: 600, cadenza: 0.35, caricatore: 20, riserva: 160, ricarica: 2.6, dispersione: 0.006, esplosione: esplode(1.8, 400, 'energia') }),
  plasma: aliena({ nome: 'Pistola al plasma', modello: 'Gun_Pistol', colore: 0x5dff6a, danno: 140, cadenza: 0.09, automatica: true, caricatore: 40, riserva: 240, ricarica: 2.2, dispersione: 0.02, esplosione: esplode(0.9, 80, 'energia') }),
  gravitonica: aliena({ nome: 'Pistola gravitonica', modello: 'Gun_Pistol', colore: 0xb066ff, danno: 900, cadenza: 0.7, caricatore: 8, riserva: 64, ricarica: 2.8, dispersione: 0.004, esplosione: esplode(2.6, 700, 'energia') }),
  ioni: aliena({ nome: 'Revolver a ioni', modello: 'Gun_Revolver', colore: 0xffd84a, danno: 1100, cadenza: 0.5, caricatore: 6, riserva: 48, ricarica: 2.6, dispersione: 0.004, esplosione: esplode(1.2, 300, 'energia') }),
  fulmine: aliena({ nome: 'Spara-fulmini', modello: 'Gun_Revolver', colore: 0xbfe8ff, danno: 800, cadenza: 0.8, caricatore: 8, riserva: 40, ricarica: 3, dispersione: 0.004, esplosione: esplode(5, 600, 'fulmine') }),
  impulsi: aliena({ nome: 'Revolver a impulsi', modello: 'Gun_Revolver', colore: 0xff4fd8, danno: 450, cadenza: 0.25, caricatore: 12, riserva: 96, ricarica: 2.4, dispersione: 0.01, esplosione: esplode(1.5, 250, 'energia') }),
  fucilePlasma: aliena({ nome: 'Fucile al plasma', modello: 'Gun_Rifle', colore: 0x3dff8b, danno: 180, cadenza: 0.08, automatica: true, caricatore: 50, riserva: 300, ricarica: 2.8, dispersione: 0.018, esplosione: esplode(1, 110, 'energia') }),
  lanciafiamme: aliena({ nome: 'Fiammatore stellare', modello: 'Gun_Rifle', colore: 0xff7a1a, danno: 30, cadenza: 0.05, automatica: true, caricatore: 100, riserva: 300, ricarica: 3.5, pallini: 5, dispersione: 0.15, portata: 7, fiamma: true }),
  lanciagranate: aliena({ nome: 'Lancia-sfere', modello: 'Gun_Rifle', colore: 0xff3fa8, danno: 300, cadenza: 0.9, caricatore: 4, riserva: 32, ricarica: 2.5, dispersione: 0.01, esplosione: esplode(3, 900, 'fuoco', 0xff3fa8) }),
  lanciarazzi: aliena({ nome: 'Cannone a particelle', modello: 'Gun_Sniper', colore: 0xff3030, danno: 500, cadenza: 1.2, caricatore: 3, riserva: 18, ricarica: 3, dispersione: 0.006, esplosione: esplode(3.5, 1400, 'fuoco') }),
  laser: aliena({ nome: 'Precisione al laser', modello: 'Gun_Sniper', colore: 0x4fd8ff, danno: 1600, cadenza: 0.6, caricatore: 8, riserva: 48, ricarica: 2.8, dispersione: 0, mirino: true, esplosione: esplode(0.8, 300, 'energia') }),
  disintegratore: aliena({ nome: 'Disintegratore', modello: 'Gun_Sniper', colore: 0xe0b0ff, danno: 700, cadenza: 0.1, automatica: true, caricatore: 60, riserva: 360, ricarica: 3, dispersione: 0.01, esplosione: esplode(2, 500, 'energia'), segreta: true }),
});

const NOMI_POTENZIATI = Object.freeze({
  pistola: 'Pistola Rovente',
  pompa: 'Pompa Tempesta',
  mitra: 'Mitra Vespa',
  assalto: 'Assalto Lupo',
  mitragliatrice: 'Mitragliatrice Tuono',
  precisione: 'Precisione Falco',
  raggi: 'Raggi Supernova',
  disintegratore: 'Fine del Mondo',
});
const EPITETI = Object.freeze(['Furia', 'Spettro', 'Cobra', 'Drago', 'Valanga', 'Inferno', 'Tempesta', 'Lupo', 'Falco', 'Vespa', 'Uragano', 'Tuono', 'Vipera']);

function potenzia(base, chiave, indice) {
  return Object.freeze({
    ...base,
    nome: NOMI_POTENZIATI[chiave] ?? `${base.nome} ${EPITETI[indice % EPITETI.length]}`,
    danno: base.danno * 2,
    caricatore: Math.round(base.caricatore * 1.5),
    riserva: base.riserva * 2,
    ricarica: base.ricarica * 0.85,
    esplosione: base.esplosione ? esplode(base.esplosione.raggio * 1.4, base.esplosione.danno * 2, base.esplosione.tipo, base.esplosione.colore) : undefined,
    potenziata: true,
    base: chiave,
  });
}

export const ARMI = Object.freeze({
  ...ARMI_BASE,
  ...Object.fromEntries(Object.entries(ARMI_BASE).map(([chiave, a], i) => [`${chiave}+`, potenzia(a, chiave, i)])),
});

export const ARMI_DI_BASE = Object.freeze(Object.keys(ARMI_BASE));
export const versionePotenziata = a => (a.endsWith('+') ? null : `${a}+`);
export const armaBase = a => (a.endsWith('+') ? a.slice(0, -1) : a);

export const COLTELLO = Object.freeze({ danno: 150, attesa: 0.6, portata: 1.6 });

const PESO_FAMIGLIA = Object.freeze({
  pistola: 1, revolver: 0.9, mitra: 1, assalto: 1, battaglia: 0.8, mitragliatrice: 0.6, pompa: 0.9, precisione: 0.7, aliena: 0.35,
});
export const ARMI_CASSA = Object.freeze(ARMI_DI_BASE.filter(a => a !== 'pistola' && !ARMI_BASE[a].segreta));
export const PESI_CASSA = Object.freeze(Object.fromEntries(ARMI_CASSA.map(a => [a, PESO_FAMIGLIA[ARMI_BASE[a].famiglia]])));

export const BEVANDE = Object.freeze({
  ferro: Object.freeze({ nome: 'Bibita Ferro', descrizione: 'più vita', costo: 2500, colore: 0xc0392b }),
  lampo: Object.freeze({ nome: 'Bibita Lampo', descrizione: 'ricarica veloce', costo: 2000, colore: 0x27ae60 }),
  ritorno: Object.freeze({ nome: 'Bibita Ritorno', descrizione: 'rianimi in fretta', costo: 1500, colore: 0x2e86de }),
});

export const TIPI_ZOMBIE = Object.freeze({
  normale: Object.freeze({ nome: 'Zombie', vita: 1, velocita: 1, danno: 1, portata: 1, punti: 1 }),
  base: Object.freeze({ nome: 'Zombie verde', vita: 1, velocita: 1, danno: 1, portata: 1, punti: 1 }),
  scheletro: Object.freeze({ nome: 'Costola', vita: 0.6, velocita: 1.25, danno: 0.8, portata: 1, punti: 1, corre: true }),
  braccio: Object.freeze({ nome: 'Braccione', vita: 1.5, velocita: 0.95, danno: 1.3, portata: 1.45, punti: 1.5 }),
  grasso: Object.freeze({ nome: 'Ciccione', vita: 3.2, velocita: 0.65, danno: 1.7, portata: 1.1, punti: 2.5 }),
  cane: Object.freeze({ nome: 'Cane infetto', vita: 0.45, velocita: 1.55, danno: 0.6, portata: 0.9, punti: 1, corre: true }),
  manichino: Object.freeze({ nome: 'Manichino', vita: 1, velocita: 0, danno: 0, portata: 0, punti: 0 }),
});
export const ELENCO_TIPI_ZOMBIE = Object.freeze(Object.keys(TIPI_ZOMBIE));

export function pesiZombie(round) {
  return {
    normale: 0.55,
    base: 0.45,
    scheletro: round >= 3 ? 0.18 : 0,
    braccio: round >= 4 ? 0.15 : 0,
    grasso: round >= 5 ? 0.1 + Math.min(0.1, (round - 5) * 0.01) : 0,
    cane: round >= 6 ? 0.12 : 0,
  };
}

export function tipoZombie(round, estratto) {
  const pesi = Object.entries(pesiZombie(round)).filter(([, p]) => p > 0);
  let soglia = estratto * pesi.reduce((somma, [, p]) => somma + p, 0);
  for (const [tipo, p] of pesi) {
    soglia -= p;
    if (soglia < 0) return tipo;
  }
  return pesi[pesi.length - 1][0];
}

export const BONUS = Object.freeze({
  bomba: Object.freeze({ nome: 'Bomba!', descrizione: 'tutti gli zombie saltano in aria', colore: 0xff6a2a, simbolo: 'BOOM' }),
  munizioni: Object.freeze({ nome: 'Munizioni al massimo', descrizione: 'tutte le armi cariche', colore: 0x9be15d, simbolo: 'MAX' }),
  doppi: Object.freeze({ nome: 'Punti doppi', descrizione: 'per 30 secondi', colore: 0xffd84a, simbolo: 'x2', durata: 30 }),
  secco: Object.freeze({ nome: 'Colpo secco', descrizione: 'ogni colpo uccide, 30 secondi', colore: 0xf2f2f2, simbolo: '☠', durata: 30 }),
  saldi: Object.freeze({ nome: 'Saldi!', descrizione: 'la cassa costa 10 punti, 30 secondi', colore: 0x4fc3ff, simbolo: '%', durata: 30 }),
  carpentiere: Object.freeze({ nome: 'Carpentiere', descrizione: 'tutte le finestre riparate', colore: 0xc28b4e, simbolo: '⚒' }),
  infinite: Object.freeze({ nome: 'Caricatore infinito', descrizione: 'niente ricarica per 30 secondi', colore: 0xff4fd8, simbolo: '∞', durata: 30 }),
});
export const ELENCO_BONUS = Object.freeze(Object.keys(BONUS));
export const BONUS_A_TEMPO = Object.freeze(ELENCO_BONUS.filter(b => BONUS[b].durata));

export function zombieDelRound(round) {
  return 6 + 3 * (round - 1);
}

export function vitaZombie(round) {
  if (round < 10) return 150 + 100 * (round - 1);
  return Math.round(950 * 1.1 ** (round - 9));
}

export function quotaCorridori(round) {
  if (round <= 2) return 0;
  if (round === 3) return 0.25;
  if (round === 4) return 0.5;
  if (round < 8) return 0.8;
  return 1;
}

export function attesaComparsa(round) {
  return Math.max(0.6, 2 - (round - 1) * 0.15);
}
