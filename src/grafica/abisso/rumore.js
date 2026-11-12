const F3 = 1 / 3;
const G3 = 1 / 6;
const GRADIENTI = new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]);

export function creaRumore(seme = 1) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seme >>> 0 || 1;
  for (let i = 255; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  const permMod = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod[i] = perm[i] % 12;
  }

  function rumore3(x, y, z) {
    const s3 = (x + y + z) * F3;
    const i = Math.floor(x + s3);
    const j = Math.floor(y + s3);
    const k = Math.floor(z + s3);
    const t = (i + j + k) * G3;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    const z0 = z - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    let n = 0;
    let q = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (q > 0) {
      const g = permMod[ii + perm[jj + perm[kk]]] * 3;
      q *= q;
      n += q * q * (GRADIENTI[g] * x0 + GRADIENTI[g + 1] * y0 + GRADIENTI[g + 2] * z0);
    }
    q = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (q > 0) {
      const g = permMod[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
      q *= q;
      n += q * q * (GRADIENTI[g] * x1 + GRADIENTI[g + 1] * y1 + GRADIENTI[g + 2] * z1);
    }
    q = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (q > 0) {
      const g = permMod[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
      q *= q;
      n += q * q * (GRADIENTI[g] * x2 + GRADIENTI[g + 1] * y2 + GRADIENTI[g + 2] * z2);
    }
    q = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (q > 0) {
      const g = permMod[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
      q *= q;
      n += q * q * (GRADIENTI[g] * x3 + GRADIENTI[g + 1] * y3 + GRADIENTI[g + 2] * z3);
    }
    return 32 * n;
  }

  function fbm(x, y, z, ottave = 5, lacunarita = 2, guadagno = 0.5) {
    let somma = 0;
    let ampiezza = 1;
    let frequenza = 1;
    let totale = 0;
    for (let o = 0; o < ottave; o++) {
      somma += rumore3(x * frequenza, y * frequenza, z * frequenza) * ampiezza;
      totale += ampiezza;
      ampiezza *= guadagno;
      frequenza *= lacunarita;
    }
    return somma / totale;
  }

  function creste(x, y, z, ottave = 5) {
    let somma = 0;
    let ampiezza = 0.5;
    let frequenza = 1;
    let peso = 1;
    for (let o = 0; o < ottave; o++) {
      let v = 1 - Math.abs(rumore3(x * frequenza, y * frequenza, z * frequenza));
      v *= v * peso;
      peso = Math.min(1, Math.max(0, v * 2));
      somma += v * ampiezza;
      ampiezza *= 0.5;
      frequenza *= 2.03;
    }
    return somma;
  }

  function cellule(x, y, z) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    let primo = 9;
    let secondo = 9;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const cx = xi + dx;
      const cy = yi + dy;
      const cz = zi + dz;
      const h = perm[(cx & 255) + perm[(cy & 255) + perm[cz & 255]]];
      const px = cx + (h / 255) - x;
      const py = cy + (perm[h + 17] / 255) - y;
      const pz = cz + (perm[h + 101] / 255) - z;
      const d = px * px + py * py + pz * pz;
      if (d < primo) {
        secondo = primo;
        primo = d;
      } else if (d < secondo) secondo = d;
    }
    return [Math.sqrt(primo), Math.sqrt(secondo)];
  }

  return { rumore3, fbm, creste, cellule };
}
