import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the human readable long weekday, such as 'Monday'.
 */
export const LuxonWeekdayLongFormatter: Formatter = {
  name: "lx-weekday-long",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekdayLong
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.weekdayLong;
  }
};
