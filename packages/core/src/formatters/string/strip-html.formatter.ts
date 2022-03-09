import { Formatter } from "../../types/index.js";
import { stripHtml } from "@ribajs/utils/src/type.js";

/**
 * Strips all HTML tags from a string.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#strip_html
 */
export const stripHtmlFormatter: Formatter = {
  name: "strip-html",
  read(html: string) {
    return stripHtml(html);
  },
};
