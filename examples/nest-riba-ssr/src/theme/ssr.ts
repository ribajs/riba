import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { VirtualConsole, JSDOM } from 'jsdom';
import type { TypeOfComponent, Component, PageComponent } from '@ribajs/ssr';

@Injectable()
export class Ssr {
  async transformLayout(layout: string, pageTag: string) {
    layout = layout.replace(/ssr-page-component/gi, pageTag + '-page');
    return layout;
  }

  async render(layout: string) {
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('error', (...args: any[]) => console.error(...args));
    virtualConsole.on('warn', (...args: any[]) => console.warn(...args));
    virtualConsole.on('info', (...args: any[]) => console.info(...args));
    virtualConsole.on('dir', (...args: any[]) => console.dir(...args));
    virtualConsole.on('jsdomError', (...args: any[]) => console.error(...args));

    const { window, serialize } = new JSDOM(layout, {
      virtualConsole,
      runScripts: 'outside-only', // 'dangerously',
      includeNodeLocations: true,
    });

    return new Promise((resolve, reject) => {
      window.document.addEventListener('DOMContentLoaded', () => {
        console.debug('DOMContentLoaded');
        const html = serialize();
        resolve(html);
      });
      window.addEventListener('error', (event) => {
        console.error(event);
        reject(event);
      });
    });

    // const html = serialize();
    // console.debug('html', html);
    // // "console.debug('window', window);
    // return html;
  }
}
