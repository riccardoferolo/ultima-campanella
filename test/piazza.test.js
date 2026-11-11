import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI } from '../src/regole.js';
import { ZONE, MURI, OSTACOLI, FINESTRE, PORTE, ACQUISTI, FRAMMENTI, zonaDi, quota, ostacoliPerGiocatori, zoneAperte, NOMI_MAPPE, ELENCO_MAPPE } from '../src/mappa.js';
import { OGGETTI, CASE, PAVIMENTO_CHIESA, PAVIMENTO_PRESBITERIO, PAVIMENTO_SAGRATO, PIANO_CONSIGLIO, PIANO_CELLA, ALTEZZA_CAMPANILE } from '../src/mappe/piazza.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import {
  COSTO_CAMPANILE, TEMPO_CELLA, COSTO_CAMPANE, RICARICA_CAMPANE, STORDIMENTO_CAMPANE, RICARICA_BENEDETTA,
  VOTO, ORE_DEL_BEATO, ANIME_VEGLIA, LUNGHEZZA_CARRO, PUNTI_PACE, NUMERI_OROLOGIO, RAGGIO_DONI, CENTRO_DONI,
  oraColpita, puntoCarro, portaCheFerma, occhiDi,
} from '../src/piazza.js';
import { ELENCO_BONUS } from '../src/regole.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (tipo, extra = {}, da = 'a') => ({ azioni: [{ da, tipo, ...extra }] });
const compra = (stato, acquisto, da = 'a') => avanza(stato, R.PASSO, una('compra', { acquisto }, da));
const davanti = id => {
  const a = ACQUISTI.find(x => x.id === id);
  return { x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 };
};
const giocatore = (stato, id = 'a') => stato.giocatori.find(g => g.id === id);
const metti = (stato, punto, id = 'a') => Object.assign(giocatore(stato, id), { x: punto.x, z: punto.z });

function piazza({ giocatori = [{ id: 'a', nome: 'A' }], seme = 11 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'piazza' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

const zombie = (stato, extra = {}) => {
  const z = { id: 7000 + stato.zombie.length, x: -10, z: 10, yaw: 0, stato: 'dentro', finestra: 'p1', vita: 100, vitaMax: 100, tipo: 'normale', corre: true, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
};

function accendi(stato) {
  stato.porte.push('transenneNord', 'sacrestia');
  metti(stato, davanti('interruttore'));
  compra(stato, 'interruttore');
  assert.equal(stato.corrente, true);
}

function salta(stato) {
  stato.porte.push('transenneSud', 'tempietto');
  metti(stato, davanti('campanile'));
  return compra(stato, 'campanile');
}

test('la piazza di Cerano è nella scelta delle mappe', () => {
  assert.ok(ELENCO_MAPPE.includes('piazza'));
  assert.equal(NOMI_MAPPE.piazza, 'Piazza di Cerano');
  assert.equal(creaPartita({ seme: 1, mappa: 'piazza' }).mappa, 'piazza');
});

test('la piazza è tutta collegata, ogni barricata e ogni acquisto stanno nella loro zona', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  const tutte = new Set(PORTE.map(p => p.id));
  const campo = campoVerso(griglia(tutte), [{ x: -12, z: 4 }]);
  for (const z of ZONE.filter(q => !q.sala && q.id !== 'cella')) {
    const punti = [];
    for (let i = 1; i < 8; i++) for (let j = 1; j < 8; j++) punti.push([z.x0 + ((z.x1 - z.x0) * i) / 8, z.z0 + ((z.z1 - z.z0) * j) / 8]);
    assert.ok(punti.some(([x, q]) => Number.isFinite(distanzaCampo(campo, x, q))), z.id);
  }
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, f.id);
    assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `${f.id} murata`);
  }
  const ostacoli = ostacoliPerGiocatori(tutte);
  for (const a of ACQUISTI) {
    assert.equal(zonaDi(a.posizione.x, a.posizione.z), a.zona, a.id);
    const p = davanti(a.id);
    assert.ok(!ostacoli.some(s => dentroScatola(p.x, p.z, s, R.RAGGIO_GIOCATORE * 0.5)), `${a.id}: non ci si arriva davanti`);
  }
  const aperte = zoneAperte(new Set());
  for (const id of ['piazza', 'piazzaOvest', 'sagratoSud', 'cella']) assert.ok(aperte.has(id), id);
  assert.ok(!Number.isFinite(distanzaCampo(campo, 34, 15.4)), 'gli zombie non salgono sul campanile');
});

