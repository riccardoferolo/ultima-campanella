import * as THREE from 'three';

function texturaGilet() {
  const tela = document.createElement('canvas');
  tela.width = 64;
  tela.height = 64;
  const ctx = tela.getContext('2d');
  ctx.fillStyle = '#ff7a10';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#d9dde0';
  ctx.fillRect(0, 22, 64, 7);
  ctx.fillRect(0, 40, 64, 7);
  ctx.fillStyle = 'rgba(60,20,10,0.45)';
  for (let i = 0; i < 40; i++) ctx.fillRect(Math.random() * 64, Math.random() * 64, 3, 3);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texturaBerretto() {
  const tela = document.createElement('canvas');
  tela.width = 64;
  tela.height = 32;
  const ctx = tela.getContext('2d');
  ctx.fillStyle = '#1d4f91';
  ctx.fillRect(0, 0, 64, 32);
  ctx.fillStyle = '#f4f4f2';
  ctx.fillRect(0, 0, 64, 12);
  ctx.fillStyle = '#c8161d';
  ctx.font = 'bold 10px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SESIA', 32, 10);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

let gilet = null;
let berretto = null;
const visiera = new THREE.MeshStandardMaterial({ color: 0x1d4f91, roughness: 0.7 });
const catena = new THREE.MeshStandardMaterial({ color: 0x8c939b, metalness: 0.9, roughness: 0.35 });
const pelle = new THREE.MeshStandardMaterial({ color: 0x3a2a22, roughness: 0.85 });

export function decoraCamionista(corpo, { testa, busto }) {
  if (testa) {
    berretto ??= new THREE.MeshStandardMaterial({ map: texturaBerretto(), roughness: 0.8 });
    const calotta = new THREE.Mesh(new THREE.SphereGeometry(13.5, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), berretto);
    calotta.position.set(0, 15, 0);
    calotta.scale.set(1, 0.75, 1.05);
    const tesa = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 1, 16, 1, false, -Math.PI / 2, Math.PI), visiera);
    tesa.position.set(0, 15.5, 9);
    tesa.rotation.x = -0.12;
    tesa.scale.set(1, 1, 1.15);
    testa.add(calotta, tesa);
  }
  if (busto) {
    gilet ??= new THREE.MeshStandardMaterial({ map: texturaGilet(), roughness: 0.75, emissive: 0x3a1800, emissiveIntensity: 0.4 });
    const giacca = new THREE.Mesh(new THREE.CylinderGeometry(22, 24, 40, 14, 1, true), gilet);
    giacca.position.set(0, 0, 1);
    giacca.material.side = THREE.DoubleSide;
    const cintura = new THREE.Mesh(new THREE.TorusGeometry(22, 2.4, 6, 18).rotateX(Math.PI / 2), pelle);
    cintura.position.set(0, -18, 1);
    busto.add(giacca, cintura);
    const anelli = 9;
    for (let i = 0; i < anelli; i++) {
      const a = (i / anelli) * Math.PI * 1.2 - 0.3;
      const anello = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.7, 5, 8), catena);
      anello.position.set(Math.cos(a) * 24, -10 - i * 3, Math.sin(a) * 18 + 4);
      anello.rotation.set(i % 2 ? Math.PI / 2 : 0, a, 0);
      busto.add(anello);
    }
  }
}
