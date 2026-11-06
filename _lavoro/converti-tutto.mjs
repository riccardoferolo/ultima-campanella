import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const DEST = new URL('../public/modelli/', import.meta.url);
const OGGETTI = ['Barrel', 'Blood_1', 'Blood_2', 'Blood_3', 'Chest', 'Chest_Special', 'CinderBlock', 'Container_Green', 'Container_Red', 'Couch',
  'FireHydrant', 'Pallet', 'Pallet_Broken', 'Pipes', 'PlasticBarrier', 'StreetLights', 'TownSign', 'TrafficBarrier_1', 'TrafficBarrier_2',
  'TrafficCone_1', 'TrafficCone_2', 'TrashBag_1', 'TrashBag_2', 'WaterTower', 'Wheel', 'Wheels_Stack'];
const LAVORI = [
  ['armi.glb', 'armi'],
  ['aliene.glb', 'aliene'],
  ['zombi_base.glb', 'zombi', 'Zombie_Basic'],
  ['zombi_grasso.glb', 'zombi', 'Zombie_Chubby'],
  ['zombi_scheletro.glb', 'zombi', 'Zombie_Ribcage'],
  ['zombi_braccio.glb', 'zombi', 'Zombie_Arm'],
  ['cane.glb', 'zombi', 'Cane'],
  ['sopravvissuto_matt.glb', 'zombi', 'sopravvissuti/Matt_SingleWeapon'],
  ['sopravvissuto_shaun.glb', 'zombi', 'sopravvissuti/Shaun_SingleWeapon'],
  ['oggetti.glb', 'oggetti', OGGETTI],
];
const solo = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  const p = await browser.newPage();
  p.on('pageerror', e => console.error('errore:', e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('console:', m.text().slice(0, 200)); });
  await p.goto('http://localhost:5421/_lavoro/converti/tutto.html');
  await p.waitForFunction(() => window.pronto === true, null, { timeout: 30000 });
  for (const [file, cosa, extra] of LAVORI) {
    if (solo.length && !solo.includes(file)) continue;
    const { info, base64 } = await p.evaluate(([c, e]) => window.converti(c, e), [cosa, extra]);
    const byte = Buffer.from(base64, 'base64');
    writeFileSync(new URL(file, DEST), byte);
    console.log(`${file}: ${(byte.length / 1024).toFixed(0)} KB`);
    console.log(JSON.stringify(info));
  }
} finally {
  await browser.close();
}
