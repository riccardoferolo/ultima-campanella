import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, BEVANDE, armiPortate, fattoreBevande } from '../src/regole.js';
import { ACQUISTI, ZONE } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { creaArsenale, spara, allinea } from '../src/arsenale.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, ingressi));
  return eventi;
}

const compra = (stato, acquisto, arma) => avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'compra', acquisto, arma }] });
const davanti = id => {
  const a = ACQUISTI.find(x => x.id === id);
  return { x: a.posizione.x + a.verso.x * 0.8, z: a.posizione.z + a.verso.z * 0.8 };
};

function inGioco() {
  const stato = creaPartita({ seme: 4, giocatori: [{ id: 'a', nome: 'A' }] });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 0, attesaComparsa: 999 });
  stato.porte.push('corridoio', 'androne', 'aula', 'biblioteca', 'campo');
  Object.assign(stato.giocatori[0], { punti: 99999 });
  return stato;
}

test('sei bibite, ognuna con la sua macchinetta in una zona vera', () => {
  assert.equal(Object.keys(BEVANDE).length, 6);
  for (const b of Object.keys(BEVANDE)) {
    const macchina = ACQUISTI.find(a => a.tipo === 'bevanda' && a.bevanda === b);
    assert.ok(macchina, `${b} senza macchinetta`);
    assert.ok(ZONE.some(z => z.id === macchina.zona), b);
    assert.equal(BEVANDE[b].nome.split(' ').length, 2, 'il pannello della macchinetta vuole due parole');
  }
});

test('Raffica fa sparare più veloce, Scatto fa correre di più', () => {
  const normale = creaArsenale();
  spara(normale);
  const veloce = creaArsenale();
  spara(veloce, ['raffica']);
  assert.ok(veloce.attesa < normale.attesa);
  assert.equal(veloce.attesa, ARMI.pistola.cadenza * BEVANDE.raffica.cadenza);
  assert.ok(fattoreBevande(['scatto'], 'velocita') > 1);
  assert.equal(fattoreBevande([], 'velocita'), 1);
});

test('Tasca: con la bibita si porta una terza arma, a terra la si perde', () => {
  const stato = inGioco();
  const g = stato.giocatori[0];
  Object.assign(g, davanti('muro-pompa'));
  compra(stato, 'muro-pompa', 'pistola');
  Object.assign(g, davanti('muro-mitra'));
  compra(stato, 'muro-mitra', 'pompa');
  assert.deepEqual(g.armi, ['pistola', 'mitra'], 'senza Tasca la terza sostituisce quella in mano');
  Object.assign(g, davanti('bibita-tasca'));
  compra(stato, 'bibita-tasca');
  assert.ok(g.bevande.includes('tasca'));
  assert.equal(armiPortate(g.bevande), 3);
  Object.assign(g, davanti('muro-pompa'));
  compra(stato, 'muro-pompa', 'mitra');
  assert.deepEqual(g.armi, ['pistola', 'mitra', 'pompa']);
  g.vita = 1;
  stato.zombie.push({ id: 1, x: g.x, z: g.z + 0.5, yaw: 0, stato: 'attacco', finestra: 'a1', vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0.001, attesa: 0, bersaglio: 'a' });
  const eventi = avanza(stato, R.PASSO * 2);
  assert.equal(g.stato, 'terra');
  assert.deepEqual(g.armi, ['pistola', 'mitra']);
  assert.equal(g.armaAttiva, 'pistola');
  assert.ok(eventi.some(e => e.k === 'armi' && e.armi.length === 2));
  const arsenale = creaArsenale();
  allinea(arsenale, ['pistola', 'mitra', 'pompa'], 'pompa');
  allinea(arsenale, ['pistola', 'mitra']);
  assert.equal(arsenale.armi.length, 2);
  assert.equal(arsenale.armi[arsenale.attiva].tipo, 'pistola');
});
