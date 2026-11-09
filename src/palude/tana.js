import { R, ARMI, moltiplicatoreBoss, vitaZombie } from '../regole.js';
import { MISSIONE } from '../mappe/palude.js';
import { zonaDi } from '../mappa.js';
import { aggiungiColpo, svuotaColpi } from './colpi.js';

export const AZIONI = Object.freeze(['', 'cala', 'giro', 'stordita', 'urlo', 'attesa', 'scatto', 'impennata', 'sale', 'soffitto', 'crollo']);
export const VARCO = Object.freeze({ BARRIERA: 0, MEMBRANA: 1, APERTO: 2 });
export const COSTO_MEMBRANA = 3;
export const RAGGIO_SALTO = 12;
export const DURATA_CALA = 4.5;
export const DURATA_SALITA = 3;

const VITA_ARACHNE = 45000;
const VELOCITA_GIRO = 2.4;
const VELOCITA_SCATTO = 10;
const VELOCITA_SALITA = 6;
const ARRIVO = 0.5;
const STORDITA = 3.5;
const VULNERABILE = 12;
const RICRESCITA_BOZZOLO = 30;
const RAGGIO_BOZZOLO = 5.5;
const DANNO_BOZZOLO = 2.5;
const PORTATA_MORSO = 2.8;
const DANNO_MORSO = 50;
const MORSO_OGNI = 1.8;
const SPUTO_OGNI = 5;
const PREAVVISO_SPUTO = 1.1;
const RAGGIO_SPUTO = 2;
const ONDATA_OGNI = 9;
const RAGNI_MAX = 14;
const ORDA_SUBITO = 8;
const ORDA_MAX = 18;
const ORDA_OGNI = 1.3;
const QUOTA_RAGNI_ORDA = 0.6;
const DURATA_URLO = 3.5;
const ATTESA_SCATTO = 1.2;
const IMPENNATA = 2.8;
const FERMATE_PER_IMPENNATA = 3;
const RAGGIO_SCHIANTO = 6;
const DANNO_SCHIANTO = 55;
const RAGGIO_SCATTO = 1.8;
const DANNO_SCATTO = 45;
const DISTANZA_SCATTO_MINIMA = 6;
const TELA_OGNI = 6;
const PREAVVISO_TELA = 1;
const RAGGIO_TELA = 1.6;
const PIOGGIA_OGNI = 2.4;
const PREAVVISO_PIOGGIA = 1.3;
const RAGGIO_PIOGGIA = 1.8;
const SCARTO_PIOGGIA = 1.5;
const ALLAGA_IN = 4;
const ACQUA_LETALE = 0.6;
const DANNO_ACQUA = 11;
const OGNI_ACQUA = 0.5;
const CORAZZA_FASE_2 = 0.35;
const ESPOSTA = 2;
const SOGLIE = Object.freeze({ 1: 0.5, 2: 0.2, 3: 0 });
const OUTRO = 7;
const FERMA = new Set(['cala', 'stordita', 'urlo', 'attesa', 'impennata', 'soffitto']);
const RESTA_A_TERRA = 4;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const nellaTana = g => zonaDi(g.x, g.z) === 'tana';
export const haTeschio = g => g.armi.some(a => ARMI[a]?.teschio);

export function statoTana() {
  return {
    varco: VARCO.BARRIERA, fase: 0, azione: '', timer: 0, vulnerabile: 0, bozzoli: Array(MISSIONE.BOZZOLI.length).fill(0),
    tappa: 0, meta: null, fermate: 0, colpitiScatto: [], acqua: 0, annega: OGNI_ACQUA, morso: 0, sputo: 0, tela: 0, pioggia: 0, ondata: 0, orda: 0,
    pieno: 0, pieniFatti: 0, pieniServono: 0, outro: 0, ultimo: { x: MISSIONE.ARENA.x, z: MISSIONE.ARENA.z },
  };
}

