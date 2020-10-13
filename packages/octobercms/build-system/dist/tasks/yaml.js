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
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const scss_to_october_1 = require("./includes/scss-to-october");
const merge_october_yaml_1 = require("./includes/merge-october-yaml");
require("../types/gulp-yaml-merge/index");
const yamlMerge = __importStar(require("gulp-yaml-merge"));
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
