import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, BEVANDE } from '../src/regole.js';
import { ZONE, FINESTRE, PORTE, ACQUISTI, OSTACOLI, ALTEZZA_SOFFITTO, zonaDi, quota, tetto, ostacoliPerGiocatori, zoneAperte, nomeBevanda } from '../src/mappa.js';
import { OGGETTI, PIANO_ALTO, FONDO_PLATEA, FONDO_CALDAIA, FONDO_SOTTOPALCO } from '../src/mappe/teatro.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import {
  DURATA_SIPARIO, COSTO_BOTOLA, TEMPO_SOTTO, COSTO_SENTINELLA, COSTO_TRAPPOLA, DURATA_TRAPPOLA, RICARICA_TRAPPOLA, PRIMA_ECLISSI, GAS_SUL_GIOCATORE, rallentamento,
} from '../src/teatro.js';

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

function teatro({ giocatori = [{ id: 'a', nome: 'A' }], seme = 7 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'teatro' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

const zombie = (stato, extra = {}) => {
  const z = { id: 7000 + stato.zombie.length, x: 0, z: 0, yaw: 0, stato: 'dentro', finestra: FINESTRE[0].id, vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
};

function accendi(stato) {
  for (const id of ['servizio', 'caldaia', 'rampa']) if (!stato.porte.includes(id)) stato.porte.push(id);
  metti(stato, davanti('leva'));
  compra(stato, 'leva');
  avanza(stato, DURATA_SIPARIO + 0.1);
}

test('il teatro è tutto collegato, ogni barricata e ogni acquisto stanno nella loro zona', () => {
  creaPartita({ seme: 1, mappa: 'teatro' });
  const tutte = new Set(PORTE.map(p => p.id));
  const campo = campoVerso(griglia(tutte), [{ x: 0, z: -6 }]);
  for (const z of ZONE.filter(q => !q.sala && !q.sempre)) {
    const punti = [];
    for (let i = 1; i < 8; i++) for (let j = 1; j < 8; j++) punti.push([z.x0 + ((z.x1 - z.x0) * i) / 8, z.z0 + ((z.z1 - z.z0) * j) / 8]);
    assert.ok(punti.some(([x, q]) => Number.isFinite(distanzaCampo(campo, x, q))), z.id);
  }
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, f.id);
    assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `${f.id} murata`);
  }
  const ostacoli = ostacoliPerGiocatori(tutte);
  for (const a of ACQUISTI) {
    assert.equal(zonaDi(a.posizione.x, a.posizione.z), a.zona, a.id);
    const p = davanti(a.id);
    assert.ok(!ostacoli.some(s => dentroScatola(p.x, p.z, s, R.RAGGIO_GIOCATORE * 0.5) && !s.soloSotto), `${a.id}: non ci si arriva davanti`);
  }
  assert.ok(zoneAperte(new Set()).has('sottopalco'), 'il sottopalco si raggiunge solo dalla botola');
  assert.ok(!Number.isFinite(distanzaCampo(campo, -45, 35)), 'i Corrotti non arrivano nel sottopalco');
});

test("entrando nell'atrio i piani alti stanno a sinistra e il vicolo a destra, come nel progetto", () => {
  creaPartita({ seme: 1, mappa: 'teatro' });
  const verso = { x: 0, z: 1 };
  const destraSchermo = { x: -verso.z, z: verso.x };
  const scalone = PORTE.find(p => p.id === 'scalone').centro;
  const servizio = PORTE.find(p => p.id === 'servizio').centro;
  assert.ok(scalone.x * destraSchermo.x < 0, 'la porta in cima allo scalone è a sinistra');
  assert.ok(servizio.x * destraSchermo.x > 0, "l'uscita verso il vicolo è a destra");
});

