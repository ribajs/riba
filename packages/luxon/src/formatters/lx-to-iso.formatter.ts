import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, ToISOTimeOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this DateTime
 */
export const LuxonToISOFormatter: Formatter = {
  name: "lx-to-iso",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISO
   * @param target can be a Luxon DateTime object
   * @param opts Object
   * @returns string
   */
  read(target: DateTime, opts?: ToISOTimeOptions): string {
    return target.toISO(opts);
  }
};
