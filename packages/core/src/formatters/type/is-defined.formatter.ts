import { Formatter } from "../../types/formatter.js";
import { isDefined } from "@ribajs/utils/src/type.js";

/**
 * Checks if value is defined
 */
export const isDefinedFormatter: Formatter = {
  name: "is-defined",
  read: isDefined,
};
