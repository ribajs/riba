import { isString, parseJsonString, isObject } from "@ribajs/utils/src/type.js";

/**
 * parse json string to object
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
export const parseFormatter = {
  name: "parse",
  read(jsonString: string) {
    if (isString(jsonString)) {
      return parseJsonString(jsonString);
    } else if (
      isObject(jsonString as any) ||
      Array.isArray(jsonString as any)
    ) {
      console.warn(
        "[parseFormatter] You do not need to parse the value because since it already been parsed"
      );
      return jsonString;
    }
    return null;
  },
};
