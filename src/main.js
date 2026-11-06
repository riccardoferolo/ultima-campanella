import './stile.css';
import { R, ARMI, BEVANDE, BONUS, COLTELLO } from './regole.js';
import { semeCasuale } from './caso.js';
import { MURI, OSTACOLI, PORTE, ACQUISTI, ostacoliPerGiocatori, scatolaAcquisto } from './mappa.js';
import { muoviCerchio } from './fisica.js';
import { colpisciZombie, direzioneDa, disperdi, esplosione } from './colpi.js';
import { creaArsenale, armaAttiva, aggiorna as aggiornaArsenale, spara, ricarica, coltellata, cambia, allinea, riempi, azzera } from './arsenale.js';
import { interazioneVicina } from './interazioni.js';
import { creaPartita, passo, aggiungiGiocatore, rimuoviGiocatore } from './partita.js';
import { faiIstantanea, espandi, interpola } from './istantanea.js';
import { apriSegnali } from './rete/segnali.js';
import { collega } from './rete/collegamento.js';
import { codiceStanza, normalizzaCodice, pulisciNome } from './rete/protocollo.js';
import { creaMondo } from './grafica/scena.js';
import { creaComandi } from './comandi.js';
import { creaHud } from './hud.js';
import { creaAudio } from './audio.js';

const PARAMETRI = new URLSearchParams(location.search);
const LOCALE = PARAMETRI.has('locale');
const SOLO_RISERVA = PARAMETRI.has('riserva');
const CHIAVE_NOME = 'campanella.nome';
const ISTANTANEE_OGNI_MS = { diretto: 50, riserva: 100 };
const RITARDO_VISTA_S = { diretto: 0.1, riserva: 0.22 };
const GIOCATORE_OGNI_MS = 33;
const PING_OGNI_MS = 1000;
const CIAO_OGNI_MS = 1000;
const SILENZIO_RIMOZIONE_MS = 10000;
const RECUPERO_MASSIMO_S = 0.25;
const SCARTO_SALTO_S = 0.5;
const SCARTO_PESO = 0.05;
const ASSA_OGNI_S = 0.3;
const VUOTO_OGNI_S = 0.3;
const LAMENTI_AL_SECONDO = 0.12;
const BUFFER_MASSIMO = 40;
const PORTATA_RAGGI = 60;
const AZIONI_REMOTE_MASSIME = 64;
const RIPETI_ACQUISTO_DOPO_S = 1;

const $ = id => document.getElementById(id);
const schermate = ['schermata-inizio', 'schermata-stanza', 'schermata-fine'].map($);
const mostraSchermata = id => schermate.forEach(sch => { sch.hidden = sch.id !== id; });

const hud = creaHud();
const audio = creaAudio();
const comandi = creaComandi($('mondo'));
let mondo = null;

const s = {
  mioId: crypto.randomUUID(),
  nome: null,
  sonoHost: false,
  stanza: null,
  coll: null,
  nomeAltro: null,
  idAltro: null,
  fase: 'inizio',
  partita: null,
  semeCorrente: null,
  buffer: [],
  scarto: null,
  ultimoArrivo: 0,
  vista: null,
  azioniLocali: [],
  azioniRemote: [],
  remoto: null,
  accumulo: 0,
  ultimaIstantanea: 0,
  ultimoInvioG: 0,
  ultimoPing: 0,
  ultimoCiao: 0,
  lobbyRicevuta: false,
  ping: null,
  statoSegnali: null,
  colpiVisti: new Map(),
};

const io = { x: 0, z: 0, yaw: Math.PI, pitch: 0, pronto: false, tp: 0, colpi: 0, movimento: 0, corsa: false, inMira: false };
const arsenale = creaArsenale();
const locale = { inRianimazione: false, ultimaAssa: 0, ultimoVuoto: 0, sparoForzato: false, ultimoAcquisto: { id: null, quando: 0 } };
const cacheScatole = new Map();

const collegato = () => s.coll && (s.coll.modo === 'diretto' || s.coll.modo === 'riserva');
const modoRete = () => (s.coll?.modo === 'diretto' ? 'diretto' : 'riserva');

function scatole(porte, perSparo) {
  const chiave = `${perSparo}|${[...porte].sort().join(',')}`;
  if (!cacheScatole.has(chiave)) {
    const elenco = perSparo
      ? [...MURI, ...OSTACOLI, ...PORTE.filter(p => !porte.has(p.id)).map(p => p.scatola), ...ACQUISTI.map(scatolaAcquisto).filter(Boolean).map(sc => ({ ...sc, altezza: 2 }))]
      : ostacoliPerGiocatori(porte);
    cacheScatole.set(chiave, elenco);
  }
  return cacheScatole.get(chiave);
}

