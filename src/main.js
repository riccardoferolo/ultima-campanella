import './stile.css';
import { R, ARMI, BEVANDE, BONUS, COLTELLO, PISTOLE_INIZIALI, ASPETTI, saltiArco, fattoreBevande, modoRicarica, dannoColtello } from './regole.js';
import { semeCasuale } from './caso.js';
import { MURI, OSTACOLI, PORTE, ACQUISTI, ZONE, ELENCO_MAPPE, NOMI_MAPPE, usaMappa, mappaAttiva, ostacoliPerGiocatori, scatolaAcquisto } from './mappa.js';
import { messaggioRadio, RUNE } from './storia.js';
import { muoviCerchio } from './fisica.js';
import { CORPO, colpisciZombie, direzioneDa, disperdi, esplosione, primoMuro } from './colpi.js';
import { creaArsenale, armaAttiva, aggiorna as aggiornaArsenale, spara, ricarica, coltellata, cambia, allinea, riempi, azzera, bevi } from './arsenale.js';
import { DURATA_BEVUTA } from './grafica/vista1p.js';
import { interazioneVicina } from './interazioni.js';
import { creaPartita, passo, aggiungiGiocatore, rimuoviGiocatore } from './partita.js';
import { faiIstantanea, espandi, interpola } from './istantanea.js';
import { apriSegnali } from './rete/segnali.js';
import { collega, collegaHost } from './rete/collegamento.js';
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
const AZIONI_REMOTE_MASSIME = 160;
const RIPETI_ACQUISTO_DOPO_S = 1;
const SALTO_ARCO = 6;
const ALTEZZA_SCARICA = 1.25;
const DURATA_AFFONDO = 0.14;
const MIRA_POMPA = 0.8;
const PORTATA_TRACCIA = 30;
const FERMATI_PRIMA = 0.55;
const COLPITI_COLTELLO = 2;
const COLPITI_RELIQUIA = 3;
const BOSS_MINORI = new Set(['preside', 'sciamano', 'guardiano']);
const TESTI_BOSS = {
  sciamano: 'Lo Sciamano esce dalla giungla: tamburi in lontananza…',
  guardiano: 'Le pietre del sole si allineano… il Guardiano si sveglia!',
};
const TESTI_BOSS_UCCISO = {
  preside: 'Il Preside è morto!',
  sciamano: 'Lo Sciamano è caduto!',
  guardiano: 'Il Guardiano del Sole è caduto: ha lasciato una spada!',
};
const FASI_DIVORATORE = {
  2: 'Il Divoratore si copre di scaglie: rompetele con le reliquie!',
  3: 'Il Divoratore chiama lo sciame!',
  4: 'Il tempio crolla: attenti ai massi!',
};

const $ = id => document.getElementById(id);
const schermate = ['schermata-inizio', 'schermata-stanza', 'schermata-fine'].map($);
const mostraSchermata = id => schermate.forEach(sch => { sch.hidden = sch.id !== id; });

const hud = creaHud();
const audio = creaAudio();
const comandi = creaComandi($('mondo'));
const mondi = new Map();
let mondo = null;

const s = {
  mioId: crypto.randomUUID(),
  nome: null,
  sonoHost: false,
  stanza: null,
  coll: null,
  nomeHost: null,
  ospiti: new Map(),
  nomiStanza: [],
  pingOspiti: new Map(),
  fase: 'inizio',
  partita: null,
  semeCorrente: null,
  buffer: [],
  scarto: null,
  ultimoArrivo: 0,
  vista: null,
  azioniLocali: [],
  azioniRemote: [],
  accumulo: 0,
  ultimaIstantanea: 0,
  ultimoInvioG: 0,
  ultimoPing: 0,
  ultimoCiao: 0,
  lobbyRicevuta: false,
  ping: null,
  statoSegnali: null,
  colpiVisti: new Map(),
  giro: 0,
  mappaDaAprire: null,
};

const io = { x: 0, z: 0, yaw: Math.PI, pitch: 0, pronto: false, tp: 0, colpi: 0, movimento: 0, corsa: false, inMira: false };
const arsenale = creaArsenale();
const locale = { inRianimazione: false, ultimaAssa: 0, ultimoVuoto: 0, sparoForzato: false, ultimoAcquisto: { id: null, quando: 0 }, affondo: null, aspetto: null };
const cacheScatole = new Map();

const collegato = () => s.coll && (s.coll.modo === 'diretto' || s.coll.modo === 'riserva');
const modoRete = () => (s.coll?.modo === 'diretto' ? 'diretto' : 'riserva');
const miaPistola = () => s.vista?.giocatori.find(g => g.id === s.mioId)?.pistola;

async function apriMondo(mappa) {
  usaMappa(mappa);
  if (!mondi.has(mappa)) mondi.set(mappa, creaMondo($('mondo'), mappa));
  let pronto;
  try {
    pronto = await mondi.get(mappa);
  } catch (e) {
    mondi.delete(mappa);
    throw e;
  }
  for (const altro of mondi.values()) altro.then(m => { m.tela.style.display = m === pronto ? '' : 'none'; }, () => {});
  return pronto;
}

