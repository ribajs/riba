import { Utils } from '../../utils';
import { empty } from '../property/empty.formatter';

/**
 * Check if value is a string and not empty
 */
export const filled = (str: string) => {
  return Utils.isString(str) && !empty(str.replace(/\s/g, ''));
};
