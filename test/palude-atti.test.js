import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, TIPI_ZOMBIE, vitaZombie } from '../src/regole.js';
import { ACQUISTI, FINESTRE, PORTE, zonaDi } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { AMULETO, VARCO, bersagliPalude, invischiato, pesiPalude, sulleRocce, obiettivo } from '../src/palude.js';
import { MISSIONE } from '../src/mappe/palude.js';

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, ingressi));
  return eventi;
}

const azione = (stato, a) => avanza(stato, R.PASSO, { azioni: [{ da: 'a', ...a }] });
const compra = (stato, acquisto, da = 'a') => avanza(stato, R.PASSO, { azioni: [{ da, tipo: 'compra', acquisto }] });
const acquisto = id => ACQUISTI.find(a => a.id === id);
const davanti = a => ({ x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 });
const giocatore = (stato, id = 'a') => stato.giocatori.find(g => g.id === id);
const metti = (stato, punto, id = 'a') => Object.assign(giocatore(stato, id), { x: punto.x, z: punto.z });
const vicinoA = (p, dx = 0, dz = 3) => ({ x: p.x + dx, z: p.z + dz });

function palude(giocatori = [{ id: 'a', nome: 'A' }]) {
  const stato = creaPartita({ seme: 5, giocatori, mappa: 'palude' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999, corrente: true });
  stato.porte.push(...PORTE.map(p => p.id));
  stato.palude.altare = R.ANIME_ALTARE;
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999, anime: R.TESCHIO_ANIME_MAX, armi: [g.armi[0], 'teschio'], armaAttiva: 'teschio' });
  return stato;
}

