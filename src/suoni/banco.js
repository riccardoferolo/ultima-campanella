import { rendi } from './ricette.js';

const SR_MEDIO = 24000;
const SR_ALTO_MASSIMO = 48000;
const BUDGET_MS = 8;
const PAUSA_MS = 20;
const IN_VOLO_MASSIMI = 2;

export function creaBanco(ctx, ricette, { lavoratore = null } = {}) {
  const pronti = new Map();
  const ultimi = new Map();
  const inVolo = new Map();
  const ascoltatori = [];
  const coda = [];
  let fabbrica = lavoratore;
  let occupati = 0;
  let attivo = false;
  const frequenza = r => (r.sr === 'contesto' ? ctx.sampleRate : r.sr === 'medio' ? SR_MEDIO : Math.min(ctx.sampleRate, SR_ALTO_MASSIMO));
  const inArrivo = chiave => inVolo.get(chiave) ?? 0;
  const mancanti = chiave => (ricette[chiave]?.varianti ?? 0) - (pronti.get(chiave)?.length ?? 0) - inArrivo(chiave);

  function deposita(chiave, canali, sr) {
    const buffer = ctx.createBuffer(canali.length, canali[0].length, sr);
    canali.forEach((c, i) => buffer.getChannelData(i).set(c));
    if (!pronti.has(chiave)) pronti.set(chiave, []);
    pronti.get(chiave).push(buffer);
    for (const ascolta of ascoltatori) ascolta(chiave);
  }

  function rendiQui(chiave) {
    const sr = frequenza(ricette[chiave]);
    deposita(chiave, rendi(ricette, chiave, sr), sr);
  }

  function lavora() {
    const inizio = performance.now();
    while (coda.length && performance.now() - inizio < BUDGET_MS) {
      const chiave = coda.shift();
      if (mancanti(chiave) > 0) rendiQui(chiave);
    }
    attivo = coda.length > 0;
    if (attivo) setTimeout(lavora, PAUSA_MS);
  }

  function spedisci() {
    while (occupati < IN_VOLO_MASSIMI && coda.length) {
      const chiave = coda.shift();
      if (mancanti(chiave) <= 0) continue;
      occupati += 1;
      inVolo.set(chiave, inArrivo(chiave) + 1);
      fabbrica.postMessage({ chiave, sr: frequenza(ricette[chiave]) });
    }
  }

  function avvia() {
    if (fabbrica) spedisci();
    else if (!attivo && coda.length) {
      attivo = true;
      setTimeout(lavora, PAUSA_MS);
    }
  }

  if (fabbrica) {
    fabbrica.onmessage = ({ data }) => {
      occupati -= 1;
      inVolo.set(data.chiave, inArrivo(data.chiave) - 1);
      deposita(data.chiave, data.canali, data.sr);
      spedisci();
    };
    fabbrica.onerror = () => {
      fabbrica = null;
      for (const [chiave, n] of inVolo) for (let k = 0; k < n; k++) coda.unshift(chiave);
      inVolo.clear();
      occupati = 0;
      avvia();
    };
  }

  function accoda(chiavi, inTesta = false) {
    const nuove = [];
    for (const chiave of chiavi) for (let k = 0; k < mancanti(chiave); k++) nuove.push(chiave);
    if (inTesta) coda.unshift(...nuove);
    else coda.push(...nuove);
    avvia();
  }

  function prendi(chiave) {
    if (!pronti.get(chiave)?.length) rendiQui(chiave);
    const varianti = pronti.get(chiave);
    let indice = Math.floor(Math.random() * varianti.length);
    if (varianti.length > 1 && indice === ultimi.get(chiave)) indice = (indice + 1) % varianti.length;
    ultimi.set(chiave, indice);
    return varianti[indice];
  }

  return {
    prendi,
    accoda,
    pronto: chiave => (pronti.get(chiave)?.length ?? 0) > 0,
    prenota: chiave => accoda([chiave], true),
    esiste: chiave => chiave in ricette,
    suPronto: ascolta => ascoltatori.push(ascolta),
  };
}
