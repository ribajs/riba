"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Parse a value to string
 * @param value The value you want to parse to string
 * @param def Default value if value is undefined
 */
exports.stringFormatter = {
    name: 'string',
    read(value, def) {
        // If value is an array convert each value in array to string
        if (utils_1.Utils.isArray(value)) {
            for (const i in value) {
                if (value[i]) {
                    value[i] = utils_1.Utils.getString(value[i]);
                }
            }
        }
        else if (utils_1.Utils.isObject(value)) {
            for (const key in value) {
                if ((value.hasOwnProperty(key))) {
                    value[key] = utils_1.Utils.getString(value[key]);
                }
            }
        }
        else {
            value = utils_1.Utils.getString(value);
        }
        // If default value is set return the default value if num is 0, null or undefined
        if (def) {
            return value ? value : def;
        }
        return value;
    },
};
