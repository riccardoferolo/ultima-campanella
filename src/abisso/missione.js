import { R, ARMI, ARMI_CASSA, PESI_CASSA, versionePotenziata, armaBase } from '../regole.js';
import { quota } from '../mappa.js';
import { BARRE, CONDOTTI, OGGETTI, PARTENZE_RITORNO, CANNE } from '../mappe/abisso.js';
import { A, PASSO, ELENCO_BEVANDE, ARMI_MERAVIGLIA } from './costanti.js';
import { distanza, dialogo } from './stato.js';
import { allaga, svuota, suReale } from './acqua.js';
import { palombariVivi } from './palombaro.js';
import { inizia as iniziaLeviatano } from './leviatano.js';

const PESO_MERAVIGLIA = 0.32;
const DENTRO_STAGNA = OGGETTI.STAGNA;

const migliore = a => (ARMI[a]?.teschio || !ARMI[versionePotenziata(a) ?? ''] ? a : versionePotenziata(a));
const possiede = (g, arma) => g.armi.some(a => armaBase(a) === arma);
const dentroStagna = p => p.x > DENTRO_STAGNA.x0 && p.x < DENTRO_STAGNA.x1 && p.z > DENTRO_STAGNA.z0 && p.z < DENTRO_STAGNA.z1;

function avanza(ab, da, a, eventi, chiave) {
  if (ab.passo !== da) return false;
  ab.passo = a;
  eventi.push({ k: 'passoAbisso', passo: a });
  if (chiave) dialogo(ab, chiave, eventi);
  return true;
}

function scrigno(stato, giocatore, eventi, S) {
  const cassa = stato.cassa;
  if (cassa.stato === 'aperta' && cassa.per === giocatore.id) {
    const arma = cassa.arma;
    Object.assign(cassa, { stato: 'chiusa', arma: null, per: null, timer: 0 });
    S.prendiArma(stato, giocatore, arma, eventi, { daCassa: true });
    return;
  }
  const costo = stato.effetti.saldi > 0 ? R.COSTO_CASSA_SALDI : R.COSTO_CASSA;
  if (cassa.stato !== 'chiusa' || giocatore.punti < costo) return;
  giocatore.punti -= costo;
  const possedute = new Set(giocatore.armi.map(armaBase));
  const scelte = [...ARMI_CASSA, ...ARMI_MERAVIGLIA].filter(a => !possedute.has(a)).map(a => [a, PESI_CASSA[a] ?? PESO_MERAVIGLIA]);
  const totale = scelte.reduce((s, [, p]) => s + p, 0);
  let soglia = S.caso(stato) * totale;
  let arma = scelte[scelte.length - 1][0];
  for (const [nome, peso] of scelte) {
    soglia -= peso;
    if (soglia < 0) {
      arma = nome;
      break;
    }
  }
  Object.assign(cassa, { stato: 'aperta', arma, per: giocatore.id, timer: R.DURATA_CASSA });
  eventi.push({ k: 'cassa', a: giocatore.id, arma });
}

function valvola(stato, ab, indice, eventi) {
  if (!stato.corrente || ab.protocollo) return;
  const v = ab.valvole;
  if (v.premute.includes(indice)) return;
  const giusta = v.ordine[v.premute.length] === indice;
  if (!giusta) {
    v.premute = [];
    v.tempo = 0;
    eventi.push({ k: 'valvola', indice, giusta: false });
    return;
  }
  v.premute.push(indice);
  if (v.premute.length === 1) v.tempo = A.VALVOLE_TEMPO;
  eventi.push({ k: 'valvola', indice, giusta: true, n: v.premute.length });
  if (v.premute.length < v.ordine.length) return;
  ab.protocollo = true;
  v.tempo = 0;
  avanza(ab, PASSO.PROTOCOLLO, PASSO.IMMERSIONE, eventi, 'protocollo');
  eventi.push({ k: 'protocolloAbisso' });
}

