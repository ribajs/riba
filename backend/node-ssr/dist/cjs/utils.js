"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonString = exports.isJson = exports.couldBeJson = void 0;
const couldBeJson = (str) => {
    if (!str || typeof str !== "string") {
        return false;
    }
    str = str.trim();
    return str.charAt(0) === "{" || str.charAt(0) === "[";
};
exports.couldBeJson = couldBeJson;
const isJson = (str) => {
    if (!str || !(0, exports.couldBeJson)(str)) {
        return false;
    }
    try {
        const val = JSON.parse(str);
        return Array.isArray(val) || typeof val === "object" ? true : false;
    }
    catch (error) {
        return false;
    }
};
exports.isJson = isJson;
const parseJsonString = (value) => {
    let object = null;
    if (!(0, exports.couldBeJson)(value)) {
        return object;
    }
    if ((0, exports.isJson)(value)) {
        value = value.replace(/&#39;/g, `'`);
        object = JSON.parse(value) || null;
    }
    else {
        try {
            value = value.replace(/'/g, '"').replace(/&#39;/g, `'`);
            object = JSON.parse(value) || null;
        }
        catch (error) {
            console.error(error);
        }
    }
    return object;
};
exports.parseJsonString = parseJsonString;
//# sourceMappingURL=utils.js.map