function leggiNomeSalvato() {
  try { return localStorage.getItem(CHIAVE_NOME) ?? ''; } catch { return ''; }
}
function salvaNome(nome) {
  try {
    localStorage.setItem(CHIAVE_NOME, nome);
    return true;
  } catch {
    return false;
  }
}

function inviaAzione(azione) {
  if (s.sonoHost) s.azioniLocali.push({ da: s.mioId, ...azione });
  else s.coll?.invia({ t: 'az', a: azione });
}

function testoRete() {
  if (!s.coll || !s.idAltro && s.sonoHost) return s.sonoHost ? 'da solo' : '';
  if (s.coll.modo === 'diretto') return `diretto${s.ping !== null ? ` · ${s.ping} ms` : ''}`;
  if (s.coll.modo === 'riserva') return `via Supabase${s.ping !== null ? ` · ${s.ping} ms` : ''}`;
  return 'collegamento…';
}

function aggiornaStanza() {
  const stato = $('t-stato');
  $('t-codice').textContent = s.stanza;
  $('blocco-link').hidden = !s.sonoHost;
  $('parti').hidden = !s.sonoHost;
  if (s.coll?.modo === 'occupata') {
    stato.textContent = 'Questa stanza ha già due giocatori.';
    stato.dataset.tipo = 'errore';
  } else if (s.statoSegnali === 'offline' && !collegato()) {
    stato.textContent = 'Il server dei collegamenti non risponde, riprovo…';
    stato.dataset.tipo = 'errore';
  } else if (collegato() && s.nomeAltro) {
    stato.textContent = `Insieme a ${s.nomeAltro} ${s.coll.modo === 'diretto' ? '(diretto)' : '(via Supabase)'}`;
    stato.dataset.tipo = 'ok';
  } else {
    stato.textContent = s.sonoHost ? 'Aspetto il tuo amico… mandagli il link. Puoi anche entrare da solo.' : 'Mi collego alla stanza…';
    stato.dataset.tipo = 'attesa';
  }
  $('parti').textContent = s.nomeAltro && collegato() ? 'Entrate nella scuola' : 'Entra da solo';
  $('nota-stanza').textContent = s.sonoHost ? 'Se il tuo amico arriva dopo, entra direttamente nella partita.' : s.nomeAltro ? `Aspetta che ${s.nomeAltro} apra la scuola.` : '';
}

function inviaLobby() {
  if (!s.sonoHost || !collegato()) return;
  s.coll.invia({ t: 'lobby', nomeHost: s.nome, ospite: s.idAltro });
  if (s.fase === 'gioco') s.coll.invia({ t: 'inizia', seme: s.semeCorrente });
}

function entraInStanza(sonoHost, stanza) {
  audio.prepara();
  s.sonoHost = sonoHost;
  s.stanza = stanza;
  s.fase = 'stanza';
  const segnali = apriSegnali(stanza, { locale: LOCALE });
  segnali.suStato(stato => {
    s.statoSegnali = stato;
    aggiornaStanza();
  });
  s.coll = collega({ segnali, sonoHost, mioId: s.mioId, soloRiserva: SOLO_RISERVA });
  s.coll.suStato(() => {
    aggiornaStanza();
    if (collegato()) inviaLobby();
  });
  s.coll.suMessaggio(suMessaggio);
  const extra = [LOCALE ? 'locale' : null, SOLO_RISERVA ? 'riserva' : null].filter(Boolean).map(p => `&${p}`).join('');
  $('link').value = `${location.origin}${location.pathname}?stanza=${stanza}${extra}`;
  mostraSchermata('schermata-stanza');
  aggiornaStanza();
  if (sonoHost) $('parti').focus();
}

function errore(testo) {
  $('errore-inizio').textContent = testo;
}

function leggiNome() {
  const nome = pulisciNome($('nome').value);
  if (!nome) {
    errore('Scrivi il tuo nome: lo vedrà il tuo amico.');
    $('nome').focus();
    return null;
  }
  salvaNome(nome);
  s.nome = nome;
  return nome;
}

