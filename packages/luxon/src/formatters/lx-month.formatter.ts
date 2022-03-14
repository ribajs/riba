import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the month (1-12).
 */
export const LuxonMonthFormatter: Formatter = {
  name: "lx-month",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-month
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.month;
  },
};
