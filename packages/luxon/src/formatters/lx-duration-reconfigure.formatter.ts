import { Formatter } from "@ribajs/core";
import { Duration, DurationOptions } from "luxon";

/**
 * "Set" the locale and/or numberingSystem.
 */
export const LuxonDurationReconfigureFormatter: Formatter = {
  name: "lx-duration-reconfigure",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-reconfigure
   * @param target Duration
   * @param objectPattern DurationOptions
   * @returns Duration
   */
  read(target: Duration, objectPattern: DurationOptions): Duration {
    return target.reconfigure(objectPattern);
  }
};
