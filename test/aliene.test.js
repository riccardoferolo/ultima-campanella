import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, ARMI_CASSA, saltiArco } from '../src/regole.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  const passi = Math.round(secondi / R.PASSO);
  for (let i = 0; i < passi; i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (tipo, extra = {}) => ({ azioni: [{ da: 'a', tipo, ...extra }] });

function inGioco(arma) {
  const stato = creaPartita({ seme: 5, giocatori: [{ id: 'a', nome: 'A' }] });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 0, attesaComparsa: 999 });
  const g = stato.giocatori[0];
  Object.assign(g, { x: 0, z: 4, armi: ['pistola', arma], armaAttiva: arma, vita: 1e9, vitaMax: 1e9 });
  return stato;
}

function zombie(stato, extra = {}) {
  const z = { id: 8000 + stato.zombie.length, x: 0, z: 0, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 500, vitaMax: 500, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
}

test('le tre armi nuove escono dalla cassa e hanno la versione potenziata', () => {
  for (const a of ['singolarita', 'criogeno', 'arco']) {
    assert.ok(ARMI_CASSA.includes(a), a);
    assert.ok(ARMI[a].aspetto, `${a} senza aspetto suo`);
    assert.ok(ARMI[`${a}+`].potenziata);
  }
  assert.equal(ARMI['singolarita+'].nome, 'Orizzonte degli Eventi');
  assert.equal(saltiArco(ARMI['arco+']), saltiArco(ARMI.arco) * 2);
});

test('Singolarità: la sfera vola, apre un buco nero che risucchia e poi implode', () => {
  const stato = inGioco('singolarita');
  const vicini = [zombie(stato, { x: -2.5, z: -3 }), zombie(stato, { x: 2.5, z: -3.5 }), zombie(stato, { x: 0.4, z: -1 })];
  const eventi = avanza(stato, R.PASSO, una('sparo', { yaw: Math.PI, pitch: -0.02, arma: 'singolarita' }));
  assert.ok(eventi.some(e => e.k === 'sfera'));
  assert.equal(stato.proiettili.length, 1);
  const apertura = avanza(stato, 1);
  assert.ok(apertura.some(e => e.k === 'buco'));
  assert.equal(stato.buchi.length, 1);
  const [buco] = stato.buchi;
  const prima = Math.hypot(-2.5 - buco.x, -3 - buco.z);
  avanza(stato, 1);
  assert.ok(Math.hypot(vicini[0].x - buco.x, vicini[0].z - buco.z) < prima - 1, 'lo zombie non viene risucchiato');
  const fine = avanza(stato, R.BUCO_DURATA);
  assert.ok(fine.some(e => e.k === 'implosione'));
  assert.equal(stato.buchi.length, 0);
  assert.ok(vicini.every(z => z.stato === 'morto'));
});

test('Singolarità: i boss non vengono risucchiati ma prendono l\'implosione', () => {
  const stato = inGioco('singolarita');
  const preside = zombie(stato, { tipo: 'preside', x: 0, z: -2, vita: 9000, vitaMax: 9000 });
  stato.buchi.push({ id: 1, x: 2, y: 1.2, z: -2, da: 'a', colpi: 0.25, timer: 0.5, raggio: 6, implosione: 3.5, potente: false });
  const x = preside.x;
  avanza(stato, 0.3);
  assert.ok(Math.abs(preside.x - x) < 0.6);
  avanza(stato, 0.4);
  assert.equal(preside.vita, 9000 - R.BUCO_DANNO_BOSS);
});

test('Criogeno: rallenta, congela, il gelo non rompe la statua ma un altro colpo sì', () => {
  const stato = inGioco('criogeno');
  const z = zombie(stato, { vita: 5000, vitaMax: 5000 });
  const colpo = { zombie: z.id, danno: 22, gelo: 0.33, arma: 'criogeno' };
  avanza(stato, R.PASSO, una('colpo', colpo));
  assert.ok(z.gelo > 0.3 && z.gelo < 1);
  let eventi = [];
  for (let i = 0; i < 4 && !z.gelato; i++) eventi = eventi.concat(avanza(stato, R.PASSO, una('colpo', colpo)));
  assert.ok(eventi.some(e => e.k === 'congelato'));
  assert.ok(z.gelato > 0);
  const posizione = [z.x, z.z];
  avanza(stato, 1);
  assert.deepEqual([z.x, z.z], posizione, 'la statua non si muove');
  avanza(stato, R.PASSO, una('colpo', colpo));
  assert.notEqual(z.stato, 'morto');
  const rotto = avanza(stato, R.PASSO, una('colpo', { zombie: z.id, danno: 10, arma: 'pistola' }));
  assert.equal(z.stato, 'morto');
  assert.ok(rotto.some(e => e.k === 'ucciso' && e.frantumato));
});

test('Criogeno: la statua si frantuma da sola e i boss rallentano soltanto', () => {
  const stato = inGioco('criogeno');
  const z = zombie(stato, { gelo: 1, gelato: 0.5, geloDa: 'a' });
  const eventi = avanza(stato, 0.6);
  assert.equal(z.stato, 'morto');
  assert.ok(eventi.some(e => e.k === 'ucciso' && e.frantumato && e.da === 'a'));
  const preside = zombie(stato, { tipo: 'preside', vita: 9000, vitaMax: 9000, x: 3 });
  for (let i = 0; i < 10; i++) avanza(stato, R.PASSO, una('colpo', { zombie: preside.id, danno: 22, gelo: 0.33, arma: 'criogeno' }));
  assert.ok(!preside.gelato);
  assert.ok(preside.gelo <= R.GELO_BOSS_MAX);
});

test('Criogeno: il gelo dichiarato dal client non supera quello dell\'arma', () => {
  const stato = inGioco('criogeno');
  const z = zombie(stato, { vita: 5000, vitaMax: 5000 });
  avanza(stato, R.PASSO, una('colpo', { zombie: z.id, danno: 1, gelo: 50, arma: 'criogeno' }));
  assert.ok(z.gelo <= ARMI.criogeno.gelo * ARMI.criogeno.pallini + 1e-9);
  const altro = zombie(stato, { vita: 5000, vitaMax: 5000, x: 3 });
  stato.giocatori[0].armaAttiva = 'pistola';
  avanza(stato, R.PASSO, una('colpo', { zombie: altro.id, danno: 1, gelo: 0.3 }));
  assert.ok(!altro.gelo, 'con la pistola non si congela');
});

test('Arco Voltaico: il fulmine salta, cala a ogni salto, stordisce e si ferma se lo zombie dopo è lontano', () => {
  const stato = inGioco('arco');
  const a = zombie(stato, { x: 0, z: -2, vita: 5000, vitaMax: 5000 });
  const b = zombie(stato, { x: 3, z: -3, vita: 5000, vitaMax: 5000 });
  const c = zombie(stato, { x: 6, z: -4, vita: 5000, vitaMax: 5000 });
  const lontano = zombie(stato, { x: 20, z: -4, vita: 5000, vitaMax: 5000 });
  const eventi = avanza(stato, R.PASSO, una('catena', { zombie: [a.id, b.id, c.id, lontano.id], arma: 'arco' }));
  const arco = eventi.find(e => e.k === 'arco');
  assert.ok(arco);
  assert.equal(arco.punti.length, 6);
  assert.equal(a.vita, 5000 - 900);
  assert.equal(b.vita, 5000 - Math.round(900 * R.ARCO_CALO));
  assert.ok(c.vita < 5000 && c.vita > b.vita);
  assert.equal(lontano.vita, 5000);
  const dove = [a.x, a.z];
  avanza(stato, R.ARCO_SCOSSA - 0.1);
  assert.deepEqual([a.x, a.z], dove, 'lo zombie fulminato resta fermo');
});

test('Arco Voltaico: senza l\'arma in mano la catena non parte', () => {
  const stato = inGioco('arco');
  stato.giocatori[0].armi = ['pistola'];
  stato.giocatori[0].armaAttiva = 'pistola';
  const a = zombie(stato);
  avanza(stato, R.PASSO, una('catena', { zombie: [a.id] }));
  assert.equal(a.vita, 500);
});

test('protocollo e istantanea portano sfere, buchi neri e gelo', () => {
  const stato = inGioco('singolarita');
  zombie(stato, { gelo: 0.5 });
  stato.proiettili.push({ id: 3, x: 1, y: 1.4, z: 1, vx: 0, vy: 0, vz: 1, volo: 1, da: 'a', potente: false });
  stato.buchi.push({ id: 4, x: 0, y: 1.2, z: 0, da: 'a', colpi: 0.25, timer: 2, raggio: 6, implosione: 3.5, potente: false });
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(ist);
  assert.equal(vista.proiettili.length, 1);
  assert.equal(vista.buchi[0].raggio, 6);
  assert.equal(vista.zombie[0].gelo, 0.5);
  assert.ok(valida({ t: 'az', a: { tipo: 'sparo', yaw: 0, pitch: 0, arma: 'singolarita' } }));
  assert.ok(valida({ t: 'az', a: { tipo: 'catena', zombie: [1, 2, 3], arma: 'arco' } }));
  assert.equal(valida({ t: 'az', a: { tipo: 'catena', zombie: Array.from({ length: 20 }, (_, i) => i) } }), null);
  assert.ok(valida({ t: 'az', a: { tipo: 'colpo', zombie: 1, danno: 10, gelo: 0.2, arma: 'criogeno' } }));
});
