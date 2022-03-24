import { isString, isDefined } from "@ribajs/utils/src/type.js";

/**
 * Sets a default value if the first value is not set
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const defaultFormatter = {
  name: "default",
  read(value: any, defaultValue: any) {
    if (isDefined(value)) {
      if (isString(value)) {
        if (value.length > 0) {
          return value;
        } else {
          return defaultValue;
        }
      }
      if (value === null) {
        return defaultValue;
      }
      return value;
    }
    return defaultValue;
  },
};