test('le misure vengono dalla pianta vera di piazza Crespi', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  const facciata = MURI.filter(m => m.parte === 'facciata');
  assert.equal(Math.min(...facciata.map(m => m.z0)), -11.35);
  assert.equal(Math.max(...facciata.map(m => m.z1)), 11.4);
  assert.equal(Math.max(...MURI.filter(m => m.parte === 'abside').map(m => m.x1)), 57.3);
  assert.equal(ALTEZZA_CAMPANILE, 45);
  assert.ok(Math.abs(OGGETTI.FONTANA.x + 24.8) < 0.01 && Math.abs(OGGETTI.FONTANA.z - 1) < 0.01, 'la fontana del Beato Pacifico sta davanti alla facciata');
  const municipio = MURI.filter(m => m.parte === 'municipioFronte');
  assert.equal(Math.min(...municipio.map(m => m.x0)), -12);
  assert.equal(Math.max(...municipio.map(m => m.x1)), 18);
  assert.equal(Math.min(...municipio.map(m => m.z1)), -19.7);
  assert.ok(CASE.some(c => c.nome === 'portici' && c.portici), 'la casa coi portici chiude la piazza a nord-ovest');
});

test('i piani: sagrato, chiesa, presbiterio, scalone, sala del Consiglio e cella campanaria', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  assert.equal(quota(-5, 0), PAVIMENTO_SAGRATO);
  assert.equal(quota(-12, 0), 0);
  assert.equal(quota(10, 0), PAVIMENTO_CHIESA);
  assert.equal(quota(48, 0), PAVIMENTO_PRESBITERIO);
  assert.equal(quota(7, -28), 0);
  assert.ok(quota(7, -31.7) > 1.5 && quota(7, -31.7) < 3, 'a metà scalone si è a metà piano');
  assert.equal(quota(7, -40), PIANO_CONSIGLIO);
  assert.equal(quota(34, 15.4), PIANO_CELLA);
  assert.equal(quota(-5, -23), 0);
});

test('prima della corrente le bibite sono spente, il quadro in sacrestia la riaccende', () => {
  const stato = piazza();
  metti(stato, davanti('bibita-ritorno'));
  const punti = giocatore(stato).punti;
  compra(stato, 'bibita-ritorno');
  assert.equal(giocatore(stato).punti, punti);
  assert.ok(!giocatore(stato).bevande.includes('ritorno'));
  accendi(stato);
  metti(stato, davanti('bibita-ritorno'));
  compra(stato, 'bibita-ritorno');
  assert.ok(giocatore(stato).bevande.includes('ritorno'));
});

test('il campanile si sale a pagamento con la corrente, dopo 40 secondi si scende nel Tempietto', () => {
  const stato = piazza();
  salta(stato);
  assert.notEqual(zonaDi(giocatore(stato).x, giocatore(stato).z), 'cella', 'senza corrente la scala è al buio');
  accendi(stato);
  const punti = giocatore(stato).punti;
  const tp = giocatore(stato).teletrasporto;
  const eventi = salta(stato);
  assert.ok(eventi.some(e => e.k === 'campanile' && e.secondi === TEMPO_CELLA));
  assert.equal(giocatore(stato).punti, punti - COSTO_CAMPANILE);
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'cella');
  assert.equal(quota(giocatore(stato).x, giocatore(stato).z), PIANO_CELLA);
  assert.equal(giocatore(stato).teletrasporto, tp + 1);
  const giu = avanza(stato, TEMPO_CELLA + 0.2);
  assert.ok(giu.some(e => e.k === 'discesaCampanile'));
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'tempietto');
  salta(stato);
  metti(stato, davanti('discesa'));
  compra(stato, 'discesa');
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'tempietto');
  assert.deepEqual(stato.piazza.sopra, {});
});

