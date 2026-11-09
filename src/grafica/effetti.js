import * as THREE from 'three';
import { creaNuvola, creaTracce } from './particelle.js';

const PER_NUVOLA = 260;
const MACCHIE_MASSIME = 50;

function texturaPunto() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const sfumatura = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  sfumatura.addColorStop(0, 'rgba(255,255,255,1)');
  sfumatura.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  sfumatura.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sfumatura;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

const TIPI = {
  sangue: { colore: 0x8a0d0d, vita: 0.6, gravita: -7, dimensione: 0.12, sparsa: 2.4, additivo: false },
  scintilla: { colore: 0xffd27a, vita: 0.25, gravita: -2, dimensione: 0.07, sparsa: 3, additivo: true },
  polvere: { colore: 0x8c8270, vita: 0.7, gravita: 0.4, dimensione: 0.18, sparsa: 0.8, additivo: false },
  legno: { colore: 0x6b4a2b, vita: 0.9, gravita: -8, dimensione: 0.1, sparsa: 2.5, additivo: false },
  energia: { colore: 0x5fe9ff, vita: 0.45, gravita: 0.5, dimensione: 0.28, sparsa: 4, additivo: true },
  fuoco: { colore: 0xff8a2a, vita: 0.55, gravita: 1.2, dimensione: 0.34, sparsa: 3.5, additivo: true },
  fiamma: { colore: 0xff7a1a, vita: 0.35, gravita: 1.5, dimensione: 0.22, sparsa: 0.6, additivo: true },
  brina: { colore: 0xbfeaff, vita: 0.6, gravita: 0.2, dimensione: 0.32, sparsa: 0.45, additivo: true },
  ghiaccio: { colore: 0xe4f6ff, vita: 1, gravita: -9, dimensione: 0.11, sparsa: 3.2, additivo: false },
  scarica: { colore: 0x9cf0ff, vita: 0.3, gravita: -1, dimensione: 0.08, sparsa: 2.6, additivo: true },
  vuoto: { colore: 0xb06cff, vita: 0.55, gravita: 0, dimensione: 0.14, sparsa: 0, additivo: true },
};
const DURATA_FULMINE = 0.2;
const PEZZI_FULMINE = 10;
const SCARTO_FULMINE = 0.09;
const COLORI_ESPLOSIONE = Object.freeze({ energia: 0x5fe9ff, fuoco: 0xff8a2a, fulmine: 0xd8f0ff });
const DURATA_RAGGIO = 0.14;
const DURATA_LAMPO = 0.18;
const INTENSITA_LAMPO = 25;

