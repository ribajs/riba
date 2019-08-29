"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size_formatter_1 = require("./size.formatter");
exports.empty = {
    name: 'empty',
    read(a) {
        return size_formatter_1.size.read(a) <= 0;
    },
};
