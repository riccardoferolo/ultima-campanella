import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/teatro/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const solo = process.argv.slice(2);
const vuoi = nome => !solo.length || solo.some(s => nome.includes(s));
const ATTESA_MS = 900;
const MISURA_FPS_MS = 6000;

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
  await pagina.addStyleTag({ content: '#clicca{display:none!important}' });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 60000 });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'teatro' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'teatro' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 90000 });
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
  await pagina.waitForTimeout(1200);
  await scatta('01-atrio', 0, -12.5, 0, 4, 2);
  await scatta('02-atrio-scalone', -3, -9, 10, 3.5, -1);
  await scatta('03-lampadario', 0, -11, 0, 7.4, -5.5);
  await pagina.evaluate(() => window.__gioco.partita().porte.push('scalone', 'guardaroba', 'balcone', 'servizio', 'caldaia', 'rampa'));
  await scatta('04-pianerottolo', 10.3, -5.5, 10.3, 4.5 + 1.6, 2, 600);
  await scatta('04b-pianerottolo', 10, 2.4, -6, 2, -6, 1200);
  await scatta('05-salone', 15, 2.5, 26, 5.6, 4);
  await scatta('06-corridoio', 22.2, 11, 22.2, 5.8, 25);
  await scatta('07-guardaroba', 21, 27, 28, 5.4, 38);
  await scatta('08-balcone', 18.5, 35, 5, 1, 36);
  await scatta('09-palco-buio', 8, 40, -4, 2, 28);
  await scatta('10-vicolo', -21.5, -8, -25, 2.2, 20);
  await scatta('11-scala-caldaia', -25.5, 23.5, -25.5, -2.5, 31);
  await scatta('12-caldaia', -24, 32, -30, -2.4, 36.5);
  await scatta('13-rampa', -24, 43, -15, 1, 43);
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    const tipi = ['normale', 'magro', 'ardente', 'tossico'];
    tipi.forEach((tipo, i) => p.zombie.push({ id: 900 + i, x: -3 + i * 2, z: 39, yaw: Math.PI, stato: 'attacco', finestra: 'p1', vita: 9999, vitaMax: 9999, tipo, corre: false, variante: i, timer: 999, attesa: 99, bersaglio: null }));
  });
  await scatta('14-corrotti', 0, 34.5, 0, 1.1, 39, 1500);
  await pagina.evaluate(() => {
    window.__gioco.partita().zombie = [];
    window.__gioco.vaiA(0, 42.8);
  });
  await pagina.waitForTimeout(300);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'leva' }));
  await pagina.waitForTimeout(3000);
  await scatta('15-sipario-sale', 0, 38, 0, 3, 20, 600);
  await pagina.waitForTimeout(4500);
  await scatta('16-palco-luce', 6, 42, -6, 2, 28);
  await scatta('17-platea-dal-palco', 0, 29, 0, 0.5, 10);
  await scatta('18-platea-dal-fondo', 11, 5.5, -4, 1.4, 27);
  await scatta('19-atrio-luce', 0, -12.5, 0, 4, 2);
  await pagina.evaluate(() => { window.__gioco.vaiA(0, 34.6); });
  await pagina.waitForTimeout(300);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'botola' }));
  await pagina.waitForTimeout(1200);
  await scatta('20-sottopalco', -45, 33.6, -45, -2.4, 39.5);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'montacarichi' }));
  await pagina.waitForTimeout(800);
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    for (let i = 0; i < 18; i++) p.zombie.push({ id: 1000 + i, x: -9 + (i % 6) * 3.4, z: 22 + Math.floor(i / 6) * 1.2, yaw: Math.PI, stato: 'dentro', finestra: 'l1', vita: 9999, vitaMax: 9999, tipo: i % 4 === 3 ? 'tossico' : 'normale', corre: false, variante: i, timer: 0, attesa: 99, bersaglio: null });
  });
  await scatta('21-platea-orda', 0, 6, 0, 0.2, 22, 1200);
  const fps = await pagina.evaluate(async ms => {
    const inizio = performance.now();
    let n = 0;
    await new Promise(fine => {
      const giro = () => {
        n += 1;
        if (performance.now() - inizio < ms) requestAnimationFrame(giro);
        else fine();
      };
      requestAnimationFrame(giro);
    });
    return Math.round((n * 1000) / (performance.now() - inizio));
  }, MISURA_FPS_MS);
  console.log('fps in platea con 18 Corrotti:', fps, 'qualita:', await pagina.evaluate(() => window.__gioco.mondo()?.qualita));
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.zombie = [];
    p.teatro.eclissi = true;
  });
  await scatta('22-eclissi-vicolo', -22, -9, -26, 6, 15, 2500);
  await pagina.evaluate(() => { window.__gioco.partita().teatro.eclissi = false; });
  console.log('fase finale:', await pagina.evaluate(() => window.__gioco.stato().vista?.fase));
} finally {
  await browser.close();
}
