import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as clonaScheletro } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { TESTA } from '../colpi.js';
import { quota } from '../mappa.js';
import { PROCEDURALI, decoraBruto } from './palude/ragni3d.js';

const DISSOLVENZA = 0.25;
const AFFONDA_DOPO = 2.6;
const SUSSULTO_MASSIMO = 1;
const SMORZA_SUSSULTO = 5;
const PIEGA_BUSTO = 0.42;
const PIEGA_TESTA = 0.35;
const ARRETRA = 0.09;
const GHIACCIO = new THREE.Color(0xcdeeff);
const GHIACCIO_LUCE = new THREE.Color(0x3fa9ff);
const SOLLEVA = 0.9;
const VARIANTI = Object.freeze([
  { tinta: 0xffffff, scala: 1 },
  { tinta: 0xc7d1bf, scala: 0.95 },
  { tinta: 0xe0cfcf, scala: 1.06 },
  { tinta: 0xa39a94, scala: 1.02 },
]);
const MODELLI = Object.freeze({
  normale: { url: './modelli/zombie.glb', scala: 0.01, varianti: true, clip: { cammina: 'cammina', cammina2: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' }, velocita: { cammina: 1, cammina2: 0.9, corre: 1.05, attacco: 1.6, attacco2: 1.7, muore: 1.2, fermo: 1 } },
  magro: { url: './modelli/zombi_magro.glb', scala: 0.25, clip: { cammina: 'walk', cammina2: 'walk2', corre: 'run', attacco: 'attack2', attacco2: 'attack1_r', muore: 'dead1', fermo: 'idle' }, velocita: {}, riserva: { tinta: 0x9c7266, scala: 0.94 } },
  preside: {
    url: './modelli/zombie.glb', scala: 0.0135, tinta: 0x8f8a86, alto: 1.95, raggio: 0.5, raggioTesta: 0.23, reazione: 0.45,
    clip: { cammina: 'cammina', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.8, corre: 0.85, attacco: 1.2, attacco2: 1.15, muore: 0.9, fermo: 0.8 },
  },
  custode: {
    url: './modelli/zombie.glb', scala: 0.0158, tinta: 0x6f5a52, alto: 2.3, raggio: 0.62, raggioTesta: 0.27, reazione: 0.25,
    clip: { cammina: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.75, corre: 0.8, attacco: 1, attacco2: 0.95, muore: 0.7, fermo: 0.7 },
  },
  sciamano: {
    url: './modelli/zombie.glb', scala: 0.013, tinta: 0x5d7a46, alto: 1.9, raggio: 0.5, raggioTesta: 0.23, reazione: 0.45,
    clip: { cammina: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.85, corre: 0.9, attacco: 1.2, attacco2: 1.1, muore: 0.9, fermo: 0.8 },
  },
  guardiano: {
    url: './modelli/zombie.glb', scala: 0.0142, tinta: 0xc9a24a, alto: 2.05, raggio: 0.55, raggioTesta: 0.24, reazione: 0.4,
    clip: { cammina: 'cammina', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.8, corre: 0.85, attacco: 1.1, attacco2: 1.1, muore: 0.9, fermo: 0.8 },
  },
  divoratore: {
    url: './modelli/zombie.glb', scala: 0.0172, tinta: 0x4a2a38, alto: 2.6, raggio: 0.72, raggioTesta: 0.3, reazione: 0.2,
    clip: { cammina: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.7, corre: 0.75, attacco: 0.95, attacco2: 0.9, muore: 0.6, fermo: 0.7 },
  },
  ardente: {
    url: './modelli/zombie.glb', scala: 0.0098, tinta: 0x4a2c22, fiamme: true,
    clip: { cammina: 'cammina', cammina2: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 1.1, corre: 1.2, attacco: 1.7, attacco2: 1.8, muore: 1.3, fermo: 1 },
  },
  tossico: {
    url: './modelli/zombi_magro.glb', scala: 0.25, tinta: 0xc9d6b4, nebbia: true,
    clip: { cammina: 'walk', cammina2: 'walk2', corre: 'run', attacco: 'attack2', attacco2: 'attack1_r', muore: 'dead1', fermo: 'idle' }, velocita: { cammina: 0.85, cammina2: 0.85 },
    riserva: { tinta: 0xc9d6b4, scala: 0.94 },
  },
  bruto: {
    url: './modelli/zombie.glb', scala: 0.0148, tinta: 0x7d8288, alto: 2.05, raggio: 0.55, raggioTesta: 0.24, reazione: 0.3, decora: decoraBruto,
    clip: { cammina: 'cammina2', corre: 'corre', attacco: 'attacco', attacco2: 'attacco2', muore: 'muore', fermo: 'fermo' },
    velocita: { cammina: 0.8, corre: 0.85, attacco: 1.1, attacco2: 1.05, muore: 0.9, fermo: 0.8 },
  },
});
const MATERIALE_FIAMMA = new THREE.SpriteMaterial({ map: texturaFiamma(), color: 0xff8a3a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
const MATERIALE_NEBBIA = new THREE.SpriteMaterial({ map: texturaFiamma(), color: 0x9be15d, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending });

function texturaFiamma() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(32, 40, 2, 32, 34, 30);
  g.addColorStop(0, 'rgba(255,240,200,1)');
  g.addColorStop(0.35, 'rgba(255,150,40,0.85)');
  g.addColorStop(1, 'rgba(120,20,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function aggiungiAlone(radice, materiale, punti) {
  return punti.map(([x, y, z, s]) => {
    const sprite = new THREE.Sprite(materiale);
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(s);
    radice.add(sprite);
    return sprite;
  });
}
const SALITA = 1.8;
const R_EMERSO = 1.6;

function sistemaTexture(radice) {
  radice.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    for (const m of [].concat(o.material)) {
      if (!m.map) continue;
      m.map.anisotropy = 4;
      m.map.needsUpdate = true;
    }
  });
}

function materialiTinti(radice, tinte) {
  return tinte.map(tinta => {
    const mappa = new Map();
    radice.traverse(o => {
      if (!o.isMesh) return;
      for (const m of [].concat(o.material)) {
        if (mappa.has(m)) continue;
        const copia = m.clone();
        copia.color = new THREE.Color(tinta);
        mappa.set(m, copia);
      }
    });
    return mappa;
  });
}

export async function caricaZombi() {
  const file = new Map();
  const carica = url => {
    if (!file.has(url)) file.set(url, new GLTFLoader().loadAsync(url));
    return file.get(url);
  };
  const risorse = new Map();
  await Promise.all(Object.entries(MODELLI).map(async ([tipo, voluti]) => {
    let dati = voluti;
    let gltf;
    try {
      gltf = await carica(voluti.url);
    } catch (errore) {
      if (!voluti.riserva) throw errore;
      gltf = await carica(MODELLI.normale.url);
      dati = { ...MODELLI.normale, varianti: false, tinta: voluti.riserva.tinta, scala: MODELLI.normale.scala * voluti.riserva.scala };
    }
    sistemaTexture(gltf.scene);
    const tinte = dati.varianti ? VARIANTI.map(v => v.tinta) : [dati.tinta ?? null];
    risorse.set(tipo, {
      dati,
      modello: gltf.scene,
      clip: new Map(gltf.animations.map(a => [a.name, a])),
      materialiVariante: tinte[0] === null ? null : materialiTinti(gltf.scene, tinte),
    });
  }));
  for (const [tipo, risorsa] of Object.entries(PROCEDURALI)) risorse.set(tipo, { dati: risorsa.dati, modello: risorsa.modello, costruisci: risorsa.costruisci });
  return risorse;
}

function logica(z, siMuove) {
  if (z.stato === 'morto') return 'muore';
  if (z.stato === 'emerge') return 'attacco';
  if (z.stato === 'assi') return 'attacco';
  if (z.stato === 'attacco') return 'attacco2';
  if (z.stato === 'dentro' && !siMuove) return 'fermo';
  if (z.corre) return 'corre';
  return z.variante % 2 ? 'cammina2' : 'cammina';
}

export function creaGestoreZombi(scena, risorse) {
  const zombi = new Map();

  function creaProcedurale(z, risorsa) {
    const radice = new THREE.Group();
    scena.add(radice);
    const parti = risorsa.costruisci(z, radice, scena);
    const voce = {
      radice, corpo: parti.corpo, testa: parti.testa, busto: null, mixer: parti.mixer, azioni: new Map(), dati: risorsa.dati, aloni: [], attuale: null,
      ultimaPosizione: new THREE.Vector2(z.x, z.z), tempoMorto: 0, fase: 0, vitaPrima: z.vita, sussulto: 0, senzaTesta: false, gelo: null, sollevato: 0, giro: 0,
      anima: parti.anima, chiudi: parti.chiudi,
    };
    zombi.set(z.id, voce);
    return voce;
  }

  function crea(z) {
    const risorsa = risorse.get(z.tipo) ?? risorse.get('normale');
    if (risorsa.costruisci) return creaProcedurale(z, risorsa);
    const { dati } = risorsa;
    const radice = new THREE.Group();
    const corpo = clonaScheletro(risorsa.modello);
    const variante = dati.varianti ? VARIANTI[z.variante % VARIANTI.length] : { scala: 1 };
    corpo.scale.setScalar(dati.scala * variante.scala);
    if (risorsa.materialiVariante) {
      const materiali = risorsa.materialiVariante[dati.varianti ? z.variante % VARIANTI.length : 0];
      corpo.traverse(o => {
        if (!o.isMesh) return;
        o.material = Array.isArray(o.material) ? o.material.map(m => materiali.get(m) ?? m) : materiali.get(o.material) ?? o.material;
      });
    }
    corpo.traverse(o => {
      if (!o.isSkinnedMesh) return;
      o.frustumCulled = true;
      o.computeBoundingSphere();
      o.boundingSphere.radius *= 1.8;
    });
    radice.add(corpo);
    const aloni = dati.fiamme
      ? aggiungiAlone(radice, MATERIALE_FIAMMA, [[0, 1.55, 0.05, 0.55], [0.18, 1.15, 0.1, 0.45], [-0.18, 1.05, 0.05, 0.42], [0, 0.6, 0.1, 0.4]])
      : dati.nebbia ? aggiungiAlone(radice, MATERIALE_NEBBIA, [[0, 1.1, 0, 0.9], [0, 0.5, 0, 0.8]]) : [];
    scena.add(radice);
    let testa = null;
    let busto = null;
    corpo.traverse(o => {
      if (!o.isBone) return;
      if (!testa && /head$/i.test(o.name)) testa = o;
      if (/spine2?$/i.test(o.name)) busto = o;
    });
    dati.decora?.(corpo, { testa, busto });
    const mixer = new THREE.AnimationMixer(corpo);
    const azioni = new Map();
    for (const [logico, nome] of Object.entries(dati.clip)) {
      const clip = risorsa.clip.get(nome);
      if (!clip) continue;
      const azione = mixer.clipAction(clip);
      azione.timeScale = dati.velocita[logico] ?? 1;
      if (logico === 'muore') {
        azione.setLoop(THREE.LoopOnce, 1);
        azione.clampWhenFinished = true;
      }
      azioni.set(logico, azione);
    }
    const voce = {
      radice, corpo, testa, busto, mixer, azioni, dati, aloni, attuale: null, ultimaPosizione: new THREE.Vector2(z.x, z.z), tempoMorto: 0, fase: Math.random() * 3,
      vitaPrima: z.vita, sussulto: 0, senzaTesta: false, gelo: null, sollevato: 0, giro: 0,
    };
    zombi.set(z.id, voce);
    return voce;
  }

  function suona(voce, nome) {
    const scelto = voce.azioni.has(nome) ? nome : nome === 'cammina2' ? 'cammina' : nome === 'attacco2' ? 'attacco' : nome;
    if (voce.attuale === scelto) return;
    const nuova = voce.azioni.get(scelto);
    if (!nuova) return;
    const vecchia = voce.azioni.get(voce.attuale);
    nuova.reset();
    if (scelto !== 'muore') nuova.time = voce.fase;
    nuova.play();
    if (vecchia) vecchia.crossFadeTo(nuova, DISSOLVENZA, false);
    voce.attuale = scelto;
  }

  function scuoti(voce, forza) {
    voce.sussulto = Math.min(SUSSULTO_MASSIMO, voce.sussulto + forza * (voce.dati.reazione ?? 1));
  }

  function postura(voce, dt) {
    voce.sussulto = Math.max(0, voce.sussulto - dt * SMORZA_SUSSULTO);
    if (voce.sussulto > 0) {
      voce.busto?.rotateX(-voce.sussulto * PIEGA_BUSTO);
      if (!voce.senzaTesta) voce.testa?.rotateX(-voce.sussulto * PIEGA_TESTA);
      voce.corpo.position.z = -voce.sussulto * ARRETRA;
    } else voce.corpo.position.z = 0;
    if (voce.senzaTesta && voce.testa) voce.testa.scale.setScalar(0.001);
  }

  function ghiaccia(voce, gelo) {
    if (gelo <= 0.01 && !voce.gelo) return;
    if (!voce.gelo) {
      voce.gelo = [];
      voce.corpo.traverse(o => {
        if (!o.isMesh) return;
        const copie = [].concat(o.material).map(m => {
          const c = m.clone();
          voce.gelo.push({ m: c, colore: c.color.clone(), luce: c.emissive.clone() });
          return c;
        });
        o.material = Array.isArray(o.material) ? copie : copie[0];
      });
    }
    for (const g of voce.gelo) {
      g.m.color.copy(g.colore).lerp(GHIACCIO, Math.min(1, gelo) * 0.85);
      g.m.emissive.copy(g.luce).lerp(GHIACCIO_LUCE, Math.min(1, gelo) * 0.35);
    }
    voce.mixer.timeScale = gelo >= 1 ? 0 : 1 - gelo * 0.6;
  }

  function sospendi(voce, z, buchi, dt) {
    let voluto = 0;
    if ((!voce.dati.alto || voce.dati.sollevabile) && z.stato !== 'morto') {
      for (const b of buchi) {
        const d = Math.hypot(z.x - b.x, z.z - b.z);
        if (d < b.raggio) voluto = Math.max(voluto, SOLLEVA * (1 - d / b.raggio) + 0.2);
      }
    }
    voce.sollevato += (voluto - voce.sollevato) * Math.min(1, dt * (voluto > voce.sollevato ? 3 : 6));
    if (voluto > 0) voce.giro += dt * 4;
    return voce.sollevato;
  }

  function rimuovi(id) {
    const voce = zombi.get(id);
    if (!voce) return;
    scena.remove(voce.radice);
    voce.chiudi?.();
    voce.mixer.stopAllAction();
    voce.mixer.uncacheRoot(voce.corpo);
    voce.corpo.traverse(o => o.skeleton?.dispose());
    zombi.delete(id);
  }

  return {
    aggiorna(vista, dt) {
      const vivi = new Set();
      const buchi = vista.buchi ?? [];
      for (const z of vista.zombie) {
        vivi.add(z.id);
        const voce = zombi.get(z.id) ?? crea(z);
        const spostamento = Math.hypot(z.x - voce.ultimaPosizione.x, z.z - voce.ultimaPosizione.y);
        voce.ultimaPosizione.set(z.x, z.z);
        suona(voce, logica(z, spostamento > 0.2 * dt));
        voce.emerso = z.stato === 'emerge' ? (voce.emerso ?? 0) + dt : R_EMERSO;
        const alto = sospendi(voce, z, buchi, dt) - SALITA * (1 - Math.min(1, voce.emerso / R_EMERSO));
        const suolo = quota(z.x, z.z);
        voce.radice.position.set(z.x, suolo + alto, z.z);
        for (let i = 0; i < voce.aloni.length; i++) {
          voce.aloni[i].visible = z.stato !== 'morto';
          voce.aloni[i].scale.y = voce.aloni[i].scale.x * (1 + 0.25 * Math.sin(performance.now() / 90 + i * 1.7 + z.id));
        }
        voce.radice.rotation.y = z.yaw + voce.giro;
        voce.radice.rotation.z = alto > 0.05 ? Math.sin(voce.giro * 1.3) * 0.4 * alto : 0;
        ghiaccia(voce, z.gelo ?? 0);
        if (z.stato === 'morto') {
          voce.tempoMorto += dt;
          if (voce.tempoMorto > AFFONDA_DOPO) voce.radice.position.y = suolo - (voce.tempoMorto - AFFONDA_DOPO) * 0.6;
        } else voce.tempoMorto = 0;
        if (z.vita < voce.vitaPrima && z.stato !== 'morto') scuoti(voce, 0.45 + (voce.vitaPrima - z.vita) / 40);
        voce.vitaPrima = z.vita;
        voce.mixer.update(dt);
        postura(voce, dt);
        voce.anima?.(z, dt, vista);
      }
      for (const id of [...zombi.keys()]) if (!vivi.has(id)) rimuovi(id);
    },
    bersagli(vista) {
      const punto = new THREE.Vector3();
      return vista.zombie.filter(z => z.stato !== 'morto').map(z => {
        const voce = zombi.get(z.id);
        const dati = risorse.get(z.tipo)?.dati ?? MODELLI.normale;
        const base = quota(z.x, z.z);
        const forma = { id: z.id, x: z.x, z: z.z, base, alto: dati.alto, raggio: dati.raggio, raggioTesta: dati.raggioTesta };
        if (voce?.testa) {
          voce.testa.getWorldPosition(punto);
          return { ...forma, testa: { x: punto.x, y: punto.y + 0.06, z: punto.z } };
        }
        return { ...forma, testa: { x: z.x, y: base + (dati.testa ?? TESTA.altezza), z: z.z } };
      });
    },
    colpito(id, testa) {
      const voce = zombi.get(id);
      if (voce) scuoti(voce, testa ? 0.9 : 0.6);
    },
    nascondi(id) {
      const voce = zombi.get(id);
      if (voce) voce.radice.visible = false;
    },
    decapita(id) {
      const voce = zombi.get(id);
      if (!voce?.testa || voce.dati.alto) return null;
      voce.senzaTesta = true;
      return voce.testa.getWorldPosition(new THREE.Vector3());
    },
    posizioneTesta(id) {
      const voce = zombi.get(id);
      if (!voce?.testa) return null;
      return voce.testa.getWorldPosition(new THREE.Vector3());
    },
    svuota() {
      for (const id of [...zombi.keys()]) rimuovi(id);
    },
  };
}
