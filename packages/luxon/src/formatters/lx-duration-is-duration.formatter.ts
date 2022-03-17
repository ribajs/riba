import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Check if an object is a Duration.
 */
export const LuxonDurationIsDurationFormatter: Formatter = {
  name: "lx-interval-is-duration",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-isDuration
   * @param o object
   * @returns boolean
   */
  read(o: any): boolean {
    return Duration.isDuration(o);
  }
};
