import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Checks if value is defined
 */
export const isDefinedFormatter: Formatter = {
  name: "isDefined",
  read: Utils.isDefined
};
