import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Checks if value is an array
 */
export const isArrayFormatter: Formatter = {
  name: "isArray",
  read: Utils.isArray,
};
