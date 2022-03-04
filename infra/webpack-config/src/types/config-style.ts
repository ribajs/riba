import type { LoaderItem } from "."; 

export interface ConfigStyle {
  extract: boolean;
  distPath: string;
  resolveUrl: "onlyImports" | "notForAssets" | {
    filter: (url: string, resourcePath: string) => boolean;
  };
}