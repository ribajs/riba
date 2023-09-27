import { Formatter } from "@ribajs/core";
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
   */
  read(target: DateTime, opts?: ToISOTimeOptions) {
    return target.toISO(opts);
  },
};
