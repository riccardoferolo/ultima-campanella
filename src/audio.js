const VOLUME = 0.5;
const SPARI = Object.freeze({
  pistola: { durata: 0.18, filtro: 1800, volume: 0.6, botto: 110 },
  pompa: { durata: 0.45, filtro: 900, volume: 1, botto: 60 },
  mitra: { durata: 0.12, filtro: 2200, volume: 0.45, botto: 130 },
  assalto: { durata: 0.16, filtro: 1500, volume: 0.6, botto: 90 },
  mitragliatrice: { durata: 0.2, filtro: 1100, volume: 0.7, botto: 70 },
  precisione: { durata: 0.6, filtro: 2600, volume: 1, botto: 55 },
  raggi: { durata: 0.3, filtro: 3000, volume: 0.35, botto: 0, raggio: true },
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
    fine: () => { [196, 165, 131, 98].forEach((f, i) => nota(f, { durata: 1.2, tipo: 'sawtooth', volume: 0.18, ritardo: i * 0.6 })); },
  };

  return {
    prepara,
    suona(nome) {
      if (pronto()) SUONI[nome]?.();
    },
    sparo(arma, distanza = 0, angolo = 0) {
      if (!pronto()) return;
      const s = SPARI[arma] ?? SPARI.pistola;
      const destinazione = distanza > 0 ? spazio(distanza, angolo) : uscita;
      if (s.raggio) {
        nota(1400, { durata: s.durata, tipo: 'square', volume: 0.12, scendi: 180, destinazione });
        nota(700, { durata: s.durata * 1.4, tipo: 'sine', volume: 0.25, scendi: 90, destinazione });
        soffio({ durata: 0.5, da: 900, a: 80, volume: 0.5, ritardo: 0.08, destinazione });
        return;
      }
      soffio({ durata: s.durata, da: s.filtro * 2, a: s.filtro * 0.3, volume: s.volume, destinazione });
      nota(s.botto, { durata: s.durata * 0.8, volume: s.volume * 0.6, scendi: s.botto * 0.4, destinazione });
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
