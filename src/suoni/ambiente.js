import {
  DUE_PI, caso, intero, campioni, vuoto, bianco, rosa, marrone, lento, bassa, alta, filtra, gonfia, liscia, normalizza, normalizzaRms,
  mescola, tono, cicla, panorama, aggiungiStereo, stereoVuoto, finisci, finisciStereo, picco,
} from './dsp.js';
import { voce } from './voce.js';
import { goccia, scricchiolio } from './materiali.js';

const SOVRAPPOSIZIONE_S = 1.5;
const RMS_LETTO = 0.12;
const PICCO_LETTO = 0.98;
const RUMORE_DI_FONDO = 1e-6;
const TICK_MS = 200;
const ATTESA_APERTO = 2;
const TICK_SILENZIO = 8;
const VOLUME_AMBIENTE = 0.6;
const VARIAZIONE_LETTO = Object.freeze([0.65, 1.1]);
const ATTESA_LETTO = Object.freeze([4, 8]);
const TAU_ENTRATA_LETTO = 1.5;
const TAU_LETTO = 2.5;

function livella(canali) {
  for (const d of canali) normalizzaRms(d, RMS_LETTO);
  const m = Math.max(...canali.map(picco));
  if (m > PICCO_LETTO) for (const d of canali) normalizza(d, (PICCO_LETTO * picco(d)) / m);
  return canali;
}

function letto(sr, durata, rendiCanale) {
  return livella([0, 1].map(c => cicla(rendiCanale(campioni(durata + SOVRAPPOSIZIONE_S, sr), c), sr, SOVRAPPOSIZIONE_S)));
}

function cicale(sr) {
  const durata = 9 + SOVRAPPOSIZIONE_S;
  const n = campioni(durata, sr);
  const out = stereoVuoto(durata, sr);
  for (let k = 0; k < 3; k++) {
    const voceCicala = normalizza(bassa(filtra(bianco(n), sr, 'banda', caso(2900, 3900), caso(1.6, 2.6)), sr, 4200, 2), 1);
    const fremito = lento(n, sr, caso(5, 9));
    const canto = lento(n, sr, caso(0.12, 0.25));
    for (let i = 0; i < n; i++) voceCicala[i] *= (0.6 + 0.4 * fremito[i]) * liscia(canto[i] * 1.5 - 0.35);
    aggiungiStereo(out, panorama(voceCicala, caso(-0.8, 0.8)), sr, 0, caso(0.5, 1));
  }
  return livella(out.map(d => cicla(d, sr, SOVRAPPOSIZIONE_S)));
}

function grilli(sr) {
  const durata = 10 + SOVRAPPOSIZIONE_S;
  const out = stereoVuoto(durata, sr);
  for (let k = 0; k < 5; k++) {
    const g = vuoto(durata, sr);
    const f = caso(3100, 4100);
    const sillabe = intero(2, 3);
    const passo = caso(1.1, 2.2);
    let t = caso(0, passo);
    while (t < durata - 0.3) {
      for (let s = 0; s < sillabe; s++) tono(g, sr, t + s * 0.05, { f, tau: 0.014, attacco: 0.012, ampiezza: 1, durata: 0.08 });
      t += passo * caso(0.7, 1.4) + (Math.random() < 0.25 ? caso(1.5, 4.5) : 0);
    }
    aggiungiStereo(out, panorama(bassa(g, sr, caso(3600, 4400), 2), caso(-0.9, 0.9)), sr, 0, caso(0.3, 1));
  }
  return livella(out.map(d => cicla(d, sr, SOVRAPPOSIZIONE_S)));
}

function coroRane(sr) {
  const durata = 9 + SOVRAPPOSIZIONE_S;
  const n = campioni(durata, sr);
  const out = stereoVuoto(durata, sr);
  for (let k = 0; k < 4; k++) {
    const r = normalizza(bianco(n), RUMORE_DI_FONDO);
    const passo = caso(0.9, 1.8);
    const pulsazione = caso(45, 80);
    for (let t = caso(0, 1.5); t < durata - 0.3; t += passo * caso(0.7, 1.4) + (Math.random() < 0.3 ? caso(1.5, 4) : 0)) {
      const lunghezza = caso(0.06, 0.12);
      for (let p = 0; p < lunghezza; p += 1 / pulsazione) r[Math.floor((t + p) * sr)] += Math.sin((Math.PI * p) / lunghezza);
    }
    filtra(r, sr, 'banda', caso(450, 950), 2.5);
    aggiungiStereo(out, panorama(bassa(r, sr, 1300, 2), caso(-1, 1)), sr, 0, caso(0.3, 1));
  }
  return livella(out.map(d => cicla(d, sr, SOVRAPPOSIZIONE_S)));
}

