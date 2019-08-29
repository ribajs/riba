"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Set property of object, array or value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
exports.set = {
    name: 'set',
    read(obj, key, value) {
        // the key is the value if value is not set
        if (!value) {
            value = key;
        }
        if (utils_1.Utils.isObject(obj) || utils_1.Utils.isArray(obj)) {
            obj[key] = value;
        }
        else {
            obj = value;
        }
        return obj;
    },
};
