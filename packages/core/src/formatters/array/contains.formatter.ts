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
  read(value: string | any | any[], attr: string | number, search: string) {
    if (isString(value)) {
      return value.indexOf(attr) > -1;
    } else if (Array.isArray(value)) {
      if (!isNumber(attr)) {
        console.warn(
          "[containsFormatter] The second parameter must be of type number for arrays but is " +
            typeof attr
        );
      }
      attr = Number(attr);
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
          if (!isString(attr)) {
            console.warn(
              "[containsFormatter] The second parameter must be of type string for objects" +
                typeof attr
            );
          }

          return Object.keys(value).includes(String(attr));
        }
      }
    }
    return false;
  },
};
