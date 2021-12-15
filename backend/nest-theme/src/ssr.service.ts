import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/index';
import { SsrService as Ssr } from '@ribajs/node-ssr';
import { resolve } from 'path';

@Injectable()
export class SsrService {
  private ssr: Ssr;

  getSharedContext: Ssr['getSharedContext'];
  render: Ssr['render'];
  renderComponent: Ssr['renderComponent'];

  constructor(config: ConfigService) {
    const theme = config.get<FullThemeConfig>('theme');
    if (!theme) {
      throw new Error('Theme config not defined!');
    }
    this.ssr = new Ssr({
      defaultRootTag: theme.ssr?.rootTag,
      defaultTemplateEngine: theme.viewEngine,
      defaultTemplateFile: theme.ssr?.template,
      sourceFileDir: resolve(theme.assetsDir, 'ssr'),
      templateDir: theme.viewsDir,
    });
    this.getSharedContext = this.ssr.getSharedContext.bind(this.ssr);
    this.render = this.ssr.render.bind(this.ssr);
    this.renderComponent = this.ssr.renderComponent.bind(this.ssr);
  }
}
