import {
  container,
  HttpContext,
  Inject,
  Middleware,
  MiddlewareTarget,
  NotFoundError,
} from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import type { FullThemeConfig } from "./types/index.ts";
import { SsrService } from "./ssr.service.ts";
import { handleError } from "./error-handler.ts";
import { Cache } from "https://deno.land/x/local_cache@1.0/mod.ts";

@Middleware(new RegExp("/"))
export class SsrMiddleware implements MiddlewareTarget {
  log = console;
  cacheManager?: Cache<string, string>;
  static theme?: FullThemeConfig;
  theme?: FullThemeConfig;
  constructor(private ssr: SsrService) {}

  // Workaround
  init() {
    if (!SsrMiddleware.theme) {
      throw new Error(
        "Theme config not defined! " + JSON.stringify(SsrMiddleware.theme),
      );
    }

    this.ssr = container.resolve(SsrService);

    this.theme = SsrMiddleware.theme;
    const ttl = SsrMiddleware.theme?.cache?.ttl || 200;

    this.cacheManager = new Cache(ttl);
  }

  onPreRequest() {
    return;
  }

  async onPostRequest(context: HttpContext) {
    if (!this.theme || !this.cacheManager) {
      this.init();
    }

    const req = context.request;
    const route = req.parserUrl;
    const routeSettings = this.getRouteSettingsByRoute(route.pathname);

    if (!routeSettings) {
      this.log.warn("routeSettings is not set! " + route.pathname);
      return;
      // throw new NotFoundError();
    }

    if (!this.cacheManager) {
      throw new Error(
        "cacheManager not defined! " + JSON.stringify(this.cacheManager),
      );
    }

    try {
      const cacheKey = req.url;

      const render = async () => {
        if (!this.theme) {
          throw new Error(
            "Theme config not defined! " + JSON.stringify(this.theme),
          );
        }

        const sharedContext = await this.ssr.getSharedContext(
          req,
          this.theme.templateVars,
        );

        this.log.debug(
          `START: Render page component: ${routeSettings.component} for ${req.url}`,
        );
        try {
          const page = await this.ssr.renderComponent({
            componentTagName: routeSettings.component,
            sharedContext,
          });
          this.log.debug(
            `END: Render page component: ${routeSettings.component} for ${req.url}`,
          );
          this.log.debug("Result", page.html);
          return page.html;
        } catch (error) {
          this.log.error(error);
          throw handleError(error);
        }
      };

      let result: string;
      if (this.cacheManager.has(cacheKey)) {
        result = this.cacheManager.get(cacheKey);
        this.log.debug(`Cache used`);
      } else {
        // We need the try catch here because we are inside if a callback
        try {
          result = await render();
        } catch (error) {
          this.log.error(error);
          throw handleError(error);
        }
        this.cacheManager.set(cacheKey, result);
      }

      // TODO is this the right way?
      context.response.body = result;
      context.response.headers.set("Content-Type", "text/html");
      context.response.status;
      return;
    } catch (error) {
      this.log.error(error);
      throw handleError(error);
    }
  }

  private getRouteSettingsByRoute(routePath: string) {
    const routes = this.theme?.routes || [];
    return routes.find((route) => {
      return route.path.includes(routePath);
    });
  }
}
