import * as THREE from 'three';
import { R, ARMI } from '../regole.js';
import { ACQUISTI } from '../mappa.js';
import { texturaTesto } from './texture.js';
import { modelloArma } from './armi3d.js';
import { creaDistributore } from './bibite3d.js';

const orientamento = (mesh, verso) => { mesh.rotation.y = Math.atan2(verso.x, verso.z); };

function armaAppesa(scena, a, materialiArmi, legno) {
  const supporto = new THREE.Group();
  supporto.position.set(a.posizione.x, 0, a.posizione.z);
  orientamento(supporto, a.verso);
  const { gruppo, lunghezza } = modelloArma(a.arma, materialiArmi);
  gruppo.rotation.y = Math.PI / 2;
  gruppo.position.set(-lunghezza * 0.12, 1.55, 0.08);
  const cornice = new THREE.Mesh(new THREE.PlaneGeometry(Math.max(0.7, lunghezza + 0.25), 0.62), legno);
  cornice.position.set(0, 1.5, 0.012);
  const gesso = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.22), new THREE.MeshBasicMaterial({
    map: texturaTesto([ARMI[a.arma].nome.toUpperCase(), `${a.costo}`], { larghezza: 160, altezza: 36, colore: '#ecebe2', font: 'bold 12px monospace' }), transparent: true,
  }));
  gesso.position.set(0, 1.08, 0.015);
  supporto.add(cornice, gruppo, gesso);
  scena.add(supporto);
}

function vetrinaArma(contenitore, materialiArmi, scala) {
  const modelli = new Map();
  let mostrata = null;
  return (arma, posizione, rotazione) => {
    if (mostrata !== arma) {
      modelli.forEach(m => { m.visible = false; });
      if (arma) {
        if (!modelli.has(arma)) {
          const { gruppo } = modelloArma(arma, materialiArmi);
          gruppo.scale.setScalar(scala);
          contenitore.add(gruppo);
          modelli.set(arma, gruppo);
        }
        modelli.get(arma).visible = true;
      }
      mostrata = arma;
    }
    if (!arma) return;
    const g = modelli.get(arma);
    g.position.copy(posizione);
    g.rotation.y = rotazione;
  };
}

export function creaMacchine(scena, { materialiArmi, oggetti, metallo, legno }) {
  for (const a of ACQUISTI) {
    if (a.tipo === 'arma') armaAppesa(scena, a, materialiArmi, legno);
    else if (a.tipo === 'bevanda') {
      const macchina = creaDistributore(a.bevanda);
      macchina.position.set(a.posizione.x, 0, a.posizione.z);
      orientamento(macchina, a.verso);
      scena.add(macchina);
    }
  }

  const potenziatoreDati = ACQUISTI.find(a => a.tipo === 'potenziatore');
  const macchina = new THREE.Group();
  const corpoMacchina = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.9, 1.15), metallo);
  corpoMacchina.position.y = 0.95;
  const schermo = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.45), new THREE.MeshBasicMaterial({
    map: texturaTesto(['POTENZIATORE', `${R.COSTO_POTENZIA}`], { larghezza: 128, altezza: 48, sfondo: '#1a0b2e', colore: '#d6b8ff', font: 'bold 12px monospace', bordo: '#7d3cff' }),
  }));
  schermo.position.set(0, 1.55, 0.58);
  const anello = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 6, 18), new THREE.MeshBasicMaterial({ color: 0x3a2060 }));
  anello.position.set(0, 0.9, 0.6);
  const luceMacchina = new THREE.PointLight(0xa45cff, 0, 5, 1.5);
  luceMacchina.position.set(0, 1.4, 1);
  macchina.add(corpoMacchina, schermo, anello, luceMacchina);
  macchina.position.set(potenziatoreDati.posizione.x, 0, potenziatoreDati.posizione.z);
  orientamento(macchina, potenziatoreDati.verso);
  scena.add(macchina);
  const armaInMacchina = vetrinaArma(macchina, materialiArmi, 1.2);

  const cassaDati = ACQUISTI.find(a => a.tipo === 'cassa');
  const cassa = new THREE.Group();
  const fondo = oggetti.get('old_military_crate')?.clone() ?? oggetti.get('wooden_military_crate')?.clone() ?? new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.6), legno);
  fondo.scale.setScalar(oggetti.has('old_military_crate') ? 0.62 : 1);
  const perno = new THREE.Group();
  perno.position.set(0, 0.56, -0.3);
  const punto = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ map: texturaTesto(['?'], { larghezza: 32, altezza: 32, colore: '#7dd3fc', font: 'bold 28px monospace' }), transparent: true }));
  punto.position.set(0, 0.6, 0.05);
  const alone = new THREE.PointLight(0x7dd3fc, 0, 4, 1.5);
  alone.position.set(0, 1, 0.3);
  cassa.add(fondo, perno, punto, alone);
  cassa.position.set(cassaDati.posizione.x, 0, cassaDati.posizione.z);
  orientamento(cassa, cassaDati.verso);
  scena.add(cassa);
  const armaInCassa = vetrinaArma(cassa, materialiArmi, 1.15);
  const sopra = new THREE.Vector3();

  return {
    aggiorna(vista, dt, tempo) {
      const lavora = vista.potenziatore.stato === 'lavora';
      anello.material.color.setHex(!vista.corrente ? 0x3a2060 : lavora ? 0xe0b0ff : 0xa45cff);
      anello.rotation.z += dt * (lavora ? 9 : vista.corrente ? 1 : 0);
      luceMacchina.intensity = !vista.corrente ? 0 : lavora ? 6 + Math.sin(tempo * 20) * 3 : 2.5;
      armaInMacchina(vista.potenziatore.stato === 'pronta' ? vista.potenziatore.arma : null, sopra.set(0, 2.25 + Math.sin(tempo * 2) * 0.05, 0.2), tempo * 1.8);
      const aperta = vista.cassa.stato === 'aperta';
      perno.rotation.x = THREE.MathUtils.lerp(perno.rotation.x, aperta ? -1.3 : 0, Math.min(1, dt * 6));
      alone.intensity = aperta ? 3 + Math.sin(tempo * 6) : 0.6;
      armaInCassa(aperta ? vista.cassa.arma : null, sopra.set(0, 1.15 + Math.sin(tempo * 2) * 0.05, 0), tempo * 1.5);
    },
  };
}
