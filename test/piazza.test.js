import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI } from '../src/regole.js';
import { ZONE, MURI, FINESTRE, PORTE, ACQUISTI, FRAMMENTI, zonaDi, quota, ostacoliPerGiocatori, zoneAperte, NOMI_MAPPE, ELENCO_MAPPE } from '../src/mappa.js';
import { OGGETTI, CASE, PAVIMENTO_CHIESA, PAVIMENTO_PRESBITERIO, PAVIMENTO_SAGRATO, PIANO_CONSIGLIO, PIANO_CELLA, ALTEZZA_CAMPANILE } from '../src/mappe/piazza.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import { COSTO_CAMPANILE, TEMPO_CELLA, COSTO_CAMPANE, RICARICA_CAMPANE, STORDIMENTO_CAMPANE } from '../src/piazza.js';

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
  const tombe = new Set(FINESTRE.filter(f => f.tana).map(f => f.id));
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
