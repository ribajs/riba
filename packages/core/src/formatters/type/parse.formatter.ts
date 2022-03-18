import { isObject, parseType } from "@ribajs/utils/src/type.js";

/**
 * parse json, base64 or any other value string to to its real value
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
export const parseFormatter = {
  name: "parse",
  read(str?: any) {
    if (
      isObject(str as any) ||
      Array.isArray(str as any) ||
      typeof str === "boolean" ||
      typeof str === "number"
    ) {
      console.warn(
        "[parseFormatter] You do not need to parse the value because since it already been parsed"
      );
      return str;
    }

    if (typeof str === 'string') {
      return parseType(str, true).value;
    } else {
      return null;
    }
  }
};
