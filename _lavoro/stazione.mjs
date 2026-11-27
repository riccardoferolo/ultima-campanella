import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/stazione/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const solo = process.argv.slice(2);
const vuoi = nome => !solo.length || solo.some(s => nome.includes(s));
const ATTESA_MS = 1200;

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
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'stazione' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'stazione' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 90000 });
  await pagina.waitForTimeout(1500);
  const scatta = async (nome, x, z, gx, gy, gz, attesa = ATTESA_MS) => {
    if (!vuoi(nome)) return;
    await pagina.evaluate(([x, z, gx, gy, gz]) => { window.__gioco.vaiA(x, z); window.__gioco.puntaA(gx, gy, gz); }, [x, z, gx, gy, gz]);
    await pagina.waitForTimeout(attesa);
    await pagina.screenshot({ path: `${FOTO}${nome}.png` });
  };
  const partita = fn => pagina.evaluate(fn);
  if (vuoi('00-sala')) await pagina.screenshot({ path: `${FOTO}00-sala.png` });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await pagina.waitForFunction(() => ['intervallo', 'gioco'].includes(window.__gioco.stato().vista?.fase), null, { timeout: 20000 });
  await partita(() => {
    const p = window.__gioco.partita();
    p.timerFase = 9999;
    p.giocatori[0].punti = 50000;
    p.giocatori[0].vita = p.giocatori[0].vitaMax = 1e9;
  });
  await pagina.waitForTimeout(1500);
  await scatta('01-piazzale-buio', -14, 3, 0, 3, -8);
  await scatta('02-pensilina-buio', 14, 2, -4, 2, -8);
  await partita(() => { window.__gioco.partita().porte.push('ingresso', 'serranda', 'interna', 'magazzino', 'retroOfficina'); });
  await scatta('03-market-buio', -4, 7.5, -12, 1.5, 17);
  await partita(() => { window.__gioco.partita().corrente = true; });
  await scatta('04-piazzale-luce', -14, 3, 0, 3, -8);
  await scatta('05-pensilina-luce', 14, 2, -4, 2, -8);
  await scatta('06-totem', 8, -4, 21, 5, -15.5);
  await scatta('07-facciata', 4, -14, -2, 3, 6);
  await scatta('08-market', -4, 7.5, -12, 1.5, 17);
  await scatta('09-bar', -2, 14, -12, 1.2, 17);
  await scatta('10-officina', 8, 8, 20, 2, 17);
  await scatta('11-retro', -12, 26, 10, 2, 32);
  await scatta('12-cisterna', 6, 23, -6, 2, 31);
  await scatta('13-autostrada', 0, -18.5, 10, 1, -30);
  await partita(() => { const s = window.__gioco.partita().stazione; s.gruppo = 3; s.arrivo = 999; });
  await scatta('14-faro', -10, 22, 8, 4, 32, 2500);
  await partita(() => { window.__gioco.partita().stazione.arrivo = 0.1; });
  await pagina.waitForTimeout(4000);
  await scatta('15-camion', 4, 27, 13, 1.5, 36, 300);
  await pagina.waitForTimeout(2500);
  const boss = await partita(() => {
    const z = window.__gioco.partita().zombie.find(z => z.tipo === 'camionista' && z.stato !== 'morto');
    return z ? { x: z.x, z: z.z } : null;
  });
  if (boss) await scatta('16-camionista', boss.x - 2.6, boss.z - 2.6, boss.x, 1.7, boss.z, 250);
  await partita(() => { window.__gioco.partita().stazione.incendio.attiva = 999; });
  await scatta('17-incendio', -15, 2, 0, 1, -7, 1500);
  const stato = await partita(() => {
    const s = window.__gioco.stato();
    return { fps: s.fps, fase: s.vista.fase, round: s.vista.round, stazione: s.vista.stazione };
  });
  console.log(JSON.stringify(stato));
} finally {
  await browser.close();
}
