import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
 */
export const LuxonDurationInvalidExplanationFormatter: Formatter = {
  name: "lx-interval-invalid-explanation",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-invalidExplanation
   * @param target Interval
   * @returns string | null
   */
  read(target: Duration): string | null {
    return target.invalidExplanation;
  }
};
