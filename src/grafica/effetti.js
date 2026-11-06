import * as THREE from 'three';

const MASSIMO = 220;
const MACCHIE_MASSIME = 50;

function texturaPunto() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(4, 4, 8, 8);
  ctx.fillRect(2, 6, 12, 4);
  ctx.fillRect(6, 2, 4, 12);
  const t = new THREE.CanvasTexture(canvas);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  return t;
}

const TIPI = {
  sangue: { colore: 0x8a0d0d, vita: 0.6, gravita: -7, dimensione: 0.12, sparsa: 2.4, additivo: false },
  scintilla: { colore: 0xffd27a, vita: 0.25, gravita: -2, dimensione: 0.07, sparsa: 3, additivo: true },
  polvere: { colore: 0x8c8270, vita: 0.7, gravita: 0.4, dimensione: 0.18, sparsa: 0.8, additivo: false },
  legno: { colore: 0x6b4a2b, vita: 0.9, gravita: -8, dimensione: 0.1, sparsa: 2.5, additivo: false },
  energia: { colore: 0x5fe9ff, vita: 0.45, gravita: 0.5, dimensione: 0.28, sparsa: 4, additivo: true },
  fuoco: { colore: 0xff8a2a, vita: 0.55, gravita: 1.2, dimensione: 0.34, sparsa: 3.5, additivo: true },
  fiamma: { colore: 0xff7a1a, vita: 0.35, gravita: 1.5, dimensione: 0.22, sparsa: 0.6, additivo: true },
};
const COLORI_ESPLOSIONE = Object.freeze({ energia: 0x5fe9ff, fuoco: 0xff8a2a, fulmine: 0xd8f0ff });
const DURATA_RAGGIO = 0.14;
const DURATA_LAMPO = 0.18;
const INTENSITA_LAMPO = 25;

export function creaEffetti(scena) {
  const texture = texturaPunto();
  const libere = [];
  const attive = [];
  for (let i = 0; i < MASSIMO; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.visible = false;
    scena.add(sprite);
    libere.push({ sprite, velocita: new THREE.Vector3(), vita: 0, durata: 1, tipo: null });
  }
  const raggi = [];
  const lampoEsplosione = new THREE.PointLight(0x5fe9ff, 0, 9, 1.4);
  scena.add(lampoEsplosione);
  let tempoLampo = 0;
  const macchie = [];
  const geometriaMacchia = new THREE.CircleGeometry(0.35, 6).rotateX(-Math.PI / 2);
  const materialeMacchia = new THREE.MeshBasicMaterial({ color: 0x4a0606, transparent: true, opacity: 0.85, depthWrite: false });

  function emetti(nome, punto, quante, verso = null, colore = null, spinta = 0.6) {
    const tipo = TIPI[nome];
    for (let i = 0; i < quante && libere.length; i++) {
      const p = libere.pop();
      p.tipo = tipo;
      p.vita = 0;
      p.durata = tipo.vita * (0.6 + Math.random() * 0.8);
      p.velocita.set((Math.random() - 0.5) * tipo.sparsa, Math.random() * tipo.sparsa * 0.6, (Math.random() - 0.5) * tipo.sparsa);
      if (verso) p.velocita.addScaledVector(verso, tipo.sparsa * spinta);
      p.sprite.position.copy(punto);
      p.sprite.material.color.setHex(colore ?? tipo.colore);
      p.sprite.material.blending = tipo.additivo ? THREE.AdditiveBlending : THREE.NormalBlending;
      p.sprite.scale.setScalar(tipo.dimensione);
      p.sprite.visible = true;
      attive.push(p);
    }
  }

  return {
    sangue(punto, verso) {
      emetti('sangue', punto, 10, verso);
    },
    impatto(punto) {
      emetti('scintilla', punto, 5);
      emetti('polvere', punto, 3);
    },
    schegge(punto) {
      emetti('legno', punto, 10);
    },
    raggio(da, a, colore = 0x7ef0ff) {
      const geometria = new THREE.BufferGeometry().setFromPoints([da, a]);
      const linea = new THREE.Line(geometria, new THREE.LineBasicMaterial({ color: colore, transparent: true, blending: THREE.AdditiveBlending }));
      scena.add(linea);
      raggi.push({ linea, vita: DURATA_RAGGIO });
    },
    esplosione(punto, tipo = 'energia', colore = null) {
      const tinta = colore ?? COLORI_ESPLOSIONE[tipo] ?? COLORI_ESPLOSIONE.energia;
      emetti(tipo === 'fuoco' ? 'fuoco' : 'energia', punto, tipo === 'fuoco' ? 30 : 22, null, tinta);
      if (tipo === 'fuoco') emetti('polvere', punto, 8);
      lampoEsplosione.color.setHex(tinta);
      lampoEsplosione.position.copy(punto);
      tempoLampo = DURATA_LAMPO;
    },
    fiamma(da, verso, colore) {
      emetti('fiamma', da, 4, verso, colore, 6);
    },
    macchia(x, z) {
      const mesh = macchie.length >= MACCHIE_MASSIME ? macchie.shift() : new THREE.Mesh(geometriaMacchia, materialeMacchia);
      mesh.position.set(x + (Math.random() - 0.5) * 0.4, 0.012 + macchie.length * 0.0001, z + (Math.random() - 0.5) * 0.4);
      mesh.scale.setScalar(0.6 + Math.random() * 0.8);
      scena.add(mesh);
      macchie.push(mesh);
    },
    aggiorna(dt) {
      tempoLampo = Math.max(0, tempoLampo - dt);
      lampoEsplosione.intensity = INTENSITA_LAMPO * (tempoLampo / DURATA_LAMPO);
      for (let i = raggi.length - 1; i >= 0; i--) {
        const r = raggi[i];
        r.vita -= dt;
        r.linea.material.opacity = Math.max(0, r.vita / DURATA_RAGGIO);
        if (r.vita > 0) continue;
        scena.remove(r.linea);
        r.linea.geometry.dispose();
        r.linea.material.dispose();
        raggi.splice(i, 1);
      }
      for (let i = attive.length - 1; i >= 0; i--) {
        const p = attive[i];
        p.vita += dt;
        if (p.vita >= p.durata || p.sprite.position.y < 0) {
          p.sprite.visible = false;
          attive.splice(i, 1);
          libere.push(p);
          continue;
        }
        p.velocita.y += p.tipo.gravita * dt;
        p.sprite.position.addScaledVector(p.velocita, dt);
        p.sprite.material.opacity = 1 - p.vita / p.durata;
      }
    },
    svuota() {
      for (const p of attive.splice(0)) {
        p.sprite.visible = false;
        libere.push(p);
      }
      for (const m of macchie.splice(0)) scena.remove(m);
    },
  };
}
