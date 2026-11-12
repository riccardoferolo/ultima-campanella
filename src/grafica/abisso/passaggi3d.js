import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { R } from '../../regole.js';
import { quota } from '../../mappa.js';
import { FINESTRE, PORTE, CARTELLO_PRONTI, SALA } from '../../mappe/abisso.js';
import { texturaTesto } from '../texture.js';
import { creaCaso } from '../caso-grafica.js';

const ALTEZZA_BOCCAPORTO = 2.4;
const ALTEZZA_PARATIA = 3.1;
const ALTEZZA_PORTALE = 4.2;
const SALITA_PARATIA = 3.3;
const VELOCITA_APERTURA = 0.9;
const BULLONI_PER_LATO = 7;
const PIASTRA_ALTA = 0.34;

function telaioBoccaporto(largo, alto, spessore) {
  const forma = new THREE.Shape();
  const r = 0.35;
  const l = largo / 2 + 0.22;
  forma.moveTo(-l + r, -0.18);
  forma.lineTo(l - r, -0.18);
  forma.quadraticCurveTo(l, -0.18, l, r - 0.18);
  forma.lineTo(l, alto + 0.18 - r);
  forma.quadraticCurveTo(l, alto + 0.18, l - r, alto + 0.18);
  forma.lineTo(-l + r, alto + 0.18);
  forma.quadraticCurveTo(-l, alto + 0.18, -l, alto + 0.18 - r);
  forma.lineTo(-l, r - 0.18);
  forma.quadraticCurveTo(-l, -0.18, -l + r, -0.18);
  const buco = new THREE.Path();
  const lb = largo / 2;
  const rb = 0.25;
  buco.moveTo(-lb + rb, 0);
  buco.lineTo(lb - rb, 0);
  buco.quadraticCurveTo(lb, 0, lb, rb);
  buco.lineTo(lb, alto - rb);
  buco.quadraticCurveTo(lb, alto, lb - rb, alto);
  buco.lineTo(-lb + rb, alto);
  buco.quadraticCurveTo(-lb, alto, -lb, alto - rb);
  buco.lineTo(-lb, rb);
  buco.quadraticCurveTo(-lb, 0, -lb + rb, 0);
  forma.holes.push(buco);
  const g = new THREE.ExtrudeGeometry(forma, { depth: spessore, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 8 });
  g.translate(0, 0, -spessore / 2);
  return g;
}

function bulloni(largo, alto) {
  const testa = new THREE.CylinderGeometry(0.035, 0.04, 0.05, 8).rotateX(Math.PI / 2);
  const pezzi = [];
  for (let i = 0; i < BULLONI_PER_LATO; i++) {
    const f = i / (BULLONI_PER_LATO - 1);
    for (const s of [-1, 1]) {
      pezzi.push(testa.clone().translate(s * (largo / 2 + 0.11), f * alto, 0.2));
      pezzi.push(testa.clone().translate((f - 0.5) * largo, s > 0 ? alto + 0.09 : -0.09, 0.2));
    }
  }
  return pezzi;
}

function geometriaPiastra() {
  const g = new RoundedBoxGeometry(1, PIASTRA_ALTA, 0.06, 2, 0.02);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    p.setZ(i, p.getZ(i) + Math.sin(x * 9.1 + y * 3.3) * 0.006);
  }
  g.computeVertexNormals();
  return g;
}

function geometriaParatia(largo, alto) {
  const forma = new THREE.Shape();
  const r = 0.4;
  forma.moveTo(-largo / 2, 0);
  forma.lineTo(largo / 2, 0);
  forma.lineTo(largo / 2, alto - r);
  forma.quadraticCurveTo(largo / 2, alto, largo / 2 - r, alto);
  forma.lineTo(-largo / 2 + r, alto);
  forma.quadraticCurveTo(-largo / 2, alto, -largo / 2, alto - r);
  forma.lineTo(-largo / 2, 0);
  const g = new THREE.ExtrudeGeometry(forma, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3, curveSegments: 10 });
  g.translate(0, 0, -0.11);
  return g;
}

function texturaStrisce() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 32;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d8a21a';
  ctx.fillRect(0, 0, 256, 32);
  ctx.fillStyle = '#141414';
  for (let x = -32; x < 288; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 32);
    ctx.lineTo(x + 16, 0);
    ctx.lineTo(x + 32, 0);
    ctx.lineTo(x + 16, 32);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

