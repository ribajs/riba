import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns the JS Date object representing the given unix timestamp.
 */
export const ToDateFormatter: Formatter = {
  name: "toDate",
  /**
   * Returns the JS Date object representing the given unix timestamp.
   * @param target
   */
  read(target: number) {
    return moment.unix(target).toDate();
  },
};
