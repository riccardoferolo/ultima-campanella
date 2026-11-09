const PASSO_MASSIMO = 0.2;
const CELLA_INDICE = 4;
const SCARTO_INDICE = 32768;
const MARGINE_INTORNO = 1;

const limita = (v, min, max) => Math.min(max, Math.max(min, v));

export function spingiFuori(x, z, raggio, s) {
  const px = limita(x, s.x0, s.x1);
  const pz = limita(z, s.z0, s.z1);
  const dx = x - px;
  const dz = z - pz;
  const d2 = dx * dx + dz * dz;
  if (d2 >= raggio * raggio) return [x, z];
  if (d2 > 1e-9) {
    const d = Math.sqrt(d2);
    return [px + (dx / d) * raggio, pz + (dz / d) * raggio];
  }
  const uscite = [
    [x - s.x0, s.x0 - raggio, z],
    [s.x1 - x, s.x1 + raggio, z],
    [z - s.z0, x, s.z0 - raggio],
    [s.z1 - z, x, s.z1 + raggio],
  ];
  const [, nx, nz] = uscite.reduce((min, u) => (u[0] < min[0] ? u : min));
  return [nx, nz];
}

export function muoviCerchio(posizione, dx, dz, raggio, scatole) {
  let { x, z } = posizione;
  const r2 = raggio * raggio;
  const passi = Math.max(1, Math.ceil(Math.hypot(dx, dz) / PASSO_MASSIMO));
  for (let i = 0; i < passi; i++) {
    x += dx / passi;
    z += dz / passi;
    for (let giro = 0; giro < 2; giro++) {
      for (let k = 0; k < scatole.length; k++) {
        const s = scatole[k];
        const px = x < s.x0 ? s.x0 : x > s.x1 ? s.x1 : x;
        const pz = z < s.z0 ? s.z0 : z > s.z1 ? s.z1 : z;
        const ex = x - px;
        const ez = z - pz;
        const d2 = ex * ex + ez * ez;
        if (d2 >= r2) continue;
        if (d2 > 1e-9) {
          const d = Math.sqrt(d2);
          x = px + (ex / d) * raggio;
          z = pz + (ez / d) * raggio;
          continue;
        }
        let migliore = x - s.x0;
        let nx = s.x0 - raggio;
        let nz = z;
        if (s.x1 - x < migliore) { migliore = s.x1 - x; nx = s.x1 + raggio; nz = z; }
        if (z - s.z0 < migliore) { migliore = z - s.z0; nx = x; nz = s.z0 - raggio; }
        if (s.z1 - z < migliore) { nx = x; nz = s.z1 + raggio; }
        x = nx;
        z = nz;
      }
    }
  }
  return { x, z };
}

export function vistaLibera(a, b, scatole) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const pianoX = Math.abs(dx) < 1e-9;
  const pianoZ = Math.abs(dz) < 1e-9;
  for (let k = 0; k < scatole.length; k++) {
    const s = scatole[k];
    let entrata = 0;
    let uscita = 1;
    if (pianoX) {
      if (a.x < s.x0 || a.x > s.x1) continue;
    } else {
      let t1 = (s.x0 - a.x) / dx;
      let t2 = (s.x1 - a.x) / dx;
      if (t1 > t2) [t1, t2] = [t2, t1];
      entrata = Math.max(entrata, t1);
      uscita = Math.min(uscita, t2);
    }
    if (pianoZ) {
      if (a.z < s.z0 || a.z > s.z1) continue;
    } else {
      let t1 = (s.z0 - a.z) / dz;
      let t2 = (s.z1 - a.z) / dz;
      if (t1 > t2) [t1, t2] = [t2, t1];
      entrata = Math.max(entrata, t1);
      uscita = Math.min(uscita, t2);
    }
    if (entrata <= uscita) return false;
  }
  return true;
}

export function dentroScatola(x, z, s, margine = 0) {
  return x >= s.x0 - margine && x <= s.x1 + margine && z >= s.z0 - margine && z <= s.z1 + margine;
}

const indici = new WeakMap();
const cellaIndice = v => Math.floor(v / CELLA_INDICE) + SCARTO_INDICE;

export function indiceScatole(scatole) {
  const esistente = indici.get(scatole);
  if (esistente) return esistente;
  const celle = new Map();
  scatole.forEach((s, n) => {
    for (let c = cellaIndice(s.x0); c <= cellaIndice(s.x1); c++) {
      for (let r = cellaIndice(s.z0); r <= cellaIndice(s.z1); r++) {
        const chiave = c * 65536 + r;
        if (!celle.has(chiave)) celle.set(chiave, []);
        celle.get(chiave).push(n);
      }
    }
  });
  const indice = { scatole, celle, visto: new Uint32Array(scatole.length), giro: 0 };
  indici.set(scatole, indice);
  return indice;
}

export function scatoleNelRiquadro(indice, x0, z0, x1, z1) {
  indice.giro = (indice.giro + 1) >>> 0 || 1;
  const trovate = [];
  for (let c = cellaIndice(x0); c <= cellaIndice(x1); c++) {
    for (let r = cellaIndice(z0); r <= cellaIndice(z1); r++) {
      const elenco = indice.celle.get(c * 65536 + r);
      if (!elenco) continue;
      for (const n of elenco) {
        if (indice.visto[n] === indice.giro) continue;
        indice.visto[n] = indice.giro;
        const s = indice.scatole[n];
        if (s.x1 >= x0 && s.x0 <= x1 && s.z1 >= z0 && s.z0 <= z1) trovate.push(n);
      }
    }
  }
  trovate.sort((p, q) => p - q);
  return trovate.map(n => indice.scatole[n]);
}

export const scatoleTra = (indice, a, b) => scatoleNelRiquadro(indice, Math.min(a.x, b.x), Math.min(a.z, b.z), Math.max(a.x, b.x), Math.max(a.z, b.z));

export function scatoleIntorno(indice, posizione, raggio, dx, dz) {
  const r = raggio + Math.abs(dx) + Math.abs(dz) + MARGINE_INTORNO;
  return scatoleNelRiquadro(indice, posizione.x - r, posizione.z - r, posizione.x + r, posizione.z + r);
}