const zombieA = (stato, x, z, extra = {}) => {
  const zombie = { id: 9000 + stato.zombie.length, x, z, yaw: 0, stato: 'dentro', finestra: FINESTRE[0].id, vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(zombie);
  return zombie;
};

function spezzaTotem(stato, nome) {
  stato.palude.sigilli.totem |= { capanna: 1, cimitero: 2, rapide: 4 }[nome];
}

test('capanna: il miasma ferisce, le bombole esplodono col Teschio e liberano l’amuleto', () => {
  const stato = palude();
  const g = giocatore(stato);
  metti(stato, MISSIONE.MIASMA);
  assert.ok(avanza(stato, 1.1).some(e => e.k === 'ferito' && e.a === 'a'), 'il miasma non fa male');
  metti(stato, vicinoA(MISSIONE.BOMBOLE[0], 0, 6));
  g.armaAttiva = g.armi[0];
  azione(stato, { tipo: 'teschio', oggetto: 'bombola-0' });
  assert.equal(stato.palude.sigilli.bombole[0], false, 'senza Teschio in mano non esplode');
  g.armaAttiva = 'teschio';
  const eventi = azione(stato, { tipo: 'teschio', oggetto: 'bombola-0' });
  assert.ok(eventi.some(e => e.k === 'bombola' && e.indice === 0));
  assert.equal(g.anime, R.TESCHIO_ANIME_MAX - R.TESCHIO_COSTO);
  azione(stato, { tipo: 'teschio', oggetto: 'bombola-0' });
  assert.equal(g.anime, R.TESCHIO_ANIME_MAX - R.TESCHIO_COSTO, 'una bombola esplode una volta sola');
  for (const i of [1, 2]) {
    g.anime = R.TESCHIO_ANIME_MAX;
    metti(stato, vicinoA(MISSIONE.BOMBOLE[i], 0, 6));
    azione(stato, { tipo: 'teschio', oggetto: `bombola-${i}` });
  }
  assert.equal(stato.palude.sigilli.amuleto, AMULETO.LIBERO);
  metti(stato, MISSIONE.MIASMA);
  assert.ok(!avanza(stato, 1.1).some(e => e.k === 'ferito'), 'senza bombole il miasma sparisce');
});

test('capanna: l’amuleto nel totem lo spezza; se chi lo porta muore torna al suo posto', () => {
  const stato = palude([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  stato.palude.sigilli.bombole = [true, true, true];
  stato.palude.sigilli.amuleto = AMULETO.LIBERO;
  metti(stato, davanti(acquisto('amuleto')));
  compra(stato, 'amuleto');
  assert.equal(stato.palude.sigilli.portatore, 'a');
  giocatore(stato).stato = 'morto';
  const tornato = avanza(stato, R.PASSO);
  assert.ok(tornato.some(e => e.k === 'amuletoTornato'));
  assert.equal(stato.palude.sigilli.amuleto, AMULETO.LIBERO);
  metti(stato, davanti(acquisto('amuleto')), 'b');
  compra(stato, 'amuleto', 'b');
  metti(stato, davanti(acquisto('totem-capanna')), 'b');
  const eventi = compra(stato, 'totem-capanna', 'b');
  assert.ok(eventi.some(e => e.k === 'totemSpezzato' && e.totem === 'capanna' && e.rimasti === 2));
  assert.equal(stato.palude.sigilli.amuleto, AMULETO.MESSO);
});

test('cimitero: il dispositivo purifica se lo difendete, gli zombie vicini lo fanno arretrare', () => {
  const stato = palude();
  stato.corrente = false;
  metti(stato, davanti(acquisto('purificatore')));
  compra(stato, 'purificatore');
  assert.equal(stato.palude.sigilli.rituale, 0, 'senza corrente non parte');
  stato.corrente = true;
  const via = compra(stato, 'purificatore');
  assert.ok(via.some(e => e.k === 'rituale'));
  const eventi = avanza(stato, 6);
  assert.ok(eventi.some(e => e.k === 'tomba'), 'le tombe vomitano zombie');
  assert.ok(stato.zombie.some(z => z.tipo === 'magro') && stato.zombie.some(z => z.tipo === 'normale' && !z.corre), 'veloci e lenti');
  const prima = stato.palude.sigilli.progresso;
  assert.ok(prima > 0);
  stato.zombie = [];
  zombieA(stato, MISSIONE.PURIFICATORE.x, MISSIONE.PURIFICATORE.z - 1.5);
  avanza(stato, 1);
  assert.ok(stato.palude.sigilli.progresso < prima, 'assediato arretra');
  assert.ok(stato.palude.sigilli.assedio > 0);
  stato.zombie = [];
  stato.daGenerare = 0;
  avanza(stato, 3);
  assert.equal(stato.fase, 'gioco', 'il rituale tiene aperto il round');
  stato.zombie = [];
  stato.palude.sigilli.attesaTomba = 99;
  stato.palude.sigilli.progresso = 0.999;
  const fine = avanza(stato, 0.2);
  assert.ok(fine.some(e => e.k === 'totemSpezzato' && e.totem === 'cimitero'));
  assert.equal(stato.palude.sigilli.rituale, 2);
});

test('rapide: il generatore fa partire le valvole a tempo, i bruti e le scariche; se il tempo scade si ricomincia', () => {
  const stato = palude();
  metti(stato, davanti(acquisto('generatoreRapide')));
  compra(stato, 'generatoreRapide');
  assert.equal(stato.palude.sigilli.sequenza, 1);
  assert.equal(stato.zombie.filter(z => z.tipo === 'bruto').length, 1, 'arriva un bruto');
  metti(stato, davanti(acquisto('valvola-0')));
  compra(stato, 'valvola-0');
  assert.deepEqual(stato.palude.sigilli.valvole, [true, false, false]);
  assert.equal(stato.zombie.filter(z => z.tipo === 'bruto').length, 2);
  avanza(stato, 3);
  assert.ok(stato.palude.colpi.some(c => c.tipo === 'scarica'), 'l’acqua scarica vicino a chi sta nelle rapide');
  const scaduto = avanza(stato, 40);
  const scossa = scaduto.findIndex(e => e.k === 'scossa');
  assert.ok(scossa > 0);
  assert.equal(scaduto[scossa - 1].k, 'ferito', 'la scossa colpisce chi è nelle rapide');
  assert.equal(stato.palude.sigilli.sequenza, 0);
  assert.deepEqual(stato.palude.sigilli.valvole, [false, false, false]);
  metti(stato, davanti(acquisto('generatoreRapide')));
  compra(stato, 'generatoreRapide');
  assert.equal(stato.palude.sigilli.sequenza, 0, 'si riarma dopo qualche secondo');
  avanza(stato, 9);
  compra(stato, 'generatoreRapide');
  assert.equal(stato.palude.sigilli.sequenza, 1);
  let eventi = [];
  for (const i of [0, 1, 2]) {
    metti(stato, davanti(acquisto(`valvola-${i}`)));
    eventi = compra(stato, `valvola-${i}`);
  }
  assert.ok(eventi.some(e => e.k === 'totemSpezzato' && e.totem === 'rapide'));
  assert.equal(stato.palude.sigilli.sequenza, 2);
});

test('il bruto corazzato regge i colpi al corpo ma non la testa, il coltello e il Teschio', () => {
  const stato = palude();
  const bruto = zombieA(stato, 5, 60, { tipo: 'bruto', vita: 1000, vitaMax: 1000 });
  azione(stato, { tipo: 'colpo', zombie: bruto.id, danno: 100 });
  assert.equal(bruto.vita, 1000 - 100 * TIPI_ZOMBIE.bruto.corazza);
  azione(stato, { tipo: 'colpo', zombie: bruto.id, danno: 100, testa: true });
  assert.equal(bruto.vita, 1000 - 100 * TIPI_ZOMBIE.bruto.corazza - 100);
  metti(stato, { x: 5, z: 63 });
  azione(stato, { tipo: 'teschio', zombie: bruto.id });
  assert.equal(bruto.stato, 'morto', 'il Teschio lo fa implodere');
});

test('spezzare i totem fa arrivare zombi ragno e bruti nei round', () => {
  const stato = palude();
  assert.equal(pesiPalude(stato).ragno, 0);
  spezzaTotem(stato, 'capanna');
  assert.ok(pesiPalude(stato).ragno > 0);
  spezzaTotem(stato, 'rapide');
  assert.ok(pesiPalude(stato).bruto > 0);
});

function varcoAperto(giocatori) {
  const stato = palude(giocatori);
  for (const t of ['capanna', 'cimitero', 'rapide']) spezzaTotem(stato, t);
  stato.palude.tana.varco = VARCO.APERTO;
  return stato;
}

test('caduta la barriera: la membrana brucia col Teschio, poi si salta tutti insieme e si finisce nella tana', () => {
  const stato = palude([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  stato.palude.sigilli.amuleto = AMULETO.PRESO;
  stato.palude.sigilli.portatore = 'a';
  for (const t of ['cimitero', 'rapide']) spezzaTotem(stato, t);
  metti(stato, davanti(acquisto('totem-capanna')));
  const caduta = compra(stato, 'totem-capanna');
  assert.ok(caduta.some(e => e.k === 'barrieraCaduta'));
  assert.equal(stato.palude.tana.varco, VARCO.MEMBRANA);
  metti(stato, davanti(acquisto('varco')));
  compra(stato, 'varco');
  assert.equal(stato.palude.tana.varco, VARCO.APERTO);
  assert.equal(giocatore(stato).anime, R.TESCHIO_ANIME_MAX - 3);
  stato.zombie = [];
  zombieA(stato, 5, 60);
  compra(stato, 'varco');
  assert.equal(stato.fase, 'gioco', 'senza tutti radunati non si salta');
  metti(stato, vicinoA(davanti(acquisto('varco')), 1, 1), 'b');
  giocatore(stato, 'b').armi = [giocatore(stato, 'b').armi[0]];
  compra(stato, 'varco');
  assert.equal(stato.fase, 'gioco', 'ognuno deve avere il suo Teschio');
  giocatore(stato, 'b').armi.push('teschio');
  const tp = giocatore(stato).teletrasporto;
  const salto = compra(stato, 'varco');
  assert.ok(salto.some(e => e.k === 'finale' && e.mappa === 'palude'));
  assert.equal(stato.fase, 'finale');
  for (const g of stato.giocatori) assert.equal(zonaDi(g.x, g.z), 'tana');
  assert.equal(giocatore(stato).teletrasporto, tp + 1);
  assert.deepEqual(stato.zombie.map(z => z.tipo), ['arachne']);
  assert.match(obiettivo(espandi(JSON.parse(JSON.stringify(faiIstantanea(stato)))), 'a'), /Arachne/);
});

function nellaTana(giocatori) {
  const stato = varcoAperto(giocatori);
  for (const g of stato.giocatori) metti(stato, davanti(acquisto('varco')), g.id);
  compra(stato, 'varco');
  return stato;
}

const arachneDi = stato => stato.zombie.find(z => z.tipo === 'arachne');

test('fase 1: la seta la protegge finché un bozzolo non le esplode vicino; poi si arriva a metà vita', () => {
  const stato = nellaTana();
  const arachne = arachneDi(stato);
  const g = giocatore(stato);
  avanza(stato, 5);
  assert.equal(stato.palude.tana.azione, 'giro');
  const vita = arachne.vita;
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 1000 });
  assert.equal(arachne.vita, vita, 'la seta assorbe tutto');
  const i = MISSIONE.BOZZOLI.findIndex((b, k) => k === 0);
  Object.assign(arachne, { x: MISSIONE.BOZZOLI[i].x + 2, z: MISSIONE.BOZZOLI[i].z - 1 });
  metti(stato, vicinoA(MISSIONE.BOZZOLI[i], 6, -6));
  g.anime = R.TESCHIO_ANIME_MAX;
  const scoppio = azione(stato, { tipo: 'teschio', oggetto: `bozzolo-${i}` });
  assert.ok(scoppio.some(e => e.k === 'bozzolo' && e.stordita));
  assert.equal(stato.palude.tana.azione, 'stordita');
  assert.ok(!bersagliPalude(espandi(JSON.parse(JSON.stringify(faiIstantanea(stato))))).some(b => b.id === `bozzolo-${i}`), 'il bozzolo scoppiato non si mira più');
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 1000 });
  assert.ok(arachne.vita < vita);
  for (let k = 0; k < 60 && stato.palude.tana.fase === 1; k++) azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 2000 });
  assert.equal(arachne.vita, arachne.vitaMax / 2, 'non scende sotto metà prima della fase 2');
  assert.equal(stato.palude.tana.fase, 2);
});

