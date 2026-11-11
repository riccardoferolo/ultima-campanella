import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const CARTELLA = process.argv[2] ?? 'prova';
const SOLO = process.argv.slice(3);
const FOTO = new URL(`./foto/bellezza/${CARTELLA}/`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });

const VISTE = [
  ['v1-partenza', -12, 5, 0, 6, 0],
  ['v2-verso-il-bar', -3, -1, -45, 3, 10],
  ['v3-portici', -20, 30, -20, 4, -25],
  ['v4-case-sud', -24, -12, 0, 3, 32],
  ['v5-via-beato-pacifico', 21, 28, 40, 3, 28],
  ['v6-lato-nord', 10, -15, 40, 3, -15],
  ['v7-pavimento', -14, 10, -14, 0, 13.5],
  ['v8-chiesa-dal-bar', -40, 29, 0, 9, 0],
  ['v9-cielo', -10, 10, -160, 120, -200],
  ['v10-municipio', -12, -6, -2, 4, -20],
  ['v11-sagrato', -9, -6, 0, 2, 4],
  ['v12-auto', 5, -14.5, 11, 0.7, -18.5],
  ['v13-incidente', -19, -12, -22.85, 0.7, -15],
  ['v14-ribaltata', -32, 15, -35.3, 0.6, 10.5],
  ['v15-panchina', -16.5, -13, -19.6, 0.5, -16.3],
  ['v16-facciata-bar', -21, -6, -27.2, 1.6, -6],
  ['v17-cartello', -3.5, 15, -0.6, 2.1, 12.5],
];

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
try {
  const pagina = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  pagina.on('pageerror', e => console.error('ERRORE PAGINA:', e.message));
  pagina.on('console', m => { if (m.type() === 'error') console.error('CONSOLE:', m.text().slice(0, 300)); });
  await pagina.goto('http://localhost:5421/?locale');
  await pagina.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 90000 });
  await pagina.fill('#nome', 'Richi');
  await pagina.click('#crea');
  await pagina.click('#parti');
  await pagina.addStyleTag({ content: '#clicca{display:none!important} #hud, .hud, #avviso, .avviso, .radio {visibility:hidden!important}' });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 60000 });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'piazza' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'piazza' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 90000 });
  await pagina.waitForTimeout(1500);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await pagina.waitForFunction(() => ['intervallo', 'gioco'].includes(window.__gioco.stato().vista?.fase), null, { timeout: 20000 });
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.timerFase = 9999;
    p.giocatori[0].vita = p.giocatori[0].vitaMax = 1e9;
  });
  await pagina.waitForTimeout(2000);
  const fps = [];
  for (const [nome, x, z, gx, gy, gz] of VISTE) {
    if (SOLO.length && !SOLO.some(s => nome.includes(s))) continue;
    await pagina.evaluate(([x, z, gx, gy, gz]) => { window.__gioco.vaiA(x, z); window.__gioco.puntaA(gx, gy, gz); }, [x, z, gx, gy, gz]);
    await pagina.waitForTimeout(1200);
    fps.push([nome, await pagina.evaluate(() => window.__gioco.stato().fps)]);
    await pagina.screenshot({ path: `${FOTO}${nome}.png` });
  }
  console.log(fps.map(([n, f]) => `${n}: ${f} fps`).join('\n'));
} finally {
  await browser.close();
}
