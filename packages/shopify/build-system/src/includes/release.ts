import { config, getReleaseZipFilename } from "./config";

import { promises as fs, createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
import gutil from "gulp-util";

export const compressForStore = async (
  envKey: string,
  settingsData: string | Buffer,
  zipFilename?: string
): Promise<string> => {
  await fs.mkdir(config.upload, { recursive: true });
  if (!zipFilename) {
    zipFilename = getReleaseZipFilename(envKey);
  }
  const archive = archiver("zip");
  const include = "**/*";
  const distPath = path.resolve(config.themeRoot, config.dist.root);
  const ignore = "config.yml";
  const zipPath = path.resolve(config.upload, zipFilename);
  const archiveOutput = createWriteStream(zipPath);
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
  gutil.log(`[${envKey}] Write zip to: ${zipPath}`);
  await archive.finalize();
  return zipPath;
};
