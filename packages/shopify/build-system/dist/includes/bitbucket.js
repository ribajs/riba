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
exports.getDownloadFileUrlAlternate = exports.getDownloadFileUrl = exports.uploadFile = exports.uploadFileExists = void 0;
const config_1 = require("./config");
const bitbucket_1 = require("bitbucket");
const utilities_1 = __importDefault(require("./utilities"));
const messages_1 = __importDefault(require("./messages"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const got_1 = __importDefault(require("got"));
const path_1 = __importDefault(require("path"));
exports.uploadFileExists = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const username = releaseConfig.bitbucket.username;
    const password = releaseConfig.bitbucket.password;
    const repo_slug = releaseConfig.bitbucket.repo_slug;
    const workspace = releaseConfig.bitbucket.workspace;
    const bitbucket = new bitbucket_1.Bitbucket({
        auth: {
            username,
            password,
        },
    });
    const files = yield bitbucket.repositories.listDownloads({
        repo_slug,
        workspace,
    });
    // console.debug("[uploadFileExists]", files.data.values);
    // TODO implement pagination?
    return files.data.values.some((e) => e.name === filename);
});
exports.uploadFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const username = releaseConfig.bitbucket.username;
    const password = releaseConfig.bitbucket.password;
    const repo_slug = releaseConfig.bitbucket.repo_slug;
    const workspace = releaseConfig.bitbucket.workspace;
    const filename = path_1.default.basename(filePath);
    const exists = yield exports.uploadFileExists(filename);
    if (exists) {
        console.warn(messages_1.default.colorize(`The file "${filename}" already exists on bitbucket, normally the file will be overwritten, but if there are problems delete the file in bithucket and try it again`), "warning");
    }
    const bitbucket = new bitbucket_1.Bitbucket({
        auth: {
            username,
            password,
        },
    });
    const form = new form_data_1.default();
    form.append("files", fs_1.default.createReadStream(filePath));
    const result = yield bitbucket.repositories.createDownload({
        repo_slug,
        workspace,
        // WORAROUND
        _body: form,
    });
    // WORKAROUND
    console.log("Wait 3 seconds...");
    yield utilities_1.default.asnycTimeout(3000);
    return result;
});
/**
 * Note: You need write access to the repo to use ` bitbucket.repositories.getDownload` wich is used in this method
 * @param filename
 */
exports.getDownloadFileUrl = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const username = releaseConfig.bitbucket.username;
    const password = releaseConfig.bitbucket.password;
    const repo_slug = releaseConfig.bitbucket.repo_slug;
    const workspace = releaseConfig.bitbucket.workspace;
    const bitbucket = new bitbucket_1.Bitbucket({
        auth: {
            username,
            password,
        },
    });
    console.log("filename", filename);
    return bitbucket.repositories
        .getDownload({
        repo_slug,
        workspace,
        filename,
    })
        .then((value) => {
        console.log("bitbucket.repositories.getDownload");
        console.log(value);
        return value.url;
    });
});
/**
 * Alternative version of `getDownloadFileUrl` where less bitbucket rights are needed
 * @param filename
 */
exports.getDownloadFileUrlAlternate = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = config_1.getYamlConfig(config_1.config.releaseConfig);
    const username = releaseConfig.bitbucket.username;
    const password = releaseConfig.bitbucket.password;
    const repo_slug = releaseConfig.bitbucket.repo_slug;
    const workspace = releaseConfig.bitbucket.workspace;
    const uri = `https://${username}:${password}@bitbucket.org/${workspace}/${repo_slug}/downloads/${filename}`;
    console.log("Download url: " + uri);
    // Get redirect url of zip file
    return got_1.default(uri).then((result) => {
        return result.url;
    });
});
//# sourceMappingURL=bitbucket.js.map