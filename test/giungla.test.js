import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI, ARMI_CASSA, vitaZombie, faseDivoratore, quotaCorridori, pesiZombie, fattoreGiungla } from '../src/regole.js';
import { ZONE, FINESTRE, PORTE, ACQUISTI, zonaDi, ostacoliPerGiocatori } from '../src/mappa.js';
import { OGGETTI } from '../src/mappe/giungla.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import { DURATA_GENERATORE, DURATA_PONTE, DURATA_PORTA, DURATA_FUGA, ANIME_PER_IDOLO, RELIQUIE, ID_SCHEGGIA_FIUME, ID_SCHEGGIA_GROTTA, ID_MASCHERA, ID_ASSI } from '../src/giungla.js';

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
const metti = (stato, punto, id = 'a') => Object.assign(stato.giocatori.find(g => g.id === id), { x: punto.x, z: punto.z });

function giungla({ giocatori = [{ id: 'a', nome: 'A' }], seme = 7 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'giungla' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

const tutte = () => PORTE.filter(p => !p.chiusa).map(p => p.id);
const zombie = (stato, extra = {}) => {
  const z = { id: 5000 + stato.zombie.length, x: 0, z: 0, yaw: 0, stato: 'dentro', finestra: FINESTRE[0].id, vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(z);
  return z;
};
const tenere = (stato, punto, secondi) => avanza(stato, secondi, () => {
  metti(stato, punto);
  stato.zombie = stato.zombie.filter(z => z.tipo !== 'normale' && z.tipo !== 'magro');
  return {};
});

test('la giungla è grande, tutta collegata e ogni tana sta nella sua zona', () => {
  creaPartita({ seme: 1, mappa: 'giungla' });
  const campo = campoVerso(griglia(new Set(PORTE.map(p => p.id))), [{ x: 0, z: 0 }]);
  for (const z of ZONE.filter(q => !q.sala)) {
    const punti = [];
    for (let i = 1; i < 4; i++) for (let j = 1; j < 4; j++) punti.push([z.x0 + ((z.x1 - z.x0) * i) / 4, z.z0 + ((z.z1 - z.z0) * j) / 4]);
    assert.ok(punti.some(([x, q]) => Number.isFinite(distanzaCampo(campo, x, q))), z.id);
  }
  const ostacoli = ostacoliPerGiocatori(new Set(PORTE.map(p => p.id)));
  for (const f of FINESTRE) {
    assert.ok(f.tana, f.id);
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, f.id);
    assert.ok(Number.isFinite(distanzaCampo(campo, f.interno.x, f.interno.z)), `${f.id} murata`);
  }
  for (const a of ACQUISTI) {
    const d = davanti(a.id);
    assert.equal(zonaDi(d.x, d.z), a.zona, `${a.id} fuori zona`);
    assert.ok(!ostacoli.some(s => dentroScatola(d.x, d.z, s)), `davanti a ${a.id} c'è un ostacolo`);
  }
  assert.ok(ZONE.filter(q => !q.sala).length >= 12);
});

test('nella giungla gli zombie escono da terra e al primo round sono lenti come a scuola', () => {
  const stato = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'giungla' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  assert.ok(stato.daGenerare + stato.zombie.length >= 6);
  avanza(stato, 2.5);
  const z = stato.zombie[0];
  assert.ok(z, 'nessuno zombie');
  assert.equal(z.vitaMax, vitaZombie(1));
  assert.equal(z.corre, false);
  assert.ok(['emerge', 'dentro', 'attacco'].includes(z.stato));
  const nuovo = creaPartita({ seme: 3, giocatori: [{ id: 'a', nome: 'A' }], mappa: 'giungla' });
  avanza(nuovo, R.PRIMO_ROUND_TRA + 1.2);
  assert.equal(nuovo.zombie[0].stato, 'emerge');
});

test('i reliquari non escono dalla cassa e non si ricaricano', () => {
  for (const r of ['machete', 'bastone', 'spada']) {
    assert.ok(ARMI[r].bianca);
    assert.ok(!ARMI_CASSA.includes(r));
  }
});

test('tappa 1: due generatori da difendere accendono la corrente e la radio', () => {
  const stato = giungla();
  stato.porte.push(...tutte());
  metti(stato, davanti('generatore1'));
  compra(stato, 'generatore1');
  assert.equal(stato.giungla.generatori[0].stato, 1);
  tenere(stato, OGGETTI.GENERATORI[0], DURATA_GENERATORE + 1);
  assert.equal(stato.giungla.generatori[0].stato, 2);
  assert.ok(!stato.corrente);
  metti(stato, davanti('generatore2'));
  compra(stato, 'generatore2');
  const eventi = tenere(stato, OGGETTI.GENERATORI[1], DURATA_GENERATORE + 1);
  assert.ok(stato.corrente);
  assert.ok(eventi.some(e => e.k === 'corrente'));
  metti(stato, davanti('radio'));
  const radio = compra(stato, 'radio');
  assert.ok(radio.some(e => e.k === 'radio' && e.n === 1));
});

test('tappa 2: tre fasci di assi e un minuto di difesa riparano il ponte', () => {
  const stato = giungla();
  stato.porte.push(...tutte());
  for (const id of ID_ASSI) {
    const o = stato.giungla.oggetti.find(x => x.id === id);
    metti(stato, o);
    compra(stato, `oggetto:${id}`);
  }
  assert.equal(stato.giungla.assiRaccolte, 3);
  metti(stato, davanti('cantiere'));
  compra(stato, 'cantiere');
  assert.equal(stato.giungla.ponte, 1);
  tenere(stato, OGGETTI.PONTE, DURATA_PONTE + 1);
  assert.equal(stato.giungla.ponte, 2);
  assert.ok(stato.porte.includes('ponte'));
});

test('tappa 3: dopo il ponte arriva lo Sciamano, evoca e lascia la maschera', () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte');
  stato.giungla.ponte = 2;
  stato.fase = 'intervallo';
  stato.timerFase = 0.01;
  const eventi = avanza(stato, 9);
  assert.ok(eventi.some(e => e.k === 'boss' && e.tipo === 'sciamano'));
  const sciamano = stato.zombie.find(z => z.tipo === 'sciamano');
  avanza(stato, 13);
  assert.ok(stato.zombie.filter(z => z.tipo !== 'sciamano').length >= 2, 'non ha evocato');
  avanza(stato, R.PASSO, una('colpo', { zombie: sciamano.id, danno: 2000 }));
  sciamano.vita = 1;
  const morte = avanza(stato, R.PASSO, una('colpo', { zombie: sciamano.id, danno: 10 }));
  assert.ok(morte.some(e => e.k === 'mascheraCaduta'));
  const maschera = stato.giungla.oggetti.find(o => o.id === ID_MASCHERA);
  metti(stato, maschera);
  compra(stato, `oggetto:${ID_MASCHERA}`);
  assert.equal(stato.giungla.sciamano, 3);
});

test('tappa 4: la maschera sulla porta e un minuto e mezzo di difesa aprono il tempio', () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte');
  Object.assign(stato.giungla, { ponte: 2, sciamano: 3 });
  metti(stato, davanti('portaTempio'));
  compra(stato, 'portaTempio');
  assert.equal(stato.giungla.porta, 1);
  tenere(stato, OGGETTI.PORTA_TEMPIO, DURATA_PORTA + 1);
  assert.equal(stato.giungla.porta, 2);
  assert.ok(stato.porte.includes('tempio'));
  assert.equal(stato.giungla.radioLivello, 4);
});

