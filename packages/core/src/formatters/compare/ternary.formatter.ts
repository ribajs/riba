import { Formatter } from "../../types/formatter";
/**
 * a ? b : c
 */
export const ternaryFormatter: Formatter = {
  name: "ternary",
  read(condition: any, yes, no) {
    console.log({
      condition,
      yes,
      no,
    });
    return condition ? yes : no;
  },
};