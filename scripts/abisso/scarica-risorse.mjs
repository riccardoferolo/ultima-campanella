import { mkdir, writeFile, stat } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { creaRumore } from '../../src/grafica/abisso/rumore.js';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARTELLA_TEXTURE = join(RADICE, 'public', 'abisso', 'texture');
const CARTELLA_HDRI = join(RADICE, 'public', 'abisso', 'hdri');
const API = 'https://api.polyhaven.com';
const AGENTE = 'abyssus9-asset-script';
const ATTESA_MS = 30000;
const TENTATIVI = 3;
const LATO_RISERVA = 1024;

const SET = Object.freeze([
  { chiave: 'lamiera', scelte: ['rusty_metal_02', 'rusty_metal_04', 'rust_coarse_01'], risoluzione: { diff: '2k', nor: '1k', rough: '1k' }, mappe: ['diff', 'nor', 'rough'], tinta: [[92, 70, 52], [140, 82, 44], [60, 58, 54]] },
  { chiave: 'paratia', scelte: ['rusty_painted_metal', 'blue_metal_plate', 'metal_plate'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[70, 88, 92], [120, 74, 40], [52, 60, 62]] },
  { chiave: 'marmo', scelte: ['marble_01', 'marble_tiles', 'grey_cartago_01'], risoluzione: { diff: '2k', nor: '2k', rough: '1k', ao: '1k' }, mappe: ['diff', 'nor', 'rough', 'ao'], tinta: [[214, 210, 198], [180, 176, 166], [236, 232, 222]] },
  { chiave: 'pietraMarina', scelte: ['seaworn_sandstone_brick', 'old_sandstone_02', 'rabdentse_ruins_wall'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[150, 142, 120], [110, 116, 102], [176, 168, 146]] },
  { chiave: 'roccia', scelte: ['dark_rock', 'dark_rock_02', 'rock_wall_10'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[42, 40, 44], [26, 28, 32], [70, 66, 64]] },
  { chiave: 'fondale', scelte: ['coral_ground_02', 'damp_sand', 'coast_sand_01'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[124, 116, 96], [92, 88, 74], [150, 140, 116]] },
  { chiave: 'graffiato', scelte: ['blue_metal_plate', 'metal_plate_02', 'metal_plate'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[120, 124, 130], [90, 94, 100], [150, 152, 156]] },
  { chiave: 'pelle', scelte: ['brown_leather', 'leather_red_02', 'fabric_leather_02'], risoluzione: '1k', mappe: ['diff', 'nor', 'rough'], tinta: [[70, 56, 50], [40, 34, 34], [96, 74, 62]] },
]);
const HDRI = Object.freeze({ nome: 'notte', scelte: ['blue_lagoon_night', 'dikhololo_night', 'boiler_room'], risoluzione: '1k' });
const NOMI_POLYHAVEN = Object.freeze({ diff: 'Diffuse', nor: 'nor_gl', rough: 'Rough', ao: 'AO' });

