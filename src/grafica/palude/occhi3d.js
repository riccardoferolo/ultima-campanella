import * as THREE from 'three';

export const COLORI_OCCHI = Object.freeze({ '': 0x7dff9a, ghiaccio: 0x9fe6ff, fuoco: 0xffa040, vuoto: 0xc58bff, vento: 0xe6fff0 });
const SOLLEVA_TESCHIO = 1.35;
const DIMENSIONE = 0.22;
const ALONE = 1.5;
const ALONE_GIU = 0.55;
const AVANTI = 0.1;
const DISTANZA_OCCHI = 0.038;
const ALZA = 0.025;

let texture = null;
const materiali = new Map();

function texturaOcchio() {
  if (texture) return texture;
  const tela = document.createElement('canvas');
  tela.width = tela.height = 32;
  const c = tela.getContext('2d');
  const g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, 32, 32);
  texture = new THREE.CanvasTexture(tela);
  return texture;
}

function materiale(elemento) {
  if (!materiali.has(elemento)) {
    materiali.set(elemento, new THREE.SpriteMaterial({
      map: texturaOcchio(), color: COLORI_OCCHI[elemento] ?? COLORI_OCCHI[''], transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    }));
  }
  return materiali.get(elemento);
}

const aloni = new Map();
function materialeAlone(elemento) {
  if (!aloni.has(elemento)) {
    aloni.set(elemento, new THREE.SpriteMaterial({
      map: texturaOcchio(), color: COLORI_OCCHI[elemento] ?? COLORI_OCCHI[''], transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
  }
  return aloni.get(elemento);
}

export const altezzaLevitazione = p => SOLLEVA_TESCHIO * p * p * (3 - 2 * p) + (p > 0 ? 0.2 : 0);

export function creaOcchi(scena) {
  const coppie = new Map();
  const punto = new THREE.Vector3();

  function coppia(id) {
    if (!coppie.has(id)) {
      const sinistro = new THREE.Sprite(materiale(''));
      const destro = new THREE.Sprite(materiale(''));
      const alone = new THREE.Sprite(materialeAlone(''));
      scena.add(sinistro, destro, alone);
      coppie.set(id, { sinistro, destro, alone, elemento: '' });
    }
    return coppie.get(id);
  }

  function togli(id) {
    const c = coppie.get(id);
    if (!c) return;
    scena.remove(c.sinistro, c.destro, c.alone);
    coppie.delete(id);
  }

  return {
    aggiorna(id, testa, yaw, levitato, tempo) {
      if (!levitato || !testa) {
        togli(id);
        return;
      }
      const c = coppia(id);
      if (c.elemento !== levitato.e) {
        c.elemento = levitato.e;
        c.sinistro.material = c.destro.material = materiale(levitato.e);
        c.alone.material = materialeAlone(levitato.e);
      }
      testa.getWorldPosition(punto);
      const fx = Math.sin(yaw);
      const fz = Math.cos(yaw);
      const pulsa = DIMENSIONE * (0.75 + 0.5 * levitato.p) * (1 + 0.12 * Math.sin(tempo * 14 + id));
      for (const [occhio, lato] of [[c.sinistro, 1], [c.destro, -1]]) {
        occhio.position.set(punto.x + fx * AVANTI + fz * DISTANZA_OCCHI * lato, punto.y + ALZA, punto.z + fz * AVANTI - fx * DISTANZA_OCCHI * lato);
        occhio.scale.setScalar(pulsa);
      }
      c.alone.position.set(punto.x, punto.y - ALONE_GIU, punto.z);
      c.alone.scale.setScalar(ALONE * (0.6 + 0.4 * levitato.p) * (1 + 0.08 * Math.sin(tempo * 6 + id)));
    },
    togli,
    svuota() {
      for (const id of [...coppie.keys()]) togli(id);
    },
  };
}
