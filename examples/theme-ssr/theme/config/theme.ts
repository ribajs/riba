// Note: This config is used by nest

import type { ThemeConfigFile, ThemeConfig } from "@ribajs/nest-theme";

export const config: ThemeConfigFile = (env: string | undefined) => {
  const config: ThemeConfig = {
    name: "Demo Theme",
    viewEngine: "pug",
    assetsDir: "assets",
    viewsDir: "templates",
    pageComponentsDir: "scripts/pages",
    ssr: {
      rootTag: "ssr-root-page",
      template: "page-component.pug",
    },
    cache: {
      // One year cache on production
      ttl: env === "production" ? 300 : 0,
      refresh: {
        active: false,
      },
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
    errorRoutes: {
      404: {
        component: "not-found-page",
      },
      500: {
        component: "error-page",
      },
    },
  };
  return config;
};
