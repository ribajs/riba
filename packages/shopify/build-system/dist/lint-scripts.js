"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_eslint_1 = __importDefault(require("gulp-eslint"));
const path_1 = __importDefault(require("path"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const config_1 = require("./includes/config");
const jsPath = path_1.default.join(config_1.config.themeRoot, config_1.config.src.jsPath);
const tsPath = path_1.default.join(config_1.config.themeRoot, config_1.config.src.tsPath);
const fallbackConfig = require("../../.eslintrc.js");
// Try to get the .eslintrc.js from root of the project, otherwise use the default config from this repository
let jSLintConfig;
let tSLintConfig;
try {
    jSLintConfig = require(path_1.default.join(jsPath, ".eslintrc.js"));
}
catch (error) {
    jSLintConfig = fallbackConfig;
}
try {
    tSLintConfig = require(path_1.default.join(tsPath, ".eslintrc.js"));
}
catch (error) {
    tSLintConfig = fallbackConfig;
}
const reportLint = (result) => {
    if (result.messages.length > 0) {
        gulp_util_1.default.log(`ESLint result: ${result.filePath}`);
        gulp_util_1.default.log(`# Messages: ${result.messages.length}`);
        gulp_util_1.default.log(`# Warnings: ${result.warningCount}`);
        gulp_util_1.default.log(`# Errors: ${result.errorCount}`);
        // for (const message of result.messages) {
        //   gutil.log(message);
        // }
    }
};
gulp_1.default.task("lint:js", () => {
    return gulp_1.default
        .src([
        config_1.config.roots.js,
        config_1.config.sharedCode.roots.js,
        `!${config_1.config.roots.vendorJs}`,
        `!${config_1.config.sharedCode.roots.vendorJs}`,
    ], { allowEmpty: true })
        .pipe(gulp_eslint_1.default(jSLintConfig))
        .pipe(gulp_eslint_1.default.result(reportLint))
        .pipe(gulp_eslint_1.default.format())
        .pipe(gulp_eslint_1.default.failAfterError());
});
gulp_1.default.task("lint:ts", () => {
    return gulp_1.default
        .src([config_1.config.src.ts, config_1.config.sharedCode.src.ts], { allowEmpty: true })
        .pipe(gulp_eslint_1.default(tSLintConfig))
        .pipe(gulp_eslint_1.default.result(reportLint))
        .pipe(gulp_eslint_1.default.format())
        .pipe(gulp_eslint_1.default.failAfterError());
});
//# sourceMappingURL=lint-scripts.js.map