function brezza(sr) {
  const durata = 12;
  const raffiche = lento(campioni(durata + SOVRAPPOSIZIONE_S, sr), sr, 0.1);
  return letto(sr, durata, n => {
    const base = alta(alta(normalizza(bassa(marrone(n), sr, 650, 2), 1), sr, 120), sr, 120);
    const soffio = normalizza(filtra(rosa(n), sr, 'banda', 800, 0.5), 1);
    const foglie = normalizza(bassa(filtra(bianco(n), sr, 'banda', 2100, 0.7), sr, 3800), 1);
    const grana = lento(n, sr, 11);
    for (let i = 0; i < n; i++) {
      const g = 0.3 + 0.7 * raffiche[i] ** 1.5;
      base[i] = base[i] * 0.6 * g + soffio[i] * 0.5 * g * g + foglie[i] * 0.3 * g * g * grana[i] ** 2;
    }
    return base;
  });
}

function vento(sr) {
  const durata = 11;
  const raffiche = lento(campioni(durata + SOVRAPPOSIZIONE_S, sr), sr, 0.12);
  return letto(sr, durata, n => {
    const base = normalizza(bassa(marrone(n), sr, 320, 2), 1);
    const fruscio = normalizza(filtra(bianco(n), sr, 'banda', 650, 12), 1);
    for (let i = 0; i < n; i++) {
      const g = 0.25 + 0.75 * raffiche[i] ** 1.5;
      base[i] = base[i] * g + fruscio[i] * 0.25 * g ** 3;
    }
    return base;
  });
}

function acqua(sr) {
  return letto(sr, 9, n => {
    const d = normalizza(rosa(n), 1);
    const onda = lento(n, sr, 0.25);
    for (let i = 0; i < n; i++) d[i] *= 0.8 + 0.2 * onda[i];
    for (let k = 0; k < 50; k++) tono(d, sr, caso(0, n / sr - 0.1), { f: caso(450, 1000), fFine: caso(1000, 1600), glissando: 0.012, tau: 0.012, attacco: 0.002, ampiezza: 0.1 });
    return alta(bassa(d, sr, 1000, 2), sr, 110);
  });
}

const grotta = sr => letto(sr, 9, n => {
  const d = normalizza(bassa(marrone(n), sr, 180, 2), 1);
  mescola(d, normalizza(filtra(marrone(n), sr, 'banda', 65, 4), 1), sr, 0, 0.5);
  return d;
});

function neon(sr) {
  return letto(sr, 6, n => {
    const d = new Float32Array(n);
    [[100, 0.5], [200, 0.3], [300, 0.25], [400, 0.12], [50, 0.2]].forEach(([f, a]) => {
      for (let i = 0; i < n; i++) d[i] += a * Math.sin((DUE_PI * f * i) / sr);
    });
    const brusio = normalizza(filtra(bianco(n), sr, 'banda', 2500, 1), 1);
    const spegni = lento(n, sr, 1.5);
    for (let i = 0; i < n; i++) d[i] = (d[i] + 0.4 * brusio[i] * (0.5 + 0.5 * Math.sin((DUE_PI * 100 * i) / sr)) ** 6) * (spegni[i] > 0.85 ? 0.15 : 1);
    return d;
  });
}

