import type { Route } from "./route";
import type { SupportedTemplateEngines } from "./template-engines";

export interface ThemeConfig {
  name: string;
  active?: string;
  viewEngine: SupportedTemplateEngines;
  assetsDir: string;
  viewsDir: string;
  ssr: {
    engine?: "jsdom" | "happy-dom";
    rootTag?: string;
    template?: string;
  };
  pageComponentsDir: string;
  routes: Route[];
}
