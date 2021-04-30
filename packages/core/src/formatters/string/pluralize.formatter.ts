import { Formatter } from "../../types";

export const pluralizeFormatter: Formatter = {
  name: "pluralize",
  read(input: any, singular: string, plural: string) {
    if (plural === null) {
      plural = singular + "s";
    }
    if (Array.isArray(input)) {
      input = input.length;
    }
    if (input === 1) {
      return singular;
    } else {
      return plural;
    }
  },
};
