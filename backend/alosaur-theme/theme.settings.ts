import {
  AppSettings,
  compileFile,
  container,
  PugOptions,
  ViewRenderConfig,
} from "./deps.ts";

import { AlosaurThemeConfig } from "./types/index.ts";
import { loadThemeConfig } from "./helper/config.ts";
import { ThemeArea } from "./theme.area.ts";
import { SsrMiddleware } from "./ssr.middleware.ts";

const SERVER_PORT = Deno.env.get("SERVER_PORT") || 8080;

const LOGGING = Deno.env.get("LOGGING") === "true" || false;

export const getSettings = async (
  alosaurThemeConfig: Partial<AlosaurThemeConfig>,
) => {
  alosaurThemeConfig.themeDir = alosaurThemeConfig.themeDir ||
    Deno.env.get("THEME_DIR");

  alosaurThemeConfig.active = alosaurThemeConfig.active ||
    Deno.env.get("THEME_ACTIVE");

  if (!alosaurThemeConfig.themeDir) {
    throw new Error("themeDir is required!");
  }

  if (!alosaurThemeConfig.active) {
    throw new Error("active is required!");
  }

  const themeConfig = await loadThemeConfig(
    alosaurThemeConfig as AlosaurThemeConfig,
  );

  const themeAppSettings: AppSettings = {
    middlewares: [SsrMiddleware],
    providers: [
      {
        token: "theme",
        useValue: themeConfig,
      },
    ],
    areas: [ThemeArea],
    logging: LOGGING,
    staticConfig: {
      root: themeConfig.assetsDir,
    },
    container,
  };

  const viewRenderConfig: ViewRenderConfig = {
    type: "pug",
    basePath: themeConfig.viewsDir,
    getBody: (path, model, config) => {
      if (!path.endsWith(".pug")) {
        path = path + ".pug";
      }
      path = config.basePath + "/" + path;
      model = { ...themeConfig.templateVars, ...model };
      const pugOptions: PugOptions = {
        basedir: config.basePath,
        globals: [],
      };

      // TODO cache the result
      const pugTemplateFn = compileFile(path, pugOptions);

      return pugTemplateFn(model as Record<string, unknown>);
    },
  };

  const serverSettings: Deno.ListenOptions = {
    port: Number(SERVER_PORT),
  };

  return {
    themeAppSettings,
    viewRenderConfig,
    serverSettings,
  };
};
