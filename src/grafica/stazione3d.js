import * as THREE from 'three';
import { R } from '../regole.js';
import {
  ZONE, MURI, RECINZIONI, FINESTRE, PORTE, ACQUISTI, FRAMMENTI, CARTELLO_PRONTI, OSTACOLI, OGGETTI, PENSILINA,
  ALTEZZA_MARKET, ALTEZZA_OFFICINA, ALTEZZA_PENSILINA, ALTEZZA_RECINZIONE,
} from '../mappe/stazione.js';
import { GRUPPO } from '../stazione.js';
import { texturaTesto } from './texture.js';
import { creaMacchine } from './macchine3d.js';
import { costruisciArredi } from './stazione/arredi3d.js';
import {
  creaStatico, scatolaUV, pianoUV, facciaUV, tela, creaCasoGrafico, texturaMarchio, texturaInsegna, texturaPannelliSoffitto, texturaVetrina,
  texturaSegnaletica, texturaMacchia, texturaAlone, texturaFuoco, texturaGrattaVinci,
} from './stazione/kit.js';

const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.5;
const DAVANZALE = 0.9;
const ARCHITRAVE = 2.3;
const ALTEZZA_PORTA = 2.4;
const ALTEZZA_SCORREVOLE = 2.6;
const ALTEZZA_SERRANDA = 4.2;
const FIAMME_PENSILINA = 70;
const DURATA_SCHIANTO = 1.6;
const LUNGHEZZA_MARCHIO = 8;
const PARTENZA_CAMION = new THREE.Vector3(34, 0, 47);
const ARRIVO_CAMION = new THREE.Vector3(12.2, 0, 39.6);
const FUMO_GRUPPO = 14;

const zonaDi = (x, z) => ZONE.find(q => x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1) ?? null;
const orientamento = (mesh, verso) => { mesh.rotation.y = Math.atan2(verso.x, verso.z); };

