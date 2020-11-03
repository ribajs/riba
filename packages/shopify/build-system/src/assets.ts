import gulp from "gulp";
import gutil from "gulp-util";
import { ThemeConfigByEnv, ExternalScriptsConfigByEnv } from "./types";
import { config, getYamlConfig } from "./includes/config";
import { list, updateOrCreate } from "./includes/assets";
import "./release"; // Imports the generate:config:live task

gulp.task("assets:list:live", async () => {
  const liveConfig = getYamlConfig(config.liveConfig) as ThemeConfigByEnv;
  const externalScriptsConfig = getYamlConfig(
    config.externalScriptsConfig
  ) as ExternalScriptsConfigByEnv;
  for (const envKey in externalScriptsConfig) {
    gutil.log(`[${envKey}] "List assets on "${liveConfig[envKey].store}"...`);
    const liveThemeConfig = liveConfig[envKey];
    const assetList = await list(liveThemeConfig);
    gutil.log(assetList);
  }
});

gulp.task("assets:update:live", async () => {
  const liveConfig = getYamlConfig(config.liveConfig) as ThemeConfigByEnv;
  const externalScriptsConfig = getYamlConfig(
    config.externalScriptsConfig
  ) as ExternalScriptsConfigByEnv;
  for (const envKey in externalScriptsConfig) {
    const liveThemeConfig = liveConfig[envKey];
    const extAssetsConfig = externalScriptsConfig[envKey].assets;
    for (const extAssetConfig of extAssetsConfig) {
      gutil.log(
        `[${envKey}] "Get "${extAssetConfig.key}" from "${liveConfig[envKey].store}"...`
      );
      const extAsset = await updateOrCreate(liveThemeConfig, extAssetConfig);
      gutil.log(extAsset);
    }
  }
});

gulp.task(
  "assets:list",
  gulp.series("generate:config:live", "assets:list:live")
);

gulp.task(
  "assets:update",
  gulp.series("generate:config:live", "assets:update:live")
);
