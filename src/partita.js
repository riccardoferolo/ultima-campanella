import {
  R, ARMI_CASSA, PESI_CASSA, BEVANDE, TIPI_ZOMBIE, ELENCO_BONUS, BONUS, versionePotenziata, armaBase, zombieDelRound, vitaZombie, quotaCorridori, attesaComparsa, tipoZombie,
} from './regole.js';
import { passoCaso } from './caso.js';
import { FINESTRE, PORTE, ACQUISTI, PARTENZE, PARTENZE_SALA, RASTRELLIERA, MANICHINI, FRAMMENTI, zoneAperte, ostacoliPerGiocatori } from './mappa.js';
import { muoviCerchio, vistaLibera } from './fisica.js';
import { griglia, campoVerso, direzione } from './navigazione.js';

const PRIMO_ROUND_TRA = 3;
const TOLLERANZA_DISTANZA = 0.8;
const DANNO_MASSIMO_COLPO = 2000;
const AGGIORNA_CAMPO_OGNI = 0.25;
const RESTA_A_TERRA_DA_MORTO = 4;
const CARICA_ATTACCO = 0.55;
const SEPARAZIONE = 0.75;

const ARMA_SEGRETA = 'disintegratore';
const REGALO_CAMPANELLA = Object.freeze({ x: -3, z: 4.4 });

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const finestraDi = id => FINESTRE.find(f => f.id === id);
const tipoDi = z => TIPI_ZOMBIE[z.tipo] ?? TIPI_ZOMBIE.normale;
const effettiVuoti = () => Object.fromEntries(ELENCO_BONUS.filter(b => BONUS[b].durata).map(b => [b, 0]));

function aggiungiPunti(stato, giocatore, punti) {
  giocatore.punti += Math.round(punti) * (stato.effetti.doppi > 0 ? 2 : 1);
}

function caso(stato) {
  const [valore, nuovo] = passoCaso(stato.rng);
  stato.rng = nuovo;
  return valore;
}

export function creaPartita({ seme, giocatori = [], sala = false }) {
  const stato = {
    seme: seme >>> 0,
    rng: (seme ^ 0x5bd1e995) >>> 0,
    tempo: 0,
    fase: sala ? 'attesa' : 'intervallo',
    timerFase: sala ? 0 : PRIMO_ROUND_TRA,
    conto: null,
    bonus: [],
    bonusRound: 0,
    prossimoBonus: 1,
    effetti: effettiVuoti(),
    frammenti: [],
    segreto: false,
    campanella: false,
    round: 0,
    daGenerare: 0,
    attesaComparsa: 0,
    prossimoId: 1,
    zombie: [],
    finestre: Object.fromEntries(FINESTRE.map(f => [f.id, R.ASSE_PER_FINESTRA])),
    porte: [],
    giocatori: [],
    cassa: { stato: 'chiusa', arma: null, per: null, timer: 0 },
    corrente: false,
    potenziatore: { stato: 'libero', arma: null, per: null, timer: 0 },
    campo: null,
    attesaCampo: 0,
  };
  giocatori.forEach(g => aggiungiGiocatore(stato, g));
  if (sala) MANICHINI.forEach((m, i) => stato.zombie.push(nuovoManichino(stato, m, i)));
  return stato;
}

function nuovoManichino(stato, posizione, i) {
  return {
    id: stato.prossimoId++, x: posizione.x, z: posizione.z, yaw: -Math.PI / 2, stato: 'dentro', finestra: null, tipo: 'manichino',
    vita: R.VITA_MANICHINO, vitaMax: R.VITA_MANICHINO, corre: false, variante: i, timer: 0, attesa: 0, bersaglio: null,
  };
}

