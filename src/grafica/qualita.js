const CHIAVE = 'campanella.grafica';
const PIXEL_SCHERMO_GRANDE = 2560 * 1440 * 0.9;
const GPU_SOFTWARE = /swiftshader|llvmpipe|basic render|software/i;
const GPU_INTEGRATA = /intel|uhd|iris|hd graphics|radeon\(tm\) graphics|radeon graphics|vega \d|mali|adreno|powervr/i;

export const LIVELLI = Object.freeze({
  alta: Object.freeze({ nome: 'Alta', antialias: true, scalaMinima: 0.5, scalaMassima: 1, texturePiene: true, vista: 1, densita: 1, animali: true, luci: 3 }),
  media: Object.freeze({ nome: 'Media', antialias: false, scalaMinima: 0.42, scalaMassima: 0.85, texturePiene: true, vista: 0.85, densita: 0.7, animali: true, luci: 3 }),
  bassa: Object.freeze({ nome: 'Bassa', antialias: false, scalaMinima: 0.35, scalaMassima: 0.7, texturePiene: false, vista: 0.7, densita: 0.45, animali: false, luci: 2 }),
});
export const ORDINE = Object.freeze(['alta', 'media', 'bassa']);

export function leggiScelta() {
  try {
    const scelta = localStorage.getItem(CHIAVE);
    return scelta && (scelta === 'auto' || LIVELLI[scelta]) ? scelta : 'auto';
  } catch {
    return 'auto';
  }
}

export function salvaScelta(scelta) {
  try {
    localStorage.setItem(CHIAVE, scelta);
  } catch {
    return false;
  }
  return true;
}

function nomeGpu() {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    const estensione = gl?.getExtension('WEBGL_debug_renderer_info');
    const nome = estensione ? gl.getParameter(estensione.UNMASKED_RENDERER_WEBGL) : '';
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return String(nome ?? '');
  } catch {
    return '';
  }
}

export function stimaLivello() {
  const gpu = nomeGpu();
  const pochiCore = (navigator.hardwareConcurrency ?? 8) <= 4;
  const pocaMemoria = (navigator.deviceMemory ?? 8) <= 4;
  const rapporto = window.devicePixelRatio || 1;
  const schermoGrande = screen.width * rapporto * screen.height * rapporto > PIXEL_SCHERMO_GRANDE;
  if (GPU_SOFTWARE.test(gpu)) return 'bassa';
  const integrata = GPU_INTEGRATA.test(gpu);
  if (integrata && (pochiCore || pocaMemoria || schermoGrande)) return 'bassa';
  if (integrata || pochiCore || pocaMemoria || schermoGrande) return 'media';
  return 'alta';
}

let stimato = null;
export function livelloAttivo() {
  const scelta = leggiScelta();
  if (scelta !== 'auto') return scelta;
  stimato ??= stimaLivello();
  return stimato;
}
