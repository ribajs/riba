import gutil from "gulp-util";
import { config, getYamlConfig } from "./config";
import * as bithucket from "./bitbucket";
import * as github from "./github";
import { ReleaseConfig } from "../types";

export const uploadFile = async (filePath: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  if (!releaseConfig) {
    gutil.log(
      `The config file "${config.releaseConfig}" does not exist, skip upload.`
    );
    gutil.log(
      `If you want to automatically upload the file to deploy it in Shopify then create this config file in the root of you project.`
    );
    return null;
  }

  if (releaseConfig.bitbucket) {
    return bithucket.uploadFile(filePath);
  }

  if (releaseConfig.github) {
    return github.uploadFile(filePath);
  }
};

export const getDownloadFileUrl = async (
  filename: string
): Promise<string | null> => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  if (!releaseConfig) {
    gutil.log(`Skip get download url`);
    return null;
  }

  if (releaseConfig.bitbucket) {
    return bithucket.getDownloadFileUrl(filename);
  }

  if (releaseConfig.github) {
    return github.getDownloadFileUrl(filename);
  }

  return null;
};
