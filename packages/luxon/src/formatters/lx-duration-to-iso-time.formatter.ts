import { Formatter } from "@ribajs/core";
import { Duration, ToISOTimeDurationOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
 */
export const LuxonDurationToISOTimeFormatter: Formatter = {
  name: "lx-duration-to-iso-time",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toISOTime
   * @param target Duration
   * @param opts ToISOTimeDurationOptions | undefined
   * @returns string
   */
  read(target: Duration, opts?: ToISOTimeDurationOptions): string {
    return target.toISOTime(opts);
  }
};