test("tappa 5: le rune vanno toccate nell'ordine detto dalla radio, l'errore costa caro", () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte', 'tempio');
  Object.assign(stato.giungla, { porta: 2 });
  const ordine = stato.giungla.ordine;
  const sbagliata = [0, 1, 2, 3].find(r => r !== ordine[0]);
  metti(stato, davanti(`runa${sbagliata}`));
  const errore = compra(stato, `runa${sbagliata}`);
  assert.ok(errore.some(e => e.k === 'runaSbagliata'));
  assert.ok(stato.zombie.length >= 6);
  stato.zombie = [];
  for (const r of ordine) {
    metti(stato, davanti(`runa${r}`));
    compra(stato, `runa${r}`);
  }
  assert.equal(stato.giungla.rune, 1);
});

test('tappa 6: il sigillo si rompe solo col colpo speciale di una reliquia', () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte', 'tempio');
  Object.assign(stato.giungla, { porta: 2, rune: 1 });
  const g = stato.giocatori[0];
  metti(stato, { x: 0, z: 70 });
  Object.assign(g, { armi: ['pistola', 'machete'], armaAttiva: 'machete', carica: 0.5 });
  avanza(stato, R.PASSO, una('speciale', { yaw: 0, pitch: 0 }));
  assert.equal(stato.giungla.sigillo, 0, 'senza carica non parte');
  g.carica = 1;
  const eventi = avanza(stato, R.PASSO, una('speciale', { yaw: 0, pitch: 0 }));
  assert.ok(eventi.some(e => e.k === 'speciale' && e.tipo === 'turbine'));
  assert.equal(stato.giungla.sigillo, 1);
  assert.ok(stato.porte.includes('sigillo'));
});

