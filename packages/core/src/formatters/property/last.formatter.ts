import { get } from './get.formatter';

/**
 * Array formatter to get the last element of an array
 */
export const last = {
  name: 'last',
  read(array: any[]) {
    return get.read(array, array.length - 1);
  },
};
