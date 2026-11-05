import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, zombieDelRound, vitaZombie } from '../src/regole.js';
import { FINESTRE, ACQUISTI, PORTE } from '../src/mappa.js';
import { creaPartita, passo, aggiungiGiocatore } from '../src/partita.js';
import { faiIstantanea, espandi, interpola } from '../src/istantanea.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  const passi = Math.round(secondi / R.PASSO);
  for (let i = 0; i < passi; i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const azione = (da, tipo, extra = {}) => ({ azioni: [{ da, tipo, ...extra }] });
const soloUnaVolta = ingresso => i => (i === 0 ? ingresso : {});

function partitaInGioco(giocatori = [{ id: 'a', nome: 'Richi' }, { id: 'b', nome: 'Seba' }]) {
  const stato = creaPartita({ seme: 7, giocatori });
  avanza(stato, 3.1);
  return stato;
}

function zombieDentro(stato, x, z, extra = {}) {
  const zombie = { id: 9000 + stato.zombie.length, x, z, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 150, vitaMax: 150, corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null, ...extra };
  stato.zombie.push(zombie);
  return zombie;
}

const giocatore = (stato, id) => stato.giocatori.find(g => g.id === id);
const sposta = (stato, id, x, z) => Object.assign(giocatore(stato, id), { x, z });

test('il primo round parte dopo 3 secondi con 6 zombie', () => {
  const stato = creaPartita({ seme: 1, giocatori: [{ id: 'a', nome: 'A' }] });
  assert.equal(avanza(stato, 2.9).filter(e => e.k === 'round').length, 0);
  const eventi = avanza(stato, 0.2);
  assert.ok(eventi.some(e => e.k === 'round' && e.round === 1));
  assert.equal(stato.daGenerare + stato.zombie.length, zombieDelRound(1));
});

test('gli zombie arrivano alla finestra, rompono le assi una alla volta ed entrano', () => {
  const stato = partitaInGioco();
  avanza(stato, 2);
  const zombie = stato.zombie[0];
  const finestra = zombie.finestra;
  const eventi = avanza(stato, 4 + R.ASSE_PER_FINESTRA * R.ROMPI_ASSE_OGNI + R.SCAVALCA + 1);
  assert.ok(eventi.filter(e => e.k === 'assaRotta' && e.finestra === finestra).length >= R.ASSE_PER_FINESTRA);
  assert.equal(stato.finestre[finestra], 0);
  assert.ok(['dentro', 'attacco'].includes(zombie.stato), zombie.stato);
});

test('i colpi danno 10 punti, l\'uccisione 60, in testa 100, col coltello 130', () => {
  const stato = partitaInGioco();
  const prova = (extra, attesi) => {
    const z = zombieDentro(stato, 20, 20, { vita: 100 });
    const prima = giocatore(stato, 'a').punti;
    passo(stato, R.PASSO, azione('a', 'colpo', { zombie: z.id, danno: 40 }));
    passo(stato, R.PASSO, azione('a', 'colpo', { zombie: z.id, danno: 200, ...extra }));
    assert.equal(giocatore(stato, 'a').punti - prima, R.PUNTI_COLPO + attesi);
    assert.equal(z.stato, 'morto');
  };
  prova({}, R.PUNTI_UCCISIONE);
  prova({ testa: true }, R.PUNTI_TESTA);
  prova({ coltello: true }, R.PUNTI_COLTELLO);
});

test('un colpo su uno zombie già morto non dà punti', () => {
  const stato = partitaInGioco();
  const z = zombieDentro(stato, 20, 20, { vita: 10 });
  passo(stato, R.PASSO, azione('a', 'colpo', { zombie: z.id, danno: 50 }));
  const punti = giocatore(stato, 'a').punti;
  passo(stato, R.PASSO, azione('a', 'colpo', { zombie: z.id, danno: 50 }));
  assert.equal(giocatore(stato, 'a').punti, punti);
});

test('la porta si compra da vicino, una volta sola, coi punti giusti', () => {
  const stato = partitaInGioco();
  const porta = PORTE.find(p => p.id === 'corridoio');
  sposta(stato, 'a', 0, 0);
  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'porta:corridoio' }));
  assert.equal(stato.porte.length, 0, 'comprata da lontano');
  giocatore(stato, 'a').punti = porta.costo - 1;
  sposta(stato, 'a', 0, 5);
  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'porta:corridoio' }));
  assert.equal(stato.porte.length, 0, 'comprata senza punti');
  giocatore(stato, 'a').punti = 2000;
  const eventi = passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'porta:corridoio' }));
  assert.deepEqual(stato.porte, ['corridoio']);
  assert.equal(giocatore(stato, 'a').punti, 2000 - porta.costo);
  assert.ok(eventi.some(e => e.k === 'porta'));
  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'porta:corridoio' }));
  assert.equal(giocatore(stato, 'a').punti, 2000 - porta.costo);
});

