/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/lint-locales.js
 */

import gulp from "gulp";
import gutil from "gulp-util";
import { runAll } from "@shopify/theme-lint";

import { config } from "./includes/config.cjs";
import Reporter from "./includes/lint-reporter.cjs";

/**
 * Runs all the translation tests and the reporter outputs
 * the locale results once completed.
 *
 * @returns {String} Finalized linting output
 * @private
 */
async function lintLocales() {
  return runAll(config.src.root, new Reporter())
    .then((reporter: Reporter) => reporter.output())
    .catch((err: string) => {
      gutil.log(err);
      // throw err;
      // process.exit(2);
    });
}

/**
 * Runs translation tests using @shopify/theme-lint
 *
 * @function lint:locales
 * @memberof slate-cli.tasks.lint
 * @static
 */
gulp.task("lint:locales", async () => {
  return lintLocales();
});