export function aggiungiGiocatore(stato, { id, nome }) {
  const esistente = stato.giocatori.find(g => g.id === id);
  if (esistente) {
    esistente.nome = nome;
    return esistente;
  }
  const partenze = stato.fase === 'attesa' ? PARTENZE_SALA : PARTENZE;
  const partenza = partenze[stato.giocatori.length % partenze.length];
  const giocatore = {
    id, nome, x: partenza.x, z: partenza.z, yaw: stato.fase === 'attesa' ? Math.PI / 2 : Math.PI, pitch: 0, pronto: false,
    stato: 'vivo', vita: R.VITA, vitaMax: R.VITA, ultimoDanno: -Infinity, timerTerra: 0,
    punti: R.PUNTI_INIZIALI, armi: ['pistola'], armaAttiva: 'pistola', bevande: [],
    rianimando: false, progressoRianimazione: 0, attesaAssa: 0, colpi: 0, uccisioni: 0, teletrasporto: 0,
  };
  stato.giocatori.push(giocatore);
  return giocatore;
}

export function rimuoviGiocatore(stato, id) {
  stato.giocatori = stato.giocatori.filter(g => g.id !== id);
}

const vivi = stato => stato.giocatori.filter(g => g.stato === 'vivo');

function aggiornaPosizioni(stato, posizioni) {
  for (const g of stato.giocatori) {
    const p = posizioni?.[g.id];
    if (!p) continue;
    g.armaAttiva = g.armi.includes(p.arma) ? p.arma : g.armaAttiva;
    g.colpi = Number.isFinite(p.colpi) ? p.colpi : g.colpi;
    if (g.stato !== 'vivo' || (p.tp ?? 0) < g.teletrasporto) continue;
    g.x = p.x;
    g.z = p.z;
    g.yaw = p.yaw;
    g.pitch = p.pitch;
  }
}

function prendiArma(stato, giocatore, arma, eventi, extra = {}) {
  if (!giocatore.armi.includes(arma)) {
    if (giocatore.armi.length < 2) giocatore.armi.push(arma);
    else giocatore.armi[giocatore.armi.indexOf(giocatore.armaAttiva)] = arma;
  }
  giocatore.armaAttiva = arma;
  eventi.push({ k: 'acquisto', a: giocatore.id, arma, armi: [...giocatore.armi], ...extra });
}

function compra(stato, giocatore, idAcquisto, armaInMano, eventi) {
  if (giocatore.armi.includes(armaInMano)) giocatore.armaAttiva = armaInMano;
  const aperte = zoneAperte(new Set(stato.porte));
  if (idAcquisto.startsWith('porta:')) {
    const porta = PORTE.find(p => `porta:${p.id}` === idAcquisto);
    if (!porta || stato.porte.includes(porta.id) || giocatore.punti < porta.costo) return;
    if (distanza(giocatore, porta.centro) > R.DISTANZA_ACQUISTO + TOLLERANZA_DISTANZA) return;
    giocatore.punti -= porta.costo;
    stato.porte.push(porta.id);
    eventi.push({ k: 'porta', id: porta.id, da: giocatore.id });
    return;
  }
  const acquisto = ACQUISTI.find(a => a.id === idAcquisto);
  if (!acquisto || !aperte.has(acquisto.zona)) return;
  if (distanza(giocatore, acquisto.posizione) > R.DISTANZA_ACQUISTO + TOLLERANZA_DISTANZA) return;

  if (acquisto.tipo === 'arma') {
    const posseduta = giocatore.armi.find(a => armaBase(a) === acquisto.arma);
    const costo = posseduta ? acquisto.munizioni : acquisto.costo;
    if (giocatore.punti < costo) return;
    giocatore.punti -= costo;
    if (posseduta) eventi.push({ k: 'munizioni', a: giocatore.id, arma: posseduta });
    else prendiArma(stato, giocatore, acquisto.arma, eventi);
    return;
  }
  if (acquisto.tipo === 'interruttore') {
    if (stato.corrente) return;
    stato.corrente = true;
    eventi.push({ k: 'corrente', da: giocatore.id });
    return;
  }
  if (acquisto.tipo === 'potenziatore') {
    potenziatore(stato, giocatore, eventi);
    return;
  }
  if (acquisto.tipo === 'campanella') {
    const regalo = !stato.campanella;
    stato.campanella = true;
    if (regalo) creaBonus(stato, REGALO_CAMPANELLA.x, REGALO_CAMPANELLA.z, ELENCO_BONUS[Math.floor(caso(stato) * ELENCO_BONUS.length)], eventi);
    eventi.push({ k: 'campanella', da: giocatore.id, regalo });
    return;
  }
  if (acquisto.tipo === 'bevanda') {
    const bevanda = BEVANDE[acquisto.bevanda];
    if (giocatore.bevande.includes(acquisto.bevanda) || giocatore.punti < bevanda.costo) return;
    giocatore.punti -= bevanda.costo;
    giocatore.bevande.push(acquisto.bevanda);
    if (acquisto.bevanda === 'ferro') {
      giocatore.vitaMax = R.VITA_FERRO;
      giocatore.vita = R.VITA_FERRO;
    }
    eventi.push({ k: 'bevanda', a: giocatore.id, bevanda: acquisto.bevanda });
    return;
  }
  const cassa = stato.cassa;
  if (cassa.stato === 'aperta' && cassa.per === giocatore.id) {
    const arma = cassa.arma;
    Object.assign(cassa, { stato: 'chiusa', arma: null, per: null, timer: 0 });
    prendiArma(stato, giocatore, arma, eventi, { daCassa: true });
    return;
  }
  const costoCassa = stato.effetti.saldi > 0 ? R.COSTO_CASSA_SALDI : R.COSTO_CASSA;
  if (cassa.stato !== 'chiusa' || giocatore.punti < costoCassa) return;
  giocatore.punti -= costoCassa;
  const possedute = new Set(giocatore.armi.map(armaBase));
  const arma = sceltaPesata(ARMI_CASSA.filter(a => !possedute.has(a)), caso(stato));
  Object.assign(cassa, { stato: 'aperta', arma, per: giocatore.id, timer: R.DURATA_CASSA });
  eventi.push({ k: 'cassa', a: giocatore.id, arma });
}

