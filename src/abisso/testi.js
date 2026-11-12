import { BEVANDE, armaBase } from '../regole.js';
import { quota, nomeBevanda } from '../mappa.js';
import { BARRE, OGGETTI, SIMBOLI } from '../mappe/abisso.js';
import { A, PASSO, NOMI_PASSI } from './costanti.js';

const MARA = 'RADIO · NAVE NEREIDE — Mara Lenzi';
const SANDRI = 'REGISTRAZIONE · Dott. Aurelio Sandri, Consorzio Talassa';

export const DIALOGHI = Object.freeze({
  intro: [MARA, 'Batiscafo, mi ricevete? Siete a undicimila metri, sul fondo della Fossa.', 'La stazione Abyssus-9 è al buio: riaccendete le tre turbine prima che la pressione la schiacci.'],
  corrente: [SANDRI, 'Giorno 211. Se le turbine girano, qualcuno è sceso a cercarci. Non avreste dovuto.', 'Le quattro valvole della Cupola: giratele nell\'ordine in cui si accendono i manometri. Il Protocollo Abisso è l\'unica speranza.'],
  protocollo: [SANDRI, 'Il Protocollo è attivo. Sentite la sirena? Lui la sente ancora meglio.', 'Allagate il pozzo del reattore dal pannello e strappate le tre barre di oricalco dalle turbine. Trattenete il fiato.'],
  allagamento: [MARA, 'L\'acqua invade il pozzo! Avete aria per una ventina di secondi.', 'Spazio per nuotare in su, C per scendere: tornate in superficie a respirare.'],
  barre: [SANDRI, 'Oricalco puro… il metallo di Atlantide. La fucina del reattore ne farà il Cannone di Cariddi.', 'I nodi parassiti succhiano la pressione dalle vetrate: implodete il globo di Cariddi lì vicino e raccoglieteli.'],
  nodi: [SANDRI, 'Le vetrate respirano di nuovo. Ma il Nucleo Abissale è dentro lo scafandro del Palombaro.', 'Attiratelo nella Camera Stagna, sigillatela dal quadro e decomprimete. Nessun ottone regge l\'abisso.'],
  palombaro: [MARA, 'Sui sensori c\'è qualcosa di pesante: un palombaro corazzato!', 'Le bombole sulla schiena sono il suo punto debole. Attenti all\'arpione e al vapore.'],
  nucleo: [SANDRI, 'Il Nucleo! Ancora caldo. Portatelo all\'altare di Poseidone nel Santuario.', 'Gli atlantidei vi daranno ciò che spetta a chi scende così in basso.'],
  tridenti: [SANDRI, 'Il tridente di Poseidone risponde a chi lo stringe: fendente col sinistro, fulmine tenendo il destro.', 'Nell\'Anfiteatro le colonne cantano un inno. Fate suonare le canne dell\'organo con il fulmine, nello stesso ordine.'],
  inno: [MARA, 'La cupola dell\'anfiteatro si sta incrinando… i sonar impazziscono.', 'Il Leviatano sta salendo dalla vasca. Che Dio vi aiuti.'],
  leviatano: [SANDRI, 'Eccolo. Il Leviatano. L\'oricalco l\'ha divorato da dentro, come ha divorato noi.', 'Le scaglie respingono il piombo: caricate i quattro piloni con i fulmini del tridente e colpitegli il cuore con Cariddi.'],
  marea: [SANDRI, 'La marea sale! L\'acqua copre i gradoni bassi: salite e sovraccaricate i piloni!', 'Solo quando il cuore è scoperto potete fargli male davvero.'],
  vittoria: [MARA, '…è finito. Il segnale del Leviatano è sparito dal sonar.', 'Pressione critica superata. Ma dal fondo continuano a salire. Resistete finché potete.'],
  scudo: [MARA, 'Lo scudo da palombaro vi copre la schiena.', 'Premete E per scatenare un\'onda sonica davanti a voi.'],
});

const EFFETTI_BEVANDE = Object.freeze({
  ferro: 'reggi fino a 250 di vita',
  lampo: 'ricarichi il doppio più in fretta',
  raffica: 'spari più veloce e ogni proiettile vale doppio',
  scatto: 'corri più veloce, nuoti meglio e trattieni il fiato più a lungo',
  ritorno: 'rianimi in fretta; da solo ti rialzi da terra tre volte',
});
const percento = v => `${Math.round(v * 100)}%`;
const nessuno = testo => ({ costo: Infinity, testo });
const nascosto = Object.freeze({ costo: Infinity, testo: '', nascosto: true });
const possiede = (io, arma) => io.armi.some(a => armaBase(a) === arma);
const NOMI_CONDOTTI = Object.freeze({ delta: "l'Anfiteatro Abissale", beta: 'la Sala del Reattore' });

function dentroStagna(p) {
  const s = OGGETTI.STAGNA;
  return p.x > s.x0 && p.x < s.x1 && p.z > s.z0 && p.z < s.z1;
}