function rana(sr) {
  const tipo = intero(0, 2);
  if (tipo === 2) return voce(sr, caso(0.4, 0.7), { altezza: caso(70, 100), tappe: [['o', 0], ['u', 1]], tratto: 0.55, tremolio: 0.04, ruvidita: 0.3, forma: gonfia(0.15, 1, 0.3) });
  const out = vuoto(0.4, sr);
  const f = tipo === 0 ? caso(90, 140) : caso(300, 500);
  const colpi = tipo === 0 ? 2 : 1;
  for (let c = 0; c < colpi; c++) {
    const lunghezza = tipo === 0 ? 0.09 : 0.07;
    for (let p = 0; p < lunghezza; p += 1 / f) out[Math.floor((c * 0.13 + p) * sr)] += Math.sin((Math.PI * p) / lunghezza);
  }
  const corpo = filtra(out.slice(), sr, 'banda', tipo === 0 ? caso(900, 1500) : caso(1500, 2500), 3);
  mescola(corpo, filtra(out, sr, 'banda', 2200, 4), sr, 0, 0.4);
  return finisci(bassa(corpo, sr, 1800, 2), sr);
}

function uccello(sr) {
  const out = vuoto(1.4, sr);
  const tipo = intero(0, 3);
  const f = caso(1500, 2600);
  if (tipo === 0) for (let k = 0; k < intero(2, 3); k++) tono(out, sr, k * 0.36, { f: f * 1.25, fFine: f, glissando: 0.14, tau: 0.09, attacco: 0.04, ampiezza: 1, armonica: 0.04 });
  if (tipo === 1) {
    const trillo = vuoto(0.9, sr);
    tono(trillo, sr, 0, { f, fFine: f * 0.85, glissando: 0.4, tau: 0.3, attacco: 0.08, ampiezza: 1 });
    for (let i = 0; i < trillo.length; i++) trillo[i] *= 0.7 + 0.3 * Math.sin((DUE_PI * 16 * i) / sr);
    mescola(out, trillo, sr, 0, 1);
  }
  if (tipo === 2) [0, 0.3, 0.55].forEach((t, k) => tono(out, sr, t, { f: f * (0.85 + k * 0.12), fFine: f * (1 + k * 0.15), glissando: 0.06, tau: 0.08, attacco: 0.03, ampiezza: 1 }));
  if (tipo === 3) [0, 0.45].forEach((t, k) => tono(out, sr, t, { f: f * (k ? 1.2 : 1), fFine: f * (k ? 1.4 : 0.9), glissando: 0.12, tau: 0.14, attacco: 0.05, ampiezza: 1, armonica: 0.06 }));
  return finisci(bassa(out, sr, 3400, 2), sr, 0.9, 0.15);
}

function gufo(sr) {
  const out = vuoto(2.3, sr);
  const f = caso(320, 420);
  [[0, 0.35], [0.6, 0.18], [0.85, 0.18], [1.4, 0.6]].forEach(([t, d]) => {
    const hoo = vuoto(d + 0.1, sr);
    tono(hoo, sr, 0, { f, fFine: f * 0.94, glissando: d, tau: d, attacco: 0.04, ampiezza: 1, armonica: 0.08, durata: d });
    for (let i = 0; i < hoo.length; i++) hoo[i] *= gonfia(0.04, d, 0.08)(i / sr);
    mescola(out, hoo, sr, t, 1);
  });
  return finisci(out, sr, 0.9, 0.1);
}

function scimmia(sr) {
  const out = vuoto(4.6, sr);
  let t = 0;
  for (let k = 0; k < intero(4, 6); k++) {
    const d = caso(0.45, 0.75);
    mescola(out, voce(sr, d, { altezza: x => caso(90, 120) * (1 + 0.2 * Math.sin(Math.PI * x)), tappe: [['o', 0], ['u', 0.5], ['o', 1]], tratto: 0.75, ruvidita: 0.6, respiro: 0.4, satura: 1.6, forma: gonfia(0.15, 1, 0.35) }), sr, t, 1);
    t += d + caso(0.15, 0.3);
  }
  return finisci(bassa(out, sr, 1000, 2), sr, 0.9, 0.3);
}

function corvo(sr) {
  const out = vuoto(1.6, sr);
  for (let k = 0; k < intero(2, 4); k++) {
    const base = caso(480, 620);
    mescola(out, voce(sr, caso(0.2, 0.3), { altezza: x => base * (1 - 0.15 * x), tappe: [['a', 0]], tratto: 1.5, tremolio: 0.04, ruvidita: 0.6, respiro: 0.5, satura: 2.5, forma: gonfia(0.05, 1, 0.4) }), sr, k * caso(0.35, 0.5), 1);
  }
  return finisci(out, sr);
}

