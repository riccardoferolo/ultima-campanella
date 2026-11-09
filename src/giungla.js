import { R, ARMI, armaBase, vitaZombie, moltiplicatoreBoss } from './regole.js';
import { OGGETTI, TANE_CUORE } from './mappe/giungla.js';
import { zonaDi } from './mappa.js';

export const DURATA_GENERATORE = 50;
export const DURATA_PONTE = 60;
export const DURATA_PORTA = 90;
export const DURATA_FUGA = 150;
export const ANIME_PER_IDOLO = 6;
export const ASSI = 3;
export const SCHEGGE = 3;
export const RADIO_MESSAGGI = 6;
const RAGGIO_DIFESA = 8;
const RAGGIO_IDOLO = 5.5;
const DISTANZA_RACCOLTA = 1.8;
const TOLLERANZA = 0.8;
const BOSS_DOPO = 8;
const EVOCA_OGNI = 12;
const RAGGIO_TURBINE = 4.5;
const LUNGHEZZA_ONDA = 14;
const LARGHEZZA_ONDA = 2.5;
const RAGGIO_NUBE = 5;
const DURATA_NUBE = 7;
const COLPO_NUBE = 0.5;
const RAGGIO_SIGILLO = 7;
const PIETRE_OGNI = 4;
const RITARDO_PIETRA = 1.6;
const RAGGIO_PIETRA = 2.2;
const DANNO_PIETRA = 70;
const FATTORE_SCUDO = 0.12;
const SCUDO_ROTTO = 15;
const URLO_PER_FASE = Object.freeze([18, 15, 11, 8]);
const RINFORZI_MAX = 12;
const FUGA_OGNI = 1.1;
const FUGA_DA_X = 30;

export const ID_ASSI = Object.freeze([0, 1, 2]);
export const ID_SCHEGGIA_GROTTA = 3;
export const ID_SCHEGGIA_FIUME = 4;
export const ID_MASCHERA = 6;
export const RELIQUIE = Object.freeze({ machete: 7, bastone: 8, spada: 9 });
const POSTI_RELIQUIE = Object.freeze({ machete: OGGETTI.ALTARE, bastone: OGGETTI.BASTONE, spada: OGGETTI.SPADA });

const CHIAVI = Object.freeze([
  'gen0', 'gen0p', 'gen1', 'gen1p', 'radioLivello', 'radioAscoltati', 'assiRaccolte', 'assiPortate', 'ponte', 'ponteP',
  'schegge', 'scheggeAltare', 'altare', 'scheggiaFiume', 'scheggiaAereo', 'idolo0', 'idolo1', 'idolo2', 'idolo3', 'bastone',
  'pietra0', 'pietra1', 'pietra2', 'sol0', 'sol1', 'sol2', 'sole', 'sciamano', 'porta', 'portaP',
  'ord0', 'ord1', 'ord2', 'ord3', 'runeToccate', 'rune', 'sigillo', 'fuga', 'cassaFiumeX',
]);
export const LUNGHEZZA_STATO = CHIAVI.length;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const r2 = n => Math.round(n * 100) / 100;

function permutazione(seme) {
  const elenco = [0, 1, 2, 3];
  let s = seme >>> 0;
  for (let i = elenco.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [elenco[i], elenco[j]] = [elenco[j], elenco[i]];
  }
  return elenco;
}

function soluzione(seme) {
  const s = ((seme >>> 0) ^ 0x9e3779b9) >>> 0;
  const valori = [s % 4, (s >>> 2) % 4, (s >>> 4) % 4];
  return valori.every(v => v === 0) ? [1, 3, 2] : valori;
}

