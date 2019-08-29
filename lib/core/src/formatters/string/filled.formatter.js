"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
const empty_formatter_1 = require("../property/empty.formatter");
/**
 * Check if value is a string and not empty
 */
exports.filled = {
    name: 'filled',
    read(str) {
        return utils_1.Utils.isString(str) && !empty_formatter_1.empty.read(str.replace(/\s/g, ''));
    },
};
