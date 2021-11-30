"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const del_1 = __importDefault(require("del"));
const gulp_zip_1 = __importDefault(require("gulp-zip"));
const gulp_size_1 = __importDefault(require("gulp-size"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const config_1 = require("./includes/config");
const utilities_1 = require("./includes/utilities");
/**
 * Clean up build dirs/files whenever doing a full/clean (re)build.
 *
 * @function build:clean
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp_1.default.task("clean", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, del_1.default)(["upload", "dist"]);
}));
/**
 * Compress theme and build a shopify-compatible `.zip` file for uploading to store
 *
 * @function compress
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("compress", () => {
    const distFiles = `${config_1.config.dist.root}**/*`;
    const ignoreConfig = `!${config_1.config.dist.root}config.yml`;
    return gulp_1.default
        .src([distFiles, ignoreConfig])
        .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
        .pipe((0, gulp_zip_1.default)(`${config_1.config.packageJson.name}_${config_1.config.packageJson.version}.zip` ||
        "theme.zip"))
        .pipe((0, gulp_size_1.default)({ showFiles: true, pretty: true }))
        .pipe(gulp_1.default.dest("./upload/"));
});
//# sourceMappingURL=build-utils.js.map