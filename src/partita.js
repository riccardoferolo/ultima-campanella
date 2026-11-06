import {
  R, ARMI, ARMI_CASSA, PESI_CASSA, BEVANDE, TIPI_ZOMBIE, ELENCO_BONUS, BONUS, versionePotenziata, armaBase, zombieDelRound, vitaZombie, quotaCorridori, attesaComparsa, tipoZombie,
  dannoGranata, moltiplicatoreBoss, faseCustode, saltiArco,
} from './regole.js';
import { passoCaso } from './caso.js';
import {
  FINESTRE, PORTE, ACQUISTI, PARTENZE, PARTENZE_SALA, FRAMMENTI, ZONE, ALTEZZA_SOFFITTO, POSTI_FUSIBILE, FUSIBILE_GENERATORE, GENERATORE, COMPARSA_CUSTODE,
  SOGLIA_RIFUGIO, FINESTRE_RIFUGIO, zonaDi, zoneAperte, ostacoliPerGiocatori,
} from './mappa.js';
import { muoviCerchio, vistaLibera } from './fisica.js';
import { direzioneDa } from './colpi.js';
import { griglia, campoVerso, direzione } from './navigazione.js';

const PRIMO_ROUND_TRA = 3;
const TOLLERANZA_DISTANZA = 0.8;
const DANNO_MASSIMO_COLPO = 2000;
const AGGIORNA_CAMPO_OGNI = 0.25;
const RESTA_A_TERRA_DA_MORTO = 4;
const CARICA_ATTACCO = 0.55;
const SEPARAZIONE = 0.75;
const RAGGIO_GRANATA_FISICO = 0.06;
const RIMBALZO = 0.35;
const ATTRITO_SUOLO = 3;
const URTO_SUOLO = 0.55;
const MARGINE_GRANATA = 0.05;
const ALTEZZA_SCHERMO_ESPLOSIONE = 1.5;
const URLO_PER_FASE = Object.freeze([18, 14, 10]);
const RAGGIO_PROIETTILE = 0.7;
const COLPI_BUCO_OGNI = 0.25;
const FERITA_BUCO = 0.12;
const IMPLOSIONE_PER_VITA = 2.5;
const SALTI_MASSIMI = 13;

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
    granate: [],
    prossimaGranata: 1,
    proiettili: [],
    buchi: [],
    prossimoProiettile: 1,
    presideTra: null,
    missione: {
      fusibili: 0,
      messi: 0,
      aTerra: [{ id: 0, ...POSTI_FUSIBILE[(seme >>> 0) % POSTI_FUSIBILE.length] }],
      presideFusibile: true,
      generatore: 'fermo',
      progresso: 0,
    },
    finale: null,
  };
  giocatori.forEach(g => aggiungiGiocatore(stato, g));
  return stato;
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
    rianimando: false, progressoRianimazione: 0, attesaAssa: 0, colpi: 0, uccisioni: 0, teletrasporto: 0, granate: R.GRANATE_INIZIALI,
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
  if (idAcquisto.startsWith('fusibile:')) {
    raccogliFusibile(stato, giocatore, Number(idAcquisto.slice('fusibile:'.length)), aperte, eventi);
    return;
  }
  if (idAcquisto.startsWith('porta:')) {
    const porta = PORTE.find(p => `porta:${p.id}` === idAcquisto);
    if (!porta || porta.chiusa || stato.porte.includes(porta.id) || giocatore.punti < porta.costo) return;
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
  if (acquisto.tipo === 'quadro') {
    inserisciFusibili(stato, eventi);
    return;
  }
  if (acquisto.tipo === 'generatore') {
    avviaGeneratore(stato, giocatore, eventi);
    return;
  }
  if (acquisto.tipo === 'allarme') {
    if (stato.finale || (stato.fase !== 'gioco' && stato.fase !== 'intervallo')) return;
    if (!stato.giocatori.filter(g => g.stato !== 'morto').every(g => zonaDi(g.x, g.z) === 'rifugio' && g.z < SOGLIA_RIFUGIO)) return;
    iniziaFinale(stato, eventi);
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

const armaUsata = (giocatore, azione) => ARMI[giocatore.armi.includes(azione.arma) ? azione.arma : giocatore.armaAttiva];

function colpisci(stato, giocatore, azione, eventi) {
  const zombie = stato.zombie.find(z => z.id === azione.zombie && z.stato !== 'morto');
  if (!zombie) return;
  const arma = armaUsata(giocatore, azione);
  const gelo = azione.gelo && arma?.gelo ? Math.min(Number(azione.gelo) || 0, arma.gelo * arma.pallini) * (arma.potenziata ? 1.7 : 1) : 0;
  if (gelo > 0 && zombie.gelato > 0) return;
  const richiesto = Math.min(DANNO_MASSIMO_COLPO, Math.max(0, Number(azione.danno) || 0));
  ferisciZombie(stato, giocatore, zombie, richiesto, { testa: !!azione.testa, coltello: !!azione.coltello }, eventi);
  if (gelo > 0 && zombie.stato !== 'morto') congela(zombie, giocatore, gelo, eventi);
}

function ferisciZombie(stato, giocatore, zombie, danno, opzioni, eventi) {
  if (zombie.gelato > 0) {
    zombie.gelato = 0;
    danneggia(stato, giocatore, zombie, zombie.vita, { ...opzioni, frantumato: true }, eventi);
    return;
  }
  danneggia(stato, giocatore, zombie, stato.effetti.secco > 0 && !tipoDi(zombie).boss ? zombie.vita : danno, opzioni, eventi);
}

function congela(zombie, giocatore, quanto, eventi) {
  const boss = tipoDi(zombie).boss;
  zombie.gelo = Math.min(boss ? R.GELO_BOSS_MAX : 1, (zombie.gelo ?? 0) + quanto);
  zombie.geloDa = giocatore.id;
  if (boss || zombie.gelo < 1) return;
  zombie.gelato = R.GELO_DURATA;
  if (zombie.stato === 'attacco') zombie.stato = 'dentro';
  eventi.push({ k: 'congelato', zombie: zombie.id, x: zombie.x, z: zombie.z });
}

function frantuma(stato, zombie, eventi) {
  const giocatore = stato.giocatori.find(g => g.id === zombie.geloDa) ?? stato.giocatori[0];
  zombie.gelato = 0;
  if (giocatore) danneggia(stato, giocatore, zombie, zombie.vita, { frantumato: true }, eventi);
}

function catena(stato, giocatore, azione, eventi) {
  const arma = armaUsata(giocatore, azione);
  if (!arma?.catena || !Array.isArray(azione.zombie)) return;
  const punti = [];
  let prima = null;
  let danno = arma.danno;
  for (const id of azione.zombie.slice(0, Math.min(SALTI_MASSIMI, saltiArco(arma)))) {
    const zombie = stato.zombie.find(z => z.id === id && z.stato !== 'morto');
    if (!zombie || (prima && distanza(prima, zombie) > R.ARCO_SALTO + TOLLERANZA_DISTANZA)) break;
    punti.push(Math.round(zombie.x * 100) / 100, Math.round(zombie.z * 100) / 100);
    if (!tipoDi(zombie).boss) zombie.scossa = R.ARCO_SCOSSA;
    ferisciZombie(stato, giocatore, zombie, Math.round(danno), {}, eventi);
    prima = zombie;
    danno *= R.ARCO_CALO;
  }
  if (punti.length) eventi.push({ k: 'arco', da: giocatore.id, punti });
}

function sparaProiettile(stato, giocatore, azione, eventi) {
  const arma = armaUsata(giocatore, azione);
  if (!arma?.proiettile) return;
  const d = direzioneDa(Number(azione.yaw) || 0, Math.max(-1.4, Math.min(1.4, Number(azione.pitch) || 0)));
  stato.proiettili.push({
    id: stato.prossimoProiettile++, x: giocatore.x, y: R.ALTEZZA_OCCHI - 0.1, z: giocatore.z,
    vx: d.x * R.BUCO_VELOCITA, vy: d.y * R.BUCO_VELOCITA, vz: d.z * R.BUCO_VELOCITA, volo: R.BUCO_VOLO, da: giocatore.id, potente: !!arma.potenziata,
  });
  eventi.push({ k: 'sfera', a: giocatore.id });
}

function aggiornaProiettili(stato, dt, eventi) {
  if (stato.proiettili.length === 0) return;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  stato.proiettili = stato.proiettili.filter(p => {
    p.volo -= dt;
    const x = p.x + p.vx * dt;
    const y = p.y + p.vy * dt;
    const z = p.z + p.vz * dt;
    const zombie = stato.zombie.some(v => v.stato !== 'morto' && Math.hypot(v.x - x, v.z - z) < RAGGIO_PROIETTILE && y < 2.4);
    if (p.volo > 0 && !zombie && !urta(x, z, y, ostacoli) && y > 0.15 && y < ALTEZZA_SOFFITTO - 0.1) {
      Object.assign(p, { x, y, z });
      return true;
    }
    const buco = {
      id: p.id, x: p.x, y: Math.max(0.9, Math.min(1.6, p.y)), z: p.z, da: p.da, colpi: COLPI_BUCO_OGNI,
      timer: R.BUCO_DURATA * (p.potente ? 1.5 : 1), raggio: R.BUCO_RAGGIO * (p.potente ? 1.35 : 1), implosione: R.BUCO_IMPLOSIONE * (p.potente ? 1.3 : 1), potente: p.potente,
    };
    stato.buchi.push(buco);
    eventi.push({ k: 'buco', x: buco.x, y: buco.y, z: buco.z });
    return false;
  });
}

function aggiornaBuchi(stato, dt, eventi) {
  if (stato.buchi.length === 0) return;
  const schermi = ostacoliPerGiocatori(new Set(stato.porte)).filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= ALTEZZA_SCHERMO_ESPLOSIONE);
  stato.buchi = stato.buchi.filter(buco => {
    const giocatore = stato.giocatori.find(g => g.id === buco.da);
    buco.timer -= dt;
    buco.colpi -= dt;
    const ferisci = buco.colpi <= 0;
    if (ferisci) buco.colpi += COLPI_BUCO_OGNI;
    for (const z of stato.zombie) {
      if (z.stato !== 'dentro' && z.stato !== 'attacco') continue;
      if (tipoDi(z).boss) continue;
      const d = distanza(z, buco);
      if (d > buco.raggio || !vistaLibera(buco, z, schermi)) continue;
      z.stato = 'dentro';
      z.trattenuto = 0.15;
      if (d > 0.3) {
        const passo = Math.min(d - 0.3, R.BUCO_ATTRAZIONE * dt);
        z.x += ((buco.x - z.x) / d) * passo;
        z.z += ((buco.z - z.z) / d) * passo;
      }
      if (ferisci && giocatore && d < R.BUCO_CUORE) ferisciZombie(stato, giocatore, z, Math.round(vitaZombie(Math.max(1, stato.round)) * FERITA_BUCO), {}, eventi);
    }
    if (buco.timer > 0) return true;
    eventi.push({ k: 'implosione', x: buco.x, y: buco.y, z: buco.z });
    if (!giocatore) return false;
    for (const z of stato.zombie) {
      if (z.stato === 'morto' || distanza(z, buco) > buco.implosione || !vistaLibera(buco, z, schermi)) continue;
      const forza = buco.potente ? 2 : 1;
      ferisciZombie(stato, giocatore, z, tipoDi(z).boss ? R.BUCO_DANNO_BOSS * forza : Math.round(vitaZombie(Math.max(1, stato.round)) * IMPLOSIONE_PER_VITA * forza), {}, eventi);
    }
    return false;
  });
}

function danneggia(stato, giocatore, zombie, danno, { testa = false, coltello = false, frantumato = false }, eventi) {
  const dati = tipoDi(zombie);
  zombie.vita -= danno;
  if (zombie.vita > 0) {
    aggiungiPunti(stato, giocatore, R.PUNTI_COLPO);
    if (dati.infuria && !zombie.corre && zombie.vita < zombie.vitaMax * dati.infuria) {
      zombie.corre = true;
      eventi.push({ k: 'infuriato', zombie: zombie.id, tipo: zombie.tipo });
    }
    if (dati.finale) {
      const fase = faseCustode(zombie.vita / zombie.vitaMax);
      if (fase > (zombie.faseBoss ?? 1)) {
        zombie.faseBoss = fase;
        zombie.corre = true;
        eventi.push({ k: 'faseBoss', fase });
      }
    }
    eventi.push({ k: 'colpito', zombie: zombie.id, testa, da: giocatore.id });
    return;
  }
  zombie.stato = 'morto';
  zombie.timer = RESTA_A_TERRA_DA_MORTO;
  eventi.push({ k: 'ucciso', zombie: zombie.id, testa, da: giocatore.id, x: zombie.x, z: zombie.z, tipo: zombie.tipo, ...(frantumato ? { frantumato: true } : {}) });
  giocatore.uccisioni += 1;
  aggiungiPunti(stato, giocatore, (coltello ? R.PUNTI_COLTELLO : testa ? R.PUNTI_TESTA : R.PUNTI_UCCISIONE) * dati.punti);
  if (dati.boss) bossUcciso(stato, zombie, eventi);
  else forseBonus(stato, zombie, eventi);
}

function puntoCaduta(zombie) {
  const fuori = zombie.stato === 'arriva' || zombie.stato === 'assi' || zombie.stato === 'scavalca';
  return fuori && zombie.finestra ? finestraDi(zombie.finestra).interno : zombie;
}

function forseBonus(stato, zombie, eventi) {
  if (stato.bonusRound >= R.BONUS_PER_ROUND || caso(stato) >= R.PROBABILITA_BONUS) return;
  const punto = puntoCaduta(zombie);
  stato.bonusRound += 1;
  creaBonus(stato, punto.x, punto.z, ELENCO_BONUS[Math.floor(caso(stato) * ELENCO_BONUS.length)], eventi);
}

function bossUcciso(stato, zombie, eventi) {
  for (const g of vivi(stato)) aggiungiPunti(stato, g, R.PUNTI_BOSS);
  eventi.push({ k: 'bossUcciso', tipo: zombie.tipo });
  if (zombie.tipo !== 'preside') return;
  const punto = puntoCaduta(zombie);
  creaBonus(stato, punto.x + 0.9, punto.z, ELENCO_BONUS[Math.floor(caso(stato) * ELENCO_BONUS.length)], eventi);
  if (!stato.missione.presideFusibile) return;
  stato.missione.presideFusibile = false;
  stato.missione.aTerra.push({ id: 1, x: punto.x, z: punto.z, y: 0.3 });
  eventi.push({ k: 'fusibileCaduto', x: punto.x, z: punto.z });
}

function raccogliFusibile(stato, giocatore, id, aperte, eventi) {
  const missione = stato.missione;
  const fusibile = missione.aTerra.find(f => f.id === id);
  if (!fusibile || distanza(giocatore, fusibile) > R.DISTANZA_FUSIBILE + TOLLERANZA_DISTANZA) return;
  const zona = zonaDi(fusibile.x, fusibile.z);
  if (zona && !aperte.has(zona)) return;
  missione.aTerra = missione.aTerra.filter(f => f !== fusibile);
  missione.fusibili += 1;
  for (const g of vivi(stato)) aggiungiPunti(stato, g, R.PUNTI_FUSIBILE);
  eventi.push({ k: 'fusibile', da: giocatore.id, trovati: missione.fusibili + missione.messi, totale: R.FUSIBILI });
}

function inserisciFusibili(stato, eventi) {
  const missione = stato.missione;
  if (!stato.corrente || missione.fusibili === 0) return;
  missione.messi += missione.fusibili;
  missione.fusibili = 0;
  eventi.push({ k: 'fusibiliMessi', messi: missione.messi, totale: R.FUSIBILI });
  if (missione.messi < R.FUSIBILI || stato.porte.includes('rifugio')) return;
  stato.porte.push('rifugio');
  eventi.push({ k: 'rifugio' });
}

function avviaGeneratore(stato, giocatore, eventi) {
  const missione = stato.missione;
  if (stato.fase !== 'gioco' || missione.generatore !== 'fermo') return;
  missione.generatore = 'acceso';
  missione.progresso = 0;
  eventi.push({ k: 'generatore', da: giocatore.id });
}

function aggiornaGeneratore(stato, dt, eventi) {
  const missione = stato.missione;
  if (missione.generatore !== 'acceso') return;
  if (vivi(stato).some(g => distanza(g, GENERATORE) <= R.DISTANZA_GENERATORE)) missione.progresso = Math.min(1, missione.progresso + dt / R.DURATA_GENERATORE);
  if (missione.progresso < 1) return;
  missione.generatore = 'finito';
  missione.aTerra.push({ id: 2, ...FUSIBILE_GENERATORE });
  eventi.push({ k: 'generatoreFinito' });
}

function iniziaFinale(stato, eventi) {
  stato.fase = 'finale';
  stato.daGenerare = 0;
  stato.presideTra = null;
  stato.porte = stato.porte.filter(p => p !== 'rifugio');
  const vita = Math.round(R.VITA_CUSTODE * moltiplicatoreBoss(stato.giocatori.length));
  stato.zombie.push({
    id: stato.prossimoId++, x: COMPARSA_CUSTODE.x, z: COMPARSA_CUSTODE.z, yaw: Math.PI, stato: 'dentro', finestra: FINESTRE_RIFUGIO[0],
    vita, vitaMax: vita, tipo: 'custode', corre: false, variante: 0, timer: 0, attesa: 2.5, bersaglio: null, scatto: 0, prossimoScatto: 6, faseBoss: 1,
  });
  stato.finale = { urlo: URLO_PER_FASE[0], rinforzi: 4, tempo: 0 };
  eventi.push({ k: 'finale' });
}

function aggiornaFinale(stato, dt, eventi) {
  const finale = stato.finale;
  finale.tempo += dt;
  const custode = stato.zombie.find(z => z.tipo === 'custode' && z.stato !== 'morto');
  if (!custode) {
    vittoria(stato, eventi);
    return;
  }
  const fase = faseCustode(custode.vita / custode.vitaMax);
  const presenti = stato.zombie.filter(z => z.stato !== 'morto').length;
  finale.rinforzi -= dt;
  if (finale.rinforzi <= 0) {
    if (presenti <= R.RINFORZI_FINALE_MAX) generaZombie(stato, { finestre: FINESTRE_RIFUGIO, corre: fase === 3 ? true : undefined });
    finale.rinforzi = fase === 3 ? 1.6 : 2.4;
  }
  finale.urlo -= dt;
  if (finale.urlo > 0) return;
  const quanti = 3 + fase;
  for (let i = 0; i < quanti && presenti + i < R.ZOMBIE_VIVI_MAX; i++) generaZombie(stato, { finestre: FINESTRE_RIFUGIO, corre: true });
  finale.urlo = URLO_PER_FASE[fase - 1];
  eventi.push({ k: 'urlo' });
}

function vittoria(stato, eventi) {
  stato.fase = 'vinta';
  for (const z of stato.zombie) {
    if (z.stato === 'morto') continue;
    z.stato = 'morto';
    z.timer = RESTA_A_TERRA_DA_MORTO;
    eventi.push({ k: 'ucciso', zombie: z.id, testa: false, da: null, x: z.x, z: z.z, bomba: true });
  }
  if (!stato.porte.includes('rifugio')) stato.porte.push('rifugio');
  for (const g of stato.giocatori) aggiungiPunti(stato, g, R.PUNTI_VITTORIA);
  eventi.push({
    k: 'vittoria', round: stato.round, durata: Math.round(stato.finale?.tempo ?? 0),
    giocatori: stato.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })),
  });
}

