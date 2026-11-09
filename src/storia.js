import { ASSI, SCHEGGE, ANIME_PER_IDOLO } from './giungla.js';

export const RUNE = Object.freeze(['Serpente', 'Sole', 'Luna', 'Giada']);
export const SIMBOLI_RUNE = Object.freeze(['〰', '☀', '☾', '◆']);

const MESSAGGI = Object.freeze([
  () => [
    'Campo base Delta, giorno 14. Il generatore regge, la radio pure.',
    'Abbiamo trovato il tempio oltre il fiume, ma il ponte di corda è crollato.',
    `Nel villaggio ci sono ${ASSI} fasci di assi buone. Portateli al ponte e tenete lontani i morti finché non è in piedi.`,
  ],
  () => [
    'Giorno 17. Lo sciamano del villaggio non è morto con gli altri.',
    "Porta una maschera d'osso: la porta del tempio si apre solo con quella.",
    `Varga dice che l'altare del villaggio fonde ${SCHEGGE} schegge di giada: una in fondo alla grotta, una nella cabina dell'aereo, una in una cassa che il fiume si porta via.`,
  ],
  () => [
    'Giorno 19. La maschera sulla porta… la pietra ha cominciato a salire, ma piano.',
    'E intanto loro escono da sotto terra. Tenete la posizione finché non è aperta.',
    `Gli idoli del serpente hanno fame: ognuno vuole ${ANIME_PER_IDOLO} anime uccise ai suoi piedi.`,
  ],
  ordine => [
    'Giorno 21. Dentro ci sono quattro rune. Sull’architrave c’è scritto l’ordine:',
    ordine.map(r => RUNE[r]).join(' → '),
    'Sbagliate e il tempio si sveglia. Le pietre del sole sulla scalinata vanno girate come nel murale della grotta.',
  ],
  () => [
    'Giorno 23. Il sigillo cede solo alla forza delle reliquie: giada, serpente, sole.',
    'Dietro dorme il Divoratore. Se lo uccidete il tempio crolla: correte all’aereo, non voltatevi.',
    'Qui Varga, chiudo. Se trovate questa registrazione, non tornate indietro per noi.',
  ],
]);

export function messaggioRadio(n, ordine = [0, 1, 2, 3]) {
  if (n <= 0) return ['La radio gracchia. Serve più corrente per sentire qualcosa.'];
  return MESSAGGI[Math.min(n, MESSAGGI.length) - 1](ordine);
}

export function obiettivoGiungla(vista) {
  const g = vista.giungla;
  if (!g || vista.fase === 'attesa' || vista.fase === 'vinta' || vista.round === 0) return '';
  if (vista.fase === 'fuga') return `Scappate all'aereo sulla pista! ${g.fuga} s`;
  if (vista.fase === 'finale') return 'Uccidete il Divoratore';
  if (!vista.corrente) {
    const accesi = g.generatori.filter(x => x.stato === 1);
    if (accesi.length) return `Difendete il generatore: ${accesi.map(x => Math.round(x.progresso * 100)).join('% · ')}%`;
    return `Accendete i due generatori, al campo e sulla pista (${g.generatori.filter(x => x.stato === 2).length}/2)`;
  }
  if (g.radioAscoltati < 1) return 'Ascoltate la radio del campo';
  if (g.ponte === 1) return `Difendete il ponte: ${Math.round(g.progressoPonte * 100)}%`;
  if (g.ponte === 0) return `Portate le assi del villaggio al ponte (${g.assiRaccolte + g.assiPortate}/${ASSI})${g.assiPortate >= ASSI ? ' e cominciate a costruire' : ''}`;
  if (g.sciamano <= 1) return g.sciamano === 1 ? 'Uccidete lo Sciamano nel villaggio' : 'Lo Sciamano arriverà al prossimo round…';
  if (g.sciamano === 2) return 'Prendete la maschera dello Sciamano';
  if (g.sciamano === 3) return 'Portate la maschera alla porta del tempio';
  if (g.porta === 1) return `Difendete la porta del tempio: ${Math.round(g.progressoPorta * 100)}%`;
  if (g.porta === 0) return 'Aprite la porta del tempio con la maschera, durante un round';
  if (g.rune === 0) return g.radioAscoltati < 4 ? "La radio sa l'ordine delle rune: tornate ad ascoltarla" : `Toccate le rune: ${g.ordine.map(r => RUNE[r]).join(' → ')} (${g.runeToccate}/4)`;
  if (g.sigillo === 0) return 'Rompete il sigillo col colpo speciale di una reliquia (tasto E)';
  return "Entrate tutti nella camera del cuore e toccate l'altare";
}

export function reliquieGiungla(vista) {
  const g = vista.giungla;
  if (!g || vista.fase === 'attesa' || vista.round === 0) return '';
  const parti = [];
  if (g.altare < 3) parti.push(g.altare >= 1 ? 'Giada: l’altare forgia' : `Giada ${g.schegge + g.scheggeAltare}/${SCHEGGE}`);
  if (g.bastone < 2) parti.push(g.bastone === 1 ? 'Serpente: il bastone vi aspetta alla cascata' : `Serpente ${g.idoli.filter(n => n >= ANIME_PER_IDOLO).length}/4`);
  if (g.sole < 3) parti.push(g.sole === 0 ? 'Sole: le pietre' : g.sole === 1 ? 'Sole: il Guardiano' : 'Sole: la spada è a terra');
  return parti.length ? `Reliquie · ${parti.join(' · ')}` : '';
}
