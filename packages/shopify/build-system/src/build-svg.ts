/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-svg.js
 */
import gulp from "gulp";
import plumber from "gulp-plumber";
import chokidar from "chokidar";
import size from "gulp-size";
import vinylPaths from "vinyl-paths";
import del from "del";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import extReplace from "gulp-ext-replace";
import gutil from "gulp-util";

import { config } from "./includes/config";
import {
  errorHandler,
  createEventCache,
  processCache,
} from "./includes/utilities";
import messages from "./includes/messages";

/**
 * Processing for SVGs prior to deployment - adds accessibility markup, and converts
 * the file to a liquid snippet.
 *
 * @param {String|Array} files - glob/array of files to match & send to the stream
 * @returns {Stream}
 * @private
 */
function processIcons(files: string[]) {
  messages.logProcessFiles("build:svg");
  return gulp
    .src(files)
    .pipe(plumber(errorHandler))
    .pipe(svgmin(config.plugins.svgmin))
    .pipe(cheerio(config.plugins.cheerio))
    .pipe(extReplace(".liquid"))
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    )
    .pipe(gulp.dest(config.dist.snippets));
}

/**
 * Cleanup/remove liquid snippets from the `dist` directory during watch tasks if
 * any underlying SVG files in the `src` folder have been removed.
 *
 * @param {String|Array} files - glob/array of files to match & send to the stream
 * @returns {Stream}
 * @private
 */
function removeIcons(files: string[]) {
  messages.logProcessFiles("remove:svg");
  const mapFiles = files.map((file) => {
    gutil.log("remove icon: " + file);
    const distFile = file
      .replace("src/icons", "dist/snippets")
      .replace(config.sharedCode.root, config.dist.root);
    const snippetFile = distFile.replace(".svg", ".liquid");
    return snippetFile;
  });

  return gulp
    .src(mapFiles)
    .pipe(plumber(errorHandler))
    .pipe(vinylPaths(del))
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    );
}

/**
 * Pre-processing for svg icons
 *
 * @function build:svg
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task("build:svg", () => {
  return processIcons([config.src.icons, config.sharedCode.src.icons]);
});

/**
 * Watches source svg icons for changes...
 *
 * @function watch:svg
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:svg", () => {
  const cache = createEventCache();

  return chokidar
    .watch([config.src.icons, config.sharedCode.src.icons], {
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      cache.addEvent(event, path);
      processCache(cache, processIcons, removeIcons);
    });
});
