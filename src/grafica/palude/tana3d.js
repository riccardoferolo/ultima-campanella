import * as THREE from 'three';
import { MISSIONE } from '../../mappe/palude.js';
import { ZONE } from '../../mappa.js';
import { creaCaso } from '../caso-grafica.js';
import { texturaRagnatela, texturaSeta } from './tele.js';

const SOFFITTO = 12;
const BUCO = 3.2;
const STALATTITI = 90;
const ROCCE_PARETE = 120;
const OSSA = 70;
const RAGNATELE = 12;
const MASSI_CROLLO = 22;
const CASCATE = 3;
const BOLLE = 10;
const ALTEZZA_ISOLE = 0.35;
const GRAVITA = 14;

export function creaTana(scena, { mat, alone, pezzo, cubo, statico }) {
  const zona = ZONE.find(z => z.grotta);
  if (!zona) return { aggiorna() {}, scossa: () => 0 };
  const caso = creaCaso(9191);
  const A = MISSIONE.ARENA;
  const roccia = mat.roccia.clone();
  roccia.color.setHex(0xa8ac9a);
  roccia.emissive = new THREE.Color(0x141811);
  const rocciaChiara = roccia.clone();
  rocciaChiara.color.setHex(0xd2d0bc);
  rocciaChiara.emissive = new THREE.Color(0x1c2116);
  const seta = new THREE.MeshStandardMaterial({ map: texturaSeta(), color: 0xf0f2ea, emissive: 0x6fa070, emissiveIntensity: 0.25, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false, roughness: 0.9 });
  const vene = new THREE.MeshStandardMaterial({ color: 0x2a0608, emissive: 0xc0182a, emissiveIntensity: 0.6, roughness: 0.4 });
  const acido = new THREE.MeshStandardMaterial({ color: 0x1a3a08, emissive: 0x5dff2a, emissiveIntensity: 0.9, roughness: 0.05, transparent: true, opacity: 0.9 });
  const osso = mat.osso;
  const sprite = (colore, scala, opacita = 0.8) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: colore, transparent: true, opacity: opacita, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.setScalar(scala);
    scena.add(s);
    return s;
  };

  const terreno = new THREE.PlaneGeometry(zona.x1 - zona.x0, zona.z1 - zona.z0, 24, 24).rotateX(-Math.PI / 2);
  const uv = terreno.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 12, uv.getY(i) * 12);
  statico.aggiungi(roccia, terreno.translate((zona.x0 + zona.x1) / 2, 0, (zona.z0 + zona.z1) / 2));
  const forma = new THREE.Shape();
  forma.moveTo(zona.x0 - A.x, zona.z0 - A.z);
  forma.lineTo(zona.x1 - A.x, zona.z0 - A.z);
  forma.lineTo(zona.x1 - A.x, zona.z1 - A.z);
  forma.lineTo(zona.x0 - A.x, zona.z1 - A.z);
  forma.closePath();
  const foro = new THREE.Path();
  foro.absarc(0, 0, BUCO, 0, Math.PI * 2, true);
  forma.holes.push(foro);
  const volta = new THREE.ShapeGeometry(forma, 24).rotateX(Math.PI / 2);
  const uvVolta = volta.attributes.uv;
  for (let i = 0; i < uvVolta.count; i++) uvVolta.setXY(i, uvVolta.getX(i) / 4, uvVolta.getY(i) / 4);
  statico.aggiungi(roccia, volta.translate(A.x, SOFFITTO, A.z));
  const rocciaDoppia = roccia.clone();
  rocciaDoppia.side = THREE.DoubleSide;
  statico.aggiungi(rocciaDoppia, new THREE.CylinderGeometry(BUCO, BUCO * 1.4, 10, 20, 1, true).translate(A.x, SOFFITTO + 5, A.z));

  for (const lato of [[zona.x0, zona.z0, zona.x0, zona.z1], [zona.x1, zona.z0, zona.x1, zona.z1], [zona.x0, zona.z0, zona.x1, zona.z0], [zona.x0, zona.z1, zona.x1, zona.z1]]) {
    const [x0, z0, x1, z1] = lato;
    cubo(roccia, Math.min(x0, x1) - 0.4, 0, Math.min(z0, z1) - 0.4, Math.max(x0, x1) + 0.4, SOFFITTO + 0.5, Math.max(z0, z1) + 0.4, 4);
  }
  const masso = new THREE.IcosahedronGeometry(1, 1);
  const pos = masso.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setXYZ(i, pos.getX(i) * (0.8 + caso() * 0.4), pos.getY(i) * (0.8 + caso() * 0.4), pos.getZ(i) * (0.8 + caso() * 0.4));
  masso.computeVertexNormals();
  const matrici = [];
  const metti = (x, y, z, s, sy = s) => matrici.push(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(caso() * 3, caso() * 3, caso() * 3)), new THREE.Vector3(s, sy, s)));
  for (const o of [[-20, -142], [20, -142], [-20, -102], [20, -102]]) {
    for (let k = 0; k < 7; k++) metti(o[0] + (caso() - 0.5) * 7, caso() * SOFFITTO, o[1] + (caso() - 0.5) * 7, 3 + caso() * 2.5);
    cubo(roccia, o[0] - 4, 0, o[1] - 4, o[0] + 4, SOFFITTO, o[1] + 4, 4);
  }
  for (let i = 0; i < ROCCE_PARETE; i++) {
    const t = caso();
    const lato = Math.floor(caso() * 4);
    const x = lato < 2 ? (lato === 0 ? zona.x0 + 0.4 : zona.x1 - 0.4) : zona.x0 + t * (zona.x1 - zona.x0);
    const z = lato >= 2 ? (lato === 2 ? zona.z0 + 0.4 : zona.z1 - 0.4) : zona.z0 + t * (zona.z1 - zona.z0);
    metti(x, caso() * SOFFITTO, z, 0.8 + caso() * 1.6);
  }
  const rocce = new THREE.InstancedMesh(masso, roccia, matrici.length);
  matrici.forEach((m, i) => rocce.setMatrixAt(i, m));
  scena.add(rocce);

  const cono = new THREE.ConeGeometry(1, 1, 7).rotateX(Math.PI).translate(0, -0.5, 0);
  const punte = [];
  for (let i = 0; i < STALATTITI * 3 && punte.length < STALATTITI; i++) {
    const x = zona.x0 + 1 + caso() * (zona.x1 - zona.x0 - 2);
    const z = zona.z0 + 1 + caso() * (zona.z1 - zona.z0 - 2);
    if (Math.hypot(x - A.x, z - A.z) < BUCO + 1.5) continue;
    const lungo = 0.8 + caso() ** 2 * 3.2;
    punte.push(new THREE.Matrix4().compose(new THREE.Vector3(x, SOFFITTO, z), new THREE.Quaternion(), new THREE.Vector3(0.18 + lungo * 0.12, lungo, 0.18 + lungo * 0.12)));
  }
  const stalattiti = new THREE.InstancedMesh(cono, roccia, punte.length);
  punte.forEach((m, i) => stalattiti.setMatrixAt(i, m));
  scena.add(stalattiti);

  for (let i = 0; i < 9; i++) {
    const lato = i % 4;
    const punti = [];
    const base = lato < 2 ? (lato === 0 ? zona.x0 + 0.5 : zona.x1 - 0.5) : lato === 2 ? zona.z0 + 0.5 : zona.z1 - 0.5;
    const inizio = (lato < 2 ? zona.z0 + 8 : zona.x0 + 8) + caso() * 30;
    for (let k = 0; k < 6; k++) {
      const lungo = inizio + k * 1.8 + (caso() - 0.5);
      const alto = 0.5 + k * 1.7 + (caso() - 0.5) * 1.2;
      punti.push(lato < 2 ? new THREE.Vector3(base, alto, lungo) : new THREE.Vector3(lungo, alto, base));
    }
    statico.aggiungi(vene, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), 24, 0.09 + caso() * 0.07, 5));
  }

  const isole = MISSIONE.ISOLE.map(i => {
    statico.aggiungi(rocciaChiara, new THREE.CylinderGeometry(i.raggio, i.raggio + 0.35, ALTEZZA_ISOLE, 22).translate(i.x, ALTEZZA_ISOLE / 2, i.z));
    return i;
  });
  for (const { da, a, largo } of MISSIONE.PONTI) {
    const lungo = Math.hypot(a.x - da.x, a.z - da.z);
    pezzo(rocciaChiara, new THREE.BoxGeometry(largo * 2, ALTEZZA_ISOLE * 0.85, lungo, 2, 1, 6), (da.x + a.x) / 2, ALTEZZA_ISOLE * 0.42, (da.z + a.z) / 2, Math.atan2(a.x - da.x, a.z - da.z));
  }
  for (const p of MISSIONE.POZZE_ACIDO) {
    pezzo(acido, new THREE.CircleGeometry(p.raggio, 28).rotateX(-Math.PI / 2), p.x, 0.03, p.z);
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2;
      pezzo(roccia, new THREE.IcosahedronGeometry(0.35 + caso() * 0.2, 0), p.x + Math.cos(a) * (p.raggio + 0.2), 0.1, p.z + Math.sin(a) * (p.raggio + 0.2), caso() * 3);
    }
  }
  const bolle = Array.from({ length: BOLLE }, (_, i) => {
    const s = sprite(0x9dff5a, 0.3, 0);
    return { s, pozza: MISSIONE.POZZE_ACIDO[i % MISSIONE.POZZE_ACIDO.length], fase: caso() * 3 };
  });

  const ossa = [];
  for (let i = 0; i < OSSA; i++) {
    const x = zona.x0 + 2 + caso() * (zona.x1 - zona.x0 - 4);
    const z = zona.z0 + 2 + caso() * (zona.z1 - zona.z0 - 4);
    ossa.push(new THREE.Matrix4().compose(new THREE.Vector3(x, 0.05, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, caso() * 6, 0)), new THREE.Vector3(1, 0.5 + caso(), 1)));
  }
  const mucchio = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.035, 0.045, 0.45, 5), osso, ossa.length);
  ossa.forEach((m, i) => mucchio.setMatrixAt(i, m));
  scena.add(mucchio);

  const trama = texturaRagnatela();
  for (let i = 0; i < RAGNATELE; i++) {
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: trama, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }));
    const angolo = i % 4;
    const cx = angolo % 2 ? zona.x1 - 4 : zona.x0 + 4;
    const cz = angolo < 2 ? zona.z0 + 4 : zona.z1 - 4;
    tela.position.set(cx + (caso() - 0.5) * 6, 4 + caso() * 7, cz + (caso() - 0.5) * 6);
    tela.rotation.set((caso() - 0.5) * 1.2, caso() * 3, (caso() - 0.5) * 0.6);
    tela.scale.setScalar(4 + caso() * 5);
    scena.add(tela);
  }

  const bozzoli = MISSIONE.BOZZOLI.map(b => {
    const filo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, SOFFITTO - 3.3, 5), seta);
    filo.position.set(b.x, 3.3 + (SOFFITTO - 3.3) / 2, b.z);
    const sacco = new THREE.Mesh(new THREE.SphereGeometry(0.75, 18, 14).scale(0.85, 1.3, 0.85), seta);
    sacco.position.set(b.x, 2.5, b.z);
    const cuore = sprite(0xd8ff7a, 1.6, 0.5);
    cuore.position.set(b.x, 2.5, b.z);
    scena.add(filo, sacco);
    return { sacco, cuore, scala: 1 };
  });

  const acquaMat = mat.acqua.clone();
  acquaMat.color.setHex(0x41563a);
  acquaMat.transparent = true;
  acquaMat.opacity = 0.92;
  const piena = new THREE.Mesh(new THREE.PlaneGeometry(zona.x1 - zona.x0, zona.z1 - zona.z0).rotateX(-Math.PI / 2), acquaMat);
  piena.position.set((zona.x0 + zona.x1) / 2, -0.3, (zona.z0 + zona.z1) / 2);
  piena.visible = false;
  scena.add(piena);
  const cascate = Array.from({ length: CASCATE }, (_, i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(3.5, SOFFITTO - 2), mat.corrente.clone());
    m.material.map = mat.corrente.map.clone();
    m.material.map.repeat.set(1, 3);
    m.material.map.needsUpdate = true;
    const lato = [zona.x0 + 0.5, zona.x1 - 0.5, null][i];
    if (lato === null) m.position.set(A.x + 6, (SOFFITTO - 2) / 2 + 0.5, zona.z0 + 0.5);
    else m.position.set(lato, (SOFFITTO - 2) / 2 + 0.5, A.z + (i ? 6 : -6));
    m.rotation.y = lato === null ? 0 : Math.PI / 2;
    m.visible = false;
    scena.add(m);
    return m;
  });

  const lumeBuco = sprite(0xcfe8d0, 7, 0.35);
  lumeBuco.position.set(A.x, SOFFITTO + 1, A.z);

  const massi = Array.from({ length: MASSI_CROLLO }, () => {
    const m = new THREE.Mesh(masso, roccia);
    m.visible = false;
    scena.add(m);
    return { m, v: 0, ritardo: 0, fermo: false };
  });
  const polveri = Array.from({ length: 8 }, () => {
    const s = sprite(0x9a9080, 4, 0);
    s.material.blending = THREE.NormalBlending;
    return s;
  });
  let crollo = null;
  let scossa = 0;
  let ultimaAzione = '';
  let ultimaArachne = { x: A.x, z: A.z };

  function iniziaCrollo(punto) {
    crollo = { tempo: 0, punto };
    massi.forEach(r => {
      Object.assign(r, { v: 0, ritardo: caso() * 2.2, fermo: false });
      r.m.position.set(punto.x + (caso() - 0.5) * 9, SOFFITTO + 2 + caso() * 4, punto.z + (caso() - 0.5) * 9);
      r.m.scale.setScalar(0.8 + caso() * 1.6);
      r.m.rotation.set(caso() * 3, caso() * 3, caso() * 3);
      r.m.visible = true;
    });
  }

  function aggiornaCrollo(dt) {
    crollo.tempo += dt;
    for (const r of massi) {
      if (r.fermo || crollo.tempo < r.ritardo) continue;
      r.v += GRAVITA * dt;
      r.m.position.y -= r.v * dt;
      r.m.rotation.x += dt * 2;
      const fondo = r.m.scale.x * 0.6;
      if (r.m.position.y > fondo) continue;
      r.m.position.y = fondo;
      r.fermo = true;
      scossa = Math.max(scossa, 0.35);
    }
    polveri.forEach((p, i) => {
      p.position.set(crollo.punto.x + Math.cos(i) * 3, 1 + (crollo.tempo * 0.6 % 3), crollo.punto.z + Math.sin(i) * 3);
      p.scale.setScalar(3 + crollo.tempo * 1.5);
      p.material.opacity = Math.min(0.5, crollo.tempo * 0.3) * Math.max(0, 1 - crollo.tempo / 8);
    });
  }

  return {
    scossa: () => scossa,
    aggiorna(vista, dt, tempo) {
      const tana = vista.palude?.tana;
      if (!tana) return;
      scossa = Math.max(0, scossa - dt * 0.6);
      const arachne = vista.zombie.find(z => z.tipo === 'arachne');
      if (arachne) ultimaArachne = { x: arachne.x, z: arachne.z };
      if (ultimaAzione === 'impennata' && tana.azione === 'attesa') scossa = Math.max(scossa, 0.25);
      if (tana.azione === 'urlo' || tana.azione === 'scatto') scossa = Math.max(scossa, 0.08);
      if (tana.azione === 'crollo' && !crollo) iniziaCrollo(ultimaArachne);
      if (tana.azione !== 'crollo' && crollo) {
        crollo = null;
        massi.forEach(r => { r.m.visible = false; });
        polveri.forEach(p => { p.material.opacity = 0; });
      }
      if (crollo) {
        aggiornaCrollo(dt);
        scossa = Math.max(scossa, crollo.tempo < 4 ? 0.12 : 0);
      }
      ultimaAzione = tana.azione;
      vene.emissiveIntensity = 0.45 + Math.sin(tempo * 2.4) * 0.25 + (tana.fase === 2 ? 0.4 : 0);
      acido.emissiveIntensity = 0.8 + Math.sin(tempo * 3) * 0.2;
      for (const b of bolle) {
        const t = (tempo * 0.7 + b.fase) % 1;
        b.s.position.set(b.pozza.x + Math.cos(b.fase * 7) * b.pozza.raggio * 0.6, 0.05 + t * 0.6, b.pozza.z + Math.sin(b.fase * 7) * b.pozza.raggio * 0.6);
        b.s.material.opacity = Math.sin(t * Math.PI) * 0.6;
      }
      bozzoli.forEach((b, i) => {
        const presente = !!tana.bozzoli?.[i] && tana.fase > 0 && tana.fase < 4;
        b.scala += ((presente ? 1 : 0) - b.scala) * Math.min(1, dt * (presente ? 1.2 : 12));
        b.sacco.visible = b.scala > 0.03;
        b.cuore.visible = b.sacco.visible;
        b.sacco.scale.set(0.85 * b.scala, 1.3 * b.scala * (1 + Math.sin(tempo * 2 + i) * 0.05), 0.85 * b.scala);
        b.cuore.material.opacity = 0.35 + Math.sin(tempo * 3 + i) * 0.15;
      });
      const livello = tana.acqua ?? 0;
      piena.visible = livello > 0.01;
      piena.position.y = -0.3 + livello * 0.55;
      acquaMat.map.offset.x = (acquaMat.map.offset.x + dt * 0.05) % 1;
      cascate.forEach(c => {
        c.visible = livello > 0.01;
        c.material.opacity = Math.min(0.9, livello * 1.5);
        c.material.map.offset.y = (c.material.map.offset.y + dt * 1.6) % 1;
      });
      lumeBuco.material.opacity = 0.25 + Math.sin(tempo * 0.8) * 0.08;
    },
    isole,
  };
}
