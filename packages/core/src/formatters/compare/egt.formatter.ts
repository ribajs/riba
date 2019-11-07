import { Formatter } from '../../interfaces/formatter';
/**
 * equal or greater than
 * a >= b
 */
export const egtFormatter: Formatter = {
  name: 'egt',
  read(a: number, b: number) {
    return a >= b;
  },
};
