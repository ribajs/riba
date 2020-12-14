import { Get, Controller, Render, Logger } from '@nestjs/common';
import { GlobalService } from '../global/global.service';
import { IndexService } from './index.service';

/**
 * Renders home
 */
@Controller()
export class IndexController {
  log = new Logger(this.constructor.name);

  constructor(protected global: GlobalService, protected index: IndexService) {}

  @Get()
  @Render('index')
  root() {
    const data = {
      ...this.global.get(),
      ...this.index.get(),
    };
    this.log.debug('data: ' + JSON.stringify(data));
    return data;
  }
}
