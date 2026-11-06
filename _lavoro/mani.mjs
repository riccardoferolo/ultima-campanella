import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const armi = process.argv.slice(2).length ? process.argv.slice(2) : ['pistola', 'carabina', 'pompa', 'raggi', 'fucilePlasma', 'vettore'];
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  const p = await browser.newPage();
  p.on('pageerror', e => console.error('errore:', e.message));
  await p.goto('http://localhost:5421/_lavoro/converti/mani.html');
  await p.waitForFunction(() => window.pronto === true, null, { timeout: 30000 });
  const immagini = await p.evaluate(a => window.foto(a), armi);
  immagini.forEach((img, i) => writeFileSync(new URL(`./foto/70-mani-${armi[i]}.png`, import.meta.url), Buffer.from(img.split(',')[1], 'base64')));
  console.log('ok', armi.length);
} finally {
  await browser.close();
}
