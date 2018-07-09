import { count } from './count.formatter';

export const empty = (a: any[] | string ) => {
  return !count(a);
};
