import { Injectable, Logger } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import * as Brakes from 'brakes';

import { Script } from 'vm';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ThemeConfig } from '@ribajs/ssr';
import { resolve, extname } from 'path';
import * as consolidate from 'consolidate';
import type { Request } from 'express';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import type {
  ComponentLifecycleEventData,
  SharedContext,
  RenderEngine,
} from '@ribajs/ssr';
import type { RenderResult } from './types';
import { EventDispatcher } from '@ribajs/events';

@Injectable()
export class SsrService {
  log = new Logger(this.constructor.name);
  theme: ThemeConfig;
  constructor(config: ConfigService) {
    this.theme = config.get<ThemeConfig>('theme');
  }

  isRenderEngineValid(engine: RenderEngine) {
    switch (engine) {
      case 'jsdom':
        return true;
      default:
        return false;
    }
  }

  async getSharedContext(req: Request, templateVars: TemplateVars) {
    const sharedContext: SharedContext = {
      events: EventDispatcher.getInstance('ssr') as any, // TODO
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
      console.error(
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
      this.log.debug('Scripts loaded!');
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
    this.log.debug(`Template engine: ${tplEngine}, path: ${templatePath}`);
    try {
      const result = await consolidate[tplEngine](
        resolve(viewsDir, templatePath),
        variables,
      );
      return result;
    } catch (error) {
      this.log.error('Error on render template');
      console.error(error);
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

    this.log.debug('Execute scripts...');
    for (const script of scripts) {
      await script.runInContext(vmContext);
    }

    this.log.debug('Wait for custom element...');
    // await dom.window.customElements.whenDefined(componentTagName);

    return new Promise<RenderResult>((resolve, reject) => {
      sharedContext.events.once(
        'ready',
        (lifecycleEventData: ComponentLifecycleEventData) => {
          this.log.debug('Custom elements ready!');

          const html = dom.serialize();

          const result: RenderResult = {
            ...lifecycleEventData,
            html: html,
            css: [],
          };

          return resolve(result);
        },
      );
      dom.window.addEventListener('error', (event: Event) => {
        console.error(event);
        return reject(event);
      });
    });
  }

  async renderComponent({
    template,
    rootTag = 'ssr-root-page',
    componentTagName,
    engine,
    sharedContext,
  }: {
    template?: string;
    rootTag?: string;
    componentTagName: string;
    engine?: RenderEngine;
    sharedContext: SharedContext;
  }): Promise<RenderResult> {
    if (!rootTag) {
      rootTag = this.theme.ssr.rootTag || 'ssr-root-page';
    }

    if (engine && !this.isRenderEngineValid(engine)) {
      this.log.warn(`Ignore unknown render engine "${engine}"`);
    }
    if (!engine) {
      engine = this.theme.ssr.engine || 'jsdom';
    }
    if (!template) {
      template = this.theme.ssr.template || 'page-component.pug';
    }
    this.log.debug(`rootTag: ${rootTag}`);
    this.log.debug(`engine: ${engine}`);
    this.log.debug(`template: ${template}`);
    let layout = await this.renderTemplate(template, sharedContext);
    // this.log.debug(`layout: ${layout}`);
    layout = await this.transformLayout(layout, rootTag, componentTagName);
    this.log.debug(`layout (transformed): ${layout}`);
    try {
      if (engine === 'jsdom') {
        // https://github.com/awolden/brakes
        const renderWithJSDom = new Brakes(this.renderWithJSDom.bind(this), {
          timeout: 10000,
        });
        const renderData = await renderWithJSDom.exec(
          layout,
          componentTagName,
          sharedContext,
        );
        return renderData;
      } else {
        throw new Error('Unsupported render engine');
      }
    } catch (error) {
      this.log.error(`Error on render component with ${engine}`);
      console.error(error);
      throw error;
    }
  }
}