test('la Fonderia nella cella campanaria potenzia con la corrente', () => {
  const stato = piazza();
  accendi(stato);
  salta(stato);
  metti(stato, davanti('potenziatore'));
  avanza(stato, R.PASSO, una('compra', { acquisto: 'potenziatore', arma: giocatore(stato).armaAttiva }));
  assert.equal(stato.potenziatore.stato, 'lavora');
});

test('le campane a distesa stordiscono gli zombie, non i boss, e poi vanno lasciate riposare', () => {
  const stato = piazza();
  accendi(stato);
  salta(stato);
  const fermo = zombie(stato, { x: -10, z: 10 });
  const capo = zombie(stato, { x: -12, z: 12, tipo: 'preside', vita: 1e6, vitaMax: 1e6 });
  metti(stato, davanti('campane'));
  const punti = giocatore(stato).punti;
  const eventi = compra(stato, 'campane');
  assert.ok(eventi.some(e => e.k === 'campane' && e.storditi === 1 && e.secondi === STORDIMENTO_CAMPANE));
  assert.equal(giocatore(stato).punti, punti - COSTO_CAMPANE);
  assert.ok(fermo.scossa > 0);
  assert.ok(!(capo.scossa > 0));
  stato.zombie = stato.zombie.filter(z => z !== capo);
  const prima = { x: fermo.x, z: fermo.z };
  metti(stato, { x: -9, z: 9 }, 'a');
  avanza(stato, STORDIMENTO_CAMPANE - 1);
  assert.deepEqual({ x: fermo.x, z: fermo.z }, prima, 'stordito non si muove');
  metti(stato, davanti('campane'));
  const ancora = giocatore(stato).punti;
  compra(stato, 'campane');
  assert.equal(giocatore(stato).punti, ancora, 'le campane vibrano ancora');
  assert.ok(stato.piazza.campane > 0 && stato.piazza.campane <= RICARICA_CAMPANE);
});

test('chi cade a terra sul campanile viene portato giù, dove gli amici possono rianimarlo', () => {
  const stato = piazza({ giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }] });
  accendi(stato);
  salta(stato);
  Object.assign(giocatore(stato), { stato: 'terra', vita: 0 });
  avanza(stato, R.PASSO * 2);
  assert.deepEqual(stato.piazza.sopra, {});
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'tempietto');
});

test('chi resta nella cella senza tempo può sempre scendere, e in sala le campane non suonano', () => {
  const stato = piazza();
  accendi(stato);
  salta(stato);
  delete stato.piazza.sopra.a;
  metti(stato, davanti('discesa'));
  compra(stato, 'discesa');
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'tempietto');
  const sala = creaPartita({ seme: 2, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'piazza' });
  Object.assign(sala, { corrente: true, fase: 'attesa' });
  Object.assign(giocatore(sala), { punti: 99999 });
  assert.equal(sala.fase, 'attesa');
  metti(sala, davanti('campane'));
  compra(sala, 'campane');
  assert.equal(sala.piazza.campane, 0);
});

test("l'istantanea della piazza porta campane e cella, e la rete la accetta", () => {
  const stato = piazza();
  accendi(stato);
  salta(stato);
  metti(stato, davanti('campane'));
  compra(stato, 'campane');
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(ist);
  assert.equal(vista.mappa, 'piazza');
  assert.ok(vista.piazza.campane > 0);
  assert.equal(vista.piazza.rintocchi, 1);
  assert.ok(vista.piazza.sopra.a > 0);
  assert.equal(espandi(faiIstantanea(creaPartita({ seme: 1, mappa: 'scuola' }))).piazza, null);
  assert.equal(valida({ t: 'st', g: 1, ist: { ...ist, cs: [['a', 'x']] } }), null);
  assert.equal(valida({ t: 'st', g: 1, ist: { ...ist, cq: [1] } }), null);
});