function lancia(stato, giocatore, azione, eventi) {
  if (giocatore.granate <= 0) return;
  giocatore.granate -= 1;
  const d = direzioneDa(Number(azione.yaw) || 0, Math.max(-1.2, Math.min(1.2, Number(azione.pitch) || 0)));
  stato.granate.push({
    id: stato.prossimaGranata++, x: giocatore.x, y: R.ALTEZZA_OCCHI - 0.15, z: giocatore.z,
    vx: d.x * R.VELOCITA_LANCIO, vy: d.y * R.VELOCITA_LANCIO + R.SPINTA_LANCIO, vz: d.z * R.VELOCITA_LANCIO,
    timer: R.MICCIA_GRANATA, da: giocatore.id,
  });
  eventi.push({ k: 'lancio', a: giocatore.id });
}

const sottoCielo = (x, z) => ZONE.some(zona => zona.aperto && x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1);

function urta(x, z, y, ostacoli) {
  return ostacoli.some(s => x > s.x0 - MARGINE_GRANATA && x < s.x1 + MARGINE_GRANATA && z > s.z0 - MARGINE_GRANATA && z < s.z1 + MARGINE_GRANATA && y < (s.altezza ?? ALTEZZA_SOFFITTO));
}

function aggiornaGranate(stato, dt, eventi) {
  if (stato.granate.length === 0) return;
  const ostacoli = ostacoliPerGiocatori(new Set(stato.porte));
  stato.granate = stato.granate.filter(gr => {
    gr.timer -= dt;
    gr.vy -= R.GRAVITA * dt;
    let y = gr.y + gr.vy * dt;
    const x = gr.x + gr.vx * dt;
    if (urta(x, gr.z, y, ostacoli)) gr.vx *= -RIMBALZO;
    else gr.x = x;
    const z = gr.z + gr.vz * dt;
    if (urta(gr.x, z, y, ostacoli)) gr.vz *= -RIMBALZO;
    else gr.z = z;
    if (y <= RAGGIO_GRANATA_FISICO) {
      y = RAGGIO_GRANATA_FISICO;
      const urto = Math.abs(gr.vy) >= 1;
      gr.vy = urto ? -gr.vy * RIMBALZO : 0;
      const frena = urto ? URTO_SUOLO : Math.max(0, 1 - ATTRITO_SUOLO * dt);
      gr.vx *= frena;
      gr.vz *= frena;
    }
    if (y >= ALTEZZA_SOFFITTO - RAGGIO_GRANATA_FISICO && !sottoCielo(gr.x, gr.z)) {
      y = ALTEZZA_SOFFITTO - RAGGIO_GRANATA_FISICO;
      gr.vy = -Math.abs(gr.vy) * RIMBALZO;
    }
    gr.y = y;
    if (gr.timer > 0) return true;
    esplodi(stato, gr, ostacoli, eventi);
    return false;
  });
}

