import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, ToISOTimeOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this DateTime's time component
 */
export const LuxonToISOTimeFormatter: Formatter = {
  name: "lx-to-iso-time",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISOTime
   * @param target can be a Luxon DateTime object
   * @param opts Object
   * @returns string
   */
  read(target: DateTime, opts?: ToISOTimeOptions): string {
    return target.toISOTime(opts);
  }
};
