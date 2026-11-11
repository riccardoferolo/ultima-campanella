# Ultima Campanella

Sparatutto co-op in prima persona contro gli zombie, online da 1 a 4 giocatori, grafica realistica.
Si gioca su https://riccardoferolo.github.io/ultima-campanella/

## Avvio in locale

```bash
npm install
npx vite --port 5421
npm test
```

## Cosa c'è

- Sala d'attesa a schede da cliccare col mouse: pistola iniziale (con immagine e barre di danno, rateo e colpi),
  divisa (sei colori), mappa (solo chi ha creato la stanza), giocatori presenti e pulsante «SONO PRONTO»;
  conto alla rovescia di 5 secondi. Invio torna alle schede.
- Difficoltà a crescere: nei primi tre round solo zombie che camminano, poi arrivano gli Scuoiati e i corridori
  (20% in più a round); nella giungla vita, numero, danno e velocità salgono dal 4° al 9° round fino al massimo.
- Zombie fluidi: simulazione a passo fisso con disegno interpolato fra gli ultimi due passi.
- Cinque mappe: La scuola, Il tempio nella giungla, Il Teatro dell'Eclissi, Bayou Vermillion e la Piazza di Cerano. Nella giungla i confini sono vegetazione vera (ciuffi di foglie,
  alberi con la chioma che sporge, palme e felci) e la mappa è piena di animaletti che scappano quando arrivi:
  pappagalli sulle palme, pipistrelli in grotta e nel tempio, lucciole, farfalle blu, rane sulle ninfee del fiume;
  nella scuola corvi e pipistrelli.
- Suoni naturali generati al volo (in un worker, senza file audio): spari diversi per famiglia con coda ed eco,
  ricariche meccaniche, rantoli degli zombie, riverbero di corridoio, cortile, giungla e grotta; nella giungla
  cicale, grilli, rane, uccelli notturni, gufo, scimmia urlatrice lontana e acqua.
- Fucili a pompa che sparano a rosa: ogni pallino ha la sua scia, il suo impatto e il suo schizzo di sangue.
- Grafica Alta, Media o Bassa (PC lenti), scelta nella schermata iniziale; «Automatica» la stima dalla scheda
  video, dai core e dalla memoria, e in partita scende da sola di un livello se a risoluzione minima non si
  tengono i 50 fps (Bassa: niente antialias, risoluzione fino al 35%, texture senza rilievo, metà dei cespugli,
  vista più corta, due luci, niente animaletti).
- 60 fps: vegetazione divisa a celle (si disegna solo quella inquadrata), luci della giungla a rotazione sui fuochi
  più vicini, particelle in due soli disegni.
