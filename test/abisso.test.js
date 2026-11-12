import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, TIPI_ZOMBIE } from '../src/regole.js';
import { ZONE, ACQUISTI, FINESTRE, PORTE, PARTENZE, ELENCO_MAPPE, NOMI_MAPPE, zonaDi, quota, ostacoliPerGiocatori, zoneAperte, usaMappa } from '../src/mappa.js';
import { REATTORE, DELTA, BARRE, NODI, VALVOLE, OGGETTI, CANNE, PILONI, CONDOTTI, PARTI_SCUDO } from '../src/mappe/abisso.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { PASSO, A } from '../src/abisso.js';
import { dentroScatola } from '../src/fisica.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, typeof ingressi === 'function' ? ingressi(i) : ingressi));
  return eventi;
}

const una = (tipo, extra = {}, da = 'a') => ({ azioni: [{ da, tipo, ...extra }] });
const giocatore = (stato, id = 'a') => stato.giocatori.find(g => g.id === id);
const metti = (stato, punto, id = 'a') => Object.assign(giocatore(stato, id), { x: punto.x, z: punto.z });
const posto = id => {
  const a = ACQUISTI.find(x => x.id === id);
  return { x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 };
};
const compra = (stato, id, da = 'a') => {
  metti(stato, posto(id), da);
  return avanza(stato, R.PASSO, una('compra', { acquisto: id }, da));
};
const abisso = stato => stato.abisso;

