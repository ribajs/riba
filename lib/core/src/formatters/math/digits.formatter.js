"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */
exports.digits = {
    name: 'digits',
    read(str) {
        if (utils_1.Utils.isNumber(str)) {
            return str;
        }
        const num = str.replace(/[^-\d\.]/g, '');
        if (isNaN(Number(num))) {
            return 0;
        }
        else {
            return Number(num);
        }
    },
};
