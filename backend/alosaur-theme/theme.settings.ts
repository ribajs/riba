import "https://deno.land/x/dotenv@v3.1.0/mod.ts"; // Auto load .env file
import {
  AppSettings,
  container,
  ViewRenderConfig,
} from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import {
  compileFile,
  Options as PugOptions,
} from "https://raw.githubusercontent.com/lumeland/pug/master/mod.ts";

import { AlosaurThemeConfig } from "./types/index.ts";

import { loadThemeConfig } from "./helper/config.ts";
import { ThemeArea } from "./theme.area.ts";
import { SsrMiddleware } from "./ssr.middleware.ts";
// import { ConfigService } from "./config.service.ts";
import { SsrService } from "./ssr.service.ts";

const VIEW_BASE_PATH = Deno.env.get("VIEW_BASE_PATH") ||
  `${Deno.cwd()}/../theme/views`;

// const SERVER_PORT = Deno.env.get("SERVER_PORT") || 8080;

const STATIC_ROOT = Deno.env.get("STATIC_ROOT") ||
  `${Deno.cwd()}/../theme/assets`;

const LOGGING = Deno.env.get("LOGGING") === "true" || false;

export const getSettings = async (alosaurThemeConfig: AlosaurThemeConfig) => {
  const themeConfig = await loadThemeConfig(alosaurThemeConfig);

  // container.register("theme", {
  //   useValue: themeConfig,
  // });

  // container.register("SsrService", {
  //   useClass: SsrService,
  // });

  SsrMiddleware.theme = themeConfig; // Workaround

  const themeAppSettings: AppSettings = {
    middlewares: [SsrMiddleware],
    providers: [
      {
        token: "theme",
        useValue: themeConfig,
      },
      // {
      //   token: "SsrService",
      //   useClass: SsrService,
      // },
      // {
      //   token: "SsrMiddleware",
      //   useClass: SsrMiddleware,
      // },
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
    getBody: async (path, model, config) => {
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

      return await pugTemplateFn(model as Record<string, unknown>);
    },
  };

  return {
    themeAppSettings,
    viewRenderConfig,
  };
};
