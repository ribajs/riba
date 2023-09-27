import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the output calendar of a DateTime, such 'islamic'.
 */
export const LuxonOutputCalendarFormatter: Formatter = {
  name: "lx-output-calendar",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-outputCalendar
   * @param target can be a Luxon DateTime object
   */
  read(target: DateTime) {
    return target.outputCalendar;
  },
};