test('l\'arma dal muro: la prima volta l\'arma, poi le munizioni; la terza sostituisce quella in mano', () => {
  const stato = partitaInGioco();
  const pompa = ACQUISTI.find(a => a.id === 'muro-pompa');
  Object.assign(giocatore(stato, 'a'), { punti: 5000, x: pompa.posizione.x, z: pompa.posizione.z - 1 });
  let eventi = passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'muro-pompa' }));
  assert.deepEqual(giocatore(stato, 'a').armi, ['pistola', 'pompa']);
  assert.ok(eventi.some(e => e.k === 'acquisto' && e.arma === 'pompa'));
  eventi = passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'muro-pompa' }));
  assert.ok(eventi.some(e => e.k === 'munizioni'));
  assert.equal(giocatore(stato, 'a').punti, 5000 - pompa.costo - pompa.munizioni);

  stato.porte.push('palestra');
  const assalto = ACQUISTI.find(a => a.id === 'muro-assalto');
  Object.assign(giocatore(stato, 'a'), { x: assalto.posizione.x, z: assalto.posizione.z - 1 });
  passo(stato, R.PASSO, { posizioni: { a: { x: assalto.posizione.x, z: assalto.posizione.z - 1, yaw: 0, pitch: 0, arma: 'pistola' } }, azioni: [{ da: 'a', tipo: 'compra', acquisto: 'muro-assalto' }] });
  assert.deepEqual(giocatore(stato, 'a').armi, ['assalto', 'pompa']);
});

test('gli acquisti di una zona chiusa non si fanno', () => {
  const stato = partitaInGioco();
  const mitra = ACQUISTI.find(a => a.id === 'muro-mitra');
  Object.assign(giocatore(stato, 'a'), { punti: 5000, x: mitra.posizione.x + 1, z: mitra.posizione.z });
  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'muro-mitra' }));
  assert.deepEqual(giocatore(stato, 'a').armi, ['pistola']);
});

test('la Bibita Ferro porta la vita a 250 e si perde andando a terra', () => {
  const stato = partitaInGioco();
  const ferro = ACQUISTI.find(a => a.id === 'bibita-ferro');
  Object.assign(giocatore(stato, 'a'), { punti: 5000, x: ferro.posizione.x - 1, z: ferro.posizione.z });
  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'bibita-ferro' }));
  assert.equal(giocatore(stato, 'a').vitaMax, R.VITA_FERRO);
  assert.deepEqual(giocatore(stato, 'a').bevande, ['ferro']);
  giocatore(stato, 'a').vita = 1;
  zombieDentro(stato, giocatore(stato, 'a').x - 0.8, giocatore(stato, 'a').z);
  avanza(stato, 1);
  assert.equal(giocatore(stato, 'a').stato, 'terra');
  assert.deepEqual(giocatore(stato, 'a').bevande, []);
  assert.equal(giocatore(stato, 'a').vitaMax, R.VITA);
});

test('la cassa dà un\'arma a caso da prendere entro 8 secondi', () => {
  const stato = partitaInGioco();
  stato.porte.push('palestra');
  const cassa = ACQUISTI.find(a => a.id === 'cassa');
  Object.assign(giocatore(stato, 'a'), { punti: 3000, x: cassa.posizione.x, z: cassa.posizione.z - 1.2 });
  let eventi = passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'cassa' }));
  const offerta = eventi.find(e => e.k === 'cassa');
  assert.ok(offerta && offerta.arma !== 'pistola');
  assert.equal(giocatore(stato, 'a').punti, 3000 - R.COSTO_CASSA);
  Object.assign(giocatore(stato, 'b'), { punti: 3000, x: cassa.posizione.x, z: cassa.posizione.z - 1.2 });
  passo(stato, R.PASSO, azione('b', 'compra', { acquisto: 'cassa' }));
  assert.equal(giocatore(stato, 'b').punti, 3000, 'l\'altro non può prendere né riaprire');
  eventi = passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'cassa' }));
  assert.ok(giocatore(stato, 'a').armi.includes(offerta.arma));
  assert.equal(stato.cassa.stato, 'chiusa');

  passo(stato, R.PASSO, azione('a', 'compra', { acquisto: 'cassa' }));
  avanza(stato, R.DURATA_CASSA + 0.1);
  assert.equal(stato.cassa.stato, 'chiusa', 'scaduta');
});

