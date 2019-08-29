"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_formatter_1 = require("./get.formatter");
/**
 * Array formatter to get the last element of an array
 */
exports.last = {
    name: 'last',
    read(array) {
        return get_formatter_1.get.read(array, array.length - 1);
    },
};
