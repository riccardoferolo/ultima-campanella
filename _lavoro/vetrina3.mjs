import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const solo = process.argv.slice(2);
const vuoi = nome => !solo.length || solo.some(s => nome.includes(s));

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
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
  const scatta = async (nome, x, z, gx, gy, gz, attesa = 700) => {
    await pagina.evaluate(([x, z, gx, gy, gz]) => { window.__gioco.vaiA(x, z); window.__gioco.puntaA(gx, gy, gz); }, [x, z, gx, gy, gz]);
    await pagina.waitForTimeout(attesa);
    if (vuoi(nome)) await pagina.screenshot({ path: `${FOTO}${nome}.png` });
  };
  await pagina.waitForTimeout(800);
  console.log('fase iniziale:', await pagina.evaluate(() => window.__gioco.stato().vista?.fase));
  await scatta('50-sala-rastrelliera', -40, -1.5, -40, 1.3, -5, 1200);
  await scatta('51-sala-manichini', -40, 0.5, -28, 1.2, 0, 900);
  await scatta('52-sala-sud', -36, 1.6, -36, 1.3, 5, 800);
  const prova = async arma => {
    const posto = await pagina.evaluate(a => {
      const p = window.__gioco.partita();
      return p ? null : a;
    }, arma);
    void posto;
    await pagina.evaluate(a => window.__gioco.azione({ tipo: 'prova', arma: a }), arma);
  };
  const tieni = async (nome, arma, mira = false) => {
    await pagina.evaluate(async a => {
      const m = await import('/src/mappa.js');
      const posto = m.RASTRELLIERA.find(r => r.arma === a.replace('+', ''));
      window.__gioco.vaiA(posto.x, posto.z + posto.verso.z * 0.9);
      window.__gioco.azione({ tipo: 'prova', arma: a.replace('+', '') });
    }, arma);
    await pagina.waitForTimeout(900);
    await pagina.evaluate(() => { window.__gioco.vaiA(-40, 0); window.__gioco.puntaA(-28, 1.3, 0); });
    if (mira) await pagina.mouse.down({ button: 'right' });
    await pagina.waitForTimeout(900);
    if (vuoi(nome)) await pagina.screenshot({ path: `${FOTO}${nome}.png` });
    if (mira) await pagina.mouse.up({ button: 'right' });
  };
  void prova;
  for (const [n, a] of [['53-arma-carabina', 'carabina'], ['54-arma-pompa', 'pompa'], ['55-arma-aquila', 'aquila'], ['56-arma-raggi', 'raggi'], ['57-arma-fucileplasma', 'fucilePlasma'], ['58-arma-cannone', 'lanciarazzi'], ['59-arma-mitra', 'vettore'], ['60-arma-precisione', 'bipiede']]) await tieni(n, a);
  await pagina.evaluate(() => { window.__gioco.puntaA(-30.5, 1.3, 0); window.__gioco.spara(); });
  await pagina.waitForTimeout(80);
  if (vuoi('61-sparo')) await pagina.screenshot({ path: `${FOTO}61-sparo.png` });
  await pagina.keyboard.press('Enter');
  await pagina.waitForTimeout(1500);
  if (vuoi('62-conto')) await pagina.screenshot({ path: `${FOTO}62-conto.png` });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'intervallo', null, { timeout: 15000 });
  console.log('partita avviata, armi:', JSON.stringify(await pagina.evaluate(() => window.__gioco.stato().armi)));
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.porte.push('corridoio', 'palestra', 'mensa', 'laboratorio', 'caldaia', 'cortile');
    p.corrente = true;
    p.giocatori[0].punti = 12000;
    p.timerFase = 999;
    const tipi = ['normale', 'base', 'scheletro', 'braccio', 'grasso', 'cane'];
    tipi.forEach((tipo, i) => p.zombie.push({ id: 500 + i, x: 12 + i * 1.3, z: -3, yaw: Math.PI, stato: 'attacco', finestra: 'p2', vita: 9999, vitaMax: 9999, tipo, corre: false, variante: i, timer: 999, attesa: 99, bersaglio: null }));
    p.bonus.push({ id: 90, tipo: 'bomba', x: 13, z: 1.5, timer: 99 }, { id: 91, tipo: 'doppi', x: 15, z: 1.5, timer: 99 }, { id: 92, tipo: 'saldi', x: 17, z: 1.5, timer: 99 });
    const amico = { ...p.giocatori[0], id: 'amico', nome: 'Seba', x: 20.5, z: 0.5, yaw: -Math.PI / 2, armi: ['assalto'], armaAttiva: 'assalto' };
    p.giocatori.push(amico);
  });
  await scatta('63-zombie-tipi', 15.3, 4.5, 15.3, 1, -3, 1500);
  await scatta('64-compagno', 17, 2.5, 20.5, 1.2, 0.5, 900);
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.zombie = [];
    p.bonus = [];
    p.giocatori = p.giocatori.filter(g => g.id !== 'amico');
  });
  await scatta('65-cortile', 10.5, 10, 22, 1.8, 26, 1200);
  await scatta('66-cortile-fuori', 14, 25, 30, 2.5, 20, 900);
  await scatta('67-cassa-arma-muro', 16, 4, 17, 1.2, 8, 900);
  await scatta('68-caldaia', 23, -9.5, 19, 0.8, -14.5, 900);
  await scatta('69-atrio-campanella', -1, 2, -3, 2.2, 6, 900);
} finally {
  await browser.close();
}
