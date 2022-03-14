import { Config } from "../types/index.js";
import { resolve, findDir, rootPath } from "../path";

export const TS_SOURCE_DIR: Config["tsSourceDir"] =
  findDir([
    resolve(rootPath, "assets/ts"), // OctoberCMS
    resolve(rootPath, "src/ts"),
    resolve(rootPath, "src/scripts"),
    resolve(rootPath, "src/ts"),
    resolve(rootPath, "ts"),
    resolve(rootPath, "scripts"),
  ]) || resolve(rootPath, "src");

export const SCSS_SOURCE_DIR: Config["scssSourceDir"] =
  findDir([
    resolve(rootPath, "src/scss"),
    resolve(rootPath, "src/styles"),
    resolve(rootPath, "scss"),
    resolve(rootPath, "styles"),
  ]) || resolve(rootPath, "src");

export const TEMPLATE: Config["template"] = "local";

export const TEMPLATE_DIR: Config["templateDir"] =
  findDir([
    resolve(rootPath, "src/html"),
    resolve(rootPath, "src/templates"),
    resolve(rootPath, "src/views"),
    resolve(rootPath, "html"),
    resolve(rootPath, "templates"),
    resolve(rootPath, "views"),
    resolve(rootPath, "src/index.html"),
    resolve(rootPath, "index.html"),
  ]) || resolve(rootPath, "src");

export const DIST_DIR_OCTOBERCMS: Config["distDir"] = resolve(
  rootPath,
  "assets/js/"
);
export const DIST_DIR_SHOPIFY: Config["distDir"] = resolve(
  rootPath,
  "theme/assets/"
);
export const DIST_DIR_SHOPIFY_CHECKOUT = DIST_DIR_SHOPIFY;
export const DIST_DIR_LOCAL: Config["distDir"] = resolve(rootPath, "dist");
export const DIST_DIR_SSR = DIST_DIR_LOCAL;
