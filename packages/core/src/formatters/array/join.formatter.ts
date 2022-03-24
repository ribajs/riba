/**
 * Joins value with a given delimeter
 */
export const joinFormatter = {
  name: "join",
  read(value: any[], delimeter: string | undefined) {
    return value.join(delimeter);
  },
};
