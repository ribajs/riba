import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Create an invalid Duration.
 */
export const LuxonDurationInvalidFormatter: Formatter = {
  name: "lx-interval-invalid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-invalid
   * @param reason string
   * @param explanation string
   * @returns Duration
   */
  read(reason: string, explanation: string): Duration {
    return Duration.invalid(reason, explanation);
  }
};
