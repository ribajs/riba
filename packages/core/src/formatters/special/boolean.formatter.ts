/**
 * Parse a string to boolean
 */
export const booleanFormatter = {
  name: 'boolean',
  read(value: string | boolean) {
    return value === 'true' || value === true;
  },
};