test('reliquia: la carica si riempie uccidendo con la reliquia in mano', () => {
  const stato = giungla();
  const g = stato.giocatori[0];
  Object.assign(g, { armi: ['pistola', 'spada'], armaAttiva: 'spada' });
  for (let i = 0; i < R.CARICA_RELIQUIA; i++) {
    const z = zombie(stato, { x: 1, z: 1 });
    avanza(stato, R.PASSO, una('colpo', { zombie: z.id, danno: 500, arma: 'spada' }));
  }
  assert.ok(g.carica >= 1 - 1e-9);
  const lontano = zombie(stato, { x: 0, z: 9, vita: 9000, vitaMax: 9000 });
  const vicino = zombie(stato, { x: 0, z: 3, vita: 900, vitaMax: 900 });
  avanza(stato, R.PASSO, una('speciale', { yaw: 0, pitch: 0 }));
  assert.equal(vicino.stato, 'morto');
  assert.ok(lontano.vita < 9000, "l'onda solare arriva lontano in linea");
});

test('Machete di Giada: tre schegge (grotta, cassa sul fiume dal ponte, aereo con la corrente), poi un round di forgia', () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte');
  const gj = stato.giungla;
  const grotta = gj.oggetti.find(o => o.id === ID_SCHEGGIA_GROTTA);
  metti(stato, grotta);
  compra(stato, `oggetto:${ID_SCHEGGIA_GROTTA}`);
  assert.equal(gj.schegge, 1);
  metti(stato, davanti('cabina'));
  compra(stato, 'cabina');
  assert.equal(gj.schegge, 1, 'senza corrente la cabina è spenta');
  stato.corrente = true;
  compra(stato, 'cabina');
  assert.equal(gj.schegge, 2);
  gj.ponte = 2;
  gj.cassaFiume.x = 0;
  metti(stato, { x: 0, z: 24.2 });
  compra(stato, `oggetto:${ID_SCHEGGIA_FIUME}`);
  assert.equal(gj.schegge, 3);
  metti(stato, davanti('altare'));
  compra(stato, 'altare');
  assert.equal(gj.altare, 1);
  Object.assign(stato, { fase: 'gioco', daGenerare: 0, zombie: [] });
  avanza(stato, 0.1);
  assert.equal(gj.altare, 2);
  const machete = gj.oggetti.find(o => o.id === RELIQUIE.machete);
  metti(stato, machete);
  compra(stato, `oggetto:${RELIQUIE.machete}`);
  assert.ok(stato.giocatori[0].armi.includes('machete'));
});

