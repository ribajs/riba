import { Formatter, FormatterFn } from "../../interfaces";
import { stripFormatter } from "./strip.formatter";
import { downcaseFormatter } from "./downcase.formatter";

const strip = stripFormatter.read as FormatterFn;
const downcase = downcaseFormatter.read as FormatterFn;

/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleizeFormatter: Formatter = {
  name: "handleize",
  read(str: string) {
    str = strip(str);
    str = str.replace(/[^\w\s]/gi, ""); // http://stackoverflow.com/a/4374890
    str = downcase(str);
    return str.replace(/ /g, "-");
  },
};
