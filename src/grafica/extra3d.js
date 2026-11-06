import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARMI, BONUS } from '../regole.js';
import { ARREDI, RASTRELLIERA, CARTELLO_PRONTI, FRAMMENTI, ACQUISTI, SALA, ALTEZZA_SOFFITTO } from '../mappa.js';
import { modelloArma } from './armi3d.js';
import { texturaTesto } from './texture.js';

const URL_OGGETTI = './modelli/oggetti.glb';
const ALTEZZA_ARMA = 1.42;
const ALTEZZA_TARGHETTA = 1.05;
const SFONDO_TARGHETTA = '#1a1510';

export async function caricaOggetti() {
  const gltf = await new GLTFLoader().loadAsync(URL_OGGETTI);
  const oggetti = new Map();
  for (const figlio of [...gltf.scene.children]) {
    figlio.traverse(o => {
      if (!o.isMesh) return;
      for (const m of [].concat(o.material)) {
        if (m.map) {
          m.map.magFilter = THREE.NearestFilter;
          m.map.needsUpdate = true;
        }
        m.flatShading = true;
      }
    });
    oggetti.set(figlio.name, figlio);
  }
  return oggetti;
}

export function costruisciArredi(scena, oggetti) {
  for (const a of ARREDI) {
    const modello = oggetti.get(a.modello);
    if (!modello) continue;
    const copia = modello.clone();
    copia.position.set(a.x, a.modello.startsWith('Blood') ? 0.005 : 0, a.z);
    copia.rotation.y = a.rot ?? 0;
    if (a.scala) copia.scale.setScalar(a.scala);
    scena.add(copia);
  }
}

function etichettaPiana(testo, larghezza, altezza, opzioni) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza, altezza), new THREE.MeshBasicMaterial({ map: texturaTesto(testo, opzioni), transparent: true }));
  return mesh;
}

export function costruisciSala(scena, texture, materialiArmi) {
  const pannello = new THREE.MeshLambertMaterial({ map: texture.pannello });
  texture.pannello.wrapS = THREE.RepeatWrapping;
  for (const z of [SALA.z0 + 0.16, SALA.z1 - 0.16]) {
    const tavola = new THREE.Mesh(new THREE.PlaneGeometry(SALA.x1 - SALA.x0 - 1.2, 1.25), pannello);
    tavola.position.set((SALA.x0 + SALA.x1) / 2, 1.3, z + Math.sign(-z) * 0.005);
    tavola.rotation.y = z < 0 ? 0 : Math.PI;
    scena.add(tavola);
  }
  for (const posto of RASTRELLIERA) {
    const verso = Math.atan2(posto.verso.x, posto.verso.z);
    const supporto = new THREE.Group();
    supporto.position.set(posto.x, 0, posto.z);
    supporto.rotation.y = verso;
    const { gruppo, lunghezza } = modelloArma(posto.arma, materialiArmi);
    gruppo.rotation.y = Math.PI / 2;
    gruppo.position.set(-lunghezza * 0.15, ALTEZZA_ARMA + (lunghezza > 0.9 ? 0.12 : 0), 0.09);
    const scala = Math.min(1, 0.62 / lunghezza);
    gruppo.scale.setScalar(scala);
    supporto.add(gruppo);
    const nome = etichettaPiana([ARMI[posto.arma].nome.toUpperCase()], 0.66, 0.11, { larghezza: 192, altezza: 32, sfondo: SFONDO_TARGHETTA, colore: ARMI[posto.arma].aliena ? '#9ff3ff' : '#f2e6c8', font: 'bold 13px monospace', bordo: '#6b5440' });
    nome.position.set(0, ALTEZZA_TARGHETTA, 0.03);
    supporto.add(nome);
    scena.add(supporto);
  }
  const cartello = etichettaPiana(['SALA D\'ATTESA', '', 'F: PROVA UN\'ARMA DAL MURO', 'SPARA AI MANICHINI', '', 'INVIO: SONO PRONTO'], 3.6, 2.2, { larghezza: 256, altezza: 160, sfondo: '#101418', colore: '#e9f2f7', font: 'bold 15px monospace', bordo: '#2fb7a0' });
  cartello.position.set(CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z);
  cartello.rotation.y = Math.atan2(CARTELLO_PRONTI.verso.x, CARTELLO_PRONTI.verso.z);
  scena.add(cartello);
  for (const x of [-42, -34]) {
    const luce = new THREE.PointLight(0xffe2b0, 10, 14, 1.4);
    luce.position.set(x, ALTEZZA_SOFFITTO - 0.4, 0);
    const plafoniera = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.35), new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
    plafoniera.position.set(x, ALTEZZA_SOFFITTO - 0.04, 0);
    scena.add(luce, plafoniera);
  }
}

