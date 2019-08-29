"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Check if value is a string
 */
exports.isString = {
    name: 'isString',
    read(str) {
        return utils_1.Utils.isString(str);
    },
};
