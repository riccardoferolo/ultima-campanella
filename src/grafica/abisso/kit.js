import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { creaRumore } from './rumore.js';

const CARTELLA = './abisso/';
const LATO_RISERVA = 512;
export const SET_TEXTURE = Object.freeze({
  lamiera: ['diff', 'nor', 'rough'],
  paratia: ['diff', 'nor', 'rough'],
  marmo: ['diff', 'nor', 'rough', 'ao'],
  pietraMarina: ['diff', 'nor', 'rough'],
  roccia: ['diff', 'nor', 'rough'],
  fondale: ['diff', 'nor', 'rough'],
  graffiato: ['diff', 'nor', 'rough'],
  pelle: ['diff', 'nor', 'rough'],
});
const TINTE_RISERVA = Object.freeze({
  lamiera: ['#4a3a2c', '#8a5228'], paratia: ['#3e5258', '#6b4a2a'], marmo: ['#cfcabe', '#a8a296'], pietraMarina: ['#8e8670', '#6a705e'],
  roccia: ['#262428', '#3c3a3a'], fondale: ['#6e6650', '#4c4838'], graffiato: ['#6a6e74', '#8a8e94'], pelle: ['#2e2622', '#4a3a32'],
});
const NOMI_CANALI = Object.freeze({ diff: 'map', nor: 'normalMap', rough: 'roughnessMap', ao: 'aoMap' });

export const CAUSTICHE_GLSL = /* glsl */`
uniform float uTempo;
uniform vec3 uCaustica;
uniform float uForzaCaustica;
varying vec3 vMondo;
float causticaAbisso(vec2 p, float t) {
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    vec2 d = max(abs(vec2(sin(i.x + tt), cos(i.y + tt))), vec2(0.001)) / inten;
    c += 1.0 / max(length(p / d), 0.001);
  }
  c /= 4.0;
  c = 1.17 - pow(max(c, 0.0), 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 2.0);
}
`;

const NORMALE_MINIMA = 1e-10;

export function sanaNormali(geometria) {
  const normali = geometria?.attributes?.normal;
  if (!normali) return 0;
  let sanate = 0;
  for (let i = 0; i < normali.count; i++) {
    const x = normali.getX(i);
    const y = normali.getY(i);
    const z = normali.getZ(i);
    const lunghezza = x * x + y * y + z * z;
    if (lunghezza > NORMALE_MINIMA && Number.isFinite(lunghezza)) continue;
    normali.setXYZ(i, 0, 1, 0);
    sanate++;
  }
  if (sanate) normali.needsUpdate = true;
  return sanate;
}

export function creaUniformi() {
  return {
    uTempo: { value: 0 },
    uCaustica: { value: new THREE.Color(0x2fa8c8) },
    uForzaCaustica: { value: 0.5 },
  };
}