export function sulleRocce(x, z) {
  if (MISSIONE.ISOLE.some(i => Math.hypot(x - i.x, z - i.z) <= i.raggio)) return true;
  return MISSIONE.PONTI.some(({ da, a, largo }) => {
    const vx = a.x - da.x;
    const vz = a.z - da.z;
    const t = Math.max(0, Math.min(1, ((x - da.x) * vx + (z - da.z) * vz) / (vx * vx + vz * vz)));
    return Math.hypot(x - (da.x + vx * t), z - (da.z + vz * t)) <= largo;
  });
}

export function prontiAlSalto(vista) {
  const inPiedi = vista.giocatori.filter(g => g.stato !== 'morto');
  return inPiedi.length > 0 && inPiedi.every(g => g.stato === 'vivo' && distanza(g, MISSIONE.BARRIERA) <= RAGGIO_SALTO && haTeschio(g));
}

function iniziaFinale(stato, eventi) {
  const tana = stato.palude.tana;
  Object.assign(stato, { fase: 'finale', daGenerare: 0, zombie: [], granate: [], proiettili: [], buchi: [], finale: { tempo: 0 } });
  stato.giocatori.forEach((g, i) => {
    const p = MISSIONE.PARTENZE_TANA[i % MISSIONE.PARTENZE_TANA.length];
    Object.assign(g, { x: p.x, z: p.z, yaw: Math.PI, teletrasporto: g.teletrasporto + 1 });
  });
  const vita = Math.round(VITA_ARACHNE * moltiplicatoreBoss(stato.giocatori.length));
  stato.zombie.push({
    id: stato.prossimoId++, x: MISSIONE.ARENA.x, z: MISSIONE.ARENA.z, yaw: 0, stato: 'dentro', finestra: MISSIONE.TANE_ARENA[0],
    vita, vitaMax: vita, tipo: 'arachne', corre: false, variante: 0, timer: 0, attesa: 0, bersaglio: null, trattenuto: Infinity, faseBoss: 1,
  });
  Object.assign(tana, {
    fase: 1, azione: 'cala', timer: DURATA_CALA, vulnerabile: 0, bozzoli: tana.bozzoli.map(() => 0), tappa: 0, meta: null, fermate: 0,
    acqua: 0, morso: 0, sputo: DURATA_CALA + SPUTO_OGNI, ondata: DURATA_CALA, tela: TELA_OGNI, pioggia: PIOGGIA_OGNI, orda: 0,
  });
  stato.palude.fuochi = [];
  svuotaColpi(stato.palude);
  eventi.push({ k: 'finale', mappa: 'palude' });
}

export function compraVarco(stato, giocatore, eventi) {
  const tana = stato.palude.tana;
  if (tana.varco === VARCO.MEMBRANA) {
    if (!ARMI[giocatore.armaAttiva]?.teschio || (giocatore.anime ?? 0) < COSTO_MEMBRANA) return;
    giocatore.anime -= COSTO_MEMBRANA;
    tana.varco = VARCO.APERTO;
    eventi.push({ k: 'membranaBruciata', da: giocatore.id });
    return;
  }
  if (tana.varco !== VARCO.APERTO || tana.fase !== 0 || (stato.fase !== 'gioco' && stato.fase !== 'intervallo')) return;
  if (prontiAlSalto(stato)) iniziaFinale(stato, eventi);
}

export function colpisciBozzolo(stato, giocatore, indice, eventi, S) {
  const tana = stato.palude.tana;
  if (tana.fase < 1 || tana.fase > 3 || tana.bozzoli[indice] !== 0) return false;
  tana.bozzoli[indice] = RICRESCITA_BOZZOLO;
  const b = MISSIONE.BOZZOLI[indice];
  const arachne = stato.zombie.find(z => z.tipo === 'arachne' && z.stato !== 'morto');
  const stordita = !!arachne && tana.fase === 1 && tana.azione !== 'cala' && distanza(arachne, b) <= RAGGIO_BOZZOLO;
  if (stordita) Object.assign(tana, { vulnerabile: VULNERABILE, azione: 'stordita', timer: STORDITA });
  const base = vitaZombie(Math.max(1, stato.round)) * DANNO_BOZZOLO;
  for (const z of stato.zombie) {
    if (z.stato === 'morto' || z === arachne || distanza(z, b) > RAGGIO_BOZZOLO) continue;
    S.ferisciZombie(stato, giocatore, z, Math.round(base), {}, eventi);
  }
  eventi.push({ k: 'bozzolo', da: giocatore.id, indice, x: b.x, z: b.z, stordita });
  return true;
}

