"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const tosource_1 = __importDefault(require("tosource"));
const terser_1 = __importDefault(require("terser"));
const prettier_1 = __importDefault(require("prettier"));
const gulp_1 = __importDefault(require("gulp"));
const config_1 = require("./includes/config");
const RENAME_PROPERTIES = {
    iata_code: "ccode",
};
const KEEP_PROPERTIES = ["exact", "low", "high", "city"];
const OUTPUT_FILENAME = "checkout_exclude-express-postalcodes";
const OUTPUT_THEME_SETTINGS_FILENAME = "settings_schema_postalcodes";
const MINIFY = false;
const PRINT = false;
const OUTPUT_AS_JAVASCRIPT_FILE = true;
const isNumeric = function (num) {
    return !isNaN(num);
};
const parseFile = function () {
    const workSheetsFromFile = node_xlsx_1.default.parse(path_1.default.resolve(__dirname, "..", "International_Extended_Area_Surcharge.xlsx"));
    // Remove empty lines
    const cols = Array.from(workSheetsFromFile[0].data).filter((data) => data.length > 3);
    // First line are the property names
    const properties = cols[0].map((_property) => {
        let property = String(_property)
            .toLocaleLowerCase()
            .trim()
            .replace(/\s/g, "_");
        if (RENAME_PROPERTIES[property]) {
            property = RENAME_PROPERTIES[property];
        }
        return property;
    });
    cols.splice(0, 1);
    return {
        properties,
        cols,
    };
};
const parseValue = function (val) {
    if (typeof val === "string") {
        if (val.toLocaleLowerCase() === "no") {
            return false;
        }
        if (val.toLocaleLowerCase() === "yes") {
            return true;
        }
        if (isNumeric(val)) {
            return Number(val);
        }
    }
    return val;
};
const convertColumnToObject = function (col, properties) {
    const obj = {};
    for (let i = 0; i < col.length; i++) {
        const value = col[i];
        if (properties[i] && properties[i] !== "ccode") {
            obj[properties[i]] = parseValue(value);
        }
        else {
            obj[properties[i]] = value;
        }
    }
    return obj;
};
const convertColumnsToObject = function (cols, properties) {
    const objects = [];
    for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        const obj = convertColumnToObject(col, properties);
        objects.push(obj);
    }
    return objects;
};
const mergeCountries = function (objects) {
    const countries = {};
    for (let i = 0; i < objects.length; i++) {
        const currObj = objects[i];
        const countryCode = currObj.ccode;
        countries[countryCode] = countries[countryCode] || [];
        countries[countryCode].push(currObj);
    }
    return countries;
};
const clearProperties = function (countries) {
    // Remove low and high if they are equal
    for (const countryCode in countries) {
        for (let i = 0; i < countries[countryCode].length; i++) {
            const currObj = countries[countryCode][i];
            if (currObj.low === currObj.high) {
                // Rename low property to exact if its equal
                Object.defineProperty(currObj, "exact", Object.getOwnPropertyDescriptor(currObj, "low"));
                delete currObj.low;
                delete currObj.high;
            }
            for (const key in currObj) {
                // Only keep the properties defined in KEEP_PROPERTIES
                if (!KEEP_PROPERTIES.includes(key)) {
                    delete currObj[key];
                }
                // delete undefined values
                if (typeof currObj[key] === "undefined") {
                    delete currObj[key];
                }
            }
        }
    }
    return countries;
};
const saveThemeSettings = function (countries) {
    const themeSettings = {
        name: "Checkout Postalcodes",
        settings: [
            {
                type: "text",
                id: "checkout_postalcodes_country_codes",
                info: "Please do not modify this field",
                label: "Available country codes",
                default: "",
            },
            {
                type: "header",
                content: "Enable for the exclude express postalcode script for the following country codes",
            },
        ],
    };
    // Set all available country codes as the default value for 'checkout_postalcodes_country_codes'
    const countryCodes = Object.keys(countries);
    themeSettings.settings[0].default = countryCodes.join(";");
    // Append country codes to theme settings
    for (const countryCode in countries) {
        themeSettings.settings.push({
            type: "checkbox",
            id: "checkout_postalcodes_enable_" + countryCode,
            label: countryCode,
            default: false,
        });
    }
    fs_1.default.writeFileSync(OUTPUT_THEME_SETTINGS_FILENAME + ".json", JSON.stringify(themeSettings, null, 2), "utf8");
};
const saveFile = function (countryPostalCodes, countryCode, asJavascript = false, minify = false, print = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let filename = path_1.default.resolve(config_1.config.sharedCode.src.root, "js", `${OUTPUT_FILENAME}_${countryCode}`);
        let content = "";
        if (asJavascript) {
            content =
                `(function(window) {\n` +
                    `window.rfd = window.rfd || {};\n` +
                    `window.rfd.checkout = window.rfd.checkout || {};\n` +
                    `window.rfd.checkout.excludeExpressPostalcodes = window.rfd.checkout.excludeExpressPostalcodes || {};\n` +
                    `window.rfd.checkout.excludeExpressPostalcodes.${countryCode} = `;
            content += tosource_1.default(countryPostalCodes);
            content += '})(typeof(window) !== "undefined" ? window : global);';
            filename += ".js";
        }
        else {
            content = JSON.stringify(countryPostalCodes);
            filename += ".json";
        }
        if (minify) {
            const result = yield terser_1.default.minify(content);
            content = result.code || content;
        }
        else {
            content = prettier_1.default.format(content, { parser: "babel" });
        }
        if (print) {
            console.dir(content);
        }
        else {
            fs_1.default.writeFileSync(filename, content, "utf8");
        }
    });
};
const saveFiles = function (countries, asJavascript = false, minify = false, print = false) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const countryCode in countries) {
            yield saveFile(countries[countryCode], countryCode, asJavascript, minify, print);
        }
    });
};
gulp_1.default.task("build:postalcodes", () => __awaiter(void 0, void 0, void 0, function* () {
    const { cols, properties } = parseFile();
    const objects = convertColumnsToObject(cols, properties);
    const countries = mergeCountries(objects);
    clearProperties(countries);
    saveThemeSettings(countries);
    yield saveFiles(countries, OUTPUT_AS_JAVASCRIPT_FILE, MINIFY, PRINT);
}));
//# sourceMappingURL=build-postalcodes.js.map