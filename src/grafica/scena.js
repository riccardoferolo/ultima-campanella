import * as THREE from 'three';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { R } from '../regole.js';
import { ZONE, ATMOSFERA, mappaAttiva, usaMappa } from '../mappa.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { creaTexture, caricaTextureReali, TEXTURE_SCUOLA, TEXTURE_GIUNGLA } from './texture.js';
import { caricaGiungla, costruisciGiungla } from './giungla3d.js';
import { TINTE_ASPETTO } from './compagno3d.js';
import { creaAnimali } from './animali3d.js';
import { modelloArma } from './armi3d.js';
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
const FOV = 72;
const MARGINE_VISTA = 10;
const LATO_MINI = 128;
const FOV_MIRA = 52;
const FOV_CANNOCCHIALE = 20;
const ONDEGGIO = 0.01;
const RAGGIO_BOMBA = 0.034;
const SU = new THREE.Vector3(0, 1, 0);

function texturaDisco() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const s = ctx.createRadialGradient(128, 128, 40, 128, 128, 128);
  s.addColorStop(0, 'rgba(0,0,0,0)');
  s.addColorStop(0.32, 'rgba(255,190,120,0.95)');
  s.addColorStop(0.5, 'rgba(190,90,255,0.8)');
  s.addColorStop(0.8, 'rgba(90,30,180,0.35)');
  s.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = s;
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 40; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${0.2 + Math.random() * 0.35})`;
    ctx.lineWidth = 2 + Math.random() * 4;
    ctx.beginPath();
    const r = 50 + Math.random() * 70;
    const a = Math.random() * Math.PI * 2;
    ctx.arc(128, 128, r, a, a + 0.6 + Math.random());
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function creaVuoto3d(scena, effetti) {
  const disco = texturaDisco();
  const nero = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const materialeDisco = new THREE.MeshBasicMaterial({ map: disco, transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
  const materialeAlone = new THREE.SpriteMaterial({ map: disco, color: 0xb06cff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const sfere = new Map();
  const buchi = new Map();
  let tempo = 0;
  const sincronizza = (elenco, mappa, crea) => {
    const presenti = new Set();
    for (const e of elenco ?? []) {
      presenti.add(e.id);
      if (!mappa.has(e.id)) mappa.set(e.id, crea());
    }
    for (const [id, g] of mappa) {
      if (presenti.has(id)) continue;
      scena.remove(g);
      mappa.delete(id);
    }
  };
  function creaSfera() {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), nero));
    const a = new THREE.Sprite(materialeAlone);
    a.scale.setScalar(0.75);
    g.add(a);
    scena.add(g);
    return g;
  }
  function creaBuco() {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 18), nero));
    const anello = new THREE.Mesh(new THREE.RingGeometry(0.45, 2, 64), materialeDisco);
    anello.rotation.x = Math.PI / 2 - 0.4;
    const anello2 = new THREE.Mesh(new THREE.RingGeometry(0.45, 1.3, 48), materialeDisco);
    anello2.rotation.y = Math.PI / 2;
    const a = new THREE.Sprite(materialeAlone);
    a.scale.setScalar(2.4);
    g.add(a, anello, anello2);
    g.userData = { anello, anello2, eta: 0 };
    scena.add(g);
    return g;
  }
  return {
    aggiorna(vista, dt) {
      tempo += dt;
      sincronizza(vista.proiettili, sfere, creaSfera);
      for (const p of vista.proiettili ?? []) {
        const g = sfere.get(p.id);
        g.position.set(p.x, p.y, p.z);
        effetti.scia(g.position, 0xb06cff);
      }
      sincronizza(vista.buchi, buchi, creaBuco);
      for (const b of vista.buchi ?? []) {
        const g = buchi.get(b.id);
        const u = g.userData;
        u.eta += dt;
        const scala = Math.min(1, u.eta * 4) * Math.min(1, b.timer * 4 + 0.15) * (b.raggio / 6);
        g.scale.setScalar(Math.max(0.05, scala));
        g.position.set(b.x, b.y + Math.sin(tempo * 3) * 0.05, b.z);
        u.anello.rotation.z += dt * 2.5;
        u.anello2.rotation.z -= dt * 1.7;
        effetti.risucchio(g.position, b.raggio * 0.6, 4);
      }
    },
    svuota() {
      for (const g of [...sfere.values(), ...buchi.values()]) scena.remove(g);
      sfere.clear();
      buchi.clear();
    },
  };
}

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

export async function creaMondo(contenitore, mappa = mappaAttiva) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.autoClear = false;
  contenitore.appendChild(renderer.domElement);

  usaMappa(mappa);
  const giungla = mappa === 'giungla';
  const atmosfera = ATMOSFERA;
  const scena = new THREE.Scene();
  scena.background = new THREE.Color(atmosfera.buio);
  scena.fog = new THREE.Fog(atmosfera.buio, atmosfera.nebbiaVicino, atmosfera.nebbiaDentro);
  scena.add(new THREE.HemisphereLight(giungla ? 0x7fa392 : 0x7f8ea3, giungla ? 0x15200f : 0x1b150f, giungla ? 0.6 : 0.55));
  const luna = new THREE.DirectionalLight(0x7088b8, 0.6);
  luna.position.set(-20, 30, -30);
  scena.add(luna);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, atmosfera.nebbiaFuori + MARGINE_VISTA);
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
  const [libreria, risorseZombi, personaggi, oggetti, reali, modelliGiungla] = await Promise.all([
    caricaArmi(), caricaZombi(), caricaPersonaggi(), caricaOggetti(), caricaTextureReali(giungla ? TEXTURE_GIUNGLA : TEXTURE_SCUOLA), giungla ? caricaGiungla() : null,
  ]);
  const mappaPrima = mappaAttiva;
  usaMappa(mappa);
  const materialiArmi = creaMaterialiArmi(texture, libreria);
  const vuoto = { aggiorna() {}, suona() {} };
  const mondoMappa = giungla
    ? costruisciGiungla(scena, { reali, materialiArmi, oggetti, modelli: modelliGiungla })
    : costruisciScuola(scena, texture, materialiArmi, oggetti, reali);
  if (!giungla) {
    costruisciArredi(scena, oggetti);
    costruisciSala(scena);
  }
  const bonus3d = creaBonus3d(scena);
  const segreti = giungla ? vuoto : creaSegreti(scena);
  const animali = creaAnimali(scena, mappa);
  const scenaMini = new THREE.Scene();
  scenaMini.environment = ambiente;
  scenaMini.add(new THREE.HemisphereLight(0xffffff, 0x445566, 2.2));
  const luceMini = new THREE.DirectionalLight(0xffffff, 3);
  luceMini.position.set(1, 2, 3);
  scenaMini.add(luceMini);
  const cameraMini = new THREE.PerspectiveCamera(26, 2, 0.01, 20);
  const bersaglioMini = new THREE.WebGLRenderTarget(LATO_MINI * 2, LATO_MINI);
  const pixelMini = new Uint8Array(LATO_MINI * LATO_MINI * 2 * 4);
  usaMappa(mappaPrima);
  const zombi = creaGestoreZombi(scena, risorseZombi);
  const effetti = creaEffetti(scena);
  const granate3d = creaGranate3d(scena);
  const vuoto3d = creaVuoto3d(scena, effetti);
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
    effetti.dimensiona(a);
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

  function disegna(vista, { io, mioId, dt, arma, movimento, corsa, inMira, cannocchiale, ricarica, colpiRicarica, cambio, coltellata, aTerra, morto }) {
    tempo += dt;
    adattaRisoluzione(dt);
    passo += dt * movimento * (corsa ? 13 : 9);
    const occhi = aTerra ? 0.45 : R.ALTEZZA_OCCHI;
    camera.position.set(io.x, occhi + Math.sin(passo) * ONDEGGIO * movimento * (inMira ? 0 : 1), io.z);
    camera.rotation.y = io.yaw + Math.PI;
    camera.rotation.x = io.pitch + vista1p.calcio * vista1p.calcio * 0.06;
    camera.rotation.z = aTerra ? 0.35 : 0;
    const fov = cannocchiale ? FOV_CANNOCCHIALE : inMira ? FOV_MIRA : FOV;
    if (Math.abs(camera.fov - fov) > 0.1) {
      camera.fov += (fov - camera.fov) * Math.min(1, dt * 14);
      camera.updateProjectionMatrix();
    }
    lampo.intensity = vista1p.lampoAcceso ? (vista1p.lampoForte ? 30 : 14) : 0;
    if (vista1p.lampoAcceso) lampo.color.setHex(vista1p.coloreLampo);
    const fuori = aperta(io.x, io.z);
    const fattore = Math.min(1, dt * 2);
    scena.fog.far += ((fuori ? atmosfera.nebbiaFuori : atmosfera.nebbiaDentro) - scena.fog.far) * fattore;
    scena.fog.color.lerp(new THREE.Color(fuori ? atmosfera.cielo : atmosfera.buio), fattore);
    scena.background.copy(scena.fog.color);
    mondoMappa.aggiorna(vista, dt, tempo, camera.position);
    zombi.aggiorna(vista, dt);
    granate3d.aggiorna(vista.granate, dt);
    vuoto3d.aggiorna(vista, dt);
    bonus3d.aggiorna(vista, dt);
    segreti.aggiorna(vista, dt);
    animali.aggiorna(vista, dt, tempo, camera);
    aggiornaCompagni(vista, mioId, dt);
    effetti.aggiorna(dt, camera.position);
    vista1p.mostra(arma);
    vista1p.nascondi(aTerra || morto || cannocchiale);
    vista1p.aggiorna({ dt, movimento, mira: inMira, ricarica, colpiRicarica, cambio, coltellata, corsa });

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
    mappa,
    scena,
    renderer,
    miniatura(tipo) {
      const { gruppo } = modelloArma(tipo, materialiArmi);
      const perno = new THREE.Group();
      gruppo.rotation.y = Math.PI / 2;
      perno.add(gruppo);
      const scatola = new THREE.Box3().setFromObject(perno);
      const centro = scatola.getCenter(new THREE.Vector3());
      const misura = scatola.getSize(new THREE.Vector3());
      gruppo.position.sub(centro);
      scenaMini.add(perno);
      const lungo = Math.max(misura.x, misura.y * 2.2, 0.2);
      cameraMini.position.set(0, lungo * 0.12, lungo * 2.15);
      cameraMini.lookAt(0, 0, 0);
      renderer.setRenderTarget(bersaglioMini);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.render(scenaMini, cameraMini);
      renderer.readRenderTargetPixels(bersaglioMini, 0, 0, LATO_MINI * 2, LATO_MINI, pixelMini);
      renderer.setRenderTarget(null);
      scenaMini.remove(perno);
      const tela = document.createElement('canvas');
      tela.width = LATO_MINI * 2;
      tela.height = LATO_MINI;
      const ctx = tela.getContext('2d');
      const immagine = ctx.createImageData(LATO_MINI * 2, LATO_MINI);
      const riga = LATO_MINI * 2 * 4;
      for (let y = 0; y < LATO_MINI; y++) {
        for (let i = 0; i < riga; i++) {
          const v = pixelMini[(LATO_MINI - 1 - y) * riga + i];
          immagine.data[y * riga + i] = i % 4 === 3 ? v : Math.round(255 * Math.min(1, (v / 255) ** (1 / 2.2) * 1.15));
        }
      }
      ctx.putImageData(immagine, 0, 0);
      return tela.toDataURL();
    },
    tela: renderer.domElement,
    campanella: () => segreti.suona(),
    tingiManica(aspetto) {
      materialiArmi.manica.color.setHex((TINTE_ASPETTO[aspetto] ?? TINTE_ASPETTO[0])[0]);
    },
    speciale(e) {
      const centro = new THREE.Vector3(e.x, 1, e.z);
      if (e.tipo === 'turbine') {
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          effetti.esplosione(new THREE.Vector3(e.x + Math.cos(a) * 3, 1, e.z + Math.sin(a) * 3), 'energia', 0x3ddc84);
        }
      } else if (e.tipo === 'onda') {
        for (let d = 1.5; d <= 14; d += 1.5) effetti.esplosione(new THREE.Vector3(e.x + Math.sin(e.yaw) * d, 1, e.z + Math.cos(e.yaw) * d), 'fuoco', 0xffb238);
      } else effetti.esplosione(centro, 'energia', 0x7dff6a);
    },
    anima(e) {
      effetti.esplosione(new THREE.Vector3(e.x, 1.2, e.z), 'energia', 0x9be15d);
    },
    pietra(e) {
      effetti.esplosione(new THREE.Vector3(e.x, 0.4, e.z), 'fuoco', 0x8a6a4a);
    },
    bevi: tipo => vista1p.bevi(tipo),
    bersagli: vista => zombi.bersagli(vista),
    colpito: (id, testa) => zombi.colpito(id, testa),
    frantuma(id, x, z) {
      zombi.nascondi(id);
      effetti.ghiaccio(new THREE.Vector3(x, 1, z));
    },
    fulmine(punti) {
      effetti.fulmine(punti.map(p => new THREE.Vector3(p.x, p.y, p.z)));
    },
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
      vuoto3d.svuota();
      effetti.svuota();
      bonus3d.svuota();
      animali.svuota();
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
