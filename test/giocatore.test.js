import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI } from '../src/regole.js';
import { MURI, ACQUISTI, FINESTRE, PORTE } from '../src/mappa.js';
import { raggioSfera, raggioCilindro, raggioScatola, colpisciZombie, direzioneDa } from '../src/colpi.js';
import { creaArsenale, spara, ricarica, aggiorna, armaAttiva, allinea, riempi, coltellata, cambia } from '../src/arsenale.js';
import { interazioneVicina } from '../src/interazioni.js';

const occhio = { x: 0, y: 1.6, z: 0 };

test('il raggio prende sfera, cilindro e scatola alla distanza giusta', () => {
  const avanti = { x: 0, y: 0, z: 1 };
  assert.ok(Math.abs(raggioSfera(occhio, avanti, { x: 0, y: 1.6, z: 5 }, 0.2) - 4.8) < 1e-9);
  assert.ok(Math.abs(raggioCilindro({ x: 0, y: 1, z: 0 }, avanti, 0, 5, 0.3, 0, 1.45) - 4.7) < 1e-9);
  assert.equal(raggioCilindro({ x: 0, y: 2, z: 0 }, avanti, 0, 5, 0.3, 0, 1.45), Infinity);
  assert.ok(Math.abs(raggioScatola(occhio, avanti, { x0: -1, z0: 3, x1: 1, z1: 3.3 }) - 3) < 1e-9);
});

test('lo zombie dietro un muro non si colpisce', () => {
  const dietro = colpisciZombie({ x: -4, y: 1.6, z: 4 }, { x: 0, y: 0, z: 1 }, [{ id: 1, x: -4, z: 8 }], MURI);
  assert.equal(dietro.id, null);
  const davanti = colpisciZombie({ x: 0, y: 1.6, z: 0 }, { x: 0, y: 0, z: 1 }, [{ id: 1, x: 0, z: 4 }], MURI);
  assert.equal(davanti.id, 1);
  assert.equal(davanti.testa, true);
});

test('si prende lo zombie più vicino, e il corpo se si mira in basso', () => {
  const d = direzioneDa(0, -0.25);
  const colpo = colpisciZombie(occhio, d, [{ id: 2, x: 0, z: 4 }, { id: 1, x: 0, z: 2.5 }], []);
  assert.equal(colpo.id, 1);
  assert.equal(colpo.testa, false);
});

test('sparare consuma il caricatore e rispetta la cadenza; la ricarica prende dalla riserva', () => {
  const a = creaArsenale();
  assert.ok(spara(a));
  assert.equal(spara(a), null, 'troppo presto');
  aggiorna(a, ARMI.pistola.cadenza);
  assert.ok(spara(a));
  assert.equal(armaAttiva(a).caricatore, ARMI.pistola.caricatore - 2);
  assert.ok(ricarica(a));
  assert.equal(spara(a), null, 'durante la ricarica non si spara');
  aggiorna(a, ARMI.pistola.ricarica + 0.01);
  assert.equal(armaAttiva(a).caricatore, ARMI.pistola.caricatore);
  assert.equal(armaAttiva(a).riserva, ARMI.pistola.riserva - 2);
});

test('con la Bibita Lampo si ricarica in metà tempo', () => {
  const a = creaArsenale();
  aggiorna(a, 1);
  spara(a);
  ricarica(a, ['lampo']);
  aggiorna(a, ARMI.pistola.ricarica / 2 + 0.01);
  assert.equal(armaAttiva(a).caricatore, ARMI.pistola.caricatore);
});

test('a caricatore e riserva vuoti non si spara né si ricarica', () => {
  const a = creaArsenale();
  Object.assign(armaAttiva(a), { caricatore: 0, riserva: 0 });
  assert.equal(spara(a), null);
  assert.equal(ricarica(a), false);
});

test('le armi seguono l\'elenco dell\'host e la nuova arriva piena in mano', () => {
  const a = creaArsenale();
  armaAttiva(a).caricatore = 3;
  allinea(a, ['pistola', 'pompa'], 'pompa');
  assert.equal(armaAttiva(a).tipo, 'pompa');
  assert.equal(a.armi[0].caricatore, 3, 'la pistola resta com\'era');
  allinea(a, ['mitra', 'pompa'], 'mitra');
  assert.deepEqual(a.armi.map(x => x.tipo), ['mitra', 'pompa']);
  assert.equal(armaAttiva(a).tipo, 'mitra');
  armaAttiva(a).riserva = 0;
  riempi(a, 'mitra');
  assert.equal(armaAttiva(a).riserva, ARMI.mitra.riserva);
  aggiorna(a, 1);
  assert.ok(cambia(a));
  assert.equal(armaAttiva(a).tipo, 'pompa');
});

test('la coltellata interrompe la ricarica', () => {
  const a = creaArsenale();
  aggiorna(a, 1);
  spara(a);
  ricarica(a);
  assert.ok(coltellata(a));
  assert.equal(a.ricarica, 0);
});

function vista(extra = {}) {
  return {
    giocatori: [], porte: new Set(), finestre: Object.fromEntries(FINESTRE.map(f => [f.id, R.ASSE_PER_FINESTRA])),
    cassa: { stato: 'chiusa', arma: null, per: null }, ...extra,
  };
}
const io = (x, z, extra = {}) => ({ id: 'a', x, z, armi: ['pistola'], bevande: [], ...extra });

test('vicino alla porta chiusa si legge il prezzo', () => {
  const porta = PORTE[0];
  const i = interazioneVicina(io(porta.centro.x, porta.centro.z - 1), vista());
  assert.equal(i.acquisto, `porta:${porta.id}`);
  assert.match(i.testo, new RegExp(String(porta.costo)));
  assert.equal(interazioneVicina(io(porta.centro.x, porta.centro.z - 1), vista({ porte: new Set([porta.id]) }))?.acquisto === `porta:${porta.id}`, false);
});

test('davanti all\'arma sul muro: prezzo pieno o munizioni', () => {
  const pompa = ACQUISTI.find(a => a.id === 'muro-pompa');
  const pos = [pompa.posizione.x, pompa.posizione.z - 1];
  assert.equal(interazioneVicina(io(...pos), vista()).costo, pompa.costo);
  assert.equal(interazioneVicina(io(...pos, { armi: ['pistola', 'pompa'] }), vista()).costo, pompa.munizioni);
});

test('la rianimazione del compagno a terra vince su tutto', () => {
  const porta = PORTE[0];
  const v = vista({ giocatori: [{ id: 'b', nome: 'Seba', x: porta.centro.x + 0.5, z: porta.centro.z - 1, stato: 'terra' }] });
  const i = interazioneVicina(io(porta.centro.x, porta.centro.z - 1), v);
  assert.equal(i.tipo, 'rianima');
  assert.equal(i.bersaglio, 'b');
});

test('alla finestra senza assi si possono rimettere', () => {
  const f = FINESTRE[0];
  const v = vista();
  v.finestre[f.id] = 2;
  assert.equal(interazioneVicina(io(f.interno.x, f.interno.z), v).tipo, 'assa');
});