test('rimettere un\'asse dà 10 punti, rispetta l\'attesa e il massimo', () => {
  const stato = partitaInGioco();
  const finestra = FINESTRE.find(f => f.id === 'a3');
  stato.zombie = [];
  stato.daGenerare = 0;
  stato.finestre.a3 = 3;
  Object.assign(giocatore(stato, 'a'), { x: finestra.interno.x, z: finestra.interno.z });
  const prima = giocatore(stato, 'a').punti;
  passo(stato, R.PASSO, azione('a', 'assa', { finestra: 'a3' }));
  passo(stato, R.PASSO, azione('a', 'assa', { finestra: 'a3' }));
  assert.equal(stato.finestre.a3, 4);
  assert.equal(giocatore(stato, 'a').punti, prima + R.PUNTI_ASSA);
  avanza(stato, 5, i => (i % 50 === 0 ? azione('a', 'assa', { finestra: 'a3' }) : {}));
  assert.equal(stato.finestre.a3, R.ASSE_PER_FINESTRA);
});

test('lo zombie colpisce ogni 1,4 s per 45; a 0 si va a terra', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  const a = giocatore(stato, 'a');
  sposta(stato, 'b', 7, 4);
  zombieDentro(stato, a.x + 0.9, a.z);
  const eventi = avanza(stato, 4.6);
  assert.equal(eventi.filter(e => e.k === 'ferito' && e.a === 'a').length, 3);
  assert.equal(a.stato, 'terra');
  assert.ok(eventi.some(e => e.k === 'aTerra' && e.a === 'a'));
});

test('l\'amico vicino che tiene premuto rianima in 4 s, con Bibita Ritorno in 1,5', () => {
  for (const [bevande, tempo] of [[[], R.RIANIMA_IN], [['ritorno'], R.RIANIMA_RAPIDO]]) {
    const stato = partitaInGioco();
    stato.daGenerare = 0;
    Object.assign(giocatore(stato, 'a'), { stato: 'terra', vita: 0, timerTerra: R.TEMPO_A_TERRA });
    Object.assign(giocatore(stato, 'b'), { x: giocatore(stato, 'a').x + 1, z: giocatore(stato, 'a').z, bevande });
    passo(stato, R.PASSO, azione('b', 'rianima', { attivo: true }));
    avanza(stato, tempo - 0.2);
    assert.equal(giocatore(stato, 'a').stato, 'terra');
    const eventi = avanza(stato, 0.3);
    assert.ok(eventi.some(e => e.k === 'rianimato' && e.a === 'a'));
    assert.equal(giocatore(stato, 'a').vita, R.VITA);
  }
});

test('se lasci il tasto la rianimazione riparte da zero', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  Object.assign(giocatore(stato, 'a'), { stato: 'terra', vita: 0, timerTerra: R.TEMPO_A_TERRA });
  Object.assign(giocatore(stato, 'b'), { x: giocatore(stato, 'a').x + 1, z: giocatore(stato, 'a').z });
  passo(stato, R.PASSO, azione('b', 'rianima', { attivo: true }));
  avanza(stato, 3);
  passo(stato, R.PASSO, azione('b', 'rianima', { attivo: false }));
  assert.equal(giocatore(stato, 'a').progressoRianimazione, 0);
});

test('dopo 30 s a terra si muore e si rinasce al round dopo con la pistola', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  stato.zombie = [];
  Object.assign(giocatore(stato, 'a'), { stato: 'terra', vita: 0, timerTerra: 0.5, armi: ['pompa', 'mitra'] });
  sposta(stato, 'b', 7, 4);
  let eventi = avanza(stato, 0.6);
  assert.ok(eventi.some(e => e.k === 'morto' && e.a === 'a'));
  eventi = avanza(stato, R.INTERVALLO + 0.5);
  assert.ok(eventi.some(e => e.k === 'rinato' && e.a === 'a'));
  assert.equal(giocatore(stato, 'a').stato, 'vivo');
  assert.deepEqual(giocatore(stato, 'a').armi, ['pistola']);
});

test('finiti gli zombie si passa all\'intervallo e al round dopo, più duro', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  stato.zombie = [];
  const eventi = avanza(stato, R.INTERVALLO + 0.5);
  assert.ok(eventi.some(e => e.k === 'fineRound' && e.round === 1));
  assert.ok(eventi.some(e => e.k === 'round' && e.round === 2));
  avanza(stato, 3);
  assert.ok(stato.zombie.every(z => z.vitaMax === vitaZombie(2)));
});

test('se nessuno resta in piedi la partita finisce', () => {
  const stato = partitaInGioco();
  for (const g of stato.giocatori) Object.assign(g, { stato: 'terra', vita: 0, timerTerra: 30 });
  const eventi = passo(stato, R.PASSO, {});
  assert.ok(eventi.some(e => e.k === 'fine'));
  assert.equal(stato.fase, 'fine');
});

