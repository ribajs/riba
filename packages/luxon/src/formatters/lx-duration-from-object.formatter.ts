import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationObject } from "luxon";

/**
 * Create a Duration from a JavaScript object with keys like 'years' and 'hours. If this object is empty then a zero milliseconds duration is returned.
 */
export const LuxonDurationFromObjectFormatter: Formatter = {
  name: "lx-interval-from-object",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-fromObject
   * @param obj DurationObject
   * @returns Duration
   */
  read(obj: DurationObject): Duration {
    return Duration.fromObject(obj);
  },
};
