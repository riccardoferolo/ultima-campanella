import { ARMI } from './regole.js';
import { creaMotore } from './suoni/motore.js';
import { creaAmbiente } from './suoni/ambiente.js';
import { RICETTE_ARMI, FAMIGLIE_SPARO } from './suoni/armi.js';
import { RICETTE_ZOMBI, TIPI_LAMENTO } from './suoni/zombi.js';
import { RICETTE_EVENTI } from './suoni/eventi.js';
import { RICETTE_AMBIENTE } from './suoni/ambiente.js';

const VOLUME = 0.5;
const VOLUME_MUSICA = 0.32;
const MANDATA_MUSICA = 0.12;
const CHIAVE_MUSICA = 'campanella.musica';
const ANTICIPO_S = 0.25;
const PROGRAMMA_OGNI_MS = 60;
const BPM = Object.freeze({ silenzio: 60, calma: 56, round: 74, preside: 116, custode: 132 });
const LIVELLI = Object.freeze({ silenzio: 0, calma: 0.55, round: 0.75, preside: 0.9, custode: 1 });
const ACCORDI = Object.freeze({
  normale: [[57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]],
  custode: [[57, 60, 64], [58, 62, 65], [57, 60, 63], [56, 59, 62]],
});
const hz = nota => 440 * 2 ** ((nota - 69) / 12);

function leggiPreferenza() {
  try { return localStorage.getItem(CHIAVE_MUSICA) !== 'no'; } catch { return true; }
}
function salvaPreferenza(si) {
  try {
    localStorage.setItem(CHIAVE_MUSICA, si ? 'si' : 'no');
    return true;
  } catch {
    return false;
  }
}
const RICETTE = Object.freeze({ ...RICETTE_ARMI, ...RICETTE_ZOMBI, ...RICETTE_EVENTI, ...RICETTE_AMBIENTE });
const PRIMA_DA_PREPARARE = Object.freeze([
  ...FAMIGLIE_SPARO.map(f => `sparo_${f}`), 'm_clic', 'm_clac', 'm_slitta', 'm_scivolo', 'm_bossolo', 'fendente_coltello',
  'z_lamento', 'z_rantolo', 'z_ringhio', 'esplosione', 'm_guscio', 'm_pompa', 'm_otturatore', 'm_cricchetto',
  'fendente_giada', 'fendente_sole', 'fendente_serpente', 'sparo_buco', 'sparo_gelo', 'sparo_arco', 'sparo_eco',
  'z_gorgoglio', 'z_inspiro', 'z_urlo', 'm_sibilo', 'm_risucchio', 'm_tonfo', 'e_scatto', 'e_carica', 'e_radio', 'e_anima',
  'e_pietra', 'e_evocazione', 'e_turbine', 'e_onda', 'e_veleno', 'esplosione_grande',
]);
const VOLUMI_SPARO = Object.freeze({ pistola: 0.55, revolver: 0.8, pompa: 0.9, mitra: 0.42, assalto: 0.55, battaglia: 0.65, mitragliatrice: 0.62, precisione: 0.9 });
const ECO_SPARO = Object.freeze({ precisione: 0.5, pompa: 0.35, revolver: 0.3, battaglia: 0.22, mitragliatrice: 0.2, assalto: 0.15 });
const FENDENTI = Object.freeze({ giada: 'fendente_giada', sole: 'fendente_sole', serpente: 'fendente_serpente' });
const ALIENI = Object.freeze({ buco: ['sparo_buco', 0.6], gelo: ['sparo_gelo', 0.35], arco: ['sparo_arco', 0.5] });
const CON_CARRELLO = new Set(['pistola', 'mitra', 'assalto', 'battaglia', 'mitragliatrice']);
const DISTANZA_MASSIMA_LAMENTO = 26;
const DISTANZA_MASSIMA_ESPLOSIONE = 40;
const caso = (a, b) => a + Math.random() * (b - a);

function scegliPesato(elenco) {
  let r = Math.random();
  for (const voce of elenco) {
    r -= voce[1];
    if (r <= 0) return voce;
  }
  return elenco[0];
}

