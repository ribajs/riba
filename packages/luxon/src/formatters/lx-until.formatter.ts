import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, Interval } from "luxon";

/**
 * Return an Interval spanning between this DateTime and another DateTime
 */
export const LuxonUntilFormatter: Formatter = {
  name: "lx-until",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-until
   * @param target can be a Luxon DateTime object
   * @param otherDateTime DateTime
   * @returns Interval
   */
  read(target: DateTime, otherDateTime: DateTime): Interval {
    return target.until(otherDateTime);
  },
};
