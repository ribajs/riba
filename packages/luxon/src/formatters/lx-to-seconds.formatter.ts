import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns the epoch seconds of this DateTime.
 */
export const LuxonToSecondsFormatter: Formatter = {
  name: "lx-to-seconds",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toSeconds
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.toSeconds();
  }
};
