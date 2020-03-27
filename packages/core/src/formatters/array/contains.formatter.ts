import { Utils } from "../../services/utils";

/**
 * Returns true if an object, array or string contains an object, property or substring.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const containsFormatter = {
  name: "contains",
  read(value: string | any | any[], attr: string, search: string) {
    if (Utils.isString(value)) {
      return value.indexOf(attr) > -1;
    } else if (Utils.isArray(value)) {
      if (Utils.isDefined(attr)) {
        if (Utils.isDefined(search)) {
          return value[attr] === search;
        } else {
          return value.includes(attr);
        }
      }
    } else if (Utils.isObject(value)) {
      if (Utils.isDefined(attr)) {
        if (Utils.isDefined(search)) {
          return value[attr] === search;
        } else {
          return Object.keys(value).includes(attr);
        }
      }
    }
    return false;
  }
};
