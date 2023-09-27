import { Formatter } from "@ribajs/core";
import { Duration, DurationObjectUnits } from "luxon";

/**
 * Returns a JavaScript object with this Duration's values.
 */
export const LuxonDurationToObjectFormatter: Formatter = {
  name: "lx-duration-to-object",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toObject
   * @param target Duration
   * @returns Object
   */
  read(target: Duration): DurationObjectUnits {
    return target.toObject();
  },
};
