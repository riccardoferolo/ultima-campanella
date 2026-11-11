import { chromium } from 'playwright-core';

const BASE = 'http://localhost:5421/';
const ARGOMENTI = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'];

const esiti = [];
const verifica = (nome, ok, dettaglio = '') => {
  esiti.push(ok);
  console.log(`${ok ? 'OK ' : 'NO '} ${nome}${dettaglio ? ` — ${dettaglio}` : ''}`);
};
const stato = p => p.evaluate(() => window.__gioco.stato());
const partita = (host, fn, arg) => host.evaluate(([corpo, a]) => new Function('p', 'a', corpo)(window.__gioco.partita(), a), [fn, arg]);
async function attendi(pagina, condizione, ms = 15000, arg) {
  const fine = Date.now() + ms;
  while (Date.now() < fine) {
    if (await pagina.evaluate(condizione, arg).catch(() => false)) return true;
    await pagina.waitForTimeout(150);
  }
  return false;
}

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ARGOMENTI });
try {
  const contesto = await browser.newContext({ viewport: { width: 640, height: 360 } });
  const host = await contesto.newPage();
  const ospite = await contesto.newPage();
  const errori = [];
  for (const [nome, p] of [['host', host], ['ospite', ospite]]) {
    p.on('pageerror', e => errori.push(`${nome}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') errori.push(`${nome}: ${m.text()}`); });
  }
  await host.goto(`${BASE}?locale`);
  await host.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 60000 });
  await host.fill('#nome', 'Richi');
  await host.keyboard.press('Enter');
  await host.waitForSelector('#schermata-stanza:not([hidden])');
  const codice = await host.textContent('#t-codice');
  await ospite.goto(`${BASE}?locale&stanza=${codice}`);
  await ospite.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 60000 });
  await ospite.fill('#nome', 'Seba');
  await ospite.keyboard.press('Enter');
  verifica("l'host vede l'amico", await attendi(host, () => /Insieme a Seba/.test(document.getElementById('t-stato').textContent), 20000));
  await host.click('#parti');
  await attendi(ospite, () => window.__gioco.stato().vista?.fase === 'attesa', 20000);
  await host.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'piazza' }));
  verifica("l'amico è in piazza", await attendi(ospite, () => window.__gioco.stato().vista?.mappa === 'piazza', 90000));
  await ospite.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await host.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  verifica('la partita parte', await attendi(host, () => ['intervallo', 'gioco'].includes(window.__gioco.partita().fase), 20000));
  await partita(host, `
    p.timerFase = 9999;
    p.daGenerare = 0;
    p.zombie = [];
    for (const g of p.giocatori) { g.vita = g.vitaMax = 1e9; g.punti = 50000; }
    p.porte.push('transenneSud', 'tempietto');
    Object.assign(p.piazza.voto, { fase: 2, ore: 0 });
  `);
  verifica("l'amico sa che tocca all'orologio", await attendi(ospite, () => window.__gioco.stato().vista?.piazza?.voto?.fase === 2, 5000));
  await ospite.bringToFront();
  await ospite.evaluate(() => { window.__gioco.vaiA(8, 22); window.__gioco.puntaA(30.9, 26.5 + Math.cos((4 / 12) * Math.PI * 2) * 1.025, 15.4 + Math.sin((4 / 12) * Math.PI * 2) * 1.025); });
  await ospite.waitForTimeout(400);
  await ospite.evaluate(() => window.__gioco.spara());
  verifica("lo sparo dell'amico al IIII arriva all'host", await attendi(host, () => window.__gioco.partita().piazza.voto.ore === 1, 5000), String(await partita(host, 'return p.piazza.voto.ore')));
  verifica("l'amico vede l'ora accesa", await attendi(ospite, () => window.__gioco.stato().vista?.piazza?.voto?.ore === 1, 5000));
  await partita(host, "Object.assign(p.piazza.voto, { fase: 3, carro: 0 }); p.fase = 'gioco';");
  const ospiteId = (await stato(ospite)).mioId;
  await partita(host, `
    const g = p.giocatori.find(x => x.id === a);
    g.x = -41; g.z = 31;
  `, ospiteId);
  await ospite.evaluate(() => window.__gioco.vaiA(-41, 30));
  verifica("l'amico spinge il carro", await attendi(host, () => window.__gioco.partita().piazza.voto.carro > 1.5, 10000), String(await partita(host, 'return p.piazza.voto.carro')));
  verifica("l'amico vede il carro muoversi", await attendi(ospite, () => (window.__gioco.stato().vista?.piazza?.voto?.carro ?? 0) > 1.5, 5000));
  verifica('nessun errore in pagina', errori.length === 0, errori.slice(0, 3).join(' | '));
  console.log(`${esiti.filter(Boolean).length}/${esiti.length}`);
} finally {
  await browser.close();
}