async function scarica(url) {
  let ultimo = null;
  for (let tentativo = 1; tentativo <= TENTATIVI; tentativo++) {
    const controllo = new AbortController();
    const timer = setTimeout(() => controllo.abort(), ATTESA_MS);
    try {
      const risposta = await fetch(url, { headers: { 'User-Agent': AGENTE }, signal: controllo.signal });
      if (!risposta.ok) throw new Error(`HTTP ${risposta.status} per ${url}`);
      return Buffer.from(await risposta.arrayBuffer());
    } catch (errore) {
      ultimo = errore;
      await new Promise(r => setTimeout(r, 400 * tentativo + Math.random() * 300));
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(`Download fallito dopo ${TENTATIVI} tentativi: ${url} (${ultimo?.message})`);
}

const json = async url => JSON.parse((await scarica(url)).toString('utf8'));

async function esiste(percorso) {
  try {
    return (await stat(percorso)).size > 0;
  } catch {
    return false;
  }
}

const TABELLA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const b of buffer) c = TABELLA_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function blocco(tipo, dati) {
  const lunghezza = Buffer.alloc(4);
  lunghezza.writeUInt32BE(dati.length);
  const corpo = Buffer.concat([Buffer.from(tipo, 'ascii'), dati]);
  const controllo = Buffer.alloc(4);
  controllo.writeUInt32BE(crc32(corpo));
  return Buffer.concat([lunghezza, corpo, controllo]);
}

function png(lato, pixel) {
  const intestazione = Buffer.alloc(13);
  intestazione.writeUInt32BE(lato, 0);
  intestazione.writeUInt32BE(lato, 4);
  intestazione[8] = 8;
  intestazione[9] = 2;
  const righe = Buffer.alloc(lato * (lato * 3 + 1));
  for (let y = 0; y < lato; y++) {
    righe[y * (lato * 3 + 1)] = 0;
    pixel.copy(righe, y * (lato * 3 + 1) + 1, y * lato * 3, (y + 1) * lato * 3);
  }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), blocco('IHDR', intestazione), blocco('IDAT', deflateSync(righe, { level: 9 })), blocco('IEND', Buffer.alloc(0))]);
}

function campoAltezza(set, lato) {
  const rumore = creaRumore(set.chiave.length * 7919 + set.chiave.charCodeAt(0));
  const altezze = new Float32Array(lato * lato);
  const periodo = 4;
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const u = (x / lato) * Math.PI * 2;
      const v = (y / lato) * Math.PI * 2;
      const px = Math.cos(u) * periodo;
      const py = Math.sin(u) * periodo;
      const pz = Math.cos(v) * periodo + Math.sin(v) * 0.5;
      const base = rumore.fbm(px, py + Math.sin(v) * periodo, pz, 6);
      const [vicino, secondo] = rumore.cellule(px * 1.6, py * 1.6 + Math.sin(v) * 6, pz * 1.6);
      const crepe = set.chiave === 'marmo' || set.chiave === 'pietraMarina' ? Math.min(1, (secondo - vicino) * 4) : 1;
      altezze[y * lato + x] = base * 0.7 + crepe * 0.3 + (set.chiave === 'pelle' ? (1 - vicino) * 0.4 : 0);
    }
  }
  return altezze;
}

function texturaRiserva(set, mappa, altezze, lato) {
  const pixel = Buffer.alloc(lato * lato * 3);
  const [scura, calda, chiara] = set.tinta;
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const i = y * lato + x;
      const h = altezze[i];
      const o = i * 3;
      if (mappa === 'diff') {
        const t = Math.min(1, Math.max(0, h * 0.5 + 0.5));
        const mescola = Math.min(1, Math.max(0, (h - 0.15) * 3));
        for (let c = 0; c < 3; c++) pixel[o + c] = Math.round((scura[c] * (1 - t) + chiara[c] * t) * (1 - mescola * 0.6) + calda[c] * mescola * 0.6);
      } else if (mappa === 'nor') {
        const sx = altezze[y * lato + ((x + 1) % lato)] - altezze[y * lato + ((x - 1 + lato) % lato)];
        const sy = altezze[((y + 1) % lato) * lato + x] - altezze[((y - 1 + lato) % lato) * lato + x];
        const forza = 6;
        const nx = -sx * forza;
        const ny = -sy * forza;
        const lunghezza = Math.hypot(nx, ny, 1);
        pixel[o] = Math.round(((nx / lunghezza) * 0.5 + 0.5) * 255);
        pixel[o + 1] = Math.round(((ny / lunghezza) * 0.5 + 0.5) * 255);
        pixel[o + 2] = Math.round(((1 / lunghezza) * 0.5 + 0.5) * 255);
      } else if (mappa === 'rough') {
        const r = Math.round(Math.min(1, Math.max(0, 0.62 + h * 0.3)) * 255);
        pixel[o] = pixel[o + 1] = pixel[o + 2] = r;
      } else {
        const a = Math.round(Math.min(1, Math.max(0, 0.75 + h * 0.35)) * 255);
        pixel[o] = pixel[o + 1] = pixel[o + 2] = a;
      }
    }
  }
  return png(lato, pixel);
}

