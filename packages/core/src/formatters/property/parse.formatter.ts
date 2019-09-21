import { Utils } from '../../services/utils';

/**
 * parse json string to object
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
export const parse = {
  name: 'parse',
  read(jsonString: string) {
    if (Utils.isString(jsonString)) {
      const object = JSON.parse(jsonString);
      return object;
    }
    return null;
  },
};
