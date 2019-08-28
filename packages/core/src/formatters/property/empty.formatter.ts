import { size } from './size.formatter';

export const empty = {
  name: 'empty',
  read(a: any[] | string ) {
    return size.read(a) <= 0;
  },
};
