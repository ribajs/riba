"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-js.js
 */
const gulp_1 = __importDefault(require("gulp"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const chokidar_1 = __importDefault(require("chokidar"));
const gulp_terser_1 = __importDefault(require("gulp-terser"));
const gulp_sourcemaps_1 = __importDefault(require("gulp-sourcemaps"));
const gulp_include_1 = __importDefault(require("gulp-include"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const config_1 = require("./includes/config");
const utilities_1 = require("./includes/utilities");
const messages_1 = __importDefault(require("./includes/messages"));
/**
 * By default slate do not minify the theme.js but we did
 * For production without sourcemaps on dev with sourcemaps
 */
function processThemeJs() {
    if (gulp_util_1.default.env.environments !== "development") {
        return gulp_1.default
            .src([
            config_1.config.roots.js,
            config_1.config.sharedCode.roots.js,
            `!${config_1.config.roots.vendorJs}`,
            `!${config_1.config.sharedCode.roots.vendorJs}`,
        ], { allowEmpty: true })
            .pipe(gulp_plumber_1.default(utilities_1.errorHandler))
            .pipe(gulp_include_1.default({
            includePaths: [config_1.config.roots.jsPath, config_1.config.sharedCode.roots.jsPath],
        }))
            .pipe(gulp_terser_1.default())
            .pipe(gulp_1.default.dest(config_1.config.dist.assets));
    }
    else {
        return gulp_1.default
            .src([
            config_1.config.roots.js,
            config_1.config.sharedCode.roots.js,
            `!${config_1.config.roots.vendorJs}`,
            `!${config_1.config.sharedCode.roots.vendorJs}`,
        ], { allowEmpty: true })
            .pipe(gulp_plumber_1.default(utilities_1.errorHandler))
            .pipe(gulp_sourcemaps_1.default.init())
            .pipe(gulp_include_1.default({
            includePaths: [config_1.config.roots.jsPath, config_1.config.sharedCode.roots.jsPath],
        }))
            .pipe(gulp_terser_1.default())
            .pipe(gulp_sourcemaps_1.default.write())
            .pipe(gulp_1.default.dest(config_1.config.dist.assets));
    }
}
function processVendorJs() {
    messages_1.default.logProcessFiles("build:vendor-js");
    if (gulp_util_1.default.env.environments !== "development") {
        return gulp_1.default
            .src([config_1.config.roots.vendorJs, config_1.config.sharedCode.roots.vendorJs], {
            allowEmpty: true,
        })
            .pipe(gulp_plumber_1.default(utilities_1.errorHandler))
            .pipe(gulp_include_1.default())
            .pipe(gulp_terser_1.default())
            .pipe(gulp_1.default.dest(config_1.config.dist.assets));
    }
    else {
        return gulp_1.default
            .src([config_1.config.roots.vendorJs, config_1.config.sharedCode.roots.vendorJs], {
            allowEmpty: true,
        })
            .pipe(gulp_plumber_1.default(utilities_1.errorHandler))
            .pipe(gulp_sourcemaps_1.default.init())
            .pipe(gulp_include_1.default())
            .pipe(gulp_terser_1.default())
            .pipe(gulp_sourcemaps_1.default.write())
            .pipe(gulp_1.default.dest(config_1.config.dist.assets));
    }
}
gulp_1.default.task("build:js", () => {
    return processThemeJs();
});
gulp_1.default.task("watch:js", () => {
    return chokidar_1.default
        .watch([
        config_1.config.src.js,
        config_1.config.sharedCode.src.js,
        `!${config_1.config.roots.vendorJs}`,
        `!${config_1.config.src.vendorJs}`,
    ], { ignoreInitial: true /*, allowEmpty: true */ })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        processThemeJs();
    });
});
gulp_1.default.task("build:vendor-js", () => {
    return processVendorJs();
});
gulp_1.default.task("watch:vendor-js", () => {
    return chokidar_1.default
        .watch([
        config_1.config.roots.vendorJs,
        config_1.config.sharedCode.roots.vendorJs,
        config_1.config.src.vendorJs,
        config_1.config.sharedCode.src.vendorJs,
    ], { ignoreInitial: true /*, allowEmpty: true*/ })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        processVendorJs();
    });
});
//# sourceMappingURL=build-js.js.map