async function scegli(catalogo, scelte) {
  return scelte.find(id => Object.hasOwn(catalogo, id)) ?? null;
}

async function scaricaSet(set, catalogo, rapporto) {
  const id = catalogo ? await scegli(catalogo, set.scelte) : null;
  let file = null;
  if (id) {
    try {
      file = await json(`${API}/files/${id}`);
    } catch (errore) {
      rapporto.push(`  ${set.chiave}: elenco file non disponibile (${errore.message})`);
    }
  }
  let altezze = null;
  for (const mappa of set.mappe) {
    const destinazione = join(CARTELLA_TEXTURE, `${set.chiave}_${mappa}.jpg`);
    const riserva = join(CARTELLA_TEXTURE, `${set.chiave}_${mappa}.png`);
    if (await esiste(destinazione) || await esiste(riserva)) {
      rapporto.push(`  ${set.chiave}_${mappa}: già presente`);
      continue;
    }
    const risoluzione = typeof set.risoluzione === 'string' ? set.risoluzione : set.risoluzione[mappa] ?? '1k';
    const voce = file?.[NOMI_POLYHAVEN[mappa]]?.[risoluzione]?.jpg ?? file?.[NOMI_POLYHAVEN[mappa]]?.['1k']?.jpg;
    if (voce?.url) {
      try {
        await writeFile(destinazione, await scarica(voce.url));
        rapporto.push(`  ${set.chiave}_${mappa}: ${id} (${Math.round(voce.size / 1024)} KB)`);
        continue;
      } catch (errore) {
        rapporto.push(`  ${set.chiave}_${mappa}: download fallito (${errore.message}), uso la riserva procedurale`);
      }
    }
    altezze ??= campoAltezza(set, LATO_RISERVA);
    await writeFile(riserva, texturaRiserva(set, mappa, altezze, LATO_RISERVA));
    rapporto.push(`  ${set.chiave}_${mappa}: riserva procedurale ${LATO_RISERVA}px`);
  }
  return id;
}

async function scaricaHdri(rapporto) {
  const destinazione = join(CARTELLA_HDRI, `${HDRI.nome}.hdr`);
  if (await esiste(destinazione)) {
    rapporto.push(`  hdri: già presente`);
    return;
  }
  try {
    const catalogo = await json(`${API}/assets?t=hdris`);
    const id = await scegli(catalogo, HDRI.scelte);
    if (!id) throw new Error('nessun HDRI notturno disponibile');
    const file = await json(`${API}/files/${id}`);
    const voce = file?.hdri?.[HDRI.risoluzione]?.hdr;
    if (!voce?.url) throw new Error(`HDRI ${id} senza versione ${HDRI.risoluzione}`);
    await writeFile(destinazione, await scarica(voce.url));
    rapporto.push(`  hdri: ${id} (${Math.round(voce.size / 1024)} KB)`);
  } catch (errore) {
    rapporto.push(`  hdri: non scaricato (${errore.message}); il gioco usa l'ambiente procedurale`);
  }
}

async function principale() {
  await mkdir(CARTELLA_TEXTURE, { recursive: true });
  await mkdir(CARTELLA_HDRI, { recursive: true });
  const rapporto = ['Risorse di ABYSSUS-9 (Poly Haven, CC0):'];
  let catalogo = null;
  try {
    catalogo = await json(`${API}/assets?t=textures`);
  } catch (errore) {
    rapporto.push(`  catalogo non raggiungibile (${errore.message}): genero tutto in procedurale`);
  }
  const usati = {};
  for (const set of SET) usati[set.chiave] = await scaricaSet(set, catalogo, rapporto);
  await scaricaHdri(rapporto);
  await writeFile(join(RADICE, 'public', 'abisso', 'fonti.json'), `${JSON.stringify({ texture: usati, hdri: HDRI.scelte, licenza: 'CC0 (polyhaven.com)' }, null, 2)}\n`);
  console.log(rapporto.join('\n'));
}

await principale();
