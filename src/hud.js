import { ARMI, BEVANDE, BONUS } from './regole.js';

const $ = id => document.getElementById(id);
const DURATA_AVVISO_MS = 2200;
const DURATA_SEGNO_MS = 140;

export function creaHud() {
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
  n.radice.append(sala, effetti);
  let chiaveSala = '';
  let chiaveEffetti = '';
  let scadenzaAvviso = 0;
  let scadenzaSegno = 0;
  let puntiPrima = null;
  let chiavePunti = '';

  function avviso(testo, tipo = 'pericolo') {
    n.avviso.textContent = testo;
    n.avviso.classList.toggle('bene', tipo === 'bene');
    n.avviso.classList.add('visibile');
    scadenzaAvviso = performance.now() + DURATA_AVVISO_MS;
  }

  function disegnaPunti(vista, mioId) {
    const ordinati = [...vista.giocatori].sort((a, b) => (a.id === mioId ? -1 : b.id === mioId ? 1 : 0));
    const chiave = ordinati.map(g => `${g.id}:${g.punti}:${g.nome}`).join('|');
    if (chiave === chiavePunti) return;
    chiavePunti = chiave;
    const mio = ordinati.find(g => g.id === mioId);
    const guadagno = mio && puntiPrima !== null && mio.punti > puntiPrima ? mio.punti - puntiPrima : 0;
    puntiPrima = mio?.punti ?? null;
    n.punti.replaceChildren(...ordinati.map(g => {
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
      n.punti.prepend(segno);
    }
  }

  return {
    mostra(visibile) {
      n.radice.hidden = !visibile;
    },
    avviso,
    segno(testa) {
      n.segno.classList.add('visibile');
      n.segno.classList.toggle('testa', testa);
      scadenzaSegno = performance.now() + DURATA_SEGNO_MS;
    },
    aggiorna({ vista, mioId, arma, suggerimento, rianimazione, inMira, cannocchiale, bloccato, rete, apertura }) {
      const io = vista.giocatori.find(g => g.id === mioId);
      const ora = performance.now();
      if (ora > scadenzaAvviso) n.avviso.classList.remove('visibile');
      if (ora > scadenzaSegno) n.segno.classList.remove('visibile');
      n.round.textContent = vista.round > 0 ? String(vista.round) : '';
      n.round.classList.toggle('lampeggia', vista.fase === 'intervallo' && vista.round > 0);
      disegnaPunti(vista, mioId);
      n.nomeArma.textContent = ARMI[arma.tipo].nome;
      n.nomeArma.classList.toggle('potenziata', arma.tipo.endsWith('+'));
      n.munizioni.textContent = `${arma.caricatore} / ${arma.riserva}`;
      n.munizioni.classList.toggle('poche', arma.caricatore <= Math.ceil(ARMI[arma.tipo].caricatore / 4));
      const bevande = io?.bevande ?? [];
      if (n.bibite.dataset.chiave !== bevande.join()) {
        n.bibite.dataset.chiave = bevande.join();
        n.bibite.replaceChildren(...bevande.map(b => {
          const icona = document.createElement('i');
          icona.style.background = `#${BEVANDE[b].colore.toString(16).padStart(6, '0')}`;
          icona.title = BEVANDE[b].nome;
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
      n.clicca.hidden = bloccato;
      const inSala = vista.fase === 'attesa';
      sala.hidden = !inSala;
      if (inSala) {
        const conto = vista.conto === null ? null : Math.ceil(vista.conto);
        const chiave = `${conto}|${vista.giocatori.map(g => `${g.nome}:${g.pronto}`).join()}|${io?.pronto}`;
        if (chiave !== chiaveSala) {
          chiaveSala = chiave;
          const titolo = document.createElement('h3');
          titolo.textContent = conto === null ? "SALA D'ATTESA" : `SI PARTE TRA ${conto}`;
          const righe = vista.giocatori.map(g => {
            const riga = document.createElement('div');
            riga.className = g.pronto ? 'pronto' : '';
            riga.textContent = `${g.nome} — ${g.pronto ? 'PRONTO' : 'si sta preparando'}`;
            return riga;
          });
          const nota = document.createElement('p');
          nota.textContent = io?.pronto ? 'Invio: aspetta, non sono pronto' : 'Prova le armi al muro (F) · INVIO quando sei pronto';
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
