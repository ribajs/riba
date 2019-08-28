import { IFormatter } from '../../interfaces/formatter';
/**
 * lower than
 * a < b
 */
export const lt: IFormatter = {
  name: 'lt',
  read(a: number, b: number) {
    return a < b;
  },
};
