import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, ARMI_CASSA } from '../src/regole.js';
import { ZONE, FINESTRE, PORTE, ACQUISTI, OSTACOLI, PARTENZE, PARTENZE_SALA, LIMITI, usaMappa, zonaDi, ostacoliPerGiocatori } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { faiIstantanea, espandi } from '../src/istantanea.js';
import { valida } from '../src/rete/protocollo.js';
import { griglia, campoVerso, distanzaCampo } from '../src/navigazione.js';
import { dentroScatola } from '../src/fisica.js';
import { interazioneVicina } from '../src/interazioni.js';
import { GRATA_LABORATORIO, RADICI } from '../src/palude.js';
import { MISSIONE } from '../src/mappe/palude.js';

const PASSO_FUGA = 0.25;

function avanza(stato, secondi, ingressi = {}) {
  const eventi = [];
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) eventi.push(...passo(stato, R.PASSO, ingressi));
  return eventi;
}

const compra = (stato, acquisto, da = 'a') => avanza(stato, R.PASSO, { azioni: [{ da, tipo: 'compra', acquisto }] });
const acquisto = id => ACQUISTI.find(a => a.id === id);
const davanti = a => ({ x: a.posizione.x + a.verso.x * 0.9, z: a.posizione.z + a.verso.z * 0.9 });
const tutteLePorte = () => new Set(PORTE.map(p => p.id));

function palude({ giocatori = [{ id: 'a', nome: 'A' }], seme = 3 } = {}) {
  const stato = creaPartita({ seme, giocatori, mappa: 'palude' });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.1);
  Object.assign(stato, { zombie: [], daGenerare: 999, attesaComparsa: 9999 });
  for (const g of stato.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  return stato;
}

function metti(stato, punto, id = 'a') {
  Object.assign(stato.giocatori.find(g => g.id === id), { x: punto.x, z: punto.z });
}

test('la palude si sceglie per nome e parte dall’imbarcadero', () => {
  const stato = creaPartita({ seme: 1, mappa: 'palude', giocatori: [{ id: 'a', nome: 'A' }] });
  assert.equal(stato.mappa, 'palude');
  for (const p of PARTENZE) assert.equal(zonaDi(p.x, p.z), 'imbarcadero');
  for (const p of PARTENZE_SALA) assert.equal(zonaDi(p.x, p.z), 'sala');
});

test('la palude è grande e tutta collegata: con ogni porta aperta si arriva ovunque dall’imbarcadero', () => {
  usaMappa('palude');
  const campo = campoVerso(griglia(tutteLePorte()), [PARTENZE[0]]);
  const tana = campoVerso(griglia(tutteLePorte()), [MISSIONE.PARTENZE_TANA[0]]);
  for (const z of ZONE.filter(q => !q.sala)) {
    assert.ok(z.x0 >= LIMITI.x0 && z.x1 <= LIMITI.x1 && z.z0 >= LIMITI.z0 && z.z1 <= LIMITI.z1, `${z.id} fuori dai limiti`);
    const punti = [];
    for (let i = 1; i < 4; i++) for (let j = 1; j < 4; j++) punti.push([z.x0 + ((z.x1 - z.x0) * i) / 4, z.z0 + ((z.z1 - z.z0) * j) / 4]);
    assert.ok(punti.some(([x, q]) => Number.isFinite(distanzaCampo(z.grotta ? tana : campo, x, q))), `${z.id} irraggiungibile`);
    if (z.grotta) assert.ok(punti.every(([x, q]) => !Number.isFinite(distanzaCampo(campo, x, q))), 'la tana si raggiunge solo dal varco');
  }
  const area = ZONE.filter(q => !q.sala).reduce((s, z) => s + (z.x1 - z.x0) * (z.z1 - z.z0), 0);
  assert.ok(area > 9000, `area ${area}`);
});

