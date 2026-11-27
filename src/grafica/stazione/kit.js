import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const MARCHIO = 'NOVAPETROLI';

export function creaStatico() {
  const pezzi = new Map();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const p = new THREE.Vector3();
  const s = new THREE.Vector3(1, 1, 1);
  return {
    aggiungi(chiave, geometria, x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0) {
      const g = geometria.index ? geometria.toNonIndexed() : geometria.clone();
      for (const nome of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) g.deleteAttribute(nome);
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      if (!g.attributes.normal) g.computeVertexNormals();
      g.applyMatrix4(m.compose(p.set(x, y, z), q.setFromEuler(e.set(rx, ry, rz, 'YXZ')), s));
      if (!pezzi.has(chiave)) pezzi.set(chiave, []);
      pezzi.get(chiave).push(g);
    },
    finisci(scena, materiali) {
      const meshes = [];
      for (const [chiave, elenco] of pezzi) {
        if (!materiali[chiave]) throw new Error(`Materiale mancante per la stazione: ${chiave}`);
        const mesh = new THREE.Mesh(mergeGeometries(elenco, false), materiali[chiave]);
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        mesh.userData.chiave = chiave;
        scena.add(mesh);
        meshes.push(mesh);
      }
      pezzi.clear();
      return meshes;
    },
  };
}

export function scatolaUV(l, a, p, metri = 1, partenza = 0) {
  const g = new THREE.BoxGeometry(l, a, p);
  const uv = g.attributes.uv;
  const facce = [[p, a], [p, a], [l, p], [l, p], [l, a], [l, a]];
  const laterali = new Set([0, 1, 4, 5]);
  for (let f = 0; f < 6; f++) {
    const scarto = laterali.has(f) ? partenza / metri : 0;
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, (uv.getX(i) * facce[f][0]) / metri, (uv.getY(i) * facce[f][1]) / metri + scarto);
    }
  }
  return g;
}

export function pianoUV(larghezza, profondita, metri, rivolto = 'su') {
  const g = new THREE.PlaneGeometry(larghezza, profondita);
  g.rotateX(rivolto === 'su' ? -Math.PI / 2 : Math.PI / 2);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * larghezza) / metri, (uv.getY(i) * profondita) / metri);
  return g;
}

export function facciaUV(larghezza, altezza, metri, partenza = 0) {
  const g = new THREE.PlaneGeometry(larghezza, altezza);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * larghezza) / metri, (uv.getY(i) * altezza + partenza) / metri);
  return g;
}

export function tela(larghezza, altezza, disegno) {
  const canvas = document.createElement('canvas');
  canvas.width = larghezza;
  canvas.height = altezza;
  disegno(canvas.getContext('2d'), larghezza, altezza);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function creaCasoGrafico(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fiamma(ctx, x, y, scala) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scala, scala);
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.bezierCurveTo(-18, 16, -14, -4, 0, -30);
  ctx.bezierCurveTo(4, -12, 18, -6, 14, 12);
  ctx.bezierCurveTo(12, 22, 6, 28, 0, 30);
  ctx.fill();
  ctx.restore();
}

export function texturaMarchio(larghezza = 1024, altezza = 128, { sfondo = '#f4f4f2', testo = '#c8161d', striscia = '#c8161d' } = {}) {
  return tela(larghezza, altezza, (ctx, l, a) => {
    ctx.fillStyle = sfondo;
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = striscia;
    ctx.fillRect(0, a * 0.82, l, a * 0.18);
    ctx.fillStyle = '#f2a900';
    fiamma(ctx, l * 0.12, a * 0.42, a / 90);
    ctx.fillStyle = testo;
    ctx.font = `900 ${Math.round(a * 0.5)}px "Arial Black", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(MARCHIO, l * 0.55, a * 0.42);
  });
}

export function texturaPrezzi() {
  return tela(256, 512, (ctx, l, a) => {
    ctx.fillStyle = '#1b1f24';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#f4f4f2';
    ctx.fillRect(10, 10, l - 20, 120);
    ctx.fillStyle = '#f2a900';
    fiamma(ctx, l / 2, 58, 1.2);
    ctx.fillStyle = '#c8161d';
    ctx.font = '900 30px "Arial Black", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(MARCHIO, l / 2, 118);
    const righe = [['SENZA PIOMBO', '1,899', '#3fbf4a'], ['GASOLIO', '1,789', '#f2d200'], ['GPL', '0,739', '#3f8cff'], ['SELF 24h', '', '#ffffff']];
    righe.forEach(([nome, prezzo, colore], i) => {
      const y = 170 + i * 84;
      ctx.fillStyle = colore;
      ctx.fillRect(14, y - 30, 8, 60);
      ctx.fillStyle = '#e8ecef';
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(nome, 30, y - 6);
      if (!prezzo) return;
      ctx.fillStyle = '#ff3a2a';
      ctx.font = 'bold 40px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(prezzo, l - 18, y + 24);
    });
  });
}

export function texturaInsegna(testo, { larghezza = 1024, altezza = 160, sfondo = '#14181e', colore = '#f4f4f2', bordo = '#c8161d', font = '900 86px "Arial Black", Arial, sans-serif' } = {}) {
  return tela(larghezza, altezza, (ctx, l, a) => {
    ctx.fillStyle = sfondo;
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = bordo;
    ctx.fillRect(0, a - 14, l, 14);
    ctx.fillStyle = colore;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(testo, l / 2, a / 2 - 4);
  });
}

export function texturaSchermoPompa(numero) {
  return tela(128, 128, (ctx, l, a) => {
    ctx.fillStyle = '#0b1a10';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#7dff8a';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('EURO', l - 8, 26);
    ctx.font = 'bold 30px "Courier New", monospace';
    ctx.fillText('00,00', l - 8, 58);
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('LITRI 0,00', l - 8, 86);
    ctx.fillStyle = '#ffd84a';
    ctx.textAlign = 'left';
    ctx.font = 'bold 26px Arial, sans-serif';
    ctx.fillText(String(numero), 8, 118);
  });
}

export function texturaPannelliSoffitto() {
  return tela(256, 256, (ctx, l, a) => {
    ctx.fillStyle = '#d9dcdc';
    ctx.fillRect(0, 0, l, a);
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(120,120,110,${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * l, Math.random() * a, 2, 2);
    }
    ctx.strokeStyle = '#8f9496';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, l, a);
  });
}

export function texturaVetrina() {
  return tela(256, 256, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, l, a);
    g.addColorStop(0, 'rgba(140,170,190,0.55)');
    g.addColorStop(0.5, 'rgba(40,60,80,0.25)');
    g.addColorStop(1, 'rgba(140,170,190,0.5)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 3;
    for (let i = -2; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 90, a);
      ctx.lineTo(i * 90 + 140, 0);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(30,20,10,0.25)';
    for (let i = 0; i < 30; i++) ctx.fillRect(Math.random() * l, Math.random() * a, 3, 9);
  });
}

export function texturaSegnaletica() {
  return tela(512, 512, (ctx, l, a) => {
    ctx.clearRect(0, 0, l, a);
    ctx.fillStyle = 'rgba(236,236,226,0.85)';
    ctx.beginPath();
    ctx.moveTo(l * 0.5, a * 0.08);
    ctx.lineTo(l * 0.8, a * 0.42);
    ctx.lineTo(l * 0.6, a * 0.42);
    ctx.lineTo(l * 0.6, a * 0.92);
    ctx.lineTo(l * 0.4, a * 0.92);
    ctx.lineTo(l * 0.4, a * 0.42);
    ctx.lineTo(l * 0.2, a * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.6})`;
      ctx.fillRect(Math.random() * l, Math.random() * a, 4 + Math.random() * 10, 2 + Math.random() * 6);
    }
  });
}

