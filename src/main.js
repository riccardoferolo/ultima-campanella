import './stile.css';
import { R, ARMI, BEVANDE, BONUS, COLTELLO, PISTOLE_INIZIALI, ASPETTI, saltiArco, fattoreBevande, modoRicarica, dannoColtello } from './regole.js';
import { semeCasuale } from './caso.js';
import { MURI, OSTACOLI, PORTE, ACQUISTI, ZONE, ELENCO_MAPPE, NOMI_MAPPE, NOMI, FRAMMENTI, usaMappa, mappaAttiva, ostacoliPerGiocatori, scatolaAcquisto, quota, nomeBevanda } from './mappa.js';
import { OGGETTI as OGGETTI_TEATRO } from './mappe/teatro.js';
import { rallentamento } from './teatro.js';
import { messaggioRadio, RUNE } from './storia.js';
import { VOTO, ORE_DEL_BEATO, ANIME_VEGLIA, oraColpita } from './piazza.js';
import { CRONACA, ROMANI } from './piazza/cronaca.js';
import { muoviCerchio } from './fisica.js';
import { CORPO, colpisciZombie, direzioneDa, disperdi, esplosione, primoMuro, raggioSfera } from './colpi.js';
import { creaArsenale, armaAttiva, aggiorna as aggiornaArsenale, spara, ricarica, coltellata, cambia, allinea, riempi, azzera, bevi, occupato } from './arsenale.js';
import { creaClientAbisso } from './abisso/client.js';
import { statoArmi } from './grafica/abisso/statoArmi.js';
import { DURATA_BEVUTA } from './grafica/vista1p.js';
import { illuminaTeschio } from './grafica/teschio3d.js';
import { ARMA_ELEMENTO, bersagliPalude, invischiato } from './palude.js';
import { eventoPalude, trofeoPalude } from './palude/eventi.js';
import { interazioneVicina } from './interazioni.js';
import { creaPartita, passo, aggiungiGiocatore, rimuoviGiocatore } from './partita.js';
import { faiIstantanea, espandi, interpola } from './istantanea.js';
import { apriSegnali } from './rete/segnali.js';
import { collega, collegaHost } from './rete/collegamento.js';
import { codiceStanza, normalizzaCodice, pulisciNome } from './rete/protocollo.js';
import { creaMondo } from './grafica/scena.js';
import { LIVELLI, leggiScelta, salvaScelta, livelloAttivo } from './grafica/qualita.js';
import { creaComandi } from './comandi.js';
import { creaHud } from './hud.js';
import { creaAudio } from './audio.js';

const PARAMETRI = new URLSearchParams(location.search);
const LOCALE = PARAMETRI.has('locale');
const SOLO_RISERVA = PARAMETRI.has('riserva');
const CHIAVE_NOME = 'campanella.nome';
const ISTANTANEE_OGNI_MS = { diretto: 50, riserva: 100 };
const RITARDO_VISTA_S = { diretto: 0.15, riserva: 0.25 };
const ZOOM_MIRA = Math.tan((52 * Math.PI) / 360) / Math.tan((72 * Math.PI) / 360);
const ZOOM_CANNOCCHIALE = Math.tan((20 * Math.PI) / 360) / Math.tan((72 * Math.PI) / 360);
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
const BOSS_MINORI = new Set(['preside', 'sciamano', 'guardiano', 'capitano']);
const RAGGIO_LAMPADARIO = 1.4;
const HOST_PERSO_MS = 8000;
const AVVISO_HOST_PERSO_MS = 6000;
const PRONTO_IN_VOLO_MS = 1500;
const ARMI_DIVERSE_S = 1;
const ALTEZZA_SOPRA = 3;
const TESTI_BOSS = {
  sciamano: 'Lo Sciamano esce dalla giungla: tamburi in lontananza…',
  guardiano: 'Le pietre del sole si allineano… il Guardiano si sveglia!',
  capitano: 'Le campane suonano a martello: il Capitano del Visconti è in piazza!',
};
const TESTI_BOSS_UCCISO = {
  preside: 'Il Preside è morto!',
  sciamano: 'Lo Sciamano è caduto!',
  guardiano: 'Il Guardiano del Sole è caduto: ha lasciato una spada!',
  capitano: 'Il Capitano del Visconti è caduto: Cerano è salva!',
};
const TESTI_VIA = {
  giungla: 'Si comincia! La giungla non perdona',
  teatro: 'Si va in scena! Il sipario è chiuso: il generatore è sul palco',
  piazza: 'Piazza Crespi, Cerano: la corrente è saltata, il quadro è in sacrestia',
  abisso: 'Stazione Abyssus-9, undicimila metri sotto il mare: riaccendete le turbine',
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
  vistaPrima: null,
  ultimoTickHost: 0,
};