function partita({ giocatori = [{ id: 'a', nome: 'A' }], seme = 21 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'abisso' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  stato.porte.push('paratiaBeta', 'paratiaGamma', 'portaleDelta');
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

const zombie = (stato, extra = {}) => {
  const z = { id: 9000 + stato.zombie.length, x: 0, z: 6, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 100, vitaMax: 100, tipo: 'anfibio', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
};

function accendi(stato) {
  for (const id of ['turbina-0', 'turbina-1', 'turbina-2']) compra(stato, id);
  const eventi = avanza(stato, A.TURBINA_AVVIO + 0.2);
  assert.equal(stato.corrente, true);
  return eventi;
}

function protocollo(stato) {
  accendi(stato);
  for (const i of abisso(stato).valvole.ordine) compra(stato, `valvola-${i}`);
  assert.equal(abisso(stato).protocollo, true);
  assert.equal(abisso(stato).passo, PASSO.IMMERSIONE);
}

function estraiBarre(stato) {
  if (abisso(stato).allagamento.livello < 1) {
    compra(stato, 'pannello');
    avanza(stato, A.ALLAGA_IN + 0.2);
  }
  BARRE.forEach((b, i) => {
    const g = giocatore(stato);
    metti(stato, { x: b.x + 0.4, z: b.z });
    g.su = Math.max(0, b.y - quota(g.x, g.z) - 1.15);
    avanza(stato, R.PASSO, { posizioni: { a: { x: g.x, z: g.z, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto, su: g.su } }, azioni: [{ da: 'a', tipo: 'compra', acquisto: `barra-${i}` }] });
  });
  assert.deepEqual(abisso(stato).barre, [true, true, true]);
}

test('Abyssus-9 è la sesta mappa nella scelta, con i suoi dati', () => {
  assert.ok(ELENCO_MAPPE.includes('abisso'));
  assert.equal(NOMI_MAPPE.abisso, 'Abyssus-9');
  usaMappa('abisso');
  assert.equal(ZONE[0].id, 'cupola');
  for (const p of PARTENZE) assert.equal(zonaDi(p.x, p.z), 'cupola');
  assert.equal(quota(0, 0), 0);
  assert.equal(quota(REATTORE.x + 5, REATTORE.z), REATTORE.fondo);
  assert.equal(quota(DELTA.x, DELTA.z - 11), DELTA.fondo);
  assert.equal(quota(DELTA.x, DELTA.z - 23), 0);
  assert.equal(quota(0, -45), -2);
  usaMappa('scuola');
});

test('ogni acquisto si raggiunge senza stare dentro un ostacolo, e da ogni zona si arriva alla partenza', () => {
  usaMappa('abisso');
  const tutte = new Set(PORTE.map(p => p.id));
  const ostacoli = ostacoliPerGiocatori(tutte);
  for (const a of ACQUISTI) {
    const p = { x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 };
    const dentro = ostacoli.find(s => dentroScatola(p.x, p.z, { x0: s.x0 - 0.2, z0: s.z0 - 0.2, x1: s.x1 + 0.2, z1: s.z1 + 0.2 }));
    assert.ok(!dentro, `${a.id} è dentro ${dentro?.tipo ?? dentro?.parte}`);
    assert.equal(zonaDi(p.x, p.z), a.zona, a.id);
  }
  const campo = campoVerso(griglia(tutte), [PARTENZE[0]]);
  for (const z of ZONE.filter(q => !q.sala)) {
    const punti = ACQUISTI.filter(a => a.zona === z.id).map(a => ({ x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 }));
    for (const p of punti) assert.ok(Number.isFinite(distanzaCampo(campo, p.x, p.z)), `${z.id} non raggiungibile in ${p.x},${p.z}`);
  }
  for (const f of FINESTRE) assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `finestra ${f.id}`);
  usaMappa('scuola');
});

test('le tre turbine danno la corrente; le valvole nell\'ordine dei manometri fanno scattare il Protocollo Abisso', () => {
  const stato = partita();
  compra(stato, 'valvola-0');
  assert.equal(abisso(stato).valvole.premute.length, 0);
  accendi(stato);
  const [primo, secondo] = abisso(stato).valvole.ordine;
  compra(stato, `valvola-${primo}`);
  const sbagliata = abisso(stato).valvole.ordine.find((v, i) => i > 1);
  const eventi = compra(stato, `valvola-${sbagliata}`);
  assert.ok(eventi.some(e => e.k === 'valvola' && !e.giusta));
  assert.equal(abisso(stato).valvole.premute.length, 0);
  compra(stato, `valvola-${primo}`);
  compra(stato, `valvola-${secondo}`);
  avanza(stato, A.VALVOLE_TEMPO + 0.5);
  assert.equal(abisso(stato).valvole.premute.length, 0);
  protocollo(stato);
});

test('senza turbine le bibite sono spente, tranne Ultimo Respiro', () => {
  const stato = partita();
  compra(stato, 'bibita-ferro');
  assert.deepEqual(giocatore(stato).bevande, []);
  compra(stato, 'bibita-ritorno');
  assert.deepEqual(giocatore(stato).bevande, ['ritorno']);
  accendi(stato);
  compra(stato, 'bibita-ferro');
  assert.ok(giocatore(stato).bevande.includes('ferro'));
});

test("nel pozzo allagato si consuma l'ossigeno, le barre si prendono solo all'altezza giusta e danno il Cannone di Cariddi", () => {
  const stato = partita();
  protocollo(stato);
  compra(stato, 'pannello');
  avanza(stato, A.ALLAGA_IN + 0.2);
  assert.equal(abisso(stato).allagamento.livello, 1);
  const g = giocatore(stato);
  metti(stato, { x: BARRE[2].x + 0.4, z: BARRE[2].z });
  g.su = 0;
  const eventi = avanza(stato, R.PASSO, { posizioni: { a: { x: g.x, z: g.z, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto, su: 0 } }, azioni: [{ da: 'a', tipo: 'compra', acquisto: 'barra-2' }] });
  assert.ok(eventi.some(e => e.k === 'barraLontana'));
  avanza(stato, 3, { posizioni: { a: { x: g.x, z: g.z, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto, su: 0 } } });
  assert.ok(abisso(stato).ossigeno.a < 0.95);
  estraiBarre(stato);
  assert.equal(abisso(stato).passo, PASSO.PURIFICAZIONE);
  assert.equal(abisso(stato).fucina, true);
  avanza(stato, A.SVUOTA_DOPO_BARRE + A.SVUOTA_IN + 0.5);
  assert.equal(abisso(stato).allagamento.livello, 0);
  compra(stato, 'fucina');
  assert.ok(giocatore(stato).armi.includes('charybdis'));
});

test('annegare fa male; respirare in superficie riempie di nuovo i polmoni', () => {
  const stato = partita();
  protocollo(stato);
  compra(stato, 'pannello');
  avanza(stato, A.ALLAGA_IN + 0.2);
  const g = giocatore(stato);
  Object.assign(g, { vita: 100, vitaMax: 100 });
  metti(stato, { x: REATTORE.x - 5, z: REATTORE.z });
  const fermo = { posizioni: { a: { x: g.x, z: g.z, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto, su: 0 } } };
  const eventi = avanza(stato, A.OSSIGENO + 1.5, fermo);
  assert.ok(eventi.some(e => e.k === 'annega'));
  assert.ok(g.vita < 100 || g.stato !== 'vivo');
  Object.assign(g, { vita: 100, stato: 'vivo' });
  const su = REATTORE.allagato - REATTORE.fondo - 1.45;
  avanza(stato, A.RESPIRO + 0.5, { posizioni: { a: { ...fermo.posizioni.a, su } } });
  assert.equal(abisso(stato).ossigeno.a, 1);
});

test('il globo di Cariddi si ferma, cattura gli zombie, e collassando li uccide e lascia sfere d\'ossigeno', () => {
  const stato = partita();
  const g = giocatore(stato);
  g.armi = ['pistola', 'charybdis'];
  g.armaAttiva = 'charybdis';
  metti(stato, { x: 0, z: 8 });
  const vittime = [zombie(stato, { x: 0, z: 0.5 }), zombie(stato, { x: 2.5, z: 2 }), zombie(stato, { x: -2, z: 1 })];
  const mira = { posizioni: { a: { x: 0, z: 8, yaw: Math.PI, pitch: 0, arma: 'charybdis', colpi: 0, tp: g.teletrasporto } } };
  avanza(stato, R.PASSO, { ...mira, azioni: [{ da: 'a', tipo: 'abisso', cosa: 'globo', yaw: Math.PI, pitch: 0 }] });
  assert.equal(abisso(stato).globi.length, 1);
  avanza(stato, A.GLOBO_VOLO + 0.5, mira);
  assert.ok(abisso(stato).globi[0].fermo);
  assert.ok(vittime.every(z => z.cariddi === abisso(stato).globi[0].id));
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  assert.equal(Object.keys(espandi(ist).abisso.catturati).length, 3);
  const eventi = avanza(stato, R.PASSO, { ...mira, azioni: [{ da: 'a', tipo: 'abisso', cosa: 'collassa' }] });
  assert.ok(eventi.some(e => e.k === 'implosioneCariddi' && e.uccisi.length === 3));
  assert.ok(vittime.every(z => z.stato === 'morto'));
  assert.equal(abisso(stato).sfere.length, A.GLOBO_SFERE);
  const sfera = abisso(stato).sfere[0];
  metti(stato, sfera);
  avanza(stato, R.PASSO, { posizioni: { a: { ...mira.posizioni.a, x: sfera.x, z: sfera.z } } });
  assert.equal(abisso(stato).bolle.a.colpi, A.BOLLA_COLPI);
});

test('durante il protocollo il globo che implode vicino a un nodo lo fa cadere dentro; raccolti i quattro nodi arriva il Palombaro', () => {
  const stato = partita();
  protocollo(stato);
  estraiBarre(stato);
  const ab = abisso(stato);
  NODI.forEach((n, i) => {
    ab.globi.push({ id: 500 + i, x: n.fuori.x, y: 1.5, z: n.fuori.z, vx: 0, vy: 0, vz: 0, volo: 0, fermo: true, timer: 99, raggio: 8, da: 'a', potente: false });
    avanza(stato, R.PASSO, una('abisso', { cosa: 'collassa', id: 500 + i }));
  });
  assert.deepEqual(ab.nodi, [1, 1, 1, 1]);
  NODI.forEach((n, i) => compra(stato, `nodo-${i}`));
  assert.equal(ab.passo, PASSO.AUTOPSIA);
  stato.fase = 'gioco';
  const eventi = avanza(stato, A.PALOMBARO_DOPO + 0.5);
  assert.ok(eventi.some(e => e.k === 'boss' && e.tipo === 'palombaro'));
  assert.ok(stato.zombie.some(z => z.tipo === 'palombaro'));
});

test('il Palombaro è corazzato davanti e debole alle bombole; il suo arpione trascina', () => {
  const stato = partita();
  const g = giocatore(stato);
  metti(stato, { x: 5, z: 9 });
  const p = zombie(stato, { tipo: 'palombaro', x: 5, z: -2, yaw: 0, vita: 10000, vitaMax: 10000, arpioneTra: 50, vaporeTra: 50 });
  avanza(stato, R.PASSO, una('colpo', { zombie: p.id, danno: 1000 }));
  const davanti = 10000 - p.vita;
  p.yaw = Math.PI;
  avanza(stato, R.PASSO, una('colpo', { zombie: p.id, danno: 1000 }));
  const dietro = 10000 - davanti - p.vita;
  assert.ok(dietro > davanti * 4, `${davanti} ${dietro}`);
  p.yaw = 0;
  p.arpioneTra = 0;
  p.attesa = 99;
  const eventi = avanza(stato, A.ARPIONE_MIRA + 0.3, { posizioni: { a: { x: 5, z: 9, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto } } });
  assert.ok(eventi.some(e => e.k === 'arpioneMira'));
  assert.ok(eventi.some(e => e.k === 'arpione' && e.a === 'a'));
});

test('nella camera stagna sigillata la decompressione uccide il Palombaro e libera il Nucleo, che apre i tridenti', () => {
  const stato = partita({ giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }] });
  const ab = abisso(stato);
  ab.passo = PASSO.AUTOPSIA;
  const p = zombie(stato, { tipo: 'palombaro', x: 56, z: 0, vita: 50000, vitaMax: 50000 });
  metti(stato, { x: 55.5, z: 0.5 }, 'b');
  let eventi = compra(stato, 'quadroStagna');
  assert.ok(eventi.some(e => e.k === 'stagnaOccupata'));
  assert.equal(ab.stagna.chiusa, false);
  metti(stato, { x: 40, z: 10 }, 'b');
  eventi = compra(stato, 'quadroStagna');
  assert.equal(ab.stagna.chiusa, true);
  assert.ok(!stato.porte.includes('stagnaA') && !stato.porte.includes('stagnaB'));
  p.x = 56;
  p.z = 0;
  compra(stato, 'quadroStagna');
  assert.ok(ab.stagna.decompressione > 0);
  eventi = avanza(stato, A.DECOMPRESSIONE + 0.2);
  assert.ok(eventi.some(e => e.k === 'esplosioneStagna' && e.palombaro));
  assert.equal(p.stato, 'morto');
  assert.equal(ab.nucleo, 1);
  avanza(stato, A.RIAPERTURA + 0.2);
  assert.ok(stato.porte.includes('stagnaA') && stato.porte.includes('stagnaB'));
  compra(stato, 'nucleo');
  assert.equal(ab.nucleo, 2);
  compra(stato, 'altareNucleo');
  assert.equal(ab.nucleo, 3);
  assert.equal(ab.passo, PASSO.INNO);
  compra(stato, 'altareNucleo');
  assert.ok(giocatore(stato).armi.includes('tridente'));
});

