import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ARMI_CASSA, PESI_CASSA } from '../src/regole.js';
import { sceltaPesata } from '../src/partita.js';
import { esplosione } from '../src/colpi.js';

test('le armi aliene escono dalla cassa, ma più di rado delle altre', () => {
  const conti = Object.fromEntries(ARMI_CASSA.map(a => [a, 0]));
  const prove = 10000;
  for (let i = 0; i < prove; i++) conti[sceltaPesata(ARMI_CASSA, (i + 0.5) / prove)] += 1;
  const totale = ARMI_CASSA.reduce((s, a) => s + PESI_CASSA[a], 0);
  for (const a of ARMI_CASSA) assert.ok(Math.abs(conti[a] / prove - PESI_CASSA[a] / totale) < 0.01, a);
  assert.ok(conti.arco < conti.pompa);
});

test('la scelta pesata non restituisce mai un\'arma fuori elenco', () => {
  for (const estratto of [0, 0.3, 0.999999]) assert.ok(['mitra', 'arco'].includes(sceltaPesata(['mitra', 'arco'], estratto)));
});

test('l\'esplosione prende gli zombie nel raggio, di più quelli vicini', () => {
  const bersagli = [{ id: 1, x: 0, z: 0 }, { id: 2, x: 1, z: 0 }, { id: 3, x: 5, z: 0 }];
  const colpiti = esplosione({ x: 0, y: 0.72, z: 0 }, bersagli, 1.8);
  assert.deepEqual(colpiti.map(c => c.id), [1, 2]);
  assert.ok(colpiti[0].fattore > colpiti[1].fattore);
});