test('il teatro ha i piani: scalone, piani alti, platea in pendenza, caldaia e sottopalco sottoterra', () => {
  creaPartita({ seme: 1, mappa: 'teatro' });
  assert.equal(quota(0, -8), 0);
  assert.ok(Math.abs(quota(10.3, -6)) < 1e-9);
  assert.ok(quota(10.3, -2.5) > 1.5 && quota(10.3, -2.5) < 3);
  assert.equal(quota(10, 2.5), PIANO_ALTO);
  for (const [x, z] of [[21, 2], [22, 18], [24, 34], [16, 35]]) assert.equal(quota(x, z), PIANO_ALTO, `${x},${z}`);
  assert.equal(quota(0, 5), 0);
  assert.equal(quota(0, 24), FONDO_PLATEA);
  assert.ok(quota(0, 15) < 0 && quota(0, 15) > FONDO_PLATEA);
  assert.equal(quota(0, 35), 0);
  assert.equal(quota(-28, 38), FONDO_CALDAIA);
  assert.ok(quota(-25.5, 27) < 0 && quota(-25.5, 27) > FONDO_CALDAIA);
  assert.ok(Math.abs(quota(-16, 43)) < 1e-9 && quota(-22.9, 43) < -3.3);
  assert.equal(quota(-45, 35), FONDO_SOTTOPALCO);
  assert.equal(tetto(0, -5), 11);
  assert.equal(tetto(-24, 0), Infinity);
  assert.equal(zonaDi(13.9, 0), null);
  assert.equal(tetto(13.9, 0), PIANO_ALTO + ALTEZZA_SOFFITTO, 'fra due stanze dei piani alti il soffitto sta sopra il pavimento');
});

test('dal balconcino si salta sul palco ma dal palco non si risale', () => {
  creaPartita({ seme: 1, mappa: 'teatro' });
  const casse = OSTACOLI.find(o => o.tipo === 'casseScena');
  assert.ok(casse.soloSotto > 0 && casse.soloSotto < PIANO_ALTO);
  assert.equal(quota((casse.x0 + casse.x1) / 2, (casse.z0 + casse.z1) / 2), PIANO_ALTO);
  assert.equal(quota(casse.x0 - 0.4, 35), 0);
  assert.ok(ostacoliPerGiocatori(new Set(PORTE.map(p => p.id))).includes(casse), 'per i Corrotti il balconcino resta un muro');
});

test('prima della corrente i Sieri sono spenti, la leva alza il sipario e apre le doppie porte', () => {
  const stato = teatro();
  metti(stato, davanti('bibita-ritorno'));
  compra(stato, 'bibita-ritorno');
  assert.deepEqual(giocatore(stato).bevande, []);
  stato.porte.push('servizio', 'caldaia', 'rampa');
  metti(stato, davanti('leva'));
  const eventi = compra(stato, 'leva');
  assert.ok(stato.corrente);
  assert.ok(eventi.some(e => e.k === 'sipario'));
  assert.ok(!stato.porte.includes('sipario'), 'il sipario sale piano');
  const dopo = avanza(stato, DURATA_SIPARIO + 0.1);
  assert.ok(dopo.some(e => e.k === 'siparioAlzato'));
  assert.ok(stato.porte.includes('sipario') && stato.porte.includes('centrali'));
  assert.ok(zoneAperte(new Set(stato.porte)).has('platea'));
  metti(stato, davanti('bibita-ritorno'));
  compra(stato, 'bibita-ritorno');
  assert.deepEqual(giocatore(stato).bevande, ['ritorno']);
  assert.equal(nomeBevanda('ritorno', BEVANDE), 'Siero del Risveglio');
});

