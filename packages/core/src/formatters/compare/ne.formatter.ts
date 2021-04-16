import { Formatter } from "../../types/formatter";
/**
 * a !== b
 */
export const neFormatter: Formatter = {
  name: "ne",
  read(a: any, b: any) {
    return a !== b;
  },
};