test('le cinque statuette in cotto svegliano il segreto', () => {
  const stato = piazza();
  assert.equal(FRAMMENTI.length, 5);
  let eventi = [];
  for (const f of FRAMMENTI) {
    metti(stato, f);
    eventi = eventi.concat(avanza(stato, R.PASSO, una('frammento', { id: f.id })));
  }
  assert.ok(eventi.some(e => e.k === 'segreto'));
  assert.ok(giocatore(stato).armi.some(a => ARMI[a]));
  assert.equal(stato.frammenti.length, 5);
});

test('i morti risalgono dalle lapidi della chiesa solo quando la chiesa è aperta', () => {
  const stato = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'piazza' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  const tombe = new Set(FINESTRE.filter(f => f.tana && f.zona !== 'piazza').map(f => f.id));
  Object.assign(giocatore(stato), { vita: 1e9, vitaMax: 1e9 });
  avanza(stato, 20);
  assert.ok(!stato.zombie.some(z => tombe.has(z.finestra)), 'a chiesa chiusa nessuno esce dalle lapidi');
  stato.porte.push('portone');
  Object.assign(stato, { daGenerare: 60, attesaComparsa: 0 });
  avanza(stato, 60, () => {
    for (const z of stato.zombie) if (z.stato !== 'morto' && !tombe.has(z.finestra)) Object.assign(z, { stato: 'morto', timer: 0.1 });
    return {};
  });
  assert.ok(stato.zombie.some(z => tombe.has(z.finestra)), 'aperta la chiesa, qualcuno risale dalle lapidi');
});

const statue = stato => FRAMMENTI.flatMap(f => {
  metti(stato, f);
  return avanza(stato, R.PASSO, una('frammento', { id: f.id }));
});
const voto = stato => stato.piazza.voto;
const verso = (o, p) => {
  const d = { x: p.x - o.x, y: p.y - o.y, z: p.z - o.z };
  const l = Math.hypot(d.x, d.y, d.z);
  return { x: d.x / l, y: d.y / l, z: d.z / l };
};
const DAL_SAGRATO = Object.freeze({ x: 8, z: 22 });
const mira = (da, n) => {
  const bersaglio = NUMERI_OROLOGIO.find(q => q.ora === n && q.n.x === -1);
  const d = verso(occhiDi(da), bersaglio);
  return { yaw: Math.atan2(d.x, d.z), pitch: Math.asin(d.y) };
};
const ora = (stato, n) => {
  metti(stato, DAL_SAGRATO);
  return avanza(stato, R.PASSO, una('orologio', mira(DAL_SAGRATO, n)));
};
const uccidi = (stato, z) => avanza(stato, R.PASSO, una('colpo', { zombie: z.id, danno: 8000 }));

