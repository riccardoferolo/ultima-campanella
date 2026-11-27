import { mkdir, writeFile, stat, readdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBBLICA = join(RADICE, 'public', 'stazione');
const CARTELLA_TEXTURE = join(PUBBLICA, 'texture');
const CARTELLA_HDRI = join(PUBBLICA, 'hdri');
const CARTELLA_SCARICATI = join(RADICE, '_lavoro', 'scaricati', 'stazione');
const FILE_MODELLI = join(PUBBLICA, 'modelli.glb');
const API = 'https://api.polyhaven.com';
const AGENTE = 'agogna-asset-script';
const ATTESA_MS = 45000;
const TENTATIVI = 3;
const LATO_MODELLI = 384;
const QUALITA_JPEG = 82;
const SEMPLIFICA = 0.45;
const ERRORE_SEMPLIFICA = 0.006;

const SET = Object.freeze([
  { chiave: 'asfalto', scelte: ['asphalt_02', 'asphalt_04', 'worn_asphalt'], risoluzione: { diff: '2k', nor: '1k', rough: '1k' } },
  { chiave: 'officina', scelte: ['garage_floor', 'concrete_floor_painted', 'concrete_floor_worn_001'], risoluzione: '1k' },
  { chiave: 'piastrelle', scelte: ['large_grey_tiles', 'floor_tiles_06', 'grey_tiles'], risoluzione: '1k' },
  { chiave: 'intonaco', scelte: ['painted_plaster_wall', 'white_plaster_02', 'grey_plaster'], risoluzione: '1k' },
  { chiave: 'lamiera', scelte: ['corrugated_iron_02', 'worn_corrugated_iron', 'corrugated_iron'], risoluzione: '1k' },
  { chiave: 'serranda', scelte: ['painted_metal_shutter', 'rusty_metal_shutter', 'rusted_shutter'], risoluzione: '1k' },
  { chiave: 'cemento', scelte: ['concrete_wall_008', 'concrete_block_wall', 'rough_concrete'], risoluzione: '1k' },
  { chiave: 'erba', scelte: ['sparse_grass', 'withered_grass', 'grass_path_2'], risoluzione: '1k' },
  { chiave: 'metallo', scelte: ['metal_plate', 'blue_metal_plate', 'metal_plate_02'], risoluzione: '1k' },
]);
const MAPPE = Object.freeze(['diff', 'nor', 'rough']);
const NOMI_POLYHAVEN = Object.freeze({ diff: 'Diffuse', nor: 'nor_gl', rough: 'Rough' });
const HDRI = Object.freeze({ nome: 'notte', scelte: ['rogland_moonlit_night', 'moonless_golf', 'satara_night_no_lamps', 'dikhololo_night'], risoluzione: '1k' });
const MODELLI = Object.freeze([
  'metal_jerrycan', 'portable_generator', 'old_tyre', 'concrete_road_barrier', 'Barrel_01', 'street_lamp_01', 'security_light',
  'CashRegister_01', 'WetFloorSign_01', 'tool_cart', 'cardboard_box_01', 'plastic_crate_01', 'metal_toolbox', 'tire_pump',
  'mounted_fluorescent_lights', 'hand_truck',
]);

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

const scegli = (catalogo, scelte) => scelte.find(id => Object.hasOwn(catalogo, id)) ?? null;

async function scaricaTexture(catalogo, rapporto) {
  const usati = {};
  for (const set of SET) {
    const id = scegli(catalogo, set.scelte);
    if (!id) throw new Error(`nessuna texture disponibile per ${set.chiave}`);
    usati[set.chiave] = id;
    const file = await json(`${API}/files/${id}`);
    for (const mappa of MAPPE) {
      const destinazione = join(CARTELLA_TEXTURE, `${set.chiave}_${mappa}.jpg`);
      if (await esiste(destinazione)) {
        rapporto.push(`  ${set.chiave}_${mappa}: già presente`);
        continue;
      }
      const risoluzione = typeof set.risoluzione === 'string' ? set.risoluzione : set.risoluzione[mappa] ?? '1k';
      const voce = file?.[NOMI_POLYHAVEN[mappa]]?.[risoluzione]?.jpg ?? file?.[NOMI_POLYHAVEN[mappa]]?.['1k']?.jpg;
      if (!voce?.url) throw new Error(`${id}: manca la mappa ${mappa}`);
      await writeFile(destinazione, await scarica(voce.url));
      rapporto.push(`  ${set.chiave}_${mappa}: ${id} (${Math.round(voce.size / 1024)} KB)`);
    }
  }
  return usati;
}

async function scaricaHdri(rapporto) {
  const destinazione = join(CARTELLA_HDRI, `${HDRI.nome}.hdr`);
  const catalogo = await json(`${API}/assets?t=hdris`);
  const id = scegli(catalogo, HDRI.scelte);
  if (!id) throw new Error('nessun HDRI notturno disponibile');
  if (await esiste(destinazione)) {
    rapporto.push('  hdri: già presente');
    return id;
  }
  const voce = (await json(`${API}/files/${id}`))?.hdri?.[HDRI.risoluzione]?.hdr;
  if (!voce?.url) throw new Error(`HDRI ${id} senza versione ${HDRI.risoluzione}`);
  await writeFile(destinazione, await scarica(voce.url));
  rapporto.push(`  hdri: ${id} (${Math.round(voce.size / 1024)} KB)`);
  return id;
}

async function scaricaModelli(rapporto) {
  for (const id of MODELLI) {
    const cartella = join(CARTELLA_SCARICATI, id);
    const gltf = join(cartella, `${id}.gltf`);
    if (await esiste(gltf)) continue;
    const voce = (await json(`${API}/files/${id}`))?.gltf?.['1k']?.gltf;
    if (!voce?.url) throw new Error(`modello ${id} senza glTF 1k`);
    await mkdir(join(cartella, 'textures'), { recursive: true });
    for (const [percorso, file] of Object.entries(voce.include ?? {})) await writeFile(join(cartella, percorso), await scarica(file.url));
    await writeFile(gltf, await scarica(voce.url));
    rapporto.push(`  modello ${id}: scaricato`);
  }
}

async function attrezzi() {
  const richiedi = createRequire(join(RADICE, '_lavoro', 'package.json'));
  const carica = async nome => import(pathToFileURL(richiedi.resolve(nome)).href);
  return {
    core: await carica('@gltf-transform/core'),
    funzioni: await carica('@gltf-transform/functions'),
    estensioni: await carica('@gltf-transform/extensions'),
    sharp: (await carica('sharp')).default,
    meshopt: await carica('meshoptimizer'),
  };
}

async function impacchettaModelli(rapporto) {
  let a;
  try {
    a = await attrezzi();
  } catch {
    rapporto.push('  modelli: mancano gli strumenti, esegui prima `cd _lavoro && npm install`');
    return;
  }
  const { NodeIO } = a.core;
  const { mergeDocuments, dedup, prune, textureCompress, unpartition, weld, simplify, quantize } = a.funzioni;
  await a.meshopt.MeshoptSimplifier.ready;
  const io = new NodeIO().registerExtensions(a.estensioni.ALL_EXTENSIONS);
  const documento = new a.core.Document();
  documento.createBuffer();
  const scena = documento.createScene('stazione');
  const scaricati = new Set(await readdir(CARTELLA_SCARICATI));
  for (const id of MODELLI) {
    if (!scaricati.has(id)) throw new Error(`manca il modello scaricato ${id}`);
    const sorgente = await io.read(join(CARTELLA_SCARICATI, id, `${id}.gltf`));
    const radice = sorgente.createNode(id);
    for (const s of sorgente.getRoot().listScenes()) {
      for (const figlio of s.listChildren()) radice.addChild(figlio);
      s.dispose();
    }
    sorgente.createScene(id).addChild(radice);
    const mappa = mergeDocuments(documento, sorgente);
    for (const s of documento.getRoot().listScenes()) {
      if (s === scena) continue;
      for (const figlio of s.listChildren()) scena.addChild(figlio);
      s.dispose();
    }
    if (!mappa) throw new Error(`fusione fallita per ${id}`);
  }
  documento.getRoot().setDefaultScene(scena);
  await documento.transform(
    unpartition(),
    dedup(),
    weld(),
    simplify({ simplifier: a.meshopt.MeshoptSimplifier, ratio: SEMPLIFICA, error: ERRORE_SEMPLIFICA }),
    prune(),
    quantize(),
    textureCompress({ encoder: a.sharp, targetFormat: 'jpeg', resize: [LATO_MODELLI, LATO_MODELLI], quality: QUALITA_JPEG }),
  );
  await io.write(FILE_MODELLI, documento);
  rapporto.push(`  modelli: ${MODELLI.length} in public/stazione/modelli.glb (${Math.round((await stat(FILE_MODELLI)).size / 1024)} KB)`);
}

async function riduciTexture(rapporto) {
  let sharp;
  try {
    sharp = (await attrezzi()).sharp;
  } catch {
    return;
  }
  for (const nome of await readdir(CARTELLA_TEXTURE)) {
    const percorso = join(CARTELLA_TEXTURE, nome);
    const prima = (await stat(percorso)).size;
    const dati = await sharp(percorso).jpeg({ quality: QUALITA_JPEG, mozjpeg: true }).toBuffer();
    if (dati.length < prima) await writeFile(percorso, dati);
  }
  rapporto.push('  texture: ricompresse in JPEG');
}

async function principale() {
  const ricomincia = process.argv.includes('--da-capo');
  if (ricomincia) await rm(PUBBLICA, { recursive: true, force: true });
  await mkdir(CARTELLA_TEXTURE, { recursive: true });
  await mkdir(CARTELLA_HDRI, { recursive: true });
  await mkdir(CARTELLA_SCARICATI, { recursive: true });
  const rapporto = ["Risorse dell'Area di servizio Agogna (Poly Haven, CC0):"];
  const catalogo = await json(`${API}/assets?t=textures`);
  const texture = await scaricaTexture(catalogo, rapporto);
  const hdri = await scaricaHdri(rapporto);
  await scaricaModelli(rapporto);
  await impacchettaModelli(rapporto);
  await riduciTexture(rapporto);
  await writeFile(join(PUBBLICA, 'fonti.json'), `${JSON.stringify({ texture, hdri, modelli: MODELLI, licenza: 'CC0 (polyhaven.com)' }, null, 2)}\n`);
  console.log(rapporto.join('\n'));
}

await principale();
