const INTERVALLO_MS = 1000 / 60;

setInterval(() => postMessage(performance.now()), INTERVALLO_MS);
