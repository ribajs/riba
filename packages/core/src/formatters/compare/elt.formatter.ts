import { Formatter } from "../../interfaces/formatter";
/**
 * euqal or lower than
 * a <= b
 */
export const eltFormatter: Formatter = {
  name: "elt",
  read(a: number, b: number) {
    return a <= b;
  }
};
