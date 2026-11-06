import * as THREE from 'three';

const FORME = Object.freeze({
  arco: { corpo: 'osso', bocca: 'corna', extra: ['vene', 'cuore'] },
  singolarita: { corpo: 'spina', bocca: 'gabbia', extra: ['nucleo'] },
  criogeno: { corpo: 'carapace', bocca: 'cristalli', extra: ['cristalli', 'vene'] },
});

const MAGENTA = new THREE.Color(0xff4fd8);
let risorse = null;

function canvasTexture(lato, pittore, ripeti = true) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = lato;
  const ctx = canvas.getContext('2d');
  pittore(ctx, lato);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (ripeti) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function casuale(seme) {
  let s = seme >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function crea() {
  const caso = casuale(77);
  const osso = canvasTexture(256, (ctx, l) => {
    ctx.fillStyle = '#d9ccae';
    ctx.fillRect(0, 0, l, l);
    for (let i = 0; i < 2600; i++) {
      const v = 180 + Math.floor(caso() * 60);
      ctx.fillStyle = `rgba(${v},${v - 12},${v - 35},0.35)`;
      ctx.fillRect(caso() * l, caso() * l, 1 + caso() * 2, 6 + caso() * 30);
    }
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(80,55,30,${0.08 + caso() * 0.2})`;
      ctx.beginPath();
      ctx.ellipse(caso() * l, caso() * l, 2 + caso() * 14, 1 + caso() * 5, caso() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = 'rgba(60,40,25,0.35)';
      ctx.fillRect(caso() * l, caso() * l, 1, 1);
    }
  });
  const carne = canvasTexture(128, (ctx, l) => {
    ctx.fillStyle = '#4a1517';
    ctx.fillRect(0, 0, l, l);
    for (let i = 0; i < 260; i++) {
      ctx.strokeStyle = `rgba(${120 + caso() * 80},${30 + caso() * 30},${35 + caso() * 30},0.35)`;
      ctx.lineWidth = 1 + caso() * 2;
      const x = caso() * l;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + (caso() - 0.5) * 20, l * 0.3, x + (caso() - 0.5) * 20, l * 0.7, x + (caso() - 0.5) * 10, l);
      ctx.stroke();
    }
  });
  const alone = canvasTexture(64, (ctx, l) => {
    const s = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    s.addColorStop(0, 'rgba(255,255,255,1)');
    s.addColorStop(0.3, 'rgba(255,255,255,0.4)');
    s.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = s;
    ctx.fillRect(0, 0, l, l);
  }, false);
  return {
    alone,
    osso: new THREE.MeshStandardMaterial({ map: osso, color: 0xa39274, roughness: 0.58, metalness: 0 }),
    ossoNero: new THREE.MeshStandardMaterial({ map: osso, color: 0x564a40, roughness: 0.45, metalness: 0.1 }),
    carne: new THREE.MeshStandardMaterial({ map: carne, color: 0xffffff, roughness: 0.3, metalness: 0 }),
    chitina: new THREE.MeshPhysicalMaterial({ color: 0x1c1726, roughness: 0.28, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.12, iridescence: 0.9, iridescenceIOR: 1.7 }),
    colori: new Map(),
  };
}

function coloriDi(colore, potenziata) {
  const chiave = `${colore.getHex()}|${potenziata}`;
  if (!risorse.colori.has(chiave)) {
    const tinta = colore.clone();
    if (potenziata) tinta.lerp(MAGENTA, 0.35);
    risorse.colori.set(chiave, {
      tinta,
      gemma: new THREE.MeshStandardMaterial({ color: tinta.clone().multiplyScalar(0.4), emissive: tinta, emissiveIntensity: potenziata ? 3 : 2, roughness: 0.15 }),
      vena: new THREE.MeshBasicMaterial({ color: tinta }),
      cristallo: new THREE.MeshPhysicalMaterial({ color: tinta.clone().lerp(new THREE.Color(0xffffff), 0.55), emissive: tinta, emissiveIntensity: 0.45, roughness: 0.04, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.82 }),
      bagliore: new THREE.SpriteMaterial({ map: risorse.alone, color: tinta, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    });
  }
  return risorse.colori.get(chiave);
}

function deforma(geometria, ampiezza, seme) {
  const p = geometria.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(v.x * 61 + seme) * Math.sin(v.y * 53 + seme * 2) * Math.sin(v.z * 47 + seme * 3);
    const m = 1 + n * ampiezza;
    p.setXYZ(i, v.x * m, v.y * m, v.z * m);
  }
  geometria.computeVertexNormals();
  return geometria;
}

function tubo(punti, raggio, materiale, segmenti = 20, radiali = 9) {
  const curva = new THREE.CatmullRomCurve3(punti);
  const g = new THREE.TubeGeometry(curva, segmenti, 1, radiali, false);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i <= segmenti; i++) {
    const t = i / segmenti;
    const centro = curva.getPointAt(t);
    const r = raggio(t);
    for (let j = 0; j <= radiali; j++) {
      const k = i * (radiali + 1) + j;
      v.fromBufferAttribute(p, k).sub(centro).multiplyScalar(r).add(centro);
      p.setXYZ(k, v.x, v.y, v.z);
    }
  }
  g.computeVertexNormals();
  return new THREE.Mesh(g, materiale);
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const nodo = (t, r0, r1, bozzo = 0.45) => (r0 + (r1 - r0) * t) * (1 + bozzo * Math.exp(-((t / 0.09) ** 2)) + bozzo * Math.exp(-(((1 - t) / 0.09) ** 2)));

function osso(gruppo, a, b, r0, r1, materiale, piega = V(0, 0, 0)) {
  const mezzo = a.clone().lerp(b, 0.5).add(piega);
  gruppo.add(tubo([a, mezzo, b], t => nodo(t, r0, r1), materiale, 18, 10));
}

function artiglio(gruppo, base, verso, lunghezza, raggio, piega, materiale) {
  const punti = [base, base.clone().addScaledVector(verso, lunghezza * 0.5).addScaledVector(piega, 0.4), base.clone().addScaledVector(verso, lunghezza).add(piega)];
  const mesh = tubo(punti, t => raggio * (1 - t) ** 0.85 + 0.0008, materiale, 12, 7);
  gruppo.add(mesh);
  return mesh;
}

function bagliore(gruppo, posizione, colori, scala) {
  const s = new THREE.Sprite(colori.bagliore);
  s.scale.setScalar(scala);
  s.position.copy(posizione);
  gruppo.add(s);
  return s;
}

function gemma(gruppo, posizione, raggio, colori, animazioni) {
  const m = new THREE.Mesh(deforma(new THREE.IcosahedronGeometry(raggio, 2), 0.12, raggio * 100), colori.gemma);
  m.position.copy(posizione);
  gruppo.add(m);
  const s = bagliore(gruppo, posizione, colori, raggio * 7);
  animazioni.push(t => {
    s.material.opacity = 0.55 + Math.sin(t * 4.5) * 0.25;
  });
  return m;
}

function impugnatura(gruppo, materiale, materialeFasce) {
  osso(gruppo, V(0, 0.022, 0.012), V(0, -0.118, 0.05), 0.016, 0.019, materiale, V(0, 0, -0.012));
  for (const t of [0.3, 0.55, 0.8]) {
    const fascia = new THREE.Mesh(new THREE.TorusGeometry(0.0195, 0.0045, 6, 16), materialeFasce);
    fascia.position.set(0, 0.022 - 0.14 * t, 0.012 + 0.038 * t);
    fascia.rotation.x = Math.PI / 2 - 0.28;
    gruppo.add(fascia);
  }
  artiglio(gruppo, V(0, 0.0, -0.022), V(0, -0.7, -0.45).normalize(), 0.035, 0.006, V(0, 0, 0.01), materiale);
}

function costole(gruppo, zDa, zA, coppie, raggio, materiale) {
  for (let i = 0; i < coppie; i++) {
    const z = zDa + ((zA - zDa) * i) / Math.max(1, coppie - 1);
    const scala = 1 - Math.abs(i - (coppie - 1) / 2) / coppie;
    for (const lato of [-1, 1]) {
      const punti = [V(lato * 0.006, 0.035 + raggio * 0.95, z), V(lato * raggio * 1.15, 0.035 + raggio * 0.35, z + 0.006), V(lato * raggio * 1.05, 0.035 - raggio * 0.6, z + 0.012), V(lato * raggio * 0.35, 0.035 - raggio * (0.95 + scala * 0.2), z + 0.016)];
      gruppo.add(tubo(punti, t => 0.0075 * (1 - t * 0.6) + 0.0015, materiale, 14, 6));
    }
  }
}

function corpoLarva(gruppo, zDietro, zDavanti, spessore, materiale) {
  const lungo = zDietro - zDavanti;
  const profilo = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const r = spessore * (Math.sin(Math.PI * Math.min(1, t * 1.25)) ** 0.7 * (1 - t * 0.55)) + 0.004;
    profilo.push(new THREE.Vector2(Math.max(0.002, r), t * lungo));
  }
  const g = deforma(new THREE.LatheGeometry(profilo, 18), 0.07, 11);
  g.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(g, materiale);
  mesh.position.set(0, 0.035, zDietro);
  gruppo.add(mesh);
}

const CORPI = {
  osso(gruppo, f, m, colori, caso) {
    const fine = f.bocca.z + 0.02;
    corpoLarva(gruppo, 0.07, fine, 0.034, m.osso);
    costole(gruppo, -0.005, fine * 0.62, 3, 0.03, m.chitina);
    impugnatura(gruppo, m.osso, m.carne);
    const spine = 3 + Math.floor(caso() * 2) + (f.potenziata ? 2 : 0);
    for (let i = 0; i < spine; i++) {
      const z = fine * 0.15 + fine * 0.75 * (i / spine);
      artiglio(gruppo, V(0, 0.064, z), V(0, 0.75, 0.66).normalize(), 0.022 + caso() * 0.016, 0.0065, V(0, 0, 0.008), m.osso);
    }
  },
  spina(gruppo, f, m, colori, caso) {
    const inizio = 0.03;
    const fine = f.bocca.z + 0.13;
    const passo = 0.05;
    const profilo = [V(0.001, -0.016, 0), V(0.024, -0.014, 0), V(0.029, 0, 0), V(0.024, 0.014, 0), V(0.001, 0.016, 0)].map(p => new THREE.Vector2(p.x, p.y));
    const vertebra = deforma(new THREE.LatheGeometry(profilo, 12).rotateX(Math.PI / 2), 0.06, 3);
    for (let z = inizio, i = 0; z > fine; z -= passo, i++) {
      const v = new THREE.Mesh(vertebra, m.osso);
      v.position.set(0, 0.035, z);
      v.scale.setScalar(1 - (i * 0.012));
      gruppo.add(v);
      artiglio(gruppo, V(0, 0.056, z), V(0, 0.8, 0.6).normalize(), 0.025 + caso() * 0.015, 0.007, V(0, 0, 0.01), m.osso);
    }
    gruppo.add(tubo([V(0, 0.022, inizio + 0.02), V(0, 0.018, (inizio + fine) / 2), V(0, 0.024, fine)], () => 0.011, m.carne, 24, 8));
    const presa = f.presa ?? V(0, -0.05, -0.3);
    const gabbiaDa = -0.06;
    const gabbiaA = presa.z + 0.07;
    costole(gruppo, gabbiaDa, gabbiaA, 4, 0.045, m.osso);
    const organo = new THREE.Mesh(deforma(new THREE.SphereGeometry(0.03, 18, 14), 0.2, 4), colori.gemma);
    organo.scale.set(0.8, 0.8, 1.5);
    organo.position.set(0, 0.025, (gabbiaDa + gabbiaA) / 2);
    gruppo.add(organo);
    bagliore(gruppo, organo.position, colori, 0.14);
    impugnatura(gruppo, m.osso, m.carne);
    osso(gruppo, V(0, 0.02, presa.z), V(0, presa.y - 0.02, presa.z + 0.012), 0.017, 0.015, m.osso);
    gruppo.add(tubo([V(0, 0.03, 0.05), V(0, -0.02, 0.14), V(0, -0.09, 0.2), V(0, -0.15, 0.22)], t => 0.022 * (1 - t * 0.7), m.osso, 20, 9));
    for (let i = 0; i < 3; i++) artiglio(gruppo, V(0, -0.0 - i * 0.045, 0.12 + i * 0.03), V(0, 0.1, 1).normalize(), 0.03, 0.006, V(0, 0.01, 0), m.osso);
  },
  carapace(gruppo, f, m, colori, caso) {
    const fine = f.bocca.z + 0.05;
    const lungo = 0.1 - fine;
    const guscio = deforma(new THREE.SphereGeometry(1, 28, 18), 0.05, 7);
    const mesh = new THREE.Mesh(guscio, m.chitina);
    mesh.scale.set(0.05, 0.046, lungo / 2);
    mesh.position.set(0, 0.03, 0.1 - lungo / 2);
    gruppo.add(mesh);
    for (let i = 0; i < 5; i++) {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.047 - Math.abs(i - 2) * 0.006, 0.006, 6, 20), m.chitina);
      anello.position.set(0, 0.03, 0.07 - (lungo * (i + 0.5)) / 5.2);
      gruppo.add(anello);
    }
    impugnatura(gruppo, m.chitina, m.carne);
    const presa = f.presa ?? V(0, -0.05, -0.3);
    osso(gruppo, V(0, 0.0, presa.z), V(0, presa.y - 0.02, presa.z + 0.012), 0.016, 0.014, m.chitina);
  },
};

function cristallo(gruppo, base, verso, lunghezza, colori) {
  const g = new THREE.OctahedronGeometry(1, 0);
  g.scale(0.25, 1, 0.25);
  g.translate(0, 0.6, 0);
  const mesh = new THREE.Mesh(g, colori.cristallo);
  mesh.scale.setScalar(lunghezza);
  mesh.position.copy(base);
  mesh.quaternion.setFromUnitVectors(V(0, 1, 0), verso.clone().normalize());
  gruppo.add(mesh);
}

const BOCCHE = {
  denti(gruppo, f, m, colori, animazioni) {
    gemma(gruppo, f.bocca.clone().add(V(0, 0, 0.012)), 0.016, colori, animazioni);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const fuori = V(Math.cos(a), Math.sin(a), 0);
      artiglio(gruppo, f.bocca.clone().addScaledVector(fuori, 0.016).add(V(0, 0, 0.03)), V(fuori.x * 0.45, fuori.y * 0.45, -1).normalize(), 0.055, 0.008, fuori.clone().multiplyScalar(-0.012), m.osso);
    }
  },
  gabbia(gruppo, f, m, colori, animazioni) {
    const lungo = f.lungo ? 0.2 : 0.11;
    const centro = f.bocca.clone().add(V(0, 0, lungo * 0.35));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const fuori = V(Math.cos(a), Math.sin(a), 0);
      artiglio(gruppo, centro.clone().addScaledVector(fuori, 0.02).add(V(0, 0, lungo * 0.55)), V(fuori.x * 0.9, fuori.y * 0.9, -1).normalize(), lungo, 0.009, fuori.clone().multiplyScalar(-lungo * 0.55), m.osso);
    }
    if (!f.extra.includes('nucleo')) gemma(gruppo, centro, 0.022, colori, animazioni);
  },
  tentacoli(gruppo, f, m, colori, animazioni) {
    gemma(gruppo, f.bocca.clone().add(V(0, 0, 0.015)), 0.014, colori, animazioni);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const fuori = V(Math.cos(a), Math.sin(a), 0);
      const perno = new THREE.Group();
      perno.position.copy(f.bocca).addScaledVector(fuori, 0.02);
      const tentacolo = tubo([V(0, 0, 0), V(fuori.x * 0.02, fuori.y * 0.02, -0.03), V(fuori.x * 0.01, fuori.y * 0.01, -0.06), V(fuori.x * 0.03, fuori.y * 0.03, -0.085)], t => 0.007 * (1 - t) + 0.0012, m.carne, 16, 6);
      perno.add(tentacolo);
      bagliore(perno, V(fuori.x * 0.03, fuori.y * 0.03, -0.085), colori, 0.03);
      gruppo.add(perno);
      animazioni.push(t => {
        perno.rotation.x = Math.sin(t * 3 + i) * 0.25;
        perno.rotation.y = Math.cos(t * 2.4 + i * 1.7) * 0.25;
      });
    }
  },
  corna(gruppo, f, m, colori, animazioni) {
    const punte = [];
    for (const lato of [-1, 1]) {
      const base = f.bocca.clone().add(V(lato * 0.018, 0.0, 0.05));
      artiglio(gruppo, base, V(lato * 0.6, 0.15, -1).normalize(), 0.11, 0.012, V(-lato * 0.045, 0.01, 0), m.ossoAttivo);
      const punta = base.clone().add(V(lato * 0.021, 0.026, -0.105));
      gemma(gruppo, punta, 0.008, colori, animazioni);
      punte.push(bagliore(gruppo, punta, colori, 0.06));
    }
    const scintilla = bagliore(gruppo, f.bocca.clone().add(V(0, 0.02, -0.06)), colori, 0.05);
    animazioni.push(t => {
      const acceso = Math.sin(t * 29) > 0.1 || Math.sin(t * 17) > 0.6;
      scintilla.visible = acceso;
      scintilla.scale.setScalar(0.03 + (Math.sin(t * 41) + 1) * 0.02);
      punte.forEach((p, i) => { p.scale.setScalar(0.05 + Math.abs(Math.sin(t * (13 + i * 5))) * 0.04); });
    });
  },
  pungiglione(gruppo, f, m, colori, animazioni) {
    gemma(gruppo, f.bocca.clone().add(V(0, 0, 0.08)), 0.02, colori, animazioni);
    gruppo.add(tubo([f.bocca.clone().add(V(0, 0, 0.06)), f.bocca.clone().add(V(0, -0.004, -0.06)), f.bocca.clone().add(V(0, 0.004, -0.17))], t => 0.013 * (1 - t) ** 1.2 + 0.0006, m.chitina, 20, 8));
  },
  corno(gruppo, f, m, colori, animazioni) {
    const punti = [];
    const inizio = f.bocca.z + 0.3;
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      punti.push(V(Math.cos(t * 9) * 0.006 * (1 - t), 0.035 + Math.sin(t * 9) * 0.006 * (1 - t), inizio - t * 0.4));
    }
    gruppo.add(tubo(punti, t => 0.038 * (1 - t) ** 0.9 + 0.003, m.ossoAttivo, 60, 12));
    const giro = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.032 - i * 0.006, 0.0025, 6, 24), colori.vena);
      anello.position.set(0, 0.035, inizio - 0.08 - i * 0.07);
      giro.add(anello);
    }
    gruppo.add(giro);
    gemma(gruppo, V(0, 0.035, inizio + 0.01), 0.02, colori, animazioni);
  },
  cristalli(gruppo, f, m, colori, animazioni) {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      cristallo(gruppo, f.bocca.clone().add(V(Math.cos(a) * 0.022, Math.sin(a) * 0.022, 0.02)), V(Math.cos(a) * 0.5, Math.sin(a) * 0.5, -1), 0.05 + (i % 3) * 0.012, colori);
    }
    gemma(gruppo, f.bocca.clone().add(V(0, 0, 0.02)), 0.015, colori, animazioni);
  },
};

const EXTRA = {
  vene(gruppo, f, m, colori, animazioni, caso) {
    const fine = f.bocca.z + 0.05;
    for (const lato of [-1, 1]) {
      const punti = [];
      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        punti.push(V(lato * (0.022 + Math.sin(t * 11 + lato) * 0.004), 0.03 + Math.sin(t * 7 + caso() * 3) * 0.008, 0.07 + (fine - 0.07) * t));
      }
      gruppo.add(tubo(punti, () => 0.0028, colori.vena, 30, 5));
    }
  },
  cuore(gruppo, f, m, colori, animazioni) {
    const cuore = new THREE.Mesh(deforma(new THREE.SphereGeometry(0.03, 18, 14), 0.18, 5), m.carne);
    cuore.position.set(0, 0.04, -0.03);
    gruppo.add(cuore);
    const luce = bagliore(gruppo, cuore.position, colori, 0.12);
    animazioni.push(t => {
      const battito = 1 + Math.max(0, Math.sin(t * 7)) ** 6 * 0.18;
      cuore.scale.setScalar(battito);
      luce.material.opacity = 0.3 + (battito - 1) * 3;
    });
  },
  orbita(gruppo, f, m, colori, animazioni) {
    const giro = new THREE.Group();
    giro.position.set(0, 0.035, f.bocca.z * 0.55);
    for (let i = 0; i < 3; i++) {
      const sasso = new THREE.Mesh(deforma(new THREE.IcosahedronGeometry(0.011, 1), 0.3, i + 1), m.chitina);
      const a = (i / 3) * Math.PI * 2;
      sasso.position.set(Math.cos(a) * 0.05, Math.sin(a) * 0.05, 0);
      giro.add(sasso);
      bagliore(giro, sasso.position, colori, 0.04);
    }
    gruppo.add(giro);
    animazioni.push(t => { giro.rotation.z = t * 2.2; });
  },
  sacca(gruppo, f, m, colori, animazioni) {
    const sacca = new THREE.Mesh(deforma(new THREE.SphereGeometry(0.05, 20, 16), 0.08, 9), new THREE.MeshPhysicalMaterial({ color: 0x6b2a3a, emissive: colori.tinta, emissiveIntensity: 0.35, roughness: 0.2, clearcoat: 1, transparent: true, opacity: 0.85 }));
    sacca.scale.set(0.8, 0.7, 1.2);
    sacca.position.set(0, -0.035, f.bocca.z * 0.45);
    gruppo.add(sacca);
    for (let i = 0; i < 3; i++) {
      const uovo = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 8), colori.gemma);
      uovo.position.copy(sacca.position).add(V((i - 1) * 0.018, 0, (i % 2) * 0.02));
      gruppo.add(uovo);
    }
    animazioni.push(t => { sacca.scale.set(0.8 + Math.sin(t * 2) * 0.03, 0.7 + Math.sin(t * 2 + 1) * 0.03, 1.2); });
  },
  cristalli(gruppo, f, m, colori, animazioni, caso) {
    for (let i = 0; i < 9; i++) {
      const z = -0.08 + (f.bocca.z + 0.12 + 0.08) * caso();
      const a = (caso() < 0.5 ? -1 : 1) * (0.9 + caso() * 0.7);
      cristallo(gruppo, V(Math.sin(a) * 0.045, 0.03 + Math.cos(a) * 0.04, z), V(Math.sin(a), Math.cos(a) * 0.6, 0.5), 0.03 + caso() * 0.025, colori);
    }
  },
  gemma(gruppo, f, m, colori, animazioni) {
    gemma(gruppo, V(0, 0.07, 0.02), 0.02, colori, animazioni);
  },
  nucleo(gruppo, f, m, colori, animazioni) {
    const parte = new THREE.Group();
    const lungo = f.lungo ? 0.2 : 0.11;
    parte.position.copy(f.bocca).add(V(0, 0, lungo * 0.35));
    parte.add(new THREE.Mesh(new THREE.SphereGeometry(0.034, 20, 16), new THREE.MeshBasicMaterial({ color: 0x000000 })));
    const anelli = [0, 1].map(i => {
      const anello = new THREE.Mesh(new THREE.TorusGeometry(0.05 + i * 0.012, 0.003, 8, 40), colori.vena);
      parte.add(anello);
      return anello;
    });
    const luce = bagliore(parte, V(0, 0, 0), colori, 0.24);
    gruppo.add(parte);
    animazioni.push(t => {
      anelli[0].rotation.set(t * 2.6, t * 1.3, 0);
      anelli[1].rotation.set(-t * 1.7, 0, t * 2.1);
      luce.material.opacity = 0.6 + Math.sin(t * 5) * 0.25;
    });
  },
};

export const haFormaAliena = tipo => Object.hasOwn(FORME, tipo);

export function costruisciAliena(tipo, dati, base) {
  risorse ??= crea();
  const forma = FORME[tipo];
  const potenziata = !!dati.potenziata;
  const colori = coloriDi(new THREE.Color(dati.colore ?? 0x88ccff), potenziata);
  const materiali = { ...risorse, osso: potenziata ? risorse.ossoNero : risorse.osso };
  materiali.ossoAttivo = materiali.osso;
  const f = { ...forma, bocca: base.bocca.clone(), presa: base.presa?.clone() ?? null, potenziata, lungo: base.lunghezza > 1 };
  const gruppo = new THREE.Group();
  const animazioni = [];
  const caso = casuale(tipo.length * 977 + tipo.charCodeAt(0));
  CORPI[forma.corpo](gruppo, f, materiali, colori, caso);
  BOCCHE[forma.bocca](gruppo, f, materiali, colori, animazioni, caso);
  for (const e of forma.extra) EXTRA[e](gruppo, f, materiali, colori, animazioni, caso);
  return { gruppo, anima: animazioni.length ? t => animazioni.forEach(a => a(t)) : null };
}
