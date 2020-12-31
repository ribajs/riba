import { Formatter } from "../../interfaces";
import { capitalize } from "@ribajs/utils/src/type";

/**
 * Uppercases the first letter of a string
 */
export const capitalizeFormatter: Formatter = {
  name: "capitalize",
  read(str: string) {
    return capitalize(str);
  },
};
