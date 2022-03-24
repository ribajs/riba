import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Formats a date to the ISO8601 standard format string. E.g.  `2013-02-04T22:44:30.652Z`
 * @see https://momentjs.com/docs/#/displaying/as-iso-string/
 */
export const ToISOStringFormatter: Formatter = {
  name: "toISOString",
  /**
   * Formats a date to the ISO8601 standard format string. E.g.  `2013-02-04T22:44:30.652Z`
   * @see https://momentjs.com/docs/#/displaying/as-iso-string/
   * @param target
   * @param keepOffset
   */
  read(target: moment.MomentInput, keepOffset = false) {
    return moment(target).toISOString(keepOffset);
  },
};
