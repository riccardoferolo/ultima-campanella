import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const BASE = '/_lavoro/scaricati/estratti/';
const LATO_TEXTURE = 256;
const ANIMAZIONI = {
  cammina: 'Zombie Walk.fbx',
  cammina2: 'Walking.fbx',
  corre: 'Zombie Running.fbx',
  attacco: 'Zombie Attack.fbx',
  attacco2: 'Zombie Attack2.fbx',
  attacco3: 'Zombie Attack3.fbx',
  muore: 'Zombie Dying.fbx',
  fermo: 'Zombie Idle.fbx',
  colpito: 'Zombie Reaction Hit.fbx',
  urla: 'Zombie Scream.fbx',
};
const TEXTURE = {
  corpo: 'InfectedCityMan_City_Infected_Man_Body1_BaseColor.png',
  vestiti: 'InfectedCityMan_City_Man_Infected_Outfit1_BaseColor.png',
};

const loader = new FBXLoader();
const carica = nome => loader.loadAsync(BASE + encodeURIComponent(nome));

async function textureRidotta(nome) {
  const img = new Image();
  img.src = BASE + encodeURIComponent(nome);
  await img.decode();
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = LATO_TEXTURE;
  canvas.getContext('2d').drawImage(img, 0, 0, LATO_TEXTURE, LATO_TEXTURE);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  return texture;
}

function senzaSpostamento(clip, tieniVerticale) {
  for (const traccia of clip.tracks) {
    if (!traccia.name.endsWith('Hips.position')) continue;
    const v = traccia.values;
    const x0 = v[0];
    const z0 = v[2];
    for (let i = 0; i < v.length; i += 3) {
      v[i] = x0;
      v[i + 2] = z0;
      if (!tieniVerticale) v[i + 1] = v[1];
    }
  }
  return clip;
}

window.converti = async () => {
  const modello = await carica('InfectedCityMan.fbx');
  const info = { mesh: [], ossa: 0, animazioniModello: modello.animations.length };
  const corpo = await textureRidotta(TEXTURE.corpo);
  const vestiti = await textureRidotta(TEXTURE.vestiti);
  modello.traverse(o => {
    if (o.isBone) info.ossa += 1;
    if (!o.isMesh) return;
    const materiali = [].concat(o.material);
    info.mesh.push({ nome: o.name, materiali: materiali.map(m => m.name), skinned: !!o.isSkinnedMesh, vertici: o.geometry.attributes.position.count });
    const nuovi = materiali.map(m => new THREE.MeshLambertMaterial({ name: m.name, map: /outfit/i.test(m.name) ? vestiti : corpo }));
    o.material = Array.isArray(o.material) ? nuovi : nuovi[0];
  });
  const scatola = new THREE.Box3().setFromObject(modello);
  info.altezza = scatola.max.y - scatola.min.y;
  info.scalaOriginale = modello.scale.toArray();

  const ossa = new Set();
  modello.traverse(o => { if (o.isBone) ossa.add(o.name); });
  const clip = [];
  for (const [nome, file] of Object.entries(ANIMAZIONI)) {
    const f = await carica(file);
    const c = f.animations[0];
    c.name = nome;
    for (const traccia of c.tracks) traccia.name = traccia.name.replace(/^mixamorig/, 'CityDeadOutfit');
    const prima = c.tracks.length;
    c.tracks = c.tracks.filter(t => ossa.has(t.name.split('.')[0]) && !t.name.startsWith('root.'));
    info[`tracce_${nome}`] = `${c.tracks.length}/${prima}`;
    senzaSpostamento(c, nome === 'muore' || nome === 'colpito');
    clip.push(c);
    info[`durata_${nome}`] = Number(c.duration.toFixed(2));
  }
  const glb = await new GLTFExporter().parseAsync(modello, { binary: true, animations: clip });
  const byte = new Uint8Array(glb);
  let binario = '';
  for (let i = 0; i < byte.length; i += 0x8000) binario += String.fromCharCode(...byte.subarray(i, i + 0x8000));
  return { info, base64: btoa(binario) };
};
window.pronto = true;
