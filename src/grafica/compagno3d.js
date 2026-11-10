import * as THREE from 'three';
import { quota } from '../mappa.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { modelloArma } from './armi3d.js';
import { texturaTesto } from './texture.js';

const URL_PERSONAGGI = Object.freeze(['./modelli/soldato.glb']);
const DISSOLVENZA = 0.2;
const SALTO_COMPAGNO = 3;
const SEGUI_COMPAGNO = 14;
const MUOVE_SOPRA = 0.8;
const FERMO_SOTTO = 0.35;
const CORSA_SOPRA = 5.2;

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
    });
    return { modello: gltf.scene, clip: new Map(gltf.animations.map(a => [a.name, a])) };
  }));
}

export const TINTE_ASPETTO = Object.freeze([[0x9cc28a, 0x000000], [0xffffff, 0x000000], [0x6a7590, 0x000000], [0xffffff, 0x2a2a2a], [0xff8a6a, 0x1a0500], [0x8a9a5a, 0x000000]]);

export function creaCompagno(scena, nome, materialiArmi, personaggio) {
  const radice = new THREE.Group();
  const postura = new THREE.Group();
  const corpo = clonaScheletro(personaggio.modello);
  corpo.rotation.y = Math.PI;
  const divise = [];
  corpo.traverse(o => {
    if (!o.isMesh) return;
    o.material = [].concat(o.material).map(m => {
      const copia = m.clone();
      divise.push(copia);
      return copia;
    });
    if (o.material.length === 1) o.material = o.material[0];
  });
  let aspetto = -1;
  let mano = null;
  corpo.traverse(o => {
    if (!mano && o.isBone && /RightHand$/.test(o.name)) mano = o;
  });
  postura.add(corpo);
  radice.add(postura);
  const supporto = new THREE.Group();
  radice.add(supporto);
  const mixer = new THREE.AnimationMixer(corpo);
  const azioni = new Map();
  for (const [logico, nomeClip] of Object.entries({ fermo: 'Idle', cammina: 'Walk', corre: 'Run' })) {
    const clip = personaggio.clip.get(nomeClip);
    if (!clip) continue;
    azioni.set(logico, mixer.clipAction(clip));
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
  const visto = { x: 0, z: 0, yaw: 0, velocita: 0, pronto: false, muove: false };

  function suona(nomeAzione) {
    if (attuale === nomeAzione || !azioni.has(nomeAzione)) return;
    const nuova = azioni.get(nomeAzione);
    nuova.reset().play();
    azioni.get(attuale)?.crossFadeTo(nuova, DISSOLVENZA, false);
    attuale = nomeAzione;
  }

  return {
    aggiorna(g, dt) {
      if (g.aspetto !== aspetto) {
        aspetto = g.aspetto ?? 0;
        const [tinta, luce] = TINTE_ASPETTO[aspetto] ?? TINTE_ASPETTO[0];
        for (const m of divise) {
          m.color.setHex(tinta);
          if (m.emissive) m.emissive.setHex(luce);
        }
      }
      radice.visible = g.stato !== 'morto';
      const salto = !visto.pronto || Math.hypot(g.x - visto.x, g.z - visto.z) > SALTO_COMPAGNO;
      const segui = salto ? 1 : 1 - Math.exp(-dt * SEGUI_COMPAGNO);
      const prima = { x: visto.x, z: visto.z };
      visto.x += (g.x - visto.x) * segui;
      visto.z += (g.z - visto.z) * segui;
      visto.yaw += Math.atan2(Math.sin(g.yaw - visto.yaw), Math.cos(g.yaw - visto.yaw)) * segui;
      visto.pronto = true;
      const passo = salto || dt <= 0 ? 0 : Math.hypot(visto.x - prima.x, visto.z - prima.z) / dt;
      visto.velocita += (passo - visto.velocita) * Math.min(1, dt * 8);
      visto.muove = visto.muove ? visto.velocita > FERMO_SOTTO : visto.velocita > MUOVE_SOPRA;
      radice.position.set(visto.x, quota(visto.x, visto.z), visto.z);
      radice.rotation.y = visto.yaw;
      const aTerra = g.stato === 'terra';
      suona(aTerra ? 'fermo' : visto.muove ? (g.corsa || visto.velocita > CORSA_SOPRA ? 'corre' : 'cammina') : 'fermo');
      mixer.update(dt);
      postura.rotation.x = aTerra ? -Math.PI / 2 : 0;
      postura.position.y = aTerra ? 0.25 : 0;
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