function iniziaPartita(seme, daClic = false) {
  s.fase = 'gioco';
  s.semeCorrente = seme;
  s.buffer = [];
  s.scarto = null;
  s.vista = null;
  s.accumulo = 0;
  s.azioniLocali = [];
  s.azioniRemote = [];
  s.remoto = null;
  s.colpiVisti.clear();
  azzera(arsenale);
  Object.assign(io, { pronto: false, tp: 0, colpi: 0, pitch: 0 });
  locale.inRianimazione = false;
  mondo.svuota();
  if (s.sonoHost) {
    const giocatori = [{ id: s.mioId, nome: s.nome }];
    if (s.idAltro && collegato()) giocatori.push({ id: s.idAltro, nome: s.nomeAltro });
    s.partita = creaPartita({ seme, giocatori, sala: true });
  }
  mostraSchermata(null);
  hud.mostra(true);
  comandi.attiva(true);
  document.activeElement?.blur();
  if (daClic) comandi.blocca();
}

function partiComeHost() {
  if (!s.sonoHost) return;
  const seme = semeCasuale();
  iniziaPartita(seme, true);
  if (collegato()) s.coll.invia({ t: 'inizia', seme });
}

function mostraFine(evento) {
  if (s.fase !== 'gioco') return;
  s.fase = 'fine';
  comandi.attiva(false);
  audio.suona('fine');
  $('t-dettaglio').textContent = evento.round > 1 ? `Siete sopravvissuti fino al round ${evento.round}.` : 'Non siete andati oltre il primo round.';
  $('t-tabella').replaceChildren(...evento.giocatori.map(g => {
    const riga = document.createElement('div');
    riga.textContent = `${g.nome} — ${g.uccisioni} zombie, ${g.punti} punti`;
    return riga;
  }));
  $('rigioca').hidden = !s.sonoHost;
  $('t-attesa-host').textContent = s.sonoHost ? '' : `Aspetta che ${s.nomeAltro} faccia ripartire.`;
  mostraSchermata('schermata-fine');
  if (s.sonoHost) $('rigioca').focus();
}

function nomeDi(id) {
  return s.vista?.giocatori.find(g => g.id === id)?.nome ?? 'Il tuo amico';
}

function suEventi(eventi) {
  for (const e of eventi) {
    const perMe = e.a === s.mioId;
    switch (e.k) {
      case 'round': audio.suona('round'); hud.avviso(`Round ${e.round}`); break;
      case 'fineRound': audio.suona('fineRound'); break;
      case 'ucciso':
        mondo.effetti.macchia(e.x, e.z);
        if (e.bomba) mondo.effetti.esplosione({ x: e.x, y: 1, z: e.z }, 'fuoco');
        break;
      case 'via': azzera(arsenale); audio.suona('round'); hud.avviso('Si comincia! Restate vicini', 'bene'); break;
      case 'conto': audio.suona('conto'); break;
      case 'contoAnnullato': hud.avviso('Partenza annullata: qualcuno non è pronto'); break;
      case 'bonusCompare': audio.suona('bonusCompare'); break;
      case 'bonus':
        audio.suona(e.tipo === 'bomba' ? 'bomba' : 'bonus');
        hud.avviso(`${BONUS[e.tipo].nome} — ${BONUS[e.tipo].descrizione}`, 'bene');
        if (e.tipo === 'munizioni') arsenale.armi.forEach(a => riempi(arsenale, a.tipo));
        break;
      case 'frammento': audio.suona('frammento'); hud.avviso(`Frammento di meteorite ${e.trovati}/${e.totale}`, 'bene'); break;
      case 'segreto': audio.suona('segreto'); hud.avviso('La meteorite si risveglia: avete il Disintegratore!', 'bene'); break;
      case 'campanella':
        audio.suona('campanella');
        mondo.campanella();
        if (e.regalo) hud.avviso("L'ultima campanella vi ha lasciato un regalo…", 'bene');
        break;
      case 'assaRotta': audio.suona('assaRotta'); break;
      case 'assaMessa': audio.suona('assaMessa'); break;
      case 'porta': audio.suona('porta'); hud.avviso('Porta aperta', 'bene'); break;
      case 'acquisto':
        if (!perMe) break;
        allinea(arsenale, e.armi, e.arma);
        audio.suona(e.potenziata ? 'potenziata' : 'acquisto');
        hud.avviso(ARMI[e.arma].nome, 'bene');
        break;
      case 'corrente': audio.suona('corrente'); hud.avviso('Corrente accesa!', 'bene'); break;
      case 'potenzia': if (perMe) { audio.suona('potenzia'); hud.avviso('Potenziamento in corso…', 'bene'); } break;
      case 'potenziataPronta': if (perMe) hud.avviso("Ritira l'arma potenziata!", 'bene'); break;
      case 'munizioni': if (perMe) { riempi(arsenale, e.arma); audio.suona('acquisto'); } break;
      case 'bevanda': if (perMe) { audio.suona('bevanda'); hud.avviso(BEVANDE[e.bevanda].nome, 'bene'); } break;
      case 'cassa': if (perMe) { audio.suona('cassa'); hud.avviso(`Prendi: ${ARMI[e.arma].nome}`, 'bene'); } break;
      case 'ferito': if (perMe) audio.suona('ferito'); break;
      case 'aTerra': audio.suona('aTerra'); hud.avviso(perMe ? 'Sei a terra!' : `${nomeDi(e.a)} è a terra!`); break;
      case 'rianimato': audio.suona('rianimato'); hud.avviso(perMe ? 'Sei di nuovo in piedi' : `${nomeDi(e.a)} è di nuovo in piedi`, 'bene'); break;
      case 'morto': hud.avviso(perMe ? 'Sei morto' : `${nomeDi(e.a)} è morto`); break;
      case 'rinato': if (perMe) azzera(arsenale); break;
      case 'fine': mostraFine(e); break;
      default:
    }
  }
}

