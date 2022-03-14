import { Models } from "shopify-admin-api";

export interface ScriptTagsConfig extends Models.ScriptTag {
  event: "onload";
  src: string;
}

export interface ExternalAssetsConfig {
  src: string;
  key: string;
}

export interface ExternalScriptsConfigByEnv {
  [env: string]: {
    scriptTags: ScriptTagsConfig[];
    assets: ExternalAssetsConfig[];
  };
}
