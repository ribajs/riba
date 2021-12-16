import {
  container,
  HttpContext,
  Middleware,
  MiddlewareTarget,
} from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import type { FullThemeConfig } from "./types/index.ts";
import type { RequestContext } from "../deno-ssr/mod.ts";
import { SsrService } from "./ssr.service.ts";
import { handleError } from "./error-handler.ts";
import { Cache } from "https://deno.land/x/local_cache@1.0/mod.ts";
import {
  Key,
  pathToRegexp,
} from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";
import { qs } from "https://deno.land/x/deno_qs@0.0.1/mod.ts";

@Middleware(new RegExp("/"))
export class SsrMiddleware implements MiddlewareTarget {
  log = console;
  cacheManager?: Cache<string, string>;
  private theme?: FullThemeConfig;
  private ssr?: SsrService;
  constructor() {}

  // Workaround
  init() {
    this.log.debug("[SsrMiddleware] Init");

    this.ssr = container.resolve(SsrService);

    this.theme = container.resolve("theme");

    if (!this.theme) {
      throw new Error(
        "Theme config not defined! " + JSON.stringify(this.theme),
      );
    }

    const ttl = this.theme.cache?.ttl || 200;

    this.cacheManager = new Cache(ttl);
  }

  onPreRequest() {
    return;
  }

  async onPostRequest(context: HttpContext) {
    // Workaround
    if (!this.theme || !this.cacheManager || !this.ssr) {
      this.init();
    }

    const route = context.request.parserUrl;
    const rs = this.getRouteSettingsByUrl(route);

    if (!rs) {
      this.log.warn(
        "[SsrMiddleware] routeSettings is not set! " + route.pathname,
      );
      return;
    }

    const req: RequestContext = {
      url: context.request.url,
      hostname: context.request.parserUrl.hostname,
      method: context.request.method,
      protocol: context.request.parserUrl.protocol,
      params: rs.params,
      path: rs.path,
      query: rs.query,
      status: 200,
    };

    if (!this.cacheManager) {
      throw new Error(
        "[SsrMiddleware] cacheManager not defined! " +
          JSON.stringify(this.cacheManager),
      );
    }

    try {
      const cacheKey = req.url;

      const render = async () => {
        if (!this.theme) {
          throw new Error(
            "[SsrMiddleware] Theme config not defined!",
          );
        }

        if (!this.ssr) {
          throw new Error("[SsrMiddleware] SsrService not defined!");
        }

        const sharedContext = this.ssr.getSharedContext(
          req,
          this.theme.templateVars,
        );

        this.log.debug(
          `[SsrMiddleware] START: Render page component: ${rs.settings.component} for ${req.url}`,
        );
        try {
          const page = await this.ssr.renderComponent({
            componentTagName: rs.settings.component,
            sharedContext,
          });
          this.log.debug(
            `[SsrMiddleware] END: Render page component: ${rs.settings.component} for ${req.url}`,
          );
          return page.html;
        } catch (error) {
          this.log.error(error);
          throw handleError(error);
        }
      };

      let result: string;
      if (this.cacheManager.has(cacheKey)) {
        result = this.cacheManager.get(cacheKey);
        this.log.debug(`[SsrMiddleware] Cache used`);
      } else {
        // We need the try-catch here because we are inside a callback
        try {
          result = await render();
        } catch (error) {
          this.log.error(error);
          throw handleError(error);
        }
        this.cacheManager.set(cacheKey, result);
      }

      context.response.body = result;
      context.response.headers.set("Content-Type", "text/html");
      context.response.status;
      return;
    } catch (error) {
      this.log.error(error);
      throw handleError(error);
    }
  }

  private parseRoutePath = (url: URL, path: string) => {
    const keys: Key[] = [];
    const regexp = pathToRegexp(path, keys);
    const match = url.pathname.match(regexp);
    return {
      match,
      keys,
    };
  };

  private findRouteSettingsByUrl(url: URL) {
    const routes = this.theme?.routes || [];
    for (const route of routes) {
      for (const path of route.path) {
        const data = this.parseRoutePath(url, path);
        if (data.match) {
          return {
            ...data,
            settings: route,
            path,
          };
        }
      }
    }
    return undefined;
  }

  /**
   * Get the route settings for a express route like route, e.g. /pages/:slug
   * @param url
   * @returns
   */
  private getRouteSettingsByUrl(url: URL) {
    const data = this.findRouteSettingsByUrl(url);

    if (!data || !data.match) {
      return undefined;
    }

    const query = qs.parse(url.search, { ignoreQueryPrefix: true });

    const path = data.match[0];
    const params: Record<string, string> = {};
    for (let i = 1; i < data.match.length; i++) {
      const val = decodeURIComponent(data.match[i]);
      const key = data.keys[i - 1].name;
      params[key] = val;
    }

    return { ...data, query, params, originalPath: path };
  }
}
