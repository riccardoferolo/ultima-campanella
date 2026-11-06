import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, TIPI_ZOMBIE, dannoGranata, vitaZombie, faseCustode } from '../src/regole.js';
import {
  ZONE, FINESTRE, PORTE, ACQUISTI, POSTI_FUSIBILE, GENERATORE, LIMITI, zonaDi, ostacoliPerGiocatori,
} from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import { interazioneVicina } from '../src/interazioni.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  const passi = Math.round(secondi / R.PASSO);
  for (let i = 0; i < passi; i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (da, tipo, extra = {}) => ({ azioni: [{ da, tipo, ...extra }] });
const compra = (stato, da, acquisto) => avanza(stato, R.PASSO, una(da, 'compra', { acquisto }));
const giocatore = (stato, id = 'a') => stato.giocatori.find(g => g.id === id);
const acquisto = id => ACQUISTI.find(a => a.id === id);

function inGioco({ seme = 5, giocatori = [{ id: 'a', nome: 'A' }] } = {}) {
  const stato = creaPartita({ seme, giocatori });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  stato.zombie = [];
  stato.daGenerare = 0;
  stato.attesaComparsa = 999;
  return stato;
}

function zombie(stato, extra = {}) {
  const z = { id: 9000 + stato.zombie.length, x: 3, z: 3, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
}

function metti(stato, x, z, id = 'a') {
  Object.assign(giocatore(stato, id), { x, z });
}

const tutteLePorte = () => new Set(PORTE.map(p => p.id));

test("l'ala nuova è collegata: con tutte le porte aperte ogni zona si raggiunge dall'atrio", () => {
  const campo = campoVerso(griglia(tutteLePorte()), [{ x: 0, z: 0 }]);
  for (const zona of ZONE.filter(z => !z.sala)) {
    const cx = (zona.x0 + zona.x1) / 2;
    const cz = (zona.z0 + zona.z1) / 2;
    const punti = [[cx, cz], [cx + 1.3, cz + 1.3], [cx - 1.3, cz - 1.3]];
    assert.ok(punti.some(([x, z]) => Number.isFinite(distanzaCampo(campo, x, z))), `${zona.id} irraggiungibile`);
  }
});

test('le zone nuove stanno dentro i limiti della navigazione', () => {
  for (const zona of ZONE.filter(z => !z.sala)) {
    assert.ok(zona.x0 >= LIMITI.x0 && zona.x1 <= LIMITI.x1 && zona.z0 >= LIMITI.z0 && zona.z1 <= LIMITI.z1, zona.id);
  }
});

test('gli zombie nascono fuori da ogni zona e ogni finestra appartiene a una zona vera', () => {
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.comparsa.x, f.comparsa.z), null, `comparsa di ${f.id} dentro ${zonaDi(f.comparsa.x, f.comparsa.z)}`);
    assert.ok(ZONE.some(z => z.id === f.zona), f.id);
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, `interno di ${f.id}`);
  }
});

test('niente acquisti, fusibili o finestre dentro un ostacolo', () => {
  const ostacoli = ostacoliPerGiocatori(tutteLePorte());
  for (const p of POSTI_FUSIBILE) assert.ok(!ostacoli.some(s => dentroScatola(p.x, p.z, s)), `fusibile ${p.x},${p.z}`);
  for (const f of FINESTRE) assert.ok(!ostacoli.filter(s => s !== f.scatola).some(s => dentroScatola(f.interno.x, f.interno.z, s, 0.2)), `finestra ${f.id}`);
  for (const a of ACQUISTI) {
    const davanti = { x: a.posizione.x + a.verso.x * 0.8, z: a.posizione.z + a.verso.z * 0.8 };
    assert.ok(!ostacoli.some(s => dentroScatola(davanti.x, davanti.z, s)), `davanti a ${a.id}`);
    assert.equal(zonaDi(davanti.x, davanti.z), a.zona, `${a.id} fuori zona`);
  }
});

test('il cancello del rifugio non si compra con i punti', () => {
  const stato = inGioco();
  stato.porte.push('androne', 'aula');
  giocatore(stato).punti = 99999;
  metti(stato, 0, -37);
  compra(stato, 'a', 'porta:rifugio');
  assert.ok(!stato.porte.includes('rifugio'));
});