function barra(stato, ab, g, indice, eventi) {
  if (ab.barre[indice] || ab.allagamento.livello < 0.95 || ab.passo !== PASSO.IMMERSIONE) return;
  const mano = quota(g.x, g.z) + suReale(ab, g) + 1.15;
  if (Math.abs(mano - BARRE[indice].y) > A.PRESA_BARRA) {
    eventi.push({ k: 'barraLontana', a: g.id, indice });
    return;
  }
  ab.barre[indice] = true;
  eventi.push({ k: 'barra', indice, da: g.id, prese: ab.barre.filter(Boolean).length });
  if (!ab.barre.every(Boolean)) return;
  ab.fucina = true;
  ab.svuotaTra = A.SVUOTA_DOPO_BARRE;
  avanza(ab, PASSO.IMMERSIONE, PASSO.PURIFICAZIONE, eventi, 'barre');
}

function nodo(stato, ab, indice, g, eventi) {
  if (ab.nodi[indice] !== 1) return;
  ab.nodi[indice] = 2;
  eventi.push({ k: 'nodoRaccolto', indice, da: g.id, presi: ab.nodi.filter(n => n === 2).length });
  if (ab.nodi.every(n => n === 2) && avanza(ab, PASSO.PURIFICAZIONE, PASSO.AUTOPSIA, eventi, 'nodi') && palombariVivi(stato).length === 0) ab.palombaroTra = A.PALOMBARO_DOPO;
}

function chiudiStagna(stato, ab, eventi) {
  stato.porte = stato.porte.filter(p => p !== 'stagnaA' && p !== 'stagnaB');
  ab.stagna.chiusa = true;
  eventi.push({ k: 'stagna', chiusa: true });
}

function apriStagna(stato, ab, eventi) {
  for (const p of ['stagnaA', 'stagnaB']) if (!stato.porte.includes(p)) stato.porte.push(p);
  ab.stagna.chiusa = false;
  eventi.push({ k: 'stagna', chiusa: false });
}

function quadroStagna(stato, ab, g, eventi) {
  const s = ab.stagna;
  if (s.decompressione > 0 || s.riapertura > 0) return;
  if (!s.chiusa) {
    if (stato.giocatori.some(q => q.stato !== 'morto' && dentroStagna(q))) {
      eventi.push({ k: 'stagnaOccupata', a: g.id });
      return;
    }
    chiudiStagna(stato, ab, eventi);
    return;
  }
  if (s.attesa > stato.tempo || !stato.zombie.some(z => z.stato !== 'morto' && dentroStagna(z))) {
    apriStagna(stato, ab, eventi);
    return;
  }
  s.decompressione = A.DECOMPRESSIONE;
  s.attesa = stato.tempo + A.STAGNA_ATTESA;
  eventi.push({ k: 'decompressione', da: g.id, t: A.DECOMPRESSIONE });
}

function aggiornaStagna(stato, ab, dt, eventi, S) {
  const s = ab.stagna;
  if (s.decompressione > 0) {
    s.decompressione -= dt;
    if (s.decompressione > 0) return;
    s.decompressione = 0;
    s.riapertura = A.RIAPERTURA;
    const autore = stato.giocatori[0];
    let palombaro = null;
    for (const z of stato.zombie) {
      if (z.stato === 'morto' || !dentroStagna(z)) continue;
      if (z.tipo === 'palombaro') palombaro = z;
      if (autore) S.ferisciZombie(stato, autore, z, z.vita, { smembra: true, decompressione: true }, eventi);
    }
    eventi.push({ k: 'esplosioneStagna', palombaro: !!palombaro });
    if (palombaro && ab.passo === PASSO.AUTOPSIA && ab.nucleo === 0) {
      ab.nucleo = 1;
      eventi.push({ k: 'nucleoCaduto' });
      dialogo(ab, 'nucleo', eventi);
    }
    return;
  }
  if (s.riapertura > 0) {
    s.riapertura -= dt;
    if (s.riapertura <= 0) {
      s.riapertura = 0;
      apriStagna(stato, ab, eventi);
    }
  }
}

function altare(stato, ab, g, eventi, S) {
  if (ab.nucleo === 2 && ab.portatore === g.id) {
    ab.nucleo = 3;
    ab.portatore = null;
    ab.tridenti = true;
    eventi.push({ k: 'nucleoIncastonato', da: g.id });
    avanza(ab, PASSO.AUTOPSIA, PASSO.INNO, eventi, 'tridenti');
    return;
  }
  if (!ab.tridenti || possiede(g, 'tridente')) return;
  S.prendiArma(stato, g, 'tridente', eventi, { meraviglia: true });
}

