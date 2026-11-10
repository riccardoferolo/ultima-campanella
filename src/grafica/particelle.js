import * as THREE from 'three';
import { quota } from '../mappa.js';

const VERTICE = `
attribute float dimensione;
attribute float alfa;
attribute vec3 colore;
uniform float altezza;
varying float vAlfa;
varying vec3 vColore;
#include <fog_pars_vertex>
void main() {
  vAlfa = alfa;
  vColore = colore;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = alfa > 0.0 ? min(256.0, dimensione * projectionMatrix[1][1] * altezza * 0.5 / max(0.05, -mvPosition.z)) : 0.0;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const FRAMMENTO = `
uniform sampler2D mappa;
varying float vAlfa;
varying vec3 vColore;
#include <fog_pars_fragment>
void main() {
  float a = texture2D(mappa, gl_PointCoord).a * vAlfa;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColore, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

const TRACCE_MASSIME = 64;
const VELOCITA_TRACCIA = 170;
const LUNGHEZZA_TRACCIA = 4;
const LARGHEZZA_TRACCIA = 0.05;
const STACCO_TRACCIA = 0.7;
const COLORE_TRACCIA = new THREE.Color(0xffd9a0);

export function creaNuvola(scena, texture, quante, additiva) {
  const posizioni = new Float32Array(quante * 3);
  const colori = new Float32Array(quante * 3);
  const dimensioni = new Float32Array(quante);
  const alfe = new Float32Array(quante);
  const velocita = new Float32Array(quante * 3);
  const vite = new Float32Array(quante);
  const durate = new Float32Array(quante);
  const gravita = new Float32Array(quante);
  const pavimenti = new Float32Array(quante);
  const libere = [];
  for (let i = quante - 1; i >= 0; i--) libere.push(i);
  const attive = [];
  const geometria = new THREE.BufferGeometry();
  const attributo = (nome, dati, n) => geometria.setAttribute(nome, new THREE.BufferAttribute(dati, n).setUsage(THREE.DynamicDrawUsage));
  attributo('position', posizioni, 3);
  attributo('colore', colori, 3);
  attributo('dimensione', dimensioni, 1);
  attributo('alfa', alfe, 1);
  const uniformi = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { altezza: { value: 600 } }]);
  uniformi.mappa = { value: texture };
  const materiale = new THREE.ShaderMaterial({
    uniforms: uniformi, vertexShader: VERTICE, fragmentShader: FRAMMENTO, transparent: true, depthWrite: false, fog: true,
    blending: additiva ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const punti = new THREE.Points(geometria, materiale);
  punti.frustumCulled = false;
  scena.add(punti);
  const tinta = new THREE.Color();
  let sporca = false;

  let vittima = 0;
  function nuova(x, y, z, vx, vy, vz, colore, dimensione, durata, g) {
    if (!libere.length) {
      if (!attive.length) return;
      vittima = (vittima + 1) % attive.length;
      libera(vittima);
    }
    const i = libere.pop();
    const p = i * 3;
    posizioni[p] = x;
    posizioni[p + 1] = y;
    posizioni[p + 2] = z;
    velocita[p] = vx;
    velocita[p + 1] = vy;
    velocita[p + 2] = vz;
    tinta.setHex(colore);
    colori[p] = tinta.r;
    colori[p + 1] = tinta.g;
    colori[p + 2] = tinta.b;
    pavimenti[i] = Math.min(y, quota(x, z));
    dimensioni[i] = dimensione;
    alfe[i] = 1;
    vite[i] = 0;
    durate[i] = durata;
    gravita[i] = g;
    attive.push(i);
    sporca = true;
  }

  function libera(k) {
    const i = attive[k];
    alfe[i] = 0;
    attive[k] = attive[attive.length - 1];
    attive.pop();
    libere.push(i);
  }

  return {
    nuova,
    get libere() { return libere.length; },
    altezza(pixel) { uniformi.altezza.value = pixel; },
    aggiorna(dt) {
      for (let k = attive.length - 1; k >= 0; k--) {
        const i = attive[k];
        vite[i] += dt;
        const p = i * 3;
        if (vite[i] >= durate[i] || posizioni[p + 1] < pavimenti[i]) {
          libera(k);
          sporca = true;
          continue;
        }
        velocita[p + 1] += gravita[i] * dt;
        posizioni[p] += velocita[p] * dt;
        posizioni[p + 1] += velocita[p + 1] * dt;
        posizioni[p + 2] += velocita[p + 2] * dt;
        alfe[i] = 1 - vite[i] / durate[i];
        sporca = true;
      }
      if (!sporca) return;
      sporca = false;
      for (const nome of ['position', 'colore', 'dimensione', 'alfa']) geometria.attributes[nome].needsUpdate = true;
    },
    svuota() {
      while (attive.length) libera(attive.length - 1);
      geometria.attributes.alfa.needsUpdate = true;
    },
  };
}

export function creaTracce(scena) {
  const posizioni = new Float32Array(TRACCE_MASSIME * 12);
  const colori = new Float32Array(TRACCE_MASSIME * 12);
  const indici = [];
  for (let i = 0; i < TRACCE_MASSIME; i++) {
    const v = i * 4;
    indici.push(v, v + 1, v + 2, v + 2, v + 1, v + 3);
  }
  const lato = new THREE.Vector3();
  const lungo = new THREE.Vector3();
  const verso = new THREE.Vector3();
  const centro = new THREE.Vector3();
  const partenze = new Float32Array(TRACCE_MASSIME * 3);
  const versi = new Float32Array(TRACCE_MASSIME * 3);
  const lunghezze = new Float32Array(TRACCE_MASSIME);
  const eta = new Float32Array(TRACCE_MASSIME).fill(-1);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(posizioni, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setAttribute('color', new THREE.BufferAttribute(colori, 3).setUsage(THREE.DynamicDrawUsage));
  geometria.setIndex(indici);
  const linee = new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  linee.frustumCulled = false;
  scena.add(linee);
  let prossima = 0;
  let vive = 0;

  return {
    traccia(da, a) {
      const dx = a.x - da.x;
      const dy = a.y - da.y;
      const dz = a.z - da.z;
      const l = Math.hypot(dx, dy, dz);
      if (l < STACCO_TRACCIA + 0.5) return;
      const i = prossima;
      prossima = (prossima + 1) % TRACCE_MASSIME;
      partenze.set([da.x + (dx / l) * STACCO_TRACCIA, da.y + (dy / l) * STACCO_TRACCIA, da.z + (dz / l) * STACCO_TRACCIA], i * 3);
      versi.set([dx / l, dy / l, dz / l], i * 3);
      lunghezze[i] = l - STACCO_TRACCIA;
      if (eta[i] < 0) vive += 1;
      eta[i] = 0;
    },
    aggiorna(dt, occhio) {
      if (!vive || !occhio) return;
      for (let i = 0; i < TRACCE_MASSIME; i++) {
        if (eta[i] < 0) continue;
        eta[i] += dt;
        const testa = Math.min(lunghezze[i], eta[i] * VELOCITA_TRACCIA);
        const coda = Math.max(0, testa - LUNGHEZZA_TRACCIA);
        const p = i * 3;
        const q = i * 12;
        if (coda >= lunghezze[i] - 0.01) {
          eta[i] = -1;
          vive -= 1;
          colori.fill(0, q, q + 12);
          continue;
        }
        verso.set(versi[p], versi[p + 1], versi[p + 2]);
        centro.set(partenze[p], partenze[p + 1], partenze[p + 2]).addScaledVector(verso, (coda + testa) / 2);
        lato.crossVectors(verso, lungo.subVectors(occhio, centro)).normalize().multiplyScalar(LARGHEZZA_TRACCIA);
        for (let k = 0; k < 3; k++) {
          const a = partenze[p + k] + versi[p + k] * coda;
          const b = partenze[p + k] + versi[p + k] * testa;
          const s = lato.getComponent(k);
          posizioni[q + k] = a - s;
          posizioni[q + 3 + k] = a + s;
          posizioni[q + 6 + k] = b - s;
          posizioni[q + 9 + k] = b + s;
        }
        colori.fill(0, q, q + 6);
        colori.set([COLORE_TRACCIA.r, COLORE_TRACCIA.g, COLORE_TRACCIA.b, COLORE_TRACCIA.r, COLORE_TRACCIA.g, COLORE_TRACCIA.b], q + 6);
      }
      geometria.attributes.position.needsUpdate = true;
      geometria.attributes.color.needsUpdate = true;
    },
    svuota() {
      eta.fill(-1);
      colori.fill(0);
      vive = 0;
      geometria.attributes.color.needsUpdate = true;
    },
  };
}
