import { Formatter } from "../../interfaces/formatter";
/**
 * lower than
 * a < b
 */
export const ltFormatter: Formatter = {
  name: "lt",
  read(a: number, b: number) {
    return a < b;
  },
};
