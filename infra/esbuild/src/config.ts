import { Config, ESBuildConfig } from './types';
import * as DEF from './constants/defaults';
import { findFile, basename, rootPath, resolve, extname } from './path';
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';

export const searchForTsIndexPath = (template: Config['template'] = DEF.TEMPLATE, tsSourceDir: Config['tsSourceDir'] = DEF.TS_SOURCE_DIR, distFilename?: string) => {
  let searchFor = distFilename ? [distFilename] : ["main.ts", "csr.ts", "app.ts", "index.ts"];

  switch (template) {
    case "shopify-checkout":
      searchFor = ["checkout.ts"];
      break;
    case "ssr":
      searchFor = ["ssr.ts"];
      break;
  }
  return findFile(tsSourceDir, searchFor) || tsSourceDir + '/index.ts';
}

export const searchForScssIndexPath = (template: Config['template'] = DEF.TEMPLATE, scssSourceDir: Config['scssSourceDir'] = DEF.SCSS_SOURCE_DIR) => {
  let searchFor = ["main.scss", "index.scss", "app.scss", "theme.scss"];

  switch (template) {
    case "shopify-checkout":
      searchFor = ["checkout.scss"];
      break;
  }
  return findFile(scssSourceDir, searchFor) || scssSourceDir + "/index.scss";
}

export const getDefaultDistDir = (template: Config['template'] = DEF.TEMPLATE) => {
  switch (template) {
    case "local":
      return DEF.DIST_DIR_LOCAL;
    case "octobercms":
      return DEF.DIST_DIR_OCTOBERCMS;
    case "shopify":
      return DEF.DIST_DIR_SHOPIFY;
    case "shopify-checkout":
      return DEF.DIST_DIR_SHOPIFY_CHECKOUT;
    case "ssr":
      return DEF.DIST_DIR_SSR;
    default:
      return resolve(rootPath, 'dist');
  }
}

export const getDefaultDistFilename = (tsIndexPath: Config['tsIndexPath']) => {
  const tsSourceBasename = basename(tsIndexPath, extname(tsIndexPath));
  return `${tsSourceBasename}.bundle.js`;
}

export const getESBuildConfig = (config: Config): ESBuildConfig => {
  const conf: Partial<ESBuildConfig> = config.esbuild || {};

  conf.entryPoints = conf.entryPoints || [config.tsIndexPath]
  conf.bundle = conf.bundle || config.development;
  conf.outfile = conf.outfile || config.distPath;
  conf.plugins = conf.plugins || [pnpPlugin()];
  return conf as ESBuildConfig;
}

export const parseConfig = (config: Partial<Config>): Config => {

  config.development = config.development || process.env.NODE_ENV === "development";
  config.production = config.production || !config.development;

  config.template = config.template?.toLowerCase() as Config['template'] || DEF.TEMPLATE;
  
  config.tsSourceDir = config.tsSourceDir || DEF.TS_SOURCE_DIR;
  config.tsIndexPath = config.tsIndexPath || searchForTsIndexPath(config.template, config.tsSourceDir, config.distFilename);

  config.scssSourceDir = config.scssSourceDir || DEF.SCSS_SOURCE_DIR;
  config.scssIndexPath = config.scssIndexPath || searchForScssIndexPath(config.template, config.tsSourceDir);

  config.templateDir = config.templateDir || DEF.TEMPLATE_DIR;

  config.distDir = config.distDir || getDefaultDistDir(config.template);
  config.distFilename = config.distFilename || getDefaultDistFilename(config.tsIndexPath);
  config.distPath = config.distPath || resolve(config.distDir, config.distFilename);

  config.esbuild = getESBuildConfig(config as Config);
  return config as Config;
}