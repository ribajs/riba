"use strict";
/**
 * Utility and reusable functions used by our Gulp Tasks
 *
 * @summary a set of utility functions used within the gulp tasks of slate-cli
 * @note Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/utilities.js
 */
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
exports.processCache = exports.createEventCache = exports.processSvg = exports.promiseSeries = exports.errorHandler = exports.outputErrors = exports.asyncSleep = exports.asnycTimeout = exports.isNumber = void 0;
const gulp_util_1 = __importDefault(require("gulp-util"));
const lodash_1 = __importDefault(require("lodash"));
const bluebird_1 = __importDefault(require("bluebird")); // TODO remove this dep
let errors = [];
/**
 * Check whether variable is number or a string with numbers in JavaScript
 * @see https://stackoverflow.com/a/1421988/1465919
 */
const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
};
exports.isNumber = isNumber;
// https://stackoverflow.com/a/33292942/1465919
const asnycTimeout = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(resolve, ms));
});
exports.asnycTimeout = asnycTimeout;
// https://stackoverflow.com/a/33292942/1465919
const asyncSleep = (fn, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.asnycTimeout(3000);
    return fn(...args);
});
exports.asyncSleep = asyncSleep;
/**
 * Handles the output for any errors that might have been captured
 * during the build and zip Gulp tasks.
 */
const outputErrors = () => {
    if (!errors.length) {
        return;
    }
    gulp_util_1.default.log(gulp_util_1.default.colors.red(`There were errors during the build:\n`));
    errors.forEach((err) => {
        gulp_util_1.default.log(gulp_util_1.default.colors.red(err));
    });
    errors = [];
};
exports.outputErrors = outputErrors;
/**
 * Generic error handler for streams called in `watch` tasks (used by gulp-plumber).
 * Any error that is thrown inside of a task is added to the errors array.
 *
 * @param err
 */
const errorHandler = (err) => {
    gulp_util_1.default.log(gulp_util_1.default.colors.red(err));
    errors.push(err);
    // this.emit('end');
    process.exit(0);
};
exports.errorHandler = errorHandler;
/**
 * Executes an array of promises in series
 *
 * @param promiseArrayFactory An array of promise factories
 * @returns promise.all() style array of results from each promise
 */
const promiseSeries = (promiseArrayFactory) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    return bluebird_1.default.each(promiseArrayFactory, (factory) => {
        const result = factory();
        results.push(result);
        return result;
    })
        .thenReturn(results)
        .all();
});
exports.promiseSeries = promiseSeries;
/**
 * Function passed to cheerio.run - adds aria tags & other accessibility
 * based information to each svg element's markup...
 *
 * @param $ jQuery reference
 * @param file Reference to current icon file?
 */
const processSvg = ($, file) => {
    const $svg = $("svg");
    const $newSvg = $('<svg aria-hidden="true" focusable="false" role="presentation" class="icon" />');
    const fileName = file.relative.replace(".svg", "");
    const viewBoxAttr = $svg.attr("viewbox");
    const fillAttr = $svg.attr("fill");
    // Add necessary attributes
    if (viewBoxAttr) {
        const width = parseInt(viewBoxAttr.split(" ")[2], 10);
        const height = parseInt(viewBoxAttr.split(" ")[3], 10);
        const widthToHeightRatio = width / height;
        if (widthToHeightRatio >= 1.5) {
            $newSvg.addClass("icon--wide");
        }
        $newSvg.attr("viewBox", viewBoxAttr);
    }
    if (fillAttr) {
        $newSvg.attr("fill", fillAttr);
    }
    // Add required classes to full color icons
    if (file.relative.indexOf("-full-color") >= 0) {
        $newSvg.addClass("icon--full-color");
    }
    $newSvg.addClass(fileName).append($svg.contents());
    $newSvg.append($svg.contents());
    $svg.after($newSvg);
    $svg.remove();
};
exports.processSvg = processSvg;
/**
 * Factory for creating an event cache - used with a short debounce to batch any
 * file changes that occur in rapid succession during Watch tasks.
 *
 * @param options
 * @returns See type definition for more robust documentation
 */
const createEventCache = (options = {}) => {
    lodash_1.default.defaults((options = options || {}), {
        // eslint-disable-line no-param-reassign
        changeEvents: ["add", "change"],
        unlinkEvents: ["unlink"],
    });
    /**
     * A cache object used for caching `[chokidar]{@link https://github.com/paulmillr/chokidar}`
     * events - used with a short `debounce` to batch any file changes that occur in rapid
     * succession during Watch tasks.
     *
     * @prop change - an array for caching `add` and `change` events
     * @prop unlink - an array for caching `unlink` events
     * @prop addEvent - a function to push events to the appropriate `cache` array
     */
    return {
        change: [],
        unlink: [],
        /**
         * Pushes events to upload & remove caches for later batch deployment
         *
         * @param event Chokidar event type - only cares about `(add|change|unlink)`
         * @param path Relative path to file passed via event
         */
        addEvent: function (event, path) {
            lodash_1.default.each(options.changeEvents, (eventType) => {
                if (event === eventType) {
                    this.change.push(path);
                }
            });
            lodash_1.default.each(options.unlinkEvents, (eventType) => {
                if (event === eventType) {
                    this.unlink.push(path);
                }
            });
        },
    };
};
exports.createEventCache = createEventCache;
/**
 * Debounced (320ms) delegator function passing an {@link eventCache} object
 * through to a pair of custom functions for processing batch add/change or unlink events.
 * Clears the appropriate cache array after a change/delete function has been
 * called.
 *
 * Example:
 * ```javascript
 *   // TODO:
 * ```
 *
 * @param cache A specific cache object for tracking file events
 * @param changeFn A custom function to process the set of files that have changed
 * @param delFn A custom function to remove the set of files that have changed from the `dist` directory
 */
exports.processCache = lodash_1.default.debounce((cache, changeFn, delFn) => {
    if (cache.change.length) {
        changeFn(cache.change);
        cache.change = [];
    }
    if (cache.unlink.length) {
        delFn(cache.unlink);
        cache.unlink = [];
    }
}, 320);
//# sourceMappingURL=utilities.js.map