const io = { x: 0, z: 0, yaw: Math.PI, pitch: 0, pronto: false, tp: 0, colpi: 0, movimento: 0, corsa: false, inMira: false };
const arsenale = creaArsenale();
const abissoClient = creaClientAbisso();
const locale = { inRianimazione: false, ultimaAssa: 0, ultimoVuoto: 0, sparoForzato: false, ultimoAcquisto: { id: null, quando: 0 }, affondo: null, aspetto: null, caricaTeschio: 0, avvisoHostPerso: 0, prontoChiesto: -Infinity, armiDiverse: 0, teschio: null, prossimoRaggio: 0 };
const cacheScatole = new Map();

const collegato = () => s.coll && (s.coll.modo === 'diretto' || s.coll.modo === 'riserva');
const modoRete = () => (s.coll?.modo === 'diretto' ? 'diretto' : 'riserva');
const miaPistola = () => s.vista?.giocatori.find(g => g.id === s.mioId)?.pistola;

async function apriMondo(mappa) {
  usaMappa(mappa);
  if (!mondi.has(mappa)) mondi.set(mappa, creaMondo($('mondo'), mappa, { suQualita: livello => hud.avviso(`Grafica ${LIVELLI[livello].nome}: così tieni i 60 fps`, 'bene') }));
  let pronto;
  try {
    pronto = await mondi.get(mappa);
  } catch (e) {
    mondi.delete(mappa);
    throw e;
  }
  for (const altro of mondi.values()) altro.then(m => { m.tela.style.display = m === pronto ? '' : 'none'; }, () => {});
  pronto.tela.style.display = '';
  pronto.ridimensiona();
  return pronto;
}

function scatole(porte, perSparo) {
  const chiave = `${mappaAttiva}|${perSparo}|${[...porte].sort().join(',')}`;
  if (!cacheScatole.has(chiave)) {
    const elenco = perSparo
      ? [...MURI, ...OSTACOLI, ...PORTE.filter(p => !porte.has(p.id)).map(p => p.scatola), ...ACQUISTI.map(scatolaAcquisto).filter(Boolean).map(sc => ({ ...sc, base: quota((sc.x0 + sc.x1) / 2, (sc.z0 + sc.z1) / 2), altezza: 2 }))]
      : ostacoliPerGiocatori(porte);
    cacheScatole.set(chiave, elenco);
  }
  return cacheScatole.get(chiave);
}

function ostacoliMovimento(porte) {
  const tutte = scatole(porte, false);
  const piede = quota(io.x, io.z);
  return tutte.some(sc => sc.soloSotto !== undefined) ? tutte.filter(sc => sc.soloSotto === undefined || piede < sc.soloSotto) : tutte;
}

const suolo = (x, z) => quota(x, z);

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

async function iniziaPartita(seme, { mappa = 'scuola' } = {}) {
  const giro = ++s.giro;
  const scelte = new Map((s.partita?.giocatori ?? s.vista?.giocatori ?? []).map(g => [g.id, { pistola: g.pistola, aspetto: g.aspetto }]));
  s.fase = 'carico';
  s.semeCorrente = seme;
  s.buffer = [];
  s.scarto = null;
  s.vista = null;
  s.vistaPrima = null;
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
  abissoClient.azzera(io);
  Object.assign(locale, { inRianimazione: false, affondo: null, aspetto: null });
  mondo.svuota();
  if (s.sonoHost) {
    const giocatori = [{ id: s.mioId, nome: s.nome }];
    for (const [id, o] of s.ospiti) if (s.coll.collegato(id)) giocatori.push({ id, nome: o.nome });
    s.partita = creaPartita({ seme, giocatori: giocatori.map(g => ({ ...g, ...scelte.get(g.id) })), sala: true, mappa });
  }
  s.fase = 'gioco';
  if (s.sonoHost) inviaLobby();
  mostraSchermata(null);
  hud.mostra(true);
  comandi.attiva(true);
  document.activeElement?.blur();
}

