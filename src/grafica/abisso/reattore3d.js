import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { REATTORE, BARRE, CONDOTTI, OSTACOLI, ACQUISTI, quota } from '../../mappe/abisso.js';
import { ARMI } from '../../regole.js';
import { A } from '../../abisso/costanti.js';
import { modelloArma } from '../armi3d.js';
import { creaMeraviglia } from './armi3d.js';
import { conCaustiche } from './kit.js';

const SETTORE = 'beta';
const SETTORE_DELTA = 'delta';
const C = REATTORE;
const R_POZZO = REATTORE.pozzo;
const R_NUCLEO = REATTORE.nucleo;
const R_RAMPA = REATTORE.rampa;
const Y_FONDO = REATTORE.fondo;
const ALZATA_ACQUA = REATTORE.allagato - REATTORE.fondo;
const TETTO = 10;
const SOTTO = -0.5;
const ALTO_FINESTRA = 2.4;
const ALTO_PORTA = 2.6;
const ALTO_CORRIDOIO = 3.2;
const ALTO_STAGNA = 3.6;
const TUNNEL = Object.freeze({ y: 1, r: 2.3 });
const PORTELLO = Object.freeze({ x: 58.5, y: 1.45, z: 0, r: 1.25, perno: 58.66, cerniera: -1.27 });
const FARO = Object.freeze({ x: 56.4, z: 0 });
const R_PRESA = 2;
const ANELLI_NUCLEO = Object.freeze([-1.8, 0.6, 3, 5.4, 7.8]);
const Y_BALLATOIO = 6;
const R_BALLATOIO = 4.9;
const UGELLI = Object.freeze([1.75, 2.3, 2.85, -2.85, -2.3, -1.75]);
const R_UGELLO = 8.82;
const Y_UGELLO = -0.78;
const X_GRU = 47.5;
const ORICALCO = 0x2fd0ff;
const AMBRA = 0xffc27a;
const ROSSO_ALLARME = 0xff3020;
const COLORE_ACQUA = 0x02303a;
const NEBBIA_ACQUA = Object.freeze({ fattore: 0.45, colore: COLORE_ACQUA });
const NEBBIA_CONDOTTO = Object.freeze({ fattore: 0.55, colore: 0x03303c });
const DURATA_PORTA = 1.8;
const DURATA_ESTRAZIONE = 1.4;
const APRE_PORTELLO = 0.18;
const RESTA_PORTELLO = 0.9;
const CHIUDE_PORTELLO = 1.3;
const APERTURA_PORTELLO = 1.35;
const DURATA_SPRUZZO = 1;
const APERTURA_COPERCHIO = 1.15;
const SCALA_CANNONE = 2;
const SCALA_ARMA_SCRIGNO = 1.25;
const ANTICIPO_CONDOTTO = 0.12;
const LIMITE_TUBO = -1.6;
const R_TUBO = 1.4;
const PASSO_ANELLI_TUBO = 2.2;
const LATO_ATLANTE = 1024;
const BOLLE_POZZO = 220;
const BOLLE_TRANSITO = 70;
const SCINTILLE_FASCIO = 40;
const SCALA_PUNTI = 620;
const ASSE_Y = new THREE.Vector3(0, 1, 0);
const ASSE_Z = new THREE.Vector3(0, 0, 1);
const UNO = new THREE.Vector3(1, 1, 1);

const VOCI_ATLANTE = Object.freeze({
  pericolo: [0, 0, 320, 200],
  talassa: [320, 0, 256, 256],
  quadrante: [576, 0, 128, 128],
  beta: [0, 256, 1024, 128],
  rampa: [0, 384, 384, 112],
  propulsione: [384, 384, 384, 112],
  stagna: [768, 384, 256, 112],
  decompressione: [0, 496, 512, 96],
  allagamento: [512, 496, 512, 96],
  fucina: [0, 592, 384, 96],
  pompe: [384, 592, 384, 96],
  carico: [768, 592, 256, 96],
  sporgersi: [0, 688, 512, 64],
  tunnel: [512, 688, 512, 64],
  erre2: [0, 752, 256, 128],
  pressione: [256, 752, 384, 128],
  turbina2: [640, 752, 256, 128],
  fascia: [0, 896, 1024, 64],
});

const PARETI = Object.freeze({
  nord: Object.freeze({ asse: 'z', fisso: -13.8, verso: 1, ry: 0 }),
  sud: Object.freeze({ asse: 'z', fisso: 13.8, verso: -1, ry: Math.PI }),
  ovest: Object.freeze({ asse: 'x', fisso: 24.2, verso: 1, ry: Math.PI / 2 }),
  est: Object.freeze({ asse: 'x', fisso: 52.3, verso: -1, ry: -Math.PI / 2 }),
});
const PILASTRI = Object.freeze({ nord: [26.8, 33.4, 37, 42.6, 48.6], sud: [26.8, 33.4, 38, 42.6, 49], ovest: [-11, -3.6, 3.6, 12.2], est: [-12.2, -4, 6.4, 10.8] });
const VARCHI = Object.freeze({ nord: [[28.78, 31.22], [43.78, 46.22]], sud: [[28.78, 31.22], [44.2, 47.2]], ovest: [[-2.5, 2.5]], est: [[-2.8, 2.8]] });
const ESTREMI = Object.freeze({ nord: [24.2, 52.3], sud: [24.2, 52.3], ovest: [-13.8, 13.8], est: [-13.8, 13.8] });
const OBLO = Object.freeze([
  ['nord', 25.4, 3.6, 0.36], ['nord', 30, 3.65, 0.36], ['nord', 39.8, 3.6, 0.36], ['nord', 45, 3.65, 0.36], ['nord', 51, 3.6, 0.36],
  ['nord', 30, 7, 0.55], ['nord', 35.2, 7, 0.55], ['nord', 39.8, 7, 0.55], ['nord', 45.6, 7, 0.55],
  ['sud', 25.4, 3.6, 0.36], ['sud', 30, 3.65, 0.36], ['sud', 35, 3.6, 0.36], ['sud', 41, 3.6, 0.36], ['sud', 51, 3.6, 0.36],
  ['sud', 30, 7, 0.55], ['sud', 35.7, 7, 0.55], ['sud', 40.3, 7, 0.55], ['sud', 45.7, 7, 0.55],
  ['ovest', -8.6, 3.6, 0.36], ['ovest', 6.2, 3.6, 0.36], ['ovest', -8.6, 7, 0.55], ['ovest', 6, 7.2, 0.55],
  ['est', -7.6, 3.6, 0.36], ['est', 8.6, 3.6, 0.36], ['est', -7.6, 7, 0.55], ['est', 0, 7, 0.55], ['est', 8.6, 7, 0.55],
]);

const RUMORE_GLSL = `
float casoAbisso(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float rumoreAbisso(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(casoAbisso(i), casoAbisso(i + vec3(1.0, 0.0, 0.0)), f.x), mix(casoAbisso(i + vec3(0.0, 1.0, 0.0)), casoAbisso(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(casoAbisso(i + vec3(0.0, 0.0, 1.0)), casoAbisso(i + vec3(1.0, 0.0, 1.0)), f.x), mix(casoAbisso(i + vec3(0.0, 1.0, 1.0)), casoAbisso(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}
float fbmAbisso(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    s += a * rumoreAbisso(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}
`;

const VERTICE = `
#include <common>
#include <fog_pars_vertex>
varying vec3 vMondo;
varying vec3 vNormale;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 locale = vec4(position, 1.0);
  vec3 n = normal;
  #ifdef USE_INSTANCING
    locale = instanceMatrix * locale;
    n = mat3(instanceMatrix) * n;
  #endif
  vec4 mondo = modelMatrix * locale;
  vMondo = mondo.xyz;
  vNormale = normalize(mat3(modelMatrix) * n);
  vec4 mvPosition = viewMatrix * mondo;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const TESTA = `#include <common>
