import { R } from '../regole.js';

const LUOGHI_TOTEM = Object.freeze({ capanna: 'della capanna', cimitero: 'del cimitero', rapide: 'delle rapide' });
const COLORI_COLPO = Object.freeze({ scarica: 0x9fdcff, acido: 0x7dff3a, tela: 0xf2f2e8, pioggia: 0x9dff4a });
const CHIAVE_TROFEI = 'ultimaCampanella.trofei';
const TROFEO = 'arachne';

const punto = (x, y, z) => ({ x, y, z });

export function trofeoPalude() {
  try {
    const trofei = new Set(JSON.parse(localStorage.getItem(CHIAVE_TROFEI) ?? '[]'));
    const nuovo = !trofei.has(TROFEO);
    trofei.add(TROFEO);
    localStorage.setItem(CHIAVE_TROFEI, JSON.stringify([...trofei]));
    return nuovo ? 'Trofeo sbloccato: La Tessitrice sepolta.' : 'Trofeo: La Tessitrice sepolta (già vostro).';
  } catch {
    return 'Trofeo: La Tessitrice sepolta.';
  }
}

export function eventoPalude(e, { hud, audio, mondo, perMe, nomeDi, io }) {
  const effetti = mondo.effetti;
  const botto = (x, z) => audio.esplosione(Math.hypot(x - io.x, z - io.z), Math.atan2(x - io.x, z - io.z) - io.yaw);
  switch (e.k) {
    case 'bombola':
      effetti.esplosione(punto(e.x, 0.8, e.z), 'fuoco');
      effetti.esplosione(punto(e.x, 1.4, e.z), 'energia', 0x9fd83a);
      effetti.esplosione(punto(e.x, 0.4, e.z), 'fuoco', 0xffc070);
      botto(e.x, e.z);
      hud.avviso('Una bombola di gas salta in aria!', 'bene');
      return true;
    case 'miasmaSvanito':
      audio.suona('segreto');
      hud.avviso("Il miasma si dirada: l'amuleto antico brilla nella capanna", 'bene');
      return true;
    case 'amuletoPreso':
      audio.suona('frammento');
      hud.avviso(perMe ? "Hai l'amuleto: incastralo nel totem davanti alla capanna" : `${nomeDi(e.a)} ha preso l'amuleto`, 'bene');
      return true;
    case 'amuletoTornato':
      hud.avviso("L'amuleto è tornato sul piedistallo della capanna");
      return true;
    case 'amuletoMesso':
      audio.suona('fusibile');
      return true;
    case 'totemSpezzato':
      audio.suona('bossUcciso');
      effetti.esplosione(punto(e.x, 2.5, e.z), 'energia', 0xb07cff);
      effetti.esplosione(punto(e.x, 1, e.z), 'energia', 0xffffff);
      effetti.ossa(punto(e.x, 1.5, e.z), 14);
      if (e.rimasti > 0) hud.avviso(`Il totem ${LUOGHI_TOTEM[e.totem]} è spezzato! Ne restano ${e.rimasti}`, 'bene');
      return true;
    case 'barrieraCaduta':
      audio.suona('rifugio');
      hud.avviso('La barriera crolla: al cuore della palude il terreno cede e si apre un varco!', 'bene');
      return true;
    case 'rituale':
      audio.suona('generatore');
      hud.avviso('Purificazione avviata: le tombe si aprono, difendete il dispositivo!');
      return true;
    case 'tomba':
      effetti.esplosione(punto(e.x, 0.4, e.z), 'energia', 0x7dff6a);
      return true;
    case 'ritualeFinito':
      return true;
    case 'valvoleVia':
      audio.suona('generatore');
      hud.avviso(`Generatore staccato: chiudete le tre valvole in ${e.secondi} secondi!`);
      return true;
    case 'valvola':
      audio.suona('fusibile');
      hud.avviso(`Valvola chiusa: ${e.chiuse}/3`, 'bene');
      return true;
    case 'scossa':
      audio.suona('scarica');
      mondo.fulmine([punto(io.x + 2, 9, io.z - 2), punto(io.x, 0.2, io.z)]);
      hud.avviso("Troppo tardi: l'acqua vi fulmina! Il generatore si riarma");
      return true;
    case 'colpoPalude': {
      const colore = COLORI_COLPO[e.tipo];
      if (e.tipo === 'scarica') {
        mondo.fulmine([punto(e.x + 1, 7, e.z - 1), punto(e.x, 0.1, e.z)]);
        audio.suona('scarica');
      } else {
        effetti.esplosione(punto(e.x, 0.3, e.z), 'energia', colore);
        if (e.tipo !== 'tela') audio.suona('speciale_veleno');
      }
      return true;
    }
    case 'invischiato':
      if (perMe) {
        audio.suona('congelato');
        hud.avviso('Sei invischiato nella ragnatela!');
      }
      return true;
    case 'membranaBruciata':
      audio.suona('implosione');
      effetti.esplosione(punto(0, 0.5, -50), 'fuoco', 0x7dff6a);
      effetti.esplosione(punto(0, 0.8, -50), 'energia', 0xb07cff);
      hud.avviso('La membrana brucia: il varco è aperto. Preparatevi bene, poi saltate tutti insieme', 'bene');
      return true;
    case 'finale':
      if (e.mappa !== 'palude') return false;
      audio.suona('finale');
      hud.avviso('Precipitate nella tana… qualcosa si cala dal soffitto');
      return true;
    case 'arachneScesa':
      audio.suona('boss');
      hud.avviso('Arachne, la Tessitrice! La seta la protegge: fate esplodere i bozzoli quando le passa vicino');
      return true;
    case 'bozzolo':
      effetti.esplosione(punto(e.x, 2.5, e.z), 'energia', 0xd8ff7a);
      effetti.esplosione(punto(e.x, 2, e.z), 'fuoco', 0x9dff4a);
      botto(e.x, e.z);
      hud.avviso(e.stordita ? 'La seta si strappa: Arachne è scoperta, colpitela!' : 'Troppo lontana: aspettate che le passi vicino', e.stordita ? 'bene' : undefined);
      return true;
    case 'faseBoss':
      if (e.tipo !== 'arachne') return false;
      audio.suona('urlo');
      hud.avviso(e.fase === 2 ? "Arachne sfonda le pareti: l'acqua sale, salite sulle rocce!" : 'Arachne si arrampica sulla volta e chiama l’ultima orda!');
      return true;
    case 'arachneSoffitto':
      hud.avviso(`Caricate il Teschio al massimo (${R.TESCHIO_ANIME_MAX} anime) e colpitele la testa: ${e.servono === 1 ? 'basta un colpo pieno' : `servono ${e.servono} colpi pieni, uno a testa`}`);
      return true;
    case 'impennata':
      audio.suona('urlo');
      hud.avviso('Si impenna: colpite il ventre adesso!');
      return true;
    case 'schianto':
      effetti.esplosione(punto(e.x, 0.3, e.z), 'fuoco', 0x8a6a4a);
      botto(e.x, e.z);
      return true;
    case 'sputo':
      effetti.esplosione(punto(e.x, 2.4, e.z), 'energia', e.tela ? 0xf2f2e8 : 0x7dff3a);
      return true;
    case 'morso':
      return true;
    case 'ondataRagni':
      audio.suona('evocazione');
      return true;
    case 'teschioScarico':
      if (perMe) {
        audio.suona('vuoto');
        hud.avviso(`Il Teschio non è carico al massimo: servono ${R.TESCHIO_ANIME_MAX} anime`);
      }
      return true;
    case 'colpoPieno':
      audio.suona('implosione');
      effetti.esplosione(punto(e.x, 10, e.z), 'energia', 0xffffff);
      effetti.esplosione(punto(e.x, 9.5, e.z), 'energia', 0x6dff8a);
      effetti.ossa(punto(e.x, 9.5, e.z), 20);
      botto(e.x, e.z);
      hud.avviso(`Colpo pieno! ${e.fatti}/${e.servono}`, 'bene');
      return true;
    case 'crollo':
      audio.suona('bomba');
      audio.suona('finale');
      hud.avviso('La volta crolla e seppellisce Arachne!', 'bene');
      return true;
    default:
      return false;
  }
}
