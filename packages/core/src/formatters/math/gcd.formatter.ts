/**
 * Greatest common divisor (GCD) useful to calculate a ratio
 * @see https://stackoverflow.com/a/1186465/1465919
 */
const _gcd = (a: number, b: number): number => {
  return b === 0 ? a : _gcd(b, a % b);
};

export const gcdFormatter = {
  name: "gcd",
  read: _gcd
};
