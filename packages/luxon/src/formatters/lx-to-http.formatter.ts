import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns a string representation of this DateTime appropriate for use in HTTP headers.
 */
export const LuxonToHTTPFormatter: Formatter = {
  name: "lx-to-http",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toHTTP
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.toHTTP();
  }
};
