import { Formatter } from "../../types/index.js";
import { capitalize } from "@ribajs/utils/src/type.js";

/**
 * Uppercases the first letter of a string
 */
export const capitalizeFormatter: Formatter = {
  name: "capitalize",
  read(str: string) {
    return capitalize(str);
  },
};
