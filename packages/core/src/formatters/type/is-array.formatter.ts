import { Formatter } from "../../types/formatter";
import { isArray } from "@ribajs/utils/src/type";

/**
 * Checks if value is an array
 */
export const isArrayFormatter: Formatter = {
  name: "isArray",
  read: isArray,
};