function potenziatore(stato, giocatore, eventi) {
  const macchina = stato.potenziatore;
  if (macchina.stato === 'pronta' && macchina.per === giocatore.id) {
    const da = giocatore.armi.indexOf(armaBase(macchina.arma));
    if (da >= 0) giocatore.armi[da] = macchina.arma;
    else if (giocatore.armi.length < 2) giocatore.armi.push(macchina.arma);
    else giocatore.armi[giocatore.armi.indexOf(giocatore.armaAttiva)] = macchina.arma;
    giocatore.armaAttiva = macchina.arma;
    eventi.push({ k: 'acquisto', a: giocatore.id, arma: macchina.arma, armi: [...giocatore.armi], potenziata: true });
    Object.assign(macchina, { stato: 'libero', arma: null, per: null, timer: 0 });
    return;
  }
  const potenziata = versionePotenziata(giocatore.armaAttiva);
  if (!stato.corrente || macchina.stato !== 'libero' || !potenziata || giocatore.punti < R.COSTO_POTENZIA) return;
  giocatore.punti -= R.COSTO_POTENZIA;
  Object.assign(macchina, { stato: 'lavora', arma: potenziata, per: giocatore.id, timer: R.DURATA_POTENZIA });
  eventi.push({ k: 'potenzia', a: giocatore.id, arma: potenziata });
}

function aggiornaPotenziatore(stato, dt, eventi) {
  const macchina = stato.potenziatore;
  if (macchina.stato === 'libero') return;
  macchina.timer -= dt;
  if (macchina.timer > 0) return;
  if (macchina.stato === 'lavora') {
    Object.assign(macchina, { stato: 'pronta', timer: R.ATTESA_RITIRO });
    eventi.push({ k: 'potenziataPronta', a: macchina.per, arma: macchina.arma });
    return;
  }
  Object.assign(macchina, { stato: 'libero', arma: null, per: null, timer: 0 });
}

export function sceltaPesata(scelte, estratto) {
  const totale = scelte.reduce((somma, a) => somma + PESI_CASSA[a], 0);
  let soglia = estratto * totale;
  for (const a of scelte) {
    soglia -= PESI_CASSA[a];
    if (soglia < 0) return a;
  }
  return scelte[scelte.length - 1];
}

