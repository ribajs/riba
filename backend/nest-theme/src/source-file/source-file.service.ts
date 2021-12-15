import { Injectable } from '@nestjs/common';
import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import { Script } from 'vm';
import { SourceFile } from './types';

@Injectable()
export class SourceFileService {
  private theme: ThemeConfig;
  private dir: string;

  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
    this.dir = resolve(this.theme.assetsDir, 'ssr');
  }

  /**
   * Load file from filesystem
   *
   * @param {string} filename
   */
  public async load(filename: string): Promise<SourceFile> {
    const path = resolve(this.dir, filename);
    const source = await fs.readFile(path, 'utf8');
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
