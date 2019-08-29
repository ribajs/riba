"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
exports.get = {
    name: 'get',
    read(value, key) {
        if (utils_1.Utils.isObject(value) || utils_1.Utils.isArray(value)) {
            return value[key];
        }
        if (utils_1.Utils.isString(value)) {
            if (utils_1.Utils.isNumber(key)) {
                return value.charAt(key);
            }
        }
        return null;
    },
};
