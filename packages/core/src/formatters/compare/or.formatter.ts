import { IFormatter } from '../../interfaces/formatter';
/**
 * a || b
 */
export const orFormatter: IFormatter = {
  name: 'or',
  read(a: boolean, b: boolean) {
    return a || b;
  },
};