function suMessaggio(m) {
  switch (m.t) {
    case 'ciao':
      if (!s.sonoHost) return;
      s.nomeAltro = pulisciNome(m.nome);
      if (s.partita && s.idAltro && s.idAltro !== m.id) rimuoviGiocatore(s.partita, s.idAltro);
      s.idAltro = m.id;
      if (s.fase === 'gioco' && s.partita) aggiungiGiocatore(s.partita, { id: m.id, nome: s.nomeAltro });
      inviaLobby();
      aggiornaStanza();
      return;
    case 'lobby':
      if (s.sonoHost) return;
      s.lobbyRicevuta = m.ospite === s.mioId;
      s.nomeAltro = pulisciNome(m.nomeHost);
      aggiornaStanza();
      return;
    case 'inizia':
      if (s.sonoHost || (s.fase === 'gioco' && m.seme === s.semeCorrente)) return;
      iniziaPartita(m.seme);
      return;
    case 'g':
      if (!s.sonoHost) return;
      riprendiOspite();
      s.remoto = { x: m.x, z: m.z, yaw: m.yaw, pitch: m.pitch, arma: m.arma, colpi: m.colpi, tp: m.tp };
      return;
    case 'az':
      if (!s.sonoHost || !s.idAltro) return;
      riprendiOspite();
      if (s.azioniRemote.length >= AZIONI_REMOTE_MASSIME) {
        const scartabile = s.azioniRemote.findIndex(a => a.tipo === 'colpo' || a.tipo === 'assa');
        s.azioniRemote.splice(scartabile >= 0 ? scartabile : 0, 1);
      }
      s.azioniRemote.push({ ...m.a, da: s.idAltro });
      return;
    case 'st': {
      if (s.sonoHost || s.fase === 'stanza' || m.g !== s.semeCorrente) return;
      const ultima = s.buffer[s.buffer.length - 1];
      if (ultima && m.ist.t <= ultima.vista.tempo) return;
      s.ultimoArrivo = performance.now();
      const campione = m.ist.t - s.ultimoArrivo / 1000;
      const salto = s.scarto === null || Math.abs(campione - s.scarto) > SCARTO_SALTO_S;
      s.scarto = salto ? campione : s.scarto + (campione - s.scarto) * SCARTO_PESO;
      s.buffer.push({ vista: espandi(m.ist) });
      if (s.buffer.length > BUFFER_MASSIMO) s.buffer.splice(0, s.buffer.length - BUFFER_MASSIMO);
      return;
    }
    case 'ev':
      if (!s.sonoHost && s.fase === 'gioco') suEventi(m.eventi);
      return;
    case 'ping':
      if (!s.sonoHost) s.coll.invia({ t: 'pong', n: m.n });
      return;
    case 'pong':
      if (s.sonoHost) s.ping = Math.round(performance.now() - m.n);
      return;
    default:
  }
}

function riprendiOspite() {
  if (s.fase !== 'gioco' || !s.partita || !s.idAltro || s.partita.giocatori.some(g => g.id === s.idAltro)) return;
  aggiungiGiocatore(s.partita, { id: s.idAltro, nome: s.nomeAltro ?? 'Amico' });
}

