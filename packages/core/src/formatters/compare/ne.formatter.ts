import { Formatter } from '../../interfaces/formatter';
/**
 * a !== b
 */
export const neFormatter: Formatter = {
  name: 'ne',
  read(a: any, b: any) {
    return a !== b;
  },
};
