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
import { pathToRegexp, Key } from 'path-to-regexp';
import { parse as queryparse } from 'qs';

import { Route } from '@ribajs/ssr';
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
    let routeSettings: Route | undefined;

    if (req.route) {
      routeSettings = this.getRouteSettingsByRoute(req.route.path);
    } else {
      console.warn('FIXME: req.route is not set!');

      // WORKAROUND
      const _route = this.getRouteSettingsByUrl((req as any)._parsedUrl as URL);
      routeSettings = _route.settings;
      req.params = _route.params;
      req.query = _route.query;
    }

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

  /**
   * WORKAROUND if req.route is missing
   */
  protected getRouteSettingsByUrl(url: URL) {
    let keys: Key[];
    let match: RegExpMatchArray;
    const settings = this.theme.routes.find((route) => {
      for (const path of route.path) {
        const _keys: Key[] = [];
        const _regexp = pathToRegexp(path, _keys);
        const _match = url.pathname.match(_regexp);
        if (!!_match) {
          match = _match;
          keys = _keys;
          return true;
        }
      }
    });

    if (!settings) {
      return {
        settings: undefined,
        query: {},
        params: {},
        path: undefined,
        keys: [],
      };
    }

    const query = queryparse(url.search, { ignoreQueryPrefix: true });

    const path = match[0];
    const params: any = {};
    for (let i = 1; i < match.length; i++) {
      const val = decodeURIComponent(match[i]);
      const key = keys[i - 1].name;
      params[key] = val;
    }

    return { settings, query, params, path, keys };
  }

  protected getRouteSettingsByRoute(routePath: string) {
    return this.theme.routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
