import { exists, resolve, YamlLoader } from "../deps.ts";

import type {} from "../../deno-ssr/mod.ts";
import { SUPPORTED_TEMPLATE_ENGINES } from "../../deno-ssr/mod.ts";
import type {
  AlosaurThemeConfig,
  FullThemeConfig,
  ThemeConfig,
} from "../types/index.ts";

const validateThemeConfig = (themeConfig: ThemeConfig) => {
  if (typeof themeConfig.name !== "string") {
    throw new Error(
      'The theme config must contain a "name" property of type string!',
    );
  }
  if (typeof themeConfig.assetsDir !== "string") {
    throw new Error(
      'The theme config must contain a "assetsDir" property of type string!',
    );
  }
  if (typeof themeConfig.viewsDir !== "string") {
    throw new Error(
      'The theme config must contain a "viewsDir" property of type string!',
    );
  }
  if (!SUPPORTED_TEMPLATE_ENGINES.includes(themeConfig.viewEngine)) {
    throw new Error(
      `The theme config must contain a "viewEngine" property of a supported template engine string but is "${themeConfig.viewEngine}"!`,
    );
  }
  // Optional
  if (themeConfig.routes) {
    if (!Array.isArray(themeConfig.routes)) {
      throw new Error('Theme config: "routes" property must be an array!');
    }
  }
};

const validateAlosaurThemeConfig = (
  nestThemeConfig: AlosaurThemeConfig,
) => {
  if (typeof nestThemeConfig.themeDir !== "string") {
    throw new Error(
      'The nest theme config must contain a "themeDir" property of type string!\nThis property is used to find the the current active theme.',
    );
  }
  if (typeof nestThemeConfig.active !== "string") {
    throw new Error(
      'The nest theme config must contain a "active" property of type string!\nThis property is used to set the current active theme.',
    );
  }
};

const validateFullThemeConfig = (fullThemeConfig: FullThemeConfig) => {
  validateThemeConfig(fullThemeConfig);
  validateAlosaurThemeConfig(fullThemeConfig);
};

/**
 * Loads a JavaScript or yaml config file
 * TODO replace with config module in riba-nest-projects
 * @param configPath
 * @param env environment, e.g. development or production
 */
const loadConfig = async <T>(
  searchConfigPaths: string[],
  env: string,
): Promise<T> => {
  for (const configPath of searchConfigPaths) {
    if (!(await exists(configPath))) {
      continue;
    }
    if (configPath.endsWith(".js")) {
      const { default: config } = await import(configPath);
      return config(env) as T;
    } // Parse yaml config file
    else if (configPath.endsWith(".yaml")) {
      const yamlLoader = new YamlLoader();

      const result = await yamlLoader.parseFile(configPath) as T;
      return result;
    } else {
      throw new Error("Config file extension not supported! " + configPath);
    }
  }
  throw new Error(
    "No config file found! Searched for config files: \n" +
      JSON.stringify(searchConfigPaths, null, 2),
  );
};

export const loadThemeConfig = async (
  alosaurThemeConfig: AlosaurThemeConfig,
  env = Deno.env.get("ENV") || "development",
) => {
  const basePath = resolve(
    alosaurThemeConfig.themeDir,
    alosaurThemeConfig.active,
  );

  console.debug("alosaurThemeConfig", alosaurThemeConfig);

  const configPath = resolve(
    basePath,
    "config",
  );
  const activeThemeConfig = await loadConfig<ThemeConfig>(
    [
      resolve(configPath, "theme.js"),
      resolve(configPath, "theme.ts"),
      resolve(configPath, "theme.yaml"),
    ],
    env,
  );

  validateThemeConfig(activeThemeConfig);
  validateAlosaurThemeConfig(alosaurThemeConfig);

  const fullThemeConfig: FullThemeConfig = {
    ...activeThemeConfig,
    ...alosaurThemeConfig,
    basePath,
    templateVars: alosaurThemeConfig.templateVars || {},
    assetsDir: resolve(
      basePath,
      activeThemeConfig.assetsDir,
    ),
    viewsDir: resolve(
      basePath,
      activeThemeConfig.viewsDir,
    ),
    pageComponentsDir: resolve(
      basePath,
      activeThemeConfig.pageComponentsDir || "",
    ),
  };

  validateFullThemeConfig(fullThemeConfig);

  return fullThemeConfig;
};
