"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * Set default value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
exports.defaultBinder = {
    name: 'default',
    read(value, defaultValue) {
        if (utils_1.Utils.isDefined(value)) {
            if (utils_1.Utils.isString(value)) {
                if (value.length > 0) {
                    return value;
                }
                else {
                    return defaultValue;
                }
            }
            return value;
        }
        return defaultValue;
    },
};
