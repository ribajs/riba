import { Formatter } from "@ribajs/core";
import { Duration, DurationLikeObject, DurationOptions } from "luxon";

/**
 * Create a Duration from a JavaScript object with keys like 'years' and 'hours. If this object is empty then a zero milliseconds duration is returned.
 */
export const LuxonDurationFromObjectFormatter: Formatter = {
  name: "lx-interval-from-object",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-fromObject
   * @param obj DurationLikeObject
   * @param opts DurationOptions | undefined
   * @returns Duration
   */
  read(obj: DurationLikeObject, opts?: DurationOptions): Duration {
    return Duration.fromObject(obj, opts);
  },
};
