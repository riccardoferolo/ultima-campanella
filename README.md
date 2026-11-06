# Ultima Campanella

Sparatutto co-op in prima persona contro gli zombie, in due online, grafica in stile PS1.
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

## Strumenti

`_lavoro/` contiene gli script di collaudo e di conversione (Playwright con Edge, server Vite su 5421):

- `collaudo.mjs` – partita in due dall'inizio alla fine (`--riserva`, `--supabase`);
- `vetrina3.mjs`, `mani.mjs` – schermate di sala, armi in mano, zombie e mappa;
- `converti-tutto.mjs` + `converti/tutto.html` – conversione dei modelli scaricati in `public/modelli/*.glb`
  (i file sorgente vanno rimessi in `_lavoro/scaricati/`, vedi `CREDITI.md`).

Prima di usarli: `cd _lavoro && npm install`.
