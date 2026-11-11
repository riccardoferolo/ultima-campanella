import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OSTACOLI, FINESTRE, ACQUISTI, PAVIMENTO_CHIESA, quota } from '../../mappe/piazza.js';
import { VOTO, ORE_DEL_BEATO, ANIME_VEGLIA, NUMERI_OROLOGIO, puntoCarro } from '../../piazza.js';
import { texturaAlone } from './texture.js';

const PANNELLO_RECINTO = 2.2;
const SEGMENTO_JERSEY = 2;
const LARGO_SACCO = 0.56;
const ALTO_SACCO = 0.24;
const RAGGIO_RUOTA_CARRO = 0.55;
const INSEGUI_CARRO = 4;
const CERI = 4;
const ANIME_PER_CERO = ANIME_VEGLIA / CERI;
const LUCE_CARRO = 10;

function texturaGrata() {
  const tela = document.createElement('canvas');
  tela.width = tela.height = 128;
  const ctx = tela.getContext('2d');
  ctx.fillStyle = '#2a2b2d';
  ctx.beginPath(); ctx.arc(64, 64, 63, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a4c50';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(64, 64, 58, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#0a0b0c';
  for (let y = 26; y < 104; y += 11) ctx.fillRect(28, y, 72, 5);
  ctx.fillStyle = '#5a5c60';
  ctx.font = 'bold 11px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERANO', 64, 20);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function veicolo(o, box, statico) {
  const asseX = o.x1 - o.x0 >= o.z1 - o.z0;
  const lungo = asseX ? o.x1 - o.x0 : o.z1 - o.z0;
  const blocco = (chiave, a0, a1, y0, y1, rientro = 0) => (asseX
    ? box(chiave, o.x0 + a0 * lungo, y0, o.z0 + rientro, o.x0 + a1 * lungo, y1, o.z1 - rientro, 1)
    : box(chiave, o.x0 + rientro, y0, o.z0 + a0 * lungo, o.x1 - rientro, y1, o.z0 + a1 * lungo, 1));
  const ruota = (a, lato, r = 0.33, y = r) => {
    const g = new THREE.CylinderGeometry(r, r, 0.24, 14);
    if (asseX) statico.aggiungi('nero', g, o.x0 + a * lungo, y, lato < 0 ? o.z0 + 0.12 : o.z1 - 0.12, 0, Math.PI / 2);
    else statico.aggiungi('nero', g, lato < 0 ? o.x0 + 0.12 : o.x1 - 0.12, y, o.z0 + a * lungo, 0, 0, Math.PI / 2);
  };
  const fianchi = asseX
    ? [{ x: (o.x0 + o.x1) / 2, z: o.z0 - 0.01, verso: { x: 0, z: -1 } }, { x: (o.x0 + o.x1) / 2, z: o.z1 + 0.01, verso: { x: 0, z: 1 } }]
    : [{ x: o.x0 - 0.01, z: (o.z0 + o.z1) / 2, verso: { x: -1, z: 0 } }, { x: o.x1 + 0.01, z: (o.z0 + o.z1) / 2, verso: { x: 1, z: 0 } }];
  const muso = asseX ? { x: o.x1 + 0.02, z: (o.z0 + o.z1) / 2, verso: { x: 1, z: 0 } } : { x: (o.x0 + o.x1) / 2, z: o.z1 + 0.02, verso: { x: 0, z: 1 } };
  return { blocco, ruota, fianchi, muso };
}

export function costruisciAssedio({ scena, statico, mat, box, cil, cartello }) {
  const colore = (prefisso, c, extra = {}) => {
    const chiave = `${prefisso}${c.toString(16)}`;
    mat[chiave] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...extra });
    return chiave;
  };
  Object.assign(mat, {
    carrozzeria: new THREE.MeshStandardMaterial({ color: 0xe2e4e6, metalness: 0.45, roughness: 0.38 }),
    bluLinea: new THREE.MeshStandardMaterial({ color: 0x1f4f8a, metalness: 0.4, roughness: 0.4 }),
    arancione: new THREE.MeshStandardMaterial({ color: 0xe8641a, roughness: 0.5 }),
    sacco: new THREE.MeshStandardMaterial({ color: 0xa48c62, roughness: 1 }),
    terra: new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 1 }),
    cassonetto: new THREE.MeshStandardMaterial({ color: 0x2e5634, roughness: 0.55, metalness: 0.2 }),
    ruggine: new THREE.MeshStandardMaterial({ color: 0x5a3a26, roughness: 0.9, metalness: 0.3 }),
    bruciato: new THREE.MeshStandardMaterial({ color: 0x1c1a18, roughness: 0.95 }),
    grata: new THREE.MeshStandardMaterial({ map: texturaGrata(), roughness: 0.55, metalness: 0.6 }),
  });
  const lampeggianti = new THREE.MeshStandardMaterial({ color: 0x1840ff, emissive: 0x2050ff, emissiveIntensity: 1.4 });
  mat.lampeggiante = lampeggianti;

  const automobile = o => {
    const k = colore('auto', o.colore, { metalness: 0.55, roughness: 0.4 });
    const v = veicolo(o, box, statico);
    if (o.ribaltata) {
      v.blocco(k, 0.03, 0.97, 0.55, 1.15, 0.08);
      v.blocco('vetroScuro', 0.24, 0.74, 0.1, 0.55, 0.2);
      v.blocco(k, 0.26, 0.72, 0.02, 0.12, 0.24);
      v.blocco('bruciato', 0.03, 0.97, 1.15, 1.2, 0.2);
      for (const a of [0.18, 0.82]) for (const l of [-1, 1]) v.ruota(a, l, 0.33, 1.3);
      return;
    }
    v.blocco(k, 0.03, 0.84, 0.35, 0.95, 0.08);
    v.blocco('ruggine', 0.84, 0.98, 0.3, 0.72, 0.14);
    v.blocco(k, 0.22, 0.74, 0.95, 1.45, 0.18);
    v.blocco('vetroScuro', 0.2, 0.76, 1, 1.4, 0.16);
    for (const a of [0.18, 0.82]) for (const l of [-1, 1]) v.ruota(a, l);
  };

  const pullman = o => {
    const v = veicolo(o, box, statico);
    v.blocco('carrozzeria', 0.005, 0.995, 0.5, 3.05);
    v.blocco('vetroScuro', 0.05, 0.86, 1.6, 2.7, -0.02);
    v.blocco('vetroScuro', 0.995, 1.002, 1.05, 2.85, 0.12);
    v.blocco('bluLinea', 0, 1, 1.18, 1.42, -0.015);
    v.blocco('bluLinea', 0, 1, 0.5, 0.66, -0.01);
    v.blocco('ferro', 0, 1, 3.05, 3.2, 0.25);
    for (const a of [0.17, 0.8]) for (const l of [-1, 1]) v.ruota(a, l, 0.5, 0.5);
    cartello(['NOVARA'], v.muso.x, 2.92, v.muso.z, v.muso.verso, 1.7, 0.26, { larghezza: 256, altezza: 40, sfondo: '#111', colore: '#ffb020', font: 'bold 28px Arial, sans-serif' });
  };

  const ambulanza = o => {
    const v = veicolo(o, box, statico);
    v.blocco('carrozzeria', 0, 0.72, 0.4, 2.7);
    v.blocco('carrozzeria', 0.72, 1, 0.4, 1.95, 0.05);
    v.blocco('vetroScuro', 0.74, 0.97, 1.25, 1.9, 0.03);
    v.blocco('arancione', 0, 1, 1.25, 1.5, -0.015);
    v.blocco('lampeggiante', 0.6, 0.7, 2.7, 2.86, 0.45);
    for (const a of [0.18, 0.82]) for (const l of [-1, 1]) v.ruota(a, l, 0.36, 0.36);
    for (const f of v.fianchi) cartello(['AMBULANZA', '118'], f.x, 2.05, f.z, f.verso, 1.8, 0.6, { larghezza: 256, altezza: 84, sfondo: 'rgba(0,0,0,0)', colore: '#c81e1e', font: 'bold 30px Arial, sans-serif' });
  };

  const furgone = o => {
    const v = veicolo(o, box, statico);
    v.blocco('carrozzeria', 0, 0.8, 0.35, 2.4);
    v.blocco('carrozzeria', 0.8, 1, 0.35, 1.85, 0.06);
    v.blocco('vetroScuro', 0.82, 0.97, 1.2, 1.8, 0.04);
    v.blocco('ruggine', 0, 0.8, 0.35, 0.5, -0.01);
    for (const a of [0.2, 0.82]) for (const l of [-1, 1]) v.ruota(a, l, 0.34, 0.34);
  };

  const bancarella = o => {
    const tela = colore('tenda', o.tenda, { roughness: 0.85, side: THREE.DoubleSide });
    for (const [x, z] of [[o.x0 + 0.05, o.z0 + 0.05], [o.x1 - 0.05, o.z0 + 0.05], [o.x0 + 0.05, o.z1 - 0.05], [o.x1 - 0.05, o.z1 - 0.05]]) box('ferro', x - 0.03, 0, z - 0.03, x + 0.03, 2.3, z + 0.03, 1);
    box('legno', o.x0 + 0.1, 0.8, o.z0 + 0.3, o.x1 - 0.1, 0.88, o.z1 - 0.3, 1);
    box(tela, o.x0 + 0.1, 0.2, o.z1 - 0.32, o.x1 - 0.1, 0.8, o.z1 - 0.29, 1);
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const lx = o.x1 - o.x0 + 0.3;
    const lz = (o.z1 - o.z0) / 2 + 0.25;
    statico.aggiungi(tela, new THREE.BoxGeometry(lx, 0.03, lz), cx, 2.42, cz - lz / 2 + 0.1, 0, -0.32);
    statico.aggiungi(tela, new THREE.BoxGeometry(lx, 0.03, lz), cx, 2.42, cz + lz / 2 - 0.1, 0, 0.32);
    for (let i = 0; i < 3; i++) {
      const x = o.x0 + 0.5 + i * ((o.x1 - o.x0 - 1) / 2);
      box('legno', x - 0.26, 0.88, cz - 0.2, x + 0.26, 1.16, cz + 0.2, 1);
      for (let j = 0; j < 4; j++) statico.aggiungi('arancione', new THREE.SphereGeometry(0.08, 8, 6), x - 0.12 + (j % 2) * 0.24, 1.24, cz - 0.08 + Math.floor(j / 2) * 0.16);
    }
    statico.aggiungi('legno', new THREE.BoxGeometry(0.52, 0.28, 0.4), o.x1 + 0.3, 0.14, o.z0 + 0.2, 0.6);
  };

  const jersey = o => {
    const asseX = o.x1 - o.x0 >= o.z1 - o.z0;
    const lungo = asseX ? o.x1 - o.x0 : o.z1 - o.z0;
    const n = Math.max(1, Math.round(lungo / SEGMENTO_JERSEY));
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * lungo + 0.03;
      const a1 = ((i + 1) / n) * lungo - 0.03;
      if (asseX) {
        box('cemento', o.x0 + a0, 0, o.z0, o.x0 + a1, 0.3, o.z1, 1);
        box('cemento', o.x0 + a0, 0.3, o.z0 + 0.17, o.x0 + a1, o.altezza, o.z1 - 0.17, 1);
      } else {
        box('cemento', o.x0, 0, o.z0 + a0, o.x1, 0.3, o.z0 + a1, 1);
        box('cemento', o.x0 + 0.17, 0.3, o.z0 + a0, o.x1 - 0.17, o.altezza, o.z0 + a1, 1);
      }
    }
  };

  const sacchi = o => {
    const sacco = new THREE.SphereGeometry(0.5, 8, 5).scale(LARGO_SACCO, ALTO_SACCO * 1.15, 0.44);
    const file = Math.round(o.altezza / ALTO_SACCO);
    const quanti = Math.floor((o.x1 - o.x0) / LARGO_SACCO);
    for (let r = 0; r < file; r++) {
      const scarto = (r % 2) * LARGO_SACCO * 0.5;
      for (let i = 0; i < quanti - (r % 2); i++) {
        for (const z of [o.z0 + 0.25, o.z1 - 0.25]) statico.aggiungi('sacco', sacco, o.x0 + LARGO_SACCO * (i + 0.5) + scarto, ALTO_SACCO * (r + 0.5), z, (i * 0.37 + r) % 0.2 - 0.1);
      }
    }
  };

  const cantiere = o => {
    const lati = [
      [o.x0, o.z0, o.x1, o.z0], [o.x1, o.z0, o.x1, o.z1], [o.x1, o.z1, o.x0, o.z1], [o.x0, o.z1, o.x0, o.z0],
    ];
    for (const [ax, az, bx, bz] of lati) {
      const lungo = Math.hypot(bx - ax, bz - az);
      const n = Math.max(1, Math.ceil(lungo / PANNELLO_RECINTO));
      const ry = Math.atan2(bz - az, bx - ax);
      for (let i = 0; i < n; i++) {
        const t0 = i / n;
        const t1 = (i + 1) / n;
        const px = ax + (bx - ax) * t0;
        const pz = az + (bz - az) * t0;
        const qx = ax + (bx - ax) * t1;
        const qz = az + (bz - az) * t1;
        statico.aggiungi('rete', new THREE.PlaneGeometry(lungo / n - 0.06, 1.8), (px + qx) / 2, 1.05, (pz + qz) / 2, -ry);
        statico.aggiungi('zincato', new THREE.BoxGeometry(lungo / n, 0.04, 0.04), (px + qx) / 2, 1.95, (pz + qz) / 2, -ry);
        statico.aggiungi('zincato', new THREE.BoxGeometry(lungo / n, 0.04, 0.04), (px + qx) / 2, 0.15, (pz + qz) / 2, -ry);
        cil('zincato', px, 0.1, pz, 0.025, 1.9, 6);
        box('cemento', px - 0.3, 0, pz - 0.12, px + 0.3, 0.12, pz + 0.12, 1);
      }
    }
    box('terra', o.x0 + 0.4, 0, o.z0 + 0.4, o.x1 - 0.4, 0.03, o.z1 - 0.4, 2);
    statico.aggiungi('terra', new THREE.SphereGeometry(1.2, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 0.9), o.x0 + 1.4, 0, o.z1 - 1.5);
    for (const [dz, dy] of [[0, 0.42], [0.86, 0.42], [0.43, 1.12]]) statico.aggiungi('cemento', new THREE.CylinderGeometry(0.42, 0.42, 1.6, 14, 1, true), o.x1 - 1.5, dy, o.z0 + 1.2 + dz, 0, 0, Math.PI / 2);
    cartello(['COMUNE DI CERANO', 'LAVORI IN CORSO'], o.x1 + 0.03, 1.35, (o.z0 + o.z1) / 2, { x: 1, z: 0 }, 1.3, 0.62, { larghezza: 256, altezza: 124, sfondo: '#f4f2ec', colore: '#c81e1e', font: 'bold 22px Arial, sans-serif', bordo: '#c81e1e' });
  };

  const cassonetti = o => {
    const asseX = o.x1 - o.x0 >= o.z1 - o.z0;
    const lungo = asseX ? o.x1 - o.x0 : o.z1 - o.z0;
    const n = Math.max(1, Math.round(lungo / 1.3));
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * lungo + 0.05;
      const a1 = ((i + 1) / n) * lungo - 0.05;
      const [x0, z0, x1, z1] = asseX ? [o.x0 + a0, o.z0, o.x0 + a1, o.z1] : [o.x0, o.z0 + a0, o.x1, o.z0 + a1];
      box('cassonetto', x0, 0.05, z0, x1, 1.25, z1, 1);
      box('cassonetto', x0 - 0.04, 1.25, z0 - 0.04, x1 + 0.04, 1.35, z1 + 0.04, 1);
    }
  };

  const disegna = { pullman, ambulanza, furgone, bancarella, jersey, sacchi, cantiere, cassonetti };
  for (const o of OSTACOLI) {
    if (o.tipo === 'auto' && o.colore) automobile(o);
    else disegna[o.tipo]?.(o);
  }

  const bagliori = [];
  const luceTombino = texturaAlone('rgba(130,255,150,0.55)');
  for (const f of FINESTRE.filter(q => q.tana && q.zona === 'piazza')) {
    const { x, z } = f.interno;
    cil('ferro', x, 0, z, 0.66, 0.035, 20);
    statico.aggiungi('grata', new THREE.CircleGeometry(0.6, 24).rotateX(-Math.PI / 2), x, 0.037, z);
    const alone = new THREE.Sprite(new THREE.SpriteMaterial({ map: luceTombino, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    alone.position.set(x, 0.25, z);
    alone.scale.set(1.5, 0.5, 1);
    scena.add(alone);
    bagliori.push(alone);
  }

  return {
    aggiorna(tempo) {
      lampeggianti.emissiveIntensity = Math.sin(tempo * 9) > 0 ? 1.8 : 0.15;
      bagliori.forEach((b, i) => { b.material.opacity = 0.45 + Math.sin(tempo * 1.7 + i * 2.1) * 0.25; });
    },
  };
}

function unisci(pezzi, materiali) {
  const gruppo = new THREE.Group();
  for (const [chiave, geometrie] of Object.entries(pezzi)) gruppo.add(new THREE.Mesh(mergeGeometries(geometrie, false), materiali[chiave]));
  return gruppo;
}

function creaCarro(mat) {
  const pezzi = { legno: [], legnoScuro: [], oro: [], velluto: [], ferro: [] };
  const metti = (chiave, g, x, y, z) => pezzi[chiave].push(g.translate(x, y, z));
  metti('legno', new THREE.BoxGeometry(1.3, 0.12, 2.6), 0, 0.76, 0);
  for (const s of [-1, 1]) {
    metti('legno', new THREE.BoxGeometry(0.06, 0.26, 2.6), s * 0.62, 0.95, 0);
    metti('legnoScuro', new THREE.BoxGeometry(0.06, 0.06, 1.9), s * 0.4, 0.62, 2.2);
    metti('ferro', new THREE.BoxGeometry(0.04, 1.5, 0.04), s * 0.6, 1.57, 1.22);
    metti('ferro', new THREE.BoxGeometry(0.04, 1.5, 0.04), s * 0.6, 1.57, -1.22);
  }
  metti('legnoScuro', new THREE.BoxGeometry(0.62, 0.5, 2), 0, 1.07, 0);
  metti('legnoScuro', new THREE.BoxGeometry(0.7, 0.08, 2.08), 0, 1.36, 0);
  metti('velluto', new THREE.BoxGeometry(0.74, 0.02, 1.1), 0, 1.41, 0);
  metti('oro', new THREE.BoxGeometry(0.07, 0.03, 0.8), 0, 1.43, 0.35);
  metti('oro', new THREE.BoxGeometry(0.42, 0.03, 0.07), 0, 1.43, 0.55);
  const carro = unisci(pezzi, mat);
  const ruote = [-1, 1].map(s => {
    const ruota = new THREE.Group();
    const cerchio = new THREE.Mesh(new THREE.TorusGeometry(RAGGIO_RUOTA_CARRO, 0.05, 6, 18).rotateY(Math.PI / 2), mat.legnoScuro);
    const raggi = new THREE.Mesh(mergeGeometries([0, 1, 2].map(i => new THREE.BoxGeometry(0.04, RAGGIO_RUOTA_CARRO * 2, 0.04).rotateX((i * Math.PI) / 3))), mat.legnoScuro);
    ruota.add(cerchio, raggi);
    ruota.position.set(s * 0.74, RAGGIO_RUOTA_CARRO, -0.15);
    carro.add(ruota);
    return ruota;
  });
  const lanterna = new THREE.MeshBasicMaterial({ color: 0xffc070 });
  for (const z of [1.22, -1.22]) for (const s of [-1, 1]) {
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.16), lanterna);
    l.position.set(s * 0.6, 2.42, z);
    carro.add(l);
  }
  carro.visible = false;
  return { carro, ruote };
}

