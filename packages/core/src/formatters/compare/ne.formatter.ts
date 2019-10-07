import { IFormatter } from '../../interfaces/formatter';
/**
 * a !== b
 */
export const neFormatter: IFormatter = {
  name: 'ne',
  read(a: any, b: any) {
    return a !== b;
  },
};
