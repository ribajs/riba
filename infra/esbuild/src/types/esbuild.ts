declare module "esbuild" {

  export interface ESBuildConfig {
  }

  export const build: (options: ESBuildConfig) => void;
}