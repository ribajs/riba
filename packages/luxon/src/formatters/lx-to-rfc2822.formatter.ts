import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
 */
export const LuxonToRFC2822Formatter: Formatter = {
  name: "lx-to-rfc2822",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toRFC2822
   * @param target can be a Luxon DateTime object
   * @returns string | null
   */
  read(target: DateTime) {
    return target.toRFC2822();
  },
};
