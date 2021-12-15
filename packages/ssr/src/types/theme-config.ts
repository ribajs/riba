import type { Route } from "./route";
import type { ErrorRoutes } from "./error-routes";
import type { SupportedTemplateEngines } from "./template-engines";
import type { Cache } from "./cache";
export interface ThemeConfig {
  /** The name name of the theme, e.g. "Demo Theme" */
  name: string;
  /** The template engine you use in this theme by default, e.g. "pug" */
  viewEngine: SupportedTemplateEngines;
  /** The directory where your theme stores its public asset files, e.g. "assets" */
  assetsDir: string;
  /** The directory in which your template view files are stored, e.g. "templates" */
  viewsDir: string;
  ssr?: {
    /**
     * The root tag is an html tag name you defined in your initial template.
     * This will be exchanged with the tag name of the page component in the render process.
     **/
    rootTag?: string;
    /** The template name of your entry template in which you defined the rootTag */
    template?: string;
  };
  /**
   * The directory where your page components (implemented as custom elements) are stored, e.g. "scripts/ssr/pages"
   **/
  pageComponentsDir?: string;
  /**
   * Here you define the routes that exist in your theme.
   * Each route requires a page component that is used to deliver the resulting html through server-side rendering
   **/
  routes?: Route[];
  /** The routes used for error pages. For example, for 404 and 500 error codes */
  errorRoutes: ErrorRoutes;
  /** The timeout is used as timeout for the server side rendering, if the server side rendering takes too long it will be aborted after this timeout. */
  timeout?: number;
  /** Cache settings, set the ttl to 0 to disable the cache */
  cache: Cache;
}
