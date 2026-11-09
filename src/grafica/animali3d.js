import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MAPPE } from '../mappa.js';
import { dentroScatola } from '../fisica.js';

const SEME = 20261109;
const PASSO_MASSIMO = 0.1;
const MAX_MINACCE = 160;
const DUE_PI = Math.PI * 2;
const ALTEZZA_PALMA = 6.5;
const SOPRA_TETTI = 0.8;
const SOTTO_SOFFITTO = 0.3;
const QUOTA_FIUME = -0.35;
const ALTEZZA_ALBERO = 4.2;
const SOPRA_LAMPIONE = 1.65;

const RAGGIO_UCCELLI = 7;
const RAGGIO_PIPISTRELLI = 6;
const RAGGIO_PIPISTRELLI_FUORI = 4;
const RAGGIO_LUCCIOLE = 2.5;
const RAGGIO_FARFALLE = 3.5;
const RAGGIO_RANE = 3.5;
const CALMA_DOPO_FUGA = 10;
const PAURA = 2.5;

const VOLO_MINIMO = 6;
const VOLO_MASSIMO = 34;
const RITARDO_DECOLLO = 0.45;
const NUMERO_LUCCIOLE = 150;
const NUMERO_NINFEE = 10;
const NUMERO_RANE = 6;
const PIEGA_POSATO = -1.3;
const PIEGA_APPESO = 1.4;
const PIEGA_VOLO = 0.1;
const AMPIEZZA_VOLO = 0.9;
const SCALA_PIPISTRELLO = 0.9;
const SCALA_FARFALLA = 1.7;
const SCALA_RANA = 1.4;

const COLORI_PAPPAGALLI = Object.freeze([0xb4372b, 0x2d63ad, 0x3d8c3f, 0xcf9f35]);
const COLORI_CORVI = Object.freeze([0x1c1c22, 0x23222a]);
const COLORI_RANE = Object.freeze([0x4f7a2c, 0x5f6c2a, 0x3d6a3c]);
const COLORE_LUCCIOLA = Object.freeze([0.78, 1, 0.32]);
const AREE_FARFALLE = Object.freeze([['cascata', 3], ['rivaNord', 2], ['scalinata', 2], ['villaggio', 2], ['rivaSud', 2]]);
const AREE_CORVI = Object.freeze(['cortile', 'campo']);
const POSATOI_CORVI = Object.freeze(new Set(['albero', 'lampione', 'pulmino', 'tribuna']));
const RIFUGI_GIUNGLA = Object.freeze([
  Object.freeze({ zona: 'grotta', numero: 4 }),
  Object.freeze({ zona: 'tempio', numero: 3 }),
  Object.freeze({ zona: 'cuore', numero: 3 }),
  Object.freeze({ zona: 'cascata', numero: 3, basso: 1.6, alto: 6 }),
]);
const RIFUGI_SCUOLA = Object.freeze([
  Object.freeze({ zona: 'rifugio', numero: 3 }),
  Object.freeze({ zona: 'caldaia', numero: 2 }),
  Object.freeze({ zona: 'cortile', numero: 3, basso: 3.4, alto: 6.5 }),
]);

const _matrice = new THREE.Matrix4();
const _posizione = new THREE.Vector3();
const _rotazione = new THREE.Quaternion();
const _scala = new THREE.Vector3();
const _euler = new THREE.Euler(0, 0, 0, 'YXZ');
const _colore = new THREE.Color();
const _arco = { x: 0, y: 0, z: 0, dx: 0, dy: 0, dz: 0 };
const NASCOSTO = new THREE.Matrix4().makeScale(0, 0, 0);
const tempoAnimali = { value: 0 };

const limita = (v, min, max) => (v < min ? min : v > max ? max : v);
const avvicina = (v, meta, k) => v + (meta - v) * k;
const lunghezza = (x, z) => Math.sqrt(x * x + z * z);
const tra = (caso, min, max) => min + caso() * (max - min);
const morbido = (dt, rapidita) => 1 - Math.exp(-dt * rapidita);
const scarto = a => Math.atan2(Math.sin(a), Math.cos(a));
const giraVerso = (a, meta, k) => a + scarto(meta - a) * k;
const liscia = u => u * u * (3 - 2 * u);
const dentroArea = (a, x, z) => x >= a.x0 && x <= a.x1 && z >= a.z0 && z <= a.z1;
const rientra = (s, m) => ({ x0: s.x0 + m, z0: s.z0 + m, x1: s.x1 - m, z1: s.z1 - m });
const quadrato = (x, z, r, altezza) => ({ x0: x - r, z0: z - r, x1: x + r, z1: z + r, altezza, tipo: '' });
const copiaScatola = (s, altezza) => ({ x0: s.x0, z0: s.z0, x1: s.x1, z1: s.z1, altezza: s.altezza ?? altezza, tipo: s.tipo ?? '' });
const zona = (dati, id) => dati.zone.find(z => z.id === id);

