import { Formatter } from "../../interfaces";
import { handleize } from "@ribajs/utils/src/type";

/**
 * Formats a string into a handle.
 * E.g. '100% M & Ms!!!' -> 100-m-ms
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleizeFormatter: Formatter = {
  name: "handleize",
  read(str: string) {
    return handleize(str);
  },
};
