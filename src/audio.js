import { ARMI } from './regole.js';

const VOLUME = 0.5;
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
    bevanda: () => { [523, 659, 784].forEach((f, i) => nota(f, { durata: 0.25, tipo: 'triangle', volume: 0.2, ritardo: i * 0.12 })); },
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

  return {
    prepara,
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
