import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R } from '../src/regole.js';
import { ZONE, FINESTRE, PORTE, ACQUISTI, FRAMMENTI, OSTACOLI, zonaDi, ostacoliPerGiocatori, zoneAperte, NOMI_MAPPE, ELENCO_MAPPE } from '../src/mappa.js';
import { PENSILINA, TANICHE, OGGETTI } from '../src/mappe/stazione.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import { interazioneVicina } from '../src/interazioni.js';
import { GRUPPO, COSTO_INCENDIO, DURATA_INCENDIO, RICARICA_INCENDIO, DURATA_GRUPPO, ATTESA_CAMIONISTA, descrivi, obiettivo } from '../src/stazione.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (tipo, extra = {}, da = 'a') => ({ azioni: [{ da, tipo, ...extra }] });
const compra = (stato, acquisto, da = 'a') => avanza(stato, R.PASSO, una('compra', { acquisto }, da));
const davanti = id => {
  const a = ACQUISTI.find(x => x.id === id);
  return { x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 };
};
const giocatore = (stato, id = 'a') => stato.giocatori.find(g => g.id === id);
const metti = (stato, punto, id = 'a') => Object.assign(giocatore(stato, id), { x: punto.x, z: punto.z });

function stazione({ giocatori = [{ id: 'a', nome: 'A' }], seme = 7 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'stazione' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

const zombie = (stato, extra = {}) => {
  const z = { id: 9000 + stato.zombie.length, x: 0, z: -7, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 100, vitaMax: 100, tipo: 'normale', corre: true, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
};

function raccogliTutte(stato) {
  stato.porte.push('ingresso', 'serranda', 'magazzino');
  for (let n = 0; n < TANICHE; n++) {
    metti(stato, davanti(`tanica-${n}`));
    compra(stato, `tanica-${n}`);
  }
}

test("l'area di servizio è nella scelta delle mappe", () => {
  assert.ok(ELENCO_MAPPE.includes('stazione'));
  assert.equal(NOMI_MAPPE.stazione, 'Area di servizio Agogna');
  const stato = creaPartita({ seme: 1, mappa: 'stazione' });
  assert.equal(stato.mappa, 'stazione');
  assert.equal(stato.stazione.gruppo, GRUPPO.VUOTO);
});

test("l'area di servizio è collegata e ogni acquisto si raggiunge", () => {
  creaPartita({ seme: 1, mappa: 'stazione' });
  const tutte = new Set(PORTE.map(p => p.id));
  const campo = campoVerso(griglia(tutte), [{ x: -9, z: 2 }]);
  for (const z of ZONE.filter(q => !q.sala)) {
    const punti = [];
    for (let i = 1; i < 8; i++) for (let j = 1; j < 8; j++) punti.push([z.x0 + ((z.x1 - z.x0) * i) / 8, z.z0 + ((z.z1 - z.z0) * j) / 8]);
    assert.ok(punti.some(([x, q]) => Number.isFinite(distanzaCampo(campo, x, q))), z.id);
  }
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, f.id);
    if (!f.tana) assert.equal(zonaDi(f.esterno.x, f.esterno.z), null, `${f.id}: l'esterno deve stare fuori`);
    assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `${f.id} murata`);
  }
  const ostacoli = ostacoliPerGiocatori(tutte);
  for (const a of ACQUISTI) {
    assert.equal(zonaDi(a.posizione.x, a.posizione.z), a.zona, a.id);
    const p = davanti(a.id);
    assert.ok(!ostacoli.some(s => dentroScatola(p.x, p.z, s, R.RAGGIO_GIOCATORE * 0.5)), `${a.id}: non ci si arriva davanti`);
  }
  for (const f of FRAMMENTI) assert.ok(zonaDi(f.x, f.z) || OSTACOLI.some(o => dentroScatola(f.x, f.z, o, 0.3)), `gratta e vinci ${f.id}`);
  assert.deepEqual([...zoneAperte(new Set())], ['piazzale']);
});

test('con le porte chiuse si resta sul piazzale', () => {
  creaPartita({ seme: 1, mappa: 'stazione' });
  const campo = campoVerso(griglia(new Set()), [{ x: -9, z: 2 }]);
  assert.ok(!Number.isFinite(distanzaCampo(campo, -10, 12)), 'il market è chiuso');
  assert.ok(!Number.isFinite(distanzaCampo(campo, 18, 12)), "l'officina è chiusa");
  assert.ok(!Number.isFinite(distanzaCampo(campo, 0, 28)), 'il retro è chiuso');
  const aperto = campoVerso(griglia(new Set(['ingresso', 'magazzino'])), [{ x: -9, z: 2 }]);
  assert.ok(Number.isFinite(distanzaCampo(aperto, 0, 28)), 'dal magazzino si va sul retro');
});

test("senza corrente le bibite sono spente, il quadro dell'officina la riaccende", () => {
  const stato = stazione();
  stato.porte.push('ingresso');
  metti(stato, davanti('bibita-lampo'));
  compra(stato, 'bibita-lampo');
  assert.deepEqual(giocatore(stato).bevande, []);
  stato.porte.push('serranda');
  metti(stato, davanti('interruttore'));
  compra(stato, 'interruttore');
  assert.equal(stato.corrente, true);
  metti(stato, davanti('bibita-lampo'));
  compra(stato, 'bibita-lampo');
  assert.deepEqual(giocatore(stato).bevande, ['lampo']);
});

