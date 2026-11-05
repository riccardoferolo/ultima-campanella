import { R, ARMI_CASSA, PESI_CASSA, BEVANDE, zombieDelRound, vitaZombie, quotaCorridori, attesaComparsa } from './regole.js';
import { passoCaso } from './caso.js';
import { FINESTRE, PORTE, ACQUISTI, PARTENZE, zoneAperte, ostacoliPerGiocatori } from './mappa.js';
import { muoviCerchio, vistaLibera } from './fisica.js';
import { griglia, campoVerso, direzione } from './navigazione.js';

const PRIMO_ROUND_TRA = 3;
const TOLLERANZA_DISTANZA = 0.8;
const DANNO_MASSIMO_COLPO = 2000;
const AGGIORNA_CAMPO_OGNI = 0.25;
const RESTA_A_TERRA_DA_MORTO = 4;
const CARICA_ATTACCO = 0.55;
const SEPARAZIONE = 0.75;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const finestraDi = id => FINESTRE.find(f => f.id === id);

function caso(stato) {
  const [valore, nuovo] = passoCaso(stato.rng);
  stato.rng = nuovo;
  return valore;
}

export function creaPartita({ seme, giocatori = [] }) {
  const stato = {
    seme: seme >>> 0,
    rng: (seme ^ 0x5bd1e995) >>> 0,
    tempo: 0,
    fase: 'intervallo',
    timerFase: PRIMO_ROUND_TRA,
    round: 0,
    daGenerare: 0,
    attesaComparsa: 0,
    prossimoId: 1,
    zombie: [],
    finestre: Object.fromEntries(FINESTRE.map(f => [f.id, R.ASSE_PER_FINESTRA])),
    porte: [],
    giocatori: [],
    cassa: { stato: 'chiusa', arma: null, per: null, timer: 0 },
    campo: null,
    attesaCampo: 0,
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
  const partenza = PARTENZE[stato.giocatori.length % PARTENZE.length];
  const giocatore = {
    id, nome, x: partenza.x, z: partenza.z, yaw: Math.PI, pitch: 0,
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
    const possiede = giocatore.armi.includes(acquisto.arma);
    const costo = possiede ? acquisto.munizioni : acquisto.costo;
    if (giocatore.punti < costo) return;
    giocatore.punti -= costo;
    if (possiede) eventi.push({ k: 'munizioni', a: giocatore.id, arma: acquisto.arma });
    else prendiArma(stato, giocatore, acquisto.arma, eventi);
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
  if (cassa.stato !== 'chiusa' || giocatore.punti < R.COSTO_CASSA) return;
  giocatore.punti -= R.COSTO_CASSA;
  const arma = sceltaPesata(ARMI_CASSA.filter(a => !giocatore.armi.includes(a)), caso(stato));
  Object.assign(cassa, { stato: 'aperta', arma, per: giocatore.id, timer: R.DURATA_CASSA });
  eventi.push({ k: 'cassa', a: giocatore.id, arma });
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
  const danno = Math.min(DANNO_MASSIMO_COLPO, Math.max(0, Number(azione.danno) || 0));
  zombie.vita -= danno;
  if (zombie.vita > 0) {
    giocatore.punti += R.PUNTI_COLPO;
    eventi.push({ k: 'colpito', zombie: zombie.id, testa: !!azione.testa, da: giocatore.id });
    return;
  }
  zombie.stato = 'morto';
  zombie.timer = RESTA_A_TERRA_DA_MORTO;
  giocatore.uccisioni += 1;
  giocatore.punti += azione.coltello ? R.PUNTI_COLTELLO : azione.testa ? R.PUNTI_TESTA : R.PUNTI_UCCISIONE;
  eventi.push({ k: 'ucciso', zombie: zombie.id, testa: !!azione.testa, da: giocatore.id, x: zombie.x, z: zombie.z });
}

function ricostruisci(stato, giocatore, idFinestra, eventi) {
  const finestra = finestraDi(idFinestra);
  if (!finestra || giocatore.attesaAssa > 0) return;
  if (stato.finestre[finestra.id] >= R.ASSE_PER_FINESTRA) return;
  if (distanza(giocatore, finestra.interno) > R.DISTANZA_FINESTRA + TOLLERANZA_DISTANZA) return;
  if (stato.zombie.some(z => z.finestra === finestra.id && z.stato === 'scavalca')) return;
  stato.finestre[finestra.id] += 1;
  giocatore.punti += R.PUNTI_ASSA;
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
    else if (azione.tipo === 'compra') compra(stato, giocatore, String(azione.acquisto), azione.arma, eventi);
    else if (azione.tipo === 'assa') ricostruisci(stato, giocatore, azione.finestra, eventi);
  }
}

function generaZombie(stato) {
  const aperte = zoneAperte(new Set(stato.porte));
  const finestre = FINESTRE.filter(f => aperte.has(f.zona));
  const finestra = finestre[Math.floor(caso(stato) * finestre.length)];
  const corre = caso(stato) < quotaCorridori(stato.round);
  const vita = vitaZombie(stato.round);
  stato.zombie.push({
    id: stato.prossimoId++, x: finestra.comparsa.x + (caso(stato) - 0.5) * 2, z: finestra.comparsa.z + (caso(stato) - 0.5) * 2,
    yaw: Math.atan2(-finestra.fuori.x, -finestra.fuori.z), stato: 'arriva', finestra: finestra.id, vita, vitaMax: vita,
    corre, variante: Math.floor(caso(stato) * 4), timer: 0, attesa: 0, bersaglio: null,
  });
}

function avanzaFase(stato, dt, eventi) {
  if (stato.fase === 'intervallo') {
    stato.timerFase -= dt;
    if (stato.timerFase > 0) return;
    stato.round += 1;
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
    z.attesa = Math.max(0, z.attesa - dt);
    const velocita = z.corre ? R.VELOCITA_CORRE : R.VELOCITA_CAMMINA;
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
      if (bersaglio && distanza(bersaglio, z) <= R.PORTATA_ZOMBIE + 0.4) ferisci(stato, bersaglio, eventi);
      z.stato = 'dentro';
      z.attesa = R.ATTESA_ATTACCO;
      continue;
    }
    if (vicino && vicino.d <= R.PORTATA_ZOMBIE && z.attesa === 0) {
      z.stato = 'attacco';
      z.timer = CARICA_ATTACCO;
      z.bersaglio = vicino.g.id;
      eventi.push({ k: 'attacco', zombie: z.id });
      continue;
    }
    if (vicino && vicino.d <= R.PORTATA_ZOMBIE * 0.8) continue;
    const verso = vicino && vicino.d < 1.5 ? { x: (vicino.g.x - z.x) / vicino.d, z: (vicino.g.z - z.z) / vicino.d } : direzione(stato.campo, z.x, z.z);
    if (!verso) continue;
    const nuova = muoviCerchio(z, verso.x * velocita * dt, verso.z * velocita * dt, R.RAGGIO_ZOMBIE, ostacoli);
    z.x = nuova.x;
    z.z = nuova.z;
    z.yaw = Math.atan2(verso.x, verso.z);
  }
  separa(stato.zombie.filter(z => z.stato === 'dentro' || z.stato === 'arriva' || z.stato === 'assi'));
  stato.zombie = stato.zombie.filter(z => z.stato !== 'morto' || z.timer > 0);
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

function ferisci(stato, giocatore, eventi) {
  giocatore.vita -= R.DANNO_ZOMBIE;
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
  if (stato.giocatori.length > 0 && vivi(stato).length === 0) {
    stato.fase = 'fine';
    eventi.push({ k: 'fine', round: stato.round, giocatori: stato.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
  }
  return eventi;
}
