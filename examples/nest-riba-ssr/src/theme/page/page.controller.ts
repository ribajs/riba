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
    const data = {
      ...this.global.get(),
      ...this.page.get('index'),
    };
    const render = promisify<string>(
      res.render.bind(res, 'ssr-page-component', data),
    );
    let layout = await render();
    layout = await this.ssr.transformLayout(layout, 'index');

    try {
      const template = await this.ssr.render(layout);
      this.log.debug('template: ' + template);
    } catch (error) {
      console.error(error);
    }

    // this.log.debug('data: ' + JSON.stringify(data));
    this.log.debug('layout: ' + layout);

    // return template;
    return res.send(layout);
  }
}
