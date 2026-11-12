import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { statoArmi } from './statoArmi.js';

const PI = Math.PI;
const ATTRIBUTI = Object.freeze(['position', 'normal', 'uv']);
const ARCHI_OGNI_S = 0.06;
const ARCHI_CARICA_OGNI_S = 0.035;
const CENTRO_CAMERA = 0.245;
const OCCHIO_ARMA = new THREE.Vector3(-0.11, 0.095, 0.29);
const INCLINAZIONE_TRIDENTE = new THREE.Euler(0.62, -0.1, -0.15);
const ACCORCIA = 0.2;
const ARCO_MANOMETRO = (PI * 3) / 2;

export const RUMORE_GLSL = `
float casoAbisso(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}
float rumoreAbisso(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = mix(casoAbisso(i), casoAbisso(i + vec3(1.0, 0.0, 0.0)), f.x);
  float b = mix(casoAbisso(i + vec3(0.0, 1.0, 0.0)), casoAbisso(i + vec3(1.0, 1.0, 0.0)), f.x);
  float c = mix(casoAbisso(i + vec3(0.0, 0.0, 1.0)), casoAbisso(i + vec3(1.0, 0.0, 1.0)), f.x);
  float d = mix(casoAbisso(i + vec3(0.0, 1.0, 1.0)), casoAbisso(i + vec3(1.0, 1.0, 1.0)), f.x);
  return mix(mix(a, b, f.y), mix(c, d, f.y), f.z);
}
float fbmAbisso(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * rumoreAbisso(p);
    p = p * 2.03 + vec3(17.1, 9.2, 4.7);
    a *= 0.5;
  }
  return s;
}
`;

export const NEBBIA_GLSL = `
#ifdef USE_FOG
uniform vec3 fogColor;
#ifdef FOG_EXP2
uniform float fogDensity;
float fattoreNebbia(float d) { return 1.0 - exp(-fogDensity * fogDensity * d * d); }
#else
uniform float fogNear;
uniform float fogFar;
float fattoreNebbia(float d) { return smoothstep(fogNear, fogFar, d); }
#endif
#else
float fattoreNebbia(float d) { return 0.0; }
#endif
`;

const VERTICE_VORTICE = `
uniform float uTempo;
uniform float uOndula;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
${RUMORE_GLSL}
void main() {
  vLocale = position;
  vec3 u = normalize(position);
  vec3 p = position * (1.0 + (rumoreAbisso(u * 3.0 + vec3(0.0, uTempo * 0.9, 0.0)) - 0.5) * uOndula);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormaleVista = normalize(normalMatrix * normal);
  vVerso = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAMMENTO_VORTICE = `
