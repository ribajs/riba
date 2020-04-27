import { justDigits, isNumber } from "@ribajs/utils/src/type";

/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const digitsFormatter = {
  name: "digits",
  read(str: string) {
    if (isNumber(str)) {
      return str;
    }
    return justDigits(str);
  },
};
