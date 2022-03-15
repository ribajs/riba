import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, ToISODateOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this DateTime's date component
 */
export const LuxonToISODateFormatter: Formatter = {
  name: "lx-to-iso-date",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISODate
   * @param target can be a Luxon DateTime object
   * @param opts Object
   * @returns string
   */
  read(target: DateTime, opts?: ToISODateOptions): string {
    return target.toISODate(opts);
  }
};
