import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/voto/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const ATTESA_MS = 900;
const ora = n => {
  const angolo = (n / 12) * Math.PI * 2;
  return { x: 30.9, y: 26.5 + Math.cos(angolo) * 1.025, z: 15.4 + Math.sin(angolo) * 1.025 };
};

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
const esiti = [];
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
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'piazza' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'piazza' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 90000 });
  await pagina.waitForTimeout(1500);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await pagina.waitForFunction(() => ['intervallo', 'gioco'].includes(window.__gioco.stato().vista?.fase), null, { timeout: 20000 });
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.timerFase = 9999;
    p.corrente = true;
    p.giocatori[0].punti = 50000;
    p.giocatori[0].vita = p.giocatori[0].vitaMax = 1e9;
    p.porte.push('municipio', 'transenneNord', 'transenneSud', 'portone', 'scalone', 'sacrestia', 'sacrestiaChiesa', 'tempietto', 'tempiettoChiesa');
  });
  await pagina.waitForTimeout(1500);
  const scatta = async (nome, x, z, gx, gy, gz, attesa = ATTESA_MS) => {
    await pagina.evaluate(([x, z, gx, gy, gz]) => { window.__gioco.vaiA(x, z); window.__gioco.puntaA(gx, gy, gz); }, [x, z, gx, gy, gz]);
    await pagina.waitForTimeout(attesa);
    await pagina.screenshot({ path: `${FOTO}${nome}.png` });
  };
  const voto = v => pagina.evaluate(v => Object.assign(window.__gioco.partita().piazza.voto, v), v);
  const leggi = () => pagina.evaluate(() => ({ ...window.__gioco.partita().piazza.voto }));

  await scatta('a1-piazza-da-nord', -20, -17, -12, 1, 20);
  await scatta('a2-piazza-da-sud', -12, 33.5, -14, 1, -10);
  await scatta('a3-pullman', -24, 18, -17.6, 1.5, 21);
  await scatta('a4-cantiere', -18.5, 24.6, -23.4, 0.6, 24.6);
  await scatta('a5-tombino', -18, 7, -20.6, 0, 4.4);
  await scatta('a6-bancarelle', -14, -3.5, -20, 1.4, -9);
  await scatta('a7-sagrato', 2, 28, 7, 1, 17);
  await scatta('a8-angolo-bar', -29, 21, -36, 0.5, 10.5);
  await scatta('a9-ambulanza', -3, 17, -7.2, 1.5, 18);

  await voto({ fase: 1 });
  await scatta('b1-libro', 47.5, -15.2, 47.5, 1.2, -16.4);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'compra', acquisto: 'libro' }));
  await pagina.waitForTimeout(700);
  await pagina.screenshot({ path: `${FOTO}b2-summa.png` });
  esiti.push(['libro letto -> fase 2', (await leggi()).fase === 2]);

  const spara = async n => {
    const p = ora(n);
    await pagina.evaluate(([x, y, z]) => { window.__gioco.vaiA(8, 22); window.__gioco.puntaA(x, y, z); }, [p.x, p.y, p.z]);
    await pagina.waitForTimeout(250);
    await pagina.evaluate(() => window.__gioco.spara());
    await pagina.waitForTimeout(450);
    return (await leggi()).ore;
  };
  esiti.push(['sparo al IIII -> 1', (await spara(4)) === 1]);
  esiti.push(['sparo al VI -> 2', (await spara(6)) === 2]);
  esiti.push(['sparo al V sbagliato -> 0', (await spara(5)) === 0]);
  await spara(4);
  await spara(6);
  esiti.push(['sparo al I -> 3', (await spara(1)) === 3]);
  await scatta('b3-orologio-acceso', 8, 22, 30.9, 26.3, 15.4, 600);
  await pagina.screenshot({ path: `${FOTO}b3-orologio-zoom.png`, clip: { x: 590, y: 310, width: 100, height: 100 } });
  await pagina.waitForTimeout(2500);
  esiti.push(['sparo al IIII -> 4', (await spara(4)) === 4]);
  esiti.push(['sparo al VIII -> 5', (await spara(8)) === 5]);
  await pagina.waitForTimeout(2500);
  esiti.push(['sparo al II -> 6', (await spara(2)) === 6]);
  esiti.push(['sei ore -> fase 3', (await leggi()).fase === 3]);

  await voto({ fase: 3, carro: 0 });
  await scatta('c1-carro-partenza', -36, 27.5, -41, 1, 31);
  await voto({ carro: 30 });
  await scatta('c2-carro-piazza', -6, 26, -11, 1.2, 31.4, 1500);
  await voto({ carro: 66 });
  await scatta('c3-carro-tempietto', 25.5, 20.5, 21.2, 1.2, 21.5, 1500);

  await voto({ fase: 4, anime: 12 });
  await scatta('d1-veglia', 26.5, 14.5, 22.3, 1.2, 18.2, 1200);
  await voto({ anime: 19 });
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    p.zombie.push({ id: 99999, x: 24.5, z: 14, yaw: 0, stato: 'dentro', finestra: 't1', vita: 1, vitaMax: 1, tipo: 'normale', corre: false, variante: 0, timer: 0, attesa: 99, bersaglio: null });
  });
  await pagina.waitForTimeout(300);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'colpo', zombie: 99999, danno: 100 }));
  await pagina.waitForTimeout(3500);
  const capitano = await pagina.evaluate(() => window.__gioco.partita().zombie.find(z => z.tipo === 'capitano'));
  esiti.push(['il Capitano compare', !!capitano]);
  if (capitano) await scatta('e1-capitano', capitano.x - 4, capitano.z + 4, capitano.x, 1.5, capitano.z, 400);
  console.log(esiti.map(([n, ok]) => `${ok ? 'OK ' : 'NO '} ${n}`).join('\n'));
} finally {
  await browser.close();
}
