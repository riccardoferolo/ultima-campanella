import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, ARMI_DI_BASE, ARMI_CASSA, TIPI_ZOMBIE, BONUS, ELENCO_BONUS, tipoZombie, pesiZombie } from '../src/regole.js';
import { FRAMMENTI, ACQUISTI, PARTENZE, PARTENZE_SALA, dentroSala, FINESTRE } from '../src/mappa.js';
import { creaPartita, passo, creaBonus } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  const passi = Math.round(secondi / R.PASSO);
  for (let i = 0; i < passi; i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (da, tipo, extra = {}) => ({ azioni: [{ da, tipo, ...extra }] });
const giocatore = (stato, id) => stato.giocatori.find(g => g.id === id);
const nellaSala = () => creaPartita({ seme: 11, giocatori: [{ id: 'a', nome: 'Richi' }, { id: 'b', nome: 'Seba' }], sala: true });

function inGioco(seme = 5) {
  const stato = creaPartita({ seme, giocatori: [{ id: 'a', nome: 'A' }] });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  stato.zombie = [];
  stato.daGenerare = 0;
  return stato;
}

function zombie(stato, extra = {}) {
  const z = { id: 7000 + stato.zombie.length, x: 3, z: 3, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
}

test('ogni arma ha un modello, un nome e la sua versione potenziata', () => {
  assert.ok(ARMI_DI_BASE.length >= 50, `solo ${ARMI_DI_BASE.length} armi`);
  for (const chiave of ARMI_DI_BASE) {
    assert.ok(ARMI[chiave].modello, chiave);
    assert.ok(ARMI[`${chiave}+`], `${chiave}+`);
    assert.notEqual(ARMI[`${chiave}+`].nome, ARMI[chiave].nome);
  }
  assert.ok(ARMI_DI_BASE.filter(a => ARMI[a].aliena).length >= 10, 'poche armi aliene');
  assert.ok(!ARMI_CASSA.includes('disintegratore'), "l'arma segreta non esce dalla cassa");
});

test('la partita con la sala parte in attesa, coi giocatori nella sala e senza zombie', () => {
  const stato = nellaSala();
  assert.equal(stato.fase, 'attesa');
  for (const g of stato.giocatori) assert.ok(dentroSala(g.x, g.z), `${g.nome} fuori dalla sala`);
  assert.equal(stato.zombie.length, 0);
  assert.equal(avanza(stato, 5).filter(e => e.k === 'round').length, 0, 'nessun round finché non sono pronti');
});

test("in sala non si possono provare armi né comprare niente", () => {
  const stato = nellaSala();
  const io = giocatore(stato, 'a');
  for (const azione of [{ tipo: 'prova', arma: 'laser' }, { tipo: 'compra', acquisto: 'cassa' }, { tipo: 'compra', acquisto: 'muro-pompa' }]) {
    avanza(stato, R.PASSO, una('a', azione.tipo, azione));
  }
  assert.deepEqual(io.armi, ['pistola']);
  assert.equal(io.punti, R.PUNTI_INIZIALI);
  assert.equal(valida({ t: 'az', a: { tipo: 'prova', arma: 'laser' } }), null, 'il messaggio di prova è rifiutato');
});

test('quando tutti sono pronti parte il conto alla rovescia, poi la partita vera', () => {
  const stato = nellaSala();
  giocatore(stato, 'a').armi = ['pistola', 'laser'];
  avanza(stato, R.PASSO, una('a', 'pronto', { attivo: true }));
  assert.equal(stato.conto, null, 'uno solo pronto non basta');
  const eventi = avanza(stato, R.PASSO, una('b', 'pronto', { attivo: true }));
  assert.ok(eventi.some(e => e.k === 'conto'));
  const via = avanza(stato, R.CONTO_ALLA_ROVESCIA + 0.1);
  assert.ok(via.some(e => e.k === 'via'));
  assert.equal(stato.fase, 'intervallo');
  assert.equal(stato.zombie.length, 0);
  stato.giocatori.forEach((g, i) => {
    assert.deepEqual(g.armi, ['pistola']);
    assert.equal(g.punti, R.PUNTI_INIZIALI);
    assert.deepEqual({ x: g.x, z: g.z }, { x: PARTENZE[i].x, z: PARTENZE[i].z });
    assert.equal(g.teletrasporto, 1);
  });
  assert.ok(avanza(stato, R.PRIMO_ROUND_TRA + 0.1).some(e => e.k === 'round' && e.round === 1));
});

test('se uno torna non pronto il conto alla rovescia si annulla', () => {
  const stato = nellaSala();
  avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'pronto', attivo: true }, { da: 'b', tipo: 'pronto', attivo: true }] });
  avanza(stato, 1);
  const eventi = avanza(stato, R.PASSO, una('b', 'pronto', { attivo: false }));
  assert.ok(eventi.some(e => e.k === 'contoAnnullato'));
  avanza(stato, R.CONTO_ALLA_ROVESCIA + 1);
  assert.equal(stato.fase, 'attesa');
  assert.ok(PARTENZE_SALA.length >= 2);
});

