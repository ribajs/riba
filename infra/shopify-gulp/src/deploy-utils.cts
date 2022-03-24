/* eslint-disable no-sync,no-process-env */

/**
 * Custom version of https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/deploy-js
 */

import gulp from "gulp";
import fs from "fs";
import gutil from "gulp-util";
import open from "open";
import * as yaml from "js-yaml";
import { ThemeConfigByEnv, ThemeConfig } from "./types/index.cjs";
import * as themekit from "@shopify/themekit";

import { config } from "./includes/config.cjs";
import { promiseSeries } from "./includes/utilities.cjs";
import messages from "./includes/messages.cjs";

/**
 * simple promise factory wrapper for deploys
 * @param env The environment to deploy to
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
    .catch((err: Error) => {
      messages.logTransferFailed(err);
    });
}

/**
 * Validate theme_id used for the environment
 * @param settings Settings of theme_id and environment
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

  const tkConfig = yaml.load(file) as ThemeConfigByEnv;
  let envObj: ThemeConfig;

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

  return promiseSeries(promises).catch((result) => {
    // stop process to prevent deploy defaulting to published theme
    messages.invalidThemeId(result.themeId, result.environment);
    return process.exit(2);
  });
});

/**
 * Replace your existing theme using ThemeKit.
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

  return promiseSeries(promises).then(() => {
    return messages.allDeploysComplete();
  });
});

/**
 * Opens the Store in the default browser (for manual upgrade/deployment)
 */
gulp.task("open:admin", async () => {
  const file = fs.readFileSync(config.tkConfig, "utf8");
  const tkConfig = yaml.load(file) as ThemeConfigByEnv;
  let envObj: ThemeConfig;

  const environments = config.environment.split(/\s*,\s*|\s+/);
  const promises: (() => Promise<unknown>)[] = [];

  environments.forEach((environment: string) => {
    function factory() {
      envObj = tkConfig[environment];
      return open(`https://${envObj.store}/admin/themes`);
    }
    promises.push(factory);
  });

  return promiseSeries(promises);
});

/**
 * Opens the Zip file in the file browser
 */
gulp.task("open:zip", () => {
  return open("upload");
});
