import { Formatter } from "../../interfaces";

export const matchFormatter: Formatter = {
  name: "match",
  read(a: string, regexp: string, flags?: string) {
    if (!a || !regexp) {
      return false;
    }
    return a.match(new RegExp(regexp, flags));
  },
};