function texturaPericolo() {
  const t = tela(128, 128, (ctx, l, a) => {
    ctx.fillStyle = '#f2c400';
    ctx.fillRect(0, 0, l, a);
    ctx.fillStyle = '#16181a';
    for (let i = -l; i < l * 2; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 16, 0);
      ctx.lineTo(i + 16 + a, a);
      ctx.lineTo(i + a, a);
      ctx.fill();
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function texturaLinee() {
  return tela(64, 512, (ctx, l, a) => {
    ctx.clearRect(0, 0, l, a);
    ctx.fillStyle = 'rgba(236,234,222,0.9)';
    ctx.fillRect(0, 0, l, a * 0.55);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.7})`;
      ctx.fillRect(Math.random() * l, Math.random() * a, 3 + Math.random() * 8, 2 + Math.random() * 8);
    }
  });
}

export function costruisciStazione(scena, { reali, texture, materialiArmi, oggetti, luciAccese = 3 }) {
  const caso = creaCasoGrafico(2611);
  const modelli = reali.modelli ?? new Map();
  const pbr = (chiave, extra = {}) => new THREE.MeshStandardMaterial({ map: reali[chiave]?.map ?? null, normalMap: reali[chiave]?.normalMap ?? null, roughnessMap: reali[chiave]?.roughnessMap ?? null, metalness: 0, ...extra });
  const tinta = (colore, extra = {}) => new THREE.MeshStandardMaterial({ color: colore, roughness: 0.6, ...extra });
  const pericolo = texturaPericolo();
  const mat = {
    asfalto: pbr('asfalto', { color: 0x9a9ca0, roughness: 1 }),
    asfaltoStrada: pbr('asfalto', { color: 0x6c6e72 }),
    erba: pbr('erba', { color: 0x6a7a58 }),
    piastrelle: pbr('piastrelle', { color: 0xd8d8d2, roughness: 0.55 }),
    pavimentoOfficina: pbr('officina', { color: 0xa8a8a4 }),
    intonaco: pbr('intonaco', { color: 0xe4ddd0 }),
    intonacoInterno: pbr('intonaco', { color: 0xf2efe8 }),
    lamiera: pbr('lamiera', { color: 0x8e979e, metalness: 0.4 }),
    lamieraInterna: pbr('lamiera', { color: 0x6c747a, metalness: 0.3, side: THREE.DoubleSide }),
    cementoMuro: pbr('cemento', { color: 0xb0aca4 }),
    serranda: pbr('serranda', { color: 0xc0c6cc, metalness: 0.5 }),
    metallo: pbr('metallo', { color: 0xb8bcc0, metalness: 0.6 }),
    lamieraContainer: pbr('lamiera', { color: 0x9a3c26, metalness: 0.35 }),
    cementoChiaro: pbr('cemento', { color: 0xc8c4bc }),
    soffitto: new THREE.MeshStandardMaterial({ map: (() => { const t = texturaPannelliSoffitto(); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; })(), roughness: 0.9 }),
    tettoia: new THREE.MeshStandardMaterial({ color: 0xe8eaec, roughness: 0.7, metalness: 0.1 }),
    vetrina: new THREE.MeshStandardMaterial({ map: texturaVetrina(), transparent: true, opacity: 0.85, roughness: 0.05, metalness: 0.5, side: THREE.DoubleSide, depthWrite: false }),
    vetroAuto: new THREE.MeshStandardMaterial({ color: 0x151c24, roughness: 0.08, metalness: 0.6 }),
    vetroFrigo: new THREE.MeshStandardMaterial({ color: 0xbfe0f0, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.3, depthWrite: false }),
    pericolo: new THREE.MeshStandardMaterial({ map: pericolo, roughness: 0.6 }),
    linee: new THREE.MeshStandardMaterial({ map: texturaLinee(), transparent: true, roughness: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
    rete: new THREE.MeshStandardMaterial({ map: texture.rete, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5 }),
    zincato: tinta(0xb7bcc1, { metalness: 0.75, roughness: 0.35 }),
    metalloScuro: tinta(0x2c3034, { metalness: 0.55, roughness: 0.45 }),
    metalloChiaro: tinta(0xc9ccd0, { metalness: 0.5, roughness: 0.4 }),
    acciaioLucido: tinta(0xd4d8dc, { metalness: 0.9, roughness: 0.22 }),
    cromo: tinta(0xd8dcdf, { metalness: 0.95, roughness: 0.15 }),
    rossoMarchio: tinta(0xc8161d, { roughness: 0.45 }),
    rossoCamion: tinta(0x9c1a1a, { metalness: 0.5, roughness: 0.35 }),
    biancoPompa: tinta(0xf0f0ec, { roughness: 0.4 }),
    biancoRimorchio: tinta(0xe2e5e8, { roughness: 0.55 }),
    blu: tinta(0x1d4f91),
    gomma: tinta(0x141414, { roughness: 0.9 }),
    nero: tinta(0x0e0e10, { roughness: 0.8 }),
    legnoBar: tinta(0x5a3a26, { roughness: 0.55 }),
    legnoPallet: tinta(0xb08a5a, { roughness: 0.9 }),
    granito: tinta(0x3a3a3c, { roughness: 0.25, metalness: 0.1 }),
    gialloPonte: tinta(0xe8b400, { roughness: 0.45, metalness: 0.2 }),
    cassonettoVerde: tinta(0x2e5634, { roughness: 0.55, metalness: 0.2 }),
    cassonettoGiallo: tinta(0xc8a020, { roughness: 0.55, metalness: 0.2 }),
    faroAuto: new THREE.MeshBasicMaterial({ color: 0xfff1d6 }),
    fanaleAuto: tinta(0x8a0c0c, { emissive: 0xb01010, emissiveIntensity: 0.4, roughness: 0.3 }),
    prodRosso: tinta(0xb8262a, { roughness: 0.5 }),
    prodGiallo: tinta(0xe8b830, { roughness: 0.5 }),
    prodBlu: tinta(0x2a5a9a, { roughness: 0.5 }),
    prodVerde: tinta(0x3a8a3c, { roughness: 0.5 }),
    prodBianco: tinta(0xe8e4d8, { roughness: 0.5 }),
    assi: tinta(0x8a6a48, { roughness: 0.9 }),
    terra: tinta(0x3a3026, { roughness: 1 }),
    risaia: new THREE.MeshStandardMaterial({ color: 0x0c1418, roughness: 0.08, metalness: 0.7 }),
    chioma: tinta(0x1a2618, { roughness: 1 }),
    corteccia: tinta(0x2a2420, { roughness: 1 }),
    linoleum: pbr('piastrelle', { color: 0x9a8a70, roughness: 0.6 }),
  };
  const luceTettoia = new THREE.MeshStandardMaterial({ color: 0x3a3c3e, emissive: 0xf4f8ff, emissiveIntensity: 0, roughness: 0.3 });
  const luceInterna = new THREE.MeshStandardMaterial({ color: 0x4a4c4e, emissive: 0xf0f6ff, emissiveIntensity: 0, roughness: 0.3 });
  mat.luceTettoia = luceTettoia;
  mat.luceInterna = luceInterna;

  const statico = creaStatico();
  const box = (chiave, x0, y0, z0, x1, y1, z1, metri = 1) => statico.aggiungi(chiave, scatolaUV(x1 - x0, y1 - y0, z1 - z0, metri, y0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  const cil = (chiave, x, y0, z, r, h, lati = 12, rSotto = r) => statico.aggiungi(chiave, new THREE.CylinderGeometry(r, rSotto, h, lati), x, y0 + h / 2, z);
  const pavimento = (chiave, x0, z0, x1, z1, y, metri = 2) => statico.aggiungi(chiave, pianoUV(x1 - x0, z1 - z0, metri), (x0 + x1) / 2, y, (z0 + z1) / 2);
  const soffitto = (chiave, x0, z0, x1, z1, y, metri = 2) => statico.aggiungi(chiave, pianoUV(x1 - x0, z1 - z0, metri, 'giu'), (x0 + x1) / 2, y, (z0 + z1) / 2);
  const faccia = (chiave, l, h, x, y, z, ry, metri = 2.5, partenza = 0) => statico.aggiungi(chiave, facciaUV(l, h, metri, partenza), x, y, z, ry);
  const pannello = (materiale, l, h, x, y, z, verso) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(l, h), materiale);
    mesh.position.set(x, y, z);
    orientamento(mesh, verso);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scena.add(mesh);
    return mesh;
  };
  const cartello = (righe, x, y, z, verso, l, h, opzioni) => pannello(new THREE.MeshBasicMaterial({ map: texturaTesto(righe, opzioni), transparent: true }), l, h, x, y, z, verso);
  const insegna = (testo, x, y, z, verso, l, h, opzioni) => {
    const m = new THREE.MeshStandardMaterial({ map: texturaInsegna(testo, opzioni), emissive: 0xffffff, emissiveIntensity: 0.04, roughness: 0.4 });
    m.emissiveMap = m.map;
    return pannello(m, l, h, x, y, z, verso);
  };

  pavimento('erba', -140, -140, 140, 140, -0.03, 4);
  pavimento('asfalto', -22, -20, 26, 6, 0, 5);
  pavimento('asfalto', -16, 20, 24, 38, 0, 5);
  pavimento('asfalto', 6, 5.8, 24, 6.2, 0.001, 5);
  pavimento('piastrelle', -16, 6, 6, 20, 0.002, 1.2);
  pavimento('pavimentoOfficina', 6, 6, 24, 20, 0.002, 4);
  pavimento('asfaltoStrada', -60, -40.5, 80, -23, -0.005, 5);
  pavimento('asfalto', 26, -6, 70, 6, -0.004, 5);
  pavimento('cementoChiaro', -60, -31.95, 80, -31.35, 0.01, 2);
  box('cementoChiaro', -60, 0, -31.9, 80, 0.8, -31.4, 2);
  for (const [x0, z0, x1, z1] of [[-90, -12, -30, 30], [34, 14, 100, 60], [-70, 46, 10, 110]]) pavimento('risaia', x0, z0, x1, z1, -0.015, 6);

  const linee = (x0, z0, x1, z1, larghezza, tratteggio = 0) => {
    const lungo = Math.hypot(x1 - x0, z1 - z0);
    const ry = Math.atan2(x1 - x0, z1 - z0);
    const g = pianoUV(larghezza, lungo, 1);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / larghezza, tratteggio ? (uv.getY(i) * 1) / tratteggio : 0.25);
    statico.aggiungi('linee', g, (x0 + x1) / 2, 0.012, (z0 + z1) / 2, ry);
  };
  for (const z of [-23.4, -30.9]) linee(-60, z, 80, z, 0.15);
  linee(-60, -27.2, 80, -27.2, 0.14, 9);
  for (const z of [-32.8, -40.1]) linee(-60, z, 80, z, 0.15);
  linee(-60, -36.4, 80, -36.4, 0.14, 9);
  for (const isola of [-8, 0, 8]) for (const z of [-11.8, -2.2]) linee(isola - 1.6, z, isola + 1.6, z, 0.12);
  for (let x = -14; x < 6; x += 2.6) linee(x, 20.5, x, 25.5, 0.1);
  for (let x = -20; x <= -14; x += 2.6) linee(x, -6, x, -1, 0.1);
  const frecce = new THREE.MeshStandardMaterial({ map: texturaSegnaletica(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, roughness: 0.8 });
  for (const [x, z, ry] of [[-17, -10, Math.PI], [18, -2, 0], [3, 2.6, Math.PI / 2]]) {
    const f = new THREE.Mesh(pianoUV(1.6, 3, 1.6), frecce);
    const uv = f.geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.6 / 1.6, uv.getY(i) * 1.6 / 3);
    f.position.set(x, 0.013, z);
    f.rotation.y = ry;
    f.matrixAutoUpdate = false;
    f.updateMatrix();
    scena.add(f);
  }
  const macchia = new THREE.MeshStandardMaterial({ map: texturaMacchia(), transparent: true, depthWrite: false, roughness: 0.2, metalness: 0.3, polygonOffset: true, polygonOffsetFactor: -3 });
  for (let i = 0; i < 26; i++) {
    const m = new THREE.Mesh(pianoUV(1, 1, 1), macchia);
    const x = -12 + caso() * 24;
    const z = -12.5 + caso() * 11;
    m.position.set(x, 0.014, z);
    m.scale.set(0.6 + caso() * 1.8, 1, 0.5 + caso() * 1.4);
    m.rotation.y = caso() * 6;
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    scena.add(m);
  }
  for (const f of FINESTRE.filter(q => q.tana)) {
    cil('metalloScuro', f.interno.x, 0, f.interno.z, 0.55, 0.03, 20);
    cil('zincato', f.interno.x, 0.03, f.interno.z, 0.45, 0.01, 20);
    cartello(['CISTERNA'], f.interno.x, 0.045, f.interno.z, { x: 0, z: 1 }, 0.6, 0.15, { larghezza: 128, altezza: 32, colore: '#f2c400', font: 'bold 18px Arial, sans-serif' }).rotation.x = -Math.PI / 2;
  }

  const lato = (m, verso) => {
    const cx = (m.x0 + m.x1) / 2;
    const cz = (m.z0 + m.z1) / 2;
    const lungoX = m.x1 - m.x0 > m.z1 - m.z0;
    const p = lungoX ? { x: cx, z: verso > 0 ? m.z1 + 0.2 : m.z0 - 0.2 } : { x: verso > 0 ? m.x1 + 0.2 : m.x0 - 0.2, z: cz };
    return zonaDi(p.x, p.z);
  };
  const INTERNI = { market: 'intonacoInterno', officina: 'cementoMuro', sala: 'intonacoInterno' };
  const esternoDi = m => (m.parte === 'officina' ? 'lamiera' : m.parte === 'interno' ? 'cementoMuro' : 'intonaco');
  const murale = (m, y0, y1, a0 = null, a1 = null) => {
    const lungoX = m.x1 - m.x0 > m.z1 - m.z0;
    const x0 = lungoX && a0 !== null ? a0 : m.x0;
    const x1 = lungoX && a1 !== null ? a1 : m.x1;
    const z0 = !lungoX && a0 !== null ? a0 : m.z0;
    const z1 = !lungoX && a1 !== null ? a1 : m.z1;
    box(esternoDi(m), x0, y0, z0, x1, y1, z1, 2.5);
    for (const verso of [-1, 1]) {
      const zona = lato(m, verso);
      if (!zona || zona.aperto) continue;
      const materiale = m.parte === 'interno' && zona.id === 'market' ? 'intonacoInterno' : INTERNI[zona.id] ?? 'intonacoInterno';
      const lungo = lungoX ? x1 - x0 : z1 - z0;
      const cx = (x0 + x1) / 2;
      const cz = (z0 + z1) / 2;
      const top = Math.min(y1, zona.tetto ?? y1);
      if (top <= y0) continue;
      if (lungoX) faccia(materiale, lungo, top - y0, cx, (y0 + top) / 2, verso > 0 ? z1 + 0.005 : z0 - 0.005, verso > 0 ? 0 : Math.PI, 2.5, y0);
      else faccia(materiale, lungo, top - y0, verso > 0 ? x1 + 0.005 : x0 - 0.005, (y0 + top) / 2, cz, verso > 0 ? Math.PI / 2 : -Math.PI / 2, 2.5, y0);
    }
  };

  const vetrineMarket = [];
  for (const m of MURI) {
    if (m.x0 > 100) continue;
    if (m.parte !== 'vetrina') {
      murale(m, 0, m.y1);
      continue;
    }
    box('cementoChiaro', m.x0, 0, m.z0, m.x1, 0.5, m.z1, 1);
    box('intonaco', m.x0, 3.0, m.z0, m.x1, m.y1, m.z1, 2.5);
    faccia('intonacoInterno', m.x1 - m.x0, ALTEZZA_MARKET - 3, (m.x0 + m.x1) / 2, (3 + ALTEZZA_MARKET) / 2, m.z1 + 0.005, 0, 2.5, 3);
    for (let x = m.x0; x <= m.x1 + 0.01; x += (m.x1 - m.x0) / Math.max(1, Math.round((m.x1 - m.x0) / 1.6))) box('metalloScuro', x - 0.05, 0.5, m.z0 - 0.02, x + 0.05, 3.0, m.z1 + 0.02, 1);
    box('metalloScuro', m.x0, 2.95, m.z0 - 0.03, m.x1, 3.05, m.z1 + 0.03, 1);
    const vetro = new THREE.Mesh(new THREE.PlaneGeometry(m.x1 - m.x0, 2.5), mat.vetrina);
    vetro.position.set((m.x0 + m.x1) / 2, 1.75, (m.z0 + m.z1) / 2);
    scena.add(vetro);
    vetrineMarket.push(vetro);
  }

  for (const p of PORTE) {
    const s = p.scatola;
    const altezza = p.tipo === 'serranda' ? ALTEZZA_SERRANDA : p.tipo === 'scorrevole' ? ALTEZZA_SCORREVOLE : ALTEZZA_PORTA;
    const vicini = MURI.filter(m => m.x0 <= s.x1 + 0.05 && m.x1 >= s.x0 - 0.05 && m.z0 <= s.z1 + 0.05 && m.z1 >= s.z0 - 0.05);
    const top = Math.max(...vicini.map(m => m.y1), altezza + 0.5);
    const m = vicini[0];
    const finto = { ...(m ?? {}), x0: s.x0, x1: s.x1, z0: s.z0, z1: s.z1, parte: m?.parte === 'vetrina' ? 'market' : m?.parte ?? 'market' };
    murale(finto, altezza, top);
  }

  const assi = new Map();
  for (const f of FINESTRE) {
    if (f.tana) continue;
    const lungo = f.asse === 'z' ? f.scatola.x1 - f.scatola.x0 : f.scatola.z1 - f.scatola.z0;
    let basso;
    let alto;
    if (f.recinzione) {
      basso = 0.15;
      alto = ALTEZZA_RECINZIONE - 0.2;
      box('rete', f.scatola.x0, 0.1, f.scatola.z0 + (f.asse === 'z' ? 0.14 : 0), f.scatola.x1, ALTEZZA_RECINZIONE, f.scatola.z1 - (f.asse === 'z' ? 0.14 : 0), 1);
    } else {
      basso = DAVANZALE;
      alto = ARCHITRAVE;
      const muro = MURI.find(m => m.x0 <= f.scatola.x1 + 0.05 && m.x1 >= f.scatola.x0 - 0.05 && m.z0 <= f.scatola.z1 + 0.05 && m.z1 >= f.scatola.z0 - 0.05);
      const finto = { ...(muro ?? {}), x0: f.scatola.x0, x1: f.scatola.x1, z0: f.scatola.z0, z1: f.scatola.z1, parte: muro?.parte ?? 'market' };
      murale(finto, 0, basso);
      murale(finto, alto, muro?.y1 ?? 4.5);
    }
    const elenco = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const asse = new THREE.Mesh(scatolaUV(lungo + 0.35, 0.17, 0.05, 1), mat.assi);
      const y = basso + 0.15 + (i * (alto - basso - 0.3)) / (R.ASSE_PER_FINESTRA - 1);
      asse.position.set(f.centro.x - f.fuori.x * (f.spessore / 2 + 0.06), y, f.centro.z - f.fuori.z * (f.spessore / 2 + 0.06));
      asse.rotation.y = f.asse === 'z' ? 0 : Math.PI / 2;
      asse.rotation.z = (caso() - 0.5) * 0.5;
      scena.add(asse);
      elenco.push(asse);
    }
    assi.set(f.id, elenco);
  }

  soffitto('soffitto', -16, 6, 6, 20, ALTEZZA_MARKET, 1.2);
  box('cementoMuro', -16.15, ALTEZZA_MARKET + 0.3, 5.85, 6, ALTEZZA_MARKET + 0.45, 20.15, 3);
  soffitto('lamieraInterna', 6, 6, 24, 20, ALTEZZA_OFFICINA, 2);
  box('lamiera', 5.85, ALTEZZA_OFFICINA + 0.4, 5.85, 24.15, ALTEZZA_OFFICINA + 0.55, 20.15, 3);
  for (let x = 8; x < 24; x += 4) box('metalloScuro', x - 0.1, ALTEZZA_OFFICINA - 0.4, 6, x + 0.1, ALTEZZA_OFFICINA, 20, 1);
  for (const [x, z] of [[-11, 8.5], [-11, 12], [-11, 15.2], [-5, 8.5], [-5, 12], [-5, 15.2], [1, 8.5], [1, 12], [1, 16.5]]) box('luceInterna', x - 0.6, ALTEZZA_MARKET - 0.04, z - 0.15, x + 0.6, ALTEZZA_MARKET - 0.01, z + 0.15, 1);
  for (const [x, z] of [[9, 9], [9, 15], [13, 12], [18, 9], [18, 15], [22, 12]]) {
    box('luceInterna', x - 0.7, ALTEZZA_OFFICINA - 0.62, z - 0.12, x + 0.7, ALTEZZA_OFFICINA - 0.58, z + 0.12, 1);
    for (const dx of [-0.6, 0.6]) box('metalloScuro', x + dx - 0.01, ALTEZZA_OFFICINA - 0.58, z - 0.01, x + dx + 0.01, ALTEZZA_OFFICINA, z + 0.01, 1);
  }

  const P = PENSILINA;
  const bordo = 0.5;
  box('tettoia', P.x0 - bordo, ALTEZZA_PENSILINA, P.z0 - bordo, P.x1 + bordo, ALTEZZA_PENSILINA + 0.9, P.z1 + bordo, 3);
  soffitto('tettoia', P.x0 - bordo, P.z0 - bordo, P.x1 + bordo, P.z1 + bordo, ALTEZZA_PENSILINA - 0.01, 3);
  for (let x = P.x0 + 1.5; x < P.x1 - 1; x += 3) for (let z = P.z0 + 1; z < P.z1 - 0.5; z += 2.4) box('luceTettoia', x - 0.9, ALTEZZA_PENSILINA - 0.05, z - 0.25, x + 0.9, ALTEZZA_PENSILINA - 0.01, z + 0.25, 1);
  const trama = texturaMarchio();
  trama.wrapS = THREE.RepeatWrapping;
  const marchio = l => {
    const map = trama.clone();
    map.repeat.x = Math.max(1, Math.round(l / LUNGHEZZA_MARCHIO));
    return new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0.05, roughness: 0.4 });
  };
  for (const [l, x, z, verso] of [
    [P.x1 - P.x0 + 2 * bordo, (P.x0 + P.x1) / 2, P.z0 - bordo - 0.01, { x: 0, z: -1 }], [P.x1 - P.x0 + 2 * bordo, (P.x0 + P.x1) / 2, P.z1 + bordo + 0.01, { x: 0, z: 1 }],
    [P.z1 - P.z0 + 2 * bordo, P.x0 - bordo - 0.01, (P.z0 + P.z1) / 2, { x: -1, z: 0 }], [P.z1 - P.z0 + 2 * bordo, P.x1 + bordo + 0.01, (P.z0 + P.z1) / 2, { x: 1, z: 0 }],
  ]) pannello(marchio(l), l, 0.9, x, ALTEZZA_PENSILINA + 0.45, z, verso);

  insegna('BAR · MARKET · 24h', -5, 3.75, 5.82, { x: 0, z: -1 }, 9, 1.4, { colore: '#f4f4f2', bordo: '#c8161d' });
  insegna('OFFICINA · GOMMISTA', 15, 5.15, 5.82, { x: 0, z: -1 }, 7, 0.95, { sfondo: '#1d4f91', colore: '#ffffff', bordo: '#f2a900', font: '900 72px "Arial Black", Arial, sans-serif' });
  cartello(['AREA DI SERVIZIO', 'AGOGNA NORD'], -14.5, 4.1, 5.82, { x: 0, z: -1 }, 2.6, 0.7, { larghezza: 256, altezza: 72, sfondo: '#1d6b3a', colore: '#ffffff', font: 'bold 22px Arial, sans-serif', bordo: '#ffffff' });
  for (const [x, y, z, verso] of [[-11, 2.7, 19.84, { x: 0, z: -1 }], [9, 2.7, 19.84, { x: 0, z: -1 }], [-4.5, 2.85, 6.16, { x: 0, z: 1 }]]) {
    cartello(['USCITA'], x, y, z, verso, 0.5, 0.18, { larghezza: 128, altezza: 48, sfondo: '#0f7a2e', colore: '#e8ffe8', font: 'bold 26px Arial, sans-serif' });
  }

  for (const r of RECINZIONI) {
    const lungoX = r.x1 - r.x0 > r.z1 - r.z0;
    const lungo = lungoX ? r.x1 - r.x0 : r.z1 - r.z0;
    const c = lungoX ? (r.z0 + r.z1) / 2 : (r.x0 + r.x1) / 2;
    const n = Math.max(1, Math.round(lungo / 2.2));
    for (let i = 0; i <= n; i++) {
      const a = (lungoX ? r.x0 : r.z0) + (i * lungo) / n;
      const [x, z] = lungoX ? [a, c] : [c, a];
      cil('zincato', x, 0, z, 0.04, ALTEZZA_RECINZIONE + (r.parte === 'retro' ? 0.4 : 0.1), 8);
    }
    if (r.parte === 'guardrail') {
      const off = 0.25;
      if (lungoX) {
        box('zincato', r.x0, 0.55, c - off - 0.06, r.x1, 0.85, c - off, 2);
        for (let i = 0; i <= n; i++) box('metalloScuro', r.x0 + (i * lungo) / n - 0.06, 0, c - off, r.x0 + (i * lungo) / n + 0.06, 0.8, c - off + 0.12, 1);
      }
    }
    box('rete', r.x0, 0.05, r.z0 + (lungoX ? 0.14 : 0), r.x1, ALTEZZA_RECINZIONE, r.z1 - (lungoX ? 0.14 : 0), 1);
    if (r.parte === 'retro') for (const dy of [0.1, 0.22, 0.34]) box('zincato', r.x0 + (lungoX ? 0 : 0.13), ALTEZZA_RECINZIONE + dy, r.z0 + (lungoX ? 0.13 : 0), r.x1 - (lungoX ? 0 : 0.13), ALTEZZA_RECINZIONE + dy + 0.012, r.z1 - (lungoX ? 0.13 : 0), 1);
  }
  const reteSchianto = new THREE.Group();
  {
    const s = OGGETTI.SCHIANTO;
    const pezzo = new THREE.Mesh(scatolaUV(s.x1 - s.x0, ALTEZZA_RECINZIONE + 0.1, 0.05, 1), mat.rete);
    pezzo.position.set((s.x0 + s.x1) / 2, (ALTEZZA_RECINZIONE + 0.1) / 2 + 0.01, 38.06);
    reteSchianto.add(pezzo);
    scena.add(reteSchianto);
  }

  const auto = (x, z, ry, colore) => {
    const g = new THREE.Group();
    const corpo = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 1.8).translate(0, 0.65, 0), new THREE.MeshPhysicalMaterial({ color: colore, metalness: 0.6, roughness: 0.3, clearcoat: 0.8 }));
    const tetto = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 1.6).translate(-0.2, 1.25, 0), mat.vetroAuto);
    g.add(corpo, tetto);
    for (const [dx, dz] of [[-1.4, -0.85], [1.4, -0.85], [-1.4, 0.85], [1.4, 0.85]]) {
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.22, 14).rotateX(Math.PI / 2).translate(dx, 0.33, dz), mat.gomma);
      g.add(r);
    }
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    scena.add(g);
    const frecce = [];
    for (const [dx, dz] of [[-2.11, -0.7], [-2.11, 0.7], [2.11, -0.7], [2.11, 0.7]]) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.2), new THREE.MeshBasicMaterial({ color: 0xff9a20 }));
      f.position.set(dx, 0.75, dz);
      g.add(f);
      frecce.push(f);
    }
    return frecce;
  };
  const quattroFrecce = [...auto(-6, -26, 0.15, 0x2a2e36), ...auto(14, -28.5, -0.4, 0xd8d4c8), ...auto(32, -24.6, 2.6, 0x7a1a1a)];

  const alberi = [];
  for (let i = 0; i < 26; i++) {
    const lungo = i < 13;
    const x = lungo ? -80 + i * 11 : (i % 2 ? -36 : 44);
    const z = lungo ? 58 + (i % 3) * 2 : -12 + (i - 13) * 6;
    alberi.push([x, z]);
  }
  for (const [x, z] of alberi) {
    cil('corteccia', x, 0, z, 0.25, 6, 6);
    statico.aggiungi('chioma', new THREE.ConeGeometry(1.8, 14, 7), x, 13, z);
  }

  for (const [x, z, ry] of [[-21.4, -21, 0], [3, -21, 0], [25.4, -21, 0], [-21, 7.2, Math.PI], [25, 7.2, Math.PI]]) {
    const lampione = modelli.get('street_lamp_01');
    if (!lampione) continue;
    const c = lampione.clone();
    c.position.set(x, 0, z);
    c.rotation.y = ry;
    c.scale.setScalar(1.6);
    scena.add(c);
  }
  for (const [x, y, z, ry] of [[-6, 3.6, 20.2, 0], [16, 4.6, 20.2, 0], [-16.2, 3.4, 13, -Math.PI / 2], [24.2, 4.4, 12.5, Math.PI / 2]]) {
    const faretto = modelli.get('security_light');
    if (!faretto) continue;
    const c = faretto.clone();
    c.position.set(x, y, z);
    c.rotation.y = ry;
    c.scale.setScalar(1.4);
    scena.add(c);
  }
  const neon = modelli.get('mounted_fluorescent_lights');
  const neonMateriali = new Set();
  if (neon) {
    for (const [x, z] of [[-8, 18.6], [12, 7.2], [20, 18.6]]) {
      const c = neon.clone();
      c.position.set(x, z > 18 && x < 0 ? ALTEZZA_MARKET - 0.02 : ALTEZZA_OFFICINA - 0.02, z);
      c.traverse(o => {
        if (!o.isMesh) return;
        o.material = o.material.clone();
        o.material.emissive = new THREE.Color(0xf0f6ff);
        o.material.emissiveIntensity = 0;
        neonMateriali.add(o.material);
      });
      scena.add(c);
    }
  }

  cartello(['SALETTA AUTISTI', '', 'ASPETTATE I VOSTRI AMICI', '', 'INVIO: SONO PRONTO'], CARTELLO_PRONTI.x, 1.75, CARTELLO_PRONTI.z, CARTELLO_PRONTI.verso, 3.6, 2.2, { larghezza: 512, altezza: 320, sfondo: '#14181e', colore: '#f4f4f2', font: 'bold 30px Arial, sans-serif', bordo: '#c8161d' });
  pavimento('linoleum', 120, -5, 134, 5, 0.002, 1.5);
  soffitto('soffitto', 120, -5, 134, 5, 3.4, 1.2);
  for (const m of MURI.filter(q => q.x0 > 100)) box('intonacoInterno', m.x0, 0, m.z0, m.x1, m.y1, m.z1, 2.5);
  for (const x of [123.5, 127, 130.5]) box('luceInterna', x - 0.6, 3.36, -0.15, x + 0.6, 3.39, 0.15, 1);
  const divano = oggetti.get('sofa_02');
  if (divano) {
    const c = divano.clone();
    c.position.set(127, 0, 4.4);
    c.rotation.y = Math.PI;
    scena.add(c);
  }
  const scrivania = oggetti.get('metal_office_desk');
  if (scrivania) {
    const c = scrivania.clone();
    c.position.set(127, 0, -4.3);
    scena.add(c);
  }
  pannello(new THREE.MeshStandardMaterial({ map: texturaMarchio(512, 128), roughness: 0.6 }), 3, 0.75, 120.03, 2.4, 0, { x: 1, z: 0 });

  const arredi = costruisciArredi({ scena, statico, mat, box, cil, pannello, cartello, modelli, oggetti, caso });
  statico.finisci(scena, mat);
  const macchine = creaMacchine(scena, { materialiArmi, oggetti, metallo: mat.metalloScuro, legno: mat.legnoBar, serveCorrente: true });

  const grattaVinci = FRAMMENTI.map((f, i) => {
    const g = new THREE.Group();
    const carta = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.2), new THREE.MeshStandardMaterial({ map: texturaGrattaVinci(f.santo), emissive: 0xffc060, emissiveIntensity: 0.35, side: THREE.DoubleSide, roughness: 0.5 }));
    carta.material.emissiveMap = carta.material.map;
    carta.position.y = 0.12;
    const alone = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone('rgba(255,210,120,0.8)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    alone.scale.setScalar(0.55);
    alone.position.y = 0.12;
    g.add(carta, alone);
    g.position.set(f.x, f.y - 0.05, f.z);
    g.userData.fase = i * 1.7;
    scena.add(g);
    return g;
  });

  const porte = new Map();
  for (const p of PORTE) {
    const s = p.scatola;
    const lungoX = s.x1 - s.x0 > s.z1 - s.z0;
    const larghezza = lungoX ? s.x1 - s.x0 : s.z1 - s.z0;
    if (p.tipo === 'scorrevole') {
      const ante = [-1, 1].map(lato => {
        const anta = new THREE.Group();
        const vetro = new THREE.Mesh(new THREE.PlaneGeometry(larghezza / 2, ALTEZZA_SCORREVOLE - 0.1), mat.vetrina);
        vetro.position.y = ALTEZZA_SCORREVOLE / 2;
        const telaio = new THREE.Mesh(scatolaUV(larghezza / 2, 0.08, 0.06, 1), mat.metalloScuro);
        telaio.position.y = 0.05;
        const maniglia = new THREE.Mesh(scatolaUV(0.04, 0.6, 0.06, 1), mat.cromo);
        maniglia.position.set(-lato * (larghezza / 4 - 0.1), 1.1, 0);
        anta.add(vetro, telaio, maniglia);
        anta.position.set(p.centro.x + lato * larghezza / 4, 0, p.centro.z);
        scena.add(anta);
        return { anta, lato, base: p.centro.x + lato * larghezza / 4 };
      });
      porte.set(p.id, { tipo: p.tipo, ante, apertura: 0, larghezza });
      continue;
    }
    if (p.tipo === 'serranda') {
      const telo = new THREE.Mesh(scatolaUV(larghezza, ALTEZZA_SERRANDA, 0.08, 2), mat.serranda);
      telo.geometry.translate(0, -ALTEZZA_SERRANDA / 2, 0);
      telo.position.set(p.centro.x, ALTEZZA_SERRANDA, p.centro.z);
      scena.add(telo);
      const rullo = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, larghezza + 0.2, 16).rotateZ(Math.PI / 2), mat.metalloScuro);
      rullo.position.set(p.centro.x, ALTEZZA_SERRANDA + 0.2, p.centro.z + 0.25);
      scena.add(rullo);
      porte.set(p.id, { tipo: p.tipo, telo, apertura: 0 });
      continue;
    }
    const perno = new THREE.Group();
    perno.position.set(lungoX ? s.x0 : p.centro.x, 0, lungoX ? p.centro.z : s.z0);
    const anta = new THREE.Mesh(lungoX ? scatolaUV(larghezza, ALTEZZA_PORTA, 0.06, ALTEZZA_PORTA) : scatolaUV(0.06, ALTEZZA_PORTA, larghezza, ALTEZZA_PORTA), mat.metalloChiaro);
    anta.position.set(lungoX ? larghezza / 2 : 0, ALTEZZA_PORTA / 2, lungoX ? 0 : larghezza / 2);
    const maniglione = new THREE.Mesh(lungoX ? scatolaUV(larghezza * 0.7, 0.05, 0.1, 1) : scatolaUV(0.1, 0.05, larghezza * 0.7, 1), mat.rossoMarchio);
    maniglione.position.set(lungoX ? larghezza / 2 : 0, 1.05, lungoX ? 0 : larghezza / 2);
    perno.add(anta, maniglione);
    scena.add(perno);
    porte.set(p.id, { tipo: 'porta', perno, apertura: 0 });
  }

  const interruttore = ACQUISTI.find(a => a.tipo === 'interruttore');
  const ix = interruttore.posizione.x;
  const iz = interruttore.posizione.z;
  const quadro = new THREE.Mesh(scatolaUV(0.18, 1, 0.8, 1), mat.metalloChiaro);
  quadro.position.set(ix + 0.08, 1.6, iz);
  scena.add(quadro);
  const leva = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.05).translate(0, 0.18, 0), mat.rossoMarchio);
  leva.position.set(ix + 0.2, 1.6, iz);
  scena.add(leva);
  const spia = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), new THREE.MeshBasicMaterial({ color: 0xb8241b }));
  spia.position.set(ix + 0.18, 1.95, iz + 0.25);
  scena.add(spia);
  cartello(['QUADRO GENERALE'], ix + 0.19, 2.25, iz, { x: 1, z: 0 }, 0.9, 0.18, { larghezza: 192, altezza: 36, sfondo: '#e8c020', colore: '#1a1a1a', font: 'bold 18px Arial, sans-serif' });

  const emergenza = ACQUISTI.find(a => a.tipo === 'emergenza');
  const pulsante = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xd8161d, emissive: 0xff2010, emissiveIntensity: 0.2 }));
  pulsante.position.set(emergenza.posizione.x, 1.4, emergenza.posizione.z - 0.06);
  scena.add(pulsante);
  const cassetta = new THREE.Mesh(scatolaUV(0.5, 0.5, 0.1, 1), new THREE.MeshStandardMaterial({ color: 0xf2c400, roughness: 0.5 }));
  cassetta.position.set(emergenza.posizione.x, 1.4, emergenza.posizione.z + 0.01);
  scena.add(cassetta);
  cartello(['ARRESTO DI EMERGENZA', 'EROGATORI'], emergenza.posizione.x, 1.85, emergenza.posizione.z - 0.06, { x: 0, z: -1 }, 0.9, 0.26, { larghezza: 256, altezza: 72, sfondo: '#d8161d', colore: '#ffffff', font: 'bold 22px Arial, sans-serif' });

  const fuoco = texturaFuoco();
  const fiamme = [];
  const ostacoliPensilina = OSTACOLI.filter(o => o.x1 > P.x0 && o.x0 < P.x1 && o.z1 > P.z0 && o.z0 < P.z1);
  for (let i = 0; i < FIAMME_PENSILINA; i++) {
    let x;
    let z;
    for (let k = 0; k < 8; k++) {
      x = P.x0 + 0.4 + caso() * (P.x1 - P.x0 - 0.8);
      z = P.z0 + 0.4 + caso() * (P.z1 - P.z0 - 0.8);
      if (!ostacoliPensilina.some(o => x > o.x0 - 0.2 && x < o.x1 + 0.2 && z > o.z0 - 0.2 && z < o.z1 + 0.2)) break;
    }
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fuoco, color: 0xffb060, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.position.set(x, 0.6, z);
    s.visible = false;
    s.userData = { fase: caso() * 6, base: 0.9 + caso() * 1.1 };
    scena.add(s);
    fiamme.push(s);
  }
  const bruciato = new THREE.Mesh(pianoUV(P.x1 - P.x0, P.z1 - P.z0, 1), new THREE.MeshStandardMaterial({ map: texturaMacchia(), transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }));
  bruciato.position.set((P.x0 + P.x1) / 2, 0.016, (P.z0 + P.z1) / 2);
  scena.add(bruciato);

  const fumo = texturaAlone('rgba(170,170,170,0.6)');
  const sbuffi = Array.from({ length: FUMO_GRUPPO }, () => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fumo, color: 0x8a8a8a, transparent: true, depthWrite: false, opacity: 0 }));
    s.visible = false;
    s.userData = { vita: 0 };
    scena.add(s);
    return s;
  });
  let prossimoSbuffo = 0;

  const coniFaro = [];
  const fascio = new THREE.MeshBasicMaterial({ color: 0xdfe8ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  for (const testa of arredi.testeFaro) {
    const cono = new THREE.Mesh(new THREE.ConeGeometry(7, 14, 20, 1, true).translate(0, -7, 0), fascio);
    cono.position.set(testa.position.x, testa.position.y, testa.position.z);
    cono.rotation.x = 0.55;
    scena.add(cono);
    coniFaro.push(cono);
  }
  const faroLuce = new THREE.SpotLight(0xe8f0ff, 0, 42, 0.95, 0.6, 1.2);
  faroLuce.position.set(OGGETTI.TORRE.x, 8.8, OGGETTI.TORRE.z - 0.3);
  faroLuce.target.position.set(OGGETTI.TORRE.x - 2, 0, OGGETTI.TORRE.z - 10);
  scena.add(faroLuce, faroLuce.target);

  const camion = new THREE.Group();
  arredi.motrice(camion, 'rossoCamion');
  const rimorchioCamion = new THREE.Mesh(scatolaUV(8, 2.9, 2.5, 2), mat.biancoRimorchio);
  rimorchioCamion.position.set(-10, 2.6, 0);
  camion.add(rimorchioCamion);
  camion.visible = false;
  scena.add(camion);
  const fuocoRelitto = Array.from({ length: 8 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fuoco, color: 0xffa050, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.position.set(-1.5 + (i % 4) * 0.9, 1.4 + Math.floor(i / 4) * 0.6, -0.6 + (i % 2) * 1.2);
    s.userData = { fase: i * 1.3 };
    camion.add(s);
    return s;
  });
  let schianto = null;

  const fonti = [
    { x: 17.7, y: 1.4, z: -16.4, colore: 0xff8a2a, prima: 18, dopo: 18, portata: 15, fuoco: true },
    ...[-8, 0, 8].flatMap(x => [-10, -4].map(z => ({ x, y: ALTEZZA_PENSILINA - 0.3, z, colore: 0xf2f6ff, prima: 0, dopo: 30, portata: 14 }))),
    { x: -10, y: ALTEZZA_MARKET - 0.3, z: 9, colore: 0xf4f8ff, prima: 1.5, dopo: 14, portata: 10, tremola: true },
    { x: -10, y: ALTEZZA_MARKET - 0.3, z: 15.5, colore: 0xf4f8ff, prima: 0, dopo: 14, portata: 10 },
    { x: -1, y: ALTEZZA_MARKET - 0.3, z: 12, colore: 0xf4f8ff, prima: 1, dopo: 14, portata: 10 },
    { x: 11, y: ALTEZZA_OFFICINA - 0.8, z: 12, colore: 0xeef6ff, prima: 0, dopo: 20, portata: 12, tremola: true },
    { x: 20, y: ALTEZZA_OFFICINA - 0.8, z: 12, colore: 0xeef6ff, prima: 0, dopo: 20, portata: 12 },
    { x: -6, y: 3.4, z: 21.2, colore: 0xffe2b8, prima: 0, dopo: 12, portata: 12 },
    { x: 16, y: 4.4, z: 21.2, colore: 0xffe2b8, prima: 0, dopo: 12, portata: 12 },
    { x: 21.3, y: 6.5, z: -14.6, colore: 0xfff2e0, prima: 0, dopo: 6, portata: 8 },
    { x: 127, y: 3.1, z: 0, colore: 0xffe8c8, prima: 16, dopo: 16, portata: 18 },
  ];
  const fuocoTrappola = { x: 0, y: 1.5, z: -7, colore: 0xff7a1a, prima: 0, dopo: 0, portata: 18, fuoco: true, speciale: true };
  const luceGruppo = { x: OGGETTI.GRUPPO.x, y: 1.2, z: OGGETTI.GRUPPO.z, colore: 0xffb050, prima: 0, dopo: 0, portata: 6, speciale: true, tremola: true };
  const luceRelitto = { x: 12, y: 1.6, z: 39, colore: 0xff8a2a, prima: 0, dopo: 0, portata: 14, fuoco: true, speciale: true };
  fonti.push(fuocoTrappola, luceGruppo, luceRelitto);
  const luci = Array.from({ length: luciAccese }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.4);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  let attesaLuci = 0;
  const intensita = (f, vista) => (f.speciale ? f.valore ?? 0 : vista.corrente ? f.dopo : f.prima);
  function aggiornaLuci(vista, dt, tempo, punto) {
    attesaLuci -= dt;
    if (punto && attesaLuci <= 0) {
      attesaLuci = SCEGLI_LUCI_OGNI_S;
      const peso = f => Math.hypot(f.x - punto.x, (f.y - punto.y) * 1.5, f.z - punto.z) / Math.sqrt(Math.max(1, intensita(f, vista)) / 10);
      const vicine = fonti.filter(f => intensita(f, vista) > 0).sort((a, b) => peso(a) - peso(b)).slice(0, luciAccese);
      for (const l of luci) if (l.fonte && !vicine.includes(l.fonte)) l.fonte = null;
      for (const f of vicine) {
        if (luci.some(l => l.fonte === f)) continue;
        const l = luci.find(x => !x.fonte);
        if (!l) break;
        Object.assign(l, { fonte: f, accensione: 0 });
        l.luce.color.setHex(f.colore);
        l.luce.distance = f.portata;
        l.luce.position.set(f.x, f.y, f.z);
      }
    }
    for (const l of luci) {
      if (!l.fonte) {
        l.luce.intensity = 0;
        continue;
      }
      const f = l.fonte;
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const tremolio = f.fuoco ? 0.78 + Math.sin(tempo * 9 + f.x) * 0.14 + Math.sin(tempo * 23 + f.z) * 0.08 : f.tremola && Math.sin(tempo * 13.7 + f.x) > 0.92 ? 0.2 : 1;
      l.luce.intensity = intensita(f, vista) * l.accensione * tremolio;
    }
  }

  const tempoCamion = new THREE.Vector3();
  function posaCamion(t) {
    const f = Math.min(1, t / DURATA_SCHIANTO);
    const e = 1 - (1 - f) * (1 - f);
    tempoCamion.lerpVectors(PARTENZA_CAMION, ARRIVO_CAMION, e);
    camion.position.copy(tempoCamion);
    camion.rotation.set(0, Math.atan2(ARRIVO_CAMION.x - PARTENZA_CAMION.x, ARRIVO_CAMION.z - PARTENZA_CAMION.z) - Math.PI / 2 + e * 0.5, f >= 1 ? 0.22 : 0);
    reteSchianto.visible = f < 0.78;
  }

  let prima = null;
  const stato = { faro: 0, incendio: 0 };
  const api = {
    faro() { stato.faro = Math.max(stato.faro, 0.01); },
    schianto() {
      schianto = 0;
      camion.visible = true;
      posaCamion(0);
    },
  };

  return {
    stazione: api,
    svuota() {
      for (const porta of porte.values()) porta.apertura = 0;
      schianto = null;
      camion.visible = false;
      reteSchianto.visible = true;
      stato.faro = 0;
      prima = null;
    },
    aggiorna(vista, dt, tempo, punto) {
      macchine.aggiorna(vista, dt, tempo);
      const s = vista.stazione;
      const corrente = vista.corrente;
      for (const f of FINESTRE) {
        const elenco = assi.get(f.id);
        if (elenco) elenco.forEach((asse, i) => { asse.visible = i < vista.finestre[f.id]; });
      }
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        const aperta = vista.porte.has(p.id);
        porta.apertura = aperta ? Math.min(1, porta.apertura + dt * 1.2) : Math.max(0, porta.apertura - dt * 2.5);
        const a = porta.apertura;
        if (porta.tipo === 'scorrevole') for (const { anta, lato, base } of porta.ante) anta.position.x = base + lato * a * (porta.larghezza / 2 - 0.05);
        else if (porta.tipo === 'serranda') {
          porta.telo.scale.y = Math.max(0.04, 1 - a);
          porta.telo.visible = a < 0.99;
        } else porta.perno.rotation.y = a * 1.55;
      }

      luceTettoia.emissiveIntensity = corrente ? 2.4 : 0;
      luceInterna.emissiveIntensity = corrente ? 1.8 : Math.sin(tempo * 7.3) > 0.97 ? 0.4 : 0;
      for (const m of neonMateriali) m.emissiveIntensity = corrente ? 2 : 0;
      marchio.emissiveIntensity = corrente ? 0.9 : 0.04;
      for (const sch of arredi.schermiPompe) sch.material.emissiveIntensity = corrente ? 0.9 : 0.03;
      arredi.interniFrigo.material.emissiveIntensity = corrente ? 0.9 : 0.02;
      for (const v of vetrineMarket) v.material.opacity = 0.85;
      leva.rotation.z = THREE.MathUtils.lerp(leva.rotation.z, corrente ? -2.4 : 0, Math.min(1, dt * 5));
      spia.material.color.setHex(corrente ? 0x3cff6a : Math.sin(tempo * 3) > 0.6 ? 0xb8241b : 0x3a0a0a);
      const lampeggio = Math.sin(tempo * 6) > 0;
      for (const f of quattroFrecce) f.material.color.setHex(lampeggio ? 0xffa020 : 0x3a2008);

      if (s) {
        arredi.taniche.forEach((t, i) => { t.visible = vista.fase !== 'attesa' && !s.taniche[i]; });
        arredi.versate.forEach((t, i) => { t.visible = i < s.versate; });
        const acceso = s.gruppo === GRUPPO.ACCESO || s.gruppo >= GRUPPO.FARO;
        arredi.gruppo.position.x = OGGETTI.GRUPPO.x + (acceso ? Math.sin(tempo * 61) * 0.008 : 0);
        arredi.gruppo.position.z = OGGETTI.GRUPPO.z + 0.1 + (acceso ? Math.cos(tempo * 53) * 0.008 : 0);
        luceGruppo.valore = acceso ? 5 : 0;
        if (s.gruppo >= GRUPPO.FARO && stato.faro === 0) stato.faro = 1;
        if (s.gruppo < GRUPPO.FARO) stato.faro = 0;
        if (stato.faro > 0) stato.faro = Math.min(1, stato.faro + dt * 0.6);
        const faro = stato.faro * (Math.sin(tempo * 40) > -0.95 ? 1 : 0.6);
        for (const t of arredi.testeFaro) t.material.emissiveIntensity = faro * 4;
        fascio.opacity = faro * 0.045;
        faroLuce.intensity = faro * 480;
        prossimoSbuffo -= dt;
        if (acceso && prossimoSbuffo <= 0) {
          prossimoSbuffo = 0.25;
          const libero = sbuffi.find(q => !q.visible);
          if (libero) {
            libero.visible = true;
            libero.userData.vita = 0;
            libero.position.set(OGGETTI.GRUPPO.x - 0.3, 0.9, OGGETTI.GRUPPO.z + 0.4);
          }
        }
        if (s.gruppo >= GRUPPO.CAMIONISTA && schianto === null) {
          if (prima !== null && prima < GRUPPO.CAMIONISTA) api.schianto();
          else {
            schianto = DURATA_SCHIANTO;
            camion.visible = true;
            posaCamion(DURATA_SCHIANTO);
          }
        }
        prima = s.gruppo;
        const fiammeAccese = s.incendio.attiva > 0;
        fuocoTrappola.valore = fiammeAccese ? 40 : 0;
        stato.incendio = THREE.MathUtils.lerp(stato.incendio, fiammeAccese ? 1 : 0, Math.min(1, dt * 3));
        bruciato.material.opacity = Math.max(bruciato.material.opacity * (1 - dt * 0.02), stato.incendio * 0.8);
      }
      for (const q of sbuffi) {
        if (!q.visible) continue;
        q.userData.vita += dt;
        const v = q.userData.vita;
        q.position.y += dt * 0.9;
        q.position.x += dt * 0.25;
        q.scale.setScalar(0.3 + v * 0.7);
        q.material.opacity = Math.max(0, 0.45 - v * 0.2);
        if (v > 2.2) q.visible = false;
      }
      for (const f of fiamme) {
        f.visible = stato.incendio > 0.02;
        if (!f.visible) continue;
        const u = f.userData;
        const h = u.base * stato.incendio * (0.75 + Math.sin(tempo * 11 + u.fase) * 0.2 + Math.sin(tempo * 27 + u.fase * 3) * 0.08);
        f.scale.set(h * 0.7, h * 1.4, 1);
        f.position.y = h * 0.6;
      }
      if (schianto !== null) {
        if (schianto < DURATA_SCHIANTO) {
          schianto += dt;
          posaCamion(schianto);
        }
        luceRelitto.valore = 16;
        for (const f of fuocoRelitto) {
          const h = 1 + Math.sin(tempo * 10 + f.userData.fase) * 0.25;
          f.scale.set(h * 1.1, h * 1.8, 1);
        }
      } else luceRelitto.valore = 0;

      const trovati = new Set(vista.frammenti ?? []);
      grattaVinci.forEach((g, i) => {
        g.visible = vista.fase !== 'attesa' && !trovati.has(FRAMMENTI[i].id);
        g.rotation.y = tempo * 1.1 + g.userData.fase;
        g.position.y = FRAMMENTI[i].y - 0.05 + Math.sin(tempo * 2 + i) * 0.03;
      });
      aggiornaLuci(vista, dt, tempo, punto);
    },
    nebbia(vista) {
      if (vista.stazione?.incendio?.attiva > 0) return { fattore: 0.9, colore: 0x24140a };
      return null;
    },
  };
}
