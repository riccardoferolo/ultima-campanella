const PASSO_MASSIMO = 0.2;

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
  const passi = Math.max(1, Math.ceil(Math.hypot(dx, dz) / PASSO_MASSIMO));
  for (let i = 0; i < passi; i++) {
    x += dx / passi;
    z += dz / passi;
    for (let giro = 0; giro < 2; giro++) {
      for (const s of scatole) [x, z] = spingiFuori(x, z, raggio, s);
    }
  }
  return { x, z };
}

export function vistaLibera(a, b, scatole) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  for (const s of scatole) {
    let entrata = 0;
    let uscita = 1;
    let fuori = false;
    for (const [origine, verso, min, max] of [[a.x, dx, s.x0, s.x1], [a.z, dz, s.z0, s.z1]]) {
      if (Math.abs(verso) < 1e-9) {
        if (origine < min || origine > max) fuori = true;
        continue;
      }
      let t1 = (min - origine) / verso;
      let t2 = (max - origine) / verso;
      if (t1 > t2) [t1, t2] = [t2, t1];
      entrata = Math.max(entrata, t1);
      uscita = Math.min(uscita, t2);
    }
    if (!fuori && entrata <= uscita) return false;
  }
  return true;
}

export function dentroScatola(x, z, s, margine = 0) {
  return x >= s.x0 - margine && x <= s.x1 + margine && z >= s.z0 - margine && z <= s.z1 + margine;
}