function volantino(materiale) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.03, 10, 28), materiale));
  for (let i = 0; i < 3; i++) {
    const raggio = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 8), materiale);
    raggio.rotation.z = (i / 3) * Math.PI;
    g.add(raggio);
  }
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12).rotateX(Math.PI / 2), materiale));
  return g;
}

function costruisciParatia(kit, porta, strisce) {
  const s = porta.scatola;
  const orizz = s.x1 - s.x0 >= s.z1 - s.z0;
  const largo = (orizz ? s.x1 - s.x0 : s.z1 - s.z0) + 0.1;
  const base = quota(porta.centro.x, porta.centro.z);
  const radice = new THREE.Group();
  radice.position.set(porta.centro.x, base, porta.centro.z);
  radice.rotation.y = orizz ? 0 : Math.PI / 2;
  const anta = new THREE.Group();
  const lastra = new THREE.Mesh(kit.uvMetri(geometriaParatia(largo, ALTEZZA_PARATIA)), kit.mat.paratia);
  anta.add(lastra);
  const fascia = new THREE.Mesh(new THREE.PlaneGeometry(largo - 0.1, 0.32), new THREE.MeshStandardMaterial({ map: strisce, roughness: 0.6, metalness: 0.3 }));
  strisce.repeat.set(largo / 1.2, 1);
  for (const lato of [-1, 1]) {
    const f = fascia.clone();
    f.position.set(0, 0.25, lato * 0.16);
    f.rotation.y = lato > 0 ? 0 : Math.PI;
    anta.add(f);
    const ruota = volantino(kit.mat.ottone);
    ruota.position.set(0, 1.5, lato * 0.2);
    anta.add(ruota);
    const oblo = new THREE.Mesh(new THREE.CircleGeometry(0.22, 24), kit.mat.luceFredda);
    oblo.position.set(0, 2.35, lato * 0.17);
    oblo.rotation.y = lato > 0 ? 0 : Math.PI;
    anta.add(oblo);
    const cornice = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 8, 24), kit.mat.ottone);
    cornice.position.copy(oblo.position);
    anta.add(cornice);
  }
  for (const b of bulloni(largo - 0.4, ALTEZZA_PARATIA - 0.3)) {
    const m = new THREE.Mesh(b, kit.mat.acciaio);
    m.position.y += 0.12;
    anta.add(m);
  }
  radice.add(anta);
  const telaio = new THREE.Mesh(kit.uvMetri(telaioBoccaporto(largo, ALTEZZA_PARATIA, 0.5)), kit.mat.lamieraScura);
  radice.add(telaio);
  const spia = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), kit.mat.luceRossa.clone());
  spia.position.set(largo / 2 + 0.05, ALTEZZA_PARATIA + 0.3, 0.3);
  radice.add(spia);
  kit.ombra(radice);
  kit.scena.add(radice);
  kit.luce({ x: porta.centro.x, y: base + ALTEZZA_PARATIA + 0.6, z: porta.centro.z, colore: 0xffb060, intensita: 5, portata: 9, tremola: true });
  return { porta, radice, anta, spia, apertura: 0, alto: SALITA_PARATIA, tipo: 'paratia' };
}

function costruisciPortale(kit, porta) {
  const s = porta.scatola;
  const orizz = s.x1 - s.x0 >= s.z1 - s.z0;
  const largo = (orizz ? s.x1 - s.x0 : s.z1 - s.z0) + 0.2;
  const base = quota(porta.centro.x, porta.centro.z);
  const radice = new THREE.Group();
  radice.position.set(porta.centro.x, base, porta.centro.z);
  radice.rotation.y = orizz ? 0 : Math.PI / 2;
  const ante = [-1, 1].map(lato => {
    const perno = new THREE.Group();
    perno.position.x = (lato * largo) / 2;
    const geometria = kit.deforma(new THREE.BoxGeometry(largo / 2, ALTEZZA_PORTALE, 0.4, 10, 24, 3), { ampiezza: 0.025, frequenza: 3, ottave: 3, seme: lato });
    const lastra = new THREE.Mesh(kit.uvMetri(geometria), kit.mat.marmo);
    lastra.position.set((-lato * largo) / 4, ALTEZZA_PORTALE / 2, 0);
    perno.add(lastra);
    const vena = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 8, 40, Math.PI), kit.mat.oricalco);
    vena.position.set((-lato * largo) / 4, ALTEZZA_PORTALE * 0.62, 0.22);
    vena.rotation.z = lato > 0 ? Math.PI / 2 : -Math.PI / 2;
    perno.add(vena);
    for (const z of [0.21, -0.21]) {
      const asta = new THREE.Mesh(new THREE.BoxGeometry(0.05, ALTEZZA_PORTALE * 0.7, 0.03), kit.mat.oro);
      asta.position.set((-lato * largo) / 4 + lato * 0.02, ALTEZZA_PORTALE * 0.45, z);
      perno.add(asta);
    }
    radice.add(perno);
    return { perno, lato };
  });
  const architrave = new THREE.Mesh(kit.uvMetri(kit.deforma(new THREE.BoxGeometry(largo + 1.2, 0.8, 0.9, 16, 4, 4), { ampiezza: 0.04, frequenza: 2, seme: 7 })), kit.mat.pietra);
  architrave.position.y = ALTEZZA_PORTALE + 0.4;
  radice.add(architrave);
  for (const lato of [-1, 1]) {
    const stipite = new THREE.Mesh(kit.uvMetri(kit.deforma(new THREE.BoxGeometry(0.6, ALTEZZA_PORTALE, 0.9, 3, 16, 3), { ampiezza: 0.04, frequenza: 2, seme: 3 + lato })), kit.mat.pietra);
    stipite.position.set(lato * (largo / 2 + 0.3), ALTEZZA_PORTALE / 2, 0);
    radice.add(stipite);
  }
  kit.ombra(radice);
  kit.scena.add(radice);
  kit.luce({ x: porta.centro.x, y: base + ALTEZZA_PORTALE, z: porta.centro.z, colore: 0x5fd8ff, intensita: 6, portata: 10 });
  return { porta, radice, ante, apertura: 0, tipo: 'portale' };
}