export function statoIniziale(seme) {
  return {
    generatori: [{ stato: 0, progresso: 0 }, { stato: 0, progresso: 0 }],
    radioLivello: 0,
    radioAscoltati: 0,
    assiRaccolte: 0,
    assiPortate: 0,
    ponte: 0,
    progressoPonte: 0,
    schegge: 0,
    scheggeAltare: 0,
    altare: 0,
    scheggiaFiume: false,
    scheggiaAereo: false,
    idoli: [0, 0, 0, 0],
    bastone: 0,
    pietre: [0, 0, 0],
    soluzione: soluzione(seme),
    sole: 0,
    sciamano: 0,
    bossTra: null,
    evoca: EVOCA_OGNI,
    porta: 0,
    progressoPorta: 0,
    ordine: permutazione(seme),
    runeToccate: 0,
    rune: 0,
    sigillo: 0,
    fuga: 0,
    prossimaFuga: FUGA_OGNI,
    cassaFiume: { x: OGGETTI.CASSA_FIUME.x0, verso: 1 },
    oggetti: [...OGGETTI.ASSI.map((p, i) => ({ id: ID_ASSI[i], x: p.x, z: p.z, y: 0.25 })), { id: ID_SCHEGGIA_GROTTA, ...OGGETTI.SCHEGGIA_GROTTA }],
    nubi: [],
    pietreCadenti: [],
    prossimaNube: 1,
    prossimaPietra: 1,
  };
}

const vicino = (stato, punto, S, raggio = RAGGIO_DIFESA) => S.vivi(stato).some(g => distanza(g, punto) <= raggio);
const livelloRadio = (g, n) => { g.radioLivello = Math.max(g.radioLivello, n); };

export function difesaAttiva(stato) {
  const g = stato.giungla;
  return g.generatori.some(x => x.stato === 1) || g.ponte === 1 || g.porta === 1;
}

function tocca(oggetto, giocatore) {
  return distanza(giocatore, oggetto) <= DISTANZA_RACCOLTA + TOLLERANZA;
}

export function raccogli(stato, giocatore, id, eventi, S) {
  const g = stato.giungla;
  if (id === ID_SCHEGGIA_FIUME) {
    const cassa = { x: g.cassaFiume.x, z: OGGETTI.CASSA_FIUME.z };
    if (g.scheggiaFiume || g.ponte !== 2 || !tocca(cassa, giocatore)) return;
    g.scheggiaFiume = true;
    g.schegge += 1;
    eventi.push({ k: 'scheggia', da: giocatore.id, trovate: g.schegge + g.scheggeAltare });
    return;
  }
  const oggetto = g.oggetti.find(o => o.id === id);
  if (!oggetto || !tocca(oggetto, giocatore)) return;
  const reliquia = Object.entries(RELIQUIE).find(([, n]) => n === id)?.[0];
  if (reliquia) {
    g.oggetti = g.oggetti.filter(o => o !== oggetto);
    S.prendiArma(stato, giocatore, reliquia, eventi, { reliquia: true });
    giocatore.carica = 0;
    if (reliquia === 'machete') g.altare = 3;
    if (reliquia === 'bastone') g.bastone = 2;
    if (reliquia === 'spada') g.sole = 3;
    eventi.push({ k: 'reliquia', arma: reliquia, da: giocatore.id });
    return;
  }
  g.oggetti = g.oggetti.filter(o => o !== oggetto);
  if (ID_ASSI.includes(id)) {
    g.assiRaccolte += 1;
    eventi.push({ k: 'assi', trovate: g.assiRaccolte + g.assiPortate, totale: ASSI });
  } else if (id === ID_SCHEGGIA_GROTTA) {
    g.schegge += 1;
    eventi.push({ k: 'scheggia', da: giocatore.id, trovate: g.schegge + g.scheggeAltare });
  } else if (id === ID_MASCHERA) {
    g.sciamano = 3;
    eventi.push({ k: 'maschera' });
  }
}

