import { Formatter } from "../../types/formatter.js";
import { isNumber } from "@ribajs/utils/src/type.js";

/**
 * Checks if value is a number
 */
export const isNumberFormatter: Formatter = {
  name: "is-number",
  read: isNumber
};
