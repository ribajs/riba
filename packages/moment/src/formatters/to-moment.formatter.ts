import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns the moment.js object representing of the given JS Date. (use this method afterwards with the formatter `map`)
 */
export const ToMomentFormatter: Formatter = {
  name: "toMoment",
  read(date: moment.MomentInput) {
    return moment(date);
  }
};
