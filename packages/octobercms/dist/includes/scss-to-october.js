"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.scssToOctoberYml = void 0;
var Stream = require("stream");
var Path = require("path");
var yaml = require("js-yaml");
var rgbRegex = require("rgb-regex");
var hexRegex = require("hex-color-regex");
function scssToOctoberYml() {
    var stream = new Stream.Transform({ objectMode: true });
    stream._transform = function (originalFile, _, callback) {
        var file = originalFile.clone({ contents: false });
        if (file.isBuffer()) {
            file.path =
                Path.dirname(file.path) +
                    "/" +
                    Path.basename(file.path, ".scss") +
                    ".yml"; //change path ext to .yml
            //split scss file into lines, only lines including octoberyml: {} will be converted to a configuration option
            var lines = file.contents.toString().split(/(?:\r\n|\r|\n)/g);
            var commentPattern = /^ {0,}\$(.{1,}): {0,}(.*?) {0,}(!default)? {0,}; {0,}\/{2} {0,}octoberyml: {0,}(\{ {0,}.{0,} {0,}\})$/i;
            var spacerPattern = /^ {0,}\/{2} {0,}octoberyml: {0,}(\{ {0,}.{0,} {0,}\})$/i;
            var variables = {};
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                var match = line.match(commentPattern);
                if (match != null) {
                    var variableName = match[1];
                    var sanatizedVariableName = variableName.replace(/-/g, "_");
                    var defaultValue = match[2];
                    var options = {};
                    options.label = variableName.replace(/-/g, " ").replace(/_/g, "-");
                    options.type = "text";
                    if (isColor(defaultValue)) {
                        options.type = "colorpicker";
                    }
                    try {
                        options = __assign(__assign({}, options), looseJsonParse(match[4]));
                    }
                    catch (e) {
                        throw new Error("invalid options string: " + options);
                    }
                    variables[sanatizedVariableName] = __assign({ "default": defaultValue, assetVar: variableName }, options);
                }
                else {
                    match = line.match(spacerPattern);
                    if (match != null) {
                        var options = {};
                        options.type = "section";
                        try {
                            options = __assign(__assign({}, options), looseJsonParse(match[1]));
                        }
                        catch (e) {
                            throw new Error("invalid options string: " + options);
                        }
                        variables[Math.random().toString(36).substring(7)] = __assign({}, options);
                    }
                }
            }
            //dump
            if (Object.keys(variables).length === 0) {
                file.contents = Buffer.from("");
            }
            else {
                file.contents = Buffer.from(yaml.safeDump(variables, {
                    styles: {
                        "!!null": "canonical"
                    }
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
//from https://developer.mozilla.org/
function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ")")(); //@reviewer, don't use Function? alternative would be JSON.parse()
}
function isColor(strColor) {
    return (rgbRegex({ exact: true }).test(strColor) ||
        hexRegex({ exact: true }).test(strColor));
}