function colpisci(stato, giocatore, azione, eventi) {
  const zombie = stato.zombie.find(z => z.id === azione.zombie && z.stato !== 'morto');
  if (!zombie) return;
  const manichino = zombie.tipo === 'manichino';
  const danno = !manichino && stato.effetti.secco > 0 ? zombie.vita : Math.min(DANNO_MASSIMO_COLPO, Math.max(0, Number(azione.danno) || 0));
  zombie.vita -= danno;
  if (zombie.vita > 0) {
    if (!manichino) aggiungiPunti(stato, giocatore, R.PUNTI_COLPO);
    eventi.push({ k: 'colpito', zombie: zombie.id, testa: !!azione.testa, da: giocatore.id });
    return;
  }
  zombie.stato = 'morto';
  zombie.timer = manichino ? R.RINASCITA_MANICHINO : RESTA_A_TERRA_DA_MORTO;
  eventi.push({ k: 'ucciso', zombie: zombie.id, testa: !!azione.testa, da: giocatore.id, x: zombie.x, z: zombie.z });
  if (manichino) return;
  giocatore.uccisioni += 1;
  aggiungiPunti(stato, giocatore, (azione.coltello ? R.PUNTI_COLTELLO : azione.testa ? R.PUNTI_TESTA : R.PUNTI_UCCISIONE) * tipoDi(zombie).punti);
  forseBonus(stato, zombie, eventi);
}

function forseBonus(stato, zombie, eventi) {
  if (stato.bonusRound >= R.BONUS_PER_ROUND || caso(stato) >= R.PROBABILITA_BONUS) return;
  const fuori = zombie.stato === 'arriva' || zombie.stato === 'assi';
  const punto = fuori && zombie.finestra ? finestraDi(zombie.finestra).interno : zombie;
  stato.bonusRound += 1;
  creaBonus(stato, punto.x, punto.z, ELENCO_BONUS[Math.floor(caso(stato) * ELENCO_BONUS.length)], eventi);
}

export function creaBonus(stato, x, z, tipo, eventi = []) {
  const bonus = { id: stato.prossimoBonus++, tipo, x, z, timer: R.DURATA_BONUS_A_TERRA };
  stato.bonus.push(bonus);
  eventi.push({ k: 'bonusCompare', id: bonus.id, tipo, x, z });
  return bonus;
}

function applicaBonus(stato, bonus, giocatore, eventi) {
  const dati = BONUS[bonus.tipo];
  if (dati.durata) stato.effetti[bonus.tipo] = dati.durata;
  if (bonus.tipo === 'bomba') {
    for (const z of stato.zombie) {
      if (z.stato === 'morto' || z.tipo === 'manichino') continue;
      z.stato = 'morto';
      z.timer = RESTA_A_TERRA_DA_MORTO;
      eventi.push({ k: 'ucciso', zombie: z.id, testa: false, da: null, x: z.x, z: z.z, bomba: true });
    }
    for (const g of vivi(stato)) aggiungiPunti(stato, g, R.PUNTI_BOMBA);
  }
  if (bonus.tipo === 'carpentiere') {
    for (const f of FINESTRE) stato.finestre[f.id] = R.ASSE_PER_FINESTRA;
    for (const g of vivi(stato)) aggiungiPunti(stato, g, R.PUNTI_CARPENTIERE);
  }
  eventi.push({ k: 'bonus', tipo: bonus.tipo, da: giocatore.id, x: bonus.x, z: bonus.z });
}

function aggiornaBonus(stato, dt, eventi) {
  for (const tipo of Object.keys(stato.effetti)) stato.effetti[tipo] = Math.max(0, stato.effetti[tipo] - dt);
  stato.bonus = stato.bonus.filter(bonus => {
    bonus.timer -= dt;
    const preso = vivi(stato).find(g => distanza(g, bonus) <= R.DISTANZA_BONUS);
    if (preso) {
      applicaBonus(stato, bonus, preso, eventi);
      return false;
    }
    return bonus.timer > 0;
  });
}