function banco(stato, ab, g, eventi) {
  const s = ab.scudo;
  if (!s.costruito) {
    if (!s.prese.every(Boolean)) return;
    s.costruito = true;
    eventi.push({ k: 'scudoCostruito', da: g.id });
    dialogo(ab, 'scudo', eventi);
  }
  if (ab.scudi[g.id] > 0 || (ab.attesaScudo[g.id] ?? 0) > stato.tempo) return;
  ab.scudi[g.id] = A.SCUDO_VITA;
  eventi.push({ k: 'scudoPreso', a: g.id });
}

function condotto(stato, ab, g, acquisto, eventi) {
  if (!stato.corrente || ab.condotti[g.id] || (ab.attesaCondotto[g.id] ?? 0) > stato.tempo) return;
  const viaggio = CONDOTTI[acquisto.meta === 'beta' ? 'delta' : 'beta'];
  const meta = viaggio.percorso[Math.floor(viaggio.percorso.length / 2)];
  ab.condotti[g.id] = { verso: acquisto.meta === 'beta' ? 2 : 1, t: 0 };
  Object.assign(g, { x: meta[0], z: meta[2], teletrasporto: g.teletrasporto + 1, su: 0 });
  if (acquisto.meta === 'delta' && !stato.porte.includes('condotti')) stato.porte.push('condotti');
  eventi.push({ k: 'condotto', a: g.id, verso: acquisto.meta });
}

function aggiornaCondotti(stato, ab, dt, eventi) {
  for (const [id, viaggio] of Object.entries(ab.condotti)) {
    viaggio.t += dt / A.CONDOTTO_DURATA;
    const g = stato.giocatori.find(q => q.id === id);
    if (!g) {
      delete ab.condotti[id];
      continue;
    }
    if (viaggio.t < 1) continue;
    const arrivo = viaggio.verso === 1 ? CONDOTTI.beta.a : CONDOTTI.delta.a;
    Object.assign(g, { x: arrivo.x, z: arrivo.z, teletrasporto: g.teletrasporto + 1 });
    delete ab.condotti[id];
    ab.attesaCondotto[id] = stato.tempo + A.CONDOTTO_ATTESA;
    eventi.push({ k: 'condottoArrivo', a: id });
  }
}

export function nota(stato, ab, canna, eventi, S) {
  if (ab.passo !== PASSO.INNO || canna < 0 || canna >= CANNE.length || ab.inno.attesa > 0) return;
  const inno = ab.inno;
  inno.attesa = A.NOTA_ATTESA;
  const giusta = inno.canne[canna] === inno.sequenza[inno.progresso];
  if (!giusta) {
    inno.progresso = 0;
    inno.errori += 1;
    eventi.push({ k: 'notaOrgano', canna, giusta: false });
    for (let i = 0; i < A.ORDA_ELETTRICA; i++) {
      if (stato.zombie.filter(z => z.stato !== 'morto').length >= R.ZOMBIE_VIVI_MAX) break;
      S.generaZombie(stato, { tipo: 'elettrico', finestre: ['v2', 'v3', 'v4', 'v5'], corre: true });
    }
    return;
  }
  inno.progresso += 1;
  eventi.push({ k: 'notaOrgano', canna, giusta: true, n: inno.progresso });
  if (inno.progresso < inno.sequenza.length) return;
  ab.inizioLeviatano = 7;
  avanza(ab, PASSO.INNO, PASSO.LEVIATANO, eventi, 'inno');
  eventi.push({ k: 'innoCompiuto' });
}