function esplodi(stato, granata, ostacoli, eventi) {
  eventi.push({ k: 'esplosione', x: granata.x, y: granata.y, z: granata.z });
  const lanciatore = stato.giocatori.find(g => g.id === granata.da);
  if (!lanciatore) return;
  const schermi = ostacoli.filter(s => (s.altezza ?? ALTEZZA_SOFFITTO) >= ALTEZZA_SCHERMO_ESPLOSIONE);
  const base = dannoGranata(stato.round);
  for (const z of stato.zombie) {
    if (z.stato === 'morto') continue;
    const d = Math.hypot(z.x - granata.x, 0.9 - granata.y, z.z - granata.z);
    if (d > R.RAGGIO_GRANATA || !vistaLibera(granata, z, schermi)) continue;
    ferisciZombie(stato, lanciatore, z, Math.round(base * (0.35 + 0.65 * (1 - d / R.RAGGIO_GRANATA))), {}, eventi);
  }
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
      if (z.stato === 'morto' || tipoDi(z).boss) continue;
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
      armi: ['pistola'], armaAttiva: 'pistola', bevande: [], pronto: false, uccisioni: 0, teletrasporto: g.teletrasporto + 1, granate: R.GRANATE_INIZIALI,
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
    if (giocatore.stato !== 'vivo' || stato.fase === 'fine' || stato.fase === 'vinta') continue;
    if (azione.tipo === 'colpo') colpisci(stato, giocatore, azione, eventi);
    else if (azione.tipo === 'pronto') giocatore.pronto = stato.fase === 'attesa' && !!azione.attivo;
    else if (stato.fase === 'attesa') continue;
    else if (azione.tipo === 'compra') compra(stato, giocatore, String(azione.acquisto), azione.arma, eventi);
    else if (azione.tipo === 'assa') ricostruisci(stato, giocatore, azione.finestra, eventi);
    else if (azione.tipo === 'frammento') frammento(stato, giocatore, Number(azione.id), eventi);
    else if (azione.tipo === 'granata') lancia(stato, giocatore, azione, eventi);
    else if (azione.tipo === 'sparo') sparaProiettile(stato, giocatore, azione, eventi);
    else if (azione.tipo === 'catena') catena(stato, giocatore, azione, eventi);
  }
}

