import * as THREE from 'three';
import { modelloArma } from './armi3d.js';
import { texturaTesto } from './texture.js';

function scatola(gruppo, l, a, p, colore, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(l, a, p), new THREE.MeshLambertMaterial({ color: colore }));
  mesh.position.set(x, y, z);
  gruppo.add(mesh);
  return mesh;
}

function etichetta(testo, colore) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texturaTesto([testo], { larghezza: 128, altezza: 32, colore, font: 'bold 16px monospace' }), depthTest: false, transparent: true,
  }));
  sprite.scale.set(1.4, 0.35, 1);
  sprite.renderOrder = 20;
  return sprite;
}

export function creaCompagno(scena, nome, materialiArmi) {
  const radice = new THREE.Group();
  const corpo = new THREE.Group();
  radice.add(corpo);
  const gambe = [scatola(corpo, 0.17, 0.85, 0.2, 0x3b4a2f, 0.12, 0.43, 0), scatola(corpo, 0.17, 0.85, 0.2, 0x3b4a2f, -0.12, 0.43, 0)];
  scatola(corpo, 0.48, 0.62, 0.28, 0x5b6b45, 0, 1.18, 0);
  scatola(corpo, 0.3, 0.3, 0.3, 0xd2a27c, 0, 1.66, 0);
  scatola(corpo, 0.32, 0.1, 0.32, 0x2f3a24, 0, 1.83, 0);
  const braccia = new THREE.Group();
  braccia.position.set(0, 1.42, 0);
  scatola(braccia, 0.12, 0.12, 0.5, 0x5b6b45, 0.2, 0, 0.22);
  scatola(braccia, 0.12, 0.12, 0.5, 0x5b6b45, -0.12, 0, 0.3);
  corpo.add(braccia);
  const armi = new Map();
  let armaMostrata = null;
  const nomeSprite = etichetta(nome, '#e8f4ff');
  nomeSprite.position.y = 2.15;
  const allarme = etichetta(`▼ ${nome} A TERRA`, '#ff5a4e');
  allarme.position.y = 1.4;
  allarme.visible = false;
  radice.add(nomeSprite, allarme);
  scena.add(radice);
  let passo = 0;

  return {
    aggiorna(g, dt) {
      radice.visible = g.stato !== 'morto';
      radice.position.set(g.x, 0, g.z);
      radice.rotation.y = g.yaw;
      const aTerra = g.stato === 'terra';
      corpo.rotation.x = aTerra ? -Math.PI / 2 + 0.2 : 0;
      corpo.position.y = aTerra ? 0.25 : 0;
      nomeSprite.visible = !aTerra;
      allarme.visible = aTerra;
      braccia.rotation.x = -g.pitch;
      passo += dt * 9;
      gambe[0].rotation.x = Math.sin(passo) * 0.4 * (g.inMovimento ? 1 : 0);
      gambe[1].rotation.x = -gambe[0].rotation.x;
      if (armaMostrata !== g.armaAttiva) {
        armi.forEach(m => { m.visible = false; });
        if (!armi.has(g.armaAttiva)) {
          const { gruppo } = modelloArma(g.armaAttiva, materialiArmi);
          gruppo.rotation.y = Math.PI;
          gruppo.position.set(0.05, -0.02, 0.45);
          braccia.add(gruppo);
          armi.set(g.armaAttiva, gruppo);
        }
        armi.get(g.armaAttiva).visible = true;
        armaMostrata = g.armaAttiva;
      }
    },
    chiudi() {
      scena.remove(radice);
      const condivisi = new Set(Object.values(materialiArmi));
      radice.traverse(o => {
        o.geometry?.dispose();
        if (!o.material || condivisi.has(o.material)) return;
        o.material.map?.dispose();
        o.material.dispose();
      });
    },
  };
}
