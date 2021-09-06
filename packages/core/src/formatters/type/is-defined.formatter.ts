import { Formatter } from "../../types/formatter";
import { isDefined } from "@ribajs/utils/src/type";

/**
 * Checks if value is defined
 */
export const isDefinedFormatter: Formatter = {
  name: "is-defined",
  read: isDefined,
};
