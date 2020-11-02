import gulp from "gulp";
import gutil from "gulp-util";
import { ScriptTags } from "shopify-admin-api";
import { ThemeConfigByEnv, ExternalScriptsConfigByEnv } from "./types";
import { config, getYamlConfig } from "./includes/config";
import { list, updateOrCreate, deleteAll } from "./includes/script-tags";

gulp.task("script-tags:list", async () => {
  const baseConfig = getYamlConfig(config.deployConfig) as ThemeConfigByEnv;
  const externalScriptsConfig = getYamlConfig(
    config.externalScriptsConfig
  ) as ExternalScriptsConfigByEnv;
  for (const envKey in externalScriptsConfig) {
    gutil.log(
      `[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`
    );
    const themeConfig = baseConfig[envKey];
    const scriptTagList = await list(themeConfig);
    gutil.log(scriptTagList);
  }
});

/**
 * Reads the script tag sources from script-tags.yml and update or create them in the store
 */
gulp.task("script-tags:update", async () => {
  const baseConfig = getYamlConfig(config.deployConfig) as ThemeConfigByEnv;
  const externalScriptsConfigs = getYamlConfig(
    config.externalScriptsConfig
  ) as ExternalScriptsConfigByEnv;
  for (const envKey in externalScriptsConfigs) {
    gutil.log(
      `[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`
    );
    const themeConfig = baseConfig[envKey];
    const externalScriptsConfig = externalScriptsConfigs[envKey];
    const scriptTags = new ScriptTags(themeConfig.store, themeConfig.password);
    const scriptTagList = await scriptTags.list();
    gutil.log(scriptTagList);

    for (const scriptTagsConfig of externalScriptsConfig.scriptTags) {
      try {
        const result = await updateOrCreate(themeConfig, scriptTagsConfig);
        gutil.log(`${result.action} script tag: `, result.scriptTag);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

/**
 * Reads the script tag sources from script-tags.yml and removes them from the store
 */
gulp.task("script-tags:delete", async () => {
  const baseConfig = getYamlConfig(config.deployConfig) as ThemeConfigByEnv;
  const externalScriptsConfigs = getYamlConfig(
    config.externalScriptsConfig
  ) as ExternalScriptsConfigByEnv;
  for (const envKey in externalScriptsConfigs) {
    gutil.log(
      `[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`
    );
    const themeConfig = baseConfig[envKey];
    return deleteAll(themeConfig);
  }
});
