import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
 */
export const LuxonIntervalIsValidFormatter: Formatter = {
  name: "lx-interval-is-valid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isValid
   * @param target Interval
   * @returns boolean
   */
  read(target: Interval): boolean {
    return target.isValid;
  },
};
