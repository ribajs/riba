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
    protected readonly config: ConfigService,
    protected readonly ssr: SsrService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    this.theme = this.config.get<FullThemeConfig>('theme');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.route) {
      console.warn(
        'FIXME: req.route is not set! See https://github.com/nestjs/nest/issues/4129',
      );
    }

    const path = req.route?.path || req.baseUrl; // WORKAROUND
    const routeSettings = this.getRouteSettingsByRoute(path);

    if (!routeSettings) {
      return next();
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

      // TODO use the wrap method (so comment above)
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

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
