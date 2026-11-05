import * as THREE from 'three';
import { R, ARMI, BEVANDE } from '../regole.js';
import { ALTEZZA_SOFFITTO, ZONE, MURI, RECINZIONI, ALTEZZA_RECINZIONE, OSTACOLI, FINESTRE, PORTE, ACQUISTI } from '../mappa.js';
import { texturaTesto, texturaGesso } from './texture.js';
import { modelloArma } from './armi3d.js';
import { creaCaso } from './caso-grafica.js';

const H = ALTEZZA_SOFFITTO;
const DAVANZALE = 0.9;
const ARCHITRAVE = 2.3;
const ALTEZZA_PORTA = 2.4;
const LUCI = Object.freeze([
  [-4, 0, true, 0xffd29a], [4, 0, false, 0xffd29a], [0, 10, false, 0xffd29a], [0, 19, true, 0xffd29a],
  [12, 0, false, 0xffd29a], [20, 0, true, 0xffd29a], [-9, 13.5, false, 0xffe3b0], [-9, 20.5, true, 0xffe3b0],
  [3, 27, false, 0xd8f0ff], [22, -10.5, true, 0xff6a40],
]);
const LAMPIONI = Object.freeze([[17, 20, 0xbcd4ff], [10.5, 27.5, 0xc8dcff]]);
const MATERIALI_OSTACOLI = Object.freeze({ banco: 'legnoChiaro', tavolo: 'legnoChiaro', bancone: 'metallo', cavallina: 'legno' });

function scatolaUV(l, a, p, metri, partenza = 0) {
  const g = new THREE.BoxGeometry(l, a, p);
  const uv = g.attributes.uv;
  const facce = [[p, a], [p, a], [l, p], [l, p], [l, a], [l, a]];
  const laterali = new Set([0, 1, 4, 5]);
  for (let f = 0; f < 6; f++) {
    const scarto = laterali.has(f) ? partenza / metri : 0;
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, (uv.getX(i) * facce[f][0]) / metri, (uv.getY(i) * facce[f][1]) / metri + scarto);
    }
  }
  return g;
}

function blocco(scena, materiale, s, y0, y1, metri = H) {
  const mesh = new THREE.Mesh(scatolaUV(s.x1 - s.x0, y1 - y0, s.z1 - s.z0, metri, y0), materiale);
  mesh.position.set((s.x0 + s.x1) / 2, (y0 + y1) / 2, (s.z0 + s.z1) / 2);
  scena.add(mesh);
  return mesh;
}

function piano(scena, materiale, x0, z0, x1, z1, y, metri, sotto = false) {
  const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(sotto ? Math.PI / 2 : -Math.PI / 2);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * (x1 - x0)) / metri, (uv.getY(i) * (z1 - z0)) / metri);
  const mesh = new THREE.Mesh(g, materiale);
  mesh.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  scena.add(mesh);
  return mesh;
}

const SAGOME = {
  pompa: ctx => { ctx.rect(14, 18, 88, 8); ctx.rect(90, 22, 26, 14); ctx.rect(34, 26, 22, 6); },
  precisione: ctx => { ctx.rect(8, 20, 100, 6); ctx.rect(40, 10, 34, 8); ctx.rect(96, 22, 24, 14); ctx.rect(70, 26, 6, 10); },
  mitra: ctx => { ctx.rect(30, 14, 60, 14); ctx.rect(48, 28, 8, 16); ctx.rect(76, 28, 8, 10); ctx.rect(18, 18, 12, 4); },
  assalto: ctx => { ctx.rect(14, 16, 70, 10); ctx.rect(84, 16, 30, 14); ctx.rect(50, 26, 8, 16); ctx.rect(70, 26, 6, 8); },
};

function orientamento(mesh, verso) {
  mesh.rotation.y = Math.atan2(verso.x, verso.z);
}

