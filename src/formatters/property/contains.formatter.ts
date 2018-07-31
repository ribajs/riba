import { Utils } from '../../utils';

/**
 * True if array / string contains property / substring or containts property with value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const contains = (value: string | any | any[], attr: string, search: string) => {
  // console.log("contains", value, attr, search);

  if (!Utils.isArray(value) || !Utils.isObject(value) || !Utils.isString(value)) {
    return false;
  }

  if (Utils.isUndefined(search)) {
    search = attr;
  }

  if (Utils.isString(value)) {
    return (value.indexOf(search) !== -1);
  }

  if (Utils.isArray(value)) {
    for (const key in value) {
      if ((value.hasOwnProperty(key).hasOwnProperty(attr)) || (Utils.isDefined(value[key]) && Utils.isDefined(value[key][attr]))) {
        if (value[key][attr] === search) {
          return true;
        }
      }
    }
  }

  return false;
};
