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
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-assets.js
 */
const gulp_1 = __importDefault(require("gulp"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const chokidar_1 = __importDefault(require("chokidar"));
const vinyl_paths_1 = __importDefault(require("vinyl-paths"));
const del_1 = __importDefault(require("del"));
const gulp_size_1 = __importDefault(require("gulp-size"));
const config_1 = require("./includes/config");
const utilities_1 = __importDefault(require("./includes/utilities"));
const messages_1 = __importDefault(require("./includes/messages"));
const assetsPaths = [
    config_1.config.src.assets,
    config_1.config.src.templates,
    config_1.config.src.sections,
    config_1.config.src.snippets,
    config_1.config.src.locales,
    config_1.config.src.config,
    config_1.config.src.layout,
];
const assetsPathsSharedCode = [
    config_1.config.sharedCode.src.assets,
    config_1.config.sharedCode.src.templates,
    config_1.config.sharedCode.src.sections,
    config_1.config.sharedCode.src.snippets,
    config_1.config.sharedCode.src.locales,
    config_1.config.sharedCode.src.config,
    config_1.config.sharedCode.src.layout,
];
/**
 * Copies assets to the `/dist` directory
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
const processAssetsTheme = (files) => {
    messages_1.default.logProcessFiles("build:assets");
    return gulp_1.default
        .src(files, { base: config_1.config.src.root })
        .pipe(gulp_plumber_1.default(utilities_1.default.errorHandler))
        .pipe(gulp_size_1.default({
        showFiles: true,
        pretty: true,
    }))
        .pipe(gulp_1.default.dest(config_1.config.dist.root));
};
const processAssetsSharedCode = (files) => {
    messages_1.default.logProcessFiles("build:assets:shared-code");
    return gulp_1.default
        .src(files, { base: config_1.config.sharedCode.src.root })
        .pipe(gulp_plumber_1.default(utilities_1.default.errorHandler))
        .pipe(gulp_size_1.default({
        showFiles: true,
        pretty: true,
    }))
        .pipe(gulp_1.default.dest(config_1.config.dist.root));
};
/**
 * Deletes specified files
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
function removeAssets(files) {
    return __awaiter(this, void 0, void 0, function* () {
        messages_1.default.logProcessFiles("remove:assets");
        const mapFiles = files.map((file) => {
            const distFile = file
                .replace(config_1.config.src.root, config_1.config.dist.root)
                .replace(config_1.config.sharedCode.src.root, config_1.config.dist.root);
            return distFile;
        });
        return gulp_1.default
            .src(mapFiles)
            .pipe(gulp_plumber_1.default(utilities_1.default.errorHandler))
            .pipe(vinyl_paths_1.default(del_1.default))
            .pipe(gulp_size_1.default({
            showFiles: true,
            pretty: true,
        }));
    });
}
/**
 * Copies assets to the `/dist` directory
 *
 * @function build:assets
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp_1.default.task("build:assets", () => {
    return processAssetsTheme(assetsPaths);
});
gulp_1.default.task("build:assets:shared-code", () => {
    return processAssetsSharedCode(assetsPathsSharedCode);
});
/**
 * Watches assets in the `/src` directory
 *
 * @function watch:assets
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:assets", () => {
    const eventCache = utilities_1.default.createEventCache();
    return chokidar_1.default
        .watch(assetsPaths, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        eventCache.addEvent(event, path);
        utilities_1.default.processCache(eventCache, processAssetsTheme, removeAssets);
    });
});
gulp_1.default.task("watch:assets:shared-code", () => {
    const eventCache = utilities_1.default.createEventCache();
    return chokidar_1.default
        .watch(assetsPathsSharedCode, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        eventCache.addEvent(event, path);
        utilities_1.default.processCache(eventCache, processAssetsSharedCode, removeAssets);
    });
});
//# sourceMappingURL=build-assets.js.map