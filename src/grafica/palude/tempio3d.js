import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OSTACOLI, MURI, FINESTRE, quota } from '../../mappa.js';
import { FONDO_TEMPIO as F, TETTO_TEMPIO as T, ELEMENTI_RELIQUIE } from '../../mappe/palude.js';
import { R } from '../../regole.js';
import { PASSO } from '../../palude/reliquie.js';
import { creaTeschio } from '../teschio3d.js';
import { tela } from './tele.js';

const X0 = -64;
const X1 = -28;
const Z0 = -22;
const Z1 = 14;
const OCULO = 2.6;
const SCIE_ANIME = 14;
const DURATA_SCIA = 1.1;
const SCALINI_SUD = 10;
const SCALINI_EST = 12;
export const COLORI_ELEMENTI = Object.freeze({ ghiaccio: 0x7fd8ff, fuoco: 0xff7a2a, vuoto: 0xb06cff, vento: 0xc8ffd8 });
const VERDE = 0x6dff8a;
const SCALA_STATUA = 1.2;

const texturaFregio = () => tela(512, 64, (c, l, a, caso) => {
  c.fillStyle = '#000';
  c.fillRect(0, 0, l, a);
  c.strokeStyle = '#fff';
  c.lineWidth = 3;
  c.strokeRect(2, 4, l - 4, a - 8);
  for (let x = 16; x < l - 16; x += 30) {
    c.beginPath();
    const tipo = Math.floor(caso() * 4);
    if (tipo === 0) {
      c.arc(x + 9, a / 2, 9, 0, Math.PI * 2);
      c.moveTo(x + 9, a / 2 - 14);
      c.lineTo(x + 9, a / 2 + 14);
    } else if (tipo === 1) {
      c.moveTo(x, a / 2 + 12);
      c.lineTo(x + 9, a / 2 - 12);
      c.lineTo(x + 18, a / 2 + 12);
      c.moveTo(x + 3, a / 2 + 3);
      c.lineTo(x + 15, a / 2 + 3);
    } else if (tipo === 2) {
      c.moveTo(x, a / 2 - 12);
      c.lineTo(x + 18, a / 2 + 12);
      c.moveTo(x + 18, a / 2 - 12);
      c.lineTo(x, a / 2 + 12);
      c.moveTo(x + 9, a / 2 - 14);
      c.lineTo(x + 9, a / 2 - 6);
    } else {
      c.rect(x + 2, a / 2 - 10, 14, 20);
      c.moveTo(x + 9, a / 2 - 10);
      c.lineTo(x + 9, a / 2 + 10);
    }
    c.stroke();
  }
});

const texturaCerchio = () => tela(512, 512, (c, l, a, caso) => {
  c.clearRect(0, 0, l, a);
  c.translate(l / 2, a / 2);
  c.strokeStyle = '#fff';
  c.fillStyle = '#fff';
  for (const [r, w] of [[250, 6], [232, 2], [180, 4], [168, 2], [92, 5]]) {
    c.lineWidth = w;
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.stroke();
  }
  c.font = 'bold 22px serif';
  c.textAlign = 'center';
  const segni = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
  for (let i = 0; i < 36; i++) {
    c.save();
    c.rotate((i / 36) * Math.PI * 2);
    c.fillText(segni[Math.floor(caso() * segni.length)], 0, -200);
    c.restore();
  }
  c.lineWidth = 4;
  c.beginPath();
  for (let i = 0; i <= 7; i++) {
    const ang = (i * 3 * Math.PI * 2) / 7 - Math.PI / 2;
    const x = Math.cos(ang) * 168;
    const y = Math.sin(ang) * 168;
    if (i === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
  for (let i = 0; i < 4; i++) {
    c.save();
    c.rotate((i / 4) * Math.PI * 2 + Math.PI / 4);
    c.beginPath();
    c.arc(0, -130, 16, 0, Math.PI * 2);
    c.stroke();
    c.restore();
  }
});

const texturaCrepe = () => tela(256, 512, (c, l, a, caso) => {
  c.fillStyle = '#000';
  c.fillRect(0, 0, l, a);
  c.strokeStyle = '#fff';
  for (let i = 0; i < 26; i++) {
    let x = caso() * l;
    let y = caso() * a;
    c.lineWidth = 1 + caso() * 2.5;
    c.beginPath();
    c.moveTo(x, y);
    for (let k = 0; k < 14; k++) {
      x += (caso() - 0.5) * 26;
      y += 6 + caso() * 22;
      c.lineTo(x, y);
    }
    c.stroke();
  }
  c.lineWidth = 3;
  for (let y = 60; y < a; y += 110) {
    for (let x = 24; x < l - 20; x += 44) {
      c.beginPath();
      c.arc(x, y, 8, 0, Math.PI * 2);
      c.moveTo(x, y - 14);
      c.lineTo(x, y + 14);
      c.stroke();
    }
  }
});

const texturaRaggio = () => tela(64, 256, (c, l, a) => {
  const g = c.createLinearGradient(0, 0, 0, a);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, l, a);
}, { ripeti: false });

const centroDi = o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 });

