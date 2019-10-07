import { IFormatter } from '../../interfaces/formatter';
/**
 * !a
 */
export const notFormatter: IFormatter = {
  name: 'not',
  read(a: boolean) {
    return !a;
  },
};