#include <fog_pars_fragment>
uniform float uTempo;
varying vec3 vMondo;
varying vec3 vNormale;
varying vec2 vUv;
${RUMORE_GLSL}`;

const TESTA_PUNTI = `#include <common>
#include <fog_pars_fragment>
uniform float uTempo;
varying float vAlfa;
${RUMORE_GLSL}`;

const FINE = `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>`;

const FINE_ADDITIVA = `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>`;

const FRAMMENTO_PLASMA = `
uniform vec3 uCentro;
uniform float uRaggio;
uniform float uEnergia;
uniform float uAgitazione;
uniform vec3 uColoreA;
uniform vec3 uColoreB;
uniform vec3 uColoreC;
void main() {
  vec3 ro = vMondo - uCentro;
  vec3 rd = normalize(vMondo - cameraPosition);
  float a = max(dot(rd.xz, rd.xz), 1e-4);
  float b = dot(ro.xz, rd.xz);
  float c = dot(ro.xz, ro.xz) - uRaggio * uRaggio;
  float tFuori = max((-b + sqrt(max(b * b - a * c, 0.0))) / a, 0.0);
  float cc = dot(ro.xz, ro.xz) - 0.36;
  float dc = b * b - a * cc;
  float tColonna = dc > 0.0 ? (-b - sqrt(dc)) / a : 1e5;
  bool colonna = tColonna > 0.0 && tColonna < tFuori;
  float tFine = colonna ? tColonna : tFuori;
  float passo = tFine / 8.0;
  float scarto = casoAbisso(vec3(gl_FragCoord.xy, 1.0));
  float velocita = 0.7 + uAgitazione * 0.9;
  vec3 somma = vec3(0.0);
  float trasmessa = 1.0;
  for (int i = 0; i < 8; i++) {
    vec3 p = ro + rd * passo * (float(i) + scarto);
    float r = length(p.xz);
    float giro = atan(p.z, p.x) - uTempo * velocita + p.y * 0.22 + r * 0.55;
    vec3 q = vec3(cos(giro) * r, p.y * 0.42 - uTempo * (0.8 + uAgitazione), sin(giro) * r);
    float n = fbmAbisso(q * 1.15);
    float filo = 1.0 - abs(2.0 * rumoreAbisso(q * 2.6 + n * 2.0) - 1.0);
    filo = pow(filo, 7.0);
    float densita = smoothstep(0.32, 0.82, n) * 0.85 + filo * 1.5 + exp(-r * 1.1) * 0.35;
    vec3 tinta = mix(uColoreA, uColoreB, smoothstep(0.35, 0.85, n)) + uColoreC * filo * 0.7;
    somma += tinta * densita * trasmessa * passo;
    trasmessa *= exp(-densita * passo * 0.5);
  }
  vec3 colore = somma * 0.36 * uEnergia;
  if (colonna) {
    vec3 pc = ro + rd * tColonna;
    float anelli = smoothstep(0.8, 1.0, sin(pc.y * 3.2 - uTempo * 2.5) * 0.5 + 0.5);
    colore += trasmessa * (vec3(0.06, 0.05, 0.035) + uColoreB * anelli * 1.6 * uEnergia);
  } else {
    colore += trasmessa * uColoreA * 0.35 * uEnergia;
  }
  vec3 normale = normalize(vec3(ro.x, 0.0, ro.z));
  float bordo = pow(1.0 - abs(dot(normale, rd)), 2.5);
  colore += uColoreB * bordo * 0.45 * uEnergia;
  gl_FragColor = vec4(colore, 1.0);
  ${FINE}
}`;

const FRAMMENTO_ACQUA = `
uniform vec3 uCentro;
uniform vec3 uProfondo;
uniform vec3 uRiflesso;
uniform float uAgitazione;
void main() {
  vec2 p = vMondo.xz;
  float t = uTempo;
  vec2 g = vec2(0.0);
  g += vec2(0.8, 0.3) * cos(dot(p, vec2(0.8, 0.3)) * 3.1 + t * 1.7) * 0.07;
  g += vec2(-0.4, 0.9) * cos(dot(p, vec2(-0.4, 0.9)) * 4.3 + t * 2.1) * 0.05;
  g += vec2(0.6, -0.7) * cos(dot(p, vec2(0.6, -0.7)) * 7.7 + t * 2.9) * 0.03;
  vec2 dalCentro = p - uCentro.xz;
  float r = length(dalCentro);
  g += dalCentro / max(r, 0.01) * cos(r * 5.0 - t * 3.0) * 0.05 * (1.0 + uAgitazione);
  float e = 0.12;
  float n0 = rumoreAbisso(vec3(p * 1.7, t * 0.6));
  float nx = rumoreAbisso(vec3((p + vec2(e, 0.0)) * 1.7, t * 0.6));
  float nz = rumoreAbisso(vec3((p + vec2(0.0, e)) * 1.7, t * 0.6));
  g += vec2(nx - n0, nz - n0) / e * 0.06 * (1.0 + uAgitazione * 2.0);
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 v = normalize(cameraPosition - vMondo);
  bool sotto = cameraPosition.y < vMondo.y;
  if (sotto) n = -n;
  float nv = max(dot(n, v), 0.0);
  float fresnel = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
  vec3 rifl = reflect(-v, n);
  vec3 cielo = mix(vec3(0.015, 0.05, 0.065), vec3(0.12, 0.3, 0.36), smoothstep(-0.2, 0.9, rifl.y));
  float vicino = exp(-max(r - 3.0, 0.0) * 0.5);
  vec3 colore = mix(uProfondo + uRiflesso * vicino * 0.35, cielo + uRiflesso * vicino * 0.5, fresnel);
  float lucido = pow(max(dot(rifl, normalize(vec3(0.25, 1.0, 0.15))), 0.0), 90.0);
  colore += vec3(1.0, 0.72, 0.42) * lucido * 1.8;
  float schiuma = smoothstep(0.6, 0.92, rumoreAbisso(vec3(p * 3.2, t * 1.1))) * (smoothstep(8.2, 9.1, r) + smoothstep(3.7, 3.0, r));
  colore += vec3(0.65, 0.85, 0.95) * schiuma * 0.55;
  float alfa = mix(0.6, 0.96, fresnel) + schiuma * 0.3;
  if (sotto) {
    colore = mix(uProfondo * 1.6, vec3(0.3, 0.62, 0.7), pow(1.0 - nv, 1.5)) + uRiflesso * vicino * 0.4;
    alfa = 0.88;
  }
  gl_FragColor = vec4(colore, clamp(alfa, 0.0, 1.0));
  ${FINE}
}`;

const VERTICE_BOLLE = `
#include <common>
#include <fog_pars_vertex>
attribute vec4 seme;
uniform float uTempo;
uniform float uFondo;
uniform float uLivello;
uniform vec3 uCentro;
uniform float uScala;
varying float vAlfa;
void main() {
  float alto = max(uLivello - uFondo, 0.05);
  float y = uFondo + mod(seme.z * alto + uTempo * seme.w, alto);
  float a = seme.x + sin(uTempo * 1.3 + seme.z * 20.0) * 0.05;
  vec3 p = vec3(uCentro.x + cos(a) * seme.y + sin(uTempo * 2.0 + seme.z * 9.0) * 0.06, y, uCentro.z + sin(a) * seme.y);
  vec4 mvPosition = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uScala * (0.035 + seme.w * 0.03) / max(-mvPosition.z, 0.2);
  vAlfa = smoothstep(0.0, 0.25, uLivello - y) * smoothstep(0.0, 0.2, y - uFondo);
  #include <fog_vertex>
}`;

const VERTICE_TRANSITO = `
#include <common>
#include <fog_pars_vertex>
attribute vec4 seme;
uniform float uTempo;
uniform float uScala;
varying float vAlfa;
void main() {
  float lungo = 16.0;
  float z = -0.6 - mod(seme.z * lungo - uTempo * (10.0 + seme.w * 14.0), lungo);
  vec3 p = vec3(seme.x * 1.25 + sin(uTempo * 3.0 + seme.z * 30.0) * 0.05, seme.y * 1.1, z);
  vec4 mvPosition = vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uScala * (0.05 + seme.w * 0.06) / max(-z, 0.3);
  vAlfa = smoothstep(16.6, 10.0, -z) * smoothstep(0.6, 2.0, -z);
  #include <fog_vertex>
}`;

const VERTICE_SCINTILLE = `
#include <common>
#include <fog_pars_vertex>
attribute vec4 seme;
uniform float uTempo;
uniform vec3 uCentro;
uniform float uScala;
uniform float uAlto;
varying float vAlfa;
void main() {
  float y = mod(seme.z * uAlto + uTempo * (0.4 + seme.w * 0.6), uAlto);
  float a = seme.x + uTempo * 0.3;
  float r = seme.y * (0.42 + y * 0.02);
  vec4 mvPosition = viewMatrix * vec4(uCentro + vec3(cos(a) * r, y, sin(a) * r), 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uScala * (0.03 + seme.w * 0.04) / max(-mvPosition.z, 0.2);
  vAlfa = (1.0 - y / uAlto) * smoothstep(0.0, 0.3, y);
  #include <fog_vertex>
}`;

const FRAMMENTO_BOLLE = `
uniform vec3 uColore;
void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float d = length(q);
  if (d > 1.0) discard;
  float bordo = smoothstep(0.55, 0.95, d) * (1.0 - smoothstep(0.95, 1.0, d));
  float luce = smoothstep(0.35, 0.0, length(q - vec2(-0.35, -0.35)));
  float alfa = (bordo * 0.8 + luce * 0.9 + 0.06) * vAlfa;
  gl_FragColor = vec4(uColore * (0.6 + luce), alfa);
  ${FINE}
}`;

const FRAMMENTO_SCINTILLA = `
uniform vec3 uColore;
uniform float uForza;
void main() {
  float d = length(gl_PointCoord * 2.0 - 1.0);
  float c = pow(max(1.0 - d, 0.0), 2.5);
  gl_FragColor = vec4(uColore * c * vAlfa * uForza * 2.0, 1.0);
  ${FINE_ADDITIVA}
}`;

const FRAMMENTO_GETTO = `
uniform float uForza;
uniform float uLivello;
void main() {
  if (vMondo.y < uLivello) discard;
  float scorre = rumoreAbisso(vec3(vUv.x * 9.0 - uTempo * 7.0, vUv.y * 6.2831, uTempo * 0.5));
  float strisce = smoothstep(0.3, 0.85, scorre);
  vec3 v = normalize(cameraPosition - vMondo);
  float faccia = pow(abs(dot(normalize(vNormale), v)), 0.6);
  vec3 colore = vec3(0.55, 0.82, 0.95) * (0.35 + strisce * 0.9);
  float alfa = uForza * faccia * (0.22 + strisce * 0.55) * smoothstep(0.0, 0.05, vUv.x) * (1.0 - smoothstep(0.8, 1.0, vUv.x));
  gl_FragColor = vec4(colore, alfa);
  ${FINE}
}`;

const FRAMMENTO_FASCIO = `
uniform float uForza;
uniform vec3 uColore;
void main() {
  vec3 v = normalize(cameraPosition - vMondo);
  float centro = pow(abs(dot(normalize(vNormale), v)), 2.0);
  float alto = vUv.y;
  float sfuma = pow(1.0 - alto, 1.3) * smoothstep(0.0, 0.04, alto);
  float n = rumoreAbisso(vec3(vUv.x * 14.0, alto * 8.0 - uTempo * 1.3, uTempo * 0.25));
  float filo = pow(1.0 - abs(n * 2.0 - 1.0), 6.0);
  vec3 colore = uColore * (0.35 + n * 0.6 + filo * 1.3) * centro * sfuma * uForza * 0.85;
  gl_FragColor = vec4(colore, 1.0);
  ${FINE_ADDITIVA}
}`;

const FRAMMENTO_ALONE = `
uniform vec3 uColore;
uniform float uForza;
void main() {
  vec3 v = normalize(cameraPosition - vMondo);
  float c = pow(abs(dot(normalize(vNormale), v)), 3.0);
  float pulsa = 0.8 + 0.2 * sin(uTempo * 4.0 + vMondo.y * 6.0);
  gl_FragColor = vec4(uColore * c * uForza * pulsa, 1.0);
  ${FINE_ADDITIVA}
}`;

const FRAMMENTO_CONO = `
uniform vec3 uColore;
uniform float uForza;
void main() {
  vec3 v = normalize(cameraPosition - vMondo);
  float faccia = pow(abs(dot(normalize(vNormale), v)), 1.2);
  float vicino = pow(vUv.y, 2.2);
  gl_FragColor = vec4(uColore * uForza * faccia * vicino, 1.0);
  ${FINE_ADDITIVA}
}`;

const FRAMMENTO_OCEANO = `
void main() {
  vec3 rd = normalize(vMondo - cameraPosition);
  vec3 fuori = -normalize(vNormale);
  float coseno = max(dot(rd, fuori), 0.15);
  vec3 colore = mix(vec3(0.004, 0.02, 0.03), vec3(0.02, 0.09, 0.12), smoothstep(-0.6, 0.6, rd.y));
  for (int k = 1; k <= 3; k++) {
    float profondo = float(k) * 1.6;
    vec3 p = vMondo + rd * (profondo / coseno);
    p.y += uTempo * 0.08 * float(k);
    p.x += sin(uTempo * 0.2 + float(k)) * 0.3;
    vec3 cella = floor(p * 2.2);
    vec3 dentro = fract(p * 2.2) - 0.5;
    vec3 punto = vec3(casoAbisso(cella), casoAbisso(cella + 7.1), casoAbisso(cella + 3.7)) - 0.5;
    float neve = smoothstep(0.08, 0.0, length(dentro - punto * 0.7)) * step(0.55, casoAbisso(cella + 1.3));
    colore += vec3(0.5, 0.75, 0.8) * neve * (0.5 / float(k));
  }
  float raggi = pow(max(sin(rd.x * 9.0 + rd.z * 7.0 + uTempo * 0.4) * 0.5 + 0.5, 0.0), 8.0) * smoothstep(0.0, 0.8, rd.y + 0.3);
  colore += vec3(0.05, 0.18, 0.22) * raggi;
  float fresnel = pow(1.0 - abs(dot(rd, normalize(vNormale))), 3.0);
  colore = mix(colore, vec3(0.3, 0.38, 0.4), fresnel * 0.5);
  colore *= 0.75 + fbmAbisso(vMondo * 6.0) * 0.5;
  gl_FragColor = vec4(colore, 1.0);
  ${FINE}
}`;

const FRAMMENTO_VORTICE = `
uniform float uForza;
void main() {
  vec2 q = vUv * 2.0 - 1.0;
  float r = length(q);
  float a = atan(q.y, q.x);
  float spirale = a * 3.0 + log(max(r, 0.02)) * 4.0 + uTempo * (1.0 + uForza * 5.0);
  float bracci = sin(spirale) * 0.5 + 0.5;
  float schiuma = smoothstep(0.55, 0.95, rumoreAbisso(vec3(cos(spirale) * 2.0 + r * 4.0, sin(spirale) * 2.0, uTempo * 0.7)));
  float buco = smoothstep(0.05, 0.6, r);
  vec3 colore = mix(vec3(0.0, 0.02, 0.03), vec3(0.04, 0.22, 0.28), buco * (0.4 + bracci * 0.6));
  colore += vec3(0.5, 0.85, 1.0) * schiuma * buco * (0.25 + uForza * 0.8);
  colore += vec3(0.18, 0.75, 1.0) * pow(bracci, 6.0) * buco * uForza * 0.9;
  gl_FragColor = vec4(colore, 1.0);
  ${FINE}
}`;

const FRAMMENTO_TUBO = `
uniform float uFlusso;
void main() {
  vec3 v = normalize(cameraPosition - vMondo);
  float fresnel = pow(1.0 - abs(dot(normalize(vNormale), v)), 2.5);
  float strisce = rumoreAbisso(vec3(vUv.x * 60.0 - uTempo * 4.0 * uFlusso, vUv.y * 10.0, 0.0));
  float filo = pow(1.0 - abs(strisce * 2.0 - 1.0), 8.0) * uFlusso;
  float caustica = rumoreAbisso(vMondo * 1.3 + vec3(0.0, uTempo * 0.5, 0.0));
  vec3 colore = vec3(0.2, 0.55, 0.65) * (fresnel * 0.9 + 0.08) + vec3(0.5, 0.9, 1.0) * filo * 0.5 + vec3(0.1, 0.3, 0.35) * caustica * 0.15;
  float alfa = clamp(0.08 + fresnel * 0.6 + filo * 0.3, 0.0, 0.85);
  gl_FragColor = vec4(colore, alfa);
  ${FINE}
}`;

const FRAMMENTO_FUSO = `
uniform float uCalore;
void main() {
  vec3 p = vMondo * 6.0;
  float n = fbmAbisso(p + vec3(uTempo * 0.4, 0.0, uTempo * 0.3));
  float vene = pow(1.0 - abs(2.0 * rumoreAbisso(p * 1.7 + n * 3.0 - uTempo * 0.6) - 1.0), 5.0);
  vec3 colore = mix(vec3(0.05, 0.25, 0.4), vec3(0.4, 0.95, 1.2), n) * (0.6 + vene * 1.8);
  colore = mix(colore, vec3(1.4, 0.6, 0.18), smoothstep(0.75, 0.95, n) * 0.4);
  gl_FragColor = vec4(colore * uCalore * 2.2, 1.0);
  ${FINE}
}`;

const FRAMMENTO_CUORE = `
uniform float uBattito;
void main() {
  vec3 v = normalize(cameraPosition - vMondo);
  float bordo = pow(1.0 - abs(dot(normalize(vNormale), v)), 2.0);
  float n = fbmAbisso(vMondo * 9.0 + vec3(0.0, uTempo * 0.8, 0.0));
  float vene = pow(1.0 - abs(2.0 * rumoreAbisso(vMondo * 14.0 - uTempo) - 1.0), 6.0);
  vec3 colore = mix(vec3(0.02, 0.18, 0.35), vec3(0.35, 0.95, 1.3), n) + vec3(0.8, 1.0, 1.0) * vene * 1.5 + vec3(0.3, 0.8, 1.0) * bordo * 1.5;
  gl_FragColor = vec4(colore * (0.8 + uBattito * 1.6), 1.0);
  ${FINE}
}`;

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const limita = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const morbido = t => {
  const x = limita(t);
  return x * x * (3 - 2 * x);
};
const tendi = (attuale, meta, velocita, dt) => attuale + (meta - attuale) * Math.min(1, velocita * dt);
const yRampa = a => Y_FONDO * limita((a + Math.PI / 2) / Math.PI);
const polare = (r, a, y = 0) => v3(C.x + Math.cos(a) * r, y, C.z + Math.sin(a) * r);
const centroDi = o => v3((o.x0 + o.x1) / 2, o.base ?? 0, (o.z0 + o.z1) / 2);

function generatore(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function posa(x, y, z, ry = 0, rx = 0, rz = 0, s = 1) {
  const scala = typeof s === 'number' ? v3(s, s, s) : s;
  return new THREE.Matrix4().compose(v3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), scala);
}

function scatola(x0, y0, z0, x1, y1, z1) {
  return new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
}

function orienta(g, da, a) {
  const d = new THREE.Vector3().subVectors(a, da).normalize();
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(ASSE_Y, d));
  return g.translate((da.x + a.x) / 2, (da.y + a.y) / 2, (da.z + a.z) / 2);
}

const cilindroTra = (da, a, r, lati = 8, rFine = r) => orienta(new THREE.CylinderGeometry(rFine, r, da.distanceTo(a), lati, 1), da, a);
const traveTra = (da, a, largo, spesso) => orienta(new THREE.BoxGeometry(largo, da.distanceTo(a), spesso), da, a);
const tubo = (punti, r, lati = 8, perPunto = 2) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), Math.max(4, Math.round(punti.length * perPunto)), r, lati, false);

function arcoPunti(r, a0, a1, quotaDi, passo = 0.3) {
  const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * r) / passo));
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return polare(r, a, quotaDi(a));
  });
}

function segmento(da, a, passo = 0.5) {
  const n = Math.max(1, Math.ceil(da.distanceTo(a) / passo));
  return Array.from({ length: n + 1 }, (_, i) => da.clone().lerp(a, i / n));
}

function uvCilindro(g, su, sv) {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  return g;
}

function arcoCilindro(cx, cz, r, y0, y1, a0, a1, segmenti) {
  const g = new THREE.CylinderGeometry(r, r, y1 - y0, segmenti, 1, true, Math.PI / 2 - a1, a1 - a0);
  return uvCilindro(g, r * (a1 - a0), y1 - y0).translate(cx, (y0 + y1) / 2, cz);
}

function rovescia(geometria) {
  const g = geometria.index ? geometria.toNonIndexed() : geometria;
  for (const att of Object.values(g.attributes)) {
    const k = att.itemSize;
    const a = att.array;
    for (let i = 0; i < att.count; i += 3) {
      for (let j = 0; j < k; j++) {
        const t = a[(i + 1) * k + j];
        a[(i + 1) * k + j] = a[(i + 2) * k + j];
        a[(i + 2) * k + j] = t;
      }
    }
  }
  const n = g.attributes.normal;
  if (n) for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  return g;
}

function striscia(basso, alto) {
  const posizioni = [];
  const uv = [];
  let lungo = 0;
  const lunghezze = basso.map((p, i) => (lungo += i ? p.distanceTo(basso[i - 1]) : 0));
  for (let i = 0; i < basso.length - 1; i++) {
    const quad = [[basso[i], lunghezze[i]], [basso[i + 1], lunghezze[i + 1]], [alto[i], lunghezze[i]], [basso[i + 1], lunghezze[i + 1]], [alto[i + 1], lunghezze[i + 1]], [alto[i], lunghezze[i]]];
    for (const [p, u] of quad) {
      posizioni.push(p.x, p.y, p.z);
      uv.push(u, p.y);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(posizioni, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

function tuboRastremato(curva, segmenti, lati, raggioDi) {
  const g = new THREE.TubeGeometry(curva, segmenti, 1, lati, false);
  const p = g.attributes.position;
  const centro = new THREE.Vector3();
  const q = new THREE.Vector3();
  const peso = new Float32Array(p.count);
  for (let i = 0; i <= segmenti; i++) {
    curva.getPointAt(i / segmenti, centro);
    const r = raggioDi(i / segmenti);
    for (let j = 0; j <= lati; j++) {
      const k = i * (lati + 1) + j;
      q.fromBufferAttribute(p, k).sub(centro).multiplyScalar(r).add(centro);
      p.setXYZ(k, q.x, q.y, q.z);
      peso[k] = i / segmenti;
    }
  }
  g.setAttribute('peso', new THREE.BufferAttribute(peso, 1));
  g.computeVertexNormals();
  return g;
}

function intervalli(da, a, tagli) {
  let pezzi = [[da, a]];
  for (const [t0, t1] of tagli) {
    pezzi = pezzi.flatMap(([p0, p1]) => (t1 <= p0 || t0 >= p1 ? [[p0, p1]] : [[p0, t0], [t1, p1]].filter(([q0, q1]) => q1 - q0 > 0.05)));
  }
  return pezzi;
}

function tagliaCerchio(u, cu, cv, r) {
  const d = r * r - (u - cu) ** 2;
  return d > 0 ? [[cv - Math.sqrt(d), cv + Math.sqrt(d)]] : [];
}

function suParete(p, lungo, y, scosta = 0) {
  const fuori = p.fisso + p.verso * scosta;
  return p.asse === 'z' ? posa(lungo, y, fuori, p.ry) : posa(fuori, y, lungo, p.ry);
}

function unisci(parti) {
  return mergeGeometries(parti.map(g => {
    const n = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) n.deleteAttribute(nome);
    return n;
  }));
}

function copiaTex(t, ripeti) {
  if (!t) return null;
  const c = t.clone();
  c.repeat.set(ripeti, ripeti);
  c.needsUpdate = true;
  return c;
}

function tela(lato) {
  const t = document.createElement('canvas');
  t.width = t.height = lato;
  return t;
}

function texturaStrisce() {
  const lato = 128;
  const caso = generatore(5);
  const t = tela(lato);
  const g = t.getContext('2d');
  const img = g.createImageData(lato, lato);
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const nero = (x + y) % 64 < 32;
      const sporco = 1 - caso() * 0.22;
      const o = (y * lato + x) * 4;
      const [r, v, b] = nero ? [26, 24, 22] : [222, 168, 32];
      img.data[o] = r * sporco;
      img.data[o + 1] = v * sporco;
      img.data[o + 2] = b * sporco;
      img.data[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 40; i++) {
    g.strokeStyle = `rgba(70,50,30,${0.15 + caso() * 0.25})`;
    g.lineWidth = 0.5 + caso() * 1.5;
    g.beginPath();
    const x = caso() * lato;
    const y = caso() * lato;
    g.moveTo(x, y);
    g.lineTo(x + (caso() - 0.5) * 30, y + caso() * 20);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(t);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 4;
  return tex;
}

function texturaStriata() {
  const lato = 256;
  const cella = 32;
  const altezze = new Float32Array(lato * lato);
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const i = Math.floor(x / cella);
      const j = Math.floor(y / cella);
      const u = (x % cella) / cella - 0.5;
      const v = (y % cella) / cella - 0.5;
      const segno = (i + j) % 2 ? 1 : -1;
      const a = (u + segno * v) * Math.SQRT1_2;
      const b = (u - segno * v) * Math.SQRT1_2;
      altezze[y * lato + x] = Math.min(1, Math.max(0, 1 - Math.abs(a) / 0.36 - Math.abs(b) / 0.07) * 3);
    }
  }
  const t = tela(lato);
  const g = t.getContext('2d');
  const img = g.createImageData(lato, lato);
  for (let y = 0; y < lato; y++) {
    for (let x = 0; x < lato; x++) {
      const dx = altezze[y * lato + ((x + 1) % lato)] - altezze[y * lato + ((x - 1 + lato) % lato)];
      const dy = altezze[((y + 1) % lato) * lato + x] - altezze[((y - 1 + lato) % lato) * lato + x];
      const n = v3(-dx * 2.2, -dy * 2.2, 1).normalize();
      const o = (y * lato + x) * 4;
      img.data[o] = (n.x * 0.5 + 0.5) * 255;
      img.data[o + 1] = (n.y * 0.5 + 0.5) * 255;
      img.data[o + 2] = (n.z * 0.5 + 0.5) * 255;
      img.data[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(t);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.5, 2.5);
  tex.anisotropy = 4;
  return tex;
}

function texturaAlone() {
  const t = tela(64);
  const g = t.getContext('2d');
  const s = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  s.addColorStop(0, 'rgba(255,255,255,1)');
  s.addColorStop(0.3, 'rgba(255,255,255,0.45)');
  s.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = s;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(t);
}

function disegnaAtlante() {
  const t = tela(LATO_ATLANTE);
  const g = t.getContext('2d');
  const caso = generatore(77);
  g.fillStyle = '#2a2e30';
  g.fillRect(0, 0, LATO_ATLANTE, LATO_ATLANTE);
  const carattere = d => `bold ${d}px "Arial Narrow", Arial, sans-serif`;
  const scrivi = (testo, x, y, d, colore, largo) => {
    g.font = carattere(d);
    g.fillStyle = colore;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(testo, x, y, largo);
  };
  const targa = (nome, sfondo, inchiostro, righe, bordo = inchiostro) => {
    const [x, y, w, h] = VOCI_ATLANTE[nome];
    g.save();
    g.translate(x, y);
    g.fillStyle = sfondo;
    g.fillRect(0, 0, w, h);
    const spesso = Math.max(3, Math.round(h * 0.05));
    g.strokeStyle = bordo;
    g.lineWidth = spesso;
    g.strokeRect(spesso * 1.5, spesso * 1.5, w - spesso * 3, h - spesso * 3);
    const passo = h / (righe.length + 1);
    righe.forEach(([testo, scala], i) => scrivi(testo, w / 2, passo * (i + 1), Math.round(h * scala), inchiostro, w - spesso * 9));
    g.fillStyle = '#6b6258';
    for (const [bx, by] of [[spesso * 3.5, spesso * 3.5], [w - spesso * 3.5, spesso * 3.5], [spesso * 3.5, h - spesso * 3.5], [w - spesso * 3.5, h - spesso * 3.5]]) {
      g.beginPath();
      g.arc(bx, by, spesso * 0.9, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
  };
  targa('beta', '#14262e', '#e6d7b0', [['ABYSSUS-9  ·  SETTORE  β  ·  REATTORE A ORICALCO', 0.46]], '#b08a48');
  targa('rampa', '#1d4f7a', '#f2efe4', [['RAMPA DI SERVIZIO', 0.28], ['POZZO R-2', 0.24]]);
  targa('propulsione', '#0f3a44', '#bff4ff', [['PROPULSIONE IDRICA', 0.28], ['VERSO IL SETTORE DELTA', 0.2]]);
  targa('stagna', '#7a1410', '#f6efe0', [['CAMERA', 0.26], ['STAGNA', 0.3]]);
  targa('decompressione', '#e0b021', '#141414', [['ATTENZIONE  ·  DECOMPRESSIONE', 0.38]]);
  targa('allagamento', '#24443a', '#e9f0e2', [['ALLAGAMENTO POZZO', 0.4]]);
  targa('fucina', '#3a2414', '#ffcf8a', [['FUCINA DI ORICALCO', 0.4]]);
  targa('pompe', '#2b3a40', '#e8e4d8', [['SALA POMPE  ·  BETA', 0.4]]);
  targa('carico', '#e0b021', '#141414', [['CARICO MAX 5 T', 0.42]]);
  targa('sporgersi', '#e8e2d0', '#8a1010', [['VIETATO SPORGERSI DAL PARAPETTO', 0.5]]);
  targa('tunnel', '#1d4f7a', '#f2efe4', [['TUNNEL DI CRISTALLO  ·  CUPOLA ALPHA', 0.5]]);
  targa('erre2', '#8a1a14', '#f6efe0', [['R-2', 0.55]]);
  targa('pressione', '#1c2a30', '#d8f0f4', [['PRESSIONE ESTERNA', 0.2], ['1086 ATM', 0.3]]);
  targa('turbina2', '#3a3020', '#ffd68a', [['TURBINA', 0.24], ['T-2', 0.36]]);
  {
    const [x, y, w, h] = VOCI_ATLANTE.pericolo;
    g.save();
    g.translate(x, y);
    g.fillStyle = '#e3b322';
    g.fillRect(0, 0, w, h);
    g.lineWidth = 8;
    g.strokeStyle = '#111';
    g.strokeRect(6, 6, w - 12, h - 12);
    g.lineJoin = 'round';
    g.lineWidth = 9;
    g.beginPath();
    g.moveTo(80, 28);
    g.lineTo(140, 134);
    g.lineTo(20, 134);
    g.closePath();
    g.stroke();
    g.fillStyle = '#111';
    for (let k = 0; k < 3; k++) {
      const a = -Math.PI / 2 + (k * Math.PI * 2) / 3;
      g.beginPath();
      g.moveTo(80, 100);
      g.arc(80, 100, 25, a - 0.5, a + 0.5);
      g.closePath();
      g.fill();
    }
    g.beginPath();
    g.arc(80, 100, 6, 0, Math.PI * 2);
    g.fill();
    scrivi('PERICOLO', 232, 62, 42, '#111', 160);
    scrivi('NUCLEO A', 232, 108, 26, '#111', 160);
    scrivi('ORICALCO', 232, 138, 26, '#111', 160);
    scrivi('ALTA PRESSIONE  ·  NON TOCCARE', 160, 176, 18, '#111', 290);
    g.restore();
  }
  {
    const [x, y, w] = VOCI_ATLANTE.talassa;
    const c = w / 2;
    g.save();
    g.translate(x + c, y + c);
    g.fillStyle = '#0d2530';
    g.beginPath();
    g.arc(0, 0, c - 2, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#c99a4a';
    g.lineWidth = 10;
    g.beginPath();
    g.arc(0, 0, c - 10, 0, Math.PI * 2);
    g.stroke();
    g.lineWidth = 3;
    g.beginPath();
    g.arc(0, 0, c - 46, 0, Math.PI * 2);
    g.stroke();
    g.lineWidth = 7;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(0, 60);
    g.lineTo(0, -50);
    g.stroke();
    g.beginPath();
    g.moveTo(-32, -28);
    g.quadraticCurveTo(-32, 6, 0, 8);
    g.quadraticCurveTo(32, 6, 32, -28);
    g.stroke();
    g.fillStyle = '#c99a4a';
    for (const [px, py] of [[-32, -28], [0, -50], [32, -28]]) {
      g.beginPath();
      g.moveTo(px, py - 20);
      g.lineTo(px - 10, py + 2);
      g.lineTo(px + 10, py + 2);
      g.closePath();
      g.fill();
    }
    g.fillStyle = '#e6c27a';
    g.font = carattere(20);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const scritta = 'CONSORZIO TALASSA  ·  MCMLIV  ·  ';
    for (let i = 0; i < scritta.length; i++) {
      g.save();
      g.rotate((i / scritta.length) * Math.PI * 2);
      g.fillText(scritta[i], 0, -(c - 28));
      g.restore();
    }
    g.restore();
  }
  {
    const [x, y, w] = VOCI_ATLANTE.quadrante;
    const c = w / 2;
    g.save();
    g.translate(x + c, y + c);
    g.fillStyle = '#e9e4d4';
    g.beginPath();
    g.arc(0, 0, c - 1, 0, Math.PI * 2);
    g.fill();
    const angolo = i => -Math.PI / 2 - 2.356 + (4.712 * i) / 20;
    g.strokeStyle = '#b02018';
    g.lineWidth = 8;
    g.beginPath();
    g.arc(0, 0, c - 15, angolo(15), angolo(20));
    g.stroke();
    g.strokeStyle = '#1a1a1a';
    for (let i = 0; i <= 20; i++) {
      const a = angolo(i);
      const lungo = i % 5 === 0 ? 14 : 7;
      g.lineWidth = i % 5 === 0 ? 3 : 1.5;
      g.beginPath();
      g.moveTo(Math.cos(a) * (c - 8), Math.sin(a) * (c - 8));
      g.lineTo(Math.cos(a) * (c - 8 - lungo), Math.sin(a) * (c - 8 - lungo));
      g.stroke();
    }
    scrivi('ATM', 0, 28, 15, '#1a1a1a', 60);
    g.restore();
  }
  {
    const [x, y, w, h] = VOCI_ATLANTE.fascia;
    g.save();
    g.translate(x, y);
    g.beginPath();
    g.rect(0, 0, w, h);
    g.clip();
    g.fillStyle = '#e3b322';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#111';
    for (const inizio of [0, w - 120]) {
      for (let k = -2; k < 7; k++) {
        const bx = inizio + k * 28;
        g.beginPath();
        g.moveTo(bx, 0);
        g.lineTo(bx + 14, 0);
        g.lineTo(bx + 14 - h, h);
        g.lineTo(bx - h, h);
        g.closePath();
        g.fill();
      }
    }
    g.fillStyle = '#e3b322';
    g.fillRect(118, 0, w - 236, h);
    scrivi('PERICOLO  ·  NUCLEO A ORICALCO  ·  ALTA PRESSIONE', w / 2, h / 2 + 2, 36, '#111', w - 280);
    g.restore();
  }
  for (let i = 0; i < 3200; i++) {
    g.fillStyle = caso() < 0.7 ? `rgba(60,40,22,${0.05 + caso() * 0.12})` : `rgba(255,255,255,${caso() * 0.06})`;
    g.beginPath();
    g.arc(caso() * LATO_ATLANTE, caso() * LATO_ATLANTE, 0.5 + caso() * 3.5, 0, Math.PI * 2);
    g.fill();
  }
  const tex = new THREE.CanvasTexture(t);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function pianoAtlante(nome, largo) {
  const [x, y, w, h] = VOCI_ATLANTE[nome];
  const g = new THREE.PlaneGeometry(largo, (largo * h) / w);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (x + uv.getX(i) * w) / LATO_ATLANTE, 1 - (y + (1 - uv.getY(i)) * h) / LATO_ATLANTE);
  return g;
}

function materialeShader(kit, uniformi, frammento, { vertice = VERTICE, testa = TESTA, trasparente = false, scriveProfondita = true, additivo = false, nebbia = true, lato = THREE.FrontSide } = {}) {
  const m = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, uniformi]),
    vertexShader: vertice,
    fragmentShader: `${testa}\n${frammento}`,
    fog: nebbia,
    transparent: trasparente || additivo,
    depthWrite: scriveProfondita && !additivo,
    blending: additivo ? THREE.AdditiveBlending : THREE.NormalBlending,
    side: lato,
  });
  m.uniforms.uTempo = kit.uniformi.uTempo;
  return m;
}

function creaMateriali(kit) {
  const graffiato = kit.tex.graffiato ?? {};
  const cau = (m, chiave) => conCaustiche(m, kit.uniformi, { chiave: `reattore-${chiave}` });
  const ottoneDoppio = kit.mat.ottone.clone();
  ottoneDoppio.side = THREE.DoubleSide;
  const tentacolo = new THREE.MeshStandardMaterial({ color: 0x4a6a5e, metalness: 0.75, roughness: 0.42, normalMap: copiaTex(graffiato.normalMap, 3), emissive: 0x062018, emissiveIntensity: 0.4 });
  return {
    corrimano: cau(kit.mat.ottone.clone(), 'corrimano'),
    ottoneDoppio: cau(ottoneDoppio, 'ottoneDoppio'),
    striata: cau(new THREE.MeshStandardMaterial({ color: 0x8a9096, metalness: 0.88, roughness: 0.42, normalMap: texturaStriata(), normalScale: new THREE.Vector2(1.2, 1.2), roughnessMap: copiaTex(graffiato.roughnessMap, 1.3) }), 'striata'),
    pericolo: cau(new THREE.MeshStandardMaterial({ map: texturaStrisce(), metalness: 0.35, roughness: 0.6, normalMap: copiaTex(graffiato.normalMap, 1) }), 'pericolo'),
    cartelli: cau(new THREE.MeshStandardMaterial({ map: disegnaAtlante(), metalness: 0.3, roughness: 0.55 }), 'cartelli'),
    giallo: cau(new THREE.MeshStandardMaterial({ color: 0xc4952c, metalness: 0.55, roughness: 0.6, normalMap: copiaTex(graffiato.normalMap, 0.8), roughnessMap: copiaTex(graffiato.roughnessMap, 0.8) }), 'giallo'),
    rosso: cau(new THREE.MeshStandardMaterial({ color: 0x9a1d16, metalness: 0.25, roughness: 0.45, normalMap: copiaTex(graffiato.normalMap, 1.5) }), 'rosso'),
    corallo: new THREE.MeshStandardMaterial({ color: 0xc03a72, emissive: 0x5a0a36, emissiveIntensity: 0.7, roughness: 0.85, metalness: 0 }),
    coralloLuce: new THREE.MeshStandardMaterial({ color: 0x400820, emissive: 0xff4fc8, emissiveIntensity: 2.6, roughness: 0.4 }),
    smalto: new THREE.MeshStandardMaterial({ color: 0xe6dcc4, emissive: 0xffb060, emissiveIntensity: 0.55, roughness: 0.4, side: THREE.DoubleSide }),
    vetroScuro: new THREE.MeshStandardMaterial({ color: 0x0b1c22, metalness: 0.4, roughness: 0.08, envMapIntensity: 1.6 }),
    vetroNucleo: new THREE.MeshPhysicalMaterial({ color: 0xa8e4f0, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.8, depthWrite: false }),
    brace: new THREE.MeshStandardMaterial({ color: 0x1a0804, emissive: 0xff5a14, emissiveIntensity: 2.2, roughness: 0.9 }),
    tentacolo,
    oceano: materialeShader(kit, {}, FRAMMENTO_OCEANO),
  };
}

function creaStrumenti(kit) {
  const mat = { ...kit.mat, ...creaMateriali(kit) };
  const chiodi = { acciaio: [], ottone: [] };
  const metti = (m, g, matrice = null, ombra = false, settore = SETTORE) => kit.lotto(m, settore).aggiungi(g, matrice, { ombra });
  const s = {
    kit,
    mat,
    chiodi,
    metti,
    densita: kit.qualita?.densita ?? 1,
    caso: generatore(9021),
    blocco: (m, x0, y0, z0, x1, y1, z1, ombra = false, settore = SETTORE) => metti(m, kit.uvMetri(scatola(x0, y0, z0, x1, y1, z1)), null, ombra, settore),
    pezzo: (m, g, matrice = null, ombra = false, settore = SETTORE) => metti(m, kit.uvMetri(matrice ? g.applyMatrix4(matrice) : g), null, ombra, settore),
    chiodo: (tipo, p, n) => chiodi[tipo].push(p.x, p.y, p.z, n.x, n.y, n.z),
    cartello(nome, largo, matrice, retro = true, settore = SETTORE) {
      metti(mat.cartelli, pianoAtlante(nome, largo).translate(0, 0, 0.012).applyMatrix4(matrice), null, false, settore);
      if (!retro) return;
      const [, , w, h] = VOCI_ATLANTE[nome];
      metti(mat.lamieraScura, new THREE.BoxGeometry(largo + 0.05, (largo * h) / w + 0.05, 0.02).applyMatrix4(matrice), null, false, settore);
    },
  };
  return s;
}

function filaChiodi(s, tipo, da, a, passo, n) {
  const k = Math.max(1, Math.round(da.distanceTo(a) / passo));
  for (let i = 0; i <= k; i++) s.chiodo(tipo, da.clone().lerp(a, i / k), n);
}

function anelloChiodi(s, tipo, cx, cz, r, y, quanti, verso = 1, filtro = () => true) {
  for (let i = 0; i < quanti; i++) {
    const a = ((i + 0.5) / quanti) * Math.PI * 2;
    if (!filtro(a)) continue;
    s.chiodo(tipo, v3(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r), v3(Math.cos(a) * verso, 0, Math.sin(a) * verso));
  }
}

function chiudiChiodi(s) {
  const forma = new THREE.SphereGeometry(0.028, 6, 2, 0, Math.PI * 2, 0, Math.PI / 2);
  const q = new THREE.Quaternion();
  const m = new THREE.Matrix4();
  for (const [tipo, dati] of Object.entries(s.chiodi)) {
    const n = dati.length / 6;
    if (!n) continue;
    const ordine = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(s.caso() * (i + 1));
      [ordine[i], ordine[j]] = [ordine[j], ordine[i]];
    }
    const mesh = new THREE.InstancedMesh(forma, s.mat[tipo], n);
    ordine.forEach((k, i) => {
      const o = k * 6;
      q.setFromUnitVectors(ASSE_Y, v3(dati[o + 3], dati[o + 4], dati[o + 5]).normalize());
      mesh.setMatrixAt(i, m.compose(v3(dati[o], dati[o + 1], dati[o + 2]), q, UNO));
    });
    mesh.userData.pieni = n;
    mesh.count = Math.max(1, Math.round(n * s.densita));
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    s.kit.scena.add(mesh);
  }
}

function ringhiera(s, punti, { alto = 1.05, passo = 1.3 } = {}) {
  const m = s.mat.corrimano;
  s.metti(m, tubo(punti.map(p => p.clone().setY(p.y + alto)), 0.032, 8), null, true);
  s.metti(m, tubo(punti.map(p => p.clone().setY(p.y + alto * 0.5)), 0.018, 6), null, true);
  let percorso = 0;
  let prossimo = 0;
  punti.forEach((p, i) => {
    if (i) percorso += p.distanceTo(punti[i - 1]);
    if (percorso + 1e-6 < prossimo && i !== punti.length - 1) return;
    prossimo = percorso + passo;
    s.metti(m, cilindroTra(p, p.clone().setY(p.y + alto), 0.026, 6), null, true);
    s.metti(s.mat.acciaio, new THREE.CylinderGeometry(0.055, 0.065, 0.04, 8).translate(p.x, p.y + 0.02, p.z));
  });
}

function costruisciPavimenti(s, presa) {
  const { mat } = s;
  const forma = new THREE.Shape();
  forma.moveTo(24, -14);
  forma.lineTo(52.5, -14);
  forma.lineTo(52.5, 14);
  forma.lineTo(24, 14);
  forma.closePath();
  for (const [cx, cz, r] of [[C.x, C.z, R_POZZO], [presa.x, presa.z, R_PRESA]]) {
    const buco = new THREE.Path();
    buco.absarc(cx, -cz, r, 0, Math.PI * 2, true);
    forma.holes.push(buco);
  }
  const piano = new THREE.ShapeGeometry(forma, 96).rotateX(-Math.PI / 2);
  s.pezzo(mat.grata, piano.clone(), null, true);
  s.pezzo(mat.lamieraScura, piano.clone().translate(0, SOTTO, 0));
  const tagli = (u, sulX) => [
    ...tagliaCerchio(u, sulX ? C.x : C.z, sulX ? C.z : C.x, R_POZZO + 0.12),
    ...tagliaCerchio(u, sulX ? presa.x : presa.z, sulX ? presa.z : presa.x, R_PRESA + 0.12),
  ];
  for (let x = 24.75; x < 52.4; x += 1.5) {
    for (const [z0, z1] of intervalli(-13.8, 13.8, tagli(x, true))) {
      s.blocco(mat.acciaio, x - 0.05, SOTTO, z0, x + 0.05, -0.06, z1);
      s.blocco(mat.acciaio, x - 0.15, -0.06, z0, x + 0.15, -0.025, z1);
    }
  }
  for (const z of [-12.6, -6.3, 6.3, 12.6]) {
    for (const [x0, x1] of intervalli(24.2, 52.3, tagli(z, false))) s.blocco(mat.acciaio, x0, SOTTO, z - 0.05, x1, -0.08, z + 0.05);
  }
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const p = polare(R_POZZO + 0.55, a, -0.36);
    s.metti(mat.luceCalda, new THREE.BoxGeometry(0.24, 0.05, 0.08).applyMatrix4(posa(p.x, p.y, p.z, Math.PI / 2 - a)));
  }
  s.metti(mat.ottone, new THREE.TorusGeometry(R_POZZO + 0.02, 0.05, 6, 192).rotateX(Math.PI / 2).translate(C.x, 0.02, C.z));
  s.blocco(mat.striata, 23.8, -0.1, -2.1, 24.05, 0.004, 2.1);
  s.blocco(mat.striata, 52.25, -0.1, -1.3, 52.75, 0.004, 1.3);
  s.blocco(mat.striata, 44.2, -0.1, 13.75, 47.2, 0.004, 14.25);
  s.blocco(mat.striata, 54.2, -0.1, 2.75, 56.8, 0.004, 3.25);
  s.blocco(mat.pericolo, 51.85, 0, -1.3, 52.25, 0.012, 1.3);
  s.blocco(mat.pericolo, 44.2, 0, 13.35, 47.2, 0.012, 13.75);
  s.blocco(mat.pericolo, 54.2, 0, 3.25, 56.8, 0.012, 3.6);
  const grataPiano = (x0, z0, x1, z1) => {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(-Math.PI / 2).translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
    s.pezzo(mat.grata, g.clone());
    s.pezzo(mat.lamieraScura, g.translate(0, SOTTO, 0));
  };
  grataPiano(54.2, 3.25, 56.8, 14);
  grataPiano(44.2, 14, 56.8, 16.6);
  for (const x of [54.8, 56.1]) s.metti(mat.rame, cilindroTra(v3(x, -0.32, 3.3), v3(x, -0.32, 16.3), 0.1, 10));
  for (const z of [15, 15.9]) s.metti(mat.acciaio, cilindroTra(v3(44.3, -0.32, z), v3(54.5, -0.32, z), 0.09, 10));
  s.blocco(mat.lamieraScura, 52.7, -0.1, 3.2, 54.05, 0, 14);
  s.blocco(mat.striata, 52.7, -0.25, -2.8, 58.3, 0, 2.8);
  s.blocco(mat.pericolo, 52.7, 0, -2.8, 58.3, 0.01, -2.62);
  s.blocco(mat.pericolo, 52.7, 0, 2.62, 54.2, 0.01, 2.8);
  s.blocco(mat.pericolo, 56.8, 0, 2.62, 58.3, 0.01, 2.8);
  s.blocco(mat.pericolo, 58.12, 0, -2.62, 58.3, 0.01, 2.62);
  s.metti(mat.gomma, new THREE.CircleGeometry(0.62, 32).rotateX(-Math.PI / 2).translate(56.2, 0.004, 0));
  s.pezzo(mat.grata, new THREE.CircleGeometry(0.58, 32).rotateX(-Math.PI / 2).translate(56.2, 0.008, 0));
  s.metti(mat.ottone, new THREE.TorusGeometry(0.62, 0.03, 6, 32).rotateX(Math.PI / 2).translate(56.2, 0.01, 0));
}

function costruisciPozzo(s) {
  const { mat, kit } = s;
  const alto = -Y_FONDO;
  const parete = uvCilindro(new THREE.CylinderGeometry(R_POZZO, R_POZZO, alto, 144, 1, true), Math.PI * 2 * R_POZZO, alto).translate(C.x, Y_FONDO / 2, C.z);
  s.metti(mat.paratia, rovescia(parete));
  for (let i = 0; i < 16; i++) {
    const a = ((i + 0.5) / 16) * Math.PI * 2;
    const p = polare(R_POZZO - 0.07, a, Y_FONDO / 2);
    s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.24, alto, 0.14), posa(p.x, p.y, p.z, Math.PI / 2 - a));
    const dentro = v3(-Math.cos(a), 0, -Math.sin(a));
    const lato = v3(-Math.sin(a), 0, Math.cos(a));
    const inizio = Math.cos(a) >= 0 ? Math.max(Y_FONDO + 0.2, yRampa(a) + 0.12) : Y_FONDO + 0.2;
    for (const k of [-0.08, 0.08]) {
      const base = polare(R_POZZO - 0.145, a).addScaledVector(lato, k);
      if (inizio < -0.3) filaChiodi(s, 'acciaio', base.clone().setY(inizio), base.clone().setY(-0.2), 0.38, dentro);
    }
  }
  for (const y of [-3.85, -2.67, -1.33, -0.16]) anelloChiodi(s, 'acciaio', C.x, C.z, R_POZZO - 0.004, y, 200, -1, a => Math.cos(a) < 0 || y > yRampa(a) + 0.05);
  s.pezzo(mat.lamieraScura, new THREE.CircleGeometry(R_RAMPA, 72).rotateX(-Math.PI / 2).translate(C.x, Y_FONDO, C.z));
  s.pezzo(mat.lamieraScura, new THREE.RingGeometry(R_RAMPA, R_POZZO, 72, 3, Math.PI / 2, Math.PI).rotateX(-Math.PI / 2).translate(C.x, Y_FONDO, C.z));
  s.pezzo(mat.acciaio, new THREE.RingGeometry(R_NUCLEO, 4.3, 72, 1).rotateX(-Math.PI / 2).translate(C.x, Y_FONDO + 0.008, C.z));
  for (let i = 0; i < 12; i++) {
    const a = ((i + 0.5) / 12) * Math.PI * 2;
    if (Math.abs(Math.atan2(Math.sin(a - Math.PI), Math.cos(a - Math.PI))) < 0.35) continue;
    const p = polare(5.3, a, Y_FONDO + 0.004);
    s.metti(mat.oricalco, new THREE.BoxGeometry(0.07, 0.012, 1.8).applyMatrix4(posa(p.x, p.y, p.z, Math.PI / 2 - a)));
    for (const k of [-1, 1]) {
      const q = p.clone().addScaledVector(v3(-Math.sin(a), 0, Math.cos(a)), k * 0.07);
      s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.04, 0.03, 1.84), posa(q.x, Y_FONDO + 0.015, q.z, Math.PI / 2 - a));
    }
  }
  s.metti(mat.oricalco, new THREE.TorusGeometry(4.36, 0.03, 4, 120).rotateX(Math.PI / 2).translate(C.x, Y_FONDO, C.z));
  s.blocco(mat.oricalco, 31.85, Y_FONDO, -0.09, C.x - R_NUCLEO, Y_FONDO + 0.006, 0.09);
  s.pezzo(mat.grata, new THREE.PlaneGeometry(C.x - R_NUCLEO - 31.85, 0.36).rotateX(-Math.PI / 2).translate((31.85 + C.x - R_NUCLEO) / 2, Y_FONDO + 0.012, 0));
  for (const z of [-0.2, 0.2]) s.blocco(mat.acciaio, 31.85, Y_FONDO, z - 0.02, C.x - R_NUCLEO, Y_FONDO + 0.025, z + 0.02);

  const NA = 96;
  const NR = 3;
  const posizioni = [];
  const uv = [];
  const indici = [];
  for (let i = 0; i <= NA; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / NA;
    for (let j = 0; j <= NR; j++) {
      const r = R_RAMPA + ((R_POZZO - R_RAMPA) * j) / NR;
      const p = polare(r, a, yRampa(a));
      posizioni.push(p.x, p.y, p.z);
      uv.push(a * 7.7, r);
    }
  }
  for (let i = 0; i < NA; i++) {
    for (let j = 0; j < NR; j++) {
      const k = i * (NR + 1) + j;
      const k10 = k + NR + 1;
      indici.push(k, k10, k + 1, k10, k10 + 1, k + 1);
    }
  }
  const rampa = new THREE.BufferGeometry();
  rampa.setAttribute('position', new THREE.Float32BufferAttribute(posizioni, 3));
  rampa.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  rampa.setIndex(indici);
  rampa.computeVertexNormals();
  s.metti(mat.striata, rampa);
  const angoli = Array.from({ length: 121 }, (_, i) => -Math.PI / 2 + (Math.PI * i) / 120);
  s.metti(mat.paratia, striscia(angoli.map(a => polare(R_RAMPA, a, Y_FONDO)), angoli.map(a => polare(R_RAMPA, a, yRampa(a)))));
  const banda = angoli.filter(a => yRampa(a) - 0.18 > Y_FONDO);
  s.metti(mat.pericolo, striscia(banda.map(a => polare(R_RAMPA - 0.006, a, yRampa(a) - 0.18)), banda.map(a => polare(R_RAMPA - 0.006, a, yRampa(a) - 0.01))));
  s.blocco(mat.paratia, 37.6, Y_FONDO, -R_POZZO, 38, 0, -R_RAMPA);
  for (let a = -Math.PI / 2 + 0.05; a < Math.PI / 2 - 0.02; a += 0.09) {
    const p = polare((R_RAMPA + R_POZZO) / 2, a, yRampa(a) + 0.008);
    s.metti(mat.ottone, new THREE.BoxGeometry(0.05, 0.025, R_POZZO - R_RAMPA - 0.25).applyMatrix4(posa(p.x, p.y, p.z, Math.PI / 2 - a)));
  }

  const a0 = -Math.PI / 2 + 0.31;
  const a1 = Math.PI * 1.5 + 0.02;
  ringhiera(s, arcoPunti(R_POZZO, a0, a1, () => 0, 0.3));
  ringhiera(s, arcoPunti(R_RAMPA, -Math.PI / 2, Math.PI / 3, yRampa, 0.25));
  ringhiera(s, segmento(v3(37.75, 0, -R_POZZO), v3(37.75, 0, -R_RAMPA)));
  const zoccolo = arcoCilindro(C.x, C.z, R_POZZO + 0.01, 0, 0.13, a0, a1, 180);
  s.metti(mat.pericolo, zoccolo.clone());
  s.metti(mat.pericolo, rovescia(zoccolo));
  const angoliRampa = angoli.filter(a => a <= Math.PI / 3);
  const zoccoloRampa = striscia(angoliRampa.map(a => polare(R_RAMPA + 0.012, a, yRampa(a))), angoliRampa.map(a => polare(R_RAMPA + 0.012, a, yRampa(a) + 0.13)));
  s.metti(mat.pericolo, zoccoloRampa.clone());
  s.metti(mat.pericolo, rovescia(zoccoloRampa));
  for (const a of [Math.PI, 2.35, -2.35, 1.2]) {
    const p = polare(R_POZZO + 0.06, a, 0.74);
    s.cartello('pericolo', 0.62, posa(p.x, p.y, p.z, Math.PI / 2 - a));
  }
  const avviso = polare(R_POZZO + 0.06, 0.35, 0.93);
  s.cartello('sporgersi', 0.9, posa(avviso.x, avviso.y, avviso.z, Math.PI / 2 - 0.35));
  const entrata = polare(R_POZZO + 0.06, -Math.PI / 2 + 0.42, 0.78);
  s.cartello('rampa', 0.62, posa(entrata.x, entrata.y, entrata.z, Math.PI / 2 - (-Math.PI / 2 + 0.42)));
  const erre = polare(R_POZZO - 0.01, Math.PI * 0.86, -1.9);
  s.cartello('erre2', 0.7, posa(erre.x, erre.y, erre.z, Math.PI / 2 - Math.PI * 0.86 + Math.PI), false);

  for (const a of UGELLI) {
    const muro = polare(R_POZZO, a, Y_UGELLO);
    const flangia = polare(R_POZZO - 0.1, a, Y_UGELLO);
    const bocca = polare(R_UGELLO, a, Y_UGELLO - 0.05);
    s.metti(mat.ottone, cilindroTra(muro, flangia, 0.26, 16));
    s.metti(mat.ottone, cilindroTra(flangia, bocca, 0.17, 12, 0.1));
    s.metti(mat.rame, cilindroTra(polare(R_POZZO - 0.1, a, Y_UGELLO + 0.2), polare(R_POZZO - 0.1, a, 0.05), 0.07, 8));
    for (let k = 0; k < 6; k++) {
      const b = (k / 6) * Math.PI * 2;
      const lato = v3(-Math.sin(a), 0, Math.cos(a));
      s.chiodo('ottone', polare(R_POZZO - 0.1, a, Y_UGELLO + Math.sin(b) * 0.2).addScaledVector(lato, Math.cos(b) * 0.2), v3(-Math.cos(a), 0, -Math.sin(a)));
    }
  }
  for (const a of [Math.PI * 0.72, -Math.PI * 0.72]) {
    const p = polare(R_POZZO - 0.2, a, -1.25);
    const muro = polare(R_POZZO - 0.08, a, -1.25);
    s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.3, 0.24, 0.16), posa(muro.x, muro.y, muro.z, Math.PI / 2 - a));
    s.metti(mat.luceCalda, new THREE.SphereGeometry(0.09, 10, 8).translate(p.x, p.y - 0.12, p.z));
    s.metti(mat.acciaio, new THREE.TorusGeometry(0.11, 0.012, 4, 12).rotateX(Math.PI / 2).translate(p.x, p.y - 0.12, p.z));
    kit.luce({ x: p.x, y: p.y - 0.25, z: p.z, colore: AMBRA, intensita: 9, portata: 10, tremola: true });
  }
}

function muroX(s, z, x0, x1, buchi, y0, y1, m) {
  let x = x0;
  for (const [a, b, ya, yb] of [...buchi].sort((p, q) => p[0] - q[0])) {
    if (a > x) s.blocco(m, x, y0, z - 0.2, a, y1, z + 0.2);
    if (ya > y0) s.blocco(m, a, y0, z - 0.2, b, ya, z + 0.2);
    if (yb < y1) s.blocco(m, a, yb, z - 0.2, b, y1, z + 0.2);
    x = b;
  }
  if (x < x1) s.blocco(m, x, y0, z - 0.2, x1, y1, z + 0.2);
}

function muroZ(s, x, z0, z1, buchi, y0, y1, m) {
  let z = z0;
  for (const [a, b, ya, yb] of [...buchi].sort((p, q) => p[0] - q[0])) {
    if (a > z) s.blocco(m, x - 0.2, y0, z, x + 0.2, y1, a);
    if (ya > y0) s.blocco(m, x - 0.2, y0, a, x + 0.2, ya, b);
    if (yb < y1) s.blocco(m, x - 0.2, yb, a, x + 0.2, y1, b);
    z = b;
  }
  if (z < z1) s.blocco(m, x - 0.2, y0, z, x + 0.2, y1, z1);
}

function muroCerchio(s, x, z0, z1, y0, y1, cz, cy, r, m) {
  const forma = new THREE.Shape();
  forma.moveTo(z0, y0);
  forma.lineTo(z1, y0);
  forma.lineTo(z1, y1);
  forma.lineTo(z0, y1);
  forma.closePath();
  const buco = new THREE.Path();
  buco.absarc(cz, cy, r, 0, Math.PI * 2, true);
  forma.holes.push(buco);
  const g = new THREE.ExtrudeGeometry(forma, { depth: 0.4, bevelEnabled: false, curveSegments: 40 }).rotateY(-Math.PI / 2).translate(x + 0.2, 0, 0);
  s.pezzo(m, g);
}

function pilastro(s, p, u) {
  const m = suParete(p, u, 0, 0);
  for (const g of [
    new THREE.BoxGeometry(0.36, TETTO, 0.04).translate(0, TETTO / 2, 0.17),
    new THREE.BoxGeometry(0.08, TETTO, 0.15).translate(0, TETTO / 2, 0.075),
    new THREE.BoxGeometry(0.5, 0.06, 0.3).translate(0, 0.03, 0.15),
  ]) s.pezzo(s.mat.acciaio, g, m);
  const n = v3(0, 0, 1).transformDirection(m);
  for (const k of [-0.14, 0.14]) filaChiodi(s, 'acciaio', v3(k, 0.4, 0.19).applyMatrix4(m), v3(k, TETTO - 0.4, 0.19).applyMatrix4(m), 0.45, n);
}

function oblo(s, p, u, y, r) {
  const m = suParete(p, u, y, 0);
  s.metti(s.mat.oceano, new THREE.CircleGeometry(r, 28).translate(0, 0, 0.012).applyMatrix4(m));
  s.metti(s.mat.ottone, new THREE.TorusGeometry(r + 0.03, 0.055, 8, 32).translate(0, 0, 0.03).applyMatrix4(m));
  s.metti(s.mat.acciaio, new THREE.RingGeometry(r + 0.06, r + 0.2, 32, 1).translate(0, 0, 0.008).applyMatrix4(m));
  const n = v3(0, 0, 1).transformDirection(m);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    s.chiodo('ottone', v3(Math.cos(a) * (r + 0.13), Math.sin(a) * (r + 0.13), 0.01).applyMatrix4(m), n);
  }
}

function costruisciPareti(s) {
  const { mat } = s;
  const alto = TETTO + 0.25;
  muroX(s, -14, 23.8, 52.7, [[29, 31, 0, ALTO_FINESTRA], [44, 46, 0, ALTO_FINESTRA]], SOTTO, alto, mat.paratia);
  muroX(s, 14, 23.8, 54.4, [[29, 31, 0, ALTO_FINESTRA], [44.2, 47.2, 0, ALTO_CORRIDOIO]], SOTTO, alto, mat.paratia);
  muroCerchio(s, 24, -14.2, 14.2, SOTTO, alto, 0, TUNNEL.y, TUNNEL.r, mat.paratia);
  muroZ(s, 52.5, -14.2, 14.2, [[-1.3, 1.3, 0, ALTO_PORTA]], SOTTO, alto, mat.paratia);
  muroX(s, -3, 52.7, 58.7, [], SOTTO, ALTO_STAGNA + 0.3, mat.paratia);
  muroX(s, 3, 52.7, 58.7, [[54.2, 56.8, 0, ALTO_PORTA]], SOTTO, ALTO_STAGNA + 0.3, mat.paratia);
  muroCerchio(s, 58.5, -3.2, 3.2, SOTTO, ALTO_STAGNA + 0.3, 0, PORTELLO.y, PORTELLO.r, mat.paratia);
  muroZ(s, 56.8, 3.2, 16.8, [], SOTTO, ALTO_CORRIDOIO + 0.3, mat.paratia);
  muroX(s, 16.6, 44, 57, [[49, 51, 0, ALTO_FINESTRA]], SOTTO, ALTO_CORRIDOIO + 0.3, mat.paratia);
  muroZ(s, 44.2, 14.2, 16.4, [], SOTTO, ALTO_CORRIDOIO + 0.3, mat.paratia);
  s.blocco(mat.paratia, 54, SOTTO, 3.2, 54.4, 0.25, 14);
  s.blocco(mat.paratia, 54, 2.6, 3.2, 54.4, ALTO_CORRIDOIO + 0.3, 14);
  for (let z = 3.3; z < 14; z += 1.34) s.blocco(mat.acciaio, 54.05, 0.25, z - 0.07, 54.35, 2.6, z + 0.07);
  s.pezzo(mat.grata, new THREE.PlaneGeometry(10.8, 2.35).rotateY(Math.PI / 2).translate(54.2, 1.425, 8.6));
  s.blocco(mat.lamieraScura, 23.8, TETTO, -14.2, 52.7, TETTO + 0.25, 14.2);
  s.blocco(mat.lamieraScura, 52.7, ALTO_STAGNA, -3.2, 58.7, ALTO_STAGNA + 0.3, 3.2);
  s.blocco(mat.lamieraScura, 52.7, ALTO_CORRIDOIO, 3.2, 57, ALTO_CORRIDOIO + 0.3, 14.2);
  s.blocco(mat.lamieraScura, 44, ALTO_CORRIDOIO, 14.2, 57, ALTO_CORRIDOIO + 0.3, 16.8);

  for (const [nome, posizioni] of Object.entries(PILASTRI)) for (const u of posizioni) pilastro(s, PARETI[nome], u);
  for (const [nome, [da, a]] of Object.entries(ESTREMI)) {
    const p = PARETI[nome];
    for (const [u0, u1] of intervalli(da, a, VARCHI[nome])) {
      const lungo = u1 - u0;
      const centro = (u0 + u1) / 2;
      s.pezzo(mat.lamieraScura, new THREE.BoxGeometry(lungo, 1.1, 0.03).translate(0, 0.55, 0.015), suParete(p, centro, 0, 0));
      s.pezzo(mat.ottone, new THREE.BoxGeometry(lungo, 0.06, 0.05).translate(0, 1.13, 0.025), suParete(p, centro, 0, 0));
    }
  }
  for (const [nome, u, y, r] of OBLO) oblo(s, PARETI[nome], u, y, r);
  for (const nome of ['nord', 'sud']) {
    const p = PARETI[nome];
    s.metti(mat.rame, cilindroTra(v3(24.6, 0, 0), v3(51.9, 0, 0), 0.13, 12).applyMatrix4(new THREE.Matrix4().makeTranslation(0, 4.6, p.fisso + p.verso * 0.42)));
    s.metti(mat.acciaio, cilindroTra(v3(24.4, 0, 0), v3(52.1, 0, 0), 0.09, 10).applyMatrix4(new THREE.Matrix4().makeTranslation(0, 9, p.fisso + p.verso * 0.35)));
    for (let x = 25.5; x < 51.9; x += 3) {
      s.metti(mat.ottone, new THREE.TorusGeometry(0.16, 0.035, 6, 18).rotateY(Math.PI / 2).translate(x, 4.6, p.fisso + p.verso * 0.42));
      s.metti(mat.acciaio, new THREE.TorusGeometry(0.115, 0.025, 6, 16).rotateY(Math.PI / 2).translate(x + 1.5, 9, p.fisso + p.verso * 0.35));
    }
    for (const u of PILASTRI[nome]) {
      s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.08, 0.08, 0.3).translate(0, 0, 0.3), suParete(p, u, 4.6, 0));
      s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.2, 0.18, 1.05).translate(0, 7.88, 0.525), suParete(p, u, 0, 0));
      s.pezzo(mat.acciaio, traveTra(v3(0, 7.2, 0.2), v3(0, 7.82, 0.95), 0.12, 0.12), suParete(p, u, 0, 0));
    }
    const zRotaia = p.fisso + p.verso * 0.95;
    s.blocco(mat.acciaio, 24.4, 7.97, zRotaia - 0.1, 52.1, 8.12, zRotaia + 0.1);
  }
  s.cartello('stagna', 1, suParete(PARETI.est, 0, 3.25, 0.01));
  s.cartello('talassa', 2.2, suParete(PARETI.ovest, 0, 5.7, 0.01));
  s.cartello('tunnel', 2.4, suParete(PARETI.ovest, 0, 3.85, 0.01));
  s.cartello('beta', 4.2, suParete(PARETI.sud, 38, 3.75, 0.24));
  for (const u of [36.4, 39.6]) s.pezzo(mat.acciaio, new THREE.BoxGeometry(0.08, 0.08, 0.24).translate(0, 0, 0.12), suParete(PARETI.sud, u, 3.75, 0));
  s.cartello('allagamento', 1.4, suParete(PARETI.ovest, -5.6, 2.25, 0.01));
  s.metti(mat.ottone, new THREE.TorusGeometry(TUNNEL.r + 0.06, 0.1, 8, 64).rotateY(Math.PI / 2).translate(24.24, TUNNEL.y, 0));
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    if (TUNNEL.y + Math.sin(a) * (TUNNEL.r + 0.25) < 0.05) continue;
    s.chiodo('ottone', v3(24.21, TUNNEL.y + Math.sin(a) * (TUNNEL.r + 0.25), Math.cos(a) * (TUNNEL.r + 0.25)), v3(1, 0, 0));
  }
}

function costruisciSoffitto(s) {
  const { mat, kit } = s;
  for (const x of [26.4, 30.6, 45.4, 49.6]) {
    s.blocco(mat.acciaio, x - 0.05, 9.4, -13.8, x + 0.05, TETTO, 13.8);
    s.blocco(mat.acciaio, x - 0.18, 9.34, -13.8, x + 0.18, 9.4, 13.8);
    for (const k of [-0.13, 0.13]) filaChiodi(s, 'acciaio', v3(x + k, 9.335, -13.5), v3(x + k, 9.335, 13.5), 0.55, v3(0, -1, 0));
  }
  for (const z of [-6.8, 6.8]) {
    s.blocco(mat.acciaio, 24.2, 9.6, z - 0.04, 52.3, TETTO, z + 0.04);
    s.blocco(mat.acciaio, 24.2, 9.55, z - 0.14, 52.3, 9.6, z + 0.14);
  }
  s.blocco(mat.acciaio, 24.2, 8.9, -11.5, 52.3, 9.32, -10.5);
  for (let x = 25.4; x < 52.2; x += 2.4) {
    s.blocco(mat.acciaio, x - 0.05, 8.87, -11.56, x + 0.05, 9.36, -10.44);
    s.metti(mat.acciaio, cilindroTra(v3(x, 9.3, -11.3), v3(x, TETTO, -11.3), 0.018, 5));
    s.metti(mat.acciaio, cilindroTra(v3(x, 9.3, -10.7), v3(x, TETTO, -10.7), 0.018, 5));
  }
  s.metti(mat.lamiera, uvCilindro(new THREE.CylinderGeometry(0.38, 0.38, 28.1, 24, 1, true), 2.39, 28.1).rotateZ(Math.PI / 2).translate(38.25, 9.3, 11));
  for (let x = 25.2; x < 52.2; x += 2.4) s.metti(mat.lamieraScura, new THREE.TorusGeometry(0.4, 0.04, 6, 24).rotateY(Math.PI / 2).translate(x, 9.3, 11));

  s.blocco(mat.giallo, X_GRU - 0.3, 8.25, -12.95, X_GRU + 0.3, 8.85, 12.95, true);
  for (const z of [-12.85, 12.85]) {
    s.blocco(mat.giallo, X_GRU - 0.75, 8.12, z - 0.22, X_GRU + 0.75, 8.5, z + 0.22);
    for (const dx of [-0.5, 0.5]) s.metti(mat.acciaio, new THREE.CylinderGeometry(0.12, 0.12, 0.1, 14).rotateX(Math.PI / 2).translate(X_GRU + dx, 8.18, z));
    const fine = z > 0 ? [11.9, 12.96] : [-12.96, -11.9];
    s.blocco(mat.pericolo, X_GRU - 0.31, 8.24, fine[0], X_GRU + 0.31, 8.86, fine[1]);
  }
  s.blocco(mat.giallo, X_GRU - 0.55, 7.8, -6.5, X_GRU + 0.55, 8.25, -5.5);
  s.metti(mat.acciaio, new THREE.CylinderGeometry(0.24, 0.24, 0.9, 16).rotateZ(Math.PI / 2).translate(X_GRU, 7.72, -6));
  for (const dx of [-0.12, 0.12]) s.metti(mat.acciaio, cilindroTra(v3(X_GRU + dx, 7.55, -6), v3(X_GRU + dx, 6.55, -6), 0.018, 5));
  s.blocco(mat.giallo, X_GRU - 0.22, 6.1, -6.15, X_GRU + 0.22, 6.6, -5.85);
  s.metti(mat.acciaio, cilindroTra(v3(X_GRU, 6.1, -6), v3(X_GRU, 5.94, -6), 0.04, 8));
  s.metti(mat.acciaio, new THREE.TorusGeometry(0.17, 0.045, 8, 20, Math.PI * 1.45).rotateZ(Math.PI * 0.9).translate(X_GRU, 5.8, -6));
  s.cartello('carico', 1.2, posa(X_GRU - 0.31, 8.55, 3, -Math.PI / 2), false);
  s.cartello('carico', 1.2, posa(X_GRU + 0.31, 8.55, -3, Math.PI / 2), false);

  const paralume = new THREE.LatheGeometry([[0.46, -0.12], [0.42, -0.06], [0.26, 0.12], [0.1, 0.26], [0.05, 0.3]].map(([r, y]) => new THREE.Vector2(r, y)), 24);
  const lampade = [[30.6, -7.5, true], [45.4, 7.5, true], [30.6, 7.5, false], [45.4, -7.5, false]];
  const calda = new THREE.Color(AMBRA);
  const allarme = new THREE.Color(ROSSO_ALLARME);
  const tinta = new THREE.Color();
  for (const [x, z, ombra] of lampade) {
    s.metti(mat.acciaio, cilindroTra(v3(x, 9.34, z), v3(x, 8.55, z), 0.025, 6));
    s.metti(mat.ottone, paralume.clone().translate(x, 8.25, z));
    s.metti(mat.smalto, rovescia(paralume.clone().scale(0.97, 0.97, 0.97).translate(x, 8.25, z)));
    s.metti(mat.luceCalda, new THREE.SphereGeometry(0.11, 12, 8).translate(x, 8.12, z));
    kit.luce({
      x, y: 7.95, z, colore: AMBRA, intensita: 30, portata: 21, ombra,
      mira: { x: x + (C.x - x) * 0.15, y: 0, z: z * 0.85 },
      forza: (v, t) => {
        const ab = v.abisso;
        const protocollo = !!ab?.protocollo && !ab?.completata;
        return protocollo ? 18 + 14 * Math.max(0, Math.sin(t * 3.2)) : 30;
      },
      colorePer: (v, t) => {
        const ab = v.abisso;
        const protocollo = !!ab?.protocollo && !ab?.completata;
        return tinta.copy(calda).lerp(allarme, protocollo ? 0.55 + 0.35 * Math.sin(t * 3.2) : 0).getHex();
      },
    });
  }
}

function costruisciPasserelle(s) {
  const { mat } = s;
  s.pezzo(mat.grata, new THREE.RingGeometry(3.1, R_BALLATOIO, 72, 1).rotateX(-Math.PI / 2).translate(C.x, Y_BALLATOIO, C.z), null, true);
  s.metti(mat.acciaio, uvCilindro(new THREE.CylinderGeometry(R_BALLATOIO, R_BALLATOIO, 0.28, 72, 1, true), 30.8, 0.28).translate(C.x, Y_BALLATOIO - 0.15, C.z));
  for (let i = 0; i < 8; i++) {
    const a = ((i + 0.5) / 8) * Math.PI * 2;
    s.pezzo(mat.acciaio, traveTra(polare(3.12, a, 4.95), polare(R_BALLATOIO - 0.12, a, Y_BALLATOIO - 0.3), 0.1, 0.14));
    s.pezzo(mat.acciaio, traveTra(polare(3.1, a, Y_BALLATOIO - 0.09), polare(R_BALLATOIO, a, Y_BALLATOIO - 0.09), 0.08, 0.14));
  }
  for (const [a0, a1] of [[0.16, Math.PI / 2 - 0.16], [Math.PI / 2 + 0.16, Math.PI * 1.5 - 0.16], [-Math.PI / 2 + 0.16, -0.16]]) {
    ringhiera(s, arcoPunti(R_BALLATOIO - 0.06, a0, a1, () => Y_BALLATOIO, 0.3));
  }
  for (let i = 0; i < 4; i++) {
    const p = polare(R_BALLATOIO - 0.06, Math.PI / 4 + (i * Math.PI) / 2, Y_BALLATOIO + 1.14);
    s.metti(mat.luceCalda, new THREE.SphereGeometry(0.06, 10, 6).translate(p.x, p.y, p.z));
  }
  const passerella = (x0, z0, x1, z1) => {
    const lungoX = x1 - x0 > z1 - z0;
    s.pezzo(mat.grata, new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(-Math.PI / 2).translate((x0 + x1) / 2, Y_BALLATOIO, (z0 + z1) / 2), null, true);
    const bordi = lungoX
      ? [[v3(x0, Y_BALLATOIO, z0), v3(x1, Y_BALLATOIO, z0)], [v3(x0, Y_BALLATOIO, z1), v3(x1, Y_BALLATOIO, z1)]]
      : [[v3(x0, Y_BALLATOIO, z0), v3(x0, Y_BALLATOIO, z1)], [v3(x1, Y_BALLATOIO, z0), v3(x1, Y_BALLATOIO, z1)]];
    for (const [da, a] of bordi) {
      if (lungoX) s.blocco(mat.acciaio, da.x, Y_BALLATOIO - 0.26, da.z - 0.03, a.x, Y_BALLATOIO, da.z + 0.03);
      else s.blocco(mat.acciaio, da.x - 0.03, Y_BALLATOIO - 0.26, da.z, da.x + 0.03, Y_BALLATOIO, a.z);
      ringhiera(s, segmento(da, a, 0.6));
      for (const p of segmento(da, a, 2.6)) {
        if (Math.abs(Math.abs(p.z) - 11) < 0.9) continue;
        s.metti(mat.acciaio, cilindroTra(p.clone().setY(Y_BALLATOIO), p.clone().setY(TETTO), 0.018, 5));
      }
    }
  };
  passerella(37.4, -13.8, 38.6, -(R_BALLATOIO - 0.05));
  passerella(37.4, R_BALLATOIO - 0.05, 38.6, 13.8);
  passerella(C.x + R_BALLATOIO - 0.05, -0.6, 52.3, 0.6);
}

function costruisciNucleo(s) {
  const { mat, kit } = s;
  s.metti(mat.ottone, new THREE.LatheGeometry([[3.75, -4], [3.75, -3.86], [3.5, -3.8], [3.3, -3.56], [3.12, -3.32], [3.08, -3.2]].map(([r, y]) => new THREE.Vector2(r, y)), 72).translate(C.x, 0, C.z));
  for (let i = 0; i < 48; i++) {
    const a = ((i + 0.5) / 48) * Math.PI * 2;
    s.chiodo('ottone', polare(3.62, a, -3.84), ASSE_Y);
  }
  for (const y of ANELLI_NUCLEO) {
    s.metti(mat.ottone, uvCilindro(new THREE.CylinderGeometry(3.06, 3.06, 0.36, 72, 1, true), 19.2, 0.36).translate(C.x, y, C.z));
    for (const k of [-0.18, 0.18]) s.metti(mat.ottone, new THREE.TorusGeometry(3.07, 0.045, 6, 96).rotateX(Math.PI / 2).translate(C.x, y + k, C.z));
    anelloChiodi(s, 'ottone', C.x, C.z, 3.065, y, 56, 1);
  }
  for (let i = 0; i < 8; i++) {
    const a = ((i + 0.5) / 8) * Math.PI * 2;
    const p = polare(2.99, a, 3.05);
    s.metti(mat.ottone, new THREE.BoxGeometry(0.14, 12.5, 0.1).applyMatrix4(posa(p.x, p.y, p.z, Math.PI / 2 - a)));
  }
  s.metti(mat.ottone, new THREE.LatheGeometry([[3.06, 9], [3.15, 9.2], [3.5, 9.55], [4.1, 9.85], [4.3, TETTO]].map(([r, y]) => new THREE.Vector2(r, y)), 72).translate(C.x, 0, C.z));
  s.metti(mat.acciaio, new THREE.TorusGeometry(3.12, 0.07, 8, 96).rotateX(Math.PI / 2).translate(C.x, 9.15, C.z));
  for (let k = 0; k < 5; k++) {
    const largo = (Math.PI * 2) / 5;
    const g = new THREE.CylinderGeometry(3.1, 3.1, 0.22, 24, 1, true, k * largo, largo);
    const [x, y, w, h] = VOCI_ATLANTE.fascia;
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (x + uv.getX(i) * w) / LATO_ATLANTE, 1 - (y + (1 - uv.getY(i)) * h) / LATO_ATLANTE);
    s.metti(mat.cartelli, g.translate(C.x, 0.6, C.z));
  }
  s.metti(mat.vetroNucleo, new THREE.CylinderGeometry(2.92, 2.92, 12.4, 72, 1, true).translate(C.x, 2.9, C.z));
  const plasma = materialeShader(kit, {
    uCentro: { value: v3(C.x, 0, C.z) },
    uRaggio: { value: 2.78 },
    uEnergia: { value: 1 },
    uAgitazione: { value: 0 },
    uColoreA: { value: new THREE.Color(0x0a2cff) },
    uColoreB: { value: new THREE.Color(ORICALCO) },
    uColoreC: { value: new THREE.Color(0xd8fbff) },
  }, FRAMMENTO_PLASMA);
  const colonna = new THREE.Mesh(new THREE.CylinderGeometry(2.78, 2.78, 12.4, 64, 1, true), plasma);
  colonna.position.set(C.x, 2.9, C.z);
  kit.scena.add(colonna);

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const punti = [polare(3.12, a, 8.3), polare(4.3, a, 8.55), polare(5.5, a, 9.3), polare(6.2, a, TETTO + 0.1)];
    s.metti(i % 2 ? mat.rame : mat.ottone, tubo(punti, 0.3, 12, 8));
    for (const [r, y] of [[3.3, 8.36], [6.12, 9.86]]) {
      const p = polare(r, a, y);
      const t = (r < 4 ? polare(4.3, a, 8.55) : polare(6.2, a, TETTO + 0.1)).sub(p).normalize();
      s.metti(mat.acciaio, new THREE.TorusGeometry(0.33, 0.05, 6, 18).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(ASSE_Z, t)).translate(p.x, p.y, p.z));
    }
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.3;
    const da = polare(3.1, a, 7.45);
    const r = 7.5 + (i % 3) * 1.4;
    const a2 = a + 0.28;
    const fine = polare(r, a2, TETTO - 0.05);
    const punti = Array.from({ length: 12 }, (_, k) => {
      const t = k / 11;
      return da.clone().lerp(fine, t).add(v3(0, -1.3 * 4 * t * (1 - t), 0));
    });
    s.metti(mat.gomma, tubo(punti, 0.045 + (i % 3) * 0.015, 6, 2));
  }
  costruisciPasserelle(s);

  const energia = { valore: 1 };
  kit.luce({ x: C.x, y: -1.6, z: C.z, colore: ORICALCO, intensita: 26, portata: 13, forza: (v, t) => 26 * energia.valore * (0.85 + Math.sin(t * 2.1) * 0.15) });
  kit.luce({ x: C.x, y: 4.2, z: C.z, colore: ORICALCO, intensita: 24, portata: 15, forza: (v, t) => 24 * energia.valore * (0.85 + Math.sin(t * 1.7 + 1) * 0.15) });
  return {
    aggiorna(v, dt) {
      const ab = v.abisso;
      const protocollo = ab.protocollo && !ab.completata;
      const agitata = (protocollo ? 1 : 0) + (ab.allagamento.verso !== 0 ? 0.4 : 0);
      energia.valore = tendi(energia.valore, 0.85 + (v.corrente ? 0.2 : 0) + agitata * 0.35, 1.2, dt);
      plasma.uniforms.uEnergia.value = energia.valore;
      plasma.uniforms.uAgitazione.value = tendi(plasma.uniforms.uAgitazione.value, agitata, 1, dt);
    },
  };
}

function costruisciBarre(s) {
  const { mat, kit } = s;
  const barraMat = new THREE.MeshStandardMaterial({ color: 0x0a3442, emissive: ORICALCO, emissiveIntensity: 3.4, roughness: 0.2, metalness: 0.1 });
  const aloneMat = materialeShader(kit, { uColore: { value: new THREE.Color(ORICALCO) }, uForza: { value: 1.1 } }, FRAMMENTO_ALONE, { additivo: true, nebbia: false, lato: THREE.DoubleSide });
  const capi = unisci([new THREE.CylinderGeometry(0.095, 0.095, 0.08, 12).translate(0, 0.5, 0), new THREE.CylinderGeometry(0.095, 0.095, 0.08, 12).translate(0, -0.5, 0)]);
  const sfera = new THREE.Sphere(v3(C.x, -1.5, C.z), 7);
  const istanze = [
    new THREE.InstancedMesh(new THREE.CylinderGeometry(0.075, 0.075, 0.95, 12), barraMat, BARRE.length),
    new THREE.InstancedMesh(capi, mat.ottone, BARRE.length),
    new THREE.InstancedMesh(new THREE.CylinderGeometry(0.2, 0.2, 1.15, 18, 1, true), aloneMat, BARRE.length),
  ];
  for (const m of istanze) {
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.boundingSphere = sfera;
    kit.scena.add(m);
  }
  const stato = BARRE.map(b => {
    const a = Math.atan2(b.z - C.z, b.x - C.x);
    const r = Math.hypot(b.x - C.x, b.z - C.z);
    const yc = Math.max(b.y, Y_FONDO + 0.8);
    for (const dy of [-0.68, 0.68]) s.metti(mat.ottone, new THREE.CylinderGeometry(0.38, 0.38, 0.12, 20).translate(b.x, yc + dy, b.z));
    for (let k = 0; k < 6; k++) {
      const ak = (k / 6) * Math.PI * 2;
      const ox = Math.cos(ak) * 0.33;
      const oz = Math.sin(ak) * 0.33;
      s.metti(mat.acciaio, cilindroTra(v3(b.x + ox, yc - 0.62, b.z + oz), v3(b.x + ox, yc + 0.62, b.z + oz), 0.022, 6));
    }
    s.metti(mat.vetroNucleo, new THREE.CylinderGeometry(0.3, 0.3, 1.24, 20, 1, true).translate(b.x, yc, b.z));
    for (const dy of [-0.5, 0.5]) {
      const da = polare(R_NUCLEO + 0.05, a, yc + dy);
      const fine = polare(r - 0.36, a, yc + dy);
      const mezzo = da.clone().lerp(fine, 0.5);
      s.pezzo(mat.ottone, new THREE.BoxGeometry(da.distanceTo(fine), 0.12, 0.16), posa(mezzo.x, mezzo.y, mezzo.z, -a));
    }
    for (let k = 0; k < 6; k++) {
      const ak = (k / 6) * Math.PI * 2 + 0.5;
      const p = v3(b.x + Math.cos(ak) * 0.48, yc - 0.42, b.z + Math.sin(ak) * 0.48);
      s.metti(mat.ottone, new THREE.BoxGeometry(0.2, 0.24, 0.025).applyMatrix4(posa(p.x, p.y, p.z, -ak, 0.5)));
    }
    return { x: b.x, y: b.y, z: b.z, estratta: null };
  });
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const scala = new THREE.Vector3();
  let ora = 0;
  return {
    aggiorna(v, dt, tempo) {
      ora = tempo;
      const prese = v.abisso.barre;
      stato.forEach((b, i) => {
        let su = Math.sin(tempo * 1.4 + i * 2) * 0.02;
        let giro = tempo * 0.4 + i;
        let dimensione = 1;
        let alone = 1 + Math.sin(tempo * 3 + i) * 0.08;
        if (b.estratta !== null && tempo - b.estratta < DURATA_ESTRAZIONE) {
          const k = (tempo - b.estratta) / DURATA_ESTRAZIONE;
          su = morbido(k / 0.7) * 1.5;
          giro += k * 9;
          dimensione = 1 - morbido((k - 0.65) / 0.35);
          alone = 1 + Math.sin(k * Math.PI) * 1.8;
        } else if (prese[i]) dimensione = 0;
        pos.set(b.x, b.y + su, b.z);
        q.setFromAxisAngle(ASSE_Y, giro);
        m.compose(pos, q, scala.setScalar(dimensione));
        istanze[0].setMatrixAt(i, m);
        istanze[1].setMatrixAt(i, m);
        m.compose(pos, q, scala.set(dimensione * alone, dimensione, dimensione * alone));
        istanze[2].setMatrixAt(i, m);
      });
      for (const mesh of istanze) mesh.instanceMatrix.needsUpdate = true;
    },
    evento(e) {
      if (e.k !== 'barra' || !stato[e.indice]) return;
      const b = stato[e.indice];
      b.estratta = ora;
      kit.effetti.scarica(v3(b.x, b.y, b.z));
      kit.effetti.esplosione(v3(b.x, b.y + 0.5, b.z), 'energia', ORICALCO);
    },
    svuota() {
      for (const b of stato) b.estratta = null;
    },
  };
}

function costruisciTurbina(s) {
  const { mat, kit } = s;
  const o = OSTACOLI.find(q => q.tipo === 'turbina' && q.base === Y_FONDO);
  const { x, z } = centroDi(o);
  const y0 = Y_FONDO;
  const luceTurbina = new THREE.MeshStandardMaterial({ color: 0x06202a, emissive: ORICALCO, emissiveIntensity: 0 });
  const spia = new THREE.MeshStandardMaterial({ color: 0x200404, emissive: 0xff2a1a, emissiveIntensity: 2.5 });
  s.pezzo(mat.lamieraScura, new THREE.CylinderGeometry(0.95, 1, 0.25, 8).translate(x, y0 + 0.125, z));
  s.metti(mat.ottone, new THREE.CylinderGeometry(0.72, 0.8, 0.3, 28).translate(x, y0 + 0.4, z));
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.26;
    s.metti(mat.acciaio, cilindroTra(v3(x + Math.cos(a) * 0.88, y0 + 0.55, z + Math.sin(a) * 0.88), v3(x + Math.cos(a) * 0.88, y0 + 2.05, z + Math.sin(a) * 0.88), 0.045, 8));
  }
  for (const y of [y0 + 0.55, y0 + 2.05]) s.metti(mat.ottone, new THREE.TorusGeometry(0.88, 0.05, 8, 40).rotateX(Math.PI / 2).translate(x, y, z));
  s.metti(mat.vetroNucleo, new THREE.CylinderGeometry(0.86, 0.86, 1.5, 32, 1, true).translate(x, y0 + 1.3, z));
  s.pezzo(mat.paratia, new THREE.CylinderGeometry(0.8, 0.8, 0.95, 28).translate(x, y0 + 2.525, z));
  for (const y of [2.25, 2.5, 2.75]) s.metti(mat.rame, new THREE.TorusGeometry(0.815, 0.05, 6, 40).rotateX(Math.PI / 2).translate(x, y0 + y, z));
  s.metti(mat.ottone, new THREE.SphereGeometry(0.62, 24, 8, 0, Math.PI * 2, 0, Math.PI / 2).translate(x, y0 + 3, z));
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.13;
    s.metti(mat.acciaio, new THREE.BoxGeometry(0.03, 0.8, 0.12).applyMatrix4(posa(x + Math.cos(a) * 0.84, y0 + 2.52, z + Math.sin(a) * 0.84, Math.PI / 2 - a)));
  }
  s.metti(luceTurbina, new THREE.TorusGeometry(0.84, 0.035, 6, 40).rotateX(Math.PI / 2).translate(x, y0 + 2.08, z));
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    s.metti(luceTurbina, new THREE.BoxGeometry(0.06, 0.55, 0.02).applyMatrix4(posa(x + Math.cos(a) * 0.805, y0 + 2.52, z + Math.sin(a) * 0.805, Math.PI / 2 - a)));
  }
  const xMuro = C.x - R_POZZO;
  s.metti(mat.rame, cilindroTra(v3(x - 0.75, y0 + 2.45, z), v3(xMuro, y0 + 2.45, z), 0.2, 16));
  for (const xf of [x - 0.78, xMuro + 0.06]) s.metti(mat.ottone, new THREE.TorusGeometry(0.22, 0.045, 6, 18).rotateY(Math.PI / 2).translate(xf, y0 + 2.45, z));
  s.metti(spia, new THREE.SphereGeometry(0.08, 12, 8).translate(x, y0 + 3.68, z));
  s.metti(mat.ottone, new THREE.TorusGeometry(0.1, 0.012, 4, 14).translate(x, y0 + 3.68, z));
  s.metti(mat.ottone, new THREE.TorusGeometry(0.1, 0.012, 4, 14).rotateY(Math.PI / 2).translate(x, y0 + 3.68, z));
  s.cartello('turbina2', 0.46, posa(x + 0.83, y0 + 2.52, z, Math.PI / 2), false);
  const parti = [new THREE.CylinderGeometry(0.07, 0.07, 1.5, 10), new THREE.CylinderGeometry(0.16, 0.16, 0.3, 14)];
  for (let i = 0; i < 8; i++) {
    const pala = new THREE.BoxGeometry(0.62, 1.2, 0.035);
    pala.rotateX(0.45);
    pala.translate(0.47, 0, 0);
    pala.rotateY((i / 8) * Math.PI * 2);
    parti.push(pala);
  }
  const rotore = new THREE.Mesh(unisci(parti), mat.ottone);
  rotore.position.set(x, y0 + 1.3, z);
  kit.ombra(rotore, false, true);
  kit.scena.add(rotore);
  kit.luce({ x, y: y0 + 3.2, z, colore: ORICALCO, intensita: 8, portata: 7, attiva: v => (v.abisso?.turbine?.[1] ?? 0) >= 1 });
  let velocita = 0;
  return {
    aggiorna(v, dt, tempo) {
      const t = v.abisso.turbine[1] ?? 0;
      velocita = tendi(velocita, t > 0 ? 3 + t * 13 : 0, 0.8, dt);
      rotore.rotation.y += velocita * dt;
      luceTurbina.emissiveIntensity = t >= 1 ? 2.6 + Math.sin(tempo * 6) * 0.3 : t * 1.6;
      if (t >= 1) {
        spia.emissive.setHex(ORICALCO);
        spia.emissiveIntensity = 2.4;
      } else if (t > 0) {
        spia.emissive.setHex(0xffa020);
        spia.emissiveIntensity = Math.sin(tempo * 12) > 0 ? 3 : 0.3;
      } else {
        spia.emissive.setHex(0xff2a1a);
        spia.emissiveIntensity = 2;
      }
    },
  };
}

function costruisciAcqua(s) {
  const { kit } = s;
  const acquaMat = materialeShader(kit, {
    uCentro: { value: v3(C.x, 0, C.z) },
    uProfondo: { value: new THREE.Color(COLORE_ACQUA) },
    uRiflesso: { value: new THREE.Color(ORICALCO) },
    uAgitazione: { value: 0 },
  }, FRAMMENTO_ACQUA, { trasparente: true, scriveProfondita: false, lato: THREE.DoubleSide });
  const superficie = new THREE.Mesh(new THREE.RingGeometry(2.95, R_POZZO, 120, 4).rotateX(-Math.PI / 2), acquaMat);
  superficie.position.set(C.x, Y_FONDO, C.z);
  superficie.visible = false;
  superficie.renderOrder = 2;
  kit.scena.add(superficie);
  const n = Math.round(BOLLE_POZZO * s.densita);
  const semi = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) semi.set([s.caso() * Math.PI * 2, 3.2 + s.caso() * 5.7, s.caso(), 0.5 + s.caso() * 0.9], i * 4);
  const geoBolle = new THREE.BufferGeometry();
  geoBolle.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  geoBolle.setAttribute('seme', new THREE.BufferAttribute(semi, 4));
  const bolleMat = materialeShader(kit, {
    uFondo: { value: Y_FONDO },
    uLivello: { value: Y_FONDO },
    uCentro: { value: v3(C.x, 0, C.z) },
    uScala: { value: SCALA_PUNTI },
    uColore: { value: new THREE.Color(0xbfefff) },
  }, FRAMMENTO_BOLLE, { vertice: VERTICE_BOLLE, testa: TESTA_PUNTI, trasparente: true, scriveProfondita: false });
  const bolle = new THREE.Points(geoBolle, bolleMat);
  bolle.frustumCulled = false;
  bolle.visible = false;
  kit.scena.add(bolle);
  const bocche = UGELLI.map(a => ({ a, bocca: polare(R_UGELLO, a, Y_UGELLO - 0.05), dentro: v3(-Math.cos(a), 0, -Math.sin(a)) }));
  const tubi = bocche.map(({ bocca, dentro }) => {
    const punti = Array.from({ length: 15 }, (_, i) => {
      const t = (i / 14) * 0.9;
      return bocca.clone().addScaledVector(dentro, 3 * t).add(v3(0, -0.6 * t - 4.9 * t * t, 0));
    });
    return tuboRastremato(new THREE.CatmullRomCurve3(punti), 40, 10, t => 0.09 + t * 0.2);
  });
  const gettiMat = materialeShader(kit, { uForza: { value: 0 }, uLivello: { value: Y_FONDO } }, FRAMMENTO_GETTO, { trasparente: true, scriveProfondita: false, lato: THREE.DoubleSide });
  const getti = new THREE.Mesh(mergeGeometries(tubi), gettiMat);
  getti.visible = false;
  getti.renderOrder = 3;
  kit.scena.add(getti);
  let forzaGetti = 0;
  let ultimoSpruzzo = 0;
  kit.suNebbia(v => {
    const l = v.abisso?.allagamento?.livello ?? 0;
    if (l <= 0) return null;
    const p = kit.camera.position;
    return Math.hypot(p.x - C.x, p.z - C.z) < R_POZZO && p.y < Y_FONDO + ALZATA_ACQUA * l ? NEBBIA_ACQUA : null;
  });
  return {
    aggiorna(v, dt, tempo, punto) {
      const a = v.abisso.allagamento;
      const livello = Y_FONDO + ALZATA_ACQUA * a.livello;
      const piena = a.livello > 0.002;
      superficie.visible = piena;
      bolle.visible = piena;
      superficie.position.y = livello;
      acquaMat.uniforms.uAgitazione.value = tendi(acquaMat.uniforms.uAgitazione.value, a.verso > 0 ? 1 : a.verso < 0 ? 0.5 : 0, 1.5, dt);
      bolleMat.uniforms.uLivello.value = livello;
      const getta = a.verso > 0 && a.livello < 0.999;
      forzaGetti = tendi(forzaGetti, getta ? 1 : 0, 3, dt);
      getti.visible = forzaGetti > 0.01;
      gettiMat.uniforms.uForza.value = forzaGetti;
      gettiMat.uniforms.uLivello.value = piena ? livello : Y_FONDO;
      const vicino = punto && Math.hypot(punto.x - C.x, punto.z - C.z) < 26;
      if (!getta || !vicino || tempo - ultimoSpruzzo < 0.14) return;
      ultimoSpruzzo = tempo;
      const b = bocche[Math.floor(s.caso() * bocche.length)];
      kit.effetti.brina(b.bocca.clone().addScaledVector(b.dentro, 2.6).setY(Math.max(livello, Y_FONDO) + 0.1), v3(0, 1, 0));
    },
    evento(e) {
      if (e.k !== 'allagamento' || e.verso <= 0) return;
      for (const b of bocche) kit.effetti.brina(b.bocca, b.dentro);
    },
  };
}

function costruisciPannello(s) {
  const { mat, kit } = s;
  const o = OSTACOLI.find(q => q.tipo === 'pannello');
  const zc = (o.z0 + o.z1) / 2;
  const spieRosse = new THREE.MeshStandardMaterial({ color: 0x200404, emissive: 0xff2a1a, emissiveIntensity: 2.4 });
  const spieVerdi = new THREE.MeshStandardMaterial({ color: 0x042008, emissive: 0x3dff6a, emissiveIntensity: 0.1 });
  s.blocco(mat.lamieraScura, o.x0 - 0.03, 0, o.z0, o.x1 + 0.03, 0.08, o.z1);
  s.blocco(mat.paratia, o.x0, 0.08, o.z0 + 0.05, o.x1, 0.95, o.z1 - 0.05);
  s.pezzo(mat.paratia, new THREE.BoxGeometry(0.78, 0.07, o.z1 - o.z0 - 0.04), posa((o.x0 + o.x1) / 2 + 0.02, 1.0, zc, 0, 0, -0.35));
  s.blocco(mat.paratia, o.x0, 0.95, o.z0 + 0.05, o.x0 + 0.28, 1.85, o.z1 - 0.05);
  s.blocco(mat.lamieraScura, o.x0 - 0.02, 1.85, o.z0, o.x0 + 0.36, 1.92, o.z1);
  s.blocco(mat.ottone, o.x1 - 0.01, 0.9, o.z0 + 0.05, o.x1 + 0.02, 0.94, o.z1 - 0.05);
  const xQuadro = o.x0 + 0.29;
  const quadranti = [zc - 0.55, zc, zc + 0.55];
  for (const z of quadranti) {
    s.cartello('quadrante', 0.26, posa(xQuadro, 1.5, z, Math.PI / 2), false);
    s.metti(mat.ottone, new THREE.TorusGeometry(0.135, 0.022, 6, 24).rotateY(Math.PI / 2).translate(xQuadro + 0.015, 1.5, z));
  }
  for (let i = 0; i < 6; i++) {
    const z = o.z0 + 0.25 + i * 0.3;
    s.metti(i < 3 ? spieRosse : spieVerdi, new THREE.SphereGeometry(0.045, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2).rotateZ(-Math.PI / 2).translate(xQuadro, 1.76, z));
    s.metti(mat.acciaio, new THREE.TorusGeometry(0.05, 0.012, 4, 14).rotateY(Math.PI / 2).translate(xQuadro + 0.005, 1.76, z));
  }
  for (const z of [o.z0 + 0.3, o.z1 - 0.3]) {
    s.metti(mat.rame, cilindroTra(v3(o.x0 + 0.05, 1.5, z), v3(24.45, 1.5, z), 0.06, 8));
    s.metti(mat.rame, cilindroTra(v3(24.45, 1.5, z), v3(24.45, TETTO, z), 0.06, 8));
    s.metti(mat.ottone, new THREE.SphereGeometry(0.08, 10, 8).translate(24.45, 1.5, z));
  }
  s.metti(mat.rosso, new THREE.TorusGeometry(0.16, 0.025, 6, 20).translate((o.x0 + o.x1) / 2, 0.6, o.z1 + 0.03));
  s.metti(mat.rosso, new THREE.BoxGeometry(0.3, 0.025, 0.02).translate((o.x0 + o.x1) / 2, 0.6, o.z1 + 0.03));
  s.metti(mat.rosso, new THREE.BoxGeometry(0.025, 0.3, 0.02).translate((o.x0 + o.x1) / 2, 0.6, o.z1 + 0.03));
  const leve = [zc - 0.65, zc + 0.65];
  for (const z of leve) s.blocco(mat.ottone, o.x1 - 0.32, 1.02, z - 0.08, o.x1 - 0.14, 1.12, z + 0.08);
  const aste = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8).translate(0, 0.225, 0), mat.acciaio, 2);
  const pomi = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 12, 8).translate(0, 0.47, 0), mat.rosso, 2);
  const aghi = new THREE.InstancedMesh(new THREE.BoxGeometry(0.006, 0.11, 0.008).translate(0, 0.04, 0), mat.gomma, 3);
  for (const m of [aste, pomi, aghi]) {
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.boundingSphere = new THREE.Sphere(v3((o.x0 + o.x1) / 2, 1.2, zc), 1.6);
    kit.scena.add(m);
  }
  kit.luce({
    x: o.x1 + 0.3, y: 1.6, z: zc, colore: 0xff2a1a, intensita: 2.5, portata: 4,
    colorePer: v => (v.abisso?.protocollo ? 0x3dff6a : 0xff2a1a),
  });
  let inclinazione = -0.5;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  return {
    aggiorna(v, dt, tempo, punto) {
      if (punto && Math.hypot(punto.x - o.x1, punto.z - zc) > 30) return;
      const ab = v.abisso;
      const a = ab.allagamento;
      const lampeggia = a.verso !== 0 && Math.sin(tempo * 10) > 0;
      spieRosse.emissiveIntensity = ab.protocollo ? (a.verso !== 0 && !lampeggia ? 2.4 : 0.08) : 2.4;
      spieVerdi.emissiveIntensity = ab.protocollo ? (lampeggia ? 0.08 : 2.6) : 0.08;
      inclinazione = tendi(inclinazione, a.verso > 0 || (a.livello > 0 && a.verso >= 0) ? 0.65 : -0.55, 4, dt);
      leve.forEach((z, i) => {
        m.compose(v3(o.x1 - 0.23, 1.1, z), q.setFromEuler(e.set(0, 0, -inclinazione)), UNO);
        aste.setMatrixAt(i, m);
        pomi.setMatrixAt(i, m);
      });
      quadranti.forEach((z, i) => {
        const tremito = a.verso !== 0 ? Math.sin(tempo * (17 + i * 3)) * 0.06 : Math.sin(tempo * 0.7 + i) * 0.01;
        const angolo = -2.2 + (0.6 + i * 0.25) * 1.2 + a.livello * 2.6 + tremito;
        m.compose(v3(xQuadro + 0.02, 1.5, z), q.setFromEuler(e.set(-angolo, 0, 0)), UNO);
        aghi.setMatrixAt(i, m);
      });
      for (const mesh of [aste, pomi, aghi]) mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

function costruisciFucina(s) {
  const { mat, kit } = s;
  const o = OSTACOLI.find(q => q.tipo === 'fucina');
  const crogiolo = new THREE.MeshStandardMaterial({ color: 0x2a2622, metalness: 0.6, roughness: 0.6, emissive: 0xff4a10, emissiveIntensity: 0.25 });
  s.blocco(mat.lamieraScura, o.x0 + 0.02, 0, o.z0 + 0.05, o.x1 - 0.02, 0.85, o.z1 - 0.05);
  s.blocco(mat.ottone, o.x0, 0.82, o.z0 + 0.03, o.x1, 0.9, o.z1 - 0.03);
  s.blocco(mat.ottone, o.x0, 0, o.z0 + 0.03, o.x1, 0.08, o.z1 - 0.03);
  s.blocco(mat.acciaio, o.x0 - 0.02, 0.9, o.z0 + 0.01, o.x1 + 0.02, 0.98, o.z1 - 0.01);
  for (const y of [0.25, 0.6]) filaChiodi(s, 'ottone', v3(o.x1 - 0.015, y, o.z0 + 0.12), v3(o.x1 - 0.015, y, o.z1 - 0.12), 0.22, v3(1, 0, 0));
  s.blocco(mat.acciaio, o.x1 - 0.03, 0.16, 7.62, o.x1 + 0.01, 0.64, 7.68);
  s.blocco(mat.acciaio, o.x1 - 0.03, 0.16, 8.42, o.x1 + 0.01, 0.64, 8.48);
  s.blocco(mat.acciaio, o.x1 - 0.03, 0.6, 7.62, o.x1 + 0.01, 0.66, 8.48);
  s.blocco(mat.acciaio, o.x1 - 0.03, 0.14, 7.62, o.x1 + 0.01, 0.2, 8.48);
  s.metti(mat.brace, new THREE.PlaneGeometry(0.76, 0.42).rotateY(Math.PI / 2).translate(o.x1 - 0.015, 0.4, 8.05));
  for (let z = 7.72; z < 8.42; z += 0.1) s.metti(mat.acciaio, cilindroTra(v3(o.x1 + 0.02, 0.2, z), v3(o.x1 + 0.02, 0.6, z), 0.012, 5));
  const xc = (o.x0 + o.x1) / 2;
  const zc = 8;
  const profilo = [[0, 0], [0.22, 0], [0.32, 0.1], [0.37, 0.32], [0.39, 0.44], [0.35, 0.45], [0.33, 0.36], [0.26, 0.14], [0.001, 0.12]];
  s.metti(crogiolo, new THREE.LatheGeometry(profilo.map(([r, y]) => new THREE.Vector2(r, y)), 32).translate(xc, 0.98, zc));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    s.metti(mat.acciaio, cilindroTra(v3(xc + Math.cos(a) * 0.3, 1.1, zc + Math.sin(a) * 0.3), v3(xc + Math.cos(a) * 0.4, 0.98, zc + Math.sin(a) * 0.4), 0.025, 6));
  }
  const fusoMat = materialeShader(kit, { uCalore: { value: 0.4 } }, FRAMMENTO_FUSO);
  const fuso = new THREE.Mesh(new THREE.CircleGeometry(0.33, 32).rotateX(-Math.PI / 2), fusoMat);
  fuso.position.set(xc, 0.98 + 0.37, zc);
  kit.scena.add(fuso);
  for (const z of [8.8, 9.35]) {
    for (const k of [-1, 1]) s.pezzo(mat.ottone, new THREE.BoxGeometry(0.2, 0.05, 0.06), posa(xc + k * 0.1, 1.04, z, 0, 0, k * 0.6));
    s.blocco(mat.ottone, xc - 0.2, 0.98, z - 0.04, xc + 0.2, 1.01, z + 0.04);
  }
  const cappa = new THREE.CylinderGeometry(0.22, 0.62, 0.55, 4, 1, true).rotateY(Math.PI / 4).translate(25.6, 2.25, zc);
  s.pezzo(mat.lamieraScura, cappa.clone());
  s.pezzo(mat.lamieraScura, rovescia(cappa));
  s.metti(mat.lamieraScura, cilindroTra(v3(25.6, 2.5, zc), v3(25.6, 3.2, zc), 0.17, 12));
  s.metti(mat.lamieraScura, cilindroTra(v3(25.6, 3.2, zc), v3(24.55, 3.6, zc), 0.17, 12));
  s.metti(mat.lamieraScura, cilindroTra(v3(24.55, 3.6, zc), v3(24.55, TETTO, zc), 0.17, 12));
  for (const y of [3.2, 3.6]) s.metti(mat.ottone, new THREE.SphereGeometry(0.19, 10, 8).translate(y === 3.2 ? 25.6 : 24.55, y, zc));
  s.blocco(mat.lamiera, 24.55, 0.25, 7.62, 25.15, 0.3, 8.42);
  s.blocco(mat.lamiera, 24.55, 0.7, 7.62, 25.15, 0.75, 8.42);
  s.pezzo(mat.pelle, new THREE.BoxGeometry(0.56, 0.38, 0.76), posa(24.85, 0.5, 8.02, 0, 0, 0.12));
  s.metti(mat.ottone, cilindroTra(v3(25.15, 0.5, 8.02), v3(o.x0 + 0.02, 0.45, 8.02), 0.04, 8));
  s.blocco(mat.lamiera, 24.5, 0, 8.65, 25.15, 0.42, 9.45);
  for (let i = 0; i < 7; i++) {
    const g = new THREE.OctahedronGeometry(0.07 + s.caso() * 0.07, 0).scale(1, 1.6, 1);
    s.metti(mat.oricalco, g.applyMatrix4(posa(24.6 + s.caso() * 0.45, 0.46 + s.caso() * 0.08, 8.75 + s.caso() * 0.6, s.caso() * 3, s.caso() * 0.8)));
  }
  s.cartello('fucina', 0.9, posa(o.x1 + 0.005, 0.66, 9.05, Math.PI / 2), false);
  const cannone = creaMeraviglia('charybdis', ARMI.charybdis).gruppo;
  cannone.scale.setScalar(SCALA_CANNONE);
  cannone.position.set(xc, 1.16, 9.07);
  cannone.rotation.set(0, -0.35, 0);
  cannone.visible = false;
  kit.ombra(cannone, true, true);
  kit.scena.add(cannone);
  let calore = 0.4;
  kit.luce({
    x: xc + 0.3, y: 1.7, z: zc, colore: 0xff8a3a, intensita: 6, portata: 7,
    forza: (v, t) => calore * 10 * (0.85 + Math.sin(t * 9) * 0.08 + Math.sin(t * 23) * 0.06),
  });
  return {
    aggiorna(v, dt, tempo) {
      const accesa = v.abisso.fucina;
      calore = tendi(calore, accesa ? 1 : 0.4, 0.8, dt);
      fusoMat.uniforms.uCalore.value = calore * (0.9 + Math.sin(tempo * 3.1) * 0.1);
      crogiolo.emissiveIntensity = 0.15 + calore * 0.9;
      mat.brace.emissiveIntensity = 1.2 + calore * 1.4 + Math.sin(tempo * 7) * 0.2;
      cannone.visible = accesa;
    },
  };
}

function geometriaTentacolo(punti) {
  const curva = new THREE.CatmullRomCurve3(punti);
  const segmenti = 40;
  const tubo = tuboRastremato(curva, segmenti, 9, t => 0.075 * Math.pow(1 - t, 0.8) + 0.012);
  const parti = [tubo];
  const frames = curva.computeFrenetFrames(segmenti, false);
  for (let i = 5; i < segmenti - 4; i += 3) {
    const t = i / segmenti;
    const r = 0.075 * Math.pow(1 - t, 0.8) + 0.012;
    const p = curva.getPointAt(t).addScaledVector(frames.normals[i], r * 0.92);
    const ventosa = new THREE.SphereGeometry(r * 0.4, 6, 4).scale(1, 0.55, 1).translate(p.x, p.y, p.z);
    ventosa.setAttribute('peso', new THREE.BufferAttribute(new Float32Array(ventosa.attributes.position.count).fill(t), 1));
    parti.push(ventosa);
  }
  return mergeGeometries(parti.map(g => (g.index ? g.toNonIndexed() : g)));
}

function costruisciScrigno(s) {
  const { mat, kit } = s;
  const dati = ACQUISTI.find(a => a.tipo === 'cassa');
  const ry = Math.atan2(dati.verso.x, dati.verso.z);
  const cx = dati.posizione.x + dati.verso.x * 0.18;
  const cz = dati.posizione.z + dati.verso.z * 0.18;
  const base = posa(cx, 0, cz, ry);
  const locale = (m, g) => s.pezzo(m, g.applyMatrix4(base));
  locale(mat.lamieraScura, scatola(-0.71, 0, -0.42, 0.71, 0.08, 0.42));
  locale(mat.ottone, scatola(-0.65, 0.08, -0.36, 0.65, 0.7, 0.36));
  for (const x of [-0.45, 0.45]) locale(mat.oro, scatola(x - 0.04, 0.08, -0.375, x + 0.04, 0.7, 0.375));
  for (const [x, z] of [[-0.64, -0.35], [0.64, -0.35], [-0.64, 0.35], [0.64, 0.35]]) locale(mat.oro, scatola(x - 0.045, 0.08, z - 0.045, x + 0.045, 0.72, z + 0.045));
  locale(mat.oro, scatola(-0.67, 0.64, -0.38, 0.67, 0.7, 0.38));
  locale(mat.oro, scatola(-0.11, 0.36, 0.36, 0.11, 0.62, 0.39));
  locale(mat.gomma, scatola(-0.025, 0.44, 0.385, 0.025, 0.52, 0.392));
  const coralli = [[-0.62, 0.12, 0.36, 0.17], [0.6, 0.16, 0.37, 0.13], [-0.68, 0.5, -0.18, 0.12], [0.67, 0.32, -0.28, 0.15], [0.2, 0.06, 0.4, 0.1]];
  for (const [x, y, z, r] of coralli) {
    const g = new THREE.IcosahedronGeometry(r, 2);
    g.deleteAttribute('uv');
    g.deleteAttribute('normal');
    const blob = kit.deforma(mergeVertices(g), { ampiezza: r * 0.35, frequenza: 9, ottave: 3, seme: x * 10 }).scale(1, 0.7, 0.8).translate(x, y, z);
    s.metti(mat.corallo, blob.applyMatrix4(base));
    for (let k = 0; k < 3; k++) {
      const a = s.caso() * Math.PI * 2;
      const alto = 0.12 + s.caso() * 0.14;
      const piega = (s.caso() - 0.5) * 1.2;
      const radice = v3(x + Math.cos(a) * r * 0.5, y + r * 0.3, z + Math.sin(a) * r * 0.5);
      const ramo = new THREE.ConeGeometry(0.022, alto, 6).translate(0, alto / 2, 0).rotateZ(piega).rotateY(a).translate(radice.x, radice.y, radice.z);
      s.metti(mat.corallo, ramo.applyMatrix4(base));
      const punta = v3(0, alto, 0).applyAxisAngle(ASSE_Z, piega).applyAxisAngle(ASSE_Y, a).add(radice);
      s.metti(mat.coralloLuce, new THREE.SphereGeometry(0.025, 6, 4).translate(punta.x, punta.y, punta.z).applyMatrix4(base));
    }
  }
  const gruppo = new THREE.Group();
  gruppo.position.set(cx, 0, cz);
  gruppo.rotation.y = ry;
  kit.scena.add(gruppo);
  const perno = new THREE.Group();
  perno.position.set(0, 0.7, -0.36);
  gruppo.add(perno);
  const coperchio = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 1.3, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).translate(0, 0, 0.36), mat.ottone);
  const fasce = [-0.62, -0.45, 0.45, 0.62].map(x => new THREE.TorusGeometry(0.375, 0.03, 6, 16, Math.PI).rotateY(Math.PI / 2).translate(x, 0, 0.36));
  fasce.push(new THREE.BoxGeometry(0.16, 0.2, 0.03).translate(0, 0.02, 0.73));
  const bande = new THREE.Mesh(unisci(fasce), mat.oro);
  const g = new THREE.IcosahedronGeometry(0.11, 2);
  g.deleteAttribute('uv');
  g.deleteAttribute('normal');
  const coralloCoperchio = new THREE.Mesh(kit.deforma(mergeVertices(g), { ampiezza: 0.04, frequenza: 10, ottave: 3, seme: 4 }).scale(1.4, 0.6, 1).translate(-0.25, 0.36, 0.3), mat.corallo);
  const lucine = new THREE.Mesh(unisci([0, 1, 2, 3].map(i => new THREE.SphereGeometry(0.022, 6, 4).translate(-0.4 + i * 0.1, 0.42, 0.25 + (i % 2) * 0.1))), mat.coralloLuce);
  perno.add(coperchio, bande, coralloCoperchio, lucine);
  kit.ombra(perno, true, true);
  const contorci = { value: 0.15 };
  mat.tentacolo.onBeforeCompile = shader => {
    shader.uniforms.uTempo = kit.uniformi.uTempo;
    shader.uniforms.uContorci = contorci;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float peso;\nuniform float uTempo;\nuniform float uContorci;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      float onda = sin(position.y * 5.0 + uTempo * 3.1 + position.x * 3.0) + sin(position.z * 6.0 - uTempo * 2.3);
      transformed += vec3(sin(uTempo * 2.0 + position.y * 4.0), cos(uTempo * 1.7 + position.x * 5.0) * 0.6, cos(uTempo * 2.4 + position.z * 4.0)) * onda * 0.05 * peso * peso * uContorci;`);
  };
  mat.tentacolo.customProgramCacheKey = () => 'reattore-tentacoli';
  const percorsi = [-1, 1].flatMap(k => [
    [v3(k * 0.8, 0, -0.3), v3(k * 0.9, 0.6, -0.32), v3(k * 0.93, 1.2, -0.2), v3(k * 0.86, 1.6, 0.05), v3(k * 0.72, 1.72, 0.3), v3(k * 0.62, 1.55, 0.45)],
    [v3(k * 0.98, 0, 0.58), v3(k * 0.78, 0.08, 0.5), v3(k * 0.56, 0.2, 0.45), v3(k * 0.32, 0.32, 0.43), v3(k * 0.16, 0.28, 0.46)],
  ]);
  const tentacoli = new THREE.Mesh(mergeGeometries(percorsi.map(geometriaTentacolo)), mat.tentacolo);
  kit.ombra(tentacoli, true, true);
  gruppo.add(tentacoli);
  const fascioMat = materialeShader(kit, { uForza: { value: 1 }, uColore: { value: new THREE.Color(0x7fe4ff) } }, FRAMMENTO_FASCIO, { additivo: true, nebbia: false, lato: THREE.DoubleSide });
  const fascio = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 9, 32, 1, true).translate(0, 4.5, 0), fascioMat);
  fascio.position.set(cx, 1, cz);
  kit.scena.add(fascio);
  const semi = new Float32Array(SCINTILLE_FASCIO * 4);
  for (let i = 0; i < SCINTILLE_FASCIO; i++) semi.set([s.caso() * Math.PI * 2, s.caso(), s.caso(), s.caso()], i * 4);
  const geoScintille = new THREE.BufferGeometry();
  geoScintille.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SCINTILLE_FASCIO * 3), 3));
  geoScintille.setAttribute('seme', new THREE.BufferAttribute(semi, 4));
  const scintilleMat = materialeShader(kit, {
    uCentro: { value: v3(cx, 0.9, cz) }, uScala: { value: SCALA_PUNTI }, uAlto: { value: 8 }, uColore: { value: new THREE.Color(0xbff6ff) }, uForza: { value: 1 },
  }, FRAMMENTO_SCINTILLA, { vertice: VERTICE_SCINTILLE, testa: TESTA_PUNTI, additivo: true, nebbia: false });
  const scintille = new THREE.Points(geoScintille, scintilleMat);
  scintille.frustumCulled = false;
  kit.scena.add(scintille);
  const armi = new Map();
  let mostrata = null;
  let apertura = 0;
  let forzaFascio = 1;
  let aperta = false;
  kit.luce({
    x: cx, y: 2.2, z: cz + 0.6, colore: 0x7fe4ff, intensita: 6, portata: 7,
    colorePer: () => (aperta ? 0xffd890 : 0x7fe4ff),
    forza: (v, t) => (aperta ? 9 + Math.sin(t * 6) * 2 : 5 + Math.sin(t * 2) * 0.8),
  });
  const mostra = arma => {
    if (mostrata === arma) return;
    for (const m of armi.values()) m.visible = false;
    mostrata = arma;
    if (!arma) return;
    if (!armi.has(arma)) {
      const modello = modelloArma(arma, kit.materialiArmi).gruppo;
      modello.scale.setScalar(SCALA_ARMA_SCRIGNO);
      gruppo.add(modello);
      armi.set(arma, modello);
    }
    armi.get(arma).visible = true;
  };
  return {
    aggiorna(v, dt, tempo) {
      aperta = v.cassa?.stato === 'aperta';
      apertura = tendi(apertura, aperta ? 1 : 0, aperta ? 5 : 3, dt);
      perno.rotation.x = -APERTURA_COPERCHIO * apertura;
      forzaFascio = tendi(forzaFascio, aperta ? 0 : 1, 3, dt);
      fascioMat.uniforms.uForza.value = forzaFascio;
      scintilleMat.uniforms.uForza.value = forzaFascio;
      fascio.visible = forzaFascio > 0.02;
      scintille.visible = fascio.visible;
      contorci.value = tendi(contorci.value, aperta ? 1 : 0.15, 2, dt);
      mostra(aperta ? v.cassa.arma : null);
      if (!mostrata) return;
      const m = armi.get(mostrata);
      m.position.set(0, 1.45 + Math.sin(tempo * 2) * 0.06, 0.08);
      m.rotation.set(0, tempo * 1.2, 0);
    },
    evento(e) {
      if (e.k !== 'cassa') return;
      kit.effetti.scarica(v3(cx, 1.2, cz));
    },
  };
}