test('la botola porta nel sottopalco a pagamento e il montacarichi riporta sul palco', () => {
  const stato = teatro();
  stato.porte.push('servizio', 'caldaia', 'rampa');
  metti(stato, davanti('botola'));
  compra(stato, 'botola');
  assert.notEqual(zonaDi(giocatore(stato).x, giocatore(stato).z), 'sottopalco', 'senza corrente la botola è bloccata');
  accendi(stato);
  metti(stato, davanti('botola'));
  const punti = giocatore(stato).punti;
  const tp = giocatore(stato).teletrasporto;
  compra(stato, 'botola');
  assert.equal(giocatore(stato).punti, punti - COSTO_BOTOLA);
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'sottopalco');
  assert.equal(giocatore(stato).teletrasporto, tp + 1);
  const eventi = avanza(stato, TEMPO_SOTTO + 0.2);
  assert.ok(eventi.some(e => e.k === 'risalita'));
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'palco');
  metti(stato, davanti('botola'));
  compra(stato, 'botola');
  metti(stato, davanti('montacarichi'));
  compra(stato, 'montacarichi');
  assert.equal(zonaDi(giocatore(stato).x, giocatore(stato).z), 'palco');
  assert.deepEqual(stato.teatro.sotto, {});
});

test('la Forgia Arcana nel sottopalco potenzia con la corrente', () => {
  const stato = teatro();
  accendi(stato);
  metti(stato, davanti('botola'));
  compra(stato, 'botola');
  metti(stato, davanti('potenziatore'));
  avanza(stato, R.PASSO, una('compra', { acquisto: 'potenziatore', arma: giocatore(stato).armaAttiva }));
  assert.equal(stato.potenziatore.stato, 'lavora');
});

test('la trappola incendiaria brucia i Corrotti e chi la attraversa, poi si ricarica', () => {
  const stato = teatro();
  stato.porte.push('scalone', 'guardaroba');
  metti(stato, davanti('trappola-corridoio'));
  compra(stato, 'trappola-corridoio');
  assert.equal(stato.teatro.trappole.corridoio.attiva, 0, 'senza corrente non parte');
  accendi(stato);
  metti(stato, davanti('trappola-corridoio'));
  const punti = giocatore(stato).punti;
  compra(stato, 'trappola-corridoio');
  assert.equal(giocatore(stato).punti, punti - COSTO_TRAPPOLA);
  const area = OGGETTI.TRAPPOLE.corridoio;
  const dentro = zombie(stato, { x: (area.x0 + area.x1) / 2, z: (area.z0 + area.z1) / 2, vita: 5000, vitaMax: 5000 });
  const fuori = zombie(stato, { x: 22, z: 12, vita: 5000, vitaMax: 5000 });
  avanza(stato, 0.1, () => {
    for (const z of stato.zombie) z.attesa = 99;
    return {};
  });
  assert.equal(dentro.stato, 'morto');
  assert.notEqual(fuori.stato, 'morto');
  const io = giocatore(stato);
  Object.assign(io, { vita: 100, vitaMax: 100 });
  metti(stato, { x: (area.x0 + area.x1) / 2, z: (area.z0 + area.z1) / 2 });
  avanza(stato, 0.3);
  assert.ok(io.vita < 100 || io.stato !== 'vivo', 'il fuoco brucia anche i giocatori');
  Object.assign(io, { vita: 1e9, vitaMax: 1e9, stato: 'vivo', x: 22, z: 12 });
  stato.zombie = stato.zombie.filter(z => z !== fuori);
  avanza(stato, DURATA_TRAPPOLA);
  assert.equal(stato.teatro.trappole.corridoio.attiva, 0);
  assert.ok(stato.teatro.trappole.corridoio.ricarica > 0 && stato.teatro.trappole.corridoio.ricarica <= RICARICA_TRAPPOLA);
});

test('la sentinella della platea spara ai Corrotti in platea', () => {
  const stato = teatro();
  accendi(stato);
  metti(stato, davanti('sentinella'));
  const punti = giocatore(stato).punti;
  compra(stato, 'sentinella');
  assert.equal(giocatore(stato).punti, punti - COSTO_SENTINELLA);
  const bersaglio = zombie(stato, { x: 11, z: 15, vita: 400, vitaMax: 400 });
  avanza(stato, 3, () => {
    bersaglio.attesa = 99;
    return {};
  });
  assert.equal(bersaglio.stato, 'morto');
});

