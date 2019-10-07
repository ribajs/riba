import { sizeFormatter } from './size.formatter';

export const emptyFormatter = {
  name: 'empty',
  read(a: any[] | string ) {
    return sizeFormatter.read(a) <= 0;
  },
};
