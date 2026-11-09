import { creaBanco } from './banco.js';

const VOCI_MASSIME = Object.freeze({ effetti: 24, ambiente: 10 });
const RIFERIMENTO = 3;
const ARIA_M = 32;
const TAGLIO_MINIMO = 650;
const TAGLIO_MASSIMO = 20000;
const APERTURA_PAN = 0.85;
const PESO_ETA = 0.5;
const PULIZIA_MS = 1000;
const IMPULSI = Object.freeze({
  scuola: { aperto: 'ir_cortile', chiuso: 'ir_stanza', umido: { aperto: 0.7, chiuso: 1 } },
  giungla: { aperto: 'ir_giungla', chiuso: 'ir_grotta', umido: { aperto: 0.8, chiuso: 1.3 } },
});

const attenua = (d, rif) => (d <= rif ? 1 : rif / d);
const limita = (x, a, b) => Math.min(b, Math.max(a, x));

function creaRiverbero(ctx, uscita) {
  const ingresso = ctx.createGain();
  const filtro = ctx.createBiquadFilter();
  filtro.type = 'highpass';
  filtro.frequency.value = 110;
  ingresso.connect(filtro);
  const rami = ['aperto', 'chiuso'].map(lato => {
    const g = ctx.createGain();
    g.gain.value = lato === 'chiuso' ? 1 : 0;
    filtro.connect(g);
    return { lato, g, c: null, chiave: null };
  });
  return { ingresso, rami };
}

function impostaRamo(ctx, ramo, buffer, chiave, uscita) {
  if (ramo.chiave === chiave) return;
  const nuovo = ctx.createConvolver();
  nuovo.buffer = buffer;
  ramo.g.disconnect();
  ramo.g.connect(nuovo).connect(uscita);
  ramo.c?.disconnect();
  ramo.c = nuovo;
  ramo.chiave = chiave;
}

