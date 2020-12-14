import { Get, Controller, Render, Param } from '@nestjs/common';
import { GlobalService } from '../global/global.service';
import { PageService } from './page.service';

/**
 * Render pages like page.pug and page.other-template.pug
 */
@Controller('pages')
export class PageController {
  constructor(protected global: GlobalService, protected page: PageService) {}

  @Get(':slug')
  @Render('page') // TODO add support for other page templates linke page.other-template.pug, see https://docs.nestjs.com/techniques/mvc#template-rendering
  bySlug(@Param('slug') slug: string) {
    return {
      ...this.global.get(),
      ...this.page.get(slug),
    };
  }
}
