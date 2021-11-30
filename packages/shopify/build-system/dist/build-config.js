"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-config.js
 */
const gulp_1 = __importDefault(require("gulp"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const chokidar_1 = __importDefault(require("chokidar"));
const gulp_size_1 = __importDefault(require("gulp-size"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const config_1 = require("./includes/config");
const utilities_1 = require("./includes/utilities");
const messages_1 = __importDefault(require("./includes/messages"));
const processConfig = (file) => {
    messages_1.default.logProcessFiles("build:config");
    return gulp_1.default
        .src(file, { allowEmpty: true })
        .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
        .pipe((0, gulp_size_1.default)({
        showFiles: true,
        pretty: true,
    }))
        .pipe((0, gulp_rename_1.default)("config.yml"))
        .pipe(gulp_1.default.dest(config_1.config.dist.root));
};
/**
 * ThemeKit requires the config file to be in the `root` directory for files it
 * will be uploading to our store.  As such we need to move this file to `./dist`
 * before running any deployment tasks.
 *
 * @function build:config
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp_1.default.task("build:config", () => {
    return processConfig(config_1.config.tkConfig);
});
/**
 * Watch the config file in our `src/` folder and move it to `dist/`
 * Watches the config file in our dist folder and throw an error to stop all tasks
 * or watchers when it changes.  Otherwise Themekit will quietly start uploading
 * files to the new shops defined in `dist/config.yml` with no warning to the user
 *
 * @function watch:config
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:config", () => {
    return chokidar_1.default
        .watch(config_1.config.tkConfig, { ignoreInitial: true })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        processConfig(path);
    });
});
/**
 * Watch the config file in our dist folder and throw an error to stop all tasks
 * or watchers when it changes.  Otherwise Themekit will quietly start uploading
 * files to the new shops defined in `dist/config.yml` with no warning to the user
 *
 * @function watch:dist-config
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:dist-config", () => {
    return chokidar_1.default
        .watch(config_1.config.dist.root + config_1.config.tkConfig, { ignoreInitial: true })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        throw new Error(messages_1.default.configChange());
    });
});
//# sourceMappingURL=build-config.js.map