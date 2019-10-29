import { Utils } from '../../services/utils';

/**
 * parse json string to object
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
export const parseFormatter = {
  name: 'parse',
  read(jsonString: string) {
    if (Utils.isString(jsonString)) {
      return Utils.parseJsonString(jsonString);
    } else if (Utils.isObject(jsonString as any) || Utils.isArray(jsonString as any)) {
      console.warn('[parseFormatter] You do not need to parse the value because since it already been parsed');
      return jsonString;
    }
    return null;
  },
};