test('la piazza non è più un campo aperto: ingombri nel mezzo e tre tombini da cui risalgono i morti', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  const ingombri = OSTACOLI.filter(o => o.tipo !== 'lampione' && o.tipo !== 'casa' && zonaDi((o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2) === 'piazza');
  assert.ok(ingombri.length >= 10, `solo ${ingombri.length} ingombri in piazza`);
  for (const z of [-15, -8.8, 0, 12.3, 20, 26]) {
    assert.ok(ingombri.some(o => o.z0 <= z && o.z1 >= z), `a z=${z} la piazza si attraversa senza ostacoli`);
  }
  const tombini = FINESTRE.filter(f => f.tana && f.zona === 'piazza');
  assert.equal(tombini.length, 3);
  for (const t of tombini) assert.ok(!OSTACOLI.some(o => dentroScatola(t.interno.x, t.interno.z, o, 0.6)), `${t.id} sotto un ingombro`);
  const ids = new Set(tombini.map(t => t.id));
  const stato = creaPartita({ seme: 5, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'piazza' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(giocatore(stato), { vita: 1e9, vitaMax: 1e9 });
  Object.assign(stato, { daGenerare: 60, attesaComparsa: 0 });
  avanza(stato, 60, () => {
    for (const z of stato.zombie) if (z.stato !== 'morto' && !ids.has(z.finestra)) Object.assign(z, { stato: 'morto', timer: 0.1 });
    return {};
  });
  assert.ok(stato.zombie.some(z => ids.has(z.finestra)), 'nessuno è risalito dai tombini');
});

test('il carro del Beato ha la strada libera dagli ingombri', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  const leggio = a => ({ x0: a.posizione.x - 0.3, z0: a.posizione.z - 0.3, x1: a.posizione.x + 0.3, z1: a.posizione.z + 0.3 });
  const muri = [...MURI, ...OSTACOLI, ...ACQUISTI.map(leggio)];
  for (let s = 0; s <= LUNGHEZZA_CARRO; s += 0.25) {
    const p = puntoCarro(s);
    const urta = muri.find(m => dentroScatola(p.x, p.z, m, 0.8));
    assert.ok(!urta || PORTE.some(q => dentroScatola(p.x, p.z, q.scatola, 0.9)), `a ${s.toFixed(1)} m il carro urta ${urta?.tipo ?? urta?.parte}`);
  }
});

test('il libro della Summa compare in sacrestia solo dopo le cinque statue', () => {
  const stato = piazza();
  accendi(stato);
  metti(stato, davanti('libro'));
  assert.ok(!compra(stato, 'libro').some(e => e.k === 'summa'));
  assert.equal(voto(stato).fase, VOTO.STATUE);
  const eventi = statue(stato);
  assert.equal(voto(stato).fase, VOTO.LIBRO);
  assert.ok(eventi.some(e => e.k === 'libroBeato'));
  metti(stato, davanti('libro'));
  assert.ok(compra(stato, 'libro').some(e => e.k === 'summa' && e.prima));
  assert.equal(voto(stato).fase, VOTO.OROLOGIO);
  assert.ok(compra(stato, 'libro').some(e => e.k === 'summa' && !e.prima), 'la Summa si può rileggere');
});

test("le ore del campanile vanno colpite nell'ordine della morte del Beato, il 4 giugno 1482", () => {
  const stato = piazza();
  assert.deepEqual([...ORE_DEL_BEATO], [4, 6, 1, 4, 8, 2]);
  ora(stato, 4);
  assert.equal(voto(stato).ore, 0, "prima del libro l'orologio non ascolta");
  voto(stato).fase = VOTO.OROLOGIO;
  [4, 4, 4, 6, 6, 1].forEach(n => ora(stato, n));
  assert.equal(voto(stato).ore, 3, "i colpi in più sull'ora appena presa non contano e non azzerano");
  assert.ok(ora(stato, 5).some(e => e.k === 'oraSbagliata'));
  assert.equal(voto(stato).ore, 0, "un'ora sbagliata fa ricominciare");
  ora(stato, 4);
  assert.equal(voto(stato).ore, 1, 'il quattro sbagliato riparte come primo');
  const rintocchi = stato.piazza.rintocchi;
  const eventi = [6, 1, 4, 8, 2].flatMap(n => ora(stato, n));
  assert.ok(eventi.some(e => e.k === 'ritornoBeato'));
  assert.equal(voto(stato).fase, VOTO.CARRO);
  assert.equal(stato.piazza.rintocchi, rintocchi + 1, 'le campane suonano da sole');
});

test("l'orologio si colpisce dal fianco della chiesa, non attraverso la facciata", () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  assert.equal(NUMERI_OROLOGIO.length, 48);
  const ovest = n => NUMERI_OROLOGIO.find(q => q.ora === n && q.n.x === -1);
  assert.ok(Math.abs(ovest(12).y - OGGETTI.OROLOGIO - 1.025) < 0.01, 'il XII sta in alto');
  assert.ok(ovest(3).z > ovest(12).z + 1, 'guardando da ovest il III sta a destra, verso sud');
  const dalSagrato = { x: 6, y: 1.7, z: 24 };
  assert.equal(oraColpita(dalSagrato, verso(dalSagrato, ovest(4))), 4);
  const dalFondo = { x: -14, y: 1.7, z: 22 };
  assert.equal(oraColpita(dalFondo, verso(dalFondo, ovest(4))), 4, 'dal fondo della piazza si vede sopra il Tempietto');
  const davantiFacciata = { x: -10, y: 1.7, z: 0 };
  assert.equal(oraColpita(davantiFacciata, verso(davantiFacciata, ovest(4))), null, 'la facciata copre il campanile');
  assert.equal(oraColpita(dalSagrato, { x: 0, y: 1, z: 0 }), null);
});

