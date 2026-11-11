import * as THREE from 'three';

function texturaBiscione() {
  const tela = document.createElement('canvas');
  tela.width = 96;
  tela.height = 128;
  const ctx = tela.getContext('2d');
  ctx.fillStyle = '#d8dade';
  ctx.beginPath();
  ctx.moveTo(4, 4);
  ctx.lineTo(92, 4);
  ctx.lineTo(92, 70);
  ctx.quadraticCurveTo(92, 118, 48, 124);
  ctx.quadraticCurveTo(4, 118, 4, 70);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#1d3f8f';
  ctx.lineWidth = 13;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(48, 110);
  ctx.bezierCurveTo(14, 96, 82, 74, 48, 60);
  ctx.bezierCurveTo(16, 48, 74, 30, 52, 22);
  ctx.stroke();
  ctx.fillStyle = '#b8241b';
  ctx.beginPath();
  ctx.arc(60, 20, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#c9a24a';
  ctx.fillRect(38, 6, 22, 6);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const acciaio = new THREE.MeshStandardMaterial({ color: 0x8c939b, metalness: 0.85, roughness: 0.32 });
const ottone = new THREE.MeshStandardMaterial({ color: 0xb08a3e, metalness: 0.8, roughness: 0.4 });
const mantello = new THREE.MeshStandardMaterial({ color: 0x7a1418, roughness: 0.95, side: THREE.DoubleSide });
const pennacchio = new THREE.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.9 });
let stemma = null;

export function decoraCapitano(corpo, { testa, busto }) {
  if (testa) {
    const calotta = new THREE.Mesh(new THREE.SphereGeometry(13, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), acciaio);
    calotta.position.set(0, 9, 1);
    const tesa = new THREE.Mesh(new THREE.CylinderGeometry(19, 19, 1.2, 18), acciaio);
    tesa.position.set(0, 7, 1);
    const cresta = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 20), ottone);
    cresta.position.set(0, 21, 1);
    const piuma = new THREE.Mesh(new THREE.ConeGeometry(4, 22, 7), pennacchio);
    piuma.position.set(0, 26, -9);
    piuma.rotation.x = -0.9;
    testa.add(calotta, tesa, cresta, piuma);
  }
  if (busto) {
    stemma ??= new THREE.MeshStandardMaterial({ map: texturaBiscione(), roughness: 0.6, metalness: 0.2 });
    const petto = new THREE.Mesh(new THREE.BoxGeometry(36, 32, 8), acciaio);
    petto.position.set(0, 4, 13);
    const insegna = new THREE.Mesh(new THREE.PlaneGeometry(16, 21), stemma);
    insegna.position.set(0, 6, 17.2);
    const cinta = new THREE.Mesh(new THREE.BoxGeometry(38, 4, 30), ottone);
    cinta.position.set(0, -12, 0);
    const telo = new THREE.Mesh(new THREE.PlaneGeometry(40, 70, 1, 4), mantello);
    telo.position.set(0, -20, -15);
    telo.rotation.x = 0.12;
    busto.add(petto, insegna, cinta, telo);
    for (const s of [-1, 1]) {
      const spalla = new THREE.Mesh(new THREE.SphereGeometry(11, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), acciaio);
      spalla.position.set(s * 21, 14, 0);
      spalla.rotation.z = -s * 0.5;
      busto.add(spalla);
    }
  }
}