function geometriaAnta() {
  return unisci([
    new THREE.BoxGeometry(1.3, ALTO_PORTA, 0.12).translate(0, ALTO_PORTA / 2, 0),
    new THREE.BoxGeometry(1.3, 0.1, 0.16).translate(0, 0.05, 0),
    new THREE.BoxGeometry(1.3, 0.1, 0.16).translate(0, ALTO_PORTA - 0.05, 0),
    new THREE.BoxGeometry(1.3, 0.08, 0.16).translate(0, 0.8, 0),
    new THREE.BoxGeometry(0.1, ALTO_PORTA, 0.16).translate(-0.6, ALTO_PORTA / 2, 0),
    new THREE.BoxGeometry(0.1, ALTO_PORTA, 0.16).translate(0.6, ALTO_PORTA / 2, 0),
    new THREE.TorusGeometry(0.17, 0.035, 6, 20).translate(0, 2, 0.07),
    new THREE.TorusGeometry(0.17, 0.035, 6, 20).translate(0, 2, -0.07),
  ]);
}

function geometriaVolantino() {
  return unisci([
    new THREE.TorusGeometry(0.24, 0.028, 6, 28),
    new THREE.CylinderGeometry(0.05, 0.05, 0.1, 12).rotateX(Math.PI / 2),
    new THREE.BoxGeometry(0.46, 0.03, 0.025),
    new THREE.BoxGeometry(0.03, 0.46, 0.025),
  ]);
}