function partiComeHost(mappa = s.partita?.mappa ?? 'scuola') {
  if (!s.sonoHost) return;
  const seme = semeCasuale();
  iniziaPartita(seme, { mappa });
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
    : mappaAttiva === 'palude'
      ? `Avete sepolto Arachne sotto il Bayou Vermillion al round ${evento.round}`
      : `Avete suonato l'ultima campanella e abbattuto il Custode al round ${evento.round}`;
  $('t-dettaglio').textContent = evento.vinto
    ? `${impresa}${evento.durata ? ` dopo ${minuti}:${secondi} di battaglia` : ''}.${mappaAttiva === 'palude' ? ` ${trofeoPalude()}` : ''}`
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
    if (mappaAttiva === 'palude' && mondo && eventoPalude(e, { hud, audio, mondo, perMe, nomeDi, io })) continue;
    if (mappaAttiva === 'abisso' && mondo && s.vista && abissoClient.evento(e, { hud, audio, mondo, perMe, vista: s.vista, io, mioId: s.mioId })) continue;
    switch (e.k) {
      case 'round':
        audio.suona('round');
        if (mappaAttiva === 'piazza') audio.rintocchi(Math.min(12, e.round));
        hud.avviso(`Round ${e.round}`);
        break;
      case 'fineRound': audio.suona('fineRound'); break;
      case 'ucciso':
        mondo.effetti.macchia(e.x, e.z);
        if (e.bomba) mondo.effetti.esplosione({ x: e.x, y: suolo(e.x, e.z) + 1, z: e.z }, 'fuoco');
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
      case 'boss':
        audio.suona('boss');
        hud.avviso(TESTI_BOSS[e.tipo] ?? (e.fusibile ? 'Il Preside è arrivato… e ha qualcosa in tasca' : 'Il Preside è tornato!'));
        if (e.tipo === 'capitano') {
          mondo.campane?.();
          hud.radio(CRONACA.galeazzo);
        }
        break;
      case 'infuriato': audio.suona('urlo'); hud.avviso(e.tipo === 'capitano' ? 'Il Capitano del Visconti si infuria!' : 'Il Preside si è infuriato!'); break;
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
      case 'raggioTeschio': raggioTeschio(e); break;
      case 'esplosioneTeschio': esplosioneTeschio(e); break;
      case 'altarePronto': audio.suona('segreto'); hud.avviso("L'altare è sazio: prendete il Teschio di Malakor!", 'bene'); break;
      case 'teschio': hud.avviso(perMe ? 'Teschio di Malakor: tocca per il raggio, tieni premuto per sollevare e far esplodere gli zombie' : `${nomeDi(e.a)} ha il Teschio di Malakor`, 'bene'); break;
      case 'radiciBruciate': audio.suona('implosione'); hud.avviso('Le radici bruciano: la passerella dello sciamano è libera', 'bene'); break;
      case 'implosione':
        mondo.effetti.esplosione({ x: e.x, y: e.y, z: e.z }, 'energia', 0xb06cff);
        mondo.effetti.esplosione({ x: e.x, y: e.y, z: e.z }, 'fuoco', 0xffb070);
        audio.suona('implosione');
        break;
      case 'congelato': audio.suona('congelato'); break;
      case 'arco': disegnaArco(e); break;
      case 'vittoria': mostraFine({ ...e, vinto: true }); break;
      case 'via': azzera(arsenale, miaPistola()); audio.suona('round'); hud.avviso(TESTI_VIA[mappaAttiva] ?? 'Si comincia! Restate vicini', 'bene'); break;
      case 'sipario': audio.suona('generatore'); hud.avviso('Il generatore ruggisce: il sipario si alza e i Sieri si risvegliano', 'bene'); break;
      case 'siparioAlzato': audio.suona('rifugio'); hud.avviso("Palco e platea sono uniti: le doppie porte riportano all'atrio", 'bene'); break;
      case 'botola':
        audio.suona('porta');
        hud.avviso(perMe ? `La botola si apre: hai ${e.secondi} s nel sottopalco con la Forgia Arcana` : `${nomeDi(e.a)} è sceso nel sottopalco`, 'bene');
        break;
      case 'risalita': if (perMe) { audio.suona('porta'); hud.avviso('Il montacarichi ti riporta sul palco'); } break;
      case 'campanile':
        audio.suona('porta');
        hud.avviso(perMe ? `Sei in cima al campanile: hai ${e.secondi} s nella cella campanaria` : `${nomeDi(e.a)} è salito sul campanile`, 'bene');
        break;
      case 'discesaCampanile': if (perMe) { audio.suona('porta'); hud.avviso('Sei sceso nel Tempietto del Beato Pacifico'); } break;
      case 'libroBeato': audio.suona('segreto'); hud.avviso('In sacrestia, sul leggio, è comparso un vecchio libro…', 'bene'); break;
      case 'summa': if (perMe || e.prima) { audio.suona('frammento'); hud.radio(CRONACA.summa); } break;
      case 'oraDelBeato': audio.suona('ora'); hud.avviso(`${ROMANI[e.ora]}: l'orologio risponde (${e.n}/${ORE_DEL_BEATO.length})`, 'bene'); break;
      case 'oraSbagliata': audio.suona('oraSbagliata'); hud.avviso(`${ROMANI[e.ora]}: l'orologio tace, si ricomincia`); break;
      case 'ritornoBeato': audio.suona('campanone'); mondo.campane?.(); hud.radio(CRONACA.ritorno); break;
      case 'arrivoBeato': audio.suona('segreto'); hud.radio(CRONACA.veglia); break;
      case 'animaBeato': if (e.anime % 5 === 0) { audio.suona('frammento'); hud.avviso(`La veglia del Beato: ${e.anime}/${ANIME_VEGLIA}`, 'bene'); } break;
      case 'paceCerano': audio.suona('campanone'); mondo.campane?.(); hud.radio(CRONACA.pace); break;
      case 'campane':
        audio.suona('campanone');
        mondo.campane?.();
        hud.avviso(`Le campane suonano a distesa: ${e.storditi} zombie storditi per ${e.secondi} s!`, 'bene');
        break;
      case 'sentinella': audio.suona('generatore'); hud.avviso(`La sentinella della platea apre il fuoco per ${e.secondi} s`, 'bene'); break;
      case 'sentinellaSpenta': hud.avviso('La sentinella si ferma a raffreddarsi'); break;
      case 'trappola': audio.suona('implosione'); hud.avviso('Trappola incendiaria accesa: non attraversatela!'); break;
      case 'lampadario': audio.suona('frantumato'); hud.avviso('Il lampadario cede!'); break;
      case 'lampadarioCrollato':
        mondo.effetti.esplosione({ x: e.x, y: suolo(e.x, e.z) + 0.6, z: e.z }, 'energia', 0xfff0d0);
        mondo.effetti.esplosione({ x: e.x, y: suolo(e.x, e.z) + 0.3, z: e.z }, 'fuoco', 0xffc070);
        audio.esplosione(Math.hypot(e.x - io.x, e.z - io.z), Math.atan2(e.x - io.x, e.z - io.z) - io.yaw);
        break;
      case 'eclissi': audio.suona('boss'); hud.avviso("L'eclissi copre il teatro: i Corrotti prendono fuoco!"); break;
      case 'eclissiFinita': hud.avviso("La luna se ne va: l'eclissi è finita", 'bene'); break;
      case 'fiammata':
        mondo.effetti.esplosione({ x: e.x, y: suolo(e.x, e.z) + 0.8, z: e.z }, 'fuoco');
        audio.esplosione(Math.hypot(e.x - io.x, e.z - io.z) + 4, Math.atan2(e.x - io.x, e.z - io.z) - io.yaw);
        break;
      case 'gas':
        mondo.effetti.esplosione({ x: e.x, y: suolo(e.x, e.z) + 1, z: e.z }, 'energia', 0x9be15d);
        audio.suona('evocazione');
        break;
      case 'conto': audio.suona('conto'); break;
      case 'contoAnnullato': hud.avviso('Partenza annullata: qualcuno non è pronto'); break;
      case 'bonusCompare': audio.suona('bonusCompare'); break;
      case 'bonus':
        audio.suona(e.tipo === 'bomba' ? 'bomba' : 'bonus');
        hud.avviso(`${BONUS[e.tipo].nome} — ${BONUS[e.tipo].descrizione}`, 'bene');
        if (e.tipo === 'munizioni') arsenale.armi.forEach(a => riempi(arsenale, a.tipo));
        break;
      case 'frammento': {
        const santo = FRAMMENTI.find(f => f.id === e.id)?.santo;
        audio.suona('frammento');
        hud.avviso(NOMI.frammento ? `${NOMI.frammento}${santo ? `: ${santo}` : ''} (${e.trovati}/${e.totale})` : `Frammento di meteorite ${e.trovati}/${e.totale}`, 'bene');
        break;
      }
      case 'segreto': audio.suona('segreto'); hud.avviso(NOMI.segreto ?? "La meteorite si risveglia: avete l'Orizzonte degli Eventi!", 'bene'); break;
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
          hud.avviso(`${nomeBevanda(e.bevanda, BEVANDE)}: ${BEVANDE[e.bevanda].descrizione}`, 'bene');
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
      ospite.remoto = { x: m.x, z: m.z, yaw: m.yaw, pitch: m.pitch, arma: m.arma, colpi: m.colpi, tp: m.tp, su: m.su ?? 0 };
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
      if (s.accumulo < 2 * R.PASSO) s.vistaPrima = espandi(faiIstantanea(p));
      const posizioni = {};
      if (io.pronto) posizioni[s.mioId] = { x: io.x, z: io.z, yaw: io.yaw, pitch: io.pitch, arma: armaAttiva(arsenale).tipo, colpi: io.colpi, tp: io.tp, su: io.su ?? 0 };
      for (const [id, o] of s.ospiti) if (o.remoto) posizioni[id] = o.remoto;
      const azioni = [...s.azioniLocali.splice(0), ...s.azioniRemote.splice(0)];
      eventi.push(...passo(p, R.PASSO, { posizioni, azioni }));
      s.accumulo -= R.PASSO;
    }
    s.ultimoTickHost = ora;
    if (eventi.length && collegato()) s.coll.invia({ t: 'ev', eventi });
    suEventi(eventi);
  }
  const ogni = ISTANTANEE_OGNI_MS[modoRete()];
  if (collegato() && ora - s.ultimaIstantanea >= ogni) {
    s.coll.invia({ t: 'st', g: s.semeCorrente, ist: faiIstantanea(p) }, { veloce: true });
    s.ultimaIstantanea = Math.max(s.ultimaIstantanea + ogni, ora - ogni);
  }
}

