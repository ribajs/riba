import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ThemeConfig, RenderEngine } from '@ribajs/ssr';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  theme: ThemeConfig;
  log = new Logger(this.constructor.name);
  constructor(protected config: ConfigService, protected ssr: SsrService) {
    this.theme = this.config.get<ThemeConfig>('theme');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    this.log.debug('SsrMiddleware req.route', req.route.path);
    const routeSettings = this.getRouteSettingsByRoute(req.route.path);

    if (!routeSettings) {
      return next();
    }

    // this.log.debug(`Route found: ${JSON.stringify(routeSettings)}`);

    const sharedContext = await this.ssr.getSharedContext(req);

    // this.log.debug('Template variables:');
    // this.log.debug(sharedContext);

    const forceEngine =
      (req.query['force-engine'] as RenderEngine) || undefined;
    if (forceEngine) {
      this.log.debug(`Force render engine: ${forceEngine}`);
    }

    try {
      const page = await this.ssr.renderComponent({
        componentTagName: routeSettings.component,
        sharedContext,
        engine: forceEngine,
      });
      this.log.debug(`Render page component: ${routeSettings.component}`);
      // this.log.debug(`page: ${page.html}`);
      return res.send(page.html);
    } catch (error) {
      this.log.error('Error on render component');
      console.error(error);
      return res.status(500).json(error);
    }
  }

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
