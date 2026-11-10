import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { tela, texturaSeta } from './tele.js';
import { DURATA_CALA, DURATA_SALITA } from '../../palude.js';

const RAGNI_MASSIMI = 40;
const ZAMPE_PER_LATO = 4;
const ZAMPE = ZAMPE_PER_LATO * 2;
const COSCIA = 0.5;
const TIBIA = 0.74;
const ALTEZZA_ANCA = 0.5;
const PASSO_ZAMPA = 0.4;
const SOLLEVA_ZAMPA = 0.15;
const APERTURA = Object.freeze([0.78, 0.26, -0.26, -0.78]);
const ALLUNGO = Object.freeze([1.02, 0.86, 0.86, 1.02]);
const RAGGIO_COSCIA = 0.024;
const RAGGIO_TIBIA = 0.013;
const RESPIRO = 0.045;
const SCALA_ARACHNE = 5.2;
const SOFFITTO_TANA = 12;
const GHIACCIO = new THREE.Color(0x9fdcff);
const BIANCO = new THREE.Color(0xffffff);
const SU = new THREE.Vector3(0, 1, 0);
const ASSE_Y = new THREE.Vector3(0, 1, 0);
const NASCOSTA = new THREE.Matrix4().makeScale(0, 0, 0);
const vuotoMixer = () => ({ timeScale: 1, update() {}, stopAllAction() {}, uncacheRoot() {} });

const texturaChitina = () => tela(128, 128, (c, l, a, caso) => {
  c.fillStyle = '#1b1612';
  c.fillRect(0, 0, l, a);
  for (let i = 0; i < 70; i++) {
    c.fillStyle = `rgba(${90 + caso() * 60}, ${80 + caso() * 50}, ${60 + caso() * 30}, ${0.12 + caso() * 0.2})`;
    c.beginPath();
    c.ellipse(caso() * l, caso() * a, 2 + caso() * 9, 1 + caso() * 4, caso() * 3, 0, Math.PI * 2);
    c.fill();
  }
  c.strokeStyle = 'rgba(160, 150, 120, 0.25)';
  for (let i = 0; i < 260; i++) {
    const x = caso() * l;
    const y = caso() * a;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + (caso() - 0.5) * 4, y + 2 + caso() * 4);
    c.stroke();
  }
});

const texturaAddome = () => tela(256, 256, (c, l, a, caso) => {
  const fondo = c.createLinearGradient(0, 0, 0, a);
  fondo.addColorStop(0, '#ffb347');
  fondo.addColorStop(0.45, '#ff7a12');
  fondo.addColorStop(1, '#c2410c');
  c.fillStyle = fondo;
  c.fillRect(0, 0, l, a);
  c.fillStyle = 'rgba(20, 8, 4, 0.92)';
  for (let i = 0; i < 6; i++) {
    const y = a * (0.12 + i * 0.13);
    const largo = l * (0.1 + 0.05 * Math.sin(i * 0.9 + 1));
    for (const x of [l * 0.25, l * 0.75]) {
      c.beginPath();
      c.moveTo(x - largo, y);
      c.lineTo(x, y + a * 0.05);
      c.lineTo(x + largo, y);
      c.lineTo(x, y + a * 0.085);
      c.closePath();
      c.fill();
    }
  }
  c.fillStyle = 'rgba(30, 10, 4, 0.55)';
  c.fillRect(0, 0, l * 0.04, a);
  c.fillRect(l * 0.48, 0, l * 0.04, a);
  for (let i = 0; i < 900; i++) {
    c.fillStyle = caso() < 0.5 ? `rgba(255, 220, 160, ${0.08 + caso() * 0.15})` : `rgba(40, 12, 4, ${0.1 + caso() * 0.2})`;
    c.fillRect(caso() * l, caso() * a, 1, 2 + caso() * 3);
  }
});

