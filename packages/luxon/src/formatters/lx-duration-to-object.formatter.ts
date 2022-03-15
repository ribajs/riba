import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationObject } from "luxon";

/**
 * Returns a JavaScript object with this Duration's values.
 */
export const LuxonDurationToObjectFormatter: Formatter = {
  name: "lx-duration-to-object",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toObject
   * @param target Duration
   * @param opts any
   * @returns Object
   */
  read(target: Duration, includeConfig?: boolean): DurationObject {
    return target.toObject(includeConfig ? { includeConfig } : undefined);
  }
};
