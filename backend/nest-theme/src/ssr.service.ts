import { Injectable, Logger } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import * as Brakes from 'brakes';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ThemeConfig, ErrorObj } from '@ribajs/ssr';
import type { Request } from 'express';
import fetch from 'node-fetch';
import type { ComponentLifecycleEventData, SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { EventDispatcher } from '@ribajs/events';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';

@Injectable()
export class SsrService {
  log = new Logger(this.constructor.name);
  theme: ThemeConfig;
  constructor(
    config: ConfigService,
    protected readonly sourceFile: SourceFileService,
    protected readonly templateFile: TemplateFileService,
  ) {
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

  protected async createDomForLayout(layout: string) {
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
      },
    });
    return dom;
  }

  /**
   * Start ssr using jsdom
   * @see https://github.com/jsdom/jsdom
   *
   * @param layout
   * @param componentTagName
   * @param sharedContext Shared context injected to window object of the fake browser environment
   */
  async render(
    layout: string,
    sharedContext: SharedContext,
    scriptFilenames = ['main.bundle.js'],
  ) {
    const dom = await this.createDomForLayout(layout);
    dom.window.ssr = sharedContext;

    const renderResult = new Promise<RenderResult>((resolve, reject) => {
      sharedContext.events.once(
        'ready',
        (lifecycleEventData: ComponentLifecycleEventData) => {
          const html = dom.serialize();
          const result: RenderResult = {
            ...lifecycleEventData,
            html: html,
            css: [],
          };
          this.log.debug('[Riba lifecycle] Done.');
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

    const files = await this.sourceFile.loads(scriptFilenames);
    const vmContext = dom.getInternalVMContext();

    for (const file of files) {
      await file.script.runInContext(vmContext);
    }

    this.log.debug('[Riba lifecycle] Wait...');

    return renderResult;
  }

  protected transformBrowserError(error: Error | ErrorEvent) {
    const newError = new Error(error.message);
    if ((error as Error).stack) {
      newError.stack = (error as Error).stack;
    }
    return newError;
  }

  async renderComponent({
    templatePath,
    rootTag = 'ssr-root-page',
    componentTagName,
    sharedContext,
  }: {
    templatePath?: string;
    rootTag?: string;
    componentTagName: string;
    sharedContext: SharedContext;
  }): Promise<RenderResult> {
    rootTag = rootTag || this.theme.ssr.rootTag || 'ssr-root-page';
    templatePath =
      templatePath || this.theme.ssr.template || 'page-component.pug';

    const template = await this.templateFile.load(
      templatePath,
      rootTag,
      componentTagName,
      {
        env: sharedContext.env,
        templateVars: sharedContext.templateVars,
      },
    );

    try {
      const _render = async () => {
        return this.render(template.layout, sharedContext);
      };

      // https://github.com/awolden/brakes
      const render = new Brakes(_render, {
        timeout: this.theme.timeout || 10000,
      });
      const renderData = await render.exec();
      return renderData;
    } catch (error) {
      this.log.error(`Error on render component! rootTag: "${rootTag}"`);
      this.log.error(error);
      throw error;
    }
  }
}
