import { R, ARMI } from '../regole.js';
import { quota, POTENZIAMENTO } from '../mappa.js';
import { raggioSfera } from '../colpi.js';
import { muoviCerchio } from '../fisica.js';
import { livelloAcqua } from './acqua.js';
import { A } from './costanti.js';
import { DIALOGHI } from './testi.js';

const SALTO = 4.6;
const GRAVITA = 14;
const NUOTO_SU = 2.4;
const NUOTO_GIU = 2.6;
const AFFONDA = 0.7;
const MARGINE_TESTA = 1.45;
const ACQUA_ALTA = 0.3;
const RAGGIO_GLOBO = 1.2;
const SPINTA_TENTACOLO = 2.6;
const DURATA_SPINTA = 0.28;
const AVVISI_TENTACOLO = 3;
const NOMI_PASSI_RADIO = Object.freeze({ protocolloAbisso: 'PROTOCOLLO ABISSO ATTIVO', innoCompiuto: "L'INNO RISVEGLIA L'ABISSO" });

const VOCI = Object.freeze({ Mara: { pitch: 1.12, rate: 1.02 }, Sandri: { pitch: 0.72, rate: 0.92 } });

function parla(righe) {
  try {
    const sintesi = window.speechSynthesis;
    const voce = sintesi?.getVoices().find(v => v.lang?.toLowerCase().startsWith('it'));
    if (!voce) return;
    sintesi.cancel();
    const chi = righe[0].includes('Sandri') ? VOCI.Sandri : VOCI.Mara;
    const frase = new SpeechSynthesisUtterance(righe.slice(1).join(' '));
    Object.assign(frase, { voice: voce, lang: voce.lang, pitch: chi.pitch, rate: chi.rate, volume: 0.85 });
    sintesi.speak(frase);
  } catch {
    return;
  }
}

