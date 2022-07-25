import { ESBuildConfig } from "./esbuild-options.js";

export interface Config {
  esbuild: ESBuildConfig;
  template: "octobercms" | "shopify" | "shopify-checkout" | "local" | "ssr";
  development: boolean;
  production: boolean;
  distDir: string;
  distFilename: string;
  distPath: string;
  tsSourceDir: string;
  tsIndexPath: string;
  scssSourceDir: string;
  scssIndexPath: string;
  templateDir: string;
}
