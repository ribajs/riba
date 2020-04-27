import { Formatter } from "../../interfaces/formatter";
import { isNumber } from "@ribajs/utils/src/type";

/**
 * Checks if value is a number
 */
export const isNumberFormatter: Formatter = {
  name: "isNumber",
  read: isNumber,
};
