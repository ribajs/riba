import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this Duration.
 */
export const LuxonDurationToISOFormatter: Formatter = {
  name: "lx-duration-to-iso",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toISO
   * @param target Duration
   * @returns string
   */
  read(target: Duration): string {
    return target.toISO();
  }
};
