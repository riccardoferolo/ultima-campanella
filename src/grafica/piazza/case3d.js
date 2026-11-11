import * as THREE from 'three';
import { CASE, OSTACOLI } from '../../mappe/piazza.js';
import { creaCaso } from '../caso-grafica.js';
import { superficiePersiana, superficieSaracinesca, texturaVetroSpento, texturaVetroAcceso, texturaVetrina } from './superfici.js';

const PIANO_TERRA = 3.6;
const PIANO = 3;
const CAMPATA = 2.8;
const MARGINE = 0.9;
const FINESTRA = Object.freeze({ largo: 1.1, alto: 1.65, davanzale: 0.95 });
const SPORTO_CORNICE = 0.09;
const SPORTO_ZOCCOLO = 0.08;
const ACCESE = 0.2;
const BALCONI = 0.3;
const SBARRATE = 0.35;
const PASSO_TRAVETTI = 0.75;
const PASSO_SBARRE = 0.12;
const NEGOZI = Object.freeze([
  { righe: ['FARMACIA'], sfondo: '#1d6b3a', colore: '#eaffea' },
  { righe: ['TABACCHI'], sfondo: '#1b2f6b', colore: '#ffffff' },
  { righe: ['ALIMENTARI'], sfondo: '#7a1c1c', colore: '#ffe9c0' },
  { righe: ['PANETTERIA'], sfondo: '#6b4a1c', colore: '#fff2d0' },
]);
const BLOCCHI_EXTRA = Object.freeze([{ x0: 34.3, z0: 24.8, x1: 40.4, z1: 30.8 }]);

const dentro = (x, z, s, margine = 0) => x > s.x0 - margine && x < s.x1 + margine && z > s.z0 - margine && z < s.z1 + margine;

function lati(c) {
  return [
    { nome: 'nord', n: { x: 0, z: -1 }, u0: c.x0, u1: c.x1, piano: c.z0 },
    { nome: 'sud', n: { x: 0, z: 1 }, u0: c.x0, u1: c.x1, piano: c.z1 },
    { nome: 'ovest', n: { x: -1, z: 0 }, u0: c.z0, u1: c.z1, piano: c.x0 },
    { nome: 'est', n: { x: 1, z: 0 }, u0: c.z0, u1: c.z1, piano: c.x1 },
  ];
}

const MUNICIPIO = Object.freeze({ n: { x: 0, z: 1 }, piano: -19.7, u0: -12, u1: 18, passo: 2.7, portone: 2, bacheca: 3, lampade: Object.freeze([-9.5, 0.5]) });

function strumentiLato(lato, box, statico) {
  const { n } = lato;
  const ry = Math.atan2(n.x, n.z);
  const fuori = (u, w) => (n.z !== 0 ? { x: u, z: lato.piano + n.z * w } : { x: lato.piano + n.x * w, z: u });
  const blocco = (chiave, u0, u1, v0, v1, w0, w1) => {
    const a = fuori(Math.min(u0, u1), Math.min(w0, w1));
    const b = fuori(Math.max(u0, u1), Math.max(w0, w1));
    box(chiave, Math.min(a.x, b.x), v0, Math.min(a.z, b.z), Math.max(a.x, b.x), v1, Math.max(a.z, b.z), 1);
  };
  const lastra = (chiave, geometria, u, v, w, rz = 0) => {
    const p = fuori(u, w);
    statico.aggiungi(chiave, geometria, p.x, v, p.z, ry, 0, rz);
  };
  return { fuori, blocco, lastra };
}