export function compra(stato, giocatore, acquisto, eventi, S) {
  const g = stato.giungla;
  const inGioco = stato.fase === 'gioco';
  switch (acquisto.tipo) {
    case 'generatoreG': {
      const gen = g.generatori[acquisto.generatore];
      if (gen.stato === 0 && inGioco) {
        gen.stato = 1;
        eventi.push({ k: 'generatoreG', n: acquisto.generatore });
      }
      return true;
    }
    case 'radio':
      if (!stato.corrente) return true;
      if (g.radioAscoltati < g.radioLivello) g.radioAscoltati += 1;
      eventi.push({ k: 'radio', n: g.radioAscoltati });
      return true;
    case 'cantiere':
      if (g.assiRaccolte > 0) {
        g.assiPortate += g.assiRaccolte;
        g.assiRaccolte = 0;
        eventi.push({ k: 'assiPortate', portate: g.assiPortate, totale: ASSI });
      }
      if (g.assiPortate >= ASSI && g.ponte === 0 && inGioco) {
        g.ponte = 1;
        eventi.push({ k: 'ponteCantiere' });
      }
      return true;
    case 'cabina':
      if (!stato.corrente || g.scheggiaAereo) return true;
      g.scheggiaAereo = true;
      g.schegge += 1;
      eventi.push({ k: 'scheggia', da: giocatore.id, trovate: g.schegge + g.scheggeAltare });
      return true;
    case 'altare':
      if (g.schegge > 0 && g.altare === 0) {
        g.scheggeAltare += g.schegge;
        g.schegge = 0;
        eventi.push({ k: 'scheggeAltare', messe: g.scheggeAltare, totale: SCHEGGE });
        if (g.scheggeAltare >= SCHEGGE) {
          g.altare = 1;
          eventi.push({ k: 'forgia' });
        }
      }
      return true;
    case 'pietraSole':
      if (g.sole !== 0) return true;
      g.pietre[acquisto.pietra] = (g.pietre[acquisto.pietra] + 1) % 4;
      eventi.push({ k: 'pietraGirata', pietra: acquisto.pietra });
      if (g.pietre.every((v, i) => v === g.soluzione[i])) {
        g.sole = 1;
        S.generaZombie(stato, { tipo: 'guardiano', punto: OGGETTI.COMPARSA_GUARDIANO });
        eventi.push({ k: 'boss', tipo: 'guardiano' });
      }
      return true;
    case 'portaTempio':
      if (g.sciamano === 3) {
        g.sciamano = 4;
        eventi.push({ k: 'mascheraMessa' });
      }
      if (g.sciamano === 4 && g.porta === 0 && inGioco) {
        g.porta = 1;
        eventi.push({ k: 'portaTempio' });
      }
      return true;
    case 'runa':
      if (g.porta !== 2 || g.rune === 1) return true;
      if (acquisto.runa === g.ordine[g.runeToccate]) {
        g.runeToccate += 1;
        eventi.push({ k: 'runa', runa: acquisto.runa, giuste: g.runeToccate });
        if (g.runeToccate === 4) {
          g.rune = 1;
          eventi.push({ k: 'runeComplete' });
        }
      } else if (!g.ordine.slice(0, g.runeToccate).includes(acquisto.runa)) {
        g.runeToccate = 0;
        for (let i = 0; i < 6; i++) S.generaZombie(stato, { finestre: ['t-tempio-1', 't-tempio-2'], corre: true });
        eventi.push({ k: 'runaSbagliata' });
      }
      return true;
    case 'cuoreAltare':
      if (g.sigillo !== 1 || stato.finale || (stato.fase !== 'gioco' && stato.fase !== 'intervallo')) return true;
      if (!stato.giocatori.filter(x => x.stato !== 'morto').every(x => zonaDi(x.x, x.z) === 'cuore' && x.z > OGGETTI.SOGLIA_CUORE)) return true;
      iniziaFinale(stato, eventi, S);
      return true;
    case 'idolo':
      return true;
    default:
      return false;
  }
}

function iniziaFinale(stato, eventi, S) {
  stato.fase = 'finale';
  stato.daGenerare = 0;
  stato.porte = stato.porte.filter(p => p !== 'sigillo');
  const vita = Math.round(R.VITA_DIVORATORE * moltiplicatoreBoss(stato.giocatori.length));
  S.generaZombie(stato, { tipo: 'divoratore', punto: OGGETTI.COMPARSA_DIVORATORE, vita, attesa: 3 });
  stato.finale = { urlo: URLO_PER_FASE[0], rinforzi: 4, tempo: 0, pietre: PIETRE_OGNI };
  eventi.push({ k: 'finale', mappa: 'giungla' });
}

export function inizioRound(stato, eventi) {
  const g = stato.giungla;
  if (g.ponte === 2 && g.sciamano === 0) g.bossTra = BOSS_DOPO;
  if (eventi && g.bossTra !== null) eventi.push({ k: 'presagio' });
}

export function fineRound(stato, eventi) {
  const g = stato.giungla;
  if (g.altare !== 1) return;
  g.altare = 2;
  g.oggetti.push({ id: RELIQUIE.machete, ...OGGETTI.ALTARE });
  eventi.push({ k: 'reliquiaPronta', arma: 'machete' });
}

