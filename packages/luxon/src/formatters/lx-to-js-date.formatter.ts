import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns a JavaScript Date equivalent to this DateTime.
 */
export const LuxonToJSDateFormatter: Formatter = {
  name: "lx-to-js-date",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toJSDate
   * @param target can be a Luxon DateTime object
   * @returns Date
   */
  read(target: DateTime): Date {
    return target.toJSDate();
  }
};
