import { Formatter } from "../../types/formatter";
/**
 * a || b
 */
export const orFormatter: Formatter = {
  name: "or",
  read(a: boolean, b: boolean) {
    return a || b;
  },
};
