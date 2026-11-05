import * as THREE from 'three';
import { modelloArma, creaBraccio } from './armi3d.js';

const RIPOSO = new THREE.Vector3(0.17, -0.17, -0.36);
const MIRA = new THREE.Vector3(0, -0.075, -0.3);
const DURATA_LAMPO = 0.05;

function texturaLampo() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff3c4';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(16, 16);
    ctx.lineTo(16 + Math.cos(a) * 15, 16 + Math.sin(a) * 15);
    ctx.lineTo(16 + Math.cos(a + 0.3) * 6, 16 + Math.sin(a + 0.3) * 6);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(canvas);
  t.magFilter = THREE.NearestFilter;
  return t;
}

export function creaVista1p(materialiArmi) {
  const scena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10);
  scena.add(new THREE.HemisphereLight(0xc9d6e8, 0x30261c, 1.6));
  const luce = new THREE.DirectionalLight(0xfff0d0, 1.2);
  luce.position.set(1, 2, 1);
  scena.add(luce);
  const supporto = new THREE.Group();
  supporto.add(creaBraccio(materialiArmi));
  scena.add(supporto);
  const modelli = new Map();
  const lampo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaLampo(), blending: THREE.AdditiveBlending, transparent: true, depthTest: false }));
  lampo.scale.setScalar(0.18);
  lampo.visible = false;
  supporto.add(lampo);
  const coltello = modelloArma('coltello', materialiArmi);
  coltello.gruppo.visible = false;
  scena.add(coltello.gruppo);
  let attuale = null;
  let rinculo = 0;
  let tempoLampo = 0;
  let passo = 0;
  const posizione = RIPOSO.clone();

  function mostra(tipo) {
    if (attuale === tipo) return;
    modelli.forEach(m => { m.gruppo.visible = false; });
    if (!modelli.has(tipo)) {
      const m = modelloArma(tipo, materialiArmi);
      supporto.add(m.gruppo);
      modelli.set(tipo, m);
    }
    const m = modelli.get(tipo);
    m.gruppo.visible = true;
    lampo.position.copy(m.bocca);
    attuale = tipo;
  }

  return {
    scena,
    camera,
    mostra,
    spara() {
      rinculo = 1;
      tempoLampo = DURATA_LAMPO;
      lampo.material.rotation = Math.random() * Math.PI;
    },
    get lampoAcceso() { return tempoLampo > 0; },
    aggiorna({ dt, movimento, mira, ricarica, cambio, coltellata, corsa }) {
      passo += dt * (corsa ? 14 : 9) * movimento;
      rinculo = Math.max(0, rinculo - dt * 9);
      tempoLampo = Math.max(0, tempoLampo - dt);
      lampo.visible = tempoLampo > 0;
      const base = mira ? MIRA : RIPOSO;
      posizione.lerp(base, Math.min(1, dt * 14));
      const bob = mira ? 0.2 : 1;
      supporto.position.set(
        posizione.x + Math.cos(passo) * 0.012 * movimento * bob,
        posizione.y + Math.abs(Math.sin(passo)) * 0.014 * movimento * bob - ricarica * 0.25 - cambio * 0.3 - (corsa ? 0.04 : 0),
        posizione.z + rinculo * 0.05,
      );
      supporto.rotation.set(rinculo * 0.12 + ricarica * 0.8, (corsa ? 0.5 : 0) + (mira ? 0 : 0.06), ricarica * 0.4);
      coltello.gruppo.visible = coltellata > 0;
      if (coltellata > 0) {
        const f = 1 - coltellata;
        coltello.gruppo.position.set(0.25 - f * 0.45, -0.18 + Math.sin(f * Math.PI) * 0.06, -0.4);
        coltello.gruppo.rotation.set(0, -0.6 + f * 1.4, -0.4);
      }
    },
    nascondi(nascosta) {
      supporto.visible = !nascosta;
    },
  };
}
