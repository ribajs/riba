import { Utils } from "../../services/utils";

/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const digitsFormatter = {
  name: "digits",
  read(str: string) {
    if (Utils.isNumber(str)) {
      return str;
    }
    const num = str.replace(/[^-\d.]/g, "");
    if (isNaN(Number(num))) {
      return 0;
    } else {
      return Number(num);
    }
  },
};