test('ogni punto da cui escono gli zombie è nella sua zona, libero e raggiungibile', () => {
  usaMappa('palude');
  const porte = tutteLePorte();
  const campo = campoVerso(griglia(porte), [PARTENZE[0]]);
  const tana = campoVerso(griglia(porte), [MISSIONE.PARTENZE_TANA[0]]);
  const ostacoli = ostacoliPerGiocatori(porte);
  for (const f of FINESTRE) {
    assert.equal(zonaDi(f.interno.x, f.interno.z), f.zona, `interno di ${f.id}`);
    assert.ok(Number.isFinite(distanzaCampo(f.zona === 'tana' ? tana : campo, f.interno.x, f.interno.z)), `${f.id} murata`);
    assert.ok(!ostacoli.filter(s => s !== f.scatola).some(s => dentroScatola(f.interno.x, f.interno.z, s, 0.2)), `${f.id} dentro un ostacolo`);
    if (f.tana) continue;
    assert.equal(zonaDi(f.esterno.x, f.esterno.z), null, `esterno di ${f.id}`);
    assert.equal(zonaDi(f.comparsa.x, f.comparsa.z), null, `comparsa di ${f.id}`);
  }
});

test('ogni acquisto sta nella sua zona e davanti ha spazio libero', () => {
  usaMappa('palude');
  const ostacoli = ostacoliPerGiocatori(tutteLePorte());
  for (const a of ACQUISTI) {
    assert.equal(zonaDi(a.posizione.x, a.posizione.z), a.zona, a.id);
    const p = davanti(a);
    assert.equal(zonaDi(p.x, p.z), a.zona, `davanti a ${a.id}`);
    assert.ok(!ostacoli.some(s => dentroScatola(p.x, p.z, s)), `davanti a ${a.id} c'è un ostacolo`);
  }
});

test('nessuno può uscire dalla mappa: camminando ovunque si resta sempre dentro una zona', () => {
  usaMappa('palude');
  const ostacoli = ostacoliPerGiocatori(tutteLePorte());
  const x0 = LIMITI.x0 - 8;
  const z0 = LIMITI.z0 - 8;
  const colonne = Math.ceil((LIMITI.x1 + 8 - x0) / PASSO_FUGA);
  const righe = Math.ceil((LIMITI.z1 + 8 - z0) / PASSO_FUGA);
  const bloccata = new Uint8Array(colonne * righe);
  for (const s of ostacoli) {
    const c0 = Math.max(0, Math.floor((s.x0 - R.RAGGIO_GIOCATORE - x0) / PASSO_FUGA));
    const c1 = Math.min(colonne - 1, Math.ceil((s.x1 + R.RAGGIO_GIOCATORE - x0) / PASSO_FUGA));
    const r0 = Math.max(0, Math.floor((s.z0 - R.RAGGIO_GIOCATORE - z0) / PASSO_FUGA));
    const r1 = Math.min(righe - 1, Math.ceil((s.z1 + R.RAGGIO_GIOCATORE - z0) / PASSO_FUGA));
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) if (dentroScatola(x0 + c * PASSO_FUGA, z0 + r * PASSO_FUGA, s, R.RAGGIO_GIOCATORE - 0.02)) bloccata[r * colonne + c] = 1;
  }
  const visti = new Uint8Array(colonne * righe);
  const inizio = Math.round((PARTENZE[0].z - z0) / PASSO_FUGA) * colonne + Math.round((PARTENZE[0].x - x0) / PASSO_FUGA);
  const coda = [inizio];
  visti[inizio] = 1;
  for (let testa = 0; testa < coda.length; testa++) {
    const i = coda[testa];
    const c = i % colonne;
    const r = (i - c) / colonne;
    const x = x0 + c * PASSO_FUGA;
    const z = z0 + r * PASSO_FUGA;
    assert.ok(zonaDi(x, z) !== null, `si esce dalla mappa vicino a ${x.toFixed(2)}, ${z.toFixed(2)}`);
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= colonne || nr >= righe) continue;
      const j = nr * colonne + nc;
      if (visti[j] || bloccata[j]) continue;
      visti[j] = 1;
      coda.push(j);
    }
  }
});