test('due tipi di zombie: lo scuoiato arriva dal secondo round ed è più veloce ma più fragile', () => {
  assert.deepEqual(Object.keys(TIPI_ZOMBIE).filter(t => !TIPI_ZOMBIE[t].boss).sort(), ['magro', 'normale']);
  assert.equal(tipoZombie(1, 0.99), 'normale');
  assert.equal(pesiZombie(1).magro, 0);
  assert.ok(pesiZombie(5).magro > 0);
  assert.ok(TIPI_ZOMBIE.magro.velocita > TIPI_ZOMBIE.normale.velocita);
  assert.ok(TIPI_ZOMBIE.magro.vita < TIPI_ZOMBIE.normale.vita);
  const visti = new Set();
  for (let i = 0; i < 100; i++) visti.add(tipoZombie(6, i / 100));
  assert.deepEqual([...visti].sort(), ['magro', 'normale']);
});

test('lo scuoiato fa più male di uno zombie normale', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  Object.assign(g, { x: 0, z: 0 });
  const z = zombie(stato, { tipo: 'magro', x: 0, z: 0.8, vita: 500, vitaMax: 500 });
  z.stato = 'attacco';
  z.timer = 0.01;
  z.bersaglio = 'a';
  avanza(stato, R.PASSO * 2);
  assert.equal(g.vita, R.VITA - R.DANNO_ZOMBIE * TIPI_ZOMBIE.magro.danno);
});

test('le uccisioni ogni tanto lasciano un bonus, al massimo quattro per round', () => {
  const stato = inGioco(3);
  let comparsi = 0;
  for (let i = 0; i < 400; i++) {
    const z = zombie(stato, { x: 20, z: -3 });
    comparsi += avanza(stato, R.PASSO, una('a', 'colpo', { zombie: z.id, danno: 2000 })).filter(e => e.k === 'bonusCompare').length;
  }
  assert.ok(comparsi > 0, 'nessun bonus');
  assert.ok(comparsi <= R.BONUS_PER_ROUND, `${comparsi} bonus in un round`);
  assert.ok(stato.bonus.every(b => ELENCO_BONUS.includes(b.tipo)));
});

test('il bonus si raccoglie passandoci sopra; i punti doppi raddoppiano', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  Object.assign(g, { x: 0, z: 0 });
  creaBonus(stato, 0.5, 0, 'doppi');
  const eventi = avanza(stato, R.PASSO);
  assert.ok(eventi.some(e => e.k === 'bonus' && e.tipo === 'doppi'));
  assert.equal(stato.bonus.length, 0);
  assert.ok(stato.effetti.doppi > 0);
  const z = zombie(stato, { x: 10, z: 10 });
  const prima = g.punti;
  avanza(stato, R.PASSO, una('a', 'colpo', { zombie: z.id, danno: 10 }));
  assert.equal(g.punti - prima, R.PUNTI_COLPO * 2);
  Object.assign(stato, { zombie: [], daGenerare: 0, fase: 'intervallo', timerFase: 999 });
  avanza(stato, BONUS.doppi.durata + 0.1);
  assert.equal(stato.effetti.doppi, 0);
});

test('la bomba uccide tutti gli zombie e regala punti', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  Object.assign(g, { x: 0, z: 0 });
  for (let i = 0; i < 5; i++) zombie(stato, { x: 10 + i, z: 10 });
  const prima = g.punti;
  creaBonus(stato, 0, 0.5, 'bomba');
  avanza(stato, R.PASSO);
  assert.ok(stato.zombie.every(z => z.stato === 'morto'));
  assert.equal(g.punti - prima, R.PUNTI_BOMBA);
});

