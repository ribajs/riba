import { Formatter } from "@ribajs/core";
import moment from "moment";

export const DateFormatter: Formatter = {
  name: "date",
  read(target: string | number, format?: string) {
    return moment(target).format(format);
  },
};
