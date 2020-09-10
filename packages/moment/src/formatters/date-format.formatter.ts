import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * The date formatter returns a formatted date string according to the moment.js
 * formatting syntax.
 *
 * ```html
 * <span rv-value="model.date | date 'dddd, MMMM Do'"></span>
 * ```
 *
 * @see {@link http://momentjs.com/docs/#/displaying} for format options.
 */
export const DateFormatFormatter: Formatter = {
  name: "dateFormat",
  read(target: string, val: string) {
    return moment(target).format(val);
  },
};
