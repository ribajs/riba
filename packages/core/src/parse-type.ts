import { parseJsonString, couldBeJson } from "@ribajs/utils";
import { PRIMITIVE, QUOTED_STR, KEYPATH } from "./constants/parser";

/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string
 */
export function parseType(str?: string) {
  let type = PRIMITIVE;
  let value: any = str;
  if (str === undefined) {
    return { type, value: undefined };
  }
  if (QUOTED_STR.test(str)) {
    value = str.slice(1, -1);
    const jsonString = parseJsonString(value);
    value = jsonString ? jsonString : value;
  } else if (str === "true") {
    value = true;
  } else if (str === "false") {
    value = false;
  } else if (str === "null") {
    value = null;
  } else if (str === "undefined") {
    value = undefined;
  } else if (str === "") {
    value = undefined;
  } else if (!isNaN(Number(str))) {
    value = Number(str);
  } else if (couldBeJson(value)) {
    const jsonString = parseJsonString(value);
    value = jsonString ? jsonString : value;
  } else {
    type = KEYPATH;
  }
  return { type, value };
}
