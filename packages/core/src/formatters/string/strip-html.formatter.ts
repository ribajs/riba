import { Formatter } from "../../interfaces";
import { stripHtml } from "@ribajs/utils/src/type";

/**
 * Strips all HTML tags from a string.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#strip_html
 */
export const stripHtmlFormatter: Formatter = {
  name: "stripHtml",
  read(html: string) {
    return stripHtml(html);
  },
};