function prova(stato, giocatore, armaVoluta, eventi) {
  if (stato.fase !== 'attesa') return;
  const posto = RASTRELLIERA.find(r => r.arma === armaVoluta);
  if (!posto || distanza(giocatore, posto) > R.DISTANZA_PROVA + TOLLERANZA_DISTANZA) return;
  if (giocatore.armi.includes(armaVoluta)) {
    giocatore.armaAttiva = armaVoluta;
    return;
  }
  prendiArma(stato, giocatore, armaVoluta, eventi, { prova: true });
}

function frammento(stato, giocatore, id, eventi) {
  const pezzo = FRAMMENTI.find(f => f.id === id);
  if (!pezzo || stato.fase === 'attesa' || stato.frammenti.includes(id)) return;
  if (distanza(giocatore, pezzo) > R.DISTANZA_FRAMMENTO + TOLLERANZA_DISTANZA) return;
  stato.frammenti.push(id);
  eventi.push({ k: 'frammento', id, da: giocatore.id, trovati: stato.frammenti.length, totale: FRAMMENTI.length });
  if (stato.frammenti.length < FRAMMENTI.length) return;
  stato.segreto = true;
  for (const g of vivi(stato)) {
    aggiungiPunti(stato, g, R.PUNTI_SEGRETO);
    prendiArma(stato, g, ARMA_SEGRETA, eventi, { segreto: true });
  }
  eventi.push({ k: 'segreto' });
}

function avvia(stato, eventi) {
  stato.zombie = [];
  stato.conto = null;
  stato.fase = 'intervallo';
  stato.timerFase = PRIMO_ROUND_TRA;
  stato.giocatori.forEach((g, i) => {
    const partenza = PARTENZE[i % PARTENZE.length];
    Object.assign(g, {
      x: partenza.x, z: partenza.z, yaw: Math.PI, stato: 'vivo', vita: R.VITA, vitaMax: R.VITA, punti: R.PUNTI_INIZIALI,
      armi: ['pistola'], armaAttiva: 'pistola', bevande: [], pronto: false, uccisioni: 0, teletrasporto: g.teletrasporto + 1,
    });
  });
  eventi.push({ k: 'via' });
}

function aggiornaSala(stato, dt, eventi) {
  const tutti = stato.giocatori.length > 0 && stato.giocatori.every(g => g.pronto);
  if (!tutti) {
    if (stato.conto !== null) eventi.push({ k: 'contoAnnullato' });
    stato.conto = null;
    return;
  }
  if (stato.conto === null) {
    stato.conto = R.CONTO_ALLA_ROVESCIA;
    eventi.push({ k: 'conto', secondi: R.CONTO_ALLA_ROVESCIA });
    return;
  }
  stato.conto -= dt;
  if (stato.conto <= 0) avvia(stato, eventi);
}

function ricostruisci(stato, giocatore, idFinestra, eventi) {
  const finestra = finestraDi(idFinestra);
  if (!finestra || giocatore.attesaAssa > 0) return;
  if (stato.finestre[finestra.id] >= R.ASSE_PER_FINESTRA) return;
  if (distanza(giocatore, finestra.interno) > R.DISTANZA_FINESTRA + TOLLERANZA_DISTANZA) return;
  if (stato.zombie.some(z => z.finestra === finestra.id && z.stato === 'scavalca')) return;
  stato.finestre[finestra.id] += 1;
  aggiungiPunti(stato, giocatore, R.PUNTI_ASSA);
  giocatore.attesaAssa = R.RICOSTRUISCI_OGNI;
  eventi.push({ k: 'assaMessa', finestra: finestra.id, da: giocatore.id });
}

