import { Formatter } from "../../types/index.js";
import { emptyFormatter } from "../array/empty.formatter.js";
import { isString } from "@ribajs/utils/src/type.js";

/**
 * Check if value is a string and not empty
 */
export const filledFormatter: Formatter = {
  name: "filled",
  read(str: string) {
    return isString(str) && !emptyFormatter.read(str.replace(/\s/g, ""));
  },
};
