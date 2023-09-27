import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns the number of days in this DateTime's month
 */
export const LuxonDaysInMonthFormatter: Formatter = {
  name: "lx-days-in-month",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-daysInMonth
   * @param target can be a Luxon DateTime object
   */
  read(target: DateTime) {
    return target.daysInMonth;
  },
};
