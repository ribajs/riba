"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
require("./output.cjs");
require("./build.cjs");
require("./watchers.cjs");
require("./lint-locales.cjs");
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
gulp_1.default.task("deploy", gulp_1.default.series("validate:id", "build", "deploy:replace"));
/**
 * Creates a zip of your theme and opens the store from `config.yml` to manually
 * install a theme from the zip
 *
 * @function deploy:themes-store
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("deploy:manual", gulp_1.default.series("zip", "open:admin", "open:zip"));
gulp_1.default.task("lint", 
/*gulp.series("lint:locales")*/ (done) => {
    done();
}); // TODO
/**
 * Runs translation tests on each file using @shopify/theme-lint
 *
 * @function test
 * @memberof slate-cli.tasks
 * @static
 */
gulp_1.default.task("test", 
/*gulp.series("lint:locales")*/ (done) => {
    done();
}); // TODO
/**
 * Simple wrapper around src & dist watchers
 *
 * @summary Monitor your codebase for file changes and take the appropriate
 *   action
 * @function watch
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch", gulp_1.default.series("validate:id", "build:config", gulp_1.default.parallel("watch:src", "watch:dist")));
/**
 * Default function.  Starts watchers & (optionally) syncs browsers for
 * live-reload type development testing {@link slate-cli}
 *
 * @summary gulp | gulp --sync
 * @function default
 * @memberof slate-cli.tasks
 * @static
 */
gulp_1.default.task("default", gulp_1.default.series("deploy", "watch"));
//# sourceMappingURL=index.cjs.map