let materiali = null;
function materialiRagni() {
  if (materiali) return materiali;
  const chitina = texturaChitina();
  materiali = {
    corpo: new THREE.MeshStandardMaterial({ map: chitina, color: 0x3a2e26, roughness: 0.38, metalness: 0.1 }),
    zampe: new THREE.MeshStandardMaterial({ map: chitina, color: 0x2a221c, roughness: 0.45, metalness: 0.08 }),
    occhi: new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xff1a12, emissiveIntensity: 2.2, roughness: 0.2 }),
    addome: (() => {
      const pelle = texturaAddome();
      return new THREE.MeshStandardMaterial({ map: pelle, emissiveMap: pelle, emissive: 0xff6a10, emissiveIntensity: 0.55, roughness: 0.32, metalness: 0.05 });
    })(),
    zanne: new THREE.MeshStandardMaterial({ color: 0xcfc3a4, roughness: 0.35 }),
    punto: new THREE.MeshStandardMaterial({ color: 0x3a0e04, emissive: 0xff7a1a, emissiveIntensity: 1.2, roughness: 0.3 }),
    seta: new THREE.MeshStandardMaterial({ map: texturaSeta(), color: 0xf2f2ea, emissive: 0x9fd8a0, emissiveIntensity: 0.15, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false, roughness: 0.9 }),
    filo: new THREE.MeshBasicMaterial({ color: 0xe8efe0, transparent: true, opacity: 0.6 }),
  };
  return materiali;
}

function geometriaCorpo() {
  const torace = new THREE.SphereGeometry(0.1, 12, 9).scale(1, 0.62, 1.25).translate(0, 0.5, 0.03);
  const testa = new THREE.SphereGeometry(0.065, 10, 8).scale(1, 0.85, 1).translate(0, 0.5, 0.15);
  const vita = new THREE.CylinderGeometry(0.022, 0.03, 0.14, 6).rotateX(Math.PI / 2 - 0.35).translate(0, 0.53, -0.1);
  const zanne = [-1, 1].map(s => new THREE.ConeGeometry(0.016, 0.1, 5).rotateX(Math.PI * 0.82).translate(s * 0.026, 0.45, 0.21));
  const palpi = [-1, 1].map(s => new THREE.CylinderGeometry(0.008, 0.012, 0.13, 5).rotateX(1.1).rotateZ(s * 0.35).translate(s * 0.045, 0.49, 0.22));
  return mergeGeometries([torace, testa, vita, ...zanne, ...palpi].map(g => g.toNonIndexed()));
}

function geometriaAddome() {
  const sacco = new THREE.SphereGeometry(0.27, 20, 16).scale(0.9, 0.8, 1.32).rotateX(-0.28).translate(0, 0.62, -0.43);
  const filiere = new THREE.ConeGeometry(0.04, 0.1, 6).rotateX(-Math.PI / 2 - 0.5).translate(0, 0.5, -0.78);
  return mergeGeometries([sacco, filiere].map(g => g.toNonIndexed()));
}

function geometriaOcchi() {
  const occhi = [];
  for (let i = 0; i < 4; i++) {
    for (const s of [-1, 1]) occhi.push(new THREE.SphereGeometry(i < 2 ? 0.016 : 0.011, 6, 4).translate(s * (0.016 + i * 0.013), 0.53 + (i % 2) * 0.016, 0.2 - i * 0.008));
  }
  return mergeGeometries(occhi);
}

const geometriaZampa = () => new THREE.CylinderGeometry(0.65, 1, 1, 6, 1).translate(0, 0.5, 0);

const ANCA = new THREE.Vector3();
function anca(lato, k, scala) {
  return ANCA.set(lato * 0.07 * scala, ALTEZZA_ANCA * scala, (0.08 - k * 0.045) * scala);
}

function piede(lato, k, scala, fase, ampiezza, alzata, allungo, esito) {
  const a = APERTURA[k];
  const h = anca(lato, k, scala);
  const gruppo = (k + (lato > 0 ? 1 : 0)) % 2;
  const f = fase + gruppo * Math.PI;
  return esito.set(
    h.x + lato * Math.cos(a) * ALLUNGO[k] * scala * allungo,
    Math.max(0, Math.sin(f)) * SOLLEVA_ZAMPA * scala * alzata,
    h.z + Math.sin(a) * ALLUNGO[k] * scala * allungo + Math.cos(f) * PASSO_ZAMPA * scala * ampiezza * 0.5,
  );
}

