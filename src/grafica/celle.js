import * as THREE from 'three';

const LATO_CELLA = 20;

export function istanzeACelle(scena, geometria, materiale, voci, lato = LATO_CELLA) {
  const celle = new Map();
  const posizione = new THREE.Vector3();
  for (const voce of voci) {
    posizione.setFromMatrixPosition(voce.matrice);
    const chiave = `${Math.floor(posizione.x / lato)}|${Math.floor(posizione.z / lato)}`;
    if (!celle.has(chiave)) celle.set(chiave, []);
    celle.get(chiave).push(voce);
  }
  const tinta = new THREE.Color();
  const create = [];
  for (const gruppo of celle.values()) {
    const istanze = new THREE.InstancedMesh(geometria, materiale, gruppo.length);
    gruppo.forEach((voce, i) => {
      istanze.setMatrixAt(i, voce.matrice);
      if (voce.colore !== undefined) istanze.setColorAt(i, tinta.setHex(voce.colore));
    });
    istanze.computeBoundingSphere();
    scena.add(istanze);
    create.push(istanze);
  }
  return create;
}
