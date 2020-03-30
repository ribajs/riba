import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Checks if value is a object
 */
export const isObjectFormatter: Formatter = {
  name: "isObject",
  read: Utils.isObject,
};
