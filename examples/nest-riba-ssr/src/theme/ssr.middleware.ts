import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThemeConfig } from '@ribajs/ssr';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  theme: ThemeConfig;
  constructor(protected config: ConfigService) {
    this.theme = this.config.get<ThemeConfig>('theme');
  }
  use(req: any, res: any, next: () => void) {
    console.log('SsrMiddleware req.route', req.route.path)
    // Start ssr here
    next();
  }
}