test('se chi porta il Nucleo cade, il Nucleo torna nella camera stagna', () => {
  const stato = partita();
  const ab = abisso(stato);
  Object.assign(ab, { passo: PASSO.AUTOPSIA, nucleo: 1 });
  compra(stato, 'nucleo');
  assert.equal(ab.portatore, 'a');
  giocatore(stato).stato = 'terra';
  avanza(stato, R.PASSO);
  assert.equal(ab.nucleo, 1);
  assert.equal(ab.portatore, null);
});

test("il fendente del tridente taglia una fila di zombie e il fulmine salta fino a 15 e lascia una pozza elettrica", () => {
  const stato = partita();
  const g = giocatore(stato);
  g.armi = ['pistola', 'tridente'];
  g.armaAttiva = 'tridente';
  metti(stato, { x: 0, z: 10 });
  const fila = [0, 1, 2, 3].map(k => zombie(stato, { x: 0, z: 7 - k * 1.5 }));
  const pos = { posizioni: { a: { x: 0, z: 10, yaw: Math.PI, pitch: 0, arma: 'tridente', colpi: 0, tp: g.teletrasporto } } };
  const eventi = avanza(stato, R.PASSO, { ...pos, azioni: [{ da: 'a', tipo: 'abisso', cosa: 'onda', yaw: Math.PI }] });
  assert.ok(fila.every(z => z.stato === 'morto'));
  assert.ok(eventi.some(e => e.k === 'smembra'));
  stato.zombie = [];
  const branco = Array.from({ length: 18 }, (_, i) => zombie(stato, { id: 7000 + i, x: -10 + (i % 6) * 2.4, z: -2 - Math.floor(i / 6) * 2.4, vita: 1e6, vitaMax: 1e6 }));
  metti(stato, { x: -4, z: 8 });
  const lato = { posizioni: { a: { ...pos.posizioni.a, x: -4, z: 8 } } };
  const lancio = avanza(stato, 1.2, i => (i === 0 ? { ...lato, azioni: [{ da: 'a', tipo: 'abisso', cosa: 'dardo', yaw: Math.PI, pitch: -0.123 }] } : lato));
  const fulmine = lancio.find(e => e.k === 'fulmineTridente');
  assert.ok(fulmine);
  assert.ok(fulmine.catena.length / 2 >= 10 && fulmine.catena.length / 2 <= A.FULMINE_SALTI, `${fulmine.catena.length / 2}`);
  assert.equal(abisso(stato).pozze.length, 1);
  assert.ok(branco.some(z => z.vita < 1e6));
});

