import { IFormatter } from '../../interfaces/formatter';
/**
 * !a
 */
export const not: IFormatter = {
  name: 'not',
  read(a: boolean) {
    return !a;
  },
};
