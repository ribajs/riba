"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
/**
 * True if array / string contains property / substring or containts property with value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
exports.contains = {
    name: 'contains',
    read(value, attr, search) {
        if (utils_1.Utils.isString(value)) {
            return value.indexOf(attr) > -1;
        }
        else if (utils_1.Utils.isArray(value)) {
            for (const index in value) {
                if (utils_1.Utils.isDefined(value[index]) && utils_1.Utils.isDefined(value[index][attr])) {
                    if (utils_1.Utils.isUndefined(search)) {
                        return true;
                    }
                    else {
                        if (value[index][attr] === search) {
                            return true;
                        }
                    }
                }
            }
        }
        else if (utils_1.Utils.isObject(value)) {
            for (const key in value) {
                if ((value.hasOwnProperty(key))) {
                    if (key === attr) {
                        if (utils_1.Utils.isUndefined(search)) {
                            return true;
                        }
                        else {
                            if (value[key][attr] === search) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    },
};