function scatole(porte, perSparo) {
  const chiave = `${mappaAttiva}|${perSparo}|${[...porte].sort().join(',')}`;
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

const elencoNomi = nomi => (nomi.length < 2 ? nomi.join('') : `${nomi.slice(0, -1).join(', ')} e ${nomi[nomi.length - 1]}`);
const amici = () => (s.sonoHost ? [...s.ospiti.values()].map(o => o.nome) : s.nomiStanza.filter(n => n !== s.nome));

function testoRete() {
  if (!s.coll) return '';
  if (s.sonoHost && s.ospiti.size === 0) return 'da solo';
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
    stato.textContent = 'Questa stanza è piena: ci sono già 4 giocatori.';
    stato.dataset.tipo = 'errore';
  } else if (s.statoSegnali === 'offline' && !collegato()) {
    stato.textContent = 'Il server dei collegamenti non risponde, riprovo…';
    stato.dataset.tipo = 'errore';
  } else if (collegato() && amici().length) {
    const posti = s.sonoHost ? ` · ${4 - 1 - s.ospiti.size} posti liberi` : '';
    stato.textContent = `Insieme a ${elencoNomi(amici())} ${s.coll.modo === 'diretto' ? '(diretto)' : '(via Supabase)'}${posti}`;
    stato.dataset.tipo = 'ok';
  } else {
    stato.textContent = s.sonoHost ? 'Aspetto i tuoi amici (fino a 3)… mandagli il link. Puoi anche entrare da solo.' : 'Mi collego alla stanza…';
    stato.dataset.tipo = 'attesa';
  }
  $('parti').textContent = amici().length && collegato() ? 'Entrate nella scuola' : 'Entra da solo';
  $('nota-stanza').textContent = s.sonoHost ? 'Chi arriva dopo entra direttamente nella partita.' : s.nomeHost ? `Aspetta che ${s.nomeHost} apra la scuola.` : '';
}

