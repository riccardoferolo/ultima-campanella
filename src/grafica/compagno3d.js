import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { modelloArma } from './armi3d.js';
import { texturaTesto } from './texture.js';

const URL_PERSONAGGI = Object.freeze(['./modelli/sopravvissuto_matt.glb', './modelli/sopravvissuto_shaun.glb']);
const SCALA = 1.3;
const ARMI_DEL_MODELLO = /^(SMG|Knife|WoodenBat|Pistol|Shotgun)/;
const DISSOLVENZA = 0.2;

function etichetta(testo, colore) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texturaTesto([testo], { larghezza: 128, altezza: 32, colore, font: 'bold 16px monospace' }), depthTest: false, transparent: true,
  }));
  sprite.scale.set(1.4, 0.35, 1);
  sprite.renderOrder = 20;
  return sprite;
}

export async function caricaPersonaggi() {
  return Promise.all(URL_PERSONAGGI.map(async url => {
    const gltf = await new GLTFLoader().loadAsync(url);
    gltf.scene.traverse(o => {
      if (o.isMesh) o.frustumCulled = false;
      for (const m of o.isMesh ? [].concat(o.material) : []) {
        if (!m.map) continue;
        m.map.magFilter = THREE.NearestFilter;
        m.map.needsUpdate = true;
      }
    });
    return { modello: gltf.scene, clip: new Map(gltf.animations.map(a => [a.name, a])) };
  }));
}

export function creaCompagno(scena, nome, materialiArmi, personaggio) {
  const radice = new THREE.Group();
  const corpo = clonaScheletro(personaggio.modello);
  corpo.scale.setScalar(SCALA);
  const nascondere = [];
  let mano = null;
  corpo.traverse(o => {
    if (ARMI_DEL_MODELLO.test(o.name)) nascondere.push(o);
    if (!mano && o.isBone && /^Index1\.R$/.test(o.name)) mano = o;
  });
  nascondere.forEach(o => { o.visible = false; });
  radice.add(corpo);
  const supporto = new THREE.Group();
  radice.add(supporto);
  const mixer = new THREE.AnimationMixer(corpo);
  const azioni = new Map();
  for (const [logico, nomeClip] of Object.entries({ fermo: 'Idle_Gun', cammina: 'Walk_Gun', corre: 'Run_Gun', terra: 'Death' })) {
    const clip = personaggio.clip.get(nomeClip);
    if (!clip) continue;
    const azione = mixer.clipAction(clip);
    if (logico === 'terra') {
      azione.setLoop(THREE.LoopOnce, 1);
      azione.clampWhenFinished = true;
    }
    azioni.set(logico, azione);
  }
  let attuale = null;
  const armi = new Map();
  let armaMostrata = null;
  const nomeSprite = etichetta(nome, '#e8f4ff');
  nomeSprite.position.y = 2.3;
  const allarme = etichetta(`▼ ${nome} A TERRA`, '#ff5a4e');
  allarme.position.y = 1.2;
  allarme.visible = false;
  radice.add(nomeSprite, allarme);
  scena.add(radice);
  const posizioneMano = new THREE.Vector3();

  function suona(nomeAzione) {
    if (attuale === nomeAzione || !azioni.has(nomeAzione)) return;
    const nuova = azioni.get(nomeAzione);
    nuova.reset().play();
    azioni.get(attuale)?.crossFadeTo(nuova, DISSOLVENZA, false);
    attuale = nomeAzione;
  }

  return {
    aggiorna(g, dt) {
      radice.visible = g.stato !== 'morto';
      radice.position.set(g.x, 0, g.z);
      radice.rotation.y = g.yaw;
      const aTerra = g.stato === 'terra';
      suona(aTerra ? 'terra' : g.inMovimento ? (g.corsa ? 'corre' : 'cammina') : 'fermo');
      mixer.update(dt);
      nomeSprite.visible = !aTerra;
      allarme.visible = aTerra;
      supporto.visible = !aTerra;
      if (armaMostrata !== g.armaAttiva) {
        armi.forEach(m => { m.visible = false; });
        if (!armi.has(g.armaAttiva)) {
          const { gruppo } = modelloArma(g.armaAttiva, materialiArmi);
          gruppo.rotation.y = Math.PI;
          supporto.add(gruppo);
          armi.set(g.armaAttiva, gruppo);
        }
        armi.get(g.armaAttiva).visible = true;
        armaMostrata = g.armaAttiva;
      }
      if (mano) {
        radice.updateMatrixWorld(true);
        mano.getWorldPosition(posizioneMano);
        radice.worldToLocal(posizioneMano);
        supporto.position.copy(posizioneMano);
      } else supporto.position.set(0.15, 1.3, 0.35);
      supporto.rotation.x = -g.pitch;
    },
    chiudi() {
      scena.remove(radice);
      mixer.stopAllAction();
      mixer.uncacheRoot(corpo);
      corpo.traverse(o => o.skeleton?.dispose());
      nomeSprite.material.map.dispose();
      nomeSprite.material.dispose();
      allarme.material.map.dispose();
      allarme.material.dispose();
    },
  };
}
