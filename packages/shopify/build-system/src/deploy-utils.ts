/* eslint-disable no-sync,no-process-env */

/**
 * Custom version of https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/deploy-utils.js
 */

import gulp from "gulp";
// import BPromise from "bluebird";
import fs from "fs";
import gutil from "gulp-util";
import open from "open";
// const open = BPromise.promisify(_open);
import * as yaml from "js-yaml";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const themekit = require("@shopify/themekit"); // TODO convert to import

import { config } from "./includes/config";
import utils from "./includes/utilities";
import messages from "./includes/messages";

/**
 * simple promise factory wrapper for deploys
 * @param env - the environment to deploy to
 * @returns {Promise}
 * @private
 */
async function deploy(env: string) {
  gutil.log(`themekit cwd to: ${config.dist.root}`);

  return themekit
    .command(
      "deploy",
      {
        "allow-live": true,
        env: env,
      },
      { cwd: config.dist.root }
    )
    .catch((err: string) => {
      messages.logTransferFailed(err);
    });
}

/**
 * Validate theme_id used for the environment
 * @param {Object} - settings of theme_id and environment
 * @returns {Promise}
 * @private
 */
function validateId(settings: { themeId: any; environment: any }) {
  return new Promise<void>((resolve, reject) => {
    // Only string allowed is "live"
    if (settings.themeId === "live") {
      resolve();
    }

    const id = Number(settings.themeId);

    if (isNaN(id)) {
      reject(settings);
    } else {
      resolve();
    }
  });
}

/**
 * Validate the config.yml theme_id is an integer or "live"
 * @function validate:id
 * @memberof slate-cli.tasks.watch, slate-cli.tasks.deploy
 * @private
 */
gulp.task("validate:id", async () => {
  let file;

  try {
    file = fs.readFileSync(config.tkConfig, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw new Error(err);
    }

    messages.configError();

    return process.exit(2);
  }

  const tkConfig = yaml.safeLoad(file);
  let envObj;

  const environments = config.environment.split(/\s*,\s*|\s+/);
  const promises: (() => Promise<unknown>)[] = [];

  environments.forEach((environment: string) => {
    function factory() {
      envObj = tkConfig[environment];
      const envSettings = {
        themeId: envObj.theme_id,
        environment,
      };

      return validateId(envSettings);
    }
    promises.push(factory);
  });

  return utils.promiseSeries(promises).catch((result) => {
    // stop process to prevent deploy defaulting to published theme
    messages.invalidThemeId(result.themeId, result.environment);
    return process.exit(2);
  });
});

/**
 * Replace your existing theme using ThemeKit.
 *
 * @function deploy:replace
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("deploy:replace", async () => {
  gutil.log(`environments ${config.environment}`);

  const environments = config.environment.split(/\s*,\s*|\s+/);
  const promises: (() => Promise<unknown>)[] = [];

  environments.forEach((environment: string) => {
    function factory() {
      messages.deployTo(environment);
      return deploy(environment);
    }

    promises.push(factory);
  });

  return utils.promiseSeries(promises).then(() => {
    return messages.allDeploysComplete();
  });
});

/**
 * Opens the Store in the default browser (for manual upgrade/deployment)
 *
 * @function open:admin
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("open:admin", async () => {
  const file = fs.readFileSync(config.tkConfig, "utf8");
  const tkConfig = yaml.safeLoad(file);
  let envObj;

  const environments = config.environment.split(/\s*,\s*|\s+/);
  const promises: (() => Promise<unknown>)[] = [];

  environments.forEach((environment: string) => {
    function factory() {
      envObj = tkConfig[environment];
      return open(`https://${envObj.store}/admin/themes`);
    }
    promises.push(factory);
  });

  return utils.promiseSeries(promises);
});

/**
 * Opens the Zip file in the file browser
 *
 * @function open:zip
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task("open:zip", () => {
  return open("upload");
});
