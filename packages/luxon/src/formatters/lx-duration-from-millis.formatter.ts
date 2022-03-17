import { Formatter } from "@ribajs/core";
import { Duration, DurationOptions } from "luxon";

/**
 * Create Duration from a number of milliseconds.
 */
export const LuxonDurationFromMillisFormatter: Formatter = {
  name: "lx-interval-from-millis",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-fromMillis
   * @param count number
   * @param opts DurationOptions | undefined
   * @returns Duration
   */
  read(count: number, opts?: DurationOptions): Duration {
    return Duration.fromMillis(count, opts);
  }
};
