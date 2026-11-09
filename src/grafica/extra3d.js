import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARMI, BONUS } from '../regole.js';
import { ARREDI, CARTELLO_PRONTI, FRAMMENTI, ACQUISTI, ALTEZZA_SOFFITTO, quota } from '../mappa.js';
import { texturaTesto } from './texture.js';

const URL_OGGETTI = './modelli/arredi.glb';

export async function caricaOggetti() {
  const gltf = await new GLTFLoader().loadAsync(URL_OGGETTI);
  const oggetti = new Map();
  for (const figlio of [...gltf.scene.children]) {
    figlio.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = false;
      o.receiveShadow = false;
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
    copia.position.set(a.x, 0, a.z);
    copia.rotation.y = a.rot ?? 0;
    if (a.scala) copia.scale.setScalar(a.scala);
    scena.add(copia);
  }
}

function etichettaPiana(testo, larghezza, altezza, opzioni) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza, altezza), new THREE.MeshBasicMaterial({ map: texturaTesto(testo, opzioni), transparent: true }));
  return mesh;
}

export function costruisciSala(scena) {
  const cartello = etichettaPiana(["SALA D'ATTESA", '', 'ASPETTATE IL VOSTRO AMICO', '', 'INVIO: SONO PRONTO'], 3.6, 2.2, { larghezza: 512, altezza: 320, sfondo: '#101418', colore: '#e9f2f7', font: 'bold 30px sans-serif', bordo: '#2fb7a0' });
  cartello.position.set(CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z);
  cartello.rotation.y = Math.atan2(CARTELLO_PRONTI.verso.x, CARTELLO_PRONTI.verso.z);
  scena.add(cartello);
  const luce = new THREE.PointLight(0xffe2b0, 16, 18, 1.4);
  luce.position.set(-38, ALTEZZA_SOFFITTO - 0.4, 0);
  const plafoniera = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.35), new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
  plafoniera.position.set(-38, ALTEZZA_SOFFITTO - 0.04, 0);
  scena.add(luce, plafoniera);
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
        sprite.position.set(b.x, quota(b.x, b.z) + 0.9 + Math.sin(tempo * 3 + b.id) * 0.12, b.z);
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

function texturaAlone() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const sfumatura = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  sfumatura.addColorStop(0, 'rgba(255,255,255,0.9)');
  sfumatura.addColorStop(0.35, 'rgba(255,255,255,0.25)');
  sfumatura.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sfumatura;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function creaSegreti(scena) {
  const materiale = new THREE.MeshStandardMaterial({ color: 0x2c3b2a, emissive: 0x39ff6a, emissiveIntensity: 0.9, roughness: 0.4, metalness: 0.3, flatShading: true });
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
  const ottone = new THREE.MeshStandardMaterial({ color: 0xb08a3a, metalness: 0.85, roughness: 0.35 });
  const corpo = new THREE.Mesh(new THREE.LatheGeometry(profilo, 14), ottone);
  corpo.material.side = THREE.DoubleSide;
  const staffa = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2b2b2b, metalness: 0.7, roughness: 0.5 }));
  staffa.position.set(0, 0, -0.1);
  const batacchio = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), ottone);
  batacchio.position.y = -0.22;
  campana.add(corpo, staffa, batacchio);
  campana.position.set(datiCampana.posizione.x, 2.35, datiCampana.posizione.z + datiCampana.verso.z * 0.12);
  scena.add(campana);
  const vetro = new THREE.MeshStandardMaterial({ color: 0x3a1a00, emissive: 0xff8a2a, emissiveIntensity: 1.4, roughness: 0.15, metalness: 0.1 });
  const cappuccio = new THREE.MeshStandardMaterial({ color: 0xb9b4a6, metalness: 0.9, roughness: 0.3 });
  const alone = new THREE.SpriteMaterial({ map: texturaAlone(), color: 0xff9a3a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const fusibili = [0, 1, 2].map(() => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.13, 10), vetro));
    for (const y of [-0.075, 0.075]) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.03, 10), cappuccio);
      c.position.y = y;
      g.add(c);
    }
    const s = new THREE.Sprite(alone);
    s.scale.setScalar(0.45);
    g.add(s);
    g.rotation.z = Math.PI / 2;
    g.visible = false;
    scena.add(g);
    return g;
  });
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
      const aTerra = new Map((vista.missione?.aTerra ?? []).map(f => [f.id, f]));
      fusibili.forEach((g, id) => {
        const f = aTerra.get(id);
        g.visible = !!f && vista.fase !== 'attesa';
        if (!f) return;
        g.position.set(f.x, f.y + Math.sin(tempo * 2.2 + id) * 0.03, f.z);
        g.rotation.y += dt * 1.2;
      });
      oscillazione = Math.max(0, oscillazione - dt * 0.6);
      campana.rotation.x = Math.sin(tempo * 14) * 0.5 * oscillazione;
    },
  };
}