export function compra(stato, ab, g, acquisto, eventi, S) {
  switch (acquisto.tipo) {
    case 'bevanda':
      return !stato.corrente && acquisto.bevanda !== 'ritorno';
    case 'cassa':
      scrigno(stato, g, eventi, S);
      return true;
    case 'turbina':
      if (ab.turbine[acquisto.indice] === 0) {
        ab.turbine[acquisto.indice] = 0.001;
        eventi.push({ k: 'turbina', indice: acquisto.indice, accesa: false, da: g.id });
      }
      return true;
    case 'valvola':
      valvola(stato, ab, acquisto.indice, eventi);
      return true;
    case 'pannello':
      if (!ab.protocollo) return true;
      if (ab.allagamento.verso > 0 || ab.allagamento.livello >= 1) svuota(ab, eventi);
      else allaga(ab, eventi);
      if (ab.allagamento.verso > 0) dialogo(ab, 'allagamento', eventi);
      return true;
    case 'barra':
      barra(stato, ab, g, acquisto.indice, eventi);
      return true;
    case 'fucina':
      if (ab.fucina && !possiede(g, 'charybdis')) S.prendiArma(stato, g, 'charybdis', eventi, { meraviglia: true });
      return true;
    case 'nodo':
      nodo(stato, ab, acquisto.indice, g, eventi);
      return true;
    case 'quadroStagna':
      quadroStagna(stato, ab, g, eventi);
      return true;
    case 'nucleo':
      if (ab.nucleo === 1) {
        ab.nucleo = 2;
        ab.portatore = g.id;
        eventi.push({ k: 'nucleoPreso', a: g.id });
      }
      return true;
    case 'altareNucleo':
      altare(stato, ab, g, eventi, S);
      return true;
    case 'banco':
      banco(stato, ab, g, eventi);
      return true;
    case 'parteScudo':
      if (ab.scudo.posti[acquisto.indice] === acquisto.posto && !ab.scudo.prese[acquisto.indice]) {
        ab.scudo.prese[acquisto.indice] = true;
        eventi.push({ k: 'parteScudo', indice: acquisto.indice, da: g.id, prese: ab.scudo.prese.filter(Boolean).length });
      }
      return true;
    case 'condotto':
      condotto(stato, ab, g, acquisto, eventi);
      return true;
    case 'consolle':
      return true;
    default:
      return false;
  }
}

