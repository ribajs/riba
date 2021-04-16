import { Formatter } from "../../types/formatter";
/**
 * !a
 */
export const notFormatter: Formatter = {
  name: "not",
  read(a: boolean) {
    return !a;
  },
};
