import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const FOTO = new URL('./foto/raccolte/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
mkdirSync(FOTO, { recursive: true });
const BASE = process.argv[2] ?? 'http://localhost:5421/?locale';
const ATTESA_MS = 700;
const DISTANZE = [1.1, 1.4];

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
const esiti = [];
try {
  const pagina = await browser.newPage({ viewport: { width: 960, height: 540 } });
  pagina.on('pageerror', e => console.error('ERRORE PAGINA:', e.message));
  pagina.on('console', m => { if (m.type() === 'error') console.error('CONSOLE:', m.text().slice(0, 300)); });
  await pagina.goto(BASE);
  await pagina.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 120000 });
  await pagina.fill('#nome', 'Richi');
  await pagina.click('#crea');
  await pagina.click('#parti');
  await pagina.addStyleTag({ content: '#clicca{display:none!important}' });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 60000 });
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'scegli', cosa: 'mappa', valore: 'abisso' }));
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.mappa === 'abisso' && window.__gioco.stato().vista?.fase === 'attesa', null, { timeout: 120000 });
  await pagina.waitForTimeout(1500);
  await pagina.evaluate(() => window.__gioco.azione({ tipo: 'pronto', attivo: true }));
  await pagina.waitForFunction(() => ['intervallo', 'gioco'].includes(window.__gioco.stato().vista?.fase), null, { timeout: 30000 });
  await pagina.waitForFunction(() => window.__gioco.stato().vista?.fase === 'gioco', null, { timeout: 30000 }).catch(() => {});
  await pagina.evaluate(() => {
    const p = window.__gioco.partita();
    Object.assign(p, { zombie: [], daGenerare: 999, attesaComparsa: 9999, timerFase: 9999 });
    p.porte.push('paratiaBeta', 'paratiaGamma', 'portaleDelta');
    p.abisso.turbine = [1, 1, 1];
    p.corrente = true;
    for (const g of p.giocatori) Object.assign(g, { vita: 1e9, vitaMax: 1e9, punti: 99999 });
  });
  await pagina.waitForTimeout(1200);

  const mappa = await pagina.evaluate(async () => {
    const m = await import('/src/mappe/abisso.js');
    const { ostacoliPerGiocatori } = await import('/src/mappa.js');
    return { parti: m.PARTI_SCUDO.map(posti => posti.map(p => ({ x: p.x, z: p.z }))), nodi: m.NODI.map(n => ({ x: n.dentro.x, z: n.dentro.z })), nucleo: m.ACQUISTI.find(a => a.id === 'nucleo').posizione, quote: null, ostacoli: ostacoliPerGiocatori?.length ?? null };
  });

  async function prova(nome, punto, prepara, presa, arg) {
    let riuscito = false;
    let prompt = '';
    let dove = null;
    for (const d of DISTANZE) {
      for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2, Math.PI / 4, -Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4]) {
        await pagina.evaluate(prepara, arg);
        const x = punto.x + Math.cos(a) * d;
        const z = punto.z + Math.sin(a) * d;
        await pagina.evaluate(([x, z, px, pz]) => {
          window.__gioco.vaiA(x, z);
          window.__gioco.puntaA(px, 0, pz);
        }, [x, z, punto.x, punto.z]);
        await pagina.waitForTimeout(250);
        const io = await pagina.evaluate(() => ({ x: window.__gioco.stato().io.x, z: window.__gioco.stato().io.z }));
        if (Math.hypot(io.x - x, io.z - z) > 0.3) continue;
        prompt = await pagina.textContent('#suggerimento');
        dove = { x: +x.toFixed(2), z: +z.toFixed(2) };
        await pagina.evaluate(([px, pz]) => window.__gioco.puntaA(px, -2, pz), [punto.x, punto.z]);
        await pagina.waitForTimeout(ATTESA_MS);
        await pagina.screenshot({ path: `${FOTO}${nome}.png` });
        await pagina.keyboard.press('KeyF');
        await pagina.waitForTimeout(500);
        riuscito = await pagina.evaluate(presa, arg);
        break;
      }
      if (dove) break;
    }
    esiti.push([nome, riuscito]);
    console.log(`${riuscito ? 'OK ' : 'NO '} ${nome} · da ${JSON.stringify(dove)} · scritta: «${prompt}»`);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      await prova(`scudo-${i}-${j}`, mappa.parti[i][j], ([i, j]) => {
        const s = window.__gioco.partita().abisso.scudo;
        s.posti[i] = j;
        s.prese[i] = false;
        s.costruito = false;
      }, ([i]) => window.__gioco.partita().abisso.scudo.prese[i], [i, j]);
    }
  }
  for (let i = 0; i < mappa.nodi.length; i++) {
    await prova(`nodo-${i}`, mappa.nodi[i], ([i]) => {
      const ab = window.__gioco.partita().abisso;
      ab.nodi[i] = 1;
    }, ([i]) => window.__gioco.partita().abisso.nodi[i] === 2, [i]);
  }
} catch (e) {
  console.log('NON RIUSCITO:', e.message.split('\n')[0]);
} finally {
  await browser.close();
}
console.log(esiti.every(([, ok]) => ok) ? 'TUTTO OK' : 'PROBLEMI');
