import type { ThemeConfig } from '@ribajs/ssr';
export interface NestThemeConfig {
  themeDir: string;
  active: string;
}
export interface FullThemeConfig extends ThemeConfig, NestThemeConfig {}
