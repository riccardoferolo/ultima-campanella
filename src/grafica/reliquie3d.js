import * as THREE from 'three';

const MAGENTA = new THREE.Color(0xff4fd8);

function lama(punti, spessore, materiale) {
  const forma = new THREE.Shape(punti.map(([x, y]) => new THREE.Vector2(x, y)));
  const g = new THREE.ExtrudeGeometry(forma, { depth: spessore, bevelEnabled: true, bevelThickness: spessore * 0.4, bevelSize: 0.004, bevelSegments: 2 });
  g.translate(0, 0, -spessore / 2);
  g.rotateY(Math.PI / 2);
  return new THREE.Mesh(g, materiale);
}

function impugnatura(gruppo, lunghezza, colore = 0x2a1a12) {
  const pelle = new THREE.MeshStandardMaterial({ color: colore, roughness: 0.8 });
  const manico = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.019, lunghezza, 10).rotateX(Math.PI / 2), pelle);
  manico.position.z = lunghezza / 2 - 0.03;
  gruppo.add(manico);
  for (let i = 0; i < 4; i++) {
    const giro = new THREE.Mesh(new THREE.TorusGeometry(0.019, 0.003, 5, 12), pelle);
    giro.position.z = -0.02 + i * (lunghezza / 4);
    gruppo.add(giro);
  }
}

let alone = null;
function texturaAlone() {
  if (alone) return alone;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  alone = new THREE.CanvasTexture(canvas);
  return alone;
}

function bagliore(colore, scala) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaAlone(), color: colore, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.setScalar(scala);
  return s;
}

const COSTRUTTORI = {
  machete(gruppo, colore) {
    const giada = new THREE.MeshPhysicalMaterial({ color: colore.clone().multiplyScalar(0.55), emissive: colore, emissiveIntensity: 0.35, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1 });
    const l = lama([[0, -0.022], [0.3, -0.03], [0.5, -0.04], [0.58, -0.01], [0.6, 0.03], [0.52, 0.052], [0.3, 0.038], [0, 0.028]], 0.008, giada);
    l.position.z = -0.06;
    l.rotation.x = 0;
    l.rotation.z = Math.PI;
    l.rotation.y = 0;
    const guardia = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.03), new THREE.MeshStandardMaterial({ color: 0xc8a24a, metalness: 0.9, roughness: 0.3 }));
    guardia.position.z = -0.045;
    gruppo.add(l, guardia);
    impugnatura(gruppo, 0.14);
    const s = bagliore(colore, 0.35);
    s.position.set(0, 0, -0.4);
    gruppo.add(s);
    return { bocca: new THREE.Vector3(0, 0, -0.66), lunghezza: 0.7, anima: t => { giada.emissiveIntensity = 0.3 + Math.sin(t * 3) * 0.12; s.material.opacity = 0.25 + Math.sin(t * 3) * 0.12; } };
  },
  spada(gruppo, colore) {
    const acciaio = new THREE.MeshPhysicalMaterial({ color: 0xe9dcc0, emissive: colore, emissiveIntensity: 0.25, metalness: 0.95, roughness: 0.18, clearcoat: 1 });
    const l = lama([[0, -0.026], [0.7, -0.02], [0.8, 0], [0.7, 0.02], [0, 0.026]], 0.009, acciaio);
    l.position.z = -0.07;
    l.rotation.z = Math.PI;
    const oro = new THREE.MeshStandardMaterial({ color: 0xd6a63a, metalness: 0.95, roughness: 0.25 });
    const guardia = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.025, 0.03), oro);
    guardia.position.z = -0.055;
    const sole = new THREE.Mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: colore }));
    sole.position.set(0, 0.016, -0.055);
    sole.rotation.x = -Math.PI / 2;
    const raggi = new THREE.Mesh(new THREE.RingGeometry(0.038, 0.06, 12, 1), new THREE.MeshBasicMaterial({ color: 0xffe08a, side: THREE.DoubleSide }));
    raggi.position.copy(sole.position);
    raggi.rotation.x = -Math.PI / 2;
    gruppo.add(l, guardia, sole, raggi);
    impugnatura(gruppo, 0.16, 0x3a1e10);
    const s = bagliore(colore, 0.4);
    s.position.set(0, 0, -0.5);
    gruppo.add(s);
    return { bocca: new THREE.Vector3(0, 0, -0.86), lunghezza: 0.9, anima: t => { raggi.rotation.z = t; acciaio.emissiveIntensity = 0.2 + Math.sin(t * 4) * 0.1; } };
  },
  bastone(gruppo, colore) {
    const legno = new THREE.MeshStandardMaterial({ color: 0x4a3420, roughness: 0.75 });
    const asta = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 1.25, 10).rotateX(Math.PI / 2), legno);
    asta.position.z = -0.25;
    gruppo.add(asta);
    const squame = new THREE.MeshStandardMaterial({ color: colore.clone().multiplyScalar(0.5), emissive: colore, emissiveIntensity: 0.15, roughness: 0.45, metalness: 0.2 });
    const punti = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = t * Math.PI * 7;
      punti.push(new THREE.Vector3(Math.cos(a) * 0.032, Math.sin(a) * 0.032, -0.15 - t * 0.6));
    }
    const corpo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punti), 120, 0.011, 6, false), squame);
    const testa = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 10), squame);
    testa.scale.set(1, 0.7, 1.6);
    testa.position.set(0, 0.03, -0.85);
    const occhi = new THREE.MeshBasicMaterial({ color: 0xff3a2a });
    for (const dx of [-0.018, 0.018]) {
      const occhio = new THREE.Mesh(new THREE.SphereGeometry(0.006, 6, 4), occhi);
      occhio.position.set(dx, 0.045, -0.88);
      gruppo.add(occhio);
      const zanna = new THREE.Mesh(new THREE.ConeGeometry(0.004, 0.025, 5).rotateX(Math.PI), new THREE.MeshStandardMaterial({ color: 0xf2ead8 }));
      zanna.position.set(dx * 0.6, 0.01, -0.91);
      gruppo.add(zanna);
    }
    gruppo.add(corpo, testa);
    const s = bagliore(colore, 0.3);
    s.position.set(0, 0.03, -0.86);
    gruppo.add(s);
    return { bocca: new THREE.Vector3(0, 0.03, -0.9), lunghezza: 1.2, anima: t => { s.material.opacity = 0.3 + Math.max(0, Math.sin(t * 2.5)) * 0.4; squame.emissiveIntensity = 0.1 + Math.max(0, Math.sin(t * 2.5)) * 0.25; } };
  },
};

export function creaReliquia(tipo, dati) {
  const gruppo = new THREE.Group();
  const colore = new THREE.Color(dati.colore ?? 0xffffff);
  if (dati.potenziata) colore.lerp(MAGENTA, 0.35);
  const { bocca, lunghezza, anima } = COSTRUTTORI[tipo](gruppo, colore);
  gruppo.rotation.x = 0.35;
  const contenitore = new THREE.Group();
  contenitore.add(gruppo);
  contenitore.userData.anima = anima;
  return { gruppo: contenitore, bocca: bocca.applyEuler(new THREE.Euler(0.35, 0, 0)), presa: null, lunghezza, colore: dati.colore ?? null };
}