export function creaVoto(scena, { mat, statico, box, cil, quadrante }) {
  const leggio = ACQUISTI.find(a => a.tipo === 'libro');
  const { x: lx, z: lz } = leggio.posizione;
  cil('legnoScuro', lx, PAVIMENTO_CHIESA, lz, 0.24, 0.05, 10);
  cil('legnoScuro', lx, PAVIMENTO_CHIESA, lz, 0.045, 1.05, 8);
  statico.aggiungi('legnoScuro', new THREE.BoxGeometry(0.62, 0.03, 0.44), lx, PAVIMENTO_CHIESA + 1.1, lz, 0, 0.45);
  const pagine = new THREE.MeshStandardMaterial({ color: 0xeee2c4, roughness: 0.9, emissive: 0xffd08a, emissiveIntensity: 0 });
  const libro = new THREE.Group();
  const copertina = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.34), mat.velluto);
  libro.add(copertina);
  for (const s of [-1, 1]) {
    const foglio = new THREE.Mesh(new THREE.BoxGeometry(0.235, 0.035, 0.32), pagine);
    foglio.position.set(s * 0.122, 0.028, 0);
    foglio.rotation.z = s * 0.09;
    libro.add(foglio);
  }
  libro.position.set(lx, PAVIMENTO_CHIESA + 1.14, lz);
  libro.rotation.x = 0.45;
  libro.visible = false;
  scena.add(libro);

  const oraAccesa = new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,110,20,1)'), transparent: true, depthWrite: false });
  const ore = NUMERI_OROLOGIO.filter(n => ORE_DEL_BEATO.includes(n.ora)).map(n => {
    const s = new THREE.Sprite(oraAccesa);
    s.position.set(n.x + n.n.x * 0.05, n.y, n.z + n.n.z * 0.05);
    s.scale.setScalar(0.75);
    s.visible = false;
    scena.add(s);
    return { s, prima: ORE_DEL_BEATO.indexOf(n.ora) };
  });

  const { carro, ruote } = creaCarro(mat);
  scena.add(carro);
  const arrivo = puntoCarro(Infinity);
  const fiammella = new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,170,70,1)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const ceri = [[-1.3, -1.4], [1.3, -1.4], [-1.3, 1.4], [1.3, 1.4]].map(([dx, dz]) => {
    const x = arrivo.x + dx;
    const z = arrivo.z + dz;
    cil('oro', x, PAVIMENTO_CHIESA, z, 0.13, 0.05, 10);
    cil('oro', x, PAVIMENTO_CHIESA, z, 0.025, 1.1, 6);
    cil('pietraBianca', x, PAVIMENTO_CHIESA + 1.1, z, 0.045, 0.32, 8);
    const fiamma = new THREE.Sprite(fiammella);
    fiamma.position.set(x, PAVIMENTO_CHIESA + 1.5, z);
    fiamma.scale.set(0.22, 0.34, 1);
    fiamma.visible = false;
    scena.add(fiamma);
    return fiamma;
  });

  const fonte = { x: arrivo.x, y: 2.4, z: arrivo.z, colore: 0xffc070, prima: 0, dopo: 0, portata: 11, mobile: true };
  let s = null;

  return {
    fonte,
    aggiorna(vista, dt, tempo) {
      const v = vista.piazza?.voto;
      const fase = v?.fase ?? VOTO.STATUE;
      libro.visible = fase >= VOTO.LIBRO;
      pagine.emissiveIntensity = fase === VOTO.LIBRO ? 0.4 + Math.sin(tempo * 3) * 0.3 : 0;
      for (const o of ore) o.s.visible = fase === VOTO.OROLOGIO && o.prima < v.ore;
      if (quadrante) quadrante.emissiveIntensity = fase === VOTO.OROLOGIO ? 0.3 + (Math.sin(tempo * 2.2) * 0.5 + 0.5) * 0.45 : 0.25;
      carro.visible = fase >= VOTO.CARRO;
      fonte.prima = fonte.dopo = carro.visible ? LUCE_CARRO : 0;
      if (!carro.visible) {
        s = null;
        for (const c of ceri) c.visible = false;
        return;
      }
      const voluto = fase === VOTO.CARRO ? v.carro : Infinity;
      const prima = s;
      s = s === null || !Number.isFinite(voluto) ? voluto : s + (voluto - s) * Math.min(1, dt * INSEGUI_CARRO);
      const p = puntoCarro(s);
      carro.position.set(p.x, quota(p.x, p.z), p.z);
      carro.rotation.y = p.yaw;
      if (prima !== null && Number.isFinite(prima) && Number.isFinite(s)) for (const r of ruote) r.rotation.x += (s - prima) / RAGGIO_RUOTA_CARRO;
      Object.assign(fonte, { x: p.x, z: p.z });
      const lumi = fase === VOTO.VEGLIA ? Math.floor(v.anime / ANIME_PER_CERO) : fase > VOTO.VEGLIA ? CERI : 0;
      ceri.forEach((c, i) => {
        c.visible = i < lumi;
        c.scale.y = 0.34 + Math.sin(tempo * 11 + i) * 0.04;
      });
    },
  };
}
