import gulp from "gulp";
import plumber from "gulp-plumber";
import chokidar from "chokidar";
import path from "path";
import cssimport from "gulp-cssimport";
import extReplace from "gulp-ext-replace";

import { config } from "./includes/config";
import utils from "./includes/utilities";
import messages from "./includes/messages";

/**
 * Concatenate css via gulp-cssimport and copys to the `/dist` folder
 *
 * @param {Array} files
 * @returns {Stream}
 * @private
 */
const processCss = () => {
  messages.logProcessFiles("build:css");

  return (
    gulp
      .src([config.roots.css, config.sharedCode.roots.css])
      .pipe(plumber(utils.errorHandler))
      .pipe(
        cssimport({
          includePaths: [
            path.resolve(__dirname, "../../src/ts"),
            path.resolve(
              config.sharedCode.root,
              config.sharedCode.roots.cssPath
            ),
          ],
        })
      )
      .pipe(extReplace(".css.liquid", ".css"))
      .pipe(extReplace(".scss.liquid", ".scss"))
      // .pipe(
      //   cleanCSS({
      //     level: {
      //       1: {
      //         all: false,
      //       },
      //     },
      //   })
      // )
      .pipe(gulp.dest(config.dist.assets))
  );
};

/**
 * Concatenate css via gulp-cssimport
 *
 * @function build:css
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task("build:css", () => {
  return processCss();
});

/**
 * Watches css in the `/src` directory
 *
 * @function watch:css
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:css", () => {
  return chokidar
    .watch([config.src.css, config.sharedCode.src.css], {
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      messages.logFileEvent(event, path);
      processCss();
    });
});
