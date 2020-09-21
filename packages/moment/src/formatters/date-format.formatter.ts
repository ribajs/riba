import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns a string formatted with moment.format. The first parameter specifies the format pattern
 *
 * ```html
 * <span rv-value="anyDateVar | date 'dddd, MMMM Do'"></span>
 * ```
 *
 * @see {@link http://momentjs.com/docs/#/displaying} for format options.
 */
export const DateFormatFormatter: Formatter = {
  name: "dateFormat",
  /**
   * Returns a string formatted with momentjs.format. The first parameter specifies the format pattern
   * @param target
   * @param formatStr see https://momentjs.com/docs/#/displaying/format/ for format strings
   */
  read(target: moment.MomentInput, formatStr: string) {
    return moment(target).format(formatStr);
  },
};
