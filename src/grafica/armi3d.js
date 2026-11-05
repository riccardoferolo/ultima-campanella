import * as THREE from 'three';

function pezzo(gruppo, materiale, l, a, p, x, y, z, rx = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(l, a, p), materiale);
  mesh.position.set(x, y, z);
  mesh.rotation.x = rx;
  gruppo.add(mesh);
  return mesh;
}

function canna(gruppo, materiale, raggio, lunghezza, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(raggio, raggio, lunghezza, 6).rotateX(Math.PI / 2), materiale);
  mesh.position.set(x, y, z);
  gruppo.add(mesh);
  return mesh;
}

const COSTRUTTORI = {
  pistola(g, m) {
    pezzo(g, m.ferro, 0.04, 0.045, 0.19, 0, 0.03, -0.06);
    pezzo(g, m.scuro, 0.034, 0.03, 0.17, 0, 0.0, -0.06);
    pezzo(g, m.scuro, 0.036, 0.12, 0.055, 0, -0.06, 0.02, 0.22);
    pezzo(g, m.scuro, 0.01, 0.012, 0.012, 0, 0.058, -0.145);
    pezzo(g, m.scuro, 0.03, 0.012, 0.012, 0, 0.058, 0.025);
    pezzo(g, m.scuro, 0.01, 0.03, 0.04, 0, -0.025, -0.02);
    return new THREE.Vector3(0, 0.03, -0.16);
  },
  pompa(g, m) {
    canna(g, m.ferro, 0.022, 0.62, 0, 0.04, -0.3);
    canna(g, m.scuro, 0.018, 0.5, 0, 0.0, -0.26);
    pezzo(g, m.legno, 0.06, 0.06, 0.18, 0, 0.0, -0.33);
    pezzo(g, m.ferro, 0.06, 0.08, 0.2, 0, 0.02, 0.03);
    pezzo(g, m.legno, 0.05, 0.12, 0.28, 0, -0.04, 0.24, -0.15);
    return new THREE.Vector3(0, 0.04, -0.62);
  },
  mitra(g, m) {
    pezzo(g, m.ferro, 0.06, 0.08, 0.32, 0, 0.02, -0.05);
    canna(g, m.scuro, 0.016, 0.16, 0, 0.03, -0.28);
    pezzo(g, m.scuro, 0.035, 0.18, 0.05, 0, -0.1, -0.06, 0.15);
    pezzo(g, m.scuro, 0.04, 0.1, 0.05, 0, -0.07, 0.07, 0.3);
    pezzo(g, m.ferro, 0.03, 0.04, 0.2, 0, 0.0, 0.2);
    return new THREE.Vector3(0, 0.03, -0.37);
  },
  assalto(g, m) {
    pezzo(g, m.ferro, 0.06, 0.09, 0.4, 0, 0.02, -0.05);
    canna(g, m.scuro, 0.015, 0.3, 0, 0.04, -0.38);
    pezzo(g, m.legno, 0.06, 0.06, 0.2, 0, 0.0, -0.3);
    pezzo(g, m.scuro, 0.04, 0.2, 0.06, 0, -0.11, -0.08, 0.35);
    pezzo(g, m.legno, 0.05, 0.13, 0.3, 0, -0.03, 0.28, -0.12);
    pezzo(g, m.scuro, 0.02, 0.05, 0.02, 0, 0.09, -0.2);
    return new THREE.Vector3(0, 0.04, -0.54);
  },
  mitragliatrice(g, m) {
    pezzo(g, m.ferro, 0.09, 0.12, 0.5, 0, 0.02, -0.05);
    canna(g, m.scuro, 0.025, 0.5, 0, 0.04, -0.5);
    pezzo(g, m.legno, 0.12, 0.12, 0.14, 0.08, -0.06, -0.02);
    pezzo(g, m.legno, 0.06, 0.14, 0.32, 0, -0.03, 0.34, -0.1);
    pezzo(g, m.scuro, 0.01, 0.15, 0.01, 0.03, -0.06, -0.55, 0.4);
    pezzo(g, m.scuro, 0.01, 0.15, 0.01, -0.03, -0.06, -0.55, 0.4);
    return new THREE.Vector3(0, 0.04, -0.76);
  },
  precisione(g, m) {
    pezzo(g, m.legno, 0.06, 0.08, 0.6, 0, 0.0, -0.05);
    canna(g, m.ferro, 0.014, 0.5, 0, 0.03, -0.55);
    canna(g, m.scuro, 0.03, 0.3, 0, 0.1, -0.08);
    pezzo(g, m.legno, 0.05, 0.14, 0.3, 0, -0.04, 0.32, -0.1);
    return new THREE.Vector3(0, 0.03, -0.8);
  },
  raggi(g, m) {
    canna(g, m.cromo, 0.035, 0.2, 0, 0.03, -0.08);
    for (const z of [-0.03, -0.09, -0.15]) {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 4, 10), m.energia);
      anello.position.set(0, 0.03, z);
      g.add(anello);
    }
    const bocca = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.08, 10, 1, true).rotateX(-Math.PI / 2), m.cromo);
    bocca.position.set(0, 0.03, -0.21);
    g.add(bocca);
    const punta = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), m.energia);
    punta.position.set(0, 0.03, -0.2);
    g.add(punta);
    const serbatoio = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), m.vetroEnergia);
    serbatoio.position.set(0, 0.07, 0.0);
    g.add(serbatoio);
    pezzo(g, m.scuro, 0.034, 0.11, 0.05, 0, -0.05, 0.03, 0.25);
    pezzo(g, m.cromo, 0.012, 0.04, 0.06, 0, 0.085, -0.04);
    return new THREE.Vector3(0, 0.03, -0.25);
  },
  coltello(g, m) {
    pezzo(g, m.lama, 0.006, 0.035, 0.22, 0, 0, -0.12);
    pezzo(g, m.scuro, 0.03, 0.035, 0.1, 0, 0, 0.04);
    return new THREE.Vector3(0, 0, -0.23);
  },
};

export function creaMaterialiArmi(texture) {
  return {
    ferro: new THREE.MeshLambertMaterial({ map: texture.metallo }),
    scuro: new THREE.MeshLambertMaterial({ color: 0x1d1f22 }),
    legno: new THREE.MeshLambertMaterial({ map: texture.legnoChiaro }),
    lama: new THREE.MeshLambertMaterial({ color: 0xc8ccd0 }),
    pelle: new THREE.MeshLambertMaterial({ color: 0xc89474 }),
    cromo: new THREE.MeshLambertMaterial({ color: 0xc9d1d8 }),
    energia: new THREE.MeshBasicMaterial({ color: 0x48e5ff }),
    vetroEnergia: new THREE.MeshBasicMaterial({ color: 0x7ef0ff, transparent: true, opacity: 0.75 }),
    manica: new THREE.MeshLambertMaterial({ color: 0x3d4a33 }),
  };
}

export function creaBraccio(materiali) {
  const gruppo = new THREE.Group();
  pezzo(gruppo, materiali.pelle, 0.05, 0.06, 0.09, 0, -0.07, 0.03);
  pezzo(gruppo, materiali.pelle, 0.055, 0.055, 0.2, 0.01, -0.11, 0.14, -0.35);
  pezzo(gruppo, materiali.manica, 0.075, 0.075, 0.3, 0.03, -0.18, 0.36, -0.35);
  return gruppo;
}

export function modelloArma(tipo, materiali) {
  const gruppo = new THREE.Group();
  const bocca = COSTRUTTORI[tipo](gruppo, materiali);
  return { gruppo, bocca };
}
