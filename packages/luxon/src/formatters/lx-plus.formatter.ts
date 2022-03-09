import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DurationInput } from "luxon";

/**
 * Add a period of time to this DateTime and return the resulting DateTime
 */
export const LuxonPlusFormatter: Formatter = {
  name: "lx-plus",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-plus
   * @param target can be a Luxon DateTime object
   * @param duration Duration | Object | number
   * @returns DateTime
   */
  read(target: DateTime, duration: DurationInput): DateTime {
    return target.plus(duration);
  },
};
