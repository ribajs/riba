import { Formatter } from "@ribajs/core";
import { Interval, DateInput } from "luxon";

/**
 * Create an Interval from a start DateTime and an end DateTime.
 */
export const LuxonIntervalFromDateTimesFormatter: Formatter = {
  name: "lx-interval-from-date-times",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromDateTimes
   * @param start DateInput
   * @param end DateInput
   * @returns Interval
   */
  read(start: DateInput, end: DateInput): Interval {
    return Interval.fromDateTimes(start, end);
  }
};
