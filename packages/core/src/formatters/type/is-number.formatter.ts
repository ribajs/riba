import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Checks if value is a number
 */
export const isNumberFormatter: Formatter = {
  name: "isNumber",
  read: Utils.isNumber,
};
