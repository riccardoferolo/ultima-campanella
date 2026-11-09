import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MISSIONE } from '../../mappe/palude.js';
import { AMULETO, VARCO } from '../../palude.js';
import { creaCaso } from '../caso-grafica.js';
import { texturaRune, texturaPericolo, texturaRagnatela } from './tele.js';

const VIOLA = 0xb07cff;
const APICE = new THREE.Vector3(MISSIONE.BARRIERA.x, 30, MISSIONE.BARRIERA.z);
const ALTEZZA_SFERA = 3.35;
const NEBBIE_MIASMA = 16;
const SCINTILLE = 8;
const COLPI_MASSIMI = 16;
const POZZE_MASSIME = 10;
const COLORI_COLPO = Object.freeze({ scarica: 0x9fdcff, acido: 0x7dff3a, tela: 0xf2f2e8, pioggia: 0x9dff4a });
const AFFONDA_ALBERO = 14;

const additivo = (colore, extra = {}) => new THREE.MeshBasicMaterial({ color: colore, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, ...extra });

function raggioTra(da, a, spessore, materiale) {
  const dir = new THREE.Vector3().subVectors(a, da);
  const lungo = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(spessore, spessore, 1, 6, 1, true).translate(0, 0.5, 0), materiale);
  mesh.position.copy(da);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.scale.y = lungo;
  return mesh;
}

function geometrieAlbero(caso, altezza) {
  const legno = [new THREE.CylinderGeometry(0.55, 1.5, altezza, 12, 4).translate(0, altezza / 2, 0)];
  const muschio = [];
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2 + caso() * 0.4;
    const lungo = 3 + caso() * 3;
    legno.push(new THREE.CylinderGeometry(0.08, 0.3, lungo, 7).translate(0, lungo / 2, 0).rotateZ(-(0.7 + caso() * 0.4)).rotateY(a).translate(0, 6 + k * 1.05, 0));
    muschio.push(new THREE.PlaneGeometry(0.9, 2.4).translate(0, -1.2, 0).rotateY(a).translate(Math.cos(a) * lungo * 0.5, 6 + k * 1.05 + lungo * 0.4, -Math.sin(a) * lungo * 0.5));
  }
  for (let k = 0; k < 6; k++) legno.push(new THREE.CylinderGeometry(0.12, 0.35, 3, 7).translate(0, 1.5, 0).rotateZ(-1.25).rotateY((k / 6) * Math.PI * 2).translate(0, 0.2, 0));
  return { legno: mergeGeometries(legno.map(g => g.toNonIndexed())), muschio: mergeGeometries(muschio) };
}

