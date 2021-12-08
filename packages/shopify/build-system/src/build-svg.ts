/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-svg.js
 */
import gulp from "gulp";
import plumber from "gulp-plumber";
import chokidar from "chokidar";
import size from "gulp-size";
import { vinylPaths } from "./dependencies/vinyl-paths";
import del from "del";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import rename from "gulp-rename";
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
 * @param files - glob/array of files to match & send to the stream
 * @returns
 */
function processSnippetIcons(files: string[]) {
  messages.logProcessFiles("build:svg");
  return gulp
    .src(files, { nodir: true })
    .pipe(plumber(errorHandler))
    .pipe(svgmin(config.plugins.svgmin as unknown)) // TODO
    .pipe(cheerio(config.plugins.cheerio))
    .pipe(
      rename((path) => {
        path.basename = "iconset_" + path.basename;
        path.extname = ".liquid";
      })
    )
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
 * @param files - glob/array of files to match & send to the stream
 */
const removeSnippetIcons = async (files: string[]) => {
  messages.logProcessFiles("remove:svg");
  const mapFiles = files.map((file) => {
    gutil.log("remove icon: " + file);
    const distFile = file
      .replace(config.src.iconset, "dist/snippets")
      .replace(config.ribaShopify.root, config.dist.root);
    // TODO rename basename to iconset_ + basename?
    const snippetFile = distFile.replace(".svg", ".liquid");
    return snippetFile;
  });

  return gulp
    .src(mapFiles)
    .pipe(plumber(errorHandler))
    .pipe(await vinylPaths(del))
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    );
};

/**
 * Processing for SVGs prior to deployment - adds accessibility markup.
 *
 * @param files - glob/array of files to match & send to the stream
 * @returns
 */
function processAssetIcons(files: string[]) {
  messages.logProcessFiles("build:svg");
  return gulp
    .src(files, { nodir: true })
    .pipe(plumber(errorHandler))
    .pipe(svgmin(config.plugins.svgmin as unknown)) // TODO
    .pipe(
      rename((path) => {
        path.basename = "iconset_" + path.basename;
      })
    )
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    )
    .pipe(gulp.dest(config.dist.assets));
}

/**
 * Cleanup/remove svg assets from the `dist` directory during watch tasks if
 * any underlying SVG files in the `src` folder have been removed.
 *
 * @param files - glob/array of files to match & send to the stream
 */
const removeAssetIcons = async (files: string[]) => {
  messages.logProcessFiles("remove:svg");
  const mapFiles = files.map((file) => {
    gutil.log("remove icon: " + file);
    const distFile = file
      .replace(config.src.iconset, "dist/assets")
      .replace(config.ribaShopify.root, config.dist.root);
    // TODO rename basename to iconset_ + basename?
    return distFile;
  });

  return gulp
    .src(mapFiles)
    .pipe(plumber(errorHandler))
    .pipe(await vinylPaths(del))
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    );
};

/**
 * Pre-processing for svg icons as snippets
 */
gulp.task("build:svg:snippet", () => {
  return processSnippetIcons([
    config.src.iconset,
    config.ribaShopify.src.iconset,
  ]);
});

/**
 * Watches source svg icons for changes...
 */
gulp.task("watch:svg:snippet", () => {
  const cache = createEventCache();

  return chokidar
    .watch([config.src.iconset, config.ribaShopify.src.iconset], {
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      cache.addEvent(event, path);
      processCache(cache, processSnippetIcons, removeSnippetIcons);
    });
});

/**
 * Pre-processing for svg icons as assets
 */
gulp.task("build:svg:asset", () => {
  return processAssetIcons([
    config.src.iconset,
    config.ribaShopify.src.iconset,
  ]);
});

/**
 * Watches source svg icons for changes...
 */
gulp.task("watch:svg:asset", () => {
  const cache = createEventCache();

  return chokidar
    .watch([config.src.iconset, config.ribaShopify.src.iconset], {
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      cache.addEvent(event, path);
      processCache(cache, processAssetIcons, removeAssetIcons);
    });
});
