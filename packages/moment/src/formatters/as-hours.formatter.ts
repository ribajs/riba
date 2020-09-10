import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

export const AsHoursFormatter: Formatter = {
  name: "asHours",
  read(duration: Duration) {
    return duration.asHours();
  },
};
