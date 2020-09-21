import { Formatter } from "../../interfaces";
import { emptyFormatter } from "../array/empty.formatter";
import { isString } from "@ribajs/utils/src/type";

/**
 * Check if value is a string and not empty
 */
export const filledFormatter: Formatter = {
  name: "filled",
  read(str: string) {
    return isString(str) && !emptyFormatter.read(str.replace(/\s/g, ""));
  },
};
