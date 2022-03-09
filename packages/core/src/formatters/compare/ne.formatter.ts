import { Formatter } from "../../types/formatter.js";
/**
 * a !== b
 */
export const neFormatter: Formatter = {
  name: "ne",
  read(a: any, b: any) {
    return a !== b;
  },
};
