import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, BEVANDE } from '../src/regole.js';
import { ACQUISTI, FINESTRE, PORTE } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, ingressi));
  return eventi;
}

function palude() {
  const stato = creaPartita({ seme: 9, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'palude' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999, corrente: true });
  stato.porte.push(...PORTE.map(p => p.id));
  Object.assign(stato.giocatori[0], { punti: 99999, vita: 1e6, vitaMax: 1e6 });
  return stato;
}

function bevi(stato) {
  const macchina = ACQUISTI.find(a => a.tipo === 'bevanda' && a.bevanda === 'vedova');
  const g = stato.giocatori[0];
  Object.assign(g, { x: macchina.posizione.x + macchina.verso.x * 0.9, z: macchina.posizione.z + macchina.verso.z * 0.9 });
  const eventi = avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'compra', acquisto: macchina.id }] });
  return { g, eventi };
}

const zombie = (stato, x, z, extra = {}) => {
  const nuovo = { id: 500 + stato.zombie.length, x, z, yaw: 0, stato: 'dentro', finestra: FINESTRE[0].id, vita: 500, vitaMax: 500, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null, ...extra };
  stato.zombie.push(nuovo);
  return nuovo;
};

test('la Vedova costa 4000, è nera e rossa e dà tre granate ragnatela', () => {
  const stato = palude();
  const { g, eventi } = bevi(stato);
  assert.ok(g.bevande.includes('vedova'));
  assert.equal(g.punti, 99999 - BEVANDE.vedova.costo);
  assert.equal(g.granate, R.RAGNATELA_GRANATE);
  assert.ok(eventi.some(e => e.k === 'bevanda' && e.bevanda === 'vedova'));
});

test('la granata ragnatela intrappola gli zombie vicini, che non attaccano più finché la tela regge', () => {
  const stato = palude();
  const { g } = bevi(stato);
  g.yaw = 0;
  g.pitch = 0;
  avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'granata', yaw: g.yaw, pitch: -0.2 }] });
  assert.equal(stato.granate[0].ragnatela, true);
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.notEqual(valida({ t: 'st', g: 1, ist }), null);
  assert.equal(espandi(ist).granate[0].ragnatela, true);
  avanza(stato, R.MICCIA_GRANATA - 0.1);
  const gr = stato.granate[0];
  const preso = zombie(stato, gr.x + 1, gr.z + 1.5, { trattenuto: 99 });
  const eventi = avanza(stato, 0.3);
  assert.ok(eventi.some(e => e.k === 'ragnatela'));
  assert.ok(preso.ragnatela > 0, 'lo zombie è nella tela');
  assert.equal(preso.vita, 500, 'la tela non ferisce');
  assert.ok(espandi(faiIstantanea(stato)).ragnatele.has(preso.id));
});

test('colpito con le granate in tasca: la tela scoppia, blocca lo zombie e ne consuma una', () => {
  const stato = palude();
  const { g } = bevi(stato);
  const vita = g.vita;
  const z = zombie(stato, g.x + 0.6, g.z, { stato: 'attacco', timer: 0.01, bersaglio: 'a' });
  const eventi = avanza(stato, 0.1);
  assert.ok(eventi.some(e => e.k === 'ragnatelaDifesa'));
  assert.equal(g.vita, vita, 'il colpo non arriva');
  assert.equal(g.granate, R.RAGNATELA_GRANATE - 1);
  assert.ok(z.ragnatela > 0);
});

test('senza granate il colpo arriva; una granata ragnatela torna ogni cinque minuti', () => {
  const stato = palude();
  const { g } = bevi(stato);
  g.granate = 0;
  const vita = g.vita;
  zombie(stato, g.x + 0.6, g.z, { stato: 'attacco', timer: 0.01, bersaglio: 'a' });
  avanza(stato, 0.1);
  assert.ok(g.vita < vita);
  stato.zombie = [];
  g.ricaricaRagnatela = R.RAGNATELA_OGNI - 1;
  avanza(stato, 0.5);
  assert.equal(g.granate, 0);
  const eventi = avanza(stato, 0.6);
  assert.equal(g.granate, 1);
  assert.ok(eventi.some(e => e.k === 'ragnatelaPronta'));
});
