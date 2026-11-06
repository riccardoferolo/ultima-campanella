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

- Sala d'attesa prima della partita: Invio quando sei pronto, conto alla rovescia di 5 secondi.
- 52 armi (40 vere + 12 aliene), ognuna con la sua versione potenziata.
- Due zombie realistici: quello di città e lo Scuoiato (più veloce, più fragile, fa più male).
- Bonus lasciati dagli zombie: Bomba, Munizioni al massimo, Punti doppi, Colpo secco, Saldi, Carpentiere, Caricatore infinito.
- Easter egg: tre frammenti di meteorite nascosti nella mappa e la vecchia campanella dell'atrio.
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

## Strumenti

`_lavoro/` contiene gli script di collaudo e di conversione (Playwright con Edge, server Vite su 5421):

- `collaudo.mjs` – partita in due dall'inizio alla fine (`--riserva`, `--supabase`);
- `vetrina3.mjs`, `mani.mjs` – schermate di sala, armi in mano, zombie e mappa;
- `converti-tutto.mjs` + `converti/tutto.html` – conversione dei modelli scaricati in `public/modelli/*.glb`
  (i file sorgente vanno rimessi in `_lavoro/scaricati/`, vedi `CREDITI.md`).

Prima di usarli: `cd _lavoro && npm install`.
