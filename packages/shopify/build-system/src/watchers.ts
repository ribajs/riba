/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/watchers.js
 */
import gulp from "gulp";
import _ from "lodash";
import gutil from "gulp-util";
import chokidar from "chokidar";
import fs from "fs";
import themekit from "@shopify/themekit";

import { config } from "./includes/config";
import { createEventCache } from "./includes/utilities.js";
import messages from "./includes/messages.js";

const cache = createEventCache();
const environment = config.environment.split(/\s*,\s*|\s+/)[0];

let activeDeploy = false;

let deploy: (cmd: string, files: string[], env: any) => Promise<any> = null;

/**
 * If no deploy is active, call {@link deploy} passing files stored in
 *
 * @private
 */
function checkDeployStatus() {
  if (activeDeploy) {
    return;
  }

  if (cache.change.length) {
    deploy("deploy", cache.change, environment);
    cache.change = [];
  } else if (cache.unlink.length) {
    deploy("remove", cache.unlink, environment);
    cache.unlink = [];
  }
}

// prevent early execution on multi-file events
const debouncedDeployStatus = _.debounce(checkDeployStatus, 320);

/**
 * Executes a deployment (wrapped in a promise).  When the initial deploy
 * resolves, executes a call to {@link deployStatus}, recursively iterating
 * through subsequent cached files and deploying until no changes remain.
 *
 * @param {String|Array} cmd - the ThemeKit command to run (upload|remove)
 * @param {Array} files - an array of files to upload or remove @ the remote
 *   server
 * @private
 */
deploy = function async(cmd, files, env) {
  messages.logChildProcess(cmd);
  activeDeploy = true;
  gutil.log(`themekit cwd to: ${config.dist.root}`);
  return themekit
    .command(
      cmd,
      {
        "allow-live": true,
        env: env,
        files: files,
      },
      { cwd: config.dist.root }
    )
    .then(() => {
      activeDeploy = false;
      fs.appendFileSync(config.deployLog, messages.logDeploys(cmd, files)); // eslint-disable-line no-sync
      return checkDeployStatus();
    })
    .catch((err: Error) => {
      activeDeploy = false;
      messages.logTransferFailed(err);
      fs.appendFileSync(
        config.deployLog,
        messages.logDeployErrors(cmd, files, err)
      ); // eslint-disable-line no-sync
      return checkDeployStatus();
    });
};

/**
 * Aggregate task watching for file changes in `src` and
 * building/cleaning/updating `dist` accordingly.  *Made up of individual tasks
 * referenced in other files
 *
 * @function watch:src
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task(
  "watch:src",
  gulp.parallel(
    "watch:assets",
    "watch:assets:riba-shopify",
    "watch:assets:riba-shopify-tda",
    "watch:config",
    "watch:svg",
    "watch:wp"
  )
);

/**
 * Watches for changes in the `./dist` folder and passes event data to the
 * `cache` via {@link pushToCache}. A debounced {@link deployStatus} is also
 * called to pass files updated to the remote server through {@link deploy}
 * when any active deploy completes.
 *
 * @function watch:dist
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task("watch:dist", async () => {
  const watcher = chokidar.watch(["./"], {
    cwd: config.dist.root,
    ignored: [/(^|[/\\])\../, "config.yml"], // ignore dotfiles
    ignoreInitial: true,
  });

  return watcher.on("all", (event, path) => {
    messages.logFileEvent(event, path);
    cache.addEvent(event, path);
    messages.deployTo(environment);
    debouncedDeployStatus();
  });
});