export function descrivi(a, io, vista) {
  const ab = vista.abisso;
  if (!ab) return null;
  switch (a.tipo) {
    case 'bevanda': {
      const nome = nomeBevanda(a.bevanda, BEVANDE);
      if (!vista.corrente && a.bevanda !== 'ritorno') return nessuno(`${nome}: spenta, servono le tre turbine`);
      if (io.bevande.includes(a.bevanda)) return nessuno(`${nome}: ce l'hai già`);
      return { costo: BEVANDE[a.bevanda].costo, testo: `Premi F per bere: ${nome}, ${EFFETTI_BEVANDE[a.bevanda] ?? BEVANDE[a.bevanda].descrizione} [${BEVANDE[a.bevanda].costo}]` };
    }
    case 'turbina': {
      const t = ab.turbine[a.indice];
      if (t >= 1) return nessuno('Turbina accesa');
      if (t > 0) return nessuno(`Turbina in avvio: ${percento(t)}`);
      return { costo: 0, testo: 'Premi F per avviare la turbina' };
    }
    case 'valvola':
      if (ab.protocollo) return nessuno('Il Protocollo Abisso è attivo');
      if (!vista.corrente) return nessuno('Valvola di pressione: senza le turbine non gira');
      return { costo: 0, testo: `Premi F per girare la valvola di pressione (${ab.valvole.premute}/4)` };
    case 'pannello':
      if (!ab.protocollo) return nessuno('Pannello di allagamento: bloccato dal Consorzio');
      return { costo: 0, testo: ab.allagamento.verso > 0 || ab.allagamento.livello >= 1 ? 'Premi F per svuotare il pozzo del reattore' : 'Premi F per allagare il pozzo del reattore' };
    case 'barra': {
      if (ab.barre[a.indice] || ab.allagamento.livello < 0.95 || ab.passo !== PASSO.IMMERSIONE) return nascosto;
      const mano = quota(io.x, io.z) + (io.su ?? 0) + 1.15;
      const scarto = BARRE[a.indice].y - mano;
      if (Math.abs(scarto) > A.PRESA_BARRA) return nessuno(scarto > 0 ? 'Barra di oricalco: nuota più in alto (Spazio)' : 'Barra di oricalco: scendi più in basso (C)');
      return { costo: 0, testo: 'Premi F per estrarre la barra di oricalco' };
    }
    case 'fucina':
      if (!ab.fucina) return nessuno('Fucina di oricalco: servono le tre barre del reattore');
      if (possiede(io, 'charybdis')) return nessuno('Il Cannone di Cariddi è già tuo');
      return { costo: 0, testo: 'Premi F per prendere il Cannone di Cariddi' };
    case 'nodo':
      return ab.nodi[a.indice] === 1 ? { costo: 0, testo: 'Premi F per raccogliere il nodo parassita' } : nascosto;
    case 'parteScudo':
      if (ab.scudo.posti[a.indice] !== a.posto || ab.scudo.prese[a.indice]) return nascosto;
      return { costo: 0, testo: `Premi F per raccogliere un pezzo dello scudo (${ab.scudo.prese.filter(Boolean).length + 1}/3)` };
    case 'banco': {
      const mio = ab.giocatori[io.id];
      if (!ab.scudo.costruito) {
        const prese = ab.scudo.prese.filter(Boolean).length;
        return prese === 3 ? { costo: 0, testo: 'Premi F per assemblare lo scudo da palombaro' } : nessuno(`Banco da lavoro: pezzi dello scudo ${prese}/3`);
      }
      if (mio?.scudo > 0) return nessuno('Hai già lo scudo da palombaro');
      return { costo: 0, testo: 'Premi F per prendere lo scudo da palombaro' };
    }
    case 'quadroStagna': {
      const s = ab.stagna;
      if (s.decompressione > 0) return nessuno(`DECOMPRESSIONE: ${Math.ceil(s.decompressione)}…`);
      if (s.riapertura > 0) return nessuno('La camera stagna si sta riempiendo d\'aria');
      if (!s.chiusa) return { costo: 0, testo: 'Premi F per sigillare la camera stagna' };
      const intrappolati = vista.zombie.filter(z => z.stato !== 'morto' && dentroStagna(z));
      if (intrappolati.length) return { costo: 0, testo: `Premi F per la DECOMPRESSIONE ESPLOSIVA (${intrappolati.some(z => z.tipo === 'palombaro') ? 'c\'è il Palombaro!' : `${intrappolati.length} dentro`})` };
      return { costo: 0, testo: 'Premi F per riaprire la camera stagna' };
    }
    case 'nucleo':
      return ab.nucleo === 1 ? { costo: 0, testo: 'Premi F per prendere il Nucleo Abissale' } : nascosto;
    case 'altareNucleo':
      if (ab.nucleo === 2 && ab.portatore === io.id) return { costo: 0, testo: 'Premi F per incastonare il Nucleo Abissale' };
      if (ab.tridenti) return possiede(io, 'tridente') ? nessuno('Il tridente di Poseidone è già tuo') : { costo: 0, testo: 'Premi F per prendere il Tridente di Poseidone' };
      return nessuno("Altare di Poseidone: al centro c'è un incavo vuoto");
    case 'condotto':
      if (!vista.corrente) return nessuno('Condotto di propulsione: senza le turbine è fermo');
      return { costo: 0, testo: `Premi F per lanciarti nel condotto verso ${NOMI_CONDOTTI[a.meta]}` };
    case 'consolle':
      if (ab.passo === PASSO.INNO) return nessuno(`Organo idraulico: guardate le colonne e suonate con il fulmine (${ab.inno.progresso}/5)`);
      return nessuno('Organo idraulico di bronzo e cristallo: le canne vibrano sotto la pressione');
    default:
      return null;
  }
}

