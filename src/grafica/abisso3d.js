import * as THREE from 'three';
import { quota } from '../mappa.js';
import { livelloAcqua } from '../abisso.js';
import { creaKit } from './abisso/kit.js';
import { creaMacchine } from './macchine3d.js';
import { creaFondale } from './abisso/fondale3d.js';
import { creaCupola } from './abisso/cupola3d.js';
import { creaReattore } from './abisso/reattore3d.js';
import { creaSantuario } from './abisso/santuario3d.js';
import { creaAnfiteatro } from './abisso/anfiteatro3d.js';
import { creaPassaggi } from './abisso/passaggi3d.js';
import { creaScenaLeviatano } from './abisso/leviatano3d.js';
import { creaEffettiAbisso } from './abisso/effetti3d.js';
import { animaCreature } from './abisso/creature3d.js';

const SCEGLI_LUCI_OGNI_S = 0.3;
const ACCENSIONE_LUCE_S = 0.5;
const LUCI_IN_PIU = 2;
const COLORE_CAUSTICHE = new THREE.Color(0x2fa8c8);
const COLORE_PROTOCOLLO = new THREE.Color(0x8a3cff);
const CIELO_CALMO = new THREE.Color(0x4a8fa8);
const CIELO_ALLARME = new THREE.Color(0xc8202a);
const NEBBIA_PROTOCOLLO = 0x0d0618;
const OMBRA_LATO = 2048;