export function creaMotore(ricette, volume) {
  const ctx = new AudioContext();
  const compressore = ctx.createDynamicsCompressor();
  compressore.threshold.value = -14;
  compressore.knee.value = 10;
  compressore.ratio.value = 3.5;
  compressore.attack.value = 0.004;
  compressore.release.value = 0.25;
  compressore.connect(ctx.destination);
  const uscita = ctx.createGain();
  uscita.gain.value = volume;
  uscita.connect(compressore);
  const riverbero = creaRiverbero(ctx, uscita);
  const banco = creaBanco(ctx, ricette);
  const pool = { effetti: [], ambiente: [] };
  const spente = [];
  const ambiente = { mappa: 'scuola', aperto: false, umido: 1 };

  const pronto = () => ctx.state === 'running';

  function stacca(v) {
    v.filtro.disconnect();
    v.guadagno.disconnect();
    v.panner.disconnect();
    v.mandata?.disconnect();
  }

  function pulisci(ora) {
    for (const voci of [pool.effetti, pool.ambiente]) {
      for (let i = voci.length - 1; i >= 0; i--) {
        if (voci[i].fine + 0.1 >= ora) continue;
        stacca(voci[i]);
        voci.splice(i, 1);
      }
    }
    for (let i = spente.length - 1; i >= 0; i--) {
      if (spente[i].fine >= ora) continue;
      stacca(spente[i]);
      spente.splice(i, 1);
    }
  }

  function zittisci(v, ora) {
    v.guadagno.gain.setTargetAtTime(0, ora, 0.01);
    v.mandata?.gain.setTargetAtTime(0, ora, 0.01);
    for (const s of v.sorgenti) s.stop(ora + 0.06);
    v.sorgenti = [];
    v.fine = ora + 0.1;
    spente.push(v);
  }

  function faiSpazio(voci, peso, ora, massimo) {
    if (voci.length < massimo) return true;
    let indice = -1;
    let minimo = Infinity;
    voci.forEach((v, i) => {
      const p = v.peso / (1 + (ora - v.nato) * PESO_ETA);
      if (p < minimo) {
        minimo = p;
        indice = i;
      }
    });
    if (peso <= minimo) return false;
    zittisci(voci[indice], ora);
    voci.splice(indice, 1);
    return true;
  }

  function apriVoce({ distanza = 0, angolo = 0, volume = 1, umido = 0.2, taglio = TAGLIO_MASSIMO, riferimento = RIFERIMENTO, gruppo = 'effetti', priorita = 1, bus = uscita, pan = null } = {}) {
    const ora = ctx.currentTime;
    pulisci(ora);
    const att = attenua(distanza, riferimento);
    const peso = volume * att * priorita;
    if (!faiSpazio(pool[gruppo], peso, ora, VOCI_MASSIME[gruppo])) return null;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    const dietro = distanza > 1 && Math.cos(angolo) < 0 ? 1 + 0.35 * Math.cos(angolo) : 1;
    filtro.frequency.value = limita(taglio * Math.exp(-distanza / ARIA_M) * dietro, TAGLIO_MINIMO, TAGLIO_MASSIMO);
    const guadagno = ctx.createGain();
    guadagno.gain.value = volume * att;
    const panner = ctx.createStereoPanner();
    panner.pan.value = pan ?? (distanza > 0 ? limita(Math.sin(angolo) * APERTURA_PAN * Math.min(1, distanza / 1.5), -1, 1) : 0);
    filtro.connect(guadagno).connect(panner).connect(bus);
    let mandata = null;
    if (umido > 0) {
      mandata = ctx.createGain();
      mandata.gain.value = volume * umido * ambiente.umido * (0.35 + 0.65 * Math.sqrt(att));
      filtro.connect(mandata).connect(riverbero.ingresso);
    }
    const voce = { filtro, guadagno, panner, mandata, sorgenti: [], fine: ora, nato: ora, peso };
    pool[gruppo].push(voce);
    return voce;
  }

  function aggiungi(voce, { buffer, chiave, ritardo = 0, velocita = 1, volume = 1 }) {
    const sorgente = ctx.createBufferSource();
    sorgente.buffer = buffer ?? banco.prendi(chiave);
    sorgente.playbackRate.value = velocita;
    if (volume === 1) sorgente.connect(voce.filtro);
    else {
      const g = ctx.createGain();
      g.gain.value = volume;
      sorgente.connect(g).connect(voce.filtro);
    }
    const t = ctx.currentTime + Math.max(0, ritardo);
    sorgente.start(t);
    voce.sorgenti.push(sorgente);
    voce.fine = Math.max(voce.fine, t + sorgente.buffer.duration / velocita);
  }

  function suona(strati, opzioni) {
    const voce = apriVoce(opzioni);
    if (voce) for (const s of strati) aggiungi(voce, s);
    return voce;
  }

  function impostaAmbiente(mappa, aperto) {
    const scelta = IMPULSI[mappa] ?? IMPULSI.scuola;
    ambiente.mappa = mappa;
    ambiente.aperto = aperto;
    ambiente.umido = scelta.umido[aperto ? 'aperto' : 'chiuso'];
    const ora = ctx.currentTime;
    for (const ramo of riverbero.rami) {
      const chiave = scelta[ramo.lato];
      impostaRamo(ctx, ramo, banco.prendi(chiave), chiave, uscita);
      ramo.g.gain.setTargetAtTime((ramo.lato === 'aperto') === aperto ? 1 : 0, ora, 0.35);
    }
  }

  impostaAmbiente('scuola', false);
  setInterval(() => pulisci(ctx.currentTime), PULIZIA_MS);

  return {
    ctx, uscita, banco, pronto, suona, apriVoce, aggiungi, zittisci, impostaAmbiente,
    riverbero: riverbero.ingresso,
    esterno: () => ambiente.aperto,
  };
}
