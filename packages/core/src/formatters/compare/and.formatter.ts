import { Formatter } from "../../types/formatter";
/**
 * a && b
 */
export const andFormatter: Formatter = {
  name: "and",
  read(a: boolean, b: boolean) {
    return a && b;
  },
};