test('fase 2: l’acqua uccide chi non sta sulle rocce; il ventre esposto prende il doppio', () => {
  const stato = nellaTana();
  const arachne = arachneDi(stato);
  arachne.faseBoss = 2;
  arachne.vita = arachne.vitaMax / 2;
  avanza(stato, 0.1);
  assert.equal(stato.palude.tana.fase, 2);
  const g = giocatore(stato);
  Object.assign(g, { vita: 200, vitaMax: 200 });
  const isola = MISSIONE.ISOLE[5];
  metti(stato, isola);
  avanza(stato, 8);
  assert.ok(stato.palude.tana.acqua > 0.9);
  const sulleIsole = g.vita;
  assert.ok(sulleRocce(g.x, g.z));
  metti(stato, { x: 7, z: -118 });
  assert.ok(!sulleRocce(g.x, g.z));
  const ferite = avanza(stato, 1.1).filter(e => e.k === 'ferito' && e.a === 'a').length;
  assert.ok(ferite >= 2, 'in acqua si muore');
  Object.assign(g, { vita: 1e9, vitaMax: 1e9 });
  stato.palude.tana.azione = 'attesa';
  stato.palude.tana.timer = 99;
  let vita = arachne.vita;
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 1000 });
  const corazza = vita - arachne.vita;
  Object.assign(stato.palude.tana, { azione: 'impennata', timer: 99 });
  vita = arachne.vita;
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 1000 });
  assert.ok(vita - arachne.vita > corazza * 4, 'impennata espone il ventre');
  assert.ok(sulleIsole > 0);
});

