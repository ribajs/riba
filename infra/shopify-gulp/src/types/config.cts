import type { IPackageJson } from "package-json-type";
import type { processSvg } from "../includes/utilities.cjs";
import type { OptimizeOptions } from "svgo";
import type * as File from "vinyl";

export interface Config {
  environment: string;
  themeRoot: string;
  packageJson: IPackageJson;

  upload: string;
  backup: string;

  tkConfig: string;
  releaseConfig: string;
  externalScriptsConfig: string;
  deployConfig: string;
  liveConfig: string;
  deployLog: string;

  src: {
    root: string;
    json: string;
    assets: string;
    iconset: string;
    templates: string;
    snippets: string;
    sections: string;
    locales: string;
    config: string;
    layout: string;
    favicons: string;
    schema: string;
  };

  dist: {
    root: string;
    assets: string;
    snippets: string;
    sections: string;
    layout: string;
    templates: string;
    locales: string;
  };

  ribaShopify: {
    root: string;
    src: {
      root: string;
      json: string;
      assets: string;
      iconset: string;
      templates: string;
      snippets: string;
      sections: string;
      locales: string;
      config: string;
      layout: string;
    };
  };

  ribaShopifyTda: {
    root: string | false;
    src?: {
      root: string;
      json: string;
      assets: string;
      iconset: string;
      templates: string;
      snippets: string;
      sections: string;
      locales: string;
      config: string;
      layout: string;
    };
  };

  plugins: {
    cheerio: {
      run: typeof processSvg;
    };
    svgmin: ((file: File) => OptimizeOptions) | OptimizeOptions;
    //  {
    //   plugins: {
    //     [key: string]: boolean;
    //   }[];
    // };
  };
}
