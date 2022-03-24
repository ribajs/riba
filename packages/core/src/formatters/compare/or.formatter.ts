import { Formatter } from "../../types/formatter.js";
/**
 * a || b
 */
export const orFormatter: Formatter = {
  name: "or",
  read(a: boolean, b: boolean) {
    return a || b;
  },
};
