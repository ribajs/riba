import { Formatter } from "../../types/formatter";
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
