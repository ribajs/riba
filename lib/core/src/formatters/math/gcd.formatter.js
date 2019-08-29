"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * greatest common divisor (GCD) useful to calculate the ratio
 * @see https://stackoverflow.com/a/1186465/1465919
 */
const _gcd = (a, b) => {
    return (b === 0) ? a : _gcd(b, a % b);
};
exports.gcd = {
    name: 'gcd',
    read: _gcd,
};
