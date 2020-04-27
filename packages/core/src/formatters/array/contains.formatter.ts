import { isString, isArray, isObject, isDefined } from "@ribajs/utils/src/type";

/**
 * Returns true if an object, array or string contains an object, property or substring.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const containsFormatter = {
  name: "contains",
  read(value: string | any | any[], attr: string, search: string) {
    if (isString(value)) {
      return value.indexOf(attr) > -1;
    } else if (isArray(value)) {
      if (isDefined(attr)) {
        if (isDefined(search)) {
          return value[attr] === search;
        } else {
          return value.includes(attr);
        }
      }
    } else if (isObject(value)) {
      if (isDefined(attr)) {
        if (isDefined(search)) {
          return value[attr] === search;
        } else {
          return Object.keys(value).includes(attr);
        }
      }
    }
    return false;
  },
};
