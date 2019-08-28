import { IFormatter } from '../../interfaces/formatter';
/**
 * greater than
 * a > b
 */
export const gt: IFormatter = {
  name: 'gt',
  read(a: number, b: number) {
    return a > b;
  },
};
