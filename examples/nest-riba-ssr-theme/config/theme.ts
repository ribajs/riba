import type { ThemeConfig } from "@ribajs/ssr";

export const themeConfig: ThemeConfig = {
  name: "Demo Theme",
  viewEngine: "pug",
  assetsDir: "assets",
  viewsDir: "templates",
  pageComponentsDir: "scripts/pages",
  ssr: {
    engine: 'happy-dom'
  },
  // TODO use https://vaadin.com/router?
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