test("il lampadario dell'atrio crolla solo se gli spara chi è nell'atrio e schiaccia chi c'è sotto", () => {
  const stato = teatro();
  stato.porte.push('scalone');
  metti(stato, { x: 20, z: 0 });
  avanza(stato, R.PASSO, una('lampadario'));
  assert.equal(stato.teatro.lampadario, 0);
  metti(stato, { x: 0, z: -10 });
  const sotto = zombie(stato, { x: OGGETTI.LAMPADARIO.x + 1, z: OGGETTI.LAMPADARIO.z, vita: 9000, vitaMax: 9000 });
  const lontano = zombie(stato, { x: 9, z: -11, vita: 9000, vitaMax: 9000 });
  const eventi = avanza(stato, 1.2, i => {
    for (const z of stato.zombie) z.attesa = 99;
    return i === 0 ? una('lampadario') : {};
  });
  assert.ok(eventi.some(e => e.k === 'lampadarioCrollato'));
  assert.equal(stato.teatro.lampadario, 2);
  assert.equal(sotto.stato, 'morto');
  assert.notEqual(lontano.stato, 'morto');
});

test("ogni cinque o sei round arriva l'eclissi e i Corrotti prendono fuoco", () => {
  const stato = teatro();
  assert.ok([PRIMA_ECLISSI, PRIMA_ECLISSI + 1].includes(stato.teatro.prossimaEclissi));
  Object.assign(stato, { round: stato.teatro.prossimaEclissi - 1, fase: 'intervallo', timerFase: 0.01, daGenerare: 0 });
  const eventi = avanza(stato, 0.05);
  assert.ok(eventi.some(e => e.k === 'eclissi'));
  assert.ok(stato.teatro.eclissi);
  assert.ok(stato.teatro.prossimaEclissi - stato.round >= 5);
  stato.attesaComparsa = 0;
  avanza(stato, 0.05);
  assert.ok(stato.zombie.length > 0 && stato.zombie.every(z => z.tipo === 'ardente'));
  Object.assign(stato, { zombie: [], daGenerare: 0 });
  const fine = avanza(stato, 0.05);
  assert.ok(fine.some(e => e.k === 'eclissiFinita'));
  assert.ok(!stato.teatro.eclissi);
});

test('il Corrotto in fiamme scoppia e il Mutante tossico ucciso da vicino lascia gas che rallenta', () => {
  const stato = teatro();
  const io = giocatore(stato);
  Object.assign(io, { vita: 100, vitaMax: 100, x: 0, z: -8 });
  const ardente = zombie(stato, { tipo: 'ardente', x: 1, z: -8 });
  avanza(stato, R.PASSO, una('colpo', { zombie: ardente.id, danno: 2000 }));
  assert.ok(io.vita < 100, 'la fiammata scotta');
  Object.assign(io, { vita: 1e9, vitaMax: 1e9 });
  const lontano = zombie(stato, { tipo: 'tossico', x: 9, z: -12 });
  avanza(stato, R.PASSO, una('colpo', { zombie: lontano.id, danno: 2000 }));
  assert.equal(stato.teatro.nubi.length, 0, 'ucciso da lontano non lascia gas');
  const vicino = zombie(stato, { tipo: 'tossico', x: 1.5, z: -8 });
  const eventi = avanza(stato, 0.1, i => (i === 0 ? una('colpo', { zombie: vicino.id, danno: 2000 }) : {}));
  assert.ok(eventi.some(e => e.k === 'gas'));
  assert.ok(stato.teatro.gas.a > 0 && stato.teatro.gas.a <= GAS_SUL_GIOCATORE);
  const vista = espandi(faiIstantanea(stato));
  assert.ok(rallentamento(vista.teatro, 'a') < 1);
  assert.equal(rallentamento(vista.teatro, 'b'), 1);
});

