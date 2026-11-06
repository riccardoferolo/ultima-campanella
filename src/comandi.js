const SENSIBILITA = 0.0022;
const PITCH_MASSIMO = 1.45;
const TASTI_GIOCO = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight', 'Space', 'KeyR', 'KeyF', 'KeyV', 'KeyQ', 'Digit1', 'Digit2', 'Digit3', 'Enter', 'NumpadEnter', 'KeyG', 'KeyM']);

export function creaComandi(superficie) {
  const premuti = new Set();
  const stato = { dyaw: 0, dpitch: 0, sparo: false, sparoPremuto: false, mira: false, fPremuto: false, fRilasciato: false, azioni: [] };
  let attivo = false;
  let suBlocco = () => {};

  const bloccato = () => document.pointerLockElement === superficie;
  const chiediBlocco = () => {
    const risposta = superficie.requestPointerLock?.();
    risposta?.catch?.(() => suBlocco(false));
  };

  function suTastoGiu(e) {
    if (!attivo || !TASTI_GIOCO.has(e.code)) return;
    e.preventDefault();
    if (e.repeat) return;
    premuti.add(e.code);
    if (e.code === 'KeyR') stato.azioni.push('ricarica');
    else if (e.code === 'KeyV') stato.azioni.push('coltello');
    else if (e.code === 'KeyQ') stato.azioni.push('cambia');
    else if (e.code === 'Digit1') stato.azioni.push({ arma: 0 });
    else if (e.code === 'Digit2') stato.azioni.push({ arma: 1 });
    else if (e.code === 'Digit3') stato.azioni.push({ arma: 2 });
    else if (e.code === 'KeyF') stato.fPremuto = true;
    else if (e.code === 'KeyG') stato.azioni.push('granata');
    else if (e.code === 'KeyM') stato.azioni.push('musica');
    else if (e.code === 'Enter' || e.code === 'NumpadEnter') stato.azioni.push('pronto');
  }
  function suTastoSu(e) {
    premuti.delete(e.code);
    if (e.code === 'KeyF') stato.fRilasciato = true;
  }
  function suMovimento(e) {
    if (!attivo || !bloccato()) return;
    stato.dyaw -= e.movementX * SENSIBILITA;
    stato.dpitch -= e.movementY * SENSIBILITA;
  }
  function suMouseGiu(e) {
    if (!attivo) return;
    if (!bloccato()) {
      chiediBlocco();
      return;
    }
    if (e.button === 0) {
      stato.sparo = true;
      stato.sparoPremuto = true;
    } else if (e.button === 2) stato.mira = true;
  }
  function suMouseSu(e) {
    if (e.button === 0) stato.sparo = false;
    else if (e.button === 2) stato.mira = false;
  }
  function suRotella(e) {
    if (attivo && bloccato()) stato.azioni.push('cambia');
  }
  function azzera() {
    premuti.clear();
    stato.sparo = false;
    stato.mira = false;
    if (premuti.has('KeyF')) stato.fRilasciato = true;
  }
  const suCambioBlocco = () => {
    if (!bloccato()) azzera();
    suBlocco(bloccato());
  };

  window.addEventListener('keydown', suTastoGiu);
  window.addEventListener('keyup', suTastoSu);
  window.addEventListener('blur', azzera);
  document.addEventListener('mousemove', suMovimento);
  superficie.addEventListener('mousedown', suMouseGiu);
  window.addEventListener('mouseup', suMouseSu);
  superficie.addEventListener('wheel', suRotella, { passive: true });
  superficie.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('pointerlockchange', suCambioBlocco);

  const premuto = (...codici) => codici.some(c => premuti.has(c));

  return {
    attiva(si) {
      attivo = si;
      if (!si) {
        azzera();
        if (bloccato()) document.exitPointerLock();
      }
    },
    blocca: chiediBlocco,
    suBlocco(cb) { suBlocco = cb; },
    get bloccato() { return bloccato(); },
    applicaVista(io) {
      io.yaw += stato.dyaw;
      io.pitch = Math.max(-PITCH_MASSIMO, Math.min(PITCH_MASSIMO, io.pitch + stato.dpitch));
      stato.dyaw = 0;
      stato.dpitch = 0;
    },
    leggi() {
      const lettura = {
        avanti: (premuto('KeyW', 'ArrowUp') ? 1 : 0) - (premuto('KeyS', 'ArrowDown') ? 1 : 0),
        lato: (premuto('KeyD', 'ArrowRight') ? 1 : 0) - (premuto('KeyA', 'ArrowLeft') ? 1 : 0),
        corsa: premuto('ShiftLeft', 'ShiftRight'),
        sparo: stato.sparo,
        sparoPremuto: stato.sparoPremuto,
        mira: stato.mira,
        f: premuto('KeyF'),
        fPremuto: stato.fPremuto,
        fRilasciato: stato.fRilasciato,
        azioni: stato.azioni.splice(0),
      };
      stato.sparoPremuto = false;
      stato.fPremuto = false;
      stato.fRilasciato = false;
      return lettura;
    },
  };
}