test('colpo secco: ogni colpo uccide', () => {
  const stato = inGioco();
  Object.assign(giocatore(stato, 'a'), { x: 0, z: 0 });
  creaBonus(stato, 0, 0, 'secco');
  avanza(stato, R.PASSO);
  const z = zombie(stato, { x: 10, z: 10, vita: 5000, vitaMax: 5000 });
  avanza(stato, R.PASSO, una('a', 'colpo', { zombie: z.id, danno: 1 }));
  assert.equal(z.stato, 'morto');
});

test('coi saldi la cassa costa dieci punti', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  const cassa = ACQUISTI.find(a => a.tipo === 'cassa');
  stato.porte.push('palestra');
  Object.assign(g, { x: cassa.posizione.x, z: cassa.posizione.z - 1, punti: 100 });
  stato.effetti.saldi = 20;
  avanza(stato, R.PASSO, una('a', 'compra', { acquisto: 'cassa' }));
  assert.equal(stato.cassa.stato, 'aperta');
  assert.equal(g.punti, 100 - R.COSTO_CASSA_SALDI);
});

test('il carpentiere ripara tutte le finestre', () => {
  const stato = inGioco();
  Object.assign(giocatore(stato, 'a'), { x: 0, z: 0 });
  for (const f of FINESTRE) stato.finestre[f.id] = 0;
  creaBonus(stato, 0, 0, 'carpentiere');
  avanza(stato, R.PASSO);
  assert.ok(FINESTRE.every(f => stato.finestre[f.id] === R.ASSE_PER_FINESTRA));
});

test('i tre frammenti di meteorite danno a tutti il Disintegratore', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  let eventi = [];
  for (const f of FRAMMENTI) {
    Object.assign(g, { x: f.x, z: f.z });
    eventi = avanza(stato, R.PASSO, una('a', 'frammento', { id: f.id }));
  }
  assert.deepEqual([...stato.frammenti].sort(), FRAMMENTI.map(f => f.id).sort());
  assert.ok(eventi.some(e => e.k === 'segreto'));
  assert.ok(g.armi.includes('disintegratore'));
  avanza(stato, R.PASSO, una('a', 'frammento', { id: FRAMMENTI[0].id }));
  assert.equal(stato.frammenti.length, FRAMMENTI.length, 'un frammento non si conta due volte');
});

test('un frammento lontano non si raccoglie', () => {
  const stato = inGioco();
  Object.assign(giocatore(stato, 'a'), { x: 0, z: 0 });
  avanza(stato, R.PASSO, una('a', 'frammento', { id: FRAMMENTI[0].id }));
  assert.equal(stato.frammenti.length, 0);
});

test('la campanella regala un bonus solo la prima volta', () => {
  const stato = inGioco();
  const g = giocatore(stato, 'a');
  const campanella = ACQUISTI.find(a => a.tipo === 'campanella');
  Object.assign(g, { x: campanella.posizione.x + 1.5, z: campanella.posizione.z - 1.2 });
  const prima = avanza(stato, R.PASSO, una('a', 'compra', { acquisto: 'campanella' }));
  assert.ok(prima.some(e => e.k === 'campanella' && e.regalo));
  assert.equal(prima.filter(e => e.k === 'bonusCompare').length, 1);
  const dopo = avanza(stato, R.PASSO, una('a', 'compra', { acquisto: 'campanella' }));
  assert.ok(dopo.some(e => e.k === 'campanella' && !e.regalo));
  assert.equal(dopo.filter(e => e.k === 'bonusCompare').length, 0);
});

test("l'istantanea porta sala, bonus, effetti e tipi di zombie e passa la validazione", () => {
  const stato = nellaSala();
  creaBonus(stato, -40, 0, 'munizioni');
  stato.effetti.infinite = 12;
  const messaggio = { t: 'st', g: 1, ist: faiIstantanea(stato) };
  assert.deepEqual(valida(messaggio), messaggio);
  const vista = espandi(messaggio.ist);
  assert.equal(vista.fase, 'attesa');
  assert.equal(vista.bonus[0].tipo, 'munizioni');
  assert.equal(vista.effetti.infinite, 12);
  for (const azione of [{ tipo: 'pronto', attivo: true }, { tipo: 'frammento', id: 1 }]) {
    assert.ok(valida({ t: 'az', a: azione }), azione.tipo);
  }
});