test('nella palude gli zombie escono dall’acqua e dalle finestre delle baracche', () => {
  const stato = palude();
  stato.porte.push(...PORTE.filter(p => !p.chiusa).map(p => p.id));
  const origini = new Set();
  for (let i = 0; i < 40; i++) {
    Object.assign(stato, { zombie: [], attesaComparsa: 0, daGenerare: 99 });
    passo(stato, R.PASSO);
    const z = stato.zombie[0];
    origini.add(FINESTRE.find(f => f.id === z.finestra).tana ? `acqua:${z.stato}` : `finestra:${z.stato}`);
  }
  assert.ok(origini.has('acqua:emerge') && origini.has('finestra:arriva'), [...origini].join());
});

test('la cassa di munizioni ricarica l’arma in mano: 1000 punti, 2500 se potenziata', () => {
  const stato = palude();
  const g = stato.giocatori[0];
  stato.porte.push('pCanneto');
  const cassa = acquisto('munizioni-2');
  metti(stato, davanti(cassa));
  const prima = g.punti;
  const eventi = compra(stato, cassa.id);
  assert.equal(prima - g.punti, R.COSTO_MUNIZIONI);
  assert.ok(eventi.some(e => e.k === 'munizioni' && e.arma === g.armaAttiva));
  g.armi = ['pistola+'];
  g.armaAttiva = 'pistola+';
  const dopo = g.punti;
  compra(stato, cassa.id);
  assert.equal(dopo - g.punti, R.COSTO_MUNIZIONI_POTENZIATE);
  const vista = espandi(faiIstantanea(stato));
  const io = { id: 'a', ...davanti(cassa), armi: g.armi, bevande: [], armaAttiva: g.armaAttiva };
  assert.match(interazioneVicina(io, vista).testo, /munizioni.*2500/);
});

test('il motore della segheria accende la corrente e apre la grata del laboratorio; le radici restano chiuse', () => {
  const stato = palude();
  stato.porte.push('pCanneto', 'pSegheria');
  assert.ok(!stato.porte.includes(GRATA_LABORATORIO));
  metti(stato, { x: 0, z: -1 });
  compra(stato, `porta:${GRATA_LABORATORIO}`);
  assert.ok(!stato.porte.includes(GRATA_LABORATORIO), 'la grata non si compra');
  const motore = acquisto('motoreSegheria');
  metti(stato, davanti(motore));
  const eventi = compra(stato, motore.id);
  assert.ok(stato.corrente);
  assert.ok(stato.porte.includes(GRATA_LABORATORIO));
  assert.ok(eventi.some(e => e.k === 'corrente') && eventi.some(e => e.k === 'porta'));
  metti(stato, { x: -46, z: -21 });
  compra(stato, 'porta:pRadici');
  assert.ok(!stato.porte.includes('pRadici'));
});

test('istantanea e protocollo funzionano sulla palude', () => {
  const stato = palude({ giocatori: [{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }] });
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.equal(valida({ t: 'st', g: 3, ist }) !== null, true);
  assert.equal(espandi(ist).mappa, 'palude');
});

const zombieA = (stato, x, z, extra = {}) => {
  const zombie = { id: 7000 + stato.zombie.length, x, z, yaw: 0, stato: 'dentro', finestra: FINESTRE[0].id, vita: 100, vitaMax: 100, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null, ...extra };
  stato.zombie.push(zombie);
  return zombie;
};
const uccidi = (stato, zombie, da = 'a') => avanza(stato, R.PASSO, { azioni: [{ da, tipo: 'colpo', zombie: zombie.id, danno: 9999 }] });

function laboratorioAperto(giocatori) {
  const stato = palude({ giocatori });
  stato.porte.push('pCanneto', 'pSegheria');
  metti(stato, davanti(acquisto('motoreSegheria')));
  compra(stato, 'motoreSegheria');
  return stato;
}

