import { R, ARMI } from '../regole.js';
import { ACQUISTI, OSTACOLI, ZONE, zonaDi } from '../mappa.js';
import { ELEMENTI_RELIQUIE } from '../mappe/palude.js';

export const ELEMENTI = ELEMENTI_RELIQUIE;
export const ARMA_ELEMENTO = Object.freeze({ ghiaccio: 'teschioGhiaccio', fuoco: 'teschioFuoco', vuoto: 'teschioVuoto', vento: 'teschioVento' });
export const PASSO = Object.freeze({ OGGETTI: 0, ANIME: 1, DIFESA: 2, RIPORTA: 3, ACCESA: 4, INFUSIONE: 5, PRONTO: 6, FATTO: 7 });
export const OGGETTI_PER_PROVA = 3;

export const PROVE = Object.freeze({
  ghiaccio: Object.freeze({
    nome: 'Ghiaccio', reliquia: 'Corona di Brina', oggetto: 'la ghiacciaia', verbo: 'gelare',
    oggetti: 'gela col Teschio le tre ghiacciaie (distilleria, baracche, segheria)',
    anime: 'uccidete zombie dentro il tempio di Malakor',
    difesa: 'posa la Corona sulla sorgente gelata delle rapide e difendila',
  }),
  fuoco: Object.freeze({
    nome: 'Fuoco', reliquia: 'Cuore di Brace', oggetto: 'il braciere', verbo: 'accendere',
    oggetti: 'accendi col Teschio i tre bracieri (aia, piazzale, cortile)',
    anime: 'uccidete zombie vicino ai bracieri accesi',
    difesa: 'posa il Cuore nella fornace della distilleria e difendilo',
  }),
  vuoto: Object.freeze({
    nome: 'Vuoto', reliquia: "Occhio dell'Abisso", oggetto: 'la lapide che sussurra', verbo: 'ascoltare',
    oggetti: 'ascolta col Teschio le tre lapidi che sussurrano nel cimitero',
    anime: 'uccidete zombie vicino al mausoleo del cimitero',
    difesa: "posa l'Occhio sulla pozza nera al cuore della palude e difendilo",
  }),
  vento: Object.freeze({
    nome: 'Vento', reliquia: 'Piuma della Bufera', oggetto: 'la girandola', verbo: 'far girare',
    oggetti: 'fai girare col Teschio le tre girandole sulle passerelle',
    anime: 'uccidete zombie stando su una passerella',
    difesa: 'posa la Piuma sotto la torre radio e difendila',
  }),
});

const VICINO_BRACIERE = 6;
const VICINO_MAUSOLEO = 9;
const ZONE_TEMPIO = Object.freeze(['laboratorio', 'scala']);

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const centro = o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 });
const tieneTeschioBase = giocatore => giocatore.armaAttiva === 'teschio';
const haTeschio = giocatore => giocatore.armi.some(a => ARMI[a]?.teschio);
const sullaPasserella = (x, z) => {
  const id = zonaDi(x, z);
  return id === 'imbarcadero' || !!ZONE.find(q => q.id === id)?.passerella;
};

const CONDIZIONI_ANIME = Object.freeze({
  ghiaccio: (giocatore, zombie) => ZONE_TEMPIO.includes(zonaDi(zombie.x, zombie.z)),
  fuoco: (giocatore, zombie) => ACQUISTI.some(a => a.tipo === 'oggettoElemento' && a.elemento === 'fuoco' && distanza(a.posizione, zombie) <= VICINO_BRACIERE),
  vuoto: (giocatore, zombie) => distanza(zombie, centro(OSTACOLI.find(o => o.tipo === 'mausoleo'))) <= VICINO_MAUSOLEO,
  vento: giocatore => sullaPasserella(giocatore.x, giocatore.z),
});

export const puntoDifesa = elemento => ACQUISTI.find(a => a.tipo === 'difesaReliquia' && a.elemento === elemento).posizione;
export const reliquiaLibera = () => ({ da: '', passo: PASSO.OGGETTI, contatore: 0, oggetti: Array(OGGETTI_PER_PROVA).fill(false), progresso: 0, posata: false });
export const statoReliquie = () => Object.fromEntries(ELEMENTI.map(e => [e, reliquiaLibera()]));
export const elementoDi = (palude, id) => ELEMENTI.find(e => palude.elementi[e].da === id) ?? null;

