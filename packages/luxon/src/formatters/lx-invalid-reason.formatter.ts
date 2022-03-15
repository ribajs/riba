import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
 */
export const LuxonInvalidReasonFormatter: Formatter = {
  name: "lx-invalid-reason",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-invalidReason
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string | null {
    return target.invalidReason;
  }
};
