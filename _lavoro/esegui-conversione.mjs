import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const destinazione = new URL('../public/modelli/zombie.glb', import.meta.url);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const pagina = await browser.newPage();
  pagina.on('pageerror', e => console.error('errore pagina:', e.message));
  await pagina.goto('http://localhost:5421/_lavoro/converti/index.html');
  await pagina.waitForFunction(() => window.pronto === true, null, { timeout: 30000 });
  const { info, base64 } = await pagina.evaluate(() => window.converti());
  console.log(JSON.stringify(info, null, 1));
  const byte = Buffer.from(base64, 'base64');
  writeFileSync(destinazione, byte);
  console.log(`zombie.glb: ${(byte.length / 1024).toFixed(0)} KB`);
} finally {
  await browser.close();
}
