import { Formatter } from "../../types/index.js";
import { emptyFormatter } from "../array/empty.formatter.js";

/**
 * Check if array or string is not empty
 */
export const filledFormatter: Formatter = {
  name: "filled",
  read(str: string) {
    return !emptyFormatter.read(str.replace(/\s/g, ""));
  },
};