test('Bastone del Serpente: quattro idoli sfamati con le uccisioni', () => {
  const stato = giungla();
  const g = stato.giocatori[0];
  OGGETTI.IDOLI.forEach(idolo => {
    for (let i = 0; i < ANIME_PER_IDOLO; i++) {
      const z = zombie(stato, { x: idolo.x + 1, z: idolo.z + 1 });
      avanza(stato, R.PASSO, una('colpo', { zombie: z.id, danno: 500 }));
    }
  });
  assert.equal(stato.giungla.bastone, 1);
  const bastone = stato.giungla.oggetti.find(o => o.id === RELIQUIE.bastone);
  metti(stato, bastone);
  compra(stato, `oggetto:${RELIQUIE.bastone}`);
  assert.ok(g.armi.includes('bastone'));
});

test('Spada del Sole: le pietre girate come nel murale svegliano il Guardiano, che lascia la spada', () => {
  const stato = giungla();
  stato.porte.push(...tutte(), 'ponte');
  const gj = stato.giungla;
  for (let p = 0; p < 3; p++) {
    metti(stato, davanti(`pietra${p}`));
    for (let k = 0; k < gj.soluzione[p]; k++) compra(stato, `pietra${p}`);
  }
  assert.equal(gj.sole, 1);
  const guardiano = stato.zombie.find(z => z.tipo === 'guardiano');
  assert.ok(guardiano);
  guardiano.vita = 1;
  avanza(stato, R.PASSO, una('colpo', { zombie: guardiano.id, danno: 10 }));
  assert.equal(gj.sole, 2);
  const spada = gj.oggetti.find(o => o.id === RELIQUIE.spada);
  metti(stato, spada);
  compra(stato, `oggetto:${RELIQUIE.spada}`);
  assert.ok(stato.giocatori[0].armi.includes('spada'));
});

test('chi muore perde la reliquia, che torna al suo posto', () => {
  const stato = giungla();
  const g = stato.giocatori[0];
  Object.assign(g, { armi: ['pistola', 'bastone'], armaAttiva: 'bastone', stato: 'terra', timerTerra: 0.01 });
  const eventi = avanza(stato, 0.1);
  assert.ok(eventi.some(e => e.k === 'reliquiaTornata' && e.arma === 'bastone'));
  assert.ok(stato.giungla.oggetti.some(o => o.id === RELIQUIE.bastone));
});

function prontiAlFinale(giocatori) {
  const stato = giungla({ giocatori });
  stato.porte.push(...tutte(), 'ponte', 'tempio', 'sigillo');
  Object.assign(stato.giungla, { ponte: 2, porta: 2, rune: 1, sigillo: 1 });
  return stato;
}

test('tappa 7: il Divoratore ha quattro fasi, lo scudo nella seconda e le pietre nella quarta', () => {
  const stato = prontiAlFinale([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  metti(stato, davanti('cuoreAltare'), 'a');
  metti(stato, { x: 0, z: 30 }, 'b');
  compra(stato, 'cuoreAltare');
  assert.notEqual(stato.fase, 'finale', 'servono tutti nel cuore');
  metti(stato, { x: 3, z: 88 }, 'b');
  const inizio = compra(stato, 'cuoreAltare');
  assert.equal(stato.fase, 'finale');
  assert.ok(inizio.some(e => e.k === 'finale'));
  assert.ok(!stato.porte.includes('sigillo'));
  const boss = stato.zombie.find(z => z.tipo === 'divoratore');
  assert.equal(boss.vitaMax, Math.round(R.VITA_DIVORATORE * 1.7));
  stato.finale.urlo = 999;
  stato.finale.rinforzi = 999;
  boss.vita = boss.vitaMax * 0.7;
  avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 10 }));
  assert.equal(boss.faseBoss, 2);
  const prima = boss.vita;
  avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 1000 }));
  assert.ok(prima - boss.vita < 200, 'lo scudo deve ridurre i colpi normali');
  boss.vita = boss.vitaMax * 0.2;
  avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 10 }));
  assert.equal(boss.faseBoss, 4);
  assert.equal(faseDivoratore(0.2), 4);
  stato.finale.pietre = 0.01;
  avanza(stato, 0.1);
  assert.ok(stato.giungla.pietreCadenti.length >= 2);
  const g = stato.giocatori[0];
  g.vita = 50;
  g.vitaMax = 100;
  const eventi = avanza(stato, 2);
  assert.ok(eventi.some(e => e.k === 'pietra'));
});

