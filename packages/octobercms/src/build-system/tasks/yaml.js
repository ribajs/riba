"use strict";
exports.__esModule = true;
var gulp_1 = require("gulp");
var scss_to_october_1 = require("./includes/scss-to-october");
var merge_october_yaml_1 = require("./includes/merge-october-yaml");
var yamlMerge = require("gulp-yaml-merge");
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
gulp_1.task("build-yml", gulp_1.series("build-yml", "merge-yml", "merge-with-october-yml"));
