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
exports.compressForStore = void 0;
const config_1 = require("./config");
const fs_1 = require("fs");
const archiver_1 = __importDefault(require("archiver"));
const path_1 = __importDefault(require("path"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const compressForStore = (envKey, settingsData, zipFilename) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.promises.mkdir(config_1.config.upload, { recursive: true });
    if (!zipFilename) {
        zipFilename = config_1.getReleaseZipFilename(envKey);
    }
    const archive = archiver_1.default("zip");
    const include = "**/*";
    const distPath = path_1.default.resolve(config_1.config.themeRoot, config_1.config.dist.root);
    const ignore = "config.yml";
    const zipPath = path_1.default.resolve(config_1.config.upload, zipFilename);
    const archiveOutput = fs_1.createWriteStream(zipPath);
    // archiveOutput.on("close", function () {
    //   gutil.log(`[${envKey}] ${archive.pointer()} total bytes`);
    //   gutil.log(
    //     `[${envKey}] archiver has been finalized and the output file descriptor has closed.`
    //   );
    // });
    archive.on("error", function (err) {
        console.error(err);
        throw err;
    });
    // archiveOutput.on("end", function () {
    //   gutil.log("Data has been drained");
    // });
    archive.pipe(archiveOutput);
    // gutil.log(`[${envKey}] Zip root: ${distPath}`);
    // gutil.log(`[${envKey}] Include files to zip:`);
    // gutil.log(include);
    // gutil.log(`[${envKey}] Ignore files:`);
    // gutil.log(ignore);
    archive.glob(include, { ignore, cwd: distPath });
    archive.append(settingsData, { name: "config/settings_data.json" });
    gulp_util_1.default.log(`[${envKey}] Write zip to: ${zipPath}`);
    yield archive.finalize();
    return zipPath;
});
exports.compressForStore = compressForStore;
//# sourceMappingURL=release.js.map