function fruscio(sr) {
  const durata = caso(1.4, 2.6);
  const n = campioni(durata, sr);
  const d = normalizza(bassa(filtra(bianco(n), sr, 'banda', caso(1700, 2600), 0.6), sr, 4500), 1);
  const grana = lento(n, sr, caso(6, 14));
  const passi = lento(n, sr, 2);
  const forma = gonfia(0.35, durata, 0.6);
  for (let i = 0; i < n; i++) d[i] *= grana[i] ** 3 * (0.4 + 0.6 * passi[i]) * forma(i / sr);
  return finisci(d, sr, 0.9, 0.2);
}

const ricetta = (rendi, varianti = 1) => ({ rendi, varianti, sr: 'medio' });

export const RICETTE_AMBIENTE = Object.freeze({
  g_cicale: ricetta(cicale),
  g_grilli: ricetta(grilli),
  g_rane: ricetta(coroRane),
  g_vento: ricetta(brezza),
  g_acqua: ricetta(acqua),
  g_grotta: ricetta(grotta),
  s_vento: ricetta(vento),
  s_neon: ricetta(neon),
  a_rana: ricetta(rana, 5),
  a_uccello: ricetta(uccello, 5),
  a_gufo: ricetta(gufo, 2),
  a_scimmia: ricetta(scimmia, 2),
  a_fruscio: ricetta(fruscio, 3),
  a_goccia: ricetta(sr => goccia(sr), 4),
  a_corvo: ricetta(corvo, 3),
  a_scricchiolio: ricetta(sr => scricchiolio(sr, caso(0.5, 1.2), { da: caso(12, 25), a: caso(40, 90), risonanza: caso(250, 700) }), 4),
});

const SCENE = Object.freeze({
  giungla: {
    letti: [
      { chiave: 'g_cicale', volume: 0.085, bus: 'esterno', ondata: { quiete: 0.4, fondo: [0, 0.1], cresta: [0.35, 1], ogni: [6, 15], tau: [3, 6] } },
      { chiave: 'g_grilli', volume: 0.08, bus: 'esterno', ondata: { quiete: 0.3, fondo: [0, 0.15], cresta: [0.4, 1], ogni: [5, 12], tau: [2.5, 5] } },
      { chiave: 'g_rane', volume: 0.25, bus: 'esterno', ondata: { quiete: 0.3, fondo: [0, 0.2], cresta: [0.5, 1], ogni: [6, 14], tau: [3, 6] } },
      { chiave: 'g_vento', volume: 0.22, bus: 'esterno' },
      { chiave: 'g_acqua', volume: 0.2, bus: 'esterno' },
      { chiave: 'g_grotta', volume: 0.3, bus: 'interno' },
    ],
    eventi: [
      { chiave: 'a_rana', ogni: 16, spazio: [16, 34], volume: 0.3, bus: 'esterno', individui: [1, 2], richiami: [1, 3], pausa: [0.4, 0.9] },
      { chiave: 'a_uccello', ogni: 20, spazio: [18, 40], volume: 0.26, bus: 'esterno', richiami: [1, 2], pausa: [1.2, 2.5] },
      { chiave: 'a_gufo', ogni: 34, spazio: [18, 38], volume: 0.38, bus: 'esterno' },
      { chiave: 'a_scimmia', ogni: 360, spazio: [90, 130], volume: 0.22, bus: 'esterno' },
      { chiave: 'a_fruscio', ogni: 7, spazio: [5, 14], volume: 0.2, bus: 'esterno' },
      { chiave: 'a_goccia', ogni: 9, spazio: [3, 12], volume: 0.2, bus: 'esterno' },
      { chiave: 'a_goccia', ogni: 1.8, spazio: [2, 14], volume: 0.4, bus: 'interno', soloChiuso: true },
    ],
    aperto: { taglio: 16000, volume: 1, umido: 0.12 },
    chiuso: { taglio: 520, volume: 0.22, umido: 0.55 },
    sottoMusica: 0.3,
  },
  scuola: {
    letti: [{ chiave: 's_vento', volume: 0.22, bus: 'esterno' }, { chiave: 's_neon', volume: 0.08, bus: 'interno' }],
    eventi: [
      { chiave: 'a_corvo', ogni: 22, spazio: [25, 50], volume: 0.35, bus: 'esterno' },
      { chiave: 'a_scricchiolio', ogni: 11, spazio: [4, 16], volume: 0.3, bus: 'interno', soloChiuso: true },
      { chiave: 'a_goccia', ogni: 6, spazio: [3, 12], volume: 0.3, bus: 'interno', soloChiuso: true },
    ],
    aperto: { taglio: 12000, volume: 1, umido: 0.15 },
    chiuso: { taglio: 900, volume: 0.4, umido: 0.35 },
    sottoMusica: 0,
  },
});

