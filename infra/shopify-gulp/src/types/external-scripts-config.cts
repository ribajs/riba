import type { Interfaces } from "shopify-admin-api";

export interface ScriptTagsConfig extends Interfaces.ScriptTag {
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
