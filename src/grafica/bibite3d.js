import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { BEVANDE } from '../regole.js';

export const MARCHI = Object.freeze({
  ferro: { nome: 'FERRO', slogan: "Pelle d'acciaio", icona: 'scudo' },
  lampo: { nome: 'LAMPO', slogan: 'Ricarichi in un lampo', icona: 'fulmine' },
  ritorno: { nome: 'RITORNO', slogan: 'Nessuno resta indietro', icona: 'ritorno' },
  raffica: { nome: 'RAFFICA', slogan: 'Il grilletto non dorme', icona: 'proiettili' },
  scatto: { nome: 'SCATTO', slogan: 'Gambe da lepre', icona: 'ala' },
  tasca: { nome: 'TASCA', slogan: "Ce n'è sempre una in più", icona: 'tasca' },
});

const LARGO = 0.95;
const ALTO = 2;
const FONDO = 0.65;
const PROFONDITA_VETRINA = 0.16;
const CARATTERE = 'Impact, "Arial Black", sans-serif';
const esadecimale = n => `#${n.toString(16).padStart(6, '0')}`;
const cache = new Map();

function tela(l, a, pittore) {
  const canvas = document.createElement('canvas');
  canvas.width = l;
  canvas.height = a;
  pittore(canvas.getContext('2d'), l, a);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const ICONE = {
  scudo(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, -1);
    ctx.quadraticCurveTo(0.55, -0.85, 0.85, -0.85);
    ctx.quadraticCurveTo(0.9, 0.35, 0, 1);
    ctx.quadraticCurveTo(-0.9, 0.35, -0.85, -0.85);
    ctx.quadraticCurveTo(-0.55, -0.85, 0, -1);
    ctx.fill();
    ctx.stroke();
  },
  fulmine(ctx) {
    ctx.beginPath();
    for (const [x, y] of [[0.2, -1], [-0.55, 0.12], [-0.05, 0.12], [-0.3, 1], [0.6, -0.25], [0.08, -0.25], [0.45, -1]]) ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  },
  ritorno(ctx) {
    ctx.lineWidth = 0.24;
    ctx.beginPath();
    ctx.arc(0, 0.05, 0.68, -Math.PI * 0.15, Math.PI * 1.35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0.42, -0.85);
    ctx.lineTo(0.95, -0.42);
    ctx.lineTo(0.3, -0.2);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-0.09, -0.3, 0.18, 0.7);
    ctx.fillRect(-0.35, -0.04, 0.7, 0.18);
  },
  proiettili(ctx) {
    for (const x of [-0.55, 0, 0.55]) {
      ctx.beginPath();
      ctx.moveTo(x - 0.17, 0.95);
      ctx.lineTo(x - 0.17, -0.25);
      ctx.quadraticCurveTo(x - 0.17, -0.95, x, -1);
      ctx.quadraticCurveTo(x + 0.17, -0.95, x + 0.17, -0.25);
      ctx.lineTo(x + 0.17, 0.95);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  },
  ala(ctx) {
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      const y = -0.7 + i * 0.42;
      ctx.moveTo(-0.85, y + 0.2);
      ctx.quadraticCurveTo(-0.1, y - 0.5 + i * 0.05, 0.95 - i * 0.18, y - 0.05);
      ctx.quadraticCurveTo(0.1, y + 0.08, -0.85, y + 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  },
  tasca(ctx) {
    ctx.beginPath();
    ctx.roundRect(-0.8, -0.45, 1.6, 1.4, 0.25);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-0.85, -0.45);
    ctx.lineTo(0.85, -0.45);
    ctx.lineTo(0.6, 0.05);
    ctx.lineTo(-0.6, 0.05);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.16;
    ctx.beginPath();
    ctx.moveTo(-0.15, 0.55);
    ctx.lineTo(0.35, 0.55);
    ctx.moveTo(0.1, 0.3);
    ctx.lineTo(0.1, 0.8);
    ctx.stroke();
  },
};

function disegnaIcona(ctx, icona, cx, cy, scala, colore) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scala, scala);
  ctx.fillStyle = colore;
  ctx.strokeStyle = 'rgba(255,255,255,0.95)';
  ctx.lineWidth = 0.07;
  ctx.lineJoin = 'round';
  ctx.shadowColor = colore;
  ctx.shadowBlur = 25;
  ICONE[icona](ctx);
  ctx.restore();
}

