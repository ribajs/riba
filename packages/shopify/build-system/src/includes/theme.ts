import { Themes } from "shopify-admin-api";

import { ThemesByEnv, ThemeByEnv, ThemeData, ThemeConfig } from "../types/index.js";
import { getAsset } from "./shopify-api";
import { config, getYamlConfig } from "./config";
import Moment from "moment";
import { Models } from "shopify-admin-api";
import { ThemeConfigByEnv } from "../types/index.js";

/**
 * Print theme data
 * @param env
 * @param theme
 */
export const print = (env: string, theme: ThemeData) => {
  console.log(`\n\n======  ${env.toUpperCase()}  ======`);
  // console.log("Env:\t" + env);
  console.log("Name:\t" + theme.name);
  console.log("ID:\t" + theme.id);
  console.log("Store:\t" + theme.store);
  console.log("Created:\t" + theme.created_at_moment.calendar());
  console.log("Updated:\t" + theme.updated_at_moment.calendar());
  console.log(
    `Edit settings:\t https://${theme.store}/admin/themes/${theme.id}/editor`
  );
  console.log(`Edit code:\t https://${theme.store}/admin/themes/${theme.id}`);
  console.log(
    `Preview:\t https://${theme.store}/?_ab=0&_fd=0&_sc=1&preview_theme_id=${theme.id}`
  );
};

export const getStoreThemes = async (themeConfig: ThemeConfig) => {
  const themeApi = new Themes(themeConfig.store, themeConfig.password);
  const store = themeConfig.store;
  const themes = await themeApi.list();
  for (const theme of themes) {
    (theme as ThemeData).store = store;
    if (theme.created_at) {
      (theme as ThemeData).created_at_moment = Moment(theme.created_at);
    }
    if (theme.updated_at) {
      (theme as ThemeData).updated_at_moment = Moment(theme.updated_at);
    }
  }
  return themes;
};

export const getStoresThemes = async () => {
  const themesByEnv: ThemesByEnv = {};
  const shopifyConfigs: ThemeConfigByEnv = getYamlConfig(
    config.deployConfig
  ) as ThemeConfigByEnv;
  for (const envKey in shopifyConfigs) {
    if (shopifyConfigs[envKey]) {
      const themeConfig = shopifyConfigs[envKey];
      const themes = await getStoreThemes(themeConfig);
      themesByEnv[envKey] = themes as ThemeData[];
    }
  }
  return themesByEnv;
};

export const getStoresThemesByRole = async (
  role: "main" | "unpublished" | "demo"
) => {
  const envThemes = await getStoresThemes();
  for (const envKey in envThemes) {
    if (envThemes[envKey]) {
      let themes = envThemes[envKey];
      themes = themes.filter((theme) => theme.role === role);
      envThemes[envKey] = themes;
    }
  }
  return envThemes;
};

export const remove = async (themeConfig: ThemeConfig, id: number) => {
  const themeApi = new Themes(themeConfig.store, themeConfig.password);
  return themeApi.delete(id);
};

export const createStoreTheme = async (
  themeConfig: ThemeConfig,
  themeName: string,
  zipSrc: string
) => {
  const themeApi = new Themes(themeConfig.store, themeConfig.password);
  return themeApi.create({
    role: "unpublished",
    src: zipSrc,
    name: themeName,
  });
};

export const getSortedThemesByCreatedDate = async (ascending: boolean) => {
  const envThemes = await getStoresThemes();
  for (const envKey in envThemes) {
    if (envThemes[envKey]) {
      let themes = envThemes[envKey];
      themes = themes.sort((a, b) => {
        if (ascending) {
          return a.created_at_moment.unix() - b.created_at_moment.unix();
        } else {
          return b.created_at_moment.unix() - a.created_at_moment.unix();
        }
      });
      envThemes[envKey] = themes;
    }
  }
  return envThemes;
};

export const getOldestEnvTheme = async () => {
  const envThemes = await getSortedThemesByCreatedDate(true);
  const envTheme: ThemeByEnv = {};
  for (const envKey in envThemes) {
    if (envThemes[envKey]) {
      const themes = envThemes[envKey];
      envTheme[envKey] = themes[0];
    }
  }
  return envTheme;
};

export const getYoungestEnvTheme = async () => {
  const envThemes = await getSortedThemesByCreatedDate(false);
  const envTheme: ThemeByEnv = {};
  for (const envKey in envThemes) {
    if (envThemes[envKey]) {
      const themes = envThemes[envKey];
      envTheme[envKey] = themes[0];
    }
  }
  return envTheme;
};

export const getEnvSettingsData = async (shopifyConfigs: ThemeConfigByEnv) => {
  const settingsDataEnv: {
    [envKey: string]: Models.Asset;
  } = {};
  for (const envKey in shopifyConfigs) {
    if (shopifyConfigs[envKey]) {
      const themeConfig = shopifyConfigs[envKey];
      const settingsData = await getAsset(
        themeConfig,
        "config/settings_data.json"
      );
      settingsDataEnv[envKey] = settingsData;
    }
  }
  return settingsDataEnv;
};

/**
 * Returns an object based on config.deploy.yml but with the current published theme id's
 */
export const generateEnvLiveThemeConfig = async (baseConfig: string) => {
  const themesByEnv = await getStoresThemesByRole("main");
  const shopifyLiveThemeConfigs: ThemeConfigByEnv = Object.assign(
    {},
    getYamlConfig(baseConfig) as ThemeConfigByEnv
  );
  for (const envKey in shopifyLiveThemeConfigs) {
    shopifyLiveThemeConfigs[envKey].theme_id = themesByEnv[envKey][0].id;
  }
  return shopifyLiveThemeConfigs;
};

/**
 * Returns an object based on the current config.deploy.yml but with the youngest theme id's
 */
export const generateEnvYoungestThemeConfig = async (baseConfig: string) => {
  const themesByEnv = await getYoungestEnvTheme();
  const shopifyLiveThemeConfigs: ThemeConfigByEnv = Object.assign(
    {},
    getYamlConfig(baseConfig) as ThemeConfigByEnv
  );
  for (const envKey in shopifyLiveThemeConfigs) {
    shopifyLiveThemeConfigs[envKey].theme_id = themesByEnv[envKey].id;
  }
  return shopifyLiveThemeConfigs;
};
