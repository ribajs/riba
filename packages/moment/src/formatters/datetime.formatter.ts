import { Formatter } from "@ribajs/core";
import moment from "moment";

export const DatetimeFormatter: Formatter = {
  name: "datetime",
  read(target: string | number, format?: string) {
    return moment(target).format(format);
  },
};
