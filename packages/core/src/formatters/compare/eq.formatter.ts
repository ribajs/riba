import { IFormatter } from '../../interfaces/formatter';
/**
 * a === b
 */
export const eq: IFormatter = {
  name: 'eq',
  read(a: any, b: any) {
    return a === b;
  },
};