test("l'inno: le canne giuste nell'ordine fanno salire il Leviatano, una nota sbagliata chiama gli annegati elettrici", () => {
  const stato = partita();
  const ab = abisso(stato);
  ab.passo = PASSO.INNO;
  const giro = { canna: -1 };
  const nota = canna => {
    const c = CANNE[canna];
    ab.dardi.push({ id: 900 + canna + ab.inno.errori * 10, x: c.x, y: 3, z: c.z + 1.2, vx: 0, vy: 0, vz: -30, volo: 1, da: 'a', potente: false });
    giro.canna = canna;
    return avanza(stato, A.NOTA_ATTESA + 0.1);
  };
  const sbagliata = ab.inno.canne.findIndex(s => s !== ab.inno.sequenza[0]);
  stato.fase = 'gioco';
  const prima = stato.zombie.length;
  const eventi = nota(sbagliata);
  assert.ok(eventi.some(e => e.k === 'notaOrgano' && !e.giusta));
  assert.ok(stato.zombie.filter(z => z.tipo === 'elettrico').length > 0 && stato.zombie.length > prima);
  stato.zombie = [];
  for (const simbolo of ab.inno.sequenza) nota(ab.inno.canne.indexOf(simbolo));
  assert.equal(ab.inno.progresso, 5);
  assert.equal(ab.passo, PASSO.LEVIATANO);
});

