import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5421/';
const SEGNALI = process.argv.includes('--supabase') ? 'supabase' : 'locale';
const EXTRA = process.argv.includes('--riserva') ? '&riserva' : '';
const FOTO = new URL('./foto/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
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
async function aspettaGioco(host, secondi) {
  const inizio = await partita(host, 'return p.tempo');
  const limite = Date.now() + 30000;
  while (Date.now() < limite && (await partita(host, 'return p.tempo')) - inizio < secondi) await host.waitForTimeout(100);
}

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ARGOMENTI });
try {
  const contesto = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const host = await contesto.newPage();
  const ospite = await contesto.newPage();
  const errori = [];
  for (const [nome, p] of [['host', host], ['ospite', ospite]]) {
    p.on('pageerror', e => errori.push(`${nome}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') errori.push(`${nome}: ${m.text()}`); });
  }

  await host.goto(`${BASE}?${SEGNALI}${EXTRA}`);
  await host.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 60000 });
  verifica('il nome ha il fuoco all\'apertura', await host.evaluate(() => document.activeElement?.id === 'nome'));
  await host.fill('#nome', 'Richi');
  await host.keyboard.press('Enter');
  await host.waitForSelector('#schermata-stanza:not([hidden])');
  const codice = await host.textContent('#t-codice');
  verifica('stanza creata', /^[A-Z]{4}$/.test(codice), codice);

  await ospite.goto(`${BASE}?${SEGNALI}${EXTRA}&stanza=${codice}`);
  await ospite.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 60000 });
  await ospite.fill('#nome', 'Seba');
  await ospite.keyboard.press('Enter');
  const insieme = await attendi(host, () => /Insieme a Seba/.test(document.getElementById('t-stato').textContent), 20000);
  verifica('l\'host vede l\'amico', insieme, await host.textContent('#t-stato'));
  verifica(`collegamento ${EXTRA ? 'riserva' : 'diretto'}`, (await stato(host)).modo === (EXTRA ? 'riserva' : 'diretto'), (await stato(host)).modo);

  await host.click('#parti');
  const giocano = await attendi(ospite, () => window.__gioco.stato().fase === 'gioco' && window.__gioco.stato().buffer > 0, 10000);
  verifica('la partita parte su tutti e due', giocano && (await stato(host)).fase === 'gioco');
  verifica('l\'host ha due giocatori', (await partita(host, 'return p.giocatori.length')) === 2);
  const idOspite = (await stato(ospite)).mioId;

  verifica("si comincia nella sala d'attesa", (await partita(host, 'return p.fase')) === 'attesa');
  await ospite.evaluate(async () => {
    const m = await import('/src/mappa.js');
    const posto = m.RASTRELLIERA.find(r => r.arma === 'laser');
    window.__gioco.vaiA(posto.x, posto.z + posto.verso.z);
  });
  await aspettaGioco(host, 0.3);
  await ospite.evaluate(() => window.__gioco.azione({ tipo: 'prova', arma: 'laser' }));
  await aspettaGioco(host, 0.5);
  const armiProva = await partita(host, 'return p.giocatori.find(g => g.id === a).armi', idOspite);
  const armiClient = (await stato(ospite)).armi;
  verifica("in sala l'amico prova un'arma dal muro", armiProva.includes('laser') && armiClient.includes('laser'), `${armiProva} / ${armiClient}`);
  await ospite.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await host.bringToFront();
  await host.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await aspettaGioco(host, 0.5);
  verifica('quando sono pronti tutti e due parte il conto alla rovescia', (await partita(host, 'return p.conto')) !== null);
  await aspettaGioco(host, 5.2);
  const dopoVia = await partita(host, 'return { fase: p.fase, armi: p.giocatori.map(g => g.armi.join()) }');
  verifica('finito il conto si entra nella scuola con la sola pistola', dopoVia.fase !== 'attesa' && dopoVia.armi.every(a => a === 'pistola'), JSON.stringify(dopoVia));
  await aspettaGioco(host, 0.5);
  const ospiteDentro = (await stato(ospite)).io;
  verifica("anche l'amico è stato portato nella scuola", Math.hypot(ospiteDentro.x - 1.5, ospiteDentro.z) < 0.6, `${ospiteDentro.x},${ospiteDentro.z}`);

  await ospite.bringToFront();
  await ospite.evaluate(() => window.__gioco.vaiA(3, 2));
  await aspettaGioco(host, 0.5);
  const posizione = await partita(host, 'return p.giocatori.find(g => g.id === a)', idOspite);
  verifica('l\'host vede l\'amico muoversi', Math.abs(posizione.x - 3) < 0.3 && Math.abs(posizione.z - 2) < 0.3, `${posizione.x},${posizione.z}`);

  await aspettaGioco(host, 4);
  await partita(host, `
    p.daGenerare = 0;
    p.zombie = [{ id: 7777, x: 3, z: -2.5, yaw: 0, stato: 'dentro', finestra: 'a1', vita: 100000, vitaMax: 100000, corre: false, variante: 1, timer: 0, attesa: 9, bersaglio: null }];
  `);
  await aspettaGioco(host, 0.4);
  const puntiPrima = await partita(host, 'return p.giocatori.find(g => g.id === a).punti', idOspite);
  await ospite.evaluate(async () => {
    for (let i = 0; i < 10 && window.__gioco.stato().arma.caricatore === 8; i++) {
      const z = window.__gioco.stato().vista.zombie.find(z => z.id === 7777);
      window.__gioco.puntaA(z.x, 1.1, z.z);
      window.__gioco.spara();
      await new Promise(r => setTimeout(r, 150));
    }
  });
  await aspettaGioco(host, 0.5);
  const dopo = await partita(host, 'return { punti: p.giocatori.find(g => g.id === a).punti, vita: p.zombie.find(z => z.id === 7777)?.vita }', idOspite);
  const diag = await ospite.evaluate(() => { const st = window.__gioco.stato(); return { arma: st.arma, armi: st.armi, io: [st.io.x, st.io.z, st.io.yaw, st.io.pitch], z: st.vista.zombie.map(z => [z.id, z.x, z.z, z.stato, z.tipo]), fase: st.vista.fase }; });
  verifica('il colpo dell\'amico ferisce lo zombie e gli dà punti', dopo.punti > puntiPrima && dopo.vita < 100000, `punti ${puntiPrima} → ${dopo.punti} ${JSON.stringify(diag)}`);
  await ospite.screenshot({ path: `${FOTO}10-amico-spara.png` });
  await partita(host, 'p.zombie = []');

  await partita(host, `p.giocatori.find(g => g.id === a).punti = 3000`, idOspite);
  await ospite.evaluate(() => window.__gioco.vaiA(-5, 4.9));
  await aspettaGioco(host, 0.4);
  const suggerimento = await ospite.textContent('#suggerimento');
  await ospite.keyboard.press('KeyF');
  const comprata = await attendi(ospite, () => window.__gioco.stato().armi.includes('pompa'), 5000);
  verifica('l\'amico compra il fucile a pompa dal muro', comprata, suggerimento);

  await partita(host, `
    p.porte.push('palestra');
    p.giocatori.find(g => g.id === a).punti = 3000;
    p.cassa = { stato: 'aperta', arma: 'raggi', per: a, timer: 99 };
  `, idOspite);
  await ospite.evaluate(() => window.__gioco.vaiA(16, 6));
  await aspettaGioco(host, 0.5);
  await ospite.keyboard.press('KeyF');
  const raggi = await attendi(ospite, () => window.__gioco.stato().armi.includes('raggi'), 5000);
  verifica("dalla cassa l'amico prende la pistola a raggi", raggi, (await stato(ospite)).armi.join(','));
  await partita(host, `
    p.zombie = [
      { id: 8801, x: 16, z: 2.5, yaw: 0, stato: 'dentro', finestra: 'p1', vita: 100000, vitaMax: 100000, corre: false, variante: 0, timer: 0, attesa: 9, bersaglio: null },
      { id: 8802, x: 16.9, z: 2.6, yaw: 0, stato: 'dentro', finestra: 'p1', vita: 100000, vitaMax: 100000, corre: false, variante: 2, timer: 0, attesa: 9, bersaglio: null },
    ];
  `);
  await aspettaGioco(host, 0.6);
  await ospite.waitForTimeout(400);
  await ospite.evaluate(() => {
    window.__gioco.puntaA(16, 1.0, 2.5);
    window.__gioco.spara();
  });
  await ospite.waitForTimeout(60);
  await ospite.screenshot({ path: `${FOTO}13-raggi.png` });
  await aspettaGioco(host, 0.5);
  const vite = await partita(host, 'return p.zombie.map(z => z.vita)');
  verifica("il colpo a raggi esplode e ferisce anche lo zombie accanto", vite.length === 2 && vite.every(v => v < 100000), vite.join(','));
  await partita(host, 'p.zombie = []');

  await partita(host, `
    p.porte.push('corridoio', 'mensa', 'laboratorio', 'caldaia');
    p.giocatori.find(g => g.id === a).punti = 9000;
  `, idOspite);
  await ospite.evaluate(() => window.__gioco.vaiA(24.8, -9.5));
  await aspettaGioco(host, 0.5);
  await ospite.keyboard.press('KeyF');
  await aspettaGioco(host, 0.4);
  verifica("in caldaia l'amico accende la corrente", await partita(host, 'return p.corrente'));
  await ospite.evaluate(() => window.__gioco.vaiA(5.3, 30.6));
  await aspettaGioco(host, 0.5);
  const primaDiPotenziare = (await stato(ospite)).arma.tipo;
  const testoMacchina = await ospite.textContent('#suggerimento');
  await ospite.keyboard.press('KeyF');
  await aspettaGioco(host, 3.4);
  await ospite.waitForTimeout(300);
  await ospite.keyboard.press('KeyF');
  const potenziata = await attendi(ospite, (arma) => window.__gioco.stato().armi.includes(arma + '+'), 6000, primaDiPotenziare);
  verifica("il potenziatore potenzia l'arma che l'amico ha in mano", potenziata, `${testoMacchina} → ${(await stato(ospite)).armi.join(',')}`);
  await ospite.screenshot({ path: `${FOTO}14-potenziatore.png` });

  await partita(host, `Object.assign(p.giocatori.find(g => g.id === a), { stato: 'terra', vita: 0, timerTerra: 30 })`, idOspite);
  await host.bringToFront();
  const doveCaduto = await partita(host, 'const g = p.giocatori.find(g => g.id === a); return { x: g.x, z: g.z }', idOspite);
  await host.evaluate(([x, z]) => window.__gioco.vaiA(x, z), [doveCaduto.x, doveCaduto.z - 1]);
  await aspettaGioco(host, 0.3);
  await host.keyboard.down('KeyF');
  await aspettaGioco(host, 4.6);
  await host.keyboard.up('KeyF');
  const rianimato = await partita(host, 'return p.giocatori.find(g => g.id === a).stato', idOspite);
  verifica('tenendo F l\'host rianima l\'amico', rianimato === 'vivo', rianimato);
  await host.screenshot({ path: `${FOTO}11-host.png` });

  await partita(host, `Object.assign(p.giocatori.find(g => g.id === a), { stato: 'morto', vita: 0 }); p.zombie = []; p.daGenerare = 0;`, idOspite);
  await aspettaGioco(host, 0.3);
  await partita(host, 'p.timerFase = 0.3');
  await aspettaGioco(host, 1.2);
  await ospite.bringToFront();
  await ospite.waitForTimeout(500);
  const rinato = await ospite.evaluate(() => window.__gioco.stato().io);
  const rinatoHost = await partita(host, 'return p.giocatori.find(g => g.id === a)', idOspite);
  verifica("l'amico morto rinasce alla partenza al round dopo", rinatoHost.stato === 'vivo' && Math.hypot(rinato.x + 1.5, rinato.z) < 0.6 && Math.hypot(rinatoHost.x + 1.5, rinatoHost.z) < 0.6, `ospite ${rinato.x.toFixed(1)},${rinato.z.toFixed(1)} host ${rinatoHost.x.toFixed(1)},${rinatoHost.z.toFixed(1)}`);
  await host.bringToFront();

  await partita(host, `for (const g of p.giocatori) Object.assign(g, { stato: 'terra', vita: 0, timerTerra: 0.05 })`);
  const fineHost = await attendi(host, () => !document.getElementById('schermata-fine').hidden, 8000);
  const fineOspite = await attendi(ospite, () => !document.getElementById('schermata-fine').hidden, 8000);
  verifica('quando cadono tutti e due compare la fine', fineHost && fineOspite, await ospite.textContent('#t-dettaglio'));
  await ospite.bringToFront();
  await ospite.screenshot({ path: `${FOTO}12-fine.png` });

  await host.bringToFront();
  await host.click('#rigioca');
  const ripartita = await attendi(ospite, () => window.__gioco.stato().fase === 'gioco', 8000);
  verifica('rigioca riparte per tutti e due', ripartita && (await partita(host, 'return p.giocatori.length')) === 2);

  await ospite.reload();
  await ospite.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 60000 });
  await ospite.fill('#nome', 'Seba');
  await ospite.keyboard.press('Enter');
  const rientrato = await attendi(ospite, () => window.__gioco.stato().fase === 'gioco' && window.__gioco.stato().buffer > 0, 25000);
  verifica('l\'amico che ricarica la pagina rientra nella partita', rientrato, (await stato(ospite)).fase);

  verifica('nessun errore nelle pagine', errori.length === 0, errori.slice(0, 4).join(' | '));
} finally {
  await browser.close();
}
const falliti = esiti.filter(e => !e).length;
console.log(`\n${esiti.length - falliti}/${esiti.length} controlli superati`);
process.exit(falliti ? 1 : 0);