test('tappa 8 e 9: ucciso il Divoratore si scappa all\'aereo, o si muore allo scadere del tempo', () => {
  const stato = prontiAlFinale([{ id: 'a', nome: 'A' }]);
  metti(stato, davanti('cuoreAltare'));
  compra(stato, 'cuoreAltare');
  const boss = stato.zombie.find(z => z.tipo === 'divoratore');
  boss.vita = 1;
  const morte = avanza(stato, R.PASSO, una('colpo', { zombie: boss.id, danno: 10 }));
  assert.ok(morte.some(e => e.k === 'fuga'));
  assert.equal(stato.fase, 'fuga');
  assert.ok(Math.abs(stato.giungla.fuga - DURATA_FUGA) < 0.1);
  avanza(stato, 3, () => {
    metti(stato, { x: 40, z: 6 });
    return {};
  });
  assert.equal(stato.fase, 'vinta');
  const tardi = prontiAlFinale([{ id: 'a', nome: 'A' }]);
  metti(tardi, davanti('cuoreAltare'));
  compra(tardi, 'cuoreAltare');
  tardi.zombie.find(z => z.tipo === 'divoratore').vita = 1;
  avanza(tardi, R.PASSO, una('colpo', { zombie: tardi.zombie.find(z => z.tipo === 'divoratore').id, danno: 10 }));
  tardi.giungla.fuga = 0.5;
  const fine = avanza(tardi, 1);
  assert.ok(fine.some(e => e.k === 'fugaFallita'));
  assert.equal(tardi.fase, 'fine');
});

test('istantanea e protocollo portano lo stato della giungla', () => {
  const stato = giungla();
  stato.giungla.nubi.push({ id: 1, x: 0, z: 0, raggio: 5, timer: 3, colpo: 0, da: 'a' });
  const ist = faiIstantanea(stato);
  assert.ok(valida({ t: 'st', g: 1, ist }));
  const vista = espandi(ist);
  assert.equal(vista.mappa, 'giungla');
  assert.equal(vista.giungla.ordine.length, 4);
  assert.equal(vista.giungla.nubi.length, 1);
  assert.ok(vista.giungla.oggetti.length >= 4);
  assert.ok(valida({ t: 'az', a: { tipo: 'speciale', yaw: 0, pitch: 0 } }));
  assert.ok(valida({ t: 'inizia', seme: 3, mappa: 'giungla' }));
  assert.equal(valida({ t: 'inizia', seme: 3, mappa: 'luna' }), null);
});

test('i primi round sono tranquilli e lenti, poi la giungla diventa più dura e più veloce', () => {
  for (let round = 1; round <= R.ROUND_TRANQUILLI; round++) {
    assert.equal(quotaCorridori(round), 0);
    assert.equal(pesiZombie(round).magro, 0);
    assert.equal(fattoreGiungla(R.GIUNGLA_VITA, round), 1);
  }
  let prima = 0;
  for (let round = R.ROUND_TRANQUILLI + 1; round <= R.ROUND_PIENA_DIFFICOLTA; round++) {
    const ora = fattoreGiungla(R.GIUNGLA_ORDA, round);
    assert.ok(ora > prima && quotaCorridori(round) > 0);
    prima = ora;
  }
  assert.equal(fattoreGiungla(R.GIUNGLA_VITA, R.ROUND_PIENA_DIFFICOLTA), R.GIUNGLA_VITA);
  assert.equal(fattoreGiungla(R.GIUNGLA_VELOCITA, 20), R.GIUNGLA_VELOCITA);
  assert.equal(quotaCorridori(R.ROUND_PIENA_DIFFICOLTA), 1);
});
