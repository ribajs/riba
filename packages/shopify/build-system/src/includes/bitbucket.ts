import { config, getYamlConfig } from "./config";
import { Bitbucket } from "bitbucket";
import { asnycTimeout } from "./utilities";
import { ReleaseConfig } from "../types";
import messages from "./messages";
import FormData from "form-data";
import fs from "fs";
import got from "got";
import path from "path";
import gutil from "gulp-util";

export const uploadFileExists = async (filename: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const username = releaseConfig.bitbucket.username;
  const password = releaseConfig.bitbucket.password;
  const repo_slug = releaseConfig.bitbucket.repo_slug;
  const workspace = releaseConfig.bitbucket.workspace;
  const bitbucket = new Bitbucket({
    auth: {
      username,
      password,
    },
  });
  const files = await bitbucket.repositories.listDownloads({
    repo_slug,
    workspace,
  });
  // console.debug("[uploadFileExists]", files.data.values);

  // TODO implement pagination?
  return (files.data.values as Array<any>).some((e) => e.name === filename);
};

export const uploadFile = async (filePath: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const username = releaseConfig.bitbucket.username;
  const password = releaseConfig.bitbucket.password;
  const repo_slug = releaseConfig.bitbucket.repo_slug;
  const workspace = releaseConfig.bitbucket.workspace;
  const filename = path.basename(filePath);
  const exists = await uploadFileExists(filename);
  if (exists) {
    console.warn(
      messages.colorize(
        `The file "${filename}" already exists on bitbucket, normally the file will be overwritten, but if there are problems delete the file in bithucket and try it again`
      ),
      "warning"
    );
  }

  gutil.log(`Upload ${filename} to bitbucket...`);

  const bitbucket = new Bitbucket({
    auth: {
      username,
      password,
    },
  });

  const form = new FormData();

  form.append("files", fs.createReadStream(filePath));

  const result = await bitbucket.repositories.createDownload({
    repo_slug,
    workspace,
    // WORAROUND
    _body: (form as unknown) as globalThis.FormData,
  });

  // WORKAROUND
  console.log("Wait 3 seconds...");
  await asnycTimeout(3000);

  return result;
};

/**
 * Note: You need write access to the repo to use ` bitbucket.repositories.getDownload` wich is used in this method
 * @param filename
 */
export const getDownloadFileUrl = async (filename: string): Promise<string> => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const username = releaseConfig.bitbucket.username;
  const password = releaseConfig.bitbucket.password;
  const repo_slug = releaseConfig.bitbucket.repo_slug;
  const workspace = releaseConfig.bitbucket.workspace;
  const bitbucket = new Bitbucket({
    auth: {
      username,
      password,
    },
  });

  let url: string;

  try {
    const result = await bitbucket.repositories.getDownload({
      repo_slug,
      workspace,
      filename,
    });
    url = result.url;
  } catch (error) {
    url = await getDownloadFileUrlAlternate(filename);
  }

  console.log("bitbucket.repositories.getDownload");
  console.log(url);

  return url;
};

/**
 * Alternative version of `getDownloadFileUrl` where less bitbucket rights are needed
 * @param filename
 */
export const getDownloadFileUrlAlternate = async (
  filename: string
): Promise<string> => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  if (!releaseConfig) {
    gutil.log(`Skip get download url`);
    return null;
  }

  const username = releaseConfig.bitbucket.username;
  const password = releaseConfig.bitbucket.password;
  const repo_slug = releaseConfig.bitbucket.repo_slug;
  const workspace = releaseConfig.bitbucket.workspace;
  const uri = `https://${username}:${password}@bitbucket.org/${workspace}/${repo_slug}/downloads/${filename}`;

  console.log("Download url: " + uri);

  // Get redirect url of zip file
  return got(uri).then((result) => {
    return result.url;
  });
};