export function colpoSulSoffitto(stato, giocatore, arachne, eventi, S) {
  const tana = stato.palude.tana;
  if (tana.azione === 'sale') return;
  if ((giocatore.anime ?? 0) < R.TESCHIO_ANIME_MAX) {
    eventi.push({ k: 'teschioScarico', a: giocatore.id });
    return;
  }
  giocatore.anime = 0;
  tana.pieniFatti += 1;
  eventi.push({ k: 'colpoPieno', da: giocatore.id, x: arachne.x, z: arachne.z, fatti: tana.pieniFatti, servono: tana.pieniServono });
  S.ferisciZombie(stato, giocatore, arachne, tana.pieno, { teschio: true, colpoPieno: true }, eventi);
}

export function dannoArachne(stato, zombie, danno, opzioni) {
  const tana = stato.palude.tana;
  let effettivo = 0;
  if (tana.fase === 1) effettivo = tana.azione !== 'cala' && tana.vulnerabile > 0 ? danno : 0;
  else if (tana.fase === 2) effettivo = tana.azione === 'urlo' ? 0 : danno * (tana.azione === 'impennata' ? ESPOSTA : CORAZZA_FASE_2);
  else if (tana.fase === 3) effettivo = opzioni.colpoPieno ? danno : 0;
  const minimo = (SOGLIE[tana.fase] ?? 0) * zombie.vitaMax;
  return Math.max(0, Math.min(effettivo, zombie.vita - minimo));
}

function verso(z, meta, velocita, dt) {
  const d = distanza(z, meta);
  if (d <= ARRIVO) return true;
  const passo = Math.min(d, velocita * (1 - Math.min(0.5, z.gelo ?? 0)) * dt);
  z.x += ((meta.x - z.x) / d) * passo;
  z.z += ((meta.z - z.z) / d) * passo;
  z.yaw = Math.atan2(meta.x - z.x, meta.z - z.z);
  return d - passo <= ARRIVO;
}

function vittime(stato, S) {
  return S.vivi(stato).filter(nellaTana);
}

function preda(stato, S) {
  const v = vittime(stato, S);
  return v.length ? v[Math.floor(S.caso(stato) * v.length)] : null;
}

function presenti(stato) {
  let n = 0;
  for (const z of stato.zombie) if (z.stato !== 'morto') n++;
  return n;
}

function morso(stato, arachne, dt, eventi, S) {
  const tana = stato.palude.tana;
  tana.morso = Math.max(0, tana.morso - dt);
  if (tana.morso > 0) return;
  const vicina = vittime(stato, S).find(g => distanza(g, arachne) <= PORTATA_MORSO);
  if (!vicina) return;
  tana.morso = MORSO_OGNI;
  arachne.yaw = Math.atan2(vicina.x - arachne.x, vicina.z - arachne.z);
  S.ferisciGiocatore(stato, vicina, eventi, DANNO_MORSO);
  eventi.push({ k: 'morso', zombie: arachne.id });
}

function sputa(stato, arachne, dt, eventi, S) {
  const tana = stato.palude.tana;
  tana.sputo -= dt;
  if (tana.sputo > 0) return;
  tana.sputo = SPUTO_OGNI;
  const g = preda(stato, S);
  if (!g) return;
  aggiungiColpo(stato.palude, 'acido', g.x, g.z, PREAVVISO_SPUTO, RAGGIO_SPUTO);
  eventi.push({ k: 'sputo', x: arachne.x, z: arachne.z, ax: g.x, az: g.z });
}

