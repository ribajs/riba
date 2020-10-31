import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import { resolve } from "path";
import * as pkgDir from "pkg-dir";

@Injectable()
export class AppService {
  async getVersions() {
    let riba = "";
    const rootDir = await pkgDir(__dirname);
    if (rootDir) {
      const pkg = JSON.parse(
        await fs.readFile(resolve(rootDir, "package.json"), "utf8")
      );
      riba = pkg.dependencies["@ribajs/core"].replace("^", "");
    }
    return { ...process.versions, riba };
  }
}
