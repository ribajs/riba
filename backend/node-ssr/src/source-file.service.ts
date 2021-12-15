import { resolve } from "path";
import { promises as fs } from "fs";
import { Script } from "vm";
import { SourceFile } from "./types";

export class SourceFileService {
  private dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  /**
   * Load file from filesystem
   *
   * @param {string} filename
   */
  public async load(filename: string): Promise<SourceFile> {
    const path = resolve(this.dir, filename);
    const source = await fs.readFile(path, "utf8");
    const script = new Script(source, {
      filename,
    });

    return {
      source,
      script,
      filename,
      path,
    };
  }

  /**
   * Load files from filesystem
   *
   * @param {string[]} filenames
   */
  public async loads(filenames: string[]) {
    const sourceFiles: SourceFile[] = [];
    for await (const filename of filenames) {
      sourceFiles.push(await this.load(filename));
    }
    return sourceFiles;
  }
}