function scritta(ctx, testo, x, y, dimensione, colore, bordo = '#000') {
  ctx.font = `${dimensione}px ${CARATTERE}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = dimensione * 0.12;
  ctx.strokeStyle = bordo;
  ctx.strokeText(testo, x, y);
  ctx.fillStyle = colore;
  ctx.fillText(testo, x, y);
}

function texturaPannello(tipo) {
  const marchio = MARCHI[tipo];
  const colore = new THREE.Color(BEVANDE[tipo].colore);
  const chiaro = esadecimale(colore.clone().lerp(new THREE.Color(0xffffff), 0.35).getHex());
  const scuro = esadecimale(colore.clone().multiplyScalar(0.25).getHex());
  return tela(512, 512, (ctx, l, a) => {
    const g = ctx.createLinearGradient(0, 0, 0, a);
    g.addColorStop(0, esadecimale(colore.getHex()));
    g.addColorStop(1, scuro);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, a);
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#fff';
    for (let x = -a; x < l; x += 46) {
      ctx.beginPath();
      ctx.moveTo(x, a);
      ctx.lineTo(x + 18, a);
      ctx.lineTo(x + 18 + a, 0);
      ctx.lineTo(x + a, 0);
      ctx.fill();
    }
    ctx.restore();
    const alone = ctx.createRadialGradient(l / 2, a * 0.44, 10, l / 2, a * 0.44, l * 0.45);
    alone.addColorStop(0, 'rgba(255,255,255,0.45)');
    alone.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = alone;
    ctx.fillRect(0, 0, l, a);
    scritta(ctx, 'BIBITA', l / 2, 50, 38, '#ffffff');
    disegnaIcona(ctx, marchio.icona, l / 2, a * 0.42, 92, chiaro);
    scritta(ctx, marchio.nome, l / 2, a * 0.72, 92, '#ffffff', scuro);
    ctx.font = `italic 30px Georgia, serif`;
    ctx.fillStyle = '#fff6dc';
    ctx.textAlign = 'center';
    ctx.fillText(marchio.slogan, l / 2, a * 0.86);
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, l - 20, a - 20);
  });
}

function texturaInsegna(tipo) {
  const marchio = MARCHI[tipo];
  const colore = esadecimale(BEVANDE[tipo].colore);
  return tela(512, 128, (ctx, l, a) => {
    ctx.fillStyle = '#0d0d10';
    ctx.fillRect(0, 0, l, a);
    ctx.shadowColor = colore;
    ctx.shadowBlur = 30;
    scritta(ctx, marchio.nome, l / 2, a / 2 + 4, 86, colore, '#ffffff');
  });
}

function texturaPulsantiera(tipo) {
  const dati = BEVANDE[tipo];
  return tela(128, 256, (ctx, l, a) => {
    ctx.fillStyle = '#16171b';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#0b2a14';
    ctx.fillRect(12, 14, l - 24, 46);
    ctx.font = 'bold 34px monospace';
    ctx.fillStyle = '#4dff7a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(dati.costo), l / 2, 38);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = esadecimale(dati.colore);
      ctx.beginPath();
      ctx.roundRect(28, 82 + i * 42, l - 56, 30, 6);
      ctx.fill();
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(l / 2 - 5, 214, 10, 30);
  });
}

function texturaEtichetta(tipo) {
  const marchio = MARCHI[tipo];
  const colore = esadecimale(BEVANDE[tipo].colore);
  return tela(256, 64, (ctx, l, a) => {
    ctx.fillStyle = '#f4ecd8';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = colore;
    ctx.fillRect(0, 0, l, 10);
    ctx.fillRect(0, a - 10, l, 10);
    scritta(ctx, marchio.nome, l / 2, a / 2 + 2, 34, colore, '#ffffff');
  });
}

function risorse(tipo) {
  if (cache.has(tipo)) return cache.get(tipo);
  const colore = new THREE.Color(BEVANDE[tipo].colore);
  const profilo = [[0, 0], [0.034, 0], [0.036, 0.01], [0.036, 0.12], [0.03, 0.15], [0.013, 0.185], [0.012, 0.215], [0, 0.215]].map(([x, y]) => new THREE.Vector2(x, y));
  const r = {
    colore,
    bottiglia: new THREE.LatheGeometry(profilo, 18),
    vetro: new THREE.MeshPhysicalMaterial({ color: colore.clone().lerp(new THREE.Color(0xffffff), 0.25), emissive: colore, emissiveIntensity: 0.35, roughness: 0.08, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.5 }),
    liquido: new THREE.MeshStandardMaterial({ color: colore, emissive: colore, emissiveIntensity: 0.6, roughness: 0.2 }),
    etichetta: new THREE.MeshStandardMaterial({ map: texturaEtichetta(tipo), roughness: 0.6 }),
    tappo: new THREE.MeshStandardMaterial({ color: 0xc9c2b0, metalness: 0.9, roughness: 0.3 }),
  };
  cache.set(tipo, r);
  return r;
}

export function creaBottiglia(tipo) {
  const r = risorse(tipo);
  const gruppo = new THREE.Group();
  const vetro = new THREE.Mesh(r.bottiglia, r.vetro);
  const liquido = new THREE.Mesh(new THREE.CylinderGeometry(0.031, 0.031, 0.13, 16).translate(0, 0.065, 0), r.liquido);
  liquido.position.y = 0.006;
  const etichetta = new THREE.Mesh(new THREE.CylinderGeometry(0.0368, 0.0368, 0.06, 20, 1, true), r.etichetta);
  etichetta.position.y = 0.075;
  const tappo = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.014, 12), r.tappo);
  tappo.position.y = 0.218;
  gruppo.add(liquido, vetro, etichetta, tappo);
  return { gruppo, liquido };
}

export function creaDistributore(tipo) {
  const r = risorse(tipo);
  const macchina = new THREE.Group();
  const scocca = new THREE.MeshStandardMaterial({ color: r.colore.clone().multiplyScalar(0.35), metalness: 0.55, roughness: 0.32 });
  const corpo = new THREE.Mesh(new RoundedBoxGeometry(LARGO, ALTO, FONDO, 3, 0.035), scocca);
  corpo.position.y = ALTO / 2;
  const insegna = new THREE.Mesh(new RoundedBoxGeometry(LARGO + 0.04, 0.26, FONDO + 0.04, 3, 0.03), [scocca, scocca, scocca, scocca, new THREE.MeshBasicMaterial({ map: texturaInsegna(tipo) }), scocca]);
  insegna.position.y = ALTO + 0.13;
  const pannello = new THREE.Mesh(new THREE.PlaneGeometry(LARGO - 0.1, 0.8), new THREE.MeshBasicMaterial({ map: texturaPannello(tipo) }));
  pannello.position.set(0, 0.62, FONDO / 2 + 0.003);
  const vetrinaZ = FONDO / 2 + PROFONDITA_VETRINA / 2;
  const fondale = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.88), new THREE.MeshBasicMaterial({ color: r.colore.clone().lerp(new THREE.Color(0xffffff), 0.15).multiplyScalar(0.8) }));
  fondale.position.set(-0.13, 1.5, FONDO / 2 + 0.003);
  const ripiani = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.012, 0.14), new THREE.MeshStandardMaterial({ color: 0x9aa0a6, metalness: 0.8, roughness: 0.3 }));
  const bottiglie = new THREE.InstancedMesh(r.bottiglia, r.vetro, 12);
  const m = new THREE.Matrix4();
  for (let fila = 0; fila < 3; fila++) {
    const y = 1.12 + fila * 0.28;
    const copia = ripiani.clone();
    copia.position.set(-0.13, y - 0.006, vetrinaZ);
    macchina.add(copia);
    for (let k = 0; k < 4; k++) bottiglie.setMatrixAt(fila * 4 + k, m.makeTranslation(-0.355 + k * 0.15, y, vetrinaZ));
  }
  bottiglie.computeBoundingSphere();
  const vetrina = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.9), new THREE.MeshPhysicalMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.14, roughness: 0.02, clearcoat: 1, depthWrite: false }));
  vetrina.position.set(-0.13, 1.5, FONDO / 2 + PROFONDITA_VETRINA);
  const nero = new THREE.MeshStandardMaterial({ color: 0x1b1c20, metalness: 0.6, roughness: 0.4 });
  const cornice = new THREE.Group();
  for (const [l, a, x, y] of [[0.66, 0.03, 0, 0.455], [0.66, 0.03, 0, -0.455], [0.03, 0.94, 0.315, 0], [0.03, 0.94, -0.315, 0]]) {
    const barra = new THREE.Mesh(new THREE.BoxGeometry(l, a, PROFONDITA_VETRINA), nero);
    barra.position.set(x, y, 0);
    cornice.add(barra);
  }
  cornice.position.set(-0.13, 1.5, vetrinaZ);
  const pulsantiera = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.42), new THREE.MeshBasicMaterial({ map: texturaPulsantiera(tipo) }));
  pulsantiera.position.set(0.33, 1.62, FONDO / 2 + 0.004);
  const bocchetta = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.06), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 }));
  bocchetta.position.set(0, 0.13, FONDO / 2 - 0.02);
  const bagliore = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone(), color: r.colore, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
  bagliore.scale.set(2.2, 2.6, 1);
  bagliore.position.set(0, 1.1, FONDO / 2 + 0.25);
  macchina.add(corpo, insegna, cornice, fondale, bottiglie, vetrina, pannello, pulsantiera, bocchetta, bagliore);
  return macchina;
}

let texturaAlone = null;
function alone() {
  texturaAlone ??= tela(64, 64, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  });
  return texturaAlone;
}
