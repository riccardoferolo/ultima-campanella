import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { TESTA } from '../colpi.js';

const SCALA = 0.01;
const DISSOLVENZA = 0.25;
const AFFONDA_DOPO = 2.6;
const VARIANTI = Object.freeze([
  { tinta: 0xffffff, scala: 1 },
  { tinta: 0xa9c79a, scala: 0.95 },
  { tinta: 0xd9c3c3, scala: 1.06 },
  { tinta: 0x8a7f78, scala: 1.02 },
]);
const VELOCITA_ANIMAZIONE = Object.freeze({ cammina: 1, cammina2: 0.9, corre: 1.05, attacco: 1.6, attacco2: 1.7, muore: 1.2, fermo: 1, urla: 1.3 });

export async function caricaZombi(url) {
  const gltf = await new GLTFLoader().loadAsync(url);
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    for (const m of [].concat(o.material)) {
      if (!m.map) continue;
      m.map.magFilter = THREE.NearestFilter;
      m.map.minFilter = THREE.NearestFilter;
      m.map.generateMipmaps = false;
      m.map.needsUpdate = true;
    }
  });
  const materialiVariante = VARIANTI.map(v => {
    const mappa = new Map();
    gltf.scene.traverse(o => {
      if (!o.isMesh) return;
      for (const m of [].concat(o.material)) {
        if (mappa.has(m)) continue;
        const copia = m.clone();
        copia.color = new THREE.Color(v.tinta);
        mappa.set(m, copia);
      }
    });
    return mappa;
  });
  return { modello: gltf.scene, clip: new Map(gltf.animations.map(a => [a.name, a])), materialiVariante };
}

function animazionePer(z, dati, siMuove) {
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
    const radice = new THREE.Group();
    const corpo = clonaScheletro(risorse.modello);
    const variante = VARIANTI[z.variante % VARIANTI.length];
    corpo.scale.setScalar(SCALA * variante.scala);
    corpo.rotation.y = 0;
    const materiali = risorse.materialiVariante[z.variante % VARIANTI.length];
    corpo.traverse(o => {
      if (!o.isMesh) return;
      o.material = Array.isArray(o.material) ? o.material.map(m => materiali.get(m) ?? m) : materiali.get(o.material) ?? o.material;
    });
    radice.add(corpo);
    scena.add(radice);
    let testa = null;
    corpo.traverse(o => { if (!testa && o.isBone && /Head$/.test(o.name)) testa = o; });
    const mixer = new THREE.AnimationMixer(corpo);
    const azioni = new Map();
    for (const [nome, clip] of risorse.clip) {
      const azione = mixer.clipAction(clip);
      azione.timeScale = VELOCITA_ANIMAZIONE[nome] ?? 1;
      if (nome === 'muore') {
        azione.setLoop(THREE.LoopOnce, 1);
        azione.clampWhenFinished = true;
      }
      azioni.set(nome, azione);
    }
    const voce = { radice, corpo, testa, mixer, azioni, attuale: null, ultimaPosizione: new THREE.Vector2(z.x, z.z), tempoMorto: 0, fase: Math.random() * 3 };
    zombi.set(z.id, voce);
    return voce;
  }

  function suona(voce, nome) {
    if (voce.attuale === nome) return;
    const nuova = voce.azioni.get(nome);
    if (!nuova) return;
    const vecchia = voce.azioni.get(voce.attuale);
    nuova.reset();
    if (nome !== 'muore') nuova.time = voce.fase;
    nuova.play();
    if (vecchia) vecchia.crossFadeTo(nuova, DISSOLVENZA, false);
    voce.attuale = nome;
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
        const siMuove = spostamento > 0.2 * dt;
        suona(voce, animazionePer(z, voce, siMuove));
        voce.radice.position.set(z.x, 0, z.z);
        voce.radice.rotation.y = z.yaw;
        if (z.stato === 'morto') {
          voce.tempoMorto += dt;
          if (voce.tempoMorto > AFFONDA_DOPO) voce.radice.position.y = -(voce.tempoMorto - AFFONDA_DOPO) * 0.6;
        }
        voce.mixer.update(dt);
      }
      for (const id of [...zombi.keys()]) if (!vivi.has(id)) rimuovi(id);
    },
    bersagli(vista) {
      const punto = new THREE.Vector3();
      return vista.zombie.filter(z => z.stato !== 'morto').map(z => {
        const voce = zombi.get(z.id);
        if (voce?.testa) {
          voce.testa.getWorldPosition(punto);
          return { id: z.id, x: z.x, z: z.z, testa: { x: punto.x, y: punto.y + 0.06, z: punto.z } };
        }
        return { id: z.id, x: z.x, z: z.z, testa: { x: z.x, y: TESTA.altezza, z: z.z } };
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
