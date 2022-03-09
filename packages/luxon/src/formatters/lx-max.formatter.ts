import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Return the max of several date times
 */
export const LuxonMaxFormatter: Formatter = {
  name: "lx-max",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-max
   * @param target can be a Luxon DateTime object
   * @param ...dateTimes DateTime[]
   * @returns DateTime
   */
  read(target: DateTime, ...dateTimes: DateTime[]): DateTime {
    return DateTime.max(target, ...dateTimes);
  },
};
