import { IFormatter } from '../../interfaces/formatter';
/**
 * !a
 */
export const not = {
  name: 'not',
  read(a: boolean) {
    return !a;
  },
} as IFormatter;