function tickHost(dt, ora) {
  const p = s.partita;
  if (s.idAltro && p.giocatori.some(g => g.id === s.idAltro) && s.coll.silenzio() > SILENZIO_RIMOZIONE_MS) rimuoviGiocatore(p, s.idAltro);
  if (s.fase === 'gioco') {
    s.accumulo = Math.min(s.accumulo + dt, RECUPERO_MASSIMO_S);
    const eventi = [];
    while (s.accumulo >= R.PASSO) {
      const posizioni = {};
      if (io.pronto) posizioni[s.mioId] = { x: io.x, z: io.z, yaw: io.yaw, pitch: io.pitch, arma: armaAttiva(arsenale).tipo, colpi: io.colpi, tp: io.tp };
      if (s.remoto && s.idAltro) posizioni[s.idAltro] = s.remoto;
      const azioni = [...s.azioniLocali.splice(0), ...s.azioniRemote.splice(0)];
      eventi.push(...passo(p, R.PASSO, { posizioni, azioni }));
      s.accumulo -= R.PASSO;
    }
    if (eventi.length && collegato()) s.coll.invia({ t: 'ev', eventi });
    suEventi(eventi);
  }
  if (collegato() && ora - s.ultimaIstantanea >= ISTANTANEE_OGNI_MS[modoRete()]) {
    s.coll.invia({ t: 'st', g: s.semeCorrente, ist: faiIstantanea(p) }, { veloce: true });
    s.ultimaIstantanea = ora;
  }
}

function tickOspite(ora) {
  if (s.fase !== 'gioco' || !io.pronto || ora - s.ultimoInvioG < GIOCATORE_OGNI_MS) return;
  s.coll.invia({ t: 'g', x: io.x, z: io.z, yaw: io.yaw, pitch: io.pitch, arma: armaAttiva(arsenale).tipo, colpi: io.colpi, tp: io.tp }, { veloce: true });
  s.ultimoInvioG = ora;
}

let ultimoTick = performance.now();
function tick() {
  const ora = performance.now();
  const dt = Math.min(RECUPERO_MASSIMO_S, (ora - ultimoTick) / 1000);
  ultimoTick = ora;
  if (s.coll && collegato()) {
    if (s.sonoHost && ora - s.ultimoPing > PING_OGNI_MS) {
      s.coll.invia({ t: 'ping', n: ora });
      s.ultimoPing = ora;
    }
    if (!s.sonoHost && !s.lobbyRicevuta && ora - s.ultimoCiao > CIAO_OGNI_MS) {
      s.coll.invia({ t: 'ciao', nome: s.nome, id: s.mioId });
      s.ultimoCiao = ora;
    }
  }
  if (s.fase !== 'gioco' && s.fase !== 'fine') return;
  if (s.sonoHost && s.partita) tickHost(dt, ora);
  else if (!s.sonoHost) tickOspite(ora);
}

function vistaOspite(ora) {
  if (s.buffer.length === 0 || s.scarto === null) return null;
  const tempo = ora / 1000 + s.scarto - RITARDO_VISTA_S[modoRete()];
  while (s.buffer.length > 2 && s.buffer[1].vista.tempo <= tempo) s.buffer.shift();
  const [a, b] = s.buffer;
  if (b && tempo > a.vista.tempo) return interpola(a.vista, b.vista, (tempo - a.vista.tempo) / Math.max(1e-6, b.vista.tempo - a.vista.tempo));
  return a.vista;
}

function muovi(lettura, me, dt) {
  const vivo = me.stato === 'vivo' && s.fase === 'gioco';
  io.inMira = vivo && lettura.mira && arsenale.ricarica === 0;
  io.corsa = vivo && lettura.corsa && lettura.avanti > 0 && !io.inMira;
  const lunghezza = Math.hypot(lettura.avanti, lettura.lato);
  io.movimento = vivo && lunghezza > 0 ? 1 : 0;
  if (!io.movimento) return;
  const velocita = (io.corsa ? R.VELOCITA_CORSA : R.VELOCITA) * (io.inMira ? 0.6 : 1);
  const avanti = lettura.avanti / lunghezza;
  const lato = lettura.lato / lunghezza;
  const dx = (Math.sin(io.yaw) * avanti - Math.cos(io.yaw) * lato) * velocita * dt;
  const dz = (Math.cos(io.yaw) * avanti + Math.sin(io.yaw) * lato) * velocita * dt;
  const nuova = muoviCerchio(io, dx, dz, R.RAGGIO_GIOCATORE, scatole(s.vista.porte, false));
  io.x = nuova.x;
  io.z = nuova.z;
}

