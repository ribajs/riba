import { IFormatter } from '../../interfaces/formatter';
/**
 * a || b
 */
export const or = {
  name: 'or',
  read(a: boolean, b: boolean) {
    return a || b;
  },
} as IFormatter;
