import { TANICHE } from '../mappe/stazione.js';

export const ISORADIO = Object.freeze({
  via: Object.freeze([
    'Isoradio · notiziario delle 3:00',
    'A4 Torino-Milano: chiusa tra Novara Ovest e Biandrate per «persone sulla carreggiata che non rispondono ai soccorsi».',
    "Chi si trova all'Area di servizio Agogna resti al chiuso. Ripetiamo: resti al chiuso.",
    'Nella zona manca la corrente. La torre faro del parcheggio camion ha un gruppo elettrogeno a parte.',
  ]),
  pieno: Object.freeze([
    'Isoradio · comunicazione di servizio',
    "Se qualcuno ci sente dall'Agogna: accendete la torre faro del parcheggio.",
    "L'elicottero della Stradale vi vedrà solo con la torre accesa. Tenete il gruppo elettrogeno in moto, costi quel che costi.",
  ]),
  faro: Object.freeze([
    'Isoradio · ultim\'ora',
    "Vediamo la luce dell'Agogna! L'elicottero è in volo da Novara.",
    "Attenzione: un autoarticolato sfonda i blocchi a Biandrate e corre verso di voi a fari spenti. All'autista non risponde la radio.",
  ]),
  fine: Object.freeze([
    'Isoradio · edizione straordinaria',
    "All'alba l'elicottero della Polizia Stradale atterra sul piazzale dell'Agogna.",
    'Ci sono dei superstiti. Sul retro, sotto un autoarticolato rovesciato, quello che resta del suo autista.',
  ]),
});

export const TESTO_VIA = "Area di servizio Agogna, A4, le tre di notte: la corrente è saltata, il quadro è in officina";
export const TESTO_BOSS = 'Un autoarticolato sfonda la recinzione: è arrivato il Camionista!';
export const TESTO_BOSS_UCCISO = 'Il Camionista è a terra: arriva il soccorso!';
export const IMPRESA = round => `Avete tenuto accesa la torre faro dell'Agogna e abbattuto il Camionista al round ${round}`;

const punto = (x, y, z) => ({ x, y, z });

export function eventoStazione(e, { hud, audio, mondo, perMe, nomeDi, io }) {
  const effetti = mondo.effetti;
  const botto = (x, z) => audio.esplosione(Math.hypot(x - io.x, z - io.z), Math.atan2(x - io.x, z - io.z) - io.yaw);
  switch (e.k) {
    case 'via':
      hud.radio(ISORADIO.via);
      return false;
    case 'tanica':
      audio.suona('fusibile');
      hud.avviso(perMe ? `Tanica di benzina ${e.trovate}/${e.totale}: portala al gruppo elettrogeno` : `${nomeDi(e.a)} ha trovato una tanica (${e.trovate}/${e.totale})`, 'bene');
      return true;
    case 'tanicheVersate':
      audio.suona('assaMessa');
      hud.avviso(`Benzina nel gruppo elettrogeno: ${e.versate}/${e.totale ?? TANICHE}`, 'bene');
      return true;
    case 'gruppoPieno':
      audio.suona('fusibile');
      hud.radio(ISORADIO.pieno);
      return true;
    case 'gruppoAcceso':
      audio.suona('generatore');
      hud.avviso('Il gruppo elettrogeno tossisce e parte: restategli vicini e difendetelo!');
      return true;
    case 'faro':
      audio.suona('rifugio');
      mondo.stazione?.faro();
      hud.radio(ISORADIO.faro);
      return true;
    case 'schianto':
      mondo.stazione?.schianto();
      effetti.esplosione(punto(e.x, 1.2, e.z + 3), 'fuoco');
      effetti.esplosione(punto(e.x - 1.5, 0.6, e.z + 4), 'fuoco', 0xffc070);
      botto(e.x, e.z + 4);
      return true;
    case 'boss':
      if (e.tipo !== 'camionista') return false;
      audio.suona('boss');
      hud.avviso(TESTO_BOSS);
      return true;
    case 'infuriato':
      if (e.tipo !== 'camionista') return false;
      audio.suona('urlo');
      hud.avviso('Il Camionista si strappa il gilet e carica a testa bassa!');
      return true;
    case 'camionistaUcciso':
      hud.radio(ISORADIO.fine);
      return true;
    case 'incendio':
      audio.suona('implosione');
      hud.avviso(`Benzina in fiamme sotto la pensilina per ${e.secondi} s: non attraversatela!`, perMe ? 'bene' : undefined);
      return true;
    case 'incendioSpento':
      hud.avviso('Le fiamme sotto la pensilina si spengono');
      return true;
    default:
      return false;
  }
}
