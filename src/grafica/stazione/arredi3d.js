import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OSTACOLI, ISOLE, ACQUISTI, ALTEZZA_PENSILINA, PENSILINA } from '../../mappe/stazione.js';
import { scatolaUV, texturaPrezzi, texturaSchermoPompa, texturaAdr, texturaRimorchio, tela } from './kit.js';

const SAGOMA_AUTO = Object.freeze([[0, 0.3], [0, 0.68], [0.04, 0.8], [0.26, 0.86], [0.4, 1.3], [0.71, 1.33], [0.87, 0.96], [1, 0.9], [1, 0.3]]);
const SAGOMA_VETRI = Object.freeze([[0.39, 0.9], [0.43, 1.25], [0.7, 1.28], [0.84, 0.95]]);
const PRODOTTI = Object.freeze(['prodRosso', 'prodGiallo', 'prodBlu', 'prodVerde', 'prodBianco']);

function estrusa(punti, lungo, largo, smusso = 0.05) {
  const forma = new THREE.Shape();
  punti.forEach(([a, y], i) => (i ? forma.lineTo(a * lungo - lungo / 2, y) : forma.moveTo(a * lungo - lungo / 2, y)));
  return new THREE.ExtrudeGeometry(forma, { depth: largo - smusso * 2, bevelEnabled: smusso > 0, bevelThickness: smusso, bevelSize: smusso, bevelSegments: 2, curveSegments: 4 })
    .translate(0, 0, -(largo - smusso * 2) / 2);
}

const nonIndicizzata = g => (g.index ? g.toNonIndexed() : g);

function colocaModello(scena, modello, x, y, z, ry = 0, scala = 1) {
  if (!modello) return null;
  const copia = modello.clone();
  copia.position.set(x, y, z);
  copia.rotation.y = ry;
  copia.scale.setScalar(scala);
  scena.add(copia);
  copia.traverse(o => { o.matrixAutoUpdate = false; o.updateMatrix(); });
  copia.updateMatrixWorld(true);
  return copia;
}

