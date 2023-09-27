import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the locale of a Duration, such 'en-GB'
 */
export const LuxonDurationLocaleFormatter: Formatter = {
  name: "lx-interval-locale",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-locale
   * @param target Interval
   */
  read(target: Duration) {
    return target.locale;
  },
};
