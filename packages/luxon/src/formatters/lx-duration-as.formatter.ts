import { Formatter } from "@ribajs/core";
import { Duration, DurationObjectUnits } from "luxon";

/**
 * Return the length of the duration in the specified unit.
 */
export const LuxonDurationAsFormatter: Formatter = {
  name: "lx-duration-as",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-as
   * @param target Duration
   * @param unit string
   * @returns number
   */
  read(target: Duration, unit: keyof DurationObjectUnits): number {
    return target.as(unit);
  }
};
