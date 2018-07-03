import { get } from './get.formatter';

/**
 * Array formatter to get the first element of an array
 */
export const first = (arr: any[]) => {
  return get(arr, 0);
};