function telaioFinestra(kit, f) {
  const largo = f.curvo ? 2 : f.asse === 'z' ? f.scatola.x1 - f.scatola.x0 : f.scatola.z1 - f.scatola.z0;
  const base = quota(f.interno.x, f.interno.z);
  const radice = new THREE.Group();
  radice.position.set(f.centro.x, base, f.centro.z);
  radice.rotation.y = Math.atan2(f.fuori.x, f.fuori.z);
  const roccia = f.zona === 'santuario';
  const telaio = new THREE.Mesh(kit.uvMetri(telaioBoccaporto(largo, ALTEZZA_BOCCAPORTO, f.curvo ? 0.6 : 0.5)), roccia ? kit.mat.roccia : kit.mat.lamieraScura);
  radice.add(telaio);
  if (!roccia) {
    for (const b of bulloni(largo, ALTEZZA_BOCCAPORTO)) radice.add(new THREE.Mesh(b, kit.mat.ottone));
    const lampada = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.mat.luceRossa);
    lampada.position.set(0, ALTEZZA_BOCCAPORTO + 0.32, -0.32);
    radice.add(lampada);
  }
  kit.ombra(radice, false, true);
  kit.scena.add(radice);
  return { radice, largo, base };
}

function creaSala(kit) {
  const { x0, z0, x1, z1 } = SALA;
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const lungo = x1 - x0;
  const scafo = new THREE.CylinderGeometry(5.6, 5.6, lungo, 40, 6, true).rotateZ(Math.PI / 2);
  const materialeScafo = kit.mat.paratia.clone();
  materialeScafo.side = THREE.BackSide;
  const pareti = new THREE.Mesh(kit.uvMetri(scafo), materialeScafo);
  pareti.position.set(cx, 2, cz);
  pareti.scale.set(1, 0.62, 0.95);
  kit.scena.add(pareti);
  const pavimento = new THREE.Mesh(kit.uvMetri(new THREE.BoxGeometry(lungo, 0.1, z1 - z0)), kit.mat.grata);
  pavimento.position.set(cx, -0.05, cz);
  kit.scena.add(pavimento);
  for (let i = 0; i < 5; i++) {
    const x = x0 + 1.5 + i * 2.8;
    const costola = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.12, 8, 40, Math.PI), kit.mat.ottone);
    costola.position.set(x, -0.2, cz);
    costola.rotation.y = Math.PI / 2;
    costola.scale.set(0.95, 0.66, 1);
    kit.scena.add(costola);
    for (const lato of [-1, 1]) {
      const oblo = new THREE.Mesh(new THREE.CircleGeometry(0.42, 28), new THREE.MeshStandardMaterial({ color: 0x041820, emissive: 0x0e5a72, emissiveIntensity: 1.1 }));
      oblo.position.set(x + 1.4, 1.9, cz + lato * 4.62);
      oblo.rotation.y = lato > 0 ? Math.PI : 0;
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.07, 10, 28), kit.mat.ottone);
      anello.position.copy(oblo.position);
      anello.rotation.copy(oblo.rotation);
      kit.scena.add(oblo, anello);
    }
  }
  const cartello = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), new THREE.MeshBasicMaterial({ map: texturaTesto(['BATISCAFO NEREIDE II', 'DISCESA: 11.034 M', '', 'ASPETTATE I COMPAGNI', 'INVIO: SONO PRONTO'], { larghezza: 512, altezza: 320, sfondo: '#03141c', colore: '#bfefff', font: 'bold 30px monospace', bordo: '#2fd0ff' }) }));
  cartello.position.set(CARTELLO_PRONTI.x - 0.05, 1.75, CARTELLO_PRONTI.z);
  cartello.rotation.y = -Math.PI / 2;
  kit.scena.add(cartello);
  kit.luce({ x: cx, y: 3, z: cz, colore: 0x9fe0ff, intensita: 9, portata: 14 });
  kit.luce({ x: x1 - 1, y: 2.8, z: cz, colore: 0xffb060, intensita: 6, portata: 8, tremola: true });
}

