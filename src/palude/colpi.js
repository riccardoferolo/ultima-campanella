export const TIPI_COLPO = Object.freeze(['scarica', 'acido', 'tela', 'pioggia']);
export const INVISCHIATO = 2.5;

const DANNI = Object.freeze({ scarica: 30, acido: 30, tela: 0, pioggia: 30 });
const DURATA_POZZA = 5;
const RAGGIO_POZZA = 1.7;
const DANNO_POZZA = 6;
const OGNI_POZZA = 0.5;

const distanza = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function statoColpi() {
  return { colpi: [], pozze: [], invischiati: {}, prossimoColpo: 1, attesaPozze: OGNI_POZZA };
}

export function aggiungiColpo(palude, tipo, x, z, timer, raggio) {
  palude.colpi.push({ id: palude.prossimoColpo++, tipo, x, z, timer, raggio });
}

export function svuotaColpi(palude, tipo = null) {
  palude.colpi = tipo ? palude.colpi.filter(c => c.tipo !== tipo) : [];
  if (tipo) return;
  palude.pozze = [];
  palude.invischiati = {};
}

function scoppia(stato, c, eventi, S) {
  const palude = stato.palude;
  const colpiti = S.vivi(stato).filter(g => distanza(g, c) <= c.raggio);
  for (const g of colpiti) {
    if (c.tipo !== 'tela') {
      S.ferisciGiocatore(stato, g, eventi, DANNI[c.tipo]);
      continue;
    }
    palude.invischiati[g.id] = INVISCHIATO;
    eventi.push({ k: 'invischiato', a: g.id });
  }
  if (c.tipo === 'acido') palude.pozze.push({ id: palude.prossimoColpo++, x: c.x, z: c.z, timer: DURATA_POZZA, raggio: RAGGIO_POZZA });
  eventi.push({ k: 'colpoPalude', tipo: c.tipo, x: c.x, z: c.z });
}

export function aggiornaColpi(stato, dt, eventi, S, pozzeFisse = []) {
  const palude = stato.palude;
  for (const id of Object.keys(palude.invischiati)) {
    palude.invischiati[id] -= dt;
    if (palude.invischiati[id] <= 0) delete palude.invischiati[id];
  }
  if (palude.colpi.length) {
    palude.colpi = palude.colpi.filter(c => {
      c.timer -= dt;
      if (c.timer > 0) return true;
      scoppia(stato, c, eventi, S);
      return false;
    });
  }
  palude.pozze = palude.pozze.filter(p => (p.timer -= dt) > 0);
  if (!palude.pozze.length && !pozzeFisse.length) return;
  palude.attesaPozze -= dt;
  if (palude.attesaPozze > 0) return;
  palude.attesaPozze += OGNI_POZZA;
  for (const g of S.vivi(stato)) {
    if ([...palude.pozze, ...pozzeFisse].some(p => distanza(g, p) <= p.raggio)) S.ferisciGiocatore(stato, g, eventi, DANNO_POZZA);
  }
}
