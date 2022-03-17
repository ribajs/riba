import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the human readable long month name, such as 'October'.
 */
export const LuxonMonthLongFormatter: Formatter = {
  name: "lx-month-long",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-monthLong
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.monthLong;
  }
};
