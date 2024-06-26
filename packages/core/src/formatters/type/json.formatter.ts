import { jsonStringify } from "@ribajs/utils";

/**
 * Converts a string into a JSON string.
 */
export const jsonFormatter = {
  name: "json",
  read(object: any, space = 2, replaceSingleQuote = true) {
    return jsonStringify(object, space, replaceSingleQuote);
  },
};
