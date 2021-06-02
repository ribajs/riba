import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  NestMiddleware,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/theme-config';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
import { handleError } from './error-handler';
import type { Cache } from 'cache-manager';
@Injectable()
export class SsrMiddleware implements NestMiddleware {
  theme: FullThemeConfig;
  log = new Logger(this.constructor.name);
  constructor(
    protected config: ConfigService,
    protected ssr: SsrService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    this.theme = this.config.get<FullThemeConfig>('theme');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const routeSettings = this.getRouteSettingsByRoute(req.route.path);

    if (!routeSettings) {
      return next();
    }

    try {
      const cache = routeSettings.cache || { ttl: 3000 };
      const cacheKey = req.url;

      const html = await this.cacheManager.wrap<string>(
        cacheKey,
        async () => {
          const sharedContext = await this.ssr.getSharedContext(
            req,
            this.theme.templateVars,
          );

          this.log.debug(
            `START: Render page component: ${routeSettings.component} for ${req.url}`,
          );
          const page = await this.ssr.renderComponent({
            componentTagName: routeSettings.component,
            sharedContext,
          });
          this.log.debug(
            `END: Render page component: ${routeSettings.component} for ${req.url}`,
          );
          return page.html;
        },
        cache,
      );

      return res.send(html);
    } catch (error) {
      this.log.error(error);
      return next(handleError(error));
    }
  }

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      // this.log.debug(
      //   `getRouteSettingsByRoute: ${routePath} ${
      //     route.path
      //   } ${route.path.includes(routePath)}`,
      // );
      return route.path.includes(routePath);
    });
  }
}
