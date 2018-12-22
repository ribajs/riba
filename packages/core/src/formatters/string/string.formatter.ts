import { Utils } from '../../services/utils';

/**
 * Parse a value to string
 * @param value The value you want to parse to string
 * @param def Default value if value is undefined
 */
export const stringFormatter = (value: any, def: string) => {

  // If value is an array convert each value in array to string
  if (Utils.isArray(value)) {
    for (const i in value as Array<any>) {
      if (value[i]) {
        value[i] = Utils.getString(value[i]);
      }
    }
  } else if (Utils.isObject(value)) {
    for (const key in value) {
      if ((value.hasOwnProperty(key))) {
        value[key] = Utils.getString(value[key]);
      }
    }
  } else {
    value = Utils.getString(value);
  }

  // If default value is set return the default value if num is 0, null or undefined
  if (def) {
    return value ? value : def;
  }

  return value;
};
