import { Formatter } from "../../types/formatter";
/**
 * greater than
 * a > b
 */
export const gtFormatter: Formatter = {
  name: "gt",
  read(a: number, b: number) {
    return a > b;
  },
};
