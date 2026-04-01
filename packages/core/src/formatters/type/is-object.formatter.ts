import { Formatter } from "../../types/formatter.js";
import { isObject } from "@ribajs/utils/src/type.js";

/**
 * Checks if value is a plain object (not an array, not null).
 */
export const isObjectFormatter: Formatter = {
  name: "is-object",
  read(value: any) {
    return isObject(value) && !Array.isArray(value);
  },
};
