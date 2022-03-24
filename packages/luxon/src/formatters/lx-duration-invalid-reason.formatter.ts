import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Returns an error code if this Duration became invalid, or null if the Duration is valid
 */
export const LuxonDurationInvalidReasonFormatter: Formatter = {
  name: "lx-interval-invalid-reason",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-invalidReason
   * @param target Interval
   * @returns string | null
   */
  read(target: Duration): string | null {
    return target.invalidReason;
  },
};
