"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadFileUrl = exports.uploadFile = exports.createRelease = exports.getRelease = void 0;
const gulp_util_1 = __importDefault(require("gulp-util"));
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
const getRelease = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log("TODO getRelease", filename);
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
});
exports.getRelease = getRelease;
/**
 * Create a release
 * Users with push access to the repository can create a release.
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
 * @param filename
 */
const createRelease = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log("TODO getRelease", filename);
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
});
exports.createRelease = createRelease;
const uploadFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log("TODO uploadFile", filePath);
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
});
exports.uploadFile = uploadFile;
const getDownloadFileUrl = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log("TODO getDownloadFileUrl", filename);
    return null;
});
exports.getDownloadFileUrl = getDownloadFileUrl;
//# sourceMappingURL=github.js.map