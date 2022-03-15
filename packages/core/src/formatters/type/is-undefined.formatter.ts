import { Formatter } from "../../types/formatter.js";
import { isUndefined } from "@ribajs/utils/src/type.js";

/**
 * Check if value is undefined
 */
export const isUndefinedFormatter: Formatter = {
  name: "is-undefined",
  read: isUndefined
};
