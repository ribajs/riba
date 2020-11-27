export interface ThemeConfig {
  password: string;
  theme_id: number | string;
  store: string;
  timeout?: string;
  ignore_files?: string[];
}

export interface ThemeConfigByEnv {
  [env: string]: ThemeConfig;
}
