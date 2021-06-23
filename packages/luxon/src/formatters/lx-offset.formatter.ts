import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the UTC offset of this DateTime in minutes
 */
export const LuxonOffsetFormatter: Formatter = {
  name: "lx-offset",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-offset
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.offset;
  },
};
