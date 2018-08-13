import { size } from './size.formatter';

export const empty = (a: any[] | string ) => {
  return size(a) <= 0;
};