function ondata(stato, dt, eventi, S) {
  const tana = stato.palude.tana;
  tana.ondata -= dt;
  if (tana.ondata > 0) return;
  tana.ondata = ONDATA_OGNI;
  const quanti = 2 + vittime(stato, S).length;
  for (let i = 0; i < quanti && presenti(stato) < RAGNI_MAX; i++) S.generaZombie(stato, { tipo: 'ragno', finestre: MISSIONE.TANE_ARENA, corre: true });
  eventi.push({ k: 'ondataRagni' });
}

function generaOrda(stato, S) {
  S.generaZombie(stato, { tipo: S.caso(stato) < QUOTA_RAGNI_ORDA ? 'ragno' : 'normale', finestre: MISSIONE.TANE_ARENA, corre: true });
}

function fase1(stato, arachne, dt, eventi, S) {
  const tana = stato.palude.tana;
  if (tana.azione === 'cala') {
    if (tana.timer > 0) return;
    tana.azione = 'giro';
    eventi.push({ k: 'arachneScesa' });
  }
  if (tana.azione === 'stordita') {
    if (tana.timer <= 0) tana.azione = 'giro';
    return;
  }
  if (verso(arachne, MISSIONE.GIRO[tana.tappa], VELOCITA_GIRO, dt)) tana.tappa = (tana.tappa + 1) % MISSIONE.GIRO.length;
  morso(stato, arachne, dt, eventi, S);
  sputa(stato, arachne, dt, eventi, S);
  ondata(stato, dt, eventi, S);
}

function scegliScatto(stato, arachne, eventi, S) {
  const tana = stato.palude.tana;
  const pareti = MISSIONE.PARETI;
  let i = Math.floor(S.caso(stato) * pareti.length);
  for (let k = 0; k < pareti.length && distanza(pareti[i], arachne) < DISTANZA_SCATTO_MINIMA; k++) i = (i + 1) % pareti.length;
  Object.assign(tana, { azione: 'scatto', meta: { x: pareti[i].x, z: pareti[i].z }, colpitiScatto: [] });
  eventi.push({ k: 'scatto', zombie: arachne.id });
}

function fase2(stato, arachne, dt, eventi, S) {
  const tana = stato.palude.tana;
  if (tana.azione === 'urlo') {
    if (tana.timer <= 0) Object.assign(tana, { azione: 'attesa', timer: 1 });
    return;
  }
  if (tana.azione === 'attesa') {
    morso(stato, arachne, dt, eventi, S);
    if (tana.timer <= 0) {
      if (tana.fermate % FERMATE_PER_IMPENNATA === FERMATE_PER_IMPENNATA - 1) {
        Object.assign(tana, { azione: 'impennata', timer: IMPENNATA });
        eventi.push({ k: 'impennata', x: arachne.x, z: arachne.z });
      } else scegliScatto(stato, arachne, eventi, S);
    }
  } else if (tana.azione === 'scatto') {
    const arrivata = verso(arachne, tana.meta, VELOCITA_SCATTO, dt);
    for (const g of vittime(stato, S)) {
      if (tana.colpitiScatto.includes(g.id) || distanza(g, arachne) > RAGGIO_SCATTO) continue;
      tana.colpitiScatto.push(g.id);
      S.ferisciGiocatore(stato, g, eventi, DANNO_SCATTO);
    }
    if (arrivata) Object.assign(tana, { azione: 'attesa', timer: ATTESA_SCATTO, fermate: tana.fermate + 1 });
  } else if (tana.azione === 'impennata' && tana.timer <= 0) {
    for (const g of vittime(stato, S)) if (distanza(g, arachne) <= RAGGIO_SCHIANTO) S.ferisciGiocatore(stato, g, eventi, DANNO_SCHIANTO);
    eventi.push({ k: 'schianto', x: arachne.x, z: arachne.z });
    Object.assign(tana, { azione: 'attesa', timer: ATTESA_SCATTO, fermate: tana.fermate + 1 });
  }
  tana.tela -= dt;
  if (tana.tela <= 0) {
    tana.tela = TELA_OGNI;
    const g = preda(stato, S);
    if (g) {
      aggiungiColpo(stato.palude, 'tela', g.x, g.z, PREAVVISO_TELA, RAGGIO_TELA);
      eventi.push({ k: 'sputo', x: arachne.x, z: arachne.z, ax: g.x, az: g.z, tela: true });
    }
  }
  sputa(stato, arachne, dt, eventi, S);
  ondata(stato, dt, eventi, S);
}