export function costruisciScuola(scena, texture, materialiArmi) {
  const mat = {
    muro: new THREE.MeshLambertMaterial({ map: texture.muro }),
    soffitto: new THREE.MeshLambertMaterial({ map: texture.soffitto }),
    piastrelle: new THREE.MeshLambertMaterial({ map: texture.piastrelle }),
    parquet: new THREE.MeshLambertMaterial({ map: texture.parquet }),
    legno: new THREE.MeshLambertMaterial({ map: texture.legno }),
    legnoChiaro: new THREE.MeshLambertMaterial({ map: texture.legnoChiaro }),
    porta: new THREE.MeshLambertMaterial({ map: texture.porta }),
    armadietti: new THREE.MeshLambertMaterial({ map: texture.armadietti }),
    terra: new THREE.MeshLambertMaterial({ map: texture.terra }),
    linoleum: new THREE.MeshLambertMaterial({ map: texture.linoleum }),
    cemento: new THREE.MeshLambertMaterial({ map: texture.cemento }),
    asfalto: new THREE.MeshLambertMaterial({ map: texture.asfalto }),
    rete: new THREE.MeshLambertMaterial({ map: texture.rete, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide }),
    palo: new THREE.MeshLambertMaterial({ color: 0x5a6066 }),
    pulmino: new THREE.MeshLambertMaterial({ map: texture.pulmino }),
    corteccia: new THREE.MeshLambertMaterial({ map: texture.corteccia }),
    fogliame: new THREE.MeshLambertMaterial({ map: texture.fogliame }),
    metallo: new THREE.MeshLambertMaterial({ map: texture.metallo }),
    cornice: new THREE.MeshLambertMaterial({ color: 0x2b1d10 }),
  };
  const caso = creaCaso(77);

  piano(scena, mat.terra, -60, -60, 80, 80, -0.02, 4);
  for (const zona of ZONE) {
    piano(scena, mat[zona.pavimento], zona.x0, zona.z0, zona.x1, zona.z1, 0, zona.aperto ? 4 : 2);
    if (!zona.aperto) piano(scena, mat.soffitto, zona.x0, zona.z0, zona.x1, zona.z1, H, 2, true);
  }
  for (const muro of MURI) blocco(scena, mat.muro, muro, 0, H);
  for (const r of RECINZIONI) {
    blocco(scena, mat.rete, r, 0, ALTEZZA_RECINZIONE, 1);
    const lungo = Math.max(r.x1 - r.x0, r.z1 - r.z0);
    for (let t = 0; t <= lungo; t += 3) {
      const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, ALTEZZA_RECINZIONE + 0.2, 5), mat.palo);
      palo.position.set(r.x1 - r.x0 > r.z1 - r.z0 ? r.x0 + t : (r.x0 + r.x1) / 2, (ALTEZZA_RECINZIONE + 0.2) / 2, r.x1 - r.x0 > r.z1 - r.z0 ? (r.z0 + r.z1) / 2 : r.z0 + t);
      scena.add(palo);
    }
  }
  const luna = new THREE.Mesh(new THREE.CircleGeometry(6, 16), new THREE.MeshBasicMaterial({ color: 0xdfe8f5, fog: false }));
  luna.position.set(-60, 70, 120);
  luna.lookAt(0, 0, 0);
  scena.add(luna);

  const finestre = new Map();
  for (const f of FINESTRE) {
    const basso = f.recinzione ? 0.15 : DAVANZALE;
    const alto = f.recinzione ? ALTEZZA_RECINZIONE - 0.2 : ARCHITRAVE;
    if (!f.recinzione) {
      blocco(scena, mat.muro, f.scatola, 0, DAVANZALE);
      blocco(scena, mat.muro, f.scatola, ARCHITRAVE, H);
    }
    const lungo = f.asse === 'z' ? f.scatola.x1 - f.scatola.x0 : f.scatola.z1 - f.scatola.z0;
    const assi = [];
    for (let i = 0; i < R.ASSE_PER_FINESTRA; i++) {
      const asse = new THREE.Mesh(scatolaUV(lungo + 0.35, 0.17, 0.05, 1), mat.legno);
      const y = basso + 0.15 + (i * (alto - basso - 0.3)) / (R.ASSE_PER_FINESTRA - 1);
      asse.position.set(f.centro.x + f.fuori.x * 0.2, y, f.centro.z + f.fuori.z * 0.2);
      asse.rotation.y = f.asse === 'z' ? 0 : Math.PI / 2;
      asse.rotation.z = (caso() - 0.5) * 0.5;
      scena.add(asse);
      assi.push(asse);
    }
    finestre.set(f.id, assi);
  }

  const porte = new Map();
  for (const p of PORTE) {
    blocco(scena, mat.muro, p.scatola, ALTEZZA_PORTA, H);
    const anta = blocco(scena, mat.porta, p.scatola, 0, ALTEZZA_PORTA, ALTEZZA_PORTA);
    porte.set(p.id, { anta, apertura: 0 });
  }

  for (const o of OSTACOLI) {
    if (o.tipo === 'tribuna') {
      for (let gradino = 0; gradino < 3; gradino++) {
        const profondita = (o.z1 - o.z0) / 3;
        blocco(scena, mat.legnoChiaro, { x0: o.x0, x1: o.x1, z0: o.z1 - profondita * (gradino + 1), z1: o.z1 - profondita * gradino }, 0, o.altezza * ((3 - gradino) / 3), 1);
      }
    } else if (o.tipo === 'albero') {
      const cx = (o.x0 + o.x1) / 2;
      const cz = (o.z0 + o.z1) / 2;
      const tronco = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.4, 6), mat.corteccia);
      tronco.position.set(cx, 1.2, cz);
      const chioma = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 0), mat.fogliame);
      chioma.position.set(cx, 3.6, cz);
      chioma.scale.set(1, 1.2, 1);
      scena.add(tronco, chioma);
    } else if (o.tipo === 'pulmino') {
      blocco(scena, mat.pulmino, o, 0.4, o.altezza, 3);
      for (const [dx, dz] of [[0.8, 0], [o.x1 - o.x0 - 0.8, 0], [0.8, o.z1 - o.z0], [o.x1 - o.x0 - 0.8, o.z1 - o.z0]]) {
        const ruota = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 10).rotateX(Math.PI / 2), mat.palo);
        ruota.position.set(o.x0 + dx, 0.42, o.z0 + dz);
        scena.add(ruota);
      }
    } else if (o.tipo === 'lampione') {
      blocco(scena, mat.palo, o, 0, o.altezza + 1.5, 1);
    } else if (o.tipo === 'panchina') {
      blocco(scena, mat.legno, o, 0.3, o.altezza, 1);
    } else if (o.tipo === 'caldaia') {
      const raggio = Math.min(o.x1 - o.x0, o.z1 - o.z0) / 2;
      const cilindro = new THREE.Mesh(new THREE.CylinderGeometry(raggio, raggio, o.altezza, 10), mat.metallo);
      cilindro.position.set((o.x0 + o.x1) / 2, o.altezza / 2, (o.z0 + o.z1) / 2);
      const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, H - o.altezza, 6), mat.metallo);
      tubo.position.set(cilindro.position.x, o.altezza + (H - o.altezza) / 2, cilindro.position.z);
      const bocca = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), new THREE.MeshBasicMaterial({ color: 0xff5a1a }));
      bocca.position.set(cilindro.position.x + raggio + 0.01, 0.6, cilindro.position.z);
      bocca.rotation.y = Math.PI / 2;
      scena.add(cilindro, tubo, bocca);
    } else {
      blocco(scena, mat[MATERIALI_OSTACOLI[o.tipo] ?? 'legno'], o, 0, o.altezza, 1);
    }
  }

  for (const [x0, x1, z0, z1] of [[-1.85, -1.7, 6.6, 9.3], [-1.85, -1.7, 10.8, 16.4], [1.7, 1.85, 6.6, 12.4], [1.7, 1.85, 15.6, 21.4]]) {
    blocco(scena, mat.armadietti, { x0, x1, z0, z1 }, 0, 1.9, 1.9);
  }
  const lavagna = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshLambertMaterial({ map: texture.lavagna }));
  lavagna.position.set(4, 1.6, 5.83);
  lavagna.rotation.y = Math.PI;
  scena.add(lavagna);

  for (const a of ACQUISTI) {
    const { x, z } = a.posizione;
    if (a.tipo === 'arma') {
      const gesso = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), new THREE.MeshBasicMaterial({
        map: texturaGesso(SAGOME[a.arma], [ARMI[a.arma].nome.toUpperCase(), `${a.costo}`]), transparent: true,
      }));
      gesso.position.set(x + a.verso.x * 0.01, 1.5, z + a.verso.z * 0.01);
      orientamento(gesso, a.verso);
      scena.add(gesso);
    } else if (a.tipo === 'bevanda') {
      const bevanda = BEVANDE[a.bevanda];
      const macchina = new THREE.Group();
      const corpo = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2, 0.65), new THREE.MeshLambertMaterial({ color: new THREE.Color(bevanda.colore).multiplyScalar(0.45) }));
      corpo.position.y = 1;
      const pannello = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), new THREE.MeshBasicMaterial({
        map: texturaTesto([bevanda.nome.split(' ')[0].toUpperCase(), bevanda.nome.split(' ')[1].toUpperCase(), `${bevanda.costo}`], { larghezza: 64, altezza: 96, sfondo: `#${bevanda.colore.toString(16).padStart(6, '0')}`, font: 'bold 12px monospace', bordo: '#111' }),
      }));
      pannello.position.set(0, 1.2, 0.33);
      macchina.add(corpo, pannello);
      macchina.position.set(x, 0, z);
      orientamento(macchina, a.verso);
      scena.add(macchina);
    }
  }

  const interruttoreDati = ACQUISTI.find(a => a.tipo === 'interruttore');
  const quadro = new THREE.Group();
  const pannelloQuadro = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.15), mat.metallo);
  const leva = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), new THREE.MeshLambertMaterial({ color: 0xb8241b }));
  leva.position.set(0, 0.12, 0.12);
  const spia = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: 0xb8241b }));
  spia.position.set(0.2, 0.3, 0.09);
  quadro.add(pannelloQuadro, leva, spia);
  quadro.position.set(interruttoreDati.posizione.x, 1.4, interruttoreDati.posizione.z);
  orientamento(quadro, interruttoreDati.verso);
  scena.add(quadro);

  const potenziatoreDati = ACQUISTI.find(a => a.tipo === 'potenziatore');
  const macchina = new THREE.Group();
  const corpoMacchina = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.9, 1.15), new THREE.MeshLambertMaterial({ map: texture.metallo, color: 0x8f86a8 }));
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
  const armiMacchina = new Map();
  let armaInMacchina = null;

  const cassaDati = ACQUISTI.find(a => a.tipo === 'cassa');
  const cassa = new THREE.Group();
  const fondo = new THREE.Mesh(scatolaUV(1.1, 0.55, 0.6, 0.6), mat.legnoChiaro);
  fondo.position.y = 0.28;
  const perno = new THREE.Group();
  perno.position.set(0, 0.56, -0.3);
  const coperchio = new THREE.Mesh(scatolaUV(1.12, 0.08, 0.62, 0.6), mat.legnoChiaro);
  coperchio.position.set(0, 0, 0.3);
  perno.add(coperchio);
  const punto = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: texturaTesto(['?'], { larghezza: 32, altezza: 32, colore: '#7dd3fc', font: 'bold 28px monospace' }), transparent: true }));
  punto.position.set(0, 0.3, 0.31);
  const alone = new THREE.PointLight(0x7dd3fc, 0, 4, 1.5);
  alone.position.set(0, 1, 0.3);
  cassa.add(fondo, perno, punto, alone);
  cassa.position.set(cassaDati.posizione.x, 0, cassaDati.posizione.z);
  orientamento(cassa, cassaDati.verso);
  scena.add(cassa);
  const armiCassa = new Map();
  let armaMostrata = null;

  const lampade = LUCI.map(([x, z, tremola, colore]) => {
    const luce = new THREE.PointLight(colore, 9, 13, 1.6);
    luce.position.set(x, H - 0.4, z);
    const plafoniera = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.3), new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
    plafoniera.position.set(x, H - 0.04, z);
    scena.add(luce, plafoniera);
    return { luce, plafoniera, tremola, base: 9 };
  });

  for (const [x, z, colore] of LAMPIONI) {
    const luce = new THREE.PointLight(colore, 24, 22, 1.3);
    luce.position.set(x, 4.3, z);
    const lampada = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), new THREE.MeshBasicMaterial({ color: 0xe8f0ff }));
    lampada.position.set(x, 4.55, z);
    scena.add(luce, lampada);
  }

  return {
    aggiorna(vista, dt, tempo) {
      for (const f of FINESTRE) finestre.get(f.id).forEach((asse, i) => { asse.visible = i < vista.finestre[f.id]; });
      for (const p of PORTE) {
        const porta = porte.get(p.id);
        if (vista.porte.has(p.id)) porta.apertura = Math.min(1, porta.apertura + dt * 1.5);
        porta.anta.position.y = ALTEZZA_PORTA / 2 + porta.apertura * ALTEZZA_PORTA;
        porta.anta.visible = porta.apertura < 1;
      }
      for (const l of lampade) {
        const spenta = l.tremola && Math.sin(tempo * 13.7 + l.luce.position.x) > 0.93;
        l.luce.intensity = spenta ? 0.6 : l.base;
        l.plafoniera.material.color.setHex(spenta ? 0x2a2620 : 0xfff1cf);
      }
      leva.rotation.x = THREE.MathUtils.lerp(leva.rotation.x, vista.corrente ? -2.4 : 0, Math.min(1, dt * 5));
      spia.material.color.setHex(vista.corrente ? 0x3cff6a : 0xb8241b);
      const lavora = vista.potenziatore.stato === 'lavora';
      anello.material.color.setHex(!vista.corrente ? 0x3a2060 : lavora ? 0xe0b0ff : 0xa45cff);
      anello.rotation.z += dt * (lavora ? 9 : vista.corrente ? 1 : 0);
      luceMacchina.intensity = !vista.corrente ? 0 : lavora ? 6 + Math.sin(tempo * 20) * 3 : 2.5;
      const inMacchina = vista.potenziatore.stato === 'pronta' ? vista.potenziatore.arma : null;
      if (armaInMacchina !== inMacchina) {
        armiMacchina.forEach(m => { m.visible = false; });
        if (inMacchina) {
          if (!armiMacchina.has(inMacchina)) {
            const { gruppo } = modelloArma(inMacchina, materialiArmi);
            gruppo.scale.setScalar(1.2);
            macchina.add(gruppo);
            armiMacchina.set(inMacchina, gruppo);
          }
          armiMacchina.get(inMacchina).visible = true;
        }
        armaInMacchina = inMacchina;
      }
      if (inMacchina) {
        const g = armiMacchina.get(inMacchina);
        g.position.set(0, 2.25 + Math.sin(tempo * 2) * 0.05, 0.2);
        g.rotation.y = tempo * 1.8;
      }
      const aperta = vista.cassa.stato === 'aperta';
      perno.rotation.x = THREE.MathUtils.lerp(perno.rotation.x, aperta ? -1.3 : 0, Math.min(1, dt * 6));
      alone.intensity = aperta ? 3 + Math.sin(tempo * 6) : 0.6;
      const voluta = aperta ? vista.cassa.arma : null;
      if (armaMostrata !== voluta) {
        armiCassa.forEach(m => { m.visible = false; });
        if (voluta) {
          if (!armiCassa.has(voluta)) {
            const { gruppo } = modelloArma(voluta, materialiArmi);
            gruppo.scale.setScalar(1.15);
            cassa.add(gruppo);
            armiCassa.set(voluta, gruppo);
          }
          armiCassa.get(voluta).visible = true;
        }
        armaMostrata = voluta;
      }
      if (voluta) {
        const g = armiCassa.get(voluta);
        g.position.set(0, 1.15 + Math.sin(tempo * 2) * 0.05, 0);
        g.rotation.y = tempo * 1.5;
      }
    },
  };
}
