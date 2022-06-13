import { isObject, isString, isNumber } from "@ribajs/utils/src/type.js";

/**
 * Get property of object or get item by index of array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const getFormatter = {
  name: "get",
  read(value: any | any[] | string, key: string | number) {
    if (isObject(value) || Array.isArray(value)) {
      return value[key];
    }
    if (isString(value)) {
      if (isNumber(key)) {
        return (value as string).charAt(key as number);
      }
    }
    return null;
  },
};