test('il carro avanza solo scortato, si ferma coi Dannati addosso e aspetta che si aprano le porte', () => {
  const stato = piazza();
  Object.assign(voto(stato), { fase: VOTO.CARRO, carro: 0 });
  avanza(stato, 2);
  assert.equal(voto(stato).carro, 0, 'da solo il carro non parte');
  const scorta = () => {
    metti(stato, puntoCarro(voto(stato).carro));
    return {};
  };
  avanza(stato, 2, scorta);
  assert.ok(voto(stato).carro > 1.2 && voto(stato).carro < 1.6, `${voto(stato).carro}`);
  const z = zombie(stato);
  const prima = voto(stato).carro;
  avanza(stato, 2, () => {
    Object.assign(z, puntoCarro(voto(stato).carro), { stato: 'dentro' });
    return scorta();
  });
  assert.equal(voto(stato).carro, prima, 'un Dannato attaccato al carro lo ferma');
  z.stato = 'morto';
  avanza(stato, 200, scorta);
  assert.equal(portaCheFerma(stato.porte, voto(stato).carro), 'transenneSud');
  assert.equal(voto(stato).fase, VOTO.CARRO);
  stato.porte.push('transenneSud');
  avanza(stato, 60, scorta);
  assert.equal(portaCheFerma(stato.porte, voto(stato).carro), 'tempietto');
  stato.porte.push('tempietto');
  const eventi = avanza(stato, 60, scorta);
  assert.ok(eventi.some(e => e.k === 'arrivoBeato'));
  assert.equal(voto(stato).fase, VOTO.VEGLIA);
  assert.equal(zonaDi(puntoCarro(LUNGHEZZA_CARRO).x, puntoCarro(LUNGHEZZA_CARRO).z), 'tempietto');
});

test('la veglia conta i Dannati caduti nel Tempietto, poi il Capitano; abbatterlo dà la pace e le campane benedette', () => {
  const stato = piazza();
  accendi(stato);
  Object.assign(voto(stato), { fase: VOTO.VEGLIA, anime: 0 });
  uccidi(stato, zombie(stato, { x: -10, z: 10, vita: 1 }));
  assert.equal(voto(stato).anime, 0, 'fuori dal Tempietto non conta');
  for (let i = 0; i < ANIME_VEGLIA - 1; i++) uccidi(stato, zombie(stato, { x: 24, z: 18, vita: 1 }));
  assert.equal(voto(stato).anime, ANIME_VEGLIA - 1);
  const eventi = uccidi(stato, zombie(stato, { x: 24, z: 18, vita: 1 }));
  assert.ok(eventi.some(e => e.k === 'boss' && e.tipo === 'capitano'));
  assert.equal(voto(stato).fase, VOTO.CAPITANO);
  const capitano = stato.zombie.find(z => z.tipo === 'capitano' && z.stato !== 'morto');
  assert.ok(capitano, 'il Capitano del Visconti è in piazza');
  const punti = giocatore(stato).punti;
  const bonus = stato.bonus.length;
  Object.assign(capitano, { stato: 'dentro', vita: 1 });
  assert.ok(uccidi(stato, capitano).some(e => e.k === 'paceCerano'));
  assert.equal(voto(stato).fase, VOTO.PACE);
  assert.ok(giocatore(stato).punti >= punti + PUNTI_PACE);
  assert.equal(stato.bonus.length, bonus + ELENCO_BONUS.length);
  salta(stato);
  metti(stato, davanti('campane'));
  const prima = giocatore(stato).punti;
  compra(stato, 'campane');
  assert.equal(giocatore(stato).punti, prima, 'le campane benedette suonano gratis');
  assert.ok(Math.abs(stato.piazza.campane - RICARICA_BENEDETTA) < 0.1);
});