function tickOspite(ora) {
  if (s.fase !== 'gioco' || !io.pronto || ora - s.ultimoInvioG < GIOCATORE_OGNI_MS) return;
  s.coll.invia({ t: 'g', x: io.x, z: io.z, yaw: io.yaw, pitch: io.pitch, arma: armaAttiva(arsenale).tipo, colpi: io.colpi, tp: io.tp, su: Math.round((io.su ?? 0) * 100) / 100 }, { veloce: true });
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
  if (!s.sonoHost && s.coll && s.fase === 'gioco' && s.coll.silenzio() > HOST_PERSO_MS && ora - locale.avvisoHostPerso > AVVISO_HOST_PERSO_MS) {
    locale.avvisoHostPerso = ora;
    s.lobbyRicevuta = false;
    hud.avviso(`Non arriva più niente da ${s.nomeHost ?? 'chi ha creato la stanza'}: se non torna, ricarica la pagina`);
  }
  if (s.fase !== 'gioco' && s.fase !== 'fine') return;
  if (s.sonoHost && s.partita) tickHost(dt, ora);
  else if (!s.sonoHost) tickOspite(ora);
  if (s.sonoHost && s.mappaDaAprire && s.fase === 'gioco') partiComeHost(s.mappaDaAprire);
}

function vistaHost(ora) {
  if (!s.partita) return null;
  const attuale = espandi(faiIstantanea(s.partita));
  if (!s.vistaPrima || s.vistaPrima.tempo > attuale.tempo) return attuale;
  return interpola(s.vistaPrima, attuale, (s.accumulo + (ora - s.ultimoTickHost) / 1000) / R.PASSO);
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
  const nuova = muoviCerchio(io, a.vx * passo, a.vz * passo, R.RAGGIO_GIOCATORE, ostacoliMovimento(vista.porte));
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
  io.inMira = vivo && lettura.mira && arsenale.ricarica === 0 && !ARMI[armaAttiva(arsenale).tipo]?.meraviglia;
  const abisso = mappaAttiva === 'abisso' ? abissoClient.muovi(io, lettura, me, s.vista, dt, ostacoliMovimento(s.vista.porte)) : null;
  if (abisso?.bloccato) {
    io.movimento = 0;
    io.corsa = false;
    return;
  }
  const preso = invischiato(s.vista, s.mioId);
  io.corsa = vivo && !preso && lettura.corsa && lettura.avanti > 0 && !io.inMira && !lettura.sparo;
  const lunghezza = Math.hypot(lettura.avanti, lettura.lato);
  io.movimento = vivo && !preso && lunghezza > 0 ? 1 : 0;
  if (!io.movimento) return;
  const velocita = (io.corsa ? R.VELOCITA_CORSA : R.VELOCITA) * (io.inMira ? 0.6 : 1) * fattoreBevande(me.bevande, 'velocita') * rallentamento(s.vista.teatro, s.mioId) * (abisso?.fattore ?? 1);
  const avanti = lettura.avanti / lunghezza;
  const lato = lettura.lato / lunghezza;
  const dx = (Math.sin(io.yaw) * avanti - Math.cos(io.yaw) * lato) * velocita * dt;
  const dz = (Math.cos(io.yaw) * avanti + Math.sin(io.yaw) * lato) * velocita * dt;
  const nuova = muoviCerchio(io, dx, dz, R.RAGGIO_GIOCATORE, ostacoliMovimento(s.vista.porte));
  io.x = nuova.x;
  io.z = nuova.z;
}

