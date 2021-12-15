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
    private readonly config: ConfigService,
    private readonly ssr: SsrService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    const theme = config.get<FullThemeConfig>('theme');
    if (!theme) {
      throw new Error('Theme config not defined!');
    }
    this.theme = theme;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.route) {
      return next('req.route is not set!');
    }

    const routeSettings = this.getRouteSettingsByRoute(req.route.path);

    if (!routeSettings) {
      return next('routeSettings is not set!');
    }

    try {
      const cacheOptions = routeSettings.cache ||
        this.theme.cache || { ttl: 200 };
      const cacheKey = req.url;

      const render = async () => {
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
      };

      // const html = await this.cacheManager.wrap<string>(
      //   cacheKey,
      //   render,
      //   cacheOptions,
      // );
      // return res.send(html);

      // TODO use the wrap method (see comment above)
      this.cacheManager.get(cacheKey, async (error, result) => {
        if (error) {
          this.log.error(error);
          return next(handleError(error));
        }

        if (result) {
          this.log.debug(`Cache used`);
          return res.send(result);
        }

        // We need the try catch here because we are inside if a callback
        try {
          result = await render();
        } catch (error) {
          return next(handleError(error));
        }

        this.cacheManager.set(cacheKey, result, cacheOptions);
        res.send(result);
        if (global.gc) {
          this.log.debug(`run garbage collector`);
          global.gc();
        }
        return;
      });
    } catch (error) {
      this.log.error(error);
      return next(handleError(error));
    }
  }

  private getRouteSettingsByRoute(routePath: string) {
    const routes = this.theme.routes || [];
    return routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
