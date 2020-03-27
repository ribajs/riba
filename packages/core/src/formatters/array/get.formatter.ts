import { Utils } from "../../services/utils";

/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const getFormatter = {
  name: "get",
  read(value: any | any[] | string, key: string | number) {
    if (Utils.isObject(value) || Utils.isArray(value)) {
      return value[key];
    }
    if (Utils.isString(value)) {
      if (Utils.isNumber(key)) {
        return (value as string).charAt(key as number);
      }
    }
    return null;
  }
};
