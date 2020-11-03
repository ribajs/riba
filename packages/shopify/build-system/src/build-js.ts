/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-js.js
 */
import gulp from "gulp";
import plumber from "gulp-plumber";
import chokidar from "chokidar";
import terser from "gulp-terser";
import sourcemaps from "gulp-sourcemaps";
import include from "gulp-include";
import gutil from "gulp-util";

import { config } from "./includes/config";
import utils from "./includes/utilities";
import messages from "./includes/messages";

/**
 * By default slate do not minify the theme.js but we did
 * For production without sourcemaps on dev with sourcemaps
 */
function processThemeJs() {
  if (gutil.env.environments !== "development") {
    return gulp
      .src(
        [
          config.roots.js,
          config.sharedCode.roots.js,
          `!${config.roots.vendorJs}`,
          `!${config.sharedCode.roots.vendorJs}`,
        ],
        { allowEmpty: true }
      )
      .pipe(plumber(utils.errorHandler))
      .pipe(
        include({
          includePaths: [config.roots.jsPath, config.sharedCode.roots.jsPath],
        })
      )
      .pipe(terser())
      .pipe(gulp.dest(config.dist.assets));
  } else {
    return gulp
      .src(
        [
          config.roots.js,
          config.sharedCode.roots.js,
          `!${config.roots.vendorJs}`,
          `!${config.sharedCode.roots.vendorJs}`,
        ],
        { allowEmpty: true }
      )
      .pipe(plumber(utils.errorHandler))
      .pipe(sourcemaps.init())
      .pipe(
        include({
          includePaths: [config.roots.jsPath, config.sharedCode.roots.jsPath],
        })
      )
      .pipe(terser())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dist.assets));
  }
}

function processVendorJs() {
  messages.logProcessFiles("build:vendor-js");
  if (gutil.env.environments !== "development") {
    return gulp
      .src([config.roots.vendorJs, config.sharedCode.roots.vendorJs], {
        allowEmpty: true,
      })
      .pipe(plumber(utils.errorHandler))
      .pipe(include())
      .pipe(terser())
      .pipe(gulp.dest(config.dist.assets));
  } else {
    return gulp
      .src([config.roots.vendorJs, config.sharedCode.roots.vendorJs], {
        allowEmpty: true,
      })
      .pipe(plumber(utils.errorHandler))
      .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(terser())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dist.assets));
  }
}

gulp.task("build:js", () => {
  return processThemeJs();
});

gulp.task("watch:js", () => {
  return chokidar
    .watch(
      [
        config.src.js,
        config.sharedCode.src.js,
        `!${config.roots.vendorJs}`,
        `!${config.src.vendorJs}`,
      ],
      { ignoreInitial: true /*, allowEmpty: true */ }
    )
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      processThemeJs();
    });
});

gulp.task("build:vendor-js", () => {
  return processVendorJs();
});

gulp.task("watch:vendor-js", () => {
  return chokidar
    .watch(
      [
        config.roots.vendorJs,
        config.sharedCode.roots.vendorJs,
        config.src.vendorJs,
        config.sharedCode.src.vendorJs,
      ],
      { ignoreInitial: true /*, allowEmpty: true*/ }
    )
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      processVendorJs();
    });
});
