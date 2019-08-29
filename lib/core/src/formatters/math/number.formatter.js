"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Parse a string to number / float
 * @see http://stackoverflow.com/a/1100653/1465919
 */
exports.numberFormatter = {
    name: 'number',
    read(str, def) {
        const num = utils_1.Utils.getNumber(str);
        // If default value is set return the default value if num is 0, null or undefined
        if (def) {
            return num ? num : def;
        }
        return num;
    },
};
