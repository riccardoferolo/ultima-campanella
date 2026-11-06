import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R } from '../src/regole.js';
import { muoviCerchio, spingiFuori } from '../src/fisica.js';
import { griglia, campoVerso, direzione, distanzaCampo } from '../src/navigazione.js';
import { FINESTRE, PORTE, ACQUISTI, ZONE, ostacoliPerGiocatori, zonaDi, zoneAperte } from '../src/mappa.js';

test('il giocatore non attraversa i muri', () => {
  const ostacoli = ostacoliPerGiocatori(new Set());
  const arrivo = muoviCerchio({ x: 0, z: 4 }, 0, 5, R.RAGGIO_GIOCATORE, ostacoli);
  assert.ok(arrivo.z < 6 - 0.15, `z = ${arrivo.z}`);
});

test('la porta chiusa blocca, quella aperta lascia passare', () => {
  const chiusa = muoviCerchio({ x: 0, z: 4 }, 0, 4, R.RAGGIO_GIOCATORE, ostacoliPerGiocatori(new Set()));
  const aperta = muoviCerchio({ x: 0, z: 4 }, 0, 4, R.RAGGIO_GIOCATORE, ostacoliPerGiocatori(new Set(['corridoio'])));
  assert.ok(chiusa.z < 6);
  assert.ok(aperta.z > 7.5, `z = ${aperta.z}`);
});

test('dalle finestre i giocatori non escono', () => {
  const finestra = FINESTRE[0];
  const arrivo = muoviCerchio(finestra.interno, finestra.fuori.x * 4, finestra.fuori.z * 4, R.RAGGIO_GIOCATORE, ostacoliPerGiocatori(new Set()));
  assert.equal(zonaDi(arrivo.x, arrivo.z), finestra.zona);
});

test('un cerchio dentro una scatola viene spinto fuori dal lato più vicino', () => {
  const [x, z] = spingiFuori(0.1, 0.5, 0.3, { x0: 0, z0: 0, x1: 2, z1: 1 });
  assert.ok(Math.abs(x - -0.3) < 1e-9 && z === 0.5);
});

test('ogni finestra ha l\'interno nella sua zona e l\'esterno fuori da tutte', () => {
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, f.id);
    assert.equal(zonaDi(f.esterno.x, f.esterno.z), null, f.id);
    assert.equal(zonaDi(f.comparsa.x, f.comparsa.z), null, f.id);
  }
});

test('gli acquisti stanno nella zona dichiarata', () => {
  for (const a of ACQUISTI) assert.equal(zonaDi(a.posizione.x, a.posizione.z), a.zona, a.id);
});

test('aprire una porta apre la sua zona', () => {
  assert.deepEqual([...zoneAperte(new Set())], ['atrio']);
  assert.ok(zoneAperte(new Set(['palestra'])).has('palestra'));
});

test('il campo porta gli zombie verso il giocatore attraverso l\'atrio', () => {
  const campo = campoVerso(griglia(new Set()), [{ x: 5, z: 3 }]);
  for (const f of FINESTRE.filter(f => f.zona === 'atrio')) {
    assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), f.id);
    let p = { ...f.interno };
    for (let i = 0; i < 200 && Math.hypot(p.x - 5, p.z - 3) > 0.6; i++) {
      const d = direzione(campo, p.x, p.z);
      assert.ok(d, `bloccato a ${p.x},${p.z}`);
      p = muoviCerchio(p, d.x * 0.25, d.z * 0.25, R.RAGGIO_ZOMBIE, ostacoliPerGiocatori(new Set()));
    }
    assert.ok(Math.hypot(p.x - 5, p.z - 3) <= 0.6, `${f.id} non arriva: ${p.x},${p.z}`);
  }
});

test('con la porta chiusa il corridoio non si raggiunge, aperta sì', () => {
  const chiusa = campoVerso(griglia(new Set()), [{ x: 0, z: 0 }]);
  const aperta = campoVerso(griglia(new Set(['corridoio', 'palestra'])), [{ x: 0, z: 0 }]);
  assert.equal(distanzaCampo(chiusa, 0, 15), Infinity);
  assert.ok(Number.isFinite(distanzaCampo(aperta, 0, 15)));
  assert.ok(Number.isFinite(distanzaCampo(aperta, 20, 0)));
});

test('ogni zona è raggiungibile dalle sue finestre con tutte le porte aperte', () => {
  const tutte = new Set(PORTE.map(p => p.id));
  for (const zona of ZONE.filter(z => !z.sala)) {
    const campo = campoVerso(griglia(tutte), [{ x: (zona.x0 + zona.x1) / 2, z: (zona.z0 + zona.z1) / 2 }]);
    for (const f of FINESTRE) assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `${f.id} → ${zona.id}`);
  }
});