function finestraAlta({ blocco, lastra }, caso, u, vs, alta, largo, { balcone = false, persiana = null, accese = ACCESE } = {}) {
  const accesa = caso() < accese;
  const vetro = new THREE.PlaneGeometry(largo, alta);
  if (accesa) {
    const uv = vetro.attributes.uv;
    const meta = caso() < 0.5 ? 0 : 0.5;
    for (let i = 0; i < uv.count; i++) uv.setX(i, meta + uv.getX(i) * 0.5);
  }
  lastra(accesa ? 'vetroAcceso' : 'vetroSpento', vetro, u, vs + alta / 2, 0.012);
  const l2 = largo / 2;
  blocco('pietraCornice', u - l2 - 0.14, u - l2, vs - 0.04, vs + alta + 0.02, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u + l2, u + l2 + 0.14, vs - 0.04, vs + alta + 0.02, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u - l2 - 0.14, u + l2 + 0.14, vs + alta, vs + alta + 0.16, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u - l2 - 0.24, u + l2 + 0.24, vs + alta + 0.16, vs + alta + 0.23, 0, 0.16);
  if (!balcone) blocco('pietraCornice', u - l2 - 0.2, u + l2 + 0.2, vs - 0.1, vs, 0, 0.17);
  if (!persiana) return;
  const stato = caso();
  const anta = new THREE.BoxGeometry(l2 + 0.02, alta + 0.02, 0.04);
  const aperta = s => lastra(persiana, anta, u + s * (l2 + 0.14 + (l2 + 0.02) / 2), vs + alta / 2, 0.04);
  const chiusa = s => lastra(persiana, anta, u + s * (l2 + 0.02) / 2 - s * 0.01, vs + alta / 2, 0.05);
  if (stato < 0.55) { aperta(-1); aperta(1); } else if (stato < 0.8) { chiusa(-1); chiusa(1); } else { chiusa(-1); aperta(1); }
}

function finestraBassa({ blocco, lastra }, u, vs, alta, largo, sbarrata) {
  const l2 = largo / 2;
  lastra('vetroSpento', new THREE.PlaneGeometry(largo, alta), u, vs + alta / 2, 0.012);
  blocco('pietraCornice', u - l2 - 0.14, u - l2, vs - 0.04, vs + alta + 0.02, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u + l2, u + l2 + 0.14, vs - 0.04, vs + alta + 0.02, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u - l2 - 0.14, u + l2 + 0.14, vs + alta, vs + alta + 0.14, 0, SPORTO_CORNICE);
  blocco('pietraCornice', u - l2 - 0.2, u + l2 + 0.2, vs - 0.1, vs, 0, 0.15);
  if (sbarrata) {
    for (const [dv, rz] of [[0.22, 0.12], [0.55, -0.08], [0.85, 0.15]]) lastra('legno', new THREE.BoxGeometry(largo + 0.4, 0.2, 0.035), u, vs + dv * alta, 0.13, rz);
    return;
  }
  for (let x = u - l2 + 0.06; x <= u + l2 - 0.05; x += PASSO_SBARRE) blocco('ferro', x - 0.012, x + 0.012, vs, vs + alta, 0.1, 0.125);
  for (const dv of [0.15, alta - 0.15]) blocco('ferro', u - l2 - 0.02, u + l2 + 0.02, vs + dv - 0.015, vs + dv + 0.015, 0.1, 0.125);
}

