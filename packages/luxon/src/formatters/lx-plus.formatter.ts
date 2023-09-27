import { Formatter } from "@ribajs/core";
import { DateTime, DurationLike } from "luxon";

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
  read(target: DateTime, duration: DurationLike): DateTime {
    return target.plus(duration);
  },
};
