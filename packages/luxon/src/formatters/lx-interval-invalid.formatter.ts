import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Create an invalid Interval.
 */
export const LuxonIntervalInvalidFormatter: Formatter = {
  name: "lx-interval-invalid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-invalid
   * @param reason string
   * @param explanation string
   * @returns Interval
   */
  read(reason: string, explanation: string): Interval {
    return Interval.invalid(reason, explanation);
  }
};
