import { Formatter } from "@ribajs/core";
import moment from "moment";

export const TimeFormatter: Formatter = {
  name: "time",
  read(target: string | number, format?: string) {
    return moment(target).format(format);
  },
};
