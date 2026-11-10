import * as THREE from 'three';
import { quota } from '../../mappa.js';

const BOZZOLI_MASSIMI = 32;
const SCOPPI = 6;
const DURATA_SCOPPIO = 1.6;
const NASCOSTA = new THREE.Matrix4().makeScale(0, 0, 0);
const ALTEZZE = Object.freeze({ ragno: 0.75, bruto: 2.3 });

function texturaTela() {
  const tela = document.createElement('canvas');
  tela.width = tela.height = 256;
  const c = tela.getContext('2d');
  const centro = 128;
  c.strokeStyle = 'rgba(245, 245, 235, 0.95)';
  c.lineWidth = 1.6;
  const raggi = 14;
  for (let i = 0; i < raggi; i++) {
    const a = (i / raggi) * Math.PI * 2 + Math.sin(i * 3.1) * 0.08;
    c.beginPath();
    c.moveTo(centro, centro);
    c.lineTo(centro + Math.cos(a) * 128, centro + Math.sin(a) * 128);
    c.stroke();
  }
  c.lineWidth = 1.1;
  for (let r = 10; r < 124; r += 7 + r * 0.04) {
    c.beginPath();
    for (let i = 0; i <= raggi; i++) {
      const a = (i / raggi) * Math.PI * 2 + Math.sin(i * 3.1) * 0.08;
      const rr = r * (0.94 + 0.06 * Math.sin(i * 1.7 + r));
      const x = centro + Math.cos(a) * rr;
      const y = centro + Math.sin(a) * rr;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.stroke();
  }
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function creaRagnatele(scena) {
  const mappa = texturaTela();
  const materiale = new THREE.MeshStandardMaterial({
    map: mappa, alphaMap: mappa, transparent: true, depthWrite: false, side: THREE.DoubleSide, color: 0xf4f1e6, emissive: 0x3a3a30, roughness: 0.9,
  });
  const profilo = [[0.05, 0], [0.38, 0.12], [0.5, 0.55], [0.46, 1.1], [0.34, 1.55], [0.12, 1.85], [0.02, 1.9]].map(([x, y]) => new THREE.Vector2(x, y));
  const forma = new THREE.LatheGeometry(profilo, 14);
  const bozzoli = new THREE.InstancedMesh(forma, materiale, BOZZOLI_MASSIMI);
  bozzoli.frustumCulled = false;
  bozzoli.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  for (let i = 0; i < BOZZOLI_MASSIMI; i++) bozzoli.setMatrixAt(i, NASCOSTA);
  scena.add(bozzoli);

  const disco = new THREE.CircleGeometry(1, 28).rotateX(-Math.PI / 2);
  const scoppi = Array.from({ length: SCOPPI }, () => {
    const m = new THREE.Mesh(disco, materiale.clone());
    m.visible = false;
    scena.add(m);
    return { mesh: m, vita: 0, raggio: 1 };
  });
  let prossimo = 0;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const asse = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const scala = new THREE.Vector3();

  return {
    scoppio(x, z, raggio) {
      const s = scoppi[prossimo];
      prossimo = (prossimo + 1) % SCOPPI;
      s.vita = DURATA_SCOPPIO;
      s.raggio = raggio;
      s.mesh.position.set(x, quota(x, z) + 0.04, z);
      s.mesh.rotation.y = Math.random() * Math.PI;
      s.mesh.visible = true;
    },
    aggiorna(vista, dt) {
      const prese = vista.ragnatele;
      let n = 0;
      if (prese?.size) {
        const tempo = performance.now() / 1000;
        for (const z of vista.zombie) {
          if (n >= BOZZOLI_MASSIMI) break;
          if (!prese.has(z.id) || z.stato === 'morto') continue;
          const alto = ALTEZZE[z.tipo] ?? 1;
          q.setFromAxisAngle(asse, z.id * 1.3 + tempo * 0.2);
          bozzoli.setMatrixAt(n++, m.compose(pos.set(z.x, quota(z.x, z.z), z.z), q, scala.set(alto * 1.05, alto, alto * 1.05)));
        }
      }
      for (let i = n; i < (bozzoli.userData.usati ?? BOZZOLI_MASSIMI); i++) bozzoli.setMatrixAt(i, NASCOSTA);
      bozzoli.userData.usati = n;
      bozzoli.instanceMatrix.needsUpdate = true;
      for (const s of scoppi) {
        if (!s.mesh.visible) continue;
        s.vita -= dt;
        if (s.vita <= 0) {
          s.mesh.visible = false;
          continue;
        }
        const f = 1 - s.vita / DURATA_SCOPPIO;
        s.mesh.scale.setScalar(s.raggio * Math.min(1, f * 5));
        s.mesh.material.opacity = Math.min(1, s.vita / 0.6);
      }
    },
    svuota() {
      for (let i = 0; i < BOZZOLI_MASSIMI; i++) bozzoli.setMatrixAt(i, NASCOSTA);
      bozzoli.instanceMatrix.needsUpdate = true;
      for (const s of scoppi) s.mesh.visible = false;
    },
  };
}
