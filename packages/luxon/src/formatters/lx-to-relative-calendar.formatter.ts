import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, ToRelativeCalendarOptions } from "luxon";

/**
 * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
 */
export const LuxonToRelativeCalendarFormatter: Formatter = {
  name: "lx-to-relative-calendar",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toRelativeCalendar
   * @param target can be a Luxon DateTime object
   * @param options ToRelativeCalendarOptions | undefined
   * @returns string | null
   */
  read(target: DateTime, options?: ToRelativeCalendarOptions): string | null {
    return target.toRelativeCalendar(options);
  },
};
