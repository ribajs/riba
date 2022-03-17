import { Formatter } from "@ribajs/core";
import { Duration, DurationObjectUnits } from "luxon";

/**
 * "Set" the values of specified units.
 */
export const LuxonDurationSetFormatter: Formatter = {
  name: "lx-duration-set",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-set
   * @param target Duration
   * @param values DurationObjectUnits
   * @returns Duration
   */
  read(target: Duration, values: DurationObjectUnits): Duration {
    return target.set(values);
  }
};