export function creaEffetti(scena) {
  const texture = texturaPunto();
  const nuvole = { normale: creaNuvola(scena, texture, PER_NUVOLA, false), additiva: creaNuvola(scena, texture, PER_NUVOLA, true) };
  const tracce = creaTracce(scena);
  const raggi = [];
  const lampoEsplosione = new THREE.PointLight(0x5fe9ff, 0, 9, 1.4);
  scena.add(lampoEsplosione);
  let tempoLampo = 0;
  const macchie = [];
  const geometriaMacchia = new THREE.CircleGeometry(0.35, 6).rotateX(-Math.PI / 2);
  const materialeMacchia = new THREE.MeshBasicMaterial({ color: 0x4a0606, transparent: true, opacity: 0.85, depthWrite: false });

  function emetti(nome, punto, quante, verso = null, colore = null, spinta = 0.6) {
    const tipo = TIPI[nome];
    const nuvola = tipo.additivo ? nuvole.additiva : nuvole.normale;
    const spinto = verso ? tipo.sparsa * spinta : 0;
    for (let i = 0; i < quante; i++) {
      nuvola.nuova(
        punto.x, punto.y, punto.z,
        (Math.random() - 0.5) * tipo.sparsa + (verso?.x ?? 0) * spinto,
        Math.random() * tipo.sparsa * 0.6 + (verso?.y ?? 0) * spinto,
        (Math.random() - 0.5) * tipo.sparsa + (verso?.z ?? 0) * spinto,
        colore ?? tipo.colore, tipo.dimensione, tipo.vita * (0.6 + Math.random() * 0.8), tipo.gravita,
      );
    }
  }

  return {
    sangue(punto, verso, quante = 10) {
      emetti('sangue', punto, quante, verso);
    },
    impatto(punto, quante = 5) {
      emetti('scintilla', punto, quante);
      emetti('polvere', punto, Math.ceil(quante * 0.6));
    },
    traccia: (da, a) => tracce.traccia(da, a),
    dimensiona(altezza) {
      nuvole.normale.altezza(altezza);
      nuvole.additiva.altezza(altezza);
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
    brina(da, verso) {
      emetti('brina', da, 3, verso, null, 9);
    },
    ghiaccio(punto) {
      emetti('ghiaccio', punto, 36);
      emetti('brina', punto, 10);
    },
    scarica(punto) {
      emetti('scarica', punto, 8);
    },
    scia(punto, colore) {
      emetti('vuoto', punto, 2, null, colore);
    },
    risucchio(centro, raggio, quante = 5) {
      const durata = 0.6;
      for (let i = 0; i < quante; i++) {
        const angolo = Math.random() * Math.PI * 2;
        const r = raggio * (0.5 + Math.random() * 0.5);
        const x = centro.x + Math.cos(angolo) * r;
        const y = centro.y + (Math.random() - 0.5) * 1.6;
        const z = centro.z + Math.sin(angolo) * r;
        nuvole.additiva.nuova(x, y, z, (centro.x - x) / durata, (centro.y - y) / durata, (centro.z - z) / durata,
          Math.random() < 0.3 ? 0xffb070 : TIPI.vuoto.colore, TIPI.vuoto.dimensione, durata, 0);
      }
    },
    fulmine(punti, colore = 0x9cf0ff) {
      for (const spessore of [0, 1]) {
        const tracciato = [];
        for (let i = 0; i < punti.length - 1; i++) {
          const a = punti[i];
          const b = punti[i + 1];
          const lungo = a.distanceTo(b);
          for (let k = 0; k < PEZZI_FULMINE; k++) {
            const f = k / PEZZI_FULMINE;
            const scarto = k === 0 ? 0 : SCARTO_FULMINE * Math.min(4, lungo) * (spessore ? 0.5 : 1);
            tracciato.push(new THREE.Vector3(
              a.x + (b.x - a.x) * f + (Math.random() - 0.5) * scarto * 2,
              a.y + (b.y - a.y) * f + (Math.random() - 0.5) * scarto * 2,
              a.z + (b.z - a.z) * f + (Math.random() - 0.5) * scarto * 2,
            ));
          }
        }
        tracciato.push(punti[punti.length - 1].clone());
        const percorso = new THREE.CurvePath();
        for (let i = 0; i < tracciato.length - 1; i++) percorso.add(new THREE.LineCurve3(tracciato[i], tracciato[i + 1]));
        const tubo = new THREE.TubeGeometry(percorso, tracciato.length * 2, spessore ? 0.008 : 0.026, 5, false);
        const linea = new THREE.Mesh(tubo, new THREE.MeshBasicMaterial({ color: spessore ? 0xe8fbff : colore, transparent: true, opacity: spessore ? 1 : 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
        scena.add(linea);
        raggi.push({ linea, vita: DURATA_FULMINE });
      }
      for (const p of punti.slice(1)) emetti('scarica', p, 6);
      lampoEsplosione.color.setHex(colore);
      lampoEsplosione.position.copy(punti[punti.length - 1]);
      tempoLampo = DURATA_LAMPO * 0.6;
    },
    macchia(x, z) {
      const mesh = macchie.length >= MACCHIE_MASSIME ? macchie.shift() : new THREE.Mesh(geometriaMacchia, materialeMacchia);
      mesh.position.set(x + (Math.random() - 0.5) * 0.4, 0.012 + macchie.length * 0.0001, z + (Math.random() - 0.5) * 0.4);
      mesh.scale.setScalar(0.6 + Math.random() * 0.8);
      scena.add(mesh);
      macchie.push(mesh);
    },
    aggiorna(dt, occhio) {
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
      nuvole.normale.aggiorna(dt);
      nuvole.additiva.aggiorna(dt);
      tracce.aggiorna(dt, occhio);
    },
    svuota() {
      nuvole.normale.svuota();
      nuvole.additiva.svuota();
      tracce.svuota();
      for (const m of macchie.splice(0)) scena.remove(m);
    },
  };
}