const raggioDi = b => b.raggio ?? CORPO.raggio;
const angoloDa = (dx, dz) => Math.abs(Math.atan2(Math.sin(Math.atan2(dx, dz) - io.yaw), Math.cos(Math.atan2(dx, dz) - io.yaw)));

function bersagliDiMischia(vista, portata, arco, quanti) {
  const origine = { x: io.x, y: suolo(io.x, io.z) + R.ALTEZZA_OCCHI - 0.4, z: io.z };
  const ostacoli = scatole(vista.porte, true);
  const scelti = [];
  for (const b of mondo.bersagli(vista)) {
    const dx = b.x - io.x;
    const dz = b.z - io.z;
    const d = Math.hypot(dx, dz);
    const bordo = Math.max(0, d - raggioDi(b));
    const angolo = angoloDa(dx, dz);
    if (bordo > portata || (d > raggioDi(b) + 0.3 && angolo > arco) || Math.abs((b.base ?? 0) - suolo(io.x, io.z)) > ALTEZZA_SOPRA) continue;
    if (d > 1e-3 && primoMuro(origine, { x: dx / d, y: 0, z: dz / d }, ostacoli) < bordo) continue;
    scelti.push({ b, peso: bordo + angolo * 2 });
  }
  return scelti.sort((a, c) => a.peso - c.peso).slice(0, quanti).map(x => x.b);
}

function colpisciDiMischia(bersagli, danno, extra) {
  for (const b of bersagli) {
    inviaAzione({ tipo: 'colpo', zombie: b.id, danno, ...extra });
    mondo.colpito(b.id, false);
    mondo.effetti.sangue({ x: b.x, y: (b.base ?? 0) + 1.2, z: b.z }, direzioneDa(io.yaw, 0));
  }
  if (!bersagli.length) return;
  audio.suona('carne');
  hud.segno(false);
}