export function obiettivo(vista, mioId) {
  const ab = vista.abisso;
  if (!ab || vista.fase === 'attesa' || vista.round === 0) return '';
  const mio = ab.giocatori[mioId];
  if (mio?.condotto) return 'Condotto di propulsione…';
  const accese = ab.turbine.filter(t => t >= 1).length;
  if (!vista.corrente) return `Riaccendete le turbine della stazione: ${accese}/3`;
  switch (ab.passo) {
    case PASSO.PROTOCOLLO:
      return ab.valvole.premute > 0 ? `Valvole di pressione ${ab.valvole.premute}/4 · ${Math.ceil(ab.valvole.tempo)} s` : 'Cupola: girate le 4 valvole nell\'ordine dei manometri';
    case PASSO.IMMERSIONE:
      return ab.allagamento.livello < 0.95 ? 'Reattore: allagate il pozzo dal pannello' : `Estraete le barre di oricalco: ${ab.barre.filter(Boolean).length}/3`;
    case PASSO.PURIFICAZIONE: {
      const caduti = ab.nodi.filter(n => n > 0).length;
      return `Nodi parassiti: abbattuti ${caduti}/4, raccolti ${ab.nodi.filter(n => n === 2).length}/4`;
    }
    case PASSO.AUTOPSIA:
      if (ab.nucleo === 0) return 'Attirate il Palombaro nella Camera Stagna e decomprimete';
      if (ab.nucleo === 1) return 'Raccogliete il Nucleo Abissale nella Camera Stagna';
      return ab.portatore === mioId ? "Portate il Nucleo all'altare del Santuario" : 'Scortate chi porta il Nucleo al Santuario';
    case PASSO.INNO:
      return `Anfiteatro: suonate l'inno delle colonne con il tridente ${ab.inno.progresso}/5`;
    case PASSO.LEVIATANO: {
      const l = ab.leviatano;
      if (!l) return 'Il Leviatano sta salendo…';
      if (l.fase === 'stordito') return 'IL CUORE È SCOPERTO: colpitelo con Cariddi!';
      if (l.fase === 'immerso') return 'Il Leviatano nuota nell\'abisso: tenete la posizione';
      return `Piloni carichi ${l.piloni.filter(t => t > 0).length}/4 · colpiteli con il fulmine del tridente`;
    }
    default:
      return '';
  }
}

export function inventario(vista, mioId) {
  const ab = vista.abisso;
  if (!ab) return null;
  const mio = ab.giocatori[mioId] ?? {};
  const voci = NOMI_PASSI.map((nome, i) => ({ nome, stato: ab.passo > i || ab.completata ? 'fatto' : ab.passo === i ? 'attivo' : 'chiuso' }));
  const oggetti = [
    { nome: 'Turbine', valore: `${ab.turbine.filter(t => t >= 1).length}/3` },
    { nome: 'Valvole', valore: ab.protocollo ? 'aperte' : `${ab.valvole.premute}/4` },
    { nome: 'Barre di oricalco', valore: `${ab.barre.filter(Boolean).length}/3` },
    { nome: 'Nodi parassiti', valore: `${ab.nodi.filter(n => n === 2).length}/4` },
    { nome: 'Nucleo Abissale', valore: ['—', 'a terra', ab.portatore === mioId ? 'lo porti tu' : 'in viaggio', 'incastonato'][ab.nucleo] },
    { nome: "Inno di Atlantide", valore: `${ab.inno.progresso}/5` },
    { nome: 'Scudo da palombaro', valore: ab.scudo.costruito ? (mio.scudo > 0 ? `${Math.round((mio.scudo / A.SCUDO_VITA) * 100)}%` : 'al banco') : `pezzi ${ab.scudo.prese.filter(Boolean).length}/3` },
    { nome: 'Ossigeno', valore: percento(mio.ossigeno ?? 1) },
  ];
  if (mio.perkaholic) oggetti.push({ nome: 'Tutte le bibite', valore: 'per sempre' });
  return { titolo: 'PRESSIONE CRITICA', voci, oggetti, simboli: ab.passo === PASSO.INNO ? ab.inno.sequenza.slice(0, ab.inno.progresso).map(i => SIMBOLI[i]) : [] };
}

