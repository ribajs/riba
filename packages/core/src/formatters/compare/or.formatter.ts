import { Formatter } from "../../interfaces/formatter";
/**
 * a || b
 */
export const orFormatter: Formatter = {
  name: "or",
  read(a: boolean, b: boolean) {
    return a || b;
  },
};
