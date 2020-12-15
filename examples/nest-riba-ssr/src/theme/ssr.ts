import { Injectable } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import { HappyDOMContext } from '@happy-dom/server-rendering';
import { Script } from 'vm';
import { ConfigService } from '@nestjs/config';
import { resolve, extname } from 'path';
import * as renderEngine from 'consolidate';
import { promises as fs } from 'fs';
// import type { TypeOfComponent, Component, PageComponent } from '@ribajs/ssr';

@Injectable()
export class Ssr {
  constructor(protected config: ConfigService) {}

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

  async renderWithJSDom(layout: string) {
    const virtualConsole = new VirtualConsole();
    virtualConsole.sendTo(console);

    const dom = new JSDOM(layout, {
      virtualConsole,
      runScripts: 'outside-only', // 'dangerously',
      includeNodeLocations: true,
    });

    return new Promise<string>((resolve, reject) => {
      dom.window.document.addEventListener('DOMContentLoaded', async () => {
        console.debug('DOMContentLoaded');
        const { vendors, main } = await this.readSsrScripts();
        const script = new Script(vendors + ' ' + main);
        const vmContext = dom.getInternalVMContext();
        console.debug('Execute scripts...');
        try {
          script.runInContext(vmContext);
          // dom.window.eval(scriptSource);
        } catch (error) {
          reject(error);
        }

        console.debug('Wait for custom element...');
        await dom.window.customElements.whenDefined('index-page');

        // console.debug('Riba', dom.window.riba);

        console.debug('Scripts executed!');
        const html = dom.serialize();
        resolve(html);
      });
      dom.window.addEventListener('error', (event: Event) => {
        console.error(event);
        reject(event);
      });
    });
  }

  async renderWithHappyDom(layout: string) {
    const context = new HappyDOMContext();
    const { vendors, main } = await this.readSsrScripts();
    const vendorsScript = new Script(vendors);
    const mainScript = new Script(main);
    const result = await context.render({
      html: layout,
      scripts: [vendorsScript, mainScript],
      customElements: {
        openShadowRoots: false,
        extractCSS: false,
        scopeCSS: false,
        addCSSToHead: false,
      },
    });
    return result.html;
  }

  async render(opt: {
    layoutPath: string;
    placeholderPageTag: string;
    pageTag: string;
    dom: 'jsdom' | 'happy-dom';
    variables: any;
  }) {
    let layout = await this.renderTemplate(opt.layoutPath, opt.variables);
    layout = await this.transformLayout(
      layout,
      opt.placeholderPageTag,
      opt.pageTag,
    );
    const template =
      opt.dom === 'jsdom'
        ? await this.renderWithJSDom(layout)
        : await this.renderWithHappyDom(layout);
    return template;
  }
}
