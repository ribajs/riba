import { Utils } from '../../utils';

/**
 * True if array / string contains property / substring or containts property with value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const contains = (value: string | any | any[], attr: string, search: string) => {
  console.warn('contains', value, attr, search);

  if (!Utils.isArray(value) || !Utils.isObject(value) || !Utils.isString(value)) {
    return false;
  }

  if (Utils.isString(value)) {
    if (Utils.isUndefined(search)) {
      search = attr;
    }
    return (value.indexOf(search) !== -1);
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
      if ((value.hasOwnProperty(key).hasOwnProperty(attr))) {
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

  return false;
};
