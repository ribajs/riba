import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
 */
export const LuxonInvalidExplanationFormatter: Formatter = {
  name: "lx-invalid-explanation",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-invalidExplanation
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string | null {
    return target.invalidExplanation;
  },
};
