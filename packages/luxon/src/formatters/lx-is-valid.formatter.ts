import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns whether the DateTime is valid.
 */
export const LuxonIsValidFormatter: Formatter = {
  name: "lx-is-valid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isValid
   * @param target can be a Luxon DateTime object
   * @returns boolean
   */
  read(target: DateTime): boolean {
    return target.isValid;
  },
};
