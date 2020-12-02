// TODO create skript to upload theme releases to github
// See https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#upload-a-release-asset
// See https://stackoverflow.com/a/26680032/1465919
// See https://github.com/octokit/rest.js

import { Octokit } from "@octokit/rest";
import { config, getYamlConfig } from "./config";
import { ReleaseConfig } from "../types";

export const getRelease = async (filename: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const octokit = new Octokit();

  // https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
  const release = await octokit.repos.getReleaseByTag({
    owner: releaseConfig.github.org || releaseConfig.github.owner,
    repo: releaseConfig.github.repo,
    tag: filename,
  });

  console.log(release);

  return release;
};

export const createRelease = async (filePath: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const octokit = new Octokit();

  // https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
  const release = await octokit.repos.createRelease({
    owner: releaseConfig.github.org || releaseConfig.github.owner,
    repo: releaseConfig.github.repo,
    tag_name: filePath,
  });

  return release;
};

export const uploadFile = async (filePath: string) => {
  const releaseConfig: ReleaseConfig = getYamlConfig(
    config.releaseConfig
  ) as ReleaseConfig;

  const octokit = new Octokit();

  const existingRelease = await getRelease(filePath);

  let releaseID: number;

  if (existingRelease) {
    releaseID = existingRelease.data.id;
  } else {
    const newRelease = await createRelease(filePath);
    releaseID = newRelease.data.id;
  }

  octokit.repos.uploadReleaseAsset({
    owner: releaseConfig.github.org || releaseConfig.github.owner,
    repo: releaseConfig.github.repo,
    release_id: releaseID,
    data: filePath,
  });
};

export const getDownloadFileUrl = async (filename: string) => {
  return null;
};
