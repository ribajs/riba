import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the minute of the hour (0-59).
 */
export const LuxonMinuteFormatter: Formatter = {
  name: "lx-minute",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-minute
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.minute;
  }
};
