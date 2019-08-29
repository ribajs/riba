"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_formatter_1 = require("./get.formatter");
/**
 * Array formatter to get the first element of an array
 */
exports.first = {
    name: 'first',
    read(value) {
        return get_formatter_1.get.read(value, 0);
    },
};