function sparaColpo(arma, vista) {
  io.colpi += 1;
  mondo.spara();
  audio.sparo(armaAttiva(arsenale).tipo);
  const origine = { x: io.x, y: R.ALTEZZA_OCCHI, z: io.z };
  const centro = direzioneDa(io.yaw, io.pitch);
  const bersagli = mondo.bersagli(vista);
  const ostacoli = scatole(vista.porte, true);
  const colpiti = new Map();
  for (let i = 0; i < arma.pallini; i++) {
    const d = disperdi(centro, arma.dispersione * (io.inMira ? 0.4 : 1) * (io.movimento ? 1.6 : 1), Math.random);
    const colpo = colpisciZombie(origine, d, bersagli, ostacoli, arma.portata ?? (arma.esplosione ? PORTATA_RAGGI : Infinity));
    if (arma.fiamma) mondo.effetti.fiamma(mondo.bocca(), d, arma.colore);
    if (!Number.isFinite(colpo.t)) continue;
    const punto = { x: origine.x + d.x * colpo.t, y: origine.y + d.y * colpo.t, z: origine.z + d.z * colpo.t };
    if (arma.esplosione) {
      mondo.raggio(punto, arma.colore ?? undefined);
      mondo.effetti.esplosione(punto, arma.esplosione.tipo, arma.esplosione.colore ?? arma.colore ?? null);
      for (const { id, fattore } of esplosione(punto, bersagli, arma.esplosione.raggio)) {
        if (id === colpo.id) continue;
        const somma = colpiti.get(id) ?? { danno: 0, testa: false };
        somma.danno += Math.round(arma.esplosione.danno * fattore);
        colpiti.set(id, somma);
      }
    }
    if (colpo.id === null) {
      mondo.effetti.impatto(punto);
      continue;
    }
    mondo.effetti.sangue(punto, d);
    const somma = colpiti.get(colpo.id) ?? { danno: 0, testa: false };
    somma.danno += colpo.testa ? arma.danno * 2 : arma.danno;
    somma.testa ||= colpo.testa;
    colpiti.set(colpo.id, somma);
  }
  for (const [zombie, { danno, testa }] of colpiti) {
    inviaAzione({ tipo: 'colpo', zombie, danno, testa });
    hud.segno(testa);
    audio.suona(testa ? 'testa' : 'carne');
  }
}

function usaArmi(lettura, me, vista, dt) {
  if (aggiornaArsenale(arsenale, dt)) audio.suona('ricarica');
  if (me.stato !== 'vivo' || s.fase !== 'gioco') return;
  for (const azione of lettura.azioni) {
    if (azione === 'pronto') {
      if (vista.fase === 'attesa') inviaAzione({ tipo: 'pronto', attivo: !me.pronto });
    } else if (azione === 'ricarica' && ricarica(arsenale, me.bevande)) audio.suona('ricarica');
    else if (azione === 'cambia') cambia(arsenale);
    else if (azione?.arma !== undefined) cambia(arsenale, azione.arma);
    else if (azione === 'coltello' && coltellata(arsenale)) {
      audio.suona('coltello');
      const d = direzioneDa(io.yaw, Math.min(io.pitch, -0.15));
      const colpo = colpisciZombie({ x: io.x, y: R.ALTEZZA_OCCHI, z: io.z }, d, mondo.bersagli(vista), scatole(vista.porte, true), COLTELLO.portata);
      if (colpo.id !== null) {
        inviaAzione({ tipo: 'colpo', zombie: colpo.id, danno: COLTELLO.danno, coltello: true });
        audio.suona('carne');
        hud.segno(false);
      }
    }
  }
  const arma = ARMI[armaAttiva(arsenale).tipo];
  const vuole = locale.sparoForzato || (arma.automatica ? lettura.sparo : lettura.sparoPremuto);
  locale.sparoForzato = false;
  if (!vuole || io.corsa) return;
  if (armaAttiva(arsenale).caricatore === 0) {
    if (!ricarica(arsenale, me.bevande) && performance.now() / 1000 - locale.ultimoVuoto > VUOTO_OGNI_S) {
      audio.suona('vuoto');
      locale.ultimoVuoto = performance.now() / 1000;
    }
    return;
  }
  const colpo = spara(arsenale);
  if (!colpo) return;
  if (vista.effetti?.infinite > 0) armaAttiva(arsenale).caricatore += 1;
  sparaColpo(colpo, vista);
  if (armaAttiva(arsenale).caricatore === 0) ricarica(arsenale, me.bevande);
}

