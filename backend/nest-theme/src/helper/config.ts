import { transpileModule, CompilerOptions, ModuleKind } from 'typescript';
import { Script } from 'vm';
import * as YAML from 'yaml';
import { readFileSync, existsSync } from 'fs';
import type { ThemeConfig } from '@ribajs/ssr';
import { SUPPORTED_TEMPLATE_EINGINES } from '../constants';
import type { NestThemeConfig, FullThemeConfig } from '../types';

export const validateThemeConfig = (themeConfig: ThemeConfig) => {
  if (typeof themeConfig.name !== 'string') {
    throw new Error(
      'The theme config must contain a "name" property of type string!',
    );
  }
  if (typeof themeConfig.assetsDir !== 'string') {
    throw new Error(
      'The theme config must contain a "assetsDir" property of type string!',
    );
  }
  if (typeof themeConfig.viewsDir !== 'string') {
    throw new Error(
      'The theme config must contain a "viewsDir" property of type string!',
    );
  }
  if (!SUPPORTED_TEMPLATE_EINGINES.includes(themeConfig.viewEngine)) {
    throw new Error(
      'The theme config must contain a "viewEngine" property of a supported template engine string!',
    );
  }
  // Optional
  if (themeConfig.routes) {
    if (!Array.isArray(themeConfig.routes)) {
      throw new Error('Theme config: "routes" property must be an array!');
    }
  }
};

export const validateNestThemeConfig = (nestThemeConfig: NestThemeConfig) => {
  if (typeof nestThemeConfig.themeDir !== 'string') {
    throw new Error(
      'The nest theme config must contain a "themeDir" property of type string!\nThis property is used to find the the current active theme.',
    );
  }
  if (typeof nestThemeConfig.active !== 'string') {
    throw new Error(
      'The nest theme config must contain a "active" property of type string!\nThis property is used to set the current active theme.',
    );
  }
};

export const validateFullThemeConfig = (fullThemeConfig: FullThemeConfig) => {
  validateThemeConfig(fullThemeConfig);
  validateNestThemeConfig(fullThemeConfig);
};

/**
 * Loads a pure TypeScript or yaml config file
 * TODO replace with config module in riba-nest-projects
 * @param configPath
 */
export const loadConfig = <T>(searchConfigPaths: string[]) => {
  for (const configPath of searchConfigPaths) {
    if (!existsSync(configPath)) {
      continue;
    }
    // Transpile typescript config file
    if (configPath.endsWith('.ts')) {
      let tSource = readFileSync(configPath, 'utf8');
      const compilerOptions: CompilerOptions = {
        module: ModuleKind.CommonJS,
      };
      const context = {
        exports: {
          themeConfig: {},
        },
        require,
      };
      let jSource = transpileModule(tSource, { compilerOptions }).outputText;
      let script = new Script(jSource);
      script.runInNewContext(context);
      const themeConfig: T = context.exports.themeConfig as T;
      script = null;
      jSource = null;
      tSource = null;
      return themeConfig;
    }
    // Parse yaml config file
    else if (configPath.endsWith('.yaml')) {
      const result: T = YAML.parse(readFileSync(configPath, 'utf8'));
      return result;
    } else {
      throw new Error('Config file extension not supported! ' + configPath);
    }
  }
  throw new Error(
    'No config file found! Searched for config files: \n' +
      JSON.stringify(searchConfigPaths, null, 2),
  );
};
