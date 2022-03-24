import { isObject } from "@ribajs/utils/src/type.js";

/**
 * Sets property of object, array or value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const setFormatter = {
  name: "set",
  read(obj: any | any[], key: string | number, value?: any) {
    // the key is the value if value is not set
    if (!value) {
      value = key;
    }

    if (isObject(obj) || Array.isArray(obj)) {
      obj[key] = value;
    } else {
      obj = value;
    }
    return obj;
  },
};
