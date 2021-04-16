import { Formatter } from "../../types/formatter";
import { isNumber } from "@ribajs/utils/src/type";

/**
 * Checks if value is a number
 */
export const isNumberFormatter: Formatter = {
  name: "isNumber",
  read: isNumber,
};
