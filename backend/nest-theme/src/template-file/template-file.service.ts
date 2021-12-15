import { Injectable, Logger } from '@nestjs/common';
import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { resolve, extname } from 'path';
import * as consolidate from 'consolidate';
import { TemplateFile } from './types';

@Injectable()
export class TemplateFileService {
  private log = new Logger(this.constructor.name);
  private theme: ThemeConfig;
  private defaultEngine: string;
  private dir: string;

  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
    this.dir = this.theme.viewsDir;
    this.defaultEngine = this.theme.viewEngine;
  }

  private getEngine(templatePath: string) {
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

  private normalizePath(path: string) {
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
  private transform(layout: string, rootTag: string, componentTagName: string) {
    layout = layout.replace(new RegExp(rootTag, 'gi'), componentTagName);
    return layout;
  }

  /**
   * Render a template by any supported template engine (pug, twig, liquid, ..)
   * @param path Template path
   * @param variables
   */
  public async load(
    path: string,
    rootTag: string,
    componentTagName: string,
    variables: any = {},
  ): Promise<TemplateFile> {
    path = this.normalizePath(path);
    const engine = this.getEngine(path);
    try {
      let layout = await consolidate[engine](path, variables);
      layout = this.transform(layout, rootTag, componentTagName);
      return {
        engine,
        layout,
        path,
      };
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }
}
