import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DurationInput } from "luxon";

/**
 * Subtract a period of time to this DateTime and return the resulting DateTime See plus
 */
export const LuxonMinusFormatter: Formatter = {
  name: "lx-minus",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-minus
   * @param target can be a Luxon DateTime object
   * @param duration Duration | Object | number
   * @returns DateTime
   */
  read(target: DateTime, duration: DurationInput): DateTime {
    return target.minus(duration);
  },
};
