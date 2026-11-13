import * as THREE from 'three';
import { quota, tetto } from '../../mappa.js';
import { livelloAcqua } from '../../abisso.js';
import { REATTORE, DELTA } from '../../mappe/abisso.js';
import { RUMORE_GLSL, NEBBIA_GLSL, creaMaterialeVortice, aggiornaMimetica, frastaglia, texturaAlone } from './armi3d.js';

const PI = Math.PI;
const DT_MASSIMO = 0.1;
const COLORI = Object.freeze({
  cariddi: 0x3fc8ff, maelstrom: 0xa05cff, tridente: 0x5fe8ff, ira: 0xc070ff, laser: 0xff2a1a,
  schiuma: 0xe4fbff, vapore: 0xf2f6f8, sangue: 0x4a0505, bolla: 0xbff2ff, plancton: 0x5fe8ff,
});
const RAGGIO_GLOBO = 8;
const FATTORE_GLOBO = 0.45;
const NUCLEO_GLOBO = 0.24;
const DURATA_ESPANSIONE = 0.38;
const DURATA_COLLASSO = 0.25;
const ATTESA_IMPLOSIONE = 0.35;
const DURATA_ONDA = 0.25;
const SVANIRE_ONDA = 0.14;
const APERTURA_ONDA = 1.15;
const RAGGIO_ONDA = 1.6;
const DURATA_FULMINE = 0.45;
const ARCHI_OGNI = 0.05;
const ARCHI_POZZA_OGNI = 0.07;
const DURATA_SONICA = 0.5;
const PORTATA_SONICA = 6.5;
const ARCO_SONICA = 0.62;
const ANELLI_SONICI = 6;
const DURATA_MIRA = 1.4;
const VOLO_ARPIONE = 0.12;
const RITIRO_ARPIONE = 0.55;
const FINE_ARPIONE = 0.75;
const PASSO_CATENA = 0.085;
const ALTEZZA_ELMO = 1.6;
const ALTEZZA_CATENA = 1.2;
const VITA_PEZZI = 4;
const RAGGIO_SFERA = 0.3;
const LATO_AMBIENTE = 24;
const PLANCTON = 1600;
const BOLLE_AMBIENTE = 320;
const COLONNE_BOLLE = 14;
const VICINO_ACQUA = 14;

const tempoU = { value: 0 };
const fermo = (v, a, b) => Math.min(b, Math.max(a, v));
const caso = (a, b) => a + Math.random() * (b - a);
const liscio = t => t * t * (3 - 2 * t);
const esce = t => 1 - (1 - t) ** 3;
const rimbalzo = t => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;
const v3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const colore = hex => new THREE.Color(hex);
const ASSE_Y = v3(0, 1, 0);
const ASSE_Z = v3(0, 0, 1);

const VERTICE_LOCALE = `
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
void main() {
  vLocale = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormaleVista = normalize(normalMatrix * normal);
  vVerso = -mv.xyz;
  vDistanza = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_CORRENTI = `
