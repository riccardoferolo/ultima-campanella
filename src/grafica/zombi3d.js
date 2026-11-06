import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { TESTA } from '../colpi.js';

const DISSOLVENZA = 0.25;
const AFFONDA_DOPO = 2.6;
const VARIANTI = Object.freeze([
  { tinta: 0xffffff, scala: 1 },
  { tinta: 0xc7d1bf, scala: 0.95 },
  { tinta: 0xe0cfcf, scala: 1.06 },
  { tinta: 0xa39a94, scala: 1.02 },
]);
const MODELLI = Object.freeze({
  normale: { url: './modelli/zombie.glb', scala: 0.01, varianti: true, clip: { cammina: 'cammina', cammina2: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' }, velocita: { cammina: 1, cammina2: 0.9, corre: 1.05, attacco: 1.6, attacco2: 1.7, muore: 1.2, fermo: 1 } },
  magro: { url: './modelli/zombi_magro.glb', scala: 0.25, clip: { cammina: 'walk', cammina2: 'walk2', corre: 'run', attacco: 'attack2', attacco2: 'attack1_r', muore: 'dead1', fermo: 'idle' }, velocita: {}, riserva: { tinta: 0x9c7266, scala: 0.94 } },
});

function sistemaTexture(radice) {
  radice.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    for (const m of [].concat(o.material)) {
      if (!m.map) continue;
      m.map.anisotropy = 4;
      m.map.needsUpdate = true;
    }
  });
}

function materialiTinti(radice, tinte) {
  return tinte.map(tinta => {
    const mappa = new Map();
    radice.traverse(o => {
      if (!o.isMesh) return;
      for (const m of [].concat(o.material)) {
        if (mappa.has(m)) continue;
        const copia = m.clone();
        copia.color = new THREE.Color(tinta);
        mappa.set(m, copia);
      }
    });
    return mappa;
  });
}

export async function caricaZombi() {
  const file = new Map();
  const carica = url => {
    if (!file.has(url)) file.set(url, new GLTFLoader().loadAsync(url));
    return file.get(url);
  };
  const risorse = new Map();
  await Promise.all(Object.entries(MODELLI).map(async ([tipo, voluti]) => {
    let dati = voluti;
    let gltf;
    try {
      gltf = await carica(voluti.url);
    } catch (errore) {
      if (!voluti.riserva) throw errore;
      gltf = await carica(MODELLI.normale.url);
      dati = { ...MODELLI.normale, varianti: false, tinta: voluti.riserva.tinta, scala: MODELLI.normale.scala * voluti.riserva.scala };
    }
    sistemaTexture(gltf.scene);
    const tinte = dati.varianti ? VARIANTI.map(v => v.tinta) : [dati.tinta ?? null];
    risorse.set(tipo, {
      dati,
      modello: gltf.scene,
      clip: new Map(gltf.animations.map(a => [a.name, a])),
      materialiVariante: tinte[0] === null ? null : materialiTinti(gltf.scene, tinte),
    });
  }));
  return risorse;
}

function logica(z, siMuove) {
  if (z.stato === 'morto') return 'muore';
  if (z.stato === 'assi') return 'attacco';
  if (z.stato === 'attacco') return 'attacco2';
  if (z.stato === 'dentro' && !siMuove) return 'fermo';
  if (z.corre) return 'corre';
  return z.variante % 2 ? 'cammina2' : 'cammina';
}

