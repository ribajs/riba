"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
exports.parse = {
    name: 'parse',
    read(jsonString) {
        if (utils_1.Utils.isString(jsonString)) {
            const object = JSON.parse(jsonString);
            return object;
        }
        return null;
    },
};
