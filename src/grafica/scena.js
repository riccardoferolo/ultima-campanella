import * as THREE from 'three';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { R } from '../regole.js';
import { ZONE } from '../mappa.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { creaTexture, caricaTextureReali } from './texture.js';
import { caricaArmi, creaMaterialiArmi } from './armi3d.js';
import { costruisciScuola } from './scuola3d.js';
import { caricaZombi, creaGestoreZombi } from './zombi3d.js';
import { caricaPersonaggi, creaCompagno } from './compagno3d.js';
import { caricaOggetti, costruisciArredi, costruisciSala, creaBonus3d, creaSegreti } from './extra3d.js';
import { creaEffetti } from './effetti.js';
import { creaVista1p } from './vista1p.js';

const SCALA_MINIMA = 0.5;
const PASSO_SCALA = 0.1;
const FPS_BASSI = 50;
const FPS_ALTI = 58;
const VERIFICA_OGNI_S = 1.5;
const BUIO = 0x06080b;
const FOV = 72;
const FOV_MIRA = 52;
const FOV_CANNOCCHIALE = 20;
const CIELO_APERTO = 0x0b1322;
const NEBBIA_DENTRO = 24;
const NEBBIA_FUORI = 40;
const ONDEGGIO = 0.01;
const RAGGIO_BOMBA = 0.034;
const SU = new THREE.Vector3(0, 1, 0);

function creaGranate3d(scena) {
  const corpo = new THREE.SphereGeometry(RAGGIO_BOMBA, 12, 10).scale(1, 1.25, 1);
  const tappo = new THREE.CylinderGeometry(0.011, 0.014, 0.03, 8);
  const leva = new THREE.BoxGeometry(0.009, 0.06, 0.014);
  const verde = new THREE.MeshStandardMaterial({ color: 0x3f4a2c, roughness: 0.55, metalness: 0.25 });
  const metallo = new THREE.MeshStandardMaterial({ color: 0x9a9a92, roughness: 0.35, metalness: 0.85 });
  const visibili = new Map();
  function crea() {
    const g = new THREE.Group();
    const c = new THREE.Mesh(corpo, verde);
    const t = new THREE.Mesh(tappo, metallo);
    t.position.y = RAGGIO_BOMBA * 1.25 + 0.012;
    const l = new THREE.Mesh(leva, metallo);
    l.position.set(RAGGIO_BOMBA * 0.9, RAGGIO_BOMBA * 0.6, 0);
    l.rotation.z = -0.25;
    g.add(c, t, l);
    scena.add(g);
    return g;
  }
  return {
    aggiorna(granate, dt) {
      const presenti = new Set();
      for (const gr of granate ?? []) {
        presenti.add(gr.id);
        const g = visibili.get(gr.id) ?? crea();
        visibili.set(gr.id, g);
        const prima = g.position.clone();
        g.position.set(gr.x, gr.y, gr.z);
        const passo = g.position.distanceTo(prima);
        if (passo < 1) {
          g.rotation.x += passo * 9;
          g.rotation.z += passo * 4;
        }
      }
      for (const [id, g] of visibili) {
        if (presenti.has(id)) continue;
        scena.remove(g);
        visibili.delete(id);
      }
    },
    svuota() {
      for (const g of visibili.values()) scena.remove(g);
      visibili.clear();
    },
  };
}

function precompila(renderer, scena, camera, extra) {
  const gruppo = new THREE.Group();
  extra.forEach(o => gruppo.add(o));
  gruppo.position.set(-40, 0, 0);
  scena.add(gruppo);
  const nascosti = [];
  scena.traverse(o => {
    if (o.visible) return;
    nascosti.push(o);
    o.visible = true;
  });
  renderer.compile(scena, camera);
  nascosti.forEach(o => { o.visible = false; });
  scena.remove(gruppo);
}

const aperta = (x, z) => ZONE.some(zona => zona.aperto && x >= zona.x0 && x <= zona.x1 && z >= zona.z0 && z <= zona.z1);