function geometriaSportello() {
  const parti = [
    new THREE.CylinderGeometry(1.2, 1.2, 0.18, 40).rotateZ(Math.PI / 2),
    new THREE.TorusGeometry(0.95, 0.05, 6, 40).rotateY(Math.PI / 2).translate(-0.09, 0, 0),
    new THREE.TorusGeometry(0.55, 0.04, 6, 32).rotateY(Math.PI / 2).translate(-0.09, 0, 0),
    new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16).rotateZ(Math.PI / 2).translate(-0.12, 0, 0),
    traveTra(v3(0.02, 0, -1.05), v3(0.16, 0, -1.27), 0.14, 0.3),
    new THREE.CylinderGeometry(0.07, 0.07, 0.6, 12).translate(0.16, 0, -1.27),
  ];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    parti.push(new THREE.BoxGeometry(0.08, 0.1, 0.22).rotateX(-a).translate(-0.1, Math.cos(a) * 1.1, Math.sin(a) * 1.1));
  }
  return unisci(parti);
}

function costruisciStagna(s) {
  const { mat, kit } = s;
  for (const x of [53.6, 55.4, 57.4]) {
    s.blocco(mat.acciaio, x - 0.09, 0, -2.8, x + 0.09, ALTO_STAGNA, -2.66);
    s.blocco(mat.acciaio, x - 0.09, ALTO_STAGNA - 0.14, -2.8, x + 0.09, ALTO_STAGNA, 2.8);
    s.blocco(mat.acciaio, x - 0.09, 2.8, 2.66, x + 0.09, ALTO_STAGNA, 2.8);
    filaChiodi(s, 'acciaio', v3(x, 0.3, -2.655), v3(x, ALTO_STAGNA - 0.3, -2.655), 0.35, v3(0, 0, 1));
  }
  for (const [lato, inizio] of [[-1, Math.PI / 2], [1, 0]]) {
    const g = new THREE.CylinderGeometry(0.5, 0.5, 5.6, 10, 1, true, inizio, Math.PI / 2).rotateZ(Math.PI / 2).translate(55.5, ALTO_STAGNA - 0.5, lato * 2.3);
    s.metti(mat.paratia, rovescia(uvCilindro(g, 0.8, 5.6)));
  }
  for (const [y, r, m] of [[0.35, 0.06, mat.rame], [2.45, 0.05, mat.acciaio]]) s.metti(m, cilindroTra(v3(52.8, y, -2.7), v3(58.2, y, -2.7), r, 8));
  for (const x of [54.1, 54.7]) {
    s.cartello('quadrante', 0.24, posa(x, 1.6, -2.79, 0), false);
    s.metti(mat.ottone, new THREE.TorusGeometry(0.125, 0.02, 6, 20).translate(x, 1.6, -2.775));
  }
  s.cartello('pressione', 0.7, posa(56.5, 1.7, -2.79, 0));
  s.cartello('decompressione', 1.5, posa(58.29, 3.12, 0, -Math.PI / 2), false);
  s.metti(mat.rosso, new THREE.TorusGeometry(0.2, 0.025, 6, 20).translate(57.6, 1.2, -2.73));
  s.metti(mat.ottone, new THREE.TorusGeometry(PORTELLO.r + 0.05, 0.1, 8, 48).rotateY(Math.PI / 2).translate(58.27, PORTELLO.y, 0));
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    s.chiodo('ottone', v3(58.29, PORTELLO.y + Math.sin(a) * 1.5, Math.cos(a) * 1.5), v3(-1, 0, 0));
  }
  s.blocco(mat.acciaio, 52.12, ALTO_PORTA + 0.02, -2.7, 52.3, ALTO_PORTA + 0.22, 2.7);
  s.blocco(mat.acciaio, 52.9, ALTO_PORTA + 0.02, 2.62, 58.2, ALTO_PORTA + 0.22, 2.8);
  s.blocco(mat.ottone, 52.7, 0, -1.45, 52.82, ALTO_PORTA + 0.15, -1.3);
  s.blocco(mat.ottone, 52.7, 0, 1.3, 52.82, ALTO_PORTA + 0.15, 1.45);
  s.blocco(mat.ottone, 52.7, ALTO_PORTA, -1.45, 52.82, ALTO_PORTA + 0.15, 1.45);
  s.blocco(mat.ottone, 54.05, 0, 3.2, 54.2, ALTO_PORTA + 0.15, 3.32);
  s.blocco(mat.ottone, 56.8, 0, 3.2, 56.95, ALTO_PORTA + 0.15, 3.32);
  s.blocco(mat.ottone, 54.05, ALTO_PORTA, 3.2, 56.95, ALTO_PORTA + 0.15, 3.32);
  const faroMat = new THREE.MeshStandardMaterial({ color: 0x300606, emissive: 0xff1a0c, emissiveIntensity: 0.3, roughness: 0.3 });
  s.metti(mat.acciaio, new THREE.CylinderGeometry(0.16, 0.18, 0.12, 16).translate(FARO.x, ALTO_STAGNA - 0.2, FARO.z));
  s.metti(faroMat, new THREE.SphereGeometry(0.15, 18, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).translate(FARO.x, ALTO_STAGNA - 0.26, FARO.z));
  for (const ry of [0, Math.PI / 2]) s.metti(mat.acciaio, new THREE.TorusGeometry(0.16, 0.01, 4, 16, Math.PI).rotateX(Math.PI).rotateY(ry).translate(FARO.x, ALTO_STAGNA - 0.26, FARO.z));
  const conoMat = materialeShader(kit, { uColore: { value: new THREE.Color(0xff2010) }, uForza: { value: 0 } }, FRAMMENTO_CONO, { additivo: true, nebbia: false, lato: THREE.DoubleSide });
  const coni = new THREE.Mesh(unisci([1, -1].map(k => new THREE.ConeGeometry(0.85, 3, 20, 1, true).translate(0, -1.5, 0).rotateZ(k * (Math.PI / 2 - 0.25)))), conoMat);
  coni.position.set(FARO.x, ALTO_STAGNA - 0.3, FARO.z);
  kit.scena.add(coni);

  const quadro = OSTACOLI.find(q => q.tipo === 'quadroStagna');
  const zq = (quadro.z0 + quadro.z1) / 2;
  s.blocco(mat.lamieraScura, quadro.x0, 0, quadro.z0, quadro.x1, 0.08, quadro.z1);
  s.blocco(mat.paratia, quadro.x0 + 0.05, 0.08, quadro.z0 + 0.04, quadro.x1, 1.72, quadro.z1 - 0.04);
  s.blocco(mat.lamieraScura, quadro.x0, 1.72, quadro.z0, quadro.x1, 1.8, quadro.z1);
  const xf = quadro.x0 + 0.05;
  s.metti(mat.pericolo, new THREE.CylinderGeometry(0.12, 0.12, 0.05, 20).rotateZ(Math.PI / 2).translate(xf - 0.02, 1.05, zq + 0.15));
  s.metti(mat.rosso, new THREE.SphereGeometry(0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateZ(Math.PI / 2).translate(xf - 0.045, 1.05, zq + 0.15));
  s.cartello('quadrante', 0.26, posa(xf - 0.005, 1.45, zq - 0.22, -Math.PI / 2), false);
  s.metti(mat.ottone, new THREE.TorusGeometry(0.135, 0.022, 6, 24).rotateY(Math.PI / 2).translate(xf - 0.02, 1.45, zq - 0.22));
  s.blocco(mat.acciaio, xf - 0.12, 0.66, zq - 0.15, xf, 0.72, zq + 0.15);
  s.cartello('stagna', 0.5, posa(xf - 0.005, 0.35, zq, -Math.PI / 2), false);
  s.metti(mat.acciaio, cilindroTra(v3(52.15, 1.8, zq + 0.35), v3(52.15, TETTO, zq + 0.35), 0.06, 8));
  const lampadine = [0x3dff6a, 0xff2a1a, 0xffa020].map(c => new THREE.MeshStandardMaterial({ color: 0x101010, emissive: c, emissiveIntensity: 0.1 }));
  lampadine.forEach((m, i) => s.metti(m, new THREE.SphereGeometry(0.04, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2).rotateZ(Math.PI / 2).translate(xf - 0.005, 1.45, zq + 0.12 + i * 0.15)));
  const ago = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.11, 0.008).translate(0, 0.04, 0), mat.gomma);
  ago.position.set(xf - 0.025, 1.45, zq - 0.22);
  kit.scena.add(ago);

  const nucleoDati = ACQUISTI.find(a => a.tipo === 'nucleo');
  const NUCLEO = v3(nucleoDati.posizione.x, 1.15, nucleoDati.posizione.z);
  const cuoreMat = materialeShader(kit, { uBattito: { value: 0 } }, FRAMMENTO_CUORE);
  const nucleo = new THREE.Group();
  nucleo.position.copy(NUCLEO);
  nucleo.visible = false;
  kit.scena.add(nucleo);
  const forma = new THREE.IcosahedronGeometry(0.2, 4);
  forma.deleteAttribute('uv');
  forma.deleteAttribute('normal');
  const geoCuore = kit.deforma(mergeVertices(forma), { ampiezza: 0.045, frequenza: 7, ottave: 3, seme: 3 }).scale(1, 1.18, 0.95);
  geoCuore.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geoCuore.attributes.position.count * 2), 2));
  const cuore = new THREE.Mesh(geoCuore, cuoreMat);
  const conchiglie = [[0, 1.9, 0.3, 1], [2.3, 1.7, 0.2, 1.1], [4.3, 1.6, 1.3, 1.1], [0.9, 1.5, 1.6, 1]].map(([p0, pl, t0, tl]) => {
    const g = new THREE.SphereGeometry(0.3, 18, 12, p0, pl, t0, tl);
    const centro = v3(Math.cos(p0 + pl / 2) * Math.sin(t0 + tl / 2), Math.cos(t0 + tl / 2), Math.sin(p0 + pl / 2) * Math.sin(t0 + tl / 2) * -1);
    return g.translate(centro.x * 0.035, centro.y * 0.035, centro.z * 0.035);
  });
  conchiglie.push(new THREE.TorusGeometry(0.315, 0.022, 6, 32, 4.4).rotateX(0.4), new THREE.TorusGeometry(0.315, 0.022, 6, 32, 3.8).rotateY(1.2).rotateX(1.3));
  const guscio = new THREE.Mesh(unisci(conchiglie), mat.ottoneDoppio);
  const alone = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone(), color: ORICALCO, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 }));
  alone.scale.setScalar(1.4);
  const schegge = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.05), mat.ottone, 4);
  schegge.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  schegge.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1);
  nucleo.add(cuore, guscio, alone, schegge);
  let battito = 0;
  kit.luce({ x: NUCLEO.x, y: 1.4, z: NUCLEO.z, colore: ORICALCO, intensita: 9, portata: 7, attiva: v => v.abisso?.nucleo === 1, forza: () => 7 + battito * 6 });

  const anta = geometriaAnta();
  const strisce = unisci([-0.6, 0.6].map(x => new THREE.BoxGeometry(0.098, ALTO_PORTA - 0.25, 0.166).translate(x, ALTO_PORTA / 2, 0)));
  const ante = new THREE.InstancedMesh(anta, mat.paratia, 4);
  const anteStrisce = new THREE.InstancedMesh(strisce, mat.pericolo, 4);
  const volantini = new THREE.InstancedMesh(geometriaVolantino(), mat.ottone, 5);
  const sferaStagna = new THREE.Sphere(v3(55, 1.5, 0.5), 6);
  for (const m of [ante, anteStrisce, volantini]) {
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.boundingSphere = sferaStagna;
    kit.ombra(m, true, true);
    kit.scena.add(m);
  }
  const porte = [
    { id: 'stagnaA', centro: v3(52.22, 0, 0), q: new THREE.Quaternion().setFromAxisAngle(ASSE_Y, -Math.PI / 2), p: null },
    { id: 'stagnaB', centro: v3(55.5, 0, 2.72), q: new THREE.Quaternion().setFromAxisAngle(ASSE_Y, Math.PI), p: null },
  ];
  const perno = new THREE.Group();
  perno.position.set(PORTELLO.perno, PORTELLO.y, PORTELLO.cerniera);
  kit.scena.add(perno);
  const sportello = new THREE.Mesh(geometriaSportello(), mat.acciaio);
  sportello.position.set(PORTELLO.x - PORTELLO.perno, 0, PORTELLO.z - PORTELLO.cerniera);
  const vetrino = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20).rotateY(-Math.PI / 2).translate(-0.096, 0.72, 0), mat.vetroScuro);
  sportello.add(vetrino);
  perno.add(sportello);
  kit.ombra(perno, true, true);
  const gettoMat = materialeShader(kit, { uForza: { value: 0 }, uLivello: { value: -100 } }, FRAMMENTO_GETTO, { trasparente: true, scriveProfondita: false, lato: THREE.DoubleSide });
  const geoGetto = new THREE.ConeGeometry(1.5, 4.8, 24, 1, true).translate(0, -2.4, 0).rotateZ(-Math.PI / 2);
  const uvGetto = geoGetto.attributes.uv;
  for (let i = 0; i < uvGetto.count; i++) uvGetto.setXY(i, 1 - uvGetto.getY(i), uvGetto.getX(i));
  const getto = new THREE.Mesh(geoGetto, gettoMat);
  getto.position.set(PORTELLO.x - 0.1, PORTELLO.y, PORTELLO.z);
  getto.visible = false;
  kit.scena.add(getto);

  let esplosione = -Infinity;
  let ora = 0;
  let ultimoSpruzzo = 0;
  kit.luce({
    x: 55.6, y: 3.1, z: 0, colore: 0xffe2bf, intensita: 7, portata: 10,
    forza: (v, t) => {
      const st = v.abisso?.stagna;
      const k = t - esplosione;
      if (k >= 0 && k < 0.35) return 70 * (1 - k / 0.35);
      if (st?.decompressione > 0) return Math.sin(t * 22) > 0 ? 16 : 2;
      if (st?.chiusa) return 4 + 9 * Math.max(0, Math.sin(t * 7));
      return 6;
    },
    colorePer: (v, t) => {
      const st = v.abisso?.stagna;
      if (t - esplosione >= 0 && t - esplosione < 0.35) return 0xd8f4ff;
      return st?.chiusa || st?.decompressione > 0 ? ROSSO_ALLARME : 0xffe2bf;
    },
  });
  const m = new THREE.Matrix4();
  const t = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const giroVolantino = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const ruota = new THREE.Matrix4();
  const ingrandisci = new THREE.Matrix4().makeScale(1.8, 1.8, 1.8);
  const verso = new THREE.Matrix4().makeRotationY(Math.PI / 2);
  const apertura = k => {
    if (k < 0) return 0;
    if (k < APRE_PORTELLO) return APERTURA_PORTELLO * morbido(k / APRE_PORTELLO);
    if (k < APRE_PORTELLO + RESTA_PORTELLO) return APERTURA_PORTELLO + Math.sin(k * 30) * 0.02;
    return APERTURA_PORTELLO * (1 - morbido((k - APRE_PORTELLO - RESTA_PORTELLO) / CHIUDE_PORTELLO));
  };
  return {
    aggiorna(v, dt, tempo, punto) {
      ora = tempo;
      const ab = v.abisso;
      const st = ab.stagna;
      if (punto && Math.hypot(punto.x - 55, punto.z) > 40) return;
      porte.forEach((porta, i) => {
        const aperta = v.porte.has(porta.id);
        porta.p = porta.p === null ? (aperta ? 1 : 0) : limita(porta.p + (aperta ? dt : -dt) / DURATA_PORTA);
        const giro = morbido(porta.p / 0.4) * Math.PI * 4;
        const scorre = morbido((porta.p - 0.3) / 0.7);
        [-1, 1].forEach((k, j) => {
          pos.set(k * (0.65 + 1.3 * scorre), 0, 0).applyQuaternion(porta.q).add(porta.centro);
          m.compose(pos, porta.q, UNO);
          ante.setMatrixAt(i * 2 + j, m);
          anteStrisce.setMatrixAt(i * 2 + j, m);
          pos.set(k * (0.23 + 1.3 * scorre), 1.3, 0.1).applyQuaternion(porta.q).add(porta.centro);
          m.compose(pos, q.copy(porta.q).multiply(giroVolantino.setFromAxisAngle(ASSE_Z, giro * k)), UNO);
          volantini.setMatrixAt(i * 2 + j, m);
        });
      });
      const k = tempo - esplosione;
      const angolo = apertura(k);
      perno.rotation.y = angolo;
      perno.updateMatrix();
      const chiusura = k > APRE_PORTELLO + RESTA_PORTELLO ? morbido((k - APRE_PORTELLO - RESTA_PORTELLO) / CHIUDE_PORTELLO) : 0;
      t.makeTranslation(PORTELLO.x - PORTELLO.perno - 0.14, 0, PORTELLO.z - PORTELLO.cerniera);
      m.copy(perno.matrix).multiply(t).multiply(verso).multiply(ruota.makeRotationZ(chiusura * Math.PI * 4)).multiply(ingrandisci);
      volantini.setMatrixAt(4, m);
      for (const mesh of [ante, anteStrisce, volantini]) mesh.instanceMatrix.needsUpdate = true;
      const spruzzo = k >= 0 && k < DURATA_SPRUZZO ? 1 - k / DURATA_SPRUZZO : 0;
      getto.visible = spruzzo > 0;
      gettoMat.uniforms.uForza.value = spruzzo * 1.6;
      if (spruzzo > 0 && tempo - ultimoSpruzzo > 0.06) {
        ultimoSpruzzo = tempo;
        kit.effetti.brina(v3(58.1, PORTELLO.y + (s.caso() - 0.5) * 1.4, (s.caso() - 0.5) * 1.4), v3(-1, (s.caso() - 0.3) * 0.5, (s.caso() - 0.5) * 0.8));
      }
      const chiusa = st.chiusa || st.decompressione > 0;
      const conto = st.decompressione > 0;
      faroMat.emissiveIntensity = conto ? (Math.sin(tempo * 22) > 0 ? 4 : 0.2) : chiusa ? 2.6 : 0.3;
      conoMat.uniforms.uForza.value = chiusa ? (conto ? (Math.sin(tempo * 22) > 0 ? 1.4 : 0) : 0.9) : 0;
      coni.visible = chiusa;
      coni.rotation.y += dt * (conto ? 9 : 4);
      lampadine[0].emissiveIntensity = chiusa ? 0.1 : 2.4;
      lampadine[1].emissiveIntensity = chiusa && !conto ? 2.6 : 0.1;
      lampadine[2].emissiveIntensity = conto && Math.sin(tempo * 14) > 0 ? 3 : 0.1;
      const pressione = conto ? st.decompressione / A.DECOMPRESSIONE : st.riapertura > 0 ? 0.05 : chiusa ? 0.95 : 0.3;
      ago.rotation.x = -(-2.2 + pressione * 4.2 + (conto ? Math.sin(tempo * 31) * 0.08 : 0));
      nucleo.visible = ab.nucleo === 1;
      if (!nucleo.visible) return;
      battito = Math.pow(Math.max(0, Math.sin(tempo * 5.2)), 8) + 0.6 * Math.pow(Math.max(0, Math.sin(tempo * 5.2 - 0.9)), 8);
      nucleo.position.y = NUCLEO.y + Math.sin(tempo * 1.6) * 0.08;
      nucleo.rotation.y += dt * 0.5;
      cuore.scale.setScalar(1 + battito * 0.09);
      cuoreMat.uniforms.uBattito.value = battito;
      alone.material.opacity = 0.55 + battito * 0.45;
      for (let i = 0; i < 4; i++) {
        const a = tempo * (0.9 + i * 0.2) + i * 1.6;
        m.compose(pos.set(Math.cos(a) * 0.45, Math.sin(a * 1.3 + i) * 0.15, Math.sin(a) * 0.45), q.setFromAxisAngle(ASSE_Y, a * 2), UNO);
        schegge.setMatrixAt(i, m);
      }
      schegge.instanceMatrix.needsUpdate = true;
    },
    evento(e) {
      if (e.k === 'esplosioneStagna') {
        esplosione = ora;
        const fx = kit.effetti;
        fx.esplosione(v3(57.6, PORTELLO.y, 0), 'energia', 0xd8f6ff);
        fx.ghiaccio(v3(57.2, 1.6, 0));
        fx.ghiaccio(v3(55.8, 1, 0.4));
        for (let i = 0; i < 8; i++) fx.brina(v3(58.2, PORTELLO.y + (s.caso() - 0.5) * 1.6, (s.caso() - 0.5) * 1.6), v3(-1, (s.caso() - 0.3) * 0.4, (s.caso() - 0.5) * 0.6));
      } else if (e.k === 'nucleoCaduto') {
        kit.effetti.esplosione(NUCLEO.clone(), 'energia', ORICALCO);
      } else if (e.k === 'nucleoPreso') {
        kit.effetti.scarica(NUCLEO.clone());
      }
    },
    svuota() {
      esplosione = -Infinity;
    },
  };
}

