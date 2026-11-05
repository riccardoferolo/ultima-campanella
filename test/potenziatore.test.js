import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, versionePotenziata, armaBase } from '../src/regole.js';
import { ACQUISTI } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';

const posto = id => ACQUISTI.find(a => a.id === id).posizione;
const compra = (stato, acquisto, arma) => passo(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'compra', acquisto, arma }] });
function avanza(stato, secondi) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, {}));
  return eventi;
}

function partita() {
  const stato = creaPartita({ seme: 9, giocatori: [{ id: 'a', nome: 'A' }] });
  stato.porte.push('corridoio', 'palestra', 'laboratorio', 'caldaia', 'mensa');
  stato.fase = 'intervallo';
  stato.timerFase = 999;
  return stato;
}
const io = stato => stato.giocatori[0];
const vai = (stato, id, dx = -1) => Object.assign(io(stato), { x: posto(id).x + dx, z: posto(id).z });

test('ogni arma ha la sua versione potenziata, più forte', () => {
  for (const [chiave, arma] of Object.entries(ARMI)) {
    if (arma.potenziata) continue;
    const forte = ARMI[`${chiave}+`];
    assert.ok(forte && forte.danno === arma.danno * 2 && forte.caricatore > arma.caricatore, chiave);
    assert.equal(versionePotenziata(chiave), `${chiave}+`);
    assert.equal(armaBase(`${chiave}+`), chiave);
  }
  assert.equal(versionePotenziata('pompa+'), null);
});

test('senza corrente il potenziatore non parte', () => {
  const stato = partita();
  Object.assign(io(stato), { punti: 9000 });
  vai(stato, 'potenziatore');
  compra(stato, 'potenziatore', 'pistola');
  assert.equal(stato.potenziatore.stato, 'libero');
  assert.equal(io(stato).punti, 9000);
});

test('l\'interruttore accende la corrente una volta sola, gratis', () => {
  const stato = partita();
  vai(stato, 'interruttore');
  const eventi = compra(stato, 'interruttore');
  assert.ok(stato.corrente);
  assert.ok(eventi.some(e => e.k === 'corrente'));
  assert.equal(compra(stato, 'interruttore').filter(e => e.k === 'corrente').length, 0);
  assert.equal(io(stato).punti, R.PUNTI_INIZIALI);
});

test('il potenziatore lavora 3 s, poi l\'arma va ritirata e sostituisce quella vecchia', () => {
  const stato = partita();
  stato.corrente = true;
  Object.assign(io(stato), { punti: 9000, armi: ['pistola', 'mitra'], armaAttiva: 'mitra' });
  vai(stato, 'potenziatore');
  compra(stato, 'potenziatore', 'mitra');
  assert.equal(io(stato).punti, 9000 - R.COSTO_POTENZIA);
  assert.equal(stato.potenziatore.stato, 'lavora');
  compra(stato, 'potenziatore', 'mitra');
  assert.deepEqual(io(stato).armi, ['pistola', 'mitra'], 'ritirata prima del tempo');
  const pronta = avanza(stato, R.DURATA_POTENZIA + 0.1);
  assert.ok(pronta.some(e => e.k === 'potenziataPronta'));
  const eventi = compra(stato, 'potenziatore', 'pistola');
  assert.deepEqual(io(stato).armi, ['pistola', 'mitra+']);
  assert.equal(io(stato).armaAttiva, 'mitra+');
  assert.ok(eventi.some(e => e.k === 'acquisto' && e.arma === 'mitra+'));
  assert.equal(stato.potenziatore.stato, 'libero');
});

test('un\'arma già potenziata non si ripotenzia', () => {
  const stato = partita();
  stato.corrente = true;
  Object.assign(io(stato), { punti: 9000, armi: ['pistola+'], armaAttiva: 'pistola+' });
  vai(stato, 'potenziatore');
  compra(stato, 'potenziatore', 'pistola+');
  assert.equal(stato.potenziatore.stato, 'libero');
  assert.equal(io(stato).punti, 9000);
});

test('se non la ritiri in 10 s la macchina torna libera', () => {
  const stato = partita();
  stato.corrente = true;
  Object.assign(io(stato), { punti: 9000 });
  vai(stato, 'potenziatore');
  compra(stato, 'potenziatore', 'pistola');
  avanza(stato, R.DURATA_POTENZIA + R.ATTESA_RITIRO + 0.2);
  assert.equal(stato.potenziatore.stato, 'libero');
  assert.deepEqual(io(stato).armi, ['pistola']);
});

test('dal muro, con l\'arma potenziata si comprano le sue munizioni', () => {
  const stato = partita();
  Object.assign(io(stato), { punti: 5000, armi: ['pistola', 'pompa+'], armaAttiva: 'pompa+' });
  vai(stato, 'muro-pompa', 0);
  io(stato).z -= 1;
  const eventi = compra(stato, 'muro-pompa', 'pompa+');
  assert.ok(eventi.some(e => e.k === 'munizioni' && e.arma === 'pompa+'));
  assert.deepEqual(io(stato).armi, ['pistola', 'pompa+']);
});

test('la cassa non dà un\'arma che hai già, nemmeno potenziata', () => {
  for (let seme = 1; seme < 40; seme++) {
    const stato = partita();
    stato.seme = seme;
    stato.rng = seme;
    Object.assign(io(stato), { punti: 5000, armi: ['raggi+', 'mitra'], armaAttiva: 'mitra' });
    vai(stato, 'cassa', 0);
    io(stato).z -= 1.2;
    const offerta = compra(stato, 'cassa').find(e => e.k === 'cassa');
    assert.ok(offerta && !['raggi', 'mitra'].includes(offerta.arma), offerta?.arma);
  }
});

test('l\'istantanea porta corrente e potenziatore e passa la validazione', () => {
  const stato = partita();
  stato.corrente = true;
  Object.assign(stato.potenziatore, { stato: 'pronta', arma: 'assalto+', per: 'a', timer: 4 });
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(ist);
  assert.equal(vista.corrente, true);
  assert.deepEqual(vista.potenziatore, { stato: 'pronta', arma: 'assalto+', per: 'a', timer: 4 });
});