export function conCaustiche(materiale, uniformi, { peso = 1, scala = 0.34, chiave = 'base' } = {}) {
  const prima = materiale.onBeforeCompile;
  materiale.onBeforeCompile = (shader, renderer) => {
    prima?.call(materiale, shader, renderer);
    Object.assign(shader.uniforms, { uTempo: uniformi.uTempo, uCaustica: uniformi.uCaustica, uForzaCaustica: uniformi.uForzaCaustica });
    const senzaDoppi = (codice, glsl) => glsl.split('\n').filter(riga => !/^(uniform|varying) /.test(riga.trim()) || !codice.includes(riga.trim())).join('\n');
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${senzaDoppi(shader.vertexShader, 'varying vec3 vMondo;')}`)
      .replace('#include <project_vertex>', `#include <project_vertex>
#ifdef USE_INSTANCING
  vMondo = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
  vMondo = (modelMatrix * vec4(transformed, 1.0)).xyz;
#endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${senzaDoppi(shader.fragmentShader, CAUSTICHE_GLSL)}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  {
    vec3 nMondo = inverseTransformDirection(normal, viewMatrix);
    float sopra = 0.35 + 0.65 * max(nMondo.y, 0.0);
    vec2 p = vMondo.xz * ${scala.toFixed(3)} + vec2(vMondo.y * 0.21, -vMondo.y * 0.17);
    float c = causticaAbisso(p * 6.2831, uTempo * 0.55) * 0.6 + causticaAbisso(p * 4.1 + 3.7, uTempo * 0.4) * 0.4;
    totalEmissiveRadiance += uCaustica * c * uForzaCaustica * ${peso.toFixed(3)} * sopra * diffuseColor.rgb;
  }`);
  };
  const chiavePrima = materiale.customProgramCacheKey?.bind(materiale);
  materiale.customProgramCacheKey = () => `caustiche|${scala}|${peso}|${chiave}|${chiavePrima ? chiavePrima() : ''}`;
  return materiale;
}

function tela(lato, pittore) {
  const c = document.createElement('canvas');
  c.width = c.height = lato;
  pittore(c.getContext('2d'), lato);
  return c;
}

function texturaRiserva(chiave, canale) {
  const rumore = creaRumore(chiave.length * 131 + canale.length);
  const [scura, chiara] = TINTE_RISERVA[chiave] ?? ['#444', '#888'];
  const lato = LATO_RISERVA;
  const altezze = new Float32Array(lato * lato);
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const u = (x / lato) * Math.PI * 2;
      const v = (y / lato) * Math.PI * 2;
      altezze[y * lato + x] = rumore.fbm(Math.cos(u) * 3, Math.sin(u) * 3 + Math.cos(v) * 3, Math.sin(v) * 3, 5);
    }
  }
  const c = tela(lato, (ctx) => {
    const img = ctx.createImageData(lato, lato);
    const a = new THREE.Color(scura);
    const b = new THREE.Color(chiara);
    const col = new THREE.Color();
    for (let i = 0; i < lato * lato; i++) {
      const h = altezze[i];
      const o = i * 4;
      if (canale === 'diff') {
        col.copy(a).lerp(b, Math.min(1, Math.max(0, h * 0.8 + 0.5)));
        img.data[o] = col.r * 255; img.data[o + 1] = col.g * 255; img.data[o + 2] = col.b * 255;
      } else if (canale === 'nor') {
        const x = i % lato;
        const y = (i - x) / lato;
        const dx = altezze[y * lato + ((x + 1) % lato)] - altezze[y * lato + ((x - 1 + lato) % lato)];
        const dy = altezze[((y + 1) % lato) * lato + x] - altezze[((y - 1 + lato) % lato) * lato + x];
        const n = new THREE.Vector3(-dx * 5, -dy * 5, 1).normalize();
        img.data[o] = (n.x * 0.5 + 0.5) * 255; img.data[o + 1] = (n.y * 0.5 + 0.5) * 255; img.data[o + 2] = (n.z * 0.5 + 0.5) * 255;
      } else {
        const g = Math.min(1, Math.max(0, (canale === 'rough' ? 0.65 : 0.85) + h * 0.3)) * 255;
        img.data[o] = img.data[o + 1] = img.data[o + 2] = g;
      }
      img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  });
  const t = new THREE.CanvasTexture(c);
  if (canale === 'diff') t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

async function caricaUna(loader, chiave, canale) {
  for (const estensione of ['jpg', 'png']) {
    try {
      const t = await loader.loadAsync(`${CARTELLA}texture/${chiave}_${canale}.${estensione}`);
      if (canale === 'diff') t.colorSpace = THREE.SRGBColorSpace;
      return t;
    } catch {
      continue;
    }
  }
  return texturaRiserva(chiave, canale);
}

const TINTA_ABISSALE = Object.freeze([0.5, 0.78, 1]);
const LUCE_MASSIMA_AMBIENTE = 1.4;

function abissale(dati) {
  for (let i = 0; i < dati.length; i += 4) {
    const picco = Math.max(dati[i], dati[i + 1], dati[i + 2], 1e-6);
    const riduci = picco > LUCE_MASSIMA_AMBIENTE ? LUCE_MASSIMA_AMBIENTE / picco : 1;
    const luminanza = (dati[i] * 0.3 + dati[i + 1] * 0.59 + dati[i + 2] * 0.11) * riduci;
    for (let c = 0; c < 3; c++) dati[i + c] = (dati[i + c] * riduci * 0.35 + luminanza * 0.65) * TINTA_ABISSALE[c];
  }
}

export async function caricaRisorseAbisso(renderer, { piene = true } = {}) {
  const loader = new THREE.TextureLoader();
  const voci = await Promise.all(Object.entries(SET_TEXTURE).map(async ([chiave, canali]) => {
    const scelti = piene ? canali : ['diff'];
    const caricate = await Promise.all(scelti.map(c => caricaUna(loader, chiave, c)));
    const set = {};
    scelti.forEach((c, i) => {
      const t = caricate[i];
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      set[NOMI_CANALI[c]] = t;
    });
    return [chiave, set];
  }));
  let ambiente = null;
  try {
    const hdr = await new RGBELoader().setDataType(THREE.FloatType).loadAsync(`${CARTELLA}hdri/notte.hdr`);
    abissale(hdr.image.data);
    const pmrem = new THREE.PMREMGenerator(renderer);
    ambiente = pmrem.fromEquirectangular(hdr).texture;
    hdr.dispose();
    pmrem.dispose();
  } catch {
    ambiente = null;
  }
  return { texture: Object.fromEntries(voci), ambiente };
}

function copiaSet(set, ripeti) {
  const copia = {};
  for (const [canale, t] of Object.entries(set ?? {})) {
    const c = t.clone();
    c.repeat.set(ripeti, ripeti);
    c.needsUpdate = true;
    copia[canale] = c;
  }
  return copia;
}

function texturaGrata() {
  const c = tela(256, (ctx, l) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, l, l);
    ctx.fillStyle = '#fff';
    const passo = l / 8;
    for (let i = 0; i <= 8; i++) {
      ctx.fillRect(i * passo - 5, 0, 10, l);
      ctx.fillRect(0, i * passo - 3, l, 6);
    }
  });
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function texturaVetro() {
  const rumore = creaRumore(77);
  const lato = 512;
  const altezze = new Float32Array(lato * lato);
  for (let y = 0; y < lato; y++) for (let x = 0; x < lato; x++) {
    const u = x / lato;
    const v = y / lato;
    const [d1, d2] = rumore.cellule(u * 26, v * 26, 0.5);
    const goccia = Math.max(0, 0.32 - d1) * 3;
    const crepa = Math.max(0, 0.06 - Math.abs(rumore.creste(u * 3.2, v * 3.2, 1.7, 3) - 0.62)) * 9;
    altezze[y * lato + x] = goccia * 0.8 + crepa * 0.6 + (d2 - d1) * 0.05;
  }
  const c = tela(lato, ctx => {
    const img = ctx.createImageData(lato, lato);
    for (let y = 0; y < lato; y++) for (let x = 0; x < lato; x++) {
      const i = y * lato + x;
      const dx = altezze[y * lato + ((x + 1) % lato)] - altezze[y * lato + ((x - 1 + lato) % lato)];
      const dy = altezze[((y + 1) % lato) * lato + x] - altezze[((y - 1 + lato) % lato) * lato + x];
      const n = new THREE.Vector3(-dx * 3, -dy * 3, 1).normalize();
      img.data[i * 4] = (n.x * 0.5 + 0.5) * 255;
      img.data[i * 4 + 1] = (n.y * 0.5 + 0.5) * 255;
      img.data[i * 4 + 2] = (n.z * 0.5 + 0.5) * 255;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  });
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function uvMetri(geometria, scala = 1) {
  const g = geometria.index ? geometria.toNonIndexed() : geometria;
  if (!g.attributes.normal) g.computeVertexNormals();
  const p = g.attributes.position;
  const n = g.attributes.normal;
  const uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i += 3) {
    let nx = 0; let ny = 0; let nz = 0;
    for (let k = 0; k < 3; k++) {
      nx += Math.abs(n.getX(i + k));
      ny += Math.abs(n.getY(i + k));
      nz += Math.abs(n.getZ(i + k));
    }
    for (let k = 0; k < 3; k++) {
      const j = i + k;
      const [u, v] = nx >= ny && nx >= nz ? [p.getZ(j), p.getY(j)] : ny >= nz ? [p.getX(j), p.getZ(j)] : [p.getX(j), p.getY(j)];
      uv[j * 2] = u * scala;
      uv[j * 2 + 1] = v * scala;
    }
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

export function deforma(geometria, rumore, { ampiezza = 0.2, frequenza = 1, ottave = 4, seme = 0, lungo = null } = {}) {
  const g = geometria.index ? mergeVertices(geometria.deleteAttribute('uv') ?? geometria) : geometria;
  g.computeVertexNormals();
  const p = g.attributes.position;
  const n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const d = rumore.fbm(x * frequenza + seme, y * frequenza - seme * 0.7, z * frequenza + seme * 1.3, ottave) * ampiezza * (lungo ? lungo(x, y, z) : 1);
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d);
  }
  g.computeVertexNormals();
  return g;
}

export function creaKit(scena, { risorse, qualita, luciAccese = 3 }) {
  const uniformi = creaUniformi();
  const rumore = creaRumore(4242);
  const tex = risorse?.texture ?? {};
  const pbr = (chiave, ripeti, { rilievo = 1, ...opzioni } = {}, caustiche = { peso: 1 }) => {
    const set = copiaSet(tex[chiave], ripeti);
    const m = new THREE.MeshStandardMaterial({ ...set, ...opzioni });
    if (m.normalMap) m.normalScale = new THREE.Vector2(rilievo, rilievo);
    return caustiche ? conCaustiche(m, uniformi, { ...caustiche, chiave }) : m;
  };
  const grata = texturaGrata();
  const normaliVetro = texturaVetro();
  const mat = {
    lamiera: pbr('lamiera', 0.5, { metalness: 0.55, roughness: 1 }),
    lamieraScura: pbr('lamiera', 0.7, { color: 0x6a6460, metalness: 0.6, roughness: 1 }),
    paratia: pbr('paratia', 0.6, { metalness: 0.45, roughness: 1 }),
    acciaio: pbr('graffiato', 0.8, { color: 0x6c7278, metalness: 0.92, roughness: 0.9 }),
    ottone: pbr('graffiato', 1.2, { color: 0xc4954a, metalness: 1, roughness: 0.75, map: null }),
    rame: pbr('graffiato', 1.1, { color: 0xb8673e, metalness: 1, roughness: 0.7, map: null }),
    grata: conCaustiche(new THREE.MeshStandardMaterial({ color: 0x5d6266, metalness: 0.85, roughness: 0.55, alphaMap: grata, alphaTest: 0.5, side: THREE.DoubleSide }), uniformi, { chiave: 'grata' }),
    marmo: pbr('marmo', 0.4, { roughness: 0.9 }),
    marmoScuro: pbr('marmo', 0.35, { color: 0x8a8f96, roughness: 1 }),
    pietra: pbr('pietraMarina', 0.4, { roughness: 1 }),
    roccia: pbr('roccia', 0.3, { roughness: 1, rilievo: 1.4 }),
    fondale: pbr('fondale', 0.22, { roughness: 1, rilievo: 1.2 }),
    pelle: pbr('pelle', 1.5, { color: 0x6a7a80, roughness: 0.55, metalness: 0.1 }, null),
    gomma: new THREE.MeshStandardMaterial({ color: 0x141618, roughness: 0.75 }),
    oricalco: new THREE.MeshStandardMaterial({ color: 0x0a2a38, emissive: 0x2fd0ff, emissiveIntensity: 2.4, roughness: 0.25, metalness: 0.2 }),
    oro: pbr('graffiato', 1.4, { color: 0xd9a441, metalness: 1, roughness: 0.55, map: null }),
    luceCalda: new THREE.MeshStandardMaterial({ color: 0x2a1a08, emissive: 0xffb060, emissiveIntensity: 3 }),
    luceFredda: new THREE.MeshStandardMaterial({ color: 0x082028, emissive: 0x7fe4ff, emissiveIntensity: 3 }),
    luceRossa: new THREE.MeshStandardMaterial({ color: 0x200404, emissive: 0xff2a1a, emissiveIntensity: 3 }),
    vetro: new THREE.MeshPhysicalMaterial({ color: 0x7fc4d4, metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.2, normalMap: normaliVetro, normalScale: new THREE.Vector2(0.35, 0.35), envMapIntensity: 1.2, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }),
  };
  mat.grata.map = null;
  normaliVetro.repeat.set(0.25, 0.25);

  const lotti = new Map();
  const lotto = (materiale, settore = 'comune') => {
    const chiave = `${settore}|${materiale.uuid}`;
    if (!lotti.has(chiave)) lotti.set(chiave, { materiale, geometrie: [], ombra: false, riceve: true });
    return {
      aggiungi(geometria, matrice = null, { ombra = false } = {}) {
        const g = geometria.index ? geometria.toNonIndexed() : geometria.clone();
        if (matrice) g.applyMatrix4(matrice);
        for (const nome of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(nome)) g.deleteAttribute(nome);
        if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
        if (!g.attributes.normal) g.computeVertexNormals();
        const voce = lotti.get(chiave);
        voce.geometrie.push(g);
        voce.ombra ||= ombra;
      },
    };
  };
  function chiudiLotti() {
    for (const voce of lotti.values()) {
      const { materiale } = voce;
      if (!voce.geometrie.length) continue;
      const conColore = voce.geometrie.some(g => g.attributes.color);
      if (conColore) {
        for (const g of voce.geometrie) {
          if (g.attributes.color) continue;
          g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 3).fill(1), 3));
        }
      } else for (const g of voce.geometrie) if (g.attributes.color) g.deleteAttribute('color');
      const unita = mergeGeometries(voce.geometrie, false);
      voce.geometrie.forEach(g => g.dispose());
      voce.geometrie = [];
      unita.computeBoundingSphere();
      const mesh = new THREE.Mesh(unita, materiale);
      mesh.receiveShadow = voce.riceve;
      mesh.castShadow = voce.ombra && !!qualita?.ombre;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      scena.add(mesh);
    }
    lotti.clear();
  }

  const fonti = [];
  const aggiornatori = [];
  const ascoltatori = [];
  const nebbie = [];
  const inquadrature = [];
  const svuotatori = [];
  return {
    scena,
    qualita,
    luciAccese,
    uniformi,
    rumore,
    tex,
    mat,
    lotto,
    chiudiLotti,
    uvMetri,
    deforma: (g, opzioni) => deforma(g, rumore, opzioni),
    luce(fonte) {
      fonti.push({ intensita: 10, portata: 16, colore: 0xffffff, y: 3, ...fonte });
      return fonti[fonti.length - 1];
    },
    fonti,
    ogniFotogramma: fn => aggiornatori.push(fn),
    suEvento: fn => ascoltatori.push(fn),
    suNebbia: fn => nebbie.push(fn),
    suInquadratura: fn => inquadrature.push(fn),
    suSvuota: fn => svuotatori.push(fn),
    svuotatori,
    aggiornatori,
    ascoltatori,
    nebbie,
    inquadrature,
    ombra(oggetto, proietta = true, riceve = true) {
      oggetto.traverse(o => {
        if (!o.isMesh) return;
        o.castShadow = proietta && !!qualita?.ombre;
        o.receiveShadow = riceve;
      });
      return oggetto;
    },
  };
}
