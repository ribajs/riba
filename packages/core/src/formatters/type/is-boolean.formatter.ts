import { Formatter } from "../../interfaces/formatter";
import { Utils } from "../../services/utils";

/**
 * Checks if value is an boolean
 */
export const isBooleanFormatter: Formatter = {
  name: "isBoolean",
  read: Utils.isBoolean
};
