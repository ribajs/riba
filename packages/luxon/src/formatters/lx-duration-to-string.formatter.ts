import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
 */
export const LuxonDurationToStringFormatter: Formatter = {
  name: "lx-duration-to-string",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toString
   * @param target Duration
   * @returns string
   */
  read(target: Duration): string {
    return target.toString();
  },
};
