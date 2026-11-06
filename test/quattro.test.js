import { test } from 'node:test';
import assert from 'node:assert/strict';
import { R, zombieDelRound, fattoreOrda, moltiplicatoreBoss } from '../src/regole.js';
import { PARTENZE, PARTENZE_SALA } from '../src/mappa.js';
import { creaPartita, passo } from '../src/partita.js';
import { collega, collegaHost, OSPITI_MASSIMI } from '../src/rete/collegamento.js';
import { valida } from '../src/rete/protocollo.js';

function creaBus() {
  const punti = new Set();
  return () => {
    const ascoltatori = new Set();
    const punto = {
      ricevi: msg => ascoltatori.forEach(cb => cb(structuredClone(msg))),
      invia: msg => punti.forEach(p => { if (p !== punto) p.ricevi(msg); }),
      suMessaggio: cb => {
        ascoltatori.add(cb);
        return () => ascoltatori.delete(cb);
      },
      suStato: cb => cb('online'),
      chiudi: () => punti.delete(punto),
    };
    punti.add(punto);
    return punto;
  };
}

function avanza(stato, secondi) {
  for (let i = 0; i < Math.round(secondi / R.PASSO); i++) passo(stato, R.PASSO);
}

test('si gioca fino a quattro: quattro partenze diverse in sala e nella scuola', () => {
  assert.equal(OSPITI_MASSIMI, 3);
  for (const elenco of [PARTENZE, PARTENZE_SALA]) {
    assert.equal(elenco.length, 4);
    assert.equal(new Set(elenco.map(p => `${p.x},${p.z}`)).size, 4);
  }
  const giocatori = ['a', 'b', 'c', 'd'].map(id => ({ id, nome: id.toUpperCase() }));
  const sala = creaPartita({ seme: 3, giocatori, sala: true });
  assert.equal(new Set(sala.giocatori.map(g => `${g.x},${g.z}`)).size, 4);
});

test('in tre e in quattro ci sono più zombie e boss più resistenti, in due resta tutto come prima', () => {
  assert.equal(fattoreOrda(1), 1);
  assert.equal(fattoreOrda(2), 1);
  assert.ok(fattoreOrda(4) > fattoreOrda(3) && fattoreOrda(3) > 1);
  assert.equal(moltiplicatoreBoss(2), 1.7);
  assert.ok(moltiplicatoreBoss(4) > moltiplicatoreBoss(3));
  const giocatori = ['a', 'b', 'c', 'd'].map(id => ({ id, nome: id }));
  const stato = creaPartita({ seme: 9, giocatori });
  avanza(stato, R.PRIMO_ROUND_TRA + 0.05);
  assert.equal(stato.round, 1);
  assert.equal(stato.daGenerare + stato.zombie.length, Math.round(zombieDelRound(1) * fattoreOrda(4)));
});

test('il collegamento accoglie tre amici, il quarto trova la stanza piena', () => {
  const bus = creaBus();
  const host = collegaHost({ segnali: bus(), mioId: 'host', soloRiserva: true });
  const ricevuti = [];
  host.suMessaggio((m, da) => ricevuti.push([m.t, da]));
  const ospiti = ['o1', 'o2', 'o3', 'o4'].map(id => collega({ segnali: bus(), sonoHost: false, mioId: id, soloRiserva: true }));
  try {
    for (const id of ['o1', 'o2', 'o3']) assert.ok(host.collegato(id), `${id} non collegato`);
    assert.equal(host.collegato('o4'), false);
    assert.equal(ospiti[3].modo, 'occupata');
    ospiti[1].invia({ t: 'ping', n: 7 });
    assert.deepEqual(ricevuti, [['ping', 'o2']]);
    const arrivi = ospiti.map(() => []);
    ospiti.forEach((o, i) => o.suMessaggio(m => arrivi[i].push(m.t)));
    host.inviaA('o3', { t: 'pong', n: 1 });
    assert.deepEqual(arrivi.map(a => a.length), [0, 0, 1, 0]);
    host.invia({ t: 'pong', n: 2 });
    assert.deepEqual(arrivi.map(a => a.length), [1, 1, 2, 0]);
    host.rimuovi('o1');
    assert.equal(host.collegato('o1'), false);
  } finally {
    ospiti.forEach(o => o.chiudi());
    host.chiudi();
  }
});

test('il messaggio di sala porta i nomi di tutti, al massimo quattro', () => {
  assert.ok(valida({ t: 'lobby', nomeHost: 'Richi', ospite: 'x', giocatori: ['Richi', 'Seba', 'Lucone'] }));
  assert.ok(valida({ t: 'lobby', nomeHost: 'Richi' }));
  assert.equal(valida({ t: 'lobby', nomeHost: 'Richi', giocatori: ['a', 'b', 'c', 'd', 'e'] }), null);
});