export function creaMissione(scena, { mat, alone, pezzo, cubo }) {
  const caso = creaCaso(777);
  const sprite = (colore, scala, opacita = 0.8, fog = true) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: colore, transparent: true, opacity: opacita, depthWrite: false, blending: THREE.AdditiveBlending, fog }));
    s.scale.setScalar(scala);
    scena.add(s);
    return s;
  };
  const rune = texturaRune();
  const materialeRune = new THREE.MeshStandardMaterial({ color: 0x0b0710, emissive: VIOLA, emissiveIntensity: 1.2, emissiveMap: rune, roughness: 0.6 });
  const sferaTotem = new THREE.MeshStandardMaterial({ color: 0x14081c, emissive: VIOLA, emissiveIntensity: 1.6, roughness: 0.2 });
  const fascio = additivo(VIOLA, { opacity: 0.55, fog: false });
  const alone2 = additivo(VIOLA, { opacity: 0.12, fog: false });

  const totem = Object.entries(MISSIONE.TOTEM).map(([nome, p]) => {
    pezzo(mat.roccia, new THREE.IcosahedronGeometry(0.9, 0).scale(1.2, 0.4, 1.2), p.x, 0.1, p.z, caso() * 3);
    const gruppo = new THREE.Group();
    gruppo.position.set(p.x, 0, p.z);
    const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 3.1, 9), mat.corteccia);
    palo.position.y = 1.55;
    gruppo.add(palo);
    for (const y of [0.9, 1.85]) {
      const fascia = new THREE.Mesh(new THREE.CylinderGeometry(0.3 - y * 0.03, 0.3 - y * 0.03, 0.22, 12, 1, true), materialeRune);
      fascia.position.y = y;
      gruppo.add(fascia);
    }
    const traversa = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.12), mat.legno);
    traversa.position.y = 2.45;
    gruppo.add(traversa);
    for (const s of [-1, 1]) {
      const muschio = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 1.1).translate(0, -0.55, 0), mat.barba);
      muschio.position.set(s * 0.65, 2.42, 0);
      gruppo.add(muschio);
      const osso = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 5), mat.osso);
      osso.position.set(s * 0.45, 2.15, 0.08);
      osso.rotation.z = s * 0.3;
      gruppo.add(osso);
    }
    [2.05, 2.7].forEach((y, i) => {
      const teschio = new THREE.Mesh(new THREE.SphereGeometry(0.16 - i * 0.02, 10, 8).scale(1, 1.1, 1.05), mat.osso);
      teschio.position.set(0, y, 0.24);
      gruppo.add(teschio);
      for (const dx of [-0.055, 0.055]) {
        const occhio = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), sferaTotem);
        occhio.position.set(dx, y + 0.02, 0.38 - i * 0.02);
        gruppo.add(occhio);
      }
    });
    const sfera = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), sferaTotem);
    sfera.position.y = ALTEZZA_SFERA;
    gruppo.add(sfera);
    scena.add(gruppo);
    const cima = new THREE.Vector3(p.x, ALTEZZA_SFERA, p.z);
    const raggio = raggioTra(cima, APICE, 0.07, fascio);
    const bagliore = raggioTra(cima, APICE, 0.35, alone2);
    scena.add(raggio, bagliore);
    const luce = sprite(VIOLA, 1.8, 0.8);
    luce.position.copy(cima);
    return { nome, gruppo, raggio, bagliore, luce, crollo: 0 };
  });
  const apice = sprite(VIOLA, 9, 0.7, false);
  apice.position.copy(APICE);

  const cupola = new THREE.Mesh(
    new THREE.SphereGeometry(MISSIONE.BARRIERA.raggio, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: rune, color: VIOLA, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  cupola.material.map = rune.clone();
  cupola.material.map.repeat.set(6, 3);
  cupola.material.map.needsUpdate = true;
  cupola.position.set(MISSIONE.BARRIERA.x, 0, MISSIONE.BARRIERA.z);
  scena.add(cupola);

  const albero = new THREE.Group();
  const { legno, muschio } = geometrieAlbero(caso, 14);
  albero.add(new THREE.Mesh(legno, mat.corteccia), new THREE.Mesh(muschio, mat.barba));
  albero.position.set(MISSIONE.BARRIERA.x, 0, MISSIONE.BARRIERA.z);
  scena.add(albero);
  const varco = new THREE.Group();
  varco.position.copy(albero.position);
  const buio = new THREE.Mesh(new THREE.CircleGeometry(2.25, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x020302 }));
  buio.position.y = 0.04;
  varco.add(buio);
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * Math.PI * 2;
    const sasso = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45 + caso() * 0.25, 0), mat.roccia);
    sasso.position.set(Math.cos(a) * 2.35, 0.1, Math.sin(a) * 2.35);
    sasso.rotation.set(caso() * 3, caso() * 3, 0);
    varco.add(sasso);
  }
  const membrana = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 28, 8, 0, Math.PI * 2, 0, 0.5).translate(0, -1.75, 0),
    new THREE.MeshStandardMaterial({ color: 0x6b7650, emissive: 0x22300f, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.92 }),
  );
  varco.add(membrana);
  const ragnatela = new THREE.Mesh(new THREE.PlaneGeometry(5, 5).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: texturaRagnatela(), transparent: true, opacity: 0.7, depthWrite: false, side: THREE.DoubleSide }));
  ragnatela.position.y = 0.12;
  varco.add(ragnatela);
  const fondo = sprite(0x7dff6a, 3.2, 0);
  fondo.position.set(MISSIONE.BARRIERA.x, 0.6, MISSIONE.BARRIERA.z);
  varco.visible = false;
  scena.add(varco);

  const nebbiaMiasma = Array.from({ length: NEBBIE_MIASMA }, (_, i) => {
    const a = (i / NEBBIE_MIASMA) * Math.PI * 2 + caso();
    const d = caso() * (MISSIONE.MIASMA.raggio - 1.5);
    const s = sprite(i % 2 ? 0x9fbf3a : 0x6f9a2a, 4 + caso() * 3, 0.32);
    s.material.blending = THREE.NormalBlending;
    const base = new THREE.Vector3(MISSIONE.MIASMA.x + Math.cos(a) * d, 0.8 + caso() * 1.8, MISSIONE.MIASMA.z + Math.sin(a) * d);
    s.position.copy(base);
    return { s, base, fase: caso() * 6 };
  });

  const pericolo = texturaPericolo();
  const ferro = new THREE.MeshStandardMaterial({ color: 0x55603f, metalness: 0.55, roughness: 0.55 });
  const fasciaPericolo = new THREE.MeshStandardMaterial({ map: pericolo, metalness: 0.3, roughness: 0.6 });
  const bombole = MISSIONE.BOMBOLE.map(p => {
    const g = new THREE.Group();
    g.position.set(p.x, 0, p.z);
    const corpo = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.3, 16), ferro);
    corpo.position.y = 0.75;
    const fascia = new THREE.Mesh(new THREE.CylinderGeometry(0.405, 0.405, 0.16, 16, 1, true), fasciaPericolo);
    fascia.position.y = 0.95;
    const cupoletta = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), ferro);
    cupoletta.position.y = 1.4;
    const valvola = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 6, 12).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x8a1a12, roughness: 0.5 }));
    valvola.position.y = 1.62;
    g.add(corpo, fascia, cupoletta, valvola);
    scena.add(g);
    const fuga = sprite(0x9fd83a, 0.9, 0.4);
    fuga.material.blending = THREE.NormalBlending;
    fuga.position.set(p.x + 0.2, 1.7, p.z);
    const resto = new THREE.Mesh(new THREE.CircleGeometry(1.1, 16).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x0b0a08, transparent: true, opacity: 0.85 }));
    resto.position.set(p.x, 0.03, p.z);
    resto.visible = false;
    scena.add(resto);
    return { g, fuga, resto };
  });

  const P = MISSIONE.PIEDISTALLO;
  cubo(mat.muschio, P.x - 0.3, 0, P.z - 0.3, P.x + 0.3, 0.95, P.z + 0.3, 1);
  const amuleto = new THREE.Group();
  amuleto.add(
    new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.022, 8, 20), new THREE.MeshStandardMaterial({ color: 0xc9a24a, metalness: 0.9, roughness: 0.3 })),
    new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), new THREE.MeshStandardMaterial({ color: 0x0a2010, emissive: 0x4dff8a, emissiveIntensity: 1.4, flatShading: true })),
  );
  amuleto.position.set(P.x, 1.25, P.z);
  scena.add(amuleto);
  const luceAmuleto = sprite(0x6dff8a, 1.2, 0.6);
  luceAmuleto.position.copy(amuleto.position);

  const C = MISSIONE.PURIFICATORE;
  cubo(mat.metallo, C.x - 0.7, 0, C.z - 0.7, C.x + 0.7, 0.35, C.z + 0.7, 1);
  pezzo(mat.rame, new THREE.CylinderGeometry(0.42, 0.5, 0.25, 16), C.x, 0.47, C.z);
  pezzo(mat.vetro, new THREE.CylinderGeometry(0.36, 0.36, 0.9, 16, 1, true), C.x, 1.05, C.z);
  pezzo(mat.rame, new THREE.CylinderGeometry(0.42, 0.42, 0.12, 16), C.x, 1.55, C.z);
  for (const t of MISSIONE.TOMBE) {
    const d = Math.hypot(t.x - C.x, t.z - C.z);
    pezzo(mat.rame, new THREE.CylinderGeometry(0.035, 0.035, d, 5).rotateX(Math.PI / 2), (t.x + C.x) / 2, 0.05, (t.z + C.z) / 2, Math.atan2(t.x - C.x, t.z - C.z));
  }
  const essenza = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 14), new THREE.MeshStandardMaterial({ color: 0x103018, emissive: 0x4dff6a, emissiveIntensity: 0.8, transparent: true, opacity: 0.85 }));
  essenza.position.set(C.x, 1.05, C.z);
  const bobina = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 8, 18).rotateX(Math.PI / 2), mat.rame);
  bobina.position.set(C.x, 1.85, C.z);
  scena.add(essenza, bobina);
  const allarme = sprite(0xff2a1a, 0.9, 0);
  allarme.position.set(C.x, 2.1, C.z);
  const filiEssenza = MISSIONE.TOMBE.map(t => {
    const r = raggioTra(new THREE.Vector3(t.x, 0.6, t.z + 1), new THREE.Vector3(C.x, 1.6, C.z), 0.04, additivo(0xbfffd0, { opacity: 0.6 }));
    r.visible = false;
    scena.add(r);
    return r;
  });

  const G = MISSIONE.GENERATORE_RAPIDE;
  cubo(new THREE.MeshStandardMaterial({ color: 0x3a4030, metalness: 0.6, roughness: 0.6 }), G.x - 1, 0, G.z - 0.6, G.x + 1, 1.4, G.z + 0.6, 1);
  cubo(mat.metallo, G.x - 0.8, 1.4, G.z - 0.4, G.x + 0.8, 1.55, G.z + 0.4, 1);
  for (const s of [-1, 1]) pezzo(mat.nero, new THREE.CylinderGeometry(0.06, 0.06, 6, 6).rotateZ(Math.PI / 2), G.x + s * 0.3, 0.12, G.z - 3.5, Math.PI / 2);
  const spiaGeneratore = sprite(0x9fdcff, 0.6, 0.9);
  spiaGeneratore.position.set(G.x, 1.7, G.z + 0.65);
  const scintille = Array.from({ length: SCINTILLE }, () => {
    const s = sprite(0xbfe8ff, 0.5, 0);
    return s;
  });
  const valvole = MISSIONE.VALVOLE.map(p => {
    cubo(mat.metallo, p.x - 0.12, 0, p.z - 0.12, p.x + 0.12, 1.05, p.z + 0.12, 1);
    const ruota = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 8, 18), new THREE.MeshStandardMaterial({ color: 0xa01c12, metalness: 0.4, roughness: 0.5 }));
    ruota.position.set(p.x, 1.1, p.z);
    ruota.rotation.x = Math.PI / 2;
    for (let k = 0; k < 3; k++) {
      const raggio = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.03), mat.metallo);
      raggio.rotation.z = (k / 3) * Math.PI;
      ruota.add(raggio);
    }
    scena.add(ruota);
    const spia = sprite(0xff3a1a, 0.5, 0);
    spia.position.set(p.x, 1.45, p.z);
    return { ruota, spia, giro: 0 };
  });
  const coloreCorrente = mat.corrente.color.clone();
  mat.corrente.emissive = new THREE.Color(0x000000);
  const elettrica = new THREE.Color(0x8fd8ff);

  const anelli = Array.from({ length: COLPI_MASSIMI }, () => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.82, 1, 32).rotateX(-Math.PI / 2), additivo(0xffffff, { opacity: 0.8, side: THREE.DoubleSide }));
    const pieno = new THREE.Mesh(new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2), additivo(0xffffff, { opacity: 0.2 }));
    m.add(pieno);
    m.visible = false;
    scena.add(m);
    return { m, pieno };
  });
  const pozze = Array.from({ length: POZZE_MASSIME }, () => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(1, 24).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x1a3a08, emissive: 0x5dff2a, emissiveIntensity: 0.6, transparent: true, opacity: 0.75, roughness: 0.1, depthWrite: false }));
    m.visible = false;
    scena.add(m);
    return m;
  });

  let barriera = 1;
  let affonda = 0;
  let membranaVisibile = 1;
  const camma = { scossa: 0 };

  function aggiornaTotem(sigilli, dt, tempo) {
    for (const t of totem) {
      const rotto = (sigilli.totem & { capanna: 1, cimitero: 2, rapide: 4 }[t.nome]) !== 0;
      t.crollo = rotto ? Math.min(1, t.crollo + dt * 0.8) : 0;
      t.gruppo.rotation.x = t.crollo * 0.5;
      t.gruppo.position.y = -t.crollo * 1.2;
      t.gruppo.scale.y = 1 - t.crollo * 0.3;
      const acceso = !rotto;
      t.raggio.visible = acceso;
      t.bagliore.visible = acceso;
      t.luce.visible = acceso;
      if (acceso) {
        t.raggio.material.opacity = 0.45 + Math.sin(tempo * 3 + t.gruppo.position.x) * 0.15;
        t.luce.scale.setScalar(1.6 + Math.sin(tempo * 4) * 0.25);
      }
    }
    materialeRune.emissiveIntensity = 1 + Math.sin(tempo * 2.2) * 0.35;
    sferaTotem.emissiveIntensity = 1.4 + Math.sin(tempo * 3.1) * 0.4;
  }

  function aggiornaBarriera(tana, dt, tempo) {
    const giu = tana.varco >= VARCO.MEMBRANA ? 0 : 1;
    barriera += (giu - barriera) * Math.min(1, dt * 1.2);
    cupola.visible = barriera > 0.02;
    apice.visible = barriera > 0.02;
    cupola.material.opacity = (0.34 + Math.sin(tempo * 2) * 0.06) * barriera;
    cupola.scale.setScalar(0.6 + 0.4 * barriera);
    cupola.material.map.offset.x = (cupola.material.map.offset.x + dt * 0.02) % 1;
    cupola.material.map.offset.y = (cupola.material.map.offset.y - dt * 0.05) % 1;
    apice.material.opacity = 0.7 * barriera;
    affonda = tana.varco >= VARCO.MEMBRANA ? Math.min(1, affonda + dt / 4) : 0;
    albero.position.y = -AFFONDA_ALBERO * affonda * affonda;
    albero.rotation.z = affonda * 0.12;
    albero.visible = affonda < 1;
    varco.visible = affonda > 0.3;
    if (affonda > 0 && affonda < 1) camma.scossa = Math.max(camma.scossa, 0.06);
    membranaVisibile += ((tana.varco === VARCO.APERTO ? 0 : 1) - membranaVisibile) * Math.min(1, dt * 2.5);
    membrana.visible = membranaVisibile > 0.02;
    membrana.scale.set(1, membranaVisibile * (1 + Math.sin(tempo * 1.7) * 0.06), 1);
    fondo.material.opacity = tana.varco === VARCO.APERTO ? 0.55 + Math.sin(tempo * 2) * 0.15 : 0;
    fondo.visible = varco.visible;
  }

  function aggiornaCapanna(sigilli, dt, tempo) {
    const miasma = sigilli.bombole.every(Boolean) ? 0 : 1;
    for (const n of nebbiaMiasma) {
      n.s.material.opacity += ((0.3 * miasma) - n.s.material.opacity) * Math.min(1, dt * 0.8);
      n.s.visible = n.s.material.opacity > 0.01;
      n.s.position.set(n.base.x + Math.sin(tempo * 0.3 + n.fase) * 0.8, n.base.y + Math.sin(tempo * 0.5 + n.fase) * 0.3, n.base.z + Math.cos(tempo * 0.25 + n.fase) * 0.8);
      n.s.material.rotation = tempo * 0.05 + n.fase;
    }
    bombole.forEach((b, i) => {
      const esplosa = sigilli.bombole[i];
      b.g.visible = !esplosa;
      b.fuga.visible = !esplosa;
      b.resto.visible = esplosa;
      if (!esplosa) {
        b.fuga.position.y = 1.7 + ((tempo * 0.6 + i) % 1) * 0.8;
        b.fuga.material.opacity = 0.35 * (1 - ((tempo * 0.6 + i) % 1));
      }
    });
    const visibile = sigilli.amuleto <= AMULETO.LIBERO;
    amuleto.visible = visibile;
    luceAmuleto.visible = visibile;
    amuleto.rotation.y = tempo * 1.4;
    amuleto.position.y = 1.25 + Math.sin(tempo * 2) * 0.05;
    luceAmuleto.material.opacity = sigilli.amuleto === AMULETO.LIBERO ? 0.8 + Math.sin(tempo * 5) * 0.15 : 0.15;
  }

  function aggiornaCimitero(sigilli, dt, tempo) {
    const attivo = sigilli.rituale === 1;
    const fatto = sigilli.rituale === 2;
    const puro = fatto ? 1 : sigilli.progresso;
    essenza.material.emissive.setRGB(0.3 + puro * 0.6, 1, 0.42 + puro * 0.58);
    essenza.material.emissiveIntensity = attivo ? 1.2 + Math.sin(tempo * 8) * 0.3 : fatto ? 1.4 : 0.35;
    essenza.scale.y = Math.max(0.05, attivo ? 0.2 + puro * 0.8 : fatto ? 1 : 0.15);
    essenza.position.y = 0.65 + essenza.scale.y * 0.4;
    bobina.rotation.y += dt * (attivo ? 6 : fatto ? 1 : 0);
    const assedio = attivo && sigilli.assedio > 0;
    allarme.material.opacity = assedio ? (Math.sin(tempo * 14) > 0 ? 0.9 : 0.2) : 0;
    filiEssenza.forEach((f, i) => {
      f.visible = attivo && !assedio;
      f.material.opacity = 0.35 + Math.sin(tempo * 9 + i) * 0.25;
    });
  }

  function aggiornaRapide(sigilli, dt, tempo) {
    const sabotato = sigilli.sequenza !== 2;
    const allerta = sigilli.sequenza === 1;
    mat.corrente.color.copy(coloreCorrente).lerp(elettrica, sabotato ? 0.55 + (allerta ? Math.sin(tempo * 20) * 0.25 : 0) : 0);
    mat.corrente.emissive.setRGB(0.12, 0.35, 0.6).multiplyScalar(sabotato ? (allerta ? 0.6 + Math.abs(Math.sin(tempo * 17)) * 0.6 : 0.35 + Math.abs(Math.sin(tempo * 3)) * 0.2) : 0);
    spiaGeneratore.material.color.setHex(sabotato ? (allerta ? 0xff3a1a : 0x9fdcff) : 0x3a4a3a);
    spiaGeneratore.material.opacity = sabotato ? 0.6 + Math.sin(tempo * (allerta ? 18 : 6)) * 0.35 : 0.1;
    scintille.forEach((s, i) => {
      if (!sabotato || Math.sin(tempo * (7 + i) + i * 3.1) < 0.6) {
        s.visible = false;
        return;
      }
      s.visible = true;
      const t = Math.floor(tempo * 3 + i) * 13.37 + i;
      s.position.set(30 + (Math.sin(t) * 0.5 + 0.5) * 38, 0.3, i % 2 ? -45 : -59);
      s.scale.setScalar(0.4 + Math.abs(Math.sin(t * 2)) * 0.9);
      s.material.opacity = 0.9;
    });
    valvole.forEach((v, i) => {
      const chiusa = sigilli.valvole[i] || sigilli.sequenza === 2;
      v.giro += ((chiusa ? Math.PI * 3 : 0) - v.giro) * Math.min(1, dt * 3);
      v.ruota.rotation.z = v.giro;
      v.ruota.material.color.setHex(chiusa ? 0x2f7a3a : 0xa01c12);
      v.spia.material.opacity = allerta && !sigilli.valvole[i] ? (Math.sin(tempo * 10 + i) > 0 ? 0.9 : 0.3) : 0;
    });
  }

  function aggiornaColpi(palude, tempo) {
    const colpi = palude.colpi ?? [];
    anelli.forEach((a, i) => {
      const c = colpi[i];
      a.m.visible = !!c;
      if (!c) return;
      const colore = COLORI_COLPO[c.tipo] ?? 0xffffff;
      a.m.material.color.setHex(colore);
      a.pieno.material.color.setHex(colore);
      a.m.position.set(c.x, 0.06, c.z);
      a.m.scale.setScalar(c.raggio);
      const urgenza = 1 - Math.min(1, c.timer / 1.3);
      a.m.material.opacity = 0.5 + Math.sin(tempo * (8 + urgenza * 20)) * 0.3;
      a.pieno.material.opacity = 0.1 + urgenza * 0.35;
      a.pieno.scale.setScalar(Math.max(0.05, urgenza));
    });
    const elenco = palude.pozze ?? [];
    pozze.forEach((m, i) => {
      const p = elenco[i];
      m.visible = !!p;
      if (!p) return;
      m.position.set(p.x, 0.05, p.z);
      m.scale.setScalar(p.raggio * Math.min(1, p.timer / 0.6 + 0.2));
      m.material.emissiveIntensity = 0.5 + Math.sin(tempo * 6 + p.id) * 0.2;
    });
  }

  return {
    scossa: () => camma.scossa,
    calma: dt => { camma.scossa = Math.max(0, camma.scossa - dt * 0.5); },
    aggiorna(vista, dt, tempo) {
      const palude = vista.palude;
      if (!palude?.sigilli) return;
      aggiornaTotem(palude.sigilli, dt, tempo);
      aggiornaBarriera(palude.tana, dt, tempo);
      aggiornaCapanna(palude.sigilli, dt, tempo);
      aggiornaCimitero(palude.sigilli, dt, tempo);
      aggiornaRapide(palude.sigilli, dt, tempo);
      aggiornaColpi(palude, tempo);
    },
  };
}