export function armaDallAltare(palude, giocatore) {
  const e = elementoDi(palude, giocatore.id);
  return e && palude.elementi[e].passo === PASSO.FATTO ? ARMA_ELEMENTO[e] : 'teschio';
}

function prendiReliquia(stato, giocatore, elemento, eventi, S) {
  const palude = stato.palude;
  const el = palude.elementi[elemento];
  if (!el.da) {
    if (!haTeschio(giocatore) || elementoDi(palude, giocatore.id)) return;
    el.da = giocatore.id;
    eventi.push({ k: 'reliquiaPresa', a: giocatore.id, elemento });
    return;
  }
  if (el.da !== giocatore.id) return;
  if (el.passo === PASSO.RIPORTA) {
    el.passo = PASSO.ACCESA;
    eventi.push({ k: 'statuaAccesa', a: giocatore.id, elemento });
    return;
  }
  if (el.passo === PASSO.ACCESA && tieneTeschioBase(giocatore)) {
    giocatore.armi = giocatore.armi.filter(a => a !== 'teschio');
    giocatore.armaAttiva = giocatore.armi[0];
    Object.assign(el, { passo: PASSO.INFUSIONE, progresso: 0 });
    eventi.push({ k: 'armi', a: giocatore.id, armi: [...giocatore.armi], arma: giocatore.armaAttiva });
    eventi.push({ k: 'infusione', a: giocatore.id, elemento });
    return;
  }
  if (el.passo !== PASSO.PRONTO) return;
  const vecchio = giocatore.armi.find(a => ARMI[a]?.teschio);
  if (vecchio) giocatore.armi = giocatore.armi.filter(a => a !== vecchio);
  el.passo = PASSO.FATTO;
  S.prendiArma(stato, giocatore, ARMA_ELEMENTO[elemento], eventi, { potenziata: true });
  eventi.push({ k: 'elementoInfuso', a: giocatore.id, elemento });
}

function oggettoProva(stato, giocatore, acquisto, eventi) {
  const el = stato.palude.elementi[acquisto.elemento];
  if (el.da !== giocatore.id || el.passo !== PASSO.OGGETTI || el.oggetti[acquisto.indice]) return;
  if (!ARMI[giocatore.armaAttiva]?.teschio || (giocatore.anime ?? 0) < R.ELEMENTO_COSTO_OGGETTO) return;
  giocatore.anime -= R.ELEMENTO_COSTO_OGGETTO;
  el.oggetti[acquisto.indice] = true;
  const fatti = el.oggetti.filter(Boolean).length;
  eventi.push({ k: 'oggettoElemento', a: giocatore.id, elemento: acquisto.elemento, fatti });
  if (fatti < OGGETTI_PER_PROVA) return;
  el.passo = PASSO.ANIME;
  eventi.push({ k: 'provaElemento', a: giocatore.id, elemento: acquisto.elemento, passo: el.passo });
}

function posaReliquia(stato, giocatore, acquisto, eventi) {
  const el = stato.palude.elementi[acquisto.elemento];
  if (el.da !== giocatore.id || el.passo !== PASSO.DIFESA || el.posata) return;
  el.posata = true;
  eventi.push({ k: 'reliquiaPosata', a: giocatore.id, elemento: acquisto.elemento });
}

export function compraReliquie(stato, giocatore, acquisto, eventi, S) {
  if (acquisto.tipo === 'reliquia') prendiReliquia(stato, giocatore, acquisto.elemento, eventi, S);
  else if (acquisto.tipo === 'oggettoElemento') oggettoProva(stato, giocatore, acquisto, eventi);
  else if (acquisto.tipo === 'difesaReliquia') posaReliquia(stato, giocatore, acquisto, eventi);
  else return false;
  return true;
}

export function uccisioneReliquie(stato, zombie, giocatore, eventi) {
  const palude = stato.palude;
  const e = elementoDi(palude, giocatore.id);
  const el = e ? palude.elementi[e] : null;
  if (!el || el.passo !== PASSO.ANIME || !CONDIZIONI_ANIME[e](giocatore, zombie)) return;
  el.contatore += 1;
  if (el.contatore < R.ELEMENTO_UCCISIONI) return;
  el.passo = PASSO.DIFESA;
  eventi.push({ k: 'provaElemento', a: giocatore.id, elemento: e, passo: el.passo });
}

