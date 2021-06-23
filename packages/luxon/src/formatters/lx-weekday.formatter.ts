import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the day of the week.
 */
export const LuxonWeekdayFormatter: Formatter = {
  name: "lx-weekday",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekday
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.weekday;
  },
};
