import gulp from "gulp";
import gutil from "gulp-util";
import { compressForStore } from "./includes/release.cjs";
import { promptInput, promptYesNo } from "./includes/prompts.cjs";
import { createStoreTheme, getOldestEnvTheme } from "./includes/theme.cjs";
import messages from "./includes/messages.cjs";
import { Models } from "shopify-admin-api";

import {
  generateEnvLiveThemeConfig,
  generateEnvYoungestThemeConfig,
  getStoreThemes,
  print as printTheme,
  remove as deleteTheme
} from "./includes/theme.cjs";
import { uploadFile, getDownloadFileUrl } from "./includes/upload.cjs";
import { getAsset, getShop } from "./includes/shopify-api.cjs";
import { promises as fs } from "fs";
import yaml from "js-yaml";
import path from "path";
import {
  config,
  getYamlConfig,
  getReleaseZipFilename,
  getReleaseName
} from "./includes/config.cjs";
import { ThemeConfigByEnv } from "./types/index.cjs";
import "./theme.cjs"; // import theme tasks
import "./build.cjs"; // import build tasks

gulp.task("generate:config:live", async () => {
  const baseConfig = config.deployConfig;
  const targetConfig = config.liveConfig;
  gutil.log(`Load ${baseConfig} as base config file for store and password...`);
  const liveConfigs = await generateEnvLiveThemeConfig(baseConfig);
  const configPath = path.resolve(config.themeRoot, targetConfig);
  const yamlConfig = yaml.dump(liveConfigs);
  gutil.log(`Write "${targetConfig}" to ${configPath}...`);
  return fs.writeFile(configPath, yamlConfig);
});

gulp.task("generate:config:deploy", async () => {
  const baseConfig = config.deployConfig;
  const targetConfig = config.deployConfig;
  gutil.log(`Load ${baseConfig} as base config file for store and password...`);
  const liveConfigs = await generateEnvYoungestThemeConfig(baseConfig);
  const configPath = path.resolve(config.themeRoot, targetConfig);
  const yamlConfig = yaml.dump(liveConfigs);
  gutil.log(`Overwrite "${targetConfig}" to ${configPath}...`);
  return fs.writeFile(configPath, yamlConfig);
});

