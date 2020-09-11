import { Formatter } from "../../interfaces";

export const padStartFormatter: Formatter = {
  name: "padStart",
  read(target: string, length = 2, padString = "0") {
    return target.padStart(length, padString);
  },
};
