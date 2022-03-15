import { Formatter } from "@ribajs/core/src/index.js";
import moment, { Moment, MomentInput } from "moment";

/**
 * Calendar time displays time relative to a given referenceDay (defaults to the start of today), but does so slightly differently than moment#fromNow.
 * @see https://momentjs.com/docs/#/displaying/calendar-time/
 */
export const CalendarFormatter: Formatter = {
  name: "calendar",
  read(target: Moment | MomentInput, referenceDay?: moment.MomentInput) {
    return moment(target).calendar(referenceDay);
  }
};