test('il Leviatano: corazza, piloni che lo stordiscono, cuore scoperto, e alla morte la missione è compiuta ma i round continuano', () => {
  const stato = partita({ giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }] });
  const ab = abisso(stato);
  ab.passo = PASSO.LEVIATANO;
  ab.inizioLeviatano = 0.05;
  stato.fase = 'gioco';
  for (const g of stato.giocatori) metti(stato, { x: DELTA.x, z: DELTA.z + 20 }, g.id);
  avanza(stato, 0.2);
  assert.equal(stato.fase, 'finale');
  const l = ab.leviatano;
  const bestia = stato.zombie.find(z => z.tipo === 'leviatano');
  assert.ok(bestia);
  avanza(stato, R.PASSO, una('colpo', { zombie: bestia.id, danno: 1000 }));
  assert.equal(bestia.vita, bestia.vitaMax);
  avanza(stato, A.RISVEGLIO);
  assert.equal(l.fase, 'emerso');
  const prima = bestia.vita;
  avanza(stato, R.PASSO, una('colpo', { zombie: bestia.id, danno: 1000 }));
  assert.equal(prima - bestia.vita, 500);
  l.prossimaImmersione = 999;
  PILONI.forEach((p, i) => {
    ab.dardi.push({ id: 800 + i, x: p.x + 1, y: 2, z: p.z, vx: -30, vy: 0, vz: 0, volo: 1, da: 'a', potente: false });
    avanza(stato, 0.2);
  });
  assert.equal(l.fase, 'stordito');
  const intera = bestia.vita;
  avanza(stato, R.PASSO, una('colpo', { zombie: bestia.id, danno: 1000 }));
  assert.equal(intera - bestia.vita, 1500);
  for (const g of stato.giocatori) g.armi = ['pistola', 'mitra'];
  bestia.vita = 1;
  avanza(stato, R.PASSO, una('colpo', { zombie: bestia.id, danno: 1000 }));
  const eventi = avanza(stato, A.MORTE_LEVIATANO + 0.5);
  assert.ok(eventi.some(e => e.k === 'pressioneCritica'));
  assert.equal(ab.passo, PASSO.COMPLETATA);
  assert.equal(stato.fase, 'intervallo');
  for (const g of stato.giocatori) {
    assert.deepEqual([...g.bevande].sort(), ['ferro', 'lampo', 'raffica', 'ritorno', 'scatto']);
    assert.deepEqual(g.armi, ['pistola+', 'mitra+']);
  }
  const round = stato.round;
  avanza(stato, R.INTERVALLO + 0.2);
  assert.equal(stato.round, round + 1);
  assert.equal(stato.fase, 'gioco');
});

