import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Return the min of several date times
 */
export const LuxonMinFormatter: Formatter = {
  name: "lx-min",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-min
   * @param target can be a Luxon DateTime object
   * @param ...dateTimes DateTime[]
   * @returns DateTime
   */
  read(target: DateTime, ...dateTimes: DateTime[]): DateTime {
    return DateTime.min(target, ...dateTimes);
  },
};
