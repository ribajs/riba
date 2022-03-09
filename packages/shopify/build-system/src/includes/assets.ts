import { ExternalAssetsConfig, ThemeConfig } from "../types/index.js";
import { Assets, Models } from "shopify-admin-api";
import gutil from "gulp-util";
import { isNumber } from "./utilities";

export const list = async (themeConfig: ThemeConfig) => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  const themeId = Number(themeConfig.theme_id);
  if (!isNumber(themeId)) {
    throw new Error(
      `"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`
    );
  }
  const assetsList = await assets.list(themeId);
  return assetsList;
};

export const updateOrCreate = async (
  themeConfig: ThemeConfig,
  extAssetsConfig: ExternalAssetsConfig
): Promise<Models.Asset | null> => {
  const assets = new Assets(themeConfig.store, themeConfig.password);
  let asset: Models.Asset | null = null;
  const themeId = Number(themeConfig.theme_id);
  if (!isNumber(themeId)) {
    throw new Error(
      `"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`
    );
  }
  try {
    asset = await assets.get(themeId, extAssetsConfig.key);
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

  asset = await assets.update(themeId, {
    key: extAssetsConfig.key,
    src: extAssetsConfig.src,
  });

  return asset;
};
