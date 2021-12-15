import { SupportedTemplateEngines } from "@ribajs/ssr";
import { resolve, extname } from "path";
import * as consolidate from "consolidate";
import { SUPPORTED_TEMPLATE_ENGINES } from "./constants";
import { TemplateFile } from "./types";

export class TemplateFileService {
  private log = console;

  constructor(
    private dir: string,
    private defaultEngine: SupportedTemplateEngines
  ) {
    //
  }

  private getEngine(templatePath: string) {
    const ext = extname(templatePath);
    const detected = ext?.substring(1) || this.defaultEngine; // Removes the dot of the file extension
    if (detected !== this.defaultEngine) {
      this.log.warn(
        `Detected template engine is not the default: "${detected}" (Default: "${this.defaultEngine}")'`
      );
    }

    try {
      require.resolve(detected);
    } catch (error) {
      this.log.error(
        `Template engine not installed, try to run "yarn add ${detected}"`
      );
    }

    if (
      !SUPPORTED_TEMPLATE_ENGINES.includes(detected as SupportedTemplateEngines)
    ) {
      throw new Error(
        'The theme config must contain a "viewEngine" property of a supported template engine string!'
      );
    }

    return detected as SupportedTemplateEngines;
  }

  private normalizePath(path: string) {
    if (!extname(path)) {
      path = path + "." + this.defaultEngine;
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
    layout = layout.replace(new RegExp(rootTag, "gi"), componentTagName);
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
    variables: any = {}
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
