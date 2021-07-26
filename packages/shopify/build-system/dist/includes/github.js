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
const rest_1 = require("@octokit/rest");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
/**
 * Get a release by tag name
 * Get a published release with the specified tag.
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
 * @param filename
 */
const getRelease = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const octokit = new rest_1.Octokit({
        auth: releaseConfig.github.token,
    });
    const release = yield octokit.repos.getReleaseByTag({
        owner: releaseConfig.github.org || releaseConfig.github.owner,
        repo: releaseConfig.github.repo,
        tag: filename,
    });
    gulp_util_1.default.log("getRelease", release);
    return release;
});
exports.getRelease = getRelease;
/**
 * Create a release
 * Users with push access to the repository can create a release.
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-a-release-by-tag-name
 * @param filename
 */
const createRelease = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const octokit = new rest_1.Octokit({
        auth: releaseConfig.github.token,
    });
    let isPrerelease = false;
    if (filename.endsWith("dev.zip") ||
        filename.endsWith("beta.zip") ||
        filename.endsWith("alpha.zip") ||
        filename.endsWith("rc.zip") ||
        filename.endsWith("prerelease.zip")) {
        isPrerelease = true;
    }
    const release = yield octokit.repos.createRelease({
        owner: releaseConfig.github.org || releaseConfig.github.owner,
        repo: releaseConfig.github.repo,
        name: filename,
        tag_name: filename,
        prerelease: isPrerelease,
    });
    gulp_util_1.default.log("createRelease", release);
    return release;
});
exports.createRelease = createRelease;
const uploadFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const octokit = new rest_1.Octokit({
        auth: releaseConfig.github.token,
    });
    const filename = path_1.default.basename(filePath);
    const existingRelease = yield exports.getRelease(filename);
    gulp_util_1.default.log(`Upload ${filename} to github...`);
    let releaseID;
    if (existingRelease) {
        releaseID = existingRelease.data.id;
    }
    else {
        const newRelease = yield exports.createRelease(filename);
        releaseID = newRelease.data.id;
    }
    return octokit.repos.uploadReleaseAsset({
        name: filename,
        owner: releaseConfig.github.org || releaseConfig.github.owner,
        repo: releaseConfig.github.repo,
        release_id: releaseID,
        data: filePath,
    });
});
exports.uploadFile = uploadFile;
const getDownloadFileUrl = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log("TODO getDownloadFileUrl", filename);
    return null;
});
exports.getDownloadFileUrl = getDownloadFileUrl;
//# sourceMappingURL=github.js.map