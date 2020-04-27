import { isObject, isArray, isString, isNumber } from "@ribajs/utils/src/type";

/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const getFormatter = {
  name: "get",
  read(value: any | any[] | string, key: string | number) {
    if (isObject(value) || isArray(value)) {
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
