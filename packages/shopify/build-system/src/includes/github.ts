import gutil from "gulp-util";
// WAIT FOR FIX https://github.com/octokit/plugin-rest-endpoint-methods.js/issues/207
// import { Octokit } from "@octokit/rest";
// import path from "path";
// import { config, getYamlConfig } from "./config";
// import { ReleaseConfig } from "../types";

/**
 * Get a release by tag name
 * Get a published release with the specified tag.
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
 * @param filename
 */
export const getRelease = async (filename: string): Promise<string | null> => {
  gutil.log("TODO getRelease", filename);
  return null;
  // WAIT FOR FIX https://github.com/octokit/plugin-rest-endpoint-methods.js/issues/207
  // const releaseConfig: ReleaseConfig = getYamlConfig(
  //   config.releaseConfig
  // ) as ReleaseConfig;
  // const octokit = new Octokit({
  //   auth: releaseConfig.github.token,
  // });
  // const release = await octokit.repos.getReleaseByTag({
  //   owner: releaseConfig.github.org || releaseConfig.github.owner,
  //   repo: releaseConfig.github.repo,
  //   tag: filename,
  // });
  // gutil.log("getRelease", release);
  // return release;
};

/**
 * Create a release
 * Users with push access to the repository can create a release.
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
 * @param filename
 */
export const createRelease = async (
  filename: string
): Promise<string | null> => {
  gutil.log("TODO getRelease", filename);
  return null;
  // const releaseConfig: ReleaseConfig = getYamlConfig(
  //   config.releaseConfig
  // ) as ReleaseConfig;

  // const octokit = new Octokit({
  //   auth: releaseConfig.github.token,
  // });

  // let isPrerelease = false;
  // if (
  //   filename.endsWith("dev.zip") ||
  //   filename.endsWith("beta.zip") ||
  //   filename.endsWith("alpha.zip") ||
  //   filename.endsWith("rc.zip") ||
  //   filename.endsWith("prerelease.zip")
  // ) {
  //   isPrerelease = true;
  // }

  // const release = await octokit.repos.createRelease({
  //   owner: releaseConfig.github.org || releaseConfig.github.owner,
  //   repo: releaseConfig.github.repo,
  //   name: filename,
  //   tag_name: filename,
  //   prerelease: isPrerelease,
  // });

  // gutil.log("createRelease", release);

  // return release;
};

export const uploadFile = async (filePath: string): Promise<string | null> => {
  gutil.log("TODO uploadFile", filePath);
  return null;
  // const releaseConfig: ReleaseConfig = getYamlConfig(
  //   config.releaseConfig
  // ) as ReleaseConfig;

  // const octokit = new Octokit({
  //   auth: releaseConfig.github.token,
  // });
  // const filename = path.basename(filePath);
  // const existingRelease = await getRelease(filename);

  // gutil.log(`Upload ${filename} to github...`);

  // let releaseID: number;

  // if (existingRelease) {
  //   releaseID = existingRelease.data.id;
  // } else {
  //   const newRelease = await createRelease(filename);
  //   releaseID = newRelease.data.id;
  // }

  // octokit.repos.uploadReleaseAsset({
  //   owner: releaseConfig.github.org || releaseConfig.github.owner,
  //   repo: releaseConfig.github.repo,
  //   release_id: releaseID,
  //   data: filePath,
  // });
};

export const getDownloadFileUrl = async (
  filename: string
): Promise<string | null> => {
  gutil.log("TODO getDownloadFileUrl", filename);
  return null;
};
