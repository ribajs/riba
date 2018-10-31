import { Utils } from '../../utils';
import { get } from './get.formatter';

/**
 * Array formatter to get the first element of an array
 */
export const first = (value: any | any[] | string) => {
  return get(value, 0);
};