test('altare: contano solo le uccisioni vicine, con la corrente; a trenta anime il Teschio si può prendere', () => {
  const stato = laboratorioAperto();
  const altare = OSTACOLI.find(o => o.tipo === 'altare');
  const centro = { x: (altare.x0 + altare.x1) / 2, z: (altare.z0 + altare.z1) / 2 };
  uccidi(stato, zombieA(stato, centro.x + R.RAGGIO_ALTARE + 2, centro.z));
  assert.equal(stato.palude.altare, 0, 'lontano non conta');
  metti(stato, davanti(acquisto('altareTeschio')));
  compra(stato, 'altareTeschio');
  assert.ok(!stato.giocatori[0].armi.includes('teschio'), 'prima delle trenta anime non si prende');
  let pronto = false;
  for (let i = 0; i < R.ANIME_ALTARE; i++) pronto ||= uccidi(stato, zombieA(stato, centro.x + 1, centro.z + 1.5)).some(e => e.k === 'altarePronto');
  assert.equal(stato.palude.altare, R.ANIME_ALTARE);
  assert.ok(pronto);
  compra(stato, 'altareTeschio');
  const g = stato.giocatori[0];
  assert.equal(g.armaAttiva, 'teschio');
  assert.equal(g.anime, R.TESCHIO_ANIME_INIZIALI);
});

function conTeschio(giocatori) {
  const stato = laboratorioAperto(giocatori);
  stato.palude.altare = R.ANIME_ALTARE;
  for (const g of stato.giocatori) {
    metti(stato, davanti(acquisto('altareTeschio')), g.id);
    compra(stato, 'altareTeschio', g.id);
  }
  return stato;
}

test('ogni giocatore prende il suo Teschio, una volta sola', () => {
  const stato = conTeschio([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  for (const g of stato.giocatori) assert.deepEqual(g.armi.filter(a => a === 'teschio'), ['teschio'], g.id);
  compra(stato, 'altareTeschio', 'a');
  assert.equal(stato.giocatori[0].armi.filter(a => a === 'teschio').length, 1);
  assert.ok(!ARMI_CASSA.includes('teschio'), 'il Teschio non esce dalla cassa');
});

test('riprendere il Teschio dall’altare non ricarica le anime', () => {
  const stato = conTeschio([{ id: 'a', nome: 'A' }]);
  const g = stato.giocatori[0];
  Object.assign(g, { anime: 1, armi: g.armi.filter(a => a !== 'teschio'), armaAttiva: g.armi.find(a => a !== 'teschio') });
  compra(stato, 'altareTeschio');
  assert.equal(g.armaAttiva, 'teschio');
  assert.equal(g.anime, 1);
});

test('una porta aperta mentre il percorso si calcola entra subito nel percorso degli zombie', () => {
  const stato = palude();
  const oltre = { x: -46, z: -24 };
  stato.porte.push(...PORTE.filter(p => p.id !== RADICI).map(p => p.id));
  avanza(stato, 1);
  for (let i = 0; i < 60 && !stato.calcoloCampo; i++) avanza(stato, R.PASSO);
  assert.ok(stato.calcoloCampo, 'nessun calcolo in corso');
  const prima = distanzaCampo(stato.campo, oltre.x, oltre.z);
  assert.ok(Number.isFinite(prima));
  stato.porte.push(RADICI);
  let passi = 0;
  for (; passi < 60 && distanzaCampo(stato.campo, oltre.x, oltre.z) >= prima; passi++) avanza(stato, R.PASSO);
  assert.ok(passi * R.PASSO < 0.2, `percorso aggiornato dopo ${passi} passi`);
});

test('implosione: costa tre anime, uccide il bersaglio e ferisce chi gli sta intorno; le uccisioni ridanno anime', () => {
  const stato = conTeschio();
  const g = stato.giocatori[0];
  stato.round = 5;
  const bersaglio = zombieA(stato, g.x, g.z - 10, { vita: 5000, vitaMax: 5000 });
  const vicino = zombieA(stato, g.x + 1.5, g.z - 10, { vita: 300, vitaMax: 300 });
  const lontano = zombieA(stato, g.x + 8, g.z - 10, { vita: 300, vitaMax: 300 });
  const eventi = avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'teschio', zombie: bersaglio.id }] });
  assert.ok(eventi.some(e => e.k === 'implosioneTeschio'));
  assert.equal(bersaglio.stato, 'morto');
  assert.equal(vicino.stato, 'morto');
  assert.equal(lontano.stato, 'dentro');
  assert.equal(g.anime, R.TESCHIO_ANIME_INIZIALI - R.TESCHIO_COSTO + 2);
  g.anime = 2;
  const altro = zombieA(stato, g.x, g.z - 5);
  avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'teschio', zombie: altro.id }] });
  assert.equal(altro.stato, 'dentro', 'senza anime non implode');
  g.anime = R.TESCHIO_ANIME_MAX;
  uccidi(stato, altro);
  assert.equal(g.anime, R.TESCHIO_ANIME_MAX, 'le anime hanno un massimo');
});

