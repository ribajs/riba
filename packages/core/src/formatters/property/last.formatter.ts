import { get } from './get.formatter';

/**
 * Array formatter to get the last element of an array
 */
export const last = (array: any[]) => {
  return get(array, array.length - 1);
};