test("l'istantanea porta la storia del Beato e la rete accetta solo ore vere", () => {
  const stato = piazza();
  Object.assign(voto(stato), { fase: VOTO.CARRO, ore: 6, carro: 12.345, anime: 0 });
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  assert.deepEqual(espandi(ist).piazza.voto, { fase: VOTO.CARRO, ore: 6, carro: 12.35, anime: 0 });
  assert.equal(valida({ t: 'st', g: 1, ist: { ...ist, cv: [1, 2] } }), null);
  assert.ok(valida({ t: 'az', a: { tipo: 'orologio', yaw: 1.2, pitch: 0.6 } }));
  assert.equal(valida({ t: 'az', a: { tipo: 'orologio', ora: 4 } }), null);
  assert.equal(valida({ t: 'az', a: { tipo: 'orologio', yaw: 'su', pitch: 0 } }), null);
});

test("l'host ricalcola il colpo all'orologio: senza vista sul campanile l'ora non conta", () => {
  const stato = piazza();
  voto(stato).fase = VOTO.OROLOGIO;
  const davantiFacciata = { x: -10, z: 0 };
  metti(stato, davantiFacciata);
  avanza(stato, R.PASSO, una('orologio', mira(davantiFacciata, 4)));
  assert.equal(voto(stato).ore, 0, 'la facciata copre il campanile');
  metti(stato, DAL_SAGRATO);
  avanza(stato, R.PASSO, una('orologio', { yaw: 0, pitch: 0 }));
  assert.equal(voto(stato).ore, 0, 'un colpo che non prende l\'orologio non fa niente');
  ora(stato, 4);
  assert.equal(voto(stato).ore, 1);
});

test('la bomba durante la veglia vale per i Dannati caduti nel Tempietto', () => {
  const stato = piazza();
  Object.assign(voto(stato), { fase: VOTO.VEGLIA, anime: 0 });
  for (let i = 0; i < 3; i++) zombie(stato, { x: 24, z: 16 + i, vita: 100 });
  zombie(stato, { x: -10, z: 10, vita: 100 });
  stato.bonus.push({ id: 900, tipo: 'bomba', x: giocatore(stato).x, z: giocatore(stato).z, timer: 10 });
  avanza(stato, R.PASSO * 2);
  assert.equal(voto(stato).anime, 3);
});

test('i doni della pace cadono nel Tempietto, lontano da muri e ingombri', () => {
  creaPartita({ seme: 1, mappa: 'piazza' });
  const ostacoli = ostacoliPerGiocatori(new Set(PORTE.map(q => q.id)));
  for (let i = 0; i < ELENCO_BONUS.length; i++) {
    const a = (i / ELENCO_BONUS.length) * Math.PI * 2;
    const x = CENTRO_DONI.x + Math.cos(a) * RAGGIO_DONI;
    const z = CENTRO_DONI.z + Math.sin(a) * RAGGIO_DONI;
    assert.equal(zonaDi(x, z), 'tempietto');
    assert.ok(!ostacoli.some(o => dentroScatola(x, z, o, 0.5)), `${ELENCO_BONUS[i]} dentro un ingombro`);
  }
});