function eseguiAzioni(stato, azioni, eventi) {
  for (const azione of azioni ?? []) {
    const giocatore = stato.giocatori.find(g => g.id === azione.da);
    if (!giocatore) continue;
    if (azione.tipo === 'rianima') {
      giocatore.rianimando = !!azione.attivo;
      continue;
    }
    if (giocatore.stato !== 'vivo' || stato.fase === 'fine') continue;
    if (azione.tipo === 'colpo') colpisci(stato, giocatore, azione, eventi);
    else if (azione.tipo === 'pronto') giocatore.pronto = stato.fase === 'attesa' && !!azione.attivo;
    else if (azione.tipo === 'prova') prova(stato, giocatore, String(azione.arma), eventi);
    else if (stato.fase === 'attesa') continue;
    else if (azione.tipo === 'compra') compra(stato, giocatore, String(azione.acquisto), azione.arma, eventi);
    else if (azione.tipo === 'assa') ricostruisci(stato, giocatore, azione.finestra, eventi);
    else if (azione.tipo === 'frammento') frammento(stato, giocatore, Number(azione.id), eventi);
  }
}

function generaZombie(stato) {
  const aperte = zoneAperte(new Set(stato.porte));
  const finestre = FINESTRE.filter(f => aperte.has(f.zona));
  const finestra = finestre[Math.floor(caso(stato) * finestre.length)];
  const tipo = tipoZombie(stato.round, caso(stato));
  const dati = TIPI_ZOMBIE[tipo];
  const corre = !!dati.corre || (tipo !== 'grasso' && caso(stato) < quotaCorridori(stato.round));
  const vita = Math.round(vitaZombie(stato.round) * dati.vita);
  stato.zombie.push({
    id: stato.prossimoId++, x: finestra.comparsa.x + (caso(stato) - 0.5) * 2, z: finestra.comparsa.z + (caso(stato) - 0.5) * 2,
    yaw: Math.atan2(-finestra.fuori.x, -finestra.fuori.z), stato: 'arriva', finestra: finestra.id, vita, vitaMax: vita, tipo,
    corre, variante: Math.floor(caso(stato) * 4), timer: 0, attesa: 0, bersaglio: null,
  });
}

function avanzaFase(stato, dt, eventi) {
  if (stato.fase === 'attesa') {
    aggiornaSala(stato, dt, eventi);
    return;
  }
  if (stato.fase === 'intervallo') {
    stato.timerFase -= dt;
    if (stato.timerFase > 0) return;
    stato.round += 1;
    stato.bonusRound = 0;
    stato.fase = 'gioco';
    stato.daGenerare = zombieDelRound(stato.round);
    stato.attesaComparsa = 1;
    for (const g of stato.giocatori) {
      if (g.stato !== 'morto') continue;
      const partenza = PARTENZE[0];
      Object.assign(g, { stato: 'vivo', vita: R.VITA, vitaMax: R.VITA, x: partenza.x, z: partenza.z, armi: ['pistola'], armaAttiva: 'pistola', bevande: [], rianimando: false, teletrasporto: g.teletrasporto + 1 });
      eventi.push({ k: 'rinato', a: g.id });
    }
    eventi.push({ k: 'round', round: stato.round });
    return;
  }
  if (stato.fase !== 'gioco') return;
  stato.attesaComparsa -= dt;
  const presenti = stato.zombie.filter(z => z.stato !== 'morto').length;
  if (stato.attesaComparsa <= 0 && stato.daGenerare > 0 && presenti < R.ZOMBIE_VIVI_MAX) {
    generaZombie(stato);
    stato.daGenerare -= 1;
    stato.attesaComparsa = attesaComparsa(stato.round);
    return;
  }
  if (stato.daGenerare === 0 && presenti === 0) {
    stato.fase = 'intervallo';
    stato.timerFase = R.INTERVALLO;
    eventi.push({ k: 'fineRound', round: stato.round });
  }
}

function piuVicino(stato, zombie, ostacoli) {
  let migliore = null;
  for (const g of vivi(stato)) {
    const d = distanza(g, zombie);
    if (d > 3 || (migliore && d >= migliore.d) || !vistaLibera(zombie, g, ostacoli)) continue;
    migliore = { g, d };
  }
  return migliore;
}

