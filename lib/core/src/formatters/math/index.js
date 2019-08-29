"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// math formatters
const random_formatter_1 = require("./random.formatter");
exports.random = random_formatter_1.random;
const plus_formatter_1 = require("./plus.formatter");
exports.plus = plus_formatter_1.plus;
const minus_formatter_1 = require("./minus.formatter");
exports.minus = minus_formatter_1.minus;
const number_formatter_1 = require("./number.formatter");
exports.numberFormatter = number_formatter_1.numberFormatter;
const times_formatter_1 = require("./times.formatter");
exports.timesFormatter = times_formatter_1.timesFormatter;
const dividedBy_formatter_1 = require("./dividedBy.formatter");
exports.dividedBy = dividedBy_formatter_1.dividedBy;
const modulo_formatter_1 = require("./modulo.formatter");
exports.modulo = modulo_formatter_1.modulo;
const gcd_formatter_1 = require("./gcd.formatter");
exports.gcd = gcd_formatter_1.gcd;
const even_formatter_1 = require("./even.formatter");
exports.even = even_formatter_1.even;
const uneven_formatter_1 = require("./uneven.formatter");
exports.uneven = uneven_formatter_1.uneven;
const digits_formatter_1 = require("./digits.formatter");
exports.digits = digits_formatter_1.digits;
exports.mathFormatters = {
    digits: digits_formatter_1.digits, dividedBy: dividedBy_formatter_1.dividedBy, even: even_formatter_1.even, gcd: gcd_formatter_1.gcd, minus: minus_formatter_1.minus, number: number_formatter_1.numberFormatter, modulo: modulo_formatter_1.modulo, plus: plus_formatter_1.plus, random: random_formatter_1.random, times: times_formatter_1.timesFormatter, uneven: uneven_formatter_1.uneven,
};
