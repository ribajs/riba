import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns the epoch milliseconds of this DateTime.
 */
export const LuxonToMillisFormatter: Formatter = {
  name: "lx-to-millis",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toMillis
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.toMillis();
  }
};
