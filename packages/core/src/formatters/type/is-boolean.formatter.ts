import { Formatter } from "../../types/formatter.js";
import { isBoolean } from "@ribajs/utils/src/type.js";

/**
 * Checks if value is an boolean
 */
export const isBooleanFormatter: Formatter = {
  name: "is-boolean",
  read: isBoolean
};
