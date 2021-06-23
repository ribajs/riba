import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns the epoch milliseconds of this DateTime.
 */
export const LuxonValueOfFormatter: Formatter = {
  name: "lx-value-of",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-valueOf
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.valueOf();
  },
};
