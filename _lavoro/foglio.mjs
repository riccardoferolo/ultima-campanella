import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync, readdirSync } from 'node:fs';

const cartella = new URL('./scaricati/armi/estratti/Ultimate Gun Pack - July 2019/FBX/', import.meta.url);
const vere = readdirSync(cartella).filter(f => f.endsWith('.fbx')).map(f => f.slice(0, -4)).sort();
const aliene = ['Gun_Pistol', 'Gun_Revolver', 'Gun_Rifle', 'Gun_SMG_Ammo', 'Gun_Sniper', 'Gun_Sniper_Ammo'];
mkdirSync(new URL('./foto/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  const p = await browser.newPage();
  p.on('pageerror', e => console.error('errore:', e.message));
  await p.goto('http://localhost:5421/_lavoro/converti/foglio.html');
  await p.waitForFunction(() => window.pronto === true, null, { timeout: 30000 });
  const fogli = [['41-vere-a', vere.slice(0, 20), 4], ['42-vere-b', vere.slice(20), 4], ['43-aliene', aliene, 3]];
  for (const [nome, elenco, colonne] of fogli) {
    const img = await p.evaluate(([n, c]) => window.foglio(n, c, 'lato'), [elenco, colonne]);
    writeFileSync(new URL(`./foto/${nome}.png`, import.meta.url), Buffer.from(img.split(',')[1], 'base64'));
    console.log(nome, elenco.join(' '));
  }
} finally {
  await browser.close();
}