- Coltello (tasto V) che colpisce ad arco fino a due zombie, fa uno scatto verso lo zombie vicino e scala coi round.
- 24 armi (21 vere, una per ruolo, + 3 aliene: Singolarità, Criogeno, Arco Voltaico), ognuna con la sua versione potenziata.
- Ricarica animata per tipo d'arma (caricatore, tamburo del revolver, cartucce della pompa, otturatore, capsula aliena) con suoni sincronizzati.
- Due zombie realistici: quello di città e lo Scuoiato (più veloce, più fragile, fa più male).
- Bonus lasciati dagli zombie: Bomba, Munizioni al massimo, Punti doppi, Colpo secco, Saldi, Carpentiere, Caricatore infinito.
- Easter egg: tre frammenti di meteorite nascosti nella mappa (premio: l'Orizzonte degli Eventi) e la vecchia campanella dell'atrio.
- Armi aliene con un effetto loro: Singolarità (sfera che apre un buco nero, risucchia e implode), Criogeno
  (congela gli zombie in statue che si frantumano con un colpo), Arco Voltaico (fulmine che salta fino a 6 zombie, 12 potenziato).
- Fino a 4 giocatori nella stessa stanza (chi la crea più tre amici); in tre e in quattro più zombie e boss più resistenti.
- Musica che cresce coi round, con temi per il Preside e per il Custode (tasto M per spegnerla o riaccenderla).
- Distributori col proprio marchio (insegna, vetrina con le bottiglie, logo e slogan) e bevuta animata in prima persona.
- Sei bibite: Ferro, Lampo, Ritorno e, nell'ala nuova, Raffica (spari più veloce, aula magna), Scatto (corri di più, campo sportivo), Tasca (terza arma, biblioteca; a terra la perdi).
- Granate (tasto G): due all'inizio, due in più a ogni round, massimo quattro.
- Zombie che barcollano quando li colpisci e perdono la testa col colpo in testa.
- Il Preside, un boss che arriva ogni cinque round.
- Ala nuova: androne, aula magna, biblioteca, campo sportivo e il rifugio antiaereo.
- Missione finale: tre fusibili (biblioteca, tasca del Preside, generatore da difendere nel campo) nel quadro
  del cancello con la corrente accesa, poi nel rifugio si suona l'ultima campanella e arriva il Custode,
  boss in tre fasi: il cancello si chiude finché non muore, e la sua morte vince la partita.

### Il tempio nella giungla

Mappa più grande e più dura della scuola (zombie più resistenti, orde più numerose, corridori da subito,
zombie che escono dalle tane nel terreno). La storia va avanti a tappe:

1. due generatori da difendere (campo e pista) per dare corrente alla radio, che racconta la storia a puntate;
2. tre assi da recuperare nel villaggio e il ponte sul fiume da costruire e difendere;
3. lo Sciamano, che evoca zombie dalla terra: la sua maschera apre la porta del tempio, da difendere 90 secondi;
4. le quattro rune del tempio da toccare nell'ordine che dice la radio, poi il sigillo da spezzare col colpo
   speciale di una reliquia;
5. nel cuore del tempio il Divoratore, boss in quattro fasi (scaglie che si rompono solo con le reliquie,
   sciami, il tempio che crolla), poi la fuga all'aereo sulla pista in 150 secondi.

Tre reliquie da mischia che si sbloccano solo così: il Machete di Giada (tre schegge di giada — grotta, fiume,
cabina dell'aereo — sull'altare, forgiato a fine round), il Bastone del Serpente (sei anime per ciascuno dei
quattro idoli) e la Spada del Sole (le tre pietre girate come dice il murale della grotta, poi il Guardiano).
Ogni uccisione carica la reliquia; carica piena = colpo speciale col tasto E (turbine, nube velenosa, onda di fuoco).

### Il Teatro dell'Eclissi

Teatro degli anni '60 in rovina, invaso dai Corrotti, con piani veri (si sale, si scende e si salta giù). Dall'Atrio di
Velluto (pavimento a scacchi, scalone a doppia rampa con la rampa destra crollata, lampadario di cristallo, quattro
barricate, Siero del Risveglio al centro) partono due percorsi:

- **piani alti**: porta in cima allo scalone a sinistra → Salone dei Ricevimenti (bancone curvo a destra, tavolini
  rovesciati, mitra sul muro di sinistra, Scrigno del Fato) → corridoio dei camerini → Guardaroba degli Attori
  (specchiere, manichini, costumi, barricate ai lati, Siero della Ricarica Rapida) → balconcino antincendio da cui si
  salta sul palco (dal palco non si risale);
- **piani bassi**: porta a destra al piano terra → vicolo sotto la pioggia (rete metallica a sinistra da cui entrano i
  Corrotti, bidoni e Siero del Fuoco Rapido a destra) → scala nei Sotterranei della Caldaia (corridoi stretti attorno
  alla fornace) → rampa metallica che sbuca sul palco.

Sul palco il Generatore Centrale: la leva accende la corrente, il sipario sale in 6 secondi e unisce palco e platea,
si aprono le doppie porte sotto lo scalone e i Sieri (spenti fino ad allora) si accendono; c'è il Siero della
Robustezza. La platea è in pendenza con un largo giro attorno alle poltrone; la regia al centro accende la Sentinella
automatica appesa al soffitto (1500 punti, 30 s). Trappole incendiarie a pagamento sulle due scalette tra platea e
palco e nel corridoio dei camerini (bruciano anche i giocatori). Sparando al lampadario dell'atrio lo si fa crollare
sui Corrotti. La botola al centro del palco (750 punti, con la corrente) porta nel Sottopalco con la Forgia Arcana;
dopo 40 secondi, o prima con la leva, il montacarichi riporta sul palco. Ogni 5-6 round arriva l'eclissi: nebbia
rossa e Corrotti in fiamme che scoppiano morendo; dal quarto round compaiono i Mutanti tossici, pallidi, che uccisi da
vicino lasciano un gas che annebbia e rallenta.

La mappa è scritta in coordinate «di progetto» (`PROGETTO` in `src/mappe/teatro.js`) e pubblicata specchiata in x, così
a sinistra e a destra tornano come nel progetto; la grafica (`src/grafica/teatro3d.js`) si costruisce in coordinate di
progetto dentro un gruppo con `scale.x = -1`. L'altezza del pavimento sta in `quota(x, z)` (0 nelle altre due mappe).

### Piazza di Cerano

Piazza Crespi a Cerano (Novara), di notte, ricostruita in metri veri: pianta dalle sagome di OpenStreetMap (chiesa,
Municipio e case attorno), ruotata di 18,7° perché la chiesa stia dritta sugli assi del gioco, misure e dettagli dalla
foto aerea e dalle foto di Wikimedia Commons. Si parte in piazza, fra la fontana del Beato Pacifico (davanti alla
facciata, con la statua del frate) e il sagrato a semicerchio in ciottoli con i paracarri; gli zombie scavalcano le
transenne di via Vittime della Mafia, del vicolo delle Scuole, della strada verso ovest e del cancello del giardino.

- **Chiesa della Natività di Maria Vergine** (portone 1000): facciata neorinascimentale a salienti in ocra e cotto,
  pronao con due colonne e frontone curvo, portali laterali con le lunette, balaustre e statue in cotto; dentro tre
  navate con arcate, lesene e capitelli dorati, volte a crociera dipinte, vetrate, banchi, Via Crucis, cantoria con
  l'organo sopra l'ingresso, crociera con la cupola e la lanterna, presbiterio rialzato con balaustra, altare,
  tabernacolo e crocifisso appeso. Nel transetto nord l'Ultima Cena del Cerano (1595), nel sud l'Ecce Homo. I morti
  risalgono dalle lapidi del pavimento. Lo Scrigno delle Offerte è nella navata nord.
- **Municipio** (portone ad arco con la scritta MUNICIPIO, 750): piano terra a bugnato grigio e primo piano giallo,
  balcone con le bandiere d'Europa, d'Italia e il gonfalone di Cerano; androne e uffici (Anagrafe, Protocollo,
  Ufficio tecnico, Segreteria), poi lo scalone (1000) per la Sala del Consiglio, con stemma, gonfalone e il fucile di
  precisione; le barricate della sala danno sul tetto della scuola.
- **Lato del Municipio** e **Via Beato Pacifico** (transenne, 750 l'una): la prima fra Municipio e chiesa con le auto
  parcheggiate fino alla sacrestia, la seconda lungo il Tempietto fino all'arco con il piccolo campanile a vela.
- **Sacrestia** (1000 dal lato nord, 750 dal presbiterio): il quadro generale che riaccende la corrente; senza
  corrente le bibite sono spente.
- **Tempietto del Beato Pacifico** (cancelli 1000 da via Beato Pacifico o porta 1000 dalla navata): due archi con le
  tende rosse, balaustra, frontone con la statua e il cupolino; dentro l'urna del Beato e la porta del campanile.
- **Campanile** (45 m, mattoni, orologio sui quattro lati con l'ora vera, cella con una bifora per lato, guglia
  conica): con la corrente si sale per 750 punti e si resta 40 secondi nella cella campanaria con la Fonderia (il
  potenziatore); la corda delle campane (1500) le suona a distesa e stordisce per 7 secondi tutti gli zombie della
  mappa (boss esclusi), poi vanno lasciate riposare 75 secondi. A ogni round il campanile batte i rintocchi.
- Easter egg: cinque statuette in cotto (il Beato Pacifico, San Rocco, San Giuseppe, San Giovanni e la Madonna, le
  statue della facciata) nascoste fra piazza, Municipio, navata, Tempietto e campanile.

## Strumenti

`_lavoro/` contiene gli script di collaudo e di conversione (Playwright con Edge, server Vite su 5421):

- `collaudo.mjs` – partita in due dall'inizio alla fine (`--riserva`, `--supabase`);
- `vetrina3.mjs`, `mani.mjs` – schermate di sala, armi in mano, zombie e mappa;
- `teatro.mjs` – giro di foto del Teatro dell'Eclissi (Edge su GPU) e misura degli fps in platea con un'orda;
- `piazza.mjs` – giro di foto della Piazza di Cerano, dentro e fuori, fino alla cella campanaria;
- `converti-tutto.mjs` + `converti/tutto.html` – conversione dei modelli scaricati in `public/modelli/*.glb`
  (i file sorgente vanno rimessi in `_lavoro/scaricati/`, vedi `CREDITI.md`).

Prima di usarli: `cd _lavoro && npm install`.