test('granate: si lanciano, rimbalzano, esplodono dopo la miccia e uccidono gli zombie vicini', () => {
  const stato = inGioco();
  const g = giocatore(stato);
  assert.equal(g.granate, R.GRANATE_INIZIALI);
  const vita = Math.floor(dannoGranata(1) * 0.35);
  const bersaglio = zombie(stato, { x: 0, z: -1, vita, vitaMax: vita });
  const lontano = zombie(stato, { x: 7, z: 5, vita: 100, vitaMax: 100 });
  metti(stato, 0, 2);
  const eventi = avanza(stato, R.PASSO, una('a', 'granata', { yaw: Math.PI, pitch: -0.9 }));
  assert.ok(eventi.some(e => e.k === 'lancio'));
  assert.equal(g.granate, R.GRANATE_INIZIALI - 1);
  assert.equal(stato.granate.length, 1);
  const dopo = avanza(stato, R.MICCIA_GRANATA + 0.1);
  assert.equal(stato.granate.length, 0);
  assert.ok(dopo.some(e => e.k === 'esplosione'));
  assert.equal(bersaglio.stato, 'morto');
  assert.equal(lontano.stato, 'dentro');
  assert.ok(g.uccisioni >= 1);
});

test('granate: una granata non attraversa i muri', () => {
  const stato = inGioco();
  metti(stato, 0, 0);
  avanza(stato, R.PASSO, una('a', 'granata', { yaw: -Math.PI / 2, pitch: 0 }));
  avanza(stato, R.MICCIA_GRANATA - 0.2);
  const [gr] = stato.granate;
  assert.ok(gr.x > -8, `la granata è uscita dal muro: ${gr.x}`);
});

test('granate: finite non si lanciano, al round dopo se ne ricevono due fino a quattro', () => {
  const stato = inGioco();
  const g = giocatore(stato);
  g.granate = 0;
  avanza(stato, R.PASSO, una('a', 'granata', { yaw: 0, pitch: 0 }));
  assert.equal(stato.granate.length, 0);
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  avanza(stato, 0.1);
  assert.equal(g.granate, R.GRANATE_PER_ROUND);
  g.granate = 3;
  stato.zombie = [];
  stato.daGenerare = 0;
  stato.presideTra = null;
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  avanza(stato, 0.1);
  assert.equal(g.granate, R.GRANATE_MASSIME);
});

test('protocollo: la granata è un\'azione valida e la sala la ignora', () => {
  assert.ok(valida({ t: 'az', a: { tipo: 'granata', yaw: 1, pitch: 0 } }));
  assert.equal(valida({ t: 'az', a: { tipo: 'granata', yaw: 'x', pitch: 0 } }), null);
  const sala = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }], sala: true });
  avanza(sala, R.PASSO, una('a', 'granata', { yaw: 0, pitch: 0 }));
  assert.equal(sala.granate.length, 0);
});

test('il Preside arriva ogni cinque round, è un boss e non muore col colpo secco', () => {
  const stato = inGioco();
  stato.round = 4;
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  const eventi = avanza(stato, R.PRESIDE_DOPO + 0.5);
  assert.equal(stato.round, 5);
  assert.ok(eventi.some(e => e.k === 'boss' && e.tipo === 'preside'));
  const preside = stato.zombie.find(z => z.tipo === 'preside');
  assert.ok(preside);
  assert.ok(preside.vita >= vitaZombie(5) * TIPI_ZOMBIE.preside.vita);
  stato.effetti.secco = 30;
  avanza(stato, R.PASSO, una('a', 'colpo', { zombie: preside.id, danno: 100 }));
  assert.notEqual(preside.stato, 'morto');
});

test('il round del Preside non finisce prima che arrivi', () => {
  const stato = inGioco();
  stato.round = 4;
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  avanza(stato, 0.1, () => {
    stato.daGenerare = 0;
    return {};
  });
  stato.daGenerare = 0;
  avanza(stato, 1);
  assert.equal(stato.fase, 'gioco');
});

test('il Preside si infuria a metà vita e, ucciso, lascia un bonus e il fusibile', () => {
  const stato = inGioco();
  const preside = zombie(stato, { tipo: 'preside', vita: 1000, vitaMax: 1000, x: 0, z: 3 });
  avanza(stato, R.PASSO, una('a', 'colpo', { zombie: preside.id, danno: 600 }));
  assert.equal(preside.corre, true);
  const bonusPrima = stato.bonus.length;
  const eventi = avanza(stato, R.PASSO, una('a', 'colpo', { zombie: preside.id, danno: 2000 }));
  assert.equal(preside.stato, 'morto');
  assert.ok(eventi.some(e => e.k === 'fusibileCaduto'));
  assert.equal(stato.bonus.length, bonusPrima + 1);
  assert.ok(stato.missione.aTerra.some(f => f.id === 1));
  assert.equal(stato.missione.presideFusibile, false);
});

