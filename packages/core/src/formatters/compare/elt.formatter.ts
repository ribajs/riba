import { IFormatter } from '../../interfaces/formatter';
/**
 * euqal or lower than
 * a <= b
 */
export const eltFormatter: IFormatter = {
  name: 'elt',
  read(a: number, b: number) {
    return a <= b;
  },
};
