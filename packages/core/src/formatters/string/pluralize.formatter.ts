import { Formatter } from "../../types";
import { isArray } from "@ribajs/utils/src/type";

export const pluralizeFormatter: Formatter = {
  name: "pluralize",
  read(input: any, singular: string, plural: string) {
    if (plural === null) {
      plural = singular + "s";
    }
    if (isArray(input)) {
      input = input.length;
    }
    if (input === 1) {
      return singular;
    } else {
      return plural;
    }
  },
};
