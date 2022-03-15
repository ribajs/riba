import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, ToRelativeCalendarOptions } from "luxon";

/**
 * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
 */
export const LuxonToMomentCalendarFormatter: Formatter = {
  name: "lx-to-moment-calendar",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toRelativeCalendar
   * @param target can be a Luxon DateTime object
   * @param options ToRelativeCalendarOptions | undefined
   * @returns string | null
   */
  read(target: DateTime, options?: ToRelativeCalendarOptions): string | null {
    options = options || {};
    options.unit = options.unit || "days";
    options.base = options.base || DateTime.now();
    const b = options.base.startOf("day");
    const t = target.startOf("day");
    // Every field of t.diff.b except milliseconds is 0, even after calling .normalize() - bug in Luxon?
    const daysDiff = t.diff(b).milliseconds / (3600 * 24 * 1000);

    if (Math.abs(daysDiff) >= 7) {
      return target.toLocaleString({
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } else {
      const hourMinute = target.toLocaleString({
        hour: "2-digit",
        minute: "2-digit"
      });
      if (Math.abs(daysDiff) <= 2) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return target.toRelativeCalendar(options)! + " " + hourMinute;
      }
      return (
        // (daysDiff > 0 ? "Nächsten " : "Vergangenen ") +
        target.toLocaleString({ weekday: "long" }) + ", " + hourMinute
      );
    }
  }
};
