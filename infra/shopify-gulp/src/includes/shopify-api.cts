import { Assets, Shops, Options } from "shopify-admin-api";
import { ThemeConfig } from "../types/index.cjs";
import { isNumber } from "./utilities.cjs";

/**
 * Download files from the theme
 * @param themeConfig
 * @param key e.g. "config/settings_data.json"
 */
export const getAsset = async (themeConfig: ThemeConfig, key: string) => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  const themeId = Number(themeConfig.theme_id);
  if (!isNumber(themeId)) {
    throw new Error(
      `"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`
    );
  }
  const settingsData = await assets.get(themeId, key);
  return settingsData;
};

export const getShop = async (
  themeConfig: ThemeConfig,
  options?: Options.FieldOptions
) => {
  const shops = new Shops(themeConfig.store, themeConfig.password);
  const shopData = await shops.get(options);
  return shopData;
};
