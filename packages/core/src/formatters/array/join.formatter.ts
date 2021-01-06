/**
 * Returns true if an object, array or string contains an object, property or substring.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const joinFormatter = {
  name: "join",
  read(value: any[], delimeter: string | undefined) {
    return value.join(delimeter);
  },
};
