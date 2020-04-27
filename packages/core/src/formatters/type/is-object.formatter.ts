import { Formatter } from "../../interfaces/formatter";
import { isObject } from "@ribajs/utils/src/type";

/**
 * Checks if value is a object
 */
export const isObjectFormatter: Formatter = {
  name: "isObject",
  read: isObject,
};
