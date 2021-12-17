import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  NestMiddleware,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
import type { Cache } from 'cache-manager';
import type { RenderResult } from '@ribajs/node-ssr';
import { handleError } from '@ribajs/node-ssr';
@Injectable()
export class SsrMiddleware implements NestMiddleware {
  theme: FullThemeConfig;
  log = new Logger(this.constructor.name);
  constructor(
    readonly config: ConfigService,
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

      const render = async (): Promise<RenderResult> => {
        const sharedContext = await this.ssr.getSharedContext(
          req,
          this.theme.templateVars,
        );

        this.log.debug(
          `START: Render page component: ${routeSettings.component} for ${req.url}`,
        );
        const renderResult = await this.ssr.renderComponent({
          componentTagName: routeSettings.component,
          sharedContext,
          output: 'store',
        });
        this.log.debug(
          `END: Render page component: ${routeSettings.component} for ${req.url}`,
        );
        return renderResult;
      };

      this.cacheManager.get<RenderResult>(cacheKey, async (error, result) => {
        if (error) {
          this.log.error(error);
          return next(handleError(error, result?.output));
        }

        if (result) {
          this.log.debug(`Cache used`);
          return res.send(result.html);
        }

        // We need the try catch here because we are inside if a callback
        try {
          result = await render();
        } catch (error) {
          return next(handleError(error, result?.output));
        }

        this.cacheManager.set<RenderResult>(cacheKey, result, cacheOptions);
        // TODO send log to browser console
        if (result.output) {
          this.ssr.logOutput(result.output);
        }
        res.send(result.html);
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
