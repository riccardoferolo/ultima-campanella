import * as THREE from 'three';
import { mergeVertices, mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { conCaustiche } from './kit.js';
import { ALPHA, DELTA, FINESTRE, BOCCAPORTI_DELTA, fondale } from '../../mappe/abisso.js';
import { SU, v3, casuale, matrice, orienta, base, geometria, rovescia, telaio, spazza, rettangolo, pareteConBuchi, griglia, quad, rivetti, tubo, affusolato, cono, materialeConi, fuso } from './cupola3d.js';

const VICINO = Object.freeze({ x0: -45, x1: 95, z0: -92, z1: 40, passo: 1 });
const LONTANO = Object.freeze({ x0: -113, x1: 171, z0: -152, z1: 112, passo: 4 });
const SCALA_SABBIA = 0.2;
const R_ALPHA_FUORI = ALPHA.raggio + 0.25;
const SCAFO = Object.freeze({ x0: 23.65, x1: 52.85, z: 14.35, muro: 9.5, raggio: 2.8, annesso: 4.6, fondo: -1, sopraAnnesso: 4.4 });
const ANNESSO = Object.freeze([[52.85, -3.35], [58.85, -3.35], [58.85, 3.35], [57.15, 3.35], [57.15, 16.95], [43.85, 16.95], [43.85, 14.35], [52.85, 14.35]]);
const TELAI_SCAFO = Object.freeze([25.2, 27.6, 33.0, 35.4, 37.8, 40.2, 42.6, 47.6, 50.0]);
const FINESTRE_SCAFO = Object.freeze([[28.8, 31.2], [43.8, 46.2]]);
const PILONI_DELTA = Object.freeze([-1.95, -1.15, -0.3, 1.05, 2.65]);
const R_PILONI = 28.5;
const ORBITA_LIBERA = Object.freeze([29.5, 39.5]);
const CAMINI = Object.freeze([[13, 21, 9], [16.5, 23.5, 6], [10.5, 24.5, 4.5], [-22, 24, 10], [-25.5, 21, 6.5], [-19, 27.5, 5], [12, -15, 5.5], [91, -56, 8], [60, -86, 7]]);
const GUGLIE = Object.freeze([[-34, 27, 18], [-43, -15, 22], [31, 37, 16], [-14, 41, 20], [92, -28, 24], [72, -86, 20], [26, -84, 18], [-42, 9, 12]]);
const FASCI = Object.freeze([[-42, -38], [-48, 30], [34, 48], [98, -10], [62, -98], [-8, 52]]);
const RELITTO = Object.freeze({ x: -36, z: -7, ry: 0.55 });
const LEVIATANO = Object.freeze({ lungo: 70, velocita: 9, passaggio: 2.25, vicino: 54, proxy: 36 });
const QUANTI = Object.freeze({ ramificati: 70, cervelli: 90, spugne: 90, alghe: 320, massi: 45, sassi: 110, neve: 1600, fumo: 80, bolle: 26 });
const TINTE_CORALLO = Object.freeze([0x2fd0ff, 0x8a4dff, 0xff3fb8, 0x35ffd0, 0xff7a3a]);
const AMBRA = 0xffb060;
const OCCHI = 0xffe6a0;
const OCCHI_ALLARME = 0xff3a6a;

const rettDist = (x, z, x0, z0, x1, z1) => Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(z0 - z, 0, z - z1));

function distanzaStrutture(x, z) {
  return Math.min(
    Math.hypot(x - ALPHA.x, z - ALPHA.z) - R_ALPHA_FUORI,
    Math.hypot(x - DELTA.x, z - DELTA.z) - DELTA.raggio - 0.4,
    rettDist(x, z, 13, -2.4, 24, 2.4),
    rettDist(x, z, 23.65, -14.35, 59, 17),
    rettDist(x, z, -2, -26, 2, -13),
    rettDist(x, z, -27.5, -63, 27.5, -21),
    rettDist(x, z, 21, -48, 28.5, -40),
  );
}

const CORRIDOI = FINESTRE.filter(f => !f.tana).map(f => {
  const dx = f.comparsa.x - f.centro.x;
  const dz = f.comparsa.z - f.centro.z;
  const l = Math.hypot(dx, dz);
  return { x0: f.centro.x, z0: f.centro.z, dx: dx / l, dz: dz / l, l: l + 1.5 };
});

function nelCorridoio(x, z, largo = 2.4) {
  return CORRIDOI.some(c => {
    const t = THREE.MathUtils.clamp((x - c.x0) * c.dx + (z - c.z0) * c.dz, 0, c.l);
    return Math.hypot(x - c.x0 - c.dx * t, z - c.z0 - c.dz * t) < largo;
  });
}

function nellOrbita(x, z) {
  const r = Math.hypot(x - DELTA.x, z - DELTA.z);
  return r > ORBITA_LIBERA[0] && r < ORBITA_LIBERA[1];
}

function cerchio(cx, cz, r) {
  return {
    dentro: (x, z) => Math.hypot(x - cx, z - cz) < r,
    bordo: (x, z) => {
      const d = Math.hypot(x - cx, z - cz) || 1;
      return [cx + ((x - cx) / d) * r, cz + ((z - cz) / d) * r];
    },
  };
}

function rett(x0, z0, x1, z1) {
  return {
    dentro: (x, z) => x > x0 && x < x1 && z > z0 && z < z1,
    bordo: (x, z) => {
      const d = [x - x0, x1 - x, z - z0, z1 - z];
      const k = d.indexOf(Math.min(...d));
      return k === 0 ? [x0, z] : k === 1 ? [x1, z] : k === 2 ? [x, z0] : [x, z1];
    },
  };
}

const BUCHI_TERRENO = Object.freeze([
  cerchio(ALPHA.x, ALPHA.z, ALPHA.raggio),
  rett(12.8, -1.88, 23.75, 1.88),
  rett(-1.83, -26.2, 1.83, -12.9),
  rett(23.75, -14.25, 52.75, 14.25),
  rett(52.75, -3.25, 58.75, 3.25),
  rett(52.75, 3.25, 57.05, 16.85),
  rett(43.95, 14.25, 57.05, 16.85),
  rett(-22.7, -60.7, 22.7, -25.3),
  rett(21.8, -45.9, 28.4, -42.1),
  cerchio(DELTA.x, DELTA.z, DELTA.raggio + 0.1),
  rett(119.6, -5.4, 134.4, 5.4),
]);

function materialeTerreno(kit) {
  const sabbia = kit.tex.fondale ?? {};
  const roccia = kit.tex.roccia ?? {};
  const m = new THREE.MeshStandardMaterial({ map: sabbia.map ?? null, normalMap: sabbia.normalMap ?? null, roughnessMap: sabbia.roughnessMap ?? null, roughness: 1, metalness: 0, normalScale: new THREE.Vector2(1.2, 1.2) });
  const uniformi = { uRoccia: { value: roccia.map ?? null }, uRocciaN: { value: roccia.normalMap ?? sabbia.normalMap ?? null } };
  m.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniformi);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosT;\nvarying vec3 vNorT;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvPosT = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvNorT = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D uRoccia;\nuniform sampler2D uRocciaN;\nvarying vec3 vPosT;\nvarying vec3 vNorT;')
      .replace('#include <map_fragment>', `
        vec3 nT = normalize(vNorT);
        float pendio = smoothstep(0.88, 0.62, nT.y);
        vec3 pesi = pow(abs(nT), vec3(4.0));
        pesi /= (pesi.x + pesi.y + pesi.z);
        vec2 uvRx = vPosT.zy * 0.11;
        vec2 uvRy = vPosT.xz * 0.11;
        vec2 uvRz = vPosT.xy * 0.11;
        #ifdef USE_MAP
          vec4 sab = texture2D(map, vMapUv);
          vec4 sab2 = texture2D(map, vMapUv * 0.27 + vec2(0.37, 0.11));
          sab.rgb = mix(sab.rgb, sab2.rgb, 0.4);
          vec4 roc = texture2D(uRoccia, uvRx) * pesi.x + texture2D(uRoccia, uvRy) * pesi.y + texture2D(uRoccia, uvRz) * pesi.z;
          vec4 tinta = mix(sab, roc * vec4(0.85, 0.9, 1.0, 1.0), pendio);
          tinta.rgb *= mix(0.16, 1.0, smoothstep(-22.0, -1.5, vPosT.y));
          diffuseColor *= tinta;
        #endif`)
      .replace('vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;', 'vec3 mapN = mix(texture2D( normalMap, vNormalMapUv ).xyz, texture2D(uRocciaN, uvRx).xyz * pesi.x + texture2D(uRocciaN, uvRy).xyz * pesi.y + texture2D(uRocciaN, uvRz).xyz * pesi.z, pendio) * 2.0 - 1.0;');
  };
  m.customProgramCacheKey = () => 'terrenoAbisso';
  return conCaustiche(m, kit.uniformi, { chiave: 'terrenoAbisso', scala: 0.3 });
}

