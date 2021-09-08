import { Injectable, Logger } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ErrorObj } from '@ribajs/ssr';
import type { FullThemeConfig } from './types/theme-config';
import type { Request } from 'express';
import fetch from 'node-fetch';
import type { ComponentLifecycleEventData, SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { EventDispatcher } from '@ribajs/events';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
import { DummyConsole } from './helper/dummy-console';
import { ResponseError } from './types';

@Injectable()
export class SsrService {
  log = new Logger(this.constructor.name);
  theme: FullThemeConfig;
  constructor(
    config: ConfigService,
    protected readonly sourceFile: SourceFileService,
    protected readonly templateFile: TemplateFileService,
  ) {
    this.theme = config.get<FullThemeConfig>('theme');
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
    const virtualConsole: VirtualConsole | null = new VirtualConsole();
    virtualConsole.sendTo(console);

    const dom = new JSDOM(layout, {
      virtualConsole,
      runScripts: 'outside-only', // 'dangerously',
      includeNodeLocations: true,
      beforeParse(window) {
        if (!window.fetch) {
          window.fetch = fetch as any;
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
    return { dom, virtualConsole };
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
    let { dom, virtualConsole } = await this.createDomForLayout(layout);
    dom.window.ssr = sharedContext;

    let files = await this.sourceFile.loads(scriptFilenames);
    let vmContext = dom.getInternalVMContext();

    for (const file of files) {
      try {
        await file.script.runInContext(vmContext, {
          timeout: this.theme.timeout || 5000,
        });
      } catch (error) {
        this.log.error('Error on run script');
        this.log.error(error);
        throw error;
      }
    }

    const renderResult = new Promise<RenderResult>((resolve, reject) => {
      const onError = (error: Error | ErrorEvent) => {
        this.log.error('SSR error');
        reject(this.transformBrowserError(error));
        clear();
        return true;
      };

      const onDone = (lifecycleEventData: ComponentLifecycleEventData) => {
        this.log.debug('[Riba lifecycle] Done.');
        const html = dom.serialize();
        const result: RenderResult = {
          ...lifecycleEventData,
          html: html,
          css: [],
        };
        resolve(result);
        clear();
        return;
      };

      const clear = () => {
        // console.debug('Clear JSDom');

        // Ignore clear errors
        virtualConsole.sendTo(new DummyConsole());
        virtualConsole.off('jsdomError', onError);

        sharedContext.events.off('error', onError, this);
        sharedContext.events.off('ready', onDone, this);

        if (typeof dom?.window?.removeEventListener === 'function') {
          dom.window.removeEventListener('error', onError);
        }

        if (
          typeof dom?.window?.dispatchEvent === 'function' &&
          dom.window.Event
        ) {
          dom.window.dispatchEvent(new dom.window.Event('beforeunload'));
        }

        if (typeof dom?.window?.close === 'function') {
          dom.window.close();
        }

        // Clear dom
        if (typeof dom?.window?.document?.write === 'function') {
          dom.window.document.write();
        }
        files = null;
        vmContext = null;
        virtualConsole = null;
        dom = null;
      };

      sharedContext.events.once('ready', onDone, this);
      virtualConsole.on('jsdomError', onError);
      sharedContext.events.once('error', onError, this);
      dom.window.addEventListener('error', onError);
    });

    this.log.debug('[Riba lifecycle] Wait...');

    return renderResult;
  }

  protected transformBrowserError(error: ResponseError | ErrorEvent) {
    const newError = new Error(error.message);
    if ((error as Error).stack) {
      newError.stack = (error as Error).stack;
    }
    if ((error as ResponseError).status) {
      (newError as ResponseError).status = (error as ResponseError).status;
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
      return await this.render(template.layout, sharedContext);
    } catch (error) {
      this.log.error(`Error on render component! rootTag: "${rootTag}"`);
      this.log.error(error);
      throw error;
    }
  }
}
