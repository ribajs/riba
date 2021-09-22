import type { ThemeConfig } from '@ribajs/ssr';
import { TemplateVars } from '../types/template-vars';
export interface NestThemeConfig {
    themeDir: string;
    active: string;
    templateVars?: TemplateVars;
}
export interface FullThemeConfig extends ThemeConfig, NestThemeConfig {
    basePath: string;
    templateVars: TemplateVars;
}
