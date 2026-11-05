import * as THREE from 'three';

function pezzo(gruppo, materiale, l, a, p, x, y, z, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(l, a, p), materiale);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  gruppo.add(mesh);
  return mesh;
}

function canna(gruppo, materiale, raggio, lunghezza, x, y, z, lati = 8) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(raggio, raggio, lunghezza, lati).rotateX(Math.PI / 2), materiale);
  mesh.position.set(x, y, z);
  gruppo.add(mesh);
  return mesh;
}

function caricatoreCurvo(gruppo, materiale, x, y, z, segmenti, largo, alto, profondo, curva) {
  for (let i = 0; i < segmenti; i++) pezzo(gruppo, materiale, largo, alto, profondo, x, y - i * alto * 0.9, z - i * curva, -i * 0.12);
}

function guardiaGrilletto(gruppo, m, z) {
  pezzo(gruppo, m.scuro, 0.026, 0.005, 0.045, 0, -0.03, z);
  pezzo(gruppo, m.scuro, 0.026, 0.026, 0.005, 0, -0.018, z - 0.022);
  pezzo(gruppo, m.ferro, 0.005, 0.018, 0.005, 0, -0.012, z + 0.004, 0.3);
}

const COSTRUTTORI = {
  pistola(g, m) {
    pezzo(g, m.ferro, 0.038, 0.04, 0.19, 0, 0.035, -0.06);
    for (let i = 0; i < 4; i++) pezzo(g, m.foro, 0.04, 0.03, 0.003, 0, 0.035, 0.01 + i * 0.007);
    pezzo(g, m.foro, 0.039, 0.012, 0.035, 0, 0.042, -0.07);
    pezzo(g, m.scuro, 0.033, 0.026, 0.16, 0, 0.004, -0.055);
    canna(g, m.scuro, 0.009, 0.02, 0, 0.035, -0.158);
    pezzo(g, m.scuro, 0.033, 0.11, 0.048, 0, -0.055, 0.026, 0.22);
    pezzo(g, m.impugnatura, 0.037, 0.08, 0.036, 0, -0.058, 0.03, 0.22);
    pezzo(g, m.ferro, 0.035, 0.008, 0.05, 0, -0.11, 0.04, 0.22);
    guardiaGrilletto(g, m, -0.025);
    pezzo(g, m.scuro, 0.012, 0.016, 0.012, 0, 0.052, 0.04, -0.4);
    pezzo(g, m.scuro, 0.006, 0.012, 0.01, 0, 0.061, -0.145);
    pezzo(g, m.scuro, 0.008, 0.012, 0.01, 0.011, 0.061, 0.022);
    pezzo(g, m.scuro, 0.008, 0.012, 0.01, -0.011, 0.061, 0.022);
    return { bocca: new THREE.Vector3(0, 0.035, -0.17), presa: new THREE.Vector3(-0.03, -0.07, 0.035) };
  },
  pompa(g, m) {
    pezzo(g, m.ferro, 0.055, 0.075, 0.22, 0, 0.02, 0.02);
    pezzo(g, m.foro, 0.056, 0.022, 0.07, 0, 0.035, -0.01);
    canna(g, m.ferro, 0.019, 0.62, 0, 0.045, -0.33);
    canna(g, m.scuro, 0.016, 0.5, 0, 0.006, -0.28);
    pezzo(g, m.legno, 0.062, 0.058, 0.17, 0, 0.006, -0.32);
    for (let i = 0; i < 4; i++) pezzo(g, m.foro, 0.064, 0.06, 0.006, 0, 0.006, -0.38 + i * 0.035);
    const mirino = new THREE.Mesh(new THREE.SphereGeometry(0.007, 6, 4), m.ferro);
    mirino.position.set(0, 0.068, -0.63);
    g.add(mirino);
    guardiaGrilletto(g, m, 0.06);
    pezzo(g, m.legno, 0.045, 0.1, 0.07, 0, -0.04, 0.13, 0.35);
    pezzo(g, m.legno, 0.05, 0.11, 0.26, 0, -0.04, 0.27, -0.12);
    pezzo(g, m.scuro, 0.052, 0.12, 0.02, 0, -0.055, 0.405, -0.12);
    return { bocca: new THREE.Vector3(0, 0.045, -0.64), presa: new THREE.Vector3(0, -0.035, -0.32) };
  },
  mitra(g, m) {
    pezzo(g, m.ferro, 0.055, 0.075, 0.3, 0, 0.02, -0.04);
    pezzo(g, m.foro, 0.056, 0.02, 0.06, 0, 0.035, -0.04);
    canna(g, m.scuro, 0.021, 0.12, 0, 0.03, -0.25);
    for (let i = 0; i < 4; i++) pezzo(g, m.foro, 0.044, 0.008, 0.012, 0, 0.03, -0.21 - i * 0.025);
    canna(g, m.ferro, 0.011, 0.05, 0, 0.03, -0.33);
    caricatoreCurvo(g, m.scuro, 0, -0.06, -0.08, 3, 0.03, 0.055, 0.045, 0.012);
    pezzo(g, m.scuro, 0.034, 0.1, 0.045, 0, -0.07, 0.07, 0.3);
    guardiaGrilletto(g, m, 0.02);
    pezzo(g, m.scuro, 0.03, 0.08, 0.03, 0, -0.06, -0.17);
    pezzo(g, m.ferro, 0.006, 0.006, 0.2, 0.022, 0.0, 0.2);
    pezzo(g, m.ferro, 0.006, 0.006, 0.2, -0.022, 0.0, 0.2);
    pezzo(g, m.scuro, 0.05, 0.07, 0.012, 0, -0.01, 0.3);
    pezzo(g, m.scuro, 0.008, 0.018, 0.008, 0, 0.065, -0.17);
    const diottra = new THREE.Mesh(new THREE.TorusGeometry(0.01, 0.003, 4, 8), m.scuro);
    diottra.position.set(0, 0.068, 0.07);
    g.add(diottra);
    return { bocca: new THREE.Vector3(0, 0.03, -0.36), presa: new THREE.Vector3(0, -0.09, -0.17) };
  },
  assalto(g, m) {
    pezzo(g, m.ferro, 0.055, 0.08, 0.34, 0, 0.02, -0.03);
    pezzo(g, m.foro, 0.056, 0.022, 0.08, 0, 0.035, -0.02);
    pezzo(g, m.legno, 0.062, 0.066, 0.22, 0, 0.012, -0.29);
    for (let i = 0; i < 5; i++) pezzo(g, m.foro, 0.064, 0.012, 0.016, 0, 0.03, -0.21 - i * 0.04);
    canna(g, m.scuro, 0.013, 0.2, 0, 0.035, -0.48);
    canna(g, m.ferro, 0.018, 0.05, 0, 0.035, -0.59);
    pezzo(g, m.scuro, 0.02, 0.03, 0.025, 0, 0.055, -0.42);
    pezzo(g, m.scuro, 0.008, 0.045, 0.008, 0, 0.085, -0.42);
    pezzo(g, m.scuro, 0.03, 0.025, 0.04, 0, 0.072, 0.08);
    caricatoreCurvo(g, m.scuro, 0, -0.065, -0.07, 4, 0.032, 0.05, 0.05, 0.015);
    pezzo(g, m.scuro, 0.035, 0.1, 0.045, 0, -0.065, 0.08, 0.3);
    guardiaGrilletto(g, m, 0.03);
    pezzo(g, m.legno, 0.05, 0.12, 0.3, 0, -0.025, 0.3, -0.1);
    pezzo(g, m.scuro, 0.052, 0.13, 0.02, 0, -0.04, 0.455, -0.1);
    return { bocca: new THREE.Vector3(0, 0.035, -0.62), presa: new THREE.Vector3(0, -0.035, -0.28) };
  },
  mitragliatrice(g, m) {
    pezzo(g, m.ferro, 0.085, 0.11, 0.42, 0, 0.02, -0.05);
    canna(g, m.scuro, 0.036, 0.42, 0, 0.04, -0.46, 10);
    for (let i = 0; i < 6; i++) pezzo(g, m.foro, 0.074, 0.014, 0.022, 0, 0.04, -0.32 - i * 0.055);
    canna(g, m.ferro, 0.014, 0.1, 0, 0.04, -0.71);
    canna(g, m.scuro, 0.022, 0.04, 0, 0.04, -0.77);
    pezzo(g, m.legno, 0.11, 0.12, 0.14, 0.09, -0.05, -0.03);
    pezzo(g, m.scuro, 0.112, 0.02, 0.142, 0.09, 0.005, -0.03);
    pezzo(g, m.scuro, 0.01, 0.05, 0.01, 0, 0.1, -0.12);
    pezzo(g, m.scuro, 0.01, 0.05, 0.01, 0, 0.1, 0.04);
    pezzo(g, m.scuro, 0.012, 0.012, 0.17, 0, 0.125, -0.04);
    pezzo(g, m.scuro, 0.01, 0.2, 0.01, 0.03, -0.04, -0.6, 1.3);
    pezzo(g, m.scuro, 0.01, 0.2, 0.01, -0.03, -0.04, -0.6, 1.3);
    pezzo(g, m.scuro, 0.04, 0.11, 0.05, 0, -0.07, 0.11, 0.3);
    guardiaGrilletto(g, m, 0.06);
    pezzo(g, m.legno, 0.06, 0.13, 0.3, 0, -0.03, 0.33, -0.08);
    return { bocca: new THREE.Vector3(0, 0.04, -0.8), presa: new THREE.Vector3(0, -0.02, -0.3) };
  },
  precisione(g, m) {
    pezzo(g, m.legno, 0.058, 0.07, 0.55, 0, 0.0, -0.06);
    pezzo(g, m.legno, 0.05, 0.13, 0.3, 0, -0.04, 0.32, -0.1);
    pezzo(g, m.legno, 0.04, 0.03, 0.15, 0, 0.035, 0.28);
    pezzo(g, m.scuro, 0.052, 0.14, 0.02, 0, -0.055, 0.475, -0.1);
    canna(g, m.ferro, 0.014, 0.5, 0, 0.035, -0.55);
    canna(g, m.scuro, 0.02, 0.06, 0, 0.035, -0.82);
    canna(g, m.scuro, 0.024, 0.32, 0, 0.1, -0.07);
    canna(g, m.scuro, 0.032, 0.06, 0, 0.1, -0.25);
    canna(g, m.scuro, 0.03, 0.05, 0, 0.1, 0.1);
    const lente = new THREE.Mesh(new THREE.CircleGeometry(0.027, 10), m.vetro);
    lente.position.set(0, 0.1, -0.281);
    lente.rotation.y = Math.PI;
    g.add(lente);
    pezzo(g, m.scuro, 0.03, 0.04, 0.02, 0, 0.065, -0.17);
    pezzo(g, m.scuro, 0.03, 0.04, 0.02, 0, 0.065, 0.02);
    const otturatore = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 6).rotateZ(Math.PI / 2), m.ferro);
    otturatore.position.set(0.045, 0.03, 0.08);
    const pomello = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 4), m.ferro);
    pomello.position.set(0.075, 0.03, 0.08);
    g.add(otturatore, pomello);
    guardiaGrilletto(g, m, 0.12);
    return { bocca: new THREE.Vector3(0, 0.035, -0.86), presa: new THREE.Vector3(0, -0.04, -0.3) };
  },
  raggi(g, m) {
    canna(g, m.cromo, 0.035, 0.2, 0, 0.03, -0.08, 12);
    for (const z of [-0.03, -0.09, -0.15]) {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 4, 12), m.energia);
      anello.position.set(0, 0.03, z);
      g.add(anello);
    }
    for (const r of [0, 2.1, 4.2]) pezzo(g, m.cromo, 0.006, 0.035, 0.07, Math.sin(r) * 0.045, 0.03 + Math.cos(r) * 0.045, 0.02, 0, 0, -r);
    const bocca = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.08, 12, 1, true).rotateX(-Math.PI / 2), m.cromo);
    bocca.position.set(0, 0.03, -0.21);
    g.add(bocca);
    const punta = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), m.energia);
    punta.position.set(0, 0.03, -0.2);
    g.add(punta);
    const serbatoio = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), m.vetroEnergia);
    serbatoio.position.set(0, 0.07, 0.0);
    g.add(serbatoio);
    pezzo(g, m.scuro, 0.034, 0.11, 0.05, 0, -0.05, 0.03, 0.25);
    pezzo(g, m.impugnatura, 0.037, 0.08, 0.04, 0, -0.055, 0.035, 0.25);
    guardiaGrilletto(g, m, -0.02);
    pezzo(g, m.cromo, 0.012, 0.04, 0.06, 0, 0.085, -0.04);
    return { bocca: new THREE.Vector3(0, 0.03, -0.25), presa: new THREE.Vector3(-0.03, -0.07, 0.04) };
  },
  coltello(g, m) {
    pezzo(g, m.lama, 0.006, 0.035, 0.22, 0, 0, -0.12);
    pezzo(g, m.lama, 0.004, 0.012, 0.2, 0, 0.022, -0.11);
    pezzo(g, m.ferro, 0.03, 0.05, 0.01, 0, 0, -0.005);
    pezzo(g, m.impugnatura, 0.026, 0.032, 0.1, 0, 0, 0.05);
    return { bocca: new THREE.Vector3(0, 0, -0.23), presa: null };
  },
};