test('le tre taniche si raccolgono una volta sola e si versano nel gruppo elettrogeno', () => {
  const stato = stazione();
  raccogliTutte(stato);
  assert.deepEqual(stato.stazione.taniche, [1, 1, 1]);
  assert.equal(stato.stazione.inMano, TANICHE);
  metti(stato, davanti('tanica-0'));
  compra(stato, 'tanica-0');
  assert.equal(stato.stazione.inMano, TANICHE, 'la stessa tanica non si prende due volte');
  metti(stato, davanti('gruppo'));
  const eventi = compra(stato, 'gruppo');
  assert.ok(eventi.some(e => e.k === 'gruppoPieno'));
  assert.equal(stato.stazione.gruppo, GRUPPO.PIENO);
  assert.equal(stato.stazione.inMano, 0);
});

test('il gruppo elettrogeno va difeso, poi arriva il Camionista e la sua morte vince la partita', () => {
  const stato = stazione();
  raccogliTutte(stato);
  metti(stato, davanti('gruppo'));
  compra(stato, 'gruppo');
  compra(stato, 'gruppo');
  assert.equal(stato.stazione.gruppo, GRUPPO.ACCESO);
  metti(stato, { x: -9, z: 2 });
  avanza(stato, 5);
  const fermo = stato.stazione.progresso;
  avanza(stato, 5);
  assert.equal(stato.stazione.progresso, fermo, 'lontani dal gruppo non si va avanti');
  metti(stato, davanti('gruppo'));
  const eventi = avanza(stato, DURATA_GRUPPO + 0.5);
  assert.ok(eventi.some(e => e.k === 'faro'));
  const arrivo = avanza(stato, ATTESA_CAMIONISTA + 0.5);
  assert.ok(arrivo.some(e => e.k === 'boss' && e.tipo === 'camionista'));
  const boss = stato.zombie.find(z => z.tipo === 'camionista');
  assert.ok(boss, 'il Camionista è in campo');
  assert.ok(Math.hypot(boss.x - OGGETTI.ARRIVO_CAMION.x, boss.z - OGGETTI.ARRIVO_CAMION.z) < 1);
  const fine = avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 8000 }));
  const altri = [];
  for (let i = 0; i < 60 && stato.fase !== 'vinta'; i++) altri.push(...avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 8000 })));
  assert.equal(stato.fase, 'vinta');
  assert.ok([...fine, ...altri].some(e => e.k === 'vittoria'));
});

test('la benzina in fiamme brucia gli zombie sotto la pensilina e poi si ricarica', () => {
  const stato = stazione();
  const sotto = zombie(stato, { x: 0, z: -3 });
  const fuori = zombie(stato, { x: 0, z: 3 });
  metti(stato, davanti('emergenza'));
  compra(stato, 'emergenza');
  assert.equal(stato.stazione.incendio.attiva, 0, 'senza corrente il pulsante non va');
  stato.corrente = true;
  const punti = giocatore(stato).punti;
  const eventi = compra(stato, 'emergenza');
  assert.ok(eventi.some(e => e.k === 'incendio'));
  assert.equal(giocatore(stato).punti, punti - COSTO_INCENDIO + R.PUNTI_UCCISIONE);
  assert.equal(sotto.stato, 'morto');
  assert.notEqual(fuori.stato, 'morto');
  assert.ok(dentroScatola(0, -3, PENSILINA));
  const spento = avanza(stato, DURATA_INCENDIO + 0.2);
  assert.ok(spento.some(e => e.k === 'incendioSpento'));
  assert.ok(stato.stazione.incendio.ricarica > RICARICA_INCENDIO - 1);
});

test('chi resta sotto la pensilina in fiamme si brucia', () => {
  const stato = stazione();
  stato.corrente = true;
  const g = giocatore(stato);
  Object.assign(g, { vita: 100, vitaMax: 100 });
  metti(stato, davanti('emergenza'));
  compra(stato, 'emergenza');
  metti(stato, { x: 0, z: -3 });
  avanza(stato, 1);
  assert.ok(g.vita < 100 || g.stato !== 'vivo');
});

test("l'istantanea porta lo stato dell'area di servizio e passa la validazione", () => {
  const stato = stazione();
  raccogliTutte(stato);
  stato.corrente = true;
  metti(stato, davanti('emergenza'));
  compra(stato, 'emergenza');
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(JSON.parse(JSON.stringify(ist)));
  assert.deepEqual(vista.stazione.taniche, [1, 1, 1]);
  assert.equal(vista.stazione.inMano, TANICHE);
  assert.ok(vista.stazione.incendio.attiva > 0);
  assert.ok(!valida({ t: 'st', g: 1, ist: { ...ist, sz: [1, 2] } }));
});

test('le scritte guidano la missione', () => {
  const stato = stazione();
  stato.porte.push('magazzino', 'ingresso');
  const vista = espandi(JSON.parse(JSON.stringify(faiIstantanea(stato))));
  const io = { ...vista.giocatori[0], id: 'a' };
  assert.match(obiettivo(vista), /Taniche 0\/3/);
  const gruppo = ACQUISTI.find(a => a.id === 'gruppo');
  assert.match(descrivi(gruppo, io, vista).testo, /a secco/);
  const tanica = ACQUISTI.find(a => a.id === 'tanica-0');
  assert.match(descrivi(tanica, io, vista).testo, /tanica/);
  const vicina = interazioneVicina({ ...io, ...davanti('tanica-0') }, vista);
  assert.equal(vicina.acquisto, 'tanica-0');
});
