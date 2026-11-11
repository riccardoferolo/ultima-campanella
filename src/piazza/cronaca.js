import { VOTO, ORE_DEL_BEATO, ANIME_VEGLIA, LUNGHEZZA_CARRO, puntoCarro, carroBloccato, portaCheFerma } from '../piazza.js';

export const ROMANI = Object.freeze(['', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']);

export const CRONACA = Object.freeze({
  summa: Object.freeze([
    'Cronaca di Cerano · I · La Summa',
    'Fra Pacifico Ramati nacque a Cerano verso il 1424. Rimasto orfano, lo crebbero i benedettini di San Lorenzo, a Novara.',
    'Frate minore, dottore alla Sorbona di Parigi, nel 1474 pubblicò la «Summa pacifica».',
    'Papa Sisto IV lo mandò in Sardegna a bandire una crociata. Morì a Sassari il 4 giugno 1482.',
    "L'orologio del campanile ricorda il giorno, il mese e l'anno: chi ne colpisce le ore nell'ordine giusto lo riporta a casa.",
  ]),
  ritorno: Object.freeze([
    'Cronaca di Cerano · II · Il ritorno',
    'Aveva chiesto di essere sepolto nel suo paese, e le sue spoglie tornarono a Cerano.',
    'Il carro è arrivato in fondo alla piazza, dalla parte del bar: scortatelo fino al Tempietto del Beato.',
    'Avanza solo se qualcuno gli cammina accanto, e si ferma se un Dannato lo tocca.',
  ]),
  veglia: Object.freeze([
    'Cronaca di Cerano · III · La veglia',
    "Dal 1483 i frati francescani vennero a Cerano per tenere vivo il culto del Beato; nel 1488 i vescovi Gerolamo Pallavicini e Antonio Caccia consacrarono la chiesa.",
    `Vegliatelo: ${ANIME_VEGLIA} Dannati devono cadere dentro il Tempietto.`,
  ]),
  galeazzo: Object.freeze([
    'Cronaca di Cerano · IV · Galeazzo',
    'Nel 1156 i milanesi, in guerra con Novara, rasero al suolo il castello di Cerano.',
    'Nel 1356 Galeazzo II Visconti la distrusse di nuovo, anche per la pirateria dei ceranesi sul Ticino, tra Sesto Calende e Pavia.',
    'Le campane suonano a martello: il suo capitano è tornato per finire il lavoro.',
  ]),
  pace: Object.freeze([
    'Cronaca di Cerano · V · Il Beato',
    'Il 7 luglio 1745 papa Benedetto XIV ne approvò il culto, e da allora Cerano festeggia il suo patrono la prima domenica di settembre.',
    'Per il resto della notte le campane sono vostre: suonano gratis e si ricaricano in 30 secondi.',
  ]),
});

const NOMI_PORTE = Object.freeze({ transenneSud: 'le transenne di via Beato Pacifico', tempietto: 'i cancelli del Tempietto' });

export function obiettivoVoto(vista) {
  const v = vista.piazza?.voto;
  if (!v) return '';
  switch (v.fase) {
    case VOTO.LIBRO:
      return 'In sacrestia, sul leggio, è comparso un vecchio libro';
    case VOTO.OROLOGIO:
      return `L'orologio del campanile ricorda il giorno, il mese e l'anno (${v.ore}/${ORE_DEL_BEATO.length})`;
    case VOTO.CARRO: {
      const quanto = `${Math.floor((v.carro / LUNGHEZZA_CARRO) * 100)}%`;
      const porta = portaCheFerma([...vista.porte], v.carro);
      if (porta) return `Il carro del Beato aspetta: aprite ${NOMI_PORTE[porta]} (${quanto})`;
      if (carroBloccato(vista.zombie, puntoCarro(v.carro))) return `I Dannati trattengono il carro del Beato: liberatelo (${quanto})`;
      return `Scortate il carro del Beato fino al Tempietto: avanza se gli state accanto (${quanto})`;
    }
    case VOTO.VEGLIA:
      return `Vegliate il Beato: i Dannati devono cadere dentro il Tempietto (${v.anime}/${ANIME_VEGLIA})`;
    case VOTO.CAPITANO:
      return 'Abbattete il Capitano del Visconti';
    default:
      return '';
  }
}
