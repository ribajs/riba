import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Returns an error code if this Interval is invalid, or null if the Interval is valid
 */
export const LuxonIntervalInvalidReasonFormatter: Formatter = {
  name: "lx-interval-invalid-reason",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-invalidReason
   * @param target Interval
   * @returns string | null
   */
  read(target: Interval): string | null {
    return target.invalidReason;
  },
};