test('le radici bruciano solo col Teschio in mano e tre anime; munizioni e potenziatore non toccano il Teschio', () => {
  const stato = conTeschio();
  const g = stato.giocatori[0];
  const radici = acquisto('radiciSciamano');
  metti(stato, davanti(radici));
  g.armaAttiva = g.armi.find(a => a !== 'teschio');
  compra(stato, radici.id);
  assert.ok(!stato.porte.includes('pRadici'), 'senza Teschio in mano non bruciano');
  g.armaAttiva = 'teschio';
  const eventi = compra(stato, radici.id);
  assert.ok(stato.porte.includes('pRadici'));
  assert.ok(eventi.some(e => e.k === 'radiciBruciate'));
  assert.equal(g.anime, R.TESCHIO_ANIME_INIZIALI - R.TESCHIO_COSTO_RADICI);
  const cassa = acquisto('munizioni-7');
  metti(stato, davanti(cassa));
  const punti = g.punti;
  compra(stato, cassa.id);
  assert.equal(g.punti, punti, 'la cassa di munizioni non vende anime');
  stato.porte.push('pDistilleriaPonte', 'pTorre');
  metti(stato, davanti(acquisto('potenziatore')));
  compra(stato, 'potenziatore');
  assert.equal(stato.potenziatore.stato, 'libero');
});

test('istantanea e protocollo portano anime, altare e colpo del Teschio', () => {
  const stato = conTeschio();
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.notEqual(valida({ t: 'st', g: 3, ist }), null);
  const vista = espandi(ist);
  assert.equal(vista.palude.altare, R.ANIME_ALTARE);
  assert.equal(vista.giocatori[0].anime, R.TESCHIO_ANIME_INIZIALI);
  assert.notEqual(valida({ t: 'az', a: { tipo: 'teschio', zombie: 3 } }), null);
  assert.equal(valida({ t: 'az', a: { tipo: 'teschio', zombie: 'tutti' } }), null);
});

const tutteAperte = stato => stato.porte.push(...PORTE.filter(p => !p.chiusa && !stato.porte.includes(p.id)).map(p => p.id));
const scegli = (stato, elemento, id = 'a') => {
  metti(stato, davanti(acquisto(`santuario-${elemento}`)), id);
  return compra(stato, `santuario-${elemento}`, id);
};