function cassa(s, m, x0, z0, x1, z1, y0, y1) {
  const { mat } = s;
  s.blocco(m, x0, y0, z0, x1, y1, z1);
  for (const y of [y0, y1 - 0.06]) s.blocco(mat.acciaio, x0 - 0.015, y, z0 - 0.015, x1 + 0.015, y + 0.06, z1 + 0.015);
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) s.blocco(mat.acciaio, x - 0.03, y0, z - 0.03, x + 0.03, y1, z + 0.03);
}

function barile(s, x, z) {
  const { mat } = s;
  s.pezzo(mat.rame, new THREE.CylinderGeometry(0.3, 0.3, 0.88, 18).translate(x, 0.44, z));
  for (const y of [0.15, 0.44, 0.73]) s.metti(mat.acciaio, new THREE.TorusGeometry(0.305, 0.018, 4, 20).rotateX(Math.PI / 2).translate(x, y, z));
  s.metti(mat.acciaio, new THREE.CylinderGeometry(0.06, 0.06, 0.03, 8).translate(x + 0.12, 0.89, z));
}

function costruisciCasse(s) {
  const { mat } = s;
  for (const o of OSTACOLI.filter(q => q.tipo === 'casse')) {
    const w = o.x1 - o.x0;
    const d = o.z1 - o.z0;
    const h = o.altezza;
    cassa(s, mat.lamiera, o.x0 + 0.05, o.z0 + 0.05, o.x0 + w * 0.48, o.z0 + d * 0.55, 0, h * 0.62);
    cassa(s, mat.paratia, o.x0 + w * 0.52, o.z0 + 0.05, o.x1 - 0.05, o.z0 + d * 0.62, 0, h * 0.5);
    cassa(s, mat.lamieraScura, o.x0 + 0.12, o.z0 + 0.12, o.x0 + w * 0.42, o.z0 + d * 0.48, h * 0.62, h);
    barile(s, o.x0 + w * 0.3, o.z1 - 0.38);
    barile(s, o.x0 + w * 0.66, o.z1 - 0.36);
    s.blocco(mat.rosso, o.x0 + w * 0.6, h * 0.5, o.z0 + 0.2, o.x0 + w * 0.85, h * 0.5 + 0.18, o.z0 + 0.45);
  }
}

