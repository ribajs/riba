import {
  AppSettings,
  compileFile,
  container,
  dotenv,
  PugOptions,
  resolve,
  ViewRenderConfig,
} from "./deps.ts";

import { AlosaurThemeConfig } from "./types/index.ts";
import { loadThemeConfig } from "./helper/config.ts";
import { ThemeArea } from "./theme.area.ts";
import { SsrMiddleware } from "./ssr.middleware.ts";

const env = dotenv.config({ path: resolve(Deno.cwd(), ".env") });

const SERVER_PORT = env.SERVER_PORT || 8080;

const LOGGING = env.LOGGING === "true" || false;

export const getSettings = async (
  alosaurThemeConfig: Partial<AlosaurThemeConfig>,
) => {
  alosaurThemeConfig.themeDir = alosaurThemeConfig.themeDir ||
    env.THEME_DIR;

  alosaurThemeConfig.active = alosaurThemeConfig.active ||
    env.THEME_ACTIVE;

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
      {
        token: SsrMiddleware,
        useClass: SsrMiddleware,
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