export function texturaMacchia() {
  return tela(128, 128, (ctx, l, a) => {
    const g = ctx.createRadialGradient(l / 2, a / 2, 4, l / 2, a / 2, l / 2);
    g.addColorStop(0, 'rgba(10,8,6,0.75)');
    g.addColorStop(0.6, 'rgba(14,12,10,0.4)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  });
}

export function texturaAlone(colore) {
  return tela(64, 64, (ctx, l, a) => {
    const g = ctx.createRadialGradient(l / 2, a / 2, 0, l / 2, a / 2, l / 2);
    g.addColorStop(0, colore);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
  });
}

export function texturaFuoco() {
  return tela(64, 128, (ctx, l, a) => {
    const g = ctx.createRadialGradient(l / 2, a * 0.72, 2, l / 2, a * 0.6, a * 0.5);
    g.addColorStop(0, 'rgba(255,250,220,1)');
    g.addColorStop(0.25, 'rgba(255,190,70,0.95)');
    g.addColorStop(0.6, 'rgba(240,80,10,0.55)');
    g.addColorStop(1, 'rgba(80,10,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(l / 2, 0);
    ctx.quadraticCurveTo(l, a * 0.6, l / 2, a);
    ctx.quadraticCurveTo(0, a * 0.6, l / 2, 0);
    ctx.fill();
  });
}

export function texturaGrattaVinci(nome) {
  return tela(96, 160, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, l, a);
    g.addColorStop(0, '#ffd84a');
    g.addColorStop(1, '#ff6a2a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#c8161d';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GRATTA', l / 2, 22);
    ctx.fillText('E VINCI', l / 2, 38);
    ctx.fillStyle = '#b9bcc0';
    for (let i = 0; i < 6; i++) ctx.fillRect(10 + (i % 3) * 27, 54 + Math.floor(i / 3) * 34, 22, 26);
    ctx.fillStyle = '#1b1f24';
    ctx.font = 'bold 10px Arial, sans-serif';
    ctx.fillText(nome.toUpperCase().slice(0, 16), l / 2, a - 18);
  });
}

export function texturaAdr() {
  return tela(256, 128, (ctx, l, a) => {
    ctx.fillStyle = '#f07c00';
    ctx.fillRect(0, 0, l, a);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, l - 8, a - 8);
    ctx.beginPath();
    ctx.moveTo(4, a / 2);
    ctx.lineTo(l - 4, a / 2);
    ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.font = 'bold 46px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('33', l / 2, a * 0.27);
    ctx.fillText('1203', l / 2, a * 0.75);
  });
}

export function texturaRimorchio() {
  return tela(1024, 256, (ctx, l, a) => {
    ctx.fillStyle = '#e8ebee';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#1d4f91';
    ctx.fillRect(0, a * 0.72, l, a * 0.1);
    ctx.font = '900 92px "Arial Black", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('TRASPORTI SESIA', 40, a * 0.38);
    ctx.font = 'bold 30px Arial, sans-serif';
    ctx.fillStyle = '#4a5560';
    ctx.fillText('VERCELLI · NOVARA · MILANO', 46, a * 0.6);
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(90,70,40,${Math.random() * 0.2})`;
      ctx.fillRect(Math.random() * l, a * 0.75 + Math.random() * a * 0.25, 20, 6);
    }
  });
}

export const coloreTinta = c => new THREE.Color(c);