function generaZombie(stato, { tipo: tipoVoluto = null, finestre: soloFinestre = null, corre: correVoluto } = {}) {
  const aperte = zoneAperte(new Set(stato.porte));
  const finestre = soloFinestre ? FINESTRE.filter(f => soloFinestre.includes(f.id)) : FINESTRE.filter(f => aperte.has(f.zona));
  const finestra = finestre[Math.floor(caso(stato) * finestre.length)];
  const tipo = tipoVoluto ?? tipoZombie(stato.round, caso(stato));
  const dati = TIPI_ZOMBIE[tipo];
  const corre = dati.boss ? false : correVoluto ?? (!!dati.corre || caso(stato) < quotaCorridori(stato.round));
  const vita = Math.round(vitaZombie(Math.max(1, stato.round)) * dati.vita * (dati.boss ? moltiplicatoreBoss(stato.giocatori.length) : 1));
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
  if (stato.fase === 'finale') {
    aggiornaFinale(stato, dt, eventi);
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
    stato.presideTra = stato.round % R.OGNI_PRESIDE === 0 ? R.PRESIDE_DOPO : null;
    for (const g of stato.giocatori) {
      if (g.stato === 'vivo' && stato.round > 1) g.granate = Math.min(R.GRANATE_MASSIME, g.granate + R.GRANATE_PER_ROUND);
      if (g.stato !== 'morto') continue;
      const partenza = PARTENZE[0];
      Object.assign(g, { stato: 'vivo', vita: R.VITA, vitaMax: R.VITA, x: partenza.x, z: partenza.z, armi: ['pistola'], armaAttiva: 'pistola', bevande: [], rianimando: false, teletrasporto: g.teletrasporto + 1, granate: R.GRANATE_INIZIALI });
      eventi.push({ k: 'rinato', a: g.id });
    }
    eventi.push({ k: 'round', round: stato.round });
    return;
  }
  if (stato.fase !== 'gioco') return;
  if (stato.presideTra !== null) {
    stato.presideTra -= dt;
    if (stato.presideTra <= 0) {
      stato.presideTra = null;
      generaZombie(stato, { tipo: 'preside' });
      eventi.push({ k: 'boss', tipo: 'preside', fusibile: stato.missione.presideFusibile });
    }
  }
  const generatore = stato.missione.generatore === 'acceso';
  if (generatore && stato.daGenerare < 2) stato.daGenerare = 2;
  stato.attesaComparsa -= dt;
  const presenti = stato.zombie.filter(z => z.stato !== 'morto').length;
  if (stato.attesaComparsa <= 0 && stato.daGenerare > 0 && presenti < R.ZOMBIE_VIVI_MAX) {
    generaZombie(stato);
    stato.daGenerare -= 1;
    stato.attesaComparsa = attesaComparsa(stato.round) * (generatore ? 0.6 : 1);
    return;
  }
  if (stato.daGenerare === 0 && presenti === 0 && stato.presideTra === null) {
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
    z.attesa = Math.max(0, z.attesa - dt);
    const dati = tipoDi(z);
    const furia = dati.finale && (z.faseBoss ?? 1) >= 3;
    if (z.stato !== 'morto' && z.gelato > 0) {
      z.gelato -= dt;
      if (z.gelato <= 0) frantuma(stato, z, eventi);
      continue;
    }
    if (z.gelo > 0) z.gelo = Math.max(0, z.gelo - R.GELO_CALO * dt);
    if (z.stato === 'dentro' && z.trattenuto > 0) {
      z.trattenuto -= dt;
      continue;
    }
    if (z.scossa > 0 && z.stato !== 'morto') {
      z.scossa -= dt;
      continue;
    }
    const lentezza = 1 - Math.min(0.85, z.gelo ?? 0);
    const velocita = z.scatto > 0 ? R.VELOCITA_SCATTO * lentezza : (z.corre ? R.VELOCITA_CORRE : R.VELOCITA_CAMMINA) * dati.velocita * (furia ? 1.25 : 1) * lentezza;
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
        z.timer = R.ROMPI_ASSE_OGNI / (dati.rompe ?? 1);
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
          z.timer = R.ROMPI_ASSE_OGNI / (dati.rompe ?? 1);
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
      z.attesa = R.ATTESA_ATTACCO * (dati.attesa ?? 1) * (furia ? 0.7 : 1);
      continue;
    }
    if (vicino && vicino.d <= portata && z.attesa === 0) {
      z.stato = 'attacco';
      z.timer = CARICA_ATTACCO * (dati.carica ?? 1);
      z.bersaglio = vicino.g.id;
      z.scatto = 0;
      eventi.push({ k: 'attacco', zombie: z.id });
      continue;
    }
    if (vicino && vicino.d <= portata * 0.8) continue;
    const preda = dati.finale ? scatto(stato, z, dt, ostacoli, eventi) : null;
    const verso = preda
      ? { x: (preda.x - z.x) / (distanza(preda, z) || 1), z: (preda.z - z.z) / (distanza(preda, z) || 1) }
      : vicino && vicino.d < 1.5 ? { x: (vicino.g.x - z.x) / vicino.d, z: (vicino.g.z - z.z) / vicino.d } : direzione(stato.campo, z.x, z.z);
    if (!verso) continue;
    const nuova = muoviCerchio(z, verso.x * velocita * dt, verso.z * velocita * dt, R.RAGGIO_ZOMBIE, ostacoli);
    z.x = nuova.x;
    z.z = nuova.z;
    z.yaw = Math.atan2(verso.x, verso.z);
  }
  separa(stato.zombie.filter(z => z.stato === 'dentro' || z.stato === 'arriva' || z.stato === 'assi'));
  stato.zombie = stato.zombie.filter(z => z.stato !== 'morto' || z.timer > 0);
}

