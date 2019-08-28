import { IFormatter } from '../../interfaces/formatter';
/**
 * a !== b
 */
export const ne: IFormatter = {
  name: 'ne',
  read(a: any, b: any) {
    return a !== b;
  },
};