function colpoDiColtello(vista) {
  audio.suona('coltello');
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
  const origine = { x: io.x, y: suolo(io.x, io.z) + R.ALTEZZA_OCCHI + (io.su ?? 0), z: io.z };
  const centro = direzioneDa(io.yaw, io.pitch);
  const tipo = armaAttiva(arsenale).tipo;
  if (arma.proiettile) {
    inviaAzione({ tipo: 'sparo', yaw: io.yaw, pitch: io.pitch, arma: tipo });
    return;
  }
  const bersagli = mondo.bersagli(vista);
  const ostacoli = scatole(vista.porte, true);
  if (vista.abisso?.globi?.length) {
    const globo = abissoClient.globoColpito(origine, centro, vista, primoMuro(origine, centro, ostacoli));
    if (globo) inviaAzione({ tipo: 'abisso', cosa: 'collassa', id: globo });
  }
  const fattoreAbisso = vista.abisso ? abissoClient.fattoreDanno(vista.giocatori.find(g => g.id === s.mioId), arma) : 1;
  if (vista.piazza?.voto?.fase === VOTO.OROLOGIO) {
    if (oraColpita(origine, centro)) inviaAzione({ tipo: 'orologio', yaw: io.yaw, pitch: io.pitch });
  }
  if (vista.teatro?.lampadario === 0 && raggioSfera(origine, centro, OGGETTI_TEATRO.LAMPADARIO, RAGGIO_LAMPADARIO) < primoMuro(origine, centro, ostacoli)) inviaAzione({ tipo: 'lampadario' });
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
    somma.danno += (colpo.testa ? arma.danno * 2 : arma.danno) * fattoreAbisso;
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
  const partenza = e.da === s.mioId ? mondo.bocca() : tiratore ? { x: tiratore.x, y: suolo(tiratore.x, tiratore.z) + ALTEZZA_SCARICA + 0.2, z: tiratore.z } : null;
  const punti = [];
  for (let i = 0; i + 1 < e.punti.length; i += 2) punti.push({ x: e.punti[i], y: suolo(e.punti[i], e.punti[i + 1]) + ALTEZZA_SCARICA, z: e.punti[i + 1] });
  if (partenza) punti.unshift(partenza);
  if (punti.length >= 2) mondo.fulmine(punti);
  if (e.da !== s.mioId) audio.suona('scarica');
}

const vistaGiocatore = id => s.vista?.giocatori.find(g => g.id === id) ?? null;

