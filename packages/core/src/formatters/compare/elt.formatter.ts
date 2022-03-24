import { Formatter } from "../../types/formatter.js";
/**
 * euqal or lower than
 * a <= b
 */
export const eltFormatter: Formatter = {
  name: "elt",
  read(a: number, b: number) {
    return a <= b;
  },
};