test('le spazzate dei tentacoli si schivano saltando', () => {
  const stato = partita();
  const ab = abisso(stato);
  ab.passo = PASSO.LEVIATANO;
  ab.inizioLeviatano = 0.05;
  stato.fase = 'gioco';
  const g = giocatore(stato);
  Object.assign(g, { vita: 100, vitaMax: 100 });
  metti(stato, { x: DELTA.x + 14, z: DELTA.z });
  avanza(stato, 0.2 + A.RISVEGLIO);
  const l = ab.leviatano;
  l.prossimoAttacco = 999;
  l.prossimaImmersione = 999;
  l.azioni.push({ id: 1, tipo: 'spazzata', t: 0.05, a0: -0.4, a1: 0.4, tentacolo: 0, punti: [] });
  const pos = su => ({ posizioni: { a: { x: g.x, z: g.z, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto, su } } });
  let eventi = avanza(stato, 0.2, pos(0.6));
  assert.ok(eventi.some(e => e.k === 'schivata'));
  assert.equal(g.vita, 100);
  l.azioni.push({ id: 2, tipo: 'spazzata', t: 0.05, a0: -0.4, a1: 0.4, tentacolo: 0, punti: [] });
  eventi = avanza(stato, 0.2, pos(0));
  assert.ok(eventi.some(e => e.k === 'colpoTentacolo'));
  assert.ok(g.vita < 100);
});

test('lo scudo da palombaro para i colpi alle spalle e fa l\'onda sonica', () => {
  const stato = partita();
  const ab = abisso(stato);
  PARTI_SCUDO.forEach((posti, i) => compra(stato, `parte-${i}-${ab.scudo.posti[i]}`));
  assert.deepEqual(ab.scudo.prese, [true, true, true]);
  compra(stato, 'banco');
  assert.equal(ab.scudi.a, A.SCUDO_VITA);
  const g = giocatore(stato);
  Object.assign(g, { vita: 100, vitaMax: 100, yaw: 0 });
  metti(stato, { x: 0, z: 6 });
  const z = zombie(stato, { x: 0, z: 5.2, attesa: 0 });
  avanza(stato, 1, { posizioni: { a: { x: 0, z: 6, yaw: 0, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto } } });
  assert.equal(g.vita, 100);
  assert.ok(ab.scudi.a < A.SCUDO_VITA);
  z.vita = 1e5;
  z.vitaMax = 1e5;
  const eventi = avanza(stato, R.PASSO, { posizioni: { a: { x: 0, z: 6, yaw: Math.PI, pitch: 0, arma: g.armaAttiva, colpi: 0, tp: g.teletrasporto } }, azioni: [{ da: 'a', tipo: 'abisso', cosa: 'sonica', yaw: Math.PI }] });
  assert.ok(eventi.some(e => e.k === 'ondaSonica'));
  assert.ok(z.vita < 1e5);
});

