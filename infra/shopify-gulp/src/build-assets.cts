/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-assets.cjs
 */
import gulp from "gulp";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import chokidar from "chokidar";
import { vinylPaths } from "./dependencies/vinyl-paths.cjs";
import del from "del";
import size from "gulp-size";
import print from "gulp-print";

import { config } from "./includes/config.cjs";
import {
  errorHandler,
  createEventCache,
  processCache
} from "./includes/utilities.cjs";
import messages from "./includes/messages.cjs";

const assetsPaths = [
  config.src.assets,
  config.src.templates,
  config.src.sections,
  config.src.snippets,
  config.src.locales,
  config.src.config,
  config.src.layout
];

const assetsPathsRibaShopify = [
  config.ribaShopify.src.assets,
  config.ribaShopify.src.templates,
  config.ribaShopify.src.sections,
  config.ribaShopify.src.snippets,
  config.ribaShopify.src.locales,
  config.ribaShopify.src.config,
  config.ribaShopify.src.layout
];

const assetsPathsRibaShopifyTda: string[] = [];

if (config.ribaShopifyTda?.root) {
  assetsPathsRibaShopifyTda.push(
    config.ribaShopifyTda.src.assets,
    config.ribaShopifyTda.src.templates,
    config.ribaShopifyTda.src.sections,
    config.ribaShopifyTda.src.snippets,
    config.ribaShopifyTda.src.locales,
    config.ribaShopifyTda.src.config,
    config.ribaShopifyTda.src.layout
  );
}

/**
 * Copies assets to the `/dist` directory
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
const processAssetsTheme = (files: string[]) => {
  messages.logProcessFiles("build:assets");
  return gulp
    .src(files, { base: config.src.root, nodir: true })
    .pipe(plumber(errorHandler))
    .pipe(
      size({
        showFiles: true,
        pretty: true
      })
    )
    .pipe(gulp.dest(config.dist.root));
};

const processAssetsRibaShopify = (files: string[]) => {
  messages.logProcessFiles("build:assets:riba-shopify");
  return gulp
    .src(files, { base: config.ribaShopify.src.root })
    .pipe(plumber(errorHandler))
    .pipe(
      size({
        showFiles: true,
        pretty: true
      })
    )
    .pipe(gulp.dest(config.dist.root));
};

const processAssetsRibaShopifyTda = (files: string[]) => {
  messages.logProcessFiles("build:assets:riba-shopify-tda");
  return gulp
    .src(files, { base: config.ribaShopifyTda.src.root })
    .pipe(plumber(errorHandler))
    .pipe(
      size({
        showFiles: true,
        pretty: true
      })
    )
    .pipe(gulp.dest(config.dist.root));
};

/**
 * Deletes specified files
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
async function removeAssets(files: string[]) {
  messages.logProcessFiles("remove:assets");

  const mapFiles = files.map((file) => {
    const distFile = file
      .replace(config.src.root, config.dist.root)
      .replace(config.ribaShopify.src.root, config.dist.root);
    return distFile;
  });

  return gulp
    .src(mapFiles)
    .pipe(plumber(errorHandler))
    .pipe(await vinylPaths(del))
    .pipe(
      size({
        showFiles: true,
        pretty: true
      })
    );
}

/**
 * Copies assets to the `/dist` directory
 *
 * @function build:assets
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task("build:assets", () => {
  return processAssetsTheme(assetsPaths);
});

gulp.task("build:assets:favicons", () => {
  return gulp
    .src(config.src.favicons)
    .pipe(
      rename((path) => {
        path.basename = "favicons_" + path.basename;
      })
    )
    .pipe(print() as any) // TODO
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task("build:assets:riba-shopify", () => {
  return processAssetsRibaShopify(assetsPathsRibaShopify);
});

gulp.task("build:assets:riba-shopify-tda", () => {
  return processAssetsRibaShopifyTda(assetsPathsRibaShopifyTda);
});

/**
 * Watches assets in the `/src` directory
 *
 * @function watch:assets
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:assets", () => {
  const eventCache = createEventCache();

  return chokidar
    .watch(assetsPaths, {
      ignored: /(^|[/\\])\../,
      ignoreInitial: true
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      eventCache.addEvent(event, path);
      processCache(eventCache, processAssetsTheme, removeAssets);
    });
});

gulp.task("watch:assets:riba-shopify", () => {
  const eventCache = createEventCache();

  return chokidar
    .watch(assetsPathsRibaShopify, {
      ignored: /(^|[/\\])\../,
      ignoreInitial: true
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      eventCache.addEvent(event, path);
      processCache(eventCache, processAssetsRibaShopify, removeAssets);
    });
});

gulp.task("watch:assets:riba-shopify-tda", () => {
  const eventCache = createEventCache();

  return chokidar
    .watch(assetsPathsRibaShopifyTda, {
      ignored: /(^|[/\\])\../,
      ignoreInitial: true
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      eventCache.addEvent(event, path);
      processCache(eventCache, processAssetsRibaShopifyTda, removeAssets);
    });
});
