/**
 * Utility and reusable functions used by our Gulp Tasks
 *
 * @summary a set of utility functions used within the gulp tasks of slate-cli
 * @note Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/utilities.js
 */

import gutil from "gulp-util";
import _ from "lodash";
import Bluebird from "bluebird"; // TODO: Replace with a native solution, e.g. https://github.com/VeryCrazyDog/native-promise-util
import { existsSync, lstatSync } from "fs";
import { resolve } from "path";

let errors: string[] = [];

/**
 * Check whether variable is number or a string with numbers in JavaScript
 * @see https://stackoverflow.com/a/1421988/1465919
 */
export const isNumber = (value?: any): boolean => {
  return !isNaN(parseFloat(value)) && !isNaN(value - 0);
};

// https://stackoverflow.com/a/33292942/1465919
export const asnycTimeout = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// https://stackoverflow.com/a/33292942/1465919
export const asyncSleep = async (fn: any, ...args: any[]) => {
  await asnycTimeout(3000);
  return fn(...args);
};

/**
 * Handles the output for any errors that might have been captured
 * during the build and zip Gulp tasks.
 */
export const outputErrors = () => {
  if (!errors.length) {
    return;
  }

  gutil.log(gutil.colors.red(`There were errors during the build:\n`));

  errors.forEach((err) => {
    gutil.log(gutil.colors.red(err));
  });

  errors = [];
};

/**
 * Generic error handler for streams called in `watch` tasks (used by gulp-plumber).
 * Any error that is thrown inside of a task is added to the errors array.
 *
 * @param err
 */
export const errorHandler = (err: string) => {
  gutil.log(gutil.colors.red(err));
  errors.push(err);

  // this.emit('end');
  process.exit(0);
};

/**
 * Executes an array of promises in series
 *
 * @param promiseArrayFactory An array of promise factories
 * @returns promise.all() style array of results from each promise
 */
export const promiseSeries = async (
  promiseArrayFactory: Array<() => Promise<any>>
) => {
  const results: Promise<any>[] = [];

  return Bluebird.each(promiseArrayFactory, (factory) => {
    const result = factory();
    results.push(result);
    return result;
  })
    .thenReturn(results)
    .all();
};

/**
 * Function passed to cheerio.run - adds aria tags & other accessibility
 * based information to each svg element's markup...
 *
 * @param $ jQuery reference
 * @param file Reference to current icon file?
 */
export const processSvg = ($: any, file: any) => {
  const $svg = $("svg");
  const $newSvg = $(
    '<svg aria-hidden="true" focusable="false" role="presentation" class="icon" />'
  );
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

/**
 * Factory for creating an event cache - used with a short debounce to batch any
 * file changes that occur in rapid succession during Watch tasks.
 *
 * @param options
 * @returns See type definition for more robust documentation
 */
export const createEventCache = (options: any = {}) => {
  _.defaults((options = options || {}), {
    // eslint-disable-line no-param-reassign
    changeEvents: ["add", "change"],
    unlinkEvents: ["unlink"]
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
    change: [] as Array<any>,
    unlink: [] as Array<any>,

    /**
     * Pushes events to upload & remove caches for later batch deployment
     *
     * @param event Chokidar event type - only cares about `(add|change|unlink)`
     * @param path Relative path to file passed via event
     */
    addEvent: function (event: string, path: string) {
      _.each(options.changeEvents, (eventType: string) => {
        if (event === eventType) {
          this.change.push(path);
        }
      });

      _.each(options.unlinkEvents, (eventType: string) => {
        if (event === eventType) {
          this.unlink.push(path);
        }
      });
    }
  };
};

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
export const processCache = _.debounce(
  (
    cache: any,
    changeFn: (change: any) => void,
    delFn: (unlink: any) => void
  ) => {
    if (cache.change.length) {
      changeFn(cache.change);
      cache.change = [];
    }

    if (cache.unlink.length) {
      delFn(cache.unlink);
      cache.unlink = [];
    }
  },
  320
);

export const findFile = (rootDir: string, searchForFiles: string[]) => {
  let result = null;
  for (let searchPath of searchForFiles) {
    searchPath = resolve(rootDir, searchPath);
    if (!result && existsSync(searchPath) && lstatSync(searchPath).isFile()) {
      result = searchPath;
    }
  }
  return result;
};
