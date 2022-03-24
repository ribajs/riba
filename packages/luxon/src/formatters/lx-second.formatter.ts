import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the second of the minute (0-59).
 */
export const LuxonSecondFormatter: Formatter = {
  name: "lx-second",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-second
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.second;
  },
};