function generatore(seme) {
  let stato = seme >>> 0;
  const caso = () => {
    stato = (stato + 0x6d2b79f5) >>> 0;
    let t = stato;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  caso.riavvia = () => { stato = seme >>> 0; };
  return caso;
}

export function datiMappa(mappa) {
  const id = Object.hasOwn(MAPPE, mappa) ? mappa : 'scuola';
  const m = MAPPE[id];
  const interne = new Set(m.INTERNE ?? m.ZONE.filter(z => !z.aperto).map(z => z.id));
  const muri = m.MURI.map(s => copiaScatola(s, Infinity));
  const recinzioni = (m.RECINZIONI ?? []).map(s => copiaScatola(s, m.ALTEZZA_RECINZIONE ?? Infinity));
  const ostacoli = m.OSTACOLI.map(s => copiaScatola(s, 1));
  const varchi = [...m.FINESTRE.map(f => f.scatola), ...m.PORTE.map(p => p.scatola)].filter(Boolean).map(s => copiaScatola(s, Infinity));
  const tane = m.FINESTRE.filter(f => f.tana).map(f => quadrato(f.interno.x, f.interno.z, 0.9, 0.4));
  const acquisti = m.ACQUISTI.map(a => quadrato(a.posizione.x, a.posizione.z, 0.6, 2.2));
  const arredi = (m.ARREDI ?? []).map(a => (a.solido ? copiaScatola(a.solido, 1) : quadrato(a.x, a.z, 0.45, 0.8)));
  return {
    id,
    soffitto: m.ALTEZZA_SOFFITTO,
    limiti: { x0: m.LIMITI.x0, z0: m.LIMITI.z0, x1: m.LIMITI.x1, z1: m.LIMITI.z1 },
    zone: m.ZONE.map(z => ({ id: z.id, x0: z.x0, z0: z.z0, x1: z.x1, z1: z.z1, aperto: !!z.aperto, interna: interne.has(z.id) })),
    ostacoli,
    solidi: [...muri, ...recinzioni, ...ostacoli, ...varchi, ...tane, ...acquisti, ...arredi],
  };
}

function altezzePalme(scena, palme) {
  const altezze = palme.map(() => ALTEZZA_PALMA);
  const matrice = new THREE.Matrix4();
  const posizione = new THREE.Vector3();
  const rotazione = new THREE.Quaternion();
  const scala = new THREE.Vector3();
  scena.traverse(oggetto => {
    if (!oggetto.isInstancedMesh) return;
    for (let i = 0; i < oggetto.count; i++) {
      oggetto.getMatrixAt(i, matrice);
      matrice.decompose(posizione, rotazione, scala);
      if (Math.abs(posizione.y) > 0.01 || scala.y < 2) continue;
      const k = palme.findIndex(p => Math.abs(p.x - posizione.x) < 0.01 && Math.abs(p.z - posizione.z) < 0.01);
      if (k >= 0) altezze[k] = scala.y;
    }
  });
  return altezze;
}

export function creaMinacce() {
  return { x: new Float32Array(MAX_MINACCE), z: new Float32Array(MAX_MINACCE), n: 0, vicinaX: 0, vicinaZ: 0, distanza: Infinity };
}

const NESSUNA_MINACCIA = creaMinacce();

function aggiungiMinaccia(m, x, z) {
  if (m.n >= MAX_MINACCE || !Number.isFinite(x) || !Number.isFinite(z)) return;
  m.x[m.n] = x;
  m.z[m.n] = z;
  m.n += 1;
}

export function raccogliMinacce(m, vista, camera) {
  m.n = 0;
  if (camera?.position) aggiungiMinaccia(m, camera.position.x, camera.position.z);
  const giocatori = vista?.giocatori;
  if (giocatori) for (let i = 0; i < giocatori.length; i++) {
    const g = giocatori[i];
    if (g && g.stato !== 'morto') aggiungiMinaccia(m, g.x, g.z);
  }
  const zombie = vista?.zombie;
  if (zombie) for (let i = 0; i < zombie.length; i++) {
    const z = zombie[i];
    if (z && z.stato !== 'morto') aggiungiMinaccia(m, z.x, z.z);
  }
  return m;
}

export function minacciaVicina(m, x, z, raggio) {
  let migliore = raggio * raggio;
  let trovata = false;
  for (let i = 0; i < m.n; i++) {
    const dx = m.x[i] - x;
    const dz = m.z[i] - z;
    const d = dx * dx + dz * dz;
    if (d >= migliore) continue;
    migliore = d;
    m.vicinaX = m.x[i];
    m.vicinaZ = m.z[i];
    trovata = true;
  }
  m.distanza = trovata ? Math.sqrt(migliore) : Infinity;
  return trovata;
}

function libero(solidi, x, z, raggio, quota) {
  for (let i = 0; i < solidi.length; i++) {
    const s = solidi[i];
    if (s.altezza > quota && x > s.x0 - raggio && x < s.x1 + raggio && z > s.z0 - raggio && z < s.z1 + raggio) return false;
  }
  return true;
}

function creaTetti(dati) {
  const interne = dati.zone.filter(z => z.interna);
  const quota = dati.soffitto + SOPRA_TETTI;
  return (x, z) => {
    for (let i = 0; i < interne.length; i++) if (dentroScatola(x, z, interne[i], 0.5)) return quota;
    return -Infinity;
  };
}

function nuovoArco() {
  return { da: { x: 0, y: 0, z: 0 }, c: { x: 0, y: 0, z: 0 }, a: { x: 0, y: 0, z: 0 } };
}

function impostaArco(arco, x0, y0, z0, x1, y1, z1, alzata, laterale) {
  arco.da.x = x0; arco.da.y = y0; arco.da.z = z0;
  arco.a.x = x1; arco.a.y = y1; arco.a.z = z1;
  const dx = x1 - x0;
  const dz = z1 - z0;
  const d = lunghezza(dx, dz) || 1;
  arco.c.x = (x0 + x1) / 2 - (dz / d) * laterale;
  arco.c.y = Math.max(y0, y1) + alzata;
  arco.c.z = (z0 + z1) / 2 + (dx / d) * laterale;
}

function puntoArco(arco, s) {
  const u = 1 - s;
  const { da, c, a } = arco;
  _arco.x = u * u * da.x + 2 * u * s * c.x + s * s * a.x;
  _arco.y = u * u * da.y + 2 * u * s * c.y + s * s * a.y;
  _arco.z = u * u * da.z + 2 * u * s * c.z + s * s * a.z;
  _arco.dx = 2 * u * (c.x - da.x) + 2 * s * (a.x - c.x);
  _arco.dy = 2 * u * (c.y - da.y) + 2 * s * (a.y - c.y);
  _arco.dz = 2 * u * (c.z - da.z) + 2 * s * (a.z - c.z);
  return _arco;
}

const ALI_VERTICI = 'attribute float ala;\nattribute vec4 battito;\nuniform float uTempo;';
const ALI_MOTO = [
  'float tetaAla = (battito.w + sin(uTempo * battito.x + battito.y) * battito.z) * sign(transformed.x) * ala;',
  'transformed.xy = vec2(transformed.x * cos(tetaAla) - transformed.y * sin(tetaAla), transformed.x * sin(tetaAla) + transformed.y * cos(tetaAla));',
].join('\n');

export function materialeAnimale({ colore = 0xffffff, bagliore = 0.15, emissivo = 0x000000, luce = 0, ali = false, doppio = false } = {}) {
  const materiale = new THREE.MeshLambertMaterial({ color: colore, emissive: emissivo, emissiveIntensity: luce, flatShading: true, side: ali || doppio ? THREE.DoubleSide : THREE.FrontSide });
  const intensita = { value: bagliore };
  materiale.onBeforeCompile = shader => {
    shader.uniforms.uTempo = tempoAnimali;
    shader.uniforms.uBagliore = intensita;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uBagliore;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * uBagliore;');
    if (!ali) return;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${ALI_VERTICI}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${ALI_MOTO}`);
  };
  materiale.customProgramCacheKey = () => (ali ? 'animale-ali' : 'animale');
  return materiale;
}

function parte(geometria, ala = 0) {
  const g = geometria.index ? geometria.toNonIndexed() : geometria;
  g.deleteAttribute('uv');
  if (!g.attributes.normal) g.computeVertexNormals();
  g.setAttribute('ala', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(ala), 1));
  return g;
}

function lamina(triangoli, ala = 1) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(triangoli.flat(), 3));
  return parte(g, ala);
}

function unisci(parti) {
  const g = mergeGeometries(parti);
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

function alaUccello(lato) {
  const p = (x, z) => [x * lato, 0.02, z];
  return lamina([p(0.03, 0.07), p(0.22, 0.05), p(0.03, -0.07), p(0.03, -0.07), p(0.22, 0.05), p(0.38, -0.1)]);
}

function geometriaUccello(coda) {
  return unisci([
    parte(new THREE.SphereGeometry(1, 6, 4).scale(0.07, 0.065, 0.16)),
    parte(new THREE.SphereGeometry(0.055, 6, 4).translate(0, 0.045, 0.15)),
    parte(new THREE.ConeGeometry(0.022, 0.07, 4).rotateX(Math.PI / 2 + 0.5).translate(0, 0.03, 0.21)),
    lamina([[-0.045, 0.01, -0.12], [0.045, 0.01, -0.12], [0, 0, -0.12 - coda]], 0),
    alaUccello(1),
    alaUccello(-1),
  ]);
}

function alaPipistrello(lato) {
  const p = (x, z) => [x * lato, 0, z];
  const radice = p(0.02, 0.04);
  const bordo = [p(0.26, 0), p(0.2, -0.07), p(0.13, -0.03), p(0.07, -0.08), p(0.02, -0.05)];
  const triangoli = [];
  for (let i = 0; i < bordo.length - 1; i++) triangoli.push(radice, bordo[i], bordo[i + 1]);
  return lamina(triangoli);
}

function geometriaPipistrello() {
  return unisci([
    parte(new THREE.SphereGeometry(1, 6, 4).scale(0.035, 0.035, 0.07)),
    parte(new THREE.SphereGeometry(0.03, 5, 4).translate(0, 0.012, 0.075)),
    parte(new THREE.ConeGeometry(0.01, 0.03, 3).translate(0.014, 0.04, 0.075)),
    parte(new THREE.ConeGeometry(0.01, 0.03, 3).translate(-0.014, 0.04, 0.075)),
    alaPipistrello(1),
    alaPipistrello(-1),
  ]);
}

function alaFarfalla(lato) {
  const p = (x, z) => [x * lato, 0, z];
  return lamina([
    p(0.004, 0.012), p(0.06, 0.03), p(0.065, -0.005),
    p(0.004, 0.012), p(0.065, -0.005), p(0.004, -0.004),
    p(0.004, -0.004), p(0.05, -0.012), p(0.035, -0.045),
    p(0.004, -0.004), p(0.035, -0.045), p(0.004, -0.02),
  ]);
}

function geometriaFarfalla() {
  return unisci([parte(new THREE.CylinderGeometry(0.005, 0.003, 0.05, 4).rotateX(Math.PI / 2)), alaFarfalla(1), alaFarfalla(-1)]);
}

function geometriaRana() {
  const zampa = (x, y, z, l, a, p) => parte(new THREE.BoxGeometry(l, a, p).translate(x, y, z));
  return unisci([
    parte(new THREE.SphereGeometry(1, 7, 5).scale(0.06, 0.038, 0.075).translate(0, 0.04, 0)),
    parte(new THREE.SphereGeometry(1, 6, 4).scale(0.045, 0.03, 0.04).translate(0, 0.05, 0.06)),
    parte(new THREE.SphereGeometry(0.014, 5, 4).translate(0.028, 0.076, 0.072)),
    parte(new THREE.SphereGeometry(0.014, 5, 4).translate(-0.028, 0.076, 0.072)),
    zampa(0.055, 0.016, -0.035, 0.03, 0.022, 0.08),
    zampa(-0.055, 0.016, -0.035, 0.03, 0.022, 0.08),
    zampa(0.04, 0.02, 0.05, 0.014, 0.04, 0.014),
    zampa(-0.04, 0.02, 0.05, 0.014, 0.04, 0.014),
  ]);
}

function texturaPunto() {
  const lato = 32;
  const dati = new Uint8Array(lato * lato * 4);
  for (let y = 0; y < lato; y++) for (let x = 0; x < lato; x++) {
    const d = lunghezza(x + 0.5 - lato / 2, y + 0.5 - lato / 2) / (lato / 2);
    const i = (y * lato + x) * 4;
    dati[i] = dati[i + 1] = dati[i + 2] = 255;
    dati[i + 3] = Math.round(255 * Math.max(0, 1 - d) ** 2);
  }
  const t = new THREE.DataTexture(dati, lato, lato);
  t.magFilter = t.minFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

function creaBranco(nome, geometria, materiale, numero, ali = false) {
  if (ali) geometria.setAttribute('battito', new THREE.InstancedBufferAttribute(new Float32Array(numero * 4), 4).setUsage(THREE.DynamicDrawUsage));
  const mesh = new THREE.InstancedMesh(geometria, materiale, numero);
  mesh.name = nome;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  for (let i = 0; i < numero; i++) mesh.setMatrixAt(i, NASCOSTO);
  return mesh;
}

function poni(mesh, i, x, y, z, imbardata, beccheggio, rollio, sx, sy = sx, sz = sx) {
  _euler.set(beccheggio, imbardata, rollio, 'YXZ');
  _rotazione.setFromEuler(_euler);
  _posizione.set(x, y, z);
  _scala.set(sx, sy, sz);
  mesh.setMatrixAt(i, _matrice.compose(_posizione, _rotazione, _scala));
}

function battito(mesh, i, frequenza, fase, ampiezza, piega) {
  const a = mesh.geometry.attributes.battito.array;
  a[i * 4] = frequenza;
  a[i * 4 + 1] = fase;
  a[i * 4 + 2] = ampiezza;
  a[i * 4 + 3] = piega;
}

function smussaBattito(mesh, i, ampiezza, piega, k) {
  const a = mesh.geometry.attributes.battito.array;
  a[i * 4 + 2] += (ampiezza - a[i * 4 + 2]) * k;
  a[i * 4 + 3] += (piega - a[i * 4 + 3]) * k;
}

function pubblica(mesh) {
  mesh.instanceMatrix.needsUpdate = true;
  const b = mesh.geometry.attributes.battito;
  if (b) b.needsUpdate = true;
}

function posatoiPalme(dati, scena) {
  const palme = dati.ostacoli.filter(o => o.tipo === 'palma').map(o => ({ x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2 }));
  const altezze = altezzePalme(scena, palme);
  return palme.map((p, i) => ({ x: p.x, y: altezze[i] - 0.2, z: p.z }));
}

function posatoiCorvi(dati, struttura) {
  const posatoi = [];
  for (const id of AREE_CORVI) {
    const z = zona(dati, id);
    if (!z?.aperto) continue;
    for (const o of dati.ostacoli) {
      const x = (o.x0 + o.x1) / 2;
      const q = (o.z0 + o.z1) / 2;
      if (!POSATOI_CORVI.has(o.tipo) || !dentroArea(z, x, q)) continue;
      const y = o.tipo === 'albero' ? ALTEZZA_ALBERO : o.tipo === 'lampione' ? o.altezza + SOPRA_LAMPIONE : o.altezza;
      posatoi.push({ x, y, z: q, raggio: 0.3 });
    }
    const terra = rientra(z, 1.5);
    for (let k = 0, tentativi = 0; k < 3 && tentativi < 60; tentativi++) {
      const x = tra(struttura, terra.x0, terra.x1);
      const q = tra(struttura, terra.z0, terra.z1);
      if (!libero(dati.solidi, x, q, 1.3, 0)) continue;
      posatoi.push({ x, y: 0, z: q, raggio: 0.9 });
      k++;
    }
  }
  return posatoi;
}

function creaUccelli(nome, posatoi, { stormi: numeroStormi, perStormo, colori, coda, scala, velocita }, tetto, caso) {
  if (posatoi.length <= numeroStormi) return null;
  const numero = numeroStormi * perStormo;
  const mesh = creaBranco(nome, geometriaUccello(coda), materialeAnimale({ ali: true, bagliore: 0.22 }), numero, true);
  const stormi = Array.from({ length: numeroStormi }, () => ({ stato: 'posato', posatoio: 0, x: 0, z: 0, attesa: 0, calma: 0, volo: 0, durata: 1, membri: [] }));
  const uccelli = Array.from({ length: numero }, (_, i) => {
    const u = { indice: i, stormo: stormi[Math.floor(i / perStormo)], posto: 0, raggio: 0, dy: 0, ritardo: 0, laterale: 0, fase: 0, gesto: 0, scuoti: 0, imbardata: 0, meta: 0, x: 0, y: 0, z: 0, px: 0, py: 0, pz: 0, arco: nuovoArco() };
    u.stormo.membri.push(u);
    return u;
  });

  const posa = (u, p) => {
    const r = u.raggio * (p.raggio ?? 1);
    u.px = p.x + Math.cos(u.posto) * r;
    u.py = p.y + (p.y > 0 ? u.dy : 0);
    u.pz = p.z + Math.sin(u.posto) * r;
  };
  const verso = u => Math.atan2(Math.cos(u.posto), Math.sin(u.posto));
  const occupato = (indice, stormo) => {
    for (let i = 0; i < stormi.length; i++) if (stormi[i] !== stormo && stormi[i].posatoio === indice) return true;
    return false;
  };

  function scegli(stormo, minacce, fuga) {
    let scelta = -1;
    let migliore = -Infinity;
    for (let i = 0; i < posatoi.length; i++) {
      if (i === stormo.posatoio || occupato(i, stormo)) continue;
      const p = posatoi[i];
      const distanza = lunghezza(p.x - stormo.x, p.z - stormo.z);
      const fuori = distanza < VOLO_MINIMO || distanza > VOLO_MASSIMO ? 100 : 0;
      const valore = (fuga ? lunghezza(p.x - minacce.vicinaX, p.z - minacce.vicinaZ) : 0) + caso() * 6 - fuori;
      if (valore <= migliore) continue;
      migliore = valore;
      scelta = i;
    }
    return scelta;
  }

  function decolla(stormo, minacce, fuga) {
    const scelta = scegli(stormo, minacce, fuga);
    if (scelta < 0) {
      stormo.attesa = tra(caso, 4, 9);
      return;
    }
    const p = posatoi[scelta];
    const distanza = lunghezza(p.x - stormo.x, p.z - stormo.z);
    stormo.posatoio = scelta;
    stormo.x = p.x;
    stormo.z = p.z;
    stormo.stato = fuga ? 'fuga' : 'volo';
    stormo.volo = 0;
    stormo.durata = Math.max(1.4, distanza / (fuga ? velocita * 1.5 : velocita));
    for (let k = 0; k < stormo.membri.length; k++) {
      const u = stormo.membri[k];
      posa(u, p);
      impostaArco(u.arco, u.x, u.y, u.z, u.px, u.py, u.pz, (fuga ? 6 : 3.5) + caso() * 2, u.laterale);
    }
  }

  function logicaStormo(stormo, minacce, dt) {
    if (stormo.stato === 'posato') {
      stormo.attesa -= dt;
      stormo.calma -= dt;
      if (minacciaVicina(minacce, stormo.x, stormo.z, RAGGIO_UCCELLI)) decolla(stormo, minacce, true);
      else if (stormo.attesa <= 0 && stormo.calma <= 0) decolla(stormo, minacce, false);
      return;
    }
    stormo.volo += dt;
    if (stormo.volo < stormo.durata + RITARDO_DECOLLO) return;
    stormo.calma = stormo.stato === 'fuga' ? CALMA_DOPO_FUGA : 0;
    stormo.stato = 'posato';
    stormo.attesa = tra(caso, 8, 22);
  }

  function posato(u, dt, k) {
    u.x = u.px;
    u.y = u.py;
    u.z = u.pz;
    u.gesto -= dt;
    u.scuoti -= dt;
    if (u.gesto <= 0) {
      u.gesto = tra(caso, 2, 7);
      if (caso() < 0.35) u.scuoti = 0.45;
      else u.meta = verso(u) + tra(caso, -0.8, 0.8);
    }
    u.imbardata = giraVerso(u.imbardata, u.meta, morbido(dt, 5));
    poni(mesh, u.indice, u.x, u.y, u.z, u.imbardata, 0, 0, scala);
    smussaBattito(mesh, u.indice, u.scuoti > 0 ? 0.4 : 0, PIEGA_POSATO, k);
  }

  function inVolo(u, k) {
    const stormo = u.stormo;
    const avanzamento = (stormo.volo - u.ritardo) / stormo.durata;
    const p = puntoArco(u.arco, liscia(limita(avanzamento, 0, 1)));
    const orizzontale = lunghezza(p.dx, p.dz);
    u.x = p.x;
    u.y = Math.max(p.y, tetto(p.x, p.z));
    u.z = p.z;
    if (orizzontale > 1e-4) u.imbardata = Math.atan2(p.dx, p.dz);
    u.meta = u.imbardata;
    const vola = avanzamento > 0 && avanzamento < 1;
    poni(mesh, u.indice, u.x, u.y, u.z, u.imbardata, vola ? -Math.atan2(p.dy, orizzontale) * 0.5 : 0, vola ? Math.sin(stormo.volo * 2 + u.fase) * 0.2 : 0, scala);
    smussaBattito(mesh, u.indice, vola ? AMPIEZZA_VOLO : 0, vola ? PIEGA_VOLO : PIEGA_POSATO, k);
  }

  function aggiorna(minacce, dt) {
    const k = morbido(dt, 8);
    for (let s = 0; s < stormi.length; s++) logicaStormo(stormi[s], minacce, dt);
    for (let i = 0; i < uccelli.length; i++) {
      if (uccelli[i].stormo.stato === 'posato') posato(uccelli[i], dt, k);
      else inVolo(uccelli[i], k);
    }
    pubblica(mesh);
  }

  function inizia() {
    stormi.forEach((stormo, s) => {
      stormo.stato = 'posato';
      stormo.posatoio = Math.floor((s * posatoi.length) / stormi.length);
      stormo.x = posatoi[stormo.posatoio].x;
      stormo.z = posatoi[stormo.posatoio].z;
      stormo.attesa = tra(caso, 5, 16);
      stormo.calma = 0;
      stormo.volo = 0;
    });
    uccelli.forEach((u, i) => {
      u.posto = ((i % perStormo) / perStormo) * DUE_PI + tra(caso, -0.3, 0.3);
      u.raggio = tra(caso, 0.5, 0.9);
      u.dy = tra(caso, -0.25, 0.1);
      u.ritardo = tra(caso, 0, RITARDO_DECOLLO);
      u.laterale = tra(caso, -1.5, 1.5);
      u.fase = tra(caso, 0, DUE_PI);
      u.gesto = tra(caso, 1, 6);
      u.scuoti = 0;
      posa(u, posatoi[u.stormo.posatoio]);
      u.x = u.px;
      u.y = u.py;
      u.z = u.pz;
      u.imbardata = u.meta = verso(u);
      const tinta = caso() < 0.75 ? colori[Math.floor(i / perStormo) % colori.length] : colori[Math.floor(caso() * colori.length)];
      mesh.setColorAt(i, _colore.setHex(tinta));
      battito(mesh, i, tra(caso, 15, 19), u.fase, 0, PIEGA_POSATO);
    });
    mesh.instanceColor.needsUpdate = true;
    aggiorna(NESSUNA_MINACCIA, 0);
  }

  return { nome, oggetti: [mesh], animali: stormi, inizia, aggiorna };
}

function rifugiPipistrelli(dati, elenco) {
  return elenco.map(r => {
    const z = zona(dati, r.zona);
    if (!z) return null;
    const area = rientra(z, z.interna ? 0.8 : 2);
    const basso = z.interna ? 1 : r.basso;
    const alto = z.interna ? dati.soffitto - SOTTO_SOFFITTO : r.alto;
    const solidi = dati.solidi.filter(s => s.altezza > basso && s.x1 > area.x0 && s.x0 < area.x1 && s.z1 > area.z0 && s.z0 < area.z1);
    return { area, basso, alto, appesi: z.interna, nido: dati.soffitto - 0.07, solidi, numero: r.numero };
  }).filter(Boolean);
}

function fuoriDaiSolidi(p, solidi, raggio) {
  for (let i = 0; i < solidi.length; i++) {
    const s = solidi[i];
    if (s.altezza <= p.y || !dentroScatola(p.x, p.z, s, raggio)) continue;
    const ovest = p.x - (s.x0 - raggio);
    const est = s.x1 + raggio - p.x;
    const sud = p.z - (s.z0 - raggio);
    const nord = s.z1 + raggio - p.z;
    const minimo = Math.min(ovest, est, sud, nord);
    if (minimo === ovest) p.x = s.x0 - raggio;
    else if (minimo === est) p.x = s.x1 + raggio;
    else if (minimo === sud) p.z = s.z0 - raggio;
    else p.z = s.z1 + raggio;
  }
}

function creaPipistrelli(dati, elenco, struttura, caso) {
  const rifugi = rifugiPipistrelli(dati, elenco);
  const pipistrelli = rifugi.flatMap(r => Array.from({ length: r.numero }, () => {
    for (let t = 0; t < 40; t++) {
      const x = tra(struttura, r.area.x0 + 0.7, r.area.x1 - 0.7);
      const z = tra(struttura, r.area.z0 + 0.7, r.area.z1 - 0.7);
      if (libero(r.solidi, x, z, 0.4, r.basso)) return { rifugio: r, nx: x, nz: z };
    }
    return { rifugio: r, nx: (r.area.x0 + r.area.x1) / 2, nz: (r.area.z0 + r.area.z1) / 2 };
  })).map((p, indice) => ({ ...p, indice, stato: 'appeso', x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, mx: 0, my: 0, mz: 0, paura: 0, timer: 0, cambio: 0, imbardata: 0, rollio: 0, fase: 0 }));
  if (!pipistrelli.length) return null;
  const mesh = creaBranco('pipistrelli', geometriaPipistrello(), materialeAnimale({ ali: true, colore: 0x3a2e28, bagliore: 0.12 }), pipistrelli.length, true);

  function nuovaMeta(p, minacce, lontano) {
    const r = p.rifugio;
    for (let t = 0; t < 6; t++) {
      const x = tra(caso, r.area.x0, r.area.x1);
      const z = tra(caso, r.area.z0, r.area.z1);
      const y = tra(caso, r.basso, r.alto);
      if (!libero(r.solidi, x, z, 0.4, y)) continue;
      if (lontano && lunghezza(x - minacce.vicinaX, z - minacce.vicinaZ) < 4) continue;
      p.mx = x;
      p.my = y;
      p.mz = z;
      break;
    }
    p.cambio = tra(caso, 1, 2.5);
  }

  function logica(p, minacce, dt) {
    const r = p.rifugio;
    if (p.stato === 'appeso') {
      if (!minacciaVicina(minacce, p.nx, p.nz, RAGGIO_PIPISTRELLI)) return;
      p.stato = 'fuga';
      p.paura = PAURA;
      p.timer = tra(caso, 5, 9);
      p.vy = -1.2;
      nuovaMeta(p, minacce, true);
      return;
    }
    if (minacciaVicina(minacce, p.x, p.z, r.appesi ? RAGGIO_PIPISTRELLI : RAGGIO_PIPISTRELLI_FUORI)) {
      if (p.paura <= 0) nuovaMeta(p, minacce, true);
      p.paura = PAURA;
      p.timer = Math.max(p.timer, 2);
    }
    p.paura -= dt;
    p.timer -= dt;
    p.cambio -= dt;
    if (p.paura > 0) p.stato = 'fuga';
    else if (p.stato === 'fuga') p.stato = 'volo';
    if (r.appesi && p.stato === 'volo' && p.timer <= 0 && !minacciaVicina(minacce, p.nx, p.nz, RAGGIO_PIPISTRELLI)) {
      p.stato = 'rientro';
      p.mx = p.nx;
      p.my = r.nido;
      p.mz = p.nz;
    }
    const dx = p.mx - p.x;
    const dy = p.my - p.y;
    const dz = p.mz - p.z;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (p.stato === 'rientro') {
      if (d < 0.3) {
        p.stato = 'appeso';
        p.vx = p.vy = p.vz = 0;
      }
      return;
    }
    if (p.cambio <= 0 || d < 0.7) nuovaMeta(p, minacce, p.stato === 'fuga');
  }

  function vola(p, dt) {
    const r = p.rifugio;
    if (p.stato === 'appeso') {
      p.x = p.nx;
      p.y = r.nido;
      p.z = p.nz;
      return;
    }
    const rientro = p.stato === 'rientro';
    const velocita = p.stato === 'fuga' ? 7 : rientro ? 3 : 4.5;
    const dx = p.mx - p.x;
    const dy = p.my - p.y;
    const dz = p.mz - p.z;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    const k = morbido(dt, rientro ? 6 : 3.5);
    const scossa = rientro ? 0 : 1;
    p.vx += ((dx / d) * velocita - p.vx) * k + (caso() - 0.5) * dt * 9 * scossa;
    p.vy += ((dy / d) * velocita - p.vy) * k + (caso() - 0.5) * dt * 4 * scossa;
    p.vz += ((dz / d) * velocita - p.vz) * k + (caso() - 0.5) * dt * 9 * scossa;
    p.x = limita(p.x + p.vx * dt, r.area.x0, r.area.x1);
    p.y = limita(p.y + p.vy * dt, r.basso, rientro ? r.nido : r.alto);
    p.z = limita(p.z + p.vz * dt, r.area.z0, r.area.z1);
    fuoriDaiSolidi(p, r.solidi, 0.3);
  }

  function disegna(p, tempo, dt, k) {
    if (p.stato === 'appeso') {
      p.rollio = avvicina(p.rollio, Math.PI, k);
      poni(mesh, p.indice, p.x, p.y, p.z, p.imbardata + Math.sin(tempo * 0.7 + p.fase) * 0.2, 0, p.rollio, SCALA_PIPISTRELLO);
      smussaBattito(mesh, p.indice, 0.05, PIEGA_APPESO, k);
      return;
    }
    const orizzontale = lunghezza(p.vx, p.vz);
    const nuova = orizzontale > 0.05 ? Math.atan2(p.vx, p.vz) : p.imbardata;
    const svolta = dt > 0 ? scarto(nuova - p.imbardata) / dt : 0;
    p.imbardata = nuova;
    p.rollio = avvicina(p.rollio, limita(-svolta * 0.12, -0.9, 0.9), k);
    poni(mesh, p.indice, p.x, p.y, p.z, p.imbardata, -Math.atan2(p.vy, orizzontale) * 0.6, p.rollio, SCALA_PIPISTRELLO);
    smussaBattito(mesh, p.indice, 1, PIEGA_VOLO, k);
  }

  function aggiorna(minacce, dt, tempo) {
    const k = morbido(dt, 8);
    for (let i = 0; i < pipistrelli.length; i++) {
      const p = pipistrelli[i];
      logica(p, minacce, dt);
      vola(p, dt);
      disegna(p, tempo, dt, k);
    }
    pubblica(mesh);
  }

  function inizia() {
    for (const p of pipistrelli) {
      const r = p.rifugio;
      p.stato = r.appesi ? 'appeso' : 'volo';
      p.x = p.mx = p.nx;
      p.z = p.mz = p.nz;
      p.y = p.my = r.appesi ? r.nido : (r.basso + r.alto) / 2;
      p.vx = p.vy = p.vz = 0;
      p.paura = p.timer = p.cambio = 0;
      p.imbardata = tra(caso, 0, DUE_PI);
      p.rollio = r.appesi ? Math.PI : 0;
      p.fase = tra(caso, 0, DUE_PI);
      battito(mesh, p.indice, tra(caso, 21, 26), p.fase, r.appesi ? 0.05 : 1, r.appesi ? PIEGA_APPESO : PIEGA_VOLO);
    }
    aggiorna(NESSUNA_MINACCIA, 0, 0);
  }

  return { nome: 'pipistrelli', oggetti: [mesh], animali: pipistrelli, inizia, aggiorna };
}

function areeLucciole(dati) {
  const aree = [];
  const aggiungi = (box, basso, alto, peso) => {
    if (box.x1 > box.x0 && box.z1 > box.z0) aree.push({ ...box, basso, alto, peso });
  };
  const campo = zona(dati, 'campo');
  const villaggio = zona(dati, 'villaggio');
  const sud = zona(dati, 'rivaSud');
  const nord = zona(dati, 'rivaNord');
  const ponte = zona(dati, 'ponte');
  const cascata = zona(dati, 'cascata');
  if (campo) aggiungi(rientra(campo, 1), 0.4, 2.2, 1);
  if (villaggio) aggiungi(rientra(villaggio, 1.5), 0.4, 2.4, 1.3);
  if (sud) aggiungi({ x0: sud.x0 + 1, z0: Math.max(sud.z0 + 1, sud.z1 - 5), x1: sud.x1 - 1, z1: sud.z1 - 0.6 }, 0.3, 2, 1.4);
  if (nord) aggiungi({ x0: nord.x0 + 1, z0: nord.z0 + 0.6, x1: nord.x1 - 1, z1: Math.min(nord.z1 - 1, nord.z0 + 4) }, 0.3, 2, 1.1);
  if (ponte) aggiungi({ x0: ponte.x0 - 10, z0: ponte.z0 + 0.4, x1: ponte.x1 + 10, z1: ponte.z1 - 0.4 }, QUOTA_FIUME + 0.25, 1.6, 0.9);
  if (cascata) aggiungi(rientra(cascata, 4), 0.3, 2.2, 0.6);
  return aree;
}

function creaLucciole(dati, struttura) {
  const aree = areeLucciole(dati);
  if (!aree.length) return null;
  const pesoTotale = aree.reduce((s, a) => s + a.peso, 0);
  const lucciole = [];
  for (const area of aree) {
    const quante = Math.round((NUMERO_LUCCIOLE * area.peso) / pesoTotale);
    for (let k = 0; k < quante; k++) lucciole.push({
      area, stato: 'calma', x: 0, y: 0, z: 0, sx: 0, sz: 0, buio: 0,
      ax: tra(struttura, area.x0, area.x1), ay: tra(struttura, area.basso, area.alto), az: tra(struttura, area.z0, area.z1),
      r: tra(struttura, 0.6, 1.2), f1: tra(struttura, 0.2, 0.5), f2: tra(struttura, 0.2, 0.5), f3: tra(struttura, 0.3, 0.8),
      p1: tra(struttura, 0, DUE_PI), p2: tra(struttura, 0, DUE_PI), p3: tra(struttura, 0, DUE_PI),
      lampo: tra(struttura, 1.2, 2.6), fase: tra(struttura, 0, DUE_PI),
    });
  }
  const geometria = new THREE.BufferGeometry();
  const posizioni = new THREE.BufferAttribute(new Float32Array(lucciole.length * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const colori = new THREE.BufferAttribute(new Float32Array(lucciole.length * 3), 3).setUsage(THREE.DynamicDrawUsage);
  geometria.setAttribute('position', posizioni);
  geometria.setAttribute('color', colori);
  const punti = new THREE.Points(geometria, new THREE.PointsMaterial({ size: 0.16, map: texturaPunto(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  punti.name = 'lucciole';
  punti.frustumCulled = false;

  function aggiorna(minacce, dt, tempo) {
    const calo = Math.exp(-dt * 0.35);
    for (let i = 0; i < lucciole.length; i++) {
      const l = lucciole[i];
      const a = l.area;
      if (minacciaVicina(minacce, l.x, l.z, RAGGIO_LUCCIOLE)) {
        const d = Math.max(minacce.distanza, 0.2);
        l.sx = limita(l.sx + ((l.x - minacce.vicinaX) / d) * dt * 2.5, -3, 3);
        l.sz = limita(l.sz + ((l.z - minacce.vicinaZ) / d) * dt * 2.5, -3, 3);
        l.buio = Math.min(1, l.buio + dt * 3);
        l.stato = 'fuga';
      } else {
        l.sx *= calo;
        l.sz *= calo;
        l.buio = Math.max(0, l.buio - dt * 0.5);
        l.stato = Math.abs(l.sx) + Math.abs(l.sz) > 0.3 ? 'rientro' : 'calma';
      }
      l.x = limita(l.ax + Math.sin(tempo * l.f1 + l.p1) * l.r + l.sx, a.x0, a.x1);
      l.y = limita(l.ay + Math.sin(tempo * l.f3 + l.p3) * 0.35, a.basso, a.alto);
      l.z = limita(l.az + Math.cos(tempo * l.f2 + l.p2) * l.r + l.sz, a.z0, a.z1);
      const onda = Math.sin(tempo * l.lampo + l.fase);
      const luce = (0.12 + 0.88 * (onda > 0 ? onda * onda * onda * onda : 0)) * (1 - 0.8 * l.buio);
      posizioni.setXYZ(i, l.x, l.y, l.z);
      colori.setXYZ(i, COLORE_LUCCIOLA[0] * luce, COLORE_LUCCIOLA[1] * luce, COLORE_LUCCIOLA[2] * luce);
    }
    posizioni.needsUpdate = true;
    colori.needsUpdate = true;
  }

  function inizia() {
    for (const l of lucciole) {
      l.sx = l.sz = l.buio = 0;
      l.stato = 'calma';
      l.x = l.ax;
      l.y = l.ay;
      l.z = l.az;
    }
    aggiorna(NESSUNA_MINACCIA, 0, 0);
  }

  return { nome: 'lucciole', oggetti: [punti], animali: lucciole, inizia, aggiorna };
}

function creaFarfalle(dati, struttura) {
  const farfalle = [];
  for (const [id, quante] of AREE_FARFALLE) {
    const z = zona(dati, id);
    if (!z) continue;
    const area = rientra(z, 1.5);
    for (let k = 0; k < quante; k++) farfalle.push({
      indice: farfalle.length, area, stato: 'volo', x: 0, y: 0, z: 0, ox: 0, oy: 0, oz: 0, paura: 0, imbardata: 0,
      cx: tra(struttura, area.x0 + 2, area.x1 - 2), cy: tra(struttura, 1, 1.8), cz: tra(struttura, area.z0 + 2, area.z1 - 2),
      r1: tra(struttura, 1.2, 2.4), r2: tra(struttura, 1.2, 2.4), a1: tra(struttura, 0.25, 0.5), a2: tra(struttura, 0.9, 1.6),
      b1: tra(struttura, 0.25, 0.5), b2: tra(struttura, 0.9, 1.6), p1: tra(struttura, 0, DUE_PI), p2: tra(struttura, 0, DUE_PI),
      q1: tra(struttura, 0, DUE_PI), q2: tra(struttura, 0, DUE_PI), frequenza: tra(struttura, 15, 19), fase: tra(struttura, 0, DUE_PI),
    });
  }
  if (!farfalle.length) return null;
  const mesh = creaBranco('farfalle', geometriaFarfalla(), materialeAnimale({ ali: true, colore: 0x2a62e0, emissivo: 0x1d4fff, luce: 0.9, bagliore: 0.25 }), farfalle.length, true);

  function aggiorna(minacce, dt, tempo) {
    const k = morbido(dt, 6);
    const calo = Math.exp(-dt * 0.3);
    for (let i = 0; i < farfalle.length; i++) {
      const f = farfalle[i];
      const a = f.area;
      if (minacciaVicina(minacce, f.x, f.z, RAGGIO_FARFALLE)) {
        const d = Math.max(minacce.distanza, 0.3);
        f.ox = limita(f.ox + ((f.x - minacce.vicinaX) / d) * dt * 2.6, -4, 4);
        f.oz = limita(f.oz + ((f.z - minacce.vicinaZ) / d) * dt * 2.6, -4, 4);
        f.oy = avvicina(f.oy, 1.3, morbido(dt, 2));
        f.paura = PAURA;
      }
      f.paura -= dt;
      f.stato = f.paura > 0 ? 'fuga' : 'volo';
      if (f.paura <= 0) {
        f.ox *= calo;
        f.oy *= calo;
        f.oz *= calo;
      }
      const x = limita(f.cx + Math.sin(tempo * f.a1 + f.p1) * f.r1 + Math.sin(tempo * f.a2 + f.p2) * 0.35 + f.ox, a.x0, a.x1);
      const z = limita(f.cz + Math.cos(tempo * f.b1 + f.q1) * f.r2 + Math.cos(tempo * f.b2 + f.q2) * 0.35 + f.oz, a.z0, a.z1);
      const y = limita(f.cy + Math.sin(tempo * 1.1 + f.q1) * 0.35 + Math.sin(tempo * f.frequenza + f.fase) * 0.03 + f.oy, 0.4, 3.2);
      const dx = x - f.x;
      const dz = z - f.z;
      if (dx * dx + dz * dz > 1e-8) f.imbardata = giraVerso(f.imbardata, Math.atan2(dx, dz), k);
      f.x = x;
      f.y = y;
      f.z = z;
      poni(mesh, i, x, y, z, f.imbardata, -0.25, Math.sin(tempo * 3 + f.fase) * 0.2, SCALA_FARFALLA);
    }
    pubblica(mesh);
  }

  function inizia() {
    for (const f of farfalle) {
      f.ox = f.oy = f.oz = f.paura = 0;
      f.stato = 'volo';
      f.x = f.cx;
      f.y = f.cy;
      f.z = f.cz;
      battito(mesh, f.indice, f.frequenza, f.fase, 1.1, 0.35);
    }
    aggiorna(NESSUNA_MINACCIA, 0, 0);
  }

  return { nome: 'farfalle', oggetti: [mesh], animali: farfalle, inizia, aggiorna };
}

function postiNinfee(ponte, struttura) {
  const posti = [];
  for (let tentativo = 0; posti.length < NUMERO_NINFEE && tentativo < 300; tentativo++) {
    const x = struttura() < 0.5 ? ponte.x0 - tra(struttura, 0.9, 10) : ponte.x1 + tra(struttura, 0.9, 10);
    const sud = struttura() < 0.5;
    const z = sud ? ponte.z0 + tra(struttura, 0.55, 1.5) : ponte.z1 - tra(struttura, 0.55, 1.5);
    if (posti.some(p => lunghezza(p.x - x, p.z - z) < 1.1)) continue;
    posti.push({ x, z, versoZ: sud ? 1 : -1, rotazione: tra(struttura, 0, DUE_PI), scala: tra(struttura, 0.85, 1.25) });
  }
  return posti;
}

function creaRane(dati, struttura, caso) {
  const ponte = zona(dati, 'ponte');
  if (!ponte) return null;
  const ninfee = postiNinfee(ponte, struttura);
  const quotaNinfea = QUOTA_FIUME + 0.02;
  const meshNinfee = creaBranco('ninfee', unisci([parte(new THREE.CircleGeometry(0.32, 9, 0.35, DUE_PI - 0.7).rotateX(-Math.PI / 2))]), materialeAnimale({ colore: 0x2e5a2c, bagliore: 0.12, doppio: true }), ninfee.length);
  ninfee.forEach((n, i) => poni(meshNinfee, i, n.x, quotaNinfea, n.z, n.rotazione, 0, 0, n.scala));
  meshNinfee.instanceMatrix.needsUpdate = true;
  const rane = ninfee.slice(0, NUMERO_RANE).map((casa, indice) => ({ indice, casa, stato: 'seduta', x: 0, y: 0, z: 0, wx: 0, wz: 0, t: 0, durata: 1, attesa: 0, gracida: 0, imbardata: 0, meta: 0, arco: nuovoArco() }));
  const mesh = creaBranco('rane', geometriaRana(), materialeAnimale({ bagliore: 0.16 }), rane.length);

  function salta(r, x, y, z, alzata, durata, stato) {
    impostaArco(r.arco, r.x, r.y, r.z, x, y, z, alzata, 0);
    r.t = 0;
    r.durata = durata;
    r.stato = stato;
  }

  function tuffati(r, minacce) {
    const ax = r.x - minacce.vicinaX;
    const az = r.z - minacce.vicinaZ;
    const d = lunghezza(ax, az) || 1;
    r.wx = r.x + (ax / d) * 0.6;
    r.wz = limita(r.z + r.casa.versoZ * 1.3 + (az / d) * 0.6, ponte.z0 + 0.4, ponte.z1 - 0.4);
    salta(r, r.wx, QUOTA_FIUME, r.wz, 0.6, 0.45, 'fuga');
  }

  function logica(r, minacce, dt) {
    if (r.stato === 'seduta') {
      if (minacciaVicina(minacce, r.x, r.z, RAGGIO_RANE)) {
        tuffati(r, minacce);
        return;
      }
      r.gracida -= dt;
      if (r.gracida < -0.6) r.gracida = tra(caso, 3, 9);
      r.attesa -= dt;
      if (r.attesa > 0) return;
      r.attesa = tra(caso, 6, 14);
      r.meta = tra(caso, 0, DUE_PI);
      return;
    }
    if (r.stato === 'sotto') {
      if (!minacciaVicina(minacce, r.casa.x, r.casa.z, RAGGIO_RANE + 1.5)) r.attesa -= dt;
      if (r.attesa > 0) return;
      r.stato = 'nuoto';
      r.t = 0;
      r.durata = 1.6;
      return;
    }
    r.t += dt / r.durata;
    if (r.t < 1) return;
    if (r.stato === 'fuga') {
      r.stato = 'sotto';
      r.attesa = tra(caso, 4, 8);
    } else if (r.stato === 'nuoto') {
      r.x = r.casa.x;
      r.y = QUOTA_FIUME - 0.02;
      r.z = r.casa.z + r.casa.versoZ * 0.4;
      salta(r, r.casa.x, quotaNinfea, r.casa.z, 0.4, 0.4, 'ritorno');
    } else {
      r.stato = 'seduta';
      r.attesa = tra(caso, 6, 14);
    }
  }

  function disegna(r, k) {
    if (r.stato === 'sotto') {
      mesh.setMatrixAt(r.indice, NASCOSTO);
      return;
    }
    if (r.stato === 'seduta') {
      r.x = r.casa.x;
      r.y = quotaNinfea;
      r.z = r.casa.z;
      r.imbardata = giraVerso(r.imbardata, r.meta, k);
      const gonfia = r.gracida < 0 ? Math.abs(Math.sin((-r.gracida / 0.6) * Math.PI * 3)) * 0.14 : 0;
      poni(mesh, r.indice, r.x, r.y, r.z, r.imbardata, 0, 0, SCALA_RANA, SCALA_RANA * (1 + gonfia), SCALA_RANA);
      return;
    }
    if (r.stato === 'nuoto') {
      const s = limita(r.t, 0, 1);
      const bz = r.casa.z + r.casa.versoZ * 0.4;
      r.x = r.wx + (r.casa.x - r.wx) * s;
      r.y = QUOTA_FIUME - 0.02;
      r.z = r.wz + (bz - r.wz) * s;
      r.imbardata = Math.atan2(r.casa.x - r.wx, bz - r.wz);
      poni(mesh, r.indice, r.x, r.y, r.z, r.imbardata, 0, 0, SCALA_RANA);
      return;
    }
    const p = puntoArco(r.arco, limita(r.t, 0, 1));
    const orizzontale = lunghezza(p.dx, p.dz);
    r.x = p.x;
    r.y = p.y;
    r.z = p.z;
    if (orizzontale > 1e-4) r.imbardata = r.meta = Math.atan2(p.dx, p.dz);
    poni(mesh, r.indice, p.x, p.y, p.z, r.imbardata, -Math.atan2(p.dy, orizzontale) * 0.7, 0, SCALA_RANA, SCALA_RANA * 0.9, SCALA_RANA * 1.25);
  }

  function aggiorna(minacce, dt) {
    const k = morbido(dt, 4);
    for (let i = 0; i < rane.length; i++) {
      logica(rane[i], minacce, dt);
      disegna(rane[i], k);
    }
    pubblica(mesh);
  }

  function inizia() {
    for (const r of rane) {
      r.stato = 'seduta';
      r.x = r.casa.x;
      r.y = quotaNinfea;
      r.z = r.casa.z;
      r.imbardata = r.meta = tra(caso, 0, DUE_PI);
      r.attesa = tra(caso, 3, 12);
      r.gracida = tra(caso, 1, 8);
      mesh.setColorAt(r.indice, _colore.setHex(COLORI_RANE[r.indice % COLORI_RANE.length]));
    }
    mesh.instanceColor.needsUpdate = true;
    aggiorna(NESSUNA_MINACCIA, 0);
  }

  return { nome: 'rane', oggetti: [meshNinfee, mesh], animali: rane, inizia, aggiorna };
}

function gruppiGiungla(dati, scena, struttura, caso) {
  const tetto = creaTetti(dati);
  return [
    creaUccelli('pappagalli', posatoiPalme(dati, scena), { stormi: 3, perStormo: 5, colori: COLORI_PAPPAGALLI, coda: 0.26, scala: 1, velocita: 6 }, tetto, caso),
    creaPipistrelli(dati, RIFUGI_GIUNGLA, struttura, caso),
    creaLucciole(dati, struttura),
    creaFarfalle(dati, struttura),
    creaRane(dati, struttura, caso),
  ];
}

function gruppiScuola(dati, scena, struttura, caso) {
  return [
    creaUccelli('corvi', posatoiCorvi(dati, struttura), { stormi: 2, perStormo: 4, colori: COLORI_CORVI, coda: 0.12, scala: 0.85, velocita: 5 }, creaTetti(dati), caso),
    creaPipistrelli(dati, RIFUGI_SCUOLA, struttura, caso),
  ];
}

export function costruisciAnimali(scena, mappa) {
  const dati = datiMappa(mappa);
  const struttura = generatore(SEME);
  const caso = generatore(SEME + 1);
  const gruppi = (dati.id === 'giungla' ? gruppiGiungla : gruppiScuola)(dati, scena, struttura, caso).filter(Boolean);
  for (const g of gruppi) for (const o of g.oggetti) scena.add(o);
  const minacce = creaMinacce();
  let orologio = 0;

  function aggiorna(vista, dt, tempo, camera) {
    const passo = dt > 0 ? Math.min(dt, PASSO_MASSIMO) : 0;
    orologio += passo;
    tempoAnimali.value = Number.isFinite(tempo) ? tempo : orologio;
    raccogliMinacce(minacce, vista, camera);
    for (let i = 0; i < gruppi.length; i++) gruppi[i].aggiorna(minacce, passo, tempoAnimali.value);
  }

  function svuota() {
    caso.riavvia();
    orologio = 0;
    for (let i = 0; i < gruppi.length; i++) gruppi[i].inizia();
  }

  svuota();
  return { dati, gruppi: Object.fromEntries(gruppi.map(g => [g.nome, g])), aggiorna, svuota };
}

export function creaAnimali(scena, mappa) {
  const { aggiorna, svuota } = costruisciAnimali(scena, mappa);
  return { aggiorna, svuota };
}