export const CHIAVI_SCENA = Object.freeze(Object.fromEntries(Object.entries(SCENE).map(([m, s]) => [m, [...s.letti.map(l => l.chiave), ...s.eventi.map(e => e.chiave)]])));

function creaScena(motore, mappa) {
  const { ctx } = motore;
  const profilo = SCENE[mappa];
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(motore.uscita);
  const esterno = ctx.createBiquadFilter();
  esterno.type = 'lowpass';
  esterno.frequency.value = profilo.aperto.taglio;
  const volumeEsterno = ctx.createGain();
  const interno = ctx.createGain();
  interno.gain.value = 0;
  const mandata = ctx.createGain();
  mandata.gain.value = profilo.aperto.umido;
  esterno.connect(volumeEsterno).connect(master);
  volumeEsterno.connect(mandata).connect(motore.riverbero);
  interno.connect(master);
  const ora = ctx.currentTime;
  return {
    mappa, profilo, master, esterno, volumeEsterno, interno, mandata, sorgenti: [],
    letti: profilo.letti.map(l => ({ ...l, avviato: false, guadagno: null, prossimo: 0 })),
    eventi: profilo.eventi.map(e => ({ ...e, prossimo: ora + e.ogni * caso(0.2, 1.2) })),
  };
}

function applicaChiuso(scena, chiuso, ora) {
  const p = chiuso ? scena.profilo.chiuso : scena.profilo.aperto;
  scena.esterno.frequency.setTargetAtTime(p.taglio, ora, 0.35);
  scena.volumeEsterno.gain.setTargetAtTime(p.volume, ora, 0.4);
  scena.mandata.gain.setTargetAtTime(p.umido, ora, 0.4);
  scena.interno.gain.setTargetAtTime(chiuso ? 1 : 0, ora, 0.5);
}

function chiudiScena(scena, ora) {
  scena.master.gain.setTargetAtTime(0, ora, 0.6);
  setTimeout(() => {
    for (const s of scena.sorgenti) s.stop();
    scena.master.disconnect();
  }, 4000);
}

function onda(l) {
  const o = l.ondata;
  if (!o) return { livello: l.volume * caso(...VARIAZIONE_LETTO), tau: TAU_LETTO, attesa: caso(...ATTESA_LETTO) };
  const livello = Math.random() < o.quiete ? caso(...o.fondo) : caso(...o.cresta);
  return { livello: l.volume * livello, tau: caso(...o.tau), attesa: caso(...o.ogni) };
}

function avviaLetti(motore, scena, ora) {
  for (const l of scena.letti) {
    if (!l.avviato && motore.banco.pronto(l.chiave)) {
      const s = motore.ctx.createBufferSource();
      s.buffer = motore.banco.prendi(l.chiave);
      s.loop = true;
      l.guadagno = motore.ctx.createGain();
      l.guadagno.gain.value = 0;
      const primo = l.ondata ? onda(l) : { livello: l.volume, tau: TAU_ENTRATA_LETTO, attesa: caso(...ATTESA_LETTO) };
      l.guadagno.gain.setTargetAtTime(primo.livello, ora, primo.tau);
      s.connect(l.guadagno).connect(l.bus === 'interno' ? scena.interno : scena.esterno);
      s.start(ora, Math.random() * s.buffer.duration);
      scena.sorgenti.push(s);
      l.avviato = true;
      l.prossimo = ora + primo.attesa;
    } else if (l.avviato && ora > l.prossimo) {
      const prossima = onda(l);
      l.guadagno.gain.setTargetAtTime(prossima.livello, ora, prossima.tau);
      l.prossimo = ora + prossima.attesa;
    }
  }
}

