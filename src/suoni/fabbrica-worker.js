import { RICETTE, rendi } from './ricette.js';

self.onmessage = ({ data }) => {
  const canali = rendi(RICETTE, data.chiave, data.sr).map(c => c.slice());
  self.postMessage({ chiave: data.chiave, sr: data.sr, canali }, canali.map(c => c.buffer));
};
