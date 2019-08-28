import { Utils } from '../../services/utils';
import { empty } from '../property/empty.formatter';

/**
 * Check if value is a string and not empty
 */
export const filled = {
  name: 'filled',
  read(str: string) {
    return Utils.isString(str) && !empty.read(str.replace(/\s/g, ''));
  },
};