function statoMusica(vista) {
  if (vista.fase === 'fine' || vista.fase === 'vinta') return 'silenzio';
  if (vista.fase === 'finale' || vista.fase === 'fuga') return 'custode';
  if (vista.fase !== 'gioco') return 'calma';
  if (vista.teatro?.eclissi) return 'preside';
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
  if (me.stato !== 'vivo' || s.fase !== 'gioco') {
    annullaTeschio();
    return;
  }
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
  if (mappaAttiva === 'abisso' && abissoClient.usaArmi(lettura, me, vista, dt, { tipo: armaAttiva(arsenale).tipo, spara: () => spara(arsenale, me.bevande), occupato: () => occupato(arsenale), invia: inviaAzione, mondo, audio, io, hud })) {
    statoArmi.carica = abissoClient.carica;
    if (armaAttiva(arsenale).caricatore === 0) avviaRicarica(me);
    return;
  }
  if (arma.teschio) {
    locale.sparoForzato = false;
    usaTeschio(lettura, me, vista, dt);
    return;
  }
  annullaTeschio();
  const vuole = locale.sparoForzato || (arma.automatica || arma.bianca ? lettura.sparo : lettura.sparoPremuto);
  locale.sparoForzato = false;
  if (!vuole) return;
  if (armaAttiva(arsenale).caricatore === 0) {
    if (!avviaRicarica(me) && arsenale.ricarica === 0 && performance.now() / 1000 - locale.ultimoVuoto > VUOTO_OGNI_S) {
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

const coloreTeschio = elemento => ARMI[ARMA_ELEMENTO[elemento] ?? 'teschio'].colore;

function puntoGiocatore(id) {
  if (id === s.mioId) return mondo.bocca();
  const g = s.vista?.giocatori.find(q => q.id === id);
  return g ? { x: g.x, y: suolo(g.x, g.z) + R.ALTEZZA_OCCHI - 0.25, z: g.z } : null;
}

function scoppioTeschio(x, z, elemento, forte) {
  const centro = { x, y: suolo(x, z) + 1.2, z };
  const colore = coloreTeschio(elemento);
  mondo.effetti.esplosione(centro, 'energia', colore);
  if (forte) mondo.effetti.risucchio(centro, 2.4, 14);
  if (elemento === 'ghiaccio') mondo.effetti.ghiaccio(centro);
  else if (elemento === 'fuoco') mondo.effetti.esplosione({ x, y: centro.y - 0.6, z }, 'fuoco', 0xff7a2a);
  else if (elemento === 'vento') for (let i = 0; i < 6; i++) mondo.effetti.sangue(centro, { x: Math.cos(i), y: 0.4, z: Math.sin(i) });
  else if (!elemento) mondo.effetti.esplosione({ x, y: centro.y - 0.5, z }, 'fuoco', 0x5f8a2a);
  mondo.effetti.ossa(centro, forte ? 18 : 10);
  mondo.effetti.sangue(centro, { x: 0, y: 1, z: 0 }, 14);
  mondo.effetti.macchia(x, z);
}

function raggioTeschio(e) {
  const da = puntoGiocatore(e.da);
  const a = { x: e.x, y: suolo(e.x, e.z) + 1.3, z: e.z };
  if (da && e.da !== s.mioId) mondo.fulmine([da, a], coloreTeschio(e.elemento));
  if (e.ucciso) mondo.nascondiZombie(e.zombie);
  scoppioTeschio(e.x, e.z, e.elemento, false);
  if (e.elemento === 'ghiaccio') audio.suona('congelato');
  else if (e.elemento) audio.suona('scarica');
}

function esplosioneTeschio(e) {
  for (const [x, z] of e.punti) scoppioTeschio(x, z, e.elemento, true);
  if (e.centro) {
    const [x, z] = e.centro;
    mondo.effetti.esplosione({ x, y: suolo(x, z) + 1.3, z }, 'energia', 0xb06cff);
    mondo.effetti.risucchio({ x, y: suolo(x, z) + 1.3, z }, 6, 30);
  }
  const vicino = [...e.punti, ...(e.centro ? [e.centro] : [])].reduce((m, [x, z]) => Math.min(m, Math.hypot(x - io.x, z - io.z)), 30);
  audio.esplosione(vicino, 0);
  audio.suona('implosione');
  if (e.elemento === 'ghiaccio') audio.suona('frantumato');
}

function annullaTeschio() {
  if (locale.teschio?.carica) inviaAzione({ tipo: 'teschio', carica: false });
  locale.teschio = null;
  locale.caricaTeschio = 0;
}

function usaTeschio(lettura, me, vista, dt) {
  const libero = arsenale.cambio === 0;
  if (lettura.sparoPremuto && libero) locale.teschio = { premuto: 0, carica: false, finita: false, inizio: 0 };
  const tenuto = locale.teschio;
  if (!tenuto) {
    locale.caricaTeschio = 0;
    return;
  }
  if (lettura.sparo) {
    tenuto.premuto += dt;
    if (!tenuto.carica && !tenuto.finita && !tenuto.affamato && tenuto.premuto >= R.TESCHIO_TOCCO) {
      if ((me.anime ?? 0) < R.TESCHIO_COSTO) {
        tenuto.affamato = true;
        hud.avviso(`Il Teschio ha fame: servono ${R.TESCHIO_COSTO} anime per sollevare gli zombie`);
      } else if (libero) {
        tenuto.finita = true;
        Object.assign(tenuto, { carica: true, inizio: tenuto.premuto });
        inviaAzione({ tipo: 'teschio', carica: true });
        audio.suona('evocazione');
      }
    }
    if (!tenuto.carica) return;
    locale.caricaTeschio = Math.min(1, (tenuto.premuto - tenuto.inizio) / R.TESCHIO_DURATA_CARICA);
    if (!libero) inviaAzione({ tipo: 'teschio', carica: false });
    if (!libero || locale.caricaTeschio >= 1) tenuto.carica = false;
    return;
  }
  if (tenuto.carica) inviaAzione({ tipo: 'teschio', carica: false });
  else if (!tenuto.finita && lettura.sparoRilasciato) scagliaRaggio(vista, me);
  locale.teschio = null;
  locale.caricaTeschio = 0;
}

function scagliaRaggio(vista, me) {
  if ((me.anime ?? 0) < R.TESCHIO_COSTO_RAGGIO) {
    hud.avviso('Il Teschio ha fame: uccidi per dargli anime');
    audio.suona('vuoto');
    return;
  }
  const adesso = performance.now() / 1000;
  if (adesso < (locale.prossimoRaggio ?? 0)) return;
  locale.prossimoRaggio = adesso + R.TESCHIO_ATTESA_RAGGIO;
  const origine = { x: io.x, y: suolo(io.x, io.z) + R.ALTEZZA_OCCHI, z: io.z };
  const d = direzioneDa(io.yaw, io.pitch);
  const colpo = colpisciZombie(origine, d, [...mondo.bersagli(vista), ...bersagliPalude(vista)], scatole(vista.porte, true), R.TESCHIO_PORTATA);
  const lungo = Math.min(colpo.t, R.TESCHIO_PORTATA);
  mondo.spara();
  audio.suona('teschio');
  mondo.fulmine([mondo.bocca(), { x: origine.x + d.x * lungo, y: origine.y + d.y * lungo, z: origine.z + d.z * lungo }], ARMI[armaAttiva(arsenale).tipo].colore);
  if (colpo.id === null) return;
  inviaAzione(typeof colpo.id === 'string' ? { tipo: 'teschio', oggetto: colpo.id } : { tipo: 'teschio', zombie: colpo.id });
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
  if (mappaAttiva === 'abisso') {
    abissoClient.speciale(me, s.vista, { invia: inviaAzione, hud, io });
    return;
  }
  if (!ARMI[armaAttiva(arsenale).tipo]?.bianca) return;
  if ((me.carica ?? 0) < 1) {
    hud.avviso(`Colpo speciale al ${Math.round((me.carica ?? 0) * 100)}%: continua a uccidere`);
    return;
  }
  inviaAzione({ tipo: 'speciale', yaw: io.yaw, pitch: io.pitch });
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
    const vista = s.sonoHost ? vistaHost(ora) : vistaOspite(ora);
    const me = vista?.giocatori.find(g => g.id === s.mioId);
    if (vista && me) {
      s.vista = vista;
      if (!io.pronto || me.teletrasporto > io.tp) Object.assign(io, { x: me.x, z: me.z, yaw: me.yaw, tp: me.teletrasporto, pronto: true });
      if ((vista.fase === 'fine' || vista.fase === 'vinta') && s.fase === 'gioco') mostraFine({ round: vista.round, vinto: vista.fase === 'vinta', giocatori: vista.giocatori.map(g => ({ nome: g.nome, punti: g.punti, uccisioni: g.uccisioni })) });
      const lettura = comandi.leggi();
      comandi.applicaVista(io);
      if (vista.fase === 'attesa' && !me.pronto && comandi.bloccato && ora - locale.prontoChiesto > PRONTO_IN_VOLO_MS) document.exitPointerLock();
      const armiDiverse = arsenale.armi.length !== me.armi.length || arsenale.armi.some((a, i) => a.tipo !== me.armi[i]);
      locale.armiDiverse = armiDiverse ? locale.armiDiverse + dt : 0;
      if (armiDiverse && (vista.fase === 'attesa' || locale.armiDiverse > ARMI_DIVERSE_S)) {
        allinea(arsenale, me.armi);
        locale.armiDiverse = 0;
      }
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
      const ferito = interazione?.tipo === 'rianima' ? vista.giocatori.find(g => g.id === interazione.bersaglio) : null;
      const tipo = armaAttiva(arsenale).tipo;
      const cannocchiale = io.inMira && ARMI[tipo].mirino === true;
      comandi.zoom(cannocchiale ? ZOOM_CANNOCCHIALE : io.inMira ? ZOOM_MIRA : 1);
      illuminaTeschio(locale.caricaTeschio);
      mondo.disegna(vista, {
        io, mioId: s.mioId, dt, arma: tipo, movimento: io.movimento, corsa: io.corsa, inMira: io.inMira, cannocchiale,
        ricarica: arsenale.ricarica > 0 ? Math.min(0.999, Math.max(0.001, 1 - arsenale.ricarica / arsenale.ricaricaTotale)) : 0,
        colpiRicarica: arsenale.daCaricare,
        cambio: arsenale.cambio > 0 ? 1 : 0, coltellata: arsenale.coltello / COLTELLO.attesa, aTerra: me.stato === 'terra', morto: me.stato === 'morto',
      });
      hud.aggiorna({
        vista, mioId: s.mioId, arma: armaAttiva(arsenale), suggerimento: interazione?.testo ?? null,
        rianimazione: locale.inRianimazione && ferito ? ferito.progressoRianimazione / (me.bevande.includes('ritorno') ? R.RIANIMA_RAPIDO : R.RIANIMA_IN) : null,
        inMira: io.inMira, cannocchiale, host: s.sonoHost, bloccato: comandi.bloccato || s.fase !== 'gioco', inventario: !!lettura.inventario, rete: [testoRete(), `${Math.round(fps)} fps`].filter(Boolean).join(' · '),
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
hud.suScelta(({ cosa, valore }) => {
  if (s.fase !== 'gioco' || s.vista?.fase !== 'attesa') return;
  audio.prepara();
  audio.suona('scatto');
  if (cosa === 'pronto') {
    inviaAzione({ tipo: 'pronto', attivo: true });
    locale.prontoChiesto = performance.now();
    comandi.blocca();
    return;
  }
  if (cosa === 'mappa' && !s.sonoHost) return;
  inviaAzione({ tipo: 'scegli', cosa, valore });
});
comandi.suBlocco(bloccato => {
  if (bloccato) audio.prepara();
});

$('nome').value = leggiNomeSalvato();
$('grafica').value = leggiScelta();
$('grafica').options[0].textContent = `Automatica (${LIVELLI[livelloAttivo()].nome})`;
$('grafica').addEventListener('change', () => {
  salvaScelta($('grafica').value);
  if (pulisciNome($('nome').value)) salvaNome(pulisciNome($('nome').value));
  location.reload();
});
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
  hud.miniature(Object.fromEntries(PISTOLE_INIZIALI.map(tipo => [tipo, m.miniatura(tipo)])));
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
      io.pitch = Math.atan2(y - R.ALTEZZA_OCCHI - suolo(io.x, io.z), Math.hypot(x - io.x, z - io.z));
    },
    vaiA(x, z) {
      io.x = x;
      io.z = z;
    },
    spara() {
      locale.sparoForzato = true;
    },
    azione: a => inviaAzione(a),
    raggioTeschio: () => scagliaRaggio(s.vista, s.vista.giocatori.find(g => g.id === s.mioId)),
    pronto: () => mondo !== null,
    mondo: () => mondo,
    audio,
  };
}