test('un giocatore che entra a partita iniziata parte con 500 punti e la pistola', () => {
  const stato = partitaInGioco([{ id: 'a', nome: 'A' }]);
  const nuovo = aggiungiGiocatore(stato, { id: 'b', nome: 'B' });
  assert.equal(nuovo.punti, R.PUNTI_INIZIALI);
  assert.deepEqual(nuovo.armi, ['pistola']);
  assert.equal(aggiungiGiocatore(stato, { id: 'b', nome: 'B2' }), nuovo);
  assert.equal(stato.giocatori.length, 2);
});

test('stessi ingressi, stessa partita', () => {
  const copione = i => ({ posizioni: { a: { x: Math.sin(i / 90) * 3, z: Math.cos(i / 90) * 3, yaw: 0, pitch: 0, arma: 'pistola' } } });
  const a = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }] });
  const b = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }] });
  avanza(a, 30, copione);
  avanza(b, 30, copione);
  delete a.campo;
  delete b.campo;
  assert.deepEqual(a, b);
});

test('l\'istantanea va e torna e resta piccola', () => {
  const stato = partitaInGioco();
  avanza(stato, 20);
  const testo = JSON.stringify(faiIstantanea(stato));
  assert.ok(testo.length < 4000, `${testo.length} byte`);
  const vista = espandi(JSON.parse(testo));
  assert.equal(vista.zombie.length, stato.zombie.length);
  assert.equal(vista.giocatori[0].punti, stato.giocatori[0].punti);
  assert.equal(vista.fase, stato.fase);
  const mezzo = interpola(vista, vista, 0.5);
  assert.equal(mezzo.zombie.length, vista.zombie.length);
});

test('l\'ultimo zombie che compare non chiude il round', () => {
  const stato = partitaInGioco();
  stato.zombie = [];
  stato.daGenerare = 1;
  stato.attesaComparsa = 0;
  const eventi = passo(stato, R.PASSO, {});
  assert.equal(stato.zombie.length, 1);
  assert.equal(stato.fase, 'gioco');
  assert.ok(!eventi.some(e => e.k === 'fineRound'));
});

test('lo zombie non colpisce attraverso il muro', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  stato.porte.push('corridoio');
  sposta(stato, 'a', -1.5, 5.4);
  sposta(stato, 'b', -6, -4);
  zombieDentro(stato, -1.6, 6.6);
  const eventi = avanza(stato, 0.5);
  assert.ok(!eventi.some(e => e.k === 'ferito'), 'colpito attraverso il muro');
});

test('dopo la rinascita le posizioni vecchie del client vengono ignorate', () => {
  const stato = partitaInGioco();
  stato.daGenerare = 0;
  stato.zombie = [];
  Object.assign(giocatore(stato, 'a'), { stato: 'morto', x: 6, z: 4 });
  sposta(stato, 'b', -6, 4);
  avanza(stato, R.INTERVALLO + 0.5);
  const a = giocatore(stato, 'a');
  assert.equal(a.teletrasporto, 1);
  passo(stato, R.PASSO, { posizioni: { a: { x: 6, z: 4, yaw: 0, pitch: 0, arma: 'pistola', colpi: 0, tp: 0 } } });
  assert.notEqual(a.x, 6, 'ha preso la posizione da morto');
  passo(stato, R.PASSO, { posizioni: { a: { x: 1, z: 1, yaw: 0, pitch: 0, arma: 'pistola', colpi: 0, tp: 1 } } });
  assert.equal(a.x, 1);
});

test('il fucile comprato sostituisce l\'arma che si ha in mano al momento dell\'acquisto', () => {
  const stato = partitaInGioco();
  const pompa = ACQUISTI.find(a => a.id === 'muro-pompa');
  Object.assign(giocatore(stato, 'a'), { punti: 5000, x: pompa.posizione.x, z: pompa.posizione.z - 1, armi: ['pistola', 'mitra'], armaAttiva: 'mitra' });
  passo(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'compra', acquisto: 'muro-pompa', arma: 'pistola' }] });
  assert.deepEqual(giocatore(stato, 'a').armi, ['pompa', 'mitra']);
});

test('chi rinasce non viene interpolato fra la morte e la partenza', () => {
  const stato = partitaInGioco();
  const a = espandi(faiIstantanea(stato));
  Object.assign(giocatore(stato, 'a'), { x: -1.5, z: 0, teletrasporto: 1 });
  const b = espandi(faiIstantanea(stato));
  a.giocatori[0].x = -5;
  const mezzo = interpola(a, b, 0.5);
  assert.equal(mezzo.giocatori[0].x, -1.5);
});
