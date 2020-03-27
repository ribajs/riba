/**
 * Converts a variable to boolean
 */
export const booleanFormatter = {
  name: "boolean",
  read(value: string | boolean) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      return !!value;
    }
  }
};
