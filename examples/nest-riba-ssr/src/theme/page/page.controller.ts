import { Get, Controller, Res, Logger } from '@nestjs/common';
import type { Response } from 'express';

import { GlobalService } from '../global/global.service';
import { PageService } from './page.service';
import { Ssr } from '../ssr';

/**
 * Renders home
 */
@Controller()
export class PageController {
  log = new Logger(this.constructor.name);

  constructor(
    protected global: GlobalService,
    protected page: PageService,
    protected ssr: Ssr,
  ) {}

  /**
   *
   * @param res
   * @see https://docs.nestjs.com/techniques/mvc#dynamic-template-rendering
   */
  @Get()
  async index(@Res() res: Response) {
    const variables = {
      ...this.global.get(),
      ...this.page.get('index'),
    };
    this.log.debug('PageController');
    try {
      const page = await this.ssr.renderComponent({
        engine: 'happy-dom',
        placeholderPageTag: 'page-component',
        templatePath: 'page-component.pug',
        pageComponentPath: 'index/index.page-component.ts',
        componentTagName: 'index-page',
        variables,
      });
      return res.send(page.html);
    } catch (error) {
      this.log.error(error);
      return res.status(500).json(error);
    }
  }
}
