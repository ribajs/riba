import { Assets, Shops, Options } from "shopify-admin-api";
import { ThemeConfig } from "../types";

/**
 * Download files from the theme
 * @param themeConfig
 * @param key e.g. "config/settings_data.json"
 */
export const getAsset = async (themeConfig: ThemeConfig, key: string) => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  const settingsData = await assets.get(themeConfig.theme_id, key);
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
