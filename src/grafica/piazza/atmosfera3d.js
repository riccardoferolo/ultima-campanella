import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { creaCaso } from '../caso-grafica.js';

const RAGGIO_CIELO = 38;
const STELLE = 1800;
const DIREZIONE_LUNA = new THREE.Vector3(-20, 30, -30).normalize();
const RAGGIO_POZZA_LAMPIONE = 5.2;
const RAGGIO_POZZA_LANTERNA = 2.6;

function tela(l, a, pittore) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texturaCielo() {
  const caso = creaCaso(1482);
  return tela(2048, 1024, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, 0, a / 2);
    g.addColorStop(0, '#03050b');
    g.addColorStop(0.45, '#070b17');
    g.addColorStop(0.8, '#0f1524');
    g.addColorStop(1, '#1a2132');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a / 2);
    ctx.fillStyle = '#131b2c';
    ctx.fillRect(0, a / 2, l, a / 2);
    const bagliore = (u, larghezza, alto, colore) => {
      const raggio = larghezza * l;
      const cy = a / 2 / alto;
      for (const ox of [-l, 0, l]) {
        const x = u * l + ox;
        ctx.save();
        ctx.scale(1, alto);
        const r = ctx.createRadialGradient(x, cy, 0, x, cy, raggio);
        r.addColorStop(0, colore);
        r.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = r;
        ctx.fillRect(x - raggio, cy - raggio, raggio * 2, raggio * 2);
        ctx.restore();
      }
    };
    bagliore(0.5, 0.16, 0.42, 'rgba(120,92,64,0.38)');
    bagliore(0.02, 0.09, 0.35, 'rgba(110,88,66,0.26)');
    bagliore(0.3, 0.06, 0.3, 'rgba(90,80,70,0.14)');
    ctx.fillStyle = 'rgba(40,48,66,0.9)';
    ctx.beginPath();
    ctx.moveTo(0.6 * l, a / 2);
    let x = 0.6 * l;
    while (x < 0.93 * l) {
      x += 6 + caso() * 22;
      const picco = Math.sin(((x / l - 0.6) / 0.33) * Math.PI);
      ctx.lineTo(x, a / 2 - (6 + picco * 26 + caso() * 10 * picco));
    }
    ctx.lineTo(0.93 * l, a / 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'lighter';
    const SCHIACCIA_NUVOLE = 0.25;
    for (let i = 0; i < 18; i++) {
      const cx = caso() * l;
      const cy = (a * (0.18 + caso() * 0.22)) / SCHIACCIA_NUVOLE;
      const raggio = 120 + caso() * 160;
      ctx.save();
      ctx.scale(1, SCHIACCIA_NUVOLE);
      const r = ctx.createRadialGradient(cx, cy, 0, cx, cy, raggio);
      r.addColorStop(0, 'rgba(70,80,105,0.07)');
      r.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = r;
      ctx.fillRect(cx - raggio, cy - raggio, raggio * 2, raggio * 2);
      ctx.restore();
    }
    ctx.globalCompositeOperation = 'source-over';
  });
}