uniform float uTempo;
uniform float uVelocita;
uniform float uIntensita;
uniform vec3 uProfondo;
uniform vec3 uColore;
uniform vec3 uSchiuma;
varying vec3 vLocale;
varying vec3 vNormaleVista;
varying vec3 vVerso;
${RUMORE_GLSL}
${NEBBIA_GLSL}
void main() {
  vec3 u = normalize(vLocale);
  float polo = abs(u.y);
  float giro = atan(u.z, u.x) + uTempo * uVelocita * (1.4 - polo) + (1.0 - polo) * 3.0;
  vec3 q = vec3(cos(giro) * 1.7, u.y * 2.6 - uTempo * 0.35, sin(giro) * 1.7);
  float n = fbmAbisso(q * 1.4 + uTempo * 0.15);
  float filamenti = pow(abs(sin(giro * 3.0 + u.y * 7.0 + n * 5.0)), 7.0);
  float occhio = smoothstep(0.55, 1.0, polo);
  float fresnel = pow(1.0 - abs(dot(normalize(vNormaleVista), normalize(vVerso))), 2.2);
  vec3 c = mix(uProfondo, uColore, smoothstep(0.25, 0.75, n));
  c *= 0.55 + filamenti * 1.3 + occhio * 0.8;
  c += uSchiuma * (filamenti * n * 1.2 + fresnel * 1.4 + occhio * n * n * 1.5);
  c *= uIntensita;
#ifdef USE_FOG
  c = mix(c, fogColor, fattoreNebbia(length(vVerso)));
#endif
  gl_FragColor = vec4(c, 1.0);
}
`;

const FRAMMENTO_MIMETICA = `
{
  vec3 pm = vPosMimetica * 22.0;
  float tm = uMimetica;
  float macro = fbmAbisso(pm * 0.35 + vec3(0.0, 0.0, tm * 0.12));
  float chiazze = smoothstep(0.42, 0.6, macro);
  float flusso = fbmAbisso(pm * 0.8 + vec3(tm * 0.5, -tm * 0.3, tm * 0.2));
  float fase = flusso * 2.5 + macro * 3.0 + (pm.x + pm.y + pm.z) * 0.08 - tm * 0.6;
  vec3 iride = mix(vec3(0.1, 0.85, 1.0), vec3(0.62, 0.18, 1.0), 0.5 + 0.5 * sin(fase * 3.14159));
  iride = mix(iride, vec3(0.95, 0.55, 1.0), pow(max(0.0, sin(fase * 6.2831 + 1.0)), 8.0) * 0.5);
  float righe = smoothstep(0.93, 1.0, 0.5 + 0.5 * sin(vPosMimetica.y * 420.0 + tm * 5.0));
  float passata = pow(1.0 - abs(fract(vPosMimetica.z * 1.6 + tm * 0.35) - 0.5) * 2.0, 24.0);
  float bordoMimetica = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);
  diffuseColor.rgb = mix(diffuseColor.rgb * 0.3, iride * 0.16, 0.5 + chiazze * 0.3);
  totalEmissiveRadiance += iride * (chiazze * 0.5 + 0.1 + righe * 0.45 + passata * 1.3 + bordoMimetica * 1.7);
}
`;

const VERTICE_ARCHI = `
attribute float aLato;
attribute float aForza;
varying float vLato;
varying float vForza;
void main() {
  vLato = aLato;
  vForza = aForza;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAMMENTO_ARCHI = `
uniform vec3 uColore;
varying float vLato;
varying float vForza;
void main() {
  float c = 1.0 - abs(vLato);
  vec3 luce = uColore * pow(c, 1.6) * 1.6 + vec3(1.0) * pow(c, 7.0) * 2.2;
  gl_FragColor = vec4(luce * vForza, 1.0);
}
`;

const uMimetica = { value: 0 };
let risorse = null;

const vettore = (x, y, z) => new THREE.Vector3(x, y, z);
const polare = (r, phi, a) => vettore(r * Math.cos(phi), r * Math.sin(phi), -a);
const fermo = (v, min, max) => Math.min(max, Math.max(min, v));

function tela(lato, pittore) {
  const c = document.createElement('canvas');
  c.width = c.height = lato;
  pittore(c.getContext('2d'), lato);
  return c;
}

function generatore(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function texturaGraffi() {
  const caso = generatore(91);
  const t = new THREE.CanvasTexture(tela(256, (ctx, l) => {
    ctx.fillStyle = 'rgb(205,205,205)';
    ctx.fillRect(0, 0, l, l);
    for (let i = 0; i < 900; i++) {
      const v = 140 + Math.floor(caso() * 115);
      ctx.strokeStyle = `rgba(${v},${v},${v},${0.15 + caso() * 0.35})`;
      ctx.lineWidth = 0.5 + caso() * 1.2;
      const x = caso() * l;
      const y = caso() * l;
      const a = caso() * PI;
      const lungo = 4 + caso() * 40;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * lungo, y + Math.sin(a) * lungo);
      ctx.stroke();
    }
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.08 + caso() * 0.15})`;
      ctx.beginPath();
      ctx.arc(caso() * l, caso() * l, 3 + caso() * 14, 0, PI * 2);
      ctx.fill();
    }
  }));
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function texturaMartellato() {
  const caso = generatore(17);
  const lato = 128;
  const altezze = new Float32Array(lato * lato);
  for (let k = 0; k < 260; k++) {
    const cx = caso() * lato;
    const cy = caso() * lato;
    const r = 3 + caso() * 8;
    for (let dy = -Math.ceil(r); dy <= Math.ceil(r); dy++) {
      for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
        const d2 = (dx * dx + dy * dy) / (r * r);
        if (d2 >= 1) continue;
        const x = (Math.floor(cx + dx) + lato) % lato;
        const y = (Math.floor(cy + dy) + lato) % lato;
        altezze[y * lato + x] -= (1 - d2) * (1 - d2);
      }
    }
  }
  const t = new THREE.CanvasTexture(tela(lato, ctx => {
    const img = ctx.createImageData(lato, lato);
    for (let y = 0; y < lato; y++) {
      for (let x = 0; x < lato; x++) {
        const i = y * lato + x;
        const dx = altezze[y * lato + ((x + 1) % lato)] - altezze[y * lato + ((x - 1 + lato) % lato)];
        const dy = altezze[((y + 1) % lato) * lato + x] - altezze[((y - 1 + lato) % lato) * lato + x];
        const n = vettore(-dx * 1.4, -dy * 1.4, 1).normalize();
        img.data[i * 4] = (n.x * 0.5 + 0.5) * 255;
        img.data[i * 4 + 1] = (n.y * 0.5 + 0.5) * 255;
        img.data[i * 4 + 2] = (n.z * 0.5 + 0.5) * 255;
        img.data[i * 4 + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }));
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function texturaAlone() {
  if (risorse?.alone) return risorse.alone;
  const t = new THREE.CanvasTexture(tela(64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  }));
  risorse = { ...(risorse ?? {}), alone: t };
  return t;
}

function prendiRisorse() {
  if (!risorse?.graffi) risorse = { ...(risorse ?? {}), graffi: texturaGraffi(), martellato: texturaMartellato(), alone: texturaAlone() };
  return risorse;
}

function scalaQuadrante(ctx, l, { inizio, arco, tacche, maggiori, colore, raggio, spessore, rossa = null, etichette = [] }) {
  const c = l / 2;
  if (rossa) {
    ctx.strokeStyle = rossa.colore;
    ctx.lineWidth = spessore * 2.4;
    ctx.beginPath();
    ctx.arc(c, c, raggio - spessore * 1.2, inizio + arco * rossa.da - PI / 2, inizio + arco * rossa.a - PI / 2);
    ctx.stroke();
  }
  ctx.strokeStyle = colore;
  for (let i = 0; i <= tacche; i++) {
    const a = inizio + (arco * i) / tacche - PI / 2;
    const lunga = i % maggiori === 0;
    ctx.lineWidth = lunga ? spessore : spessore * 0.5;
    const r0 = raggio - (lunga ? spessore * 5 : spessore * 2.6);
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
    ctx.lineTo(c + Math.cos(a) * raggio, c + Math.sin(a) * raggio);
    ctx.stroke();
  }
  ctx.fillStyle = colore;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  etichette.forEach((testo, i) => {
    const a = inizio + (arco * i) / Math.max(1, etichette.length - 1) - PI / 2;
    const r = raggio - spessore * 8.5;
    ctx.fillText(testo, c + Math.cos(a) * r, c + Math.sin(a) * r);
  });
}

function texturaQuadrante(pittore) {
  const t = new THREE.CanvasTexture(tela(256, pittore));
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function quadranteCannone() {
  return texturaQuadrante((ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 10, l / 2, l / 2, l / 2);
    g.addColorStop(0, '#efe4c8');
    g.addColorStop(1, '#b8a47a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
    ctx.font = 'bold 20px serif';
    scalaQuadrante(ctx, l, { inizio: -ARCO_MANOMETRO / 2, arco: ARCO_MANOMETRO, tacche: 40, maggiori: 8, colore: '#1d1810', raggio: l * 0.46, spessore: 3.2, rossa: { da: 0.78, a: 1, colore: '#b0221a' }, etichette: ['0', '2', '4', '6', '8', '10'] });
    ctx.font = 'bold 22px serif';
    ctx.fillStyle = '#1d1810';
    ctx.fillText('ATM', l / 2, l * 0.66);
    ctx.font = '13px serif';
    ctx.fillText('CONSORZIO TALASSA', l / 2, l * 0.76);
  });
}

function quadranteOssigeno() {
  return texturaQuadrante((ctx, l) => {
    ctx.fillStyle = '#e9e0c6';
    ctx.fillRect(0, 0, l, l);
    ctx.lineCap = 'butt';
    const c = l / 2;
    const fasce = [['#c0261c', 0, 0.22], ['#d8a21c', 0.22, 0.45], ['#2f8f4a', 0.45, 1]];
    for (const [colore, da, a] of fasce) {
      ctx.strokeStyle = colore;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(c, c, l * 0.4, -ARCO_MANOMETRO / 2 + ARCO_MANOMETRO * da - PI / 2, -ARCO_MANOMETRO / 2 + ARCO_MANOMETRO * a - PI / 2);
      ctx.stroke();
    }
    ctx.font = 'bold 19px sans-serif';
    scalaQuadrante(ctx, l, { inizio: -ARCO_MANOMETRO / 2, arco: ARCO_MANOMETRO, tacche: 20, maggiori: 5, colore: '#16130e', raggio: l * 0.47, spessore: 3, etichette: ['0', '25', '50', '75', '100'] });
    ctx.font = '13px sans-serif';
    scalaQuadrante(ctx, l, { inizio: -PI * 0.6, arco: PI * 1.2, tacche: 12, maggiori: 2, colore: '#3a3226', raggio: l * 0.22, spessore: 2, etichette: [] });
    ctx.font = 'bold 26px sans-serif';
    ctx.fillStyle = '#16130e';
    ctx.textAlign = 'center';
    ctx.fillText('O₂', c, l * 0.7);
    ctx.font = '12px sans-serif';
    ctx.fillText('ATM', c, l * 0.36);
  });
}

function quadranteOrologio() {
  return texturaQuadrante((ctx, l) => {
    ctx.fillStyle = '#101418';
    ctx.fillRect(0, 0, l, l);
    const c = l / 2;
    ctx.strokeStyle = '#c9e8d4';
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * PI * 2;
      const lunga = i % 5 === 0;
      ctx.lineWidth = lunga ? 6 : 2;
      const r0 = l * (lunga ? 0.36 : 0.42);
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
      ctx.lineTo(c + Math.cos(a) * l * 0.47, c + Math.sin(a) * l * 0.47);
      ctx.stroke();
    }
    ctx.fillStyle = '#c9f0d8';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('12', c, l * 0.2);
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('ABYSSUS-9', c, l * 0.68);
  });
}

function officina() {
  const secchi = new Map();
  const matrice = new THREE.Matrix4();
  const quaternione = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const posizione = new THREE.Vector3();
  const scala = new THREE.Vector3();
  const aggiungi = (materiale, geometria, m) => {
    const g = geometria.index ? geometria.toNonIndexed() : geometria.clone();
    for (const nome of Object.keys(g.attributes)) if (!ATTRIBUTI.includes(nome)) g.deleteAttribute(nome);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.attributes.normal) g.computeVertexNormals();
    g.applyMatrix4(m);
    if (!secchi.has(materiale)) secchi.set(materiale, []);
    secchi.get(materiale).push(g);
  };
  return {
    metti(materiale, geometria, [x, y, z] = [0, 0, 0], [rx, ry, rz] = [0, 0, 0], s = 1) {
      if (typeof s === 'number') scala.set(s, s, s);
      else scala.set(...s);
      aggiungi(materiale, geometria, matrice.compose(posizione.set(x, y, z), quaternione.setFromEuler(euler.set(rx, ry, rz)), scala));
    },
    tra(materiale, geometria, da, a, spessore = 1) {
      const verso = a.clone().sub(da);
      const lungo = verso.length();
      quaternione.setFromUnitVectors(vettore(0, 1, 0), verso.normalize());
      aggiungi(materiale, geometria, matrice.compose(da.clone().add(a).multiplyScalar(0.5), quaternione, scala.set(spessore, lungo, spessore)));
    },
    verso(materiale, geometria, punto, direzione, s = [1, 1, 1]) {
      quaternione.setFromUnitVectors(vettore(0, 1, 0), direzione.clone().normalize());
      aggiungi(materiale, geometria, matrice.compose(punto, quaternione, scala.set(...s)));
    },
    chiudi(gruppo) {
      for (const [materiale, lista] of secchi) {
        const g = mergeGeometries(lista, false);
        lista.forEach(x => x.dispose());
        g.computeBoundingSphere();
        gruppo.add(new THREE.Mesh(g, materiale));
      }
      secchi.clear();
    },
  };
}

const tornio = (profilo, segmenti = 56) => new THREE.LatheGeometry(profilo.map(([r, a]) => new THREE.Vector2(r, a)), segmenti).rotateX(-PI / 2);
const tornioY = (profilo, segmenti = 48) => new THREE.LatheGeometry(profilo.map(([r, y]) => new THREE.Vector2(r, y)), segmenti);
const CILINDRO = new THREE.CylinderGeometry(1, 1, 1, 14, 1);

function tuboVariabile(punti, raggio, segmenti = 28, radiali = 10) {
  const curva = new THREE.CatmullRomCurve3(punti);
  const g = new THREE.TubeGeometry(curva, segmenti, 1, radiali, false);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i <= segmenti; i++) {
    const centro = curva.getPointAt(i / segmenti);
    const r = raggio(i / segmenti);
    for (let j = 0; j <= radiali; j++) {
      const k = i * (radiali + 1) + j;
      v.fromBufferAttribute(p, k).sub(centro).multiplyScalar(r).add(centro);
      p.setXYZ(k, v.x, v.y, v.z);
    }
  }
  g.computeVertexNormals();
  return g;
}

function elica(raggio, a0, a1, giri, spessore, radiali = 6) {
  const punti = [];
  const passi = Math.ceil(Math.abs(giri) * 24);
  for (let i = 0; i <= passi; i++) {
    const f = i / passi;
    const angolo = f * giri * PI * 2;
    punti.push(vettore(Math.cos(angolo) * raggio, Math.sin(angolo) * raggio, -(a0 + (a1 - a0) * f)));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), passi * 2, spessore, radiali, false);
}

function materialeMetallo(colore, ruvidezza, { normale = 0.12, ripeti = 1.5 } = {}) {
  const r = prendiRisorse();
  const graffi = r.graffi.clone();
  graffi.repeat.set(ripeti, ripeti);
  graffi.needsUpdate = true;
  const martellato = r.martellato.clone();
  martellato.repeat.set(ripeti * 2, ripeti * 2);
  martellato.needsUpdate = true;
  return new THREE.MeshStandardMaterial({ color: colore, metalness: 1, roughness: ruvidezza, roughnessMap: graffi, normalMap: martellato, normalScale: new THREE.Vector2(normale, normale), envMapIntensity: 1 });
}

function materialeEnergia(colore, intensita = 2.4) {
  return new THREE.MeshStandardMaterial({ color: new THREE.Color(colore).multiplyScalar(0.12), emissive: colore, emissiveIntensity: intensita, roughness: 0.3, metalness: 0 });
}

function materialeVetro(colore = 0xcfefff) {
  return new THREE.MeshPhysicalMaterial({ color: colore, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 2.4, depthWrite: false, side: THREE.DoubleSide });
}

function materialeCristallo(colore, intensita = 1.6) {
  return new THREE.MeshPhysicalMaterial({ color: new THREE.Color(colore).lerp(new THREE.Color(0xffffff), 0.3), emissive: colore, emissiveIntensity: intensita, roughness: 0.05, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.02, transparent: true, opacity: 0.92, envMapIntensity: 2 });
}

function materialeCuoio(colore) {
  const martellato = prendiRisorse().martellato.clone();
  martellato.repeat.set(6, 6);
  martellato.needsUpdate = true;
  return new THREE.MeshStandardMaterial({ color: colore, roughness: 0.78, metalness: 0, normalMap: martellato, normalScale: new THREE.Vector2(0.8, 0.8) });
}

function bagliore(colore, scala, opacita) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone(), color: colore, transparent: true, opacity: opacita, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.setScalar(scala);
  return s;
}

export function creaMaterialeVortice({ colore = 0x2fb8ff, profondo = 0x02203a, schiuma = 0xd8fbff, intensita = 1.6, velocita = 2.2, ondula = 0.06 } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
      uTempo: { value: 0 },
      uVelocita: { value: velocita },
      uIntensita: { value: intensita },
      uOndula: { value: ondula },
      uProfondo: { value: new THREE.Color(profondo) },
      uColore: { value: new THREE.Color(colore) },
      uSchiuma: { value: new THREE.Color(schiuma) },
    }]),
    vertexShader: VERTICE_VORTICE,
    fragmentShader: FRAMMENTO_VORTICE,
    fog: true,
  });
}

function creaArchi(capienza, colore) {
  const posizioni = new Float32Array(capienza * 3);
  const lati = new Float32Array(capienza);
  const forze = new Float32Array(capienza);
  const geometria = new THREE.BufferGeometry();
  const attributo = (array, n) => new THREE.BufferAttribute(array, n).setUsage(THREE.DynamicDrawUsage);
  geometria.setAttribute('position', attributo(posizioni, 3));
  geometria.setAttribute('aLato', attributo(lati, 1));
  geometria.setAttribute('aForza', attributo(forze, 1));
  geometria.setDrawRange(0, 0);
  const materiale = new THREE.ShaderMaterial({
    uniforms: { uColore: { value: new THREE.Color(colore) } },
    vertexShader: VERTICE_ARCHI,
    fragmentShader: FRAMMENTO_ARCHI,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometria, materiale);
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  let n = 0;
  const d = new THREE.Vector3();
  const u = new THREE.Vector3();
  const w = new THREE.Vector3();
  const su = new THREE.Vector3(0, 1, 0);
  const lato = new THREE.Vector3(1, 0, 0);
  const vertice = (p, asse, s, l, forza) => {
    posizioni[n * 3] = p.x + asse.x * s;
    posizioni[n * 3 + 1] = p.y + asse.y * s;
    posizioni[n * 3 + 2] = p.z + asse.z * s;
    lati[n] = l;
    forze[n] = forza;
    n += 1;
  };
  return {
    mesh,
    materiale,
    inizia() {
      n = 0;
    },
    linea(punti, larghezza, forza = 1) {
      for (let i = 0; i < punti.length - 1; i++) {
        if (n + 12 > capienza) return;
        const a = punti[i];
        const b = punti[i + 1];
        d.subVectors(b, a).normalize();
        u.crossVectors(d, Math.abs(d.y) < 0.9 ? su : lato).normalize();
        w.crossVectors(d, u);
        const h = larghezza * 0.5;
        for (const asse of [u, w]) {
          vertice(a, asse, -h, -1, forza);
          vertice(a, asse, h, 1, forza);
          vertice(b, asse, h, 1, forza);
          vertice(a, asse, -h, -1, forza);
          vertice(b, asse, h, 1, forza);
          vertice(b, asse, -h, -1, forza);
        }
      }
    },
    chiudi() {
      geometria.setDrawRange(0, n);
      for (const nome of ['position', 'aLato', 'aForza']) geometria.attributes[nome].needsUpdate = true;
    },
  };
}

export function frastaglia(a, b, scarto, livelli = 3, caso = Math.random) {
  let punti = [a.clone(), b.clone()];
  const lungo = a.distanceTo(b);
  const d = b.clone().sub(a).normalize();
  const u = new THREE.Vector3().crossVectors(d, Math.abs(d.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
  const w = new THREE.Vector3().crossVectors(d, u);
  for (let livello = 0; livello < livelli; livello++) {
    const ampiezza = scarto * lungo * 0.5 ** livello;
    const nuovi = [punti[0]];
    for (let i = 0; i < punti.length - 1; i++) {
      const m = punti[i].clone().lerp(punti[i + 1], 0.4 + caso() * 0.2);
      m.addScaledVector(u, (caso() - 0.5) * 2 * ampiezza).addScaledVector(w, (caso() - 0.5) * 2 * ampiezza);
      nuovi.push(m, punti[i + 1]);
    }
    punti = nuovi;
  }
  return punti;
}

function tavolozzaCannone(potente) {
  return potente
    ? { ottone: 0xe2b23c, ruvido: 0.26, scuro: 0x2a1f3c, rame: 0xd0805a, cuoio: 0x2a1238, energia: 0xb35cff, profondo: 0x1a0640, acqua: 0x9a4dff, schiuma: 0xffd0ff, vetro: 0xf0dcff }
    : { ottone: 0xb98a3e, ruvido: 0.36, scuro: 0x3a3f45, rame: 0xb8673e, cuoio: 0x2b1b12, energia: 0x2fd0ff, profondo: 0x02203a, acqua: 0x2fb8ff, schiuma: 0xd8fbff, vetro: 0xcfefff };
}

function anelloGiroscopio(raggio, spessore, ottone, energia, tacche) {
  const gruppo = new THREE.Group();
  const o = officina();
  o.metti(ottone, new THREE.TorusGeometry(raggio, spessore, 10, 120), [0, 0, 0], [0, 0, 0], [1, 1, 1.25]);
  const tacca = new THREE.BoxGeometry(spessore * 0.7, spessore * 1.1, spessore * 3.2);
  for (let i = 0; i < tacche; i++) {
    const a = (i / tacche) * PI * 2;
    o.metti(ottone, tacca, [Math.cos(a) * (raggio + spessore * 0.85), Math.sin(a) * (raggio + spessore * 0.85), 0], [0, 0, a]);
  }
  const gemma = new THREE.SphereGeometry(spessore * 0.75, 10, 8);
  for (let i = 0; i < 6; i++) {
    const a = ((i + 0.5) / 6) * PI * 2;
    o.metti(energia, gemma, [Math.cos(a) * raggio, Math.sin(a) * raggio, spessore * 0.9]);
    o.metti(energia, gemma, [Math.cos(a) * raggio, Math.sin(a) * raggio, -spessore * 0.9]);
  }
  o.chiudi(gruppo);
  return gruppo;
}

function manometro(ottone, vetro, ago, potente) {
  const gruppo = new THREE.Group();
  const quadrante = new THREE.MeshStandardMaterial({ map: quadranteCannone(), roughness: 0.55, metalness: 0, emissive: potente ? 0x3a1850 : 0x2a2418, emissiveIntensity: 0.6, emissiveMap: null });
  const o = officina();
  o.metti(ottone, tornio([[0, -0.012], [0.017, -0.012], [0.02, -0.01], [0.021, -0.004], [0.0222, 0], [0.0218, 0.0022], [0.0196, 0.0026], [0.0188, 0.0006]], 40), [0, 0, 0], [0, PI, 0]);
  o.metti(quadrante, new THREE.CircleGeometry(0.0188, 40), [0, 0, 0.0007]);
  o.metti(vetro, new THREE.SphereGeometry(0.0192, 24, 8, 0, PI * 2, 0, PI * 0.3), [0, 0, -0.0062], [PI / 2, 0, 0], [1, 0.75, 1]);
  o.chiudi(gruppo);
  const lancetta = new THREE.Group();
  lancetta.position.z = 0.0018;
  const corpo = new THREE.Mesh(new THREE.BoxGeometry(0.0014, 0.0165, 0.0006).translate(0, 0.0062, 0), ago);
  const perno = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.001, 12).rotateX(PI / 2), ottone);
  lancetta.add(corpo, perno);
  gruppo.add(lancetta);
  return { gruppo, lancetta };
}

function cannone(gruppo, potente) {
  const t = tavolozzaCannone(potente);
  const ottone = materialeMetallo(t.ottone, t.ruvido);
  const scuro = materialeMetallo(t.scuro, 0.5, { normale: 0.05, ripeti: 2.5 });
  const rame = materialeMetallo(t.rame, 0.32, { normale: 0.05 });
  const cuoio = materialeCuoio(t.cuoio);
  const energia = materialeEnergia(t.energia, 2.6);
  const vetro = materialeVetro(t.vetro);
  const ago = new THREE.MeshStandardMaterial({ color: 0x8a120c, emissive: 0x400404, roughness: 0.4 });
  if (potente) vestiAbissale(scuro);
  const o = officina();

  o.metti(scuro, tornio([[0, -0.084], [0.009, -0.084], [0.014, -0.081], [0.017, -0.077], [0.0185, -0.072], [0.0215, -0.07], [0.022, -0.066], [0.021, -0.063]]));
  o.metti(scuro, tornio([[0.021, -0.063], [0.0245, -0.055], [0.031, -0.04], [0.0375, -0.022], [0.0415, -0.006], [0.0425, 0.006], [0.0425, 0.104]]));
  for (const a of [0.012, 0.06]) o.metti(ottone, new THREE.TorusGeometry(0.0432, 0.0024, 8, 56), [0, 0, -a]);
  for (const x of [0.0428, -0.0428]) {
    o.metti(energia, new THREE.BoxGeometry(0.0034, 0.0055, 0.04), [x, 0, -0.036]);
    o.metti(energia, new THREE.BoxGeometry(0.0034, 0.0055, 0.032), [x, 0, -0.083]);
  }
  o.metti(ottone, tornio([[0.0428, 0.104], [0.05, 0.107], [0.053, 0.113], [0.053, 0.127], [0.049, 0.131], [0.04, 0.14], [0.034, 0.152], [0.031, 0.168], [0.033, 0.172], [0.033, 0.18], [0.026, 0.187], [0.02, 0.192]]));
  o.metti(ottone, tornio([[0.02, 0.298], [0.026, 0.303], [0.033, 0.31], [0.033, 0.318], [0.031, 0.322], [0.034, 0.333], [0.046, 0.337], [0.048, 0.342], [0.046, 0.346], [0.0405, 0.348]]));
  o.metti(scuro, tornio([[0.0402, 0.348], [0.0402, 0.512]]));
  o.metti(cuoio, tornio([[0.0404, 0.395], [0.0426, 0.399], [0.0432, 0.408], [0.0426, 0.415], [0.0432, 0.423], [0.0426, 0.431], [0.0432, 0.439], [0.0426, 0.447], [0.0432, 0.455], [0.0426, 0.463], [0.0432, 0.468], [0.0404, 0.473]]));
  o.metti(rame, elica(0.0418, 0.352, 0.39, 5, 0.0026));
  o.metti(rame, elica(0.0418, 0.477, 0.509, 4, 0.0026));
  o.metti(ottone, tornio([[0.0402, 0.511], [0.047, 0.514], [0.0485, 0.52], [0.0485, 0.53], [0.044, 0.535], [0.032, 0.541], [0.0265, 0.548]]));
  o.metti(scuro, tornio([[0.0262, 0.547], [0.0262, 0.712]], 40));
  for (const a of [0.585, 0.62, 0.655]) o.metti(ottone, tornio([[0.0262, a - 0.0045], [0.037, a - 0.0035], [0.0405, a], [0.037, a + 0.0035], [0.0262, a + 0.0045]], 40));
  o.metti(ottone, tornio([[0.0262, 0.698], [0.03, 0.708], [0.0325, 0.728], [0.0365, 0.75], [0.043, 0.77], [0.051, 0.786], [0.0565, 0.797], [0.0572, 0.802], [0.0545, 0.806], [0.049, 0.805], [0.043, 0.798], [0.037, 0.787], [0.032, 0.772], [0.028, 0.758]], 56));
  o.metti(scuro, new THREE.CircleGeometry(0.03, 32), [0, 0, -0.757], [0, PI, 0]);
  o.metti(energia, new THREE.TorusGeometry(0.031, 0.0026, 8, 48), [0, 0, -0.775]);
  o.metti(energia, new THREE.CircleGeometry(0.018, 24), [0, 0, -0.7585], [0, PI, 0]);
  for (let i = 0; i < 6; i++) {
    const phi = (i / 6) * PI * 2;
    o.metti(ottone, new THREE.BoxGeometry(0.0022, 0.012, 0.03), [Math.cos(phi) * 0.036, Math.sin(phi) * 0.036, -0.775], [0, 0, phi - PI / 2]);
  }

  const rivetto = new THREE.SphereGeometry(0.0033, 8, 6);
  for (const [r, a, n] of [[0.022, -0.068, 8], [0.053, 0.12, 18], [0.0472, 0.3395, 16], [0.0485, 0.525, 16], [0.057, 0.7995, 14]]) {
    for (let i = 0; i < n; i++) {
      const phi = (i / n) * PI * 2 + 0.1;
      const p = polare(r, phi, a);
      o.metti(ottone, rivetto, [p.x, p.y, p.z]);
    }
  }

  for (const phi of [PI / 4, (3 * PI) / 4, (5 * PI) / 4, (7 * PI) / 4]) {
    const punti = [polare(0.033, phi, 0.17), polare(0.062, phi, 0.188), polare(0.087, phi, CENTRO_CAMERA), polare(0.062, phi, 0.302), polare(0.033, phi, 0.32)];
    o.metti(ottone, tuboVariabile(punti, f => 0.0046 - Math.sin(f * PI) * 0.0012, 32, 8));
    const mezzo = polare(0.0905, phi, CENTRO_CAMERA);
    o.metti(energia, new THREE.SphereGeometry(0.0035, 10, 8), [mezzo.x, mezzo.y, mezzo.z]);
  }
  for (const s of [1, -1]) {
    o.metti(ottone, new THREE.CylinderGeometry(0.0032, 0.0032, 0.022, 10), [0, s * 0.067, -CENTRO_CAMERA]);
    o.metti(ottone, new THREE.SphereGeometry(0.0048, 12, 8), [0, s * 0.0565, -CENTRO_CAMERA]);
  }

  for (const phi of [PI * 0.9, PI * 0.1, PI * 1.5]) {
    const sotto = phi > PI;
    const punti = sotto
      ? [polare(0.043, phi, 0.06), polare(0.07, phi, 0.13), polare(0.1, phi, CENTRO_CAMERA), polare(0.07, phi, 0.35), polare(0.041, phi, 0.385)]
      : [polare(0.044, phi, 0.035), polare(0.068, phi, 0.115), polare(0.099, phi, 0.205), polare(0.099, phi, 0.285), polare(0.068, phi, 0.345), polare(0.041, phi, 0.378)];
    const curva = new THREE.CatmullRomCurve3(punti);
    o.metti(rame, new THREE.TubeGeometry(curva, 40, 0.0055, 8, false));
    for (const f of [0.02, 0.98]) {
      const p = curva.getPointAt(f);
      const d = curva.getTangentAt(f);
      o.tra(ottone, CILINDRO, p.clone().addScaledVector(d, -0.008), p.clone().addScaledVector(d, 0.008), 0.0085);
    }
    for (const f of [0.35, 0.65]) {
      const p = curva.getPointAt(f);
      const d = curva.getTangentAt(f);
      o.tra(ottone, CILINDRO, p.clone().addScaledVector(d, -0.003), p.clone().addScaledVector(d, 0.003), 0.0072);
    }
  }

  o.metti(cuoio, new THREE.CapsuleGeometry(0.0165, 0.07, 6, 16), [0, -0.078, 0.038], [-0.3, 0, 0], [0.82, 1, 1.22]);
  o.metti(ottone, new THREE.SphereGeometry(0.0172, 18, 10), [0, -0.122, 0.052], [-0.3, 0, 0], [0.85, 0.42, 1.25]);
  o.metti(ottone, new THREE.BoxGeometry(0.0045, 0.075, 0.006), [0, -0.075, 0.059], [-0.3, 0, 0]);
  o.metti(ottone, new THREE.TorusGeometry(0.0165, 0.0026, 6, 24, PI), [0, -0.043, -0.008], [PI, PI / 2, 0]);
  o.metti(scuro, new THREE.BoxGeometry(0.0034, 0.017, 0.004), [0, -0.05, -0.006], [0.3, 0, 0]);

  o.metti(ottone, new THREE.BoxGeometry(0.0045, 0.02, 0.007), [0, 0.051, 0.0]);
  o.metti(ottone, new THREE.TorusGeometry(0.0095, 0.0022, 8, 32), [0, 0.0685, 0.0]);
  o.metti(ottone, new THREE.BoxGeometry(0.0026, 0.024, 0.009), [0, 0.056, -0.527]);
  o.metti(energia, new THREE.SphereGeometry(0.0023, 8, 6), [0, 0.0685, -0.525]);

  const serbatoio = [0.05, -0.018];
  o.metti(rame, new THREE.CylinderGeometry(0.0145, 0.0145, 0.09, 28), [serbatoio[0], serbatoio[1], -0.045], [PI / 2, 0, 0]);
  for (const z of [0.0, -0.09]) o.metti(ottone, new THREE.SphereGeometry(0.0145, 24, 10), [serbatoio[0], serbatoio[1], z], [0, 0, 0], [1, 1, 0.45]);
  for (const z of [-0.018, -0.072]) {
    o.metti(ottone, new THREE.TorusGeometry(0.0162, 0.0019, 6, 32), [serbatoio[0], serbatoio[1], z]);
    o.metti(ottone, new THREE.BoxGeometry(0.012, 0.006, 0.008), [0.04, -0.006, z]);
  }
  o.metti(ottone, new THREE.CylinderGeometry(0.003, 0.003, 0.016, 10), [serbatoio[0] + 0.006, serbatoio[1] + 0.02, -0.08]);
  o.metti(ottone, new THREE.TorusGeometry(0.0075, 0.0015, 6, 20), [serbatoio[0] + 0.006, serbatoio[1] + 0.028, -0.08], [PI / 2, 0, 0]);
  for (let i = 0; i < 4; i++) o.metti(ottone, new THREE.BoxGeometry(0.014, 0.0012, 0.0012), [serbatoio[0] + 0.006, serbatoio[1] + 0.028, -0.08], [0, (i * PI) / 4, 0]);

  o.metti(ottone, new THREE.CylinderGeometry(0.0025, 0.0035, 0.008, 10), [0, 0, 0.087], [PI / 2, 0, 0]);
  o.metti(vetro, new THREE.SphereGeometry(0.056, 48, 32), [0, 0, -CENTRO_CAMERA]);
  o.chiudi(gruppo);

  const vortice = creaMaterialeVortice({ colore: t.acqua, profondo: t.profondo, schiuma: t.schiuma, intensita: 1.5, velocita: 2.6, ondula: 0.05 });
  const sfera = new THREE.Mesh(new THREE.SphereGeometry(0.045, 48, 32), vortice);
  sfera.position.z = -CENTRO_CAMERA;
  sfera.rotation.x = PI / 2;
  const alone = bagliore(t.acqua, 0.2, 0.3);
  alone.position.z = -CENTRO_CAMERA;
  const boccaLuce = bagliore(t.energia, 0.07, 0.4);
  boccaLuce.position.z = -0.77;
  gruppo.add(sfera, alone, boccaLuce);

  const g1 = new THREE.Group();
  const g2 = new THREE.Group();
  const g3 = new THREE.Group();
  g1.position.z = -CENTRO_CAMERA;
  const a1 = anelloGiroscopio(0.0765, 0.0034, ottone, energia, 36);
  const a2 = anelloGiroscopio(0.0695, 0.0032, ottone, energia, 32);
  const a3 = anelloGiroscopio(0.0625, 0.003, ottone, energia, 28);
  a2.rotation.x = PI / 2;
  a3.rotation.y = PI / 2;
  const perni = officina();
  for (const s of [1, -1]) {
    perni.metti(ottone, new THREE.CylinderGeometry(0.0022, 0.0022, 0.009, 8), [s * 0.0731, 0, 0], [0, 0, PI / 2]);
  }
  const perniInterni = officina();
  for (const s of [1, -1]) perniInterni.metti(ottone, new THREE.CylinderGeometry(0.002, 0.002, 0.009, 8), [0, 0, s * 0.0662], [PI / 2, 0, 0]);
  perni.chiudi(g1);
  perniInterni.chiudi(g2);
  g1.add(a1, g2);
  g2.add(a2, g3);
  g3.add(a3);
  gruppo.add(g1);

  const strumento = manometro(ottone, vetro, ago, potente);
  const base = polare(0.042, PI * 0.63, 0.07);
  const fuori = polare(1, PI * 0.63, 0).normalize();
  const centro = base.clone().addScaledVector(fuori, 0.02);
  strumento.gruppo.position.copy(centro);
  strumento.gruppo.quaternion.setFromUnitVectors(vettore(0, 0, 1), OCCHIO_ARMA.clone().sub(centro).normalize());
  const stelo = officina();
  stelo.tra(ottone, CILINDRO, base.clone().addScaledVector(fuori, -0.004), centro, 0.006);
  stelo.verso(ottone, new THREE.TorusGeometry(0.008, 0.002, 6, 20).rotateX(PI / 2), base, fuori);
  stelo.chiudi(gruppo);
  gruppo.add(strumento.gruppo);

  gruppo.userData.anima = tempo => {
    vortice.uniforms.uTempo.value = tempo;
    g1.rotation.y = tempo * 1.1;
    g2.rotation.x = tempo * 1.7;
    g3.rotation.z = tempo * 2.6;
    strumento.lancetta.rotation.z = -(-0.25 + Math.sin(tempo * 0.8) * 0.18 + Math.sin(tempo * 17) * 0.015) * ARCO_MANOMETRO;
    energia.emissiveIntensity = 2.3 + Math.sin(tempo * 3.2) * 0.6;
    alone.material.opacity = 0.26 + Math.sin(tempo * 3.2) * 0.07;
  };
  gruppo.userData.anima(0);
  return { bocca: vettore(0, 0, -0.8), presa: vettore(0, -0.02, -0.432), lunghezza: 0.98 };
}

function tavolozzaTridente(potente) {
  return potente
    ? { oro: 0xf0be52, ruvido: 0.22, energia: 0xc066ff, cristallo: 0x8a2cff, cuoio: 0x26103a, arco: 0xd890ff }
    : { oro: 0xd9a441, ruvido: 0.3, energia: 0x4fdcff, cristallo: 0x1a7cff, cuoio: 0x162230, arco: 0x7fe8ff };
}

function lancia(o, materiale, punto, direzione, larghezza, spessore, lungo) {
  o.verso(materiale, new THREE.OctahedronGeometry(1, 0), punto.clone().addScaledVector(direzione, lungo * 0.5), direzione, [larghezza, lungo * 0.5, spessore]);
}

function ardiglione(o, materiale, punto, direzione) {
  o.verso(materiale, new THREE.ConeGeometry(0.0042, 0.03, 6).translate(0, 0.015, 0), punto, direzione);
}

function tridente(corpo, potente) {
  const t = tavolozzaTridente(potente);
  const oro = materialeMetallo(t.oro, t.ruvido, { normale: 0.1, ripeti: 2 });
  const asta = materialeMetallo(t.oro, t.ruvido + 0.05, { normale: 0.06, ripeti: 3 });
  const punte = materialeMetallo(t.oro, 0.2, { normale: 0.04 });
  punte.emissive = new THREE.Color(t.energia);
  punte.emissiveIntensity = 0.15;
  const energia = materialeEnergia(t.energia, 2.2);
  const cristallo = materialeCristallo(t.cristallo, 1.8);
  const cuoio = materialeCuoio(t.cuoio);
  if (potente) vestiAbissale(asta);
  const o = officina();
  const ot = officina();

  o.metti(oro, tornio([[0, -0.232], [0.006, -0.23], [0.011, -0.224], [0.0155, -0.215], [0.0165, -0.205], [0.0135, -0.196], [0.0105, -0.19], [0.016, -0.182], [0.0195, -0.172], [0.0165, -0.162], [0.012, -0.156], [0.0135, -0.148], [0.0135, -0.14]], 40));
  o.metti(cristallo, new THREE.OctahedronGeometry(1, 0), [0, 0, 0.245], [0, 0, PI / 4], [0.009, 0.009, 0.022]);
  o.metti(asta, tornio([[0.0135, -0.14], [0.0135, -0.104]], 32));
  o.metti(oro, new THREE.TorusGeometry(0.0142, 0.0022, 6, 32), [0, 0, 0.12]);
  for (const a of [-0.1, 0.1]) o.metti(oro, tornio([[0.0135, a - 0.008], [0.019, a - 0.005], [0.0205, a], [0.019, a + 0.005], [0.0135, a + 0.008]], 32));
  o.metti(cuoio, tornio([[0.0164, -0.094], [0.0164, 0.094]], 32));
  o.metti(cuoio, elica(0.0168, -0.092, 0.092, 9, 0.0019, 5));
  o.metti(asta, tornio([[0.0135, 0.104], [0.0135, 0.862 - ACCORCIA]], 32));
  for (const a of [0.25, 0.4, 0.55]) {
    o.metti(oro, tornio([[0.0135, a - 0.014], [0.0165, a - 0.008], [0.0188, a - 0.003], [0.019, a], [0.0188, a + 0.003], [0.0165, a + 0.008], [0.0135, a + 0.014]], 32));
    for (let i = 0; i < 4; i++) {
      const phi = (i / 4) * PI * 2 + a * 10;
      o.metti(cristallo, new THREE.OctahedronGeometry(1, 0), [Math.cos(phi) * 0.019, Math.sin(phi) * 0.019, -a], [0, 0, phi], [0.0035, 0.0035, 0.006]);
    }
  }
  o.metti(energia, elica(0.0141, 0.12, 0.84 - ACCORCIA, 5, 0.0015, 5));
  o.metti(energia, elica(0.0141, 0.12, 0.84 - ACCORCIA, -5, 0.0015, 5));
  ot.metti(oro, tornio([[0.0135, 0.858], [0.017, 0.865], [0.024, 0.874], [0.0285, 0.887], [0.0275, 0.9], [0.021, 0.91], [0.0175, 0.918], [0.026, 0.926], [0.0305, 0.932], [0.0285, 0.939], [0.02, 0.945], [0.0165, 0.952], [0.014, 0.962]], 48));
  for (let i = 0; i < 4; i++) {
    const phi = (i / 4) * PI * 2 + PI / 4;
    ot.metti(cristallo, new THREE.OctahedronGeometry(1, 0), [Math.cos(phi) * 0.027, Math.sin(phi) * 0.027, -0.888], [0, 0, phi], [0.006, 0.006, 0.012]);
  }
  for (let i = 0; i < 8; i++) {
    const phi = (i / 8) * PI * 2;
    ot.metti(oro, new THREE.SphereGeometry(1, 10, 6), [Math.cos(phi) * 0.0195, Math.sin(phi) * 0.0195, -0.872], [0, 0, phi], [0.0035, 0.0072, 0.016]);
  }

  const mezzaluna = new THREE.Shape();
  const passi = 24;
  for (let i = 0; i <= passi; i++) {
    const f = i / passi;
    const x = -0.095 + 0.19 * f;
    const y = -0.012 + 0.062 * (2 * f - 1) ** 2;
    if (i === 0) mezzaluna.moveTo(x, y);
    else mezzaluna.lineTo(x, y);
  }
  for (let i = 0; i <= passi; i++) {
    const f = i / passi;
    const x = 0.079 - 0.158 * f;
    const y = 0.016 + 0.036 * (x / 0.079) ** 2;
    mezzaluna.lineTo(x, y);
  }
  const traversa = new THREE.ExtrudeGeometry(mezzaluna, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.0025, bevelSegments: 2, curveSegments: 4 });
  traversa.translate(0, 0, -0.006).rotateX(-PI / 2);
  ot.metti(oro, traversa, [0, 0, -0.952]);
  ot.metti(energia, new THREE.TorusGeometry(0.004, 0.0012, 6, 16), [0, 0.0095, -0.975], [PI / 2, 0, 0]);
  for (const s of [-1, 1]) {
    ot.metti(cristallo, new THREE.OctahedronGeometry(1, 0), [s * 0.05, 0.009, -0.982], [PI / 2, 0, 0], [0.0045, 0.0045, 0.002]);
    ot.metti(energia, new THREE.SphereGeometry(0.0022, 8, 6), [s * 0.072, 0.0095, -0.996]);
  }
  ot.metti(cristallo, new THREE.OctahedronGeometry(1, 0), [0, 0, -0.99], [0, 0, PI / 4], [0.0145, 0.0145, 0.032]);

  const centrale = [vettore(0, 0, -0.97), vettore(0, 0, -1.08), vettore(0, 0, -1.2), vettore(0, 0, -1.29)];
  ot.metti(oro, tuboVariabile(centrale, f => 0.0088 - f * 0.0042, 32, 10));
  const punteTri = [];
  lancia(ot, punte, vettore(0, 0, -1.285), vettore(0, 0, -1), 0.017, 0.0055, 0.085);
  punteTri.push(vettore(0, 0, -1.37));
  for (const s of [-1, 1]) {
    ardiglione(ot, punte, vettore(s * 0.006, 0, -1.3), vettore(s * 0.55, 0, 0.83));
    const laterale = [vettore(s * 0.085, 0, -0.996), vettore(s * 0.097, 0, -1.05), vettore(s * 0.094, 0, -1.13), vettore(s * 0.076, 0, -1.21)];
    ot.metti(oro, tuboVariabile(laterale, f => 0.0078 - f * 0.0036, 32, 10));
    const curva = new THREE.CatmullRomCurve3(laterale);
    const fine = curva.getPointAt(1);
    const verso = curva.getTangentAt(1);
    lancia(ot, punte, fine, verso, 0.014, 0.005, 0.066);
    punteTri.push(fine.clone().addScaledVector(verso, 0.066));
    ardiglione(ot, punte, fine.clone().addScaledVector(verso, 0.012).add(vettore(s * 0.005, 0, 0)), vettore(s * 0.6, 0, 0.8));
    ardiglione(ot, punte, fine.clone().addScaledVector(verso, 0.012).add(vettore(-s * 0.005, 0, 0)), vettore(-s * 0.45, 0, 0.89));
    ot.metti(oro, tornio([[0.0082, 0], [0.0108, 0.004], [0.0108, 0.01], [0.0082, 0.014]], 20), [s * 0.086, 0, -0.995], [0, 0, 0]);
  }
  ot.metti(oro, tornio([[0.0092, 0.0], [0.0122, 0.004], [0.0122, 0.011], [0.0092, 0.016]], 24), [0, 0, -1.0]);
  o.chiudi(corpo);
  const testa = new THREE.Group();
  testa.position.z = ACCORCIA;
  ot.chiudi(testa);
  corpo.add(testa);

  const archi = creaArchi(4200, t.arco);
  testa.add(archi.mesh);
  const aloni = punteTri.map(p => {
    const s = bagliore(t.energia, 0.05, 0.4);
    s.position.copy(p);
    testa.add(s);
    return s;
  });
  const aloneCuore = bagliore(t.energia, 0.12, 0.45);
  aloneCuore.position.set(0, 0, -0.99);
  testa.add(aloneCuore);
  const cuore = vettore(0, 0, -0.99);
  const puntoAsta = (a, phi) => vettore(Math.cos(phi) * 0.02, Math.sin(phi) * 0.02, -a - ACCORCIA);
  let prossimo = 0;
  let ultimo = 0;
  const rigenera = carica => {
    archi.inizia();
    const ampio = 0.18 + carica * 0.12;
    const forte = 0.7 + carica * 0.8;
    const [c, sx, dx] = punteTri;
    if (Math.random() < 0.85) archi.linea(frastaglia(c, sx, ampio, 3), 0.0045 + carica * 0.003, forte * (0.6 + Math.random() * 0.4));
    if (Math.random() < 0.85) archi.linea(frastaglia(c, dx, ampio, 3), 0.0045 + carica * 0.003, forte * (0.6 + Math.random() * 0.4));
    const base = punteTri[Math.floor(Math.random() * 3)].clone().lerp(cuore, 0.35 + Math.random() * 0.4);
    archi.linea(frastaglia(cuore, base, 0.25, 3), 0.0035, forte * 0.8);
    const giro = Math.random() * PI * 2;
    const a0 = 0.2 + Math.random() * 0.4;
    archi.linea(frastaglia(puntoAsta(a0, giro), puntoAsta(a0 + 0.06 + Math.random() * 0.1, giro + 1.5), 0.3, 2), 0.004, 0.7 + carica * 0.6);
    const giro2 = Math.random() * PI * 2;
    const a2 = 0.15 + Math.random() * 0.4;
    archi.linea(frastaglia(puntoAsta(a2, giro2), puntoAsta(a2 + 0.08 + Math.random() * 0.08, giro2 - 1.8), 0.3, 2), 0.004, 0.7 + carica * 0.6);
    const anello = [0, 1, 2, 3, 4, 5, 6].map(i => vettore(Math.cos(giro + i * 0.9) * 0.034, Math.sin(giro + i * 0.9) * 0.034, -0.9 - i * 0.006));
    if (Math.random() < 0.6) archi.linea(anello.map(p => p.add(vettore((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, 0))), 0.004, 0.8 + carica * 0.5);
    const extra = Math.round(carica * 7);
    for (let i = 0; i < extra; i++) {
      const da = punteTri[i % 3];
      const avanti = da.clone().add(vettore((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, -0.04 - Math.random() * 0.14 * carica));
      const ramo = frastaglia(da, avanti, 0.3, 3);
      archi.linea(ramo, 0.004 + carica * 0.003, forte);
      if (Math.random() < 0.5) archi.linea(frastaglia(ramo[4], ramo[4].clone().add(vettore((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, -0.03)), 0.3, 2), 0.0025, forte * 0.7);
    }
    if (carica > 0.6) {
      for (let i = 0; i < 3; i++) {
        const a = 0.15 + Math.random() * 0.45;
        archi.linea(frastaglia(puntoAsta(a, Math.random() * PI * 2), puntoAsta(a + 0.12, Math.random() * PI * 2), 0.35, 2), 0.003, carica);
      }
      archi.linea(frastaglia(sx, dx, 0.22, 3), 0.005, forte);
    }
    archi.chiudi();
  };
  rigenera(0);

  const caldo = new THREE.Color(0xffffff);
  const freddo = new THREE.Color(t.energia);
  corpo.userData.anima = tempo => {
    const carica = fermo(statoArmi.carica ?? 0, 0, 1);
    const dt = Math.max(0, Math.min(0.1, tempo - ultimo));
    ultimo = tempo;
    prossimo -= dt;
    if (prossimo <= 0) {
      prossimo = carica > 0.05 ? ARCHI_CARICA_OGNI_S : ARCHI_OGNI_S;
      rigenera(carica);
    }
    const pulsa = 0.5 + 0.5 * Math.sin(tempo * (4 + carica * 14));
    punte.emissive.copy(freddo).lerp(caldo, carica * 0.8);
    punte.emissiveIntensity = 0.15 + carica * carica * 4.5 + pulsa * carica * 0.8;
    energia.emissiveIntensity = 2 + pulsa * 0.6 + carica * 1.6;
    cristallo.emissiveIntensity = 1.5 + pulsa * 0.4 + carica * 2.2;
    archi.materiale.uniforms.uColore.value.copy(freddo).lerp(caldo, carica * 0.35);
    aloni.forEach((s, i) => {
      s.scale.setScalar(0.05 + carica * 0.11 + Math.sin(tempo * 9 + i * 2) * 0.008);
      s.material.opacity = 0.3 + carica * 0.6;
    });
    aloneCuore.scale.setScalar(0.1 + carica * 0.08 + pulsa * 0.02);
    aloneCuore.material.opacity = 0.35 + carica * 0.4;
  };
  return { bocca: vettore(0, 0, -1.37 + ACCORCIA), presa: null, lunghezza: 1.6 - ACCORCIA };
}

export function creaMeraviglia(tipo, dati) {
  const potente = !!dati.potenziata;
  if (tipo === 'tridente') {
    const corpo = new THREE.Group();
    const { bocca, lunghezza } = tridente(corpo, potente);
    corpo.rotation.copy(INCLINAZIONE_TRIDENTE);
    const gruppo = new THREE.Group();
    gruppo.add(corpo);
    gruppo.userData.anima = corpo.userData.anima;
    return { gruppo, bocca: bocca.applyEuler(INCLINAZIONE_TRIDENTE), presa: null, lunghezza, colore: dati.colore ?? null };
  }
  const gruppo = new THREE.Group();
  const { bocca, presa, lunghezza } = cannone(gruppo, potente);
  return { gruppo, bocca, presa, lunghezza, colore: dati.colore ?? null };
}

export function aggiornaMimetica(tempo) {
  uMimetica.value = tempo;
}

export function vestiAbissale(materiale) {
  const prima = materiale.onBeforeCompile;
  const chiavePrima = materiale.customProgramCacheKey?.bind(materiale);
  materiale.onBeforeCompile = (shader, renderer) => {
    prima?.call(materiale, shader, renderer);
    shader.uniforms.uMimetica = uMimetica;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosMimetica;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosMimetica = position * length(modelMatrix[0].xyz);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform float uMimetica;\nvarying vec3 vPosMimetica;\n${RUMORE_GLSL}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${FRAMMENTO_MIMETICA}`);
  };
  materiale.customProgramCacheKey = () => `mimeticaAbisso|${chiavePrima ? chiavePrima() : ''}`;
  materiale.needsUpdate = true;
  return materiale;
}

