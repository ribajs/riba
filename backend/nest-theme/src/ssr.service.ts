import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/index';
import { SsrService as Ssr } from '@ribajs/node-ssr';
import { resolve } from 'path';

@Injectable()
export class SsrService {
  private theme: FullThemeConfig;
  private ssr: Ssr;

  getSharedContext: Ssr['getSharedContext'];
  render: Ssr['render'];
  renderComponent: Ssr['renderComponent'];

  constructor(config: ConfigService) {
    const theme = config.get<FullThemeConfig>('theme');
    if (!theme) {
      throw new Error('Theme config not defined!');
    }
    this.theme = theme;
    this.ssr = new Ssr({
      defaultRootTag: this.theme.ssr?.rootTag,
      defaultTemplateEngine: this.theme.viewEngine,
      sourceFileDir: resolve(this.theme.assetsDir, 'ssr'),
      templateDir: this.theme.viewsDir,
    });
    this.getSharedContext = this.ssr.getSharedContext;
    this.render = this.ssr.render;
    this.renderComponent = this.ssr.renderComponent;
  }
}
