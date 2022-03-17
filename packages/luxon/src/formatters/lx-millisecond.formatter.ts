import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the millisecond of the second (0-999).
 */
export const LuxonMillisecondFormatter: Formatter = {
  name: "lx-millisecond",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-millisecond
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.millisecond;
  }
};
