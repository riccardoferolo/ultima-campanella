import { ARMI } from './regole.js';

const VOLUME = 0.5;
const VOLUME_MUSICA = 0.32;
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
const SPARI = Object.freeze({
  pistola: { durata: 0.18, filtro: 1800, volume: 0.6, botto: 110 },
  revolver: { durata: 0.3, filtro: 1300, volume: 0.85, botto: 75 },
  pompa: { durata: 0.45, filtro: 900, volume: 1, botto: 60 },
  mitra: { durata: 0.12, filtro: 2200, volume: 0.45, botto: 130 },
  assalto: { durata: 0.16, filtro: 1500, volume: 0.6, botto: 90 },
  battaglia: { durata: 0.22, filtro: 1250, volume: 0.75, botto: 80 },
  mitragliatrice: { durata: 0.2, filtro: 1100, volume: 0.7, botto: 70 },
  precisione: { durata: 0.6, filtro: 2600, volume: 1, botto: 55 },
  aliena: { durata: 0.3, filtro: 3000, volume: 0.35, botto: 0, raggio: true },
});

const SPARI_ALIENI = Object.freeze({
  buco: (nota, soffio, d) => { nota(95, { durata: 0.9, tipo: 'sine', volume: 0.45, scendi: 32, destinazione: d }); nota(190, { durata: 0.6, tipo: 'sawtooth', volume: 0.07, scendi: 60, destinazione: d }); soffio({ durata: 0.8, da: 700, a: 140, tipo: 'bandpass', volume: 0.5, destinazione: d }); },
  gelo: (nota, soffio, d) => { soffio({ durata: 0.16, da: 7000, a: 3200, tipo: 'highpass', volume: 0.22, destinazione: d }); },
  arco: (nota, soffio, d) => { nota(1800, { durata: 0.14, tipo: 'sawtooth', volume: 0.12, scendi: 260, destinazione: d }); nota(62, { durata: 0.22, tipo: 'square', volume: 0.14, destinazione: d }); soffio({ durata: 0.28, da: 5200, a: 800, tipo: 'bandpass', volume: 0.6, destinazione: d }); },
});

