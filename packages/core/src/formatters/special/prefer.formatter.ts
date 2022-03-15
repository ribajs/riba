/**
 * Prefers the first formatter parameter before left parameter
 */
export const preferFormatter = {
  name: "prefer",
  read(value: any, preferValue: any) {
    return preferValue || value;
  }
};
