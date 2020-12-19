import type { Route } from "./route";

export interface ThemeConfig {
  name: string;
  active?: string;
  viewEngine: "pug" | "twig" | "liquid";
  assetsDir: string;
  viewsDir: string;
  ssr: {
    engine: 'jsdom' | 'happy-dom'
  },
  pageComponentsDir: string;
  routes: Route[];
}
