System.register(["stream", "js-yaml", "fs"], function (exports_1, context_1) {
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
    var Stream, yaml, fs;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("mergeOctoberFormFields", mergeOctoberFormFields);
    return {
        setters: [
            function (Stream_1) {
                Stream = Stream_1;
            },
            function (yaml_1) {
                yaml = yaml_1;
            },
            function (fs_1) {
                fs = fs_1;
            }
        ],
        execute: function () {
        }
    };
});