uniform float uTempo;
uniform float uVelocita;
uniform float uAlfa;
uniform vec3 uColore;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  vec3 pl = normalize(vLocale);
  float phi = atan(pl.z, pl.x);
  float r = length(pl.xz);
  float vel = uVelocita * (0.6 + 1.2 * (1.0 - r));
  float n = fbmAbisso(vec3(pl.x * 2.0, pl.y * 3.0 - uTempo * 0.4, pl.z * 2.0));
  float elica = phi * 3.0 + pl.y * 7.0 - uTempo * vel * 2.0 + n * 3.0;
  float fil = pow(abs(sin(elica)), 24.0) + pow(abs(sin(elica * 2.0 + 1.3)), 40.0) * 0.6;
  float giro = phi - uTempo * vel;
  float maschera = smoothstep(0.34, 0.6, fbmAbisso(vec3(cos(giro) * 1.6, pl.y * 4.0, sin(giro) * 1.6)));
  float faccia = abs(dot(normalize(vNormaleVista), normalize(vVerso)));
  float a = (fil * maschera * (0.3 + 0.7 * (1.0 - faccia)) * 1.3 + pow(max(1.0 - faccia, 0.0), 3.0) * 0.06) * uAlfa;
  gl_FragColor = vec4(uColore * a * 1.6 * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const FRAMMENTO_URTO = `
uniform float uTempo;
uniform float uAlfa;
uniform vec3 uColore;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  float faccia = abs(dot(normalize(vNormaleVista), normalize(vVerso)));
  float bordo = pow(max(1.0 - faccia, 0.0), 6.0);
  float rotture = smoothstep(0.3, 0.75, fbmAbisso(normalize(vLocale) * 5.0 + uTempo * 3.0));
  vec3 c = uColore * bordo * rotture * 1.4 + vec3(1.0) * pow(bordo, 3.0) * rotture * 0.5;
  gl_FragColor = vec4(c * uAlfa * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const VERTICE_UV = `
varying vec2 vUv;
varying float vDistanza;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDistanza = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_LAMA = `
uniform float uTempo;
uniform float uAlfa;
uniform float uSeme;
uniform vec3 uColore;
varying vec2 vUv;
varying float vDistanza;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  float u = vUv.x;
  float v = vUv.y;
  float punte = pow(sin(3.14159 * u), 0.7);
  float bordo = smoothstep(0.0, 0.35, v) * smoothstep(1.0, 0.78, v);
  float flusso = fbmAbisso(vec3(u * 7.0 - uTempo * 5.0, v * 2.5, uSeme));
  float striature = pow(abs(sin(u * 48.0 + flusso * 7.0 - uTempo * 18.0)), 5.0);
  float schiuma = smoothstep(0.6, 0.95, v) * (0.5 + flusso);
  vec3 c = uColore * (0.35 + flusso * 0.9 + striature * 0.7) + vec3(0.85, 0.95, 1.0) * schiuma * 0.9;
  float a = bordo * punte * uAlfa * (0.55 + flusso * 0.6);
  gl_FragColor = vec4(c * a * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const VERTICE_NASTRI = `
attribute vec4 aColore;
attribute float aLato;
varying vec4 vColore;
varying float vLato;
varying float vDistanza;
void main() {
  vColore = aColore;
  vLato = aLato;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDistanza = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_NASTRI = `
varying vec4 vColore;
varying float vLato;
varying float vDistanza;
${NEBBIA_GLSL}
void main() {
  float c = 1.0 - abs(vLato);
  vec3 luce = vColore.rgb * pow(c, 1.5) * 1.4 + vec3(1.0) * pow(c, 8.0) * 1.8;
  gl_FragColor = vec4(luce * vColore.a * (1.0 - fattoreNebbia(vDistanza) * 0.85), 1.0);
}
`;

const VERTICE_CARTELLONI = `
attribute vec4 aCentro;
attribute vec4 aColore;
attribute vec2 aExtra;
varying vec2 vUv;
varying vec4 vColore;
varying float vSeme;
varying float vDistanza;
void main() {
  vec4 mv = viewMatrix * vec4(aCentro.xyz, 1.0);
  float c = cos(aExtra.x);
  float s = sin(aExtra.x);
  mv.xy += vec2(c * position.x - s * position.y, s * position.x + c * position.y) * aCentro.w;
  vDistanza = -mv.z;
  vUv = uv;
  vColore = aColore;
  vSeme = aExtra.y;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_CARTELLONI = `
uniform sampler2D uMappa;
uniform float uTempo;
varying vec2 vUv;
varying vec4 vColore;
varying float vSeme;
varying float vDistanza;
${NEBBIA_GLSL}
void main() {
  vec2 uv = vUv;
#ifdef CALORE
  uv += vec2(sin(uv.y * 13.0 + uTempo * 4.0 + vSeme * 7.0), cos(uv.x * 11.0 + uTempo * 3.3 + vSeme * 5.0)) * 0.03;
#endif
  vec4 t = texture2D(uMappa, uv);
  float a = t.a * vColore.a * smoothstep(0.12, 0.8, vDistanza);
  float nebbia = fattoreNebbia(vDistanza);
#ifdef ADDITIVO
  gl_FragColor = vec4(vColore.rgb * t.rgb * a * (1.0 - nebbia), 1.0);
#else
  vec3 c = vColore.rgb * t.rgb;
#ifdef USE_FOG
  c = mix(c, fogColor, nebbia);
#endif
  gl_FragColor = vec4(c, a);
#endif
}
`;

const VERTICE_PUNTI = `
attribute vec3 aColore;
attribute float aDimensione;
attribute float aAlfa;
attribute float aForma;
uniform float uAltezza;
varying vec3 vColore;
varying float vAlfa;
varying float vForma;
varying float vDistanza;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vDistanza = -mv.z;
  float px = aDimensione * projectionMatrix[1][1] * uAltezza * 0.5 / max(0.05, -mv.z);
  gl_PointSize = clamp(px, 1.5, 96.0);
  vAlfa = aAlfa * clamp(px / 1.5, 0.0, 1.0);
  vColore = aColore;
  vForma = aForma;
}
`;

const FRAMMENTO_PUNTI = `
varying vec3 vColore;
varying float vAlfa;
varying float vForma;
varying float vDistanza;
${NEBBIA_GLSL}
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = length(p);
  if (d > 1.0 || vAlfa <= 0.001) discard;
  float a;
  if (vForma > 0.5 && vForma < 1.5) {
    a = smoothstep(0.6, 0.86, d) * smoothstep(1.0, 0.9, d) + smoothstep(0.35, 0.0, length(p - vec2(-0.35, -0.35))) * 0.9 + 0.05;
  } else {
    a = pow(max(1.0 - d, 0.0), 2.0) + pow(max(0.0, 1.0 - d * 2.5), 2.0) * 1.5;
  }
  gl_FragColor = vec4(vColore * a * vAlfa * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const VERTICE_AMBIENTE = `
attribute vec3 aColore;
attribute vec3 aDeriva;
attribute vec4 aDati;
uniform vec3 uCentro;
uniform float uTempo;
uniform float uLato;
uniform float uDensita;
uniform float uAltezza;
varying vec3 vColore;
varying float vAlfa;
varying float vForma;
varying float vDistanza;
void main() {
  float fase = aDati.x * 6.2831;
  vec3 p = position + aDeriva * uTempo + vec3(sin(uTempo * 0.31 + fase), sin(uTempo * 0.23 + fase * 1.7) * 0.5, cos(uTempo * 0.27 + fase * 2.3)) * 0.45;
  if (aDati.w > 0.5) {
    p.y += uTempo * (0.45 + aDati.x * 0.7);
    p.x += sin(uTempo * 3.1 + fase * 7.0) * 0.05;
    p.z += cos(uTempo * 2.7 + fase * 5.0) * 0.05;
  }
  p = mod(p - uCentro + uLato * 0.5, uLato) - uLato * 0.5 + uCentro;
  float bordo = 1.0 - smoothstep(uLato * 0.3, uLato * 0.5, length(p - uCentro));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vDistanza = -mv.z;
  float px = aDati.y * projectionMatrix[1][1] * uAltezza * 0.5 / max(0.2, -mv.z);
  gl_PointSize = clamp(px, 1.0, 24.0);
  float scintilla = 0.55 + 0.45 * sin(uTempo * (0.8 + aDati.x * 2.2) + fase * 5.0);
  vAlfa = bordo * step(aDati.z, uDensita) * (aDati.w > 0.5 ? 0.6 : scintilla) * clamp(px, 0.0, 1.0);
  vColore = aColore;
  vForma = aDati.w;
}
`;

const VERTICE_ANELLI = `
attribute vec4 aDati;
attribute vec3 aColore;
varying vec2 vUv;
varying vec4 vDati;
varying vec3 vColore;
varying float vDistanza;
void main() {
  vUv = uv;
  vDati = aDati;
  vColore = aColore;
  vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  vDistanza = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_ANELLI = `
uniform float uTempo;
varying vec2 vUv;
varying vec4 vDati;
varying vec3 vColore;
varying float vDistanza;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float ang = atan(p.y, p.x);
  float w = vDati.y;
  float rr = vDati.x + (rumoreAbisso(vec3(cos(ang) * 3.0, sin(ang) * 3.0, vDati.w + uTempo * 2.0)) - 0.5) * w * 1.5;
  float aR = exp(-pow((r - rr + w * 0.4) / w, 2.0));
  float aG = exp(-pow((r - rr) / w, 2.0));
  float aB = exp(-pow((r - rr - w * 0.4) / w, 2.0));
  vec3 c = vColore * vec3(aR, aG, aB) * 1.4 + vec3(1.0) * pow(aG, 4.0) * 0.5 + vColore * smoothstep(rr, 0.0, r) * 0.06;
  gl_FragColor = vec4(c * vDati.z * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const VERTICE_ISTANZE = `
attribute vec4 aDati;
varying vec2 vUv;
varying vec4 vDati;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
void main() {
  vUv = uv;
  vDati = aDati;
  vLocale = position;
  vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  vNormaleVista = normalize(normalMatrix * mat3(instanceMatrix) * normal);
  vVerso = -mv.xyz;
  vDistanza = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_POZZE = `
uniform float uTempo;
uniform vec3 uColore;
uniform vec3 uColoreForte;
varying vec2 vUv;
varying vec4 vDati;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float seme = vDati.y;
  float bordo = fbmAbisso(vec3(p * 3.0, seme)) * 0.22;
  float maschera = smoothstep(1.0, 0.72, r + bordo);
  float n = fbmAbisso(vec3(p * 4.2, uTempo * 0.7 + seme));
  float vene = pow(max(1.0 - abs(n * 2.0 - 1.0), 0.0), 18.0);
  float vene2 = pow(max(1.0 - abs(fbmAbisso(vec3(p * 7.0 + 3.1, uTempo * 1.3 - seme)) * 2.0 - 1.0), 0.0), 20.0);
  float onde = pow(0.5 + 0.5 * sin(r * 28.0 - uTempo * 5.0 + n * 4.0), 8.0) * 0.25;
  vec3 tinta = mix(uColore, uColoreForte, vDati.z);
  float scatto = 0.75 + 0.25 * sin(uTempo * 37.0 + seme * 11.0) * sin(uTempo * 23.0 + seme);
  vec3 c = tinta * (0.08 + onde + (vene + vene2) * 1.3 * scatto) + vec3(1.0) * pow(vene, 3.0) * 0.5;
  gl_FragColor = vec4(c * maschera * vDati.x * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

const FRAMMENTO_BOLLE = `
uniform float uTempo;
varying vec2 vUv;
varying vec4 vDati;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
varying float vDistanza;
${NEBBIA_GLSL}
void main() {
  vec3 n = normalize(vNormaleVista);
  float f = 1.0 - abs(dot(n, normalize(vVerso)));
  vec3 iride = 0.5 + 0.5 * cos(6.2831 * (f * 1.3 + vLocale.y * 0.8 + uTempo * 0.15 + vec3(0.0, 0.33, 0.67)));
  float lucido = pow(max(0.0, dot(n, normalize(vec3(-0.45, 0.6, 0.65)))), 60.0);
  vec3 c = mix(vec3(0.55, 0.92, 1.0), iride, 0.55) * pow(f, 2.2) * 1.5 + vec3(1.0) * lucido * 2.2 + vec3(0.2, 0.7, 1.0) * 0.07;
  gl_FragColor = vec4(c * vDati.x * (1.0 - fattoreNebbia(vDistanza)), 1.0);
}
`;

function tela(lato, pittore) {
  const c = document.createElement('canvas');
  c.width = c.height = lato;
  pittore(c.getContext('2d'), lato);
  return c;
}

function texturaFumo(rumore) {
  const lato = 128;
  const t = new THREE.CanvasTexture(tela(lato, ctx => {
    const img = ctx.createImageData(lato, lato);
    for (let y = 0; y < lato; y++) {
      for (let x = 0; x < lato; x++) {
        const u = (x / lato) * 2 - 1;
        const v = (y / lato) * 2 - 1;
        const r = Math.hypot(u, v);
        const n = rumore.fbm(u * 2.4 + 7, v * 2.4, 0.5, 4);
        const a = fermo((1 - r) * 1.5 + n * 0.7 - 0.2, 0, 1) * fermo((1 - r) * 3, 0, 1);
        const luce = 205 + fermo(-v * 40 + n * 30, -40, 50);
        const i = (y * lato + x) * 4;
        img.data[i] = luce;
        img.data[i + 1] = luce;
        img.data[i + 2] = luce;
        img.data[i + 3] = a * 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }));
  return t;
}

function shader(uniformi, vertexShader, fragmentShader, opzioni = {}) {
  const m = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, uniformi]),
    vertexShader,
    fragmentShader,
    fog: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    ...opzioni,
  });
  if (m.uniforms.uTempo) m.uniforms.uTempo = tempoU;
  return m;
}

function attributoDinamico(array, n, istanze = false) {
  const a = istanze ? new THREE.InstancedBufferAttribute(array, n) : new THREE.BufferAttribute(array, n);
  a.setUsage(THREE.DynamicDrawUsage);
  return a;
}

function altezzaBersaglio(renderer, v) {
  const rt = renderer.getRenderTarget();
  return rt ? rt.height : renderer.getDrawingBufferSize(v).y;
}

function creaNastri(scena, capienza) {
  const posizioni = new Float32Array(capienza * 3);
  const colori = new Float32Array(capienza * 4);
  const lati = new Float32Array(capienza);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', attributoDinamico(posizioni, 3));
  geometria.setAttribute('aColore', attributoDinamico(colori, 4));
  geometria.setAttribute('aLato', attributoDinamico(lati, 1));
  const mesh = new THREE.Mesh(geometria, shader({}, VERTICE_NASTRI, FRAMMENTO_NASTRI, { side: THREE.DoubleSide }));
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  scena.add(mesh);
  let n = 0;
  const lati3 = [];
  const tangente = v3();
  const versoCamera = v3();
  const occhio = v3();
  const vertice = (p, s, segno, c, a) => {
    posizioni[n * 3] = p.x + s.x * segno;
    posizioni[n * 3 + 1] = p.y + s.y * segno;
    posizioni[n * 3 + 2] = p.z + s.z * segno;
    colori[n * 4] = c.r;
    colori[n * 4 + 1] = c.g;
    colori[n * 4 + 2] = c.b;
    colori[n * 4 + 3] = a;
    lati[n] = segno;
    n += 1;
  };
  return {
    inizia(camera) {
      n = 0;
      occhio.copy(camera.position);
    },
    linea(punti, larghezza, tinta, alfa = 1, { coda = false, punta = 0 } = {}) {
      const k = punti.length;
      if (k < 2 || alfa <= 0.002) return;
      while (lati3.length < k) lati3.push(v3());
      for (let i = 0; i < k; i++) {
        const a = punti[Math.max(0, i - 1)];
        const b = punti[Math.min(k - 1, i + 1)];
        tangente.subVectors(b, a);
        versoCamera.subVectors(punti[i], occhio);
        const s = lati3[i].crossVectors(tangente, versoCamera);
        const l = s.length();
        if (l < 1e-6) s.set(0, larghezza * 0.5, 0);
        else s.multiplyScalar((larghezza * 0.5 * (1 - punta * (i / (k - 1)))) / l);
      }
      for (let i = 0; i < k - 1; i++) {
        if (n + 6 > capienza) return;
        const a0 = coda ? alfa * (i / (k - 1)) : alfa;
        const a1 = coda ? alfa * ((i + 1) / (k - 1)) : alfa;
        vertice(punti[i], lati3[i], -1, tinta, a0);
        vertice(punti[i], lati3[i], 1, tinta, a0);
        vertice(punti[i + 1], lati3[i + 1], 1, tinta, a1);
        vertice(punti[i], lati3[i], -1, tinta, a0);
        vertice(punti[i + 1], lati3[i + 1], 1, tinta, a1);
        vertice(punti[i + 1], lati3[i + 1], -1, tinta, a1);
      }
    },
    chiudi() {
      geometria.setDrawRange(0, n);
      mesh.visible = n > 0;
      if (!n) return;
      for (const nome of ['position', 'aColore', 'aLato']) {
        const a = geometria.attributes[nome];
        a.clearUpdateRanges();
        a.addUpdateRange(0, n * a.itemSize);
        a.needsUpdate = true;
      }
    },
  };
}

function creaCartelloni(scena, capienza, { additivo, texture, calore = false, ordine = 4 }) {
  const piano = new THREE.PlaneGeometry(1, 1);
  const geometria = new THREE.InstancedBufferGeometry();
  geometria.index = piano.index;
  geometria.setAttribute('position', piano.attributes.position);
  geometria.setAttribute('uv', piano.attributes.uv);
  const centri = new Float32Array(capienza * 4);
  const colori = new Float32Array(capienza * 4);
  const extra = new Float32Array(capienza * 2);
  geometria.setAttribute('aCentro', attributoDinamico(centri, 4, true));
  geometria.setAttribute('aColore', attributoDinamico(colori, 4, true));
  geometria.setAttribute('aExtra', attributoDinamico(extra, 2, true));
  geometria.instanceCount = 0;
  const materiale = shader({ uMappa: { value: texture }, uTempo: { value: 0 } }, VERTICE_CARTELLONI, FRAMMENTO_CARTELLONI, {
    blending: additivo ? THREE.AdditiveBlending : THREE.NormalBlending,
    defines: { ...(additivo ? { ADDITIVO: 1 } : {}), ...(calore ? { CALORE: 1 } : {}) },
  });
  materiale.uniforms.uMappa.value = texture;
  const mesh = new THREE.Mesh(geometria, materiale);
  mesh.frustumCulled = false;
  mesh.renderOrder = ordine;
  scena.add(mesh);
  let n = 0;
  return {
    inizia() {
      n = 0;
    },
    metti(x, y, z, dimensione, tinta, alfa, rotazione = 0, seme = 0) {
      if (n >= capienza || alfa <= 0.002 || dimensione <= 0.001) return;
      centri.set([x, y, z, dimensione], n * 4);
      colori.set([tinta.r, tinta.g, tinta.b, alfa], n * 4);
      extra[n * 2] = rotazione;
      extra[n * 2 + 1] = seme;
      n += 1;
    },
    chiudi() {
      geometria.instanceCount = n;
      mesh.visible = n > 0;
      if (!n) return;
      for (const nome of ['aCentro', 'aColore', 'aExtra']) geometria.attributes[nome].needsUpdate = true;
    },
  };
}

function creaScintille(scena, capienza) {
  const pos = new Float32Array(capienza * 3);
  const col = new Float32Array(capienza * 3);
  const dim = new Float32Array(capienza);
  const alfa = new Float32Array(capienza);
  const forma = new Float32Array(capienza);
  const vel = new Float32Array(capienza * 3);
  const vita = new Float32Array(capienza);
  const durata = new Float32Array(capienza);
  const gravita = new Float32Array(capienza);
  const attrito = new Float32Array(capienza);
  const base = new Float32Array(capienza);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', attributoDinamico(pos, 3));
  geometria.setAttribute('aColore', attributoDinamico(col, 3));
  geometria.setAttribute('aDimensione', attributoDinamico(dim, 1));
  geometria.setAttribute('aAlfa', attributoDinamico(alfa, 1));
  geometria.setAttribute('aForma', attributoDinamico(forma, 1));
  const materiale = shader({ uAltezza: { value: 720 } }, VERTICE_PUNTI, FRAMMENTO_PUNTI);
  const punti = new THREE.Points(geometria, materiale);
  punti.frustumCulled = false;
  punti.renderOrder = 5;
  const misura = new THREE.Vector2();
  punti.onBeforeRender = renderer => {
    materiale.uniforms.uAltezza.value = altezzaBersaglio(renderer, misura);
  };
  scena.add(punti);
  let prossimo = 0;
  let vive = 0;
  return {
    emetti(x, y, z, vx, vy, vz, tinta, dimensione, secondi, g = 0, a = 0, f = 0) {
      const i = prossimo;
      prossimo = (prossimo + 1) % capienza;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      vel[i * 3] = vx;
      vel[i * 3 + 1] = vy;
      vel[i * 3 + 2] = vz;
      col[i * 3] = tinta.r;
      col[i * 3 + 1] = tinta.g;
      col[i * 3 + 2] = tinta.b;
      base[i] = dimensione;
      dim[i] = dimensione;
      vita[i] = secondi;
      durata[i] = secondi;
      gravita[i] = g;
      attrito[i] = a;
      forma[i] = f;
      alfa[i] = 1;
      vive = capienza;
    },
    aggiorna(dt, tempo) {
      if (!vive) return;
      let contate = 0;
      for (let i = 0; i < capienza; i++) {
        if (vita[i] <= 0) continue;
        vita[i] -= dt;
        if (vita[i] <= 0) {
          alfa[i] = 0;
          dim[i] = 0;
          continue;
        }
        contate += 1;
        const k = 1 / (1 + attrito[i] * dt);
        vel[i * 3] *= k;
        vel[i * 3 + 1] = (vel[i * 3 + 1] + gravita[i] * dt) * k;
        vel[i * 3 + 2] *= k;
        if (forma[i] === 1) {
          pos[i * 3] += Math.sin(tempo * 7 + i) * 0.25 * dt;
          pos[i * 3 + 2] += Math.cos(tempo * 6 + i * 1.3) * 0.25 * dt;
        }
        pos[i * 3] += vel[i * 3] * dt;
        pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
        pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        if (forma[i] === 2 && pos[i * 3 + 1] < quota(pos[i * 3], pos[i * 3 + 2])) {
          vita[i] = 0;
          alfa[i] = 0;
          dim[i] = 0;
          continue;
        }
        const f = vita[i] / durata[i];
        alfa[i] = Math.min(1, (1 - f) * 10) * f ** 0.6;
        dim[i] = base[i] * (forma[i] === 1 ? 0.7 + 0.3 * (1 - f) : 0.6 + 0.4 * f);
      }
      vive = contate;
      for (const nome of ['position', 'aColore', 'aDimensione', 'aAlfa', 'aForma']) geometria.attributes[nome].needsUpdate = true;
    },
    svuota() {
      vita.fill(0);
      alfa.fill(0);
      dim.fill(0);
      vive = 1;
    },
  };
}

function creaAnelli(scena, capienza) {
  const geometria = new THREE.PlaneGeometry(2, 2);
  const dati = new Float32Array(capienza * 4);
  const colori = new Float32Array(capienza * 3);
  geometria.setAttribute('aDati', attributoDinamico(dati, 4, true));
  geometria.setAttribute('aColore', attributoDinamico(colori, 3, true));
  const mesh = new THREE.InstancedMesh(geometria, shader({ uTempo: { value: 0 } }, VERTICE_ANELLI, FRAMMENTO_ANELLI, { side: THREE.DoubleSide }), capienza);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  mesh.count = 0;
  scena.add(mesh);
  const m = new THREE.Matrix4();
  const s = v3();
  let n = 0;
  return {
    inizia() {
      n = 0;
    },
    metti(posizione, quaternione, raggio, tinta, alfa, spessore = 0.08, seme = 0) {
      if (n >= capienza || alfa <= 0.002) return;
      const l = raggio * 1.25;
      mesh.setMatrixAt(n, m.compose(posizione, quaternione, s.set(l, l, l)));
      dati.set([0.8, spessore, alfa, seme], n * 4);
      colori.set([tinta.r, tinta.g, tinta.b], n * 3);
      n += 1;
    },
    chiudi() {
      mesh.count = n;
      mesh.visible = n > 0;
      if (!n) return;
      mesh.instanceMatrix.needsUpdate = true;
      geometria.attributes.aDati.needsUpdate = true;
      geometria.attributes.aColore.needsUpdate = true;
    },
  };
}

function creaIstanze(scena, geometria, materiale, capienza, ordine = 5) {
  const dati = new Float32Array(capienza * 4);
  geometria.setAttribute('aDati', attributoDinamico(dati, 4, true));
  const mesh = new THREE.InstancedMesh(geometria, materiale, capienza);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = ordine;
  mesh.count = 0;
  scena.add(mesh);
  const m = new THREE.Matrix4();
  let n = 0;
  return {
    mesh,
    inizia() {
      n = 0;
    },
    metti(posizione, quaternione, scala, a = 1, b = 0, c = 0, d = 0) {
      if (n >= capienza) return;
      mesh.setMatrixAt(n, m.compose(posizione, quaternione, scala));
      dati.set([a, b, c, d], n * 4);
      n += 1;
    },
    chiudi() {
      mesh.count = n;
      mesh.visible = n > 0;
      if (!n) return;
      mesh.instanceMatrix.needsUpdate = true;
      geometria.attributes.aDati.needsUpdate = true;
    },
  };
}

function creaAmbiente(scena, densita) {
  const plancton = Math.round(PLANCTON * densita);
  const bolle = Math.round(BOLLE_AMBIENTE * densita);
  const totale = plancton + bolle;
  const pos = new Float32Array(totale * 3);
  const col = new Float32Array(totale * 3);
  const deriva = new Float32Array(totale * 3);
  const dati = new Float32Array(totale * 4);
  const tinte = [colore(0x5fe8ff), colore(0x3fffd0), colore(0x9a6cff), colore(0x2fa8ff), colore(0xff6ad8)];
  const pesi = [0.42, 0.24, 0.16, 0.12, 0.06];
  const colonne = Array.from({ length: COLONNE_BOLLE }, () => [Math.random() * LATO_AMBIENTE, Math.random() * LATO_AMBIENTE]);
  for (let i = 0; i < totale; i++) {
    const bolla = i >= plancton;
    if (bolla) {
      const [cx, cz] = colonne[i % COLONNE_BOLLE];
      pos.set([cx + caso(-0.12, 0.12), Math.random() * LATO_AMBIENTE, cz + caso(-0.12, 0.12)], i * 3);
      col.set([0.62, 0.9, 1], i * 3);
      dati.set([Math.random(), caso(0.025, 0.06), Math.random(), 1], i * 4);
    } else {
      pos.set([Math.random() * LATO_AMBIENTE, Math.random() * LATO_AMBIENTE, Math.random() * LATO_AMBIENTE], i * 3);
      let r = Math.random();
      let k = 0;
      while (k < pesi.length - 1 && r > pesi[k]) {
        r -= pesi[k];
        k += 1;
      }
      const c = tinte[k].clone().multiplyScalar(caso(0.5, 1.2));
      col.set([c.r, c.g, c.b], i * 3);
      deriva.set([caso(-0.06, 0.06), caso(-0.03, 0.05), caso(-0.06, 0.06)], i * 3);
      dati.set([Math.random(), caso(0.012, 0.032), Math.random(), 0], i * 4);
    }
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geometria.setAttribute('aColore', new THREE.BufferAttribute(col, 3));
  geometria.setAttribute('aDeriva', new THREE.BufferAttribute(deriva, 3));
  geometria.setAttribute('aDati', new THREE.BufferAttribute(dati, 4));
  const materiale = shader({ uCentro: { value: v3() }, uTempo: { value: 0 }, uLato: { value: LATO_AMBIENTE }, uDensita: { value: 0.5 }, uAltezza: { value: 720 } }, VERTICE_AMBIENTE, FRAMMENTO_PUNTI);
  const punti = new THREE.Points(geometria, materiale);
  punti.frustumCulled = false;
  punti.renderOrder = 2;
  const misura = new THREE.Vector2();
  punti.onBeforeRender = renderer => {
    materiale.uniforms.uAltezza.value = altezzaBersaglio(renderer, misura);
  };
  scena.add(punti);
  return {
    aggiorna(centro, dt, voluta) {
      materiale.uniforms.uCentro.value.copy(centro);
      const u = materiale.uniforms.uDensita;
      u.value += (voluta - u.value) * Math.min(1, dt * 0.8);
    },
  };
}

function geometriaLama() {
  const segU = 48;
  const segV = 6;
  const pos = [];
  const uv = [];
  const indici = [];
  for (let i = 0; i <= segU; i++) {
    const u = i / segU;
    const ang = (u - 0.5) * 2 * APERTURA_ONDA;
    const spessore = 0.46 * Math.sin(PI * u) ** 0.8;
    for (let j = 0; j <= segV; j++) {
      const v = j / segV;
      const x = Math.sin(ang);
      const z = 0.55 * (1 - Math.cos(ang)) - (v - 0.5) * 0.14 * Math.sin(PI * u);
      const y = 0.12 * (1 - Math.cos(ang)) + (v - 0.5) * spessore;
      pos.push(x, y, z);
      uv.push(u, v);
    }
  }
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * (segV + 1) + j;
      const b = a + segV + 1;
      indici.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

function geometriaPezzo() {
  const g = new THREE.IcosahedronGeometry(0.075, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const k = 1 + Math.sin(x * 61 + 1.3) * Math.sin(y * 47 + 0.7) * Math.sin(z * 53 + 2.1) * 0.45;
    p.setXYZ(i, x * k * 1.15, y * k * 0.8, z * k);
  }
  g.computeVertexNormals();
  return g;
}

function geometriaArpione() {
  const parti = [
    new THREE.CylinderGeometry(0.011, 0.011, 0.5, 8).translate(0, -0.25, 0),
    new THREE.ConeGeometry(0.026, 0.12, 8).translate(0, 0.06, 0),
    new THREE.CylinderGeometry(0.018, 0.014, 0.03, 8).translate(0, -0.015, 0),
    new THREE.BoxGeometry(0.008, 0.07, 0.004).translate(0, -0.035, 0).rotateZ(0.5).translate(0.012, 0.0, 0),
    new THREE.BoxGeometry(0.008, 0.07, 0.004).translate(0, -0.035, 0).rotateZ(-0.5).translate(-0.012, 0.0, 0),
    new THREE.TorusGeometry(0.016, 0.004, 6, 12).rotateX(PI / 2).translate(0, -0.5, 0),
  ].map(g => (g.index ? g.toNonIndexed() : g));
  for (const g of parti) for (const nome of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) g.deleteAttribute(nome);
  const unita = new THREE.BufferGeometry();
  const totale = parti.reduce((s, g) => s + g.attributes.position.count, 0);
  for (const nome of ['position', 'normal', 'uv']) {
    const n = nome === 'uv' ? 2 : 3;
    const array = new Float32Array(totale * n);
    let o = 0;
    for (const g of parti) {
      array.set(g.attributes[nome].array, o);
      o += g.attributes[nome].array.length;
    }
    unita.setAttribute(nome, new THREE.BufferAttribute(array, n));
  }
  return unita;
}

export function creaEffettiAbisso(kit) {
  const { scena, camera } = kit;
  const densita = fermo(kit.qualita?.densita ?? 1, 0.3, 1);
  const alta = !!kit.qualita?.trasmissione;
  const nastri = creaNastri(scena, 30000);
  const bagliori = creaCartelloni(scena, 360, { additivo: true, texture: texturaAlone(), ordine: 7 });
  const vapori = creaCartelloni(scena, 420, { additivo: false, texture: texturaFumo(kit.rumore), calore: true, ordine: 3 });
  const scintille = creaScintille(scena, Math.round(1500 * Math.max(0.6, densita)));
  const anelli = creaAnelli(scena, 64);
  const ambiente = creaAmbiente(scena, densita);
  const pozzeMesh = creaIstanze(scena, new THREE.PlaneGeometry(2, 2).rotateX(-PI / 2), shader({ uTempo: { value: 0 }, uColore: { value: colore(COLORI.tridente) }, uColoreForte: { value: colore(COLORI.ira) } }, VERTICE_ISTANZE, FRAMMENTO_POZZE), 32, 2);
  const bolleMesh = creaIstanze(scena, new THREE.SphereGeometry(1, 28, 18), shader({ uTempo: { value: 0 } }, VERTICE_ISTANZE, FRAMMENTO_BOLLE), 32);
  const pezziMesh = new THREE.InstancedMesh(geometriaPezzo(), new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.05 }), 96);
  pezziMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  pezziMesh.setColorAt(0, colore(0xffffff));
  pezziMesh.count = 0;
  pezziMesh.frustumCulled = false;
  scena.add(pezziMesh);
  const catenaMesh = new THREE.InstancedMesh(new THREE.TorusGeometry(0.028, 0.0075, 6, 12).scale(1, 1.55, 1), new THREE.MeshStandardMaterial({ color: 0x5a5e63, metalness: 0.9, roughness: 0.42 }), 480);
  catenaMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  catenaMesh.count = 0;
  catenaMesh.frustumCulled = false;
  scena.add(catenaMesh);
  const geomArpione = geometriaArpione();
  const matArpione = new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.95, roughness: 0.3 });
  const geomGuscio = new THREE.SphereGeometry(1, 64, 40);
  const geomSfera = new THREE.SphereGeometry(1, 32, 22);
  const geomLama = geometriaLama();

  const tinte = Object.fromEntries(Object.entries(COLORI).map(([k, h]) => [k, colore(h)]));
  const bianco = colore(0xffffff);
  const tmp = { a: v3(), b: v3(), c: v3(), d: v3(), q: new THREE.Quaternion(), s: v3(), m: new THREE.Matrix4(), e: new THREE.Euler() };
  const qOrizzontale = new THREE.Quaternion().setFromAxisAngle(v3(1, 0, 0), -PI / 2);
  const qNullo = new THREE.Quaternion();
  const unoUno = v3(1, 1, 1);

  const globi = new Map();
  const collassi = [];
  const implosi = new Map();
  const poolGlobi = [];
  const sfere = new Map();
  const dardi = new Map();
  const pozze = new Map();
  const nubi = new Map();
  const onde = [];
  const poolOnde = [];
  const fulmini = [];
  const soniche = [];
  const mire = new Map();
  const arpioni = [];
  const poolTeste = [];
  const pezzi = [];
  const lampi = [];
  const sbuffi = [];
  const urti = [];
  const gusci = [];
  const poolGusci = [];
  let vista = null;
  let fotogramma = 0;
  let tempoOra = 0;

  const lampo = (x, y, z, d0, d1, tinta, durata, alfa = 1) => {
    if (lampi.length < 80) lampi.push({ x, y, z, d0, d1, tinta, durata, alfa, t: 0 });
  };
  const sbuffo = (x, y, z, vx, vy, vz, d0, d1, tinta, alfa, durata) => {
    if (sbuffi.length < 220) sbuffi.push({ x, y, z, vx, vy, vz, d0, d1, tinta, alfa, durata, t: 0, rot: Math.random() * PI * 2, giro: caso(-0.8, 0.8), seme: Math.random() * 10 });
  };
  const urto = (posizione, quaternione, r0, r1, tinta, durata, alfa = 1, spessore = 0.07, faccia = false) => {
    if (urti.length < 60) urti.push({ posizione: posizione.clone(), quaternione: quaternione.clone(), r0, r1, tinta, durata, alfa, spessore, faccia, t: 0, seme: Math.random() * 10 });
  };
  const spruzzo = (x, y, z, quante, velocita, tinta, { su = 0.4, dimensione = 0.07, durata = 1, gravita = -11 } = {}) => {
    const n = Math.round(quante * densita);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * PI * 2;
      const e = Math.acos(caso(-1, 1));
      const v = velocita * caso(0.35, 1);
      scintille.emetti(x, y, z, Math.sin(e) * Math.cos(a) * v, (Math.cos(e) * 0.5 + su) * v, Math.sin(e) * Math.sin(a) * v, Math.random() < 0.35 ? tinte.schiuma : tinta, dimensione * caso(0.6, 1.4), durata * caso(0.6, 1.2), gravita, 0.8, 2);
    }
  };
  const bollicine = (x, y, z, quante, raggio, velocita = 1.2) => {
    const n = Math.round(quante * densita);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * PI * 2;
      const r = raggio * Math.cbrt(Math.random());
      const h = caso(-1, 1) * raggio;
      scintille.emetti(x + Math.cos(a) * r, y + h * 0.6, z + Math.sin(a) * r, caso(-0.3, 0.3) * velocita, caso(0.5, 1.5) * velocita, caso(-0.3, 0.3) * velocita, tinte.bolla, caso(0.05, 0.14), caso(0.8, 1.8), 1.5, 1.6, 1);
    }
  };
  const scariche = (x, y, z, quante, tinta, velocita = 3) => {
    const n = Math.round(quante * densita);
    for (let i = 0; i < n; i++) scintille.emetti(x, y, z, caso(-1, 1) * velocita, caso(-0.3, 1) * velocita, caso(-1, 1) * velocita, Math.random() < 0.4 ? bianco : tinta, caso(0.03, 0.07), caso(0.15, 0.4), -6, 1.5, 0);
  };
  const aberrazione = (x, y, z, forza, portata = 18) => {
    const stato = kit.post?.stato;
    if (!stato) return;
    const d = camera.position.distanceTo(tmp.a.set(x, y, z));
    if (d < portata) stato.aberrazione = Math.max(stato.aberrazione, forza * (1 - d / portata));
  };
  const fonte = opzioni => {
    const f = kit.luce({ ...opzioni, spenta: false, scala: 1 });
    const forza = opzioni.forza;
    f.forza = (v, t) => (f.spenta ? 0 : forza(v, t) * f.scala);
    f.attiva = () => !f.spenta;
    return f;
  };
  const spegni = f => {
    if (!f) return;
    f.spenta = true;
    const i = kit.fonti.indexOf(f);
    if (i >= 0) kit.fonti.splice(i, 1);
  };

  function eLocale(v, g) {
    const c = camera.position;
    let locale = null;
    let migliore = Infinity;
    for (const q of v.giocatori) {
      const d = (q.x - c.x) ** 2 + (q.z - c.z) ** 2;
      if (d < migliore) {
        migliore = d;
        locale = q;
      }
    }
    return locale === g && migliore < 4;
  }

  function posizioneGiocatore(v, id, out) {
    const g = v?.giocatori?.find(q => q.id === id);
    if (!g) return null;
    if (eLocale(v, g)) return out.set(camera.position.x, camera.position.y - 0.35, camera.position.z);
    return out.set(g.x, quota(g.x, g.z) + 1.25, g.z);
  }

  function nuovoGlobo() {
    const g = poolGlobi.pop();
    if (g) {
      g.gruppo.visible = true;
      return g;
    }
    const gruppo = new THREE.Group();
    const vortice = creaMaterialeVortice({ intensita: 1.25, velocita: 3, ondula: 0.1 });
    vortice.uniforms.uTempo = tempoU;
    const nucleo = new THREE.Mesh(geomSfera, vortice);
    const materialeGuscio = creaGuscio(alta);
    const guscio = new THREE.Mesh(geomGuscio, materialeGuscio);
    guscio.renderOrder = 1;
    const materialeCorrenti = shader({ uTempo: { value: 0 }, uVelocita: { value: 1 }, uAlfa: { value: 1 }, uColore: { value: colore(COLORI.cariddi) } }, VERTICE_LOCALE, FRAMMENTO_CORRENTI, { side: THREE.DoubleSide });
    const correnti = new THREE.Mesh(geomSfera, materialeCorrenti);
    correnti.renderOrder = 2;
    gruppo.add(nucleo, guscio, correnti);
    scena.add(gruppo);
    return { gruppo, nucleo, guscio, correnti, vortice, materialeGuscio, materialeCorrenti };
  }

  function creaGuscio(trasmissione) {
    const u = { uTempo: tempoU, uColore: { value: colore(COLORI.cariddi) }, uIntensita: { value: 1 }, uVelocita: { value: 1 }, uOndula: { value: 0.03 }, uAlfa: { value: 1 } };
    const m = new THREE.MeshPhysicalMaterial(trasmissione
      ? { color: 0xa8e8ff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 1.4, ior: 1.33, attenuationColor: colore(0x1a8cc8), attenuationDistance: 5, clearcoat: 0.6, envMapIntensity: 1.5 }
      : { color: 0x6fd0ff, metalness: 0, roughness: 0.08, transparent: true, depthWrite: false, clearcoat: 0.8, envMapIntensity: 1.8 });
    m.userData.u = u;
    m.onBeforeCompile = s => {
      Object.assign(s.uniforms, u);
      s.vertexShader = s.vertexShader
        .replace('#include <common>', `#include <common>\nuniform float uTempo;\nuniform float uOndula;\nvarying vec3 vLocaleGlobo;\n${RUMORE_GLSL}`)
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocaleGlobo = position;\ntransformed += normal * (rumoreAbisso(position * 2.2 + vec3(0.0, uTempo * 0.8, uTempo * 0.3)) - 0.5) * uOndula;');
      s.fragmentShader = s.fragmentShader
        .replace('#include <common>', `#include <common>\nuniform float uTempo;\nuniform vec3 uColore;\nuniform float uIntensita;\nuniform float uVelocita;\nuniform float uAlfa;\nvarying vec3 vLocaleGlobo;\n${RUMORE_GLSL}`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 pl = normalize(vLocaleGlobo);
  float n = fbmAbisso(pl * 2.5 + vec3(0.0, uTempo * 0.3 * uVelocita, 0.0));
  float caustica = pow(max(1.0 - abs(sin(fbmAbisso(pl * 5.0 + vec3(uTempo * 0.25, -uTempo * 0.4 * uVelocita, 0.0)) * 22.0)), 0.0), 14.0);
  caustica += pow(max(1.0 - abs(sin(fbmAbisso(pl * 9.0 + vec3(-uTempo * 0.3, uTempo * 0.2, 3.0)) * 18.0)), 0.0), 16.0) * 0.6;
  float fres = pow(max(1.0 - abs(dot(normal, normalize(vViewPosition))), 0.0), 3.0);
  totalEmissiveRadiance += uColore * (fres * 1.4 + caustica * (0.12 + n * 0.3) + 0.015) * uIntensita;
  diffuseColor.a *= clamp(0.04 + fres * 0.6 + caustica * 0.1, 0.0, 1.0) * uAlfa;
}`);
    };
    m.customProgramCacheKey = () => `globoAbisso|${trasmissione}`;
    return m;
  }

  function vesti(g, potente) {
    const tinta = potente ? tinte.maelstrom : tinte.cariddi;
    g.tinta = tinta;
    g.materialeGuscio.userData.u.uColore.value.copy(tinta);
    g.materialeCorrenti.uniforms.uColore.value.copy(tinta).lerp(bianco, 0.25);
    const vu = g.vortice.uniforms;
    vu.uColore.value.setHex(potente ? 0x9a4dff : 0x2fb8ff);
    vu.uProfondo.value.setHex(potente ? 0x1a0640 : 0x02203a);
    vu.uSchiuma.value.setHex(potente ? 0xffd0ff : 0xd8fbff);
  }

  function attivaGlobo(q) {
    const g = nuovoGlobo();
    Object.assign(g, {
      id: q.id, x: q.x, y: q.y, z: q.z, tx: q.x, ty: q.y, tz: q.z, vx: 0, vy: 0, vz: 0, tAgg: tempoOra,
      fermo: false, etaFermo: 0, eta: 0, raggio: (q.raggio ?? RAGGIO_GLOBO) * FATTORE_GLOBO, potente: !!q.potente, timer: q.timer ?? 6,
      visto: fotogramma, assente: 0, luce: null, scalaGuscio: 0, collasso: 0,
    });
    vesti(g, g.potente);
    g.guscio.visible = false;
    g.correnti.visible = false;
    g.nucleo.scale.setScalar(NUCLEO_GLOBO);
    return g;
  }

  function rilasciaGlobo(g) {
    spegni(g.luce);
    g.luce = null;
    g.gruppo.visible = false;
    poolGlobi.push(g);
  }

  function fermaGlobo(g) {
    g.fermo = true;
    g.etaFermo = 0;
    g.vx = g.vy = g.vz = 0;
    spruzzo(g.x, g.y, g.z, 50, 6, g.tinta, { su: 0.2, durata: 0.9 });
    bollicine(g.x, g.y, g.z, 30, 1.2, 2);
    lampo(g.x, g.y, g.z, 0.5, g.raggio * 1.6, g.tinta, 0.35, 0.6);
    urto(tmp.a.set(g.x, g.y, g.z), qOrizzontale, 0.4, g.raggio * 1.3, g.tinta, 0.45, 0.8, 0.06);
    g.guscio.visible = true;
    g.correnti.visible = true;
    const potente = g.potente;
    g.luce = fonte({ x: g.x, y: g.y, z: g.z, colore: potente ? COLORI.maelstrom : COLORI.cariddi, intensita: 14, portata: g.raggio * 3.2, forza: (v, t) => 14 * (0.82 + Math.sin(t * 3.1) * 0.12 + Math.sin(t * 7.3) * 0.06) });
  }

  function sincronizzaGlobi(ab, dt) {
    for (const q of ab.globi ?? []) {
      if (implosi.has(q.id)) continue;
      let g = globi.get(q.id);
      if (!g) {
        g = attivaGlobo(q);
        globi.set(q.id, g);
      }
      g.visto = fotogramma;
      g.assente = 0;
      g.timer = q.timer;
      g.raggio = (q.raggio ?? RAGGIO_GLOBO) * FATTORE_GLOBO;
      if (g.potente !== !!q.potente) {
        g.potente = !!q.potente;
        vesti(g, g.potente);
      }
      if (q.x !== g.tx || q.y !== g.ty || q.z !== g.tz) {
        const passato = tempoOra - g.tAgg;
        if (!q.fermo && passato > 0.004 && passato < 0.3) {
          g.vx = (q.x - g.tx) / passato;
          g.vy = (q.y - g.ty) / passato;
          g.vz = (q.z - g.tz) / passato;
        }
        g.tx = q.x;
        g.ty = q.y;
        g.tz = q.z;
        g.tAgg = tempoOra;
      }
      if (q.fermo && !g.fermo) fermaGlobo(g);
    }
    for (const [id, g] of globi) {
      if (g.visto === fotogramma) continue;
      g.assente += dt;
      if (g.assente < ATTESA_IMPLOSIONE) continue;
      globi.delete(id);
      if (g.fermo) avviaCollasso(g, null);
      else rilasciaGlobo(g);
    }
  }

  function aggiornaGlobo(g, dt, tempo) {
    g.eta += dt;
    const avanti = Math.min(tempoOra - g.tAgg, 0.12);
    const k = 1 - Math.exp(-dt * (g.fermo ? 10 : 24));
    g.x += (g.tx + g.vx * avanti - g.x) * k;
    g.y += (g.ty + g.vy * avanti - g.y) * k;
    g.z += (g.tz + g.vz * avanti - g.z) * k;
    g.gruppo.position.set(g.x, g.y, g.z);
    if (!g.fermo) {
      g.nucleo.scale.setScalar(NUCLEO_GLOBO * (1 + Math.sin(tempo * 13) * 0.06));
      g.nucleo.rotation.set(tempo * 2, tempo * 1.3, 0);
      bagliori.metti(g.x, g.y, g.z, 1.4, g.tinta, 0.5);
      bagliori.metti(g.x, g.y, g.z, 0.35, bianco, 0.3);
      for (let i = 0; i < 3; i++) {
        scintille.emetti(g.x + caso(-0.12, 0.12), g.y + caso(-0.12, 0.12), g.z + caso(-0.12, 0.12), caso(-0.4, 0.4), caso(-0.6, 0.3), caso(-0.4, 0.4), i ? g.tinta : tinte.schiuma, caso(0.05, 0.11), caso(0.4, 0.8), -3, 1.2, 2);
      }
      if (Math.random() < 0.6) scintille.emetti(g.x, g.y, g.z, caso(-0.2, 0.2), caso(0.3, 0.8), caso(-0.2, 0.2), tinte.bolla, caso(0.04, 0.09), caso(0.6, 1.2), 1.2, 1.5, 1);
      return;
    }
    g.etaFermo += dt;
    const apertura = rimbalzo(fermo(g.etaFermo / DURATA_ESPANSIONE, 0, 1));
    const avviso = fermo(1 - (g.timer ?? 6) / 1.2, 0, 1);
    const r = g.raggio * apertura * (1 + Math.sin(tempo * (6 + avviso * 20)) * 0.012 * (1 + avviso * 3));
    g.scalaGuscio = r;
    g.guscio.scale.setScalar(Math.max(0.01, r));
    g.correnti.scale.setScalar(Math.max(0.01, r * 0.93));
    g.correnti.rotation.y = tempo * 0.3;
    g.nucleo.scale.setScalar(NUCLEO_GLOBO * 1.4 * (1 + Math.sin(tempo * 9) * 0.08));
    g.nucleo.rotation.set(tempo * 1.4, tempo * 2.1, 0);
    const u = g.materialeGuscio.userData.u;
    u.uVelocita.value = 1 + avviso * 3;
    u.uOndula.value = 0.03 + avviso * 0.09;
    u.uIntensita.value = 1 + avviso * 0.8;
    u.uAlfa.value = 1;
    g.materialeCorrenti.uniforms.uVelocita.value = 1 + avviso * 3;
    g.materialeCorrenti.uniforms.uAlfa.value = apertura;
    bagliori.metti(g.x, g.y, g.z, r * 1.5, g.tinta, 0.16 + avviso * 0.12);
    bagliori.metti(g.x, g.y, g.z, 1.4, bianco, 0.35);
    if (Math.random() < dt * 40 * densita) {
      const a = Math.random() * PI * 2;
      const rr = r * Math.sqrt(Math.random()) * 0.85;
      scintille.emetti(g.x + Math.cos(a) * rr, g.y - r * 0.7 + Math.random() * r * 0.6, g.z + Math.sin(a) * rr, caso(-0.2, 0.2), caso(0.8, 2), caso(-0.2, 0.2), tinte.bolla, caso(0.05, 0.16), caso(0.8, 1.6), 0.6, 0.6, 1);
    }
    if (Math.random() < dt * 12 * densita) {
      const a = Math.random() * PI * 2;
      scintille.emetti(g.x + Math.cos(a) * r, g.y + caso(-0.5, 0.5) * r, g.z + Math.sin(a) * r, -Math.sin(a) * 3, 0, Math.cos(a) * 3, g.tinta, 0.08, 0.6, 0, 0.5, 0);
    }
  }

  function avviaCollasso(g, e) {
    if (e) {
      g.tx = g.x = e.x;
      g.ty = g.y = e.y;
      g.tz = g.z = e.z;
    }
    g.collasso = 0;
    g.raggioCollasso = g.fermo ? Math.max(g.scalaGuscio, g.raggio * 0.5) : NUCLEO_GLOBO * 2;
    g.voluto = !!e?.voluto;
    if (!g.fermo) {
      g.guscio.visible = false;
      g.correnti.visible = false;
    }
    collassi.push(g);
  }

  function aggiornaCollasso(g, dt, tempo) {
    g.collasso += dt;
    const f = fermo(g.collasso / DURATA_COLLASSO, 0, 1);
    const r = g.raggioCollasso * (1 - f * f) + 0.05;
    g.gruppo.position.set(g.x, g.y, g.z);
    g.guscio.scale.setScalar(r);
    g.correnti.scale.setScalar(r * 0.93);
    g.nucleo.scale.setScalar(NUCLEO_GLOBO * (1.4 + f * 1.6));
    const u = g.materialeGuscio.userData.u;
    u.uVelocita.value = 3 + f * 12;
    u.uIntensita.value = 1.5 + f * 4;
    u.uOndula.value = 0.08 + f * 0.25;
    g.materialeCorrenti.uniforms.uVelocita.value = 3 + f * 14;
    g.materialeCorrenti.uniforms.uAlfa.value = 1 + f * 2;
    if (g.luce) g.luce.scala = 1 + f * 1.5;
    bagliori.metti(g.x, g.y, g.z, r * 1.2 + 0.6, g.tinta, 0.3 + f * 0.6);
    const quante = Math.round(dt * 260 * densita);
    for (let i = 0; i < quante; i++) {
      const a = Math.random() * PI * 2;
      const e = Math.acos(caso(-1, 1));
      const rr = r * caso(1, 1.4);
      const dx = Math.sin(e) * Math.cos(a);
      const dy = Math.cos(e);
      const dz = Math.sin(e) * Math.sin(a);
      const v = rr / Math.max(0.05, DURATA_COLLASSO - g.collasso + 0.04);
      scintille.emetti(g.x + dx * rr, g.y + dy * rr, g.z + dz * rr, -dx * v, -dy * v, -dz * v, Math.random() < 0.5 ? g.tinta : tinte.schiuma, caso(0.05, 0.12), 0.18, 0, 0, Math.random() < 0.3 ? 1 : 0);
    }
    if (f < 1) return false;
    esplodi(g.x, g.y, g.z, g.raggioCollasso, g.potente, g.tinta);
    rilasciaGlobo(g);
    return true;
  }

  function nuovoGuscioUrto() {
    const m = poolGusci.pop();
    if (m) {
      m.visible = true;
      return m;
    }
    const mesh = new THREE.Mesh(geomSfera, shader({ uTempo: { value: 0 }, uAlfa: { value: 1 }, uColore: { value: colore(COLORI.cariddi) } }, VERTICE_LOCALE, FRAMMENTO_URTO));
    mesh.renderOrder = 6;
    scena.add(mesh);
    return mesh;
  }

  function esplodi(x, y, z, raggio, potente, tinta) {
    const R = Math.max(1.5, raggio);
    const punto = v3(x, y, z);
    kit.effetti?.esplosione?.(punto, 'energia', potente ? COLORI.maelstrom : COLORI.cariddi);
    lampo(x, y, z, 1, R * 2.6, tinta, 0.32, 1);
    lampo(x, y, z, 0.5, R * 1.2, bianco, 0.18, 1);
    const terra = v3(x, quota(x, z) + 0.08, z);
    urto(terra, qOrizzontale, R * 0.3, R * 2.8, tinta, 0.65, 1, 0.05);
    urto(terra, qOrizzontale, R * 0.2, R * 1.9, bianco, 0.45, 0.5, 0.03);
    urto(punto, qNullo, R * 0.2, R * 1.9, tinta, 0.42, 0.7, 0.04, true);
    const guscio = nuovoGuscioUrto();
    guscio.position.copy(punto);
    guscio.material.uniforms.uColore.value.copy(tinta);
    gusci.push({ mesh: guscio, t: 0, durata: 0.5, r0: R * 0.2, r1: R * 1.9 });
    spruzzo(x, y, z, potente ? 180 : 140, potente ? 15 : 12, tinta, { su: 0.45, dimensione: 0.09, durata: 1.3 });
    bollicine(x, y, z, 60, R * 0.8, 3);
    for (let i = 0; i < Math.round(14 * densita); i++) {
      const a = Math.random() * PI * 2;
      const v = caso(1, 3.5);
      sbuffo(x, y + caso(-0.5, 0.5), z, Math.cos(a) * v, caso(0.2, 1.2), Math.sin(a) * v, R * 0.35, R * 1.1, tinte.schiuma.clone().lerp(tinta, 0.4), 0.28, caso(0.9, 1.4));
    }
    aberrazione(x, y, z, potente ? 0.9 : 0.65);
  }

  function aggiornaSfere(ab, dt, tempo) {
    for (const q of ab.sfere ?? []) {
      let s = sfere.get(q.id);
      if (!s) {
        s = { id: q.id, x: q.x, y: q.y, z: q.z, eta: 0, fine: 0, seme: Math.random() * 10 };
        sfere.set(q.id, s);
        bollicine(q.x, q.y, q.z, 10, 0.3, 1);
      }
      Object.assign(s, { x: q.x, y: q.y, z: q.z, visto: fotogramma });
    }
    for (const [id, s] of sfere) {
      if (s.visto !== fotogramma) s.fine += dt;
      if (s.fine > 0.25) {
        sfere.delete(id);
        continue;
      }
      s.eta += dt;
      const nascita = esce(fermo(s.eta / 0.4, 0, 1));
      const morte = 1 - s.fine / 0.25;
      const y = s.y + Math.sin(tempo * 1.6 + s.seme) * 0.08;
      const oscilla = Math.sin(tempo * 5 + s.seme) * 0.06;
      const r = RAGGIO_SFERA * nascita * morte;
      tmp.q.setFromEuler(tmp.e.set(0, tempo * 0.4 + s.seme, 0));
      bolleMesh.metti(tmp.a.set(s.x, y, s.z), tmp.q, tmp.s.set(r * (1 + oscilla), r * (1 - oscilla), r * (1 + oscilla)), 1);
      bagliori.metti(s.x, y, s.z, 1.1 * nascita, tinte.cariddi, 0.22 + Math.sin(tempo * 3 + s.seme) * 0.05);
      bagliori.metti(s.x, y, s.z, 0.28 * nascita, bianco, 0.35);
      if (Math.random() < dt * 5 * densita) scintille.emetti(s.x + caso(-0.2, 0.2), y + 0.2, s.z + caso(-0.2, 0.2), 0, caso(0.4, 0.9), 0, tinte.bolla, caso(0.03, 0.07), caso(0.8, 1.4), 0.5, 1, 1);
    }
  }

  function scoppiaSfera(e) {
    let migliore = null;
    let d = 2.5;
    for (const s of sfere.values()) {
      const dd = Math.hypot(s.x - e.x, s.z - e.z);
      if (dd < d) {
        d = dd;
        migliore = s;
      }
    }
    const x = migliore?.x ?? e.x;
    const z = migliore?.z ?? e.z;
    const y = migliore?.y ?? quota(e.x, e.z) + 1;
    if (migliore) sfere.delete(migliore.id);
    for (let i = 0; i < Math.round(30 * densita); i++) {
      const a = Math.random() * PI * 2;
      const el = caso(-0.8, 0.8);
      scintille.emetti(x, y, z, Math.cos(a) * 2.5, el * 2.5, Math.sin(a) * 2.5, tinte.bolla, caso(0.04, 0.1), caso(0.5, 1), 1, 3, 1);
    }
    spruzzo(x, y, z, 16, 3, tinte.cariddi, { su: 0.3, dimensione: 0.05, durata: 0.6 });
    lampo(x, y, z, 0.3, 1.6, tinte.cariddi, 0.3, 0.8);
    urto(tmp.a.set(x, y, z), qNullo, 0.25, 1.2, tinte.bolla, 0.3, 0.8, 0.05, true);
  }

  function sincronizzaDardi(ab, dt) {
    for (const q of ab.dardi ?? []) {
      let d = dardi.get(q.id);
      if (!d) {
        d = { id: q.id, x: q.x, y: q.y, z: q.z, tx: q.x, ty: q.y, tz: q.z, vx: 0, vy: 0, vz: 0, tAgg: tempoOra, archi: [], prossimo: 0, assente: 0 };
        dardi.set(q.id, d);
      }
      d.visto = fotogramma;
      d.assente = 0;
      if (q.x !== d.tx || q.y !== d.ty || q.z !== d.tz) {
        const passato = tempoOra - d.tAgg;
        if (passato > 0.004 && passato < 0.3) {
          d.vx = (q.x - d.tx) / passato;
          d.vy = (q.y - d.ty) / passato;
          d.vz = (q.z - d.tz) / passato;
        }
        d.tx = q.x;
        d.ty = q.y;
        d.tz = q.z;
        d.tAgg = tempoOra;
      }
    }
    for (const [id, d] of dardi) {
      if (d.visto === fotogramma) continue;
      d.assente += dt;
      if (d.assente > 0.12) dardi.delete(id);
    }
  }

  function aggiornaDardo(d, dt, tempo) {
    const avanti = Math.min(tempoOra - d.tAgg, 0.1);
    const k = 1 - Math.exp(-dt * 30);
    d.x += (d.tx + d.vx * avanti - d.x) * k;
    d.y += (d.ty + d.vy * avanti - d.y) * k;
    d.z += (d.tz + d.vz * avanti - d.z) * k;
    const tinta = tinte.tridente;
    bagliori.metti(d.x, d.y, d.z, 1.4, tinta, 0.75);
    bagliori.metti(d.x, d.y, d.z, 0.45, bianco, 1);
    const velocita = Math.hypot(d.vx, d.vy, d.vz);
    if (velocita > 1) {
      const lungo = Math.min(1.8, velocita * 0.06);
      const coda = [];
      for (let i = 6; i >= 0; i--) {
        const f = (i / 6) * lungo;
        coda.push(v3(d.x - (d.vx / velocita) * f, d.y - (d.vy / velocita) * f, d.z - (d.vz / velocita) * f));
      }
      nastri.linea(coda, 0.16, tinta, 0.9, { coda: true, punta: 0.6 });
    }
    d.prossimo -= dt;
    if (d.prossimo <= 0) {
      d.prossimo = ARCHI_OGNI;
      d.archi = [0, 1, 2].map(() => frastaglia(v3(0, 0, 0), v3(caso(-0.35, 0.35), caso(-0.35, 0.35), caso(-0.35, 0.35)), 0.3, 2));
    }
    for (const arco of d.archi) {
      nastri.linea(arco.map(p => tmp.b.set(d.x, d.y, d.z).add(p).clone()), 0.03, tinta, 0.9);
    }
    if (Math.random() < 0.7) scintille.emetti(d.x, d.y, d.z, caso(-1, 1), caso(-1, 1), caso(-1, 1), Math.random() < 0.5 ? bianco : tinta, caso(0.03, 0.06), caso(0.15, 0.3), -2, 1, 0);
  }

  function sincronizzaPozze(ab, dt) {
    for (const q of ab.pozze ?? []) {
      const id = q.id ?? `${q.x}|${q.z}`;
      let p = pozze.get(id);
      if (!p) {
        p = { id, x: q.x, y: q.y ?? quota(q.x, q.z), z: q.z, raggio: q.raggio, potente: !!q.potente, eta: 0, fine: 0, seme: Math.random() * 10, archi: [], prossimo: 0, luce: null };
        p.luce = fonte({ x: q.x, y: p.y + 0.7, z: q.z, colore: p.potente ? COLORI.ira : COLORI.tridente, intensita: 6, portata: q.raggio * 2.6, forza: (v, t) => 6 * (0.55 + 0.25 * Math.sin(t * 31 + p.seme) + 0.2 * Math.sin(t * 17 + p.seme * 3)) * Math.min(1, p.timer / 1.2) });
        pozze.set(id, p);
      }
      Object.assign(p, { raggio: q.raggio, timer: q.timer, visto: fotogramma, potente: !!q.potente });
    }
    for (const [id, p] of pozze) {
      if (p.visto === fotogramma) continue;
      p.fine += dt;
      p.timer = 0;
      if (p.fine < 0.4) continue;
      spegni(p.luce);
      pozze.delete(id);
    }
  }

  function aggiornaPozza(p, dt) {
    p.eta += dt;
    const alfa = Math.min(1, p.eta / 0.3) * (p.fine > 0 ? 1 - p.fine / 0.4 : Math.min(1, 0.25 + p.timer / 1.2));
    if (alfa <= 0) return;
    tmp.a.set(p.x, p.y + 0.035, p.z);
    pozzeMesh.metti(tmp.a, qNullo, tmp.s.set(p.raggio, 1, p.raggio), alfa, p.seme, p.potente ? 1 : 0);
    const tinta = p.potente ? tinte.ira : tinte.tridente;
    p.prossimo -= dt;
    if (p.prossimo <= 0) {
      p.prossimo = ARCHI_POZZA_OGNI;
      const n = Math.max(2, Math.round((p.potente ? 6 : 4) * densita));
      p.archi = [];
      for (let i = 0; i < n; i++) {
        const a0 = Math.random() * PI * 2;
        const r0 = p.raggio * Math.sqrt(Math.random()) * 0.9;
        const da = v3(p.x + Math.cos(a0) * r0, p.y + 0.04, p.z + Math.sin(a0) * r0);
        if (Math.random() < 0.3) {
          const su = da.clone().add(v3(caso(-0.2, 0.2), caso(0.3, 0.8), caso(-0.2, 0.2)));
          p.archi.push({ punti: frastaglia(da, su, 0.25, 3), larghezza: caso(0.02, 0.04) });
          continue;
        }
        const a1 = a0 + caso(-1.4, 1.4);
        const r1 = p.raggio * Math.sqrt(Math.random()) * 0.9;
        const a = v3(p.x + Math.cos(a1) * r1, p.y + 0.04, p.z + Math.sin(a1) * r1);
        const punti = frastaglia(da, a, 0.16, 3);
        const arco = caso(0.05, 0.3);
        punti.forEach((q, j) => { q.y += Math.sin((j / (punti.length - 1)) * PI) * arco; });
        p.archi.push({ punti, larghezza: caso(0.025, 0.05) });
      }
      if (Math.random() < 0.8) {
        const q = p.archi[0].punti[0];
        scariche(q.x, q.y, q.z, 5, tinta, 2);
      }
    }
    for (const arco of p.archi) nastri.linea(arco.punti, arco.larghezza, tinta, alfa * caso(0.6, 1));
  }

  function sincronizzaNubi(ab, dt) {
    for (const q of ab.nubi ?? []) {
      const id = q.id ?? `${q.x}|${q.z}`;
      let n = nubi.get(id);
      if (!n) {
        n = { id, x: q.x, y: q.y ?? quota(q.x, q.z), z: q.z, raggio: q.raggio, eta: 0, fine: 0, timer: q.timer, seme: Math.random() * 100 };
        nubi.set(id, n);
      }
      Object.assign(n, { timer: q.timer, raggio: q.raggio, visto: fotogramma });
    }
    for (const [id, n] of nubi) {
      if (n.visto === fotogramma) continue;
      n.fine += dt;
      if (n.fine > 0.7) nubi.delete(id);
    }
  }

  function aggiornaNube(n, dt, tempo) {
    n.eta += dt;
    const alfa = Math.min(1, n.eta / 0.6) * (n.fine > 0 ? 1 - n.fine / 0.7 : Math.min(1, n.timer / 1));
    if (alfa <= 0) return;
    const quante = Math.round(22 * Math.max(0.5, densita));
    const scala = n.raggio / 4.5;
    for (let i = 0; i < quante; i++) {
      const s = n.seme + i * 7.31;
      const ciclo = (tempo * (0.16 + (i % 5) * 0.025) + (s % 1)) % 1;
      const a = s * 2.399 + tempo * 0.15 * (i % 2 ? 1 : -1);
      const rr = n.raggio * (0.1 + 0.75 * ((s * 0.618) % 1)) * (0.55 + 0.45 * ciclo);
      const y = n.y + 0.25 + ciclo * 2.6 * scala + (i % 3) * 0.2;
      const d = (1.8 + ciclo * 3) * scala * (0.8 + (i % 4) * 0.12);
      const a2 = Math.sin(PI * ciclo) * 0.17 * alfa;
      vapori.metti(n.x + Math.cos(a) * rr, y, n.z + Math.sin(a) * rr, d, tinte.vapore, a2, s + tempo * 0.2 * (i % 2 ? 1 : -1), s);
    }
    if (Math.random() < dt * 14 * densita * alfa) {
      const a = Math.random() * PI * 2;
      const r = n.raggio * Math.sqrt(Math.random()) * 0.8;
      scintille.emetti(n.x + Math.cos(a) * r, n.y + 0.1, n.z + Math.sin(a) * r, 0, caso(0.6, 1.6), 0, tinte.vapore, caso(0.03, 0.06), caso(0.6, 1.2), 0.5, 1, 1);
    }
  }

  function nuovaLama() {
    const m = poolOnde.pop();
    if (m) {
      m.visible = true;
      return m;
    }
    const materiale = shader({ uTempo: { value: 0 }, uAlfa: { value: 1 }, uSeme: { value: 0 }, uColore: { value: colore(COLORI.tridente) } }, VERTICE_UV, FRAMMENTO_LAMA, { side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geomLama, materiale);
    mesh.renderOrder = 6;
    mesh.frustumCulled = false;
    scena.add(mesh);
    return mesh;
  }

  function lanciaOnda(e) {
    const mesh = nuovaLama();
    const potente = !!e.potente;
    const tinta = potente ? tinte.ira : tinte.tridente;
    mesh.material.uniforms.uColore.value.copy(tinta).lerp(bianco, 0.1);
    mesh.material.uniforms.uSeme.value = Math.random() * 10;
    const y = e.y ?? quota(e.x, e.z) + 1;
    onde.push({ mesh, x: e.x, y, z: e.z, dx: Math.sin(e.yaw), dz: Math.cos(e.yaw), yaw: e.yaw, lungo: Math.max(1.5, e.lungo ?? 10), potente, tinta, t: 0, finita: false, rollio: caso(-0.35, -0.2) });
    lampo(e.x + Math.sin(e.yaw) * 0.8, y, e.z + Math.cos(e.yaw) * 0.8, 0.4, 1.6, tinta, 0.2, 0.6);
  }

  function aggiornaOnda(o, dt, tempo) {
    o.t += dt;
    const f = fermo(o.t / DURATA_ONDA, 0, 1);
    const dist = 0.6 + (o.lungo - 0.6) * esce(f);
    const x = o.x + o.dx * dist;
    const z = o.z + o.dz * dist;
    const scala = RAGGIO_ONDA * (o.potente ? 1.45 : 1) * (1 + 0.35 * f);
    const svanita = fermo((o.t - DURATA_ONDA) / SVANIRE_ONDA, 0, 1);
    o.mesh.position.set(x, o.y, z);
    o.mesh.rotation.set(0, o.yaw + PI, o.rollio);
    o.mesh.scale.setScalar(scala);
    o.mesh.material.uniforms.uAlfa.value = (1 - svanita) * Math.min(1, o.t / 0.04);
    o.mesh.updateMatrixWorld();
    const scia = (1 - svanita) * 0.9;
    if (dist > 1.2 && scia > 0) {
      const inizio = Math.max(0.6, dist - 3.5);
      const passi = 8;
      for (const lato of [-1, 0, 1]) {
        const punti = [];
        for (let i = 0; i <= passi; i++) {
          const d = inizio + ((dist - inizio) * i) / passi;
          const ang = lato * APERTURA_ONDA * 0.92;
          tmp.a.set(Math.sin(ang), 0.12 * (1 - Math.cos(ang)), 0.55 * (1 - Math.cos(ang))).applyMatrix4(o.mesh.matrixWorld);
          punti.push(v3(tmp.a.x - o.dx * (dist - d), tmp.a.y, tmp.a.z - o.dz * (dist - d)));
        }
        nastri.linea(punti, lato ? 0.12 : scala * 0.55, o.tinta, (lato ? 0.4 : 0.16) * scia, { coda: true });
      }
    }
    if (svanita < 1) {
      for (let i = 0; i < Math.round(12 * densita); i++) {
        const u = Math.random();
        const ang = (u - 0.5) * 2 * APERTURA_ONDA;
        tmp.a.set(Math.sin(ang), 0.12 * (1 - Math.cos(ang)) + caso(-0.15, 0.2), 0.55 * (1 - Math.cos(ang))).applyMatrix4(o.mesh.matrixWorld);
        scintille.emetti(tmp.a.x, tmp.a.y, tmp.a.z, o.dx * caso(1, 4) + caso(-1, 1), caso(-0.5, 1.5), o.dz * caso(1, 4) + caso(-1, 1), Math.random() < 0.4 ? tinte.schiuma : o.tinta, caso(0.05, 0.1), caso(0.5, 0.9), -9, 0.8, 2);
      }
      if (Math.random() < 0.7 * densita) {
        const ang = caso(-1, 1) * APERTURA_ONDA;
        tmp.a.set(Math.sin(ang), 0, 0.55 * (1 - Math.cos(ang))).applyMatrix4(o.mesh.matrixWorld);
        sbuffo(tmp.a.x, tmp.a.y, tmp.a.z, o.dx * 0.6, 0.15, o.dz * 0.6, 0.5, 1.6, tinte.schiuma.clone().lerp(o.tinta, 0.3), 0.18, 0.7);
      }
    }
    if (!o.finita && svanita >= 1) {
      o.finita = true;
      spruzzo(x, o.y, z, 40, 5, o.tinta, { su: 0.5, durata: 0.9 });
      for (let i = 0; i < Math.round(5 * densita); i++) sbuffo(x + caso(-0.8, 0.8), o.y, z + caso(-0.8, 0.8), caso(-0.5, 0.5), 0.3, caso(-0.5, 0.5), 0.6, 2, tinte.schiuma, 0.2, 0.9);
      o.mesh.visible = false;
      poolOnde.push(o.mesh);
      return true;
    }
    return false;
  }

  function lanciaFulmine(e) {
    const potente = !!e.potente;
    const tinta = potente ? tinte.ira : tinte.tridente;
    const suolo = quota(e.x, e.z);
    const cielo = Math.min(tetto(e.x, e.z, { cielo: false }), suolo + 16);
    const impatto = v3(e.x, e.y ?? suolo + 1, e.z);
    const alto = v3(e.x + caso(-1.2, 1.2), Math.max(impatto.y + 3, cielo - 0.1), e.z + caso(-1.2, 1.2));
    const nodi = [impatto];
    const catena = e.catena ?? [];
    for (let i = 0; i + 1 < catena.length; i += 2) {
      const p = v3(catena[i], quota(catena[i], catena[i + 1]) + ALTEZZA_CATENA, catena[i + 1]);
      if (p.distanceTo(nodi[nodi.length - 1]) > 0.6) nodi.push(p);
    }
    fulmini.push({ alto, impatto, nodi, tinta, potente, t: 0, prossimo: 0, principale: [], rami: [], salti: [], accesi: 1 });
    kit.effetti?.esplosione?.(impatto, 'fulmine', potente ? COLORI.ira : 0xd8f8ff);
    lampo(impatto.x, impatto.y, impatto.z, 2, potente ? 9 : 7, tinta, 0.3, 1);
    lampo(impatto.x, impatto.y, impatto.z, 1, 3, bianco, 0.15, 1);
    lampo(alto.x, alto.y, alto.z, 1, 3.5, tinta, 0.25, 0.8);
    urto(tmp.a.set(impatto.x, suolo + 0.06, impatto.z), qOrizzontale, 0.3, potente ? 4 : 3.2, tinta, 0.45, 1, 0.06);
    scariche(impatto.x, impatto.y, impatto.z, 40, tinta, 5);
    aberrazione(impatto.x, impatto.y, impatto.z, potente ? 1 : 0.7, 22);
  }

  function aggiornaFulmine(f, dt) {
    f.t += dt;
    const fine = DURATA_FULMINE + f.nodi.length * 0.035;
    if (f.t > fine) return true;
    f.prossimo -= dt;
    if (f.prossimo <= 0) {
      f.prossimo = ARCHI_OGNI;
      f.principale = frastaglia(f.alto, f.impatto, 0.09, 5);
      f.rami = [];
      for (let i = 0; i < 3; i++) {
        const da = f.principale[Math.floor(caso(0.15, 0.75) * f.principale.length)];
        const a = da.clone().add(v3(caso(-2.5, 2.5), caso(-3, -0.8), caso(-2.5, 2.5)));
        f.rami.push(frastaglia(da, a, 0.2, 3));
      }
      f.salti = [];
      for (let i = 0; i < f.nodi.length - 1; i++) f.salti.push(frastaglia(f.nodi[i], f.nodi[i + 1], 0.14, 4));
    }
    const vita = 1 - fermo(f.t / DURATA_FULMINE, 0, 1);
    const tremolio = caso(0.55, 1);
    const larghezza = (f.potente ? 0.22 : 0.16) * Math.sqrt(vita);
    if (vita > 0) {
      nastri.linea(f.principale, larghezza * 3, f.tinta, 0.35 * vita * tremolio);
      nastri.linea(f.principale, larghezza, f.t < 0.06 ? bianco : f.tinta, vita * tremolio);
      for (const r of f.rami) nastri.linea(r, larghezza * 0.5, f.tinta, vita * tremolio * 0.8, { punta: 0.7 });
    }
    f.salti.forEach((salto, i) => {
      const inizio = i * 0.035;
      if (f.t < inizio) return;
      const eta = f.t - inizio;
      const forza = 1 - fermo(eta / 0.4, 0, 1);
      if (forza <= 0) return;
      if (f.accesi <= i + 1) {
        f.accesi = i + 2;
        const p = f.nodi[i + 1];
        lampo(p.x, p.y, p.z, 0.6, 2, f.tinta, 0.22, 0.9);
        scariche(p.x, p.y, p.z, 12, f.tinta, 3);
        urto(tmp.a.set(p.x, p.y - ALTEZZA_CATENA + 0.06, p.z), qOrizzontale, 0.2, 1.1, f.tinta, 0.3, 0.8, 0.07);
      }
      nastri.linea(salto, 0.18, f.tinta, 0.3 * forza * caso(0.6, 1));
      nastri.linea(salto, 0.06, f.tinta, forza * caso(0.6, 1));
    });
    return false;
  }

  function lanciaSonica(e, v) {
    const y = quota(e.x, e.z) + 1.2;
    const d = v3(Math.sin(e.yaw), 0, Math.cos(e.yaw));
    soniche.push({ x: e.x, y, z: e.z, d, t: 0, q: new THREE.Quaternion().setFromUnitVectors(ASSE_Z, d) });
    lampo(e.x + d.x * 0.7, y, e.z + d.z * 0.7, 0.4, 1.4, tinte.schiuma, 0.22, 0.6);
    for (let i = 0; i < Math.round(30 * densita); i++) {
      const a = caso(-ARCO_SONICA, ARCO_SONICA);
      const c = Math.cos(a);
      const s = Math.sin(a);
      const vx = d.x * c - d.z * s;
      const vz = d.x * s + d.z * c;
      const v = caso(4, 9);
      scintille.emetti(e.x + d.x * 0.5, y + caso(-0.5, 0.5), e.z + d.z * 0.5, vx * v, caso(-0.5, 0.8), vz * v, tinte.bolla, caso(0.04, 0.1), caso(0.4, 0.8), 0, 2.5, 1);
    }
    if (v) aberrazione(e.x, y, e.z, 0.35, 8);
  }

  function aggiornaSonica(s) {
    let viva = false;
    for (let k = 0; k < ANELLI_SONICI; k++) {
      const f = (s.t - k * 0.05) / DURATA_SONICA;
      if (f < 0 || f > 1) {
        if (f < 0) viva = true;
        continue;
      }
      viva = true;
      const dist = 0.5 + (PORTATA_SONICA - 0.5) * esce(f);
      const r = 0.25 + dist * Math.tan(ARCO_SONICA) * 0.95;
      tmp.a.set(s.x + s.d.x * dist, s.y, s.z + s.d.z * dist);
      anelli.metti(tmp.a, s.q, r, k % 2 ? tinte.schiuma : tinte.bolla, (1 - f) ** 1.5 * 0.24 * Math.min(1, f * 6), 0.028, k * 1.7);
    }
    return !viva;
  }

  function aggiornaMira(m, v, dt, tempo) {
    m.t += dt;
    if (m.t > DURATA_MIRA) return true;
    const z = v?.zombie?.find(q => q.id === m.zombie);
    if (!z) return true;
    const fx = Math.sin(z.yaw ?? 0);
    const fz = Math.cos(z.yaw ?? 0);
    const o = tmp.c.set(z.x + fx * 0.32 - fz * 0.12, quota(z.x, z.z) + ALTEZZA_ELMO, z.z + fz * 0.32 + fx * 0.12).clone();
    const b = posizioneGiocatore(v, m.a, v3());
    if (!b) return true;
    const incerto = Math.max(0, 1 - m.t / 0.8) * 0.25;
    b.x += Math.sin(tempo * 13) * incerto;
    b.y += Math.sin(tempo * 17 + 1) * incerto * 0.6;
    b.z += Math.cos(tempo * 11) * incerto;
    const accesa = Math.min(1, m.t / 0.08) * (0.85 + Math.sin(tempo * 60) * 0.15);
    nastri.linea([o, b], 0.016, tinte.laser, accesa);
    nastri.linea([o, b], 0.08, tinte.laser, accesa * 0.2);
    bagliori.metti(o.x, o.y, o.z, 0.35, tinte.laser, accesa * 0.9);
    bagliori.metti(b.x, b.y, b.z, 0.22, tinte.laser, accesa);
    return false;
  }

  function nuovaTesta() {
    const m = poolTeste.pop();
    if (m) {
      m.visible = true;
      return m;
    }
    const mesh = new THREE.Mesh(geomArpione, matArpione);
    mesh.frustumCulled = false;
    scena.add(mesh);
    return mesh;
  }

  function lanciaArpione(e) {
    mire.delete(e.zombie);
    arpioni.push({ zombie: e.zombie, a: e.a, x: e.x, z: e.z, dx: e.dx ?? e.x, dz: e.dz ?? e.z, t: 0, testa: nuovaTesta(), colpito: false });
  }

  function aggiornaArpione(r, v, dt, catena) {
    r.t += dt;
    if (r.t > FINE_ARPIONE) {
      r.testa.visible = false;
      poolTeste.push(r.testa);
      return true;
    }
    const z = v?.zombie?.find(q => q.id === r.zombie);
    const zx = z?.x ?? r.dx;
    const zz = z?.z ?? r.dz;
    const fx = Math.sin(z?.yaw ?? 0);
    const fz = Math.cos(z?.yaw ?? 0);
    const o = v3(zx + fx * 0.35, quota(zx, zz) + 1.45, zz + fz * 0.35);
    const b = posizioneGiocatore(v, r.a, v3()) ?? v3(r.x, quota(r.x, r.z) + ALTEZZA_CATENA, r.z);
    let testa;
    let tensione = 1;
    if (r.t < VOLO_ARPIONE) {
      testa = o.clone().lerp(b, liscio(r.t / VOLO_ARPIONE));
      tensione = 0.2 + 0.8 * (r.t / VOLO_ARPIONE);
    } else if (r.t < RITIRO_ARPIONE) {
      testa = b.clone();
      if (!r.colpito) {
        r.colpito = true;
        scariche(b.x, b.y, b.z, 14, tinte.laser, 3);
        lampo(b.x, b.y, b.z, 0.3, 1.2, colore(0xffc080), 0.15, 0.8);
        if (b.distanceTo(camera.position) > 1) kit.effetti?.sangue?.(b, null, 14);
      }
    } else {
      testa = b.clone().lerp(o, liscio((r.t - RITIRO_ARPIONE) / (FINE_ARPIONE - RITIRO_ARPIONE)));
      tensione = 0.6;
    }
    const verso = testa.clone().sub(o);
    const lungo = verso.length();
    if (lungo > 0.01) verso.divideScalar(lungo);
    else verso.set(0, 1, 0);
    r.testa.position.copy(testa);
    r.testa.quaternion.setFromUnitVectors(ASSE_Y, verso);
    const fineCatena = Math.max(0, lungo - 0.5);
    const n = Math.floor(fineCatena / PASSO_CATENA);
    const giro = tmp.q;
    const allinea = new THREE.Quaternion().setFromUnitVectors(ASSE_Y, verso);
    const ruota = new THREE.Quaternion().setFromAxisAngle(verso, PI / 2);
    const vibra = r.t > VOLO_ARPIONE && r.t < RITIRO_ARPIONE ? Math.sin(r.t * 90) * 0.015 : 0;
    for (let i = 0; i < n; i++) {
      const s = (i + 0.5) / Math.max(1, n);
      const p = tmp.d.copy(o).addScaledVector(verso, (i + 0.5) * PASSO_CATENA);
      p.y -= Math.sin(PI * s) * (0.35 * (1 - tensione) + 0.02) - Math.sin(PI * s * 3) * vibra;
      giro.copy(allinea);
      if (i % 2) giro.premultiply(ruota);
      catena.push([p.clone(), giro.clone()]);
    }
    return false;
  }

  function smembra(e) {
    const suolo = quota(e.x, e.z);
    const n = Math.max(6, Math.round(13 * densita));
    const palette = [0x5a0c0c, 0x3a0606, 0x6a1410, 0x4a5a4c, 0x5c6a58, 0xd8ccb0];
    for (let i = 0; i < n; i++) {
      if (pezzi.length >= 96) pezzi.shift();
      const a = Math.random() * PI * 2;
      const v = caso(1.5, 4.5);
      pezzi.push({
        x: e.x + Math.cos(a) * 0.15, y: suolo + caso(0.4, 1.6), z: e.z + Math.sin(a) * 0.15,
        vx: Math.cos(a) * v, vy: caso(2, 6), vz: Math.sin(a) * v,
        rx: Math.random() * 6, ry: Math.random() * 6, wx: caso(-12, 12), wy: caso(-12, 12),
        s: caso(0.6, 1.6), t: 0, tinta: colore(palette[Math.floor(Math.random() * palette.length)]), macchia: Math.random() < 0.35,
      });
    }
    const centro = v3(e.x, suolo + 1.2, e.z);
    kit.effetti?.sangue?.(centro, ASSE_Y, 26);
    kit.effetti?.sangue?.(v3(e.x, suolo + 0.7, e.z), null, 18);
    kit.effetti?.ossa?.(centro, 12);
    for (let i = 0; i < 2; i++) kit.effetti?.macchia?.(e.x, e.z);
    for (let i = 0; i < Math.round(8 * densita); i++) {
      const a = Math.random() * PI * 2;
      sbuffo(e.x, suolo + caso(0.6, 1.5), e.z, Math.cos(a) * caso(0.5, 2), caso(0, 0.8), Math.sin(a) * caso(0.5, 2), 0.6, 1.8, tinte.sangue, 0.5, caso(0.7, 1.1));
    }
  }

  function aggiornaPezzi(dt) {
    let n = 0;
    for (let i = pezzi.length - 1; i >= 0; i--) {
      const p = pezzi[i];
      p.t += dt;
      if (p.t > VITA_PEZZI) {
        pezzi.splice(i, 1);
        continue;
      }
      p.vy -= 9.8 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      p.rx += p.wx * dt;
      p.ry += p.wy * dt;
      const suolo = quota(p.x, p.z) + 0.04 * p.s;
      if (p.y < suolo) {
        p.y = suolo;
        if (p.vy < -1 && p.macchia) {
          p.macchia = false;
          kit.effetti?.macchia?.(p.x, p.z);
        }
        p.vy = Math.abs(p.vy) > 1 ? -p.vy * 0.3 : 0;
        p.vx *= 0.55;
        p.vz *= 0.55;
        p.wx *= 0.5;
        p.wy *= 0.5;
      }
      const scala = p.s * Math.min(1, (VITA_PEZZI - p.t) / 0.6);
      tmp.q.setFromEuler(tmp.e.set(p.rx, p.ry, 0));
      pezziMesh.setMatrixAt(n, tmp.m.compose(tmp.a.set(p.x, p.y, p.z), tmp.q, tmp.s.set(scala, scala, scala)));
      pezziMesh.setColorAt(n, p.tinta);
      n += 1;
    }
    pezziMesh.count = n;
    pezziMesh.visible = n > 0;
    if (n) {
      pezziMesh.instanceMatrix.needsUpdate = true;
      pezziMesh.instanceColor.needsUpdate = true;
    }
  }

  function aggiornaTransitori(dt, tempo) {
    for (let i = lampi.length - 1; i >= 0; i--) {
      const l = lampi[i];
      l.t += dt;
      const f = l.t / l.durata;
      if (f >= 1) {
        lampi.splice(i, 1);
        continue;
      }
      bagliori.metti(l.x, l.y, l.z, l.d0 + (l.d1 - l.d0) * esce(f), l.tinta, l.alfa * (1 - f) ** 1.5);
    }
    for (let i = sbuffi.length - 1; i >= 0; i--) {
      const s = sbuffi[i];
      s.t += dt;
      const f = s.t / s.durata;
      if (f >= 1) {
        sbuffi.splice(i, 1);
        continue;
      }
      const k = 1 / (1 + dt * 2);
      s.vx *= k;
      s.vy *= k;
      s.vz *= k;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.z += s.vz * dt;
      vapori.metti(s.x, s.y, s.z, s.d0 + (s.d1 - s.d0) * esce(f), s.tinta, s.alfa * Math.min(1, f * 8) * (1 - f) ** 1.2, s.rot + s.giro * s.t, s.seme);
    }
    for (let i = urti.length - 1; i >= 0; i--) {
      const u = urti[i];
      u.t += dt;
      const f = u.t / u.durata;
      if (f >= 1) {
        urti.splice(i, 1);
        continue;
      }
      const q = u.faccia ? camera.quaternion : u.quaternione;
      anelli.metti(u.posizione, q, u.r0 + (u.r1 - u.r0) * esce(f), u.tinta, u.alfa * (1 - f) ** 1.3, u.spessore, u.seme);
    }
    for (let i = gusci.length - 1; i >= 0; i--) {
      const g = gusci[i];
      g.t += dt;
      const f = g.t / g.durata;
      if (f >= 1) {
        g.mesh.visible = false;
        poolGusci.push(g.mesh);
        gusci.splice(i, 1);
        continue;
      }
      g.mesh.scale.setScalar(g.r0 + (g.r1 - g.r0) * esce(f));
      g.mesh.material.uniforms.uAlfa.value = (1 - f) ** 1.5;
    }
  }

  function vicinoAcqua(ab, p) {
    if (ab && livelloAcqua(ab, p.x, p.z) > -Infinity) return 1;
    const dr = Math.hypot(p.x - REATTORE.x, p.z - REATTORE.z) - REATTORE.pozzo;
    const dd = Math.hypot(p.x - DELTA.x, p.z - DELTA.z) - DELTA.platea;
    return 1 - fermo(Math.min(dr, dd) / VICINO_ACQUA, 0, 1);
  }

  kit.ogniFotogramma((v, dtGrezzo, tempo, punto) => {
    const dt = fermo(dtGrezzo, 0, DT_MASSIMO);
    vista = v;
    tempoOra = tempo;
    tempoU.value = tempo;
    fotogramma += 1;
    aggiornaMimetica(tempo);
    nastri.inizia(camera);
    bagliori.inizia();
    vapori.inizia();
    anelli.inizia();
    pozzeMesh.inizia();
    bolleMesh.inizia();
    const ab = v?.abisso;
    for (const [id, scade] of implosi) if (scade < tempo) implosi.delete(id);
    if (ab) {
      sincronizzaGlobi(ab, dt);
      sincronizzaDardi(ab, dt);
      sincronizzaPozze(ab, dt);
      sincronizzaNubi(ab, dt);
    }
    for (const g of globi.values()) aggiornaGlobo(g, dt, tempo);
    for (let i = collassi.length - 1; i >= 0; i--) if (aggiornaCollasso(collassi[i], dt, tempo)) collassi.splice(i, 1);
    aggiornaSfere(ab ?? { sfere: [] }, dt, tempo);
    for (const d of dardi.values()) aggiornaDardo(d, dt, tempo);
    for (const p of pozze.values()) aggiornaPozza(p, dt);
    for (const n of nubi.values()) aggiornaNube(n, dt, tempo);
    for (let i = onde.length - 1; i >= 0; i--) if (aggiornaOnda(onde[i], dt, tempo)) onde.splice(i, 1);
    for (let i = fulmini.length - 1; i >= 0; i--) if (aggiornaFulmine(fulmini[i], dt)) fulmini.splice(i, 1);
    for (let i = soniche.length - 1; i >= 0; i--) {
      soniche[i].t += dt;
      if (aggiornaSonica(soniche[i])) soniche.splice(i, 1);
    }
    for (const [id, m] of mire) if (aggiornaMira(m, v, dt, tempo)) mire.delete(id);
    const anelliCatena = [];
    for (let i = arpioni.length - 1; i >= 0; i--) if (aggiornaArpione(arpioni[i], v, dt, anelliCatena)) arpioni.splice(i, 1);
    const maglie = Math.min(anelliCatena.length, catenaMesh.instanceMatrix.count);
    anelliCatena.slice(0, maglie).forEach(([p, q], i) => catenaMesh.setMatrixAt(i, tmp.m.compose(p, q, unoUno)));
    catenaMesh.count = maglie;
    catenaMesh.visible = maglie > 0;
    if (maglie) catenaMesh.instanceMatrix.needsUpdate = true;
    aggiornaPezzi(dt);
    aggiornaTransitori(dt, tempo);
    scintille.aggiorna(dt, tempo);
    if (punto) ambiente.aggiorna(punto, dt, 0.42 + 0.58 * vicinoAcqua(ab, punto));
    nastri.chiudi();
    bagliori.chiudi();
    vapori.chiudi();
    anelli.chiudi();
    pozzeMesh.chiudi();
    bolleMesh.chiudi();
  });

  const gestori = {
    implosioneCariddi(e) {
      implosi.set(e.id, tempoOra + 2);
      const g = globi.get(e.id);
      if (g) {
        globi.delete(e.id);
        if (!g.fermo) {
          g.fermo = true;
          g.scalaGuscio = g.raggio * 0.3;
          g.guscio.visible = true;
          g.correnti.visible = true;
        }
        avviaCollasso(g, e);
        return;
      }
      const nuovo = attivaGlobo({ id: e.id, x: e.x, y: e.y, z: e.z, raggio: RAGGIO_GLOBO * (e.potente ? 1.25 : 1), potente: e.potente, timer: 0 });
      nuovo.fermo = true;
      nuovo.scalaGuscio = nuovo.raggio;
      nuovo.guscio.visible = true;
      nuovo.correnti.visible = true;
      avviaCollasso(nuovo, e);
    },
    sferaPresa: scoppiaSfera,
    ondaTridente: lanciaOnda,
    dardoLanciato(e, v) {
      const g = v?.giocatori?.find(q => q.id === e.a);
      if (!g) return;
      const p = eLocale(v, g)
        ? v3(0.18, 0.05, -0.9).applyQuaternion(camera.quaternion).add(camera.position)
        : v3(g.x, quota(g.x, g.z) + 1.4, g.z);
      lampo(p.x, p.y, p.z, 0.3, 1.4, tinte.tridente, 0.22, 0.9);
      scariche(p.x, p.y, p.z, 16, tinte.tridente, 2.5);
    },
    fulmineTridente: lanciaFulmine,
    ondaSonica: lanciaSonica,
    arpioneMira(e) {
      mire.set(e.zombie, { zombie: e.zombie, a: e.a, t: 0 });
    },
    arpione: lanciaArpione,
    arpioneMancato(e) {
      mire.delete(e.zombie);
    },
    smembra,
  };

  const globoPronto = nuovoGlobo();
  globoPronto.gruppo.visible = false;
  poolGlobi.push(globoPronto);
  for (const [nuovo, pool] of [[nuovoGuscioUrto, poolGusci], [nuovaLama, poolOnde], [nuovaTesta, poolTeste]]) {
    const mesh = nuovo();
    mesh.visible = false;
    pool.push(mesh);
  }

  kit.suEvento((e, v) => {
    const fn = gestori[e?.k];
    if (fn) fn(e, v ?? vista);
  });

  kit.suSvuota(() => {
    for (const g of [...globi.values(), ...collassi]) rilasciaGlobo(g);
    globi.clear();
    collassi.length = 0;
    implosi.clear();
    for (const p of pozze.values()) spegni(p.luce);
    for (const mappa of [sfere, dardi, pozze, nubi, mire]) mappa.clear();
    for (const o of onde.splice(0)) {
      o.mesh.visible = false;
      poolOnde.push(o.mesh);
    }
    for (const r of arpioni.splice(0)) {
      r.testa.visible = false;
      poolTeste.push(r.testa);
    }
    for (const g of gusci.splice(0)) {
      g.mesh.visible = false;
      poolGusci.push(g.mesh);
    }
    for (const lista of [fulmini, soniche, pezzi, lampi, sbuffi, urti]) lista.length = 0;
    pezziMesh.count = 0;
    catenaMesh.count = 0;
    scintille.svuota();
  });
}
