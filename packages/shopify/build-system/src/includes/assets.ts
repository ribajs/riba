import { ExternalAssetsConfig, ThemeConfig } from "../types";
import { Assets, Models } from "shopify-admin-api";
import gutil from "gulp-util";

export const list = async (themeConfig: ThemeConfig) => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  const assetsList = await assets.list(themeConfig.theme_id);
  return assetsList;
};

export const updateOrCreate = async (
  themeConfig: ThemeConfig,
  extAssetsConfig: ExternalAssetsConfig
): Promise<Models.Asset | null> => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  let asset: Models.Asset | null = null;
  try {
    asset = await assets.get(themeConfig.theme_id, extAssetsConfig.key);
  } catch (error) {
    // If not found
    if (error.statusCode === 404) {
      asset = null;
    } else {
      throw error;
    }
  }

  if (asset) {
    gutil.log(`Update asset tag: ${extAssetsConfig.key}`);
  } else {
    gutil.log(`Create asset tag: ${extAssetsConfig.key}`);
  }

  asset = await assets.update(themeConfig.theme_id, {
    key: extAssetsConfig.key,
    src: extAssetsConfig.src,
  });

  return asset;
};
