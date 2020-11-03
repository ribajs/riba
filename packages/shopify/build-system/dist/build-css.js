"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const chokidar_1 = __importDefault(require("chokidar"));
const path_1 = __importDefault(require("path"));
const gulp_cssimport_1 = __importDefault(require("gulp-cssimport"));
const gulp_ext_replace_1 = __importDefault(require("gulp-ext-replace"));
const config_1 = require("./includes/config");
const utilities_1 = __importDefault(require("./includes/utilities"));
const messages_1 = __importDefault(require("./includes/messages"));
/**
 * Concatenate css via gulp-cssimport and copys to the `/dist` folder
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
const processCss = () => {
    messages_1.default.logProcessFiles("build:css");
    return (gulp_1.default
        .src([config_1.config.roots.css, config_1.config.sharedCode.roots.css])
        .pipe(gulp_plumber_1.default(utilities_1.default.errorHandler))
        .pipe(gulp_cssimport_1.default({
        includePaths: [
            path_1.default.resolve(__dirname, "../../src/ts"),
            path_1.default.resolve(config_1.config.sharedCode.root, config_1.config.sharedCode.roots.cssPath),
        ],
    }))
        .pipe(gulp_ext_replace_1.default(".css.liquid", ".css"))
        .pipe(gulp_ext_replace_1.default(".scss.liquid", ".scss"))
        // .pipe(
        //   cleanCSS({
        //     level: {
        //       1: {
        //         all: false,
        //       },
        //     },
        //   })
        // )
        .pipe(gulp_1.default.dest(config_1.config.dist.assets)));
};
/**
 * Concatenate css via gulp-cssimport
 *
 * @function build:css
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp_1.default.task("build:css", () => {
    return processCss();
});
/**
 * Watches css in the `/src` directory
 *
 * @function watch:css
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:css", () => {
    return chokidar_1.default
        .watch([config_1.config.src.css, config_1.config.sharedCode.src.css], {
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        processCss();
    });
});
//# sourceMappingURL=build-css.js.map