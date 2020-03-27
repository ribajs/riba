import { Formatter } from "../../interfaces/formatter";
/**
 * a && b
 */
export const andFormatter: Formatter = {
  name: "and",
  read(a: boolean, b: boolean) {
    return a && b;
  }
};
