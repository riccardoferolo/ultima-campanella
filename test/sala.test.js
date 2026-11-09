import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, PISTOLE_INIZIALI, ASPETTI, COLTELLO, dannoColtello, vitaZombie } from '../src/regole.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, ingressi));
  return eventi;
}
const una = (da, tipo, extra = {}) => ({ azioni: [{ da, tipo, ...extra }] });
const sala = () => creaPartita({ seme: 2, giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }], sala: true });

test('in sala ognuno sceglie la pistola iniziale e la usa per tutta la partita', () => {
  const stato = sala();
  assert.ok(PISTOLE_INIZIALI.length >= 3);
  const eventi = avanza(stato, R.PASSO, una('a', 'scegli', { cosa: 'pistola', valore: 'aquila' }));
  const a = stato.giocatori[0];
  assert.deepEqual(a.armi, ['aquila']);
  assert.ok(eventi.some(e => e.k === 'armi' && e.arma === 'aquila'));
  avanza(stato, R.PASSO, una('b', 'scegli', { cosa: 'pistola', valore: 'mitragliatrice' }));
  assert.deepEqual(stato.giocatori[1].armi, ['pistola'], 'si scelgono solo le pistole iniziali');
  for (const id of ['a', 'b']) avanza(stato, R.PASSO, una(id, 'pronto', { attivo: true }));
  avanza(stato, R.CONTO_ALLA_ROVESCIA + 0.2);
  assert.equal(stato.fase, 'intervallo');
  assert.deepEqual(a.armi, ['aquila']);
  Object.assign(a, { stato: 'morto' });
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  avanza(stato, 0.1);
  assert.deepEqual(a.armi, ['aquila'], 'rinasce con la sua pistola');
});

test("in sala si sceglie l'aspetto del soldato e fuori dalla sala non si cambia più niente", () => {
  const stato = sala();
  avanza(stato, R.PASSO, una('a', 'scegli', { cosa: 'aspetto', valore: 3 }));
  assert.equal(stato.giocatori[0].aspetto, 3);
  avanza(stato, R.PASSO, una('a', 'scegli', { cosa: 'aspetto', valore: ASPETTI.length + 4 }));
  assert.equal(stato.giocatori[0].aspetto, 3);
  const vista = espandi(faiIstantanea(stato));
  assert.equal(vista.giocatori[0].aspetto, 3);
  const fuori = creaPartita({ seme: 2, giocatori: [{ id: 'a', nome: 'A' }] });
  avanza(fuori, R.PASSO, una('a', 'scegli', { cosa: 'pistola', valore: 'aquila' }));
  assert.deepEqual(fuori.giocatori[0].armi, ['pistola']);
});

test('cambiare mappa in sala toglie a tutti il «pronto»', () => {
  const stato = sala();
  avanza(stato, R.PASSO, una('b', 'pronto', { attivo: true }));
  const eventi = avanza(stato, R.PASSO, una('a', 'scegli', { cosa: 'mappa', valore: 'giungla' }));
  assert.equal(stato.mappaScelta, 'giungla');
  assert.ok(eventi.some(e => e.k === 'mappaScelta'));
  assert.equal(stato.giocatori[1].pronto, false);
  assert.equal(espandi(faiIstantanea(stato)).mappaScelta, 'giungla');
  assert.ok(valida({ t: 'az', a: { tipo: 'scegli', cosa: 'mappa', valore: 'giungla' } }));
  assert.equal(valida({ t: 'az', a: { tipo: 'scegli', cosa: 'soldi', valore: 3 } }), null);
});

test('il coltello colpisce più forte e resta utile anche nei round alti', () => {
  assert.ok(COLTELLO.danno > 150 && COLTELLO.portata > 1.6 && COLTELLO.attesa < 0.6);
  assert.equal(dannoColtello(1), COLTELLO.danno);
  assert.ok(dannoColtello(15) >= vitaZombie(15) * 0.3);
});