export function bossInAttesa(stato) {
  return stato.giungla.bossTra !== null;
}

function aggiornaDifese(stato, dt, eventi, S) {
  const g = stato.giungla;
  g.generatori.forEach((gen, i) => {
    if (gen.stato !== 1) return;
    if (vicino(stato, OGGETTI.GENERATORI[i], S)) gen.progresso = Math.min(1, gen.progresso + dt / DURATA_GENERATORE);
    if (gen.progresso < 1) return;
    gen.stato = 2;
    eventi.push({ k: 'generatoreGFinito', n: i });
    if (g.generatori.every(x => x.stato === 2)) {
      stato.corrente = true;
      livelloRadio(g, 1);
      eventi.push({ k: 'corrente' });
    }
  });
  if (g.ponte === 1) {
    if (vicino(stato, OGGETTI.PONTE, S)) g.progressoPonte = Math.min(1, g.progressoPonte + dt / DURATA_PONTE);
    if (g.progressoPonte >= 1) {
      g.ponte = 2;
      stato.porte.push('ponte');
      livelloRadio(g, 2);
      eventi.push({ k: 'ponte' });
    }
  }
  if (g.porta === 1) {
    if (vicino(stato, OGGETTI.PORTA_TEMPIO, S, RAGGIO_DIFESA + 1)) g.progressoPorta = Math.min(1, g.progressoPorta + dt / DURATA_PORTA);
    if (g.progressoPorta >= 1) {
      g.porta = 2;
      stato.porte.push('tempio');
      livelloRadio(g, 4);
      eventi.push({ k: 'tempioAperto' });
    }
  }
}

function aggiornaBoss(stato, dt, eventi, S) {
  const g = stato.giungla;
  if (g.bossTra !== null && stato.fase === 'gioco') {
    g.bossTra -= dt;
    if (g.bossTra <= 0) {
      g.bossTra = null;
      g.sciamano = 1;
      S.generaZombie(stato, { tipo: 'sciamano', punto: OGGETTI.COMPARSA_SCIAMANO });
      eventi.push({ k: 'boss', tipo: 'sciamano' });
    }
  }
  const sciamano = stato.zombie.find(z => z.tipo === 'sciamano' && z.stato !== 'morto');
  if (!sciamano) return;
  g.evoca -= dt;
  if (g.evoca > 0) return;
  g.evoca = EVOCA_OGNI;
  for (let i = 0; i < 2; i++) S.generaZombie(stato, { punto: { x: sciamano.x + (i ? 1.5 : -1.5), z: sciamano.z }, corre: true });
  eventi.push({ k: 'evocazione', x: sciamano.x, z: sciamano.z });
}

function aggiornaNubi(stato, dt, eventi, S) {
  const g = stato.giungla;
  g.nubi = g.nubi.filter(n => {
    n.timer -= dt;
    n.colpo -= dt;
    if (n.colpo <= 0) {
      n.colpo += COLPO_NUBE;
      const giocatore = stato.giocatori.find(x => x.id === n.da);
      for (const z of stato.zombie) {
        if (z.stato === 'morto' || distanza(z, n) > n.raggio) continue;
        z.gelo = Math.max(z.gelo ?? 0, 0.45);
        if (giocatore) S.ferisciZombie(stato, giocatore, z, Math.round(Math.min(1500, vitaZombie(Math.max(1, stato.round)) * 0.3)), { reliquia: true }, eventi);
      }
    }
    return n.timer > 0;
  });
}

function aggiornaCassaFiume(g, dt) {
  const { x0, x1, velocita } = OGGETTI.CASSA_FIUME;
  g.cassaFiume.x += g.cassaFiume.verso * velocita * dt;
  if (g.cassaFiume.x > x1) g.cassaFiume.verso = -1;
  if (g.cassaFiume.x < x0) g.cassaFiume.verso = 1;
}

export function aggiorna(stato, dt, eventi, S) {
  const g = stato.giungla;
  aggiornaCassaFiume(g, dt);
  if (stato.fase === 'attesa') return;
  aggiornaDifese(stato, dt, eventi, S);
  aggiornaBoss(stato, dt, eventi, S);
  aggiornaNubi(stato, dt, eventi, S);
  for (const z of stato.zombie) if (z.scudoRotto > 0) z.scudoRotto = Math.max(0, z.scudoRotto - dt);
}

