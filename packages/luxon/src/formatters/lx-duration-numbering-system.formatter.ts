import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the numbering system of a Duration, such 'beng'.
 */
export const LuxonDurationNumberingSystemFormatter: Formatter = {
  name: "lx-interval-numbering-system",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-numberingSystem
   * @param target Interval
   */
  read(target: Duration) {
    return target.numberingSystem;
  },
};