export function creaMaterialiArmi(texture) {
  return {
    ferro: new THREE.MeshLambertMaterial({ map: texture.metallo }),
    scuro: new THREE.MeshLambertMaterial({ color: 0x1d1f22 }),
    foro: new THREE.MeshBasicMaterial({ color: 0x050505 }),
    legno: new THREE.MeshLambertMaterial({ map: texture.legnoChiaro }),
    impugnatura: new THREE.MeshLambertMaterial({ color: 0x2e2018 }),
    lama: new THREE.MeshLambertMaterial({ color: 0xc8ccd0 }),
    vetro: new THREE.MeshBasicMaterial({ color: 0x4f86b8 }),
    pelle: new THREE.MeshLambertMaterial({ color: 0xc89474 }),
    cromo: new THREE.MeshLambertMaterial({ color: 0xc9d1d8 }),
    energia: new THREE.MeshBasicMaterial({ color: 0x48e5ff }),
    vetroEnergia: new THREE.MeshBasicMaterial({ color: 0x7ef0ff, transparent: true, opacity: 0.75 }),
    manica: new THREE.MeshLambertMaterial({ color: 0x3d4a33 }),
    ferroPotenziato: new THREE.MeshLambertMaterial({ map: texture.metallo, color: 0xc9a2ff, emissive: 0x4a1490 }),
    scuroPotenziato: new THREE.MeshLambertMaterial({ color: 0x2b1146, emissive: 0x2a0060 }),
    legnoPotenziato: new THREE.MeshLambertMaterial({ map: texture.legnoChiaro, color: 0xb07cff, emissive: 0x3a0a70 }),
    cromoPotenziato: new THREE.MeshLambertMaterial({ color: 0xe2c9ff, emissive: 0x5a20a0 }),
  };
}

