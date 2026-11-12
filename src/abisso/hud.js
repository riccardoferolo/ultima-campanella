import { inventario } from './testi.js';
import { A } from './costanti.js';

const DURATA_TROFEO_MS = 9000;
const SVG_OK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const SVG_ATTIVO = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="4" fill="currentColor"/></svg>';
const SVG_CHIUSO = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="7" width="8" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
const ICONE = Object.freeze({ fatto: SVG_OK, attivo: SVG_ATTIVO, chiuso: SVG_CHIUSO });

function elemento(tag, classe, genitore) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  genitore?.append(e);
  return e;
}

export function creaHudAbisso(radice) {
  const strumenti = elemento('div', 'abisso-strumenti', radice);
  const ossigeno = elemento('div', 'abisso-barra ossigeno', strumenti);
  const livelloOssigeno = elemento('i', '', ossigeno);
  ossigeno.dataset.testo = 'OSSIGENO';
  const scudo = elemento('div', 'abisso-barra scudo', strumenti);
  const livelloScudo = elemento('i', '', scudo);
  scudo.dataset.testo = 'SCUDO · E onda sonica';
  const pannello = elemento('section', 'abisso-inventario', radice);
  pannello.hidden = true;
  pannello.setAttribute('aria-label', 'Inventario della missione');
  const trofeo = elemento('div', 'abisso-trofeo', radice);
  trofeo.hidden = true;
  trofeo.setAttribute('role', 'status');
  const grande = elemento('div', 'abisso-allarme', radice);
  grande.hidden = true;
  let scadenzaTrofeo = 0;
  let chiavePannello = '';

  function disegnaPannello(vista, mioId) {
    const dati = inventario(vista, mioId);
    if (!dati) return;
    const chiave = JSON.stringify(dati);
    if (chiave === chiavePannello) return;
    chiavePannello = chiave;
    const titolo = document.createElement('h3');
    titolo.textContent = dati.titolo;
    const passi = document.createElement('ol');
    for (const v of dati.voci) {
      const li = document.createElement('li');
      li.className = v.stato;
      li.innerHTML = ICONE[v.stato];
      li.append(document.createTextNode(v.nome));
      passi.append(li);
    }
    const oggetti = document.createElement('dl');
    for (const o of dati.oggetti) {
      const dt = document.createElement('dt');
      dt.textContent = o.nome;
      const dd = document.createElement('dd');
      dd.textContent = o.valore;
      oggetti.append(dt, dd);
    }
    const nota = document.createElement('p');
    nota.textContent = dati.simboli.length ? `Inno: ${dati.simboli.join(' · ')}` : 'TAB per chiudere';
    pannello.replaceChildren(titolo, passi, oggetti, nota);
  }

  return {
    aggiorna(vista, mioId, { mostraInventario = false } = {}) {
      const ab = vista.abisso;
      const attivo = !!ab && vista.fase !== 'attesa';
      const mio = ab?.giocatori?.[mioId];
      const aria = mio?.ossigeno ?? 1;
      ossigeno.hidden = !attivo || aria >= 0.999;
      if (!ossigeno.hidden) {
        livelloOssigeno.style.width = `${Math.round(aria * 100)}%`;
        ossigeno.classList.toggle('critico', aria < 0.3);
      }
      scudo.hidden = !attivo || !(mio?.scudo > 0);
      if (!scudo.hidden) livelloScudo.style.width = `${Math.round((mio.scudo / A.SCUDO_VITA) * 100)}%`;
      pannello.hidden = !attivo || !mostraInventario;
      if (!pannello.hidden) disegnaPannello(vista, mioId);
      if (performance.now() > scadenzaTrofeo) trofeo.hidden = true;
      const stordito = ab?.leviatano?.fase === 'stordito';
      const decompressione = (ab?.stagna?.decompressione ?? 0) > 0;
      grande.hidden = !(stordito || decompressione);
      if (!grande.hidden) grande.textContent = stordito ? 'IL CUORE È SCOPERTO' : `DECOMPRESSIONE ${Math.ceil(ab.stagna.decompressione)}`;
    },
    trofeo(righe) {
      trofeo.replaceChildren(...righe.map((r, i) => {
        const p = document.createElement(i === 0 ? 'strong' : 'p');
        p.textContent = r;
        return p;
      }));
      trofeo.hidden = false;
      scadenzaTrofeo = performance.now() + DURATA_TROFEO_MS;
    },
  };
}
