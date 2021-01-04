import type { Route } from "./route";
import type { SupportedTemplateEngines } from "./template-engines";
import type { RenderEngine } from "./render-engine";

export interface ThemeConfig {
  name: string;
  active?: string;
  viewEngine: SupportedTemplateEngines;
  assetsDir: string;
  viewsDir: string;
  ssr: {
    engine?: RenderEngine;
    rootTag?: string;
    template?: string;
  };
  pageComponentsDir: string;
  routes: Route[];
}
