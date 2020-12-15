import { Get, Controller, Render, Param, Res, Logger } from '@nestjs/common';
import { promisify } from 'util';
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
    try {
      const page = await this.ssr.render({
        dom: 'happy-dom',
        placeholderPageTag: 'page-component',
        layoutPath: 'page-component.pug',
        pageTag: 'index-page',
        variables,
      });
      res.send(page);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}