export function costruisciArredi({ scena, statico, mat, box, cil, pannello, cartello, modelli, oggetti, caso }) {
  const ostacoli = tipo => OSTACOLI.filter(o => o.tipo === tipo);
  const modello = nome => modelli.get(nome) ?? oggetti.get(nome) ?? null;
  const metti = (nome, x, y, z, ry = 0, scala = 1) => colocaModello(scena, modello(nome), x, y, z, ry, scala);
  const tinte = new Map();
  const tinta = (colore, extra = {}) => {
    const chiave = `auto${colore.toString(16)}`;
    if (!tinte.has(chiave)) tinte.set(chiave, new THREE.MeshPhysicalMaterial({ color: colore, metalness: 0.6, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.25, ...extra }));
    mat[chiave] = tinte.get(chiave);
    return chiave;
  };

  function automobile(o, y = 0, ruotaExtra = 0) {
    const asseX = o.x1 - o.x0 >= o.z1 - o.z0;
    const lungo = (asseX ? o.x1 - o.x0 : o.z1 - o.z0) - 0.1;
    const largo = (asseX ? o.z1 - o.z0 : o.x1 - o.x0) - 0.12;
    const k = tinta(o.colore ?? 0x8a8e94);
    const pezzi = { [k]: [], vetroAuto: [], gomma: [], cromo: [], faroAuto: [], fanaleAuto: [] };
    pezzi[k].push(estrusa(SAGOMA_AUTO, lungo, largo));
    pezzi.vetroAuto.push(estrusa(SAGOMA_VETRI, lungo, largo + 0.03, 0.01));
    for (const a of [0.17, 0.81]) for (const s of [-1, 1]) {
      pezzi.gomma.push(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 18).rotateX(Math.PI / 2).translate((a - 0.5) * lungo, 0.32, s * (largo / 2 - 0.04)));
      pezzi.cromo.push(new THREE.CylinderGeometry(0.19, 0.19, 0.235, 12).rotateX(Math.PI / 2).translate((a - 0.5) * lungo, 0.32, s * (largo / 2 - 0.04)));
    }
    for (const s of [-1, 1]) {
      pezzi.faroAuto.push(new THREE.BoxGeometry(0.06, 0.12, 0.3).translate(-lungo / 2 - 0.03, 0.66, s * (largo / 2 - 0.24)));
      pezzi.fanaleAuto.push(new THREE.BoxGeometry(0.06, 0.12, 0.32).translate(lungo / 2 + 0.03, 0.74, s * (largo / 2 - 0.24)));
      pezzi.gomma.push(new THREE.BoxGeometry(0.1, 0.06, 0.16).translate(-lungo * 0.14, 1.0, s * (largo / 2 + 0.05)));
    }
    pezzi.gomma.push(new THREE.BoxGeometry(0.1, 0.18, largo + 0.04).translate(-lungo / 2 - 0.02, 0.38, 0));
    pezzi.gomma.push(new THREE.BoxGeometry(0.1, 0.18, largo + 0.04).translate(lungo / 2 + 0.02, 0.38, 0));
    if (o.incidentata) pezzi.cromo.push(new THREE.BoxGeometry(0.4, 0.3, largo * 0.8).rotateZ(0.45).translate(-lungo / 2 + 0.25, 0.85, 0));
    const cx = (o.x0 + o.x1) / 2;
    const cz = (o.z0 + o.z1) / 2;
    const ry = (asseX ? 0 : Math.PI / 2) + (o.ruota ?? 0) + ruotaExtra;
    for (const [chiave, geometrie] of Object.entries(pezzi)) {
      if (geometrie.length) statico.aggiungi(chiave, mergeGeometries(geometrie.map(nonIndicizzata)), cx, y, cz, ry);
    }
    if (o.portiera) statico.aggiungi(k, new THREE.BoxGeometry(1, 0.7, 0.06).translate(0.5, 0, 0), cx - Math.sin(ry) * 0, y + 0.78, cz + largo / 2 + 0.03, ry + 0.9);
  }

  for (const o of ostacoli('auto')) automobile(o);

  const schermiPompe = [];
  for (const isola of ISOLE) {
    const cx = isola.x;
    box('cementoChiaro', cx - 0.6, 0, isola.z0, cx + 0.6, 0.18, isola.z1, 1);
    for (const z of [isola.z0, isola.z1 - 0.3]) box('pericolo', cx - 0.6, 0.18, z, cx + 0.6, 0.2, z + 0.3, 1);
    box('metalloScuro', cx - 0.25, 0.18, -7.25, cx + 0.25, ALTEZZA_PENSILINA, -6.75, 1);
    box('rossoMarchio', cx - 0.27, 0.6, -7.27, cx + 0.27, 1.1, -6.73, 1);
    for (const [z, numero, verso] of [[-8.4, isola.id * 2 + 1, -1], [-5.6, isola.id * 2 + 2, 1]]) {
      box('biancoPompa', cx - 0.42, 0.18, z - 0.3, cx + 0.42, 1.95, z + 0.3, 1);
      box('rossoMarchio', cx - 0.43, 1.6, z - 0.31, cx + 0.43, 1.95, z + 0.31, 1);
      box('metalloScuro', cx - 0.43, 0.18, z - 0.31, cx + 0.43, 0.32, z + 0.31, 1);
      for (const lato of [-1, 1]) {
        const schermo = pannello(new THREE.MeshStandardMaterial({ map: texturaSchermoPompa(numero), emissive: 0xffffff, emissiveMap: null, emissiveIntensity: 0, roughness: 0.3 }), 0.42, 0.42, cx + lato * 0.43, 1.28, z, { x: lato, z: 0 });
        schermo.material.emissiveMap = schermo.material.map;
        schermiPompe.push(schermo);
        for (const k of [-0.18, 0, 0.18]) {
          cil('metalloScuro', cx + lato * 0.46, 0.78, z + k, 0.035, 0.18, 8);
          statico.aggiungi('gomma', new THREE.TorusGeometry(0.28, 0.022, 6, 14, Math.PI), cx + lato * 0.47, 0.98, z + k, Math.PI / 2, 0, Math.PI / 2);
        }
      }
    }
    for (const z of [isola.z0 - 0.25, isola.z1 + 0.25]) cil('pericolo', cx, 0, z, 0.08, 0.9, 10);
  }

  const totem = ostacoli('totem')[0];
  if (totem) {
    const cx = (totem.x0 + totem.x1) / 2;
    box('metalloScuro', totem.x0, 0, totem.z0, totem.x1, totem.altezza, totem.z1, 1);
    box('cementoChiaro', totem.x0 - 0.3, 0, totem.z0 - 0.3, totem.x1 + 0.3, 0.35, totem.z1 + 0.3, 1);
    for (const [z, verso] of [[totem.z0 - 0.01, -1], [totem.z1 + 0.01, 1]]) {
      const faccia = pannello(new THREE.MeshStandardMaterial({ map: texturaPrezzi(), emissive: 0xffffff, emissiveIntensity: 0.05, roughness: 0.4 }), totem.x1 - totem.x0 - 0.12, 2.6 * (totem.x1 - totem.x0 - 0.12), cx, totem.altezza - 1.5 * (totem.x1 - totem.x0), z, { x: 0, z: verso });
      faccia.material.emissiveMap = faccia.material.map;
      schermiPompe.push(faccia);
    }
  }

  const compressore = ostacoli('compressore')[0];
  if (compressore) {
    box('rossoMarchio', compressore.x0, 0, compressore.z0, compressore.x1, 1.4, compressore.z1, 1);
    box('blu', compressore.x0 - 0.01, 0.9, compressore.z0 + 0.1, compressore.x0 + 0.01, 1.3, compressore.z1 - 0.1, 1);
    statico.aggiungi('gomma', new THREE.TorusGeometry(0.22, 0.02, 6, 16), compressore.x0 - 0.02, 0.7, (compressore.z0 + compressore.z1) / 2, Math.PI / 2);
    cartello(['ARIA', 'ACQUA'], compressore.x0 - 0.02, 1.1, (compressore.z0 + compressore.z1) / 2, { x: -1, z: 0 }, 0.7, 0.36, { larghezza: 128, altezza: 64, sfondo: '#1d4f91', colore: '#ffffff', font: 'bold 22px Arial, sans-serif' });
  }

  const ghiaccio = ostacoli('ghiaccio')[0];
  if (ghiaccio) {
    box('biancoPompa', ghiaccio.x0, 0, ghiaccio.z0, ghiaccio.x1, ghiaccio.altezza, ghiaccio.z1, 1);
    cartello(['GHIACCIO'], (ghiaccio.x0 + ghiaccio.x1) / 2, 0.7, ghiaccio.z0 - 0.01, { x: 0, z: -1 }, 1.8, 0.5, { larghezza: 256, altezza: 64, sfondo: '#3fa0e0', colore: '#ffffff', font: '900 40px Arial, sans-serif' });
  }

  for (const j of ostacoli('jersey')) {
    const lungo = Math.hypot(j.x1 - j.x0, j.z1 - j.z0);
    const n = Math.max(1, Math.round(lungo / 1.55));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      metti('concrete_road_barrier', j.x0 + (j.x1 - j.x0) * t, 0, (j.z0 + j.z1) / 2, j.ruota ?? 0, 1);
    }
  }
  for (const b of ostacoli('bidoni')) {
    metti('Barrel_01', b.x0 + 0.4, 0, b.z0 + 0.5, 0.3);
    metti('Barrel_01', b.x0 + 1.1, 0, b.z0 + 0.6, 1.2);
    metti('Barrel_01', b.x0 + 0.6, 0, b.z0 + 1.4, 2.2);
  }
  const segnale = ostacoli('cartello')[0];
  if (segnale) {
    cil('zincato', (segnale.x0 + segnale.x1) / 2, 0, (segnale.z0 + segnale.z1) / 2, 0.05, 2.6, 8);
    cartello(['USCITA', '→ A4 MILANO'], (segnale.x0 + segnale.x1) / 2, 2.2, segnale.z0 - 0.06, { x: 0, z: -1 }, 1.6, 0.8, { larghezza: 256, altezza: 128, sfondo: '#1d6b3a', colore: '#ffffff', font: 'bold 34px Arial, sans-serif', bordo: '#ffffff' });
  }

  const bancone = ostacoli('bancone')[0];
  box('legnoBar', bancone.x0, 0, bancone.z0, bancone.x1, 1.02, bancone.z1, 1);
  box('granito', bancone.x0 - 0.05, 1.02, bancone.z0 - 0.12, bancone.x1 + 0.05, 1.1, bancone.z1 + 0.05, 1);
  box('cromo', bancone.x1 - 1.6, 1.1, bancone.z0 + 0.25, bancone.x1 - 0.6, 1.62, bancone.z1 - 0.1, 1);
  box('vetroAuto', bancone.x1 - 1.58, 1.18, bancone.z0 + 0.24, bancone.x1 - 0.62, 1.58, bancone.z0 + 0.26, 1);
  box('cromo', bancone.x0 + 1, 1.1, bancone.z0 + 0.3, bancone.x0 + 1.9, 1.62, bancone.z1 - 0.15, 1);
  box('nero', bancone.x0 + 1.05, 1.25, bancone.z0 + 0.28, bancone.x0 + 1.85, 1.5, bancone.z0 + 0.3, 1);
  metti('CashRegister_01', bancone.x0 + 3.3, 1.1, bancone.z0 + 0.45, Math.PI);
  for (let x = bancone.x0 + 0.8; x < bancone.x1 - 0.4; x += 1.1) {
    cil('cromo', x, 0, bancone.z0 - 0.55, 0.2, 0.04, 14);
    cil('cromo', x, 0.04, bancone.z0 - 0.55, 0.03, 0.66, 8);
    cil('rossoMarchio', x, 0.7, bancone.z0 - 0.55, 0.19, 0.08, 14);
  }
  box('legnoBar', bancone.x0, 0, 19.55, bancone.x1 - 1, 1.0, 19.85, 1);
  for (let x = bancone.x0 + 0.2; x < bancone.x1 - 1.2; x += 0.42) for (const y of [1.55, 2.05]) cil(PRODOTTI[Math.floor(caso() * PRODOTTI.length)], x, y, 19.7, 0.04, 0.3, 6);
  box('cromo', bancone.x0, 1.5, 19.55, bancone.x1 - 1, 1.53, 19.85, 1);
  box('cromo', bancone.x0, 2.0, 19.55, bancone.x1 - 1, 2.03, 19.85, 1);
  cartello(['CAFFÈ 1,30', 'CAPPUCCINO 1,60', 'PANINO 5,50'], -10.5, 2.7, 19.83, { x: 0, z: -1 }, 2.2, 0.7, { larghezza: 512, altezza: 160, sfondo: '#1b1f24', colore: '#f2e2c0', font: 'bold 34px Arial, sans-serif' });

  for (const s of ostacoli('scaffale')) {
    box('metalloChiaro', s.x0, 0, s.z0 + 0.36, s.x1, s.altezza, s.z0 + 0.44, 1);
    for (const y of [0.12, 0.6, 1.08, 1.56]) {
      box('metalloChiaro', s.x0, y, s.z0, s.x1, y + 0.03, s.z1, 1);
      for (const lato of [s.z0 + 0.18, s.z1 - 0.18]) {
        for (let x = s.x0 + 0.15; x < s.x1 - 0.1; x += 0.22 + caso() * 0.12) {
          if (caso() < 0.18) continue;
          const h = 0.18 + caso() * 0.22;
          box(PRODOTTI[Math.floor(caso() * PRODOTTI.length)], x - 0.08, y + 0.03, lato - 0.12, x + 0.08, y + 0.03 + h, lato + 0.12, 1);
        }
      }
    }
    box('rossoMarchio', s.x0, 1.9, s.z0, s.x1, 1.94, s.z1, 1);
  }

  const frigo = ostacoli('frigo')[0];
  box('metalloScuro', frigo.x0, 0, frigo.z0, frigo.x1, frigo.altezza, frigo.z1, 1);
  const interniFrigo = pannello(new THREE.MeshStandardMaterial({ color: 0xdff4ff, emissive: 0xbfe8ff, emissiveIntensity: 0.05, roughness: 0.4 }), frigo.z1 - frigo.z0 - 0.3, 1.8, frigo.x0 - 0.005, 1.15, (frigo.z0 + frigo.z1) / 2, { x: -1, z: 0 });
  for (let z = frigo.z0 + 0.25; z < frigo.z1 - 0.2; z += 0.16) for (const y of [0.45, 0.95, 1.45]) cil(PRODOTTI[Math.floor(caso() * PRODOTTI.length)], frigo.x0 + 0.12, y, z, 0.04, 0.26, 6);
  for (let z = frigo.z0; z < frigo.z1 - 0.1; z += 1.07) box('cromo', frigo.x0 - 0.04, 0.2, z, frigo.x0 - 0.02, 2.05, z + 0.05, 1);
  box('vetroFrigo', frigo.x0 - 0.03, 0.2, frigo.z0 + 0.05, frigo.x0 - 0.02, 2.05, frigo.z1 - 0.05, 1);

  const cassa = ostacoli('cassaNegozio')[0];
  box('legnoBar', cassa.x0, 0, cassa.z0, cassa.x1, 0.98, cassa.z1, 1);
  box('granito', cassa.x0 - 0.05, 0.98, cassa.z0 - 0.05, cassa.x1 + 0.05, 1.04, cassa.z1 + 0.05, 1);
  metti('CashRegister_01', cassa.x0 + 0.6, 1.04, cassa.z0 + 0.5, 0);
  box('metalloScuro', cassa.x1 - 0.9, 1.04, cassa.z0 + 0.2, cassa.x1 - 0.2, 1.5, cassa.z0 + 0.5, 1);
  cartello(['LOTTERIE'], cassa.x1 - 0.55, 1.4, cassa.z0 + 0.19, { x: 0, z: -1 }, 0.66, 0.16, { larghezza: 128, altezza: 32, sfondo: '#1d4f91', colore: '#ffd84a', font: 'bold 20px Arial, sans-serif' });

  for (const t of ostacoli('tavolino')) {
    const cx = (t.x0 + t.x1) / 2;
    const cz = (t.z0 + t.z1) / 2;
    cil('granito', cx, 0.72, cz, 0.42, 0.04, 18);
    cil('cromo', cx, 0, cz, 0.04, 0.72, 8);
    cil('cromo', cx, 0, cz, 0.25, 0.02, 12);
    for (const a of [0.4, 2.6]) {
      const sx = cx + Math.cos(a) * 0.75;
      const sz = cz + Math.sin(a) * 0.75;
      cil('rossoMarchio', sx, 0.45, sz, 0.2, 0.06, 12);
      cil('cromo', sx, 0, sz, 0.025, 0.45, 6);
    }
  }
  metti('cardboard_box_01', -15.2, 0, 18.2, 0.3, 1.2);
  metti('cardboard_box_01', -15.3, 0.4, 18.3, 1.2, 1.1);
  metti('plastic_crate_01', -13.6, 0, 19.4, 0.1, 1.3);
  metti('plastic_crate_01', -13.6, 0.34, 19.4, 0.4, 1.3);
  metti('WetFloorSign_01', -2.4, 0, 7.4, 0.6, 1);
  metti('hand_truck', -8.4, 0, 19.1, Math.PI, 1);

  for (const [x, z] of [[11, 9], [15, 9], [11, 15], [15, 15]]) {
    box('gialloPonte', x - 0.2, 0, z - 0.2, x + 0.2, 3.4, z + 0.2, 1);
    box('metalloScuro', x - 0.32, 0, z - 0.32, x + 0.32, 0.06, z + 0.32, 1);
  }
  for (const z of [9, 15]) box('gialloPonte', 10.8, 3.35, z - 0.15, 15.2, 3.55, z + 0.15, 1);
  for (const [x, z, ry] of [[11, 10.3, 0.5], [11, 13.7, -0.5], [15, 10.3, -0.5 + Math.PI], [15, 13.7, 0.5 + Math.PI]]) {
    statico.aggiungi('metalloScuro', new THREE.BoxGeometry(1.4, 0.08, 0.16).translate(0.7, 0, 0), x, 1.72, z, ry);
  }
  automobile({ x0: 12.1, z0: 9.7, x1: 13.9, z1: 14.3, colore: 0x2f6b46 }, 1.78);

  const banco = ostacoli('banco')[0];
  box('metalloScuro', banco.x0, 0, banco.z0, banco.x1, 0.92, banco.z1, 1);
  box('legnoBar', banco.x0 - 0.04, 0.92, banco.z0 - 0.04, banco.x1 + 0.04, 0.98, banco.z1 + 0.02, 1);
  pannello(new THREE.MeshStandardMaterial({ map: tela(512, 128, (ctx, l, a) => {
    ctx.fillStyle = '#7a6040';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#2a2620';
    for (let y = 8; y < a; y += 14) for (let x = 8; x < l; x += 14) ctx.fillRect(x, y, 3, 3);
    ctx.fillStyle = '#9aa2aa';
    for (let i = 0; i < 18; i++) {
      const x = 20 + i * 27;
      ctx.fillRect(x, 20, 5, 50 + (i % 4) * 12);
      ctx.fillRect(x - 6, 16, 17, 8);
    }
  }), roughness: 0.8 }), banco.x1 - banco.x0, 1.2, (banco.x0 + banco.x1) / 2, 1.8, banco.z1 + 0.13, { x: 0, z: -1 });
  metti('metal_toolbox', banco.x0 + 1.2, 0.98, banco.z0 + 0.45, 0.2);
  metti('tire_pump', banco.x1 - 0.6, 0, banco.z0 - 0.4, 0.5);

  for (const g of ostacoli('gomme')) {
    for (let i = 0; i < 4; i++) for (const [dx, dz] of [[0.45, 0.45], [1.45, 0.5], [0.6, 1.45]]) {
      if (i > 2 && dx > 1) continue;
      const copia = metti('old_tyre', g.x0 + dx, 0.09 + i * 0.17, g.z0 + dz, 0, 1.2);
      if (copia) {
        copia.rotation.x = Math.PI / 2;
        copia.updateMatrix();
        copia.updateMatrixWorld(true);
      }
    }
  }
  for (const f of ostacoli('fusti')) {
    metti('Barrel_01', f.x0 + 0.4, 0, f.z0 + 0.45, 0);
    metti('Barrel_01', f.x0 + 1.15, 0, f.z0 + 0.5, 1.1);
    metti('Barrel_01', f.x0 + 0.5, 0, f.z0 + 1.25, 2);
  }
  for (const c of ostacoli('carrello')) metti('tool_cart', (c.x0 + c.x1) / 2, 0, (c.z0 + c.z1) / 2, Math.PI / 2, 0.85);

  const cisterna = ostacoli('cisterna')[0];
  const czC = (cisterna.z0 + cisterna.z1) / 2;
  box('metalloScuro', cisterna.x0 + 0.2, 0.75, czC - 0.5, cisterna.x1, 1.05, czC + 0.5, 1);
  statico.aggiungi('acciaioLucido', new THREE.CylinderGeometry(1.22, 1.22, cisterna.x1 - cisterna.x0 - 0.4, 28).rotateZ(Math.PI / 2), (cisterna.x0 + cisterna.x1) / 2, 2.3, czC);
  for (const x of [cisterna.x0 + 0.2, cisterna.x1 - 0.2]) statico.aggiungi('acciaioLucido', new THREE.SphereGeometry(1.22, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.25, 1).rotateZ(x < czC ? Math.PI / 2 : -Math.PI / 2), x, 2.3, czC);
  box('metalloScuro', cisterna.x0 + 1, 3.48, czC - 0.2, cisterna.x1 - 1, 3.56, czC + 0.2, 1);
  for (const x of [cisterna.x0 + 1.2, cisterna.x0 + 2.5, cisterna.x1 - 2]) for (const s of [-1, 1]) {
    statico.aggiungi('gomma', new THREE.CylinderGeometry(0.52, 0.52, 0.32, 18).rotateX(Math.PI / 2), x, 0.52, czC + s * 1.05);
    statico.aggiungi('cromo', new THREE.CylinderGeometry(0.28, 0.28, 0.34, 10).rotateX(Math.PI / 2), x, 0.52, czC + s * 1.05);
  }
  const adr = new THREE.MeshStandardMaterial({ map: texturaAdr(), roughness: 0.6 });
  pannello(adr, 0.42, 0.3, cisterna.x0 - 0.01, 1.1, czC, { x: -1, z: 0 });
  for (const s of [-1, 1]) {
    pannello(adr, 0.42, 0.3, (cisterna.x0 + cisterna.x1) / 2, 1.0, czC + s * 1.26, { x: 0, z: s });
    cartello(['◆'], cisterna.x0 + 2, 2.3, czC + s * 1.23, { x: 0, z: s }, 0.5, 0.5, { larghezza: 64, altezza: 64, sfondo: '#d8261d', colore: '#ffffff', font: 'bold 40px Arial, sans-serif' });
  }

  const trattore = ostacoli('trattore')[0];
  motrice(trattore.x0, trattore.z0, trattore.x1, trattore.z1, 'rossoCamion');

  function motrice(x0, z0, x1, z1, colore, gruppo = null, y = 0) {
    const s = gruppo ? creaSottoStatico() : statico;
    const cz = (z0 + z1) / 2;
    const largo = z1 - z0;
    const b = (k, ax0, ay0, az0, ax1, ay1, az1) => s.aggiungi(k, scatolaUV(ax1 - ax0, ay1 - ay0, az1 - az0, 1), (ax0 + ax1) / 2, y + (ay0 + ay1) / 2, (az0 + az1) / 2);
    b('metalloScuro', x0, 0.6, cz - 0.5, x1, 1.0, cz + 0.5);
    b(colore, x1 - 2.2, 1.0, z0 + 0.1, x1, 3.2, z1 - 0.1);
    b('vetroAuto', x1 - 0.02, 2.1, z0 + 0.25, x1 + 0.01, 3.0, z1 - 0.25);
    b('cromo', x1, 1.05, z0 + 0.3, x1 + 0.05, 1.9, z1 - 0.3);
    b('faroAuto', x1 + 0.03, 1.15, z0 + 0.2, x1 + 0.06, 1.35, z0 + 0.6);
    b('faroAuto', x1 + 0.03, 1.15, z1 - 0.6, x1 + 0.06, 1.35, z1 - 0.2);
    for (const sl of [-1, 1]) b('vetroAuto', x1 - 1.4, 2.2, sl < 0 ? z0 + 0.08 : z1 - 0.1, x1 - 0.3, 2.95, sl < 0 ? z0 + 0.1 : z1 - 0.08);
    for (const x of [x1 - 0.8, x0 + 0.6]) for (const sl of [-1, 1]) {
      s.aggiungi('gomma', new THREE.CylinderGeometry(0.52, 0.52, 0.34, 18).rotateX(Math.PI / 2), x, y + 0.52, cz + sl * (largo / 2 - 0.2));
      s.aggiungi('cromo', new THREE.CylinderGeometry(0.28, 0.28, 0.36, 10).rotateX(Math.PI / 2), x, y + 0.52, cz + sl * (largo / 2 - 0.2));
    }
    b('cromo', x1 - 2.6, 1.0, z1 - 0.35, x1 - 2.3, 3.6, z1 - 0.05);
    if (gruppo) for (const mesh of s.finisci(gruppo, mat)) mesh.matrixAutoUpdate = true;
  }

  function creaSottoStatico() {
    const pezzi = new Map();
    return {
      aggiungi(chiave, geometria, x = 0, y = 0, z = 0, ry = 0) {
        const g = nonIndicizzata(geometria).clone();
        g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(1, 1, 1)));
        if (!pezzi.has(chiave)) pezzi.set(chiave, []);
        pezzi.get(chiave).push(g);
      },
      finisci(gruppo, materiali) {
        const meshes = [];
        for (const [chiave, elenco] of pezzi) {
          const mesh = new THREE.Mesh(mergeGeometries(elenco.map(g => {
            for (const n of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(n)) g.deleteAttribute(n);
            if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
            return g;
          }), false), materiali[chiave]);
          gruppo.add(mesh);
          meshes.push(mesh);
        }
        return meshes;
      },
    };
  }

  const rimorchio = ostacoli('rimorchio')[0];
  box('biancoRimorchio', rimorchio.x0, 1.15, rimorchio.z0, rimorchio.x1, 4, rimorchio.z1, 1);
  box('metalloScuro', rimorchio.x0, 0.85, rimorchio.z0 + 0.3, rimorchio.x1, 1.15, rimorchio.z1 - 0.3, 1);
  const logo = new THREE.MeshStandardMaterial({ map: texturaRimorchio(), roughness: 0.6 });
  pannello(logo, rimorchio.x1 - rimorchio.x0 - 0.4, 2.6, (rimorchio.x0 + rimorchio.x1) / 2, 2.6, rimorchio.z0 - 0.01, { x: 0, z: -1 });
  pannello(logo, rimorchio.x1 - rimorchio.x0 - 0.4, 2.6, (rimorchio.x0 + rimorchio.x1) / 2, 2.6, rimorchio.z1 + 0.01, { x: 0, z: 1 });
  for (const x of [rimorchio.x0 + 1.2, rimorchio.x0 + 2.5, rimorchio.x0 + 3.8]) for (const z of [rimorchio.z0 + 0.3, rimorchio.z1 - 0.3]) {
    statico.aggiungi('gomma', new THREE.CylinderGeometry(0.5, 0.5, 0.32, 18).rotateX(Math.PI / 2), x, 0.5, z);
    statico.aggiungi('cromo', new THREE.CylinderGeometry(0.27, 0.27, 0.34, 10).rotateX(Math.PI / 2), x, 0.5, z);
  }
  for (const z of [rimorchio.z0 + 0.5, rimorchio.z1 - 0.5]) box('metalloScuro', rimorchio.x1 - 2.6, 0, z - 0.08, rimorchio.x1 - 2.45, 0.85, z + 0.08, 1);

  for (const c of ostacoli('cassonetti')) {
    const n = Math.round((c.x1 - c.x0) / 1.45);
    for (let i = 0; i < n; i++) {
      const x0 = c.x0 + i * ((c.x1 - c.x0) / n) + 0.05;
      const x1 = c.x0 + (i + 1) * ((c.x1 - c.x0) / n) - 0.05;
      box(i % 2 ? 'cassonettoGiallo' : 'cassonettoVerde', x0, 0.15, c.z0, x1, c.altezza - 0.1, c.z1, 1);
      statico.aggiungi(i % 2 ? 'cassonettoGiallo' : 'cassonettoVerde', scatolaUV(x1 - x0 + 0.06, 0.08, c.z1 - c.z0 + 0.1, 1), (x0 + x1) / 2, c.altezza - 0.02, (c.z0 + c.z1) / 2, 0, -0.12);
      for (const x of [x0 + 0.15, x1 - 0.15]) for (const z of [c.z0 + 0.15, c.z1 - 0.15]) cil('gomma', x, 0, z, 0.07, 0.15, 8);
    }
  }
  for (const p of ostacoli('bancali')) {
    for (let i = 0; i < 3; i++) box('legnoPallet', p.x0, i * 0.15, p.z0, p.x1, i * 0.15 + 0.12, p.z1, 1);
    metti('cardboard_box_01', p.x0 + 0.5, 0.45, p.z0 + 0.5, 0.2, 1.4);
    metti('cardboard_box_01', p.x0 + 1.3, 0.45, p.z0 + 0.6, 1.4, 1.4);
    metti('cardboard_box_01', p.x0 + 0.8, 0.45, p.z0 + 1.15, 2.5, 1.4);
  }
  const container = ostacoli('container')[0];
  box('lamieraContainer', container.x0, 0, container.z0, container.x1, container.altezza, container.z1, 2);
  box('metalloScuro', container.x0 - 0.02, 0, container.z0 - 0.02, container.x0 + 0.15, container.altezza, container.z1 + 0.02, 1);
  box('metalloScuro', container.x1 - 0.15, 0, container.z0 - 0.02, container.x1 + 0.02, container.altezza, container.z1 + 0.02, 1);

  const torre = ostacoli('torre')[0];
  const tx = (torre.x0 + torre.x1) / 2;
  const tz = (torre.z0 + torre.z1) / 2;
  box('gialloPonte', torre.x0, 0.3, torre.z0, torre.x1, 1.3, torre.z1, 1);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) statico.aggiungi('metalloScuro', new THREE.BoxGeometry(1.4, 0.08, 0.08), tx + dx * 0.9, 0.12, tz + dz * 0.9, Math.atan2(dz, dx));
  cil('zincato', tx, 1.3, tz, 0.09, torre.altezza - 1.3, 10, 0.14);
  box('metalloScuro', tx - 1.1, torre.altezza - 0.1, tz - 0.08, tx + 1.1, torre.altezza, tz + 0.08, 1);
  const testeFaro = [];
  for (const dx of [-0.8, -0.27, 0.27, 0.8]) {
    box('metalloScuro', tx + dx - 0.22, torre.altezza - 0.55, tz - 0.25, tx + dx + 0.22, torre.altezza - 0.1, tz + 0.08, 1);
    const lente = pannello(new THREE.MeshStandardMaterial({ color: 0x40464c, emissive: 0xe8f0ff, emissiveIntensity: 0, roughness: 0.2 }), 0.4, 0.4, tx + dx, torre.altezza - 0.33, tz - 0.26, { x: 0, z: -1 });
    lente.rotation.x = -0.5;
    lente.updateMatrix();
    testeFaro.push(lente);
  }

  const gruppoDati = ACQUISTI.find(a => a.tipo === 'gruppo');
  const gruppo = new THREE.Group();
  gruppo.position.set(gruppoDati.posizione.x, 0, gruppoDati.posizione.z + 0.1);
  const motoreGruppo = modello('portable_generator')?.clone();
  if (motoreGruppo) {
    motoreGruppo.scale.setScalar(1.35);
    motoreGruppo.rotation.y = Math.PI;
    gruppo.add(motoreGruppo);
  } else gruppo.add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.7).translate(0, 0.4, 0), mat.gialloPonte));
  scena.add(gruppo);
  const cavo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(gruppoDati.posizione.x + 0.4, 0.3, gruppoDati.posizione.z + 0.3), new THREE.Vector3(gruppoDati.posizione.x + 1.2, 0.03, gruppoDati.posizione.z + 1.5),
    new THREE.Vector3(tx - 0.4, 0.03, tz - 1.2), new THREE.Vector3(tx, 0.8, tz - 0.15),
  ]), 24, 0.025, 6), mat.gomma);
  scena.add(cavo);

  const taniche = ACQUISTI.filter(a => a.tipo === 'tanica').map(a => {
    const t = modello('metal_jerrycan')?.clone() ?? new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.17).translate(0, 0.23, 0), mat.rossoMarchio);
    t.position.set(a.posizione.x, 0, a.posizione.z);
    t.rotation.y = caso() * Math.PI;
    t.scale.setScalar(1.15);
    scena.add(t);
    return t;
  });
  const versate = Array.from({ length: taniche.length }, (_, i) => {
    const t = modello('metal_jerrycan')?.clone() ?? new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.17).translate(0, 0.23, 0), mat.rossoMarchio);
    t.position.set(gruppoDati.posizione.x - 0.9 + i * 0.12, 0.09, gruppoDati.posizione.z + 0.4 + i * 0.35);
    t.rotation.set(Math.PI / 2, 0, 0.4 * i);
    t.visible = false;
    scena.add(t);
    return t;
  });

  box('cementoChiaro', PENSILINA.x0, 0, PENSILINA.z0, PENSILINA.x1, 0.004, PENSILINA.z1, 2);
  return { schermiPompe, interniFrigo, testeFaro, gruppo, motoreGruppo, taniche, versate, motrice: (gruppoCamion, colore) => motrice(-5.5, -1.3, 0, 1.3, colore, gruppoCamion) };
}
