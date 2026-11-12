import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';

const FORZA_BLOOM = 0.62;
const RAGGIO_BLOOM = 0.5;
const SOGLIA_BLOOM = 0.85;

class PassaggioArma extends Pass {
  constructor(scena, camera) {
    super();
    this.scena = scena;
    this.camera = camera;
    this.needsSwap = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    const prima = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setRenderTarget(readBuffer);
    renderer.clearDepth();
    renderer.render(this.scena, this.camera);
    renderer.autoClear = prima;
  }
}

const FINALE = {
  uniforms: {
    tDiffuse: { value: null },
    uTempo: { value: 0 },
    uAberrazione: { value: 0 },
    uSottacqua: { value: 0 },
    uDanno: { value: 0 },
    uVignetta: { value: 0.15 },
    uGrana: { value: 0.025 },
    uCondotto: { value: 0 },
    uRisoluzione: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTempo;
    uniform float uAberrazione;
    uniform float uSottacqua;
    uniform float uDanno;
    uniform float uVignetta;
    uniform float uGrana;
    uniform float uCondotto;
    uniform vec2 uRisoluzione;
    varying vec2 vUv;
    float caso(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      vec2 centro = uv - 0.5;
      float d = length(centro);
      float onda = uSottacqua + uCondotto * 1.6;
      uv += vec2(sin(uv.y * 23.0 + uTempo * 2.3), cos(uv.x * 19.0 + uTempo * 1.9)) * 0.0032 * onda;
      uv += centro * uCondotto * 0.08 * sin(uTempo * 9.0);
      float scarto = (uAberrazione + uCondotto * 1.5 + uSottacqua * 0.35) * (0.35 + d * 1.8) * 0.011;
      vec3 c;
      c.r = texture2D(tDiffuse, uv + centro * scarto).r;
      c.g = texture2D(tDiffuse, uv).g;
      c.b = texture2D(tDiffuse, uv - centro * scarto).b;
      vec3 marino = c * vec3(0.5, 0.82, 1.08) + vec3(0.0, 0.018, 0.034);
      c = mix(c, marino, clamp(uSottacqua, 0.0, 1.0) * 0.75);
      float raggi = pow(max(0.0, sin(uv.x * 40.0 + uTempo * 3.0 + uv.y * 6.0)), 18.0) * uCondotto * 0.35;
      c += vec3(0.4, 0.8, 1.0) * raggi;
      float vignetta = smoothstep(0.9, 0.28, d * (1.0 + uVignetta + uSottacqua * 0.4 + uCondotto * 0.6));
      c *= mix(1.0, vignetta, 0.82);
      c += vec3(0.42, 0.0, 0.01) * smoothstep(0.3, 0.78, d) * uDanno;
      c += (caso(uv * uRisoluzione + fract(uTempo)) - 0.5) * uGrana;
      gl_FragColor = vec4(max(c, vec3(0.0)), 1.0);
    }`,
};

export function creaPost(renderer, scena, camera, vista1p, { bloom = true } = {}) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scena, camera));
  composer.addPass(new PassaggioArma(vista1p.scena, vista1p.camera));
  const fioritura = bloom ? new UnrealBloomPass(new THREE.Vector2(256, 256), FORZA_BLOOM, RAGGIO_BLOOM, SOGLIA_BLOOM) : null;
  if (fioritura) composer.addPass(fioritura);
  const finale = new ShaderPass(FINALE);
  composer.addPass(finale);
  composer.addPass(new OutputPass());
  const stato = { aberrazione: 0, sottacqua: 0, danno: 0, condotto: 0 };
  return {
    stato,
    dimensiona(larghezza, altezza) {
      composer.setPixelRatio(1);
      composer.setSize(larghezza, altezza);
      fioritura?.setSize(Math.max(1, Math.floor(larghezza / 2)), Math.max(1, Math.floor(altezza / 2)));
      finale.uniforms.uRisoluzione.value.set(larghezza, altezza);
    },
    disegna(dt, tempo) {
      const u = finale.uniforms;
      u.uTempo.value = tempo;
      u.uAberrazione.value += (stato.aberrazione - u.uAberrazione.value) * Math.min(1, dt * 6);
      u.uSottacqua.value += (stato.sottacqua - u.uSottacqua.value) * Math.min(1, dt * 4);
      u.uDanno.value += (stato.danno - u.uDanno.value) * Math.min(1, dt * 8);
      u.uCondotto.value += (stato.condotto - u.uCondotto.value) * Math.min(1, dt * 5);
      stato.danno = Math.max(0, stato.danno - dt * 1.6);
      stato.aberrazione = Math.max(0, stato.aberrazione - dt * 2);
      composer.render(dt);
    },
    colpito(forza = 1) {
      stato.danno = Math.min(1, stato.danno + 0.55 * forza);
      stato.aberrazione = Math.min(1.5, stato.aberrazione + 0.9 * forza);
    },
    chiudi() {
      composer.dispose();
    },
  };
}