export function creaBraccio(materiali) {
  const gruppo = new THREE.Group();
  pezzo(gruppo, materiali.pelle, 0.05, 0.06, 0.09, 0, -0.07, 0.03);
  for (let i = 0; i < 3; i++) pezzo(gruppo, materiali.pelle, 0.052, 0.014, 0.02, 0.004, -0.045 - i * 0.017, -0.012);
  pezzo(gruppo, materiali.pelle, 0.055, 0.055, 0.2, 0.01, -0.11, 0.14, -0.35);
  pezzo(gruppo, materiali.manica, 0.075, 0.075, 0.3, 0.03, -0.18, 0.36, -0.35);
  return gruppo;
}

export function creaManoSinistra(materiali) {
  const gruppo = new THREE.Group();
  pezzo(gruppo, materiali.pelle, 0.06, 0.035, 0.05, -0.008, -0.022, 0);
  for (let i = 0; i < 3; i++) pezzo(gruppo, materiali.pelle, 0.064, 0.01, 0.013, -0.006, -0.002, -0.018 + i * 0.017);
  pezzo(gruppo, materiali.pelle, 0.038, 0.038, 0.08, -0.04, -0.045, 0.035, -0.6, 0.8);
  pezzo(gruppo, materiali.manica, 0.06, 0.06, 0.36, -0.17, -0.15, 0.16, -0.6, 0.8);
  return gruppo;
}

export function modelloArma(tipo, materiali) {
  const gruppo = new THREE.Group();
  const potenziata = tipo.endsWith('+');
  const base = potenziata ? tipo.slice(0, -1) : tipo;
  const usati = potenziata
    ? { ...materiali, ferro: materiali.ferroPotenziato, scuro: materiali.scuroPotenziato, legno: materiali.legnoPotenziato, cromo: materiali.cromoPotenziato, impugnatura: materiali.scuroPotenziato }
    : materiali;
  const { bocca, presa } = COSTRUTTORI[base](gruppo, usati);
  return { gruppo, bocca, presa };
}
