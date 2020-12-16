import { Injectable } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import { HappyDOMContext } from '@happy-dom/server-rendering';
import { Script } from 'vm';
import { ConfigService } from '@nestjs/config';
import { resolve, extname } from 'path';
import * as renderEngine from 'consolidate';
import { promises as fs } from 'fs';
import type {
  TypeOfComponent,
  PageComponentAfterBindEventData,
} from '@ribajs/ssr';
import type { Riba, View } from '@ribajs/core/src';
import { EventDispatcher } from './event-dispatcher.service';
interface RenderResult {
  html: string;
  css?: string[];
  component: {
    tagName: string;
  };
}

@Injectable()
export class Ssr {
  constructor(protected config: ConfigService) {}

  // TODO different shared context for each site?
  getSharedContext() {
    return {
      ssrEvents: EventDispatcher.getInstance('ssr'),
    };
  }

  getTemplateEingine(templatePath: string) {
    const ext = extname(templatePath);
    const def = this.config.get('theme.viewEngine');
    const detected = ext?.substring(1) || def; // Removes the dot of the file extension
    if (detected !== def) {
      console.warn(
        `Detected template engine is not the default: "${detected}" (Default: "${def}")'`,
      );
    }

    return detected;
  }

  /**
   *
   * @param layout Layout content string
   * @param placeholderPageTag The placeholder tag, will be replaces by the page component tag
   * @param pageTag The page compontent tag to replace the placeholder tag
   */
  async transformLayout(
    layout: string,
    placeholderPageTag: string,
    pageTag: string,
  ) {
    layout = layout.replace(new RegExp(placeholderPageTag, 'gi'), pageTag);
    return layout;
  }

  async readSsrScripts() {
    const assetsPath = this.config.get<string>('theme.assetsDir');
    const vendorPath = resolve(assetsPath, 'ssr', 'vendors.bundle.js');
    const mainPath = resolve(assetsPath, 'ssr', 'main.bundle.js');
    console.debug('vendorPath', vendorPath);
    console.debug('mainPath', mainPath);
    const vendors = await fs.readFile(vendorPath, 'utf8');
    const main = await fs.readFile(mainPath, 'utf8');
    console.debug('Scripts readed!');

    return {
      vendors,
      main,
    };
  }

  /**
   * Render a template by any supported template engine (pug, twig, liquid, ..)
   * @param templatePath Ren
   * @param variables
   */
  async renderTemplate(templatePath: string, variables: any) {
    if (!extname(templatePath)) {
      templatePath += '.' + this.config.get('theme.viewEngine');
    }
    const viewsDir: string = this.config.get('theme.viewsDir');
    const eingine = this.getTemplateEingine(templatePath);
    const result = await renderEngine[eingine](
      resolve(viewsDir, templatePath),
      variables,
    );
    return result;
  }

  async renderWithJSDom(layout: string, componentTagName: string) {
    const sharedContext = this.getSharedContext();
    const virtualConsole = new VirtualConsole();
    virtualConsole.sendTo(console);

    const dom = new JSDOM(layout, {
      virtualConsole,
      runScripts: 'outside-only', // 'dangerously',
      includeNodeLocations: true,
    });

    const { vendors, main } = await this.readSsrScripts();
    const script = new Script(vendors + ' ' + main, {
      filename: 'vender-main.js',
    });

    // Set shared context here
    const vmContext = dom.getInternalVMContext();
    vmContext.window.ssrEvents = sharedContext.ssrEvents;

    console.debug('Execute scripts...');
    script.runInContext(vmContext);

    console.debug('Wait for custom element...');
    await dom.window.customElements.whenDefined('index-page');

    const riba: Riba = (dom.window as any).riba;
    const view: View = (dom.window as any).view;

    const component: TypeOfComponent | null =
      riba.components[componentTagName] ||
      view.options.components[componentTagName] ||
      null;

    console.debug('Scripts executed!');
    return new Promise<RenderResult>((resolve, reject) => {
      sharedContext.ssrEvents.once(
        'PageComponent:afterBind',
        (afterBindData: PageComponentAfterBindEventData) => {
          const html = dom.serialize();
          const result: RenderResult = {
            component: afterBindData,
            html: html,
          };

          // WORKAROUND
          result.component.tagName =
            result.component.tagName || component.tagName || componentTagName;

          console.debug('result', result);
          return resolve(result);
        },
      );
      dom.window.addEventListener('error', (event: Event) => {
        console.error(event);
        return reject(event);
      });
    });
  }

  async renderWithHappyDom(layout: string, componentTagName: string) {
    const context = new HappyDOMContext();
    const sharedContext = this.getSharedContext();
    const window = (context as any).window; // TODO window is private, make pr for this

    // Set shared context here
    window.ssrEvents = sharedContext.ssrEvents;

    const { vendors, main } = await this.readSsrScripts();
    const vendorsScript = new Script(vendors, {
      filename: 'vendor.bundle.js',
    });
    const mainScript = new Script(main, {
      filename: 'main.bundle.js',
    });

    // Do not use await here because we want to run the next method after we get the promise result
    const ssrResultPromise = context.render({
      html: layout,
      scripts: [vendorsScript, mainScript],
      customElements: {
        openShadowRoots: false,
        extractCSS: false,
        scopeCSS: false,
        addCSSToHead: false,
      },
    });

    const result = await new Promise<RenderResult>((resolve, reject) => {
      sharedContext.ssrEvents.once(
        'PageComponent:afterBind',
        async (afterBindData: PageComponentAfterBindEventData) => {
          const ssrResult = await ssrResultPromise;
          const riba: Riba = window.riba;
          const view: View = window.view;

          const component: TypeOfComponent | null =
            riba.components[componentTagName] ||
            view.options.components[componentTagName] ||
            null;

          const result: RenderResult = {
            component: {
              tagName: component.tagName,
            },

            html: ssrResult.html,
            css: ssrResult.css,
          };

          // WORKAROUND
          result.component.tagName =
            result.component.tagName || component.tagName || componentTagName;

          result.component = {
            ...result.component,
            ...afterBindData,
          };

          console.debug('result', result);
          return resolve(result);
        },
      );

      window.addEventListener('error', (event: Event) => {
        console.error(event);
        return reject(event);
      });
    });

    return result;
  }

  async renderComponent(opt: {
    templatePath: string;
    placeholderPageTag: string;
    pageComponentPath: string;
    componentTagName: string;
    engine: 'jsdom' | 'happy-dom';
    variables: any;
  }): Promise<RenderResult> {
    let layout = await this.renderTemplate(opt.templatePath, opt.variables);
    layout = await this.transformLayout(
      layout,
      opt.placeholderPageTag,
      opt.componentTagName,
    );
    const renderData =
      opt.engine === 'jsdom'
        ? await this.renderWithJSDom(layout, opt.componentTagName)
        : await this.renderWithHappyDom(layout, opt.componentTagName);
    return renderData;
  }
}