function inviaLobby() {
  if (!s.sonoHost || !collegato()) return;
  const giocatori = [s.nome, ...[...s.ospiti.values()].map(o => o.nome)];
  const mappa = s.partita?.mappa ?? mappaAttiva;
  for (const id of s.ospiti.keys()) s.coll.inviaA(id, { t: 'lobby', nomeHost: s.nome, ospite: id, giocatori, mappa });
  if (s.fase === 'gioco') s.coll.invia({ t: 'inizia', seme: s.semeCorrente, mappa });
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
  s.coll = sonoHost ? collegaHost({ segnali, mioId: s.mioId, soloRiserva: SOLO_RISERVA }) : collega({ segnali, sonoHost, mioId: s.mioId, soloRiserva: SOLO_RISERVA });
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

async function iniziaPartita(seme, { daClic = false, mappa = 'scuola' } = {}) {
  const giro = ++s.giro;
  const scelte = new Map((s.partita?.giocatori ?? s.vista?.giocatori ?? []).map(g => [g.id, { pistola: g.pistola, aspetto: g.aspetto }]));
  s.fase = 'carico';
  s.semeCorrente = seme;
  s.buffer = [];
  s.scarto = null;
  s.vista = null;
  s.mappaDaAprire = null;
  if (mondo?.mappa !== mappa) hud.avviso(`Si parte: ${NOMI_MAPPE[mappa] ?? mappa}…`, 'bene');
  let nuovo;
  try {
    nuovo = await apriMondo(mappa);
  } catch (e) {
    console.error('Caricamento della mappa non riuscito:', e);
    if (giro === s.giro) hud.avviso('Non riesco a caricare la mappa: ricarica la pagina');
    return;
  }
  if (giro !== s.giro) return;
  mondo = nuovo;
  s.accumulo = 0;
  s.azioniLocali = [];
  s.azioniRemote = [];
  s.ospiti.forEach(o => { o.remoto = null; });
  s.colpiVisti.clear();
  azzera(arsenale, scelte.get(s.mioId)?.pistola);
  Object.assign(io, { pronto: false, tp: 0, colpi: 0, pitch: 0 });
  Object.assign(locale, { inRianimazione: false, affondo: null, aspetto: null });
  mondo.svuota();
  if (s.sonoHost) {
    const giocatori = [{ id: s.mioId, nome: s.nome }];
    for (const [id, o] of s.ospiti) if (s.coll.collegato(id)) giocatori.push({ id, nome: o.nome });
    s.partita = creaPartita({ seme, giocatori: giocatori.map(g => ({ ...g, ...scelte.get(g.id) })), sala: true, mappa });
  }
  s.fase = 'gioco';
  mostraSchermata(null);
  hud.mostra(true);
  comandi.attiva(true);
  document.activeElement?.blur();
  if (daClic) comandi.blocca();
}

function partiComeHost(mappa = s.partita?.mappa ?? 'scuola', daClic = true) {
  if (!s.sonoHost) return;
  const seme = semeCasuale();
  iniziaPartita(seme, { daClic, mappa });
  if (collegato()) s.coll.invia({ t: 'inizia', seme, mappa });
}

function mostraFine(evento) {
  if (s.fase !== 'gioco') return;
  s.fase = 'fine';
  comandi.attiva(false);
  audio.suona(evento.vinto ? 'vittoria' : 'fine');
  document.querySelector('.titolo-fine').textContent = evento.vinto ? 'Avete vinto!' : 'Siete morti';
  const minuti = Math.floor((evento.durata ?? 0) / 60);
  const secondi = String((evento.durata ?? 0) % 60).padStart(2, '0');
  const impresa = mappaAttiva === 'giungla'
    ? `Avete abbattuto il Divoratore e siete decollati dalla giungla al round ${evento.round}`
    : `Avete suonato l'ultima campanella e abbattuto il Custode al round ${evento.round}`;
  $('t-dettaglio').textContent = evento.vinto
    ? `${impresa}${evento.durata ? ` dopo ${minuti}:${secondi} di battaglia` : ''}.`
    : evento.round > 1 ? `Siete sopravvissuti fino al round ${evento.round}.` : 'Non siete andati oltre il primo round.';
  $('t-tabella').replaceChildren(...evento.giocatori.map(g => {
    const riga = document.createElement('div');
    riga.textContent = `${g.nome} — ${g.uccisioni} zombie, ${g.punti} punti`;
    return riga;
  }));
  $('rigioca').hidden = !s.sonoHost;
  $('t-attesa-host').textContent = s.sonoHost ? '' : `Aspetta che ${s.nomeHost ?? "chi ha creato la stanza"} faccia ripartire.`;
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
        else if (e.frantumato) {
          mondo.frantuma(e.zombie, e.x, e.z);
          audio.suona('frantumato');
        } else if (e.testa) mondo.decapita(e.zombie);
        if (e.da === s.mioId) hud.uccisione();
        break;
      case 'esplosione':
        mondo.effetti.esplosione({ x: e.x, y: e.y + 0.3, z: e.z }, 'fuoco');
        mondo.effetti.esplosione({ x: e.x, y: e.y + 0.8, z: e.z }, 'fuoco', 0xffc070);
        audio.esplosione(Math.hypot(e.x - io.x, e.z - io.z), Math.atan2(e.x - io.x, e.z - io.z) - io.yaw);
        break;
      case 'boss': audio.suona('boss'); hud.avviso(TESTI_BOSS[e.tipo] ?? (e.fusibile ? 'Il Preside è arrivato… e ha qualcosa in tasca' : 'Il Preside è tornato!')); break;
      case 'infuriato': audio.suona('urlo'); hud.avviso('Il Preside si è infuriato!'); break;
      case 'bossUcciso': audio.suona('bossUcciso'); if (TESTI_BOSS_UCCISO[e.tipo]) hud.avviso(TESTI_BOSS_UCCISO[e.tipo], 'bene'); break;
      case 'fusibileCaduto': hud.avviso('Il Preside ha perso un fusibile!', 'bene'); break;
      case 'fusibile': audio.suona('fusibile'); hud.avviso(`Fusibile ${e.trovati}/${e.totale}`, 'bene'); break;
      case 'fusibiliMessi': audio.suona('fusibile'); hud.avviso(`Quadro del cancello: ${e.messi}/${e.totale}`, 'bene'); break;
      case 'rifugio': audio.suona('rifugio'); hud.avviso('Il cancello del rifugio si apre…', 'bene'); break;
      case 'generatore': audio.suona('generatore'); hud.avviso('Generatore acceso: difendetelo!'); break;
      case 'generatoreFinito': audio.suona('fusibile'); hud.avviso('Il generatore ha sputato un fusibile!', 'bene'); break;
      case 'finale': audio.suona('finale'); hud.avviso(e.mappa === 'giungla' ? 'Il cuore del tempio si apre… il Divoratore si sveglia' : 'Il cancello si chiude… il Custode si sveglia'); break;
      case 'faseBoss':
        audio.suona('urlo');
        if (e.tipo === 'divoratore') hud.avviso(FASI_DIVORATORE[e.fase] ?? 'Il Divoratore si infuria!');
        else hud.avviso(e.fase === 2 ? 'Il Custode si infuria!' : 'Il Custode è fuori di sé!');
        break;
      case 'urlo': audio.suona('urlo'); hud.avviso(mappaAttiva === 'giungla' ? 'Il Divoratore chiama i suoi!' : 'Il Custode chiama i suoi!'); break;
      case 'mappaScelta':
        hud.avviso(`Mappa: ${NOMI_MAPPE[e.mappa] ?? e.mappa}`, 'bene');
        if (s.sonoHost) s.mappaDaAprire = e.mappa;
        break;
      case 'generatoreG': audio.suona('generatore'); hud.avviso(`Generatore ${e.n + 1} acceso: restategli vicino e difendetelo!`); break;
      case 'generatoreGFinito': audio.suona('fusibile'); hud.avviso(`Generatore ${e.n + 1} a pieno regime`, 'bene'); break;
      case 'radio': audio.suona('radio'); hud.radio(messaggioRadio(e.n, s.vista?.giungla?.ordine)); break;
      case 'assi': audio.suona('fusibile'); hud.avviso(`Assi del ponte ${e.trovate}/${e.totale}`, 'bene'); break;
      case 'assiPortate': audio.suona('assaMessa'); hud.avviso(`Assi al cantiere ${e.portate}/${e.totale}`, 'bene'); break;
      case 'ponteCantiere': audio.suona('generatore'); hud.avviso('Si costruisce il ponte: restate al cantiere e difendetelo!'); break;
      case 'ponte': audio.suona('rifugio'); hud.avviso('Il ponte regge: si passa il fiume!', 'bene'); break;
      case 'scheggia': audio.suona('frammento'); hud.avviso(`Scheggia di giada ${e.trovate}/3`, 'bene'); break;
      case 'scheggeAltare': audio.suona('fusibile'); hud.avviso(`Schegge sull'altare ${e.messe}/${e.totale}`, 'bene'); break;
      case 'forgia': audio.suona('potenzia'); hud.avviso("L'altare si accende: a fine round la giada sarà forgiata", 'bene'); break;
      case 'reliquiaPronta': audio.suona('segreto'); hud.avviso(`${ARMI[e.arma]?.nome ?? e.arma} vi aspetta: andate a prenderla!`, 'bene'); break;
      case 'reliquia': audio.suona('segreto'); hud.avviso(e.da === s.mioId ? `Hai ${ARMI[e.arma]?.nome ?? e.arma}: uccidi per caricarla, poi E` : `${nomeDi(e.da)} ha preso ${ARMI[e.arma]?.nome ?? e.arma}`, 'bene'); break;
      case 'reliquiaTornata': hud.avviso(`${ARMI[e.arma]?.nome ?? e.arma} è tornata al suo posto`); break;
      case 'anima':
        mondo.anima(e);
        audio.suona('anima');
        if (e.anime === 6) hud.avviso('Un idolo è sazio', 'bene');
        break;
      case 'maschera': audio.suona('fusibile'); hud.avviso('Avete la maschera dello Sciamano: portatela alla porta del tempio', 'bene'); break;
      case 'mascheraCaduta': hud.avviso('Lo Sciamano ha perso la maschera!', 'bene'); break;
      case 'mascheraMessa': audio.suona('rifugio'); hud.avviso('La maschera si incastra nella porta…', 'bene'); break;
      case 'portaTempio': audio.suona('generatore'); hud.avviso('La porta del tempio si apre piano: difendetela!'); break;
      case 'tempioAperto': audio.suona('rifugio'); hud.avviso('Il tempio è aperto!', 'bene'); break;
      case 'pietraGirata': audio.suona('pietra'); break;
      case 'runa': audio.suona('fusibile'); hud.avviso(`Runa del ${RUNE[e.runa] ?? '?'} (${e.giuste}/4)`, 'bene'); break;
      case 'runaSbagliata': audio.suona('urlo'); hud.avviso('Ordine sbagliato: le rune si spengono e il tempio si sveglia!'); break;
      case 'runeComplete': audio.suona('segreto'); hud.avviso('Le rune brillano: spezzate il sigillo con un colpo speciale!', 'bene'); break;
      case 'sigilloRotto': audio.suona('implosione'); hud.avviso('Il sigillo è spezzato: tutti nel cuore del tempio!', 'bene'); break;
      case 'presagio': hud.avviso('Tamburi tra gli alberi… qualcosa sta arrivando'); break;
      case 'evocazione':
        mondo.effetti.esplosione({ x: e.x, y: 1, z: e.z }, 'energia', 0x7dff6a);
        audio.suona('evocazione');
        break;
      case 'speciale':
        mondo.speciale(e);
        audio.suona(`speciale_${e.tipo}`);
        break;
      case 'pietra':
        mondo.pietra(e);
        audio.esplosione(Math.hypot(e.x - io.x, e.z - io.z), Math.atan2(e.x - io.x, e.z - io.z) - io.yaw);
        break;
      case 'fuga': audio.suona('finale'); hud.avviso(`Il Divoratore è morto! Tutti all'aereo sulla pista: ${e.secondi} s`, 'bene'); break;
      case 'fugaFallita': hud.avviso("L'aereo è partito senza di voi…"); break;
      case 'scatto': audio.suona('scatto'); break;
      case 'sfera': if (!perMe) audio.suona('sfera'); break;
      case 'buco': audio.suona('buco'); break;
      case 'implosione':
        mondo.effetti.esplosione({ x: e.x, y: e.y, z: e.z }, 'energia', 0xb06cff);
        mondo.effetti.esplosione({ x: e.x, y: e.y, z: e.z }, 'fuoco', 0xffb070);
        audio.suona('implosione');
        break;
      case 'congelato': audio.suona('congelato'); break;
      case 'arco': disegnaArco(e); break;
      case 'vittoria': mostraFine({ ...e, vinto: true }); break;
      case 'via': azzera(arsenale, miaPistola()); audio.suona('round'); hud.avviso(mappaAttiva === 'giungla' ? 'Si comincia! La giungla non perdona' : 'Si comincia! Restate vicini', 'bene'); break;
      case 'conto': audio.suona('conto'); break;
      case 'contoAnnullato': hud.avviso('Partenza annullata: qualcuno non è pronto'); break;
      case 'bonusCompare': audio.suona('bonusCompare'); break;
      case 'bonus':
        audio.suona(e.tipo === 'bomba' ? 'bomba' : 'bonus');
        hud.avviso(`${BONUS[e.tipo].nome} — ${BONUS[e.tipo].descrizione}`, 'bene');
        if (e.tipo === 'munizioni') arsenale.armi.forEach(a => riempi(arsenale, a.tipo));
        break;
      case 'frammento': audio.suona('frammento'); hud.avviso(`Frammento di meteorite ${e.trovati}/${e.totale}`, 'bene'); break;
      case 'segreto': audio.suona('segreto'); hud.avviso("La meteorite si risveglia: avete l'Orizzonte degli Eventi!", 'bene'); break;
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
      case 'bevanda':
        if (!perMe) break;
        bevi(arsenale, DURATA_BEVUTA);
        mondo.bevi(e.bevanda);
        audio.suona('sorsi');
        setTimeout(() => {
          hud.sorso(BEVANDE[e.bevanda].colore);
          hud.avviso(`${BEVANDE[e.bevanda].nome}: ${BEVANDE[e.bevanda].descrizione}`, 'bene');
        }, DURATA_BEVUTA * 850);
        break;
      case 'cassa': if (perMe) { audio.suona('cassa'); hud.avviso(`Prendi: ${ARMI[e.arma].nome}`, 'bene'); } break;
      case 'ferito': if (perMe) audio.suona('ferito'); break;
      case 'aTerra': audio.suona('aTerra'); hud.avviso(perMe ? 'Sei a terra!' : `${nomeDi(e.a)} è a terra!`); break;
      case 'rianimato': audio.suona('rianimato'); hud.avviso(perMe ? 'Sei di nuovo in piedi' : `${nomeDi(e.a)} è di nuovo in piedi`, 'bene'); break;
      case 'morto': hud.avviso(perMe ? 'Sei morto' : `${nomeDi(e.a)} è morto`); break;
      case 'rinato': if (perMe) azzera(arsenale, miaPistola()); break;
      case 'armi': if (perMe) allinea(arsenale, e.armi); break;
      case 'fine': mostraFine(e); break;
      default:
    }
  }
}

