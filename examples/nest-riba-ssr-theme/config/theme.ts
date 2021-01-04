import type { ThemeConfig } from "@ribajs/ssr";

export const themeConfig: ThemeConfig = {
  name: "Demo Theme",
  viewEngine: "pug",
  assetsDir: "assets",
  viewsDir: "templates",
  pageComponentsDir: "scripts/pages",
  ssr: {
    engine: "jsdom",
    rootTag: "ssr-root-page",
    template: "page-component.pug",
  },
  routes: [
    {
      path: ["/"],
      component: "index-page",
    },
    {
      path: ["/pages/:handle"],
      component: "pages-page",
    },
  ],
};
