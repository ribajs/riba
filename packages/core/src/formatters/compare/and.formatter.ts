import { Formatter } from "../../types/formatter.js";
/**
 * a && b
 */
export const andFormatter: Formatter = {
  name: "and",
  read(a: boolean, b: boolean) {
    return a && b;
  }
};
