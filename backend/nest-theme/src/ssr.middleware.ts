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

        result = await render();
        this.cacheManager.set(cacheKey, result, cacheOptions);
        return res.send(result);
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