test('la bomba non uccide i boss', () => {
  const stato = inGioco();
  const preside = zombie(stato, { tipo: 'preside', vita: 5000, vitaMax: 5000, x: 5, z: 3 });
  const normale = zombie(stato, { x: -5, z: 3 });
  metti(stato, 0, 0);
  stato.bonus.push({ id: 99, tipo: 'bomba', x: 0, z: 0, timer: 10 });
  avanza(stato, R.PASSO);
  assert.equal(normale.stato, 'morto');
  assert.notEqual(preside.stato, 'morto');
});

test('fusibile della biblioteca: si prende solo da vicino e solo a biblioteca aperta', () => {
  const stato = inGioco();
  const [fusibile] = stato.missione.aTerra;
  assert.ok(POSTI_FUSIBILE.some(p => p.x === fusibile.x && p.z === fusibile.z));
  assert.equal(zonaDi(fusibile.x, fusibile.z), 'biblioteca');
  metti(stato, fusibile.x, fusibile.z);
  compra(stato, 'a', 'fusibile:0');
  assert.equal(stato.missione.fusibili, 0);
  stato.porte.push('androne', 'aula', 'biblioteca');
  metti(stato, fusibile.x + 6, fusibile.z);
  compra(stato, 'a', 'fusibile:0');
  assert.equal(stato.missione.fusibili, 0);
  metti(stato, fusibile.x, fusibile.z + (fusibile.z > -30 ? 0.5 : -0.5));
  const eventi = compra(stato, 'a', 'fusibile:0');
  assert.equal(stato.missione.fusibili, 1);
  assert.ok(eventi.some(e => e.k === 'fusibile'));
  assert.equal(stato.missione.aTerra.length, 0);
});

test('generatore: parte solo in un round, avanza solo con qualcuno vicino e alla fine sputa il fusibile', () => {
  const stato = inGioco();
  stato.porte.push('androne', 'aula', 'campo');
  const leva = acquisto('generatore').posizione;
  metti(stato, leva.x, leva.z + 0.5);
  stato.fase = 'intervallo';
  stato.timerFase = 999;
  compra(stato, 'a', 'generatore');
  assert.equal(stato.missione.generatore, 'fermo');
  stato.fase = 'gioco';
  const eventi = compra(stato, 'a', 'generatore');
  assert.ok(eventi.some(e => e.k === 'generatore'));
  assert.equal(stato.missione.generatore, 'acceso');
  metti(stato, 0, 0);
  avanza(stato, 5, () => {
    stato.zombie = [];
    return {};
  });
  assert.ok(stato.missione.progresso < 0.001);
  assert.ok(stato.daGenerare >= 2, 'il round deve restare aperto finché il generatore lavora');
  metti(stato, GENERATORE.x, GENERATORE.z + 2);
  giocatore(stato).vita = 1e9;
  giocatore(stato).vitaMax = 1e9;
  const fine = avanza(stato, R.DURATA_GENERATORE + 1, () => {
    stato.zombie = [];
    return {};
  });
  assert.equal(stato.missione.generatore, 'finito');
  assert.ok(fine.some(e => e.k === 'generatoreFinito'));
  assert.ok(stato.missione.aTerra.some(f => f.id === 2));
});

test('quadro: senza corrente non prende i fusibili, al terzo apre il cancello del rifugio', () => {
  const stato = inGioco();
  stato.porte.push('androne', 'aula');
  const quadro = acquisto('quadro').posizione;
  metti(stato, quadro.x, quadro.z + 0.6);
  stato.missione.fusibili = 2;
  compra(stato, 'a', 'quadro');
  assert.equal(stato.missione.messi, 0);
  stato.corrente = true;
  compra(stato, 'a', 'quadro');
  assert.equal(stato.missione.messi, 2);
  assert.ok(!stato.porte.includes('rifugio'));
  stato.missione.fusibili = 1;
  const eventi = compra(stato, 'a', 'quadro');
  assert.equal(stato.missione.messi, 3);
  assert.ok(stato.porte.includes('rifugio'));
  assert.ok(eventi.some(e => e.k === 'rifugio'));
});

function pronta(giocatori = [{ id: 'a', nome: 'A' }]) {
  const stato = inGioco({ giocatori });
  stato.porte.push('androne', 'aula', 'rifugio');
  stato.missione.messi = 3;
  stato.corrente = true;
  return stato;
}