function scatto(stato, z, dt, ostacoli, eventi) {
  z.prossimoScatto = Math.max(0, (z.prossimoScatto ?? 0) - dt);
  z.scatto = Math.max(0, (z.scatto ?? 0) - dt);
  if (z.scatto > 0) return vivi(stato).find(g => g.id === z.bersaglioScatto) ?? null;
  if (z.prossimoScatto > 0 || (z.faseBoss ?? 1) < 2) return null;
  const prede = vivi(stato)
    .map(g => ({ g, d: distanza(g, z) }))
    .filter(p => p.d > 4 && p.d < 14 && vistaLibera(z, p.g, ostacoli))
    .sort((a, b) => a.d - b.d);
  if (prede.length === 0) return null;
  z.scatto = R.DURATA_SCATTO;
  z.prossimoScatto = z.faseBoss >= 3 ? 5 : 8;
  z.bersaglioScatto = prede[0].g.id;
  eventi.push({ k: 'scatto', zombie: z.id });
  return prede[0].g;
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
  if (stato.fase === 'fine' || stato.fase === 'vinta') return eventi;
  stato.tempo += dt;
  aggiornaPosizioni(stato, posizioni);
  eseguiAzioni(stato, azioni, eventi);
  avanzaFase(stato, dt, eventi);
  muoviZombie(stato, dt, eventi);
  aggiornaGiocatori(stato, dt, eventi);
  aggiornaCassa(stato, dt, eventi);
  aggiornaPotenziatore(stato, dt, eventi);
  aggiornaBonus(stato, dt, eventi);
  aggiornaGranate(stato, dt, eventi);
  aggiornaProiettili(stato, dt, eventi);
  aggiornaBuchi(stato, dt, eventi);
  aggiornaGeneratore(stato, dt, eventi);
  if (stato.fase === 'vinta') return eventi;
  if (stato.giocatori.length > 0 && vivi(stato).length === 0) {
    stato.fase = 'fine';
    eventi.push({ k: 'fine', round: stato.round, giocatori: stato.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
  }
  return eventi;
}