test('le ragnatele bloccano chi colpiscono per qualche secondo', () => {
  const stato = nellaTana();
  arachneDi(stato).faseBoss = 2;
  arachneDi(stato).vita = arachneDi(stato).vitaMax / 2;
  avanza(stato, 0.1);
  Object.assign(stato.palude.tana, { azione: 'attesa', timer: 99, tela: 0.01 });
  avanza(stato, 0.1);
  assert.ok(stato.palude.colpi.some(c => c.tipo === 'tela'));
  const eventi = avanza(stato, 1.2);
  assert.ok(eventi.some(e => e.k === 'invischiato' && e.a === 'a'));
  const vista = espandi(JSON.parse(JSON.stringify(faiIstantanea(stato))));
  assert.ok(invischiato(vista, 'a'));
  avanza(stato, 3);
  assert.ok(!invischiato(espandi(JSON.parse(JSON.stringify(faiIstantanea(stato)))), 'a'));
});

test('fase 3: solo il Teschio carico al massimo la ferisce; con l’ultimo colpo pieno la volta crolla e si vince', () => {
  const stato = nellaTana([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  const arachne = arachneDi(stato);
  arachne.faseBoss = 3;
  arachne.vita = arachne.vitaMax * 0.2;
  avanza(stato, 0.1);
  assert.equal(stato.palude.tana.fase, 3);
  assert.equal(stato.palude.tana.pieniServono, 2);
  avanza(stato, 3.5);
  assert.equal(stato.palude.tana.azione, 'soffitto');
  const vita = arachne.vita;
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 2000 });
  assert.equal(arachne.vita, vita, 'le armi normali non arrivano al soffitto');
  giocatore(stato).anime = R.TESCHIO_ANIME_MAX - 1;
  const scarico = azione(stato, { tipo: 'teschio', zombie: arachne.id });
  assert.ok(scarico.some(e => e.k === 'teschioScarico'));
  assert.equal(arachne.vita, vita);
  giocatore(stato).anime = R.TESCHIO_ANIME_MAX;
  azione(stato, { tipo: 'teschio', zombie: arachne.id });
  assert.equal(giocatore(stato).anime, 0);
  assert.ok(arachne.vita > 0 && arachne.vita < vita);
  giocatore(stato, 'b').anime = R.TESCHIO_ANIME_MAX;
  metti(stato, giocatore(stato), 'b');
  const ultimo = avanza(stato, R.PASSO, { azioni: [{ da: 'b', tipo: 'teschio', zombie: arachne.id }] });
  assert.equal(arachne.stato, 'morto');
  const crollo = [...ultimo, ...avanza(stato, 0.1)];
  assert.ok(crollo.some(e => e.k === 'crollo'));
  assert.equal(stato.palude.tana.fase, 4);
  assert.ok(stato.zombie.every(z => z.stato === 'morto'));
  const fine = avanza(stato, 8);
  assert.ok(fine.some(e => e.k === 'vittoria'));
  assert.equal(stato.fase, 'vinta');
});

