import { R, ARMI, BEVANDE, armaBase, versionePotenziata } from './regole.js';
import { FINESTRE, PORTE, ACQUISTI, FRAMMENTI, SOGLIA_RIFUGIO, zoneAperte, zonaDi } from './mappa.js';

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function interazioneVicina(io, vista) {
  if (vista.fase === 'attesa') return null;
  const compagno = vista.giocatori.find(g => g.id !== io.id && g.stato === 'terra' && distanza(g, io) <= R.RIANIMA_DISTANZA);
  if (compagno) return { tipo: 'rianima', testo: `Tieni premuto F per rianimare ${compagno.nome}`, bersaglio: compagno.id };

  const candidati = [];
  for (const f of FRAMMENTI) {
    if (vista.frammenti?.includes(f.id)) continue;
    const d = distanza(f, io);
    if (d <= R.DISTANZA_FRAMMENTO) candidati.push({ d: d - 1, tipo: 'frammento', id: f.id, acquisto: `frammento:${f.id}`, testo: 'Premi F per raccogliere lo strano frammento luminoso' });
  }
  for (const f of vista.missione?.aTerra ?? []) {
    const d = distanza(f, io);
    if (d <= R.DISTANZA_FUSIBILE) candidati.push({ d: d - 1, tipo: 'compra', acquisto: `fusibile:${f.id}`, costo: 0, testo: 'Premi F per prendere il fusibile' });
  }
  for (const porta of PORTE) {
    if (vista.porte.has(porta.id)) continue;
    if (porta.chiusa) {
      const d = distanza(porta.centro, io);
      if (d <= R.DISTANZA_ACQUISTO) candidati.push({ d: d + 0.3, tipo: 'info', testo: vista.fase === 'finale' ? 'Il cancello è sbarrato: uccidete il Custode!' : 'Cancello del rifugio: si apre col quadro qui accanto' });
      continue;
    }
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

function descriviPotenziatore(io, vista) {
  const macchina = vista.potenziatore;
  if (!vista.corrente) return { costo: Infinity, testo: 'Il potenziatore non ha corrente: accendila in caldaia' };
  if (macchina.stato === 'pronta' && macchina.per === io.id) return { costo: 0, testo: `Premi F per prendere: ${ARMI[macchina.arma].nome}` };
  if (macchina.stato !== 'libero') return { costo: Infinity, testo: macchina.per === io.id ? 'Il potenziatore sta lavorando…' : 'Il potenziatore è occupato' };
  const potenziata = io.armaAttiva ? versionePotenziata(io.armaAttiva) : null;
  if (!potenziata) return { costo: Infinity, testo: 'Questa arma è già potenziata' };
  return { costo: R.COSTO_POTENZIA, testo: `Premi F per potenziare: ${ARMI[io.armaAttiva].nome} [${R.COSTO_POTENZIA}]` };
}

function descriviQuadro(vista) {
  const m = vista.missione;
  if (m.messi >= R.FUSIBILI) return { costo: Infinity, testo: 'Il quadro è completo: il cancello è aperto' };
  if (!vista.corrente) return { costo: Infinity, testo: `Quadro del cancello senza corrente (fusibili ${m.messi}/${R.FUSIBILI})` };
  if (m.fusibili === 0) return { costo: Infinity, testo: `Quadro del cancello: fusibili ${m.messi}/${R.FUSIBILI}` };
  return { costo: 0, testo: `Premi F per inserire ${m.fusibili === 1 ? 'il fusibile' : `${m.fusibili} fusibili`} (${m.messi}/${R.FUSIBILI})` };
}

function descriviGeneratore(vista) {
  const m = vista.missione;
  if (m.generatore === 'finito') return { costo: Infinity, testo: 'Il generatore ha finito il suo lavoro' };
  if (m.generatore === 'acceso') return { costo: Infinity, testo: `Generatore ${Math.round(m.progresso * 100)}% — restate vicini!` };
  if (vista.fase !== 'gioco') return { costo: Infinity, testo: 'Il generatore si avvia solo durante un round' };
  return { costo: 0, testo: 'Premi F per avviare il generatore (dovrete difenderlo)' };
}

function descriviAllarme(vista) {
  if (vista.fase === 'finale') return { costo: Infinity, testo: '' };
  const fuori = vista.giocatori.filter(g => g.stato !== 'morto').some(g => zonaDi(g.x, g.z) !== 'rifugio' || g.z >= SOGLIA_RIFUGIO);
  if (fuori) return { costo: Infinity, testo: "Entrate tutti nel rifugio per suonare l'ultima campanella" };
  return { costo: 0, testo: "Premi F per suonare l'ultima campanella (non si torna indietro)" };
}

function descrivi(a, io, vista) {
  if (a.tipo === 'arma') {
    const possiede = io.armi.some(x => armaBase(x) === a.arma);
    const costo = possiede ? a.munizioni : a.costo;
    return { costo, testo: possiede ? `Premi F per le munizioni: ${ARMI[a.arma].nome} [${costo}]` : `Premi F per comprare: ${ARMI[a.arma].nome} [${costo}]` };
  }
  if (a.tipo === 'bevanda') {
    const bevanda = BEVANDE[a.bevanda];
    if (io.bevande.includes(a.bevanda)) return { costo: Infinity, testo: `${bevanda.nome}: ce l'hai già` };
    return { costo: bevanda.costo, testo: `Premi F per bere: ${bevanda.nome}, ${bevanda.descrizione} [${bevanda.costo}]` };
  }
  if (a.tipo === 'interruttore') {
    return vista.corrente ? { costo: Infinity, testo: 'La corrente è accesa' } : { costo: 0, testo: 'Premi F per accendere la corrente' };
  }
  if (a.tipo === 'potenziatore') return descriviPotenziatore(io, vista);
  if (a.tipo === 'quadro') return descriviQuadro(vista);
  if (a.tipo === 'generatore') return descriviGeneratore(vista);
  if (a.tipo === 'allarme') return descriviAllarme(vista);
  if (a.tipo === 'campanella') return { costo: 0, testo: 'Premi F per suonare la vecchia campanella' };
  const cassa = vista.cassa;
  if (cassa.stato === 'aperta' && cassa.per === io.id) return { costo: 0, testo: `Premi F per prendere: ${ARMI[cassa.arma].nome}` };
  if (cassa.stato === 'aperta') return { costo: Infinity, testo: 'La cassa è occupata' };
  const costo = vista.effetti?.saldi > 0 ? R.COSTO_CASSA_SALDI : R.COSTO_CASSA;
  return { costo, testo: `Premi F per la cassa a sorpresa [${costo}]${costo < R.COSTO_CASSA ? ' SALDI!' : ''}` };
}
