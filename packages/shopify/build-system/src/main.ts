import gulp from "gulp";
import "./output";
import "./build";
require("./watchers");

/**
 * Does a full (re)build followed by a full deploy, cleaning existing files on
 * the remote server and replacing them with the full set of files pushed to
 * `dist` in the build
 *
 * @summary Deploy your built files to the Shopify Store set in
 *   `slate-cli.config`
 * @function deploy:manual
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("deploy", gulp.series("validate:id", "build", "deploy:replace"));

/**
 * Creates a zip of your theme and opens the store from `config.yml` to manually
 * install a theme from the zip
 *
 * @function deploy:themes-store
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("deploy:manual", gulp.series("zip", "open:admin", "open:zip"));

gulp.task("lint", gulp.series("lint:ts", "lint:js", "lint:locales"));

/**
 * Runs translation tests on each file using @shopify/theme-lint
 *
 * @function test
 * @memberof slate-cli.tasks
 * @static
 */
gulp.task("test", gulp.series("lint:locales"));

/**
 * Simple wrapper around src & dist watchers
 *
 * @summary Monitor your codebase for file changes and take the appropriate
 *   action
 * @function watch
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task(
  "watch",
  gulp.series(
    "validate:id",
    "build:config",
    gulp.parallel("watch:src", "watch:dist")
    // "watch:dist-config"
  )
);

/**
 * Default function.  Starts watchers & (optionally) syncs browsers for
 * live-reload type development testing {@link slate-cli}
 *
 * @summary gulp | gulp --sync
 * @function default
 * @memberof slate-cli.tasks
 * @static
 */
gulp.task("default", gulp.series("deploy", "watch"));