export function creaClientAbisso() {
  const s = { su: 0, vsu: 0, trascina: null, carica: 0, miraPrima: false, avvisiTentacolo: 0, ultimaBarra: 0 };

  function acqua(vista, io) {
    const piede = quota(io.x, io.z);
    const livello = livelloAcqua(vista.abisso, io.x, io.z);
    return { piede, livello, dentro: livello > piede + ACQUA_ALTA };
  }

  function verticale(vista, io, lettura, vivo, dt) {
    const { piede, livello, dentro } = acqua(vista, io);
    if (dentro && vivo) {
      const massimo = Math.max(0, livello - piede - MARGINE_TESTA);
      const voluto = lettura.salto ? NUOTO_SU : lettura.giu ? -NUOTO_GIU : -AFFONDA;
      s.vsu += (voluto - s.vsu) * Math.min(1, dt * 4);
      s.su = Math.min(massimo, Math.max(0, s.su + s.vsu * dt));
      if (s.su <= 0 || s.su >= massimo) s.vsu = 0;
    } else if (vivo && lettura.salto && s.su <= 0.001 && s.vsu === 0) {
      s.vsu = SALTO;
    }
    if (!dentro || !vivo) {
      if (s.su > 0 || s.vsu > 0) {
        s.vsu -= GRAVITA * dt;
        s.su = Math.max(0, s.su + s.vsu * dt);
        if (s.su <= 0) s.vsu = 0;
      }
    }
    io.su = s.su;
    return dentro;
  }

  return {
    muovi(io, lettura, me, vista, dt, ostacoli) {
      const vivo = me.stato === 'vivo';
      const dentro = verticale(vista, io, lettura, vivo, dt);
      if (vista.abisso?.giocatori?.[me.id]?.condotto) {
        s.trascina = null;
        return { bloccato: true, fattore: 0 };
      }
      if (s.trascina && vivo) {
        const t = s.trascina;
        t.resto -= dt;
        const passo = Math.min(1, dt / Math.max(dt, t.resto + dt));
        const dx = (t.x - io.x) * passo;
        const dz = (t.z - io.z) * passo;
        const nuova = muoviCerchio(io, dx, dz, R.RAGGIO_GIOCATORE, ostacoli);
        io.x = nuova.x;
        io.z = nuova.z;
        if (t.resto <= 0) s.trascina = null;
        return { bloccato: true, fattore: 0 };
      }
      s.trascina = null;
      const pinna = me.bevande.includes('scatto');
      return { bloccato: false, fattore: dentro ? (pinna ? 0.95 : 0.7) : 1 };
    },

    usaArmi(lettura, me, vista, dt, { tipo, spara, occupato, invia, mondo, audio, io, hud }) {
      const arma = ARMI[tipo] ?? null;
      if (!arma?.meraviglia) {
        s.carica = 0;
        s.miraPrima = lettura.mira;
        return false;
      }
      const miraPremuta = lettura.mira && !s.miraPrima;
      const miraRilasciata = !lettura.mira && s.miraPrima;
      s.miraPrima = lettura.mira;
      if (arma.meraviglia === 'cariddi') {
        if (miraPremuta) {
          invia({ tipo: 'abisso', cosa: 'collassa' });
          audio.suona('implosione');
        }
        if (!lettura.sparoPremuto) return true;
        const colpo = spara();
        if (!colpo) return true;
        invia({ tipo: 'abisso', cosa: 'globo', yaw: io.yaw, pitch: io.pitch });
        mondo.spara();
        audio.suona('buco');
        return true;
      }
      if (lettura.mira && !occupato()) {
        s.carica = Math.min(1, s.carica + dt / A.DARDO_CARICA);
        mondo.caricaTridente?.(s.carica);
      } else if (miraRilasciata) {
        if (s.carica >= 1) {
          invia({ tipo: 'abisso', cosa: 'dardo', yaw: io.yaw, pitch: io.pitch });
          mondo.spara();
          audio.suona('scarica');
        } else if (s.carica > 0.15) hud.avviso('Tieni premuto il destro finché il tridente non si carica');
        s.carica = 0;
        mondo.caricaTridente?.(0);
      }
      if (lettura.sparo && !lettura.mira && spara()) {
        invia({ tipo: 'abisso', cosa: 'onda', yaw: io.yaw });
        mondo.spara();
      }
      return true;
    },

    get carica() { return s.carica; },

    azzera(io) {
      Object.assign(s, { su: 0, vsu: 0, trascina: null, carica: 0, miraPrima: false });
      io.su = 0;
    },

    speciale(me, vista, { invia, hud, io }) {
      const mio = vista.abisso?.giocatori?.[me.id];
      if (!(mio?.scudo > 0)) {
        hud.avviso("Serve lo scudo da palombaro: si assembla al banco della Cupola");
        return;
      }
      invia({ tipo: 'abisso', cosa: 'sonica', yaw: io.yaw });
    },

    globoColpito(origine, direzione, vista, muro) {
      let migliore = null;
      for (const g of vista.abisso?.globi ?? []) {
        if (!g.fermo) continue;
        const t = raggioSfera(origine, direzione, g, RAGGIO_GLOBO);
        if (t < muro && (!migliore || t < migliore.t)) migliore = { id: g.id, t };
      }
      return migliore?.id ?? null;
    },

    fattoreDanno(me, arma) {
      return (me?.bevande?.includes('raffica') ? 2 : 1) * (arma.potenziata ? POTENZIAMENTO?.danno ?? 1 : 1);
    },

    evento(e, { hud, audio, mondo, perMe, vista, io, mioId }) {
      mondo.evento?.(e, vista);
      switch (e.k) {
        case 'radioAbisso':
          if (DIALOGHI[e.chiave]) {
            audio.suona('radio');
            hud.radio(DIALOGHI[e.chiave]);
            parla(DIALOGHI[e.chiave]);
          }
          return true;
        case 'turbina':
          if (e.accesa) {
            audio.suona('generatore');
            hud.avviso(`Turbina accesa: ${e.accese}/3`, 'bene');
          } else audio.suona('scatto');
          return true;
        case 'valvola':
          audio.suona(e.giusta ? 'scatto' : 'oraSbagliata');
          hud.avviso(e.giusta ? `Valvola di pressione ${e.n}/4` : 'La pressione sfiata: ricominciate dalla prima valvola', e.giusta ? 'bene' : 'pericolo');
          return true;
        case 'valvoleScadute':
          hud.avviso('Troppo lenti: le valvole si richiudono');
          return true;
        case 'protocolloAbisso':
        case 'innoCompiuto':
          audio.suona(e.k === 'protocolloAbisso' ? 'sirena' : 'ruggito');
          audio.suona('finale');
          hud.avviso(NOMI_PASSI_RADIO[e.k]);
          return true;
        case 'allagamento':
          audio.suona(e.verso > 0 ? 'rifugio' : 'generatore');
          hud.avviso(e.verso > 0 ? 'Il pozzo del reattore si allaga!' : 'Il pozzo si svuota', e.verso > 0 ? 'pericolo' : 'bene');
          return true;
        case 'barra':
          audio.suona('frammento');
          hud.avviso(`Barra di oricalco ${e.prese}/3`, 'bene');
          return true;
        case 'barraLontana':
          if (perMe && performance.now() - s.ultimaBarra > 1500) {
            s.ultimaBarra = performance.now();
            hud.avviso('Non ci arrivi: nuota su con Spazio o giù con C');
          }
          return true;
        case 'annega':
          if (perMe) {
            mondo.colpitoSchermo?.(0.8);
            hud.avviso('Stai annegando! Risali in superficie');
          }
          return true;
        case 'globoSparato':
          if (!perMe) audio.suona('buco');
          return true;
        case 'implosioneCariddi': {
          const d = Math.hypot(e.x - io.x, e.z - io.z);
          audio.esplosione(d, 0);
          audio.suona('implosione');
          if (e.uccisi?.length) for (const id of e.uccisi) mondo.nascondiZombie(id);
          return true;
        }
        case 'nodoCaduto':
          audio.suona('segreto');
          hud.avviso('Un nodo parassita è stato risucchiato dentro la stazione!', 'bene');
          return true;
        case 'nodoRaccolto':
          audio.suona('frammento');
          hud.avviso(`Nodi parassiti ${e.presi}/4`, 'bene');
          return true;
        case 'sferaPresa':
          if (perMe) {
            audio.suona('bolle');
            hud.avviso("Bolla d'ossigeno: ti para due colpi", 'bene');
          }
          return true;
        case 'bollaColpita':
          if (perMe) audio.suona('scarica');
          return true;
        case 'ondaTridente':
          if (!perMe) audio.suona('coltello');
          return true;
        case 'dardoLanciato':
          if (!perMe) audio.suona('scarica');
          return true;
        case 'fulmineTridente':
          audio.esplosione(Math.hypot(e.x - io.x, e.z - io.z), 0);
          audio.suona('scarica');
          return true;
        case 'ondaSonica':
          audio.suona('urlo');
          return true;
        case 'scudoColpito':
          if (perMe) audio.suona('pietra');
          return true;
        case 'scudoRotto':
          if (perMe) {
            audio.suona('frantumato');
            hud.avviso('Lo scudo si è spezzato: al banco se ne fa un altro tra poco');
          }
          return true;
        case 'scudoPreso':
          if (perMe) {
            audio.suona('acquisto');
            hud.avviso('Scudo da palombaro: ti copre la schiena · E per l\'onda sonica', 'bene');
          }
          return true;
        case 'scudoCostruito':
          audio.suona('potenziata');
          hud.avviso('Lo scudo da palombaro è assemblato!', 'bene');
          return true;
        case 'parteScudo':
          audio.suona('fusibile');
          hud.avviso(`Pezzi dello scudo ${e.prese}/3`, 'bene');
          return true;
        case 'boss':
          if (e.tipo !== 'palombaro') return false;
          audio.suona('boss');
          hud.avviso('Il Palombaro Corazzato! Mirate alle bombole sulla schiena');
          return true;
        case 'faseBoss':
          if (e.tipo !== 'leviatano') return false;
          audio.suona('urlo');
          hud.avviso(e.fase === 2 ? 'Il Leviatano si infuria!' : 'MAREA ALTA: caricate i piloni!');
          return true;
        case 'arpioneMira':
          if (e.a === mioId) hud.avviso('Il Palombaro ti ha preso di mira!');
          return true;
        case 'arpione':
          audio.suona('pietra');
          if (e.a === mioId) {
            s.trascina = { x: e.x, z: e.z, resto: A.ARPIONE_TIRO };
            mondo.colpitoSchermo?.(1);
          }
          return true;
        case 'arpioneMancato':
          return true;
        case 'vapore':
          audio.suona('anima');
          return true;
        case 'scottato':
          if (perMe) mondo.colpitoSchermo?.(0.4);
          return true;
        case 'stagna':
          audio.suona('porta');
          hud.avviso(e.chiusa ? 'Camera stagna sigillata' : 'Camera stagna aperta', 'bene');
          return true;
        case 'stagnaOccupata':
          if (perMe) hud.avviso('Uscite tutti dalla camera stagna prima di sigillarla');
          return true;
        case 'decompressione':
          audio.suona('sirena');
          hud.avviso('DECOMPRESSIONE ESPLOSIVA!');
          return true;
        case 'esplosioneStagna':
          audio.esplosione(Math.hypot(56 - io.x, io.z), 0);
          if (e.palombaro) hud.avviso('Lo scafandro del Palombaro è esploso!', 'bene');
          return true;
        case 'nucleoCaduto':
          audio.suona('segreto');
          hud.avviso('Il Nucleo Abissale è rimasto nella camera stagna!', 'bene');
          return true;
        case 'nucleoPreso':
          hud.avviso(perMe ? "Hai il Nucleo Abissale: portalo all'altare del Santuario" : 'Il Nucleo Abissale è in viaggio verso il Santuario', 'bene');
          return true;
        case 'nucleoPerso':
          hud.avviso('Il Nucleo è tornato nella camera stagna');
          return true;
        case 'nucleoIncastonato':
          audio.suona('segreto');
          hud.avviso('Poseidone accetta il Nucleo: prendete il suo tridente!', 'bene');
          return true;
        case 'condotto':
          if (perMe) audio.suona('bolle');
          return true;
        case 'condottoArrivo':
          return true;
        case 'notaOrgano':
          audio.organo?.(e.canna, e.giusta);
          hud.avviso(e.giusta ? `Nota dell'inno ${e.n}/5` : "Nota sbagliata! L'acqua si elettrizza…", e.giusta ? 'bene' : 'pericolo');
          return true;
        case 'leviatanoRisveglio':
          audio.suona('ruggito');
          audio.suona('finale');
          hud.avviso('IL LEVIATANO CORROTTO SI RISVEGLIA');
          return true;
        case 'leviatanoEmerso':
        case 'leviatanoRiemerge':
          audio.suona('ruggito');
          audio.suona('bolle');
          return true;
        case 'leviatanoImmerso':
          hud.avviso("Il Leviatano scompare nell'abisso… arrivano i suoi!");
          return true;
        case 'leviatanoStordito':
          audio.suona('bomba');
          hud.avviso('IL CUORE È SCOPERTO: colpitelo con Cariddi!', 'bene');
          return true;
        case 'leviatanoRiprende':
          return true;
        case 'leviatanoMorte':
          audio.suona('bossUcciso');
          hud.avviso('IL LEVIATANO È CADUTO', 'bene');
          return true;
        case 'marea':
          audio.suona('rifugio');
          return true;
        case 'pilone':
          audio.suona('scarica');
          return true;
        case 'spazzata':
          if (s.avvisiTentacolo < AVVISI_TENTACOLO) {
            s.avvisiTentacolo += 1;
            hud.avviso('TENTACOLO! Salta (Spazio) o togliti dalla zona luminosa');
          }
          return true;
        case 'colpoTentacolo':
          if (e.a === mioId) {
            mondo.colpitoSchermo?.(1.2);
            s.trascina = { x: io.x + Math.cos(e.verso) * SPINTA_TENTACOLO, z: io.z + Math.sin(e.verso) * SPINTA_TENTACOLO, resto: DURATA_SPINTA };
          }
          return true;
        case 'schivata':
          if (e.a === mioId) hud.avviso('Schivato!', 'bene');
          return true;
        case 'acido':
        case 'acidoCade':
        case 'spazzataColpisce':
          return true;
        case 'acidoColpisce':
          if (e.a === mioId) mondo.colpitoSchermo?.(0.8);
          return true;
        case 'ultimoRespiro':
          if (perMe) {
            audio.suona('rianimato');
            hud.avviso(`Ultimo Respiro: ti rialzi da solo (ne restano ${e.rimaste})`, 'bene');
          }
          return true;
        case 'smembra':
          mondo.smembra?.(e.zombie);
          return true;
        case 'pressioneCritica':
          audio.suona('vittoria');
          hud.trofeo(['PRESSIONE CRITICA', 'Easter egg completato', 'Tutte le bibite per sempre · armi al massimo · i round continuano']);
          return true;
        case 'passoAbisso':
          return true;
        case 'ferito':
          if (perMe) mondo.colpitoSchermo?.(0.5);
          return false;
        default:
          return false;
      }
    },
  };
}
