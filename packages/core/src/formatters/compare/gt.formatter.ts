import { IFormatter } from '../../interfaces/formatter';
/**
 * greater than
 * a > b
 */
export const gtFormatter: IFormatter = {
  name: 'gt',
  read(a: number, b: number) {
    return a > b;
  },
};