export function suUccisione(stato, zombie, giocatore, opzioni, eventi) {
  const g = stato.giungla;
  if (ARMI[opzioni.arma]?.bianca && giocatore.armi.includes(opzioni.arma)) giocatore.carica = Math.min(1, (giocatore.carica ?? 0) + 1 / R.CARICA_RELIQUIA);
  if (g.bastone !== 0) return;
  OGGETTI.IDOLI.forEach((idolo, i) => {
    if (g.idoli[i] >= ANIME_PER_IDOLO || distanza(zombie, idolo) > RAGGIO_IDOLO) return;
    g.idoli[i] += 1;
    eventi.push({ k: 'anima', idolo: i, x: zombie.x, z: zombie.z, anime: g.idoli[i] });
  });
  if (g.idoli.every(n => n >= ANIME_PER_IDOLO)) {
    g.bastone = 1;
    g.oggetti.push({ id: RELIQUIE.bastone, ...OGGETTI.BASTONE });
    eventi.push({ k: 'reliquiaPronta', arma: 'bastone' });
  }
}

export function suBossUcciso(stato, zombie, punto, eventi, S) {
  const g = stato.giungla;
  if (zombie.tipo === 'sciamano') {
    g.sciamano = 2;
    g.oggetti.push({ id: ID_MASCHERA, x: punto.x, z: punto.z, y: 0.3 });
    livelloRadio(g, 3);
    eventi.push({ k: 'mascheraCaduta', x: punto.x, z: punto.z });
  } else if (zombie.tipo === 'guardiano') {
    g.sole = 2;
    g.oggetti.push({ id: RELIQUIE.spada, x: punto.x, z: punto.z, y: 0.5 });
    eventi.push({ k: 'reliquiaPronta', arma: 'spada' });
  } else if (zombie.tipo === 'divoratore') {
    iniziaFuga(stato, eventi, S);
  }
}

export function dannoEffettivo(stato, zombie, danno, opzioni) {
  if (zombie.tipo !== 'divoratore' || (zombie.faseBoss ?? 1) !== 2 || zombie.scudoRotto > 0 || opzioni.reliquia) return danno;
  if (ARMI[opzioni.arma]?.bianca) return danno;
  return danno * FATTORE_SCUDO;
}

function bersagliSpeciale(stato, giocatore, tipo, d) {
  const vivi = stato.zombie.filter(z => z.stato !== 'morto' && z.stato !== 'emerge');
  if (tipo === 'turbine') return vivi.filter(z => distanza(z, giocatore) <= RAGGIO_TURBINE);
  if (tipo === 'onda') {
    return vivi.filter(z => {
      const vx = z.x - giocatore.x;
      const vz = z.z - giocatore.z;
      const lungo = vx * d.x + vz * d.z;
      const lato = Math.abs(vx * d.z - vz * d.x);
      return lungo > -0.5 && lungo < LUNGHEZZA_ONDA && lato < LARGHEZZA_ONDA;
    });
  }
  return [];
}

export function speciale(stato, giocatore, azione, eventi, S) {
  const arma = ARMI[giocatore.armaAttiva];
  if (!arma?.bianca || (giocatore.carica ?? 0) < 1) return;
  giocatore.carica = 0;
  const g = stato.giungla;
  const yaw = Number(azione.yaw) || 0;
  const d = { x: Math.sin(yaw), z: Math.cos(yaw) };
  const tipo = arma.speciale;
  const forte = vitaZombie(Math.max(1, stato.round));
  if (tipo === 'veleno') {
    g.nubi.push({ id: g.prossimaNube++, x: giocatore.x + d.x * 3, z: giocatore.z + d.z * 3, raggio: RAGGIO_NUBE, timer: DURATA_NUBE, colpo: 0, da: giocatore.id });
  } else {
    for (const z of bersagliSpeciale(stato, giocatore, tipo, d)) {
      const boss = S.tipoDi(z).boss;
      if (boss) z.scudoRotto = SCUDO_ROTTO;
      const danno = boss ? (tipo === 'onda' ? 3500 : 2500) : Math.max(tipo === 'onda' ? 5000 : 4000, forte * (tipo === 'onda' ? 4 : 3));
      S.ferisciZombie(stato, giocatore, z, Math.round(danno), { reliquia: true }, eventi);
    }
  }
  if (tipo === 'veleno') for (const z of stato.zombie) if (S.tipoDi(z).boss && distanza(z, giocatore) < RAGGIO_NUBE + 3) z.scudoRotto = SCUDO_ROTTO;
  eventi.push({ k: 'speciale', tipo, da: giocatore.id, x: giocatore.x, z: giocatore.z, yaw });
  if (g.rune === 1 && g.sigillo === 0 && distanza(giocatore, OGGETTI.SIGILLO) <= RAGGIO_SIGILLO) {
    g.sigillo = 1;
    stato.porte.push('sigillo');
    livelloRadio(g, 5);
    eventi.push({ k: 'sigilloRotto' });
  }
}

