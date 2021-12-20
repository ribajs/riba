import {
  Cache,
  container,
  HttpContext,
  HttpError,
  Key,
  Middleware,
  MiddlewareTarget,
  pathToRegexp,
  qs,
  RenderResult,
  RequestContext,
} from "./deps.ts";
import type { FullThemeConfig } from "./types/index.ts";
import { SsrService } from "./ssr.service.ts";
import { handleError } from "./error-handler.ts";
import { HttpExceptionFilter } from "./filters/http-exception.filter.ts";

@Middleware(new RegExp("/"))
export class SsrMiddleware implements MiddlewareTarget {
  log = console;
  cacheManager?: Cache<string, RenderResult>;
  private theme?: FullThemeConfig;
  private ssr?: SsrService;
  private httpExceptionFilter?: HttpExceptionFilter;
  constructor() {}

  // Workaround
  init() {
    this.log.debug("[SsrMiddleware] Init");

    this.ssr = container.resolve(SsrService);
    this.theme = container.resolve("theme");
    this.httpExceptionFilter = container.resolve(HttpExceptionFilter);

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

    const cacheKey = req.url;

    const render = async (): Promise<RenderResult> => {
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
        const renderResult = await this.ssr.renderComponent({
          componentTagName: rs.settings.component,
          sharedContext,
        });
        this.log.debug(
          `[SsrMiddleware] END: Render page component: ${rs.settings.component} for ${req.url}`,
        );
        return renderResult;
      } catch (error: any) {
        this.log.error(error);
        throw handleError(error);
      }
    };

    let renderResult: RenderResult;
    if (this.cacheManager.has(cacheKey)) {
      renderResult = this.cacheManager.get(cacheKey);
      this.log.debug(`[SsrMiddleware] Cache used`);
    } else {
      // We need the try-catch here because we are inside a callback
      try {
        renderResult = await render();
        // TODO send log to browser console
        if (renderResult.output && this.ssr) {
          this.ssr.logOutput(renderResult.output);
        }
      } catch (error) {
        this.log.error(error);
        return await this.httpExceptionFilter?.catch(
          handleError(error),
          context,
        );
      }
      this.cacheManager.set(cacheKey, renderResult);
    }

    try {
      return this.send(context, renderResult.html);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }

  /**
   * Rendered SSR Page response
   * @param context
   * @param body
   * @param status
   */
  private send(context: HttpContext, body: string, status = 200) {
    context.response.body = body;
    context.response.headers.set("Content-Type", "text/html");
    context.response.status = status;
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
