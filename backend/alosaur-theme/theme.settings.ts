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

const VIEW_BASE_PATH = Deno.env.get("VIEW_BASE_PATH") ||
  `${Deno.cwd()}/../theme/views`;

const STATIC_ROOT = Deno.env.get("STATIC_ROOT") ||
  `${Deno.cwd()}/../theme/assets`;

const LOGGING = Deno.env.get("LOGGING") === "true" || false;

export const getSettings = async (alosaurThemeConfig: AlosaurThemeConfig) => {
  const themeConfig = await loadThemeConfig(alosaurThemeConfig);

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
      root: STATIC_ROOT,
    },
    container,
  };

  const viewRenderConfig: ViewRenderConfig = {
    type: "pug",
    basePath: VIEW_BASE_PATH,
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

  return {
    themeAppSettings,
    viewRenderConfig,
  };
};