test('i Mutanti tossici arrivano dal quarto round e solo nel teatro', () => {
  const stato = teatro();
  const visti = new Set();
  for (const round of [1, 2, 3]) {
    stato.round = round;
    for (let i = 0; i < 60; i++) {
      stato.attesaComparsa = 0;
      stato.zombie = [];
      avanza(stato, R.PASSO);
      stato.zombie.forEach(z => visti.add(z.tipo));
    }
  }
  assert.ok(!visti.has('tossico'));
  stato.round = 8;
  for (let i = 0; i < 200 && !visti.has('tossico'); i++) {
    stato.attesaComparsa = 0;
    stato.zombie = [];
    avanza(stato, R.PASSO);
    stato.zombie.forEach(z => visti.add(z.tipo));
  }
  assert.ok(visti.has('tossico'));
  const scuola = creaPartita({ seme: 3, mappa: 'scuola' });
  assert.equal(scuola.teatro, null);
});

test('la granata lanciata ai piani alti rimbalza sul pavimento del salone, non cade a terra', () => {
  const stato = teatro();
  stato.porte.push('scalone');
  metti(stato, { x: 21, z: 2 });
  avanza(stato, R.PASSO, una('granata', { yaw: Math.PI / 2, pitch: -0.3 }));
  avanza(stato, 1.5);
  const g = stato.granate[0];
  assert.ok(g && g.y >= PIANO_ALTO, `quota della granata ${g?.y}`);
});

test("l'istantanea del teatro porta sipario, trappole, sentinella, sottopalco e gas", () => {
  const stato = teatro();
  accendi(stato);
  metti(stato, davanti('botola'));
  compra(stato, 'botola');
  stato.teatro.gas.a = 2;
  stato.teatro.trappole.destra.ricarica = 12;
  const vista = espandi(faiIstantanea(stato));
  assert.equal(vista.mappa, 'teatro');
  assert.equal(vista.teatro.sipario, 2);
  assert.ok(vista.teatro.sotto.a > 0);
  assert.equal(vista.teatro.gas.a, 2);
  assert.equal(vista.teatro.trappole.destra.ricarica, 12);
  assert.equal(vista.teatro.lampadario, 0);
  assert.equal(espandi(faiIstantanea(creaPartita({ seme: 1, mappa: 'scuola' }))).teatro, null);
});

test('gas e fiammate non passano da un piano all\'altro', () => {
  const stato = teatro();
  stato.porte.push('scalone');
  const io = giocatore(stato);
  Object.assign(io, { vita: 100, vitaMax: 100, x: 14.05, z: -5.9 });
  assert.equal(quota(io.x, io.z), PIANO_ALTO);
  const sotto = zombie(stato, { tipo: 'tossico', x: 12, z: -6.5 });
  assert.equal(quota(sotto.x, sotto.z), 0);
  avanza(stato, R.PASSO, una('colpo', { zombie: sotto.id, danno: 2000 }));
  assert.equal(stato.teatro.nubi.length, 0, 'il gas del piano di sotto non sale nel salone');
  const ardente = zombie(stato, { tipo: 'ardente', x: 12, z: -6.1 });
  avanza(stato, R.PASSO, una('colpo', { zombie: ardente.id, danno: 2000 }));
  assert.equal(io.vita, 100, 'la fiammata del piano di sotto non scotta');
});

test('chi è sceso nel sottopalco e non è più in piedi non viene riportato sul palco', () => {
  const stato = teatro();
  accendi(stato);
  metti(stato, davanti('botola'));
  compra(stato, 'botola');
  const io = giocatore(stato);
  const tp = io.teletrasporto;
  io.stato = 'terra';
  avanza(stato, R.PASSO);
  assert.deepEqual(stato.teatro.sotto, {});
  assert.equal(io.teletrasporto, tp);
});