test("l'ultima campanella si suona solo con tutti dentro il rifugio", () => {
  const stato = pronta([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  const campana = acquisto('allarme').posizione;
  metti(stato, campana.x, campana.z + 0.8, 'a');
  metti(stato, 0, -30, 'b');
  compra(stato, 'a', 'allarme');
  assert.notEqual(stato.fase, 'finale');
  const vista = espandi(faiIstantanea(stato));
  assert.match(interazioneVicina({ id: 'a', x: campana.x, z: campana.z + 0.8, armi: ['pistola'], bevande: [], armaAttiva: 'pistola' }, vista).testo, /Entrate tutti/);
  metti(stato, 2, -45, 'b');
  const eventi = compra(stato, 'a', 'allarme');
  assert.equal(stato.fase, 'finale');
  assert.ok(eventi.some(e => e.k === 'finale'));
  assert.ok(!stato.porte.includes('rifugio'), 'il cancello si chiude alle spalle');
  const custode = stato.zombie.find(z => z.tipo === 'custode');
  assert.ok(custode);
  assert.equal(custode.vita, Math.round(R.VITA_CUSTODE * 1.7));
});

test('finale: arrivano rinforzi dal rifugio, il Custode cambia fase e la sua morte vince la partita', () => {
  const stato = pronta();
  const campana = acquisto('allarme').posizione;
  metti(stato, campana.x, campana.z + 0.8);
  compra(stato, 'a', 'allarme');
  const g = giocatore(stato);
  g.vita = 1e9;
  g.vitaMax = 1e9;
  const custode = stato.zombie.find(z => z.tipo === 'custode');
  const prima = avanza(stato, 20);
  assert.ok(prima.some(e => e.k === 'urlo'));
  assert.ok(stato.zombie.some(z => z.tipo !== 'custode' && ['r1', 'r2'].includes(z.finestra)));
  assert.equal(stato.fase, 'finale');
  const fasi = [];
  const colpi = Math.ceil(custode.vitaMax / 2000);
  for (let i = 0; i < colpi && custode.stato !== 'morto'; i++) {
    for (const e of avanza(stato, R.PASSO, una('a', 'colpo', { zombie: custode.id, danno: 2000 }))) if (e.k === 'faseBoss') fasi.push(e.fase);
  }
  assert.deepEqual(fasi, [2, 3]);
  assert.equal(custode.stato, 'morto');
  assert.equal(stato.fase, 'vinta');
  assert.ok(stato.porte.includes('rifugio'));
  assert.ok(stato.zombie.every(z => z.stato === 'morto'));
  assert.deepEqual(avanza(stato, 1), []);
});

test('il Custode scatta verso chi è lontano dalla seconda fase', () => {
  const stato = pronta();
  const campana = acquisto('allarme').posizione;
  metti(stato, campana.x, campana.z + 0.8);
  compra(stato, 'a', 'allarme');
  const custode = stato.zombie.find(z => z.tipo === 'custode');
  stato.finale.urlo = 999;
  stato.finale.rinforzi = 999;
  Object.assign(custode, { faseBoss: 2, vita: custode.vitaMax * 0.5, prossimoScatto: 0, attesa: 0 });
  const g = giocatore(stato);
  g.vita = 1e9;
  Object.assign(g, { x: 0, z: -50 });
  Object.assign(custode, { x: 0, z: -41 });
  const eventi = avanza(stato, 0.5);
  assert.ok(eventi.some(e => e.k === 'scatto'));
  assert.ok(custode.z < -43, `il Custode non ha scattato: ${custode.z}`);
});

test('faseCustode divide la vita in tre parti', () => {
  assert.equal(faseCustode(1), 1);
  assert.equal(faseCustode(0.5), 2);
  assert.equal(faseCustode(0.2), 3);
});

test("istantanea e protocollo portano granate, missione e fasi nuove", () => {
  const stato = pronta();
  stato.granate.push({ id: 1, x: 1, y: 1, z: 1, vx: 0, vy: 0, vz: 0, timer: 1, da: 'a' });
  stato.missione.generatore = 'acceso';
  stato.missione.progresso = 0.42;
  stato.fase = 'finale';
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(ist);
  assert.equal(vista.fase, 'finale');
  assert.equal(vista.granate.length, 1);
  assert.equal(vista.giocatori[0].granate, R.GRANATE_INIZIALI);
  assert.equal(vista.missione.generatore, 'acceso');
  assert.equal(vista.missione.progresso, 0.42);
  assert.equal(vista.missione.messi, 3);
  assert.equal(valida({ t: 'st', g: 1, ist: { ...ist, m: [1, 2] } }), null);
});
