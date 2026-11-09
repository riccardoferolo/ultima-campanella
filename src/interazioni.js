import { R, ARMI, BEVANDE, armaBase, versionePotenziata } from './regole.js';
import { FINESTRE, PORTE, ACQUISTI, FRAMMENTI, SOGLIA_RIFUGIO, zoneAperte, zonaDi } from './mappa.js';
import { OGGETTI } from './mappe/giungla.js';
import { ID_ASSI, ID_SCHEGGIA_GROTTA, ID_SCHEGGIA_FIUME, ID_MASCHERA, RELIQUIE, ASSI, SCHEGGE, ANIME_PER_IDOLO } from './giungla.js';
import { RUNE } from './storia.js';

const DISTANZA_OGGETTO = 1.8;
const PORTE_CHIUSE = Object.freeze({
  ponte: 'Il ponte è crollato: servono le assi del villaggio, da portare al cantiere',
  tempio: "La porta del tempio: si apre con la maschera dello Sciamano",
  sigillo: "Il sigillo del cuore: cede solo al colpo speciale di una reliquia",
});
const NOMI_OGGETTI = Object.freeze({ [ID_SCHEGGIA_GROTTA]: 'la scheggia di giada', [ID_MASCHERA]: 'la maschera dello Sciamano' });

function testoOggetto(id) {
  if (ID_ASSI.includes(id)) return 'Premi F per prendere il fascio di assi';
  const reliquia = Object.entries(RELIQUIE).find(([, n]) => n === id)?.[0];
  if (reliquia) return `Premi F per prendere: ${ARMI[reliquia].nome}`;
  return `Premi F per prendere ${NOMI_OGGETTI[id] ?? "l'oggetto"}`;
}

function candidatiGiungla(io, vista, candidati) {
  const g = vista.giungla;
  for (const o of g.oggetti) {
    const d = distanza(o, io);
    if (d <= DISTANZA_OGGETTO) candidati.push({ d: d - 1, tipo: 'compra', acquisto: `oggetto:${o.id}`, costo: 0, testo: testoOggetto(o.id) });
  }
  if (g.ponte === 2 && !g.scheggiaFiume && distanza(g.cassaFiume, io) <= DISTANZA_OGGETTO) {
    candidati.push({ d: -2, tipo: 'compra', acquisto: `oggetto:${ID_SCHEGGIA_FIUME}`, costo: 0, testo: 'Premi F per afferrare la cassa che galleggia!' });
  }
}

function descriviGiungla(a, io, vista) {
  const g = vista.giungla;
  const nessuno = testo => ({ costo: Infinity, testo });
  switch (a.tipo) {
    case 'generatoreG': {
      const gen = g.generatori[a.generatore];
      if (gen.stato === 2) return nessuno('Il generatore gira da solo');
      if (gen.stato === 1) return nessuno(`Generatore ${Math.round(gen.progresso * 100)}% — restate vicini!`);
      return vista.fase === 'gioco' ? { costo: 0, testo: 'Premi F per avviare il generatore (dovrete difenderlo)' } : nessuno('Il generatore si avvia solo durante un round');
    }
    case 'radio':
      if (!vista.corrente) return nessuno('La radio è muta: servono i due generatori');
      return { costo: 0, testo: g.radioAscoltati < g.radioLivello ? 'Premi F per ascoltare un nuovo messaggio' : 'Premi F per riascoltare la radio' };
    case 'cantiere':
      if (g.ponte === 2) return nessuno('Il ponte regge');
      if (g.ponte === 1) return nessuno(`Il ponte è a metà: ${Math.round(g.progressoPonte * 100)}% — difendetelo!`);
      if (g.assiRaccolte > 0) return { costo: 0, testo: `Premi F per posare le assi (${g.assiPortate + g.assiRaccolte}/${ASSI})` };
      if (g.assiPortate >= ASSI) return vista.fase === 'gioco' ? { costo: 0, testo: 'Premi F per costruire il ponte (dovrete difenderlo)' } : nessuno('Si costruisce solo durante un round');
      return nessuno(`Cantiere del ponte: assi ${g.assiPortate}/${ASSI}, le trovate nel villaggio`);
    case 'cabina':
      if (g.scheggiaAereo) return nessuno('La cabina è vuota');
      return vista.corrente ? { costo: 0, testo: 'Premi F per aprire il vano della cabina' } : nessuno('La cabina è al buio: serve la corrente');
    case 'altare':
      if (g.altare === 1) return nessuno("L'altare sta forgiando: finite il round");
      if (g.altare >= 2) return nessuno("L'altare ha dato il suo dono");
      return g.schegge > 0 ? { costo: 0, testo: `Premi F per posare le schegge di giada (${g.scheggeAltare + g.schegge}/${SCHEGGE})` } : nessuno(`Altare di giada: schegge ${g.scheggeAltare}/${SCHEGGE}`);
    case 'pietraSole':
      return g.sole === 0 ? { costo: 0, testo: 'Premi F per girare la pietra del sole' } : nessuno('Le pietre sono allineate');
    case 'portaTempio':
      if (g.porta === 2) return nessuno('La porta è aperta');
      if (g.porta === 1) return nessuno(`La porta sale: ${Math.round(g.progressoPorta * 100)}% — tenete la posizione!`);
      if (g.sciamano === 3) return { costo: 0, testo: 'Premi F per mettere la maschera sulla porta' };
      if (g.sciamano === 4) return vista.fase === 'gioco' ? { costo: 0, testo: 'Premi F per risvegliare la porta (dovrete difenderla)' } : nessuno('La porta si risveglia solo durante un round');
      return nessuno('Sulla porta c’è l’impronta di una maschera');
    case 'runa':
      if (g.rune === 1) return nessuno('Le rune brillano');
      return { costo: 0, testo: `Premi F per toccare la runa del ${RUNE[a.runa]}` };
    case 'cuoreAltare':
      if (vista.fase === 'finale') return nessuno('');
      if (vista.giocatori.filter(x => x.stato !== 'morto').some(x => zonaDi(x.x, x.z) !== 'cuore' || x.z <= OGGETTI.SOGLIA_CUORE)) return nessuno("Entrate tutti nella camera del cuore per toccare l'altare");
      return { costo: 0, testo: "Premi F per svegliare il Divoratore (non si torna indietro)" };
    case 'idolo':
      return nessuno(g.idoli[a.idolo] >= ANIME_PER_IDOLO ? "L'idolo è sazio" : `Idolo del serpente: anime ${g.idoli[a.idolo]}/${ANIME_PER_IDOLO}`);
    default:
      return null;
  }
}

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
  if (vista.giungla) candidatiGiungla(io, vista, candidati);
  for (const porta of PORTE) {
    if (vista.porte.has(porta.id)) continue;
    if (porta.chiusa) {
      const d = distanza(porta.centro, io);
      const testo = vista.fase === 'finale' ? 'È sbarrato: prima vincete lo scontro!' : PORTE_CHIUSE[porta.id] ?? 'Cancello del rifugio: si apre col quadro qui accanto';
      if (d <= R.DISTANZA_ACQUISTO) candidati.push({ d: d + 0.3, tipo: 'info', testo });
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
  const giungla = vista.giungla ? descriviGiungla(a, io, vista) : null;
  if (giungla) return giungla;
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
