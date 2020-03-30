import { Utils } from "../../services/utils";

/**
 * Check if value is a string
 */
export const isStringFormatter = {
  name: "isString",
  read(str: string) {
    return Utils.isString(str);
  },
};