function pompa(s, z) {
  const { mat } = s;
  const x = 53.35;
  s.blocco(mat.lamieraScura, 52.8, 0, z - 0.75, 53.9, 0.14, z + 0.75);
  s.pezzo(mat.paratia, new THREE.CylinderGeometry(0.3, 0.3, 0.75, 20).rotateX(Math.PI / 2).translate(x, 0.55, z + 0.3));
  for (let k = 0; k < 5; k++) s.metti(mat.acciaio, new THREE.TorusGeometry(0.31, 0.02, 4, 20).translate(x, 0.55, z + 0.02 + k * 0.14));
  s.metti(mat.acciaio, new THREE.CylinderGeometry(0.12, 0.12, 0.25, 12).rotateX(Math.PI / 2).translate(x, 0.55, z - 0.2));
  s.metti(mat.ottone, new THREE.CylinderGeometry(0.38, 0.38, 0.28, 24).rotateX(Math.PI / 2).translate(x, 0.55, z - 0.5));
  s.metti(mat.ottone, new THREE.TorusGeometry(0.3, 0.1, 8, 24, Math.PI * 1.6).translate(x, 0.55, z - 0.5));
  s.metti(mat.rame, cilindroTra(v3(x, 0.9, z - 0.5), v3(x, 2.75, z - 0.5), 0.11, 12));
  s.metti(mat.rame, cilindroTra(v3(x, 0.55, z - 0.66), v3(x, 0.55, z - 0.9), 0.12, 12));
  s.metti(mat.rame, cilindroTra(v3(x, 0.55, z - 0.9), v3(x, 0, z - 0.9), 0.12, 12));
  s.metti(mat.rosso, new THREE.TorusGeometry(0.14, 0.02, 6, 18).rotateY(Math.PI / 2).translate(x + 0.16, 1.6, z - 0.5));
  s.metti(mat.rosso, cilindroTra(v3(x + 0.11, 1.6, z - 0.5), v3(x + 0.16, 1.6, z - 0.5), 0.02, 6));
  s.cartello('quadrante', 0.18, posa(x + 0.115, 2.1, z - 0.5, Math.PI / 2), false);
}