function geometriaStatua(elemento) {
  const parti = [];
  const veste = new THREE.LatheGeometry([[1.25, 0], [1.12, 0.5], [0.98, 1.4], [0.86, 2.4], [0.8, 3.2], [0.92, 3.75], [0.7, 4.05], [0.36, 4.25], [0, 4.3]].map(([r, y]) => new THREE.Vector2(r, y)), 24).scale(1, 1, 0.78);
  parti.push(veste);
  const cappuccio = new THREE.LatheGeometry([[0.05, 5.25], [0.38, 5.12], [0.56, 4.85], [0.6, 4.5], [0.55, 4.2], [0.62, 4.05]].map(([r, y]) => new THREE.Vector2(r, y)), 20, Math.PI * 1.12, Math.PI * 1.76);
  parti.push(cappuccio);
  for (const lato of [-1, 1]) {
    const spalla = new THREE.Vector3(lato * 0.78, 3.8, 0);
    const gomito = new THREE.Vector3(lato * 0.62, 2.95, -0.45);
    const mano = new THREE.Vector3(lato * 0.28, 3.15, -1.02);
    for (const [a, b, r] of [[spalla, gomito, 0.24], [gomito, mano, 0.2]]) {
      const d = new THREE.Vector3().subVectors(b, a);
      const braccio = new THREE.CylinderGeometry(r * 0.85, r, d.length(), 12).translate(0, d.length() / 2, 0);
      braccio.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()));
      braccio.translate(a.x, a.y, a.z);
      parti.push(braccio);
    }
    parti.push(new THREE.SphereGeometry(0.17, 10, 8).translate(mano.x, mano.y, mano.z));
  }
  if (elemento === 'ghiaccio') {
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const alto = 0.35 + (i % 2) * 0.3;
      parti.push(new THREE.ConeGeometry(0.07, alto, 6).translate(Math.cos(a) * 0.42, 5.2 + alto / 2, Math.sin(a) * 0.42 * 0.9));
    }
  } else if (elemento === 'vuoto') {
    parti.push(new THREE.TorusGeometry(1.05, 0.07, 8, 40).translate(0, 4.75, 0.42));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      parti.push(new THREE.ConeGeometry(0.06, 0.32, 5).rotateZ(-a + Math.PI / 2).translate(Math.cos(a) * 1.25, 4.75 + Math.sin(a) * 1.25, 0.42));
    }
  } else if (elemento === 'vento') {
    for (const lato of [-1, 1]) {
      const ala = new THREE.Shape();
      ala.moveTo(0, 0);
      ala.bezierCurveTo(0.8, 0.6, 2.2, 1.6, 2.6, 2.9);
      ala.bezierCurveTo(2.1, 2.1, 1.6, 1.4, 1.9, 0.6);
      ala.bezierCurveTo(1.3, 0.8, 1.1, 0.2, 1.4, -0.6);
      ala.bezierCurveTo(0.9, -0.3, 0.4, -0.5, 0, 0);
      const g = new THREE.ExtrudeGeometry(ala, { depth: 0.12, bevelEnabled: false, curveSegments: 10 });
      g.scale(lato, 1, 1).rotateY(lato * 0.35).translate(lato * 0.45, 3.2, 0.5);
      parti.push(g);
    }
  } else if (elemento === 'fuoco') {
    parti.push(new THREE.CylinderGeometry(0.62, 0.34, 0.36, 18, 1, true).translate(0, 5.32, 0));
    parti.push(new THREE.TorusGeometry(0.62, 0.05, 6, 24).rotateX(Math.PI / 2).translate(0, 5.5, 0));
  }
  return mergeGeometries(parti.map(g => {
    const n = g.index ? g.toNonIndexed() : g;
    for (const nome of Object.keys(n.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) n.deleteAttribute(nome);
    if (!n.attributes.uv) n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
    n.computeVertexNormals();
    return n;
  }));
}

function creaReliquia(elemento, materiale) {
  const g = new THREE.Group();
  if (elemento === 'ghiaccio') {
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 24).rotateX(Math.PI / 2), materiale));
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const punta = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.16 + (i % 2) * 0.12, 6), materiale);
      punta.position.set(Math.cos(a) * 0.2, 0.08 + (i % 2) * 0.06, Math.sin(a) * 0.2);
      g.add(punta);
    }
  } else if (elemento === 'fuoco') {
    const cuore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 1).scale(1, 1.25, 0.85), materiale);
    g.add(cuore);
  } else if (elemento === 'vuoto') {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshStandardMaterial({ color: 0x06020a, roughness: 0.2, metalness: 0.4 })));
    for (const inclina of [0.4, -0.7]) {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.018, 6, 32), materiale);
      anello.rotation.set(Math.PI / 2 + inclina, 0, inclina);
      g.add(anello);
    }
  } else {
    const piuma = new THREE.Shape();
    piuma.moveTo(0, -0.3);
    piuma.bezierCurveTo(0.14, -0.1, 0.12, 0.2, 0, 0.34);
    piuma.bezierCurveTo(-0.12, 0.2, -0.14, -0.1, 0, -0.3);
    const m = new THREE.Mesh(new THREE.ShapeGeometry(piuma, 12), materiale);
    m.material.side = THREE.DoubleSide;
    g.add(m);
  }
  return g;
}