export function creaPassaggi(kit) {
  const caso = creaCaso(909);
  const strisce = texturaStrisce();
  const porte = PORTE.filter(p => p.tipo === 'paratia' || p.tipo === 'portale').map(p => (p.tipo === 'paratia' ? costruisciParatia(kit, p, strisce.clone()) : costruisciPortale(kit, p)));
  const piastre = [];
  const finestre = new Map();
  for (const f of FINESTRE) {
    if (!f.scatola) continue;
    const { largo, base } = telaioFinestra(kit, f);
    const rot = Math.atan2(f.fuori.x, f.fuori.z);
    const indici = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const y = base + 0.25 + i * ((ALTEZZA_BOCCAPORTO - 0.5) / (R.ASSE_PER_FINESTRA - 1));
      indici.push(piastre.length);
      piastre.push(new THREE.Matrix4().compose(
        new THREE.Vector3(f.centro.x - f.fuori.x * 0.18, y, f.centro.z - f.fuori.z * 0.18),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rot, (caso() - 0.5) * 0.35)),
        new THREE.Vector3(largo + 0.3, 1, 1),
      ));
    }
    finestre.set(f.id, { indici, mostrate: R.ASSE_PER_FINESTRA, f });
  }
  const materialePiastra = kit.mat.lamiera.clone();
  materialePiastra.color = new THREE.Color(0x9a8e86);
  const mesh = new THREE.InstancedMesh(geometriaPiastra(), materialePiastra, piastre.length);
  piastre.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.castShadow = !!kit.qualita?.ombre;
  mesh.receiveShadow = true;
  kit.scena.add(mesh);
  const nascosta = new THREE.Matrix4().makeScale(0, 0, 0);
  creaSala(kit);

  kit.suEvento((e) => {
    if (e.k !== 'assaRotta' && e.k !== 'assaMessa') return;
    const voce = finestre.get(e.finestra);
    if (!voce) return;
    const punto = new THREE.Vector3(voce.f.centro.x, quota(voce.f.interno.x, voce.f.interno.z) + 1.2, voce.f.centro.z);
    kit.effetti?.impatto(punto, e.k === 'assaMessa' ? 6 : 12);
  });

  kit.ogniFotogramma((vista, dt, tempo) => {
    let cambiate = false;
    for (const [id, voce] of finestre) {
      const voluto = vista.finestre[id] ?? R.ASSE_PER_FINESTRA;
      if (voluto === voce.mostrate) continue;
      voce.mostrate = voluto;
      voce.indici.forEach((indice, i) => mesh.setMatrixAt(indice, i < voluto ? piastre[indice] : nascosta));
      cambiate = true;
    }
    if (cambiate) mesh.instanceMatrix.needsUpdate = true;
    for (const p of porte) {
      const aperta = vista.porte.has(p.porta.id);
      p.apertura = aperta ? Math.min(1, p.apertura + dt * VELOCITA_APERTURA) : Math.max(0, p.apertura - dt * 2);
      const f = p.apertura * p.apertura * (3 - 2 * p.apertura);
      if (p.tipo === 'paratia') {
        p.anta.position.y = f * p.alto;
        p.anta.position.x = Math.sin(tempo * 40) * 0.004 * (p.apertura > 0 && p.apertura < 1 ? 1 : 0);
        p.spia.material.emissive.setHex(aperta ? 0x3cff6a : 0xff2a1a);
        p.anta.visible = p.apertura < 1;
      } else {
        for (const a of p.ante) a.perno.rotation.y = a.lato * f * 1.45;
      }
    }
  });
}
