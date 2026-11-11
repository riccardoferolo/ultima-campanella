import { ARMI, BEVANDE, BONUS, TIPI_ZOMBIE, R, faseBoss, ASPETTI } from './regole.js';
import { NOMI_MAPPE, nomeBevanda } from './mappa.js';
import { obiettivoGiungla, reliquieGiungla } from './storia.js';
import { obiettivoVoto } from './piazza/cronaca.js';
import { creaSalaScelte } from './salaScelte.js';
import { obiettivo as obiettivoPalude, secondario as secondarioPalude } from './palude.js';

const BOSS = Object.freeze(['arachne', 'divoratore', 'custode', 'guardiano', 'sciamano', 'preside', 'capitano']);
const DURATA_RADIO_MS = 14000;

const $ = id => document.getElementById(id);
const DURATA_AVVISO_MS = 2200;
const LUNGHEZZA_AVVISO_BREVE = 30;
const MS_PER_CARATTERE = 55;
const DURATA_SEGNO_MS = 140;
const DURATA_UCCISIONE_MS = 240;

function obiettivoTeatro(vista, mioId) {
  const t = vista.teatro;
  if (vista.fase === 'attesa' || vista.round === 0) return '';
  const sotto = t.sotto?.[mioId];
  if (sotto > 0) return `Sottopalco: il montacarichi riparte tra ${Math.ceil(sotto)} s`;
  if (t.eclissi) return "Eclissi: i Corrotti in fiamme scoppiano quando muoiono, non fateli arrivare addosso";
  if (!vista.corrente) return 'Raggiungete il palco e tirate la leva del generatore centrale';
  if (t.sipario === 1) return 'Il sipario si sta alzando…';
  return '';
}

function obiettivoPiazza(vista, mioId) {
  if (vista.fase === 'attesa' || vista.round === 0) return '';
  const sopra = vista.piazza?.sopra?.[mioId];
  if (sopra > 0) return `Cella campanaria: si scende tra ${Math.ceil(sopra)} s`;
  if (!vista.corrente) return 'La corrente è saltata: riattivate il quadro elettrico della sacrestia';
  return obiettivoVoto(vista);
}

function obiettivo(vista, mioId) {
  if (vista.giungla) return obiettivoGiungla(vista);
  if (vista.teatro) return obiettivoTeatro(vista, mioId);
  if (vista.palude) return obiettivoPalude(vista, mioId);
  if (vista.piazza) return obiettivoPiazza(vista, mioId);
  if (vista.mappa !== 'scuola') return '';
  const m = vista.missione;
  if (!m || vista.fase === 'attesa' || vista.fase === 'vinta' || vista.round === 0) return '';
  if (vista.fase === 'finale') return 'Uccidete il Custode';
  if (m.messi >= R.FUSIBILI) return "Scendete nel rifugio e suonate l'ultima campanella";
  if (!vista.porte.has('aula')) return 'Trovate il vecchio rifugio sotto la scuola';
  const parti = [`Fusibili del cancello ${m.fusibili + m.messi}/${R.FUSIBILI}`];
  if (m.fusibili > 0) parti.push(vista.corrente ? 'portateli al quadro in aula magna' : 'accendete la corrente e portateli al quadro');
  if (m.generatore === 'acceso') parti.push(`generatore ${Math.round(m.progresso * 100)}%`);
  return parti.join(' · ');
}

