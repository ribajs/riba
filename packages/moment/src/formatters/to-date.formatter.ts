import { Formatter } from "@ribajs/core/src/index.js";
import { Moment } from "moment";
import moment from "moment";

/**
 * Returns the JS Date object representing the given unix timestamp or Moment object
 */
export const ToDateFormatter: Formatter = {
  name: "toDate",
  /**
   * Returns the JS Date object representing the given unix timestamp or Moment object
   * @param target
   */
  read(target: number | Moment) {
    if (typeof target === "number") {
      return moment.unix(target).toDate();
    } else {
      return target.toDate();
    }
  },
};
