export const couldBeJson = (str) => {
    if (!str || typeof str !== "string") {
        return false;
    }
    str = str.trim();
    return str.charAt(0) === "{" || str.charAt(0) === "[";
};
export const isJson = (str) => {
    if (!str || !couldBeJson(str)) {
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
export const parseJsonString = (value) => {
    let object = null;
    if (!couldBeJson(value)) {
        return object;
    }
    if (isJson(value)) {
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
//# sourceMappingURL=utils.js.map