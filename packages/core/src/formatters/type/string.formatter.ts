import { isObject, getString } from "@ribajs/utils/src/type";

/**
 * Parses a value to string
 * @param value The value you want to parse to string
 * @param def Default value if value is undefined
 */
export const stringFormatter = {
  name: "string",
  read(value: any, def: string) {
    // If value is an array convert each value in array to string
    if (Array.isArray(value)) {
      for (const i in value as Array<any>) {
        if (value[i]) {
          value[i] = getString(value[i]);
        }
      }
    } else if (isObject(value)) {
      for (const key in value) {
        value[key] = getString(value[key]);
      }
    } else {
      value = getString(value);
    }

    // If default value is set return the default value if num is 0, null or undefined
    if (def) {
      return value ? value : def;
    }

    return value;
  },
};
