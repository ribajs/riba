import { Utils } from '../../utils';

/**
 * True if array / string contains property / substring or containts property with value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const contains = (value: string | any | any[], attr: string, search: string) => {

  if (Utils.isString(value)) {
    return value.indexOf(attr) > -1;
  }

  if (Utils.isArray(value)) {
    for (const index in value) {
      if (Utils.isDefined(value[index]) && Utils.isDefined(value[index][attr])) {
        if (Utils.isUndefined(search)) {
          return true;
        } else {
          if (value[index][attr] === search) {
            return true;
          }
        }
      }
    }
  }

  if (Utils.isObject(value)) {
    for (const key in value) {
      if ((value.hasOwnProperty(key))) {
        if (key === attr) {
          if (Utils.isUndefined(search)) {
            return true;
          } else {
            if (value[key][attr] === search) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
};
