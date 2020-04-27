import { Formatter } from "../../interfaces/formatter";
import { isDefined } from "@ribajs/utils/src/type";

/**
 * Checks if value is defined
 */
export const isDefinedFormatter: Formatter = {
  name: "isDefined",
  read: isDefined,
};
