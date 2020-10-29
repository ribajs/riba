import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { promises as fs } from "fs";
import { resolve } from "path";
import * as pkgDir from "pkg-dir";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("versions")
  async versions(@Res() res) {
    let riba = "";
    const rootDir = await pkgDir(__dirname);
    if (rootDir) {
      const pkg = JSON.parse(
        await fs.readFile(resolve(rootDir, "package.json"), "utf8")
      );
      riba = pkg.dependencies["@ribajs/core"].replace("^", "");
    }
    return res.json({ ...process.versions, riba });
  }
}