function materialeRocciaFredda(kit) {
  const set = kit.tex.roccia ?? {};
  const copia = t => {
    if (!t) return null;
    const c = t.clone();
    c.repeat.set(0.3, 0.3);
    c.needsUpdate = true;
    return c;
  };
  const m = new THREE.MeshStandardMaterial({ map: copia(set.map), normalMap: copia(set.normalMap), roughnessMap: copia(set.roughnessMap), color: 0x9aa8b2, roughness: 1, normalScale: new THREE.Vector2(1.4, 1.4) });
  return conCaustiche(m, kit.uniformi, { chiave: 'rocciaFredda' });
}

function fondoNebbia(kit) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(48, 24, 12), new THREE.MeshBasicMaterial({ color: 0x03141c, side: THREE.BackSide, fog: false, depthWrite: false, depthTest: false }));
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  kit.scena.add(mesh);
  return mesh;
}

function terreno(c) {
  const pos = [];
  const nor = [];
  const uv = [];
  const normale = (x, z) => v3(fondale(x - 0.5, z) - fondale(x + 0.5, z), 1, fondale(x, z - 0.5) - fondale(x, z + 0.5)).normalize();
  const vertice = (x, z, h = null) => {
    const b = BUCHI_TERRENO.find(f => f.dentro(x, z));
    const [px, pz] = b ? b.bordo(x, z) : [x, z];
    return { x: px, z: pz, y: b || h === null ? fondale(px, pz) : h, dentro: !!b };
  };
  const scrivi = (...vs) => {
    if (vs.every(q => q.dentro)) return;
    for (const q of vs) {
      const n = normale(q.x, q.z);
      pos.push(q.x, q.y, q.z);
      nor.push(n.x, n.y, n.z);
      uv.push(q.x * SCALA_SABBIA, q.z * SCALA_SABBIA);
    }
  };
  const L = LONTANO.passo;
  const suLontano = (x, z) => {
    if (x === VICINO.x0 || x === VICINO.x1) {
      const k = LONTANO.z0 + Math.floor((z - LONTANO.z0) / L) * L;
      return THREE.MathUtils.lerp(fondale(x, k), fondale(x, k + L), (z - k) / L);
    }
    const k = LONTANO.x0 + Math.floor((x - LONTANO.x0) / L) * L;
    return THREE.MathUtils.lerp(fondale(k, z), fondale(k + L, z), (x - k) / L);
  };
  const reticolo = (r, saltaCella, bordo) => {
    const nx = Math.round((r.x1 - r.x0) / r.passo);
    const nz = Math.round((r.z1 - r.z0) / r.passo);
    const v = [];
    for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
      const x = r.x0 + i * r.passo;
      const z = r.z0 + j * r.passo;
      v.push(vertice(x, z, bordo && (i === 0 || j === 0 || i === nx || j === nz) ? suLontano(x, z) : null));
    }
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      if (saltaCella?.(r.x0 + i * r.passo, r.z0 + j * r.passo)) continue;
      const a = v[j * (nx + 1) + i];
      const b = v[j * (nx + 1) + i + 1];
      const d = v[(j + 1) * (nx + 1) + i];
      const e = v[(j + 1) * (nx + 1) + i + 1];
      scrivi(a, d, b);
      scrivi(b, d, e);
    }
  };
  reticolo(VICINO, null, true);
  reticolo(LONTANO, (x, z) => x >= VICINO.x0 && x + L <= VICINO.x1 && z >= VICINO.z0 && z + L <= VICINO.z1, false);
  c.metti(c.m.terreno, geometria(pos, nor, uv), { uv: false });
}

function sezioneTetto() {
  const { z: Z, muro, raggio } = SCAFO;
  const punti = [];
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI - (i / 8) * (Math.PI / 2);
    punti.push([-Z + raggio + Math.cos(a) * raggio, muro + Math.sin(a) * raggio]);
  }
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI / 2 - (i / 8) * (Math.PI / 2);
    punti.push([Z - raggio + Math.cos(a) * raggio, muro + Math.sin(a) * raggio]);
  }
  const cumulo = [0];
  for (let i = 1; i < punti.length; i++) cumulo.push(cumulo[i - 1] + Math.hypot(punti[i][0] - punti[i - 1][0], punti[i][1] - punti[i - 1][1]));
  const lungo = cumulo[cumulo.length - 1];
  const a = s => {
    let i = 1;
    while (i < cumulo.length - 1 && cumulo[i] < s) i++;
    const t = (s - cumulo[i - 1]) / (cumulo[i] - cumulo[i - 1] || 1);
    return [THREE.MathUtils.lerp(punti[i - 1][0], punti[i][0], t), THREE.MathUtils.lerp(punti[i - 1][1], punti[i][1], t)];
  };
  return { punti, lungo, a };
}