export const difesaReliquieAttiva = palude => ELEMENTI.some(e => palude.elementi[e].passo === PASSO.DIFESA && palude.elementi[e].posata);

export function aggiornaReliquie(stato, dt, eventi, S) {
  const palude = stato.palude;
  const presenti = new Set(stato.giocatori.map(g => g.id));
  for (const e of ELEMENTI) {
    const el = palude.elementi[e];
    if (el.da && !presenti.has(el.da)) {
      palude.elementi[e] = reliquiaLibera();
      continue;
    }
    if (el.passo === PASSO.DIFESA && el.posata) {
      const punto = puntoDifesa(e);
      const morso = stato.zombie.some(z => z.stato !== 'morto' && distanza(z, punto) <= R.RELIQUIA_MORSO);
      const guardia = S.vivi(stato).some(g => distanza(g, punto) <= R.RELIQUIA_RAGGIO);
      el.sola = guardia ? 0 : (el.sola ?? 0) + dt;
      if (el.sola >= R.RELIQUIA_ABBANDONO) {
        Object.assign(el, { posata: false, sola: 0 });
        eventi.push({ k: 'reliquiaAbbandonata', a: el.da, elemento: e });
        continue;
      }
      if (morso) el.progresso = Math.max(0, el.progresso - dt / R.RELIQUIA_DIFESA);
      else if (guardia) el.progresso = Math.min(1, el.progresso + dt / R.RELIQUIA_DIFESA);
      if (el.progresso < 1) continue;
      Object.assign(el, { passo: PASSO.RIPORTA, posata: false, progresso: 0 });
      eventi.push({ k: 'provaElemento', a: el.da, elemento: e, passo: el.passo });
      continue;
    }
    if (el.passo !== PASSO.INFUSIONE) continue;
    el.progresso = Math.min(1, el.progresso + dt / R.RELIQUIA_INFUSIONE);
    if (el.progresso < 1) continue;
    el.passo = PASSO.PRONTO;
    eventi.push({ k: 'infusioneFinita', a: el.da, elemento: e });
  }
}

export const istantaneaReliquie = palude => ELEMENTI.map(e => {
  const el = palude.elementi[e];
  return [el.da, el.passo, el.contatore, el.oggetti.reduce((m, fatto, i) => m | (fatto ? 1 << i : 0), 0), Math.round(el.progresso * 100), el.posata ? 1 : 0];
});

export const espandiReliquie = pe => Object.fromEntries(ELEMENTI.map((e, i) => {
  const [da, passo, contatore, maschera, progresso, posata] = pe?.[i] ?? ['', PASSO.OGGETTI, 0, 0, 0, 0];
  return [e, { da, passo, contatore, oggetti: Array.from({ length: OGGETTI_PER_PROVA }, (_, k) => !!(maschera & (1 << k))), progresso: (progresso ?? 0) / 100, posata: !!posata }];
}));

const nessuno = testo => ({ costo: Infinity, testo });
const nomeDi = (vista, id) => vista.giocatori.find(g => g.id === id)?.nome ?? 'un altro';

function descriviPiedistallo(a, io, vista) {
  const prova = PROVE[a.elemento];
  const el = vista.palude.elementi[a.elemento];
  const mio = elementoDi(vista.palude, io.id);
  const conTeschio = io.armi.some(x => ARMI[x]?.teschio);
  if (!el.da) {
    if (!conTeschio && !mio) return nessuno(`${prova.reliquia}: il piedistallo si sveglia solo davanti al Teschio di Malakor`);
    if (mio) return nessuno(`Porti già la reliquia del ${PROVE[mio].nome}`);
    return { costo: 0, testo: `Premi F per prendere: ${prova.reliquia}, reliquia del ${prova.nome} (una a testa)` };
  }
  if (el.da !== io.id) return nessuno(`La reliquia del ${prova.nome} l'ha presa ${nomeDi(vista, el.da)}`);
  if (el.passo === PASSO.RIPORTA) return { costo: 0, testo: `Premi F per rimettere la reliquia del ${prova.nome} sul piedistallo` };
  if (el.passo === PASSO.ACCESA) return io.armaAttiva === 'teschio' ? { costo: 0, testo: 'Premi F per posare il Teschio davanti alla statua' } : nessuno('La statua aspetta il Teschio di Malakor: prendilo in mano');
  if (el.passo === PASSO.INFUSIONE) return nessuno(`La statua infonde il ${prova.nome} nel Teschio: ${Math.round(el.progresso * 100)}%`);
  if (el.passo === PASSO.PRONTO) return { costo: 0, testo: `Premi F per prendere il Teschio di ${prova.nome}` };
  if (el.passo === PASSO.FATTO) return nessuno(`La statua del ${prova.nome} veglia sul tuo Teschio`);
  return nessuno(`${prova.reliquia}: ${testoPasso(el, prova)}`);
}