function fase3(stato, arachne, dt, eventi, S) {
  const tana = stato.palude.tana;
  if (tana.azione === 'sale') {
    verso(arachne, MISSIONE.ARENA, VELOCITA_SALITA, dt);
    if (tana.timer <= 0) tana.azione = 'soffitto';
  }
  tana.pioggia -= dt;
  if (tana.pioggia <= 0) {
    tana.pioggia = PIOGGIA_OGNI;
    for (const g of vittime(stato, S)) {
      aggiungiColpo(stato.palude, 'pioggia', g.x + (S.caso(stato) - 0.5) * 2 * SCARTO_PIOGGIA, g.z + (S.caso(stato) - 0.5) * 2 * SCARTO_PIOGGIA, PREAVVISO_PIOGGIA, RAGGIO_PIOGGIA);
    }
  }
  tana.orda -= dt;
  if (tana.orda > 0) return;
  tana.orda = ORDA_OGNI;
  if (presenti(stato) < ORDA_MAX) generaOrda(stato, S);
}

function cambiaFase(stato, arachne, eventi, S) {
  const tana = stato.palude.tana;
  const voluta = arachne.faseBoss ?? 1;
  if (voluta >= 2 && tana.fase < 2) Object.assign(tana, { fase: 2, azione: 'urlo', timer: DURATA_URLO, vulnerabile: 0, fermate: 0, tela: TELA_OGNI });
  if (voluta < 3 || tana.fase >= 3) return;
  const servono = Math.max(1, vittime(stato, S).length);
  Object.assign(tana, { fase: 3, azione: 'sale', timer: DURATA_SALITA, pieniServono: servono, pieniFatti: 0, pieno: Math.ceil(arachne.vita / servono), orda: ORDA_OGNI });
  for (let i = 0; i < ORDA_SUBITO && presenti(stato) < ORDA_MAX; i++) generaOrda(stato, S);
  eventi.push({ k: 'arachneSoffitto', servono });
}

function crollo(stato, eventi) {
  const tana = stato.palude.tana;
  Object.assign(tana, { fase: 4, azione: 'crollo', timer: OUTRO, outro: OUTRO });
  svuotaColpi(stato.palude);
  for (const z of stato.zombie) {
    if (z.stato === 'morto') continue;
    Object.assign(z, { stato: 'morto', timer: RESTA_A_TERRA });
    eventi.push({ k: 'ucciso', zombie: z.id, testa: false, da: null, x: z.x, z: z.z, bomba: true });
  }
  eventi.push({ k: 'crollo', x: tana.ultimo.x, z: tana.ultimo.z });
}

function acqua(stato, dt, eventi, S) {
  const tana = stato.palude.tana;
  const voluta = tana.fase === 2 ? 1 : 0;
  tana.acqua = voluta > tana.acqua ? Math.min(1, tana.acqua + dt / ALLAGA_IN) : Math.max(0, tana.acqua - dt / ALLAGA_IN);
  if (tana.acqua < ACQUA_LETALE) return;
  tana.annega -= dt;
  if (tana.annega > 0) return;
  tana.annega += OGNI_ACQUA;
  for (const g of vittime(stato, S)) if (!sulleRocce(g.x, g.z)) S.ferisciGiocatore(stato, g, eventi, DANNO_ACQUA);
}

