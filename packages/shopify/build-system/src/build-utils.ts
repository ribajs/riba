/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-js
 */

import gulp from "gulp";
import del from "del";
import zip from "gulp-zip";
import size from "gulp-size";
import plumber from "gulp-plumber";

import { config } from "./includes/config";
import { errorHandler } from "./includes/utilities";

/**
 * Clean up build dirs/files whenever doing a full/clean (re)build.
 *
 * @function build:clean
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task("clean", async () => {
  return del(["upload", "dist"]);
});

/**
 * Compress theme and build a shopify-compatible `.zip` file for uploading to store
 *
 * @function compress
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("compress", () => {
  const distFiles = `${config.dist.root}**/*`;
  const ignoreConfig = `!${config.dist.root}config.yml`;

  return gulp
    .src([distFiles, ignoreConfig])
    .pipe(plumber(errorHandler))
    .pipe(
      zip(
        `${config.packageJson.name}_${config.packageJson.version}.zip` ||
          "theme.zip"
      )
    )
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(gulp.dest("./upload/"));
});
