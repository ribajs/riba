import { Formatter } from "../../interfaces/formatter";
/**
 * a === b
 */
export const eqFormatter: Formatter = {
  name: "eq",
  read(a: any, b: any) {
    return a === b;
  }
};
