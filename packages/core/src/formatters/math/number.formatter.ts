import { Utils } from "../../services/utils";

/**
 * Parse a string to number / float
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const numberFormatter = {
  name: "number",
  read(str: string, def: number) {
    const num = Utils.getNumber(str);
    // If default value is set return the default value if num is 0, null or undefined
    if (def) {
      return num ? num : def;
    }
    return num;
  },
};