export async function creaMondo(contenitore) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
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

  const ambiente = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scena.environment = ambiente;
  scena.environmentIntensity = 0.12;
  const texture = creaTexture();
  const [libreria, risorseZombi, personaggi, oggetti, reali] = await Promise.all([caricaArmi(), caricaZombi(), caricaPersonaggi(), caricaOggetti(), caricaTextureReali()]);
  const materialiArmi = creaMaterialiArmi(texture, libreria);
  const scuola = costruisciScuola(scena, texture, materialiArmi, oggetti, reali);
  costruisciArredi(scena, oggetti);
  costruisciSala(scena);
  const bonus3d = creaBonus3d(scena);
  const segreti = creaSegreti(scena);
  const zombi = creaGestoreZombi(scena, risorseZombi);
  const effetti = creaEffetti(scena);
  const granate3d = creaGranate3d(scena);
  const vista1p = creaVista1p(materialiArmi);
  vista1p.scena.environment = ambiente;
  vista1p.scena.environmentIntensity = 0.5;
  vista1p.mostra('pistola');
  precompila(renderer, scena, camera, [...[...risorseZombi.values()].map(r => clonaScheletro(r.modello)), ...personaggi.map(p => clonaScheletro(p.modello))]);
  precompila(renderer, vista1p.scena, vista1p.camera, []);
  const compagni = new Map();
  const ultimePosizioni = new Map();
  let tempo = 0;
  let passo = 0;

  let scala = 1;
  let campioni = 0;
  let sommaDt = 0;
  function dimensiona() {
    const l = Math.max(1, Math.floor(contenitore.clientWidth * scala));
    const a = Math.max(1, Math.floor(contenitore.clientHeight * scala));
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
    vista.giocatori.forEach((g, indice) => {
      if (g.id === mioId) return;
      presenti.add(g.id);
      if (!compagni.has(g.id)) compagni.set(g.id, creaCompagno(scena, g.nome, materialiArmi, personaggi[indice % personaggi.length]));
      const prima = ultimePosizioni.get(g.id) ?? g;
      ultimePosizioni.set(g.id, { x: g.x, z: g.z });
      compagni.get(g.id).aggiorna({ ...g, inMovimento: Math.hypot(g.x - prima.x, g.z - prima.z) > 0.5 * dt }, dt);
    });
    for (const [id, c] of compagni) {
      if (presenti.has(id)) continue;
      c.chiudi();
      compagni.delete(id);
    }
  }

  function adattaRisoluzione(dt) {
    campioni += 1;
    sommaDt += dt;
    if (sommaDt < VERIFICA_OGNI_S) return;
    const fps = campioni / sommaDt;
    campioni = 0;
    sommaDt = 0;
    const nuova = fps < FPS_BASSI ? Math.max(SCALA_MINIMA, scala - PASSO_SCALA) : fps > FPS_ALTI ? Math.min(1, scala + PASSO_SCALA / 2) : scala;
    if (Math.abs(nuova - scala) < 0.01) return;
    scala = nuova;
    dimensiona();
  }

  function disegna(vista, { io, mioId, dt, arma, movimento, corsa, inMira, cannocchiale, ricarica, cambio, coltellata, aTerra, morto }) {
    tempo += dt;
    adattaRisoluzione(dt);
    passo += dt * movimento * (corsa ? 13 : 9);
    const occhi = aTerra ? 0.45 : R.ALTEZZA_OCCHI;
    camera.position.set(io.x, occhi + Math.sin(passo) * ONDEGGIO * movimento * (inMira ? 0 : 1), io.z);
    camera.rotation.y = io.yaw + Math.PI;
    camera.rotation.x = io.pitch;
    camera.rotation.z = aTerra ? 0.35 : 0;
    const fov = cannocchiale ? FOV_CANNOCCHIALE : inMira ? FOV_MIRA : FOV;
    if (Math.abs(camera.fov - fov) > 0.1) {
      camera.fov += (fov - camera.fov) * Math.min(1, dt * 14);
      camera.updateProjectionMatrix();
    }
    lampo.intensity = vista1p.lampoAcceso ? 14 : 0;
    if (vista1p.lampoAcceso) lampo.color.setHex(vista1p.coloreLampo);
    const fuori = aperta(io.x, io.z);
    const fattore = Math.min(1, dt * 2);
    scena.fog.far += ((fuori ? NEBBIA_FUORI : NEBBIA_DENTRO) - scena.fog.far) * fattore;
    scena.fog.color.lerp(new THREE.Color(fuori ? CIELO_APERTO : BUIO), fattore);
    scena.background.copy(scena.fog.color);
    scuola.aggiorna(vista, dt, tempo);
    zombi.aggiorna(vista, dt);
    granate3d.aggiorna(vista.granate, dt);
    bonus3d.aggiorna(vista, dt);
    segreti.aggiorna(vista, dt);
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
    bocca() {
      return new THREE.Vector3(0.12, -0.08, -0.4).applyQuaternion(camera.quaternion).add(camera.position);
    },
    raggio(punto, colore) {
      const bocca = new THREE.Vector3(0.12, -0.08, -0.4).applyQuaternion(camera.quaternion).add(camera.position);
      effetti.raggio(bocca, new THREE.Vector3(punto.x, punto.y, punto.z), colore);
    },
    campanella: () => segreti.suona(),
    bersagli: vista => zombi.bersagli(vista),
    colpito: (id, testa) => zombi.colpito(id, testa),
    decapita(id) {
      const punto = zombi.decapita(id);
      if (!punto) return;
      effetti.sangue(punto, SU);
      effetti.sangue(punto, SU);
    },
    effetti,
    svuota() {
      zombi.svuota();
      granate3d.svuota();
      effetti.svuota();
      bonus3d.svuota();
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