function completa(stato, ab, eventi, S) {
  ab.passo = PASSO.COMPLETATA;
  ab.completata = true;
  ab.leviatano = null;
  ab.perkaholic = stato.giocatori.map(g => g.id);
  stato.zombie = stato.zombie.filter(z => z.tipo !== 'leviatano');
  for (const g of stato.giocatori) {
    S.aggiungiPunti(stato, g, A.PUNTI_COMPLETATA);
    if (g.stato === 'morto') continue;
    const partenza = PARTENZE_RITORNO[stato.giocatori.indexOf(g) % PARTENZE_RITORNO.length];
    if (g.stato === 'terra') Object.assign(g, { stato: 'vivo', vita: R.VITA_FERRO, progressoRianimazione: 0, rianimando: false, x: partenza.x, z: partenza.z, teletrasporto: g.teletrasporto + 1 });
    const prima = g.armaAttiva;
    g.armi = g.armi.map(migliore);
    g.armaAttiva = g.armi.includes(migliore(prima)) ? migliore(prima) : g.armi[0];
    eventi.push({ k: 'armi', a: g.id, armi: [...g.armi], arma: g.armaAttiva });
  }
  stato.fase = 'intervallo';
  stato.timerFase = R.INTERVALLO;
  stato.finale = null;
  eventi.push({ k: 'pressioneCritica', round: stato.round, giocatori: stato.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
}

function aggiornaPerkaholic(stato, ab) {
  for (const id of ab.perkaholic) {
    const g = stato.giocatori.find(q => q.id === id);
    if (!g || g.stato !== 'vivo') continue;
    for (const b of ELENCO_BEVANDE) if (!g.bevande.includes(b)) g.bevande.push(b);
    if (g.vitaMax < R.VITA_FERRO) {
      g.vitaMax = R.VITA_FERRO;
      g.vita = R.VITA_FERRO;
    }
  }
}

function aggiornaUltimoRespiro(stato, ab, dt, eventi) {
  const solo = stato.giocatori.length === 1;
  for (const g of stato.giocatori) {
    if (g.stato === 'vivo') {
      ab.avevaRitorno[g.id] = g.bevande.includes('ritorno');
      delete ab.rianimaTra[g.id];
      continue;
    }
    if (g.stato !== 'terra' || !solo || !ab.avevaRitorno[g.id] || (ab.autoRianimazioni[g.id] ?? 0) >= A.AUTORIANIMAZIONI) continue;
    ab.rianimaTra[g.id] = (ab.rianimaTra[g.id] ?? A.AUTORIANIMA_DOPO) - dt;
    if (ab.rianimaTra[g.id] > 0) continue;
    delete ab.rianimaTra[g.id];
    ab.autoRianimazioni[g.id] = (ab.autoRianimazioni[g.id] ?? 0) + 1;
    ab.avevaRitorno[g.id] = ab.autoRianimazioni[g.id] < A.AUTORIANIMAZIONI;
    Object.assign(g, { stato: 'vivo', vita: g.vitaMax, progressoRianimazione: 0, rianimando: false, ultimoDanno: stato.tempo });
    if (ab.avevaRitorno[g.id] && !g.bevande.includes('ritorno')) g.bevande.push('ritorno');
    for (const z of stato.zombie) {
      if (z.stato === 'morto' || z.tipo === 'leviatano') continue;
      const d = distanza(z, g);
      if (d > 4 || d < 0.01) continue;
      z.x += ((z.x - g.x) / d) * (4 - d);
      z.z += ((z.z - g.z) / d) * (4 - d);
      if (z.stato === 'attacco') z.stato = 'dentro';
      z.attesa = Math.max(z.attesa ?? 0, 2);
    }
    eventi.push({ k: 'ultimoRespiro', a: g.id, rimaste: A.AUTORIANIMAZIONI - ab.autoRianimazioni[g.id] });
  }
}

function aggiornaTurbine(stato, ab, dt, eventi) {
  ab.turbine.forEach((t, i) => {
    if (t <= 0 || t >= 1) return;
    ab.turbine[i] = Math.min(1, t + dt / A.TURBINA_AVVIO);
    if (ab.turbine[i] >= 1) eventi.push({ k: 'turbina', indice: i, accesa: true, accese: ab.turbine.filter(v => v >= 1).length });
  });
  if (stato.corrente || !ab.turbine.every(t => t >= 1)) return;
  stato.corrente = true;
  eventi.push({ k: 'corrente', da: null });
  dialogo(ab, 'corrente', eventi);
}

function aggiornaNucleo(stato, ab, eventi) {
  if (ab.nucleo !== 2) return;
  const g = stato.giocatori.find(q => q.id === ab.portatore);
  if (g?.stato === 'vivo') return;
  ab.nucleo = 1;
  ab.portatore = null;
  eventi.push({ k: 'nucleoPerso' });
}

export function aggiornaMissione(stato, ab, dt, eventi, S) {
  aggiornaTurbine(stato, ab, dt, eventi);
  if (ab.valvole.tempo > 0) {
    ab.valvole.tempo -= dt;
    if (ab.valvole.tempo <= 0) {
      ab.valvole.tempo = 0;
      ab.valvole.premute = [];
      eventi.push({ k: 'valvoleScadute' });
    }
  }
  if (ab.svuotaTra > 0) {
    ab.svuotaTra -= dt;
    if (ab.svuotaTra <= 0) svuota(ab, eventi);
  }
  aggiornaStagna(stato, ab, dt, eventi, S);
  aggiornaNucleo(stato, ab, eventi);
  aggiornaCondotti(stato, ab, dt, eventi);
  aggiornaUltimoRespiro(stato, ab, dt, eventi);
  aggiornaPerkaholic(stato, ab);
  if (ab.inno.attesa > 0) ab.inno.attesa -= dt;
  if (ab.passo === PASSO.LEVIATANO && !ab.leviatano && ab.inizioLeviatano > 0 && stato.fase !== 'fine') {
    ab.inizioLeviatano -= dt;
    if (ab.inizioLeviatano <= 0 && (stato.fase === 'gioco' || stato.fase === 'intervallo')) iniziaLeviatano(stato, ab, eventi, S);
    else if (ab.inizioLeviatano <= 0) ab.inizioLeviatano = 1;
  }
}

export const completaMissione = (stato, ab, eventi, S) => completa(stato, ab, eventi, S);
