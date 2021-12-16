import { TemplateVars } from '@ribajs/node-ssr';
export interface NestThemeConfig {
    themeDir: string;
    active: string;
    templateVars?: TemplateVars;
}