export function aggiornaFinale(stato, dt, eventi, S) {
  const tana = stato.palude.tana;
  stato.finale.tempo += dt;
  if (tana.fase === 4) {
    tana.outro -= dt;
    tana.timer = tana.outro;
    if (tana.outro <= 0) S.vittoria(stato, eventi);
    return;
  }
  const arachne = stato.zombie.find(z => z.tipo === 'arachne' && z.stato !== 'morto');
  if (!arachne) {
    crollo(stato, eventi);
    return;
  }
  if (FERMA.has(tana.azione)) {
    tana.ancora ??= { x: arachne.x, z: arachne.z };
    Object.assign(arachne, tana.ancora);
  } else tana.ancora = null;
  tana.ultimo = { x: arachne.x, z: arachne.z };
  if ((arachne.faseBoss ?? 1) > tana.fase) cambiaFase(stato, arachne, eventi, S);
  tana.timer -= dt;
  tana.vulnerabile = Math.max(0, tana.vulnerabile - dt);
  tana.bozzoli = tana.bozzoli.map(t => Math.max(0, t - dt));
  if (tana.fase === 1) fase1(stato, arachne, dt, eventi, S);
  else if (tana.fase === 2) fase2(stato, arachne, dt, eventi, S);
  else fase3(stato, arachne, dt, eventi, S);
  acqua(stato, dt, eventi, S);
}

const nessuno = testo => ({ costo: Infinity, testo });

export function descriviVarco(io, vista, spezzati, totali) {
  const tana = vista.palude.tana;
  if (tana.varco === VARCO.BARRIERA) return nessuno(`Una barriera chiude il cuore della palude: spezzate i totem della corruzione (${spezzati}/${totali})`);
  if (tana.varco === VARCO.MEMBRANA) {
    if (!ARMI[io.armaAttiva]?.teschio) return nessuno('Una membrana viscida copre il varco: serve il Teschio in mano');
    if ((vista.giocatori.find(g => g.id === io.id)?.anime ?? 0) < COSTO_MEMBRANA) return nessuno(`Il Teschio ha fame: servono ${COSTO_MEMBRANA} anime per bruciare la membrana`);
    return { costo: 0, testo: `Premi F per bruciare la membrana col Teschio [${COSTO_MEMBRANA} anime]` };
  }
  if (vista.fase === 'finale') return nessuno('');
  if (!prontiAlSalto(vista)) return nessuno('Radunatevi tutti qui, vivi e ognuno col suo Teschio, per saltare nella tana');
  return { costo: 0, testo: 'Premi F per saltare nella tana di Arachne (non si torna indietro)' };
}

export function obiettivoTana(vista, mioId) {
  const tana = vista.palude.tana;
  if (tana.fase === 4) return 'La volta crolla su Arachne!';
  if (tana.fase === 1) {
    if (tana.azione === 'cala') return 'Arachne scende dal soffitto…';
    if (tana.vulnerabile > 0) return `La seta è strappata: colpite Arachne con tutto! (${Math.ceil(tana.vulnerabile)} s)`;
    return 'Arachne è avvolta nella seta: fate esplodere col Teschio un bozzolo quando le passa vicino';
  }
  if (tana.fase === 2) {
    if (tana.azione === 'urlo') return "Le pareti cedono e l'acqua sale: salite sulle rocce!";
    if (tana.azione === 'impennata') return 'Si impenna: colpite il ventre adesso!';
    return "Restate sulle rocce, l'acqua uccide · colpite il ventre quando si impenna";
  }
  const anime = vista.giocatori.find(g => g.id === mioId)?.anime ?? 0;
  return `Caricate il Teschio al massimo (${anime}/${R.TESCHIO_ANIME_MAX}) e colpite la testa di Arachne · colpi pieni ${tana.pieniFatti}/${tana.pieniServono}`;
}