function interagisci(lettura, me, vista) {
  const interazione = me.stato === 'vivo' && s.fase === 'gioco' ? interazioneVicina({ id: s.mioId, x: io.x, z: io.z, armi: me.armi, bevande: me.bevande, armaAttiva: armaAttiva(arsenale).tipo }, vista) : null;
  if (locale.inRianimazione && (!lettura.f || interazione?.tipo !== 'rianima')) {
    inviaAzione({ tipo: 'rianima', attivo: false });
    locale.inRianimazione = false;
  }
  if (!interazione) return null;
  const oraS = performance.now() / 1000;
  const ripetuto = locale.ultimoAcquisto.id === interazione.acquisto && oraS - locale.ultimoAcquisto.quando < RIPETI_ACQUISTO_DOPO_S;
  if (lettura.fPremuto && interazione.tipo === 'compra' && !ripetuto && Number.isFinite(interazione.costo)) {
    if (interazione.costo > me.punti) hud.avviso('Non hai abbastanza punti');
    else {
      inviaAzione({ tipo: 'compra', acquisto: interazione.acquisto, arma: armaAttiva(arsenale).tipo });
      locale.ultimoAcquisto = { id: interazione.acquisto, quando: oraS };
    }
  }
  if (lettura.fPremuto && (interazione.tipo === 'prova' || interazione.tipo === 'frammento') && !ripetuto) {
    inviaAzione(interazione.tipo === 'prova' ? { tipo: 'prova', arma: interazione.arma } : { tipo: 'frammento', id: interazione.id });
    locale.ultimoAcquisto = { id: interazione.acquisto, quando: oraS };
  }
  if (lettura.f && interazione.tipo === 'rianima' && !locale.inRianimazione) {
    inviaAzione({ tipo: 'rianima', attivo: true });
    locale.inRianimazione = true;
  }
  if (lettura.f && interazione.tipo === 'assa' && oraS - locale.ultimaAssa > ASSA_OGNI_S) {
    inviaAzione({ tipo: 'assa', finestra: interazione.finestra });
    locale.ultimaAssa = oraS;
  }
  return interazione;
}

function suoniAmbiente(vista, dt) {
  for (const z of vista.zombie) {
    if (z.stato === 'morto' || Math.random() > dt * LAMENTI_AL_SECONDO) continue;
    const dx = z.x - io.x;
    const dz = z.z - io.z;
    audio.lamento(Math.hypot(dx, dz), Math.atan2(dx, dz) - io.yaw);
  }
  for (const g of vista.giocatori) {
    if (g.id === s.mioId) continue;
    const visti = s.colpiVisti.get(g.id) ?? g.colpi;
    if (g.colpi > visti) audio.sparo(g.armaAttiva, Math.hypot(g.x - io.x, g.z - io.z) + 1, Math.atan2(g.x - io.x, g.z - io.z) - io.yaw);
    s.colpiVisti.set(g.id, g.colpi);
  }
}

