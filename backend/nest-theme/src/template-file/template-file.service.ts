import { Injectable, Logger } from '@nestjs/common';
import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { resolve, extname } from 'path';
import * as consolidate from 'consolidate';
import { promises as fs } from 'fs';
import { TemplateFile } from './types';

@Injectable()
export class TemplateFileService {
  protected log = new Logger(this.constructor.name);
  protected theme: ThemeConfig;
  protected templates = new Map<string, TemplateFile>();
  protected defaultEngine: string;
  protected dir: string;

  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
    this.dir = this.theme.viewsDir;
    this.defaultEngine = this.theme.viewEngine;
  }

  /**
   * Generate a Hash from string
   * @param str The string
   * @returns hash code
   * @see https://stackoverflow.com/a/7616484
   */
  protected hashCode(str: string) {
    let hash = 0;
    let i: number;
    let chr: number;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  protected getKey(path: string, componentTagName: string, variables: any) {
    return this.hashCode(
      path + componentTagName + JSON.stringify(variables),
    ).toString();
  }

  protected getEngine(templatePath: string) {
    const ext = extname(templatePath);
    const detected = ext?.substring(1) || this.defaultEngine; // Removes the dot of the file extension
    if (detected !== this.defaultEngine) {
      this.log.warn(
        `Detected template engine is not the default: "${detected}" (Default: "${this.defaultEngine}")'`,
      );
    }

    try {
      require.resolve(detected);
    } catch (error) {
      this.log.error(
        `Template engine not installed, try to run "yarn add ${detected}"`,
      );
    }

    return detected;
  }

  protected normalizePath(path: string) {
    if (!extname(path)) {
      path = path + '.' + this.defaultEngine;
    }
    if (!path.startsWith(this.dir)) {
      path = resolve(this.dir, path);
    }
    return path;
  }

  /**
   *
   * @param layout Layout content string
   * @param rootTag The placeholder tag, will be replaces by the page component tag
   * @param componentTagName The page component tag to replace the placeholder tag
   */
  protected transform(
    layout: string,
    rootTag: string,
    componentTagName: string,
  ) {
    layout = layout.replace(new RegExp(rootTag, 'gi'), componentTagName);
    return layout;
  }

  /**
   * Render a template by any supported template engine (pug, twig, liquid, ..)
   * @param key Key used for cache
   * @param path Template path
   * @param variables
   */
  protected async loadAndSetCache(
    key: string,
    path: string,
    rootTag: string,
    componentTagName: string,
    variables: any = {},
  ) {
    const engine = this.getEngine(path);
    try {
      let layout = await consolidate[engine](path, variables);
      layout = this.transform(layout, rootTag, componentTagName);
      const stats = await fs.stat(path);

      this.templates.set(key, {
        engine,
        layout,
        path,
        stats,
      });
      return this.templates.get(key);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }

  public async load(
    path: string,
    rootTag: string,
    componentTagName: string,
    variables: any = {},
  ) {
    path = this.normalizePath(path);
    const key = this.getKey(path, componentTagName, variables);
    if (this.templates.has(key)) {
      const file = this.templates.get(key);
      const stats = await fs.stat(file.path);
      if (file.stats.mtimeMs === stats.mtimeMs) {
        this.log.debug(`Load ${path} with ${componentTagName} from cache`);
        return file;
      } else {
        this.log.debug(
          `Template ${path} with ${componentTagName} has been change, refresh cache`,
        );
        return this.loadAndSetCache(
          key,
          path,
          rootTag,
          componentTagName,
          variables,
        );
      }
    }
    this.log.debug(
      `Template ${path} with ${componentTagName} currently not cached, add them to cache`,
    );
    return this.loadAndSetCache(
      key,
      path,
      rootTag,
      componentTagName,
      variables,
    );
  }
}
