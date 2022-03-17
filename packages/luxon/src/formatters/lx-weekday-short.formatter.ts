import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the human readable short weekday, such as 'Mon'.
 */
export const LuxonWeekdayShortFormatter: Formatter = {
  name: "lx-weekday-short",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekdayShort
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.weekdayShort;
  }
};
