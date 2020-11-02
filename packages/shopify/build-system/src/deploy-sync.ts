/**
 * Custom version of https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/deploy-sync.js
 */
import gulp from "gulp";
import { create as createBrowserSync } from "browser-sync";
import fs from "fs";
import { debug as Debug } from "debug";

import { config, getYamlConfig } from "./includes/config";
import messages from "./includes/messages";

const debug = Debug("slate-tools:deploy");
const browserSync = createBrowserSync();
const devScriptPath = require.resolve("./includes/dev-script.js");

/**
 * Starts a [browserSync]{@link https://www.browsersync.io/} session proxying your
 * store URL when a `--sync` flag is passed to the default `gulp` function.
 *
 * @function deploy:sync-init
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("deploy:sync-init", () => {
  if (browserSync.active) {
    browserSync.exit();
  } else {
    fs.writeFileSync(config.deployLog, ""); // eslint-disable-line no-sync
  }

  const devScript = fs.readFileSync(devScriptPath);
  const tkConfig: any = getYamlConfig(config.tkConfig);
  const queryStringComponents: string[] = [];
  const environment = config.environment.split(/\s*,\s*|\s+/)[0];

  const envObj = tkConfig[environment];
  let proxyTarget = `https://${envObj.store}`;

  // break theme preview cache by always setting a preview parameter
  const previewParam = envObj.theme_id === "live" ? "" : envObj.theme_id;
  proxyTarget += `?preview_theme_id=${previewParam}`;

  debug(proxyTarget);

  /**
   * Shopify sites with redirection enabled for custom domains force redirection
   * to that domain. `?_fd=0` prevents that forwarding.
   */
  queryStringComponents.push("_fd=0");

  browserSync.init({
    proxy: {
      target: proxyTarget,
      middleware: (req, res, next) => {
        const prefix = req.url.indexOf("?") > -1 ? "&" : "?";
        req.url += prefix + queryStringComponents.join("&");
        next();
      },
    },
    snippetOptions: {
      // Provide a custom Regex for inserting the snippet.
      rule: {
        match: /<\/body>/i,
        fn: (snippet, match) => {
          return `<script defer="defer">${devScript}</script>
                  ${snippet}
                  ${match}`;
        },
      },
    },
  });
});

gulp.task("deploy:sync-watch", () => {
  gulp.watch(config.tkConfig, gulp.series("deploy:sync-init"));
  gulp.watch(config.deployLog, () => {
    messages.logTransferDone();
    browserSync.reload();
  });
});

/**
 * Starts a watcher to reload the [browserSync]{@link https://www.browsersync.io/}
 * session whenever a deploy completes.
 *
 * @function deploy:sync-reload
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task(
  "deploy:sync-reload",
  gulp.series("deploy:sync-init", "deploy:sync-watch")
);