function strumentoPolso(materiale, raggio, ottone, vetro) {
  const gruppo = new THREE.Group();
  const o = officina();
  o.metti(ottone, tornioY([[0, 0], [raggio, 0], [raggio + 0.0025, 0.003], [raggio + 0.003, 0.0085], [raggio + 0.0018, 0.0108], [raggio - 0.0004, 0.0112], [raggio - 0.0008, 0.0092]], 48));
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * PI * 2;
    o.metti(ottone, new THREE.BoxGeometry(0.0012, 0.0018, 0.0022), [Math.cos(a) * (raggio + 0.0026), 0.0098, Math.sin(a) * (raggio + 0.0026)], [0, -a, 0]);
  }
  o.metti(materiale, new THREE.CircleGeometry(raggio - 0.0008, 48), [0, 0.0092, 0], [-PI / 2, 0, 0]);
  o.metti(vetro, new THREE.SphereGeometry(raggio, 28, 8, 0, PI * 2, 0, PI * 0.32), [0, 0.0105 - raggio * 0.4, 0], [0, 0, 0], [1, 0.75, 1]);
  o.chiudi(gruppo);
  return gruppo;
}

function lancettaPolso(lungo, largo, materiale, y) {
  const perno = new THREE.Group();
  perno.position.y = y;
  const corpo = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.0005, lungo).translate(0, 0, -lungo * 0.38), materiale);
  perno.add(corpo);
  return perno;
}

