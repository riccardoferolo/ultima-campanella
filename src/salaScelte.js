import { ARMI, ASPETTI, PISTOLE_INIZIALI } from './regole.js';
import { ELENCO_MAPPE, NOMI_MAPPE } from './mappa.js';

const COLORI_ASPETTO = Object.freeze(['#3f5f34', '#c9ab78', '#3a4560', '#e6eaee', '#c4532f', '#7d7546']);
const DESCRIZIONI_MAPPA = Object.freeze({
  scuola: 'La vecchia scuola di notte: corridoi, aule, il rifugio e il Custode.',
  giungla: 'Il tempio perduto: fiume, grotta, rune, reliquie e il Divoratore.',
});
const SFONDI_MAPPA = Object.freeze({
  scuola: 'linear-gradient(180deg, #121a2e 0%, #2a2f45 60%, #3b3326 100%)',
  giungla: 'linear-gradient(180deg, #0d2418 0%, #1f4a2a 55%, #3a3a1c 100%)',
});
const DISEGNI_MAPPA = Object.freeze({
  scuola: '<svg viewBox="0 0 120 60"><rect x="18" y="22" width="84" height="34" fill="#1b1f2c"/><polygon points="14,24 60,6 106,24" fill="#262b3d"/><rect x="54" y="38" width="12" height="18" fill="#0c0e14"/>'
    + '<g fill="#e8c46a" opacity="0.8"><rect x="26" y="30" width="8" height="7"/><rect x="40" y="30" width="8" height="7"/><rect x="72" y="30" width="8" height="7"/><rect x="86" y="30" width="8" height="7"/></g><rect x="57" y="10" width="6" height="8" fill="#e8c46a"/></svg>',
  giungla: '<svg viewBox="0 0 120 60"><polygon points="34,56 60,14 86,56" fill="#3c3a2a"/><polygon points="44,56 60,30 76,56" fill="#2a2a1e"/><rect x="56" y="44" width="8" height="12" fill="#7dff6a" opacity="0.7"/>'
    + '<g stroke="#1e3a1c" stroke-width="3" fill="none"><path d="M14 58 Q16 34 20 24"/><path d="M104 58 Q102 34 98 22"/></g><g fill="#2f6b34"><ellipse cx="20" cy="22" rx="14" ry="5"/><ellipse cx="98" cy="20" rx="14" ry="5"/></g></svg>',
});
const SOLDATO = colore => `<svg viewBox="0 0 40 60"><circle cx="20" cy="9" r="7" fill="#c9a98a"/><path d="M12 6 Q20 -1 28 6 L28 9 L12 9 Z" fill="${colore}"/>`
  + `<path d="M8 18 Q20 13 32 18 L33 40 L7 40 Z" fill="${colore}"/><rect x="9" y="40" width="9" height="18" fill="${colore}"/><rect x="22" y="40" width="9" height="18" fill="${colore}"/>`
  + '<rect x="7" y="34" width="26" height="3" fill="#2a2418"/></svg>';

function elemento(tag, classe, testo) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (testo !== undefined) e.textContent = testo;
  return e;
}

function barre(dati) {
  const contenitore = elemento('div', 'barre');
  for (const [nome, valore] of dati) {
    const riga = elemento('div', 'barra');
    const pieno = elemento('i');
    pieno.style.width = `${Math.round(Math.max(0.08, Math.min(1, valore)) * 100)}%`;
    const binario = elemento('span');
    binario.append(pieno);
    riga.append(elemento('em', '', nome), binario);
    contenitore.append(riga);
  }
  return contenitore;
}

