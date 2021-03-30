import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/theme-config';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
import { handleError } from './error-handler';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  theme: FullThemeConfig;
  log = new Logger(this.constructor.name);
  constructor(protected config: ConfigService, protected ssr: SsrService) {
    this.theme = this.config.get<FullThemeConfig>('theme');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const routeSettings = this.getRouteSettingsByRoute(req.route.path);

    if (!routeSettings) {
      return next();
    }

    this.log.debug('');
    this.log.debug(req.url);
    this.log.debug(req.params);
    this.log.debug('');

    const sharedContext = await this.ssr.getSharedContext(
      req,
      this.theme.templateVars,
    );

    try {
      const page = await this.ssr.renderComponent({
        componentTagName: routeSettings.component,
        sharedContext,
      });
      this.log.debug(
        `Rendered page component: ${routeSettings.component} for ${req.url}`,
      );
      return res.send(page.html);
    } catch (error) {
      this.log.error(error);
      return next(handleError(error));
    }
  }

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
