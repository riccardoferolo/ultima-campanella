import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { caricaTextureReali } from '../texture.js';

const CARTELLA = './stazione/';
export const TEXTURE_STAZIONE = Object.freeze(['asfalto', 'officina', 'piastrelle', 'intonaco', 'lamiera', 'serranda', 'cemento', 'erba', 'metallo']);

async function caricaAmbiente(renderer) {
  try {
    const hdr = await new RGBELoader().setDataType(THREE.HalfFloatType).loadAsync(`${CARTELLA}hdri/notte.hdr`);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const ambiente = pmrem.fromEquirectangular(hdr).texture;
    hdr.dispose();
    pmrem.dispose();
    return ambiente;
  } catch {
    return null;
  }
}

async function caricaModelli() {
  try {
    const gltf = await new GLTFLoader().loadAsync(`${CARTELLA}modelli.glb`);
    const modelli = new Map();
    for (const figlio of [...gltf.scene.children]) {
      figlio.traverse(o => {
        if (!o.isMesh) return;
        o.castShadow = false;
        o.receiveShadow = false;
      });
      modelli.set(figlio.name, figlio);
    }
    return modelli;
  } catch {
    return new Map();
  }
}

export async function caricaRisorseStazione(renderer, { piene = true } = {}) {
  const [texture, ambiente, modelli] = await Promise.all([
    caricaTextureReali(TEXTURE_STAZIONE, { piene, base: `${CARTELLA}texture/` }),
    caricaAmbiente(renderer),
    caricaModelli(),
  ]);
  const anisotropia = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  for (const set of Object.values(texture)) for (const t of Object.values(set)) if (t) t.anisotropy = anisotropia;
  return { ...texture, ambiente, modelli };
}