function lancia(motore, scena, e) {
  const individui = intero(...(e.individui ?? [1, 1]));
  const angolo = caso(-Math.PI, Math.PI);
  const distanza = caso(...e.spazio);
  for (let k = 0; k < individui; k++) {
    const buffer = motore.banco.prendi(e.chiave);
    const velocita = caso(0.9, 1.1);
    let ritardo = caso(0, 0.6) * k;
    const strati = [];
    for (let r = 0; r < intero(...(e.richiami ?? [1, 1])); r++) {
      strati.push({ buffer, ritardo, velocita });
      ritardo += buffer.duration / velocita + caso(...(e.pausa ?? [0.3, 0.6]));
    }
    motore.suona(strati, {
      distanza: distanza * caso(0.8, 1.2), angolo: angolo + caso(-0.5, 0.5), volume: e.volume, umido: 0.35, riferimento: 8,
      gruppo: 'ambiente', priorita: 0.5, bus: e.bus === 'interno' ? scena.interno : scena.esterno,
    });
  }
}

function programmaEventi(motore, scena, ora, chiuso) {
  for (const e of scena.eventi) {
    if (ora < e.prossimo) continue;
    e.prossimo = ora + Math.min(3, Math.max(0.3, -Math.log(1 - Math.random()))) * e.ogni;
    if (e.soloChiuso && !chiuso) continue;
    if (!motore.banco.pronto(e.chiave)) {
      motore.banco.prenota(e.chiave);
      continue;
    }
    lancia(motore, scena, e);
  }
}

export function creaAmbiente() {
  const stato = { mappa: null, chiuso: false, attesa: 0, applicato: null, chiamate: 0, viste: 0, silenzio: 0, musica: 0, scena: null, motore: null, timer: null };

  function cambiaScena(ora) {
    if (stato.scena) chiudiScena(stato.scena, ora);
    stato.scena = SCENE[stato.mappa] ? creaScena(stato.motore, stato.mappa) : null;
    for (const chiave of CHIAVI_SCENA[stato.mappa] ?? []) stato.motore.banco.prenota(chiave);
    stato.applicato = null;
  }

  function passo() {
    const motore = stato.motore;
    if (!motore.pronto() || stato.mappa === null) return;
    const ora = motore.ctx.currentTime;
    stato.silenzio = stato.chiamate === stato.viste ? stato.silenzio + 1 : 0;
    stato.viste = stato.chiamate;
    const attivo = stato.silenzio < TICK_SILENZIO;
    if (attivo && stato.scena?.mappa !== stato.mappa) cambiaScena(ora);
    stato.attesa += 1;
    if (stato.applicato !== stato.chiuso && (stato.applicato === null || stato.attesa >= ATTESA_APERTO)) {
      stato.applicato = stato.chiuso;
      motore.impostaAmbiente(stato.mappa, !stato.chiuso);
      if (stato.scena) applicaChiuso(stato.scena, stato.chiuso, ora);
    }
    const scena = stato.scena;
    if (!scena) return;
    const volume = VOLUME_AMBIENTE * (1 - scena.profilo.sottoMusica * stato.musica);
    scena.master.gain.setTargetAtTime(attivo ? volume : 0, ora, attivo ? 1 : 0.5);
    avviaLetti(motore, scena, ora);
    if (attivo) programmaEventi(motore, scena, ora, stato.applicato);
  }

  return {
    avvia(motore) {
      stato.motore = motore;
      if (!stato.timer) stato.timer = setInterval(passo, TICK_MS);
    },
    richiedi(mappa, aperto) {
      stato.chiamate += 1;
      stato.mappa = mappa;
      const chiuso = aperto === false;
      if (chiuso !== stato.chiuso) {
        stato.chiuso = chiuso;
        stato.attesa = 0;
      }
    },
    sottoMusica(livello) {
      stato.musica = livello;
    },
  };
}