test('istantanea e protocollo portano totem, tana, colpi, pozze e ragnatele', () => {
  const stato = nellaTana([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  stato.palude.colpi.push({ id: 99, tipo: 'acido', x: 1, z: -120, timer: 0.5, raggio: 2 });
  stato.palude.pozze.push({ id: 98, x: 2, z: -121, timer: 3, raggio: 1.7 });
  stato.palude.invischiati.b = 1.5;
  stato.palude.sigilli.valvole = [true, false, true];
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.notEqual(valida({ t: 'st', g: 1, ist }), null);
  assert.notEqual(valida({ t: 'az', a: { tipo: 'teschio', oggetto: 'bozzolo-2' } }), null);
  const vista = espandi(ist);
  assert.equal(vista.palude.tana.fase, 1);
  assert.equal(vista.palude.tana.azione, 'cala');
  assert.deepEqual(vista.palude.sigilli.valvole, [true, false, true]);
  assert.equal(vista.palude.colpi[0].tipo, 'acido');
  assert.equal(vista.palude.pozze[0].raggio, 1.7);
  assert.ok(invischiato(vista, 'b'));
  assert.ok(vista.palude.tana.bozzoli.every(Boolean));
  assert.ok(bersagliPalude(vista).some(b => b.id === 'bozzolo-0'));
  assert.ok(vitaZombie(stato.round) > 0);
});

test('chi va a terra con tre armi non perde mai il Teschio, e colpire la seta non dà punti', () => {
  const stato = nellaTana();
  const g = giocatore(stato);
  Object.assign(g, { vita: 10, vitaMax: 10, bevande: ['tasca'], armi: ['pistola', 'raffica', 'teschio'], armaAttiva: 'raffica' });
  const arachne = arachneDi(stato);
  Object.assign(arachne, { x: g.x, z: g.z - 1 });
  Object.assign(stato.palude.tana, { azione: 'giro', timer: 0, morso: 0 });
  avanza(stato, 0.2);
  assert.equal(g.stato, 'terra');
  assert.ok(g.armi.includes('teschio'), 'il Teschio resta in mano');
  assert.equal(g.armi.length, 2);
  Object.assign(g, { stato: 'vivo', vita: 1e9, vitaMax: 1e9 });
  const punti = g.punti;
  azione(stato, { tipo: 'colpo', zombie: arachne.id, danno: 500 });
  assert.equal(g.punti, punti);
});
