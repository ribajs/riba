"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// special helper formatters
const args_formatter_1 = require("./args.formatter");
exports.args = args_formatter_1.args;
const boolean_formatter_1 = require("./boolean.formatter");
exports.booleanFormatter = boolean_formatter_1.booleanFormatter;
const debug_formatter_1 = require("./debug.formatter");
exports.debug = debug_formatter_1.debug;
const default_formatter_1 = require("./default.formatter");
exports.defaultBinder = default_formatter_1.defaultBinder;
const call_formatter_1 = require("./call.formatter");
exports.call = call_formatter_1.call;
const currency_formatter_1 = require("./currency.formatter");
exports.currency = currency_formatter_1.currency;
const json_formatter_1 = require("./json.formatter");
exports.json = json_formatter_1.json;
exports.specialFormatters = {
    args: args_formatter_1.args, boolean: boolean_formatter_1.booleanFormatter, debug: debug_formatter_1.debug, default: default_formatter_1.defaultBinder, call: call_formatter_1.call, currency: currency_formatter_1.currency, json: json_formatter_1.json,
};