gulp.task("backup:locale", async () => {
  gutil.log(`Load ${config.liveConfig}...`);
  // copy
  const liveConfigs: ThemeConfigByEnv = Object.assign(
    {},
    getYamlConfig(config.liveConfig) as ThemeConfigByEnv
  );
  await fs.mkdir(config.backup, { recursive: true });
  gutil.log(`Get primary locale file of each environment...`);
  for (const envKey in liveConfigs) {
    if (liveConfigs[envKey]) {
      const themeConfig = liveConfigs[envKey];
      const shopData = await getShop(themeConfig);
      const locale = shopData.primary_locale;
      gutil.log(`[${envKey}] locale: ${locale}`);
      let localeData: any = {};
      let localeFilename = `${locale}.json`;
      try {
        localeData = await getAsset(themeConfig, `locales/${localeFilename}`);
      } catch (error) {
        try {
          localeFilename = `${locale}.default.json`;
          localeData = await getAsset(themeConfig, `locales/${localeFilename}`);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      const writePath = path.resolve(
        config.backup,
        `${envKey}_${localeFilename}`
      );
      await fs.writeFile(writePath, localeData.value);
    }
  }
});

gulp.task("backup:settings_data", async () => {
  gutil.log(`Load ${config.liveConfig}...`);
  // copy
  const liveConfigs: ThemeConfigByEnv = Object.assign(
    {},
    getYamlConfig(config.liveConfig) as ThemeConfigByEnv
  );
  await fs.mkdir(config.backup, { recursive: true });
  gutil.log(`Get "config/settings_data.json" of each environment...`);
  for (const envKey in liveConfigs) {
    if (liveConfigs[envKey]) {
      gutil.log(`[${envKey}] Get config/settings_data.json...`);
      const themeConfig = liveConfigs[envKey];
      const settingsData = await getAsset(
        themeConfig,
        "config/settings_data.json"
      );
      const writePath = path.resolve(
        config.backup,
        `${envKey}_settings_data.json`
      );
      await fs.writeFile(writePath, settingsData.value);
    }
  }
});

gulp.task("build:zips", async () => {
  const baseConfig: ThemeConfigByEnv = getYamlConfig(
    config.deployConfig
  ) as ThemeConfigByEnv;
  for (const envKey in baseConfig) {
    if (baseConfig[envKey]) {
      gutil.log(`[${envKey}] Get config/settings_data.json...`);
      gutil.log(`[${envKey}] Get config/settings_data.json...`);
      const settingsDataPath = path.resolve(
        config.backup,
        `${envKey}_settings_data.json`
      );
      const settingsData = await fs.readFile(settingsDataPath);
      await compressForStore(envKey, settingsData);
    }
  }
});

/**
 * Uploads the zip files to bitbucket downloads
 */
gulp.task("upload:zips", async () => {
  const baseConfig: ThemeConfigByEnv = getYamlConfig(
    config.deployConfig
  ) as ThemeConfigByEnv;
  for (const envKey in baseConfig) {
    if (baseConfig[envKey]) {
      const zipFilePath = path.resolve(
        config.upload,
        getReleaseZipFilename(envKey)
      );
      await uploadFile(zipFilePath);
    }
  }
});

gulp.task("deploy:zips", async () => {
  const createdThemes: Models.Theme[] = []; //
  const deployConfig: ThemeConfigByEnv = getYamlConfig(
    config.deployConfig
  ) as ThemeConfigByEnv;
  const themeName = (global as any).themeName || getReleaseName();
  for (const envKey in deployConfig) {
    const filename = getReleaseZipFilename(envKey);
    const src = await getDownloadFileUrl(filename);

    if (!src) {
      gutil.log(gutil.colors.yellow(`Skip deploy zip`));
      return null;
    }

    const zipFilename = path.basename(src).split("?")[0];
    gutil.log(zipFilename);
    gutil.log(
      `[${envKey}] Deploy "${zipFilename}" as "${themeName}" on "${deployConfig[envKey].store}"...`
    );
    try {
      const createdTheme = await createStoreTheme(
        deployConfig[envKey],
        themeName,
        src as unknown as string
      );
      createdThemes.push(createdTheme);
    } catch (error) {
      console.error(error);
    }
  }
  return createdThemes;
});

/**
 * Delete them oldeset theme if the theme limit of 100 themes are reached
 */
gulp.task("theme:delete-oldest-on-limit", async () => {
  const LIMIT = 100;
  const promises: Promise<any>[] = [];
  const baseConfig: ThemeConfigByEnv = getYamlConfig(
    config.deployConfig
  ) as ThemeConfigByEnv;
  for (const envKey in baseConfig) {
    const themes = await getStoreThemes(baseConfig[envKey]);
    const count = themes.length;
    gutil.log(`[${envKey}] Count of themes: ${count}/${LIMIT}`);
    if (count >= LIMIT) {
      const oldestEnvTheme = await getOldestEnvTheme();
      gutil.log(
        messages.colorize(
          `[${envKey}] Are you sure that you want to delete the following theme unrecoverably? (type "yes" or "no")`,
          "danger"
        )
      );
      printTheme(envKey, oldestEnvTheme[envKey]);

      const remove = await promptYesNo(
        `[${envKey}] You have reached the maximum limit of themes (${LIMIT}) in your shop "${oldestEnvTheme[envKey].store}", do you want to delete the oldest theme "${oldestEnvTheme[envKey].name}"?`,
        "danger"
      );
      if (!remove) {
        return process.exit(0);
      }
      promises.push(deleteTheme(baseConfig[envKey], oldestEnvTheme[envKey].id));
    }
  }

  return Promise.all(promises);
});

gulp.task("theme:name", async () => {
  const name = await promptInput(
    "What do you want to call this release? (Press enter to accept the default name)",
    getReleaseName(),
    "name",
    "success"
  );
  (global as any).themeName = name;
  gutil.log(`Release name: ${(global as any).themeName}`);
  return (global as any).themeName;
});

gulp.task(
  "release:new",
  gulp.series(
    "theme:name",
    "theme:delete-oldest-on-limit",
    "generate:config:live",
    "backup:locale",
    "backup:settings_data",
    "build",
    "build:zips",
    "upload:zips",
    "deploy:zips",
    "themes:list:youngest"
  )
);

gulp.task(
  "release:zip",
  gulp.series("theme:name", "build", "build:zips", "deploy:zips")
);