export function creaTempio(scena, { mat, reali, alone, pezzo, cubo, statico }) {
  const pietra = new THREE.MeshStandardMaterial({ ...reali.pietraTempio, color: 0xbab9a4, metalness: 0 });
  const pietraScura = new THREE.MeshStandardMaterial({ ...reali.pietraTempio, color: 0x7a7d6c, metalness: 0 });
  const bronzo = new THREE.MeshStandardMaterial({ color: 0x8a6a3a, metalness: 0.8, roughness: 0.4 });
  const fregio = texturaFregio();
  const runa = new THREE.MeshStandardMaterial({ ...reali.pietraTempio, color: 0x6e7064, emissiveMap: fregio, emissive: VERDE, emissiveIntensity: 0.55 });
  const cerchio = new THREE.MeshBasicMaterial({ map: texturaCerchio(), color: VERDE, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const fiammaMat = colore => new THREE.SpriteMaterial({ map: alone, color: colore, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });

  const pianoUV = (m, x0, z0, x1, z1, y, metri, sotto = false) => {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(sotto ? Math.PI / 2 : -Math.PI / 2);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * (x1 - x0)) / metri, (uv.getY(i) * (z1 - z0)) / metri);
    statico.aggiungi(m, g.translate((x0 + x1) / 2, y, (z0 + z1) / 2));
  };

  pianoUV(pietra, X0, Z0, X1, Z1, F, 2.6);
  for (const [x0, x1] of [[X0 + 0.2, X0 + 1.2], [X1 - 1.2, X1 - 0.2]]) cubo(pietraScura, x0, F, Z0 + 0.2, x1, F + 0.18, Z1 - 0.2, 2);

  const forato = new THREE.Shape([[X0, Z0], [X1, Z0], [X1, Z1], [X0, Z1]].map(([x, z]) => new THREE.Vector2(x, z)));
  const buco = new THREE.Path();
  buco.absarc(-46, -4, OCULO, 0, Math.PI * 2, false);
  forato.holes.push(buco);
  const soffitto = new THREE.ShapeGeometry(forato, 24).rotateX(Math.PI / 2);
  const uvS = soffitto.attributes.uv;
  for (let i = 0; i < uvS.count; i++) uvS.setXY(i, uvS.getX(i) / 3, uvS.getY(i) / 3);
  statico.aggiungi(pietraScura, soffitto.translate(0, T, 0));
  const tetto = new THREE.ExtrudeGeometry(forato, { depth: 0.7, bevelEnabled: false, curveSegments: 24 }).rotateX(Math.PI / 2);
  const uvT = tetto.attributes.uv;
  for (let i = 0; i < uvT.count; i++) uvT.setXY(i, uvT.getX(i) / 3, uvT.getY(i) / 3);
  statico.aggiungi(mat.muschio, tetto.translate(0, T + 0.7, 0));
  const secondo = new THREE.Shape([[-58, -16], [-34, -16], [-34, 8], [-58, 8]].map(([x, z]) => new THREE.Vector2(x, z)));
  const buco2 = new THREE.Path();
  buco2.absarc(-46, -4, OCULO + 0.2, 0, Math.PI * 2, false);
  secondo.holes.push(buco2);
  statico.aggiungi(mat.muschio, new THREE.ExtrudeGeometry(secondo, { depth: 0.9, bevelEnabled: false, curveSegments: 24 }).rotateX(Math.PI / 2).translate(0, T + 1.6, 0));
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    pezzo(pietra, new THREE.BoxGeometry(0.7, 0.9 + (i % 2) * 0.5, 0.5), -46 + Math.cos(a) * (OCULO + 0.55), T + 2 + (i % 2) * 0.25, -4 + Math.sin(a) * (OCULO + 0.55), -a);
  }

  for (const s of MURI) {
    if (s.tipo === 'tempio') {
      const scala = s.x0 >= -28.4;
      cubo(pietra, s.x0, F, s.z0, s.x1, scala ? 4.1 : T, s.z1, 2.5);
      if (!scala) {
        const orizz = s.x1 - s.x0 > s.z1 - s.z0;
        const verso = orizz ? (s.z0 < -4 ? 1 : -1) : (s.x0 < -46 ? 1 : -1);
        const sporgi = 0.06;
        if (orizz) cubo(runa, s.x0, F + 4.1, (verso > 0 ? s.z1 : s.z0 - sporgi), s.x1, F + 4.5, (verso > 0 ? s.z1 + sporgi : s.z0), 3);
        else cubo(runa, (verso > 0 ? s.x1 : s.x0 - sporgi), F + 4.1, s.z0, (verso > 0 ? s.x1 + sporgi : s.x0), F + 4.5, s.z1, 3);
      }
    } else if (s.tipo === 'spondaTempio') cubo(pietraScura, s.x0, F, s.z0, s.x1, F + 3.4, s.z1, 2);
  }
  cubo(pietra, -28.2, 1.2, -12, -27.8, T, -8, 2);
  cubo(pietra, -48, 3, -22.2, -44, T, -21.8, 2);
  for (const z of [-12.6, -7.4]) cubo(pietraScura, -28.9, F, z - 0.6, -27.7, 1.6, z + 0.6, 2);
  for (const x of [-48.6, -43.4]) cubo(pietraScura, x - 0.6, -0.2, -22.9, x + 0.6, 3.6, -21.7, 2);

  const muschi = [];
  for (const s of MURI.filter(q => q.tipo === 'tempio' && !(q.z0 >= -12.3 && q.z1 <= -7.7 && q.x0 >= -28.4))) {
    const orizz = s.x1 - s.x0 > s.z1 - s.z0;
    const lungo = orizz ? s.x1 - s.x0 : s.z1 - s.z0;
    const fuori = orizz ? (s.z0 < -4 ? -1 : 1) : (s.x0 < -46 ? -1 : 1);
    const faccia = orizz ? (fuori < 0 ? s.z0 : s.z1) : (fuori < 0 ? s.x0 : s.x1);
    const sporgi = (da, a) => (fuori < 0 ? [faccia - a, faccia - da] : [faccia + da, faccia + a]);
    const [c0, c1] = sporgi(0, 0.45);
    if (orizz) cubo(pietra, s.x0, T - 0.25, c0, s.x1, T + 0.2, c1, 2);
    else cubo(pietra, c0, T - 0.25, s.z0, c1, T + 0.2, s.z1, 2);
    for (let k = 1.2; k < lungo - 0.6; k += 4.4) {
      const [p0, p1] = sporgi(0, 0.32);
      if (orizz) cubo(pietraScura, s.x0 + k - 0.35, -1, p0, s.x0 + k + 0.35, T - 0.25, p1, 2);
      else cubo(pietraScura, p0, -1, s.z0 + k - 0.35, p1, T - 0.25, s.z0 + k + 0.35, 2);
    }
    for (let k = 0.6; k < lungo; k += 1.3 + ((k * 7) % 1.1)) {
      const x = orizz ? s.x0 + k : faccia + fuori * 0.48;
      const z = orizz ? faccia + fuori * 0.48 : s.z0 + k;
      muschi.push(new THREE.Matrix4().compose(new THREE.Vector3(x, T + 0.15, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, orizz ? 0 : Math.PI / 2, 0)), new THREE.Vector3(1, 0.7 + ((k * 13) % 7) / 7, 1)));
    }
  }
  const muschio = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.2, 2.8).translate(0, -1.4, 0), mat.barba, muschi.length);
  muschi.forEach((m, i) => muschio.setMatrixAt(i, m));
  scena.add(muschio);
  const guardiano = creaTeschio({ colore: VERDE }).gruppo;
  guardiano.scale.setScalar(2.6);
  guardiano.position.set(-46, 3.9, Z0 - 0.75);
  guardiano.rotation.y = Math.PI;
  scena.add(guardiano);

  const rampaEst = new THREE.PlaneGeometry(Math.hypot(8, -F), 3.6).rotateX(Math.PI / 2).rotateZ(Math.atan2(-F, 8));
  statico.aggiungi(pietraScura, rampaEst.translate(-24, (3.6 + 1.2) / 2 + 0.01, -10));
  for (let k = 0; k < SCALINI_EST; k++) {
    const xa = -20 - (8 / SCALINI_EST) * k;
    const xb = -20 - (8 / SCALINI_EST) * (k + 1);
    cubo(pietra, xb, F, -11.8, xa, (F * (k + 0.5)) / SCALINI_EST, -8.2, 1.5);
  }
  for (let k = 0; k < SCALINI_SUD; k++) {
    const za = Z0 + (7 / SCALINI_SUD) * k;
    const zb = Z0 + (7 / SCALINI_SUD) * (k + 1);
    cubo(pietra, -48, F, za, -44, (F * (k + 0.5)) / SCALINI_SUD, zb, 1.5);
  }

  for (const o of OSTACOLI.filter(q => q.tipo === 'colonna')) {
    const { x, z } = centroDi(o);
    cubo(pietraScura, x - 0.78, F, z - 0.78, x + 0.78, F + 0.55, z + 0.78, 1.5);
    pezzo(pietra, new THREE.CylinderGeometry(0.5, 0.56, T - F - 1.25, 20), x, (F + 0.55 + T - 0.7) / 2, z);
    for (const y of [F + 0.7, T - 0.85]) pezzo(pietraScura, new THREE.TorusGeometry(0.56, 0.08, 6, 20).rotateX(Math.PI / 2), x, y, z);
    pezzo(runa, new THREE.CylinderGeometry(0.575, 0.575, 0.38, 20, 1, true), x, F + 3.1, z);
    cubo(pietraScura, x - 0.82, T - 0.7, z - 0.82, x + 0.82, T, z + 0.82, 1.5);
  }

  const altare = OSTACOLI.find(o => o.tipo === 'altare');
  const ca = centroDi(altare);
  pezzo(pietraScura, new THREE.CylinderGeometry(4.2, 4.4, 0.16, 40), ca.x, F + 0.08, ca.z);
  pezzo(pietra, new THREE.CylinderGeometry(3.2, 3.3, 0.14, 40), ca.x, F + 0.2, ca.z);
  cubo(pietraScura, altare.x0, F + 0.27, altare.z0, altare.x1, F + 0.85, altare.z1, 1);
  cubo(pietra, altare.x0 - 0.15, F + 0.85, altare.z0 - 0.15, altare.x1 + 0.15, F + 1.05, altare.z1 + 0.15, 1);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) pezzo(runa, new THREE.CylinderGeometry(0.12, 0.16, 0.6, 8), ca.x + sx * 1.05, F + 0.56, ca.z + sz * 1.05);
  const disco = new THREE.Mesh(new THREE.CircleGeometry(3.15, 48).rotateX(-Math.PI / 2), cerchio);
  disco.position.set(ca.x, F + 0.28, ca.z);
  scena.add(disco);
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * Math.PI * 2;
    const x = ca.x + Math.cos(a) * 2.2;
    const z = ca.z + Math.sin(a) * 2.2;
    const alto = 0.3 + ((k * 7) % 5) * 0.08;
    pezzo(mat.nero, new THREE.CylinderGeometry(0.04, 0.05, alto, 8), x, F + 0.27 + alto / 2, z);
    pezzo(mat.candela, new THREE.SphereGeometry(0.035, 6, 4), x, F + 0.3 + alto, z);
  }
  const { gruppo: teschio } = creaTeschio({});
  teschio.scale.setScalar(4.4);
  const quotaTeschio = F + 1.55;
  teschio.position.set(ca.x, quotaTeschio, ca.z);
  teschio.rotation.y = Math.PI;
  const bagliore = new THREE.Sprite(fiammaMat(VERDE));
  bagliore.material.opacity = 0.2;
  bagliore.position.set(ca.x, quotaTeschio, ca.z);
  scena.add(teschio, bagliore);
  const materialeScia = fiammaMat(0x9dffb0);
  const scie = Array.from({ length: SCIE_ANIME }, () => {
    const sprite = new THREE.Sprite(materialeScia.clone());
    sprite.visible = false;
    sprite.scale.setScalar(0.5);
    scena.add(sprite);
    return { sprite, t: 1, da: new THREE.Vector3() };
  });
  const raggio = new THREE.Mesh(new THREE.CylinderGeometry(OCULO - 0.1, OCULO + 1.4, T - F, 32, 1, true), new THREE.MeshBasicMaterial({ map: texturaRaggio(), color: 0xc8f0d0, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  raggio.position.set(ca.x, (F + T) / 2, ca.z);
  scena.add(raggio);

  const polvere = new THREE.BufferGeometry();
  const basePolvere = new Float32Array(90 * 3);
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * (OCULO + 0.6);
    basePolvere.set([ca.x + Math.cos(a) * r, F + Math.random() * (T - F), ca.z + Math.sin(a) * r], i * 3);
  }
  const posPolvere = new Float32Array(basePolvere);
  polvere.setAttribute('position', new THREE.BufferAttribute(posPolvere, 3));
  scena.add(new THREE.Points(polvere, new THREE.PointsMaterial({ map: alone, size: 0.09, color: 0xe8f8e0, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending })));

  const bracieri = OSTACOLI.filter(o => o.tipo === 'braciereTempio').map(o => {
    const { x, z } = centroDi(o);
    pezzo(pietraScura, new THREE.CylinderGeometry(0.28, 0.4, 0.7, 10), x, F + 0.35, z);
    pezzo(bronzo, new THREE.CylinderGeometry(0.5, 0.26, 0.4, 16, 1, true), x, F + 0.9, z);
    pezzo(bronzo, new THREE.TorusGeometry(0.5, 0.04, 6, 18).rotateX(Math.PI / 2), x, F + 1.1, z);
    pezzo(mat.nero, new THREE.CircleGeometry(0.46, 14).rotateX(-Math.PI / 2), x, F + 1.02, z);
    const fiamme = [0, 1, 2, 3].map(k => {
      const s = new THREE.Sprite(fiammaMat(k % 2 ? 0xffc060 : 0xff6a1a));
      s.position.set(x + (k - 1.5) * 0.1, F + 1.35, z + (k % 2 ? 0.08 : -0.08));
      scena.add(s);
      return s;
    });
    return { fiamme };
  });

  const torce = [];
  for (const [x, z, rot] of [[-23, -11.65, 0], [-25.5, -8.35, Math.PI], [X0 + 0.35, -12, Math.PI / 2], [X0 + 0.35, 4, Math.PI / 2], [X1 - 0.35, 4, -Math.PI / 2], [X1 - 0.35, -17, -Math.PI / 2], [-55, Z0 + 0.35, 0], [-37, Z0 + 0.35, 0]]) {
    pezzo(bronzo, new THREE.CylinderGeometry(0.05, 0.03, 0.55, 6).rotateX(-0.6), x, quota(x, z) + 2.6, z, rot);
    const s = new THREE.Sprite(fiammaMat(0xff9a40));
    s.position.set(x + Math.sin(rot) * 0.25, quota(x, z) + 2.95, z + Math.cos(rot) * 0.25);
    scena.add(s);
    torce.push(s);
  }

  for (const f of FINESTRE.filter(q => q.tana && q.zona === 'laboratorio')) {
    const verso = f.interno.x < -60 ? Math.PI / 2 : f.interno.x > -32 ? -Math.PI / 2 : 0;
    const muroX = f.interno.x < -60 ? X0 + 0.25 : f.interno.x > -32 ? X1 - 0.25 : f.interno.x;
    const muroZ = verso === 0 ? Z0 + 0.25 : f.interno.z;
    pezzo(mat.nero, new THREE.PlaneGeometry(1.6, 2.3), muroX + Math.sin(verso) * 0.03, F + 1.15, muroZ + Math.cos(verso) * 0.03, verso);
    for (const lato of [-1, 1]) pezzo(pietraScura, new THREE.BoxGeometry(0.35, 2.6, 0.35), muroX + Math.cos(verso) * lato * 0.95 + Math.sin(verso) * 0.15, F + 1.3, muroZ - Math.sin(verso) * lato * 0.95 + Math.cos(verso) * 0.15, verso);
    pezzo(pietraScura, new THREE.BoxGeometry(2.3, 0.35, 0.4), muroX + Math.sin(verso) * 0.15, F + 2.6, muroZ + Math.cos(verso) * 0.15, verso);
    for (let k = 0; k < 6; k++) pezzo(mat.osso, new THREE.SphereGeometry(0.11 + (k % 3) * 0.02, 8, 6), f.interno.x + ((k * 37) % 9) / 9 - 0.5, F + 0.1, f.interno.z + ((k * 53) % 7) / 7 - 0.5, 0, 1, 1.15, 1);
  }

  const radici = [];
  for (let i = 0; i < 34; i++) {
    const x = X0 + 1 + ((i * 7.31) % 1) * 0 + ((i * 97) % 34);
    const z = Z0 + 1 + ((i * 53) % 34);
    if (Math.hypot(x + 46, z + 4) < OCULO + 1.5) continue;
    const lungo = 1 + ((i * 13) % 7) * 0.35;
    radici.push(new THREE.Matrix4().compose(new THREE.Vector3(x, T - lungo / 2, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(((i % 5) - 2) * 0.08, i, ((i % 3) - 1) * 0.1)), new THREE.Vector3(1, lungo, 1)));
  }
  const radiciMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.02, 0.06, 1, 5), mat.corteccia, radici.length);
  radici.forEach((m, i) => radiciMesh.setMatrixAt(i, m));
  scena.add(radiciMesh);

  const crepe = texturaCrepe();
  const statue = new Map();
  for (const o of OSTACOLI.filter(q => q.tipo === 'statua')) {
    const { x, z } = centroDi(o);
    const colore = COLORI_ELEMENTI[o.elemento];
    cubo(pietraScura, o.x0, F, o.z0, o.x1, F + 1.2, o.z1, 1.5);
    cubo(runa, o.x0 - 0.05, F + 0.75, o.z0 - 0.06, o.x1 + 0.05, F + 1.0, o.z0, 3);
    const materiale = new THREE.MeshStandardMaterial({ ...reali.pietraTempio, color: 0xb4b4a2, metalness: 0, emissiveMap: crepe, emissive: colore, emissiveIntensity: 0.04 });
    const corpo = new THREE.Mesh(geometriaStatua(o.elemento), materiale);
    corpo.position.set(x, F + 1.2, z - 0.1);
    corpo.scale.setScalar(SCALA_STATUA);
    scena.add(corpo);
    const occhi = [-1, 1].map(lato => {
      const s = new THREE.Sprite(fiammaMat(colore));
      s.position.set(x + lato * 0.15 * SCALA_STATUA, F + 1.2 + 4.72 * SCALA_STATUA, z - 0.1 - 0.52 * SCALA_STATUA);
      s.scale.setScalar(0.25);
      scena.add(s);
      return s;
    });
    const sfera = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 2), new THREE.MeshStandardMaterial({ color: 0x111111, emissive: colore, emissiveIntensity: 0.1, roughness: 0.3 }));
    sfera.position.set(x, F + 1.2 + 3.35 * SCALA_STATUA, z - 0.1 - 1.05 * SCALA_STATUA);
    scena.add(sfera);
    const aura = new THREE.Sprite(fiammaMat(colore));
    aura.position.copy(sfera.position);
    scena.add(aura);
    const colonnaLuce = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, T - F, 24, 1, true), new THREE.MeshBasicMaterial({ map: texturaRaggio(), color: colore, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    colonnaLuce.rotation.x = Math.PI;
    colonnaLuce.position.set(x, (F + T) / 2, z);
    scena.add(colonnaLuce);
    statue.set(o.elemento, { materiale, occhi, sfera, aura, colonnaLuce, accesa: 0 });
  }

  const piedistalli = new Map();
  for (const o of OSTACOLI.filter(q => q.tipo === 'piedistalloReliquia')) {
    const { x, z } = centroDi(o);
    const colore = COLORI_ELEMENTI[o.elemento];
    pezzo(pietraScura, new THREE.CylinderGeometry(0.42, 0.55, 1.05, 8), x, F + 0.52, z);
    pezzo(pietra, new THREE.CylinderGeometry(0.6, 0.45, 0.18, 8), x, F + 1.12, z);
    const materiale = new THREE.MeshStandardMaterial({ color: colore, emissive: colore, emissiveIntensity: 0.9, roughness: 0.25, metalness: 0.2, transparent: true, opacity: 0.92 });
    const reliquia = creaReliquia(o.elemento, materiale);
    reliquia.position.set(x, F + 1.75, z);
    scena.add(reliquia);
    const luce = new THREE.Sprite(fiammaMat(colore));
    luce.position.set(x, F + 1.75, z);
    scena.add(luce);
    const teschioBase = creaTeschio({}).gruppo;
    teschioBase.scale.setScalar(2.2);
    teschioBase.position.set(x, F + 1.8, z);
    teschioBase.rotation.y = Math.PI;
    const teschioElemento = creaTeschio({ colore }).gruppo;
    teschioElemento.scale.setScalar(2.2);
    teschioElemento.position.copy(teschioBase.position);
    teschioElemento.rotation.y = Math.PI;
    scena.add(teschioBase, teschioElemento);
    const fascio = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 8).translate(0, 0.5, 0), new THREE.MeshBasicMaterial({ color: colore, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }));
    const statua = statue.get(o.elemento);
    const da = statua.sfera.position.clone();
    const a = teschioBase.position.clone();
    const dir = a.clone().sub(da);
    fascio.position.copy(da);
    fascio.scale.set(1, dir.length(), 1);
    fascio.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    scena.add(fascio);
    piedistalli.set(o.elemento, { reliquia, materiale, luce, teschioBase, teschioElemento, fascio });
  }

  let animeViste = 0;
  function aggiornaAltare(anime, dt, tempo) {
    const pieno = Math.min(1, anime / R.ANIME_ALTARE);
    bagliore.material.opacity = 0.15 + pieno * 0.7;
    bagliore.scale.setScalar(0.8 + pieno * 2.4 + (pieno >= 1 ? Math.sin(tempo * 4) * 0.25 : 0));
    teschio.position.y = quotaTeschio + (pieno >= 1 ? 0.4 + Math.sin(tempo * 2) * 0.08 : 0);
    teschio.rotation.y = Math.PI + (pieno >= 1 ? tempo * 0.8 : 0);
    cerchio.opacity = 0.18 + pieno * 0.55 + Math.sin(tempo * 1.7) * 0.05;
    disco.rotation.y = tempo * 0.05;
    for (let n = Math.min(4, anime - animeViste); n > 0; n--) {
      const libera = scie.find(s => s.t >= 1);
      if (!libera) break;
      const angolo = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * (R.RAGGIO_ALTARE - 2);
      const x = ca.x + Math.cos(angolo) * r;
      const z = ca.z + Math.sin(angolo) * r;
      libera.da.set(x, quota(x, z) + 1, z);
      libera.t = 0;
      libera.sprite.visible = true;
    }
    animeViste = anime;
    for (const s of scie) {
      if (s.t >= 1) continue;
      s.t = Math.min(1, s.t + dt / DURATA_SCIA);
      s.sprite.position.lerpVectors(s.da, teschio.position, s.t * s.t);
      s.sprite.material.opacity = Math.sin(s.t * Math.PI);
      s.sprite.visible = s.t < 1;
    }
  }

  function aggiornaStatue(vista, dt, tempo) {
    const elementi = vista.palude?.elementi;
    const conTeschio = vista.giocatori.some(g => g.armi?.some(a => a.startsWith('teschio')));
    for (const e of ELEMENTI_RELIQUIE) {
      const el = elementi?.[e];
      const s = statue.get(e);
      const p = piedistalli.get(e);
      const accesa = (el?.passo ?? 0) >= PASSO.ACCESA ? 1 : 0;
      const prima = s.accesa;
      s.accesa += (accesa - s.accesa) * Math.min(1, dt * 0.8);
      const sveglio = conTeschio ? 0.12 : 0.03;
      const forza = sveglio + s.accesa * (1.8 + Math.sin(tempo * 2.2 + e.length) * 0.35);
      s.materiale.emissiveIntensity = forza;
      s.sfera.material.emissiveIntensity = 0.15 + s.accesa * 3 + (el?.da ? 0.4 : 0);
      s.aura.material.opacity = 0.1 + s.accesa * 0.75;
      s.aura.scale.setScalar(0.8 + s.accesa * 2.4 + Math.sin(tempo * 3) * 0.15 * s.accesa);
      for (const o of s.occhi) {
        o.material.opacity = 0.15 + s.accesa * 0.85;
        o.scale.setScalar(0.18 + s.accesa * 0.22);
      }
      const accensione = accesa && s.accesa < 0.95 ? Math.sin(Math.min(1, s.accesa) * Math.PI) : 0;
      s.colonnaLuce.material.opacity = accensione * 0.5 + s.accesa * 0.05;
      if (prima < 0.05 && s.accesa >= 0.05) s.colonnaLuce.scale.setScalar(1);
      const passo = el?.passo ?? 0;
      const libera = !el?.da;
      const rimessa = passo === PASSO.ACCESA;
      p.reliquia.visible = libera || rimessa || passo === PASSO.INFUSIONE || passo === PASSO.PRONTO || passo === PASSO.FATTO;
      p.reliquia.rotation.y += dt * (rimessa ? 1.8 : 0.6);
      p.reliquia.position.y = F + 1.75 + Math.sin(tempo * 1.6 + e.length) * 0.06 + (passo >= PASSO.INFUSIONE ? -0.35 : 0);
      p.materiale.emissiveIntensity = libera ? (conTeschio ? 0.9 + Math.sin(tempo * 3) * 0.3 : 0.25) : 2.2;
      p.luce.material.opacity = libera ? (conTeschio ? 0.45 : 0.1) : rimessa ? 0.8 : 0.3;
      p.luce.scale.setScalar(libera ? 0.9 : 1.6);
      p.teschioBase.visible = passo === PASSO.INFUSIONE;
      p.teschioElemento.visible = passo === PASSO.PRONTO;
      p.fascio.visible = passo === PASSO.INFUSIONE;
      p.fascio.material.opacity = 0.45 + Math.sin(tempo * 18) * 0.25;
      for (const t of [p.teschioBase, p.teschioElemento]) {
        t.position.y = F + 1.95 + Math.sin(tempo * 2.2) * 0.06;
        t.rotation.y = Math.PI + Math.sin(tempo * 0.7) * 0.4;
      }
    }
  }

  return {
    luci: [
      ...ELEMENTI_RELIQUIE.map(elemento => {
        const o = OSTACOLI.find(q => q.tipo === 'statua' && q.elemento === elemento);
        const { x, z } = centroDi(o);
        return { x, z: z - 2.4, y: F + 4.2, colore: COLORI_ELEMENTI[elemento], intensita: 24, portata: 18, elemento };
      }),
      { x: -51, z: -9, y: F + 1.8, colore: 0xff9a4a, intensita: 9, portata: 12, tremola: true },
      { x: -41, z: 1, y: F + 1.8, colore: 0xff9a4a, intensita: 9, portata: 12, tremola: true },
    ],
    aggiorna(vista, dt, tempo) {
      aggiornaAltare(vista.palude?.altare ?? 0, dt, tempo);
      aggiornaStatue(vista, dt, tempo);
      for (const [i, b] of bracieri.entries()) {
        b.fiamme.forEach((s, k) => s.scale.set(0.45 + Math.sin(tempo * 13 + k * 2 + i) * 0.1, 0.85 + Math.sin(tempo * 9 + k + i) * 0.22, 1));
      }
      torce.forEach((s, i) => s.scale.set(0.5 + Math.sin(tempo * 11 + i) * 0.08, 0.75 + Math.sin(tempo * 8 + i * 2) * 0.15, 1));
      for (let i = 0; i < 90; i++) {
        const k = i * 3;
        posPolvere[k] = basePolvere[k] + Math.sin(tempo * 0.2 + i) * 0.4;
        posPolvere[k + 1] = F + ((basePolvere[k + 1] - F + tempo * 0.12) % (T - F));
        posPolvere[k + 2] = basePolvere[k + 2] + Math.cos(tempo * 0.15 + i) * 0.4;
      }
      polvere.attributes.position.needsUpdate = true;
    },
    statuaAccesa: (vista, elemento) => (vista.palude?.elementi?.[elemento]?.passo ?? 0) >= PASSO.ACCESA,
  };
}
