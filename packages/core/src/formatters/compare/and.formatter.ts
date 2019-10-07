import { IFormatter } from '../../interfaces/formatter';
/**
 * a && b
 */
export const andFormatter: IFormatter = {
  name: 'and',
  read(a: boolean, b: boolean) {
    return a && b;
  },
};
