import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationToFormatOptions } from "luxon";

/**
 * Returns a string representation of this Duration formatted according to the specified format string.
 */
export const LuxonDurationToFormatFormatter: Formatter = {
  name: "lx-duration-to-format",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toFormat
   * @param target Duration
   * @param fmt string
   * @param opts DurationToFormatOptions | undefined
   * @returns string
   */
  read(target: Duration, fmt: string, opts?: DurationToFormatOptions): string {
    return target.toFormat(fmt, opts);
  }
};
