import * as THREE from 'three';
import { R } from '../regole.js';
import { creaTexture } from './texture.js';
import { creaMaterialiArmi } from './armi3d.js';
import { costruisciScuola } from './scuola3d.js';
import { caricaZombi, creaGestoreZombi } from './zombi3d.js';
import { creaCompagno } from './compagno3d.js';
import { creaEffetti } from './effetti.js';
import { creaVista1p } from './vista1p.js';

const RIDUZIONE = 3;
const BUIO = 0x06080b;
const FOV = 72;
const FOV_MIRA = 52;
const FOV_CANNOCCHIALE = 20;
const URL_ZOMBIE = './modelli/zombie.glb';

export async function creaMondo(contenitore) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.autoClear = false;
  contenitore.appendChild(renderer.domElement);

  const scena = new THREE.Scene();
  scena.background = new THREE.Color(BUIO);
  scena.fog = new THREE.Fog(BUIO, 3, 24);
  scena.add(new THREE.HemisphereLight(0x7f8ea3, 0x1b150f, 0.55));
  const luna = new THREE.DirectionalLight(0x7088b8, 0.6);
  luna.position.set(-20, 30, -30);
  scena.add(luna);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 120);
  camera.rotation.order = 'YXZ';
  const torcia = new THREE.SpotLight(0xfff0d0, 28, 24, 0.45, 0.55, 1.3);
  torcia.position.set(0.15, -0.1, 0);
  const mira = new THREE.Object3D();
  mira.position.set(0, 0, -1);
  torcia.target = mira;
  const lampo = new THREE.PointLight(0xffc27a, 0, 9, 1.5);
  camera.add(torcia, mira, lampo);
  scena.add(camera);

  const texture = creaTexture();
  const materialiArmi = creaMaterialiArmi(texture);
  const scuola = costruisciScuola(scena, texture, materialiArmi);
  const zombi = creaGestoreZombi(scena, await caricaZombi(URL_ZOMBIE));
  const effetti = creaEffetti(scena);
  const vista1p = creaVista1p(materialiArmi);
  const compagni = new Map();
  const ultimePosizioni = new Map();
  let tempo = 0;
  let passo = 0;

  function dimensiona() {
    const l = Math.max(1, Math.floor(contenitore.clientWidth / RIDUZIONE));
    const a = Math.max(1, Math.floor(contenitore.clientHeight / RIDUZIONE));
    renderer.setSize(l, a, false);
    camera.aspect = l / a;
    camera.updateProjectionMatrix();
    vista1p.camera.aspect = l / a;
    vista1p.camera.updateProjectionMatrix();
  }
  const osservatore = new ResizeObserver(dimensiona);
  osservatore.observe(contenitore);
  dimensiona();

  function aggiornaCompagni(vista, mioId, dt) {
    const presenti = new Set();
    for (const g of vista.giocatori) {
      if (g.id === mioId) continue;
      presenti.add(g.id);
      if (!compagni.has(g.id)) compagni.set(g.id, creaCompagno(scena, g.nome, materialiArmi));
      const prima = ultimePosizioni.get(g.id) ?? g;
      ultimePosizioni.set(g.id, { x: g.x, z: g.z });
      compagni.get(g.id).aggiorna({ ...g, inMovimento: Math.hypot(g.x - prima.x, g.z - prima.z) > 0.5 * dt }, dt);
    }
    for (const [id, c] of compagni) {
      if (presenti.has(id)) continue;
      c.chiudi();
      compagni.delete(id);
    }
  }

  function disegna(vista, { io, mioId, dt, arma, movimento, corsa, inMira, cannocchiale, ricarica, cambio, coltellata, aTerra, morto }) {
    tempo += dt;
    passo += dt * movimento * (corsa ? 13 : 9);
    const occhi = aTerra ? 0.45 : R.ALTEZZA_OCCHI;
    camera.position.set(io.x, occhi + Math.sin(passo) * 0.035 * movimento, io.z);
    camera.rotation.y = io.yaw + Math.PI;
    camera.rotation.x = io.pitch;
    camera.rotation.z = aTerra ? 0.35 : 0;
    const fov = cannocchiale ? FOV_CANNOCCHIALE : inMira ? FOV_MIRA : FOV;
    if (Math.abs(camera.fov - fov) > 0.1) {
      camera.fov += (fov - camera.fov) * Math.min(1, dt * 14);
      camera.updateProjectionMatrix();
    }
    lampo.intensity = vista1p.lampoAcceso ? 14 : 0;
    scuola.aggiorna(vista, dt, tempo);
    zombi.aggiorna(vista, dt);
    aggiornaCompagni(vista, mioId, dt);
    effetti.aggiorna(dt);
    vista1p.mostra(arma);
    vista1p.nascondi(aTerra || morto || cannocchiale);
    vista1p.aggiorna({ dt, movimento, mira: inMira, ricarica, cambio, coltellata, corsa });

    renderer.clear();
    renderer.render(scena, camera);
    renderer.clearDepth();
    renderer.render(vista1p.scena, vista1p.camera);
  }

  return {
    disegna,
    camera,
    spara: () => vista1p.spara(),
    raggio(punto) {
      const bocca = new THREE.Vector3(0.12, -0.08, -0.4).applyQuaternion(camera.quaternion).add(camera.position);
      effetti.raggio(bocca, new THREE.Vector3(punto.x, punto.y, punto.z));
    },
    bersagli: vista => zombi.bersagli(vista),
    effetti,
    svuota() {
      zombi.svuota();
      effetti.svuota();
      for (const c of compagni.values()) c.chiudi();
      compagni.clear();
      ultimePosizioni.clear();
    },
    chiudi() {
      osservatore.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