export function creaGestoreZombi(scena, risorse) {
  const zombi = new Map();

  function crea(z) {
    const risorsa = risorse.get(z.tipo) ?? risorse.get('normale');
    const { dati } = risorsa;
    const radice = new THREE.Group();
    const corpo = clonaScheletro(risorsa.modello);
    const variante = dati.varianti ? VARIANTI[z.variante % VARIANTI.length] : { scala: 1 };
    corpo.scale.setScalar(dati.scala * variante.scala);
    if (risorsa.materialiVariante) {
      const materiali = risorsa.materialiVariante[dati.varianti ? z.variante % VARIANTI.length : 0];
      corpo.traverse(o => {
        if (!o.isMesh) return;
        o.material = Array.isArray(o.material) ? o.material.map(m => materiali.get(m) ?? m) : materiali.get(o.material) ?? o.material;
      });
    }
    corpo.traverse(o => {
      if (!o.isSkinnedMesh) return;
      o.frustumCulled = true;
      o.computeBoundingSphere();
      o.boundingSphere.radius *= 1.8;
    });
    radice.add(corpo);
    scena.add(radice);
    let testa = null;
    corpo.traverse(o => { if (!testa && o.isBone && /head$/i.test(o.name)) testa = o; });
    const mixer = new THREE.AnimationMixer(corpo);
    const azioni = new Map();
    for (const [logico, nome] of Object.entries(dati.clip)) {
      const clip = risorsa.clip.get(nome);
      if (!clip) continue;
      const azione = mixer.clipAction(clip);
      azione.timeScale = dati.velocita[logico] ?? 1;
      if (logico === 'muore') {
        azione.setLoop(THREE.LoopOnce, 1);
        azione.clampWhenFinished = true;
      }
      azioni.set(logico, azione);
    }
    const voce = { radice, corpo, testa, mixer, azioni, dati, attuale: null, ultimaPosizione: new THREE.Vector2(z.x, z.z), tempoMorto: 0, fase: Math.random() * 3 };
    zombi.set(z.id, voce);
    return voce;
  }

  function suona(voce, nome) {
    const scelto = voce.azioni.has(nome) ? nome : nome === 'cammina2' ? 'cammina' : nome === 'attacco2' ? 'attacco' : nome;
    if (voce.attuale === scelto) return;
    const nuova = voce.azioni.get(scelto);
    if (!nuova) return;
    const vecchia = voce.azioni.get(voce.attuale);
    nuova.reset();
    if (scelto !== 'muore') nuova.time = voce.fase;
    nuova.play();
    if (vecchia) vecchia.crossFadeTo(nuova, DISSOLVENZA, false);
    voce.attuale = scelto;
  }

  function rimuovi(id) {
    const voce = zombi.get(id);
    if (!voce) return;
    scena.remove(voce.radice);
    voce.mixer.stopAllAction();
    voce.mixer.uncacheRoot(voce.corpo);
    voce.corpo.traverse(o => o.skeleton?.dispose());
    zombi.delete(id);
  }

  return {
    aggiorna(vista, dt) {
      const vivi = new Set();
      for (const z of vista.zombie) {
        vivi.add(z.id);
        const voce = zombi.get(z.id) ?? crea(z);
        const spostamento = Math.hypot(z.x - voce.ultimaPosizione.x, z.z - voce.ultimaPosizione.y);
        voce.ultimaPosizione.set(z.x, z.z);
        suona(voce, logica(z, spostamento > 0.2 * dt));
        voce.radice.position.set(z.x, 0, z.z);
        voce.radice.rotation.y = z.yaw;
        if (z.stato === 'morto') {
          voce.tempoMorto += dt;
          if (voce.tempoMorto > AFFONDA_DOPO) voce.radice.position.y = -(voce.tempoMorto - AFFONDA_DOPO) * 0.6;
        } else voce.tempoMorto = 0;
        voce.mixer.update(dt);
      }
      for (const id of [...zombi.keys()]) if (!vivi.has(id)) rimuovi(id);
    },
    bersagli(vista) {
      const punto = new THREE.Vector3();
      return vista.zombie.filter(z => z.stato !== 'morto').map(z => {
        const voce = zombi.get(z.id);
        const dati = MODELLI[z.tipo] ?? MODELLI.normale;
        const forma = { id: z.id, x: z.x, z: z.z, alto: dati.alto, raggio: dati.raggio };
        if (voce?.testa) {
          voce.testa.getWorldPosition(punto);
          return { ...forma, testa: { x: punto.x, y: punto.y + 0.06, z: punto.z } };
        }
        return { ...forma, testa: { x: z.x, y: dati.testa ?? TESTA.altezza, z: z.z } };
      });
    },
    posizioneTesta(id) {
      const voce = zombi.get(id);
      if (!voce?.testa) return null;
      return voce.testa.getWorldPosition(new THREE.Vector3());
    },
    svuota() {
      for (const id of [...zombi.keys()]) rimuovi(id);
    },
  };
}