test('elementi: uno a testa e nessuno lo sceglie due volte', () => {
  const stato = conTeschio([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  tutteAperte(stato);
  assert.ok(scegli(stato, 'fuoco', 'a').some(e => e.k === 'elementoScelto'));
  scegli(stato, 'fuoco', 'b');
  assert.equal(stato.palude.elementi.fuoco.da, 'a', 'il fuoco resta di chi lo ha preso');
  scegli(stato, 'ghiaccio', 'a');
  assert.equal(stato.palude.elementi.ghiaccio.da, '', 'chi ha un elemento non ne prende un altro');
  scegli(stato, 'ghiaccio', 'b');
  assert.equal(stato.palude.elementi.ghiaccio.da, 'b');
});

test('prova del fuoco: tre bracieri col Teschio, quindici uccisioni vicino ai bracieri, poi l’infusione', () => {
  const stato = conTeschio();
  tutteAperte(stato);
  const g = stato.giocatori[0];
  scegli(stato, 'fuoco');
  for (let i = 0; i < 3; i++) {
    g.anime = R.TESCHIO_ANIME_MAX;
    const braciere = acquisto(`prova-fuoco-${i}`);
    metti(stato, davanti(braciere));
    compra(stato, braciere.id);
  }
  const el = stato.palude.elementi.fuoco;
  assert.deepEqual(el.oggetti, [true, true, true]);
  assert.equal(el.passo, 1);
  const braciere = acquisto('prova-fuoco-1').posizione;
  uccidi(stato, zombieA(stato, braciere.x + 12, braciere.z + 1));
  assert.equal(el.contatore, 0, 'lontano dai bracieri non conta');
  for (let i = 0; i < R.ELEMENTO_UCCISIONI; i++) uccidi(stato, zombieA(stato, braciere.x + 2, braciere.z + 1));
  assert.equal(el.passo, 2);
  g.armaAttiva = 'teschio';
  const eventi = scegli(stato, 'fuoco');
  assert.ok(eventi.some(e => e.k === 'elementoInfuso'));
  assert.equal(g.armaAttiva, 'teschioFuoco');
  assert.ok(g.armi.includes('teschioFuoco') && !g.armi.includes('teschio'));
});

test('le altre prove contano le uccisioni giuste: laboratorio, mausoleo, passerelle', () => {
  const stato = conTeschio([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }, { id: 'c', nome: 'C' }]);
  tutteAperte(stato);
  scegli(stato, 'ghiaccio', 'a');
  scegli(stato, 'vuoto', 'b');
  scegli(stato, 'vento', 'c');
  for (const e of ['ghiaccio', 'vuoto', 'vento']) Object.assign(stato.palude.elementi[e], { passo: 1, oggetti: [true, true, true] });
  metti(stato, { x: -35, z: 0 }, 'a');
  uccidi(stato, zombieA(stato, -36, -2), 'a');
  uccidi(stato, zombieA(stato, 0, 10), 'a');
  assert.equal(stato.palude.elementi.ghiaccio.contatore, 1);
  uccidi(stato, zombieA(stato, -50, 43), 'b');
  uccidi(stato, zombieA(stato, -64, 30), 'b');
  assert.equal(stato.palude.elementi.vuoto.contatore, 1);
  metti(stato, { x: 0, z: 30 }, 'c');
  uccidi(stato, zombieA(stato, 0, 26), 'c');
  metti(stato, { x: 0, z: 10 }, 'c');
  uccidi(stato, zombieA(stato, 2, 12), 'c');
  assert.equal(stato.palude.elementi.vento.contatore, 1);
});

function elementale(elemento) {
  const stato = conTeschio();
  tutteAperte(stato);
  scegli(stato, elemento);
  Object.assign(stato.palude.elementi[elemento], { passo: 2, oggetti: [true, true, true] });
  stato.giocatori[0].armaAttiva = 'teschio';
  scegli(stato, elemento);
  Object.assign(stato.giocatori[0], { anime: R.TESCHIO_ANIME_MAX, x: 0, z: 10 });
  stato.round = 4;
  return stato;
}
const colpisciTeschio = (stato, zombie) => avanza(stato, R.PASSO, { azioni: [{ da: 'a', tipo: 'teschio', zombie: zombie.id }] });

test('Ghiaccio: congela chi sta intorno, poi le statue si frantumano', () => {
  const stato = elementale('ghiaccio');
  const bersaglio = zombieA(stato, 0, 2);
  const vicini = [zombieA(stato, 2, 2, { vita: 9000, vitaMax: 9000 }), zombieA(stato, -2, 3, { vita: 9000, vitaMax: 9000 })];
  colpisciTeschio(stato, bersaglio);
  assert.equal(bersaglio.stato, 'morto');
  for (const z of vicini) assert.ok(z.gelato > 0, 'congelato');
  avanza(stato, R.GELO_DURATA + 0.2);
  for (const z of vicini) assert.equal(z.stato, 'morto', 'la statua si frantuma');
});

test('Fuoco: incendia il gruppo, brucia nel tempo e lascia una chiazza che si spegne', () => {
  const stato = elementale('fuoco');
  const bersaglio = zombieA(stato, 0, 2);
  const vicino = zombieA(stato, 2, 2, { vita: 900, vitaMax: 900 });
  colpisciTeschio(stato, bersaglio);
  assert.ok(vicino.ardore > 0);
  assert.equal(stato.palude.fuochi.length, 1);
  const vita = vicino.vita;
  avanza(stato, 1);
  assert.ok(vicino.vita < vita || vicino.stato === 'morto', 'il fuoco brucia');
  avanza(stato, R.FUOCO_CHIAZZA);
  assert.equal(stato.palude.fuochi.length, 0);
});

test('Vuoto: apre un buco nero che risucchia e implode', () => {
  const stato = elementale('vuoto');
  const bersaglio = zombieA(stato, 0, 2);
  const lontano = zombieA(stato, 5, 2, { vita: 50, vitaMax: 50 });
  colpisciTeschio(stato, bersaglio);
  assert.equal(stato.buchi.length, 1);
  assert.equal(stato.buchi[0].raggio, R.VUOTO_RAGGIO);
  avanza(stato, R.BUCO_DURATA + 0.2);
  assert.equal(lontano.stato, 'morto');
});

test('Vento: l’onda d’urto scaraventa via e stordisce', () => {
  const stato = elementale('vento');
  const bersaglio = zombieA(stato, 0, 12);
  const vicino = zombieA(stato, 1, 12, { vita: 9000, vitaMax: 9000 });
  colpisciTeschio(stato, bersaglio);
  const spinta = Math.hypot(vicino.x, vicino.z - 12);
  assert.ok(spinta >= 3, `spinto solo a ${spinta.toFixed(2)}`);
  assert.ok(vicino.scossa > 0);
});

test('chi muore ritrova all’altare il suo Teschio elementale; chi esce libera l’elemento', () => {
  const stato = elementale('vento');
  const g = stato.giocatori[0];
  g.armi = ['pistola'];
  g.armaAttiva = 'pistola';
  metti(stato, davanti(acquisto('altareTeschio')));
  compra(stato, 'altareTeschio');
  assert.equal(g.armaAttiva, 'teschioVento');
  const coppia = conTeschio([{ id: 'a', nome: 'A' }, { id: 'b', nome: 'B' }]);
  tutteAperte(coppia);
  scegli(coppia, 'vuoto', 'b');
  coppia.giocatori = coppia.giocatori.filter(q => q.id !== 'b');
  avanza(coppia, R.PASSO);
  assert.equal(coppia.palude.elementi.vuoto.da, '');
});

test('istantanea e protocollo portano elementi, fuochi e zombie in fiamme', () => {
  const stato = elementale('fuoco');
  colpisciTeschio(stato, zombieA(stato, 0, 2));
  zombieA(stato, 30, 30, { ardore: 2 });
  const ist = JSON.parse(JSON.stringify(faiIstantanea(stato)));
  assert.notEqual(valida({ t: 'st', g: 3, ist }), null);
  const vista = espandi(ist);
  assert.equal(vista.palude.elementi.fuoco.da, 'a');
  assert.equal(vista.palude.elementi.fuoco.passo, 3);
  assert.equal(vista.palude.fuochi.length, 1);
  assert.ok(vista.palude.ardenti.length >= 1);
});
