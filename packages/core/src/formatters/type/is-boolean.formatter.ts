import { Formatter } from "../../interfaces/formatter";
import { isBoolean } from "@ribajs/utils/src/type";

/**
 * Checks if value is an boolean
 */
export const isBooleanFormatter: Formatter = {
  name: "isBoolean",
  read: isBoolean,
};