export function aggiornaFinale(stato, dt, eventi, S) {
  const f = stato.finale;
  f.tempo += dt;
  const boss = stato.zombie.find(z => z.tipo === 'divoratore' && z.stato !== 'morto');
  if (!boss) return;
  const fase = boss.faseBoss ?? 1;
  const presenti = stato.zombie.filter(z => z.stato !== 'morto').length;
  f.rinforzi -= dt;
  if (f.rinforzi <= 0) {
    if (presenti <= RINFORZI_MAX) S.generaZombie(stato, { finestre: TANE_CUORE, corre: fase >= 3 ? true : undefined });
    f.rinforzi = fase >= 3 ? 1.4 : 2.2;
  }
  f.urlo -= dt;
  if (f.urlo <= 0) {
    for (let i = 0; i < 3 + fase && presenti + i < R.GIUNGLA_VIVI_MAX; i++) S.generaZombie(stato, { finestre: TANE_CUORE, corre: true });
    f.urlo = URLO_PER_FASE[fase - 1];
    eventi.push({ k: 'urlo' });
  }
  const g = stato.giungla;
  g.pietreCadenti = g.pietreCadenti.filter(p => {
    p.timer -= dt;
    if (p.timer > 0) return true;
    for (const giocatore of S.vivi(stato)) if (distanza(giocatore, p) <= RAGGIO_PIETRA) S.ferisciGiocatore(stato, giocatore, eventi, DANNO_PIETRA);
    eventi.push({ k: 'pietra', x: p.x, z: p.z });
    return false;
  });
  if (fase < 4) return;
  f.pietre -= dt;
  if (f.pietre > 0) return;
  f.pietre = PIETRE_OGNI;
  for (const giocatore of S.vivi(stato)) g.pietreCadenti.push({ id: g.prossimaPietra++, x: giocatore.x + (S.caso(stato) - 0.5) * 1.2, z: giocatore.z + (S.caso(stato) - 0.5) * 1.2, timer: RITARDO_PIETRA });
}

function iniziaFuga(stato, eventi) {
  const g = stato.giungla;
  stato.fase = 'fuga';
  g.fuga = DURATA_FUGA;
  g.pietreCadenti = [];
  for (const id of ['sigillo', 'tempio', 'ponte']) if (!stato.porte.includes(id)) stato.porte.push(id);
  eventi.push({ k: 'fuga', secondi: DURATA_FUGA });
}

export function aggiornaFuga(stato, dt, eventi, S) {
  const g = stato.giungla;
  g.fuga = Math.max(0, g.fuga - dt);
  g.prossimaFuga -= dt;
  const presenti = stato.zombie.filter(z => z.stato !== 'morto').length;
  if (g.prossimaFuga <= 0 && presenti < R.GIUNGLA_VIVI_MAX) {
    S.generaZombie(stato, { corre: true });
    g.prossimaFuga = FUGA_OGNI;
  }
  const inPiedi = stato.giocatori.filter(x => x.stato !== 'morto');
  if (inPiedi.length && inPiedi.every(x => x.stato === 'vivo' && zonaDi(x.x, x.z) === 'pista' && x.x >= FUGA_DA_X)) {
    S.vittoria(stato, eventi);
    return;
  }
  if (g.fuga > 0) return;
  for (const giocatore of stato.giocatori) giocatore.stato = 'morto';
  eventi.push({ k: 'fugaFallita' });
}