function scafoReattore(c) {
  const { m } = c;
  const { x0, x1, z: Z, muro, fondo, sopraAnnesso, annesso } = SCAFO;
  const tetto = sezioneTetto();
  c.metti(m.lamiera, griglia((x, s) => {
    const [z, y] = tetto.a(s);
    return v3(x, y, z);
  }, x0, x1, 0, tetto.lungo, 14, 36, () => SU));
  const parete = (a, b, y0, y1, fuori, buchi = []) => {
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l = Math.hypot(dx, dz);
    c.metti(m.lamiera, pareteConBuchi({ punto: (s, y) => v3(a[0] + (dx * s) / l, y, a[1] + (dz * s) / l), normale: () => fuori, s0: 0, s1: l, y0, y1, buchi, passo: 2.4 }), { uv: false });
  };
  const buco = (da, a, y1 = 2.65) => ({ s0: da, s1: a, y0: 0, y1 });
  parete([x0, -Z], [x1, -Z], fondo, muro, v3(0, 0, -1), FINESTRE_SCAFO.map(([a, b]) => buco(a - x0, b - x0)));
  parete([x0, Z], [43.85, Z], fondo, muro, v3(0, 0, 1), [buco(28.8 - x0, 31.2 - x0)]);
  parete([43.85, Z], [x1, Z], sopraAnnesso, muro, v3(0, 0, 1));
  parete([x0, -Z], [x0, Z], fondo, muro, v3(-1, 0, 0), [{ s0: Z - 2.35, s1: Z + 2.35, y0: fondo - 0.1, y1: 3.35 }]);
  parete([x1, -Z], [x1, -3.35], fondo, muro, v3(1, 0, 0));
  parete([x1, -3.35], [x1, Z], sopraAnnesso, muro, v3(1, 0, 0));
  for (const [x, verso] of [[x0, -1], [x1, 1]]) {
    for (let i = 0; i < tetto.punti.length - 1; i++) {
      const [za, ya] = tetto.punti[i];
      const [zb, yb] = tetto.punti[i + 1];
      if (Math.abs(ya - muro) < 1e-4 && Math.abs(yb - muro) < 1e-4) continue;
      c.metti(m.lamiera, quad(v3(x, muro, za), v3(x, muro, zb), v3(x, yb, zb), v3(x, ya, za), v3(verso, 0, 0)));
    }
  }
  for (const [a, b] of [[28.8, 31.2], [43.8, 46.2]]) rivela(c, a, b, -Z, -14.2);
  rivela(c, 28.8, 31.2, Z, 14.2);
  rivela(c, 48.8, 51.2, 16.95, 16.8);

  const facce = [[0, v3(0, 0, -1)], [1, v3(1, 0, 0), [{ s0: 1.9, s1: 4.8, y0: 0, y1: 2.9 }]], [2, v3(0, 0, 1)], [3, v3(1, 0, 0)], [4, v3(0, 0, 1), [buco(57.15 - 51.2, 57.15 - 48.8)]], [5, v3(-1, 0, 0)]];
  for (const [i, fuori, buchi] of facce) parete(ANNESSO[i], ANNESSO[i + 1], fondo, annesso, fuori, buchi ?? []);
  const forma = new THREE.Shape(ANNESSO.map(([x, z]) => new THREE.Vector2(x, -z)));
  c.metti(m.lamieraScura, new THREE.ShapeGeometry(forma).rotateX(-Math.PI / 2).translate(0, annesso, 0));
  for (let i = 0; i < 6; i++) {
    const [ax, az] = ANNESSO[i];
    const [bx, bz] = ANNESSO[i + 1];
    const l = Math.hypot(bx - ax, bz - az);
    c.metti(m.acciaio, new THREE.BoxGeometry(l + 0.3, 0.3, 0.3), { matrice: matrice((ax + bx) / 2, annesso, (az + bz) / 2, -Math.atan2(bz - az, bx - ax)) });
  }
  const piastra = new THREE.Shape([new THREE.Vector2(-1.45, -1.45), new THREE.Vector2(1.45, -1.45), new THREE.Vector2(1.45, 1.45), new THREE.Vector2(-1.45, 1.45)]);
  piastra.holes.push(new THREE.Path().absarc(0, 0, 1.45, 0, Math.PI * 2, true));
  c.metti(m.lamiera, new THREE.ShapeGeometry(piastra, 32), { matrice: base(v3(0, 0, -1), SU, v3(1, 0, 0), v3(58.85, 1.45, 0)) });
  c.metti(m.lamieraScura, rovescia(new THREE.CylinderGeometry(1.45, 1.45, 0.2, 40, 1, true)), { matrice: orienta(v3(58.77, 1.45, 0), v3(1, 0, 0)) });
  c.metti(m.ottone, new THREE.TorusGeometry(1.52, 0.08, 8, 48), { matrice: orienta(v3(58.9, 1.45, 0), v3(1, 0, 0), 1, v3(0, 0, 1)) });

  const lista = [];
  const percorso = [[-Z, sopraAnnesso + 0.2], [-Z, sopraAnnesso + 2], ...tetto.punti, [Z, sopraAnnesso + 2], [Z, sopraAnnesso + 0.2]].filter((p, i, arr) => i === 0 || Math.hypot(p[0] - arr[i - 1][0], p[1] - arr[i - 1][1]) > 1e-3);
  for (const x of TELAI_SCAFO) {
    const telai = percorso.map(([z, y], i) => {
      const [zp, yp] = percorso[Math.max(0, i - 1)];
      const [zn, yn] = percorso[Math.min(percorso.length - 1, i + 1)];
      const t = v3(0, yn - yp, zn - zp).normalize();
      let n = v3(0, -t.z, t.y);
      if (n.dot(v3(0, y - (muro - 4), z)) < 0) n = n.negate();
      return telaio(v3(x, y, z), t, n);
    });
    c.metti(m.lamieraScura, spazza(rettangolo(0, 0.26, -0.16, 0.16), telai));
    telai.forEach(f => { for (const s of [-0.1, 0.1]) lista.push({ p: f.p.clone().addScaledVector(f.u, 0.26).addScaledVector(f.v, s), n: f.u.clone() }); });
    for (const lato of [-1, 1]) {
      const libero = !FINESTRE_SCAFO.concat(lato > 0 ? [[43.85, 60]] : []).some(([a, b]) => x > a - 1.3 && x < b + 1.3) && !(lato > 0 && x > 28 && x < 32);
      if (!libero) continue;
      c.metti(m.lamieraScura, new THREE.BoxGeometry(0.3, sopraAnnesso + 1.2, 0.22), { matrice: matrice(x, (sopraAnnesso + 0.2 + fondo) / 2, lato * (Z + 0.11)) });
    }
  }
  c.chioda(m.acciaio, lista);
  const mezzi = TELAI_SCAFO.slice(0, -1).map((x, i) => (x + TELAI_SCAFO[i + 1]) / 2);
  for (const x of mezzi) for (const lato of [-1, 1]) {
    c.metti(m.obloScafo, new THREE.CircleGeometry(0.32, 20), { matrice: base(v3(-lato, 0, 0), SU, v3(0, 0, lato), v3(x, 6.3, lato * (Z + 0.01))) });
    c.metti(m.ottone, new THREE.TorusGeometry(0.37, 0.055, 8, 24), { matrice: base(v3(-lato, 0, 0), SU, v3(0, 0, lato), v3(x, 6.3, lato * (Z + 0.02))) });
  }
  for (const x of [27, 34, 41, 48]) for (const lato of [-1, 1]) {
    const p = v3(x, muro + 0.3, lato * (Z + 0.2));
    c.metti(m.lamieraScura, new THREE.BoxGeometry(0.55, 0.32, 0.38), { matrice: matrice(p.x, p.y, p.z) });
    c.metti(m.luceCalda, new THREE.BoxGeometry(0.45, 0.22, 0.02), { matrice: matrice(p.x, p.y - 0.02, p.z + lato * 0.2, 0, lato * 0.5) });
    c.metti(m.coniFuori, cono(v3(p.x, p.y - 0.1, p.z + lato * 0.22), v3(0, -0.6, lato * 0.8), 10, 3.6, new THREE.Color(AMBRA).multiplyScalar(0.07)), { uv: false });
  }
  const cima = muro + SCAFO.raggio;
  for (const [x, z] of [[31, -4], [45.5, 5]]) {
    c.metti(m.lamieraScura, new THREE.CylinderGeometry(0.55, 0.6, 1.6, 20), { matrice: matrice(x, cima + 0.8, z) });
    c.metti(m.acciaio, new THREE.CylinderGeometry(0.8, 0.7, 0.25, 20), { matrice: matrice(x, cima + 1.7, z) });
  }
  c.metti(m.acciaio, new THREE.CylinderGeometry(0.06, 0.1, 6, 8), { matrice: matrice(38, cima + 3, 0) });
  c.metti(m.luceRossa, new THREE.SphereGeometry(0.16, 12, 8), { matrice: matrice(38, cima + 6.1, 0) });
}

function rivela(c, a, b, zFuori, zMuro) {
  const verso = Math.sign(zFuori);
  for (const [x, n] of [[a, 1], [b, -1]]) c.metti(c.m.lamieraScura, quad(v3(x, 0, zMuro), v3(x, 0, zFuori), v3(x, 2.65, zFuori), v3(x, 2.65, zMuro), v3(n, 0, 0)));
  c.metti(c.m.lamieraScura, quad(v3(a, 2.65, zMuro), v3(b, 2.65, zMuro), v3(b, 2.65, zFuori), v3(a, 2.65, zFuori), v3(0, -1, 0)));
  c.metti(c.m.lamieraScura, quad(v3(a, 0.01, zMuro), v3(b, 0.01, zMuro), v3(b, 0.01, zFuori + verso * 0.3), v3(a, 0.01, zFuori + verso * 0.3), SU));
}

function esternoAlpha(c) {
  const { m, kit } = c;
  const r0 = R_ALPHA_FUORI;
  const r1 = r0 + 1.5;
  for (const [a0, a1] of [[0.2, Math.PI * 1.5 - 0.2], [-Math.PI / 2 + 0.2, -0.2]]) {
    c.metti(m.pietra, griglia((a, r) => {
      const f = (r - r0) / (r1 - r0);
      const y = 0.14 - 0.36 * f * f + 0.04 * kit.rumore.fbm(Math.cos(a) * r * 0.8, 0, Math.sin(a) * r * 0.8, 2);
      return v3(Math.cos(a) * r, y, Math.sin(a) * r);
    }, a0, a1, r0 - 0.05, r1, Math.ceil((a1 - a0) * 40), 3, () => SU));
  }
  const lista = [];
  for (let i = 0; i < 8; i++) {
    const a = ((2 * i + 1) * Math.PI) / 8;
    const rad = v3(Math.cos(a), 0, Math.sin(a));
    const ancora = rad.clone().multiplyScalar(17.5);
    ancora.y = fondale(ancora.x, ancora.z) + 0.1;
    const attacco = rad.clone().multiplyScalar(r0 + 0.2).setY(2.6);
    const mezzo = attacco.clone().lerp(ancora, 0.5).add(v3(0, -0.25, 0));
    c.metti(m.acciaio, tubo(new THREE.CatmullRomCurve3([attacco, mezzo, ancora]), 0.045, { radiali: 6, perMetro: 2 }), { uv: false });
    c.metti(m.lamieraScura, new THREE.BoxGeometry(0.9, 0.55, 0.9), { matrice: matrice(ancora.x, ancora.y - 0.05, ancora.z, -a) });
    c.metti(m.acciaio, new THREE.TorusGeometry(0.14, 0.035, 6, 14), { matrice: matrice(ancora.x, ancora.y + 0.3, ancora.z, -a + Math.PI / 2) });
    lista.push(...[-0.3, 0.3].flatMap(s => [-0.3, 0.3].map(t => ({ p: v3(ancora.x + s, ancora.y + 0.225, ancora.z + t), n: SU }))));
    const faro = rad.clone().multiplyScalar(r0 + 0.35).setY(2.95);
    const dir = rad.clone().multiplyScalar(0.75).add(v3(0, -0.66, 0)).normalize();
    c.metti(m.lamieraScura, new THREE.CylinderGeometry(0.16, 0.2, 0.3, 14), { matrice: orienta(faro, dir) });
    c.metti(m.luceCalda, new THREE.CircleGeometry(0.15, 14), { matrice: orienta(faro.clone().addScaledVector(dir, 0.16), dir, 1, v3(0, 0, 1)) });
    c.metti(m.coniFuori, cono(faro.clone().addScaledVector(dir, 0.18), dir, 7, 2.6, new THREE.Color(AMBRA).multiplyScalar(0.07)), { uv: false });
  }
  c.chioda(m.acciaio, lista);
  for (const x of [16.2, 20.6]) c.metti(m.pietra, new THREE.BoxGeometry(0.9, 0.75, 4.8), { matrice: matrice(x, -0.38, 0) });
}

