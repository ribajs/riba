import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the day of the month (1-30ish).
 */
export const LuxonDayFormatter: Formatter = {
  name: "lx-day",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-day
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.day;
  }
};