export function creaAudio() {
  let ctx = null;
  let uscita = null;
  let rumore = null;

  function prepara() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    ctx = new AudioContext();
    uscita = ctx.createGain();
    uscita.gain.value = VOLUME;
    uscita.connect(ctx.destination);
    rumore = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const dati = rumore.getChannelData(0);
    for (let i = 0; i < dati.length; i++) dati[i] = Math.random() * 2 - 1;
    const vento = ctx.createBufferSource();
    vento.buffer = rumore;
    vento.loop = true;
    const filtroVento = ctx.createBiquadFilter();
    filtroVento.type = 'lowpass';
    filtroVento.frequency.value = 220;
    const volumeVento = ctx.createGain();
    volumeVento.gain.value = 0.05;
    vento.connect(filtroVento).connect(volumeVento).connect(uscita);
    vento.start();
  }

  const pronto = () => ctx && ctx.state === 'running';
  const musica = { accesa: leggiPreferenza(), stato: 'silenzio', intensita: 0, uscita: null, filtro: null, pad: [], timer: null, passo: 0, prossimo: 0 };

  function avviaMusica() {
    if (musica.uscita || !ctx) return;
    musica.uscita = ctx.createGain();
    musica.uscita.gain.value = 0;
    musica.uscita.connect(uscita);
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

  function spazio(distanza, angolo) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, Math.sin(angolo)));
    const g = ctx.createGain();
    g.gain.value = Math.max(0, 1 - distanza / 22);
    panner.connect(g).connect(uscita);
    return panner;
  }

  const SUONI = {
    vuoto: () => nota(900, { durata: 0.04, tipo: 'square', volume: 0.12 }),
    ricarica: () => { nota(500, { durata: 0.05, tipo: 'square', volume: 0.12, ritardo: 0.05 }); nota(320, { durata: 0.06, tipo: 'square', volume: 0.14, ritardo: 0.35 }); },
    coltello: () => soffio({ durata: 0.18, da: 3000, a: 900, tipo: 'bandpass', volume: 0.5 }),
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
    bomba: () => { nota(45, { durata: 2.5, tipo: 'sawtooth', volume: 0.5, scendi: 25 }); soffio({ durata: 2.5, da: 1500, a: 60, volume: 1 }); },
    frammento: () => { [1568, 2093, 2637].forEach((f, i) => nota(f, { durata: 0.6, tipo: 'sine', volume: 0.12, ritardo: i * 0.15 })); },
    segreto: () => { [262, 330, 392, 523, 392, 523, 659, 784, 1046].forEach((f, i) => nota(f, { durata: 0.5, tipo: 'triangle', volume: 0.16, ritardo: i * 0.18 })); soffio({ durata: 3, da: 200, a: 3000, tipo: 'bandpass', volume: 0.3 }); },
    campanella: () => { for (let i = 0; i < 6; i++) { nota(1175, { durata: 0.5, tipo: 'sine', volume: 0.18, ritardo: i * 0.16 }); nota(1760, { durata: 0.3, tipo: 'sine', volume: 0.08, ritardo: i * 0.16 }); } },
    lancio: () => { nota(1900, { durata: 0.03, tipo: 'square', volume: 0.08 }); soffio({ durata: 0.28, da: 2600, a: 600, tipo: 'bandpass', volume: 0.35, ritardo: 0.05 }); },
    boss: () => { nota(62, { durata: 1.8, tipo: 'sawtooth', volume: 0.35, scendi: 38 }); nota(93, { durata: 1.5, tipo: 'sawtooth', volume: 0.2, scendi: 52, ritardo: 0.1 }); soffio({ durata: 1.6, da: 900, a: 180, tipo: 'bandpass', volume: 0.7 }); },
    urlo: () => { nota(118, { durata: 1.1, tipo: 'sawtooth', volume: 0.3, scendi: 58 }); nota(176, { durata: 0.9, tipo: 'sawtooth', volume: 0.15, scendi: 90 }); soffio({ durata: 1.1, da: 1600, a: 300, tipo: 'bandpass', volume: 0.7 }); },
    scatto: () => { soffio({ durata: 0.7, da: 450, a: 110, volume: 0.8 }); nota(52, { durata: 0.7, volume: 0.45, scendi: 34 }); },
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
    sfera: () => SPARI_ALIENI.buco(nota, soffio, uscita),
    scarica: () => SPARI_ALIENI.arco(nota, soffio, uscita),
    buco: () => { nota(40, { durata: 2.4, tipo: 'sine', volume: 0.45, scendi: 70 }); soffio({ durata: 2.6, da: 120, a: 900, tipo: 'bandpass', volume: 0.55 }); },
    implosione: () => { soffio({ durata: 0.35, da: 200, a: 4000, tipo: 'bandpass', volume: 0.6 }); nota(46, { durata: 1.4, tipo: 'sawtooth', volume: 0.5, scendi: 24, ritardo: 0.3 }); soffio({ durata: 1.2, da: 2200, a: 60, volume: 1.1, ritardo: 0.3 }); },
    congelato: () => { nota(2600, { durata: 0.08, tipo: 'triangle', volume: 0.12 }); soffio({ durata: 0.35, da: 8000, a: 3000, tipo: 'highpass', volume: 0.35 }); },
    frantumato: () => { for (let i = 0; i < 6; i++) nota(2200 + Math.random() * 2600, { durata: 0.12, tipo: 'triangle', volume: 0.07, ritardo: i * 0.03 }); soffio({ durata: 0.45, da: 9000, a: 2500, tipo: 'highpass', volume: 0.6 }); },
    fine: () => { [196, 165, 131, 98].forEach((f, i) => nota(f, { durata: 1.2, tipo: 'sawtooth', volume: 0.18, ritardo: i * 0.6 })); },
  };

  function ricaricaSuoni(modo, durata, colpi) {
    const g = ctx.createGain();
    g.connect(uscita);
    const clic = (t, f = 1200) => nota(f, { durata: 0.035, tipo: 'square', volume: 0.12, ritardo: t * durata, destinazione: g });
    const metallo = (t, da = 3200, a = 900, volume = 0.3) => soffio({ durata: 0.09, da, a, tipo: 'bandpass', volume, ritardo: t * durata, destinazione: g });
    const tonfo = (t, f = 280) => nota(f, { durata: 0.06, tipo: 'square', volume: 0.22, scendi: f * 0.6, ritardo: t * durata, destinazione: g });
    if (modo === 'caricatore' || modo === 'otturatore') {
      clic(0.24);
      metallo(0.25);
      metallo(0.5, 6000, 2500, 0.18);
      tonfo(0.62);
      metallo(0.62, 2000, 600, 0.4);
      if (modo === 'otturatore') {
        [0.76, 0.8, 0.84, 0.88].forEach((t, i) => { clic(t, 700 + i * 120); metallo(t, 2600, 900, 0.2); });
      } else {
        clic(0.82, 900);
        metallo(0.82, 2500, 700, 0.3);
        tonfo(0.87, 420);
      }
    } else if (modo === 'tamburo') {
      clic(0.18, 1500);
      for (let i = 0; i < 6; i++) nota(3000 + Math.random() * 2500, { durata: 0.05, tipo: 'triangle', volume: 0.05, ritardo: (0.3 + i * 0.012) * durata, destinazione: g });
      tonfo(0.66, 360);
      metallo(0.66);
      clic(0.78, 800);
      metallo(0.78, 3000, 800, 0.35);
    } else if (modo === 'cartucce') {
      const giri = Math.max(1, Math.min(6, colpi));
      for (let i = 0; i < giri; i++) {
        const t = 0.12 + ((i + 0.55) / giri) * 0.68;
        tonfo(t, 340);
        metallo(t, 2200, 700, 0.22);
      }
      soffio({ durata: 0.16, da: 1400, a: 300, volume: 0.45, ritardo: 0.87 * durata, destinazione: g });
      tonfo(0.88, 240);
      tonfo(0.93, 380);
    } else {
      soffio({ durata: 0.3, da: 500, a: 90, volume: 0.5, ritardo: 0.55 * durata, destinazione: g });
      nota(190, { durata: 0.3, volume: 0.25, scendi: 70, ritardo: 0.55 * durata, destinazione: g });
      nota(110, { durata: 0.4, tipo: 'sawtooth', volume: 0.05, ritardo: 0.62 * durata, destinazione: g });
    }
    return {
      ferma() {
        g.gain.setValueAtTime(0, ctx.currentTime);
        setTimeout(() => g.disconnect(), 100);
      },
    };
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
      if (!pronto()) return;
      const s = SPARI[ARMI[arma]?.famiglia] ?? SPARI.pistola;
      const destinazione = distanza > 0 ? spazio(distanza, angolo) : uscita;
      const alieno = SPARI_ALIENI[ARMI[arma]?.suono];
      if (alieno) {
        alieno(nota, soffio, destinazione);
        return;
      }
      if (s.raggio) {
        nota(1400, { durata: s.durata, tipo: 'square', volume: 0.12, scendi: 180, destinazione });
        nota(700, { durata: s.durata * 1.4, tipo: 'sine', volume: 0.25, scendi: 90, destinazione });
        soffio({ durata: 0.5, da: 900, a: 80, volume: 0.5, ritardo: 0.08, destinazione });
        return;
      }
      soffio({ durata: s.durata, da: s.filtro * 2, a: s.filtro * 0.3, volume: s.volume, destinazione });
      nota(s.botto, { durata: s.durata * 0.8, volume: s.volume * 0.6, scendi: s.botto * 0.4, destinazione });
    },
    esplosione(distanza, angolo) {
      if (!pronto() || distanza > 40) return;
      const destinazione = distanza > 1 ? spazio(distanza * 0.55, angolo) : uscita;
      nota(52, { durata: 1.3, tipo: 'sawtooth', volume: 0.6, scendi: 24, destinazione });
      soffio({ durata: 1.5, da: 2400, a: 70, volume: 1.2, destinazione });
      soffio({ durata: 0.25, da: 7000, a: 1500, tipo: 'highpass', volume: 0.45, destinazione });
    },
    lamento(distanza, angolo) {
      if (!pronto() || distanza > 20) return;
      const destinazione = spazio(distanza, angolo);
      const base = 70 + Math.random() * 50;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.linearRampToValueAtTime(base * (0.7 + Math.random() * 0.5), t + 0.9);
      const filtro = ctx.createBiquadFilter();
      filtro.type = 'bandpass';
      filtro.frequency.value = 400 + Math.random() * 300;
      filtro.Q.value = 4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1);
      osc.connect(filtro).connect(g).connect(destinazione);
      osc.start(t);
      osc.stop(t + 1.05);
    },
  };
}
