import { Formatter } from "../../types/formatter.js";
/**
 * equal or greater than
 * a >= b
 */
export const egtFormatter: Formatter = {
  name: "egt",
  read(a: number, b: number) {
    return a >= b;
  },
};