export function suMorte(stato, giocatore, eventi) {
  const g = stato.giungla;
  for (const arma of giocatore.armi.map(armaBase)) {
    if (!POSTI_RELIQUIE[arma]) continue;
    g.oggetti.push({ id: RELIQUIE[arma], ...POSTI_RELIQUIE[arma] });
    eventi.push({ k: 'reliquiaTornata', arma });
  }
}

export function istantanea(stato) {
  const g = stato.giungla;
  if (!g) return { gq: [], go: [], nb: [], pt: [] };
  const valori = {
    gen0: g.generatori[0].stato, gen0p: Math.round(g.generatori[0].progresso * 100), gen1: g.generatori[1].stato, gen1p: Math.round(g.generatori[1].progresso * 100),
    radioLivello: g.radioLivello, radioAscoltati: g.radioAscoltati, assiRaccolte: g.assiRaccolte, assiPortate: g.assiPortate, ponte: g.ponte, ponteP: Math.round(g.progressoPonte * 100),
    schegge: g.schegge, scheggeAltare: g.scheggeAltare, altare: g.altare, scheggiaFiume: g.scheggiaFiume ? 1 : 0, scheggiaAereo: g.scheggiaAereo ? 1 : 0,
    idolo0: g.idoli[0], idolo1: g.idoli[1], idolo2: g.idoli[2], idolo3: g.idoli[3], bastone: g.bastone,
    pietra0: g.pietre[0], pietra1: g.pietre[1], pietra2: g.pietre[2], sol0: g.soluzione[0], sol1: g.soluzione[1], sol2: g.soluzione[2], sole: g.sole,
    sciamano: g.sciamano, porta: g.porta, portaP: Math.round(g.progressoPorta * 100),
    ord0: g.ordine[0], ord1: g.ordine[1], ord2: g.ordine[2], ord3: g.ordine[3], runeToccate: g.runeToccate, rune: g.rune, sigillo: g.sigillo,
    fuga: Math.ceil(g.fuga), cassaFiumeX: r2(g.cassaFiume.x),
  };
  return {
    gq: CHIAVI.map(k => valori[k]),
    go: g.oggetti.map(o => [o.id, r2(o.x), r2(o.z), r2(o.y)]),
    nb: g.nubi.map(n => [n.id, r2(n.x), r2(n.z), n.raggio, r2(n.timer)]),
    pt: g.pietreCadenti.map(p => [p.id, r2(p.x), r2(p.z), r2(p.timer)]),
  };
}

export function espandi(ist) {
  if (!ist.gq?.length) return null;
  const v = Object.fromEntries(CHIAVI.map((k, i) => [k, ist.gq[i]]));
  return {
    generatori: [{ stato: v.gen0, progresso: v.gen0p / 100 }, { stato: v.gen1, progresso: v.gen1p / 100 }],
    radioLivello: v.radioLivello, radioAscoltati: v.radioAscoltati, assiRaccolte: v.assiRaccolte, assiPortate: v.assiPortate,
    ponte: v.ponte, progressoPonte: v.ponteP / 100, schegge: v.schegge, scheggeAltare: v.scheggeAltare, altare: v.altare,
    scheggiaFiume: !!v.scheggiaFiume, scheggiaAereo: !!v.scheggiaAereo, idoli: [v.idolo0, v.idolo1, v.idolo2, v.idolo3], bastone: v.bastone,
    pietre: [v.pietra0, v.pietra1, v.pietra2], soluzione: [v.sol0, v.sol1, v.sol2], sole: v.sole, sciamano: v.sciamano,
    porta: v.porta, progressoPorta: v.portaP / 100, ordine: [v.ord0, v.ord1, v.ord2, v.ord3], runeToccate: v.runeToccate, rune: v.rune,
    sigillo: v.sigillo, fuga: v.fuga, cassaFiume: { x: v.cassaFiumeX, z: OGGETTI.CASSA_FIUME.z },
    oggetti: (ist.go ?? []).map(([id, x, z, y]) => ({ id, x, z, y })),
    nubi: (ist.nb ?? []).map(([id, x, z, raggio, timer]) => ({ id, x, z, raggio, timer })),
    pietreCadenti: (ist.pt ?? []).map(([id, x, z, timer]) => ({ id, x, z, timer })),
  };
}
