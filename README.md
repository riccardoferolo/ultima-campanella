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

- Sala d'attesa prima della partita: tasto 1 sceglie la pistola iniziale (Pistola, Magnum, Aquila, Raffica),
  2 la divisa (sei colori), 3 la mappa (solo chi ha creato la stanza); Invio quando sei pronto, conto alla rovescia di 5 secondi.
- Due mappe: La scuola e Il tempio nella giungla.
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

## Strumenti

`_lavoro/` contiene gli script di collaudo e di conversione (Playwright con Edge, server Vite su 5421):

- `collaudo.mjs` – partita in due dall'inizio alla fine (`--riserva`, `--supabase`);
- `vetrina3.mjs`, `mani.mjs` – schermate di sala, armi in mano, zombie e mappa;
- `converti-tutto.mjs` + `converti/tutto.html` – conversione dei modelli scaricati in `public/modelli/*.glb`
  (i file sorgente vanno rimessi in `_lavoro/scaricati/`, vedi `CREDITI.md`).

Prima di usarli: `cd _lavoro && npm install`.
