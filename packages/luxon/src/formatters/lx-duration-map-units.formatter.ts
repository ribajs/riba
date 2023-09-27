import { Formatter } from "@ribajs/core";
import { Duration, DurationUnit } from "luxon";

/**
 * Scale this Duration by the specified amount.
 */
export const LuxonDurationMapUnitsFormatter: Formatter = {
  name: "lx-duration-map-units",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-mapUnits
   * @param target Duration
   * @param fn (x: number, u?: DurationUnit) => number
   * @returns Duration
   */
  read(
    target: Duration,
    fn: (x: number, u?: DurationUnit) => number,
  ): Duration {
    return target.mapUnits(fn);
  },
};
