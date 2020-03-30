import { stripFormatter } from "./strip.formatter";
import { downcaseFormatter } from "./downcase.formatter";

/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleizeFormatter = {
  name: "handleize",
  read(str: string) {
    str = stripFormatter.read(str);
    str = str.replace(/[^\w\s]/gi, ""); // http://stackoverflow.com/a/4374890
    str = downcaseFormatter.read(str);
    return str.replace(/ /g, "-");
  },
};
