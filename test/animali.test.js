import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { costruisciAnimali, creaAnimali } from '../src/grafica/animali3d.js';
import { usaMappa } from '../src/mappa.js';

const PASSO = 1 / 60;
const TERRESTRI = new Set(['rane', 'ninfee']);
const MAX_DISEGNI = 15;

function istanze(oggetto) {
  const elenco = [];
  const m = new THREE.Matrix4();
  const p = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  if (oggetto.isPoints) {
    const pos = oggetto.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) elenco.push({ x: pos.getX(i), y: pos.getY(i), z: pos.getZ(i) });
    return elenco;
  }
  for (let i = 0; i < oggetto.count; i++) {
    oggetto.getMatrixAt(i, m);
    m.decompose(p, q, s);
    if (s.x > 1e-6) elenco.push({ x: p.x, y: p.y, z: p.z });
  }
  return elenco;
}

function verificaPosizioni(mondo, scena) {
  const { limiti, zone, soffitto, solidi } = mondo.dati;
  for (const oggetto of scena.children) {
    for (const a of istanze(oggetto)) {
      assert.ok([a.x, a.y, a.z].every(Number.isFinite), `${oggetto.name}: posizione non finita`);
      assert.ok(a.x >= limiti.x0 && a.x <= limiti.x1 && a.z >= limiti.z0 && a.z <= limiti.z1, `${oggetto.name} fuori dai LIMITI: ${a.x},${a.z}`);
      const interna = zone.find(z => z.interna && a.x >= z.x0 && a.x <= z.x1 && a.z >= z.z0 && a.z <= z.z1);
      if (interna) assert.ok(a.y < soffitto, `${oggetto.name} sopra il soffitto in ${interna.id}`);
      if (!TERRESTRI.has(oggetto.name)) continue;
      const dentro = solidi.find(o => a.x > o.x0 && a.x < o.x1 && a.z > o.z0 && a.z < o.z1 && a.y < o.altezza);
      assert.equal(dentro, undefined, `${oggetto.name} dentro un ostacolo a ${a.x},${a.z}`);
    }
  }
}

for (const mappa of ['giungla', 'scuola']) {
  test(`${mappa}: gli animali partono dentro i limiti, fuori dagli ostacoli e sotto i soffitti`, () => {
    usaMappa(mappa === 'giungla' ? 'scuola' : 'giungla');
    const scena = new THREE.Scene();
    const mondo = costruisciAnimali(scena, mappa);
    usaMappa('scuola');
    assert.equal(mondo.dati.id, mappa);
    assert.ok(scena.children.length > 0 && scena.children.length <= MAX_DISEGNI, `disegni: ${scena.children.length}`);
    verificaPosizioni(mondo, scena);
  });

  test(`${mappa}: aggiorna regge viste vuote e tempi strani, svuota riparte da capo`, () => {
    const scena = new THREE.Scene();
    const animali = creaAnimali(scena, mappa);
    assert.deepEqual(Object.keys(animali).sort(), ['aggiorna', 'svuota']);
    const figli = scena.children.length;
    const viste = [undefined, {}, { giocatori: [], zombie: [], fase: 'gioco' }, { giocatori: [null, { x: NaN, z: 1, stato: 'vivo' }], zombie: [null] }];
    for (let i = 0; i < 600; i++) animali.aggiorna(viste[i % viste.length], i % 7 === 0 ? 5 : PASSO, i % 11 === 0 ? NaN : i * PASSO, undefined);
    animali.svuota();
    assert.equal(scena.children.length, figli);
    verificaPosizioni({ dati: costruisciAnimali(new THREE.Scene(), mappa).dati }, scena);
  });
}

test('una rana vicina a un giocatore si tuffa e dopo un po\' torna sulla ninfea', () => {
  const mondo = costruisciAnimali(new THREE.Scene(), 'giungla');
  const rana = mondo.gruppi.rane.animali[0];
  mondo.aggiorna({ giocatori: [{ x: rana.x + 1, z: rana.z, stato: 'vivo' }], zombie: [] }, PASSO, 0);
  assert.equal(rana.stato, 'fuga');
  for (let i = 0; i < 60 * 30; i++) mondo.aggiorna({ giocatori: [], zombie: [] }, PASSO, i * PASSO);
  assert.equal(rana.stato, 'seduta');
});

test('uno zombie sotto la palma fa scappare lo stormo, un giocatore morto no', () => {
  const mondo = costruisciAnimali(new THREE.Scene(), 'giungla');
  const stormo = mondo.gruppi.pappagalli.animali[0];
  mondo.aggiorna({ giocatori: [{ x: stormo.x, z: stormo.z, stato: 'morto' }], zombie: [] }, PASSO, 0);
  assert.equal(stormo.stato, 'posato');
  mondo.aggiorna({ giocatori: [], zombie: [{ x: stormo.x + 1, z: stormo.z, stato: 'dentro' }] }, PASSO, 0);
  assert.equal(stormo.stato, 'fuga');
});