function muoviZombie(stato, dt, eventi) {
  const porte = new Set(stato.porte);
  stato.attesaCampo -= dt;
  if (!stato.campo || stato.attesaCampo <= 0) {
    stato.campo = campoVerso(griglia(porte), vivi(stato));
    stato.attesaCampo = AGGIORNA_CAMPO_OGNI;
  }
  const ostacoli = ostacoliPerGiocatori(porte);
  for (const z of stato.zombie) {
    if (z.tipo === 'manichino') {
      aggiornaManichino(z, dt);
      continue;
    }
    z.attesa = Math.max(0, z.attesa - dt);
    const dati = tipoDi(z);
    const velocita = (z.corre ? R.VELOCITA_CORRE : R.VELOCITA_CAMMINA) * dati.velocita;
    const portata = R.PORTATA_ZOMBIE * dati.portata;
    const finestra = finestraDi(z.finestra);
    if (z.stato === 'morto') {
      z.timer -= dt;
      continue;
    }
    if (z.stato === 'arriva') {
      const dx = finestra.esterno.x - z.x;
      const dz = finestra.esterno.z - z.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.3) {
        z.stato = 'assi';
        z.timer = R.ROMPI_ASSE_OGNI;
      } else {
        const passo = Math.min(d, velocita * dt);
        z.x += (dx / d) * passo;
        z.z += (dz / d) * passo;
        z.yaw = Math.atan2(dx, dz);
      }
      continue;
    }
    if (z.stato === 'assi') {
      z.yaw = Math.atan2(-finestra.fuori.x, -finestra.fuori.z);
      const occupata = stato.zombie.some(a => a !== z && a.finestra === z.finestra && a.stato === 'scavalca');
      if (stato.finestre[z.finestra] > 0) {
        z.timer -= dt;
        if (z.timer <= 0) {
          stato.finestre[z.finestra] -= 1;
          z.timer = R.ROMPI_ASSE_OGNI;
          eventi.push({ k: 'assaRotta', finestra: z.finestra });
        }
      } else if (!occupata) {
        z.stato = 'scavalca';
        z.timer = R.SCAVALCA;
      }
      continue;
    }
    if (z.stato === 'scavalca') {
      z.timer -= dt;
      const f = 1 - Math.max(0, z.timer) / R.SCAVALCA;
      z.x = finestra.esterno.x + (finestra.interno.x - finestra.esterno.x) * f;
      z.z = finestra.esterno.z + (finestra.interno.z - finestra.esterno.z) * f;
      if (z.timer <= 0) z.stato = 'dentro';
      continue;
    }
    const vicino = piuVicino(stato, z, ostacoli);
    if (z.stato === 'attacco') {
      z.timer -= dt;
      if (vicino) z.yaw = Math.atan2(vicino.g.x - z.x, vicino.g.z - z.z);
      if (z.timer > 0) continue;
      const bersaglio = stato.giocatori.find(g => g.id === z.bersaglio && g.stato === 'vivo');
      if (bersaglio && distanza(bersaglio, z) <= portata + 0.4) ferisci(stato, bersaglio, eventi, R.DANNO_ZOMBIE * dati.danno);
      z.stato = 'dentro';
      z.attesa = R.ATTESA_ATTACCO;
      continue;
    }
    if (vicino && vicino.d <= portata && z.attesa === 0) {
      z.stato = 'attacco';
      z.timer = CARICA_ATTACCO;
      z.bersaglio = vicino.g.id;
      eventi.push({ k: 'attacco', zombie: z.id });
      continue;
    }
    if (vicino && vicino.d <= portata * 0.8) continue;
    const verso = vicino && vicino.d < 1.5 ? { x: (vicino.g.x - z.x) / vicino.d, z: (vicino.g.z - z.z) / vicino.d } : direzione(stato.campo, z.x, z.z);
    if (!verso) continue;
    const nuova = muoviCerchio(z, verso.x * velocita * dt, verso.z * velocita * dt, R.RAGGIO_ZOMBIE, ostacoli);
    z.x = nuova.x;
    z.z = nuova.z;
    z.yaw = Math.atan2(verso.x, verso.z);
  }
  separa(stato.zombie.filter(z => z.tipo !== 'manichino' && (z.stato === 'dentro' || z.stato === 'arriva' || z.stato === 'assi')));
  stato.zombie = stato.zombie.filter(z => z.tipo === 'manichino' || z.stato !== 'morto' || z.timer > 0);
}