function suMessaggio(m, da) {
  switch (m.t) {
    case 'ciao': {
      if (!s.sonoHost || !da || m.id !== da) return;
      const nome = pulisciNome(m.nome) ?? 'Amico';
      const ospite = s.ospiti.get(da) ?? { nome, remoto: null };
      ospite.nome = nome;
      s.ospiti.set(da, ospite);
      if (s.fase === 'gioco' && s.partita) aggiungiGiocatore(s.partita, { id: da, nome });
      inviaLobby();
      aggiornaStanza();
      return;
    }
    case 'lobby':
      if (s.sonoHost) return;
      s.lobbyRicevuta = m.ospite === s.mioId;
      s.nomeHost = pulisciNome(m.nomeHost);
      s.nomiStanza = (m.giocatori ?? []).map(pulisciNome).filter(Boolean);
      aggiornaStanza();
      return;
    case 'inizia':
      if (s.sonoHost || m.seme === s.semeCorrente) return;
      iniziaPartita(m.seme, { mappa: m.mappa ?? 'scuola' });
      return;
    case 'g': {
      const ospite = s.sonoHost ? s.ospiti.get(da) : null;
      if (!ospite) return;
      riprendiOspite(da);
      ospite.remoto = { x: m.x, z: m.z, yaw: m.yaw, pitch: m.pitch, arma: m.arma, colpi: m.colpi, tp: m.tp };
      return;
    }
    case 'az':
      if (!s.sonoHost || !s.ospiti.has(da) || (m.a.tipo === 'scegli' && m.a.cosa === 'mappa')) return;
      riprendiOspite(da);
      if (s.azioniRemote.length >= AZIONI_REMOTE_MASSIME) {
        const scartabile = s.azioniRemote.findIndex(a => a.tipo === 'colpo' || a.tipo === 'assa');
        s.azioniRemote.splice(scartabile >= 0 ? scartabile : 0, 1);
      }
      s.azioniRemote.push({ ...m.a, da });
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
      if (!s.sonoHost || !s.ospiti.has(da)) return;
      s.pingOspiti.set(da, Math.round(performance.now() - m.n));
      s.ping = Math.max(...s.pingOspiti.values());
      return;
    default:
  }
}

