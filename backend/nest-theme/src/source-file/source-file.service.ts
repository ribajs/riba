import { Injectable } from '@nestjs/common';
import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import { Script } from 'vm';

import { SourceFile } from './types';

@Injectable()
export class SourceFileService {
  protected theme: ThemeConfig;
  protected scripts = new Map<string, SourceFile>();
  protected dir: string;

  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
    this.dir = resolve(this.theme.assetsDir, 'ssr');
  }

  /**
   * Load file from filesystem (ignores the file cache)
   *
   * @param {string} filename
   */
  public async loadUncached(filename: string) {
    const path = resolve(this.dir, filename);
    // this.log.debug('path', path);
    const source = await fs.readFile(path, 'utf8');
    const stats = await fs.stat(path);
    const script = new Script(source, {
      filename,
    });

    // this.log.debug('Scripts loaded!');
    this.scripts.set(filename, {
      source,
      script,
      filename,
      path,
      stats,
    });

    return this.scripts.get(filename);
  }

  /**
   * Load file from filesystem or cache
   *
   * @param {string} filename
   */
  public async load(filename: string) {
    if (this.scripts.has(filename)) {
      const file = this.scripts.get(filename);
      const stats = await fs.stat(file.path);
      if (file.stats.mtimeMs === stats.mtimeMs) {
        console.debug(`Load ${filename} from cache`);
        return file;
      } else {
        console.debug(`File ${filename} has been change, refresh cache`);
        return this.loadUncached(filename);
      }
    }
    console.debug(`File ${filename} currently not cached, add them to cache`);
    return this.loadUncached(filename);
  }

  /**
   * Load files from filesystem or cache
   *
   * @param {string[]} filenames
   */
  public async loads(filenames: string[]) {
    for (const filename of filenames) {
      await this.load(filename);
    }
    return filenames.map((filename) => this.scripts.get(filename));
  }
}