function texturaLuna() {
  const caso = creaCaso(1745);
  return tela(256, 256, (ctx, l) => {
    const c = l / 2;
    const g = ctx.createRadialGradient(c * 0.9, c * 0.9, 0, c, c, c * 0.92);
    g.addColorStop(0, '#fbfaf2');
    g.addColorStop(0.85, '#d9dbd6');
    g.addColorStop(1, '#a9adb0');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(c, c, c * 0.92, 0, Math.PI * 2); ctx.fill();
    ctx.save();
    ctx.beginPath(); ctx.arc(c, c, c * 0.92, 0, Math.PI * 2); ctx.clip();
    for (const [x, y, r] of [[0.38, 0.36, 0.2], [0.6, 0.3, 0.12], [0.52, 0.55, 0.18], [0.32, 0.62, 0.1], [0.7, 0.62, 0.14]]) {
      ctx.fillStyle = 'rgba(120,124,130,0.42)';
      ctx.beginPath(); ctx.ellipse(x * l, y * l, r * l, r * l * 0.8, caso() * 3, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < 40; i++) {
      const x = caso() * l;
      const y = caso() * l;
      const r = 2 + caso() * 7;
      ctx.strokeStyle = 'rgba(90,92,98,0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  });
}

function texturaRadiale(colore, nucleo = 0) {
  return tela(128, 128, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, colore);
    g.addColorStop(nucleo, colore);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  });
}

function texturaFascio() {
  return tela(8, 128, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, 0, a);
    g.addColorStop(0, 'rgba(255,196,120,0.16)');
    g.addColorStop(0.5, 'rgba(255,180,100,0.05)');
    g.addColorStop(1, 'rgba(255,170,90,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  });
}

function texturaMacchie() {
  const caso = creaCaso(1356);
  return tela(1024, 512, (ctx) => {
    for (let k = 0; k < 4; k++) {
      const cx = 128 + (k % 2) * 256;
      const cy = 128 + Math.floor(k / 2) * 256;
      ctx.fillStyle = 'rgba(70,6,8,0.92)';
      ctx.beginPath(); ctx.ellipse(cx, cy, 44 + caso() * 30, 30 + caso() * 20, caso() * 3, 0, Math.PI * 2); ctx.fill();
      for (let i = 0; i < 26; i++) {
        const a = caso() * Math.PI * 2;
        const d = 30 + caso() * 80;
        ctx.fillStyle = `rgba(${60 + caso() * 30},4,6,${0.6 + caso() * 0.35})`;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2 + caso() * 9, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = 'rgba(55,4,6,0.85)';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (caso() - 0.5) * 200, cy + (caso() - 0.5) * 200); ctx.stroke();
    }
    for (let k = 0; k < 4; k++) {
      const cx = 640 + (k % 2) * 256;
      const cy = 128 + Math.floor(k / 2) * 256;
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.translate(cx + (caso() - 0.5) * 160, cy + (caso() - 0.5) * 160);
        ctx.rotate(caso() * Math.PI);
        if (k < 2) {
          ctx.fillStyle = caso() < 0.5 ? 'rgba(232,228,214,0.95)' : 'rgba(210,214,220,0.95)';
          ctx.fillRect(-26, -34, 52, 68);
          ctx.fillStyle = 'rgba(60,60,60,0.5)';
          for (let r = -26; r < 28; r += 7) ctx.fillRect(-20, r, 30 + caso() * 10, 2);
        } else {
          ctx.fillStyle = ['rgba(140,80,30,0.95)', 'rgba(170,110,40,0.95)', 'rgba(110,60,25,0.95)'][Math.floor(caso() * 3)];
          ctx.beginPath(); ctx.ellipse(0, 0, 20, 10, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(70,40,15,0.9)';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(22, 0); ctx.stroke();
        }
        ctx.restore();
      }
    }
  });
}

function texturaPozzanghera() {
  const caso = creaCaso(1202);
  return tela(256, 256, (ctx, l) => {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    const punti = 18;
    for (let i = 0; i <= punti; i++) {
      const a = (i / punti) * Math.PI * 2;
      const r = l * (0.3 + caso() * 0.17);
      const x = l / 2 + Math.cos(a) * r;
      const y = l / 2 + Math.sin(a) * r * 0.7;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.fill();
  });
}

function quadro(x, y, z, lato, u0, v0, du, dv, giro) {
  const g = new THREE.PlaneGeometry(lato, lato).rotateX(-Math.PI / 2).rotateY(giro).translate(x, y, z);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, u0 + uv.getX(i) * du, v0 + uv.getY(i) * dv);
  return g;
}

export function creaAtmosfera(scena, { lampioni, lanterne, quota, liberi }) {
  const caso = creaCaso(969);
  const cielo = new THREE.Group();
  const cupola = new THREE.Mesh(new THREE.SphereGeometry(RAGGIO_CIELO, 48, 24), new THREE.MeshBasicMaterial({ map: texturaCielo(), side: THREE.BackSide, fog: false, depthWrite: false, depthTest: false }));
  cupola.renderOrder = -100;
  cielo.add(cupola);

  const posizioni = [];
  const colori = [];
  const tinta = new THREE.Color();
  for (let i = 0; i < STELLE; i++) {
    const y = Math.pow(caso(), 0.7);
    const a = caso() * Math.PI * 2;
    const r = Math.sqrt(1 - y * y);
    if (y < 0.08) continue;
    posizioni.push(Math.cos(a) * r * (RAGGIO_CIELO - 1), y * (RAGGIO_CIELO - 1), Math.sin(a) * r * (RAGGIO_CIELO - 1));
    const v = caso();
    tinta.setHSL(v < 0.15 ? 0.08 : v < 0.3 ? 0.6 : 0.62, v < 0.3 ? 0.5 : 0.15, 0.55 + caso() * 0.45 * Math.min(1, y * 2));
    colori.push(tinta.r, tinta.g, tinta.b);
  }
  const geometriaStelle = new THREE.BufferGeometry();
  geometriaStelle.setAttribute('position', new THREE.Float32BufferAttribute(posizioni, 3));
  geometriaStelle.setAttribute('color', new THREE.Float32BufferAttribute(colori, 3));
  const stelle = new THREE.Points(geometriaStelle, new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, fog: false, depthWrite: false }));
  stelle.renderOrder = -99;
  cielo.add(stelle);

  const luna = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaLuna(), fog: false, depthWrite: false }));
  luna.position.copy(DIREZIONE_LUNA).multiplyScalar(RAGGIO_CIELO - 3);
  luna.scale.setScalar(2.2);
  luna.renderOrder = -97;
  const alone = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaRadiale('rgba(170,190,230,0.32)'), fog: false, depthWrite: false, blending: THREE.AdditiveBlending }));
  alone.position.copy(DIREZIONE_LUNA).multiplyScalar(RAGGIO_CIELO - 3.2);
  alone.scale.setScalar(13);
  alone.renderOrder = -98;
  cielo.add(alone, luna);
  scena.add(cielo);

  const pozze = [];
  for (const l of lampioni) pozze.push(quadro(l.x, quota(l.x, l.z) + 0.03, l.z, RAGGIO_POZZA_LAMPIONE * 2, 0, 0, 1, 1, 0));
  for (const l of lanterne) pozze.push(quadro(l.x, quota(l.x, l.z) + 0.03, l.z, RAGGIO_POZZA_LANTERNA * 2, 0, 0, 1, 1, 0));
  const luceTerra = new THREE.Mesh(mergeGeometries(pozze), new THREE.MeshBasicMaterial({ map: texturaRadiale('rgba(255,178,92,0.42)', 0.05), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2 }));
  luceTerra.renderOrder = 1;
  scena.add(luceTerra);

  const coni = lampioni.map(l => new THREE.CylinderGeometry(0.3, 2.3, 4.3, 18, 1, true).translate(l.x, quota(l.x, l.z) + 2.15, l.z));
  const fascio = new THREE.Mesh(mergeGeometries(coni), new THREE.MeshBasicMaterial({ map: texturaFascio(), transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false }));
  fascio.renderOrder = 2;
  scena.add(fascio);

  const bagliore = texturaRadiale('rgba(255,200,130,0.55)');
  const aloni = (punti, lato) => new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(punti.flatMap(p => [p.x, p.y, p.z]), 3)),
    new THREE.PointsMaterial({ map: bagliore, size: lato, sizeAttenuation: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  scena.add(aloni(lampioni.map(l => ({ x: l.x, y: 4.45, z: l.z })), 2.6), aloni(lanterne, 1.1));

  const macchie = [];
  const pozzanghere = [];
  const posa = (x, z) => ({ x, y: quota(x, z) + 0.02, z });
  for (let i = 0; i < 260 && (macchie.length < 46 || pozzanghere.length < 16); i++) {
    const p = liberi(caso);
    if (!p) continue;
    const q = posa(p.x, p.z);
    if (pozzanghere.length < 16 && caso() < 0.25) {
      pozzanghere.push(quadro(q.x, q.y + 0.004, q.z, 1.4 + caso() * 2.2, 0, 0, 1, 1, caso() * Math.PI));
      continue;
    }
    if (macchie.length >= 46) continue;
    const k = Math.floor(caso() * 8);
    const u0 = (k % 4) * 0.25;
    const v0 = k < 4 ? 0.5 : 0;
    macchie.push(quadro(q.x, q.y + 0.002 * (macchie.length % 5), q.z, (k % 4) < 2 ? 1.1 + caso() * 0.9 : 0.9 + caso() * 0.6, u0, v0, 0.25, 0.5, caso() * Math.PI * 2));
  }
  const decalcomanie = new THREE.Mesh(mergeGeometries(macchie), new THREE.MeshStandardMaterial({ map: texturaMacchie(), transparent: true, depthWrite: false, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: -1 }));
  decalcomanie.renderOrder = 1;
  const acqua = new THREE.Mesh(mergeGeometries(pozzanghere), new THREE.MeshStandardMaterial({ color: 0x1a2130, alphaMap: texturaPozzanghera(), transparent: true, opacity: 0.5, depthWrite: false, roughness: 0.03, metalness: 0.55, polygonOffset: true, polygonOffsetFactor: -1 }));
  acqua.renderOrder = 1;
  scena.add(decalcomanie, acqua);

  return {
    aggiorna(punto) {
      if (punto) cielo.position.copy(punto);
    },
  };
}