const temp = { v: new THREE.Vector3(), w: new THREE.Vector3() };
function ginocchio(h, p, scala, fuori, esito) {
  const l1 = COSCIA * scala;
  const l2 = TIBIA * scala;
  const v = temp.v.subVectors(p, h);
  const d = Math.min(l1 + l2 - 0.001 * scala, Math.max(0.05 * scala, v.length()));
  v.normalize();
  const w = temp.w.copy(SU).addScaledVector(v, -SU.dot(v));
  if (w.lengthSq() < 1e-6) w.copy(fuori);
  w.normalize();
  const a = Math.acos(Math.min(1, Math.max(-1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  return esito.copy(h).addScaledVector(v, Math.cos(a) * l1).addScaledVector(w, Math.sin(a) * l1);
}

const segmento = (() => {
  const dir = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  return (da, a, raggio, esito) => {
    dir.subVectors(a, da);
    const lungo = dir.length() || 1e-4;
    q.setFromUnitVectors(ASSE_Y, dir.multiplyScalar(1 / lungo));
    return esito.compose(da, q, s.set(raggio, lungo, raggio));
  };
})();

const LATI = Object.freeze([-1, 1]);
const zampa = { h: new THREE.Vector3(), p: new THREE.Vector3(), g: new THREE.Vector3(), fuori: new THREE.Vector3(), scarto: new THREE.Vector3() };
function posaZampe(scala, opzioni, emetti) {
  const { fase, ampiezza = 1, alzata = 1, corpo, morto = false, appesa = false, impennata = 0, allungo = 1 } = opzioni;
  const { h, p, g, fuori, scarto } = zampa;
  for (let k = 0; k < ZAMPE_PER_LATO; k++) {
    for (const lato of LATI) {
      h.copy(anca(lato, k, scala)).applyMatrix4(corpo);
      fuori.set(lato, 0, 0);
      if (morto) {
        p.copy(anca(lato, k, scala)).add(scarto.set(lato * 0.12 * scala, 0.12 * scala, 0.05 * scala)).applyMatrix4(corpo);
        g.copy(anca(lato, k, scala)).add(scarto.set(lato * 0.25 * scala, 0.32 * scala, 0)).applyMatrix4(corpo);
      } else if (appesa) {
        p.copy(anca(lato, k, scala)).add(scarto.set(lato * 0.45 * scala, -0.55 * scala, (0.25 - k * 0.15) * scala)).applyMatrix4(corpo);
        ginocchio(h, p, scala, fuori, g);
      } else {
        piede(lato, k, scala, fase, ampiezza, alzata, allungo, p);
        if (impennata > 0 && k < 2) p.set(h.x + lato * 0.35 * scala, h.y + (0.55 - k * 0.2) * scala * impennata, h.z + 0.4 * scala);
        ginocchio(h, p, scala, fuori, g);
      }
      emetti(k * 2 + (lato > 0 ? 1 : 0), h, g, p);
    }
  }
}

const telaio = { t: new THREE.Matrix4(), r: new THREE.Matrix4() };
function telaioCorpo(m, altezza, beccheggio, rollio, alzo) {
  const { t, r } = telaio;
  t.makeTranslation(0, altezza + alzo, 0);
  t.multiply(r.makeRotationX(beccheggio));
  t.multiply(r.makeRotationZ(rollio));
  t.multiply(r.makeTranslation(0, -altezza, 0));
  return m.multiply(t);
}

function creaBranco(scena) {
  const mat = materialiRagni();
  const corpo = new THREE.InstancedMesh(geometriaCorpo(), mat.corpo, RAGNI_MASSIMI);
  const addome = new THREE.InstancedMesh(geometriaAddome(), mat.addome, RAGNI_MASSIMI);
  const occhi = new THREE.InstancedMesh(geometriaOcchi(), mat.occhi, RAGNI_MASSIMI);
  const zampe = new THREE.InstancedMesh(geometriaZampa(), mat.zampe, RAGNI_MASSIMI * ZAMPE * 2);
  for (const m of [corpo, addome, occhi, zampe]) {
    m.frustumCulled = false;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < m.count; i++) m.setMatrixAt(i, NASCOSTA);
    scena.add(m);
  }
  for (let i = 0; i < corpo.count; i++) {
    corpo.setColorAt(i, BIANCO);
    addome.setColorAt(i, BIANCO);
  }
  for (let i = 0; i < zampe.count; i++) zampe.setColorAt(i, BIANCO);
  const liberi = Array.from({ length: RAGNI_MASSIMI }, (_, i) => RAGNI_MASSIMI - 1 - i);
  const stato = new Map();
  const m = new THREE.Matrix4();
  const b = new THREE.Matrix4();
  const s = new THREE.Matrix4();
  const relativo = new THREE.Matrix4();
  const pezzo = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const colore = new THREE.Color();
  const mesh = [corpo, addome, occhi, zampe];
  const gonfia = new THREE.Matrix4();
  const centroAddome = new THREE.Vector3(0, 0.62, -0.43);
  const opzioni = { fase: 0, corpo: relativo, morto: false, impennata: 0 };
  let base = 0;
  const emetti = (i, h, g, p) => {
    zampe.setMatrixAt(base + i * 2, s.multiplyMatrices(m, segmento(h, g, RAGGIO_COSCIA, pezzo)));
    zampe.setMatrixAt(base + i * 2 + 1, s.multiplyMatrices(m, segmento(g, p, RAGGIO_TIBIA, pezzo)));
    zampe.setColorAt(base + i * 2, colore);
    zampe.setColorAt(base + i * 2 + 1, colore);
  };
  let sporco = false;

  function nascondi(slot) {
    corpo.setMatrixAt(slot, NASCOSTA);
    addome.setMatrixAt(slot, NASCOSTA);
    occhi.setMatrixAt(slot, NASCOSTA);
    for (let k = 0; k < ZAMPE * 2; k++) zampe.setMatrixAt(slot * ZAMPE * 2 + k, NASCOSTA);
    sporco = true;
  }

  return {
    prendi() {
      const slot = liberi.pop();
      if (slot === undefined) return null;
      stato.set(slot, { fase: Math.random() * 6, ultimo: new THREE.Vector3(), primo: true, morto: 0 });
      return slot;
    },
    libera(slot) {
      if (slot === null) return;
      nascondi(slot);
      stato.delete(slot);
      liberi.push(slot);
    },
    posa(slot, ancora, z, dt) {
      if (slot === null) return;
      const st = stato.get(slot);
      (ancora.parent ?? ancora).updateMatrixWorld(true);
      m.copy(ancora.matrixWorld);
      pos.setFromMatrixPosition(m);
      const mosso = st.primo ? 0 : Math.hypot(pos.x - st.ultimo.x, pos.z - st.ultimo.z);
      st.ultimo.copy(pos);
      st.primo = false;
      st.fase += (mosso / (PASSO_ZAMPA * 0.5)) * Math.PI * 0.5 + (z.stato === 'assi' || z.stato === 'emerge' ? dt * 9 : 0);
      const attacco = z.stato === 'attacco' || z.stato === 'assi' ? 1 : 0;
      st.morto = z.stato === 'morto' ? Math.min(1, st.morto + dt * 3) : 0;
      relativo.identity();
      telaioCorpo(relativo, ALTEZZA_ANCA, -0.35 * attacco, st.morto * Math.PI, st.morto * 0.25);
      b.multiplyMatrices(m, relativo);
      corpo.setMatrixAt(slot, b);
      occhi.setMatrixAt(slot, b);
      const respiro = 1 + RESPIRO * Math.sin(performance.now() / 260 + slot * 1.7) * (st.morto > 0 ? 0 : 1);
      gonfia.makeTranslation(centroAddome.x, centroAddome.y, centroAddome.z).multiply(s.makeScale(respiro, respiro, respiro)).multiply(pezzo.makeTranslation(-centroAddome.x, -centroAddome.y, -centroAddome.z));
      addome.setMatrixAt(slot, pezzo.multiplyMatrices(b, gonfia));
      colore.copy(BIANCO).lerp(GHIACCIO, Math.min(1, z.gelo ?? 0) * 0.8);
      corpo.setColorAt(slot, colore);
      addome.setColorAt(slot, colore);
      Object.assign(opzioni, { fase: st.fase, morto: st.morto > 0.5, impennata: attacco * 0.6 });
      base = slot * ZAMPE * 2;
      posaZampe(1, opzioni, emetti);
      sporco = true;
    },
    chiudiFotogramma() {
      if (!sporco) return;
      for (const m of mesh) m.instanceMatrix.needsUpdate = true;
      corpo.instanceColor.needsUpdate = true;
      addome.instanceColor.needsUpdate = true;
      zampe.instanceColor.needsUpdate = true;
      sporco = false;
    },
  };
}

const branchi = new WeakMap();
export function preparaRagni(scena) {
  if (!branchi.has(scena)) branchi.set(scena, creaBranco(scena));
  return branchi.get(scena);
}

function costruisciRagno(z, radice, scena) {
  const branco = preparaRagni(scena);
  const slot = branco.prendi();
  const corpo = new THREE.Group();
  const testa = new THREE.Object3D();
  testa.position.set(0, 0.62, -0.43);
  corpo.add(testa);
  radice.add(corpo);
  return {
    corpo, testa, mixer: vuotoMixer(),
    anima: (zz, dt) => {
      branco.posa(slot, corpo, zz, dt);
      branco.chiudiFotogramma();
    },
    chiudi: () => {
      branco.libera(slot);
      branco.chiudiFotogramma();
    },
  };
}

function costruisciArachne(z, radice) {
  const mat = materialiRagni();
  const S = SCALA_ARACHNE;
  const corpo = new THREE.Group();
  const busto = new THREE.Group();
  corpo.add(busto);
  const mesh = (g, m, x, y, zz) => {
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, zz);
    busto.add(o);
    return o;
  };
  mesh(new THREE.SphereGeometry(0.3 * S, 36, 26).scale(0.92, 0.82, 1.32).rotateX(-0.28), mat.addome, 0, 0.64 * S, -0.46 * S);
  mesh(new THREE.ConeGeometry(0.05 * S, 0.12 * S, 8).rotateX(-Math.PI / 2 - 0.5), mat.corpo, 0, 0.5 * S, -0.84 * S);
  mesh(new THREE.SphereGeometry(0.12 * S, 24, 16).scale(1, 0.62, 1.25), mat.corpo, 0, 0.5 * S, 0.03 * S);
  mesh(new THREE.SphereGeometry(0.08 * S, 20, 14).scale(1, 0.85, 1), mat.corpo, 0, 0.5 * S, 0.17 * S);
  mesh(new THREE.CylinderGeometry(0.028 * S, 0.036 * S, 0.16 * S, 8).rotateX(Math.PI / 2 - 0.35), mat.corpo, 0, 0.54 * S, -0.11 * S);
  mesh(geometriaOcchi().scale(S, S, S).translate(0, 0, 0.02 * S), mat.occhi, 0, 0, 0);
  for (const s of [-1, 1]) {
    const zanna = mesh(new THREE.ConeGeometry(0.022 * S, 0.14 * S, 8), mat.zanne, s * 0.03 * S, 0.44 * S, 0.24 * S);
    zanna.rotation.x = Math.PI * 0.82;
  }
  const punto = mesh(new THREE.SphereGeometry(0.1 * S, 18, 12).scale(1.2, 0.6, 1.4), mat.punto, 0, 0.42 * S, -0.5 * S);
  const seta = mesh(new THREE.SphereGeometry(0.42 * S, 24, 16).scale(1, 0.8, 1.6), mat.seta, 0, 0.58 * S, -0.3 * S);
  const testa = new THREE.Object3D();
  testa.position.set(0, 0.5 * S, 0.2 * S);
  busto.add(testa);
  const filo = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1, 6).translate(0, 0.5, 0), mat.filo);
  corpo.add(filo);
  const zampa = geometriaZampa();
  const zampe = Array.from({ length: ZAMPE * 2 }, (_, i) => {
    const o = new THREE.Mesh(zampa, mat.zampe);
    o.matrixAutoUpdate = false;
    corpo.add(o);
    return o;
  });
  radice.add(corpo);
  let fase = 0;
  let ultimo = null;
  let morto = 0;
  let impennata = 0;
  const m = new THREE.Matrix4();
  const tana = { fase: 0, azione: '', timer: 0, vulnerabile: 0 };
  return {
    corpo, testa, mixer: vuotoMixer(),
    anima: (zz, dt, vista) => {
      Object.assign(tana, vista?.palude?.tana ?? {});
      const mosso = ultimo ? Math.hypot(zz.x - ultimo.x, zz.z - ultimo.z) : 0;
      ultimo = { x: zz.x, z: zz.z };
      fase += (mosso / (PASSO_ZAMPA * 0.5 * S)) * Math.PI * 0.5;
      morto = zz.stato === 'morto' || tana.azione === 'crollo' ? Math.min(1, morto + dt * 1.5) : 0;
      const voluta = tana.azione === 'impennata' ? 1 : tana.azione === 'urlo' ? 0.55 : 0;
      impennata += (voluta - impennata) * Math.min(1, dt * 5);
      let alto = 0;
      let capovolta = 0;
      let appesa = false;
      if (tana.azione === 'cala') {
        alto = 9.5 * (Math.max(0, tana.timer) / DURATA_CALA) ** 1.3;
        appesa = alto > 0.4;
      } else if (tana.azione === 'sale') {
        const f = 1 - Math.max(0, tana.timer) / DURATA_SALITA;
        alto = f * (SOFFITTO_TANA - 0.3);
        capovolta = Math.min(1, Math.max(0, (f - 0.6) / 0.4));
        appesa = f < 0.6;
      } else if (tana.azione === 'soffitto') {
        alto = SOFFITTO_TANA;
        capovolta = 1;
      }
      corpo.position.y = alto;
      corpo.rotation.z = capovolta * Math.PI;
      const tremito = tana.azione === 'stordita' ? Math.sin(performance.now() / 40) * 0.04 : 0;
      const abbassa = tana.azione === 'scatto' ? -0.35 : tana.azione === 'stordita' ? -0.55 : 0;
      m.identity();
      telaioCorpo(m, ALTEZZA_ANCA * S, -0.95 * impennata + tremito, morto * Math.PI, abbassa + morto * 0.6);
      busto.matrixAutoUpdate = false;
      busto.matrix.copy(m);
      seta.visible = tana.fase === 1 && tana.vulnerabile <= 0 && zz.stato !== 'morto';
      punto.material.emissiveIntensity = 0.8 + impennata * 3 + Math.sin(performance.now() / 160) * 0.4;
      filo.visible = alto > 0.2 && capovolta < 1;
      filo.position.y = ALTEZZA_ANCA * S * 0.9;
      filo.scale.y = Math.max(0.01, SOFFITTO_TANA - alto - ALTEZZA_ANCA * S * 0.9);
      posaZampe(S, {
        fase, corpo: m, morto: morto > 0.4, appesa, impennata, ampiezza: tana.azione === 'scatto' ? 1.4 : 1, alzata: tana.azione === 'stordita' ? 0 : 1,
        allungo: tana.azione === 'stordita' ? 1.25 : 1,
      }, (i, h, g, p) => {
        segmento(h, g, RAGGIO_COSCIA * S, zampe[i * 2].matrix);
        segmento(g, p, RAGGIO_TIBIA * S, zampe[i * 2 + 1].matrix);
      });
    },
  };
}

