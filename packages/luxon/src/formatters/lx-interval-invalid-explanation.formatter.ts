import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
 */
export const LuxonIntervalInvalidExplanationFormatter: Formatter = {
  name: "lx-interval-invalid-explanation",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-invalidExplanation
   * @param target Interval
   * @returns string | null
   */
  read(target: Interval): string | null {
    return target.invalidExplanation;
  }
};
