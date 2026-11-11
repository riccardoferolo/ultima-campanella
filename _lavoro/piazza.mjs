import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/piazza/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const solo = process.argv.slice(2);
const vuoi = nome => !solo.length || solo.some(s => nome.includes(s));
const ATTESA_MS = 900;

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
try {
  const pagina = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  pagina.on('pageerror', e => console.error('ERRORE PAGINA:', e.message));
  pagina.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('CONSOLE:', m.text().slice(0, 300)); });
  await pagina.goto('http://localhost:5421/?locale');
  await pagina.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 90000 });
  await pagina.fill('#nome', 'Richi');
  await pagina.click('#crea');
  await pagina.click('#parti');
  await pagina.addStyleTag({ content: '#clicca{display:none!important}' });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 60000 });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'piazza' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'piazza' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 90000 });
  await pagina.waitForTimeout(1500);
  const scatta = async (nome, x, z, gx, gy, gz, attesa = ATTESA_MS) => {
    await pagina.evaluate(([x, z, gx, gy, gz]) => { window.__gioco.vaiA(x, z); window.__gioco.puntaA(gx, gy, gz); }, [x, z, gx, gy, gz]);
    await pagina.waitForTimeout(attesa);
    if (vuoi(nome)) await pagina.screenshot({ path: `${FOTO}${nome}.png` });
  };
  if (vuoi('00-sala')) await pagina.screenshot({ path: `${FOTO}00-sala.png` });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await pagina.waitForFunction(() => ['intervallo', 'gioco'].includes(window.__gioco.stato().vista?.fase), null, { timeout: 20000 });
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.timerFase = 9999;
    p.giocatori[0].punti = 50000;
    p.giocatori[0].vita = p.giocatori[0].vitaMax = 1e9;
  });
  await pagina.waitForTimeout(1500);
  await scatta('01-facciata', -24, 0, 0, 9, 0);
  await scatta('02-da-sud-ovest', -24, 30, 22, 12, 6);
  await scatta('03-municipio', -11, -8, 2, 4, -20);
  await scatta('04-fontana', -18, 5, -24.8, 3, 1);
  await scatta('05-campanile', 4, 29, 34, 28, 15);
  await scatta('05b-fianco-sud', 2, 30, 30, 6, 24);
  await scatta('05c-tempietto-fronte', 12, 31.5, 27, 7, 24);
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.porte.push('municipio', 'transenneNord', 'transenneSud', 'portone', 'scalone', 'sacrestia', 'sacrestiaChiesa', 'tempietto', 'tempiettoChiesa');
  });
  await pagina.waitForTimeout(1500);
  await scatta('06-navata', 2.2, 0, 40, 6, 0);
  await scatta('07-cupola', 36, 0.5, 36, 26, 0.6);
  await scatta('08-presbiterio', 38, 0, 56, 5, 0);
  await scatta('09-controfacciata', 26, 0, 1, 8, 0);
  await scatta('09b-navata-laterale', 3, -8.3, 30, 4, -8);
  await scatta('10-tempietto', 28, 21, 18.5, 2.5, 18);
  await scatta('11-lato-nord', 1.5, -15.5, 40, 3, -15);
  await scatta('12-via-beato-pacifico', 19.5, 28, 40, 3, 27.8);
  await scatta('13-androne', -5, -20.8, -5, 2, -27);
  await scatta('13b-uffici', -1, -24, 16, 1.6, -24);
  await scatta('14-consiglio', 3, -37, 15, 5.8, -43);
  await scatta('15-sacrestia', 44, -12.5, 51, 1.6, -16);
  await pagina.evaluate(() => {
    window.__gioco.partita().corrente = true;
    window.__gioco.vaiA(29.4, 15.4);
  });
  await pagina.waitForTimeout(500);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'campanile' }));
  await pagina.waitForTimeout(1500);
  await scatta('16-cella', 34.8, 16.6, 33, 32.2, 13.4);
  await scatta('17-dalla-bifora', 34, 17.2, 0, 10, 40);
  await scatta('18-dalla-bifora-ovest', 32.2, 15.4, -30, 0, 10);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'campane' }));
  await pagina.waitForTimeout(1200);
  await scatta('19-campane', 34.8, 16.6, 34, 34, 15.6, 300);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'discesa' }));
  await pagina.waitForTimeout(800);
  await scatta('20-facciata-luce', -26, 2, 0, 9, 0);
  await scatta('21-navata-luce', 2.2, 0, 40, 6, 0);
  const stato = await pagina.evaluate(() => {
    const s = window.__gioco.stato();
    return { fps: s.fps, fase: s.vista.fase, io: [s.io.x, s.io.z], corrente: s.vista.corrente, piazza: s.vista.piazza };
  });
  console.log(JSON.stringify(stato));
} finally {
  await browser.close();
}