let ultimoFotogramma = performance.now();
let fps = 60;
function ciclo(ora) {
  const dt = Math.min(0.1, (ora - ultimoFotogramma) / 1000);
  ultimoFotogramma = ora;
  if (dt > 0) fps += (1 / dt - fps) * 0.05;
  if ((s.fase === 'gioco' || s.fase === 'fine') && mondo) {
    const vista = s.sonoHost ? (s.partita ? espandi(faiIstantanea(s.partita)) : null) : vistaOspite(ora);
    const me = vista?.giocatori.find(g => g.id === s.mioId);
    if (vista && me) {
      s.vista = vista;
      if (!io.pronto || me.teletrasporto > io.tp) Object.assign(io, { x: me.x, z: me.z, yaw: me.yaw, tp: me.teletrasporto, pronto: true });
      if (vista.fase === 'fine' && s.fase === 'gioco') mostraFine({ round: vista.round, giocatori: vista.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
      const lettura = comandi.leggi();
      comandi.applicaVista(io);
      muovi(lettura, me, dt);
      usaArmi(lettura, me, vista, dt);
      if (vista.fase === 'attesa') for (const a of arsenale.armi) a.riserva = ARMI[a.tipo].riserva;
      const interazione = interagisci(lettura, me, vista);
      suoniAmbiente(vista, dt);
      const ferito = vista.giocatori.find(g => g.id !== s.mioId && g.stato === 'terra');
      const tipo = armaAttiva(arsenale).tipo;
      const cannocchiale = io.inMira && ARMI[tipo].mirino === true;
      mondo.disegna(vista, {
        io, mioId: s.mioId, dt, arma: tipo, movimento: io.movimento, corsa: io.corsa, inMira: io.inMira, cannocchiale,
        ricarica: arsenale.ricarica > 0 ? Math.sin(Math.min(1, arsenale.ricarica) * Math.PI) : 0,
        cambio: arsenale.cambio > 0 ? 1 : 0, coltellata: arsenale.coltello / COLTELLO.attesa, aTerra: me.stato === 'terra', morto: me.stato === 'morto',
      });
      hud.aggiorna({
        vista, mioId: s.mioId, arma: armaAttiva(arsenale), suggerimento: interazione?.testo ?? null,
        rianimazione: locale.inRianimazione && ferito ? ferito.progressoRianimazione / (me.bevande.includes('ritorno') ? R.RIANIMA_RAPIDO : R.RIANIMA_IN) : null,
        inMira: io.inMira, cannocchiale, bloccato: comandi.bloccato || s.fase !== 'gioco', rete: [testoRete(), `${Math.round(fps)} fps`].filter(Boolean).join(' · '),
        apertura: 6 + (io.movimento ? 6 : 0) + (io.corsa ? 8 : 0) - (io.inMira ? 4 : 0),
      });
    }
  }
  requestAnimationFrame(ciclo);
}

$('crea').addEventListener('click', () => {
  if (leggiNome()) entraInStanza(true, codiceStanza());
});
$('entra').addEventListener('click', () => {
  if (!leggiNome()) return;
  const codice = normalizzaCodice($('codice').value);
  if (!codice) {
    errore('Il codice ha 4 lettere (es. KXRT).');
    $('codice').focus();
    return;
  }
  entraInStanza(false, codice);
});
$('modulo-inizio').addEventListener('submit', e => e.preventDefault());
$('nome').addEventListener('keydown', e => {
  if (e.key !== 'Enter' || $('crea').disabled) return;
  e.preventDefault();
  ($('codice').value.trim() ? $('entra') : $('crea')).click();
});
$('codice').addEventListener('keydown', e => {
  if (e.key !== 'Enter' || $('entra').disabled) return;
  e.preventDefault();
  $('entra').click();
});
$('codice').addEventListener('input', () => errore(''));
$('nome').addEventListener('input', () => errore(''));
$('copia').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('link').value);
    $('copia').textContent = 'Copiato!';
  } catch {
    $('link').select();
    $('copia').textContent = 'Premi Ctrl+C';
  }
});
$('parti').addEventListener('click', partiComeHost);
$('rigioca').addEventListener('click', partiComeHost);
comandi.suBlocco(bloccato => {
  if (bloccato) audio.prepara();
});

$('nome').value = leggiNomeSalvato();
const codiceInvito = normalizzaCodice(PARAMETRI.get('stanza'));
if (codiceInvito) {
  $('codice').value = codiceInvito;
  $('crea').classList.remove('primario');
  $('entra').classList.add('primario');
}
mostraSchermata('schermata-inizio');
$('nome').focus();
requestAnimationFrame(ciclo);
const orologio = new Worker(new URL('./orologio-worker.js', import.meta.url));
orologio.onmessage = tick;

creaMondo($('mondo')).then(m => {
  mondo = m;
  $('crea').disabled = false;
  $('crea').textContent = 'Crea una stanza';
  $('entra').disabled = false;
}).catch(e => {
  console.error('Caricamento della grafica non riuscito:', e);
  errore('Non riesco a caricare la grafica del gioco. Ricarica la pagina.');
  $('crea').textContent = 'Errore';
});

if (import.meta.env.DEV) {
  window.__gioco = {
    stato: () => ({ fps: Math.round(fps), fase: s.fase, mioId: s.mioId, modo: s.coll?.modo ?? null, vista: s.vista, io: { ...io }, arma: { ...armaAttiva(arsenale) }, armi: arsenale.armi.map(a => a.tipo), nomeAltro: s.nomeAltro, buffer: s.buffer.length }),
    partita: () => s.partita,
    puntaA(x, y, z) {
      io.yaw = Math.atan2(x - io.x, z - io.z);
      io.pitch = Math.atan2(y - R.ALTEZZA_OCCHI, Math.hypot(x - io.x, z - io.z));
    },
    vaiA(x, z) {
      io.x = x;
      io.z = z;
    },
    spara() {
      locale.sparoForzato = true;
    },
    azione: a => inviaAzione(a),
    pronto: () => mondo !== null,
  };
}
