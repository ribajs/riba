/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-config.js
 */
import gulp from "gulp";
import plumber from "gulp-plumber";
import chokidar from "chokidar";
import size from "gulp-size";
import rename from "gulp-rename";

import { config } from "./includes/config.cjs";
import { errorHandler } from "./includes/utilities.cjs";
import messages from "./includes/messages.cjs";

const processConfig = (file: string) => {
  messages.logProcessFiles("build:config");

  return gulp
    .src(file, { allowEmpty: true })
    .pipe(plumber(errorHandler))
    .pipe(
      size({
        showFiles: true,
        pretty: true,
      })
    )
    .pipe(rename("config.yml"))
    .pipe(gulp.dest(config.dist.root));
};

/**
 * ThemeKit requires the config file to be in the `root` directory for files it
 * will be uploading to our store.  As such we need to move this file to `./dist`
 * before running any deployment tasks.
 *
 * @function build:config
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task("build:config", () => {
  return processConfig(config.tkConfig);
});

/**
 * Watch the config file in our `src/` folder and move it to `dist/`
 * Watches the config file in our dist folder and throw an error to stop all tasks
 * or watchers when it changes.  Otherwise Themekit will quietly start uploading
 * files to the new shops defined in `dist/config.yml` with no warning to the user
 *
 * @function watch:config
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:config", () => {
  return chokidar
    .watch(config.tkConfig, { ignoreInitial: true })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      processConfig(path);
    });
});

/**
 * Watch the config file in our dist folder and throw an error to stop all tasks
 * or watchers when it changes.  Otherwise Themekit will quietly start uploading
 * files to the new shops defined in `dist/config.yml` with no warning to the user
 *
 * @function watch:dist-config
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:dist-config", () => {
  return chokidar
    .watch(config.dist.root + config.tkConfig, { ignoreInitial: true })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);

      throw new Error(messages.configChange());
    });
});
