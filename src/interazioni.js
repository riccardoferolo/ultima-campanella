import { R, ARMI, BEVANDE } from './regole.js';
import { FINESTRE, PORTE, ACQUISTI, zoneAperte } from './mappa.js';

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function interazioneVicina(io, vista) {
  const compagno = vista.giocatori.find(g => g.id !== io.id && g.stato === 'terra' && distanza(g, io) <= R.RIANIMA_DISTANZA);
  if (compagno) return { tipo: 'rianima', testo: `Tieni premuto F per rianimare ${compagno.nome}`, bersaglio: compagno.id };

  const candidati = [];
  for (const porta of PORTE) {
    if (vista.porte.has(porta.id)) continue;
    const d = distanza(porta.centro, io);
    if (d <= R.DISTANZA_ACQUISTO) candidati.push({ d, tipo: 'compra', acquisto: `porta:${porta.id}`, costo: porta.costo, testo: `Premi F per aprire: ${porta.nome} [${porta.costo}]` });
  }
  for (const f of FINESTRE) {
    if (vista.finestre[f.id] >= R.ASSE_PER_FINESTRA) continue;
    const d = distanza(f.interno, io);
    if (d <= R.DISTANZA_FINESTRA) candidati.push({ d: d + 0.5, tipo: 'assa', finestra: f.id, testo: 'Tieni premuto F per rimettere le assi' });
  }
  const aperte = zoneAperte(vista.porte);
  for (const a of ACQUISTI) {
    if (!aperte.has(a.zona)) continue;
    const d = distanza(a.posizione, io);
    if (d > R.DISTANZA_ACQUISTO) continue;
    candidati.push({ d, tipo: 'compra', acquisto: a.id, ...descrivi(a, io, vista) });
  }
  candidati.sort((a, b) => a.d - b.d);
  return candidati[0] ?? null;
}

function descrivi(a, io, vista) {
  if (a.tipo === 'arma') {
    const possiede = io.armi.includes(a.arma);
    const costo = possiede ? a.munizioni : a.costo;
    return { costo, testo: possiede ? `Premi F per le munizioni: ${ARMI[a.arma].nome} [${costo}]` : `Premi F per comprare: ${ARMI[a.arma].nome} [${costo}]` };
  }
  if (a.tipo === 'bevanda') {
    const bevanda = BEVANDE[a.bevanda];
    if (io.bevande.includes(a.bevanda)) return { costo: Infinity, testo: `${bevanda.nome}: ce l'hai già` };
    return { costo: bevanda.costo, testo: `Premi F per bere: ${bevanda.nome}, ${bevanda.descrizione} [${bevanda.costo}]` };
  }
  const cassa = vista.cassa;
  if (cassa.stato === 'aperta' && cassa.per === io.id) return { costo: 0, testo: `Premi F per prendere: ${ARMI[cassa.arma].nome}` };
  if (cassa.stato === 'aperta') return { costo: Infinity, testo: 'La cassa è occupata' };
  return { costo: R.COSTO_CASSA, testo: `Premi F per la cassa a sorpresa [${R.COSTO_CASSA}]` };
}
