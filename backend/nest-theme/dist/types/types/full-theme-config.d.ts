import type { ThemeConfig } from './theme-config';
import type { NestThemeConfig } from './nest-theme-config';
import type { TemplateVars } from '@ribajs/node-ssr';
export interface FullThemeConfig extends ThemeConfig, NestThemeConfig {
    basePath: string;
    templateVars: TemplateVars;
}
