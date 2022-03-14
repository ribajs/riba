import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationOptions } from "luxon";

/**
 * Create a Duration from an ISO 8601 duration string.
 */
export const LuxonDurationFromISOFormatter: Formatter = {
  name: "lx-interval-from-iso",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-fromISO
   * @param text string
   * @param opts DurationOptions | undefined
   * @returns Duration
   */
  read(text: string, opts?: DurationOptions): Duration {
    return Duration.fromISO(text, opts);
  },
};