function aggiornaManichino(z, dt) {
  if (z.stato !== 'morto') return;
  z.timer -= dt;
  if (z.timer > 0) return;
  z.stato = 'dentro';
  z.vita = z.vitaMax;
}

function separa(zombie) {
  for (let i = 0; i < zombie.length; i++) {
    for (let j = i + 1; j < zombie.length; j++) {
      const a = zombie[i];
      const b = zombie[j];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const d = Math.hypot(dx, dz);
      if (d >= SEPARAZIONE || d < 1e-6) continue;
      const spinta = (SEPARAZIONE - d) / 2;
      const fermaA = a.stato === 'assi';
      const fermaB = b.stato === 'assi';
      if (!fermaA) { a.x -= (dx / d) * spinta; a.z -= (dz / d) * spinta; }
      if (!fermaB) { b.x += (dx / d) * spinta; b.z += (dz / d) * spinta; }
    }
  }
}

function ferisci(stato, giocatore, eventi, danno = R.DANNO_ZOMBIE) {
  giocatore.vita -= danno;
  giocatore.ultimoDanno = stato.tempo;
  eventi.push({ k: 'ferito', a: giocatore.id });
  if (giocatore.vita > 0) return;
  Object.assign(giocatore, { stato: 'terra', vita: 0, timerTerra: R.TEMPO_A_TERRA, bevande: [], vitaMax: R.VITA, progressoRianimazione: 0, rianimando: false });
  eventi.push({ k: 'aTerra', a: giocatore.id });
}

function aggiornaGiocatori(stato, dt, eventi) {
  for (const g of stato.giocatori) {
    g.attesaAssa = Math.max(0, g.attesaAssa - dt);
    if (g.stato === 'vivo' && stato.tempo - g.ultimoDanno > R.RIGENERA_DOPO) {
      g.vita = Math.min(g.vitaMax, g.vita + R.RIGENERA_AL_SECONDO * dt);
    }
    if (g.stato !== 'terra') continue;
    const soccorritore = vivi(stato).find(v => v.rianimando && distanza(v, g) <= R.RIANIMA_DISTANZA + TOLLERANZA_DISTANZA);
    if (soccorritore) {
      g.progressoRianimazione += dt;
      const serve = soccorritore.bevande.includes('ritorno') ? R.RIANIMA_RAPIDO : R.RIANIMA_IN;
      if (g.progressoRianimazione >= serve) {
        Object.assign(g, { stato: 'vivo', vita: R.VITA, progressoRianimazione: 0, ultimoDanno: stato.tempo });
        eventi.push({ k: 'rianimato', a: g.id, da: soccorritore.id });
      }
      continue;
    }
    g.progressoRianimazione = 0;
    g.timerTerra -= dt;
    if (g.timerTerra <= 0) {
      g.stato = 'morto';
      g.rianimando = false;
      eventi.push({ k: 'morto', a: g.id });
    }
  }
}

function aggiornaCassa(stato, dt, eventi) {
  const cassa = stato.cassa;
  if (cassa.stato !== 'aperta') return;
  cassa.timer -= dt;
  if (cassa.timer > 0) return;
  Object.assign(cassa, { stato: 'chiusa', arma: null, per: null, timer: 0 });
  eventi.push({ k: 'cassaChiusa' });
}

export function passo(stato, dt, { posizioni = {}, azioni = [] } = {}) {
  const eventi = [];
  if (stato.fase === 'fine') return eventi;
  stato.tempo += dt;
  aggiornaPosizioni(stato, posizioni);
  eseguiAzioni(stato, azioni, eventi);
  avanzaFase(stato, dt, eventi);
  muoviZombie(stato, dt, eventi);
  aggiornaGiocatori(stato, dt, eventi);
  aggiornaCassa(stato, dt, eventi);
  aggiornaPotenziatore(stato, dt, eventi);
  aggiornaBonus(stato, dt, eventi);
  if (stato.giocatori.length > 0 && vivi(stato).length === 0) {
    stato.fase = 'fine';
    eventi.push({ k: 'fine', round: stato.round, giocatori: stato.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
  }
  return eventi;
}
