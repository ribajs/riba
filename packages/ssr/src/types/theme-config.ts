import type { Route } from "./route";
import type { ErrorRoutes } from "./error-routes";
import type { SupportedTemplateEngines } from "./template-engines";
import type { Cache } from "./cache";
export interface ThemeConfig {
  name: string;
  viewEngine: SupportedTemplateEngines;
  assetsDir: string;
  viewsDir: string;
  ssr?: {
    rootTag?: string;
    template?: string;
  };
  pageComponentsDir?: string;
  routes?: Route[];
  errorRoutes: ErrorRoutes;
  timeout?: number;
  cache: Cache;
}
