import gutil from "gulp-util";
import path from "path";
import { config, getYamlConfig } from "./config.cjs";
import * as bithucket from "./bitbucket.cjs";
import * as github from "./github.cjs";
import { ReleaseConfig } from "../types/index.cjs";

export const uploadFile = async (filePath: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig | null;

  const filename = path.basename(filePath);

  if (releaseConfig?.bitbucket) {
    return bithucket.uploadFile(filePath);
  }

  if (releaseConfig?.github) {
    return github.uploadFile(filePath);
  }

  gutil.log(
    gutil.colors.yellow(
      `The config file "${config.releaseConfig}" does not exist or is invalid, skip upload!\n` +
        `Please upload the theme file "${filename}" by hand to Shopify.\n` +
        `If you want to automatically deploy the theme to Shopify create / fix the config file in the root of you project.`
    )
  );

  return null;
};

export const getDownloadFileUrl = async (
  filename: string
): Promise<string | null> => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig | null;

  if (releaseConfig?.bitbucket) {
    return bithucket.getDownloadFileUrl(filename);
  }

  if (releaseConfig?.github) {
    return github.getDownloadFileUrl(filename);
  }

  gutil.log(
    gutil.colors.yellow(
      `The config file "${config.releaseConfig}" does not exist or is invalid, skip get download url!`
    )
  );

  return null;
};
