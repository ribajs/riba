"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Array formatter to get a subarray from array
 */
exports.range = {
    name: 'range',
    read(arr, start, end) {
        start = Number(utils_1.Utils.isNumber(start) ? start : 0);
        end = Number(utils_1.Utils.isNumber(end) ? end : arr.length - 1);
        if (end > arr.length - 1) {
            end = arr.length - 1;
        }
        if (start > end) {
            return [];
        }
        return arr.slice(Number(start || 0), 1 + end);
    },
};
