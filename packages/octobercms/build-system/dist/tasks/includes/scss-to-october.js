"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scssToOctoberYml = void 0;
const Stream = __importStar(require("stream"));
const Path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
require("../../types/index");
const rgb_regex_1 = __importDefault(require("rgb-regex"));
const hexRegex = require("hex-color-regex");
function scssToOctoberYml() {
    const stream = new Stream.Transform({ objectMode: true });
    stream._transform = function (originalFile, _, callback) {
        const file = originalFile.clone({ contents: false });
        if (file.isBuffer()) {
            file.path =
                Path.dirname(file.path) +
                    "/" +
                    Path.basename(file.path, ".scss") +
                    ".yml"; //change path ext to .yml
            //split scss file into lines, only lines including octoberyml: {} will be converted to a configuration option
            const lines = file.contents.toString().split(/(?:\r\n|\r|\n)/g);
            const commentPattern = /^\s*\$(.+?):\s*(.*?)\s*(!default)?\s*;\s*\/\/\s*octoberyml:\s*(\{\s*.*\s*\})$/i;
            const spacerPattern = /^\s*\/\/\s*octoberyml:\s*(\w+)\s*(\{\s*.*\s*\})$/i;
            const variables = {};
            for (const line of lines) {
                let match = line.match(commentPattern);
                if (match != null) {
                    const variableName = match[1];
                    const sanatizedVariableName = variableName.replace(/-/g, "_");
                    const defaultValue = match[2];
                    let options = {};
                    options.label = variableName.replace(/-/g, " ").replace(/_/g, "-");
                    options.type = "text";
                    if (isColor(defaultValue)) {
                        options.type = "colorpicker";
                    }
                    try {
                        options = { ...options, ...looseJsonParse(match[4]) };
                    }
                    catch (e) {
                        throw new Error("invalid options string: " + options);
                    }
                    variables[sanatizedVariableName] = {
                        default: defaultValue,
                        assetVar: variableName,
                        ...options,
                    };
                }
                else {
                    match = line.match(spacerPattern);
                    if (match != null) {
                        let options = {};
                        options.type = "section";
                        try {
                            options = { ...options, ...looseJsonParse(match[2]) };
                        }
                        catch (e) {
                            throw new Error("invalid options string: " + options);
                        }
                        variables[match[1]] = {
                            ...options,
                        };
                    }
                }
            }
            //dump
            if (Object.keys(variables).length === 0) {
                file.contents = Buffer.from("");
            }
            else {
                file.contents = Buffer.from(yaml.dump(variables, {
                    styles: {
                        "!!null": "canonical", // dump null as ~
                    },
                }));
            }
            console.log("\n### OUTPUT ###\n");
            console.log(file.contents.toString());
        }
        callback(null, file);
    };
    return stream;
}
exports.scssToOctoberYml = scssToOctoberYml;
/**
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/eval
 * @param obj
 */
function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ")")(); //@reviewer, don't use Function? alternative would be JSON.parse()
}
function isColor(strColor) {
    return (rgb_regex_1.default({ exact: true }).test(strColor) || hexRegex({}).test(strColor));
}
