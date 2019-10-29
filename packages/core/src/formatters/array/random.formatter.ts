import { Utils } from '../../services/utils';

/**
 * Gets back random value of array
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
export const randomFormatter = {
  name: 'random',
  read(array: any[]) {
    if (Utils.isArray(array)) {
      const value = array[Math.floor(Math.random() * array.length)];
      return value;
    }
    return null;
  },
};
