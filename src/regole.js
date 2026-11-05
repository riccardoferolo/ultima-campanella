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

  COSTO_CASSA: 950,
  DURATA_CASSA: 8,
});

export const ARMI = Object.freeze({
  pistola: Object.freeze({ nome: 'Pistola', danno: 40, cadenza: 0.22, automatica: false, caricatore: 8, riserva: 48, ricarica: 1.4, pallini: 1, dispersione: 0.004 }),
  pompa: Object.freeze({ nome: 'Fucile a pompa', danno: 35, cadenza: 0.85, automatica: false, caricatore: 6, riserva: 36, ricarica: 3, pallini: 8, dispersione: 0.07 }),
  mitra: Object.freeze({ nome: 'Mitra', danno: 32, cadenza: 0.075, automatica: true, caricatore: 30, riserva: 150, ricarica: 2.2, pallini: 1, dispersione: 0.03 }),
  assalto: Object.freeze({ nome: "Fucile d'assalto", danno: 60, cadenza: 0.1, automatica: true, caricatore: 30, riserva: 150, ricarica: 2.4, pallini: 1, dispersione: 0.018 }),
  mitragliatrice: Object.freeze({ nome: 'Mitragliatrice', danno: 55, cadenza: 0.07, automatica: true, caricatore: 100, riserva: 300, ricarica: 4, pallini: 1, dispersione: 0.035 }),
  precisione: Object.freeze({ nome: 'Fucile di precisione', danno: 500, cadenza: 1.2, automatica: false, caricatore: 5, riserva: 30, ricarica: 3, pallini: 1, dispersione: 0, mirino: true }),
  raggi: Object.freeze({ nome: 'Pistola a raggi', danno: 600, cadenza: 0.35, automatica: false, caricatore: 20, riserva: 160, ricarica: 2.6, pallini: 1, dispersione: 0.006, esplosione: Object.freeze({ raggio: 1.8, danno: 400 }) }),
});

export const COLTELLO = Object.freeze({ danno: 150, attesa: 0.6, portata: 1.6 });
export const ARMI_CASSA = Object.freeze(['pompa', 'mitra', 'assalto', 'mitragliatrice', 'precisione', 'raggi']);
export const PESI_CASSA = Object.freeze({ pompa: 1, mitra: 1, assalto: 1, mitragliatrice: 0.8, precisione: 0.8, raggi: 0.4 });

export const BEVANDE = Object.freeze({
  ferro: Object.freeze({ nome: 'Bibita Ferro', descrizione: 'più vita', costo: 2500, colore: 0xc0392b }),
  lampo: Object.freeze({ nome: 'Bibita Lampo', descrizione: 'ricarica veloce', costo: 2000, colore: 0x27ae60 }),
  ritorno: Object.freeze({ nome: 'Bibita Ritorno', descrizione: 'rianimi in fretta', costo: 1500, colore: 0x2e86de }),
});

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