export function creaHud() {
  const nebbiaGas = document.createElement('div');
  nebbiaGas.className = 'nebbia-gas';
  $('vignetta').after(nebbiaGas);
  const n = {
    radice: $('hud'), vignetta: $('vignetta'), cannocchiale: $('cannocchiale'), mirino: $('mirino'), segno: $('segno'),
    round: $('round'), punti: $('punti'), nomeArma: $('nome-arma'), munizioni: $('munizioni'), bibite: $('bibite'),
    avviso: $('avviso'), suggerimento: $('suggerimento'), barra: $('barra-rianima'), terra: $('stato-terra'), rete: $('rete'), clicca: $('clicca'),
  };
  const sala = document.createElement('div');
  sala.id = 'sala';
  sala.hidden = true;
  const effetti = document.createElement('div');
  effetti.id = 'effetti';
  const boss = document.createElement('div');
  boss.className = 'boss';
  boss.hidden = true;
  const nomeBoss = document.createElement('b');
  const barraBoss = document.createElement('div');
  const vitaBoss = document.createElement('i');
  barraBoss.append(vitaBoss);
  boss.append(nomeBoss, barraBoss);
  const missione = document.createElement('div');
  missione.className = 'obiettivo';
  const sorso = document.createElement('div');
  sorso.className = 'sorso';
  n.radice.prepend(sorso);
  const reliquie = document.createElement('div');
  reliquie.className = 'obiettivo secondario';
  const radio = document.createElement('div');
  radio.className = 'radio';
  radio.hidden = true;
  const carica = document.createElement('div');
  carica.className = 'carica';
  carica.hidden = true;
  const vitaCarica = document.createElement('i');
  carica.append(vitaCarica);
  n.nomeArma.before(carica);
  let scadenzaRadio = 0;
  const granate = document.createElement('div');
  granate.className = 'granate';
  n.munizioni.after(granate);
  n.radice.append(sala, effetti, boss, missione, reliquie, radio);
  let chiaveSala = '';
  let chiaveEffetti = '';
  let suScelta = () => {};
  let miniature = null;
  const scelte = creaSalaScelte(n.radice, { suScelta: scelta => suScelta(scelta) });
  let scadenzaAvviso = 0;
  let scadenzaSegno = 0;
  let puntiPrima = null;
  let chiavePunti = '';

  function avviso(testo, tipo = 'pericolo') {
    n.avviso.textContent = testo;
    n.avviso.classList.toggle('bene', tipo === 'bene');
    n.avviso.classList.toggle('lungo', testo.length > LUNGHEZZA_AVVISO_BREVE);
    n.avviso.classList.add('visibile');
    scadenzaAvviso = performance.now() + Math.max(DURATA_AVVISO_MS, testo.length * MS_PER_CARATTERE);
  }

  const guadagni = document.createElement('div');
  guadagni.className = 'guadagni';
  const righePunti = document.createElement('div');
  righePunti.className = 'righe';
  n.punti.replaceChildren(guadagni, righePunti);

  function disegnaPunti(vista, mioId) {
    const ordinati = [...vista.giocatori].sort((a, b) => (a.id === mioId ? -1 : b.id === mioId ? 1 : 0));
    const chiave = ordinati.map(g => `${g.id}:${g.punti}:${g.nome}`).join('|');
    if (chiave === chiavePunti) return;
    chiavePunti = chiave;
    const mio = ordinati.find(g => g.id === mioId);
    const guadagno = mio && puntiPrima !== null && mio.punti > puntiPrima ? mio.punti - puntiPrima : 0;
    puntiPrima = mio?.punti ?? null;
    righePunti.replaceChildren(...ordinati.map(g => {
      const riga = document.createElement('div');
      riga.className = g.id === mioId ? '' : 'altro';
      const nome = document.createElement('span');
      nome.textContent = g.nome;
      riga.append(nome, String(g.punti));
      return riga;
    }));
    if (guadagno > 0) {
      const segno = document.createElement('div');
      segno.className = 'guadagno';
      segno.textContent = `+${guadagno}`;
      guadagni.replaceChildren(segno);
    }
  }

  return {
    mostra(visibile) {
      n.radice.hidden = !visibile;
    },
    avviso,
    segno(testa) {
      if (n.segno.classList.contains('uccisione') && performance.now() < scadenzaSegno) return;
      n.segno.classList.add('visibile');
      n.segno.classList.toggle('testa', testa);
      scadenzaSegno = performance.now() + DURATA_SEGNO_MS;
    },
    sorso(colore) {
      sorso.style.transition = 'none';
      sorso.style.setProperty('--colore', `#${colore.toString(16).padStart(6, '0')}`);
      sorso.style.opacity = '0.75';
      requestAnimationFrame(() => {
        sorso.style.transition = 'opacity 1.4s ease-out';
        sorso.style.opacity = '0';
      });
    },
    suScelta(fn) {
      suScelta = fn;
    },
    miniature(m) {
      miniature = m;
    },
    radio(righe) {
      radio.replaceChildren(...righe.map((r, i) => {
        const p = document.createElement('p');
        p.textContent = r;
        if (i === 0) p.className = 'intestazione';
        return p;
      }));
      radio.hidden = false;
      scadenzaRadio = performance.now() + DURATA_RADIO_MS;
    },
    uccisione() {
      n.segno.classList.add('visibile', 'uccisione');
      scadenzaSegno = performance.now() + DURATA_UCCISIONE_MS;
    },
    aggiorna({ vista, mioId, arma, suggerimento, rianimazione, inMira, cannocchiale, bloccato, rete, apertura, host = false }) {
      const io = vista.giocatori.find(g => g.id === mioId);
      const ora = performance.now();
      if (ora > scadenzaAvviso) n.avviso.classList.remove('visibile');
      if (ora > scadenzaSegno) n.segno.classList.remove('visibile', 'uccisione');
      granate.classList.toggle('ragnatela', !!io?.bevande?.includes('vedova'));
      const numero = String(io?.granate ?? 0);
      if (granate.dataset.n !== numero) {
        granate.dataset.n = numero;
        granate.replaceChildren(...Array.from({ length: Number(numero) }, () => document.createElement('i')));
      }
      if (ora > scadenzaRadio) radio.hidden = true;
      const capo = BOSS.map(t => vista.zombie.find(z => z.tipo === t && z.stato !== 'morto')).find(Boolean);
      boss.hidden = !capo;
      effetti.classList.toggle('sotto-boss', !!capo);
      if (capo) {
        const dati = TIPI_ZOMBIE[capo.tipo];
        const fase = dati.finale ? faseBoss(dati, capo.vita / 100) : 0;
        const titolo = fase ? `${dati.nome} — fase ${fase}` : dati.nome;
        if (nomeBoss.textContent !== titolo) nomeBoss.textContent = titolo;
        vitaBoss.style.width = `${Math.max(0, Math.min(100, capo.vita))}%`;
      }
      const testoMissione = obiettivo(vista, mioId);
      const gas = (vista.teatro?.gas?.[mioId] ?? 0) > 0;
      if (nebbiaGas.classList.contains('attiva') !== gas) nebbiaGas.classList.toggle('attiva', gas);
      const testoReliquie = vista.palude ? secondarioPalude(vista, mioId) : reliquieGiungla(vista);
      if (missione.textContent !== testoMissione || reliquie.textContent !== testoReliquie) {
        missione.textContent = testoMissione;
        reliquie.textContent = testoReliquie;
        reliquie.style.top = testoMissione && testoReliquie ? `${missione.offsetTop + missione.offsetHeight + 4}px` : '';
      }
      const bianca = ARMI[arma.tipo]?.bianca;
      carica.hidden = !bianca;
      if (bianca) {
        const piena = (io?.carica ?? 0) >= 1;
        vitaCarica.style.width = `${Math.round((io?.carica ?? 0) * 100)}%`;
        carica.classList.toggle('piena', piena);
        carica.dataset.testo = piena ? 'E: COLPO SPECIALE' : 'carica';
      }
      n.round.textContent = vista.round > 0 ? String(vista.round) : '';
      n.round.classList.toggle('lampeggia', vista.fase === 'intervallo' && vista.round > 0);
      disegnaPunti(vista, mioId);
      n.nomeArma.textContent = ARMI[arma.tipo].nome;
      n.nomeArma.classList.toggle('potenziata', arma.tipo.endsWith('+'));
      const teschio = ARMI[arma.tipo]?.teschio;
      n.munizioni.textContent = bianca ? '∞' : teschio ? `${io?.anime ?? 0} ${io?.anime === 1 ? 'anima' : 'anime'}` : `${arma.caricatore} / ${arma.riserva}`;
      n.munizioni.classList.toggle('poche', teschio ? (io?.anime ?? 0) < R.TESCHIO_COSTO : arma.caricatore <= Math.ceil(ARMI[arma.tipo].caricatore / 4));
      const bevande = io?.bevande ?? [];
      if (n.bibite.dataset.chiave !== bevande.join()) {
        n.bibite.dataset.chiave = bevande.join();
        n.bibite.replaceChildren(...bevande.map(b => {
          const icona = document.createElement('i');
          icona.style.background = `#${BEVANDE[b].colore.toString(16).padStart(6, '0')}`;
          icona.title = nomeBevanda(b, BEVANDE);
          return icona;
        }));
      }
      const ferito = io && io.stato === 'vivo' ? 1 - io.vita / io.vitaMax : io ? 1 : 0;
      n.vignetta.style.opacity = String(Math.min(0.9, ferito * 1.1));
      n.cannocchiale.hidden = !cannocchiale;
      n.mirino.classList.toggle('nascosto', inMira || io?.stato !== 'vivo');
      n.mirino.style.setProperty('--apertura', `${apertura}px`);
      n.suggerimento.textContent = suggerimento ?? '';
      n.barra.hidden = rianimazione === null;
      if (rianimazione !== null) n.barra.querySelector('i').style.width = `${Math.min(100, rianimazione * 100)}%`;
      const aTerra = io?.stato === 'terra';
      const morto = io?.stato === 'morto';
      n.terra.hidden = !aTerra && !morto;
      if (aTerra) n.terra.textContent = `SEI A TERRA — ${Math.ceil(io.timerTerra)} s\nil tuo amico deve rianimarti`;
      if (morto) n.terra.textContent = 'SEI MORTO — torni al prossimo round';
      n.rete.textContent = rete;
      scelte.aggiorna({ vista, io, host, miniature });
      n.clicca.hidden = bloccato || scelte.visibile;
      const inSala = vista.fase === 'attesa';
      sala.hidden = !inSala || scelte.visibile;
      if (inSala) {
        const conto = vista.conto === null ? null : Math.ceil(vista.conto);
        const chiave = `${conto}|${vista.mappa}|${host}|${vista.giocatori.map(g => `${g.nome}:${g.pronto}:${g.pistola}:${g.aspetto}`).join()}|${io?.pronto}`;
        if (chiave !== chiaveSala) {
          chiaveSala = chiave;
          const titolo = document.createElement('h3');
          titolo.textContent = conto === null ? "SALA D'ATTESA" : `SI PARTE TRA ${conto}`;
          const righe = vista.giocatori.map(g => {
            const riga = document.createElement('div');
            riga.className = g.pronto ? 'pronto' : '';
            riga.textContent = `${g.nome} — ${ASPETTI[g.aspetto ?? 0]}, ${ARMI[g.pistola ?? 'pistola'].nome} — ${g.pronto ? 'PRONTO' : 'si sta preparando'}`;
            return riga;
          });
          const nota = document.createElement('p');
          nota.textContent = `${NOMI_MAPPE[vista.mappa] ?? vista.mappa} · Invio per tornare alle scelte`;
          sala.replaceChildren(titolo, ...righe, nota);
        }
      }
      const attivi = Object.entries(vista.effetti ?? {}).filter(([, s]) => s > 0);
      const chiaveAttivi = attivi.map(([t, s]) => `${t}${Math.ceil(s)}`).join();
      if (chiaveAttivi !== chiaveEffetti) {
        chiaveEffetti = chiaveAttivi;
        effetti.replaceChildren(...attivi.map(([tipo, secondi]) => {
          const chip = document.createElement('span');
          chip.style.setProperty('--colore', `#${BONUS[tipo].colore.toString(16).padStart(6, '0')}`);
          chip.textContent = `${BONUS[tipo].simbolo} ${BONUS[tipo].nome} ${Math.ceil(secondi)}`;
          return chip;
        }));
      }
    },
  };
}