export function creaPolso() {
  const gruppo = new THREE.Group();
  const ottone = materialeMetallo(0xb98a3e, 0.34, { normale: 0.06 });
  const acciaio = materialeMetallo(0x4a5056, 0.4, { normale: 0.05 });
  const cuoio = materialeCuoio(0x231710);
  const vetro = materialeVetro();
  const gomma = new THREE.MeshStandardMaterial({ color: 0x15171a, roughness: 0.7 });
  const quadranteO2 = new THREE.MeshStandardMaterial({ map: quadranteOssigeno(), roughness: 0.6, emissive: 0x9affc0, emissiveIntensity: 0.12 });
  const quadranteOra = new THREE.MeshStandardMaterial({ map: quadranteOrologio(), roughness: 0.5, emissive: 0xffffff, emissiveMap: null, emissiveIntensity: 0.05 });
  const rosso = new THREE.MeshStandardMaterial({ color: 0xa8160e, emissive: 0x6a0802, emissiveIntensity: 0.6, roughness: 0.35 });
  const luminoso = new THREE.MeshStandardMaterial({ color: 0xd8f8e0, emissive: 0x9affc0, emissiveIntensity: 1.4, roughness: 0.4 });
  const spiaMat = new THREE.MeshStandardMaterial({ color: 0x400404, emissive: 0xff2a1a, emissiveIntensity: 0.2, roughness: 0.2 });
  const o = officina();
  o.metti(cuoio, tornio([[0.0352, -0.017], [0.0392, -0.017], [0.0404, -0.0145], [0.0404, 0.0145], [0.0392, 0.017], [0.0352, 0.017], [0.0352, -0.017]], 48));
  for (const a of [-0.0135, 0.0135]) o.metti(ottone, new THREE.TorusGeometry(0.0405, 0.0008, 4, 48), [0, 0, -a]);
  o.metti(acciaio, new THREE.BoxGeometry(0.046, 0.018, 0.074), [0, 0.031, 0]);
  const piastra = new THREE.Shape();
  const [lx, lz, r] = [0.026, 0.042, 0.008];
  piastra.moveTo(-lx + r, -lz);
  piastra.lineTo(lx - r, -lz);
  piastra.quadraticCurveTo(lx, -lz, lx, -lz + r);
  piastra.lineTo(lx, lz - r);
  piastra.quadraticCurveTo(lx, lz, lx - r, lz);
  piastra.lineTo(-lx + r, lz);
  piastra.quadraticCurveTo(-lx, lz, -lx, lz - r);
  piastra.lineTo(-lx, -lz + r);
  piastra.quadraticCurveTo(-lx, -lz, -lx + r, -lz);
  o.metti(ottone, new THREE.ExtrudeGeometry(piastra, { depth: 0.006, bevelEnabled: true, bevelThickness: 0.0015, bevelSize: 0.0015, bevelSegments: 2 }).rotateX(-PI / 2), [0, 0.039, 0]);
  for (const [x, z] of [[-0.021, -0.037], [0.021, -0.037], [-0.021, 0.037], [0.021, 0.037]]) o.metti(acciaio, new THREE.SphereGeometry(0.0022, 8, 6), [x, 0.0465, z], [0, 0, 0], [1, 0.5, 1]);
  o.metti(acciaio, new THREE.CylinderGeometry(0.004, 0.004, 0.008, 16), [0.03, 0.044, -0.012], [0, 0, PI / 2]);
  o.metti(ottone, new THREE.CylinderGeometry(0.0025, 0.0025, 0.005, 10), [0.0185, 0.044, 0.03], [0, 0, PI / 2]);
  o.metti(acciaio, new THREE.TorusGeometry(0.0048, 0.0012, 6, 20), [0.015, 0.0475, -0.035], [PI / 2, 0, 0]);
  const tubo = new THREE.CatmullRomCurve3([vettore(-0.024, 0.044, -0.014), vettore(-0.034, 0.04, -0.018), vettore(-0.04, 0.026, -0.022), vettore(-0.042, 0.008, -0.02)]);
  o.metti(gomma, new THREE.TubeGeometry(tubo, 16, 0.0026, 8, false));
  o.chiudi(gruppo);

  const o2 = strumentoPolso(quadranteO2, 0.0215, ottone, vetro);
  o2.position.set(-0.002, 0.046, -0.012);
  const ora = strumentoPolso(quadranteOra, 0.0135, ottone, vetro);
  ora.position.set(0, 0.046, 0.029);
  gruppo.add(o2, ora);
  const agoO2 = lancettaPolso(0.019, 0.0016, rosso, 0.0102);
  const agoPressione = lancettaPolso(0.009, 0.0009, acciaio, 0.0101);
  agoPressione.position.z = 0;
  o2.add(agoO2, agoPressione);
  const ore = lancettaPolso(0.0075, 0.0013, luminoso, 0.0103);
  const minuti = lancettaPolso(0.0112, 0.001, luminoso, 0.0104);
  const secondi = lancettaPolso(0.0118, 0.0005, rosso, 0.0105);
  ora.add(ore, minuti, secondi);
  const spia = new THREE.Mesh(new THREE.SphereGeometry(0.0034, 12, 8), spiaMat);
  spia.position.set(0.015, 0.0475, -0.035);
  gruppo.add(spia);
  let ossigenoMostrato = 1;
  let pressioneMostrata = 0;
  const aggiorna = ({ ossigeno = 1, profondita = 0, tempo = 0 } = {}) => {
    ossigenoMostrato += (fermo(ossigeno, 0, 1) - ossigenoMostrato) * 0.12;
    const pressione = fermo((1 + Math.max(0, profondita) / 10) / 6, 0, 1);
    pressioneMostrata += (pressione - pressioneMostrata) * 0.08;
    const tremito = Math.sin(tempo * 31) * 0.012 * (1 - ossigenoMostrato) + Math.sin(tempo * 7) * 0.004;
    agoO2.rotation.y = -(-ARCO_MANOMETRO / 2 + ARCO_MANOMETRO * ossigenoMostrato + tremito);
    agoPressione.rotation.y = -(-PI * 0.6 + PI * 1.2 * pressioneMostrata);
    const s = Math.floor(tempo);
    secondi.rotation.y = -(s / 60) * PI * 2;
    minuti.rotation.y = -(tempo / 3600) * PI * 2 - 1.1;
    ore.rotation.y = -(tempo / 43200) * PI * 2 - 2.3;
    const allarme = ossigenoMostrato < 0.3;
    spiaMat.emissiveIntensity = allarme ? (Math.sin(tempo * 14) > 0 ? 5 : 0.3) : 0.2;
    quadranteO2.emissive.setHex(allarme ? 0xff6a50 : 0x9affc0);
    quadranteO2.emissiveIntensity = allarme ? 0.18 + Math.max(0, Math.sin(tempo * 14)) * 0.25 : 0.12;
  };
  aggiorna();
  return { gruppo, aggiorna };
}