function costruisciServizio(s) {
  const { mat, kit } = s;
  for (const z of [5.3, 8.4, 11.5]) pompa(s, z);
  s.metti(mat.rame, cilindroTra(v3(53.35, 2.75, 3.4), v3(53.35, 2.75, 13.7), 0.15, 14));
  for (let z = 4; z < 13.7; z += 1.6) s.metti(mat.ottone, new THREE.TorusGeometry(0.17, 0.035, 6, 18).translate(53.35, 2.75, z));
  s.metti(mat.luceCalda, new THREE.SphereGeometry(0.08, 10, 8).translate(53.35, 3.0, 8.4));
  s.cartello('pompe', 1.4, posa(54.41, 2.92, 8.6, Math.PI / 2), false);
  const condotta = [v3(56.25, 2.85, 3.3), v3(56.25, 2.85, 15.3), v3(56.05, 2.85, 15.95), v3(55.4, 2.85, 16.15), v3(44.4, 2.85, 16.15)];
  s.metti(mat.rame, tubo(condotta, 0.14, 12, 6));
  s.metti(mat.acciaio, cilindroTra(v3(55, 3.02, 3.3), v3(55, 3.02, 14.6), 0.08, 8));
  for (let z = 4.2; z < 15; z += 2) s.metti(mat.ottone, new THREE.TorusGeometry(0.16, 0.03, 6, 16).translate(56.25, 2.85, z));
  for (let x = 45.2; x < 55; x += 2) s.metti(mat.ottone, new THREE.TorusGeometry(0.16, 0.03, 6, 16).rotateY(Math.PI / 2).translate(x, 2.85, 16.15));
  s.blocco(mat.paratia, 56.48, 1.2, 6, 56.6, 1.9, 6.9);
  s.blocco(mat.acciaio, 56.46, 1.75, 6.05, 56.48, 1.85, 6.85);
  s.metti(mat.rosso, new THREE.CylinderGeometry(0.09, 0.09, 0.5, 12).translate(56.48, 0.6, 10.5));
  s.metti(mat.gomma, cilindroTra(v3(56.48, 0.85, 10.5), v3(56.4, 0.95, 10.5), 0.02, 6));
  s.metti(mat.rosso, new THREE.TorusGeometry(0.2, 0.025, 6, 20).translate(47, 1.4, 16.37));
  s.blocco(mat.paratia, 52.9, 1.1, 16.28, 54.1, 1.9, 16.4);
  for (const x of [45.8, 47.6]) {
    s.cartello('quadrante', 0.22, posa(x + 1.4, 1.55, 16.39, Math.PI), false);
  }
  const lampade = [[55.5, 6.5], [55.5, 11.5], [47.5, 15.3], [52.5, 15.3]];
  for (const [x, z] of lampade) {
    s.metti(mat.luceCalda, new THREE.SphereGeometry(0.09, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).translate(x, ALTO_CORRIDOIO - 0.02, z));
    s.metti(mat.acciaio, new THREE.TorusGeometry(0.12, 0.012, 4, 14).rotateX(Math.PI / 2).translate(x, ALTO_CORRIDOIO - 0.06, z));
  }
  kit.luce({ x: 55.5, y: 2.8, z: 9, colore: AMBRA, intensita: 7, portata: 9, tremola: true });
  kit.luce({ x: 50, y: 2.8, z: 15.3, colore: AMBRA, intensita: 7, portata: 9 });
  kit.luce({ x: 53.35, y: 2.6, z: 8.4, colore: 0xffa860, intensita: 4, portata: 6 });
}

