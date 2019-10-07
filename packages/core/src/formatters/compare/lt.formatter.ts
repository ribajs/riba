import { IFormatter } from '../../interfaces/formatter';
/**
 * lower than
 * a < b
 */
export const ltFormatter: IFormatter = {
  name: 'lt',
  read(a: number, b: number) {
    return a < b;
  },
};