function modelloDiProva(geometria, materiale) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geometria, materiale));
  return g;
}

export const PROCEDURALI = Object.freeze({
  ragno: {
    dati: Object.freeze({ alto: 0.85, raggio: 0.42, raggioTesta: 0.3, sollevabile: true, procedurale: true }),
    get modello() { return modelloDiProva(geometriaCorpo(), materialiRagni().corpo); },
    costruisci: costruisciRagno,
  },
  arachne: {
    dati: Object.freeze({ alto: 3.2, raggio: 2.1, raggioTesta: 1.1, procedurale: true }),
    get modello() { return modelloDiProva(new THREE.SphereGeometry(1, 12, 8), materialiRagni().addome); },
    costruisci: costruisciArachne,
  },
});

const piastra = new THREE.MeshStandardMaterial({ color: 0x4d5258, metalness: 0.75, roughness: 0.45 });
const ruggine = new THREE.MeshStandardMaterial({ color: 0x5a3a26, metalness: 0.3, roughness: 0.8 });

export function decoraBruto(corpo, { testa, busto }) {
  if (testa) {
    const elmo = new THREE.Mesh(new THREE.SphereGeometry(13, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), piastra);
    elmo.position.set(0, 9, 1);
    const visiera = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 4), ruggine);
    visiera.position.set(0, 8, 11);
    testa.add(elmo, visiera);
  }
  if (busto) {
    const petto = new THREE.Mesh(new THREE.BoxGeometry(36, 30, 7), piastra);
    petto.position.set(0, 4, 13);
    const schiena = new THREE.Mesh(new THREE.BoxGeometry(34, 28, 6), ruggine);
    schiena.position.set(0, 4, -13);
    busto.add(petto, schiena);
    for (const s of [-1, 1]) {
      const spalla = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), piastra);
      spalla.position.set(s * 20, 14, 0);
      spalla.rotation.z = -s * 0.5;
      busto.add(spalla);
    }
  }
}

