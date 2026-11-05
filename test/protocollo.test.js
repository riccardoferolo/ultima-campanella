import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R } from '../src/regole.js';
import { codiceStanza, normalizzaCodice, pulisciNome, valida } from '../src/rete/protocollo.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea } from '../src/istantanea.js';

test('codici stanza di 4 lettere senza I e O', () => {
  for (let i = 0; i < 100; i++) assert.match(codiceStanza(), /^[A-HJ-NP-Z]{4}$/);
  assert.equal(normalizzaCodice(' kxrt '), 'KXRT');
  for (const sbagliato of ['', 'ABC', 'AB1D', 'ABIO', null]) assert.equal(normalizzaCodice(sbagliato), null);
});

test('i nomi vengono puliti', () => {
  assert.equal(pulisciNome('  Seba '), 'Seba');
  assert.equal(pulisciNome('x'.repeat(30)).length, 16);
  assert.equal(pulisciNome('  '), null);
});

test('i messaggi buoni passano, quelli storti no', () => {
  const stato = creaPartita({ seme: 2, giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }] });
  for (let i = 0; i < 60 * 8; i++) passo(stato, R.PASSO, {});
  const buoni = [
    { t: 'ciao', nome: 'Seba', id: 'b' },
    { t: 'lobby', nomeHost: 'Richi' },
    { t: 'inizia', seme: 5 },
    { t: 'g', x: 1, z: 2, yaw: 0.3, pitch: 0, arma: 'pistola', colpi: 4, tp: 0 },
    { t: 'az', a: { tipo: 'colpo', zombie: 3, danno: 40, testa: true } },
    { t: 'az', a: { tipo: 'compra', acquisto: 'porta:palestra' } },
    { t: 'az', a: { tipo: 'assa', finestra: 'a1' } },
    { t: 'az', a: { tipo: 'rianima', attivo: true } },
    { t: 'st', g: 2, ist: JSON.parse(JSON.stringify(faiIstantanea(stato))) },
    { t: 'ev', eventi: [{ k: 'round', round: 2 }] },
  ];
  for (const m of buoni) assert.equal(valida(m), m, JSON.stringify(m).slice(0, 90));
  const cattivi = [
    null, {}, { t: 'boh' },
    { t: 'ciao', nome: 'x' },
    { t: 'g', x: 1, z: 2, yaw: 0, pitch: 0, arma: 'bazooka', colpi: 0, tp: 0 },
    { t: 'g', x: NaN, z: 2, yaw: 0, pitch: 0, arma: 'pistola', colpi: 0, tp: 0 },
    { t: 'az', a: { tipo: 'esplodi' } },
    { t: 'az', a: { tipo: 'colpo', zombie: '3', danno: 40 } },
    { t: 'st', g: 2, ist: { t: 1 } },
  ];
  for (const m of cattivi) assert.equal(valida(m), null, JSON.stringify(m));
});
