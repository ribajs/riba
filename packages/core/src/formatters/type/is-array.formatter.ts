import { Formatter } from "../../interfaces/formatter";
import { isArray } from "@ribajs/utils/src/type";

/**
 * Checks if value is an array
 */
export const isArrayFormatter: Formatter = {
  name: "isArray",
  read: isArray,
};
