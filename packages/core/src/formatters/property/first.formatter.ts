import { get } from './get.formatter';

/**
 * Array formatter to get the first element of an array
 */
export const first = {
  name: 'first',
  read(value: any | any[] | string) {
    return get.read(value, 0);
  },
};