function riprendiOspite(id) {
  const ospite = s.ospiti.get(id);
  if (s.fase !== 'gioco' || !s.partita || !ospite || s.partita.giocatori.some(g => g.id === id)) return;
  aggiungiGiocatore(s.partita, { id, nome: ospite.nome });
}

function pulisciOspiti() {
  let cambiato = false;
  for (const id of [...s.ospiti.keys()]) {
    if (s.coll.silenzio(id) <= SILENZIO_RIMOZIONE_MS) continue;
    if (s.partita?.giocatori.some(g => g.id === id)) rimuoviGiocatore(s.partita, id);
    s.ospiti.delete(id);
    s.pingOspiti.delete(id);
    s.coll.rimuovi(id);
    cambiato = true;
  }
  if (!cambiato) return;
  s.ping = s.pingOspiti.size ? Math.max(...s.pingOspiti.values()) : null;
  aggiornaStanza();
  inviaLobby();
}

function tickHost(dt, ora) {
  const p = s.partita;
  if (s.fase === 'gioco') {
    s.accumulo = Math.min(s.accumulo + dt, RECUPERO_MASSIMO_S);
    const eventi = [];
    while (s.accumulo >= R.PASSO) {
      const posizioni = {};
      if (io.pronto) posizioni[s.mioId] = { x: io.x, z: io.z, yaw: io.yaw, pitch: io.pitch, arma: armaAttiva(arsenale).tipo, colpi: io.colpi, tp: io.tp };
      for (const [id, o] of s.ospiti) if (o.remoto) posizioni[id] = o.remoto;
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
  if (s.sonoHost && s.coll && s.fase !== 'inizio') pulisciOspiti();
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
  if (s.sonoHost && s.mappaDaAprire && s.fase === 'gioco') partiComeHost(s.mappaDaAprire, false);
}

function vistaOspite(ora) {
  if (s.buffer.length === 0 || s.scarto === null) return null;
  const tempo = ora / 1000 + s.scarto - RITARDO_VISTA_S[modoRete()];
  while (s.buffer.length > 2 && s.buffer[1].vista.tempo <= tempo) s.buffer.shift();
  const [a, b] = s.buffer;
  if (b && tempo > a.vista.tempo) return interpola(a.vista, b.vista, (tempo - a.vista.tempo) / Math.max(1e-6, b.vista.tempo - a.vista.tempo));
  return a.vista;
}

function avanzaAffondo(vista, dt) {
  const a = locale.affondo;
  if (!a) return false;
  const passo = Math.min(dt, a.resto);
  const nuova = muoviCerchio(io, a.vx * passo, a.vz * passo, R.RAGGIO_GIOCATORE, scatole(vista.porte, false));
  io.x = nuova.x;
  io.z = nuova.z;
  a.resto -= passo;
  if (a.resto > 0) return true;
  locale.affondo = null;
  const bersaglio = mondo.bersagli(vista).find(b => b.id === a.zombie);
  if (bersaglio && Math.hypot(bersaglio.x - io.x, bersaglio.z - io.z) - raggioDi(bersaglio) <= COLTELLO.portata + 0.4) colpisciDiMischia([bersaglio], dannoColtello(vista.round), { coltello: true });
  return true;
}

function muovi(lettura, me, dt) {
  const vivo = me.stato === 'vivo' && s.fase === 'gioco';
  if (!vivo) locale.affondo = null;
  if (vivo && avanzaAffondo(s.vista, dt)) {
    io.movimento = 1;
    io.corsa = false;
    return;
  }
  io.inMira = vivo && lettura.mira && arsenale.ricarica === 0;
  io.corsa = vivo && lettura.corsa && lettura.avanti > 0 && !io.inMira;
  const lunghezza = Math.hypot(lettura.avanti, lettura.lato);
  io.movimento = vivo && lunghezza > 0 ? 1 : 0;
  if (!io.movimento) return;
  const velocita = (io.corsa ? R.VELOCITA_CORSA : R.VELOCITA) * (io.inMira ? 0.6 : 1) * fattoreBevande(me.bevande, 'velocita');
  const avanti = lettura.avanti / lunghezza;
  const lato = lettura.lato / lunghezza;
  const dx = (Math.sin(io.yaw) * avanti - Math.cos(io.yaw) * lato) * velocita * dt;
  const dz = (Math.cos(io.yaw) * avanti + Math.sin(io.yaw) * lato) * velocita * dt;
  const nuova = muoviCerchio(io, dx, dz, R.RAGGIO_GIOCATORE, scatole(s.vista.porte, false));
  io.x = nuova.x;
  io.z = nuova.z;
}

const raggioDi = b => b.raggio ?? CORPO.raggio;
const angoloDa = (dx, dz) => Math.abs(Math.atan2(Math.sin(Math.atan2(dx, dz) - io.yaw), Math.cos(Math.atan2(dx, dz) - io.yaw)));

function bersagliDiMischia(vista, portata, arco, quanti) {
  const origine = { x: io.x, y: R.ALTEZZA_OCCHI - 0.4, z: io.z };
  const ostacoli = scatole(vista.porte, true);
  const scelti = [];
  for (const b of mondo.bersagli(vista)) {
    const dx = b.x - io.x;
    const dz = b.z - io.z;
    const d = Math.hypot(dx, dz);
    const bordo = Math.max(0, d - raggioDi(b));
    const angolo = angoloDa(dx, dz);
    if (bordo > portata || (d > raggioDi(b) + 0.3 && angolo > arco)) continue;
    if (d > 1e-3 && primoMuro(origine, { x: dx / d, y: 0, z: dz / d }, ostacoli) < bordo) continue;
    scelti.push({ b, peso: bordo + angolo * 2 });
  }
  return scelti.sort((a, c) => a.peso - c.peso).slice(0, quanti).map(x => x.b);
}

function colpisciDiMischia(bersagli, danno, extra) {
  for (const b of bersagli) {
    inviaAzione({ tipo: 'colpo', zombie: b.id, danno, ...extra });
    mondo.colpito(b.id, false);
    mondo.effetti.sangue({ x: b.x, y: 1.2, z: b.z }, direzioneDa(io.yaw, 0));
  }
  if (!bersagli.length) return;
  audio.suona('carne');
  hud.segno(false);
}

function colpoDiColtello(vista) {
  audio.suona('coltello');
  mondo.spara();
  const vicini = bersagliDiMischia(vista, COLTELLO.portata, COLTELLO.arco, COLPITI_COLTELLO);
  if (vicini.length) {
    colpisciDiMischia(vicini, dannoColtello(vista.round), { coltello: true });
    return;
  }
  const [lontano] = bersagliDiMischia(vista, COLTELLO.affondo, COLTELLO.arco * 0.6, 1);
  if (!lontano) return;
  const dx = lontano.x - io.x;
  const dz = lontano.z - io.z;
  const d = Math.hypot(dx, dz);
  const corsa = Math.max(0, d - raggioDi(lontano) - FERMATI_PRIMA);
  locale.affondo = { vx: (dx / d) * (corsa / DURATA_AFFONDO), vz: (dz / d) * (corsa / DURATA_AFFONDO), resto: DURATA_AFFONDO, zombie: lontano.id };
}

function sparaColpo(arma, vista) {
  io.colpi += 1;
  mondo.spara();
  audio.sparo(armaAttiva(arsenale).tipo);
  if (arma.bianca) {
    colpisciDiMischia(bersagliDiMischia(vista, arma.portata, arma.arco, COLPITI_RELIQUIA), arma.danno, { arma: armaAttiva(arsenale).tipo });
    return;
  }
  const origine = { x: io.x, y: R.ALTEZZA_OCCHI, z: io.z };
  const centro = direzioneDa(io.yaw, io.pitch);
  const tipo = armaAttiva(arsenale).tipo;
  if (arma.proiettile) {
    inviaAzione({ tipo: 'sparo', yaw: io.yaw, pitch: io.pitch, arma: tipo });
    return;
  }
  const bersagli = mondo.bersagli(vista);
  const ostacoli = scatole(vista.porte, true);
  if (arma.catena) {
    scarica(arma, tipo, origine, centro, bersagli, ostacoli);
    return;
  }
  const colpiti = new Map();
  const rosa = arma.famiglia === 'pompa';
  const bocca = rosa ? mondo.bocca() : null;
  for (let i = 0; i < arma.pallini; i++) {
    const d = disperdi(centro, arma.dispersione * (io.inMira ? (rosa ? MIRA_POMPA : 0.4) : 1) * (io.movimento ? 1.6 : 1), Math.random);
    const colpo = colpisciZombie(origine, d, bersagli, ostacoli, arma.portata ?? (arma.esplosione ? PORTATA_RAGGI : Infinity));
    if (arma.fiamma) mondo.effetti.fiamma(mondo.bocca(), d, arma.colore);
    if (arma.gelo) mondo.effetti.brina(mondo.bocca(), d);
    if (!Number.isFinite(colpo.t)) {
      if (rosa) mondo.effetti.traccia(bocca, { x: origine.x + d.x * PORTATA_TRACCIA, y: origine.y + d.y * PORTATA_TRACCIA, z: origine.z + d.z * PORTATA_TRACCIA });
      continue;
    }
    const punto = { x: origine.x + d.x * colpo.t, y: origine.y + d.y * colpo.t, z: origine.z + d.z * colpo.t };
    if (rosa) mondo.effetti.traccia(bocca, punto);
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
      mondo.effetti.impatto(punto, rosa ? 3 : 5);
      continue;
    }
    mondo.effetti.sangue(punto, d, rosa ? 4 : 10);
    const somma = colpiti.get(colpo.id) ?? { danno: 0, testa: false, gelo: 0 };
    somma.danno += colpo.testa ? arma.danno * 2 : arma.danno;
    somma.testa ||= colpo.testa;
    somma.gelo += arma.gelo ?? 0;
    colpiti.set(colpo.id, somma);
  }
  for (const [zombie, { danno, testa, gelo }] of colpiti) {
    inviaAzione({ tipo: 'colpo', zombie, danno, testa, ...(gelo > 0 ? { gelo, arma: tipo } : {}) });
    mondo.colpito(zombie, testa);
    hud.segno(testa);
    audio.suona(testa ? 'testa' : 'carne');
  }
}

function scarica(arma, tipo, origine, centro, bersagli, ostacoli) {
  const colpo = colpisciZombie(origine, centro, bersagli, ostacoli, PORTATA_RAGGI);
  if (colpo.id === null) {
    if (!Number.isFinite(colpo.t)) return;
    const punto = { x: origine.x + centro.x * colpo.t, y: origine.y + centro.y * colpo.t, z: origine.z + centro.z * colpo.t };
    mondo.fulmine([mondo.bocca(), punto]);
    mondo.effetti.impatto(punto);
    return;
  }
  const catena = [bersagli.find(b => b.id === colpo.id)];
  while (catena.length < saltiArco(arma)) {
    const ultimo = catena[catena.length - 1];
    const prossimo = bersagli
      .filter(b => !catena.includes(b))
      .map(b => ({ b, d: Math.hypot(b.x - ultimo.x, b.z - ultimo.z) }))
      .filter(c => c.d <= SALTO_ARCO)
      .sort((a, c) => a.d - c.d)[0];
    if (!prossimo) break;
    catena.push(prossimo.b);
  }
  inviaAzione({ tipo: 'catena', zombie: catena.map(b => b.id), arma: tipo });
  catena.forEach(b => mondo.colpito(b.id, false));
  hud.segno(false);
}

function disegnaArco(e) {
  const tiratore = vistaGiocatore(e.da);
  const partenza = e.da === s.mioId ? mondo.bocca() : tiratore ? { x: tiratore.x, y: ALTEZZA_SCARICA + 0.2, z: tiratore.z } : null;
  const punti = [];
  for (let i = 0; i + 1 < e.punti.length; i += 2) punti.push({ x: e.punti[i], y: ALTEZZA_SCARICA, z: e.punti[i + 1] });
  if (partenza) punti.unshift(partenza);
  if (punti.length >= 2) mondo.fulmine(punti);
  if (e.da !== s.mioId) audio.suona('scarica');
}

const vistaGiocatore = id => s.vista?.giocatori.find(g => g.id === id) ?? null;

function statoMusica(vista) {
  if (vista.fase === 'fine' || vista.fase === 'vinta') return 'silenzio';
  if (vista.fase === 'finale' || vista.fase === 'fuga') return 'custode';
  if (vista.fase !== 'gioco') return 'calma';
  return vista.zombie.some(z => BOSS_MINORI.has(z.tipo) && z.stato !== 'morto') ? 'preside' : 'round';
}

function avviaRicarica(me) {
  if (!ricarica(arsenale, me.bevande)) return false;
  locale.suonoRicarica?.ferma();
  locale.suonoRicarica = audio.ricarica(modoRicarica(armaAttiva(arsenale).tipo), arsenale.ricaricaTotale, arsenale.daCaricare);
  return true;
}

function usaArmi(lettura, me, vista, dt) {
  if (lettura.azioni.includes('musica')) hud.avviso(audio.alternaMusica() ? 'Musica accesa' : 'Musica spenta', 'bene');
  aggiornaArsenale(arsenale, dt);
  if (arsenale.ricarica === 0 && locale.suonoRicarica) {
    locale.suonoRicarica.ferma();
    locale.suonoRicarica = null;
  }
  if (me.stato !== 'vivo' || s.fase !== 'gioco') return;
  for (const azione of lettura.azioni) {
    if (azione === 'pronto') {
      if (vista.fase === 'attesa') inviaAzione({ tipo: 'pronto', attivo: !me.pronto });
    } else if (azione === 'ricarica') avviaRicarica(me);
    else if (azione === 'cambia') cambia(arsenale);
    else if (azione === 'granata') {
      if (me.granate > 0 && vista.fase !== 'attesa') {
        inviaAzione({ tipo: 'granata', yaw: io.yaw, pitch: io.pitch });
        audio.suona('lancio');
      } else if (vista.fase !== 'attesa') hud.avviso('Niente granate');
    }
    else if (azione?.arma !== undefined) {
      if (vista.fase === 'attesa') scegliInSala(azione.arma, me, vista);
      else cambia(arsenale, azione.arma);
    } else if (azione === 'coltello' && !locale.affondo && coltellata(arsenale)) colpoDiColtello(vista);
    else if (azione === 'speciale') speciale(me);
  }
  const arma = ARMI[armaAttiva(arsenale).tipo];
  const vuole = locale.sparoForzato || (arma.automatica || arma.bianca ? lettura.sparo : lettura.sparoPremuto);
  locale.sparoForzato = false;
  if (!vuole || io.corsa) return;
  if (armaAttiva(arsenale).caricatore === 0) {
    if (!avviaRicarica(me) && performance.now() / 1000 - locale.ultimoVuoto > VUOTO_OGNI_S) {
      audio.suona('vuoto');
      locale.ultimoVuoto = performance.now() / 1000;
    }
    return;
  }
  const colpo = spara(arsenale, me.bevande);
  if (!colpo) return;
  if (vista.effetti?.infinite > 0) armaAttiva(arsenale).caricatore += 1;
  sparaColpo(colpo, vista);
  if (armaAttiva(arsenale).caricatore === 0) avviaRicarica(me);
}

function scegliInSala(tasto, me, vista) {
  const prossimo = (elenco, attuale) => elenco[(Math.max(0, elenco.indexOf(attuale)) + 1) % elenco.length];
  if (tasto === 0) inviaAzione({ tipo: 'scegli', cosa: 'pistola', valore: prossimo(PISTOLE_INIZIALI, me.pistola) });
  else if (tasto === 1) inviaAzione({ tipo: 'scegli', cosa: 'aspetto', valore: ((me.aspetto ?? 0) + 1) % ASPETTI.length });
  else if (tasto === 2 && s.sonoHost) inviaAzione({ tipo: 'scegli', cosa: 'mappa', valore: prossimo(ELENCO_MAPPE, vista.mappa) });
  else if (tasto === 2) {
    hud.avviso('La mappa la sceglie chi ha creato la stanza');
    return;
  }
  audio.suona('scatto');
}

function speciale(me) {
  if (!ARMI[armaAttiva(arsenale).tipo]?.bianca) return;
  if ((me.carica ?? 0) < 1) {
    hud.avviso(`Colpo speciale al ${Math.round((me.carica ?? 0) * 100)}%: continua a uccidere`);
    return;
  }
  inviaAzione({ tipo: 'speciale', yaw: io.yaw });
  mondo.spara();
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
  if (lettura.fPremuto && interazione.tipo === 'frammento' && !ripetuto) {
    inviaAzione({ tipo: 'frammento', id: interazione.id });
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
      if ((vista.fase === 'fine' || vista.fase === 'vinta') && s.fase === 'gioco') mostraFine({ round: vista.round, vinto: vista.fase === 'vinta', giocatori: vista.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
      const lettura = comandi.leggi();
      comandi.applicaVista(io);
      if (vista.fase === 'attesa' && (arsenale.armi.length !== me.armi.length || arsenale.armi.some((a, i) => a.tipo !== me.armi[i]))) allinea(arsenale, me.armi);
      if (locale.aspetto !== me.aspetto) {
        locale.aspetto = me.aspetto;
        mondo.tingiManica(me.aspetto ?? 0);
      }
      muovi(lettura, me, dt);
      usaArmi(lettura, me, vista, dt);
      const interazione = interagisci(lettura, me, vista);
      suoniAmbiente(vista, dt);
      audio.ambiente?.(mappaAttiva, ZONE.some(z => z.aperto && io.x >= z.x0 && io.x <= z.x1 && io.z >= z.z0 && io.z <= z.z1));
      audio.musica(statoMusica(vista), Math.min(1, vista.round / 12));
      const ferito = vista.giocatori.find(g => g.id !== s.mioId && g.stato === 'terra');
      const tipo = armaAttiva(arsenale).tipo;
      const cannocchiale = io.inMira && ARMI[tipo].mirino === true;
      mondo.disegna(vista, {
        io, mioId: s.mioId, dt, arma: tipo, movimento: io.movimento, corsa: io.corsa, inMira: io.inMira, cannocchiale,
        ricarica: arsenale.ricarica > 0 ? Math.min(0.999, Math.max(0.001, 1 - arsenale.ricarica / arsenale.ricaricaTotale)) : 0,
        colpiRicarica: arsenale.daCaricare,
        cambio: arsenale.cambio > 0 ? 1 : 0, coltellata: arsenale.coltello / COLTELLO.attesa, aTerra: me.stato === 'terra', morto: me.stato === 'morto',
      });
      hud.aggiorna({
        vista, mioId: s.mioId, arma: armaAttiva(arsenale), suggerimento: interazione?.testo ?? null,
        rianimazione: locale.inRianimazione && ferito ? ferito.progressoRianimazione / (me.bevande.includes('ritorno') ? R.RIANIMA_RAPIDO : R.RIANIMA_IN) : null,
        inMira: io.inMira, cannocchiale, host: s.sonoHost, bloccato: comandi.bloccato || s.fase !== 'gioco', rete: [testoRete(), `${Math.round(fps)} fps`].filter(Boolean).join(' · '),
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
$('parti').addEventListener('click', () => partiComeHost());
$('rigioca').addEventListener('click', () => partiComeHost());
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

apriMondo('scuola').then(m => {
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
    stato: () => ({ fps: Math.round(fps), fase: s.fase, mioId: s.mioId, modo: s.coll?.modo ?? null, vista: s.vista, io: { ...io }, arma: { ...armaAttiva(arsenale) }, armi: arsenale.armi.map(a => a.tipo), amici: amici(), buffer: s.buffer.length }),
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
    mondo: () => mondo,
    audio,
  };
}
