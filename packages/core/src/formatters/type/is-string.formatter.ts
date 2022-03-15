import { isString } from "@ribajs/utils/src/type.js";

/**
 * Check if value is a string
 */
export const isStringFormatter = {
  name: "is-string",
  read(str: string) {
    return isString(str);
  }
};
