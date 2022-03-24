import { Formatter } from "../../types/formatter.js";
import { isObject } from "@ribajs/utils/src/type.js";

/**
 * Checks if value is a object
 */
export const isObjectFormatter: Formatter = {
  name: "is-object",
  read: isObject,
};
