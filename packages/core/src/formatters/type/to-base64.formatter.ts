import { toBase64 } from "@ribajs/utils/src/index.js";

/**
 * Decodes a string into a base64 string.
 */
export const toBase64Formatter = {
  name: "toBase64",
  read(object: any) {
    return toBase64(object);
  }
};
