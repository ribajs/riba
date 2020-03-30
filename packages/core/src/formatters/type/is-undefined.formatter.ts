import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Check if value is undefined
 */
export const isUndefinedFormatter: Formatter = {
  name: "isUndefined",
  read: Utils.isUndefined,
};
