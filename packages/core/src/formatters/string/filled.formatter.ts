import { Utils } from "../../services/utils";
import { emptyFormatter } from "../array/empty.formatter";

/**
 * Check if value is a string and not empty
 */
export const filledFormatter = {
  name: "filled",
  read(str: string) {
    return Utils.isString(str) && !emptyFormatter.read(str.replace(/\s/g, ""));
  }
};
