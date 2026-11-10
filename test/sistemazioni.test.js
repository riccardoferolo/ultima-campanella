import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R } from '../src/regole.js';
import { FINESTRE, PARTENZE, ACQUISTI } from '../src/mappa.js';
import { creaPartita, passo, rimuoviGiocatore } from '../src/partita.js';
import { RELIQUIE } from '../src/giungla.js';
import { OGGETTI as OGGETTI_GIUNGLA } from '../src/mappe/giungla.js';
import { valida } from '../src/rete/protocollo.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (tipo, extra = {}, da = 'a') => ({ azioni: [{ da, tipo, ...extra }] });

function partita(mappa, giocatori = [{ id: 'a', nome: 'A' }]) {
  const stato = creaPartita({ seme: 123, giocatori, mappa });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 0, attesaComparsa: 1e9, presideTra: null });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

test('quattro zombie che arrivano alla stessa finestra non restano incastrati fuori', () => {
  const stato = partita('scuola');
  const f = FINESTRE.find(x => x.id === 'a2');
  stato.finestre[f.id] = 1;
  for (let i = 0; i < 4; i++) {
    stato.zombie.push({
      id: 50 + i, x: f.comparsa.x + (i - 1.5) * 0.4, z: f.comparsa.z, yaw: 0, stato: 'arriva', finestra: f.id,
      vita: 1e9, vitaMax: 1e9, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null,
    });
  }
  avanza(stato, 40);
  const fuori = stato.zombie.filter(z => z.stato === 'arriva' || z.stato === 'assi');
  assert.equal(fuori.length, 0, JSON.stringify(fuori.map(z => [z.stato, +z.x.toFixed(2), +z.z.toFixed(2)])));
});

test('il primo round della scuola finisce anche se il giocatore non si muove', () => {
  const stato = creaPartita({ seme: 123, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'scuola' });
  const io = stato.giocatori[0];
  const eventi = avanza(stato, 200, () => {
    Object.assign(io, { vita: 1e9, vitaMax: 1e9, x: PARTENZE[0].x, z: PARTENZE[0].z });
    for (const z of stato.zombie) if (z.stato === 'dentro' || z.stato === 'attacco') z.vita = 0;
    for (const z of stato.zombie) if (z.vita <= 0 && z.stato !== 'morto') Object.assign(z, { stato: 'morto', timer: 0.1 });
    return {};
  });
  assert.ok(eventi.some(e => e.k === 'fineRound' && e.round === 1), `round ${stato.round}, zombie ${stato.zombie.map(z => z.stato)}`);
});

test('nella giungla una reliquia persa torna sul suo altare', () => {
  const stato = partita('giungla', [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  const g = stato.giungla;
  g.altare = 3;
  const a = stato.giocatori[0];
  Object.assign(a, { armi: ['pistola', 'machete'], armaAttiva: 'machete' });
  avanza(stato, R.PASSO);
  assert.ok(!g.oggetti.some(o => o.id === RELIQUIE.machete), 'finché qualcuno la tiene resta in mano');
  stato.porte.push('pista');
  const muro = ACQUISTI.find(x => x.id === 'muro-mitra');
  Object.assign(a, { x: muro.posizione.x + muro.verso.x * 0.9, z: muro.posizione.z + muro.verso.z * 0.9 });
  const eventi = avanza(stato, R.PASSO, una('compra', { acquisto: 'muro-mitra', arma: 'machete' }));
  assert.ok(!a.armi.includes('machete'));
  assert.ok(eventi.some(e => e.k === 'reliquiaTornata' && e.arma === 'machete'));
  const tornata = g.oggetti.find(o => o.id === RELIQUIE.machete);
  assert.deepEqual([tornata.x, tornata.z], [OGGETTI_GIUNGLA.ALTARE.x, OGGETTI_GIUNGLA.ALTARE.z]);
  g.oggetti = g.oggetti.filter(o => o.id !== RELIQUIE.machete);
  const b = stato.giocatori[1];
  Object.assign(b, { armi: ['pistola', 'machete'], armaAttiva: 'machete' });
  avanza(stato, R.PASSO);
  rimuoviGiocatore(stato, 'b');
  avanza(stato, R.PASSO);
  assert.ok(g.oggetti.some(o => o.id === RELIQUIE.machete), "se chi la teneva esce dalla stanza, la reliquia torna");
});

test('un fusibile chiesto fuori dalla scuola non blocca la partita', () => {
  for (const mappa of ['giungla', 'teatro']) {
    const stato = partita(mappa);
    assert.doesNotThrow(() => avanza(stato, R.PASSO, una('compra', { acquisto: 'fusibile:0' })), mappa);
  }
});

test('rimettere le assi paga solo fino a un tetto per round', () => {
  const stato = partita('scuola');
  const f = FINESTRE.find(x => x.id === 'a1');
  const io = stato.giocatori[0];
  Object.assign(io, { x: f.interno.x, z: f.interno.z, punti: 0 });
  for (let i = 0; i < R.ASSI_PAGATE_PER_ROUND + 10; i++) {
    stato.finestre[f.id] = 0;
    io.attesaAssa = 0;
    avanza(stato, R.PASSO, una('assa', { finestra: f.id }));
  }
  assert.equal(io.punti, R.ASSI_PAGATE_PER_ROUND * R.PUNTI_ASSA);
});

test('quando suona la campanella del rifugio gli zombie rimasti fuori spariscono', () => {
  const stato = partita('scuola');
  stato.porte.push('corridoio', 'androne', 'aula', 'rifugio');
  stato.zombie.push({ id: 77, x: 0, z: 0, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 500, vitaMax: 500, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null });
  const allarme = ACQUISTI.find(a => a.id === 'allarme');
  Object.assign(stato.giocatori[0], { x: allarme.posizione.x, z: allarme.posizione.z + 0.9 });
  avanza(stato, R.PASSO, una('compra', { acquisto: 'allarme' }));
  assert.equal(stato.fase, 'finale');
  assert.equal(stato.zombie.find(z => z.id === 77).stato, 'morto');
  assert.ok(stato.zombie.some(z => z.tipo === 'custode' && z.stato !== 'morto'));
});

test("l'host accetta dagli amici il lampadario e il colpo speciale", () => {
  assert.ok(valida({ t: 'az', a: { tipo: 'lampadario' } }));
  assert.ok(valida({ t: 'az', a: { tipo: 'speciale', yaw: 1 } }));
  assert.ok(valida({ t: 'az', a: { tipo: 'speciale', yaw: 1, pitch: 0.2 } }));
  assert.equal(valida({ t: 'az', a: { tipo: 'speciale', yaw: 'x' } }), null);
});