export function creaSalaScelte(radice, { suScelta }) {
  const pannello = elemento('div', 'sala-scelte');
  pannello.hidden = true;
  radice.append(pannello);
  let chiave = '';
  const massimi = {
    danno: Math.max(...PISTOLE_INIZIALI.map(t => ARMI[t].danno)),
    rateo: Math.max(...PISTOLE_INIZIALI.map(t => 1 / ARMI[t].cadenza)),
    caricatore: Math.max(...PISTOLE_INIZIALI.map(t => ARMI[t].caricatore)),
  };

  function scheda({ scelta, spenta, titolo, figura, sotto, azione }) {
    const s = elemento('button', `scheda${scelta ? ' scelta' : ''}`);
    s.type = 'button';
    s.disabled = !!spenta;
    if (figura) s.append(figura);
    s.append(elemento('b', '', titolo));
    if (sotto) s.append(sotto);
    s.addEventListener('click', azione);
    return s;
  }

  function sezione(titolo, schede, nota) {
    const blocco = elemento('section');
    blocco.append(elemento('h4', '', titolo));
    const griglia = elemento('div', 'griglia');
    griglia.append(...schede);
    blocco.append(griglia);
    if (nota) blocco.append(elemento('p', 'nota', nota));
    return blocco;
  }

  function costruisci({ vista, io, host, miniature }) {
    const titolo = elemento('h3', '', "SALA D'ATTESA");
    const pistole = PISTOLE_INIZIALI.map(tipo => {
      const a = ARMI[tipo];
      const figura = elemento('div', 'figura arma');
      if (miniature?.[tipo]) {
        const img = elemento('img');
        img.src = miniature[tipo];
        img.alt = a.nome;
        figura.append(img);
      }
      return scheda({
        scelta: io.pistola === tipo, titolo: a.nome, figura,
        sotto: barre([['Danno', a.danno / massimi.danno], ['Rateo', (1 / a.cadenza) / massimi.rateo], ['Colpi', a.caricatore / massimi.caricatore]]),
        azione: () => suScelta({ cosa: 'pistola', valore: tipo }),
      });
    });
    const divise = ASPETTI.map((nome, i) => {
      const figura = elemento('div', 'figura soldato');
      figura.innerHTML = SOLDATO(COLORI_ASPETTO[i]);
      return scheda({ scelta: (io.aspetto ?? 0) === i, titolo: nome, figura, azione: () => suScelta({ cosa: 'aspetto', valore: i }) });
    });
    const mappe = ELENCO_MAPPE.map(id => {
      const figura = elemento('div', 'figura mappa');
      figura.style.background = SFONDI_MAPPA[id] ?? '#222';
      figura.innerHTML = DISEGNI_MAPPA[id] ?? '';
      return scheda({
        scelta: vista.mappa === id, spenta: !host && vista.mappa !== id, titolo: NOMI_MAPPE[id] ?? id, figura,
        sotto: elemento('small', '', DESCRIZIONI_MAPPA[id] ?? ''),
        azione: () => suScelta({ cosa: 'mappa', valore: id }),
      });
    });
    const giocatori = elemento('div', 'giocatori');
    for (const g of vista.giocatori) {
      const chip = elemento('span', g.pronto ? 'pronto' : '');
      const pallino = elemento('i');
      pallino.style.background = COLORI_ASPETTO[g.aspetto ?? 0];
      chip.append(pallino, document.createTextNode(`${g.nome} · ${ARMI[g.pistola ?? 'pistola']?.nome ?? ''} · ${g.pronto ? 'pronto' : 'sceglie'}`));
      giocatori.append(chip);
    }
    const pronto = elemento('button', 'pronto-grande', 'SONO PRONTO');
    pronto.type = 'button';
    pronto.addEventListener('click', () => suScelta({ cosa: 'pronto' }));
    const colonne = elemento('div', 'colonne');
    colonne.append(
      sezione('Pistola iniziale', pistole),
      sezione('Divisa', divise),
      sezione('Mappa', mappe, host ? null : 'La mappa la sceglie chi ha creato la stanza'),
    );
    pannello.replaceChildren(titolo, colonne, giocatori, pronto);
  }

  return {
    get visibile() { return !pannello.hidden; },
    aggiorna({ vista, io, host, miniature }) {
      const mostra = vista?.fase === 'attesa' && !!io && !io.pronto;
      pannello.hidden = !mostra;
      if (!mostra) {
        chiave = '';
        return;
      }
      const nuova = `${vista.mappa}|${host}|${io.pistola}|${io.aspetto}|${miniature ? 1 : 0}|${vista.giocatori.map(g => `${g.nome}:${g.pronto}:${g.pistola}:${g.aspetto}`).join()}`;
      if (nuova === chiave) return;
      chiave = nuova;
      costruisci({ vista, io, host, miniature });
    },
  };
}