function descriviOggetto(a, io, vista) {
  const prova = PROVE[a.elemento];
  const el = vista.palude.elementi[a.elemento];
  const nome = prova.oggetto[0].toUpperCase() + prova.oggetto.slice(1);
  if (el.da !== io.id) return nessuno(`${nome} risponde solo a chi porta la reliquia del ${prova.nome}`);
  if (el.oggetti[a.indice]) return nessuno(`${nome} è già sveglio`);
  if (el.passo !== PASSO.OGGETTI) return nessuno(`${nome} ha già dato quello che poteva`);
  if (!ARMI[io.armaAttiva]?.teschio) return nessuno(`Serve il Teschio in mano per ${prova.verbo} ${prova.oggetto}`);
  return { costo: 0, testo: `Premi F per ${prova.verbo} ${prova.oggetto} [${R.ELEMENTO_COSTO_OGGETTO} anima]` };
}

function descriviDifesa(a, io, vista) {
  const prova = PROVE[a.elemento];
  const el = vista.palude.elementi[a.elemento];
  if (el.da !== io.id || el.passo !== PASSO.DIFESA) return nessuno(`Un cerchio di rune del ${prova.nome}`);
  if (el.posata) return nessuno(`Difendi la reliquia: ${Math.round(el.progresso * 100)}%`);
  return { costo: 0, testo: `Premi F per posare ${prova.reliquia} nel cerchio` };
}

export function descriviReliquie(a, io, vista) {
  if (a.tipo === 'reliquia') return descriviPiedistallo(a, io, vista);
  if (a.tipo === 'oggettoElemento') return descriviOggetto(a, io, vista);
  if (a.tipo === 'difesaReliquia') return descriviDifesa(a, io, vista);
  return undefined;
}

function testoPasso(el, prova) {
  if (el.passo === PASSO.OGGETTI) return `${prova.oggetti} (${el.oggetti.filter(Boolean).length}/${OGGETTI_PER_PROVA})`;
  if (el.passo === PASSO.ANIME) return `${prova.anime} ${el.contatore}/${R.ELEMENTO_UCCISIONI}`;
  if (el.passo === PASSO.DIFESA) return el.posata ? `difendi la reliquia: ${Math.round(el.progresso * 100)}%` : prova.difesa;
  return '';
}

export function obiettivoReliquia(vista, mioId) {
  const palude = vista.palude;
  const mio = elementoDi(palude, mioId);
  if (!mio) {
    const liberi = ELEMENTI.filter(e => !palude.elementi[e].da);
    return liberi.length ? `Nel tempio si sono accesi i piedistalli: prendi una reliquia (${liberi.map(e => PROVE[e].nome).join(', ')})` : '';
  }
  const el = palude.elementi[mio];
  const prova = PROVE[mio];
  if (el.passo <= PASSO.DIFESA) return `${prova.reliquia}: ${testoPasso(el, prova)}`;
  if (el.passo === PASSO.RIPORTA) return `La reliquia del ${prova.nome} è carica: riportala al suo piedistallo nel tempio`;
  if (el.passo === PASSO.ACCESA) return `La statua del ${prova.nome} brucia: posa il Teschio sul piedistallo`;
  if (el.passo === PASSO.INFUSIONE) return `Infusione del ${prova.nome}: ${Math.round(el.progresso * 100)}%`;
  if (el.passo === PASSO.PRONTO) return `Il Teschio di ${prova.nome} è pronto: prendilo dal piedistallo`;
  return '';
}
