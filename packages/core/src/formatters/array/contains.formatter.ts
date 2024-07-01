import {
  isString,
  isObject,
  isDefined,
  isNumber,
} from "@ribajs/utils/src/type.js";

/**
 * Returns true if an object, array or string contains an index, object, property or substring.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const containsFormatter = {
  name: "contains",
  read(value: string | any | any[], attr: string | number, search?: string) {
    if (isString(value)) {
      if (value.indexOf(attr.toString()) > -1) {
        return value;
      }
      return false;
    } else if (Array.isArray(value)) {
      if (isDefined(attr)) {
        if (isDefined(search)) {
          if (!isNumber(attr)) {
            console.warn(
              "[containsFormatter] The second parameter must be of type number if a search is defined but is " +
                typeof attr,
            );
          }
          attr = Number(attr);
          if (value[attr] === search) {
            return value;
          }
          return false;
        } else {
          if (value.includes(attr)) {
            return value;
          }
          return false;
        }
      }
    } else if (isObject(value)) {
      if (isDefined(attr)) {
        if (isDefined(search)) {
          if (value[attr] === search) {
            return value;
          }
          return false;
        } else {
          if (!isString(attr)) {
            console.warn(
              "[containsFormatter] The second parameter must be of type string for objects" +
                typeof attr,
            );
          }
          if (Object.keys(value).includes(String(attr))) {
            return value;
          }
          return false;
        }
      }
    }
    return false;
  },
};
