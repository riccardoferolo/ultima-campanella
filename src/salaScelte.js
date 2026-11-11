import { ARMI, ASPETTI, PISTOLE_INIZIALI } from './regole.js';
import { ELENCO_MAPPE, NOMI_MAPPE } from './mappa.js';

const COLORI_ASPETTO = Object.freeze(['#3f5f34', '#c9ab78', '#3a4560', '#e6eaee', '#c4532f', '#7d7546']);
const DESCRIZIONI_MAPPA = Object.freeze({
  scuola: 'La vecchia scuola di notte: corridoi, aule, il rifugio e il Custode.',
  giungla: 'Il tempio perduto: fiume, grotta, rune, reliquie e il Divoratore.',
  teatro: "Un teatro del '66 in rovina: scalone, camerini, caldaia, sipario e la Forgia Arcana.",
  palude: 'Il bayou di notte: passerelle, baracche, il cimitero dei relitti e il Teschio di Malakor.',
  piazza: 'Piazza Crespi a Cerano: la chiesa della Natività, il Municipio, il campanile di 45 metri e le sue campane.',
});
const SFONDI_MAPPA = Object.freeze({
  scuola: 'linear-gradient(180deg, #121a2e 0%, #2a2f45 60%, #3b3326 100%)',
  giungla: 'linear-gradient(180deg, #0d2418 0%, #1f4a2a 55%, #3a3a1c 100%)',
  teatro: 'linear-gradient(180deg, #14070a 0%, #3a0d14 55%, #2a1a0c 100%)',
  palude: 'linear-gradient(180deg, #0c1712 0%, #1b3124 55%, #14211a 100%)',
  piazza: 'linear-gradient(180deg, #0a1224 0%, #1d2a44 55%, #4a3418 100%)',
});
const DISEGNI_MAPPA = Object.freeze({
  piazza: '<svg viewBox="0 0 120 60"><rect y="52" width="120" height="8" fill="#2a2622"/>'
    + '<rect x="80" y="8" width="9" height="44" fill="#8c4a32"/><polygon points="80,8 84.5,-2 89,8" fill="#7a3c28"/><rect x="80" y="18" width="9" height="7" fill="#e8dcc0"/><circle cx="84.5" cy="21.5" r="2.6" fill="#fff6dc" stroke="#3a2a1a" stroke-width="0.6"/>'
    + '<rect x="81.5" y="11" width="2" height="4" fill="#1a1410"/><rect x="85.5" y="11" width="2" height="4" fill="#1a1410"/>'
    + '<rect x="26" y="30" width="52" height="22" fill="#d9a85a"/><rect x="40" y="20" width="24" height="32" fill="#e2b466"/><rect x="38" y="18" width="28" height="3" fill="#c08a48"/>'
    + '<path d="M44 52 V38 Q52 30 60 38 V52 Z" fill="#3a2416"/><path d="M41 36 Q52 24 63 36" fill="none" stroke="#b06a3a" stroke-width="2"/>'
    + '<ellipse cx="70" cy="24" rx="8" ry="6" fill="#3c5a52"/><rect x="68.5" y="14" width="3" height="5" fill="#e8e0cc"/>'
    + '<g fill="#c97a4a"><rect x="45" y="13" width="2" height="5"/><rect x="51" y="12" width="2" height="6"/><rect x="57" y="13" width="2" height="5"/></g>'
    + '<rect x="2" y="30" width="22" height="22" fill="#e6d27a"/><g fill="#ffe9a8" opacity="0.85"><rect x="5" y="34" width="3" height="5"/><rect x="11" y="34" width="3" height="5"/><rect x="17" y="34" width="3" height="5"/></g></svg>',
  scuola: '<svg viewBox="0 0 120 60"><rect x="18" y="22" width="84" height="34" fill="#1b1f2c"/><polygon points="14,24 60,6 106,24" fill="#262b3d"/><rect x="54" y="38" width="12" height="18" fill="#0c0e14"/>'
    + '<g fill="#e8c46a" opacity="0.8"><rect x="26" y="30" width="8" height="7"/><rect x="40" y="30" width="8" height="7"/><rect x="72" y="30" width="8" height="7"/><rect x="86" y="30" width="8" height="7"/></g><rect x="57" y="10" width="6" height="8" fill="#e8c46a"/></svg>',
  giungla: '<svg viewBox="0 0 120 60"><polygon points="34,56 60,14 86,56" fill="#3c3a2a"/><polygon points="44,56 60,30 76,56" fill="#2a2a1e"/><rect x="56" y="44" width="8" height="12" fill="#7dff6a" opacity="0.7"/>'
    + '<g stroke="#1e3a1c" stroke-width="3" fill="none"><path d="M14 58 Q16 34 20 24"/><path d="M104 58 Q102 34 98 22"/></g><g fill="#2f6b34"><ellipse cx="20" cy="22" rx="14" ry="5"/><ellipse cx="98" cy="20" rx="14" ry="5"/></g></svg>',
  teatro: '<svg viewBox="0 0 120 60"><rect x="14" y="10" width="92" height="48" fill="#1c0c0e"/><rect x="24" y="16" width="72" height="34" fill="#0a0506"/>'
    + '<path d="M24 16 Q34 34 30 50 L24 50 Z" fill="#8a1424"/><path d="M96 16 Q86 34 90 50 L96 50 Z" fill="#8a1424"/><rect x="24" y="14" width="72" height="6" fill="#b08a3a"/>'
    + '<circle cx="60" cy="31" r="9" fill="#020203"/><circle cx="60" cy="31" r="11" fill="none" stroke="#ffb070" stroke-width="2" opacity="0.8"/><rect x="18" y="52" width="84" height="6" fill="#4e0c13"/></svg>',
  palude: '<svg viewBox="0 0 120 60"><circle cx="96" cy="11" r="5" fill="#d8e4c4" opacity="0.6"/><rect y="46" width="120" height="14" fill="#0b1712"/>'
    + '<g fill="#162619"><path d="M15 47 L19 16 L23 47 Z"/><path d="M100 47 L104 20 L108 47 Z"/></g><g fill="#21392a"><ellipse cx="19" cy="16" rx="12" ry="4"/><ellipse cx="104" cy="20" rx="10" ry="4"/></g>'
    + '<g stroke="#3b5a3c" stroke-width="1"><path d="M11 17 v8"/><path d="M26 17 v10"/><path d="M98 21 v7"/></g>'
    + '<g fill="#3d3122"><rect x="54" y="40" width="2" height="8"/><rect x="76" y="40" width="2" height="8"/><rect x="4" y="44" width="50" height="2"/></g>'
    + '<rect x="50" y="27" width="30" height="14" fill="#2a2418"/><polygon points="47,28 65,18 83,28" fill="#3a3024"/><rect x="70" y="32" width="6" height="9" fill="#100c08"/>'
    + '<rect x="57" y="31" width="7" height="6" fill="#e8b04a" opacity="0.85"/><rect x="57" y="50" width="7" height="3" fill="#e8b04a" opacity="0.2"/>'
    + '<rect y="38" width="120" height="12" fill="#6dff8a" opacity="0.06"/></svg>',
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
