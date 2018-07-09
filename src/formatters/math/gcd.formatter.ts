/**
 * greatest common divisor (GCD) useful to calculate the ratio
 * @see https://stackoverflow.com/a/1186465/1465919
 */
export const gcd = (a: number, b: number): number => {
  return (b === 0) ? a : gcd(b, a % b);
};
