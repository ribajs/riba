import { Formatter } from "../../types/formatter";
import { isObject } from "@ribajs/utils/src/type";

/**
 * Checks if value is a object
 */
export const isObjectFormatter: Formatter = {
  name: "is-object",
  read: isObject,
};