function fondazioniDelta(c) {
  const { m, kit } = c;
  const varchi = [...BOCCAPORTI_DELTA.map(a => [a, 0.14]), [Math.PI, 0.2], [-2.84, 0.13]];
  const archi = [];
  const ordinati = varchi.map(([a, w]) => [a - w, a + w]).sort((u, w) => u[0] - w[0]);
  let inizio = ordinati[ordinati.length - 1][1] - Math.PI * 2;
  for (const [p, q] of ordinati) {
    if (p > inizio) archi.push([inizio, p]);
    inizio = Math.max(inizio, q);
  }
  for (const [a0, a1] of archi) {
    c.metti(m.rocciaFredda, griglia((a, r) => {
      const x = DELTA.x + Math.cos(a) * r;
      const z = DELTA.z + Math.sin(a) * r;
      const f = THREE.MathUtils.smoothstep(r, 24.6, 27.8);
      const y = -0.3 + 1.5 * Math.pow(1 - f, 0.8) + 0.28 * kit.rumore.fbm(x * 0.5, 0.3, z * 0.5, 3);
      return v3(x, Math.max(y, fondale(x, z) - 0.2), z);
    }, a0, a1, DELTA.raggio + 0.2, 27.8, Math.ceil((a1 - a0) * 70), 5, () => SU));
  }
  const lista = [];
  const cime = PILONI_DELTA.map(a => {
    const x = DELTA.x + Math.cos(a) * R_PILONI;
    const z = DELTA.z + Math.sin(a) * R_PILONI;
    const y0 = fondale(x, z);
    c.metti(m.pietra, kit.deforma(fuso(new THREE.BoxGeometry(1.9, 0.9, 1.9, 3, 2, 3)), { ampiezza: 0.12, frequenza: 1.5 }), { matrice: matrice(x, y0 + 0.2, z, -a) });
    c.metti(m.acciaio, new THREE.CylinderGeometry(0.26, 0.42, 7.4, 14), { matrice: matrice(x, y0 + 4.3, z) });
    for (const h of [1.6, 4.0, 6.4]) c.metti(m.lamieraScura, new THREE.CylinderGeometry(0.5, 0.5, 0.18, 14), { matrice: matrice(x, y0 + h, z) });
    c.metti(m.lamieraScura, new THREE.BoxGeometry(0.95, 0.38, 0.95), { matrice: matrice(x, y0 + 8.1, z, -a) });
    c.metti(m.acciaio, new THREE.TorusGeometry(0.28, 0.06, 6, 16), { matrice: matrice(x, y0 + 8.55, z, -a + Math.PI / 2) });
    c.metti(m.luceRossa, new THREE.SphereGeometry(0.12, 10, 8), { matrice: matrice(x, y0 + 8.45, z) });
    for (let i = 0; i < 12; i++) {
      const b = (i / 12) * Math.PI * 2;
      lista.push({ p: v3(x + Math.cos(b) * 0.5, y0 + 1.7, z + Math.sin(b) * 0.5), n: v3(Math.cos(b), 0, Math.sin(b)) });
    }
    const cima = v3(x, y0 + 8.2, z);
    const ancora = v3(DELTA.x + Math.cos(a) * 25.4, 1.0, DELTA.z + Math.sin(a) * 25.4);
    c.metti(m.acciaio, tubo(new THREE.CatmullRomCurve3([cima, cima.clone().lerp(ancora, 0.5).add(v3(0, -0.4, 0)), ancora]), 0.05, { radiali: 6, perMetro: 1.5 }), { uv: false });
    c.metti(m.lamieraScura, new THREE.BoxGeometry(0.7, 0.5, 0.7), { matrice: matrice(ancora.x, ancora.y - 0.1, ancora.z, -a) });
    return cima;
  });
  c.chioda(m.acciaio, lista);
  for (let i = 0; i < cime.length - 1; i++) {
    if (PILONI_DELTA[i + 1] - PILONI_DELTA[i] > 1.0) continue;
    const a = cime[i].clone().add(v3(0, -0.6, 0));
    const b = cime[i + 1].clone().add(v3(0, -0.6, 0));
    const punti = Array.from({ length: 11 }, (_, k) => a.clone().lerp(b, k / 10).add(v3(0, -2.2 * 4 * (k / 10) * (1 - k / 10), 0)));
    c.metti(m.acciaio, tubo(new THREE.CatmullRomCurve3(punti), 0.04, { radiali: 5, perMetro: 1.2 }), { uv: false });
  }
}

function superellissoide(kit, { centro, assi, esponente, ampiezza, seme, lati = 160, anelli = 80, scarta }) {
  let g = new THREE.SphereGeometry(1, lati, anelli);
  g.deleteAttribute('uv');
  g.deleteAttribute('normal');
  g = mergeVertices(g);
  const p = g.attributes.position;
  const r = kit.rumore;
  const f = (v, s) => Math.sign(v) * Math.pow(Math.abs(v), 2 / esponente) * s;
  const gr = (v, s) => (Math.sign(v) * Math.pow(Math.abs(v / s), esponente - 1)) / s;
  for (let i = 0; i < p.count; i++) {
    const x = f(p.getX(i), assi[0]);
    const y = f(p.getY(i), assi[1]);
    const z = f(p.getZ(i), assi[2]);
    const n = v3(gr(x, assi[0]), gr(y, assi[1]), gr(z, assi[2])).normalize();
    const wx = centro[0] + x;
    const wy = centro[1] + y;
    const wz = centro[2] + z;
    const grande = 0.5 + 0.5 * r.fbm(wx * 0.06 + seme, wy * 0.06, wz * 0.06, 4);
    const strati = 0.5 + 0.5 * Math.sin(wy * 1.25 + r.fbm(wx * 0.2, wy * 0.1, wz * 0.2, 2) * 3);
    const cresta = r.creste(wx * 0.12, wy * 0.12 + seme, wz * 0.12, 3);
    const d = ampiezza * (0.15 + 0.85 * grande) + strati * 0.35 + cresta * 1.1;
    p.setXYZ(i, wx + n.x * d, wy + n.y * d, wz + n.z * d);
  }
  g.computeVertexNormals();
  const h = g.toNonIndexed();
  const q = h.attributes.position;
  const nq = h.attributes.normal;
  const pos = [];
  const nor = [];
  for (let i = 0; i < q.count; i += 3) {
    const cx = (q.getX(i) + q.getX(i + 1) + q.getX(i + 2)) / 3;
    const cy = (q.getY(i) + q.getY(i + 1) + q.getY(i + 2)) / 3;
    const cz = (q.getZ(i) + q.getZ(i + 1) + q.getZ(i + 2)) / 3;
    if (scarta(cx, cy, cz)) continue;
    for (let k = 0; k < 3; k++) {
      pos.push(q.getX(i + k), q.getY(i + k), q.getZ(i + k));
      nor.push(nq.getX(i + k), nq.getY(i + k), nq.getZ(i + k));
    }
  }
  return geometria(pos, nor);
}

function massicci(c) {
  const { m, kit } = c;
  c.metti(m.rocciaFredda, superellissoide(kit, {
    centro: [0, -3, -43], assi: [27, 28, 19.5], esponente: 6, ampiezza: 2.2, seme: 1.7,
    scarta: (x, y, z) => y < -2.5
      || (Math.abs(x) < 2.4 && y < 4.2 && z > -30)
      || (x > 18 && Math.abs(z + 44) < 2.7 && y < 5.9)
      || (x < -18 && Math.abs(z + 40) < 1.9 && y < 2.9)
      || (x > 18 && Math.abs(z + 52) < 1.9 && y < 2.9),
  }));
  c.metti(m.rocciaFredda, superellissoide(kit, {
    centro: [24.9, 0.5, -44], assi: [3.7, 6.6, 4.1], esponente: 4, ampiezza: 0.8, seme: 4.1, lati: 64, anelli: 32,
    scarta: (x, y, z) => y < -2.5 || x < 21.6 || (x > 27.0 && Math.abs(z + 44) < 2.7 && y < 5.6) || Math.hypot(x - DELTA.x, y + 3.72, z - DELTA.z) < 25.9,
  }));
}

function camini(c) {
  const { m, kit } = c;
  const caso = casuale(907);
  const bocche = [];
  for (const [x, z, alto] of CAMINI) {
    const y0 = fondale(x, z) - 0.4;
    const base = kit.deforma(fuso(new THREE.SphereGeometry(alto * 0.32, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 1)), { ampiezza: alto * 0.07, frequenza: 0.9, seme: x });
    c.metti(m.rocciaFredda, base, { matrice: matrice(x, y0, z) });
    let y = y0 + alto * 0.12;
    let r = alto * 0.16;
    const pezzi = Math.max(2, Math.round(alto / 2.4));
    const tratto = (alto * 0.9) / pezzi;
    let ox = 0;
    let oz = 0;
    for (let i = 0; i < pezzi; i++) {
      const r1 = r * (0.72 + caso() * 0.15);
      const tronco = kit.deforma(fuso(new THREE.CylinderGeometry(r1, r, tratto * 1.08, 12, 5)), { ampiezza: r * 0.28, frequenza: 1.6 / r, seme: i + x });
      c.metti(m.rocciaFredda, tronco, { matrice: matrice(x + ox, y + tratto / 2, z + oz, caso() * 6) });
      if (i < pezzi - 1 && caso() < 0.7) c.metti(m.rocciaFredda, kit.deforma(fuso(new THREE.CylinderGeometry(r * 1.5, r * 1.25, 0.25, 12, 1)), { ampiezza: 0.12, frequenza: 2.5, seme: i }), { matrice: matrice(x + ox, y + tratto, z + oz) });
      y += tratto;
      r = r1;
      ox += (caso() - 0.5) * 0.25;
      oz += (caso() - 0.5) * 0.25;
    }
    c.metti(m.brace, new THREE.TorusGeometry(r * 0.75, r * 0.18, 6, 16).rotateX(Math.PI / 2), { matrice: matrice(x + ox, y + 0.02, z + oz) });
    c.metti(m.brace, kit.deforma(fuso(new THREE.TorusGeometry(alto * 0.27, 0.12, 5, 24).rotateX(Math.PI / 2)), { ampiezza: 0.15, frequenza: 1.2, seme: z }), { matrice: matrice(x, y0 + 0.35, z) });
    bocche.push({ x: x + ox, y: y + 0.1, z: z + oz, alto: 10 + alto * 1.2 });
  }
  for (const [x, z] of [[13, 21], [-22, 24]]) kit.luce({ x, y: fondale(x, z) + 1.5, z, colore: 0xff7a3a, intensita: 6, portata: 12, tremola: true });
  return bocche;
}

