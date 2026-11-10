import * as THREE from 'three';
import { ZONE, quota } from '../../mappa.js';
import { COLLINE, rumorePalude } from '../../mappe/palude.js';

const PASSO = 1;
const MARGINE = 28;
const METRI_TEXTURE = 3.2;
const SOTTACQUA = new THREE.Color(0x6e6852);
const BAGNATO = new THREE.Color(0x9c927a);
const FANGO = new THREE.Color(0xd9ccae);
const MUSCHIO = new THREE.Color(0xa9b585);
const ERBA = new THREE.Color(0xbcc690);

const morbido = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function materialeTerreno(reali) {
  const materiale = new THREE.MeshStandardMaterial({ ...reali.fango, vertexColors: true, metalness: 0, roughness: 1 });
  const foglie = reali.foglieTerra?.map ?? null;
  if (!foglie) return materiale;
  materiale.onBeforeCompile = shader => {
    shader.uniforms.mappaFoglie = { value: foglie };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float misto;\nvarying float vMisto;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvMisto = misto;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D mappaFoglie;\nvarying float vMisto;')
      .replace('#include <map_fragment>', `#ifdef USE_MAP
  vec4 fangoTexel = texture2D( map, vMapUv );
  vec4 foglieTexel = texture2D( mappaFoglie, vMapUv * 0.85 + vec2( 0.37, 0.11 ) );
  diffuseColor *= mix( fangoTexel, foglieTexel, clamp( vMisto, 0.0, 1.0 ) );
#endif`);
  };
  materiale.customProgramCacheKey = () => 'terrenoPalude';
  return materiale;
}

export function creaTerreno(scena, { reali }) {
  const zone = ZONE.filter(q => q.id !== 'sala' && q.id !== 'tana');
  const x0 = Math.min(...zone.map(q => q.x0)) - MARGINE;
  const x1 = Math.max(...zone.map(q => q.x1)) + MARGINE;
  const z0 = Math.min(...zone.map(q => q.z0)) - MARGINE;
  const z1 = Math.max(...zone.map(q => q.z1)) + MARGINE;
  const colonne = Math.ceil((x1 - x0) / PASSO) + 1;
  const righe = Math.ceil((z1 - z0) / PASSO) + 1;
  const n = colonne * righe;
  const posizioni = new Float32Array(n * 3);
  const colori = new Float32Array(n * 3);
  const misti = new Float32Array(n);
  const uv = new Float32Array(n * 2);
  const vicino = new Uint8Array(n);
  const piatta = new Uint8Array(n);
  const colore = new THREE.Color();
  for (let r = 0; r < righe; r++) {
    for (let c = 0; c < colonne; c++) {
      const i = r * colonne + c;
      const x = x0 + c * PASSO;
      const z = z0 + r * PASSO;
      const h = quota(x, z);
      const qui = zone.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1);
      piatta[i] = qui && !COLLINE.has(qui.id) ? 1 : 0;
      vicino[i] = zone.some(q => x >= q.x0 - MARGINE && x <= q.x1 + MARGINE && z >= q.z0 - MARGINE && z <= q.z1 + MARGINE) ? 1 : 0;
      posizioni.set([x, h, z], i * 3);
      uv.set([x / METRI_TEXTURE, z / METRI_TEXTURE], i * 2);
      const macchia = rumorePalude(x * 1.9, z * 1.9, 11);
      const muschio = morbido(0.35, 0.75, macchia + h * 0.18);
      colore.copy(FANGO).lerp(MUSCHIO, muschio * 0.8).lerp(ERBA, morbido(0.6, 1.6, h) * 0.5);
      colore.lerp(BAGNATO, 1 - morbido(-0.2, 0.15, h)).lerp(SOTTACQUA, 1 - morbido(-0.6, -0.25, h));
      colore.multiplyScalar(0.92 + rumorePalude(x * 5, z * 5, 21) * 0.16);
      colori.set([colore.r, colore.g, colore.b], i * 3);
      misti[i] = morbido(0.0, 0.5, h) * morbido(0.4, 0.75, macchia);
    }
  }
  const indici = [];
  for (let r = 0; r < righe - 1; r++) {
    for (let c = 0; c < colonne - 1; c++) {
      const a = r * colonne + c;
      const b = a + 1;
      const d = a + colonne;
      const e = d + 1;
      if (piatta[a] && piatta[b] && piatta[d] && piatta[e]) continue;
      if (!vicino[a] && !vicino[b] && !vicino[d] && !vicino[e]) continue;
      indici.push(a, d, b, b, d, e);
    }
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(posizioni, 3));
  geometria.setAttribute('color', new THREE.BufferAttribute(colori, 3));
  geometria.setAttribute('misto', new THREE.BufferAttribute(misti, 1));
  geometria.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geometria.setIndex(indici);
  geometria.computeVertexNormals();
  geometria.computeBoundingSphere();
  const mesh = new THREE.Mesh(geometria, materialeTerreno(reali));
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  scena.add(mesh);
  return mesh;
}
