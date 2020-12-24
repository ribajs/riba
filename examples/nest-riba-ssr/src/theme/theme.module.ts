import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SsrService } from './ssr.service';
import { themeConfig } from '../config/config';
import { SsrMiddleware } from './ssr.middleware';
import { ThemeConfig } from '@ribajs/ssr';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [themeConfig],
    }),
  ],
  providers: [SsrService, SsrMiddleware],
  controllers: [],
})
export class ThemeModule {
  constructor(
    protected config: ConfigService,
    protected ssrMiddleware: SsrMiddleware,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // Dynamic routes
    const theme = this.config.get<ThemeConfig>('theme');
    for (const route of theme.routes) {
      consumer
        .apply(SsrMiddleware)
        .forRoutes({ path: route.path[0], method: RequestMethod.GET });
    }
  }
}
