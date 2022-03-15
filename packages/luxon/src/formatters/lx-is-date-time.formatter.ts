import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Check if an object is a DateTime.
 */
export const LuxonIsDateTimeFormatter: Formatter = {
  name: "lx-is-date-time",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-isDateTime
   * @param o any
   * @returns boolean
   */
  read(o: any): boolean {
    return DateTime.isDateTime(o);
  }
};
