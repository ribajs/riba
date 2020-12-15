import { Module } from '@nestjs/common';
import { PageService } from './page/page.service';
import { PageController } from './page/page.controller';
import { LinkListService } from './link-list/link-list.service';
import { GlobalService } from './global/global.service';
import { Ssr } from './ssr';

@Module({
  providers: [PageService, LinkListService, GlobalService, Ssr],
  controllers: [PageController],
})
export class ThemeModule {}
