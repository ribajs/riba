import { Injectable, Logger } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import * as Brakes from 'brakes';

import { Script } from 'vm';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ThemeConfig, ErrorObj } from '@ribajs/ssr';
import { resolve, extname } from 'path';
import * as consolidate from 'consolidate';
import type { Request } from 'express';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import type { ComponentLifecycleEventData, SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { EventDispatcher } from '@ribajs/events';

@Injectable()
export class SsrService {
  log = new Logger(this.constructor.name);
  theme: ThemeConfig;
  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
  }

  async getSharedContext(
    req: Request,
    templateVars: TemplateVars,
    errorObj?: ErrorObj,
  ) {
    const sharedContext: SharedContext = {
      events: new EventDispatcher(),
      ctx: {
        // See https://expressjs.com/de/api.html#req
        app: req.app,
        baseUrl: req.baseUrl,
        body: req.body,
        cookies: req.cookies,
        fresh: req.fresh,
        hostname: req.hostname,
        ip: req.ip,
        ips: req.ips,
        method: req.method,
        originalUrl: req.originalUrl,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        route: req.route,
        secure: req.secure,
        signedCookies: req.signedCookies,
        stale: req.stale,
        subdomains: req.subdomains,
        xhr: req.xhr,
        errorObj: errorObj,
        status: errorObj?.statusCode || req.statusCode || 200,
      },
      env: process.env,
      templateVars: templateVars.get(),
    };
    return sharedContext;
  }

  getTemplateEngine(templatePath: string) {
    const ext = extname(templatePath);
    const def = this.theme.viewEngine;
    const detected = ext?.substring(1) || def; // Removes the dot of the file extension
    if (detected !== def) {
      this.log.warn(
        `Detected template engine is not the default: "${detected}" (Default: "${def}")'`,
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

  /**
   *
   * @param layout Layout content string
   * @param rootTag The placeholder tag, will be replaces by the page component tag
   * @param pageTag The page component tag to replace the placeholder tag
   */
  async transformLayout(layout: string, rootTag: string, pageTag: string) {
    layout = layout.replace(new RegExp(rootTag, 'gi'), pageTag);
    return layout;
  }

  async readSsrScripts(filenames: string[]) {
    const scripts = new Map<string, string>();
    const assetsDir = this.theme.assetsDir;
    const scriptsDir = resolve(assetsDir, 'ssr');
    for (const filename of filenames) {
      const scriptPath = resolve(scriptsDir, filename);
      // this.log.debug('scriptPath', scriptPath);
      const scriptSource = await fs.readFile(scriptPath, 'utf8');
      // this.log.debug('Scripts loaded!');
      scripts.set(filename, scriptSource);
    }

    return scripts;
  }

  /**
   * Render a template by any supported template engine (pug, twig, liquid, ..)
   * @param templatePath Ren
   * @param variables
   */
  async renderTemplate(templatePath: string, variables: any) {
    if (!extname(templatePath)) {
      templatePath += '.' + this.theme.viewEngine;
    }
    const viewsDir: string = this.theme.viewsDir;
    const tplEngine = this.getTemplateEngine(templatePath);
    templatePath = resolve(viewsDir, templatePath);
    // this.log.debug(`Template engine: ${tplEngine}, path: ${templatePath}`);
    try {
      const result = await consolidate[tplEngine](
        resolve(viewsDir, templatePath),
        variables,
      );
      return result;
    } catch (error) {
      this.log.error('Error on render template');
      this.log.error(error);
      throw error;
    }
  }

  /**
   * Start ssr using jsdom
   * @see https://github.com/jsdom/jsdom
   *
   * @param layout
   * @param componentTagName
   * @param sharedContext Shared context injected to window object of the fake browser environment
   */
  async renderWithJSDom(
    layout: string,
    componentTagName: string,
    sharedContext: SharedContext,
    scriptFilenames = ['main.bundle.js'],
  ) {
    const virtualConsole = new VirtualConsole();
    virtualConsole.sendTo(console);

    const dom = new JSDOM(layout, {
      virtualConsole,
      runScripts: 'outside-only', // 'dangerously',
      includeNodeLocations: true,
      beforeParse(window) {
        if (!window.fetch) {
          window.fetch = fetch;
        }

        if (!window.requestAnimationFrame) {
          // Dummy
          (window as any).requestAnimationFrame = () => {
            /** Do nothing */
          };
        }

        if (!window.indexedDB) {
          /**
           * Dummy
           * Maybe in the future:
           * * https://www.npmjs.com/package/indexeddb
           * * https://github.com/metagriffin/indexeddb-js
           * * ...
           */
          (window as any).indexedDB = {
            open: () => {
              return {};
            },
          };
        }

        window.ssr = sharedContext;
      },
    });

    const result = new Promise<RenderResult>((resolve, reject) => {
      sharedContext.events.once(
        'ready',
        (lifecycleEventData: ComponentLifecycleEventData) => {
          // this.log.debug('Custom elements ready!');

          const html = dom.serialize();

          const result: RenderResult = {
            ...lifecycleEventData,
            html: html,
            css: [],
          };

          return resolve(result);
        },
      );
      sharedContext.events.once('error', (error: Error) => {
        this.log.error('SSR error event: ' + error);
        return reject(this.transformBrowserError(error));
      });
      dom.window.onerror = (msg, url, line, col, error) => {
        this.log.error('SSR window.onerror: ' + error);
        return reject(this.transformBrowserError(error));
      };
      dom.window.addEventListener('error', (error: ErrorEvent) => {
        this.log.error('SSR window error: ' + error);
        return reject(this.transformBrowserError(error));
      });
    });

    const scriptSources = await this.readSsrScripts(scriptFilenames);
    const scripts: Script[] = [];
    for (const [filename, scriptSource] of scriptSources) {
      const script = new Script(scriptSource, {
        filename,
      });
      scripts.push(script);
    }

    // Set shared context here
    const vmContext = dom.getInternalVMContext();

    // this.log.debug('Execute scripts...');
    for (const script of scripts) {
      await script.runInContext(vmContext);
    }

    this.log.debug('Wait for custom element...');
    // await dom.window.customElements.whenDefined(componentTagName);

    return result;
  }

  protected transformBrowserError(error: Error | ErrorEvent) {
    const newError = new Error(error.message);
    if ((error as Error).stack) {
      newError.stack = (error as Error).stack;
    }
    return newError;
  }

  async renderComponent({
    template,
    rootTag = 'ssr-root-page',
    componentTagName,
    sharedContext,
  }: {
    template?: string;
    rootTag?: string;
    componentTagName: string;
    sharedContext: SharedContext;
  }): Promise<RenderResult> {
    if (!rootTag) {
      rootTag = this.theme.ssr.rootTag || 'ssr-root-page';
    }

    if (!template) {
      template = this.theme.ssr.template || 'page-component.pug';
    }
    // this.log.debug(`rootTag: ${rootTag}`);
    // this.log.debug(`template: ${template}`);
    let layout = await this.renderTemplate(template, sharedContext);
    // this.log.debug(`layout: ${layout}`);
    layout = await this.transformLayout(layout, rootTag, componentTagName);
    // this.log.debug(`layout (transformed): ${layout}`);

    try {
      const render = async () => {
        return this.renderWithJSDom(layout, componentTagName, sharedContext);
      };

      // https://github.com/awolden/brakes
      const renderWithJSDom = new Brakes(render, {
        timeout: 20000, // TODO move to theme settings
      });
      const renderData = await renderWithJSDom.exec();
      return renderData;
    } catch (error) {
      this.log.error(`Error on render component! rootTag: "${rootTag}"`);
      this.log.error(error);
      throw error;
    }
  }
}
