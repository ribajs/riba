"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const scss_to_october_1 = require("./includes/scss-to-october");
const merge_october_yaml_1 = require("./includes/merge-october-yaml");
require("../types/index");
const gulp_yaml_merge_1 = __importDefault(require("gulp-yaml-merge"));
gulp_1.task("build-yml", function buildExampleYmlFromScss() {
    return gulp_1.src("./assets/**/*.scss")
        .pipe(scss_to_october_1.scssToOctoberYml())
        .pipe(gulp_1.dest("./build/tmp/"));
});
gulp_1.task("merge-yml", function () {
    return gulp_1.src("./build/tmp/**/*.yml")
        .pipe(gulp_yaml_merge_1.default("bundle.yml"))
        .pipe(gulp_1.dest("./build/"));
});
gulp_1.task("merge-with-october-yml", function mergeOctoberYamlTask() {
    return gulp_1.src("./default_theme.yaml", { allowEmpty: true })
        .pipe(merge_october_yaml_1.mergeOctoberFormFields("./build/bundle.yml"))
        .pipe(gulp_1.dest("./"));
});
gulp_1.task("build-scss-and-yml", gulp_1.series("build-yml", "merge-yml", "merge-with-october-yml"));
