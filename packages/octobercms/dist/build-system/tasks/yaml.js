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
System.register("includes/scss-to-october", ["stream", "path", "js-yaml", "rgb-regex", "hex-color-regex"], function (exports_1, context_1) {
    "use strict";
    var Stream, Path, yaml, rgbRegex, hexRegex;
    var __moduleName = context_1 && context_1.id;
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
                var commentPattern = / {0,}\$(.{1,}): {0,}(.*?) {0,}(!default)? {0,}; {0,}\/{2} {0,}octoberyml: {0,}(\{ {0,}.{0,} {0,}\})/i;
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
                }
                //dump
                file.contents = Buffer.from(yaml.safeDump(variables, {
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
    exports_1("scssToOctoberYml", scssToOctoberYml);
    //from https://developer.mozilla.org/
    function looseJsonParse(obj) {
        return Function('"use strict";return (' + obj + ")")(); //@reviewer, don't use Function? alternative would be JSON.parse()
    }
    function isColor(strColor) {
        return (rgbRegex({ exact: true }).test(strColor) ||
            hexRegex({ exact: true }).test(strColor));
    }
    return {
        setters: [
            function (Stream_1) {
                Stream = Stream_1;
            },
            function (Path_1) {
                Path = Path_1;
            },
            function (yaml_1) {
                yaml = yaml_1;
            },
            function (rgbRegex_1) {
                rgbRegex = rgbRegex_1;
            },
            function (hexRegex_1) {
                hexRegex = hexRegex_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("includes/merge-october-yaml", ["stream", "js-yaml", "fs"], function (exports_2, context_2) {
    "use strict";
    var Stream, yaml, fs;
    var __moduleName = context_2 && context_2.id;
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
    exports_2("mergeOctoberFormFields", mergeOctoberFormFields);
    return {
        setters: [
            function (Stream_2) {
                Stream = Stream_2;
            },
            function (yaml_2) {
                yaml = yaml_2;
            },
            function (fs_1) {
                fs = fs_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("yaml", ["gulp", "includes/scss-to-october", "includes/merge-october-yaml", "gulp-yaml-merge"], function (exports_3, context_3) {
    "use strict";
    var gulp_1, scss_to_october_1, merge_october_yaml_1, yamlMerge;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (gulp_1_1) {
                gulp_1 = gulp_1_1;
            },
            function (scss_to_october_1_1) {
                scss_to_october_1 = scss_to_october_1_1;
            },
            function (merge_october_yaml_1_1) {
                merge_october_yaml_1 = merge_october_yaml_1_1;
            },
            function (yamlMerge_1) {
                yamlMerge = yamlMerge_1;
            }
        ],
        execute: function () {
            gulp_1.task("build-yml", function buildExampleYmlFromScss() {
                return gulp_1.src("./assets/**/*.scss")
                    .pipe(scss_to_october_1.scssToOctoberYml())
                    .pipe(gulp_1.dest("./build/tmp/"));
            });
            gulp_1.task("merge-yml", function () {
                return gulp_1.src("./build/tmp/**/*.yml")
                    .pipe(yamlMerge("bundle.yml"))
                    .pipe(gulp_1.dest("./build/"));
            });
            gulp_1.task("merge-with-october-yml", function mergeOctoberYamlTask() {
                return gulp_1.src("./default_theme.yaml", { allowEmpty: true })
                    .pipe(merge_october_yaml_1.mergeOctoberFormFields("./build/bundle.yml"))
                    .pipe(gulp_1.dest("./"));
            });
            gulp_1.task("build-scss-and-yml", gulp_1.series("build-yml", "merge-yml", "merge-with-october-yml"));
        }
    };
});
