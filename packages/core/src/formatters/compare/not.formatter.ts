import { Formatter } from "../../types/formatter.js";
/**
 * !a
 */
export const notFormatter: Formatter = {
  name: "not",
  read(a: boolean) {
    return !a;
  }
};