function fumi(c, bocche) {
  const { kit } = c;
  const densita = kit.qualita?.densita ?? 1;
  const perBocca = Math.round(QUANTI.fumo * densita);
  const perBolle = Math.round(QUANTI.bolle * densita);
  const caso = casuale(311);
  const sorgenti = [...bocche];
  for (let i = 0; sorgenti.length < bocche.length + 14 && i < 400; i++) {
    const x = -40 + caso() * 130;
    const z = -90 + caso() * 125;
    const d = distanzaStrutture(x, z);
    if (d < 2 || d > 16 || nelCorridoio(x, z)) continue;
    sorgenti.push({ x, y: fondale(x, z), z, alto: 8 + caso() * 10, piccola: true });
  }
  const crea = (lista, quanti, opzioni) => {
    const n = lista.length * quanti;
    const pos = new Float32Array(n * 3);
    const seme = new Float32Array(n);
    const alto = new Float32Array(n);
    let k = 0;
    for (const b of lista) for (let i = 0; i < quanti; i++) {
      pos[k * 3] = b.x; pos[k * 3 + 1] = b.y; pos[k * 3 + 2] = b.z;
      seme[k] = caso();
      alto[k] = b.alto;
      k++;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeme', new THREE.BufferAttribute(seme, 1));
    g.setAttribute('aAlto', new THREE.BufferAttribute(alto, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { ...THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uScala: { value: 400 } }]), uTempo: kit.uniformi.uTempo },
      fog: true, transparent: true, depthWrite: false, blending: opzioni.additivo ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: `
        uniform float uTempo;
        uniform float uScala;
        uniform float fogNear;
        uniform float fogFar;
        attribute float aSeme;
        attribute float aAlto;
        varying float vAlfa;
        varying float vVita;
        void main() {
          float vita = fract(uTempo * ${opzioni.velocita.toFixed(3)} * (0.7 + 0.6 * fract(aSeme * 7.13)) / aAlto * 10.0 + aSeme);
          float allarga = ${opzioni.allarga.toFixed(3)} * (0.2 + vita * vita * 3.0);
          vec3 p = position + vec3(sin(aSeme * 43.0 + uTempo * 0.6 + vita * 6.0) * allarga + vita * vita * ${opzioni.deriva.toFixed(3)}, vita * aAlto, cos(aSeme * 71.0 + uTempo * 0.5 + vita * 5.0) * allarga);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float dim = ${opzioni.dimensione.toFixed(3)} * (0.6 + vita * ${opzioni.cresce.toFixed(3)});
          gl_PointSize = max(1.5, dim * uScala / max(0.5, -mv.z));
          float nebbia = smoothstep(fogNear, fogFar, -mv.z);
          vAlfa = (1.0 - vita) * smoothstep(0.0, 0.08, vita) * (1.0 - nebbia);
          vVita = vita;
        }`,
      fragmentShader: `
        varying float vAlfa;
        varying float vVita;
        void main() {
          vec2 q = gl_PointCoord - 0.5;
          float d = length(q);
          float a = smoothstep(0.5, ${opzioni.additivo ? '0.25' : '0.05'}, d) * vAlfa * ${opzioni.alfa.toFixed(3)};
          if (a < 0.004) discard;
          ${opzioni.additivo
    ? 'gl_FragColor = vec4(vec3(0.55, 0.85, 1.0) * a, 1.0);'
    : 'vec3 c = mix(vec3(0.9, 0.38, 0.12) * 0.7, vec3(0.035, 0.035, 0.04), smoothstep(0.0, 0.18, vVita));\n          gl_FragColor = vec4(c, a);'}
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const punti = new THREE.Points(g, mat);
    punti.frustumCulled = false;
    kit.scena.add(punti);
    return mat;
  };
  return [
    crea(bocche, perBocca, { velocita: 0.55, allarga: 1.0, deriva: 3.0, dimensione: 1.4, cresce: 3.6, alfa: 0.7, additivo: false }),
    crea(sorgenti, perBolle, { velocita: 1.9, allarga: 0.25, deriva: 0.6, dimensione: 0.07, cresce: 0.6, alfa: 0.9, additivo: true }),
  ];
}

function guglie(c) {
  const { m, kit } = c;
  for (const [x, z, alto] of GUGLIE) {
    const y0 = fondale(x, z) - 1;
    const g = kit.deforma(fuso(new THREE.CylinderGeometry(alto * 0.05, alto * 0.22, alto, 16, 14)), { ampiezza: alto * 0.06, frequenza: 0.18, ottave: 4, seme: x + z });
    c.metti(m.rocciaFredda, g, { matrice: matrice(x, y0 + alto / 2, z, x, (z % 7) * 0.02, (x % 5) * 0.02) });
    c.metti(m.rocciaFredda, kit.deforma(fuso(new THREE.SphereGeometry(alto * 0.3, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.4, 1)), { ampiezza: alto * 0.05, frequenza: 0.3, seme: z }), { matrice: matrice(x, y0 + 0.3, z) });
  }
}

function relitto(c) {
  const { m } = c;
  const y0 = fondale(RELITTO.x, RELITTO.z);
  const M = matrice(RELITTO.x, y0 + 0.6, RELITTO.z, RELITTO.ry, 0.08, 0.32);
  const o = (materiale, g, x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0) => c.metti(materiale, g, { matrice: M.clone().multiply(matrice(x, y, z, ry, rx, rz)) });
  const sigaro = new THREE.LatheGeometry([[0, -8], [0.8, -7.6], [1.5, -6.5], [1.9, -4.5], [1.95, 0], [1.9, 4.5], [1.5, 6.5], [0.7, 7.7], [0, 8]].map(([r, y]) => new THREE.Vector2(r, y)), 28).rotateZ(-Math.PI / 2);
  o(m.lamiera, sigaro);
  o(m.lamieraScura, new THREE.BoxGeometry(13, 0.14, 1.3), 0, 1.98, 0);
  o(m.lamieraScura, new THREE.BoxGeometry(2.4, 1.7, 1.4), 1.5, 2.85, 0);
  o(m.lamieraScura, new THREE.CylinderGeometry(0.45, 0.45, 0.4, 16), 1.5, 3.9, 0);
  o(m.lamieraScura, new THREE.CylinderGeometry(0.55, 0.55, 2.4, 16), 0.5, -1.5, 0);
  o(m.lamiera, new THREE.SphereGeometry(1.2, 24, 16), 0.5, -2.9, 0);
  for (const s of [-1, 1]) o(m.lamieraScura, new THREE.CylinderGeometry(0.5, 0.5, 4.5, 14).rotateZ(Math.PI / 2), -3.5, -1.2, s * 1.5);
  for (const a of [0.4, 1.4, 2.4]) o(m.ottone, new THREE.TorusGeometry(0.16, 0.04, 6, 14), 0.5 + Math.cos(a) * 1.18, -2.9, Math.sin(a) * 1.18, Math.PI / 2 - a);
  o(m.ottone, new THREE.CylinderGeometry(0.25, 0.25, 0.5, 12).rotateZ(Math.PI / 2), -8.2, 0, 0);
  for (let i = 0; i < 3; i++) o(m.ottone, new THREE.BoxGeometry(0.06, 1.3, 0.35).translate(0, 0.65, 0), -8.4, 0, 0, 0, (i / 3) * Math.PI * 2 + 0.4, 0);
  for (let i = 0; i < 9; i++) o(m.acciaio, new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), -5.5 + i * 1.35, 2.45, 0.6, 0, 0, i % 3 === 0 ? 0.6 : 0);
  o(m.faroRelitto, new THREE.SphereGeometry(0.1, 10, 8), 1.5, 4.15, 0);
}

function materialeCorallo(kit) {
  const set = kit.tex.pietraMarina ?? {};
  const m = new THREE.MeshStandardMaterial({ map: set.map ?? null, normalMap: set.normalMap ?? null, color: 0x9a8a9a, roughness: 0.8 });
  const prima = m.onBeforeCompile;
  m.onBeforeCompile = (shader, renderer) => {
    prima?.call(m, shader, renderer);
    shader.uniforms.uTempo = kit.uniformi.uTempo;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aPunta;\nvarying float vPunta;\nvarying float vFase;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPunta = aPunta;\n#ifdef USE_INSTANCING\nvFase = instanceMatrix[3].x * 0.37 + instanceMatrix[3].z * 0.23;\n#else\nvFase = 0.0;\n#endif');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vPunta;\nvarying float vFase;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#ifdef USE_COLOR\ntotalEmissiveRadiance += vColor.rgb * pow(vPunta, 1.6) * (0.45 + 0.55 * sin(uTempo * 0.8 + vFase)) * 2.0;\n#endif');
  };
  m.customProgramCacheKey = () => 'coralloAbisso';
  return conCaustiche(m, kit.uniformi, { chiave: 'coralloAbisso' });
}

function materialeAlghe(kit) {
  const m = new THREE.MeshStandardMaterial({ color: 0x6a7a4a, roughness: 0.65, side: THREE.DoubleSide });
  m.onBeforeCompile = shader => {
    shader.uniforms.uTempo = kit.uniformi.uTempo;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTempo;\nvarying float vAltezza;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vAltezza = position.y;
        float fase = 0.0;
        #ifdef USE_INSTANCING
          fase = instanceMatrix[3].x * 0.5 + instanceMatrix[3].z * 0.3;
        #endif
        float h = position.y;
        transformed.x += sin(uTempo * 1.1 + fase + h * 1.7) * 0.28 * h * h;
        transformed.z += cos(uTempo * 0.8 + fase * 1.3 + h * 1.3) * 0.2 * h * h;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uTempo;\nvarying float vAltezza;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#ifdef USE_COLOR\ntotalEmissiveRadiance += vColor.rgb * pow(clamp(vAltezza, 0.0, 1.0), 6.0) * 1.4 * step(0.9, vColor.b);\n#endif');
  };
  m.customProgramCacheKey = () => 'algheAbisso';
  return m;
}

function conPunta(g, punta) {
  const h = g.index ? g.toNonIndexed() : g;
  for (const nome of Object.keys(h.attributes)) if (!['position', 'normal', 'uv'].includes(nome)) h.deleteAttribute(nome);
  const p = h.attributes.position;
  const valori = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) valori[i] = punta(p.getX(i), p.getY(i), p.getZ(i));
  h.setAttribute('aPunta', new THREE.BufferAttribute(valori, 1));
  return h;
}

function geometrieCoralli(kit) {
  const caso = casuale(51);
  const rami = [];
  const ramo = (da, dir, lungo, r, livello) => {
    const fine = da.clone().addScaledVector(dir, lungo);
    const mezzo = da.clone().lerp(fine, 0.5).add(v3((caso() - 0.5) * 0.2 * lungo, 0, (caso() - 0.5) * 0.2 * lungo));
    rami.push(affusolato(new THREE.CatmullRomCurve3([da, mezzo, fine]), r, r * 0.55, 4, 5));
    if (livello >= 2) return;
    const figli = livello === 0 ? 3 : 2;
    for (let k = 0; k < figli; k++) {
      const a = (k / figli) * Math.PI * 2 + caso() * 1.2;
      const nuova = dir.clone().add(v3(Math.cos(a) * 0.75, 0.15, Math.sin(a) * 0.75)).normalize();
      ramo(da.clone().lerp(fine, 0.55 + caso() * 0.4), nuova, lungo * 0.68, r * 0.62, livello + 1);
    }
  };
  ramo(v3(), SU.clone(), 0.55, 0.08, 0);
  const albero = mergeGeometries(rami.map(g => {
    const h = g.toNonIndexed();
    h.deleteAttribute('aOnda');
    return h;
  }));
  const ramificato = conPunta(kit.uvMetri(albero, 2), (x, y) => THREE.MathUtils.smoothstep(y, 0.5, 1.25));
  const cervello = conPunta(kit.uvMetri(kit.deforma(fuso(new THREE.SphereGeometry(0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62).scale(1.2, 0.6, 1.1)), { ampiezza: 0.08, frequenza: 5, seme: 3 }), 2),
    (x, y, z) => Math.pow(Math.max(0, Math.sin(x * 18) * Math.sin(z * 18)), 2) * THREE.MathUtils.smoothstep(y, 0.05, 0.3));
  const tubi = [];
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 + caso();
    const r = 0.07 + caso() * 0.05;
    const alto = 0.4 + caso() * 0.7;
    const d = k === 0 ? 0 : 0.14 + caso() * 0.08;
    const t = new THREE.CylinderGeometry(r, r * 0.75, alto, 8, 2, true).translate(Math.cos(a) * d, alto / 2, Math.sin(a) * d);
    tubi.push(t.toNonIndexed(), rovescia(t));
  }
  const spugna = conPunta(kit.uvMetri(mergeGeometries(tubi), 2), (x, y) => THREE.MathUtils.smoothstep(y, 0.3, 1.1));
  return { ramificato, cervello, spugna };
}

function sparsi(caso, quanti, { minimo = 1.5, massimo = 30, decadenza = 9, evitaOrbita = false, extra = [] } = {}) {
  const lista = [...extra];
  for (let tentativi = 0; lista.length < quanti && tentativi < quanti * 60; tentativi++) {
    const x = -55 + caso() * 160;
    const z = -100 + caso() * 145;
    const d = distanzaStrutture(x, z);
    if (d < minimo || d > massimo) continue;
    if (caso() > Math.exp(-(d - minimo) / decadenza)) continue;
    if (nelCorridoio(x, z)) continue;
    if (evitaOrbita && nellOrbita(x, z)) continue;
    lista.push({ x, z, y: fondale(x, z) });
  }
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(caso() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

function istanze(c, geometria, materiale, posti, { scala, colore, sotto = 0, inclina = 0.15, piatto = 1 }) {
  const { kit } = c;
  const caso = casuale(posti.length * 7 + 3);
  const mesh = new THREE.InstancedMesh(geometria, materiale, posti.length);
  const m = new THREE.Matrix4();
  const tinta = new THREE.Color();
  posti.forEach((p, i) => {
    const s = scala[0] + caso() * (scala[1] - scala[0]);
    m.compose(v3(p.x, p.y - s * sotto, p.z), new THREE.Quaternion().setFromEuler(new THREE.Euler((caso() - 0.5) * inclina, caso() * Math.PI * 2, (caso() - 0.5) * inclina)), v3(s, s * piatto * (0.8 + caso() * 0.4), s));
    mesh.setMatrixAt(i, m);
    if (colore) mesh.setColorAt(i, tinta.setHex(colore(caso, i)));
  });
  mesh.userData.pieni = posti.length;
  mesh.receiveShadow = true;
  kit.scena.add(mesh);
  return mesh;
}

function vita(c) {
  const { m, kit } = c;
  const caso = casuale(4242);
  const geo = geometrieCoralli(kit);
  const tinta = (k) => TINTE_CORALLO[Math.floor(k() * k() * TINTE_CORALLO.length)];
  const sulRelitto = [[-2, 1.9], [1, 2.0], [4, 1.9], [-5, 1.8]].map(([lx, ly]) => {
    const p = v3(lx, ly, 0).applyMatrix4(matrice(RELITTO.x, fondale(RELITTO.x, RELITTO.z) + 0.6, RELITTO.z, RELITTO.ry, 0.08, 0.32));
    return { x: p.x, y: p.y, z: p.z };
  });
  istanze(c, geo.ramificato, m.corallo, sparsi(caso, QUANTI.ramificati, { minimo: 1.2, massimo: 32, decadenza: 10, evitaOrbita: true, extra: sulRelitto.slice(0, 2) }), { scala: [0.9, 2.4], colore: tinta });
  istanze(c, geo.cervello, m.corallo, sparsi(caso, QUANTI.cervelli, { minimo: 1.0, massimo: 30, decadenza: 8, evitaOrbita: true, extra: sulRelitto.slice(2) }), { scala: [0.6, 1.8], colore: tinta, sotto: 0.15, piatto: 0.8 });
  istanze(c, geo.spugna, m.corallo, sparsi(caso, QUANTI.spugne, { minimo: 1.2, massimo: 34, decadenza: 11, evitaOrbita: true }), { scala: [0.8, 2.2], colore: tinta, inclina: 0.25 });
  const nastro = new THREE.PlaneGeometry(0.13, 1, 1, 8).translate(0, 0.5, 0);
  const alga = mergeGeometries([nastro, nastro.clone().rotateY(Math.PI / 2)]);
  istanze(c, alga, m.alghe, sparsi(caso, QUANTI.alghe, { minimo: 1.0, massimo: 26, decadenza: 7, evitaOrbita: true }), {
    scala: [1.0, 1.4], piatto: 3, inclina: 0.2,
    colore: k => (k() < 0.3 ? [0x5fe8ff, 0x7dff9a, 0xc08aff][Math.floor(k() * 3)] : [0x55603a, 0x6a5a38, 0x485a40][Math.floor(k() * 3)]),
  });
  const masso = kit.uvMetri(kit.deforma(fuso(new THREE.IcosahedronGeometry(1, 2)), { ampiezza: 0.32, frequenza: 1.3, seme: 2 }), 1);
  const sasso = kit.uvMetri(kit.deforma(fuso(new THREE.IcosahedronGeometry(1, 1)), { ampiezza: 0.25, frequenza: 1.8, seme: 6 }), 1);
  istanze(c, masso, kit.mat.roccia, sparsi(caso, QUANTI.massi, { minimo: 3, massimo: 40, decadenza: 16, evitaOrbita: true }), { scala: [1.2, 3.6], sotto: 0.35, inclina: 0.6, piatto: 0.65 });
  istanze(c, sasso, kit.mat.roccia, sparsi(caso, QUANTI.sassi, { minimo: 1.2, massimo: 30, decadenza: 10 }), { scala: [0.25, 0.8], sotto: 0.3, inclina: 1.2, piatto: 0.7 });
}

function neveMarina(c) {
  const { kit } = c;
  const n = Math.round(QUANTI.neve * (kit.qualita?.densita ?? 1));
  const caso = casuale(73);
  const pos = new Float32Array(n * 3);
  const seme = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (caso() - 0.5) * 36;
    pos[i * 3 + 1] = (caso() - 0.5) * 36;
    pos[i * 3 + 2] = (caso() - 0.5) * 36;
    seme[i] = caso();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aSeme', new THREE.BufferAttribute(seme, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { ...THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uCentro: { value: v3() }, uScala: { value: 400 } }]), uTempo: kit.uniformi.uTempo },
    fog: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTempo;
      uniform vec3 uCentro;
      uniform float uScala;
      uniform float fogNear;
      uniform float fogFar;
      attribute float aSeme;
      varying float vAlfa;
      bool dentroStrutture(vec3 p) {
        float ra = length(p.xz);
        if (p.y < 2.5 && ra < 13.7) return true;
        if (p.y >= 2.5 && (ra * ra) / (13.7 * 13.7) + pow((p.y - 2.5) / 8.9, 2.0) < 1.0) return true;
        if (p.x > 13.0 && p.x < 24.2 && abs(p.z) < 2.6 && p.y < 3.6) return true;
        if (abs(p.x) < 2.1 && p.z > -26.5 && p.z < -12.8 && p.y < 4.0) return true;
        if (p.x > 23.4 && p.x < 59.2 && p.z > -14.6 && p.z < 17.2 && p.y < 12.6) return true;
        if (abs(p.x) < 28.0 && p.z > -64.0 && p.z < -21.0 && p.y < 26.0) return true;
        vec2 d = p.xz - vec2(52.0, -44.0);
        if (p.y > -1.0 && length(vec3(d.x, p.y + 3.72, d.y)) < 26.0) return true;
        return false;
      }
      void main() {
        vec3 p = position + vec3(sin(uTempo * 0.13 + aSeme * 6.0) * 0.8, -uTempo * (0.08 + 0.1 * fract(aSeme * 3.7)), cos(uTempo * 0.11 + aSeme * 9.0) * 0.8);
        p = uCentro + mod(p - uCentro + 18.0, 36.0) - 18.0;
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float d = -mv.z;
        gl_PointSize = max(1.2, (0.04 + 0.06 * fract(aSeme * 13.1)) * uScala / max(0.5, d));
        vAlfa = (1.0 - smoothstep(fogNear + 2.0, fogFar * 0.7, d)) * (0.35 + 0.65 * fract(aSeme * 5.3));
        if (dentroStrutture(p)) {
          vAlfa = 0.0;
          gl_PointSize = 0.0;
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        }
      }`,
    fragmentShader: `
      varying float vAlfa;
      void main() {
        float a = smoothstep(0.5, 0.1, length(gl_PointCoord - 0.5)) * vAlfa;
        if (a < 0.01) discard;
        gl_FragColor = vec4(vec3(0.5, 0.75, 0.82) * a, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const punti = new THREE.Points(g, mat);
  punti.frustumCulled = false;
  kit.scena.add(punti);
  return mat;
}

function fasci(c) {
  const { m } = c;
  for (const [x, z] of FASCI) {
    const y = fondale(x, z) - 1;
    c.metti(m.fasci, cono(v3(x, 70, z), v3(0.08, -1, 0.05), 71 - y, 3.2, new THREE.Color(0x7fd8ff).multiplyScalar(0.05), { inizio: 8, lati: 18, anelli: 6 }), { uv: false });
  }
}

function materialeFasci(uTempo) {
  return new THREE.ShaderMaterial({
    uniforms: { ...THREE.UniformsUtils.merge([THREE.UniformsLib.fog]), uTempo },
    vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: true,
    vertexShader: `
      varying vec3 vColore;
      varying float vLungo;
      varying vec3 vN;
      varying vec3 vVista;
      varying float vProf;
      void main() {
        vColore = color;
        vLungo = uv.x;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vVista = cameraPosition - w.xyz;
        vec4 mv = viewMatrix * w;
        vProf = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform float fogFar;
      varying vec3 vColore;
      varying float vLungo;
      varying vec3 vN;
      varying vec3 vVista;
      varying float vProf;
      void main() {
        float bordo = pow(abs(dot(normalize(vN), normalize(vVista))), 2.2);
        float lungo = smoothstep(0.0, 0.35, vLungo) * (1.0 - smoothstep(0.75, 1.0, vLungo));
        float respiro = 0.65 + 0.35 * sin(uTempo * 0.23 + vColore.r * 40.0);
        float nebbia = 1.0 - 0.7 * smoothstep(fogFar * 0.6, fogFar * 1.6, vProf);
        gl_FragColor = vec4(vColore * bordo * lungo * respiro * nebbia, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

function geometriaLeviatano(kit) {
  const { lungo } = LEVIATANO;
  const chiavi = [[0, 0.25], [0.08, 0.9], [0.25, 2.3], [0.5, 4.4], [0.7, 5.6], [0.84, 5.4], [0.93, 4.0], [0.985, 2.2], [1, 0.6]];
  const raggio = u => {
    let i = 1;
    while (i < chiavi.length - 1 && chiavi[i][0] < u) i++;
    const [u0, r0] = chiavi[i - 1];
    const [u1, r1] = chiavi[i];
    const t = (u - u0) / (u1 - u0);
    return r0 + (r1 - r0) * (0.5 - 0.5 * Math.cos(Math.PI * t));
  };
  const zDi = u => (u - 0.6) * lungo;
  const pos = [];
  const valoriU = [];
  const occhi = [];
  const indici = [];
  const anelli = 96;
  const giro = 28;
  const r = kit.rumore;
  const inizio = () => pos.length / 3;
  const corpo = inizio();
  for (let i = 0; i <= anelli; i++) {
    const u = i / anelli;
    const rr = raggio(u);
    for (let j = 0; j <= giro; j++) {
      const f = (j / giro) * Math.PI * 2;
      const su = Math.sin(f);
      let x = Math.cos(f) * rr * 1.15;
      let y = su * rr * 0.82;
      y += Math.pow(Math.max(0, su), 16) * rr * 0.55 * (0.45 + 0.55 * Math.abs(Math.sin(u * 70)));
      y -= Math.pow(Math.max(0, -su), 6) * rr * 0.12;
      const d = 1 + 0.07 * r.fbm(x * 0.25, y * 0.25, zDi(u) * 0.25, 3);
      pos.push(x * d, y * d, zDi(u));
      valoriU.push(u);
      occhi.push(0);
    }
  }
  for (let i = 0; i < anelli; i++) for (let j = 0; j < giro; j++) {
    const a = corpo + i * (giro + 1) + j;
    const b = a + giro + 1;
    indici.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const membrana = (punti, u) => {
    const a = inizio();
    for (const p of punti) {
      pos.push(p.x, p.y, p.z);
      valoriU.push(u);
      occhi.push(0);
    }
    for (let k = 1; k < punti.length - 1; k++) indici.push(a, a + k, a + k + 1, a, a + k + 1, a + k);
  };
  for (const [u, ampio, lungoP] of [[0.62, 16, 14], [0.4, 10, 10]]) for (const s of [-1, 1]) {
    const rr = raggio(u);
    const z = zDi(u);
    const radice = v3(s * rr * 1.1, -rr * 0.2, z);
    membrana([radice, v3(s * (rr + ampio * 0.5), -rr * 0.3 + 1, z - lungoP * 0.2), v3(s * (rr + ampio), -rr * 0.5, z - lungoP * 0.7), v3(s * (rr + ampio * 0.7), -rr * 0.6, z - lungoP), v3(s * rr * 1.05, -rr * 0.3, z - lungoP * 0.45)], u);
  }
  membrana([v3(0, 0, zDi(0.02)), v3(0, 8, zDi(0) - 6), v3(0, 3, zDi(0) - 3), v3(0, -3, zDi(0) - 3), v3(0, -7, zDi(0) - 5)], 0);
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI - Math.PI;
    const z0 = zDi(0.88);
    const x0 = Math.cos(a) * 3.2;
    const y0 = -3.0 + Math.sin(a) * 0.8;
    const lungoT = 24 + (k % 3) * 5;
    const punti = Array.from({ length: 6 }, (_, i) => v3(x0 * (1 + i * 0.25) + Math.sin(i * 1.3 + k) * 1.5, y0 - i * 0.9, z0 - (i / 5) * lungoT));
    const t = affusolato(new THREE.CatmullRomCurve3(punti), 0.55, 0.06, 18, 6);
    const a0 = inizio();
    const tp = t.attributes.position;
    for (let i = 0; i < tp.count; i++) {
      pos.push(tp.getX(i), tp.getY(i), tp.getZ(i));
      valoriU.push(Math.max(0, 0.88 - Math.max(0, z0 - tp.getZ(i)) / lungo));
      occhi.push(0);
    }
    for (const i of t.index.array) indici.push(a0 + i);
  }
  for (const s of [-1, 1]) for (let k = 0; k < 6; k++) {
    const u = 0.875 + k * 0.018;
    const rr = raggio(u);
    const f = 0.32 - k * 0.02;
    const centro = v3(s * Math.cos(f) * rr * 1.13, Math.sin(f) * rr * 0.82, zDi(u));
    const occhio = new THREE.SphereGeometry(0.42 - k * 0.03, 10, 8);
    const a0 = inizio();
    const op = occhio.attributes.position;
    for (let i = 0; i < op.count; i++) {
      pos.push(op.getX(i) + centro.x, op.getY(i) + centro.y, op.getZ(i) + centro.z);
      valoriU.push(u);
      occhi.push(1);
    }
    for (const i of occhio.index.array) indici.push(a0 + i);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aU', new THREE.Float32BufferAttribute(valoriU, 1));
  g.setAttribute('aOcchio', new THREE.Float32BufferAttribute(occhi, 1));
  g.setIndex(indici);
  g.computeVertexNormals();
  return g;
}

function leviatano(c) {
  const { kit } = c;
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTempo: kit.uniformi.uTempo, uNebbia: { value: new THREE.Color(0x03141c) }, uVelo: { value: 0.8 },
      uPelle: { value: new THREE.Color(0x0e1c22) }, uBordo: { value: new THREE.Color(0x2f6a7a) }, uOcchi: { value: new THREE.Color(OCCHI) },
    },
    side: THREE.DoubleSide,
    vertexShader: `
      uniform float uTempo;
      attribute float aU;
      attribute float aOcchio;
      varying float vOcchio;
      varying float vU;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        vec3 p = position;
        float coda = 1.0 - aU;
        p.x += sin(aU * 8.0 - uTempo * 1.3) * coda * coda * 4.5;
        p.y += sin(aU * 5.0 - uTempo * 0.9) * 0.7;
        vec4 w = modelMatrix * vec4(p, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - w.xyz);
        vOcchio = aOcchio;
        vU = aU;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `
      uniform float uTempo;
      uniform vec3 uNebbia;
      uniform float uVelo;
      uniform vec3 uPelle;
      uniform vec3 uBordo;
      uniform vec3 uOcchi;
      varying float vOcchio;
      varying float vU;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        vec3 n = normalize(vN);
        float fres = pow(1.0 - abs(dot(n, normalize(vV))), 2.4);
        vec3 c = uPelle * (0.45 + 0.55 * max(n.y, 0.0)) + uBordo * fres * 0.8;
        float palpebra = step(0.035, fract(uTempo * 0.09 + vU * 2.0));
        vec3 occhi = uOcchi * (3.0 + 1.5 * sin(uTempo * 1.7 + vU * 60.0)) * palpebra;
        c = mix(c, occhi, vOcchio);
        float velo = uVelo * (1.0 - vOcchio * 0.65);
        gl_FragColor = vec4(mix(c, uNebbia, velo), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geometriaLeviatano(kit), mat);
  mesh.frustumCulled = false;
  mesh.visible = false;
  kit.scena.add(mesh);
  return { mesh, mat, s: 1.1, vicinanza: 0 };
}

function rotta(s, vicinanza) {
  const lontano = 190 + 35 * Math.sin(s * 2 + 0.7) + 20 * Math.sin(s * 5 + 2.1);
  const scarto = Math.atan2(Math.sin(s - LEVIATANO.passaggio), Math.cos(s - LEVIATANO.passaggio));
  const g = Math.exp(-((scarto / 0.42) ** 2)) * vicinanza;
  const r = lontano * (1 - g) + LEVIATANO.vicino * g;
  const y = (15 + 9 * Math.sin(s * 3 + 1.3)) * (1 - g) + 17 * g;
  return v3(ALPHA.x + Math.cos(s) * r, y, ALPHA.z + Math.sin(s) * r);
}

export function creaFondale(kit) {
  const mat = kit.mat;
  const m = {
    ...mat,
    terreno: materialeTerreno(kit),
    rocciaFredda: materialeRocciaFredda(kit),
    corallo: materialeCorallo(kit),
    alghe: materialeAlghe(kit),
    coniFuori: materialeConi(kit.uniformi.uTempo, 1),
    fasci: materialeFasci(kit.uniformi.uTempo),
    obloScafo: new THREE.MeshStandardMaterial({ color: 0x1a120a, emissive: 0xffc890, emissiveIntensity: 1.3, roughness: 0.2 }),
    brace: new THREE.MeshStandardMaterial({ color: 0x0a0402, emissive: 0xff5a1a, emissiveIntensity: 2.4, roughness: 0.9 }),
    faroRelitto: new THREE.MeshStandardMaterial({ color: 0x200404, emissive: 0xff2a1a, emissiveIntensity: 3 }),
  };
  const metti = (materiale, g, { uv = true, matrice: matrix = null, ombra = false } = {}) => kit.lotto(materiale, 'fondale').aggiungi(uv ? kit.uvMetri(g, 1) : g, matrix, { ombra });
  const chiodi = new Map();
  const c = {
    kit, m, metti,
    chioda(materiale, lista) {
      if (!chiodi.has(materiale)) chiodi.set(materiale, []);
      chiodi.get(materiale).push(...lista);
    },
  };
  terreno(c);
  scafoReattore(c);
  esternoAlpha(c);
  fondazioniDelta(c);
  massicci(c);
  const bocche = camini(c);
  guglie(c);
  relitto(c);
  fasci(c);
  for (const [materiale, lista] of chiodi) metti(materiale, rivetti(lista), { uv: false });
  vita(c);
  const [fumo, bolle] = fumi(c, bocche);
  const neve = neveMarina(c);
  const bestia = leviatano(c);
  const fondo = fondoNebbia(kit);
  const scala = () => (typeof window !== 'undefined' ? window.innerHeight * 0.62 : 400);
  const avanti = v3();
  const vera = v3();

  kit.ogniFotogramma((vista, dt, tempo, punto) => {
    const ab = vista.abisso;
    const protocollo = !!ab?.protocollo && !ab?.completata;
    const s = scala();
    fumo.uniforms.uScala.value = s;
    bolle.uniforms.uScala.value = s;
    neve.uniforms.uScala.value = s;
    if (punto) {
      neve.uniforms.uCentro.value.copy(punto);
      fondo.position.copy(punto);
    }
    if (kit.scena.fog) fondo.material.color.copy(kit.scena.fog.color);
    m.brace.emissiveIntensity = 2.1 + 0.5 * Math.sin(tempo * 2.3) + 0.25 * Math.sin(tempo * 7.1);
    m.faroRelitto.emissiveIntensity = Math.sin(tempo * 1.6) > 0.82 ? 5 : 0.2;
    m.coniFuori.uniforms.uAllarme.value = protocollo ? 1 : 0;
    m.coniFuori.uniforms.uForza.value = protocollo ? 0.5 + 0.8 * (0.5 + 0.5 * Math.sin(tempo * 3.2)) : 1;

    const { mesh, mat: mb } = bestia;
    if (ab?.leviatano || !punto) {
      mesh.visible = false;
      return;
    }
    bestia.vicinanza += ((protocollo ? 1 : 0) - bestia.vicinanza) * Math.min(1, dt * 0.08);
    vera.copy(rotta(bestia.s, bestia.vicinanza));
    avanti.copy(rotta(bestia.s + 0.004, bestia.vicinanza)).sub(vera);
    const passo = avanti.length() / 0.004;
    bestia.s += (dt * LEVIATANO.velocita) / Math.max(20, passo);
    const verso = vera.clone().sub(punto);
    const distanza = verso.length();
    const k = distanza > LEVIATANO.proxy ? LEVIATANO.proxy / distanza : 1;
    mesh.position.copy(punto).addScaledVector(verso, k);
    mesh.scale.setScalar(k);
    mesh.lookAt(mesh.position.clone().add(avanti));
    mesh.visible = true;
    if (kit.scena.fog) mb.uniforms.uNebbia.value.copy(kit.scena.fog.color);
    mb.uniforms.uVelo.value = THREE.MathUtils.clamp(0.28 + (distanza - 30) / 260, 0.3, 0.9);
    mb.uniforms.uOcchi.value.setHex(protocollo ? OCCHI_ALLARME : OCCHI);
  });
}