function texturaBonus(tipo) {
  const dati = BONUS[tipo];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const colore = `#${dati.colore.toString(16).padStart(6, '0')}`;
  const alone = ctx.createRadialGradient(32, 32, 4, 32, 32, 31);
  alone.addColorStop(0, colore);
  alone.addColorStop(0.55, `${colore}99`);
  alone.addColorStop(1, `${colore}00`);
  ctx.fillStyle = alone;
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#0b0d10';
  ctx.beginPath();
  ctx.arc(32, 32, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${dati.simbolo.length > 2 ? 11 : 18}px monospace`;
  ctx.fillText(dati.simbolo, 32, 33);
  const t = new THREE.CanvasTexture(canvas);
  t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function creaBonus3d(scena) {
  const materiali = new Map(Object.keys(BONUS).map(tipo => [tipo, new THREE.SpriteMaterial({ map: texturaBonus(tipo), transparent: true, depthWrite: false })]));
  const visibili = new Map();
  let tempo = 0;
  return {
    aggiorna(vista, dt) {
      tempo += dt;
      const presenti = new Set();
      for (const b of vista.bonus ?? []) {
        presenti.add(b.id);
        if (!visibili.has(b.id)) {
          const sprite = new THREE.Sprite(materiali.get(b.tipo));
          sprite.scale.setScalar(0.7);
          scena.add(sprite);
          visibili.set(b.id, sprite);
        }
        const sprite = visibili.get(b.id);
        sprite.position.set(b.x, 0.9 + Math.sin(tempo * 3 + b.id) * 0.12, b.z);
        sprite.visible = b.timer > 5 || Math.sin(tempo * 18) > 0;
      }
      for (const [id, sprite] of visibili) {
        if (presenti.has(id)) continue;
        scena.remove(sprite);
        visibili.delete(id);
      }
    },
    svuota() {
      for (const sprite of visibili.values()) scena.remove(sprite);
      visibili.clear();
    },
  };
}

export function creaSegreti(scena) {
  const materiale = new THREE.MeshLambertMaterial({ color: 0x2c3b2a, emissive: 0x39ff6a, emissiveIntensity: 0.9, flatShading: true });
  const pezzi = FRAMMENTI.map(f => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 0), materiale);
    mesh.position.set(f.x, f.y, f.z);
    mesh.scale.set(1, 0.75, 1.2);
    scena.add(mesh);
    return mesh;
  });
  const datiCampana = ACQUISTI.find(a => a.tipo === 'campanella');
  const profilo = [[0, 0.02], [0.05, 0.03], [0.07, 0.08], [0.085, 0.16], [0.13, 0.22], [0.14, 0.24], [0, 0.24]].map(([x, y]) => new THREE.Vector2(x, -y));
  const campana = new THREE.Group();
  const ottone = new THREE.MeshLambertMaterial({ color: 0xb08a3a, emissive: 0x2a1c05 });
  const corpo = new THREE.Mesh(new THREE.LatheGeometry(profilo, 14), ottone);
  corpo.material.side = THREE.DoubleSide;
  const staffa = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x2b2b2b }));
  staffa.position.set(0, 0, -0.1);
  const batacchio = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), ottone);
  batacchio.position.y = -0.22;
  campana.add(corpo, staffa, batacchio);
  campana.position.set(datiCampana.posizione.x, 2.35, datiCampana.posizione.z + datiCampana.verso.z * 0.12);
  scena.add(campana);
  let oscillazione = 0;
  let tempo = 0;
  return {
    suona() {
      oscillazione = 1;
    },
    aggiorna(vista, dt) {
      tempo += dt;
      const trovati = new Set(vista.frammenti ?? []);
      pezzi.forEach((mesh, i) => {
        mesh.visible = vista.fase !== 'attesa' && !trovati.has(FRAMMENTI[i].id);
        mesh.rotation.y += dt * 1.5;
        mesh.position.y = FRAMMENTI[i].y + Math.sin(tempo * 2 + i) * 0.03;
      });
      materiale.emissiveIntensity = 0.6 + Math.sin(tempo * 4) * 0.35;
      oscillazione = Math.max(0, oscillazione - dt * 0.6);
      campana.rotation.x = Math.sin(tempo * 14) * 0.5 * oscillazione;
    },
  };
}
