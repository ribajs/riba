import { Formatter } from "@ribajs/core";
import { DateTime, ToRelativeOptions } from "luxon";

/**
 * Returns a string representation of a this time relative to now, such as "in two days".
 */
export const LuxonToRelativeFormatter: Formatter = {
  name: "lx-to-relative",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toRelative
   * @param target can be a Luxon DateTime object
   * @param options ToRelativeOptions | undefined
   * @returns string | null
   */
  read(target: DateTime, options?: ToRelativeOptions): string | null {
    return target.toRelative(options);
  }
};
