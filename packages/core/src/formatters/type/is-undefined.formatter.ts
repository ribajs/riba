import { Formatter } from "../../interfaces/formatter";
import { isUndefined } from "@ribajs/utils/src/type";

/**
 * Check if value is undefined
 */
export const isUndefinedFormatter: Formatter = {
  name: "isUndefined",
  read: isUndefined,
};