export function creaAudio() {
  let ctx = null;
  let uscita = null;
  let rumore = null;
  let motore = null;
  const ambiente = creaAmbiente();

  function prepara() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    motore = creaMotore(RICETTE, VOLUME);
    ctx = motore.ctx;
    uscita = motore.uscita;
    motore.banco.accoda(PRIMA_DA_PREPARARE);
    ambiente.avvia(motore);
    rumore = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const dati = rumore.getChannelData(0);
    for (let i = 0; i < dati.length; i++) dati[i] = Math.random() * 2 - 1;
  }

  const pronto = () => ctx && ctx.state === 'running';
  const musica = { accesa: leggiPreferenza(), stato: 'silenzio', intensita: 0, uscita: null, filtro: null, pad: [], timer: null, passo: 0, prossimo: 0 };

  function avviaMusica() {
    if (musica.uscita || !ctx) return;
    musica.uscita = ctx.createGain();
    musica.uscita.gain.value = 0;
    musica.uscita.connect(uscita);
    const mandataMusica = ctx.createGain();
    mandataMusica.gain.value = MANDATA_MUSICA;
    musica.uscita.connect(mandataMusica).connect(motore.riverbero);
    musica.filtro = ctx.createBiquadFilter();
    musica.filtro.type = 'lowpass';
    musica.filtro.frequency.value = 500;
    const volumePad = ctx.createGain();
    volumePad.gain.value = 0.045;
    musica.filtro.connect(volumePad).connect(musica.uscita);
    for (let i = 0; i < 3; i++) {
      for (const scarto of [-7, 7]) {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.detune.value = scarto;
        o.frequency.value = hz(ACCORDI.normale[0][i] - 12);
        o.connect(musica.filtro);
        o.start();
        musica.pad.push({ o, voce: i });
      }
    }
    musica.prossimo = ctx.currentTime + 0.1;
    musica.timer = setInterval(programma, PROGRAMMA_OGNI_MS);
  }

  function colpoMusica(frequenza, t, { durata = 0.2, tipo = 'sine', volume = 0.2, scendi = null, filtro = null } = {}) {
    const osc = ctx.createOscillator();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frequenza, t);
    if (scendi) osc.frequency.exponentialRampToValueAtTime(scendi, t + durata);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durata);
    let catena = osc;
    if (filtro) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = filtro;
      f.Q.value = 2;
      catena = osc.connect(f);
    }
    catena.connect(g).connect(musica.uscita);
    osc.start(t);
    osc.stop(t + durata + 0.05);
  }

  function suonaPasso(n, t, durata) {
    const stato = musica.stato;
    const battuta = Math.floor(n / 16) % 4;
    const sedicesimo = n % 16;
    const accordo = ACCORDI[stato === 'custode' ? 'custode' : 'normale'][battuta];
    if (sedicesimo === 0) for (const { o, voce } of musica.pad) o.frequency.setTargetAtTime(hz(accordo[voce] - 12), t, 0.25);
    if (stato === 'calma' || stato === 'silenzio') {
      if (sedicesimo === 0 && Math.random() < 0.55) colpoMusica(hz(accordo[Math.floor(Math.random() * 3)] + 12), t, { durata: 2.6, volume: 0.05 });
      return;
    }
    const capo = stato === 'preside' || stato === 'custode';
    const forte = capo || musica.intensita > 0.45;
    const cassa = forte ? sedicesimo % 4 === 0 : sedicesimo === 0 || sedicesimo === 3;
    if (cassa) colpoMusica(95, t, { durata: 0.32, volume: 0.42, scendi: 38 });
    if (stato === 'custode' && sedicesimo === 10) colpoMusica(95, t, { durata: 0.25, volume: 0.3, scendi: 40 });
    if (sedicesimo % (capo ? 4 : 8) === 0) colpoMusica(hz(accordo[0] - 24), t, { durata: durata * (capo ? 3 : 6), tipo: 'triangle', volume: 0.22 });
    if (forte && sedicesimo % 2 === 0) colpoMusica(hz(accordo[(sedicesimo / 2) % 3] + (capo ? 12 : 0)), t, { durata: 0.09, tipo: 'sawtooth', volume: capo ? 0.05 : 0.035, filtro: 1400 });
    if (capo && sedicesimo === 0 && battuta % 2 === 0) colpoMusica(hz(accordo[0] + 6), t, { durata: durata * 8, tipo: 'sawtooth', volume: 0.03, filtro: 900 });
    if (sedicesimo === 8 && musica.intensita > 0.7) colpoMusica(5000, t, { durata: 0.05, tipo: 'square', volume: 0.012, filtro: 7000 });
  }

  function programma() {
    if (!pronto() || !musica.uscita) return;
    const durata = 60 / BPM[musica.stato] / 4;
    if (musica.prossimo < ctx.currentTime) musica.prossimo = ctx.currentTime + 0.05;
    while (musica.prossimo < ctx.currentTime + ANTICIPO_S) {
      suonaPasso(musica.passo, musica.prossimo, durata);
      musica.passo += 1;
      musica.prossimo += durata;
    }
  }

  function regolaMusica() {
    if (!musica.uscita) return;
    const t = ctx.currentTime;
    const volume = musica.accesa ? LIVELLI[musica.stato] * VOLUME_MUSICA : 0;
    musica.uscita.gain.cancelScheduledValues(t);
    musica.uscita.gain.setTargetAtTime(volume, t, 0.8);
    const capo = musica.stato === 'preside' || musica.stato === 'custode';
    musica.filtro.frequency.setTargetAtTime(capo ? 2400 : 380 + musica.intensita * 1500, t, 0.8);
  }

  function soffio({ durata, da, a = da, tipo = 'lowpass', volume = 0.5, ritardo = 0, destinazione = uscita }) {
    const t = ctx.currentTime + ritardo;
    const fonte = ctx.createBufferSource();
    fonte.buffer = rumore;
    fonte.playbackRate.value = 0.8 + Math.random() * 0.4;
    const filtro = ctx.createBiquadFilter();
    filtro.type = tipo;
    filtro.frequency.setValueAtTime(da, t);
    filtro.frequency.exponentialRampToValueAtTime(Math.max(20, a), t + durata);
    const g = ctx.createGain();
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + durata);
    fonte.connect(filtro).connect(g).connect(destinazione);
    fonte.start(t, Math.random());
    fonte.stop(t + durata + 0.05);
  }

  function nota(frequenza, { durata = 0.2, tipo = 'sine', volume = 0.2, ritardo = 0, scendi = null, destinazione = uscita }) {
    const t = ctx.currentTime + ritardo;
    const osc = ctx.createOscillator();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frequenza, t);
    if (scendi) osc.frequency.exponentialRampToValueAtTime(scendi, t + durata);
    const g = ctx.createGain();
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + durata);
    osc.connect(g).connect(destinazione);
    osc.start(t);
    osc.stop(t + durata + 0.05);
  }

  const buffer = (chiave, opzioni = {}) => motore.suona([{ chiave, velocita: caso(0.95, 1.05) }], { volume: 0.6, umido: 0.15, ...opzioni });
  const dentroPartita = () => musica.stato !== 'calma' && musica.stato !== 'silenzio';

  const SUONI = {
    vuoto: () => nota(900, { durata: 0.04, tipo: 'square', volume: 0.12 }),
    coltello: () => motore.suona([{ chiave: 'fendente_coltello', velocita: caso(0.92, 1.1) }], { volume: 0.5, umido: 0.06, pan: caso(-0.2, 0.2) }),
    carne: () => { soffio({ durata: 0.12, da: 700, a: 200, volume: 0.6 }); nota(90, { durata: 0.1, volume: 0.25, scendi: 50 }); },
    testa: () => { soffio({ durata: 0.16, da: 1200, a: 300, volume: 0.8 }); nota(1400, { durata: 0.06, tipo: 'triangle', volume: 0.12 }); },
    assaRotta: () => { soffio({ durata: 0.3, da: 1400, a: 300, tipo: 'bandpass', volume: 0.9 }); nota(120, { durata: 0.12, volume: 0.3, scendi: 70 }); },
    assaMessa: () => { nota(180, { durata: 0.08, tipo: 'square', volume: 0.25 }); nota(160, { durata: 0.08, tipo: 'square', volume: 0.25, ritardo: 0.16 }); },
    porta: () => { soffio({ durata: 1.2, da: 400, a: 120, volume: 0.6 }); nota(55, { durata: 1, tipo: 'sawtooth', volume: 0.12 }); },
    acquisto: () => { nota(988, { durata: 0.12, tipo: 'triangle', volume: 0.25 }); nota(1319, { durata: 0.3, tipo: 'triangle', volume: 0.25, ritardo: 0.1 }); },
    sorsi: () => {
      nota(2500, { durata: 0.06, tipo: 'triangle', volume: 0.1 });
      soffio({ durata: 0.22, da: 5000, a: 1500, tipo: 'bandpass', volume: 0.3, ritardo: 0.04 });
      for (let i = 0; i < 3; i++) {
        nota(175 - i * 10, { durata: 0.13, volume: 0.35, scendi: 85, ritardo: 0.5 + i * 0.27 });
        soffio({ durata: 0.1, da: 700, a: 200, volume: 0.25, ritardo: 0.51 + i * 0.27 });
      }
      nota(240, { durata: 0.4, tipo: 'sawtooth', volume: 0.04, scendi: 170, ritardo: 1.4 });
      [523, 659, 784, 1046].forEach((f, i) => nota(f, { durata: 0.3, tipo: 'triangle', volume: 0.18, ritardo: 1.55 + i * 0.1 }));
    },
    cassa: () => { [880, 740, 988, 659, 1175].forEach((f, i) => nota(f, { durata: 0.4, tipo: 'sine', volume: 0.18, ritardo: i * 0.22 })); },
    round: () => { [98, 92.5, 87.3, 73.4].forEach((f, i) => nota(f, { durata: 1.1, tipo: 'sawtooth', volume: 0.16, ritardo: i * 0.55 })); soffio({ durata: 2.5, da: 300, a: 60, volume: 0.3 }); },
    fineRound: () => { [73.4, 87.3, 110].forEach((f, i) => nota(f, { durata: 0.9, tipo: 'triangle', volume: 0.18, ritardo: i * 0.4 })); },
    ferito: () => { nota(70, { durata: 0.25, volume: 0.6, scendi: 40 }); soffio({ durata: 0.2, da: 500, a: 150, volume: 0.5 }); },
    aTerra: () => { nota(60, { durata: 1.5, tipo: 'sawtooth', volume: 0.25, scendi: 30 }); },
    rianimato: () => { nota(440, { durata: 0.3, tipo: 'triangle', volume: 0.2 }); nota(660, { durata: 0.5, tipo: 'triangle', volume: 0.2, ritardo: 0.2 }); },
    corrente: () => { nota(60, { durata: 0.25, tipo: 'square', volume: 0.4 }); nota(110, { durata: 2.2, tipo: 'sawtooth', volume: 0.12, ritardo: 0.2, scendi: 120 }); soffio({ durata: 0.6, da: 2000, a: 200, volume: 0.4 }); },
    potenzia: () => { for (let i = 0; i < 6; i++) nota(220 + i * 70, { durata: 0.45, tipo: 'sawtooth', volume: 0.08, ritardo: i * 0.45 }); soffio({ durata: 3, da: 300, a: 2000, tipo: 'bandpass', volume: 0.3 }); },
    potenziata: () => { [392, 523, 659, 1046].forEach((f, i) => nota(f, { durata: 0.4, tipo: 'triangle', volume: 0.22, ritardo: i * 0.09 })); },
    conto: () => nota(660, { durata: 0.15, tipo: 'square', volume: 0.15 }),
    bonusCompare: () => { [1046, 1318].forEach((f, i) => nota(f, { durata: 0.25, tipo: 'sine', volume: 0.15, ritardo: i * 0.1 })); },
    bonus: () => { [523, 784, 1046, 1568].forEach((f, i) => nota(f, { durata: 0.35, tipo: 'triangle', volume: 0.2, ritardo: i * 0.08 })); soffio({ durata: 0.8, da: 4000, a: 600, tipo: 'bandpass', volume: 0.25 }); },
    bomba: () => buffer('esplosione_grande', { volume: 1, umido: 0.45, priorita: 3 }),
    frammento: () => { [1568, 2093, 2637].forEach((f, i) => nota(f, { durata: 0.6, tipo: 'sine', volume: 0.12, ritardo: i * 0.15 })); },
    segreto: () => { [262, 330, 392, 523, 392, 523, 659, 784, 1046].forEach((f, i) => nota(f, { durata: 0.5, tipo: 'triangle', volume: 0.16, ritardo: i * 0.18 })); soffio({ durata: 3, da: 200, a: 3000, tipo: 'bandpass', volume: 0.3 }); },
    campanella: () => { for (let i = 0; i < 6; i++) { nota(1175, { durata: 0.5, tipo: 'sine', volume: 0.18, ritardo: i * 0.16 }); nota(1760, { durata: 0.3, tipo: 'sine', volume: 0.08, ritardo: i * 0.16 }); } },
    lancio: () => { nota(1900, { durata: 0.03, tipo: 'square', volume: 0.08 }); soffio({ durata: 0.28, da: 2600, a: 600, tipo: 'bandpass', volume: 0.35, ritardo: 0.05 }); },
    boss: () => { nota(62, { durata: 1.8, tipo: 'sawtooth', volume: 0.35, scendi: 38 }); nota(93, { durata: 1.5, tipo: 'sawtooth', volume: 0.2, scendi: 52, ritardo: 0.1 }); soffio({ durata: 1.6, da: 900, a: 180, tipo: 'bandpass', volume: 0.7 }); },
    urlo: () => { buffer('z_urlo', { volume: 0.85, umido: 0.4 }); soffio({ durata: 1.1, da: 900, a: 200, volume: 0.25 }); },
    scatto: () => (dentroPartita() ? buffer('e_carica', { volume: 0.8, umido: 0.3 }) : buffer('e_scatto', { volume: 0.35, umido: 0.04 })),
    bossUcciso: () => { [196, 247, 294, 392, 494].forEach((f, i) => nota(f, { durata: 0.6, tipo: 'triangle', volume: 0.18, ritardo: 0.4 + i * 0.12 })); nota(48, { durata: 1.6, tipo: 'sawtooth', volume: 0.4, scendi: 26 }); soffio({ durata: 1.6, da: 1200, a: 60, volume: 0.8 }); },
    fusibile: () => { nota(120, { durata: 0.25, tipo: 'square', volume: 0.07 }); [880, 1320, 1760].forEach((f, i) => nota(f, { durata: 0.35, tipo: 'triangle', volume: 0.16, ritardo: 0.1 + i * 0.1 })); },
    generatore: () => { nota(42, { durata: 2.8, tipo: 'sawtooth', volume: 0.22, scendi: 58 }); nota(84, { durata: 2.6, tipo: 'square', volume: 0.05, ritardo: 0.4 }); soffio({ durata: 2.2, da: 300, a: 900, tipo: 'bandpass', volume: 0.4 }); },
    rifugio: () => { soffio({ durata: 2.4, da: 700, a: 140, volume: 0.8 }); nota(68, { durata: 2, tipo: 'square', volume: 0.1, scendi: 48 }); [330, 262, 196].forEach((f, i) => nota(f, { durata: 1.2, tipo: 'sine', volume: 0.14, ritardo: 0.8 + i * 0.5 })); },
    finale: () => {
      for (let i = 0; i < 5; i++) { nota(392, { durata: 1.8, tipo: 'sine', volume: 0.26, ritardo: i * 0.9 }); nota(587, { durata: 1.2, tipo: 'sine', volume: 0.1, ritardo: i * 0.9 }); }
      nota(55, { durata: 2.4, tipo: 'sawtooth', volume: 0.4, scendi: 33, ritardo: 4.6 });
      soffio({ durata: 2.2, da: 1000, a: 150, tipo: 'bandpass', volume: 0.8, ritardo: 4.6 });
    },
    vittoria: () => { [262, 330, 392, 523, 659, 784, 1046].forEach((f, i) => nota(f, { durata: 0.5, tipo: 'triangle', volume: 0.2, ritardo: i * 0.14 })); [523, 659, 784].forEach(f => nota(f, { durata: 2.4, tipo: 'triangle', volume: 0.14, ritardo: 1.1 })); },
    sfera: () => buffer('sparo_buco', { volume: 0.5, umido: 0.3 }),
    scarica: () => buffer('sparo_arco', { volume: 0.45, umido: 0.25 }),
    radio: () => buffer('e_radio', { volume: 0.45, umido: 0.05 }),
    anima: () => buffer('e_anima', { volume: 0.6, umido: 0.4 }),
    pietra: () => buffer('e_pietra', { volume: 0.8, umido: 0.35 }),
    evocazione: () => buffer('e_evocazione', { volume: 0.8, umido: 0.4 }),
    speciale_turbine: () => buffer('e_turbine', { volume: 0.75, umido: 0.25 }),
    speciale_onda: () => buffer('e_onda', { volume: 0.85, umido: 0.3 }),
    speciale_veleno: () => buffer('e_veleno', { volume: 0.75, umido: 0.3 }),
    buco: () => { nota(40, { durata: 2.4, tipo: 'sine', volume: 0.45, scendi: 70 }); soffio({ durata: 2.6, da: 120, a: 900, tipo: 'bandpass', volume: 0.55 }); },
    implosione: () => { soffio({ durata: 0.35, da: 200, a: 4000, tipo: 'bandpass', volume: 0.6 }); nota(46, { durata: 1.4, tipo: 'sawtooth', volume: 0.5, scendi: 24, ritardo: 0.3 }); soffio({ durata: 1.2, da: 2200, a: 60, volume: 1.1, ritardo: 0.3 }); },
    congelato: () => { nota(2600, { durata: 0.08, tipo: 'triangle', volume: 0.12 }); soffio({ durata: 0.35, da: 8000, a: 3000, tipo: 'highpass', volume: 0.35 }); },
    frantumato: () => { for (let i = 0; i < 6; i++) nota(2200 + Math.random() * 2600, { durata: 0.12, tipo: 'triangle', volume: 0.07, ritardo: i * 0.03 }); soffio({ durata: 0.45, da: 9000, a: 2500, tipo: 'highpass', volume: 0.6 }); },
    fine: () => { [196, 165, 131, 98].forEach((f, i) => nota(f, { durata: 1.2, tipo: 'sawtooth', volume: 0.18, ritardo: i * 0.6 })); },
  };

  const PARTI_RICARICA = {
    caricatore: () => [[0.2, 'm_clic', 0.5], [0.24, 'm_scivolo', 0.45], [0.5, 'm_scivolo', 0.2], [0.6, 'm_scivolo', 0.4], [0.64, 'm_clac', 0.8], [0.8, 'm_scivolo', 0.35], [0.84, 'm_slitta', 0.9]],
    otturatore: () => [[0.2, 'm_clic', 0.5], [0.24, 'm_scivolo', 0.45], [0.6, 'm_scivolo', 0.4], [0.63, 'm_clac', 0.8], [0.74, 'm_otturatore', 0.9]],
    tamburo: () => [[0.15, 'm_clic', 0.6], [0.2, 'm_scivolo', 0.3], ...[0, 1, 2, 3, 4, 5].map(i => [0.3 + caso(0, 0.12), 'm_bossolo', 0.25 + i * 0.02]), [0.62, 'm_scivolo', 0.35], [0.66, 'm_clac', 0.7], [0.78, 'm_clac', 0.8], [0.82, 'm_cricchetto', 0.6]],
    capsula: () => [[0.3, 'm_sibilo', 0.5], [0.55, 'm_risucchio', 0.7], [0.62, 'm_tonfo', 0.6], [0.8, 'm_clac', 0.4]],
  };

  function partiCartucce(colpi) {
    const giri = Math.max(1, Math.min(6, colpi));
    const parti = [];
    for (let i = 0; i < giri; i++) parti.push([0.12 + ((i + 0.55) / giri) * 0.68, 'm_guscio', 0.8]);
    parti.push([0.86, 'm_pompa', 0.9]);
    return parti;
  }

  function ricaricaSuoni(modo, durata, colpi) {
    const parti = modo === 'cartucce' ? partiCartucce(colpi) : (PARTI_RICARICA[modo] ?? PARTI_RICARICA.caricatore)();
    const voce = motore.apriVoce({ volume: 0.55, umido: 0.08, priorita: 3 });
    if (!voce) return null;
    for (const [t, chiave, volume] of parti) motore.aggiungi(voce, { chiave, ritardo: (t + caso(-0.015, 0.015)) * durata, velocita: caso(0.94, 1.06), volume });
    return { ferma: () => motore.zittisci(voce, ctx.currentTime) };
  }

  function fendenteArma(dati, distanza, angolo) {
    const chiave = FENDENTI[dati.reliquia] ?? 'fendente_coltello';
    motore.suona([{ chiave, velocita: caso(0.9, 1.12) }], { distanza, angolo, volume: 0.6, umido: 0.12, riferimento: 2, pan: distanza > 0 ? null : caso(-0.15, 0.15) });
  }

  function stratiMeccanici(dati, famiglia) {
    const strati = [];
    const automatica = dati?.automatica;
    const cadenza = dati?.cadenza ?? 0.5;
    if (CON_CARRELLO.has(famiglia) && (!automatica || Math.random() < 0.35)) strati.push({ chiave: 'm_clic', ritardo: caso(0.012, 0.025), volume: 0.12, velocita: caso(0.9, 1.1) });
    if (famiglia === 'pompa' && !automatica && cadenza >= 0.5) {
      strati.push({ chiave: 'm_pompa', ritardo: cadenza * 0.38, volume: 0.35 }, { chiave: 'm_guscio', ritardo: cadenza * 0.38 + 0.3, volume: 0.1 });
    } else if (famiglia === 'precisione' && cadenza >= 1) {
      strati.push({ chiave: 'm_otturatore', ritardo: cadenza * 0.4, volume: 0.32 }, { chiave: 'm_bossolo', ritardo: cadenza * 0.4 + 0.25, volume: 0.1 });
    } else if (famiglia !== 'revolver' && famiglia !== 'pompa' && Math.random() < (automatica ? 0.18 : 0.6)) {
      strati.push({ chiave: 'm_bossolo', ritardo: caso(0.35, 0.6), volume: 0.1, velocita: caso(0.9, 1.1) });
    }
    return strati;
  }

  function sparoArma(arma, distanza, angolo) {
    const dati = ARMI[arma];
    if (arma === 'coltello' || dati?.bianca) {
      fendenteArma(dati ?? {}, distanza, angolo);
      return;
    }
    const alieno = ALIENI[dati?.suono];
    if (alieno) {
      motore.suona([{ chiave: alieno[0], velocita: caso(0.94, 1.06) }], { distanza, angolo, volume: alieno[1], umido: 0.3, riferimento: 3 });
      return;
    }
    const famiglia = VOLUMI_SPARO[dati?.famiglia] ? dati.famiglia : 'pistola';
    const potenziata = dati?.potenziata;
    const strati = [{ chiave: `sparo_${famiglia}`, velocita: caso(0.96, 1.04) * (potenziata ? 0.95 : 1), ritardo: caso(0, 0.004) }];
    if (distanza === 0) strati.push(...stratiMeccanici(dati, famiglia));
    if (ECO_SPARO[famiglia] && motore.esterno() && (!dati?.automatica || Math.random() < 0.2)) strati.push({ chiave: 'sparo_eco', ritardo: 0.05, volume: ECO_SPARO[famiglia], velocita: caso(0.92, 1.08) });
    motore.suona(strati, { distanza, angolo, volume: VOLUMI_SPARO[famiglia] * caso(0.9, 1.05) * (potenziata ? 1.08 : 1), umido: 0.22, riferimento: 4, taglio: caso(14000, 20000), priorita: distanza === 0 ? 3 : 1.5 });
  }

  return {
    prepara,
    ricarica(modo, durata, colpi) {
      if (!pronto()) return null;
      return ricaricaSuoni(modo, durata, colpi);
    },
    musica(stato, intensita) {
      if (!pronto()) return;
      avviaMusica();
      const cambiaStato = stato !== musica.stato;
      const cambiaIntensita = Math.abs(intensita - musica.intensita) > 0.05;
      if (!cambiaStato && !cambiaIntensita) return;
      musica.stato = stato;
      musica.intensita = intensita;
      regolaMusica();
    },
    alternaMusica() {
      musica.accesa = !musica.accesa;
      salvaPreferenza(musica.accesa);
      regolaMusica();
      return musica.accesa;
    },
    suona(nome) {
      if (pronto()) SUONI[nome]?.();
    },
    sparo(arma, distanza = 0, angolo = 0) {
      if (pronto()) sparoArma(arma, distanza, angolo);
    },
    esplosione(distanza, angolo) {
      if (!pronto() || distanza > DISTANZA_MASSIMA_ESPLOSIONE) return;
      motore.suona([{ chiave: 'esplosione', velocita: caso(0.9, 1.06) }], { distanza: distanza > 1 ? distanza : 0, angolo, volume: 1, umido: 0.4, riferimento: 6, priorita: 3 });
    },
    lamento(distanza, angolo) {
      if (!pronto() || distanza > DISTANZA_MASSIMA_LAMENTO) return;
      const [chiave, , volume] = scegliPesato(TIPI_LAMENTO);
      motore.suona([{ chiave, velocita: caso(0.85, 1.12), ritardo: caso(0, 0.08) }], { distanza, angolo, volume: volume * caso(0.8, 1.1), umido: 0.25, riferimento: 2.5, taglio: caso(5000, 12000), priorita: 0.8 });
    },
    ambiente(mappa, aperto) {
      ambiente.richiedi(mappa, aperto);
    },
  };
}