test('Ultimo Respiro da soli rialza fino a tre volte', () => {
  const stato = partita();
  accendi(stato);
  compra(stato, 'bibita-ritorno');
  const g = giocatore(stato);
  for (let i = 0; i < 3; i++) {
    Object.assign(g, { vita: 1, vitaMax: 100 });
    const z = zombie(stato, { x: g.x, z: g.z + 0.6, attesa: 0, stato: 'attacco', bersaglio: 'a', timer: 0.01 });
    avanza(stato, 0.1);
    assert.equal(g.stato, 'terra');
    stato.zombie = stato.zombie.filter(q => q !== z);
    avanza(stato, A.AUTORIANIMA_DOPO + 0.2);
    assert.equal(g.stato, 'vivo', `giro ${i}`);
  }
  assert.equal(abisso(stato).autoRianimazioni.a, 3);
});

test('il condotto porta da Beta a Delta in un lampo e apre l\'anfiteatro', () => {
  const stato = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'abisso' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999, corrente: true });
  stato.porte.push('paratiaBeta');
  const g = Object.assign(giocatore(stato), { punti: 99999, vita: 1e9, vitaMax: 1e9 });
  const tp = g.teletrasporto;
  compra(stato, 'condotto-beta');
  assert.equal(g.teletrasporto, tp + 1);
  assert.ok(stato.porte.includes('condotti'));
  assert.ok(zoneAperte(new Set(stato.porte)).has('anfiteatro'));
  avanza(stato, A.CONDOTTO_DURATA + 0.1);
  assert.equal(g.teletrasporto, tp + 2);
  assert.ok(Math.hypot(g.x - CONDOTTI.beta.a.x, g.z - CONDOTTI.beta.a.z) < 0.01);
  assert.equal(zonaDi(g.x, g.z), 'anfiteatro');
});

test("lo Scrigno degli Abissi può dare le armi meraviglia; l'istantanea dell'abisso è valida", () => {
  const stato = partita();
  const viste = new Set();
  for (let i = 0; i < 400 && viste.size < 2; i++) {
    giocatore(stato).punti = 99999;
    compra(stato, 'cassa');
    const arma = stato.cassa.arma;
    if (arma === 'charybdis' || arma === 'tridente') viste.add(arma);
    Object.assign(stato.cassa, { stato: 'chiusa', arma: null, per: null, timer: 0 });
  }
  assert.deepEqual([...viste].sort(), ['charybdis', 'tridente']);
  assert.equal(ARMI.charybdis.segreta, true);
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  assert.ok(!valida({ t: 'st', g: 1, ist: { ...ist, ab: [1, 2, 3] } }));
  assert.ok(valida({ t: 'az', a: { tipo: 'abisso', cosa: 'globo', yaw: 0, pitch: 0 } }));
  assert.ok(!valida({ t: 'az', a: { tipo: 'abisso', cosa: 'rubaPunti' } }));
  assert.ok(valida({ t: 'g', x: 0, z: 0, yaw: 0, pitch: 0, colpi: 0, tp: 0, arma: 'pistola', su: 1.2 }));
});

test('i tipi della mappa restano nella mappa e il Leviatano non si muove da solo', () => {
  assert.equal(TIPI_ZOMBIE.anfibio.mappa, 'abisso');
  assert.equal(TIPI_ZOMBIE.leviatano.immobile, true);
  const scuola = creaPartita({ seme: 1, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'scuola' });
  avanza(scuola, R.PRIMO_ROUND_TRA + 3);
  assert.ok(scuola.zombie.every(z => !TIPI_ZOMBIE[z.tipo].mappa));
  assert.equal(scuola.abisso, null);
  const stato = partita();
  const l = zombie(stato, { tipo: 'leviatano', x: DELTA.x, z: DELTA.z, vita: 1e6, vitaMax: 1e6, attesa: 0 });
  metti(stato, { x: DELTA.x, z: DELTA.z + 12 });
  avanza(stato, 3);
  assert.equal(l.x, DELTA.x);
  assert.equal(l.z, DELTA.z);
  assert.equal(OGGETTI.STAGNA.x0 < 56, true);
  assert.ok(VALVOLE.length === 4);
});
