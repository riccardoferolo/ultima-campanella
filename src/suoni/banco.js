const SR_MEDIO = 24000;
const SR_ALTO_MASSIMO = 48000;
const BUDGET_MS = 8;
const PAUSA_MS = 20;

export function creaBanco(ctx, ricette) {
  const pronti = new Map();
  const ultimi = new Map();
  const coda = [];
  let attivo = false;
  const frequenza = r => (r.sr === 'contesto' ? ctx.sampleRate : r.sr === 'medio' ? SR_MEDIO : Math.min(ctx.sampleRate, SR_ALTO_MASSIMO));

  function rendiUna(chiave) {
    const ricetta = ricette[chiave];
    const sr = frequenza(ricetta);
    const dati = ricetta.rendi(sr);
    const canali = dati instanceof Float32Array ? [dati] : dati;
    const buffer = ctx.createBuffer(canali.length, canali[0].length, sr);
    canali.forEach((c, i) => buffer.getChannelData(i).set(c));
    if (!pronti.has(chiave)) pronti.set(chiave, []);
    pronti.get(chiave).push(buffer);
  }

  const mancanti = chiave => (ricette[chiave]?.varianti ?? 0) - (pronti.get(chiave)?.length ?? 0);

  function lavora() {
    const inizio = performance.now();
    while (coda.length && performance.now() - inizio < BUDGET_MS) {
      const chiave = coda.shift();
      if (mancanti(chiave) > 0) rendiUna(chiave);
    }
    attivo = coda.length > 0;
    if (attivo) setTimeout(lavora, PAUSA_MS);
  }

  function accoda(chiavi, inTesta = false) {
    const nuove = [];
    for (const chiave of chiavi) for (let k = 0; k < mancanti(chiave); k++) nuove.push(chiave);
    if (inTesta) coda.unshift(...nuove);
    else coda.push(...nuove);
    if (!attivo && coda.length) {
      attivo = true;
      setTimeout(lavora, PAUSA_MS);
    }
  }

  function prendi(chiave) {
    if (!pronti.get(chiave)?.length) rendiUna(chiave);
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
  };
}
