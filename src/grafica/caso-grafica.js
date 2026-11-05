import { passoCaso } from '../caso.js';

export function creaCaso(seme) {
  let stato = seme >>> 0;
  return () => {
    const [valore, nuovo] = passoCaso(stato);
    stato = nuovo;
    return valore;
  };
}
