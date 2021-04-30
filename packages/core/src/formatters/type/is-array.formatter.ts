import { Formatter } from "../../types/formatter";

/**
 * Checks if value is an array
 */
export const isArrayFormatter: Formatter = {
  name: "isArray",
  read: Array.isArray,
};
