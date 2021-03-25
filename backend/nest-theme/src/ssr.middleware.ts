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
    this.log.debug('SsrMiddleware req.route', req.route.path);
    const routeSettings = this.getRouteSettingsByRoute(req.route.path);

    if (!routeSettings) {
      return next();
    }

    // this.log.debug(`Route found: ${JSON.stringify(routeSettings)}`);

    const sharedContext = await this.ssr.getSharedContext(
      req,
      this.theme.templateVars,
    );

    // this.log.debug('Template variables:');
    // this.log.debug(sharedContext);

    try {
      const page = await this.ssr.renderComponent({
        componentTagName: routeSettings.component,
        sharedContext,
      });
      this.log.debug(`Rendered page component: ${routeSettings.component}`);
      // this.log.debug(`page: ${page.html}`);
      return res.send(page.html);
    } catch (error) {
      this.log.error(error);
      return res.status(500).json({ error: 'error' });
      return res.status(500).json({ error: error.message });
      // return next(handleError(error));
      // return next(error);
    }
  }

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