function trattoSepolto(curva) {
  const campioni = Array.from({ length: 401 }, (_, i) => curva.getPointAt(i / 400));
  const primo = campioni.findIndex(p => p.y <= LIMITE_TUBO);
  const ultimo = campioni.length - 1 - [...campioni].reverse().findIndex(p => p.y <= LIMITE_TUBO);
  const punti = campioni.slice(primo, ultimo + 1).filter((_, i, tutti) => i % 6 === 0 || i === tutti.length - 1);
  return new THREE.CatmullRomCurve3(punti);
}

function geometriaVentola() {
  const parti = [new THREE.CylinderGeometry(0.25, 0.25, 0.12, 16)];
  for (let i = 0; i < 6; i++) {
    const pala = new THREE.BoxGeometry(1.5, 0.025, 0.42);
    pala.rotateX(0.45);
    pala.translate(0.95, 0, 0);
    pala.rotateY((i / 6) * Math.PI * 2);
    parti.push(pala);
  }
  return unisci(parti);
}

function creaPresa(s, c, y, profondo, settore) {
  const { mat } = s;
  const yg = profondo > 0 ? y : y + 0.15;
  s.metti(mat.ottone, new THREE.TorusGeometry(R_PRESA + 0.1, 0.11, 8, 64).rotateX(Math.PI / 2).translate(c.x, yg, c.z), null, false, settore);
  s.metti(mat.ottone, new THREE.RingGeometry(R_PRESA + 0.15, R_PRESA + 0.45, 64, 1).rotateX(-Math.PI / 2).translate(c.x, y + 0.006, c.z), null, false, settore);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    s.chiodo('ottone', v3(c.x + Math.cos(a) * (R_PRESA + 0.32), y + 0.008, c.z + Math.sin(a) * (R_PRESA + 0.32)), ASSE_Y);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const p = v3(c.x + Math.cos(a) * R_PRESA * 0.55, yg - 0.03, c.z + Math.sin(a) * R_PRESA * 0.55);
    s.metti(mat.acciaio, new THREE.BoxGeometry(0.05, 0.06, R_PRESA * 0.9).applyMatrix4(posa(p.x, p.y, p.z, Math.PI / 2 - a)), null, false, settore);
  }
  for (const r of [0.45, 1.05, 1.6]) s.metti(mat.acciaio, new THREE.TorusGeometry(r, 0.03, 4, 48).rotateX(Math.PI / 2).translate(c.x, yg - 0.03, c.z), null, false, settore);
  s.metti(mat.ottone, new THREE.CylinderGeometry(0.22, 0.22, 0.08, 16).translate(c.x, yg - 0.03, c.z), null, false, settore);
  if (profondo > 0) {
    s.metti(mat.lamieraScura, rovescia(uvCilindro(new THREE.CylinderGeometry(R_PRESA, R_PRESA, profondo, 40, 1, true), Math.PI * 2 * R_PRESA, profondo).translate(c.x, y - profondo / 2, c.z)), null, false, settore);
    for (let k = 1; k < 4; k++) s.metti(mat.ottone, new THREE.TorusGeometry(R_PRESA - 0.03, 0.05, 6, 48).rotateX(Math.PI / 2).translate(c.x, y - k * 0.6, c.z), null, false, settore);
  }
  return { ventola: v3(c.x, profondo > 0 ? y - 0.55 : y + 0.08, c.z), vortice: v3(c.x, profondo > 0 ? y - 1.4 : y + 0.03, c.z) };
}

function costruisciCondotti(s, presaBeta) {
  const { mat, kit } = s;
  const curvaDi = percorso => new THREE.CatmullRomCurve3(percorso.map(([x, y, z]) => v3(x, y, z)));
  const curve = { beta: curvaDi(CONDOTTI.beta.percorso), delta: curvaDi(CONDOTTI.delta.percorso) };
  const tuboMat = materialeShader(kit, { uFlusso: { value: 0 } }, FRAMMENTO_TUBO, { trasparente: true, scriveProfondita: false, lato: THREE.DoubleSide });
  const tratti = Object.values(curve).map(trattoSepolto);
  const tubi = new THREE.Mesh(mergeGeometries(tratti.map(t => new THREE.TubeGeometry(t, 180, R_TUBO, 20, false))), tuboMat);
  tubi.renderOrder = 1;
  kit.scena.add(tubi);
  const posizioniAnelli = tratti.flatMap(t => {
    const n = Math.max(2, Math.floor(t.getLength() / PASSO_ANELLI_TUBO));
    return Array.from({ length: n }, (_, i) => {
      const u = (i + 0.5) / n;
      return { p: t.getPointAt(u), q: new THREE.Quaternion().setFromUnitVectors(ASSE_Z, t.getTangentAt(u)) };
    });
  });
  const anelli = new THREE.InstancedMesh(new THREE.TorusGeometry(R_TUBO + 0.05, 0.07, 6, 32), mat.ottone, posizioniAnelli.length);
  const luci = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.06, 0.2), mat.luceFredda, posizioniAnelli.length * 2);
  const m = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  posizioniAnelli.forEach(({ p, q }, i) => {
    anelli.setMatrixAt(i, m.compose(p, q, UNO));
    [-1, 1].forEach((k, j) => luci.setMatrixAt(i * 2 + j, m.compose(pos.set(0, k * (R_TUBO + 0.02), 0).applyQuaternion(q).add(p), q, UNO)));
  });
  kit.scena.add(anelli, luci);

  const presaDelta = v3((CONDOTTI.delta.da.x + CONDOTTI.beta.a.x) / 2, 0, (CONDOTTI.delta.da.z + CONDOTTI.beta.a.z) / 2);
  const prese = [creaPresa(s, presaBeta, 0, 2.6, SETTORE), creaPresa(s, presaDelta, quota(presaDelta.x, presaDelta.z), 0, SETTORE_DELTA)];
  const ventole = new THREE.InstancedMesh(geometriaVentola(), mat.ottone, prese.length);
  ventole.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  kit.scena.add(ventole);
  const vorticeMat = materialeShader(kit, { uForza: { value: 0 } }, FRAMMENTO_VORTICE);
  const vortici = new THREE.Mesh(unisci(prese.map(p => new THREE.CircleGeometry(R_PRESA - 0.02, 48).rotateX(-Math.PI / 2).translate(p.vortice.x, p.vortice.y, p.vortice.z))), vorticeMat);
  kit.scena.add(vortici);
  s.metti(mat.ottone, new THREE.TorusGeometry(1.7, 0.1, 8, 48).rotateX(Math.PI / 2).translate(presaBeta.x, 3.3, presaBeta.z));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.4;
    const p = v3(presaBeta.x + Math.cos(a) * 1.7, 3.3, presaBeta.z + Math.sin(a) * 1.7);
    s.metti(mat.acciaio, cilindroTra(p, p.clone().setY(TETTO), 0.03, 6));
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    s.metti(mat.luceFredda, new THREE.SphereGeometry(0.07, 10, 6).translate(presaBeta.x + Math.cos(a) * 1.7, 3.18, presaBeta.z + Math.sin(a) * 1.7));
  }
  s.cartello('propulsione', 1.5, suParete(PARETI.nord, presaBeta.x, 3.05, 0.01));
  kit.luce({ x: presaBeta.x, y: 1.2, z: presaBeta.z, colore: ORICALCO, intensita: 7, portata: 8, attiva: v => !!v.corrente });

  const semi = new Float32Array(BOLLE_TRANSITO * 4);
  for (let i = 0; i < BOLLE_TRANSITO; i++) {
    const a = s.caso() * Math.PI * 2;
    const r = Math.sqrt(s.caso());
    semi.set([Math.cos(a) * r, Math.sin(a) * r, s.caso(), s.caso()], i * 4);
  }
  const geoTransito = new THREE.BufferGeometry();
  geoTransito.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BOLLE_TRANSITO * 3), 3));
  geoTransito.setAttribute('seme', new THREE.BufferAttribute(semi, 4));
  const transitoMat = materialeShader(kit, { uScala: { value: SCALA_PUNTI }, uColore: { value: new THREE.Color(0xd8f6ff) } }, FRAMMENTO_BOLLE, { vertice: VERTICE_TRANSITO, testa: TESTA_PUNTI, trasparente: true, scriveProfondita: false });
  const bolleTransito = new THREE.Points(geoTransito, transitoMat);
  bolleTransito.frustumCulled = false;
  bolleTransito.visible = false;
  bolleTransito.renderOrder = 5;
  kit.scena.add(bolleTransito);
  const transito = { attivo: false, t: 0, curva: null };
  const avanti = new THREE.Vector3();
  kit.suInquadratura((v, camera, mioId, dt) => {
    const viaggio = v.abisso?.giocatori?.[mioId]?.condotto ?? null;
    if (!viaggio) {
      transito.attivo = false;
      bolleTransito.visible = false;
      return 0;
    }
    const curva = viaggio.verso === 'delta' ? curve.beta : curve.delta;
    if (!transito.attivo || transito.curva !== curva) Object.assign(transito, { attivo: true, curva, t: viaggio.t });
    transito.t = limita(Math.max(viaggio.t, Math.min(transito.t + dt / A.CONDOTTO_DURATA, viaggio.t + ANTICIPO_CONDOTTO)));
    curva.getPointAt(transito.t, camera.position);
    if (transito.t > 0.97) avanti.copy(camera.position).add(curva.getTangentAt(transito.t));
    else curva.getPointAt(Math.min(1, transito.t + 0.03), avanti);
    camera.lookAt(avanti);
    bolleTransito.visible = true;
    return 1;
  });
  kit.suNebbia(() => (transito.attivo ? NEBBIA_CONDOTTO : null));
  let giro = 0;
  let flusso = 0;
  const q = new THREE.Quaternion();
  return {
    aggiorna(v, dt) {
      flusso = tendi(flusso, v.corrente ? 1 : 0, 1, dt);
      giro += dt * (0.4 + flusso * 7);
      prese.forEach((p, i) => ventole.setMatrixAt(i, m.compose(p.ventola, q.setFromAxisAngle(ASSE_Y, giro * (i ? -1 : 1)), UNO)));
      ventole.instanceMatrix.needsUpdate = true;
      vorticeMat.uniforms.uForza.value = flusso;
      tuboMat.uniforms.uFlusso.value = Math.max(flusso, transito.attivo ? 1 : 0);
    },
    evento(e) {
      if (e.k !== 'condotto') return;
      const p = prese[e.verso === 'delta' ? 0 : 1];
      kit.effetti.brina(p.ventola.clone().setY(p.ventola.y + 0.6), ASSE_Y.clone());
    },
    svuota() {
      transito.attivo = false;
    },
  };
}

export function creaReattore(kit) {
  const s = creaStrumenti(kit);
  const presa = v3((CONDOTTI.beta.da.x + CONDOTTI.delta.a.x) / 2, 0, (CONDOTTI.beta.da.z + CONDOTTI.delta.a.z) / 2);
  costruisciPavimenti(s, presa);
  costruisciPozzo(s);
  costruisciPareti(s);
  costruisciSoffitto(s);
  costruisciCasse(s);
  costruisciServizio(s);
  const parti = [
    costruisciNucleo(s),
    costruisciBarre(s),
    costruisciTurbina(s),
    costruisciAcqua(s),
    costruisciPannello(s),
    costruisciFucina(s),
    costruisciScrigno(s),
    costruisciStagna(s),
    costruisciCondotti(s, presa),
  ];
  chiudiChiodi(s);
  kit.ogniFotogramma((v, dt, tempo, punto) => {
    if (!v.abisso) return;
    for (const p of parti) p.aggiorna(v, dt, tempo, punto);
  });
  kit.suEvento((e, v) => {
    for (const p of parti) p.evento?.(e, v);
  });
  kit.suSvuota(() => {
    for (const p of parti) p.svuota?.();
  });
}