export function costruisciAbisso(scena, { risorse, materialiArmi, oggetti, luciAccese = 3, qualita, effetti, emisfero, camera }) {
  const kit = creaKit(scena, { risorse, qualita, luciAccese });
  Object.assign(kit, { effetti, materialiArmi, oggetti, camera });
  const macchine = creaMacchine(scena, { materialiArmi, oggetti, metallo: kit.mat.acciaio, legno: kit.mat.paratia, serveCorrente: true, soloMuri: true });
  for (const crea of [creaFondale, creaCupola, creaReattore, creaSantuario, creaAnfiteatro, creaPassaggi, creaScenaLeviatano, creaEffettiAbisso]) crea(kit);
  kit.chiudiLotti();

  const luci = Array.from({ length: luciAccese + LUCI_IN_PIU }, () => {
    const luce = new THREE.PointLight(0xffffff, 0, 10, 1.5);
    scena.add(luce);
    return { luce, fonte: null, accensione: 0 };
  });
  const faro = qualita?.ombre ? new THREE.SpotLight(0xffffff, 0, 30, 0.95, 0.6, 1.4) : null;
  if (faro) {
    faro.castShadow = true;
    faro.shadow.mapSize.set(OMBRA_LATO, OMBRA_LATO);
    faro.shadow.bias = -0.0004;
    faro.shadow.normalBias = 0.03;
    faro.shadow.camera.near = 0.3;
    faro.shadow.camera.far = 30;
    scena.add(faro, faro.target);
  }
  let faroFonte = null;
  let attesaLuci = 0;
  const vicinanza = (punto, f) => (f.x - punto.x) ** 2 + (f.y - punto.y) ** 2 * 0.3 + (f.z - punto.z) ** 2;
  let post = null;
  let vista = null;

  function aggiornaLuci(v, dt, tempo, punto) {
    attesaLuci -= dt;
    if (punto && attesaLuci <= 0) {
      attesaLuci = SCEGLI_LUCI_OGNI_S;
      const attive = kit.fonti.filter(f => f.attiva?.(v) !== false);
      const vicine = attive.sort((a, b) => vicinanza(punto, a) - vicinanza(punto, b)).slice(0, luci.length);
      const libere = luci.filter(l => !vicine.includes(l.fonte));
      for (const f of vicine) {
        if (luci.some(l => l.fonte === f)) continue;
        const l = libere.shift();
        if (!l) break;
        Object.assign(l, { fonte: f, accensione: 0 });
        l.luce.color.setHex(f.colore);
        l.luce.distance = f.portata;
        l.luce.position.set(f.x, f.y, f.z);
      }
      if (faro) {
        const scelta = attive.filter(f => f.ombra).sort((a, b) => vicinanza(punto, a) - vicinanza(punto, b))[0] ?? null;
        if (scelta !== faroFonte) {
          faroFonte = scelta;
          if (scelta) {
            faro.position.set(scelta.x, scelta.y, scelta.z);
            faro.target.position.set(scelta.mira?.x ?? scelta.x, scelta.mira?.y ?? quota(scelta.x, scelta.z), scelta.mira?.z ?? scelta.z);
            faro.color.setHex(scelta.colore);
            faro.distance = scelta.portata * 1.6;
          }
        }
      }
    }
    for (const l of luci) {
      const f = l.fonte;
      if (!f) continue;
      l.accensione = Math.min(1, l.accensione + dt / ACCENSIONE_LUCE_S);
      const base = f.forza ? f.forza(v, tempo) : f.intensita * (f.tremola ? 0.85 + Math.sin(tempo * 9 + f.x) * 0.08 + Math.sin(tempo * 23 + f.z) * 0.06 : 1);
      l.luce.intensity = base * l.accensione;
      if (f.colorePer) l.luce.color.setHex(f.colorePer(v, tempo));
    }
    if (faro) faro.intensity = faroFonte ? (faroFonte.forza ? faroFonte.forza(v, tempo) : faroFonte.intensita) * 1.4 : 0;
  }

  function atmosfera(v, dt, tempo) {
    const ab = v.abisso;
    const protocollo = !!ab?.protocollo && !ab?.completata;
    const u = kit.uniformi;
    u.uTempo.value = tempo;
    u.uCaustica.value.lerp(protocollo ? COLORE_PROTOCOLLO : COLORE_CAUSTICHE, Math.min(1, dt * 0.8));
    u.uForzaCaustica.value += ((protocollo ? 0.85 : 0.5) - u.uForzaCaustica.value) * Math.min(1, dt);
    if (!emisfero) return;
    const allarme = protocollo ? 0.5 + 0.5 * Math.sin(tempo * 3.2) : 0;
    emisfero.color.copy(CIELO_CALMO).lerp(CIELO_ALLARME, allarme * 0.55);
    emisfero.intensity = protocollo ? 0.5 + allarme * 0.25 : 0.68;
  }

  return {
    aggiorna(v, dt, tempo, punto) {
      vista = v;
      atmosfera(v, dt, tempo);
      macchine.aggiorna(v, dt, tempo);
      animaCreature(tempo, v);
      for (const fn of kit.aggiornatori) fn(v, dt, tempo, punto);
      aggiornaLuci(v, dt, tempo, punto);
      if (post && punto) {
        post.stato.sottacqua = livelloAcqua(v.abisso, punto.x, punto.z) > punto.y ? 1 : 0;
      }
    },
    nebbia(v) {
      for (const fn of kit.nebbie) {
        const n = fn(v);
        if (n) return n;
      }
      if (v.abisso?.protocollo && !v.abisso?.completata) return { fattore: 0.85, colore: NEBBIA_PROTOCOLLO };
      return null;
    },
    evento(e, v) {
      for (const fn of kit.ascoltatori) fn(e, v ?? vista);
    },
    inquadra(v, cam, mioId, dt, io) {
      let condotto = 0;
      for (const fn of kit.inquadrature) {
        const r = fn(v, cam, mioId, dt, io);
        if (r) condotto = Math.max(condotto, typeof r === 'number' ? r : 1);
      }
      if (post) post.stato.condotto = condotto;
    },
    collegaPost(p) {
      post = p;
      kit.post = p;
    },
    svuota() {
      for (const fn of kit.svuotatori ?? []) fn();
    },
  };
}
