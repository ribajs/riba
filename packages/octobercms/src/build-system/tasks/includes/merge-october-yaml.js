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
exports.mergeOctoberFormFields = void 0;
var Stream = require("stream");
var yaml = require("js-yaml");
var fs = require("fs");
function mergeOctoberFormFields(obj) {
    if (!obj)
        throw new Error("Argument required");
    var stream = new Stream.Transform({ objectMode: true });
    stream._transform = function (originalFile, _, callback) {
        var file = originalFile.clone({ contents: false });
        file.path = "theme.yaml";
        if (file.isBuffer()) {
            var input = yaml.load(file.contents.toString());
            var toMerge = yaml.load(fs.readFileSync(obj).toString());
            if (input.form.tabs.fields) {
                input.form.tabs.fields = __assign(__assign({}, input.form.tabs.fields), toMerge);
            }
            else {
                input.form.tabs.fields = __assign({}, toMerge);
            }
            input.form.tabs.fields = __assign(__assign({}, input.form.tabs.fields), toMerge);
            console.log(toMerge);
            //dump
            file.contents = Buffer.from(yaml.safeDump(input, {
                styles: {
                    "!!null": "canonical"
                }
            }));
            console.log("\n### OUTPUT ###\n");
            console.log(file.contents.toString());
        }
        callback(null, file);
    };
    return stream;
}
exports.mergeOctoberFormFields = mergeOctoberFormFields;
