"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Get a back random value of array
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
exports.random = {
    name: 'random',
    read(array) {
        if (utils_1.Utils.isArray(array)) {
            const value = array[Math.floor(Math.random() * array.length)];
            return value;
        }
        return null;
    },
};
