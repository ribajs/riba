"use strict";
/**
 * Add useful general-purpose formatters for Rivets.js
 * Some formatters from cart.js and rivetsjs-stdlib
 * @see https://github.com/discolabs/cartjs/
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib
 * @see https://github.com/JumpLinkNetwork/shopify-productjs
 */
Object.defineProperty(exports, "__esModule", { value: true });
// compare functions
const and_formatter_1 = require("./and.formatter");
exports.and = and_formatter_1.and;
const between_formatter_1 = require("./between.formatter");
exports.between = between_formatter_1.between;
const egt_formatter_1 = require("./egt.formatter");
exports.egt = egt_formatter_1.egt;
const eq_formatter_1 = require("./eq.formatter");
exports.eq = eq_formatter_1.eq;
const gt_formatter_1 = require("./gt.formatter");
exports.gt = gt_formatter_1.gt;
const is_defined_formatters_1 = require("./is-defined.formatters");
exports.isDefined = is_defined_formatters_1.isDefined;
const is_object_formatter_1 = require("./is-object.formatter");
exports.isObject = is_object_formatter_1.isObject;
const is_undefined_formatters_1 = require("./is-undefined.formatters");
exports.isUndefined = is_undefined_formatters_1.isUndefined;
const ne_formatter_1 = require("./ne.formatter");
exports.ne = ne_formatter_1.ne;
const lt_formatter_1 = require("./lt.formatter");
exports.lt = lt_formatter_1.lt;
const elt_formatter_1 = require("./elt.formatter");
exports.elt = elt_formatter_1.elt;
const or_formatter_1 = require("./or.formatter");
exports.or = or_formatter_1.or;
const not_formatter_1 = require("./not.formatter");
exports.not = not_formatter_1.not;
exports.compareFormatters = {
    and: and_formatter_1.and, between: between_formatter_1.between, egt: egt_formatter_1.egt, eq: eq_formatter_1.eq, gt: gt_formatter_1.gt, isDefined: is_defined_formatters_1.isDefined, isObject: is_object_formatter_1.isObject, isUndefined: is_undefined_formatters_1.isUndefined, ne: ne_formatter_1.ne, lt: lt_formatter_1.lt, elt: elt_formatter_1.elt, or: or_formatter_1.or, not: not_formatter_1.not,
};
