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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-assets.js
 */
const gulp_1 = __importDefault(require("gulp"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const chokidar_1 = __importDefault(require("chokidar"));
const vinyl_paths_1 = require("./dependencies/vinyl-paths");
const del_1 = __importDefault(require("del"));
const gulp_size_1 = __importDefault(require("gulp-size"));
const gulp_print_1 = __importDefault(require("gulp-print"));
const config_1 = require("./includes/config");
const utilities_1 = require("./includes/utilities");
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
const assetsPathsRibaShopify = [
    config_1.config.ribaShopify.src.assets,
    config_1.config.ribaShopify.src.templates,
    config_1.config.ribaShopify.src.sections,
    config_1.config.ribaShopify.src.snippets,
    config_1.config.ribaShopify.src.locales,
    config_1.config.ribaShopify.src.config,
    config_1.config.ribaShopify.src.layout,
];
const assetsPathsRibaShopifyTda = [];
if ((_a = config_1.config.ribaShopifyTda) === null || _a === void 0 ? void 0 : _a.root) {
    assetsPathsRibaShopifyTda.push(config_1.config.ribaShopifyTda.src.assets, config_1.config.ribaShopifyTda.src.templates, config_1.config.ribaShopifyTda.src.sections, config_1.config.ribaShopifyTda.src.snippets, config_1.config.ribaShopifyTda.src.locales, config_1.config.ribaShopifyTda.src.config, config_1.config.ribaShopifyTda.src.layout);
}
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
        .src(files, { base: config_1.config.src.root, nodir: true })
        .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
        .pipe((0, gulp_size_1.default)({
        showFiles: true,
        pretty: true,
    }))
        .pipe(gulp_1.default.dest(config_1.config.dist.root));
};
const processAssetsRibaShopify = (files) => {
    messages_1.default.logProcessFiles("build:assets:riba-shopify");
    return gulp_1.default
        .src(files, { base: config_1.config.ribaShopify.src.root })
        .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
        .pipe((0, gulp_size_1.default)({
        showFiles: true,
        pretty: true,
    }))
        .pipe(gulp_1.default.dest(config_1.config.dist.root));
};
const processAssetsRibaShopifyTda = (files) => {
    messages_1.default.logProcessFiles("build:assets:riba-shopify-tda");
    return gulp_1.default
        .src(files, { base: config_1.config.ribaShopifyTda.src.root })
        .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
        .pipe((0, gulp_size_1.default)({
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
                .replace(config_1.config.ribaShopify.src.root, config_1.config.dist.root);
            return distFile;
        });
        return gulp_1.default
            .src(mapFiles)
            .pipe((0, gulp_plumber_1.default)(utilities_1.errorHandler))
            .pipe(yield (0, vinyl_paths_1.vinylPaths)(del_1.default))
            .pipe((0, gulp_size_1.default)({
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
gulp_1.default.task("build:assets:favicons", () => {
    return gulp_1.default
        .src(config_1.config.src.favicons)
        .pipe((0, gulp_rename_1.default)((path) => {
        path.basename = "favicons_" + path.basename;
    }))
        .pipe((0, gulp_print_1.default)()) // TODO
        .pipe(gulp_1.default.dest(config_1.config.dist.assets));
});
gulp_1.default.task("build:assets:riba-shopify", () => {
    return processAssetsRibaShopify(assetsPathsRibaShopify);
});
gulp_1.default.task("build:assets:riba-shopify-tda", () => {
    return processAssetsRibaShopifyTda(assetsPathsRibaShopifyTda);
});
/**
 * Watches assets in the `/src` directory
 *
 * @function watch:assets
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:assets", () => {
    const eventCache = (0, utilities_1.createEventCache)();
    return chokidar_1.default
        .watch(assetsPaths, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        eventCache.addEvent(event, path);
        (0, utilities_1.processCache)(eventCache, processAssetsTheme, removeAssets);
    });
});
gulp_1.default.task("watch:assets:riba-shopify", () => {
    const eventCache = (0, utilities_1.createEventCache)();
    return chokidar_1.default
        .watch(assetsPathsRibaShopify, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        eventCache.addEvent(event, path);
        (0, utilities_1.processCache)(eventCache, processAssetsRibaShopify, removeAssets);
    });
});
gulp_1.default.task("watch:assets:riba-shopify-tda", () => {
    const eventCache = (0, utilities_1.createEventCache)();
    return chokidar_1.default
        .watch(assetsPathsRibaShopifyTda, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true,
    })
        .on("all", (event, path) => {
        messages_1.default.logFileEvent(event, path);
        eventCache.addEvent(event, path);
        (0, utilities_1.processCache)(eventCache, processAssetsRibaShopifyTda, removeAssets);
    });
});
//# sourceMappingURL=build-assets.js.map