export function costruisciFacciate({ statico, mat, box, cil, sfera, cartello }) {
  const caso = creaCaso(1424);
  const persiana = superficiePersiana();
  const saracinesca = superficieSaracinesca();
  const acceso = texturaVetroAcceso();
  Object.assign(mat, {
    pietraCornice: new THREE.MeshStandardMaterial({ color: 0xddd5c6, roughness: 0.78 }),
    persianaVerde: new THREE.MeshStandardMaterial({ map: persiana.map, normalMap: persiana.normalMap, color: 0x5b7c52, roughness: 0.7 }),
    persianaMarrone: new THREE.MeshStandardMaterial({ map: persiana.map, normalMap: persiana.normalMap, color: 0x7a5636, roughness: 0.7 }),
    vetroSpento: new THREE.MeshStandardMaterial({ map: texturaVetroSpento(), roughness: 0.12, metalness: 0.35 }),
    vetroAcceso: new THREE.MeshStandardMaterial({ map: acceso, emissive: 0xffffff, emissiveMap: acceso, emissiveIntensity: 0.95, roughness: 0.4 }),
    vetrina: new THREE.MeshStandardMaterial({ map: texturaVetrina(), roughness: 0.1, metalness: 0.35 }),
    saracinesca: new THREE.MeshStandardMaterial({ map: saracinesca.map, normalMap: saracinesca.normalMap, color: 0xb8bcc2, metalness: 0.55, roughness: 0.45 }),
    rame: new THREE.MeshStandardMaterial({ color: 0x8c5c3c, metalness: 0.65, roughness: 0.42 }),
    lanternaMuro: new THREE.MeshBasicMaterial({ color: 0xffd28a }),
  });
  const insegna = colore => {
    const chiave = `insegna${colore.slice(1)}`;
    mat[chiave] ??= new THREE.MeshStandardMaterial({ color: new THREE.Color(colore), emissive: new THREE.Color(colore), emissiveIntensity: 0.55, roughness: 0.5 });
    return chiave;
  };

  const ostacoli = [...CASE, ...OSTACOLI.filter(o => o.tipo === 'annesso'), ...BLOCCHI_EXTRA];
  const panchine = OSTACOLI.filter(o => o.tipo === 'panchina');
  const lanterne = [];
  let negozio = 0;

  for (const c of CASE) {
    const persianaCasa = caso() < 0.6 ? 'persianaVerde' : 'persianaMarrone';
    const piani = Math.max(1, Math.floor((c.altezza - PIANO_TERRA - 0.6) / PIANO) + 1);
    for (const lato of lati(c)) {
      const { n } = lato;
      const attrezzi = strumentiLato(lato, box, statico);
      const { fuori, blocco, lastra } = attrezzi;
      const libero = u => {
        const p = fuori(u, 0.8);
        return !ostacoli.some(o => o !== c && dentro(p.x, p.z, o));
      };
      const lungo = lato.u1 - lato.u0;
      if (lungo < 2.5 || ![0.15, 0.5, 0.85].some(t => libero(lato.u0 + lungo * t))) continue;

      const campate = Math.max(1, Math.floor((lungo - MARGINE * 2) / CAMPATA));
      const centri = Array.from({ length: campate }, (_, i) => lato.u0 + MARGINE + ((lungo - MARGINE * 2) * (i + 0.5)) / campate);
      const fronte = c.faccia === lato.nome;
      const inBovindo = u => c.bovindo && lato.nome === 'nord' && [c.x0 + 2.2, c.x1 - 2.2].some(x => Math.abs(u - x) < 1.6);
      const inBar = u => c.bar && lato.nome === 'est' && u > 18.6 && u < 25.4;
      const davantiPanchina = u => {
        const p = fuori(u, 0.4);
        return panchine.some(o => dentro(p.x, p.z, o, 0.7));
      };

      for (let p = 0; p <= piani; p++) {
        const y = p === 0 ? 0 : PIANO_TERRA + (p - 1) * PIANO;
        if (p > 0) blocco('pietraCornice', lato.u0, lato.u1, y - 0.08, y + 0.06, 0, 0.05);
      }

      const balcone = (u, y) => {
        blocco('pietraCornice', u - 0.85, u + 0.85, y - 0.02, y + 0.12, 0, 0.78);
        for (const s of [-0.55, 0.55]) blocco('pietraCornice', u + s - 0.07, u + s + 0.07, y - 0.32, y - 0.02, 0, 0.6);
        blocco('ferro', u - 0.82, u + 0.82, y + 0.96, y + 1.0, 0.72, 0.77);
        blocco('ferro', u - 0.82, u + 0.82, y + 0.18, y + 0.22, 0.72, 0.77);
        for (let x = u - 0.78; x <= u + 0.78; x += PASSO_SBARRE) blocco('ferro', x - 0.011, x + 0.011, y + 0.12, y + 0.97, 0.735, 0.755);
        for (const s of [-1, 1]) {
          blocco('ferro', u + s * 0.82 - 0.02, u + s * 0.82 + 0.02, y + 0.96, y + 1.0, 0, 0.77);
          for (let w = 0.1; w < 0.72; w += PASSO_SBARRE) blocco('ferro', u + s * 0.8 - 0.011, u + s * 0.8 + 0.011, y + 0.12, y + 0.97, w, w + 0.02);
        }
        if (caso() < 0.7) {
          for (const s of [-0.5, 0.5]) {
            const p = fuori(u + s, 0.45);
            cil('cotto', p.x, y + 0.12, p.z, 0.16, 0.3, 10, 0.12);
            sfera('chioma', p.x, y + 0.55, p.z, 0.26, 8);
          }
        }
      };

      for (let p = 1; p <= piani; p++) {
        const y = PIANO_TERRA + (p - 1) * PIANO;
        if (y + FINESTRA.davanzale + FINESTRA.alto > c.altezza - 0.35) break;
        for (const u of centri) {
          if (!libero(u) || inBovindo(u)) continue;
          if (p === 1 && fronte && caso() < BALCONI) {
            finestraAlta(attrezzi, caso, u, y + 0.04, 2.35, FINESTRA.largo, { balcone: true, persiana: persianaCasa });
            balcone(u, y);
          } else finestraAlta(attrezzi, caso, u, y + FINESTRA.davanzale, FINESTRA.alto, FINESTRA.largo, { persiana: persianaCasa });
        }
      }

      if (!c.portici) {
        let portone = fronte ? Math.floor(caso() * centri.length) : -1;
        centri.forEach((u, i) => {
          if (!libero(u) || inBar(u)) return;
          if (davantiPanchina(u)) {
            if (i === portone) portone += 1;
            finestraBassa(attrezzi, u, 1.05, 1.35, 1, false);
            return;
          }
          if (i === portone) {
            blocco('porta', u - 0.7, u + 0.7, 0, 2.6, SPORTO_ZOCCOLO, SPORTO_ZOCCOLO + 0.03);
            blocco('pietraCornice', u - 0.86, u - 0.7, 0, 2.76, 0, SPORTO_ZOCCOLO + 0.1);
            blocco('pietraCornice', u + 0.7, u + 0.86, 0, 2.76, 0, SPORTO_ZOCCOLO + 0.1);
            blocco('pietraCornice', u - 0.86, u + 0.86, 2.6, 2.86, 0, SPORTO_ZOCCOLO + 0.12);
            blocco('granito', u - 0.95, u + 0.95, 0, 0.13, 0, 0.42);
            const lampada = fuori(u + 1.25, 0.18);
            blocco('ferro', u + 1.2, u + 1.3, 2.9, 2.96, 0, 0.22);
            box('lanternaMuro', lampada.x - 0.09, 2.62, lampada.z - 0.09, lampada.x + 0.09, 2.9, lampada.z + 0.09, 1);
            lanterne.push({ x: lampada.x, y: 2.76, z: lampada.z });
            portone = -2;
            return;
          }
          if (fronte && negozio < NEGOZI.length && caso() < 0.55) {
            const dati = NEGOZI[negozio++];
            lastra('vetrina', new THREE.PlaneGeometry(2.4, 2.1), u, 1.55, SPORTO_ZOCCOLO + 0.01);
            blocco('ferro', u - 1.25, u + 1.25, 0.45, 0.5, 0, SPORTO_ZOCCOLO + 0.06);
            blocco('ferro', u - 1.27, u - 1.2, 0.45, 2.65, 0, SPORTO_ZOCCOLO + 0.06);
            blocco('ferro', u + 1.2, u + 1.27, 0.45, 2.65, 0, SPORTO_ZOCCOLO + 0.06);
            blocco('granito', u - 1.3, u + 1.3, 0, 0.45, 0, SPORTO_ZOCCOLO + 0.08);
            const giu = 1.2 + caso() * 1.1;
            blocco('saracinesca', u - 1.25, u + 1.25, giu, 2.72, SPORTO_ZOCCOLO + 0.03, SPORTO_ZOCCOLO + 0.09);
            blocco('ferro', u - 1.3, u + 1.3, 2.72, 2.98, 0, SPORTO_ZOCCOLO + 0.16);
            blocco(insegna(dati.sfondo), u - 1.4, u + 1.4, 3.04, 3.46, 0, 0.09);
            const p = fuori(u, 0.1);
            cartello(dati.righe, p.x, 3.25, p.z, n, 2.4, 0.34, { larghezza: 256, altezza: 36, sfondo: dati.sfondo, colore: dati.colore, font: 'bold 24px Arial, sans-serif' });
            return;
          }
          finestraBassa(attrezzi, u, 1.05, 1.35, 1, caso() < SBARRATE);
        });
      }

      const h = c.altezza;
      for (let u = lato.u0 + 0.4; u < lato.u1 - 0.3; u += PASSO_TRAVETTI) blocco('legnoScuro', u - 0.055, u + 0.055, h - 0.34, h - 0.2, 0, 0.48);
      const grondaia = new THREE.CylinderGeometry(0.07, 0.07, lungo + 1, 8, 1, true);
      lastra('rame', grondaia, (lato.u0 + lato.u1) / 2, h - 0.05, 0.56, Math.PI / 2);
      for (const u of [lato.u0 + 0.25, lato.u1 - 0.25]) {
        if (!libero(u)) continue;
        const p = fuori(u, 0.12);
        cil('rame', p.x, 0.05, p.z, 0.05, h - 0.12, 8);
        blocco('rame', u - 0.06, u + 0.06, h - 0.12, h - 0.02, 0, 0.56);
      }
    }

    const colmo = c.altezza + Math.min(3, Math.min(c.x1 - c.x0, c.z1 - c.z0) * 0.3);
    const comignoli = 1 + Math.floor(caso() * 2);
    for (let i = 0; i < comignoli; i++) {
      const x = c.x0 + (c.x1 - c.x0) * (0.3 + caso() * 0.4);
      const z = c.z0 + (c.z1 - c.z0) * (0.3 + caso() * 0.4);
      box('mattoni', x - 0.32, c.altezza, z - 0.32, x + 0.32, colmo + 0.9, z + 0.32, 1);
      box('cemento', x - 0.42, colmo + 0.9, z - 0.42, x + 0.42, colmo + 0.98, z + 0.42, 1);
      box('mattoni', x - 0.1, colmo + 0.98, z - 0.1, x + 0.1, colmo + 1.18, z + 0.1, 1);
    }
    if (caso() < 0.5) {
      const x = (c.x0 + c.x1) / 2;
      const z = (c.z0 + c.z1) / 2;
      cil('ferro', x, colmo - 0.2, z, 0.02, 2.4, 5);
      for (const [dy, l] of [[1.6, 1.4], [1.9, 1.1], [2.15, 0.8]]) box('ferro', x - l / 2, colmo + dy, z - 0.012, x + l / 2, colmo + dy + 0.02, z + 0.012, 1);
    }
  }

  const municipio = strumentiLato(MUNICIPIO, box, statico);
  for (let k = 0; MUNICIPIO.u0 + MUNICIPIO.passo * (k + 0.5) < MUNICIPIO.u1; k++) {
    if (k === MUNICIPIO.portone) continue;
    const u = MUNICIPIO.u0 + MUNICIPIO.passo * (k + 0.5);
    finestraAlta(municipio, caso, u, 5.9, 2, 1.08, { accese: 0.3 });
    if (k !== MUNICIPIO.bacheca && !MUNICIPIO.lampade.some(x => Math.abs(x - u) < 0.8)) finestraBassa(municipio, u, 1.7, 2.2, 1.08, false);
  }

  return { lanterne };
}
